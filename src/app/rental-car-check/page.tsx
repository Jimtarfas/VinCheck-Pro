import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import RentalCarCheckBody, { FAQS_EN } from "@/components/RentalCarCheckBody";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Rental Car History Check by VIN — Was This Car a Rental?",
  description:
    "Check if a used car was previously a rental vehicle by VIN. Find fleet history, high-mileage rental use, and prior commercial ownership before buying.",
  keywords: ["rental car history check", "was this car a rental", "fleet history VIN", "rental car VIN check", "former rental vehicle", "rental history lookup"],
  alternates: hreflangAlternates("/rental-car-check"),
  openGraph: {
    title: "Rental Car History Check by VIN — Was This Car a Rental?",
    description: "Check if a used car was previously a rental vehicle by VIN. Find fleet history and prior commercial ownership records.",
    url: `${SITE}/rental-car-check`,
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article", inLanguage: "en",
  headline: "Rental Car History Check by VIN",
  description: "Learn how to check if a used car was previously a rental vehicle by VIN, including what rental history means for value and reliability.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/rental-car-check` },
  datePublished: "2026-05-04", dateModified: "2026-05-04",
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "en",
  mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RentalCarCheckBody locale="en" />
    </>
  );
}
