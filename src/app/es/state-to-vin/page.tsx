/**
 * Wave 18d — Spanish state-to-vin. Same full English layout via the
 * shared StateToVinBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import StateToVinBody, { STATE_TO_VIN_FAQS_ES } from "@/components/StateToVinBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/state-to-vin`;
const alt = hreflangAlternatesForLocale("/state-to-vin", "es");
const title = "Estado a VIN — Encuentra un VIN por estado y placa, gratis";
const description =
  "Estado a VIN: elige el estado emisor, ingresa la placa de licencia y obtén el VIN, año, marca, modelo e historial completo. Gratis para los 50 estados + D.C.";

export const metadata: Metadata = {
  title: { absolute: `${title} | CarCheckerVIN` },
  description,
  keywords: [
    "estado a VIN",
    "VIN por estado",
    "encontrar VIN por estado y placa",
    "placa estatal a VIN",
    "DMV placa a VIN por estado",
    "búsqueda placa estatal VIN",
    "búsqueda VIN por estado",
    "placa a VIN por estado",
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
  name: "Estado a VIN",
  description: "Herramienta gratuita de estado a VIN. Elige el estado emisor, ingresa la placa de licencia y recupera al instante el VIN, los detalles decodificados del vehículo y un reporte completo de historial.",
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
  mainEntity: STATE_TO_VIN_FAQS_ES.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Estado a VIN", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <StateToVinBody locale="es" />
    </>
  );
}
