"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Armchair,
  Car,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCopy,
  ClipboardList,
  Disc,
  FileText,
  Gauge,
  Minus,
  Printer,
  RefreshCcw,
  Settings,
  ShieldAlert,
  Wrench,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import {
  inspectionChecklist,
  type ChecklistSection,
  type ChecklistSeverity,
} from "@/lib/inspection-checklist";

type Verdict = "Pass" | "Fail" | "Skip";

const STORAGE_KEY = "vcp_inspection_checklist_v1";

interface VehicleInfo {
  year: string;
  make: string;
  model: string;
  vin: string;
  mileage: string;
  askingPrice: string;
  sellerName: string;
}

const EMPTY_VEHICLE: VehicleInfo = {
  year: "",
  make: "",
  model: "",
  vin: "",
  mileage: "",
  askingPrice: "",
  sellerName: "",
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Car,
  Wrench,
  Settings,
  Armchair,
  Gauge,
  FileText,
  Disc,
  Zap,
};

const TOTAL_ITEMS = inspectionChecklist.reduce((s, sec) => s + sec.items.length, 0);

const SEVERITY_LABEL: Record<ChecklistSeverity, string> = {
  "deal-breaker": "Deal-breaker",
  major: "Major",
  minor: "Minor",
  info: "Info",
};

const SEVERITY_PILL: Record<ChecklistSeverity, string> = {
  "deal-breaker": "bg-red-100 text-red-800 border-red-200",
  major: "bg-orange-100 text-orange-800 border-orange-200",
  minor: "bg-amber-100 text-amber-800 border-amber-200",
  info: "bg-slate-100 text-slate-700 border-slate-200",
};

const FAIL_BG: Record<ChecklistSeverity, string> = {
  "deal-breaker": "bg-red-50 border-red-300",
  major: "bg-orange-50 border-orange-300",
  minor: "bg-amber-50 border-amber-300",
  info: "bg-slate-50 border-slate-300",
};

