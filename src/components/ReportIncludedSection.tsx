import Link from "@/components/LocaleLink";
import {
  CheckCircle2,
  ShieldCheck,
  Gauge,
  FileWarning,
  Users,
  Wrench,
  TrendingDown,
  Flame,
  Anchor,
  Car,
  BarChart3,
  RefreshCcw,
  ArrowRight,
} from "lucide-react";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    badgeDataPoints: "40+ Data Points",
    heading: "What's Included in Every Report",
    sub: "Comprehensive vehicle history from NMVTIS and 50+ trusted sources — delivered instantly.",
    checklistLabel: "Full Coverage Checklist",
    checklistCounter: "12 of 40+ shown",
    features: [
      "Accident & damage history",
      "Title brand records (salvage, lemon)",
      "Odometer rollback detection",
      "Ownership history & registration",
      "Theft & recovery records",
      "Open safety recalls",
      "Flood & fire damage reports",
      "Auction sale history with photos",
      "Lien & impound information",
      "Service & maintenance records",
      "VIN specs & factory options",
      "Market value estimate",
    ],
    phoneRows: [
      { label: "Title Status",    value: "Clean" },
      { label: "Accidents",       value: "0 Reported" },
      { label: "Owners",          value: "2 Previous" },
      { label: "Service Records", value: "12 Found" },
      { label: "Open Recalls",    value: "None" },
      { label: "Odometer",        value: "Verified" },
    ],
    phoneTitle: "2019 Toyota Camry",
    phoneScore: "Score",
    phoneValue: "Value",
    phoneCta: "View Full Report",
    previewEyebrow: "Free Preview",
    previewHeading: "See what you'll get",
    previewBullet1: "50+ data points",
    previewBullet2: "Title & accident records",
    previewBullet3: "Print-ready",
    previewCta: "View Sample",
    statBlocks: [
      { n: "50+",    label: "Trusted Sources" },
      { n: "1B+",    label: "Records Checked" },
      { n: "NMVTIS", label: "Federal Database" },
      { n: "<60s",   label: "Report Delivery" },
    ],
  },
  es: {
    badgeDataPoints: "40+ puntos de datos",
    heading: "Lo que incluye cada reporte",
    sub: "Historial vehicular completo desde NMVTIS y más de 50 fuentes confiables — entregado al instante.",
    checklistLabel: "Lista completa de cobertura",
    checklistCounter: "12 de 40+ mostrados",
    features: [
      "Historial de accidentes y daños",
      "Registros de marca de título (salvamento, limón)",
      "Detección de retroceso de odómetro",
      "Historial de propiedad y registro",
      "Registros de robo y recuperación",
      "Retiros de seguridad abiertos",
      "Reportes de daño por inundación e incendio",
      "Historial de subastas con fotos",
      "Información de gravámenes e incautaciones",
      "Registros de servicio y mantenimiento",
      "Especificaciones VIN y opciones de fábrica",
      "Estimación del valor de mercado",
    ],
    phoneRows: [
      { label: "Estado del título",   value: "Limpio" },
      { label: "Accidentes",          value: "0 reportados" },
      { label: "Propietarios",        value: "2 previos" },
      { label: "Registros de servicio", value: "12 encontrados" },
      { label: "Retiros abiertos",    value: "Ninguno" },
      { label: "Odómetro",            value: "Verificado" },
    ],
    phoneTitle: "Toyota Camry 2019",
    phoneScore: "Puntaje",
    phoneValue: "Valor",
    phoneCta: "Ver reporte completo",
    previewEyebrow: "Vista previa gratis",
    previewHeading: "Mira lo que vas a obtener",
    previewBullet1: "50+ puntos de datos",
    previewBullet2: "Registros de título y accidentes",
    previewBullet3: "Listo para imprimir",
    previewCta: "Ver muestra",
    statBlocks: [
      { n: "50+",    label: "Fuentes confiables" },
      { n: "1B+",    label: "Registros revisados" },
      { n: "NMVTIS", label: "Base de datos federal" },
      { n: "<60s",   label: "Entrega del reporte" },
    ],
  },
  fr: {
    badgeDataPoints: "Plus de 40 points de données",
    heading: "Ce qui est inclus dans chaque rapport",
    sub: "Historique véhicule complet de NMVTIS et plus de 50 sources fiables — livré instantanément.",
    checklistLabel: "Liste de couverture complète",
    checklistCounter: "12 sur 40+ affichés",
    features: [
      "Historique d'accidents et dommages",
      "Dossiers de marque de titre (récupération, citron)",
      "Détection de recul du compteur",
      "Historique de propriété et immatriculation",
      "Dossiers de vol et de récupération",
      "Rappels de sécurité ouverts",
      "Rapports de dommages par inondation et incendie",
      "Historique des ventes aux enchères avec photos",
      "Informations sur privilèges et fourrière",
      "Dossiers de service et entretien",
      "Spécifications VIN et options d'usine",
      "Estimation de la valeur de marché",
    ],
    phoneRows: [
      { label: "Statut du titre",      value: "Propre" },
      { label: "Accidents",            value: "0 signalé" },
      { label: "Propriétaires",        value: "2 précédents" },
      { label: "Dossiers de service",  value: "12 trouvés" },
      { label: "Rappels ouverts",      value: "Aucun" },
      { label: "Compteur",             value: "Vérifié" },
    ],
    phoneTitle: "Toyota Camry 2019",
    phoneScore: "Score",
    phoneValue: "Valeur",
    phoneCta: "Voir le rapport complet",
    previewEyebrow: "Aperçu gratuit",
    previewHeading: "Vois ce que tu vas obtenir",
    previewBullet1: "Plus de 50 points de données",
    previewBullet2: "Dossiers de titre et accidents",
    previewBullet3: "Prêt à imprimer",
    previewCta: "Voir l'exemple",
    statBlocks: [
      { n: "50+",    label: "Sources fiables" },
      { n: "1B+",    label: "Dossiers vérifiés" },
      { n: "NMVTIS", label: "Base de données fédérale" },
      { n: "<60s",   label: "Livraison du rapport" },
    ],
  },
} as const;

