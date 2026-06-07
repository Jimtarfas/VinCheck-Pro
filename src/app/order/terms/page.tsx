import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldAlert, Copyright, Scale, RefreshCw, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms & Conditions for ordering NMVTIS-backed vehicle history reports from CarCheckerVIN.",
  robots: { index: false, follow: true },
};

const LAST_UPDATED = "June 7, 2026";

export default function OrderTermsPage() {
  return (
    <div className="bg-surface min-h-[calc(100vh-200px)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <Link
          href="/"
          className="text-sm text-primary hover:text-primary-700 inline-flex items-center gap-1 mb-6"
        >
          ← Back to checkout
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Terms &amp; Conditions
        </h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>

        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-8 text-sm text-slate-700 leading-relaxed">
          {/* Intro */}
          <section>
            <p>
              These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your purchase
              and use of vehicle history reports (&ldquo;Reports&rdquo;) ordered
              from CarCheckerVIN through the URL{" "}
              <code className="px-1 py-0.5 bg-slate-100 rounded text-xs">
                carcheckervin.com/order
              </code>
              . By placing an order you agree to be bound by these Terms and by
              our{" "}
              <Link
                href="/disclaimer"
                className="underline text-primary hover:text-primary-700"
              >
                NMVTIS Disclaimer
              </Link>
              .
            </p>
          </section>

          {/* CLAUSE 1 — INTERNAL USE ONLY (ClearVin-required) */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-blue-700" />
              1. Personal &amp; Internal Use Only
            </h2>
            <p>
              Reports are sold exclusively for your <strong>personal,
              non-commercial, internal use</strong> in evaluating a single
              vehicle for purchase, sale, valuation, insurance, or maintenance
              decisions. You expressly agree that you will <strong>not</strong>:
            </p>
            <ul className="mt-2 ml-4 space-y-1.5 list-disc">
              <li>
                resell, sublicense, redistribute, syndicate, repost, or
                republish any Report or any portion of its data;
              </li>
              <li>
                use any Report or its underlying data to build, train, populate,
                seed, or augment any product, dataset, AI model, database, or
                service offered to third parties;
              </li>
              <li>
                scrape, crawl, mirror, or systematically extract data from
                Reports;
              </li>
              <li>
                use Reports for the purpose of competing with CarCheckerVIN,
                ClearVin, NMVTIS, or any of their data providers.
              </li>
            </ul>
            <p className="mt-2">
              Violation of this section is a material breach of these Terms and
              of the underlying data licenses, and will result in immediate
              account termination and may give rise to civil and criminal
              liability under applicable copyright, computer-fraud, and
              data-misappropriation laws.
            </p>
          </section>

          {/* CLAUSE 2 — LIABILITY WAIVER (ClearVin-required) */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <ShieldAlert className="w-5 h-5 text-blue-700" />
              2. No Warranty &mdash; Use At Your Own Risk
            </h2>
            <p>
              <strong>
                REPORTS ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
                AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
                IMPLIED.
              </strong>{" "}
              CarCheckerVIN and its data providers (including ClearVin and the
              National Motor Vehicle Title Information System) make no
              representation, warranty, or guarantee that any Report is
              complete, accurate, current, free from error, or fit for any
              particular purpose.
            </p>
            <p className="mt-2">
              Vehicle history data is sourced from third-party records that may
              be delayed, incomplete, mis-reported, or never reported at all
              (for example, private-party accident damage not submitted to an
              insurer will not appear in any Report). The <strong>absence</strong>{" "}
              of a record in a Report is <strong>not</strong> evidence that no
              such event occurred.
            </p>
            <p className="mt-2">
              You acknowledge that a Report is only one of several due-diligence
              tools and is <strong>not a substitute</strong> for an in-person
              inspection by a qualified mechanic, a title-search through your
              state DMV, or independent legal/financial advice. You agree that
              <strong> you are solely responsible</strong> for any decision you
              make in connection with the purchase, sale, valuation,
              insurance, financing, lease, repair, or operation of any vehicle.
            </p>
            <p className="mt-2">
              <strong>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, CARCHECKERVIN, CLEARVIN,
                AND THEIR RESPECTIVE OFFICERS, EMPLOYEES, AFFILIATES, AND DATA
                PROVIDERS SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE
                DAMAGES &mdash; INCLUDING BUT NOT LIMITED TO LOST PROFITS, LOST
                DATA, COST OF REPAIR, COST OF REPLACEMENT VEHICLE, OR LOSS OF
                BARGAIN &mdash; ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF
                OR RELIANCE UPON ANY REPORT, EVEN IF ADVISED OF THE POSSIBILITY
                OF SUCH DAMAGES.
              </strong>{" "}
              In jurisdictions that do not permit the exclusion of certain
              warranties or limitation of liability, our aggregate liability to
              you shall not exceed the price you paid for the specific Report
              giving rise to the claim.
            </p>
          </section>

          {/* CLAUSE 3 — INTELLECTUAL PROPERTY / COPYRIGHT (ClearVin-required) */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Copyright className="w-5 h-5 text-blue-700" />
              3. Intellectual Property &amp; Copyright
            </h2>
            <p>
              All data contained in Reports &mdash; including but not limited to
              vehicle specifications, title records, accident records, odometer
              readings, recall information, service history, and theft and
              salvage records &mdash; is the <strong>copyrighted intellectual
              property of ClearVin LLC</strong> and the underlying data
              providers from which ClearVin compiles its records (including
              state DMVs, NMVTIS, NHTSA, the National Insurance Crime Bureau,
              participating insurance carriers, salvage auctions, and
              independent service-record contributors).
            </p>
            <p className="mt-2">
              Your purchase of a Report grants you a single, limited,
              non-exclusive, non-transferable, non-sublicensable license to
              view and download the Report for your own personal records, as
              described in Section&nbsp;1 above. <strong>No other rights are
              granted, expressly or by implication.</strong> All right, title,
              and interest in and to the Report and its underlying data remain
              the property of ClearVin LLC and its data partners.
            </p>
            <p className="mt-2">
              The CarCheckerVIN name, logo, and site design are the property of
              CarCheckerVIN. You may not remove, alter, or obscure any
              copyright, trademark, attribution, or other proprietary notice
              that appears on any Report or on this site.
            </p>
          </section>

          {/* STANDARD SECTIONS */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <RefreshCw className="w-5 h-5 text-blue-700" />
              4. Pricing, Payment &amp; Refunds
            </h2>
            <p>
              Reports are sold at the price displayed at checkout. Payment is
              processed by Stripe, Inc. CarCheckerVIN does not store your
              full payment-card details on its servers.
            </p>
            <p className="mt-2">
              Because Reports are digital products delivered immediately,
              <strong> all sales are final</strong> once the Report has been
              generated and displayed to you. We will, however, issue a{" "}
              <strong>full refund</strong> in the following cases:
            </p>
            <ul className="mt-2 ml-4 space-y-1.5 list-disc">
              <li>
                ClearVin returns no vehicle data for the VIN you submitted
                (i.e. the VIN is unknown to NMVTIS and we cannot generate a
                Report);
              </li>
              <li>
                A technical failure on our side prevents delivery of the Report
                within 24 hours of your purchase;
              </li>
              <li>
                You were charged in duplicate for the same VIN within the same
                24-hour period.
              </li>
            </ul>
            <p className="mt-2">
              Refund requests for any of the cases above must be sent to{" "}
              <a
                href="mailto:contact@carcheckervin.com"
                className="underline text-primary hover:text-primary-700"
              >
                contact@carcheckervin.com
              </a>{" "}
              within 14 days of purchase and must include the order ID and the
              VIN.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Scale className="w-5 h-5 text-blue-700" />
              5. Governing Law &amp; Dispute Resolution
            </h2>
            <p>
              These Terms are governed by the laws of the United States and the
              state in which CarCheckerVIN is registered, without regard to
              conflict-of-law principles. Any dispute arising out of or relating
              to these Terms or your use of any Report shall be resolved by
              binding individual arbitration; you waive any right to bring or
              participate in a class action.
            </p>
            <p className="mt-2">
              If any provision of these Terms is held to be unenforceable, the
              remaining provisions shall continue in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-blue-700" />
              6. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. The current version
              will always be posted at this URL with a &ldquo;Last
              updated&rdquo; date. Material changes that affect your rights
              will be communicated by email if you have an account with us.
              Continued use of the order flow after such updates constitutes
              acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Mail className="w-5 h-5 text-blue-700" />
              7. Contact
            </h2>
            <p>
              Questions about these Terms or a specific Report can be sent to{" "}
              <a
                href="mailto:contact@carcheckervin.com"
                className="underline text-primary hover:text-primary-700"
              >
                contact@carcheckervin.com
              </a>
              . We aim to respond within one business day.
            </p>
          </section>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-block px-5 py-2.5 bg-primary hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition"
          >
            Back to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
