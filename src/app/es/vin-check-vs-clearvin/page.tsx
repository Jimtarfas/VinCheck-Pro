/**
 * Wave 18b — Spanish vin-check-vs-clearvin. Same full English layout via the
 * shared VinCheckVsClearVinBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import VinCheckVsClearVinBody, { FAQS_ES } from "@/components/VinCheckVsClearVinBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/vin-check-vs-clearvin`;
const alt = hreflangAlternatesForLocale("/vin-check-vs-clearvin", "es");
const title = "CarCheckerVIN vs ClearVin: lado a lado (2026)";
const description = "CarCheckerVIN vs ClearVin comparados en precio, profundidad de marcas de título, fotos y calidad del reporte. Un desglose justo 2026 lado a lado para compradores de autos usados.";

export const metadata: Metadata = {
  title, description,
  keywords: ["alternativa clearvin", "costo clearvin", "clearvin confiable", "clearvin vs vincheckpro", "reseña clearvin", "mejor servicio verificación título", "verificación vin con fotos", "reporte historial vehicular barato", "clearvin ilimitado"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: title, description: "Una comparación lado a lado de CarCheckerVIN y ClearVin cubriendo precios, cobertura de marcas de título, fotos, valor de mercado y el caso de uso adecuado para cada uno.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-26", dateModified: "2026-04-26" };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "CarCheckerVIN vs ClearVin", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <VinCheckVsClearVinBody locale="es" />
    </>
  );
}
