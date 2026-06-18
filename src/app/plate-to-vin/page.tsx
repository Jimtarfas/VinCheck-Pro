import type { Metadata } from "next";
import Link from "next/link";
import { Check, Shield, Clock, Globe, Search, FileText, Hash, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import LicensePlateLookup from "../license-plate-lookup/LicensePlateLookup";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: {
    absolute: "Plate to VIN — Convert Any License Plate to a VIN Free",
  },
  description:
    "Plate to VIN: enter a license plate and state to instantly get the 17-character VIN, year, make, model, and full vehicle history. Free, all 50 states.",
  keywords: [
    "plate to VIN",
    "plate to VIN lookup",
    "license plate to VIN",
    "convert plate to VIN",
    "plate to VIN free",
    "plate number to VIN",
    "get VIN from plate",
    "find VIN by plate",
    "license plate VIN decoder",
  ],
  alternates: { canonical: "/plate-to-vin" },
  openGraph: {
    title: "Plate to VIN — Convert Any License Plate to a VIN Free",
    description:
      "Enter a license plate and state to instantly get the VIN, year, make, model, and full vehicle history. Free, all 50 states.",
    url: `${SITE}/plate-to-vin`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plate to VIN — Convert Any License Plate to a VIN Free",
    description:
      "Enter a license plate and state to instantly get the VIN, year, make, model, and full vehicle history. Free, all 50 states.",
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
  name: "Plate to VIN",
  description:
    "Free plate-to-VIN tool. Enter any US license plate number and state to instantly retrieve the VIN, decoded vehicle details, and a full history report.",
  url: `${SITE}/plate-to-vin`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Convert a license plate to a VIN",
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
  name: "How to Convert a License Plate to a VIN",
  description:
    "Use CarCheckerVIN's free plate-to-VIN tool to turn any US license plate into a VIN in three steps.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter the license plate",
      text: "Type the plate number exactly as it appears on the vehicle — letters and digits only, no spaces or dashes.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Select the issuing state",
      text: "Choose the state that issued the plate. The same plate characters can exist in multiple states, so the state is required for an accurate match.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Get the VIN",
      text: "Click the button to convert the plate to its 17-character VIN, decoded year, make, and model — then open the full vehicle history report.",
    },
  ],
};

const FAQS = [
  {
    q: "How do I convert a license plate to a VIN?",
    a: "Enter the plate number and select the issuing state in the tool above, then run the lookup. We resolve the plate against state DMV registration records and return the 17-character VIN, plus the decoded year, make, and model.",
  },
  {
    q: "Is plate-to-VIN free?",
    a: "Yes. Converting a plate to a VIN and viewing the decoded year, make, and model is free for personal pre-purchase research. An optional in-depth history report is available once you have the VIN.",
  },
  {
    q: "Why do I need to pick a state?",
    a: "Plates are issued by individual states, not federally. The same sequence (e.g., ABC1234) can be active in several states at once, so selecting the issuing state directs the query to the correct DMV database.",
  },
  {
    q: "What if no VIN comes back?",
    a: "No result usually means the plate is expired, a temporary dealer tag, out of state, or not yet indexed. Ask the seller for the 17-character VIN and run a direct VIN check instead — it is always the most reliable path.",
  },
  {
    q: "Can I get the owner's name from the plate?",
    a: "No. The federal Driver's Privacy Protection Act (DPPA) prohibits returning owner personal information to the public. Our tool returns vehicle data only — VIN, make, model, and title status.",
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
    { "@type": "ListItem", position: 2, name: "Plate to VIN", item: `${SITE}/plate-to-vin` },
  ],
};

export default function PlateToVinPage() {
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
              { label: "Plate to VIN" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Plate to VIN
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Turn any US license plate into a VIN in seconds. Enter the plate, pick the state, and
            we&rsquo;ll return the 17-character VIN with the decoded year, make, and model —
            then unlock the full history report. Free for all 50 states.
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

          {/* ── How It Works ── */}
          <section id="how-it-works" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              How Plate to VIN Works
            </h2>
            <ol className="space-y-6">
              {[
                {
                  n: 1,
                  title: "Enter the plate number",
                  body: "Type the plate exactly as it appears — letters and digits only. Most US plates are 5–8 characters; vanity plates follow their own format.",
                },
                {
                  n: 2,
                  title: "Select the issuing state",
                  body: "The same plate can exist in several states at once. Choosing the issuing state sends the query to the correct DMV record so the VIN match is accurate.",
                },
                {
                  n: 3,
                  title: "Get the VIN and vehicle details",
                  body: "We resolve the plate to its 17-character VIN and decode the year, make, model, and trim automatically — then you can pull the full history report in one click.",
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

          {/* ── What you get ── */}
          <section id="what-you-get" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What the VIN Unlocks
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              The VIN is the universal vehicle key. Once the plate resolves to a VIN, you can pull
              the complete history from NMVTIS, insurance databases, and auction records.
            </p>
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

          {/* ── Related angle: only have the state? ── */}
          <section className="mt-14">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-start gap-3">
              <Hash className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700 text-sm leading-relaxed">
                Looking for a state-specific entry point? The{" "}
                <Link href="/state-to-vin" className="text-primary-600 hover:underline font-medium">State to VIN tool</Link>{" "}
                walks you through choosing the issuing state first. Already have the 17-character
                VIN? Skip the plate step and run a{" "}
                <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">free VIN check</Link>{" "}
                directly.
              </p>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Plate to VIN — FAQ
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
            <RelatedChecks exclude="/plate-to-vin" />
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
