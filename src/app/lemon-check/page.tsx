import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertOctagon,
  AlertTriangle,
  Shield,
  ShieldCheck,
  Search,
  FileText,
  Clock,
  Car,
  MapPin,
  ChevronRight,
  Zap,
  BadgeCheck,
  Lock,
  Check,
  Gavel,
  DollarSign,
  Wrench,
  Eye,
  ClipboardList,
  TrendingDown,
  ScrollText,
  Tag,
  ArrowRight,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import StateLemonLawTable from "./StateLemonLawTable";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: {
    absolute: "Lemon Check by VIN — Free Buyback Lookup, 50 States",
  },
  description:
    "Free lemon check by VIN. Find manufacturer buyback brands and lemon-law buybacks across all 50 states. NMVTIS-backed and instant — no signup.",
  keywords: [
    "lemon check by VIN",
    "is this car a lemon",
    "is my car a lemon",
    "lemon law buyback check",
    "manufacturer buyback VIN lookup",
    "buyback title check",
    "VIN lemon law check",
    "free lemon check",
    "lemon car history report",
    "how to check if a car is a lemon",
    "lemon car list",
    "worst lemon cars by VIN",
    "lemon car symptoms",
    "California lemon law check",
    "Texas lemon law check",
    "Florida lemon law check",
    "New York lemon law check",
    "Pennsylvania lemon law check",
    "Illinois lemon law check",
    "Ohio lemon law check",
    "Georgia lemon law check",
    "North Carolina lemon law check",
    "Michigan lemon law check",
    "New Jersey lemon law check",
    "manufacturer repurchase history",
    "warranty buyback VIN",
    "lemon law buyback brand",
    "title washing lemon",
    "used car lemon check",
    "lemon vehicle disclosure",
    "lemon law settlement check",
    "Ford lemon check",
    "Tesla lemon check",
    "GM buyback VIN",
    "Chrysler lemon check",
    "Jeep lemon check",
    "Honda lemon check",
    "Toyota lemon buyback",
    "NMVTIS lemon brand",
    "auction buyback car",
    "reacquired vehicle title",
    "Magnuson Moss Warranty Act check",
    "lemon vs salvage title",
    "warranty return vehicle lookup",
    "manufacturer repurchase VIN",
    "lemon car resale value",
    "CPO lemon car",
    "lemon law arbitration",
    "lemon law attorney lookup",
    "dealer auction buyback",
  ],
  alternates: { canonical: "/lemon-check" },
  openGraph: {
    title: "Lemon Check by VIN — Free Buyback Lookup, 50 States",
    description:
      "Free lemon check by VIN. Find manufacturer buyback brands and lemon-law buybacks across all 50 states. NMVTIS-backed and instant — no signup.",
    url: `${SITE}/lemon-check`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lemon Check by VIN — Free Buyback Lookup, 50 States",
    description:
      "Free lemon check by VIN. Find manufacturer buyback brands and lemon-law buybacks across all 50 states. NMVTIS-backed, instant.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Lemon Check by VIN — Free Lemon Law Buyback Lookup",
  description:
    "Comprehensive guide to running a free lemon check by VIN. Covers manufacturer buyback brands, state-by-state lemon law variations, federal Magnuson-Moss protections, and pre-purchase red flags.",
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

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "50-State Lemon Law Lookup",
  url: `${SITE}/lemon-check`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Interactive 50-state lemon law table — search, sort, and expand any state to see coverage windows, repair-attempt thresholds, used-car protection, and buyback title language.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a lemon car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 'lemon' is a vehicle with a substantial, recurring defect that the manufacturer cannot repair within a reasonable number of attempts during the statutory warranty period. State lemon laws require the manufacturer to repurchase or replace the vehicle. The repurchased vehicle is then often resold and may carry a 'Manufacturer Buyback' or 'Lemon Law Buyback' title brand.",
      },
    },
    {
      "@type": "Question",
      name: "How do I check if a car is a lemon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Run a VIN-based lemon check. Enter the 17-character VIN above and our system queries NMVTIS and national title history sources for any lemon law buyback brand, manufacturer repurchase event, or warranty return record. NMVTIS pulls from all 50 state DMVs, so cross-state title washing won't hide a brand.",
      },
    },
    {
      "@type": "Question",
      name: "Can a lemon car be resold legally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Once a manufacturer repurchases a lemon, they almost always resell it — typically at a dealer-only auction. In most states, the title must carry a permanent 'Manufacturer Buyback' or equivalent brand and the dealer must disclose this brand in writing to the next buyer. Enforcement varies, which is why a VIN-based check is more reliable than the paper title.",
      },
    },
    {
      "@type": "Question",
      name: "What states have the strongest lemon laws?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "California, New York, New Jersey, Massachusetts, and Connecticut are commonly cited as having the strongest consumer protections. California's Song-Beverly Act and Tanner Consumer Protection Act extend to leased vehicles and demonstrators. New York and New Jersey both have separately codified used-car lemon laws. Massachusetts has a 15-business-day out-of-service threshold and a dedicated used-car program.",
      },
    },
    {
      "@type": "Question",
      name: "Does a lemon title affect insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, often. Many insurers limit lemon-branded vehicles to liability-only coverage and refuse comprehensive or collision policies, similar to how they treat salvage and rebuilt titles. Premiums can be higher and total-loss payouts are typically discounted by 15–40% to reflect diminished value.",
      },
    },
    {
      "@type": "Question",
      name: "Can you finance a lemon car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Financing is possible but limited. Most major banks and credit unions decline branded-title vehicles. Buy-here-pay-here lots and subprime lenders may finance lemon-branded cars but at significantly higher interest rates, and loan-to-value ratios are usually capped lower than for clean-title vehicles.",
      },
    },
    {
      "@type": "Question",
      name: "Is a manufacturer buyback the same as a lemon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Effectively yes in everyday use, with a subtle distinction. 'Lemon Law Buyback' is the formal title brand applied when a vehicle qualifies under a state lemon statute. 'Manufacturer Buyback' is a broader term that can include voluntary buybacks (where the manufacturer repurchases the vehicle as a goodwill resolution without admitting lemon-law eligibility). Both indicate a vehicle the manufacturer reacquired due to defects.",
      },
    },
    {
      "@type": "Question",
      name: "How much less is a lemon worth?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lemon-branded vehicles typically sell at a 15–40% discount to a clean-title comparable. The exact diminished-value impact depends on the defect type, brand reputation, the state's disclosure rules, and the local market. The discount runs in both directions: a lemon-titled car you buy cheap will resell at a discount, too.",
      },
    },
    {
      "@type": "Question",
      name: "Will a Carfax show a lemon title?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most major commercial history reports surface a lemon brand if the brand was recorded into NMVTIS. Our free report pulls the same NMVTIS-sourced data plus auction and dealer service data. A title brand cannot legally be hidden if a state agency reported it, but enforcement gaps between states (title washing) can occasionally hide a brand — running a multi-source check is the safest approach.",
      },
    },
    {
      "@type": "Question",
      name: "What if my car is out of warranty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most state lemon laws apply only during the original manufacturer's express warranty period (typically 1–2 years or 12,000–24,000 miles). Once the warranty expires, you generally cannot file a new state lemon law claim. However, the federal Magnuson-Moss Warranty Act may still apply to defects that arose during the warranty period and were never properly resolved.",
      },
    },
    {
      "@type": "Question",
      name: "How many repair attempts qualify as a lemon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most states require 3 or 4 unsuccessful repair attempts for the same defect, or 30 cumulative days out of service. A single failed repair attempt is sometimes enough for a serious safety defect such as brakes, steering, or airbags — check your specific state's threshold in our interactive table above.",
      },
    },
    {
      "@type": "Question",
      name: "What is title washing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Title washing is the illegal or quasi-legal practice of moving a vehicle from a state that requires lemon (or salvage, flood) title brands to a state with weaker branding rules, re-titling there, and then bringing the vehicle back to sell with a 'clean' title. NMVTIS was created in 2009 specifically to disrupt this practice — our VIN check pulls the original brand history regardless of where the current paper title was issued.",
      },
    },
    {
      "@type": "Question",
      name: "Are lemons sold at dealer auctions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — manufacturer-captive auctions (e.g. Manheim's manufacturer lanes, ADESA, OPENLANE) are the standard channel for buyback vehicles. Dealers attending these auctions know the buyback status. The risk to consumers arises later, after the vehicle has moved through 1–2 dealer hands and the buyback documentation may not be passed forward as clearly.",
      },
    },
    {
      "@type": "Question",
      name: "Do leased cars qualify under lemon laws?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes in most states. Lemon laws typically cover both purchased and leased vehicles during the statutory warranty period, though the remedy process differs — the manufacturer must work with both the lessee and the leasing company (the legal title holder).",
      },
    },
    {
      "@type": "Question",
      name: "What is NMVTIS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NMVTIS — the National Motor Vehicle Title Information System — is a federal system administered by the U.S. Department of Justice that aggregates title brands from all 50 state DMVs, insurance carriers, junk yards, and salvage auctions. It was created in part to prevent title washing of branded vehicles (lemon, salvage, flood, junk). Our VIN check is sourced from NMVTIS-approved data providers.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a lemon brand stay on a title?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Permanently in most states. A manufacturer buyback or lemon law brand follows the VIN for the life of the vehicle and is meant to never be removed. Some states (California specifically) require a physical decal in the door jamb in addition to the title notation.",
      },
    },
    {
      "@type": "Question",
      name: "Can I sue if I bought a lemon unknowingly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Possibly. If the seller failed to disclose a known buyback brand, you may have a claim under your state's deceptive trade practices act, common-law fraud, or the federal Magnuson-Moss Warranty Act. Document everything — title, disclosures, repair records — and consult a qualified consumer-protection attorney. This page is informational, not legal advice.",
      },
    },
    {
      "@type": "Question",
      name: "Is a CPO car ever a lemon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It can be, though most manufacturers' Certified Pre-Owned programs explicitly exclude vehicles with prior lemon brands. If you find a CPO car with a buyback brand in its VIN history, that's a strong signal something was missed in the certification process or that the brand was applied after CPO certification — both worth questioning before purchase.",
      },
    },
    {
      "@type": "Question",
      name: "Does my state have used-car lemon protection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most states do not. Only a handful — including New York, New Jersey, Massachusetts, Connecticut, Rhode Island, and (in limited form) Hawaii, Arizona, Washington, D.C., and a few others — extend statutory lemon protection to used-car purchases. Outside those states, you must rely on the original manufacturer's warranty (if still active), Magnuson-Moss, and any implied warranty of merchantability that may apply.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Magnuson-Moss Warranty Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Magnuson-Moss Warranty Act (15 U.S.C. § 2301) is a federal consumer protection law that governs written warranties on consumer products. For vehicles, it provides a private cause of action for breach of written or implied warranty and allows recovery of attorneys' fees. It can apply when a state lemon law does not, including in private-party sales and beyond the state warranty window.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Lemon-Check a Used Car Before Buying",
  description:
    "Six-step process to confirm whether a used vehicle was previously branded as a lemon law buyback or manufacturer repurchase.",
  totalTime: "PT15M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Run a VIN-based lemon check",
      text: "Enter the 17-character VIN into our search tool to retrieve NMVTIS-sourced title brand history, including lemon law buyback and manufacturer repurchase records.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Review the title-brand history",
      text: "Look for any of these brands: Manufacturer Buyback, Lemon Law Buyback, Warranty Return, Reacquired Vehicle, Manufacturer Repurchase, Prior Lemon Law Vehicle, or Warranty Nonconformity.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Cross-check NHTSA complaints",
      text: "Search the NHTSA Office of Defects Investigation database for the vehicle's year, make, and model. Vehicles with high complaint counts for the same defect are statistically more likely to surface as lemons.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Request service records",
      text: "Ask the seller for full service history. Repeated work orders for the same defect, or multiple visits to a manufacturer-authorized dealership in a short period, are classic indicators of a buyback candidate.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Inspect in person",
      text: "Look for a Lemon Law Buyback decal on the door jamb (mandatory in California), check that VIN plates match across the dashboard, door, and frame, and ask about any extended warranty or third-party warranty offered with the vehicle.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Get a pre-purchase inspection (PPI)",
      text: "Have an independent mechanic — not the seller's shop — perform a 100-point inspection. Mention any concerns surfaced by the VIN history report so the mechanic can target those systems specifically.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    {
      "@type": "ListItem",
      position: 2,
      name: "Lemon Check",
      item: `${SITE}/lemon-check`,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".speakable-intro"],
  },
  url: `${SITE}/lemon-check`,
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Lemon Law Quick Statistics",
  description:
    "Key numbers about lemon law buybacks, repair-attempt thresholds, resale impact, and federal protections.",
  url: `${SITE}/lemon-check`,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  variableMeasured: [
    { "@type": "PropertyValue", name: "US jurisdictions covered", value: "51" },
    { "@type": "PropertyValue", name: "Typical repair attempts threshold", value: "3-4" },
    { "@type": "PropertyValue", name: "Out-of-service threshold (days)", value: "30" },
    { "@type": "PropertyValue", name: "Typical resale discount on lemon-titled vehicles", value: "15-40%" },
    { "@type": "PropertyValue", name: "Year Magnuson-Moss Warranty Act passed", value: "1975" },
  ],
};

