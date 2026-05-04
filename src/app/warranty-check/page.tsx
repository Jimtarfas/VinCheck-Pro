import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";

export const metadata: Metadata = {
  title: "Warranty Check by VIN — Is My Car Still Under Warranty?",
  description:
    "Check if a vehicle is still covered by the manufacturer's original warranty or extended warranty by VIN. Verify powertrain, bumper-to-bumper, and CPO warranty status.",
  keywords: [
    "warranty check by VIN",
    "is my car still under warranty",
    "vehicle warranty lookup",
    "check car warranty",
    "powertrain warranty check",
    "CPO warranty VIN",
  ],
  alternates: { canonical: "/warranty-check" },
  openGraph: {
    title: "Warranty Check by VIN — Is My Car Still Under Warranty?",
    description:
      "Check if a vehicle is still covered by the manufacturer's warranty by VIN. Verify powertrain, bumper-to-bumper, and CPO warranty status.",
    url: "https://www.carcheckervin.com/warranty-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Warranty Check by VIN",
  description:
    "Learn how to check warranty status by VIN, including factory warranties, extended warranties, and certified pre-owned coverage.",
  author: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
  },
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://www.carcheckervin.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.carcheckervin.com/warranty-check",
  },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
};

export default function WarrantyCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Warranty Check" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Warranty Check by VIN
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Remaining factory warranty coverage is one of the most valuable — and frequently misrepresented — selling points for a used vehicle. A VIN-based warranty check tells you exactly which coverages are still active, how much time and mileage remains on each, and whether a Certified Pre-Owned (CPO) program has added additional coverage on top of the factory warranty. This information directly affects the vehicle&rsquo;s value and your ownership cost.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Check Warranty Status by VIN
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Types of Car Warranties
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            New vehicles in the United States typically come with at least two distinct warranty coverages: a bumper-to-bumper (or basic) warranty that covers almost all components for a shorter period, and a powertrain warranty that covers the engine, transmission, and drivetrain for a longer period. Understanding the difference between these coverages is essential when evaluating a used vehicle.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Bumper-to-bumper warranty</strong> &mdash; covers virtually all vehicle components except normal wear items. Typically 3 years/36,000 miles for most brands.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Powertrain warranty</strong> &mdash; covers engine, transmission, and drivetrain. Often 5 years/60,000 miles, or up to 10 years/100,000 miles for some Korean brands.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Corrosion/rust warranty</strong> &mdash; covers perforation of body panels from rust. Typically 5–7 years with no mileage limit.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Emission system warranty</strong> &mdash; federally mandated coverage for emission control components, typically 8 years/80,000 miles.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>EV battery warranty</strong> &mdash; electric vehicle battery packs carry separate warranties, often 8 years/100,000 miles by federal requirement.</span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How to Check Warranty Status by VIN
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Warranty status is tracked by the manufacturer using the VIN as the primary key. When a vehicle is sold new, the in-service date (the date of first retail sale) is recorded in the manufacturer&rsquo;s warranty system. The warranty clock starts from that date and mileage, regardless of how many times the vehicle changes hands. Running a VIN-based warranty check retrieves this in-service date and calculates remaining coverage based on current mileage.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Most major manufacturers also provide free warranty status lookups on their own websites. However, these lookups only show the original factory warranty and may not reflect CPO extensions, dealer-purchased extended warranties, or third-party service contracts. A comprehensive VIN report aggregates all of these records in one place.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Before buying any used vehicle, pair the warranty check with an{" "}
            <Link href="/odometer-check" className="text-primary-600 hover:underline font-medium">
              odometer check
            </Link>{" "}
            to ensure the mileage hasn&rsquo;t been rolled back. An artificially low odometer reading could make a vehicle appear to have more warranty remaining than it actually does.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Factory vs. Extended vs. CPO Warranties
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The factory warranty is provided by the manufacturer and honored at any authorized dealer. Extended warranties (also called vehicle service contracts) are purchased separately and may be issued by the manufacturer, the selling dealer, or a third party. CPO warranties are a specific type of extended coverage offered by manufacturers for used vehicles that pass a certified inspection.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            CPO programs vary significantly by manufacturer. Toyota CPO vehicles receive a 12-month/12,000-mile comprehensive warranty plus a powertrain warranty extension. BMW CPO vehicles get a minimum of 1 year of unlimited-mileage coverage. These programs add real value, but only if the vehicle qualifies and has been properly certified — always verify CPO status through the VIN rather than trusting the seller&rsquo;s word.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Third-party extended warranties vary enormously in quality and reliability. Some are administered by reputable companies; others are essentially worthless contracts with fine print that denies most claims. Always read the coverage exclusions carefully before paying for third-party coverage.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What Voids a Manufacturer Warranty
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Manufacturer warranties can be partially or fully voided by certain owner actions. The Magnuson-Moss Warranty Act protects consumers from blanket warranty voidance — a dealer cannot void your entire warranty simply because you used aftermarket parts. However, if a specific aftermarket part causes a covered component to fail, the manufacturer can deny that specific claim.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Engine modifications</strong> &mdash; performance tuning, superchargers, or nitrous systems typically void powertrain coverage.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Flood or accident damage</strong> &mdash; a vehicle that has been in a major accident or flood event may have warranty coverage denied for related repairs.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Off-road or racing use</strong> &mdash; many warranties exclude damage from track events or off-road driving.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Neglected maintenance</strong> &mdash; failure to perform required maintenance (oil changes, coolant flushes) documented at proper intervals can void coverage.</span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Buying a Car with Remaining Warranty
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A used vehicle with substantial factory warranty remaining offers a measurable financial advantage over one that is out of warranty. Factory coverage transfers to new owners automatically — there is no registration or transfer fee. The in-service date stays the same, and any authorized dealer will honor the coverage regardless of ownership history.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            When shopping for a used vehicle, use the warranty check to understand exactly how much coverage is left and price accordingly. A vehicle with 2 years of bumper-to-bumper coverage remaining is worth more than an identical vehicle that is out of warranty — the difference in repair exposure over that period can easily be thousands of dollars.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Complete your due diligence with a full{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              VIN history report
            </Link>
            , a{" "}
            <Link href="/lemon-check" className="text-primary-600 hover:underline font-medium">
              lemon check
            </Link>
            , and a{" "}
            <Link href="/salvage-title-check" className="text-primary-600 hover:underline font-medium">
              salvage title check
            </Link>{" "}
            before any purchase decision.
          </p>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/warranty-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Is This Car Still Under Warranty?
          </h2>
          <p className="text-slate-700 mb-6">
            Enter a 17-character VIN to check factory warranty status, remaining coverage, and CPO certification.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
