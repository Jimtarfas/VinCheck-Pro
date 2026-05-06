import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { MessageCircle, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

interface Conversation {
  id: string;
  visitor_name: string | null;
  visitor_email: string | null;
  page_url: string | null;
  status: "open" | "closed";
  unread_admin: number;
  unread_visitor: number;
  last_message_at: string;
  created_at: string;
  country: string | null;
  country_name: string | null;
  region: string | null;
  city: string | null;
}

function flagFromCC(code: string | null | undefined): string {
  if (!code || code.length !== 2) return "";
  const A = 0x1f1e6;
  const u = code.toUpperCase();
  return (
    String.fromCodePoint(A + u.charCodeAt(0) - 65) +
    String.fromCodePoint(A + u.charCodeAt(1) - 65)
  );
}

interface ConvoWithLast extends Conversation {
  last_body?: string;
}

async function getConversations() {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("chat_conversations")
      .select("*")
      .order("last_message_at", { ascending: false })
      .limit(200);
    if (error) throw error;

    // Fetch last message per conversation
    const convos = (data ?? []) as Conversation[];
    if (convos.length > 0) {
      const ids = convos.map((c) => c.id);
      const { data: lastMsgs } = await admin
        .from("chat_messages")
        .select("conversation_id, body, created_at")
        .in("conversation_id", ids)
        .order("created_at", { ascending: false });
      const lastByConvo = new Map<string, string>();
      for (const m of lastMsgs ?? []) {
        if (!lastByConvo.has(m.conversation_id)) {
          lastByConvo.set(m.conversation_id, m.body);
        }
      }
      const enriched: ConvoWithLast[] = convos.map((c) => ({
        ...c,
        last_body: lastByConvo.get(c.id),
      }));
      const totalUnread = enriched.reduce((a, c) => a + (c.unread_admin || 0), 0);
      const openCount = enriched.filter((c) => c.status === "open").length;
      return { conversations: enriched, totalUnread, openCount, error: null as string | null };
    }

    return { conversations: [] as ConvoWithLast[], totalUnread: 0, openCount: 0, error: null };
  } catch (e) {
    return {
      conversations: [] as ConvoWithLast[],
      totalUnread: 0,
      openCount: 0,
      error: e instanceof Error ? e.message : "unknown",
    };
  }
}

export default async function AdminChatPage() {
  const { conversations, totalUnread, openCount, error } = await getConversations();

  if (error) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h2 className="font-bold text-amber-900 mb-2">Setup required</h2>
        <p className="text-sm text-amber-800 mb-3">{error}</p>
        <p className="text-sm text-amber-800">
          Run the new <code className="bg-amber-100 px-1 rounded">chat_conversations</code> /
          <code className="bg-amber-100 px-1 rounded">chat_messages</code> SQL block from
          <code className="bg-amber-100 px-1 rounded"> supabase-setup.sql</code> in the Supabase SQL Editor.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Stat label="Open Conversations" value={openCount} color="bg-emerald-50 text-emerald-700 border-emerald-100" />
        <Stat label="Unread (You)" value={totalUnread} color="bg-rose-50 text-rose-700 border-rose-100" />
        <Stat label="Total" value={conversations.length} color="bg-blue-50 text-blue-700 border-blue-100" />
      </div>

      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">Live Chat — Conversations</h2>
          <p className="text-xs text-slate-700 mt-0.5">Most recent 200</p>
        </div>
        {conversations.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-700">
            No conversations yet. The chat widget on the public site will start populating this list as visitors message you.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {conversations.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/admin/chat/${c.id}`}
                  className="block p-5 hover:bg-slate-50 transition"
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {(c.visitor_name || c.visitor_email || "?")[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate flex items-center gap-1.5">
                          {c.country && (
                            <span title={c.country_name || c.country} className="text-base leading-none">
                              {flagFromCC(c.country)}
                            </span>
                          )}
                          {c.visitor_name || c.visitor_email || "Anonymous visitor"}
                        </p>
                        <p className="text-xs text-slate-600 truncate">
                          {c.visitor_email && c.visitor_name ? `${c.visitor_email} · ` : ""}
                          {[c.city, c.region, c.country_name].filter(Boolean).join(", ") || ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {c.unread_admin > 0 && (
                        <span className="min-w-5 h-5 px-1.5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center">
                          {c.unread_admin}
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
                          c.status === "open"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-slate-50 text-slate-600 border-slate-200"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                  </div>
                  {c.last_body && (
                    <p className="text-sm text-slate-700 line-clamp-2 ml-11 mt-1">
                      {c.last_body}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-2 ml-11 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(c.last_message_at).toLocaleString()}
                    </span>
                    {c.page_url && (
                      <span className="truncate max-w-[18rem]">{c.page_url}</span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className={`p-5 rounded-xl border ${color} bg-white`}>
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle className="w-4 h-4" />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-3xl font-bold text-slate-900">{value.toLocaleString()}</p>
    </div>
  );
}
