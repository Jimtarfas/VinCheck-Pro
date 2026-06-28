/**
 * Shared body for /blog/[slug] and /es/blog/[slug].
 * Wave 18 batch 4 — same English layout in both locales via COPY={en,es}.
 *
 * Post body, title, excerpt, hero, and tags render from Sanity. The body
 * itself stays in its source language (EN body for /blog, bodyEs ↩ body
 * fallback for /es/blog). Only the UI chrome — breadcrumb, dates, "min
 * read", related-posts heading, tags rail, author byline, inline VIN
 * promo card, related-card "Read"/"Leer más" — is translated via COPY.
 */

import Link from "@/components/LocaleLink";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { urlFor } from "@/sanity/client";
import type { SanityPost } from "@/sanity/types";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    blog: "Blog",
    minRead: (n: number) => `${n} min read`,
    dateLocale: "en-US",
    bodyEmpty: "No content yet.",
    inlinePromoEyebrow: "Ready to check a VIN?",
    inlinePromoHeading: "Run a free VIN check",
    inlinePromoSub: "Decode any vehicle in under 60 seconds.",
    aboutAuthor: "About the author",
    relatedH2: "Related Posts",
    relatedLinkLabel: "Read",
    bottomH2: "Check Any VIN for Free",
    bottomSub: "Get instant vehicle history reports.",
  },
  es: {
    home: "Inicio",
    blog: "Blog",
    minRead: (n: number) => `${n} min de lectura`,
    dateLocale: "es-US",
    bodyEmpty: "Aún no hay contenido.",
    inlinePromoEyebrow: "¿Listo para verificar un VIN?",
    inlinePromoHeading: "Reporte VIN gratis al instante",
    inlinePromoSub: "Decodifica cualquier vehículo en menos de 60 segundos.",
    aboutAuthor: "Sobre el autor",
    relatedH2: "Artículos relacionados",
    relatedLinkLabel: "Leer más",
    bottomH2: "Verifica cualquier VIN gratis",
    bottomSub: "Obtén reportes instantáneos del historial vehicular.",
  },
  fr: {
    home: "Accueil",
    blog: "Blog",
    minRead: (n: number) => `${n} min de lecture`,
    dateLocale: "fr-FR",
    bodyEmpty: "Pas encore de contenu.",
    inlinePromoEyebrow: "Prêt à vérifier un VIN ?",
    inlinePromoHeading: "Lance une vérification VIN gratuite",
    inlinePromoSub: "Décode n'importe quel véhicule en moins de 60 secondes.",
    aboutAuthor: "À propos de l'auteur",
    relatedH2: "Articles connexes",
    relatedLinkLabel: "Lire",
    bottomH2: "Vérifie n'importe quel VIN gratuitement",
    bottomSub: "Obtiens des rapports d'historique du véhicule instantanés.",
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
  post: SanityPost;
  related: SanityPost[];
  locale: Locale;
}

export default function BlogPostBody({ post, related, locale }: Props) {
  const c = COPY[locale];
  const homeHref = locale === "es" ? "/es" : "/";
  const blogHref = locale === "es" ? "/es/blog" : "/blog";
  const postHref = (slug: string) =>
    locale === "es" ? `/es/blog/${slug}` : `/blog/${slug}`;
  const tagHref = (tagSlug: string) =>
    locale === "es" ? `/es/blog/tag/${tagSlug}` : `/blog/tag/${tagSlug}`;

  const displayTitle = locale === "es" ? post.titleEs || post.title : post.title;
  const displayExcerpt =
    locale === "es" ? post.excerptEs || post.excerpt : post.excerpt;
  const displayBody = locale === "es" ? post.bodyEs || post.body : post.body;

  const heroUrl = post.heroImage
    ? urlFor(post.heroImage).width(1600).quality(85).url()
    : null;
  const colorClass =
    categoryColors[post.category?.color || "indigo"] || categoryColors.indigo;

  return (
    <>
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: c.home, href: homeHref },
              { label: c.blog, href: blogHref },
              { label: displayTitle },
            ]}
          />

          {post.category && (
            <span
              className={`mt-6 inline-block text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${colorClass}`}
            >
              {post.category.title}
            </span>
          )}

          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            {displayTitle}
          </h1>

          {displayExcerpt && (
            <p className="mt-4 text-lg text-slate-700 leading-relaxed">
              {displayExcerpt}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-700 pb-6 border-b border-slate-200">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.avatar && (
                  <Image
                    src={urlFor(post.author.avatar).width(80).height(80).url()}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span className="font-semibold text-slate-900">
                  {post.author.name}
                </span>
                {post.author.role && (
                  <span className="text-xs text-slate-600">
                    · {post.author.role}
                  </span>
                )}
              </div>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString(c.dateLocale, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {post.readMinutes ? (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {c.minRead(post.readMinutes)}
              </span>
            ) : null}
          </div>

          {heroUrl && (
            <div className="mt-8 relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src={heroUrl}
                alt={post.heroImage?.alt || displayTitle}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}

          <div className="mt-8">
            {displayBody ? (
              <PortableTextRenderer value={displayBody} />
            ) : (
              <p className="text-slate-700">{c.bodyEmpty}</p>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap gap-2">
              {post.tags.map((tag) => {
                const tagSlug = tag
                  .toLowerCase()
                  .trim()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "");
                return (
                  <Link
                    key={tag}
                    href={tagHref(tagSlug)}
                    className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    #{tag}
                  </Link>
                );
              })}
            </div>
          )}

          {post.author?.bio && (
            <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="flex items-start gap-4">
                {post.author.avatar && (
                  <Image
                    src={urlFor(post.author.avatar).width(120).height(120).url()}
                    alt={post.author.name}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-bold text-slate-900">{post.author.name}</p>
                  {post.author.role && (
                    <p className="text-xs text-slate-700">{post.author.role}</p>
                  )}
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {post.author.bio}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <p className="text-xs font-bold text-primary-700 uppercase tracking-wider mb-2">
              {c.inlinePromoEyebrow}
            </p>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              {c.inlinePromoHeading}
            </h2>
            <p className="text-sm text-slate-600 mb-4">{c.inlinePromoSub}</p>
            <VinSearchForm size="sm" locale={locale} />
          </div>

          {related && related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-xl font-bold text-slate-900 mb-5">
                {c.relatedH2}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.slice(0, 3).map((p) => {
                  const url = p.heroImage
                    ? urlFor(p.heroImage).width(400).height(250).url()
                    : null;
                  const rTitle =
                    locale === "es" ? p.titleEs || p.title : p.title;
                  return (
                    <Link
                      key={p._id}
                      href={postHref(p.slug)}
                      className="group block bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition"
                    >
                      {url && (
                        <div className="relative aspect-[16/10] bg-slate-100">
                          <Image
                            src={url}
                            alt={p.heroImage?.alt || rTitle}
                            fill
                            className="object-cover"
                            sizes="300px"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-primary-700 line-clamp-2">
                          {rTitle}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary-600">
                          {c.relatedLinkLabel} <ArrowRight className="w-3 h-3" />
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

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.bottomH2}</h2>
          <p className="text-slate-700 mb-6">{c.bottomSub}</p>
          <VinSearchForm size="sm" locale={locale} />
        </div>
      </section>
    </>
  );
}
