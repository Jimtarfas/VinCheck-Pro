/**
 * Wave 18 batch 4 — Spanish build-sheet. Same full English layout via the
 * shared BuildSheetBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import BuildSheetBody, { FAQS_ES } from "@/components/BuildSheetBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/build-sheet`;
const alt = hreflangAlternatesForLocale("/build-sheet", "es");
const title = "Hoja de fabricación por VIN — Registro original de fábrica y códigos de opciones (Gratis)";
const description = "Busca la hoja de fabricación original de un vehículo por VIN — gratis. Decodifica cada código de opción, paquete, código de pintura y trim, motor y detalle de ensamblaje exactamente como el auto fue pedido y construido. Más técnica que la etiqueta de ventana.";

export const metadata: Metadata = {
  title, description,
  keywords: ["hoja de fabricación por VIN", "build sheet por VIN", "registro de fábrica", "datos de fabricación VIN", "opciones de fábrica vehículo", "cómo obtener hoja de fabricación", "búsqueda hoja de fabricación", "broadcast sheet por VIN", "códigos de opciones de fábrica", "búsqueda código RPO", "hoja de fabricación vs etiqueta de ventana", "decodificar opciones de fábrica por VIN", "hoja de fabricación gratis", "verificación matching numbers", "búsqueda VIN hoja de fabricación"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title, description: "Decodifica la hoja de fabricación de fábrica de cualquier vehículo por VIN: códigos de opciones, paquetes, códigos de pintura/trim, motor y datos de ensamblaje." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Hoja de fabricación por VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Recupera la hoja de fabricación original de un vehículo usando su VIN de 17 caracteres. Decodifica trim, códigos de pintura e interior, motor y transmisión, códigos de opciones y paquetes de fábrica, y datos de planta de ensamblaje donde existe cobertura del fabricante.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Hoja de fabricación por VIN — Registro original de fábrica", description: "Cómo buscar la hoja de fabricación original de cualquier vehículo por VIN, qué contiene, en qué se diferencia de la etiqueta de ventana, y por qué los coleccionistas y restauradores dependen de ella.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Hoja de fabricación", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BuildSheetBody locale="es" />
    </>
  );
}
