import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, TriangleAlert, Info, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "NMVTIS Disclaimer",
  description:
    "Federally-mandated National Motor Vehicle Title Information System (NMVTIS) disclaimer for vehicle history reports.",
  robots: { index: false, follow: true },
};

export default function NmvtisDisclaimerPage() {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-200px)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <Link
          href="/order"
          className="text-sm text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 mb-6"
        >
          ← Back to checkout
        </Link>

        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-blue-50 border border-blue-200 text-blue-800 px-2.5 py-1 rounded-full mb-4">
          <ShieldCheck className="w-3 h-3" />
          Federally Mandated Disclosure
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          NMVTIS Disclaimer
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Required by 49 U.S.C. &sect;&nbsp;30502 and 28 C.F.R. Part&nbsp;25,
          Subpart&nbsp;C.
        </p>

        <div className="mt-8 space-y-6 text-sm text-slate-700 leading-relaxed">
          {/* Official NMVTIS notice — verbatim from federally required text */}
          <div className="bg-white border-2 border-slate-300 rounded-2xl p-6 sm:p-8">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Official NMVTIS Notice to Consumers
            </p>

            <p>
              The National Motor Vehicle Title Information System (NMVTIS) is
              an electronic system that contains information on certain
              automobiles titled in the United States. NMVTIS is intended to
              serve as a reliable source of title and brand history for
              automobiles, but it does not contain detailed information
              regarding the vehicle&rsquo;s repair history.
            </p>

            <p className="mt-3">
              All states, insurance carriers, and junk and salvage yards are
              required by federal law to report information to NMVTIS. However,
              NMVTIS data is supplied by current data providers, and the data
              for any vehicle may not be in the system if the data providers
              are not yet reporting. Information on the date of any new data
              provided will be included in your report.
            </p>

            <p className="mt-3">
              Until <strong>December&nbsp;31,&nbsp;2009</strong>, NMVTIS data
              provided in this report reflects information supplied to the
              system as of that date. Currently, the following jurisdictions
              are providing vehicle data to NMVTIS: information about most
              vehicles titled in the United States is now available through
              the system, including most vehicles in the current vehicle
              fleet.
            </p>

            <p className="mt-3">
              <strong>NMVTIS also collects information from insurance
              carriers</strong> that are required by federal law to report
              vehicles they have declared a total loss. NMVTIS also collects
              information from junk and salvage yards that are required by
              federal law to report vehicles received by their facilities.
            </p>

            <p className="mt-3">
              While NMVTIS is designed to protect consumers from fraud and
              unsafe vehicles, users should not solely rely on NMVTIS. NMVTIS
              data does not include event data on vehicles damaged prior to
              the implementation of the NMVTIS reporting requirements; data
              on collision damage that has not been reported by a participating
              insurance carrier; or data on damage to vehicles where insurance
              claims were not filed.
            </p>

            <p className="mt-3">
              <strong>
                Before purchasing a vehicle, in addition to obtaining a vehicle
                history report, consumers should:
              </strong>
            </p>
            <ul className="mt-2 ml-5 space-y-1.5 list-disc">
              <li>
                Obtain an independent vehicle inspection by a qualified
                mechanic of their choosing.
              </li>
              <li>
                Verify that the vehicle identification number (VIN) on the
                vehicle matches the VIN on the title and any other vehicle
                documents.
              </li>
              <li>
                Examine the title to determine if there are any brands listed
                (i.e., flood, salvage, junk, etc.).
              </li>
            </ul>

            <p className="mt-3">
              For more information about NMVTIS, the data included in the
              system, and the definitions of the standard NMVTIS brands, please
              visit{" "}
              <a
                href="https://vehiclehistory.bja.ojp.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-700 hover:text-blue-900 inline-flex items-center gap-0.5"
              >
                vehiclehistory.bja.ojp.gov
                <ExternalLink className="w-3 h-3" />
              </a>
              .
            </p>
          </div>

          {/* Provider attribution */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-blue-700" />
              Data Provider Attribution
            </h2>
            <p>
              The NMVTIS-backed data displayed in your CarCheckerVIN report is
              supplied by <strong>ClearVin LLC</strong>, an approved NMVTIS
              Data Provider. All right, title, and interest in the data remain
              the property of ClearVin and its underlying data partners
              (state DMVs, NMVTIS, NHTSA, the National Insurance Crime Bureau,
              participating insurance carriers, salvage auctions, and
              independent service-record contributors).
            </p>
            <p className="mt-2">
              CarCheckerVIN is a reseller of ClearVin&rsquo;s NMVTIS data
              service. CarCheckerVIN does not modify, edit, alter, or omit any
              data value returned by ClearVin; only the surrounding layout and
              styling are customized for the CarCheckerVIN brand.
            </p>
          </div>

          {/* Limits of NMVTIS data */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-7">
            <h2 className="text-base font-bold text-amber-900 flex items-center gap-2 mb-3">
              <TriangleAlert className="w-4 h-4" />
              What NMVTIS Cannot Tell You
            </h2>
            <p className="text-amber-900">
              An NMVTIS-backed report is a powerful tool but it is{" "}
              <strong>not a complete history</strong> of any vehicle. In
              particular, NMVTIS data{" "}
              <strong>does not include</strong>:
            </p>
            <ul className="mt-2 ml-5 space-y-1.5 list-disc text-amber-900">
              <li>
                accidents or damage that were not reported to an insurance
                carrier or to law enforcement;
              </li>
              <li>
                service or maintenance records from independent shops that do
                not report to a national database;
              </li>
              <li>
                manufacturer-issued recall <em>completion</em> status (only the
                recall itself);
              </li>
              <li>
                outstanding loans, liens, or finance encumbrances on the
                vehicle;
              </li>
              <li>
                certified pre-owned (CPO) inspection records held by individual
                dealers;
              </li>
              <li>
                events occurring before NMVTIS reporting requirements were
                phased in for a given jurisdiction.
              </li>
            </ul>
            <p className="mt-3 text-amber-900">
              For these reasons, the U.S. Department of Justice and the
              federal NMVTIS program <strong>strongly recommend</strong> that
              every used-vehicle purchase be accompanied by an in-person
              inspection performed by a qualified mechanic of your choosing.
            </p>
          </div>

          {/* Cross-link to terms */}
          <p className="text-xs text-slate-500 text-center">
            See also our{" "}
            <Link
              href="/order/terms"
              className="underline hover:text-slate-900"
            >
              Terms &amp; Conditions
            </Link>{" "}
            for the full liability waiver and intellectual-property notice.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/order"
            className="inline-block px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold rounded-xl transition"
          >
            Back to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
