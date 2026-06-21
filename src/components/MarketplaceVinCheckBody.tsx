/**
 * Shared body for /marketplace-vin-check/[marketplace] and
 * /es/marketplace-vin-check/[marketplace]. Wave 17f — 5 marketplace pages
 * (facebook-marketplace, craigslist, offerup, ebay-motors, autotrader,
 * cars-com, iaai, manheim, car-auctions — copart has its own dedicated
 * page) × 2 locales rendered from one component.
 *
 * Marketplace-specific factual content (risk note, popular vehicle types,
 * long descriptions) is U.S.-market English copy — it renders verbatim on
 * both locales (same approach as LemonCheckBrandBody's handling of
 * warranty terms and BuildSheetBrandBody's handling of OEM docs).
 * Structural chrome (headings, intros, FAQs, CTAs) translates via the
 * COPY={en,es} map.
 */
import Link from "next/link";
import {
  Shield,
  Search,
  FileText,
  Clock,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { marketplaces, getMarketplaceBySlug } from "@/lib/marketplaces";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Locale } from "@/i18n/config";

export function getOtherMarketplaces(slug: string) {
  return marketplaces.filter((m) => m.slug !== slug);
}

const COPY = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbHub: "Marketplace VIN Check",
    h1: (name: string) => `${name} VIN Check`,
    heroSub: (name: string) =>
      `Buying a vehicle on ${name}? Run a VIN check first to verify the vehicle's full history before you commit to any purchase.`,
    aboutHeading: (name: string) => `Why Run a VIN Check on ${name}?`,
    riskLabels: {
      low: "Low Fraud Risk",
      medium: "Medium Fraud Risk",
      high: "High Fraud Risk",
    } as Record<"low" | "medium" | "high", string>,
    riskOn: (label: string, name: string) => `${label} on ${name}`,
    featuresHeading: "What's Included in Your VIN Report",
    featuresSub: (name: string) => `Everything you need to verify any ${name} listing`,
    features: [
      {
        title: "Title & Ownership History",
        desc: "Verify clean title, check for salvage or rebuilt brands, and see every past owner",
      },
      {
        title: "Accident & Damage Records",
        desc: "Uncover reported collisions, airbag deployments, and structural damage events",
      },
      {
        title: "Full Vehicle Specifications",
        desc: "Confirm the vehicle's engine, trim, factory options, and build details match the listing",
      },
      {
        title: "Odometer Verification",
        desc: "Detect potential rollbacks by comparing mileage records across the vehicle's history",
      },
    ],
    popularHeading: (name: string) => `Common Vehicles Found on ${name}`,
    popularSub: (name: string) =>
      `Run a VIN check on any of these vehicle types commonly listed on ${name}`,
    howHeading: (name: string) => `How to Check a VIN from ${name}`,
    howSteps: (name: string) => [
      {
        step: "1",
        title: "Find the VIN in the Listing",
        desc: `Locate the 17-character VIN in the ${name} listing, or ask the seller to provide it. You can also find it on the vehicle's dashboard or door jamb.`,
      },
      {
        step: "2",
        title: "Enter the VIN Above",
        desc: "Type or paste the VIN into the search box at the top of this page. Make sure all 17 characters are correct before submitting.",
      },
      {
        step: "3",
        title: "Review Your Report Before Buying",
        desc: `Get your full vehicle history report instantly — including title status, accident records, mileage history, and specs — before meeting the ${name} seller.`,
      },
    ],
    otherHeading: "Check Other Marketplaces",
    viewAllLabel: "View all marketplaces",
    faqHeading: "Frequently Asked Questions",
    ctaHeading: (name: string) => `Ready to Check a ${name} VIN?`,
    ctaSub: "Get your full vehicle history report before you buy",
    faqBuilder: (name: string) => [
      {
        q: `Is a VIN check free for ${name} listings?`,
        a: `Yes. Enter the 17-character VIN from any ${name} listing into the search box above to decode the vehicle and pull available history — no account or payment required. Because ${name} listings are written by the seller, an independent VIN check is the only way to confirm the vehicle is what the ad claims before you spend money or your time meeting up.`,
      },
      {
        q: `Is it safe to buy a car on ${name}?`,
        a: `Buying on ${name} can be safe if you verify the vehicle yourself. Private-party and online listings carry a higher fraud risk than franchised dealers because there is no third party confirming the title, mileage, or condition. Run the VIN above to surface accident, salvage, theft, and odometer records, meet in a public place, inspect the car in person, and never wire a deposit before seeing it.`,
      },
      {
        q: `How do I verify a VIN from a ${name} listing?`,
        a: `Copy the 17-character VIN from the ${name} ad and paste it into the search box above. When you meet the seller, confirm that same VIN appears on the driver-side dashboard, the door-jamb sticker, and the title — they must all match. A VIN shown in the listing that differs from the one on the car is a major warning sign of a cloned or misrepresented vehicle.`,
      },
      {
        q: `How do I avoid scams and curbstoners on ${name}?`,
        a: `To avoid scams on ${name}, watch for prices well below market, sellers who refuse to share the VIN, pressure to pay before inspection, and "dealers" posing as private owners (curbstoners) flipping branded cars. Run the VIN above first, confirm the seller's name matches the title, never pay by wire or gift card, and walk away from any listing where the story or paperwork does not add up.`,
      },
      {
        q: `Can I check if a ${name} car is stolen, salvage, or flood damaged?`,
        a: `Yes. Enter the VIN above to run an NMVTIS-backed check that surfaces reported salvage, rebuilt, flood, and total-loss title brands, theft records, and odometer discrepancies where they appear in national databases. These are exactly the issues a ${name} seller may not disclose, so verifying the VIN before you buy protects you from inheriting a branded or stolen vehicle you cannot legally register.`,
      },
      {
        q: `Why do private-party ${name} sales need a VIN check?`,
        a: `Private-party ${name} sales are typically sold "as-is" with no warranty and no dealer disclosure, so the buyer assumes all risk. There is no one verifying the seller's claims about accidents, mileage, or title status. A VIN history report gives you an independent record of the car's past — accidents, branded titles, odometer readings, and reported theft — so you can negotiate or walk away before handing over any money.`,
      },
    ],
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbHub: "Verificación VIN de marketplace",
    h1: (name: string) => `Verificación VIN ${name}`,
    heroSub: (name: string) =>
      `¿Comprando un vehículo en ${name}? Ejecuta primero una verificación VIN para confirmar el historial completo del vehículo antes de comprometerte a cualquier compra.`,
    aboutHeading: (name: string) => `¿Por qué ejecutar una verificación VIN en ${name}?`,
    riskLabels: {
      low: "Riesgo bajo de fraude",
      medium: "Riesgo medio de fraude",
      high: "Riesgo alto de fraude",
    } as Record<"low" | "medium" | "high", string>,
    riskOn: (label: string, name: string) => `${label} en ${name}`,
    featuresHeading: "Lo que incluye tu reporte VIN",
    featuresSub: (name: string) =>
      `Todo lo que necesitas para verificar cualquier anuncio de ${name}`,
    features: [
      {
        title: "Historial de título y propiedad",
        desc: "Verifica título limpio, revisa marcas de salvage o rebuilt y consulta cada propietario anterior",
      },
      {
        title: "Registros de accidentes y daños",
        desc: "Descubre colisiones reportadas, despliegues de airbag y eventos de daño estructural",
      },
      {
        title: "Especificaciones completas del vehículo",
        desc: "Confirma que el motor, versión, opciones de fábrica y detalles de fabricación coincidan con el anuncio",
      },
      {
        title: "Verificación de odómetro",
        desc: "Detecta posibles retrocesos comparando los registros de kilometraje a lo largo del historial del vehículo",
      },
    ],
    popularHeading: (name: string) => `Vehículos comunes que se encuentran en ${name}`,
    popularSub: (name: string) =>
      `Ejecuta una verificación VIN en cualquiera de estos tipos de vehículo publicados habitualmente en ${name}`,
    howHeading: (name: string) => `Cómo verificar un VIN de ${name}`,
    howSteps: (name: string) => [
      {
        step: "1",
        title: "Encuentra el VIN en el anuncio",
        desc: `Localiza el VIN de 17 caracteres en el anuncio de ${name}, o pídele al vendedor que te lo dé. También puedes encontrarlo en el tablero del lado del conductor o en el marco de la puerta.`,
      },
      {
        step: "2",
        title: "Ingresa el VIN arriba",
        desc: "Escribe o pega el VIN en el cuadro de búsqueda en la parte superior de esta página. Asegúrate de que los 17 caracteres sean correctos antes de enviarlo.",
      },
      {
        step: "3",
        title: "Revisa tu reporte antes de comprar",
        desc: `Obtén tu reporte completo de historial vehicular al instante — incluyendo estado del título, registros de accidentes, historial de kilometraje y especificaciones — antes de reunirte con el vendedor de ${name}.`,
      },
    ],
    otherHeading: "Verifica otros marketplaces",
    viewAllLabel: "Ver todos los marketplaces",
    faqHeading: "Preguntas frecuentes",
    ctaHeading: (name: string) => `¿Listo para verificar un VIN de ${name}?`,
    ctaSub: "Obtén tu reporte completo de historial vehicular antes de comprar",
    faqBuilder: (name: string) => [
      {
        q: `¿La verificación VIN es gratis para los anuncios de ${name}?`,
        a: `Sí. Ingresa el VIN de 17 caracteres de cualquier anuncio de ${name} en el cuadro de búsqueda de arriba para decodificar el vehículo y obtener el historial disponible — sin cuenta ni pago requerido. Como los anuncios de ${name} los escribe el vendedor, una verificación VIN independiente es la única forma de confirmar que el vehículo es lo que el anuncio dice antes de gastar tu dinero o tu tiempo yendo a verlo.`,
      },
      {
        q: `¿Es seguro comprar un auto en ${name}?`,
        a: `Comprar en ${name} puede ser seguro si verificas el vehículo por tu cuenta. Los anuncios de particulares y en línea tienen un riesgo de fraude mayor que los concesionarios franquiciados porque no hay un tercero que confirme el título, el kilometraje o la condición. Ejecuta el VIN arriba para revelar registros de accidentes, salvage, robo y odómetro, reúnete en un lugar público, inspecciona el auto en persona y nunca transfieras un depósito antes de verlo.`,
      },
      {
        q: `¿Cómo verifico un VIN de un anuncio de ${name}?`,
        a: `Copia el VIN de 17 caracteres del anuncio de ${name} y pégalo en el cuadro de búsqueda de arriba. Cuando te reúnas con el vendedor, confirma que ese mismo VIN aparezca en el tablero del lado del conductor, en la calcomanía del marco de la puerta y en el título — los tres deben coincidir. Un VIN mostrado en el anuncio que difiera del que está en el auto es una señal de alerta importante de un vehículo clonado o mal representado.`,
      },
      {
        q: `¿Cómo evito estafas y curbstoners en ${name}?`,
        a: `Para evitar estafas en ${name}, vigila precios muy por debajo del mercado, vendedores que se nieguen a compartir el VIN, presión para pagar antes de inspeccionar y "concesionarios" haciéndose pasar por propietarios particulares (curbstoners) revendiendo autos con marcas en el título. Ejecuta primero el VIN arriba, confirma que el nombre del vendedor coincida con el título, nunca pagues por transferencia bancaria o tarjeta de regalo y aléjate de cualquier anuncio donde la historia o el papeleo no cuadre.`,
      },
      {
        q: `¿Puedo verificar si un auto de ${name} está robado, es salvage o tiene daño por inundación?`,
        a: `Sí. Ingresa el VIN arriba para ejecutar una verificación respaldada por NMVTIS que revele marcas de título reportadas como salvage, rebuilt, flood y total-loss, registros de robo y discrepancias de odómetro donde aparezcan en bases de datos nacionales. Esos son justamente los problemas que un vendedor de ${name} podría no revelar, por lo que verificar el VIN antes de comprar te protege de heredar un vehículo con marca de título o robado que no podrás registrar legalmente.`,
      },
      {
        q: `¿Por qué las ventas particulares de ${name} necesitan una verificación VIN?`,
        a: `Las ventas particulares de ${name} suelen venderse "tal cual" sin garantía y sin la divulgación que da un concesionario, así que el comprador asume todo el riesgo. No hay nadie verificando las afirmaciones del vendedor sobre accidentes, kilometraje o estado del título. Un reporte de historial VIN te da un registro independiente del pasado del auto — accidentes, marcas de título, lecturas de odómetro y robos reportados — para que puedas negociar o retirarte antes de entregar dinero.`,
      },
    ],
  },
} as const;

