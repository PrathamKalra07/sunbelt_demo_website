"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import Markdown from 'react-markdown'
import { chatLease } from '../../api/api.chat';
import { Sparkles } from "lucide-react";

const QUICK_PROMPTS = [
    "What units are available?",
    "How do I apply for a lease?",
    "What's the pet policy?",
    "Schedule a viewing",
];

// ── Markdown bubble ───────────────────────────────────────────────────────────
const mdComponents = {
    table: ({ node, ...props }: any) => (
        <div className="overflow-x-auto my-3">
            <table className="min-w-full border-collapse text-[13.5px]" {...props} />
        </div>
    ),
    thead: ({ node, ...props }: any) => (
        <thead className="bg-gray-200 text-gray-700" {...props} />
    ),
    th: ({ node, ...props }: any) => (
        <th className="px-4 py-2 text-left font-semibold border border-gray-300" {...props} />
    ),
    td: ({ node, ...props }: any) => (
        <td className="px-4 py-2 border border-gray-200 text-gray-600" {...props} />
    ),
    tr: ({ node, ...props }: any) => (
        <tr className="even:bg-gray-50" {...props} />
    ),
    ul: ({ node, ...props }: any) => (
        <ul className="list-disc pl-5 space-y-1 my-2 text-gray-700" {...props} />
    ),
    ol: ({ node, ...props }: any) => (
        <ol className="list-decimal pl-5 space-y-1 my-2 text-gray-700" {...props} />
    ),
    li: ({ node, ...props }: any) => (
        <li className="ml-1" {...props} />
    ),
    h1: ({ node, ...props }: any) => (
        <h1 className="text-xl font-bold mt-4 mb-2 text-gray-900" {...props} />
    ),
    h2: ({ node, ...props }: any) => (
        <h2 className="text-lg font-semibold mt-3 mb-2 text-gray-800" {...props} />
    ),
    h3: ({ node, ...props }: any) => (
        <h3 className="text-base font-semibold mt-3 mb-1 text-gray-800" {...props} />
    ),
    a: ({ node, ...props }: any) => (
        <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline" />
    ),
};

function normaliseMarkdown(text: string): string {
    let out = text.replace(/\\n/g, "\n");
    const lines = out.split("\n");
    const result: string[] = [];
    let inTable = false;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isTableLine = /^\s*\|.*\|\s*$/.test(line);
        if (isTableLine && !inTable) {
            if (result.length && result[result.length - 1] !== "") result.push("");
            inTable = true;
        }
        if (!isTableLine && inTable) {
            result.push("");
            inTable = false;
        }
        result.push(line);
    }
    return result.join("\n");
}

// ── Bot avatar ────────────────────────────────────────────────────────────────
function BotAvatar() {
    return (
        <div className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles size={16} className="text-white" />
        </div>
    );
}

// ── Sub-components ────────────────────────────────────────────────────────────
interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    followups?: string[];
}

function FollowupPills({ followups, onSelect }: { followups: string[], onSelect: (t: string) => void }) {
    if (!followups?.length) return null;
    return (
        <div className="flex flex-wrap gap-1.5 mt-2 ml-12">
            {followups.map((text, i) => (
                <button
                    key={i}
                    onClick={() => onSelect(text)}
                    className="text-[12px] font-medium px-3 py-1 rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
                >
                    {text}
                </button>
            ))}
        </div>
    );
}

function TypingIndicator() {
    return (
        <div className="flex gap-3 items-end msg-appear">
            <BotAvatar />
            <div className="bg-gray-50 rounded-2xl rounded-bl-sm px-5 py-3 text-[14.5px] text-gray-700 leading-relaxed">
                <div className="flex gap-1.5 items-center h-4">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
            </div>
        </div>
    );
}

