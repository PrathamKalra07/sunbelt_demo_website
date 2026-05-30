"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import Markdown from 'react-markdown';
import { chatLease } from '../../api/api.chat';
import { Sparkles, X, Send, MessageCircle, ChevronDown } from 'lucide-react';

const QUICK_PROMPTS = [
  "What units are available?",
  "How do I apply for a lease?",
  "What's the pet policy?",
  "Schedule a viewing",
];

const mdComponents = {
  table: ({ node, ...props }: any) => (
    <div className="overflow-x-auto my-3">
      <table className="min-w-full border-collapse text-[12.5px]" {...props} />
    </div>
  ),
  thead: ({ node, ...props }: any) => <thead className="bg-gray-100 text-gray-700" {...props} />,
  th:    ({ node, ...props }: any) => <th className="px-3 py-1.5 text-left font-semibold border border-gray-200 text-[11px]" {...props} />,
  td:    ({ node, ...props }: any) => <td className="px-3 py-1.5 border border-gray-100 text-gray-600" {...props} />,
  tr:    ({ node, ...props }: any) => <tr className="even:bg-gray-50" {...props} />,
  ul:    ({ node, ...props }: any) => <ul className="list-disc pl-4 space-y-0.5 my-1.5 text-gray-700" {...props} />,
  ol:    ({ node, ...props }: any) => <ol className="list-decimal pl-4 space-y-0.5 my-1.5 text-gray-700" {...props} />,
  li:    ({ node, ...props }: any) => <li className="ml-1" {...props} />,
  h1:    ({ node, ...props }: any) => <h1 className="text-base font-bold mt-3 mb-1.5 text-gray-900" {...props} />,
  h2:    ({ node, ...props }: any) => <h2 className="text-sm font-semibold mt-2.5 mb-1.5 text-gray-800" {...props} />,
  h3:    ({ node, ...props }: any) => <h3 className="text-sm font-semibold mt-2 mb-1 text-gray-800" {...props} />,
  a:     ({ node, ...props }: any) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline" />,
  p:     ({ node, ...props }: any) => <p className="mb-1 last:mb-0" {...props} />,
};

function normaliseMarkdown(text: string): string {
  let out = text.replace(/\\n/g, "\n");
  const lines = out.split("\n");
  const result: string[] = [];
  let inTable = false;
  for (const line of lines) {
    const isTableLine = /^\s*\|.*\|\s*$/.test(line);
    if (isTableLine && !inTable) {
      if (result.length && result[result.length - 1] !== "") result.push("");
      inTable = true;
    }
    if (!isTableLine && inTable) { result.push(""); inTable = false; }
    result.push(line);
  }
  return result.join("\n");
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  followups?: string[];
}

