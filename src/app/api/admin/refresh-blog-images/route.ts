/**
 * POST /api/admin/refresh-blog-images
 *
 * Refreshes hero images on blog posts in Sanity. Runs on Vercel where
 * SANITY_API_TOKEN already lives — no need to pull the token locally.
 *
 * Auth: bearer using BLOG_REFRESH_SECRET (a value YOU pick and add to
 * Vercel's env vars). We use a dedicated secret instead of reusing
 * SANITY_REVALIDATE_SECRET because Vercel's "Sensitive" flag makes
 * existing secrets unreadable — so a new env var you control is the
 * only way to know the value.
 *
 * Body (all optional):
 *   {
 *     "limit":   5,             // posts per call, 1-25 (default 5)
 *     "cursor":  "abc123...",   // last _id from previous response
 *     "dryRun":  true,          // log only, don't write to Sanity
 *     "slug":    "best-..."     // refresh a single post by slug
 *   }
 *
 * Response:
 *   {
 *     "processed": [{ slug, status, query, imageUrl, reason }],
 *     "nextCursor": "..." | null,   // pass back to keep paginating
 *     "remaining":  47,             // posts left after this batch
 *     "dryRun":     true
 *   }
 *
 * Typical usage from a laptop (paginated to stay under the function
 * timeout — each call processes 5 posts in ~10-15 seconds):
 *
 *   SECRET="$BLOG_REFRESH_SECRET"   # value you set in Vercel env
 *   URL="https://www.carcheckervin.com/api/admin/refresh-blog-images"
 *
 *   # Dry-run audit (single batch)
 *   curl -X POST "$URL" -H "Authorization: Bearer $SECRET" \
 *        -H "Content-Type: application/json" \
 *        -d '{"limit":5,"dryRun":true}'
 *
 *   # Full apply, loop with the returned cursor
 *   cursor=""
 *   while :; do
 *     body=$(jq -n --arg c "$cursor" '{limit:5,cursor:$c}')
 *     out=$(curl -sS -X POST "$URL" -H "Authorization: Bearer $SECRET" \
 *                -H "Content-Type: application/json" -d "$body")
 *     echo "$out" | jq .
 *     cursor=$(echo "$out" | jq -r .nextCursor)
 *     [ "$cursor" = "null" ] && break
 *   done
 */

import { NextResponse, type NextRequest } from "next/server";
import { refreshBlogImages, safeEqual, type RefreshOptions } from "@/lib/blog-image-refresh";

// Node runtime — needs Buffer, node:crypto, and the Sanity client.
export const runtime = "nodejs";
// 5 minutes — small batches (limit≤5) finish in ~15s, but Bing latency
// is unpredictable. Vercel Pro caps at 300s; Hobby caps at 60s.
export const maxDuration = 300;
// This route mutates external state; never cache the response.
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const expected = process.env.BLOG_REFRESH_SECRET;
  if (!expected) {
    return NextResponse.json(
      {
        error:
          "Server misconfigured: BLOG_REFRESH_SECRET env var not set. " +
          "Add it in Vercel Project Settings → Environment Variables, then redeploy.",
      },
      { status: 500 }
    );
  }

  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token || !safeEqual(token, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: RefreshOptions = {};
  try {
    const raw = await req.text();
    if (raw.trim().length > 0) body = JSON.parse(raw) as RefreshOptions;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const result = await refreshBlogImages(body);
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}

// Reject other verbs cleanly so accidental GET requests don't 404.
export function GET() {
  return NextResponse.json(
    { error: "Use POST. See route source for the JSON body schema." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
