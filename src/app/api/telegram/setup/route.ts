import { NextResponse, type NextRequest } from "next/server";
import { tg } from "@/lib/telegram";

/**
 * One-time helper: registers our webhook URL with Telegram so it knows where
 * to deliver updates.
 *
 * Hit this URL once after setting env vars:
 *   https://www.carcheckervin.com/api/telegram/setup?token=<TELEGRAM_WEBHOOK_SECRET>
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!tg.webhookSecret() || token !== tg.webhookSecret()) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (!tg.token()) {
    return NextResponse.json({ error: "TELEGRAM_BOT_TOKEN not set" }, { status: 400 });
  }

  const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.carcheckervin.com";
  const webhookUrl = `${SITE}/api/telegram/webhook`;

  try {
    const r = await fetch(`https://api.telegram.org/bot${tg.token()}/setWebhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: webhookUrl,
        secret_token: tg.webhookSecret(),
        allowed_updates: ["message"],
      }),
    });
    const data = await r.json();
    return NextResponse.json({ webhook: webhookUrl, telegram: data });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
