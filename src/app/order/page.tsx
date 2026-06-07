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

export const metadata: Metadata = {
  title: "Order a Vehicle History Report",
  description:
    "Order a comprehensive NMVTIS-backed vehicle history report. Title brands, accident records, odometer history, open recalls. Instant delivery.",
  robots: { index: false, follow: true },
};

const STATS = [
  { value: "40+",    label: "Data Points" },
  { value: "<60s",   label: "Delivery" },
  { value: "NMVTIS", label: "Certified Source" },
  { value: "100%",   label: "Refund Guarantee" },
];

const TRUSTED_SOURCES = [
  { id: "nmvtis", src: "/badges/nmvtis.webp", alt: "NMVTIS", h: "h-5" },
  { id: "niada",  src: "/badges/niada.png",   alt: "NIADA",  h: "h-4" },
];

const SELLING_POINTS = [
  {
    icon: FileText,
    title: "Full NMVTIS data",
    body: "Title brands, accident & theft records, odometer history, and open recalls — straight from the federal source.",
  },
  {
    icon: Clock,
    title: "Instant delivery",
    body: "Report renders in your browser within seconds of payment. No emails to wait for.",
  },
  {
    icon: BadgeCheck,
    title: "NMVTIS-certified source",
    body: "Data is supplied by ClearVin LLC, an approved NMVTIS Data Provider, and rendered unmodified.",
  },
];

const REPORT_FEATURES = [
  { icon: ShieldCheck,    title: "Title history & brands",
    body: "Salvage, rebuilt, flood, hail, lemon, junk — every brand from every state the car has been registered in." },
  { icon: TriangleAlert,  title: "Accident & damage records",
    body: "Reported collisions with severity, location, airbag deployment, and the area of impact." },
  { icon: Gauge,          title: "Odometer history",
    body: "Every recorded reading from DMV transfers, inspections, and service events — spot rollback instantly." },
  { icon: Hammer,         title: "Open safety recalls",
    body: "Active NHTSA recalls with the manufacturer's remedy instructions." },
  { icon: History,        title: "Past owners & transfers",
    body: "How many owners the car has had and where it's been titled, by state and date." },
  { icon: Wrench,         title: "Service & maintenance",
    body: "Service records reported to ClearVin's data partners — oil changes, brake jobs, transmission service." },
];

export default function OrderPage() {
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
              NMVTIS-Backed Vehicle History — Instant Delivery
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-center font-headline font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tighter text-primary mb-4 sm:mb-5 animate-fade-in-up-delay">
            Get the full history
            <br />
            <span style={{ color: "var(--color-secondary-container)" }}>
              before you buy.
            </span>
          </h1>

          <p className="text-center text-base sm:text-lg text-on-surface-variant font-medium max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed animate-fade-in-up-delay-2">
            Enter any 17-character VIN to see a free preview. Order the
            complete NMVTIS-backed report for{" "}
            <strong className="text-primary">{stripeConfig.priceLabel()}</strong>{" "}
            and decode title brands, accidents, odometer history, and open
            recalls in seconds.
          </p>

          {/* VIN form — the actual product */}
          <div className="max-w-2xl mx-auto animate-fade-in-up-delay-3">
            <OrderVinForm
              priceCents={stripeConfig.priceCents()}
              mockMode={!stripeConfig.isConfigured()}
            />
          </div>

          {/* Stats row */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto animate-fade-in-up-delay-3">
            {STATS.map(({ value, label }) => (
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
              Trusted sources:
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
            {SELLING_POINTS.map(({ icon: Icon, title, body }) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S IN A REPORT ──────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 border border-primary/10 text-[11px] font-bold uppercase tracking-wider text-primary mb-3">
              <FileText className="w-3 h-3" />
              What&rsquo;s included
            </span>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
              Everything you need to decide.
            </h2>
            <p className="mt-3 text-on-surface-variant max-w-xl mx-auto">
              Every paid report contains the full NMVTIS dataset for the VIN —
              no upsells, no &ldquo;premium tiers&rdquo;.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REPORT_FEATURES.map(({ icon: Icon, title, body }) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-surface-container-lowest">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-primary tracking-tight">
            Ready when you are.
          </h2>
          <p className="mt-3 text-on-surface-variant">
            Drop a VIN into the form at the top and you&rsquo;ll see a free
            preview in seconds.
          </p>
          <a
            href="#hero"
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-primary/20"
          >
            <SearchIcon className="w-4 h-4" />
            Start with a VIN
          </a>
        </div>
      </section>
    </>
  );
}
