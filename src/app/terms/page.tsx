/**
 * Wave 18 batch 4 — /terms. Slim wrapper around the shared
 * TermsBody so EN and ES render the identical layout with only
 * the strings swapped.
 */

import type { Metadata } from "next";
import TermsBody from "@/components/TermsBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternates("/terms");

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "CarCheckerVIN terms of service. Review the terms and conditions for using our vehicle history report platform.",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Terms of Service",
    description:
      "CarCheckerVIN terms of service. Review the terms and conditions for using our vehicle history report platform.",
    url: `${SITE}/terms`,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "en_US",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "en",
  name: "Terms of Service",
  url: `${SITE}/terms`,
  description:
    "CarCheckerVIN terms of service. Review the terms and conditions for using our vehicle history report platform.",
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
      <TermsBody locale="en" />
    </>
  );
}
