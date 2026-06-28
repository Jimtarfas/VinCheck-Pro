/**
 * Wave 18 batch 4 — /es/refund-policy. Slim wrapper around the shared
 * RefundPolicyBody. Spanish strings come from COPY.es inside the body
 * (compliance-sensitive — originally translated in Wave 18c, now
 * consolidated).
 */

import type { Metadata } from "next";
import RefundPolicyBody from "@/components/RefundPolicyBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternatesForLocale("/refund-policy", "es");

export const metadata: Metadata = {
  title: "Política de reembolsos",
  description:
    "Política de reembolsos de CarCheckerVIN. Los reembolsos se emiten únicamente cuando los datos del reporte de historial vehicular no coinciden con el vehículo real. Conoce los criterios de elegibilidad, requisitos de evidencia y el proceso de solicitud.",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Política de reembolsos",
    description:
      "Política de reembolsos de CarCheckerVIN. Los reembolsos se emiten únicamente cuando los datos del reporte de historial vehicular no coinciden con el vehículo real.",
    url: `${SITE}/es/refund-policy`,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "es",
  name: "Política de reembolsos",
  url: `${SITE}/es/refund-policy`,
  description:
    "Política de reembolsos de CarCheckerVIN. Los reembolsos se emiten únicamente cuando los datos del reporte de historial vehicular no coinciden con el vehículo real.",
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

export default function RefundPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <RefundPolicyBody locale="es" />
    </>
  );
}
