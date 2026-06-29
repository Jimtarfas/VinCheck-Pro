/**
 * Wave 18 batch 2 — French what-is-a-vin-number guide. Renders the same
 * full layout as the English page via shared GuideWhatIsAVinNumberBody.
 * Replaces the prior Wave-15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import GuideWhatIsAVinNumberBody, { FAQS_FR } from "@/components/GuideWhatIsAVinNumberBody";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/guides/what-is-a-vin-number`;
const alt = hreflangAlternatesForLocale("/guides/what-is-a-vin-number", "fr");
const title = "\u00bfQu\u00e9 es un n\u00famero VIN? Gu\u00eda complète de N\u00fameros de Identificaci\u00f3n Vehicular";
const description =
  "Apprends qu\u00e9 es un n\u00famero VIN, par qu\u00e9 importa et d\u00f3nde trouverlo en n’importe quel veh\u00edculo. Gu\u00eda complète de N\u00fameros de Identificaci\u00f3n Vehicular avec histoire, estructura et usos pr\u00e1cticos.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "qu\u00e9 es un n\u00famero VIN",
    "significado VIN",
    "n\u00famero de identificaci\u00f3n du véhicule",
    "n\u00famero VIN explicado",
    "qu\u00e9 significa VIN",
    "definici\u00f3n de VIN",
    "d\u00f3nde trouver le VIN",
    "ubicaci\u00f3n du n\u00famero VIN",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
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
  inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Gu\u00edas", item: `${SITE}/fr/guides` },
    { "@type": "ListItem", position: 3, name: "\u00bfQu\u00e9 es un n\u00famero VIN?", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GuideWhatIsAVinNumberBody locale="fr" />
    </>
  );
}
