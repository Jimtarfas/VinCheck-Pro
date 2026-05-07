"use client";

import { useState, useCallback } from "react";
import {
  DollarSign,
  Calendar,
  Gauge,
  Car,
  RefreshCcw,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────── */

const CURRENT_YEAR = 2026;

const MAKES = [
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "Tesla",
  "BMW",
  "Mercedes-Benz",
  "Lexus",
  "Audi",
  "Subaru",
  "Mazda",
  "Hyundai",
  "Kia",
  "Nissan",
  "Volkswagen",
  "Volvo",
  "Acura",
  "Infiniti",
  "Cadillac",
  "Lincoln",
  "GMC",
  "Ram",
  "Jeep",
  "Dodge",
  "Chrysler",
  "Porsche",
  "Land Rover",
  "Mini",
  "Buick",
  "Jaguar",
];

const VEHICLE_TYPES = [
  "Sedan",
  "SUV",
  "Truck",
  "EV",
  "Luxury",
  "Sports",
  "Minivan",
] as const;
type VehicleType = (typeof VEHICLE_TYPES)[number];

const CONDITIONS = ["Excellent", "Good", "Fair"] as const;
type Condition = (typeof CONDITIONS)[number];

// Base retention curve by vehicle age (industry composite)
const AGE_RETENTION: Record<number, number> = {
  0: 1.0,
  1: 0.8,
  2: 0.7,
  3: 0.63,
  4: 0.56,
  5: 0.5,
  6: 0.45,
  7: 0.4,
  8: 0.36,
  9: 0.32,
  10: 0.28,
};

const BRAND_MULTIPLIER: Record<string, number> = {
  Toyota: 1.08,
  Honda: 1.07,
  Lexus: 1.1,
  Subaru: 1.06,
  Tesla: 1.05,
  Porsche: 1.1,
  Mazda: 1.04,
  Acura: 1.03,
  "Mercedes-Benz": 0.93,
  BMW: 0.92,
  Cadillac: 0.85,
  Lincoln: 0.84,
  Jaguar: 0.8,
  "Land Rover": 0.78,
  Mini: 0.86,
  Volvo: 0.95,
  Audi: 0.93,
  Volkswagen: 0.95,
  Ford: 1.0,
  Chevrolet: 1.0,
  GMC: 1.02,
  Ram: 1.04,
  Jeep: 1.05,
  Dodge: 0.96,
  Chrysler: 0.85,
  Hyundai: 0.96,
  Kia: 0.97,
  Nissan: 0.94,
  Infiniti: 0.85,
  Buick: 0.88,
};

const TYPE_MULTIPLIER: Record<VehicleType, number> = {
  Truck: 1.05,
  SUV: 1.02,
  EV: 0.92,
  Luxury: 0.92,
  Sports: 0.95,
  Sedan: 1.0,
  Minivan: 0.95,
};

const CONDITION_MULTIPLIER: Record<Condition, number> = {
  Excellent: 1.05,
  Good: 1.0,
  Fair: 0.9,
};

function retentionAtAge(age: number): number {
  if (age <= 0) return 1;
  if (age >= 10) return Math.max(0.28 - (age - 10) * 0.02, 0.05);
  return AGE_RETENTION[age] ?? 0.28;
}

function fmtUSD(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

interface YearRow {
  year: number;
  age: number;
  value: number;
  lost: number;
  retainedPct: number;
  yoyDropPct: number;
}

interface DepreciationResult {
  rows: YearRow[];
  brandMult: number;
  typeMult: number;
  conditionMult: number;
  worstYear: YearRow;
  totalLost: number;
  purchasePrice: number;
}

/* ─── Component ─────────────────────────────────────────────── */

export default function CarDepreciationCalculator() {
  const [make, setMake] = useState<string>("Toyota");
  const [yearPurchased, setYearPurchased] = useState<string>(String(CURRENT_YEAR));
  const [purchasePrice, setPurchasePrice] = useState<string>("35000");
  const [annualMileage, setAnnualMileage] = useState<string>("12000");
  const [vehicleType, setVehicleType] = useState<VehicleType>("Sedan");
  const [condition, setCondition] = useState<Condition>("Good");
  const [result, setResult] = useState<DepreciationResult | null>(null);

  const calculate = useCallback(() => {
    const price = parseFloat(purchasePrice.replace(/,/g, "")) || 0;
    const startYear = parseInt(yearPurchased, 10) || CURRENT_YEAR;
    const mileage = parseFloat(annualMileage.replace(/,/g, "")) || 12000;
    const brandMult = BRAND_MULTIPLIER[make] ?? 1.0;
    const typeMult = TYPE_MULTIPLIER[vehicleType] ?? 1.0;
    const conditionMult = CONDITION_MULTIPLIER[condition] ?? 1.0;

    const rows: YearRow[] = [];
    let prevValue = price;

    for (let age = 0; age <= 10; age++) {
      const baseRet = retentionAtAge(age);

      // Mileage adjustment: each 1k miles over 12k/yr × age = -0.5%; under = +0.5%
      const milesDiffPerYear = (mileage - 12000) / 1000; // positive = high-mileage
      const mileageAdj = -(milesDiffPerYear * 0.005 * age); // signed

      // Combine multipliers (brand & type compound vs. baseline; condition gently)
      const finalRet = Math.max(
        baseRet * brandMult * typeMult * conditionMult * (1 + mileageAdj),
        0.02,
      );

      const value = Math.max(Math.round(price * finalRet), 0);
      const lost = Math.max(price - value, 0);
      const retainedPct = (value / price) * 100;
      const yoyDropPct = age === 0 ? 0 : ((prevValue - value) / Math.max(prevValue, 1)) * 100;

      rows.push({
        year: startYear + age,
        age,
        value,
        lost,
        retainedPct,
        yoyDropPct,
      });

      prevValue = value;
    }

    // Worst depreciation year = largest year-over-year drop (skip age 0)
    const worstYear = rows
      .filter((r) => r.age > 0)
      .reduce((a, b) => (b.yoyDropPct > a.yoyDropPct ? b : a), rows[1]);

    const totalLost = price - rows[10].value;

    setResult({
      rows,
      brandMult,
      typeMult,
      conditionMult,
      worstYear,
      totalLost,
      purchasePrice: price,
    });
  }, [purchasePrice, yearPurchased, annualMileage, make, vehicleType, condition]);

  function reset() {
    setMake("Toyota");
    setYearPurchased(String(CURRENT_YEAR));
    setPurchasePrice("35000");
    setAnnualMileage("12000");
    setVehicleType("Sedan");
    setCondition("Good");
    setResult(null);
  }

  const verdict = result
    ? result.brandMult > 1.02
      ? {
          label: "Better than market average",
          tone: "good" as const,
          desc: `${make} historically retains more value than the average vehicle — a strong long-term financial choice.`,
        }
      : result.brandMult < 0.95
        ? {
            label: "Faster than market average",
            tone: "bad" as const,
            desc: `${make} typically depreciates faster than the average vehicle. Consider buying used to let the prior owner absorb the steepest drop.`,
          }
        : {
            label: "Roughly average depreciation",
            tone: "neutral" as const,
            desc: `${make} depreciates close to the industry average for its segment.`,
          }
    : null;

  return (
    <div className="space-y-6">
      {/* ── Inputs card ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Make */}
          <div>
            <label
              htmlFor="make"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
            >
              Vehicle Make
            </label>
            <div className="relative">
              <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                id="make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {MAKES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Brand-specific retention multiplier applied
            </p>
          </div>

          {/* Vehicle Type */}
          <div>
            <label
              htmlFor="vtype"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
            >
              Vehicle Type
            </label>
            <div className="relative">
              <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                id="vtype"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value as VehicleType)}
                className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {VEHICLE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Body style affects depreciation curve
            </p>
          </div>

          {/* Year Purchased */}
          <Field
            id="year"
            label="Year Purchased"
            icon={<Calendar className="w-4 h-4 text-slate-400" />}
            value={yearPurchased}
            onChange={setYearPurchased}
            type="number"
            min="1990"
            placeholder={String(CURRENT_YEAR)}
            hint="Used to project future-year values"
          />

          {/* Purchase Price */}
          <Field
            id="price"
            label="Purchase Price (USD)"
            icon={<DollarSign className="w-4 h-4 text-slate-400" />}
            value={purchasePrice}
            onChange={setPurchasePrice}
            type="number"
            min="0"
            placeholder="35,000"
            hint="Original sticker / paid price"
          />

          {/* Annual Mileage */}
          <Field
            id="mileage"
            label="Annual Mileage"
            icon={<Gauge className="w-4 h-4 text-slate-400" />}
            value={annualMileage}
            onChange={setAnnualMileage}
            type="number"
            min="0"
            placeholder="12,000"
            hint="12k/yr is the industry baseline"
          />

          {/* Condition */}
          <div>
            <label
              htmlFor="cond"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
            >
              Condition Assumption
            </label>
            <div className="relative">
              <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                id="cond"
                value={condition}
                onChange={(e) => setCondition(e.target.value as Condition)}
                className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              How well the vehicle is maintained over time
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={calculate}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
          >
            <TrendingDown className="w-4 h-4" />
            Calculate Depreciation
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors cursor-pointer"
            title="Reset"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Results ── */}
      {result && (
        <div className="space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Your Car&rsquo;s Projected Value
          </h2>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "After 1 year", row: result.rows[1], highlight: true },
              { label: "After 3 years", row: result.rows[3] },
              { label: "After 5 years", row: result.rows[5] },
              { label: "After 10 years", row: result.rows[10], muted: true },
            ].map(({ label, row, highlight, muted }) => (
              <HighlightCard
                key={label}
                label={label}
                value={fmtUSD(row.value)}
                sub={`${row.retainedPct.toFixed(0)}% retained`}
                highlight={highlight}
                muted={muted}
              />
            ))}
          </div>

          {/* Verdict callout */}
          {verdict && (
            <div
              className={`flex items-start gap-3 p-4 rounded-xl text-sm border ${
                verdict.tone === "good"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : verdict.tone === "bad"
                    ? "bg-amber-50 border-amber-200 text-amber-900"
                    : "bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              {verdict.tone === "good" ? (
                <TrendingUp className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
              ) : verdict.tone === "bad" ? (
                <TrendingDown className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-slate-500" />
              )}
              <div>
                <p className="font-bold mb-0.5">{verdict.label}</p>
                <p className="leading-relaxed">{verdict.desc}</p>
              </div>
            </div>
          )}

          {/* Depreciation curve (CSS bars) */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                10-Year Depreciation Curve
              </p>
              <span className="text-[11px] text-slate-500">
                {fmtUSD(result.purchasePrice)} → {fmtUSD(result.rows[10].value)}
              </span>
            </div>
            <div className="grid grid-cols-11 gap-1.5 items-end h-44">
              {result.rows.map((row) => {
                const heightPct = (row.value / result.purchasePrice) * 100;
                const isWorst = row.age === result.worstYear.age;
                return (
                  <div
                    key={row.age}
                    className="flex flex-col items-center justify-end h-full gap-1 group"
                    title={`Year ${row.age}: ${fmtUSD(row.value)} (${row.retainedPct.toFixed(0)}%)`}
                  >
                    <div
                      className={`w-full rounded-t-md transition-colors ${
                        isWorst
                          ? "bg-rose-500 group-hover:bg-rose-600"
                          : "bg-primary-500 group-hover:bg-primary-600"
                      }`}
                      style={{ height: `${Math.max(heightPct, 4)}%` }}
                    />
                    <span className="text-[10px] text-slate-500 font-mono">
                      {row.age}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-[11px] text-slate-500 text-center">
              Years from purchase &middot; Bar height = % of original price retained
            </p>
          </div>

          {/* Summary metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <SummaryCard
              label="Total $ Lost (10 yrs)"
              value={fmtUSD(result.totalLost)}
              tone="bad"
            />
            <SummaryCard
              label="Worst Year"
              value={`Year ${result.worstYear.age}`}
              sub={`-${result.worstYear.yoyDropPct.toFixed(0)}% drop`}
            />
            <SummaryCard
              label="Brand Multiplier"
              value={`${result.brandMult.toFixed(2)}x`}
              sub={
                result.brandMult > 1
                  ? "Above average"
                  : result.brandMult < 1
                    ? "Below average"
                    : "Average"
              }
              tone={
                result.brandMult > 1.02
                  ? "good"
                  : result.brandMult < 0.95
                    ? "bad"
                    : "neutral"
              }
            />
          </div>

          {/* Year-by-year table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Year-by-Year Projected Value
              </h3>
              <span className="text-xs text-slate-500">10 years</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-medium">Calendar Year</th>
                    <th className="text-left px-4 py-2.5 font-medium">Age</th>
                    <th className="text-right px-4 py-2.5 font-medium">Projected Value</th>
                    <th className="text-right px-4 py-2.5 font-medium">$ Lost</th>
                    <th className="text-right px-4 py-2.5 font-medium">% Retained</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {result.rows.map((row) => {
                    const isWorst = row.age === result.worstYear.age;
                    return (
                      <tr
                        key={row.age}
                        className={
                          isWorst
                            ? "bg-rose-50/60"
                            : row.age % 5 === 0 && row.age !== 0
                              ? "bg-primary-50/40"
                              : ""
                        }
                      >
                        <td className="px-4 py-2.5 text-slate-700 font-medium">
                          {row.year}
                        </td>
                        <td className="px-4 py-2.5 text-slate-600">
                          {row.age === 0 ? "New" : `${row.age} yr${row.age !== 1 ? "s" : ""}`}
                        </td>
                        <td className="px-4 py-2.5 text-right font-bold text-slate-900">
                          {fmtUSD(row.value)}
                        </td>
                        <td className="px-4 py-2.5 text-right text-rose-600">
                          {row.lost > 0 ? `-${fmtUSD(row.lost)}` : "—"}
                        </td>
                        <td className="px-4 py-2.5 text-right text-emerald-700 font-medium">
                          {row.retainedPct.toFixed(0)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            Estimates use industry-composite depreciation curves with brand and body-type
            multipliers. Actual resale values vary by trim, region, mileage, and market
            conditions. For VIN-specific market value, run a free vehicle history report.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Sub-components ───────────────────────────────────────── */

type FieldProps = {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  type?: string;
  min?: string;
  step?: string;
  placeholder?: string;
};

function Field({
  id,
  label,
  icon,
  value,
  onChange,
  hint,
  type,
  min,
  step,
  placeholder,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          min={min}
          step={step}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
      {hint && <p className="mt-1 text-[11px] text-slate-500">{hint}</p>}
    </div>
  );
}

function HighlightCard({
  label,
  value,
  sub,
  highlight,
  muted,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "bg-primary-600 border-primary-600"
          : "bg-white border-slate-200"
      }`}
    >
      <p
        className={`text-[10px] font-bold uppercase tracking-wide mb-1 ${
          highlight ? "text-primary-100" : "text-slate-500"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-xl font-bold ${
          highlight ? "text-white" : muted ? "text-slate-500" : "text-slate-900"
        }`}
      >
        {value}
      </p>
      <p
        className={`text-[10px] mt-0.5 ${
          highlight ? "text-primary-200" : "text-slate-400"
        }`}
      >
        {sub}
      </p>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "good" | "bad" | "neutral";
}) {
  const valueClass =
    tone === "bad"
      ? "text-rose-600"
      : tone === "good"
        ? "text-emerald-700"
        : "text-slate-900";
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1">
        {label}
      </p>
      <p className={`text-lg font-bold ${valueClass}`}>{value}</p>
      {sub && <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>}
    </div>
  );
}
