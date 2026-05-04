import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";

export const metadata: Metadata = {
  title: "Dealer History Check by VIN — Was This Car a Demo or Loaner?",
  description:
    "Check if a vehicle was used as a dealer demo, service loaner, or press fleet car by VIN. Find dealer ownership records, pre-sale mileage accumulation, and commercial dealer use.",
  keywords: [
    "dealer demo check VIN",
    "service loaner history",
    "dealer car history",
    "demo vehicle VIN",
    "press fleet check",
    "dealer ownership history",
  ],
  alternates: { canonical: "/dealer-check" },
  openGraph: {
    title: "Dealer History Check by VIN — Was This Car a Demo or Loaner?",
    description:
      "Check if a vehicle was used as a dealer demo or service loaner by VIN. Find dealer ownership records and pre-sale mileage history.",
    url: "https://www.carcheckervin.com/dealer-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Dealer History Check by VIN",
  description:
    "Learn how to check if a vehicle was used as a dealer demo, service loaner, or press fleet car by VIN.",
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
    "@id": "https://www.carcheckervin.com/dealer-check",
  },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
};

export default function DealerCheckPage() {
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
              { label: "Dealer Check" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Dealer History Check by VIN
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Not every new or nearly-new car was bought fresh off the truck by a consumer. Dealers keep vehicles as demonstrators (demo cars), lend them as service loaners, and sometimes assign them to press fleets or manufacturer representatives — all before the vehicle is ever &ldquo;sold.&rdquo; A VIN dealer history check reveals whether a vehicle accumulated mileage in dealer hands before you bought it, which directly affects its warranty clock, real-world value, and condition.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Check for Dealer Demo and Loaner History
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What Is a Dealer Demo Vehicle
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A dealer demonstrator vehicle (demo) is a new vehicle that a dealership titles in the dealer&rsquo;s name for use as a test drive vehicle, executive vehicle, or sales tool before being sold to a retail buyer. Demos are driven by prospective customers during test drives, by dealer sales staff, and sometimes by the dealership owner or managers as personal vehicles. They accumulate mileage while technically still being &ldquo;new&rdquo; inventory.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Demo vehicles are typically sold at a discount relative to an equivalent never-titled new vehicle, reflecting the accumulated mileage and the fact that the vehicle has been in dealer use. The discount varies by manufacturer policy, dealer discretion, and the amount of mileage accumulated. However, the warranty clock starts from the in-service date of the demo titling — not from when you buy it.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Demo use is recorded when the dealer titles the vehicle in the dealership&rsquo;s name before the retail sale. This creates a title history entry showing the dealer as an owner, which appears in a comprehensive{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              VIN history report
            </Link>
            .
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Service Loaners vs. Demo Cars
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Service loaner vehicles are used differently from demo cars. Loaners are provided to service customers while their vehicles are being repaired — typically for a day or a few days at a time. The loaner fleet is titiled in the dealer&rsquo;s name and typically has a higher volume of short-distance, urban driving than demos, which may be used for longer test drives.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Service loaners often accumulate mileage quickly because they are in continuous daily use. A loaner vehicle used at a busy service department may cover 2,000–4,000 miles per month in stop-and-go service trips across a metropolitan area. This usage pattern is hard on brakes, transmissions, and engine systems because of the frequent short trips and variable driver behavior.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Demo vehicles</strong> &mdash; lower total mileage, mixed use including test drives and manager vehicles, typically well-optioned vehicles with all features working.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Service loaners</strong> &mdash; higher mileage in shorter time, extensive short-trip urban use, heavy interior wear from diverse driver population.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Press fleet vehicles</strong> &mdash; manufacturer or dealer vehicles lent to automotive media for review; typically well-maintained but driven hard by professional evaluators.</span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How Dealer Use Affects Mileage and Warranty
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The most important practical consequence of dealer history is the warranty impact. Manufacturer warranties start from the in-service date — the date the vehicle was first placed in service, which includes dealer titling for demo and loaner use. A vehicle that was used as a service loaner for six months before you purchase it has six months less factory warranty coverage than a vehicle delivered directly to you as a new retail buyer.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Verify the in-service date by running a{" "}
            <Link href="/warranty-check" className="text-primary-600 hover:underline font-medium">
              warranty check
            </Link>{" "}
            before finalizing any purchase of a vehicle with dealer history. The remaining coverage should reflect the actual time elapsed since the in-service date, not the purchase date. If the dealer represents remaining warranty that doesn&rsquo;t account for the demo or loaner period, this is a disclosure failure worth addressing before you sign.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            For mileage verification, run an{" "}
            <Link href="/odometer-check" className="text-primary-600 hover:underline font-medium">
              odometer check
            </Link>{" "}
            to confirm the mileage accumulation timeline is consistent with the disclosed dealer use period.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What VIN Reports Show About Dealer History
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A comprehensive VIN history report captures dealer ownership through title records. When a dealer titles a vehicle in the dealership&rsquo;s name — as they must do for demos and loaners in most states — that title event appears in the ownership chain. The dealer name, the state of titling, and the date of the title event are all recorded and visible in the history report.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Some states have specific dealer plates and registration categories that tag fleet use vehicles more explicitly. Auction records also capture dealer-to-dealer vehicle transfers, which are common when dealers move inventory between their own stores or wholesale vehicles to other dealers after a demo period ends.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Not all dealer use results in title records — in some states, dealers can maintain vehicles in dealer demo status under the dealer&rsquo;s original title without retitling, particularly for short periods. These use periods may not appear in title history. Service records and manufacturer fleet registration data can fill some of these gaps.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Buying a Former Demo or Loaner
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Former demo and loaner vehicles can be excellent used car values when they are priced appropriately. The typical discount for a former demo or loaner ranges from 10–20% below the equivalent new vehicle price, depending on mileage accumulated and the manufacturer&rsquo;s program. These vehicles are typically well-optioned (dealers demo their best configurations), have documented maintenance (dealer service records), and may still carry substantial factory warranty.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The negotiating approach should be based on accurate mileage, the actual remaining warranty, and a realistic assessment of interior condition. High-mileage service loaners may have more interior wear than the mileage suggests — focus your inspection on the highest-contact areas: driver&rsquo;s seat, steering wheel, carpets, and interior controls.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Complete your due diligence with a full{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              VIN history report
            </Link>{" "}
            and an{" "}
            <Link href="/accident-history-check" className="text-primary-600 hover:underline font-medium">
              accident history check
            </Link>{" "}
            — demo and loaner vehicles are sometimes involved in minor accidents during their dealer use that may or may not be fully disclosed.
          </p>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/dealer-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Was This Car a Demo or Loaner?
          </h2>
          <p className="text-slate-700 mb-6">
            Enter a 17-character VIN to check for dealer demo, service loaner, and press fleet ownership history.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
