/**
 * Orchestrator for the auto-news pipeline.
 *
 * Fetch latest car news (apitube) → for each fresh source, rewrite into an
 * original article (Claude) → publish to Sanity. Sources already published are
 * skipped cheaply via the deterministic doc id, so each run only spends model
 * tokens on genuinely new stories.
 *
 * Bounded per run: we publish at most `maxPublish` new articles and stop early
 * if we approach the time budget, so a single cron invocation stays well under
 * the serverless cap even when many sources are new.
 */

import { createClient } from "@sanity/client";
import { createHash } from "node:crypto";
import { fetchLatestCarNews, type SourceArticle } from "./apitube";
import { rewriteArticle } from "./rewrite";
import { publishNewsArticle } from "./publish";
import { submitToIndexNow } from "../indexnow";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "s41e632p";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/** Stop starting new articles once this much of the run budget is spent. */
const TIME_BUDGET_MS = 270_000;

function readClient() {
  // Read-only dedupe pre-check; the publish step uses its own write client.
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2024-04-01",
    useCdn: false,
  });
}

function docIdFor(source: SourceArticle): string {
  return `news-${createHash("sha1").update(source.id).digest("hex").slice(0, 16)}`;
}

/** Of the given sources, return those not already published (by doc id). */
async function filterUnpublished(sources: SourceArticle[]): Promise<SourceArticle[]> {
  if (sources.length === 0) return [];
  const ids = sources.map(docIdFor);
  const existing = await readClient().fetch<string[]>(
    `*[_id in $ids]._id`,
    { ids }
  );
  const have = new Set(existing);
  return sources.filter((s) => !have.has(docIdFor(s)));
}

export interface NewsRunItem {
  sourceId: string;
  slug: string;
  voice: string;
  usd: number;
  inputTokens: number;
  outputTokens: number;
}

export interface NewsRunResult {
  ok: boolean;
  published: NewsRunItem[];
  fetched: number;
  candidates: number;
  errors: Array<{ sourceId: string; error: string }>;
  usdTotal: number;
}

export async function runNewsBot(
  runId: string,
  opts: { maxPublish?: number; fetchLimit?: number } = {}
): Promise<NewsRunResult> {
  const maxPublish = opts.maxPublish ?? 3;
  const startedAt = Date.now();

  const sources = await fetchLatestCarNews(opts.fetchLimit ?? 12);
  const candidates = await filterUnpublished(sources);

  const published: NewsRunItem[] = [];
  const errors: Array<{ sourceId: string; error: string }> = [];
  let usdTotal = 0;

  for (const source of candidates) {
    if (published.length >= maxPublish) break;
    if (Date.now() - startedAt > TIME_BUDGET_MS) break;
    try {
      const { draft, voice, usdEstimate, inputTokens, outputTokens } =
        await rewriteArticle(source);
      const result = await publishNewsArticle(source, draft, runId);
      usdTotal += usdEstimate;
      if (result.created) {
        published.push({
          sourceId: source.id,
          slug: result.slug,
          voice,
          usd: usdEstimate,
          inputTokens,
          outputTokens,
        });
      }
    } catch (e) {
      errors.push({
        sourceId: source.id,
        error: e instanceof Error ? e.message : "unknown",
      });
    }
  }

  // News goes live immediately (no noIndex hold), so the daily unindex sweep
  // never touches it — ping IndexNow here so Bing/Copilot pick up new posts
  // right away instead of waiting for the next sitemap crawl.
  if (published.length > 0) {
    try {
      await submitToIndexNow(published.map((p) => `/blog/${p.slug}`));
    } catch {
      /* never let IndexNow break the run */
    }
  }

  return {
    ok: errors.length === 0,
    published,
    fetched: sources.length,
    candidates: candidates.length,
    errors,
    usdTotal,
  };
}
