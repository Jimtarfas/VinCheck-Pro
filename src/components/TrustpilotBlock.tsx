import { ExternalLink } from "lucide-react";

/**
 * Trustpilot-branded trust block. Pure static HTML — no widget, no iframe,
 * no JS — so AI crawlers (ChatGPT, Perplexity, Google AI Overviews) and
 * the structured-data validator can read every word of it. Visually it
 * mimics Trustpilot's "TrustBox" mini layout: 5 brand-green star tiles,
 * "Excellent" label, wordmark, deep-link to the verified profile.
 *
 * Why no rating number / no review count:
 * - Our profile is still building review volume (3 verified 5★ reviews).
 * - Hard-coding "4.9 / 50,000 reviews" was the exact issue that triggered
 *   AI overviews to flag the site as "use with caution" — and Google
 *   Rich Results to mark the aggregateRating as unverifiable. Stars +
 *   "Excellent" + a real click-through link give the same social-proof
 *   read without a number we can't substantiate. (See commit f8eae79.)
 *
 * `variant="wide"`     → full-width banner; for dedicated review pages.
 * `variant="compact"`  → centered pill; for homepage / above-the-fold use.
 */
const TRUSTPILOT_PROFILE =
  "https://www.trustpilot.com/review/www.carcheckervin.com";

const BRAND_GREEN = "#00B67A";

function GreenStarTile() {
  // Inlined SVG (not lucide) so the star matches Trustpilot's exact 5-point
  // geometry — the recognisable shape is half the trust signal.
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-[3px] flex-shrink-0"
      style={{ backgroundColor: BRAND_GREEN }}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 sm:w-5 sm:h-5 fill-white"
      >
        <path d="M12 2l2.95 6.97L22 9.97l-5.5 4.85L18.18 22 12 18.27 5.82 22l1.68-7.18L2 9.97l7.05-1z" />
      </svg>
    </span>
  );
}

function TrustpilotWordmark() {
  // Wordmark drawn as text — Trustpilot doesn't permit hot-linking their
  // brand SVG, and bundling it raises a usage-rights flag. The Inter-extrabold
  // approximation reads as "Trustpilot brand" to a glancing eye without
  // copying the trademarked custom letterforms.
  return (
    <span className="inline-flex items-center gap-1.5 font-extrabold tracking-tight text-[15px] sm:text-base text-on-surface">
      <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" aria-hidden="true">
        <path
          d="M12 2l2.95 6.97L22 9.97l-5.5 4.85L18.18 22 12 18.27 5.82 22l1.68-7.18L2 9.97l7.05-1z"
          fill={BRAND_GREEN}
        />
      </svg>
      Trustpilot
    </span>
  );
}

export default function TrustpilotBlock({
  variant = "wide",
}: {
  variant?: "wide" | "compact";
}) {
  const stars = (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <GreenStarTile key={i} />
      ))}
    </div>
  );

  if (variant === "compact") {
    return (
      <a
        href={TRUSTPILOT_PROFILE}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="See CarCheckerVIN reviews on Trustpilot (opens in a new tab)"
        className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-5 py-3 rounded-full bg-surface-container-lowest border border-outline-variant/30 hover:border-[#00B67A] hover:shadow-sm transition-all"
      >
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND_GREEN }}>
          Excellent
        </span>
        {stars}
        <span className="text-xs text-on-surface-variant">
          on <TrustpilotWordmark />
        </span>
      </a>
    );
  }

  // Wide variant — TrustBox-style horizontal card.
  return (
    <a
      href={TRUSTPILOT_PROFILE}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="See CarCheckerVIN reviews on Trustpilot (opens in a new tab)"
      className="group block rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5 sm:p-6 hover:border-[#00B67A] hover:shadow-md transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-3">
            <span
              className="text-sm font-extrabold uppercase tracking-wide"
              style={{ color: BRAND_GREEN }}
            >
              Excellent
            </span>
            <span className="text-xs text-on-surface-variant">· Verified reviews</span>
          </div>
          {stars}
          <p className="mt-3 text-sm text-on-surface-variant">
            See every verified CarCheckerVIN review on <TrustpilotWordmark />
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold whitespace-nowrap group-hover:gap-2.5 transition-all" style={{ color: BRAND_GREEN }}>
          Read reviews
          <ExternalLink className="w-4 h-4" />
        </span>
      </div>
    </a>
  );
}
