"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  Percent,
  Calendar,
  RefreshCcw,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Info,
} from "lucide-react";

interface Results {
  maxCarPrice: number;
  maxMonthlyPayment: number;
  monthlyIncome: number;
  totalMonthlyObligations: number;
  remainingForCar: number;
  debtToIncomeRatio: number;
  ruleResult: "comfortable" | "stretched" | "over";
  breakdown: {
    label: string;
    amount: number;
    color: string;
  }[];
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
function fmtD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

const COPY = {
  en: {
    incomeLabel: "Your Income",
    annual: "Annual (yearly)",
    monthly: "Monthly",
    debtsLabel: "Existing Monthly Debt Payments",
    rentMortgage: "Rent / Mortgage",
    creditCards: "Credit Cards",
    studentLoans: "Student Loans",
    otherDebts: "Other Debts",
    vehicleCostsLabel: "Estimated Monthly Vehicle Costs",
    autoInsurance: "Auto Insurance",
    insHint: "US avg ~$150/mo",
    fuelCharging: "Fuel / Charging",
    fuelHint: "US avg ~$200/mo",
    loanParams: "Loan Parameters",
    apr: "APR (%)",
    loanTerm: "Loan Term",
    months: "months",
    downPayment: "Down Payment ($)",
    tradeIn: "Trade-In Value ($)",
    budgetRule: "Budget Rule",
    budgetRuleTip: "The rule determines what percentage of gross monthly income can go to vehicle costs.",
    methods: [
      { id: "20/4/10", label: "20/4/10", sub: "10% of income" },
      { id: "15pct", label: "15% Rule", sub: "15% of income" },
      { id: "custom", label: "Custom %", sub: "set your own" },
    ],
    calculate: "Calculate My Car Budget",
    reset: "Reset",
    withinBudget: "✓ Within Budget",
    stretched: "⚠ Slightly Stretched",
    overLimit: "✗ Over Recommended Limit",
    maxPriceSub: "Maximum recommended vehicle price based on your income and debts",
    metricMaxPayment: "Max Monthly Payment",
    metricGrossIncome: "Gross Monthly Income",
    metricDti: "Debt-to-Income Ratio",
    dtiHigh: "Above 43% — risky",
    dtiMid: "36–43% — stretched",
    dtiLow: "Below 36% — healthy",
    breakdownTitle: "Monthly Budget Breakdown",
    breakdownRent: "Rent / Mortgage",
    breakdownCC: "Credit Cards",
    breakdownSL: "Student Loans",
    breakdownOther: "Other Debts",
    breakdownCar: "Car Payment (max)",
    breakdownIns: "Insurance + Fuel",
    breakdownRemaining: "Remaining",
    breakdownAvailable: "Available after all obligations",
    overTitle: "Your debt-to-income ratio exceeds lender limits",
    stretchedTitle: "You're approaching the recommended debt ceiling",
    dtiWarnPre: "Most lenders cap total monthly debt (including the new car payment) at ",
    dtiWarnBold: "43% of gross income",
    dtiWarnSuffix: ". Consider a larger down payment, shorter loan term, or paying down existing debt before financing a vehicle.",
    ctaText: "Found your price range? ",
    ctaTextBold: "Calculate the exact monthly payment.",
    ctaButton: "Loan Calculator",
    howCalculated: "How was this calculated?",
    step1: "Step 1 — Monthly income:",
    step2: (pct: string) => `Step 2 — Max vehicle cost (${pct} of income):`,
    step3: "Step 3 — Subtract insurance + fuel:",
    step4: "Step 4 — Max loan payment:",
    step5: "Step 5 — Reverse loan formula → max principal:",
    step6: "Step 6 — Add down payment + trade-in:",
    stepFinal: "= Max vehicle price:",
  },
  es: {
    incomeLabel: "Tus ingresos",
    annual: "Anual",
    monthly: "Mensual",
    debtsLabel: "Pagos mensuales de deudas existentes",
    rentMortgage: "Renta / Hipoteca",
    creditCards: "Tarjetas de crédito",
    studentLoans: "Préstamos estudiantiles",
    otherDebts: "Otras deudas",
    vehicleCostsLabel: "Costos mensuales estimados del vehículo",
    autoInsurance: "Seguro de auto",
    insHint: "Promedio EE. UU. ~$150/mes",
    fuelCharging: "Combustible / Carga",
    fuelHint: "Promedio EE. UU. ~$200/mes",
    loanParams: "Parámetros del préstamo",
    apr: "APR (%)",
    loanTerm: "Plazo del préstamo",
    months: "meses",
    downPayment: "Pago inicial ($)",
    tradeIn: "Valor de trade-in ($)",
    budgetRule: "Regla de presupuesto",
    budgetRuleTip: "La regla determina qué porcentaje de tus ingresos brutos mensuales puede ir a costos del vehículo.",
    methods: [
      { id: "20/4/10", label: "20/4/10", sub: "10% de ingresos" },
      { id: "15pct", label: "Regla 15%", sub: "15% de ingresos" },
      { id: "custom", label: "% personalizado", sub: "establece el tuyo" },
    ],
    calculate: "Calcular mi presupuesto de auto",
    reset: "Reiniciar",
    withinBudget: "✓ Dentro del presupuesto",
    stretched: "⚠ Ligeramente apretado",
    overLimit: "✗ Sobre el límite recomendado",
    maxPriceSub: "Precio máximo recomendado del vehículo según tus ingresos y deudas",
    metricMaxPayment: "Pago mensual máximo",
    metricGrossIncome: "Ingreso bruto mensual",
    metricDti: "Ratio deuda-a-ingresos",
    dtiHigh: "Sobre 43% — riesgoso",
    dtiMid: "36–43% — apretado",
    dtiLow: "Bajo 36% — saludable",
    breakdownTitle: "Desglose del presupuesto mensual",
    breakdownRent: "Renta / Hipoteca",
    breakdownCC: "Tarjetas de crédito",
    breakdownSL: "Préstamos estudiantiles",
    breakdownOther: "Otras deudas",
    breakdownCar: "Pago de auto (máx)",
    breakdownIns: "Seguro + Combustible",
    breakdownRemaining: "Restante",
    breakdownAvailable: "Disponible después de todas las obligaciones",
    overTitle: "Tu ratio deuda-a-ingresos excede los límites del prestamista",
    stretchedTitle: "Te estás acercando al techo de deuda recomendado",
    dtiWarnPre: "La mayoría de los prestamistas limitan la deuda mensual total (incluyendo el nuevo pago de auto) a ",
    dtiWarnBold: "43% del ingreso bruto",
    dtiWarnSuffix: ". Considera un pago inicial mayor, un plazo más corto, o pagar deuda existente antes de financiar un vehículo.",
    ctaText: "¿Encontraste tu rango de precio? ",
    ctaTextBold: "Calcula el pago mensual exacto.",
    ctaButton: "Calculadora de préstamo",
    howCalculated: "¿Cómo se calculó esto?",
    step1: "Paso 1 — Ingreso mensual:",
    step2: (pct: string) => `Paso 2 — Costo máximo del vehículo (${pct} del ingreso):`,
    step3: "Paso 3 — Restar seguro + combustible:",
    step4: "Paso 4 — Pago máximo del préstamo:",
    step5: "Paso 5 — Fórmula inversa del préstamo → principal máximo:",
    step6: "Paso 6 — Sumar pago inicial + trade-in:",
    stepFinal: "= Precio máximo del vehículo:",
  },
  fr: {
    incomeLabel: "Tes revenus",
    annual: "Annuel",
    monthly: "Mensuel",
    debtsLabel: "Paiements mensuels de dettes existantes",
    rentMortgage: "Loyer / Hypothèque",
    creditCards: "Cartes de crédit",
    studentLoans: "Prêts étudiants",
    otherDebts: "Autres dettes",
    vehicleCostsLabel: "Coûts mensuels estimés du véhicule",
    autoInsurance: "Assurance auto",
    insHint: "Moyenne US ~$150/mois",
    fuelCharging: "Carburant / Recharge",
    fuelHint: "Moyenne US ~$200/mois",
    loanParams: "Paramètres du prêt",
    apr: "APR (%)",
    loanTerm: "Durée du prêt",
    months: "mois",
    downPayment: "Acompte ($)",
    tradeIn: "Valeur de reprise ($)",
    budgetRule: "Règle budgétaire",
    budgetRuleTip: "La règle détermine quel pourcentage du revenu brut mensuel peut être consacré aux coûts du véhicule.",
    methods: [
      { id: "20/4/10", label: "20/4/10", sub: "10% des revenus" },
      { id: "15pct", label: "Règle 15%", sub: "15% des revenus" },
      { id: "custom", label: "% personnalisé", sub: "définis le tien" },
    ],
    calculate: "Calculer mon budget auto",
    reset: "Réinitialiser",
    withinBudget: "✓ Dans le budget",
    stretched: "⚠ Légèrement serré",
    overLimit: "✗ Au-dessus de la limite recommandée",
    maxPriceSub: "Prix maximum recommandé du véhicule selon tes revenus et tes dettes",
    metricMaxPayment: "Paiement mensuel max",
    metricGrossIncome: "Revenu brut mensuel",
    metricDti: "Ratio dette/revenu",
    dtiHigh: "Au-dessus de 43% — risqué",
    dtiMid: "36–43% — serré",
    dtiLow: "Sous 36% — sain",
    breakdownTitle: "Répartition du budget mensuel",
    breakdownRent: "Loyer / Hypothèque",
    breakdownCC: "Cartes de crédit",
    breakdownSL: "Prêts étudiants",
    breakdownOther: "Autres dettes",
    breakdownCar: "Paiement auto (max)",
    breakdownIns: "Assurance + Carburant",
    breakdownRemaining: "Reste",
    breakdownAvailable: "Disponible après toutes les obligations",
    overTitle: "Ton ratio dette/revenu dépasse les limites des prêteurs",
    stretchedTitle: "Tu approches du plafond d'endettement recommandé",
    dtiWarnPre: "La plupart des prêteurs plafonnent la dette mensuelle totale (incluant le nouveau paiement auto) à ",
    dtiWarnBold: "43% du revenu brut",
    dtiWarnSuffix: ". Envisage un acompte plus important, une durée de prêt plus courte ou de rembourser la dette existante avant de financer un véhicule.",
    ctaText: "Tu as trouvé ta fourchette de prix ? ",
    ctaTextBold: "Calcule le paiement mensuel exact.",
    ctaButton: "Calculatrice de prêt",
    howCalculated: "Comment cela a-t-il été calculé ?",
    step1: "Étape 1 — Revenu mensuel :",
    step2: (pct: string) => `Étape 2 — Coût max du véhicule (${pct} du revenu) :`,
    step3: "Étape 3 — Soustraire assurance + carburant :",
    step4: "Étape 4 — Paiement max du prêt :",
    step5: "Étape 5 — Formule inverse du prêt → capital max :",
    step6: "Étape 6 — Ajouter acompte + reprise :",
    stepFinal: "= Prix max du véhicule :",
  },
} as const;

// Reverse the loan formula to find max principal from max payment
function maxPrincipal(monthlyPayment: number, annualRate: number, months: number): number {
  if (annualRate === 0) return monthlyPayment * months;
  const r = annualRate / 100 / 12;
  return monthlyPayment * ((Math.pow(1 + r, months) - 1) / (r * Math.pow(1 + r, months)));
}

const TERM_OPTIONS = [24, 36, 48, 60, 72, 84];

export default function CarAffordabilityCalculator({ locale = "en" }: { locale?: "en" | "es" | "fr" } = {}) {
  const t = COPY[locale];
  // Income
  const [incomeType, setIncomeType] = useState<"monthly" | "annual">("annual");
  const [income, setIncome] = useState("75000");

  // Existing monthly debts
  const [rentMortgage, setRentMortgage] = useState("1200");
  const [creditCards, setCreditCards] = useState("150");
  const [studentLoans, setStudentLoans] = useState("0");
  const [otherDebts, setOtherDebts] = useState("0");

  // Loan params
  const [apr, setApr] = useState("7.0");
  const [term, setTerm] = useState(60);
  const [downPayment, setDownPayment] = useState("3000");
  const [tradeIn, setTradeIn] = useState("0");

  // Monthly expenses (non-debt)
  const [insurance, setInsurance] = useState("150");
  const [fuel, setFuel] = useState("200");

  // Budget method
  const [method, setMethod] = useState<"20/4/10" | "15pct" | "custom">("20/4/10");
  const [customPct, setCustomPct] = useState("15");

  const [results, setResults] = useState<Results | null>(null);

  function calculate() {
    const grossMonthly =
      incomeType === "annual"
        ? (parseFloat(income) || 0) / 12
        : parseFloat(income) || 0;

    const rent = parseFloat(rentMortgage) || 0;
    const cc = parseFloat(creditCards) || 0;
    const sl = parseFloat(studentLoans) || 0;
    const other = parseFloat(otherDebts) || 0;
    const ins = parseFloat(insurance) || 0;
    const gas = parseFloat(fuel) || 0;
    const down = parseFloat(downPayment) || 0;
    const trade = parseFloat(tradeIn) || 0;
    const annualRate = parseFloat(apr) || 0;

    // Existing obligations (not counting a new car payment)
    const existingDebt = rent + cc + sl + other;

    // Max payment based on chosen method
    let maxPaymentPct: number;
    if (method === "20/4/10") {
      maxPaymentPct = 10; // total vehicle costs ≤10% of gross
    } else if (method === "15pct") {
      maxPaymentPct = 15;
    } else {
      maxPaymentPct = parseFloat(customPct) || 15;
    }

    // Max monthly vehicle costs (payment + insurance + fuel)
    const maxTotalVehicleCost = grossMonthly * (maxPaymentPct / 100);
    // Subtract recurring vehicle running costs to get pure loan payment budget
    const maxLoanPayment = Math.max(maxTotalVehicleCost - ins - gas, 0);

    // Also check DTI (back-end ≤ 43% recommended)
    const dtiCapPayment = Math.max(grossMonthly * 0.43 - existingDebt, 0);
    const effectiveMaxPayment = Math.min(maxLoanPayment, dtiCapPayment);

    // Reverse-engineer max loan principal from payment
    const principal = maxPrincipal(effectiveMaxPayment, annualRate, term);
    // Add down payment + trade-in to get total vehicle budget
    const maxCarPrice = principal + down + trade;

    const dti = ((existingDebt + effectiveMaxPayment) / grossMonthly) * 100;

    let ruleResult: Results["ruleResult"] = "comfortable";
    if (dti > 43) ruleResult = "over";
    else if (dti > 36) ruleResult = "stretched";

    const totalMonthlyObligations = existingDebt + effectiveMaxPayment + ins + gas;

    setResults({
      maxCarPrice: Math.max(maxCarPrice, 0),
      maxMonthlyPayment: Math.max(effectiveMaxPayment, 0),
      monthlyIncome: grossMonthly,
      totalMonthlyObligations,
      remainingForCar: Math.max(effectiveMaxPayment, 0),
      debtToIncomeRatio: Math.min(dti, 100),
      ruleResult,
      breakdown: [
        { label: t.breakdownRent, amount: rent, color: "bg-slate-400" },
        { label: t.breakdownCC, amount: cc, color: "bg-amber-400" },
        { label: t.breakdownSL, amount: sl, color: "bg-orange-400" },
        { label: t.breakdownOther, amount: other, color: "bg-red-400" },
        { label: t.breakdownCar, amount: Math.max(effectiveMaxPayment, 0), color: "bg-primary-500" },
        { label: t.breakdownIns, amount: ins + gas, color: "bg-primary-300" },
      ].filter((b) => b.amount > 0),
    });
  }

  function reset() {
    setIncome("75000"); setIncomeType("annual");
    setRentMortgage("1200"); setCreditCards("150");
    setStudentLoans("0"); setOtherDebts("0");
    setApr("7.0"); setTerm(60);
    setDownPayment("3000"); setTradeIn("0");
    setInsurance("150"); setFuel("200");
    setMethod("20/4/10"); setCustomPct("15");
    setResults(null);
  }

  const ruleColor = results
    ? results.ruleResult === "comfortable"
      ? "emerald"
      : results.ruleResult === "stretched"
      ? "amber"
      : "red"
    : "slate";

  const RuleIcon =
    results?.ruleResult === "comfortable"
      ? CheckCircle2
      : results?.ruleResult === "stretched"
      ? AlertTriangle
      : XCircle;

  return (
    <div className="space-y-6">
      {/* ── Inputs ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7 space-y-6">

        {/* Income */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
            {t.incomeLabel}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-3">
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="number"
                min="0"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="75,000"
                className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select
              value={incomeType}
              onChange={(e) => setIncomeType(e.target.value as "monthly" | "annual")}
              className="px-3 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="annual">{t.annual}</option>
              <option value="monthly">{t.monthly}</option>
            </select>
          </div>
        </div>

        {/* Existing monthly debts */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
            {t.debtsLabel}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <InputField label={t.rentMortgage} value={rentMortgage} onChange={setRentMortgage} />
            <InputField label={t.creditCards} value={creditCards} onChange={setCreditCards} />
            <InputField label={t.studentLoans} value={studentLoans} onChange={setStudentLoans} />
            <InputField label={t.otherDebts} value={otherDebts} onChange={setOtherDebts} />
          </div>
        </div>

        {/* Vehicle running costs */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
            {t.vehicleCostsLabel}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <InputField label={t.autoInsurance} value={insurance} onChange={setInsurance} hint={t.insHint} />
            <InputField label={t.fuelCharging} value={fuel} onChange={setFuel} hint={t.fuelHint} />
          </div>
        </div>

        {/* Loan params */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
            {t.loanParams}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">{t.apr}</label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="number" min="0" step="0.1" value={apr}
                  onChange={(e) => setApr(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">{t.loanTerm}</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <select
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {TERM_OPTIONS.map((termOpt) => (
                    <option key={termOpt} value={termOpt}>{termOpt} {t.months}</option>
                  ))}
                </select>
              </div>
            </div>
            <InputField label={t.downPayment} value={downPayment} onChange={setDownPayment} />
            <InputField label={t.tradeIn} value={tradeIn} onChange={setTradeIn} />
          </div>
        </div>

        {/* Budget rule */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            {t.budgetRule}
            <span className="group relative inline-flex">
              <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-56 p-2 bg-slate-800 text-white text-[11px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                {t.budgetRuleTip}
              </span>
            </span>
          </p>
          <div className="grid grid-cols-3 gap-2">
            {t.methods.map(({ id, label, sub }) => (
              <button
                key={id}
                type="button"
                onClick={() => setMethod(id as "20/4/10" | "15pct" | "custom")}
                className={`px-3 py-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                  method === (id as string)
                    ? "bg-primary-50 border-primary-400 text-primary-700"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <p className="text-xs font-bold">{label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{sub}</p>
              </button>
            ))}
          </div>
          {method === "custom" && (
            <div className="mt-2 relative w-40">
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="number" min="1" max="50" step="1" value={customPct}
                onChange={(e) => setCustomPct(e.target.value)}
                placeholder="15"
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
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
            {t.calculate}
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

          {/* Main result */}
          <div className={`rounded-2xl border-2 p-6 border-${ruleColor}-200 bg-${ruleColor}-50`}>
            <div className="flex items-start gap-3">
              <RuleIcon className={`w-6 h-6 text-${ruleColor}-600 flex-shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold uppercase tracking-wide text-${ruleColor}-700 mb-1`}>
                  {results.ruleResult === "comfortable"
                    ? t.withinBudget
                    : results.ruleResult === "stretched"
                    ? t.stretched
                    : t.overLimit}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {fmt(results.maxCarPrice)}
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  {t.maxPriceSub}
                </p>
              </div>
            </div>
          </div>

          {/* Key metrics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Metric label={t.metricMaxPayment} value={fmtD(results.maxMonthlyPayment)} />
            <Metric label={t.metricGrossIncome} value={fmt(results.monthlyIncome)} />
            <Metric
              label={t.metricDti}
              value={`${results.debtToIncomeRatio.toFixed(1)}%`}
              sub={results.debtToIncomeRatio > 43 ? t.dtiHigh : results.debtToIncomeRatio > 36 ? t.dtiMid : t.dtiLow}
              warn={results.debtToIncomeRatio > 36}
            />
          </div>

          {/* Monthly budget bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-4">
              {t.breakdownTitle}
            </p>
            <div className="flex rounded-full overflow-hidden h-4 mb-3">
              {results.breakdown.map((b) => {
                const pct = (b.amount / results.monthlyIncome) * 100;
                return (
                  <div
                    key={b.label}
                    className={b.color}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                    title={`${b.label}: ${fmtD(b.amount)}`}
                  />
                );
              })}
              {/* Remaining */}
              <div className="flex-1 bg-slate-100" title={t.breakdownAvailable} />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate-600">
              {results.breakdown.map((b) => (
                <span key={b.label} className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-sm inline-block ${b.color}`} />
                  {b.label} — <strong>{fmtD(b.amount)}</strong>
                </span>
              ))}
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm inline-block bg-slate-100 border border-slate-300" />
                {t.breakdownRemaining} — <strong>{fmt(Math.max(results.monthlyIncome - results.totalMonthlyObligations, 0))}</strong>
              </span>
            </div>
          </div>

          {/* DTI explanation */}
          {results.ruleResult !== "comfortable" && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <div>
                <p className="font-bold text-amber-900 mb-1">
                  {results.ruleResult === "over"
                    ? t.overTitle
                    : t.stretchedTitle}
                </p>
                <p>
                  {t.dtiWarnPre}
                  <strong>{t.dtiWarnBold}</strong>
                  {t.dtiWarnSuffix}
                </p>
              </div>
            </div>
          )}

          {/* CTA to loan calculator */}
          <div className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-sm text-slate-700">
              {t.ctaText}
              <span className="font-semibold text-slate-900">{t.ctaTextBold}</span>
            </p>
            <Link
              href={locale === "es" ? "/es/car-loan-calculator" : "/car-loan-calculator"}
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              {t.ctaButton} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Dropdown summary */}
          <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer text-sm font-bold text-slate-900 select-none list-none">
              {t.howCalculated}
              <ChevronDown className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed space-y-2 border-t border-slate-100 pt-4">
              <p><strong>{t.step1}</strong> {fmtD(results.monthlyIncome)}</p>
              <p><strong>{t.step2(method === "custom" ? customPct + "%" : method === "15pct" ? "15%" : "10%")}</strong> {fmtD(results.monthlyIncome * (method === "custom" ? parseFloat(customPct) / 100 : method === "15pct" ? 0.15 : 0.10))}</p>
              <p><strong>{t.step3}</strong> −{fmtD((parseFloat(insurance) || 0) + (parseFloat(fuel) || 0))}</p>
              <p><strong>{t.step4}</strong> {fmtD(results.maxMonthlyPayment)}</p>
              <p><strong>{t.step5}</strong> {fmt(results.maxCarPrice - (parseFloat(downPayment) || 0) - (parseFloat(tradeIn) || 0))}</p>
              <p><strong>{t.step6}</strong> + {fmt((parseFloat(downPayment) || 0) + (parseFloat(tradeIn) || 0))}</p>
              <p className="font-bold text-slate-900 pt-1">{t.stepFinal} {fmt(results.maxCarPrice)}</p>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}

function InputField({
  label, value, onChange, hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] text-slate-500 mb-1">{label}</label>
      <div className="relative">
        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      {hint && <p className="mt-0.5 text-[10px] text-slate-400">{hint}</p>}
    </div>
  );
}

function Metric({
  label, value, sub, warn,
}: {
  label: string;
  value: string;
  sub?: string;
  warn?: boolean;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1">{label}</p>
      <p className={`text-xl font-bold ${warn ? "text-amber-600" : "text-slate-900"}`}>{value}</p>
      {sub && <p className={`text-[10px] mt-0.5 ${warn ? "text-amber-600" : "text-slate-500"}`}>{sub}</p>}
    </div>
  );
}
