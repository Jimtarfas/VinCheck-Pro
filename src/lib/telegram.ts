/**
 * Telegram bot helper for live chat relay.
 *
 * Setup (one time):
 *   1. Open Telegram → search "@BotFather" → /newbot → follow prompts.
 *   2. Copy the bot token BotFather gives you.
 *   3. In Vercel env vars, set:
 *        TELEGRAM_BOT_TOKEN  = <bot token>
 *        TELEGRAM_ADMIN_CHAT = <chat id> (one) OR <id1>,<id2>,<id3> (many)
 *        TELEGRAM_WEBHOOK_SECRET = <any random string>
 *   4. Each admin opens the bot in Telegram and sends /start to obtain
 *      their numeric chat id (the bot replies with it). Add every chat id
 *      to TELEGRAM_ADMIN_CHAT, comma-separated. Redeploy.
 *   5. Register the webhook: hit
 *        https://carcheckervin.com/api/telegram/setup?token=<WEBHOOK_SECRET>
 *      and Telegram will start delivering replies to your site.
 *
 * Once configured, every visitor message DMs every listed admin. Any
 * admin can reply with /r <conversationId> <text> from their own
 * Telegram, and the visitor sees it instantly in the chat widget.
 */

const TG_API = "https://api.telegram.org";

function parseAdminChats(): string[] {
  const raw = process.env.TELEGRAM_ADMIN_CHAT || "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export const tg = {
  token: () => process.env.TELEGRAM_BOT_TOKEN || "",
  /** First admin chat (kept for backwards-compat). */
  adminChat: () => parseAdminChats()[0] || "",
  /** All admin chat ids (one or many). */
  adminChats: () => parseAdminChats(),
  /** True if a chat id is in the configured admin list. */
  isAdminChat: (id: string | number) =>
    parseAdminChats().includes(String(id)),
  webhookSecret: () => process.env.TELEGRAM_WEBHOOK_SECRET || "",
  enabled: () =>
    !!process.env.TELEGRAM_BOT_TOKEN && parseAdminChats().length > 0,
};

export interface SendMessageOpts {
  chatId?: string;
  text: string;
  replyMarkup?: unknown;
  parseMode?: "Markdown" | "HTML";
}

/**
 * Send a Telegram message. If `chatId` is omitted, the message is
 * broadcast to every admin chat (one HTTP call per chat).
 */
export async function sendTelegram({
  chatId,
  text,
  replyMarkup,
  parseMode = "HTML",
}: SendMessageOpts): Promise<{
  ok: boolean;
  results?: Array<{ chatId: string; ok: boolean; error?: string; message_id?: number }>;
  message_id?: number;
  error?: string;
}> {
  if (!tg.enabled()) return { ok: false, error: "telegram disabled (no token)" };

  const targets = chatId ? [chatId] : tg.adminChats();
  if (targets.length === 0) return { ok: false, error: "no chat id" };

  const results = await Promise.all(
    targets.map(async (target) => {
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
        const data = (await res.json()) as {
          ok: boolean;
          result?: { message_id: number };
          description?: string;
        };
        return {
          chatId: target,
          ok: data.ok,
          error: data.ok ? undefined : data.description,
          message_id: data.result?.message_id,
        };
      } catch (e) {
        return {
          chatId: target,
          ok: false,
          error: e instanceof Error ? e.message : "unknown",
        };
      }
    })
  );

  const anyOk = results.some((r) => r.ok);
  return {
    ok: anyOk,
    results,
    message_id: results.find((r) => r.ok)?.message_id,
    error: anyOk ? undefined : results[0]?.error,
  };
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
