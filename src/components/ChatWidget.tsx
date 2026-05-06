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
  const [error, setError] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [visitorId, setVisitorId] = useState<string>("");
  const [conversationId, setConversationId] = useState<string>("");
  const [bumpCount, setBumpCount] = useState(0);
  const lastSinceRef = useRef<number>(0);
  // Tracks server-side message IDs we've already rendered (real or local).
  // Prevents duplicate rendering when the poll returns a message we've
  // already shown optimistically.
  const seenServerIdsRef = useRef<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── boot ─────────────────────────────────────────────────────────────
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
      // Intro is done if we have a returning visitor with a stored name
      if (cid && n) setIntroDone(true);
    } catch {
      // localStorage unavailable
    }
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages.length, open]);

  // ── add a message, deduped by server id ──────────────────────────────
  const addMessage = useCallback((m: ChatMessage) => {
    const idStr = String(m.id);
    if (seenServerIdsRef.current.has(idStr)) return;
    seenServerIdsRef.current.add(idStr);
    setMessages((prev) => [...prev, m]);
  }, []);

  // Replace an optimistic local message with its server-confirmed copy.
  const replaceLocalMessage = useCallback(
    (localId: string, serverMsg: ChatMessage) => {
      const serverIdStr = String(serverMsg.id);
      if (seenServerIdsRef.current.has(serverIdStr)) return;
      seenServerIdsRef.current.add(serverIdStr);
      setMessages((prev) =>
        prev.map((m) => (String(m.id) === localId ? serverMsg : m))
      );
    },
    []
  );

  // ── poll ─────────────────────────────────────────────────────────────
  const poll = useCallback(async () => {
    if (!conversationId || !visitorId) return;
    try {
      const r = await fetch(
        `/api/chat/poll?conversationId=${conversationId}&visitorId=${visitorId}&since=${lastSinceRef.current}`,
        { cache: "no-store" }
      );
      if (!r.ok) return;
      const data = (await r.json()) as { messages: ChatMessage[]; now: number };
      let adminAdded = 0;
      for (const m of data.messages) {
        const idStr = String(m.id);
        if (seenServerIdsRef.current.has(idStr)) continue;
        seenServerIdsRef.current.add(idStr);
        setMessages((prev) => [...prev, m]);
        if (m.sender === "admin") adminAdded++;
      }
      if (adminAdded > 0 && !open) {
        setBumpCount((c) => c + adminAdded);
      }
      lastSinceRef.current = data.now;
    } catch {
      // ignore
    }
  }, [conversationId, visitorId, open]);

  useEffect(() => {
    if (!conversationId) return;
    poll();
    const id = setInterval(poll, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [conversationId, poll]);

  useEffect(() => {
    if (open) setBumpCount(0);
  }, [open]);

  // ── send first message (creates conversation) ────────────────────────
  async function startConversation(message: string) {
    setError("");
    setSending(true);

    // Optimistic local message
    const localId = `local-${Date.now()}`;
    setMessages((m) => [
      ...m,
      {
        id: localId,
        sender: "visitor",
        body: message,
        created_at: new Date().toISOString(),
      },
    ]);
    setDraft("");

    try {
      const r = await fetch("/api/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          name: name.trim(),
          email: email.trim() || undefined,
          message,
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
      const data = (await r.json()) as {
        ok?: boolean;
        conversationId?: string;
        messageId?: number;
        messageCreatedAt?: string;
        error?: string;
      };
      if (!data.ok || !data.conversationId) {
        throw new Error(data.error || "Failed to send. Try again?");
      }
      setConversationId(data.conversationId);
      try {
        localStorage.setItem(STORAGE_CONVERSATION, data.conversationId);
        localStorage.setItem(STORAGE_NAME, name.trim());
        if (email.trim()) localStorage.setItem(STORAGE_EMAIL, email.trim());
      } catch {
        // ignore
      }
      // Replace the optimistic local message with the server-confirmed
      // copy so the upcoming poll won't duplicate it.
      if (data.messageId) {
        replaceLocalMessage(localId, {
          id: data.messageId,
          sender: "visitor",
          body: message,
          created_at: data.messageCreatedAt || new Date().toISOString(),
        });
        // Advance the poll cursor past our own message so the next poll
        // doesn't return it.
        if (data.messageCreatedAt) {
          lastSinceRef.current = new Date(data.messageCreatedAt).getTime();
        }
      }
      setIntroDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send.");
      // remove the failed optimistic message
      setMessages((m) => m.filter((msg) => msg.id !== localId));
    } finally {
      setSending(false);
    }
  }

  // ── follow-up message ────────────────────────────────────────────────
  async function sendMessage(message: string) {
    if (!conversationId) return;
    setError("");
    setSending(true);

    const localId = `local-${Date.now()}`;
    setMessages((m) => [
      ...m,
      {
        id: localId,
        sender: "visitor",
        body: message,
        created_at: new Date().toISOString(),
      },
    ]);
    setDraft("");

    try {
      const r = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, visitorId, message }),
      });
      const data = (await r.json()) as {
        ok?: boolean;
        messageId?: number;
        messageCreatedAt?: string;
        error?: string;
      };
      if (!data.ok) throw new Error(data.error || "Failed to send.");
      if (data.messageId) {
        replaceLocalMessage(localId, {
          id: data.messageId,
          sender: "visitor",
          body: message,
          created_at: data.messageCreatedAt || new Date().toISOString(),
        });
        if (data.messageCreatedAt) {
          lastSinceRef.current = new Date(data.messageCreatedAt).getTime();
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send.");
      setMessages((m) => m.filter((msg) => msg.id !== localId));
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    if (!introDone) {
      // Validate name before allowing first message
      if (!name.trim()) {
        setError("Please enter your name so we know who we're talking to.");
        return;
      }
      startConversation(text);
    } else {
      sendMessage(text);
    }
  }

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
          className="fixed bottom-5 right-5 z-[60] w-[calc(100vw-2.5rem)] sm:w-96 max-w-md h-[calc(100vh-6rem)] sm:h-[36rem] bg-white rounded-2xl shadow-2xl shadow-slate-900/20 border border-slate-200 flex flex-col overflow-hidden"
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
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {!introDone && messages.length === 0 && (
              <div className="bg-white rounded-2xl p-4 border border-slate-200">
                <p className="text-sm text-slate-700">
                  👋 Hi! Tell us your name and what you&rsquo;re wondering about — we&rsquo;ll get right back to you.
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

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl px-3 py-2">
                {error}
              </div>
            )}
          </div>

          {/* Composer */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200 bg-white">
            {!introDone && (
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Your name *"
                  required
                  maxLength={100}
                  className={`text-sm px-3 py-2 rounded-lg border outline-none focus:ring-2 ${
                    error && !name.trim()
                      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                      : "border-slate-200 focus:border-primary-400 focus:ring-primary-100"
                  }`}
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
                placeholder={!introDone ? "What can we help with?" : "Type a message..."}
                disabled={sending}
                maxLength={4000}
                className="flex-1 text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!draft.trim() || sending || (!introDone && !name.trim())}
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
