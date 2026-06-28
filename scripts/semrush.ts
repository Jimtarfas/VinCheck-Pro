/**
 * SEMrush CLI — direct REST API access (no MCP connector).
 *
 * Talks straight to SEMrush's public API with your API key:
 *   • Analytics API   → https://api.semrush.com/        (domains + keywords)
 *   • Backlinks API   → https://api.semrush.com/analytics/v1/
 *
 * Every call consumes SEMrush API UNITS (billed against your plan), so the
 * commands default to small result limits. Bump --limit when you need more.
 *
 * Auth: set SEMRUSH_API_KEY (find it in SEMrush → Profile → Subscription
 * info / API units; requires a Business plan or an API-units add-on).
 *
 * Usage (tsx auto-loads .env.local via --env-file):
 *   npx tsx --env-file=.env.local scripts/semrush.ts <command> <arg> [flags]
 *
 * Flags (all optional):
 *   --db <code>     regional database, default "us" (uk, ca, au, es, …)
 *   --limit <n>     max rows for list commands, default 10
 *   --json          print raw parsed rows as JSON instead of a table
 *
 * Commands
 *   ── Domain overview ──────────────────────────────────────────────
 *   domain-overview <domain>        traffic, keyword count, rank, ad data
 *
 *   ── Keyword research ─────────────────────────────────────────────
 *   keyword <phrase>                volume, CPC, competition + difficulty
 *   keyword-related <phrase>        related keyword ideas
 *   keyword-broad <phrase>          broad/phrase-match keyword variants
 *
 *   ── Position tracking (organic positions) ────────────────────────
 *   domain-keywords <domain>        keywords the domain ranks for + position
 *
 *   ── Competitors ──────────────────────────────────────────────────
 *   competitors <domain>            organic competitors + overlap
 *
 *   ── Backlinks ────────────────────────────────────────────────────
 *   backlinks-overview <target>     totals: ref domains, follow/nofollow…
 *   backlinks <target>              individual backlinks
 *   backlinks-refdomains <target>   referring domains ranked by authority
 *
 * Examples:
 *   npx tsx --env-file=.env.local scripts/semrush.ts domain-overview carfax.com
 *   npx tsx --env-file=.env.local scripts/semrush.ts keyword "vin check" --db us
 *   npx tsx --env-file=.env.local scripts/semrush.ts domain-keywords carcheckervin.com --limit 25
 *   npx tsx --env-file=.env.local scripts/semrush.ts backlinks-overview carcheckervin.com
 */

const KEY = process.env.SEMRUSH_API_KEY;
const ANALYTICS = "https://api.semrush.com/";
const BACKLINKS = "https://api.semrush.com/analytics/v1/";

if (!KEY) {
  console.error(
    "❌ SEMRUSH_API_KEY env var is required.\n" +
      "   Add it to .env.local (gitignored) then run with:\n" +
      "   npx tsx --env-file=.env.local scripts/semrush.ts <command> …"
  );
  process.exit(1);
}

// ── Human-readable labels for SEMrush's short column codes ──────────────
const LABELS: Record<string, string> = {
  Db: "Database",
  Dn: "Domain",
  Rk: "Rank",
  Or: "Organic keywords",
  Ot: "Organic traffic",
  Oc: "Organic cost ($)",
  Ad: "Adwords keywords",
  At: "Adwords traffic",
  Ac: "Adwords cost ($)",
  Ph: "Keyword",
  Po: "Position",
  Pp: "Prev. position",
  Nq: "Volume",
  Cp: "CPC ($)",
  Ur: "URL",
  Tr: "Traffic %",
  Tc: "Traffic cost %",
  Co: "Competition",
  Nr: "Results",
  Td: "Trend",
  Kd: "Difficulty %",
  Rr: "Relevance",
  Cr: "Competitor relevance",
  Np: "Common keywords",
  // backlinks
  ascore: "Authority",
  domain_ascore: "Authority",
  page_ascore: "Page authority",
  total: "Total backlinks",
  domains_num: "Ref. domains",
  urls_num: "Ref. URLs",
  ips_num: "Ref. IPs",
  follows_num: "Follow",
  nofollows_num: "Nofollow",
  texts_num: "Text links",
  images_num: "Image links",
  source_title: "Source title",
  source_url: "Source URL",
  target_url: "Target URL",
  anchor: "Anchor",
  first_seen: "First seen",
  last_seen: "Last seen",
  nofollow: "Nofollow",
  domain: "Domain",
  backlinks_num: "Backlinks",
  ip: "IP",
};

