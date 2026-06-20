import type { Metadata } from "next";
import DealersPageBody, { DEALERS_COPY } from "@/components/DealersPageBody";

export const metadata: Metadata = {
  title: "Dealer VIN API & Wholesale Reports — From $1",
  description:
    "Wholesale VIN check pricing from $1/report. REST API, bulk lookups, and white-label vehicle history reports for auto dealers, auctions, and BHPH lots.",
  keywords: [
    "dealer VIN check", "wholesale VIN reports", "VIN check API", "bulk VIN reports",
    "dealer Carfax alternative", "auto auction VIN lookup", "BHPH dealer reports",
  ],
  alternates: { canonical: "/dealers" },
  openGraph: {
    title: "Dealer VIN API & Wholesale Reports — From $1",
    description: "Save $20,000+/year on vehicle history reports. Wholesale VIN pricing, REST API, bulk uploads, and white-label reports for auto dealers and auctions.",
    url: "https://www.carcheckervin.com/dealers",
    type: "website",
  },
};

const dealersSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Vehicle History Report API for Dealers",
    name: "CarCheckerVIN Dealer & Wholesale Program",
    provider: { "@type": "Organization", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" },
    areaServed: { "@type": "Country", name: "United States" },
    description: "Wholesale vehicle history reports, REST API access, and white-label dashboards for new and used car dealers, auto auctions, and BHPH lots.",
    url: "https://www.carcheckervin.com/dealers",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DEALERS_COPY.en.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function DealersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dealersSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DealersPageBody locale="en" />
    </>
  );
}
