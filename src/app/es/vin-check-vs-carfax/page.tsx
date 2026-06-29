/**
 * Wave 18b — Spanish vin-check-vs-carfax. Same full English layout via the
 * shared VinCheckVsCarfaxBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import VinCheckVsCarfaxBody, { FAQS_ES } from "@/components/VinCheckVsCarfaxBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/vin-check-vs-carfax`;
const alt = hreflangAlternatesForLocale("/vin-check-vs-carfax", "es");
const title = "CarCheckerVIN vs Carfax — Alternativa más económica y rápida de verificación VIN";
const description = "CarCheckerVIN vs Carfax comparados lado a lado. Mira precios ($14.99 vs $44.99), fuentes de datos, reportes incluidos y por qué los conductores están cambiando a una alternativa más inteligente a Carfax.";

export const metadata: Metadata = {
  title, description,
  keywords: ["alternativa carfax", "más barato que carfax", "verificación vin vs carfax", "mejor servicio verificación vin", "carfax vs autocheck alternativa", "reporte historial vehicular económico", "mejor alternativa carfax 2026", "comparación reporte vin"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "CarCheckerVIN vs Carfax: ¿Cuál es mejor?", description: "Una comparación lado a lado de CarCheckerVIN y Carfax cubriendo precios, fuentes de datos, contenidos del reporte y el caso de uso adecuado para cada uno.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: new Date().toISOString().slice(0, 10) };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "CarCheckerVIN vs Carfax", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <VinCheckVsCarfaxBody locale="es" />
    </>
  );
}
