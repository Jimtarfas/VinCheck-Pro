import Link from "next/link";
import { Check, X, Trophy, ArrowRight, Sparkles } from "lucide-react";

type ColVal = "check" | "cross" | "partial" | string;

// Per-report price — kept in sync with the pricing section and Stripe checkout,
// which read the same env var (defaults to 999 ¢ = $9.99).
const PRICE_CENTS = Number(process.env.NEXT_PUBLIC_REPORT_PRICE_CENTS || "999");
const PER_REPORT = PRICE_CENTS / 100;
const money = (n: number) => `$${n.toFixed(2)}`;

const rows: { feature: string; us: ColVal; carfax: ColVal; autocheck: ColVal }[] = [
  { feature: "Accident History & Damage",  us: "check",          carfax: "check",   autocheck: "check" },
  { feature: "Title Records & Brands",     us: "check",          carfax: "check",   autocheck: "check" },
  { feature: "Real Vehicle Photos",        us: "check",          carfax: "partial", autocheck: "cross" },
  { feature: "Salvage Auction Photos",     us: "check",          carfax: "partial", autocheck: "cross" },
  { feature: "Market Value Analysis",      us: "check",          carfax: "partial", autocheck: "partial" },
  { feature: "Odometer Verification",      us: "check",          carfax: "check",   autocheck: "check" },
  { feature: "Theft & Recovery Records",   us: "check",          carfax: "check",   autocheck: "check" },
  { feature: "Full Equipment & Options",   us: "check",          carfax: "cross",   autocheck: "cross" },
  { feature: "Free Preview (No Card)",     us: "check",          carfax: "cross",   autocheck: "cross" },
  { feature: "Pricing (Single Report)",    us: money(PER_REPORT), carfax: "$44.99", autocheck: "$24.99" },
];

function Cell({ val, highlight = false }: { val: ColVal; highlight?: boolean }) {
  if (val === "check") {
    return (
      <Check
        className={`w-5 h-5 mx-auto ${highlight ? "text-white" : "text-green-500"}`}
        strokeWidth={3}
      />
    );
  }
  if (val === "cross") {
    return <X className="w-5 h-5 text-error/70 mx-auto" strokeWidth={2.5} />;
  }
  if (val === "partial") {
    return (
      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-bold text-[11px] sm:text-xs uppercase tracking-wide">
        Partial
      </span>
    );
  }
  // Custom string (pricing)
  if (highlight) {
    return (
      <span className="text-xl sm:text-2xl price font-extrabold text-white drop-shadow-sm">
        {val}
      </span>
    );
  }
  return (
    <span className="text-base sm:text-lg price font-bold text-on-surface-variant">
      {val}
    </span>
  );
}

export default function ComparisonSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Market Comparison
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
            How We Stand Against the Giants
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto">
            Don&apos;t settle for less data at a higher price. We deliver more insights for a fraction of the cost.
          </p>
        </div>

        {/* Comparison card */}
        <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="p-4 sm:p-6 text-left font-headline text-sm sm:text-base text-primary font-extrabold align-bottom">
                    Feature Comparison
                  </th>
                  {/* Our column — highlighted with badge */}
                  <th className="p-0 align-bottom">
                    <div className="relative bg-primary text-white px-3 sm:px-6 pt-7 sm:pt-9 pb-4 sm:pb-5 mx-1.5 sm:mx-2 rounded-t-2xl">
                      {/* BEST VALUE badge */}
                      <div
                        className="absolute -top-0.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider whitespace-nowrap text-on-secondary-container shadow-md"
                        style={{ background: "var(--color-secondary-container)" }}
                      >
                        Best Value
                      </div>
                      <div className="flex items-center justify-center gap-1.5 font-headline text-base sm:text-xl font-black">
                        <Trophy className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "var(--color-secondary-container)" }} />
                        CarCheckerVIN
                      </div>
                    </div>
                  </th>
                  <th className="p-4 sm:p-6 text-center font-headline text-sm sm:text-base text-on-surface-variant font-bold align-bottom">
                    Carfax
                  </th>
                  <th className="p-4 sm:p-6 text-center font-headline text-sm sm:text-base text-on-surface-variant font-bold align-bottom">
                    AutoCheck
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => {
                  const isLast = idx === rows.length - 1;
                  return (
                    <tr
                      key={row.feature}
                      className={`border-t border-outline-variant/60 ${isLast ? "bg-primary/[0.02]" : ""}`}
                    >
                      <td
                        className={`p-3 sm:p-5 text-xs sm:text-sm bg-surface-container-low ${
                          isLast ? "font-headline font-extrabold text-primary text-sm sm:text-base" : "font-semibold text-on-surface"
                        }`}
                      >
                        {row.feature}
                      </td>
                      <td className="p-0 text-center">
                        <div
                          className={`mx-1.5 sm:mx-2 py-3 sm:py-4 bg-primary border-x border-primary ${
                            isLast ? "rounded-b-2xl" : ""
                          }`}
                        >
                          <Cell val={row.us} highlight />
                        </div>
                      </td>
                      <td className="p-3 sm:p-5 text-center">
                        <Cell val={row.carfax} />
                      </td>
                      <td className="p-3 sm:p-5 text-center">
                        <Cell val={row.autocheck} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA card below the table — gives the button real breathing room */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center sm:text-left">
          <p className="text-sm sm:text-base text-on-surface-variant max-w-md">
            Get the same insights the giants charge $25–$45 for —{" "}
            <span className="font-bold text-primary">just {money(PER_REPORT)} per report</span>. Start
            with a free preview, no credit card required.
          </p>
          <Link
            href="/#hero"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base text-on-secondary-container hover:brightness-110 hover:shadow-lg active:scale-[0.98] transition-all whitespace-nowrap shadow-md"
            style={{ background: "var(--color-secondary-container)" }}
          >
            Run Free VIN Check
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
