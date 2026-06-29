import type { Metadata } from "next";
import BillOfSaleBody, { FAQS_EN } from "@/components/BillOfSaleBody";
import { ORG_AUTHOR } from "@/lib/seo/author";
import { states } from "@/lib/states";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Vehicle Bill of Sale — What It Needs, Transfer Documents & Free Template Guide (All 50 States)",
  description:
    "Everything about the vehicle bill of sale: what information goes on it, which transfer documents change hands in a private car sale, and how it all flows to the DMV in any U.S. state. Run a free VIN check first to confirm a clean title and honest odometer reading.",
  keywords: [
    "bill of sale",
    "vehicle bill of sale",
    "car bill of sale",
    "auto bill of sale",
    "vehicle transfer documents",
    "how to fill out a bill of sale",
    "what to put on a bill of sale",
    "does a bill of sale need to be notarized",
    "used car paperwork",
    "private car sale documents",
    "title transfer documents",
    "DMV bill of sale",
  ],
  alternates: { canonical: "/bill-of-sale" },
  openGraph: {
    title: "Vehicle Bill of Sale — What It Needs & the Transfer Papers",
    description:
      "What information goes on a vehicle bill of sale, which documents change hands in a private car sale, and why to run a free VIN check before you sign.",
    url: `${SITE}/bill-of-sale`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vehicle Bill of Sale — What It Needs & the Transfer Papers",
    description:
      "Vehicle bill of sale and transfer documents explained for all 50 states, plus a free VIN check to verify the car before you sign.",
  },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Bill of Sale Guide & VIN Check",
  url: `${SITE}/bill-of-sale`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Learn what goes on a vehicle bill of sale, which transfer documents a private car sale needs in any U.S. state, and run a free VIN check to confirm a clean title and honest odometer reading.",
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
  headline: "Vehicle Bill of Sale & Transfer Documents Guide",
  description:
    "What information goes on a vehicle bill of sale, which transfer documents change hands in a private car sale, whether it needs to be notarized, and why to run a VIN check first.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/bill-of-sale` },
  datePublished: "2026-06-28",
  dateModified: new Date().toISOString().slice(0, 10),
  image: `${SITE}/opengraph-image`,
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Complete a Vehicle Bill of Sale and Transfer a Car",
  description:
    "Step-by-step guide to completing a bill of sale and transferring a vehicle in a private sale, including the documents required and how a VIN check fits in.",
  totalTime: "PT30M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Complete the bill of sale",
      text: "Fill in the buyer and seller details, sale price, date, odometer reading, and the full 17-character VIN. Use your state's official form if it provides one, and have both parties sign.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Sign over the title",
      text: "The seller signs the existing title over to the buyer in the assignment section, recording the same sale price, date, and odometer reading as the bill of sale.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "File with the DMV",
      text: "The buyer brings the bill of sale, signed title, odometer disclosure, and proof of identity to the DMV to transfer the title, pay any tax due, and register the car.",
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
    { "@type": "ListItem", position: 2, name: "Bill of Sale", item: `${SITE}/bill-of-sale` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: `${SITE}/bill-of-sale`,
};

const statesDirectorySchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Bill of Sale by State",
  itemListElement: states.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${s.name} Bill of Sale`,
    url: `${SITE}/bill-of-sale/${s.slug}`,
  })),
};

export default function BillOfSalePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(statesDirectorySchema) }} />
      <BillOfSaleBody />
    </>
  );
}
