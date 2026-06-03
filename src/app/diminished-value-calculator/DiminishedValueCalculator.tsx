"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  DollarSign,
  Gauge,
  Car,
  RefreshCcw,
  TrendingDown,
  AlertTriangle,
  Info,
  ArrowRight,
  Calculator,
} from "lucide-react";

/* ─── 17c reference tables ───────────────────────────────────
   The "17c" formula comes from Mabry v. State Farm (Georgia) and
   is the method most insurers actually use to compute a diminished
   value offer. It deliberately understates real-world loss — we
   show it because it's the number to negotiate against, then pair
   it with a market-based range that reflects what dealers and
   appraisers actually discount a wrecked-history car. */

// Damage severity multiplier (applied to the 10% base cap)
const DAMAGE_LEVELS = [
  {
    id: "severe",
    label: "Severe — structural / frame",
    mult: 1.0,
    marketLow: 0.2,
    marketHigh: 0.25,
    note: "Frame, unibody, or airbag deployment. Largest stigma.",
  },
  {
    id: "major",
    label: "Major — panel replacement",
    mult: 0.75,
    marketLow: 0.15,
    marketHigh: 0.2,
    note: "Replaced panels, suspension, or major bodywork.",
  },
  {
    id: "moderate",
    label: "Moderate — normal repairable",
    mult: 0.5,
    marketLow: 0.1,
    marketHigh: 0.15,
    note: "Typical collision repair, bolt-on parts.",
  },
  {
    id: "minor",
    label: "Minor — cosmetic",
    mult: 0.25,
    marketLow: 0.05,
    marketHigh: 0.1,
    note: "Scratches, dents, bumper scuffs only.",
  },
  {
    id: "none",
    label: "No structural damage",
    mult: 0.0,
    marketLow: 0.0,
    marketHigh: 0.03,
    note: "Repaired with no lasting impact recorded.",
  },
] as const;

type DamageId = (typeof DAMAGE_LEVELS)[number]["id"];

// Mileage multiplier per 17c
const MILEAGE_BANDS = [
  { max: 19999, mult: 1.0, label: "0 – 19,999 mi" },
  { max: 39999, mult: 0.8, label: "20,000 – 39,999 mi" },
  { max: 59999, mult: 0.6, label: "40,000 – 59,999 mi" },
  { max: 79999, mult: 0.4, label: "60,000 – 79,999 mi" },
  { max: 99999, mult: 0.2, label: "80,000 – 99,999 mi" },
  { max: Infinity, mult: 0.0, label: "100,000+ mi" },
];

function mileageMultiplier(miles: number) {
  return MILEAGE_BANDS.find((b) => miles <= b.max) ?? MILEAGE_BANDS[MILEAGE_BANDS.length - 1];
}

