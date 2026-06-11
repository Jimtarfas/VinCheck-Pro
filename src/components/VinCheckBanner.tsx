/**
 * VinCheckBanner — inline mid-page CTA nudging users to run a VIN check.
 * Drop this inside any tool page after the first content section to keep
 * the user on-site and convert tool traffic into report purchases.
 *
 * Usage:
 *   <VinCheckBanner />                          — default (horizontal)
 *   <VinCheckBanner variant="compact" />        — single-line pill (tight spaces)
 *   <VinCheckBanner variant="card" />           — full-width card with search form
 */
import Link from "next/link";
import { Shield, FileSearch, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import VinSearchForm from "./VinSearchForm";

type Variant = "default" | "compact" | "card";

export default function VinCheckBanner({ variant = "default" }: { variant?: Variant }) {

  if (variant === "compact") {
    return (
      <div className="flex items-center justify-between gap-4 px-4 py-3 bg-primary-50 border border-primary-100 rounded-xl text-sm">
        <span className="flex items-center gap-2 text-slate-700">
          <Shield className="w-4 h-4 text-primary-600 flex-shrink-0" />
          Before you buy — check the vehicle&rsquo;s full history
        </span>
        <Link
          href="/vin-check"
          className="flex-shrink-0 inline-flex items-center gap-1 px-3.5 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-colors"
        >
          Free VIN Check <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 sm:p-8 text-white">
        <div className="flex items-start gap-3 mb-4">
          <FileSearch className="w-6 h-6 flex-shrink-0 mt-0.5 text-primary-200" />
          <div>
            <h3 className="text-lg font-bold">Run a Free VIN Check</h3>
            <p className="mt-1 text-sm text-primary-100">
              Uncover accidents, title brands, odometer fraud, theft records,
              and open recalls — in under 60 seconds.
            </p>
          </div>
        </div>
        <VinSearchForm size="sm" onDark />
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-primary-200">
          {[
            "NMVTIS Federal Data",
            "Title & Salvage Brands",
            "Accident Records",
            "Odometer History",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // default — horizontal banner
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-primary-50 border border-primary-100 rounded-2xl">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
          <FileSearch className="w-5 h-5 text-primary-700" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-slate-900 text-sm">
            Always check the VIN before you buy
          </p>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
            Our free report reveals accidents, title brands, odometer rollback,
            theft records, and open recalls in seconds.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            {[
              { icon: CheckCircle, text: "Accidents & damage" },
              { icon: AlertTriangle, text: "Salvage / flood title" },
              { icon: Shield, text: "Theft & recalls" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1 text-[11px] text-slate-600">
                <Icon className="w-3 h-3 text-emerald-500" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex sm:flex-col gap-2 flex-shrink-0">
        <Link
          href="/vin-check"
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors"
        >
          Run Free VIN Check <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/full-report/1C4RJEAG0JC168184"
          className="inline-flex items-center justify-center gap-1 px-5 py-2.5 border border-primary-200 hover:bg-primary-100 text-primary-700 text-xs font-semibold rounded-xl transition-colors"
        >
          View sample report
        </Link>
      </div>
    </div>
  );
}
