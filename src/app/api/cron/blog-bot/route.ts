/**
 * Scheduled blog-bot run.
 *
 * Triggered by Vercel cron Mon/Wed/Fri at ~09:17 UTC (see vercel.json).
 * Pipeline:
 *   1. Authorize (Vercel cron header OR ?token=CRON_SECRET).
 *   2. Check the 50-post auto-pause budget against bot_runs in Supabase.
 *   3. Discover next topic (Google Trends + seed pool, deduped vs Sanity).
 *   4. Generate the draft via Claude (Opus 4.6).
 *   5. Publish to Sanity with noIndex=true + indexAt=now+24h.
 *   6. Log run to bot_runs.
 *
 * Total runtime budget: ~60s (well under Vercel's serverless cap).
 */

import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { discoverNextTopic } from "@/lib/blog-bot/topics";
import { fetchClaudeDraft } from "@/lib/blog-bot/claude";
import { publishDraftToSanity } from "@/lib/blog-bot/publish";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120; // seconds — Anthropic call alone can take 60s+

/** Auto-pause budget: stop publishing once this many successful runs land. */
const POST_BUDGET = 50;

function isAuthorized(req: NextRequest): boolean {
  if (req.headers.get("vercel-cron")) return true;
  const expected = process.env.CRON_SECRET;
  if (!expected) return true;
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const query = req.nextUrl.searchParams.get("token");
  return bearer === expected || query === expected;
}

async function logRun(payload: {
  runId: string;
  ok: boolean;
  startedAt: Date;
  endedAt: Date;
  postSlug?: string;
  topicRationale?: string;
  voice?: string;
  error?: string;
  inputTokens?: number;
  outputTokens?: number;
  usdEstimate?: number;
}) {
  try {
    const admin = createAdminClient();
    await admin.from("bot_runs").insert({
      run_id: payload.runId,
      ok: payload.ok,
      started_at: payload.startedAt.toISOString(),
      ended_at: payload.endedAt.toISOString(),
      duration_ms: payload.endedAt.getTime() - payload.startedAt.getTime(),
      post_slug: payload.postSlug || null,
      topic_rationale: payload.topicRationale || null,
      voice: payload.voice || null,
      error: payload.error || null,
      input_tokens: payload.inputTokens || null,
      output_tokens: payload.outputTokens || null,
      usd_estimate: payload.usdEstimate || null,
    });
  } catch {
    /* never let logging break the cron */
  }
}

async function currentBudget(): Promise<{ used: number; remaining: number }> {
  const admin = createAdminClient();
  // Counts every ok=true run we've ever logged. When you reset the budget,
  // truncate bot_runs (or add a `cycle_started_at` column and filter on it).
  const { count } = await admin
    .from("bot_runs")
    .select("id", { count: "exact", head: true })
    .eq("ok", true);
  const used = count || 0;
  return { used, remaining: Math.max(0, POST_BUDGET - used) };
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const runId = randomUUID();
  const startedAt = new Date();

  // ── Budget check ──
  let budget: { used: number; remaining: number };
  try {
    budget = await currentBudget();
  } catch (e) {
    const msg = e instanceof Error ? e.message : "budget query failed";
    return NextResponse.json({ ok: false, error: msg, runId }, { status: 500 });
  }
  if (budget.remaining <= 0) {
    await logRun({
      runId,
      ok: false,
      startedAt,
      endedAt: new Date(),
      error: `auto-paused: ${POST_BUDGET}-post budget exhausted`,
    });
    return NextResponse.json(
      { ok: false, paused: true, used: budget.used, budget: POST_BUDGET },
      { status: 200 }
    );
  }

  // ── Topic discovery ──
  let topic;
  try {
    topic = await discoverNextTopic();
  } catch (e) {
    const msg = e instanceof Error ? e.message : "topic discovery failed";
    await logRun({ runId, ok: false, startedAt, endedAt: new Date(), error: msg });
    return NextResponse.json({ ok: false, error: msg, runId }, { status: 500 });
  }
  if (!topic) {
    await logRun({
      runId,
      ok: false,
      startedAt,
      endedAt: new Date(),
      error: "no novel topic found",
    });
    return NextResponse.json(
      { ok: false, error: "no novel topic", runId },
      { status: 200 }
    );
  }

  // ── Draft + publish ──
  try {
    const draftResult = await fetchClaudeDraft(topic, runId);
    const published = await publishDraftToSanity(topic, draftResult.draft, runId);
    const endedAt = new Date();
    await logRun({
      runId,
      ok: true,
      startedAt,
      endedAt,
      postSlug: published.slug,
      topicRationale: topic.rationale,
      voice: draftResult.voice,
      inputTokens: draftResult.inputTokens,
      outputTokens: draftResult.outputTokens,
      usdEstimate: draftResult.usdEstimate,
    });
    return NextResponse.json({
      ok: true,
      runId,
      slug: published.slug,
      indexAt: published.indexAt,
      voice: draftResult.voice,
      usd: draftResult.usdEstimate,
      tokens: { input: draftResult.inputTokens, output: draftResult.outputTokens },
      budget: { used: budget.used + 1, remaining: budget.remaining - 1 },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "publish failed";
    await logRun({
      runId,
      ok: false,
      startedAt,
      endedAt: new Date(),
      topicRationale: topic.rationale,
      error: msg,
    });
    return NextResponse.json({ ok: false, error: msg, runId }, { status: 502 });
  }
}
