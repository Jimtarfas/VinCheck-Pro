import { NextResponse, type NextRequest } from "next/server";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendTelegram, escapeHtml, chatInlineKeyboard } from "@/lib/telegram";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.carcheckervin.com";

interface Body {
  visitorId: string;
  name?: string;
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
  if (!message || message.trim().length < 1 || message.length > 4000) {
    return NextResponse.json({ error: "message required (1-4000 chars)" }, { status: 400 });
  }

  try {
    const h = await headers();
    const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "";
    const ipHash = ip ? createHash("sha256").update(ip).digest("hex").slice(0, 16) : null;
    const userAgent = h.get("user-agent")?.slice(0, 300) || null;

    const admin = createAdminClient();

    // Reuse most-recent OPEN conversation from this visitor if any (so a
    // single visitor doesn't spawn a new thread on every page reload).
    const { data: existing } = await admin
      .from("chat_conversations")
      .select("id")
      .eq("visitor_id", visitorId)
      .eq("status", "open")
      .order("last_message_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    let conversationId: string;
    if (existing?.id) {
      conversationId = existing.id;
      await admin
        .from("chat_conversations")
        .update({
          visitor_name: name || undefined,
          visitor_email: email || undefined,
          page_url: pageUrl || undefined,
          last_message_at: new Date().toISOString(),
          unread_admin: ((existing as { unread_admin?: number }).unread_admin || 0) + 1,
        })
        .eq("id", conversationId);
    } else {
      const { data: created, error: insErr } = await admin
        .from("chat_conversations")
        .insert({
          visitor_id: visitorId,
          visitor_name: name || null,
          visitor_email: email || null,
          page_url: pageUrl || null,
          user_agent: userAgent,
          ip_hash: ipHash,
          status: "open",
          unread_admin: 1,
          unread_visitor: 0,
        })
        .select("id")
        .single();
      if (insErr || !created) throw insErr || new Error("insert failed");
      conversationId = created.id;
    }

    await admin.from("chat_messages").insert({
      conversation_id: conversationId,
      sender: "visitor",
      body: message,
      source: "web",
    });

    // Fire-and-forget Telegram notification with action buttons.
    void sendTelegram({
      text: [
        `<b>💬 New chat message</b>`,
        name || email
          ? `<b>From:</b> ${escapeHtml(name || "")} ${email ? `&lt;${escapeHtml(email)}&gt;` : ""}`
          : `<b>From:</b> anonymous`,
        pageUrl ? `<b>On:</b> ${escapeHtml(pageUrl)}` : "",
        ``,
        escapeHtml(message),
      ]
        .filter(Boolean)
        .join("\n"),
      replyMarkup: chatInlineKeyboard(conversationId, SITE),
    });

    return NextResponse.json({ ok: true, conversationId });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
