"use client";

/**
 * SectionNav — the "Jump to Section" table of contents for the premium report.
 *
 * Two presentations share one item list and active-section tracker:
 *  - variant="desktop": a sticky sidebar card (placed in the report's aside col)
 *  - variant="mobile":  a collapsible <details> dropdown at the top of content
 *
 * Active tracking uses an IntersectionObserver over the section <section id="…">
 * anchors. Clicking an item smooth-scrolls to it; the sections already carry
 * `scroll-mt-24`, so the fixed site header never covers the landing target.
 */

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ListChecks, ChevronRight, ChevronDown } from "lucide-react";

export interface SectionNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  count?: number;
  alert?: boolean;
}

function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    // Track every section's current intersection ratio and pick the topmost
    // one that's meaningfully in view. The top rootMargin offset accounts for
    // the fixed header so the highlight flips as a heading reaches the nav.
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target.id, e.intersectionRatio);
        let best = "";
        let bestRatio = 0;
        for (const id of ids) {
          const r = ratios.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function CountBadge({ count, alert }: { count: number; alert?: boolean }) {
  return (
    <span
      className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums ${
        alert
          ? "bg-red-500 text-white"
          : "bg-surface-container text-on-surface-variant dark:bg-slate-800 dark:text-slate-300"
      }`}
    >
      {count}
    </span>
  );
}

export default function SectionNav({
  items,
  variant,
}: {
  items: SectionNavItem[];
  variant: "desktop" | "mobile";
}) {
  const idsRef = useRef(items.map((i) => i.id));
  const active = useActiveSection(idsRef.current);
  const listRef = useRef<HTMLUListElement>(null);

  // Keep the active entry visible inside the rail's own scroll area as the
  // reader moves through the report. Only the internal list scrolls here — the
  // page never moves — so the rail always shows where you are without yanking
  // the viewport. No-op for the mobile dropdown (listRef stays null there).
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-nav="${active}"]`);
    if (!el) return;
    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    if (top < list.scrollTop) {
      list.scrollTop = top - 8;
    } else if (bottom > list.scrollTop + list.clientHeight) {
      list.scrollTop = bottom - list.clientHeight + 8;
    }
  }, [active]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Reflect the choice in the URL without a jump (anchor already handled).
    history.replaceState(null, "", `#${id}`);
  };

  if (variant === "mobile") {
    return (
      <details className="group rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10 lg:hidden print:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-2.5 px-4 py-3.5 [&::-webkit-details-marker]:hidden">
          <ListChecks className="h-5 w-5 text-primary dark:text-primary-fixed" />
          <span className="flex-1 font-headline text-base font-bold text-on-surface dark:text-slate-100">
            Jump to Section
          </span>
          <ChevronDown className="h-5 w-5 text-on-surface-variant transition-transform group-open:rotate-180 dark:text-slate-400" />
        </summary>
        <nav className="grid grid-cols-1 gap-0.5 border-t border-outline-variant/40 px-2 py-2 dark:border-white/10 sm:grid-cols-2">
          {items.map(({ id, label, icon: Icon, count, alert }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => go(e, id)}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition ${
                active === id
                  ? "bg-primary/10 font-semibold text-primary dark:bg-primary-fixed/15 dark:text-primary-fixed"
                  : "text-on-surface-variant hover:bg-surface-container dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className={`h-4 w-4 flex-shrink-0 ${alert && count ? "text-red-500" : ""}`} />
              <span className="min-w-0 flex-1 truncate">{label}</span>
              {count !== undefined && <CountBadge count={count} alert={alert} />}
            </a>
          ))}
        </nav>
      </details>
    );
  }

  return (
    <nav className="sticky top-20 flex max-h-[calc(100dvh-6rem)] flex-col rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10">
      <div className="flex flex-shrink-0 items-center gap-2 px-2 pb-2 pt-1">
        <ListChecks className="h-5 w-5 text-on-surface dark:text-slate-100" />
        <span className="font-headline text-base font-bold text-on-surface dark:text-slate-100">
          Jump to Section
        </span>
      </div>
      <ul ref={listRef} className="slim-scroll -mr-1 space-y-0.5 overflow-y-auto pr-1">
        {items.map(({ id, label, icon: Icon, count, alert }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                data-nav={id}
                onClick={(e) => go(e, id)}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-center gap-2.5 rounded-xl px-3 py-1.5 text-sm transition ${
                  isActive
                    ? "bg-primary/10 font-semibold text-primary dark:bg-primary-fixed/15 dark:text-primary-fixed"
                    : "text-on-surface-variant hover:bg-surface-container dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <Icon
                  className={`h-4 w-4 flex-shrink-0 ${
                    alert && count ? "text-red-500" : isActive ? "" : "text-on-surface-variant dark:text-slate-400"
                  }`}
                />
                <span className="min-w-0 flex-1 truncate">{label}</span>
                {count !== undefined ? (
                  <CountBadge count={count} alert={alert} />
                ) : (
                  <ChevronRight
                    className={`h-4 w-4 flex-shrink-0 transition ${
                      isActive ? "text-primary opacity-100 dark:text-primary-fixed" : "opacity-0 group-hover:opacity-60"
                    }`}
                  />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
