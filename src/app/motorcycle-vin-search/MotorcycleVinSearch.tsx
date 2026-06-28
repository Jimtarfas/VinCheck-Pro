"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Loader2,
  Bike,
  Search,
  AlertTriangle,
  Globe2,
  Calendar,
  Building2,
  Hash,
  Wrench,
  Fuel,
  ArrowRight,
  Wand2,
} from "lucide-react";
import type { Locale } from "@/i18n/config";

/* ------------------------------------------------------------------
   Built-in motorcycle VIN parser. Works offline with zero API calls
   so the page is useful even if the upstream VIN API is unreachable.
------------------------------------------------------------------ */

const COPY = {
  en: {
    label: "Motorcycle VIN",
    placeholder: "Enter 17-character motorcycle VIN (e.g. 1HD1KEM177Y123456)",
    btn: "Decode VIN",
    helper: "Free instant decode · WMI, year, plant, manufacturer, region.",
    sampleBtn: "Try a sample VIN",
    errorLen: "Please enter a 17-character VIN.",
    invalidStrong: "Invalid VIN format.",
    invalidBody: "Motorcycle VINs are exactly 17 characters using letters A–Z (no I, O, Q) and digits 0–9. Pre-1981 motorcycles have shorter VINs and can't be decoded automatically.",
    decodedLabel: "DECODED MOTORCYCLE",
    vinLabel: "VIN",
    rowManufacturer: "Manufacturer",
    rowCountry: "Country of origin",
    rowYear: "Model year",
    rowYearOr: "or",
    rowYearUnknown: "Unknown",
    rowSeq: "Production sequence",
    rowEngine: "Engine",
    rowFuel: "Fuel type",
    rowCyl: "cyl",
    rowHp: "hp",
    hintWmi: "WMI",
    hintRegion: "Region",
    hintYearCode: "Year code",
    hintPlant: "Plant code",
    breakdownH: "VIN Character Breakdown",
    breakdownIntro: "Every position in a 17-character motorcycle VIN encodes specific information about the bike. Here's how this VIN breaks down:",
    legend: [
      { swatch: "bg-primary-200", label: "Positions 1–3", v: "WMI — World Manufacturer Identifier" },
      { swatch: "bg-amber-200", label: "Positions 4–8", v: "VDS — model, engine, body type" },
      { swatch: "bg-emerald-200", label: "Position 9", v: "Check digit (validates the VIN)" },
      { swatch: "bg-violet-200", label: "Position 10", v: "Model year code" },
      { swatch: "bg-slate-200", label: "Position 11", v: "Assembly plant code" },
      { swatch: "bg-slate-200", label: "Positions 12–17", v: "Sequential production number" },
    ],
    twoYearsStrong: "Two possible model years.",
    twoYearsPre: "The 30-year VIN year cycle means your bike could be from ",
    twoYearsMid: " or ",
    twoYearsPost: ". The full history report below uses title and registration data to pinpoint the exact year.",
    limitedStrong: "Limited motorcycle coverage.",
    limitedPost: " Motorcycles are sometimes sparser in the auto.dev VIN database than cars — the offline decode above is still accurate.",
    ctaRecLabel: "Recommended next step",
    ctaRecTitle: "Get the full history report",
    ctaRecDesc: "Title status, theft check, accident records, mileage, and recalls.",
    ctaBonusLabel: "Bonus tool",
    ctaBonusTitle: "Window Sticker Maker",
    ctaBonusDesc: "Build a printable Monroney-style sticker for this bike.",
    apiErrorFallback: "Couldn't reach the VIN database. The offline decode below is still accurate.",
    apiNoMatch: "VIN database returned no match.",
    unknownMake: "Unknown manufacturer",
    unknownCountry: "Unknown",
  },
  es: {
    label: "VIN de motocicleta",
    placeholder: "Ingresa un VIN de moto de 17 caracteres (ej. 1HD1KEM177Y123456)",
    btn: "Decodificar VIN",
    helper: "Decodificación gratis instantánea · WMI, año, planta, fabricante, región.",
    sampleBtn: "Prueba un VIN de ejemplo",
    errorLen: "Por favor ingresa un VIN de 17 caracteres.",
    invalidStrong: "Formato de VIN inválido.",
    invalidBody: "Los VIN de motos son exactamente 17 caracteres usando letras A–Z (sin I, O, Q) y dígitos 0–9. Las motos anteriores a 1981 tienen VIN más cortos y no se pueden decodificar automáticamente.",
    decodedLabel: "MOTOCICLETA DECODIFICADA",
    vinLabel: "VIN",
    rowManufacturer: "Fabricante",
    rowCountry: "País de origen",
    rowYear: "Año modelo",
    rowYearOr: "o",
    rowYearUnknown: "Desconocido",
    rowSeq: "Secuencia de producción",
    rowEngine: "Motor",
    rowFuel: "Tipo de combustible",
    rowCyl: "cil",
    rowHp: "hp",
    hintWmi: "WMI",
    hintRegion: "Región",
    hintYearCode: "Código de año",
    hintPlant: "Código de planta",
    breakdownH: "Desglose de caracteres del VIN",
    breakdownIntro: "Cada posición en un VIN de moto de 17 caracteres codifica información específica sobre la moto. Así se desglosa este VIN:",
    legend: [
      { swatch: "bg-primary-200", label: "Posiciones 1–3", v: "WMI — Identificador Mundial del Fabricante" },
      { swatch: "bg-amber-200", label: "Posiciones 4–8", v: "VDS — modelo, motor, tipo de carrocería" },
      { swatch: "bg-emerald-200", label: "Posición 9", v: "Dígito de verificación (valida el VIN)" },
      { swatch: "bg-violet-200", label: "Posición 10", v: "Código del año modelo" },
      { swatch: "bg-slate-200", label: "Posición 11", v: "Código de planta de ensamblaje" },
      { swatch: "bg-slate-200", label: "Posiciones 12–17", v: "Número secuencial de producción" },
    ],
    twoYearsStrong: "Dos años modelo posibles.",
    twoYearsPre: "El ciclo de 30 años del VIN significa que tu moto podría ser de ",
    twoYearsMid: " o ",
    twoYearsPost: ". El reporte completo de historial abajo usa datos de título y registro para precisar el año exacto.",
    limitedStrong: "Cobertura limitada de motocicletas.",
    limitedPost: " Las motos a veces son más escasas en la base de datos VIN de auto.dev que los autos — la decodificación offline arriba sigue siendo precisa.",
    ctaRecLabel: "Siguiente paso recomendado",
    ctaRecTitle: "Obtén el reporte completo de historial",
    ctaRecDesc: "Estado del título, verificación de robo, registros de accidentes, millaje y retiros.",
    ctaBonusLabel: "Herramienta extra",
    ctaBonusTitle: "Generador de Window Sticker",
    ctaBonusDesc: "Crea una hoja imprimible estilo Monroney para esta moto.",
    apiErrorFallback: "No se pudo conectar a la base de datos VIN. La decodificación offline abajo sigue siendo precisa.",
    apiNoMatch: "La base de datos VIN no encontró coincidencia.",
    unknownMake: "Fabricante desconocido",
    unknownCountry: "Desconocido",
  },
} as const;

