import type { Metadata } from "next";
import FreeWindowStickerByVinBody, { FAQS_ES } from "@/components/FreeWindowStickerByVinBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/etiqueta-monroney-gratis-por-vin`;
const OG_IMAGE = `${SITE}/opengraph-image`;
const alt = hreflangAlternatesForLocale("/free-window-sticker-by-vin", "es");

const title = "Etiqueta de ventana gratis por VIN — Etiqueta Monroney";
const description = "Obtén una etiqueta de ventana gratis por VIN. Ingresa un VIN de 17 caracteres para obtener la etiqueta Monroney original — MSRP, opciones de fábrica y MPG EPA. Imprime o guarda como PDF.";

export const metadata: Metadata = {
  title, description,
  keywords: [
    "etiqueta ventana gratis por vin", "etiqueta monroney por vin", "etiqueta ventana por vin",
    "etiqueta ventana por vin gratis", "etiqueta ventana Toyota por vin",
    "etiqueta ventana del vehículo por vin", "etiqueta ventana para vin", "etiqueta de auto por vin",
    "etiqueta ventana Ford pdf descarga gratis", "búsqueda etiqueta ventana gratis",
    "etiqueta Monroney por vin", "etiqueta Monroney gratis",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title, description, url: PAGE_URL, siteName: "CarCheckerVIN", type: "article", locale: "es_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Etiqueta de ventana gratis por VIN" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es",
  name: "Etiqueta de ventana gratis por VIN", url: PAGE_URL,
  applicationCategory: "AutomotiveApplication", operatingSystem: "All",
  description: "Genera la etiqueta de ventana Monroney original de un vehículo gratis usando su VIN de 17 caracteres. Recupera MSRP base, opciones y paquetes de fábrica, equipamiento estándar y economía de combustible EPA, luego exporta a impresión o PDF.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article", inLanguage: "es",
  headline: "Etiqueta de ventana gratis por VIN — Etiqueta Monroney original sin cargo",
  description: "Cómo obtener una etiqueta de ventana gratis por VIN, qué incluye la etiqueta Monroney, qué marcas están cubiertas y cómo una etiqueta VIN gratis se compara con reportes pagados de Carfax y concesionarios.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-06-09", dateModified: "2026-06-09",
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Herramientas", item: `${SITE}/es/tools` },
    { "@type": "ListItem", position: 3, name: "Etiqueta de ventana gratis por VIN", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FreeWindowStickerByVinBody locale="es" />
    </>
  );
}
