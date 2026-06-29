/**
 * Wave 18 batch 3 — Spanish motorcycle-vin-check. Same full English
 * layout via shared MotorcycleVinCheckBody. Replaces the prior Wave-15
 * SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import MotorcycleVinCheckBody, { FAQS_ES } from "@/components/MotorcycleVinCheckBody";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/motorcycle-vin-check`;
const alt = hreflangAlternatesForLocale("/motorcycle-vin-check", "es");
const title = "Verificaci\u00f3n de VIN de motocicleta — Decodificador y reporte gratis";
const description =
  "Haz una verificaci\u00f3n gratis de VIN para cualquier motocicleta, crucero, deportiva o moto todoterreno. Decodifica el VIN de 17 caracteres para obtener historial completo, estado del t\u00edtulo, registros de robo y especificaciones.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "verificaci\u00f3n VIN motocicleta",
    "decodificador VIN moto",
    "reporte historial motocicleta",
    "VIN moto gratis",
    "verificaci\u00f3n t\u00edtulo motocicleta",
    "verificaci\u00f3n robo motocicleta",
    "c\u00f3mo buscar el VIN de una moto",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: title,
  description,
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-04",
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
    { "@type": "ListItem", position: 2, name: "Verificaci\u00f3n VIN motocicleta", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MotorcycleVinCheckBody locale="es" />
    </>
  );
}
