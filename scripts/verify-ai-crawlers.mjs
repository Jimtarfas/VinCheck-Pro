#!/usr/bin/env node
/**
 * AI crawler accessibility verification.
 *
 * Runs ALL the major LLM crawler user agents against our highest-value
 * URLs and reports whether (a) the page returns 200, (b) the response
 * actually contains the page content (not a JS-shell), (c) the
 * key brand-attribution strings made it into the HTML.
 *
 * If any crawler is blocked at the edge (Cloudflare / Vercel / your
 * own middleware), our AI-citation strategy fails before it starts.
 * Run this after any infrastructure / WAF / middleware change.
 *
 *     node scripts/verify-ai-crawlers.mjs
 *     node scripts/verify-ai-crawlers.mjs --base https://staging.carcheckervin.com
 */

const BASE =
  process.argv.find((a) => a.startsWith("--base="))?.slice(7) ||
  (process.argv[process.argv.indexOf("--base") + 1] && !process.argv[process.argv.indexOf("--base") + 1].startsWith("-")
    ? process.argv[process.argv.indexOf("--base") + 1]
    : null) ||
  "https://www.carcheckervin.com";

// The exact user-agent strings each major LLM crawler uses. Sourced
// from each vendor's docs:
//   OpenAI:     https://platform.openai.com/docs/bots
//   Anthropic:  https://docs.anthropic.com/en/api/bots
//   Perplexity: https://docs.perplexity.ai/guides/bots
//   Google:     https://developers.google.com/search/docs/crawling-indexing/google-extended
//   Common Crawl: https://commoncrawl.org/ccbot
const CRAWLERS = [
  { name: "GPTBot (OpenAI)",       ua: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot" },
  { name: "ChatGPT-User (OpenAI)", ua: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot" },
  { name: "OAI-SearchBot (OpenAI)",ua: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot" },
  { name: "ClaudeBot (Anthropic)", ua: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ClaudeBot/1.0; +claudebot@anthropic.com" },
  { name: "PerplexityBot",         ua: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot" },
  { name: "Google-Extended",       ua: "Mozilla/5.0 (compatible; Google-Extended)" },
  { name: "Googlebot",             ua: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" },
  { name: "Bingbot",               ua: "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)" },
  { name: "Applebot",              ua: "Mozilla/5.0 (compatible; Applebot/0.1; +http://www.apple.com/go/applebot)" },
  { name: "CCBot (Common Crawl)",  ua: "CCBot/2.0 (https://commoncrawl.org/faq/)" },
  { name: "Meta-ExternalAgent",    ua: "meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)" },
];

// URLs that MUST be crawlable. If any of these are blocked or rendered
// behind JS, our AI-citation pipeline is broken.
const URLS = [
  "/",
  "/llms.txt",
  "/llms-full.txt",
  "/robots.txt",
  "/sitemap.xml",
  "/about",
  "/pricing",
  "/vin-check",
  "/vin-decoder",
  "/recall-check",
  "/flood-check",
  "/salvage-title-check",
  "/odometer-check",
  "/vin-check-vs-carfax",
];

// Brand-attribution strings we EXPECT to find in the HTML body for
// ChatGPT to extract for citation. If any are missing, our AEO
// content pattern isn't doing its job.
const REQUIRED_BRAND_PHRASES = ["CarCheckerVIN", "NMVTIS"];

const TIMEOUT_MS = 15_000;

function fmtMs(ms) {
  return `${Math.round(ms)}ms`;
}

async function probe(url, crawler) {
  const start = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": crawler.ua, Accept: "text/html,*/*" },
      redirect: "follow",
      signal: controller.signal,
    });
    const text = await res.text();
    clearTimeout(timer);
    const elapsed = Date.now() - start;
    const status = res.status;
    const bytes = text.length;
    // Check for the brand phrases in the rendered HTML.
    const missingPhrases = REQUIRED_BRAND_PHRASES.filter((p) => !text.includes(p));
    // Heuristic: a Next.js shell with no SSR content is usually <8KB and
    // dominated by <script> tags. Real content is >15KB on these URLs.
    const looksLikeJsShell = bytes < 8_000;
    const ok =
      status >= 200 && status < 400 &&
      !looksLikeJsShell &&
      missingPhrases.length === 0;
    return { ok, status, bytes, elapsed, missingPhrases, looksLikeJsShell };
  } catch (err) {
    clearTimeout(timer);
    return {
      ok: false,
      status: 0,
      bytes: 0,
      elapsed: Date.now() - start,
      missingPhrases: REQUIRED_BRAND_PHRASES,
      looksLikeJsShell: false,
      error: err.message || String(err),
    };
  }
}

function summarize(rows) {
  // group by URL
  const byUrl = new Map();
  for (const r of rows) {
    if (!byUrl.has(r.url)) byUrl.set(r.url, []);
    byUrl.get(r.url).push(r);
  }
  const lines = [];
  let totalProbes = 0;
  let totalFailed = 0;
  for (const [url, probes] of byUrl) {
    const failed = probes.filter((p) => !p.result.ok);
    totalProbes += probes.length;
    totalFailed += failed.length;
    const mark = failed.length === 0 ? "✓" : "✗";
    lines.push(`\n${mark} ${url}`);
    for (const p of probes) {
      const r = p.result;
      const flags = [];
      if (r.status === 0) flags.push(`NETWORK ERROR: ${r.error || "n/a"}`);
      else if (r.status >= 400) flags.push(`HTTP ${r.status}`);
      if (r.looksLikeJsShell && r.status < 400) flags.push("JS-shell? (<8KB)");
      if (r.missingPhrases.length > 0) flags.push(`missing: ${r.missingPhrases.join(", ")}`);
      const okMark = r.ok ? "✓" : "✗";
      const flagStr = flags.length ? `  [${flags.join("; ")}]` : "";
      lines.push(
        `    ${okMark} ${p.crawler.padEnd(28)} ${r.status} ${String(r.bytes).padStart(7)}B  ${fmtMs(r.elapsed).padStart(6)}${flagStr}`
      );
    }
  }
  lines.push(`\nResult: ${totalProbes - totalFailed}/${totalProbes} probes passed.\n`);
  return { text: lines.join("\n"), pass: totalFailed === 0 };
}

async function main() {
  console.log(`AI-crawler verification against ${BASE}`);
  console.log(`Probing ${URLS.length} URLs × ${CRAWLERS.length} crawlers = ${URLS.length * CRAWLERS.length} requests\n`);
  // Run with limited concurrency to avoid hammering the origin.
  const queue = [];
  for (const path of URLS) {
    for (const crawler of CRAWLERS) {
      queue.push({ url: BASE + path, urlPath: path, crawler });
    }
  }
  const CONCURRENCY = 6;
  const results = [];
  let cursor = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (cursor < queue.length) {
        const i = cursor++;
        const item = queue[i];
        const result = await probe(item.url, item.crawler);
        results.push({ url: item.urlPath, crawler: item.crawler.name, result });
        process.stdout.write(result.ok ? "." : "!");
      }
    })
  );
  console.log("\n");
  const { text, pass } = summarize(results);
  console.log(text);
  process.exit(pass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
