/**
 * Wave 18a — Spanish hail-damage-check. Same full English layout via the
 * shared HailDamageCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import HailDamageCheckBody, { FAQS_ES } from "@/components/HailDamageCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/hail-damage-check`;
const alt = hreflangAlternatesForLocale("/hail-damage-check", "es");
const title = "Verificación de daños por granizo por VIN — Detecta daños por tormenta antes de comprar";
const description =
  "Verifica cualquier vehículo por historial de daños por granizo usando el VIN. Encuentra registros de daños por tormenta, reclamos de seguros y títulos marcados por granizo que pueden afectar el valor de reventa y la integridad estructural.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "verificación daños granizo VIN",
    "historial daños tormenta vehículo",
    "verificación granizo auto VIN",
    "título marcado por granizo",
    "reclamo seguro daños granizo",
    "auto dañado por tormenta",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Verificación de daños por granizo por VIN",
  description:
    "Aprende a verificar cualquier vehículo por historial de daños por granizo usando el VIN, incluyendo registros de daños por tormenta, reclamos de seguros y marcas en el título por granizo.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-04",
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
    { "@type": "ListItem", position: 2, name: "Verificación de daños por granizo", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HailDamageCheckBody locale="es" />
    </>
  );
}
