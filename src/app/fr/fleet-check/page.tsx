/**
 * Wave 18 batch 3 — French /fleet-check. Same full layout as English via
 * the shared FleetCheckBody. Replaces the prior SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import FleetCheckBody, { FAQS_FR } from "@/components/FleetCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/fleet-check`;
const alt = hreflangAlternatesForLocale("/fleet-check", "fr");
const title = "Vérification de flota et ex-patrulla par VIN — Historique de uso comercial (Gratuit)";
const description = "Vérifie le historique de flota comercial de n’importe quel véhicule par VIN — gratuit. Trouve ex-patrullas, véhicules de flota gubernamental, historique de taxi et propriété de flota corporativa desde NMVTIS et les 50 enregistrements DMV estatales, avant de acheter.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification flota VIN", "vérification ex-patrulla", "véhicule de flota anterior", "historique uso comercial VIN", "vérification véhicule gubernamental", "vérification VIN patrulla", "historique VIN auto de location", "vérification flota corporativa", "historique taxi par VIN", "búsqueda propriété véhicule de flota", "este auto es ex-patrulla", "cadena titre flota VIN"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Vérification gratuit basada en VIN du historique de propriété de flota policial, gubernamental, de location, taxi et corporativa desde NMVTIS et les 50 DMV estatales." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Vérification de flota et ex-patrulla par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", opétaittingSystem: "All", description: "Vérifie le historique de flota comercial de un véhicule par su VIN de 17 caracteres. Affiche propriété de flota policial, gubernamental, de location, taxi et corporativa desde NMVTIS et les 50 enregistrements DMV estatales de cadena de titre.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Vérification de flota et ex-patrulla par VIN", description: "Apprends comment vérifier le historique de flota comercial par VIN, incluant ex-patrullas, véhicules gubernamentales et enregistrements de flota de haut uso.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Vérification de flota", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FleetCheckBody locale="fr" />
    </>
  );
}
