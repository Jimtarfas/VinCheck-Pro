/**
 * Shared body for /pricing and /es/precios.
 * Wave 18 batch 4 — full English layout in both locales via COPY={en,es}.
 *
 * PricingSection (cards) and FAQSection are already i18n-aware, but the
 * pricing-page hero, comparison table, why-free strip, and pricing-FAQ
 * accordion all live in this body and are translated via COPY.
 */

import Link from "next/link";
import { Check, Sparkles, Shield, Zap } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PricingSection from "@/components/PricingSection";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "Pricing",
    heroBadge: "Limited Time — Everything Free",
    h1: "VIN Check Pricing — Free Right Now",
    heroLead:
      "Every CarCheckerVIN plan is ",
    heroLeadBold: "$0 during our limited-time promotion",
    heroLeadSuffix:
      ". Same premium data — full specs, photos, recalls, market values, ownership history — across single reports and multi-report bundles. No credit card required.",
    heroCtaPrimary: "Claim Free Report",
    heroCtaSecondary: "See FAQ",
    compareH2: "How CarCheckerVIN pricing compares",
    compareIntro:
      "Our paid pricing (shown crossed out on the cards above) returns when the promotion ends. Here's how that compares to the largest US vehicle-history services on a per-report basis.",
    tableHead: { service: "Service", single: "Single report", bundle: "Bundle / unlimited", photos: "Photos" },
    tableRows: [
      { service: "CarCheckerVIN (now)", single: "FREE", bundle: "FREE (up to 10-pack)", photos: "Real photos", highlight: true, regular: false },
      { service: "CarCheckerVIN (regular)", single: "$14.99", bundle: "$89.99 (10-pack)", photos: "Real photos", highlight: false, regular: true },
      { service: "Carfax", single: "$44.99", bundle: "$99.99/mo unlimited", photos: "Limited", highlight: false, regular: false },
      { service: "AutoCheck", single: "$24.99", bundle: "$49.99 (25 reports)", photos: "No", highlight: false, regular: false },
    ],
    tableNote:
      "Competitor pricing reflects publicly listed rates and may change. Sources: carfax.com/pricing, autocheck.com.",
    whyStrip: [
      { icon: Sparkles, title: "Limited-time free promotion", body: "All plans temporarily $0. Same premium data — nothing held back." },
      { icon: Shield, title: "No credit card", body: "Claim any plan without entering a card. NMVTIS-backed data, instant delivery." },
      { icon: Check, title: "Same report tier", body: "Single, 3-pack, 5-pack, and pro bundles all use the identical premium report." },
    ],
    faqH2: "Pricing FAQ",
    faqIntro: "Quick answers to the most common questions about CarCheckerVIN pricing.",
    finalH2: "Ready to claim a free report?",
    finalSub: "Enter any 17-digit VIN — get a full vehicle history report in seconds. No credit card. No signup wall.",
    finalCta: "Start free VIN check",
  },
  es: {
    home: "Inicio",
    crumb: "Precios",
    heroBadge: "Por tiempo limitado — Todo gratis",
    h1: "Precios de verificación VIN — Gratis ahora mismo",
    heroLead: "Cada plan de CarCheckerVIN es ",
    heroLeadBold: "$0 durante nuestra promoción por tiempo limitado",
    heroLeadSuffix:
      ". Los mismos datos premium — especificaciones completas, fotos, retiros, valores de mercado, historial de propietarios — en reportes únicos y paquetes de varios reportes. Sin tarjeta de crédito.",
    heroCtaPrimary: "Reclama tu reporte gratis",
    heroCtaSecondary: "Ver preguntas frecuentes",
    compareH2: "Cómo se compara el precio de CarCheckerVIN",
    compareIntro:
      "Nuestros precios pagados (mostrados tachados en las tarjetas de arriba) regresan cuando termine la promoción. Así se comparan con los servicios de historial vehicular más grandes de EE. UU. por reporte.",
    tableHead: { service: "Servicio", single: "Reporte único", bundle: "Paquete / ilimitado", photos: "Fotos" },
    tableRows: [
      { service: "CarCheckerVIN (ahora)", single: "GRATIS", bundle: "GRATIS (hasta paquete de 10)", photos: "Fotos reales", highlight: true, regular: false },
      { service: "CarCheckerVIN (regular)", single: "$14.99", bundle: "$89.99 (paquete de 10)", photos: "Fotos reales", highlight: false, regular: true },
      { service: "Carfax", single: "$44.99", bundle: "$99.99/mes ilimitado", photos: "Limitadas", highlight: false, regular: false },
      { service: "AutoCheck", single: "$24.99", bundle: "$49.99 (25 reportes)", photos: "No", highlight: false, regular: false },
    ],
    tableNote:
      "Los precios de la competencia reflejan tarifas publicadas y pueden cambiar. Fuentes: carfax.com/pricing, autocheck.com.",
    whyStrip: [
      { icon: Sparkles, title: "Promoción gratis por tiempo limitado", body: "Todos los planes temporalmente a $0. Los mismos datos premium — nada se queda fuera." },
      { icon: Shield, title: "Sin tarjeta de crédito", body: "Reclama cualquier plan sin ingresar una tarjeta. Datos respaldados por NMVTIS, entrega instantánea." },
      { icon: Check, title: "Mismo nivel de reporte", body: "Reporte único, paquete de 3, paquete de 5 y paquetes profesionales usan el mismo reporte premium." },
    ],
    faqH2: "Preguntas frecuentes sobre precios",
    faqIntro: "Respuestas rápidas a las preguntas más comunes sobre los precios de CarCheckerVIN.",
    finalH2: "¿Listo para reclamar un reporte gratis?",
    finalSub: "Ingresa cualquier VIN de 17 dígitos — obtén un reporte completo del historial vehicular en segundos. Sin tarjeta de crédito. Sin muro de registro.",
    finalCta: "Comienza la verificación VIN gratis",
  },
  fr: {
    home: "Accueil",
    crumb: "Tarifs",
    heroBadge: "Durée limitée — Tout est gratuit",
    h1: "Tarifs de vérification VIN — Gratuit en ce moment",
    heroLead: "Chaque plan CarCheckerVIN est ",
    heroLeadBold: "$0 pendant notre promotion à durée limitée",
    heroLeadSuffix:
      ". Les mêmes données premium — spécifications complètes, photos, rappels, valeurs de marché, historique des propriétaires — pour les rapports uniques et les forfaits multi-rapports. Sans carte de crédit.",
    heroCtaPrimary: "Réclame ton rapport gratuit",
    heroCtaSecondary: "Voir la FAQ",
    compareH2: "Comment se comparent les tarifs CarCheckerVIN",
    compareIntro:
      "Nos tarifs payants (affichés barrés sur les cartes ci-dessus) reviendront à la fin de la promotion. Voici comment ils se comparent aux plus grands services d'historique de véhicules aux États-Unis par rapport.",
    tableHead: { service: "Service", single: "Rapport unique", bundle: "Forfait / illimité", photos: "Photos" },
    tableRows: [
      { service: "CarCheckerVIN (maintenant)", single: "GRATUIT", bundle: "GRATUIT (jusqu'au paquet de 10)", photos: "Vraies photos", highlight: true, regular: false },
      { service: "CarCheckerVIN (régulier)", single: "$14.99", bundle: "$89.99 (paquet de 10)", photos: "Vraies photos", highlight: false, regular: true },
      { service: "Carfax", single: "$44.99", bundle: "$99.99/mois illimité", photos: "Limitées", highlight: false, regular: false },
      { service: "AutoCheck", single: "$24.99", bundle: "$49.99 (25 rapports)", photos: "Non", highlight: false, regular: false },
    ],
    tableNote:
      "Les prix des concurrents reflètent les tarifs affichés publiquement et peuvent changer. Sources : carfax.com/pricing, autocheck.com.",
    whyStrip: [
      { icon: Sparkles, title: "Promotion gratuite à durée limitée", body: "Tous les plans temporairement à $0. Les mêmes données premium — rien n'est retenu." },
      { icon: Shield, title: "Sans carte de crédit", body: "Réclame n'importe quel plan sans saisir de carte. Données soutenues par NMVTIS, livraison instantanée." },
      { icon: Check, title: "Même niveau de rapport", body: "Rapport unique, paquet de 3, paquet de 5 et forfaits pro utilisent tous le rapport premium identique." },
    ],
    faqH2: "FAQ sur les tarifs",
    faqIntro: "Réponses rapides aux questions les plus courantes sur les tarifs CarCheckerVIN.",
    finalH2: "Prêt à réclamer un rapport gratuit ?",
    finalSub: "Saisis n'importe quel VIN à 17 chiffres — obtiens un rapport complet d'historique de véhicule en quelques secondes. Sans carte de crédit. Sans mur d'inscription.",
    finalCta: "Commence la vérification VIN gratuite",
  },
} as const;

