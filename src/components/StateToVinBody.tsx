/**
 * Shared body for /state-to-vin and /es/state-to-vin.
 * Wave 18d — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import { Check, Shield, Clock, Globe, Search, MapPin, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import LicensePlateLookup from "@/app/license-plate-lookup/LicensePlateLookup";
import type { Locale } from "@/i18n/config";

const STATE_GROUPS_EN = [
  { region: "Northeast", states: ["CT", "DE", "MA", "ME", "MD", "NH", "NJ", "NY", "PA", "RI", "VT"] },
  { region: "South", states: ["AL", "AR", "FL", "GA", "KY", "LA", "MS", "NC", "SC", "TN", "TX", "VA", "WV"] },
  { region: "Midwest", states: ["IA", "IL", "IN", "KS", "MI", "MN", "MO", "ND", "NE", "OH", "SD", "WI"] },
  { region: "West", states: ["AK", "AZ", "CA", "CO", "HI", "ID", "MT", "NM", "NV", "OR", "UT", "WA", "WY"] },
];

const STATE_GROUPS_ES = [
  { region: "Noreste", states: STATE_GROUPS_EN[0].states },
  { region: "Sur", states: STATE_GROUPS_EN[1].states },
  { region: "Medio Oeste", states: STATE_GROUPS_EN[2].states },
  { region: "Oeste", states: STATE_GROUPS_EN[3].states },
];

const COPY = {
  en: {
    home: "Home",
    crumb: "State to VIN",
    h1: "State to VIN",
    intro: "Find a vehicle's VIN by its issuing state and license plate. Choose the state, enter the plate, and we'll return the 17-character VIN with the decoded year, make, and model — then unlock the full history report. Free for all 50 states and D.C.",
    badges: [
      { icon: Globe, text: "50 States + D.C." },
      { icon: Shield, text: "DPPA Compliant" },
      { icon: Clock, text: "Instant Results" },
      { icon: Search, text: "Free Lookup" },
    ],
    h2How: "How State to VIN Works",
    steps: [
      { n: 1, title: "Select the issuing state", body: "Each state runs its own DMV registration database. Picking the issuing state first directs the query to the right records — this is the step that makes the match accurate." },
      { n: 2, title: "Enter the plate number", body: "Type the plate exactly as printed — letters and digits only. The same plate characters can repeat across states, which is why the state matters." },
      { n: 3, title: "Get the VIN and vehicle details", body: "We resolve the plate to its 17-character VIN and decode the year, make, model, and trim — then you can pull the complete history report with one click." },
    ],
    h2Coverage: "Every State Supported — 50 States + D.C.",
    coverageIntro: "Select any state in the dropdown above to route the query to that state's motor vehicle database. Coverage spans every region:",
    stateGroups: STATE_GROUPS_EN,
    h2What: "What the VIN Unlocks",
    whatBullets: [
      { title: "17-character VIN", detail: "The identifier every downstream record is keyed to." },
      { title: "Year, Make, Model & Trim", detail: "Decoded straight from the VIN — manufacturer, body style, and engine." },
      { title: "Title brands", detail: "Salvage, flood, rebuilt, lemon-law buyback, and non-repairable flags." },
      { title: "Accident & damage records", detail: "Collision reports and insurance claims from NMVTIS and insurers." },
      { title: "Odometer history", detail: "Mileage at each title transfer — exposes rollback fraud." },
      { title: "Open safety recalls", detail: "NHTSA-reported unrepaired recall campaigns." },
    ],
    crossPre: "Prefer to start with the plate number? Use the ",
    plateLink: "Plate to VIN tool",
    crossMid: ". Already have the 17-character VIN? Skip the plate step and run a ",
    vinLink: "free VIN check",
    crossSuffix: " directly.",
    faqHeading: "State to VIN — FAQ",
    faqs: [
      { q: "Why does the VIN lookup need the state?", a: "License plates are issued by individual states, not the federal government. The same plate sequence can be active in California, Texas, and New York at once, so the issuing state is required to query the correct DMV database and return the right vehicle." },
      { q: "Which states are supported?", a: "All 50 US states plus the District of Columbia. Every state's motor-vehicle registration database is supported — select the issuing state from the dropdown in the tool." },
      { q: "Is state-to-VIN lookup free?", a: "Yes. Resolving a plate to a VIN and viewing the decoded year, make, and model is free for personal pre-purchase research. A deeper paid history report is optional once you have the VIN." },
      { q: "What if I pick the wrong state?", a: "An incorrect state usually returns no match, since the plate won't exist in that state's records. Re-run the lookup with the correct issuing state — it's printed on the plate's sticker or registration card." },
      { q: "Can I see the owner's name by state?", a: "No. The federal Driver's Privacy Protection Act (DPPA) restricts owner personal information regardless of state. Our tool returns vehicle data only — VIN, make, model, and title status." },
    ],
    ctaHeading: "Already Have the VIN? Run a Full Check.",
    ctaSub: "A 17-character VIN gives you the most accurate and complete vehicle history. Find it on the dashboard, driver-side door jamb, or registration card.",
    ctaBtn: "Run a Free VIN Check",
  },
  es: {
    home: "Inicio",
    crumb: "Estado a VIN",
    h1: "Estado a VIN",
    intro: "Encuentra el VIN de un vehículo por su estado emisor y placa de licencia. Elige el estado, ingresa la placa y te devolveremos el VIN de 17 caracteres con el año, marca y modelo decodificados — luego desbloquea el reporte completo de historial. Gratis para los 50 estados y D.C.",
    badges: [
      { icon: Globe, text: "50 estados + D.C." },
      { icon: Shield, text: "Cumple con DPPA" },
      { icon: Clock, text: "Resultados instantáneos" },
      { icon: Search, text: "Búsqueda gratis" },
    ],
    h2How: "Cómo funciona Estado a VIN",
    steps: [
      { n: 1, title: "Selecciona el estado emisor", body: "Cada estado opera su propia base de datos de matriculación del DMV. Elegir primero el estado emisor dirige la consulta a los registros correctos — este es el paso que hace que la coincidencia sea precisa." },
      { n: 2, title: "Ingresa el número de placa", body: "Escribe la placa exactamente como aparece impresa — solo letras y dígitos. Los mismos caracteres de placa pueden repetirse en distintos estados, por eso el estado importa." },
      { n: 3, title: "Obtén el VIN y los detalles del vehículo", body: "Resolvemos la placa a su VIN de 17 caracteres y decodificamos año, marca, modelo y equipamiento — luego puedes obtener el reporte completo de historial con un solo clic." },
    ],
    h2Coverage: "Todos los estados soportados — 50 estados + D.C.",
    coverageIntro: "Selecciona cualquier estado en el menú desplegable arriba para dirigir la consulta a la base de datos de vehículos de ese estado. La cobertura abarca todas las regiones:",
    stateGroups: STATE_GROUPS_ES,
    h2What: "Qué desbloquea el VIN",
    whatBullets: [
      { title: "VIN de 17 caracteres", detail: "El identificador al que está vinculado cada registro." },
      { title: "Año, marca, modelo y equipamiento", detail: "Decodificado directamente del VIN — fabricante, carrocería y motor." },
      { title: "Marcas en el título", detail: "Indicadores de salvamento, inundación, reconstruido, recompra por ley de limones y no reparable." },
      { title: "Registros de accidentes y daños", detail: "Reportes de colisiones y reclamos de seguros de NMVTIS y aseguradoras." },
      { title: "Historial de odómetro", detail: "Kilometraje en cada transferencia de título — expone fraude por rollback." },
      { title: "Recalls de seguridad abiertos", detail: "Campañas de recall no reparadas reportadas por la NHTSA." },
    ],
    crossPre: "¿Prefieres empezar con el número de placa? Usa la ",
    plateLink: "herramienta Placa a VIN",
    crossMid: ". ¿Ya tienes el VIN de 17 caracteres? Sáltate el paso de la placa y haz una ",
    vinLink: "verificación VIN gratis",
    crossSuffix: " directamente.",
    faqHeading: "Estado a VIN — Preguntas frecuentes",
    faqs: [
      { q: "¿Por qué la búsqueda VIN necesita el estado?", a: "Las placas son emitidas por estados individuales, no por el gobierno federal. La misma secuencia de placa puede estar activa en California, Texas y Nueva York a la vez, así que el estado emisor es necesario para consultar la base de datos correcta del DMV y devolver el vehículo correcto." },
      { q: "¿Qué estados están soportados?", a: "Los 50 estados de EE. UU. más el Distrito de Columbia. Se soporta la base de datos de matriculación de vehículos de cada estado — selecciona el estado emisor en el menú desplegable de la herramienta." },
      { q: "¿La búsqueda Estado a VIN es gratis?", a: "Sí. Resolver una placa a un VIN y ver el año, marca y modelo decodificados es gratis para investigación personal previa a la compra. Un reporte de historial pagado más profundo es opcional una vez que tienes el VIN." },
      { q: "¿Qué pasa si elijo el estado equivocado?", a: "Un estado incorrecto usualmente devuelve sin coincidencia, ya que la placa no existirá en los registros de ese estado. Vuelve a ejecutar la búsqueda con el estado emisor correcto — está impreso en la calcomanía de la placa o en la tarjeta de registro." },
      { q: "¿Puedo ver el nombre del propietario por estado?", a: "No. La Ley federal de Protección de la Privacidad del Conductor (DPPA) restringe la información personal del propietario sin importar el estado. Nuestra herramienta devuelve solo datos del vehículo — VIN, marca, modelo y estado del título." },
    ],
    ctaHeading: "¿Ya tienes el VIN? Haz una verificación completa.",
    ctaSub: "Un VIN de 17 caracteres te da el historial vehicular más preciso y completo. Encuéntralo en el tablero, marco de la puerta del conductor o tarjeta de registro.",
    ctaBtn: "Hacer una verificación VIN gratis",
  },
} as const;

interface Props { locale: Locale; }

export default function StateToVinBody({ locale }: Props) {
  const c = COPY[locale];
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} />
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">{c.h1}</h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.intro}</p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-slate-600">
            {c.badges.map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
                <Icon className="w-3.5 h-3.5 text-primary-600" />
                {text}
              </span>
            ))}
          </div>

          <div className="mt-8" id="tool">
            <LicensePlateLookup />
          </div>

          <section id="how-it-works" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{c.h2How}</h2>
            <ol className="space-y-6">
              {c.steps.map(({ n, title, body }) => (
                <li key={n} className="flex gap-4">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">{n}</span>
                  <div>
                    <h3 className="font-bold text-slate-900">{title}</h3>
                    <p className="mt-1 text-slate-600 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="state-coverage" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">{c.h2Coverage}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">{c.coverageIntro}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {c.stateGroups.map(({ region, states: abbrs }) => (
                <div key={region} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">{region}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {abbrs.map((a) => (
                      <span key={a} className="inline-block px-1.5 py-0.5 bg-white border border-slate-200 rounded text-xs font-mono text-slate-700">{a}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="what-you-get" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2What}</h2>
            <ul className="space-y-3">
              {c.whatBullets.map(({ title, detail }) => (
                <li key={title} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{title}</strong> — {detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-10">
            <VinCheckBanner />
          </div>

          <section className="mt-14">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700 text-sm leading-relaxed">
                {c.crossPre}
                <Link href={link("/plate-to-vin")} className="text-primary-600 hover:underline font-medium">{c.plateLink}</Link>
                {c.crossMid}
                <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{c.vinLink}</Link>
                {c.crossSuffix}
              </p>
            </div>
          </section>

          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{c.faqHeading}</h2>
            <dl className="space-y-6">
              {c.faqs.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-14">
            <RelatedChecks exclude="/state-to-vin" />
          </div>
        </div>
      </main>

      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.ctaHeading}</h2>
          <p className="text-slate-600 mb-6">{c.ctaSub}</p>
          <Link href={link("/vin-check")} className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors">
            {c.ctaBtn} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

export const STATE_TO_VIN_FAQS_EN = COPY.en.faqs;
export const STATE_TO_VIN_FAQS_ES = COPY.es.faqs;
