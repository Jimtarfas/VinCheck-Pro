"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  DollarSign,
  Gauge,
  Car,
  RefreshCcw,
  TrendingDown,
  Info,
  ArrowRight,
  Calculator,
} from "lucide-react";
import type { Locale } from "@/i18n/config";

/* ─── 17c reference tables ───────────────────────────────────
   The "17c" formula comes from Mabry v. State Farm (Georgia) and
   is the method most insurers actually use to compute a diminished
   value offer. It deliberately understates real-world loss — we
   show it because it's the number to negotiate against, then pair
   it with a market-based range that reflects what dealers and
   appraisers actually discount a wrecked-history car. */

// Damage severity multiplier (applied to the 10% base cap)
const DAMAGE_LEVELS = [
  {
    id: "severe",
    mult: 1.0,
    marketLow: 0.2,
    marketHigh: 0.25,
  },
  {
    id: "major",
    mult: 0.75,
    marketLow: 0.15,
    marketHigh: 0.2,
  },
  {
    id: "moderate",
    mult: 0.5,
    marketLow: 0.1,
    marketHigh: 0.15,
  },
  {
    id: "minor",
    mult: 0.25,
    marketLow: 0.05,
    marketHigh: 0.1,
  },
  {
    id: "none",
    mult: 0.0,
    marketLow: 0.0,
    marketHigh: 0.03,
  },
] as const;

type DamageId = (typeof DAMAGE_LEVELS)[number]["id"];

// Mileage multiplier per 17c
const MILEAGE_BANDS = [
  { max: 19999, mult: 1.0, labelKey: "band1" },
  { max: 39999, mult: 0.8, labelKey: "band2" },
  { max: 59999, mult: 0.6, labelKey: "band3" },
  { max: 79999, mult: 0.4, labelKey: "band4" },
  { max: 99999, mult: 0.2, labelKey: "band5" },
  { max: Infinity, mult: 0.0, labelKey: "band6" },
] as const;

type MileageBandKey = (typeof MILEAGE_BANDS)[number]["labelKey"];

function mileageMultiplier(miles: number) {
  return (
    MILEAGE_BANDS.find((b) => miles <= b.max) ??
    MILEAGE_BANDS[MILEAGE_BANDS.length - 1]
  );
}