export const FAQS_EN = [
  {
    question: "Is CarCheckerVIN really free?",
    answer:
      "Yes. For a limited-time promotion, every plan — single report, 3-pack, 5-pack, and 10-pack — is completely free. No credit card is required to claim a report. When the promotion ends, the original prices listed (currently shown crossed out) will resume.",
  },
  {
    question: "What's the difference between the free VIN decoder and a full report?",
    answer:
      "The free VIN decoder returns year, make, model, engine, transmission, and basic specs from the VIN itself. A full vehicle history report adds title-brand history, recall lookups, market value, real vehicle photos, ownership cost estimates, and any NMVTIS records — pulled from multiple data sources, not just the VIN encoding.",
  },
  {
    question: "Do I need to enter a credit card?",
    answer:
      "No. While the limited-time promotion is active, you can claim any plan without entering a credit card.",
  },
  {
    question: "Which plan should I buy?",
    answer:
      "Single is right if you're checking one specific vehicle. The 3-pack and 5-pack are designed for buyers comparing multiple options. The 10-pack (Pro) is best for dealers, wholesale buyers, and fleet operators who run regular checks.",
  },
  {
    question: "Do bundle reports expire?",
    answer:
      "No. Once you claim a bundle, the reports are tied to your account and can be used whenever you're ready — there's no expiration on unused report credits.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "While reports are free during the promotion there's nothing to refund. Once paid pricing resumes, our refund policy will be published on the checkout page before purchase.",
  },
  {
    question: "How does CarCheckerVIN pricing compare to Carfax or AutoCheck?",
    answer:
      "Carfax single reports start around $44.99 (with unlimited plans at $99.99/mo); AutoCheck is around $24.99 for a single report. During our limited-time promotion every CarCheckerVIN report is $0, and our paid pricing (shown crossed out on the cards above) starts at $14.99 — well below either competitor.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. All searches run over HTTPS, payment processing (when paid pricing resumes) uses Stripe with PCI-DSS Level 1 compliance, and we never sell your personal information. VIN lookups are not tied to your identity unless you sign up for an account.",
  },
] as const;

