import type { Metadata } from "next";
import VehicleRegistrationBody, { FAQS_EN } from "@/components/VehicleRegistrationBody";
import { ORG_AUTHOR } from "@/lib/seo/author";
import { states } from "@/lib/states";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Vehicle Registration — DMV Title, Renewal & Fees Guide (All 50 States)",
  description:
    "How to register a vehicle in any U.S. state: the documents you need, titling and inspections, what it costs, and renewal. Run a free VIN check first to confirm a clean, lien-free title before you head to the DMV.",
  keywords: [
    "vehicle registration",
    "how to register a car",
    "DMV vehicle registration",
    "car registration cost",
    "title transfer",
    "registration renewal",
    "register a used car",
    "what do I need to register a car",
    "vehicle registration documents",
    "DMV title and registration",
    "register car out of state",
    "license plate registration",
  ],
  alternates: { canonical: "/vehicle-registration" },
  openGraph: {
    title: "Vehicle Registration — DMV Title, Renewal & Fees Guide",
    description:
      "Register or renew a vehicle in any state: documents, titling, inspections, fees, and renewal. Check the VIN first for a clean, lien-free title.",
    url: `${SITE}/vehicle-registration`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vehicle Registration — DMV Title, Renewal & Fees Guide",
    description:
      "How to register and renew a vehicle in all 50 states, plus why to run a free VIN check before you title a used car.",
  },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Vehicle Registration Guide & VIN Check",
  url: `${SITE}/vehicle-registration`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Learn how to title, register, and renew a vehicle in any U.S. state, and run a free VIN check to confirm a clean, lien-free title before you register.",
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
  headline: "Vehicle Registration Guide",
  description:
    "How to title, register, and renew a vehicle in any U.S. state: required documents, fees and taxes, inspections, renewal, and why to run a VIN check first.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/vehicle-registration` },
  datePublished: "2026-06-28",
  dateModified: "2026-06-28",
  image: `${SITE}/opengraph-image`,
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Register a Vehicle",
  description:
    "Step-by-step guide to titling and registering a vehicle with your state DMV, including the documents required and how a VIN check fits in.",
  totalTime: "PT1H",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Gather your title and documents",
      text: "Collect the signed-over title (or manufacturer's certificate of origin for a new car), proof of identity, proof of insurance, an odometer disclosure, and a bill of sale. Confirm the VIN matches across the title, dashboard, and door jamb.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Complete inspections and VIN verification",
      text: "Depending on the vehicle, state, and county, you may need an emissions test, safety inspection, or VIN verification before registration. A salvage or rebuilt title triggers an additional inspection.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Pay fees and receive your plate",
      text: "Submit the paperwork to your state DMV, pay the registration fee and any applicable tax, and receive your license plate, registration card, and renewal sticker.",
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
    { "@type": "ListItem", position: 2, name: "Vehicle Registration", item: `${SITE}/vehicle-registration` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: `${SITE}/vehicle-registration`,
};

const statesDirectorySchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Vehicle Registration by State",
  itemListElement: states.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${s.name} Vehicle Registration`,
    url: `${SITE}/vehicle-registration/${s.slug}`,
  })),
};

export default function VehicleRegistrationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(statesDirectorySchema) }} />
      <VehicleRegistrationBody />
    </>
  );
}
