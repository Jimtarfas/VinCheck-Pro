/**
 * Wave 18a — Spanish stolen-vehicle-check. Same full English layout via the
 * shared StolenVehicleCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import StolenVehicleCheckBody, { FAQS_ES } from "@/components/StolenVehicleCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/stolen-vehicle-check`;
const alt = hreflangAlternatesForLocale("/stolen-vehicle-check", "es");
const title = "Verificación de vehículo robado por VIN — ¿Este auto está robado? (Gratis)";
const description = "Haz una verificación de vehículo robado por VIN contra las bases de datos de robos NICB y NMVTIS. Descubre si un auto está reportado como robado, recuperación de robo o salvamento antes de comprar, en segundos.";

export const metadata: Metadata = {
  title, description,
  keywords: ["verificación vehículo robado", "este auto está robado", "verificación VIN auto robado", "verificar si auto está robado por VIN", "búsqueda vehículo robado NICB", "verificación VIN robado gratis", "reportar auto robado VIN", "búsqueda base datos autos robados", "título recuperación de robo", "verificación VIN clonado"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title, description: "Verifica un VIN contra bases de datos de robos NICB y NMVTIS antes de comprar un auto usado." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Verificación de vehículo robado por VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Verifica si un vehículo está reportado como robado por su VIN. Consulta los registros de robo y salvamento de NICB VINCheck y las marcas de título de NMVTIS de los 50 DMV estatales, mostrando indicadores activos de robo, recuperación de robo y salvamento antes de la compra.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: title, description: "Cómo verificar si un vehículo está robado usando su VIN: qué cubren las bases de datos NICB y NMVTIS, las señales de advertencia de un auto robado y qué hacer si un VIN está marcado.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: "2026-06-13" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Verificación de vehículo robado", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <StolenVehicleCheckBody locale="es" />
    </>
  );
}
