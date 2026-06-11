# CarCheckerVIN — Vehicle History Report Design Spec

> Source of truth for the premium VIN report UI. Combines the data structure of VinAudit's report with CarCheckerVIN's brand identity. Reference when mocking, implementing, or reviewing report screens.

---

## 1. Product context

**What it is.** A web-based vehicle history report shown to a user after they run a VIN check. Data is sourced via VinAudit's API, which aggregates NMVTIS, NICB, NHTSA, state DMVs, auction houses, and insurance carriers.

**Who it's for.** A buyer about to spend $5k–$60k on a used car. They want a yes/no on whether to walk away, and evidence they can show a lender or the seller to negotiate.

**What "premium" means here.** Not glossy. Not splashy. Premium = forensic. The report should feel like the front page of a financial statement: dense with facts, quietly authoritative, zero marketing copy. Closer to Stripe Dashboard or a Linear export than to Carfax.

---

## 2. Brand identity

### Color tokens

| Role | Hex | Usage |
|---|---|---|
| Primary navy | `#0F2C5C` | Hero blocks, headlines, primary buttons on light surfaces, badges |
| Accent amber | `#F59E0B` | The ONE statistic the user's eye should land on, primary CTA, kicker labels above section headers |
| Surface (page bg) | `#F6F8FC` | Page background — light slate, never pure gray |
| Card | `#FFFFFF` | All content cards |
| Card border | `#E2E5EC` | 1px hairline on every card |
| Status — clean | `#10B981` (text), `#D1FAE5` (border tint) | "No records found" / "Clean" verdicts |
| Status — warning | `#F59E0B` (text), `#FEF3C7` (border tint) | Open recalls, minor flags |
| Status — risk | `#EF4444` (text), `#FEE2E2` (border tint) | Branded titles, accidents, theft |
| Status — neutral | `#64748B` | Metadata, timestamps, "Last checked" labels |

### Typography

- **Display:** Extrabold sans, tight tracking (-0.02em on H1). Used for the vehicle YMM, large stat numbers, section headlines.
- **Body:** System sans, regular/medium weights.
- **VIN / Report ID:** Monospace, letter-spacing `0.05em`. Treats the VIN as evidence, not decoration.
- **Kicker labels:** 11–12px, uppercase, letter-spacing `0.08em`, amber when above a section header.

Scale:
- H1 vehicle title: **36px / extrabold / navy**
- Large stat (market value): **40px / extrabold / amber**
- Section H2: **30px / extrabold / navy**
- Section kicker: 11px uppercase amber
- Verdict pill label: 16px bold navy
- Body: 15px slate-700
- Metadata: 12px slate-500

### Shape & shadow

- Cards: `rounded-3xl` (24px) on top-level cards, `rounded-2xl` (16px) on inner pills/tiles.
- Borders: always `1px solid #E2E5EC` (or a status-tinted color on status cards). No double borders.
- Shadow: navy-tinted only — `0 8px 32px rgba(15, 44, 92, 0.08)`. Never pure black, never gray. Use sparingly: top header card and the primary CTA button only.

### Iconography

- Lucide icons, 1.5px stroke, sized to context (16px in pills, 20px in stat tiles, 24px in section headers).
- Status icons live inside a soft-tinted circle (`32px` filled with the status color at 12% opacity).
- No emoji, no clip-art, no stock photography. Vehicle silhouettes are flat vector illustrations in light slate when no photo is available.

### Mood guardrails

| Do | Don't |
|---|---|
| Quiet, factual headlines | Exclamation marks, "Wow!" copy |
| Numbers with cited sources | Vague phrases like "may have issues" |
| Equal visual weight across status pills | Red banners that scream for attention |
| Amber used once per viewport, max | Amber gradient backgrounds, sparkle icons |
| Soft navy shadows | Drop-shadow puddles, glassmorphism, 3D effects |
| Side-profile vehicle silhouettes | Stock photography, "Premium ⭐" badges |

---

## 3. Information architecture

The report mirrors VinAudit's data structure (so the API maps cleanly), in this exact order:

1. **Report header** — vehicle identity + 6 verdict pills + market value + actions (the only above-the-fold component)
2. **Executive summary band** — 4 large stat tiles on a navy gradient
3. **Title & registration history** — vertical timeline with state badges
4. **Ownership history** — US map + ordered period list
5. **Odometer readings** — line chart + rollback verdict
6. **Damage & accident events** — empty state OR per-event cards
7. **Theft, salvage, lien checks** — 3 status cards in a row
8. **Title brands grid** — 8-cell grid (Salvage, Flood, Lemon, Junk, Rebuilt, Hail, Police, Taxi)
9. **Open recalls (NHTSA)** — accordion list with dealer-action CTAs
10. **Vehicle specifications** — two-column decoded-VIN table
11. **Market value estimate** — large amber number with Low/Fair/High range bar
12. **Data sources footer** — source list + disclaimers

