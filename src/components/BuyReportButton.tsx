"use client";

/**
 * Preview-only "Get full report" button. Instead of navigating to /order, it
 * opens the in-page checkout popup (UpsellModal inside VinReport) by dispatching
 * a window event the report listens for. Styling is fully controlled by the
 * caller via `className` so it can stand in for any of the buy CTAs.
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
      onClick={() => window.dispatchEvent(new Event("carchecker:open-upsell"))}
      className={className}
    >
      {children}
    </button>
  );
}
