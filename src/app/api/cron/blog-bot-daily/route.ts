/**
 * Combined daily blog-bot cron.
 *
 * Vercel Hobby allows 2 cron jobs total; this route packs both the
 * "publish a new post" and "un-index aged posts" workloads into a single
 * daily invocation to stay within that budget. (If you upgrade to Pro
 * you can split these back into /api/cron/blog-bot and
 * /api/cron/blog-bot-unindex — both already exist as standalone routes.)
 *
 * Logic per run:
 *   1. ALWAYS sweep noIndex flips on bot posts whose indexAt has passed.
 *   2. If today is a publish day (Mon/Wed/Fri UTC), also generate +
 *      publish a new post via the same pipeline the standalone route uses.
 *   3. Return a combined report.
 *
 * Scheduled by Vercel at 09:17 UTC daily (see vercel.json). The off-half-
 * hour minute is deliberate — most ops/observability dashboards cluster
 * on :00 and :30, so :17 means our writes don't pile up against Sanity's
 * peak-of-the-hour batch processors.
 */

import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const PUBLISH_DOW = new Set([1, 3, 5]); // Mon, Wed, Fri (Sun=0)

function isAuthorized(req: NextRequest): boolean {
  if (req.headers.get("vercel-cron")) return true;
  const expected = process.env.CRON_SECRET;
  if (!expected) return true;
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const query = req.nextUrl.searchParams.get("token");
  return bearer === expected || query === expected;
}

async function callSiblingRoute(
  req: NextRequest,
  path: string
): Promise<unknown> {
  // Use the same origin as the inbound request — works on Vercel preview
  // and prod without a hardcoded URL.
  const origin = req.nextUrl.origin;
  const headers: Record<string, string> = {};
  // Forward our authorization so the sibling route accepts the call.
  const auth = req.headers.get("authorization");
  if (auth) headers.authorization = auth;
  if (req.headers.get("vercel-cron")) headers["vercel-cron"] = "1";
  if (!headers.authorization && process.env.CRON_SECRET) {
    headers.authorization = `Bearer ${process.env.CRON_SECRET}`;
  }
  const res = await fetch(`${origin}${path}`, { method: "GET", headers });
  try {
    return await res.json();
  } catch {
    return { ok: false, status: res.status, error: "non-json sibling response" };
  }
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // 1. Always sweep noIndex
  const unindex = await callSiblingRoute(req, "/api/cron/blog-bot-unindex");

  // 2. Publish only on the M/W/F schedule
  const dow = new Date().getUTCDay();
  let publish: unknown = { skipped: true, reason: `not a publish day (dow=${dow})` };
  if (PUBLISH_DOW.has(dow)) {
    publish = await callSiblingRoute(req, "/api/cron/blog-bot");
  }

  return NextResponse.json({
    ok: true,
    ran: new Date().toISOString(),
    unindex,
    publish,
  });
}