A **sticky table of contents** floats on the left (desktop) listing all 12 sections, each with a green/amber/red dot reflecting that section's verdict. Tap to scroll.

---

## 4. Header card (above the fold) — detailed spec

This is the single most important component. Goal: deliver the verdict in under 3 seconds.

### Desktop layout (1280px container)

```
┌──────────────────────────────────────────────────────────────────┐
│  ✓ NMVTIS-sourced  ·  Generated [date]  ·  Report #A8F3K    🔒  │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────┐   2021 Toyota RAV4 XLE Hybrid                        │
│  │        │   VIN  JTMRJREV1MD123456  [copy]                     │
│  │ photo  │   SUV · AWD · 2.5L Hybrid I4                         │
│  │ 160sq  │                                                       │
│  └────────┘   ┌─────────┬─────────┬─────────┐                   │
│               │ ✓ Title │ ✓ Odom. │ ✓ Acc.  │                   │
│               │ Clean   │ Consist.│ None    │                   │
│               │ 3 states│ 32,481mi│ reported│                   │
│               └─────────┴─────────┴─────────┘                   │
│               ┌─────────┬─────────┬─────────┐                   │
│               │ ✓ Theft │ ✓ Salv. │ ⚠ Recall│                   │
│               │ No rec. │ No rec. │ 1 open  │                   │
│               └─────────┴─────────┴─────────┘                   │
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│  ESTIMATED MARKET VALUE  $24,800     [Download PDF]  [Share]    │
│  Fair range $22.1k – $26.4k                                      │
└──────────────────────────────────────────────────────────────────┘
```

### Component breakdown

**Top trust strip**
- Slim band (12px padding), `#F8FAFC` background
- Three items separated by `·`: NMVTIS-sourced + generation date + report ID
- Right edge: small "Verified report" badge, amber border, amber lock icon

**Vehicle identity (left column, ~40%)**
- 160×160 image placeholder, `rounded-2xl`, soft inner border. Vector silhouette if no photo.
- YMM in 36px extrabold navy, line-height 1.1
- VIN row: 11px uppercase "VIN" kicker → 16px monospace navy → copy icon (toast on click)
- Body-style line: 13px slate-600

**Verdict pills grid (right column, ~60%)**
- 3×2 grid, each pill 120px tall, white background, 1px border in the status tint
- Status icon top-left in a 32px tinted circle
- 11px uppercase tracked label · 16px bold verdict · 12px slate detail
- Hover: subtle lift + border solidifies + "View details ↓" appears
- Categories: Title · Odometer · Accidents · Theft · Salvage · Recalls

**Market value + actions (full-width bottom strip)**
- Amber-tinted background `#FEF8E7` with a top hairline border
- Left: "ESTIMATED MARKET VALUE" kicker → `$24,800` in 40px extrabold amber → range line + Low/Fair/High bar
- Right: "Download PDF report" (amber solid, primary) + "Share secure link" (ghost). Both 48px tall, pill-rounded.

### Mobile variant (375px)

- Card collapses to single column
- Image shrinks to 80×80, inline with YMM
- Verdict pills: 2×3 grid (or horizontal swipe row — A/B both)
- Market value strip stays full-width; buttons stack vertically

### UX rules — non-negotiable

- **Amber discipline.** Market value number + primary CTA are the ONLY large amber elements on the entire page. Anywhere else, amber is reserved for 11px kicker labels.
- **Status legibility.** A user must scan all 6 pills in under 2 seconds and know the verdict. All pills carry equal border weight and padding — only the tint shifts.
- **VIN as evidence.** Monospace VIN signals "forensic document, not marketing page." Do not soften it.
- **No marketing language in the card.** No "Get the full picture!" No "Don't get scammed!" The card is silent except for facts. The user already paid for this.

---

## 5. Component patterns (used across all 12 sections)

### Section header pattern

```
[11px AMBER UPPERCASE KICKER]
[30px EXTRABOLD NAVY TITLE]
One-line slate-600 description that explains what's in this section.
```

### Empty / clean state

- Centered green check inside an amber-tinted 64px circle
- Bold navy headline ("No accidents reported")
- One-line slate-600 disclaimer about reporting coverage
- Card has a soft green hairline on the left edge

