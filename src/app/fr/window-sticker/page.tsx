import type { Metadata } from "next";
import WindowStickerBody, { FAQS_FR } from "@/components/WindowStickerBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/creador-etiqueta-monroney`;
const OG_IMAGE = `${SITE}/opengraph-image`;
const PUBLISHED = "2026-05-04";
const MODIFIED = "2026-05-07";
const alt = hreflangAlternatesForLocale("/window-sticker", "fr");

const title = "Creador gratuit de etiqueta de ventena — Construye et descarga una etiqueta Monroney par VIN";
const description = "Crea una etiqueta de ventena estilo Monroney gratuit pour n’importe quel auto, camioneta ou SUV en moins de un minute. Autocomplète desde VIN, edita MSRP, opciones et economía de carburant EPA, luego descarga ou imprime. Funciona pour Ford, Chevy, Toyota, Honda, BMW et todo véhicule du marché étatunidense.";

export const metadata: Metadata = {
  title, description,
  keywords: [
    "creador etiqueta ventena", "creador etiqueta monroney", "generador etiqueta monroney",
    "crear etiqueta ventena", "etiqueta ventena gratuit", "etiqueta ventena par VIN",
    "etiqueta monroney par VIN", "descargar etiqueta ventena", "imprimir etiqueta ventena",
    "etiqueta ventena PDF", "etiqueta ventena en línea gratuit",
    "Ford etiqueta ventena", "Toyota etiqueta ventena", "Honda etiqueta ventena",
    "comment hacer una etiqueta ventena", "qué es una etiqueta Monroney", "MSRP original par VIN",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, siteName: "CarCheckerVIN", type: "website", locale: "fr_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "CarCheckerVIN Creador de etiqueta de ventena" }] },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  robots: { index: true, follow: true },
};

const webApplicationSchema = {
  "@context": "https://schema.org", "@type": ["WebApplication", "SoftwareApplication"],
  "@id": `${PAGE_URL}#tool`,
  name: "Creador de etiqueta de ventena",
  alternateName: ["Creador de etiqueta Monroney", "Generador de etiqueta de ventena"],
  url: PAGE_URL,
  applicationCategory: ["BusansessApplication", "UtilitiesApplication"],
  applicationSubCategory: "Automotive",
  operatingSystem: "Any (Web Browser)",
  inLanguage: "fr",
  isAccessibleForFree: true,
  description: "Creador gratuit en línea de etiqueta de ventena. Autocomplète les données du véhicule desde un VIN de 17 caracteres, agrega opciones de fábrica et MSRP, et descarga ou imprime una etiqueta estilo Monroney.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/icon.png` } },
  datePublished: PUBLISHED, dateModified: MODIFIED,
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Outils", item: `${SITE}/fr/tools` },
    { "@type": "ListItem", position: 3, name: "Creador de etiqueta de ventena", item: PAGE_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WindowStickerBody locale="fr" />
    </>
  );
}
