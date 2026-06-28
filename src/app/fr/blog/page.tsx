/**
 * French blog index — /fr/blog.
 *
 * Lists only posts that have been translated (titleEs present). Untranslated
 * posts stay reachable on /blog/<slug>; once an editor adds titleEs in the
 * Sanity Studio, the post appears here automatically.
 *
 * Wave 18 batch 4 — uses shared BlogIndexBody for full visual parity with
 * /blog (locale="fr").
 */

import type { Metadata } from "next";
import BlogIndexBody from "@/components/BlogIndexBody";
import { sanityClient, urlFor } from "@/sanity/client";
import { allPostsEsQuery } from "@/sanity/queries";
import type { SanityPost } from "@/sanity/types";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

export const revalidate = 60;
const LOCALE = "fr" as const;
const SITE = "https://www.carcheckervin.com";

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale("/blog", LOCALE);
  return {
    title: "Blog CarCheckerVIN — Compra de voitures d’occasion, VIN et historique de véhicule",
    description:
      "Guías expertas en compra de voitures d’occasion, décodage VIN, historique de véhicule, marques de titre et prévention de fraude. Datos NMVTIS, NICB et NHTSA.",
    keywords: [
      "blog VIN check français",
      "guide compra voiture d’occasion",
      "artículos historique de véhicule",
      "décodeur VIN blog",
      "fraude voiture d’occasion",
    ],
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
      types: { "application/rss+xml": "/blog/feed.xml" },
    },
    openGraph: {
      title: "Blog CarCheckerVIN — Compra de voitures d’occasion et historique VIN",
      description:
        "Guías expertas en compra de voitures d’occasion, VIN, historique de véhicule et prévention de fraude.",
      url: `${SITE}/fr/blog`,
      type: "website",
      locale: "fr_US",
    },
  };
}

export default async function BlogIndexPageEs() {
  // Resilient fetch: if Sanity is unreachable or quota-limited, render the
  // empty-state UI instead of throwing a 500.
  let posts: SanityPost[] = [];
  try {
    posts = (await sanityClient.fetch<SanityPost[]>(allPostsEsQuery)) ?? [];
  } catch {
    posts = [];
  }

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    inLanguage: "fr",
    name: "Blog CarCheckerVIN",
    url: `${SITE}/fr/blog`,
    description:
      "Guías expertas en compra de voitures d’occasion, VIN, historique de véhicule et prévention de fraude.",
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
    },
    blogPost: posts.slice(0, 20).map((p) => ({
      "@type": "BlogPosting",
      inLanguage: "fr",
      headline: p.titleEs || p.title,
      url: `${SITE}/fr/blog/${p.slug}`,
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
      <BlogIndexBody posts={posts} locale="fr" />
    </>
  );
}
