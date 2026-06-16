/**
 * External vehicle photo fallback.
 *
 * Auto.dev's photos / listings endpoints don't always return images for older,
 * less-listed, or off-market VINs. When that happens we still want to show
 * real photos of the same year/make/model rather than an empty placeholder.
 *
 * Strategy: scrape Bing Image Search and read the per-result metadata blob Bing
 * embeds on every thumbnail (`<a class="iusc" m="{...}">`). That JSON carries
 * the image's thumbnail URL (`turl`), title (`t`) and source page (`purl`), so
 * we can KEEP ONLY results whose title/source actually mention the make and
 * model. This is the critical guard: a bare regex over every `bing.net`
 * thumbnail on the page also scoops up Bing's "related"/"trending" rail, which
 * for weak queries returns completely unrelated pictures (e.g. food) — those
 * then surfaced as the vehicle's hero photo. Filtering by title kills that.
 *
 * Thumbnails are served from Bing's CDN (ts1-4.mm.bing.net), which is stable,
 * hotlink-friendly, and whitelisted in next.config.ts so next/image renders
 * them. No API key is required.
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

function decodeEntities(s: string): string {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/**
 * Fetch real, high-quality photos of the *same year/make/model* from Bing
 * Image Search. Returns an empty array on any failure OR when nothing matches
 * the vehicle — callers should fall through to the "No Photos" placeholder
 * rather than show an unrelated image.
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

  // Relevance tokens: every kept image's title/source must contain BOTH the
  // primary make word and the primary model word. Using the first token keeps
  // hyphenated/multi-word makes (e.g. "Mercedes-Benz") and models matching.
  const makeToken = make.toLowerCase().split(/[\s-]+/)[0];
  const modelToken = model.toLowerCase().split(/[\s-]+/)[0];
  if (!makeToken || !modelToken) return [];

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

    // Each image result carries a JSON metadata blob in its `m="{...}"`
    // attribute (HTML-entity encoded). Parse those instead of grepping raw
    // thumbnail URLs so we can read each image's title/source and discard
    // anything that isn't actually this vehicle.
    const metaMatches = html.matchAll(/m="(\{[^"]+\})"/g);

    const seen = new Set<string>();
    const urls: string[] = [];

    for (const m of metaMatches) {
      let meta: { turl?: string; t?: string; desc?: string; purl?: string };
      try {
        meta = JSON.parse(decodeEntities(m[1]));
      } catch {
        continue;
      }

      const turl = meta.turl;
      if (!turl) continue;

      // Relevance gate: the image's title/description/source page must mention
      // both the make and the model. Unrelated "related search" rail images
      // (the cause of the food-photo bug) fail this and are dropped.
      const haystack = `${meta.t ?? ""} ${meta.desc ?? ""} ${meta.purl ?? ""}`.toLowerCase();
      if (!haystack.includes(makeToken) || !haystack.includes(modelToken)) {
        continue;
      }

      // Pull the image id and rebuild a clean, whitelisted CDN URL at high
      // quality. (turl hosts vary — ts*/tse* — but the `id` is the stable
      // content key; ts1.mm.bing.net serves it and is whitelisted.)
      const idMatch = turl.match(/[?&]id=([^&]+)/);
      const id = idMatch?.[1];
      if (!id || seen.has(id)) continue;
      seen.add(id);

      urls.push(`https://ts1.mm.bing.net/th?id=${id}${HQ_THUMB_PARAMS}`);
      if (urls.length >= 12) break;
    }

    return urls;
  } catch {
    return [];
  }
}
