"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  RefreshCcw,
  Calendar,
  Hash,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Info,
} from "lucide-react";

/* ─── Golf cart serial reference ─────────────────────────────
   Golf carts are off-road vehicles and are NOT required to carry
   a 17-character road VIN. Each maker uses its own serial number.

   This decoder handles the CLUB CAR format, which is deterministic
   and well-documented:

     2 letters (model/assembly prefix) + YY (model year) + WW (week)
     + production sequence.   e.g.  PG0512-345678  →  2005, week 12

   Yamaha and E-Z-GO encode the year differently (Yamaha via a
   model-prefix chart, E-Z-GO via a manufacturer date code that
   varies by era), so this tool does NOT guess those — it tells the
   user where to read the serial and points them to the right chart
   instead of fabricating a year. */

const COPY = {
  en: {
    heading: "Decode a Club Car Serial Number",
    sub: "Enter a Club Car serial (2 letters + year + week) to read the model year instantly. Yamaha & E-Z-GO guidance is below.",
    placeholder: "e.g. PG0512345678",
    inputAria: "Club Car serial number",
    decodeBtn: "Decode",
    resetAria: "Reset",
    errMinLen:
      "A Club Car serial is at least 6 characters: 2 letters, then a 4-digit year+week code. Check under the seat or in the glove box.",
    errPrefix:
      "A Club Car serial starts with two letters (the model prefix), e.g. PG, AG, or PH. Re-check the first two characters.",
    errYear:
      "Characters 3–4 should be the two-digit model year (e.g. 05 for 2005). Re-check the serial.",
    warnWeek: (ww: string) =>
      `Characters 5–6 (${ww}) aren't a valid week of the year (01–53). On some older units this position differs — treat the year as the reliable figure.`,
    warnWeekDigits:
      "Characters 5–6 aren't two digits, so the production week couldn't be read. The model year above is still valid.",
    decodedLabel: "Decoded Club Car Serial",
    modelYear: "Model Year",
    weekWord: "Week",
    prefixLabel: "Model prefix",
    prefixPos: "Positions 1–2",
    yearLabel: "Model year",
    yearPos: "Positions 3–4",
    seqLabel: "Sequence",
    seqPos: "Production run",
    footer1: "This decoder reads the ",
    footerBold: "Club Car",
    footer2: " serial format. For ",
    footerYamaha: "Yamaha",
    footerAnd: " and ",
    footerEzgo: "E-Z-GO",
    footer3:
      ", the year is read from a model-prefix chart rather than a fixed position — see the brand guides below. ",
    footerLink: "Need a car or truck VIN instead?",
  },
  es: {
    heading: "Decodifica un número de serie Club Car",
    sub: "Ingresa un número de serie Club Car (2 letras + año + semana) para leer el año modelo al instante. La guía para Yamaha y E-Z-GO está abajo.",
    placeholder: "ej. PG0512345678",
    inputAria: "Número de serie Club Car",
    decodeBtn: "Decodificar",
    resetAria: "Reiniciar",
    errMinLen:
      "Un número de serie Club Car tiene al menos 6 caracteres: 2 letras, luego un código de 4 dígitos de año+semana. Revisa debajo del asiento o en la guantera.",
    errPrefix:
      "Un número de serie Club Car comienza con dos letras (el prefijo de modelo), ej. PG, AG o PH. Vuelve a verificar los primeros dos caracteres.",
    errYear:
      "Los caracteres 3-4 deben ser el año modelo de dos dígitos (ej. 05 para 2005). Vuelve a verificar el número de serie.",
    warnWeek: (ww: string) =>
      `Los caracteres 5-6 (${ww}) no son una semana válida del año (01-53). En algunas unidades más antiguas esta posición difiere — trata el año como la cifra confiable.`,
    warnWeekDigits:
      "Los caracteres 5-6 no son dos dígitos, así que no se pudo leer la semana de producción. El año modelo de arriba sigue siendo válido.",
    decodedLabel: "Número de serie Club Car decodificado",
    modelYear: "Año modelo",
    weekWord: "Semana",
    prefixLabel: "Prefijo de modelo",
    prefixPos: "Posiciones 1-2",
    yearLabel: "Año modelo",
    yearPos: "Posiciones 3-4",
    seqLabel: "Secuencia",
    seqPos: "Serie de producción",
    footer1: "Este decodificador lee el formato de serie ",
    footerBold: "Club Car",
    footer2: ". Para ",
    footerYamaha: "Yamaha",
    footerAnd: " y ",
    footerEzgo: "E-Z-GO",
    footer3:
      ", el año se lee desde una tabla de prefijo de modelo en lugar de una posición fija — ve las guías de marca abajo. ",
    footerLink: "¿Necesitas un VIN de auto o camión en su lugar?",
  },
} as const;

