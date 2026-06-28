/**
 * Shared body for /vin-check/type/[type] and /es/vin-check/type/[type].
 * Wave 18 batch 4 — full English layout in both locales via COPY={en,es}
 * plus per-slug ES content overrides.
 */

import Link from "@/components/LocaleLink";
import {
  Search,
  Lock,
  ChevronRight,
  ArrowRight,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import VinSearchForm from "@/components/VinSearchForm";
import {
  type VinCheckTypePage,
  relatedVinCheckTypePages,
} from "@/lib/vin-check-type-pages";
import {
  vinCheckTypePageEs,
  vinCheckTypeBadgeEs,
} from "@/lib/vin-check-type-pages-es";
import type { Locale } from "@/i18n/config";

const CHROME = {
  en: {
    home: "Home",
    crumbVinCheck: "VIN Check",
    crumbByType: "By Vehicle Type",
    formNote: "Free · instant · no signup · NMVTIS & NHTSA data",
    quickAnswerLabel: "Quick answer",
    h2Reveals: "What this check reveals",
    h2MidCta: "Run a free VIN check now",
    midCtaBody:
      "Enter a 17-character VIN or U.S. license plate to get the full report — title brands, theft records, accidents, recalls and more.",
    h2Faq: "Frequently Asked Questions",
    h2Related: "Related checks & lookups",
    relatedIntro:
      "Go deeper with a dedicated check, or check another vehicle type.",
    upsellHeading: "Get your full vehicle history report",
    upsellBody:
      "A quick check confirms the basics. A full report adds accidents, title brands, odometer fraud, theft records and open recalls — sourced from NMVTIS and every state DMV.",
    upsellCta: "Get Your Free Report",
    upsellNote: "NMVTIS-sourced · DPPA compliant",
    bottomBadge: "Free · Instant · No signup",
    bottomHeading: "Check any VIN",
    bottomBody:
      "Enter a 17-character VIN or U.S. license plate to run a free check and pull the full report.",
  },
  es: {
    home: "Inicio",
    crumbVinCheck: "Verificación VIN",
    crumbByType: "Por tipo de vehículo",
    formNote: "Gratis · instantáneo · sin registro · datos de NMVTIS y NHTSA",
    quickAnswerLabel: "Respuesta rápida",
    h2Reveals: "Qué revela esta verificación",
    h2MidCta: "Haz una verificación VIN gratis ahora",
    midCtaBody:
      "Ingresa un VIN de 17 caracteres o una placa de EE. UU. para obtener el reporte completo — marcas de título, registros de robo, accidentes, retiros y más.",
    h2Faq: "Preguntas frecuentes",
    h2Related: "Verificaciones y búsquedas relacionadas",
    relatedIntro:
      "Profundiza con una verificación dedicada o verifica otro tipo de vehículo.",
    upsellHeading: "Obtén tu reporte completo de historial del vehículo",
    upsellBody:
      "Una verificación rápida confirma lo básico. Un reporte completo añade accidentes, marcas de título, fraude de odómetro, registros de robo y retiros abiertos — proveniente de NMVTIS y cada DMV estatal.",
    upsellCta: "Obtén tu reporte gratis",
    upsellNote: "Datos de NMVTIS · cumple con DPPA",
    bottomBadge: "Gratis · Instantáneo · Sin registro",
    bottomHeading: "Verifica cualquier VIN",
    bottomBody:
      "Ingresa un VIN de 17 caracteres o una placa de EE. UU. para hacer una verificación gratis y obtener el reporte completo.",
  },
  fr: {
    home: "Accueil",
    crumbVinCheck: "V\u00e9rification VIN",
    crumbByType: "Par type de v\u00e9hicule",
    formNote: "Gratuit \u00b7 instantan\u00e9 \u00b7 sans inscription \u00b7 donn\u00e9es NMVTIS et NHTSA",
    quickAnswerLabel: "R\u00e9ponse rapide",
    h2Reveals: "Ce que cette v\u00e9rification r\u00e9v\u00e8le",
    h2MidCta: "Lance une v\u00e9rification VIN gratuite maintenant",
    midCtaBody:
      "Saisis un VIN de 17 caract\u00e8res ou une plaque am\u00e9ricaine pour obtenir le rapport complet \u2014 marques de titre, dossiers de vol, accidents, rappels et plus.",
    h2Faq: "Questions fr\u00e9quentes",
    h2Related: "V\u00e9rifications et recherches associ\u00e9es",
    relatedIntro:
      "Va plus loin avec une v\u00e9rification d\u00e9di\u00e9e, ou v\u00e9rifie un autre type de v\u00e9hicule.",
    upsellHeading: "Obtiens ton rapport complet d'historique du v\u00e9hicule",
    upsellBody:
      "Une v\u00e9rification rapide confirme les bases. Un rapport complet ajoute les accidents, les marques de titre, la fraude \u00e0 l'odom\u00e8tre, les dossiers de vol et les rappels ouverts \u2014 issus de NMVTIS et de chaque DMV \u00e9tatique.",
    upsellCta: "Obtiens ton rapport gratuit",
    upsellNote: "Donn\u00e9es NMVTIS \u00b7 conforme DPPA",
    bottomBadge: "Gratuit \u00b7 Instantan\u00e9 \u00b7 Sans inscription",
    bottomHeading: "V\u00e9rifie n'importe quel VIN",
    bottomBody:
      "Saisis un VIN de 17 caract\u00e8res ou une plaque am\u00e9ricaine pour lancer une v\u00e9rification gratuite et obtenir le rapport complet.",
  },
} as const;

interface Props {
  page: VinCheckTypePage;
  locale: Locale;
}

export default function VinCheckTypeBody({ page, locale }: Props) {
  const chrome = CHROME[locale];
  const siblings = relatedVinCheckTypePages(page.relatedSlugs);
  const link = (en: string) => (locale === "en" ? en : `/${locale}${en}`);

  // For ES locale, swap content from the ES dictionary keyed by slug.
  const esOverride =
    locale === "es" ? vinCheckTypePageEs(page.slug) : undefined;
  const content = esOverride ?? page;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: chrome.home, href: locale === "en" ? "/" : `/${locale}` },
              { label: chrome.crumbVinCheck, href: link("/vin-check") },
              { label: chrome.crumbByType, href: link("/vin-check/type") },
              { label: content.badge },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Search className="w-4 h-4" /> {content.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {content.h1}{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>
              {content.h1Accent}
            </span>
          </h1>

          <p className="speakable-intro page-description text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {content.intro}
          </p>

          <VinSearchForm size="lg" onDark withPlateToggle />
          <p className="mt-4 text-[11px] text-white/60 flex items-center gap-1.5">
            <Lock className="w-3 h-3" /> {chrome.formNote}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> {chrome.quickAnswerLabel}
            </div>
            <p className="speakable-answer text-base sm:text-lg text-on-surface leading-relaxed">
              {content.quickAnswer}
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-7">
            {chrome.h2Reveals}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.reveals.map((c) => (
              <div
                key={c.title}
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface p-5"
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-on-surface mb-1">
                    {c.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {content.table && (
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              {content.table.caption}
            </h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left">
                    <th className="border-b border-outline-variant py-2.5 pr-4 font-bold text-on-surface">
                      {content.table.head[0]}
                    </th>
                    <th className="border-b border-outline-variant py-2.5 font-bold text-on-surface">
                      {content.table.head[1]}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content.table.rows.map(([a, b]) => (
                    <tr key={a}>
                      <td className="border-b border-outline-variant/60 py-2.5 pr-4 font-semibold text-primary align-top">
                        {a}
                      </td>
                      <td className="border-b border-outline-variant/60 py-2.5 text-on-surface-variant">
                        {b}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <div className="rounded-3xl bg-primary p-7 sm:p-10">
            <div className="text-center mb-6">
              <Search className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                {chrome.h2MidCta}
              </h2>
              <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto">
                {chrome.midCtaBody}
              </p>
            </div>
            <div className="flex justify-center">
              <VinSearchForm size="lg" onDark withPlateToggle />
            </div>
          </div>
        </section>

        {content.sections.map((s) => (
          <section
            key={s.h2}
            className="py-12 sm:py-16 border-b border-outline-variant"
          >
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              {s.h2}
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              {s.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-6">
            {chrome.h2Faq}
          </h2>
          <div className="space-y-5">
            {content.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-base sm:text-lg font-bold text-on-surface mb-1.5">
                  {f.q}
                </h3>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {(content.related.length > 0 || siblings.length > 0) && (
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              {chrome.h2Related}
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              {chrome.relatedIntro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {content.related.map((r) => (
                <Link
                  key={r.href}
                  href={link(r.href)}
                  className="flex items-center gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0 text-sm font-bold text-primary group-hover:underline">
                    {r.label}
                  </div>
                  <ChevronRight className="w-4 h-4 text-primary/50 ml-auto self-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
              {siblings.map((s) => {
                const siblingBadge =
                  locale === "es"
                    ? vinCheckTypeBadgeEs(s.slug) ?? s.badge
                    : s.badge;
                return (
                  <Link
                    key={s.slug}
                    href={link(`/vin-check/type/${s.slug}`)}
                    className="flex items-center gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Search className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0 text-sm font-bold text-primary group-hover:underline">
                      {siblingBadge}
                    </div>
                    <ChevronRight className="w-4 h-4 text-primary/50 ml-auto self-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Search className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              {chrome.upsellHeading}
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              {chrome.upsellBody}
            </p>
            <Link
              href={link("/vin-check")}
              className="inline-flex items-center gap-2 bg-white text-primary font-bold rounded-xl px-6 py-3 text-sm hover:bg-white/90 transition"
            >
              {chrome.upsellCta}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="mt-4 text-[11px] text-white/60 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3 h-3" /> {chrome.upsellNote}
            </p>
          </div>
        </section>

        <section className="py-10">
          <VinCheckBanner />
        </section>

        <section className="py-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> {chrome.bottomBadge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            {chrome.bottomHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            {chrome.bottomBody}
          </p>
          <div className="flex justify-center">
            <VinSearchForm size="lg" withPlateToggle />
          </div>
        </section>

        <RelatedChecks exclude="/vin-check" />
      </div>
    </article>
  );
}
