/**
 * Shared body for /marketplace-vin-check (index) and /es/marketplace-vin-check.
 * Wave 18d — full English layout in both locales via COPY={en,es}.
 *
 * The marketplaces[] data (name, slug, description, riskLevel, icon) is
 * platform-factual and stays English on both locales per the Wave 17 pattern.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { marketplaces } from "@/lib/marketplaces";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "Marketplace VIN Check",
    h1: "Marketplace VIN Check — Verify Before You Buy",
    intro: "Buying a vehicle from an online marketplace? Run a VIN check first. Select your platform below or enter a VIN directly to get a full vehicle history report.",
    h2Grid: "VIN Check by Marketplace",
    gridSub: "Select the platform where you found the vehicle to learn about its specific risks and run a VIN check",
    cardCta: "VIN Check",
    riskLow: "Low Risk",
    riskMed: "Medium Risk",
    riskHigh: "High Risk",
    h2Faq: "Frequently Asked Questions",
    faqSub: "What to know before buying a vehicle from any online marketplace or private seller",
    ctaHeading: "Check Any Marketplace VIN Now",
    ctaSub: "Works with vehicles from any platform — private sellers, dealers, or auctions",
    faqs: [
      { q: "Why should I run a VIN check before buying from an online marketplace?", a: "Online marketplace listings are written by the seller, and most private-party sales are 'as-is' with no dealer disclosure or warranty — so the buyer carries all of the risk. A VIN check gives you an independent record of the vehicle's past, including title brands, reported accidents, odometer readings, and theft records, so you can confirm the car matches the ad before you spend money or time meeting up." },
      { q: "Is a marketplace VIN check free?", a: "Yes. Enter the 17-character VIN from any listing into the search box above to decode the vehicle and pull available history — no account or payment required to start. Because marketplace ads aren't verified by any third party, an independent VIN check is the most reliable way to confirm a vehicle is what the seller claims." },
      { q: "What scams are common in private and online car sales?", a: "The most common frauds are curbstoning (an unlicensed dealer posing as a private owner to flip cars, often with hidden problems), title washing (re-titling a branded vehicle in another state to erase a salvage, flood, or lemon brand), odometer rollback (winding back the mileage to inflate value), and VIN cloning (putting a legitimate vehicle's VIN on a stolen or branded one). A VIN history report and an in-person inspection help surface all four before you pay." },
      { q: "Can a seller fake or swap a VIN?", a: "It happens — it's called VIN cloning, where a thief copies a valid VIN from a similar legitimate vehicle and attaches it to a stolen or branded car. To protect yourself, confirm the VIN in the listing matches the VIN on the driver-side dashboard, the door-jamb sticker, and the paper title, and check that none of those plates look tampered with. A VIN that differs across the car or the paperwork is a major red flag." },
      { q: "What should I look for in a marketplace listing before reaching out?", a: "Be cautious of prices well below market value, a seller who refuses to share the full 17-character VIN, vague or copied descriptions, pressure to pay a deposit before you've seen the car, and 'private' sellers who seem to have many vehicles. Run the VIN first, confirm the seller's name matches the title, and treat any listing where the story or paperwork doesn't add up as a reason to walk away." },
      { q: "Can I check if a marketplace car is stolen, salvage, or flood damaged?", a: "Yes. Entering the VIN above runs an NMVTIS-backed check that surfaces reported salvage, rebuilt, flood, and total-loss title brands, theft records, and odometer discrepancies where they appear in national databases. These are exactly the issues a private seller may not disclose, so verifying the VIN protects you from inheriting a branded or stolen vehicle you may not be able to legally register." },
      { q: "How do I pay safely when buying a car from an online marketplace?", a: "Never wire money, send gift cards, or pay a deposit before you've inspected the vehicle in person and confirmed the VIN and title. Meet in a public place during the day, verify the seller's identity matches the title, and prefer traceable payment methods. If a seller pushes you to pay quickly or off-platform before you can verify the car, treat it as a warning sign." },
      { q: "Does a VIN check replace an in-person inspection?", a: "No — they work together. A VIN history report tells you the documented past (title brands, accidents, mileage, theft), but it can't reveal hidden mechanical issues or confirm the car on the lot is the one in the report. Use the VIN check to screen the listing, then inspect the vehicle in person or get an independent pre-purchase inspection, and match the VIN on the car to the report and the title." },
    ],
  },
  es: {
    home: "Inicio",
    crumb: "Verificación VIN de marketplace",
    h1: "Verificación VIN de marketplace — Verifica antes de comprar",
    intro: "¿Comprando un vehículo en un marketplace en línea? Haz primero una verificación VIN. Selecciona tu plataforma abajo o ingresa un VIN directamente para obtener un reporte completo de historial vehicular.",
    h2Grid: "Verificación VIN por marketplace",
    gridSub: "Selecciona la plataforma donde encontraste el vehículo para conocer sus riesgos específicos y hacer una verificación VIN",
    cardCta: "Verificación VIN",
    riskLow: "Riesgo bajo",
    riskMed: "Riesgo medio",
    riskHigh: "Riesgo alto",
    h2Faq: "Preguntas frecuentes",
    faqSub: "Qué saber antes de comprar un vehículo en cualquier marketplace en línea o vendedor privado",
    ctaHeading: "Verifica cualquier VIN de marketplace ahora",
    ctaSub: "Funciona con vehículos de cualquier plataforma — vendedores privados, concesionarios o subastas",
    faqs: [
      { q: "¿Por qué debería hacer una verificación VIN antes de comprar en un marketplace en línea?", a: "Los listados de marketplaces en línea son escritos por el vendedor, y la mayoría de ventas privadas son 'tal cual' sin declaración del concesionario ni garantía — así que el comprador carga con todo el riesgo. Una verificación VIN te da un registro independiente del pasado del vehículo, incluyendo marcas en el título, accidentes reportados, lecturas de odómetro y registros de robo, para confirmar que el auto coincide con el anuncio antes de gastar dinero o tiempo en una reunión." },
      { q: "¿Una verificación VIN de marketplace es gratis?", a: "Sí. Ingresa el VIN de 17 caracteres de cualquier listado en el cuadro de búsqueda de arriba para decodificar el vehículo y extraer el historial disponible — sin cuenta ni pago para comenzar. Como los anuncios de marketplace no son verificados por terceros, una verificación VIN independiente es la forma más confiable de confirmar que un vehículo es lo que el vendedor afirma." },
      { q: "¿Qué estafas son comunes en ventas privadas y en línea de autos?", a: "Los fraudes más comunes son curbstoning (un concesionario sin licencia haciéndose pasar por dueño privado para revender autos, a menudo con problemas ocultos), lavado de título (re-titular un vehículo marcado en otro estado para borrar una marca de salvamento, inundación o limón), rollback de odómetro (retroceder el kilometraje para inflar el valor) y clonación de VIN (poner el VIN de un vehículo legítimo en uno robado o marcado). Un reporte de historial VIN y una inspección presencial ayudan a descubrir los cuatro antes de pagar." },
      { q: "¿Un vendedor puede falsificar o cambiar un VIN?", a: "Sucede — se llama clonación de VIN, donde un ladrón copia un VIN válido de un vehículo legítimo similar y lo coloca en un auto robado o marcado. Para protegerte, confirma que el VIN en el listado coincida con el VIN en el tablero del lado del conductor, la calcomanía del marco de la puerta y el título físico, y verifica que ninguna de esas placas se vea alterada. Un VIN que difiere en el auto o en los papeles es una bandera roja importante." },
      { q: "¿Qué debo buscar en un listado de marketplace antes de contactar?", a: "Ten cuidado con precios muy por debajo del valor de mercado, un vendedor que se niega a compartir el VIN completo de 17 caracteres, descripciones vagas o copiadas, presión para pagar un depósito antes de haber visto el auto y vendedores 'privados' que parecen tener muchos vehículos. Haz primero la verificación VIN, confirma que el nombre del vendedor coincida con el título, y trata cualquier listado donde la historia o los papeles no cuadren como una razón para retirarte." },
      { q: "¿Puedo verificar si un auto de marketplace está robado, es de salvamento o dañado por inundación?", a: "Sí. Ingresar el VIN arriba ejecuta una verificación respaldada por NMVTIS que muestra marcas de título de salvamento, reconstruido, inundación y pérdida total reportadas, registros de robo y discrepancias de odómetro donde aparecen en bases de datos nacionales. Estos son exactamente los problemas que un vendedor privado puede no declarar, así que verificar el VIN te protege de heredar un vehículo marcado o robado que podrías no poder registrar legalmente." },
      { q: "¿Cómo pago de forma segura al comprar un auto en un marketplace en línea?", a: "Nunca transfieras dinero, envíes tarjetas de regalo ni pagues un depósito antes de haber inspeccionado el vehículo en persona y confirmado el VIN y el título. Reúnete en un lugar público durante el día, verifica que la identidad del vendedor coincida con el título y prefiere métodos de pago rastreables. Si un vendedor te presiona para pagar rápido o fuera de la plataforma antes de poder verificar el auto, considéralo una señal de advertencia." },
      { q: "¿Una verificación VIN reemplaza una inspección presencial?", a: "No — trabajan juntas. Un reporte de historial VIN te dice el pasado documentado (marcas en el título, accidentes, kilometraje, robo), pero no puede revelar problemas mecánicos ocultos ni confirmar que el auto en el lote es el del reporte. Usa la verificación VIN para filtrar el listado, luego inspecciona el vehículo en persona u obtén una inspección independiente previa a la compra, y compara el VIN del auto con el reporte y el título." },
    ],
  },
} as const;

const riskBadgeClass = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
} as const;

interface Props { locale: Locale; }

export default function MarketplaceIndexBody({ locale }: Props) {
  const c = COPY[locale];
  const riskLabel = (level: "low" | "medium" | "high") =>
    level === "low" ? c.riskLow : level === "medium" ? c.riskMed : c.riskHigh;
  const cardHref = (slug: string) =>
    locale === "es" ? `/es/marketplace-vin-check/${slug}` : `/marketplace-vin-check/${slug}`;

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs
              onDark
              items={[
                { label: c.home, href: locale === "es" ? "/es" : "/" },
                { label: c.crumb },
              ]}
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{c.h1}</h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">{c.intro}</p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" onDark />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.h2Grid}</h2>
          <p className="text-slate-700 mb-10">{c.gridSub}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {marketplaces.map((m) => (
              <Link
                key={m.slug}
                href={cardHref(m.slug)}
                className="flex flex-col p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{m.icon}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${riskBadgeClass[m.riskLevel]}`}>
                    {riskLabel(m.riskLevel)}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-primary-700 transition-colors mb-1">
                  {m.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{m.description}</p>
                <div className="flex items-center gap-1 mt-4 text-primary-600 text-sm font-medium">
                  {c.cardCta} <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.h2Faq}</h2>
          <p className="text-slate-700 mb-8">{c.faqSub}</p>
          <div className="space-y-3">
            {c.faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden">
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

      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">{c.ctaHeading}</h2>
          <p className="text-primary-100 mb-6">{c.ctaSub}</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}

export const MARKETPLACE_INDEX_FAQS_EN = COPY.en.faqs;
export const MARKETPLACE_INDEX_FAQS_ES = COPY.es.faqs;
