/**
 * Wave 18d — Spanish dealer-check. Same full English layout via the
 * shared DealerCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import DealerCheckBody, { FAQS_ES } from "@/components/DealerCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/dealer-check`;
const alt = hreflangAlternatesForLocale("/dealer-check", "es");
const title = "Verificación de historial de concesionario por VIN — ¿Este auto fue demo o de cortesía?";
const description = "Verifica si un vehículo fue usado como demo de concesionario, auto de cortesía o auto de flota de prensa por VIN. Encuentra registros de propiedad del concesionario, acumulación de kilometraje antes de venta y uso comercial.";

export const metadata: Metadata = {
  title, description,
  keywords: ["verificación demo concesionario VIN", "historial auto de cortesía", "historial auto concesionario", "vehículo demo VIN", "verificación flota de prensa", "historial propiedad concesionario"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Verificación de historial de concesionario por VIN", description: "Aprende a verificar si un vehículo fue usado como demo de concesionario, auto de cortesía o auto de flota de prensa por VIN.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10) };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Verificación de concesionario", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <DealerCheckBody locale="es" />
    </>
  );
}
