/**
 * Admin-gated manual trigger for the auto-news cron.
 *
 * Lets the operator fire one news-publish run from /admin/blog-bot
 * without needing to remember CRON_SECRET, hit the public cron URL, or
 * wait for the daily 09:17 UTC slot. Useful for the initial smoke-test
 * right after adding APITUBE_API_KEY, and for impatient backfills.
 *
 * Mirrors /api/admin/blog-bot/run — it just forwards internally to
 * /api/cron/news-bot with a valid authorization, so the full
 * apitube → Claude rewrite → Sanity publish pipeline runs exactly as
 * the scheduled one would.
 *
 * Auth: isAdminEmail gate. No public access.
 */

import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// The news cron runs several Anthropic calls (up to MAX_PUBLISH=3), so
// it can take a couple of minutes — give it room under the platform cap.
export const maxDuration = 300;

export async function POST(req: Request) {
  // Admin gate — mirrors every other /api/admin/* route.
  let actorEmail: string | null = null;
  try {
    const supa = await createServerClient();
    const { data } = await supa.auth.getUser();
    actorEmail = data.user?.email ?? null;
  } catch {
    /* fall through */
  }
  if (!isAdminEmail(actorEmail)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Build the absolute origin so we can call the sibling cron route.
  const origin = new URL(req.url).origin;
  const cronSecret = process.env.CRON_SECRET || "";

  try {
    const upstream = await fetch(`${origin}/api/cron/news-bot`, {
      method: "GET",
      headers: {
        // Forward the secret so the cron route accepts the call. If
        // CRON_SECRET isn't set the route allows all callers anyway.
        ...(cronSecret ? { Authorization: `Bearer ${cronSecret}` } : {}),
        // Belt-and-braces — also send the vercel-cron marker so the
        // handler skips its auth check even if our cached secret is stale.
        "vercel-cron": "1",
        "x-triggered-by": `admin:${actorEmail}`,
      },
      // The run can take a couple of minutes; cap just under maxDuration.
      signal: AbortSignal.timeout(290_000),
    });
    const text = await upstream.text();
    // Forward the cron's JSON body so the button can surface the exact
    // shape (published[], usd, errors) the news cron returns.
    let parsed: unknown = text;
    try {
      parsed = JSON.parse(text);
    } catch {
      /* fall through with raw text */
    }
    return NextResponse.json(
      {
        ok: upstream.ok,
        status: upstream.status,
        result: parsed,
      },
      { status: upstream.ok ? 200 : 502 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : String(e),
      },
      { status: 500 }
    );
  }
}
