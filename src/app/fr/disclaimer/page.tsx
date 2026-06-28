/**
 * Wave 18 batch 4 — /fr/disclaimer. Slim wrapper around the shared
 * DisclaimerBody. French strings come from COPY.es inside the body.
 *
 * The English version of this NMVTIS disclosure remains the legal
 * canonical under US federal law; the ES page surfaces an amber
 * banner pointing buyers back to /disclaimer for full legal certainty.
 */

import type { Metadata } from "next";
import DisclaimerBody from "@/components/DisclaimerBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternatesForLocale("/disclaimer", "fr");

export const metadata: Metadata = {
  title: "Mentions légales NMVTIS",
  description:
    "Aviso du Sistema Nacional de Información de Titrois de Vehículos Motorizadeux (NMVTIS) requerido federalmente pour les rapports de historique de véhicule de CarCheckerVIN.",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Mentions légales NMVTIS",
    description:
      "Aviso NMVTIS requerido federalmente pour les rapports de historique de véhicule de CarCheckerVIN.",
    url: `${SITE}/fr/disclaimer`,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "fr",
  name: "Mentions légales NMVTIS",
  url: `${SITE}/fr/disclaimer`,
  description:
    "Aviso NMVTIS requerido federalmente pour les rapports de historique de véhicule de CarCheckerVIN.",
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
      <DisclaimerBody locale="fr" />
    </>
  );
}
