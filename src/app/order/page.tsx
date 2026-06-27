import type { Metadata } from "next";
import {
  ShieldCheck,
  FileText,
  Clock,
  BadgeCheck,
  Gauge,
  TriangleAlert,
  Wrench,
  History,
  Hammer,
  Search as SearchIcon,
} from "lucide-react";
import OrderVinForm from "./_components/OrderVinForm";
import { stripeConfig } from "@/lib/stripe";
import { dodoConfig } from "@/lib/dodo";

export const metadata: Metadata = {
  title: "Order a Vehicle History Report",
  description:
    "Order a comprehensive NMVTIS-backed vehicle history report. Title brands, accident records, odometer history, open recalls. Instant delivery.",
  robots: { index: false, follow: true },
};

// Wave 10: full Spanish translations for every user-visible string on
// the order page. Driven by ?lang=es in the URL — the marketing site's
// language switcher / Spanish landing pages link to
// app.carcheckervin.com/?lang=es so the locale propagates through the
// whole funnel: page → form → Stripe Checkout UI.
type Locale = "en" | "es";
interface OrderCopy {
  heroBadge: string;
  heroH1Top: string;
  heroH1Bottom: string;
  heroSubBefore: string;
  heroSubAfter: string;
  trustedSources: string;
  statDataPoints: string;
  statDelivery: string;
  statSource: string;
  statRefund: string;
  sellingPoints: { title: string; body: string }[];
  reportFeatures: { title: string; body: string }[];
  whatsIncluded: string;
  whatsIncludedHeading: string;
  whatsIncludedSub: string;
  bottomCta: string;
  bottomCtaSub: string;
  bottomCtaButton: string;
}
const ORDER_COPY: Record<Locale, OrderCopy> = {
  en: {
    heroBadge: "NMVTIS-Backed Vehicle History — Instant Delivery",
    heroH1Top: "Get the full history",
    heroH1Bottom: "before you buy.",
    heroSubBefore: "Enter any 17-character VIN to see a free preview. Order the complete NMVTIS-backed report for ",
    heroSubAfter: " and decode title brands, accidents, odometer history, and open recalls in seconds.",
    trustedSources: "Trusted sources:",
    statDataPoints: "Data Points",
    statDelivery: "Delivery",
    statSource: "Certified Source",
    statRefund: "Refund Guarantee",
    sellingPoints: [
      { title: "Full NMVTIS data", body: "Title brands, accident & theft records, odometer history, and open recalls — straight from the federal source." },
      { title: "Instant delivery", body: "Report renders in your browser within seconds of payment. No emails to wait for." },
      { title: "NMVTIS-certified source", body: "Data is supplied by ClearVin LLC, an approved NMVTIS Data Provider, and rendered unmodified." },
    ],
    reportFeatures: [
      { title: "Title history & brands", body: "Salvage, rebuilt, flood, hail, lemon, junk — every brand from every state the car has been registered in." },
      { title: "Accident & damage records", body: "Reported collisions with severity, location, airbag deployment, and the area of impact." },
      { title: "Odometer history", body: "Every recorded reading from DMV transfers, inspections, and service events — spot rollback instantly." },
      { title: "Open safety recalls", body: "Active NHTSA recalls with the manufacturer's remedy instructions." },
      { title: "Past owners & transfers", body: "How many owners the car has had and where it's been titled, by state and date." },
      { title: "Service & maintenance", body: "Service records reported to ClearVin's data partners — oil changes, brake jobs, transmission service." },
    ],
    whatsIncluded: "What's included",
    whatsIncludedHeading: "Everything you need to decide.",
    whatsIncludedSub: "Every paid report contains the full NMVTIS dataset for the VIN — no upsells, no \u201cpremium tiers\u201d.",
    bottomCta: "Ready when you are.",
    bottomCtaSub: "Drop a VIN into the form at the top and you'll see a free preview in seconds.",
    bottomCtaButton: "Start with a VIN",
  },
  es: {
    heroBadge: "Historial vehicular respaldado por NMVTIS — Entrega al instante",
    heroH1Top: "Conoce el historial completo",
    heroH1Bottom: "antes de comprar.",
    heroSubBefore: "Ingresa cualquier VIN de 17 caracteres para ver una vista previa gratis. Pide el reporte completo respaldado por NMVTIS por ",
    heroSubAfter: " y revisa marcas de título, accidentes, historial del odómetro y retiros abiertos en segundos.",
    trustedSources: "Fuentes confiables:",
    statDataPoints: "Puntos de datos",
    statDelivery: "Entrega",
    statSource: "Fuente certificada",
    statRefund: "Garantía de reembolso",
    sellingPoints: [
      { title: "Datos NMVTIS completos", body: "Marcas de título, registros de accidentes y robo, historial del odómetro y retiros abiertos — directamente de la fuente federal." },
      { title: "Entrega al instante", body: "El reporte se muestra en tu navegador segundos después del pago. Sin emails que esperar." },
      { title: "Fuente certificada NMVTIS", body: "Los datos los provee ClearVin LLC, un proveedor de datos NMVTIS aprobado, y se muestran sin modificación." },
    ],
    reportFeatures: [
      { title: "Historial y marcas de título", body: "Salvage, reconstruido, inundación, granizo, lemon, junk — cada marca de cada estado donde el auto estuvo registrado." },
      { title: "Registros de accidentes y daños", body: "Colisiones reportadas con severidad, ubicación, despliegue de bolsa de aire y área de impacto." },
      { title: "Historial del odómetro", body: "Cada lectura registrada en trámites del DMV, inspecciones y eventos de servicio — detecta reversión al instante." },
      { title: "Retiros de seguridad abiertos", body: "Retiros activos de la NHTSA con las instrucciones del remedio del fabricante." },
      { title: "Dueños previos y transferencias", body: "Cuántos dueños ha tenido el auto y en qué estados se ha titulado, por estado y fecha." },
      { title: "Servicio y mantenimiento", body: "Registros de servicio reportados a los socios de datos de ClearVin — cambios de aceite, frenos, transmisión." },
    ],
    whatsIncluded: "Qué incluye",
    whatsIncludedHeading: "Todo lo que necesitas para decidir.",
    whatsIncludedSub: "Cada reporte pagado contiene el conjunto completo de datos NMVTIS para el VIN — sin upsells, sin \u201cniveles premium\u201d.",
    bottomCta: "Listo cuando tú lo estés.",
    bottomCtaSub: "Ingresa un VIN en el formulario de arriba y verás una vista previa gratis en segundos.",
    bottomCtaButton: "Empezar con un VIN",
  },
};

