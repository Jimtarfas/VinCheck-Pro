/**
 * Wave 18d — Spanish impound-check. Same full English layout via the
 * shared ImpoundCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import ImpoundCheckBody, { FAQS_ES } from "@/components/ImpoundCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/impound-check`;
const alt = hreflangAlternatesForLocale("/impound-check", "es");
const title = "Verificación de historial de incautación y embargo por VIN — Registros de gravámenes y recuperación";
const description =
  "Verifica cualquier vehículo por historial de incautación, recuperación y gravámenes usando el VIN. Encuentra gravámenes activos, recuperaciones pasadas y registros de incautación que podrían complicar la transferencia de propiedad.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "verificación incautación VIN",
    "verificación historial embargo",
    "verificación gravamen por VIN",
    "historial recuperación VIN",
    "registros incautación vehículo",
    "verificación VIN gravamen activo",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Verificación de historial de incautación y embargo por VIN",
  description: "Aprende a verificar cualquier vehículo por historial de incautación, recuperación y gravámenes usando el VIN para protegerte contra complicaciones en la transferencia de propiedad.",
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
  mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Verificación de incautación", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ImpoundCheckBody locale="es" />
    </>
  );
}
