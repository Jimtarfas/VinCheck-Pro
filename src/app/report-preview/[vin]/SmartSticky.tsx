"use client";

/**
 * SmartSticky — a scroll-direction-aware sticky wrapper for tall sidebar cards.
 *
 * A plain `position: sticky; top: N` pins the element's TOP, so anything below
 * the fold (here: the price + "Get full report" CTA) stays hidden while the
 * reader scrolls the long main column. This wrapper instead modulates the
 * sticky `top` with the scroll delta:
 *   - scrolling down → `top` eases toward `vh - cardHeight - bottomGap`
 *     (negative when the card is taller than the viewport) so the card's
 *     BOTTOM comes into view and pins there.
 *   - scrolling up   → `top` eases back toward `topGap`, re-pinning the TOP.
 * The card therefore never permanently hides any of its content — exactly the
 * GitHub-style "smart sticky sidebar" behaviour, dependency-free.
 *
 * Desktop-only: below `lg` the sticky behaviour is disabled (the wrapper itself
 * is typically `hidden lg:block` at the call site).
 */

import { useEffect, useRef, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";

export default function SmartSticky({
  children,
  topGap = 96,
  bottomGap = 24,
  className = "",
  // Accepted for API parity with the other report-preview components, even
  // though this wrapper has no user-visible strings of its own.
  locale: _locale = "en",
}: {
  children: ReactNode;
  topGap?: number;
  bottomGap?: number;
  className?: string;
  locale?: Locale;
}) {
  void _locale;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 1024px)");

    let lastScroll = window.scrollY;
    let cardTop = topGap;
    let raf = 0;

    const apply = () => {
      raf = 0;
      if (!mq.matches) {
        el.style.top = `${topGap}px`;
        return;
      }
      const elH = el.offsetHeight;
      const vh = window.innerHeight;
      const scroll = window.scrollY;
      const delta = scroll - lastScroll;
      lastScroll = scroll;

      if (elH <= vh - topGap - bottomGap) {
        // Fits on screen — ordinary top-pinned sticky.
        cardTop = topGap;
      } else {
        // Taller than the viewport — follow the scroll direction so the far
        // edge can always be reached.
        const minTop = vh - elH - bottomGap; // negative
        if (delta > 0) cardTop = Math.max(minTop, cardTop - delta);
        else if (delta < 0) cardTop = Math.min(topGap, cardTop - delta);
      }
      el.style.top = `${cardTop}px`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [topGap, bottomGap]);

  return (
    <div ref={ref} className={`lg:sticky ${className}`} style={{ top: topGap }}>
      {children}
    </div>
  );
}
