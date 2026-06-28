"use client";

import { useState, useCallback } from "react";
import Link from "@/components/LocaleLink";
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
type Locale = "en" | "es" | "fr";

/* ─── Reference data ─────────────────────────────────────── */

interface StateRow {
  state: string;
  abbr: string;
  gasPrice: number;
  taxRate: number;
}

const STATE_DATA_BASE: { abbr: string; gasPrice: number; taxRate: number }[] = [
  { abbr: "US", gasPrice: 3.45, taxRate: 5.0 },
  { abbr: "AL", gasPrice: 3.05, taxRate: 2.0 },
  { abbr: "AK", gasPrice: 3.95, taxRate: 0 },
  { abbr: "AZ", gasPrice: 3.50, taxRate: 5.6 },
  { abbr: "AR", gasPrice: 3.00, taxRate: 6.5 },
  { abbr: "CA", gasPrice: 4.75, taxRate: 7.25 },
  { abbr: "CO", gasPrice: 3.35, taxRate: 2.9 },
  { abbr: "CT", gasPrice: 3.55, taxRate: 6.35 },
  { abbr: "DE", gasPrice: 3.20, taxRate: 0 },
  { abbr: "FL", gasPrice: 3.30, taxRate: 6.0 },
  { abbr: "GA", gasPrice: 3.10, taxRate: 6.6 },
  { abbr: "HI", gasPrice: 4.85, taxRate: 4.0 },
  { abbr: "ID", gasPrice: 3.40, taxRate: 6.0 },
  { abbr: "IL", gasPrice: 3.65, taxRate: 6.25 },
  { abbr: "IN", gasPrice: 3.20, taxRate: 7.0 },
  { abbr: "IA", gasPrice: 3.15, taxRate: 5.0 },
  { abbr: "KS", gasPrice: 3.10, taxRate: 6.5 },
  { abbr: "KY", gasPrice: 3.05, taxRate: 6.0 },
  { abbr: "LA", gasPrice: 3.00, taxRate: 4.45 },
  { abbr: "ME", gasPrice: 3.40, taxRate: 5.5 },
  { abbr: "MD", gasPrice: 3.45, taxRate: 6.0 },
  { abbr: "MA", gasPrice: 3.50, taxRate: 6.25 },
  { abbr: "MI", gasPrice: 3.30, taxRate: 6.0 },
  { abbr: "MN", gasPrice: 3.25, taxRate: 6.5 },
  { abbr: "MS", gasPrice: 3.00, taxRate: 5.0 },
  { abbr: "MO", gasPrice: 3.05, taxRate: 4.225 },
  { abbr: "MT", gasPrice: 3.45, taxRate: 0 },
  { abbr: "NE", gasPrice: 3.15, taxRate: 5.5 },
  { abbr: "NV", gasPrice: 3.90, taxRate: 6.85 },
  { abbr: "NH", gasPrice: 3.35, taxRate: 0 },
  { abbr: "NJ", gasPrice: 3.35, taxRate: 6.625 },
  { abbr: "NM", gasPrice: 3.20, taxRate: 4.0 },
  { abbr: "NY", gasPrice: 3.70, taxRate: 4.0 },
  { abbr: "NC", gasPrice: 3.15, taxRate: 3.0 },
  { abbr: "ND", gasPrice: 3.20, taxRate: 5.0 },
  { abbr: "OH", gasPrice: 3.25, taxRate: 5.75 },
  { abbr: "OK", gasPrice: 2.95, taxRate: 3.25 },
  { abbr: "OR", gasPrice: 3.85, taxRate: 0 },
  { abbr: "PA", gasPrice: 3.55, taxRate: 6.0 },
  { abbr: "RI", gasPrice: 3.50, taxRate: 7.0 },
  { abbr: "SC", gasPrice: 3.05, taxRate: 5.0 },
  { abbr: "SD", gasPrice: 3.15, taxRate: 4.0 },
  { abbr: "TN", gasPrice: 3.05, taxRate: 7.0 },
  { abbr: "TX", gasPrice: 3.00, taxRate: 6.25 },
  { abbr: "UT", gasPrice: 3.45, taxRate: 4.85 },
  { abbr: "VT", gasPrice: 3.45, taxRate: 6.0 },
  { abbr: "VA", gasPrice: 3.25, taxRate: 4.15 },
  { abbr: "WA", gasPrice: 4.00, taxRate: 6.5 },
  { abbr: "WV", gasPrice: 3.20, taxRate: 6.0 },
  { abbr: "WI", gasPrice: 3.25, taxRate: 5.0 },
  { abbr: "WY", gasPrice: 3.30, taxRate: 4.0 },
];

