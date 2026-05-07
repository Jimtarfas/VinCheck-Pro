"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Wrench,
  Copy,
  Check,
  ArrowRight,
  Car,
  XCircle,
  ShieldAlert,
  Info,
  ListChecks,
  Cog,
  DollarSign,
  Gauge,
} from "lucide-react";
import { OBD2_CODES, OBD2Code, TOP_CODES, findCode, searchCodes } from "@/lib/obd2-codes";

type CategoryFilter = "ALL" | "P" | "B" | "C" | "U";

const CATEGORY_LABELS: Record<Exclude<CategoryFilter, "ALL">, string> = {
  P: "Powertrain",
  B: "Body",
  C: "Chassis",
  U: "Network",
};

const SEVERITY_STYLES: Record<
  OBD2Code["severity"],
  { pill: string; box: string; icon: string; label: string; advice: string }
> = {
  low: {
    pill: "bg-emerald-100 text-emerald-800 border-emerald-200",
    box: "bg-emerald-50 border-emerald-200 text-emerald-900",
    icon: "text-emerald-600",
    label: "Low",
    advice:
      "This is generally a low-priority code. Continue driving normally, but plan to address it when convenient — especially before an emissions test.",
  },
  moderate: {
    pill: "bg-amber-100 text-amber-800 border-amber-200",
    box: "bg-amber-50 border-amber-200 text-amber-900",
    icon: "text-amber-600",
    label: "Moderate",
    advice:
      "Address this within the next few weeks. Driving with this code can affect fuel economy and may worsen if ignored. Diagnose before long trips.",
  },
  high: {
    pill: "bg-orange-100 text-orange-800 border-orange-200",
    box: "bg-orange-50 border-orange-200 text-orange-900",
    icon: "text-orange-600",
    label: "High",
    advice:
      "Repair as soon as possible. Continued driving may cause additional damage to expensive components like the catalytic converter or transmission.",
  },
  critical: {
    pill: "bg-red-100 text-red-800 border-red-200",
    box: "bg-red-50 border-red-200 text-red-900",
    icon: "text-red-600",
    label: "Critical",
    advice:
      "Stop driving and have the vehicle towed to a repair shop. Continuing to drive risks safety, severe engine/transmission damage, or non-functional safety systems.",
  },
};

const DIFFICULTY_LABELS: Record<OBD2Code["diyDifficulty"], string> = {
  easy: "Easy DIY",
  moderate: "Moderate DIY",
  hard: "Advanced DIY",
  professional: "Professional",
};

const CATEGORY_BADGE: Record<OBD2Code["category"], string> = {
  P: "bg-primary-100 text-primary-800 border-primary-200",
  B: "bg-purple-100 text-purple-800 border-purple-200",
  C: "bg-cyan-100 text-cyan-800 border-cyan-200",
  U: "bg-slate-200 text-slate-800 border-slate-300",
};

