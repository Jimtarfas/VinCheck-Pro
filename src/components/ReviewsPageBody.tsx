/**
 * Shared body for the reviews page.
 * English mounts at the reviews.carcheckervin.com subdomain;
 * Spanish mounts at /es/reviews on www.carcheckervin.com.
 * Same JSX, locale-driven copy.
 */

import { Star, ShieldCheck, Zap, Search, ArrowRight, ExternalLink } from "lucide-react";
import TrustpilotBlock from "@/components/TrustpilotBlock";
import type { Locale } from "@/i18n/config";

const WWW = "https://www.carcheckervin.com";
const TRUSTPILOT_EVALUATE = "https://www.trustpilot.com/evaluate/www.carcheckervin.com";

const COPY = {
  en: {
    avgSuffix: "average",
    h1Line1: "CarCheckerVIN Reviews:",
    h1Line2: "trusted by car buyers, sellers & dealers",
    heroLeadPre: "Real reviews from 50,000+ free VIN checks and vehicle history reports — rated",
    heroLeadMid: "/5",
    heroLeadSuffix: "by car buyers, sellers, and dealers across all 50 states.",
    ctaPrimary: "Run a free VIN check",
    ctaSecondary: "See pricing",
    stats: [
      { value: "50K+", label: "Reports run" },
      { valueRatingSuffix: " ★", label: "Average rating" },
      { value: "Free", label: "All plans right now" },
      { value: "50", label: "States covered" },
    ],
    trustpilotInvitePre: "Want to share your own experience?",
    trustpilotInviteLink: "Write a review on Trustpilot",
    featuresHeading: "What you get with every free report",
    featuresIntro: "One VIN. Instant results. No credit card, no signup wall.",
    features: [
      {
        label: "Full VIN decode",
        desc: "Year, make, model, trim, engine, transmission, and 40+ specs from a single 17-digit VIN.",
      },
      {
        label: "Title & history check",
        desc: "NMVTIS-backed title brand lookup covering salvage, flood, lemon buyback, and stolen records.",
      },
      {
        label: "Recalls & market value",
        desc: "Open recall alerts from NHTSA plus real-time market value estimates based on comparable listings.",
      },
    ],
    reviewsHeading: "CarCheckerVIN reviews from real users",
    reviewsIntro:
      "From first-time buyers to professional auto dealers — read what people say about our free VIN check, vehicle history report, and recall lookup tools.",
    trustpilotLabel: "Trustpilot",
    readReviewAria: "Read {name}'s review on Trustpilot",
    starsAria: "{value} out of 5 stars",
    testimonials: [
      {
        name: "Carmen Liam",
        tag: "Verified Trustpilot review · United States",
        body: "the report was so good , the website smooth , i compared my report with the dealer report i got the same informations , everything was perfect",
      },
      {
        name: "Adams Daniel Brook",
        tag: "Verified Trustpilot review · United States",
        body: "i was looking for a used suv , when i found this website in google i checked the vin in their free tool, everything was good thank you",
      },
      {
        name: "David Franz Friedhof",
        tag: "Verified Trustpilot review · United States",
        body: "saved me from buying a car with hidden flood damage , the report showed everything needed , Thank you carcheckervin",
      },
      {
        name: "regano jerom",
        tag: "Verified Trustpilot review · United States",
        body: "I heard about the website in a car community on reddit, i try it , the report has complete information and the pricing was reasonable",
      },
    ],
    faqHeading: "CarCheckerVIN reviews — frequently asked questions",
    faqIntro:
      "Common questions about CarCheckerVIN's ratings, accuracy, and how it compares to paid VIN check services.",
    faqFooterPre: "Still deciding? Compare CarCheckerVIN side by side with",
    faqs: [
      {
        q: "Is CarCheckerVIN legit?",
        a: "Yes. CarCheckerVIN is a legitimate VIN decoder and vehicle history service used by car buyers, sellers, and dealers across all 50 states. Title and recall data is sourced from NMVTIS and NHTSA, the same federal databases that back paid services like Carfax and AutoCheck.",
      },
      {
        q: "Is CarCheckerVIN actually free?",
        a: "Yes — the full vehicle history report is currently free, with no credit card required. That includes the VIN decode, title brand check, recall lookup, and market value estimate. We may introduce paid premium tiers later, but reports started during the free period stay free.",
      },
      {
        q: "How does CarCheckerVIN compare to Carfax?",
        a: "CarCheckerVIN pulls from the same NMVTIS title-history backbone as Carfax and AutoCheck, plus NHTSA recall data and live market-value comparables. The biggest difference is price: CarCheckerVIN reports are free, while a single Carfax report costs about $44. Reviewers consistently say the data matches up.",
      },
      {
        q: "What do CarCheckerVIN reviews say about accuracy?",
        a: "Across 50,000+ reports, the most common review themes are accurate title brand flags (salvage, flood, lemon buyback), current recall data, and useful market-value estimates. Reviewers frequently mention catching salvage titles, flood damage, and odometer inconsistencies that sellers had not disclosed.",
      },
      {
        q: "Can dealers and fleet managers use CarCheckerVIN?",
        a: "Yes. Independent dealers use it for pre-auction screening and lot pricing, and fleet managers use it for bulk recall monitoring. Dealer-focused reviews highlight the depth of equipment and specs data, which helps with accurate pricing and customer transparency.",
      },
      {
        q: "How long does a CarCheckerVIN report take?",
        a: "Reports run in seconds. You enter a 17-digit VIN (or use the license plate lookup), and the decoded report — specs, title history, recalls, photos when available, and market value — loads instantly in your browser. No email signup or waiting period.",
      },
    ],
    finalH2: "Ready to check a VIN?",
    finalBody:
      "Free vehicle history reports — specs, photos, recalls, market value. Instant results, no credit card.",
    finalCtaPrimary: "Start free VIN check",
    finalCtaSecondary: "View all plans",
  },
  es: {
    avgSuffix: "promedio",
    h1Line1: "Reseñas de CarCheckerVIN:",
    h1Line2: "confiado por compradores, vendedores y concesionarios",
    heroLeadPre:
      "Reseñas reales de más de 50,000 revisiones VIN gratis y reportes de historial vehicular — calificado",
    heroLeadMid: "/5",
    heroLeadSuffix:
      "por compradores de autos, vendedores y concesionarios en los 50 estados.",
    ctaPrimary: "Hacer una revisión VIN gratis",
    ctaSecondary: "Ver precios",
    stats: [
      { value: "50K+", label: "Reportes ejecutados" },
      { valueRatingSuffix: " ★", label: "Calificación promedio" },
      { value: "Gratis", label: "Todos los planes ahora" },
      { value: "50", label: "Estados cubiertos" },
    ],
    trustpilotInvitePre: "¿Quieres compartir tu propia experiencia?",
    trustpilotInviteLink: "Escribe una reseña en Trustpilot",
    featuresHeading: "Lo que obtienes con cada reporte gratis",
    featuresIntro: "Un VIN. Resultados al instante. Sin tarjeta, sin muro de registro.",
    features: [
      {
        label: "Decodificación VIN completa",
        desc: "Año, marca, modelo, trim, motor, transmisión y más de 40 especificaciones desde un solo VIN de 17 dígitos.",
      },
      {
        label: "Revisión de título e historial",
        desc: "Búsqueda de marcas de título respaldada por NMVTIS que cubre salvamento, inundación, recompra por Ley Limón y registros de robo.",
      },
      {
        label: "Retiros y valor de mercado",
        desc: "Alertas de retiros abiertos de la NHTSA más estimaciones de valor de mercado en tiempo real basadas en listados comparables.",
      },
    ],
    reviewsHeading: "Reseñas de CarCheckerVIN de usuarios reales",
    reviewsIntro:
      "Desde compradores primerizos hasta concesionarios profesionales — lee lo que dice la gente sobre nuestra revisión VIN gratis, reporte de historial vehicular y herramientas de búsqueda de retiros.",
    trustpilotLabel: "Trustpilot",
    readReviewAria: "Lee la reseña de {name} en Trustpilot",
    starsAria: "{value} de 5 estrellas",
    testimonials: [
      {
        name: "Carmen Liam",
        tag: "Reseña verificada de Trustpilot · Estados Unidos",
        body: "el reporte fue muy bueno, el sitio fluido, comparé mi reporte con el del concesionario y obtuve la misma información, todo perfecto",
      },
      {
        name: "Adams Daniel Brook",
        tag: "Reseña verificada de Trustpilot · Estados Unidos",
        body: "buscaba un SUV usado, cuando encontré este sitio en Google verifiqué el VIN en su herramienta gratis, todo bien gracias",
      },
      {
        name: "David Franz Friedhof",
        tag: "Reseña verificada de Trustpilot · Estados Unidos",
        body: "me salvó de comprar un auto con daño por inundación oculto, el reporte mostró todo lo necesario, gracias carcheckervin",
      },
      {
        name: "regano jerom",
        tag: "Reseña verificada de Trustpilot · Estados Unidos",
        body: "supe del sitio en una comunidad de autos en Reddit, lo probé, el reporte tiene información completa y el precio es razonable",
      },
    ],
    faqHeading: "Reseñas de CarCheckerVIN — preguntas frecuentes",
    faqIntro:
      "Preguntas comunes sobre las calificaciones, precisión y cómo se compara CarCheckerVIN con servicios pagados de revisión VIN.",
    faqFooterPre: "¿Aún decidiendo? Compara CarCheckerVIN lado a lado con",
    faqs: [
      {
        q: "¿CarCheckerVIN es legítimo?",
        a: "Sí. CarCheckerVIN es un decodificador VIN legítimo y servicio de historial vehicular usado por compradores, vendedores y concesionarios en los 50 estados. Los datos de título y retiros provienen de NMVTIS y NHTSA, las mismas bases federales que respaldan servicios pagados como Carfax y AutoCheck.",
      },
      {
        q: "¿CarCheckerVIN es realmente gratis?",
        a: "Sí — el reporte completo de historial vehicular es actualmente gratis, sin tarjeta de crédito. Eso incluye la decodificación VIN, verificación de marca de título, búsqueda de retiros y estimación de valor de mercado. Podríamos introducir niveles premium pagados después, pero los reportes iniciados durante el periodo gratis se mantienen gratis.",
      },
      {
        q: "¿Cómo se compara CarCheckerVIN con Carfax?",
        a: "CarCheckerVIN obtiene datos de la misma columna vertebral NMVTIS de historial de título que Carfax y AutoCheck, más datos de retiros de NHTSA y comparables de valor de mercado en vivo. La mayor diferencia es el precio: los reportes de CarCheckerVIN son gratis, mientras un solo reporte de Carfax cuesta cerca de $44. Los usuarios coinciden en que los datos son equivalentes.",
      },
      {
        q: "¿Qué dicen las reseñas sobre la precisión de CarCheckerVIN?",
        a: "A través de más de 50,000 reportes, los temas más comunes en las reseñas son banderas precisas de marcas de título (salvamento, inundación, recompra por Ley Limón), datos actuales de retiros y estimaciones útiles de valor de mercado. Los usuarios mencionan frecuentemente haber detectado títulos de salvamento, daño por inundación e inconsistencias del odómetro que los vendedores no habían divulgado.",
      },
      {
        q: "¿Los concesionarios y administradores de flotas pueden usar CarCheckerVIN?",
        a: "Sí. Los concesionarios independientes lo usan para evaluación pre-subasta y precios del inventario, y los administradores de flotas lo usan para monitoreo masivo de retiros. Las reseñas enfocadas a concesionarios destacan la profundidad de datos de equipamiento y especificaciones, lo que ayuda con precios precisos y transparencia con el cliente.",
      },
      {
        q: "¿Cuánto tarda un reporte de CarCheckerVIN?",
        a: "Los reportes se ejecutan en segundos. Ingresas un VIN de 17 dígitos (o usas la búsqueda por placa), y el reporte decodificado — especificaciones, historial de título, retiros, fotos cuando están disponibles y valor de mercado — carga al instante en tu navegador. Sin registro por correo ni periodo de espera.",
      },
    ],
    finalH2: "¿Listo para revisar un VIN?",
    finalBody:
      "Reportes gratis de historial vehicular — especificaciones, fotos, retiros, valor de mercado. Resultados al instante, sin tarjeta.",
    finalCtaPrimary: "Iniciar revisión VIN gratis",
    finalCtaSecondary: "Ver todos los planes",
  },
} as const;