const STATE_NAMES_EN: Record<string, string> = {
  US: "National Average", AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas",
  CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida",
  GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

const STATE_NAMES_ES: Record<string, string> = {
  US: "Promedio nacional", AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas",
  CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida",
  GA: "Georgia", HI: "Hawái", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Luisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Míchigan", MN: "Minnesota", MS: "Misisipi", MO: "Misuri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "Nuevo Hampshire", NJ: "Nueva Jersey",
  NM: "Nuevo México", NY: "Nueva York", NC: "Carolina del Norte", ND: "Dakota del Norte", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregón", PA: "Pensilvania", RI: "Rhode Island", SC: "Carolina del Sur",
  SD: "Dakota del Sur", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "Virginia Occidental", WI: "Wisconsin", WY: "Wyoming",
};

const STATE_NAMES_FR: Record<string, string> = {
  US: "Moyenne nationale", AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas",
  CA: "Californie", CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Floride",
  GA: "G\u00e9orgie", HI: "Hawa\u00ef", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiane", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "Nouveau-Mexique", NY: "New York", NC: "Caroline du Nord", ND: "Dakota du Nord", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvanie", RI: "Rhode Island", SC: "Caroline du Sud",
  SD: "Dakota du Sud", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginie", WA: "Washington", WV: "Virginie-Occidentale", WI: "Wisconsin", WY: "Wyoming",
};

function getStateData(locale: Locale): StateRow[] {
  const names =
    locale === "es" ? STATE_NAMES_ES : locale === "fr" ? STATE_NAMES_FR : STATE_NAMES_EN;
  return STATE_DATA_BASE.map((s) => ({
    abbr: s.abbr,
    state: names[s.abbr] ?? s.abbr,
    gasPrice: s.gasPrice,
    taxRate: s.taxRate,
  }));
}

// Vehicle types with depreciation multiplier
const VEHICLE_TYPES = [
  { id: "Sedan", multiplier: 1.00 },
  { id: "SUV", multiplier: 1.02 },
  { id: "Truck", multiplier: 1.05 },
  { id: "EV", multiplier: 0.92 },
  { id: "Luxury", multiplier: 0.92 },
  { id: "Sports", multiplier: 0.95 },
  { id: "Minivan", multiplier: 0.95 },
] as const;

type VehicleTypeId = (typeof VEHICLE_TYPES)[number]["id"];

const VEHICLE_TYPE_LABELS_EN: Record<VehicleTypeId, string> = {
  Sedan: "Sedan",
  SUV: "SUV",
  Truck: "Truck",
  EV: "Electric (EV)",
  Luxury: "Luxury",
  Sports: "Sports",
  Minivan: "Minivan",
};

const VEHICLE_TYPE_LABELS_ES: Record<VehicleTypeId, string> = {
  Sedan: "Sedán",
  SUV: "SUV",
  Truck: "Camioneta",
  EV: "Eléctrico (EV)",
  Luxury: "Lujo",
  Sports: "Deportivo",
  Minivan: "Minivan",
};

const VEHICLE_TYPE_LABELS_FR: Record<VehicleTypeId, string> = {
  Sedan: "Berline",
  SUV: "SUV",
  Truck: "Camion / Pickup",
  EV: "\u00c9lectrique (EV)",
  Luxury: "Luxe",
  Sports: "Sport",
  Minivan: "Minivan",
};

// Retention curve (residual value as % of MSRP)
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
      return Math.min(interp * typeMultiplier, 1.0);
    }
  }
  return RETENTION_CURVE[10] * typeMultiplier;
}

const MAINTENANCE_BASE: Record<"Low" | "Average" | "High", number> = {
  Low: 500,
  Average: 800,
  High: 1400,
};

