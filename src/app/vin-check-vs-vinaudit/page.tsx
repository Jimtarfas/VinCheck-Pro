import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import VinCheckVsVinAuditBody, { FAQS_EN } from "@/components/VinCheckVsVinAuditBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

export const metadata: Metadata = {
  title: "CarCheckerVIN vs VinAudit: Which VIN Decoder Wins?",
  description:
    "CarCheckerVIN vs VinAudit compared on price, NMVTIS data depth, report speed, and presentation. A fair side-by-side breakdown for buyers shopping a VIN decoder.",
  keywords: [
    "vinaudit alternative",
    "vinaudit cost",
    "vinaudit vs",
    "is vinaudit reliable",
    "vinaudit review",
    "nmvtis report alternative",
    "best vin decoder 2026",
    "cheap vin check",
    "vinaudit unlimited",
  ],
  alternates: hreflangAlternates("/vin-check-vs-vinaudit"),
  openGraph: {
    title: "CarCheckerVIN vs VinAudit: Which VIN Decoder Wins?",
    description:
      "Compare CarCheckerVIN with VinAudit on pricing, NMVTIS coverage, report depth, and presentation. See which one is the better fit.",
    url: "https://www.carcheckervin.com/vin-check-vs-vinaudit",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "CarCheckerVIN vs VinAudit: Which VIN Decoder Wins?",
  description: "A side-by-side comparison of CarCheckerVIN and VinAudit covering pricing, NMVTIS authorization, report contents, and the right use case for each.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.carcheckervin.com/vin-check-vs-vinaudit" },
  datePublished: "2026-04-26",
  dateModified: new Date().toISOString().slice(0, 10),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

export default function VinCheckVsVinAuditPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <VinCheckVsVinAuditBody locale="en" />
    </>
  );
}