function ChatBubble({ message, isLastAssistant, onSelect }: {
    message: Message, isLastAssistant: boolean, onSelect: (t: string) => void
}) {
    const isUser = message.role === 'user';

    if (isUser) {
        return (
            <div className="flex justify-end msg-appear">
                <div className="bg-gray-900 text-white rounded-2xl rounded-br-sm shadow-sm px-5 py-3 max-w-xl text-[14.5px] leading-relaxed">
                    <Markdown remarkPlugins={[remarkGfm, remarkBreaks]} components={mdComponents}>
                        {message.content}
                    </Markdown>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex gap-3 items-start msg-appear">
                <BotAvatar />
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-5 py-3 max-w-xl text-[14.5px] text-gray-700 leading-relaxed">
                    <Markdown remarkPlugins={[remarkGfm, remarkBreaks]} components={mdComponents}>
                        {normaliseMarkdown(message.content)}
                    </Markdown>
                </div>
            </div>
            {isLastAssistant && (message.followups?.length ?? 0) > 0 && (
                <FollowupPills followups={message.followups!} onSelect={onSelect} />
            )}
        </div>
    );
}

function ErrorCallout({ message, onDismiss }: { message: string | null, onDismiss: () => void }) {
    if (!message) return null;
    return (
        <div className="mx-4 mb-2 flex items-start gap-2 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[12px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className="flex-1">{message}</span>
            <button onClick={onDismiss} className="text-red-400 hover:text-red-600 text-sm leading-none">✕</button>
        </div>
    );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function PropertyChatbot() {
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef  = useRef<HTMLInputElement>(null);
    const convId    = useRef(`leasing-${Date.now()}`);

    const [messages, setMessages] = useState<Message[]>([{
        id: 'welcome', role: 'assistant',
        content: "Hi! I'm the Leasing Assistant. I can help you find available units, answer questions about lease terms, or schedule a viewing. What can I help you with?",
    }]);
    const [input,      setInput]      = useState('');
    const [generating, setGenerating] = useState(false);
    const [error,      setError]      = useState<string | null>(null);

    useEffect(() => { inputRef.current?.focus(); }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, generating]);

    const sendMessage = useCallback(async (content: string) => {
        const trimmed = content?.trim();
        if (!trimmed || generating) return;
        setError(null);
        setInput('');
        setMessages(prev => [...prev, { id: `u-${Date.now()}`, role: 'user', content: trimmed }]);
        setGenerating(true);
        try {
            const data = await chatLease(trimmed, convId.current);
            setMessages(prev => [...prev, {
                id:        `a-${Date.now()}`,
                role:      'assistant',
                content:   data.message ?? data.response ?? "Sorry, I didn't get a response. Please try again.",
                followups: data.followups ?? [],
            }]);
        } catch (e) {
            console.error(e);
            setError("Something went wrong. Please try again.");
        } finally {
            setGenerating(false);
        }
    }, [generating]);

    const lastBotId = [...messages].reverse().find(m => m.role === 'assistant')?.id;
    const showQuick = messages.length <= 1 && !generating;
    const canSend   = !!input.trim() && !generating;

    return (
        <>
            <style>{`
                .msg-appear { animation: fadeUp 0.18s ease-out both; }
                @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
                .ls-scroll::-webkit-scrollbar { display: none; }
            `}</style>

            <div className="flex flex-col flex-1 overflow-hidden bg-white" style={{ height: '92vh' }}>

                {/* Header */}
                <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100 bg-white flex-shrink-0">
                    <div className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0">
                        <Sparkles size={16} className="text-white" />
                    </div>
                    <div>
                        <p className="text-[14px] font-medium text-gray-900 leading-tight m-0">Leasing Assistant</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                            <p className="text-[11px] text-gray-400 m-0">Online</p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="ls-scroll flex-1 overflow-y-auto px-4 pt-4 pb-2" style={{ scrollbarWidth: 'none' }}>
                    <div className="max-w-4xl mx-auto flex flex-col gap-3 ">
                        {messages.map(msg => (
                            <ChatBubble
                                key={msg.id}
                                message={msg}
                                isLastAssistant={msg.id === lastBotId && msg.role === 'assistant'}
                                onSelect={sendMessage}
                            />
                        ))}
                        {generating && <TypingIndicator />}
                        <div ref={bottomRef} />
                    </div>
                </div>

                {/* Quick prompts */}
                {showQuick && (
                    <div className="px-4 pb-2 flex-shrink-0">
                        <div className="max-w-2xl mx-auto flex flex-wrap gap-1.5">
                            {QUICK_PROMPTS.map(p => (
                                <button
                                    key={p}
                                    onClick={() => sendMessage(p)}
                                    className="text-[12px] font-medium px-3 py-1 rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <ErrorCallout message={error} onDismiss={() => setError(null)} />

                {/* Input */}
                <div className="px-4 pb-4 pt-1.5 flex-shrink-0">
                    <div className={`max-w-4xl mx-auto flex items-center gap-2 rounded-xl border bg-white px-3.5 py-2 transition-colors ${canSend ? 'border-gray-900' : 'border-gray-200'}`}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }}}
                            placeholder="Ask about leasing, availability, or book a viewing…"
                            disabled={generating}
                            className="flex-1 bg-transparent border-none outline-none text-[13.5px] text-gray-900 placeholder-gray-400 disabled:opacity-40"
                        />
                        <button
                            onClick={() => sendMessage(input)}
                            disabled={!canSend}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-opacity ${canSend ? 'bg-gray-900 cursor-pointer' : 'bg-gray-200 cursor-not-allowed'}`}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={canSend ? '#fff' : '#aaa'} strokeWidth="2.5">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
}