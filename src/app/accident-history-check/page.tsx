import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import { ORG_AUTHOR } from "@/lib/seo/author";

export const metadata: Metadata = {
  title: "Vehicle Accident History Check by VIN — Crash Report Lookup",
  description:
    "Run an accident history check by VIN to see reported crashes, insurance claims, and damage records. Spot hidden collision damage before you buy.",
  keywords: [
    "accident history by VIN",
    "vehicle accident history",
    "car accident report VIN",
    "crash history check",
    "VIN accident lookup",
    "check car for accidents by VIN",
    "vehicle damage history",
    "collision history report",
  ],
  alternates: { canonical: "/accident-history-check" },
  openGraph: {
    title: "Vehicle Accident History Check by VIN",
    description:
      "Find reported accidents, crash records, and damage claims tied to any VIN. Avoid hidden collision damage before you buy.",
    url: "https://www.carcheckervin.com/accident-history-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Vehicle Accident History Check",
  description:
    "Learn how accident history is reported, what shows up on a VIN-based crash report, and how to identify hidden damage on a used car.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.carcheckervin.com/accident-history-check",
  },
  datePublished: "2026-04-16",
  dateModified: "2026-04-16",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does an accident history check show?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An accident history check tied to a VIN surfaces reported collisions and damage events, including the date and location of each accident, a severity classification (minor, moderate, or severe), the point of impact (front, rear, side, or rollover), whether airbags deployed, any estimated repair cost reported by the insurer, and total-loss status. It consolidates insurance claims, police reports, body-shop records, and salvage-auction data into a single timeline keyed to the VIN.",
      },
    },
    {
      "@type": "Question",
      name: "Does an accident history check show every accident?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. An accident history report only shows accidents that were reported to a data source it pulls from, such as an insurance claim, a police crash report, a body-shop record, or a total-loss filing. A minor fender bender that the owner paid for out of pocket with no insurance claim and no police report will not appear. That is why no vehicle history report captures 100% of accidents, and why a report works best alongside an in-person inspection.",
      },
    },
    {
      "@type": "Question",
      name: "Where does VIN accident data come from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Accident data does not come from one national database. It is aggregated from several sources that each capture part of a collision event: auto insurance companies that report claims to industry data exchanges, police departments that file crash reports through state DMVs, collision repair shops that log work performed on a VIN, and salvage auctions that record total-loss vehicles. A quality report combines insurance and police-reported data for a fuller picture than either source alone.",
      },
    },
    {
      "@type": "Question",
      name: "Does a clean accident report mean the car was never in an accident?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. A clean report means no accident was ever reported to the data sources the check pulls from. A collision that was repaired without an insurance claim or police report can leave no database trace, so it would not show up. Treat a clean report as strong but not absolute evidence, and confirm it with an in-person inspection looking for uneven panel gaps, mismatched paint, fresh weld marks, or replaced airbag covers.",
      },
    },
    {
      "@type": "Question",
      name: "How do I check a car's accident history by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter the vehicle's 17-character VIN into the accident history check form on this page. The system queries insurance claim feeds, police crash reports, collision repair records, and total-loss data tied to that VIN, then returns a timeline of any reported accidents with the date, severity, point of impact, and airbag deployment status. The VIN is stamped on the dashboard at the base of the windshield and on the driver-side door jamb sticker.",
      },
    },
    {
      "@type": "Question",
      name: "Do minor accidents show up on a VIN check?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Minor accidents show up only if they were reported. A minor collision that generated an insurance claim, a police report, or a body-shop record will appear, usually flagged as minor severity. A small scrape repaired privately with no claim or report often leaves no record at all. When reading a report, weigh severity and point of impact: a minor rear bumper repaint is usually a non-issue, while any severe front-end impact with airbag deployment deserves a closer look.",
      },
    },
    {
      "@type": "Question",
      name: "Why does accident severity and location matter more than the count?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A single severe collision can matter far more than several minor ones. When reading an accident report, focus on three things: the severity rating, the point of impact, and whether airbags deployed. A minor parking-lot scrape is cosmetic, but a severe front-end collision with airbag deployment may have damaged structural components, sensors, and ECUs that are expensive to fully restore. Severely damaged vehicles can also end up with a salvage title brand, which is worth checking separately.",
      },
    },
  ],
};

const FAQS = faqSchema.mainEntity.map((q) => ({
  question: q.name,
  answer: q.acceptedAnswer.text,
}));

