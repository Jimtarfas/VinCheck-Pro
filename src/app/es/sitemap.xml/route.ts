/**
 * Dedicated Spanish sitemap at /es/sitemap.xml.
 *
 * Google Search Console scopes every property to a folder ("URL prefix"
 * properties only crawl URLs under that prefix). Submitting the root
 * /sitemap.xml inside the /es/ property triggers a "Couldn't fetch"
 * because GSC expects the sitemap file to physically live at
 * /es/sitemap.xml.
 *
 * This handler emits the Spanish-locale subset of the main sitemap as
 * a plain XML file at /es/sitemap.xml, served with the standard
 * application/xml content type so GSC picks it up cleanly. The main
 * /sitemap.xml at the root still contains every English URL plus
 * every Spanish URL — Google reads both without complaining about
 * duplicates because the URLs are identical and the lastmod is
 * deterministic across both files.
 */

import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { pagesWithLocaleVersion, translateSlug } from "@/i18n/slugs";

const SITE = "https://www.carcheckervin.com";

export const dynamic = "force-static";
// Tell Next.js to revalidate this every 6 hours. Sitemap content
// only changes when a new Spanish page lands, so longer cache windows
// are fine. The root /sitemap.xml uses the same cadence implicitly.
export const revalidate = 21_600;

/** Escape an XML string value for safe sitemap embedding. */
function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface Entry {
  loc: string;
  lastmod: string; // ISO date (YYYY-MM-DD)
  changefreq: "weekly" | "monthly";
  priority: number;
}

/**
 * Build the entries this sitemap should contain. For now: every page
 * that has a translated Spanish slug. As Phase 2 translates more
 * pages and adds them to ENGLISH_TO_LOCALE in src/i18n/slugs.ts,
 * this list grows automatically.
 */
function buildEntries(): Entry[] {
  const today = new Date().toISOString().slice(0, 10);
  const entries: Entry[] = [];
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    for (const { englishPath } of pagesWithLocaleVersion(locale as Locale)) {
      const localised = translateSlug(englishPath, locale as Locale);
      const loc =
        localised === "/"
          ? `${SITE}/${locale}`
          : `${SITE}/${locale}${localised}`;
      entries.push({
        loc,
        lastmod: today,
        changefreq: "weekly",
        // Homepage gets a slight bump so Google considers it the
        // canonical entry point for the locale.
        priority: englishPath === "/" ? 1.0 : 0.85,
      });
    }
  }
  return entries;
}

export function GET(): Response {
  const entries = buildEntries();
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map(
        (e) =>
          `  <url>\n` +
          `    <loc>${xmlEscape(e.loc)}</loc>\n` +
          `    <lastmod>${e.lastmod}</lastmod>\n` +
          `    <changefreq>${e.changefreq}</changefreq>\n` +
          `    <priority>${e.priority.toFixed(2)}</priority>\n` +
          `  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Match the cache window used by Vercel's edge for the main
      // sitemap so both stay in sync.
      "Cache-Control": "public, max-age=0, s-maxage=21600, stale-while-revalidate=86400",
    },
  });
}