function repairCostForYear(yearIndex: number): number {
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

  const residualPct = retentionAt(years, typeMult);
  const residual = price * residualPct;
  const depreciationTotal = Math.max(price - residual, 0);

  const principal = Math.max(price - down, 0);
  const monthlyRate = apr / 100 / 12;
  const { rows: amort } = buildAmortization(principal, monthlyRate, termMonths);
  const monthsInPeriod = Math.min(years * 12, termMonths);
  let interestPaid = 0;
  for (let i = 0; i < monthsInPeriod; i++) {
    interestPaid += amort[i]?.interest ?? 0;
  }
  const oppCost = down * 0.05 * years;
  const financingTotal = interestPaid + oppCost;

  const totalMiles = annualMiles * years;
  const fuelTotal =
    inputs.type === "EV"
      ? (totalMiles / Math.max(mpg, 1)) * gasPrice * 0.35
      : (totalMiles / Math.max(mpg, 1)) * gasPrice;

  let insuranceTotal = 0;
  for (let y = 1; y <= years; y++) {
    insuranceTotal += insuranceAnnual * Math.pow(1.02, y - 1);
  }

  const maintBase = MAINTENANCE_BASE[inputs.maintenance];
  let maintenanceTotal = 0;
  for (let y = 1; y <= years; y++) {
    const ageMult = y > 5 ? 1.4 : 1.0;
    maintenanceTotal += maintBase * ageMult;
  }

  let repairsTotal = 0;
  for (let y = 1; y <= years; y++) {
    repairsTotal += repairCostForYear(y);
  }

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

  const yearByYear: YearRow[] = [];
  for (let y = 1; y <= years; y++) {
    const residualAtY = price * retentionAt(y, typeMult);
    const residualAtYminus1 = price * retentionAt(y - 1, typeMult);
    const depYear = Math.max(residualAtYminus1 - residualAtY, 0);

    let finYear = 0;
    const startMonth = (y - 1) * 12;
    const endMonth = Math.min(y * 12, termMonths);
    for (let m = startMonth; m < endMonth; m++) {
      finYear += amort[m]?.interest ?? 0;
    }
    finYear += down * 0.05;

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

/* ─── COPY ───────────────────────────────────────────────── */

const WIDGET_COPY = {
  en: {
    analysisSettings: "Analysis Settings",
    state: "State",
    setsGasAndTax: (g: string, t: string) => `Sets gas price ($${g}) & sales tax (${t}%)`,
    annualMiles: "Annual Miles Driven",
    yearsAnalysis: "Years of Analysis",
    years: (y: number) => `${y} years`,
    gasOverride: "Gas Price Override ($/gal)",
    taxOverride: "Sales Tax Override (%)",
    usingGasTax: (g: string, t: string) => ({ g, t, prefix: "Using ", mid: "/gal · ", suffix: " sales tax" }),
    vehicleA: "Vehicle A",
    vehicleB: "Vehicle B",
    hideB: "Hide Vehicle B comparison",
    showB: "Compare with another vehicle (optional)",
    calculate: "Calculate Total Cost of Ownership",
    reset: "Reset",
    makeModel: "Make / Model",
    makeModelPlaceholder: "e.g. 2024 Toyota Camry",
    vehicleType: "Vehicle Type",
    purchasePrice: "Purchase Price",
    downPayment: "Down Payment",
    aprLabel: "APR (%)",
    loanTerm: "Loan Term",
    months: (m: number) => `${m} months`,
    mpgCombined: "MPG (combined)",
    mpgeCombined: "MPGe (combined)",
    annualInsurance: "Annual Insurance",
    maintenanceLevel: "Maintenance Level",
    maintLow: "Low ($500/yr)",
    maintAverage: "Average ($800/yr)",
    maintHigh: "High ($1,400/yr)",
    tcoHeader: (y: number, name: string) => `${y}-Year Total Cost of Ownership · ${name}`,
    vehicleDefault: "Vehicle",
    perYearLine: (perYear: string, perMile: string, totalMiles: string) =>
      `That\u2019s ${perYear}/year · ${perMile}/mile driven · ${totalMiles} total miles`,
    perDay: "Per Day",
    perMonth: "Per Month",
    perMile: "Per Mile",
    costComposition: "Cost Composition",
    biggestCost: "is your biggest cost",
    biggestOf: (val: string, pct: string, years: number) => ` at ${val} (${pct}% of ${years}-year TCO).`,
    depreciationTip:
      " Depreciation is unavoidable but slows after year 3 — buying a 2-3 year old used vehicle dramatically reduces this cost.",
    fuelTip:
      " Switching to a hybrid or EV could cut fuel costs by 50–70% on the same annual mileage.",
    financingTip:
      " A larger down payment or a shorter loan term can sharply reduce interest paid.",
    evSavingsLead: "EV fuel savings:",
    evSavingsMid: (miles: string) => ` at ${miles} miles/year, this EV saves you roughly `,
    evSavingsSuffix: "/year",
    evSavingsTail:
      " on fuel vs. an equivalent gas vehicle, plus reduced maintenance from fewer moving parts.",
    costBreakdownByYear: "Cost Breakdown by Year",
    yearAnalysis: (y: number) => `${y}-year analysis`,
    category: "Category",
    year: "Year",
    yearTotal: "Year Total",
    total: "Total",
    perMo: "/mo",
    netWinner: "Net Winner",
    winnerSaves: (name: string, savings: string, years: number) =>
      `${name} saves you ${savings} over ${years} years`,
    winnerSub: (loser: string, perYear: string, perMonth: string) =>
      `vs. ${loser} · that\u2019s ${perYear}/year or ${perMonth}/month`,
    sideBySide: "Side-by-Side Comparison",
    costCategory: "Cost Category",
    difference: "Difference",
    yearTotalLabel: (y: number) => `${y}-Year Total`,
    breakEvenLead: "Break-even analysis:",
    breakEvenMid: (winner: string, priceDiff: string, months: number, years: string) =>
      ` ${winner} costs ${priceDiff} more upfront, but its lower running costs recoup the premium in `,
    breakEvenMonths: (m: number) => `${m} months`,
    breakEvenParen: (years: string) => ` (${years} years).`,
    breakEvenWithin: (y: number) =>
      ` Within your ${y}-year window — the higher-priced vehicle wins.`,
    breakEvenLonger: (y: number) =>
      ` Longer than your ${y}-year window — the cheaper vehicle wins on TCO.`,
    foundVehicle: "Found a vehicle?",
    verifyHistory: "Verify its history before you buy.",
    freeVinCheck: "Free VIN Check",
    costLabels: {
      depreciation: "Depreciation",
      financing: "Financing",
      fuel: "Fuel",
      insurance: "Insurance",
      maintenance: "Maintenance",
      repairs: "Repairs",
      taxesFees: "Taxes & Fees",
    },
    vinHref: "/vin-check",
  },
  es: {
    analysisSettings: "Configuración de análisis",
    state: "Estado",
    setsGasAndTax: (g: string, t: string) => `Define precio gasolina ($${g}) e impuesto sobre ventas (${t}%)`,
    annualMiles: "Millas anuales conducidas",
    yearsAnalysis: "Años de análisis",
    years: (y: number) => `${y} años`,
    gasOverride: "Anular precio de gasolina ($/gal)",
    taxOverride: "Anular impuesto sobre ventas (%)",
    usingGasTax: (g: string, t: string) => ({ g, t, prefix: "Usando ", mid: "/gal · ", suffix: " de impuesto sobre ventas" }),
    vehicleA: "Vehículo A",
    vehicleB: "Vehículo B",
    hideB: "Ocultar comparación con Vehículo B",
    showB: "Comparar con otro vehículo (opcional)",
    calculate: "Calcular costo total de propiedad",
    reset: "Restablecer",
    makeModel: "Marca / Modelo",
    makeModelPlaceholder: "p. ej. 2024 Toyota Camry",
    vehicleType: "Tipo de vehículo",
    purchasePrice: "Precio de compra",
    downPayment: "Enganche",
    aprLabel: "APR (%)",
    loanTerm: "Plazo del préstamo",
    months: (m: number) => `${m} meses`,
    mpgCombined: "MPG (combinado)",
    mpgeCombined: "MPGe (combinado)",
    annualInsurance: "Seguro anual",
    maintenanceLevel: "Nivel de mantenimiento",
    maintLow: "Bajo ($500/año)",
    maintAverage: "Promedio ($800/año)",
    maintHigh: "Alto ($1,400/año)",
    tcoHeader: (y: number, name: string) => `Costo total de propiedad a ${y} años · ${name}`,
    vehicleDefault: "Vehículo",
    perYearLine: (perYear: string, perMile: string, totalMiles: string) =>
      `Eso es ${perYear}/año · ${perMile}/milla conducida · ${totalMiles} millas totales`,
    perDay: "Por día",
    perMonth: "Por mes",
    perMile: "Por milla",
    costComposition: "Composición del costo",
    biggestCost: "es tu mayor costo",
    biggestOf: (val: string, pct: string, years: number) => ` con ${val} (${pct}% del TCO a ${years} años).`,
    depreciationTip:
      " La depreciación es inevitable pero se desacelera después del año 3 — comprar un vehículo usado de 2-3 años reduce drásticamente este costo.",
    fuelTip:
      " Cambiar a un híbrido o EV podría recortar los costos de combustible 50–70% con el mismo kilometraje anual.",
    financingTip:
      " Un enganche más grande o un plazo de préstamo más corto puede reducir bruscamente los intereses pagados.",
    evSavingsLead: "Ahorros de combustible del EV:",
    evSavingsMid: (miles: string) => ` con ${miles} millas/año, este EV te ahorra aproximadamente `,
    evSavingsSuffix: "/año",
    evSavingsTail:
      " en combustible vs. un vehículo de gasolina equivalente, además de mantenimiento reducido por menos partes móviles.",
    costBreakdownByYear: "Desglose de costos por año",
    yearAnalysis: (y: number) => `análisis a ${y} años`,
    category: "Categoría",
    year: "Año",
    yearTotal: "Total del año",
    total: "Total",
    perMo: "/mes",
    netWinner: "Ganador neto",
    winnerSaves: (name: string, savings: string, years: number) =>
      `${name} te ahorra ${savings} durante ${years} años`,
    winnerSub: (loser: string, perYear: string, perMonth: string) =>
      `vs. ${loser} · eso es ${perYear}/año o ${perMonth}/mes`,
    sideBySide: "Comparación lado a lado",
    costCategory: "Categoría de costo",
    difference: "Diferencia",
    yearTotalLabel: (y: number) => `Total a ${y} años`,
    breakEvenLead: "Análisis de punto de equilibrio:",
    breakEvenMid: (winner: string, priceDiff: string, months: number, years: string) =>
      ` ${winner} cuesta ${priceDiff} más por adelantado, pero sus costos operativos más bajos recuperan la prima en `,
    breakEvenMonths: (m: number) => `${m} meses`,
    breakEvenParen: (years: string) => ` (${years} años).`,
    breakEvenWithin: (y: number) =>
      ` Dentro de tu ventana de ${y} años — el vehículo de mayor precio gana.`,
    breakEvenLonger: (y: number) =>
      ` Más larga que tu ventana de ${y} años — el vehículo más barato gana en TCO.`,
    foundVehicle: "¿Encontraste un vehículo?",
    verifyHistory: "Verifica su historial antes de comprar.",
    freeVinCheck: "Verificación VIN gratis",
    costLabels: {
      depreciation: "Depreciación",
      financing: "Financiamiento",
      fuel: "Combustible",
      insurance: "Seguro",
      maintenance: "Mantenimiento",
      repairs: "Reparaciones",
      taxesFees: "Impuestos y tarifas",
    },
    vinHref: "/es/vin-check",
  },
  fr: {
    analysisSettings: "Param\u00e8tres d'analyse",
    state: "\u00c9tat",
    setsGasAndTax: (g: string, t: string) => `D\u00e9finit le prix de l'essence ($${g}) et la taxe de vente (${t}%)`,
    annualMiles: "Miles parcourus par an",
    yearsAnalysis: "Ann\u00e9es d'analyse",
    years: (y: number) => `${y} ans`,
    gasOverride: "Forcer le prix de l'essence ($/gal)",
    taxOverride: "Forcer la taxe de vente (%)",
    usingGasTax: (g: string, t: string) => ({ g, t, prefix: "Utilise ", mid: "/gal \u00b7 ", suffix: " de taxe de vente" }),
    vehicleA: "V\u00e9hicule A",
    vehicleB: "V\u00e9hicule B",
    hideB: "Masquer la comparaison avec V\u00e9hicule B",
    showB: "Comparer avec un autre v\u00e9hicule (optionnel)",
    calculate: "Calculer le co\u00fbt total de propri\u00e9t\u00e9",
    reset: "R\u00e9initialiser",
    makeModel: "Marque / Mod\u00e8le",
    makeModelPlaceholder: "ex. 2024 Toyota Camry",
    vehicleType: "Type de v\u00e9hicule",
    purchasePrice: "Prix d'achat",
    downPayment: "Apport",
    aprLabel: "TAEG (%)",
    loanTerm: "Dur\u00e9e du pr\u00eat",
    months: (m: number) => `${m} mois`,
    mpgCombined: "MPG (combin\u00e9)",
    mpgeCombined: "MPGe (combin\u00e9)",
    annualInsurance: "Assurance annuelle",
    maintenanceLevel: "Niveau d'entretien",
    maintLow: "Bas ($500/an)",
    maintAverage: "Moyen ($800/an)",
    maintHigh: "\u00c9lev\u00e9 ($1,400/an)",
    tcoHeader: (y: number, name: string) => `Co\u00fbt total de propri\u00e9t\u00e9 sur ${y} ans \u00b7 ${name}`,
    vehicleDefault: "V\u00e9hicule",
    perYearLine: (perYear: string, perMile: string, totalMiles: string) =>
      `Soit ${perYear}/an \u00b7 ${perMile}/mile parcouru \u00b7 ${totalMiles} miles au total`,
    perDay: "Par jour",
    perMonth: "Par mois",
    perMile: "Par mile",
    costComposition: "Composition du co\u00fbt",
    biggestCost: "est ton plus gros co\u00fbt",
    biggestOf: (val: string, pct: string, years: number) => ` \u00e0 ${val} (${pct}% du TCO sur ${years} ans).`,
    depreciationTip:
      " La d\u00e9pr\u00e9ciation est in\u00e9vitable mais ralentit apr\u00e8s la 3e ann\u00e9e \u2014 acheter un v\u00e9hicule d'occasion de 2-3 ans r\u00e9duit consid\u00e9rablement ce co\u00fbt.",
    fuelTip:
      " Passer \u00e0 un hybride ou \u00e0 un EV pourrait r\u00e9duire les co\u00fbts de carburant de 50 \u00e0 70 % pour le m\u00eame kilom\u00e9trage annuel.",
    financingTip:
      " Un apport plus important ou une dur\u00e9e de pr\u00eat plus courte peut r\u00e9duire fortement les int\u00e9r\u00eats pay\u00e9s.",
    evSavingsLead: "\u00c9conomies de carburant EV\u00a0:",
    evSavingsMid: (miles: string) => ` \u00e0 ${miles} miles/an, cet EV t'\u00e9conomise environ `,
    evSavingsSuffix: "/an",
    evSavingsTail:
      " sur le carburant vs. un v\u00e9hicule essence \u00e9quivalent, plus un entretien r\u00e9duit gr\u00e2ce \u00e0 moins de pi\u00e8ces mobiles.",
    costBreakdownByYear: "R\u00e9partition des co\u00fbts par ann\u00e9e",
    yearAnalysis: (y: number) => `analyse sur ${y} ans`,
    category: "Cat\u00e9gorie",
    year: "Ann\u00e9e",
    yearTotal: "Total de l'ann\u00e9e",
    total: "Total",
    perMo: "/mois",
    netWinner: "Gagnant net",
    winnerSaves: (name: string, savings: string, years: number) =>
      `${name} te fait \u00e9conomiser ${savings} sur ${years} ans`,
    winnerSub: (loser: string, perYear: string, perMonth: string) =>
      `vs. ${loser} \u00b7 soit ${perYear}/an ou ${perMonth}/mois`,
    sideBySide: "Comparaison c\u00f4te \u00e0 c\u00f4te",
    costCategory: "Cat\u00e9gorie de co\u00fbt",
    difference: "Diff\u00e9rence",
    yearTotalLabel: (y: number) => `Total sur ${y} ans`,
    breakEvenLead: "Analyse du seuil de rentabilit\u00e9\u00a0:",
    breakEvenMid: (winner: string, priceDiff: string, months: number, years: string) =>
      ` ${winner} co\u00fbte ${priceDiff} de plus au d\u00e9part, mais ses co\u00fbts de fonctionnement plus bas r\u00e9cup\u00e8rent la prime en `,
    breakEvenMonths: (m: number) => `${m} mois`,
    breakEvenParen: (years: string) => ` (${years} ans).`,
    breakEvenWithin: (y: number) =>
      ` Dans ta fen\u00eatre de ${y} ans \u2014 le v\u00e9hicule plus cher l'emporte.`,
    breakEvenLonger: (y: number) =>
      ` Plus long que ta fen\u00eatre de ${y} ans \u2014 le v\u00e9hicule moins cher l'emporte sur le TCO.`,
    foundVehicle: "Tu as trouv\u00e9 un v\u00e9hicule\u00a0?",
    verifyHistory: "V\u00e9rifie son historique avant d'acheter.",
    freeVinCheck: "V\u00e9rification VIN gratuite",
    costLabels: {
      depreciation: "D\u00e9pr\u00e9ciation",
      financing: "Financement",
      fuel: "Carburant",
      insurance: "Assurance",
      maintenance: "Entretien",
      repairs: "R\u00e9parations",
      taxesFees: "Taxes et frais",
    },
    vinHref: "/fr/vin-check",
  },
} as const;

/* ─── Color tokens for cost categories ───────────────────── */

interface CostCategory {
  key: keyof Pick<
    CostBreakdown,
    "depreciation" | "financing" | "fuel" | "insurance" | "maintenance" | "repairs" | "taxesFees"
  >;
  label: string;
  color: string;
  bg: string;
  text: string;
  icon: typeof Car;
}

function getCostCategories(locale: Locale): CostCategory[] {
  const L = WIDGET_COPY[locale].costLabels;
  return [
    { key: "depreciation", label: L.depreciation, color: "bg-rose-500", bg: "bg-rose-50", text: "text-rose-700", icon: TrendingDown },
    { key: "financing", label: L.financing, color: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700", icon: Percent },
    { key: "fuel", label: L.fuel, color: "bg-orange-500", bg: "bg-orange-50", text: "text-orange-700", icon: Fuel },
    { key: "insurance", label: L.insurance, color: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-700", icon: Shield },
    { key: "maintenance", label: L.maintenance, color: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", icon: Wrench },
    { key: "repairs", label: L.repairs, color: "bg-purple-500", bg: "bg-purple-50", text: "text-purple-700", icon: AlertTriangle },
    { key: "taxesFees", label: L.taxesFees, color: "bg-slate-500", bg: "bg-slate-50", text: "text-slate-700", icon: Receipt },
  ];
}

/* ─── Component ─────────────────────────────────────────── */

interface Props {
  locale?: Locale;
}

export default function TotalCostOfOwnership({ locale = "en" }: Props) {
  const C = WIDGET_COPY[locale];
  const STATE_DATA = getStateData(locale);
  const COST_CATEGORIES = getCostCategories(locale);
  const VEHICLE_TYPE_LABELS =
    locale === "es" ? VEHICLE_TYPE_LABELS_ES : locale === "fr" ? VEHICLE_TYPE_LABELS_FR : VEHICLE_TYPE_LABELS_EN;

  const [vehicleA, setVehicleA] = useState<VehicleInputs>({
    name: C.vehicleA,
    type: "Sedan",
    price: "32000",
    downPayment: "3000",
    apr: "6.5",
    termMonths: "60",
    mpg: "28",
    insurance: "1800",
    maintenance: "Average",
  });

  const [showB, setShowB] = useState(false);
  const [vehicleB, setVehicleB] = useState<VehicleInputs>({
    name: C.vehicleB,
    type: "EV",
    price: "42000",
    downPayment: "5000",
    apr: "6.5",
    termMonths: "60",
    mpg: "115",
    insurance: "2100",
    maintenance: "Low",
  });

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
      name: C.vehicleA,
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
      name: C.vehicleB,
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

  const usingLine = C.usingGasTax(gasPrice.toFixed(2), `${taxRate}%`);

  return (
    <div className="space-y-6">
      {/* Inputs Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7 space-y-7">
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
            {C.analysisSettings}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">{C.state}</label>
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
                {C.setsGasAndTax(stateRow.gasPrice.toFixed(2), stateRow.taxRate.toString())}
              </p>
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">
                {C.annualMiles}
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
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">{C.yearsAnalysis}</label>
              <select
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {[3, 5, 7, 10].map((y) => (
                  <option key={y} value={y}>
                    {C.years(y)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">
                {C.gasOverride}
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
                {C.taxOverride}
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
                {usingLine.prefix}<strong>${usingLine.g}{usingLine.mid}</strong>
                <strong>{usingLine.t}{usingLine.suffix}</strong>
              </p>
            </div>
          </div>
        </div>

        <VehicleInputCard
          title={C.vehicleA}
          inputs={vehicleA}
          onChange={setVehicleA}
          C={C}
          vehicleTypeLabels={VEHICLE_TYPE_LABELS}
        />

        <div>
          <button
            type="button"
            onClick={() => setShowB((p) => !p)}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 cursor-pointer"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showB ? "rotate-180" : ""}`}
            />
            {showB ? C.hideB : C.showB}
          </button>

          {showB && (
            <div className="mt-4">
              <VehicleInputCard
                title={C.vehicleB}
                inputs={vehicleB}
                onChange={setVehicleB}
                C={C}
                vehicleTypeLabels={VEHICLE_TYPE_LABELS}
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
            <Car className="w-4 h-4" /> {C.calculate}
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-colors cursor-pointer"
            title={C.reset}
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Results */}
      {resultsA && (
        <ResultsBlock
          inputs={vehicleA}
          results={resultsA}
          years={years}
          annualMiles={parseFloat(annualMiles.replace(/,/g, "")) || 12000}
          C={C}
          COST_CATEGORIES={COST_CATEGORIES}
        />
      )}

      {resultsA && resultsB && showB && (
        <>
          <ResultsBlock
            inputs={vehicleB}
            results={resultsB}
            years={years}
            annualMiles={parseFloat(annualMiles.replace(/,/g, "")) || 12000}
            C={C}
            COST_CATEGORIES={COST_CATEGORIES}
          />
          <ComparisonBlock
            a={vehicleA}
            b={vehicleB}
            ra={resultsA}
            rb={resultsB}
            years={years}
            C={C}
            COST_CATEGORIES={COST_CATEGORIES}
          />
        </>
      )}

      {resultsA && (
        <div className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <p className="text-sm text-slate-700">
            {C.foundVehicle} <strong className="text-slate-900">{C.verifyHistory}</strong>
          </p>
          <Link
            href={C.vinHref}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-colors"
          >
            {C.freeVinCheck} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

/* ─── Vehicle input card ────────────────────────────────── */

type WidgetCopy = (typeof WIDGET_COPY)[Locale];

function VehicleInputCard({
  title,
  inputs,
  onChange,
  C,
  vehicleTypeLabels,
}: {
  title: string;
  inputs: VehicleInputs;
  onChange: (v: VehicleInputs) => void;
  C: WidgetCopy;
  vehicleTypeLabels: Record<VehicleTypeId, string>;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
      <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-4">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field
          id={`${title}-name`}
          label={C.makeModel}
          icon={<Car className="w-4 h-4 text-slate-400" />}
          value={inputs.name}
          onChange={(v) => onChange({ ...inputs, name: v })}
          type="text"
          placeholder={C.makeModelPlaceholder}
        />
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            {C.vehicleType}
          </label>
          <select
            value={inputs.type}
            onChange={(e) => onChange({ ...inputs, type: e.target.value as VehicleTypeId })}
            className="w-full px-3 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {VEHICLE_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {vehicleTypeLabels[t.id]}
              </option>
            ))}
          </select>
        </div>
        <Field
          id={`${title}-price`}
          label={C.purchasePrice}
          icon={<DollarSign className="w-4 h-4 text-slate-400" />}
          value={inputs.price}
          onChange={(v) => onChange({ ...inputs, price: v })}
          type="number"
          min="0"
          placeholder="32,000"
        />
        <Field
          id={`${title}-down`}
          label={C.downPayment}
          icon={<DollarSign className="w-4 h-4 text-slate-400" />}
          value={inputs.downPayment}
          onChange={(v) => onChange({ ...inputs, downPayment: v })}
          type="number"
          min="0"
          placeholder="3,000"
        />
        <Field
          id={`${title}-apr`}
          label={C.aprLabel}
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
            {C.loanTerm}
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
                  {C.months(t)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Field
          id={`${title}-mpg`}
          label={inputs.type === "EV" ? C.mpgeCombined : C.mpgCombined}
          icon={<Fuel className="w-4 h-4 text-slate-400" />}
          value={inputs.mpg}
          onChange={(v) => onChange({ ...inputs, mpg: v })}
          type="number"
          min="1"
          placeholder="28"
        />
        <Field
          id={`${title}-insurance`}
          label={C.annualInsurance}
          icon={<Shield className="w-4 h-4 text-slate-400" />}
          value={inputs.insurance}
          onChange={(v) => onChange({ ...inputs, insurance: v })}
          type="number"
          min="0"
          placeholder="1,800"
        />
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            {C.maintenanceLevel}
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
              <option value="Low">{C.maintLow}</option>
              <option value="Average">{C.maintAverage}</option>
              <option value="High">{C.maintHigh}</option>
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
  C,
  COST_CATEGORIES,
}: {
  inputs: VehicleInputs;
  results: CostBreakdown;
  years: number;
  annualMiles: number;
  C: WidgetCopy;
  COST_CATEGORIES: CostCategory[];
}) {
  const biggest = COST_CATEGORIES.reduce((max, cat) =>
    results[cat.key] > results[max.key] ? cat : max
  );

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 sm:p-8 text-white">
        <p className="text-xs font-bold uppercase tracking-wide text-primary-200 mb-2">
          {C.tcoHeader(years, inputs.name || C.vehicleDefault)}
        </p>
        <p className="text-5xl sm:text-6xl font-bold tracking-tight">{fmt0(results.total)}</p>
        <p className="mt-2 text-sm text-primary-100">
          {C.perYearLine(
            fmt0(results.perYear),
            fmt2(results.perMile),
            (annualMiles * years).toLocaleString()
          )}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Pill label={C.perDay} value={fmt2(results.perDay)} />
        <Pill label={C.perMonth} value={fmt0(results.perMonth)} />
        <Pill label={C.perMile} value={fmt2(results.perMile)} />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">
          {C.costComposition}
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

      <div className={`flex items-start gap-3 p-4 rounded-xl border ${biggest.bg} border-slate-200`}>
        <biggest.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${biggest.text}`} />
        <p className="text-sm text-slate-700">
          <strong className="text-slate-900">
            {biggest.label} {C.biggestCost}
          </strong>
          {C.biggestOf(
            fmt0(results[biggest.key]),
            ((results[biggest.key] / results.total) * 100).toFixed(1),
            years
          )}
          {biggest.key === "depreciation" && C.depreciationTip}
          {biggest.key === "fuel" && C.fuelTip}
          {biggest.key === "financing" && C.financingTip}
        </p>
      </div>

      {inputs.type === "EV" && (
        <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800">
          <Zap className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
          <p>
            <strong>{C.evSavingsLead}</strong>
            {C.evSavingsMid(annualMiles.toLocaleString())}
            <strong>
              {fmt0(
                (annualMiles / Math.max(parseFloat(inputs.mpg) || 100, 1)) *
                  3.45 *
                  0.65
              )}
              {C.evSavingsSuffix}
            </strong>
            {C.evSavingsTail}
          </p>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">{C.costBreakdownByYear}</h3>
          <span className="text-xs text-slate-500">{C.yearAnalysis(years)}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs">
              <tr>
                <th className="text-left px-4 py-2.5 font-medium">{C.category}</th>
                {results.yearByYear.map((yr) => (
                  <th key={yr.year} className="text-right px-4 py-2.5 font-medium">
                    {C.year} {yr.year}
                  </th>
                ))}
                <th className="text-right px-4 py-2.5 font-medium bg-primary-50 text-primary-700">
                  {C.total}
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
                <td className="px-4 py-3 text-slate-900">{C.yearTotal}</td>
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {results.yearByYear.map((yr) => (
          <div
            key={yr.year}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1">
              {C.year} {yr.year}
            </p>
            <p className="text-lg font-bold text-slate-900">{fmt0(yr.total)}</p>
            <p className="text-[10px] text-slate-400 mt-1">
              {fmt0(yr.total / 12)}{C.perMo}
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
  C,
  COST_CATEGORIES,
}: {
  a: VehicleInputs;
  b: VehicleInputs;
  ra: CostBreakdown;
  rb: CostBreakdown;
  years: number;
  C: WidgetCopy;
  COST_CATEGORIES: CostCategory[];
}) {
  const winner = ra.total <= rb.total ? "A" : "B";
  const savings = Math.abs(ra.total - rb.total);
  const winnerName =
    winner === "A" ? a.name || C.vehicleA : b.name || C.vehicleB;
  const loserName = winner === "A" ? b.name || C.vehicleB : a.name || C.vehicleA;

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
      <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 sm:p-8 text-white">
        <div className="flex items-start gap-3">
          <Award className="w-7 h-7 flex-shrink-0 mt-1 text-emerald-200" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-200 mb-1">
              {C.netWinner}
            </p>
            <p className="text-2xl sm:text-3xl font-bold">
              {C.winnerSaves(winnerName, fmt0(savings), years)}
            </p>
            <p className="mt-2 text-sm text-emerald-100">
              {C.winnerSub(loserName, fmt0(savings / years), fmt0(savings / (years * 12)))}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">{C.sideBySide}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs">
              <tr>
                <th className="text-left px-4 py-2.5 font-medium">{C.costCategory}</th>
                <th className="text-right px-4 py-2.5 font-medium">{a.name || C.vehicleA}</th>
                <th className="text-right px-4 py-2.5 font-medium">{b.name || C.vehicleB}</th>
                <th className="text-right px-4 py-2.5 font-medium">{C.difference}</th>
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
                <td className="px-4 py-3 text-slate-900">{C.yearTotalLabel(years)}</td>
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

      {breakEvenMonths !== null && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
          <p>
            <strong>{C.breakEvenLead}</strong>
            {C.breakEvenMid(winnerName, fmt0(priceDiff), breakEvenMonths, (breakEvenMonths / 12).toFixed(1))}
            <strong>{C.breakEvenMonths(breakEvenMonths)}</strong>
            {C.breakEvenParen((breakEvenMonths / 12).toFixed(1))}
            {breakEvenMonths <= years * 12
              ? C.breakEvenWithin(years)
              : C.breakEvenLonger(years)}
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
