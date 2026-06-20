import type { Metadata } from "next";
import PressPageBody, { PRESS_COPY } from "@/components/PressPageBody";

export const metadata: Metadata = {
  title: "Press Kit & Media Resources",
  description:
    "CarCheckerVIN press kit: company facts, brand assets, spokespeople, recent announcements, and direct contact for media inquiries.",
  keywords: [
    "carcheckervin press kit",
    "vincheck pro media",
    "vehicle history report press",
    "carcheckervin logo download",
    "carcheckervin spokespeople",
    "vin check media kit",
    "press inquiries automotive",
  ],
  alternates: { canonical: "/press" },
  openGraph: {
    title: "Press Kit & Media Resources",
    description:
      "Quick facts, brand assets, spokespeople, and press contact for CarCheckerVIN — the affordable vehicle history report platform.",
    url: "https://www.carcheckervin.com/press",
    type: "website",
  },
};

const pressSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "CarCheckerVIN Press Kit",
    url: "https://www.carcheckervin.com/press",
    description:
      "Press kit and media resources for CarCheckerVIN, including brand assets, spokespeople, and announcement timeline.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
    logo: "https://www.carcheckervin.com/logo.svg",
    foundingDate: "2025",
    description:
      "CarCheckerVIN provides instant, affordable vehicle history reports powered by NMVTIS, NICB, and manufacturer data sources.",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+15642123985",
        email: "contact@carcheckervin.com",
        contactType: "press",
        areaServed: "US",
        availableLanguage: ["English", "Spanish"],
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRESS_COPY.en.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PressPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pressSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PressPageBody locale="en" />
    </>
  );
}
