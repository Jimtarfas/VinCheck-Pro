import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";

export const metadata: Metadata = {
  title: "JDM Import VIN Check — Japanese Import Vehicle History",
  description:
    "Check the history of any Japanese Domestic Market (JDM) import vehicle. Verify mileage (km to miles), import records, Japanese title history, and US compliance status.",
  keywords: [
    "JDM import check",
    "Japanese car VIN check",
    "JDM VIN decoder",
    "import vehicle history",
    "JDM mileage check",
    "Japanese import compliance",
  ],
  alternates: { canonical: "/jdm-import-check" },
  openGraph: {
    title: "JDM Import VIN Check — Japanese Import Vehicle History",
    description:
      "Check the history of any JDM import vehicle. Verify mileage, import records, and US compliance status.",
    url: "https://www.carcheckervin.com/jdm-import-check",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "JDM Import VIN Check",
  description:
    "Learn how to check the history of Japanese Domestic Market import vehicles, including mileage verification, import records, and US compliance status.",
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
    "@id": "https://www.carcheckervin.com/jdm-import-check",
  },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
};

export default function JdmImportCheckPage() {
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
              { label: "JDM Import Check" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            JDM Import VIN Check
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Japanese Domestic Market (JDM) vehicles are among the most desirable imports in the US enthusiast community — models like the Nissan Skyline GT-R, Honda NSX-R, Subaru Impreza STI Version 6, and Toyota Supra RZ were never officially sold in America. As these vehicles become eligible under the 25-year import rule, verifying their history, mileage, and compliance status is essential for any buyer.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Check a JDM Import Vehicle
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What Is a JDM Import
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Japanese Domestic Market vehicles are cars, trucks, and motorcycles manufactured for sale within Japan, often with different specifications than the versions exported to other markets. Japan&rsquo;s rigorous Shaken (vehicle inspection) system incentivizes owners to sell their vehicles at relatively low mileage compared to equivalent Western vehicles, making many JDM imports available with well-documented low-mileage histories.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            US import regulations under 49 CFR Part 591 (the &ldquo;25-year rule&rdquo;) allow vehicles that are at least 25 years old to be imported without meeting current US Federal Motor Vehicle Safety Standards (FMVSS), making them legal for registration in most states. This rule opened the door to iconic vehicles from the late 1990s and early 2000s that were previously inaccessible to US buyers.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The JDM import market has grown significantly, and with it the potential for fraud: mileage manipulation, title fabrication, compliance misrepresentation, and importation of vehicles that don&rsquo;t actually meet eligibility requirements. A thorough JDM import check protects buyers from all of these risks.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How JDM VINs Differ from US VINs
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Japanese vehicles sold exclusively in Japan do not use the standardized 17-character NHTSA VIN format — they use Japan&rsquo;s own vehicle identification system, which is shorter and structured differently. Japanese VINs encode the model code (chassis designation), engine type, and sequential production number in a format that varies by manufacturer.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            When a JDM vehicle is imported to the United States, US Customs and Border Protection (CBP) assigns a customs entry number, and the importer typically obtains a US title through the state DMV using the Japanese chassis number as the VIN (or a modified version of it). The resulting US title may show a VIN that doesn&rsquo;t conform to standard 17-character format, which is normal for legitimate JDM imports.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The difference in VIN format means that standard US VIN history databases will have limited information about the vehicle&rsquo;s Japanese ownership history. Auction records from Japanese vehicle auction platforms and Japanese vehicle history services can provide the pre-import history that US databases cannot.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Verifying JDM Mileage
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Mileage verification for JDM imports requires special attention because Japan uses kilometers, not miles. A vehicle with 60,000 km on the odometer has approximately 37,000 miles of actual use — a significant difference that unscrupulous sellers sometimes exploit by presenting the kilometer figure as miles to make the vehicle appear lower-mileage than it actually is.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Always confirm whether odometer readings are in kilometers or miles and perform the appropriate conversion (multiply km by 0.621 to get miles).</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Japanese auction export certificates (typically from USS, TAA, or JU auctions) document the mileage at the time of export sale and are a reliable reference.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>US title records should document the mileage at import; significant discrepancies between the import mileage and current mileage require explanation.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Japanese auction grade certificates rate condition on a 1–5 scale and document any damage at time of auction — these should accompany the vehicle.</span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Import Compliance and US Registration
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Legal JDM import requires compliance with US customs regulations and, in many states, compliance with state registration requirements. The vehicle must be at least 25 years old to qualify for the standard 25-year rule exemption, or must meet NHTSA and EPA compliance standards for newer vehicles (which is extremely rare for JDM-specific vehicles).
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Individual states have varying requirements for registering imported vehicles. California, for example, has additional emissions requirements (CARB compliance) that can complicate or prevent registration of some JDM vehicles. Some states require a structural inspection before registering imported vehicles. Always research your state&rsquo;s specific requirements before purchasing a JDM import.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Verify that any JDM vehicle you consider purchasing was legally imported through a licensed US importer, has cleared customs with proper documentation (CBP entry records, bond release), and has a US title from the state where it was first registered. Illegally imported vehicles cannot be registered and may be subject to seizure.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Popular JDM Models and What to Look For
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            The JDM import market is dominated by a handful of iconic models that command strong prices from enthusiast buyers. Each model has specific concerns that buyers should verify through history checks and physical inspection.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Nissan Skyline GT-R (R32, R33, R34)</strong> &mdash; verify engine matching numbers (RB26DETT), check for turbocharger rebuilds, and confirm clean title from a licensed importer.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Toyota Supra (JZA80)</strong> &mdash; confirm 2JZ-GTE twin-turbo engine if claimed, verify gearbox (6-speed is highly desirable), check for track damage.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Honda NSX / NSX-R</strong> &mdash; confirm NSX-R specification (lighter weight, no A/C or radio), verify mileage against Japanese auction documentation.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Subaru Impreza WRX STI</strong> &mdash; verify engine (EJ20 vs. EJ207), check differential condition, and confirm no major rally or track damage.</span>
            </li>
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">
            For any JDM purchase, also run a{" "}
            <Link href="/stolen-vehicle-check" className="text-primary-600 hover:underline font-medium">
              stolen vehicle check
            </Link>{" "}
            and a full{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              VIN history report
            </Link>{" "}
            on the US chassis number to capture any domestic history after import.
          </p>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/jdm-import-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Check Any JDM Import Vehicle
          </h2>
          <p className="text-slate-700 mb-6">
            Enter the VIN or chassis number to check import records, mileage history, and US compliance status for any JDM vehicle.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
