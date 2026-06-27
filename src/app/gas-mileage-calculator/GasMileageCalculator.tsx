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
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    modeHeading: "Calculator Mode",
    modeDaily: "Daily Driving Cost",
    modeDailySub: "weekly & annual",
    modeTrip: "Road Trip Cost",
    modeTripSub: "one-way or round-trip",
    yourVehicle: "Your Vehicle",
    mpgLabel: "Fuel Economy (MPG)",
    mpgHint: "Find on window sticker or fueleconomy.gov",
    milesPerDay: "Miles Per Day",
    drivingDays: "Driving Days / Week",
    dayUnit: (d: number) => `${d} day${d !== 1 ? "s" : ""}`,
    tripDistance: "Trip Distance (miles)",
    gasPrice: "Gas Price",
    stateAverage: "State Average",
    customPrice: "Or Enter Custom Price",
    usingPrice: "Using:",
    perGallon: "/gallon",
    customLabel: "(custom)",
    hideCompare: "Hide",
    showCompare: "Compare with another vehicle (optional)",
    vehicleBMpg: "Vehicle B — MPG",
    priceDiff: "Price Difference ($)",
    priceDiffHint: "How much more Vehicle B costs to buy",
    calculate: "Calculate Fuel Cost",
    reset: "Reset",
    tripCost: "Trip Cost",
    dailyCost: "Daily Cost",
    gallons: "gallons",
    galPerDay: "gal/day",
    monthlyCost: "Monthly Cost",
    monthlySub: "based on annual avg",
    annualCost: "Annual Cost",
    gallonsPerYear: "gallons/yr",
    costPerMile: "Cost Per Mile",
    fuelOnly: "fuel only",
    co2Pre: "At",
    co2Mid: "MPG, your vehicle emits approximately",
    co2LbsLabel: "lbs of CO₂",
    co2PerYear: "per year",
    co2Tons: "metric tons",
    co2Compare: "). The EPA average passenger car emits about 4.6 metric tons per year.",
    comparison: "Vehicle Comparison",
    vehicleA: "Vehicle A",
    vehicleB: "Vehicle B",
    annualSavings: "Annual Savings",
    perYear: "/yr",
    payOffPre: "Vehicle B pays for its",
    payOffPremium: "premium",
    payOffMid: "in fuel savings after",
    payOffMonths: "months",
    payOffYears: "years).",
    longPaybackPre: "At current fuel prices it would take",
    longPaybackMid: "months",
    longPaybackEnd: "to recoup the price premium — longer than most people keep a vehicle.",
    lowMpgTitle: "Your MPG is below average",
    lowMpgBody1: "The average US passenger car gets about 28 MPG. Improving to 35 MPG would save approximately",
    lowMpgBody2: "/year at current gas prices. Consider checking tire pressure, replacing air filters, and avoiding hard acceleration.",
    crossLinkLead: "Planning to buy a more fuel-efficient car?",
    crossLinkBold: "Calculate what you can afford.",
    crossLinkBtn: "Affordability Calc",
  },
  es: {
    modeHeading: "Modo de calculadora",
    modeDaily: "Costo de manejo diario",
    modeDailySub: "semanal y anual",
    modeTrip: "Costo de viaje por carretera",
    modeTripSub: "ida o ida y vuelta",
    yourVehicle: "Tu vehículo",
    mpgLabel: "Eficiencia de combustible (MPG)",
    mpgHint: "Encuéntralo en la calcomanía o en fueleconomy.gov",
    milesPerDay: "Millas por día",
    drivingDays: "Días de manejo / semana",
    dayUnit: (d: number) => `${d} día${d !== 1 ? "s" : ""}`,
    tripDistance: "Distancia del viaje (millas)",
    gasPrice: "Precio de gasolina",
    stateAverage: "Promedio estatal",
    customPrice: "O ingresa precio personalizado",
    usingPrice: "Usando:",
    perGallon: "/galón",
    customLabel: "(personalizado)",
    hideCompare: "Ocultar",
    showCompare: "Comparar con otro vehículo (opcional)",
    vehicleBMpg: "Vehículo B — MPG",
    priceDiff: "Diferencia de precio ($)",
    priceDiffHint: "Cuánto más cuesta comprar el Vehículo B",
    calculate: "Calcular costo de combustible",
    reset: "Reiniciar",
    tripCost: "Costo del viaje",
    dailyCost: "Costo diario",
    gallons: "galones",
    galPerDay: "gal/día",
    monthlyCost: "Costo mensual",
    monthlySub: "basado en el promedio anual",
    annualCost: "Costo anual",
    gallonsPerYear: "galones/año",
    costPerMile: "Costo por milla",
    fuelOnly: "solo combustible",
    co2Pre: "A",
    co2Mid: "MPG, tu vehículo emite aproximadamente",
    co2LbsLabel: "lbs de CO₂",
    co2PerYear: "por año",
    co2Tons: "toneladas métricas",
    co2Compare: "). El auto de pasajeros promedio de la EPA emite alrededor de 4.6 toneladas métricas por año.",
    comparison: "Comparación de vehículos",
    vehicleA: "Vehículo A",
    vehicleB: "Vehículo B",
    annualSavings: "Ahorro anual",
    perYear: "/año",
    payOffPre: "El Vehículo B paga su",
    payOffPremium: "extra",
    payOffMid: "en ahorro de combustible después de",
    payOffMonths: "meses",
    payOffYears: "años).",
    longPaybackPre: "A los precios actuales de combustible tomaría",
    longPaybackMid: "meses",
    longPaybackEnd: "recuperar el precio extra — más tiempo del que la mayoría conserva un vehículo.",
    lowMpgTitle: "Tu MPG está debajo del promedio",
    lowMpgBody1: "El auto de pasajeros promedio en EE. UU. obtiene aproximadamente 28 MPG. Mejorar a 35 MPG ahorraría aproximadamente",
    lowMpgBody2: "/año a los precios actuales de gasolina. Considera revisar la presión de llantas, reemplazar filtros de aire y evitar aceleración brusca.",
    crossLinkLead: "¿Planeas comprar un auto más eficiente en combustible?",
    crossLinkBold: "Calcula cuánto puedes pagar.",
    crossLinkBtn: "Calc. asequibilidad",
  },
} as const;

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

