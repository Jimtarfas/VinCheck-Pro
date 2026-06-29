/**
 * Wave 18 batch 2 — Spanish what-is-a-vin-number guide. Renders the same
 * full layout as the English page via shared GuideWhatIsAVinNumberBody.
 * Replaces the prior Wave-15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import GuideWhatIsAVinNumberBody, { FAQS_ES } from "@/components/GuideWhatIsAVinNumberBody";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/guides/what-is-a-vin-number`;
const alt = hreflangAlternatesForLocale("/guides/what-is-a-vin-number", "es");
const title = "\u00bfQu\u00e9 es un n\u00famero VIN? Gu\u00eda completa de N\u00fameros de Identificaci\u00f3n Vehicular";
const description =
  "Aprende qu\u00e9 es un n\u00famero VIN, por qu\u00e9 importa y d\u00f3nde encontrarlo en cualquier veh\u00edculo. Gu\u00eda completa de N\u00fameros de Identificaci\u00f3n Vehicular con historia, estructura y usos pr\u00e1cticos.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "qu\u00e9 es un n\u00famero VIN",
    "significado VIN",
    "n\u00famero de identificaci\u00f3n vehicular",
    "n\u00famero VIN explicado",
    "qu\u00e9 significa VIN",
    "definici\u00f3n de VIN",
    "d\u00f3nde encontrar el VIN",
    "ubicaci\u00f3n del n\u00famero VIN",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: title,
  description,
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-16",
  dateModified: new Date().toISOString().slice(0, 10),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Gu\u00edas", item: `${SITE}/es/guides` },
    { "@type": "ListItem", position: 3, name: "\u00bfQu\u00e9 es un n\u00famero VIN?", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GuideWhatIsAVinNumberBody locale="es" />
    </>
  );
}
