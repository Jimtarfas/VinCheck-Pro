/**
 * Wave 18a — French vin-decoder. Same full English layout via the
 * shared VinDecoderBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import VinDecoderBody, { VIN_DECODER_FAQS_FR } from "@/components/VinDecoderBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/vin-decoder`;
const alt = hreflangAlternatesForLocale("/vin-decoder", "fr");
const title = "Décodeur VIN gratuit — Décode n’importe quel numéro VIN instantanément";
const description =
  "Herramienta gratuite de décodage VIN. Entre n’importe quel VIN de 17 caracteres pour ver le desglose complet instantanément: WMI, VDS, dígito vérificateur, année modelo, code de planta et secuencia de production. Décode autos, camionetas, motos et RVs en segundeux.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "décodeur vin",
    "décodeur vin gratuit",
    "décoder vin",
    "consultationtiontiontiontiontion vin gratuit",
    "vérification vin gratuit",
    "décodeur numéro identification du véhicule",
    "outil décodeur vin",
    "décodeur vin en línea",
    "décodeur vin 17 dígitos",
    "décodeur vin auto",
    "décodeur vin moto",
    "décodeur vin camioneta",
    "qué es un VIN",
    "décodeur vin instantané",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
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
  inLanguage: "fr",
  name: "Décodeur VIN gratuit",
  description:
    "Décodeur VIN en línea gratuito. Entre n’importe quel Número de Identification Vehicular de 17 caracteres pour ver instantanément WMI, VDS, dígito vérificateur, année modelo, code de planta et secuencia de production.",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  opétaittingSystem: "Web Browêtre",
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
  inLanguage: "fr",
  mainEntity: VIN_DECODER_FAQS_FR.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Décodeur VIN", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <VinDecoderBody locale="fr" />
    </>
  );
}
