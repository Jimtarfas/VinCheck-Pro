/**
 * Lookup helpers for translated copy.
 *
 * Usage in a server component:
 *   import { t } from "@/i18n";
 *   const title = t("es", "florida.metaTitle");
 *
 * The compile-time signature enforces that every key exists in BOTH
 * dictionaries — if you add a key to en.ts and forget es.ts (or vice
 * versa), `tsc` fails the build.
 */

import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";
import { DEFAULT_LOCALE, type Locale } from "./config";

const DICTIONARIES = { en, es } as const;

type Dict = typeof en;

/**
 * Path-of-key helper — gives us auto-complete and compile-time safety
 * for dotted lookup like "florida.metaTitle".
 */
type Leaves<T, K extends string = ""> = T extends Record<string, unknown>
  ? {
      [P in keyof T & string]: T[P] extends Record<string, unknown>
        ? Leaves<T[P], `${K}${K extends "" ? "" : "."}${P}`>
        : `${K}${K extends "" ? "" : "."}${P}`;
    }[keyof T & string]
  : K;

export type TranslationKey = Leaves<Dict>;

/**
 * Translate `key` to `locale`. Falls back to the default locale if the
 * key is missing in the target locale (shouldn't happen — the
 * Dictionary type prevents it — but the fallback is defensive).
 */
export function t(locale: Locale, key: TranslationKey): string {
  const dict = DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
  return walk(dict, key) ?? walk(DICTIONARIES[DEFAULT_LOCALE], key) ?? key;
}

function walk(obj: unknown, key: string): string | null {
  const parts = key.split(".");
  let cursor: unknown = obj;
  for (const part of parts) {
    if (cursor == null || typeof cursor !== "object") return null;
    cursor = (cursor as Record<string, unknown>)[part];
  }
  return typeof cursor === "string" ? cursor : null;
}
