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

/**
 * Fetch real photos of the given year/make/model from Bing Image Search.
 * Returns an empty array on any failure — callers should fall through to
 * showing the "No Photos" placeholder.
 */
export async function fetchExternalVehiclePhotos(
  year: number | undefined,
  make: string | undefined,
  model: string | undefined
): Promise<string[]> {
  if (!year || !make || !model) return [];

  const query = `${year} ${make} ${model} car`;

  try {
    const res = await fetch(
      `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&first=1&form=HDRSC2&qft=+filterui:photo-photo`,
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
    const urls = Array.from(matches, (m) => m[0]);

    // Dedupe (same image often appears multiple times in Bing's HTML)
    // and cap at a reasonable gallery size.
    return Array.from(new Set(urls)).slice(0, 12);
  } catch {
    return [];
  }
}
