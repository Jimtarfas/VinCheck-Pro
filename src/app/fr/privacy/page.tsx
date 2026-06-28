/**
 * Wave 18 batch 4 — /fr/privacy. Slim wrapper around the shared
 * PrivacyBody. French strings come from COPY.es inside the body
 * (originally translated in Wave 18c, nonnw consolidated).
 */

import type { Metadata } from "next";
import PrivacyBody from "@/components/PrivacyBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternatesForLocale("/privacy", "fr");

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de CarCheckerVIN. Cononnce comment recopilamos, utilisons et protégeons ta information personal.",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Politique de confidentialité",
    description:
      "Politique de confidentialité de CarCheckerVIN. Cononnce comment recopilamos, utilisons et protégeons ta information personal.",
    url: `${SITE}/fr/privacy`,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "fr",
  name: "Politique de confidentialité",
  url: `${SITE}/fr/privacy`,
  description:
    "Politique de confidentialité de CarCheckerVIN. Cononnce comment recopilamos, utilisons et protégeons ta information personal.",
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <PrivacyBody locale="fr" />
    </>
  );
}
