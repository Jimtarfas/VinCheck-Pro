/**
 * Wave 18 batch 3 — French rv-vin-check. Same full English layout via the
 * shared RvVinCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import RvVinCheckBody, { FAQS_FR } from "@/components/RvVinCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/rv-vin-check`;
const alt = hreflangAlternatesForLocale("/rv-vin-check", "fr");
const title = "Vérification VIN de casa rodante et motorhome — Historique gratuit (RV, remolque, camper)";
const description = "Verifica n’importe quel casa rodante, motorhome, remolque de viaje ou camper par VIN — gratuit. Obtén marques de titre, enregistrements de accidents, gravámenes et rappels antes de acheter un RV usado.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification VIN RV", "vérification VIN casa rodante", "VIN motorhome", "búsqueda VIN camper", "VIN remolque de viaje", "vérification titre RV", "VIN quinta rueda", "vérification récupération RV", "búsqueda VIN camper gratuit", "búsqueda VIN motorhome gratuit", "vérifier RV par VIN", "VIN casa rodante motorizada"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Verifica n’importe quel casa rodante, motorhome ou remolque par VIN — marques de titre, accidents, gravámenes et rappels." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Vérification VIN de casa rodante et motorhome", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Verifica n’importe quel casa rodante, motorhome, remolque de viaje ou camper van par su VIN de 17 caracteres. Devuelve état de titre respaldado par NMVTIS et marques, enregistrements de accidents, gravámenes activos, dégâts d’inondation e información de rappels.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Vérification VIN de casa rodante et motorhome", description: "Comment vérifier n’importe quel casa rodante, motorhome, remolque de viaje ou camper par VIN — incluyendo marques de titre, historique de accidents, gravámenes, rappels et la distinción châssis vs. coach única de les casas rodantes motorizadas.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Vérification VIN de casa rodante", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <RvVinCheckBody locale="fr" />
    </>
  );
}
