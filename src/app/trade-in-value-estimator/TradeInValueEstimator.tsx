"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Car,
  RefreshCcw,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  Info,
  DollarSign,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────── */

const CURRENT_YEAR = 2025;

const MAKES = [
  "Acura","Audi","BMW","Buick","Cadillac","Chevrolet","Chrysler","Dodge",
  "Ford","GMC","Genesis","Honda","Hyundai","Infiniti","Jeep","Kia","Land Rover",
  "Lexus","Lincoln","Mazda","Mercedes-Benz","Mitsubishi","Nissan","Porsche",
  "Ram","Subaru","Tesla","Toyota","Volkswagen","Volvo",
];

const BODY_STYLES = ["Sedan","SUV / Crossover","Truck","Coupe","Hatchback","Convertible","Minivan","Van","Wagon"];

const CONDITIONS: { id: string; label: string; description: string; multiplier: number }[] = [
  {
    id: "excellent",
    label: "Excellent",
    description: "Like new. No mechanical issues. Paint and interior flawless. Under 50k miles typical.",
    multiplier: 1.0,
  },
  {
    id: "very_good",
    label: "Very Good",
    description: "Minor wear only. Fully serviced. Small scratches or dents at most. Runs perfectly.",
    multiplier: 0.88,
  },
  {
    id: "good",
    label: "Good",
    description: "Normal wear. May need minor repairs. A few visible scratches or dings. No major issues.",
    multiplier: 0.75,
  },
  {
    id: "fair",
    label: "Fair",
    description: "Some mechanical or cosmetic issues. Needs repairs. High mileage for its age.",
    multiplier: 0.58,
  },
  {
    id: "poor",
    label: "Poor",
    description: "Major mechanical or body issues. Salvage history, flood damage, or heavy rust.",
    multiplier: 0.38,
  },
];

// Base resale value by age (years old) — percentage of original MSRP retained
function baseRetentionByAge(yearsOld: number): number {
  const table: Record<number, number> = {
    0: 1.0, 1: 0.81, 2: 0.70, 3: 0.62, 4: 0.55,
    5: 0.49, 6: 0.44, 7: 0.39, 8: 0.35, 9: 0.31, 10: 0.28,
  };
  if (yearsOld <= 0) return 1.0;
  if (yearsOld >= 10) return Math.max(0.28 - (yearsOld - 10) * 0.02, 0.05);
  return table[yearsOld] ?? 0.28;
}

// Brand resale-value multipliers (relative to average)
const BRAND_RETENTION: Record<string, number> = {
  Toyota: 1.12, Honda: 1.09, Subaru: 1.07, Mazda: 1.05, Lexus: 1.06,
  Ford: 0.98, Chevrolet: 0.96, GMC: 0.99, Ram: 1.01,
  BMW: 0.95, "Mercedes-Benz": 0.93, Audi: 0.92, Volkswagen: 0.94,
  Hyundai: 0.97, Kia: 0.97, Genesis: 0.94,
  Jeep: 0.99, Dodge: 0.90, Chrysler: 0.87,
  Nissan: 0.95, Infiniti: 0.92, Mitsubishi: 0.88,
  Buick: 0.93, Cadillac: 0.91, Lincoln: 0.90,
  Tesla: 1.03, Porsche: 1.10, Volvo: 0.95, "Land Rover": 0.85, Acura: 1.02,
};

// Mileage adjustment: deviation from 12,000 mi/year average
function mileageAdjustment(mileage: number, yearsOld: number): number {
  const avgMiles = Math.max(yearsOld, 1) * 12000;
  const diff = mileage - avgMiles;
  // Each 10k miles above/below average = ±2.5%
  return -(diff / 10000) * 0.025;
}

// Title brand deductions
const TITLE_ADJUSTMENTS: Record<string, number> = {
  clean: 0,
  salvage: -0.45,
  rebuilt: -0.30,
  flood: -0.50,
  lemon: -0.20,
  hail: -0.10,
};

