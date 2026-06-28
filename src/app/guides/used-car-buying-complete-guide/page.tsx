import type { Metadata } from "next";
import GuideUsedCarBuyingBody, { FAQS_EN } from "@/components/GuideUsedCarBuyingBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/guides/used-car-buying-complete-guide`;

export const metadata: Metadata = {
  title: "The Complete Used Car Buying Guide (2026 Edition)",
  description:
    "Everything you need to buy a used car in 2026: budgeting, financing, where to look, inspections, negotiation, paperwork, and post-purchase steps from industry experts.",
  keywords: [
    "used car buying guide",
    "how to buy a used car",
    "complete used car guide",
    "used car buying tips 2026",
    "buying a used car checklist",
    "used car negotiation",
    "used car inspection guide",
    "best used cars to buy",
    "used car financing guide",
    "used car paperwork checklist",
    "what to know before buying a used car",
    "used car buyer guide 2026",
  ],
  alternates: hreflangAlternates("/guides/used-car-buying-complete-guide"),
  openGraph: {
    title: "The Complete Used Car Buying Guide (2026 Edition)",
    description:
      "From budgeting through final paperwork: a 3,000+ word, expert-written guide to buying a used car safely and confidently in 2026.",
    url: PAGE_URL,
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "en",
  headline: "The Complete Used Car Buying Guide (2026 Edition)",
  description:
    "A complete, step-by-step guide to buying a used car in 2026 covering budget, financing, search, inspection, negotiation, and paperwork.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-23",
  dateModified: "2026-04-23",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "en",
  name: "How to Buy a Used Car in 2026",
  description:
    "A seven-step process for buying a used car safely: set a budget, secure financing, search listings, decode the VIN, inspect, negotiate, and complete paperwork.",
  totalTime: "P14D",
  step: [
    { "@type": "HowToStep", position: 1, name: "Set a realistic budget", text: "Calculate the all-in monthly cost (loan payment, insurance, fuel, maintenance, registration) and cap it at 15% of take-home pay." },
    { "@type": "HowToStep", position: 2, name: "Get pre-approved financing", text: "Secure a loan offer from a credit union or bank before visiting dealers so you negotiate from strength." },
    { "@type": "HowToStep", position: 3, name: "Search the right marketplaces", text: "Use a mix of franchise dealers, independent lots, certified-pre-owned programs, and private-party platforms to find the best inventory." },
    { "@type": "HowToStep", position: 4, name: "Run a VIN check", text: "Decode the VIN and pull a vehicle history report to verify title status, accident history, odometer readings, and recalls before driving out." },
    { "@type": "HowToStep", position: 5, name: "Inspect and test drive", text: "Perform a structured walkaround, pay for an independent pre-purchase inspection, and complete a 30-minute mixed-condition test drive." },
    { "@type": "HowToStep", position: 6, name: "Negotiate price and terms", text: "Anchor on out-the-door price, not monthly payment, and walk away if dealer fees, add-ons, or interest rates exceed your pre-approval." },
    { "@type": "HowToStep", position: 7, name: "Complete paperwork and registration", text: "Verify the title, bill of sale, odometer disclosure, and warranty paperwork; then register the vehicle and update your insurance." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en",
  mainEntity: FAQS_EN.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE}/guides` },
    { "@type": "ListItem", position: 3, name: "Used Car Buying Complete Guide", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GuideUsedCarBuyingBody locale="en" />
    </>
  );
}