// World Manufacturer Identifier prefixes for motorcycle makers (most common).
// Sourced from NHTSA + manufacturer documentation.
const MOTORCYCLE_WMI: Record<string, { make: string; country: string; countryEs: string }> = {
  // Harley-Davidson (USA)
  "1HD": { make: "Harley-Davidson", country: "United States", countryEs: "Estados Unidos" },
  "5HD": { make: "Harley-Davidson", country: "United States", countryEs: "Estados Unidos" },
  // Indian Motorcycle (USA)
  "56K": { make: "Indian Motorcycle", country: "United States", countryEs: "Estados Unidos" },
  // Polaris / Victory
  "5VP": { make: "Victory (Polaris)", country: "United States", countryEs: "Estados Unidos" },
  // Honda Motorcycle
  JH2: { make: "Honda", country: "Japan", countryEs: "Japón" },
  JH3: { make: "Honda", country: "Japan", countryEs: "Japón" },
  "1HF": { make: "Honda Motorcycle", country: "United States", countryEs: "Estados Unidos" },
  // Yamaha Motorcycle
  JYA: { make: "Yamaha", country: "Japan", countryEs: "Japón" },
  JYE: { make: "Yamaha", country: "Japan", countryEs: "Japón" },
  // Suzuki Motorcycle
  JS1: { make: "Suzuki", country: "Japan", countryEs: "Japón" },
  JS3: { make: "Suzuki", country: "Japan", countryEs: "Japón" },
  // Kawasaki Motorcycle
  JKA: { make: "Kawasaki", country: "Japan", countryEs: "Japón" },
  JKB: { make: "Kawasaki", country: "Japan", countryEs: "Japón" },
  // BMW Motorrad (Germany)
  WB1: { make: "BMW Motorrad", country: "Germany", countryEs: "Alemania" },
  WB2: { make: "BMW Motorrad", country: "Germany", countryEs: "Alemania" },
  // Ducati (Italy)
  ZDM: { make: "Ducati", country: "Italy", countryEs: "Italia" },
  // Aprilia (Italy)
  ZD4: { make: "Aprilia", country: "Italy", countryEs: "Italia" },
  // Triumph (UK)
  SMT: { make: "Triumph", country: "United Kingdom", countryEs: "Reino Unido" },
  // KTM (Austria)
  VBK: { make: "KTM", country: "Austria", countryEs: "Austria" },
  // Husqvarna (Austria)
  VBM: { make: "Husqvarna", country: "Austria", countryEs: "Austria" },
  // Royal Enfield (India)
  ME3: { make: "Royal Enfield", country: "India", countryEs: "India" },
  // MV Agusta (Italy)
  ZCG: { make: "MV Agusta", country: "Italy", countryEs: "Italia" },
  // Moto Guzzi (Italy)
  ZGU: { make: "Moto Guzzi", country: "Italy", countryEs: "Italia" },
  // Vespa / Piaggio (Italy)
  ZAP: { make: "Piaggio / Vespa", country: "Italy", countryEs: "Italia" },
  // Buell (USA)
  "4MZ": { make: "Buell", country: "United States", countryEs: "Estados Unidos" },
};

