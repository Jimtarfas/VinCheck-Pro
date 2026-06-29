#!/usr/bin/env node
/**
 * Sweep every file that has `locale` in scope (as a prop or const) and
 * renders `<VinSearchForm ... />` without passing `locale={locale}`.
 * Insert it so the search form translates to the page's locale instead
 * of falling back to English.
 *
 * Also handles `<VinLocatorHint ...>` and `<RelatedChecks ...>` which
 * have the same pattern.
 */

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src");

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === ".next") continue;
      out.push(...(await walk(full)));
    } else if (e.name.endsWith(".tsx") || e.name.endsWith(".ts")) {
      out.push(full);
    }
  }
  return out;
}

const COMPONENTS_TO_FORWARD = ["VinSearchForm", "VinLocatorHint"];

async function main() {
  const files = await walk(ROOT);
  let totalFixed = 0;
  const fixedFiles = [];

  for (const f of files) {
    let s = await fs.readFile(f, "utf8");
    const original = s;

    // The file must have `locale` in scope as a prop or const for this to be safe
    const hasLocaleInScope =
      /\blocale\s*:\s*Locale\b/.test(s) ||
      /\{\s*locale\s*\}\s*:\s*Props/.test(s) ||
      /const\s+\{\s*[^}]*\blocale\b[^}]*\}\s*=\s*props/.test(s) ||
      /const\s+locale\s*=/.test(s) ||
      /function\s+\w+\s*\(\s*\{\s*locale\s*\}/.test(s);
    if (!hasLocaleInScope) continue;

    for (const comp of COMPONENTS_TO_FORWARD) {
      // Match <CompName ...attrs.../> or <CompName ...attrs...> where attrs
      // do NOT already contain `locale=`. Multi-line attrs handled with [\s\S].
      // We anchor on the opening tag and stop at the closing `/>` or `>`.
      const re = new RegExp(`<${comp}(\\s[^>]*?)?(/?>)`, "g");
      s = s.replace(re, (m, attrs = "", close) => {
        if (attrs && /\blocale\s*=/.test(attrs)) return m; // already passed
        const newAttrs = (attrs || "") + " locale={locale}";
        return `<${comp}${newAttrs}${close}`;
      });
    }

    if (s !== original) {
      await fs.writeFile(f, s, "utf8");
      totalFixed++;
      fixedFiles.push(path.relative(ROOT, f));
    }
  }

  console.log(`Forwarded locale in ${totalFixed} files:`);
  for (const f of fixedFiles) console.log(`  ${f}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
