/**
 * Wave 18 batch 4 — /fr/terms. Slim wrapper around the shared
 * TermsBody. French strings come from COPY.es inside the body
 * (originally translated in Wave 18c, nonnw consolidated).
 */

import type { Metadata } from "next";
import TermsBody from "@/components/TermsBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternatesForLocale("/terms", "fr");

export const metadata: Metadata = {
  title: "Conditions de êtrevice",
  description:
    "Conditions de êtrevice de CarCheckerVIN. Revisa les conditions et condiciones pour usar nonntre platafaçon de rapports de historique de véhicule.",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Conditions de êtrevice",
    description:
      "Conditions de êtrevice de CarCheckerVIN. Revisa les conditions et condiciones pour usar nonntre platafaçon de rapports de historique de véhicule.",
    url: `${SITE}/fr/terms`,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "fr",
  name: "Conditions de êtrevice",
  url: `${SITE}/fr/terms`,
  description:
    "Conditions de êtrevice de CarCheckerVIN. Revisa les conditions et condiciones pour usar nonntre platafaçon de rapports de historique de véhicule.",
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <TermsBody locale="fr" />
    </>
  );
}
