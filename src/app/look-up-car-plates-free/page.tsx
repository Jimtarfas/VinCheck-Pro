import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Shield,
  Clock,
  Globe,
  Search,
  FileText,
  AlertCircle,
  Sparkles,
  DollarSign,
  Lock,
  Zap,
  Car,
  ArrowRight,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import LicensePlateLookup from "../license-plate-lookup/LicensePlateLookup";
import { states } from "@/lib/states";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: {
    absolute: "Look Up Car Plates Free — License Plate Lookup, 50 States",
  },
  description:
    "Free license plate lookup for all 50 US states. Enter any car plate to see VIN, year, make, model, title brands, accidents, and odometer data.",
  keywords: [
    "look up car plates free",
    "free car plate lookup",
    "free license plate lookup",
    "free plate lookup",
    "free plate search",
    "lookup license plate free",
    "free license plate search",
    "free reverse license plate lookup",
    "look up plates for free",
    "car plate lookup free",
    "license plate lookup no charge",
    "free vehicle plate lookup",
    "search license plate free",
    "free plate number lookup",
    "free DMV plate lookup",
    "free license plate to VIN",
    "no charge license plate lookup",
    "license plate search free no sign up",
    "free car plate search",
    "free plate to VIN",
    "look up a license plate for free",
    "free vehicle history by plate",
    "find car owner by plate free",
    "free plate decoder",
    "license plate VIN free",
    "instant free plate lookup",
    "free plate identification",
    "no fee license plate lookup",
    "free license plate finder",
    "free reverse plate search",
    "100 free plate lookup",
    "totally free plate lookup",
  ],
  alternates: { canonical: "/look-up-car-plates-free" },
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

const SAMPLE_PLATES = [
  { plate: "8XYZ123", state: "California" },
  { plate: "ABC1234", state: "Texas" },
  { plate: "DEF5678", state: "Florida" },
  { plate: "GHI9012", state: "New York" },
];

const FREE_STEPS = [
  {
    step: "1",
    title: "Enter the plate",
    desc: "Type the license plate exactly as it appears on the vehicle. Spaces and dashes are auto-handled.",
    icon: Search,
  },
  {
    step: "2",
    title: "Pick the state",
    desc: "Choose the state where the plate is registered. We support all 50 states plus D.C.",
    icon: Globe,
  },
  {
    step: "3",
    title: "Get the VIN instantly",
    desc: "We instantly resolve the plate to the vehicle's 17-character VIN — no waiting, no payment.",
    icon: Zap,
  },
  {
    step: "4",
    title: "See full vehicle data",
    desc: "Year, make, model, trim, engine, title brands, equipment, and full history records — all free.",
    icon: FileText,
  },
];

const COMPARISON = [
  { feature: "Look up by license plate", us: true, paid1: true, paid2: true },
  { feature: "Cost per single lookup", us: "FREE", paid1: "$24.99", paid2: "$44.99" },
  { feature: "Sign-up required", us: false, paid1: true, paid2: true },
  { feature: "Credit card required", us: false, paid1: true, paid2: true },
  { feature: "All 50 states + D.C.", us: true, paid1: true, paid2: true },
  { feature: "Instant VIN reveal", us: true, paid1: true, paid2: false },
  { feature: "Vehicle photos", us: true, paid1: false, paid2: false },
  { feature: "Equipment & options list", us: true, paid1: false, paid2: false },
  { feature: "No subscription trap", us: true, paid1: false, paid2: false },
];

