"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  DollarSign,
  Percent,
  Calendar,
  RefreshCcw,
  Car,
  Fuel,
  Wrench,
  Shield,
  TrendingDown,
  Receipt,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Award,
  Gauge,
  ArrowRight,
  Zap,
} from "lucide-react";

/* ─── Reference data ─────────────────────────────────────── */

// US state gas prices + sales tax rates (2025 estimates)
interface StateRow {
  state: string;
  abbr: string;
  gasPrice: number;
  taxRate: number;
}

const STATE_DATA: StateRow[] = [
  { state: "National Average", abbr: "US", gasPrice: 3.45, taxRate: 5.0 },
  { state: "Alabama", abbr: "AL", gasPrice: 3.05, taxRate: 2.0 },
  { state: "Alaska", abbr: "AK", gasPrice: 3.95, taxRate: 0 },
  { state: "Arizona", abbr: "AZ", gasPrice: 3.50, taxRate: 5.6 },
  { state: "Arkansas", abbr: "AR", gasPrice: 3.00, taxRate: 6.5 },
  { state: "California", abbr: "CA", gasPrice: 4.75, taxRate: 7.25 },
  { state: "Colorado", abbr: "CO", gasPrice: 3.35, taxRate: 2.9 },
  { state: "Connecticut", abbr: "CT", gasPrice: 3.55, taxRate: 6.35 },
  { state: "Delaware", abbr: "DE", gasPrice: 3.20, taxRate: 0 },
  { state: "Florida", abbr: "FL", gasPrice: 3.30, taxRate: 6.0 },
  { state: "Georgia", abbr: "GA", gasPrice: 3.10, taxRate: 6.6 },
  { state: "Hawaii", abbr: "HI", gasPrice: 4.85, taxRate: 4.0 },
  { state: "Idaho", abbr: "ID", gasPrice: 3.40, taxRate: 6.0 },
  { state: "Illinois", abbr: "IL", gasPrice: 3.65, taxRate: 6.25 },
  { state: "Indiana", abbr: "IN", gasPrice: 3.20, taxRate: 7.0 },
  { state: "Iowa", abbr: "IA", gasPrice: 3.15, taxRate: 5.0 },
  { state: "Kansas", abbr: "KS", gasPrice: 3.10, taxRate: 6.5 },
  { state: "Kentucky", abbr: "KY", gasPrice: 3.05, taxRate: 6.0 },
  { state: "Louisiana", abbr: "LA", gasPrice: 3.00, taxRate: 4.45 },
  { state: "Maine", abbr: "ME", gasPrice: 3.40, taxRate: 5.5 },
  { state: "Maryland", abbr: "MD", gasPrice: 3.45, taxRate: 6.0 },
  { state: "Massachusetts", abbr: "MA", gasPrice: 3.50, taxRate: 6.25 },
  { state: "Michigan", abbr: "MI", gasPrice: 3.30, taxRate: 6.0 },
  { state: "Minnesota", abbr: "MN", gasPrice: 3.25, taxRate: 6.5 },
  { state: "Mississippi", abbr: "MS", gasPrice: 3.00, taxRate: 5.0 },
  { state: "Missouri", abbr: "MO", gasPrice: 3.05, taxRate: 4.225 },
  { state: "Montana", abbr: "MT", gasPrice: 3.45, taxRate: 0 },
  { state: "Nebraska", abbr: "NE", gasPrice: 3.15, taxRate: 5.5 },
  { state: "Nevada", abbr: "NV", gasPrice: 3.90, taxRate: 6.85 },
  { state: "New Hampshire", abbr: "NH", gasPrice: 3.35, taxRate: 0 },
  { state: "New Jersey", abbr: "NJ", gasPrice: 3.35, taxRate: 6.625 },
  { state: "New Mexico", abbr: "NM", gasPrice: 3.20, taxRate: 4.0 },
  { state: "New York", abbr: "NY", gasPrice: 3.70, taxRate: 4.0 },
  { state: "North Carolina", abbr: "NC", gasPrice: 3.15, taxRate: 3.0 },
  { state: "North Dakota", abbr: "ND", gasPrice: 3.20, taxRate: 5.0 },
  { state: "Ohio", abbr: "OH", gasPrice: 3.25, taxRate: 5.75 },
  { state: "Oklahoma", abbr: "OK", gasPrice: 2.95, taxRate: 3.25 },
  { state: "Oregon", abbr: "OR", gasPrice: 3.85, taxRate: 0 },
  { state: "Pennsylvania", abbr: "PA", gasPrice: 3.55, taxRate: 6.0 },
  { state: "Rhode Island", abbr: "RI", gasPrice: 3.50, taxRate: 7.0 },
  { state: "South Carolina", abbr: "SC", gasPrice: 3.05, taxRate: 5.0 },
  { state: "South Dakota", abbr: "SD", gasPrice: 3.15, taxRate: 4.0 },
  { state: "Tennessee", abbr: "TN", gasPrice: 3.05, taxRate: 7.0 },
  { state: "Texas", abbr: "TX", gasPrice: 3.00, taxRate: 6.25 },
  { state: "Utah", abbr: "UT", gasPrice: 3.45, taxRate: 4.85 },
  { state: "Vermont", abbr: "VT", gasPrice: 3.45, taxRate: 6.0 },
  { state: "Virginia", abbr: "VA", gasPrice: 3.25, taxRate: 4.15 },
  { state: "Washington", abbr: "WA", gasPrice: 4.00, taxRate: 6.5 },
  { state: "West Virginia", abbr: "WV", gasPrice: 3.20, taxRate: 6.0 },
  { state: "Wisconsin", abbr: "WI", gasPrice: 3.25, taxRate: 5.0 },
  { state: "Wyoming", abbr: "WY", gasPrice: 3.30, taxRate: 4.0 },
];

