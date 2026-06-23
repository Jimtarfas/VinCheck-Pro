"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Mail,
  Lock,
  LoaderCircle,
  ShieldCheck,
  Clock,
  Star,
  TriangleAlert,
  Check,
} from "lucide-react";
import BundleSelect from "@/app/order/_components/BundleSelect";
import {
  pricingOptions,
  formatUsd,
  CREDIT_VALIDITY_MONTHS,
  type PricingOption,
} from "@/lib/pricing";

interface Props {
  /** The VIN being previewed — carried into checkout. */
  vin: string;
  /** Human label (e.g. "2018 Jeep Grand Cherokee") stored on the order. */
  vehicleLabel?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Sidebar checkout on the report preview: pick a single report or a discounted
 * prepaid pack, enter an email, and go straight to Stripe. We POST the chosen
 * pack SIZE (the price is re-derived server-side) plus the email to
 * /api/order/checkout and hard-navigate to the returned Stripe URL, so the
 * buyer never hops through /order — checkout happens in place on the preview.
 */
export default function BundleUpsellCard({ vin, vehicleLabel }: Props) {
  const options: PricingOption[] = pricingOptions();
  const [selected, setSelected] = useState(1);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const current = options.find((o) => o.size === selected) ?? options[0];

  async function handleOrder() {
    const e = email.trim();
    if (!EMAIL_RE.test(e)) {
      setError("Enter a valid email so we can deliver your report.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/order/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vin,
          email: e,
          vehicleLabel,
          bundleSize: selected > 1 ? selected : undefined,
          // A cancelled/failed Stripe payment returns the buyer to this exact
          // preview rather than the homepage.
          returnTo:
            typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.url) {
        throw new Error(
          json?.error || `Could not start checkout (error ${res.status}).`
        );
      }
      // Stripe Checkout lives on an external origin — hard-navigate.
      window.location.assign(json.url);
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : "Checkout failed.");
    }
  }

  return (
    <div className="bg-surface-container-lowest rounded-[2rem] shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-surface-container">
        <h3 className="font-headline font-bold text-on-surface flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" /> Buy more, pay less
        </h3>
        <p className="text-xs text-on-surface-variant mt-0.5">
          Checking a few cars? Prepaid packs drop the per-report price.
        </p>
      </div>
      <div className="p-5">
        {/* Order summary — mirrors the selected option so the buyer sees exactly
            what they're paying for, and the running total, up front. */}
        <div className="rounded-2xl bg-surface-container-low border border-outline-variant p-4">
          <h4 className="font-headline font-bold text-on-surface text-sm mb-3">
            Order Summary
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2 text-on-surface-variant">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
              <span>
                Report on{" "}
                <strong className="text-on-surface font-bold">
                  {vehicleLabel || "this vehicle"}
                </strong>
              </span>
            </li>
            <li className="flex items-start gap-2 text-on-surface-variant">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
              <span>
                {current.isBundle
                  ? `${current.size}-report pack — ${formatUsd(current.perReportCents)} per report`
                  : "Full vehicle history report"}
              </span>
            </li>
            {current.isBundle && (
              <li className="flex items-start gap-2 text-on-surface-variant">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span>
                  {current.size - 1} report{current.size - 1 > 1 ? "s" : ""} saved as
                  credits — good for {CREDIT_VALIDITY_MONTHS} months
                </span>
              </li>
            )}
          </ul>
          <div className="mt-3 pt-3 border-t border-outline-variant flex items-baseline justify-between gap-3">
            <span className="font-headline font-bold text-on-surface">
              Today&apos;s Total
            </span>
            <span className="font-headline font-black text-2xl sm:text-3xl text-on-surface leading-none">
              {formatUsd(current.priceCents)}
            </span>
          </div>
          <p className="mt-2 text-[11px] italic text-on-surface-variant leading-snug">
            * Sales tax may be applicable in some states
          </p>
        </div>

        <div className="mt-5">
          <BundleSelect options={options} selected={selected} onSelect={setSelected} />
        </div>

        {current.isBundle && (
          <p className="mt-3 text-[11px] text-on-surface-variant leading-relaxed">
            One report unlocks now; the other {current.size - 1} become account
            credits, good for 12 months on any VIN.
          </p>
        )}

        {/* Trust row */}
        <div className="mt-4 pb-4 border-b border-surface-container flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-on-surface-variant">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> NMVTIS-backed data
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-primary" /> Instant access
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
              ))}
            </span>
            <span className="font-bold text-on-surface">Trustpilot</span>
          </span>
        </div>

        {/* Inline checkout — email + straight to Stripe, no /order hop. */}
        <div className="mt-4">
          <label
            htmlFor="bundle-email"
            className="block text-[13px] font-bold text-on-surface mb-1.5"
          >
            Email for receipt &amp; report
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              id="bundle-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !submitting) handleOrder();
              }}
              placeholder="you@example.com"
              className="w-full pl-9 pr-3 py-2.5 text-base sm:text-sm rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none bg-surface-container-lowest"
            />
          </div>
          <p className="mt-1.5 text-[11px] text-on-surface-variant leading-snug">
            We&apos;ll send your full report and receipt here.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOrder}
          disabled={submitting}
          className="mt-4 w-full bg-primary hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition"
        >
          {submitting ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Starting checkout…
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              {current.isBundle
                ? `Order ${current.size} reports — ${formatUsd(current.priceCents)}`
                : `Order full report — ${formatUsd(current.priceCents)}`}
            </>
          )}
        </button>

        {error && (
          <p className="mt-2.5 text-xs text-red-600 flex items-center gap-1.5">
            <TriangleAlert className="w-3.5 h-3.5 flex-shrink-0" />
            {error}
          </p>
        )}

        {/* Consent line — inline links inside the sentence itself. */}
        <p className="mt-3 text-[11px] text-on-surface-variant leading-relaxed">
          By clicking{" "}
          <strong className="text-on-surface">Order Full Report</strong> you agree
          to{" "}
          <Link
            href="/terms"
            className="underline text-primary hover:text-primary-700 font-semibold"
          >
            CarCheckerVIN&rsquo;s T&amp;C
          </Link>{" "}
          and{" "}
          <Link
            href="/disclaimer"
            className="underline text-primary hover:text-primary-700 font-semibold"
          >
            NMVTIS disclaimer
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