const FEATURE_VISUALS = [
  { icon: FileWarning,  color: "text-rose-500",   bg: "bg-rose-50" },
  { icon: ShieldCheck,  color: "text-primary",    bg: "bg-primary/8" },
  { icon: Gauge,        color: "text-amber-500",  bg: "bg-amber-50" },
  { icon: Users,        color: "text-violet-500", bg: "bg-violet-50" },
  { icon: Car,          color: "text-slate-600",  bg: "bg-slate-100" },
  { icon: ShieldCheck,  color: "text-red-500",    bg: "bg-red-50" },
  { icon: Flame,        color: "text-orange-500", bg: "bg-orange-50" },
  { icon: BarChart3,    color: "text-blue-500",   bg: "bg-blue-50" },
  { icon: Anchor,       color: "text-indigo-500", bg: "bg-indigo-50" },
  { icon: Wrench,       color: "text-emerald-500",bg: "bg-emerald-50" },
  { icon: RefreshCcw,   color: "text-cyan-600",   bg: "bg-cyan-50" },
  { icon: TrendingDown, color: "text-green-600",  bg: "bg-green-50" },
] as const;

const PHONE_ROW_VISUALS = [
  { badge: true,  badgeColor: "bg-green-100 text-green-700" },
  { badge: false, good: true },
  { badge: false, good: false },
  { badge: false, good: true },
  { badge: false, good: true },
  { badge: true,  badgeColor: "bg-blue-100 text-blue-700" },
] as const;

const STAT_VISUALS = [
  { color: "bg-surface-container-lowest text-primary border border-primary/10" },
  { color: "bg-violet-50 text-violet-700" },
  { color: "bg-emerald-50 text-emerald-700" },
  { color: "bg-amber-50 text-amber-700" },
] as const;

