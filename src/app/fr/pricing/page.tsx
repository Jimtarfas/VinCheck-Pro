/**
 * Wave 18 batch 4 — French pricing page. Same full English layout via the
 * shared PricingBody. Replaces the prior Wave-15 minimal stub.
 */

import type { Metadata } from "next";
import PricingBody, { FAQS_FR } from "@/components/PricingBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternatesForLocale("/pricing", "fr");
const PAGE_URL = alt.canonical;

const title = "Tarifs de vérification VIN — Rapports gratuits, formules à l’unité et en pack";
const description =
  "Tarifs de CarCheckerVIN. Chaque plan es 100% gratuit par temps limitado — rapports uniques, pack de 3, pack de 5 et packs profesionales. Sin carte de crédit.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "tarifs vérification VIN",
    "prix rapport historique de véhicule",
    "coût rapport VIN",
    "vérification VIN gratuit",
    "alternative Carfax prix",
    "alternative AutoCheck",
    "rapport historique de véhicule bon marché",
    "pack vérification VIN",
    "tarifs VIN concessionnaire",
  ],
  alternates: {
    canonical: alt.canonical,
    languages: alt.languages,
  },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Chaque plan 100% gratuit par temps limitado. Único, pack de 3, pack de 5 et packs profesionales. Sin carte de crédit.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD ─────────────────────────────────────────────────────── */

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Tarifs", item: PAGE_URL },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  inLanguage: "fr",
  name: "Rapport complet du historique du véhicule CarCheckerVIN",
  description:
    "Rapport complet du historique de véhicule avec especificaciones, données de rappels, valeures de marché, photos réels et données de coûts de propriété. Respaldado par NMVTIS.",
  brand: { "@type": "Brand", name: "CarCheckerVIN" },
  image: `${SITE}/og-image.png`,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "0",
    offerCount: "4",
    offers: [
      { "@type": "Offer", name: "Rapport unique", price: "0", priceCurrency: "USD", description: "Un rapport premium du historique de véhicule — données complets, photos complètes.", availability: "https://schema.org/InStock", url: PAGE_URL },
      { "@type": "Offer", name: "Paquete de 3", price: "0", priceCurrency: "USD", description: "Tres rapports premium du historique de véhicule pour comparar options.", availability: "https://schema.org/InStock", url: PAGE_URL },
      { "@type": "Offer", name: "Paquete de 5", price: "0", priceCurrency: "USD", description: "Cinco rapports premium du historique de véhicule — meilleur valeur pour acheteurs êtreios.", availability: "https://schema.org/InStock", url: PAGE_URL },
      { "@type": "Offer", name: "Paquete Pro (10 rapports)", price: "0", priceCurrency: "USD", description: "Diez rapports premium du historique de véhicule pour concessionnaires et acheteurs de flotas.", availability: "https://schema.org/InStock", url: PAGE_URL },
    ],
  },
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

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Tarifs de CarCheckerVIN — Rapports de historique de véhicule gratuit",
  description:
    "Desglose complet de tarifs pour les formules de vérification VIN de CarCheckerVIN, avec comparaciones de packs et comparaison de tarifs avec Carfax / AutoCheck.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-22",
  dateModified: new Date().toISOString().slice(0, 10),
  image: `${SITE}/opengraph-image`,
};

export default function PricingPageEs() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <PricingBody locale="fr" />
    </>
  );
}
