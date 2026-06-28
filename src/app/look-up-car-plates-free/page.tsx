import type { Metadata } from "next";
import LookUpCarPlatesFreeBody from "@/components/LookUpCarPlatesFreeBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: { absolute: "Look Up Car Plates Free — License Plate Lookup, 50 States" },
  description:
    "Free license plate lookup for all 50 US states. Enter any car plate to see VIN, year, make, model, title brands, accidents, and odometer data.",
  keywords: [
    "look up car plates free", "free car plate lookup", "free license plate lookup",
    "free plate lookup", "free plate search", "lookup license plate free",
    "free license plate search", "free reverse license plate lookup", "look up plates for free",
    "car plate lookup free", "license plate lookup no charge", "free vehicle plate lookup",
    "search license plate free", "free plate number lookup", "free DMV plate lookup",
    "free license plate to VIN", "no charge license plate lookup",
    "license plate search free no sign up", "free car plate search", "free plate to VIN",
    "look up a license plate for free", "free vehicle history by plate",
    "find car owner by plate free", "free plate decoder", "license plate VIN free",
    "instant free plate lookup", "free plate identification", "no fee license plate lookup",
    "free license plate finder", "free reverse plate search", "100 free plate lookup",
    "totally free plate lookup",
  ],
  alternates: hreflangAlternates("/look-up-car-plates-free"),
  openGraph: {
    title: "Look Up Car Plates Free — License Plate Lookup, 50 States",
    description:
      "Free license plate lookup for all 50 US states. Enter any car plate to see VIN, year, make, model, title brands, accidents, and odometer data.",
    url: `${SITE}/look-up-car-plates-free`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Look Up Car Plates Free — License Plate Lookup, 50 States",
    description:
      "Free license plate lookup for all 50 US states. Enter any car plate to see VIN, year, make, model, title brands, accidents, and odometer.",
  },
  robots: { index: true, follow: true },
};

const FAQS_EN = [
  { q: "Is this license plate lookup really 100% free?", a: "Yes. Looking up a plate, getting the VIN, and viewing core vehicle details (year, make, model, trim, equipment, title brands) is completely free. No credit card, no trial, no subscription. We do offer optional paid in-depth history reports if you want extra-deep records, but the free lookup gives you everything most buyers need." },
  { q: "Do I need to sign up or create an account?", a: "You do not need to sign up to start a search. Some optional add-on data (like saving reports to your dashboard) requires a free account, but the core plate-to-VIN lookup itself does not." },
  { q: "Which states are supported?", a: "All 50 US states plus Washington, D.C. We resolve plates issued by every state DMV and Department of Motor Vehicles equivalent — including California DMV, Texas DMV, Florida DHSMV, New York DMV, and every other agency." },
  { q: "Can I look up the owner's name and address?", a: "No. Owner personal information is protected by the federal Driver's Privacy Protection Act (DPPA, 18 U.S.C. § 2721). No legitimate consumer service — including ours — can return owner names, addresses, or phone numbers from a plate lookup. Anything claiming otherwise is breaking federal law. We return vehicle data only." },
  { q: "How accurate is the free data?", a: "Our plate-to-VIN match is sourced from official state DMV records and aggregated from registered title authorities. Once we resolve the VIN, the vehicle decode comes directly from NHTSA, manufacturer build sheets, and licensed history aggregators — the same sources the paid giants use." },
  { q: "How is this different from Carfax or AutoCheck plate lookup?", a: "Carfax charges $44.99 per plate lookup and AutoCheck charges $24.99. Both require a paid account before they reveal anything beyond the year and make. We give you the VIN, equipment list, and history records for free, with optional upgrades only if you need extra-deep records." },
  { q: "Can I look up classic, motorcycle, or commercial plates?", a: "Yes. Our database covers passenger plates, motorcycle plates, commercial plates, vanity plates, dealer plates, and historic/antique plates across all 50 states." },
  { q: "Is there a limit on free lookups?", a: "Casual users are not limited. We apply a fair-use rate limit only for clearly automated scraping behavior to keep the service fast for everyone." },
];

const FREE_STEPS = [
  { title: "Enter the plate", desc: "Type the license plate exactly as it appears on the vehicle. Spaces and dashes are auto-handled." },
  { title: "Pick the state", desc: "Choose the state where the plate is registered. We support all 50 states plus D.C." },
  { title: "Get the VIN instantly", desc: "We instantly resolve the plate to the vehicle's 17-character VIN — no waiting, no payment." },
  { title: "See full vehicle data", desc: "Year, make, model, trim, engine, title brands, equipment, and full history records — all free." },
];

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free License Plate Lookup — Look Up Car Plates Free",
  url: `${SITE}/look-up-car-plates-free`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Free license plate lookup for all 50 US states. Resolve any plate to its VIN and get full vehicle data — no sign-up, no credit card, no fee.",
  featureList: [
    "Free plate-to-VIN resolution",
    "All 50 US states + D.C.",
    "Instant vehicle decode",
    "No sign-up required",
    "No credit card required",
    "Title brand & history records",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS_EN.map((f) => ({
    "@type": "Question", name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to look up a car plate for free",
  description: "Step-by-step guide to looking up any US license plate for free, no sign-up required.",
  totalTime: "PT30S",
  step: FREE_STEPS.map((s, i) => ({
    "@type": "HowToStep", position: i + 1, name: s.title, text: s.desc,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Look Up Car Plates Free", item: `${SITE}/look-up-car-plates-free` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-summary"] },
  url: `${SITE}/look-up-car-plates-free`,
};

export default function LookUpCarPlatesFreePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <LookUpCarPlatesFreeBody locale="en" />
    </>
  );
}