### Risk state

- Red icon inside a red-tinted card
- Action-oriented copy ("This vehicle has 1 open recall — contact a dealer to schedule the free repair")
- Inline button to the relevant action
- Card has a solid red 2px left border

### Pills & chips

- Always `rounded-full`
- 1.5px border in status color
- Small caps 11px label, 0.08em letter-spacing
- Height 28px (small), 36px (medium), 44px (large/standalone)

### Status cards (used in §7 theft/salvage/lien and elsewhere)

- White card, 1px slate border
- Icon top-left in tinted circle, label below
- Verdict pill bottom-left
- "Last checked [timestamp]" bottom-right in 12px slate-500

### Timeline (used in §3 title history)

- Vertical line 2px slate-200 on the left
- Each event: 12px dot in status color, date in 13px slate-600, state badge, headline, expandable source row
- Latest event always at the top

### Tables (used in §10 specs)

- Two-column layout
- Left column: label in 12px uppercase slate-500
- Right column: value in 15px navy
- Hairline divider between rows (slate-100)
- No zebra stripes

### Charts (used in §5 odometer, §11 market value)

- Navy line, amber dots at data points
- Soft slate-100 gridlines
- No legend if the chart only has one series
- Tooltip on hover: white card, soft navy shadow, slate text

---

## 6. Sticky TOC (desktop only)

- Fixed left rail, 240px wide, starts below the header card
- Lists all 12 sections
- Each row: status dot (green/amber/red/neutral) + section name in 14px medium
- Active section: navy left border, navy text
- Inactive: slate-600
- Scrolls into view smoothly when clicked
- On viewports < 1280px: collapses into a top dropdown above the report

---

## 7. Data sources & trust signals

These should be visible in three places without ever feeling repetitive:

1. **Top trust strip** (header card) — "NMVTIS-sourced data"
2. **Per-section source line** — every section ends with "Source: [NMVTIS / NICB / NHTSA / State DMV / ...]" in 12px slate-500
3. **Footer source list** — the full list of every source consulted, with logos where licensed

Trust is built by *citing every claim*, not by adding badge clusters or "100% guaranteed" copy.

---

## 8. Mockup deliverables (for Stitch / Figma)

### Per-screen
1. **Desktop 1440px** — full report scrolled view, clean record
2. **Desktop 1440px** — full report, mixed record (5 green, 1 amber for recalls)
3. **Desktop 1440px** — risky record (mixed greens, amber recall, red accident, branded title)
4. **Mobile 375px** — clean record full scroll
5. **Mobile 375px** — risky record full scroll
6. **Empty photo state** — what the vehicle image area looks like with no photo
7. **PDF export view** — the same report flattened for print/download (single column, no sticky TOC, page-break markers)

### Naming convention
`report-[device]-[record-type]-[section]` — e.g., `report-desktop-clean-header`, `report-mobile-risky-recalls`

---

## 9. Anti-patterns (do not do)

- Stock photography of cars
- Gradient mesh / glassmorphism backgrounds inside cards
- Decorative sparkles, "Premium ⭐" badges, ribbon banners
- 3D shadows, neumorphism, drop-shadow puddles
- Carfax-style red banners that dominate the viewport
- Pricing or upsell language inside the report (the user already paid)
- "Trust" theatre — fake testimonials, generic security logos with no link
- Color-coded text in body copy ("the **red flag** here is...") — let the status pills do the talking
- More than one amber element per viewport

---

## 10. Open questions for the designer

These should be resolved during mockup iteration:

1. **Vehicle image source** — pull from VinAudit, or always use silhouette? If the former, what's the fallback when the image is low-quality?
2. **Map style for ownership history** — abstract dotted US, or topographic? Resolution at mobile?
3. **PDF export aesthetic** — match the web report visually, or simplify to a print-optimized layout closer to a bank statement?
4. **Brand-by-state coverage** — when NMVTIS coverage varies by state, how do we signal "checked but limited data" vs. "fully checked"?
5. **Sticky TOC on tablet** — show or hide between 768–1280px?

---

## Reference

- VinAudit report structure: https://www.vinaudit.com/report
- Brand alignment: existing CarCheckerVIN site (navy + amber, light slate surface, Material-You token system)
- Implementation will use Tailwind classes that already exist in `src/app/globals.css` (`bg-primary`, `bg-surface`, `text-on-surface`, etc.) — designer can ignore Tailwind, but the dev side will translate hex values back to these tokens.
