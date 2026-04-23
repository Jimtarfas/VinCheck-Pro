import Link from "next/link";
import { Check, X } from "lucide-react";

type ColVal = "check" | "cross" | "partial" | string;

const rows: { feature: string; us: ColVal; carfax: ColVal; autocheck: ColVal }[] = [
  { feature: "Accident History & Damage",  us: "check",   carfax: "check",   autocheck: "check" },
  { feature: "Title Records & Brands",     us: "check",   carfax: "check",   autocheck: "check" },
  { feature: "Real Vehicle Photos",        us: "check",   carfax: "partial", autocheck: "cross" },
  { feature: "Salvage Auction Photos",     us: "check",   carfax: "partial", autocheck: "cross" },
  { feature: "Market Value Analysis",      us: "check",   carfax: "partial", autocheck: "partial" },
  { feature: "Odometer Verification",      us: "check",   carfax: "check",   autocheck: "check" },
  { feature: "Theft & Recovery Records",   us: "check",   carfax: "check",   autocheck: "check" },
  { feature: "Full Equipment & Options",   us: "check",   carfax: "cross",   autocheck: "cross" },
  { feature: "Pricing (Single Report)",    us: "FREE",    carfax: "$44.99",  autocheck: "$24.99" },
];

function Cell({ val }: { val: ColVal }) {
  if (val === "check")   return <Check className="w-5 h-5 text-green-500 mx-auto" />;
  if (val === "cross")   return <X className="w-5 h-5 text-error mx-auto" />;
  if (val === "partial") return <span className="text-secondary font-bold text-sm">Partial</span>;
  return <span className="text-2xl font-headline font-black text-primary">{val}</span>;
}

export default function ComparisonSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 sm:mb-4 block">
            Market Comparison
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
            How We Stand Against the Giants
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto">
            Don&apos;t settle for less data at a higher price. We provide more insights for a fraction of the cost.
          </p>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="p-3 sm:p-6 text-left font-headline text-sm sm:text-lg text-primary font-extrabold bg-surface-container-low rounded-tl-2xl sm:rounded-tl-3xl">
                  Feature Comparison
                </th>
                {/* Our column — highlighted */}
                <th className="p-3 sm:p-6 text-center bg-primary text-white font-headline text-base sm:text-xl font-black rounded-t-2xl sm:rounded-t-3xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--color-secondary-container)" }} />
                  VINCheck Pro
                </th>
                <th className="p-3 sm:p-6 text-center font-headline text-sm sm:text-lg text-on-surface-variant font-bold">
                  Carfax
                </th>
                <th className="p-3 sm:p-6 text-center font-headline text-sm sm:text-lg text-on-surface-variant font-bold rounded-tr-2xl sm:rounded-tr-3xl">
                  AutoCheck
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} className="hover:bg-primary/3 transition-colors">
                  <td className="p-3 sm:p-5 font-semibold text-on-surface text-xs sm:text-sm bg-surface-container-low">
                    {row.feature}
                  </td>
                  <td className="p-3 sm:p-5 text-center bg-primary/5 border-x border-primary/10">
                    <Cell val={row.us} />
                  </td>
                  <td className="p-3 sm:p-5 text-center">
                    <Cell val={row.carfax} />
                  </td>
                  <td className="p-3 sm:p-5 text-center">
                    <Cell val={row.autocheck} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="p-3 sm:p-5 bg-surface-container-low rounded-bl-2xl sm:rounded-bl-3xl" />
                <td className="p-3 sm:p-5 bg-primary border-x border-b border-primary rounded-b-2xl sm:rounded-b-3xl">
                  <Link
                    href="/#hero"
                    className="block w-full py-2.5 sm:py-3 rounded-full font-bold text-center text-xs sm:text-base text-on-secondary-container hover:brightness-110 transition-all"
                    style={{ background: "var(--color-secondary-container)" }}
                  >
                    Get Started
                  </Link>
                </td>
                <td className="p-3 sm:p-5" />
                <td className="p-3 sm:p-5 rounded-br-2xl sm:rounded-br-3xl" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}
