import { NextResponse, type NextRequest } from "next/server";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendTelegram, escapeHtml, chatInlineKeyboard } from "@/lib/telegram";
import { geoFromHeaders, formatGeo } from "@/lib/geo";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.carcheckervin.com";

interface Body {
  visitorId: string;
  name: string;        // now required
  email?: string;
  message: string;
  pageUrl?: string;
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const { visitorId, name, email, message, pageUrl } = body;
  if (!visitorId || typeof visitorId !== "string") {
    return NextResponse.json({ error: "visitorId required" }, { status: 400 });
  }
  if (!name || name.trim().length < 1 || name.length > 100) {
    return NextResponse.json({ error: "name required" }, { status: 400 });
  }
  if (!message || message.trim().length < 1 || message.length > 4000) {
    return NextResponse.json({ error: "message required (1-4000 chars)" }, { status: 400 });
  }

  try {
    const h = await headers();
    const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "";
    const ipHash = ip ? createHash("sha256").update(ip).digest("hex").slice(0, 16) : null;
    const userAgent = h.get("user-agent")?.slice(0, 300) || null;
    const geo = geoFromHeaders(h);

    const admin = createAdminClient();

    // Reuse most-recent OPEN conversation from this visitor if any (so a
    // single visitor doesn't spawn a new thread on every page reload).
    const { data: existing } = await admin
      .from("chat_conversations")
      .select("id, unread_admin")
      .eq("visitor_id", visitorId)
      .eq("status", "open")
      .order("last_message_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    let conversationId: string;
    let isNewConversation = false;
    if (existing?.id) {
      conversationId = existing.id;
      await admin
        .from("chat_conversations")
        .update({
          visitor_name: name.trim(),
          visitor_email: email?.trim() || undefined,
          page_url: pageUrl || undefined,
          last_message_at: new Date().toISOString(),
          unread_admin: (existing.unread_admin || 0) + 1,
          country: geo.country || undefined,
          country_name: geo.countryName || undefined,
          region: geo.region || undefined,
          city: geo.city || undefined,
        })
        .eq("id", conversationId);
    } else {
      isNewConversation = true;
      const { data: created, error: insErr } = await admin
        .from("chat_conversations")
        .insert({
          visitor_id: visitorId,
          visitor_name: name.trim(),
          visitor_email: email?.trim() || null,
          page_url: pageUrl || null,
          user_agent: userAgent,
          ip_hash: ipHash,
          status: "open",
          unread_admin: 1,
          unread_visitor: 0,
          country: geo.country || null,
          country_name: geo.countryName || null,
          region: geo.region || null,
          city: geo.city || null,
        })
        .select("id")
        .single();
      if (insErr || !created) throw insErr || new Error("insert failed");
      conversationId = created.id;
    }

    // Insert visitor message and capture its server id so the client can
    // dedupe its optimistic copy.
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

    // Fire-and-forget Telegram notification with action buttons.
    const geoLine = formatGeo(geo);
    void sendTelegram({
      text: [
        `<b>${isNewConversation ? "💬 New conversation" : "💬 Reply from visitor"}</b>`,
        `<b>From:</b> ${escapeHtml(name.trim())}${email ? ` &lt;${escapeHtml(email)}&gt;` : ""}`,
        geoLine ? `<b>Location:</b> ${escapeHtml(geoLine)}` : "",
        pageUrl ? `<b>On:</b> ${escapeHtml(pageUrl)}` : "",
        ``,
        escapeHtml(message),
      ]
        .filter(Boolean)
        .join("\n"),
      replyMarkup: chatInlineKeyboard(conversationId, SITE),
    });

    return NextResponse.json({
      ok: true,
      conversationId,
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
