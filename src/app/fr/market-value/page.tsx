/**
 * Wave 18a — French market-value. Same full English layout via the
 * shared MarketValueBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import MarketValueBody, { FAQS_FR } from "@/components/MarketValueBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/market-value`;
const alt = hreflangAlternatesForLocale("/market-value", "fr");
const title = "Valor de marché du auto par VIN — Herramienta gratuite de évaluation du véhicule";
const description =
  "Obtiens le valeur de marché actual de n’importe quel véhicule par VIN. Compare les valeures de intercambio, vente privada et minonrista de concessionnaire selon kilométrage, condition, options et données du marché regional.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "valeur de marché auto par VIN",
    "évaluation véhicule par VIN",
    "valeur de intercambio par VIN",
    "consultatioptiontioptiontioption valeur auto",
    "combien vale un auto par VIN",
    "combien vale mi auto",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Valor de marché du auto par VIN",
  description:
    "Apprends comment se calcule le valeur de marché de un véhicule par VIN, incluant valeures de intercambio vs. vente privada vs. minonrista et comment le kilométrage, condition et région afectan les tarifs.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-04",
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
    { "@type": "ListItem", position: 2, name: "Valor de marché", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MarketValueBody locale="fr" />
    </>
  );
}
