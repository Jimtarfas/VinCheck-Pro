import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import VinCheckVsBumperBody, { FAQS_EN } from "@/components/VinCheckVsBumperBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

export const metadata: Metadata = {
  title: "CarCheckerVIN vs Bumper: Pricing & Features Compared",
  description: "CarCheckerVIN vs Bumper compared on price, subscription model, monitoring, and report depth. See why pay-as-you-go beats Bumper's $19.99/month subscription.",
  keywords: ["bumper.com alternative", "bumper vehicle history", "bumper subscription cost", "bumper vs", "is bumper worth it", "bumper review", "no subscription vin check", "pay as you go vin report", "cancel bumper subscription"],
  alternates: hreflangAlternates("/vin-check-vs-bumper"),
  openGraph: { title: "CarCheckerVIN vs Bumper: Pricing & Features Compared", description: "Compare CarCheckerVIN with Bumper on pricing, subscription model, ongoing monitoring, and report depth. A fair side-by-side breakdown.", url: "https://www.carcheckervin.com/vin-check-vs-bumper", type: "article" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "CarCheckerVIN vs Bumper: Pricing & Features Compared", description: "A side-by-side comparison of CarCheckerVIN and Bumper covering pricing, subscription model, ongoing monitoring, report contents, and the right use case for each.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" }, mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.carcheckervin.com/vin-check-vs-bumper" }, datePublished: "2026-04-26", dateModified: "2026-04-26" };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

export default function VinCheckVsBumperPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <VinCheckVsBumperBody locale="en" />
    </>
  );
}
