import axios from "axios";
import { authFetch } from "./apiClient";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const sendMessage = async (content, onChunk, onFollowups) => {
    if (!content) {
        throw new Error("Message content is missing");
    }

    const response = await fetch(`${BASE_URL}/chat/stream`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream'
        },
        body: JSON.stringify({
            query: content,
            chat_history: [
                {
                    role: "user",
                    content: content,
                    timestamp: new Date().toISOString()
                }
            ],
            namespace: "all",
            top_k: 8,
            filters: {}
        })
    });

    if (!response.body) {
        throw new Error("No readable stream from server");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let done = false;
    let buffer = "";

    while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");

        const partsToProcess = done ? parts : parts.slice(0, -1);
        buffer = done ? "" : parts[parts.length - 1];              

        for (let part of partsToProcess) {                         
            if (part.startsWith("data: ")) {
                const json = part.replace("data: ", "").trim();
                if (!json) continue;

                const parsed = JSON.parse(json);

                if (parsed.chunk) onChunk(parsed.chunk);
                if (parsed.done) break;
                if (parsed.followups) onFollowups?.(parsed.followups);
            }
        }
    }
};

export const chatLease = async (content, conversationId) => {
    const response = await authFetch(`${BASE_URL}/leasing/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({ message: content, conversation_id: conversationId }),
    });
    if (!response.ok) throw new Error('Leasing chat request failed');
    return response.json();
}

export const generateRetellToken = async () => {
    try {
        const response = await fetch(`${RETELL_WEBHOOK_URL}`)
    } catch (e) {

    }
}