/* ── Component data ────────────────────────────────────────────── */

const HEADLINE_STATS = [
  { value: "51", label: "US jurisdictions covered (50 states + DC)" },
  { value: "3–4", label: "Repair attempts that typically qualify as a lemon" },
  { value: "30 days", label: "Out-of-service threshold in most state laws" },
  { value: "15–40%", label: "Typical resale discount on a lemon-titled car" },
  { value: "1975", label: "Year Magnuson-Moss Warranty Act passed" },
];

const TRUST_STATS = [
  { icon: MapPin, value: "All 50", label: "states + DC covered" },
  { icon: Shield, value: "NMVTIS", label: "federally-sourced" },
  { icon: Clock, value: "< 5 sec", label: "average lookup time" },
  { icon: BadgeCheck, value: "Free", label: "preview, no signup" },
  { icon: AlertOctagon, value: "Buyback", label: "brands surfaced" },
];

const PIPELINE_STEPS = [
  {
    icon: AlertTriangle,
    title: "Defect surfaces",
    body: "Original owner experiences a recurring problem — transmission, electrical, drive-by-wire, infotainment — that resists multiple repair attempts during the warranty period.",
  },
  {
    icon: Gavel,
    title: "Lemon claim filed",
    body: "Owner files under the state lemon law or invokes the Magnuson-Moss Warranty Act. Manufacturer either resolves through arbitration or repurchases the vehicle.",
  },
  {
    icon: DollarSign,
    title: "Manufacturer repurchases",
    body: "Manufacturer refunds the purchase price (minus a mileage-usage fee) or replaces the vehicle. Title is branded 'Manufacturer Buyback' in most states.",
  },
  {
    icon: Car,
    title: "Sold at dealer auction",
    body: "Vehicle is moved to a manufacturer-captive auction (Manheim, ADESA, OPENLANE). Licensed dealers bid. Public consumers cannot attend.",
  },
  {
    icon: Tag,
    title: "Resold on a used lot",
    body: "Dealer who bought the buyback resells it on the retail used market — sometimes with the brand disclosure prominent, sometimes minimised or moved across state lines.",
  },
];

