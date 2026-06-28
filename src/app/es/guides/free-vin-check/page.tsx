/**
 * Wave 18.18 (batch 2) — Spanish free-vin-check guide. Same full layout as
 * EN via the shared GuideFreeVinCheckBody. Replaces the Wave 15 stub.
 */

import type { Metadata } from "next";
import GuideFreeVinCheckBody, { FAQS_ES } from "@/components/GuideFreeVinCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/guides/free-vin-check`;
const alt = hreflangAlternatesForLocale("/guides/free-vin-check", "es");
const title = "Verificación VIN gratis — Decodifica cualquier número VIN gratis";
const description =
  "Haz una verificación VIN gratis para decodificar cualquier número de identificación vehicular. Mira qué incluyen las verificaciones VIN gratis, cómo se comparan con los reportes premium y por qué cada comprador debería usar una.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "verificación VIN gratis",
    "decodificador VIN gratis",
    "verificar VIN gratis",
    "historial de vehículo gratis",
    "búsqueda VIN gratis",
    "decodificar VIN gratis",
    "verificación de auto gratis",
    "reporte VIN gratis",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description:
      "Haz una verificación VIN gratis para decodificar cualquier número de identificación vehicular. Mira qué se incluye en los reportes VIN gratis vs. premium.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Verificación VIN gratis — Decodifica cualquier número VIN gratis",
  description:
    "Haz una verificación VIN gratis para decodificar cualquier número de identificación vehicular. Aprende qué incluyen las verificaciones gratis y cómo se comparan con los reportes premium.",
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
  inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({
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
      <GuideFreeVinCheckBody locale="es" />
    </>
  );
}
