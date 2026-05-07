"use client";

import { useState, useCallback } from "react";
import {
  DollarSign,
  Percent,
  Calendar,
  RefreshCcw,
  TrendingUp,
  TrendingDown,
  Car,
  Key,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Gauge,
  Info,
} from "lucide-react";

/* ─── Helpers ────────────────────────────────────────────── */

function fmt(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function fmtShort(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function num(v: string): number {
  return parseFloat(v.replace(/,/g, "")) || 0;
}

/* ─── Constants ──────────────────────────────────────────── */

const TERM_OPTIONS = [24, 36, 48, 60, 72, 84];
const LOAN_TERM_OPTIONS = [24, 36, 48, 60, 72, 84];
const MILEAGE_OPTIONS = [10000, 12000, 15000];

// Approximate residual % retained when BUYING (i.e. estimated resale value at end of comparison term)
const BUY_RESIDUAL_TABLE: Record<number, number> = {
  24: 0.78,
  36: 0.7,
  48: 0.6,
  60: 0.5,
  72: 0.42,
  84: 0.36,
};

// Default lease residual % (of MSRP) at common lease terms
const LEASE_RESIDUAL_DEFAULT: Record<number, number> = {
  24: 0.62,
  36: 0.55,
  48: 0.48,
  60: 0.42,
};

const OVERAGE_PER_MILE = 0.25;

/* ─── Types ──────────────────────────────────────────────── */

interface YearRow {
  year: number;
  leaseCum: number;
  buyCum: number;
}

interface LeaseResults {
  capCost: number;
  residual: number;
  depreciationFee: number;
  financeCharge: number;
  preTaxMonthly: number;
  monthly: number;
  totalPayments: number;
  upfront: number;
  totalCost: number;
  overageCharge: number;
}

interface BuyResults {
  loanAmount: number;
  monthly: number;
  totalPaid: number;
  totalInterest: number;
  equityAtEnd: number;
  netCost: number;
  outOfPocket: number;
}

interface Results {
  termMonths: number;
  lease: LeaseResults;
  buy: BuyResults;
  netAdvantage: number; // positive => buying saves; negative => leasing saves
  yearTable: YearRow[];
}

/* ─── Component ──────────────────────────────────────────── */

export default function LeaseVsBuyCalculator() {
  // Shared inputs
  const [msrp, setMsrp] = useState("38000");
  const [price, setPrice] = useState("36000");
  const [downPayment, setDownPayment] = useState("3000");
  const [tradeIn, setTradeIn] = useState("0");
  const [taxRate, setTaxRate] = useState("6");
  const [term, setTerm] = useState(36);

  // Lease inputs
  const [moneyFactor, setMoneyFactor] = useState("0.00125");
  const [residualPct, setResidualPct] = useState("55");
  const [acquisitionFee, setAcquisitionFee] = useState("695");
  const [dispositionFee, setDispositionFee] = useState("395");
  const [mileageAllowance, setMileageAllowance] = useState(12000);

  // Buy inputs
  const [apr, setApr] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState(60);

  // Optional advanced
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [investReturn, setInvestReturn] = useState("6");
  const [actualMileage, setActualMileage] = useState("12000");

  const [results, setResults] = useState<Results | null>(null);

  /* Helper — auto-fill money factor from APR */
  function fillMfFromApr() {
    const a = num(apr);
    if (a > 0) {
      setMoneyFactor((a / 100 / 24).toFixed(5));
    }
  }

  const calculate = useCallback(() => {
    const _msrp = num(msrp);
    const _price = num(price);
    const _down = num(downPayment);
    const _trade = num(tradeIn);
    const _taxRate = num(taxRate) / 100;
    const _mf = parseFloat(moneyFactor) || 0;
    const _resPct = num(residualPct) / 100;
    const _acq = num(acquisitionFee);
    const _disp = num(dispositionFee);
    const _apr = num(apr) / 100;
    const _actualMiles = num(actualMileage);
    const termMonths = term;

    /* ── Lease side ── */
    const capCost = Math.max(_price - _down - _trade, 0);
    const residual = _msrp * _resPct;
    const depreciationFee =
      termMonths > 0 ? (capCost - residual) / termMonths : 0;
    const financeCharge = (capCost + residual) * _mf;
    const preTaxMonthly = depreciationFee + financeCharge;
    const monthlyLease = preTaxMonthly * (1 + _taxRate);
    const totalPayments = monthlyLease * termMonths;
    const taxOnDown = _down * _taxRate;
    const upfront = _down + taxOnDown + _acq;

    // Mileage overage estimate: actual annual miles vs allowance, prorated to term
    const allowedTotal = (mileageAllowance * termMonths) / 12;
    const actualTotal = (_actualMiles * termMonths) / 12;
    const overageMiles = Math.max(actualTotal - allowedTotal, 0);
    const overageCharge = overageMiles * OVERAGE_PER_MILE;

    const totalLeaseCost = totalPayments + upfront + _disp + overageCharge;

    const lease: LeaseResults = {
      capCost,
      residual,
      depreciationFee,
      financeCharge,
      preTaxMonthly,
      monthly: monthlyLease,
      totalPayments,
      upfront,
      totalCost: totalLeaseCost,
      overageCharge,
    };

    /* ── Buy side ── */
    const taxAmount = (_price - _trade) * _taxRate;
    const loanAmount = Math.max(
      _price + taxAmount - _down - _trade,
      0,
    );
    const monthlyRate = _apr / 12;
    const n = loanTerm;
    const monthlyBuy =
      monthlyRate === 0
        ? loanAmount / n
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) /
          (Math.pow(1 + monthlyRate, n) - 1);

    // Total paid over the COMPARISON period (term), not full loan
    // For fairness: compare both products over the same `term` months
    const compareMonths = termMonths;

    // Amortize the loan up to compareMonths to find remaining balance + interest paid
    let bal = loanAmount;
    let interestPaidInWindow = 0;
    let principalPaidInWindow = 0;
    const paymentsInWindow = Math.min(compareMonths, n);
    for (let m = 1; m <= paymentsInWindow; m++) {
      const interest = bal * monthlyRate;
      const principal = Math.min(monthlyBuy - interest, bal);
      bal = Math.max(bal - principal, 0);
      interestPaidInWindow += interest;
      principalPaidInWindow += principal;
    }
    const remainingBalance = bal;

    // Estimated resale value of the car at end of comparison term
    const buyResidualPct =
      BUY_RESIDUAL_TABLE[compareMonths] ??
      (compareMonths <= 36 ? 0.7 : compareMonths >= 84 ? 0.36 : 0.5);
    const estimatedResale = _price * buyResidualPct;
    const equityAtEnd = Math.max(estimatedResale - remainingBalance, 0);

    const monthlyPaymentsTotal = monthlyBuy * paymentsInWindow;
    const buyOutOfPocket = _down + taxAmount + monthlyPaymentsTotal;
    // If loan still active past compare window, the buyer would still owe `remainingBalance`
    // Net cost over period = out of pocket - asset value at end
    const buyNetCost = buyOutOfPocket - equityAtEnd;

    const buy: BuyResults = {
      loanAmount,
      monthly: monthlyBuy,
      totalPaid: monthlyPaymentsTotal,
      totalInterest: interestPaidInWindow,
      equityAtEnd,
      netCost: buyNetCost,
      outOfPocket: buyOutOfPocket,
    };

    // Net advantage: positive => buying saves money vs leasing
    const netAdvantage = totalLeaseCost - buyNetCost;

    /* ── Year-by-year cumulative table ── */
    const yearTable: YearRow[] = [];
    const totalYears = Math.ceil(termMonths / 12);
    for (let y = 1; y <= totalYears; y++) {
      const monthsThisYear = Math.min(12 * y, termMonths);
      const leaseCum =
        upfront +
        monthlyLease * monthsThisYear +
        (monthsThisYear === termMonths ? _disp + overageCharge : 0);
      const buyMonths = Math.min(monthsThisYear, n);
      const buyCum = _down + taxAmount + monthlyBuy * buyMonths;
      yearTable.push({ year: y, leaseCum, buyCum });
    }

    setResults({
      termMonths,
      lease,
      buy,
      netAdvantage,
      yearTable,
    });
  }, [
    msrp,
    price,
    downPayment,
    tradeIn,
    taxRate,
    term,
    moneyFactor,
    residualPct,
    acquisitionFee,
    dispositionFee,
    mileageAllowance,
    apr,
    loanTerm,
    actualMileage,
  ]);

  function reset() {
    setMsrp("38000");
    setPrice("36000");
    setDownPayment("3000");
    setTradeIn("0");
    setTaxRate("6");
    setTerm(36);
    setMoneyFactor("0.00125");
    setResidualPct("55");
    setAcquisitionFee("695");
    setDispositionFee("395");
    setMileageAllowance(12000);
    setApr("6.5");
    setLoanTerm(60);
    setInvestReturn("6");
    setActualMileage("12000");
    setResults(null);
  }

  // Update lease residual default when term changes
  function handleTermChange(t: number) {
    setTerm(t);
    const def = LEASE_RESIDUAL_DEFAULT[t];
    if (def !== undefined) {
      setResidualPct((def * 100).toFixed(0));
    }
  }

  const verdict = results
    ? results.netAdvantage > 50
      ? ("buy" as const)
      : results.netAdvantage < -50
        ? ("lease" as const)
        : ("tied" as const)
    : null;

  const overageWarning =
    num(actualMileage) > mileageAllowance && results !== null;

  return (
    <div className="space-y-6">
      {/* ── Inputs Card ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7">
        {/* Shared section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Car className="w-4 h-4 text-primary-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Vehicle &amp; Shared Inputs
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              id="msrp"
              label="Vehicle MSRP"
              icon={<DollarSign className="w-4 h-4 text-slate-400" />}
              value={msrp}
              onChange={setMsrp}
              type="number"
              min="0"
              placeholder="38,000"
              hint="Manufacturer's sticker price — drives lease residual"
            />
            <Field
              id="price"
              label="Negotiated Price"
              icon={<DollarSign className="w-4 h-4 text-slate-400" />}
              value={price}
              onChange={setPrice}
              type="number"
              min="0"
              placeholder="36,000"
              hint="Selling price after discounts (cap cost when leasing)"
            />
            <Field
              id="down"
              label="Down Payment / Cap Reduction"
              icon={<DollarSign className="w-4 h-4 text-slate-400" />}
              value={downPayment}
              onChange={setDownPayment}
              type="number"
              min="0"
              placeholder="3,000"
              hint="Cash upfront in either scenario"
            />
            <Field
              id="trade"
              label="Trade-In Value"
              icon={<DollarSign className="w-4 h-4 text-slate-400" />}
              value={tradeIn}
              onChange={setTradeIn}
              type="number"
              min="0"
              placeholder="0"
              hint="Credit applied either direction"
            />
            <Field
              id="tax"
              label="Sales Tax Rate"
              icon={<Percent className="w-4 h-4 text-slate-400" />}
              value={taxRate}
              onChange={setTaxRate}
              type="number"
              min="0"
              step="0.1"
              placeholder="6"
              hint="State + local combined rate"
            />
            <div>
              <label
                htmlFor="term"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
              >
                Comparison Term
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  id="term"
                  value={term}
                  onChange={(e) => handleTermChange(Number(e.target.value))}
                  className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {TERM_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t} months ({(t / 12).toFixed(t % 12 === 0 ? 0 : 1)}{" "}
                      {t === 12 ? "year" : "years"})
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Both lease and buy compared over this period
              </p>
            </div>
          </div>
        </div>

        {/* Two columns: Lease | Buy */}
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Lease side */}
          <div className="rounded-2xl border-2 border-blue-100 bg-blue-50/40 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Key className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wide">
                Lease Inputs
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label
                  htmlFor="mf"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                >
                  Money Factor
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="mf"
                    type="number"
                    step="0.00001"
                    min="0"
                    placeholder="0.00125"
                    value={moneyFactor}
                    onChange={(e) => setMoneyFactor(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <p className="text-[11px] text-slate-500">≈ APR ÷ 24</p>
                  <button
                    type="button"
                    onClick={fillMfFromApr}
                    className="text-[11px] font-bold text-primary-600 hover:text-primary-700 cursor-pointer"
                  >
                    Auto-fill from APR
                  </button>
                </div>
              </div>
              <Field
                id="residual"
                label="Residual Value %"
                icon={<Percent className="w-4 h-4 text-slate-400" />}
                value={residualPct}
                onChange={setResidualPct}
                type="number"
                min="0"
                step="1"
                placeholder="55"
                hint="% of MSRP retained at lease end"
              />
              <Field
                id="acq"
                label="Acquisition Fee"
                icon={<DollarSign className="w-4 h-4 text-slate-400" />}
                value={acquisitionFee}
                onChange={setAcquisitionFee}
                type="number"
                min="0"
                placeholder="695"
                hint="Bank fee charged at lease start"
              />
              <Field
                id="disp"
                label="Disposition Fee"
                icon={<DollarSign className="w-4 h-4 text-slate-400" />}
                value={dispositionFee}
                onChange={setDispositionFee}
                type="number"
                min="0"
                placeholder="395"
                hint="Charged at lease end if you don't buy/re-lease"
              />
              <div>
                <label
                  htmlFor="miles"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                >
                  Annual Mileage Allowance
                </label>
                <div className="relative">
                  <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <select
                    id="miles"
                    value={mileageAllowance}
                    onChange={(e) =>
                      setMileageAllowance(Number(e.target.value))
                    }
                    className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {MILEAGE_OPTIONS.map((m) => (
                      <option key={m} value={m}>
                        {m.toLocaleString()} miles/year
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Overage charged at ${OVERAGE_PER_MILE}/mile
                </p>
              </div>
            </div>
          </div>

          {/* Buy side */}
          <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/40 p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wide">
                Buy Inputs
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <Field
                id="apr"
                label="APR (Annual Interest Rate)"
                icon={<Percent className="w-4 h-4 text-slate-400" />}
                value={apr}
                onChange={setApr}
                type="number"
                min="0"
                step="0.1"
                placeholder="6.5"
                hint="From bank or credit union pre-approval"
              />
              <div>
                <label
                  htmlFor="loanterm"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                >
                  Loan Term
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <select
                    id="loanterm"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {LOAN_TERM_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t} months ({(t / 12).toFixed(t % 12 === 0 ? 0 : 1)}{" "}
                        years)
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Can extend beyond comparison term
                </p>
              </div>
              <div className="rounded-xl bg-white border border-emerald-100 p-3.5 text-xs text-slate-600 leading-relaxed">
                <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-emerald-600" /> Estimated
                  resale at end of term
                </p>
                <p>
                  We estimate the car will retain{" "}
                  <strong>
                    {(
                      (BUY_RESIDUAL_TABLE[term] ?? 0.5) * 100
                    ).toFixed(0)}
                    %
                  </strong>{" "}
                  of its negotiated price after {term} months — this becomes
                  your equity (resale value − loan balance).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced */}
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowAdvanced((p) => !p)}
            className="text-xs font-bold text-primary-600 hover:text-primary-700 cursor-pointer"
          >
            {showAdvanced ? "− Hide" : "+ Show"} advanced options
          </button>
          {showAdvanced && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                id="invest"
                label="Investment Return %"
                icon={<Percent className="w-4 h-4 text-slate-400" />}
                value={investReturn}
                onChange={setInvestReturn}
                type="number"
                min="0"
                step="0.1"
                placeholder="6"
                hint="Opportunity cost on cash differences"
              />
              <Field
                id="actualmiles"
                label="Actual Annual Mileage"
                icon={<Gauge className="w-4 h-4 text-slate-400" />}
                value={actualMileage}
                onChange={setActualMileage}
                type="number"
                min="0"
                step="500"
                placeholder="12,000"
                hint={`Used to estimate lease overage at $${OVERAGE_PER_MILE}/mi`}
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-7">
          <button
            type="button"
            onClick={calculate}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
          >
            Compare Lease vs Buy
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
      {results && verdict && (
        <div className="space-y-5">
          {/* Verdict pill */}
          <div
            className={`rounded-2xl p-6 text-center ${
              verdict === "buy"
                ? "bg-gradient-to-br from-emerald-500 to-emerald-700 text-white"
                : verdict === "lease"
                  ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white"
                  : "bg-gradient-to-br from-amber-400 to-amber-600 text-white"
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-widest opacity-90 mb-2">
              Net Advantage Over {results.termMonths} Months
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold">
              {verdict === "buy" &&
                `Buying saves you ${fmtShort(results.netAdvantage)}`}
              {verdict === "lease" &&
                `Leasing saves you ${fmtShort(Math.abs(results.netAdvantage))}`}
              {verdict === "tied" && "Roughly a wash — both very close"}
            </p>
            <p className="mt-2 text-sm opacity-90">
              Compared as net cost (out-of-pocket minus asset value at end of
              term).
            </p>
          </div>

          {/* Side-by-side comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Lease card */}
            <div className="bg-white border-2 border-blue-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Key className="w-5 h-5 text-blue-600" />
                <h4 className="text-base font-bold text-blue-900">Lease</h4>
              </div>
              <ComparisonRow
                label="Monthly payment"
                value={fmt(results.lease.monthly)}
                highlight
              />
              <ComparisonRow
                label="Upfront (down + tax + acq fee)"
                value={fmtShort(results.lease.upfront)}
              />
              <ComparisonRow
                label="Total of payments"
                value={fmtShort(results.lease.totalPayments)}
              />
              <ComparisonRow
                label="Disposition fee at end"
                value={fmtShort(num(dispositionFee))}
              />
              {results.lease.overageCharge > 0 && (
                <ComparisonRow
                  label="Mileage overage"
                  value={fmtShort(results.lease.overageCharge)}
                  warn
                />
              )}
              <div className="border-t border-slate-200 my-3" />
              <ComparisonRow
                label="Total out-of-pocket"
                value={fmtShort(results.lease.totalCost)}
                bold
              />
              <ComparisonRow
                label="Asset at end of term"
                value="$0 — return car"
                muted
              />
              <div className="mt-3 rounded-xl bg-blue-50 border border-blue-100 p-3 text-xs text-blue-900 leading-relaxed">
                <p>
                  Cap cost <strong>{fmtShort(results.lease.capCost)}</strong> ·
                  Residual <strong>{fmtShort(results.lease.residual)}</strong>
                </p>
                <p className="mt-1">
                  Depreciation fee{" "}
                  <strong>{fmt(results.lease.depreciationFee)}/mo</strong> ·
                  Finance charge{" "}
                  <strong>{fmt(results.lease.financeCharge)}/mo</strong>
                </p>
              </div>
            </div>

            {/* Buy card */}
            <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <h4 className="text-base font-bold text-emerald-900">Buy</h4>
              </div>
              <ComparisonRow
                label="Monthly payment"
                value={fmt(results.buy.monthly)}
                highlight
              />
              <ComparisonRow
                label="Upfront (down + tax)"
                value={fmtShort(
                  num(downPayment) +
                    (num(price) - num(tradeIn)) * (num(taxRate) / 100),
                )}
              />
              <ComparisonRow
                label={`Payments over ${results.termMonths} mo`}
                value={fmtShort(results.buy.totalPaid)}
              />
              <ComparisonRow
                label="Interest paid in window"
                value={fmtShort(results.buy.totalInterest)}
                warn
              />
              <div className="border-t border-slate-200 my-3" />
              <ComparisonRow
                label="Total out-of-pocket"
                value={fmtShort(results.buy.outOfPocket)}
                bold
              />
              <ComparisonRow
                label="Estimated equity at end"
                value={fmtShort(results.buy.equityAtEnd)}
                positive
              />
              <ComparisonRow
                label="Net cost of ownership"
                value={fmtShort(results.buy.netCost)}
                bold
              />
              <div className="mt-3 rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-xs text-emerald-900 leading-relaxed">
                <p>
                  Loan amount{" "}
                  <strong>{fmtShort(results.buy.loanAmount)}</strong> · APR{" "}
                  <strong>{apr}%</strong> · Term{" "}
                  <strong>{loanTerm} mo</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Comparison bar chart */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-4">
              Total Cost Comparison
            </p>
            {(() => {
              const max = Math.max(
                results.lease.totalCost,
                results.buy.outOfPocket,
              );
              const leaseW = max > 0 ? (results.lease.totalCost / max) * 100 : 0;
              const buyW = max > 0 ? (results.buy.outOfPocket / max) * 100 : 0;
              const buyNetW = max > 0 ? (results.buy.netCost / max) * 100 : 0;
              return (
                <div className="space-y-3">
                  <BarRow
                    label="Lease total cost"
                    pct={leaseW}
                    color="bg-blue-500"
                    valueLabel={fmtShort(results.lease.totalCost)}
                  />
                  <BarRow
                    label="Buy out-of-pocket"
                    pct={buyW}
                    color="bg-emerald-500"
                    valueLabel={fmtShort(results.buy.outOfPocket)}
                  />
                  <BarRow
                    label="Buy net (after equity)"
                    pct={buyNetW}
                    color="bg-emerald-700"
                    valueLabel={fmtShort(results.buy.netCost)}
                  />
                </div>
              );
            })()}
          </div>

          {/* Mileage overage warning */}
          {overageWarning && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <div>
                <p className="font-bold">
                  You drive more than your lease allowance
                </p>
                <p className="mt-1">
                  At {num(actualMileage).toLocaleString()} mi/yr vs a{" "}
                  {mileageAllowance.toLocaleString()} mi/yr cap, expect{" "}
                  <strong>{fmtShort(results.lease.overageCharge)}</strong> in
                  overage charges at lease end. Consider buying or pre-paying
                  for higher miles.
                </p>
              </div>
            </div>
          )}

          {/* Year-by-year table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Year-by-Year Cumulative Cost
              </h3>
              <span className="text-xs text-slate-500">
                {results.yearTable.length} years
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-medium">Year</th>
                    <th className="text-right px-4 py-2.5 font-medium">
                      Lease (cum.)
                    </th>
                    <th className="text-right px-4 py-2.5 font-medium">
                      Buy (cum.)
                    </th>
                    <th className="text-right px-4 py-2.5 font-medium">
                      Difference
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.yearTable.map((row) => {
                    const diff = row.leaseCum - row.buyCum;
                    return (
                      <tr key={row.year}>
                        <td className="px-4 py-2.5 text-slate-700 font-medium">
                          Year {row.year}
                        </td>
                        <td className="px-4 py-2.5 text-right text-blue-700">
                          {fmt(row.leaseCum)}
                        </td>
                        <td className="px-4 py-2.5 text-right text-emerald-700">
                          {fmt(row.buyCum)}
                        </td>
                        <td
                          className={`px-4 py-2.5 text-right font-medium ${diff > 0 ? "text-emerald-600" : "text-blue-600"}`}
                        >
                          {diff > 0
                            ? `Buy ahead ${fmt(diff)}`
                            : `Lease ahead ${fmt(Math.abs(diff))}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pros / cons callouts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ProsConsCard
              title="Lease — Pros & Cons"
              accent="blue"
              pros={[
                `Lower monthly payment (${fmt(results.lease.monthly)})`,
                "New car every few years with full warranty",
                "No resale hassle — just hand the keys back",
                "Often qualifies for manufacturer incentives",
              ]}
              cons={[
                `${fmtShort(results.lease.totalCost)} out-of-pocket with $0 asset at end`,
                `Mileage cap of ${mileageAllowance.toLocaleString()} mi/yr`,
                "Wear-and-tear chargebacks at turn-in",
                "Heavy fees to terminate early",
              ]}
            />
            <ProsConsCard
              title="Buy — Pros & Cons"
              accent="emerald"
              pros={[
                `Build ${fmtShort(results.buy.equityAtEnd)} in equity over the term`,
                "No mileage limits — drive as much as you want",
                "Free to modify, sell, or keep long-term",
                "Once paid off, costs drop to insurance + maintenance",
              ]}
              cons={[
                `Higher monthly payment (${fmt(results.buy.monthly)})`,
                `${fmtShort(results.buy.totalInterest)} in interest over the comparison window`,
                "Depreciation risk — value drops fastest in years 1–3",
                "You handle resale or trade-in when ready to upgrade",
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────── */

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

function ComparisonRow({
  label,
  value,
  highlight,
  bold,
  muted,
  warn,
  positive,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  bold?: boolean;
  muted?: boolean;
  warn?: boolean;
  positive?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5">
      <span className="text-xs text-slate-600">{label}</span>
      <span
        className={`text-sm tabular-nums ${
          highlight
            ? "text-xl font-extrabold text-slate-900"
            : bold
              ? "font-bold text-slate-900"
              : muted
                ? "text-slate-500"
                : warn
                  ? "text-rose-600 font-medium"
                  : positive
                    ? "text-emerald-600 font-medium"
                    : "text-slate-700"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function BarRow({
  label,
  pct,
  color,
  valueLabel,
}: {
  label: string;
  pct: number;
  color: string;
  valueLabel: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-slate-600">{label}</span>
        <span className="font-bold text-slate-900 tabular-nums">
          {valueLabel}
        </span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all`}
          style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
        />
      </div>
    </div>
  );
}

function ProsConsCard({
  title,
  accent,
  pros,
  cons,
}: {
  title: string;
  accent: "blue" | "emerald";
  pros: string[];
  cons: string[];
}) {
  const accentBorder =
    accent === "blue" ? "border-blue-200" : "border-emerald-200";
  const accentText = accent === "blue" ? "text-blue-900" : "text-emerald-900";
  return (
    <div className={`bg-white border-2 ${accentBorder} rounded-2xl p-5`}>
      <h4 className={`text-sm font-bold ${accentText} mb-4 uppercase tracking-wide`}>
        {title}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide mb-2">
            Pros
          </p>
          <ul className="space-y-1.5">
            {pros.map((p) => (
              <li key={p} className="flex items-start gap-1.5 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-bold text-rose-700 uppercase tracking-wide mb-2">
            Cons
          </p>
          <ul className="space-y-1.5">
            {cons.map((c) => (
              <li key={c} className="flex items-start gap-1.5 text-xs text-slate-700">
                <XCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
