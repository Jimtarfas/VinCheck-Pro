/**
 * Shared renderer for Wave 14 French info/marketing/legal pages.
 * Pattern parallel to _specialty-shared/SpecialtyToolPage but tuned
 * for content (hero + N text sections + optional CTA) instead of a
 * tool-landing → English-widget handoff.
 *
 * Legal pages (legalCanonical: true) get an amber disclosure banner
 * above the hero stating the English version is the canonical one —
 * matches the Wave 11 NMVTIS bilingual-disclosure pattern.
 */

import Link from "@/components/LocaleLink";
import { ArrowRight, AlertTriangle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { InfoHook } from "./strings";

export default function InfoPage({ hook }: { hook: InfoHook }) {
  const Icon = hook.icon;
  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/es" },
              { label: hook.h1 },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Icon className="w-4 h-4" />
            {hook.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl font-headline font-extrabold leading-tight mb-4">
            {hook.h1}
          </h1>

          <p className="speakable-intro text-base sm:text-lg text-white/85 max-w-3xl leading-relaxed">
            {hook.intro}
          </p>
        </div>
      </div>

      {/* Legal canonical disclosure (Wave 11 pattern) */}
      {hook.legalCanonical && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-6">
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
            <div>
              <p className="font-bold mb-1">Traduction de corteouia — version canonique en anglais</p>
              <p>
                Esta page es un resumen en français. Le documento légalement
                vinculante es la version en anglais en{" "}
                <Link href={hook.englishPath} className="underline font-semibold">
                  {hook.englishPath}
                </Link>
                . En cas de discrepancia, la version inglesa prevalece.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Content sections */}
        {hook.sections.map((section, i) => (
          <section
            key={section.heading}
            className={`py-10 sm:py-14 ${
              i < hook.sections.length - 1 ? "border-b border-outline-variant" : ""
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-5">
              {section.heading}
            </h2>
            <div className="space-y-4">
              {section.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="text-base sm:text-lg text-on-surface-variant leading-relaxed whitespace-pre-line"
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* Optional CTA */}
        {hook.cta && (
          <section className="py-14 sm:py-20 text-center border-t border-outline-variant">
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              {hook.cta.heading}
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              {hook.cta.body}
            </p>
            <Link
              href={hook.cta.buttonHref}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/20 hover:bg-primary-700 transition"
            >
              {hook.cta.buttonLabel} <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        )}
      </div>
    </article>
  );
}
