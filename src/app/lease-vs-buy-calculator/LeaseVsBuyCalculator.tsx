"use client";

import { useState, useCallback } from "react";
import {
  DollarSign,
  Percent,
  Calendar,
  RefreshCcw,
  TrendingUp,
  Car,
  Key,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Gauge,
  Info,
} from "lucide-react";
import type { Locale } from "@/i18n/config";

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

/* ─── Copy ───────────────────────────────────────────────── */

const COPY = {
  en: {
    vehicleSection: "Vehicle & Shared Inputs",
    msrpLabel: "Vehicle MSRP",
    msrpHint: "Manufacturer's sticker price — drives lease residual",
    priceLabel: "Negotiated Price",
    priceHint: "Selling price after discounts (cap cost when leasing)",
    downLabel: "Down Payment / Cap Reduction",
    downHint: "Cash upfront in either scenario",
    tradeLabel: "Trade-In Value",
    tradeHint: "Credit applied either direction",
    taxLabel: "Sales Tax Rate",
    taxHint: "State + local combined rate",
    termLabel: "Comparison Term",
    termHint: "Both lease and buy compared over this period",
    monthsSingular: "month",
    monthsPlural: "months",
    yearSingular: "year",
    yearPlural: "years",
    leaseSection: "Lease Inputs",
    moneyFactorLabel: "Money Factor",
    moneyFactorHint: "≈ APR ÷ 24",
    autoFillFromApr: "Auto-fill from APR",
    residualLabel: "Residual Value %",
    residualHint: "% of MSRP retained at lease end",
    acqLabel: "Acquisition Fee",
    acqHint: "Bank fee charged at lease start",
    dispLabel: "Disposition Fee",
    dispHint: "Charged at lease end if you don't buy/re-lease",
    mileageLabel: "Annual Mileage Allowance",
    mileageHint: (perMile: string) => `Overage charged at ${perMile}/mile`,
    mileageOption: (m: string) => `${m} miles/year`,
    buySection: "Buy Inputs",
    aprLabel: "APR (Annual Interest Rate)",
    aprHint: "From bank or credit union pre-approval",
    loanTermLabel: "Loan Term",
    loanTermHint: "Can extend beyond comparison term",
    estResaleTitle: "Estimated resale at end of term",
    estResaleBody: (pct: string, months: number) => (
      <>
        We estimate the car will retain <strong>{pct}%</strong> of its
        negotiated price after {months} months — this becomes your equity
        (resale value − loan balance).
      </>
    ),
    showAdvancedHide: "− Hide advanced options",
    showAdvancedShow: "+ Show advanced options",
    investLabel: "Investment Return %",
    investHint: "Opportunity cost on cash differences",
    actualMilesLabel: "Actual Annual Mileage",
    actualMilesHint: (perMile: string) =>
      `Used to estimate lease overage at ${perMile}/mi`,
    compareBtn: "Compare Lease vs Buy",
    resetTitle: "Reset",
    netAdvantageOver: (months: number) => `Net Advantage Over ${months} Months`,
    buyingSaves: (amt: string) => `Buying saves you ${amt}`,
    leasingSaves: (amt: string) => `Leasing saves you ${amt}`,
    tied: "Roughly a wash — both very close",
    verdictSub:
      "Compared as net cost (out-of-pocket minus asset value at end of term).",
    leaseCardTitle: "Lease",
    monthlyPayment: "Monthly payment",
    upfrontLease: "Upfront (down + tax + acq fee)",
    totalOfPayments: "Total of payments",
    dispAtEnd: "Disposition fee at end",
    mileageOverage: "Mileage overage",
    totalOOP: "Total out-of-pocket",
    assetAtEnd: "Asset at end of term",
    returnCar: "$0 — return car",
    capCostLabel: "Cap cost",
    residualLabelShort: "Residual",
    depFeeLabel: "Depreciation fee",
    finChargeLabel: "Finance charge",
    perMo: "/mo",
    buyCardTitle: "Buy",
    upfrontBuy: "Upfront (down + tax)",
    paymentsOver: (months: number) => `Payments over ${months} mo`,
    interestPaid: "Interest paid in window",
    estEquity: "Estimated equity at end",
    netCostOwn: "Net cost of ownership",
    loanAmountLabel: "Loan amount",
    aprShort: "APR",
    termShort: "Term",
    moShort: "mo",
    totalCostComparison: "Total Cost Comparison",
    leaseTotalCostBar: "Lease total cost",
    buyOOPBar: "Buy out-of-pocket",
    buyNetBar: "Buy net (after equity)",
    overageWarnTitle: "You drive more than your lease allowance",
    overageWarnBody: (actual: string, allowance: string, charge: string) => (
      <>
        At {actual} mi/yr vs a {allowance} mi/yr cap, expect{" "}
        <strong>{charge}</strong> in overage charges at lease end. Consider
        buying or pre-paying for higher miles.
      </>
    ),
    yearByYearTitle: "Year-by-Year Cumulative Cost",
    yearsLabel: (n: number) => `${n} years`,
    yearCol: "Year",
    leaseCumCol: "Lease (cum.)",
    buyCumCol: "Buy (cum.)",
    diffCol: "Difference",
    yearRow: (n: number) => `Year ${n}`,
    buyAhead: (amt: string) => `Buy ahead ${amt}`,
    leaseAhead: (amt: string) => `Lease ahead ${amt}`,
    leaseProsConsTitle: "Lease — Pros & Cons",
    buyProsConsTitle: "Buy — Pros & Cons",
    prosLabel: "Pros",
    consLabel: "Cons",
    leasePros: (monthly: string) => [
      `Lower monthly payment (${monthly})`,
      "New car every few years with full warranty",
      "No resale hassle — just hand the keys back",
      "Often qualifies for manufacturer incentives",
    ],
    leaseCons: (totalCost: string, allowance: string) => [
      `${totalCost} out-of-pocket with $0 asset at end`,
      `Mileage cap of ${allowance} mi/yr`,
      "Wear-and-tear chargebacks at turn-in",
      "Heavy fees to terminate early",
    ],
    buyPros: (equity: string) => [
      `Build ${equity} in equity over the term`,
      "No mileage limits — drive as much as you want",
      "Free to modify, sell, or keep long-term",
      "Once paid off, costs drop to insurance + maintenance",
    ],
    buyCons: (monthly: string, interest: string) => [
      `Higher monthly payment (${monthly})`,
      `${interest} in interest over the comparison window`,
      "Depreciation risk — value drops fastest in years 1–3",
      "You handle resale or trade-in when ready to upgrade",
    ],
  },
  es: {
    vehicleSection: "Vehículo e insumos compartidos",
    msrpLabel: "MSRP del vehículo",
    msrpHint: "Precio de etiqueta del fabricante — define el valor residual del lease",
    priceLabel: "Precio negociado",
    priceHint: "Precio de venta tras descuentos (costo capitalizado al arrendar)",
    downLabel: "Pago inicial / reducción de cap cost",
    downHint: "Efectivo por adelantado en cualquier escenario",
    tradeLabel: "Valor de auto a cambio",
    tradeHint: "Crédito aplicado en cualquier dirección",
    taxLabel: "Tasa de impuesto sobre la venta",
    taxHint: "Tasa combinada estatal + local",
    termLabel: "Plazo de comparación",
    termHint: "Lease y compra se comparan en este mismo período",
    monthsSingular: "mes",
    monthsPlural: "meses",
    yearSingular: "año",
    yearPlural: "años",
    leaseSection: "Insumos del lease",
    moneyFactorLabel: "Factor de dinero",
    moneyFactorHint: "≈ APR ÷ 24",
    autoFillFromApr: "Auto-llenar desde APR",
    residualLabel: "Valor residual %",
    residualHint: "% del MSRP retenido al final del lease",
    acqLabel: "Cargo de adquisición",
    acqHint: "Cargo del banco al inicio del lease",
    dispLabel: "Cargo de disposición",
    dispHint: "Se cobra al final si no compras / re-arriendas",
    mileageLabel: "Asignación anual de kilometraje",
    mileageHint: (perMile: string) => `Exceso cobrado a ${perMile}/milla`,
    mileageOption: (m: string) => `${m} millas/año`,
    buySection: "Insumos de compra",
    aprLabel: "APR (tasa de interés anual)",
    aprHint: "De pre-aprobación de banco o cooperativa de crédito",
    loanTermLabel: "Plazo del préstamo",
    loanTermHint: "Puede extenderse más allá del plazo de comparación",
    estResaleTitle: "Reventa estimada al final del plazo",
    estResaleBody: (pct: string, months: number) => (
      <>
        Estimamos que el auto conservará <strong>{pct}%</strong> de su precio
        negociado tras {months} meses — esto se convierte en tu plusvalía
        (valor de reventa − saldo del préstamo).
      </>
    ),
    showAdvancedHide: "− Ocultar opciones avanzadas",
    showAdvancedShow: "+ Mostrar opciones avanzadas",
    investLabel: "Retorno de inversión %",
    investHint: "Costo de oportunidad sobre diferencias de efectivo",
    actualMilesLabel: "Kilometraje anual real",
    actualMilesHint: (perMile: string) =>
      `Usado para estimar el exceso del lease a ${perMile}/mi`,
    compareBtn: "Comparar lease vs comprar",
    resetTitle: "Reiniciar",
    netAdvantageOver: (months: number) =>
      `Ventaja neta en ${months} meses`,
    buyingSaves: (amt: string) => `Comprar te ahorra ${amt}`,
    leasingSaves: (amt: string) => `Arrendar te ahorra ${amt}`,
    tied: "Prácticamente empate — ambos muy parecidos",
    verdictSub:
      "Comparado como costo neto (gasto total menos valor del activo al final del plazo).",
    leaseCardTitle: "Lease",
    monthlyPayment: "Pago mensual",
    upfrontLease: "Inicial (pago + impuesto + adquisición)",
    totalOfPayments: "Total de pagos",
    dispAtEnd: "Cargo de disposición al final",
    mileageOverage: "Exceso de kilometraje",
    totalOOP: "Gasto total de bolsillo",
    assetAtEnd: "Activo al final del plazo",
    returnCar: "$0 — devuelves el auto",
    capCostLabel: "Costo capitalizado",
    residualLabelShort: "Residual",
    depFeeLabel: "Cargo de depreciación",
    finChargeLabel: "Cargo de financiamiento",
    perMo: "/mes",
    buyCardTitle: "Comprar",
    upfrontBuy: "Inicial (pago + impuesto)",
    paymentsOver: (months: number) => `Pagos en ${months} meses`,
    interestPaid: "Interés pagado en el período",
    estEquity: "Plusvalía estimada al final",
    netCostOwn: "Costo neto de propiedad",
    loanAmountLabel: "Monto del préstamo",
    aprShort: "APR",
    termShort: "Plazo",
    moShort: "meses",
    totalCostComparison: "Comparación de costo total",
    leaseTotalCostBar: "Costo total del lease",
    buyOOPBar: "Compra — gasto de bolsillo",
    buyNetBar: "Compra neta (tras plusvalía)",
    overageWarnTitle: "Conduces más que tu asignación del lease",
    overageWarnBody: (actual: string, allowance: string, charge: string) => (
      <>
        A {actual} mi/año contra un tope de {allowance} mi/año, espera{" "}
        <strong>{charge}</strong> en cargos de exceso al final del lease.
        Considera comprar o pre-pagar más millas.
      </>
    ),
    yearByYearTitle: "Costo acumulado año por año",
    yearsLabel: (n: number) => `${n} años`,
    yearCol: "Año",
    leaseCumCol: "Lease (acum.)",
    buyCumCol: "Compra (acum.)",
    diffCol: "Diferencia",
    yearRow: (n: number) => `Año ${n}`,
    buyAhead: (amt: string) => `Compra adelante ${amt}`,
    leaseAhead: (amt: string) => `Lease adelante ${amt}`,
    leaseProsConsTitle: "Lease — Pros y contras",
    buyProsConsTitle: "Comprar — Pros y contras",
    prosLabel: "Pros",
    consLabel: "Contras",
    leasePros: (monthly: string) => [
      `Pago mensual más bajo (${monthly})`,
      "Auto nuevo cada pocos años con garantía completa",
      "Sin molestias de reventa — solo entregas las llaves",
      "A menudo califica para incentivos del fabricante",
    ],
    leaseCons: (totalCost: string, allowance: string) => [
      `${totalCost} de bolsillo con $0 de activo al final`,
      `Tope de kilometraje de ${allowance} mi/año`,
      "Cargos por desgaste al devolver el auto",
      "Cargos fuertes por terminar antes",
    ],
    buyPros: (equity: string) => [
      `Construyes ${equity} en plusvalía durante el plazo`,
      "Sin límites de kilometraje — conduce lo que quieras",
      "Libre de modificar, vender o conservar a largo plazo",
      "Una vez pagado, los costos bajan a seguro + mantenimiento",
    ],
    buyCons: (monthly: string, interest: string) => [
      `Pago mensual más alto (${monthly})`,
      `${interest} en intereses durante el período de comparación`,
      "Riesgo de depreciación — el valor cae más rápido en los años 1–3",
      "Tú manejas la reventa o el cambio cuando estés listo para actualizar",
    ],
  },
  fr: {
    vehicleSection: "Véhicule et entrées partagées",
    msrpLabel: "MSRP du véhicule",
    msrpHint: "Prix de vente conseillé du constructeur — détermine la valeur résiduelle du leasing",
    priceLabel: "Prix négocié",
    priceHint: "Prix de vente après remises (coût capitalisé en leasing)",
    downLabel: "Acompte / réduction de coût capitalisé",
    downHint: "Espèces d'avance dans les deux scénarios",
    tradeLabel: "Valeur de reprise",
    tradeHint: "Crédit appliqué dans les deux sens",
    taxLabel: "Taux de taxe de vente",
    taxHint: "Taux combiné état + local",
    termLabel: "Durée de comparaison",
    termHint: "Leasing et achat comparés sur cette période",
    monthsSingular: "mois",
    monthsPlural: "mois",
    yearSingular: "an",
    yearPlural: "ans",
    leaseSection: "Entrées du leasing",
    moneyFactorLabel: "Money factor",
    moneyFactorHint: "≈ APR ÷ 24",
    autoFillFromApr: "Auto-remplir depuis l'APR",
    residualLabel: "Valeur résiduelle %",
    residualHint: "% du MSRP retenu à la fin du leasing",
    acqLabel: "Frais d'acquisition",
    acqHint: "Frais bancaires au début du leasing",
    dispLabel: "Frais de disposition",
    dispHint: "Facturés à la fin si tu n'achètes pas / ne re-loues pas",
    mileageLabel: "Allocation kilométrique annuelle",
    mileageHint: (perMile: string) => `Dépassement facturé à ${perMile}/mile`,
    mileageOption: (m: string) => `${m} miles/an`,
    buySection: "Entrées d'achat",
    aprLabel: "APR (taux d'intérêt annuel)",
    aprHint: "De la pré-approbation de banque ou coopérative de crédit",
    loanTermLabel: "Durée du prêt",
    loanTermHint: "Peut s'étendre au-delà de la durée de comparaison",
    estResaleTitle: "Revente estimée à la fin de la durée",
    estResaleBody: (pct: string, months: number) => (
      <>
        Nous estimons que la voiture conservera <strong>{pct}%</strong> de son
        prix négocié après {months} mois — cela devient ta plus-value
        (valeur de revente − solde du prêt).
      </>
    ),
    showAdvancedHide: "− Masquer les options avancées",
    showAdvancedShow: "+ Afficher les options avancées",
    investLabel: "Rendement d'investissement %",
    investHint: "Coût d'opportunité sur les différences d'espèces",
    actualMilesLabel: "Kilométrage annuel réel",
    actualMilesHint: (perMile: string) =>
      `Utilisé pour estimer le dépassement de leasing à ${perMile}/mi`,
    compareBtn: "Comparer leasing vs achat",
    resetTitle: "Réinitialiser",
    netAdvantageOver: (months: number) => `Avantage net sur ${months} mois`,
    buyingSaves: (amt: string) => `Acheter te fait économiser ${amt}`,
    leasingSaves: (amt: string) => `Louer te fait économiser ${amt}`,
    tied: "À peu près équivalent — les deux très proches",
    verdictSub:
      "Comparé en coût net (dépenses moins valeur de l'actif à la fin de la durée).",
    leaseCardTitle: "Leasing",
    monthlyPayment: "Paiement mensuel",
    upfrontLease: "Initial (acompte + taxe + frais d'acquisition)",
    totalOfPayments: "Total des paiements",
    dispAtEnd: "Frais de disposition à la fin",
    mileageOverage: "Dépassement kilométrique",
    totalOOP: "Total déboursé",
    assetAtEnd: "Actif à la fin de la durée",
    returnCar: "$0 — rendre la voiture",
    capCostLabel: "Coût capitalisé",
    residualLabelShort: "Résiduel",
    depFeeLabel: "Frais de dépréciation",
    finChargeLabel: "Charge financière",
    perMo: "/mois",
    buyCardTitle: "Acheter",
    upfrontBuy: "Initial (acompte + taxe)",
    paymentsOver: (months: number) => `Paiements sur ${months} mois`,
    interestPaid: "Intérêts payés sur la période",
    estEquity: "Plus-value estimée à la fin",
    netCostOwn: "Coût net de propriété",
    loanAmountLabel: "Montant du prêt",
    aprShort: "APR",
    termShort: "Durée",
    moShort: "mois",
    totalCostComparison: "Comparaison du coût total",
    leaseTotalCostBar: "Coût total du leasing",
    buyOOPBar: "Achat — déboursé",
    buyNetBar: "Achat net (après plus-value)",
    overageWarnTitle: "Tu conduis plus que ton allocation de leasing",
    overageWarnBody: (actual: string, allowance: string, charge: string) => (
      <>
        À {actual} mi/an contre un plafond de {allowance} mi/an, attends-toi
        à <strong>{charge}</strong> de frais de dépassement à la fin du
        leasing. Envisage d'acheter ou de pré-payer pour plus de miles.
      </>
    ),
    yearByYearTitle: "Coût cumulé année par année",
    yearsLabel: (n: number) => `${n} ans`,
    yearCol: "Année",
    leaseCumCol: "Leasing (cum.)",
    buyCumCol: "Achat (cum.)",
    diffCol: "Différence",
    yearRow: (n: number) => `Année ${n}`,
    buyAhead: (amt: string) => `Achat en avance de ${amt}`,
    leaseAhead: (amt: string) => `Leasing en avance de ${amt}`,
    leaseProsConsTitle: "Leasing — Pour et contre",
    buyProsConsTitle: "Acheter — Pour et contre",
    prosLabel: "Pour",
    consLabel: "Contre",
    leasePros: (monthly: string) => [
      `Paiement mensuel plus bas (${monthly})`,
      "Voiture neuve tous les quelques années avec garantie complète",
      "Pas de tracas de revente — tu rends simplement les clés",
      "Souvent éligible aux incitations du constructeur",
    ],
    leaseCons: (totalCost: string, allowance: string) => [
      `${totalCost} déboursés avec $0 d'actif à la fin`,
      `Plafond kilométrique de ${allowance} mi/an`,
      "Refacturations pour usure à la restitution",
      "Lourds frais pour résiliation anticipée",
    ],
    buyPros: (equity: string) => [
      `Construis ${equity} de plus-value sur la durée`,
      "Pas de limite kilométrique — conduis autant que tu veux",
      "Libre de modifier, vendre ou garder à long terme",
      "Une fois remboursée, les coûts tombent à assurance + entretien",
    ],
    buyCons: (monthly: string, interest: string) => [
      `Paiement mensuel plus élevé (${monthly})`,
      `${interest} d'intérêts sur la fenêtre de comparaison`,
      "Risque de dépréciation — la valeur chute le plus vite dans les années 1 à 3",
      "Tu gères la revente ou la reprise quand tu es prêt à passer à autre chose",
    ],
  },
} as const;

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

