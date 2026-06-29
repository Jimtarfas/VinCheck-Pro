/**
 * Wave 18 batch 4 — Spanish paint-code-lookup. Same full English layout via
 * the shared PaintCodeLookupBody. Replaces the earlier t()-based stub.
 */

import type { Metadata } from "next";
import PaintCodeLookupBody, { FAQS_ES } from "@/components/PaintCodeLookupBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/codigo-de-pintura`;
const alt = hreflangAlternatesForLocale("/paint-code-lookup", "es");
const title = "Búsqueda del código de pintura por VIN — Encuentra el código de color de fábrica de tu auto (gratis, más de 30 marcas)";
const description = "Encuentra tu código de pintura OEM exacto por VIN. Localizador interactivo del código de pintura para más de 30 marcas — ubicaciones de la etiqueta del marco de la puerta, formatos de código, ejemplos reales de colores de fábrica y coincidencia de pintura de retoque. 100% gratis.";

export const metadata: Metadata = {
  title, description,
  keywords: ["búsqueda código pintura", "búsqueda código pintura por VIN", "código pintura auto por VIN", "código pintura OEM", "código pintura fábrica", "búsqueda código color", "código color vehículo", "buscador código pintura VIN", "encontrar código pintura auto", "código pintura retoque", "código pintura taller carrocería", "código pintura Toyota", "código pintura Honda", "código pintura Ford", "código pintura Chevrolet", "código pintura BMW", "código pintura Mercedes", "código pintura Subaru", "código pintura Nissan", "código pintura Mazda", "código pintura Hyundai", "código pintura Kia", "código pintura Tesla", "código pintura Volkswagen", "código pintura Audi", "código color por VIN", "dónde está mi código pintura", "código pintura marco puerta", "buscador código color OEM", "búsqueda nombre color fábrica"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title, description: "Encuentra el código de pintura de fábrica de cualquier vehículo. Herramienta interactiva para más de 30 marcas. Gratis, instantánea." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Búsqueda del código de pintura por VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Herramienta interactiva para encontrar el código de pintura de fábrica de cualquier vehículo por VIN o por fabricante. Cubre más de 30 marcas con ubicaciones de etiqueta, formatos de código y códigos reales de ejemplo.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Búsqueda del código de pintura por VIN — Encuentra tu color de fábrica", description: "Localizador interactivo del código de pintura para más de 30 marcas y una búsqueda basada en VIN que devuelve el código OEM exacto desde la base de datos de fabricación.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Búsqueda del código de pintura", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PaintCodeLookupBody locale="es" />
    </>
  );
}
