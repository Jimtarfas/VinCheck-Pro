/**
 * Spanish blog index — /es/blog.
 *
 * Lists only posts that have been translated (titleEs present). Untranslated
 * posts stay reachable on /blog/<slug>; once an editor adds titleEs in the
 * Sanity Studio, the post appears here automatically.
 *
 * Architecture follows the English index: same Sanity client, mirrored
 * GROQ query that adds the *Es projections. Schema markup declares
 * inLanguage="es" so Google indexes the Spanish surface independently.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, FileText } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { sanityClient, urlFor } from "@/sanity/client";
import { allPostsEsQuery } from "@/sanity/queries";
import type { SanityPost } from "@/sanity/types";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

export const revalidate = 60;
const LOCALE = "es" as const;
const SITE = "https://www.carcheckervin.com";

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale("/blog", LOCALE);
  return {
    title:
      "Blog CarCheckerVIN — Compra de autos usados, VIN e historial vehicular",
    description:
      "Guías expertas en compra de autos usados, decodificación VIN, historial vehicular, marcas de título y prevención de fraude. Datos NMVTIS, NICB y NHTSA.",
    keywords: [
      "blog VIN check español",
      "guía compra auto usado",
      "artículos historial vehicular",
      "decodificador VIN blog",
      "fraude auto usado",
    ],
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
      types: { "application/rss+xml": "/blog/feed.xml" },
    },
    openGraph: {
      title: "Blog CarCheckerVIN — Compra de autos usados e historial VIN",
      description:
        "Guías expertas en compra de autos usados, VIN, historial vehicular y prevención de fraude.",
      url: `${SITE}/es/blog`,
      type: "website",
      locale: "es_US",
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

export default async function BlogIndexPageEs() {
  const posts = await sanityClient.fetch<SanityPost[]>(allPostsEsQuery);

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    inLanguage: "es",
    name: "Blog CarCheckerVIN",
    url: `${SITE}/es/blog`,
    description:
      "Guías expertas en compra de autos usados, VIN, historial vehicular y prevención de fraude.",
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
    },
    blogPost: posts.slice(0, 20).map((p) => ({
      "@type": "BlogPosting",
      inLanguage: "es",
      headline: p.titleEs || p.title,
      url: `${SITE}/es/blog/${p.slug}`,
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
      <article className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Inicio", href: "/es" }, { label: "Blog" }]}
          />

          <div className="mt-6 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Blog de VIN y compra de autos
            </h1>
            <p className="mt-4 text-lg text-slate-700 leading-relaxed">
              Guías expertas sobre compra de autos usados, historial vehicular,
              marcas de título, prevención de fraude y decodificación VIN.
              Respaldado por fuentes NMVTIS, NICB y NHTSA.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="mt-12 text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h2 className="text-lg font-bold text-slate-900">
                Aún no hay artículos traducidos
              </h2>
              <p className="text-sm text-slate-700 mt-2">
                Los artículos aparecerán aquí cuando un editor agregue la
                traducción al español en Sanity Studio.
              </p>
              <Link
                href="/blog"
                className="inline-block mt-6 px-5 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700"
              >
                Ver blog en inglés →
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const heroUrl = post.heroImage
                  ? urlFor(post.heroImage)
                      .width(800)
                      .height(500)
                      .quality(80)
                      .url()
                  : null;
                const colorClass =
                  categoryColors[post.category?.color || "indigo"] ||
                  categoryColors.indigo;
                const displayTitle = post.titleEs || post.title;
                const displayExcerpt = post.excerptEs || post.excerpt;

                return (
                  <Link
                    key={post._id}
                    href={`/es/blog/${post.slug}`}
                    className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-slate-300 transition"
                  >
                    {heroUrl && (
                      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                        <Image
                          src={heroUrl}
                          alt={post.heroImage?.alt || displayTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-5 flex flex-col">
                      {post.category && (
                        <span
                          className={`inline-block self-start text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${colorClass} mb-3`}
                        >
                          {post.category.title}
                        </span>
                      )}
                      <h2 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-primary-700 transition">
                        {displayTitle}
                      </h2>
                      {displayExcerpt && (
                        <p className="mt-2 text-sm text-slate-700 leading-relaxed line-clamp-3">
                          {displayExcerpt}
                        </p>
                      )}
                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString(
                            "es",
                            { month: "short", day: "numeric", year: "numeric" }
                          )}
                        </span>
                        {post.readMinutes ? (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readMinutes} min de lectura
                          </span>
                        ) : null}
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all">
                        Leer más <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </article>
    </>
  );
}
