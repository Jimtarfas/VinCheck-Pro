import { Check, Sparkles, Eye } from "lucide-react";
import VinSearchForm from "@/components/VinSearchForm";
import { pricingOptions, formatUsd, SINGLE_PRICE_CENTS } from "@/lib/pricing";

// The home pricing mirrors the authoritative pack prices from the pricing lib
// (single report + the discounted 3 / 5 / 10 prepaid packs) so the marketing
// page can never drift from what checkout actually charges.
const PER_REPORT = SINGLE_PRICE_CENTS / 100;
const money = (n: number) => `$${n.toFixed(2)}`;

const features = [
  "Full vehicle specifications",
  "Equipment & options list",
  "Engine & transmission details",
  "Market value estimates",
  "Recall information",
  "Real vehicle photos",
  "Ownership cost data",
];

// Per-size marketing copy; price/per-report/savings all come from the pricing
// lib so this stays display-only metadata.
const PLAN_META: Record<number, { label: string; desc: string }> = {
  1: { label: "The Starter", desc: "Perfect for a single car purchase" },
  3: { label: "Most Popular", desc: "Great for comparing a few options" },
  5: { label: "Best Value", desc: "Best value for serious car shoppers" },
  10: { label: "The Pro", desc: "For dealers and fleet buyers" },
};

const plans = pricingOptions().map((o) => ({
  ...o,
  label: PLAN_META[o.size]?.label ?? `${o.size} Reports`,
  desc: PLAN_META[o.size]?.desc ?? "",
  popular: o.bestValue,
}));

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest mb-4 sm:mb-5 text-on-secondary-container"
            style={{ background: "var(--color-secondary-container)" }}>
            <Sparkles className="w-4 h-4" /> Simple, honest pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
            Just <span className="price">{money(PER_REPORT)}</span> per report.
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto">
            Start with a <span className="font-black text-primary">free preview</span> — see the vehicle, photos and records we already have at no cost. Unlock the complete history report for just {money(PER_REPORT)} per VIN.
          </p>
        </div>

        {/* ── Inline VIN entry ────────────────────────────────────────────
            Users type their VIN right here and go straight to their report —
            no need to jump to another page just to enter it. The card buttons
            below all scroll back up to this bar. */}
        <div
          id="pricing-search"
          className="max-w-2xl mx-auto mb-10 sm:mb-14 flex flex-col items-center scroll-mt-28"
        >
          <p className="text-sm font-bold text-on-surface-variant mb-3 uppercase tracking-widest">
            Enter your VIN to get started
          </p>
          <VinSearchForm size="sm" />
        </div>

        {/* ── Free preview card ───────────────────────────────────────── */}
        <div className="mb-6 sm:mb-8">
          <div className="relative rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 bg-surface-container-lowest ghost-border shadow-sm flex flex-col lg:flex-row lg:items-center gap-6">
            <span
              className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-on-secondary-container"
              style={{ background: "var(--color-secondary-container)" }}
            >
              <Sparkles className="w-3 h-3" /> Free
            </span>

            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-widest mb-3 text-outline">
                Start Here
              </p>
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <h3 className="text-4xl sm:text-5xl price font-extrabold text-primary">
                  FREE
                </h3>
                <span className="text-sm font-bold text-on-surface-variant">
                  Preview — no card required
                </span>
              </div>
              <p className="text-sm text-on-surface-variant max-w-xl">
                Enter any VIN to instantly see the decoded vehicle, real auction
                photos, open recall count and how many history records we have on
                file — before you pay a cent.
              </p>
            </div>

            <div className="lg:w-72 flex-shrink-0">
              <ul className="space-y-2.5 mb-5">
                {[
                  "Year, make, model & trim",
                  "Real vehicle photos (when on file)",
                  "Open recall count",
                  "Title & auction record counts",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-on-surface-variant">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#pricing-search"
                className="flex items-center justify-center gap-2 w-full text-center py-3 rounded-full font-bold bg-surface-container text-primary hover:bg-primary hover:text-white transition-all"
              >
                <Eye className="w-4 h-4" /> Get a free preview
              </a>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {plans.map((plan) => {
            return (
            <div
              key={plan.size}
              className={`relative rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 flex flex-col transition-all duration-300 hover:scale-[1.02] ${
                plan.popular
                  ? "bg-primary text-white shadow-2xl shadow-primary/20"
                  : "bg-surface-container-lowest ghost-border shadow-sm"
              }`}
            >
              {/* Orange top bar for featured plan */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl sm:rounded-t-[2rem]" style={{ background: "var(--color-secondary-container)" }} />
              )}

              <p className={`text-xs font-black uppercase tracking-widest mb-5 ${plan.popular ? "text-secondary-fixed-dim" : "text-outline"}`}>
                {plan.label}
              </p>

              <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                <h3 className={`text-4xl sm:text-5xl price font-extrabold ${plan.popular ? "text-white" : "text-primary"}`}>
                  {formatUsd(plan.priceCents)}
                </h3>
              </div>
              <p className={`text-sm font-bold mb-1 ${plan.popular ? "text-white" : "text-on-surface-variant"}`}>
                {plan.size} {plan.size === 1 ? "Report" : "Reports"} · {formatUsd(plan.perReportCents)} each
              </p>
              {plan.savingsCents > 0 ? (
                <p className={`text-xs font-bold mb-8 ${plan.popular ? "text-secondary-fixed-dim" : "text-green-600"}`}>
                  Save {formatUsd(plan.savingsCents)} · {plan.desc}
                </p>
              ) : (
                <p className={`text-xs mb-8 ${plan.popular ? "text-white/85" : "text-outline"}`}>
                  {plan.desc}
                </p>
              )}

              <ul className="space-y-3 mb-8 sm:mb-10 flex-1">
                {features.map((f) => (
                  <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.popular ? "text-white" : "text-on-surface-variant"}`}>
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-secondary-fixed-dim" : "text-green-500"}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#pricing-search"
                className={`block w-full text-center py-3 sm:py-4 rounded-full font-bold transition-all ${
                  plan.popular
                    ? "text-on-secondary-container hover:brightness-110"
                    : "bg-surface-container text-primary hover:bg-primary hover:text-white"
                }`}
                style={plan.popular ? { background: "var(--color-secondary-container)" } : {}}
              >
                Get Report
              </a>
            </div>
            );
          })}
        </div>

        <p className="text-center text-xs sm:text-sm text-outline mt-8 sm:mt-10 max-w-xl mx-auto">
          One-time payment · Instant delivery · 100% refund if we have no data on your VIN.
        </p>
      </div>
    </section>
  );
}
