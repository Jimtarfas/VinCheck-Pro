/**
 * Wave 18 batch 2 — English slim page for /guides/used-car-financing-guide.
 * All layout/copy lives in the shared GuideUsedCarFinancingBody component.
 */

import type { Metadata } from "next";
import GuideUsedCarFinancingBody, { FAQS_EN } from "@/components/GuideUsedCarFinancingBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/guides/used-car-financing-guide`;
const alt = hreflangAlternatesForLocale("/guides/used-car-financing-guide", "en");
const title = "Used Car Financing: The Complete 2026 Guide";
const description =
  "How to finance a used car in 2026: credit scores, dealer vs bank vs credit union, pre-approval, APR vs total cost, leasing vs buying, refinancing, and pitfalls.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "used car financing",
    "used car loan guide",
    "auto loan guide",
    "best used car loan",
    "used car loan rates 2026",
    "auto loan pre-approval",
    "credit union car loan",
    "refinance car loan",
    "lease vs buy used car",
    "used car loan calculator",
    "apr vs total cost",
    "used car down payment",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description:
      "Credit scores, lenders, pre-approval, APR vs. total cost, leasing vs buying, and refinancing — the full playbook for financing a used car in 2026.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Credit scores, lenders, pre-approval, APR vs. total cost, leasing vs buying, and refinancing — the full playbook for financing a used car in 2026.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "en",
  headline: "Used Car Financing: The Complete 2026 Guide",
  description:
    "Comprehensive guide to financing a used car in 2026: credit, lenders, pre-approval, APR, total cost, leasing, refinancing, and avoiding finance-office traps.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-23",
  dateModified: new Date().toISOString().slice(0, 10),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "en",
  name: "How to Finance a Used Car",
  step: [
    { "@type": "HowToStep", position: 1, name: "Pull and review your credit", text: "Get your free credit reports from annualcreditreport.com and dispute any errors before applying." },
    { "@type": "HowToStep", position: 2, name: "Calculate an affordable loan", text: "Apply the 20/4/10 rule: at least 20% down, 4-year max term, all-in transportation cost under 10% of gross income." },
    { "@type": "HowToStep", position: 3, name: "Get multiple pre-approvals", text: "Compare offers from at least one credit union, one bank, and one online lender within a 14-day window." },
    { "@type": "HowToStep", position: 4, name: "Use pre-approval as a negotiating floor", text: "Let the dealer attempt to beat your best pre-approval; never accept a worse rate just because they offer it." },
    { "@type": "HowToStep", position: 5, name: "Read the contract before signing", text: "Verify APR, term, total of payments, and absence of unwanted add-ons before signing the retail installment contract." },
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
    { "@type": "ListItem", position: 3, name: "Used Car Financing Guide", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GuideUsedCarFinancingBody locale="en" />
    </>
  );
}
