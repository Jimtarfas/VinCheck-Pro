"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Copy,
  CheckCheck,
  Info,
} from "lucide-react";

/* ─── Offline VIN position decoder ─────────────────────────── */

const WMI_COUNTRIES: Record<string, string> = {
  "1": "United States", "2": "Canada", "3": "Mexico",
  "4": "United States", "5": "United States",
  "6": "Australia", "7": "New Zealand",
  "8": "Argentina", "9": "Brazil",
  J: "Japan", K: "South Korea", L: "China",
  S: "United Kingdom", V: "France / Spain / Netherlands",
  W: "Germany", X: "Russia", Y: "Sweden / Finland",
  Z: "Italy",
};

const MODEL_YEAR_MAP: Record<string, string> = {
  A: "1980", B: "1981", C: "1982", D: "1983", E: "1984",
  F: "1985", G: "1986", H: "1987", J: "1988", K: "1989",
  L: "1990", M: "1991", N: "1992", P: "1993", R: "1994",
  S: "1995", T: "1996", V: "1997", W: "1998", X: "1999",
  Y: "2000",
  "1": "2001", "2": "2002", "3": "2003", "4": "2004",
  "5": "2005", "6": "2006", "7": "2007", "8": "2008",
  "9": "2009",
  A2: "2010", B2: "2011", C2: "2012", D2: "2013", E2: "2014",
  F2: "2015", G2: "2016", H2: "2017", J2: "2018", K2: "2019",
  L2: "2020", M2: "2021", N2: "2022", P2: "2023", R2: "2024",
  S2: "2025", T2: "2026",
};

function decodeModelYear(char: string): string {
  // Post-2009 reuse A-Y; need to resolve ambiguity — just return the char
  // and let the API confirm. We show both possibilities if ambiguous.
  const direct = MODEL_YEAR_MAP[char];
  const second = MODEL_YEAR_MAP[char + "2"];
  if (direct && second) return `${direct} or ${second}`;
  return direct || second || "Unknown";
}

function decodeCheckDigit(vin: string): boolean {
  const MAP: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
    J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
    S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
    "0": 0, "1": 1, "2": 2, "3": 3, "4": 4,
    "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
  };
  const WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
  const sum = vin
    .toUpperCase()
    .split("")
    .reduce((acc, c, i) => acc + (MAP[c] ?? 0) * WEIGHTS[i], 0);
  const rem = sum % 11;
  const check = vin[8].toUpperCase();
  return rem === 10 ? check === "X" : String(rem) === check;
}

interface PositionInfo {
  positions: string;
  label: string;
  value: string;
  description: string;
}

function decodePositions(vin: string): PositionInfo[] {
  const v = vin.toUpperCase();
  const country = WMI_COUNTRIES[v[0]] || "Unknown";
  return [
    {
      positions: "1–3",
      label: "World Manufacturer Identifier (WMI)",
      value: v.slice(0, 3),
      description: `Identifies the manufacturer and country of assembly. Position 1 indicates region/country (${country}); positions 2–3 narrow it to the specific manufacturer and vehicle type.`,
    },
    {
      positions: "4–8",
      label: "Vehicle Descriptor Section (VDS)",
      value: v.slice(3, 8),
      description: "Manufacturer-defined characters encoding vehicle attributes: model, body style, restraint system, engine type, and transmission. The exact meaning of each position varies by manufacturer.",
    },
    {
      positions: "9",
      label: "Check Digit",
      value: v[8],
      description: `Mathematical validity check. Calculated by running a weighted sum of all other positions modulo 11. This VIN's check digit is ${decodeCheckDigit(v) ? "✓ valid" : "✗ invalid — may indicate a typo or fraudulent VIN"}.`,
    },
    {
      positions: "10",
      label: "Model Year",
      value: v[9],
      description: `Encodes the model year. "${v[9]}" = ${decodeModelYear(v[9])}. Note: manufacturers may use calendar year or production year — the API result is the most reliable source.`,
    },
    {
      positions: "11",
      label: "Plant Code",
      value: v[10],
      description: "Identifies the assembly plant where the vehicle was manufactured. Meaning is manufacturer-specific.",
    },
    {
      positions: "12–17",
      label: "Production Sequence Number",
      value: v.slice(11),
      description: "Sequential serial number assigned by the manufacturer at the assembly plant. Unique within a model year and plant combination.",
    },
  ];
}

/* ─── API response type ─────────────────────────────────────── */

