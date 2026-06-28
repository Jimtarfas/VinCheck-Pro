/**
 * Wave 18d — French state-to-vin. Same full English layout via the
 * shared StateToVinBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import StateToVinBody, { STATE_TO_VIN_FAQS_FR } from "@/components/StateToVinBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/state-to-vin`;
const alt = hreflangAlternatesForLocale("/state-to-vin", "fr");
const title = "Estado a VIN — Trouve un VIN par état et plaque, gratuit";
const description =
  "Estado a VIN: elige le état emisor, entre la plaque de licence et obtiens le VIN, année, marque, modèle et historique complet. Gratuit pour les 50 états + D.C.";

export const metadata: Metadata = {
  title: { absolute: `${title} | CarCheckerVIN` },
  description,
  keywords: [
    "état a VIN",
    "VIN par état",
    "trouver VIN par état et plaque",
    "plaque d état a VIN",
    "DMV plaque a VIN par état",
    "recherche plaque d état VIN",
    "recherche VIN par état",
    "plaque a VIN par état",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "website", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "fr",
  name: "Estado a VIN",
  description: "Herramienta gratuite de état a VIN. Elige le état emisor, entre la plaque de licence et récupéré instantanément le VIN, les detalles décodedeux du véhicule et un rapport complet de historique.",
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "Web Browêtre",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: STATE_TO_VIN_FAQS_FR.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Estado a VIN", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <StateToVinBody locale="fr" />
    </>
  );
}
