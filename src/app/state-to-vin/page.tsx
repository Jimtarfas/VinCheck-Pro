import type { Metadata } from "next";
import Link from "next/link";
import { Check, Shield, Clock, Globe, Search, MapPin, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import LicensePlateLookup from "../license-plate-lookup/LicensePlateLookup";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: {
    absolute: "State to VIN — Find a VIN by State and License Plate, Free",
  },
  description:
    "State to VIN: pick the issuing state, enter the license plate, and get the VIN, year, make, model, and full history. Free for all 50 states + D.C.",
  keywords: [
    "state to VIN",
    "VIN by state",
    "find VIN by state and plate",
    "state license plate to VIN",
    "DMV plate to VIN by state",
    "state plate lookup VIN",
    "VIN lookup by state",
    "plate to VIN by state",
  ],
  alternates: { canonical: "/state-to-vin" },
  openGraph: {
    title: "State to VIN — Find a VIN by State and License Plate, Free",
    description:
      "Pick the issuing state, enter the plate, and get the VIN, year, make, model, and full history. Free for all 50 states + D.C.",
    url: `${SITE}/state-to-vin`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "State to VIN — Find a VIN by State and License Plate, Free",
    description:
      "Pick the issuing state, enter the plate, and get the VIN, year, make, model, and full history. Free for all 50 states + D.C.",
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
  name: "State to VIN",
  description:
    "Free state-to-VIN tool. Choose the issuing state, enter the license plate, and instantly retrieve the VIN, decoded vehicle details, and a full history report.",
  url: `${SITE}/state-to-vin`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Look up a VIN by state and plate",
    "All 50 US states + D.C.",
    "Instant year, make, model decode",
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
  name: "How to Find a VIN by State and License Plate",
  description:
    "Use CarCheckerVIN's free state-to-VIN tool to resolve a VIN from a state and license plate in three steps.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Select the issuing state",
      text: "Choose the US state that issued the plate. Each state's DMV database is queried separately, so the state must be correct.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter the license plate",
      text: "Type the plate number exactly as it appears on the vehicle — letters and digits only, no spaces or dashes.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Get the VIN",
      text: "Run the lookup to return the 17-character VIN, decoded year, make, and model — then open the full vehicle history report.",
    },
  ],
};

const FAQS = [
  {
    q: "Why does the VIN lookup need the state?",
    a: "License plates are issued by individual states, not the federal government. The same plate sequence can be active in California, Texas, and New York at once, so the issuing state is required to query the correct DMV database and return the right vehicle.",
  },
  {
    q: "Which states are supported?",
    a: "All 50 US states plus the District of Columbia. Every state's motor-vehicle registration database is supported — select the issuing state from the dropdown in the tool.",
  },
  {
    q: "Is state-to-VIN lookup free?",
    a: "Yes. Resolving a plate to a VIN and viewing the decoded year, make, and model is free for personal pre-purchase research. A deeper paid history report is optional once you have the VIN.",
  },
  {
    q: "What if I pick the wrong state?",
    a: "An incorrect state usually returns no match, since the plate won't exist in that state's records. Re-run the lookup with the correct issuing state — it's printed on the plate's sticker or registration card.",
  },
  {
    q: "Can I see the owner's name by state?",
    a: "No. The federal Driver's Privacy Protection Act (DPPA) restricts owner personal information regardless of state. Our tool returns vehicle data only — VIN, make, model, and title status.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "State to VIN", item: `${SITE}/state-to-vin` },
  ],
};

/* State coverage grid */
const STATE_GROUPS = [
  { region: "Northeast", states: ["CT", "DE", "MA", "ME", "MD", "NH", "NJ", "NY", "PA", "RI", "VT"] },
  { region: "South", states: ["AL", "AR", "FL", "GA", "KY", "LA", "MS", "NC", "SC", "TN", "TX", "VA", "WV"] },
  { region: "Midwest", states: ["IA", "IL", "IN", "KS", "MI", "MN", "MO", "ND", "NE", "OH", "SD", "WI"] },
  { region: "West", states: ["AK", "AZ", "CA", "CO", "HI", "ID", "MT", "NM", "NV", "OR", "UT", "WA", "WY"] },
];

export default function StateToVinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "State to VIN" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            State to VIN
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Find a vehicle&rsquo;s VIN by its issuing state and license plate. Choose the state,
            enter the plate, and we&rsquo;ll return the 17-character VIN with the decoded year, make,
            and model — then unlock the full history report. Free for all 50 states and D.C.
          </p>

          {/* Trust badges */}
          <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-slate-600">
            {[
              { icon: Globe, text: "50 States + D.C." },
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

          {/* ── How It Works ── */}
          <section id="how-it-works" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              How State to VIN Works
            </h2>
            <ol className="space-y-6">
              {[
                {
                  n: 1,
                  title: "Select the issuing state",
                  body: "Each state runs its own DMV registration database. Picking the issuing state first directs the query to the right records — this is the step that makes the match accurate.",
                },
                {
                  n: 2,
                  title: "Enter the plate number",
                  body: "Type the plate exactly as printed — letters and digits only. The same plate characters can repeat across states, which is why the state matters.",
                },
                {
                  n: 3,
                  title: "Get the VIN and vehicle details",
                  body: "We resolve the plate to its 17-character VIN and decode the year, make, model, and trim — then you can pull the complete history report with one click.",
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
              Every State Supported — 50 States + D.C.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Select any state in the dropdown above to route the query to that state&rsquo;s motor
              vehicle database. Coverage spans every region:
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

          {/* ── What you get ── */}
          <section id="what-you-get" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What the VIN Unlocks
            </h2>
            <ul className="space-y-3">
              {[
                { title: "17-character VIN", detail: "The identifier every downstream record is keyed to." },
                { title: "Year, Make, Model & Trim", detail: "Decoded straight from the VIN — manufacturer, body style, and engine." },
                { title: "Title brands", detail: "Salvage, flood, rebuilt, lemon-law buyback, and non-repairable flags." },
                { title: "Accident & damage records", detail: "Collision reports and insurance claims from NMVTIS and insurers." },
                { title: "Odometer history", detail: "Mileage at each title transfer — exposes rollback fraud." },
                { title: "Open safety recalls", detail: "NHTSA-reported unrepaired recall campaigns." },
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

          {/* ── VIN Check CTA ── */}
          <div className="mt-10">
            <VinCheckBanner />
          </div>

          {/* ── Cross-link ── */}
          <section className="mt-14">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700 text-sm leading-relaxed">
                Prefer to start with the plate number? Use the{" "}
                <Link href="/plate-to-vin" className="text-primary-600 hover:underline font-medium">Plate to VIN tool</Link>.
                Already have the 17-character VIN? Skip the plate step and run a{" "}
                <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">free VIN check</Link>{" "}
                directly.
              </p>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              State to VIN — FAQ
            </h2>
            <dl className="space-y-6">
              {FAQS.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Related tools ── */}
          <div className="mt-14">
            <RelatedChecks exclude="/state-to-vin" />
          </div>
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Already Have the VIN? Run a Full Check.
          </h2>
          <p className="text-slate-600 mb-6">
            A 17-character VIN gives you the most accurate and complete vehicle history. Find it on
            the dashboard, driver-side door jamb, or registration card.
          </p>
          <Link
            href="/vin-check"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            Run a Free VIN Check <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
