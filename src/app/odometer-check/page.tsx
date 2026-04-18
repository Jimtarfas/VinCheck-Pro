import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";

export const metadata: Metadata = {
  title: "Odometer & Mileage Check by VIN — Detect Rollback Fraud | CarCheckerVIN",
  description:
    "Check a vehicle&rsquo;s mileage history by VIN to detect odometer rollback and odometer fraud. NMVTIS-backed mileage records that protect your wallet.",
  keywords: [
    "odometer rollback check",
    "mileage check VIN",
    "odometer fraud check",
    "vehicle mileage history",
    "odometer check by VIN",
    "VIN mileage lookup",
    "odometer reading history",
    "rollback detection VIN",
  ],
  alternates: { canonical: "/odometer-check" },
  openGraph: {
    title: "Odometer & Mileage Check by VIN",
    description:
      "Spot odometer rollback fraud with a VIN-based mileage history check. Compare reported readings across NMVTIS records.",
    url: "https://carcheckervin.com/odometer-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Odometer & Mileage Check by VIN",
  description:
    "Learn how odometer fraud works, how a VIN check detects rollback, and which physical signs to look for on a used vehicle.",
  author: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://carcheckervin.com",
  },
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://carcheckervin.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://carcheckervin.com/odometer-check",
  },
  datePublished: "2026-04-16",
  dateModified: "2026-04-16",
};

export default function OdometerCheckPage() {
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
              { label: "Odometer Check" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Odometer &amp; Mileage Check by VIN
          </h1>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            Odometer fraud costs U.S. consumers more than one billion dollars
            every year, according to estimates from the National Highway
            Traffic Safety Administration. A VIN-based mileage check pulls
            every reported odometer reading on file &mdash; from
            registrations, inspections, oil changes, and title transfers
            &mdash; and lays them out chronologically so any rollback
            instantly stands out.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Run a Mileage Check Now
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What Is Odometer Fraud and Why It Still Happens
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Odometer fraud is the illegal practice of altering a
            vehicle&rsquo;s mileage to make it appear to have less wear than
            it actually does. Lower mileage commands a higher resale price,
            so unscrupulous sellers roll back digital odometer readings using
            inexpensive tools that plug into the OBD-II port. A few minutes
            of work can add thousands of dollars to a car&rsquo;s asking
            price.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Although federal and state laws make odometer tampering a
            serious crime, enforcement is uneven, and the digital nature of
            modern dashboards makes the rollback itself easier than ever. The
            NHTSA estimates more than 450,000 vehicles are sold each year in
            the United States with falsified odometer readings, costing
            buyers an average of around $4,000 each.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The good news: every time a vehicle is sold, registered,
            inspected, or serviced, the odometer reading at that moment is
            often recorded somewhere &mdash; the title transfer document, the
            state inspection record, the oil-change shop database, the
            insurance claim record. A VIN-based mileage check assembles all
            of those data points into a single timeline.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How a VIN Check Detects Odometer Rollback
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The detection logic is simple: mileage on a vehicle should only
            ever go up. If the reported reading at any point is lower than a
            previously recorded reading, that is a near-certain sign of
            rollback. A quality mileage check report shows you each reading
            with its date and source, making rollback obvious at a glance.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Even when no outright rollback occurred, the report can flag
            suspicious patterns. A vehicle that accumulated 18,000 miles per
            year for five years and then suddenly shows only 2,000 miles per
            year is worth investigating. Long gaps between recorded readings
            also warrant scrutiny, since they create the window in which
            fraud is most likely to occur.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            NMVTIS &mdash; The Backbone of Mileage Data
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The National Motor Vehicle Title Information System, operated by
            the U.S. Department of Justice, requires every state DMV to
            report the odometer reading every time a vehicle title is issued
            or transferred. Insurance companies, auto auctions, and salvage
            yards are also required to participate.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            That means every state-to-state title transfer, every total-loss
            event, and every salvage-auction sale generates an
            NMVTIS-recorded odometer reading. Reputable VIN check providers
            pull from NMVTIS as a primary source. Combined with state
            inspection records and service-shop data feeds, a typical
            10-year-old vehicle will have anywhere from 5 to 30 individual
            mileage data points on file &mdash; far more than enough to
            confirm or disprove the seller&rsquo;s claim.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Physical Signs of Odometer Tampering
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A VIN check is your most powerful tool, but a careful in-person
            inspection adds another layer of protection. Watch for these
            physical clues that the reported mileage may not match reality:
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                Worn pedal pads, steering wheel, gear shift, or driver-seat
                bolster on a car claiming low mileage.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                Heavily worn or replaced tires on a vehicle showing under
                30,000 miles.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                Service stickers under the hood or on the door jamb showing
                higher mileage than the dashboard.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                Maintenance records that suddenly stop being included or
                that show date gaps of several years.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                Dashboard with mismatched fonts, misaligned digits, or signs
                that the cluster has been removed and reinstalled.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                Title document where the odometer field is marked
                &ldquo;exempt,&rdquo; &ldquo;not actual,&rdquo; or
                &ldquo;exceeds mechanical limits.&rdquo;
              </span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What to Do If You Spot a Rollback
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            If your mileage check reveals a discrepancy, do not buy the
            vehicle. Federal law (49 U.S.C. &sect; 32703) prohibits
            disconnecting, resetting, or altering an odometer with intent
            to defraud. Penalties can include up to three years in prison
            and substantial fines. You can report suspected odometer fraud
            to your state attorney general&rsquo;s office and to the
            NHTSA Office of Odometer Fraud Investigation.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            If you have already purchased a vehicle and later discover
            rollback, you may be entitled to recover three times your
            actual damages plus attorney fees under federal law. Save
            every document, including the listing, the bill of sale, your
            VIN check report, and any communications with the seller.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Combine Mileage Checks with Other VIN Reports
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            An odometer check is most powerful when combined with the rest
            of the vehicle history. A clean mileage record paired with a
            clean{" "}
            <Link
              href="/accident-history-check"
              className="text-primary-600 hover:underline font-medium"
            >
              accident history check
            </Link>
            ,{" "}
            <Link
              href="/salvage-title-check"
              className="text-primary-600 hover:underline font-medium"
            >
              salvage title check
            </Link>
            , and{" "}
            <Link
              href="/stolen-vehicle-check"
              className="text-primary-600 hover:underline font-medium"
            >
              stolen vehicle check
            </Link>{" "}
            gives you confidence that the car is what the seller says it
            is. Run a full{" "}
            <Link
              href="/vin-check"
              className="text-primary-600 hover:underline font-medium"
            >
              VIN report
            </Link>{" "}
            to see all of these in one place, or start with our{" "}
            <Link
              href="/guides/free-vin-check"
              className="text-primary-600 hover:underline font-medium"
            >
              free VIN check
            </Link>{" "}
            to confirm the basic specs.
          </p>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/odometer-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Verify Mileage Before You Buy
          </h2>
          <p className="text-slate-500 mb-6">
            Enter a 17-character VIN to see every reported odometer reading
            on file.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
