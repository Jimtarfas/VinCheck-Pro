import type { Metadata } from "next";
import ToolsPageBody, { TOOLS_COPY } from "@/components/ToolsPageBody";

export const metadata: Metadata = {
  title: "Free VIN Tools — Decoder, Mileage Checker & More",
  description:
    "A free hub of vehicle research tools: VIN decoder, salvage title check, stolen vehicle lookup, odometer verification, state VIN check, and an embeddable widget.",
  keywords: [
    "free vin tools",
    "free vin decoder",
    "free vin check",
    "vin lookup tools",
    "embeddable vin decoder",
    "salvage title check",
    "stolen vehicle lookup",
    "odometer verification",
    "state vin check",
    "vin glossary",
  ],
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free VIN Tools — Decoder, Mileage Checker & More",
    description:
      "Thirteen free vehicle research tools, plus an embeddable VIN decoder widget for your own site. No signup, NMVTIS-backed data.",
    url: "https://www.carcheckervin.com/tools",
    type: "website",
  },
};

const toolsSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free VIN Tools Hub",
    url: "https://www.carcheckervin.com/tools",
    description:
      "Free vehicle research tools from CarCheckerVIN: VIN decoder, salvage check, stolen lookup, odometer verification, glossary, and an embeddable widget.",
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Vehicle Tools",
    itemListElement: TOOLS_COPY.en.tools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: t.title,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: t.description,
      },
    })),
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: TOOLS_COPY.en.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolsPageBody locale="en" />
    </>
  );
}