const FAQS = [
  {
    q: "Is this license plate lookup really 100% free?",
    a: "Yes. Looking up a plate, getting the VIN, and viewing core vehicle details (year, make, model, trim, equipment, title brands) is completely free. No credit card, no trial, no subscription. We do offer optional paid in-depth history reports if you want extra-deep records, but the free lookup gives you everything most buyers need.",
  },
  {
    q: "Do I need to sign up or create an account?",
    a: "You do not need to sign up to start a search. Some optional add-on data (like saving reports to your dashboard) requires a free account, but the core plate-to-VIN lookup itself does not.",
  },
  {
    q: "Which states are supported?",
    a: "All 50 US states plus Washington, D.C. We resolve plates issued by every state DMV and Department of Motor Vehicles equivalent — including California DMV, Texas DMV, Florida DHSMV, New York DMV, and every other agency.",
  },
  {
    q: "Can I look up the owner's name and address?",
    a: "No. Owner personal information is protected by the federal Driver's Privacy Protection Act (DPPA, 18 U.S.C. § 2721). No legitimate consumer service — including ours — can return owner names, addresses, or phone numbers from a plate lookup. Anything claiming otherwise is breaking federal law. We return vehicle data only.",
  },
  {
    q: "How accurate is the free data?",
    a: "Our plate-to-VIN match is sourced from official state DMV records and aggregated from registered title authorities. Once we resolve the VIN, the vehicle decode comes directly from NHTSA, manufacturer build sheets, and licensed history aggregators — the same sources the paid giants use.",
  },
  {
    q: "How is this different from Carfax or AutoCheck plate lookup?",
    a: "Carfax charges $44.99 per plate lookup and AutoCheck charges $24.99. Both require a paid account before they reveal anything beyond the year and make. We give you the VIN, equipment list, and history records for free, with optional upgrades only if you need extra-deep records.",
  },
  {
    q: "Can I look up classic, motorcycle, or commercial plates?",
    a: "Yes. Our database covers passenger plates, motorcycle plates, commercial plates, vanity plates, dealer plates, and historic/antique plates across all 50 states.",
  },
  {
    q: "Is there a limit on free lookups?",
    a: "Casual users are not limited. We apply a fair-use rate limit only for clearly automated scraping behavior to keep the service fast for everyone.",
  },
];

const TOP_STATES = [
  "California", "Texas", "Florida", "New York", "Pennsylvania",
  "Illinois", "Ohio", "Georgia", "North Carolina", "Michigan",
];