const RED_FLAGS = [
  "Multiple service tickets at a single dealer for the same defect within a short window",
  "Ownership transferred back to the manufacturer's captive finance arm shortly after sale",
  "Short initial ownership period (under 18 months) with mileage well below typical use",
  "Dealer-only auction history immediately after the original retail sale",
  "Vehicle re-titled in a different state within 90 days of initial registration",
  "Same VIN appears in the manufacturer's TSB or recall database for a recurring component",
  "Title shows a brief gap in ownership history with the manufacturer as the registered party",
  "Asking price 15–35% below comparable clean-title vehicles in the same trim and mileage",
  "Listing photos avoid the driver-side door jamb (where a 'Lemon Law Buyback' decal must be visible in California)",
  "Seller offers an unusual third-party warranty in lieu of manufacturer CPO coverage",
  "Service history shows multiple component replacements for the same fault code",
  "Recent state inspection performed in a state with weaker title-branding rules",
  "VIN history shows a title issued to a leasing company, then quickly assigned back to the OEM",
  "Vehicle was registered as a 'demo' or 'service loaner' for a year then sold to a dealer",
  "Trade-in or wholesale value flagged 'cannot price' by major valuation guides",
];

const STATE_TERMS = [
  {
    term: "Manufacturer Buyback",
    states: "Used in the majority of states as the default title-brand term.",
  },
  {
    term: "Lemon Law Buyback",
    states:
      "California, Hawaii, New Jersey, Washington, Alaska — explicit reference to the state lemon statute.",
  },
  {
    term: "Reacquired Vehicle",
    states:
      "Texas and Oregon — preferred terminology to capture both lemon-law and voluntary repurchases.",
  },
  {
    term: "Warranty Return",
    states:
      "Louisiana — focuses on the warranty origin rather than the lemon statute.",
  },
  {
    term: "Manufacturer Repurchase",
    states:
      "Pennsylvania — used on the title alongside the original brand date.",
  },
  {
    term: "Warranty Nonconformity",
    states:
      "Virginia — formal phrase tied to the statute's eligibility language.",
  },
  {
    term: "Prior Lemon Law Vehicle",
    states:
      "Minnesota — appears on the title and on the dealer disclosure form.",
  },
  {
    term: "Lemon Aid (used-car program)",
    states:
      "Massachusetts — distinct used-car program separate from the new-car lemon law.",
  },
];

