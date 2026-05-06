"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, CheckCircle2 } from "lucide-react";

interface ChatMessage {
  id: number | string;
  sender: "visitor" | "admin";
  body: string;
  created_at: string;
}

const POLL_INTERVAL = 4000; // 4s — gentle on the API
const STORAGE_VISITOR_ID = "ccv_chat_visitor_id";
const STORAGE_CONVERSATION = "ccv_chat_conversation_id";
const STORAGE_NAME = "ccv_chat_visitor_name";
const STORAGE_EMAIL = "ccv_chat_visitor_email";

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [visitorId, setVisitorId] = useState<string>("");
  const [conversationId, setConversationId] = useState<string>("");
  const [bumpCount, setBumpCount] = useState(0); // unread badge
  const lastSinceRef = useRef<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── boot: hydrate visitor id + restore previous conversation ─────────
  useEffect(() => {
    try {
      let vid = localStorage.getItem(STORAGE_VISITOR_ID);
      if (!vid) {
        vid = uuid();
        localStorage.setItem(STORAGE_VISITOR_ID, vid);
      }
      setVisitorId(vid);

      const cid = localStorage.getItem(STORAGE_CONVERSATION);
      if (cid) setConversationId(cid);

      const n = localStorage.getItem(STORAGE_NAME);
      const e = localStorage.getItem(STORAGE_EMAIL);
      if (n) setName(n);
      if (e) setEmail(e);
      if (cid && (n || e)) setIntroDone(true);
    } catch {
      // localStorage may be unavailable; widget still works for the session.
    }
  }, []);

  // ── auto-scroll to latest message ────────────────────────────────────
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages.length, open]);

  // ── poll for new messages ────────────────────────────────────────────
  const poll = useCallback(async () => {
    if (!conversationId || !visitorId) return;
    try {
      const r = await fetch(
        `/api/chat/poll?conversationId=${conversationId}&visitorId=${visitorId}&since=${lastSinceRef.current}`,
        { cache: "no-store" }
      );
      if (!r.ok) return;
      const data = (await r.json()) as { messages: ChatMessage[]; now: number };
      if (data.messages.length > 0) {
        setMessages((prev) => [...prev, ...data.messages]);
        // bump unread badge if widget is closed
        if (!open) {
          setBumpCount((c) => c + data.messages.filter((m) => m.sender === "admin").length);
        }
      }
      lastSinceRef.current = data.now;
    } catch {
      // ignore poll errors
    }
  }, [conversationId, visitorId, open]);

  useEffect(() => {
    if (!conversationId) return;
    poll(); // immediate
    const id = setInterval(poll, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [conversationId, poll]);

  // ── opening widget clears unread ─────────────────────────────────────
  useEffect(() => {
    if (open) setBumpCount(0);
  }, [open]);

  // ── send first message (creates conversation) ────────────────────────
  async function startConversation(message: string) {
    setSending(true);
    try {
      const r = await fetch("/api/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          name: name.trim() || undefined,
          email: email.trim() || undefined,
          message,
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
      const data = (await r.json()) as { ok?: boolean; conversationId?: string; error?: string };
      if (!data.ok || !data.conversationId) throw new Error(data.error || "failed");
      setConversationId(data.conversationId);
      try {
        localStorage.setItem(STORAGE_CONVERSATION, data.conversationId);
        if (name) localStorage.setItem(STORAGE_NAME, name);
        if (email) localStorage.setItem(STORAGE_EMAIL, email);
      } catch {
        // ignore localStorage errors
      }
      // optimistic add
      setMessages((m) => [
        ...m,
        {
          id: `local-${Date.now()}`,
          sender: "visitor",
          body: message,
          created_at: new Date().toISOString(),
        },
      ]);
      setIntroDone(true);
      setDraft("");
    } catch {
      // show inline error briefly
    } finally {
      setSending(false);
    }
  }

  // ── follow-up message ────────────────────────────────────────────────
  async function sendMessage(message: string) {
    if (!conversationId) return;
    setSending(true);
    setMessages((m) => [
      ...m,
      {
        id: `local-${Date.now()}`,
        sender: "visitor",
        body: message,
        created_at: new Date().toISOString(),
      },
    ]);
    setDraft("");
    try {
      await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, visitorId, message }),
      });
    } catch {
      // ignore
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    if (!conversationId) startConversation(text);
    else sendMessage(text);
  }

  // ── UI ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Floating bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 text-white shadow-2xl shadow-primary-900/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        >
          <MessageCircle className="w-6 h-6" />
          {bumpCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center border-2 border-white">
              {bumpCount}
            </span>
          )}
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat with us"
          className="fixed bottom-5 right-5 z-[60] w-[calc(100vw-2.5rem)] sm:w-96 max-w-md h-[calc(100vh-6rem)] sm:h-[36rem] bg-white rounded-2xl shadow-2xl shadow-slate-900/20 border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
          style={{ animation: "fadeInUp 0.2s ease-out" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-4 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-bold text-base">CarCheckerVIN Support</h3>
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                We typically reply within minutes
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="w-8 h-8 -mt-1 -mr-1 rounded-full hover:bg-white/10 flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50"
          >
            {messages.length === 0 && !introDone && (
              <div className="bg-white rounded-2xl p-4 border border-slate-200">
                <p className="text-sm text-slate-700">
                  👋 Hi! Have a question about a VIN report or your account? Drop us a message and we&rsquo;ll get back to you as soon as possible.
                </p>
              </div>
            )}

            {/* Welcome message after intro */}
            {introDone && messages.length === 0 && (
              <div className="bg-white rounded-2xl p-4 border border-slate-200">
                <p className="text-sm text-slate-700">
                  Thanks{name ? `, ${name.split(" ")[0]}` : ""}! Your message is on its way.
                </p>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === "visitor" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                    m.sender === "visitor"
                      ? "bg-primary-600 text-white rounded-br-md"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-md"
                  }`}
                >
                  {m.body}
                </div>
              </div>
            ))}
          </div>

          {/* Composer */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-slate-200 bg-white"
          >
            {!introDone && (
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="text-sm px-3 py-2 rounded-lg border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (optional)"
                  className="text-sm px-3 py-2 rounded-lg border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none"
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message..."
                disabled={sending}
                maxLength={4000}
                className="flex-1 text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!draft.trim() || sending}
                className="w-10 h-10 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white flex items-center justify-center transition flex-shrink-0"
                aria-label="Send"
              >
                {sending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="mt-2 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Encrypted &amp; private &middot; Replies sent to your email
            </p>
          </form>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