export default function AccidentHistoryCheckPage() {
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
              { label: "Accident History Check" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Vehicle Accident History Check
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Roughly one in three used cars on the market has been in at least
            one reported accident. A VIN-based accident history check pulls
            insurance claims, police reports, body-shop records, and
            total-loss data so you can see exactly what happened to a vehicle
            before you buy &mdash; not just what the seller chooses to tell
            you.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Run an Accident History Check Now
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How Accident Data Is Actually Collected
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Vehicle accident data does not come from a single national
            database. Instead, it is aggregated from dozens of sources that
            each capture a different slice of every collision event. The
            largest contributors are auto insurance companies, which report
            claims to industry data exchanges; police departments, which file
            crash reports through state DMVs; collision repair shops, which
            log work performed on each VIN; and salvage auctions, which
            record total-loss vehicles.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            When you run an accident history check, the report consolidates
            these feeds into a single timeline keyed to the VIN. You see when
            damage was reported, the severity classification, the area of the
            vehicle affected, and the source of the record. Some events list
            estimated repair costs, while others note only that a claim was
            filed.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Keep in mind that not every accident is reported. A driver who
            fixes a fender bender out of pocket without filing a claim may
            never trigger any database entry. That is why accident history
            reports are best used alongside an in-person inspection &mdash;
            they catch what a visual check might miss, but they cannot catch
            everything.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Insurance Records vs. Police Reports
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Insurance records are the most comprehensive source of accident
            data because nearly every collision involves a claim against
            someone&rsquo;s policy. Insurance reports typically include the
            date of loss, the severity (minor, moderate, or severe), the
            point of impact (front, rear, side, rollover), and whether
            airbags deployed.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Police reports add a different layer. They include accident
            location, contributing factors (weather, distracted driving,
            DUI), and sometimes whether the vehicle was towed from the
            scene. Combining both data sets gives you a fuller picture than
            either source alone, and a quality VIN report will pull from
            both.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What Appears on an Accident History Report
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            When a VIN has accident history, your report will surface
            details such as:
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Date and location</strong> of each reported
                accident.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Severity classification</strong> &mdash; minor,
                moderate, or severe damage.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Point of impact</strong> &mdash; front, rear, side,
                or rollover.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Airbag deployment</strong> &mdash; a strong indicator
                of significant impact.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Estimated repair amount</strong> when reported by the
                insurer.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Total-loss status</strong> indicating the insurer
                declared the vehicle uneconomical to repair.
              </span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Signs of Hidden Collision Damage
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Even after a thorough body-shop repair, telltale clues often
            remain. When you inspect a used vehicle in person, look for the
            following indicators that there may be unreported or
            under-reported accident history:
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                Uneven panel gaps between doors, hood, fenders, or trunk lid.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                Paint that does not quite match between adjacent panels, or
                visible overspray on rubber trim and weatherstripping.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                Fresh weld marks, replacement bolts on inner fenders, or
                aftermarket structural components.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                Airbag covers that look slightly off-color, are loose, or
                have visible seams from prior deployment and replacement.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                Tires that wear unevenly, indicating possible frame or
                alignment damage from a previous collision.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                Dashboard warning lights for ABS, traction control, or
                airbag systems that come on after start-up.
              </span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Severity Matters &mdash; But So Does Location
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A single minor parking-lot scrape is not the same as a frame-bent
            front-end collision, even though both will appear on an accident
            report. When you read a report, focus on three things: severity,
            point of impact, and whether airbags deployed. A minor rear
            bumper repaint is usually a non-issue. A severe front-end
            collision with airbag deployment is a much more serious
            consideration, especially because it may have damaged structural
            components, sensors, and ECUs that are expensive to fully
            restore.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            If the report shows a severe accident, our recommendation is to
            either pass on the vehicle or insist on a thorough pre-purchase
            inspection from a body shop that specializes in collision
            repair. Some severely damaged vehicles end up with a salvage
            brand &mdash; check our{" "}
            <Link
              href="/salvage-title-check"
              className="text-primary-600 hover:underline font-medium"
            >
              salvage title check
            </Link>{" "}
            page for more on that.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Putting It All Together
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            An accident history check is one piece of a complete due
            diligence process. Pair it with a{" "}
            <Link
              href="/stolen-vehicle-check"
              className="text-primary-600 hover:underline font-medium"
            >
              stolen vehicle check
            </Link>
            , an{" "}
            <Link
              href="/odometer-check"
              className="text-primary-600 hover:underline font-medium"
            >
              odometer check
            </Link>
            , and a full{" "}
            <Link
              href="/vin-check"
              className="text-primary-600 hover:underline font-medium"
            >
              VIN history report
            </Link>{" "}
            so nothing slips through. Buyers who do this consistently almost
            never end up with a problem car. New to the process? Start with
            our{" "}
            <Link
              href="/guides"
              className="text-primary-600 hover:underline font-medium"
            >
              full guide library
            </Link>{" "}
            for step-by-step walkthroughs.
          </p>
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 space-y-3">
              {FAQS.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold list-none">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">
                      {faq.question}
                    </h3>
                    <span className="flex-shrink-0 text-2xl text-primary-600 font-light transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/accident-history-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Check for Reported Accidents
          </h2>
          <p className="text-slate-700 mb-6">
            Enter a 17-character VIN to see crash records, insurance claims,
            and damage history.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
