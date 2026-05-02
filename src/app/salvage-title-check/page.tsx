import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";

export const metadata: Metadata = {
  title: "Salvage Title Check by VIN — Rebuilt & Branded Title Lookup",
  description:
    "Check for salvage, rebuilt, flood, junk, and lemon title brands by VIN. See how to spot a branded title before you buy and avoid costly hidden damage.",
  keywords: [
    "salvage title check",
    "salvage title VIN",
    "rebuilt title check",
    "branded title check",
    "flood title VIN check",
    "junk title lookup",
    "salvage title VIN lookup free",
    "check for salvage title by VIN",
  ],
  alternates: { canonical: "/salvage-title-check" },
  openGraph: {
    title: "Salvage Title Check by VIN — Rebuilt & Branded Title Lookup",
    description:
      "Find out if a vehicle has a salvage, rebuilt, flood, or junk title brand before you buy. Run a VIN check in seconds.",
    url: "https://carcheckervin.com/salvage-title-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Salvage Title Check by VIN",
  description:
    "Learn what salvage and branded titles mean, how to identify them, and the risks of buying a salvage-titled vehicle.",
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
    "@id": "https://carcheckervin.com/salvage-title-check",
  },
  datePublished: "2026-04-16",
  dateModified: "2026-04-16",
};

export default function SalvageTitleCheckPage() {
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
              { label: "Salvage Title Check" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Salvage Title Check by VIN
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            A salvage title means an insurance company has already declared the
            vehicle a total loss. That status follows the VIN forever, even
            after repairs. Running a salvage title check by VIN is the only
            reliable way to find out before you buy &mdash; because some
            sellers will not volunteer that information on their own.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Run a Salvage Title Check Now
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What Does a Salvage Title Actually Mean?
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A salvage title is a state-issued title brand applied to a vehicle
            that an insurance company has determined is uneconomical to
            repair. Typically this happens when the cost to fix damage exceeds
            a percentage threshold of the vehicle&rsquo;s pre-loss market
            value. The threshold varies by state, ranging from roughly 50% in
            some jurisdictions to 100% in others.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Once a salvage brand is applied, it cannot be erased. Even if the
            vehicle is fully rebuilt and passes inspection, the title moves
            from &ldquo;salvage&rdquo; to &ldquo;rebuilt&rdquo; or
            &ldquo;reconstructed&rdquo; rather than reverting to clean. The
            VIN carries that history through every future ownership change,
            which is why a VIN-based check is so much more reliable than
            simply looking at the paperwork the seller hands you.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Salvage vehicles can have legitimate uses, including parts cars,
            track-day builds, and budget transportation if the buyer fully
            understands what they are getting. The problem is when buyers do
            not know &mdash; either because they were misled, or because the
            vehicle was washed through a state with weaker title laws to
            disguise its history.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            The Major Title Brands You Should Know
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            &ldquo;Branded title&rdquo; is the umbrella term for any title
            that carries a non-clean designation. Each brand tells a different
            story:
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Salvage</strong> &mdash; declared a total loss by an
                insurer; not road-legal until repaired and re-inspected.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Rebuilt / Reconstructed</strong> &mdash; previously
                salvage, now repaired and inspected for road use; resale value
                drops significantly.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Flood / Water Damage</strong> &mdash; the vehicle was
                submerged or sustained significant water intrusion; long-term
                electrical and corrosion problems are nearly guaranteed.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Junk / Non-Repairable</strong> &mdash; legally cannot
                be retitled for road use; suitable only for parts.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Lemon / Manufacturer Buyback</strong> &mdash;
                repurchased by the manufacturer due to chronic defects under
                state lemon laws.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Hail / Fire / Vandalism</strong> &mdash; specific
                cause-of-loss brands used in some states.
              </span>
            </li>
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">
            For deeper coverage of buyback brands, see our dedicated{" "}
            <Link
              href="/lemon-check"
              className="text-primary-600 hover:underline font-medium"
            >
              lemon check by VIN
            </Link>{" "}
            page.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            The Real Risks of Buying a Salvage or Rebuilt Vehicle
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Even a well-rebuilt salvage vehicle carries financial and safety
            risks that you simply do not have with a clean-title car. Buyers
            should weigh these carefully before signing anything:
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Resale value drops 20&ndash;40%</strong> compared to
                an equivalent clean-title vehicle, and the brand stays with
                the VIN forever.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Insurance is harder to get.</strong> Many carriers
                will only offer liability coverage on rebuilt titles &mdash;
                no comprehensive or collision.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Financing is limited.</strong> Most banks will not
                write a loan on a branded-title car, so you will likely need
                to pay cash.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Hidden structural damage</strong> may compromise
                airbag deployment, crumple-zone performance, and overall
                crashworthiness.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Flood damage is the worst-case scenario</strong>
                &mdash; corroded electronics, mildew, ECU failures, and
                airbag sensor problems can appear years later.
              </span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Title Washing &mdash; And Why VIN Checks Defeat It
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Title washing is the practice of moving a branded vehicle to a
            state with weaker title laws and re-registering it to obtain a
            clean-looking title. The paper title may say &ldquo;clean,&rdquo;
            but the underlying VIN history still shows every brand ever
            applied in any state. This is exactly why a VIN-based salvage
            check &mdash; pulling from NMVTIS and all 50 state DMV records
            &mdash; is so much more trustworthy than the title document
            itself.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            NMVTIS, the National Motor Vehicle Title Information System, is
            operated by the U.S. Department of Justice. Every state DMV and
            every insurance auto auction is required to report to NMVTIS,
            which means the database catches title brands that may have been
            scrubbed off the paper title in another state.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How to Run a Salvage Title Check
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Running a salvage title check on CarCheckerVIN is straightforward.
            Locate the 17-character VIN on the dashboard, the door jamb
            sticker, or the title document, then enter it into the search box
            above. The report cross-references NMVTIS, state DMV title brand
            files, and major insurance total-loss feeds to surface any salvage
            or branded-title history.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            If the report comes back clean but you still want a second
            opinion, complement the VIN check with a pre-purchase inspection
            from an independent mechanic. Combine that with our{" "}
            <Link
              href="/accident-history-check"
              className="text-primary-600 hover:underline font-medium"
            >
              accident history check
            </Link>{" "}
            and{" "}
            <Link
              href="/odometer-check"
              className="text-primary-600 hover:underline font-medium"
            >
              odometer check
            </Link>{" "}
            for the complete picture before you buy.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Need a refresher on how to read a VIN? Start with our{" "}
            <Link
              href="/guides/free-vin-check"
              className="text-primary-600 hover:underline font-medium"
            >
              free VIN check guide
            </Link>{" "}
            and then upgrade to a{" "}
            <Link
              href="/vin-check"
              className="text-primary-600 hover:underline font-medium"
            >
              full VIN report
            </Link>{" "}
            when you are ready to commit.
          </p>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/salvage-title-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Check for Salvage or Branded Titles
          </h2>
          <p className="text-slate-700 mb-6">
            Enter a 17-character VIN to instantly check NMVTIS and all 50
            state DMV title brand records.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
