import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface Message {
  id: number;
  sender: "visitor" | "admin";
  body: string;
  created_at: string;
}

/**
 * Poll endpoint for the visitor widget. Returns all messages newer than
 * `since` and clears the visitor's unread counter on every call.
 *
 * GET /api/chat/poll?conversationId=...&visitorId=...&since=<unix-ms>
 */
export async function GET(req: NextRequest) {
  const conversationId = req.nextUrl.searchParams.get("conversationId");
  const visitorId = req.nextUrl.searchParams.get("visitorId");
  const since = Number(req.nextUrl.searchParams.get("since") || "0");

  if (!conversationId || !visitorId) {
    return NextResponse.json({ error: "missing params" }, { status: 400 });
  }

  try {
    const admin = createAdminClient();

    const { data: convo } = await admin
      .from("chat_conversations")
      .select("id, visitor_id")
      .eq("id", conversationId)
      .single();
    if (!convo) return NextResponse.json({ error: "not found" }, { status: 404 });
    if (convo.visitor_id !== visitorId) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    const sinceIso = since > 0 ? new Date(since).toISOString() : new Date(0).toISOString();
    const { data: messages } = await admin
      .from("chat_messages")
      .select("id, sender, body, created_at")
      .eq("conversation_id", conversationId)
      .gt("created_at", sinceIso)
      .order("created_at", { ascending: true });

    // Clear visitor unread badge
    await admin
      .from("chat_conversations")
      .update({ unread_visitor: 0 })
      .eq("id", conversationId);

    return NextResponse.json({
      messages: (messages ?? []) as Message[],
      now: Date.now(),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
