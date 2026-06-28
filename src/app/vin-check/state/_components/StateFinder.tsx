"use client";

import { useMemo, useState } from "react";
import Link from "@/components/LocaleLink";
import { Search, MapPin, X } from "lucide-react";
import { states } from "@/lib/states";

/**
 * Interactive "find your state" grid that lives in the hero of the all-states
 * VIN-check page. The point is that a visitor landing from a state-targeted ad
 * (e.g. someone in California) immediately sees their state above the fold and
 * can jump straight to its page — instead of scrolling a flat 50-item list.
 *
 * Behaviour:
 *   • A type-ahead box filters by state name OR two-letter abbreviation, so
 *     "ca", "cali", or "California" all surface California.
 *   • The 10 highest-population states are pinned as quick-access chips when no
 *     query is active (these are also the states in the ad plan's state ad
 *     groups), so the most common traffic finds its target in one tap.
 *   • All 50 states render as a responsive chip grid below; each chip is a real
 *     <Link> to /vin-check/state/[slug] so the grid is fully crawlable even
 *     before hydration (the filter is progressive enhancement on top of it).
 *
 * Wave 18.19 — accepts `locale` so the visible chrome strings localize while
 * the state dropdown itself stays English (state names are proper nouns).
 */

const POPULAR_SLUGS = [
  "california",
  "texas",
  "florida",
  "new-york",
  "pennsylvania",
  "illinois",
  "ohio",
  "georgia",
  "north-carolina",
  "michigan",
];

const popularStates = POPULAR_SLUGS.map(
  (slug) => states.find((s) => s.slug === slug)!
).filter(Boolean);

const sortedStates = [...states].sort((a, b) => a.name.localeCompare(b.name));

const COPY = {
  en: {
    heading: "Find Your State",
    sub: "Pick your state for local DMV rules and title brands — or run a VIN below for an instant nationwide report.",
    placeholder: "Type your state (e.g. California or CA)",
    inputAria: "Search for your state",
    clearAria: "Clear state search",
    mostSearched: "Most-searched states",
    all50: "All 50 states",
    matchOne: (n: number) => `${n} match`,
    matchMany: (n: number) => `${n} matches`,
    noMatch: (q: string) =>
      `No state matches "${q}". Try the full state name or its two-letter abbreviation.`,
  },
  es: {
    heading: "Encuentra tu estado",
    sub: "Elige tu estado para reglas locales del DMV y marcas de título — o ejecuta un VIN abajo para un reporte nacional al instante.",
    placeholder: "Escribe tu estado (ej. California o CA)",
    inputAria: "Buscar tu estado",
    clearAria: "Limpiar búsqueda de estado",
    mostSearched: "Estados más buscados",
    all50: "Los 50 estados",
    matchOne: (n: number) => `${n} coincidencia`,
    matchMany: (n: number) => `${n} coincidencias`,
    noMatch: (q: string) =>
      `Ningún estado coincide con "${q}". Prueba el nombre completo del estado o su abreviatura de dos letras.`,
  },
  fr: {
    heading: "Trouve ton \u00e9tat",
    sub: "Choisis ton \u00e9tat pour les r\u00e8gles DMV locales et les mentions de titre \u2014 ou lance un VIN ci-dessous pour un rapport national instantan\u00e9.",
    placeholder: "Saisis ton \u00e9tat (ex. California ou CA)",
    inputAria: "Recherche ton \u00e9tat",
    clearAria: "Effacer la recherche d'\u00e9tat",
    mostSearched: "\u00c9tats les plus recherch\u00e9s",
    all50: "Les 50 \u00e9tats",
    matchOne: (n: number) => `${n} correspondance`,
    matchMany: (n: number) => `${n} correspondances`,
    noMatch: (q: string) =>
      `Aucun \u00e9tat ne correspond \u00e0 \u00ab\u00a0${q}\u00a0\u00bb. Essaie le nom complet de l'\u00e9tat ou son abr\u00e9viation \u00e0 deux lettres.`,
  },
} as const;

interface Props {
  locale?: "en" | "es" | "fr";
}

export default function StateFinder({ locale = "en" }: Props) {
  const [query, setQuery] = useState("");
  const c = COPY[locale];

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return sortedStates;
    return sortedStates.filter(
      (s) => s.name.toLowerCase().includes(q) || s.abbr.toLowerCase() === q
    );
  }, [q]);

  const stateHref = (slug: string) =>
    locale === "es" ? `/es/vin-check/state/${slug}` : `/vin-check/state/${slug}`;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl text-on-surface">
      <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
        {c.heading}
      </h2>
      <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
        {c.sub}
      </p>

      {/* Type-ahead */}
      <div className="relative flex items-center gap-2 bg-surface-container-lowest rounded-full ring-1 ring-outline-variant/40 p-1.5 mb-5">
        <div className="pl-4 flex items-center gap-3 flex-1">
          <Search className="w-4 h-4 flex-shrink-0 text-outline/60" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={c.placeholder}
            className="w-full bg-transparent border-none outline-none text-on-surface placeholder:text-outline/50 text-sm py-2"
            aria-label={c.inputAria}
          />
        </div>
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mr-2 p-1.5 rounded-full text-outline hover:bg-surface-container transition-colors"
            aria-label={c.clearAria}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Pinned popular states (only when not searching) */}
      {!q && (
        <div className="mb-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">
            {c.mostSearched}
          </p>
          <div className="flex flex-wrap gap-2">
            {popularStates.map((s) => (
              <Link
                key={s.slug}
                href={stateHref(s.slug)}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-sm font-bold px-3.5 py-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Full grid (filtered) */}
      <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">
        {q
          ? filtered.length === 1
            ? c.matchOne(filtered.length)
            : c.matchMany(filtered.length)
          : c.all50}
      </p>
      {filtered.length === 0 ? (
        <p className="text-sm text-on-surface-variant py-4">
          {c.noMatch(query)}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1">
          {filtered.map((s) => (
            <Link
              key={s.slug}
              href={stateHref(s.slug)}
              className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest hover:border-primary/40 hover:bg-primary/5 transition-colors px-3 py-2 group"
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary text-[11px] font-black flex-shrink-0">
                {s.abbr}
              </span>
              <span className="text-xs font-semibold text-on-surface truncate group-hover:text-primary">
                {s.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