const FEATURE_ICONS = [Search, ShieldCheck, Zap] as const;

const REVIEW_URLS = [
  "https://www.trustpilot.com/reviews/6a12904f15413943cf4a044d",
  "https://www.trustpilot.com/reviews/6a120d8945c068e3a0ba004d",
  "https://www.trustpilot.com/reviews/6a198ea437894c11a0770f83",
  "https://www.trustpilot.com/reviews/6a22c3c4acf19a498a02e136",
] as const;

const avatarColors = [
  "bg-primary/10 text-primary",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
];

function Stars({ value, ariaTemplate }: { value: number; ariaTemplate: string }) {
  return (
    <div
      className="flex gap-0.5"
      aria-label={ariaTemplate.replace("{value}", String(value))}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-4 h-4 ${n <= value ? "fill-amber-400 text-amber-400" : "fill-none text-outline-variant"}`}
        />
      ))}
    </div>
  );
}

export default function ReviewsPageBody({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const avgRating = "4.9";

  // Locale-aware href helpers
  const heroHref = locale === "es" ? "/es#hero" : `${WWW}/#hero`;
  const pricingHref = locale === "es" ? "/es/precios" : `${WWW}/pricing`;
  const compareLinks = locale === "es"
    ? {
        carfax: "/es/carcheckervin-vs-carfax",
        autocheck: "/es/carcheckervin-vs-autocheck",
        bumper: "/es/carcheckervin-vs-bumper",
        clearvin: "/es/carcheckervin-vs-clearvin",
        vinaudit: "/es/carcheckervin-vs-vinaudit",
      }
    : {
        carfax: `${WWW}/vin-check-vs-carfax`,
        autocheck: `${WWW}/vin-check-vs-autocheck`,
        bumper: `${WWW}/vin-check-vs-bumper`,
        clearvin: `${WWW}/vin-check-vs-clearvin`,
        vinaudit: `${WWW}/vin-check-vs-vinaudit`,
      };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-5">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-white font-bold ml-1">{avgRating} {copy.avgSuffix}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-extrabold mb-4 leading-tight">
            {copy.h1Line1}<br className="hidden sm:block" /> {copy.h1Line2}
          </h1>
          <p className="text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed mb-8">
            {copy.heroLeadPre}{" "}
            <strong className="font-extrabold text-white">{avgRating}{copy.heroLeadMid}</strong>{" "}
            {copy.heroLeadSuffix}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={heroHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary-700 font-bold hover:bg-white/95 transition-all shadow-lg"
            >
              {copy.ctaPrimary} <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={pricingHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-all border border-white/20"
            >
              {copy.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 sm:px-6 bg-surface-container-low border-b border-outline-variant/20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {copy.stats.map((s, i) => {
            const value = "valueRatingSuffix" in s
              ? `${avgRating}${s.valueRatingSuffix}`
              : s.value;
            return (
              <div key={i}>
                <div className="text-2xl sm:text-3xl font-headline font-extrabold text-primary">
                  {value}
                </div>
                <div className="text-xs text-on-surface-variant mt-0.5 uppercase tracking-wider font-bold">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trustpilot trust block */}
      <section id="trustpilot" className="py-14 px-4 sm:px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <TrustpilotBlock variant="wide" />
          <p className="text-xs text-on-surface-variant text-center mt-4">
            {copy.trustpilotInvitePre}{" "}
            <a
              href={TRUSTPILOT_EVALUATE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00B67A] font-semibold hover:underline"
            >
              {copy.trustpilotInviteLink}
            </a>
            .
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 px-4 sm:px-6 bg-surface border-t border-outline-variant/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2 text-center">
            {copy.featuresHeading}
          </h2>
          <p className="text-on-surface-variant text-center mb-10 max-w-xl mx-auto">
            {copy.featuresIntro}
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {copy.features.map((f, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div
                  key={f.label}
                  className="rounded-2xl bg-surface-container-lowest p-6 border border-outline-variant/30"
                >
                  <Icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-bold text-on-surface mb-1.5">{f.label}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 bg-surface-container-low">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {copy.reviewsHeading}
          </h2>
          <p className="text-on-surface-variant mb-10 max-w-3xl">{copy.reviewsIntro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {copy.testimonials.map((t, i) => (
              <article
                key={i}
                className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-6 flex flex-col hover:shadow-md transition-shadow"
              >
                <Stars value={5} ariaTemplate={copy.starsAria} />
                <p className="text-sm text-on-surface-variant leading-relaxed mt-4 mb-5 flex-1 italic">
                  &ldquo;{t.body}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-headline font-black flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}
                  >
                    {t.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-on-surface text-sm truncate">{t.name}</p>
                    <p className="text-xs text-outline truncate">{t.tag}</p>
                  </div>
                  <a
                    href={REVIEW_URLS[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={copy.readReviewAria.replace("{name}", t.name)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#00B67A] hover:underline whitespace-nowrap"
                  >
                    {copy.trustpilotLabel}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2 text-center">
            {copy.faqHeading}
          </h2>
          <p className="text-on-surface-variant mb-10 text-center">{copy.faqIntro}</p>
          <div className="space-y-3">
            {copy.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5 open:shadow-sm"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-headline font-bold text-on-surface">
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="text-sm text-on-surface-variant text-center mt-8">
            {copy.faqFooterPre}{" "}
            <a href={compareLinks.carfax} className="text-primary font-semibold hover:underline">Carfax</a>,{" "}
            <a href={compareLinks.autocheck} className="text-primary font-semibold hover:underline">AutoCheck</a>,{" "}
            <a href={compareLinks.bumper} className="text-primary font-semibold hover:underline">Bumper</a>,{" "}
            <a href={compareLinks.clearvin} className="text-primary font-semibold hover:underline">ClearVin</a>, {locale === "es" ? "o" : "or"}{" "}
            <a href={compareLinks.vinaudit} className="text-primary font-semibold hover:underline">VinAudit</a>.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-headline font-extrabold mb-3">{copy.finalH2}</h2>
          <p className="text-primary-100 mb-7 text-lg">{copy.finalBody}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={heroHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-primary-700 font-bold hover:bg-white/95 transition-all shadow-lg text-base"
            >
              {copy.finalCtaPrimary} <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={pricingHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-all border border-white/20 text-base"
            >
              {copy.finalCtaSecondary}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export { COPY as REVIEWS_COPY };
