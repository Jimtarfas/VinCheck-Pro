/**
 * Scheduled auto-news run.
 *
 * Triggered daily by Vercel cron (see vercel.json). Pipeline:
 *   1. Authorize (Vercel cron header OR ?token=CRON_SECRET).
 *   2. Fetch latest car news from apitube + filter out already-published sources.
 *   3. Rewrite each fresh source into an original article via Claude (Opus 4.6).
 *   4. Publish to Sanity with noIndex=true + indexAt=now+24h.
 *   5. Log each published article to bot_runs (best-effort).
 *
 * Unlike blog-bot there is NO post budget — news is an ongoing feed. The shared
 * /api/cron/blog-bot-unindex sweep flips noIndex=false once indexAt passes, so
 * no separate un-index route is needed here.
 */

import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { runNewsBot } from "@/lib/news-bot/run";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300; // seconds — several Anthropic calls per run

/** Max new articles to publish per cron invocation. */
const MAX_PUBLISH = 3;

function isAuthorized(req: NextRequest): boolean {
  if (req.headers.get("vercel-cron")) return true;
  const expected = process.env.CRON_SECRET;
  if (!expected) return true;
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const query = req.nextUrl.searchParams.get("token");
  return bearer === expected || query === expected;
}

async function logRuns(
  runId: string,
  startedAt: Date,
  endedAt: Date,
  items: Array<{ slug: string; voice: string; usd: number; inputTokens: number; outputTokens: number }>,
  error?: string
) {
  try {
    const admin = createAdminClient();
    const duration = endedAt.getTime() - startedAt.getTime();
    if (items.length === 0) {
      await admin.from("bot_runs").insert({
        run_id: runId,
        ok: !error,
        started_at: startedAt.toISOString(),
        ended_at: endedAt.toISOString(),
        duration_ms: duration,
        topic_rationale: "auto-news",
        error: error || null,
      });
      return;
    }
    await admin.from("bot_runs").insert(
      items.map((it) => ({
        run_id: runId,
        ok: true,
        started_at: startedAt.toISOString(),
        ended_at: endedAt.toISOString(),
        duration_ms: duration,
        post_slug: it.slug,
        topic_rationale: "auto-news",
        voice: it.voice,
        input_tokens: it.inputTokens,
        output_tokens: it.outputTokens,
        usd_estimate: it.usd,
      }))
    );
  } catch {
    /* never let logging break the cron */
  }
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const runId = randomUUID();
  const startedAt = new Date();

  try {
    const result = await runNewsBot(runId, { maxPublish: MAX_PUBLISH });
    const endedAt = new Date();
    await logRuns(
      runId,
      startedAt,
      endedAt,
      result.published.map((p) => ({
        slug: p.slug,
        voice: p.voice,
        usd: p.usd,
        inputTokens: p.inputTokens,
        outputTokens: p.outputTokens,
      })),
      result.errors.length > 0 ? result.errors.map((e) => e.error).join("; ") : undefined
    );
    return NextResponse.json({
      ok: result.ok,
      runId,
      fetched: result.fetched,
      candidates: result.candidates,
      published: result.published.map((p) => ({ slug: p.slug, voice: p.voice, usd: p.usd })),
      errors: result.errors,
      usd: result.usdTotal,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "news run failed";
    await logRuns(runId, startedAt, new Date(), [], msg);
    return NextResponse.json({ ok: false, error: msg, runId }, { status: 500 });
  }
}
