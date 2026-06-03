"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
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
   since November 1, 1972. Two date formats exist:

   Straight-Year Format (current, post Aug 1, 1984):
     1-3  MIC (manufacturer)   4-8  serial   9 month(A-L)
     10   year-of-build digit  11-12  model year

   Model-Year Format (older, pre Aug 1984):
     1-3  MIC   4-8  serial   9-10 model year   11 "M"   12 month(A-L)

   The decode is fully derivable from the string — the only thing
   we can't resolve locally is the manufacturer name behind the
   MIC, which lives in the USCG MIC database (linked below). */

const MONTHS: Record<string, string> = {
  A: "January",
  B: "February",
  C: "March",
  D: "April",
  E: "May",
  F: "June",
  G: "July",
  H: "August",
  I: "September",
  J: "October",
  K: "November",
  L: "December",
};

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

function decodeHin(raw: string): { result?: HinResult; error?: string } {
  const hin = raw
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");

  if (hin.length === 0) return { error: "Enter a Hull Identification Number." };
  if (hin.length !== 12)
    return {
      error: `A HIN is exactly 12 characters. You entered ${hin.length}.`,
    };

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
    // Straight-year format began Aug 1984; treat 60+ as 19xx, else 20xx.
    return String(n >= 60 ? 1900 + n : 2000 + n);
  };

  if (p11 === "M") {
    // Model-Year Format (pre-August 1984)
    format = "Model-Year Format (pre-August 1984)";
    modelYear = twoDigitToYear(p9 + p10);
    month = MONTHS[p12] ?? null;
    if (!/^\d{2}$/.test(p9 + p10))
      warnings.push("Model-year digits (positions 9–10) should be numeric.");
    if (!month)
      warnings.push("Month code (position 12) should be a letter A–L.");
  } else {
    // Straight-Year Format (current)
    format = "Straight-Year Format (current, post-August 1984)";
    month = MONTHS[p9] ?? null;
    buildYearDigit = p10;
    modelYear = twoDigitToYear(p11 + p12);
    if (!month)
      warnings.push(
        "Month code (position 9) should be a letter A–L — double-check the HIN."
      );
    if (!/^\d$/.test(p10))
      warnings.push("Build-year digit (position 10) should be numeric.");
    if (!/^\d{2}$/.test(p11 + p12))
      warnings.push("Model-year digits (positions 11–12) should be numeric.");
  }

  if (/[IOQ]/.test(hin.slice(0, 8))) {
    warnings.push(
      "The MIC/serial section contains I, O, or Q — unusual and worth verifying."
    );
  }

  return {
    result: {
      hin,
      mic,
      serial,
      format,
      month,
      modelYear,
      buildYearDigit,
      warnings,
    },
  };
}

export default function HinDecoder() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<HinResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const decode = useCallback(() => {
    const { result, error } = decodeHin(input);
    setResult(result ?? null);
    setError(error ?? null);
  }, [input]);

  function reset() {
    setInput("");
    setResult(null);
    setError(null);
  }

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
        <label
          htmlFor="hin-input"
          className="block text-base sm:text-lg font-headline font-extrabold text-primary mb-1"
        >
          Decode a Hull Identification Number
        </label>
        <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
          Enter the 12-character HIN from the transom — we&apos;ll break out the
          manufacturer code, serial, and build date.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="hin-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && decode()}
            placeholder="e.g. ABC12345H809"
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
              <Search className="w-4 h-4" /> Decode HIN
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
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-rose-200 bg-rose-50 text-sm text-rose-700">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-500" />
          <p>{error}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-4">
          {/* HIN echo + format */}
          <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 sm:p-7 text-white">
            <p className="text-xs font-bold uppercase tracking-wide text-primary-200 mb-2">
              Decoded HIN
            </p>
            <p className="text-3xl sm:text-4xl font-mono font-bold tracking-wider break-all">
              {result.hin}
            </p>
            <p className="mt-2 text-sm text-primary-100 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> {result.format}
            </p>
          </div>

          {/* Segments grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Segment
              icon={Factory}
              label="Manufacturer (MIC)"
              value={result.mic}
              sub="Positions 1–3"
            />
            <Segment
              icon={Hash}
              label="Hull Serial"
              value={result.serial}
              sub="Positions 4–8"
            />
            <Segment
              icon={Calendar}
              label={result.modelYear ? "Model Year" : "Build Date"}
              value={result.modelYear ?? "—"}
              sub={
                result.month
                  ? `Built ${result.month}${
                      result.buildYearDigit ? ` · year digit ${result.buildYearDigit}` : ""
                    }`
                  : "Date portion"
              }
            />
          </div>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50 text-sm text-amber-800">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <div>
                <p className="font-bold text-amber-900 mb-1">Check these:</p>
                <ul className="list-disc pl-4 space-y-0.5">
                  {result.warnings.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* MIC lookup note */}
          <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700">
            <Anchor className="w-5 h-5 flex-shrink-0 mt-0.5 text-slate-400" />
            <p className="leading-relaxed">
              The MIC <strong className="font-mono">{result.mic}</strong>{" "}
              identifies the builder. Resolve it to a company name in the US
              Coast Guard&rsquo;s official Manufacturer Identification Code
              database:{" "}
              <a
                href="https://www.uscgboating.org/recreational-boat-builders/manufacturers-identification.php"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 font-semibold underline underline-offset-2 hover:text-primary-800 inline-flex items-center gap-1"
              >
                USCG MIC lookup <ExternalLink className="w-3 h-3" />
              </a>
              .
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-sm text-slate-700">
              Boat sits on a trailer?{" "}
              <strong className="text-slate-900">
                Decode the trailer VIN too.
              </strong>
            </p>
            <Link
              href="/chassis-number-lookup"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              VIN Lookup <ArrowRight className="w-3.5 h-3.5" />
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
      <p className="text-xl font-mono font-bold text-slate-900 break-all">
        {value}
      </p>
      <p className="text-[11px] text-slate-400 mt-1">{sub}</p>
    </div>
  );
}
