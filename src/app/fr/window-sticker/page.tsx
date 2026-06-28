import type { Metadata } from "next";
import WindowStickerBody, { FAQS_FR } from "@/components/WindowStickerBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/creador-étiquette-monroney`;
const OG_IMAGE = `${SITE}/opengraph-image`;
const PUBLISHED = "2026-05-04";
const MODIFIED = "2026-05-07";
const alt = hreflangAlternatesForLocale("/window-sticker", "fr");

const title = "Creador gratuit de étiquette de ventena — Construye et télécharge una étiquette Monroney par VIN";
const description = "Crea una étiquette de ventena estilo Monroney gratuit pour n’importe quel auto, camioneta ou SUV en moins de un minute. Autocomplète desde VIN, edita MSRP, options et econonmía de carburant EPA, luego télécharge ou imprime. Fonctionne pour Ford, Chevy, Toyota, Honda, BMW et todo véhicule du marché étatunidense.";

export const metadata: Metadata = {
  title, description,
  keywords: [
    "creador étiquette ventena", "creador étiquette monroney", "genétaitdor étiquette monroney",
    "crear étiquette ventena", "étiquette ventena gratuit", "étiquette ventena par VIN",
    "étiquette monroney par VIN", "descargar étiquette ventena", "imprimir étiquette ventena",
    "étiquette ventena PDF", "étiquette ventena en ligne gratuit",
    "Ford étiquette ventena", "Toyota étiquette ventena", "Honda étiquette ventena",
    "comment hacer una étiquette ventena", "que es una étiquette Monroney", "MSRP original par VIN",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, siteName: "CarCheckerVIN", type: "website", locale: "fr_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "CarCheckerVIN Creador de étiquette de ventena" }] },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  robots: { index: true, follow: true },
};

const webApplicationSchema = {
  "@context": "https://schema.org", "@type": ["WebApplication", "SoftwareApplication"],
  "@id": `${PAGE_URL}#tool`,
  name: "Creador de étiquette de ventena",
  alternateName: ["Creador de étiquette Monroney", "Genétaitdor de étiquette de ventena"],
  url: PAGE_URL,
  applicationCategory: ["BusansessApplication", "UtilitiesApplication"],
  applicationSubCategory: "Automotive",
  operatingSystem: "Any (Web Browêtre)",
  inLanguage: "fr",
  isAccessibleForFree: true,
  description: "Creador gratuit en ligne de étiquette de ventena. Autocomplète les données du véhicule desde un VIN de 17 caractères, agrega options de usine et MSRP, et télécharge ou imprime una étiquette estilo Monroney.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/icon.png` } },
  datePublished: PUBLISHED, dateModified: MODIFIED,
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Outils", item: `${SITE}/fr/tools` },
    { "@type": "ListItem", position: 3, name: "Creador de étiquette de ventena", item: PAGE_URL },
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