const TRUSTED_SOURCES = [
  { id: "nmvtis", src: "/badges/nmvtis.webp", alt: "NMVTIS", h: "h-5" },
  { id: "niada",  src: "/badges/niada.png",   alt: "NIADA",  h: "h-4" },
];

// Icon order kept in sync with sellingPoints / reportFeatures arrays
// in ORDER_COPY above.
const SELLING_ICONS = [FileText, Clock, BadgeCheck] as const;
const REPORT_ICONS = [ShieldCheck, TriangleAlert, Gauge, Hammer, History, Wrench] as const;

interface OrderPageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function OrderPage({ searchParams }: OrderPageProps) {
  const params = await searchParams;
  const locale: Locale = params.lang === "es" ? "es" : "en";
  const copy = ORDER_COPY[locale];
  const stats = [
    { value: "40+",    label: copy.statDataPoints },
    { value: "<60s",   label: copy.statDelivery },
    { value: "NMVTIS", label: copy.statSource },
    { value: "100%",   label: copy.statRefund },
  ];
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-20 lg:pb-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f7f9fc 0%, #eceef1 100%)" }}
      >
        {/* Soft background blobs — same pattern as the marketing site hero */}
        <div
          className="absolute top-0 right-0 w-[32rem] h-[32rem] rounded-full opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none"
          style={{ background: "radial-gradient(circle, #003178 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 translate-y-1/2 -translate-x-1/3 pointer-events-none"
          style={{ background: "radial-gradient(circle, #ff9800 0%, transparent 70%)", filter: "blur(60px)" }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          {/* Eyebrow */}
          <div className="text-center animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary/8 border border-primary/10 text-xs sm:text-sm font-semibold text-primary mb-5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {copy.heroBadge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-center font-headline font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tighter text-primary mb-4 sm:mb-5 animate-fade-in-up-delay">
            {copy.heroH1Top}
            <br />
            <span style={{ color: "var(--color-secondary-container)" }}>
              {copy.heroH1Bottom}
            </span>
          </h1>

          <p className="text-center text-base sm:text-lg text-on-surface-variant font-medium max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed animate-fade-in-up-delay-2">
            {copy.heroSubBefore}
            <strong className="text-primary">{stripeConfig.priceLabel()}</strong>
            {copy.heroSubAfter}
          </p>

          {/* VIN form — the actual product */}
          <div className="max-w-2xl mx-auto animate-fade-in-up-delay-3">
            <OrderVinForm
              priceCents={stripeConfig.priceCents()}
              mockMode={!stripeConfig.isConfigured() && !dodoConfig.isConfigured()}
              locale={locale}
            />
          </div>

          {/* Stats row */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto animate-fade-in-up-delay-3">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-xl sm:text-2xl font-headline font-black text-primary leading-none mb-1">
                  {value}
                </p>
                <p className="text-[10px] sm:text-xs text-on-surface-variant font-medium uppercase tracking-wider">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Trusted sources */}
          <div className="mt-8 pt-6 border-t border-outline-variant/40 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 max-w-3xl mx-auto">
            <span className="text-[10px] font-semibold text-outline uppercase tracking-[0.18em]">
              {copy.trustedSources}
            </span>
            {TRUSTED_SOURCES.map(({ id, src, alt, h }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={id}
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className={`${h} w-auto object-contain opacity-50 grayscale`}
              />
            ))}
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-red-700 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[5px] font-black leading-none">NICB</span>
              </div>
              <span className="text-[10px] font-semibold text-outline tracking-wide">NICB</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SELLING POINTS ──────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-surface-container-lowest">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {copy.sellingPoints.map(({ title, body }, i) => {
              const Icon = SELLING_ICONS[i];
              return (
                <div
                  key={title}
                  className="bg-white border border-outline-variant/40 rounded-2xl p-5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-bold text-on-surface mb-1">{title}</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT'S IN A REPORT ──────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 border border-primary/10 text-[11px] font-bold uppercase tracking-wider text-primary mb-3">
              <FileText className="w-3 h-3" />
              {copy.whatsIncluded}
            </span>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
              {copy.whatsIncludedHeading}
            </h2>
            <p className="mt-3 text-on-surface-variant max-w-xl mx-auto">
              {copy.whatsIncludedSub}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {copy.reportFeatures.map(({ title, body }, i) => {
              const Icon = REPORT_ICONS[i];
              return (
                <div
                  key={title}
                  className="bg-white border border-outline-variant/40 rounded-2xl p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">{title}</p>
                      <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-surface-container-lowest">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-primary tracking-tight">
            {copy.bottomCta}
          </h2>
          <p className="mt-3 text-on-surface-variant">
            {copy.bottomCtaSub}
          </p>
          <a
            href="#hero"
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-primary/20"
          >
            <SearchIcon className="w-4 h-4" />
            {copy.bottomCtaButton}
          </a>
        </div>
      </section>
    </>
  );
}
