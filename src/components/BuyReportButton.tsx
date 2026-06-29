"use client";

import { scrollToBundle } from "@/lib/scroll-to-bundle";
import type { Locale } from "@/i18n/config";

/**
 * Preview-only "Get full report" button. Instead of navigating to /order or
 * opening a popup, it smooth-scrolls the reader down to the in-page "Buy more,
 * pay less" bundle checkout card. Styling is fully controlled by the caller via
 * `className` so it can stand in for any of the buy CTAs.
 *
 * Accepts a `locale` prop for API parity with the other report-preview
 * components, even though this button's visible label is supplied by the
 * caller via `children`. Callers translate their own label.
 */
export default function BuyReportButton({
  className,
  children,
  ariaLabel,
  locale: _locale = "en",
}: {
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  locale?: Locale;
}) {
  void _locale;
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={scrollToBundle}
      className={className}
    >
      {children}
    </button>
  );
}
