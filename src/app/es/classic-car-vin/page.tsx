/**
 * Wave 18.18 batch 3 — Spanish /es/classic-car-vin wrapper.
 * Replaces the prior SpecialtyToolPage stub; full layout via shared body.
 */

import type { Metadata } from "next";
import ClassicCarVinBody, { FAQS_ES } from "@/components/ClassicCarVinBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/classic-car-vin`;
const alt = hreflangAlternatesForLocale("/classic-car-vin", "es");
const title = "Decodificador VIN de auto clásico — Búsqueda de vehículos anteriores a 1981 (Gratis)";
const description = "Decodifica VINs de autos clásicos y vintage anteriores a 1981 gratis. Entiende los formatos VIN de GM, Ford, Chrysler y AMC, verifica números coincidentes y documenta especificaciones originales de fábrica antes de comprar.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["decodificador VIN auto clásico", "VIN auto vintage", "decodificación VIN anterior a 1981", "búsqueda VIN auto antiguo", "VIN vehículo antiguo", "verificación VIN números coincidentes"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title, description: "Decodifica VINs de autos clásicos y vintage anteriores a 1981. Entiende los formatos GM, Ford, Chrysler y AMC y verifica números coincidentes." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Decodificador VIN de auto clásico", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Decodifica un vehículo clásico o vintage por su VIN. Entiende los formatos de fabricantes anteriores a 1981 de GM, Ford, Chrysler y AMC, y verifica la autenticidad de números coincidentes.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Decodificador VIN de auto clásico — Identificación de vehículos anteriores a 1981", description: "Cómo decodificar VINs de autos clásicos y vintage anteriores a 1981, incluyendo formatos específicos por fabricante de GM, Ford, Chrysler y AMC, y cómo verificar la autenticidad de números coincidentes.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "VIN auto clásico", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ClassicCarVinBody locale="es" />
    </>
  );
}
