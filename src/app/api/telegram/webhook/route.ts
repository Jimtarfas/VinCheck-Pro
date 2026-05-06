import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { tg, sendTelegram } from "@/lib/telegram";

/**
 * Receives updates from Telegram. Used for admin replies that come back from
 * the Telegram chat. Path-segment secret keeps this URL hard to guess; we
 * additionally verify the X-Telegram-Bot-Api-Secret-Token header.
 *
 * Two reply formats are supported:
 *   1. /r <conversationId> <reply text>     ← explicit
 *   2. Reply directly to a bot message that contains "[id:<conversationId>]"
 *      (we'll look back through recent admin messages for an id tag)
 *
 * The simplest UX is /r — we recommend that.
 */

interface TelegramMessage {
  message_id: number;
  from?: { id: number; username?: string };
  chat: { id: number; type?: "private" | "group" | "supergroup" | "channel" };
  text?: string;
  reply_to_message?: { text?: string };
}

interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
}

export async function POST(req: NextRequest) {
  // Verify secret
  const secretHeader = req.headers.get("x-telegram-bot-api-secret-token");
  const expected = tg.webhookSecret();
  if (expected && secretHeader !== expected) {
    return NextResponse.json({ ok: true }); // silently drop
  }

  let update: TelegramUpdate;
  try {
    update = (await req.json()) as TelegramUpdate;
  } catch {
    return NextResponse.json({ ok: true });
  }

  const msg = update.message;
  if (!msg || !msg.text) return NextResponse.json({ ok: true });

  const text = msg.text.trim();

  // /start, /id, /id@botname — always echo the chat ID, regardless of
  // whether the chat is in the admin allowlist. This is how new admins
  // (and groups) bootstrap their setup.
  if (
    text === "/start" ||
    text === "/id" ||
    text.startsWith("/start@") ||
    text.startsWith("/id@")
  ) {
    const isGroup = msg.chat.type === "group" || msg.chat.type === "supergroup";
    await sendTelegram({
      chatId: String(msg.chat.id),
      text: [
        `<b>👋 CarCheckerVIN bot</b>`,
        ``,
        `${isGroup ? "Group" : "Your"} chat id: <code>${msg.chat.id}</code>`,
        ``,
        `Add this id to <code>TELEGRAM_ADMIN_CHAT</code> in Vercel`,
        `(comma-separated for multiple admins) and redeploy.`,
        ``,
        `<b>To reply to a visitor:</b>`,
        `<code>/r &lt;conversationId&gt; your reply text</code>`,
      ].join("\n"),
    });
    return NextResponse.json({ ok: true });
  }

  // For every other command (/r, etc.), require the chat to be in the
  // admin allowlist — prevents random people from spamming the bot.
  if (!tg.isAdminChat(msg.chat.id)) {
    return NextResponse.json({ ok: true });
  }

  // /r <conversationId> <reply>
  if (text.startsWith("/r ")) {
    const rest = text.slice(3).trim();
    const spaceIdx = rest.indexOf(" ");
    if (spaceIdx < 0) {
      await sendTelegram({
        chatId: String(msg.chat.id),
        text: "Usage: <code>/r &lt;conversationId&gt; &lt;reply&gt;</code>",
      });
      return NextResponse.json({ ok: true });
    }
    const conversationId = rest.slice(0, spaceIdx);
    const replyText = rest.slice(spaceIdx + 1).trim();
    if (!conversationId || !replyText) {
      return NextResponse.json({ ok: true });
    }

    try {
      const admin = createAdminClient();
      const { data: convo } = await admin
        .from("chat_conversations")
        .select("id, unread_visitor")
        .eq("id", conversationId)
        .single();
      if (!convo) {
        await sendTelegram({
          chatId: String(msg.chat.id),
          text: `❌ Conversation <code>${conversationId}</code> not found.`,
        });
        return NextResponse.json({ ok: true });
      }
      await admin.from("chat_messages").insert({
        conversation_id: conversationId,
        sender: "admin",
        body: replyText,
        source: "telegram",
      });
      await admin
        .from("chat_conversations")
        .update({
          last_message_at: new Date().toISOString(),
          unread_admin: 0,
          unread_visitor: ((convo as { unread_visitor?: number }).unread_visitor || 0) + 1,
          status: "open",
        })
        .eq("id", conversationId);

      await sendTelegram({
        chatId: String(msg.chat.id),
        text: `✅ Reply sent.`,
      });
      return NextResponse.json({ ok: true });
    } catch (e) {
      await sendTelegram({
        chatId: String(msg.chat.id),
        text: `❌ Error: ${e instanceof Error ? e.message : "unknown"}`,
      });
      return NextResponse.json({ ok: true });
    }
  }

  // Help fallback
  await sendTelegram({
    chatId: String(msg.chat.id),
    text: [
      `Commands:`,
      `<code>/start</code> — show your chat id`,
      `<code>/r &lt;conversationId&gt; &lt;reply&gt;</code> — reply to a visitor`,
    ].join("\n"),
  });
  return NextResponse.json({ ok: true });
}
