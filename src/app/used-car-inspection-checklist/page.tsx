import type { Metadata } from "next";
import Link from "next/link";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Eye,
  ShieldAlert,
  XCircle,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import InspectionChecklist from "./InspectionChecklist";
import { inspectionChecklist } from "@/lib/inspection-checklist";

const SITE = "https://www.carcheckervin.com";
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
    url: `${SITE}/used-car-inspection-checklist`,
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

/* ─── JSON-LD Schemas ─────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "Used Car Pre-Purchase Inspection Checklist",
  description:
    "Free interactive 60+ point used car inspection checklist. Walk through 8 categories — exterior, underneath, engine bay, interior, test drive, documents, tires & brakes, HVAC & electronics — and generate a printable, shareable inspection report.",
  url: `${SITE}/used-car-inspection-checklist`,
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
  name: "How to Inspect a Used Car Before Buying",
  description:
    "Step-by-step DIY pre-purchase inspection — what to check, in what order, and which findings should make you walk away.",
  totalTime: "PT45M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Inspect the exterior in daylight",
      text: "Walk around the vehicle and check panel gaps, paint match, rust, dents, accident-repair signs, headlight clarity, tire match and tread depth, and windshield damage. Use the checklist to record each finding.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Look underneath with a flashlight",
      text: "Check for fluid leaks, exhaust rust, frame straightness, suspect welds, suspension bushings, CV boot tears, and drive-shaft condition. Aftermarket frame welds are a deal-breaker.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Open the hood (engine cold)",
      text: "Inspect the oil cap (no mayonnaise), coolant color, belts, hoses, battery age, mismatched bolts, recent paint, and dipstick oil quality. Mayonnaise residue or replaced bolts on structural mounts are deal-breakers.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Check the interior",
      text: "Verify the odometer matches the title and service records, that wear matches mileage, that the carpet has no flood damage, and that all electronics work. Odometer mismatch is a deal-breaker.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Take a 20-minute test drive",
      text: "Cold-start the engine yourself. Drive in stop-and-go and at highway speed. Check shifts, brakes, steering, vibrations, and the parking brake.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Verify documents and recalls",
      text: "Confirm the title is in the seller's name, VIN matches title and dash plate, no salvage brand, service history is present, registration is current, and emissions/smog passes.",
    },
    {
      "@type": "HowToStep",
      position: 7,
      name: "Review tires, brakes, and HVAC",
      text: "Check tread uniformity, sidewall cracks, brake pad thickness, rotor condition, A/C, heat, dash lights, windows, locks, wipers, and infotainment.",
    },
    {
      "@type": "HowToStep",
      position: 8,
      name: "Generate the report and decide",
      text: "Tap 'Generate Report' for a printable summary with severity counts and a buyer's verdict — green (proceed), amber (negotiate or get a mechanic PPI), or red (walk away).",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can a DIY inspection replace a mechanic's pre-purchase inspection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A DIY checklist filters out 70–80% of bad buys before you pay $150–$250 for a mechanic's PPI. We recommend using this checklist first — if any deal-breakers come up, walk away. If everything looks good, only then pay for a mechanic to inspect mechanical systems you can't see (compression, scan-tool diagnostics, suspension lift inspection).",
      },
    },
    {
      "@type": "Question",
      name: "What is the most important thing to check on a used car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The title, VIN, and frame — in that order. A mismatched VIN or salvage title can make the car worthless or unsellable. A bent or welded frame compromises safety. Mechanical problems are negotiable; structural and legal problems usually aren't.",
      },
    },
    {
      "@type": "Question",
      name: "How long should a pre-purchase inspection take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plan on 45–60 minutes total: 20 minutes walking the vehicle and looking at fluids, 20 minutes test driving, and 10 minutes verifying documents and recalls. Don't let a seller rush you — that's a red flag in itself.",
      },
    },
    {
      "@type": "Question",
      name: "What are deal-breakers on a used car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Walk away from a vehicle with: title not in the seller's name, VIN mismatch between title and vehicle, undisclosed salvage or flood title, mayonnaise on the oil cap (head gasket failure), aftermarket frame welds (collision repair), or odometer mismatch with service records.",
      },
    },
    {
      "@type": "Question",
      name: "Can I print this checklist?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Fill out the inspection on your phone or laptop, then tap 'Generate Report' and 'Print'. You can also copy a markdown version to text or email to your mechanic, partner, or financing source.",
      },
    },
    {
      "@type": "Question",
      name: "What MPG, mileage, or price should I expect on a used car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There's no single answer — but our companion calculators help: try the gas mileage calculator, total cost of ownership calculator, and car affordability calculator. Always pull a free VIN history check before paying any deposit.",
      },
    },
    {
      "@type": "Question",
      name: "What does each severity mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "'Deal-breaker' = walk away (frame welds, title fraud, head gasket failure). 'Major' = expensive repair or hidden problem; negotiate hard or get a mechanic PPI. 'Minor' = cosmetic or routine maintenance; use as price leverage. 'Info' = good to know, rarely changes the deal.",
      },
    },
    {
      "@type": "Question",
      name: "Does the checklist work for trucks, SUVs, and motorcycles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most checks apply to all 4-wheel passenger vehicles. For motorcycles, use our motorcycle VIN check tool — frame, suspension, and chain inspection points differ enough that a dedicated checklist works better.",
      },
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
      name: "Used Car Inspection Checklist",
      item: `${SITE}/used-car-inspection-checklist`,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Used Car Pre-Purchase Inspection Checklist",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#why-ppi", "#deal-breakers", "#faq"],
  },
  url: `${SITE}/used-car-inspection-checklist`,
};

/* ─── Static content ─────────────────────────────────────── */

