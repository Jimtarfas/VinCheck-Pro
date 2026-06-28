/**
 * Wave 18 batch 4 — /refund-policy. Slim wrapper around the shared
 * RefundPolicyBody so EN and ES render the identical layout with only
 * the strings swapped.
 */

import type { Metadata } from "next";
import RefundPolicyBody from "@/components/RefundPolicyBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternates("/refund-policy");

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "CarCheckerVIN refund policy. Refunds are issued only when the vehicle history report data does not match the actual vehicle. Read the eligibility criteria, evidence requirements, and request process.",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Refund Policy",
    description:
      "CarCheckerVIN refund policy. Refunds are issued only when the vehicle history report data does not match the actual vehicle.",
    url: `${SITE}/refund-policy`,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "en_US",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "en",
  name: "Refund Policy",
  url: `${SITE}/refund-policy`,
  description:
    "CarCheckerVIN refund policy. Refunds are issued only when the vehicle history report data does not match the actual vehicle.",
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
      <RefundPolicyBody locale="en" />
    </>
  );
}
