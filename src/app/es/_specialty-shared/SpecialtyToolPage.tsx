/**
 * Shared renderer for the 8 Spanish specialty-tool landing pages.
 * Mirrors the visual structure of /es/paint-code-lookup (Wave 1):
 * hero → "what you decode" → "why this matters" → CTA to the English
 * interactive tool.
 *
 * The interactive widget (search form + result rendering) lives on the
 * English page. After the Spanish-speaking buyer has read the value
 * prop in their own language, the CTA hands off to the English tool.
 * This is the same pattern Wave 1 used for /es/buscar-por-placa and it
 * lets us ship complete Spanish landing pages without the component
 * refactor a full Spanish form would require.
 */

import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, BadgeCheck } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { SpecialtyHook } from "./strings";

export default function SpecialtyToolPage({ hook }: { hook: SpecialtyHook }) {
  const Icon = hook.icon;
  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/es" },
              { label: hook.h1.replace(/ — .*/, "") },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Icon className="w-4 h-4" />
            {hook.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {hook.h1}
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {hook.intro}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={hook.englishPath}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-primary font-bold text-base shadow-lg hover:bg-white/95 transition"
            >
              Ejecuta la búsqueda <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/es/revision-vin"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/30 text-white font-bold text-base hover:bg-white/10 transition"
            >
              Revisión VIN general
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* What you decode */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-6">
            Qué obtienes
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hook.whatYouGet.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 bg-surface-container-low rounded-xl p-4"
              >
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Why it matters */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-6">
            Por qué importa antes de comprar
          </h2>
          <ul className="space-y-3">
            {hook.whyItMatters.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 bg-surface-container-lowest border border-outline-variant rounded-xl p-4"
              >
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Trust note */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            Fuentes y cobertura
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            {hook.trustNote}
          </p>
          <p className="mt-4 text-xs sm:text-sm text-on-surface-variant italic">
            Los datos VIN se cruzan contra NMVTIS, NHTSA, NICB y bases de datos
            del fabricante en el momento de cada búsqueda.
          </p>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <BadgeCheck className="w-3.5 h-3.5" />
            Gratis · Al instante · Sin registro
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            Ejecuta la búsqueda ahora
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            La herramienta interactiva está en inglés; los resultados son
            universales. Toma menos de 60 segundos.
          </p>
          <Link
            href={hook.englishPath}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/20 hover:bg-primary-700 transition"
          >
            Abrir herramienta <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </article>
  );
}
