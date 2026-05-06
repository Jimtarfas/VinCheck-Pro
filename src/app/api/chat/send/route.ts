import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendTelegram, escapeHtml, chatInlineKeyboard } from "@/lib/telegram";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.carcheckervin.com";

interface Body {
  conversationId: string;
  visitorId: string;        // visitor sending — required to authorize visitor side
  message: string;
}

/**
 * Visitor follow-up message (after a conversation has already been started).
 * Admin replies use /api/admin/chat/reply (auth-guarded).
 */
export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const { conversationId, visitorId, message } = body;
  if (!conversationId || !visitorId || !message) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }
  if (message.length > 4000) {
    return NextResponse.json({ error: "message too long" }, { status: 400 });
  }

  try {
    const admin = createAdminClient();

    // Verify visitor owns this conversation
    const { data: convo } = await admin
      .from("chat_conversations")
      .select("id, visitor_id, visitor_name, visitor_email, unread_admin")
      .eq("id", conversationId)
      .single();

    if (!convo) return NextResponse.json({ error: "conversation not found" }, { status: 404 });
    if (convo.visitor_id !== visitorId) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    await admin.from("chat_messages").insert({
      conversation_id: conversationId,
      sender: "visitor",
      body: message,
      source: "web",
    });

    await admin
      .from("chat_conversations")
      .update({
        last_message_at: new Date().toISOString(),
        unread_admin: ((convo as { unread_admin?: number }).unread_admin || 0) + 1,
        status: "open",
      })
      .eq("id", conversationId);

    void sendTelegram({
      text: [
        `<b>💬 Reply from visitor</b>`,
        convo.visitor_name || convo.visitor_email
          ? `<b>From:</b> ${escapeHtml(convo.visitor_name || "")} ${convo.visitor_email ? `&lt;${escapeHtml(convo.visitor_email)}&gt;` : ""}`
          : `<b>From:</b> anonymous`,
        ``,
        escapeHtml(message),
      ]
        .filter(Boolean)
        .join("\n"),
      replyMarkup: chatInlineKeyboard(conversationId, SITE),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
