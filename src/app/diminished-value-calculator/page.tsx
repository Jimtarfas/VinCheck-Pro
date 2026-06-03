import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  TrendingDown,
  Scale,
  FileText,
  AlertTriangle,
  Car,
  Gauge,
  Stamp,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import DiminishedValueCalculator from "./DiminishedValueCalculator";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Free Diminished Value Calculator — 17c Formula & Real Market Loss",
  description:
    "Calculate the diminished value of your car after an accident with the insurer's 17c formula, then see the realistic market loss range. Free, instant, no sign-up — built to help you negotiate a fair diminished value claim.",
  keywords: [
    "diminished value calculator",
    "17c diminished value calculator",
    "diminished value formula",
    "car diminished value after accident",
    "how to calculate diminished value",
    "diminished value claim calculator",
    "inherent diminished value",
    "diminished value of car after accident",
    "auto diminished value calculator",
    "vehicle diminished value estimate",
    "17c formula",
    "mabry v state farm formula",
    "diminished value appraisal",
    "post accident value loss calculator",
    "trade in value after accident",
    "diminished value claim",
    "third party diminished value",
    "diminished value georgia",
    "what is my car worth after an accident",
    "accident car value loss",
    "diminished value insurance claim",
    "calculate loss of value car",
    "diminished value of vehicle",
    "car value drop after accident",
    "free diminished value calculator",
  ],
  alternates: { canonical: "/diminished-value-calculator" },
  openGraph: {
    title: "Free Diminished Value Calculator — 17c Formula & Real Market Loss",
    description:
      "See what your car lost in value after an accident. Runs the insurer's 17c formula and the realistic market range so you can negotiate a fair diminished value claim.",
    url: `${SITE}/diminished-value-calculator`,
    type: "website",
    siteName: "CarCheckerVIN",
    images: [
      {
        url: `${SITE}/diminished-value-calculator/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Diminished Value Calculator — 17c formula and real market loss",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diminished Value Calculator — 17c Formula & Real Market Loss",
    description:
      "Calculate your car's diminished value after an accident with the 17c formula plus the realistic market range. Free, instant, no sign-up.",
    images: [`${SITE}/diminished-value-calculator/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

/* ─── JSON-LD ─────────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "Diminished Value Calculator",
  description:
    "Free diminished value calculator using the insurer 17c formula (base 10% cap × damage multiplier × mileage multiplier) alongside a realistic market-loss range. Estimates how much value a vehicle lost after an accident to support a diminished value claim.",
  url: `${SITE}/diminished-value-calculator`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "17c diminished value formula",
    "Damage severity multiplier",
    "Mileage multiplier bands",
    "Realistic market-loss range",
    "Step-by-step calculation breakdown",
    "Negotiation-ready estimate",
    "No sign-up required",
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
  name: "How to Calculate Diminished Value After an Accident",
  description:
    "Estimate your vehicle's diminished value using the 17c formula and a market-based range to support a diminished value claim.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Find your pre-accident market value",
      text: "Look up the clean retail value of your car the day before the crash using KBB or NADA. This is the figure the 17c formula starts from.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Apply the 10% base cap",
      text: "The 17c formula caps the maximum base loss at 10% of the pre-accident value. Multiply your value by 0.10 to get the base.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Apply the damage multiplier",
      text: "Pick a damage severity from severe structural (1.00) down to no structural damage (0.00) and multiply the base by it.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Apply the mileage multiplier",
      text: "Reduce the result by the mileage band: 1.00 under 20k miles, down to 0.00 at 100k+. Higher mileage means a lower 17c figure.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Compare against the real market loss",
      text: "Because 17c under-states real loss, compare it to the market range (5–25% of value by severity) and use an independent appraisal to support your claim.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is diminished value?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Diminished value is the loss in a vehicle's market worth after it has been in an accident and repaired. Even a perfectly repaired car is worth less than an identical car with a clean history, because buyers pay less for a vehicle with a recorded accident. That gap is the diminished value.",
      },
    },
    {
      "@type": "Question",
      name: "What is the 17c diminished value formula?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 17c formula comes from the Georgia case Mabry v. State Farm and is the method most insurers use to calculate a diminished value offer. It takes the pre-accident value, caps the base loss at 10% of that value, then multiplies by a damage-severity multiplier (0.00–1.00) and a mileage multiplier (0.00–1.00). The result is usually a conservative, low estimate.",
      },
    },
    {
      "@type": "Question",
      name: "Is the 17c formula accurate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not in your favor. The 17c formula deliberately understates loss: the 10% cap and the two reducing multipliers stack to produce a low number. Independent appraisers and real resale data usually show a larger loss — often 10–25% of value for structural damage. Use 17c as the insurer's opening figure and an independent appraisal to argue for the real market loss.",
      },
    },
    {
      "@type": "Question",
      name: "How much value does a car lose after an accident?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on severity and the vehicle, but a recorded accident typically reduces market value by roughly 5–10% for minor cosmetic damage and 15–25% for structural or frame damage. Luxury and newer vehicles tend to lose a larger dollar amount because the percentage applies to a higher base value.",
      },
    },
    {
      "@type": "Question",
      name: "Can I file a diminished value claim against my own insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your state and policy. First-party diminished value claims (against your own insurer) are barred or limited in many states. Third-party claims — against the at-fault driver's insurer when you were not at fault — are widely available across the US. Check your state's rules and your policy language before filing.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an independent appraisal for a diminished value claim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For anything beyond a small claim, yes. A licensed independent appraiser produces a written report documenting the pre-accident value, the repairs, and the post-repair market value. Insurers take a professional appraisal far more seriously than a self-calculated number, and it is often required to recover the full market loss rather than the lower 17c figure.",
      },
    },
    {
      "@type": "Question",
      name: "How long do I have to file a diminished value claim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The deadline is set by your state's statute of limitations for property damage, commonly two to four years from the date of the accident, though it varies. File as early as possible — diminished value is easiest to prove while the repair records and pre-accident value are fresh.",
      },
    },
    {
      "@type": "Question",
      name: "Does diminished value apply to a leased car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It can, but the lease holder (the finance company) usually owns the vehicle, so any diminished value recovery may belong to them rather than you. Review your lease and talk to the leasing company before pursuing a claim on a leased vehicle.",
      },
    },
    {
      "@type": "Question",
      name: "Does an accident always show up on a vehicle history report?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not always, but often. If the accident was reported to police, an insurer, or generated a body-shop record fed to a history database, it can appear on a report tied to the VIN — which is exactly why buyers discount the car. Running an accident-history check on the VIN shows what a future buyer will see.",
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
      name: "Diminished Value Calculator",
      item: `${SITE}/diminished-value-calculator`,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Diminished Value Calculator",
  url: `${SITE}/diminished-value-calculator`,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#what-is-dv", "#how-17c-works", "#faq"],
  },
};

/* ─── Reference data ──────────────────────────────────────── */

const LOSS_BY_SEVERITY = [
  { severity: "Minor cosmetic", loss: "5–10%", note: "Scratches, dents, bumper scuffs" },
  { severity: "Moderate repairable", loss: "10–15%", note: "Standard collision, bolt-on parts" },
  { severity: "Major bodywork", loss: "15–20%", note: "Panel/suspension replacement" },
  { severity: "Structural / frame", loss: "20–25%", note: "Unibody, frame, airbag deployment" },
  { severity: "Branded title (after)", loss: "30–50%", note: "Salvage or rebuilt brand recorded" },
];

const STEPS = [
  {
    icon: Stamp,
    label: "Pre-accident value",
    text: "Start from the clean retail value the day before the crash — KBB or NADA for your exact year, trim, and mileage.",
  },
  {
    icon: TrendingDown,
    label: "10% base cap",
    text: "The 17c formula caps maximum base loss at 10% of that value. This is the single biggest reason 17c under-states real loss.",
  },
  {
    icon: Car,
    label: "Damage multiplier",
    text: "Severity scales the base from 1.00 (structural) down to 0.00 (no structural damage). Frame damage carries the worst stigma.",
  },
  {
    icon: Gauge,
    label: "Mileage multiplier",
    text: "A second reduction by odometer band, from 1.00 under 20k miles to 0.00 at 100k+. Two stacked reductions shrink the figure fast.",
  },
];

export default function DiminishedValueCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Diminished Value Calculator" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Diminished Value Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            A repaired car is still worth less than one that was never wrecked.
            This calculator runs the insurer&rsquo;s <strong>17c formula</strong>{" "}
            and shows the <strong>realistic market loss</strong> beside it — so
            you walk into a diminished value claim knowing both the lowball
            number and the figure worth fighting for.
          </p>

          {/* Calculator */}
          <div className="mt-10">
            <DiminishedValueCalculator />
          </div>

          {/* What is DV */}
          <section id="what-is-dv" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What Is Diminished Value?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Diminished value is the difference between what your car was worth
              before an accident and what it&rsquo;s worth after — even once
              it&rsquo;s been perfectly repaired. Two identical cars on a lot
              will sell for different prices if one has a recorded accident and
              the other doesn&rsquo;t. Buyers pay less for the wrecked one, and
              that price gap is money out of your pocket the day you sell or
              trade.
            </p>
            <p className="text-slate-700 leading-relaxed">
              There are three flavors worth knowing. <strong>Inherent
              diminished value</strong> is the loss from the car simply having an
              accident on record — this is what most claims and this calculator
              target. <strong>Repair-related diminished value</strong> is extra
              loss from imperfect repairs (mismatched paint, panel gaps).{" "}
              <strong>Immediate diminished value</strong> is the difference right
              after the crash, before repairs. The 17c formula estimates
              inherent diminished value.
            </p>
          </section>

          {/* VIN banner */}
          <div className="mt-12">
            <VinCheckBanner variant="card" />
          </div>

          {/* How 17c works */}
          <section id="how-17c-works" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              How the 17c Formula Works
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              The &ldquo;17c&rdquo; name comes from paragraph 17(c) of the Georgia
              class-action settlement <em>Mabry v. State Farm</em>. It became the
              de-facto method insurers reach for, because it produces a
              conservative number. Here&rsquo;s every step it runs:
            </p>
            <ul className="space-y-4">
              {STEPS.map(({ icon: Icon, label, text }) => (
                <li
                  key={label}
                  className="flex gap-3 items-start p-4 bg-white border border-slate-200 rounded-xl"
                >
                  <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary-600" />
                  <div>
                    <p className="font-bold text-slate-900">{label}</p>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50 text-sm text-amber-800">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <p className="leading-relaxed">
                <strong>Why insurers love it:</strong> stacking a 10% cap with
                two multipliers that each only reduce the number means 17c rarely
                reflects what the car actually lost. It&rsquo;s a starting point
                to negotiate against — not a ceiling.
              </p>
            </div>
          </section>

          {/* Loss by severity table */}
          <section id="loss-by-severity" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Typical Market Loss by Damage Severity
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              Real-world resale discounts as a percentage of pre-accident value.
              Use these as a sanity check against the 17c figure when building a
              claim.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Damage</th>
                    <th className="text-right px-4 py-3 font-medium">
                      Value Lost
                    </th>
                    <th className="text-left px-4 py-3 font-medium">Examples</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {LOSS_BY_SEVERITY.map(({ severity, loss, note }) => (
                    <tr key={severity} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-800 font-medium">
                        {severity}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-primary-700">
                        {loss}
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-xs">
                        {note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* How to file */}
          <section id="how-to-claim" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              How to File a Diminished Value Claim
            </h2>
            <ul className="space-y-3">
              {[
                {
                  title: "Confirm you can claim",
                  detail:
                    "Third-party claims (against the at-fault driver's insurer when you weren't at fault) are widely allowed. First-party claims against your own insurer are barred or limited in many states — check yours.",
                },
                {
                  title: "Gather your evidence",
                  detail:
                    "Pull the repair invoice, photos of the damage, the police report, and the pre-accident value from KBB or NADA. The accident record on the VIN shows what future buyers will see.",
                },
                {
                  title: "Get an independent appraisal",
                  detail:
                    "For any meaningful claim, a licensed appraiser's written report carries far more weight than a self-calculated figure and is often required to recover the real market loss.",
                },
                {
                  title: "Submit a written demand",
                  detail:
                    "Send the insurer a demand letter with your appraisal and supporting documents, stating the market-loss figure — not the 17c number — as your claim amount.",
                },
                {
                  title: "Negotiate, then escalate",
                  detail:
                    "Expect a low first offer near the 17c figure. Counter with your appraisal. If they won't move, options include your state insurance department, arbitration, or small-claims court.",
                },
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

          {/* Cross-links */}
          <div className="mt-12 grid sm:grid-cols-3 gap-3">
            {[
              {
                href: "/accident-history-check",
                label: "Accident History Check",
                sub: "See the record buyers will find",
              },
              {
                href: "/market-value",
                label: "Market Value",
                sub: "Current valuation by VIN",
              },
              {
                href: "/car-depreciation-calculator",
                label: "Depreciation Calculator",
                sub: "Value loss over time",
              },
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
                <span className="text-slate-500 font-bold text-xs flex-shrink-0">
                  →
                </span>
              </Link>
            ))}
          </div>

          {/* FAQ */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {[
                {
                  q: "What is diminished value?",
                  a: "The loss in a car's market worth after an accident, even once it's perfectly repaired. An identical car with no accident history sells for more — that price gap is the diminished value.",
                },
                {
                  q: "What is the 17c formula?",
                  a: "The method most insurers use, from Mabry v. State Farm. It caps base loss at 10% of pre-accident value, then multiplies by a damage multiplier and a mileage multiplier — producing a deliberately conservative number.",
                },
                {
                  q: "Is the 17c number what I'll actually recover?",
                  a: "It's the insurer's opening figure, usually a lowball. Real market loss is typically higher — 10–25% of value for structural damage. An independent appraisal is how you argue for the difference.",
                },
                {
                  q: "Can I claim diminished value against my own insurance?",
                  a: "Often no — first-party DV claims are barred or limited in many states. Third-party claims against the at-fault driver's insurer are widely available when you weren't at fault.",
                },
                {
                  q: "Do I need an appraisal?",
                  a: "For anything beyond a small claim, yes. A licensed appraiser's written report is taken far more seriously than a self-calculated figure and is often required to recover the full loss.",
                },
                {
                  q: "How long do I have to file?",
                  a: "Your state's property-damage statute of limitations applies — commonly two to four years from the accident. File early, while records and pre-accident value are fresh.",
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Related */}
          <div className="mt-14">
            <RelatedChecks exclude="/diminished-value-calculator" />
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <Scale className="w-8 h-8 text-primary-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Building a Diminished Value Claim?
          </h2>
          <p className="text-slate-600 mb-6">
            Pull the accident record tied to your VIN — the same record a future
            buyer will see, and the evidence that proves your car&rsquo;s value
            took a hit.
          </p>
          <Link
            href="/accident-history-check"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            <FileText className="w-4 h-4" />
            Check Accident History
          </Link>
        </div>
      </section>
    </>
  );
}
