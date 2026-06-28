/**
 * Wave 18 batch 3 — French semi-truck-vin-lookup. Same full English layout via
 * the shared SemiTruckVinLookupBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import SemiTruckVinLookupBody, { FAQS_FR } from "@/components/SemiTruckVinLookupBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/semi-truck-vin-lookup`;
const alt = hreflangAlternatesForLocale("/semi-truck-vin-lookup", "fr");
const title = "Recherche VIN de camion semirremolque — Décodeur gratuit (Freightliner, Peterbilt, Kenworth)";
const description = "Décode n’importe quel tractor Freightliner, Peterbilt, Kenworth, Volvo ou Mack — plus semirremolques — al année, moteur, Clase GVWR et planta. Gratuit.";

export const metadata: Metadata = {
  title, description,
  keywords: ["recherche VIN camion semirremolque", "recherche VIN semi", "recherche VIN Freightliner", "recherche VIN Peterbilt", "recherche VIN semirremolque", "recherche VIN tractor remolque", "recherche VIN remolque gratuit", "recherche VIN camion semirremolque gratuit", "recherche VIN Kenworth", "recherche VIN camion Volvo", "recherche VIN camion Mack", "décodeur VIN camion lourd", "recherche VIN camion comercial", "recherche VIN 18 roues"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US", images: [{ url: `${SITE}/semi-truck-vin-lookup/opengraph-image`, width: 1200, height: 630, alt: "Recherche VIN de camion semirremolque — décode n’importe quel VIN de tractor ou remolque gratuit" }] },
  twitter: { card: "summary_large_image", title, description: "Décode n’importe quel VIN de tractor semi ou remolque gratuit — année, moteur, GVWR et planta. Chaque constructor Clase 8. Instantané.", images: [`${SITE}/semi-truck-vin-lookup/opengraph-image`] },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Recherche VIN de camion semirremolque", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Herramienta gratuit pour décoder n’importe quel VIN de camion semirremolque ou remolque — Freightliner, Peterbilt, Kenworth, Volvo, Mack, International — pour trouver la marque, année modèle, moteur, Clase GVWR et planta de ensamblaje.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Recherche VIN de camion semirremolque", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SemiTruckVinLookupBody locale="fr" />
    </>
  );
}
