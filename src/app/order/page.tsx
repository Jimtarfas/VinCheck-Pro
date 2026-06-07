import type { Metadata } from "next";
import { ShieldCheck, FileText, Clock, BadgeCheck } from "lucide-react";
import OrderVinForm from "./_components/OrderVinForm";
import { stripeConfig } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Order a Vehicle History Report",
  description:
    "Order a comprehensive NMVTIS-backed vehicle history report. Title brands, accident records, odometer history, open recalls. Instant delivery.",
  robots: { index: false, follow: true },
};

const SELLING_POINTS = [
  { icon: FileText, title: "Full NMVTIS data", body: "Title brands, accident & theft records, odometer history, open recalls." },
  { icon: Clock, title: "Instant delivery", body: "Report delivered in your browser within seconds of payment." },
  { icon: BadgeCheck, title: "NMVTIS-certified source", body: "Data sourced from ClearVin, an approved NMVTIS Data Provider." },
];

export default function OrderPage() {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-200px)]">
      {/* Hero strip */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-white/10 border border-white/20 px-2.5 py-1 rounded-full mb-4">
            <ShieldCheck className="w-3 h-3" />
            NMVTIS-Backed Vehicle History
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Get the full history before you buy
          </h1>
          <p className="mt-3 text-white/80 text-base sm:text-lg max-w-2xl">
            Enter any 17-character VIN to see a free preview. Order the complete report
            for {stripeConfig.priceLabel()} and decode everything in seconds.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 pb-12">
        <OrderVinForm
          priceCents={stripeConfig.priceCents()}
          mockMode={!stripeConfig.isConfigured()}
        />

        {/* Selling points */}
        <div className="grid sm:grid-cols-3 gap-3 mt-8">
          {SELLING_POINTS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-white border border-slate-200 rounded-xl p-4"
            >
              <Icon className="w-5 h-5 text-blue-700 mb-2" />
              <p className="text-sm font-bold text-slate-900 mb-1">{title}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* What's in the report */}
        <section className="mt-10 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7">
          <h2 className="text-lg font-bold text-slate-900">What&rsquo;s in a full report</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
            {[
              "Full title history with brand records (salvage, rebuilt, flood, hail, lemon, etc.) from every state the vehicle has been registered in.",
              "Reported accident events with severity, location, airbag deployment, and damage area.",
              "Every recorded odometer reading from DMV transfers, inspections, and service events — surface odometer rollback instantly.",
              "Open NHTSA safety recalls with remedy instructions.",
              "Number of past owners and registration transfers.",
              "Service & maintenance records reported to ClearVin&rsquo;s data partners.",
              "NMVTIS-mandated theft and total-loss records.",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2">
                <BadgeCheck className="w-4 h-4 text-blue-700 mt-0.5 flex-shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: line }} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
