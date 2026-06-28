import type { Metadata } from "next";
import VinCheckHubBody, { FAQS_EN } from "@/components/VinCheckHubBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/vin-check`;
const alt = hreflangAlternatesForLocale("/vin-check", "en");

export const metadata: Metadata = {
  title: {
    absolute: "Free VIN Check by Make — Decode Any Vehicle",
  },
  description:
    "Free VIN check and decoder for every car brand. Look up any make and model and get instant vehicle history, specs, recalls, and market data.",
  keywords: [
    "VIN check", "VIN decoder", "free VIN check", "VIN lookup", "vehicle history report",
    "car VIN check", "check VIN number", "VIN number lookup", "decode VIN",
    "vehicle identification number", "car history check",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Free VIN Check by Make — Every Brand Covered",
    description:
      "Free VIN check and decoder for every car brand. Look up any make and model and get instant vehicle history, specs, recalls, and market data.",
    type: "website",
    url: PAGE_URL,
    siteName: "CarCheckerVIN",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en",
  mainEntity: FAQS_EN.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function VinCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <VinCheckHubBody locale="en" />
    </>
  );
}