interface Flags {
  db: string;
  limit: number;
  json: boolean;
}

function parseFlags(argv: string[]): { positional: string[]; flags: Flags } {
  const positional: string[] = [];
  const flags: Flags = { db: "us", limit: 10, json: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--db") flags.db = argv[++i];
    else if (a === "--limit") flags.limit = Number(argv[++i]) || 10;
    else if (a === "--json") flags.json = true;
    else positional.push(a);
  }
  return { positional, flags };
}

/**
 * SEMrush returns semicolon-delimited text: a header row of column codes,
 * then one row per record. Errors come back as "ERROR ## :: message".
 */
function parseSemrush(text: string): Record<string, string>[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (/^ERROR\s/i.test(trimmed)) {
    throw new Error(`SEMrush API: ${trimmed}`);
  }
  const lines = trimmed.split(/\r?\n/);
  const headers = lines[0].split(";");
  return lines.slice(1).map((line) => {
    const cells = line.split(";");
    const row: Record<string, string> = {};
    headers.forEach((h, i) => (row[h] = cells[i] ?? ""));
    return row;
  });
}

async function call(base: string, params: Record<string, string>): Promise<string> {
  const url = new URL(base);
  url.searchParams.set("key", KEY!);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  const body = await res.text();
  if (!res.ok && !body.trim()) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
  return body;
}

function printRows(rows: Record<string, string>[], flags: Flags): void {
  if (flags.json) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }
  if (rows.length === 0) {
    console.log("(no results)");
    return;
  }
  // Single-record reports (overviews) read better as a vertical list.
  if (rows.length === 1) {
    for (const [k, v] of Object.entries(rows[0])) {
      console.log(`${(LABELS[k] || k).padEnd(22)} ${v}`);
    }
    return;
  }
  // Multi-row: aligned table.
  const cols = Object.keys(rows[0]);
  const header = cols.map((c) => LABELS[c] || c);
  const widths = cols.map((c, i) =>
    Math.max(header[i].length, ...rows.map((r) => (r[c] || "").length))
  );
  const fmt = (cells: string[]) =>
    cells.map((cell, i) => cell.padEnd(widths[i])).join("  ");
  console.log(fmt(header));
  console.log(widths.map((w) => "-".repeat(w)).join("  "));
  for (const r of rows) console.log(fmt(cols.map((c) => r[c] || "")));
}

// ── Command implementations ─────────────────────────────────────────────

async function domainOverview(domain: string, f: Flags) {
  const text = await call(ANALYTICS, {
    type: "domain_ranks",
    domain,
    database: f.db,
    export_columns: "Db,Dn,Rk,Or,Ot,Oc,Ad,At,Ac",
  });
  printRows(parseSemrush(text), f);
}

async function keyword(phrase: string, f: Flags) {
  const overview = parseSemrush(
    await call(ANALYTICS, {
      type: "phrase_this",
      phrase,
      database: f.db,
      export_columns: "Ph,Nq,Cp,Co,Nr,Td",
    })
  );
  // Keyword difficulty lives in a separate report — merge it in.
  let kd = "";
  try {
    const kdiRows = parseSemrush(
      await call(ANALYTICS, {
        type: "phrase_kdi",
        phrase,
        database: f.db,
        export_columns: "Ph,Kd",
      })
    );
    kd = kdiRows[0]?.Kd ?? "";
  } catch {
    /* difficulty is best-effort */
  }
  if (overview[0] && kd) overview[0].Kd = kd;
  printRows(overview, f);
}

async function keywordRelated(phrase: string, f: Flags) {
  const text = await call(ANALYTICS, {
    type: "phrase_related",
    phrase,
    database: f.db,
    display_limit: String(f.limit),
    export_columns: "Ph,Nq,Cp,Co,Nr,Td,Rr",
  });
  printRows(parseSemrush(text), f);
}

