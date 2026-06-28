#!/usr/bin/env node
/**
 * Cleanup pass after add-faqs-fr-alias.mjs:
 *   - For files whose FAQs use bespoke names (e.g. MARKETPLACE_INDEX_FAQS_ES),
 *     rewrite the alias to point at the right symbol AND add it to the
 *     export list.
 *   - For files that already declared FAQS_FR internally but didn't export
 *     it, add FAQS_FR to the export block.
 *   - For files where my naive alias is fine, leave them alone.
 */

import { promises as fs } from "node:fs";
import path from "node:path";

const COMP_DIR = path.resolve("src/components");

async function main() {
  const entries = await fs.readdir(COMP_DIR, { withFileTypes: true });
  let fixed = 0;
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith(".tsx")) continue;
    const full = path.join(COMP_DIR, e.name);
    let s = await fs.readFile(full, "utf8");

    // Case 1: bespoke-named exports like `export const FOO_FAQS_ES = …;`
    // Strategy: find every `export const <NAME>_FAQS_ES` declaration and
    // append `export const <NAME>_FAQS_FR = <NAME>_FAQS_ES;` if not yet
    // exported. Also remove any broken `const FAQS_FR = FAQS_ES;` sentinel
    // we added in the prior pass.
    const bespokeMatches = [...s.matchAll(/export const ([A-Z0-9_]+_FAQS_ES)\b/g)];
    if (bespokeMatches.length > 0) {
      // strip the broken sentinel + bare alias + bare re-export
      s = s.replace(
        /\n\/\/ Wave 19 — French uses the Spanish FAQ array as a structural fallback\.[\s\S]*?const FAQS_FR = FAQS_ES;\nexport \{ FAQS_FR \};\n?/g,
        ""
      );
      s = s.replace(
        /\n\/\/ Wave 19 — French uses the Spanish FAQ array as a structural fallback\.[\s\S]*?const FAQS_FR = FAQS_ES;\n?/g,
        ""
      );
      const aliasLines = bespokeMatches
        .map((m) => m[1])
        .filter((name) => !s.includes(`${name.replace(/_ES$/, "_FR")} =`) && !s.includes(`export const ${name.replace(/_ES$/, "_FR")}`))
        .map((name) => `export const ${name.replace(/_ES$/, "_FR")} = ${name};`);
      if (aliasLines.length > 0) {
        s = s.trimEnd() + "\n\n" +
          "// Wave 19 — French uses the Spanish FAQ array as a structural fallback for JSON-LD.\n" +
          aliasLines.join("\n") + "\n";
        fixed++;
      }
      await fs.writeFile(full, s, "utf8");
      continue;
    }

    // Case 2: file declares FAQS_FR internally already (e.g. existing
    // earlier draft) but didn't re-export it. Add it to the export block.
    const declares = /\bconst\s+FAQS_FR\s*=/.test(s) || /\bexport\s+const\s+FAQS_FR\s*=/.test(s);
    const exported = /export\s*\{[^}]*\bFAQS_FR\b[^}]*\}/.test(s) || /export\s+const\s+FAQS_FR\b/.test(s);
    if (declares && !exported) {
      s = s.replace(
        /export\s*\{([^}]*?\bFAQS_(?:EN|ES)\b[^}]*?)\}\s*;/,
        (_m, inside) => {
          const ids = inside
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean);
          if (!ids.includes("FAQS_FR")) ids.push("FAQS_FR");
          return `export { ${ids.join(", ")} };`;
        }
      );
      await fs.writeFile(full, s, "utf8");
      fixed++;
    }
  }
  // eslint-disable-next-line no-console
  console.log(`Fixed ${fixed} body components.`);
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
