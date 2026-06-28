/**
 * Shared body for /blog/category/[slug] and /es/blog/category/[slug].
 * Wave 17g — renders the same full English category-archive layout in
 * both locales via a COPY={en,es} map.
 *
 * Post titles, excerpts, hero images, and dates render verbatim from
 * Sanity — same pattern as brand `tips` / state `lemonStatuteText` on
 * prior waves: factual data stays in its source language.
 */

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, FileText, FolderOpen } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { urlFor } from "@/sanity/client";
import type { SanityPost, SanityCategory } from "@/sanity/types";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    blog: "Blog",
    badge: "Category",
    emptyHeading: "No posts in this category yet",
    emptyBody: "Check back soon for new articles.",
    emptyCta: "Browse all posts →",
    readMore: "Read more",
    minRead: (n: number) => `${n} min read`,
    dateLocale: "en-US",
  },
  es: {
    home: "Inicio",
    blog: "Blog",
    badge: "Categoría",
    emptyHeading: "Aún no hay publicaciones en esta categoría",
    emptyBody: "Vuelve pronto para ver nuevos artículos.",
    emptyCta: "Ver todas las publicaciones →",
    readMore: "Leer más",
    minRead: (n: number) => `${n} min de lectura`,
    dateLocale: "es-US",
  },
  fr: {
    home: "Accueil",
    blog: "Blog",
    badge: "Catégorie",
    emptyHeading: "Aucune publication dans cette catégorie pour l'instant",
    emptyBody: "Reviens bientôt pour découvrir de nouveaux articles.",
    emptyCta: "Voir toutes les publications →",
    readMore: "Lire la suite",
    minRead: (n: number) => `${n} min de lecture`,
    dateLocale: "fr-FR",
  },
} as const;

const categoryColors: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  rose: "bg-rose-50 text-rose-700 border-rose-100",
  violet: "bg-violet-50 text-violet-700 border-violet-100",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
};

interface Props {
  category: SanityCategory;
  posts: SanityPost[];
  locale: Locale;
}

export default function BlogCategoryBody({ category, posts, locale }: Props) {
  const c = COPY[locale];
  const blogHref = locale === "es" ? "/es/blog" : "/blog";
  const postHref = (slug: string) =>
    locale === "es" ? `/es/blog/${slug}` : `/blog/${slug}`;

  return (
    <article className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: c.home, href: locale === "es" ? "/es" : "/" },
            { label: c.blog, href: blogHref },
            { label: category.title },
          ]}
        />

        <div className="mt-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-4">
            <FolderOpen className="w-5 h-5 text-primary-600" />
            <span className="text-xs font-bold uppercase tracking-wide text-primary-600">
              {c.badge}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {category.title}
          </h1>
          {category.description && (
            <p className="mt-4 text-lg text-slate-700 leading-relaxed">
              {category.description}
            </p>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="mt-12 text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-slate-900">{c.emptyHeading}</h2>
            <p className="text-sm text-slate-700 mt-2">{c.emptyBody}</p>
            <Link
              href={blogHref}
              className="inline-block mt-6 px-5 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700"
            >
              {c.emptyCta}
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const heroUrl = post.heroImage
                ? urlFor(post.heroImage).width(800).height(500).quality(80).url()
                : null;
              const colorClass =
                categoryColors[post.category?.color || "indigo"] || categoryColors.indigo;

              return (
                <Link
                  key={post._id}
                  href={postHref(post.slug)}
                  className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-slate-300 transition"
                >
                  {heroUrl && (
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <Image
                        src={heroUrl}
                        alt={post.heroImage?.alt || post.title}
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
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 text-sm text-slate-700 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString(c.dateLocale, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {post.readMinutes ? (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {c.minRead(post.readMinutes)}
                        </span>
                      ) : null}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all">
                      {c.readMore} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
