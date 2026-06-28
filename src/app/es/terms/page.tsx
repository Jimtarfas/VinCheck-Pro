/**
 * Wave 18 batch 4 — /es/terms. Slim wrapper around the shared
 * TermsBody. Spanish strings come from COPY.es inside the body
 * (originally translated in Wave 18c, now consolidated).
 */

import type { Metadata } from "next";
import TermsBody from "@/components/TermsBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternatesForLocale("/terms", "es");

export const metadata: Metadata = {
  title: "Términos de servicio",
  description:
    "Términos de servicio de CarCheckerVIN. Revisa los términos y condiciones para usar nuestra plataforma de reportes de historial vehicular.",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Términos de servicio",
    description:
      "Términos de servicio de CarCheckerVIN. Revisa los términos y condiciones para usar nuestra plataforma de reportes de historial vehicular.",
    url: `${SITE}/es/terms`,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "es",
  name: "Términos de servicio",
  url: `${SITE}/es/terms`,
  description:
    "Términos de servicio de CarCheckerVIN. Revisa los términos y condiciones para usar nuestra plataforma de reportes de historial vehicular.",
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
      <TermsBody locale="es" />
    </>
  );
}
