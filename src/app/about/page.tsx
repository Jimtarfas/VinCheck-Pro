import type { Metadata } from "next";
import AboutPageBody, { ABOUT_COPY } from "@/components/AboutPageBody";

export const metadata: Metadata = {
  title: "About — Trusted Vehicle History Reports",
  description:
    "Meet the team behind CarCheckerVIN. We source NMVTIS, NICB, and manufacturer data to deliver accurate, affordable vehicle history reports buyers trust.",
  keywords: [
    "about vincheck pro",
    "about carcheckervin",
    "who we are",
    "vin check company",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About CarCheckerVIN — Trusted Vehicle History Reports",
    description:
      "Our mission, our data sources, and the team behind CarCheckerVIN's accurate, affordable VIN reports.",
    url: "https://www.carcheckervin.com/about",
    type: "article",
  },
};

const aboutSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
    logo: "https://www.carcheckervin.com/logo.png",
    description:
      "CarCheckerVIN provides instant, affordable vehicle history reports powered by NMVTIS, NICB, and manufacturer data sources.",
    foundingDate: "2025",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+15642123985",
      contactType: "customer support",
      email: "contact@carcheckervin.com",
      areaServed: "US",
      availableLanguage: ["English", "Spanish"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About CarCheckerVIN",
    url: "https://www.carcheckervin.com/about",
    description:
      "About CarCheckerVIN: our mission, data sources, editorial standards, and the team behind our vehicle history reports.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ABOUT_COPY.en.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AboutPageBody locale="en" />
    </>
  );
}
