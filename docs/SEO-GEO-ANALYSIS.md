# SEO & GEO Visibility Audit — carcheckervin.com

Last run: 2026-05-18
Tool: [`seo-geo`](../.claude/skills/seo-geo/SKILL.md) skill (vendored from
[ReScienceLab/opc-skills](https://github.com/ReScienceLab/opc-skills))

GEO = **Generative Engine Optimization** — making the site discoverable and
citable by AI search engines (ChatGPT, Perplexity, Gemini / Google AI Overview,
Copilot / Bing, Claude). AI search engines don't rank pages — they **cite
sources**. Being cited is the new "ranking #1."

---

## How to re-run this audit

The skill is vendored under `.claude/skills/seo-geo/`. From the repo root:

```bash
# Single-page audit (title, meta, H1, schemas, AI bot access, load time)
python3 .claude/skills/seo-geo/scripts/seo_audit.py "https://www.carcheckervin.com/lemon-check"

# All key landing pages in one shot
for url in \
  "https://www.carcheckervin.com" \
  "https://www.carcheckervin.com/vin-check" \
  "https://www.carcheckervin.com/lemon-check" \
  "https://www.carcheckervin.com/paint-code-lookup" \
  "https://www.carcheckervin.com/florida-vin-check" \
  "https://www.carcheckervin.com/license-plate-lookup"; do
  echo "===== $url ====="
  python3 .claude/skills/seo-geo/scripts/seo_audit.py "$url" 2>&1 | tail -22
done
```

For deeper analysis (keyword research, backlinks, competitor gaps) the skill
ships scripts under `.claude/skills/seo-geo/scripts/` that wrap DataForSEO and
Search Console APIs — those require a paid API key and are not used here.

---

## Audit results — 2026-05-18

### Page-by-page summary

| Page | Title length | Description length | JSON-LD blocks | Load time | Verdict |
|---|---:|---:|---:|---:|---|
| `/` | 70 | 164 | 14 | 0.90s | Borderline — title/desc slightly long |
| `/vin-check` | 59 | 173 | 10 | 0.93s | Title OK, description over 160 |
| `/lemon-check` | 82 | 224 | 22 | 1.16s | **Both over budget** — title 82, desc 224 |
| `/paint-code-lookup` | 101 | 198 | 20 | 0.88s | **Title 101 chars — will truncate hard** |
| `/florida-vin-check` | 77 | 198 | 20 | 1.35s | Title and desc both over |
| `/license-plate-lookup` | 90 | 186 | 20 | 0.97s | Title 90 chars — will truncate |

### What's working well

- **Schema coverage is excellent.** Every landing page ships 10–22 JSON-LD
  blocks. Recent rebuilds (`/lemon-check`, `/paint-code-lookup`,
  `/florida-vin-check`) include the full GEO-favoured set: `WebApplication`,
  `FAQPage`, `HowTo`, `BreadcrumbList`, `Speakable`. This is a strong moat for
  AI citation eligibility.
- **Load times under 1.5s** across the board. Both Bing/Copilot (which require
  <2s) and Google AI Overview reward this.
- **Sitemap fanout** — 4 sitemaps declared in `robots.txt` (`sitemap.xml`,
  `news-sitemap.xml`, `image-sitemap.xml`, `sitemap-index.xml`).
- **Every page has an `og:` tag set and a unique H1.**

### Issues found

1. **🔴 AI bots had no explicit `robots.txt` rule** — fixed in this commit.
   The previous `User-Agent: *` rule allowed them implicitly, but several AI
   crawlers (Google-Extended, Applebot-Extended, OAI-SearchBot) treat the
   absence of an explicit allow as an opt-out signal. See
   [`src/app/robots.ts`](../src/app/robots.ts) — we now name 15 AI bots
   explicitly. Verified live: `/robots.txt` returns 15 explicit allow blocks.

2. **🟡 Titles over 60 characters on 4 pages.** Google truncates titles to
   ~580 px (~60 chars for most fonts). Pages affected:
   - `/paint-code-lookup` — 101 chars → recommend ~58
   - `/license-plate-lookup` — 90 chars
   - `/lemon-check` — 82 chars
   - `/florida-vin-check` — 77 chars

3. **🟡 Meta descriptions over 160 chars on every page tested.** Google
   truncates at ~155 chars. Longer is not penalised but the tail is invisible
   in SERPs, wasting keyword surface. Tighten to 150–155.

4. **🟢 `/report/` is `Disallow`-ed for every bot, including AI.** This is
   correct — per-VIN report URLs contain user query data and shouldn't be
   indexed. But it does mean AI engines cite our **landing pages**, not
   individual reports — so landing-page quality is the entire AI-visibility
   surface.

---

## Recommendations (priority order)

### P1 — Title and description tightening (high-impact, low-effort)

Rewrite the `metadata.title` and `metadata.description` on the four oversized
pages. Target ≤60 char title / ≤155 char description.

Example suggestions:

| Page | Suggested title (chars) | Notes |
|---|---|---|
| `/paint-code-lookup` | `Paint Code Lookup by VIN — Free OEM Color Finder` (50) | Drops "Find Your Car's Factory Color" tail |
| `/license-plate-lookup` | `License Plate to VIN Lookup — Free, All 50 States` (51) | |
| `/lemon-check` | `Lemon Check by VIN — Free Buyback Lookup` (40) | Move "All 50 States" into description |
| `/florida-vin-check` | `Florida VIN Check — Free FL Vehicle History` (45) | |

### P2 — Add author / `Person` Schema to long-form pages

The Princeton GEO research shows **citations (+40 %) and quotations (+30 %)**
are the two single biggest levers for AI citation. Today our content is
unattributed. Adding `author` (`Person` with `sameAs` to a LinkedIn / X
profile) on Article / FAQPage schemas signals E-E-A-T to both Google AI
Overview and Claude. Add a minimal `Person` entity once in
`src/lib/seo/author.ts` and reference it from every Article / HowTo schema.

### P3 — Add a `Statistics` block to every long-form landing

Princeton GEO research: pages with explicit numeric data points are cited **+37 %**
more often. Our pages already include numbers (e.g. lemon-law thresholds,
state coverage windows) but they're embedded in prose. Surface 3–5 stats in a
dedicated block near the top of each landing — and mirror them in a
`Dataset` JSON-LD entity. Example for `/lemon-check`:

> - **51** US jurisdictions covered (50 states + DC)
> - **3–4** repair attempts is the typical lemon threshold
> - **30 days** out of service typically qualifies
> - **15–40 %** is the typical resale discount on a lemon-titled vehicle

### P4 — Brave Search submission for Claude visibility

Claude's web search uses Brave's index, not Google's. Submit `sitemap.xml` to
[Brave Search Webmaster Tools](https://search.brave.com/help/webmaster-tools)
to make every landing page eligible for Claude citation.

### P5 — Bing Webmaster submission

Copilot citations require Bing indexing. Submit the four sitemaps to
[Bing Webmaster Tools](https://www.bing.com/webmasters).

### P6 — Add a `mentions` or `citation` schema property

For pages that reference external authoritative sources (NMVTIS, NHTSA, state
DMV statutes for `/florida-vin-check`, etc.), add a `citation` array to the
Article schema. This pushes our content from "an article" toward "an article
that cites primary sources" — the exact pattern AI engines reward.

---

## Princeton GEO methods — applied / pending

The skill summarises 9 research-backed GEO levers. Status across the site:

| Method | Visibility lift | Status on our pages |
|---|---:|---|
| Cite sources | +40 % | 🟡 Partial — NMVTIS / DPPA / statute references in prose only, no `citation` schema |
| Statistics addition | +37 % | 🟡 Numbers in prose, not surfaced as a stats block |
| Quotation addition | +30 % | 🔴 None |
| Authoritative tone | +25 % | 🟢 Strong on rebuilt pages |
| Easy-to-understand | +20 % | 🟢 Strong |
| Technical terms | +18 % | 🟢 NMVTIS, DPPA, Magnuson-Moss, NHTSA, VIN, OEM all used naturally |
| Unique words | +15 % | 🟢 Strong on rebuilt pages |
| Fluency optimisation | +15–30 % | 🟢 Strong |
| Keyword stuffing | **-10 %** | 🟢 Avoided |

**Best combination according to the research: Fluency + Statistics.** We have
fluency. Adding the stats blocks is the single highest-EV next move.

---

## Platform-specific notes

- **ChatGPT** — favours branded-domain authority and recent updates. Our
  rebuilt pages have `dateModified: 2026-05-14` which keeps them in the
  "updated within 30 days" bucket (3.2 × citation rate per the research).
- **Perplexity** — `PerplexityBot` now explicitly allowed. FAQPage schemas on
  every rebuilt page match Perplexity's citation preference.
- **Google AI Overview** — strongest on E-E-A-T. P2 (author schema) is the
  biggest unlock here.
- **Copilot / Bing** — requires Bing indexing. See P5.
- **Claude** — requires Brave indexing. See P4. `ClaudeBot`, `Claude-Web`,
  `anthropic-ai` all explicitly allowed in `robots.txt`.

---

## One-time external setup (P4 + P5 from the original audit)

These cannot be automated — they require an admin to verify domain
ownership in each console. Once verified, IndexNow takes over for ongoing
discovery.

### Brave Search Webmaster Tools (Claude visibility)

Claude's web search uses Brave's index, not Google's. Brave does **not**
participate in IndexNow yet, so this is a manual sitemap submission:

1. Go to <https://search.brave.com/help/webmaster-tools>
2. Verify ownership of `carcheckervin.com` via DNS TXT record or HTML meta
3. Submit:
   - `https://www.carcheckervin.com/sitemap.xml`
   - `https://www.carcheckervin.com/sitemap-index.xml`
4. Brave will start crawling within 24-48h. Verify by querying Claude with
   `site:carcheckervin.com {topic}` after a week.

### Bing Webmaster Tools (Copilot visibility)

Copilot's citations come straight from Bing's index. IndexNow already pings
Bing on every URL change (see `src/lib/indexnow.ts`), so this is mainly
about claiming the property for monitoring.

1. Go to <https://www.bing.com/webmasters>
2. Import from Google Search Console (1-click) or verify via DNS/meta
3. Confirm sitemap submission auto-populated from the 4 sitemaps in
   `robots.txt`
4. Optional: paste IndexNow key `f642b32ff0c34140ba975127705effbd` in the
   IndexNow section to view per-URL submission status

### Verifying IndexNow is firing

The endpoint already exists. Admin can trigger a full re-submit of every
static URL:

```bash
curl -X GET "https://www.carcheckervin.com/api/indexnow?token=$ADMIN_PING_TOKEN&all=1"
```

Or POST a specific set:

```bash
curl -X POST https://www.carcheckervin.com/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"urls": ["/lemon-check", "/florida-vin-check"]}'
```

---

## Changelog

- **2026-05-18 (initial)** — Audit run. `seo-geo` skill vendored to
  `.claude/skills/seo-geo/`. `src/app/robots.ts` updated with explicit
  allow-rules for 15 AI crawlers.

- **2026-05-18 (P1+P2+P3 applied)**:
  - **P1**: Titles tightened to ≤60 chars and descriptions to ≤155 chars
    on homepage, `/vin-check`, `/lemon-check`, `/florida-vin-check`,
    `/license-plate-lookup`, `/look-up-car-plates-free`.
    **NOT touched**: `/paint-code-lookup` — already ranking, no metadata
    changes made to avoid disturbing existing position.
  - **P2**: New `src/lib/seo/author.ts` with a canonical `ORG_AUTHOR`
    Organization entity (Schema.org `Organization` with `knowsAbout`,
    `logo`, `sameAs`, `description`). Wired into the Article schema on
    ~33 landing pages and guides. **NOT applied to**: `/paint-code-lookup`.
  - **P3**: Visible "By the numbers" stats cards + matching `Dataset`
    JSON-LD added to `/lemon-check` and `/florida-vin-check`.
    **NOT applied to**: `/paint-code-lookup` (kept frozen).
  - **P4 + P5**: Manual setup steps documented above. IndexNow is already
    pinging Bing/Yandex/Naver/Seznam on every URL change via
    `src/lib/indexnow.ts`.