const TOP_RED_FLAGS = [
  {
    title: "Mayonnaise residue under the oil cap",
    detail: "Creamy white-tan film = coolant in the oil. Almost always head gasket failure ($2,500–$6,000).",
  },
  {
    title: "Mismatched bolt heads in the engine bay",
    detail: "Replaced fender, radiator, or core support bolts indicate undisclosed front-end collision repair.",
  },
  {
    title: "Wavy weld beads on the frame",
    detail: "Factory frames are spot-welded uniformly. Wavy MIG welds = structural collision repair. Walk away.",
  },
  {
    title: "Rust on seat-belt brackets or seat tracks",
    detail: "Metal hardware low in the cabin doesn't rust unless the car was submerged. Classic flood-damage signal.",
  },
  {
    title: "Wear that doesn't match mileage",
    detail: "Worn pedals, shiny steering wheel, or threadbare driver seat on a '40k mile' car = likely odometer rollback.",
  },
  {
    title: "Persistent warning lights",
    detail: "Sellers often clear codes the day before sale. Drive 10+ minutes; if CEL or ABS comes back, codes weren't fixed.",
  },
  {
    title: "Title not in the seller's name",
    detail: "'Title-skipping' curbstoners avoid sales tax and recordable history. Often hides salvage, theft, or fraud.",
  },
  {
    title: "Strong air freshener masking smell",
    detail: "Heavy fragrance covers cigarette smoke, mildew, or pet damage — all of which lower resale and signal neglect.",
  },
  {
    title: "Tires worn unevenly",
    detail: "Inner-edge wear = bad alignment or worn suspension. Center wear = chronic over-inflation. Outer wear = aggressive driving.",
  },
  {
    title: "Fresh paint on the engine or undercarriage",
    detail: "Often hides leak repairs or accident damage. Be skeptical of any 'just detailed' engine bay.",
  },
];

