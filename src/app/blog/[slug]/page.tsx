import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostBody from "@/components/BlogPostBody";
import { sanityClient, urlFor } from "@/sanity/client";
import { postBySlugQuery, postSlugsQuery, relatedPostsQuery } from "@/sanity/queries";
import type { SanityPost } from "@/sanity/types";

export const revalidate = 60;

const SITE = "https://www.carcheckervin.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await sanityClient.fetch<string[]>(postSlugsQuery);
    return (slugs ?? []).map((slug) => ({ slug }));
  } catch {
    // Sanity unreachable or quota reached at build time — skip prerendering and
    // let these pages render on demand via ISR rather than failing the build.
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let post: SanityPost | null = null;
  try {
    post = await sanityClient.fetch<SanityPost>(postBySlugQuery, { slug });
  } catch {
    post = null;
  }

  if (!post) {
    return { title: "Post Not Found", robots: { index: false, follow: false } };
  }

  const ogImageSource = post.ogImage || post.heroImage;
  const ogImageUrl = ogImageSource
    ? urlFor(ogImageSource).width(1200).height(630).url()
    : undefined;

  // Truncate raw title to ~52 chars so layout's "| CarCheckerVIN" suffix
  // keeps the total <70 chars (Bing's title-too-long threshold).
  const seoT = post.seoTitle || post.title;
  const safeTitle = seoT.length > 52 ? `${seoT.slice(0, 49).trimEnd()}…` : seoT;

  return {
    title: safeTitle,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    // Declare the Spanish twin only if the post has been translated
    // (titleEs present). Untranslated posts emit canonical only.
    alternates: {
      canonical: post.canonicalUrl || `/blog/${post.slug}`,
      languages: post.titleEs
        ? {
            en: `${SITE}/blog/${post.slug}`,
            es: `${SITE}/es/blog/${post.slug}`,
            "x-default": `${SITE}/blog/${post.slug}`,
          }
        : undefined,
    },
    robots: post.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: `${SITE}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: post.tags,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post: SanityPost | null = null;
  try {
    post = await sanityClient.fetch<SanityPost>(postBySlugQuery, { slug });
  } catch {
    post = null;
  }

  if (!post) notFound();

  // Auto-related posts: same category OR shared tags. Falls back to manual
  // relatedPosts field on the post if the auto query returns nothing.
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

  const ogImageUrl =
    post.ogImage || post.heroImage
      ? urlFor(post.ogImage || post.heroImage!).width(1200).height(630).url()
      : undefined;

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: ogImageUrl,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          url: post.author.social?.website,
        }
      : { "@type": "Organization", name: "CarCheckerVIN" },
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      logo: { "@type": "ImageObject", url: `${SITE}/logo.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE}/blog/${post.slug}`,
    },
    keywords: post.keywords?.join(", "),
    articleSection: post.category?.title,
    wordCount: post.wordCount,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }}
      />
      <BlogPostBody post={post} related={related} locale="en" />
    </>
  );
}
