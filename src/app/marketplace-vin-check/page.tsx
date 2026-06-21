import type { Metadata } from "next";
import MarketplaceIndexBody, { MARKETPLACE_INDEX_FAQS_EN } from "@/components/MarketplaceIndexBody";

export const metadata: Metadata = {
  title: "Marketplace VIN Check — Verify Before You Buy",
  description:
    "Run a VIN check before buying from any online marketplace. Verify vehicles listed on Facebook Marketplace, Craigslist, eBay Motors, Copart, and more with a full vehicle history report.",
  keywords: [
    "marketplace VIN check",
    "Facebook Marketplace VIN check",
    "Craigslist VIN check",
    "eBay Motors VIN check",
    "Copart VIN check",
    "online marketplace vehicle history",
    "used car VIN check",
    "private seller VIN check",
    "auction VIN check",
  ],
  alternates: { canonical: "/marketplace-vin-check" },
  openGraph: {
    title: "Marketplace VIN Check — Verify Before You Buy",
    description:
      "Check any vehicle listed on Facebook Marketplace, Craigslist, eBay Motors, Copart, and 6 more platforms. Get a full history report before you buy.",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: MARKETPLACE_INDEX_FAQS_EN.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function MarketplaceVinCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MarketplaceIndexBody locale="en" />
    </>
  );
}
