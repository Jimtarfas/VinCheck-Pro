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
        // Browser-like headers. Auction/manufacturer CDNs display fine in the
        // browser but reject bare server-side fetches (hotlink protection),
        // which would leave the PDF's photo grid blank. Sending a real
        // User-Agent, an image Accept, and a same-origin Referer makes those
        // CDNs serve the image to our proxy too.
        const headers: Record<string, string> = {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        };
        try {
          headers["Referer"] = new URL(url).origin + "/";
        } catch {
          // non-absolute URL; skip Referer
        }
        // Add auth header for api.auto.dev photo URLs
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
