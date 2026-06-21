/**
 * Wave 18b — Spanish vin-check-vs-vinaudit. Same full English layout via the
 * shared VinCheckVsVinAuditBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import VinCheckVsVinAuditBody, { FAQS_ES } from "@/components/VinCheckVsVinAuditBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/vin-check-vs-vinaudit`;
const alt = hreflangAlternatesForLocale("/vin-check-vs-vinaudit", "es");
const title = "CarCheckerVIN vs VinAudit: ¿Cuál decodificador VIN gana?";
const description = "CarCheckerVIN vs VinAudit comparado en precio, profundidad de datos NMVTIS, velocidad del reporte y presentación. Un desglose justo lado a lado para compradores que buscan un decodificador VIN.";

export const metadata: Metadata = {
  title, description,
  keywords: ["alternativa vinaudit", "costo vinaudit", "vinaudit vs", "es vinaudit confiable", "reseña vinaudit", "alternativa reporte nmvtis", "mejor decodificador vin 2026", "verificación vin barata"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: title,
  description: "Una comparación lado a lado de CarCheckerVIN y VinAudit cubriendo precios, autorización NMVTIS, contenidos del reporte y el caso de uso adecuado para cada uno.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-26",
  dateModified: "2026-04-26",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "CarCheckerVIN vs VinAudit", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <VinCheckVsVinAuditBody locale="es" />
    </>
  );
}
