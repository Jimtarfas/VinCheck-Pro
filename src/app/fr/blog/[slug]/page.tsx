/**
 * French blog post detail page — /fr/blog/<slug>.
 *
 * Renders the French variants from Sanity (titleEs, excerptEs, bodyEs,
 * seoTitleEs, seoDescriptionEs) with English fallback. If a post has no
 * French translation yet, it 404s here — the editor must add at least
 * titleEs in Sanity Studio for the post to be reachable on /fr/blog.
 *
 * Wave 18 batch 4 — uses shared BlogPostBody for full visual parity with
 * /blog/<slug> (locale="fr"). Only the post body text comois from Sanity in
 * French; all UI chrome (breadcrumbs, dates, related-posts heading,
 * inline VIN promo card, etc.) translates via the shared body's COPY map.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostBody from "@/components/BlogPostBody";
import { sanityClient, urlFor } from "@/sanity/client";
import {
  postBySlugEsQuery,
  postSlugsEsQuery,
  relatedPostsQuery,
} from "@/sanity/queries";
import type { SanityPost } from "@/sanity/types";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

export const revalidate = 60;
const LOCALE = "fr" as const;
const SITE = "https://www.carcheckervin.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await sanityClient.fetch<string[]>(postSlugsEsQuery);
    return (slugs ?? []).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let post: SanityPost | null = null;
  try {
    post = await sanityClient.fetch<SanityPost>(postBySlugEsQuery, { slug });
  } catch {
    post = null;
  }

  if (!post || !post.titleEs) {
    return {
      title: "Artículo no encontrado",
      robots: { index: false, follow: false },
    };
  }

  const ogImageSource = post.ogImage || post.heroImage;
  const ogImageUrl = ogImageSource
    ? urlFor(ogImageSource).width(1200).height(630).url()
    : undefined;

  const rawTitle = post.seoTitleEs || post.titleEs;
  const safeTitle =
    rawTitle.length > 52 ? `${rawTitle.slice(0, 49).trimEnd()}…` : rawTitle;

  const description = post.seoDescriptionEs || post.excerptEs || post.excerpt;
  const englishPath = `/blog/${post.slug}`;
  const alt = hreflangAlternatesForLocale(englishPath, LOCALE);

  return {
    title: safeTitle,
    description,
    keywords: post.focusKeywordEs ? [post.focusKeywordEs] : post.keywords,
    alternates: {
      canonical: post.canonicalUrl || alt.canonical,
      languages: alt.languages,
    },
    robots: post.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: post.seoTitleEs || post.titleEs,
      description,
      url: `${SITE}/fr/blog/${post.slug}`,
      type: "article",
      locale: "fr_US",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: post.tags,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitleEs || post.titleEs,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

export default async function BlogPostPageEs({ params }: Props) {
  const { slug } = await params;
  let post: SanityPost | null = null;
  try {
    post = await sanityClient.fetch<SanityPost>(postBySlugEsQuery, { slug });
  } catch {
    post = null;
  }

  // Only render if the post has been translated; an editor adds titleEs
  // in Sanity Studio to make a post reachable at /fr/blog/<slug>.
  if (!post || !post.titleEs) notFound();

  let related: SanityPost[] = [];
  try {
    related = await sanityClient.fetch<SanityPost[]>(relatedPostsQuery, {
      slug: post.slug,
      categorySlug: post.category?.slug || "",
      tags: post.tags || [],
    } as Record<string, unknown>);
  } catch {
    related = [];
  }
  if (related.length === 0 && post.relatedPosts) {
    related = post.relatedPosts;
  }

  const displayTitle = post.titleEs;
  const displayExcerpt = post.excerptEs || post.excerpt;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    inLanguage: "fr",
    headline: displayTitle,
    description: displayExcerpt,
    image: post.heroImage ? urlFor(post.heroImage).width(1200).url() : undefined,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "CarCheckerVIN Editorial",
    },
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE}/fr/blog/${post.slug}`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/fr/blog` },
      { "@type": "ListItem", position: 3, name: displayTitle },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <BlogPostBody post={post} related={related} locale="fr" />
    </>
  );
}
