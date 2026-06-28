import type { Metadata } from "next";
import BlogIndexBody from "@/components/BlogIndexBody";
import { sanityClient, urlFor } from "@/sanity/client";
import { allPostsQuery } from "@/sanity/queries";
import type { SanityPost } from "@/sanity/types";

export const revalidate = 60;

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "VIN Check Blog — Car Buying & Vehicle History Insights",
  description:
    "Expert guides on used car buying, VIN decoding, vehicle history, title brands, and avoiding fraud. New articles every week from CarCheckerVIN.",
  keywords: [
    "vin check blog",
    "used car buying tips",
    "vehicle history articles",
    "car buying guide",
    "vin decoder blog",
  ],
  alternates: {
    canonical: `${SITE}/blog`,
    languages: {
      en: `${SITE}/blog`,
      es: `${SITE}/es/blog`,
      "x-default": `${SITE}/blog`,
    },
    types: { "application/rss+xml": "/blog/feed.xml" },
  },
  openGraph: {
    title: "VIN Check Blog — Car Buying & Vehicle History Insights",
    description:
      "Expert guides on used car buying, VIN decoding, vehicle history, and avoiding fraud.",
    url: `${SITE}/blog`,
    type: "website",
  },
};

export default async function BlogIndexPage() {
  // Wrap the Sanity fetch so a transient outage or quota cap returns the
  // empty-state UI instead of a hard 500.
  let posts: SanityPost[] = [];
  try {
    posts = (await sanityClient.fetch<SanityPost[]>(allPostsQuery)) ?? [];
  } catch {
    posts = [];
  }

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "CarCheckerVIN Blog",
    url: `${SITE}/blog`,
    description: "Expert guides on used car buying, VIN decoding, vehicle history.",
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
    },
    blogPost: posts.slice(0, 20).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      dateModified: p._updatedAt || p.publishedAt,
      author: {
        "@type": "Person",
        name: p.author?.name || "CarCheckerVIN Editorial",
      },
      image: p.heroImage ? urlFor(p.heroImage).width(1200).url() : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
      />
      <BlogIndexBody posts={posts} locale="en" />
    </>
  );
}
