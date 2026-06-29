/**
 * Wave 18 batch 3 — Spanish /fleet-check. Same full layout as English via
 * the shared FleetCheckBody. Replaces the prior SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import FleetCheckBody, { FAQS_ES } from "@/components/FleetCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/fleet-check`;
const alt = hreflangAlternatesForLocale("/fleet-check", "es");
const title = "Verificación de flota y ex-patrulla por VIN — Historial de uso comercial (Gratis)";
const description = "Verifica el historial de flota comercial de cualquier vehículo por VIN — gratis. Encuentra ex-patrullas, vehículos de flota gubernamental, historial de taxi y propiedad de flota corporativa desde NMVTIS y los 50 registros DMV estatales, antes de comprar.";

export const metadata: Metadata = {
  title, description,
  keywords: ["verificación flota VIN", "verificación ex-patrulla", "vehículo de flota anterior", "historial uso comercial VIN", "verificación vehículo gubernamental", "verificación VIN patrulla", "historial VIN auto de renta", "verificación flota corporativa", "historial taxi por VIN", "búsqueda propiedad vehículo de flota", "este auto es ex-patrulla", "cadena título flota VIN"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title, description: "Verificación gratis basada en VIN del historial de propiedad de flota policial, gubernamental, de renta, taxi y corporativa desde NMVTIS y los 50 DMV estatales." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Verificación de flota y ex-patrulla por VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Verifica el historial de flota comercial de un vehículo por su VIN de 17 caracteres. Muestra propiedad de flota policial, gubernamental, de renta, taxi y corporativa desde NMVTIS y los 50 registros DMV estatales de cadena de título.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Verificación de flota y ex-patrulla por VIN", description: "Aprende cómo verificar el historial de flota comercial por VIN, incluyendo ex-patrullas, vehículos gubernamentales y registros de flota de alto uso.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Verificación de flota", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FleetCheckBody locale="es" />
    </>
  );
}
