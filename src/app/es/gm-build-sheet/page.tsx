import type { Metadata } from "next";
import GmBuildSheetBody, { FAQS_ES } from "@/components/GmBuildSheetBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/gm-build-sheet`;
const alt = hreflangAlternatesForLocale("/gm-build-sheet", "es");
const title = "Hoja de fabricación GM por VIN — Códigos RPO, etiqueta SPID e identificación de partes de servicio (gratis)";
const description = "Busca una hoja de fabricación GM por VIN, gratis. Decodifica códigos RPO (Regular Production Option), la etiqueta SPID / Identificación de Partes de Servicio en la guantera o cajuela, códigos de pintura y tapicería, y la hoja de difusión para Chevrolet, Buick, Pontiac, Oldsmobile, GMC y Cadillac.";

export const metadata: Metadata = {
  title, description,
  keywords: ["hoja de fabricación GM por VIN", "búsqueda código RPO", "decodificación etiqueta SPID GM", "Identificación de Partes de Servicio", "hoja de fabricación Chevrolet", "hoja de difusión GM", "hoja de fabricación Camaro", "código de pintura GM RPO", "Pontiac PHS", "decodificación etiqueta cowl GM", "opciones de fábrica GM por VIN", "decodificar opciones VIN GM", "lista RPO GM", "registro de fabricación GM"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Hoja de fabricación GM por VIN — Códigos RPO y etiqueta SPID", description: "Decodifica una hoja de fabricación GM por VIN: códigos de opción RPO, la etiqueta SPID, códigos de pintura y tapicería, y hoja de difusión para Chevrolet, Buick, Pontiac, Olds, GMC y Cadillac.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title: "Hoja de fabricación GM por VIN — Códigos RPO y etiqueta SPID", description: "Decodifica una hoja de fabricación GM por VIN: códigos RPO, la etiqueta SPID, códigos de pintura y tapicería, y la hoja de difusión." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Hoja de fabricación GM por VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Recupera un registro de fabricación de General Motors usando su VIN. Decodifica códigos RPO (Regular Production Option), la etiqueta SPID de Identificación de Partes de Servicio, códigos de pintura y tapicería de la etiqueta de cowl, y datos de ensamblaje para Chevrolet, Buick, Pontiac, Oldsmobile, GMC y Cadillac.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Hoja de fabricación GM por VIN — Códigos RPO, etiqueta SPID y hoja de difusión", description: "Cómo decodificar una hoja de fabricación GM por VIN: códigos de opción RPO, la etiqueta SPID de Identificación de Partes de Servicio, códigos de pintura y tapicería de la etiqueta de cowl, y la hoja de difusión para Chevrolet, Buick, Pontiac, Oldsmobile, GMC y Cadillac.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-06-12", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Hoja de fabricación GM", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GmBuildSheetBody locale="es" />
    </>
  );
}
