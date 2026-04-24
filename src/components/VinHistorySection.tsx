"use client";

import { useSyncExternalStore, useCallback } from "react";
import Link from "next/link";
import { Clock, X, Trash2, ArrowRight, Car } from "lucide-react";
import {
  getHistory,
  removeFromHistory,
  clearHistory,
  type VinHistoryEntry,
} from "@/lib/vinHistory";

/* External store bridge — subscribes to both our custom event (same-tab
   updates) and the native storage event (cross-tab updates). We return a
   JSON string as the snapshot so reference equality holds between reads. */
function subscribe(onChange: () => void): () => void {
  const handler = () => onChange();
  window.addEventListener("vinhistory:updated", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("vinhistory:updated", handler);
    window.removeEventListener("storage", handler);
  };
}
function getSnapshot(): string {
  return JSON.stringify(getHistory());
}
function getServerSnapshot(): string {
  return "[]";
}

function relativeTime(epoch: number): string {
  const diff = Math.max(0, Date.now() - epoch);
  const mins = Math.round(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? "" : "s"} ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks} wk${weeks === 1 ? "" : "s"} ago`;
  const months = Math.round(days / 30);
  return `${months} mo${months === 1 ? "" : "s"} ago`;
}

export default function VinHistorySection() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const history: VinHistoryEntry[] = JSON.parse(snapshot);

  const handleRemove = useCallback((vin: string) => {
    removeFromHistory(vin);
  }, []);

  const handleClearAll = useCallback(() => {
    clearHistory();
  }, []);

  if (history.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8 flex-wrap">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-2">
              <Clock className="w-4 h-4" /> Your recent VIN checks
            </span>
            <h2 className="font-headline font-extrabold text-2xl sm:text-3xl lg:text-4xl text-on-surface leading-tight">
              Pick up where you left off
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-1.5 max-w-xl">
              The reports you&apos;ve opened on this device — saved automatically so
              you can jump back in anytime.
            </p>
          </div>

          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-outline hover:text-error bg-surface-container hover:bg-error-container/30 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear history
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {history.map((entry) => (
            <div
              key={entry.vin}
              className="group relative bg-surface-container-lowest rounded-2xl sm:rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-outline-variant/10"
            >
              {/* Remove button */}
              <button
                onClick={() => handleRemove(entry.vin)}
                aria-label={`Remove ${entry.label} from history`}
                className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <Link
                href={`/report/${entry.vin}`}
                className="block focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-2xl sm:rounded-[1.5rem]"
              >
                <div className="relative aspect-[16/9] bg-surface-container overflow-hidden">
                  {entry.photo ? (
                    // Plain img — history thumbnails can come from any
                    // dealer/CDN host, so we don't require whitelisting.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={entry.photo}
                      alt={entry.label}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/5 text-primary/40">
                      <Car className="w-10 h-10" />
                    </div>
                  )}
                  {entry.price && (
                    <span
                      className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-on-secondary-container"
                      style={{ background: "var(--color-secondary-container)" }}
                    >
                      {entry.price}
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">
                    {relativeTime(entry.visitedAt)}
                  </p>
                  <p className="font-headline font-bold text-on-surface text-sm sm:text-base leading-tight break-words mb-1">
                    {entry.label}
                  </p>
                  <p className="font-mono text-[10px] sm:text-xs text-outline tracking-wider break-all mb-3">
                    VIN: {entry.vin}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
                    Reopen report <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
