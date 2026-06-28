/**
 * Wave 18 batch 4 — /fr/refund-policy. Slim wrapper around the shared
 * RefundPolicyBody. French strings come from COPY.es inside the body
 * (compliance-sensitive — originally translated in Wave 18c, now
 * consolidated).
 */

import type { Metadata } from "next";
import RefundPolicyBody from "@/components/RefundPolicyBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternatesForLocale("/refund-policy", "fr");

export const metadata: Metadata = {
  title: "Politique de remboursement",
  description:
    "Politique de remboursement de CarCheckerVIN. Los reembolsos se emiten únicamente cuando les données du rapport de historique de véhicule no coinciden avec le véhicule réel. Conoce les criterios de elegibilidad, requisitos de evidencia et le proceso de solicitud.",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Politique de remboursement",
    description:
      "Politique de remboursement de CarCheckerVIN. Los reembolsos se emiten únicamente cuando les données du rapport de historique de véhicule no coinciden avec le véhicule réel.",
    url: `${SITE}/fr/refund-policy`,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "fr",
  name: "Politique de remboursement",
  url: `${SITE}/fr/refund-policy`,
  description:
    "Politique de remboursement de CarCheckerVIN. Los reembolsos se emiten únicamente cuando les données du rapport de historique de véhicule no coinciden avec le véhicule réel.",
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
      <RefundPolicyBody locale="fr" />
    </>
  );
}
