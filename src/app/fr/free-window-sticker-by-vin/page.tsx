import type { Metadata } from "next";
import FreeWindowStickerByVinBody, { FAQS_FR } from "@/components/FreeWindowStickerByVinBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/étiquette-monroney-gratuit-por-vin`;
const OG_IMAGE = `${SITE}/opengraph-image`;
const alt = hreflangAlternatesForLocale("/free-window-sticker-by-vin", "fr");

const title = "Étiquette de ventena gratuit par VIN — Étiquette Monroney";
const description = "Obtiens una étiquette de ventena gratuit par VIN. Entre un VIN de 17 caractères pour obtener la étiquette Monroney original — MSRP, options de usine et MPG EPA. Imprime ou enregistre como PDF.";

export const metadata: Metadata = {
  title, description,
  keywords: [
    "étiquette ventena gratuit par vin", "étiquette monroney par vin", "étiquette ventena par vin",
    "étiquette ventena par vin gratuit", "étiquette ventena Toyota par vin",
    "étiquette ventena du véhicule par vin", "étiquette ventena pour vin", "étiquette de auto par vin",
    "étiquette ventena Ford pdf télécharge gratuit", "recherche étiquette ventena gratuit",
    "étiquette Monroney par vin", "étiquette Monroney gratuit",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title, description, url: PAGE_URL, siteName: "CarCheckerVIN", type: "article", locale: "fr_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Étiquette de ventena gratuit par VIN" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr",
  name: "Étiquette de ventena gratuit par VIN", url: PAGE_URL,
  applicationCategory: "AutomotiveApplication", operatingSystem: "All",
  description: "Genétait la étiquette de ventena Monroney original de un véhicule gratuit en utilisant su VIN de 17 caractères. Récupéré MSRP base, options et packs de usine, équipement estndar et econonmía de carburant EPA, luego exporta a impression ou PDF.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article", inLanguage: "fr",
  headline: "Étiquette de ventena gratuit par VIN — Étiquette Monroney original sans frais",
  description: "Comment obtener una étiquette de ventena gratuit par VIN, que inclut la étiquette Monroney, que marques estn cubiertas et comment una étiquette VIN gratuit se compare avec rapports payedeux de Carfax et concessionnaires.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-06-09", dateModified: "2026-06-09",
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Outils", item: `${SITE}/fr/tools` },
    { "@type": "ListItem", position: 3, name: "Étiquette de ventena gratuit par VIN", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FreeWindowStickerByVinBody locale="fr" />
    </>
  );
}
