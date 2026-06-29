"use client";

/**
 * StickyBuyBar — the fixed bottom "Get full report" CTA shown on mobile.
 *
 * It hides itself once an in-page checkout block is on screen, so the floating
 * bar never sits on top of (and duplicate) the "Buy more, pay less" bundle
 * card, which has its own order buttons. The page marks each such block with
 * `data-buybar-hide`; an IntersectionObserver watches them and fades the bar
 * out while any is visible, fading it back in once they scroll away.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";

export default function StickyBuyBar({
  children,
  className = "",
  // Accepted for API parity with the other report-preview components, even
  // though this wrapper has no user-visible strings of its own. The page
  // wrapper forwards `locale` to every child for consistency.
  locale: _locale = "en",
}: {
  children: ReactNode;
  className?: string;
  locale?: Locale;
}) {
  void _locale;
  const [hidden, setHidden] = useState(false);
  const visibleCount = useRef(0);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-buybar-hide]")
    );
    if (targets.length === 0) return;

    visibleCount.current = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleCount.current += entry.isIntersecting ? 1 : -1;
        }
        // Clamp so rapid enter/leave events can't drift the counter.
        if (visibleCount.current < 0) visibleCount.current = 0;
        setHidden(visibleCount.current > 0);
      },
      // Fire as soon as any sliver of the checkout block enters the viewport.
      { rootMargin: "0px 0px -40px 0px", threshold: 0 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`${className} transition-all duration-300 ${
        hidden
          ? "pointer-events-none translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      aria-hidden={hidden}
    >
      {children}
    </div>
  );
}
