import type { MetadataRoute } from "next";
import { makes } from "@/lib/makes";
import { states } from "@/lib/states";
import { blogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

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
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    ...blogPages,
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/how-to-read-a-vin`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/what-is-a-vin-number`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/free-vin-check`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/glossary`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
