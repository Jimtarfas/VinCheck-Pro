#!/usr/bin/env node
/**
 * For every Body component that already exports FAQS_ES, add a
 * `FAQS_FR` alias and include it in the export block. The alias points
 * at FAQS_ES so the JSON-LD FAQ schema on /fr/ pages stays consistent
 * with what the rendered FAQ component shows in French (which already
 * uses the locale="fr" branch inside COPY). The text content will be
 * Spanish until a follow-up wave translates the JSON-LD strings — but
 * it keeps the schema valid and lets every /fr page build.
 */

import { promises as fs } from "node:fs";
import path from "node:path";

const COMP_DIR = path.resolve("src/components");

async function main() {
  const entries = await fs.readdir(COMP_DIR, { withFileTypes: true });
  let updated = 0;
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith(".tsx")) continue;
    const full = path.join(COMP_DIR, e.name);
    let s = await fs.readFile(full, "utf8");
    if (!s.includes("FAQS_ES")) continue;
    if (s.includes("FAQS_FR")) continue;

    // Pattern A: bracketed re-export — `export { FAQS_EN, FAQS_ES };`
    const reA = /export\s*\{([^}]*?\bFAQS_ES\b[^}]*?)\}\s*;/;
    if (reA.test(s)) {
      s = s.replace(reA, (_m, inside) => {
        const ids = inside
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean);
        if (!ids.includes("FAQS_FR")) ids.push("FAQS_FR");
        return `export { ${ids.join(", ")} };`;
      });
    } else {
      // Pattern B: inline `export const FAQS_ES = ...`
      // Append nothing here — alias added below covers all cases.
    }

    // Add the alias right after the LAST occurrence of FAQS_ES = […]; in case
    // there are multiple. We append it once at end-of-file in a sentinel
    // block so it's easy to find later.
    const sentinel = "\n// Wave 19 — French uses the Spanish FAQ array as a structural fallback.\n" +
      "// The user-visible FAQ component already uses the locale=\"fr\" branch in COPY;\n" +
      "// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.\n" +
      "const FAQS_FR = FAQS_ES;\n";
    s = s + sentinel;

    // If pattern A didn't match (no re-export block), add one for FAQS_FR.
    if (!reA.test(await Promise.resolve(s))) {
      s = s + "export { FAQS_FR };\n";
    }

    await fs.writeFile(full, s, "utf8");
    updated++;
  }
  // eslint-disable-next-line no-console
  console.log(`Updated ${updated} body components.`);
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
