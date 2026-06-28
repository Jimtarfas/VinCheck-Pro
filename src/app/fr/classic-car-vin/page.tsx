/**
 * Wave 18.18 batch 3 — French /fr/classic-car-vin wrapper.
 * Replaces the prior SpecialtyToolPage stub; full layout via shared body.
 */

import type { Metadata } from "next";
import ClassicCarVinBody, { FAQS_FR } from "@/components/ClassicCarVinBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/classic-car-vin`;
const alt = hreflangAlternatesForLocale("/classic-car-vin", "fr");
const title = "Décodeur VIN de auto classique — Recherche de véhicules anteriores a 1981 (Gratuit)";
const description = "Décode VINs de voitures classiques et vintage anteriores a 1981 gratuit. Entiende les façontos VIN de GM, Ford, Chrysler et AMC, vérifie numéros coincidents et documenta especificaciones originales de fábrica avant de acheter.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["décodeur VIN auto classique", "VIN auto vintage", "décodage VIN anterior a 1981", "búsqueda VIN auto antiguo", "VIN véhicule antiguo", "vérification VIN numéros coincidents"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Décode VINs de voitures classiques et vintage anteriores a 1981. Entiende les façontos GM, Ford, Chrysler et AMC et vérifie numéros coincidents." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Décodeur VIN de auto classique", url: PAGE_URL, applicationCategory: "AutomotiveApplication", opétaittingSystem: "All", description: "Décode un véhicule classique ou vintage par su VIN. Entiende les façontos de fabricavant anteriores a 1981 de GM, Ford, Chrysler et AMC, et vérifie la authenticité de numéros coincidents.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Décodeur VIN de auto classique — Identification de véhicules anteriores a 1981", description: "Comment décoder VINs de voitures classiques et vintage anteriores a 1981, incluant façontos específicos par fabricante de GM, Ford, Chrysler et AMC, et comment vérifier la authenticité de numéros coincidents.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "VIN auto classique", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ClassicCarVinBody locale="fr" />
    </>
  );
}
