import type { Metadata } from "next";
import LemonCheckPageBody, { LEMON_CHECK_COPY } from "@/components/LemonCheckPageBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: { absolute: "Lemon Check by VIN — Free Buyback Lookup, 50 States" },
  description:
    "Free lemon check by VIN. Find manufacturer buyback brands and lemon-law buybacks across all 50 states. NMVTIS-backed and instant — no signup.",
  keywords: [
    "lemon check by VIN", "is this car a lemon", "is my car a lemon",
    "lemon law buyback check", "manufacturer buyback VIN lookup", "buyback title check",
    "VIN lemon law check", "free lemon check", "lemon car history report",
    "how to check if a car is a lemon", "lemon car list", "worst lemon cars by VIN",
    "California lemon law check", "Texas lemon law check", "Florida lemon law check",
    "New York lemon law check", "Pennsylvania lemon law check", "Illinois lemon law check",
    "manufacturer repurchase history", "warranty buyback VIN", "lemon law buyback brand",
    "title washing lemon", "used car lemon check", "lemon vehicle disclosure",
    "Ford lemon check", "Tesla lemon check", "GM buyback VIN", "Chrysler lemon check",
    "Jeep lemon check", "Honda lemon check", "Toyota lemon buyback",
    "NMVTIS lemon brand", "auction buyback car", "reacquired vehicle title",
    "Magnuson Moss Warranty Act check", "lemon vs salvage title",
    "warranty return vehicle lookup", "manufacturer repurchase VIN",
    "lemon car resale value", "CPO lemon car", "lemon law arbitration",
  ],
  alternates: { canonical: "/lemon-check" },
  openGraph: {
    title: "Lemon Check by VIN — Free Buyback Lookup, 50 States",
    description: "Free lemon check by VIN. Find manufacturer buyback brands and lemon-law buybacks across all 50 states. NMVTIS-backed and instant — no signup.",
    url: `${SITE}/lemon-check`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lemon Check by VIN — Free Buyback Lookup, 50 States",
    description: "Free lemon check by VIN. Find manufacturer buyback brands and lemon-law buybacks across all 50 states. NMVTIS-backed, instant.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Lemon Check by VIN — Free Lemon Law Buyback Lookup",
  description: "Comprehensive guide to running a free lemon check by VIN. Covers manufacturer buyback brands, state-by-state lemon law variations, federal Magnuson-Moss protections, and pre-purchase red flags.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/lemon-check` },
  datePublished: "2026-04-16",
  dateModified: "2026-05-14",
  image: `${SITE}/opengraph-image`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: LEMON_CHECK_COPY.en.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Lemon Check", item: `${SITE}/lemon-check` },
  ],
};

export default function LemonCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LemonCheckPageBody locale="en" />
    </>
  );
}
