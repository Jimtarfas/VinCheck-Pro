"use client";

import { useState, useCallback } from "react";
import Link from "@/components/LocaleLink";
import {
  Search,
  RefreshCcw,
  Anchor,
  Factory,
  Hash,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

/* ─── HIN reference ──────────────────────────────────────────
   A Hull Identification Number (HIN) is a 12-character code the
   US Coast Guard has required on all boats built or imported
   since November 1, 1972. Two date formats exist. */

const MONTHS_EN: Record<string, string> = {
  A: "January", B: "February", C: "March", D: "April", E: "May", F: "June",
  G: "July", H: "August", I: "September", J: "October", K: "November", L: "December",
};
const MONTHS_ES: Record<string, string> = {
  A: "Enero", B: "Febrero", C: "Marzo", D: "Abril", E: "Mayo", F: "Junio",
  G: "Julio", H: "Agosto", I: "Septiembre", J: "Octubre", K: "Noviembre", L: "Diciembre",
};
const MONTHS_FR: Record<string, string> = {
  A: "Janvier", B: "F\u00e9vrier", C: "Mars", D: "Avril", E: "Mai", F: "Juin",
  G: "Juillet", H: "Ao\u00fbt", I: "Septembre", J: "Octobre", K: "Novembre", L: "D\u00e9cembre",
};

const COPY = {
  en: {
    label: "Decode a Hull Identification Number",
    sub: "Enter the 12-character HIN from the transom — we'll break out the manufacturer code, serial, and build date.",
    placeholder: "e.g. ABC12345H809",
    decodeBtn: "Decode HIN",
    resetTitle: "Reset",
    errEnter: "Enter a Hull Identification Number.",
    errLen: (n: number) => `A HIN is exactly 12 characters. You entered ${n}.`,
    formatStraight: "Straight-Year Format (current, post-August 1984)",
    formatModel: "Model-Year Format (pre-August 1984)",
    warnModelYearDigits: "Model-year digits (positions 9–10) should be numeric.",
    warnMonth12: "Month code (position 12) should be a letter A–L.",
    warnMonth9: "Month code (position 9) should be a letter A–L — double-check the HIN.",
    warnBuildDigit: "Build-year digit (position 10) should be numeric.",
    warnModelYearDigits11: "Model-year digits (positions 11–12) should be numeric.",
    warnIOQ: "The MIC/serial section contains I, O, or Q — unusual and worth verifying.",
    decodedLabel: "Decoded HIN",
    micLabel: "Manufacturer (MIC)",
    micPos: "Positions 1–3",
    hullLabel: "Hull Serial",
    hullPos: "Positions 4–8",
    modelYearLabel: "Model Year",
    buildDateLabel: "Build Date",
    datePortion: "Date portion",
    builtPre: "Built ",
    yearDigit: " · year digit ",
    checkTheseLabel: "Check these:",
    micResolvePre: "The MIC ",
    micResolveMid: " identifies the builder. Resolve it to a company name in the US Coast Guard's official Manufacturer Identification Code database: ",
    micLinkText: "USCG MIC lookup",
    boatTrailer: "Boat sits on a trailer? ",
    boatTrailerBold: "Decode the trailer VIN too.",
    vinLookupBtn: "VIN Lookup",
    months: MONTHS_EN,
  },
  es: {
    label: "Decodifica un Número de Identificación del Casco",
    sub: "Ingresa el HIN de 12 caracteres del espejo de popa — desglosaremos el código del fabricante, serial y fecha de construcción.",
    placeholder: "ej. ABC12345H809",
    decodeBtn: "Decodificar HIN",
    resetTitle: "Reiniciar",
    errEnter: "Ingresa un Número de Identificación del Casco.",
    errLen: (n: number) => `Un HIN tiene exactamente 12 caracteres. Ingresaste ${n}.`,
    formatStraight: "Formato Año-Directo (actual, post-agosto 1984)",
    formatModel: "Formato Año-Modelo (pre-agosto 1984)",
    warnModelYearDigits: "Los dígitos de año modelo (posiciones 9-10) deben ser numéricos.",
    warnMonth12: "El código de mes (posición 12) debe ser una letra A-L.",
    warnMonth9: "El código de mes (posición 9) debe ser una letra A-L — vuelve a verificar el HIN.",
    warnBuildDigit: "El dígito de año de construcción (posición 10) debe ser numérico.",
    warnModelYearDigits11: "Los dígitos de año modelo (posiciones 11-12) deben ser numéricos.",
    warnIOQ: "La sección MIC/serial contiene I, O o Q — inusual y vale la pena verificar.",
    decodedLabel: "HIN decodificado",
    micLabel: "Fabricante (MIC)",
    micPos: "Posiciones 1-3",
    hullLabel: "Serial del casco",
    hullPos: "Posiciones 4-8",
    modelYearLabel: "Año modelo",
    buildDateLabel: "Fecha de construcción",
    datePortion: "Porción de fecha",
    builtPre: "Construido ",
    yearDigit: " · dígito de año ",
    checkTheseLabel: "Verifica esto:",
    micResolvePre: "El MIC ",
    micResolveMid: " identifica al constructor. Resuélvelo a un nombre de empresa en la base de datos oficial de Código de Identificación del Fabricante de la Guardia Costera de EE. UU.: ",
    micLinkText: "Búsqueda USCG MIC",
    boatTrailer: "¿El barco está sobre un remolque? ",
    boatTrailerBold: "Decodifica también el VIN del remolque.",
    vinLookupBtn: "Búsqueda VIN",
    months: MONTHS_ES,
  },
  fr: {
    label: "D\u00e9code un num\u00e9ro d'identification de coque (HIN)",
    sub: "Saisis le HIN de 12 caract\u00e8res du tableau arri\u00e8re \u2014 nous extrairons le code fabricant, le num\u00e9ro de s\u00e9rie et la date de fabrication.",
    placeholder: "ex. ABC12345H809",
    decodeBtn: "D\u00e9coder le HIN",
    resetTitle: "R\u00e9initialiser",
    errEnter: "Saisis un num\u00e9ro d'identification de coque.",
    errLen: (n: number) => `Un HIN compte exactement 12 caract\u00e8res. Tu en as saisi ${n}.`,
    formatStraight: "Format Ann\u00e9e Directe (actuel, post-ao\u00fbt 1984)",
    formatModel: "Format Ann\u00e9e Mod\u00e8le (pre-ao\u00fbt 1984)",
    warnModelYearDigits: "Les chiffres de l'ann\u00e9e mod\u00e8le (positions 9\u201310) doivent \u00eatre num\u00e9riques.",
    warnMonth12: "Le code du mois (position 12) doit \u00eatre une lettre A\u2013L.",
    warnMonth9: "Le code du mois (position 9) doit \u00eatre une lettre A\u2013L \u2014 v\u00e9rifie \u00e0 nouveau le HIN.",
    warnBuildDigit: "Le chiffre de l'ann\u00e9e de fabrication (position 10) doit \u00eatre num\u00e9rique.",
    warnModelYearDigits11: "Les chiffres de l'ann\u00e9e mod\u00e8le (positions 11\u201312) doivent \u00eatre num\u00e9riques.",
    warnIOQ: "La section MIC/s\u00e9rie contient I, O ou Q \u2014 inhabituel, \u00e0 v\u00e9rifier.",
    decodedLabel: "HIN d\u00e9cod\u00e9",
    micLabel: "Fabricant (MIC)",
    micPos: "Positions 1\u20133",
    hullLabel: "S\u00e9rie de coque",
    hullPos: "Positions 4\u20138",
    modelYearLabel: "Ann\u00e9e mod\u00e8le",
    buildDateLabel: "Date de fabrication",
    datePortion: "Partie date",
    builtPre: "Construit ",
    yearDigit: " \u00b7 chiffre d'ann\u00e9e ",
    checkTheseLabel: "\u00c0 v\u00e9rifier\u00a0:",
    micResolvePre: "Le MIC ",
    micResolveMid: " identifie le constructeur. R\u00e9sous-le en nom d'entreprise dans la base officielle des Manufacturer Identification Codes de l'US Coast Guard\u00a0: ",
    micLinkText: "Recherche USCG MIC",
    boatTrailer: "Le bateau est sur une remorque\u00a0? ",
    boatTrailerBold: "D\u00e9code aussi le VIN de la remorque.",
    vinLookupBtn: "Recherche VIN",
    months: MONTHS_FR,
  },
} as const;

interface HinResult {
  hin: string;
  mic: string;
  serial: string;
  format: string;
  month: string | null;
  modelYear: string | null;
  buildYearDigit: string | null;
  warnings: string[];
}

function decodeHin(raw: string, c: (typeof COPY)["en" | "es" | "fr"]): { result?: HinResult; error?: string } {
  const hin = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (hin.length === 0) return { error: c.errEnter };
  if (hin.length !== 12) return { error: c.errLen(hin.length) };

  const mic = hin.slice(0, 3);
  const serial = hin.slice(3, 8);
  const p9 = hin[8];
  const p10 = hin[9];
  const p11 = hin[10];
  const p12 = hin[11];

  const warnings: string[] = [];

  let format: string;
  let month: string | null = null;
  let modelYear: string | null = null;
  let buildYearDigit: string | null = null;

  const twoDigitToYear = (yy: string) => {
    const n = parseInt(yy, 10);
    if (Number.isNaN(n)) return null;
    return String(n >= 60 ? 1900 + n : 2000 + n);
  };

  if (p11 === "M") {
    format = c.formatModel;
    modelYear = twoDigitToYear(p9 + p10);
    month = c.months[p12] ?? null;
    if (!/^\d{2}$/.test(p9 + p10)) warnings.push(c.warnModelYearDigits);
    if (!month) warnings.push(c.warnMonth12);
  } else {
    format = c.formatStraight;
    month = c.months[p9] ?? null;
    buildYearDigit = p10;
    modelYear = twoDigitToYear(p11 + p12);
    if (!month) warnings.push(c.warnMonth9);
    if (!/^\d$/.test(p10)) warnings.push(c.warnBuildDigit);
    if (!/^\d{2}$/.test(p11 + p12)) warnings.push(c.warnModelYearDigits11);
  }

  if (/[IOQ]/.test(hin.slice(0, 8))) warnings.push(c.warnIOQ);

  return { result: { hin, mic, serial, format, month, modelYear, buildYearDigit, warnings } };
}

interface Props {
  locale?: "en" | "es" | "fr";
}

export default function HinDecoder({ locale = "en" }: Props) {
  const c = COPY[locale];
  const trailerLink = locale === "es" ? "/es/chassis-number-lookup" : "/chassis-number-lookup";
  const [input, setInput] = useState("");
  const [result, setResult] = useState<HinResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const decode = useCallback(() => {
    const { result, error } = decodeHin(input, c);
    setResult(result ?? null);
    setError(error ?? null);
  }, [input, c]);

  function reset() {
    setInput("");
    setResult(null);
    setError(null);
  }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
        <label htmlFor="hin-input" className="block text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
          {c.label}
        </label>
        <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{c.sub}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="hin-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && decode()}
            placeholder={c.placeholder}
            maxLength={16}
            spellCheck={false}
            autoCapitalize="characters"
            className="flex-1 px-4 py-3.5 border border-slate-200 rounded-xl font-mono text-sm tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={decode}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" /> {c.decodeBtn}
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
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-rose-200 bg-rose-50 text-sm text-rose-700">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-500" />
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 sm:p-7 text-white">
            <p className="text-xs font-bold uppercase tracking-wide text-primary-200 mb-2">{c.decodedLabel}</p>
            <p className="text-3xl sm:text-4xl font-mono font-bold tracking-wider break-all">{result.hin}</p>
            <p className="mt-2 text-sm text-primary-100 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> {result.format}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Segment icon={Factory} label={c.micLabel} value={result.mic} sub={c.micPos} />
            <Segment icon={Hash} label={c.hullLabel} value={result.serial} sub={c.hullPos} />
            <Segment
              icon={Calendar}
              label={result.modelYear ? c.modelYearLabel : c.buildDateLabel}
              value={result.modelYear ?? "—"}
              sub={
                result.month
                  ? `${c.builtPre}${result.month}${result.buildYearDigit ? `${c.yearDigit}${result.buildYearDigit}` : ""}`
                  : c.datePortion
              }
            />
          </div>

          {result.warnings.length > 0 && (
            <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50 text-sm text-amber-800">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <div>
                <p className="font-bold text-amber-900 mb-1">{c.checkTheseLabel}</p>
                <ul className="list-disc pl-4 space-y-0.5">
                  {result.warnings.map((w) => <li key={w}>{w}</li>)}
                </ul>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700">
            <Anchor className="w-5 h-5 flex-shrink-0 mt-0.5 text-slate-400" />
            <p className="leading-relaxed">
              {c.micResolvePre}<strong className="font-mono">{result.mic}</strong>{c.micResolveMid}
              <a
                href="https://www.uscgboating.org/recreational-boat-builders/manufacturers-identification.php"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 font-semibold underline underline-offset-2 hover:text-primary-800 inline-flex items-center gap-1"
              >
                {c.micLinkText} <ExternalLink className="w-3 h-3" />
              </a>
              .
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-sm text-slate-700">
              {c.boatTrailer}<strong className="text-slate-900">{c.boatTrailerBold}</strong>
            </p>
            <Link
              href={trailerLink}
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              {c.vinLookupBtn} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Segment({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Anchor;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1.5">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </div>
      <p className="text-xl font-mono font-bold text-slate-900 break-all">{value}</p>
      <p className="text-[11px] text-slate-400 mt-1">{sub}</p>
    </div>
  );
}
