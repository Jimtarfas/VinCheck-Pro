/**
 * Wave 18a — Spanish salvage-title-check. Same full English layout via the
 * shared SalvageTitleCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import SalvageTitleCheckBody, { FAQS_ES } from "@/components/SalvageTitleCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/salvage-title-check`;
const alt = hreflangAlternatesForLocale("/salvage-title-check", "es");
const title = "Verificación de título de salvamento por VIN — Búsqueda de título reconstruido y marcado (Verificación NMVTIS gratis)";
const description = "Verifica marcas de título de salvamento, reconstruido, inundación, chatarra y limón por VIN — gratis. Cruza NMVTIS y los 50 registros de DMV estatales para mostrar títulos marcados que el lavado de título intenta ocultar, antes de comprar.";

export const metadata: Metadata = {
  title, description,
  keywords: ["verificación título salvamento", "VIN título salvamento", "verificación título reconstruido", "verificación título marcado", "verificación título inundación VIN", "búsqueda título chatarra", "búsqueda VIN título salvamento gratis", "verificar título salvamento por VIN", "verificación salvamento NMVTIS", "verificación lavado título", "el título está limpio", "título reconstituido VIN"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title, description: "Búsqueda gratis de salvamento y título marcado basada en VIN a través de NMVTIS y los 50 registros DMV estatales. Derrota el lavado de título." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Verificación de título de salvamento por VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Verifica el historial de marca de título de un vehículo por su VIN de 17 caracteres. Cruza NMVTIS, archivos de marca de título de DMV estatales y feeds de pérdida total de aseguradoras para mostrar marcas de salvamento, reconstruido, inundación, chatarra y limón — incluso cuando el título físico ha sido lavado limpio.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Verificación de título de salvamento por VIN", description: "Aprende qué significan los títulos de salvamento y marcados, cómo identificarlos, los riesgos reales de comprar uno y cómo una verificación VIN derrota el lavado de título.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Verificación título salvamento", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SalvageTitleCheckBody locale="es" />
    </>
  );
}
