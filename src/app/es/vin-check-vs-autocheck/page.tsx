/**
 * Wave 18b — Spanish vin-check-vs-autocheck. Same full English layout via the
 * shared VinCheckVsAutoCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import VinCheckVsAutoCheckBody, { FAQS_ES, SINGLE, AC_SINGLE } from "@/components/VinCheckVsAutoCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/vin-check-vs-autocheck`;
const alt = hreflangAlternatesForLocale("/vin-check-vs-autocheck", "es");
const title = "CarCheckerVIN vs AutoCheck: Comparación 2026";
const description = `CarCheckerVIN vs AutoCheck (de Experian) comparados en precio, fuentes de datos y profundidad del reporte. ${SINGLE} por reporte versus los ${AC_SINGLE} de AutoCheck — sin el paywall de la Puntuación AutoCheck.`;

export const metadata: Metadata = {
  title, description,
  keywords: ["alternativa carfax", "autocheck vs", "experian autocheck", "costo autocheck", "es autocheck bueno", "alternativa autocheck", "autocheck vs carfax", "mejor verificación vin 2026", "puntuación autocheck explicada", "reportes ilimitados autocheck", "más barato que autocheck", "precio autocheck"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title, description: `${SINGLE} por reporte versus los ${AC_SINGLE} de AutoCheck. Mismos datos clave de NMVTIS, más fotos reales y valor de mercado.` },
  robots: { index: true, follow: true },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: title, description: "Una comparación lado a lado de CarCheckerVIN y Experian AutoCheck cubriendo precios, fuentes de datos, la Puntuación AutoCheck y el caso de uso adecuado para cada uno.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-26", dateModified: "2026-06-16" };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "CarCheckerVIN vs AutoCheck", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <VinCheckVsAutoCheckBody locale="es" />
    </>
  );
}