const COST_OF_LEMON = [
  {
    icon: TrendingDown,
    title: "Resale value drops 15–40%",
    body: "A lemon-branded title is a permanent valuation discount. Industry valuation guides (Black Book, Manheim Market Report) apply a fixed deduction for branded-title vehicles, and most retail buyers walk away when the brand is disclosed.",
  },
  {
    icon: Shield,
    title: "Insurance restrictions",
    body: "Most major carriers — Progressive, Allstate, GEICO, State Farm — will limit lemon-branded vehicles to liability-only coverage, refusing comprehensive and collision. Premiums on the limited coverage are often higher.",
  },
  {
    icon: DollarSign,
    title: "Financing limitations",
    body: "Prime lenders typically decline branded titles outright. Subprime financing is available but at materially higher APRs, with shorter terms and lower loan-to-value ratios.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty implications",
    body: "The original manufacturer warranty may be void or transferred only on case-by-case approval. Most extended-warranty providers exclude lemon-branded vehicles by policy.",
  },
  {
    icon: ScrollText,
    title: "Registration friction",
    body: "A handful of states require additional inspections or surcharges to register lemon-branded vehicles, and certain states (Hawaii, California) require the buyer to sign a separate disclosure form at registration.",
  },
];

const HOW_TO_STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Run the VIN",
    body: "Enter the 17-character VIN above. We query NMVTIS, state DMV title records, and national auction databases in under 5 seconds.",
  },
  {
    n: "02",
    icon: FileText,
    title: "Review brand history",
    body: "Scan the title-history section for any of the buyback brand terms (Manufacturer Buyback, Lemon Law Buyback, Reacquired Vehicle, etc.).",
  },
  {
    n: "03",
    icon: AlertTriangle,
    title: "Check NHTSA complaints",
    body: "Cross-reference the year/make/model in the NHTSA complaint database — high-complaint clusters indicate models with higher lemon eligibility rates.",
  },
  {
    n: "04",
    icon: Wrench,
    title: "Pull service records",
    body: "Request a full service history. Repeated work orders for the same defect inside the warranty window are the classic lemon signature.",
  },
  {
    n: "05",
    icon: Eye,
    title: "Inspect in person",
    body: "Look for a California lemon decal on the door jamb, check VIN plates match across the dashboard and door, and verify the dashboard warning indicators clear properly.",
  },
  {
    n: "06",
    icon: ClipboardList,
    title: "Get a PPI",
    body: "An independent pre-purchase inspection by a mechanic familiar with the model is the final filter. Share any VIN-report flags so the mechanic can target those systems.",
  },
];

