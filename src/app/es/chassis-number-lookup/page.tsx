/**
 * Wave 18.19 — Spanish chassis-number-lookup. Same full English layout via
 * the shared ChassisNumberLookupBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import ChassisNumberLookupBody, { FAQS_ES } from "@/components/ChassisNumberLookupBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/chassis-number-lookup`;
const alt = hreflangAlternatesForLocale("/chassis-number-lookup", "es");
const title = "Búsqueda número de chasis — Decodifica cualquier número de chasis (VIN) gratis y encuentra el tipo de auto";
const description = "Busca un auto por número de chasis gratis. Un número de chasis es el mismo VIN de 17 caracteres — decodifícalo para encontrar el tipo de auto, marca, modelo, año, motor e historial completo. Funciona para vehículos en todo el mundo. Sin registro.";

export const metadata: Metadata = {
  title, description,
  keywords: ["búsqueda número de chasis", "buscar auto por número de chasis", "encontrar vehículo por número de chasis", "buscador de número de chasis", "verificar mi número de chasis", "encontrar mi número de chasis", "buscar tipo de auto por vin", "verificación número de chasis", "decodificar número de chasis", "búsqueda decodificador VIN", "decodificador VIN gratis en línea", "mejor decodificador VIN gratis", "verificar un auto gratis", "qué es un número de chasis", "número de chasis vs vin", "búsqueda número de bastidor de auto", "búsqueda número de chasis de vehículo"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Búsqueda número de chasis — Decodifica cualquier número de chasis (VIN) gratis", description: "Tu número de chasis es tu VIN. Decodifícalo gratis para encontrar el tipo de auto, especificaciones e historial. Funciona para vehículos mundialmente — instantáneo, sin registro.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title: "Búsqueda número de chasis — Decodifica cualquier número de chasis (VIN) gratis", description: "Un número de chasis es lo mismo que un VIN. Decodifícalo gratis para encontrar el tipo de auto, especificaciones e historial completo. Instantáneo, mundial." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Búsqueda número de chasis", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Herramienta gratis para decodificar cualquier número de chasis (VIN) y encontrar el tipo de auto, marca, modelo, año, motor e historial vehicular completo. Funciona para vehículos en todo el mundo.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Búsqueda número de chasis", description: "Aprende cómo buscar un auto por número de chasis, qué significa cada segmento del código de 17 caracteres, dónde encontrarlo por país y cómo detectar banderas rojas antes de comprar.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Búsqueda número de chasis", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ChassisNumberLookupBody locale="es" />
    </>
  );
}
