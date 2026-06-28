#!/usr/bin/env node
/**
 * One-shot script: mirror src/app/es/ → src/app/fr/ for the French wave.
 *
 * Every /es page is a thin shell around a shared Body component that
 * already has en/es/fr branches in its COPY block. The /fr shell only
 * needs to flip the structural attributes (locale prop, JSON-LD
 * inLanguage, hreflang seed, OG locale, canonical URL) and the rest is
 * handled by the components themselves.
 *
 * Metadata strings (page title, description, OG title) stay in Spanish
 * for now — they're not visible on the rendered page; they only show in
 * SERPs and the browser tab. A follow-up pass can translate them.
 */

import { promises as fs } from "node:fs";
import path from "node:path";

const SRC = path.resolve("src/app/es");
const DST = path.resolve("src/app/fr");

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walk(full)));
    } else {
      out.push(full);
    }
  }
  return out;
}

function transform(content, relPath) {
  let s = content;

  // Layout: rename Spanish-specific symbols/strings
  if (relPath === "layout.tsx") {
    s = s
      .replace(/EsLayout/g, "FrLayout")
      .replace(/document\.documentElement\.lang = "es"/g, 'document.documentElement.lang = "fr"')
      .replace(/Spanish locale layout/g, "French locale layout")
      .replace(/route group in this layout and set <html lang/g, "route group in this layout and set <html lang");
  }

  // Locale prop on body components: locale="es" → locale="fr"
  s = s.replace(/locale="es"/g, 'locale="fr"');
  // Locale prop without quotes: locale={"es"} → locale={"fr"}
  s = s.replace(/locale=\{"es"\}/g, 'locale={"fr"}');

  // hreflang helper: hreflangAlternatesForLocale("/...", "es") → "fr"
  s = s.replace(/hreflangAlternatesForLocale\((["'][^"']*["']),\s*"es"\)/g, 'hreflangAlternatesForLocale($1, "fr")');

  // JSON-LD inLanguage: "es" → "fr"
  s = s.replace(/inLanguage:\s*"es"/g, 'inLanguage: "fr"');
  s = s.replace(/inLanguage:\s*"es-US"/g, 'inLanguage: "fr-US"');

  // OpenGraph locale: "es_US" → "fr_US"
  s = s.replace(/locale:\s*"es_US"/g, 'locale: "fr_US"');
  s = s.replace(/locale:\s*"es-US"/g, 'locale: "fr_US"');

  // /es/ → /fr/ in URL strings
  s = s.replace(/\/es\//g, "/fr/");
  // ${SITE}/es (no trailing slash) → ${SITE}/fr
  s = s.replace(/\$\{SITE\}\/es(?=[`"'\s])/g, "${SITE}/fr");
  // PAGE_URL = `${SITE}/es` pattern (rare) — same as above

  // FAQS_ES → FAQS_FR (when the body exports FAQS_FR — fall back below)
  s = s.replace(/FAQS_ES/g, "FAQS_FR");

  // Common breadcrumb labels (Inicio → Accueil)
  s = s.replace(/"Inicio"/g, '"Accueil"');

  // Comment headers — keep informational
  s = s.replace(/\bSpanish\b/g, "French");
  s = s.replace(/\bSpanish layout\b/g, "French layout");

  // Sitemap: hostname stays the same; just paths shift /es → /fr already.
  return s;
}

async function main() {
  const files = await walk(SRC);
  let written = 0;
  for (const src of files) {
    const rel = path.relative(SRC, src);
    const dst = path.join(DST, rel);
    const content = await fs.readFile(src, "utf8");
    const transformed = transform(content, rel);
    await fs.mkdir(path.dirname(dst), { recursive: true });
    await fs.writeFile(dst, transformed, "utf8");
    written++;
  }
  // eslint-disable-next-line no-console
  console.log(`Wrote ${written} files to ${DST}`);
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