function TypingIndicator() {
  return (
    <div className="flex gap-2 items-end">
      <div className="w-6 h-6 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
        <Sparkles size={11} className="text-white" />
      </div>
      <div className="bg-gray-100 rounded-2xl rounded-tl-none px-3.5 py-2.5">
        <div className="flex gap-1 items-center h-3.5">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ message, isLastAssistant, onSelect }: {
  message: Message; isLastAssistant: boolean; onSelect: (t: string) => void;
}) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end chat-msg">
        <div className="bg-gray-900 text-white rounded-2xl rounded-br-none px-3.5 py-2.5 max-w-[85%] text-[13px] leading-relaxed">
          <Markdown remarkPlugins={[remarkGfm, remarkBreaks]} components={mdComponents}>
            {message.content}
          </Markdown>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-msg">
      <div className="flex gap-2 items-start">
        <div className="w-6 h-6 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles size={11} className="text-white" />
        </div>
        <div className="bg-gray-100 rounded-2xl rounded-tl-none px-3.5 py-2.5 max-w-[85%] text-[13px] text-gray-700 leading-relaxed">
          <Markdown remarkPlugins={[remarkGfm, remarkBreaks]} components={mdComponents}>
            {normaliseMarkdown(message.content)}
          </Markdown>
        </div>
      </div>
      {isLastAssistant && (message.followups?.length ?? 0) > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2 ml-8">
          {message.followups!.map((text, i) => (
            <button
              key={i}
              onClick={() => onSelect(text)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-150"
            >
              {text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PropertyChatbot() {
  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState<Message[]>([{
    id: 'welcome', role: 'assistant',
    content: "Hi! I'm your Leasing Assistant. Ask me anything about available units, lease terms, or to schedule a viewing.",
  }]);
  const [input, setInput]         = useState('');
  const [generating, setGenerating] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [unread, setUnread]       = useState(0);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const convId    = useRef(`leasing-${Date.now()}`);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, generating, open]);

  const sendMessage = useCallback(async (content: string) => {
    const trimmed = content?.trim();
    if (!trimmed || generating) return;
    setError(null);
    setInput('');
    setMessages(prev => [...prev, { id: `u-${Date.now()}`, role: 'user', content: trimmed }]);
    setGenerating(true);
    try {
      const data = await chatLease(trimmed, convId.current);
      const reply = {
        id:        `a-${Date.now()}`,
        role:      'assistant' as const,
        content:   data.message ?? data.response ?? "Sorry, I didn't get a response.",
        followups: data.followups ?? [],
      };
      setMessages(prev => [...prev, reply]);
      if (!open) setUnread(u => u + 1);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setGenerating(false);
    }
  }, [generating, open]);

  const lastBotId  = [...messages].reverse().find(m => m.role === 'assistant')?.id;
  const showQuick  = messages.length <= 1 && !generating;
  const canSend    = !!input.trim() && !generating;

  return (
    <>
      <style>{`
        .chat-msg { animation: chatFadeUp 0.16s ease-out both; }
        @keyframes chatFadeUp { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
        .chat-window { animation: chatSlideUp 0.2s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes chatSlideUp { from { opacity: 0; transform: translateY(16px) scale(0.97); } to { opacity: 1; transform: none; } }
        .chat-scroll::-webkit-scrollbar { width: 3px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 99px; }
      `}</style>

      {/* Floating chat window */}
      {open && (
        <div
          className="chat-window fixed bottom-24 right-6 z-50 flex flex-col bg-white overflow-hidden"
          style={{
            width: '360px',
            height: '520px',
            borderRadius: '18px',
            border: '1px solid #E5E5E5',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-2.5 px-4 py-3 flex-shrink-0"
            style={{ borderBottom: '1px solid #F0F0F0' }}
          >
            <div className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0">
              <Sparkles size={13} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-900 leading-tight">Leasing Assistant</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <p className="text-[10px] text-gray-400">Online · Sunbelt Properties</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <ChevronDown size={15} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="chat-scroll flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3"
            style={{ scrollbarWidth: 'thin' }}
          >
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

          {/* Quick prompts */}
          {showQuick && (
            <div className="px-4 pb-2 flex-shrink-0 flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map(p => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-150"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mx-3 mb-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 border border-red-100 text-red-600 text-[11px] flex-shrink-0">
              <span className="flex-1">{error}</span>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">✕</button>
            </div>
          )}

          {/* Input */}
          <div className="px-3 pb-3 pt-1 flex-shrink-0">
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-150"
              style={{
                border: `1px solid ${canSend ? '#111' : '#E5E5E5'}`,
                background: '#fff',
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }}}
                placeholder="Ask a question…"
                disabled={generating}
                className="flex-1 bg-transparent border-none outline-none text-[13px] text-gray-900 placeholder-gray-300 disabled:opacity-40"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!canSend}
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-150"
                style={{
                  background: canSend ? '#111' : '#F0F0F0',
                  cursor: canSend ? 'pointer' : 'not-allowed',
                }}
              >
                <Send size={11} color={canSend ? '#fff' : '#aaa'} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
        style={{ background: '#111' }}
        aria-label="Open chat"
      >
        {open ? (
          <X size={20} color="#fff" />
        ) : (
          <>
            <MessageCircle size={22} color="#fff" />
            {unread > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center"
                style={{ border: '2px solid #fff' }}
              >
                {unread}
              </span>
            )}
          </>
        )}
      </button>
    </>
  );
}