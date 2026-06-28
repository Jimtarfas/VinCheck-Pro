/**
 * Shared body for /vin-check (hub) and /es/vin-check.
 * Wave 18.19 — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import { ArrowRight, Check, X, ShieldCheck, BookOpen } from "lucide-react";
import { makes } from "@/lib/makes";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "VIN Check",
    h1: "Free VIN Check & Decoder",
    heroSub:
      "Decode any Vehicle Identification Number to get a comprehensive vehicle report. Select your vehicle brand below or enter a VIN directly.",
    introH2: "What a Free VIN Check Shows You",
    introP1Pre:
      "A VIN check decodes the 17-character Vehicle Identification Number stamped on every car built since 1981. Those characters aren\u2019t random \u2014 they encode the manufacturer, the assembly plant, the model year, and the vehicle\u2019s core specifications. Running a free VIN check is the fastest way to confirm that a listing matches the actual car in front of you before you ever hand over money.",
    introP2Pre: "Decoding the VIN is free here, and it\u2019s the first step every used-car buyer should take. The decode tells you what the vehicle ",
    introP2Is: "is",
    introP2Mid: "; a full history report then tells you what has ",
    introP2Happened: "happened",
    introP2Suffix:
      " to it \u2014 the title brands, odometer records, and accident history that the VIN alone can\u2019t reveal. Below is exactly what each covers.",
    compareH2: "Free VIN Check vs. Full History Report",
    compareSub:
      "A free decode covers the factory specs. A history report adds the records that accumulate over the car\u2019s life.",
    freeCardTitle: "Free VIN Decode",
    freeIncludes: [
      "Make, model, year, and trim",
      "Engine, transmission, and drivetrain",
      "Body style and country of manufacture",
      "Plant code and the year the VIN encodes",
    ],
    paidCardTitle: "Full History Report",
    paidIncludes: [
      "Title brands (salvage, flood, rebuilt)",
      "Odometer and ownership history",
      "Accident and total-loss records",
      "Open safety recalls and market value",
    ],
    paidExtraNote: "Not available from a free decode alone",
    otherFreeTitle: "Other free VIN resources",
    otherFreeP:
      "tool decodes VINs and lists open recalls, and the non-profit",
    otherFreePLead: "The federal",
    otherFreePMid:
      "shows whether a VIN was reported stolen or declared a salvage total loss by participating insurers. They\u2019re useful complements to a full history report \u2014 not a replacement, since neither shows complete title or odometer history.",
    guideLink:
      "Read the full guide: free vs. paid VIN checks, scams to avoid, and how to read a report",
    brandsH2: "VIN Check by Vehicle Brand",
    brandsSub: "Select a manufacturer to learn more about their VIN format and decode any VIN",
    regions: [
      { label: "American", country: ["USA"] },
      { label: "Japanese", country: ["Japan"] },
      { label: "Korean", country: ["South Korea"] },
      { label: "German", country: ["Germany"] },
      { label: "European", country: ["UK", "Sweden", "Italy"] },
    ],
    brandsSuffix: "Brands",
    faqH2: "Free VIN Check FAQ",
    ctaH2: "Check Any VIN Now",
    ctaSub: "Works with all makes and models from 1981 onwards",
  },
  es: {
    home: "Inicio",
    crumb: "Verificaci\u00f3n VIN",
    h1: "Verificaci\u00f3n VIN gratis y decodificador",
    heroSub:
      "Decodifica cualquier N\u00famero de Identificaci\u00f3n Vehicular para obtener un reporte completo del veh\u00edculo. Selecciona la marca de tu auto abajo o ingresa un VIN directamente.",
    introH2: "Qu\u00e9 te muestra una verificaci\u00f3n VIN gratis",
    introP1Pre:
      "Una verificaci\u00f3n VIN decodifica el N\u00famero de Identificaci\u00f3n Vehicular de 17 caracteres estampado en cada auto fabricado desde 1981. Esos caracteres no son aleatorios \u2014 codifican el fabricante, la planta de ensamblaje, el a\u00f1o modelo y las especificaciones b\u00e1sicas del veh\u00edculo. Ejecutar una verificaci\u00f3n VIN gratis es la forma m\u00e1s r\u00e1pida de confirmar que un anuncio coincide con el auto real frente a ti antes de entregar dinero.",
    introP2Pre:
      "Decodificar el VIN es gratis aqu\u00ed, y es el primer paso que todo comprador de auto usado debe dar. La decodificaci\u00f3n te dice qu\u00e9 ",
    introP2Is: "es",
    introP2Mid: " el veh\u00edculo; un reporte de historial completo luego te dice qu\u00e9 le ha ",
    introP2Happened: "pasado",
    introP2Suffix:
      " \u2014 las marcas de t\u00edtulo, registros del od\u00f3metro e historial de accidentes que el VIN solo no puede revelar. Abajo est\u00e1 exactamente lo que cubre cada uno.",
    compareH2: "Verificaci\u00f3n VIN gratis vs. reporte de historial completo",
    compareSub:
      "Una decodificaci\u00f3n gratis cubre las especificaciones de f\u00e1brica. Un reporte de historial agrega los registros que se acumulan durante la vida del auto.",
    freeCardTitle: "Decodificaci\u00f3n VIN gratis",
    freeIncludes: [
      "Marca, modelo, a\u00f1o y versi\u00f3n",
      "Motor, transmisi\u00f3n y tracci\u00f3n",
      "Tipo de carrocer\u00eda y pa\u00eds de fabricaci\u00f3n",
      "C\u00f3digo de planta y el a\u00f1o que codifica el VIN",
    ],
    paidCardTitle: "Reporte de historial vehicular completo",
    paidIncludes: [
      "Marcas de t\u00edtulo (salvamento, inundaci\u00f3n, reconstruido)",
      "Historial de od\u00f3metro y propiedad",
      "Registros de accidentes y p\u00e9rdida total",
      "Retiros de seguridad abiertos y valor de mercado",
    ],
    paidExtraNote: "No disponible desde una decodificaci\u00f3n gratis sola",
    otherFreeTitle: "Otros recursos VIN gratis",
    otherFreePLead: "La herramienta federal",
    otherFreeP:
      "decodifica VINs y enumera retiros de seguridad abiertos, y la sin fines de lucro",
    otherFreePMid:
      "muestra si un VIN fue reportado robado o declarado p\u00e9rdida total de salvamento por aseguradoras participantes. Son complementos \u00fatiles a un reporte de historial completo \u2014 no un reemplazo, ya que ninguno muestra el historial completo de t\u00edtulo u od\u00f3metro.",
    guideLink:
      "Lee la gu\u00eda completa: verificaciones VIN gratis vs. de pago, estafas a evitar y c\u00f3mo leer un reporte",
    brandsH2: "Verificaci\u00f3n VIN por marca de veh\u00edculo",
    brandsSub:
      "Selecciona un fabricante para aprender m\u00e1s sobre su formato VIN y decodificar cualquier VIN",
    regions: [
      { label: "Americanas", country: ["USA"] },
      { label: "Japonesas", country: ["Japan"] },
      { label: "Coreanas", country: ["South Korea"] },
      { label: "Alemanas", country: ["Germany"] },
      { label: "Europeas", country: ["UK", "Sweden", "Italy"] },
    ],
    brandsSuffix: "marcas",
    faqH2: "Preguntas frecuentes sobre verificaci\u00f3n VIN gratis",
    ctaH2: "Verifica cualquier VIN ahora",
    ctaSub: "Funciona con todas las marcas y modelos desde 1981 en adelante",
  },
  fr: {
    home: "Accueil",
    crumb: "Vérification VIN",
    h1: "Vérification VIN gratuite et décodeur",
    heroSub:
      "Décode n'importe quel numéro d'identification de véhicule pour obtenir un rapport complet du véhicule. Sélectionne la marque de ton véhicule ci-dessous ou saisis un VIN directement.",
    introH2: "Ce qu'une vérification VIN gratuite te montre",
    introP1Pre:
      "Une vérification VIN décode le numéro d'identification de véhicule à 17 caractères estampillé sur chaque voiture construite depuis 1981. Ces caractères ne sont pas aléatoires \u2014 ils encodent le fabricant, l'usine d'assemblage, l'année modèle et les spécifications de base du véhicule. Faire une vérification VIN gratuite est le moyen le plus rapide de confirmer qu'une annonce correspond à la voiture réelle devant toi avant de remettre de l'argent.",
    introP2Pre: "Décoder le VIN est gratuit ici, et c'est la première étape que tout acheteur de voiture d'occasion devrait faire. Le décodage te dit ce que le véhicule ",
    introP2Is: "est",
    introP2Mid: " ; un rapport d'historique complet te dit ensuite ce qui lui est ",
    introP2Happened: "arrivé",
    introP2Suffix:
      " \u2014 les marques de titre, les relevés d'odomètre et l'historique d'accidents que le VIN seul ne peut pas révéler. Voici exactement ce que chacun couvre.",
    compareH2: "Vérification VIN gratuite vs rapport d'historique complet",
    compareSub:
      "Un décodage gratuit couvre les spécifications d'usine. Un rapport d'historique ajoute les registres qui s'accumulent au cours de la vie de la voiture.",
    freeCardTitle: "Décodage VIN gratuit",
    freeIncludes: [
      "Marque, modèle, année et finition",
      "Moteur, transmission et type d'entraînement",
      "Type de carrosserie et pays de fabrication",
      "Code d'usine et année encodée par le VIN",
    ],
    paidCardTitle: "Rapport d'historique complet",
    paidIncludes: [
      "Marques de titre (récupération, inondation, reconstruit)",
      "Historique d'odomètre et de propriété",
      "Registres d'accidents et de perte totale",
      "Rappels de sécurité ouverts et valeur de marché",
    ],
    paidExtraNote: "Non disponible avec un décodage gratuit seul",
    otherFreeTitle: "Autres ressources VIN gratuites",
    otherFreeP:
      "décode les VIN et liste les rappels ouverts, et l'organisation à but non lucratif",
    otherFreePLead: "L'outil fédéral",
    otherFreePMid:
      "montre si un VIN a été déclaré volé ou déclaré perte totale par récupération par les assureurs participants. Ce sont des compléments utiles à un rapport d'historique complet \u2014 pas un remplacement, puisque ni l'un ni l'autre ne montre l'historique complet de titre ou d'odomètre.",
    guideLink:
      "Lis le guide complet : vérifications VIN gratuites vs payantes, arnaques à éviter et comment lire un rapport",
    brandsH2: "Vérification VIN par marque de véhicule",
    brandsSub: "Sélectionne un fabricant pour en apprendre plus sur son format VIN et décoder n'importe quel VIN",
    regions: [
      { label: "Américaines", country: ["USA"] },
      { label: "Japonaises", country: ["Japan"] },
      { label: "Coréennes", country: ["South Korea"] },
      { label: "Allemandes", country: ["Germany"] },
      { label: "Européennes", country: ["UK", "Sweden", "Italy"] },
    ],
    brandsSuffix: "marques",
    faqH2: "FAQ sur la vérification VIN gratuite",
    ctaH2: "Vérifie n'importe quel VIN maintenant",
    ctaSub: "Fonctionne avec toutes les marques et modèles depuis 1981",
  },
} as const;

const FAQS_EN = [
  {
    q: "Is a VIN check really free?",
    a: "Yes. Decoding a VIN to reveal a vehicle's make, model, year, engine, transmission, drivetrain, and factory specifications is completely free here — no signup or credit card. You only pay if you want a full history report covering title brands, odometer records, accidents, and recalls.",
  },
  {
    q: "What does a free VIN check show you?",
    a: "A free VIN check decodes the 17 characters of the Vehicle Identification Number into the manufacturer specifications: make, model, model year, engine and transmission, body style, drivetrain, and the assembly plant. It confirms a listing matches the actual vehicle, which is the first step before any used-car purchase.",
  },
  {
    q: "What's the difference between a free check and a paid report?",
    a: "A free check covers what the VIN itself encodes — the factory specs. A paid history report adds the records that accumulate over a vehicle's life: title brands, salvage and flood events, odometer readings, prior accidents, theft records, and open recalls. For a purchase decision, the history report is what protects you from title washing and hidden damage.",
  },
  {
    q: "Are there other places to get a free VIN check?",
    a: "Yes. The NHTSA vPIC tool decodes VINs and lists open recalls for free, and the NICB VINCheck service lets you see whether a VIN has been reported stolen or declared a salvage total loss by participating insurers (limited to a few searches per day). These government and non-profit tools complement a full commercial history report rather than replace it.",
  },
  {
    q: "Can I trust a free VIN check before buying a used car?",
    a: "A free VIN decode is reliable for confirming the vehicle's identity and specifications. But it cannot reveal whether the car was flooded, salvaged, clocked, or branded a lemon — those live in title and insurance records. Always pair a free decode with a full history report before money changes hands.",
  },
];

const FAQS_ES = [
  {
    q: "\u00bfUna verificaci\u00f3n VIN es realmente gratis?",
    a: "S\u00ed. Decodificar un VIN para revelar la marca, modelo, a\u00f1o, motor, transmisi\u00f3n, tracci\u00f3n y especificaciones de f\u00e1brica de un veh\u00edculo es completamente gratis aqu\u00ed — sin registro ni tarjeta de cr\u00e9dito. Solo pagas si quieres un reporte de historial completo que cubra marcas de t\u00edtulo, registros del od\u00f3metro, accidentes y retiros de seguridad.",
  },
  {
    q: "\u00bfQu\u00e9 te muestra una verificaci\u00f3n VIN gratis?",
    a: "Una verificaci\u00f3n VIN gratis decodifica los 17 caracteres del N\u00famero de Identificaci\u00f3n Vehicular en las especificaciones del fabricante: marca, modelo, a\u00f1o modelo, motor y transmisi\u00f3n, tipo de carrocer\u00eda, tracci\u00f3n y la planta de ensamblaje. Confirma que un anuncio coincida con el veh\u00edculo real, que es el primer paso antes de cualquier compra de auto usado.",
  },
  {
    q: "\u00bfCu\u00e1l es la diferencia entre una verificaci\u00f3n gratis y un reporte de pago?",
    a: "Una verificaci\u00f3n gratis cubre lo que el VIN mismo codifica — las especificaciones de f\u00e1brica. Un reporte de historial de pago agrega los registros que se acumulan durante la vida de un veh\u00edculo: marcas de t\u00edtulo, eventos de salvamento e inundaci\u00f3n, lecturas del od\u00f3metro, accidentes previos, registros de robo y retiros de seguridad abiertos. Para una decisi\u00f3n de compra, el reporte de historial es lo que te protege del lavado de t\u00edtulo y da\u00f1os ocultos.",
  },
  {
    q: "\u00bfHay otros lugares para obtener una verificaci\u00f3n VIN gratis?",
    a: "S\u00ed. La herramienta NHTSA vPIC decodifica VINs y enumera retiros de seguridad abiertos gratis, y el servicio NICB VINCheck te permite ver si un VIN ha sido reportado robado o declarado p\u00e9rdida total de salvamento por aseguradoras participantes (limitado a unas pocas b\u00fasquedas por d\u00eda). Estas herramientas gubernamentales y sin fines de lucro complementan un reporte de historial comercial completo en lugar de reemplazarlo.",
  },
  {
    q: "\u00bfPuedo confiar en una verificaci\u00f3n VIN gratis antes de comprar un auto usado?",
    a: "Una decodificaci\u00f3n VIN gratis es confiable para confirmar la identidad y especificaciones del veh\u00edculo. Pero no puede revelar si el auto fue inundado, declarado salvamento, alterado de kilometraje o marcado como lim\u00f3n — esos viven en registros de t\u00edtulo y de aseguradoras. Siempre combina una decodificaci\u00f3n gratis con un reporte de historial completo antes de que cambie el dinero.",
  },
];

interface Props {
  locale: Locale;
}

export default function VinCheckHubBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const homeHref = locale === "es" ? "/es" : "/";
  const guideHref = locale === "es" ? "/es/guides/free-vin-check" : "/guides/free-vin-check";

  const regions = c.regions.map((r) => ({
    label: r.label,
    makes: makes.filter((m) => (r.country as readonly string[]).includes(m.country)),
  }));

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs onDark items={[{ label: c.home, href: homeHref }, { label: c.crumb }]} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{c.h1}</h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">
            {c.heroSub}
          </p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" onDark />
          </div>
        </div>
      </section>

      {/* Editorial intro — satisfies informational intent for "free vin check" */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{c.introH2}</h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>{c.introP1Pre}</p>
            <p>
              {c.introP2Pre}
              <em>{c.introP2Is}</em>
              {c.introP2Mid}
              <em>{c.introP2Happened}</em>
              {c.introP2Suffix}
            </p>
          </div>
        </div>
      </section>

      {/* Free vs paid — what the SERP roundup winners all address */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.compareH2}</h2>
          <p className="text-slate-700 mb-8">{c.compareSub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">{c.freeCardTitle}</h3>
              <ul className="space-y-2.5">
                {c.freeIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-white rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">{c.paidCardTitle}</h3>
              <ul className="space-y-2.5">
                {c.paidIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2.5 text-sm text-slate-400">
                  <X className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
                  <span>{c.paidExtraNote}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Other free sources + link to the in-depth guide (hub → spoke) */}
          <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{c.otherFreeTitle}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {c.otherFreePLead}{" "}
                  <span className="font-medium text-slate-800">NHTSA vPIC</span> {c.otherFreeP}{" "}
                  <span className="font-medium text-slate-800">NICB VINCheck</span> {c.otherFreePMid}
                </p>
              </div>
            </div>
          </div>

          <Link
            href={guideHref}
            className="inline-flex items-center gap-2 mt-6 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            {c.guideLink}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.brandsH2}</h2>
          <p className="text-slate-700 mb-10">{c.brandsSub}</p>

          {regions.map(({ label, makes: regionMakes }) => (
            <div key={label} className="mb-10">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                {label} {c.brandsSuffix}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {regionMakes.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/vin-check/${m.slug}`}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all group"
                  >
                    <span className="font-semibold text-slate-800 group-hover:text-primary-700 transition-colors">
                      {m.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-primary-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ — informational sub-queries, matched to FAQPage schema */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">{c.faqH2}</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="p-6 bg-white rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">{q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">{c.ctaH2}</h2>
          <p className="text-primary-100 mb-6">{c.ctaSub}</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
