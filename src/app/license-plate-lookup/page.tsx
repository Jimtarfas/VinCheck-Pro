import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";

export const metadata: Metadata = {
  title: "License Plate Lookup — Search Any Vehicle by Plate Number",
  description:
    "Look up any vehicle by license plate number. Find the VIN, owner history, title status, accidents, and registration records from any US state plate.",
  keywords: [
    "license plate lookup",
    "search by license plate",
    "plate number search",
    "find car by plate",
    "reverse plate lookup",
    "vehicle plate search",
  ],
  alternates: { canonical: "/license-plate-lookup" },
  openGraph: {
    title: "License Plate Lookup — Search Any Vehicle by Plate Number",
    description:
      "Look up any vehicle by license plate number. Find the VIN, title status, accidents, and registration records from any US state plate.",
    url: "https://www.carcheckervin.com/license-plate-lookup",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "License Plate Lookup",
  description:
    "Learn how to search any vehicle by license plate number to find the VIN, owner history, title status, and accident records.",
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
    "@id": "https://www.carcheckervin.com/license-plate-lookup",
  },
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
};

export default function LicensePlateLookupPage() {
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
              { label: "License Plate Lookup" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            License Plate Lookup
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            A license plate lookup lets you search a vehicle using its plate number instead of the VIN. This is useful when you spot a car for sale and only have the plate, or when you want to verify that a plate matches the vehicle it&rsquo;s attached to. A plate search returns the associated VIN, which then unlocks the full vehicle history — title status, accidents, odometer records, and more.
          </p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Search a Vehicle by Plate Number
            </h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            How License Plate Lookup Works
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Every vehicle registered in the United States has both a license plate number assigned by the issuing state and a unique 17-character Vehicle Identification Number assigned by the manufacturer. State motor vehicle departments link these two identifiers in their registration databases. A license plate lookup queries those databases to retrieve the VIN associated with a given plate number.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Once the VIN is returned, the same search can pull the vehicle&rsquo;s complete history from NMVTIS, insurance databases, auction records, and service history aggregators — the same data sources used in a direct{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              VIN history report
            </Link>
            . The plate serves as the entry point; the VIN is the primary key that unlocks every downstream record.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Plate lookups work best for currently registered vehicles in US states. Plates from expired registrations, out-of-country vehicles, or dealer temp tags may return limited results. In those cases, requesting the VIN directly from the seller is the most reliable approach.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            What a Plate Search Reveals
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A license plate lookup returns a rich set of vehicle and ownership data once the associated VIN is identified. The depth of information depends on how thoroughly the state and third-party sources have reported the vehicle&rsquo;s history.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Vehicle identification</strong> &mdash; year, make, model, trim, body style, and engine from the decoded VIN.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Title and registration status</strong> &mdash; current title state, any brands (salvage, flood, lemon), and registration expiration.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Accident and damage records</strong> &mdash; collision reports, insurance claims, and structural damage disclosures.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Ownership history</strong> &mdash; number of previous owners and the states where the vehicle was registered.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Odometer readings</strong> &mdash; mileage reported at each title transfer to detect rollback fraud.</span>
            </li>
            <li className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Theft records</strong> &mdash; whether the vehicle has been reported stolen through NICB or law enforcement databases.</span>
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            State-by-State Plate Formats
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            License plate formats vary significantly from state to state, which affects how a lookup is structured. Most states use a combination of letters and numbers, but the length and pattern differ. Some states like California use seven characters (1ABC234), while others like Ohio use five or six characters. Vanity and personalized plates further complicate automated lookups because they don&rsquo;t follow standard formats.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            When entering a plate number, always include the issuing state. A plate number alone is not unique — the same alphanumeric sequence can exist in multiple states simultaneously. Including the state narrows the search to the correct motor vehicle database and returns the right vehicle record.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Special plates — commercial, government, military, diplomatic, and dealer plates — may have restricted lookup access due to privacy exemptions. Standard passenger plates and most commercial plates are searchable through normal channels.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            Privacy &amp; Legal Considerations
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            License plate lookups in the United States are governed primarily by the Driver&rsquo;s Privacy Protection Act (DPPA) of 1994, a federal law that restricts access to personal information contained in state motor vehicle records. Under the DPPA, personally identifiable information — such as the name and address of a registered owner — cannot be disclosed without a permissible purpose.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Permissible purposes include vehicle purchase verification, law enforcement, insurance claims, and litigation support. Consumer-facing plate lookup services must operate within these restrictions and typically return vehicle information (make, model, VIN, title status) rather than owner personal data. Our lookups are designed for pre-purchase vehicle research, which is a clearly permissible use under the DPPA.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            For a comprehensive pre-purchase check, combine the plate lookup with a{" "}
            <Link href="/stolen-vehicle-check" className="text-primary-600 hover:underline font-medium">
              stolen vehicle check
            </Link>{" "}
            and a full{" "}
            <Link href="/accident-history-check" className="text-primary-600 hover:underline font-medium">
              accident history report
            </Link>
            .
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            License Plate vs VIN Search
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            While both approaches ultimately access the same vehicle history data, each has distinct advantages. A plate lookup is useful when you don&rsquo;t have direct access to the vehicle and can only note the plate number. It&rsquo;s also a quick way to verify that the plate currently on a vehicle actually belongs to it — a mismatch can indicate a swapped plate, which is a red flag for theft or fraud.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A direct VIN search is more reliable because the VIN is the universal identifier used across all databases and is not state-specific. Before finalizing any used car purchase, always confirm the VIN by physically checking it on the dashboard, door jamb, and engine bay, then run a{" "}
            <Link href="/vin-check" className="text-primary-600 hover:underline font-medium">
              VIN check
            </Link>{" "}
            to get the definitive history report.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A complete pre-purchase check should also include an{" "}
            <Link href="/odometer-check" className="text-primary-600 hover:underline font-medium">
              odometer check
            </Link>{" "}
            and a{" "}
            <Link href="/salvage-title-check" className="text-primary-600 hover:underline font-medium">
              salvage title check
            </Link>{" "}
            to rule out the most common forms of used car fraud.
          </p>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/license-plate-lookup" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Search Any Vehicle by Plate or VIN
          </h2>
          <p className="text-slate-700 mb-6">
            Enter a license plate number or 17-character VIN to get the full vehicle history report.
          </p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
