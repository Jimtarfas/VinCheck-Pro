"use client";

import { useState } from "react";
import Link from "@/components/LocaleLink";
import {
  Car,
  RefreshCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  Info,
  DollarSign,
} from "lucide-react";
type Locale = "en" | "es" | "fr";

/* ─── Data ──────────────────────────────────────────────────── */

const CURRENT_YEAR = 2025;

const MAKES = [
  "Acura","Audi","BMW","Buick","Cadillac","Chevrolet","Chrysler","Dodge",
  "Ford","GMC","Genesis","Honda","Hyundai","Infiniti","Jeep","Kia","Land Rover",
  "Lexus","Lincoln","Mazda","Mercedes-Benz","Mitsubishi","Nissan","Porsche",
  "Ram","Subaru","Tesla","Toyota","Volkswagen","Volvo",
];

const BODY_STYLES_EN = ["Sedan","SUV / Crossover","Truck","Coupe","Hatchback","Convertible","Minivan","Van","Wagon"];
const BODY_STYLES_ES = ["Sedán","SUV / Crossover","Camioneta","Coupé","Hatchback","Convertible","Minivan","Van","Familiar"];

interface ConditionOption { id: string; label: string; description: string; multiplier: number; }

const CONDITIONS_EN: ConditionOption[] = [
  { id: "excellent", label: "Excellent", description: "Like new. No mechanical issues. Paint and interior flawless. Under 50k miles typical.", multiplier: 1.0 },
  { id: "very_good", label: "Very Good", description: "Minor wear only. Fully serviced. Small scratches or dents at most. Runs perfectly.", multiplier: 0.88 },
  { id: "good", label: "Good", description: "Normal wear. May need minor repairs. A few visible scratches or dings. No major issues.", multiplier: 0.75 },
  { id: "fair", label: "Fair", description: "Some mechanical or cosmetic issues. Needs repairs. High mileage for its age.", multiplier: 0.58 },
  { id: "poor", label: "Poor", description: "Major mechanical or body issues. Salvage history, flood damage, or heavy rust.", multiplier: 0.38 },
];

