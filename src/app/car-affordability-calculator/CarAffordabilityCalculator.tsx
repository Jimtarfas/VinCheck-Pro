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

// Reverse the loan formula to find max principal from max payment
function maxPrincipal(monthlyPayment: number, annualRate: number, months: number): number {
  if (annualRate === 0) return monthlyPayment * months;
  const r = annualRate / 100 / 12;
  return monthlyPayment * ((Math.pow(1 + r, months) - 1) / (r * Math.pow(1 + r, months)));
}

const TERM_OPTIONS = [24, 36, 48, 60, 72, 84];

export default function CarAffordabilityCalculator() {
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
        { label: "Rent / Mortgage", amount: rent, color: "bg-slate-400" },
        { label: "Credit Cards", amount: cc, color: "bg-amber-400" },
        { label: "Student Loans", amount: sl, color: "bg-orange-400" },
        { label: "Other Debts", amount: other, color: "bg-red-400" },
        { label: "Car Payment (max)", amount: Math.max(effectiveMaxPayment, 0), color: "bg-primary-500" },
        { label: "Insurance + Fuel", amount: ins + gas, color: "bg-primary-300" },
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
            Your Income
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
              <option value="annual">Annual (yearly)</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        {/* Existing monthly debts */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
            Existing Monthly Debt Payments
          </p>
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Rent / Mortgage" value={rentMortgage} onChange={setRentMortgage} />
            <InputField label="Credit Cards" value={creditCards} onChange={setCreditCards} />
            <InputField label="Student Loans" value={studentLoans} onChange={setStudentLoans} />
            <InputField label="Other Debts" value={otherDebts} onChange={setOtherDebts} />
          </div>
        </div>

        {/* Vehicle running costs */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
            Estimated Monthly Vehicle Costs
          </p>
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Auto Insurance" value={insurance} onChange={setInsurance} hint="US avg ~$150/mo" />
            <InputField label="Fuel / Charging" value={fuel} onChange={setFuel} hint="US avg ~$200/mo" />
          </div>
        </div>

        {/* Loan params */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
            Loan Parameters
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">APR (%)</label>
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
              <label className="block text-[11px] text-slate-500 mb-1">Loan Term</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <select
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {TERM_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t} months</option>
                  ))}
                </select>
              </div>
            </div>
            <InputField label="Down Payment ($)" value={downPayment} onChange={setDownPayment} />
            <InputField label="Trade-In Value ($)" value={tradeIn} onChange={setTradeIn} />
          </div>
        </div>

        {/* Budget rule */}
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            Budget Rule
            <span className="group relative inline-flex">
              <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-56 p-2 bg-slate-800 text-white text-[11px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                The rule determines what percentage of gross monthly income can go to vehicle costs.
              </span>
            </span>
          </p>
          <div className="grid grid-cols-3 gap-2">
            {([
              { id: "20/4/10", label: "20/4/10", sub: "10% of income" },
              { id: "15pct", label: "15% Rule", sub: "15% of income" },
              { id: "custom", label: "Custom %", sub: "set your own" },
            ] as const).map(({ id, label, sub }) => (
              <button
                key={id}
                type="button"
                onClick={() => setMethod(id)}
                className={`px-3 py-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                  method === id
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
            Calculate My Car Budget
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

          {/* Main result */}
          <div className={`rounded-2xl border-2 p-6 border-${ruleColor}-200 bg-${ruleColor}-50`}>
            <div className="flex items-start gap-3">
              <RuleIcon className={`w-6 h-6 text-${ruleColor}-600 flex-shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold uppercase tracking-wide text-${ruleColor}-700 mb-1`}>
                  {results.ruleResult === "comfortable"
                    ? "✓ Within Budget"
                    : results.ruleResult === "stretched"
                    ? "⚠ Slightly Stretched"
                    : "✗ Over Recommended Limit"}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {fmt(results.maxCarPrice)}
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Maximum recommended vehicle price based on your income and debts
                </p>
              </div>
            </div>
          </div>

          {/* Key metrics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Metric label="Max Monthly Payment" value={fmtD(results.maxMonthlyPayment)} />
            <Metric label="Gross Monthly Income" value={fmt(results.monthlyIncome)} />
            <Metric
              label="Debt-to-Income Ratio"
              value={`${results.debtToIncomeRatio.toFixed(1)}%`}
              sub={results.debtToIncomeRatio > 43 ? "Above 43% — risky" : results.debtToIncomeRatio > 36 ? "36–43% — stretched" : "Below 36% — healthy"}
              warn={results.debtToIncomeRatio > 36}
            />
          </div>

          {/* Monthly budget bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-4">
              Monthly Budget Breakdown
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
              <div className="flex-1 bg-slate-100" title="Available after all obligations" />
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
                Remaining — <strong>{fmt(Math.max(results.monthlyIncome - results.totalMonthlyObligations, 0))}</strong>
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
                    ? "Your debt-to-income ratio exceeds lender limits"
                    : "You're approaching the recommended debt ceiling"}
                </p>
                <p>
                  Most lenders cap total monthly debt (including the new car payment) at{" "}
                  <strong>43% of gross income</strong>. Consider a larger down payment, shorter
                  loan term, or paying down existing debt before financing a vehicle.
                </p>
              </div>
            </div>
          )}

          {/* CTA to loan calculator */}
          <div className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-sm text-slate-700">
              Found your price range?{" "}
              <span className="font-semibold text-slate-900">Calculate the exact monthly payment.</span>
            </p>
            <Link
              href="/car-loan-calculator"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Loan Calculator <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Dropdown summary */}
          <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer text-sm font-bold text-slate-900 select-none list-none">
              How was this calculated?
              <ChevronDown className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed space-y-2 border-t border-slate-100 pt-4">
              <p><strong>Step 1 — Monthly income:</strong> {fmtD(results.monthlyIncome)}</p>
              <p><strong>Step 2 — Max vehicle cost ({method === "custom" ? customPct + "%" : method === "15pct" ? "15%" : "10%"} of income):</strong> {fmtD(results.monthlyIncome * (method === "custom" ? parseFloat(customPct) / 100 : method === "15pct" ? 0.15 : 0.10))}</p>
              <p><strong>Step 3 — Subtract insurance + fuel:</strong> −{fmtD((parseFloat(insurance) || 0) + (parseFloat(fuel) || 0))}</p>
              <p><strong>Step 4 — Max loan payment:</strong> {fmtD(results.maxMonthlyPayment)}</p>
              <p><strong>Step 5 — Reverse loan formula → max principal:</strong> {fmt(results.maxCarPrice - (parseFloat(downPayment) || 0) - (parseFloat(tradeIn) || 0))}</p>
              <p><strong>Step 6 — Add down payment + trade-in:</strong> + {fmt((parseFloat(downPayment) || 0) + (parseFloat(tradeIn) || 0))}</p>
              <p className="font-bold text-slate-900 pt-1">= Max vehicle price: {fmt(results.maxCarPrice)}</p>
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