// Vehicle types with depreciation multiplier
const VEHICLE_TYPES = [
  { id: "Sedan", label: "Sedan", multiplier: 1.00 },
  { id: "SUV", label: "SUV", multiplier: 1.02 },
  { id: "Truck", label: "Truck", multiplier: 1.05 },
  { id: "EV", label: "Electric (EV)", multiplier: 0.92 },
  { id: "Luxury", label: "Luxury", multiplier: 0.92 },
  { id: "Sports", label: "Sports", multiplier: 0.95 },
  { id: "Minivan", label: "Minivan", multiplier: 0.95 },
] as const;

type VehicleTypeId = (typeof VEHICLE_TYPES)[number]["id"];

// Retention curve (residual value as % of MSRP) — interpolate between known points
const RETENTION_CURVE: Record<number, number> = {
  0: 1.00,
  1: 0.80,
  2: 0.70,
  3: 0.63,
  5: 0.50,
  7: 0.40,
  10: 0.28,
};

function retentionAt(years: number, typeMultiplier: number): number {
  const knownYears = Object.keys(RETENTION_CURVE)
    .map(Number)
    .sort((a, b) => a - b);
  if (years <= knownYears[0]) return RETENTION_CURVE[knownYears[0]];
  if (years >= knownYears[knownYears.length - 1])
    return RETENTION_CURVE[knownYears[knownYears.length - 1]] * typeMultiplier;
  for (let i = 0; i < knownYears.length - 1; i++) {
    const lo = knownYears[i];
    const hi = knownYears[i + 1];
    if (years >= lo && years <= hi) {
      const loVal = RETENTION_CURVE[lo];
      const hiVal = RETENTION_CURVE[hi];
      const t = (years - lo) / (hi - lo);
      const interp = loVal + (hiVal - loVal) * t;
      // EVs/Luxury depreciate faster, Trucks/SUVs slower — invert sign of multiplier delta
      // Multiplier > 1 means RETAINS more (better residual); < 1 means depreciates faster (worse residual)
      // residualAdjusted = interp * multiplier (capped at 1.0)
      return Math.min(interp * typeMultiplier, 1.0);
    }
  }
  return RETENTION_CURVE[10] * typeMultiplier;
}

// Maintenance levels
const MAINTENANCE_BASE: Record<"Low" | "Average" | "High", number> = {
  Low: 500,
  Average: 800,
  High: 1400,
};

// Repair cost by year (unscheduled)
function repairCostForYear(yearIndex: number): number {
  // yearIndex is 1-based (Year 1 = 1)
  if (yearIndex === 1) return 0;
  if (yearIndex === 2) return 200;
  if (yearIndex === 3) return 400;
  if (yearIndex === 4) return 700;
  if (yearIndex === 5) return 1000;
  return 1400;
}

/* ─── Types ─────────────────────────────────────────────── */

interface VehicleInputs {
  name: string;
  type: VehicleTypeId;
  price: string;
  downPayment: string;
  apr: string;
  termMonths: string;
  mpg: string;
  insurance: string;
  maintenance: "Low" | "Average" | "High";
}

interface CostBreakdown {
  depreciation: number;
  financing: number;
  fuel: number;
  insurance: number;
  maintenance: number;
  repairs: number;
  taxesFees: number;
  total: number;
  perYear: number;
  perMile: number;
  perDay: number;
  perMonth: number;
  yearByYear: YearRow[];
}

