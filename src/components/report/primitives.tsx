"use client";

/**
 * Shared presentational primitives for the premium VIN report.
 *
 * Every piece is dark-mode aware (class-based `dark:` variant, scoped to the
 * report root) and print-friendly. No external UI dependency.
 */

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronDown, Inbox } from "lucide-react";

/* ── Collapsible section card ─────────────────────────────────────────── */

export function ReportSection({
  id,
  icon: Icon,
  title,
  subtitle,
  count,
  tone = "default",
  defaultOpen = true,
  children,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  count?: number | string;
  tone?: "default" | "alert" | "good";
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const toneRing =
    tone === "alert"
      ? "ring-1 ring-red-200 dark:ring-red-500/30"
      : tone === "good"
      ? "ring-1 ring-green-200 dark:ring-green-500/30"
      : "ring-1 ring-black/5 dark:ring-white/10";
  const iconWrap =
    tone === "alert"
      ? "bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-300"
      : tone === "good"
      ? "bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-300"
      : "bg-primary/10 text-primary dark:bg-primary-fixed/15 dark:text-primary-fixed";

  return (
    <section
      id={id}
      className={`scroll-mt-24 rounded-2xl bg-white dark:bg-slate-900 shadow-sm ${toneRing} print:shadow-none print:ring-0 print:border print:border-slate-200`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 sm:px-6 py-4 text-left print:cursor-default"
      >
        <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${iconWrap}`}>
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <h2 className="truncate text-base sm:text-lg font-headline font-bold text-on-surface dark:text-slate-100">
              {title}
            </h2>
            {count !== undefined && (
              <span className="flex-shrink-0 rounded-full bg-surface-container px-2 py-0.5 text-[11px] font-bold text-on-surface-variant dark:bg-slate-800 dark:text-slate-300">
                {count}
              </span>
            )}
          </span>
          {subtitle && (
            <span className="block truncate text-xs sm:text-sm text-on-surface-variant dark:text-slate-400">
              {subtitle}
            </span>
          )}
        </span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-on-surface-variant transition-transform dark:text-slate-400 print:hidden ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div className={`${open ? "block" : "hidden"} px-4 sm:px-6 pb-5 sm:pb-6 print:block`}>
        {children}
      </div>
    </section>
  );
}

/* ── Badge / status pill ──────────────────────────────────────────────── */

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "good" | "warning" | "critical" | "info";
  children: React.ReactNode;
}) {
  const map = {
    neutral: "bg-surface-container text-on-surface-variant dark:bg-slate-800 dark:text-slate-300",
    good: "bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-300",
    warning: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    critical: "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300",
    info: "bg-primary/10 text-primary dark:bg-primary-fixed/15 dark:text-primary-fixed",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${map[tone]}`}>
      {children}
    </span>
  );
}

/* ── Stat tile ────────────────────────────────────────────────────────── */

export function StatTile({
  icon: Icon,
  label,
  value,
  tone = "neutral",
}: {
  icon?: LucideIcon;
  label: string;
  value: React.ReactNode;
  tone?: "neutral" | "good" | "warning" | "critical";
}) {
  const accent = {
    neutral: "text-on-surface dark:text-slate-100",
    good: "text-green-600 dark:text-green-400",
    warning: "text-amber-600 dark:text-amber-400",
    critical: "text-red-600 dark:text-red-400",
  }[tone];
  return (
    <div className="rounded-xl bg-surface-container-low dark:bg-slate-800/60 p-3.5">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant dark:text-slate-400">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
      </div>
      <div className={`mt-1 text-xl font-headline font-extrabold tabular-nums ${accent}`}>{value}</div>
    </div>
  );
}

/* ── Key/value data grid ──────────────────────────────────────────────── */

export function DataGrid({ rows }: { rows: { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
      {rows.map((r, i) => (
        <div
          key={r.label}
          className={`flex items-start justify-between gap-4 py-2.5 ${
            i === 0 ? "" : "border-t border-outline-variant/40 dark:border-white/5"
          } sm:border-t sm:[&:nth-child(-n+2)]:border-t-0`}
        >
          <dt className="text-sm text-on-surface-variant dark:text-slate-400">{r.label}</dt>
          <dd className="text-right text-sm font-semibold text-on-surface dark:text-slate-100">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ── Empty / no-records state ─────────────────────────────────────────── */

export function EmptyState({
  title = "No records found",
  hint,
}: {
  title?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-outline-variant/60 dark:border-white/10 py-8 text-center">
      <Inbox className="h-7 w-7 text-on-surface-variant/60 dark:text-slate-500" />
      <p className="mt-2 text-sm font-semibold text-on-surface-variant dark:text-slate-300">{title}</p>
      {hint && <p className="mt-1 max-w-sm text-xs text-on-surface-variant/80 dark:text-slate-400">{hint}</p>}
    </div>
  );
}

/* ── Check row (for title checks, summary) ────────────────────────────── */

export function CheckRow({
  label,
  flagged,
  okText = "Not reported",
  flagText = "Reported",
}: {
  label: string;
  flagged: boolean;
  okText?: string;
  flagText?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-surface-container-low dark:bg-slate-800/60 px-3 py-2.5">
      <span className="text-sm font-medium text-on-surface dark:text-slate-200">{label}</span>
      <Badge tone={flagged ? "critical" : "good"}>{flagged ? flagText : okText}</Badge>
    </div>
  );
}

/* ── Responsive data table ────────────────────────────────────────────── */

export function DataTable({
  head,
  rows,
}: {
  head: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="-mx-1 overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="text-left">
            {head.map((h) => (
              <th
                key={h}
                className="border-b border-outline-variant/60 dark:border-white/10 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-on-surface-variant dark:text-slate-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="align-top">
              {r.map((cell, j) => (
                <td
                  key={j}
                  className="border-b border-outline-variant/30 dark:border-white/5 px-3 py-2.5 text-on-surface dark:text-slate-200"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