export default function InspectionChecklist() {
  const [vehicle, setVehicle] = useState<VehicleInfo>(EMPTY_VEHICLE);
  // verdicts: { [itemId]: "Pass" | "Fail" | "Skip" }
  const [verdicts, setVerdicts] = useState<Record<string, Verdict>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(inspectionChecklist.map((s) => [s.id, true])),
  );
  const [reportOpen, setReportOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { vehicle?: VehicleInfo; verdicts?: Record<string, Verdict> };
        if (parsed.vehicle) setVehicle({ ...EMPTY_VEHICLE, ...parsed.vehicle });
        if (parsed.verdicts) setVerdicts(parsed.verdicts);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ vehicle, verdicts }));
    } catch {
      // ignore
    }
  }, [vehicle, verdicts, hydrated]);

  function setVerdict(id: string, v: Verdict) {
    setVerdicts((prev) => {
      const next = { ...prev };
      if (prev[id] === v) {
        delete next[id];
      } else {
        next[id] = v;
      }
      return next;
    });
  }

  function toggleSection(id: string) {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function resetAll() {
    if (typeof window !== "undefined") {
      const ok = window.confirm("Clear all answers and vehicle info? This can't be undone.");
      if (!ok) return;
    }
    setVerdicts({});
    setVehicle(EMPTY_VEHICLE);
  }

  // Stats
  const stats = useMemo(() => {
    let pass = 0;
    let fail = 0;
    let skip = 0;
    let answered = 0;
    const failedBySeverity: Record<ChecklistSeverity, number> = {
      "deal-breaker": 0,
      major: 0,
      minor: 0,
      info: 0,
    };
    for (const section of inspectionChecklist) {
      for (const item of section.items) {
        const v = verdicts[item.id];
        if (!v) continue;
        answered++;
        if (v === "Pass") pass++;
        else if (v === "Fail") {
          fail++;
          failedBySeverity[item.severity]++;
        } else if (v === "Skip") skip++;
      }
    }
    const redFlags = failedBySeverity["deal-breaker"] + failedBySeverity["major"];
    return { pass, fail, skip, answered, failedBySeverity, redFlags };
  }, [verdicts]);

  const verdict: { level: "green" | "amber" | "red"; label: string; detail: string } = useMemo(() => {
    if (stats.failedBySeverity["deal-breaker"] > 0) {
      return {
        level: "red",
        label: "Walk away or substantial price reduction needed",
        detail:
          "One or more deal-breakers were marked Fail. These issues compromise safety, legality, or have repair costs that exceed reasonable depreciation.",
      };
    }
    if (stats.failedBySeverity["major"] >= 2) {
      return {
        level: "red",
        label: "Walk away or substantial price reduction needed",
        detail:
          "Multiple major issues were flagged. Combined repair costs likely exceed $2,500. Negotiate hard or move on.",
      };
    }
    if (stats.failedBySeverity["major"] === 1 || stats.failedBySeverity["minor"] >= 3) {
      return {
        level: "amber",
        label: "Negotiate or get a mechanic PPI",
        detail:
          "Notable issues found. Get a written repair estimate, deduct from asking price, and consider a paid mechanic pre-purchase inspection.",
      };
    }
    if (stats.answered === 0) {
      return {
        level: "amber",
        label: "Inspection not started",
        detail: "Walk through every section and mark Pass / Fail / Skip to get a verdict.",
      };
    }
    return {
      level: "green",
      label: "Looks solid — proceed with confidence",
      detail:
        "No deal-breakers and minimal major issues. Run a VIN history check to confirm the title is clean before paying.",
    };
  }, [stats]);

  const progressPct = Math.round((stats.answered / TOTAL_ITEMS) * 100);

  const failedItems = useMemo(() => {
    const grouped: { section: ChecklistSection; items: ChecklistSection["items"] }[] = [];
    for (const section of inspectionChecklist) {
      const items = section.items.filter((i) => verdicts[i.id] === "Fail");
      if (items.length) grouped.push({ section, items });
    }
    return grouped;
  }, [verdicts]);

  function buildMarkdown(): string {
    const v = vehicle;
    const titleLine =
      [v.year, v.make, v.model].filter(Boolean).join(" ") || "Used vehicle inspection";
    const lines: string[] = [];
    lines.push(`# ${titleLine}`);
    if (v.vin) lines.push(`**VIN:** ${v.vin}`);
    if (v.mileage) lines.push(`**Mileage:** ${v.mileage}`);
    if (v.askingPrice) lines.push(`**Asking price:** ${v.askingPrice}`);
    if (v.sellerName) lines.push(`**Seller:** ${v.sellerName}`);
    lines.push("");
    lines.push(`## Score`);
    lines.push(`- Passed: ${stats.pass}`);
    lines.push(`- Failed: ${stats.fail}`);
    lines.push(`- Skipped: ${stats.skip}`);
    lines.push(`- Total reviewed: ${stats.answered} / ${TOTAL_ITEMS}`);
    lines.push("");
    lines.push(`## Severity breakdown (failed items)`);
    lines.push(`- Deal-breakers: ${stats.failedBySeverity["deal-breaker"]}`);
    lines.push(`- Major: ${stats.failedBySeverity["major"]}`);
    lines.push(`- Minor: ${stats.failedBySeverity["minor"]}`);
    lines.push(`- Info: ${stats.failedBySeverity["info"]}`);
    lines.push("");
    lines.push(`## Buyer's verdict — ${verdict.level.toUpperCase()}`);
    lines.push(`**${verdict.label}**`);
    lines.push("");
    lines.push(verdict.detail);
    lines.push("");
    if (failedItems.length) {
      lines.push(`## Failed items`);
      for (const { section, items } of failedItems) {
        lines.push("");
        lines.push(`### ${section.title}`);
        for (const item of items) {
          lines.push(`- **[${SEVERITY_LABEL[item.severity]}]** ${item.question}`);
          lines.push(`  - ${item.redFlagIfFailed}`);
        }
      }
    } else {
      lines.push(`## No failed items`);
    }
    lines.push("");
    lines.push(`_Generated with CarCheckerVIN's free pre-purchase inspection checklist._`);
    return lines.join("\n");
  }

  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(buildMarkdown());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      setCopied(false);
    }
  }

  function printReport() {
    if (typeof window !== "undefined") window.print();
  }

  return (
    <div className="space-y-6">
      {/* Print-only stylesheet */}
      <style jsx global>{`
        @media print {
          header,
          nav,
          footer,
          .print\\:hidden {
            display: none !important;
          }
          body {
            background: white !important;
          }
          .checklist-print-only {
            display: block !important;
          }
          .checklist-screen-only {
            display: none !important;
          }
          .checklist-print-section {
            page-break-inside: avoid;
          }
        }
        .checklist-print-only {
          display: none;
        }
      `}</style>

      {/* ── Vehicle info ── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 print:hidden">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-bold text-slate-900">Vehicle Being Inspected</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Year" value={vehicle.year} onChange={(year) => setVehicle((p) => ({ ...p, year }))} placeholder="2018" />
          <Field label="Make" value={vehicle.make} onChange={(make) => setVehicle((p) => ({ ...p, make }))} placeholder="Toyota" />
          <Field label="Model" value={vehicle.model} onChange={(model) => setVehicle((p) => ({ ...p, model }))} placeholder="Camry" />
          <Field label="VIN" value={vehicle.vin} onChange={(vin) => setVehicle((p) => ({ ...p, vin: vin.toUpperCase() }))} placeholder="17-character VIN" maxLength={17} />
          <Field label="Mileage" value={vehicle.mileage} onChange={(mileage) => setVehicle((p) => ({ ...p, mileage }))} placeholder="78,500" />
          <Field label="Asking price" value={vehicle.askingPrice} onChange={(askingPrice) => setVehicle((p) => ({ ...p, askingPrice }))} placeholder="$14,995" />
          <div className="sm:col-span-2">
            <Field label="Seller name" value={vehicle.sellerName} onChange={(sellerName) => setVehicle((p) => ({ ...p, sellerName }))} placeholder="John Doe (private party / dealer)" />
          </div>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="print:hidden">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-bold text-slate-900">
              {stats.answered} / {TOTAL_ITEMS} items reviewed
            </span>
            <span
              className={
                "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full " +
                (stats.redFlags === 0
                  ? "bg-emerald-100 text-emerald-800"
                  : stats.failedBySeverity["deal-breaker"] > 0
                    ? "bg-red-100 text-red-800"
                    : "bg-orange-100 text-orange-800")
              }
            >
              {stats.failedBySeverity["deal-breaker"] > 0 ? (
                <ShieldAlert className="w-3.5 h-3.5" />
              ) : stats.redFlags > 0 ? (
                <AlertTriangle className="w-3.5 h-3.5" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
              {stats.redFlags} red flag{stats.redFlags === 1 ? "" : "s"}
            </span>
          </div>
          <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setReportOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              Generate Report
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* ── Sections ── */}
      <div className="space-y-4 print:hidden">
        {inspectionChecklist.map((section) => {
          const Icon = ICON_MAP[section.icon] ?? ClipboardList;
          const isOpen = openSections[section.id];
          const sectionStats = section.items.reduce(
            (acc, item) => {
              const v = verdicts[item.id];
              if (v === "Pass") acc.pass++;
              else if (v === "Fail") acc.fail++;
              else if (v === "Skip") acc.skip++;
              return acc;
            },
            { pass: 0, fail: 0, skip: 0 },
          );
          return (
            <div
              key={section.id}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center gap-3 p-4 sm:p-5 text-left hover:bg-slate-50 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900">{section.title}</h3>
                    <span className="text-xs text-slate-500 font-mono">
                      {sectionStats.pass + sectionStats.fail + sectionStats.skip} / {section.items.length}
                    </span>
                    {sectionStats.fail > 0 && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-red-700 bg-red-50 border border-red-200 rounded-full px-2 py-0.5">
                        <XCircle className="w-3 h-3" />
                        {sectionStats.fail} failed
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {section.description}
                  </p>
                </div>
                <ChevronDown
                  className={
                    "w-5 h-5 text-slate-400 transition-transform flex-shrink-0 " +
                    (isOpen ? "rotate-180" : "")
                  }
                />
              </button>
              {isOpen && (
                <div className="border-t border-slate-100 divide-y divide-slate-100">
                  {section.items.map((item) => {
                    const v = verdicts[item.id];
                    const failed = v === "Fail";
                    const cardClass = failed ? FAIL_BG[item.severity] : "bg-white border-transparent";
                    return (
                      <div
                        key={item.id}
                        className={`p-4 sm:p-5 border-l-4 transition-colors ${cardClass}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span
                                className={`inline-flex items-center text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full border ${SEVERITY_PILL[item.severity]}`}
                              >
                                {SEVERITY_LABEL[item.severity]}
                              </span>
                            </div>
                            <p className="font-medium text-slate-900 leading-snug">
                              {item.question}
                            </p>
                            {item.helpText && (
                              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                                {item.helpText}
                              </p>
                            )}
                            {failed && (
                              <p className="mt-2 text-xs text-red-800 bg-white/60 rounded-lg p-2 leading-relaxed border border-red-200">
                                <strong>Red flag:</strong> {item.redFlagIfFailed}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <VerdictButton
                            active={v === "Pass"}
                            tone="emerald"
                            onClick={() => setVerdict(item.id, "Pass")}
                            icon={<Check className="w-3.5 h-3.5" />}
                            label="Pass"
                          />
                          <VerdictButton
                            active={v === "Fail"}
                            tone="red"
                            onClick={() => setVerdict(item.id, "Fail")}
                            icon={<X className="w-3.5 h-3.5" />}
                            label="Fail"
                          />
                          <VerdictButton
                            active={v === "Skip"}
                            tone="slate"
                            onClick={() => setVerdict(item.id, "Skip")}
                            icon={<Minus className="w-3.5 h-3.5" />}
                            label="Skip"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Report modal / view ── */}
      {reportOpen && (
        <ReportView
          vehicle={vehicle}
          stats={stats}
          verdict={verdict}
          failedItems={failedItems}
          onClose={() => setReportOpen(false)}
          onPrint={printReport}
          onCopy={copyMarkdown}
          copied={copied}
        />
      )}
    </div>
  );
}

/* ─── Subcomponents ─────────────────────────────────────── */

function Field({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
      />
    </label>
  );
}

function VerdictButton({
  active,
  tone,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  tone: "emerald" | "red" | "slate";
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  const activeClasses: Record<typeof tone, string> = {
    emerald: "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700",
    red: "bg-red-600 text-white border-red-600 hover:bg-red-700",
    slate: "bg-slate-700 text-white border-slate-700 hover:bg-slate-800",
  };
  const idleClasses: Record<typeof tone, string> = {
    emerald: "bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50",
    red: "bg-white text-red-700 border-red-200 hover:bg-red-50",
    slate: "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-colors ${active ? activeClasses[tone] : idleClasses[tone]}`}
    >
      {icon}
      {label}
    </button>
  );
}

function ReportView({
  vehicle,
  stats,
  verdict,
  failedItems,
  onClose,
  onPrint,
  onCopy,
  copied,
}: {
  vehicle: VehicleInfo;
  stats: {
    pass: number;
    fail: number;
    skip: number;
    answered: number;
    failedBySeverity: Record<ChecklistSeverity, number>;
    redFlags: number;
  };
  verdict: { level: "green" | "amber" | "red"; label: string; detail: string };
  failedItems: { section: ChecklistSection; items: ChecklistSection["items"] }[];
  onClose: () => void;
  onPrint: () => void;
  onCopy: () => void;
  copied: boolean;
}) {
  const titleLine =
    [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ") || "Used vehicle inspection";

  const verdictColor: Record<typeof verdict.level, string> = {
    green: "bg-emerald-50 border-emerald-300 text-emerald-900",
    amber: "bg-amber-50 border-amber-300 text-amber-900",
    red: "bg-red-50 border-red-300 text-red-900",
  };
  const verdictBadge: Record<typeof verdict.level, string> = {
    green: "bg-emerald-600 text-white",
    amber: "bg-amber-500 text-white",
    red: "bg-red-600 text-white",
  };
  const verdictLetter: Record<typeof verdict.level, string> = {
    green: "GREEN",
    amber: "AMBER",
    red: "RED",
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 flex items-start justify-center overflow-y-auto p-3 sm:p-6 print:static print:bg-white print:p-0 print:overflow-visible"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl my-4 print:shadow-none print:my-0 print:rounded-none">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 p-5 border-b border-slate-200 print:hidden">
          <h2 className="text-lg font-bold text-slate-900">Inspection Report</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close report"
            className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 inline-flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 space-y-6 text-slate-800">
          {/* Vehicle */}
          <section className="checklist-print-section">
            <h1 className="text-2xl font-bold text-slate-900">{titleLine}</h1>
            <dl className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
              {vehicle.vin && <ReportField label="VIN" value={vehicle.vin} />}
              {vehicle.mileage && <ReportField label="Mileage" value={vehicle.mileage} />}
              {vehicle.askingPrice && <ReportField label="Asking price" value={vehicle.askingPrice} />}
              {vehicle.sellerName && <ReportField label="Seller" value={vehicle.sellerName} />}
              <ReportField label="Inspected on" value={new Date().toLocaleDateString()} />
            </dl>
          </section>

          {/* Verdict */}
          <section className={`rounded-2xl border p-5 ${verdictColor[verdict.level]} checklist-print-section`}>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center justify-center text-xs font-extrabold tracking-wide px-3 py-1 rounded-full ${verdictBadge[verdict.level]}`}
              >
                {verdictLetter[verdict.level]}
              </span>
              <p className="font-bold">{verdict.label}</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed">{verdict.detail}</p>
          </section>

          {/* Score */}
          <section className="checklist-print-section">
            <h3 className="font-bold text-slate-900 mb-3">Score</h3>
            <div className="grid grid-cols-3 gap-3">
              <ScoreTile color="emerald" label="Passed" value={stats.pass} />
              <ScoreTile color="red" label="Failed" value={stats.fail} />
              <ScoreTile color="slate" label="Skipped" value={stats.skip} />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {stats.answered} of {TOTAL_ITEMS} items reviewed.
            </p>
          </section>

          {/* Severity breakdown */}
          <section className="checklist-print-section">
            <h3 className="font-bold text-slate-900 mb-3">Failed items by severity</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
              <SevTile tone="red" label="Deal-breakers" value={stats.failedBySeverity["deal-breaker"]} />
              <SevTile tone="orange" label="Major" value={stats.failedBySeverity["major"]} />
              <SevTile tone="amber" label="Minor" value={stats.failedBySeverity["minor"]} />
              <SevTile tone="slate" label="Info" value={stats.failedBySeverity["info"]} />
            </div>
          </section>

          {/* Deal-breaker callout */}
          {stats.failedBySeverity["deal-breaker"] > 0 && (
            <section className="rounded-2xl border border-red-300 bg-red-50 p-5 checklist-print-section">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-900">
                    {stats.failedBySeverity["deal-breaker"]} deal-breaker{stats.failedBySeverity["deal-breaker"] === 1 ? "" : "s"} found
                  </p>
                  <p className="mt-1 text-sm text-red-800 leading-relaxed">
                    Deal-breaker findings compromise safety, legality, or carry repair costs that exceed
                    reasonable depreciation. The recommendation is to walk away unless the seller drops
                    the price by enough to cover the worst-case repair, plus a margin for unknowns.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Failed items grouped */}
          <section className="checklist-print-section">
            <h3 className="font-bold text-slate-900 mb-3">Failed items</h3>
            {failedItems.length === 0 ? (
              <p className="text-sm text-slate-600 italic">
                No items were marked Fail. Either the vehicle is in great shape, or you have items still
                to review.
              </p>
            ) : (
              <div className="space-y-4">
                {failedItems.map(({ section, items }) => (
                  <div key={section.id} className="rounded-xl border border-slate-200 p-4">
                    <p className="font-bold text-slate-900 text-sm mb-2">{section.title}</p>
                    <ul className="space-y-2.5">
                      {items.map((item) => (
                        <li key={item.id} className="text-sm">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span
                              className={`inline-flex items-center text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full border ${SEVERITY_PILL[item.severity]}`}
                            >
                              {SEVERITY_LABEL[item.severity]}
                            </span>
                            <span className="font-medium text-slate-900">{item.question}</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed pl-1">
                            {item.redFlagIfFailed}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>

          <p className="text-xs text-slate-500 italic checklist-print-section">
            Generated with CarCheckerVIN&rsquo;s free pre-purchase inspection checklist. Not a substitute
            for a licensed mechanic&rsquo;s pre-purchase inspection.
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-end gap-2 p-5 border-t border-slate-200 bg-slate-50 rounded-b-2xl print:hidden">
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            <ClipboardCopy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy as Markdown"}
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print Report
          </button>
        </div>
      </div>
    </div>
  );
}

function ReportField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="text-slate-500 font-medium w-32 flex-shrink-0">{label}</dt>
      <dd className="text-slate-900 font-mono break-all">{value}</dd>
    </div>
  );
}

function ScoreTile({ color, label, value }: { color: "emerald" | "red" | "slate"; label: string; value: number }) {
  const cls: Record<typeof color, string> = {
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
    red: "bg-red-50 border-red-200 text-red-800",
    slate: "bg-slate-50 border-slate-200 text-slate-800",
  };
  return (
    <div className={`rounded-xl border p-3 text-center ${cls[color]}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs font-medium mt-0.5">{label}</p>
    </div>
  );
}

function SevTile({ tone, label, value }: { tone: "red" | "orange" | "amber" | "slate"; label: string; value: number }) {
  const cls: Record<typeof tone, string> = {
    red: "bg-red-50 border-red-200 text-red-800",
    orange: "bg-orange-50 border-orange-200 text-orange-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    slate: "bg-slate-50 border-slate-200 text-slate-700",
  };
  return (
    <div className={`rounded-lg border p-3 text-center ${cls[tone]}`}>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-[11px] font-medium mt-0.5">{label}</p>
    </div>
  );
}