export const FAQS_ES = [
  {
    question: "¿CarCheckerVIN es realmente gratis?",
    answer:
      "Sí. Por una promoción por tiempo limitado, cada plan — reporte único, paquete de 3, paquete de 5 y paquete de 10 — es completamente gratis. No se requiere tarjeta de crédito para reclamar un reporte. Cuando termine la promoción, los precios originales listados (actualmente mostrados tachados) se reanudarán.",
  },
  {
    question: "¿Cuál es la diferencia entre el decodificador VIN gratis y un reporte completo?",
    answer:
      "El decodificador VIN gratis devuelve año, marca, modelo, motor, transmisión y especificaciones básicas del VIN mismo. Un reporte completo del historial vehicular añade historial de marcas de título, búsquedas de retiros, valor de mercado, fotos reales del vehículo, estimaciones de costos de propiedad y cualquier registro NMVTIS — extraídos de múltiples fuentes de datos, no solo de la codificación del VIN.",
  },
  {
    question: "¿Necesito ingresar una tarjeta de crédito?",
    answer:
      "No. Mientras la promoción por tiempo limitado esté activa, puedes reclamar cualquier plan sin ingresar una tarjeta de crédito.",
  },
  {
    question: "¿Qué plan debería comprar?",
    answer:
      "El reporte único es correcto si estás revisando un vehículo específico. El paquete de 3 y el paquete de 5 están diseñados para compradores que comparan varias opciones. El paquete de 10 (Pro) es mejor para concesionarios, compradores mayoristas y operadores de flotas que hacen verificaciones regulares.",
  },
  {
    question: "¿Los reportes del paquete expiran?",
    answer:
      "No. Una vez que reclamas un paquete, los reportes están vinculados a tu cuenta y pueden usarse cuando estés listo — no hay vencimiento de los créditos de reporte no usados.",
  },
  {
    question: "¿Puedo obtener un reembolso?",
    answer:
      "Mientras los reportes son gratis durante la promoción no hay nada que reembolsar. Una vez que se reanuden los precios pagados, nuestra política de reembolso se publicará en la página de pago antes de la compra.",
  },
  {
    question: "¿Cómo se compara el precio de CarCheckerVIN con Carfax o AutoCheck?",
    answer:
      "Los reportes únicos de Carfax comienzan alrededor de $44.99 (con planes ilimitados a $99.99/mes); AutoCheck cuesta alrededor de $24.99 por un reporte único. Durante nuestra promoción por tiempo limitado cada reporte de CarCheckerVIN cuesta $0, y nuestro precio pagado (mostrado tachado en las tarjetas de arriba) comienza en $14.99 — muy por debajo de cualquier competidor.",
  },
  {
    question: "¿Mis datos están seguros?",
    answer:
      "Sí. Todas las búsquedas se ejecutan sobre HTTPS, el procesamiento de pagos (cuando se reanuden los precios pagados) usa Stripe con cumplimiento PCI-DSS Nivel 1, y nunca vendemos tu información personal. Las búsquedas de VIN no se vinculan a tu identidad a menos que te registres para una cuenta.",
  },
] as const;

