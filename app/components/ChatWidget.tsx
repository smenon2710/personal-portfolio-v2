"use client";
import { useState, useEffect, useRef } from "react";
import Markdown from "./Markdown";

type ChatMessage = { role: "user" | "assistant"; content: string };
type UserInfo = { name?: string; email?: string; purpose?: string };

const INITIAL_GREETING =
  "Hi! I'm Sujith's Digital Twin. I'd love to help you learn about his background and experience. Could you please share your name and email address first?";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Show greeting on first open if no history
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: INITIAL_GREETING }]);
    }
  }, [open, messages.length]);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading || streaming) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages, userInfo }),
      });

      const newUserInfo = JSON.parse(res.headers.get("X-UserInfo") ?? "{}");
      setUserInfo(newUserInfo);

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      setLoading(false);
      setStreaming(true);
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          return [...updated.slice(0, -1), { ...last, content: last.content + chunk }];
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  }

  function clearChat() {
    setMessages([]);
    setUserInfo({});
  }

  const busy = loading || streaming;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {open && (
        <div
          className="mb-3 flex w-[360px] max-w-[95vw] flex-col overflow-hidden border border-rule bg-paper shadow-[0_8px_32px_rgba(17,17,16,0.10)]"
          style={{ height: "520px" }}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-rule bg-paper px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-accent text-[10px] font-medium tracking-wide text-paper">
                SM
              </div>
              <div>
                <p className="font-display text-[0.95rem] font-light leading-none text-ink">
                  Sujith&apos;s Digital Twin
                </p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-mid">
                  AI · Analytics PM · BI
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title="Clear chat history"
                aria-label="Clear chat history"
                className="p-1.5 text-mid transition-colors hover:text-ink"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 3h8M5 3V2h2v1M3 3l.5 7h5L9 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="p-1.5 text-mid transition-colors hover:text-ink"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((msg, i) => {
              const isLastAssistant =
                streaming && i === messages.length - 1 && msg.role === "assistant";
              return (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[84%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-paper"
                        : `border border-rule bg-paper text-ink ${isLastAssistant ? "streaming-cursor" : ""}`
                    }`}
                  >
                    {msg.role === "user" ? msg.content : <Markdown text={msg.content} />}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className="border border-rule bg-paper px-3.5 py-3">
                  <span className="flex gap-1">
                    {[0, 160, 320].map((delay) => (
                      <span
                        key={delay}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-mid"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-rule p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                placeholder="Ask me anything…"
                disabled={busy}
                className="flex-1 border border-rule bg-paper px-3 py-2 text-[13px] text-ink placeholder:text-mid focus:outline-none focus:ring-1 focus:ring-accent/40 disabled:opacity-50"
              />
              <button
                onClick={send}
                disabled={busy || !input.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center bg-accent text-paper transition-opacity hover:opacity-80 disabled:opacity-30"
                aria-label="Send"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M13 1L1 5.5l5 1.5L7.5 13 13 1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-rule bg-paper px-4 py-2 text-center text-[9px] uppercase tracking-[0.15em] text-mid">
            Powered by Groq · GPT OSS 120B
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-accent px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] text-paper shadow-[0_4px_16px_rgba(26,68,128,0.25)] transition-opacity hover:opacity-85"
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path d="M7 1C3.686 1 1 3.238 1 6c0 1.657.9 3.134 2.3 4.1L3 13l2.8-1.4A7.5 7.5 0 007 11c3.314 0 6-2.238 6-5s-2.686-5-6-5z" fill="currentColor"/>
        </svg>
        Digital Twin
      </button>
    </div>
  );
}
