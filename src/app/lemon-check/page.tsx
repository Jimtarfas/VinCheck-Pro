import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";

export const metadata: Metadata = {
  title: "Lemon Check by VIN — Lemon Law Buyback Lookup",
  description:
    "Check if a vehicle is a lemon law buyback by VIN. See manufacturer repurchase records, defect history, and state lemon law variations before you buy.",
  keywords: [
    "lemon check by VIN",
    "is this car a lemon",
    "lemon law buyback check",
    "lemon car history",
    "manufacturer buyback VIN",
    "lemon vehicle lookup",
    "VIN lemon law check",
    "buyback title check",
  ],
  alternates: { canonical: "/lemon-check" },
  openGraph: {
    title: "Lemon Check by VIN — Lemon Law Buyback Lookup",
    description:
      "Find out if a used vehicle was bought back by the manufacturer under state lemon laws. Run a VIN lemon check in seconds.",
    url: "https://carcheckervin.com/lemon-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Lemon Check by VIN",
  description:
    "Learn how lemon laws work, what manufacturer buyback brands look like, and how to identify a lemon vehicle from its VIN.",
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
    "@id": "https://carcheckervin.com/lemon-check",
  },
  datePublished: "2026-04-16",
  dateModified: "2026-04-16",
};

export default function LemonCheckPage() {
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
              { label: "Lemon Check" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Lemon Check by VIN
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            A &ldquo;lemon&rdquo; is a vehicle the manufacturer was forced to
            buy back from the original owner because of chronic defects that
            could not be repaired in a reasonable number of attempts. Many
            lemon vehicles are eventually resold to unsuspecting buyers on
            the used market. A VIN-based lemon check tells you if the car
            you&rsquo;re considering carries a manufacturer buyback brand
            before you write a check.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Run a Lemon Check Now
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What Is a Lemon Law and Who Does It Protect?
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Lemon laws are consumer-protection statutes that require
            automobile manufacturers to repurchase or replace a new vehicle
            with substantial defects that cannot be fixed within a defined
            number of repair attempts. Every U.S. state has its own version
            of a lemon law, and the federal Magnuson-Moss Warranty Act
            provides additional protections that apply nationwide.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Lemon laws were created to protect new car buyers, but the
            vehicles that get repurchased rarely disappear from the road.
            Manufacturers usually resell them at auction to dealers, who in
            turn list them on used car lots. Some states require the title to
            be branded &ldquo;Manufacturer Buyback,&rdquo; &ldquo;Lemon
            Law Buyback,&rdquo; or &ldquo;Warranty Return.&rdquo; Other
            states have weaker disclosure requirements, which is exactly
            where a VIN-based lemon check earns its keep.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Lemon brand information is reported into NMVTIS along with
            other title brands, so a thorough VIN check pulls these records
            even if the title document itself has been &ldquo;washed&rdquo;
            in a state with weaker laws.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Manufacturer Buybacks &mdash; What Actually Happens
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            When a vehicle qualifies as a lemon, the manufacturer typically
            offers the original owner a refund of the purchase price (minus
            a usage fee) or a comparable replacement vehicle. The original
            owner walks away whole, but the manufacturer is left holding a
            problem car. To recover some value, the manufacturer either
            attempts a final repair and resells the vehicle through a dealer
            network, or sends it to an auction where dealers can bid.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            In most states the manufacturer must disclose the buyback
            history to the next purchaser. In some states, however,
            disclosure is not required if the vehicle leaves the state, the
            title is reissued, and the buyback brand is dropped. That is
            why a VIN check is more reliable than the paper title.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How to Identify a Lemon From the VIN Report
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            On a VIN check report, a lemon vehicle will surface in one or
            more of the following ways:
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Title brand</strong> &mdash; explicit
                &ldquo;Manufacturer Buyback,&rdquo; &ldquo;Lemon Law
                Buyback,&rdquo; or similar designation.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Repeated repair attempts</strong> for the same
                problem, often visible in service-history records.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Long ownership gaps</strong> shortly after the
                original sale, often pointing to a manufacturer repurchase
                event.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Open recalls</strong> for the same component family
                that was the subject of the buyback.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Auction history</strong> showing the vehicle was
                sold by a manufacturer captive auction shortly after a
                short ownership period.
              </span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Why Lemon Vehicles Are Worth Avoiding
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The whole reason a vehicle was bought back under a lemon law is
            that the manufacturer could not repair the underlying problem
            within a reasonable number of attempts. Buying that car
            secondhand is essentially betting that the next attempt will
            finally stick &mdash; and that is rarely a winning bet.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Beyond the underlying defect, lemon vehicles typically sell at
            a steep discount to clean-title cars (often 15&ndash;40% less),
            but the resale headache cuts both ways. When you go to sell, the
            next buyer&rsquo;s VIN check will surface the brand and you
            will face the same discount in reverse. Insurance and financing
            options are also more limited for branded-title vehicles, much
            like with{" "}
            <Link
              href="/salvage-title-check"
              className="text-primary-600 hover:underline font-medium"
            >
              salvage and rebuilt titles
            </Link>
            .
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            State-by-State Lemon Law Variations
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Lemon laws vary significantly across the United States. Some of
            the most important differences include:
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Coverage period.</strong> Most states cover the
                first 12&ndash;24 months or 12,000&ndash;24,000 miles, but
                some states extend protection further.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Repair attempt threshold.</strong> Typically
                3&ndash;4 attempts at the same defect, or 30 cumulative
                days out of service, qualifies a vehicle as a lemon.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Used-car coverage.</strong> A handful of states,
                including New York, New Jersey, and Massachusetts, extend
                lemon law protections to certain used-car purchases.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Disclosure requirements.</strong> Some states
                require permanent buyback brands on the title; others do
                not, which enables title washing across state lines.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Leased vehicles.</strong> Most states extend lemon
                law protection to leased vehicles, but the procedure to
                claim differs.
              </span>
            </li>
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Because of this state-by-state patchwork, a VIN check is the
            only way to reliably catch a lemon that has been moved across
            state lines.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Run a Complete Pre-Purchase Check
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A lemon check pairs naturally with a full vehicle history
            report. Combine it with our{" "}
            <Link
              href="/accident-history-check"
              className="text-primary-600 hover:underline font-medium"
            >
              accident history check
            </Link>
            ,{" "}
            <Link
              href="/odometer-check"
              className="text-primary-600 hover:underline font-medium"
            >
              odometer check
            </Link>
            , and{" "}
            <Link
              href="/stolen-vehicle-check"
              className="text-primary-600 hover:underline font-medium"
            >
              stolen vehicle check
            </Link>{" "}
            to get the complete picture in one report. Our full{" "}
            <Link
              href="/vin-check"
              className="text-primary-600 hover:underline font-medium"
            >
              VIN history report
            </Link>{" "}
            includes all of these data points for a single low price
            &mdash; see how we compare in our{" "}
            <Link
              href="/vin-check-vs-carfax"
              className="text-primary-600 hover:underline font-medium"
            >
              VIN check vs Carfax
            </Link>{" "}
            comparison.
          </p>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/lemon-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Check for Lemon Buyback History
          </h2>
          <p className="text-slate-700 mb-6">
            Enter a 17-character VIN to see manufacturer buyback brands and
            defect repair history.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
