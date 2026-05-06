import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendTelegram, escapeHtml, chatInlineKeyboard } from "@/lib/telegram";
import { geoFromHeaders, formatGeo } from "@/lib/geo";

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
      .select("id, visitor_id, visitor_name, visitor_email, unread_admin, country_name, country, city, region")
      .eq("id", conversationId)
      .single();

    if (!convo) return NextResponse.json({ error: "conversation not found" }, { status: 404 });
    if (convo.visitor_id !== visitorId) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    // Refresh geo on every send (visitor may have moved networks since)
    const h = await headers();
    const geo = geoFromHeaders(h);

    const { data: insertedMsg } = await admin
      .from("chat_messages")
      .insert({
        conversation_id: conversationId,
        sender: "visitor",
        body: message,
        source: "web",
      })
      .select("id, created_at")
      .single();

    await admin
      .from("chat_conversations")
      .update({
        last_message_at: new Date().toISOString(),
        unread_admin: (convo.unread_admin || 0) + 1,
        status: "open",
        // refresh geo if available, otherwise keep existing
        ...(geo.country
          ? {
              country: geo.country,
              country_name: geo.countryName,
              region: geo.region,
              city: geo.city,
            }
          : {}),
      })
      .eq("id", conversationId);

    // Use the freshest geo we have for the Telegram notification
    const effectiveGeo = geo.country
      ? geo
      : {
          country: convo.country || undefined,
          countryName: convo.country_name || undefined,
          region: convo.region || undefined,
          city: convo.city || undefined,
        };
    const geoLine = formatGeo(effectiveGeo);

    void sendTelegram({
      text: [
        `<b>💬 Reply from visitor</b>`,
        convo.visitor_name
          ? `<b>From:</b> ${escapeHtml(convo.visitor_name)}${convo.visitor_email ? ` &lt;${escapeHtml(convo.visitor_email)}&gt;` : ""}`
          : `<b>From:</b> ${convo.visitor_email ? escapeHtml(convo.visitor_email) : "anonymous"}`,
        geoLine ? `<b>Location:</b> ${escapeHtml(geoLine)}` : "",
        ``,
        escapeHtml(message),
      ]
        .filter(Boolean)
        .join("\n"),
      replyMarkup: chatInlineKeyboard(conversationId, SITE),
    });

    return NextResponse.json({
      ok: true,
      messageId: insertedMsg?.id,
      messageCreatedAt: insertedMsg?.created_at,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
