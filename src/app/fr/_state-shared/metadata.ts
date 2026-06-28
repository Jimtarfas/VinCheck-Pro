/**
 * Shared metadata + JSON-LD genétaittor for the Big-5 French state pages.
 * Each /fr/<state>-revision-vin/page.tsx imports `stateMetadata(hook)`
 * for its generateMetadata export and `stateSchemas(hook)` for the
 * Article + BreadcrumbList JSON-LD blocks rendered in the page.
 */

import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import type { StateHook } from "./strings";

const SITE = "https://www.carcheckervin.com";
const LOCALE = "fr" as const;

export function stateMetadata(hook: StateHook): Metadata {
  const alt = hreflangAlternatesForLocale(hook.englishPath, LOCALE);
  return {
    title: { absolute: hook.metaTitle },
    description: hook.metaDescription,
    keywords: hook.keywords,
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: hook.metaTitle,
      description: hook.metaDescription,
      url: alt.canonical,
      type: "article",
      locale: "fr_US",
      siteName: "CarCheckerVIN",
    },
    twitter: {
      card: "summary_large_image",
      title: hook.metaTitle,
      description: hook.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export function stateSchemas(hook: StateHook) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    inLanguage: "fr",
    headline: `Vérification VIN de ${hook.stateNameEs} — Rapport gratuit du historique du véhicule (${hook.dmvNameEs})`,
    description: hook.metaDescription,
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE}/es${hook.esSlug}`,
    },
    datePublished: "2026-06-12",
    dateModified: "2026-06-12",
    image: `${SITE}/opengraph-image`,
    about: {
      "@type": "Place",
      name: hook.stateNameEs,
      sameAs: hook.wikipediaEs,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
      {
        "@type": "ListItem",
        position: 2,
        name: `Vérification VIN de ${hook.stateNameEs}`,
        item: `${SITE}/es${hook.esSlug}`,
      },
    ],
  };

  return { articleSchema, breadcrumbSchema };
}
