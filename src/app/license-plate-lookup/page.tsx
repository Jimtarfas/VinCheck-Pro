import type { Metadata } from "next";
import Link from "next/link";
import { Check, Shield, Clock, Globe, Search, FileText, AlertCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import LicensePlateLookup from "./LicensePlateLookup";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: {
    absolute: "License Plate to VIN Lookup — Free, All 50 States",
  },
  description:
    "Free license plate to VIN lookup for all 50 US states. Enter a plate to get the VIN, year, make, model, and full vehicle history report.",
  keywords: [
    "license plate to VIN",
    "license plate lookup",
    "plate to VIN lookup",
    "search by license plate",
    "plate number to VIN",
    "find car by plate number",
    "reverse license plate lookup",
    "vehicle plate search",
    "plate to VIN converter",
    "license plate VIN decoder",
    "free license plate lookup",
    "license plate check",
    "look up vehicle by plate",
    "plate number vehicle history",
    "run plate number",
    "check license plate",
    "DMV plate lookup",
    "license plate vehicle identification",
    "state plate lookup",
    "plate number search USA",
    "license plate VIN number",
    "plate lookup car history",
    "find VIN from plate",
    "car plate number search",
    "license plate registration lookup",
    "plate number decode",
    "DPPA plate lookup",
    "license plate to vin free",
    "how to find VIN from license plate",
    "license plate records check",
  ],
  alternates: { canonical: "/license-plate-lookup" },
  openGraph: {
    title: "License Plate to VIN Lookup — Free, All 50 States",
    description:
      "Free license plate to VIN lookup for all 50 US states. Enter a plate to get the VIN, year, make, model, and full vehicle history report.",
    url: `${SITE}/license-plate-lookup`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "License Plate to VIN Lookup — Free, All 50 States",
    description:
      "Free license plate to VIN lookup for all 50 US states. Enter a plate to get the VIN, year, make, model, and full history.",
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
  name: "License Plate to VIN Lookup",
  description:
    "Free license plate to VIN lookup tool. Enter any US license plate number and state to instantly retrieve the VIN, vehicle details, and full history report.",
  url: `${SITE}/license-plate-lookup`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "All 50 US states supported",
    "VIN retrieval from plate number",
    "Instant vehicle year, make, model decode",
    "Links to full vehicle history report",
    "DPPA-compliant data access",
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
  name: "How to Look Up a VIN by License Plate",
  description:
    "Use CarCheckerVIN's free tool to convert any US license plate number to a VIN in three steps.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter the license plate number",
      text: "Type the alphanumeric plate number into the search field exactly as it appears on the plate, without spaces or special characters.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Select the issuing state",
      text: "Choose the US state that issued the plate from the dropdown. The same plate characters can exist in multiple states, so selecting the correct state is essential for an accurate match.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "View the VIN and vehicle details",
      text: "Click 'Look Up VIN by Plate'. The tool returns the 17-character VIN along with year, make, model, and a direct link to the full vehicle history report.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I find a VIN from a license plate number for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. CarCheckerVIN's license plate to VIN lookup is free for personal pre-purchase vehicle research. Create a free account, enter the plate number and issuing state, and the tool returns the associated 17-character VIN along with decoded vehicle details.",
      },
    },
    {
      "@type": "Question",
      name: "Which US states are supported for plate-to-VIN lookup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All 50 US states plus the District of Columbia are supported. Each state's motor vehicle database is queried separately, which is why you must select the issuing state — the same plate number can exist in multiple states simultaneously.",
      },
    },
    {
      "@type": "Question",
      name: "Is it legal to look up a license plate to get the VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for permissible purposes under the Driver's Privacy Protection Act (DPPA). Vehicle research before a private-party purchase is a clearly permissible use. Our lookup returns vehicle information (VIN, make, model, title status) but not personal owner data like name or home address, which the DPPA restricts.",
      },
    },
    {
      "@type": "Question",
      name: "What information can I get from a license plate lookup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A license plate lookup first returns the VIN. Once you have the VIN you can access the full vehicle history: year, make, model, title brands (salvage, flood, lemon law buyback), accident records, odometer readings across title transfers, number of previous owners, theft records, and open safety recalls.",
      },
    },
    {
      "@type": "Question",
      name: "What if the plate lookup returns no results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No results usually means the plate is expired, out of state, a temporary dealer tag, or a personalized vanity plate not yet indexed. In these cases, ask the seller for the 17-character VIN directly and run a VIN check on CarCheckerVIN for the most accurate history report.",
      },
    },
    {
      "@type": "Question",
      name: "Why do I need to select a state for the plate lookup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "License plates are issued by individual states, not federally. The same alphanumeric sequence (e.g., 'ABC1234') can be active in California, Texas, and New York simultaneously. You must specify the issuing state so the lookup queries the correct state DMV database and returns the right vehicle record.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "License Plate to VIN Lookup", item: `${SITE}/license-plate-lookup` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "License Plate to VIN Lookup",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#what-you-get", "#how-it-works"],
  },
  url: `${SITE}/license-plate-lookup`,
};

