/**
 * Wave 18 batch 4 — /es/privacy. Slim wrapper around the shared
 * PrivacyBody. Spanish strings come from COPY.es inside the body
 * (originally translated in Wave 18c, now consolidated).
 */

import type { Metadata } from "next";
import PrivacyBody from "@/components/PrivacyBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternatesForLocale("/privacy", "es");

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Política de privacidad de CarCheckerVIN. Conoce cómo recopilamos, usamos y protegemos tu información personal.",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Política de privacidad",
    description:
      "Política de privacidad de CarCheckerVIN. Conoce cómo recopilamos, usamos y protegemos tu información personal.",
    url: `${SITE}/es/privacy`,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "es",
  name: "Política de privacidad",
  url: `${SITE}/es/privacy`,
  description:
    "Política de privacidad de CarCheckerVIN. Conoce cómo recopilamos, usamos y protegemos tu información personal.",
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
      <PrivacyBody locale="es" />
    </>
  );
}