interface YearRow {
  year: number;
  depreciation: number;
  financing: number;
  fuel: number;
  insurance: number;
  maintenance: number;
  repairs: number;
  taxesFees: number;
  total: number;
}

/* ─── Helpers ───────────────────────────────────────────── */

function fmt0(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
function fmt2(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function buildAmortization(principal: number, monthlyRate: number, months: number) {
  const rows: { interest: number; principal: number; balance: number }[] = [];
  let balance = principal;
  const payment =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
  for (let m = 1; m <= months; m++) {
    const interest = balance * monthlyRate;
    const princ = Math.min(payment - interest, balance);
    balance = Math.max(balance - princ, 0);
    rows.push({ interest, principal: princ, balance });
  }
  return { rows, payment };
}

/* ─── Calculation ───────────────────────────────────────── */

function calculateTCO(
  inputs: VehicleInputs,
  years: number,
  annualMiles: number,
  gasPrice: number,
  taxRatePct: number
): CostBreakdown {
  const price = parseFloat(inputs.price.replace(/,/g, "")) || 0;
  const down = parseFloat(inputs.downPayment.replace(/,/g, "")) || 0;
  const apr = parseFloat(inputs.apr) || 0;
  const termMonths = parseInt(inputs.termMonths) || 60;
  const mpg = parseFloat(inputs.mpg) || 28;
  const insuranceAnnual = parseFloat(inputs.insurance.replace(/,/g, "")) || 1800;

  const typeMult =
    VEHICLE_TYPES.find((t) => t.id === inputs.type)?.multiplier ?? 1.0;

  // Depreciation = price - residual at end of period
  const residualPct = retentionAt(years, typeMult);
  const residual = price * residualPct;
  const depreciationTotal = Math.max(price - residual, 0);

  // Financing
  const principal = Math.max(price - down, 0);
  const monthlyRate = apr / 100 / 12;
  const { rows: amort } = buildAmortization(principal, monthlyRate, termMonths);
  // Sum interest paid during the analysis period (cap at termMonths)
  const monthsInPeriod = Math.min(years * 12, termMonths);
  let interestPaid = 0;
  for (let i = 0; i < monthsInPeriod; i++) {
    interestPaid += amort[i]?.interest ?? 0;
  }
  // Opportunity cost on down payment (5%/yr simple)
  const oppCost = down * 0.05 * years;
  const financingTotal = interestPaid + oppCost;

  // Fuel — for EVs, treat MPG as MPGe and apply a ~0.35x cost factor (electricity vs gas)
  const totalMiles = annualMiles * years;
  const fuelTotal =
    inputs.type === "EV"
      ? (totalMiles / Math.max(mpg, 1)) * gasPrice * 0.35
      : (totalMiles / Math.max(mpg, 1)) * gasPrice;

  // Insurance — 2% annual inflation
  let insuranceTotal = 0;
  for (let y = 1; y <= years; y++) {
    insuranceTotal += insuranceAnnual * Math.pow(1.02, y - 1);
  }

  // Maintenance — base × age multiplier (years > 5 cost 40% more)
  const maintBase = MAINTENANCE_BASE[inputs.maintenance];
  let maintenanceTotal = 0;
  for (let y = 1; y <= years; y++) {
    const ageMult = y > 5 ? 1.4 : 1.0;
    maintenanceTotal += maintBase * ageMult;
  }

  // Repairs (unscheduled)
  let repairsTotal = 0;
  for (let y = 1; y <= years; y++) {
    repairsTotal += repairCostForYear(y);
  }

  // Sales tax (one-time) + registration ($200/yr)
  const salesTax = price * (taxRatePct / 100);
  const registrationTotal = 200 * years;
  const taxesFeesTotal = salesTax + registrationTotal;

  const total =
    depreciationTotal +
    financingTotal +
    fuelTotal +
    insuranceTotal +
    maintenanceTotal +
    repairsTotal +
    taxesFeesTotal;

  // Year-by-year breakdown
  const yearByYear: YearRow[] = [];
  for (let y = 1; y <= years; y++) {
    // Depreciation per year — use difference in retention between y-1 and y
    const residualAtY = price * retentionAt(y, typeMult);
    const residualAtYminus1 = price * retentionAt(y - 1, typeMult);
    const depYear = Math.max(residualAtYminus1 - residualAtY, 0);

    // Financing per year — sum of 12 months of interest within the loan term
    let finYear = 0;
    const startMonth = (y - 1) * 12;
    const endMonth = Math.min(y * 12, termMonths);
    for (let m = startMonth; m < endMonth; m++) {
      finYear += amort[m]?.interest ?? 0;
    }
    finYear += down * 0.05; // opp cost spread evenly

    const fuelYear =
      inputs.type === "EV"
        ? (annualMiles / Math.max(mpg, 1)) * gasPrice * 0.35
        : (annualMiles / Math.max(mpg, 1)) * gasPrice;

    const insYear = insuranceAnnual * Math.pow(1.02, y - 1);
    const maintYear = maintBase * (y > 5 ? 1.4 : 1.0);
    const repYear = repairCostForYear(y);
    const taxYear = (y === 1 ? salesTax : 0) + 200;

    yearByYear.push({
      year: y,
      depreciation: depYear,
      financing: finYear,
      fuel: fuelYear,
      insurance: insYear,
      maintenance: maintYear,
      repairs: repYear,
      taxesFees: taxYear,
      total: depYear + finYear + fuelYear + insYear + maintYear + repYear + taxYear,
    });
  }

  return {
    depreciation: depreciationTotal,
    financing: financingTotal,
    fuel: fuelTotal,
    insurance: insuranceTotal,
    maintenance: maintenanceTotal,
    repairs: repairsTotal,
    taxesFees: taxesFeesTotal,
    total,
    perYear: total / years,
    perMile: total / Math.max(totalMiles, 1),
    perDay: total / (years * 365),
    perMonth: total / (years * 12),
    yearByYear,
  };
}

/* ─── Color tokens for cost categories ───────────────────── */

const COST_CATEGORIES: {
  key: keyof Pick<
    CostBreakdown,
    "depreciation" | "financing" | "fuel" | "insurance" | "maintenance" | "repairs" | "taxesFees"
  >;
  label: string;
  color: string;
  bg: string;
  text: string;
  icon: typeof Car;
}[] = [
  { key: "depreciation", label: "Depreciation", color: "bg-rose-500", bg: "bg-rose-50", text: "text-rose-700", icon: TrendingDown },
  { key: "financing", label: "Financing", color: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700", icon: Percent },
  { key: "fuel", label: "Fuel", color: "bg-orange-500", bg: "bg-orange-50", text: "text-orange-700", icon: Fuel },
  { key: "insurance", label: "Insurance", color: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-700", icon: Shield },
  { key: "maintenance", label: "Maintenance", color: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", icon: Wrench },
  { key: "repairs", label: "Repairs", color: "bg-purple-500", bg: "bg-purple-50", text: "text-purple-700", icon: AlertTriangle },
  { key: "taxesFees", label: "Taxes & Fees", color: "bg-slate-500", bg: "bg-slate-50", text: "text-slate-700", icon: Receipt },
];

/* ─── Component ─────────────────────────────────────────── */

export default function TotalCostOfOwnership() {
  // Vehicle A
  const [vehicleA, setVehicleA] = useState<VehicleInputs>({
    name: "Vehicle A",
    type: "Sedan",
    price: "32000",
    downPayment: "3000",
    apr: "6.5",
    termMonths: "60",
    mpg: "28",
    insurance: "1800",
    maintenance: "Average",
  });

  // Vehicle B
  const [showB, setShowB] = useState(false);
  const [vehicleB, setVehicleB] = useState<VehicleInputs>({
    name: "Vehicle B",
    type: "EV",
    price: "42000",
    downPayment: "5000",
    apr: "6.5",
    termMonths: "60",
    mpg: "115",
    insurance: "2100",
    maintenance: "Low",
  });

  // Shared params
  const [stateIdx, setStateIdx] = useState(0);
  const [annualMiles, setAnnualMiles] = useState("12000");
  const [years, setYears] = useState(5);
  const [customGasPrice, setCustomGasPrice] = useState("");
  const [customTaxRate, setCustomTaxRate] = useState("");

  const [resultsA, setResultsA] = useState<CostBreakdown | null>(null);
  const [resultsB, setResultsB] = useState<CostBreakdown | null>(null);

  const stateRow = STATE_DATA[stateIdx];
  const gasPrice = parseFloat(customGasPrice) || stateRow.gasPrice;
  const taxRate =
    customTaxRate.trim() === "" ? stateRow.taxRate : parseFloat(customTaxRate) || 0;

  const calculate = useCallback(() => {
    const miles = parseFloat(annualMiles.replace(/,/g, "")) || 12000;
    const a = calculateTCO(vehicleA, years, miles, gasPrice, taxRate);
    setResultsA(a);
    if (showB) {
      const b = calculateTCO(vehicleB, years, miles, gasPrice, taxRate);
      setResultsB(b);
    } else {
      setResultsB(null);
    }
  }, [vehicleA, vehicleB, years, annualMiles, gasPrice, taxRate, showB]);

  function reset() {
    setVehicleA({
      name: "Vehicle A",
      type: "Sedan",
      price: "32000",
      downPayment: "3000",
      apr: "6.5",
      termMonths: "60",
      mpg: "28",
      insurance: "1800",
      maintenance: "Average",
    });
    setVehicleB({
      name: "Vehicle B",
      type: "EV",
      price: "42000",
      downPayment: "5000",
      apr: "6.5",
      termMonths: "60",
      mpg: "115",
      insurance: "2100",
      maintenance: "Low",
    });
    setShowB(false);
    setStateIdx(0);
    setAnnualMiles("12000");
    setYears(5);
    setCustomGasPrice("");
    setCustomTaxRate("");
    setResultsA(null);
    setResultsB(null);
  }

  return (
    <div className="space-y-6">
      {/* ── Inputs Card ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7 space-y-7">
        {/* Shared parameters */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
            Analysis Settings
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* State */}
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">State</label>
              <select
                value={stateIdx}
                onChange={(e) => setStateIdx(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {STATE_DATA.map((s, i) => (
                  <option key={s.abbr} value={i}>
                    {s.state}
                  </option>
                ))}
              </select>
              <p className="mt-0.5 text-[10px] text-slate-400">
                Sets gas price (${stateRow.gasPrice.toFixed(2)}) & sales tax ({stateRow.taxRate}%)
              </p>
            </div>
            {/* Annual miles */}
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">
                Annual Miles Driven
              </label>
              <div className="relative">
                <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="number"
                  min="0"
                  value={annualMiles}
                  onChange={(e) => setAnnualMiles(e.target.value)}
                  placeholder="12000"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            {/* Years */}
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Years of Analysis</label>
              <select
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {[3, 5, 7, 10].map((y) => (
                  <option key={y} value={y}>
                    {y} years
                  </option>
                ))}
              </select>
            </div>
            {/* Custom gas price */}
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">
                Gas Price Override ($/gal)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={customGasPrice}
                  onChange={(e) => setCustomGasPrice(e.target.value)}
                  placeholder={stateRow.gasPrice.toFixed(2)}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">
                Sales Tax Override (%)
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={customTaxRate}
                  onChange={(e) => setCustomTaxRate(e.target.value)}
                  placeholder={stateRow.taxRate.toString()}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="flex items-end">
              <p className="text-[11px] text-slate-500">
                Using <strong>${gasPrice.toFixed(2)}/gal</strong> &middot;{" "}
                <strong>{taxRate}% sales tax</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Vehicle A inputs */}
        <VehicleInputCard
          title="Vehicle A"
          inputs={vehicleA}
          onChange={setVehicleA}
        />

        {/* Compare with Vehicle B toggle */}
        <div>
          <button
            type="button"
            onClick={() => setShowB((p) => !p)}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 cursor-pointer"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showB ? "rotate-180" : ""}`}
            />
            {showB ? "Hide Vehicle B comparison" : "Compare with another vehicle (optional)"}
          </button>

          {showB && (
            <div className="mt-4">
              <VehicleInputCard
                title="Vehicle B"
                inputs={vehicleB}
                onChange={setVehicleB}
              />
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={calculate}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
          >
            <Car className="w-4 h-4" /> Calculate Total Cost of Ownership
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
      {resultsA && (
        <ResultsBlock
          inputs={vehicleA}
          results={resultsA}
          years={years}
          annualMiles={parseFloat(annualMiles.replace(/,/g, "")) || 12000}
        />
      )}

      {resultsA && resultsB && showB && (
        <>
          <ResultsBlock
            inputs={vehicleB}
            results={resultsB}
            years={years}
            annualMiles={parseFloat(annualMiles.replace(/,/g, "")) || 12000}
          />
          <ComparisonBlock
            a={vehicleA}
            b={vehicleB}
            ra={resultsA}
            rb={resultsB}
            years={years}
          />
        </>
      )}

      {resultsA && (
        <div className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <p className="text-sm text-slate-700">
            Found a vehicle? <strong className="text-slate-900">Verify its history before you buy.</strong>
          </p>
          <Link
            href="/vin-check"
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-colors"
          >
            Free VIN Check <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

/* ─── Vehicle input card ────────────────────────────────── */

function VehicleInputCard({
  title,
  inputs,
  onChange,
}: {
  title: string;
  inputs: VehicleInputs;
  onChange: (v: VehicleInputs) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
      <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-4">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field
          id={`${title}-name`}
          label="Make / Model"
          icon={<Car className="w-4 h-4 text-slate-400" />}
          value={inputs.name}
          onChange={(v) => onChange({ ...inputs, name: v })}
          type="text"
          placeholder="e.g. 2024 Toyota Camry"
        />
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Vehicle Type
          </label>
          <select
            value={inputs.type}
            onChange={(e) => onChange({ ...inputs, type: e.target.value as VehicleTypeId })}
            className="w-full px-3 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {VEHICLE_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <Field
          id={`${title}-price`}
          label="Purchase Price"
          icon={<DollarSign className="w-4 h-4 text-slate-400" />}
          value={inputs.price}
          onChange={(v) => onChange({ ...inputs, price: v })}
          type="number"
          min="0"
          placeholder="32,000"
        />
        <Field
          id={`${title}-down`}
          label="Down Payment"
          icon={<DollarSign className="w-4 h-4 text-slate-400" />}
          value={inputs.downPayment}
          onChange={(v) => onChange({ ...inputs, downPayment: v })}
          type="number"
          min="0"
          placeholder="3,000"
        />
        <Field
          id={`${title}-apr`}
          label="APR (%)"
          icon={<Percent className="w-4 h-4 text-slate-400" />}
          value={inputs.apr}
          onChange={(v) => onChange({ ...inputs, apr: v })}
          type="number"
          min="0"
          step="0.1"
          placeholder="6.5"
        />
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Loan Term
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={inputs.termMonths}
              onChange={(e) => onChange({ ...inputs, termMonths: e.target.value })}
              className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {[36, 48, 60, 72, 84].map((t) => (
                <option key={t} value={t}>
                  {t} months
                </option>
              ))}
            </select>
          </div>
        </div>
        <Field
          id={`${title}-mpg`}
          label={inputs.type === "EV" ? "MPGe (combined)" : "MPG (combined)"}
          icon={<Fuel className="w-4 h-4 text-slate-400" />}
          value={inputs.mpg}
          onChange={(v) => onChange({ ...inputs, mpg: v })}
          type="number"
          min="1"
          placeholder="28"
        />
        <Field
          id={`${title}-insurance`}
          label="Annual Insurance"
          icon={<Shield className="w-4 h-4 text-slate-400" />}
          value={inputs.insurance}
          onChange={(v) => onChange({ ...inputs, insurance: v })}
          type="number"
          min="0"
          placeholder="1,800"
        />
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Maintenance Level
          </label>
          <div className="relative">
            <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={inputs.maintenance}
              onChange={(e) =>
                onChange({
                  ...inputs,
                  maintenance: e.target.value as VehicleInputs["maintenance"],
                })
              }
              className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="Low">Low ($500/yr)</option>
              <option value="Average">Average ($800/yr)</option>
              <option value="High">High ($1,400/yr)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Results block (single vehicle) ────────────────────── */

function ResultsBlock({
  inputs,
  results,
  years,
  annualMiles,
}: {
  inputs: VehicleInputs;
  results: CostBreakdown;
  years: number;
  annualMiles: number;
}) {
  // Find biggest cost
  const biggest = COST_CATEGORIES.reduce((max, cat) =>
    results[cat.key] > results[max.key] ? cat : max
  );

  return (
    <div className="space-y-4">
      {/* Big TCO header */}
      <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 sm:p-8 text-white">
        <p className="text-xs font-bold uppercase tracking-wide text-primary-200 mb-2">
          {years}-Year Total Cost of Ownership &middot; {inputs.name || "Vehicle"}
        </p>
        <p className="text-5xl sm:text-6xl font-bold tracking-tight">{fmt0(results.total)}</p>
        <p className="mt-2 text-sm text-primary-100">
          That&rsquo;s {fmt0(results.perYear)}/year &middot; {fmt2(results.perMile)}/mile
          driven &middot; {(annualMiles * years).toLocaleString()} total miles
        </p>
      </div>

      {/* Cost-per pills */}
      <div className="grid grid-cols-3 gap-3">
        <Pill label="Per Day" value={fmt2(results.perDay)} />
        <Pill label="Per Month" value={fmt0(results.perMonth)} />
        <Pill label="Per Mile" value={fmt2(results.perMile)} />
      </div>

      {/* Stacked bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">
          Cost Composition
        </p>
        <div className="flex rounded-full overflow-hidden h-5">
          {COST_CATEGORIES.map((cat) => {
            const pct = (results[cat.key] / results.total) * 100;
            if (pct < 0.1) return null;
            return (
              <div
                key={cat.key}
                className={cat.color}
                style={{ width: `${pct}%` }}
                title={`${cat.label}: ${fmt0(results[cat.key])} (${pct.toFixed(1)}%)`}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
          {COST_CATEGORIES.map((cat) => {
            const pct = (results[cat.key] / results.total) * 100;
            return (
              <span
                key={cat.key}
                className="flex items-center gap-1.5 text-xs text-slate-600"
              >
                <span className={`w-3 h-3 rounded-sm inline-block ${cat.color}`} />
                {cat.label} {pct.toFixed(1)}%
              </span>
            );
          })}
        </div>
      </div>

      {/* Insight: biggest cost */}
      <div className={`flex items-start gap-3 p-4 rounded-xl border ${biggest.bg} border-slate-200`}>
        <biggest.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${biggest.text}`} />
        <p className="text-sm text-slate-700">
          <strong className="text-slate-900">
            {biggest.label} is your biggest cost
          </strong>{" "}
          at {fmt0(results[biggest.key])} (
          {((results[biggest.key] / results.total) * 100).toFixed(1)}% of {years}-year TCO).
          {biggest.key === "depreciation" &&
            " Depreciation is unavoidable but slows after year 3 — buying a 2-3 year old used vehicle dramatically reduces this cost."}
          {biggest.key === "fuel" &&
            " Switching to a hybrid or EV could cut fuel costs by 50–70% on the same annual mileage."}
          {biggest.key === "financing" &&
            " A larger down payment or a shorter loan term can sharply reduce interest paid."}
        </p>
      </div>

      {/* EV insight */}
      {inputs.type === "EV" && (
        <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800">
          <Zap className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
          <p>
            <strong>EV fuel savings:</strong> at {annualMiles.toLocaleString()} miles/year, this
            EV saves you roughly{" "}
            <strong>
              {fmt0(
                (annualMiles / Math.max(parseFloat(inputs.mpg) || 100, 1)) *
                  3.45 *
                  0.65
              )}
              /year
            </strong>{" "}
            on fuel vs. an equivalent gas vehicle, plus reduced maintenance from fewer
            moving parts.
          </p>
        </div>
      )}

      {/* Year-by-year breakdown table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Cost Breakdown by Year</h3>
          <span className="text-xs text-slate-500">{years}-year analysis</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs">
              <tr>
                <th className="text-left px-4 py-2.5 font-medium">Category</th>
                {results.yearByYear.map((yr) => (
                  <th key={yr.year} className="text-right px-4 py-2.5 font-medium">
                    Year {yr.year}
                  </th>
                ))}
                <th className="text-right px-4 py-2.5 font-medium bg-primary-50 text-primary-700">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COST_CATEGORIES.map((cat) => (
                <tr key={cat.key} className="hover:bg-slate-50">
                  <td className="px-4 py-2.5 text-slate-700 font-medium">
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full inline-block ${cat.color}`} />
                      {cat.label}
                    </span>
                  </td>
                  {results.yearByYear.map((yr) => (
                    <td
                      key={yr.year}
                      className="px-4 py-2.5 text-right text-slate-600 tabular-nums"
                    >
                      {fmt0(yr[cat.key])}
                    </td>
                  ))}
                  <td className="px-4 py-2.5 text-right text-slate-900 font-bold bg-primary-50/40 tabular-nums">
                    {fmt0(results[cat.key])}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-100 font-bold">
                <td className="px-4 py-3 text-slate-900">Year Total</td>
                {results.yearByYear.map((yr) => (
                  <td
                    key={yr.year}
                    className="px-4 py-3 text-right text-slate-900 tabular-nums"
                  >
                    {fmt0(yr.total)}
                  </td>
                ))}
                <td className="px-4 py-3 text-right text-primary-700 bg-primary-100 tabular-nums">
                  {fmt0(results.total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Annual cost cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {results.yearByYear.map((yr) => (
          <div
            key={yr.year}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1">
              Year {yr.year}
            </p>
            <p className="text-lg font-bold text-slate-900">{fmt0(yr.total)}</p>
            <p className="text-[10px] text-slate-400 mt-1">
              {fmt0(yr.total / 12)}/mo
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Comparison block ──────────────────────────────────── */

function ComparisonBlock({
  a,
  b,
  ra,
  rb,
  years,
}: {
  a: VehicleInputs;
  b: VehicleInputs;
  ra: CostBreakdown;
  rb: CostBreakdown;
  years: number;
}) {
  const winner = ra.total <= rb.total ? "A" : "B";
  const savings = Math.abs(ra.total - rb.total);
  const winnerName =
    winner === "A" ? a.name || "Vehicle A" : b.name || "Vehicle B";
  const loserName = winner === "A" ? b.name || "Vehicle B" : a.name || "Vehicle A";

  // Break-even: if winner has higher purchase price but lower TCO, calculate when monthly savings equal price diff
  const aPrice = parseFloat(a.price.replace(/,/g, "")) || 0;
  const bPrice = parseFloat(b.price.replace(/,/g, "")) || 0;
  const winnerPrice = winner === "A" ? aPrice : bPrice;
  const loserPrice = winner === "A" ? bPrice : aPrice;
  const winnerPerMonth = winner === "A" ? ra.perMonth : rb.perMonth;
  const loserPerMonth = winner === "A" ? rb.perMonth : ra.perMonth;
  const monthlySavings = loserPerMonth - winnerPerMonth;
  const priceDiff = winnerPrice - loserPrice;
  const breakEvenMonths =
    priceDiff > 0 && monthlySavings > 0 ? Math.ceil(priceDiff / monthlySavings) : null;

  return (
    <div className="space-y-4">
      {/* Winner banner */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 sm:p-8 text-white">
        <div className="flex items-start gap-3">
          <Award className="w-7 h-7 flex-shrink-0 mt-1 text-emerald-200" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-200 mb-1">
              Net Winner
            </p>
            <p className="text-2xl sm:text-3xl font-bold">
              {winnerName} saves you {fmt0(savings)} over {years} years
            </p>
            <p className="mt-2 text-sm text-emerald-100">
              vs. {loserName} &middot; that&rsquo;s {fmt0(savings / years)}/year or{" "}
              {fmt0(savings / (years * 12))}/month
            </p>
          </div>
        </div>
      </div>

      {/* Side-by-side breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Side-by-Side Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs">
              <tr>
                <th className="text-left px-4 py-2.5 font-medium">Cost Category</th>
                <th className="text-right px-4 py-2.5 font-medium">{a.name || "Vehicle A"}</th>
                <th className="text-right px-4 py-2.5 font-medium">{b.name || "Vehicle B"}</th>
                <th className="text-right px-4 py-2.5 font-medium">Difference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COST_CATEGORIES.map((cat) => {
                const aVal = ra[cat.key];
                const bVal = rb[cat.key];
                const diff = aVal - bVal;
                return (
                  <tr key={cat.key} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 text-slate-700 font-medium">
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full inline-block ${cat.color}`} />
                        {cat.label}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right text-slate-700 tabular-nums">
                      {fmt0(aVal)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-slate-700 tabular-nums">
                      {fmt0(bVal)}
                    </td>
                    <td
                      className={`px-4 py-2.5 text-right tabular-nums font-medium ${
                        diff > 0 ? "text-rose-600" : diff < 0 ? "text-emerald-700" : "text-slate-500"
                      }`}
                    >
                      {diff === 0 ? "—" : `${diff > 0 ? "+" : "−"}${fmt0(Math.abs(diff))}`}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-slate-100 font-bold">
                <td className="px-4 py-3 text-slate-900">{years}-Year Total</td>
                <td className="px-4 py-3 text-right text-slate-900 tabular-nums">
                  {fmt0(ra.total)}
                </td>
                <td className="px-4 py-3 text-right text-slate-900 tabular-nums">
                  {fmt0(rb.total)}
                </td>
                <td
                  className={`px-4 py-3 text-right tabular-nums ${
                    ra.total - rb.total > 0 ? "text-rose-600" : "text-emerald-700"
                  }`}
                >
                  {ra.total - rb.total > 0 ? "+" : "−"}
                  {fmt0(Math.abs(ra.total - rb.total))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Break-even analysis */}
      {breakEvenMonths !== null && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
          <p>
            <strong>Break-even analysis:</strong> {winnerName} costs {fmt0(priceDiff)} more
            upfront, but its lower running costs recoup the premium in{" "}
            <strong>{breakEvenMonths} months</strong> ({(breakEvenMonths / 12).toFixed(1)} years).
            {breakEvenMonths <= years * 12
              ? ` Within your ${years}-year window — the higher-priced vehicle wins.`
              : ` Longer than your ${years}-year window — the cheaper vehicle wins on TCO.`}
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Sub-components ────────────────────────────────────── */

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

function Field({ id, label, icon, value, onChange, hint, type, min, step, placeholder }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">{icon}</span>
        <input
          id={id}
          type={type}
          min={min}
          step={step}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
        />
      </div>
      {hint && <p className="mt-1 text-[11px] text-slate-500">{hint}</p>}
    </div>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1">
        {label}
      </p>
      <p className="text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
