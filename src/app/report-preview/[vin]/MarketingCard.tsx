import Link from "@/components/LocaleLink";
import { Check, X, Gem } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import BuyReportButton from "@/components/BuyReportButton";
import type { Locale } from "@/i18n/config";

/* Head-to-head comparison vs Carfax — same core records, a fraction of the
   price, plus a couple of extras. Rendered inside the same navy conversion
   card so the footprint matches the previous "additional records" panel.

   The label is now a key into COPY[locale].compareLabels so the table
   localises with the rest of the card. */
const COMPARE: { key: keyof (typeof COPY)["en"]["compareLabels"]; us: boolean; them: boolean }[] = [
  { key: "salvage", us: true, them: true },
  { key: "odometer", us: true, them: true },
  { key: "titleBrands", us: true, them: true },
  { key: "liens", us: true, them: true },
  { key: "auction", us: true, them: false },
  { key: "market", us: true, them: false },
];

/* Carfax single-report list price for the side-by-side. */
const CARFAX_PRICE = "$44.99";

const COPY = {
  en: {
    compareLabels: {
      salvage: "Salvage & accident records",
      odometer: "Odometer rollback check",
      titleBrands: "Title brands & total loss",
      liens: "Open liens & theft check",
      auction: "Auction sale listings & photos",
      market: "Live market value & pricing",
    },
    intro: (vehicleLabel: string) =>
      `The same records on this ${vehicleLabel} — with more detail, for a fraction of the price.`,
    included: "Included",
    ours: "Ours",
    price: "Price",
    trust: "NMVTIS-backed data · Verified report in seconds · 30-day money-back guarantee",
    getFullReport: (price: string) => `Get full report — $${price}`,
    viewExample: "View example report",
  },
  es: {
    compareLabels: {
      salvage: "Salvamento y accidentes",
      odometer: "Verificación de retroceso de odómetro",
      titleBrands: "Marcas de título y pérdida total",
      liens: "Gravámenes abiertos y verificación de robo",
      auction: "Subastas y fotos",
      market: "Valor de mercado en vivo",
    },
    intro: (vehicleLabel: string) =>
      `Los mismos registros sobre este ${vehicleLabel} — con más detalle, por una fracción del precio.`,
    included: "Incluido",
    ours: "Nuestro",
    price: "Precio",
    trust: "Datos NMVTIS · Reporte verificado en segundos · Garantía de devolución de 30 días",
    getFullReport: (price: string) => `Obtén el reporte completo — $${price}`,
    viewExample: "Ver reporte de ejemplo",
  },
  fr: {
    compareLabels: {
      salvage: "Épave et accidents",
      odometer: "Vérification du recul d'odomètre",
      titleBrands: "Mentions de titre et perte totale",
      liens: "Privilèges et vérification de vol",
      auction: "Ventes aux enchères et photos",
      market: "Valeur marchande en direct",
    },
    intro: (vehicleLabel: string) =>
      `Les mêmes données sur ce ${vehicleLabel} — avec plus de détails, pour une fraction du prix.`,
    included: "Inclus",
    ours: "Le nôtre",
    price: "Prix",
    trust: "Données NMVTIS · Rapport vérifié en quelques secondes · Garantie satisfait ou remboursé 30 jours",
    getFullReport: (price: string) => `Obtenir le rapport complet — $${price}`,
    viewExample: "Voir un exemple de rapport",
  },
} as const;

interface Props {
  make: string;
  vehicleLabel: string;
  vin: string;
  price: string;
  exampleHref: string;
  locale?: Locale;
}

