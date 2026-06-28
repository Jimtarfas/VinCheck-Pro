/**
 * Shared body for /vin-check/state/<state> (and ES twin).
 * Wave 18 batch 4 — same full layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import {
  Shield,
  FileText,
  AlertTriangle,
  MapPin,
  CheckCircle,
  ArrowRight,
  Car,
} from "lucide-react";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { states, getStateBySlug, getBrandDescription } from "@/lib/states";
import { getStateEsBySlug, getBrandDescriptionEs } from "@/lib/states-es";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumbVinCheck: "VIN Check",
    crumbByState: "By State",
    badgeFree: "Free · Instant",
    heroP: (state: string, dmv: string) =>
      `Free VIN check for vehicles registered in ${state}. Get a complete vehicle history report — including title brands recorded by the ${dmv}, accident history, salvage records, and recall data — instantly.`,
    h1: (state: string) => `${state} VIN Check`,
    whyHeading: (state: string) => `Why ${state} Drivers Need a VIN Check`,
    whyP1: (state: string, vehicles: string, population: string, dmv: string) =>
      `With approximately ${vehicles} vehicles registered across ${state}'s population of ${population}, the used car market here is large and active. The ${dmv} maintains title and registration records, but those records may not travel with a vehicle that has been bought, sold, or moved across state lines.`,
    whyP2: (state: string) =>
      `A VIN check pulls together title history, odometer readings, salvage and total-loss events, theft records, open recalls, and accident reports from across the country — giving you a complete picture before you buy a used vehicle in ${state}.`,
    whyP3:
      "Whether you're purchasing from a private seller, a dealer, or an online marketplace, a VIN lookup is the single most important step you can take to avoid title washing, hidden flood damage, or undisclosed salvage history.",
    brandsHeading: (state: string) => `Title Brands Recognized in ${state}`,
    brandsSub: (dmv: string) =>
      `The ${dmv} uses the following brands to flag vehicles with significant history.`,
    lemonHeading: (state: string) => `${state} Lemon Law Overview`,
    lemonP1: (state: string) =>
      `${state} buyers are protected against vehicles with persistent defects that can't be repaired after a reasonable number of attempts. If a vehicle has previously been bought back as a lemon, it should be branded on the title — and a VIN check is the fastest way to verify that history.`,
    lemonP2:
      "Even if a vehicle isn't legally a lemon, repeated repair history, recurring recalls, or open safety campaigns can be uncovered through a VIN-based vehicle history report.",
    howHeading: (state: string) => `How to Run a VIN Check in ${state}`,
    howSteps: (state: string) => [
      {
        step: "1",
        title: "Locate the VIN",
        desc: `Find the 17-character VIN on the vehicle. In ${state}, it's typically on the driver-side dashboard, the door jamb sticker, the title, the registration card, or insurance documents.`,
      },
      {
        step: "2",
        title: "Enter the VIN",
        desc: `Type or paste the VIN into the search box on this page. Double-check that all 17 characters are correct — VINs do not contain the letters I, O, or Q.`,
      },
      {
        step: "3",
        title: "Review Your Report",
        desc: `Get an instant report covering title history, ${state} and out-of-state brands, odometer records, accident data, and open recalls.`,
      },
    ],
    factsHeading: (state: string) => `Unique ${state} VIN Facts`,
    didYouKnow: "Did you know?",
    factsAfter: (state: string) =>
      `Local quirks like this make it especially important to use a multi-state VIN history check. Vehicles registered in ${state} may have been previously titled — and possibly damaged — in other states with very different reporting rules.`,
    otherStatesHeading: "VIN Check in Other States",
    viewAll: "View all 50 states",
    sourcesHeading: (state: string) =>
      `${state} VIN Data — Sources & References`,
    sourcesIntro: (state: string) =>
      `Every ${state} title brand, recall, theft and accident claim on this page traces back to a public, authoritative source. The agencies below are the primary data origins our ${state} VIN check cross-references.`,
    sourceItems: (state: string, dmv: string) => [
      {
        href: "https://vehiclehistory.bja.ojp.gov/",
        label: "NMVTIS — Bureau of Justice Assistance",
        note: `Federal title and brand records across all US states, including ${state}.`,
      },
      {
        href: "https://www.nhtsa.gov/recalls",
        label: "NHTSA — Safety Recalls",
        note: `Authoritative open-recall lookup for every vehicle registered in ${state}.`,
      },
      {
        href: "https://www.nicb.org/vincheck",
        label: "NICB VINCheck",
        note: `Free stolen-vehicle and salvage records from US insurance carriers.`,
      },
      {
        href: "https://vpic.nhtsa.dot.gov/decoder/",
        label: "NHTSA VIN Decoder",
        note: "Federal reference decoder for VIN structure and manufacturer codes.",
      },
      {
        href: "https://www.iihs.org/",
        label: "IIHS — Vehicle Safety Ratings",
        note: "Independent crash test and Top Safety Pick data.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/dealers-guide-used-car-rule",
        label: "FTC — Used Car Rule (Buyer's Guide)",
        note: `Federal regulation governing used-vehicle sales in ${state}.`,
      },
    ],
    sourcesFootnote: (state: string, dmv: string, vehicles: string) =>
      `${state} VIN data is verified against NMVTIS, NHTSA, NICB, and ${dmv} records at lookup time. ${state} has approximately ${vehicles} registered vehicles.`,
    relatedHeading: "Related VIN Checks",
    related: (state: string) => [
      {
        href: "/stolen-vehicle-check",
        icon: Shield,
        title: "Stolen Vehicle Check",
        desc: `See if a ${state} VIN is reported stolen.`,
      },
      {
        href: "/salvage-title-check",
        icon: FileText,
        title: "Salvage Title Check",
        desc: `Check for salvage and rebuilt brands across all states.`,
      },
      {
        href: "/accident-history-check",
        icon: Car,
        title: "Accident History Check",
        desc: `Find recorded accident events tied to the VIN.`,
      },
      {
        href: "/lemon-check",
        icon: AlertTriangle,
        title: "Lemon Check",
        desc: `Verify lemon law buyback history nationwide.`,
      },
    ],
    ctaHeading: (state: string) => `Run a ${state} VIN Check Now`,
    ctaSub: "Get an instant vehicle history report for any VIN.",
    ctaTrust: "Trusted by 50,000+ buyers nationwide",
  },
  es: {
    home: "Inicio",
    crumbVinCheck: "Revisión VIN",
    crumbByState: "Por estado",
    badgeFree: "Gratis · Instantáneo",
    heroP: (state: string, dmv: string) =>
      `Revisión VIN gratis para vehículos registrados en ${state}. Obtén un reporte completo del historial vehicular — incluyendo marcas de título registradas por el ${dmv}, historial de accidentes, registros de salvamento y datos de recalls — al instante.`,
    h1: (state: string) => `Revisión VIN de ${state}`,
    whyHeading: (state: string) => `Por qué los conductores de ${state} necesitan una revisión VIN`,
    whyP1: (state: string, vehicles: string, population: string, dmv: string) =>
      `Con aproximadamente ${vehicles} vehículos registrados sobre una población de ${population} en ${state}, el mercado de autos usados aquí es grande y activo. El ${dmv} mantiene los registros de título y registro vehicular, pero esos datos no siempre viajan con el vehículo cuando se compra, vende o traslada entre estados.`,
    whyP2: (state: string) =>
      `Una revisión VIN reúne historial de título, lecturas del odómetro, eventos de salvamento y pérdida total, registros de robo, recalls abiertos y reportes de accidentes de todo el país — dándote una imagen completa antes de comprar un usado en ${state}.`,
    whyP3:
      "Ya sea que compres a un vendedor privado, a un concesionario o en un marketplace en línea, una búsqueda por VIN es el paso más importante que puedes tomar para evitar lavado de título, daño por inundación oculto o historial de salvamento no declarado.",
    brandsHeading: (state: string) => `Marcas de título reconocidas en ${state}`,
    brandsSub: (dmv: string) =>
      `El ${dmv} usa las siguientes marcas para señalar vehículos con historial significativo.`,
    lemonHeading: (state: string) => `Resumen de la Lemon Law en ${state}`,
    lemonP1: (state: string) =>
      `Los compradores en ${state} están protegidos contra vehículos con defectos persistentes que no pueden repararse después de un número razonable de intentos. Si un vehículo fue recomprado previamente como lemon, debería tener marca en el título — y una revisión VIN es la forma más rápida de verificar ese historial.`,
    lemonP2:
      "Incluso si un vehículo legalmente no es un lemon, el historial repetido de reparaciones, recalls recurrentes o campañas de seguridad abiertas pueden descubrirse mediante un reporte de historial vehicular basado en VIN.",
    howHeading: (state: string) => `Cómo hacer una revisión VIN en ${state}`,
    howSteps: (state: string) => [
      {
        step: "1",
        title: "Localiza el VIN",
        desc: `Encuentra el VIN de 17 caracteres en el vehículo. En ${state}, típicamente está en el tablero del lado del conductor, en la calcomanía del marco de la puerta, en el título, en la tarjeta de registro o en documentos del seguro.`,
      },
      {
        step: "2",
        title: "Ingresa el VIN",
        desc: `Escribe o pega el VIN en la casilla de búsqueda de esta página. Verifica que los 17 caracteres estén correctos — los VIN no contienen las letras I, O ni Q.`,
      },
      {
        step: "3",
        title: "Revisa tu reporte",
        desc: `Obtén un reporte instantáneo que cubre historial de título, marcas de ${state} y de otros estados, registros del odómetro, datos de accidentes y recalls abiertos.`,
      },
    ],
    factsHeading: (state: string) => `Datos únicos del VIN en ${state}`,
    didYouKnow: "¿Sabías que…?",
    factsAfter: (state: string) =>
      `Detalles locales como este hacen especialmente importante usar una revisión VIN multi-estatal. Los vehículos registrados en ${state} pueden haber sido titulados antes — y posiblemente dañados — en otros estados con reglas de reporte muy diferentes.`,
    otherStatesHeading: "Revisión VIN en otros estados",
    viewAll: "Ver los 50 estados",
    sourcesHeading: (state: string) =>
      `Datos VIN de ${state} — Fuentes y referencias`,
    sourcesIntro: (state: string) =>
      `Cada marca de título, recall, robo y accidente de ${state} en esta página se rastrea a una fuente pública y autorizada. Las agencias siguientes son los orígenes principales de datos que nuestra revisión VIN de ${state} cruza.`,
    sourceItems: (state: string, dmv: string) => [
      {
        href: "https://vehiclehistory.bja.ojp.gov/",
        label: "NMVTIS — Bureau of Justice Assistance",
        note: `Registros federales de título y marcas en los 50 estados, incluyendo ${state}.`,
      },
      {
        href: "https://www.nhtsa.gov/recalls",
        label: "NHTSA — Retiros de seguridad",
        note: `Búsqueda autorizada de recalls abiertos para cada vehículo registrado en ${state}.`,
      },
      {
        href: "https://www.nicb.org/vincheck",
        label: "NICB VINCheck",
        note: `Registros gratuitos de robos y salvamento de aseguradoras de EE. UU.`,
      },
      {
        href: "https://vpic.nhtsa.dot.gov/decoder/",
        label: "NHTSA VIN Decoder",
        note: "Decodificador federal de referencia para la estructura del VIN y códigos de fabricante.",
      },
      {
        href: "https://www.iihs.org/",
        label: "IIHS — Calificaciones de seguridad",
        note: "Datos independientes de pruebas de choque y Top Safety Pick.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/dealers-guide-used-car-rule",
        label: "FTC — Used Car Rule (Buyer's Guide)",
        note: `Regulación federal que rige la venta de vehículos usados en ${state}.`,
      },
    ],
    sourcesFootnote: (state: string, dmv: string, vehicles: string) =>
      `Los datos VIN de ${state} se verifican contra NMVTIS, NHTSA, NICB y los registros del ${dmv} en el momento de la búsqueda. ${state} tiene aproximadamente ${vehicles} vehículos registrados.`,
    relatedHeading: "Revisiones VIN relacionadas",
    related: (state: string) => [
      {
        href: "/stolen-vehicle-check",
        icon: Shield,
        title: "Verificación de vehículo robado",
        desc: `Mira si un VIN de ${state} está reportado como robado.`,
      },
      {
        href: "/salvage-title-check",
        icon: FileText,
        title: "Verificación de título de salvamento",
        desc: `Verifica marcas de salvamento y reconstruido en los 50 estados.`,
      },
      {
        href: "/accident-history-check",
        icon: Car,
        title: "Verificación de historial de accidentes",
        desc: `Encuentra eventos de accidente registrados vinculados al VIN.`,
      },
      {
        href: "/lemon-check",
        icon: AlertTriangle,
        title: "Verificación de limones",
        desc: `Verifica historial de recompra por lemon law a nivel nacional.`,
      },
    ],
    ctaHeading: (state: string) => `Haz una revisión VIN de ${state} ahora`,
    ctaSub: "Obtén un reporte instantáneo del historial vehicular para cualquier VIN.",
    ctaTrust: "Con la confianza de 50,000+ compradores en el país",
  },
  fr: {
    home: "Accueil",
    crumbVinCheck: "V\u00E9rification VIN",
    crumbByState: "Par \u00E9tat",
    badgeFree: "Gratuit · Instantan\u00E9",
    heroP: (state: string, dmv: string) =>
      `V\u00E9rification VIN gratuite pour les v\u00E9hicules immatricul\u00E9s en ${state}. Obtiens un rapport complet de l'historique du v\u00E9hicule \u2014 y compris les marques de titre enregistr\u00E9es par le ${dmv}, l'historique des accidents, les registres de salvage et les donn\u00E9es de rappels \u2014 instantan\u00E9ment.`,
    h1: (state: string) => `V\u00E9rification VIN ${state}`,
    whyHeading: (state: string) => `Pourquoi les conducteurs de ${state} ont besoin d'une v\u00E9rification VIN`,
    whyP1: (state: string, vehicles: string, population: string, dmv: string) =>
      `Avec environ ${vehicles} v\u00E9hicules immatricul\u00E9s pour une population de ${population} en ${state}, le march\u00E9 de l'occasion ici est vaste et actif. Le ${dmv} maintient les registres de titre et d'immatriculation, mais ces registres peuvent ne pas suivre un v\u00E9hicule qui a \u00E9t\u00E9 achet\u00E9, vendu ou d\u00E9plac\u00E9 entre \u00E9tats.`,
    whyP2: (state: string) =>
      `Une v\u00E9rification VIN rassemble l'historique du titre, les lectures d'odom\u00E8tre, les \u00E9v\u00E9nements de salvage et de perte totale, les registres de vol, les rappels ouverts et les rapports d'accidents \u00E0 travers le pays \u2014 te donnant une image compl\u00E8te avant d'acheter un v\u00E9hicule d'occasion en ${state}.`,
    whyP3:
      "Que tu ach\u00E8tes \u00E0 un vendeur priv\u00E9, \u00E0 un concessionnaire ou sur un marketplace en ligne, une recherche VIN est l'\u00E9tape la plus importante que tu puisses prendre pour \u00E9viter le lavage de titre, les d\u00E9g\u00E2ts d'inondation cach\u00E9s ou l'historique de salvage non d\u00E9clar\u00E9.",
    brandsHeading: (state: string) => `Marques de titre reconnues en ${state}`,
    brandsSub: (dmv: string) =>
      `Le ${dmv} utilise les marques suivantes pour signaler les v\u00E9hicules avec un historique significatif.`,
    lemonHeading: (state: string) => `Aper\u00E7u de la Lemon Law en ${state}`,
    lemonP1: (state: string) =>
      `Les acheteurs en ${state} sont prot\u00E9g\u00E9s contre les v\u00E9hicules avec des d\u00E9fauts persistants qui ne peuvent pas \u00EAtre r\u00E9par\u00E9s apr\u00E8s un nombre raisonnable de tentatives. Si un v\u00E9hicule a \u00E9t\u00E9 pr\u00E9c\u00E9demment rachet\u00E9 comme lemon, cela devrait \u00EAtre marqu\u00E9 sur le titre \u2014 et une v\u00E9rification VIN est le moyen le plus rapide de v\u00E9rifier cet historique.`,
    lemonP2:
      "M\u00EAme si un v\u00E9hicule n'est l\u00E9galement pas un lemon, l'historique r\u00E9p\u00E9t\u00E9 de r\u00E9parations, les rappels r\u00E9currents ou les campagnes de s\u00E9curit\u00E9 ouvertes peuvent \u00EAtre d\u00E9couverts via un rapport d'historique de v\u00E9hicule bas\u00E9 sur le VIN.",
    howHeading: (state: string) => `Comment lancer une v\u00E9rification VIN en ${state}`,
    howSteps: (state: string) => [
      {
        step: "1",
        title: "Localise le VIN",
        desc: `Trouve le VIN de 17 caract\u00E8res sur le v\u00E9hicule. En ${state}, il est typiquement sur le tableau de bord c\u00F4t\u00E9 conducteur, l'autocollant du montant de porte, le titre, la carte d'immatriculation ou les documents d'assurance.`,
      },
      {
        step: "2",
        title: "Saisis le VIN",
        desc: `Tape ou colle le VIN dans la case de recherche de cette page. V\u00E9rifie que les 17 caract\u00E8res sont corrects \u2014 les VIN ne contiennent pas les lettres I, O ou Q.`,
      },
      {
        step: "3",
        title: "Examine ton rapport",
        desc: `Obtiens un rapport instantan\u00E9 couvrant l'historique du titre, les marques de ${state} et hors-\u00E9tat, les registres d'odom\u00E8tre, les donn\u00E9es d'accidents et les rappels ouverts.`,
      },
    ],
    factsHeading: (state: string) => `Faits VIN uniques de ${state}`,
    didYouKnow: "Le savais-tu ?",
    factsAfter: (state: string) =>
      `Les particularit\u00E9s locales comme celle-ci rendent particuli\u00E8rement important d'utiliser une v\u00E9rification VIN multi-\u00E9tats. Les v\u00E9hicules immatricul\u00E9s en ${state} peuvent avoir \u00E9t\u00E9 pr\u00E9c\u00E9demment titr\u00E9s \u2014 et possiblement endommag\u00E9s \u2014 dans d'autres \u00E9tats avec des r\u00E8gles de d\u00E9claration tr\u00E8s diff\u00E9rentes.`,
    otherStatesHeading: "V\u00E9rification VIN dans d'autres \u00E9tats",
    viewAll: "Voir les 50 \u00E9tats",
    sourcesHeading: (state: string) =>
      `Donn\u00E9es VIN ${state} \u2014 Sources et r\u00E9f\u00E9rences`,
    sourcesIntro: (state: string) =>
      `Chaque marque de titre, rappel, vol et accident ${state} sur cette page remonte \u00E0 une source publique et autoris\u00E9e. Les agences ci-dessous sont les principales origines de donn\u00E9es que notre v\u00E9rification VIN ${state} recoupe.`,
    sourceItems: (state: string, dmv: string) => [
      {
        href: "https://vehiclehistory.bja.ojp.gov/",
        label: "NMVTIS \u2014 Bureau of Justice Assistance",
        note: `Registres f\u00E9d\u00E9raux de titre et de marques dans les 50 \u00E9tats des \u00C9tats-Unis, y compris ${state}.`,
      },
      {
        href: "https://www.nhtsa.gov/recalls",
        label: "NHTSA \u2014 Rappels de s\u00E9curit\u00E9",
        note: `Recherche autoris\u00E9e de rappels ouverts pour chaque v\u00E9hicule immatricul\u00E9 en ${state}.`,
      },
      {
        href: "https://www.nicb.org/vincheck",
        label: "NICB VINCheck",
        note: `Registres gratuits de v\u00E9hicules vol\u00E9s et de salvage des assureurs am\u00E9ricains.`,
      },
      {
        href: "https://vpic.nhtsa.dot.gov/decoder/",
        label: "D\u00E9codeur VIN NHTSA",
        note: "D\u00E9codeur f\u00E9d\u00E9ral de r\u00E9f\u00E9rence pour la structure du VIN et les codes de constructeur.",
      },
      {
        href: "https://www.iihs.org/",
        label: "IIHS \u2014 \u00C9valuations de s\u00E9curit\u00E9 des v\u00E9hicules",
        note: "Donn\u00E9es ind\u00E9pendantes de crash tests et Top Safety Pick.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/dealers-guide-used-car-rule",
        label: "FTC \u2014 Used Car Rule (Buyer's Guide)",
        note: `R\u00E9glementation f\u00E9d\u00E9rale r\u00E9gissant la vente de v\u00E9hicules d'occasion en ${state}.`,
      },
    ],
    sourcesFootnote: (state: string, dmv: string, vehicles: string) =>
      `Les donn\u00E9es VIN ${state} sont v\u00E9rifi\u00E9es contre NMVTIS, NHTSA, NICB et les registres du ${dmv} au moment de la recherche. ${state} a environ ${vehicles} v\u00E9hicules immatricul\u00E9s.`,
    relatedHeading: "V\u00E9rifications VIN connexes",
    related: (state: string) => [
      {
        href: "/stolen-vehicle-check",
        icon: Shield,
        title: "V\u00E9rification de v\u00E9hicule vol\u00E9",
        desc: `Regarde si un VIN ${state} est signal\u00E9 comme vol\u00E9.`,
      },
      {
        href: "/salvage-title-check",
        icon: FileText,
        title: "V\u00E9rification de titre salvage",
        desc: `V\u00E9rifie les marques de salvage et reconstruit dans tous les \u00E9tats.`,
      },
      {
        href: "/accident-history-check",
        icon: Car,
        title: "V\u00E9rification de l'historique d'accidents",
        desc: `Trouve les \u00E9v\u00E9nements d'accident enregistr\u00E9s li\u00E9s au VIN.`,
      },
      {
        href: "/lemon-check",
        icon: AlertTriangle,
        title: "V\u00E9rification Lemon",
        desc: `V\u00E9rifie l'historique de rachat lemon law \u00E0 l'\u00E9chelle nationale.`,
      },
    ],
    ctaHeading: (state: string) => `Lance une v\u00E9rification VIN ${state} maintenant`,
    ctaSub: "Obtiens un rapport d'historique du v\u00E9hicule instantan\u00E9 pour n'importe quel VIN.",
    ctaTrust: "Plus de 50 000 acheteurs nous font confiance dans tout le pays",
  },
} as const;

const otherPopularStateSlugs = [
  "california", "texas", "florida", "new-york",
  "illinois", "pennsylvania", "ohio", "georgia",
];

interface Props {
  stateSlug: string;
  locale: Locale;
}

export default function VinCheckStateBody({ stateSlug, locale }: Props) {
  const state = getStateBySlug(stateSlug);
  if (!state) return null;
  const es = locale === "es" ? getStateEsBySlug(stateSlug) : undefined;
  const c = COPY[locale];
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);
  const stateLink = (slug: string) =>
    locale === "es" ? `/es/vin-check/state/${slug}` : `/vin-check/state/${slug}`;

  const stateName = es?.nameEs ?? state.name;
  const dmvName = es?.dmvNameEs ?? state.dmvName;
  const lemonNotes = es?.lemonLawNotesEs ?? state.lemonLawNotes;
  const specialFact = es?.specialFactEs ?? state.specialFact;
  const brandDesc = (brand: string) =>
    locale === "es"
      ? getBrandDescriptionEs(brand, stateName)
      : getBrandDescription(brand, stateName);

  const otherStates = states
    .filter((s) => s.slug !== state.slug && otherPopularStateSlugs.includes(s.slug))
    .slice(0, 8);

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
                { label: c.crumbByState, href: locale === "es" ? "/es/vin-check/state" : "/vin-check/state" },
                { label: stateName },
              ]}
            />
          </div>
          <div className="flex items-center gap-2 mb-3 text-primary-100">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{stateName} ({state.abbr})</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{c.h1(stateName)}</h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">
            {c.heroP(stateName, dmvName)}
          </p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" onDark />
          </div>
        </div>
      </section>

      {/* Why a VIN Check */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {c.whyHeading(stateName)}
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>{c.whyP1(stateName, state.vehiclesRegistered, state.population, dmvName)}</p>
            <p>{c.whyP2(stateName)}</p>
            <p>{c.whyP3}</p>
          </div>
        </div>
      </section>

      {/* Title Brands */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {c.brandsHeading(stateName)}
          </h2>
          <p className="text-slate-700 mb-8">{c.brandsSub(dmvName)}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {state.titleBrands.map((brand) => (
              <div key={brand} className="flex items-start gap-3 p-5 bg-white rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{brand}</h3>
                  <p className="text-sm text-slate-700 mt-0.5">{brandDesc(brand)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lemon Law */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {c.lemonHeading(stateName)}
          </h2>
          <div className="flex items-start gap-4 p-6 bg-amber-50 border border-amber-200 rounded-xl mb-6">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700 leading-relaxed">{lemonNotes}</p>
          </div>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>{c.lemonP1(stateName)}</p>
            <p>{c.lemonP2}</p>
          </div>
        </div>
      </section>

      {/* How To */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            {c.howHeading(stateName)}
          </h2>
          <div className="space-y-4">
            {c.howSteps(stateName).map(({ step, title, desc }) => (
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

      {/* Special Fact */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {c.factsHeading(stateName)}
          </h2>
          <div className="flex items-start gap-4 p-6 bg-primary-50 border border-primary-100 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">{c.didYouKnow}</h3>
              <p className="text-slate-700 leading-relaxed">{specialFact}</p>
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed mt-6">
            {c.factsAfter(stateName)}
          </p>
        </div>
      </section>

      {/* Other States */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {c.otherStatesHeading}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {otherStates.map((s) => {
              const sEs = locale === "es" ? getStateEsBySlug(s.slug) : undefined;
              return (
                <Link
                  key={s.slug}
                  href={stateLink(s.slug)}
                  className="flex items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all"
                >
                  <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">
                    {sEs?.nameEs ?? s.name}
                  </span>
                </Link>
              );
            })}
          </div>
          <Link
            href={locale === "es" ? "/es/vin-check/state" : "/vin-check/state"}
            className="inline-flex items-center gap-1.5 mt-6 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors"
          >
            {c.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Sources & Data Authority */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            {c.sourcesHeading(stateName)}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            {c.sourcesIntro(stateName)}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {c.sourceItems(stateName, dmvName).map((s) => (
              <li key={s.href} className="rounded-xl border border-slate-200 bg-white p-4">
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
            {c.sourcesFootnote(stateName, dmvName, state.vehiclesRegistered)}
          </p>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {c.relatedHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.related(stateName).map(({ href, icon: Icon, title, desc }) => (
              <Link
                key={href}
                href={link(href)}
                className="flex items-start gap-3 p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-primary-600 flex items-center justify-center flex-shrink-0 border border-slate-200">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-700 mt-0.5">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">{c.ctaHeading(stateName)}</h2>
          <p className="text-primary-100 mb-6">{c.ctaSub}</p>
          <VinSearchForm size="sm" />
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-primary-100">
            <CheckCircle className="w-4 h-4" />
            <span>{c.ctaTrust}</span>
          </div>
        </div>
      </section>
    </>
  );
}
