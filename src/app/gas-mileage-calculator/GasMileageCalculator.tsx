"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Fuel,
  RefreshCcw,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────── */

// Average gas prices by US state (regular unleaded, 2025 estimates)
const STATE_GAS_PRICES: { state: string; abbr: string; price: number }[] = [
  { state: "National Average", abbr: "US", price: 3.45 },
  { state: "Alabama", abbr: "AL", price: 3.05 },
  { state: "Alaska", abbr: "AK", price: 3.95 },
  { state: "Arizona", abbr: "AZ", price: 3.50 },
  { state: "Arkansas", abbr: "AR", price: 3.00 },
  { state: "California", abbr: "CA", price: 4.75 },
  { state: "Colorado", abbr: "CO", price: 3.35 },
  { state: "Connecticut", abbr: "CT", price: 3.55 },
  { state: "Delaware", abbr: "DE", price: 3.20 },
  { state: "Florida", abbr: "FL", price: 3.30 },
  { state: "Georgia", abbr: "GA", price: 3.10 },
  { state: "Hawaii", abbr: "HI", price: 4.85 },
  { state: "Idaho", abbr: "ID", price: 3.40 },
  { state: "Illinois", abbr: "IL", price: 3.65 },
  { state: "Indiana", abbr: "IN", price: 3.20 },
  { state: "Iowa", abbr: "IA", price: 3.15 },
  { state: "Kansas", abbr: "KS", price: 3.10 },
  { state: "Kentucky", abbr: "KY", price: 3.05 },
  { state: "Louisiana", abbr: "LA", price: 3.00 },
  { state: "Maine", abbr: "ME", price: 3.40 },
  { state: "Maryland", abbr: "MD", price: 3.45 },
  { state: "Massachusetts", abbr: "MA", price: 3.50 },
  { state: "Michigan", abbr: "MI", price: 3.30 },
  { state: "Minnesota", abbr: "MN", price: 3.25 },
  { state: "Mississippi", abbr: "MS", price: 3.00 },
  { state: "Missouri", abbr: "MO", price: 3.05 },
  { state: "Montana", abbr: "MT", price: 3.45 },
  { state: "Nebraska", abbr: "NE", price: 3.15 },
  { state: "Nevada", abbr: "NV", price: 3.90 },
  { state: "New Hampshire", abbr: "NH", price: 3.35 },
  { state: "New Jersey", abbr: "NJ", price: 3.35 },
  { state: "New Mexico", abbr: "NM", price: 3.20 },
  { state: "New York", abbr: "NY", price: 3.70 },
  { state: "North Carolina", abbr: "NC", price: 3.15 },
  { state: "North Dakota", abbr: "ND", price: 3.20 },
  { state: "Ohio", abbr: "OH", price: 3.25 },
  { state: "Oklahoma", abbr: "OK", price: 2.95 },
  { state: "Oregon", abbr: "OR", price: 3.85 },
  { state: "Pennsylvania", abbr: "PA", price: 3.55 },
  { state: "Rhode Island", abbr: "RI", price: 3.50 },
  { state: "South Carolina", abbr: "SC", price: 3.05 },
  { state: "South Dakota", abbr: "SD", price: 3.15 },
  { state: "Tennessee", abbr: "TN", price: 3.05 },
  { state: "Texas", abbr: "TX", price: 3.00 },
  { state: "Utah", abbr: "UT", price: 3.45 },
  { state: "Vermont", abbr: "VT", price: 3.45 },
  { state: "Virginia", abbr: "VA", price: 3.25 },
  { state: "Washington", abbr: "WA", price: 4.00 },
  { state: "West Virginia", abbr: "WV", price: 3.20 },
  { state: "Wisconsin", abbr: "WI", price: 3.25 },
  { state: "Wyoming", abbr: "WY", price: 3.30 },
];

