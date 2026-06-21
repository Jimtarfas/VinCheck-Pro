/**
 * Wave 18d — Spanish marketplace-vin-check index page.
 * Replaces the Wave 15 SpecialtyToolPage stub with the full English
 * layout rendered via the shared MarketplaceIndexBody component.
 */

import type { Metadata } from "next";
import MarketplaceIndexBody, { MARKETPLACE_INDEX_FAQS_ES } from "@/components/MarketplaceIndexBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/marketplace-vin-check`;
const alt = hreflangAlternatesForLocale("/marketplace-vin-check", "es");
const title = "Verificación VIN de marketplace — Verifica antes de comprar";
const description =
  "Haz una verificación VIN antes de comprar en cualquier marketplace en línea. Verifica vehículos listados en Facebook Marketplace, Craigslist, eBay Motors, Copart y más con un reporte completo de historial vehicular.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "verificación VIN marketplace",
    "verificación VIN Facebook Marketplace",
    "verificación VIN Craigslist",
    "verificación VIN eBay Motors",
    "verificación VIN Copart",
    "historial vehicular marketplace en línea",
    "verificación VIN auto usado",
    "verificación VIN vendedor privado",
    "verificación VIN subasta",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "website", siteName: "CarCheckerVIN", locale: "es_US" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: MARKETPLACE_INDEX_FAQS_ES.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Verificación VIN de marketplace", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MarketplaceIndexBody locale="es" />
    </>
  );
}
