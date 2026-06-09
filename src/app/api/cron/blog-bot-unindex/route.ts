/**
 * Daily un-index sweep.
 *
 * Flips noIndex=false on every bot-generated post whose indexAt has
 * passed. Runs once a day via Vercel cron. After flipping, also pings
 * IndexNow so Bing picks the post up immediately.
 */

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@sanity/client";
import { submitToIndexNow } from "@/lib/indexnow";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "s41e632p";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

function isAuthorized(req: NextRequest): boolean {
  if (req.headers.get("vercel-cron")) return true;
  const expected = process.env.CRON_SECRET;
  if (!expected) return true;
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const query = req.nextUrl.searchParams.get("token");
  return bearer === expected || query === expected;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "SANITY_API_TOKEN required" },
      { status: 500 }
    );
  }

  const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2024-04-01",
    token,
    useCdn: false,
  });

  // Find bot-generated posts whose indexAt has passed and are still
  // noIndex=true. We rely on a single GROQ query, then patch each.
  const candidates = await client.fetch<
    Array<{ _id: string; slug: { current: string }; indexAt: string }>
  >(
    `*[_type=="post" && botGenerated == true && noIndex == true && defined(indexAt) && indexAt <= now()]{ _id, slug, indexAt }`
  );

  if (candidates.length === 0) {
    return NextResponse.json({ ok: true, unindexed: 0, ran: new Date().toISOString() });
  }

  const unflipped: string[] = [];
  const errors: Array<{ id: string; error: string }> = [];
  for (const c of candidates) {
    try {
      await client
        .patch(c._id)
        .set({ noIndex: false })
        .commit({ visibility: "async" });
      unflipped.push(`/blog/${c.slug.current}`);
    } catch (e) {
      errors.push({ id: c._id, error: e instanceof Error ? e.message : "unknown" });
    }
  }

  // Tell Bing about the newly-indexable posts so they don't wait for the
  // next sitemap crawl. submitToIndexNow handles batching internally.
  let indexNowResult: Awaited<ReturnType<typeof submitToIndexNow>> | null = null;
  if (unflipped.length > 0) {
    indexNowResult = await submitToIndexNow(unflipped);
  }

  return NextResponse.json({
    ok: errors.length === 0,
    unindexed: unflipped.length,
    urls: unflipped,
    errors,
    indexNow: indexNowResult,
    ran: new Date().toISOString(),
  });
}
