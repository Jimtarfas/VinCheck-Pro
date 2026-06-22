/**
 * Wave 18b — Spanish vin-check-vs-bumper. Same full English layout via the
 * shared VinCheckVsBumperBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import VinCheckVsBumperBody, { FAQS_ES } from "@/components/VinCheckVsBumperBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/vin-check-vs-bumper`;
const alt = hreflangAlternatesForLocale("/vin-check-vs-bumper", "es");
const title = "CarCheckerVIN vs Bumper: precios y características comparados";
const description = "CarCheckerVIN vs Bumper comparados en precio, modelo de suscripción, monitoreo y profundidad del reporte. Mira por qué el pago por uso supera la suscripción de $19.99/mes de Bumper.";

export const metadata: Metadata = {
  title, description,
  keywords: ["alternativa bumper.com", "historial vehicular bumper", "costo suscripción bumper", "bumper vs", "vale la pena bumper", "reseña bumper", "verificación vin sin suscripción", "reporte vin pago por uso", "cancelar suscripción bumper"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: title, description: "Una comparación lado a lado de CarCheckerVIN y Bumper cubriendo precios, modelo de suscripción, monitoreo continuo, contenidos del reporte y el caso de uso adecuado para cada uno.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-26", dateModified: "2026-04-26" };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "CarCheckerVIN vs Bumper", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <VinCheckVsBumperBody locale="es" />
    </>
  );
}
