import type { Metadata } from "next";
import DealerCheckBody, { FAQS_EN } from "@/components/DealerCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

export const metadata: Metadata = {
  title: "Dealer History Check by VIN — Was This Car a Demo or Loaner?",
  description: "Check if a vehicle was used as a dealer demo, service loaner, or press fleet car by VIN. Find dealer ownership records, pre-sale mileage accumulation, and commercial dealer use.",
  keywords: ["dealer demo check VIN", "service loaner history", "dealer car history", "demo vehicle VIN", "press fleet check", "dealer ownership history"],
  alternates: { canonical: "/dealer-check" },
  openGraph: { title: "Dealer History Check by VIN — Was This Car a Demo or Loaner?", description: "Check if a vehicle was used as a dealer demo or service loaner by VIN. Find dealer ownership records and pre-sale mileage history.", url: "https://www.carcheckervin.com/dealer-check", type: "article" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Dealer History Check by VIN", description: "Learn how to check if a vehicle was used as a dealer demo, service loaner, or press fleet car by VIN.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" }, mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.carcheckervin.com/dealer-check" }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10) };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

export default function DealerCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DealerCheckBody locale="en" />
    </>
  );
}
