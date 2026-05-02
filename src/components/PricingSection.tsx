import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

const features = [
  "Full vehicle specifications",
  "Equipment & options list",
  "Engine & transmission details",
  "Market value estimates",
  "Recall information",
  "Real vehicle photos",
  "Ownership cost data",
];

const plans = [
  {
    name: "Single",
    label: "The Starter",
    originalPrice: "$7.99",
    reports: "1 Report",
    desc: "Perfect for a single car purchase",
    popular: false,
  },
  {
    name: "Standard",
    label: "Most Popular",
    originalPrice: "$14.99",
    reports: "3 Reports",
    desc: "Great for comparing a few options",
    popular: false,
  },
  {
    name: "Value",
    label: "Best Value",
    originalPrice: "$19.99",
    reports: "5 Reports",
    desc: "Best value for serious car shoppers",
    popular: true,
  },
  {
    name: "Pro",
    label: "The Pro",
    originalPrice: "$34.99",
    reports: "10 Reports",
    desc: "For dealers and fleet buyers",
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest mb-4 sm:mb-5 text-on-secondary-container"
            style={{ background: "var(--color-secondary-container)" }}>
            <Sparkles className="w-4 h-4" /> Limited Time — Everything Free
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
            All plans are 100% free right now.
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto">
            For a limited time, every VIN report tier is <span className="font-black text-primary">completely free</span> — same full data, same photos, same market analysis. No credit card required.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
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

              {/* FREE ribbon — top-right */}
              <span
                className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-on-secondary-container"
                style={{ background: "var(--color-secondary-container)" }}
              >
                <Sparkles className="w-3 h-3" /> Free
              </span>

              <p className={`text-xs font-black uppercase tracking-widest mb-5 ${plan.popular ? "text-secondary-fixed-dim" : "text-outline"}`}>
                {plan.label}
              </p>

              <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                <h3 className={`text-4xl sm:text-5xl font-headline font-black ${plan.popular ? "text-white" : "text-primary"}`}>
                  FREE
                </h3>
                <span className={`text-lg sm:text-xl line-through ${plan.popular ? "text-white/70" : "text-outline/70"}`}>
                  {plan.originalPrice}
                </span>
              </div>
              <p className={`text-sm font-bold mb-1 ${plan.popular ? "text-white" : "text-on-surface-variant"}`}>
                {plan.reports}
              </p>
              <p className={`text-xs mb-8 ${plan.popular ? "text-white/85" : "text-outline"}`}>
                {plan.desc}
              </p>

              <ul className="space-y-3 mb-8 sm:mb-10 flex-1">
                {features.map((f) => (
                  <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.popular ? "text-white" : "text-on-surface-variant"}`}>
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-secondary-fixed-dim" : "text-green-500"}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/#hero"
                className={`block w-full text-center py-3 sm:py-4 rounded-full font-bold transition-all ${
                  plan.popular
                    ? "text-on-secondary-container hover:brightness-110"
                    : "bg-surface-container text-primary hover:bg-primary hover:text-white"
                }`}
                style={plan.popular ? { background: "var(--color-secondary-container)" } : {}}
              >
                Claim Free Report
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-xs sm:text-sm text-outline mt-8 sm:mt-10 max-w-xl mx-auto">
          Limited-time promotion — prices return to the amounts shown (crossed out) when the free period ends.
        </p>
      </div>
    </section>
  );
}
