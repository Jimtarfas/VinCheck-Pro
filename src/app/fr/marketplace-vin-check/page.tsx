/**
 * Wave 18d — French marketplace-vin-check index page.
 * Replaces the Wave 15 SpecialtyToolPage stub with the full English
 * layout rendered via the shared MarketplaceIndexBody component.
 */

import type { Metadata } from "next";
import MarketplaceIndexBody, { MARKETPLACE_INDEX_FAQS_FR } from "@/components/MarketplaceIndexBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/marketplace-vin-check`;
const alt = hreflangAlternatesForLocale("/marketplace-vin-check", "fr");
const title = "Vérification VIN de marketplace — Vérifie avant de acheter";
const description =
  "Haz una vérification VIN avant de acheter en n’importe quel marketplace en línea. Vérifie véhicules listadeux en Facebook Marketplace, Craigslist, eBay Moteurs, Copart et plus avec un rapport complet de historique de véhicule.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "vérification VIN marketplace",
    "vérification VIN Facebook Marketplace",
    "vérification VIN Craigslist",
    "vérification VIN eBay Moteurs",
    "vérification VIN Copart",
    "historique de véhicule marketplace en línea",
    "vérification VIN voiture d’occasion",
    "vérification VIN vendeur privado",
    "vérification VIN enchère",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "website", siteName: "CarCheckerVIN", locale: "fr_US" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: MARKETPLACE_INDEX_FAQS_FR.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Vérification VIN de marketplace", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MarketplaceIndexBody locale="fr" />
    </>
  );
}
