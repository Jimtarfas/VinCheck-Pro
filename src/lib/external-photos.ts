/**
 * External vehicle photo fallback.
 *
 * Auto.dev's photos / listings endpoints don't always return images for older,
 * less-listed, or off-market VINs. When that happens we still want to show
 * real photos of the same year/make/model rather than an empty placeholder.
 *
 * Strategy: scrape Bing Image Search results and extract the thumbnail URLs
 * (`turl`), which are always served from Bing's own CDN (tse*.mm.bing.net).
 * That CDN is stable, hotlink-friendly, and we only need to whitelist a single
 * pattern in next.config.ts to render through next/image.
 *
 * No API key is required.
 */

const BING_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// Quality/size params appended to every Bing thumbnail URL. The bare
// `th?id=OIP.*` URL Bing puts in its HTML serves a tiny ~160px thumbnail;
// Bing's CDN honours these params so we request a large, sharp 16:10 crop
// instead (w/h = target box, c=7 smart-crop-to-fill, rs=1 resize, qlt=95
// near-lossless). This is what turns a blurry placeholder into a usable hero.
const HQ_THUMB_PARAMS = "&w=960&h=600&c=7&rs=1&qlt=95&o=7&pid=Api";

/**
 * Fetch real, high-quality photos of the *same year/make/model* from Bing
 * Image Search. Returns an empty array on any failure — callers should fall
 * through to showing the "No Photos" placeholder.
 */
export async function fetchExternalVehiclePhotos(
  year: number | undefined,
  make: string | undefined,
  model: string | undefined,
  // Optional extras — when we have them (e.g. from a listing or VIN decode)
  // they tighten the search to the right trim/color so the gallery matches
  // the actual vehicle more closely.
  extras?: { trim?: string; color?: string; bodyType?: string }
): Promise<string[]> {
  if (!year || !make || !model) return [];

  // Quote the exact "year make model" so Bing keeps results on the same model
  // year rather than drifting to nearby generations, then bias toward clean
  // exterior studio shots with the trailing keywords.
  const core = `"${year} ${make} ${model}"`;
  const refine = [extras?.trim, extras?.color, extras?.bodyType, "exterior"]
    .filter(Boolean)
    .join(" ");
  const query = `${core} ${refine}`.trim();

  try {
    const res = await fetch(
      // qft filters: photo-photo (real photos, not clip-art/line drawings) +
      // imagesize-large (source images big enough to upscale cleanly).
      `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&first=1&form=HDRSC2&qft=+filterui:photo-photo+filterui:imagesize-large`,
      {
        headers: {
          "User-Agent": BING_USER_AGENT,
          "Accept": "text/html,application/xhtml+xml",
          "Accept-Language": "en-US,en;q=0.9",
        },
        // Cache aggressively — same year/make/model will yield the same photos
        // for hours/days at a time, and these results don't need to be fresh.
        next: { revalidate: 60 * 60 * 24 * 7 }, // 7 days
      }
    );

    if (!res.ok) return [];

    const html = await res.text();

    // Bing image search results contain direct thumbnail URLs from its CDN
    // (ts1-ts4.mm.bing.net). We grep for those URLs directly to avoid pulling
    // in an HTML parser. The CDN is hotlink-friendly and whitelisted in
    // next.config.ts so they render through next/image.
    const matches = html.matchAll(/https:\/\/ts[1-4]\.mm\.bing\.net\/th\?id=[^"<>&\s)]+/g);

    // Dedupe by the image id (the same picture appears many times in Bing's
    // HTML), then request each at high quality via HQ_THUMB_PARAMS.
    const seen = new Set<string>();
    const urls: string[] = [];
    for (const m of matches) {
      const base = m[0];
      const id = base.split("id=")[1] ?? base;
      if (seen.has(id)) continue;
      seen.add(id);
      urls.push(base + HQ_THUMB_PARAMS);
    }

    return urls.slice(0, 12);
  } catch {
    return [];
  }
}
