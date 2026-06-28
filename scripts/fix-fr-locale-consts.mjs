#!/usr/bin/env node
/**
 * Final-pass fix on /fr: the mirror script handled JSX `locale="es"` and
 * object-literal `locale: "es_US"`, but missed `const LOCALE = "es" as
 * const;` and similar TypeScript const declarations. This script
 * replaces those across /fr.
 */

import { promises as fs } from "node:fs";
import path from "node:path";

const FR = path.resolve("src/app/fr");

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.name.endsWith(".ts") || e.name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

async function main() {
  const files = await walk(FR);
  let updated = 0;
  for (const f of files) {
    let s = await fs.readFile(f, "utf8");
    const original = s;
    // const LOCALE = "es" as const → "fr"
    s = s.replace(/const\s+LOCALE\s*(:\s*Locale\s*)?=\s*"es"/g, (m) =>
      m.replace('"es"', '"fr"')
    );
    s = s.replace(/const\s+LOCALE\s*(:\s*Locale\s*)?=\s*'es'/g, (m) =>
      m.replace("'es'", "'fr'")
    );
    // Standalone locale: Locale = "es" parameter defaults
    s = s.replace(/locale\s*:\s*Locale\s*=\s*"es"/g, 'locale: Locale = "fr"');
    s = s.replace(/locale\s*=\s*"es"\s*(,|\))/g, 'locale = "fr"$1');
    // BCP-47 tags inside template strings or constants — narrow:
    //   "es-US" / "es_US" → "fr-US" / "fr_US"
    s = s.replace(/"es-US"/g, '"fr-US"');
    s = s.replace(/"es_US"/g, '"fr_US"');
    if (s !== original) {
      await fs.writeFile(f, s, "utf8");
      updated++;
    }
  }
  // eslint-disable-next-line no-console
  console.log(`Updated ${updated} files in /fr.`);
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
