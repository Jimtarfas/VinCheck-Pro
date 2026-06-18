"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { contextSlugForPath } from "@/lib/report-context";
import { states } from "@/lib/states";

type Mode = "vin" | "plate";

export default function VinSearchForm({
  size = "lg",
  onDark = false,
  withPlateToggle = false,
}: {
  size?: "lg" | "sm";
  onDark?: boolean;
  /** Show the "By VIN / By U.S. License Plate" toggle and plate-lookup mode. */
  withPlateToggle?: boolean;
}) {
  const [mode, setMode] = useState<Mode>("vin");
  const [vin, setVin] = useState("");
  const [plate, setPlate] = useState("");
  const [plateState, setPlateState] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // When this form lives on a focused check page (e.g. /warranty-check), carry
  // that context into the report URL so the report can echo what the visitor
  // came to check. Returns null on pages with no tailored variant.
  const pathname = usePathname() ?? "";
  const fromSlug = contextSlugForPath(pathname);
  const query = fromSlug ? `?from=${fromSlug}` : "";

  // A correct VIN is exactly 17 characters and contains no I, O, or Q.
  const isValidVin = (v: string) => v.length === 17 && !/[IOQ]/.test(v);

  const go = (raw: string) => {
    const cleaned = raw.trim().toUpperCase();
    if (cleaned.length !== 17) { setError("A valid VIN must be exactly 17 characters."); return; }
    if (/[IOQ]/.test(cleaned)) { setError("VINs cannot contain I, O, or Q characters."); return; }
    setError("");
    setLoading(true);
    router.push(`/report-preview/${cleaned}${query}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "plate") { void goPlate(); return; }
    go(vin);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.toUpperCase();
    setVin(next);
    setError("");
    // Auto-submit the moment a complete, correct VIN is entered.
    if (!loading && isValidVin(next.trim())) go(next);
  };

  // Plate → VIN: resolve via /api/plate-to-vin, then route into the same
  // report-preview flow the VIN path uses so the experience is identical.
  const goPlate = async () => {
    const cleanedPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (cleanedPlate.length < 2) { setError("Enter a plate number."); return; }
    if (cleanedPlate.length > 8) { setError("Plates are at most 8 characters."); return; }
    if (!plateState) { setError("Select the issuing state."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/plate-to-vin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plate: cleanedPlate, state: plateState }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; vin?: string; message?: string };
      if (res.status === 401) {
        // Guests must sign in (DPPA abuse-prevention gate). The dedicated
        // plate page handles the full signup flow.
        router.push("/plate-to-vin");
        return;
      }
      if (data.ok && data.vin) {
        router.push(`/report-preview/${data.vin}${query}`);
        return;
      }
      setError(data.message || "We couldn't find a VIN for that plate. Try searching by VIN.");
      setLoading(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error.");
      setLoading(false);
    }
  };

  const isLg = size === "lg";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      {/* ── Mode toggle: By VIN / By U.S. License Plate ── */}
      {withPlateToggle && (
        <div className="mb-4 flex">
          <div className="inline-flex rounded-full bg-surface-container/80 ring-1 ring-outline-variant/15 p-1">
            {([
              { key: "vin", label: "By VIN" },
              { key: "plate", label: "By U.S. License Plate" },
            ] as { key: Mode; label: string }[]).map(({ key, label }) => {
              const active = mode === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => { setMode(key); setError(""); }}
                  className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-headline font-bold rounded-full transition-all cursor-pointer ${
                    active
                      ? "bg-inverse-surface text-inverse-on-surface shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-inverse-surface" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Pill-shaped search bar — Stitch "High-Contrast Search Bar" */}
      {mode === "vin" ? (
        <div className={`relative flex items-center gap-2 bg-surface-container-lowest rounded-full shadow-2xl shadow-primary/5 ring-1 ring-outline-variant/15 ${isLg ? "p-2" : "p-1.5"}`}>
          <div className="pl-5 flex items-center gap-3 flex-1">
            <Search className={`flex-shrink-0 text-outline/60 ${isLg ? "w-5 h-5" : "w-4 h-4"}`} />
            <input
              type="text"
              value={vin}
              onChange={handleChange}
              placeholder="Enter 17-digit VIN Number"
              maxLength={17}
              className={`w-full bg-transparent border-none outline-none text-on-surface placeholder:text-outline/50 uppercase tracking-widest font-mono font-medium ${isLg ? "text-base py-2" : "text-base sm:text-sm py-1.5"}`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`flex-shrink-0 flex items-center justify-center gap-2 bg-secondary-container text-on-secondary-container font-headline font-extrabold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-secondary-container/20 active:scale-95 disabled:opacity-60 cursor-pointer ${isLg ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"}`}
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Checking…</> : "Check VIN"}
          </button>
        </div>
      ) : (
        <div className={`flex flex-col sm:flex-row items-stretch gap-2 bg-surface-container-lowest rounded-3xl sm:rounded-full shadow-2xl shadow-primary/5 ring-1 ring-outline-variant/15 ${isLg ? "p-2" : "p-1.5"}`}>
          <div className="pl-5 flex items-center gap-3 flex-1">
            <Search className={`flex-shrink-0 text-outline/60 ${isLg ? "w-5 h-5" : "w-4 h-4"}`} />
            <input
              type="text"
              value={plate}
              onChange={(e) => { setPlate(e.target.value.toUpperCase()); setError(""); }}
              placeholder="License plate number"
              maxLength={10}
              autoComplete="off"
              className={`w-full bg-transparent border-none outline-none text-on-surface placeholder:text-outline/50 uppercase tracking-widest font-mono font-medium ${isLg ? "text-base py-2" : "text-base sm:text-sm py-1.5"}`}
            />
          </div>
          <select
            value={plateState}
            onChange={(e) => { setPlateState(e.target.value); setError(""); }}
            aria-label="Issuing state"
            className={`bg-transparent border-none outline-none text-on-surface font-medium cursor-pointer px-3 sm:max-w-[10rem] ${isLg ? "text-base py-2" : "text-sm py-1.5"}`}
          >
            <option value="">State…</option>
            {states.map((s) => (
              <option key={s.abbr} value={s.abbr}>{s.name} ({s.abbr})</option>
            ))}
            <option value="DC">District of Columbia (DC)</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className={`flex-shrink-0 flex items-center justify-center gap-2 bg-secondary-container text-on-secondary-container font-headline font-extrabold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-secondary-container/20 active:scale-95 disabled:opacity-60 cursor-pointer ${isLg ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"}`}
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Looking up…</> : "Look Up VIN"}
          </button>
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-error text-center font-medium">{error}</p>
      )}

      {isLg && (
        <div className={`mt-4 flex items-center gap-6 text-xs font-semibold uppercase tracking-widest ${onDark ? "text-white" : "text-slate-700"}`}>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            100% Secure
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary-container" />
            Instant Results
          </span>
        </div>
      )}
    </form>
  );
}
