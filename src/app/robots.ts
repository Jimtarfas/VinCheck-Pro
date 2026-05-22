import type { MetadataRoute } from "next";

// Private surfaces that should never be crawled — user dashboards, paid reports,
// admin/auth flows, and our own API routes. /report/ contains per-VIN dynamic
// pages with user query data, so we keep it out of every index.
const DISALLOW = [
  "/api/",
  "/admin/",
  "/admin",
  "/auth/",
  "/dashboard",
  "/dashboard/",
  "/report/",
  "/studio",
  "/studio/",
  "/embed/",
];

// AI search crawlers we explicitly opt into so our SEO landing pages can be
// cited by ChatGPT, Perplexity, Gemini/Google AI Overview, Copilot/Bing, and
// Claude. Each gets its own rule block (rather than relying on `User-Agent: *`)
// so the signal is unambiguous and per-bot disallow lists can diverge later.
const AI_BOTS = [
  "GPTBot",            // OpenAI training crawler
  "ChatGPT-User",      // ChatGPT browsing-with-citation crawler
  "OAI-SearchBot",     // OpenAI SearchGPT
  "PerplexityBot",     // Perplexity index crawler
  "Perplexity-User",   // Perplexity browsing-with-citation
  "ClaudeBot",         // Anthropic crawler (training)
  "Claude-Web",        // Anthropic browsing-with-citation
  "anthropic-ai",      // Legacy Anthropic UA
  "Google-Extended",   // Google AI Overview / Gemini opt-in
  "Applebot-Extended", // Apple Intelligence opt-in
  "CCBot",             // Common Crawl (feeds many LLMs)
  "cohere-ai",         // Cohere training
  "Bytespider",        // ByteDance / Doubao
  "Diffbot",           // Diffbot knowledge graph
  "DuckAssistBot",     // DuckDuckGo AI assist
];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.carcheckervin.com";

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/news-sitemap.xml`,
      `${baseUrl}/image-sitemap.xml`,
      `${baseUrl}/sitemap-index.xml`,
    ],
    // Note: /llms.txt (llmstxt.org) is auto-discovered by AI crawlers at the
    // well-known root path — no robots.txt directive needed.
  };
}
