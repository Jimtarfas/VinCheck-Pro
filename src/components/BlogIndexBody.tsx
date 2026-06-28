/**
 * Shared body for /blog and /es/blog.
 * Wave 18 batch 4 — same English layout in both locales via COPY={en,es}.
 *
 * Post titles, excerpts, and dates render verbatim from Sanity (English
 * fallback when titleEs / excerptEs are blank). Only the UI chrome —
 * page H1, intro, breadcrumb, empty state, "Read more", "min read" — is
 * translated.
 */

import Link from "@/components/LocaleLink";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, FileText } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { urlFor } from "@/sanity/client";
import type { SanityPost } from "@/sanity/types";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "Blog",
    h1: "VIN Check & Car Buying Blog",
    intro:
      "Expert guides on used car buying, vehicle history, title brands, fraud prevention, and VIN decoding. Backed by NMVTIS and NICB data sources.",
    browseCategory: "Browse by category",
    emptyHeading: "No posts yet",
    emptyBody: "Posts published in the Sanity Studio will appear here.",
    emptyCta: "Open Studio →",
    readMore: "Read more",
    minRead: (n: number) => `${n} min read`,
    dateLocale: "en-US",
  },
  es: {
    home: "Inicio",
    crumb: "Blog",
    h1: "Blog de verificación VIN y compra de autos",
    intro:
      "Guías expertas sobre compra de autos usados, historial vehicular, marcas de título, prevención de fraude y decodificación VIN. Respaldado por fuentes NMVTIS y NICB.",
    browseCategory: "Explorar por categoría",
    emptyHeading: "Aún no hay artículos",
    emptyBody: "Los artículos publicados en Sanity Studio aparecerán aquí.",
    emptyCta: "Abrir Studio →",
    readMore: "Leer más",
    minRead: (n: number) => `${n} min de lectura`,
    dateLocale: "es-US",
  },
  fr: {
    home: "Accueil",
    crumb: "Blog",
    h1: "Blog v\u00e9rification VIN et achat de voiture",
    intro:
      "Guides d'experts sur l'achat de voitures d'occasion, l'historique du v\u00e9hicule, les marques de titre, la pr\u00e9vention de la fraude et le d\u00e9codage VIN. Soutenu par les sources NMVTIS et NICB.",
    browseCategory: "Parcourir par cat\u00e9gorie",
    emptyHeading: "Aucun article pour l'instant",
    emptyBody: "Les articles publi\u00e9s dans Sanity Studio appara\u00eetront ici.",
    emptyCta: "Ouvrir Studio \u2192",
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
  posts: SanityPost[];
  locale: Locale;
}

export default function BlogIndexBody({ posts, locale }: Props) {
  const c = COPY[locale];
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const homeHref = localePrefix || "/";
  const categoryHref = `${localePrefix}/blog/category`;
  const postHref = (slug: string) => `${localePrefix}/blog/${slug}`;
  const studioHref = "/studio";

  return (
    <article className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: c.home, href: homeHref },
            { label: c.crumb },
          ]}
        />

        <div className="mt-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.intro}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <Link
              href={categoryHref}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 text-slate-800 font-semibold hover:bg-primary-50 hover:text-primary-700 transition-colors"
            >
              {c.browseCategory}
            </Link>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="mt-12 text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-slate-900">{c.emptyHeading}</h2>
            <p className="text-sm text-slate-700 mt-2">{c.emptyBody}</p>
            <Link
              href={studioHref}
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
                categoryColors[post.category?.color || "indigo"] ||
                categoryColors.indigo;
              const displayTitle =
                locale === "es" ? post.titleEs || post.title : post.title;
              const displayExcerpt =
                locale === "es" ? post.excerptEs || post.excerpt : post.excerpt;

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
