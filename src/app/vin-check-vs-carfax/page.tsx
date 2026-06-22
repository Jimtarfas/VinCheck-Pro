import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import VinCheckVsCarfaxBody, { FAQS_EN } from "@/components/VinCheckVsCarfaxBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

export const metadata: Metadata = {
  title: "CarCheckerVIN vs Carfax — Cheaper, Faster VIN Check Alternative",
  description:
    "CarCheckerVIN vs Carfax compared side-by-side. See pricing ($7.99 vs $44.99), data sources, included reports, and why drivers are switching to a smarter Carfax alternative.",
  keywords: ["carfax alternative", "cheaper than carfax", "vin check vs carfax", "best vin check service", "carfax vs autocheck alternative", "affordable vehicle history report", "best carfax alternative 2026", "vin report comparison"],
  alternates: hreflangAlternates("/vin-check-vs-carfax"),
  openGraph: { title: "CarCheckerVIN vs Carfax — Cheaper, Faster VIN Check Alternative", description: "Compare CarCheckerVIN with Carfax on price, data sources, and report contents. See why drivers are switching to a smarter alternative.", url: "https://www.carcheckervin.com/vin-check-vs-carfax", type: "article" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "CarCheckerVIN vs Carfax: Which Is Better?", description: "A side-by-side comparison of CarCheckerVIN and Carfax covering pricing, data sources, report contents, and the right use case for each.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" }, mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.carcheckervin.com/vin-check-vs-carfax" }, datePublished: "2026-04-16", dateModified: "2026-04-16" };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

export default function VinCheckVsCarfaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <VinCheckVsCarfaxBody locale="en" />
    </>
  );
}
