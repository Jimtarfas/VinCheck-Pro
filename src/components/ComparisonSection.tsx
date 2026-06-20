import Link from "next/link";
import { Check, X, Trophy, ArrowRight, Sparkles } from "lucide-react";
import type { Locale } from "@/i18n/config";

type ColVal = "check" | "cross" | "partial" | string;

// Per-report price — kept in sync with the pricing section and Stripe checkout,
// which read the same env var (defaults to 999 ¢ = $9.99).
const PRICE_CENTS = Number(process.env.NEXT_PUBLIC_REPORT_PRICE_CENTS || "999");
const PER_REPORT = PRICE_CENTS / 100;
const money = (n: number) => `$${n.toFixed(2)}`;

const COPY = {
  en: {
    eyebrow: "Market Comparison",
    heading: "How We Stand Against the Giants",
    sub: "Don't settle for less data at a higher price. We deliver more insights for a fraction of the cost.",
    tableHeader: "Feature Comparison",
    bestValue: "Best Value",
    partial: "Partial",
    features: [
      "Accident History & Damage",
      "Title Records & Brands",
      "Real Vehicle Photos",
      "Salvage Auction Photos",
      "Market Value Analysis",
      "Odometer Verification",
      "Theft & Recovery Records",
      "Full Equipment & Options",
      "Free Preview (No Card)",
      "Pricing (Single Report)",
    ],
    ctaPrefix: "Get the same insights the giants charge $25–$45 for —",
    ctaPriceTemplate: "just {price} per report",
    ctaSuffix: ". Start with a free preview, no credit card required.",
    ctaButton: "Run Free VIN Check",
  },
  es: {
    eyebrow: "Comparativa del mercado",
    heading: "Cómo nos comparamos con los gigantes",
    sub: "No te conformes con menos datos a un precio más alto. Ofrecemos más información por una fracción del costo.",
    tableHeader: "Comparativa de funciones",
    bestValue: "Mejor valor",
    partial: "Parcial",
    features: [
      "Historial de accidentes y daños",
      "Registros de título y marcas",
      "Fotos reales del vehículo",
      "Fotos de subastas de salvamento",
      "Análisis de valor de mercado",
      "Verificación de odómetro",
      "Registros de robo y recuperación",
      "Equipamiento y opciones completos",
      "Vista previa gratis (sin tarjeta)",
      "Precio (reporte individual)",
    ],
    ctaPrefix: "Obtén la misma información que los gigantes cobran $25–$45 —",
    ctaPriceTemplate: "solo {price} por reporte",
    ctaSuffix: ". Empieza con una vista previa gratis, sin tarjeta de crédito.",
    ctaButton: "Revisión VIN gratis",
  },
} as const;

export default function ComparisonSection({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const rows: { feature: string; us: ColVal; carfax: ColVal; autocheck: ColVal }[] = [
    { feature: copy.features[0], us: "check",          carfax: "check",   autocheck: "check" },
    { feature: copy.features[1], us: "check",          carfax: "check",   autocheck: "check" },
    { feature: copy.features[2], us: "check",          carfax: "partial", autocheck: "cross" },
    { feature: copy.features[3], us: "check",          carfax: "partial", autocheck: "cross" },
    { feature: copy.features[4], us: "check",          carfax: "partial", autocheck: "partial" },
    { feature: copy.features[5], us: "check",          carfax: "check",   autocheck: "check" },
    { feature: copy.features[6], us: "check",          carfax: "check",   autocheck: "check" },
    { feature: copy.features[7], us: "check",          carfax: "cross",   autocheck: "cross" },
    { feature: copy.features[8], us: "check",          carfax: "cross",   autocheck: "cross" },
    { feature: copy.features[9], us: money(PER_REPORT), carfax: "$44.99", autocheck: "$24.99" },
  ];

  const Cell = ({ val, highlight = false }: { val: ColVal; highlight?: boolean }) => {
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
          {copy.partial}
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
  };

  const ctaPriceText = copy.ctaPriceTemplate.replace("{price}", money(PER_REPORT));

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {copy.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
            {copy.heading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto">
            {copy.sub}
          </p>
        </div>

        {/* Comparison card */}
        <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="p-4 sm:p-6 text-left font-headline text-sm sm:text-base text-primary font-extrabold align-bottom">
                    {copy.tableHeader}
                  </th>
                  {/* Our column — highlighted with badge */}
                  <th className="p-0 align-bottom">
                    <div className="relative bg-primary text-white px-3 sm:px-6 pt-7 sm:pt-9 pb-4 sm:pb-5 mx-1.5 sm:mx-2 rounded-t-2xl">
                      {/* BEST VALUE badge */}
                      <div
                        className="absolute -top-0.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider whitespace-nowrap text-on-secondary-container shadow-md"
                        style={{ background: "var(--color-secondary-container)" }}
                      >
                        {copy.bestValue}
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
            {copy.ctaPrefix}{" "}
            <span className="font-bold text-primary">{ctaPriceText}</span>{copy.ctaSuffix}
          </p>
          <Link
            href={locale === "es" ? "/es#hero" : "/#hero"}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base text-on-secondary-container hover:brightness-110 hover:shadow-lg active:scale-[0.98] transition-all whitespace-nowrap shadow-md"
            style={{ background: "var(--color-secondary-container)" }}
          >
            {copy.ctaButton}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
