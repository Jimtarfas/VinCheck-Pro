"use client";

import { scrollToBundle } from "@/lib/scroll-to-bundle";

/**
 * Preview-only "Get full report" button. Instead of navigating to /order or
 * opening a popup, it smooth-scrolls the reader down to the in-page "Buy more,
 * pay less" bundle checkout card. Styling is fully controlled by the caller via
 * `className` so it can stand in for any of the buy CTAs.
 */
export default function BuyReportButton({
  className,
  children,
  ariaLabel,
}: {
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
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