/* ─── State coverage grid data ───────────────────────────── */
const STATE_GROUPS = [
  { region: "Northeast", states: ["CT", "DE", "MA", "ME", "MD", "NH", "NJ", "NY", "PA", "RI", "VT"] },
  { region: "South", states: ["AL", "AR", "FL", "GA", "KY", "LA", "MS", "NC", "SC", "TN", "TX", "VA", "WV"] },
  { region: "Midwest", states: ["IA", "IL", "IN", "KS", "MI", "MN", "MO", "ND", "NE", "OH", "SD", "WI"] },
  { region: "West", states: ["AK", "AZ", "CA", "CO", "HI", "ID", "MT", "NM", "NV", "OR", "UT", "WA", "WY"] },
];

export default function LicensePlateLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "License Plate to VIN Lookup" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            License Plate to VIN Lookup
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Enter any US license plate number and state to instantly find the vehicle&rsquo;s VIN —
            then pull the full history report: title brands, accidents, odometer records, and open recalls.
            Free for all 50 states.
          </p>

          {/* Trust badges */}
          <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-slate-600">
            {[
              { icon: Globe, text: "All 50 States" },
              { icon: Shield, text: "DPPA Compliant" },
              { icon: Clock, text: "Instant Results" },
              { icon: Search, text: "Free Lookup" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
                <Icon className="w-3.5 h-3.5 text-primary-600" />
                {text}
              </span>
            ))}
          </div>

          {/* ── Interactive Tool ── */}
          <div className="mt-8" id="tool">
            <LicensePlateLookup />
          </div>

          {/* ── What You Get ── */}
          <section id="what-you-get" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What a Plate Lookup Returns
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              The plate-to-VIN lookup is the first step. Once the VIN is identified you can
              pull the complete vehicle history from NMVTIS, insurance databases, auction
              records, and service history aggregators.
            </p>
            <ul className="space-y-3">
              {[
                { title: "17-character VIN", detail: "The universal vehicle identifier that unlocks every downstream record." },
                { title: "Year, Make, Model & Trim", detail: "Decoded directly from the VIN — manufacturer, plant, body style, and engine." },
                { title: "Title brands", detail: "Salvage, flood, rebuilt, lemon law buyback, hail damage, and non-repairable flags." },
                { title: "Accident & damage records", detail: "Collision reports, insurance claims, and structural damage disclosures from NMVTIS and insurers." },
                { title: "Odometer history", detail: "Mileage at each title transfer — detects rollback fraud before you buy." },
                { title: "Ownership chain", detail: "Number of owners and which states the vehicle was registered in." },
                { title: "Theft status", detail: "NICB and law enforcement records flagging active or recovered stolen vehicles." },
                { title: "Open safety recalls", detail: "NHTSA-reported unrepaired recall campaigns that may affect the vehicle." },
              ].map(({ title, detail }) => (
                <li key={title} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{title}</strong> — {detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── How It Works ── */}
          <section id="how-it-works" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              How License Plate to VIN Lookup Works
            </h2>
            <ol className="space-y-6">
              {[
                {
                  n: 1,
                  title: "Enter the plate number",
                  body: "Type the alphanumeric plate number exactly as it appears — no spaces or special characters. Most US plates are 5–8 characters. Vanity and personalized plates follow their own format; enter them exactly as displayed.",
                },
                {
                  n: 2,
                  title: "Select the issuing state",
                  body: "License plates are issued by individual states, not the federal government. The same plate characters can exist in multiple states simultaneously — \"7ABC123\" is a valid California format but \"ABC1234\" is common in other states. Selecting the correct state directs the query to the right DMV database.",
                },
                {
                  n: 3,
                  title: "Get the VIN and vehicle details",
                  body: "The tool queries state registration records to find the 17-character VIN linked to that plate. Year, make, model, and trim are decoded automatically. From there you can pull the full vehicle history report with one click.",
                },
              ].map(({ n, title, body }) => (
                <li key={n} className="flex gap-4">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">
                    {n}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900">{title}</h3>
                    <p className="mt-1 text-slate-600 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── State coverage ── */}
          <section id="state-coverage" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              State Coverage — All 50 States + DC
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Every US state and the District of Columbia is supported. Select the issuing
              state from the dropdown in the tool above to direct the query to the correct
              motor vehicle database.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATE_GROUPS.map(({ region, states: abbrs }) => (
                <div key={region} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">{region}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {abbrs.map((a) => (
                      <span key={a} className="inline-block px-1.5 py-0.5 bg-white border border-slate-200 rounded text-xs font-mono text-slate-700">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── VIN Check CTA ── */}
          <div className="mt-10">
            <VinCheckBanner />
          </div>

          {/* ── Plate vs VIN ── */}
          <section id="plate-vs-vin" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              License Plate Lookup vs. VIN Search
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <Search className="w-4 h-4" /> License Plate Lookup
                </h3>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li className="flex gap-2"><Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" /> Useful when you only have the plate (street, listing photo)</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" /> Quick verification that the plate matches the vehicle</li>
                  <li className="flex gap-2"><AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" /> May return no results for expired, temp, or out-of-state plates</li>
                  <li className="flex gap-2"><AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" /> Requires knowing the issuing state</li>
                </ul>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Direct VIN Search
                </h3>
                <ul className="space-y-2 text-sm text-emerald-800">
                  <li className="flex gap-2"><Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" /> Most reliable — the VIN is the universal vehicle key</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" /> Works across all databases without state restrictions</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" /> Physically verify VIN on dash, door jamb, and engine bay</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" /> Best for final pre-purchase due diligence</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Best practice: start with the plate lookup to quickly identify the VIN, then confirm
              that VIN physically on the vehicle and run a direct{" "}
              <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">VIN history report</Link>{" "}
              for the definitive pre-purchase check.
            </p>
          </section>

          {/* ── Privacy / Legal ── */}
          <section id="privacy" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Privacy &amp; Legal — DPPA Explained
            </h2>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-slate-700 text-sm leading-relaxed space-y-3">
              <p>
                License plate lookups in the US are governed by the{" "}
                <strong>Driver&rsquo;s Privacy Protection Act (DPPA) of 1994</strong>, a federal law
                restricting access to personal information in state motor vehicle records. Personally
                identifiable data — owner name, address, SSN — cannot be disclosed without a
                permissible purpose.
              </p>
              <p>
                <strong>Permissible purposes</strong> include vehicle purchase verification, insurance
                claims, law enforcement, and litigation support. Our tool is designed for pre-purchase
                vehicle research — a clearly permissible use — and returns vehicle data (VIN, make,
                model, title status) rather than owner personal information.
              </p>
              <p>
                We require a free account to run plate lookups. This is both a DPPA compliance measure
                (we must be able to identify who is accessing the data and for what purpose) and a
                protection against automated scraping of the database.
              </p>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {[
                {
                  q: "Can I find a VIN from a license plate for free?",
                  a: "Yes. Create a free CarCheckerVIN account, enter the plate and state in the tool above, and the VIN is returned instantly along with year, make, and model.",
                },
                {
                  q: "What if the plate lookup returns no results?",
                  a: "No results usually means the plate is expired, a temporary dealer tag, or the registration hasn't been indexed yet. Ask the seller for the 17-character VIN directly and run a VIN check — it's always the more reliable approach for a final pre-purchase check.",
                },
                {
                  q: "Can I look up the owner's name from a license plate?",
                  a: "No. The DPPA prohibits disclosing personal owner information (name, address, date of birth) to the general public without a specific permissible purpose. Our lookup returns vehicle data only — not personal information.",
                },
                {
                  q: "Does the lookup work for commercial plates, dealer plates, or military plates?",
                  a: "Commercial and fleet plates generally work. Dealer temp tags, government plates, diplomatic plates, and military plates may have restricted access due to privacy exemptions or separate registration systems.",
                },
                {
                  q: "How accurate is the plate-to-VIN match?",
                  a: "The match is drawn from state DMV registration records and is highly accurate for currently registered passenger vehicles. Expired registrations, recently transferred plates, or plates issued within the last few days may lag behind the database by 24–72 hours.",
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Related tools ── */}
          <div className="mt-14">
            <RelatedChecks exclude="/license-plate-lookup" />
          </div>
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Don&rsquo;t Have the Plate? Search by VIN.
          </h2>
          <p className="text-slate-600 mb-6">
            A 17-character VIN gives you the most accurate and complete vehicle history.
            Find it on the dashboard, driver-side door jamb, or registration card.
          </p>
          <Link
            href="/vin-check"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            Run a Free VIN Check
          </Link>
        </div>
      </section>
    </>
  );
}
