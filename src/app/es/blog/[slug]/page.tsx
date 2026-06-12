/**
 * Spanish blog post detail page — /es/blog/<slug>.
 *
 * Renders the Spanish variants from Sanity (titleEs, excerptEs, bodyEs,
 * seoTitleEs, seoDescriptionEs) with English fallback. If a post has no
 * Spanish translation yet, it 404s here — the editor must add at least
 * titleEs in Sanity Studio for the post to be reachable on /es/blog.
 *
 * generateStaticParams() only enumerates posts with titleEs present, so
 * we don't prerender 130 English-only posts under /es/blog.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { sanityClient, urlFor } from "@/sanity/client";
import {
  postBySlugEsQuery,
  postSlugsEsQuery,
  relatedPostsQuery,
} from "@/sanity/queries";
import type { SanityPost } from "@/sanity/types";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

export const revalidate = 60;
const LOCALE = "es" as const;
const SITE = "https://www.carcheckervin.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<string[]>(postSlugsEsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityClient.fetch<SanityPost>(postBySlugEsQuery, {
    slug,
  });

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
      url: `${SITE}/es/blog/${post.slug}`,
      type: "article",
      locale: "es_US",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: post.tags,
      images: ogImageUrl
        ? [{ url: ogImageUrl, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitleEs || post.titleEs,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

const categoryColors: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  rose: "bg-rose-50 text-rose-700 border-rose-100",
  violet: "bg-violet-50 text-violet-700 border-violet-100",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
};

export default async function BlogPostPageEs({ params }: Props) {
  const { slug } = await params;
  const post = await sanityClient.fetch<SanityPost>(postBySlugEsQuery, {
    slug,
  });

  // Only render if the post has been translated; an editor adds titleEs
  // in Sanity Studio to make a post reachable at /es/blog/<slug>.
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
  // bodyEs is preferred; if blank we still render the English body so the
  // post stays useful while translation catches up.
  const displayBody = post.bodyEs || post.body;

  const heroUrl = post.heroImage
    ? urlFor(post.heroImage).width(1600).quality(85).url()
    : null;
  const colorClass =
    categoryColors[post.category?.color || "indigo"] || categoryColors.indigo;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    inLanguage: "es",
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
      "@id": `${SITE}/es/blog/${post.slug}`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/es/blog` },
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

      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/es" },
              { label: "Blog", href: "/es/blog" },
              { label: displayTitle },
            ]}
          />

          <header className="mt-6">
            {post.category && (
              <span
                className={`inline-block text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${colorClass} mb-4`}
              >
                {post.category.title}
              </span>
            )}
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
              {displayTitle}
            </h1>
            {displayExcerpt && (
              <p className="mt-4 text-lg text-slate-700 leading-relaxed">
                {displayExcerpt}
              </p>
            )}
            <div className="mt-6 flex items-center gap-4 text-sm text-slate-700">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString("es", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              {post.readMinutes ? (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readMinutes} min de lectura
                </span>
              ) : null}
            </div>
          </header>

          {heroUrl && (
            <div className="mt-8 relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src={heroUrl}
                alt={post.heroImage?.alt || displayTitle}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {displayBody && (
            <div className="mt-10 prose prose-slate max-w-none">
              <PortableTextRenderer value={displayBody} />
            </div>
          )}

          {/* Inline VIN search promo */}
          <aside className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
              ¿Listo para revisar un VIN?
            </p>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Reporte VIN gratis al instante
            </h2>
            <VinSearchForm size="lg" />
          </aside>

          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Artículos relacionados
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.slice(0, 3).map((r) => {
                  const rHero = r.heroImage
                    ? urlFor(r.heroImage)
                        .width(400)
                        .height(250)
                        .quality(80)
                        .url()
                    : null;
                  const rTitle = r.titleEs || r.title;
                  return (
                    <Link
                      key={r._id}
                      href={`/es/blog/${r.slug}`}
                      className="group block bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition"
                    >
                      {rHero && (
                        <div className="relative aspect-[16/10] bg-slate-100">
                          <Image
                            src={rHero}
                            alt={rTitle}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="33vw"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-primary-700">
                          {rTitle}
                        </h3>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary-600">
                          Leer más <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
