/**
 * Shared body for /blog/tag/[tag] and /es/blog/tag/[tag].
 * Wave 17g — renders the same full English tag-archive layout in
 * both locales via a COPY={en,es} map.
 */

import Link from "@/components/LocaleLink";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Tag as TagIcon } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { urlFor } from "@/sanity/client";
import type { SanityPost } from "@/sanity/types";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    blog: "Blog",
    badge: "Tag",
    h1: (tag: string) => `Articles tagged: ${tag}`,
    intro: (count: number, tag: string) =>
      `${count} ${count === 1 ? "article" : "articles"} tagged with #${tag} from the CarCheckerVIN editorial team.`,
    readMore: "Read more",
    minRead: (n: number) => `${n} min read`,
    dateLocale: "en-US",
  },
  es: {
    home: "Inicio",
    blog: "Blog",
    badge: "Etiqueta",
    h1: (tag: string) => `Artículos etiquetados: ${tag}`,
    intro: (count: number, tag: string) =>
      `${count} ${count === 1 ? "artículo etiquetado" : "artículos etiquetados"} con #${tag} del equipo editorial de CarCheckerVIN.`,
    readMore: "Leer más",
    minRead: (n: number) => `${n} min de lectura`,
    dateLocale: "es-US",
  },
  fr: {
    home: "Accueil",
    blog: "Blog",
    badge: "Étiquette",
    h1: (tag: string) => `Articles étiquetés : ${tag}`,
    intro: (count: number, tag: string) =>
      `${count} ${count === 1 ? "article étiqueté" : "articles étiquetés"} avec #${tag} par l'équipe éditoriale de CarCheckerVIN.`,
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
  tag: string;
  posts: SanityPost[];
  locale: Locale;
}

export default function BlogTagBody({ tag, posts, locale }: Props) {
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
            { label: `#${tag}` },
          ]}
        />

        <div className="mt-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-4">
            <TagIcon className="w-5 h-5 text-primary-600" />
            <span className="text-xs font-bold uppercase tracking-wide text-primary-600">
              {c.badge}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {c.h1(tag)}
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            {c.intro(posts.length, tag)}
          </p>
        </div>

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
      </div>
    </article>
  );
}