interface VinData {
  vin?: string;
  error?: string;
  year?: number;
  make?: { name?: string } | string;
  model?: { name?: string } | string;
  trim?: string;
  bodyStyle?: string;
  drivenWheels?: string;
  numOfDoors?: number;
  engine?: {
    name?: string;
    type?: string;
    cylinder?: number;
    displacement?: number;
    horsepower?: number;
    torque?: number;
    fuelType?: string;
    compressionRatio?: number;
    valve?: number;
  };
  transmission?: { name?: string; transmissionType?: string; numberOfSpeeds?: string };
  colors?: { category?: string; name?: string }[];
  mpg?: { city?: string | number; highway?: string | number; combined?: string | number };
  price?: { baseMSRP?: number; baseInvoice?: number };
  categories?: {
    vehicleSize?: string;
    vehicleStyle?: string;
    primaryBodyType?: string;
    marketCategory?: string;
  };
  manufacturerCode?: string;
  plantCountry?: string;
  plantCity?: string;
  squishVin?: string;
}

function strVal(v: { name?: string } | string | undefined): string {
  if (!v) return "";
  if (typeof v === "string") return v;
  return v.name || "";
}

export default function VinDecoder() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [vinData, setVinData] = useState<VinData | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [activePos, setActivePos] = useState<number | null>(null);

  const cleaned = input.trim().toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, "");
  const isValid = cleaned.length === 17 && !/[IOQ]/.test(cleaned);
  const checkDigitOk = cleaned.length === 17 ? decodeCheckDigit(cleaned) : null;
  const positions = cleaned.length === 17 ? decodePositions(cleaned) : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) {
      setError("Please enter a valid 17-character VIN (no I, O, or Q).");
      return;
    }
    setError("");
    setLoading(true);
    setVinData(null);

    try {
      const res = await fetch(`/api/vin/${cleaned}`);
      const data = (await res.json()) as VinData;
      if (data.error) {
        setError(data.error);
      } else {
        setVinData(data);
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyVin() {
    try {
      await navigator.clipboard.writeText(cleaned);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* ignore */ }
  }

  // Highlight which VIN characters belong to hovered position group
  const highlightRange = activePos !== null
    ? [
        [0, 3], [3, 8], [8, 9], [9, 10], [10, 11], [11, 17],
      ][activePos]
    : null;

  return (
    <div className="space-y-6">
      {/* ── Search form ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="vin" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
              Enter VIN Number
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="vin"
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value.toUpperCase());
                  setError("");
                  setVinData(null);
                }}
                maxLength={17}
                placeholder="e.g. 1FTFW1ET0EFB12345"
                autoComplete="off"
                spellCheck={false}
                className="w-full pl-12 pr-24 py-4 border border-slate-200 rounded-xl text-base font-mono uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold ${cleaned.length === 17 ? "text-emerald-600" : "text-slate-400"}`}>
                {cleaned.length}/17
              </span>
            </div>

            {/* Live VIN visualizer */}
            {cleaned.length > 0 && (
              <div className="mt-3 flex gap-0.5 flex-wrap">
                {cleaned.split("").map((ch, i) => {
                  const inRange = highlightRange && i >= highlightRange[0] && i < highlightRange[1];
                  const posGroup = [0,0,0,1,1,1,1,1,2,3,4,5,5,5,5,5,5][i];
                  const colors = [
                    "bg-blue-100 text-blue-800 border-blue-200",
                    "bg-violet-100 text-violet-800 border-violet-200",
                    "bg-amber-100 text-amber-800 border-amber-200",
                    "bg-green-100 text-green-800 border-green-200",
                    "bg-orange-100 text-orange-800 border-orange-200",
                    "bg-rose-100 text-rose-800 border-rose-200",
                  ];
                  return (
                    <span
                      key={i}
                      className={`inline-flex items-center justify-center w-8 h-8 rounded text-xs font-mono font-bold border transition-all cursor-default
                        ${inRange ? "ring-2 ring-primary-400 scale-110" : ""}
                        ${colors[posGroup]}`}
                      title={`Position ${i + 1}`}
                    >
                      {ch}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Inline validation hints */}
            {cleaned.length === 17 && (
              <p className={`mt-2 text-xs flex items-center gap-1.5 font-medium ${checkDigitOk ? "text-emerald-600" : "text-amber-600"}`}>
                {checkDigitOk
                  ? <><CheckCircle2 className="w-3.5 h-3.5" /> Check digit valid — VIN structure looks correct</>
                  : <><AlertCircle className="w-3.5 h-3.5" /> Check digit mismatch — verify you typed it correctly</>
                }
              </p>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !isValid}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Decoding…</> : <><Search className="w-4 h-4" /> Decode VIN</>}
          </button>
        </form>
      </div>

      {/* ── Position breakdown (always shown once 17 chars entered) ── */}
      {cleaned.length === 17 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-400" />
            VIN Position Breakdown
          </h3>
          <div className="space-y-2">
            {positions.map((pos, i) => (
              <div
                key={pos.positions}
                onMouseEnter={() => setActivePos(i)}
                onMouseLeave={() => setActivePos(null)}
                className="flex gap-3 p-3 rounded-xl border border-transparent hover:border-primary-100 hover:bg-primary-50 transition-colors cursor-default"
              >
                <div className="flex-shrink-0 text-center">
                  <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded font-mono">
                    {pos.positions}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-700">{pos.label}</span>
                    <code className="text-xs font-mono font-bold text-primary-700 bg-primary-50 px-1.5 py-0.5 rounded">
                      {pos.value}
                    </code>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{pos.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── API decode results ── */}
      {vinData && (
        <div className="space-y-4">
          {/* Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Decoded Vehicle</p>
                <h3 className="text-2xl font-bold text-slate-900">
                  {vinData.year} {strVal(vinData.make)} {strVal(vinData.model)}
                  {vinData.trim ? ` ${vinData.trim}` : ""}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <code className="text-sm font-mono font-bold text-slate-700 tracking-widest">{cleaned}</code>
                  <button
                    type="button"
                    onClick={copyVin}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded cursor-pointer transition-colors"
                  >
                    {copied ? <><CheckCheck className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                  </button>
                </div>
              </div>
              <Link
                href={`/report/${cleaned}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors flex-shrink-0"
              >
                Full History Report <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Specs grid */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">Vehicle Specifications</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                ["Year", vinData.year?.toString()],
                ["Make", strVal(vinData.make)],
                ["Model", strVal(vinData.model)],
                ["Trim", vinData.trim],
                ["Body Style", vinData.bodyStyle || vinData.categories?.vehicleStyle],
                ["Drive", vinData.drivenWheels],
                ["Doors", vinData.numOfDoors?.toString()],
                ["Engine", vinData.engine?.name],
                ["Cylinders", vinData.engine?.cylinder?.toString()],
                ["Displacement", vinData.engine?.displacement ? `${vinData.engine.displacement}L` : undefined],
                ["Horsepower", vinData.engine?.horsepower ? `${vinData.engine.horsepower} hp` : undefined],
                ["Torque", vinData.engine?.torque ? `${vinData.engine.torque} lb-ft` : undefined],
                ["Fuel Type", vinData.engine?.fuelType],
                ["Transmission", vinData.transmission?.name],
                ["Trans Type", vinData.transmission?.transmissionType],
                ["Speeds", vinData.transmission?.numberOfSpeeds ? `${vinData.transmission.numberOfSpeeds}-speed` : undefined],
                ["City MPG", vinData.mpg?.city?.toString()],
                ["Hwy MPG", vinData.mpg?.highway?.toString()],
                ["Combined MPG", vinData.mpg?.combined?.toString()],
                ["Base MSRP", vinData.price?.baseMSRP ? `$${vinData.price.baseMSRP.toLocaleString()}` : undefined],
                ["Assembly", vinData.plantCity && vinData.plantCountry ? `${vinData.plantCity}, ${vinData.plantCountry}` : (vinData.plantCountry || undefined)],
                ["Market", vinData.categories?.marketCategory],
              ]
                .filter(([, v]) => v && String(v).trim() !== "")
                .map(([label, value]) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-0.5">{label}</p>
                    <p className="text-sm font-semibold text-slate-900 truncate">{value}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Colors */}
          {vinData.colors && vinData.colors.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Available Colors</h4>
              <div className="flex flex-wrap gap-2">
                {vinData.colors.map((c, i) => (
                  <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
                    <span className="text-slate-500 text-[10px] uppercase">{c.category} · </span>
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* History upsell */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-primary-50 border border-primary-100 rounded-2xl">
            <div>
              <p className="font-bold text-slate-900">Want the full story behind this VIN?</p>
              <p className="text-sm text-slate-600 mt-0.5">
                Specs are just part of the picture. The history report reveals accidents,
                title brands, odometer rollback, theft records, and open recalls.
              </p>
            </div>
            <Link
              href={`/report/${cleaned}`}
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors"
            >
              Run History Report <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