const COPY = {
  en: {
    fmvLabel: "Pre-accident Market Value",
    fmvHelp: "Clean retail value the day before the crash (KBB / NADA).",
    milesLabel: "Odometer at Time of Accident",
    milesHelp: "Higher mileage lowers the 17c mileage multiplier.",
    damageLabel: "Damage Severity",
    damageLevels: {
      severe: { label: "Severe — structural / frame", note: "Frame, unibody, or airbag deployment. Largest stigma." },
      major: { label: "Major — panel replacement", note: "Replaced panels, suspension, or major bodywork." },
      moderate: { label: "Moderate — normal repairable", note: "Typical collision repair, bolt-on parts." },
      minor: { label: "Minor — cosmetic", note: "Scratches, dents, bumper scuffs only." },
      none: { label: "No structural damage", note: "Repaired with no lasting impact recorded." },
    },
    mileageBands: {
      band1: "0 – 19,999 mi",
      band2: "20,000 – 39,999 mi",
      band3: "40,000 – 59,999 mi",
      band4: "60,000 – 79,999 mi",
      band5: "80,000 – 99,999 mi",
      band6: "100,000+ mi",
    },
    calcBtn: "Calculate Diminished Value",
    resetTitle: "Reset",
    headlineEyebrow: "17c Diminished Value (insurer formula)",
    headlineFormulaPre: " value × 10% cap × ",
    headlineFormulaMid: " damage × ",
    headlineFormulaSuffix: " mileage",
    breakdownTitle: "How the 17c Number Is Built",
    breakdownFmv: "Pre-accident market value",
    breakdownBase: "Base loss cap (10% of value)",
    breakdownDamage: "× Damage multiplier",
    breakdownMileagePre: "× Mileage multiplier (",
    breakdownMileageSuffix: ")",
    breakdown17c: "17c diminished value",
    marketHeadPre: "Realistic market loss: ",
    marketBodyPre: "The 17c formula almost always under-states actual loss because it caps the base at 10% and stacks two reducing multipliers. Independent appraisers and dealers typically discount a car with a recorded accident by ",
    marketBodyOf: "of pre-accident value. Use the higher figure as the basis for a third-party (or your own insurer's) diminished value claim, backed by an independent appraisal.",
    disclaimer: "This is an estimate for negotiation and education, not a legal appraisal. Actual recovery depends on your state, who was at fault, your policy, and a licensed appraiser's report. First-party DV claims are barred in some states; third-party (the at-fault driver's insurer) claims are widely available.",
    ctaTextPre: "Documenting a claim? ",
    ctaTextBold: "Pull the accident record on the VIN.",
    ctaBtn: "Accident Check",
    emptyState: "Enter your numbers above and hit calculate to see both the 17c insurer figure and the realistic market loss range.",
    fmvPlaceholder: "25,000",
    milesPlaceholder: "45,000",
    currencyLocale: "en-US",
  },
  es: {
    fmvLabel: "Valor de mercado previo al accidente",
    fmvHelp: "Valor minorista limpio del día anterior al choque (KBB / NADA).",
    milesLabel: "Odómetro al momento del accidente",
    milesHelp: "Mayor kilometraje reduce el multiplicador de kilometraje 17c.",
    damageLabel: "Gravedad del daño",
    damageLevels: {
      severe: { label: "Severo — estructural / chasis", note: "Chasis, unibody o despliegue de bolsa de aire. Mayor estigma." },
      major: { label: "Mayor — reemplazo de paneles", note: "Paneles reemplazados, suspensión o carrocería mayor." },
      moderate: { label: "Moderado — reparable normal", note: "Reparación típica de colisión, piezas atornilladas." },
      minor: { label: "Menor — cosmético", note: "Solo rayones, abolladuras, raspones de parachoques." },
      none: { label: "Sin daño estructural", note: "Reparado sin impacto duradero registrado." },
    },
    mileageBands: {
      band1: "0 – 19,999 mi",
      band2: "20,000 – 39,999 mi",
      band3: "40,000 – 59,999 mi",
      band4: "60,000 – 79,999 mi",
      band5: "80,000 – 99,999 mi",
      band6: "100,000+ mi",
    },
    calcBtn: "Calcular valor disminuido",
    resetTitle: "Reiniciar",
    headlineEyebrow: "Valor disminuido 17c (fórmula de la aseguradora)",
    headlineFormulaPre: " valor × tope 10% × ",
    headlineFormulaMid: " daño × ",
    headlineFormulaSuffix: " kilometraje",
    breakdownTitle: "Cómo se construye la cifra 17c",
    breakdownFmv: "Valor de mercado previo al accidente",
    breakdownBase: "Tope de pérdida base (10% del valor)",
    breakdownDamage: "× Multiplicador de daño",
    breakdownMileagePre: "× Multiplicador de kilometraje (",
    breakdownMileageSuffix: ")",
    breakdown17c: "Valor disminuido 17c",
    marketHeadPre: "Pérdida de mercado realista: ",
    marketBodyPre: "La fórmula 17c casi siempre subestima la pérdida real porque limita la base al 10% y apila dos multiplicadores reductores. Tasadores y concesionarios independientes típicamente descuentan un auto con un accidente registrado en ",
    marketBodyOf: "del valor previo al accidente. Usa la cifra más alta como base para un reclamo de valor disminuido de terceros (o de tu propia aseguradora), respaldado por una tasación independiente.",
    disclaimer: "Esto es una estimación para negociación y educación, no una tasación legal. La recuperación real depende de tu estado, quién fue responsable, tu póliza y el reporte de un tasador con licencia. Los reclamos de valor disminuido de primera parte están prohibidos en algunos estados; los reclamos de terceros (la aseguradora del conductor responsable) están ampliamente disponibles.",
    ctaTextPre: "¿Documentando un reclamo? ",
    ctaTextBold: "Saca el registro de accidente del VIN.",
    ctaBtn: "Verificar accidentes",
    emptyState: "Ingresa tus números arriba y presiona calcular para ver tanto la cifra 17c de la aseguradora como el rango realista de pérdida de mercado.",
    fmvPlaceholder: "25,000",
    milesPlaceholder: "45,000",
    currencyLocale: "es-US",
  },
  fr: {
    fmvLabel: "Valeur marchande avant accident",
    fmvHelp: "Valeur de détail la veille du choc (KBB / NADA).",
    milesLabel: "Odomètre au moment de l'accident",
    milesHelp: "Un kilométrage plus élevé réduit le multiplicateur 17c.",
    damageLabel: "Gravité des dommages",
    damageLevels: {
      severe: { label: "Sévère — structurel / châssis", note: "Châssis, monocoque ou déploiement d'airbag. Le plus gros stigmate." },
      major: { label: "Majeur — remplacement de panneau", note: "Panneaux remplacés, suspension ou grosse carrosserie." },
      moderate: { label: "Modéré — réparable normal", note: "Réparation typique de collision, pièces boulonnées." },
      minor: { label: "Mineur — cosmétique", note: "Rayures, bosses, éraflures de pare-chocs uniquement." },
      none: { label: "Aucun dommage structurel", note: "Réparé sans impact durable enregistré." },
    },
    mileageBands: {
      band1: "0 – 19 999 mi",
      band2: "20 000 – 39 999 mi",
      band3: "40 000 – 59 999 mi",
      band4: "60 000 – 79 999 mi",
      band5: "80 000 – 99 999 mi",
      band6: "100 000+ mi",
    },
    calcBtn: "Calculer la moins-value",
    resetTitle: "Réinitialiser",
    headlineEyebrow: "Moins-value 17c (formule de l'assureur)",
    headlineFormulaPre: " valeur × plafond 10% × ",
    headlineFormulaMid: " dommages × ",
    headlineFormulaSuffix: " kilométrage",
    breakdownTitle: "Comment le chiffre 17c est construit",
    breakdownFmv: "Valeur marchande avant accident",
    breakdownBase: "Plafond de perte de base (10% de la valeur)",
    breakdownDamage: "× Multiplicateur de dommages",
    breakdownMileagePre: "× Multiplicateur de kilométrage (",
    breakdownMileageSuffix: ")",
    breakdown17c: "Moins-value 17c",
    marketHeadPre: "Perte de marché réaliste : ",
    marketBodyPre: "La formule 17c sous-estime presque toujours la perte réelle car elle plafonne la base à 10% et empile deux multiplicateurs réducteurs. Les évaluateurs et concessionnaires indépendants décotent généralement une voiture avec accident enregistré de ",
    marketBodyOf: "de la valeur avant accident. Utilise le chiffre le plus élevé comme base pour une réclamation de moins-value auprès d'un tiers (ou de ton propre assureur), appuyée par une expertise indépendante.",
    disclaimer: "Ceci est une estimation pour la négociation et l'éducation, pas une expertise légale. La récupération réelle dépend de ton état, du responsable, de ta police et du rapport d'un expert agréé. Les réclamations de moins-value de première partie sont interdites dans certains états ; les réclamations contre tiers (l'assureur du conducteur responsable) sont largement disponibles.",
    ctaTextPre: "Tu documentes une réclamation ? ",
    ctaTextBold: "Récupère l'historique d'accidents du VIN.",
    ctaBtn: "Vérifier les accidents",
    emptyState: "Saisis tes chiffres ci-dessus et appuie sur calculer pour voir à la fois le chiffre 17c de l'assureur et la fourchette réaliste de perte de marché.",
    fmvPlaceholder: "25,000",
    milesPlaceholder: "45,000",
    currencyLocale: "fr-FR",
  },
} as const;

