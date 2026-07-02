/**
 * Wave 18 batch 4 — /privacy. Slim wrapper around the shared
 * PrivacyBody so EN and ES render the identical layout with only
 * the strings swapped.
 */

import type { Metadata } from "next";
import PrivacyBody from "@/components/PrivacyBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternates("/privacy");

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "CarCheckerVIN privacy policy. Learn how Coconut Ventures LLC collects, uses, and protects your personal information.",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Privacy Policy",
    description:
      "CarCheckerVIN privacy policy. Learn how Coconut Ventures LLC collects, uses, and protects your personal information.",
    url: `${SITE}/privacy`,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "en_US",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "en",
  name: "Privacy Policy",
  url: `${SITE}/privacy`,
  description:
    "CarCheckerVIN privacy policy. Learn how Coconut Ventures LLC collects, uses, and protects your personal information.",
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
      <PrivacyBody locale="en" />
    </>
  );
}
