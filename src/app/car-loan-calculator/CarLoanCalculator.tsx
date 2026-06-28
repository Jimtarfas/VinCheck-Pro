"use client";

import { useState, useCallback } from "react";
import { DollarSign, Percent, Calendar, RefreshCcw, TrendingDown, ChevronDown, ChevronUp } from "lucide-react";

type Locale = "en" | "es" | "fr";

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

const COPY = {
  en: {
    vehiclePrice: "Vehicle Price",
    vehiclePriceHint: "Total purchase price before down payment",
    downPayment: "Down Payment",
    downPaymentHint: "Cash you pay upfront",
    tradeIn: "Trade-In Value",
    tradeInHint: "Dealer credit for your current vehicle",
    apr: "Annual Interest Rate (APR)",
    aprHint: "Check your bank or credit union pre-approval",
    loanTerm: "Loan Term",
    loanTermHint: "Shorter = less interest; longer = lower payment",
    months: "months",
    year: "year",
    years: "years",
    stateSalesTax: "State Sales Tax",
    stateSalesTaxHint: "Applied to (price − trade-in)",
    docFees: "Dealer / Doc Fees",
    docFeesHint: "Documentation, registration, and title fees",
    calculateBtn: "Calculate Monthly Payment",
    resetTitle: "Reset",
    monthlyPayment: "Monthly Payment",
    loanPrincipal: "Loan Principal",
    totalInterest: "Total Interest",
    totalCost: "Total Cost",
    costBreakdown: "Cost Breakdown",
    principalLabel: "Principal",
    interestLabel: "Interest",
    interestTipPre: "You\u2019re paying ",
    interestTipMid: " in interest",
    interestTipSuffix:
      " over the life of this loan. Consider a shorter term or a larger down payment to reduce the total cost.",
    amortizationSchedule: "Amortization Schedule",
    payments: "payments",
    colMonth: "Month",
    colPayment: "Payment",
    colPrincipal: "Principal",
    colInterest: "Interest",
    colBalance: "Balance",
    paymentsOmitted: "payments omitted",
    showLess: "Show less",
    showAll: "Show all",
    rows: "rows",
    noStateTax: "No state tax",
  },
  es: {
    vehiclePrice: "Precio del vehículo",
    vehiclePriceHint: "Precio total de compra antes del pago inicial",
    downPayment: "Pago inicial",
    downPaymentHint: "Efectivo que pagas por adelantado",
    tradeIn: "Valor del intercambio",
    tradeInHint: "Crédito del concesionario por tu vehículo actual",
    apr: "Tasa anual de interés (APR)",
    aprHint: "Revisa la pre-aprobación de tu banco o cooperativa de crédito",
    loanTerm: "Plazo del préstamo",
    loanTermHint: "Más corto = menos interés; más largo = pago más bajo",
    months: "meses",
    year: "año",
    years: "años",
    stateSalesTax: "Impuesto estatal sobre ventas",
    stateSalesTaxHint: "Aplicado a (precio − intercambio)",
    docFees: "Tarifas del concesionario y documentación",
    docFeesHint: "Tarifas de documentación, registro y título",
    calculateBtn: "Calcular pago mensual",
    resetTitle: "Restablecer",
    monthlyPayment: "Pago mensual",
    loanPrincipal: "Capital del préstamo",
    totalInterest: "Interés total",
    totalCost: "Costo total",
    costBreakdown: "Desglose de costo",
    principalLabel: "Capital",
    interestLabel: "Interés",
    interestTipPre: "Estás pagando ",
    interestTipMid: " en interés",
    interestTipSuffix:
      " durante la vida de este préstamo. Considera un plazo más corto o un pago inicial más grande para reducir el costo total.",
    amortizationSchedule: "Calendario de amortización",
    payments: "pagos",
    colMonth: "Mes",
    colPayment: "Pago",
    colPrincipal: "Capital",
    colInterest: "Interés",
    colBalance: "Saldo",
    paymentsOmitted: "pagos omitidos",
    showLess: "Mostrar menos",
    showAll: "Mostrar las",
    rows: "filas",
    noStateTax: "Sin impuesto estatal",
  },
  fr: {
    vehiclePrice: "Prix du véhicule",
    vehiclePriceHint: "Prix d'achat total avant acompte",
    downPayment: "Acompte",
    downPaymentHint: "Espèces que tu paies d'avance",
    tradeIn: "Valeur de reprise",
    tradeInHint: "Crédit du concessionnaire pour ton véhicule actuel",
    apr: "Taux d'intérêt annuel (APR)",
    aprHint: "Vérifie la pré-approbation de ta banque ou coopérative de crédit",
    loanTerm: "Durée du prêt",
    loanTermHint: "Plus court = moins d'intérêts ; plus long = paiement plus bas",
    months: "mois",
    year: "an",
    years: "ans",
    stateSalesTax: "Taxe de vente de l'état",
    stateSalesTaxHint: "Appliquée à (prix − reprise)",
    docFees: "Frais concessionnaire / documentation",
    docFeesHint: "Frais de documentation, d'immatriculation et de titre",
    calculateBtn: "Calculer le paiement mensuel",
    resetTitle: "Réinitialiser",
    monthlyPayment: "Paiement mensuel",
    loanPrincipal: "Capital du prêt",
    totalInterest: "Intérêts totaux",
    totalCost: "Coût total",
    costBreakdown: "Détail des coûts",
    principalLabel: "Capital",
    interestLabel: "Intérêts",
    interestTipPre: "Tu paies ",
    interestTipMid: " en intérêts",
    interestTipSuffix:
      " sur la durée de vie de ce prêt. Envisage une durée plus courte ou un acompte plus important pour réduire le coût total.",
    amortizationSchedule: "Tableau d'amortissement",
    payments: "paiements",
    colMonth: "Mois",
    colPayment: "Paiement",
    colPrincipal: "Capital",
    colInterest: "Intérêts",
    colBalance: "Solde",
    paymentsOmitted: "paiements omis",
    showLess: "Afficher moins",
    showAll: "Tout afficher",
    rows: "lignes",
    noStateTax: "Pas de taxe d'état",
  },
} as const;

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

