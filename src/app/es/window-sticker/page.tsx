import type { Metadata } from "next";
import WindowStickerBody, { FAQS_ES } from "@/components/WindowStickerBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/creador-etiqueta-monroney`;
const OG_IMAGE = `${SITE}/opengraph-image`;
const PUBLISHED = "2026-05-04";
const MODIFIED = "2026-05-07";
const alt = hreflangAlternatesForLocale("/window-sticker", "es");

const title = "Creador gratis de etiqueta de ventana — Construye y descarga una etiqueta Monroney por VIN";
const description = "Crea una etiqueta de ventana estilo Monroney gratis para cualquier auto, camioneta o SUV en menos de un minuto. Autocompleta desde VIN, edita MSRP, opciones y economía de combustible EPA, luego descarga o imprime. Funciona para Ford, Chevy, Toyota, Honda, BMW y todo vehículo del mercado estadounidense.";

export const metadata: Metadata = {
  title, description,
  keywords: [
    "creador etiqueta ventana", "creador etiqueta monroney", "generador etiqueta monroney",
    "crear etiqueta ventana", "etiqueta ventana gratis", "etiqueta ventana por VIN",
    "etiqueta monroney por VIN", "descargar etiqueta ventana", "imprimir etiqueta ventana",
    "etiqueta ventana PDF", "etiqueta ventana en línea gratis",
    "Ford etiqueta ventana", "Toyota etiqueta ventana", "Honda etiqueta ventana",
    "cómo hacer una etiqueta ventana", "qué es una etiqueta Monroney", "MSRP original por VIN",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, siteName: "CarCheckerVIN", type: "website", locale: "es_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "CarCheckerVIN Creador de etiqueta de ventana" }] },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  robots: { index: true, follow: true },
};

const webApplicationSchema = {
  "@context": "https://schema.org", "@type": ["WebApplication", "SoftwareApplication"],
  "@id": `${PAGE_URL}#tool`,
  name: "Creador de etiqueta de ventana",
  alternateName: ["Creador de etiqueta Monroney", "Generador de etiqueta de ventana"],
  url: PAGE_URL,
  applicationCategory: ["BusinessApplication", "UtilitiesApplication"],
  applicationSubCategory: "Automotive",
  operatingSystem: "Any (Web Browser)",
  inLanguage: "es",
  isAccessibleForFree: true,
  description: "Creador gratis en línea de etiqueta de ventana. Autocompleta los datos del vehículo desde un VIN de 17 caracteres, agrega opciones de fábrica y MSRP, y descarga o imprime una etiqueta estilo Monroney.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/icon.png` } },
  datePublished: PUBLISHED, dateModified: MODIFIED,
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Herramientas", item: `${SITE}/es/tools` },
    { "@type": "ListItem", position: 3, name: "Creador de etiqueta de ventana", item: PAGE_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WindowStickerBody locale="es" />
    </>
  );
}
