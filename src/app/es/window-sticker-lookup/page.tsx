import type { Metadata } from "next";
import WindowStickerLookupBody, { FAQS_ES } from "@/components/WindowStickerLookupBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/etiqueta-monroney`;
const OG_IMAGE = `${SITE}/opengraph-image`;
const alt = hreflangAlternatesForLocale("/window-sticker-lookup", "es");

const title = "Búsqueda de etiqueta de ventana por VIN — Monroney gratis";
const description = "Busca una etiqueta de ventana por VIN gratis. Ingresa un VIN de 17 caracteres para obtener la etiqueta Monroney original — MSRP, opciones de fábrica y MPG EPA. Sin tarifa Carfax.";

export const metadata: Metadata = {
  title, description,
  keywords: [
    "búsqueda etiqueta ventana", "búsqueda etiqueta monroney", "búsqueda etiqueta ventana por VIN",
    "búsqueda VIN etiqueta ventana", "buscar etiqueta por VIN", "encontrar etiqueta ventana con VIN",
    "búsqueda etiqueta ventana gratis", "búsqueda etiqueta ventana Ford", "búsqueda etiqueta ventana BMW",
    "búsqueda etiqueta ventana Chrysler", "búsqueda etiqueta Monroney Toyota", "búsqueda etiqueta ventana Mopar",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title, description, url: PAGE_URL, siteName: "CarCheckerVIN", type: "article", locale: "es_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Búsqueda de etiqueta de ventana por VIN" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es",
  name: "Búsqueda de etiqueta de ventana por VIN", url: PAGE_URL,
  applicationCategory: "AutomotiveApplication", operatingSystem: "All",
  description: "Busca la etiqueta Monroney original de un vehículo por su VIN de 17 caracteres. Recupera MSRP base, opciones y paquetes de fábrica, equipamiento estándar y economía de combustible EPA para autos, camionetas y SUV del mercado estadounidense.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article", inLanguage: "es",
  headline: "Búsqueda de etiqueta de ventana por VIN — Encuentra la etiqueta Monroney original",
  description: "Cómo buscar la etiqueta de ventana original de un vehículo por VIN, qué datos devuelve una búsqueda Monroney, cobertura marca por marca y cómo una búsqueda VIN gratis se compara con reportes pagados.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-06-09", dateModified: new Date().toISOString().slice(0, 10),
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
    { "@type": "ListItem", position: 3, name: "Búsqueda de etiqueta de ventana", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <WindowStickerLookupBody locale="es" />
    </>
  );
}
