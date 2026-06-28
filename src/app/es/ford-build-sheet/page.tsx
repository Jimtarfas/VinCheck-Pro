/**
 * Wave 18 batch 4 — Spanish ford-build-sheet. Same full English layout via the
 * shared FordBuildSheetBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import FordBuildSheetBody, { FAQS_ES } from "@/components/FordBuildSheetBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/ford-build-sheet`;
const alt = hreflangAlternatesForLocale("/ford-build-sheet", "es");
const title = "Hoja de fabricación Ford por VIN — Placa de datos, DSO y códigos del Marti Report (Gratis)";
const description = "Busca una hoja de fabricación Ford, Lincoln o Mercury por VIN, gratis. Decodifica la placa de datos de la puerta, código de distrito DSO, tags de eje y transmisión, códigos de pintura y trim, y aprende cómo el Marti Report reconstruye el pedido original de fábrica para vehículos Ford de 1967 en adelante.";

export const metadata: Metadata = {
  title, description,
  keywords: ["hoja de fabricación Ford por VIN", "decodificar placa de datos puerta Ford", "código DSO Ford", "Marti Report", "decodificar placa de garantía Ford", "hoja de fabricación Mustang", "código pintura y trim Ford", "código eje Ford", "hoja de fabricación Lincoln Mercury", "decodificador VIN Ford", "opciones de fábrica Ford por VIN", "buck tag Ford rotunda", "decodificar opciones VIN Ford", "registro de fabricación Ford"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title, description: "Decodifica una hoja de fabricación Ford por VIN: placa de datos de puerta, DSO, códigos de eje/transmisión, pintura y trim, y el Marti Report." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Hoja de fabricación Ford por VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Recupera un registro de fabricación Ford, Lincoln o Mercury usando su VIN. Decodifica la placa de datos de la puerta, código de distrito DSO, tags de eje y transmisión, códigos de pintura y trim, y datos de planta de ensamblaje, y explica cómo el Marti Report reconstruye el pedido original de fábrica.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Hoja de fabricación Ford por VIN — Placa de datos, DSO y Marti Report", description: "Cómo leer una hoja de fabricación Ford por VIN: la placa de datos de la puerta, código de distrito DSO, códigos de eje y transmisión, pintura y trim, y el Marti Report que reconstruye el pedido original de fábrica para vehículos Ford de 1967 en adelante.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-06-12", dateModified: "2026-06-12" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Hoja de fabricación Ford", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FordBuildSheetBody locale="es" />
    </>
  );
}
