"use client";

import { Fragment, useMemo, useState } from "react";
import {
  Search,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  MapPin,
  ShieldCheck,
  ShieldAlert,
  Shield,
} from "lucide-react";
import { LEMON_LAWS, type LemonLaw } from "@/lib/lemon-laws";

type SortKey =
  | "state"
  | "coveragePeriod"
  | "repairAttempts"
  | "usedCarCoverage"
  | "disclosureRequired";

const COLUMNS: { key: SortKey; label: string; className?: string }[] = [
  { key: "state", label: "State" },
  { key: "coveragePeriod", label: "Coverage Period" },
  { key: "repairAttempts", label: "Repair Attempts / Days OOS" },
  { key: "usedCarCoverage", label: "Used-Car" },
  { key: "disclosureRequired", label: "Title Disclosure" },
];

const COVERAGE_RANK: Record<LemonLaw["usedCarCoverage"], number> = {
  Yes: 0,
  Limited: 1,
  No: 2,
};

const DISCLOSURE_RANK: Record<LemonLaw["disclosureRequired"], number> = {
  Yes: 0,
  Limited: 1,
  No: 2,
};

function CoverageBadge({ value }: { value: LemonLaw["usedCarCoverage"] }) {
  if (value === "Yes")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-2.5 py-0.5 text-[11px] font-bold text-on-secondary-container">
        <ShieldCheck className="w-3 h-3" /> Yes
      </span>
    );
  if (value === "Limited")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-tertiary-container px-2.5 py-0.5 text-[11px] font-bold text-on-tertiary-container">
        <Shield className="w-3 h-3" /> Limited
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-error-container px-2.5 py-0.5 text-[11px] font-bold text-on-error-container">
      <ShieldAlert className="w-3 h-3" /> No
    </span>
  );
}

