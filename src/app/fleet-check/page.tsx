import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import { ORG_AUTHOR } from "@/lib/seo/author";

export const metadata: Metadata = {
  title: "Fleet & Ex-Police Car Check by VIN — Commercial Use History",
  description:
    "Check any vehicle's commercial fleet history by VIN. Find ex-police cars, government fleet vehicles, taxi history, and other high-usage commercial service records.",
  keywords: [
    "fleet car check VIN",
    "ex-police car check",
    "former fleet vehicle",
    "commercial use history VIN",
    "government vehicle check",
    "police car VIN check",
  ],
  alternates: { canonical: "/fleet-check" },
  openGraph: {
    title: "Fleet & Ex-Police Car Check by VIN — Commercial Use History",
    description:
      "Check any vehicle's commercial fleet history by VIN. Find ex-police cars, government fleet vehicles, and taxi history.",
    url: "https://www.carcheckervin.com/fleet-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Fleet & Ex-Police Car Check by VIN",
  description:
    "Learn how to check commercial fleet history by VIN, including ex-police cars, government vehicles, and high-usage fleet records.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.carcheckervin.com/fleet-check",
  },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can I tell if a used car was a former fleet vehicle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The clearest signal is the title history. Fleet and government vehicles are usually titled to a company or agency — like a city, county, rental firm, or corporation — and that name appears in the ownership chain of a VIN report. Other clues include a single corporate owner before the first private owner, a short ownership period with high mileage, and dealer-auction records right after the first registration.",
      },
    },
    {
      "@type": "Question",
      name: "Will a VIN check always flag a car as a fleet vehicle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not always. There is no universal 'fleet' title brand, so prior fleet use is usually inferred from registration and title records rather than explicitly labeled. A VIN report can show a corporate or government owner in the title chain, but private leasing companies and some corporate fleets may not be obvious. Pair the VIN check with a physical inspection and ask the seller directly about prior commercial use.",
      },
    },
    {
      "@type": "Question",
      name: "Are former fleet cars well maintained?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the fleet type. Government and corporate fleets often follow strict scheduled maintenance and keep documented service records, sometimes available as public records for decommissioned government vehicles. Taxis and police interceptors, by contrast, endure heavy 24/7 use that wears the powertrain, brakes, and interior faster than mileage alone suggests. The quality of the maintenance program matters more than the fleet label itself.",
      },
    },
    {
      "@type": "Question",
      name: "Do former fleet vehicles have high mileage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Often, but not always. Taxis, police cars, and utility vehicles typically accumulate very high mileage from continuous operation. Corporate fleet cars, however, are frequently sold on fixed replacement cycles — for example 36 months and 45,000 miles — so their odometers can be moderate. Because heavy fleet use can wear components beyond what mileage shows, always pair a fleet check with an odometer verification.",
      },
    },
    {
      "@type": "Question",
      name: "How do I spot a former police car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Look for physical evidence that upfitting leaves behind: plugged holes and cut wiring in the headliner, doors, and trunk from radios and light bars; partition bracket mount points in the floor and ceiling; and ghost markings or paint overspray where decals were removed. Police-package models like the Ford Police Interceptor and Dodge Charger Pursuit also encode their package designation in the VIN.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a fleet car and a rental car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both are commercial-use vehicles, but they differ in use pattern and ownership. Rental cars are driven by many short-term drivers and titled to rental companies like Hertz or Enterprise. Fleet vehicles — police, government, corporate, taxi, and utility — usually serve a single operator's mission, with wear patterns specific to that use. Both appear in a VIN's title history under a company or agency name rather than an individual.",
      },
    },
    {
      "@type": "Question",
      name: "Should I avoid buying a former fleet vehicle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not automatically. A well-maintained corporate fleet car on a regular replacement cycle can be a strong value and is often mechanically excellent. A neglected single-owner car can be in worse shape than a documented fleet vehicle. The deciding factors are the fleet type and maintenance quality. Verify with a full VIN history report, an accident history check, and an independent pre-purchase inspection before deciding.",
      },
    },
  ],
};

const FAQS = faqSchema.mainEntity.map((q) => ({
  question: q.name,
  answer: q.acceptedAnswer.text,
}));

