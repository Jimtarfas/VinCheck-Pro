/**
 * Shared body for /vin-check/[make] and its ES twin.
 * Wave 18.19 — full English layout in both locales via COPY={en,es}.
 * Make brand names (Ford, Toyota, Honda, etc.) stay verbatim — proper nouns.
 */

import Link from "next/link";
import {
  Shield,
  Search,
  FileText,
  Clock,
  CheckCircle,
  ArrowRight,
  ScanLine,
  Wrench,
  ShieldAlert,
  Lightbulb,
} from "lucide-react";
import { makes, getMakeBySlug } from "@/lib/makes";
import { getMakeEsBySlug } from "@/lib/makes-es";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Locale } from "@/i18n/config";

interface Props {
  make: string;
  locale: Locale;
}

const COPY = {
  en: {
    home: "Home",
    crumbVinCheck: "VIN Check",
    h1Suffix: "VIN Check & Decoder",
    heroSub: (make: string) =>
      `Look up any ${make} VIN number to get a complete vehicle history report, full specifications, real photos, market values, and equipment details — instantly.`,
    aboutHeading: (make: string) => `About ${make} VIN Numbers`,
    aboutP1: (make: string, desc: string, founded: string, country: string) =>
      `${make} is ${desc}, founded in ${founded} in ${country}. Every ${make} vehicle manufactured since 1981 has a unique 17-character Vehicle Identification Number (VIN) that contains detailed information about the vehicle's specifications, manufacturing details, and history.`,
    aboutP2: (make: string, prefix: string) =>
      `${make} VINs typically begin with the characters "${prefix}", which identify the manufacturer and country of origin. By decoding a ${make} VIN through our free tool, you can instantly access complete vehicle specifications, factory-installed equipment, recall information, market valuations, and real photos.`,
    aboutP3: (make: string, m1: string, m2: string, m3: string) =>
      `Whether you're buying a used ${make} ${m1}, selling your ${make} ${m2}, or verifying the specs on a ${make} ${m3}, our VIN decoder provides all the information you need to make an informed decision.`,
    whatToCheckHeading: (make: string) => `What to Check on a Used ${make}`,
    whatToCheckSub: (make: string) =>
      `${make}-specific VIN details, known model issues, and recall history every buyer should verify.`,
    cardDecoding: (make: string) => `Decoding a ${make} VIN`,
    cardCommonIssues: (make: string) => `Common ${make} Issues to Verify`,
    cardRecallHistory: (make: string) => `${make} Recall History`,
    cardBuyingTip: (make: string) => `Buying a Used ${make}`,
    reportIncludedHeading: (make: string) => `What's Included in a ${make} VIN Report`,
    reportIncludedSub: (make: string) =>
      `Everything you need to know about any ${make} vehicle`,
    features: [
      { titleEn: "Instant VIN Decoding", descEn: "Decode any VIN in under 60 seconds" },
      { titleEn: "Full Specifications", descEn: "Engine, transmission, drivetrain & more" },
      { titleEn: "Vehicle History", descEn: "Ownership, accidents & title records" },
      { titleEn: "Recall Alerts", descEn: "Open recalls & safety campaigns" },
    ],
    popularHeading: (make: string) => `Popular ${make} Models to VIN Check`,
    popularSub: (make: string) => `Run a VIN check on any of these popular ${make} models`,
    howToHeading: (make: string) => `How to Check a ${make} VIN Number`,
    step1Title: "Find the VIN",
    step1Desc: (make: string) =>
      `Locate the 17-character VIN on your ${make}. Check the driver-side dashboard, door jamb sticker, registration, or title.`,
    step2Title: "Enter the VIN Above",
    step2Desc: () =>
      `Type or paste the VIN into the search box above. Make sure all 17 characters are entered correctly.`,
    step3Title: "Get Your Report",
    step3Desc: (make: string) =>
      `View your complete ${make} vehicle report instantly — including specs, photos, market values, and history.`,
    otherBrandsHeading: "Check Other Vehicle Brands",
    otherBrandsCta: "View all brands",
    sourcesHeading: (make: string) => `${make} VIN Data — Sources & References`,
    sourcesIntro: (make: string) =>
      `Every claim on this ${make} VIN check page traces back to a public, authoritative source. The agencies below are the primary data origins behind ${make} title, recall, theft, and accident records in the United States.`,
    sourceItems: (make: string, prefix: string, model1: string) => [
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: `Federal database carrying every ${make} title brand across all 50 states.` },
      { href: "https://www.nhtsa.gov/recalls", label: "NHTSA — Safety Recalls", note: `Authoritative ${make} recall lookup by VIN.` },
      { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: `Stolen and salvage records — ${make} ${model1} is a known theft target.` },
      { href: "https://www.iihs.org/", label: "IIHS — Safety Ratings", note: `Independent crash test results for every modern ${make} model.` },
      { href: "https://vpic.nhtsa.dot.gov/decoder/", label: "NHTSA VIN Decoder", note: `Federal reference decoder for ${make} VIN structure (WMI ${prefix}).` },
      { href: "https://www.fueleconomy.gov/", label: "EPA FuelEconomy.gov", note: `Official ${make} fuel economy and emissions data by model year.` },
    ],
    sourcesFootnote: (make: string, founded: string, country: string) =>
      `${make} VIN data is cross-referenced against NMVTIS, NHTSA, NICB, and licensed insurance providers at the time of each lookup. ${make} was founded in ${founded} in ${country}.`,
    faqHeading: (make: string) => `${make} VIN Check — Frequently Asked Questions`,
    faqs: (make: string, model1: string) => [
      { q: `Is a ${make} VIN check free?`, a: `Yes. Our ${make} VIN check is completely free. Enter the 17-character VIN above to decode the specs and pull available history — no account or payment required.` },
      { q: `How do I look up a ${make} VIN number?`, a: `Find the 17-character VIN on the driver-side dashboard, the door-jamb sticker, or the title, then type or paste it into the search box above. Our ${make} VIN lookup returns specifications, factory equipment, market value, and history in seconds.` },
      { q: `What can a ${make} VIN decoder tell me?`, a: `Decoding a ${make} VIN reveals the model year, engine, trim, body style, and assembly plant, plus factory-installed equipment. Paired with history data it also surfaces title brands, odometer readings, and open recalls.` },
      { q: `Can I check a ${make} for open recalls by VIN?`, a: `Yes. ${make} recall campaigns are tied to the VIN, so a check shows the safety recalls that apply to that specific vehicle and whether the repair has been completed.` },
      { q: `How do I tell if a used ${make} was in an accident?`, a: `Run the VIN above. A ${make} history report flags reported accidents, salvage or rebuilt title brands, and odometer discrepancies recorded in national databases — the records a seller may not disclose.` },
      { q: `Can I check if a ${make} is stolen or has a salvage title?`, a: `A VIN history report surfaces reported salvage, theft, and total-loss records where they appear in national databases. Because models like the ${make} ${model1} are common theft targets, also match the dashboard VIN to the door-jamb sticker and title before buying.` },
    ],
    ctaHeading: (make: string) => `Ready to Check Your ${make} VIN?`,
    ctaSub: "Get instant access to your complete vehicle report",
  },
  es: {
    home: "Inicio",
    crumbVinCheck: "Revisión VIN",
    h1Suffix: "Revisión VIN y decodificador",
    heroSub: (make: string) =>
      `Busca cualquier número VIN de ${make} para obtener un reporte completo del historial vehicular, especificaciones completas, fotos reales, valores de mercado y detalles del equipamiento — al instante.`,
    aboutHeading: (make: string) => `Acerca de los números VIN de ${make}`,
    aboutP1: (make: string, desc: string, founded: string, country: string) =>
      `${make} es ${desc}, fundada en ${founded} en ${country.replace(/\.$/, "")}. Cada vehículo ${make} fabricado desde 1981 tiene un Número de Identificación del Vehículo (VIN) único de 17 caracteres que contiene información detallada sobre las especificaciones, los detalles de fabricación y el historial del vehículo.`,
    aboutP2: (make: string, prefix: string) =>
      `Los VIN de ${make} típicamente comienzan con los caracteres "${prefix}", que identifican al fabricante y al país de origen. Al decodificar un VIN ${make} con nuestra herramienta gratis, puedes acceder al instante a especificaciones completas del vehículo, equipamiento instalado de fábrica, información de retiros, valoraciones de mercado y fotos reales.`,
    aboutP3: (make: string, m1: string, m2: string, m3: string) =>
      `Ya sea que estés comprando un ${make} ${m1} usado, vendiendo tu ${make} ${m2} o verificando las especificaciones de un ${make} ${m3}, nuestro decodificador VIN te da toda la información que necesitas para tomar una decisión informada.`,
    whatToCheckHeading: (make: string) => `Qué revisar en un ${make} usado`,
    whatToCheckSub: (make: string) =>
      `Detalles del VIN específicos de ${make}, problemas conocidos del modelo e historial de retiros que todo comprador debe verificar.`,
    cardDecoding: (make: string) => `Decodificar un VIN ${make}`,
    cardCommonIssues: (make: string) => `Problemas comunes de ${make} a verificar`,
    cardRecallHistory: (make: string) => `Historial de retiros de ${make}`,
    cardBuyingTip: (make: string) => `Comprar un ${make} usado`,
    reportIncludedHeading: (make: string) => `Qué incluye un reporte VIN de ${make}`,
    reportIncludedSub: (make: string) =>
      `Todo lo que necesitas saber sobre cualquier vehículo ${make}`,
    features: [
      { titleEn: "Decodificación VIN instantánea", descEn: "Decodifica cualquier VIN en menos de 60 segundos" },
      { titleEn: "Especificaciones completas", descEn: "Motor, transmisión, tracción y más" },
      { titleEn: "Historial del vehículo", descEn: "Propietarios, accidentes y registros de título" },
      { titleEn: "Alertas de retiros", descEn: "Retiros abiertos y campañas de seguridad" },
    ],
    popularHeading: (make: string) => `Modelos populares de ${make} para revisar VIN`,
    popularSub: (make: string) => `Haz una revisión VIN a cualquiera de estos modelos populares de ${make}`,
    howToHeading: (make: string) => `Cómo revisar un número VIN de ${make}`,
    step1Title: "Encuentra el VIN",
    step1Desc: (make: string) =>
      `Localiza el VIN de 17 caracteres en tu ${make}. Revisa el tablero del lado del conductor, la calcomanía del marco de la puerta, el registro o el título.`,
    step2Title: "Ingresa el VIN arriba",
    step2Desc: () =>
      `Escribe o pega el VIN en la casilla de búsqueda de arriba. Asegúrate de que los 17 caracteres estén ingresados correctamente.`,
    step3Title: "Obtén tu reporte",
    step3Desc: (make: string) =>
      `Ve tu reporte completo del vehículo ${make} al instante — incluyendo especificaciones, fotos, valores de mercado e historial.`,
    otherBrandsHeading: "Verifica otras marcas de vehículos",
    otherBrandsCta: "Ver todas las marcas",
    sourcesHeading: (make: string) => `Datos VIN de ${make} — Fuentes y referencias`,
    sourcesIntro: (make: string) =>
      `Cada afirmación en esta página de revisión VIN de ${make} se rastrea a una fuente pública y autorizada. Las agencias siguientes son los orígenes principales de datos detrás de los registros de título, retiros, robos y accidentes de ${make} en Estados Unidos.`,
    sourceItems: (make: string, prefix: string, model1: string) => [
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: `Base de datos federal que registra cada marca de título de ${make} en los 50 estados.` },
      { href: "https://www.nhtsa.gov/recalls", label: "NHTSA — Retiros de seguridad", note: `Búsqueda autorizada de retiros de ${make} por VIN.` },
      { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: `Registros de robo y salvamento — el ${make} ${model1} es un blanco conocido de robo.` },
      { href: "https://www.iihs.org/", label: "IIHS — Calificaciones de seguridad", note: `Resultados independientes de pruebas de choque para todos los modelos modernos de ${make}.` },
      { href: "https://vpic.nhtsa.dot.gov/decoder/", label: "Decodificador VIN de NHTSA", note: `Decodificador federal de referencia para la estructura del VIN de ${make} (WMI ${prefix}).` },
      { href: "https://www.fueleconomy.gov/", label: "EPA FuelEconomy.gov", note: `Datos oficiales de economía de combustible y emisiones de ${make} por año de modelo.` },
    ],
    sourcesFootnote: (make: string, founded: string, country: string) =>
      `Los datos VIN de ${make} se cruzan contra NMVTIS, NHTSA, NICB y proveedores de seguros licenciados al momento de cada búsqueda. ${make} fue fundada en ${founded} en ${country.replace(/\.$/, "")}.`,
    faqHeading: (make: string) => `Revisión VIN ${make} — Preguntas frecuentes`,
    faqs: (make: string, model1: string) => [
      { q: `¿La revisión VIN de ${make} es gratis?`, a: `Sí. Nuestra revisión VIN de ${make} es completamente gratis. Ingresa el VIN de 17 caracteres arriba para decodificar las especificaciones y obtener el historial disponible — sin cuenta ni pago.` },
      { q: `¿Cómo busco el número VIN de un ${make}?`, a: `Encuentra el VIN de 17 caracteres en el tablero del lado del conductor, la calcomanía del marco de la puerta o el título, luego escríbelo o pégalo en la casilla de búsqueda de arriba. Nuestra búsqueda VIN ${make} devuelve especificaciones, equipamiento de fábrica, valor de mercado e historial en segundos.` },
      { q: `¿Qué me dice un decodificador VIN de ${make}?`, a: `Decodificar un VIN ${make} revela el año del modelo, motor, trim, estilo de carrocería y planta de ensamblaje, más el equipamiento instalado de fábrica. Combinado con datos del historial también muestra marcas de título, lecturas del odómetro y retiros abiertos.` },
      { q: `¿Puedo revisar retiros abiertos de ${make} por VIN?`, a: `Sí. Las campañas de retiro de ${make} están ligadas al VIN, así que una revisión muestra los retiros de seguridad que aplican a ese vehículo específico y si la reparación fue completada.` },
      { q: `¿Cómo sé si un ${make} usado tuvo un accidente?`, a: `Ejecuta el VIN arriba. Un reporte de historial de ${make} señala accidentes reportados, marcas de título salvamento o reconstruido y discrepancias del odómetro registradas en bases de datos nacionales — los registros que un vendedor puede no divulgar.` },
      { q: `¿Puedo revisar si un ${make} es robado o tiene título de salvamento?`, a: `Un reporte de historial VIN muestra registros reportados de salvamento, robo y pérdida total donde aparezcan en bases de datos nacionales. Como modelos como el ${make} ${model1} son blancos comunes de robo, también coteja el VIN del tablero con el del marco de la puerta y el título antes de comprar.` },
    ],
    ctaHeading: (make: string) => `¿Listo para revisar tu VIN de ${make}?`,
    ctaSub: "Obtén acceso instantáneo a tu reporte completo del vehículo",
  },
} as const;

