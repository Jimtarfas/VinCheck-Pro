/**
 * Admin-gated manual trigger for the blog-bot cron.
 *
 * Lets the operator fire one publish run from /admin/blog-bot without
 * needing to remember CRON_SECRET, hit the public cron URL, or wait
 * for the next Mon/Wed/Fri 09:17 UTC slot. Useful for:
 *   • initial smoke-test after configuring env vars,
 *   • recovering from a stuck cron,
 *   • backfilling on a slow week.
 *
 * The endpoint just re-uses the same handler the Vercel cron hits —
 * we forward the call internally to /api/cron/blog-bot with a valid
 * authorization, so all of the publish/topic/Claude/Sanity pipeline
 * runs exactly as the scheduled one would.
 *
 * Auth: isAdminEmail gate. No public access.
 */

import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Same ceiling as the cron itself — Anthropic + ClearVin + Sanity
// I/O can take well over a minute on a slow run.
export const maxDuration = 120;

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

  // Build the absolute origin so we can call the sibling route. Same
  // pattern blog-bot-daily uses (callSiblingRoute) — read it from the
  // request URL since process.env.VERCEL_URL doesn't reliably include
  // the protocol.
  const origin = new URL(req.url).origin;
  const cronSecret = process.env.CRON_SECRET || "";

  try {
    const upstream = await fetch(`${origin}/api/cron/blog-bot`, {
      method: "GET",
      headers: {
        // Forward the secret in the Authorization header so the cron
        // route accepts the call. If CRON_SECRET isn't set the route
        // allows all callers anyway (legacy fallback).
        ...(cronSecret ? { Authorization: `Bearer ${cronSecret}` } : {}),
        // Belt-and-braces — also send the vercel-cron marker so the
        // cron handler skips its auth check even if the env var was
        // rotated and our cached copy is stale.
        "vercel-cron": "1",
        "x-triggered-by": `admin:${actorEmail}`,
      },
      // The cron call itself can take ~60s; cap at 110s so we still
      // return before maxDuration kicks in.
      signal: AbortSignal.timeout(110_000),
    });
    const text = await upstream.text();
    // Try to forward the cron's JSON body so the operator sees the
    // exact same shape (slug, voice, tokens, usd) the dashboard
    // expects from a real cron run.
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
