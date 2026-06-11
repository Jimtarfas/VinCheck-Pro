# seo-geo — SEO & GEO Optimization Skill

SEO + **GEO (Generative Engine Optimization)** for the CarCheckerVIN / VinCheck-Pro
site. Optimizes pages for both traditional search (Google, Bing) and AI answer
engines (ChatGPT, Perplexity, Gemini, Copilot, Claude).

> **GEO premise:** AI engines don't rank pages — they *cite sources*. Structured
> data, answer-first copy, statistics, and citations are what get a page quoted.

---

## What this skill does

1. **Audits** a page/site for technical SEO and AI-bot crawlability.
2. **Researches** keywords and competitor gaps (`WebSearch` + `scripts/`).
3. **Generates** JSON-LD schema and answer-first content.
4. **Redesigns** landing pages to the repo's canonical **paint-code template**
   (brand/Material design tokens + 6 structured-data schemas).
5. **Validates** schema, indexing, and bot access.

The authoritative process lives in [`SKILL.md`](./SKILL.md). This README is the
quick map + the repo-specific page-redesign runbook.

---

## Invoking

```
/seo-geo            # or just ask: "optimize <url> for SEO/GEO"
```

The skill auto-triggers on intents like: improve search visibility, AI
visibility, ChatGPT/Perplexity ranking, Google AI Overview, JSON-LD, schema
markup, meta tags, indexing, or keyword research.

---

## File map

| Path | Purpose |
|------|---------|
| `SKILL.md` | Main workflow (audit → keywords → GEO → SEO → validate) |
| `references/geo-research.md` | Princeton 9 GEO methods + visibility lifts |
| `references/schema-templates.md` | JSON-LD templates (Article, FAQPage, HowTo…) |
| `references/seo-checklist.md` | Full pre-ship audit checklist |
| `references/platform-algorithms.md` | Per-engine ranking factors |
| `references/tools-and-apis.md` | Tool / API reference |
| `scripts/seo_audit.py` | Free technical audit (title, meta, H1, robots, speed) |
| `scripts/keyword_research.py`, `related_keywords.py`, `serp_analysis.py` … | DataForSEO-backed research (needs creds) |
| `examples/opc-skills-case-study.md` | Worked example |

---

## The paint-code template (repo page-redesign runbook)

Every SEO landing page under `src/app/**/page.tsx` is being standardized to one
canonical design + schema template. **Reference implementation:**
`src/app/warranty-check/page.tsx`.

### Design tokens (Material / brand)

- Hero: `bg-primary text-white`; accent via
  `<span style={{ color: "var(--color-secondary-container)" }}>`.
- Surfaces: `bg-surface`, `bg-surface-container-lowest`, `bg-surface-container-low`.
- Text: `text-on-surface`, `text-on-surface-variant`, `text-on-secondary-container`.
- Borders: `border-outline-variant`; callouts `bg-primary/5 border-primary/20`,
  `bg-secondary-container/40`.
- Type: `font-headline font-extrabold` / `font-black`.
- **Never** use legacy `slate-*` / `primary-600` classes in redesigned pages.

### The 6 required JSON-LD schemas

Each is rendered via `<script type="application/ld+json" …>` and should appear
**twice** in served HTML (once in the streamed shell, once hydrated).

1. **WebApplication** — `applicationCategory: "AutomotiveApplication"`, free `offers`.
2. **Article** — `author: ORG_AUTHOR` (`@/lib/seo/author`), publisher + logo,
   `datePublished` / `dateModified` (bump `dateModified` to today on every edit).
3. **FAQPage** — built from the page's FAQ array. **Preserve existing Q&A text verbatim.**
4. **HowTo** — steps with `totalTime` where applicable.
5. **BreadcrumbList**.
6. **WebPage + Speakable** — `cssSelector: ["h1", ".speakable-intro"]`.

### Standard page structure

Dark hero (`onDark` Breadcrumbs, pill badge, h1 + accent span, `.speakable-intro`
paragraph, white VIN-form card with `<Lock>` "Free · No sign-up", 4-up trust-stats
grid) → `max-w-5xl mx-auto` content: 3-card how-it-works, worked-example callout,
card grids, mid CTA (`rounded-3xl bg-primary` + `Sparkles text-yellow-300`),
comparison columns, green-check checklists, internal-links grid (`ChevronRight`),
`<VinCheckBanner />`, FAQ `<details>`/`<summary>` accordion
(`group-open:rotate-45`, `[&_summary::-webkit-details-marker]:hidden`), bottom CTA,
`<RelatedChecks />`.

### Verification routine (run before every commit)

```bash
cd "$(git rev-parse --show-toplevel)"

# 1. Types must be clean
npx tsc --noEmit -p tsconfig.json            # expect EXIT 0

# 2. Every imported icon must be used (count >= 2 = import + >=1 use).
#    Count == 1 means an unused import -> remove it.
f="src/app/<route>/page.tsx"
for icon in Check Shield Search FileText ...; do
  n=$(grep -oE "\b$icon\b" "$f" | wc -l | tr -d ' '); echo "$icon: $n";
done

# 3. Page serves 200
curl -s -o /tmp/x.html -w 'HTTP %{http_code}\n' http://localhost:3000/<route>

# 4. All 6 schemas present (expect 2 each)
for t in WebApplication Article FAQPage HowTo BreadcrumbList Speakable; do
  echo "$t: $(grep -oc "$t" /tmp/x.html)";
done
```

### Commit convention

- Stage **only** the specific page file (`git add src/app/<route>/page.tsx`).
- Heredoc message ending with `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`.
- `git push origin main` (= Vercel production).
- A blog-bot publishes to `main` automatically, so pushes can be rejected. Recover with:
  ```bash
  git stash push -m wt-local .claude/launch.json   # worktree-local, always dirty
  git pull --rebase origin main
  git push origin main
  git stash pop
  ```

### Worktree caveats

- `.claude/launch.json` always shows as modified — leave it alone.
- `.agents/`, `content-drafts/`, `design.md` are untracked — leave them alone.

---

## Pages already converted

`warranty-check`, `salvage-title-check`, `odometer-check`, `airbag-check`,
`vehicle-lien-check`, and the dynamic `guides/buying-used-car-in/[state]` route
(covers every US state guide).

---

## GEO cheat-sheet (from Princeton research)

| Method | Visibility lift |
|--------|-----------------|
| Cite sources | +40% |
| Add statistics | +37% |
| Add quotations | +30% |
| Authoritative tone | +25% |
| Easy-to-understand | +20% |
| Fluency optimization | +15–30% |
| Keyword stuffing | **−10% (avoid)** |

Best combo: **Fluency + Statistics**. See `references/geo-research.md`.
