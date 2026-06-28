/**
 * Wave 18 batch 4 — Spanish paint-code-finder. Same full English layout via
 * the shared PaintCodeFinderBody. Replaces the earlier SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import PaintCodeFinderBody, { FAQS_ES } from "@/components/PaintCodeFinderBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/buscar-codigo-pintura`;
const alt = hreflangAlternatesForLocale("/paint-code-finder", "es");
const title = "Buscador de código de pintura — Encuentra el código de color de cualquier auto por VIN, marca y nombre del color (gratis)";
const description = "Encuentra rápido el código de pintura de tu auto. Busca por VIN, navega por marca o coincide un nombre de color de fábrica con su código exacto. Directorio gratuito de códigos OEM reales para más de 30 marcas — para pintura de retoque, coincidencia en taller de carrocería y verificación de repintados.";

export const metadata: Metadata = {
  title, description,
  keywords: ["buscador código pintura", "encontrar código pintura", "buscador código color auto", "encontrar mi código pintura", "código pintura por nombre color", "nombre color a código pintura", "búsqueda nombre color fábrica", "encontrar color pintura auto", "buscador pintura retoque", "pintura retoque por código color", "encontrar código pintura por VIN", "buscador código color OEM", "de qué color es mi auto", "código color pintura auto", "encontrar color pintura fábrica", "código pintura por marca", "buscador código color Toyota", "buscador código color Honda", "buscador color pintura Ford", "buscador código color Chevy"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US", images: [{ url: `${SITE}/paint-code-finder/opengraph-image` }] },
  twitter: { card: "summary_large_image", title, description: "Encuentra el código de pintura exacto de un auto por VIN, marca o nombre del color. Directorio OEM gratis, más de 30 marcas.", images: [`${SITE}/paint-code-finder/opengraph-image`] },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Buscador de código de pintura", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Encuentra el código de pintura de fábrica de cualquier vehículo de tres formas: por VIN, navegando por fabricante o haciendo coincidir un nombre de color de fábrica con su código OEM exacto. Cubre más de 30 marcas.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Buscador de código de pintura — Encuentra el código de color de cualquier auto", description: "Tres formas de encontrar el código de pintura de fábrica de un vehículo: por VIN, por marca o coincidiendo un nombre de color de fábrica con su código OEM exacto.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Buscador de código de pintura", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PaintCodeFinderBody locale="es" />
    </>
  );
}
