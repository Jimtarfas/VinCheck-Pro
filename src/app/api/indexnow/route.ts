/**
 * Manual IndexNow ping endpoint.
 *
 * Usage:
 *   POST /api/indexnow
 *   Body: { "urls": ["/", "/blog/post-slug"] }
 *
 * Or trigger a full re-submit of every static URL by hitting:
 *   GET /api/indexnow?token=ADMIN_PING_TOKEN&all=1
 *
 * Set ADMIN_PING_TOKEN in Vercel env vars to gate the GET path.
 */

import { NextResponse, type NextRequest } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";

export async function POST(req: NextRequest) {
  let body: { urls?: string[] } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  if (!Array.isArray(body.urls) || body.urls.length === 0) {
    return NextResponse.json({ error: "urls array required" }, { status: 400 });
  }

  const result = await submitToIndexNow(body.urls);
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const all = req.nextUrl.searchParams.get("all");

  if (token !== process.env.ADMIN_PING_TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (all !== "1") {
    return NextResponse.json({ error: "pass &all=1 to re-submit everything" }, { status: 400 });
  }

  // Fetch our own sitemap and submit every URL.
  try {
    const r = await fetch("https://www.carcheckervin.com/sitemap.xml");
    const xml = await r.text();
    const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
    const result = await submitToIndexNow(urls);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