interface Props {
  locale: Locale;
}

export default function PricingBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const heroHref = locale === "es" ? "/es#hero" : "/#hero";

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Breadcrumbs
              onDark
              items={[
                { label: c.home, href: locale === "es" ? "/es" : "/" },
                { label: c.crumb },
              ]}
            />
          </div>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest mb-5 text-on-secondary-container"
            style={{ background: "var(--color-secondary-container)" }}
          >
            <Sparkles className="w-4 h-4" /> {c.heroBadge}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-extrabold mb-4 leading-tight">
            {c.h1}
          </h1>
          <p className="text-lg sm:text-xl text-primary-100 max-w-3xl leading-relaxed mb-8">
            {c.heroLead}
            <span className="font-black text-white">{c.heroLeadBold}</span>
            {c.heroLeadSuffix}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={heroHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary-700 font-bold hover:bg-white/95 transition-all shadow-lg"
            >
              <Zap className="w-4 h-4" /> {c.heroCtaPrimary}
            </Link>
            <Link
              href="#faq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-all border border-white/20"
            >
              {c.heroCtaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing cards — reuse homepage component */}
      <PricingSection locale={locale} />

      {/* Bundle comparison table */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            {c.compareH2}
          </h2>
          <p className="text-on-surface-variant mb-10 max-w-3xl">{c.compareIntro}</p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant/40">
            <table className="w-full text-sm">
              <thead className="bg-surface-container-low text-on-surface-variant">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">{c.tableHead.service}</th>
                  <th className="text-left px-4 py-3 font-bold">{c.tableHead.single}</th>
                  <th className="text-left px-4 py-3 font-bold">{c.tableHead.bundle}</th>
                  <th className="text-left px-4 py-3 font-bold">{c.tableHead.photos}</th>
                </tr>
              </thead>
              <tbody className="bg-surface-container-lowest">
                {c.tableRows.map((row) => (
                  <tr key={row.service} className="border-t border-outline-variant/30">
                    <td className={`px-4 py-3 font-bold ${row.highlight ? "text-primary" : ""}`}>
                      {row.service}
                    </td>
                    <td className={`px-4 py-3 ${row.highlight ? "font-black text-green-600" : ""}`}>
                      {row.single}
                    </td>
                    <td className={`px-4 py-3 ${row.highlight ? "font-black text-green-600" : ""}`}>
                      {row.bundle}
                    </td>
                    <td className="px-4 py-3">{row.photos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-outline mt-3">{c.tableNote}</p>
        </div>
      </section>

      {/* Why-free strip */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-surface-container-low">
        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-3">
          {c.whyStrip.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl bg-surface-container-lowest p-6 border border-outline-variant/30"
            >
              <Icon className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-bold text-on-surface mb-1.5">{title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-20 px-4 sm:px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            {c.faqH2}
          </h2>
          <p className="text-on-surface-variant mb-10">{c.faqIntro}</p>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 open:bg-surface-container-low"
              >
                <summary className="font-bold text-on-surface cursor-pointer list-none flex items-start justify-between gap-4">
                  <span>{f.question}</span>
                  <span className="text-primary text-xl leading-none flex-shrink-0 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-headline font-extrabold mb-3">{c.finalH2}</h2>
          <p className="text-primary-100 mb-7">{c.finalSub}</p>
          <Link
            href={heroHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-primary-700 font-bold hover:bg-white/95 transition-all shadow-lg"
          >
            <Zap className="w-4 h-4" /> {c.finalCta}
          </Link>
        </div>
      </section>
    </>
  );
}

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
export { FAQS_FR };
