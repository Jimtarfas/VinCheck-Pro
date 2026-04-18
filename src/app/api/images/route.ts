import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { urls } = (await req.json()) as { urls: string[] };

  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ images: [] });
  }

  const apiKey = process.env.AUTO_DEV_API_KEY;

  // Limit to 15 images max
  const limited = urls.slice(0, 15);

  const results = await Promise.all(
    limited.map(async (url: string) => {
      try {
        // Add auth header for api.auto.dev photo URLs
        const headers: Record<string, string> = {};
        if (url.includes("api.auto.dev") && apiKey) {
          headers["Authorization"] = `Bearer ${apiKey}`;
        }

        const res = await fetch(url, { headers });
        if (!res.ok) return "";
        const buffer = await res.arrayBuffer();
        const contentType = res.headers.get("content-type")?.split(",")[0]?.trim() || "image/jpeg";
        const base64 = Buffer.from(buffer).toString("base64");
        return `data:${contentType};base64,${base64}`;
      } catch {
        return "";
      }
    })
  );

  return NextResponse.json({ images: results });
}
