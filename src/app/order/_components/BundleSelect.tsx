"use client";

import { Check } from "lucide-react";
import { formatUsd, type PricingOption } from "@/lib/pricing";

interface Props {
  options: PricingOption[];
  /** Currently selected pack size (1 = single report). */
  selected: number;
  onSelect: (size: number) => void;
  /** Locale for the few UI strings. */
  locale?: "en" | "es" | "fr";
}

const COPY = {
  en: {
    one: "1 report",
    reports: (n: number) => `${n} reports`,
    perReport: "per report",
    total: (s: string) => `${s} total`,
    save: (s: string) => `SAVE ${s}`,
    best: "BEST VALUE",
    single: "Single report",
  },
  es: {
    one: "1 reporte",
    reports: (n: number) => `${n} reportes`,
    perReport: "por reporte",
    total: (s: string) => `${s} en total`,
    save: (s: string) => `AHORRA ${s}`,
    best: "MEJOR VALOR",
    single: "Reporte individual",
  },
  fr: {
    one: "1 rapport",
    reports: (n: number) => `${n} rapports`,
    perReport: "par rapport",
    total: (s: string) => `${s} au total`,
    save: (s: string) => `\u00c9CONOMISE ${s}`,
    best: "MEILLEURE OFFRE",
    single: "Rapport unique",
  },
} as const;

/**
 * Vertical stack of selectable pricing cards (single report + bundles).
 * Purely presentational — the parent owns `selected` and the checkout call.
 */
export default function BundleSelect({ options, selected, onSelect, locale = "en" }: Props) {
  const t = COPY[locale];

  return (
    <div className="space-y-3" role="radiogroup" aria-label="Choose how many reports">
      {options.map((o) => {
        const active = o.size === selected;
        const isBundle = o.isBundle;
        return (
          <button
            key={o.size}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(o.size)}
            className={`relative w-full text-left rounded-2xl border p-4 sm:p-5 transition-all ${
              active
                ? "border-primary ring-2 ring-primary/30 bg-primary/[0.04]"
                : "border-outline-variant hover:border-primary/40 bg-surface-container-lowest"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              {/* Left: radio + label */}
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    active ? "border-primary bg-primary" : "border-outline"
                  }`}
                >
                  {active && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </span>

                <div className="min-w-0">
                  {/* Badges */}
                  {isBundle && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      {o.savingsCents > 0 && (
                        <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-100 rounded-md px-1.5 py-0.5">
                          {t.save(formatUsd(o.savingsCents))}
                        </span>
                      )}
                      {o.bestValue && (
                        <span className="inline-block text-[10px] font-bold text-white bg-primary rounded-md px-1.5 py-0.5">
                          {t.best}
                        </span>
                      )}
                    </div>
                  )}

                  <p className="font-headline font-extrabold text-on-surface leading-tight">
                    {o.size === 1 ? t.one : t.reports(o.size)}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {isBundle ? t.total(formatUsd(o.priceCents)) : t.single}
                  </p>
                </div>
              </div>

              {/* Right: price */}
              <div className="flex-shrink-0 text-right">
                <p className="text-xl sm:text-2xl font-headline font-black text-on-surface leading-none">
                  {formatUsd(o.perReportCents)}
                </p>
                {isBundle && (
                  <p className="text-[11px] font-medium text-on-surface-variant mt-1">
                    {t.perReport}
                  </p>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
