import { Check, Sparkles, Eye } from "lucide-react";
import VinSearchForm from "@/components/VinSearchForm";
import { pricingOptions, formatUsd, SINGLE_PRICE_CENTS } from "@/lib/pricing";
import type { Locale } from "@/i18n/config";

// The home pricing mirrors the authoritative pack prices from the pricing lib
// (single report + the discounted 3 / 5 / 10 prepaid packs) so the marketing
// page can never drift from what checkout actually charges.
const PER_REPORT = SINGLE_PRICE_CENTS / 100;
const money = (n: number) => `$${n.toFixed(2)}`;

const COPY = {
  en: {
    eyebrow: "Simple, honest pricing",
    headlinePrefix: "Just ",
    headlineSuffix: " per report.",
    subPart1: "Start with a ",
    subPart1Bold: "free preview",
    subPart2Template:
      " — see the vehicle, photos and records we already have at no cost. Unlock the complete history report for just {price} per VIN.",
    inlineSearchLabel: "Enter your VIN to get started",
    freeBadge: "Free",
    freeStartHere: "Start Here",
    freePrice: "FREE",
    freeUnit: "Preview — no card required",
    freeDesc:
      "Enter any VIN to instantly see the decoded vehicle, real auction photos, open recall count and how many history records we have on file — before you pay a cent.",
    freeBullets: [
      "Year, make, model & trim",
      "Real vehicle photos (when on file)",
      "Open recall count",
      "Title & auction record counts",
    ],
    freeCta: "Get a free preview",
    planMeta: {
      1: { label: "The Starter", desc: "Perfect for a single car purchase" },
      3: { label: "Most Popular", desc: "Great for comparing a few options" },
      5: { label: "Best Value", desc: "Best value for serious car shoppers" },
      10: { label: "The Pro", desc: "For dealers and fleet buyers" },
    } as Record<number, { label: string; desc: string }>,
    features: [
      "Full vehicle specifications",
      "Equipment & options list",
      "Engine & transmission details",
      "Market value estimates",
      "Recall information",
      "Real vehicle photos",
      "Ownership cost data",
    ],
    reportSingular: "Report",
    reportPlural: "Reports",
    eachWord: "each",
    saveTemplate: "Save {amount} · {desc}",
    planCta: "Get Report",
    footnote:
      "One-time payment · Instant delivery · 100% refund if we have no data on your VIN.",
  },
  es: {
    eyebrow: "Precios simples y honestos",
    headlinePrefix: "Solo ",
    headlineSuffix: " por reporte.",
    subPart1: "Comienza con una ",
    subPart1Bold: "vista previa gratis",
    subPart2Template:
      " — visualiza el vehículo, las fotos y los registros que ya tenemos, sin costo. Desbloquea el reporte completo del historial por solo {price} por VIN.",
    inlineSearchLabel: "Ingresa tu VIN para comenzar",
    freeBadge: "Gratis",
    freeStartHere: "Comienza aquí",
    freePrice: "GRATIS",
    freeUnit: "Vista previa — sin tarjeta",
    freeDesc:
      "Ingresa cualquier VIN para ver al instante el vehículo decodificado, fotos reales de subasta, cantidad de retiros abiertos y cuántos registros de historial tenemos en archivo — antes de pagar un centavo.",
    freeBullets: [
      "Año, marca, modelo y versión",
      "Fotos reales del vehículo (cuando estén en archivo)",
      "Cantidad de retiros abiertos",
      "Cantidad de registros de título y subasta",
    ],
    freeCta: "Obtén una vista previa gratis",
    planMeta: {
      1: { label: "El básico", desc: "Perfecto para la compra de un solo auto" },
      3: { label: "Más popular", desc: "Ideal para comparar algunas opciones" },
      5: { label: "Mejor valor", desc: "Mejor valor para compradores serios" },
      10: { label: "El profesional", desc: "Para concesionarios y compradores de flotas" },
    } as Record<number, { label: string; desc: string }>,
    features: [
      "Especificaciones completas del vehículo",
      "Lista de equipamiento y opciones",
      "Detalles del motor y la transmisión",
      "Estimación del valor de mercado",
      "Información de retiros",
      "Fotos reales del vehículo",
      "Datos de costo de propiedad",
    ],
    reportSingular: "reporte",
    reportPlural: "reportes",
    eachWord: "cada uno",
    saveTemplate: "Ahorra {amount} · {desc}",
    planCta: "Obtener reporte",
    footnote:
      "Pago único · Entrega instantánea · 100% de reembolso si no tenemos datos de tu VIN.",
  },
  fr: {
    eyebrow: "Tarifs simples et honnêtes",
    headlinePrefix: "Seulement ",
    headlineSuffix: " par rapport.",
    subPart1: "Commence par un ",
    subPart1Bold: "aperçu gratuit",
    subPart2Template:
      " — visualise le véhicule, les photos et les dossiers que nous avons déjà, sans frais. Débloque le rapport d'historique complet pour seulement {price} par VIN.",
    inlineSearchLabel: "Entre ton VIN pour commencer",
    freeBadge: "Gratuit",
    freeStartHere: "Commence ici",
    freePrice: "GRATUIT",
    freeUnit: "Aperçu — sans carte",
    freeDesc:
      "Entre n'importe quel VIN pour voir instantanément le véhicule décodé, les vraies photos d'enchères, le nombre de rappels ouverts et combien de dossiers d'historique nous avons en fichier — avant de payer un centime.",
    freeBullets: [
      "Année, marque, modèle et finition",
      "Photos réelles du véhicule (si disponibles)",
      "Nombre de rappels ouverts",
      "Nombre de dossiers de titre et d'enchères",
    ],
    freeCta: "Obtenir un aperçu gratuit",
    planMeta: {
      1: { label: "Le Démarreur", desc: "Parfait pour l'achat d'une seule voiture" },
      3: { label: "Le plus populaire", desc: "Idéal pour comparer quelques options" },
      5: { label: "Meilleure valeur", desc: "Meilleure valeur pour les acheteurs sérieux" },
      10: { label: "Le Pro", desc: "Pour les concessionnaires et acheteurs de flottes" },
    } as Record<number, { label: string; desc: string }>,
    features: [
      "Spécifications complètes du véhicule",
      "Liste d'équipements et options",
      "Détails du moteur et de la transmission",
      "Estimations de la valeur de marché",
      "Informations sur les rappels",
      "Photos réelles du véhicule",
      "Données de coût de possession",
    ],
    reportSingular: "rapport",
    reportPlural: "rapports",
    eachWord: "chacun",
    saveTemplate: "Économise {amount} · {desc}",
    planCta: "Obtenir le rapport",
    footnote:
      "Paiement unique · Livraison instantanée · Remboursement à 100% si nous n'avons aucune donnée sur ton VIN.",
  },
} as const;

