/**
 * Wave 18 batch 4 — Spanish pricing page. Same full English layout via the
 * shared PricingBody. Replaces the prior Wave-15 minimal stub.
 */

import type { Metadata } from "next";
import PricingBody, { FAQS_ES } from "@/components/PricingBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternatesForLocale("/pricing", "es");
const PAGE_URL = alt.canonical;

const title = "Precios de verificación VIN — Reportes gratis, planes únicos y de paquete";
const description =
  "Precios de CarCheckerVIN. Cada plan es 100% gratis por tiempo limitado — reportes únicos, paquete de 3, paquete de 5 y paquetes profesionales. Sin tarjeta de crédito.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "precios verificación VIN",
    "precio reporte historial vehicular",
    "costo reporte VIN",
    "verificación VIN gratis",
    "alternativa Carfax precio",
    "alternativa AutoCheck",
    "reporte historial vehicular barato",
    "paquete verificación VIN",
    "precios VIN concesionario",
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
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Cada plan 100% gratis por tiempo limitado. Único, paquete de 3, paquete de 5 y paquetes profesionales. Sin tarjeta de crédito.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD ─────────────────────────────────────────────────────── */

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Precios", item: PAGE_URL },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  inLanguage: "es",
  name: "Reporte completo del historial del vehículo CarCheckerVIN",
  description:
    "Reporte completo del historial vehicular con especificaciones, datos de retiros, valores de mercado, fotos reales y datos de costos de propiedad. Respaldado por NMVTIS.",
  brand: { "@type": "Brand", name: "CarCheckerVIN" },
  image: `${SITE}/og-image.png`,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "0",
    offerCount: "4",
    offers: [
      { "@type": "Offer", name: "Reporte único", price: "0", priceCurrency: "USD", description: "Un reporte premium del historial vehicular — datos completos, fotos completas.", availability: "https://schema.org/InStock", url: PAGE_URL },
      { "@type": "Offer", name: "Paquete de 3", price: "0", priceCurrency: "USD", description: "Tres reportes premium del historial vehicular para comparar opciones.", availability: "https://schema.org/InStock", url: PAGE_URL },
      { "@type": "Offer", name: "Paquete de 5", price: "0", priceCurrency: "USD", description: "Cinco reportes premium del historial vehicular — mejor valor para compradores serios.", availability: "https://schema.org/InStock", url: PAGE_URL },
      { "@type": "Offer", name: "Paquete Pro (10 reportes)", price: "0", priceCurrency: "USD", description: "Diez reportes premium del historial vehicular para concesionarios y compradores de flotas.", availability: "https://schema.org/InStock", url: PAGE_URL },
    ],
  },
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

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Precios de CarCheckerVIN — Reportes de historial vehicular gratis",
  description:
    "Desglose completo de precios para los planes de verificación VIN de CarCheckerVIN, con comparaciones de paquetes y comparación de precios con Carfax / AutoCheck.",
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
      <PricingBody locale="es" />
    </>
  );
}