async function keywordBroad(phrase: string, f: Flags) {
  const text = await call(ANALYTICS, {
    type: "phrase_fullsearch",
    phrase,
    database: f.db,
    display_limit: String(f.limit),
    export_columns: "Ph,Nq,Cp,Co,Nr,Td",
  });
  printRows(parseSemrush(text), f);
}

async function domainKeywords(domain: string, f: Flags) {
  const text = await call(ANALYTICS, {
    type: "domain_organic",
    domain,
    database: f.db,
    display_limit: String(f.limit),
    display_sort: "tr_desc",
    export_columns: "Ph,Po,Pp,Nq,Cp,Ur,Tr,Tc,Co,Td",
  });
  printRows(parseSemrush(text), f);
}

async function competitors(domain: string, f: Flags) {
  const text = await call(ANALYTICS, {
    type: "domain_organic_organic",
    domain,
    database: f.db,
    display_limit: String(f.limit),
    export_columns: "Dn,Cr,Np,Or,Ot,Oc,Ad",
  });
  printRows(parseSemrush(text), f);
}

/** Backlinks API takes a target + target_type (root_domain | domain | url). */
function targetType(target: string): string {
  if (/^https?:\/\//i.test(target) || target.includes("/")) return "url";
  // bare host like "sub.example.com" → domain; apex "example.com" → root_domain
  const host = target.replace(/^https?:\/\//, "").split("/")[0];
  return host.split(".").length > 2 ? "domain" : "root_domain";
}

async function backlinksOverview(target: string, f: Flags) {
  const text = await call(BACKLINKS, {
    type: "backlinks_overview",
    target,
    target_type: targetType(target),
    export_columns:
      "ascore,total,domains_num,urls_num,ips_num,follows_num,nofollows_num,texts_num,images_num",
  });
  printRows(parseSemrush(text), f);
}

async function backlinks(target: string, f: Flags) {
  const text = await call(BACKLINKS, {
    type: "backlinks",
    target,
    target_type: targetType(target),
    display_limit: String(f.limit),
    export_columns:
      "page_ascore,source_title,source_url,target_url,anchor,first_seen,last_seen,nofollow",
  });
  printRows(parseSemrush(text), f);
}

async function backlinksRefdomains(target: string, f: Flags) {
  const text = await call(BACKLINKS, {
    type: "backlinks_refdomains",
    target,
    target_type: targetType(target),
    display_limit: String(f.limit),
    export_columns: "domain_ascore,domain,backlinks_num,ip",
  });
  printRows(parseSemrush(text), f);
}

// ── Dispatch ─────────────────────────────────────────────────────────────

const HELP = `SEMrush CLI — commands:
  domain-overview <domain>
  keyword <phrase>
  keyword-related <phrase>
  keyword-broad <phrase>
  domain-keywords <domain>
  competitors <domain>
  backlinks-overview <target>
  backlinks <target>
  backlinks-refdomains <target>
Flags: --db <code> (default us)  --limit <n> (default 10)  --json`;

async function main() {
  const [, , command, ...rest] = process.argv;
  const { positional, flags } = parseFlags(rest);
  const arg = positional[0];

  if (!command || command === "help" || command === "--help") {
    console.log(HELP);
    return;
  }
  if (!arg) {
    console.error(`❌ "${command}" needs an argument.\n\n${HELP}`);
    process.exit(1);
  }

  switch (command) {
    case "domain-overview": return domainOverview(arg, flags);
    case "keyword": return keyword(arg, flags);
    case "keyword-related": return keywordRelated(arg, flags);
    case "keyword-broad": return keywordBroad(arg, flags);
    case "domain-keywords": return domainKeywords(arg, flags);
    case "competitors": return competitors(arg, flags);
    case "backlinks-overview": return backlinksOverview(arg, flags);
    case "backlinks": return backlinks(arg, flags);
    case "backlinks-refdomains": return backlinksRefdomains(arg, flags);
    default:
      console.error(`❌ Unknown command "${command}".\n\n${HELP}`);
      process.exit(1);
  }
}

main().catch((e) => {
  console.error(`❌ ${e instanceof Error ? e.message : String(e)}`);
  process.exit(1);
});