const INTERNAL_LINKS = [
  {
    href: "/vin-check",
    label: "Full VIN History Report",
    desc: "All title brands plus accident, odometer, and theft history in one report.",
  },
  {
    href: "/accident-history-check",
    label: "Accident History Check",
    desc: "Collision and damage records cross-checked against insurance feeds.",
  },
  {
    href: "/odometer-check",
    label: "Odometer Check",
    desc: "Detect mileage rollback fraud — a common companion issue with branded titles.",
  },
  {
    href: "/stolen-vehicle-check",
    label: "Stolen Vehicle Check",
    desc: "NICB cross-reference for theft records on any VIN.",
  },
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "Distinguish lemon brands from salvage, rebuilt, and junk brands.",
  },
  {
    href: "/used-car-inspection-checklist",
    label: "Used Car Inspection Checklist",
    desc: "100-point pre-purchase checklist you can take to a PPI.",
  },
  {
    href: "/vin-check-vs-carfax",
    label: "VIN Check vs Carfax",
    desc: "How our free report compares to paid Carfax / AutoCheck reports.",
  },
  {
    href: "/florida-vin-check",
    label: "Florida VIN Check",
    desc: "Florida-specific DHSMV lemon law data and flood-damage overlap.",
  },
];

const FAQS = faqSchema.mainEntity.map((q) => ({
  q: q.name,
  a: q.acceptedAnswer.text,
}));

