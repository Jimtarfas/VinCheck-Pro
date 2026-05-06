/**
 * Telegram bot helper for live chat relay.
 *
 * Setup (one time):
 *   1. Open Telegram → search "@BotFather" → /newbot → follow prompts.
 *   2. Copy the bot token BotFather gives you.
 *   3. In Vercel env vars, set:
 *        TELEGRAM_BOT_TOKEN  = <bot token>
 *        TELEGRAM_ADMIN_CHAT = <your numeric chat id — see below>
 *        TELEGRAM_WEBHOOK_SECRET = <any random string>
 *   4. Open Telegram, message your bot once with /start.
 *      Visit https://api.telegram.org/bot<TOKEN>/getUpdates and copy the
 *      `chat.id` from the response into TELEGRAM_ADMIN_CHAT.
 *   5. Register the webhook: just hit
 *        https://carcheckervin.com/api/telegram/setup?token=<WEBHOOK_SECRET>
 *      and Telegram will start delivering replies to your site.
 *
 * Once configured, every new visitor message DMs you on Telegram, and any
 * reply you send back from Telegram (with /r <conversationId> <text> OR
 * just by replying to the bot's message) is forwarded to the visitor in
 * the chat widget.
 */

const TG_API = "https://api.telegram.org";

export const tg = {
  token: () => process.env.TELEGRAM_BOT_TOKEN || "",
  adminChat: () => process.env.TELEGRAM_ADMIN_CHAT || "",
  webhookSecret: () => process.env.TELEGRAM_WEBHOOK_SECRET || "",
  enabled: () => !!process.env.TELEGRAM_BOT_TOKEN && !!process.env.TELEGRAM_ADMIN_CHAT,
};

export interface SendMessageOpts {
  chatId?: string;
  text: string;
  replyMarkup?: unknown;
  parseMode?: "Markdown" | "HTML";
}

export async function sendTelegram({
  chatId,
  text,
  replyMarkup,
  parseMode = "HTML",
}: SendMessageOpts): Promise<{ ok: boolean; message_id?: number; error?: string }> {
  if (!tg.enabled()) return { ok: false, error: "telegram disabled (no token)" };
  const target = chatId || tg.adminChat();
  if (!target) return { ok: false, error: "no chat id" };

  try {
    const res = await fetch(`${TG_API}/bot${tg.token()}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: target,
        text,
        parse_mode: parseMode,
        disable_web_page_preview: true,
        reply_markup: replyMarkup,
      }),
    });
    const data = (await res.json()) as { ok: boolean; result?: { message_id: number }; description?: string };
    if (!data.ok) return { ok: false, error: data.description };
    return { ok: true, message_id: data.result?.message_id };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
