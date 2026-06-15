"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, LoaderCircle, TriangleAlert, Ticket } from "lucide-react";

interface Props {
  /** How many live credits the signed-in account holds. */
  remaining: number;
  /** When the soonest-expiring credit lapses (ISO), for the helper line. */
  soonestExpiry: string | null;
}

const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/i;

/**
 * Account-page widget: spend one prepaid bundle credit on a new VIN.
 * Posts the VIN to /api/order/redeem (which consumes a credit, fetches the
 * report, and returns an orderId) then routes to the delivered report.
 */
export default function RedeemCredit({ remaining, soonestExpiry }: Props) {
  const router = useRouter();
  const [vin, setVin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleRedeem() {
    const cleaned = vin.trim().toUpperCase();
    if (!VIN_RE.test(cleaned)) {
      setError("Enter a valid 17-character VIN.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/order/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vin: cleaned }),
      });
      const json = await res.json();
      if (!res.ok || !json.orderId) {
        throw new Error(json.error || "Could not redeem your credit.");
      }
      router.push(`/r/${json.orderId}`);
    } catch (e) {
      setSubmitting(false);
      setError(e instanceof Error ? e.message : "Redeem failed.");
    }
  }

  const expiryLabel = soonestExpiry
    ? new Date(soonestExpiry).toLocaleDateString()
    : null;

  return (
    <div className="bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] border border-primary/20 rounded-2xl p-5 sm:p-6 mb-6">
      <div className="flex items-center gap-2.5 mb-1">
        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Ticket className="w-4 h-4 text-primary" />
        </span>
        <h2 className="text-base font-extrabold text-slate-900">
          {remaining} report credit{remaining === 1 ? "" : "s"} available
        </h2>
      </div>
      <p className="text-xs text-slate-600 mb-4 pl-[42px]">
        Run any VIN with a prepaid credit — no extra charge.
        {expiryLabel ? ` Next credit expires ${expiryLabel}.` : ""}
      </p>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={vin}
            onChange={(e) => {
              setVin(e.target.value.toUpperCase());
              if (error) setError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !submitting) handleRedeem();
            }}
            maxLength={17}
            placeholder="Enter a 17-character VIN"
            className="w-full pl-9 pr-3 py-2.5 text-base sm:text-sm font-mono tracking-wider rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none uppercase bg-white"
          />
        </div>
        <button
          onClick={handleRedeem}
          disabled={submitting || !vin}
          className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold inline-flex items-center justify-center gap-2 transition"
        >
          {submitting ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Running…
            </>
          ) : (
            "Use 1 credit"
          )}
        </button>
      </div>

      {error && (
        <p className="mt-2.5 text-xs text-red-600 flex items-center gap-1.5">
          <TriangleAlert className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
