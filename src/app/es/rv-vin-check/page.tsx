/**
 * Wave 18 batch 3 — Spanish rv-vin-check. Same full English layout via the
 * shared RvVinCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import RvVinCheckBody, { FAQS_ES } from "@/components/RvVinCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/rv-vin-check`;
const alt = hreflangAlternatesForLocale("/rv-vin-check", "es");
const title = "Verificación VIN de casa rodante y motorhome — Historial gratis (RV, remolque, camper)";
const description = "Verifica cualquier casa rodante, motorhome, remolque de viaje o camper por VIN — gratis. Obtén marcas de título, registros de accidentes, gravámenes y recalls antes de comprar un RV usado.";

export const metadata: Metadata = {
  title, description,
  keywords: ["verificación VIN RV", "verificación VIN casa rodante", "VIN motorhome", "búsqueda VIN camper", "VIN remolque de viaje", "verificación título RV", "VIN quinta rueda", "verificación salvamento RV", "búsqueda VIN camper gratis", "búsqueda VIN motorhome gratis", "verificar RV por VIN", "VIN casa rodante motorizada"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title, description: "Verifica cualquier casa rodante, motorhome o remolque por VIN — marcas de título, accidentes, gravámenes y recalls." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Verificación VIN de casa rodante y motorhome", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Verifica cualquier casa rodante, motorhome, remolque de viaje o camper van por su VIN de 17 caracteres. Devuelve estado de título respaldado por NMVTIS y marcas, registros de accidentes, gravámenes activos, daño por inundación e información de recalls.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Verificación VIN de casa rodante y motorhome", description: "Cómo verificar cualquier casa rodante, motorhome, remolque de viaje o camper por VIN — incluyendo marcas de título, historial de accidentes, gravámenes, recalls y la distinción chasis vs. coach única de las casas rodantes motorizadas.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Verificación VIN de casa rodante", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <RvVinCheckBody locale="es" />
    </>
  );
}
