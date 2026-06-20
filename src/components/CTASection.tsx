import Link from "next/link";
import VinSearchForm from "./VinSearchForm";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    headlineLine1: "Ready to discover",
    headlineLine2: "the truth?",
    sub: "Don't leave your investment to chance. Join the buyers making smarter decisions with CarCheckerVIN.",
    badgeNmvtis: "NMVTIS Federal Data",
    badgeSpeed: "Under 60 Seconds",
    badgeLaunch: "Free During Launch",
    sampleLink: "View sample report →",
  },
  es: {
    headlineLine1: "¿Listo para descubrir",
    headlineLine2: "la verdad?",
    sub: "No dejes tu inversión al azar. Únete a los compradores que toman decisiones más inteligentes con CarCheckerVIN.",
    badgeNmvtis: "Datos federales NMVTIS",
    badgeSpeed: "Menos de 60 segundos",
    badgeLaunch: "Gratis durante el lanzamiento",
    sampleLink: "Ver reporte de muestra →",
  },
} as const;

export default function CTASection({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-surface">
      <div className="max-w-7xl mx-auto bg-primary-container rounded-3xl sm:rounded-[3rem] p-6 sm:p-12 lg:p-20 relative overflow-hidden shadow-2xl shadow-primary/20">

        {/* Background blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-40 pointer-events-none"
          style={{ background: "radial-gradient(circle, #0d47a1 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #ff9800 0%, transparent 70%)", filter: "blur(60px)" }} />

        <div className="relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-headline font-extrabold text-white mb-4 sm:mb-6 leading-tight tracking-tighter">
            {copy.headlineLine1}<br />{copy.headlineLine2}
          </h2>
          <p className="text-base sm:text-xl text-white/85 max-w-2xl mx-auto mb-8 sm:mb-12">
            {copy.sub}
          </p>

          <div className="flex flex-col items-center gap-5">
            <div className="w-full max-w-2xl">
              <VinSearchForm size="lg" onDark locale={locale} />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-sm font-semibold text-white/85 uppercase tracking-widest mt-4">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {copy.badgeNmvtis}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim" />
                {copy.badgeSpeed}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim" />
                {copy.badgeLaunch}
              </span>
            </div>

            <Link
              href="/full-report/1C4RJEAG0JC168184"
              className="text-sm text-white/85 hover:text-white transition-colors underline underline-offset-2"
            >
              {copy.sampleLink}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