interface Results {
  // Per-trip
  tripCost: number;
  tripGallons: number;
  // Per-year
  annualCost: number;
  annualGallons: number;
  // Per-month
  monthlyCost: number;
  // Per-mile
  costPerMile: number;
  // Comparison (if second vehicle entered)
  savingsPerYear?: number;
  breakEvenMonths?: number;
  // Yearly CO2 (approx 19.6 lbs per gallon)
  annualCO2lbs: number;
}

function fmt2(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}
function fmt0(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function GasMileageCalculator() {
  // Vehicle A
  const [mpgA, setMpgA] = useState("28");
  const [milesPerDay, setMilesPerDay] = useState("40");
  const [drivingDays, setDrivingDays] = useState("5");
  const [stateIdx, setStateIdx] = useState(0); // index into STATE_GAS_PRICES
  const [customPrice, setCustomPrice] = useState("");
  const [useCustomPrice, setUseCustomPrice] = useState(false);

  // Trip mode
  const [mode, setMode] = useState<"daily" | "trip">("daily");
  const [tripMiles, setTripMiles] = useState("300");

  // Vehicle B (comparison)
  const [showComparison, setShowComparison] = useState(false);
  const [mpgB, setMpgB] = useState("38");
  const [priceDiffB, setPriceDiffB] = useState("5000");

  const [results, setResults] = useState<Results | null>(null);

  const gasPrice = useCustomPrice
    ? parseFloat(customPrice) || STATE_GAS_PRICES[0].price
    : STATE_GAS_PRICES[stateIdx].price;

  function calculate() {
    const mpg = parseFloat(mpgA) || 28;
    const days = parseInt(drivingDays) || 5;
    const milesDay = parseFloat(milesPerDay) || 40;
    const price = gasPrice;

    // Annual miles
    const annualMiles = mode === "daily" ? milesDay * days * 52 : parseFloat(tripMiles) || 300;
    const tripMilesVal = mode === "trip" ? parseFloat(tripMiles) || 300 : milesDay * days;

    const tripGallons = tripMilesVal / mpg;
    const tripCost = tripGallons * price;

    const annualGallons = (mode === "daily" ? annualMiles : annualMiles) / mpg;
    const annualCost = annualGallons * price;
    const monthlyCost = annualCost / 12;
    const costPerMile = price / mpg;
    const annualCO2lbs = annualGallons * 19.6;

    let savingsPerYear: number | undefined;
    let breakEvenMonths: number | undefined;

    if (showComparison) {
      const mpgBVal = parseFloat(mpgB) || 38;
      const annualCostB = (annualMiles / mpgBVal) * price;
      savingsPerYear = annualCost - annualCostB;
      const priceDiff = parseFloat(priceDiffB) || 0;
      if (savingsPerYear > 0 && priceDiff > 0) {
        breakEvenMonths = Math.ceil((priceDiff / savingsPerYear) * 12);
      }
    }

    setResults({
      tripCost,
      tripGallons,
      annualCost,
      annualGallons,
      monthlyCost,
      costPerMile,
      savingsPerYear,
      breakEvenMonths,
      annualCO2lbs,
    });
  }

  function reset() {
    setMpgA("28"); setMilesPerDay("40"); setDrivingDays("5");
    setStateIdx(0); setCustomPrice(""); setUseCustomPrice(false);
    setMode("daily"); setTripMiles("300");
    setShowComparison(false); setMpgB("38"); setPriceDiffB("5000");
    setResults(null);
  }

  return (
    <div className="space-y-6">
      {/* ── Inputs ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7 space-y-6">

        {/* Mode toggle */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">Calculator Mode</p>
          <div className="grid grid-cols-2 gap-2">
            {([
              { id: "daily", label: "Daily Driving Cost", sub: "weekly & annual" },
              { id: "trip", label: "Road Trip Cost", sub: "one-way or round-trip" },
            ] as const).map(({ id, label, sub }) => (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                className={`px-4 py-3 rounded-xl border text-left transition-colors cursor-pointer ${
                  mode === id
                    ? "bg-primary-50 border-primary-400 text-primary-700"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <p className="text-sm font-bold">{label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle MPG */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">Your Vehicle</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Fuel Economy (MPG)</label>
              <div className="relative">
                <Fuel className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="number" min="1" max="200" value={mpgA}
                  onChange={(e) => setMpgA(e.target.value)}
                  placeholder="28"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <p className="mt-0.5 text-[10px] text-slate-400">Find on window sticker or fueleconomy.gov</p>
            </div>

            {mode === "daily" ? (
              <>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Miles Per Day</label>
                  <input
                    type="number" min="0" value={milesPerDay}
                    onChange={(e) => setMilesPerDay(e.target.value)}
                    placeholder="40"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Driving Days / Week</label>
                  <select
                    value={drivingDays}
                    onChange={(e) => setDrivingDays(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                      <option key={d} value={d}>{d} day{d !== 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <div className="col-span-2">
                <label className="block text-[11px] text-slate-500 mb-1">Trip Distance (miles)</label>
                <input
                  type="number" min="0" value={tripMiles}
                  onChange={(e) => setTripMiles(e.target.value)}
                  placeholder="300"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Gas price */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">Gas Price</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">State Average</label>
              <select
                value={stateIdx}
                onChange={(e) => { setStateIdx(Number(e.target.value)); setUseCustomPrice(false); }}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {STATE_GAS_PRICES.map((s, i) => (
                  <option key={s.abbr} value={i}>
                    {s.state} — ${s.price.toFixed(2)}/gal
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Or Enter Custom Price</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="number" min="0" step="0.01" value={customPrice}
                  onChange={(e) => { setCustomPrice(e.target.value); setUseCustomPrice(true); }}
                  placeholder={STATE_GAS_PRICES[stateIdx].price.toFixed(2)}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            Using: <strong>${gasPrice.toFixed(2)}/gallon</strong>
            {useCustomPrice ? " (custom)" : ` — ${STATE_GAS_PRICES[stateIdx].state}`}
          </p>
        </div>

        {/* Vehicle comparison toggle */}
        <div>
          <button
            type="button"
            onClick={() => setShowComparison((p) => !p)}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 cursor-pointer"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${showComparison ? "rotate-180" : ""}`} />
            {showComparison ? "Hide" : "Compare with another vehicle (optional)"}
          </button>

          {showComparison && (
            <div className="mt-3 grid grid-cols-2 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Vehicle B — MPG</label>
                <div className="relative">
                  <Fuel className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="number" min="1" max="200" value={mpgB}
                    onChange={(e) => setMpgB(e.target.value)}
                    placeholder="38"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Price Difference ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="number" min="0" value={priceDiffB}
                    onChange={(e) => setPriceDiffB(e.target.value)}
                    placeholder="5,000"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  />
                </div>
                <p className="mt-0.5 text-[10px] text-slate-400">How much more Vehicle B costs to buy</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={calculate}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
          >
            <Fuel className="w-4 h-4" /> Calculate Fuel Cost
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
      {results && (
        <div className="space-y-4">
          {/* Main metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <CostCard
              label={mode === "trip" ? "Trip Cost" : "Daily Cost"}
              value={fmt2(mode === "trip" ? results.tripCost : results.tripCost / (parseInt(drivingDays) || 5))}
              sub={mode === "trip" ? `${results.tripGallons.toFixed(1)} gallons` : `${(results.tripGallons / (parseInt(drivingDays) || 5)).toFixed(1)} gal/day`}
              highlight
            />
            <CostCard
              label="Monthly Cost"
              value={fmt2(results.monthlyCost)}
              sub="based on annual avg"
            />
            <CostCard
              label="Annual Cost"
              value={fmt0(results.annualCost)}
              sub={`${results.annualGallons.toFixed(0)} gallons/yr`}
            />
            <CostCard
              label="Cost Per Mile"
              value={`$${results.costPerMile.toFixed(3)}`}
              sub="fuel only"
            />
          </div>

          {/* CO2 info */}
          <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
            <p>
              At {mpgA} MPG, your vehicle emits approximately{" "}
              <strong>{Math.round(results.annualCO2lbs).toLocaleString()} lbs of CO₂</strong> per year
              ({(results.annualCO2lbs / 2204.6).toFixed(1)} metric tons).
              The EPA average passenger car emits about 4.6 metric tons per year.
            </p>
          </div>

          {/* Comparison results */}
          {results.savingsPerYear !== undefined && (
            <div className={`p-5 rounded-xl border ${results.savingsPerYear > 0 ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
              <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${results.savingsPerYear > 0 ? "text-emerald-700" : "text-amber-700"}`}>
                Vehicle Comparison
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wide">Vehicle A ({mpgA} MPG)</p>
                  <p className="text-xl font-bold text-slate-900">{fmt0(results.annualCost)}/yr</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wide">Vehicle B ({mpgB} MPG)</p>
                  <p className="text-xl font-bold text-slate-900">{fmt0(results.annualCost - (results.savingsPerYear ?? 0))}/yr</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wide">Annual Savings</p>
                  <p className={`text-xl font-bold ${results.savingsPerYear > 0 ? "text-emerald-700" : "text-red-600"}`}>
                    {results.savingsPerYear > 0 ? "+" : ""}{fmt0(Math.abs(results.savingsPerYear))}/yr
                  </p>
                </div>
              </div>
              {results.breakEvenMonths !== undefined && results.savingsPerYear > 0 && (
                <p className="mt-3 text-sm text-slate-700">
                  {results.breakEvenMonths <= 60 ? (
                    <><CheckCircle2 className="w-4 h-4 inline text-emerald-600 mr-1" />
                    Vehicle B pays for its <strong>${parseInt(priceDiffB).toLocaleString()} premium</strong> in fuel savings
                    after <strong>{results.breakEvenMonths} months</strong> ({(results.breakEvenMonths / 12).toFixed(1)} years).</>
                  ) : (
                    <><AlertTriangle className="w-4 h-4 inline text-amber-600 mr-1" />
                    At current fuel prices it would take <strong>{results.breakEvenMonths} months</strong> to recoup the
                    price premium — longer than most people keep a vehicle.</>
                  )}
                </p>
              )}
            </div>
          )}

          {/* Tips if MPG is low */}
          {parseFloat(mpgA) < 22 && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <TrendingUp className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <div>
                <p className="font-bold text-amber-900 mb-1">Your MPG is below average</p>
                <p>
                  The average US passenger car gets about 28 MPG. Improving to 35 MPG would save
                  approximately {fmt0((results.annualGallons - (results.annualGallons * 28 / 35)) * gasPrice)}/year
                  at current gas prices. Consider checking tire pressure, replacing air filters,
                  and avoiding hard acceleration.
                </p>
              </div>
            </div>
          )}

          {/* Cross-link */}
          <div className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-sm text-slate-700">
              Planning to buy a more fuel-efficient car?{" "}
              <strong className="text-slate-900">Calculate what you can afford.</strong>
            </p>
            <Link
              href="/car-affordability-calculator"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Affordability Calc <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function CostCard({
  label, value, sub, highlight,
}: {
  label: string; value: string; sub: string; highlight?: boolean;
}) {
  return (
    <div className={`rounded-xl border p-4 ${highlight ? "bg-primary-600 border-primary-600" : "bg-white border-slate-200"}`}>
      <p className={`text-[10px] font-bold uppercase tracking-wide mb-1 ${highlight ? "text-primary-100" : "text-slate-500"}`}>
        {label}
      </p>
      <p className={`text-xl font-bold ${highlight ? "text-white" : "text-slate-900"}`}>{value}</p>
      <p className={`text-[10px] mt-0.5 ${highlight ? "text-primary-200" : "text-slate-400"}`}>{sub}</p>
    </div>
  );
}