interface Props {
  locale?: Locale;
}

/* ─── Component ──────────────────────────────────────────── */

export default function LeaseVsBuyCalculator({ locale = "en" }: Props) {
  const c = COPY[locale];

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
              {c.vehicleSection}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              id="msrp"
              label={c.msrpLabel}
              icon={<DollarSign className="w-4 h-4 text-slate-400" />}
              value={msrp}
              onChange={setMsrp}
              type="number"
              min="0"
              placeholder="38,000"
              hint={c.msrpHint}
            />
            <Field
              id="price"
              label={c.priceLabel}
              icon={<DollarSign className="w-4 h-4 text-slate-400" />}
              value={price}
              onChange={setPrice}
              type="number"
              min="0"
              placeholder="36,000"
              hint={c.priceHint}
            />
            <Field
              id="down"
              label={c.downLabel}
              icon={<DollarSign className="w-4 h-4 text-slate-400" />}
              value={downPayment}
              onChange={setDownPayment}
              type="number"
              min="0"
              placeholder="3,000"
              hint={c.downHint}
            />
            <Field
              id="trade"
              label={c.tradeLabel}
              icon={<DollarSign className="w-4 h-4 text-slate-400" />}
              value={tradeIn}
              onChange={setTradeIn}
              type="number"
              min="0"
              placeholder="0"
              hint={c.tradeHint}
            />
            <Field
              id="tax"
              label={c.taxLabel}
              icon={<Percent className="w-4 h-4 text-slate-400" />}
              value={taxRate}
              onChange={setTaxRate}
              type="number"
              min="0"
              step="0.1"
              placeholder="6"
              hint={c.taxHint}
            />
            <div>
              <label
                htmlFor="term"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
              >
                {c.termLabel}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  id="term"
                  value={term}
                  onChange={(e) => handleTermChange(Number(e.target.value))}
                  className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {TERM_OPTIONS.map((t) => {
                    const years = (t / 12).toFixed(t % 12 === 0 ? 0 : 1);
                    const yearWord =
                      t === 12 ? c.yearSingular : c.yearPlural;
                    return (
                      <option key={t} value={t}>
                        {t} {c.monthsPlural} ({years} {yearWord})
                      </option>
                    );
                  })}
                </select>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">{c.termHint}</p>
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
                {c.leaseSection}
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label
                  htmlFor="mf"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                >
                  {c.moneyFactorLabel}
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
                  <p className="text-[11px] text-slate-500">{c.moneyFactorHint}</p>
                  <button
                    type="button"
                    onClick={fillMfFromApr}
                    className="text-[11px] font-bold text-primary-600 hover:text-primary-700 cursor-pointer"
                  >
                    {c.autoFillFromApr}
                  </button>
                </div>
              </div>
              <Field
                id="residual"
                label={c.residualLabel}
                icon={<Percent className="w-4 h-4 text-slate-400" />}
                value={residualPct}
                onChange={setResidualPct}
                type="number"
                min="0"
                step="1"
                placeholder="55"
                hint={c.residualHint}
              />
              <Field
                id="acq"
                label={c.acqLabel}
                icon={<DollarSign className="w-4 h-4 text-slate-400" />}
                value={acquisitionFee}
                onChange={setAcquisitionFee}
                type="number"
                min="0"
                placeholder="695"
                hint={c.acqHint}
              />
              <Field
                id="disp"
                label={c.dispLabel}
                icon={<DollarSign className="w-4 h-4 text-slate-400" />}
                value={dispositionFee}
                onChange={setDispositionFee}
                type="number"
                min="0"
                placeholder="395"
                hint={c.dispHint}
              />
              <div>
                <label
                  htmlFor="miles"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                >
                  {c.mileageLabel}
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
                        {c.mileageOption(m.toLocaleString())}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  {c.mileageHint(`$${OVERAGE_PER_MILE}`)}
                </p>
              </div>
            </div>
          </div>

          {/* Buy side */}
          <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/40 p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wide">
                {c.buySection}
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <Field
                id="apr"
                label={c.aprLabel}
                icon={<Percent className="w-4 h-4 text-slate-400" />}
                value={apr}
                onChange={setApr}
                type="number"
                min="0"
                step="0.1"
                placeholder="6.5"
                hint={c.aprHint}
              />
              <div>
                <label
                  htmlFor="loanterm"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
                >
                  {c.loanTermLabel}
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
                        {t} {c.monthsPlural} ({(t / 12).toFixed(t % 12 === 0 ? 0 : 1)}{" "}
                        {c.yearPlural})
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  {c.loanTermHint}
                </p>
              </div>
              <div className="rounded-xl bg-white border border-emerald-100 p-3.5 text-xs text-slate-600 leading-relaxed">
                <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-emerald-600" /> {c.estResaleTitle}
                </p>
                <p>
                  {c.estResaleBody(
                    ((BUY_RESIDUAL_TABLE[term] ?? 0.5) * 100).toFixed(0),
                    term,
                  )}
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
            {showAdvanced ? c.showAdvancedHide : c.showAdvancedShow}
          </button>
          {showAdvanced && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                id="invest"
                label={c.investLabel}
                icon={<Percent className="w-4 h-4 text-slate-400" />}
                value={investReturn}
                onChange={setInvestReturn}
                type="number"
                min="0"
                step="0.1"
                placeholder="6"
                hint={c.investHint}
              />
              <Field
                id="actualmiles"
                label={c.actualMilesLabel}
                icon={<Gauge className="w-4 h-4 text-slate-400" />}
                value={actualMileage}
                onChange={setActualMileage}
                type="number"
                min="0"
                step="500"
                placeholder="12,000"
                hint={c.actualMilesHint(`$${OVERAGE_PER_MILE}`)}
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
            {c.compareBtn}
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors cursor-pointer"
            title={c.resetTitle}
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
              {c.netAdvantageOver(results.termMonths)}
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold">
              {verdict === "buy" &&
                c.buyingSaves(fmtShort(results.netAdvantage))}
              {verdict === "lease" &&
                c.leasingSaves(fmtShort(Math.abs(results.netAdvantage)))}
              {verdict === "tied" && c.tied}
            </p>
            <p className="mt-2 text-sm opacity-90">{c.verdictSub}</p>
          </div>

          {/* Side-by-side comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Lease card */}
            <div className="bg-white border-2 border-blue-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Key className="w-5 h-5 text-blue-600" />
                <h4 className="text-base font-bold text-blue-900">{c.leaseCardTitle}</h4>
              </div>
              <ComparisonRow
                label={c.monthlyPayment}
                value={fmt(results.lease.monthly)}
                highlight
              />
              <ComparisonRow
                label={c.upfrontLease}
                value={fmtShort(results.lease.upfront)}
              />
              <ComparisonRow
                label={c.totalOfPayments}
                value={fmtShort(results.lease.totalPayments)}
              />
              <ComparisonRow
                label={c.dispAtEnd}
                value={fmtShort(num(dispositionFee))}
              />
              {results.lease.overageCharge > 0 && (
                <ComparisonRow
                  label={c.mileageOverage}
                  value={fmtShort(results.lease.overageCharge)}
                  warn
                />
              )}
              <div className="border-t border-slate-200 my-3" />
              <ComparisonRow
                label={c.totalOOP}
                value={fmtShort(results.lease.totalCost)}
                bold
              />
              <ComparisonRow
                label={c.assetAtEnd}
                value={c.returnCar}
                muted
              />
              <div className="mt-3 rounded-xl bg-blue-50 border border-blue-100 p-3 text-xs text-blue-900 leading-relaxed">
                <p>
                  {c.capCostLabel} <strong>{fmtShort(results.lease.capCost)}</strong> ·{" "}
                  {c.residualLabelShort} <strong>{fmtShort(results.lease.residual)}</strong>
                </p>
                <p className="mt-1">
                  {c.depFeeLabel}{" "}
                  <strong>{fmt(results.lease.depreciationFee)}{c.perMo}</strong> ·{" "}
                  {c.finChargeLabel}{" "}
                  <strong>{fmt(results.lease.financeCharge)}{c.perMo}</strong>
                </p>
              </div>
            </div>

            {/* Buy card */}
            <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <h4 className="text-base font-bold text-emerald-900">{c.buyCardTitle}</h4>
              </div>
              <ComparisonRow
                label={c.monthlyPayment}
                value={fmt(results.buy.monthly)}
                highlight
              />
              <ComparisonRow
                label={c.upfrontBuy}
                value={fmtShort(
                  num(downPayment) +
                    (num(price) - num(tradeIn)) * (num(taxRate) / 100),
                )}
              />
              <ComparisonRow
                label={c.paymentsOver(results.termMonths)}
                value={fmtShort(results.buy.totalPaid)}
              />
              <ComparisonRow
                label={c.interestPaid}
                value={fmtShort(results.buy.totalInterest)}
                warn
              />
              <div className="border-t border-slate-200 my-3" />
              <ComparisonRow
                label={c.totalOOP}
                value={fmtShort(results.buy.outOfPocket)}
                bold
              />
              <ComparisonRow
                label={c.estEquity}
                value={fmtShort(results.buy.equityAtEnd)}
                positive
              />
              <ComparisonRow
                label={c.netCostOwn}
                value={fmtShort(results.buy.netCost)}
                bold
              />
              <div className="mt-3 rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-xs text-emerald-900 leading-relaxed">
                <p>
                  {c.loanAmountLabel}{" "}
                  <strong>{fmtShort(results.buy.loanAmount)}</strong> · {c.aprShort}{" "}
                  <strong>{apr}%</strong> · {c.termShort}{" "}
                  <strong>{loanTerm} {c.moShort}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Comparison bar chart */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-4">
              {c.totalCostComparison}
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
                    label={c.leaseTotalCostBar}
                    pct={leaseW}
                    color="bg-blue-500"
                    valueLabel={fmtShort(results.lease.totalCost)}
                  />
                  <BarRow
                    label={c.buyOOPBar}
                    pct={buyW}
                    color="bg-emerald-500"
                    valueLabel={fmtShort(results.buy.outOfPocket)}
                  />
                  <BarRow
                    label={c.buyNetBar}
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
                <p className="font-bold">{c.overageWarnTitle}</p>
                <p className="mt-1">
                  {c.overageWarnBody(
                    num(actualMileage).toLocaleString(),
                    mileageAllowance.toLocaleString(),
                    fmtShort(results.lease.overageCharge),
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Year-by-year table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {c.yearByYearTitle}
              </h3>
              <span className="text-xs text-slate-500">
                {c.yearsLabel(results.yearTable.length)}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-medium">{c.yearCol}</th>
                    <th className="text-right px-4 py-2.5 font-medium">
                      {c.leaseCumCol}
                    </th>
                    <th className="text-right px-4 py-2.5 font-medium">
                      {c.buyCumCol}
                    </th>
                    <th className="text-right px-4 py-2.5 font-medium">
                      {c.diffCol}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.yearTable.map((row) => {
                    const diff = row.leaseCum - row.buyCum;
                    return (
                      <tr key={row.year}>
                        <td className="px-4 py-2.5 text-slate-700 font-medium">
                          {c.yearRow(row.year)}
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
                            ? c.buyAhead(fmt(diff))
                            : c.leaseAhead(fmt(Math.abs(diff)))}
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
              title={c.leaseProsConsTitle}
              accent="blue"
              prosLabel={c.prosLabel}
              consLabel={c.consLabel}
              pros={c.leasePros(fmt(results.lease.monthly))}
              cons={c.leaseCons(
                fmtShort(results.lease.totalCost),
                mileageAllowance.toLocaleString(),
              )}
            />
            <ProsConsCard
              title={c.buyProsConsTitle}
              accent="emerald"
              prosLabel={c.prosLabel}
              consLabel={c.consLabel}
              pros={c.buyPros(fmtShort(results.buy.equityAtEnd))}
              cons={c.buyCons(
                fmt(results.buy.monthly),
                fmtShort(results.buy.totalInterest),
              )}
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
  prosLabel,
  consLabel,
}: {
  title: string;
  accent: "blue" | "emerald";
  pros: readonly string[];
  cons: readonly string[];
  prosLabel: string;
  consLabel: string;
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
            {prosLabel}
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
            {consLabel}
          </p>
          <ul className="space-y-1.5">
            {cons.map((cc) => (
              <li key={cc} className="flex items-start gap-1.5 text-xs text-slate-700">
                <XCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>{cc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