interface EstimateResult {
  privateParty: number;
  dealerTradeIn: number;
  instantCashOffer: number;
  auctionValue: number;
  breakdown: { label: string; effect: string; amount: number }[];
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function TradeInValueEstimator() {
  const [make, setMake] = useState("");
  const [modelText, setModelText] = useState("");
  const [year, setYear] = useState(String(CURRENT_YEAR - 4));
  const [mileage, setMileage] = useState("65000");
  const [bodyStyle, setBodyStyle] = useState("");
  const [msrp, setMsrp] = useState("30000");
  const [condition, setCondition] = useState("good");
  const [titleStatus, setTitleStatus] = useState("clean");
  const [accidents, setAccidents] = useState("0");
  const [owners, setOwners] = useState("1");
  const [result, setResult] = useState<EstimateResult | null>(null);

  function estimate() {
    const vehicleYear = parseInt(year) || CURRENT_YEAR - 4;
    const yearsOld = CURRENT_YEAR - vehicleYear;
    const miles = parseInt(mileage.replace(/,/g, "")) || 65000;
    const baseMsrp = parseFloat(msrp.replace(/,/g, "")) || 30000;
    const cond = CONDITIONS.find((c) => c.id === condition) || CONDITIONS[2];
    const accidentCount = parseInt(accidents) || 0;
    const ownerCount = parseInt(owners) || 1;

    // Step 1: Base retention by age
    const ageRetention = baseRetentionByAge(yearsOld);
    const brandMult = BRAND_RETENTION[make] ?? 1.0;
    const baseFMV = baseMsrp * ageRetention * brandMult;

    // Step 2: Condition
    const afterCondition = baseFMV * cond.multiplier;

    // Step 3: Mileage
    const mileAdj = mileageAdjustment(miles, yearsOld);
    const afterMileage = afterCondition * (1 + mileAdj);

    // Step 4: Title
    const titleAdj = TITLE_ADJUSTMENTS[titleStatus] ?? 0;
    const afterTitle = afterMileage * (1 + titleAdj);

    // Step 5: Accidents
    const accidentAdj = accidentCount === 0 ? 0 : accidentCount === 1 ? -0.08 : -0.15;
    const afterAccidents = afterTitle * (1 + accidentAdj);

    // Step 6: Number of owners
    const ownerAdj = ownerCount <= 1 ? 0 : ownerCount === 2 ? -0.03 : -0.07;
    const fmv = Math.max(afterAccidents * (1 + ownerAdj), 500);

    // Different channel values
    const privateParty = Math.round(fmv / 100) * 100;
    const dealerTradeIn = Math.round((fmv * 0.82) / 100) * 100;
    const instantCashOffer = Math.round((fmv * 0.76) / 100) * 100;
    const auctionValue = Math.round((fmv * 0.65) / 100) * 100;

    setResult({
      privateParty,
      dealerTradeIn,
      instantCashOffer,
      auctionValue,
      breakdown: [
        { label: "Base MSRP", effect: "—", amount: baseMsrp },
        { label: `Age (${yearsOld} yr${yearsOld !== 1 ? "s" : ""})`, effect: `${(ageRetention * 100).toFixed(0)}% retention`, amount: Math.round(baseMsrp * ageRetention) },
        { label: `Brand (${make || "avg"})`, effect: brandMult >= 1 ? `+${((brandMult - 1) * 100).toFixed(0)}%` : `${((brandMult - 1) * 100).toFixed(0)}%`, amount: Math.round(baseMsrp * ageRetention * brandMult) },
        { label: `Condition (${cond.label})`, effect: `${((cond.multiplier - 1) * 100).toFixed(0)}%`, amount: Math.round(afterCondition) },
        { label: `Mileage (${miles.toLocaleString()} mi)`, effect: mileAdj >= 0 ? `+${(mileAdj * 100).toFixed(1)}%` : `${(mileAdj * 100).toFixed(1)}%`, amount: Math.round(afterMileage) },
        ...(titleAdj !== 0 ? [{ label: `Title (${titleStatus})`, effect: `${(titleAdj * 100).toFixed(0)}%`, amount: Math.round(afterTitle) }] : []),
        ...(accidentAdj !== 0 ? [{ label: `Accidents (${accidentCount})`, effect: `${(accidentAdj * 100).toFixed(0)}%`, amount: Math.round(afterAccidents) }] : []),
        ...(ownerAdj !== 0 ? [{ label: `Owners (${ownerCount})`, effect: `${(ownerAdj * 100).toFixed(0)}%`, amount: Math.round(fmv) }] : []),
      ],
    });
  }

  function reset() {
    setMake(""); setModelText(""); setYear(String(CURRENT_YEAR - 4));
    setMileage("65000"); setBodyStyle(""); setMsrp("30000");
    setCondition("good"); setTitleStatus("clean");
    setAccidents("0"); setOwners("1"); setResult(null);
  }

  return (
    <div className="space-y-6">
      {/* ── Inputs ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7 space-y-6">

        {/* Vehicle identity */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">Vehicle</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Year */}
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {Array.from({ length: 30 }, (_, i) => CURRENT_YEAR - i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            {/* Make */}
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Make</label>
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select…</option>
                {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            {/* Model */}
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Model</label>
              <input
                type="text"
                value={modelText}
                onChange={(e) => setModelText(e.target.value)}
                placeholder="e.g. Camry"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            {/* Body Style */}
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Body Style</label>
              <select
                value={bodyStyle}
                onChange={(e) => setBodyStyle(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select…</option>
                {BODY_STYLES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Key figures */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">Key Figures</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Mileage</label>
              <input
                type="number" min="0" value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="65,000"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1 flex items-center gap-1">
                Original MSRP
                <span className="group relative">
                  <Info className="w-3 h-3 text-slate-400 cursor-help inline" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none z-10">
                    Sticker price when new. Used to calculate depreciation baseline.
                  </span>
                </span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="number" min="0" value={msrp}
                  onChange={(e) => setMsrp(e.target.value)}
                  placeholder="30,000"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Condition */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">Condition</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {CONDITIONS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCondition(c.id)}
                title={c.description}
                className={`px-3 py-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                  condition === c.id
                    ? "bg-primary-50 border-primary-400 text-primary-700"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <p className="text-xs font-bold">{c.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight line-clamp-2">{c.description.split(".")[0]}</p>
              </button>
            ))}
          </div>
        </div>

        {/* History */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">Vehicle History</p>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Title Status</label>
              <select
                value={titleStatus}
                onChange={(e) => setTitleStatus(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="clean">Clean</option>
                <option value="salvage">Salvage</option>
                <option value="rebuilt">Rebuilt / Reconstructed</option>
                <option value="flood">Flood Damage</option>
                <option value="lemon">Lemon Law Buyback</option>
                <option value="hail">Hail Damage</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Reported Accidents</label>
              <select
                value={accidents}
                onChange={(e) => setAccidents(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="0">None</option>
                <option value="1">1 accident</option>
                <option value="2">2+ accidents</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Previous Owners</label>
              <select
                value={owners}
                onChange={(e) => setOwners(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="1">1 owner</option>
                <option value="2">2 owners</option>
                <option value="3">3+ owners</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={estimate}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
          >
            <Car className="w-4 h-4" /> Estimate Trade-In Value
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
          {/* Channel value grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ValueCard
              label="Private Party Sale"
              value={fmt(result.privateParty)}
              sub="Sell it yourself"
              highlight
            />
            <ValueCard
              label="Dealer Trade-In"
              value={fmt(result.dealerTradeIn)}
              sub="Trade toward a new car"
            />
            <ValueCard
              label="Instant Cash Offer"
              value={fmt(result.instantCashOffer)}
              sub="CarMax / Carvana / dealer"
            />
            <ValueCard
              label="Auction / Wholesale"
              value={fmt(result.auctionValue)}
              sub="Lowest — dealer resells"
              muted
            />
          </div>

          {/* Visual range bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">Value Range</p>
            <div className="relative h-8 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-slate-300 via-primary-400 to-primary-600 rounded-full"
                style={{ width: "100%" }}
              />
              {/* Markers */}
              {[
                { pct: 100, label: "Private", val: result.privateParty },
                { pct: 82, label: "Trade-In", val: result.dealerTradeIn },
                { pct: 76, label: "Instant", val: result.instantCashOffer },
                { pct: 65, label: "Auction", val: result.auctionValue },
              ].map(({ pct, label, val }) => (
                <div
                  key={label}
                  className="absolute top-0 bottom-0 flex flex-col items-center justify-center group"
                  style={{ left: `${pct - 2}%` }}
                >
                  <div className="w-0.5 h-full bg-white/60" />
                  <div className="absolute -bottom-6 hidden group-hover:block bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">
                    {label}: {fmt(val)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[11px] text-slate-500">
              <span>Auction {fmt(result.auctionValue)}</span>
              <span>Private Sale {fmt(result.privateParty)}</span>
            </div>
          </div>

          {/* Tips based on result */}
          <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
            <div>
              <p className="font-bold text-emerald-900 mb-1">Maximize your trade-in value</p>
              <p>
                The difference between a dealer trade-in ({fmt(result.dealerTradeIn)}) and a
                private sale ({fmt(result.privateParty)}) is{" "}
                <strong>{fmt(result.privateParty - result.dealerTradeIn)}</strong>. If you have
                time, listing privately on Facebook Marketplace or Craigslist captures that gap.
              </p>
            </div>
          </div>

          {titleStatus !== "clean" && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <p>
                A <strong>{titleStatus}</strong> title reduces value by{" "}
                {Math.abs(TITLE_ADJUSTMENTS[titleStatus] * 100).toFixed(0)}% compared to a
                clean title. Branded title vehicles often sell better at auction or to specialty
                dealers who rebuild and resell them.
              </p>
            </div>
          )}

          {/* Breakdown accordion */}
          <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer text-sm font-bold text-slate-900 select-none list-none">
              How was this calculated?
              <ChevronDown className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="border-t border-slate-100 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">Factor</th>
                    <th className="text-left px-4 py-2 font-medium">Adjustment</th>
                    <th className="text-right px-4 py-2 font-medium">Running Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {result.breakdown.map((row) => (
                    <tr key={row.label} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 text-slate-700">{row.label}</td>
                      <td className={`px-4 py-2.5 text-xs font-mono ${row.effect.startsWith("+") ? "text-emerald-600" : row.effect.startsWith("-") ? "text-red-500" : "text-slate-500"}`}>
                        {row.effect}
                      </td>
                      <td className="px-4 py-2.5 text-right font-bold text-slate-900">{fmt(row.amount)}</td>
                    </tr>
                  ))}
                  <tr className="bg-primary-50">
                    <td className="px-4 py-2.5 font-bold text-slate-900">Private Party (FMV)</td>
                    <td />
                    <td className="px-4 py-2.5 text-right font-bold text-primary-700">{fmt(result.privateParty)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>

          {/* Cross-link to loan calculator */}
          <div className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-sm text-slate-700">
              Use this estimate as your{" "}
              <strong className="text-slate-900">down-payment / trade-in</strong> in the Car Loan Calculator.
            </p>
            <Link
              href="/car-loan-calculator"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Loan Calculator <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function ValueCard({
  label, value, sub, highlight, muted,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <div className={`rounded-xl border p-4 ${highlight ? "bg-primary-600 border-primary-600" : "bg-white border-slate-200"}`}>
      <p className={`text-[10px] font-bold uppercase tracking-wide mb-1 ${highlight ? "text-primary-100" : "text-slate-500"}`}>
        {label}
      </p>
      <p className={`text-xl font-bold ${highlight ? "text-white" : muted ? "text-slate-500" : "text-slate-900"}`}>
        {value}
      </p>
      <p className={`text-[10px] mt-0.5 ${highlight ? "text-primary-200" : "text-slate-400"}`}>{sub}</p>
    </div>
  );
}