function makeFmt(locale: Locale) {
  const tag = COPY[locale].currencyLocale;
  return (n: number) =>
    n.toLocaleString(tag, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
}

interface DVResult {
  fmv: number;
  base: number; // 10% cap
  damageMult: number;
  mileageMult: number;
  mileageKey: MileageBandKey;
  dv17c: number;
  marketLow: number;
  marketHigh: number;
}

interface Props {
  locale?: Locale;
}

export default function DiminishedValueCalculator({ locale = "en" }: Props) {
  const c = COPY[locale];
  const fmt0 = makeFmt(locale);
  const accidentHref = locale === "es" ? "/es/accident-history-check" : "/accident-history-check";

  const [fmv, setFmv] = useState("25000");
  const [damage, setDamage] = useState<DamageId>("moderate");
  const [mileage, setMileage] = useState("45000");
  const [result, setResult] = useState<DVResult | null>(null);

  const calculate = useCallback(() => {
    const value = parseFloat(fmv.replace(/,/g, "")) || 0;
    const miles = parseFloat(mileage.replace(/,/g, "")) || 0;
    const level = DAMAGE_LEVELS.find((d) => d.id === damage) ?? DAMAGE_LEVELS[2];
    const band = mileageMultiplier(miles);

    const base = value * 0.1; // 17c caps base at 10% of FMV
    const dv17c = base * level.mult * band.mult;

    setResult({
      fmv: value,
      base,
      damageMult: level.mult,
      mileageMult: band.mult,
      mileageKey: band.labelKey,
      dv17c,
      marketLow: value * level.marketLow,
      marketHigh: value * level.marketHigh,
    });
  }, [fmv, damage, mileage]);

  function reset() {
    setFmv("25000");
    setDamage("moderate");
    setMileage("45000");
    setResult(null);
  }

  return (
    <div className="space-y-6">
      {/* ── Inputs ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* FMV */}
          <div>
            <label
              htmlFor="dv-fmv"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
            >
              {c.fmvLabel}
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="dv-fmv"
                type="number"
                min="0"
                value={fmv}
                onChange={(e) => setFmv(e.target.value)}
                placeholder={c.fmvPlaceholder}
                className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">{c.fmvHelp}</p>
          </div>

          {/* Mileage */}
          <div>
            <label
              htmlFor="dv-miles"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
            >
              {c.milesLabel}
            </label>
            <div className="relative">
              <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="dv-miles"
                type="number"
                min="0"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder={c.milesPlaceholder}
                className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">{c.milesHelp}</p>
          </div>
        </div>

        {/* Damage severity */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
            {c.damageLabel}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {DAMAGE_LEVELS.map((d) => {
              const meta = c.damageLevels[d.id];
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDamage(d.id)}
                  className={`text-left rounded-xl border p-3 transition-colors cursor-pointer ${
                    damage === d.id
                      ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <span className="block text-sm font-bold text-slate-900">
                    {meta.label}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5">
                    {meta.note}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={calculate}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
          >
            <Calculator className="w-4 h-4" /> {c.calcBtn}
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-colors cursor-pointer"
            title={c.resetTitle}
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4">
          {/* 17c headline */}
          <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 sm:p-8 text-white">
            <p className="text-xs font-bold uppercase tracking-wide text-primary-200 mb-2">
              {c.headlineEyebrow}
            </p>
            <p className="text-5xl sm:text-6xl font-bold tracking-tight">
              {fmt0(result.dv17c)}
            </p>
            <p className="mt-2 text-sm text-primary-100">
              {fmt0(result.fmv)}
              {c.headlineFormulaPre}
              {result.damageMult.toFixed(2)}
              {c.headlineFormulaMid}
              {result.mileageMult.toFixed(2)}
              {c.headlineFormulaSuffix}
            </p>
          </div>

          {/* Calculation breakdown */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                {c.breakdownTitle}
              </h3>
            </div>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-5 py-3 text-slate-700">{c.breakdownFmv}</td>
                  <td className="px-5 py-3 text-right font-bold text-slate-900 tabular-nums">
                    {fmt0(result.fmv)}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-slate-700">{c.breakdownBase}</td>
                  <td className="px-5 py-3 text-right font-bold text-slate-900 tabular-nums">
                    {fmt0(result.base)}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-slate-700">{c.breakdownDamage}</td>
                  <td className="px-5 py-3 text-right text-slate-700 tabular-nums">
                    {result.damageMult.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 text-slate-700">
                    {c.breakdownMileagePre}
                    {c.mileageBands[result.mileageKey]}
                    {c.breakdownMileageSuffix}
                  </td>
                  <td className="px-5 py-3 text-right text-slate-700 tabular-nums">
                    {result.mileageMult.toFixed(2)}
                  </td>
                </tr>
                <tr className="bg-primary-50 font-bold">
                  <td className="px-5 py-3.5 text-primary-800">{c.breakdown17c}</td>
                  <td className="px-5 py-3.5 text-right text-primary-800 tabular-nums">
                    {fmt0(result.dv17c)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Market range */}
          <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50">
            <TrendingDown className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
            <div className="text-sm text-slate-700">
              <p className="font-bold text-slate-900 mb-1">
                {c.marketHeadPre}
                {fmt0(result.marketLow)} – {fmt0(result.marketHigh)}
              </p>
              <p className="leading-relaxed">
                {c.marketBodyPre}
                <strong>
                  {Math.round(
                    (result.marketLow / Math.max(result.fmv, 1)) * 100
                  )}
                  –
                  {Math.round(
                    (result.marketHigh / Math.max(result.fmv, 1)) * 100
                  )}
                  %
                </strong>{" "}
                {c.marketBodyOf}
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-400" />
            <p className="leading-relaxed">{c.disclaimer}</p>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-sm text-slate-700">
              {c.ctaTextPre}
              <strong className="text-slate-900">{c.ctaTextBold}</strong>
            </p>
            <Link
              href={accidentHref}
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              {c.ctaBtn} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {!result && (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-600">
          <Car className="w-5 h-5 flex-shrink-0 text-slate-400" />
          {c.emptyState}
        </div>
      )}

    </div>
  );
}
