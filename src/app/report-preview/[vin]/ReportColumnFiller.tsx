"use client";

/**
 * ReportColumnFiller — desktop-only gap filler for the report preview.
 *
 * The report body is a `lg:grid-cols-3` grid: a 2-col main column and a fixed,
 * always-tall marketing sidebar (bundle card + valuation + paywall + summary +
 * FAQ). CSS grid stretches both columns to the same height, so when a vehicle
 * has little data the main column's content ends well short of the bottom and
 * leaves a large blank area (the thing this fixes).
 *
 * This component is rendered as the LAST child of the main column. It measures
 * each column's *natural* content height — last real child's bottom minus the
 * column's top — which is immune to the grid's stretching (children stay pinned
 * to the top; stretching only adds empty space below). When the main column is
 * meaningfully shorter than the sidebar, it sizes itself to exactly that gap and
 * reveals a polished filler panel, so the two columns end together. When there's
 * no real gap (data-rich reports) it stays hidden. Mobile (<lg) is untouched.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";

// Below this many pixels a gap isn't worth filling — the panel would look
// cramped, and a small ragged bottom edge is unnoticeable.
const MIN_GAP = 160;
// space-y-6 between the main column's children = 1.5rem; subtract it so the
// panel's bottom lines up with the column bottom instead of overshooting.
const STACK_GAP = 24;

export default function ReportColumnFiller({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const filler = ref.current;
    const col = filler?.parentElement;
    if (!filler || !col) return;

    const measure = () => {
      const sidebar = col.nextElementSibling as HTMLElement | null;
      if (!sidebar || window.innerWidth < 1024) {
        filler.style.height = "";
        setShow(false);
        return;
      }

      const naturalBottom = (el: HTMLElement, exclude?: Element) => {
        const kids = Array.from(el.children).filter(
          (c) => c !== exclude && (c as HTMLElement).getBoundingClientRect().height > 0
        );
        if (kids.length === 0) return el.getBoundingClientRect().top;
        return kids[kids.length - 1].getBoundingClientRect().bottom;
      };

      const colTop = col.getBoundingClientRect().top;
      const sideTop = sidebar.getBoundingClientRect().top;
      // Exclude the filler itself from the main column so its own height never
      // feeds back into the measurement (which would create a loop).
      const mainContentH = naturalBottom(col, filler) - colTop;
      const sideContentH = naturalBottom(sidebar) - sideTop;

      const target = Math.round(sideContentH - mainContentH - STACK_GAP);
      if (target >= MIN_GAP) {
        const h = `${target}px`;
        if (filler.style.height !== h) filler.style.height = h;
        setShow(true);
      } else {
        filler.style.height = "";
        setShow(false);
      }
    };

    measure();
    const ro = new ResizeObserver(() => requestAnimationFrame(measure));
    ro.observe(col);
    const sidebar = col.nextElementSibling;
    if (sidebar) ro.observe(sidebar);
    window.addEventListener("resize", measure);
    // Late layout shifts (web fonts, lazy images) can change column heights
    // after first paint — re-measure once things settle.
    const t = window.setTimeout(measure, 600);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden={!show}
      className={`${show ? "lg:flex" : "lg:hidden"} hidden flex-col overflow-hidden`}
    >
      {children}
    </div>
  );
}