export default function LookUpCarPlatesFreePage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Look Up Car Plates Free" },
  ];

  /* ── JSON-LD ─────────────────────────────────────────────── */

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free License Plate Lookup — Look Up Car Plates Free",
    url: `${SITE}/look-up-car-plates-free`,
    applicationCategory: "AutomotiveApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free license plate lookup for all 50 US states. Resolve any plate to its VIN and get full vehicle data — no sign-up, no credit card, no fee.",
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
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to look up a car plate for free",
    description:
      "Step-by-step guide to looking up any US license plate for free, no sign-up required.",
    totalTime: "PT30S",
    step: FREE_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.desc,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Look Up Car Plates Free",
        item: `${SITE}/look-up-car-plates-free`,
      },
    ],
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".speakable-summary"],
    },
    url: `${SITE}/look-up-car-plates-free`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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

      <main className="bg-surface min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Hero */}
        <section className="px-4 sm:px-6 pb-10 sm:pb-14">
          <div className="max-w-6xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              100% Free · No Sign-Up · All 50 States
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold text-primary mb-4 sm:mb-6 tracking-tight">
              Look Up Car Plates Free
            </h1>
            <p className="speakable-summary text-base sm:text-lg text-on-surface-variant max-w-3xl mx-auto mb-6 sm:mb-8">
              Enter any US license plate and state — we&apos;ll instantly return the VIN, year, make, model,
              trim, engine, title brands, and history records.{" "}
              <span className="font-bold text-primary">No credit card. No subscription. No catch.</span>
            </p>

            {/* Trust stats */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-2 text-xs sm:text-sm">
              <span className="inline-flex items-center gap-1.5 text-on-surface-variant">
                <DollarSign className="w-4 h-4 text-green-500" /> Always free
              </span>
              <span className="inline-flex items-center gap-1.5 text-on-surface-variant">
                <Lock className="w-4 h-4 text-primary" /> DPPA compliant
              </span>
              <span className="inline-flex items-center gap-1.5 text-on-surface-variant">
                <Zap className="w-4 h-4 text-secondary" /> Results in 5 seconds
              </span>
              <span className="inline-flex items-center gap-1.5 text-on-surface-variant">
                <Globe className="w-4 h-4 text-primary" /> 50 states + D.C.
              </span>
            </div>
          </div>
        </section>

        {/* Interactive lookup tool */}
        <section className="px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <LicensePlateLookup />
          </div>
        </section>

        {/* VIN check banner */}
        <section className="px-4 sm:px-6 mt-12 sm:mt-16">
          <div className="max-w-6xl mx-auto">
            <VinCheckBanner variant="card" />
          </div>
        </section>

        {/* How it works — 4 steps */}
        <section className="px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 block">
                How It Works
              </span>
              <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
                Free in 4 Steps · Under 30 Seconds
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto">
                Most paid services make you sign up, hand over a credit card, and wait through upsells before
                you see anything. We don&apos;t.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {FREE_STEPS.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.step}
                    className="relative rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-3xl font-headline font-black text-primary/15">
                        {s.step}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-2">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Free vs Paid comparison */}
        <section className="px-4 sm:px-6 py-12 sm:py-20 bg-surface-container-lowest">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 block">
                Why Pay $44.99?
              </span>
              <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
                Free vs. The Paid Giants
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto">
                The same data, none of the paywalls. Here&apos;s how a free plate lookup with us stacks up
                against Carfax and AutoCheck.
              </p>
            </div>

            <div className="rounded-3xl border border-outline-variant bg-surface overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[560px]">
                  <thead className="bg-surface-container-low">
                    <tr>
                      <th className="p-4 sm:p-5 text-left font-headline text-sm sm:text-base text-primary font-extrabold">
                        Feature
                      </th>
                      <th className="p-4 sm:p-5 text-center font-headline text-sm sm:text-base text-white font-black bg-primary">
                        VINCheck Pro
                      </th>
                      <th className="p-4 sm:p-5 text-center font-headline text-sm sm:text-base text-on-surface-variant font-bold">
                        AutoCheck
                      </th>
                      <th className="p-4 sm:p-5 text-center font-headline text-sm sm:text-base text-on-surface-variant font-bold">
                        Carfax
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row, i) => (
                      <tr
                        key={row.feature}
                        className={`border-t border-outline-variant/60 ${
                          i === 1 ? "bg-primary/[0.03]" : ""
                        }`}
                      >
                        <td className="p-3 sm:p-4 text-xs sm:text-sm font-semibold text-on-surface">
                          {row.feature}
                        </td>
                        <td className="p-3 sm:p-4 text-center bg-primary/[0.06]">
                          {typeof row.us === "boolean" ? (
                            row.us ? (
                              <Check className="w-5 h-5 text-green-500 mx-auto" strokeWidth={3} />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-error/70 mx-auto" />
                            )
                          ) : (
                            <span className="text-base sm:text-lg font-headline font-black text-primary">
                              {row.us}
                            </span>
                          )}
                        </td>
                        <td className="p-3 sm:p-4 text-center">
                          {typeof row.paid1 === "boolean" ? (
                            row.paid1 ? (
                              <Check className="w-5 h-5 text-on-surface-variant mx-auto" />
                            ) : (
                              <span className="text-error/70 text-xs font-bold">No</span>
                            )
                          ) : (
                            <span className="text-sm font-headline font-bold text-on-surface-variant">
                              {row.paid1}
                            </span>
                          )}
                        </td>
                        <td className="p-3 sm:p-4 text-center">
                          {typeof row.paid2 === "boolean" ? (
                            row.paid2 ? (
                              <Check className="w-5 h-5 text-on-surface-variant mx-auto" />
                            ) : (
                              <span className="text-error/70 text-xs font-bold">No</span>
                            )
                          ) : (
                            <span className="text-sm font-headline font-bold text-on-surface-variant">
                              {row.paid2}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Sample lookups */}
        <section className="px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-3">
                Try a Sample Lookup
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant">
                Not sure where to start? Here are example plate formats from popular states.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {SAMPLE_PLATES.map((s) => (
                <div
                  key={s.plate}
                  className="rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-lowest p-4 sm:p-5 text-center hover:border-primary/40 transition-colors"
                >
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-1.5">
                    {s.state}
                  </div>
                  <div className="font-mono text-lg sm:text-2xl font-black text-primary tracking-wider">
                    {s.plate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="px-4 sm:px-6 py-12 sm:py-20 bg-surface-container-lowest">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 block">
                What You Get — Free
              </span>
              <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
                Everything Below Is Included at $0
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: Search, title: "VIN Reveal", desc: "Full 17-character VIN resolved instantly from the plate." },
                { icon: Car, title: "Vehicle Specs", desc: "Year, make, model, trim, engine, transmission, drivetrain." },
                { icon: Shield, title: "Title Brands", desc: "Salvage, flood, lemon, junk, rebuilt — every brand on record." },
                { icon: Clock, title: "Odometer Records", desc: "Mileage history from inspections, sales, and DMV updates." },
                { icon: FileText, title: "Equipment List", desc: "Original options, packages, paint code, and factory equipment." },
                { icon: AlertCircle, title: "Recall Notices", desc: "Active NHTSA recalls and manufacturer service campaigns." },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">
                      {f.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* State directory */}
        <section className="px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
                Free Plate Lookup in All 50 States
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto">
                We support every US state DMV. Click your state for state-specific plate format guides and
                title brand notes.
              </p>
            </div>

            <div className="mb-6 sm:mb-8">
              <h3 className="text-sm font-black uppercase tracking-wider text-primary mb-3">
                Most Searched States
              </h3>
              <div className="flex flex-wrap gap-2">
                {TOP_STATES.map((name) => {
                  const s = states.find((st) => st.name === name);
                  if (!s) return null;
                  return (
                    <Link
                      key={s.slug}
                      href={`/state-vin-check/${s.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary text-white text-xs sm:text-sm font-bold hover:brightness-110 transition-all"
                    >
                      {s.name} <ArrowRight className="w-3 h-3" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-on-surface-variant mb-3">
                All States
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {states.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/state-vin-check/${s.slug}`}
                    className="px-3 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs sm:text-sm font-semibold text-on-surface hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DPPA notice */}
        <section className="px-4 sm:px-6 pb-12 sm:pb-16">
          <div className="max-w-4xl mx-auto rounded-2xl border border-outline-variant bg-surface-container-low p-5 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">
                  About Owner Privacy (DPPA)
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Under the federal Driver&apos;s Privacy Protection Act (18 U.S.C. § 2721),{" "}
                  <span className="font-semibold">no consumer plate lookup service can return owner names,
                  addresses, or phone numbers</span> — including ours. We return vehicle data only (VIN,
                  specs, history). Any service claiming otherwise is operating illegally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mid-page banner */}
        <section className="px-4 sm:px-6 pb-12 sm:pb-16">
          <div className="max-w-6xl mx-auto">
            <VinCheckBanner />
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 sm:px-6 py-12 sm:py-20 bg-surface-container-lowest">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant">
                Everything people ask before running a free plate lookup.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
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
                  <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-4 sm:px-6 py-14 sm:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
              Ready to Look Up a Plate — Free?
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-6 sm:mb-8 max-w-xl mx-auto">
              Scroll back up, drop in any US plate, and get the VIN plus full vehicle data. No card. No
              account. Always free.
            </p>
            <Link
              href="#plate"
              className="inline-flex items-center gap-2 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base text-on-secondary-container hover:brightness-110 hover:shadow-lg transition-all shadow-md"
              style={{ background: "var(--color-secondary-container)" }}
            >
              Run Free Plate Lookup
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Related */}
        <section className="px-4 sm:px-6 pb-16 sm:pb-24">
          <div className="max-w-6xl mx-auto">
            <RelatedChecks exclude="/look-up-car-plates-free" />
          </div>
        </section>
      </main>
    </>
  );
}