function formatMoney(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function OBD2CodeLookup() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("ALL");
  const [copied, setCopied] = useState(false);

  const trimmed = query.trim().toUpperCase();
  const exactMatch = useMemo(() => findCode(trimmed), [trimmed]);
  const partialMatches = useMemo(() => {
    if (!trimmed) return [];
    if (exactMatch) return [];
    return searchCodes(trimmed);
  }, [trimmed, exactMatch]);

  const showingDetail = !!exactMatch;
  const isValidFormat = /^[PBCU]\d{1,4}$/i.test(trimmed);

  const filteredAll = useMemo(() => {
    if (activeCategory === "ALL") return OBD2_CODES;
    return OBD2_CODES.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  const topCodes = useMemo(
    () =>
      TOP_CODES.map((code) => OBD2_CODES.find((c) => c.code === code)).filter(
        (c): c is OBD2Code => !!c,
      ),
    [],
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value.toUpperCase());
    setCopied(false);
  }

  function copyCode() {
    if (!exactMatch) return;
    navigator.clipboard.writeText(exactMatch.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      {/* ── Search Box ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7">
        <label htmlFor="obd2-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
          Enter Trouble Code
        </label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            id="obd2-input"
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="e.g. P0420, P0171, U0100"
            maxLength={6}
            autoComplete="off"
            spellCheck={false}
            className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl text-lg font-mono font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <p className="mt-2 text-[11px] text-slate-500">
          Format:{" "}
          <span className="font-mono font-bold">[P/B/C/U] + 4 digits</span>{" "}
          (e.g. P0420). Search by code or keyword.
        </p>
      </div>

      {/* ── DETAIL VIEW (exact match) ── */}
      {showingDetail && exactMatch && (
        <CodeDetail code={exactMatch} onCopy={copyCode} copied={copied} />
      )}

      {/* ── PARTIAL MATCHES ── */}
      {!showingDetail && partialMatches.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
            {partialMatches.length} matching code{partialMatches.length === 1 ? "" : "s"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {partialMatches.map((c) => (
              <CodePill key={c.code} code={c} onSelect={() => setQuery(c.code)} />
            ))}
          </div>
        </div>
      )}

      {/* ── EMPTY STATE: no query and no exact match ── */}
      {!showingDetail && partialMatches.length === 0 && (
        <>
          {/* Invalid format hint */}
          {trimmed.length > 0 && !isValidFormat && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <p>
                <strong>Invalid format.</strong> OBD-II codes start with one of{" "}
                <span className="font-mono font-bold">P / B / C / U</span> followed by 4
                digits, e.g. <span className="font-mono">P0420</span>.
              </p>
            </div>
          )}
          {trimmed.length > 0 && isValidFormat && !exactMatch && (
            <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-slate-500" />
              <p>
                Code <span className="font-mono font-bold">{trimmed}</span> isn&rsquo;t in our
                curated database (we cover ~120 of the most-searched codes). Try a generic OBD-II
                code reference for rare or manufacturer-specific codes, or browse the most-common
                codes below.
              </p>
            </div>
          )}

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2">
            {(["ALL", "P", "B", "C", "U"] as CategoryFilter[]).map((cat) => {
              const active = activeCategory === cat;
              const label =
                cat === "ALL"
                  ? "All Codes"
                  : `${cat} — ${CATEGORY_LABELS[cat as Exclude<CategoryFilter, "ALL">]}`;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full border text-sm font-bold transition-colors cursor-pointer ${
                    active
                      ? "bg-primary-600 border-primary-600 text-white"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Most-searched codes (when ALL) */}
          {activeCategory === "ALL" && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Most-Searched Codes</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {topCodes.map((c) => (
                  <CodePill key={c.code} code={c} onSelect={() => setQuery(c.code)} />
                ))}
              </div>
            </section>
          )}

          {/* Filtered list when a category is selected (or full grid for ALL) */}
          {activeCategory !== "ALL" && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                {CATEGORY_LABELS[activeCategory]} Codes
                <span className="ml-2 text-sm font-normal text-slate-500">
                  ({filteredAll.length} in database)
                </span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {filteredAll.map((c) => (
                  <CodePill key={c.code} code={c} onSelect={() => setQuery(c.code)} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────── */

function CodePill({ code, onSelect }: { code: OBD2Code; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="text-left px-3 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-primary-300 transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono font-bold text-sm text-slate-900">{code.code}</span>
        <span
          className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${CATEGORY_BADGE[code.category]}`}
        >
          {code.category}
        </span>
      </div>
      <p className="mt-1 text-[11px] text-slate-600 leading-snug line-clamp-2">{code.title}</p>
    </button>
  );
}

function CodeDetail({
  code,
  onCopy,
  copied,
}: {
  code: OBD2Code;
  onCopy: () => void;
  copied: boolean;
}) {
  const sev = SEVERITY_STYLES[code.severity];

  return (
    <div className="space-y-4">
      {/* Big code header */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-3xl sm:text-4xl font-bold text-slate-900">
                {code.code}
              </span>
              <span
                className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${CATEGORY_BADGE[code.category]}`}
              >
                {code.category} — {CATEGORY_LABELS[code.category]}
              </span>
              <span
                className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${sev.pill}`}
              >
                {sev.label} severity
              </span>
              {code.type === "manufacturer" && (
                <span className="text-[10px] uppercase font-bold px-2 py-1 rounded border bg-slate-100 text-slate-700 border-slate-200">
                  Manufacturer-specific
                </span>
              )}
            </div>
            <h2 className="mt-3 text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {code.title}
            </h2>
            <p className="mt-2 text-slate-700 leading-relaxed">{code.shortDesc}</p>
          </div>
          <button
            type="button"
            onClick={onCopy}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          icon={<ShieldAlert className={`w-4 h-4 ${sev.icon}`} />}
          label="Severity"
          value={sev.label}
        />
        <StatCard
          icon={<Wrench className="w-4 h-4 text-slate-500" />}
          label="DIY Difficulty"
          value={DIFFICULTY_LABELS[code.diyDifficulty]}
        />
        <StatCard
          icon={
            code.drivable ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600" />
            )
          }
          label="Drivable"
          value={code.drivable ? "Yes (with caution)" : "No — tow it"}
          valueClass={code.drivable ? "text-emerald-700" : "text-red-700"}
        />
        <StatCard
          icon={<DollarSign className="w-4 h-4 text-slate-500" />}
          label="Est. Repair"
          value={
            code.estimatedRepairCost.min === 0 && code.estimatedRepairCost.max === 0
              ? "Free / DIY"
              : `${formatMoney(code.estimatedRepairCost.min)}–${formatMoney(code.estimatedRepairCost.max)}`
          }
        />
      </div>

      {/* Symptoms */}
      {code.symptoms.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
            <ListChecks className="w-4 h-4 text-primary-600" />
            Common Symptoms
          </h3>
          <ul className="space-y-2">
            {code.symptoms.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Causes */}
      {code.causes.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
            <Cog className="w-4 h-4 text-primary-600" />
            Probable Causes <span className="text-[10px] text-slate-500 normal-case font-normal">(most to least common)</span>
          </h3>
          <ol className="space-y-2 list-decimal list-inside">
            {code.causes.map((c) => (
              <li key={c} className="text-sm text-slate-700 leading-relaxed">
                {c}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Affected systems */}
      {code.affectedSystems.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
            <Gauge className="w-4 h-4 text-primary-600" />
            Affected Systems
          </h3>
          <div className="flex flex-wrap gap-2">
            {code.affectedSystems.map((sys) => (
              <span
                key={sys}
                className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full border border-slate-200"
              >
                {sys}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* What to do */}
      <div className={`p-5 rounded-2xl border ${sev.box}`}>
        <div className="flex items-start gap-3">
          {code.severity === "critical" ? (
            <AlertOctagon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${sev.icon}`} />
          ) : code.severity === "high" ? (
            <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${sev.icon}`} />
          ) : (
            <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${sev.icon}`} />
          )}
          <div>
            <p className="font-bold text-sm uppercase tracking-wide mb-1">What to do</p>
            <p className="text-sm leading-relaxed">{sev.advice}</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <Link
        href="/vin-check"
        className="flex items-center justify-between gap-3 p-5 bg-primary-50 border border-primary-100 rounded-2xl hover:bg-primary-100 transition-colors group"
      >
        <div className="flex items-start gap-3">
          <Car className="w-6 h-6 text-primary-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-900 text-sm">
              Buying or selling this car? Get the full vehicle history.
            </p>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Recurring trouble codes can hint at hidden accident damage, flood history, or
              salvage rebuilds. Run a free VIN check to see the full report.
            </p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-primary-700 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  valueClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center gap-1.5 mb-1.5">
        {icon}
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
      </div>
      <p className={`text-sm font-bold ${valueClass ?? "text-slate-900"}`}>{value}</p>
    </div>
  );
}
