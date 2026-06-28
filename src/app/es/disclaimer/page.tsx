/**
 * Wave 18 batch 4 — /es/disclaimer. Slim wrapper around the shared
 * DisclaimerBody. Spanish strings come from COPY.es inside the body.
 *
 * The English version of this NMVTIS disclosure remains the legal
 * canonical under US federal law; the ES page surfaces an amber
 * banner pointing buyers back to /disclaimer for full legal certainty.
 */

import type { Metadata } from "next";
import DisclaimerBody from "@/components/DisclaimerBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternatesForLocale("/disclaimer", "es");

export const metadata: Metadata = {
  title: "Aviso legal NMVTIS",
  description:
    "Aviso del Sistema Nacional de Información de Títulos de Vehículos Motorizados (NMVTIS) requerido federalmente para los reportes de historial vehicular de CarCheckerVIN.",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Aviso legal NMVTIS",
    description:
      "Aviso NMVTIS requerido federalmente para los reportes de historial vehicular de CarCheckerVIN.",
    url: `${SITE}/es/disclaimer`,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "es",
  name: "Aviso legal NMVTIS",
  url: `${SITE}/es/disclaimer`,
  description:
    "Aviso NMVTIS requerido federalmente para los reportes de historial vehicular de CarCheckerVIN.",
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

export default function DisclaimerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <DisclaimerBody locale="es" />
    </>
  );
}
