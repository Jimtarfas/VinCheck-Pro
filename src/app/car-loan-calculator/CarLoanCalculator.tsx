"use client";

import { useState, useCallback } from "react";
import { DollarSign, Percent, Calendar, RefreshCcw, TrendingDown, ChevronDown, ChevronUp } from "lucide-react";

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface Results {
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
  principal: number;
  amortization: AmortizationRow[];
}

function buildAmortization(principal: number, monthlyRate: number, months: number): AmortizationRow[] {
  const rows: AmortizationRow[] = [];
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
    rows.push({
      month: m,
      payment,
      principal: princ,
      interest,
      balance,
    });
  }
  return rows;
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function fmtShort(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

const TERM_OPTIONS = [12, 24, 36, 48, 60, 72, 84];

const US_STATE_TAXES: [string, number][] = [
  ["No state tax", 0],
  ["Alabama (AL)", 2.0],
  ["Alaska (AK)", 0],
  ["Arizona (AZ)", 5.6],
  ["Arkansas (AR)", 6.5],
  ["California (CA)", 7.25],
  ["Colorado (CO)", 2.9],
  ["Connecticut (CT)", 6.35],
  ["Delaware (DE)", 0],
  ["Florida (FL)", 6.0],
  ["Georgia (GA)", 6.6],
  ["Hawaii (HI)", 4.0],
  ["Idaho (ID)", 6.0],
  ["Illinois (IL)", 6.25],
  ["Indiana (IN)", 7.0],
  ["Iowa (IA)", 5.0],
  ["Kansas (KS)", 6.5],
  ["Kentucky (KY)", 6.0],
  ["Louisiana (LA)", 4.45],
  ["Maine (ME)", 5.5],
  ["Maryland (MD)", 6.0],
  ["Massachusetts (MA)", 6.25],
  ["Michigan (MI)", 6.0],
  ["Minnesota (MN)", 6.5],
  ["Mississippi (MS)", 5.0],
  ["Missouri (MO)", 4.225],
  ["Montana (MT)", 0],
  ["Nebraska (NE)", 5.5],
  ["Nevada (NV)", 6.85],
  ["New Hampshire (NH)", 0],
  ["New Jersey (NJ)", 6.625],
  ["New Mexico (NM)", 4.0],
  ["New York (NY)", 4.0],
  ["North Carolina (NC)", 3.0],
  ["North Dakota (ND)", 5.0],
  ["Ohio (OH)", 5.75],
  ["Oklahoma (OK)", 3.25],
  ["Oregon (OR)", 0],
  ["Pennsylvania (PA)", 6.0],
  ["Rhode Island (RI)", 7.0],
  ["South Carolina (SC)", 5.0],
  ["South Dakota (SD)", 4.0],
  ["Tennessee (TN)", 7.0],
  ["Texas (TX)", 6.25],
  ["Utah (UT)", 4.85],
  ["Vermont (VT)", 6.0],
  ["Virginia (VA)", 4.15],
  ["Washington (WA)", 6.5],
  ["West Virginia (WV)", 6.0],
  ["Wisconsin (WI)", 5.0],
  ["Wyoming (WY)", 4.0],
];

export default function CarLoanCalculator() {
  const [price, setPrice] = useState("30000");
  const [downPayment, setDownPayment] = useState("3000");
  const [tradeIn, setTradeIn] = useState("0");
  const [term, setTerm] = useState(60);
  const [apr, setApr] = useState("6.5");
  const [stateTaxPct, setStateTaxPct] = useState("0");
  const [fees, setFees] = useState("500");
  const [results, setResults] = useState<Results | null>(null);
  const [showFullAmort, setShowFullAmort] = useState(false);

  const calculate = useCallback(() => {
    const vehiclePrice = parseFloat(price.replace(/,/g, "")) || 0;
    const down = parseFloat(downPayment.replace(/,/g, "")) || 0;
    const trade = parseFloat(tradeIn.replace(/,/g, "")) || 0;
    const taxPct = parseFloat(stateTaxPct) || 0;
    const docFees = parseFloat(fees.replace(/,/g, "")) || 0;
    const annualRate = parseFloat(apr) || 0;

    const taxAmount = (vehiclePrice - trade) * (taxPct / 100);
    const principal = Math.max(vehiclePrice - down - trade + taxAmount + docFees, 0);
    const monthlyRate = annualRate / 100 / 12;

    const amortization = buildAmortization(principal, monthlyRate, term);
    const last = amortization[amortization.length - 1];
    const monthlyPayment = amortization[0]?.payment ?? 0;
    const totalPaid = monthlyPayment * term;
    const totalInterest = totalPaid - principal;

    setResults({
      monthlyPayment,
      totalPaid,
      totalInterest,
      principal,
      amortization,
    });
    setShowFullAmort(false);
  }, [price, downPayment, tradeIn, term, apr, stateTaxPct, fees]);

  function reset() {
    setPrice("30000");
    setDownPayment("3000");
    setTradeIn("0");
    setTerm(60);
    setApr("6.5");
    setStateTaxPct("0");
    setFees("500");
    setResults(null);
    setShowFullAmort(false);
  }

  // Amortization rows to display — all rows if ≤24 months, else first 6 + "..." + last 3
  const displayedRows =
    results && results.amortization.length > 0
      ? showFullAmort || results.amortization.length <= 24
        ? results.amortization
        : [
            ...results.amortization.slice(0, 6),
            ...results.amortization.slice(-3),
          ]
      : [];

  return (
    <div className="space-y-6">
      {/* Input card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Vehicle price */}
          <Field
            id="price"
            label="Vehicle Price"
            icon={<DollarSign className="w-4 h-4 text-slate-400" />}
            value={price}
            onChange={setPrice}
            type="number"
            min="0"
            placeholder="30,000"
            hint="Total purchase price before down payment"
          />
          {/* Down payment */}
          <Field
            id="down"
            label="Down Payment"
            icon={<DollarSign className="w-4 h-4 text-slate-400" />}
            value={downPayment}
            onChange={setDownPayment}
            type="number"
            min="0"
            placeholder="3,000"
            hint="Cash you pay upfront"
          />
          {/* Trade-in */}
          <Field
            id="trade"
            label="Trade-In Value"
            icon={<DollarSign className="w-4 h-4 text-slate-400" />}
            value={tradeIn}
            onChange={setTradeIn}
            type="number"
            min="0"
            placeholder="0"
            hint="Dealer credit for your current vehicle"
          />
          {/* APR */}
          <Field
            id="apr"
            label="Annual Interest Rate (APR)"
            icon={<Percent className="w-4 h-4 text-slate-400" />}
            value={apr}
            onChange={setApr}
            type="number"
            min="0"
            step="0.1"
            placeholder="6.5"
            hint="Check your bank or credit union pre-approval"
          />
          {/* Loan Term */}
          <div>
            <label htmlFor="term" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Loan Term
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                id="term"
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {TERM_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t} months ({(t / 12).toFixed(t % 12 === 0 ? 0 : 1)} {t === 12 ? "year" : "years"})
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Shorter = less interest; longer = lower payment</p>
          </div>
          {/* State sales tax */}
          <div>
            <label htmlFor="statetax" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              State Sales Tax
            </label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                id="statetax"
                value={stateTaxPct}
                onChange={(e) => setStateTaxPct(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {US_STATE_TAXES.map(([label, rate]) => (
                  <option key={label} value={rate}>
                    {label} — {rate}%
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Applied to (price − trade-in)</p>
          </div>
          {/* Doc fees */}
          <Field
            id="fees"
            label="Dealer / Doc Fees"
            icon={<DollarSign className="w-4 h-4 text-slate-400" />}
            value={fees}
            onChange={setFees}
            type="number"
            min="0"
            placeholder="500"
            hint="Documentation, registration, and title fees"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={calculate}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
          >
            Calculate Monthly Payment
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

      {/* Results card */}
      {results && (
        <div className="space-y-4">
          {/* Summary metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Metric
              label="Monthly Payment"
              value={fmt(results.monthlyPayment)}
              highlight
            />
            <Metric label="Loan Principal" value={fmtShort(results.principal)} />
            <Metric label="Total Interest" value={fmtShort(results.totalInterest)} muted />
            <Metric label="Total Cost" value={fmtShort(results.totalPaid)} />
          </div>

          {/* Visual bar: principal vs interest */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">
              Cost Breakdown
            </p>
            <div className="flex rounded-full overflow-hidden h-4">
              <div
                className="bg-primary-500"
                style={{
                  width: `${(results.principal / results.totalPaid) * 100}%`,
                }}
                title={`Principal: ${fmtShort(results.principal)}`}
              />
              <div
                className="bg-rose-400"
                style={{
                  width: `${(results.totalInterest / results.totalPaid) * 100}%`,
                }}
                title={`Interest: ${fmtShort(results.totalInterest)}`}
              />
            </div>
            <div className="flex gap-5 mt-2 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-primary-500 inline-block" />
                Principal {((results.principal / results.totalPaid) * 100).toFixed(1)}%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-rose-400 inline-block" />
                Interest {((results.totalInterest / results.totalPaid) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Tip */}
          {results.totalInterest > results.principal * 0.15 && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <TrendingDown className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <p>
                You&rsquo;re paying{" "}
                <strong>
                  {fmt(results.totalInterest)} in interest
                </strong>{" "}
                over the life of this loan. Consider a shorter term or a larger down payment
                to reduce the total cost.
              </p>
            </div>
          )}

          {/* Amortization table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Amortization Schedule</h3>
              <span className="text-xs text-slate-500">{term} payments</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-medium">Month</th>
                    <th className="text-right px-4 py-2.5 font-medium">Payment</th>
                    <th className="text-right px-4 py-2.5 font-medium">Principal</th>
                    <th className="text-right px-4 py-2.5 font-medium">Interest</th>
                    <th className="text-right px-4 py-2.5 font-medium">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayedRows.map((row, idx) => {
                    // Show a gap row when we jump from row 6 to (len - 3)
                    const prevRow = displayedRows[idx - 1];
                    const showGap = prevRow && row.month - prevRow.month > 1;
                    return (
                      <>
                        {showGap && (
                          <tr key={`gap-${row.month}`} className="bg-slate-50">
                            <td colSpan={5} className="px-4 py-2 text-center text-xs text-slate-500">
                              ···  {row.month - prevRow.month - 1} payments omitted
                            </td>
                          </tr>
                        )}
                        <tr key={row.month} className={row.month % 12 === 0 ? "bg-primary-50/40" : ""}>
                          <td className="px-4 py-2.5 text-slate-700 font-medium">{row.month}</td>
                          <td className="px-4 py-2.5 text-right text-slate-700">{fmt(row.payment)}</td>
                          <td className="px-4 py-2.5 text-right text-emerald-700">{fmt(row.principal)}</td>
                          <td className="px-4 py-2.5 text-right text-rose-600">{fmt(row.interest)}</td>
                          <td className="px-4 py-2.5 text-right text-slate-700">{fmt(row.balance)}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {results.amortization.length > 24 && (
              <div className="px-5 py-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowFullAmort((p) => !p)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700 cursor-pointer"
                >
                  {showFullAmort ? (
                    <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
                  ) : (
                    <><ChevronDown className="w-3.5 h-3.5" /> Show all {term} rows</>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Sub-components ───────────────────────────────────────── */

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
          className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
      {hint && <p className="mt-1 text-[11px] text-slate-500">{hint}</p>}
    </div>
  );
}

function Metric({ label, value, highlight, muted }: { label: string; value: string; highlight?: boolean; muted?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${highlight ? "bg-primary-600 border-primary-600" : "bg-white border-slate-200"}`}>
      <p className={`text-[11px] font-bold uppercase tracking-wide mb-1 ${highlight ? "text-primary-100" : "text-slate-500"}`}>
        {label}
      </p>
      <p className={`text-xl font-bold ${highlight ? "text-white" : muted ? "text-rose-600" : "text-slate-900"}`}>
        {value}
      </p>
    </div>
  );
}
