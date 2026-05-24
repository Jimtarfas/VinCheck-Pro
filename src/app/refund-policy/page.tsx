import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "CarCheckerVIN refund policy. Refunds are issued only when the vehicle history report data does not match the actual vehicle. Read the eligibility criteria, evidence requirements, and request process.",
  alternates: { canonical: "/refund-policy" },
  robots: { index: true, follow: true },
};

// Last-updated date stays in one place so updates are a single-line edit.
// Change this whenever the policy text materially changes.
const LAST_UPDATED = "May 24, 2026";
const SUPPORT_EMAIL = "contact@carcheckervin.com";
const SUPPORT_PHONE = "+1 (564) 212-3985";

export default function RefundPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-3">Refund Policy</h1>
      <p className="text-sm text-slate-500 mb-8">
        <strong>Last updated:</strong> {LAST_UPDATED}
      </p>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">

        {/* ── Plain-language summary banner ─────────────────────────
            Required disclosure-first design: customers see the headline
            policy before the long-form clauses, so there is no ambiguity
            at purchase time. */}
        <div className="not-prose rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 sm:p-6">
          <h2 className="text-base font-bold text-primary mb-2 uppercase tracking-wide">
            Policy in one sentence
          </h2>
          <p className="text-slate-800 leading-relaxed">
            We issue a refund <strong>only</strong> when the data in your
            CarCheckerVIN report does <strong>not</strong> match the actual
            vehicle identified by the VIN you submitted. All other refund
            requests are not eligible.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">1. Overview</h2>
        <p>
          CarCheckerVIN sells digital vehicle history reports that are
          generated and delivered instantly the moment payment is received.
          Because each report is a one-time digital product produced on
          demand from third-party automotive databases, refunds are limited
          to the single circumstance described below.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          2. The only refund-eligible scenario
        </h2>
        <p>
          A refund will be issued if, and only if, the report you purchased
          contains data that does not correspond to the vehicle identified
          by the VIN you entered at checkout. This includes situations
          where the report returns:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            A different year, make, or model than the vehicle attached to
            the VIN by federal records (NHTSA / NMVTIS);
          </li>
          <li>
            Specifications or equipment that are demonstrably and
            materially inconsistent with the actual vehicle for that VIN;
          </li>
          <li>
            A vehicle of a different class entirely (for example, a
            motorcycle returned for a passenger-car VIN, or vice versa).
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          3. What is <em>not</em> eligible for a refund
        </h2>
        <p>
          To set clear expectations before purchase, the following
          situations do not qualify for a refund:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            Buyer&apos;s remorse, change of mind, accidental purchase, or
            ordering the wrong VIN.
          </li>
          <li>
            Limited or absent records for older vehicles (typically
            pre-1981 VINs), salvage-only vehicles, or non-US vehicles
            where third-party databases hold less data.
          </li>
          <li>
            Disagreement with the report&apos;s findings (for example, an
            accident, recall, lien, or title brand that the customer
            believes should not be listed) when the underlying data is
            accurately reflected from the source database.
          </li>
          <li>
            Inability to access the report because of an expired email
            link, missing receipt, or local device/network issue — in
            these cases we resend the report at no charge.
          </li>
          <li>
            Reports that the customer believes are incomplete because a
            third-party database did not return certain fields (for
            example, missing photos, missing market-value comparables, or
            unavailable equipment details). Where third-party providers
            return no data, CarCheckerVIN cannot synthesize it.
          </li>
          <li>
            Reports purchased through any third-party reseller, gift card,
            promotional credit, or VIN that was already reported on within
            the same billing cycle.
          </li>
          <li>
            Subscriptions or bundles after a report has been generated
            from the bundle. Unused report credits within a bundle remain
            redeemable but are not refundable in cash.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          4. Evidence required
        </h2>
        <p>
          To process a mismatch claim, please send the following to{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary-600 hover:underline">
            {SUPPORT_EMAIL}
          </a>{" "}
          within <strong>30 days</strong> of the original purchase:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>The 17-digit VIN you submitted and your order or receipt ID.</li>
          <li>
            A photo of the vehicle&apos;s VIN plate, registration document,
            or title clearly showing the same VIN.
          </li>
          <li>
            A short note describing which field(s) in the report do not
            match the actual vehicle (year / make / model / class / other).
          </li>
        </ul>
        <p>
          Our team will review the claim, cross-check the source database,
          and reply within <strong>3 business days</strong>.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          5. How refunds are issued
        </h2>
        <p>
          Approved refunds are issued to the original payment method used
          at checkout. Most card networks display the credit within{" "}
          <strong>5–10 business days</strong>. Bank-transfer or wallet
          payments may take longer depending on the processor. We do not
          issue cash, store credit, or alternative-method refunds for an
          approved card-payment claim.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          6. Chargebacks
        </h2>
        <p>
          We strongly prefer that customers contact{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary-600 hover:underline">
            {SUPPORT_EMAIL}
          </a>{" "}
          before initiating a payment-card chargeback. Most eligible
          requests are resolved within one business day. Chargebacks
          filed without first contacting us will be contested with
          evidence including the VIN submitted, the report delivered, the
          timestamp of delivery, and the IP address used at checkout.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          7. Free reports
        </h2>
        <p>
          Reports generated under a free tier or promotional credit have
          no monetary value and are therefore not refundable, but you may
          still report a data mismatch using the process above so we can
          flag the underlying record with our data providers.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">
          8. Changes to this policy
        </h2>
        <p>
          We may update this policy from time to time. Material changes
          will be announced on this page and the &ldquo;Last updated&rdquo;
          date above will be revised. Refund requests are evaluated under
          the policy in effect at the time of the original purchase.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8">9. Contact</h2>
        <p>
          Refund requests, evidence submissions, and any policy questions:
        </p>
        <ul className="list-none pl-0 space-y-1.5">
          <li>
            Email:{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary-600 hover:underline">
              {SUPPORT_EMAIL}
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href={`tel:${SUPPORT_PHONE.replace(/[^+\d]/g, "")}`} className="text-primary-600 hover:underline">
              {SUPPORT_PHONE}
            </a>{" "}
            (Mon–Fri, 9:00–18:00 US ET)
          </li>
          <li>
            Related pages:{" "}
            <Link href="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>
            {" · "}
            <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
            {" · "}
            <Link href="/pricing" className="text-primary-600 hover:underline">Pricing</Link>
          </li>
        </ul>

      </div>
    </div>
  );
}