function decodeYear(char: string): number[] {
  const map: Record<string, number[]> = {
    A: [1980, 2010], B: [1981, 2011], C: [1982, 2012], D: [1983, 2013],
    E: [1984, 2014], F: [1985, 2015], G: [1986, 2016], H: [1987, 2017],
    J: [1988, 2018], K: [1989, 2019], L: [1990, 2020], M: [1991, 2021],
    N: [1992, 2022], P: [1993, 2023], R: [1994, 2024], S: [1995, 2025],
    T: [1996, 2026], V: [1997, 2027], W: [1998, 2028], X: [1999, 2029],
    Y: [2000, 2030],
    "1": [2001], "2": [2002], "3": [2003], "4": [2004], "5": [2005],
    "6": [2006], "7": [2007], "8": [2008], "9": [2009],
  };
  return map[char.toUpperCase()] || [];
}

function decodeRegion(char: string, locale: Locale): string {
  const c = char.toUpperCase();
  const en = (s: string) => s;
  const es: Record<string, string> = {
    Africa: "África", Asia: "Asia", Europe: "Europa",
    "North America": "Norteamérica", Oceania: "Oceanía",
    "South America": "Sudamérica", Unknown: "Desconocida",
  };
  const pick = (s: string) => (locale === "es" ? es[s] : en(s));
  if ("ABCDEFGH".includes(c)) return pick("Africa");
  if ("JKLMNPR".includes(c)) return pick("Asia");
  if ("STUVWXYZ".includes(c)) return pick("Europe");
  if ("12345".includes(c)) return pick("North America");
  if ("67".includes(c)) return pick("Oceania");
  if ("89".includes(c)) return pick("South America");
  return pick("Unknown");
}

interface ParsedVin {
  vin: string;
  wmi: string;
  vds: string;
  checkDigit: string;
  yearChar: string;
  plantCode: string;
  serial: string;
  region: string;
  make: string;
  country: string;
  yearCandidates: number[];
}

function parseMotorcycleVin(input: string, locale: Locale, c: (typeof COPY)["en" | "es"]): ParsedVin | null {
  const v = input.trim().toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, "");
  if (v.length !== 17) return null;

  const wmi = v.slice(0, 3);
  const vds = v.slice(3, 9);
  const checkDigit = v.charAt(8);
  const yearChar = v.charAt(9);
  const plantCode = v.charAt(10);
  const serial = v.slice(11);

  const meta = MOTORCYCLE_WMI[wmi];
  const make = meta?.make ?? c.unknownMake;
  const country = meta ? (locale === "es" ? meta.countryEs : meta.country) : c.unknownCountry;
  const region = decodeRegion(v.charAt(0), locale);
  const yearCandidates = decodeYear(yearChar);

  return { vin: v, wmi, vds, checkDigit, yearChar, plantCode, serial, region, make, country, yearCandidates };
}

