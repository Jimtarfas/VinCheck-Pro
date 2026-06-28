/**
 * Wave 18.19 — French chassis-number-lookup. Same full English layout via
 * the shared ChassisNumberLookupBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import ChassisNumberLookupBody, { FAQS_FR } from "@/components/ChassisNumberLookupBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/chassis-number-lookup`;
const alt = hreflangAlternatesForLocale("/chassis-number-lookup", "fr");
const title = "Recherche numéro de châssis — Décode n’importe quel numéro de châssis (VIN) gratuit et trouve le tipo de auto";
const description = "Busca un auto par numéro de châssis gratuit. Un numéro de châssis es le même VIN de 17 caracteres — decodifícalo pour trouver le tipo de auto, marque, modelo, année, moteur et historique complet. Fonctionne pour véhicules en todo le monde. Sin enregistrement.";

export const metadata: Metadata = {
  title, description,
  keywords: ["búsqueda numéro de châssis", "buscar auto par numéro de châssis", "trouver véhicule par numéro de châssis", "buscador de numéro de châssis", "vérifier mi numéro de châssis", "trouver mi numéro de châssis", "buscar tipo de auto par vin", "vérification numéro de châssis", "décoder numéro de châssis", "búsqueda décodeur VIN", "décodeur VIN gratuit en línea", "meilleur décodeur VIN gratuit", "vérifier un auto gratuit", "que es un numéro de châssis", "numéro de châssis vs vin", "búsqueda numéro de bastidor de auto", "búsqueda numéro de châssis de véhicule"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Recherche numéro de châssis — Décode n’importe quel numéro de châssis (VIN) gratuit", description: "Tu numéro de châssis es ta VIN. Decodifícalo gratuit pour trouver le tipo de auto, especificaciones e historique. Fonctionne pour véhicules mundialmente — instantané, sans inscription.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title: "Recherche numéro de châssis — Décode n’importe quel numéro de châssis (VIN) gratuit", description: "Un numéro de châssis es le même que un VIN. Decodifícalo gratuit pour trouver le tipo de auto, especificaciones et historique complet. Instantané, mundial." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Recherche numéro de châssis", url: PAGE_URL, applicationCategory: "AutomotiveApplication", opétaittingSystem: "All", description: "Herramienta gratuit pour décoder n’importe quel numéro de châssis (VIN) et trouver le tipo de auto, marque, modelo, année, moteur et historique de véhicule complet. Fonctionne pour véhicules en todo le monde.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Recherche numéro de châssis", description: "Apprends comment buscar un auto par numéro de châssis, que significa cada segmento du code de 17 caracteres, où trouverlo par país et comment detectar bandétaits rojas avant de acheter.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Recherche numéro de châssis", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ChassisNumberLookupBody locale="fr" />
    </>
  );
}
