"use client";

import { useState } from "react";
import Link from "@/components/LocaleLink";
import {
  Layers,
  Mail,
  Lock,
  LoaderCircle,
  ShieldCheck,
  Clock,
  Star,
  TriangleAlert,
  Check,
} from "lucide-react";
import BundleSelect from "@/app/order/_components/BundleSelect";
import {
  pricingOptions,
  formatUsd,
  CREDIT_VALIDITY_MONTHS,
  type PricingOption,
} from "@/lib/pricing";
import type { Locale } from "@/i18n/config";

interface Props {
  /** The VIN being previewed — carried into checkout. */
  vin: string;
  /** Human label (e.g. "2018 Jeep Grand Cherokee") stored on the order. */
  vehicleLabel?: string;
  /** Unique id for the email input — set when more than one copy of the card
   *  is rendered (desktop sidebar + mobile inline) so the ids don't collide. */
  inputId?: string;
  locale?: Locale;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const COPY = {
  en: {
    title: "Buy more, pay less",
    subtitle: "Checking a few cars? Prepaid packs drop the per-report price.",
    orderSummary: "Order Summary",
    reportOn: "Report on",
    thisVehicle: "this vehicle",
    perReport: (size: number, per: string) => `${size}-report pack — ${per} per report`,
    fullReport: "Full vehicle history report",
    savedAsCredits: (n: number, months: number) =>
      `${n} report${n > 1 ? "s" : ""} saved as credits — good for ${months} months`,
    todaysTotal: "Today's Total",
    salesTax: "* Sales tax may be applicable in some states",
    creditsHint: (n: number) =>
      `One report unlocks now; the other ${n} become account credits, good for 12 months on any VIN.`,
    nmvtis: "NMVTIS-backed data",
    instant: "Instant access",
    trustpilot: "Trustpilot",
    emailLabel: "Email for receipt & report",
    emailPlaceholder: "you@example.com",
    emailHint: "We'll send your full report and receipt here.",
    startingCheckout: "Starting checkout…",
    orderReports: (n: number, total: string) => `Order ${n} reports — ${total}`,
    orderFull: (total: string) => `Order full report — ${total}`,
    invalidEmail: "Enter a valid email so we can deliver your report.",
    checkoutFailed: "Checkout failed.",
    couldNotStart: (status: number) => `Could not start checkout (error ${status}).`,
    consentPre: "By clicking ",
    consentBold: "Order Full Report",
    consentMid: " you agree to ",
    consentTerms: "CarCheckerVIN's T&C",
    consentAnd: " and ",
    consentDisclaimer: "NMVTIS disclaimer",
  },
  es: {
    title: "Compra más, paga menos",
    subtitle: "¿Vas a revisar varios autos? Los paquetes prepagados bajan el precio por reporte.",
    orderSummary: "Resumen del pedido",
    reportOn: "Reporte sobre",
    thisVehicle: "este vehículo",
    perReport: (size: number, per: string) => `Paquete de ${size} reportes — ${per} por reporte`,
    fullReport: "Reporte completo de historial vehicular",
    savedAsCredits: (n: number, months: number) =>
      `${n} reporte${n > 1 ? "s" : ""} guardado${n > 1 ? "s" : ""} como créditos — válidos por ${months} meses`,
    todaysTotal: "Total de hoy",
    salesTax: "* En algunos estados puede aplicarse impuesto sobre ventas",
    creditsHint: (n: number) =>
      `Un reporte se desbloquea ahora; los otros ${n} quedan como créditos en tu cuenta, válidos por 12 meses para cualquier VIN.`,
    nmvtis: "Datos NMVTIS",
    instant: "Acceso instantáneo",
    trustpilot: "Trustpilot",
    emailLabel: "Correo para el recibo y el reporte",
    emailPlaceholder: "tu@ejemplo.com",
    emailHint: "Te enviaremos aquí tu reporte completo y el recibo.",
    startingCheckout: "Iniciando pago…",
    orderReports: (n: number, total: string) => `Pedir ${n} reportes — ${total}`,
    orderFull: (total: string) => `Pedir reporte completo — ${total}`,
    invalidEmail: "Ingresa un correo válido para poder enviarte el reporte.",
    checkoutFailed: "El pago falló.",
    couldNotStart: (status: number) => `No se pudo iniciar el pago (error ${status}).`,
    consentPre: "Al hacer clic en ",
    consentBold: "Pedir Reporte Completo",
    consentMid: " aceptas los ",
    consentTerms: "T&C de CarCheckerVIN",
    consentAnd: " y el ",
    consentDisclaimer: "aviso NMVTIS",
  },
  fr: {
    title: "Achète plus, paie moins",
    subtitle: "Tu vérifies plusieurs voitures ? Les packs prépayés font baisser le prix par rapport.",
    orderSummary: "Récapitulatif de la commande",
    reportOn: "Rapport sur",
    thisVehicle: "ce véhicule",
    perReport: (size: number, per: string) => `Pack de ${size} rapports — ${per} par rapport`,
    fullReport: "Rapport complet d'historique du véhicule",
    savedAsCredits: (n: number, months: number) =>
      `${n} rapport${n > 1 ? "s" : ""} conservé${n > 1 ? "s" : ""} en crédits — valable ${months} mois`,
    todaysTotal: "Total à payer",
    salesTax: "* Une taxe de vente peut s'appliquer dans certains États",
    creditsHint: (n: number) =>
      `Un rapport se débloque tout de suite ; les ${n} autres deviennent des crédits sur ton compte, valables 12 mois sur n'importe quel VIN.`,
    nmvtis: "Données NMVTIS",
    instant: "Accès immédiat",
    trustpilot: "Trustpilot",
    emailLabel: "E-mail pour le reçu et le rapport",
    emailPlaceholder: "toi@exemple.com",
    emailHint: "On t'enverra ton rapport complet et le reçu à cette adresse.",
    startingCheckout: "Démarrage du paiement…",
    orderReports: (n: number, total: string) => `Commander ${n} rapports — ${total}`,
    orderFull: (total: string) => `Commander le rapport complet — ${total}`,
    invalidEmail: "Saisis un e-mail valide pour qu'on puisse t'envoyer le rapport.",
    checkoutFailed: "Le paiement a échoué.",
    couldNotStart: (status: number) => `Impossible de démarrer le paiement (erreur ${status}).`,
    consentPre: "En cliquant sur ",
    consentBold: "Commander le rapport complet",
    consentMid: " tu acceptes les ",
    consentTerms: "CGU de CarCheckerVIN",
    consentAnd: " et l'",
    consentDisclaimer: "avis NMVTIS",
  },
} as const;

/**
 * Sidebar checkout on the report preview: pick a single report or a discounted
 * prepaid pack, enter an email, and go straight to Stripe. We POST the chosen
 * pack SIZE (the price is re-derived server-side) plus the email to
 * /api/order/checkout and hard-navigate to the returned Stripe URL, so the
 * buyer never hops through /order — checkout happens in place on the preview.
 */
export default function BundleUpsellCard({
  vin,
  vehicleLabel,
  inputId = "bundle-email",
  locale = "en",
}: Props) {
  const c = COPY[locale];
  const options: PricingOption[] = pricingOptions();
  const [selected, setSelected] = useState(1);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const current = options.find((o) => o.size === selected) ?? options[0];

  async function handleOrder() {
    const e = email.trim();
    if (!EMAIL_RE.test(e)) {
      setError(c.invalidEmail);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/order/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vin,
          email: e,
          vehicleLabel,
          bundleSize: selected > 1 ? selected : undefined,
          // A cancelled/failed Stripe payment returns the buyer to this exact
          // preview rather than the homepage.
          returnTo:
            typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.url) {
        throw new Error(json?.error || c.couldNotStart(res.status));
      }
      // Stripe Checkout lives on an external origin — hard-navigate.
      window.location.assign(json.url);
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : c.checkoutFailed);
    }
  }

  return (
    <div className="bg-surface-container-lowest rounded-[2rem] shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-surface-container">
        <h3 className="font-headline font-bold text-on-surface flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" /> {c.title}
        </h3>
        <p className="text-xs text-on-surface-variant mt-0.5">{c.subtitle}</p>
      </div>
      <div className="p-5">
        {/* Order summary — mirrors the selected option so the buyer sees exactly
            what they're paying for, and the running total, up front. */}
        <div className="rounded-2xl bg-surface-container-low border border-outline-variant p-4">
          <h4 className="font-headline font-bold text-on-surface text-sm mb-3">
            {c.orderSummary}
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2 text-on-surface-variant">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
              <span>
                {c.reportOn}{" "}
                <strong className="text-on-surface font-bold">
                  {vehicleLabel || c.thisVehicle}
                </strong>
              </span>
            </li>
            <li className="flex items-start gap-2 text-on-surface-variant">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
              <span>
                {current.isBundle
                  ? c.perReport(current.size, formatUsd(current.perReportCents))
                  : c.fullReport}
              </span>
            </li>
            {current.isBundle && (
              <li className="flex items-start gap-2 text-on-surface-variant">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span>{c.savedAsCredits(current.size - 1, CREDIT_VALIDITY_MONTHS)}</span>
              </li>
            )}
          </ul>
          <div className="mt-3 pt-3 border-t border-outline-variant flex items-baseline justify-between gap-3">
            <span className="font-headline font-bold text-on-surface">
              {c.todaysTotal}
            </span>
            <span className="font-headline font-black text-2xl sm:text-3xl text-on-surface leading-none">
              {formatUsd(current.priceCents)}
            </span>
          </div>
          <p className="mt-2 text-[11px] italic text-on-surface-variant leading-snug">
            {c.salesTax}
          </p>
        </div>

        <div className="mt-5">
          <BundleSelect options={options} selected={selected} onSelect={setSelected} />
        </div>

        {current.isBundle && (
          <p className="mt-3 text-[11px] text-on-surface-variant leading-relaxed">
            {c.creditsHint(current.size - 1)}
          </p>
        )}

        {/* Trust row */}
        <div className="mt-4 pb-4 border-b border-surface-container flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-on-surface-variant">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> {c.nmvtis}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-primary" /> {c.instant}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
              ))}
            </span>
            <span className="font-bold text-on-surface">{c.trustpilot}</span>
          </span>
        </div>

        {/* Inline checkout — email + straight to Stripe, no /order hop. */}
        <div className="mt-4">
          <label
            htmlFor={inputId}
            className="block text-[13px] font-bold text-on-surface mb-1.5"
          >
            {c.emailLabel}
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              id={inputId}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !submitting) handleOrder();
              }}
              placeholder={c.emailPlaceholder}
              className="w-full pl-9 pr-3 py-2.5 text-base sm:text-sm rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none bg-surface-container-lowest"
            />
          </div>
          <p className="mt-1.5 text-[11px] text-on-surface-variant leading-snug">
            {c.emailHint}
          </p>
        </div>

        <button
          type="button"
          onClick={handleOrder}
          disabled={submitting}
          className="mt-4 w-full bg-primary hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition"
        >
          {submitting ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              {c.startingCheckout}
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              {current.isBundle
                ? c.orderReports(current.size, formatUsd(current.priceCents))
                : c.orderFull(formatUsd(current.priceCents))}
            </>
          )}
        </button>

        {error && (
          <p className="mt-2.5 text-xs text-red-600 flex items-center gap-1.5">
            <TriangleAlert className="w-3.5 h-3.5 flex-shrink-0" />
            {error}
          </p>
        )}

        {/* Consent line — inline links inside the sentence itself. */}
        <p className="mt-3 text-[11px] text-on-surface-variant leading-relaxed">
          {c.consentPre}
          <strong className="text-on-surface">{c.consentBold}</strong>
          {c.consentMid}
          <Link
            href="/terms"
            className="underline text-primary hover:text-primary-700 font-semibold"
          >
            {c.consentTerms}
          </Link>
          {c.consentAnd}
          <Link
            href="/disclaimer"
            className="underline text-primary hover:text-primary-700 font-semibold"
          >
            {c.consentDisclaimer}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
