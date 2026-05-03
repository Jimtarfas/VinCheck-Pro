/**
 * IndexNow client — pings Bing/Yandex/Naver/Seznam search engines whenever a
 * URL is created or updated. Bing rolls IndexNow pings into its discovery
 * pipeline within minutes (vs. the days it takes a normal sitemap crawl).
 *
 * Spec: https://www.indexnow.org/documentation
 */

const KEY = "f642b32ff0c34140ba975127705effbd";
const HOST = "carcheckervin.com";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Bing accepts up to 10,000 URLs in a single batch. We submit to bing.com
// directly; it forwards to all participating engines (Yandex, Naver, etc).
const ENDPOINT = "https://api.indexnow.org/IndexNow";

export interface IndexNowResult {
  ok: boolean;
  status: number;
  count: number;
  error?: string;
}

/**
 * Submit one or many URLs. Silent failure-safe — never throws.
 */
export async function submitToIndexNow(urls: string | string[]): Promise<IndexNowResult> {
  const list = Array.isArray(urls) ? urls : [urls];
  if (list.length === 0) return { ok: true, status: 200, count: 0 };

  // Normalize: must be absolute https://www.carcheckervin.com URLs.
  const normalized = list
    .map((u) => (u.startsWith("http") ? u : `https://${HOST}${u.startsWith("/") ? u : "/" + u}`))
    .filter((u) => u.includes(HOST))
    .slice(0, 10000);

  if (normalized.length === 0) {
    return { ok: false, status: 0, count: 0, error: "no valid URLs" };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Host": "api.indexnow.org",
      },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: normalized,
      }),
    });
    return { ok: res.ok, status: res.status, count: normalized.length };
  } catch (e) {
    return {
      ok: false,
      status: 0,
      count: normalized.length,
      error: e instanceof Error ? e.message : "unknown",
    };
  }
}
