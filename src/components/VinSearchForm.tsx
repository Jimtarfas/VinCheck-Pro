"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { contextSlugForPath } from "@/lib/report-context";
import { states } from "@/lib/states";
import type { Locale } from "@/i18n/config";

type Mode = "vin" | "plate";

// Per-locale copy. Pattern matches SPECIALTY_HOOKS_ES (Wave 5/12) and
// STATE_HOOKS_ES — keep translations next to the component instead of
// blowing up the central i18n dictionary with form-only strings. US
// state names in the dropdown stay English (proper nouns).
const COPY = {
  en: {
    toggleVin: "By VIN",
    togglePlate: "By U.S. License Plate",
    vinPlaceholder: "Enter 17-digit VIN Number",
    platePlaceholder: "License plate number",
    stateLabelDefault: "State…",
    stateAriaLabel: "Issuing state",
    submitVin: "Check VIN",
    submitVinLoading: "Checking…",
    submitPlate: "Look Up VIN",
    submitPlateLoading: "Looking up…",
    errorVinLength: "A valid VIN must be exactly 17 characters.",
    errorVinBanned: "VINs cannot contain I, O, or Q characters.",
    errorPlateEmpty: "Enter a plate number.",
    errorPlateLong: "Plates are at most 8 characters.",
    errorPlateNoState: "Select the issuing state.",
    errorPlateNotFound:
      "We couldn't find a VIN for that plate. Try searching by VIN.",
    errorNetwork: "Network error.",
    badgeSecure: "100% Secure",
    badgeInstant: "Instant Results",
  },
  es: {
    toggleVin: "Por VIN",
    togglePlate: "Por placa de EE. UU.",
    vinPlaceholder: "Ingresa el VIN de 17 dígitos",
    platePlaceholder: "Número de placa",
    stateLabelDefault: "Estado…",
    stateAriaLabel: "Estado emisor",
    submitVin: "Revisar VIN",
    submitVinLoading: "Revisando…",
    submitPlate: "Buscar VIN",
    submitPlateLoading: "Buscando…",
    errorVinLength: "Un VIN válido debe tener exactamente 17 caracteres.",
    errorVinBanned: "Los VIN no pueden contener las letras I, O o Q.",
    errorPlateEmpty: "Ingresa un número de placa.",
    errorPlateLong: "Las placas tienen como máximo 8 caracteres.",
    errorPlateNoState: "Selecciona el estado emisor.",
    errorPlateNotFound:
      "No encontramos un VIN para esa placa. Intenta buscar por VIN.",
    errorNetwork: "Error de red.",
    badgeSecure: "100% Seguro",
    badgeInstant: "Resultados al instante",
  },
  fr: {
    toggleVin: "Par VIN",
    togglePlate: "Par plaque US",
    vinPlaceholder: "Saisis ton VIN à 17 caractères",
    platePlaceholder: "Numéro de plaque",
    stateLabelDefault: "État…",
    stateAriaLabel: "État émetteur",
    submitVin: "Vérifier VIN",
    submitVinLoading: "Vérification…",
    submitPlate: "Rechercher VIN",
    submitPlateLoading: "Recherche…",
    errorVinLength: "Un VIN valide doit comporter exactement 17 caractères.",
    errorVinBanned: "Les VIN ne peuvent pas contenir les lettres I, O ou Q.",
    errorPlateEmpty: "Saisis un numéro de plaque.",
    errorPlateLong: "Les plaques font au maximum 8 caractères.",
    errorPlateNoState: "Sélectionne l'État émetteur.",
    errorPlateNotFound:
      "Nous n'avons pas trouvé de VIN pour cette plaque. Essaie une recherche par VIN.",
    errorNetwork: "Erreur réseau.",
    badgeSecure: "100% Sécurisé",
    badgeInstant: "Résultats instantanés",
  },
} as const;

export default function VinSearchForm({
  size = "lg",
  onDark = false,
  withPlateToggle = true,
  locale = "en",
}: {
  size?: "lg" | "sm";
  onDark?: boolean;
  /** Show the "By VIN / By U.S. License Plate" toggle and plate-lookup mode.
   *  Defaults to true so every search form offers plate lookup (no signup
   *  required). Pass `withPlateToggle={false}` to force a VIN-only form. */
  withPlateToggle?: boolean;
  /** UI language. Defaults to English to keep existing call sites unchanged. */
  locale?: Locale;
}) {
  const copy = COPY[locale];
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
    if (cleaned.length !== 17) { setError(copy.errorVinLength); return; }
    if (/[IOQ]/.test(cleaned)) { setError(copy.errorVinBanned); return; }
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
    if (cleanedPlate.length < 2) { setError(copy.errorPlateEmpty); return; }
    if (cleanedPlate.length > 8) { setError(copy.errorPlateLong); return; }
    if (!plateState) { setError(copy.errorPlateNoState); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/plate-to-vin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plate: cleanedPlate, state: plateState }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; vin?: string; message?: string };
      if (data.ok && data.vin) {
        router.push(`/report-preview/${data.vin}${query}`);
        return;
      }
      setError(data.message || copy.errorPlateNotFound);
      setLoading(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : copy.errorNetwork);
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
              { key: "vin", label: copy.toggleVin },
              { key: "plate", label: copy.togglePlate },
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
              placeholder={copy.vinPlaceholder}
              maxLength={17}
              className={`w-full bg-transparent border-none outline-none text-on-surface placeholder:text-outline/50 uppercase tracking-widest font-mono font-medium ${isLg ? "text-base py-2" : "text-base sm:text-sm py-1.5"}`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`flex-shrink-0 flex items-center justify-center gap-2 bg-secondary-container text-on-secondary-container font-headline font-extrabold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-secondary-container/20 active:scale-95 disabled:opacity-60 cursor-pointer ${isLg ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"}`}
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> {copy.submitVinLoading}</> : copy.submitVin}
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
              placeholder={copy.platePlaceholder}
              maxLength={10}
              autoComplete="off"
              className={`w-full bg-transparent border-none outline-none text-on-surface placeholder:text-outline/50 uppercase tracking-widest font-mono font-medium ${isLg ? "text-base py-2" : "text-base sm:text-sm py-1.5"}`}
            />
          </div>
          <select
            value={plateState}
            onChange={(e) => { setPlateState(e.target.value); setError(""); }}
            aria-label={copy.stateAriaLabel}
            className={`bg-transparent border-none outline-none text-on-surface font-medium cursor-pointer px-3 sm:max-w-[10rem] ${isLg ? "text-base py-2" : "text-sm py-1.5"}`}
          >
            <option value="">{copy.stateLabelDefault}</option>
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
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> {copy.submitPlateLoading}</> : copy.submitPlate}
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
            {copy.badgeSecure}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary-container" />
            {copy.badgeInstant}
          </span>
        </div>
      )}
    </form>
  );
}
