"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Send, Loader2, CheckCircle2, XCircle } from "lucide-react";

interface Message {
  id: number | string;
  sender: "visitor" | "admin";
  body: string;
  source?: string;
  created_at: string;
}

interface Props {
  conversationId: string;
  initialMessages: Message[];
  status: "open" | "closed";
}

const POLL_INTERVAL = 5000;

export default function ChatThread({ conversationId, initialMessages, status: initialStatus }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"open" | "closed">(initialStatus);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const lastSinceRef = useRef<number>(
    initialMessages.length > 0
      ? new Date(initialMessages[initialMessages.length - 1].created_at).getTime()
      : 0
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages.length]);

  const poll = useCallback(async () => {
    try {
      // Reuse poll endpoint but as admin we just fetch directly via admin GET
      // Actually simpler: re-fetch via the visitor poll route is per-visitor.
      // We use a small admin-only fetch via /api/admin/chat/messages.
      const r = await fetch(
        `/api/admin/chat/messages?conversationId=${conversationId}&since=${lastSinceRef.current}`,
        { cache: "no-store" }
      );
      if (!r.ok) return;
      const data = (await r.json()) as { messages: Message[]; now: number };
      if (data.messages.length > 0) {
        setMessages((prev) => [...prev, ...data.messages]);
      }
      lastSinceRef.current = data.now;
    } catch {
      // ignore
    }
  }, [conversationId]);

  useEffect(() => {
    const id = setInterval(poll, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [poll]);

  async function send(text: string) {
    setSending(true);
    setMessages((m) => [
      ...m,
      {
        id: `local-${Date.now()}`,
        sender: "admin",
        body: text,
        created_at: new Date().toISOString(),
      },
    ]);
    setDraft("");
    try {
      await fetch("/api/admin/chat/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, message: text }),
      });
    } catch {
      // ignore
    } finally {
      setSending(false);
    }
  }

  async function toggleStatus() {
    const next = status === "open" ? "closed" : "open";
    setStatusUpdating(true);
    try {
      const r = await fetch("/api/admin/chat/close", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, status: next }),
      });
      if (r.ok) setStatus(next);
    } finally {
      setStatusUpdating(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = draft.trim();
    if (!t || sending) return;
    send(t);
  }

  return (
    <>
      <div
        ref={scrollRef}
        className="max-h-[560px] overflow-y-auto p-5 space-y-3 bg-slate-50"
      >
        {messages.length === 0 ? (
          <p className="text-center text-sm text-slate-500 py-8">No messages yet.</p>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === "admin" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                  m.sender === "admin"
                    ? "bg-primary-600 text-white rounded-br-md"
                    : "bg-white text-slate-800 border border-slate-200 rounded-bl-md"
                }`}
              >
                {m.body}
                <div className={`text-[10px] mt-1 ${m.sender === "admin" ? "text-white/70" : "text-slate-400"}`}>
                  {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  {m.source === "telegram" && " · via Telegram"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={status === "closed" ? "Reopen the conversation to reply" : "Type a reply…"}
            disabled={sending || status === "closed"}
            maxLength={4000}
            className="flex-1 text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!draft.trim() || sending || status === "closed"}
            className="w-10 h-10 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white flex items-center justify-center"
            aria-label="Send"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={toggleStatus}
            disabled={statusUpdating}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5"
          >
            {status === "open" ? (
              <>
                <XCircle className="w-3.5 h-3.5" />
                Mark as closed
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Reopen conversation
              </>
            )}
          </button>
          <span className="text-[10px] text-slate-400">
            Replies arrive in the visitor&rsquo;s widget within ~4s
          </span>
        </div>
      </form>
    </>
  );
}
