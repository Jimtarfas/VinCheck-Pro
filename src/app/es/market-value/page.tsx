/**
 * Wave 18a — Spanish market-value. Same full English layout via the
 * shared MarketValueBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import MarketValueBody, { FAQS_ES } from "@/components/MarketValueBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/market-value`;
const alt = hreflangAlternatesForLocale("/market-value", "es");
const title = "Valor de mercado del auto por VIN — Herramienta gratuita de valuación vehicular";
const description =
  "Obtén el valor de mercado actual de cualquier vehículo por VIN. Compara los valores de intercambio, venta privada y minorista de concesionario según kilometraje, condición, opciones y datos del mercado regional.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "valor de mercado auto por VIN",
    "valuación vehículo por VIN",
    "valor de intercambio por VIN",
    "consulta valor auto",
    "cuánto vale un auto por VIN",
    "cuánto vale mi auto",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Valor de mercado del auto por VIN",
  description:
    "Aprende cómo se calcula el valor de mercado de un vehículo por VIN, incluyendo valores de intercambio vs. venta privada vs. minorista y cómo el kilometraje, condición y región afectan los precios.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
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
    { "@type": "ListItem", position: 2, name: "Valor de mercado", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MarketValueBody locale="es" />
    </>
  );
}