// State names stay English (proper nouns). Only the "No state tax" label is localized.
const US_STATE_TAXES_RAW: [string, number][] = [
  ["__NO_TAX__", 0],
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

interface Props {
  locale?: Locale;
}

export default function CarLoanCalculator({ locale = "en" }: Props) {
  const t = COPY[locale];
  const [price, setPrice] = useState("30000");
  const [downPayment, setDownPayment] = useState("3000");
  const [tradeIn, setTradeIn] = useState("0");
  const [term, setTerm] = useState(60);
  const [apr, setApr] = useState("6.5");
  const [stateTaxPct, setStateTaxPct] = useState("0");
  const [fees, setFees] = useState("500");
  const [results, setResults] = useState<Results | null>(null);
  const [showFullAmort, setShowFullAmort] = useState(false);

  const stateTaxOptions: [string, number][] = US_STATE_TAXES_RAW.map(([label, rate]) => [
    label === "__NO_TAX__" ? t.noStateTax : label,
    rate,
  ]);

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
            label={t.vehiclePrice}
            icon={<DollarSign className="w-4 h-4 text-slate-400" />}
            value={price}
            onChange={setPrice}
            type="number"
            min="0"
            placeholder="30,000"
            hint={t.vehiclePriceHint}
          />
          {/* Down payment */}
          <Field
            id="down"
            label={t.downPayment}
            icon={<DollarSign className="w-4 h-4 text-slate-400" />}
            value={downPayment}
            onChange={setDownPayment}
            type="number"
            min="0"
            placeholder="3,000"
            hint={t.downPaymentHint}
          />
          {/* Trade-in */}
          <Field
            id="trade"
            label={t.tradeIn}
            icon={<DollarSign className="w-4 h-4 text-slate-400" />}
            value={tradeIn}
            onChange={setTradeIn}
            type="number"
            min="0"
            placeholder="0"
            hint={t.tradeInHint}
          />
          {/* APR */}
          <Field
            id="apr"
            label={t.apr}
            icon={<Percent className="w-4 h-4 text-slate-400" />}
            value={apr}
            onChange={setApr}
            type="number"
            min="0"
            step="0.1"
            placeholder="6.5"
            hint={t.aprHint}
          />
          {/* Loan Term */}
          <div>
            <label htmlFor="term" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              {t.loanTerm}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                id="term"
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {TERM_OPTIONS.map((tm) => (
                  <option key={tm} value={tm}>
                    {tm} {t.months} ({(tm / 12).toFixed(tm % 12 === 0 ? 0 : 1)} {tm === 12 ? t.year : t.years})
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">{t.loanTermHint}</p>
          </div>
          {/* State sales tax */}
          <div>
            <label htmlFor="statetax" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              {t.stateSalesTax}
            </label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                id="statetax"
                value={stateTaxPct}
                onChange={(e) => setStateTaxPct(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {stateTaxOptions.map(([label, rate]) => (
                  <option key={label} value={rate}>
                    {label} — {rate}%
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">{t.stateSalesTaxHint}</p>
          </div>
          {/* Doc fees */}
          <Field
            id="fees"
            label={t.docFees}
            icon={<DollarSign className="w-4 h-4 text-slate-400" />}
            value={fees}
            onChange={setFees}
            type="number"
            min="0"
            placeholder="500"
            hint={t.docFeesHint}
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={calculate}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
          >
            {t.calculateBtn}
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors cursor-pointer"
            title={t.resetTitle}
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
              label={t.monthlyPayment}
              value={fmt(results.monthlyPayment)}
              highlight
            />
            <Metric label={t.loanPrincipal} value={fmtShort(results.principal)} />
            <Metric label={t.totalInterest} value={fmtShort(results.totalInterest)} muted />
            <Metric label={t.totalCost} value={fmtShort(results.totalPaid)} />
          </div>

          {/* Visual bar: principal vs interest */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">
              {t.costBreakdown}
            </p>
            <div className="flex rounded-full overflow-hidden h-4">
              <div
                className="bg-primary-500"
                style={{
                  width: `${(results.principal / results.totalPaid) * 100}%`,
                }}
                title={`${t.principalLabel}: ${fmtShort(results.principal)}`}
              />
              <div
                className="bg-rose-400"
                style={{
                  width: `${(results.totalInterest / results.totalPaid) * 100}%`,
                }}
                title={`${t.interestLabel}: ${fmtShort(results.totalInterest)}`}
              />
            </div>
            <div className="flex gap-5 mt-2 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-primary-500 inline-block" />
                {t.principalLabel} {((results.principal / results.totalPaid) * 100).toFixed(1)}%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-rose-400 inline-block" />
                {t.interestLabel} {((results.totalInterest / results.totalPaid) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Tip */}
          {results.totalInterest > results.principal * 0.15 && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <TrendingDown className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <p>
                {t.interestTipPre}
                <strong>
                  {fmt(results.totalInterest)}{t.interestTipMid}
                </strong>
                {t.interestTipSuffix}
              </p>
            </div>
          )}

          {/* Amortization table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">{t.amortizationSchedule}</h3>
              <span className="text-xs text-slate-500">{term} {t.payments}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-medium">{t.colMonth}</th>
                    <th className="text-right px-4 py-2.5 font-medium">{t.colPayment}</th>
                    <th className="text-right px-4 py-2.5 font-medium">{t.colPrincipal}</th>
                    <th className="text-right px-4 py-2.5 font-medium">{t.colInterest}</th>
                    <th className="text-right px-4 py-2.5 font-medium">{t.colBalance}</th>
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
                              ···  {row.month - prevRow.month - 1} {t.paymentsOmitted}
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
                    <><ChevronUp className="w-3.5 h-3.5" /> {t.showLess}</>
                  ) : (
                    <><ChevronDown className="w-3.5 h-3.5" /> {t.showAll} {term} {t.rows}</>
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
