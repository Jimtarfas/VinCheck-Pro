import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";

export const metadata: Metadata = {
  title: "RV & Motorhome VIN Check — Free Recreational Vehicle History",
  description:
    "Check any RV, motorhome, travel trailer, or camper van by VIN. Get full vehicle history including title status, accident records, recall information, and lien checks.",
  keywords: [
    "RV VIN check",
    "motorhome VIN check",
    "recreational vehicle history",
    "camper VIN lookup",
    "travel trailer VIN",
    "RV title check",
  ],
  alternates: { canonical: "/rv-vin-check" },
  openGraph: {
    title: "RV & Motorhome VIN Check — Free Recreational Vehicle History",
    description:
      "Check any RV, motorhome, or travel trailer by VIN. Get full vehicle history including title status, accident records, and lien checks.",
    url: "https://www.carcheckervin.com/rv-vin-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "RV & Motorhome VIN Check",
  description:
    "Learn how to check any RV, motorhome, or travel trailer by VIN, including title status, accident history, and lien records.",
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
    "@id": "https://www.carcheckervin.com/rv-vin-check",
  },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
};

export default function RvVinCheckPage() {
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
              { label: "RV VIN Check" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            RV &amp; Motorhome VIN Check
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Recreational vehicles represent some of the largest purchases in the used vehicle market, yet many buyers skip the VIN check that is standard practice for car purchases. An RV VIN check reveals title history, accident records, active liens, flood damage, and recall information — all of which are especially important given the significant cost of RV repairs and the complexity of these vehicles compared to standard automobiles.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Run a Free RV VIN Check
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How RV VINs Work
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Motorhomes and drivable RVs use the standard 17-character VIN format, with the chassis manufacturer&rsquo;s WMI code appearing in the first three characters. Class A and Class C motorhomes are typically built on chassis supplied by Ford, Freightliner, Workhorse, or RAM, meaning the VIN is tied to the chassis manufacturer — not the coach builder. The coach builder (Thor, Winnebago, Coachmen, Forest River, etc.) installs their habitation body onto the purchased chassis.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            This two-manufacturer structure creates an important distinction: the VIN history tracks the chassis, while issues with the living quarters (slideout mechanisms, roof leaks, appliance failures) may not appear in VIN-linked records. A VIN check is essential for the chassis history, but a thorough physical inspection by an RV specialist is equally important for the coach itself.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Travel trailers, fifth wheels, and non-drivable campers also use VINs but are registered differently from motorized vehicles. Their VINs track title status and lien information through state DMV records, though some states handle non-motorized RV registration separately from standard vehicle titles.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Types of RVs and Their VIN Locations
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            RVs span a wide range of configurations, and VIN location varies by type. Knowing where to find the VIN on a specific RV type is the first step before running any history check.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Class A motorhomes</strong> &mdash; VIN is typically on the driver-side dashboard (visible through windshield) and on the driver-side door jamb.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Class B camper vans</strong> &mdash; VIN follows the base van manufacturer&rsquo;s placement, typically on the dashboard and door jamb.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Class C motorhomes</strong> &mdash; VIN on dashboard and driver door jamb; may also have a coach builder data plate inside the entry door.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Travel trailers and fifth wheels</strong> &mdash; VIN plate is typically located on the forward left (street) side of the trailer frame or on an exterior data plate.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Pop-up and folding campers</strong> &mdash; VIN plate is usually on the frame, often near the tongue or on the street-side exterior.</span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What an RV VIN Report Covers
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A comprehensive RV VIN report returns the same core data categories as an automobile history report, with particular relevance to the high dollar values involved in RV transactions. Liens are especially important for RV buyers — recreational vehicles are frequently financed with long-term loans, and outstanding liens can complicate or prevent title transfer.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Accident history for motorhomes is particularly consequential. A Class A motorhome accident may involve significant chassis damage, coach structural damage, or slideout mechanism damage — all of which are extremely expensive to repair. Insurance total loss declarations on RVs can result from relatively modest damage because repair costs for coach components are so high relative to actual cash values.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Recall information for RVs covers both the chassis manufacturer recalls (affecting the drivetrain, brakes, and safety systems) and coach manufacturer recalls (affecting appliances, electrical systems, and living quarters components). Check for open recalls using our{" "}
            <Link href="/recall-check" className="text-primary-600 hover:underline font-medium">
              recall check tool
            </Link>{" "}
            before finalizing any RV purchase.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            RV-Specific Title Issues
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            RVs face several title complications that are less common in standard vehicle purchases. Older RVs that have been converted from one use to another (shuttle bus to camper van, commercial van to DIY camper) may have title history that doesn&rsquo;t accurately reflect the current configuration. Lien releases from lenders — especially for older RVs purchased with financing — may not be cleanly documented in all state systems.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Salvage-branded RVs are a particular concern. A hail storm or parking lot incident that would cause cosmetic damage to an automobile can trigger a total loss declaration for an RV because coach body repair costs are disproportionately high. A salvage-branded RV may look perfectly fine externally but carry a title brand that significantly affects insurability and resale value.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Always run a{" "}
            <Link href="/salvage-title-check" className="text-primary-600 hover:underline font-medium">
              salvage title check
            </Link>{" "}
            and a full{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              VIN history report
            </Link>{" "}
            before making any RV purchase offer.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Buying a Used RV Safely
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The used RV market requires more due diligence than used car purchases because of the higher dollar amounts, greater complexity of the vehicle, and fewer consumer protection mechanisms. A private party RV sale carries no dealer warranty, no lemon law protection, and limited recourse if problems emerge after purchase.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Beyond the VIN check, always have a used RV inspected by a certified RV technician (RVIA certification is the industry standard) before purchase. The inspector should check the roof for delamination and water intrusion, the slideout seals and mechanisms, the LP gas system, all appliances, the electrical system, fresh water and holding tank systems, and the chassis underbody.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Request the complete maintenance history, any warranties still in effect, and documentation of any repairs. Pair this with a full{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              VIN history report
            </Link>{" "}
            and an{" "}
            <Link href="/accident-history-check" className="text-primary-600 hover:underline font-medium">
              accident history check
            </Link>{" "}
            for complete pre-purchase protection.
          </p>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/rv-vin-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Check Any RV or Motorhome by VIN
          </h2>
          <p className="text-slate-700 mb-6">
            Enter the 17-character VIN from any motorhome, travel trailer, or camper van to get the full history report.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
