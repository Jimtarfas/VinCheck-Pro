import type { Metadata } from "next";
import ReviewsPageBody, { REVIEWS_COPY } from "@/components/ReviewsPageBody";

const WWW = "https://www.carcheckervin.com";
const SUBDOMAIN = "https://reviews.carcheckervin.com";
const TRUSTPILOT_PROFILE = "https://www.trustpilot.com/review/www.carcheckervin.com";

export const metadata: Metadata = {
  metadataBase: new URL(SUBDOMAIN),
  title: { absolute: "CarCheckerVIN Reviews 2026 — 4.9★ from Car Buyers, Sellers & Dealers" },
  description:
    "Read real CarCheckerVIN reviews from car buyers, sellers, and dealers. Rated 4.9/5 across 50,000+ free VIN checks and vehicle history reports — see why drivers trust CarCheckerVIN over paid alternatives.",
  keywords: [
    "CarCheckerVIN reviews",
    "CarCheckerVIN ratings",
    "is CarCheckerVIN legit",
    "is CarCheckerVIN reliable",
    "CarCheckerVIN customer reviews",
    "VIN check reviews",
    "VIN checker reviews",
    "VIN decoder reviews",
    "free VIN check reviews",
    "vehicle history report reviews",
    "best VIN check service",
    "trusted VIN checker",
    "Carfax alternative reviews",
    "AutoCheck alternative reviews",
    "VINCheck Pro reviews",
    "car history check reviews",
    "used car VIN check reviews",
    "dealer VIN check reviews",
    "VIN report reviews",
    "online VIN check reviews",
  ],
  alternates: { canonical: SUBDOMAIN },
  openGraph: {
    title: "CarCheckerVIN Reviews — 4.9★ from Car Buyers, Sellers & Dealers",
    description:
      "Read real CarCheckerVIN reviews — 4.9/5 across 50,000+ free VIN checks and vehicle history reports. See why buyers, sellers, and dealers trust CarCheckerVIN.",
    url: SUBDOMAIN,
    type: "website",
    siteName: "CarCheckerVIN",
    images: [{ url: `${WWW}/og-image.png`, width: 1200, height: 630, alt: "CarCheckerVIN customer reviews — 4.9 stars" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CarCheckerVIN Reviews — 4.9★ from 50,000+ Car Buyers & Dealers",
    description:
      "Real CarCheckerVIN reviews from buyers, sellers, and dealers — free VIN checks rated 4.9/5.",
    images: [`${WWW}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: WWW },
    { "@type": "ListItem", position: 2, name: "Reviews", item: SUBDOMAIN },
  ],
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${WWW}#organization`,
  name: "CarCheckerVIN",
  url: WWW,
  logo: { "@type": "ImageObject", url: `${WWW}/logo.png` },
  sameAs: [SUBDOMAIN, TRUSTPILOT_PROFILE],
};

const reviewsPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SUBDOMAIN}#webpage`,
  url: SUBDOMAIN,
  name: "CarCheckerVIN Reviews — Ratings from Car Buyers, Sellers & Dealers",
  description:
    "Real CarCheckerVIN customer reviews and ratings. See what 50,000+ car buyers, sellers, and dealers say about our free VIN checks and vehicle history reports.",
  inLanguage: "en-US",
  isPartOf: { "@type": "WebSite", "@id": `${WWW}#website`, url: WWW, name: "CarCheckerVIN" },
  about: { "@id": `${WWW}#organization` },
  primaryImageOfPage: { "@type": "ImageObject", url: `${WWW}/og-image.png` },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: REVIEWS_COPY.en.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ReviewsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ReviewsPageBody locale="en" />
    </>
  );
}
