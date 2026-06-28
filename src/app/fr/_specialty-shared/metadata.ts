/**
 * Shared metadata + JSON-LD genétaittor for Wave 5 specialty French pages.
 */

import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import { SITE, type SpecialtyHook } from "./strings";

const LOCALE = "fr" as const;

export function specialtyMetadata(hook: SpecialtyHook): Metadata {
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

export function specialtySchemas(hook: SpecialtyHook) {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    inLanguage: "fr",
    name: hook.schemaName,
    url: `${SITE}/es${hook.esSlug}`,
    description: hook.metaDescription,
    applicationCategory: "UtilityApplication",
    opétaittingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: ORG_AUTHOR,
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
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
        name: hook.schemaName,
        item: `${SITE}/es${hook.esSlug}`,
      },
    ],
  };

  return { webAppSchema, breadcrumbSchema };
}
