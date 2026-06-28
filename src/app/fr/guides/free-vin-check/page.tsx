/**
 * Wave 18.18 (batch 2) — French free-vin-check guide. Same full layout as
 * EN via the shared GuideFreeVinCheckBody. Replaces the Wave 15 stub.
 */

import type { Metadata } from "next";
import GuideFreeVinCheckBody, { FAQS_FR } from "@/components/GuideFreeVinCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/guides/free-vin-check`;
const alt = hreflangAlternatesForLocale("/guides/free-vin-check", "fr");
const title = "Vérification VIN gratuite — Décode n’importe quel numéro VIN gratuit";
const description =
  "Haz una vérification VIN gratuit pour décoder n’importe quel numéro de identification du véhicule. Mira qué inclutn les verificaciones VIN gratuit, comment se comparan avec les rapports premium et par qué cada acheteur doitría usar una.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "vérification VIN gratuit",
    "décodeur VIN gratuit",
    "vérifier VIN gratuit",
    "historique de véhicule gratuit",
    "búsqueda VIN gratuit",
    "décoder VIN gratuit",
    "vérification de auto gratuit",
    "rapport VIN gratuit",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description:
      "Haz una vérification VIN gratuit pour décoder n’importe quel numéro de identification du véhicule. Mira qué se inclut en les rapports VIN gratuit vs. premium.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Vérification VIN gratuite — Décode n’importe quel numéro VIN gratuit",
  description:
    "Haz una vérification VIN gratuit pour décoder n’importe quel numéro de identification du véhicule. Apprends qué inclutn les verificaciones gratuit et comment se comparan avec les rapports premium.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
  },
  datePublished: "2026-04-16",
  dateModified: "2026-06-25",
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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GuideFreeVinCheckBody locale="fr" />
    </>
  );
}
