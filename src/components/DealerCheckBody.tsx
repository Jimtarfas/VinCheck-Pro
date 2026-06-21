/**
 * Shared body for /dealer-check and /es/dealer-check.
 * Wave 18d — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home", crumb: "Dealer Check",
    h1: "Dealer History Check by VIN",
    intro: "Not every new or nearly-new car was bought fresh off the truck by a consumer. Dealers keep vehicles as demonstrators (demo cars), lend them as service loaners, and sometimes assign them to press fleets or manufacturer representatives — all before the vehicle is ever \"sold.\" A VIN dealer history check reveals whether a vehicle accumulated mileage in dealer hands before you bought it, which directly affects its warranty clock, real-world value, and condition.",
    ctaTopHeading: "Check for Dealer Demo and Loaner History",
    h2What: "What Is a Dealer Demo Vehicle",
    what1: "A dealer demonstrator vehicle (demo) is a new vehicle that a dealership titles in the dealer's name for use as a test drive vehicle, executive vehicle, or sales tool before being sold to a retail buyer. Demos are driven by prospective customers during test drives, by dealer sales staff, and sometimes by the dealership owner or managers as personal vehicles. They accumulate mileage while technically still being \"new\" inventory.",
    what2: "Demo vehicles are typically sold at a discount relative to an equivalent never-titled new vehicle, reflecting the accumulated mileage and the fact that the vehicle has been in dealer use. The discount varies by manufacturer policy, dealer discretion, and the amount of mileage accumulated. However, the warranty clock starts from the in-service date of the demo titling — not from when you buy it.",
    what3Pre: "Demo use is recorded when the dealer titles the vehicle in the dealership's name before the retail sale. This creates a title history entry showing the dealer as an owner, which appears in a comprehensive ",
    vinLink: "VIN history report",
    what3Suffix: ".",
    h2Loaner: "Service Loaners vs. Demo Cars",
    loan1: "Service loaner vehicles are used differently from demo cars. Loaners are provided to service customers while their vehicles are being repaired — typically for a day or a few days at a time. The loaner fleet is titled in the dealer's name and typically has a higher volume of short-distance, urban driving than demos, which may be used for longer test drives.",
    loan2: "Service loaners often accumulate mileage quickly because they are in continuous daily use. A loaner vehicle used at a busy service department may cover 2,000–4,000 miles per month in stop-and-go service trips across a metropolitan area. This usage pattern is hard on brakes, transmissions, and engine systems because of the frequent short trips and variable driver behavior.",
    loanBullets: [
      { strong: "Demo vehicles", rest: " — lower total mileage, mixed use including test drives and manager vehicles, typically well-optioned vehicles with all features working." },
      { strong: "Service loaners", rest: " — higher mileage in shorter time, extensive short-trip urban use, heavy interior wear from diverse driver population." },
      { strong: "Press fleet vehicles", rest: " — manufacturer or dealer vehicles lent to automotive media for review; typically well-maintained but driven hard by professional evaluators." },
    ],
    h2Warranty: "How Dealer Use Affects Mileage and Warranty",
    war1: "The most important practical consequence of dealer history is the warranty impact. Manufacturer warranties start from the in-service date — the date the vehicle was first placed in service, which includes dealer titling for demo and loaner use. A vehicle that was used as a service loaner for six months before you purchase it has six months less factory warranty coverage than a vehicle delivered directly to you as a new retail buyer.",
    war2Pre: "Verify the in-service date by running a ",
    warrantyLink: "warranty check",
    war2Suffix: " before finalizing any purchase of a vehicle with dealer history. The remaining coverage should reflect the actual time elapsed since the in-service date, not the purchase date. If the dealer represents remaining warranty that doesn't account for the demo or loaner period, this is a disclosure failure worth addressing before you sign.",
    war3Pre: "For mileage verification, run an ",
    odoLink: "odometer check",
    war3Suffix: " to confirm the mileage accumulation timeline is consistent with the disclosed dealer use period.",
    h2VinShow: "What VIN Reports Show About Dealer History",
    show1: "A comprehensive VIN history report captures dealer ownership through title records. When a dealer titles a vehicle in the dealership's name — as they must do for demos and loaners in most states — that title event appears in the ownership chain. The dealer name, the state of titling, and the date of the title event are all recorded and visible in the history report.",
    show2: "Some states have specific dealer plates and registration categories that tag fleet use vehicles more explicitly. Auction records also capture dealer-to-dealer vehicle transfers, which are common when dealers move inventory between their own stores or wholesale vehicles to other dealers after a demo period ends.",
    show3: "Not all dealer use results in title records — in some states, dealers can maintain vehicles in dealer demo status under the dealer's original title without retitling, particularly for short periods. These use periods may not appear in title history. Service records and manufacturer fleet registration data can fill some of these gaps.",
    h2Buying: "Buying a Former Demo or Loaner",
    buy1: "Former demo and loaner vehicles can be excellent used car values when they are priced appropriately. The typical discount for a former demo or loaner ranges from 10–20% below the equivalent new vehicle price, depending on mileage accumulated and the manufacturer's program. These vehicles are typically well-optioned (dealers demo their best configurations), have documented maintenance (dealer service records), and may still carry substantial factory warranty.",
    buy2: "The negotiating approach should be based on accurate mileage, the actual remaining warranty, and a realistic assessment of interior condition. High-mileage service loaners may have more interior wear than the mileage suggests — focus your inspection on the highest-contact areas: driver's seat, steering wheel, carpets, and interior controls.",
    buy3Pre: "Complete your due diligence with a full ",
    vinLink2: "VIN history report",
    buy3Mid: " and an ",
    accidentLink: "accident history check",
    buy3Suffix: " — demo and loaner vehicles are sometimes involved in minor accidents during their dealer use that may or may not be fully disclosed.",
    faqHeading: "Frequently Asked Questions",
    ctaBottomHeading: "Was This Car a Demo or Loaner?",
    ctaBottomSub: "Enter a 17-character VIN to check for dealer demo, service loaner, and press fleet ownership history.",
  },
  es: {
    home: "Inicio", crumb: "Verificación de concesionario",
    h1: "Verificación de historial de concesionario por VIN",
    intro: "No todo auto nuevo o casi nuevo fue comprado directamente del camión por un consumidor. Los concesionarios mantienen vehículos como demostradores (autos demo), los prestan como autos de cortesía durante el servicio y a veces los asignan a flotas de prensa o representantes del fabricante — todo antes de que el vehículo sea \"vendido.\" Una verificación VIN de historial de concesionario revela si un vehículo acumuló kilometraje en manos del concesionario antes de tu compra, lo que afecta directamente el reloj de la garantía, el valor real y la condición.",
    ctaTopHeading: "Verifica historial de demo y cortesía del concesionario",
    h2What: "Qué es un vehículo demo del concesionario",
    what1: "Un vehículo demostrador del concesionario (demo) es un vehículo nuevo que un concesionario titula a nombre del concesionario para usar como vehículo de prueba de manejo, vehículo ejecutivo o herramienta de venta antes de venderlo a un comprador minorista. Los demos son conducidos por clientes potenciales durante pruebas de manejo, por el personal de ventas del concesionario, y a veces por el dueño o gerentes del concesionario como vehículos personales. Acumulan kilometraje mientras técnicamente siguen siendo inventario \"nuevo.\"",
    what2: "Los vehículos demo típicamente se venden con descuento frente a un vehículo nuevo equivalente nunca titulado, reflejando el kilometraje acumulado y el hecho de que el vehículo ha estado en uso del concesionario. El descuento varía según la política del fabricante, la discreción del concesionario y la cantidad de kilometraje acumulado. Sin embargo, el reloj de la garantía comienza desde la fecha de puesta en servicio del titulado demo — no desde cuando lo compras.",
    what3Pre: "El uso demo se registra cuando el concesionario titula el vehículo a nombre del concesionario antes de la venta minorista. Esto crea una entrada en el historial del título mostrando al concesionario como propietario, que aparece en un ",
    vinLink: "reporte completo de historial VIN",
    what3Suffix: ".",
    h2Loaner: "Autos de cortesía vs. autos demo",
    loan1: "Los vehículos de cortesía de servicio se usan de forma diferente a los autos demo. Los autos de cortesía se proporcionan a clientes de servicio mientras se reparan sus vehículos — típicamente por un día o varios días a la vez. La flota de cortesía está titulada a nombre del concesionario y típicamente tiene un mayor volumen de conducción urbana de corta distancia que los demos, que pueden usarse para pruebas de manejo más largas.",
    loan2: "Los autos de cortesía a menudo acumulan kilometraje rápidamente porque están en uso diario continuo. Un vehículo de cortesía usado en un departamento de servicio ocupado puede cubrir 2,000-4,000 millas por mes en viajes de pare-y-arranca por un área metropolitana. Este patrón de uso es duro para frenos, transmisiones y sistemas del motor debido a los viajes cortos frecuentes y el comportamiento variable de los conductores.",
    loanBullets: [
      { strong: "Vehículos demo", rest: " — menor kilometraje total, uso mixto incluyendo pruebas de manejo y vehículos de gerentes, típicamente vehículos bien equipados con todas las funciones operativas." },
      { strong: "Autos de cortesía", rest: " — mayor kilometraje en menos tiempo, uso extensivo urbano de viajes cortos, fuerte desgaste interior por la diversa población de conductores." },
      { strong: "Vehículos de flota de prensa", rest: " — vehículos del fabricante o concesionario prestados a medios automotrices para reseñas; típicamente bien mantenidos pero conducidos duramente por evaluadores profesionales." },
    ],
    h2Warranty: "Cómo el uso del concesionario afecta el kilometraje y la garantía",
    war1: "La consecuencia práctica más importante del historial del concesionario es el impacto en la garantía. Las garantías del fabricante comienzan desde la fecha de puesta en servicio — la fecha en que el vehículo fue puesto en servicio por primera vez, lo que incluye el titulado del concesionario para uso demo y de cortesía. Un vehículo que fue usado como auto de cortesía por seis meses antes de tu compra tiene seis meses menos de cobertura de garantía de fábrica que un vehículo entregado directamente a ti como comprador minorista nuevo.",
    war2Pre: "Verifica la fecha de puesta en servicio haciendo una ",
    warrantyLink: "verificación de garantía",
    war2Suffix: " antes de finalizar cualquier compra de un vehículo con historial del concesionario. La cobertura restante debe reflejar el tiempo real transcurrido desde la fecha de puesta en servicio, no la fecha de compra. Si el concesionario representa una garantía restante que no considera el período demo o de cortesía, esto es una falla de declaración que vale la pena abordar antes de firmar.",
    war3Pre: "Para verificación de kilometraje, haz una ",
    odoLink: "verificación de odómetro",
    war3Suffix: " para confirmar que la línea de tiempo de acumulación de kilometraje sea consistente con el período declarado de uso del concesionario.",
    h2VinShow: "Qué muestran los reportes VIN sobre el historial del concesionario",
    show1: "Un reporte completo de historial VIN captura la propiedad del concesionario a través de los registros del título. Cuando un concesionario titula un vehículo a nombre del concesionario — como deben hacerlo para demos y autos de cortesía en la mayoría de los estados — ese evento del título aparece en la cadena de propiedad. El nombre del concesionario, el estado del titulado y la fecha del evento del título están todos registrados y visibles en el reporte de historial.",
    show2: "Algunos estados tienen placas específicas de concesionario y categorías de registro que etiquetan vehículos de uso de flota más explícitamente. Los registros de subastas también capturan transferencias de vehículos entre concesionarios, que son comunes cuando los concesionarios mueven inventario entre sus propias tiendas o venden al por mayor vehículos a otros concesionarios después de que termina un período demo.",
    show3: "No todo uso del concesionario resulta en registros de título — en algunos estados, los concesionarios pueden mantener vehículos en estado demo bajo el título original del concesionario sin re-titular, particularmente por períodos cortos. Estos períodos de uso pueden no aparecer en el historial del título. Los registros de servicio y datos de registro de flota del fabricante pueden llenar algunos de estos vacíos.",
    h2Buying: "Comprar un auto demo o de cortesía",
    buy1: "Los vehículos demo y de cortesía pueden ser excelentes valores de auto usado cuando tienen precio apropiado. El descuento típico para un demo o auto de cortesía oscila entre 10-20% por debajo del precio equivalente del vehículo nuevo, dependiendo del kilometraje acumulado y el programa del fabricante. Estos vehículos típicamente están bien equipados (los concesionarios usan sus mejores configuraciones como demo), tienen mantenimiento documentado (registros de servicio del concesionario) y aún pueden llevar garantía de fábrica sustancial.",
    buy2: "El enfoque de negociación debe basarse en kilometraje preciso, la garantía real restante y una evaluación realista de la condición interior. Los autos de cortesía de alto kilometraje pueden tener más desgaste interior del que sugiere el kilometraje — enfoca tu inspección en las áreas de mayor contacto: asiento del conductor, volante, alfombras y controles interiores.",
    buy3Pre: "Completa tu diligencia debida con un ",
    vinLink2: "reporte completo de historial VIN",
    buy3Mid: " y una ",
    accidentLink: "verificación de historial de accidentes",
    buy3Suffix: " — los vehículos demo y de cortesía a veces están involucrados en accidentes menores durante su uso del concesionario que pueden o no estar completamente declarados.",
    faqHeading: "Preguntas frecuentes",
    ctaBottomHeading: "¿Fue este auto un demo o de cortesía?",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres para verificar el historial de propiedad como demo del concesionario, auto de cortesía y flota de prensa.",
  },
} as const;

const FAQS_EN = [
  { question: "What is a dealer demo vehicle?", answer: "A dealer demonstrator (demo) is a new vehicle that a dealership titles in its own name to use for customer test drives, as a sales-staff or manager vehicle, or as a showroom example before selling it to a retail buyer. Demos accumulate mileage while still classified as new inventory and are usually sold at a discount that reflects that use." },
  { question: "How can I tell if a car was a dealer demo or service loaner by VIN?", answer: "Enter the 17-character VIN above to run a history report. When a dealer titles a vehicle in the dealership's name for demo or loaner use, that title event appears in the ownership chain, showing the dealer name, the state of titling, and the date. Auction records also capture dealer-to-dealer transfers. Note that short-term demo use under the original title may not always create a title record." },
  { question: "How does demo or loaner use affect the factory warranty?", answer: "The manufacturer's warranty starts from the vehicle's in-service date, not your purchase date. If a car served as a demo or service loaner for six months before you buy it, you get roughly six months less factory coverage than a vehicle delivered new to you. Run a warranty check to confirm the in-service date and the actual remaining coverage before you sign." },
  { question: "What is the difference between a demo car and a service loaner?", answer: "Demo cars are used for test drives and as sales-staff or manager vehicles, so they tend to have lower total mileage and mixed driving. Service loaners are lent to repair customers and run in near-continuous short-trip urban use, often covering 2,000 to 4,000 miles a month. Loaners typically accumulate mileage faster and show heavier interior wear from a diverse driver population." },
  { question: "Is it a good idea to buy a former demo or loaner vehicle?", answer: "Former demos and loaners can be strong values when priced correctly. They are typically well-optioned, have documented dealer maintenance, and may still carry substantial factory warranty. The typical discount runs about 10 to 20 percent below an equivalent new vehicle, depending on mileage and the manufacturer's program. Base your offer on accurate mileage, the actual remaining warranty, and a careful interior inspection." },
  { question: "Does dealer use always appear in a VIN history report?", answer: "Not always. Dealer use is captured when the dealer titles the vehicle in the dealership's name, which most states require for demos and loaners. However, some states let dealers keep a vehicle in demo status under the original title for short periods without retitling, so that use may not appear in title history. Service records and manufacturer fleet registration data can help fill those gaps." },
  { question: "What is a press fleet vehicle?", answer: "A press fleet vehicle is a car a manufacturer or dealer lends to automotive media for road tests and reviews before it enters the retail market. These vehicles are usually well maintained but are driven hard by professional evaluators. Like demos and loaners, press fleet use can appear in title and ownership records and may affect the in-service date that starts the warranty clock." },
];

const FAQS_ES = [
  { question: "¿Qué es un vehículo demo del concesionario?", answer: "Un demostrador del concesionario (demo) es un vehículo nuevo que un concesionario titula a su propio nombre para usar en pruebas de manejo de clientes, como vehículo del personal o gerente de ventas, o como ejemplo del salón antes de venderlo a un comprador minorista. Los demos acumulan kilometraje mientras siguen clasificados como inventario nuevo y usualmente se venden con descuento que refleja ese uso." },
  { question: "¿Cómo puedo saber si un auto fue demo o de cortesía por VIN?", answer: "Ingresa el VIN de 17 caracteres arriba para hacer un reporte de historial. Cuando un concesionario titula un vehículo a nombre del concesionario para uso demo o de cortesía, ese evento de título aparece en la cadena de propiedad, mostrando el nombre del concesionario, el estado del titulado y la fecha. Los registros de subastas también capturan transferencias entre concesionarios. Nota que el uso demo de corto plazo bajo el título original puede no siempre crear un registro de título." },
  { question: "¿Cómo afecta el uso demo o de cortesía a la garantía de fábrica?", answer: "La garantía del fabricante comienza desde la fecha de puesta en servicio del vehículo, no tu fecha de compra. Si un auto sirvió como demo o auto de cortesía durante seis meses antes de tu compra, obtienes aproximadamente seis meses menos de cobertura de fábrica que un vehículo entregado nuevo a ti. Haz una verificación de garantía para confirmar la fecha de puesta en servicio y la cobertura restante real antes de firmar." },
  { question: "¿Cuál es la diferencia entre un auto demo y un auto de cortesía?", answer: "Los autos demo se usan para pruebas de manejo y como vehículos del personal o gerentes de ventas, por lo que tienden a tener menor kilometraje total y conducción mixta. Los autos de cortesía se prestan a clientes de reparación y operan en uso urbano casi continuo de viajes cortos, a menudo cubriendo 2,000 a 4,000 millas al mes. Los autos de cortesía típicamente acumulan kilometraje más rápido y muestran mayor desgaste interior por una diversa población de conductores." },
  { question: "¿Es buena idea comprar un vehículo ex-demo o ex-cortesía?", answer: "Los ex-demos y ex-cortesía pueden ser valores fuertes cuando tienen precio correcto. Típicamente están bien equipados, tienen mantenimiento documentado del concesionario y aún pueden llevar garantía de fábrica sustancial. El descuento típico va alrededor del 10 a 20 por ciento por debajo de un vehículo nuevo equivalente, dependiendo del kilometraje y el programa del fabricante. Basa tu oferta en kilometraje preciso, la garantía real restante y una inspección interior cuidadosa." },
  { question: "¿El uso del concesionario siempre aparece en un reporte de historial VIN?", answer: "No siempre. El uso del concesionario se captura cuando el concesionario titula el vehículo a nombre del concesionario, lo cual la mayoría de los estados requieren para demos y autos de cortesía. Sin embargo, algunos estados permiten que los concesionarios mantengan un vehículo en estado demo bajo el título original por períodos cortos sin re-titular, así que ese uso puede no aparecer en el historial del título. Los registros de servicio y datos de registro de flota del fabricante pueden ayudar a llenar esos vacíos." },
  { question: "¿Qué es un vehículo de flota de prensa?", answer: "Un vehículo de flota de prensa es un auto que un fabricante o concesionario presta a medios automotrices para pruebas de manejo y reseñas antes de entrar al mercado minorista. Estos vehículos generalmente están bien mantenidos pero son conducidos duramente por evaluadores profesionales. Como los demos y autos de cortesía, el uso de flota de prensa puede aparecer en registros de título y propiedad y puede afectar la fecha de puesta en servicio que inicia el reloj de la garantía." },
];

interface Props { locale: Locale; }

export default function DealerCheckBody({ locale }: Props) {
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

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2What}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.what1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.what2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.what3Pre}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{c.vinLink}</Link>
            {c.what3Suffix}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Loaner}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.loan1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.loan2}</p>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.loanBullets.map((b) => (
              <li key={b.strong} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>{b.strong}</strong>{b.rest}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Warranty}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.war1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.war2Pre}
            <Link href={link("/warranty-check")} className="text-primary-600 hover:underline font-medium">{c.warrantyLink}</Link>
            {c.war2Suffix}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.war3Pre}
            <Link href={link("/odometer-check")} className="text-primary-600 hover:underline font-medium">{c.odoLink}</Link>
            {c.war3Suffix}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2VinShow}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.show1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.show2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.show3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Buying}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.buy1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.buy2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.buy3Pre}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{c.vinLink2}</Link>
            {c.buy3Mid}
            <Link href={link("/accident-history-check")} className="text-primary-600 hover:underline font-medium">{c.accidentLink}</Link>
            {c.buy3Suffix}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.faqHeading}</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-slate-200 bg-white p-5">
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
        <RelatedChecks exclude="/dealer-check" />
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
