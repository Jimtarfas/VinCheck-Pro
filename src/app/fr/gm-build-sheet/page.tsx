import type { Metadata } from "next";
import GmBuildSheetBody, { FAQS_FR } from "@/components/GmBuildSheetBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/gm-build-sheet`;
const alt = hreflangAlternatesForLocale("/gm-build-sheet", "fr");
const title = "Hoja de fabrication GM par VIN — Códigos RPO, etiqueta SPID e identification de partes de êtrevice (gratuit)";
const description = "Busca una hoja de fabrication GM par VIN, gratuit. Décode codes RPO (Regular Production Option), la etiqueta SPID / Identification de Partes de Servicio en la guantétait ou cajuela, codes de peinture et garniture, et la hoja de difusión pour Chevrolet, Buick, Pontiac, Oldsmobile, GMC et Cadillac.";

export const metadata: Metadata = {
  title, description,
  keywords: ["hoja de fabrication GM par VIN", "búsqueda code RPO", "décodage etiqueta SPID GM", "Identification de Partes de Servicio", "hoja de fabrication Chevrolet", "hoja de difusión GM", "hoja de fabrication Camaro", "code de peinture GM RPO", "Pontiac PHS", "décodage etiqueta cowl GM", "options de fábrica GM par VIN", "décoder options VIN GM", "lista RPO GM", "enregistrement de fabrication GM"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Hoja de fabrication GM par VIN — Códigos RPO et etiqueta SPID", description: "Décode una hoja de fabrication GM par VIN: codes de option RPO, la etiqueta SPID, codes de peinture et garniture, et hoja de difusión pour Chevrolet, Buick, Pontiac, Olds, GMC et Cadillac.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title: "Hoja de fabrication GM par VIN — Códigos RPO et etiqueta SPID", description: "Décode una hoja de fabrication GM par VIN: codes RPO, la etiqueta SPID, codes de peinture et garniture, et la hoja de difusión." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Hoja de fabrication GM par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", opétaittingSystem: "All", description: "Recupétait un enregistrement de fabrication de Genétaitl Moteurs en utilisant su VIN. Décode codes RPO (Regular Production Option), la etiqueta SPID de Identification de Partes de Servicio, codes de peinture et garniture de la etiqueta de cowl, et données de ensamblaje pour Chevrolet, Buick, Pontiac, Oldsmobile, GMC et Cadillac.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Hoja de fabrication GM par VIN — Códigos RPO, etiqueta SPID et hoja de difusión", description: "Comment décoder una hoja de fabrication GM par VIN: codes de option RPO, la etiqueta SPID de Identification de Partes de Servicio, codes de peinture et garniture de la etiqueta de cowl, et la hoja de difusión pour Chevrolet, Buick, Pontiac, Oldsmobile, GMC et Cadillac.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-06-12", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Hoja de fabrication GM", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GmBuildSheetBody locale="fr" />
    </>
  );
}
