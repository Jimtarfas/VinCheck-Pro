/**
 * Shared <StatePage /> component for the Big-5 French state pages.
 * Renders the entire body — hero, why-different bullets, what's
 * included grid, sources panel, bottom CTA — from a sansgle STATE_HOOKS_ES
 * entry plus the global `state.*` dictionary chrome.
 *
 * Each /fr/<state>-revision-vin/page.tsx becomois a thin wrapper that just
 * imports a hook and renders <StatePage hook={...} />. Keeps the five
 * page files identical and consistent.
 */

import { MapPin, BadgeCheck } from "lucide-react";
import { t } from "@/i18n";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import type { StateHook } from "./strings";
import { REPORT_ITEMS_ES } from "./strings";

const LOCALE = "fr" as const;

export default function StatePage({ hook }: { hook: StateHook }) {
  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/es" },
              { label: `Vérification VIN de ${hook.stateNameEs}` },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <MapPin className="w-4 h-4" />
            {hook.stateNameEs} ({hook.abbr}) &nbsp;·&nbsp; {hook.badgeAuthority}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {hook.h1Lead}{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>
              {hook.h1Accent}
            </span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {hook.intro}
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              {t(LOCALE, "state.searchHeading")}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
              {t(LOCALE, "state.searchSub")}
            </p>
            <VinSearchForm size="lg" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Why this state */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {t(LOCALE, "state.sectionWhy")}
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>{hook.whyP1}</p>
            <p>{hook.whyStats}</p>
            <ul className="space-y-3 list-none pl-0">
              {hook.whyBullets.map((item) => (
                <li
                  key={item.point}
                  className="flex gap-3 items-start bg-surface-container-low rounded-xl p-4"
                >
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <span>
                    <strong className="text-on-surface">{item.point}:</strong>{" "}
                    {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What's included */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {t(LOCALE, "state.sectionWhatIncluded")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {REPORT_ITEMS_ES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Sources */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {t(LOCALE, "state.sectionSources")}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-6">
            {hook.sources.map((s) => (
              <li
                key={s.href}
                className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
              >
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-primary font-bold underline underline-offset-2"
                >
                  {s.label} ↗
                </a>
                <p className="mt-1.5 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {s.note}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-on-surface-variant italic">
            {hook.sourcesFootnote}
          </p>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <BadgeCheck className="w-3.5 h-3.5" />
            {t(LOCALE, "state.badgeFree")}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            {t(LOCALE, "state.sectionCta")}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            {t(LOCALE, "state.sectionCtaSub")}
          </p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" />
          </div>
        </section>
      </div>
    </article>
  );
}
