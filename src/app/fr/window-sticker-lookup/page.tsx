import type { Metadata } from "next";
import WindowStickerLookupBody, { FAQS_FR } from "@/components/WindowStickerLookupBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/étiquette-monroney`;
const OG_IMAGE = `${SITE}/opengraph-image`;
const alt = hreflangAlternatesForLocale("/window-sticker-lookup", "fr");

const title = "Recherche de étiquette de ventena par VIN — Monroney gratuit";
const description = "Busca una étiquette de ventena par VIN gratuit. Entre un VIN de 17 caractères pour obtener la étiquette Monroney original — MSRP, options de usine et MPG EPA. Sin tarifa Carfax.";

export const metadata: Metadata = {
  title, description,
  keywords: [
    "recherche étiquette ventena", "recherche étiquette monroney", "recherche étiquette ventena par VIN",
    "recherche VIN étiquette ventena", "buscar étiquette par VIN", "trouver étiquette ventena avec VIN",
    "recherche étiquette ventena gratuit", "recherche étiquette ventena Ford", "recherche étiquette ventena BMW",
    "recherche étiquette ventena Chrysler", "recherche étiquette Monroney Toyota", "recherche étiquette ventena Mopar",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title, description, url: PAGE_URL, siteName: "CarCheckerVIN", type: "article", locale: "fr_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Recherche de étiquette de ventena par VIN" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr",
  name: "Recherche de étiquette de ventena par VIN", url: PAGE_URL,
  applicationCategory: "AutomotiveApplication", operatingSystem: "All",
  description: "Busca la étiquette Monroney original de un véhicule par su VIN de 17 caractères. Récupéré MSRP base, options et packs de usine, équipement estndar et econonmía de carburant EPA pour autos, camionetas et SUV du marché étatunidense.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article", inLanguage: "fr",
  headline: "Recherche de étiquette de ventena par VIN — Trouve la étiquette Monroney original",
  description: "Comment buscar la étiquette de ventena original de un véhicule par VIN, que données devuelve una recherche Monroney, couverture marque par marque et comment una recherche VIN gratuit se compare avec rapports payedeux.",
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
    { "@type": "ListItem", position: 3, name: "Recherche de étiquette de ventena", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <WindowStickerLookupBody locale="fr" />
    </>
  );
}