export default function ReportIncludedSection({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  return (
    <section
      id="whats-included"
      className="py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #eef1f5 50%, #f8fafc 100%)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/12 text-xs font-bold text-primary uppercase tracking-[0.18em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {copy.badgeDataPoints}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-on-surface tracking-tight mb-3">
            {copy.heading}
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            {copy.sub}
          </p>
        </div>

        {/* ── Main: phone (left) + features (right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 items-stretch">

          {/* Phone column */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-[210px] bg-slate-900 rounded-[2.8rem] shadow-2xl shadow-slate-900/30 p-[6px] border-2 border-slate-800 self-start">
              {/* Dynamic island */}
              <div className="mx-auto w-14 h-[11px] bg-slate-950 rounded-full mb-2" />

              <div className="bg-white rounded-[2.3rem] overflow-hidden">
                {/* App header */}
                <div className="bg-primary px-4 pt-3 pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Car className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-white leading-none">{copy.phoneTitle}</p>
                      <p className="text-[7px] font-mono text-white/60 leading-none mt-0.5">4T1B11HK5KU••••••</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white/15 rounded-2xl px-2 py-1.5 text-center">
                      <p className="text-[7px] text-white/60 uppercase tracking-widest leading-none mb-0.5">{copy.phoneScore}</p>
                      <p className="text-[13px] font-black text-white leading-none">9.2<span className="text-[9px] font-semibold text-white/60">/10</span></p>
                    </div>
                    <div className="flex-1 bg-white/15 rounded-2xl px-2 py-1.5 text-center">
                      <p className="text-[7px] text-white/60 uppercase tracking-widest leading-none mb-0.5">{copy.phoneValue}</p>
                      <p className="text-[13px] font-black text-white leading-none">$18.4k</p>
                    </div>
                  </div>
                </div>

                {/* Data rows */}
                <div className="px-3 py-2.5 space-y-1.5">
                  {copy.phoneRows.map(({ label, value }, i) => {
                    const v = PHONE_ROW_VISUALS[i];
                    return (
                      <div key={label} className="flex items-center justify-between pb-1.5 border-b border-slate-50 last:border-0 last:pb-0">
                        <span className="text-[9px] text-slate-400 font-medium">{label}</span>
                        {v.badge ? (
                          <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${v.badgeColor}`}>{value}</span>
                        ) : (
                          <span className={`text-[9px] font-bold ${v.good ? "text-emerald-600" : "text-slate-600"}`}>{value}</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="px-3 pb-4 pt-2">
                  <div className="bg-primary rounded-2xl py-2 text-center">
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">{copy.phoneCta}</span>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-2 w-12 h-1 bg-slate-700 rounded-full" />
            </div>
          </div>

          {/* Features + inline preview card */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm border border-outline-variant/10 flex flex-col">

            <div className="flex items-center justify-between mb-5">
              <p className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">{copy.checklistLabel}</p>
              <span className="text-[10px] font-bold text-primary bg-primary/8 px-2 py-1 rounded-full">{copy.checklistCounter}</span>
            </div>

            {/* 2-col feature grid (3-col on large) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1 mb-6">
              {copy.features.map((label, i) => {
                const { icon: Icon, color, bg } = FEATURE_VISUALS[i];
                return (
                  <div key={label} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0 sm:[&:nth-last-child(2)]:border-0">
                    <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <span className="text-sm text-on-surface font-medium leading-snug">{label}</span>
                  </div>
                );
              })}
            </div>

            {/* Inline preview banner — tight, integrated, no floating empty space */}
            <div className="mt-auto bg-primary rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between">
              <div>
                <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.18em] mb-1">{copy.previewEyebrow}</p>
                <p className="text-base sm:text-lg font-headline font-extrabold text-white leading-tight mb-1">{copy.previewHeading}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/80">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {copy.previewBullet1}</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {copy.previewBullet2}</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {copy.previewBullet3}</span>
                </div>
              </div>
              <Link
                href="/full-report/1C4RJEAG0JC168184"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-primary text-sm font-bold rounded-full px-5 py-3 hover:bg-white/90 transition-colors group whitespace-nowrap"
              >
                {copy.previewCta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* ── Stat strip — closer to content ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
          {copy.statBlocks.map(({ n, label }, i) => (
            <div key={label} className={`rounded-2xl px-4 py-3.5 text-center ${STAT_VISUALS[i].color}`}>
              <p className="text-xl sm:text-2xl font-headline font-black leading-none mb-1">{n}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
