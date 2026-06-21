/**
 * Wave 18d — Spanish plate-to-vin. Same full English layout via the
 * shared PlateToVinBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import PlateToVinBody, { PLATE_TO_VIN_FAQS_ES } from "@/components/PlateToVinBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/plate-to-vin`;
const alt = hreflangAlternatesForLocale("/plate-to-vin", "es");
const title = "Placa a VIN — Convierte cualquier placa estadounidense en un VIN gratis";
const description =
  "Placa a VIN: ingresa una placa y estado para obtener al instante el VIN de 17 caracteres, año, marca, modelo e historial completo del vehículo. Gratis, los 50 estados.";

export const metadata: Metadata = {
  title: { absolute: `${title} | CarCheckerVIN` },
  description,
  keywords: [
    "placa a VIN",
    "búsqueda placa a VIN",
    "placa de licencia a VIN",
    "convertir placa a VIN",
    "placa a VIN gratis",
    "número de placa a VIN",
    "obtener VIN desde placa",
    "encontrar VIN por placa",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "website", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "es",
  name: "Placa a VIN",
  description: "Herramienta gratuita de placa a VIN. Ingresa cualquier número de placa estadounidense y estado para recuperar al instante el VIN, los detalles decodificados del vehículo y un reporte completo de historial.",
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: PLATE_TO_VIN_FAQS_ES.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Placa a VIN", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PlateToVinBody locale="es" />
    </>
  );
}
