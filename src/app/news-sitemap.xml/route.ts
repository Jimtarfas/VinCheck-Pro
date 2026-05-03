import { sanityClient } from "@/sanity/client";
import { groq } from "next-sanity";

export const revalidate = 1800;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.carcheckervin.com";

// Google News spec: posts published within the last 2 days.
const recentPostsQuery = groq`
  *[_type == "post"
    && (!defined(noIndex) || noIndex == false)
    && publishedAt > dateTime(now()) - 60*60*24*2]
  | order(publishedAt desc)[0...500] {
    "slug": slug.current,
    title,
    publishedAt,
    keywords
  }
`;

// Fallback so the sitemap is never empty (Bing rejects empty sitemaps and
// search engines penalize "discovered, currently not indexed" sitemaps).
// Returns the 20 most-recent posts regardless of date.
const fallbackPostsQuery = groq`
  *[_type == "post" && (!defined(noIndex) || noIndex == false)]
  | order(publishedAt desc)[0...20] {
    "slug": slug.current,
    title,
    publishedAt,
    keywords
  }
`;

interface NewsPost {
  slug: string;
  title: string;
  publishedAt: string;
  keywords?: string[];
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let posts: NewsPost[] = [];
  try {
    posts = await sanityClient.fetch<NewsPost[]>(recentPostsQuery);
    // If no posts within the 2-day window, fall back to the 20 most recent
    // so the sitemap always contains something useful.
    if (posts.length === 0) {
      posts = await sanityClient.fetch<NewsPost[]>(fallbackPostsQuery);
    }
  } catch {
    posts = [];
  }

  const urls = posts
    .map(
      (p) => `<url>
    <loc>${SITE}/blog/${p.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>CarCheckerVIN</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${p.publishedAt}</news:publication_date>
      <news:title>${escapeXml(p.title)}</news:title>
      ${p.keywords && p.keywords.length > 0 ? `<news:keywords>${escapeXml(p.keywords.slice(0, 10).join(", "))}</news:keywords>` : ""}
    </news:news>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800, s-maxage=1800",
    },
  });
}
