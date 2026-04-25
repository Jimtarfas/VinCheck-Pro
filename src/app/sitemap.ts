import type { MetadataRoute } from "next";
import { makes } from "@/lib/makes";
import { states } from "@/lib/states";
import { sanityClient } from "@/sanity/client";
import { groq } from "next-sanity";

interface SanityPostStub {
  slug: string;
  publishedAt: string;
  _updatedAt: string;
}

const sanityPostsForSitemap = groq`
  *[_type == "post" && (!defined(noIndex) || noIndex == false) && defined(slug.current)] {
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }
`;

const sanityCategorySlugs = groq`
  *[_type == "category" && defined(slug.current)][].slug.current
`;

const sanityAuthorSlugs = groq`
  *[_type == "author" && defined(slug.current)][].slug.current
`;

const sanityAllTags = groq`
  array::unique(*[_type == "post" && defined(tags)].tags[])
`;

function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://carcheckervin.com";
  const now = new Date();

  const makePages: MetadataRoute.Sitemap = makes.map((m) => ({
    url: `${baseUrl}/vin-check/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const statePages: MetadataRoute.Sitemap = states.map((s) => ({
    url: `${baseUrl}/vin-check/state/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  let blogPages: MetadataRoute.Sitemap = [];
  let categoryPages: MetadataRoute.Sitemap = [];
  let tagPages: MetadataRoute.Sitemap = [];
  let authorPages: MetadataRoute.Sitemap = [];

  try {
    const [sanityPosts, categorySlugs, authorSlugs, allTags] = await Promise.all([
      sanityClient.fetch<SanityPostStub[]>(sanityPostsForSitemap),
      sanityClient.fetch<string[]>(sanityCategorySlugs),
      sanityClient.fetch<string[]>(sanityAuthorSlugs),
      sanityClient.fetch<string[]>(sanityAllTags),
    ]);

    blogPages = sanityPosts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p._updatedAt || p.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    categoryPages = (categorySlugs || []).map((slug) => ({
      url: `${baseUrl}/blog/category/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    authorPages = (authorSlugs || []).map((slug) => ({
      url: `${baseUrl}/author/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    const seenTags = new Set<string>();
    for (const t of allTags || []) {
      const s = slugifyTag(t);
      if (s && !seenTags.has(s)) {
        seenTags.add(s);
        tagPages.push({
          url: `${baseUrl}/blog/tag/${s}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        });
      }
    }
  } catch {
    // If Sanity is unreachable during build, just skip Sanity-derived URLs
    blogPages = [];
    categoryPages = [];
    tagPages = [];
    authorPages = [];
  }

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/vin-check`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/vin-check/state`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...makePages,
    ...statePages,
    { url: `${baseUrl}/stolen-vehicle-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/salvage-title-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/accident-history-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/odometer-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/lemon-check`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/vin-check-vs-carfax`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/vin-check-vs-autocheck`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/vin-check-vs-vinaudit`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/vin-check-vs-clearvin`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/vin-check-vs-bumper`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/blog/category`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    ...categoryPages,
    ...tagPages,
    ...blogPages,
    { url: `${baseUrl}/author`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...authorPages,
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/how-to-read-a-vin`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/what-is-a-vin-number`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/free-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/glossary`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/trust`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/help`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/changelog`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
