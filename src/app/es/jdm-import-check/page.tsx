/**
 * Wave 18.18 batch 3 — Spanish /es/jdm-import-check wrapper.
 * Replaces the prior SpecialtyToolPage stub; full layout via shared body.
 */

import type { Metadata } from "next";
import JdmImportCheckBody, { FAQS_ES } from "@/components/JdmImportCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/jdm-import-check`;
const alt = hreflangAlternatesForLocale("/jdm-import-check", "es");
const title = "Verificación VIN de importación JDM — Historial vehículos importados de Japón (Gratis)";
const description = "Verifica el historial de cualquier importación del Mercado Doméstico Japonés (JDM). Verifica kilometraje (km a millas), códigos de chasis vs VINs de 17 caracteres, hojas de subasta japonesas, la regla de los 25 años y el cumplimiento de importación de EE. UU. antes de comprar.";

export const metadata: Metadata = {
  title, description,
  keywords: ["verificación importación JDM", "verificación VIN auto japonés", "decodificador VIN JDM", "historial vehículo importado", "verificación kilometraje JDM", "cumplimiento importación japonesa", "regla importación 25 años", "código chasis JDM", "hoja subasta japonesa", "verificación importación Skyline GT-R", "verificación VIN Supra", "certificado exportación JDM"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Verificación VIN de importación JDM — Historial vehículos importados de Japón", description: "Verifica el historial de cualquier importación JDM: kilometraje en km vs millas, códigos de chasis, hojas de subasta, la regla de los 25 años y estado de cumplimiento en EE. UU.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title: "Verificación VIN de importación JDM — Historial vehículos importados de Japón", description: "Verifica el kilometraje, código de chasis, hoja de subasta, elegibilidad de 25 años y cumplimiento de EE. UU. de una importación JDM antes de comprar." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Verificación VIN de importación JDM", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Verifica el historial de un vehículo de importación del Mercado Doméstico Japonés. Verifica kilometraje (kilómetros a millas), códigos de chasis japoneses contra el VIN de EE. UU. de 17 caracteres, grados de condición de hoja de subasta, certificados de exportación y desregistro, la regla de importación de 25 años y el cumplimiento de registro en EE. UU.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Verificación VIN de importación JDM — Historial vehículos importados de Japón", description: "Cómo verificar el historial de vehículos de importación del Mercado Doméstico Japonés: verificación de kilometraje en kilómetros, códigos de chasis versus el VIN de 17 caracteres, hojas de subasta japonesas, la regla de importación de 25 años y estado de cumplimiento en EE. UU.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Verificación importación JDM", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <JdmImportCheckBody locale="es" />
    </>
  );
}
