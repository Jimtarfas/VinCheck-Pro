import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { ArrowLeft, Mail, Calendar, Globe } from "lucide-react";
import ChatThread from "./ChatThread";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

interface Conversation {
  id: string;
  visitor_name: string | null;
  visitor_email: string | null;
  page_url: string | null;
  user_agent: string | null;
  status: "open" | "closed";
  created_at: string;
  last_message_at: string;
}

interface Message {
  id: number;
  sender: "visitor" | "admin";
  body: string;
  source: string;
  created_at: string;
}

async function getThread(id: string) {
  try {
    const admin = createAdminClient();
    const { data: conversation } = await admin
      .from("chat_conversations")
      .select("*")
      .eq("id", id)
      .single();
    if (!conversation) return { conversation: null, messages: [] as Message[], error: null };

    // Mark admin-side read
    await admin
      .from("chat_conversations")
      .update({ unread_admin: 0 })
      .eq("id", id);

    const { data: messages } = await admin
      .from("chat_messages")
      .select("id, sender, body, source, created_at")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true });

    return {
      conversation: conversation as Conversation,
      messages: (messages ?? []) as Message[],
      error: null as string | null,
    };
  } catch (e) {
    return {
      conversation: null,
      messages: [] as Message[],
      error: e instanceof Error ? e.message : "unknown",
    };
  }
}

export default async function AdminChatThreadPage({ params }: Props) {
  const { id } = await params;
  const { conversation, messages, error } = await getThread(id);

  if (error) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-sm text-amber-800">
        {error}
      </div>
    );
  }

  if (!conversation) notFound();

  return (
    <div className="space-y-4">
      <Link
        href="/admin/chat"
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        All conversations
      </Link>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-lg flex-shrink-0">
              {(conversation.visitor_name || conversation.visitor_email || "?")[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-900 text-lg">
                {conversation.visitor_name || conversation.visitor_email || "Anonymous visitor"}
              </p>
              <div className="text-xs text-slate-600 space-y-0.5 mt-0.5">
                {conversation.visitor_email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3 h-3" />
                    <a
                      href={`mailto:${conversation.visitor_email}`}
                      className="text-primary-600 hover:underline truncate"
                    >
                      {conversation.visitor_email}
                    </a>
                  </div>
                )}
                {conversation.page_url && (
                  <div className="flex items-center gap-1.5 truncate max-w-md">
                    <Globe className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{conversation.page_url}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  Started {new Date(conversation.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          <span
            className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full border flex-shrink-0 ${
              conversation.status === "open"
                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                : "bg-slate-50 text-slate-600 border-slate-200"
            }`}
          >
            {conversation.status}
          </span>
        </div>

        {/* Thread + composer (client component) */}
        <ChatThread
          conversationId={conversation.id}
          initialMessages={messages}
          status={conversation.status}
        />
      </div>
    </div>
  );
}
