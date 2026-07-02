#!/usr/bin/env node
/**
 * One-shot legal-entity rename across the codebase.
 *
 * FROM
 *   Cognifyx Solutions LLC
 *   1209 Mountain Road Pl NE, Ste N
 *   Albuquerque, NM 87110
 *
 * TO
 *   Coconut Ventures LLC
 *   412 W 7th St
 *   Clovis, NM 88101, USA
 *
 * Replaces in en/es/fr copy, JSON-LD Organization schema, llms-full.txt,
 * Footer, Order layout, and every marketing / legal Body component.
 * Case-sensitive and includes the "Ste N" suite and the ", United States"
 * / ", Estados Unidos" / ", États-Unis" country suffixes so the new
 * address doesn't inherit a stale trailing "Ste N" fragment.
 */

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src");

// Ordered longest-first so multi-token phrases hit before their tokens.
const PAIRS = [
  // Full address block variants (with Ste N suite)
  [
    "1209 Mountain Road Pl NE, Ste N, Albuquerque, NM 87110, United States",
    "412 W 7th St, Clovis, NM 88101, USA",
  ],
  [
    "1209 Mountain Road Pl NE, Ste N, Albuquerque, NM 87110, Estados Unidos",
    "412 W 7th St, Clovis, NM 88101, EE. UU.",
  ],
  [
    "1209 Mountain Road Pl NE, Ste N, Albuquerque, NM 87110, États-Unis",
    "412 W 7th St, Clovis, NM 88101, États-Unis",
  ],
  // Address without trailing country
  [
    "1209 Mountain Road Pl NE, Ste N, Albuquerque, NM 87110",
    "412 W 7th St, Clovis, NM 88101",
  ],
  // Multi-line address blocks (Footer, Order layout, PrivacyBody, TermsBody)
  ["1209 Mountain Road Pl NE, Ste N", "412 W 7th St"],
  ["Albuquerque, NM 87110", "Clovis, NM 88101"],
  // JSON-LD Organization schema fields (src/app/layout.tsx)
  ['streetAddress: "1209 Mountain Road Pl NE, Ste N"', 'streetAddress: "412 W 7th St"'],
  ['addressLocality: "Albuquerque"', 'addressLocality: "Clovis"'],
  ['postalCode: "87110"', 'postalCode: "88101"'],
  // Legal-name variants — order matters (longest first so "Cognifyx" doesn't
  // leak inside longer possessive forms first).
  ["Cognifyx Solutions LLC's", "Coconut Ventures LLC's"],
  ["Cognifyx Solutions LLC\\u2019s", "Coconut Ventures LLC\\u2019s"],
  ["Cognifyx Solutions LLC", "Coconut Ventures LLC"],
];

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === ".next") continue;
      out.push(...(await walk(full)));
    } else if (e.name.endsWith(".ts") || e.name.endsWith(".tsx")) {
      out.push(full);
    }
  }
  return out;
}

async function main() {
  const files = await walk(ROOT);
  let updated = 0;
  const changedFiles = [];
  for (const f of files) {
    let s = await fs.readFile(f, "utf8");
    const original = s;
    for (const [from, to] of PAIRS) {
      s = s.split(from).join(to);
    }
    if (s !== original) {
      await fs.writeFile(f, s, "utf8");
      updated++;
      changedFiles.push(path.relative(process.cwd(), f));
    }
  }
  console.log(`Updated ${updated} files.`);
  for (const f of changedFiles) console.log(`  ${f}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