function fmt0(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

interface DVResult {
  fmv: number;
  base: number; // 10% cap
  damageMult: number;
  mileageMult: number;
  mileageLabel: string;
  dv17c: number;
  marketLow: number;
  marketHigh: number;
}

export default function DiminishedValueCalculator() {
  const [fmv, setFmv] = useState("25000");
  const [damage, setDamage] = useState<DamageId>("moderate");
  const [mileage, setMileage] = useState("45000");
  const [result, setResult] = useState<DVResult | null>(null);

  const calculate = useCallback(() => {
    const value = parseFloat(fmv.replace(/,/g, "")) || 0;
    const miles = parseFloat(mileage.replace(/,/g, "")) || 0;
    const level = DAMAGE_LEVELS.find((d) => d.id === damage) ?? DAMAGE_LEVELS[2];
    const band = mileageMultiplier(miles);

    const base = value * 0.1; // 17c caps base at 10% of FMV
    const dv17c = base * level.mult * band.mult;

    setResult({
      fmv: value,
      base,
      damageMult: level.mult,
      mileageMult: band.mult,
      mileageLabel: band.label,
      dv17c,
      marketLow: value * level.marketLow,
      marketHigh: value * level.marketHigh,
    });
  }, [fmv, damage, mileage]);

  function reset() {
    setFmv("25000");
    setDamage("moderate");
    setMileage("45000");
    setResult(null);
  }

  return (
    <div className="space-y-6">
      {/* ── Inputs ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* FMV */}
          <div>
            <label
              htmlFor="dv-fmv"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
            >
              Pre-accident Market Value
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="dv-fmv"
                type="number"
                min="0"
                value={fmv}
                onChange={(e) => setFmv(e.target.value)}
                placeholder="25,000"
                className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Clean retail value the day before the crash (KBB / NADA).
            </p>
          </div>

          {/* Mileage */}
          <div>
            <label
              htmlFor="dv-miles"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
            >
              Odometer at Time of Accident
            </label>
            <div className="relative">
              <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="dv-miles"
                type="number"
                min="0"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="45,000"
                className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Higher mileage lowers the 17c mileage multiplier.
            </p>
          </div>
        </div>

        {/* Damage severity */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
            Damage Severity
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {DAMAGE_LEVELS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDamage(d.id)}
                className={`text-left rounded-xl border p-3 transition-colors cursor-pointer ${
                  damage === d.id
                    ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <span className="block text-sm font-bold text-slate-900">
                  {d.label}
                </span>
                <span className="block text-[11px] text-slate-500 mt-0.5">
                  {d.note}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={calculate}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
          >
            <Calculator className="w-4 h-4" /> Calculate Diminished Value
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-colors cursor-pointer"
            title="Reset"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4">
          {/* 17c headline */}
          <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 sm:p-8 text-white">
            <p className="text-xs font-bold uppercase tracking-wide text-primary-200 mb-2">
              17c Diminished Value (insurer formula)
            </p>
            <p className="text-5xl sm:text-6xl font-bold tracking-tight">
              {fmt0(result.dv17c)}
            </p>
            <p className="mt-2 text-sm text-primary-100">
              {fmt0(result.fmv)} value × 10% cap × {result.damageMult.toFixed(2)}{" "}
              damage × {result.mileageMult.toFixed(2)} mileage
            </p>
          </div>

          {/* Calculation breakdown */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                How the 17c Number Is Built
              </h3>
            </div>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-5 py-3 text-slate-700">
                    Pre-accident market value
                  </td>
                  <td className="px-5 py-3 text-right font-bold text-slate-900 tabular-nums">
                    {fmt0(result.fmv)}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-slate-700">
                    Base loss cap (10% of value)
                  </td>
                  <td className="px-5 py-3 text-right font-bold text-slate-900 tabular-nums">
                    {fmt0(result.base)}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-slate-700">
                    × Damage multiplier
                  </td>
                  <td className="px-5 py-3 text-right text-slate-700 tabular-nums">
                    {result.damageMult.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-slate-700">
                    × Mileage multiplier ({result.mileageLabel})
                  </td>
                  <td className="px-5 py-3 text-right text-slate-700 tabular-nums">
                    {result.mileageMult.toFixed(2)}
                  </td>
                </tr>
                <tr className="bg-primary-50 font-bold">
                  <td className="px-5 py-3.5 text-primary-800">
                    17c diminished value
                  </td>
                  <td className="px-5 py-3.5 text-right text-primary-800 tabular-nums">
                    {fmt0(result.dv17c)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Market range */}
          <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50">
            <TrendingDown className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
            <div className="text-sm text-slate-700">
              <p className="font-bold text-slate-900 mb-1">
                Realistic market loss: {fmt0(result.marketLow)} –{" "}
                {fmt0(result.marketHigh)}
              </p>
              <p className="leading-relaxed">
                The 17c formula almost always under-states actual loss because
                it caps the base at 10% and stacks two reducing multipliers.
                Independent appraisers and dealers typically discount a car with
                a recorded accident by{" "}
                <strong>
                  {Math.round(
                    (result.marketLow / Math.max(result.fmv, 1)) * 100
                  )}
                  –
                  {Math.round(
                    (result.marketHigh / Math.max(result.fmv, 1)) * 100
                  )}
                  %
                </strong>{" "}
                of pre-accident value. Use the higher figure as the basis for a
                third-party (or your own insurer&rsquo;s) diminished value
                claim, backed by an independent appraisal.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-400" />
            <p className="leading-relaxed">
              This is an estimate for negotiation and education, not a legal
              appraisal. Actual recovery depends on your state, who was at
              fault, your policy, and a licensed appraiser&rsquo;s report.
              First-party DV claims are barred in some states; third-party (the
              at-fault driver&rsquo;s insurer) claims are widely available.
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-sm text-slate-700">
              Documenting a claim?{" "}
              <strong className="text-slate-900">
                Pull the accident record on the VIN.
              </strong>
            </p>
            <Link
              href="/accident-history-check"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Accident Check <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {!result && (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-600">
          <Car className="w-5 h-5 flex-shrink-0 text-slate-400" />
          Enter your numbers above and hit calculate to see both the 17c insurer
          figure and the realistic market loss range.
        </div>
      )}
    </div>
  );
}