const FEATURE_ICONS = [Search, FileText, Shield, Clock] as const;

export default function VinCheckMakeBody({ make: makeSlug, locale }: Props) {
  const make = getMakeBySlug(makeSlug);
  if (!make) return null;
  const es = locale === "es" ? getMakeEsBySlug(makeSlug) : undefined;
  const c = COPY[locale];

  const description = es?.descriptionEs ?? make.description;
  const country = es?.countryEs ?? make.country;
  const vinNote = es?.vinNoteEs ?? make.vinNote;
  const commonIssues = es?.commonIssuesEs ?? make.commonIssues;
  const recallContext = es?.recallContextEs ?? make.recallContext;
  const buyingTip = es?.buyingTipEs ?? make.buyingTip;

  const m1 = make.popular[0];
  const m2 = make.popular[1] ?? make.popular[0];
  const m3 = make.popular[2] ?? make.popular[0];

  const otherMakesLink = locale === "es" ? "/es/revision-vin" : "/vin-check";
  const otherMakeLink = (slug: string) =>
    locale === "es" ? `/es/revision-vin/${slug}` : `/vin-check/${slug}`;

  const noteCards = [
    { icon: ScanLine, title: c.cardDecoding(make.name), body: vinNote },
    { icon: Wrench, title: c.cardCommonIssues(make.name), body: commonIssues },
    { icon: ShieldAlert, title: c.cardRecallHistory(make.name), body: recallContext },
    { icon: Lightbulb, title: c.cardBuyingTip(make.name), body: buyingTip },
  ];

  const steps = [
    { step: "1", title: c.step1Title, desc: c.step1Desc(make.name) },
    { step: "2", title: c.step2Title, desc: c.step2Desc() },
    { step: "3", title: c.step3Title, desc: c.step3Desc(make.name) },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs
              onDark
              items={[
                { label: c.home, href: locale === "es" ? "/es" : "/" },
                { label: c.crumbVinCheck, href: locale === "es" ? "/es/revision-vin" : "/vin-check" },
                { label: make.name },
              ]}
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {make.name} {c.h1Suffix}
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">
            {c.heroSub(make.name)}
          </p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" onDark />
          </div>
        </div>
      </section>

      {/* About Make */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {c.aboutHeading(make.name)}
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>{c.aboutP1(make.name, description, make.founded, country)}</p>
            <p>{c.aboutP2(make.name, make.vinPrefix)}</p>
            <p>{c.aboutP3(make.name, m1, m2, m3)}</p>
          </div>
        </div>
      </section>

      {/* Make-Specific VIN & History Notes */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {c.whatToCheckHeading(make.name)}
          </h2>
          <p className="text-slate-700 mb-8">
            {c.whatToCheckSub(make.name)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {noteCards.map(({ icon: Icon, title, body }) => (
              <div key={title} className="p-6 bg-white rounded-xl border border-slate-200">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {c.reportIncludedHeading(make.name)}
          </h2>
          <p className="text-slate-700 mb-8">{c.reportIncludedSub(make.name)}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.features.map((f, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div key={f.titleEn} className="flex items-start gap-3 p-5 bg-white rounded-xl border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{f.titleEn}</h3>
                    <p className="text-sm text-slate-700 mt-0.5">{f.descEn}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Models */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {c.popularHeading(make.name)}
          </h2>
          <p className="text-slate-700 mb-8">{c.popularSub(make.name)}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {make.popular.map((model) => (
              <div key={model} className="flex items-center gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all">
                <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">{make.name} {model}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How To */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            {c.howToHeading(make.name)}
          </h2>
          <div className="space-y-4">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">{step}</div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-700 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Makes */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {c.otherBrandsHeading}
          </h2>
          <div className="flex flex-wrap gap-2">
            {makes.filter((m) => m.slug !== make.slug).slice(0, 20).map((m) => (
              <Link key={m.slug} href={otherMakeLink(m.slug)} className="px-4 py-2 bg-slate-50 text-slate-700 text-sm rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 hover:text-primary-700 transition-all font-medium">
                {m.name}
              </Link>
            ))}
          </div>
          <Link href={otherMakesLink} className="inline-flex items-center gap-1.5 mt-6 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors">
            {c.otherBrandsCta} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Sources */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            {c.sourcesHeading(make.name)}
          </h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {c.sourcesIntro(make.name)}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {c.sourceItems(make.name, make.vinPrefix, m1).map((s) => (
              <li key={s.href} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-primary-600 font-semibold underline underline-offset-2 hover:text-primary-700"
                >
                  {s.label} ↗
                </a>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{s.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-slate-500 italic">
            {c.sourcesFootnote(make.name, make.founded, country)}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            {c.faqHeading(make.name)}
          </h2>
          <div className="space-y-3">
            {c.faqs(make.name, m1).map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="font-semibold text-slate-900 pr-2">{f.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-xl font-light group-open:rotate-45 transition-transform">+</span>
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
          <h2 className="text-2xl font-bold mb-3">{c.ctaHeading(make.name)}</h2>
          <p className="text-primary-100 mb-6">{c.ctaSub}</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}

export function getMakeFaqsEn(makeName: string, model1: string) {
  return COPY.en.faqs(makeName, model1);
}
export function getMakeFaqsEs(makeName: string, model1: string) {
  return COPY.es.faqs(makeName, model1);
}
