import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const plans = [
  { name: "Single", price: "$7.99", period: "one-time", reports: "1 Report", popular: false },
  { name: "Standard", price: "$14.99", period: "one-time", reports: "3 Reports", popular: true },
  { name: "Value", price: "$19.99", period: "one-time", reports: "5 Reports", popular: false },
  { name: "Pro", price: "$34.99", period: "one-time", reports: "10 Reports", popular: false },
];

const features = [
  "Full vehicle specifications", "Equipment & options list", "Engine & transmission details",
  "Market value estimates", "Recall information", "Ownership cost data",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-2">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Simple, Transparent Pricing</h2>
          <p className="mt-3 text-lg text-slate-500">
            Starting at <span className="font-bold text-primary-600">$7.99</span> — competitors charge up to $44.99
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <div key={plan.name}
              className={`relative rounded-2xl p-6 transition-all duration-300 ${
                plan.popular
                  ? "bg-primary-600 text-white shadow-xl shadow-primary-600/20 scale-[1.02]"
                  : "bg-white border border-slate-200 hover:shadow-lg hover:border-slate-300"
              }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}
              <h3 className={`text-lg font-bold ${plan.popular ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
              <p className={`text-sm ${plan.popular ? "text-primary-200" : "text-slate-500"}`}>{plan.reports}</p>
              <p className="mt-4">
                <span className={`text-4xl font-extrabold ${plan.popular ? "text-white" : "text-slate-900"}`}>{plan.price}</span>
                <span className={`text-sm ml-1 ${plan.popular ? "text-primary-200" : "text-slate-400"}`}>{plan.period}</span>
              </p>
              <ul className="mt-5 space-y-2.5">
                {features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${plan.popular ? "text-primary-100" : "text-slate-500"}`}>
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-emerald-300" : "text-emerald-500"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/#hero"
                className={`mt-6 block w-full text-center py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? "bg-white text-primary-600 hover:bg-primary-50 shadow-md"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
