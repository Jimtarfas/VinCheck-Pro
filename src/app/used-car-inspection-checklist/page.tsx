/**
 * Wave 18.19 — English used-car-inspection-checklist via shared body.
 */

import type { Metadata } from "next";
import UsedCarInspectionChecklistBody, { FAQS_EN } from "@/components/UsedCarInspectionChecklistBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { inspectionChecklist } from "@/lib/inspection-checklist";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/used-car-inspection-checklist`;
const TOTAL_ITEMS = inspectionChecklist.reduce((s, sec) => s + sec.items.length, 0);

export const metadata: Metadata = {
  title: "Free Used Car Inspection Checklist — 60+ Point DIY Pre-Purchase Inspection",
  description:
    "Free interactive used-car inspection checklist with 60+ checks across 8 categories. Spot deal-breakers before you buy. Generate a shareable inspection report instantly.",
  keywords: [
    "used car inspection checklist",
    "pre-purchase car inspection",
    "used car checklist",
    "diy car inspection",
    "buying used car checklist",
    "what to check when buying used car",
    "used car buying checklist",
    "vehicle inspection checklist",
    "used car inspection form",
    "ppi checklist",
    "pre-purchase inspection checklist",
    "free car inspection form",
    "printable used car checklist",
    "used car inspection points",
    "car checklist before buying",
    "what to look for used car",
    "60 point inspection",
    "used car red flags",
    "used car warning signs",
    "buying a used car what to check",
    "used car evaluation checklist",
    "ppi report",
    "diy ppi",
    "free pre-purchase inspection",
    "used car inspection app",
    "car buyer checklist",
    "used vehicle inspection sheet",
    "test drive checklist",
    "car body inspection checklist",
    "engine inspection checklist",
  ],
  alternates: hreflangAlternates("/used-car-inspection-checklist"),
  openGraph: {
    title: "Free Used Car Inspection Checklist — 60+ Point DIY Pre-Purchase Inspection",
    description:
      "Interactive used-car inspection checklist with 60+ checks across 8 categories. Spot deal-breakers before you buy and generate a shareable report.",
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Used Car Inspection Checklist — 60+ Point DIY Pre-Purchase Inspection",
    description:
      "Free interactive checklist with 60+ checks. Spot deal-breakers, generate a shareable report, walk away from bad buys with confidence.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "en",
  name: "Used Car Pre-Purchase Inspection Checklist",
  description:
    "Free interactive 60+ point used car inspection checklist. Walk through 8 categories — exterior, underneath, engine bay, interior, test drive, documents, tires & brakes, HVAC & electronics — and generate a printable, shareable inspection report.",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "60+ point pre-purchase inspection checklist",
    "8 organized inspection categories",
    "Pass / Fail / Skip tracking per item",
    "Severity tagging (deal-breaker, major, minor, info)",
    "Auto-saved progress (resume mid-inspection)",
    "Printable inspection report",
    "Shareable markdown report",
    "Buyer's verdict (green / amber / red)",
  ],
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "en",
  name: "How to Inspect a Used Car Before Buying",
  description:
    "Step-by-step DIY pre-purchase inspection — what to check, in what order, and which findings should make you walk away.",
  totalTime: "PT45M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Inspect the exterior in daylight", text: "Walk around the vehicle and check panel gaps, paint match, rust, dents, accident-repair signs, headlight clarity, tire match and tread depth, and windshield damage. Use the checklist to record each finding." },
    { "@type": "HowToStep", position: 2, name: "Look underneath with a flashlight", text: "Check for fluid leaks, exhaust rust, frame straightness, suspect welds, suspension bushings, CV boot tears, and drive-shaft condition. Aftermarket frame welds are a deal-breaker." },
    { "@type": "HowToStep", position: 3, name: "Open the hood (engine cold)", text: "Inspect the oil cap (no mayonnaise), coolant color, belts, hoses, battery age, mismatched bolts, recent paint, and dipstick oil quality. Mayonnaise residue or replaced bolts on structural mounts are deal-breakers." },
    { "@type": "HowToStep", position: 4, name: "Check the interior", text: "Verify the odometer matches the title and service records, that wear matches mileage, that the carpet has no flood damage, and that all electronics work. Odometer mismatch is a deal-breaker." },
    { "@type": "HowToStep", position: 5, name: "Take a 20-minute test drive", text: "Cold-start the engine yourself. Drive in stop-and-go and at highway speed. Check shifts, brakes, steering, vibrations, and the parking brake." },
    { "@type": "HowToStep", position: 6, name: "Verify documents and recalls", text: "Confirm the title is in the seller's name, VIN matches title and dash plate, no salvage brand, service history is present, registration is current, and emissions/smog passes." },
    { "@type": "HowToStep", position: 7, name: "Review tires, brakes, and HVAC", text: "Check tread uniformity, sidewall cracks, brake pad thickness, rotor condition, A/C, heat, dash lights, windows, locks, wipers, and infotainment." },
    { "@type": "HowToStep", position: 8, name: "Generate the report and decide", text: "Tap 'Generate Report' for a printable summary with severity counts and a buyer's verdict — green (proceed), amber (negotiate or get a mechanic PPI), or red (walk away)." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en",
  mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Used Car Inspection Checklist", item: PAGE_URL },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "en",
  headline: `Used Car Pre-Purchase Inspection Checklist — ${TOTAL_ITEMS}-Point DIY`,
  description: "A free interactive checklist for inspecting a used car before you buy — 60+ points across 8 categories with deal-breaker detection.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-16",
  dateModified: new Date().toISOString().slice(0, 10),
};

export default function UsedCarInspectionChecklistPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <UsedCarInspectionChecklistBody locale="en" />
    </>
  );
}
