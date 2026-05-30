import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, ShieldCheck, BookOpen } from "lucide-react";
import { makes } from "@/lib/makes";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: {
    absolute: "Free VIN Check by Make — Decode Any Vehicle",
  },
  description:
    "Free VIN check and decoder for every car brand. Look up any make and model and get instant vehicle history, specs, recalls, and market data.",
  keywords: [
    "VIN check", "VIN decoder", "free VIN check", "VIN lookup", "vehicle history report",
    "car VIN check", "check VIN number", "VIN number lookup", "decode VIN",
    "vehicle identification number", "car history check",
  ],
  alternates: { canonical: "/vin-check" },
  openGraph: {
    title: "Free VIN Check by Make — Every Brand Covered",
    description: "Free VIN check and decoder for every car brand. Look up any make and model and get instant vehicle history, specs, recalls, and market data.",
    type: "website",
  },
};

const regions = [
  { label: "American", makes: makes.filter((m) => m.country === "USA") },
  { label: "Japanese", makes: makes.filter((m) => m.country === "Japan") },
  { label: "Korean", makes: makes.filter((m) => m.country === "South Korea") },
  { label: "German", makes: makes.filter((m) => m.country === "Germany") },
  { label: "European", makes: makes.filter((m) => ["UK", "Sweden", "Italy"].includes(m.country)) },
];

const freeIncludes = [
  "Make, model, year, and trim",
  "Engine, transmission, and drivetrain",
  "Body style and country of manufacture",
  "Plant code and the year the VIN encodes",
];

const paidIncludes = [
  "Title brands (salvage, flood, rebuilt)",
  "Odometer and ownership history",
  "Accident and total-loss records",
  "Open safety recalls and market value",
];

const faqs = [
  {
    q: "Is a VIN check really free?",
    a: "Yes. Decoding a VIN to reveal a vehicle's make, model, year, engine, transmission, drivetrain, and factory specifications is completely free here — no signup or credit card. You only pay if you want a full history report covering title brands, odometer records, accidents, and recalls.",
  },
  {
    q: "What does a free VIN check show you?",
    a: "A free VIN check decodes the 17 characters of the Vehicle Identification Number into the manufacturer specifications: make, model, model year, engine and transmission, body style, drivetrain, and the assembly plant. It confirms a listing matches the actual vehicle, which is the first step before any used-car purchase.",
  },
  {
    q: "What's the difference between a free check and a paid report?",
    a: "A free check covers what the VIN itself encodes — the factory specs. A paid history report adds the records that accumulate over a vehicle's life: title brands, salvage and flood events, odometer readings, prior accidents, theft records, and open recalls. For a purchase decision, the history report is what protects you from title washing and hidden damage.",
  },
  {
    q: "Are there other places to get a free VIN check?",
    a: "Yes. The NHTSA vPIC tool decodes VINs and lists open recalls for free, and the NICB VINCheck service lets you see whether a VIN has been reported stolen or declared a salvage total loss by participating insurers (limited to a few searches per day). These government and non-profit tools complement a full commercial history report rather than replace it.",
  },
  {
    q: "Can I trust a free VIN check before buying a used car?",
    a: "A free VIN decode is reliable for confirming the vehicle's identity and specifications. But it cannot reveal whether the car was flooded, salvaged, clocked, or branded a lemon — those live in title and insurance records. Always pair a free decode with a full history report before money changes hands.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function VinCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs onDark items={[{ label: "Home", href: "/" }, { label: "VIN Check" }]} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Free VIN Check & Decoder</h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">
            Decode any Vehicle Identification Number to get a comprehensive vehicle report. Select your vehicle brand below or enter a VIN directly.
          </p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" onDark />
          </div>
        </div>
      </section>

      {/* Editorial intro — satisfies informational intent for "free vin check" */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What a Free VIN Check Shows You</h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              A VIN check decodes the 17-character Vehicle Identification Number stamped on every car built since 1981. Those characters aren&apos;t random — they encode the manufacturer, the assembly plant, the model year, and the vehicle&apos;s core specifications. Running a free VIN check is the fastest way to confirm that a listing matches the actual car in front of you before you ever hand over money.
            </p>
            <p>
              Decoding the VIN is free here, and it&apos;s the first step every used-car buyer should take. The decode tells you what the vehicle <em>is</em>; a full history report then tells you what has <em>happened</em> to it — the title brands, odometer records, and accident history that the VIN alone can&apos;t reveal. Below is exactly what each covers.
            </p>
          </div>
        </div>
      </section>

      {/* Free vs paid — what the SERP roundup winners all address */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Free VIN Check vs. Full History Report</h2>
          <p className="text-slate-700 mb-8">A free decode covers the factory specs. A history report adds the records that accumulate over the car&apos;s life.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">Free VIN Decode</h3>
              <ul className="space-y-2.5">
                {freeIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-white rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">Full History Report</h3>
              <ul className="space-y-2.5">
                {paidIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2.5 text-sm text-slate-400">
                  <X className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
                  <span>Not available from a free decode alone</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Other free sources + link to the in-depth guide (hub → spoke) */}
          <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Other free VIN resources</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The federal <span className="font-medium text-slate-800">NHTSA vPIC</span> tool decodes VINs and lists open recalls, and the non-profit <span className="font-medium text-slate-800">NICB VINCheck</span> shows whether a VIN was reported stolen or declared a salvage total loss by participating insurers. They&apos;re useful complements to a full history report — not a replacement, since neither shows complete title or odometer history.
                </p>
              </div>
            </div>
          </div>

          <Link href="/guides/free-vin-check" className="inline-flex items-center gap-2 mt-6 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors">
            <BookOpen className="w-4 h-4" />
            Read the full guide: free vs. paid VIN checks, scams to avoid, and how to read a report
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">VIN Check by Vehicle Brand</h2>
          <p className="text-slate-700 mb-10">Select a manufacturer to learn more about their VIN format and decode any VIN</p>

          {regions.map(({ label, makes: regionMakes }) => (
            <div key={label} className="mb-10">
              <h3 className="text-lg font-bold text-slate-800 mb-4">{label} Brands</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {regionMakes.map((m) => (
                  <Link key={m.slug} href={`/vin-check/${m.slug}`}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all group">
                    <span className="font-semibold text-slate-800 group-hover:text-primary-700 transition-colors">{m.name}</span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-primary-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ — informational sub-queries, matched to FAQPage schema */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Free VIN Check FAQ</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="p-6 bg-white rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">{q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Check Any VIN Now</h2>
          <p className="text-primary-100 mb-6">Works with all makes and models from 1981 onwards</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
