/**
 * Shared body for /market-value and /es/market-value.
 * Wave 18a — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "Market Value",
    h1: "Car Market Value by VIN",
    intro:
      "Knowing a vehicle's current market value is essential whether you're buying, selling, or trading in. A VIN-based valuation pulls the exact factory configuration — trim level, options, and equipment — to generate a precise value rather than an average for the model. Understanding the difference between trade-in, private party, and dealer retail values puts you in a far stronger negotiating position before any transaction.",
    ctaTopHeading: "Get the Current Market Value",
    h2Calc: "How Vehicle Market Value Is Calculated",
    calc1:
      "Vehicle market value is not a fixed number — it's a data-driven estimate derived from actual transaction prices in the marketplace. Valuation providers collect millions of real dealer sales, auction results, private party listings, and trade-in transactions to build statistical models that predict what a specific vehicle should sell for under current market conditions.",
    calc2:
      "The VIN anchors the valuation to the exact factory configuration of the vehicle. A base model and a fully optioned version of the same car can have dramatically different market values. Options like all-wheel drive, premium audio, navigation, sunroof, and towing packages all carry measurable market premiums that are included in a VIN-specific valuation but would be missed in a generic model-year estimate.",
    calc3Pre: "Mileage, condition, accident history, and title status are the most significant adjustment factors after factory configuration. A vehicle with an ",
    accidentLink: "accident history",
    calc3Mid: " or a ",
    salvageLink: "salvage title",
    calc3Suffix: " will always trade at a discount to a comparable clean-title vehicle.",
    h2TPR: "Trade-In vs. Private Party vs. Retail",
    tprIntro:
      "There are three primary market value benchmarks used in the automotive industry, and understanding each one prevents you from leaving money on the table or overpaying for a vehicle.",
    tprBullets: [
      { strong: "Trade-in value", rest: " — what a dealer will offer you for your vehicle. This is the lowest of the three values, as the dealer needs room to recondition and profit on resale." },
      { strong: "Private party value", rest: " — what you can expect to sell for directly to another consumer. This is typically 10–20% higher than trade-in value." },
      { strong: "Dealer retail value", rest: " — what a dealer charges on the lot. This is the highest value and includes dealer reconditioning, overhead, and profit margin." },
    ],
    tprAfter:
      "When buying from a dealer, the retail value is your ceiling — you should never pay above this benchmark. When selling privately, the private party value is your target. When trading in, knowing the trade-in value gives you a baseline to evaluate the dealer's offer.",
    h2Mileage: "Why Mileage and Options Matter",
    mil1Pre:
      "Mileage is one of the single biggest value drivers for used vehicles. The industry uses average annual mileage benchmarks (typically 12,000–15,000 miles per year) to assess whether a vehicle is high or low mileage for its age. Every 10,000 miles below average adds value; every 10,000 miles above average reduces it. Use our ",
    odoLink: "odometer check",
    mil1Suffix: " to verify that the mileage claimed by the seller is accurate before accepting any valuation.",
    mil2:
      "Factory options have a compounding effect on value. All-wheel drive and four-wheel drive add significant premiums on trucks and SUVs — often $2,000–$5,000 depending on the market. Performance packages, towing packages, and premium trim levels carry their own premiums that persist through multiple ownership cycles.",
    mil3:
      "Condition is the most subjective factor. Valuation guides use condition grades from Excellent to Poor, and the spread between grades can be several thousand dollars. An honest condition assessment — accounting for paint, interior wear, mechanical soundness, and any prior damage — produces the most accurate market value estimate.",
    h2Regional: "Regional Market Variations",
    reg1:
      "Used car prices are not uniform across the country. Supply and demand dynamics, local preferences, climate, and seasonal patterns create significant regional price variation for the same vehicle. Four-wheel drive trucks command higher premiums in the Mountain West and Upper Midwest than in the Southeast. Convertibles and sports cars sell at a premium in warm-weather markets like California and Florida compared to cold-climate markets.",
    reg2:
      "Salt-belt states (where road salt is used heavily in winter) create additional regional dynamics — vehicles from these states often have accelerated rust and corrosion, which reduces their value compared to equivalent vehicles from dry-climate states like Arizona or Nevada. A VIN check combined with registration history can reveal whether a vehicle spent its life in a high-corrosion environment.",
    h2BestPrice: "How to Get the Best Price When Selling",
    bp1Pre: "Sellers who arrive with documentation consistently achieve higher transaction prices. Running a clean ",
    vinLink: "VIN history report",
    bp1Suffix: " before listing gives buyers confidence and justifies asking closer to private party value. Pair this with complete service records, a current inspection, and any remaining factory warranty documentation.",
    bp2:
      "Timing matters as well. Convertibles and sports cars peak in spring and summer. Four-wheel drive trucks and SUVs command the highest prices just before winter. Listing during peak demand for your vehicle type can add hundreds or thousands to the final sale price.",
    bp3:
      "Always check for open recalls before listing your vehicle. Buyers will find them during their due diligence, and having the recall already completed removes an objection and demonstrates responsible ownership.",
    faqHeading: "Frequently Asked Questions",
    ctaBottomHeading: "Find Out What Any Car Is Worth",
    ctaBottomSub: "Enter a 17-character VIN to get the current trade-in, private party, and dealer retail values.",
  },
  es: {
    home: "Inicio",
    crumb: "Valor de mercado",
    h1: "Valor de mercado del auto por VIN",
    intro:
      "Conocer el valor de mercado actual de un vehículo es esencial ya sea que estés comprando, vendiendo o intercambiando. Una valuación basada en VIN extrae la configuración exacta de fábrica — nivel de equipamiento, opciones y accesorios — para generar un valor preciso en lugar de un promedio del modelo. Entender la diferencia entre los valores de intercambio, venta privada y minorista de concesionario te coloca en una posición de negociación mucho más fuerte antes de cualquier transacción.",
    ctaTopHeading: "Obtén el valor de mercado actual",
    h2Calc: "Cómo se calcula el valor de mercado del vehículo",
    calc1:
      "El valor de mercado de un vehículo no es un número fijo — es una estimación basada en datos derivada de precios reales de transacciones en el mercado. Los proveedores de valuación recopilan millones de ventas reales de concesionarios, resultados de subastas, listados de venta privada y transacciones de intercambio para construir modelos estadísticos que predicen por cuánto debería venderse un vehículo específico bajo las condiciones actuales del mercado.",
    calc2:
      "El VIN ancla la valuación a la configuración exacta de fábrica del vehículo. Un modelo base y una versión totalmente equipada del mismo auto pueden tener valores de mercado dramáticamente distintos. Opciones como tracción en las cuatro ruedas, audio premium, navegación, techo solar y paquetes de remolque conllevan primas de mercado medibles que se incluyen en una valuación específica por VIN pero se omitirían en una estimación genérica por año-modelo.",
    calc3Pre: "El kilometraje, la condición, el historial de accidentes y el estado del título son los factores de ajuste más significativos después de la configuración de fábrica. Un vehículo con ",
    accidentLink: "historial de accidentes",
    calc3Mid: " o un ",
    salvageLink: "título de salvamento",
    calc3Suffix: " siempre se cotizará con descuento frente a un vehículo comparable con título limpio.",
    h2TPR: "Intercambio vs. venta privada vs. minorista",
    tprIntro:
      "Hay tres benchmarks principales de valor de mercado usados en la industria automotriz, y entender cada uno te evita dejar dinero sobre la mesa o pagar de más por un vehículo.",
    tprBullets: [
      { strong: "Valor de intercambio", rest: " — lo que un concesionario te ofrecerá por tu vehículo. Este es el más bajo de los tres valores, ya que el concesionario necesita margen para reacondicionar y obtener ganancia en la reventa." },
      { strong: "Valor de venta privada", rest: " — lo que puedes esperar vender directamente a otro consumidor. Típicamente es 10-20% más alto que el valor de intercambio." },
      { strong: "Valor minorista de concesionario", rest: " — lo que un concesionario cobra en el lote. Es el valor más alto e incluye reacondicionamiento, gastos generales y margen de ganancia del concesionario." },
    ],
    tprAfter:
      "Al comprar a un concesionario, el valor minorista es tu techo — nunca deberías pagar por encima de este benchmark. Al vender en privado, el valor de venta privada es tu objetivo. Al intercambiar, conocer el valor de intercambio te da una base para evaluar la oferta del concesionario.",
    h2Mileage: "Por qué importan el kilometraje y las opciones",
    mil1Pre:
      "El kilometraje es uno de los mayores impulsores de valor para vehículos usados. La industria usa benchmarks de kilometraje anual promedio (típicamente 12,000-15,000 millas por año) para evaluar si un vehículo tiene alto o bajo kilometraje para su edad. Cada 10,000 millas debajo del promedio agrega valor; cada 10,000 millas arriba del promedio lo reduce. Usa nuestra ",
    odoLink: "verificación de odómetro",
    mil1Suffix: " para verificar que el kilometraje declarado por el vendedor sea preciso antes de aceptar cualquier valuación.",
    mil2:
      "Las opciones de fábrica tienen un efecto compuesto en el valor. La tracción en las cuatro ruedas agrega primas significativas en camionetas y SUVs — a menudo $2,000-$5,000 dependiendo del mercado. Paquetes de rendimiento, paquetes de remolque y niveles de equipamiento premium conllevan sus propias primas que persisten a través de múltiples ciclos de propiedad.",
    mil3:
      "La condición es el factor más subjetivo. Las guías de valuación usan grados de condición de Excelente a Pobre, y la diferencia entre grados puede ser de varios miles de dólares. Una evaluación honesta de condición — considerando pintura, desgaste interior, solidez mecánica y cualquier daño previo — produce la estimación de valor de mercado más precisa.",
    h2Regional: "Variaciones regionales del mercado",
    reg1:
      "Los precios de autos usados no son uniformes en todo el país. La dinámica de oferta y demanda, las preferencias locales, el clima y los patrones estacionales crean variaciones regionales significativas de precio para el mismo vehículo. Las camionetas con tracción en las cuatro ruedas alcanzan primas más altas en el oeste montañoso y el alto medio oeste que en el sureste. Los convertibles y autos deportivos se venden con prima en mercados de clima cálido como California y Florida comparados con mercados de clima frío.",
    reg2:
      "Los estados del 'cinturón de sal' (donde se usa mucha sal en las carreteras en invierno) crean dinámicas regionales adicionales — los vehículos de estos estados a menudo tienen óxido y corrosión acelerados, lo que reduce su valor frente a vehículos equivalentes de estados de clima seco como Arizona o Nevada. Una verificación VIN combinada con el historial de registro puede revelar si un vehículo pasó su vida en un ambiente de alta corrosión.",
    h2BestPrice: "Cómo obtener el mejor precio al vender",
    bp1Pre: "Los vendedores que llegan con documentación consistentemente logran precios de transacción más altos. Pasar un ",
    vinLink: "reporte de historial VIN",
    bp1Suffix: " limpio antes de listar le da confianza a los compradores y justifica pedir más cerca del valor de venta privada. Combínalo con registros de servicio completos, una inspección actual y cualquier documentación de garantía de fábrica restante.",
    bp2:
      "El momento también importa. Los convertibles y autos deportivos alcanzan su pico en primavera y verano. Las camionetas y SUVs con tracción en las cuatro ruedas alcanzan los precios más altos justo antes del invierno. Listar durante la demanda pico para tu tipo de vehículo puede agregar cientos o miles al precio final de venta.",
    bp3:
      "Siempre verifica recalls abiertos antes de listar tu vehículo. Los compradores los encontrarán durante su debida diligencia, y tener el recall ya completado elimina una objeción y demuestra propiedad responsable.",
    faqHeading: "Preguntas frecuentes",
    ctaBottomHeading: "Descubre cuánto vale cualquier auto",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres para obtener los valores actuales de intercambio, venta privada y minorista de concesionario.",
  },
} as const;

const FAQS_EN = [
  { question: "How do I find a car's market value by VIN?", answer: "Enter the 17-character VIN into a VIN-based valuation tool. The VIN decodes the exact factory configuration — year, make, model, trim, and installed options — which is then matched against real transaction data (dealer sales, auctions, and private listings) to produce trade-in, private party, and dealer retail estimates. A VIN-based value is more precise than a generic model-year average because it accounts for the specific equipment on that vehicle." },
  { question: "What factors affect a used car's market value?", answer: "The biggest drivers are year, make, model, and trim, followed by mileage, overall condition, and factory options like all-wheel drive, navigation, or premium audio. Title history matters too — accidents and branded titles reduce value. Regional demand also shifts pricing: four-wheel-drive trucks command more in snowy regions, while convertibles sell higher in warm-weather markets. Each factor adjusts the baseline value up or down." },
  { question: "What is the difference between trade-in, private party, and retail value?", answer: "These are three benchmarks for the same vehicle, and they follow a typical hierarchy from lowest to highest. Trade-in value is what a dealer offers, since they need margin to recondition and resell. Private party value is what you'd get selling directly to another buyer, usually higher than trade-in. Dealer retail value is the highest — what a dealer charges on the lot, including reconditioning, overhead, and profit." },
  { question: "How does a clean vs. branded title affect a car's value?", answer: "A clean title supports full market value, while a branded title — salvage, rebuilt, flood, or lemon law buyback — substantially reduces it. Branded-title vehicles trade at a meaningful discount to comparable clean-title cars because they carry insurance limitations, financing restrictions, and buyer hesitancy. The exact reduction depends on the brand type, the damage history, and local market demand, but the discount follows the VIN permanently." },
  { question: "How accurate are online car value estimates?", answer: "Online estimates are statistical ranges built from real transaction data, not guaranteed prices or formal appraisals. They are a reliable starting point for negotiation, but the actual sale price depends on local supply and demand, the vehicle's true condition, and how the buyer and seller value specific options. Treat any estimate as a guide; an in-person inspection or professional appraisal gives the most accurate figure for a specific car." },
  { question: "How often do used car values change?", answer: "Used car values shift continuously because they're derived from ongoing market transactions. Prices respond to seasonal demand, new-vehicle inventory, fuel costs, interest rates, and broader economic conditions. Certain vehicle types peak at predictable times — convertibles and sports cars in spring and summer, four-wheel-drive trucks and SUVs before winter. Because of this, a valuation is a snapshot of current conditions rather than a fixed long-term number." },
  { question: "Can a VIN check improve my car's resale value?", answer: "Indirectly, yes. A VIN check doesn't change a vehicle's mechanical worth, but presenting a clean VIN history report builds buyer confidence and reduces perceived risk, which helps you sell closer to private party value. Pairing the report with complete service records, a current inspection, and any completed recalls removes buyer objections and strengthens your negotiating position, often translating to a higher final sale price." },
];

const FAQS_ES = [
  { question: "¿Cómo encuentro el valor de mercado de un auto por VIN?", answer: "Ingresa el VIN de 17 caracteres en una herramienta de valuación basada en VIN. El VIN decodifica la configuración exacta de fábrica — año, marca, modelo, nivel de equipamiento y opciones instaladas — que luego se contrasta con datos reales de transacciones (ventas de concesionarios, subastas y listados privados) para producir estimaciones de intercambio, venta privada y minorista. Un valor basado en VIN es más preciso que un promedio genérico por año-modelo porque considera el equipamiento específico de ese vehículo." },
  { question: "¿Qué factores afectan el valor de mercado de un auto usado?", answer: "Los mayores impulsores son año, marca, modelo y nivel de equipamiento, seguidos del kilometraje, condición general y opciones de fábrica como tracción en las cuatro ruedas, navegación o audio premium. El historial del título también importa — accidentes y títulos marcados reducen el valor. La demanda regional también desplaza los precios: las camionetas con tracción en las cuatro ruedas se cotizan más en regiones nevadas, mientras que los convertibles se venden más alto en mercados de clima cálido. Cada factor ajusta el valor base hacia arriba o hacia abajo." },
  { question: "¿Cuál es la diferencia entre intercambio, venta privada y valor minorista?", answer: "Son tres benchmarks para el mismo vehículo, y siguen una jerarquía típica de menor a mayor. El valor de intercambio es lo que ofrece un concesionario, ya que necesita margen para reacondicionar y revender. El valor de venta privada es lo que obtendrías vendiendo directamente a otro comprador, usualmente más alto que el de intercambio. El valor minorista de concesionario es el más alto — lo que un concesionario cobra en el lote, incluyendo reacondicionamiento, gastos generales y ganancia." },
  { question: "¿Cómo afecta un título limpio vs. marcado al valor del auto?", answer: "Un título limpio sustenta el valor de mercado completo, mientras que un título marcado — salvamento, reconstruido, inundación o recompra por ley de limones — lo reduce sustancialmente. Los vehículos con título marcado se cotizan con descuento significativo frente a autos comparables con título limpio porque conllevan limitaciones de seguro, restricciones de financiamiento y vacilación del comprador. La reducción exacta depende del tipo de marca, el historial de daños y la demanda local, pero el descuento sigue al VIN de forma permanente." },
  { question: "¿Qué tan precisas son las estimaciones de valor en línea?", answer: "Las estimaciones en línea son rangos estadísticos construidos a partir de datos reales de transacciones, no precios garantizados ni tasaciones formales. Son un punto de partida confiable para negociación, pero el precio real de venta depende de la oferta y demanda local, la condición real del vehículo y cómo valoran el comprador y vendedor opciones específicas. Trata cualquier estimación como guía; una inspección presencial o tasación profesional da la cifra más precisa para un auto específico." },
  { question: "¿Con qué frecuencia cambian los valores de autos usados?", answer: "Los valores de autos usados cambian continuamente porque se derivan de transacciones de mercado en curso. Los precios responden a demanda estacional, inventario de vehículos nuevos, costos de combustible, tasas de interés y condiciones económicas más amplias. Ciertos tipos de vehículos alcanzan picos en momentos predecibles — convertibles y deportivos en primavera y verano, camionetas y SUVs con tracción en las cuatro ruedas antes del invierno. Por esto, una valuación es una instantánea de condiciones actuales en lugar de un número fijo a largo plazo." },
  { question: "¿Una verificación VIN puede mejorar el valor de reventa de mi auto?", answer: "Indirectamente, sí. Una verificación VIN no cambia el valor mecánico de un vehículo, pero presentar un reporte limpio de historial VIN genera confianza en el comprador y reduce el riesgo percibido, lo que te ayuda a vender más cerca del valor de venta privada. Combinar el reporte con registros de servicio completos, una inspección actual y cualquier recall completado elimina objeciones del comprador y fortalece tu posición de negociación, a menudo traduciéndose en un precio final de venta más alto." },
];

interface Props { locale: Locale; }

export default function MarketValueBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} />
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">{c.h1}</h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.intro}</p>
          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">{c.ctaTopHeading}</h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Calc}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.calc1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.calc2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.calc3Pre}
            <Link href={link("/accident-history-check")} className="text-primary-600 hover:underline font-medium">{c.accidentLink}</Link>
            {c.calc3Mid}
            <Link href={link("/salvage-title-check")} className="text-primary-600 hover:underline font-medium">{c.salvageLink}</Link>
            {c.calc3Suffix}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2TPR}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.tprIntro}</p>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.tprBullets.map((b) => (
              <li key={b.strong} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>{b.strong}</strong>{b.rest}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">{c.tprAfter}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Mileage}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.mil1Pre}
            <Link href={link("/odometer-check")} className="text-primary-600 hover:underline font-medium">{c.odoLink}</Link>
            {c.mil1Suffix}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.mil2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.mil3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Regional}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.reg1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.reg2}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2BestPrice}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.bp1Pre}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{c.vinLink}</Link>
            {c.bp1Suffix}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.bp2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.bp3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.faqHeading}</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">{faq.question}</h3>
                  <span className="text-2xl text-primary-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/market-value" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.ctaBottomHeading}</h2>
          <p className="text-slate-700 mb-6">{c.ctaBottomSub}</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}

export { FAQS_EN, FAQS_ES };
