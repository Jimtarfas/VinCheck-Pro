"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, Download, Search, ChevronRight, FileText } from "lucide-react";

export interface ActivityRow {
  id: string;
  vin: string;
  make: string | null;
  model: string | null;
  year: number | null;
  createdAt: string;
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
}: {
  views: ActivityRow[];
  downloads: ActivityRow[];
}) {
  const [tab, setTab] = useState<Tab>("views");
  const [query, setQuery] = useState("");

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
      <div className="px-6 py-16 text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-secondary-container/40 text-on-secondary-container flex items-center justify-center mb-4">
          <Download className="w-6 h-6" />
        </div>
        <p className="font-headline font-bold text-on-surface mb-1">
          No downloads yet
        </p>
        <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
          Open a VIN report and tap <strong>Download Report</strong> — it&apos;ll
          show up here.
        </p>
      </div>
    );
  }
  return (
    <div className="px-6 py-16 text-center">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
        <Eye className="w-6 h-6" />
      </div>
      <p className="font-headline font-bold text-on-surface mb-1">
        No reports yet
      </p>
      <p className="text-sm text-on-surface-variant max-w-sm mx-auto mb-5">
        Every VIN report you open while signed in will be listed here.
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