function DisclosureBadge({
  value,
}: {
  value: LemonLaw["disclosureRequired"];
}) {
  const tone =
    value === "Yes"
      ? "bg-secondary-container text-on-secondary-container"
      : value === "Limited"
      ? "bg-tertiary-container text-on-tertiary-container"
      : "bg-error-container text-on-error-container";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${tone}`}
    >
      {value}
    </span>
  );
}

/**
 * Interactive 50-state lemon law table.
 *
 * Features:
 *  - Live text filter (matches state name or abbreviation)
 *  - Sortable by any column (click header to toggle direction)
 *  - Expandable row reveals the full statute summary and the buyback title term
 *  - Quick-stat counts above the table react to the active filter
 *
 * Note: thresholds are educational summaries of public statutes — not legal
 * advice. See /lib/lemon-laws.ts for source notes.
 */
export default function StateLemonLawTable() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("state");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? LEMON_LAWS.filter(
          (l) =>
            l.state.toLowerCase().includes(q) ||
            l.abbr.toLowerCase().includes(q)
        )
      : LEMON_LAWS;

    const sorted = [...base].sort((a, b) => {
      let av: string | number = a[sortKey];
      let bv: string | number = b[sortKey];
      if (sortKey === "usedCarCoverage") {
        av = COVERAGE_RANK[a.usedCarCoverage];
        bv = COVERAGE_RANK[b.usedCarCoverage];
      } else if (sortKey === "disclosureRequired") {
        av = DISCLOSURE_RANK[a.disclosureRequired];
        bv = DISCLOSURE_RANK[b.disclosureRequired];
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [query, sortKey, sortDir]);

  const stats = useMemo(() => {
    const usedYes = filtered.filter((l) => l.usedCarCoverage === "Yes").length;
    const usedLimited = filtered.filter(
      (l) => l.usedCarCoverage === "Limited"
    ).length;
    const disclosureYes = filtered.filter(
      (l) => l.disclosureRequired === "Yes"
    ).length;
    return { usedYes, usedLimited, disclosureYes, total: filtered.length };
  }, [filtered]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const toggleRow = (abbr: string) =>
    setExpanded((cur) => (cur === abbr ? null : abbr));

  return (
    <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-4 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider bg-primary/10 text-primary rounded-full px-3 py-1 mb-3">
            <MapPin className="w-3.5 h-3.5" /> Interactive Tool
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary leading-tight">
            50-State Lemon Law Lookup
          </h2>
          <p className="mt-1.5 text-sm text-on-surface-variant max-w-xl">
            Search, sort, and expand any state to see coverage windows, repair
            thresholds, used-car protection, and the exact buyback title
            language.
          </p>
        </div>

        {/* Search input */}
        <label className="relative block w-full sm:w-72 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by state name or abbr…"
            aria-label="Filter states"
            className="w-full rounded-full border border-outline-variant bg-surface pl-10 pr-4 py-2.5 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </label>
      </div>

      {/* Live stat strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <div className="rounded-xl bg-surface-container-low border border-outline-variant px-3 py-2">
          <div className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
            Showing
          </div>
          <div className="text-lg font-headline font-extrabold text-primary">
            {stats.total} / 51
          </div>
        </div>
        <div className="rounded-xl bg-surface-container-low border border-outline-variant px-3 py-2">
          <div className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
            Used-car (full)
          </div>
          <div className="text-lg font-headline font-extrabold text-primary">
            {stats.usedYes}
          </div>
        </div>
        <div className="rounded-xl bg-surface-container-low border border-outline-variant px-3 py-2">
          <div className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
            Used-car (limited)
          </div>
          <div className="text-lg font-headline font-extrabold text-primary">
            {stats.usedLimited}
          </div>
        </div>
        <div className="rounded-xl bg-surface-container-low border border-outline-variant px-3 py-2">
          <div className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
            Title disclosure
          </div>
          <div className="text-lg font-headline font-extrabold text-primary">
            {stats.disclosureYes}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-outline-variant">
        <table className="w-full min-w-[720px] text-sm border-collapse">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="w-8 p-3"></th>
              {COLUMNS.map((col) => {
                const isActive = sortKey === col.key;
                return (
                  <th
                    key={col.key}
                    className="p-3 text-left font-headline font-extrabold text-primary text-xs uppercase tracking-wider"
                  >
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className="inline-flex items-center gap-1.5 hover:text-primary-700 transition-colors"
                      aria-label={`Sort by ${col.label}`}
                    >
                      {col.label}
                      {isActive ? (
                        sortDir === "asc" ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-40" />
                      )}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={COLUMNS.length + 1}
                  className="p-8 text-center text-sm text-on-surface-variant"
                >
                  No states match &ldquo;{query}&rdquo;. Try a different search.
                </td>
              </tr>
            )}
            {filtered.map((law) => {
              const isOpen = expanded === law.abbr;
              return (
                <Fragment key={law.abbr}>
                  <tr
                    onClick={() => toggleRow(law.abbr)}
                    className={`border-t border-outline-variant/60 cursor-pointer transition-colors ${
                      isOpen
                        ? "bg-primary/5"
                        : "hover:bg-surface-container-low"
                    }`}
                  >
                    <td className="p-3 align-top">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-primary" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-on-surface-variant" />
                      )}
                    </td>
                    <td className="p-3 align-top">
                      <div className="font-bold text-on-surface">
                        {law.state}
                      </div>
                      <div className="text-[11px] text-on-surface-variant font-mono">
                        {law.abbr}
                      </div>
                    </td>
                    <td className="p-3 align-top text-on-surface-variant">
                      {law.coveragePeriod}
                    </td>
                    <td className="p-3 align-top text-on-surface-variant">
                      {law.repairAttempts}
                    </td>
                    <td className="p-3 align-top">
                      <CoverageBadge value={law.usedCarCoverage} />
                    </td>
                    <td className="p-3 align-top">
                      <DisclosureBadge value={law.disclosureRequired} />
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-primary/5 border-t border-primary/20">
                      <td colSpan={COLUMNS.length + 1} className="p-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <h3 className="text-sm font-headline font-extrabold text-primary mb-1.5">
                              {law.state} Lemon Law Summary
                            </h3>
                            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                              {law.summary}
                            </p>
                          </div>
                          <div className="rounded-xl border border-outline-variant bg-surface px-4 py-3">
                            <div className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold mb-1">
                              Title brand language
                            </div>
                            <div className="text-sm font-bold text-on-surface leading-snug">
                              {law.brandTerm}
                            </div>
                            <p className="mt-2 text-[11px] text-on-surface-variant leading-relaxed italic">
                              Approximate &mdash; verify against the current
                              statute or state AG before relying on this for a
                              claim.
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[11px] text-on-surface-variant">
        Click any row to expand. Educational summaries of public state
        statutes &mdash; not legal advice.
      </p>
    </div>
  );
}
