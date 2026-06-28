import Link from "next/link";
import { ArrowRight, CircleDollarSign, Fuel, Gauge, Shield, ShoppingBag, Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import CompareCars from "@/app/compare-cars/CompareCars";
import type { Locale } from "@/i18n/config";

interface Faq { question: string; answer: string; }

const COPY = {
  en: {
    crumbs: { home: "Home", current: "Car Comparison Tool" },
    h1: "Free Car Comparison Tool",
    lede: "Compare any two vehicles side-by-side. Pricing, MPG, horsepower, cargo, towing, safety, reliability, warranty, and key features \u2014 for 40+ popular 2024 models. Pick a make and model on each side and the tool instantly highlights every winning category.",
    whatH2: "What to Compare First",
    whatLede: "Cars are bundles of trade-offs. These five areas drive 90% of long-term satisfaction \u2014 comparing them well is the difference between loving the car you bought and regretting it in two years.",
    whatItems: [
      { title: "Total Price", copy: "MSRP is just the start. Compare both starting prices and top trim prices \u2014 fully-loaded versions can differ by $20,000+. Add destination fees, taxes, and registration to get the real number." },
      { title: "Fuel Economy (MPG)", copy: "Combined MPG most closely matches what most drivers see. A 5 MPG difference at 13,500 mi/yr is roughly $300/year \u2014 over a 7-year ownership period that's $2,000+ in savings." },
      { title: "Safety & Reliability", copy: "NHTSA crash-test stars (5 is best) reflect physical safety. Reliability scores predict repair frequency and unscheduled shop visits. Both compound with age \u2014 buy reliable, especially for a long-term hold." },
      { title: "Cargo & Practicality", copy: "Seats, cargo cubic feet, and towing capacity matter more than horsepower for most families. A few extra ft\u00b3 of cargo can be the difference between hauling the family on a road trip or renting a bigger vehicle." },
      { title: "Performance", copy: "Horsepower, torque, 0-60, and drivetrain. For commuters, anything over 180 hp is plenty. For towing or spirited driving, look at torque and transmission first \u2014 those move the vehicle." },
    ],
    popularH2: "Common Comparisons",
    popularLede: "The most-searched head-to-heads on the market. Click any pair to see the full side-by-side spec comparison.",
    vs: "vs",
    popular: [
      { a: "toyota-camry", b: "honda-accord", aLabel: "Toyota Camry", bLabel: "Honda Accord", note: "America's two best-selling sedans" },
      { a: "honda-civic", b: "toyota-corolla", aLabel: "Honda Civic", bLabel: "Toyota Corolla", note: "Top-selling compacts" },
      { a: "toyota-rav4", b: "honda-cr-v", aLabel: "Toyota RAV4", bLabel: "Honda CR-V", note: "Top compact SUVs in the US" },
      { a: "ford-f-150", b: "chevrolet-silverado-1500", aLabel: "Ford F-150", bLabel: "Chevy Silverado", note: "Full-size truck rivals" },
      { a: "tesla-model-3", b: "tesla-model-y", aLabel: "Tesla Model 3", bLabel: "Tesla Model Y", note: "Tesla sedan vs SUV" },
      { a: "toyota-tacoma", b: "ford-bronco", aLabel: "Toyota Tacoma", bLabel: "Ford Bronco", note: "Off-road favorites" },
      { a: "bmw-3-series", b: "audi-a4", aLabel: "BMW 3 Series", bLabel: "Audi A4", note: "German sport sedans" },
      { a: "subaru-outback", b: "subaru-forester", aLabel: "Subaru Outback", bLabel: "Subaru Forester", note: "Wagon vs SUV showdown" },
    ],
    chooseH2: "How to Choose Between Two Cars",
    chooseP1: "Start with the deal-breakers. If you tow a 6,000 lb boat every weekend, no amount of fuel economy makes a Camry the right answer \u2014 eliminate everything that can\u2019t do the job before you start comparing nice-to-haves.",
    chooseP2: "Then weight categories by how often you\u2019ll use them. A 0-60 of 5 seconds is fun on the test drive but matters less than 5 years of fuel cost differences for most buyers. Cargo space wins more arguments at the airport curb than horsepower wins on the freeway.",
    chooseP3: "Finally, factor in the long-term. Reliability and resale value compound \u2014 a vehicle that costs $2,000 less and depreciates 10% slower can outperform a flashier rival by $5,000+ over 7 years. The comparison tool above shows all of these in one view so you don\u2019t miss the long-term picture while admiring the horsepower number.",
    faqH2: "Frequently Asked Questions",
    crossLinks: [
      { href: "/car-loan-calculator", label: "Car Loan Calculator", sub: "Monthly payment & amortization" },
      { href: "/total-cost-of-ownership-calculator", label: "Total Cost of Ownership", sub: "5-year ownership math" },
      { href: "/gas-mileage-calculator", label: "Gas Mileage Calculator", sub: "Fuel cost per mile/month/year" },
    ],
    cta: { h2: "Found Your Match? Verify the VIN First.", body: "Picking the right model is half the work. Before you buy, run a free VIN check on the specific vehicle to make sure its history is clean \u2014 no salvage title, no odometer rollback, no open recalls.", button: "Run a Free VIN Check" },
  },
  es: {
    crumbs: { home: "Inicio", current: "Herramienta de comparaci\u00f3n de autos" },
    h1: "Herramienta gratis de comparaci\u00f3n de autos",
    lede: "Compara cualquier par de veh\u00edculos lado a lado. Precios, MPG, caballos de fuerza, carga, capacidad de remolque, seguridad, confiabilidad, garant\u00eda y caracter\u00edsticas clave \u2014 para 40+ modelos populares 2024. Elige una marca y modelo en cada lado y la herramienta resalta al instante cada categor\u00eda ganadora.",
    whatH2: "Qu\u00e9 comparar primero",
    whatLede: "Los autos son paquetes de compromisos. Estas cinco \u00e1reas determinan el 90% de la satisfacci\u00f3n a largo plazo \u2014 compararlas bien es la diferencia entre amar el auto que compraste y arrepentirte en dos a\u00f1os.",
    whatItems: [
      { title: "Precio total", copy: "El MSRP es solo el comienzo. Compara los precios base y los de la versi\u00f3n top \u2014 las versiones completamente equipadas pueden diferir en $20,000+. Suma tarifas de destino, impuestos y matriculaci\u00f3n para obtener el n\u00famero real." },
      { title: "Rendimiento de combustible (MPG)", copy: "El MPG combinado es lo que m\u00e1s se aproxima a lo que la mayor\u00eda de los conductores ven. Una diferencia de 5 MPG a 13,500 millas/a\u00f1o son aproximadamente $300/a\u00f1o \u2014 en un periodo de propiedad de 7 a\u00f1os son $2,000+ en ahorros." },
      { title: "Seguridad y confiabilidad", copy: "Las estrellas de prueba de choque de la NHTSA (5 es lo mejor) reflejan la seguridad f\u00edsica. Los puntajes de confiabilidad predicen la frecuencia de reparaciones y visitas no programadas al taller. Ambos se acumulan con la edad \u2014 compra confiable, especialmente para una tenencia a largo plazo." },
      { title: "Carga y practicidad", copy: "Asientos, pies c\u00fabicos de carga y capacidad de remolque importan m\u00e1s que los caballos de fuerza para la mayor\u00eda de las familias. Unos pies c\u00fabicos extra de carga pueden ser la diferencia entre llevar a la familia de viaje o rentar un veh\u00edculo m\u00e1s grande." },
      { title: "Rendimiento", copy: "Caballos de fuerza, torque, 0-60 y tren motriz. Para conductores diarios, cualquier cosa por encima de 180 hp es suficiente. Para remolcar o conducci\u00f3n entusiasta, mira primero el torque y la transmisi\u00f3n \u2014 esos mueven el veh\u00edculo." },
    ],
    popularH2: "Comparaciones comunes",
    popularLede: "Los enfrentamientos m\u00e1s buscados del mercado. Haz clic en cualquier par para ver la comparaci\u00f3n completa lado a lado.",
    vs: "vs",
    popular: [
      { a: "toyota-camry", b: "honda-accord", aLabel: "Toyota Camry", bLabel: "Honda Accord", note: "Los dos sedanes m\u00e1s vendidos de Am\u00e9rica" },
      { a: "honda-civic", b: "toyota-corolla", aLabel: "Honda Civic", bLabel: "Toyota Corolla", note: "Compactos m\u00e1s vendidos" },
      { a: "toyota-rav4", b: "honda-cr-v", aLabel: "Toyota RAV4", bLabel: "Honda CR-V", note: "Top SUVs compactas en EE. UU." },
      { a: "ford-f-150", b: "chevrolet-silverado-1500", aLabel: "Ford F-150", bLabel: "Chevy Silverado", note: "Rivales de camioneta full-size" },
      { a: "tesla-model-3", b: "tesla-model-y", aLabel: "Tesla Model 3", bLabel: "Tesla Model Y", note: "Tesla sed\u00e1n vs SUV" },
      { a: "toyota-tacoma", b: "ford-bronco", aLabel: "Toyota Tacoma", bLabel: "Ford Bronco", note: "Favoritos todoterreno" },
      { a: "bmw-3-series", b: "audi-a4", aLabel: "BMW 3 Series", bLabel: "Audi A4", note: "Sedanes deportivos alemanes" },
      { a: "subaru-outback", b: "subaru-forester", aLabel: "Subaru Outback", bLabel: "Subaru Forester", note: "Vag\u00f3n vs SUV" },
    ],
    chooseH2: "C\u00f3mo elegir entre dos autos",
    chooseP1: "Empieza por los descartes inmediatos. Si remolcas un bote de 6,000 lb cada fin de semana, ning\u00fan rendimiento de combustible hace que un Camry sea la respuesta correcta \u2014 elimina todo lo que no pueda hacer el trabajo antes de comparar lo dem\u00e1s.",
    chooseP2: "Luego pondera las categor\u00edas por la frecuencia con la que las usar\u00e1s. Un 0-60 de 5 segundos es divertido en la prueba de manejo, pero importa menos que las diferencias de costo de combustible a 5 a\u00f1os para la mayor\u00eda de los compradores. El espacio de carga gana m\u00e1s discusiones en la acera del aeropuerto que los caballos de fuerza en la autopista.",
    chooseP3: "Finalmente, considera el largo plazo. La confiabilidad y el valor de reventa se acumulan \u2014 un veh\u00edculo que cuesta $2,000 menos y se deprecia 10% m\u00e1s lento puede superar a un rival m\u00e1s vistoso por $5,000+ en 7 a\u00f1os. La herramienta de comparaci\u00f3n arriba muestra todo esto en una sola vista para que no te pierdas el panorama a largo plazo mientras admiras el n\u00famero de caballos de fuerza.",
    faqH2: "Preguntas frecuentes",
    crossLinks: [
      { href: "/car-loan-calculator", label: "Calculadora de pr\u00e9stamo de auto", sub: "Pago mensual y amortizaci\u00f3n" },
      { href: "/total-cost-of-ownership-calculator", label: "Costo total de propiedad", sub: "Matem\u00e1ticas de propiedad a 5 a\u00f1os" },
      { href: "/gas-mileage-calculator", label: "Calculadora de rendimiento de combustible", sub: "Costo de combustible por milla/mes/a\u00f1o" },
    ],
    cta: { h2: "\u00bfEncontraste tu match? Verifica primero el VIN.", body: "Elegir el modelo correcto es la mitad del trabajo. Antes de comprar, haz una verificaci\u00f3n VIN gratis en el veh\u00edculo espec\u00edfico para asegurarte de que su historial est\u00e9 limpio \u2014 sin t\u00edtulo de salvamento, sin manipulaci\u00f3n de od\u00f3metro, sin retiros abiertos.", button: "Haz una verificaci\u00f3n VIN gratis" },
  },
} as const;

const WHAT_ICONS = [CircleDollarSign, Fuel, Shield, ShoppingBag, Gauge];

export const FAQS_EN: Faq[] = [
  { question: "What does this car comparison tool show?", answer: "30+ specs across five categories \u2014 Pricing, Performance, Efficiency, Practicality, and Quality. Each numeric metric is highlighted with a green winner badge, and you get an overall scoreline at the top." },
  { question: "Is the tool actually free?", answer: "Yes \u2014 100% free, no sign-up, no ads in the comparison output. We do offer a paid VIN history report if you want to verify a specific used vehicle, but the comparison tool itself is fully free." },
  { question: "Can I compare different segments (sedan vs SUV, gas vs EV)?", answer: "Yes. Cross-segment comparisons work fine. Specs that don't apply to one vehicle (e.g. towing for a sedan, EV range for a gas car) show as '\u2014' rather than skewing the result." },
  { question: "How accurate are the specs?", answer: "Pricing, MPG, horsepower, torque, towing, and warranty come from manufacturer websites and EPA fueleconomy.gov for 2024 model-year vehicles. NHTSA safety stars come from the official NHTSA database. Reliability and resale scores are subjective 1\u201310 ratings drawn from industry-wide long-term ownership data." },
  { question: "Can I share a specific comparison with someone?", answer: "Yes \u2014 every comparison has its own URL. Pick two vehicles, then copy the URL from your browser. The link will open the same comparison for anyone who clicks it, e.g. /compare-cars?a=toyota-camry&b=honda-accord." },
  { question: "Why isn't [my model] in the list?", answer: "We've prioritized the 40+ most-searched and best-selling models. We're expanding the database regularly \u2014 if your car isn't here, the closest segment match (e.g. CR-V instead of Pilot Sport) will give you a useful directional comparison." },
  { question: "Should I buy new or used after comparing?", answer: "Comparing helps you pick the model. Whether to buy new or used is a separate decision driven by depreciation curves and your budget. A 2-3 year old version of a top-rated comparison winner is often the strongest overall value \u2014 just be sure to run a free VIN check before any used purchase." },
  { question: "Does this replace Kelley Blue Book or Edmunds comparison?", answer: "It's an alternative that's simpler, faster, and ad-free. KBB and Edmunds offer broader databases and trim-level configurators. We focus on clean head-to-head comparisons of the most popular models \u2014 pick two cars and read the answer in 30 seconds." },
];

export const FAQS_ES: Faq[] = [
  { question: "\u00bfQu\u00e9 muestra esta herramienta de comparaci\u00f3n de autos?", answer: "30+ especificaciones en cinco categor\u00edas \u2014 Precios, Rendimiento, Eficiencia, Practicidad y Calidad. Cada m\u00e9trica num\u00e9rica se resalta con un distintivo verde de ganador, y obtienes un marcador general en la parte superior." },
  { question: "\u00bfLa herramienta es realmente gratis?", answer: "S\u00ed \u2014 100% gratis, sin registro, sin anuncios en el resultado de comparaci\u00f3n. S\u00ed ofrecemos un reporte pago de historial VIN si quieres verificar un veh\u00edculo usado espec\u00edfico, pero la herramienta de comparaci\u00f3n en s\u00ed es totalmente gratis." },
  { question: "\u00bfPuedo comparar segmentos diferentes (sed\u00e1n vs SUV, gasolina vs EV)?", answer: "S\u00ed. Las comparaciones entre segmentos funcionan bien. Las especificaciones que no aplican a un veh\u00edculo (por ejemplo, remolque para un sed\u00e1n, autonom\u00eda EV para un auto de gasolina) se muestran como '\u2014' en lugar de sesgar el resultado." },
  { question: "\u00bfQu\u00e9 tan precisas son las especificaciones?", answer: "Los precios, MPG, caballos de fuerza, torque, remolque y garant\u00eda vienen de los sitios web de los fabricantes y EPA fueleconomy.gov para veh\u00edculos del a\u00f1o modelo 2024. Las estrellas de seguridad NHTSA vienen de la base de datos oficial de la NHTSA. Los puntajes de confiabilidad y reventa son calificaciones subjetivas de 1\u201310 extra\u00eddas de datos de propiedad a largo plazo de toda la industria." },
  { question: "\u00bfPuedo compartir una comparaci\u00f3n espec\u00edfica con alguien?", answer: "S\u00ed \u2014 cada comparaci\u00f3n tiene su propia URL. Elige dos veh\u00edculos, luego copia la URL de tu navegador. El enlace abrir\u00e1 la misma comparaci\u00f3n para cualquiera que haga clic, por ejemplo /es/compare-cars?a=toyota-camry&b=honda-accord." },
  { question: "\u00bfPor qu\u00e9 no est\u00e1 [mi modelo] en la lista?", answer: "Hemos priorizado los 40+ modelos m\u00e1s buscados y m\u00e1s vendidos. Estamos expandiendo la base de datos regularmente \u2014 si tu auto no est\u00e1 aqu\u00ed, la coincidencia de segmento m\u00e1s cercana (por ejemplo, CR-V en lugar de Pilot Sport) te dar\u00e1 una comparaci\u00f3n direccional \u00fatil." },
  { question: "\u00bfDebo comprar nuevo o usado despu\u00e9s de comparar?", answer: "Comparar te ayuda a elegir el modelo. Si compras nuevo o usado es una decisi\u00f3n separada impulsada por las curvas de depreciaci\u00f3n y tu presupuesto. Una versi\u00f3n de 2-3 a\u00f1os de un ganador de comparaci\u00f3n mejor calificado a menudo es el valor general m\u00e1s fuerte \u2014 solo aseg\u00farate de hacer una verificaci\u00f3n VIN gratis antes de cualquier compra usada." },
  { question: "\u00bfEsto reemplaza la comparaci\u00f3n de Kelley Blue Book o Edmunds?", answer: "Es una alternativa que es m\u00e1s simple, m\u00e1s r\u00e1pida y sin anuncios. KBB y Edmunds ofrecen bases de datos m\u00e1s amplias y configuradores a nivel de versi\u00f3n. Nos enfocamos en comparaciones cabeza a cabeza limpias de los modelos m\u00e1s populares \u2014 elige dos autos y lee la respuesta en 30 segundos." },
];

export default function CompareCarsBody({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (href: string) => (locale === "es" ? `/es${href}` : href);

  return (
    <>
      <main className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: c.crumbs.home, href: link("/") }, { label: c.crumbs.current }]} />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">{c.h1}</h1>
          <p data-speakable className="mt-4 text-lg text-slate-700 leading-relaxed">{c.lede}</p>

          <div className="mt-8">
            <VinCheckBanner variant="card" />
          </div>

          <div className="mt-8">
            <CompareCars />
          </div>

          <section id="what-to-compare" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.whatH2}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">{c.whatLede}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {c.whatItems.map((item, i) => {
                const Icon = WHAT_ICONS[i];
                return (
                  <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
                    <Icon className="w-5 h-5 text-primary-600 mb-2" />
                    <p className="font-bold text-slate-900 text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.copy}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="popular-comparisons" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.popularH2}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">{c.popularLede}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {c.popular.map((p) => (
                <Link
                  key={`${p.a}-${p.b}`}
                  href={`${link("/compare-cars")}?a=${p.a}&b=${p.b}`}
                  className="group flex items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:bg-primary-50 hover:border-primary-200 transition-colors"
                >
                  <div>
                    <p className="font-bold text-slate-900 text-sm">
                      {p.aLabel} <span className="text-slate-400 mx-1">{c.vs}</span> {p.bLabel}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{p.note}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-600 transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>

          <section id="how-to-choose" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.chooseH2}</h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>{c.chooseP1}</p>
              <p>{c.chooseP2}</p>
              <p>{c.chooseP3}</p>
            </div>
          </section>

          <div className="mt-12">
            <VinCheckBanner />
          </div>

          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{c.faqH2}</h2>
            <dl className="space-y-6">
              {faqs.map((f) => (
                <div key={f.question}>
                  <dt className="font-bold text-slate-900">{f.question}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-14 grid sm:grid-cols-3 gap-3">
            {c.crossLinks.map((cl) => (
              <Link
                key={cl.href}
                href={link(cl.href)}
                className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div>
                  <p className="font-bold text-slate-900 text-sm">{cl.label}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{cl.sub}</p>
                </div>
                <span className="text-slate-500 font-bold text-xs flex-shrink-0">→</span>
              </Link>
            ))}
          </div>

          <div className="mt-14">
            <RelatedChecks exclude="/compare-cars" />
          </div>
        </div>
      </main>

      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.cta.h2}</h2>
          <p className="text-slate-600 mb-6">{c.cta.body}</p>
          <Link href={link("/vin-check")} className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors">
            <Sparkles className="w-4 h-4" /> {c.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
