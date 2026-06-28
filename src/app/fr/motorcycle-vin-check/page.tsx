/**
 * Wave 18 batch 3 — French motorcycle-vin-check. Same full English
 * layout via shared MotorcycleVinCheckBody. Replaces the prior Wave-15
 * SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import MotorcycleVinCheckBody, { FAQS_FR } from "@/components/MotorcycleVinCheckBody";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/motorcycle-vin-check`;
const alt = hreflangAlternatesForLocale("/motorcycle-vin-check", "fr");
const title = "Verificaci\u00f3n de VIN de moto — Décodeur et rapport gratuit";
const description =
  "Haz una verificaci\u00f3n gratuit de VIN pour n’importe quel moto, crucero, deportiva ou moto todoterrenonn. Décode le VIN de 17 caracteres pour obtener historique complet, état du t\u00edtulo, enregistrements de vol et especificaciones.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "verificaci\u00f3n VIN moto",
    "décodeur VIN moto",
    "rapport historique moto",
    "VIN moto gratuit",
    "verificaci\u00f3n t\u00edtulo moto",
    "verificaci\u00f3n vol moto",
    "c\u00f3mo buscar le VIN de una moto",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: title,
  description,
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-04",
  dateModified: "2026-06-28",
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
    { "@type": "ListItem", position: 2, name: "Verificaci\u00f3n VIN moto", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MotorcycleVinCheckBody locale="fr" />
    </>
  );
}