export default function PricingSection({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const plans = pricingOptions().map((o) => ({
    ...o,
    label: copy.planMeta[o.size]?.label ?? `${o.size} ${copy.reportPlural}`,
    desc: copy.planMeta[o.size]?.desc ?? "",
    popular: o.bestValue,
  }));

  const subPart2 = copy.subPart2Template.replace("{price}", money(PER_REPORT));

  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest mb-4 sm:mb-5 text-on-secondary-container"
            style={{ background: "var(--color-secondary-container)" }}>
            <Sparkles className="w-4 h-4" /> {copy.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-3 sm:mb-4">
            {copy.headlinePrefix}<span className="price">{money(PER_REPORT)}</span>{copy.headlineSuffix}
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto">
            {copy.subPart1}<span className="font-black text-primary">{copy.subPart1Bold}</span>{subPart2}
          </p>
        </div>

        {/* ── Inline VIN entry ────────────────────────────────────────────
            Users type their VIN right here and go straight to their report —
            no need to jump to another page just to enter it. The card buttons
            below all scroll back up to this bar. */}
        <div
          id="pricing-search"
          className="max-w-2xl mx-auto mb-10 sm:mb-14 flex flex-col items-center scroll-mt-28"
        >
          <p className="text-sm font-bold text-on-surface-variant mb-3 uppercase tracking-widest">
            {copy.inlineSearchLabel}
          </p>
          <VinSearchForm size="sm" locale={locale} />
        </div>

        {/* ── Free preview card ───────────────────────────────────────── */}
        <div className="mb-6 sm:mb-8">
          <div className="relative rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 bg-surface-container-lowest ghost-border shadow-sm flex flex-col lg:flex-row lg:items-center gap-6">
            <span
              className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-on-secondary-container"
              style={{ background: "var(--color-secondary-container)" }}
            >
              <Sparkles className="w-3 h-3" /> {copy.freeBadge}
            </span>

            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-widest mb-3 text-outline">
                {copy.freeStartHere}
              </p>
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <h3 className="text-4xl sm:text-5xl price font-extrabold text-primary">
                  {copy.freePrice}
                </h3>
                <span className="text-sm font-bold text-on-surface-variant">
                  {copy.freeUnit}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant max-w-xl">
                {copy.freeDesc}
              </p>
            </div>

            <div className="lg:w-72 flex-shrink-0">
              <ul className="space-y-2.5 mb-5">
                {copy.freeBullets.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-on-surface-variant">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#pricing-search"
                className="flex items-center justify-center gap-2 w-full text-center py-3 rounded-full font-bold bg-surface-container text-primary hover:bg-primary hover:text-white transition-all"
              >
                <Eye className="w-4 h-4" /> {copy.freeCta}
              </a>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {plans.map((plan) => {
            const saveText = copy.saveTemplate
              .replace("{amount}", formatUsd(plan.savingsCents))
              .replace("{desc}", plan.desc);
            return (
              <div
                key={plan.size}
                className={`relative rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 flex flex-col transition-all duration-300 hover:scale-[1.02] ${
                  plan.popular
                    ? "bg-primary text-white shadow-2xl shadow-primary/20"
                    : "bg-surface-container-lowest ghost-border shadow-sm"
                }`}
              >
                {/* Orange top bar for featured plan */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl sm:rounded-t-[2rem]" style={{ background: "var(--color-secondary-container)" }} />
                )}

                <p className={`text-xs font-black uppercase tracking-widest mb-5 ${plan.popular ? "text-secondary-fixed-dim" : "text-outline"}`}>
                  {plan.label}
                </p>

                <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                  <h3 className={`text-4xl sm:text-5xl price font-extrabold ${plan.popular ? "text-white" : "text-primary"}`}>
                    {formatUsd(plan.priceCents)}
                  </h3>
                </div>
                <p className={`text-sm font-bold mb-1 ${plan.popular ? "text-white" : "text-on-surface-variant"}`}>
                  {plan.size} {plan.size === 1 ? copy.reportSingular : copy.reportPlural} · {formatUsd(plan.perReportCents)} {copy.eachWord}
                </p>
                {plan.savingsCents > 0 ? (
                  <p className={`text-xs font-bold mb-8 ${plan.popular ? "text-secondary-fixed-dim" : "text-green-600"}`}>
                    {saveText}
                  </p>
                ) : (
                  <p className={`text-xs mb-8 ${plan.popular ? "text-white/85" : "text-outline"}`}>
                    {plan.desc}
                  </p>
                )}

                <ul className="space-y-3 mb-8 sm:mb-10 flex-1">
                  {copy.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.popular ? "text-white" : "text-on-surface-variant"}`}>
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-secondary-fixed-dim" : "text-green-500"}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#pricing-search"
                  className={`block w-full text-center py-3 sm:py-4 rounded-full font-bold transition-all ${
                    plan.popular
                      ? "text-on-secondary-container hover:brightness-110"
                      : "bg-surface-container text-primary hover:bg-primary hover:text-white"
                  }`}
                  style={plan.popular ? { background: "var(--color-secondary-container)" } : {}}
                >
                  {copy.planCta}
                </a>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs sm:text-sm text-outline mt-8 sm:mt-10 max-w-xl mx-auto">
          {copy.footnote}
        </p>
      </div>
    </section>
  );
}