const DEAL_BREAKERS = [
  "Title is not in the seller's legal name",
  "VIN on title doesn't match dash plate or door jamb sticker",
  "Frame is bent or has aftermarket welds / replacement plates",
  "Mayonnaise residue under the oil cap (head gasket failure)",
  "Mismatched bolts on structural / collision-relevant components",
  "Odometer reading doesn't match the title or service records",
  "Heavy water staining + rust on seat brackets (flood damage)",
];

export default function UsedCarInspectionChecklistPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <main className="pt-28 pb-16 print:pt-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="print:hidden">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Used Car Inspection Checklist" },
              ]}
            />
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Used Car Pre-Purchase Inspection Checklist
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            A free, interactive {TOTAL_ITEMS}-point inspection across 8 categories — exterior, underneath,
            engine bay, interior, test drive, documents, tires &amp; brakes, and HVAC. Spot deal-breakers
            before you pay, then generate a printable report you can share with your mechanic or partner.
          </p>

          {/* ── VIN Check CTA (top) ── */}
          <div className="mt-8 print:hidden">
            <VinCheckBanner variant="card" />
          </div>

          {/* ── Interactive checklist ── */}
          <div className="mt-10">
            <InspectionChecklist />
          </div>

          {/* ── Why a PPI matters ── */}
          <section id="why-ppi" className="mt-16 print:hidden">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Why a Pre-Purchase Inspection Matters
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The average used car sale in the US carries $1,400 in undisclosed problems. Sellers
              warm up the engine, clear the dash codes, and use heavy detailing to mask issues you&rsquo;d
              spot in 30 seconds in proper light. A 45-minute DIY inspection eliminates 70–80% of bad
              buys without spending a dime.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The goal isn&rsquo;t to find a perfect car — every used car has flaws. The goal is to find
              flaws the seller hasn&rsquo;t disclosed, then either negotiate the price or walk away. Use
              this checklist as your script.
            </p>
          </section>

          {/* ── DIY vs Mechanic ── */}
          <section id="diy-vs-mechanic" className="mt-12 print:hidden">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              DIY vs Mechanic Pre-Purchase Inspection
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Aspect</th>
                    <th className="text-left px-4 py-3 font-medium">DIY Checklist</th>
                    <th className="text-left px-4 py-3 font-medium">Mechanic PPI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ["Cost", "Free", "$120–$250"],
                    ["Time", "45–60 min", "1–2 hours (plus scheduling)"],
                    ["Catches deal-breakers", "Yes — frame, title, fluids, smell", "Yes, plus internal compression"],
                    ["Catches mechanical wear", "Some — shifts, brakes, leaks", "Most — lift inspection, scan tools"],
                    ["When to use", "Every used car, before any deposit", "Final-round candidate, after DIY pass"],
                  ].map(([aspect, diy, mech]) => (
                    <tr key={aspect} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-800">{aspect}</td>
                      <td className="px-4 py-3 text-slate-700">{diy}</td>
                      <td className="px-4 py-3 text-slate-700">{mech}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Use the DIY checklist first to filter out the obvious bad buys. Only pay for a mechanic
              PPI on the final 1–2 cars you&rsquo;re seriously considering.
            </p>
          </section>

          {/* ── Top 10 Red Flags ── */}
          <section id="red-flags" className="mt-12 print:hidden">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Top 10 Red Flags Buyers Miss
            </h2>
            <ul className="space-y-3">
              {TOP_RED_FLAGS.map(({ title, detail }) => (
                <li key={title} className="flex gap-3 items-start">
                  <Eye className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{title}</strong> — {detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Mid-page banner ── */}
          <div className="mt-12 print:hidden">
            <VinCheckBanner />
          </div>

          {/* ── Walk Away List ── */}
          <section id="deal-breakers" className="mt-12 print:hidden">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              When to Walk Away — The Deal-Breaker List
            </h2>
            <p className="text-slate-700 leading-relaxed mb-5">
              Some findings end the negotiation. If any of these come up, the smart move is to leave
              without making an offer — there are millions of used cars on the market, you only need one.
            </p>
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
              <ul className="space-y-2.5">
                {DEAL_BREAKERS.map((d) => (
                  <li key={d} className="flex gap-3 items-start text-sm text-red-900">
                    <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── Inspection categories overview ── */}
          <section id="categories" className="mt-12 print:hidden">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What&rsquo;s Inside the {TOTAL_ITEMS}-Point Checklist
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {inspectionChecklist.map((sec) => (
                <div key={sec.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-1.5">
                    <ClipboardList className="w-4 h-4 text-primary-600" />
                    <p className="font-bold text-slate-900 text-sm">{sec.title}</p>
                    <span className="ml-auto text-xs text-slate-500 font-mono">
                      {sec.items.length} pts
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{sec.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Cross-links ── */}
          <div className="mt-12 grid sm:grid-cols-3 gap-3 print:hidden">
            {[
              { href: "/vin-check", label: "Free VIN Check", sub: "Title, accidents, odometer" },
              { href: "/total-cost-of-ownership-calculator", label: "Cost of Ownership", sub: "5-year true cost" },
              { href: "/car-affordability-calculator", label: "Affordability", sub: "What you can afford" },
            ].map(({ href, label, sub }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div>
                  <p className="font-bold text-slate-900 text-sm">{label}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{sub}</p>
                </div>
                <span className="text-slate-500 font-bold text-xs flex-shrink-0">→</span>
              </Link>
            ))}
          </div>

          {/* ── FAQ ── */}
          <section id="faq" className="mt-14 print:hidden">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {[
                {
                  q: "Can a DIY inspection replace a mechanic's PPI?",
                  a: "It catches 70–80% of bad buys for free. Use the checklist on every car you look at; only pay for a mechanic PPI on your top finalist.",
                },
                {
                  q: "What's the most important thing to check?",
                  a: "Title, VIN, and frame — in that order. Mechanical issues are negotiable; legal and structural issues rarely are.",
                },
                {
                  q: "How long should an inspection take?",
                  a: "Plan on 45–60 minutes including test drive. If a seller rushes you, that's its own red flag.",
                },
                {
                  q: "What is a deal-breaker on a used car?",
                  a: "Title fraud, VIN mismatch, frame welds, head-gasket failure (mayo on oil cap), odometer mismatch, and confirmed flood damage. Walk away in any of these cases.",
                },
                {
                  q: "Can I print or share the report?",
                  a: "Yes. Tap 'Generate Report' to see a print-friendly summary, then 'Print' or 'Copy as Markdown' to share with anyone.",
                },
                {
                  q: "What does each severity mean?",
                  a: "Deal-breaker = walk away. Major = costly fix, negotiate or get mechanic PPI. Minor = cosmetic / routine maintenance. Info = good to know.",
                },
                {
                  q: "Does this work for trucks and SUVs?",
                  a: "Yes — every check applies to passenger cars, SUVs, and trucks. For motorcycles, use our motorcycle VIN check.",
                },
                {
                  q: "Is my progress saved?",
                  a: "Yes. Your answers and vehicle details are stored locally in your browser. Close the tab, come back later, pick up where you left off.",
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Related ── */}
          <div className="mt-14 print:hidden">
            <RelatedChecks exclude="/used-car-inspection-checklist" />
          </div>
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200 print:hidden">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Don&rsquo;t Buy Without a VIN Check
          </h2>
          <p className="text-slate-600 mb-6">
            Even a perfect inspection can&rsquo;t reveal accidents, salvage brands, or odometer rollbacks
            buried in the title history. A free VIN check takes 60 seconds and pulls the federal NMVTIS
            record for every report.
          </p>
          <Link
            href="/vin-check"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            <CheckCircle2 className="w-5 h-5" />
            Run a Free VIN Check
          </Link>
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              Always inspect in daylight
            </span>
            <span className="inline-flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5 text-red-500" />
              Never wire money sight-unseen
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
