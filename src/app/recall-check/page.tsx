import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";

export const metadata: Metadata = {
  title: "VIN Recall Check — NHTSA Safety Recall Lookup",
  description:
    "Check any vehicle for open NHTSA safety recalls by VIN. Find active recall campaigns, safety defects, and whether your vehicle has been repaired under a recall notice.",
  keywords: [
    "VIN recall check",
    "NHTSA recall lookup",
    "open recall by VIN",
    "safety recall check",
    "vehicle recall search",
    "car recall VIN",
  ],
  alternates: { canonical: "/recall-check" },
  openGraph: {
    title: "VIN Recall Check — NHTSA Safety Recall Lookup",
    description:
      "Check any vehicle for open NHTSA safety recalls by VIN. Find active recall campaigns and whether repairs have been completed.",
    url: "https://www.carcheckervin.com/recall-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "VIN Recall Check — NHTSA Safety Recall Lookup",
  description:
    "Learn how to check any vehicle for open NHTSA safety recalls by VIN, including active campaigns, safety defects, and repair status.",
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
    "@id": "https://www.carcheckervin.com/recall-check",
  },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
};

export default function RecallCheckPage() {
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
              { label: "Recall Check" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            VIN Recall Check
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            An open safety recall means the manufacturer has identified a defect that poses a risk to vehicle safety and is obligated to repair it at no cost to the owner. Millions of vehicles on US roads have open recalls at any given time — many of which the current owner is unaware of. A VIN recall check tells you instantly whether a vehicle you own or are considering buying has any unresolved safety campaigns.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Check for Open Safety Recalls
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What Is an NHTSA Recall
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The National Highway Traffic Safety Administration (NHTSA) oversees vehicle safety recalls in the United States. When a manufacturer discovers — or NHTSA determines — that a vehicle, equipment, child restraint, or tire contains a safety defect or does not comply with federal motor vehicle safety standards, a recall is issued. Manufacturers are required by law to notify owners and provide a remedy at no cost, typically a repair, replacement, or refund.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Recalls cover a wide range of defects: faulty airbag inflators (such as the historic Takata recall), brake system failures, fuel system leaks, steering defects, engine fires, and software bugs in electronic safety systems. Some recalls are urgent safety issues requiring immediate action; others are lower-risk issues that can be addressed at the next scheduled service appointment.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            NHTSA maintains a public database of all recall campaigns, searchable by VIN. This database is updated regularly as new campaigns are announced and as remedies become available. Our recall check queries this database in real time to return the most current information for any vehicle.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How to Check Recalls by VIN
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The VIN is the most precise way to check for recalls because it identifies the exact production sequence of a vehicle. Recalls are often issued for specific model years, build date ranges, or manufacturing plants — not all vehicles of a given model year are necessarily affected. The VIN allows the recall database to match your exact vehicle against the affected VIN ranges in each recall campaign.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Enter the full 17-character VIN to get precise recall matching for your specific vehicle.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Review each recall campaign listed, including the safety component affected and the nature of the defect.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Check whether each recall shows as open (unrepaired) or completed (remedy already performed).</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Note any recalls marked as remedy not yet available — meaning parts are still being produced.</span>
            </li>
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">
            You can find the VIN on the driver-side dashboard (visible through the windshield), the driver&rsquo;s door jamb sticker, insurance and registration documents, or the vehicle title.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Open vs. Completed Recalls
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The most important distinction in a recall report is between open and completed recalls. An open recall means the safety defect has been identified but the vehicle has not yet been brought in for the repair. The fix is available and free — it just hasn&rsquo;t been done. A completed recall means the authorized dealer has already performed the remedy and documented it in the manufacturer&rsquo;s recall system.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            When buying a used vehicle, open recalls should be a negotiating point. You have every right to ask the seller to have the recall completed before purchase, or to factor the dealership visit into your timeline. Recall repairs are performed free of charge at any authorized dealer for that brand, regardless of how many times the vehicle has changed hands.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Note that recall completion records are updated by dealers after the repair is performed. There can be a short lag between when the work is done and when it shows as completed in the NHTSA database. Always ask the seller for the repair order or service receipt as documentation.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Most Recalled Vehicle Makes
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Recall activity is not evenly distributed across manufacturers. High-volume manufacturers naturally appear more often in recall data because they produce more vehicles — but recall rate per vehicle sold is a more meaningful metric. The Takata airbag inflator recall alone affected tens of millions of vehicles across virtually every major manufacturer worldwide, making it the largest automotive recall in US history.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Ford</strong> &mdash; among the highest total recall volumes due to large fleet sizes across F-Series, Explorer, and Ranger.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>GM (Chevrolet, GMC, Buick, Cadillac)</strong> &mdash; frequent recall activity across truck and SUV lines.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Stellantis (RAM, Jeep, Dodge, Chrysler)</strong> &mdash; regular recall campaigns particularly on Jeep SUVs and RAM trucks.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Toyota/Lexus</strong> &mdash; known for lower recall rates relative to volume, though major campaigns do occur.</span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What to Do If Your Car Has an Open Recall
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            If a recall check reveals an open campaign on your vehicle, contact any authorized dealer for the brand. You do not need to go to the dealership where you purchased the vehicle. Bring the VIN and the recall campaign number (found on your report) to help the service department quickly identify the correct parts and procedure.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Recall repairs are performed at no cost and generally take a few hours to a full day depending on the complexity of the fix. If parts are not yet available, you can ask to be placed on a waiting list and will be notified when the remedy is ready. For urgent safety recalls — particularly those involving fire risk, loss of steering control, or airbag failures — NHTSA may require dealers to provide loaner vehicles while you wait for parts.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Combine your recall check with a full{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              VIN history report
            </Link>{" "}
            and an{" "}
            <Link href="/accident-history-check" className="text-primary-600 hover:underline font-medium">
              accident history check
            </Link>{" "}
            to get a complete picture of any vehicle&rsquo;s safety and maintenance status.
          </p>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/recall-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Check for Open NHTSA Recalls
          </h2>
          <p className="text-slate-700 mb-6">
            Enter a 17-character VIN to instantly check for active and completed safety recall campaigns.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
