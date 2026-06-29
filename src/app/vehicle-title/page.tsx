import type { Metadata } from "next";
import VehicleTitleBody, { FAQS_EN } from "@/components/VehicleTitleBody";
import { ORG_AUTHOR } from "@/lib/seo/author";
import { states } from "@/lib/states";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Vehicle Title — Transfer, Brands, Duplicate & Bonded Title Guide (All 50 States)",
  description:
    "Everything about vehicle titles: how to transfer ownership, what every title brand means, and how to get a duplicate, lien release, or bonded title in any U.S. state. Run a free VIN check first to confirm a clean, lien-free title.",
  keywords: [
    "vehicle title",
    "car title transfer",
    "how to transfer a car title",
    "title brands",
    "salvage title",
    "rebuilt title",
    "bonded title",
    "duplicate title",
    "clean title",
    "title washing",
    "lien release title",
    "DMV title services",
  ],
  alternates: { canonical: "/vehicle-title" },
  openGraph: {
    title: "Vehicle Title — Transfer, Brands & Bonded Title Guide",
    description:
      "How to transfer, replace, and clear a vehicle title in any state, what every title brand means, and why to run a free VIN check before you take title.",
    url: `${SITE}/vehicle-title`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vehicle Title — Transfer, Brands & Bonded Title Guide",
    description:
      "Vehicle title transfer, title brands, duplicate and bonded titles explained for all 50 states, plus a free VIN check to defeat title washing.",
  },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Vehicle Title Guide & VIN Check",
  url: `${SITE}/vehicle-title`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Learn how to transfer, replace, and clear a vehicle title in any U.S. state, what every title brand means, and run a free VIN check to confirm a clean, lien-free title.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Vehicle Title Information & Services Guide",
  description:
    "How to transfer, replace, and clear a vehicle title in any U.S. state: title brands, duplicate titles, bonded titles, lien release, title washing, and why to run a VIN check first.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/vehicle-title` },
  datePublished: "2026-06-28",
  dateModified: new Date().toISOString().slice(0, 10),
  image: `${SITE}/opengraph-image`,
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Transfer a Vehicle Title",
  description:
    "Step-by-step guide to transferring a vehicle title with your state DMV, including the documents required and how a VIN check fits in.",
  totalTime: "PT1H",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Get the title signed over",
      text: "For a used car, the seller signs the existing title over to you with the sale date, price, and odometer reading. For a new car, the dealer provides the manufacturer's certificate of origin instead.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Complete the application and verification",
      text: "Submit a title application to your state DMV with proof of identity, a bill of sale, and an odometer disclosure. Many states require a VIN verification and an NMVTIS check before issuing the title.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Receive your new title",
      text: "Once fees are paid and the paperwork clears, the DMV issues a new title in your name. Any existing brand on the VIN carries forward onto the new title.",
    },
  ],
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Vehicle Title", item: `${SITE}/vehicle-title` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: `${SITE}/vehicle-title`,
};

const statesDirectorySchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Vehicle Title by State",
  itemListElement: states.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${s.name} Vehicle Title`,
    url: `${SITE}/vehicle-title/${s.slug}`,
  })),
};

export default function VehicleTitlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(statesDirectorySchema) }} />
      <VehicleTitleBody />
    </>
  );
}