interface ClubCarResult {
  raw: string;
  prefix: string;
  year: number;
  week: number | null;
  sequence: string;
  warnings: string[];
}

function decodeClubCar(
  input: string,
  c: (typeof COPY)["en" | "es"]
): { result?: ClubCarResult; error?: string } {
  const raw = input.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (raw.length < 6) return { error: c.errMinLen };

  const prefix = raw.slice(0, 2);
  if (!/^[A-Z]{2}$/.test(prefix)) return { error: c.errPrefix };

  const yy = raw.slice(2, 4);
  const ww = raw.slice(4, 6);
  if (!/^\d{2}$/.test(yy)) return { error: c.errYear };

  const yyNum = parseInt(yy, 10);
  const year = yyNum >= 80 ? 1900 + yyNum : 2000 + yyNum;

  const warnings: string[] = [];
  let week: number | null = null;
  if (/^\d{2}$/.test(ww)) {
    const w = parseInt(ww, 10);
    if (w >= 1 && w <= 53) week = w;
    else warnings.push(c.warnWeek(ww));
  } else {
    warnings.push(c.warnWeekDigits);
  }

  const sequence = raw.slice(6);

  return { result: { raw, prefix, year, week, sequence, warnings } };
}

interface Props {
  locale?: "en" | "es";
}

export default function GolfCartDecoder({ locale = "en" }: Props) {
  const c = COPY[locale];
  const homeLink = locale === "es" ? "/es" : "/";
  const [value, setValue] = useState("");
  const [result, setResult] = useState<ClubCarResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(() => {
    if (!value.trim()) {
      setError(null);
      setResult(null);
      return;
    }
    const { result, error } = decodeClubCar(value, c);
    if (error) {
      setError(error);
      setResult(null);
    } else if (result) {
      setError(null);
      setResult(result);
    }
  }, [value, c]);

  const reset = () => {
    setValue("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
      <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
        {c.heading}
      </h2>
      <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
        {c.sub}
      </p>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && run()}
          placeholder={c.placeholder}
          className="flex-1 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-mono text-base uppercase tracking-wide text-on-surface placeholder:text-on-surface-variant/50 placeholder:normal-case placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-primary/40"
          aria-label={c.inputAria}
        />
        <button
          onClick={run}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white hover:opacity-90 transition"
        >
          <Search className="w-4 h-4" /> {c.decodeBtn}
        </button>
        {(result || error) && (
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-outline-variant px-4 py-3 font-bold text-on-surface-variant hover:bg-surface-container-low transition"
            aria-label={c.resetAria}
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="mt-5">
          <div className="rounded-2xl bg-primary p-5 text-white mb-4">
            <div className="text-[11px] font-black uppercase tracking-wider text-white/70 mb-1">
              {c.decodedLabel}
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-black tracking-wide">
              {result.raw}
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 text-sm text-white/85">
              <CheckCircle2 className="w-4 h-4" /> {c.modelYear} {result.year}
              {result.week ? ` · ${c.weekWord} ${result.week}` : ""}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-1">
                <Hash className="w-3.5 h-3.5" /> {c.prefixLabel}
              </div>
              <div className="font-mono text-lg font-extrabold text-on-surface">
                {result.prefix}
              </div>
              <div className="text-xs text-on-surface-variant mt-0.5">
                {c.prefixPos}
              </div>
            </div>
            <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-1">
                <Calendar className="w-3.5 h-3.5" /> {c.yearLabel}
              </div>
              <div className="font-mono text-lg font-extrabold text-on-surface">
                {result.year}
              </div>
              <div className="text-xs text-on-surface-variant mt-0.5">
                {c.yearPos}
              </div>
            </div>
            <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-1">
                <Hash className="w-3.5 h-3.5" /> {c.seqLabel}
              </div>
              <div className="font-mono text-lg font-extrabold text-on-surface">
                {result.sequence || "—"}
              </div>
              <div className="text-xs text-on-surface-variant mt-0.5">
                {c.seqPos}
              </div>
            </div>
          </div>

          {result.warnings.length > 0 && (
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <ul className="space-y-1">
                {result.warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-5 flex items-start gap-2 rounded-xl bg-surface-container-low border border-outline-variant p-4 text-xs text-on-surface-variant">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
        <span>
          {c.footer1}<strong>{c.footerBold}</strong>{c.footer2}
          <strong>{c.footerYamaha}</strong>{c.footerAnd}<strong>{c.footerEzgo}</strong>{c.footer3}
          <Link
            href={homeLink}
            className="text-primary font-semibold underline underline-offset-2 inline-flex items-center gap-0.5"
          >
            {c.footerLink} <ArrowRight className="w-3 h-3" />
          </Link>
        </span>
      </div>
    </div>
  );
}
