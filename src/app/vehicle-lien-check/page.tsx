import type { Metadata } from "next";
import Link from "next/link";
import {
  Lock,
  AlertTriangle,
  FileWarning,
  Shield,
  Search,
  CheckCircle2,
  XCircle,
  FileText,
  Banknote,
  Wrench,
  Warehouse,
  Landmark,
  Gavel,
  Car,
  Flag,
  Eye,
  HandCoins,
  ScrollText,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import VinCheckBanner from "@/components/VinCheckBanner";
import RelatedChecks from "@/components/RelatedChecks";

export const metadata: Metadata = {
  title:
    "Free Vehicle Lien Check — Find Hidden Loans, Liens & Repos by VIN",
  description:
    "Check any vehicle for hidden liens, outstanding loans, repossession records, and sale history before you buy. Free VIN-based lien lookup — protect yourself from inheriting someone else's debt.",
  keywords: [
    "vehicle lien check",
    "car lien check",
    "free lien check",
    "check car for lien",
    "vehicle lien search",
    "vin lien check",
    "car loan lien check",
    "check vehicle for liens",
    "free car lien lookup",
    "lien check by vin",
    "lien search free",
    "outstanding loan car check",
    "lienholder lookup",
    "dmv lien check",
    "car repossession history",
    "vehicle repo check",
    "title lien check",
    "lienholder by vin",
    "is there a lien on my car",
    "check if car has lien before buying",
    "find lien on vehicle",
    "free vehicle lien search",
    "lienholder release check",
    "car finance check",
    "car finance lookup free",
    "outstanding finance check",
    "vehicle finance check",
    "lien holder lookup vehicle",
    "check lien holder car",
    "auto loan lien check",
    "free dmv lien search",
  ],
  alternates: { canonical: "/vehicle-lien-check" },
  openGraph: {
    title:
      "Free Vehicle Lien Check — Find Hidden Loans, Liens & Repos by VIN",
    description:
      "Check any vehicle for hidden liens, outstanding loans, repossession records, and sale history before you buy. Free VIN-based lien lookup.",
    url: "https://www.carcheckervin.com/vehicle-lien-check",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Vehicle Lien Check — Find Hidden Loans, Liens & Repos by VIN",
    description:
      "Free VIN-based lien lookup. Find hidden loans, liens, and repo records before you buy.",
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Vehicle Lien Check",
  url: "https://www.carcheckervin.com/vehicle-lien-check",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  description:
    "Free VIN-based vehicle lien check. Surfaces auto loan liens, mechanic's liens, storage liens, tax liens, judgment liens, and repossession history.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  // aggregateRating intentionally omitted. Small honest counts on a young
  // domain read worse to AI overviews than no aggregate at all. The
  // verified Trustpilot reviews on the homepage Product JSON-LD carry the
  // social proof per-row, each linked to its source URL.
};

const faqs = [
  {
    q: "Is a free VIN lien check actually accurate?",
    a: "A free consumer-grade VIN lien check pulls from public state DMV title brand records, NMVTIS, and reported lender filings. It catches the vast majority of recorded liens, but commercial NMVTIS searches that cost $20–$45 occasionally surface very recent filings (within the last 7–14 days) that have not yet propagated to public feeds. For a private-party purchase, run our free check first and request a paid NMVTIS report from an approved provider only if anything looks ambiguous.",
  },
  {
    q: "Can a seller hide a lien?",
    a: "Yes. A seller can show you a paper title that looks clean even when an active lien exists, especially if the title was issued before the loan was taken out, if the title is a duplicate, or if the lien was recorded with the lender but never updated on the physical title. Always verify independently using the VIN — the lien attaches to the VIN, not to whatever piece of paper the seller hands you.",
  },
  {
    q: "What happens if I buy a car with a lien?",
    a: "You do not legally own it. The lender holds the security interest in the vehicle until the loan is paid off. If the seller stops making payments — or never planned to make them — the lender can repossess the car from your driveway and you have no legal recourse against them. Your only remedy is a civil suit against the seller, who has likely already disappeared with your cash.",
  },
  {
    q: "How long does a lien stay on a title?",
    a: "A lien stays on the title until the debt is satisfied AND the lender files a lien release with the state DMV. Many old satisfied liens never get released because lenders close, get acquired, or simply forget. Even a long-paid-off lien that was never released can block a title transfer years later, so always confirm release status before you buy.",
  },
  {
    q: "Can I check a lien for free at the DMV?",
    a: "Some states offer a free or low-cost lien lookup directly through their DMV portal, but most charge a fee — typically $5 to $25 — for an official title and lien record search. Our VIN-based check is free and pulls from the same underlying state DMV reporting feeds, so it is usually the fastest first step before you decide whether you need an official certified record.",
  },
  {
    q: "What is a UCC-1 filing?",
    a: "A UCC-1 (Uniform Commercial Code) financing statement is a public notice that a lender has a security interest in a piece of collateral. For commercial vehicles, fleet vehicles, and some heavy equipment, the lien is recorded as a UCC-1 with the secretary of state rather than on the DMV title. If you are buying a commercial vehicle, always run both a DMV title lien check AND a UCC-1 search.",
  },
  {
    q: "Can I remove an old satisfied lien?",
    a: "Yes. If you have already paid off your loan but the lien is still showing on the title, request a lien release letter from the lender (sometimes called a 'satisfaction of lien'). Submit that letter to your state DMV with the appropriate form and a small fee, and the DMV will issue a new title with the lien removed. Doing this before you sell saves the buyer a major headache.",
  },
  {
    q: "Do private-party sellers have to disclose liens?",
    a: "It depends on the state. Roughly 13 states require explicit lien disclosure on private-party sales, and the rest leave it to buyer beware. Even in disclosure states, enforcement is weak and the legal remedy comes after the damage is done. Treat every private-party sale as a no-disclosure state: assume nothing, verify the VIN yourself.",
  },
  {
    q: "What is the difference between a lien and an encumbrance?",
    a: "A lien is a specific legal claim that secures a debt — the lender can repossess the vehicle if you do not pay. An encumbrance is a broader term that covers any restriction on a property's use or transfer, including liens, leases, easements, and use restrictions. Every lien is an encumbrance, but not every encumbrance is a lien.",
  },
  {
    q: "How do I check for a lien if the seller refuses to share the VIN?",
    a: "You walk away. A seller who will not share the 17-character VIN before a sale is hiding something — and the most common thing they are hiding is a lien, a salvage brand, or stolen status. The VIN is not private information; it is visible through the windshield from the street. A refusal to provide it is itself the red flag.",
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

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Check a Vehicle for a Lien",
  description:
    "Run a free VIN-based lien check in four steps: enter the VIN, query state DMV and lender registries, review lien holder and status, and follow a protection plan.",
  totalTime: "PT2M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter the 17-character VIN",
      text: "Locate the 17-character Vehicle Identification Number on the dashboard, driver-side door jamb, or title document, then enter it into the search box at the top of the page.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "We query state DMV and lender registries",
      text: "We cross-reference the VIN against state DMV title brand records, NMVTIS, UCC-1 filings, and reported lender registries to surface any active or historical liens.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Review the lien holder and current status",
      text: "The report shows the name of the lien holder, the type of lien, when it was filed, and whether it is currently active or has been released. Active liens require payoff before the title can transfer to you.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Follow your protection plan",
      text: "If a lien is active, request a lien payoff letter, use an escrow service, or close the deal directly at the lender's office. If the seller cannot or will not cooperate, walk away.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.carcheckervin.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Vehicle Lien Check",
      item: "https://www.carcheckervin.com/vehicle-lien-check",
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Free Vehicle Lien Check",
  url: "https://www.carcheckervin.com/vehicle-lien-check",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".speakable-summary", ".speakable-faq"],
  },
};

export default function VehicleLienCheckPage() {
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

      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Vehicle Lien Check" },
            ]}
          />

          {/* 1. Hero */}
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Free Vehicle Lien Check by VIN
          </h1>
          <p className="speakable-summary mt-4 text-lg text-slate-700 leading-relaxed">
            Buying a used car with an undisclosed lien means you do not own it
            &mdash; the lender does, and they can repossess it from your
            driveway whenever they want. A free vehicle lien check by VIN
            surfaces hidden loans, repossession records, and sale history in
            seconds, so you never inherit somebody else&rsquo;s debt.
          </p>

          <div
            id="lien-search"
            className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100"
          >
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Run a Free Vehicle Lien Check
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-widest text-slate-700">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              100% Free
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              No Sign-Up
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Instant Results
            </span>
          </div>

          {/* Card banner near top */}
          <div className="mt-10">
            <VinCheckBanner variant="card" />
          </div>

          {/* 2. What is a Vehicle Lien? */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What Is a Vehicle Lien?
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A vehicle lien is a lender&rsquo;s legal claim against a specific
            car, truck, or motorcycle that secures the right to repossess the
            vehicle if a debt is not paid. Liens attach to the VIN and to the
            title, not to the borrower personally, which means the lien
            travels with the car through every ownership change until it is
            formally satisfied and released.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Most vehicle liens come from auto loans, but a vehicle can also
            carry a mechanic&rsquo;s lien for unpaid repair bills, a storage
            lien from a tow yard, an IRS or state tax lien, or a judgment lien
            from a court ruling. Any of these is enough to block a clean title
            transfer at the DMV.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The single most important thing to understand: a lien is recorded
            against the VIN. The seller&rsquo;s paper title may say
            &ldquo;clean&rdquo; or be silent on the lien entirely, but the
            underlying state DMV record still shows the encumbrance. That is
            why a VIN-based lien check beats reading the title document.
          </p>

          {/* 3. Why a Lien Check Matters */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Why a Lien Check Matters
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Three concrete things go wrong when a buyer skips the lien check.
            None of them are theoretical &mdash; they happen on private-party
            sales every week:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-rose-100 bg-rose-50 p-5">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center mb-3">
                <Banknote className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                You inherit the debt
              </h3>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                You pay full price, the seller disappears, the lender repos
                the car &mdash; and there is no refund. You are out the cash
                and the vehicle.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
                <FileWarning className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                You can&rsquo;t title the car
              </h3>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                The DMV refuses transfer until the lien is released. You drive
                home with a car you cannot register, insure, or legally
                operate.
              </p>
            </div>
            <div className="rounded-2xl border border-rose-100 bg-rose-50 p-5">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Repo can happen years later
              </h3>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                Even an old satisfied lien that was never formally released
                becomes a title-transfer nightmare or worse &mdash; a
                surprise repossession years after you bought the car.
              </p>
            </div>
          </div>

          {/* 4. Types of Liens We Surface */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Types of Liens We Surface
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A &ldquo;lien&rdquo; is not just an auto loan. Six common types
            show up on used-vehicle titles:
          </p>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li className="flex gap-3 items-start">
              <Banknote className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Auto loan liens</strong> &mdash; the most common.
                Filed by banks, credit unions, and dealer-finance arms. Stay
                on the title until the loan is paid off and a release is
                filed.
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <Wrench className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Mechanic&rsquo;s liens</strong> &mdash; filed by a
                repair shop when a vehicle owner refuses to pay for completed
                work. The shop can hold and eventually sell the car.
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <Warehouse className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Storage liens</strong> &mdash; filed by tow yards,
                parking facilities, or impound lots when storage fees go
                unpaid. Often surfaces on cars that were impounded after an
                accident or police hold.
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <Landmark className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>IRS or state tax liens</strong> &mdash; filed by tax
                authorities against any property the debtor owns, including
                their vehicle. Federal tax liens are particularly aggressive.
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <Gavel className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Judgment liens</strong> &mdash; the result of a civil
                lawsuit where a court has ordered a debtor to pay. The
                creditor can then attach the judgment to the debtor&rsquo;s
                vehicle title.
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <Car className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Repossession records</strong> &mdash; not technically
                a lien, but a critical companion record. Shows whether the
                vehicle has previously been repossessed and re-sold, which
                often correlates with title and history complications.
              </span>
            </li>
          </ul>

          {/* 5. How a Lien Check Works (HowTo) */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How a Lien Check Works
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Running a free vehicle lien check on CarCheckerVIN takes about two
            minutes. Here is what happens behind the scenes:
          </p>
          <ol className="mt-6 space-y-4">
            <li className="flex gap-4 items-start rounded-2xl border border-slate-200 bg-white p-5">
              <div className="w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Enter the VIN</h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  Find the 17-character VIN on the dashboard, the
                  driver-side door jamb sticker, or the title document, then
                  paste it into the search box at the top of the page.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start rounded-2xl border border-slate-200 bg-white p-5">
              <div className="w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-slate-900">
                  We query state DMV and lender registries
                </h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  Behind the scenes, we cross-reference NMVTIS, all 50 state
                  DMV title brand feeds, UCC-1 commercial filings, and
                  reported lender registries to compile a complete lien
                  picture.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start rounded-2xl border border-slate-200 bg-white p-5">
              <div className="w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-slate-900">
                  See lien holder and status
                </h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  The report shows you the name of the lien holder, the type
                  of lien, the filing date, and whether it is currently
                  active or has been released. Active liens block title
                  transfer until paid.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start rounded-2xl border border-slate-200 bg-white p-5">
              <div className="w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-slate-900">
                  Get a protection plan
                </h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  If the report shows a lien, follow our protection
                  checklist: request a payoff letter, route the deal through
                  escrow, close at the lender&rsquo;s office, or walk away.
                </p>
              </div>
            </li>
          </ol>

          {/* 6. Free vs Paid */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Free vs Paid: What You Actually Need
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            For a private-party purchase, you do not need to spend $44.99. The
            comparison below shows where each option fits:
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-900">
                <tr>
                  <th className="text-left p-4 font-bold">Source</th>
                  <th className="text-left p-4 font-bold">Cost</th>
                  <th className="text-left p-4 font-bold">What you get</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-emerald-50">
                  <td className="p-4 font-semibold text-slate-900">
                    CarCheckerVIN
                  </td>
                  <td className="p-4 text-slate-700">Free</td>
                  <td className="p-4 text-slate-700">
                    NMVTIS-fed lien status, lien holder, repossession history
                    &mdash; instant, no sign-up.
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">
                    State DMV title search
                  </td>
                  <td className="p-4 text-slate-700">$5&ndash;$25</td>
                  <td className="p-4 text-slate-700">
                    Official certified record. Slow (mail-in or in-person in
                    many states), state-by-state coverage only.
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">
                    Carfax / AutoCheck
                  </td>
                  <td className="p-4 text-slate-700">$24.99&ndash;$44.99</td>
                  <td className="p-4 text-slate-700">
                    Full vehicle history including accidents and service.
                    Lien data is the same NMVTIS feed we use.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-slate-600 leading-relaxed">
            For just confirming lien status before a private-party purchase,
            our free check is enough. If you want the full history bundle,
            see our{" "}
            <Link
              href="/vin-check-vs-carfax"
              className="text-primary-600 hover:underline font-medium"
            >
              CarCheckerVIN vs Carfax
            </Link>{" "}
            comparison.
          </p>

          {/* 7. State-by-State Lien Disclosure Rules */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            State-by-State Lien Disclosure Rules
          </h2>
          <div className="mt-4 rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-5">
            <div className="flex gap-3 items-start">
              <Flag className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-slate-700 leading-relaxed">
                <p className="font-semibold text-slate-900">
                  Roughly 13 states require explicit lien disclosure on a
                  private-party vehicle sale.
                </p>
                <p className="mt-2">
                  The remaining ~37 states fall under buyer-beware rules,
                  where the seller has no affirmative duty to mention an
                  active lien. Even in disclosure states, the legal remedy
                  arrives long after the damage is done. Treat every
                  private-party sale as no-disclosure: assume nothing,
                  verify the VIN yourself.
                </p>
              </div>
            </div>
          </div>

          {/* Inline default banner */}
          <div className="mt-10">
            <VinCheckBanner />
          </div>

          {/* 8. Red Flags */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Red Flags That Suggest a Hidden Lien
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Before you even run the VIN, certain seller behaviors point
            strongly to an undisclosed lien. Watch for any of the following:
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Eye className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>
                The title says &ldquo;Original&rdquo; but the seller cannot
                actually produce a physical title document.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Eye className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>
                The title plainly lists a lienholder name &mdash; the
                seller&rsquo;s claim that &ldquo;it&rsquo;s already paid
                off&rdquo; is meaningless without a written lien release.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Eye className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>
                Seller insists on cash only and refuses cashier&rsquo;s
                checks, escrow, or any traceable payment method.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Eye className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>
                Seller wants to &ldquo;just sign the title over&rdquo; without
                showing it &mdash; or has only a duplicate or a bill of sale.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Eye className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>
                Asking price is dramatically below market value with no
                clear, verifiable explanation.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Eye className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>
                Urgent sale &mdash; &ldquo;moving overseas tomorrow,&rdquo;
                &ldquo;need cash by tonight,&rdquo; pressure to skip
                inspection or paperwork.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Eye className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>
                Out-of-state plates with no recent transfer to the current
                state, or a mismatch between the plate state and the
                seller&rsquo;s ID.
              </span>
            </li>
          </ul>

          {/* 9. What to Do If You Find a Lien */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What to Do If You Find a Lien
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            An active lien on a vehicle you want to buy is not automatically a
            deal-breaker &mdash; but it absolutely changes how you close.
            Pick the option that matches your risk tolerance:
          </p>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li className="flex gap-3 items-start">
              <HandCoins className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Use an escrow service.</strong> An escrow company
                holds your funds, sends the loan payoff to the lender
                directly, and only releases the remainder to the seller
                after the lender confirms release. Costs $50&ndash;$500 and
                eliminates almost all of the risk.
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <FileText className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Get a lien payoff letter.</strong> Have the seller
                request a 10-day payoff letter from the lender stating the
                exact balance owed. The letter doubles as proof the lien is
                real and gives you a fixed number to negotiate against.
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <Landmark className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Close simultaneously at the lender.</strong> Meet
                the seller at the lender&rsquo;s office, hand the cashier
                payment directly to the lender, and walk out with a lien
                release in hand and the title in the seller&rsquo;s name
                ready to sign over.
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Walk away.</strong> If the seller cannot or will not
                cooperate with any of the above, the deal is not worth it.
                There are always more cars.
              </span>
            </li>
          </ul>

          {/* 10. FAQ */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="speakable-faq mt-6 space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-slate-200 bg-white p-5 open:bg-slate-50"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-3">
                  <span className="font-semibold text-slate-900">{f.q}</span>
                  <span className="text-primary-600 font-bold flex-shrink-0 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          {/* 11. Bottom CTA */}
          <div className="mt-14 rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 sm:p-10 text-white text-center">
            <Lock className="w-10 h-10 mx-auto text-primary-200" />
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold">
              Run Your Free Lien Check Now
            </h2>
            <p className="mt-2 text-primary-100 max-w-xl mx-auto">
              Two minutes today saves you a lifetime of someone else&rsquo;s
              debt. Enter the VIN and see every recorded lien instantly.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="#lien-search"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-bold rounded-full hover:bg-primary-50 transition-colors"
              >
                <Search className="w-5 h-5" />
                Check VIN for Liens
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-primary-200">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                NMVTIS-Backed Data
              </span>
              <span className="flex items-center gap-1.5">
                <ScrollText className="w-4 h-4" />
                Lien Holder + Status
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                100% Free
              </span>
            </div>
          </div>

          <p className="mt-8 text-sm text-slate-600 leading-relaxed">
            Pair your lien check with a{" "}
            <Link
              href="/stolen-vehicle-check"
              className="text-primary-600 hover:underline font-medium"
            >
              stolen vehicle check
            </Link>
            , a{" "}
            <Link
              href="/salvage-title-check"
              className="text-primary-600 hover:underline font-medium"
            >
              salvage title check
            </Link>
            , and a full{" "}
            <Link
              href="/vin-check"
              className="text-primary-600 hover:underline font-medium"
            >
              VIN check report
            </Link>{" "}
            for a complete pre-purchase picture.
          </p>
        </div>
      </article>

      {/* 12. RelatedChecks */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/vehicle-lien-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Check a Vehicle for Liens
          </h2>
          <p className="text-slate-700 mb-6">
            Enter a 17-character VIN to instantly check NMVTIS, state DMV lien
            records, and reported lender registries.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
