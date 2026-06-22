/**
 * Wave 18a — Spanish recall-check. Same full English layout via the
 * shared RecallCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import RecallCheckBody, { FAQS_ES } from "@/components/RecallCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/recall-check`;
const alt = hreflangAlternatesForLocale("/recall-check", "es");
const title = "Verificación VIN de recalls — Búsqueda de recalls de seguridad NHTSA abiertos";
const description = "Verifica cualquier VIN por recalls de seguridad NHTSA abiertos. Mira el componente afectado, número de campaña, resumen del defecto, riesgo de seguridad y la reparación gratuita del concesionario antes de comprar. Vista previa gratuita, sin registro, resultados en segundos.";

export const metadata: Metadata = {
  title, description,
  keywords: ["verificación VIN recall", "búsqueda recall NHTSA", "recall abierto por VIN", "verificación recall seguridad", "búsqueda recall vehículo", "recall auto VIN", "verificación recall bolsa aire Takata", "mi auto tiene recall"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title, description: "Mira recalls de seguridad NHTSA abiertos para cualquier VIN: componente afectado, número de campaña, defecto, riesgo y la reparación gratuita del concesionario." },
  robots: { index: true, follow: true },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: title, description: "Guía para verificar un vehículo por recalls de seguridad NHTSA abiertos por VIN. Cubre cómo funciona la coincidencia de recalls a nivel VIN, recalls abiertos versus completados, la campaña Takata, la reparación gratuita del concesionario y cómo leer un reporte de recalls antes de comprar.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-14" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Verificación de recalls", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <RecallCheckBody locale="es" />
    </>
  );
}
