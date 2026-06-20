import type { Metadata } from "next";
import TrustPageBody, { TRUST_COPY } from "@/components/TrustPageBody";

export const metadata: Metadata = {
  title: "Trust & Security — How We Protect Your Data",
  description:
    "Learn how CarCheckerVIN sources vehicle data from NMVTIS, NICB, and OEM APIs, encrypts every transaction, and protects your privacy under GDPR and CCPA.",
  keywords: [
    "carcheckervin trust",
    "vin check security",
    "nmvtis data privacy",
    "vehicle history data sources",
    "ccpa gdpr vin check",
  ],
  alternates: { canonical: "/trust" },
  openGraph: {
    title: "Trust & Security at CarCheckerVIN",
    description:
      "Authoritative data sources, end-to-end encryption, transparent privacy practices, and a 100% money-back guarantee.",
    url: "https://www.carcheckervin.com/trust",
    type: "article",
  },
};

const trustSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Trust & Security — How We Protect Your Data",
    url: "https://www.carcheckervin.com/trust",
    description:
      "How CarCheckerVIN sources, secures, and stewards the data behind every vehicle history report.",
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
    logo: "https://www.carcheckervin.com/logo.png",
    description:
      "Affordable, accurate vehicle history reports backed by NMVTIS, NICB, and manufacturer data sources.",
    sameAs: ["https://www.carcheckervin.com/about"],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: TRUST_COPY.en.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function TrustPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(trustSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <TrustPageBody locale="en" />
    </>
  );
}