const FEATURE_ICONS = [Shield, Search, FileText, Clock] as const;

const riskColors: Record<
  "low" | "medium" | "high",
  { bg: string; border: string; text: string; icon: string }
> = {
  low: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", icon: "text-green-600" },
  medium: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800", icon: "text-yellow-600" },
  high: { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", icon: "text-red-600" },
};

export default function MarketplaceVinCheckBody({
  marketplaceSlug,
  locale = "en",
}: {
  marketplaceSlug: string;
  locale?: Locale;
}) {
  const marketplace = getMarketplaceBySlug(marketplaceSlug);
  if (!marketplace) return null;

  const copy = COPY[locale];
  const homeHref = locale === "es" ? "/es" : "/";
  const hubHref =
    locale === "es" ? "/es/marketplace-vin-check" : "/marketplace-vin-check";
  const marketplaceBaseHref =
    locale === "es" ? "/es/marketplace-vin-check" : "/marketplace-vin-check";

  const risk = riskColors[marketplace.riskLevel];
  const faqs = copy.faqBuilder(marketplace.name);

  const otherMarketplaces = getOtherMarketplaces(marketplace.slug);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs
              onDark
              items={[
                { label: copy.breadcrumbHome, href: homeHref },
                { label: copy.breadcrumbHub, href: hubHref },
                { label: marketplace.name },
              ]}
            />
          </div>
          <div className="flex items-center gap-3 mb-4">
            {marketplace.icon && (
              <span className="text-4xl">{marketplace.icon}</span>
            )}
            <h1 className="text-4xl sm:text-5xl font-bold">{copy.h1(marketplace.name)}</h1>
          </div>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">
            {copy.heroSub(marketplace.name)}
          </p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" onDark locale={locale} />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {copy.aboutHeading(marketplace.name)}
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>{marketplace.longDesc.split(". ")[0]}.</p>
            <p>{marketplace.longDesc.split(". ").slice(1).join(". ")}</p>
          </div>
        </div>
      </section>

      {/* Risk Warning */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-start gap-4 p-5 rounded-xl border ${risk.bg} ${risk.border}`}>
            <AlertTriangle className={`w-6 h-6 flex-shrink-0 mt-0.5 ${risk.icon}`} />
            <div>
              <h3 className={`font-bold text-base mb-1 ${risk.text}`}>
                {copy.riskOn(copy.riskLabels[marketplace.riskLevel], marketplace.name)}
              </h3>
              <p className={`text-sm leading-relaxed ${risk.text}`}>{marketplace.riskNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {copy.featuresHeading}
          </h2>
          <p className="text-slate-700 mb-8">{copy.featuresSub(marketplace.name)}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {copy.features.map((f, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div
                  key={f.title}
                  className="flex items-start gap-3 p-5 bg-white rounded-xl border border-slate-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{f.title}</h3>
                    <p className="text-sm text-slate-700 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular vehicle types */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {copy.popularHeading(marketplace.name)}
          </h2>
          <p className="text-slate-700 mb-8">{copy.popularSub(marketplace.name)}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {marketplace.popular.map((type) => (
              <div
                key={type}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center"
              >
                <span className="text-sm font-medium text-slate-700">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            {copy.howHeading(marketplace.name)}
          </h2>
          <div className="space-y-4">
            {copy.howSteps(marketplace.name).map(({ step, title, desc }) => (
              <div
                key={step}
                className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-700 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other marketplaces */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {copy.otherHeading}
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherMarketplaces.map((m) => (
              <Link
                key={m.slug}
                href={`${marketplaceBaseHref}/${m.slug}`}
                className="px-4 py-2 bg-slate-50 text-slate-700 text-sm rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 hover:text-primary-700 transition-all font-medium"
              >
                {m.icon ? `${m.icon} ` : ""}{m.name}
              </Link>
            ))}
          </div>
          <Link
            href={hubHref}
            className="inline-flex items-center gap-1.5 mt-6 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors"
          >
            {copy.viewAllLabel} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            {copy.faqHeading}
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0 pr-2">{f.q}</h3>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-2xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {copy.ctaHeading(marketplace.name)}
          </h2>
          <p className="text-primary-100 mb-6">{copy.ctaSub}</p>
          <VinSearchForm size="sm" locale={locale} />
        </div>
      </section>
    </>
  );
}

/**
 * Export the FAQ array builder so the page-level FAQ JSON-LD stays in
 * sync with the visible FAQs without duplicating copy.
 */
export function buildMarketplaceFaqs(marketplaceSlug: string, locale: Locale) {
  const mp = getMarketplaceBySlug(marketplaceSlug);
  if (!mp) return [];
  return COPY[locale].faqBuilder(mp.name);
}