const CONDITIONS_ES: ConditionOption[] = [
  { id: "excellent", label: "Excelente", description: "Como nuevo. Sin problemas mecánicos. Pintura e interior impecables. Menos de 50k millas típicamente.", multiplier: 1.0 },
  { id: "very_good", label: "Muy bueno", description: "Solo desgaste menor. Totalmente servido. Pequeños rayones o abolladuras como máximo. Funciona perfectamente.", multiplier: 0.88 },
  { id: "good", label: "Bueno", description: "Desgaste normal. Puede necesitar reparaciones menores. Algunos rayones o golpes visibles. Sin problemas mayores.", multiplier: 0.75 },
  { id: "fair", label: "Regular", description: "Algunos problemas mecánicos o cosméticos. Necesita reparaciones. Alto kilometraje para su edad.", multiplier: 0.58 },
  { id: "poor", label: "Pobre", description: "Problemas mecánicos o de carrocería mayores. Historial de salvamento, daño por inundación u óxido fuerte.", multiplier: 0.38 },
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

const COPY = {
  en: {
    sectionVehicle: "Vehicle",
    year: "Year",
    make: "Make",
    model: "Model",
    modelPlaceholder: "e.g. Camry",
    bodyStyle: "Body Style",
    selectPlaceholder: "Select…",
    sectionKeyFigures: "Key Figures",
    mileage: "Mileage",
    mileagePlaceholder: "65,000",
    msrp: "Original MSRP",
    msrpPlaceholder: "30,000",
    msrpTooltip: "Sticker price when new. Used to calculate depreciation baseline.",
    sectionCondition: "Condition",
    sectionHistory: "Vehicle History",
    titleStatus: "Title Status",
    titleOptions: {
      clean: "Clean",
      salvage: "Salvage",
      rebuilt: "Rebuilt / Reconstructed",
      flood: "Flood Damage",
      lemon: "Lemon Law Buyback",
      hail: "Hail Damage",
    },
    accidents: "Reported Accidents",
    accidentOptions: { 0: "None", 1: "1 accident", 2: "2+ accidents" },
    owners: "Previous Owners",
    ownerOptions: { 1: "1 owner", 2: "2 owners", 3: "3+ owners" },
    estimateBtn: "Estimate Trade-In Value",
    resetTitle: "Reset",
    cardPrivate: { label: "Private Party Sale", sub: "Sell it yourself" },
    cardDealer: { label: "Dealer Trade-In", sub: "Trade toward a new car" },
    cardInstant: { label: "Instant Cash Offer", sub: "CarMax / Carvana / dealer" },
    cardAuction: { label: "Auction / Wholesale", sub: "Lowest — dealer resells" },
    valueRange: "Value Range",
    rangePrivate: "Private",
    rangeTradeIn: "Trade-In",
    rangeInstant: "Instant",
    rangeAuction: "Auction",
    rangeFootAuction: (v: string) => `Auction ${v}`,
    rangeFootPrivate: (v: string) => `Private Sale ${v}`,
    tipsTitle: "Maximize your trade-in value",
    tipsBody: (dealer: string, priv: string, diff: string) =>
      <>The difference between a dealer trade-in ({dealer}) and a private sale ({priv}) is <strong>{diff}</strong>. If you have time, listing privately on Facebook Marketplace or Craigslist captures that gap.</>,
    titleAlert: (status: string, pct: string) =>
      <>A <strong>{status}</strong> title reduces value by {pct}% compared to a clean title. Branded title vehicles often sell better at auction or to specialty dealers who rebuild and resell them.</>,
    breakdownSummary: "How was this calculated?",
    breakdownFactor: "Factor",
    breakdownAdjustment: "Adjustment",
    breakdownRunning: "Running Total",
    breakdownFmv: "Private Party (FMV)",
    crossLoanText: "Use this estimate as your ",
    crossLoanBold: "down-payment / trade-in",
    crossLoanSuffix: " in the Car Loan Calculator.",
    crossLoanBtn: "Loan Calculator",
    bdBaseMsrp: "Base MSRP",
    bdAge: (n: number) => `Age (${n} yr${n !== 1 ? "s" : ""})`,
    bdAgeRetention: (pct: string) => `${pct}% retention`,
    bdBrand: (m: string) => `Brand (${m || "avg"})`,
    bdCondition: (label: string) => `Condition (${label})`,
    bdMileage: (m: string) => `Mileage (${m} mi)`,
    bdTitle: (s: string) => `Title (${s})`,
    bdAccidents: (n: number) => `Accidents (${n})`,
    bdOwners: (n: number) => `Owners (${n})`,
    locale: "en-US",
    mileageSuffix: "mi",
  },
  es: {
    sectionVehicle: "Vehículo",
    year: "Año",
    make: "Marca",
    model: "Modelo",
    modelPlaceholder: "ej. Camry",
    bodyStyle: "Tipo de carrocería",
    selectPlaceholder: "Seleccionar…",
    sectionKeyFigures: "Cifras clave",
    mileage: "Kilometraje",
    mileagePlaceholder: "65,000",
    msrp: "MSRP original",
    msrpPlaceholder: "30,000",
    msrpTooltip: "Precio de etiqueta cuando era nuevo. Se usa para calcular la base de depreciación.",
    sectionCondition: "Condición",
    sectionHistory: "Historial del vehículo",
    titleStatus: "Estado del título",
    titleOptions: {
      clean: "Limpio",
      salvage: "Salvamento",
      rebuilt: "Reconstruido / Reconstituido",
      flood: "Daño por inundación",
      lemon: "Recompra por ley de limón",
      hail: "Daño por granizo",
    },
    accidents: "Accidentes reportados",
    accidentOptions: { 0: "Ninguno", 1: "1 accidente", 2: "2+ accidentes" },
    owners: "Dueños anteriores",
    ownerOptions: { 1: "1 dueño", 2: "2 dueños", 3: "3+ dueños" },
    estimateBtn: "Estimar valor de intercambio",
    resetTitle: "Restablecer",
    cardPrivate: { label: "Venta particular", sub: "Véndelo tú mismo" },
    cardDealer: { label: "Intercambio en concesionario", sub: "A cuenta de un auto nuevo" },
    cardInstant: { label: "Oferta de efectivo instantánea", sub: "CarMax / Carvana / concesionario" },
    cardAuction: { label: "Subasta / Mayoreo", sub: "Más bajo — el concesionario revende" },
    valueRange: "Rango de valor",
    rangePrivate: "Particular",
    rangeTradeIn: "Intercambio",
    rangeInstant: "Instantánea",
    rangeAuction: "Subasta",
    rangeFootAuction: (v: string) => `Subasta ${v}`,
    rangeFootPrivate: (v: string) => `Venta particular ${v}`,
    tipsTitle: "Maximiza tu valor de intercambio",
    tipsBody: (dealer: string, priv: string, diff: string) =>
      <>La diferencia entre un intercambio en concesionario ({dealer}) y una venta particular ({priv}) es <strong>{diff}</strong>. Si tienes tiempo, publicar de manera particular en Facebook Marketplace o Craigslist captura esa brecha.</>,
    titleAlert: (status: string, pct: string) =>
      <>Un título <strong>{status}</strong> reduce el valor en {pct}% comparado con un título limpio. Los vehículos con título marcado a menudo se venden mejor en subasta o a concesionarios especializados que los reconstruyen y revenden.</>,
    breakdownSummary: "¿Cómo se calculó esto?",
    breakdownFactor: "Factor",
    breakdownAdjustment: "Ajuste",
    breakdownRunning: "Total acumulado",
    breakdownFmv: "Venta particular (valor justo de mercado)",
    crossLoanText: "Usa esta estimación como tu ",
    crossLoanBold: "pago inicial / intercambio",
    crossLoanSuffix: " en la calculadora de préstamo de auto.",
    crossLoanBtn: "Calculadora de préstamo",
    bdBaseMsrp: "MSRP base",
    bdAge: (n: number) => `Edad (${n} año${n !== 1 ? "s" : ""})`,
    bdAgeRetention: (pct: string) => `${pct}% retención`,
    bdBrand: (m: string) => `Marca (${m || "promedio"})`,
    bdCondition: (label: string) => `Condición (${label})`,
    bdMileage: (m: string) => `Kilometraje (${m} mi)`,
    bdTitle: (s: string) => `Título (${s})`,
    bdAccidents: (n: number) => `Accidentes (${n})`,
    bdOwners: (n: number) => `Dueños (${n})`,
    locale: "es-MX",
    mileageSuffix: "mi",
  },
  fr: {
    sectionVehicle: "V\u00e9hicule",
    year: "Ann\u00e9e",
    make: "Marque",
    model: "Mod\u00e8le",
    modelPlaceholder: "ex. Camry",
    bodyStyle: "Type de carrosserie",
    selectPlaceholder: "S\u00e9lectionner\u2026",
    sectionKeyFigures: "Chiffres cl\u00e9s",
    mileage: "Kilom\u00e9trage",
    mileagePlaceholder: "65,000",
    msrp: "MSRP d'origine",
    msrpPlaceholder: "30,000",
    msrpTooltip: "Prix affich\u00e9 quand le v\u00e9hicule \u00e9tait neuf. Sert \u00e0 calculer la base de d\u00e9pr\u00e9ciation.",
    sectionCondition: "\u00c9tat",
    sectionHistory: "Historique du v\u00e9hicule",
    titleStatus: "Statut du titre",
    titleOptions: {
      clean: "Propre",
      salvage: "Salvage",
      rebuilt: "Reconstruit",
      flood: "Flood (inondation)",
      lemon: "Rachat Lemon Law",
      hail: "D\u00e9g\u00e2ts de gr\u00eale",
    },
    accidents: "Accidents d\u00e9clar\u00e9s",
    accidentOptions: { 0: "Aucun", 1: "1 accident", 2: "2 accidents ou plus" },
    owners: "Propri\u00e9taires pr\u00e9c\u00e9dents",
    ownerOptions: { 1: "1 propri\u00e9taire", 2: "2 propri\u00e9taires", 3: "3 propri\u00e9taires ou plus" },
    estimateBtn: "Estimer la valeur de reprise",
    resetTitle: "R\u00e9initialiser",
    cardPrivate: { label: "Vente entre particuliers", sub: "Vends-le toi-m\u00eame" },
    cardDealer: { label: "Reprise concessionnaire", sub: "En \u00e9change d'un v\u00e9hicule neuf" },
    cardInstant: { label: "Offre en esp\u00e8ces instantan\u00e9e", sub: "CarMax / Carvana / concessionnaire" },
    cardAuction: { label: "Ench\u00e8re / Gros", sub: "Le plus bas \u2014 le concessionnaire revend" },
    valueRange: "Fourchette de valeur",
    rangePrivate: "Particulier",
    rangeTradeIn: "Reprise",
    rangeInstant: "Instantan\u00e9e",
    rangeAuction: "Ench\u00e8re",
    rangeFootAuction: (v: string) => `Ench\u00e8re ${v}`,
    rangeFootPrivate: (v: string) => `Vente particulier ${v}`,
    tipsTitle: "Maximise ta valeur de reprise",
    tipsBody: (dealer: string, priv: string, diff: string) =>
      <>L'\u00e9cart entre une reprise concessionnaire ({dealer}) et une vente entre particuliers ({priv}) est de <strong>{diff}</strong>. Si tu as le temps, publier en direct sur Facebook Marketplace ou Craigslist permet de capter cet \u00e9cart.</>,
    titleAlert: (status: string, pct: string) =>
      <>Un titre <strong>{status}</strong> r\u00e9duit la valeur de {pct}\u00a0% par rapport \u00e0 un titre propre. Les v\u00e9hicules \u00e0 titre marqu\u00e9 se vendent souvent mieux aux ench\u00e8res ou \u00e0 des concessionnaires sp\u00e9cialis\u00e9s qui les reconstruisent et les revendent.</>,
    breakdownSummary: "Comment ce calcul est-il fait\u00a0?",
    breakdownFactor: "Facteur",
    breakdownAdjustment: "Ajustement",
    breakdownRunning: "Total cumul\u00e9",
    breakdownFmv: "Vente particulier (valeur marchande)",
    crossLoanText: "Utilise cette estimation comme ton ",
    crossLoanBold: "apport / reprise",
    crossLoanSuffix: " dans le calculateur de pr\u00eat auto.",
    crossLoanBtn: "Calculateur de pr\u00eat",
    bdBaseMsrp: "MSRP de base",
    bdAge: (n: number) => `\u00c2ge (${n} an${n !== 1 ? "s" : ""})`,
    bdAgeRetention: (pct: string) => `${pct}\u00a0% de r\u00e9tention`,
    bdBrand: (m: string) => `Marque (${m || "moyenne"})`,
    bdCondition: (label: string) => `\u00c9tat (${label})`,
    bdMileage: (m: string) => `Kilom\u00e9trage (${m} mi)`,
    bdTitle: (s: string) => `Titre (${s})`,
    bdAccidents: (n: number) => `Accidents (${n})`,
    bdOwners: (n: number) => `Propri\u00e9taires (${n})`,
    locale: "fr-FR",
    mileageSuffix: "mi",
  },
} as const;

interface Props {
  locale?: Locale;
}

export default function TradeInValueEstimator({ locale = "en" }: Props) {
  const t = COPY[locale];
  const CONDITIONS = locale === "es" ? CONDITIONS_ES : CONDITIONS_EN;
  const BODY_STYLES = locale === "es" ? BODY_STYLES_ES : BODY_STYLES_EN;

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

    const titleStatusLabel = (t.titleOptions as Record<string, string>)[titleStatus] ?? titleStatus;

    setResult({
      privateParty,
      dealerTradeIn,
      instantCashOffer,
      auctionValue,
      breakdown: [
        { label: t.bdBaseMsrp, effect: "—", amount: baseMsrp },
        { label: t.bdAge(yearsOld), effect: t.bdAgeRetention((ageRetention * 100).toFixed(0)), amount: Math.round(baseMsrp * ageRetention) },
        { label: t.bdBrand(make), effect: brandMult >= 1 ? `+${((brandMult - 1) * 100).toFixed(0)}%` : `${((brandMult - 1) * 100).toFixed(0)}%`, amount: Math.round(baseMsrp * ageRetention * brandMult) },
        { label: t.bdCondition(cond.label), effect: `${((cond.multiplier - 1) * 100).toFixed(0)}%`, amount: Math.round(afterCondition) },
        { label: t.bdMileage(miles.toLocaleString(t.locale)), effect: mileAdj >= 0 ? `+${(mileAdj * 100).toFixed(1)}%` : `${(mileAdj * 100).toFixed(1)}%`, amount: Math.round(afterMileage) },
        ...(titleAdj !== 0 ? [{ label: t.bdTitle(titleStatusLabel), effect: `${(titleAdj * 100).toFixed(0)}%`, amount: Math.round(afterTitle) }] : []),
        ...(accidentAdj !== 0 ? [{ label: t.bdAccidents(accidentCount), effect: `${(accidentAdj * 100).toFixed(0)}%`, amount: Math.round(afterAccidents) }] : []),
        ...(ownerAdj !== 0 ? [{ label: t.bdOwners(ownerCount), effect: `${(ownerAdj * 100).toFixed(0)}%`, amount: Math.round(fmv) }] : []),
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
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">{t.sectionVehicle}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Year */}
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">{t.year}</label>
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
              <label className="block text-[11px] text-slate-500 mb-1">{t.make}</label>
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">{t.selectPlaceholder}</option>
                {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            {/* Model */}
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">{t.model}</label>
              <input
                type="text"
                value={modelText}
                onChange={(e) => setModelText(e.target.value)}
                placeholder={t.modelPlaceholder}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            {/* Body Style */}
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">{t.bodyStyle}</label>
              <select
                value={bodyStyle}
                onChange={(e) => setBodyStyle(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">{t.selectPlaceholder}</option>
                {BODY_STYLES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Key figures */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">{t.sectionKeyFigures}</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">{t.mileage}</label>
              <input
                type="number" min="0" value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder={t.mileagePlaceholder}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1 flex items-center gap-1">
                {t.msrp}
                <span className="group relative">
                  <Info className="w-3 h-3 text-slate-400 cursor-help inline" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none z-10">
                    {t.msrpTooltip}
                  </span>
                </span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="number" min="0" value={msrp}
                  onChange={(e) => setMsrp(e.target.value)}
                  placeholder={t.msrpPlaceholder}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Condition */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">{t.sectionCondition}</p>
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
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">{t.sectionHistory}</p>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">{t.titleStatus}</label>
              <select
                value={titleStatus}
                onChange={(e) => setTitleStatus(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="clean">{t.titleOptions.clean}</option>
                <option value="salvage">{t.titleOptions.salvage}</option>
                <option value="rebuilt">{t.titleOptions.rebuilt}</option>
                <option value="flood">{t.titleOptions.flood}</option>
                <option value="lemon">{t.titleOptions.lemon}</option>
                <option value="hail">{t.titleOptions.hail}</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">{t.accidents}</label>
              <select
                value={accidents}
                onChange={(e) => setAccidents(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="0">{t.accidentOptions[0]}</option>
                <option value="1">{t.accidentOptions[1]}</option>
                <option value="2">{t.accidentOptions[2]}</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">{t.owners}</label>
              <select
                value={owners}
                onChange={(e) => setOwners(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="1">{t.ownerOptions[1]}</option>
                <option value="2">{t.ownerOptions[2]}</option>
                <option value="3">{t.ownerOptions[3]}</option>
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
            <Car className="w-4 h-4" /> {t.estimateBtn}
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-colors cursor-pointer"
            title={t.resetTitle}
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
              label={t.cardPrivate.label}
              value={fmt(result.privateParty)}
              sub={t.cardPrivate.sub}
              highlight
            />
            <ValueCard
              label={t.cardDealer.label}
              value={fmt(result.dealerTradeIn)}
              sub={t.cardDealer.sub}
            />
            <ValueCard
              label={t.cardInstant.label}
              value={fmt(result.instantCashOffer)}
              sub={t.cardInstant.sub}
            />
            <ValueCard
              label={t.cardAuction.label}
              value={fmt(result.auctionValue)}
              sub={t.cardAuction.sub}
              muted
            />
          </div>

          {/* Visual range bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">{t.valueRange}</p>
            <div className="relative h-8 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-slate-300 via-primary-400 to-primary-600 rounded-full"
                style={{ width: "100%" }}
              />
              {/* Markers */}
              {[
                { pct: 100, label: t.rangePrivate, val: result.privateParty },
                { pct: 82, label: t.rangeTradeIn, val: result.dealerTradeIn },
                { pct: 76, label: t.rangeInstant, val: result.instantCashOffer },
                { pct: 65, label: t.rangeAuction, val: result.auctionValue },
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
              <span>{t.rangeFootAuction(fmt(result.auctionValue))}</span>
              <span>{t.rangeFootPrivate(fmt(result.privateParty))}</span>
            </div>
          </div>

          {/* Tips based on result */}
          <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
            <div>
              <p className="font-bold text-emerald-900 mb-1">{t.tipsTitle}</p>
              <p>
                {t.tipsBody(
                  fmt(result.dealerTradeIn),
                  fmt(result.privateParty),
                  fmt(result.privateParty - result.dealerTradeIn),
                )}
              </p>
            </div>
          </div>

          {titleStatus !== "clean" && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <p>
                {t.titleAlert(
                  (t.titleOptions as Record<string, string>)[titleStatus] ?? titleStatus,
                  Math.abs(TITLE_ADJUSTMENTS[titleStatus] * 100).toFixed(0),
                )}
              </p>
            </div>
          )}

          {/* Breakdown accordion */}
          <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer text-sm font-bold text-slate-900 select-none list-none">
              {t.breakdownSummary}
              <ChevronDown className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="border-t border-slate-100 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">{t.breakdownFactor}</th>
                    <th className="text-left px-4 py-2 font-medium">{t.breakdownAdjustment}</th>
                    <th className="text-right px-4 py-2 font-medium">{t.breakdownRunning}</th>
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
                    <td className="px-4 py-2.5 font-bold text-slate-900">{t.breakdownFmv}</td>
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
              {t.crossLoanText}
              <strong className="text-slate-900">{t.crossLoanBold}</strong>
              {t.crossLoanSuffix}
            </p>
            <Link
              href={locale === "es" ? "/es/car-loan-calculator" : "/car-loan-calculator"}
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              {t.crossLoanBtn} <ArrowRight className="w-3.5 h-3.5" />
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
