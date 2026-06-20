import type { Metadata } from "next";
import OBD2CodesPageBody, { OBD2_COPY } from "@/components/OBD2CodesPageBody";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Free OBD-II Code Lookup — Decode Any Check Engine Light Code",
  description:
    "Instantly decode any OBD-II / DTC trouble code. See meaning, symptoms, probable causes, severity, repair cost estimates and DIY difficulty for hundreds of codes — P0420, P0171, P0300 and more. Free, no signup.",
  keywords: [
    "obd2 code lookup", "obd ii codes", "diagnostic trouble codes", "check engine light codes",
    "p0420 code", "p0300 code", "p0171 code", "engine code lookup", "free obd2 scanner codes",
    "what does p0420 mean", "dtc lookup", "obd-ii code reader", "engine code decoder",
    "car diagnostic codes", "obd codes list", "trouble code lookup", "engine light code",
    "obd2 codes meaning", "dtc decoder", "p code lookup", "automotive diagnostic codes",
    "manufacturer specific codes", "generic obd codes", "powertrain codes", "body codes",
    "chassis codes", "network codes", "obd2 troubleshooting", "free check engine code lookup",
    "instant dtc decode",
  ],
  alternates: { canonical: "/obd2-codes" },
  openGraph: {
    title: "Free OBD-II Code Lookup — Decode Any Check Engine Light Code",
    description: "Decode any OBD-II diagnostic trouble code. Symptoms, causes, severity, DIY difficulty and repair cost — all free.",
    url: `${SITE}/obd2-codes`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free OBD-II Code Lookup — Decode Any Check Engine Light Code",
    description: "Look up any OBD-II / DTC trouble code instantly — meaning, symptoms, causes, severity and repair cost.",
  },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "OBD-II Code Lookup",
  description: "Free OBD-II diagnostic trouble code (DTC) lookup. Instantly decode any P, B, C or U code with symptoms, probable causes, severity rating, DIY difficulty and estimated repair cost.",
  url: `${SITE}/obd2-codes`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: OBD2_COPY.en.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "OBD-II Code Lookup", item: `${SITE}/obd2-codes` },
  ],
};

export default function OBD2CodesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <OBD2CodesPageBody locale="en" />
    </>
  );
}
