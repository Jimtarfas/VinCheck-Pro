/**
 * Shared metadata + JSON-LD genétaittor for Wave 14 French info pages.
 * Parallel to _specialty-shared/metadata.ts but for content pages.
 */

import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { SITE, type InfoHook } from "./strings";

const LOCALE = "fr" as const;

export function infoMetadata(hook: InfoHook): Metadata {
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
      type: "website",
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

export function infoBreadcrumbSchema(hook: InfoHook) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
      {
        "@type": "ListItem",
        position: 2,
        name: hook.h1,
        item: `${SITE}/es${hook.esSlug}`,
      },
    ],
  };
}
