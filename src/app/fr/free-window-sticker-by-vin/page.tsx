import type { Metadata } from "next";
import FreeWindowStickerByVinBody, { FAQS_FR } from "@/components/FreeWindowStickerByVinBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/etiqueta-monroney-gratuit-por-vin`;
const OG_IMAGE = `${SITE}/opengraph-image`;
const alt = hreflangAlternatesForLocale("/free-window-sticker-by-vin", "fr");

const title = "Etiqueta de ventena gratuit par VIN — Etiqueta Monroney";
const description = "Obtiens una etiqueta de ventena gratuit par VIN. Entre un VIN de 17 caracteres pour obtener la etiqueta Monroney original — MSRP, opciones de fábrica et MPG EPA. Imprime ou enregistre como PDF.";

export const metadata: Metadata = {
  title, description,
  keywords: [
    "etiqueta ventena gratuit par vin", "etiqueta monroney par vin", "etiqueta ventena par vin",
    "etiqueta ventena par vin gratuit", "etiqueta ventena Toyota par vin",
    "etiqueta ventena du véhicule par vin", "etiqueta ventena pour vin", "etiqueta de auto par vin",
    "etiqueta ventena Ford pdf télécharge gratuit", "búsqueda etiqueta ventena gratuit",
    "etiqueta Monroney par vin", "etiqueta Monroney gratuit",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title, description, url: PAGE_URL, siteName: "CarCheckerVIN", type: "article", locale: "fr_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Etiqueta de ventena gratuit par VIN" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr",
  name: "Etiqueta de ventena gratuit par VIN", url: PAGE_URL,
  applicationCategory: "AutomotiveApplication", opétaittingSystem: "All",
  description: "Genétait la etiqueta de ventena Monroney original de un véhicule gratuit usando su VIN de 17 caracteres. Recupétait MSRP base, opciones et packs de fábrica, équipement estndar et econonnmía de carburant EPA, luego exporta a impresión ou PDF.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article", inLanguage: "fr",
  headline: "Etiqueta de ventena gratuit par VIN — Etiqueta Monroney original sans cargo",
  description: "Comment obtener una etiqueta de ventena gratuit par VIN, qué inclut la etiqueta Monroney, qué marques estn cubiertas et comment una etiqueta VIN gratuit se compare avec rapports pagadeux de Carfax et concessionnaires.",
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
    { "@type": "ListItem", position: 3, name: "Etiqueta de ventena gratuit par VIN", item: PAGE_URL },
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