export default function FleetCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Fleet Check" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Fleet &amp; Ex-Police Car Check by VIN
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Commercial fleet vehicles — police cars, government trucks, taxi cabs, and corporate fleets — eventually enter the used car market after years of heavy use. They can offer value buyers a lower purchase price, but they also carry specific wear patterns and history that affects long-term reliability. A VIN fleet check reveals commercial ownership history, government registration records, and any high-usage service periods before you buy.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Check for Fleet and Commercial Use History
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Types of Fleet Vehicles
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Fleet vehicles encompass a wide range of commercial and government use cases, each with different implications for condition, wear, and value. Understanding the type of fleet use helps you assess what the vehicle&rsquo;s history actually means for the components you care about most.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Police interceptors</strong> &mdash; purpose-built pursuit vehicles with heavy-duty cooling, electrical systems, and suspension, often at very high mileage from 24/7 operation.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Government and municipal fleet</strong> &mdash; city, county, state, and federal vehicles used for administrative and field operations with documented maintenance.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Corporate fleet</strong> &mdash; company cars for sales representatives, executives, and employees on fixed replacement cycles, typically well-maintained.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Taxi and transportation network</strong> &mdash; extremely high mileage and city driving stress; interior and drivetrain wear is typically heavy.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Utility and service fleet</strong> &mdash; vehicles used by utilities, contractors, and service companies, often with towing and hauling that accelerates drivetrain wear.</span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Why Fleet History Affects Value
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Fleet history creates a systematic discount in the used car market because buyers associate it with higher-than-average wear relative to mileage. The discount varies significantly by fleet type. A corporate sedan from a well-maintained executive fleet may deserve only a small discount compared to a comparable private-owner vehicle. A former police interceptor that saw 24/7 patrol duty at 120,000 miles carries a much more significant discount — and often for good reason.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The components most affected by fleet use are the powertrain (engine and transmission), brakes, suspension, and interior. Police vehicles in particular subject these systems to extreme stress: prolonged idling, aggressive acceleration and braking, and continuous electrical load from lights, radios, and computing equipment. Even if the odometer shows moderate mileage, the actual wear on these components may be equivalent to much higher consumer use.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Always pair a fleet check with an{" "}
            <Link href="/odometer-check" className="text-primary-600 hover:underline font-medium">
              odometer check
            </Link>{" "}
            to verify mileage accuracy and a full{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              VIN history report
            </Link>{" "}
            to see the complete ownership and damage record.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How to Spot an Ex-Police Car
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Former police vehicles have distinctive physical characteristics that persist even after decommissioning and reconditioning. Police upfitting leaves behind evidence that is difficult to fully remove, giving buyers who know what to look for a clear advantage.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Extra wiring and plugged holes</strong> &mdash; police equipment wiring harnesses, radio mounts, and light bar mounts leave holes and cut wires in the headliner, doors, and trunk.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Heavy-duty police package components</strong> &mdash; Ford Police Interceptor and Dodge Charger Pursuit models have VINs that encode their police package designation.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Partition mount points</strong> &mdash; rear seat partition brackets leave distinctive attachment points in the floor and ceiling even after removal.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Fleet paint or livery residue</strong> &mdash; former police vehicles may show ghost markings or paint overspray patterns around where decals were removed.</span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Government &amp; Municipal Fleet Records
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Government and municipal fleet vehicles are typically titled in the name of the governmental entity — City of Dallas, State of California, Federal Government, County of Cook, and so on. These ownership records appear in the title history and are captured in NMVTIS. A VIN report showing government ownership in the title chain is the clearest indicator of fleet use.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Government fleets often have excellent maintenance documentation because public agencies are required to maintain service records as public documents. This is actually an advantage for buyers — you may be able to request service records directly from the government entity if the vehicle was recently decommissioned, providing a more complete maintenance history than most private sellers can offer.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Fleet Vehicles vs. Private Owner Cars
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The comparison between fleet and private owner vehicles is not always unfavorable to fleet vehicles. A poorly maintained single-owner vehicle with neglected oil changes, deferred repairs, and undisclosed accident damage can be in far worse condition than a well-maintained fleet vehicle. The key variables are the type of fleet use and the quality of the maintenance program — not simply whether the vehicle was in a fleet.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Corporate fleet vehicles in particular can be a good used car value. A company car operated by a sales executive on a 36-month, 45,000-mile replacement cycle with full dealer maintenance under a fleet service agreement may be mechanically excellent despite its fleet history. The systematic replacement schedule means these vehicles are generally sold before major maintenance items become expensive.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Regardless of fleet type, always verify with a full{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              VIN history report
            </Link>{" "}
            and an{" "}
            <Link href="/accident-history-check" className="text-primary-600 hover:underline font-medium">
              accident history check
            </Link>{" "}
            before making any purchase decision.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">
                    {faq.question}
                  </h3>
                  <span className="text-2xl text-primary-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/fleet-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Check for Fleet and Commercial Use History
          </h2>
          <p className="text-slate-700 mb-6">
            Enter a 17-character VIN to check for police, government, rental, and commercial fleet ownership history.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
