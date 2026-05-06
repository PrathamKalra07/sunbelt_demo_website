"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, AlertCircle } from "lucide-react";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import Markdown from "react-markdown";
import { sendMessage } from "./../../api/api.chat"; 

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  followups?: string[];
}

const mdComponents = {
  table: ({ node, ...props }: any) => (
    <div className="overflow-x-auto my-2">
      <table className="min-w-full border-collapse text-[12.5px]" {...props} />
    </div>
  ),
  thead: ({ node, ...props }: any) => (
    <thead className="bg-gray-200 text-gray-700" {...props} />
  ),
  th: ({ node, ...props }: any) => (
    <th className="px-3 py-1.5 text-left font-semibold border border-gray-300" {...props} />
  ),
  td: ({ node, ...props }: any) => (
    <td className="px-3 py-1.5 border border-gray-200 text-gray-600" {...props} />
  ),
  tr: ({ node, ...props }: any) => (
    <tr className="even:bg-gray-50" {...props} />
  ),
  ul: ({ node, ...props }: any) => (
    <ul className="list-disc pl-4 space-y-0.5 my-1.5 text-gray-700" {...props} />
  ),
  ol: ({ node, ...props }: any) => (
    <ol className="list-decimal pl-4 space-y-0.5 my-1.5 text-gray-700" {...props} />
  ),
  li: ({ node, ...props }: any) => <li className="ml-1" {...props} />,
  h1: ({ node, ...props }: any) => (
    <h1 className="text-base font-semibold mt-3 mb-1.5 text-gray-900" {...props} />
  ),
  h2: ({ node, ...props }: any) => (
    <h2 className="text-sm font-semibold mt-2.5 mb-1 text-gray-800" {...props} />
  ),
  h3: ({ node, ...props }: any) => (
    <h3 className="text-sm font-medium mt-2 mb-1 text-gray-800" {...props} />
  ),
  a: ({ node, ...props }: any) => (
    <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline" />
  ),
  p: ({ node, ...props }: any) => (
    <p className="mb-1.5 last:mb-0" {...props} />
  ),
  code: ({ node, inline, ...props }: any) =>
    inline ? (
      <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-[11px] font-mono" {...props} />
    ) : (
      <pre className="bg-gray-100 text-gray-800 p-2.5 rounded text-[11px] font-mono overflow-x-auto my-2">
        <code {...props} />
      </pre>
    ),
};

function BotAvatar({ size = 22 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0"
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z" />
        <path d="M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
        <line x1="9" y1="18" x2="9" y2="18" strokeWidth="3" strokeLinecap="round" />
        <line x1="12" y1="18" x2="12" y2="18" strokeWidth="3" strokeLinecap="round" />
        <line x1="15" y1="18" x2="15" y2="18" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2 items-end">
      <BotAvatar />
      <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-3 py-2.5">
        <div className="flex gap-1 items-center">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full inline-block"
              style={{ animation: `qaBounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FollowupPills({
  followups,
  onSelect,
}: {
  followups: string[];
  onSelect: (t: string) => void;
}) {
  if (!followups?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-2 ml-7">
      {followups.map((text, i) => (
        <button
          key={i}
          onClick={() => onSelect(text)}
          className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
        >
          {text}
        </button>
      ))}
    </div>
  );
}

function ErrorCallout({ message, onDismiss }: { message: string | null; onDismiss: () => void }) {
  if (!message) return null;
  return (
    <div className="mx-3 mb-2 flex items-start gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[11.5px]">
      <AlertCircle size={13} className="flex-shrink-0 mt-0.5" />
      <span className="flex-1 leading-relaxed">{message}</span>
      <button
        onClick={onDismiss}
        className="text-red-400 hover:text-red-600 leading-none ml-1 flex-shrink-0"
      >
        <X size={12} />
      </button>
    </div>
  );
}

function ChatBubble({
  message,
  isLastBot,
  onSelect,
}: {
  message: Message;
  isLastBot: boolean;
  onSelect: (t: string) => void;
}) {
  const isUser = message.role === "user";
  const isLoading = !message.content || message.content.trim() === "";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="bg-gray-900 text-white rounded-2xl rounded-br-sm px-3.5 py-2.5 max-w-[80%] text-[13px] leading-relaxed">
          <Markdown remarkPlugins={[remarkGfm, remarkBreaks]} components={mdComponents}>
            {message.content}
          </Markdown>
        </div>
      </div>
    );
  }

  return (
    <div>
  <div className="flex gap-2 items-start">
    <BotAvatar />
    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%] text-[13px] text-gray-800 leading-relaxed">
      {isLoading ? (
        <div className="flex gap-1 items-center">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full inline-block"
              style={{ animation: `qaBounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      ) : (
        <Markdown remarkPlugins={[remarkGfm, remarkBreaks]} components={mdComponents}>
          {message.content}
        </Markdown>
      )}
    </div>
  </div>
  {isLastBot && message?.followups && message.followups.length > 0 && (
      <FollowupPills followups={message.followups} onSelect={onSelect} />
    )}
</div>
  );
}

const QAChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi there! I'm your AI assistant. Ask me anything about properties, leasing, or policies.",
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<boolean>(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  const handleSend = useCallback(
    async (content: string) => {
      const trimmed = content?.trim();
      if (!trimmed || streaming) return;

      setError(null);
      setInput("");

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
      };

      const botId = `a-${Date.now()}`;
      const botMsg: Message = {
        id: botId,
        role: "assistant",
        content: "",
        followups: [],
      };

      setMessages((prev) => [...prev, userMsg, botMsg]);
      setStreaming(true);
      abortRef.current = false;

      try {
        await sendMessage(
          trimmed,
          (chunk: string) => {
            if (abortRef.current) return;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === botId ? { ...m, content: m.content + chunk } : m
              )
            );
          },
          // onFollowups
          (followups: string[]) => {
            setMessages((prev) =>
              prev.map((m) => (m.id === botId ? { ...m, followups } : m))
            );
          }
        );
      } catch (e: any) {
        if (!abortRef.current) {
          setError("Something went wrong. Please try again.");
          setMessages((prev) => prev.filter((m) => m.id !== botId));
        }
      } finally {
        setStreaming(false);
      }
    },
    [streaming]
  );

  const lastBotId = [...messages].reverse().find((m) => m.role === "assistant")?.id;
  const canSend = !!input.trim() && !streaming;

  return (
    <>
      <style>{`
        @keyframes qaBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes qaSlideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .qa-panel { animation: qaSlideUp 0.2s ease-out both; }
        .qa-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      <button
        onClick={() => setOpen(!open)}
        className={`
          fixed bottom-5 right-5 z-50
          w-14 h-14 rounded-full
          bg-gray-900 text-white
          flex items-center justify-center
          border border-gray-700
          transition-all duration-200
          hover:scale-105 hover:bg-black
          ${open ? "rotate-90" : ""}
        `}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {open && (
        <div
          className="
            qa-panel
            fixed bottom-24 right-5 z-50
            w-[500px] h-[560px]
            bg-white rounded-2xl
            border border-gray-200
            flex flex-col
            overflow-hidden
          "
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)" }}
        >
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z" />
                <path d="M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[13.5px] font-medium text-gray-900 leading-tight m-0">AI Assistant</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <p className="text-[11px] text-gray-400 m-0">Online</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          <div
            className="qa-scroll flex-1 overflow-y-auto px-3 py-3"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex flex-col gap-3">
              {messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  message={msg}
                  isLastBot={msg.id === lastBotId && msg.role === "assistant"}
                  onSelect={handleSend}
                />
              ))}
              {/* {streaming && messages[messages.length - 1]?.content === "" && (
                <TypingIndicator />
              )} */}
              <div ref={bottomRef} />
            </div>
          </div>

          <ErrorCallout message={error} onDismiss={() => setError(null)} />

          <div className="px-3 pb-3 pt-1.5 flex-shrink-0">
            <div
              className={`flex items-center gap-2 rounded-xl border bg-white px-3 py-1.5 transition-colors ${
                canSend ? "border-gray-900" : "border-gray-200"
              }`}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                placeholder="Type a message…"
                disabled={streaming}
                className="flex-1 bg-transparent border-none outline-none text-[13px] text-gray-900 placeholder-gray-400 disabled:opacity-40 py-1"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!canSend}
                className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                  canSend
                    ? "bg-gray-900 hover:bg-black cursor-pointer"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
              >
                <Send size={12} className={canSend ? "text-white" : "text-gray-400"} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QAChatBot;