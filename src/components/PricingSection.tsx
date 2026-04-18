import Link from "next/link";
import { Check } from "lucide-react";

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
    price: "$7.99",
    reports: "1 Report",
    desc: "Perfect for a single car purchase",
    popular: false,
  },
  {
    name: "Standard",
    label: "Most Popular",
    price: "$14.99",
    reports: "3 Reports",
    desc: "Great for comparing a few options",
    popular: false,
  },
  {
    name: "Value",
    label: "Best Value",
    price: "$19.99",
    reports: "5 Reports",
    desc: "Best value for serious car shoppers",
    popular: true,
  },
  {
    name: "Pro",
    label: "The Pro",
    price: "$34.99",
    reports: "10 Reports",
    desc: "For dealers and fleet buyers",
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-4">
            Transparent Pricing.
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            Starting at <span className="font-black text-primary">$7.99</span> — competitors charge up to $44.99 for the same data.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[2rem] p-8 flex flex-col transition-all duration-300 hover:scale-[1.02] ${
                plan.popular
                  ? "bg-primary text-white shadow-2xl shadow-primary/20"
                  : "bg-surface-container-lowest ghost-border shadow-sm"
              }`}
            >
              {/* Orange top bar for featured plan */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[2rem]" style={{ background: "var(--color-secondary-container)" }} />
              )}

              <p className={`text-xs font-black uppercase tracking-widest mb-5 ${plan.popular ? "text-secondary-fixed-dim" : "text-outline"}`}>
                {plan.label}
              </p>

              <h3 className={`text-5xl font-headline font-black mb-1 ${plan.popular ? "text-white" : "text-primary"}`}>
                {plan.price}
              </h3>
              <p className={`text-sm font-bold mb-1 ${plan.popular ? "text-primary-fixed/70" : "text-on-surface-variant"}`}>
                {plan.reports}
              </p>
              <p className={`text-xs mb-8 ${plan.popular ? "text-primary-fixed/60" : "text-outline"}`}>
                {plan.desc}
              </p>

              <ul className="space-y-3 mb-10 flex-1">
                {features.map((f) => (
                  <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.popular ? "text-primary-fixed" : "text-on-surface-variant"}`}>
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-secondary-fixed-dim" : "text-green-500"}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/#hero"
                className={`block w-full text-center py-4 rounded-full font-bold transition-all ${
                  plan.popular
                    ? "text-on-secondary-container hover:brightness-110"
                    : "bg-surface-container text-primary hover:bg-primary hover:text-white"
                }`}
                style={plan.popular ? { background: "var(--color-secondary-container)" } : {}}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
