/**
 * Wave 18a — Spanish accident-history-check.
 * Renders the SAME full English layout via the shared
 * AccidentHistoryCheckBody component. Replaces the Wave 15
 * SpecialtyToolPage stub with true visual parity.
 */

import type { Metadata } from "next";
import AccidentHistoryCheckBody, { FAQS_ES } from "@/components/AccidentHistoryCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/accident-history-check`;

const alt = hreflangAlternatesForLocale("/accident-history-check", "es");
const title = "Verificación del historial de accidentes por VIN — Reportes de choques";
const description =
  "Verifica el historial de accidentes de un vehículo por VIN: choques reportados, reclamos de seguros y registros de daños. Detecta daños ocultos por colisión antes de comprar.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "historial de accidentes por VIN",
    "verificación de accidentes vehículo",
    "reporte accidente auto VIN",
    "verificación historial choques",
    "consulta accidente VIN",
    "verificar auto por accidentes VIN",
    "historial de daños vehículo",
    "reporte de colisiones",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Verificación del historial de accidentes del vehículo",
  description:
    "Aprende cómo se reporta el historial de accidentes, qué aparece en un reporte de choques basado en VIN y cómo identificar daños ocultos en un auto usado.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-16",
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
    {
      "@type": "ListItem",
      position: 2,
      name: "Verificación de historial de accidentes",
      item: PAGE_URL,
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AccidentHistoryCheckBody locale="es" />
    </>
  );
}
