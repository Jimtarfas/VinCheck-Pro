import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  tg,
  sendTelegram,
  answerCallbackQuery,
  forceReplyKeyboard,
} from "@/lib/telegram";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.carcheckervin.com";

interface TelegramMessage {
  message_id: number;
  from?: { id: number; username?: string; first_name?: string };
  chat: { id: number; type?: "private" | "group" | "supergroup" | "channel" };
  text?: string;
  reply_to_message?: { text?: string; message_id?: number };
}

interface TelegramCallbackQuery {
  id: string;
  from: { id: number; first_name?: string; username?: string };
  message?: TelegramMessage;
  data?: string;
}

interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  callback_query?: TelegramCallbackQuery;
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

  // ── Inline button taps ────────────────────────────────────────────────
  if (update.callback_query) {
    return handleCallbackQuery(update.callback_query);
  }

  const msg = update.message;
  if (!msg || !msg.text) return NextResponse.json({ ok: true });

  const text = msg.text.trim();

  // ── /start, /id — bootstrap, always allowed ──────────────────────────
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
        `<b>To reply to a visitor:</b> tap the ✍️ Reply button under any message.`,
      ].join("\n"),
    });
    return NextResponse.json({ ok: true });
  }

  // From here on, admin allowlist required
  if (!tg.isAdminChat(msg.chat.id)) {
    return NextResponse.json({ ok: true });
  }

  // ── Force-reply text (button-driven flow) ────────────────────────────
  // When admin tapped "✍️ Reply", we sent a "Reply to <id>" message with
  // force_reply. Telegram now tags the admin's next message as a reply to
  // that prompt. Extract the id and treat the message body as the reply.
  if (msg.reply_to_message?.text) {
    const promptText = msg.reply_to_message.text;
    const idMatch = promptText.match(/Reply to ([0-9a-f-]{36})/i);
    if (idMatch) {
      const conversationId = idMatch[1];
      return await postReply(conversationId, text, String(msg.chat.id));
    }
  }

  // ── Legacy /r <id> <text> command still works ────────────────────────
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
    if (!conversationId || !replyText) return NextResponse.json({ ok: true });
    return await postReply(conversationId, replyText, String(msg.chat.id));
  }

  // ── Help fallback ────────────────────────────────────────────────────
  await sendTelegram({
    chatId: String(msg.chat.id),
    text: [
      `<b>Tip:</b> tap the ✍️ Reply button under any visitor message and just type your reply.`,
      ``,
      `Commands:`,
      `<code>/start</code> — show your chat id`,
      `<code>/r &lt;conversationId&gt; &lt;reply&gt;</code> — manual reply (also works)`,
    ].join("\n"),
  });
  return NextResponse.json({ ok: true });
}

// ─────────────────────────────────────────────────────────────────────────
//  Callback (button tap) handling
// ─────────────────────────────────────────────────────────────────────────

async function handleCallbackQuery(cb: TelegramCallbackQuery): Promise<Response> {
  const data = cb.data || "";
  const chatId = cb.message?.chat.id;
  if (!chatId) {
    await answerCallbackQuery(cb.id);
    return NextResponse.json({ ok: true });
  }
  if (!tg.isAdminChat(chatId)) {
    await answerCallbackQuery(cb.id, "Not authorized");
    return NextResponse.json({ ok: true });
  }

  // reply:<conversationId> — open the force-reply prompt
  if (data.startsWith("reply:")) {
    const conversationId = data.slice("reply:".length);
    await answerCallbackQuery(cb.id, "Type your reply…");
    await sendTelegram({
      chatId: String(chatId),
      text: `✍️ <b>Reply to ${conversationId}</b>\n<i>Type your message and send. The visitor will see it instantly.</i>`,
      replyMarkup: forceReplyKeyboard("Type your reply to the visitor…"),
    });
    return NextResponse.json({ ok: true });
  }

  // close:<conversationId>
  if (data.startsWith("close:")) {
    const conversationId = data.slice("close:".length);
    try {
      const admin = createAdminClient();
      await admin
        .from("chat_conversations")
        .update({ status: "closed" })
        .eq("id", conversationId);
      await answerCallbackQuery(cb.id, "Conversation closed ✓");
    } catch {
      await answerCallbackQuery(cb.id, "Failed to close");
    }
    return NextResponse.json({ ok: true });
  }

  await answerCallbackQuery(cb.id);
  return NextResponse.json({ ok: true });
}

// ─────────────────────────────────────────────────────────────────────────
//  Reply persistence
// ─────────────────────────────────────────────────────────────────────────

async function postReply(
  conversationId: string,
  replyText: string,
  fromChatId: string
): Promise<Response> {
  try {
    const admin = createAdminClient();
    const { data: convo } = await admin
      .from("chat_conversations")
      .select("id, unread_visitor")
      .eq("id", conversationId)
      .single();
    if (!convo) {
      await sendTelegram({
        chatId: fromChatId,
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
        unread_visitor:
          ((convo as { unread_visitor?: number }).unread_visitor || 0) + 1,
        status: "open",
      })
      .eq("id", conversationId);

    await sendTelegram({
      chatId: fromChatId,
      text: `✅ Sent. <a href="${SITE}/admin/chat/${conversationId}">Open thread</a>`,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    await sendTelegram({
      chatId: fromChatId,
      text: `❌ Error: ${e instanceof Error ? e.message : "unknown"}`,
    });
    return NextResponse.json({ ok: true });
  }
}