interface ApiResult {
  make?: { name: string };
  model?: { name: string };
  years?: Array<{ year: number; styles?: Array<{ name?: string; trim?: string }> }>;
  engine?: {
    size?: number;
    cylinder?: number;
    configuration?: string;
    fuelType?: string;
    horsepower?: number;
    torque?: number;
    type?: string;
  };
  categories?: { vehicleType?: string; primaryBodyType?: string; vehicleStyle?: string };
}

interface Props {
  locale?: Locale;
}

export default function MotorcycleVinSearch({ locale = "en" }: Props) {
  const c = COPY[locale];
  const [vinInput, setVinInput] = useState("");
  const [submittedVin, setSubmittedVin] = useState<string | null>(null);
  const [apiData, setApiData] = useState<ApiResult | null>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const parsed = useMemo<ParsedVin | null>(() => {
    if (!submittedVin) return null;
    return parseMotorcycleVin(submittedVin, locale, c);
  }, [submittedVin, locale, c]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = vinInput.trim().toUpperCase();
    if (v.length !== 17) {
      setApiError(c.errorLen);
      return;
    }
    setSubmittedVin(v);
    setApiError(null);
    setApiData(null);
    setApiLoading(true);
    try {
      const res = await fetch(`/api/vin/${v}`);
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || c.apiNoMatch);
      }
      const j = (await res.json()) as ApiResult;
      setApiData(j);
    } catch (e) {
      setApiError(e instanceof Error ? e.message : c.apiErrorFallback);
    } finally {
      setApiLoading(false);
    }
  }

  function loadSample() {
    setVinInput("1HD1KEM177Y123456");
  }

  const styleName =
    apiData?.years?.[0]?.styles?.[0]?.name ||
    apiData?.years?.[0]?.styles?.[0]?.trim ||
    "";

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm"
      >
        <label
          htmlFor="moto-vin"
          className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
        >
          {c.label}
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="moto-vin"
              type="text"
              maxLength={17}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              value={vinInput}
              onChange={(e) => setVinInput(e.target.value.toUpperCase())}
              placeholder={c.placeholder}
              className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-300 bg-white font-mono text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
            />
          </div>
          <button
            type="submit"
            disabled={apiLoading}
            className="px-5 py-3 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition disabled:opacity-60 inline-flex items-center justify-center gap-2"
          >
            {apiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {c.btn}
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="text-slate-500">{c.helper}</span>
          <button
            type="button"
            onClick={loadSample}
            className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center gap-1"
          >
            <Wand2 className="w-3 h-3" /> {c.sampleBtn}
          </button>
        </div>
      </form>

      {submittedVin && !parsed && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200">
          <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-rose-800">
            <strong className="block">{c.invalidStrong}</strong>
            {c.invalidBody}
          </div>
        </div>
      )}

      {parsed && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white px-5 py-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-[0.2em] font-bold opacity-80">{c.decodedLabel}</p>
                <h2 className="text-2xl font-bold leading-tight mt-1">
                  {apiData?.years?.[0]?.year || parsed.yearCandidates[0] || "—"}{" "}
                  {apiData?.make?.name || parsed.make}{" "}
                  {apiData?.model?.name || ""}
                </h2>
                {styleName && <p className="text-sm text-white/85 mt-0.5">{styleName}</p>}
              </div>
              <Bike className="w-10 h-10 opacity-30 flex-shrink-0" />
            </div>
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-semibold">{c.vinLabel}</span>
              <span className="font-mono font-bold tracking-wider text-slate-900">{parsed.vin}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
              <DecodedRow icon={Building2} label={c.rowManufacturer} value={parsed.make} hint={`${c.hintWmi} · ${parsed.wmi}`} />
              <DecodedRow icon={Globe2} label={c.rowCountry} value={parsed.country} hint={`${c.hintRegion} · ${parsed.region}`} />
              <DecodedRow
                icon={Calendar}
                label={c.rowYear}
                value={parsed.yearCandidates.length > 0 ? parsed.yearCandidates.join(` ${c.rowYearOr} `) : c.rowYearUnknown}
                hint={`${c.hintYearCode} · ${parsed.yearChar}`}
              />
              <DecodedRow icon={Hash} label={c.rowSeq} value={parsed.serial} hint={`${c.hintPlant} · ${parsed.plantCode}`} />
              {apiData?.engine && (
                <>
                  <DecodedRow
                    icon={Wrench}
                    label={c.rowEngine}
                    value={
                      [
                        apiData.engine.size ? `${apiData.engine.size}L` : "",
                        apiData.engine.configuration || "",
                        apiData.engine.cylinder ? `${apiData.engine.cylinder}-${c.rowCyl}` : "",
                      ].filter(Boolean).join(" ") || "—"
                    }
                    hint={apiData.engine.horsepower ? `${apiData.engine.horsepower} ${c.rowHp}` : undefined}
                  />
                  <DecodedRow icon={Fuel} label={c.rowFuel} value={apiData.engine.fuelType || "—"} hint={apiData.engine.type || undefined} />
                </>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h3 className="text-base font-bold text-slate-900 mb-3">{c.breakdownH}</h3>
            <p className="text-xs text-slate-600 mb-4">{c.breakdownIntro}</p>

            <div className="font-mono text-xs sm:text-sm flex flex-wrap gap-1 mb-4 select-all">
              {parsed.vin.split("").map((ch, i) => (
                <span
                  key={i}
                  className={`inline-flex flex-col items-center px-2 py-1.5 rounded-md border ${
                    i < 3
                      ? "bg-primary-50 border-primary-200 text-primary-800"
                      : i < 9
                      ? "bg-amber-50 border-amber-200 text-amber-900"
                      : i === 9
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : i === 10
                      ? "bg-violet-50 border-violet-200 text-violet-800"
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  <span className="text-[9px] font-semibold opacity-60">{i + 1}</span>
                  <span className="font-bold tracking-wider">{ch}</span>
                </span>
              ))}
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {c.legend.map((l) => (
                <Legend key={l.label} swatch={l.swatch} label={l.label} v={l.v} />
              ))}
            </dl>
          </div>

          {parsed.yearCandidates.length === 2 && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900">
                <strong className="block mb-0.5">{c.twoYearsStrong}</strong>
                {c.twoYearsPre}
                <strong>{parsed.yearCandidates[0]}</strong>
                {c.twoYearsMid}
                <strong>{parsed.yearCandidates[1]}</strong>
                {c.twoYearsPost}
              </div>
            </div>
          )}

          {apiError && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <AlertTriangle className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-slate-700">
                <strong className="block mb-0.5">{c.limitedStrong}</strong>
                {apiError}{c.limitedPost}
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href={`/report/${parsed.vin}?from=motorcycle-vin-search`}
              className="group flex items-center justify-between gap-3 p-5 rounded-2xl bg-primary-600 text-white hover:bg-primary-700 transition"
            >
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold opacity-80">{c.ctaRecLabel}</p>
                <p className="font-bold text-base mt-0.5">{c.ctaRecTitle}</p>
                <p className="text-xs text-white/85 mt-1">{c.ctaRecDesc}</p>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href={locale === "es" ? "/es/window-sticker" : "/window-sticker"}
              className="group flex items-center justify-between gap-3 p-5 rounded-2xl bg-white border border-slate-200 text-slate-900 hover:border-primary-300 hover:bg-primary-50/40 transition"
            >
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">{c.ctaBonusLabel}</p>
                <p className="font-bold text-base mt-0.5">{c.ctaBonusTitle}</p>
                <p className="text-xs text-slate-600 mt-1">{c.ctaBonusDesc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function DecodedRow({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4">
      <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-slate-900 mt-0.5 truncate">{value}</p>
        {hint && <p className="text-[11px] text-slate-500 mt-0.5">{hint}</p>}
      </div>
    </div>
  );
}

function Legend({
  swatch,
  label,
  v,
}: {
  swatch: string;
  label: string;
  v: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className={`w-3 h-3 rounded-sm flex-shrink-0 mt-1 ${swatch}`} />
      <div>
        <dt className="font-semibold text-slate-900">{label}</dt>
        <dd className="text-slate-700 text-xs">{v}</dd>
      </div>
    </div>
  );
}
