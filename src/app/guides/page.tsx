import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import { BookOpen, Hash, Search, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import { states } from "@/lib/states";

export const metadata: Metadata = {
  title: "VIN Guides & Resources — Learn Everything About VIN Numbers",
  description:
    "Free VIN guides and resources. Learn how to read a VIN, what a VIN number means, and how to decode any vehicle identification number for free.",
  keywords: [
    "VIN guides",
    "VIN resources",
    "VIN number guide",
    "vehicle identification number guide",
    "VIN help",
    "learn about VIN numbers",
  ],
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "VIN Guides & Resources — Learn Everything About VIN Numbers",
    description:
      "Free VIN guides and resources. Learn how to read a VIN, what a VIN number means, and how to decode any vehicle identification number for free.",
    url: "https://www.carcheckervin.com/guides",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a VIN and what does it reveal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A VIN (Vehicle Identification Number) is the unique 17-character code assigned to every car, truck, and motorcycle built since the 1981 model year. Encoded within it are the country of origin, manufacturer, make, model, body style, engine type, model year, and a unique serial number. Decoded against title and history databases, the VIN also unlocks a vehicle's title brands, accident records, odometer readings, and theft history.",
      },
    },
    {
      "@type": "Question",
      name: "How do I read a VIN number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Read a 17-character VIN in three sections: characters 1-3 are the World Manufacturer Identifier (country and maker), characters 4-9 are the Vehicle Descriptor Section (model, body, engine, plus a check digit in position 9), and characters 10-17 are the Vehicle Identifier Section. The 10th character is the model year and the 11th is the assembly plant. Our 'How to Read a VIN Number' guide breaks down all 17 positions one by one.",
      },
    },
    {
      "@type": "Question",
      name: "Which character of the VIN is the model year?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 10th character of a standardized 17-digit VIN encodes the model year. The year code uses a repeating cycle of letters and numbers — for example, the letters B through Y (skipping I, O, Q, U, and Z) cover 1981 onward, then digits 1 through 9 are reused, and the cycle repeats every 30 years. Cross-checking the 10th character against the rest of the VIN helps confirm a vehicle hasn't been misrepresented.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best way to check a used car's history?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most reliable starting point is a VIN-based history check sourced from NMVTIS (the National Motor Vehicle Title Information System), the federal database that aggregates title brands from all 50 state DMVs, insurers, and salvage yards. Combine the VIN report with the seller's service records and an independent pre-purchase inspection. Our 'Free VIN Check' guide explains what a free report reveals and how it compares to premium reports.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I learn how to decode a VIN for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with our free guides: 'How to Read a VIN Number' walks through every position, 'What Is a VIN Number?' covers the history and where to find the VIN on a vehicle, and 'Free VIN Check' explains how to turn a decoded VIN into a full history report. You can also enter any 17-character VIN into the search tool on this site to decode it instantly at no cost.",
      },
    },
    {
      "@type": "Question",
      name: "Why do all VINs have exactly 17 characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Since the 1981 model year, U.S. regulators (and the ISO 3779 international standard) have required every road vehicle to carry a standardized 17-character VIN. The fixed length and structure let any decoder anywhere identify the vehicle consistently. Vehicles built before 1981 may have shorter VINs of varying length and formats, which is why pre-1981 decoding is far less standardized.",
      },
    },
    {
      "@type": "Question",
      name: "Do VIN rules differ by state when buying a used car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 17-character VIN format is national, but title rules, lemon laws, common title brands, and DMV transfer requirements vary state by state. A salvage or buyback brand recorded in one state follows the VIN through NMVTIS, but the paperwork and inspections you face at purchase depend on where you register the vehicle. Our state-by-state buying guides cover the specific title rules and red flags for each state.",
      },
    },
    {
      "@type": "Question",
      name: "Where do I find the VIN on a vehicle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The VIN appears in several places: on the driver's-side dashboard (visible through the windshield), on the driver's-side door jamb sticker, on the vehicle title and registration, and on insurance documents. It is also stamped on major components such as the engine and frame. Confirming the VIN matches across all these locations is a quick way to spot tampering or VIN cloning.",
      },
    },
  ],
};

const FAQS = faqSchema.mainEntity.map((q) => ({
  question: q.name,
  answer: q.acceptedAnswer.text,
}));

const guides = [
  {
    href: "/guides/how-to-read-a-vin",
    icon: Hash,
    title: "How to Read a VIN Number",
    description:
      "Understand all 17 positions of a VIN. Learn what each digit represents, from the country of origin to the unique serial number.",
    color: "bg-primary-50 text-primary-600",
  },
  {
    href: "/guides/what-is-a-vin-number",
    icon: BookOpen,
    title: "What Is a VIN Number?",
    description:
      "A complete introduction to Vehicle Identification Numbers: their history, why they exist, and where to find them on any vehicle.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    href: "/guides/free-vin-check",
    icon: Search,
    title: "Free VIN Check",
    description:
      "Learn what information a free VIN check reveals, how it compares to premium reports, and why every buyer should run one before purchasing.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export default function GuidesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Guides" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900">
            VIN Guides & Resources
          </h1>
          <p className="mt-4 text-lg text-slate-700 max-w-2xl leading-relaxed">
            Everything you need to know about Vehicle Identification Numbers. Our
            free guides help you decode, understand, and use VINs to make smarter
            vehicle decisions.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5">
            {guides.map(({ href, icon: Icon, title, description, color }) => (
              <Link
                key={href}
                href={href}
                className="flex gap-5 p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-md hover:border-primary-200 transition-all group"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                    {title}
                  </h2>
                  <p className="mt-1.5 text-slate-700 leading-relaxed">
                    {description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Buying a Used Car by State
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed mb-6 max-w-2xl">
            State-specific buying guides covering DMV title rules, lemon laws,
            common title brands, and what to verify before purchase. Pick your
            state below.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {states.map((s) => (
              <Link
                key={s.slug}
                href={`/guides/buying-used-car-in/${s.slug}`}
                className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-primary-200 hover:text-primary-700 hover:bg-primary-50/30 transition-all"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            VIN Guides FAQ
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6 max-w-2xl">
            Quick answers to the most common questions about VIN numbers,
            decoding, and checking a vehicle&apos;s history.
          </p>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.question}
                className="group bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-base sm:text-lg font-bold text-slate-900 pr-2">
                    {f.question}
                  </span>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-2xl font-light leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-700 leading-relaxed">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Ready to Check a Vehicle?
          </h2>
          <p className="text-slate-700 mb-6">
            Enter any 17-character VIN to get an instant vehicle report.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
