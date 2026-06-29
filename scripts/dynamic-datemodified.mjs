#!/usr/bin/env node
/**
 * Sweep every page wrapper and replace the hard-coded
 *   dateModified: "2026-05-04"
 * with a dynamic, build-time-generated value. LLMs and Google both
 * favor content marked with the most-recent dateModified; refreshing
 * on every deploy (which is what we get with new Date()) compounds
 * over time without our team having to remember to bump dates.
 *
 * Strategy: replace string literals with a reference to a single
 * shared TODAY constant we'll define inline at the top of any file
 * that uses it. Easier sed-style replacement: turn the literal into
 * `new Date().toISOString().slice(0, 10)` directly. That's pure
 * function so it inlines fine in either a const or an object literal.
 *
 * Skipped: datePublished (we want that to stay fixed; an article's
 * publication date is meaningful as immutable history).
 */

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src/app");

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

// Replace `dateModified: "YYYY-MM-DD"` with the build-time current date.
// Match accepts both un-quoted (object literal) and `"dateModified":` JSON forms.
const RE = /dateModified:\s*"\d{4}-\d{2}-\d{2}"/g;
const RE_JSON = /"dateModified":\s*"\d{4}-\d{2}-\d{2}"/g;
const REPLACEMENT = 'dateModified: new Date().toISOString().slice(0, 10)';
const REPLACEMENT_JSON = '"dateModified": new Date().toISOString().slice(0, 10)';

async function main() {
  const files = await walk(ROOT);
  let updated = 0;
  let totalReplacements = 0;
  for (const f of files) {
    let s = await fs.readFile(f, "utf8");
    const before = s;
    const a = (s.match(RE) || []).length;
    const b = (s.match(RE_JSON) || []).length;
    if (a + b === 0) continue;
    s = s.replace(RE, REPLACEMENT);
    s = s.replace(RE_JSON, REPLACEMENT_JSON);
    if (s !== before) {
      await fs.writeFile(f, s, "utf8");
      updated++;
      totalReplacements += a + b;
    }
  }
  console.log(`Updated ${updated} files (${totalReplacements} replacements).`);
}

main().catch((e) => { console.error(e); process.exit(1); });
