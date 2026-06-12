/**
 * Shared metadata + JSON-LD generator for Wave 5 specialty Spanish pages.
 */

import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import { SITE, type SpecialtyHook } from "./strings";

const LOCALE = "es" as const;

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
      locale: "es_US",
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
    inLanguage: "es",
    name: hook.schemaName,
    url: `${SITE}/es${hook.esSlug}`,
    description: hook.metaDescription,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
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
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
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