export default function GasMileageCalculator({ locale = "en" }: { locale?: Locale } = {}) {
  const t = COPY[locale];
  const affordabilityHref = locale === "es" ? "/es/car-affordability-calculator" : "/car-affordability-calculator";
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
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">{t.modeHeading}</p>
          <div className="grid grid-cols-2 gap-2">
            {([
              { id: "daily", label: t.modeDaily, sub: t.modeDailySub },
              { id: "trip", label: t.modeTrip, sub: t.modeTripSub },
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
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">{t.yourVehicle}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">{t.mpgLabel}</label>
              <div className="relative">
                <Fuel className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="number" min="1" max="200" value={mpgA}
                  onChange={(e) => setMpgA(e.target.value)}
                  placeholder="28"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <p className="mt-0.5 text-[10px] text-slate-400">{t.mpgHint}</p>
            </div>

            {mode === "daily" ? (
              <>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">{t.milesPerDay}</label>
                  <input
                    type="number" min="0" value={milesPerDay}
                    onChange={(e) => setMilesPerDay(e.target.value)}
                    placeholder="40"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">{t.drivingDays}</label>
                  <select
                    value={drivingDays}
                    onChange={(e) => setDrivingDays(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                      <option key={d} value={d}>{t.dayUnit(d)}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <div className="col-span-2">
                <label className="block text-[11px] text-slate-500 mb-1">{t.tripDistance}</label>
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
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">{t.gasPrice}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">{t.stateAverage}</label>
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
              <label className="block text-[11px] text-slate-500 mb-1">{t.customPrice}</label>
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
            {t.usingPrice} <strong>${gasPrice.toFixed(2)}{t.perGallon}</strong>
            {useCustomPrice ? ` ${t.customLabel}` : ` — ${STATE_GAS_PRICES[stateIdx].state}`}
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
            {showComparison ? t.hideCompare : t.showCompare}
          </button>

          {showComparison && (
            <div className="mt-3 grid grid-cols-2 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">{t.vehicleBMpg}</label>
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
                <label className="block text-[11px] text-slate-500 mb-1">{t.priceDiff}</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="number" min="0" value={priceDiffB}
                    onChange={(e) => setPriceDiffB(e.target.value)}
                    placeholder="5,000"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  />
                </div>
                <p className="mt-0.5 text-[10px] text-slate-400">{t.priceDiffHint}</p>
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
            <Fuel className="w-4 h-4" /> {t.calculate}
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-colors cursor-pointer"
            title={t.reset}
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
              label={mode === "trip" ? t.tripCost : t.dailyCost}
              value={fmt2(mode === "trip" ? results.tripCost : results.tripCost / (parseInt(drivingDays) || 5))}
              sub={mode === "trip" ? `${results.tripGallons.toFixed(1)} ${t.gallons}` : `${(results.tripGallons / (parseInt(drivingDays) || 5)).toFixed(1)} ${t.galPerDay}`}
              highlight
            />
            <CostCard
              label={t.monthlyCost}
              value={fmt2(results.monthlyCost)}
              sub={t.monthlySub}
            />
            <CostCard
              label={t.annualCost}
              value={fmt0(results.annualCost)}
              sub={`${results.annualGallons.toFixed(0)} ${t.gallonsPerYear}`}
            />
            <CostCard
              label={t.costPerMile}
              value={`$${results.costPerMile.toFixed(3)}`}
              sub={t.fuelOnly}
            />
          </div>

          {/* CO2 info */}
          <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
            <p>
              {t.co2Pre} {mpgA} {t.co2Mid}{" "}
              <strong>{Math.round(results.annualCO2lbs).toLocaleString()} {t.co2LbsLabel}</strong> {t.co2PerYear}
              {" "}({(results.annualCO2lbs / 2204.6).toFixed(1)} {t.co2Tons}{t.co2Compare}
            </p>
          </div>

          {/* Comparison results */}
          {results.savingsPerYear !== undefined && (
            <div className={`p-5 rounded-xl border ${results.savingsPerYear > 0 ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
              <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${results.savingsPerYear > 0 ? "text-emerald-700" : "text-amber-700"}`}>
                {t.comparison}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wide">{t.vehicleA} ({mpgA} MPG)</p>
                  <p className="text-xl font-bold text-slate-900">{fmt0(results.annualCost)}{t.perYear}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wide">{t.vehicleB} ({mpgB} MPG)</p>
                  <p className="text-xl font-bold text-slate-900">{fmt0(results.annualCost - (results.savingsPerYear ?? 0))}{t.perYear}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wide">{t.annualSavings}</p>
                  <p className={`text-xl font-bold ${results.savingsPerYear > 0 ? "text-emerald-700" : "text-red-600"}`}>
                    {results.savingsPerYear > 0 ? "+" : ""}{fmt0(Math.abs(results.savingsPerYear))}{t.perYear}
                  </p>
                </div>
              </div>
              {results.breakEvenMonths !== undefined && results.savingsPerYear > 0 && (
                <p className="mt-3 text-sm text-slate-700">
                  {results.breakEvenMonths <= 60 ? (
                    <><CheckCircle2 className="w-4 h-4 inline text-emerald-600 mr-1" />
                    {t.payOffPre} <strong>${parseInt(priceDiffB).toLocaleString()} {t.payOffPremium}</strong> {t.payOffMid} <strong>{results.breakEvenMonths} {t.payOffMonths}</strong> ({(results.breakEvenMonths / 12).toFixed(1)} {t.payOffYears}</>
                  ) : (
                    <><AlertTriangle className="w-4 h-4 inline text-amber-600 mr-1" />
                    {t.longPaybackPre} <strong>{results.breakEvenMonths} {t.longPaybackMid}</strong> {t.longPaybackEnd}</>
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
                <p className="font-bold text-amber-900 mb-1">{t.lowMpgTitle}</p>
                <p>
                  {t.lowMpgBody1} {fmt0((results.annualGallons - (results.annualGallons * 28 / 35)) * gasPrice)}{t.lowMpgBody2}
                </p>
              </div>
            </div>
          )}

          {/* Cross-link */}
          <div className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-sm text-slate-700">
              {t.crossLinkLead}{" "}
              <strong className="text-slate-900">{t.crossLinkBold}</strong>
            </p>
            <Link
              href={affordabilityHref}
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              {t.crossLinkBtn} <ArrowRight className="w-3.5 h-3.5" />
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
