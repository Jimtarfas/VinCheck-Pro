/**
 * Wave 18a — Spanish odometer-check. Same full English layout via the
 * shared OdometerCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import OdometerCheckBody, { FAQS_ES } from "@/components/OdometerCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/odometer-check`;
const alt = hreflangAlternatesForLocale("/odometer-check", "es");
const title = "Verificación de odómetro y kilometraje por VIN — Detecta fraude de rollback (búsqueda NMVTIS gratis)";
const description = "Verifica el historial de kilometraje de un vehículo por VIN — gratis. Compara cada lectura de odómetro reportada en NMVTIS, transferencias de título e inspecciones para detectar rollback y fraude de odómetro antes de comprar.";

export const metadata: Metadata = {
  title, description,
  keywords: ["verificación rollback odómetro", "verificación kilometraje VIN", "verificación fraude odómetro", "historial kilometraje vehículo", "verificación odómetro por VIN", "búsqueda kilometraje VIN", "historial lectura odómetro", "detección rollback VIN", "marca kilometraje no real", "verificación kilometraje gratis"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title, description: "Historial de kilometraje gratis basado en VIN. Compara cada lectura de odómetro reportada en NMVTIS para atrapar fraude de rollback." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Verificación de odómetro y kilometraje por VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Verifica el historial de kilometraje de un vehículo por su VIN de 17 caracteres. Ensambla cada lectura de odómetro reportada de NMVTIS, transferencias de título, inspecciones estatales y eventos de servicio en una línea de tiempo con fecha para que el rollback y el fraude de odómetro destaquen.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Verificación de odómetro y kilometraje por VIN", description: "Aprende cómo funciona el fraude de odómetro, cómo una verificación VIN detecta rollback, qué señales físicas buscar y qué hacer si detectas una discrepancia.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Verificación de odómetro", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <OdometerCheckBody locale="es" />
    </>
  );
}
