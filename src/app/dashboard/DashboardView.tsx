"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  Download,
  Search,
  ChevronRight,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Wrench,
} from "lucide-react";

export interface ActivityRow {
  id: string;
  vin: string;
  make: string | null;
  model: string | null;
  year: number | null;
  createdAt: string;
}

interface TableDiag {
  ok: boolean;
  byUserId: number;
  byEmail: number;
  error?: string;
}

export interface Diagnostics {
  userId: string;
  userEmail: string | null;
  serviceRoleKeyConfigured: boolean;
  supabaseUrlConfigured: boolean;
  lookupsTable: TableDiag;
  downloadsTable: TableDiag;
  fatalError: string | null;
}

type Tab = "views" | "downloads";

function formatWhen(iso: string): string {
  const d = new Date(iso);
  const now = Date.now();
  const diff = now - d.getTime();
  const mins = Math.round(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function vehicleLabel(r: ActivityRow): string {
  const parts = [r.year, r.make, r.model].filter(Boolean);
  return parts.length ? parts.join(" ") : "Vehicle";
}

export default function DashboardView({
  views,
  downloads,
  diagnostics,
}: {
  views: ActivityRow[];
  downloads: ActivityRow[];
  diagnostics: Diagnostics;
}) {
  const [tab, setTab] = useState<Tab>("views");
  const [query, setQuery] = useState("");
  const [showDiag, setShowDiag] = useState(false);

  const issues = collectIssues(diagnostics, views.length, downloads.length);

  const active = tab === "views" ? views : downloads;
  const filtered = query.trim()
    ? active.filter((r) => {
        const q = query.toLowerCase();
        return (
          r.vin.toLowerCase().includes(q) ||
          vehicleLabel(r).toLowerCase().includes(q)
        );
      })
    : active;

  return (
    <>
      {/* Diagnostics — only when there's a real problem worth surfacing */}
      {issues.length > 0 && (
        <DiagnosticsPanel
          diagnostics={diagnostics}
          issues={issues}
          showDetails={showDiag}
          onToggle={() => setShowDiag((v) => !v)}
        />
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2">
            <Eye className="w-4 h-4" /> Reports viewed
          </div>
          <p className="font-headline text-3xl font-extrabold text-on-surface">
            {views.length}
          </p>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2">
            <Download className="w-4 h-4" /> PDF downloads
          </div>
          <p className="font-headline text-3xl font-extrabold text-on-surface">
            {downloads.length}
          </p>
        </div>
      </div>

      {/* Tabs + search */}
      <div className="bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-b border-surface-container">
          <div className="inline-flex p-1 bg-surface-container rounded-full self-start">
            <button
              onClick={() => setTab("views")}
              className={`px-4 py-1.5 text-sm font-semibold rounded-full transition cursor-pointer ${
                tab === "views"
                  ? "bg-surface-container-lowest text-on-surface shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Reports viewed ({views.length})
            </button>
            <button
              onClick={() => setTab("downloads")}
              className={`px-4 py-1.5 text-sm font-semibold rounded-full transition cursor-pointer ${
                tab === "downloads"
                  ? "bg-surface-container-lowest text-on-surface shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Downloads ({downloads.length})
            </button>
          </div>

          <label className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-outline pointer-events-none" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by VIN or model"
              className="pl-9 pr-3 py-2 w-full sm:w-64 text-sm bg-surface-container rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
        </div>

        {filtered.length === 0 ? (
          <EmptyState tab={tab} hasQuery={!!query.trim()} />
        ) : (
          <ul className="divide-y divide-surface-container">
            {filtered.map((row) => (
              <li key={row.id}>
                <Link
                  href={`/report/${row.vin}`}
                  className="flex items-center gap-4 px-4 sm:px-6 py-4 hover:bg-surface-container/50 transition group"
                >
                  <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-primary/8 text-primary flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-on-surface truncate">
                      {vehicleLabel(row)}
                    </p>
                    <p className="font-mono text-[11px] sm:text-xs text-outline tracking-wider truncate">
                      {row.vin}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-on-surface-variant">
                      {formatWhen(row.createdAt)}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-outline group-hover:text-primary group-hover:translate-x-0.5 transition flex-shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function EmptyState({ tab, hasQuery }: { tab: Tab; hasQuery: boolean }) {
  if (hasQuery) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="text-sm text-on-surface-variant">
          No entries match that filter.
        </p>
      </div>
    );
  }
  if (tab === "downloads") {
    return (
      <div className="px-6 py-12 sm:py-16 text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-secondary-container/40 text-on-secondary-container flex items-center justify-center mb-4">
          <Download className="w-6 h-6" />
        </div>
        <p className="font-headline font-bold text-on-surface mb-1">
          No downloads yet
        </p>
        <p className="text-sm text-on-surface-variant max-w-md mx-auto mb-4">
          Open a VIN report while signed in and tap{" "}
          <strong>Download Report</strong> — it&apos;ll appear here within a
          second or two.
        </p>
        <p className="text-xs text-outline max-w-md mx-auto">
          If you downloaded a report but don&apos;t see it here, make sure the{" "}
          <code className="font-mono text-on-surface bg-surface-container px-1.5 py-0.5 rounded">
            vin_downloads
          </code>{" "}
          table has been created in Supabase (run the block near the bottom of
          <code className="font-mono text-on-surface bg-surface-container px-1.5 py-0.5 rounded ml-1">
            supabase-setup.sql
          </code>
          ).
        </p>
      </div>
    );
  }
  return (
    <div className="px-6 py-12 sm:py-16 text-center">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
        <Eye className="w-6 h-6" />
      </div>
      <p className="font-headline font-bold text-on-surface mb-1">
        No reports yet
      </p>
      <p className="text-sm text-on-surface-variant max-w-md mx-auto mb-4">
        Every VIN report you open <strong>while signed in</strong> will be
        listed here. Reports viewed while logged out won&apos;t show up (they
        live in your per-browser history on the home page).
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary text-on-primary text-sm font-bold hover:brightness-110 transition"
      >
        Check a VIN
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Diagnostics
───────────────────────────────────────────────────────────── */

interface Issue {
  level: "error" | "warning" | "info";
  title: string;
  body: string;
}

function collectIssues(d: Diagnostics, viewCount: number, downloadCount: number): Issue[] {
  const issues: Issue[] = [];

  if (d.fatalError) {
    issues.push({
      level: "error",
      title: "Activity could not be loaded",
      body: d.fatalError,
    });
    return issues;
  }

  if (!d.serviceRoleKeyConfigured) {
    issues.push({
      level: "error",
      title: "SUPABASE_SERVICE_ROLE_KEY is not configured",
      body: "Without the service-role key, the dashboard can't read activity. Add it as an env var in Vercel and redeploy.",
    });
  }
  if (!d.supabaseUrlConfigured) {
    issues.push({
      level: "error",
      title: "NEXT_PUBLIC_SUPABASE_URL is not configured",
      body: "Add it as an env var in Vercel and redeploy.",
    });
  }

  if (!d.lookupsTable.ok) {
    issues.push({
      level: "error",
      title: "vin_lookups table is missing or unreadable",
      body:
        d.lookupsTable.error ||
        "Run supabase-setup.sql in your Supabase SQL Editor. The vin_lookups block is at the very top of the file.",
    });
  } else if (viewCount === 0) {
    issues.push({
      level: "info",
      title: "No reports recorded yet for your account",
      body:
        "Reports show up here only when viewed while signed in (this exact account). If you just opened a VIN, give the latest deploy 30–60 seconds to roll out, refresh this page, then try again.",
    });
  }

  if (!d.downloadsTable.ok) {
    issues.push({
      level: "warning",
      title: "vin_downloads table is missing — run the SQL migration",
      body:
        d.downloadsTable.error ||
        "Open Supabase → SQL Editor → paste the new vin_downloads block from supabase-setup.sql (it's right above the Admin setup comment) → Run.",
    });
  } else if (downloadCount === 0 && viewCount > 0) {
    issues.push({
      level: "info",
      title: "No downloads recorded yet",
      body:
        "Open one of your reports above and tap Download Report. The PDF window will open and the row should appear here within a second.",
    });
  }

  return issues;
}

function DiagnosticsPanel({
  diagnostics: d,
  issues,
  showDetails,
  onToggle,
}: {
  diagnostics: Diagnostics;
  issues: Issue[];
  showDetails: boolean;
  onToggle: () => void;
}) {
  const hasError = issues.some((i) => i.level === "error");
  const hasWarning = issues.some((i) => i.level === "warning");
  const tone = hasError
    ? "bg-error-container/30 border-error/30 text-on-error-container"
    : hasWarning
    ? "bg-secondary-container/40 border-secondary/40 text-on-secondary-container"
    : "bg-primary/8 border-primary/20 text-on-surface";
  const Icon = hasError ? AlertTriangle : hasWarning ? Wrench : CheckCircle2;

  return (
    <div className={`rounded-2xl border ${tone} p-4 sm:p-5 mb-6`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0 space-y-3">
          {issues.map((issue, i) => (
            <div key={i}>
              <p className="font-headline font-bold text-sm">{issue.title}</p>
              <p className="text-sm opacity-90 mt-0.5">{issue.body}</p>
            </div>
          ))}
          <button
            onClick={onToggle}
            className="text-xs underline underline-offset-2 opacity-80 hover:opacity-100 cursor-pointer"
          >
            {showDetails ? "Hide diagnostics" : "Show diagnostics"}
          </button>
          {showDetails && (
            <pre className="mt-2 text-[11px] font-mono bg-surface/60 text-on-surface rounded-xl p-3 overflow-x-auto whitespace-pre-wrap break-all">
              {JSON.stringify(
                {
                  user_id: d.userId,
                  user_email: d.userEmail,
                  env: {
                    NEXT_PUBLIC_SUPABASE_URL: d.supabaseUrlConfigured ? "set" : "MISSING",
                    SUPABASE_SERVICE_ROLE_KEY: d.serviceRoleKeyConfigured ? "set" : "MISSING",
                  },
                  vin_lookups: d.lookupsTable,
                  vin_downloads: d.downloadsTable,
                  fatalError: d.fatalError,
                },
                null,
                2,
              )}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
