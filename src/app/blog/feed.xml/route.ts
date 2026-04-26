import { sanityClient, urlFor } from "@/sanity/client";
import { allPostsQuery } from "@/sanity/queries";
import type { SanityPost } from "@/sanity/types";

export const revalidate = 3600;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://carcheckervin.com";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let posts: SanityPost[] = [];
  try {
    posts = await sanityClient.fetch<SanityPost[]>(allPostsQuery);
  } catch {
    posts = [];
  }

  const items = posts.slice(0, 50).map((p) => {
    const link = `${SITE}/blog/${p.slug}`;
    const pubDate = new Date(p.publishedAt).toUTCString();
    const imageEnclosure = p.heroImage
      ? `<enclosure url="${escapeXml(urlFor(p.heroImage).width(1200).url())}" type="image/jpeg" />`
      : "";
    return `<item>
      <title>${escapeXml(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${p.excerpt || p.seoDescription || ""}]]></description>
      ${p.author?.name ? `<dc:creator>${escapeXml(p.author.name)}</dc:creator>` : ""}
      ${p.category?.title ? `<category>${escapeXml(p.category.title)}</category>` : ""}
      ${imageEnclosure}
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>CarCheckerVIN Blog</title>
  <link>${SITE}/blog</link>
  <description>Expert guides on used car buying, VIN decoding, vehicle history, and fraud prevention.</description>
  <language>en-us</language>
  <atom:link href="${SITE}/blog/feed.xml" rel="self" type="application/rss+xml" />
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