export default function MarketingCard({
  make,
  vehicleLabel,
  vin,
  price,
  exampleHref,
  locale = "en",
}: Props) {
  const c = COPY[locale];
  return (
    <div className="relative rounded-3xl bg-primary text-white p-6 sm:p-8 shadow-2xl shadow-primary/25 overflow-hidden">
      {/* subtle sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 w-64 h-64 rounded-full bg-white/5 blur-2xl"
      />

      {/* make badge */}
      {make && (
        <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 bg-white rounded-xl px-3 py-2 shadow-md">
          <BrandLogo make={make} className="w-6 h-6" />
          <span className="text-[11px] font-black uppercase tracking-wider text-primary leading-none">
            {make}
          </span>
        </div>
      )}

      <p className="text-[11px] font-bold uppercase tracking-wider text-white/55 mb-2">
        VIN: {vin}
      </p>
      <h3 className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-2 pr-24">
        {/* CarCheckerVIN wordmark — matches the site logo (orange "VIN"). */}
        <span className="font-headline font-black tracking-tight text-2xl sm:text-[26px] text-white leading-none">
          CarChecker
          <span style={{ color: "var(--color-secondary-container)" }}>VIN</span>
        </span>
        <span className="text-sm font-bold uppercase tracking-wide text-white/40">
          vs
        </span>
        {/* Carfax wordmark — their recognizable all-caps bold mark, on a white
            pill so it reads as a logo rather than body copy. */}
        <span className="inline-flex items-center rounded-md bg-white px-2 py-1 font-black tracking-tight text-lg sm:text-xl leading-none text-[#1a1a2e]">
          CARFAX
        </span>
      </h3>
      <p className="text-sm text-white/75 mb-5">{c.intro(vehicleLabel)}</p>

      {/* Comparison table */}
      <div className="rounded-2xl bg-white/[0.06] border border-white/10 overflow-hidden mb-5">
        <div className="grid grid-cols-[1fr_4rem_4rem] items-center bg-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-wide">
          <span className="text-white/50">{c.included}</span>
          <span className="text-center text-yellow-300">{c.ours}</span>
          <span className="text-center text-white/55">Carfax</span>
        </div>
        {COMPARE.map((row) => (
          <div
            key={row.key}
            className="grid grid-cols-[1fr_4rem_4rem] items-center px-3 py-2 border-t border-white/5"
          >
            <span className="text-[13px] font-semibold leading-tight pr-2">
              {c.compareLabels[row.key]}
            </span>
            <span className="flex justify-center">
              {row.us ? (
                <Check className="w-4 h-4 text-yellow-300" strokeWidth={3} />
              ) : (
                <X className="w-4 h-4 text-white/25" strokeWidth={3} />
              )}
            </span>
            <span className="flex justify-center">
              {row.them ? (
                <Check className="w-4 h-4 text-white/40" strokeWidth={3} />
              ) : (
                <X className="w-4 h-4 text-white/25" strokeWidth={3} />
              )}
            </span>
          </div>
        ))}
        {/* Price row — the headline win. */}
        <div className="grid grid-cols-[1fr_4rem_4rem] items-center px-3 py-2.5 border-t border-white/10 bg-white/[0.04]">
          <span className="text-[11px] font-black uppercase tracking-wide text-white/55">
            {c.price}
          </span>
          <span className="text-center font-headline font-extrabold text-yellow-300">
            ${price}
          </span>
          <span className="text-center font-headline font-bold text-white/45 line-through decoration-white/30">
            {CARFAX_PRICE}
          </span>
        </div>
      </div>

      <p className="text-xs text-white/70 mb-5">{c.trust}</p>

      <BuyReportButton className="flex items-center justify-center gap-2 w-full bg-white text-primary rounded-2xl py-4 font-headline font-extrabold text-base hover:bg-yellow-50 transition-colors shadow-lg cursor-pointer">
        <Gem className="w-5 h-5" /> {c.getFullReport(price)}
      </BuyReportButton>

      <Link
        href={exampleHref}
        className="block text-center mt-4 text-sm font-bold text-white/85 underline underline-offset-4 hover:text-white transition-colors"
      >
        {c.viewExample}
      </Link>
    </div>
  );
}
