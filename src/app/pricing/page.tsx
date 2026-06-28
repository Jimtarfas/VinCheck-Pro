import type { Metadata } from "next";
import PricingBody, { FAQS_EN } from "@/components/PricingBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/pricing`;

export const metadata: Metadata = {
  title: {
    absolute: "VIN Check Pricing — Free Reports, Single & Bundle Plans",
  },
  description:
    "CarCheckerVIN pricing. Every plan is 100% free for a limited time — single reports, 3-pack, 5-pack, and pro bundles. No credit card required.",
  keywords: [
    "VIN check pricing",
    "vehicle history report price",
    "VIN report cost",
    "free VIN check",
    "Carfax alternative price",
    "AutoCheck alternative",
    "cheap vehicle history report",
    "VIN check bundle",
    "dealer VIN check pricing",
  ],
  alternates: {
    canonical: "/pricing",
    languages: {
      en: "https://www.carcheckervin.com/pricing",
      es: "https://www.carcheckervin.com/es/precios",
      "x-default": "https://www.carcheckervin.com/pricing",
    },
  },
  openGraph: {
    title: "VIN Check Pricing — Free Reports, Single & Bundle Plans",
    description:
      "CarCheckerVIN pricing. Every plan is 100% free for a limited time — single reports, 3-pack, 5-pack, and pro bundles. No credit card required.",
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIN Check Pricing — Free Reports, Single & Bundle Plans",
    description:
      "Every plan 100% free for a limited time. Single, 3-pack, 5-pack, and pro bundles. No credit card required.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD ─────────────────────────────────────────────────────── */

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Pricing", item: PAGE_URL },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "CarCheckerVIN Vehicle History Report",
  description:
    "Comprehensive vehicle history report with full specs, recall data, market values, real photos, and ownership cost data. NMVTIS-backed.",
  brand: { "@type": "Brand", name: "CarCheckerVIN" },
  image: `${SITE}/og-image.png`,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "0",
    offerCount: "4",
    offers: [
      { "@type": "Offer", name: "Single Report", price: "0", priceCurrency: "USD", description: "One premium vehicle history report — full data, full photos.", availability: "https://schema.org/InStock", url: PAGE_URL },
      { "@type": "Offer", name: "3-Pack Bundle", price: "0", priceCurrency: "USD", description: "Three premium vehicle history reports for comparing options.", availability: "https://schema.org/InStock", url: PAGE_URL },
      { "@type": "Offer", name: "5-Pack Bundle", price: "0", priceCurrency: "USD", description: "Five premium vehicle history reports — best value for serious shoppers.", availability: "https://schema.org/InStock", url: PAGE_URL },
      { "@type": "Offer", name: "Pro Bundle (10 Reports)", price: "0", priceCurrency: "USD", description: "Ten premium vehicle history reports for dealers and fleet buyers.", availability: "https://schema.org/InStock", url: PAGE_URL },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS_EN.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "CarCheckerVIN Pricing — Free Vehicle History Reports",
  description:
    "Complete pricing breakdown for CarCheckerVIN VIN-check plans, with bundle comparisons and a Carfax / AutoCheck price comparison.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-22",
  dateModified: "2026-05-22",
  image: `${SITE}/opengraph-image`,
};

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <PricingBody locale="en" />
    </>
  );
}
