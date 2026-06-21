/**
 * Wave 18a — Spanish vin-decoder. Same full English layout via the
 * shared VinDecoderBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import VinDecoderBody, { VIN_DECODER_FAQS_ES } from "@/components/VinDecoderBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/vin-decoder`;
const alt = hreflangAlternatesForLocale("/vin-decoder", "es");
const title = "Decodificador VIN gratis — Decodifica cualquier número VIN al instante";
const description =
  "Herramienta gratuita de decodificación VIN. Ingresa cualquier VIN de 17 caracteres para ver el desglose completo al instante: WMI, VDS, dígito verificador, año modelo, código de planta y secuencia de producción. Decodifica autos, camionetas, motocicletas y RVs en segundos.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "decodificador vin",
    "decodificador vin gratis",
    "decodificar vin",
    "consulta vin gratis",
    "verificación vin gratis",
    "decodificador número identificación vehicular",
    "herramienta decodificador vin",
    "decodificador vin en línea",
    "decodificador vin 17 dígitos",
    "decodificador vin auto",
    "decodificador vin motocicleta",
    "decodificador vin camioneta",
    "qué es un VIN",
    "decodificador vin instantáneo",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "es",
  name: "Decodificador VIN gratis",
  description:
    "Decodificador VIN en línea gratuito. Ingresa cualquier Número de Identificación Vehicular de 17 caracteres para ver al instante WMI, VDS, dígito verificador, año modelo, código de planta y secuencia de producción.",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: VIN_DECODER_FAQS_ES.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Decodificador VIN", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <VinDecoderBody locale="es" />
    </>
  );
}