/* ── Component ─────────────────────────────────────────────────── */

export default function LemonCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />

      <article className="pb-16 bg-surface">
        {/* ── Hero ────────────────────────────────────────────── */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 sm:pt-36 pb-14 sm:pb-20">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Lemon Check" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <AlertOctagon className="w-4 h-4" /> Lemon Law Buyback Lookup &nbsp;·&nbsp; All 50 States
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Lemon Check by VIN —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Catch the Buyback Before You Buy
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Find manufacturer buyback brands, lemon law buyback titles, and
              warranty repurchase records on any used vehicle. Free preview, no
              credit card, instant results — sourced from NMVTIS and every U.S.
              state DMV.
            </p>

            {/* VIN search */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Run a Free Lemon Check
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — cars, trucks, SUVs, leased
                vehicles, demos
              </p>
              <VinSearchForm size="lg" />
              <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> 256-bit encrypted · DPPA compliant
                · NMVTIS-sourced title data
              </p>
            </div>

            {/* Trust stats */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8">
              {TRUST_STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="bg-white/10 border border-white/15 rounded-xl px-3 py-3 text-center"
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                    <div className="text-lg sm:text-xl font-headline font-black text-white">
                      {s.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-white/65 leading-tight mt-0.5">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Stats block (By the numbers) ───────────────────── */}
        <section
          aria-labelledby="lemon-stats-heading"
          className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10"
        >
          <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
            <h2
              id="lemon-stats-heading"
              className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5"
            >
              Lemon Law — By the Numbers
            </h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {HEADLINE_STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-primary-container px-4 py-4 sm:py-5"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-headline font-bold text-3xl sm:text-4xl text-on-primary-container leading-none mb-2">
                    {s.value}
                  </dd>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Main content ───────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Intro */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              What a Lemon Check Actually Tells You
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                A &ldquo;lemon&rdquo; is a vehicle that the manufacturer was
                forced to repurchase from its original owner under a state
                lemon law because chronic defects could not be repaired within
                a reasonable number of attempts. Once repurchased, the
                manufacturer almost always resells the vehicle &mdash; often at
                dealer-only auctions where consumers cannot see the buyback
                paperwork. Those vehicles eventually surface on used-car lots,
                sometimes with the buyback brand prominently disclosed and
                sometimes minimised or hidden through cross-state{" "}
                <Link
                  href="/salvage-title-check"
                  className="text-primary font-bold hover:underline"
                >
                  title washing
                </Link>
                .
              </p>
              <p>
                A <strong className="text-on-surface">VIN-based lemon check</strong>{" "}
                pulls the original brand record from NMVTIS, the federal title
                aggregator administered by the U.S. Department of Justice. NMVTIS
                receives data from every state DMV and from licensed insurance
                and salvage operators, so even a vehicle that has been moved
                across multiple states retains its lemon brand in the federal
                record.
              </p>
              <p>
                This page does three things:{" "}
                <strong className="text-on-surface">(1)</strong> runs the lemon
                check directly from the form above,{" "}
                <strong className="text-on-surface">(2)</strong> shows you
                exactly how state lemon laws differ in the interactive
                50-state table below, and{" "}
                <strong className="text-on-surface">(3)</strong> walks you
                through a 6-step pre-purchase process to catch a lemon before
                you sign anything.
              </p>
            </div>
          </section>

          {/* Interactive 50-state table */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <StateLemonLawTable />
          </section>

          {/* How a lemon ends up on a used lot */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How a Lemon Ends Up on a Used-Car Lot
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Most consumers assume a bought-back lemon disappears from the
              road. It doesn&apos;t. Here&apos;s the typical five-step path
              from defect to dealer lot.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {PIPELINE_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 relative"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-[11px] font-black text-on-surface-variant">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-sm font-headline font-extrabold text-primary mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Red flags checklist */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              15 Red Flags a Used Car Might Be a Hidden Lemon
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              No single flag is a smoking gun &mdash; but two or three of these
              in the same listing should prompt a careful{" "}
              <strong>VIN lemon check</strong> and a pre-purchase inspection.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {RED_FLAGS.map((flag, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
                >
                  <div className="w-6 h-6 rounded-full bg-error-container flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[11px] font-black text-on-error-container">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {flag}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* State terminology variations */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Buyback Titles Are Actually Called (State by State)
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              The same legal event &mdash; manufacturer repurchase &mdash; gets
              eight different official names depending on the state. Searching
              only for &ldquo;lemon&rdquo; in a paper title document will miss
              most of them.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STATE_TERMS.map((t) => (
                <div
                  key={t.term}
                  className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Tag className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-headline font-extrabold text-primary">
                      {t.term}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {t.states}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* "Worst lemon offenders" historical context */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              The &ldquo;Worst Lemon Offenders&rdquo; Question
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                One of the most common searches around lemon law buyback is
                some variant of <em>&ldquo;worst lemon cars by VIN&rdquo;</em>{" "}
                or <em>&ldquo;lemon car list&rdquo;</em>. A factual,
                publisher-neutral answer: there is no single authoritative
                public list of vehicles ranked by lemon-law eligibility, and
                naming brands or models by reputation alone risks defaming an
                entire fleet for the actions of a small percentage of units.
              </p>
              <p>
                The closest thing to a credible data source is the{" "}
                <strong className="text-on-surface">
                  NHTSA Office of Defects Investigation
                </strong>{" "}
                complaint database, which is publicly searchable by year, make,
                and model. High complaint clusters &mdash; especially for
                drivetrain, electrical, or safety systems &mdash; correlate
                with higher lemon-law eligibility rates. Some publicly
                reported recurring problem areas across the industry over the
                last decade have included early-generation dual-clutch
                transmissions, certain infotainment software releases, and
                some hybrid/EV battery management systems. A VIN-specific
                lemon check is always more useful than a model-level
                reputation: even a model with thousands of complaints will
                have hundreds of thousands of clean-running units.
              </p>
            </div>
          </section>

          {/* What a lemon costs you */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What a Lemon Title Costs You Long-Term
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              Even if the underlying defect was eventually fixed, the brand
              itself imposes financial costs that follow the VIN for life.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COST_OF_LEMON.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-on-error-container" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">
                      {c.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Magnuson-Moss explainer */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              The Federal Backstop: Magnuson-Moss Warranty Act
            </h2>
            <div className="rounded-2xl bg-secondary-container/40 border border-secondary-container p-5 sm:p-7">
              <div className="flex items-start gap-3 mb-3">
                <Gavel className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary">
                  When state lemon law doesn&apos;t apply, federal law may
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
                The{" "}
                <strong className="text-on-surface">
                  Magnuson-Moss Warranty Act
                </strong>{" "}
                (15 U.S.C. § 2301), passed in 1975, is the federal consumer
                protection law that governs written warranties on consumer
                products &mdash; including motor vehicles. Where state lemon
                laws are limited to new vehicles within a narrow window, the
                federal statute is broader in three important ways:
              </p>
              <ul className="space-y-2 mb-3">
                {[
                  "It creates a private cause of action for breach of any written or implied warranty — including manufacturers' powertrain warranties, used-car dealer warranties, and certified pre-owned warranties.",
                  "It allows recovery of reasonable attorneys' fees, which is the engine that makes lemon-law litigation economically viable for consumers.",
                  "It applies in all 50 states and can fill gaps where state lemon laws are weak or where the vehicle is outside the state's warranty window.",
                ].map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-2 items-start text-sm text-on-surface-variant"
                  >
                    <Check
                      className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                      strokeWidth={3}
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-on-surface-variant italic">
                This summary is informational, not legal advice. Consult a
                qualified consumer-protection attorney about your specific
                situation.
              </p>
            </div>
          </section>

          {/* How to lemon-check (HowTo card grid) */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Lemon-Check a Car Before You Buy — 6 Steps
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              A complete pre-purchase lemon screen takes about 15 minutes
              spread across the desk and the dealership.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {HOW_TO_STEPS.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.n}
                    className="rounded-2xl border border-outline-variant bg-surface p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-headline font-black text-primary">
                        {s.n}
                      </span>
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Mid-page CTA */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <AlertOctagon className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Don&apos;t Buy Someone Else&apos;s Lemon
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Free, instant lemon check sourced from all 50 state DMVs and
                NMVTIS. No credit card. No signup.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* Internal links */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Companion VIN Check Tools
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              A lemon brand rarely travels alone. Pair this check with these
              targeted lookups for a complete pre-purchase picture.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INTERNAL_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary group-hover:underline">
                      {l.label}
                    </div>
                    <div className="text-xs text-on-surface-variant mt-0.5">
                      {l.desc}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* VIN Check banner */}
          <section className="py-10">
            <VinCheckBanner />
          </section>

          {/* FAQ */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Lemon Check FAQ
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The most-searched questions about lemon law buyback titles,
              manufacturer repurchases, and VIN-based lemon detection.
            </p>
            <div className="space-y-3">
              {FAQS.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">
                      {f.q}
                    </span>
                    <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Free · Instant · 50 States
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              One VIN. Every Lemon Brand. Five Seconds.
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Manufacturer buyback brands and lemon law histories follow the
              VIN permanently &mdash; even when the paper title looks clean.
              Run the free check before you write a check.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <Link
              href="/vin-check"
              className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline"
            >
              Or get the full VIN history report
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          <RelatedChecks exclude="/lemon-check" />
        </div>
      </article>
    </>
  );
}
