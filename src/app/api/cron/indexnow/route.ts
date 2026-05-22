/**
 * Daily IndexNow batch refresh.
 *
 * Scheduled by Vercel cron (see vercel.json). Pulls every URL from our
 * sitemap and re-submits to IndexNow so Bing/Yandex/Naver see recent
 * activity even when no Sanity webhook fires.
 *
 * Vercel cron headers carry an `Authorization: Bearer <CRON_SECRET>`
 * header — we verify it to prevent the public from triggering this.
 */

import { NextResponse, type NextRequest } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.carcheckervin.com";
// Vercel sends `vercel-cron: 1` header on scheduled invocations.
// We additionally accept a manual token via ?token= for ops/debug.
function isAuthorized(req: NextRequest): boolean {
  if (req.headers.get("vercel-cron")) return true;
  const expected = process.env.CRON_SECRET;
  if (!expected) return true; // no secret configured = allow
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const query = req.nextUrl.searchParams.get("token");
  return bearer === expected || query === expected;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const r = await fetch(`${SITE}/sitemap.xml`, { cache: "no-store" });
    const xml = await r.text();
    const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);

    if (urls.length === 0) {
      return NextResponse.json({ ok: false, error: "no urls in sitemap" }, { status: 500 });
    }

    // Split into batches of <=10K (the IndexNow per-call limit) and submit
    // each batch. Sitemaps under 10K URLs become a single call.
    const BATCH = 1000;
    const batches: string[][] = [];
    for (let i = 0; i < urls.length; i += BATCH) {
      batches.push(urls.slice(i, i + BATCH));
    }

    let totalSubmitted = 0;
    const results: Array<{ batch: number; count: number; ok: boolean; status: number }> = [];
    for (let i = 0; i < batches.length; i++) {
      const res = await submitToIndexNow(batches[i]);
      results.push({ batch: i + 1, count: res.count, ok: res.ok, status: res.status });
      if (res.ok) totalSubmitted += res.count;
      // Be polite — small spacing between large batches
      if (i < batches.length - 1) await new Promise((r) => setTimeout(r, 300));
    }

    return NextResponse.json({
      ok: true,
      sitemapUrls: urls.length,
      submitted: totalSubmitted,
      batches: results,
      ran: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
