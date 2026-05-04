import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";

export const metadata: Metadata = {
  title: "Total Loss Check by VIN — Was This Car Totaled?",
  description:
    "Check if a vehicle was declared a total loss by insurance by VIN. Find insurance write-off records, rebuilt totals, and structural damage history before you buy.",
  keywords: [
    "total loss check VIN",
    "was this car totaled",
    "insurance write-off VIN",
    "total loss vehicle check",
    "rebuilt total loss",
    "totaled car history",
  ],
  alternates: { canonical: "/total-loss-check" },
  openGraph: {
    title: "Total Loss Check by VIN — Was This Car Totaled?",
    description:
      "Check if a vehicle was declared a total loss by insurance by VIN. Find insurance write-off records and structural damage history.",
    url: "https://www.carcheckervin.com/total-loss-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Total Loss Check by VIN",
  description:
    "Learn how to check if a vehicle was declared a total loss by insurance, including what total loss means for value, safety, and title status.",
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
    "@id": "https://www.carcheckervin.com/total-loss-check",
  },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
};

export default function TotalLossCheckPage() {
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
              { label: "Total Loss Check" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Total Loss Check by VIN
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            A vehicle declared a total loss by an insurance company has been in a collision, flood event, or other incident severe enough that repair costs exceed a threshold percentage of the vehicle&rsquo;s value. These vehicles can be rebuilt and retitled, often without obvious signs of their history to casual buyers. A VIN total loss check reveals insurance write-off records, structural damage history, and whether a vehicle carries a rebuilt total loss title.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Check for Total Loss History
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What Makes a Car a Total Loss
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Insurance companies declare a vehicle a total loss when the cost to repair exceeds a threshold percentage of the vehicle&rsquo;s pre-accident actual cash value (ACV). This threshold — called the total loss threshold or total loss formula — varies by state, ranging from 60% to 100% of ACV depending on the jurisdiction. In states using a 70% threshold, a vehicle worth $20,000 will be declared a total loss if repair estimates exceed $14,000.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The calculation includes both the direct repair costs and the anticipated diminished value after repair. Vehicles with extensive frame damage, airbag deployment, or flood damage are almost always totaled because of the high cost of structural repair and the liability exposure of returning a compromised vehicle to the road. Modern unibody construction means that significant frame damage — even from a moderate-speed collision — can be extremely expensive to repair correctly.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Total loss can result from collision damage, flood submersion, fire damage, hail impact, theft-related damage, or any other covered loss event. The resulting title brand depends on the cause: a collision total loss typically results in a salvage brand, a flood total loss results in a flood or salvage brand, and a fire total loss results in a salvage brand.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Total Loss vs. Salvage Title
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Total loss and salvage title are related but distinct concepts. When an insurer declares a vehicle a total loss, the insurance company takes ownership and brands the title as &ldquo;salvage.&rdquo; However, not all salvage titles result from insurance total losses — some states brand titles as salvage for vehicles that are severely damaged even if no insurance claim was filed.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Conversely, not all total loss vehicles get salvage titles. Some states allow owners to retain their vehicle after a total loss declaration by accepting a reduced settlement and keeping the car. In these cases, the title may be branded as &ldquo;owner retain&rdquo; or &ldquo;non-repairable&rdquo; rather than standard salvage. NMVTIS captures these various brand designations, making a VIN check more comprehensive than just looking at the paper title.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A full{" "}
            <Link href="/salvage-title-check" className="text-primary-600 hover:underline font-medium">
              salvage title check
            </Link>{" "}
            alongside the total loss check provides the most complete picture of any branded title history.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How Insurance Companies Report Total Loss
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            When an insurer declares a total loss, they are required to report the vehicle to NMVTIS within a defined timeframe (typically 30 days). The report includes the VIN, the nature of the loss, the ACV determination, and the disposition of the vehicle. This report triggers a title brand at the state level, which is then reflected in NMVTIS for all subsequent queries.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>All major insurers are required by law to report total losses to NMVTIS within 30 days of the declaration.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Salvage auction companies (Copart, IAA) also report vehicles they receive, providing an additional layer of documentation.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Insurance industry databases like ISO ClaimSearch contain claims data that supplements NMVTIS records.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>State motor vehicle agencies brand the title based on insurer and auction reporting, creating a permanent record.</span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Rebuilt Total Loss Vehicles
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            After a vehicle is declared a total loss and receives a salvage title, it can be purchased from the insurance company at salvage auction. Rebuilders — ranging from professional shops to backyard mechanics — then repair the vehicle and apply for a rebuilt or reconstructed title through their state DMV. The rebuilt title requires an inspection in most states, but inspection standards vary dramatically by jurisdiction.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A rebuilt title vehicle will always carry a permanently lower value than a comparable clean-title vehicle — typically 20–40% less depending on the vehicle type and the extent of the original damage. Insurance options are also more limited: most insurers will not provide comprehensive or collision coverage for rebuilt title vehicles, leaving owners exposed to total loss risk with only liability coverage.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The quality of a rebuilt total loss vehicle depends entirely on the quality of the repair work. A professionally rebuilt vehicle with documented structural repairs can be a safe, reliable vehicle; a poorly rebuilt vehicle with incomplete structural repairs can be genuinely dangerous. Have any rebuilt title vehicle inspected by a structural repair specialist before purchase.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Why Total Loss History Matters for Resale
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Total loss history creates a permanent value discount that compounds with each subsequent sale. When you go to sell a rebuilt title vehicle, the next buyer&rsquo;s VIN check will reveal the history, and you will face the same 20–40% discount that you negotiated when you bought it. This resale penalty is one of the most important reasons to run a total loss check before purchasing any used vehicle.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Even vehicles that were total losses but were repaired with a clean title (in states where this is possible through various title washing mechanisms) have a documented insurance total loss record in NMVTIS that will appear in VIN history reports. The paper title may look clean, but the VIN history tells the true story.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Combine a total loss check with a full{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              VIN history report
            </Link>{" "}
            and an{" "}
            <Link href="/accident-history-check" className="text-primary-600 hover:underline font-medium">
              accident history check
            </Link>{" "}
            to capture both the total loss event and any additional damage incidents.
          </p>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/total-loss-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Was This Car Totaled? Find Out Now.
          </h2>
          <p className="text-slate-700 mb-6">
            Enter a 17-character VIN to check for total loss declarations, insurance write-off records, and rebuilt title history.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
