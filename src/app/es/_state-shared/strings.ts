/**
 * Per-state Spanish content for the dedicated /es/<state>-revision-vin
 * landing pages (Big-5: California, Texas, New York, Illinois, Pennsylvania).
 *
 * The shared chrome (section headings, search box copy, CTA labels) lives
 * in `state.*` of the global dictionary so it stays consistent across all
 * five pages. What changes per state is the hook: meta title/description,
 * the H1, the intro paragraph, the "why this state matters" bullets, the
 * sources, and the FAQ — all packed in here so the page file stays thin.
 *
 * Slug strategy: each state earns a Spanish keyword slug
 * ("/es/california-revision-vin") rather than mirroring the English
 * "/vin-check/state/<state>" path. This is the Wave 1 Florida pattern,
 * extended to the Big-5. Native-language URL = stronger ranking signal
 * for Spanish SERPs.
 */

import type { FC } from "react";
import { MapPin, FileText, AlertCircle, Search, Shield, Car } from "lucide-react";

export interface StateHook {
  /** Slug under /es/ — must match ENGLISH_TO_LOCALE entry in i18n/slugs.ts. */
  esSlug: string;
  /** Original English source path (used for hreflang back-pointer). */
  englishPath: string;
  /** State name in Spanish form (for headings, breadcrumbs, schema). */
  stateNameEs: string;
  /** Two-letter US Postal abbreviation, untranslated. */
  abbr: string;
  /** Friendly DMV name in Spanish ("DMV de California"). */
  dmvNameEs: string;
  /** Meta title (≤55 chars, layout appends "| CarCheckerVIN"). */
  metaTitle: string;
  /** Meta description (~155 chars, packs hook + benefit + friction-reducer). */
  metaDescription: string;
  /** Spanish keyword set for ranking. */
  keywords: string[];
  /** Hero badge state authority line, e.g. "Datos del DMV de California". */
  badgeAuthority: string;
  /** Hero H1 lead (before the accent span). */
  h1Lead: string;
  /** Hero H1 accent (highlighted, secondary-container color). */
  h1Accent: string;
  /** Intro paragraph below the H1 (~280-340 chars, packs key stats). */
  intro: string;
  /** State-specific opener for the "why this state matters" section. */
  whyP1: string;
  /** Stats / context paragraph. */
  whyStats: string;
  /** 3-4 hooks the buyer cares about — each becomes a bullet. */
  whyBullets: Array<{ icon: string; point: string; detail: string }>;
  /** Per-state authoritative sources (state DMV + federal + statute). */
  sources: Array<{ href: string; label: string; note: string }>;
  /** Bottom footnote under sources (closing trust line). */
  sourcesFootnote: string;
  /** Wikipedia page (es.wikipedia.org) for schema "about". */
  wikipediaEs: string;
}

/** Generic "what's in the report" — shared across all Big-5 (and FL). */
export const REPORT_ITEMS_ES: Array<{
  icon: FC<{ className?: string }>;
  title: string;
  desc: string;
}> = [
  {
    icon: FileText,
    title: "Historial de títulos",
    desc:
      "Cada título emitido en este estado y en los otros 49, incluidas marcas, acreedores y transferencias de propiedad.",
  },
  {
    icon: AlertCircle,
    title: "Registros de accidentes",
    desc:
      "Datos de colisiones de aseguradoras, talleres de reparación y reportes del DMV estatal.",
  },
  {
    icon: Search,
    title: "Lecturas del odómetro",
    desc:
      "Lecturas de kilometraje de cada trámite del DMV, inspección y evento de seguro.",
  },
  {
    icon: Shield,
    title: "Registros de robo",
    desc:
      "Referencia cruzada a la base de datos de vehículos robados de la NICB — crítica en áreas metropolitanas grandes.",
  },
  {
    icon: Car,
    title: "Estado de retiros del mercado",
    desc:
      "Todos los retiros activos de seguridad de la NHTSA — entérate antes de registrar el auto.",
  },
  {
    icon: MapPin,
    title: "Daños por inundación y clima severo",
    desc:
      "Marcas de título por inundación, granizo y eventos meteorológicos registrados en el historial federal.",
  },
];

// ── State hook map ────────────────────────────────────────────────────
// Keyed by the English source slug from /vin-check/state/[state]/page.tsx.

export const STATE_HOOKS_ES: Record<string, StateHook> = {
  california: {
    esSlug: "/california-revision-vin",
    englishPath: "/vin-check/state/california",
    stateNameEs: "California",
    abbr: "CA",
    dmvNameEs: "DMV de California",
    metaTitle: "Revisión VIN California gratis — Historial CA al instante",
    metaDescription:
      "Detecta títulos Lemon Law Buyback, salvage revivido y daño por inundación antes de comprar en California. Reporte VIN gratis al instante — sin registro, sin tarjeta.",
    keywords: [
      "revisión VIN California",
      "VIN check California español",
      "historial vehicular California",
      "Lemon Law Buyback California",
      "DMV California VIN",
      "verificar VIN California",
      "salvage California",
      "reporte auto usado California",
    ],
    badgeAuthority: "Datos del DMV de California",
    h1Lead: "Revisión VIN de California —",
    h1Accent: "Reporte gratis del historial del vehículo",
    intro:
      "California tiene cerca de 31 millones de vehículos registrados y la ley lemon más fuerte del país (Song-Beverly). Una revisión VIN gratis te dice si el auto tiene marca de Lemon Law Buyback, salvage revivido, daño por inundación o retiros abiertos — antes de firmar.",
    whyP1:
      "Con aproximadamente 31 millones de vehículos registrados sobre una población de 39.5M, California es el mercado de autos usados más grande de Estados Unidos. El DMV de California mantiene los registros de título y registración, pero esos datos no siempre viajan con el vehículo si fue comprado, vendido o trasladado entre estados.",
    whyStats:
      "Una revisión VIN cruza historial de título, lecturas del odómetro, eventos de salvage y pérdida total, registros de robo, retiros abiertos y reportes de accidentes de todo el país — para que tengas la foto completa antes de comprar un usado en California.",
    whyBullets: [
      {
        icon: "🍋",
        point: "Lemon Law Buyback (único en California)",
        detail:
          "California marca el título con 'Lemon Law Buyback' cuando el fabricante recompra el vehículo bajo Song-Beverly. Estos autos a veces reaparecen con el problema sin resolver o son re-titulados fuera del estado para borrar la marca — una revisión VIN federal los detecta igual.",
      },
      {
        icon: "🔥",
        point: "Riesgo por incendios forestales",
        detail:
          "Los incendios (Camp, Dixie, Caldor) generan miles de vehículos con pérdida total por daño térmico cada año. Muchos se titulan como salvage y se rebobinan, perdiendo solo parte de su valor pero conservando todos los problemas eléctricos.",
      },
      {
        icon: "🚢",
        point: "Puerto de entrada para vehículos importados",
        detail:
          "Long Beach y Oakland reciben grandes volúmenes de autos importados y de otros estados. Algunos ingresan con historiales incompletos o con marcas borradas durante el re-titulado.",
      },
      {
        icon: "🌊",
        point: "Inundaciones por tormentas de invierno",
        detail:
          "Los ríos atmosféricos y tormentas Pineapple Express dejan vehículos inundados que terminan revendidos como 'limpios' en otros estados antes de regresar a California.",
      },
    ],
    sources: [
      {
        href: "https://www.dmv.ca.gov/portal/vehicle-industry-services/vehicle-registration/",
        label: "DMV de California — Registración de vehículos",
        note: "Información oficial de título y registración en California.",
      },
      {
        href: "https://vehiclehistory.bja.ojp.gov/",
        label: "NMVTIS — Bureau of Justice Assistance",
        note: "Sistema Nacional Federal de Información de Títulos de Vehículos.",
      },
      {
        href: "https://www.nhtsa.gov/recalls",
        label: "NHTSA — Retiros de seguridad",
        note: "Base autorizada de retiros activos para cualquier VIN de EE. UU.",
      },
      {
        href: "https://www.nicb.org/vincheck",
        label: "NICB VINCheck",
        note: "Reportes gratuitos de robos y salvage de aseguradoras de EE. UU.",
      },
      {
        href: "https://oag.ca.gov/consumers/general/lemon",
        label: "Procuraduría de California — Lemon Law",
        note: "Guía oficial del estado sobre la ley Song-Beverly.",
      },
      {
        href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1793.22.",
        label: "California Civil Code § 1793.22",
        note: "Estatuto que rige la marca de título Lemon Law Buyback.",
      },
    ],
    sourcesFootnote:
      "Los datos VIN de California se cruzan contra NMVTIS, NHTSA, NICB y los registros del DMV en el momento de cada búsqueda. California tiene aproximadamente 39.5M de habitantes y el mercado de autos usados más activo del país.",
    wikipediaEs: "https://es.wikipedia.org/wiki/California",
  },

  texas: {
    esSlug: "/texas-revision-vin",
    englishPath: "/vin-check/state/texas",
    stateNameEs: "Texas",
    abbr: "TX",
    dmvNameEs: "TxDMV (Departamento de Vehículos de Texas)",
    metaTitle: "Revisión VIN Texas gratis — Historial TX al instante",
    metaDescription:
      "Detecta lavado de título, salvage rebobinado y daño por granizo o inundación en Texas antes de comprar. Reporte VIN gratis al instante — sin registro, sin tarjeta.",
    keywords: [
      "revisión VIN Texas",
      "VIN check Texas español",
      "historial vehicular Texas",
      "lavado de título Texas",
      "TxDMV VIN",
      "verificar VIN Texas",
      "salvage Texas",
      "Hurricane Harvey VIN",
    ],
    badgeAuthority: "Datos del TxDMV",
    h1Lead: "Revisión VIN de Texas —",
    h1Accent: "Reporte gratis del historial del vehículo",
    intro:
      "Texas registra 23.5 millones de vehículos y es uno de los estados más afectados por lavado de título, daño por granizo e inundaciones de huracanes. Una revisión VIN gratis revela marcas de Flood Damage, Hail Damage y salvage rebobinado antes de comprar — sin registro.",
    whyP1:
      "Con cerca de 23.5 millones de vehículos sobre una población de 30.5M, Texas es el segundo mercado de autos usados del país. El TxDMV mantiene los registros de título y registración, pero al ser un estado fronterizo y altamente afectado por el clima, los vehículos cambian de jurisdicción con frecuencia.",
    whyStats:
      "Una revisión VIN cruza historial de título, lecturas del odómetro, eventos de salvage y pérdida total, registros de robo, retiros abiertos y reportes de accidentes de todo el país — incluidos los más de 600,000 vehículos afectados por el huracán Harvey.",
    whyBullets: [
      {
        icon: "🌀",
        point: "Inundaciones por huracanes (Harvey, Beryl)",
        detail:
          "El huracán Harvey por sí solo dañó más de 600,000 vehículos en el área de Houston. Muchos fueron etiquetados como pérdida total por aseguradoras, vendidos a 'rebuilders' y re-titulados en otros estados con marcas borradas — una práctica conocida como 'lavado de título'.",
      },
      {
        icon: "🧊",
        point: "Daño por granizo (Hail Damage — único en Texas)",
        detail:
          "Texas es uno de los pocos estados que emite una marca de título específica de 'Hail Damage'. Cuidado: el daño por granizo a veces se repara cosméticamente pero deja problemas estructurales en el techo, ventanas y sellos.",
      },
      {
        icon: "🚛",
        point: "Frontera y tráfico de vehículos",
        detail:
          "Los puertos de El Paso, Laredo y Brownsville reciben vehículos importados de México y se exportan vehículos de Texas — algunos con historial alterado para ocultar accidentes o salvage previos.",
      },
      {
        icon: "💸",
        point: "Mercado de 'cash sales' privado",
        detail:
          "Texas tiene un alto volumen de ventas privadas en efectivo entre particulares, donde los requisitos de divulgación son menos estrictos que con concesionarios. Un reporte por VIN te protege incluso sin firma del vendedor.",
      },
    ],
    sources: [
      {
        href: "https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle",
        label: "TxDMV — Compra y venta de vehículos",
        note: "Información oficial de título y registración en Texas.",
      },
      {
        href: "https://vehiclehistory.bja.ojp.gov/",
        label: "NMVTIS — Bureau of Justice Assistance",
        note: "Sistema Nacional Federal de Información de Títulos de Vehículos.",
      },
      {
        href: "https://www.nhtsa.gov/recalls",
        label: "NHTSA — Retiros de seguridad",
        note: "Base autorizada de retiros activos para cualquier VIN de EE. UU.",
      },
      {
        href: "https://www.nicb.org/vincheck",
        label: "NICB VINCheck",
        note: "Reportes gratuitos de robos y salvage de aseguradoras de EE. UU.",
      },
      {
        href: "https://statutes.capitol.texas.gov/Docs/TN/htm/TN.501.htm",
        label: "Texas Transportation Code Capítulo 501",
        note: "Estatuto que regula las marcas de título salvage y reconstruido.",
      },
      {
        href: "https://www.iihs.org/topics/auto-theft",
        label: "IIHS — Estadísticas de robos de autos",
        note: "Investigación independiente sobre robos usada en el modelo de riesgo de Texas.",
      },
    ],
    sourcesFootnote:
      "Los datos VIN de Texas se cruzan contra NMVTIS, NHTSA, NICB y los registros del TxDMV en el momento de cada búsqueda. Texas tiene aproximadamente 30.5M de habitantes y un mercado de usados altamente expuesto al fraude por huracanes y granizo.",
    wikipediaEs: "https://es.wikipedia.org/wiki/Texas",
  },

  "new-york": {
    esSlug: "/nueva-york-revision-vin",
    englishPath: "/vin-check/state/new-york",
    stateNameEs: "Nueva York",
    abbr: "NY",
    dmvNameEs: "DMV del Estado de Nueva York",
    metaTitle: "Revisión VIN Nueva York gratis — Historial NY",
    metaDescription:
      "Detecta marcas de título por inundación, salvage rebobinado y reversión del odómetro en Nueva York antes de comprar. Reporte VIN gratis al instante — sin registro.",
    keywords: [
      "revisión VIN Nueva York",
      "VIN check New York español",
      "historial vehicular Nueva York",
      "salvage Nueva York",
      "NY DMV VIN",
      "verificar VIN NY",
      "Hurricane Sandy VIN",
      "reporte auto usado Nueva York",
    ],
    badgeAuthority: "Datos del DMV de Nueva York",
    h1Lead: "Revisión VIN de Nueva York —",
    h1Accent: "Reporte gratis del historial del vehículo",
    intro:
      "Nueva York registra 11.7 millones de vehículos y tiene una ley lemon doble — para autos nuevos y usados. Una revisión VIN gratis revela marcas Rebuilt Salvage, Non-Rebuildable y Flood antes de comprar — sin registro ni tarjeta.",
    whyP1:
      "Con aproximadamente 11.7 millones de vehículos registrados sobre una población de 19.5M, Nueva York combina el mercado urbano más denso del país (NYC) con un alto volumen de vehículos importados por los puertos del Atlántico.",
    whyStats:
      "Una revisión VIN cruza historial de título, lecturas del odómetro, eventos de salvage y pérdida total, registros de robo, retiros abiertos y reportes de accidentes de todo el país — incluidos los más de 250,000 vehículos afectados por el huracán Sandy en 2012.",
    whyBullets: [
      {
        icon: "🌊",
        point: "Daño por Hurricane Sandy y nor'easters",
        detail:
          "El huracán Sandy dejó más de 250,000 vehículos con pérdida total por agua salada en NY y NJ. Muchos fueron reparados superficialmente y vendidos sin marca en otros estados — la electrónica y el sistema híbrido fallan meses después.",
      },
      {
        icon: "🔍",
        point: "Inspección anti-robo obligatoria",
        detail:
          "Nueva York exige una inspección anti-robo del DMV antes de re-titular cualquier vehículo Rebuilt Salvage. Pero si el vehículo se rebobina en otro estado y luego entra a NY, esta verificación se omite — el reporte VIN lo detecta.",
      },
      {
        icon: "🚖",
        point: "Mercado de taxis y rideshare retirados",
        detail:
          "Miles de vehículos de Uber, Lyft y taxis amarillos de NYC se revenden cada año al mercado privado con kilometraje extremo (200K+) que a veces se 'rebobina' antes de ponerlos a la venta.",
      },
      {
        icon: "🧊",
        point: "Corrosión por sal en carreteras",
        detail:
          "Nueva York usa sal masivamente en invierno, causando corrosión estructural acelerada. Un reporte VIN combinado con una inspección presencial te protege contra autos del 'rust belt' con daño oculto.",
      },
    ],
    sources: [
      {
        href: "https://dmv.ny.gov/registration",
        label: "DMV de Nueva York — Registración",
        note: "Información oficial de título y registración en Nueva York.",
      },
      {
        href: "https://vehiclehistory.bja.ojp.gov/",
        label: "NMVTIS — Bureau of Justice Assistance",
        note: "Sistema Nacional Federal de Información de Títulos de Vehículos.",
      },
      {
        href: "https://www.nhtsa.gov/recalls",
        label: "NHTSA — Retiros de seguridad",
        note: "Base autorizada de retiros activos para cualquier VIN de EE. UU.",
      },
      {
        href: "https://www.nicb.org/vincheck",
        label: "NICB VINCheck",
        note: "Reportes gratuitos de robos y salvage de aseguradoras de EE. UU.",
      },
      {
        href: "https://ag.ny.gov/consumer-frauds/lemon-law",
        label: "Procuraduría de NY — Lemon Law",
        note: "Guía oficial sobre las leyes Lemon de autos nuevos y usados.",
      },
      {
        href: "https://www.nysenate.gov/legislation/laws/VAT/A4",
        label: "NY Vehicle and Traffic Law — Artículo 4",
        note: "Estatuto que rige los certificados de título y marcas.",
      },
    ],
    sourcesFootnote:
      "Los datos VIN de Nueva York se cruzan contra NMVTIS, NHTSA, NICB y los registros del DMV en el momento de cada búsqueda. Nueva York tiene aproximadamente 19.5M de habitantes y uno de los mercados de usados con más alto riesgo de fraude por inundación post-Sandy.",
    wikipediaEs: "https://es.wikipedia.org/wiki/Nueva_York_(estado)",
  },

  illinois: {
    esSlug: "/illinois-revision-vin",
    englishPath: "/vin-check/state/illinois",
    stateNameEs: "Illinois",
    abbr: "IL",
    dmvNameEs: "Secretaría de Estado de Illinois — Servicios Vehiculares",
    metaTitle: "Revisión VIN Illinois gratis — Historial IL al instante",
    metaDescription:
      "Detecta marcas Salvage, Rebuilt, Junk y Flood en Illinois antes de comprar. Reporte VIN gratis al instante con datos del Secretary of State — sin registro ni tarjeta.",
    keywords: [
      "revisión VIN Illinois",
      "VIN check Illinois español",
      "historial vehicular Illinois",
      "salvage Illinois",
      "Illinois Secretary of State VIN",
      "verificar VIN Illinois",
      "Chicago VIN check",
      "reporte auto Illinois",
    ],
    badgeAuthority: "Datos del Illinois Secretary of State",
    h1Lead: "Revisión VIN de Illinois —",
    h1Accent: "Reporte gratis del historial del vehículo",
    intro:
      "Illinois registra 10.7 millones de vehículos y tipifica como delito la alteración de un VIN. Una revisión VIN gratis revela marcas Salvage, Rebuilt, Junk y Flood, lecturas del odómetro y retiros abiertos — al instante, sin registro.",
    whyP1:
      "Con aproximadamente 10.7 millones de vehículos sobre una población de 12.5M, Illinois centraliza un mercado de usados grande alrededor de Chicago — uno de los principales hubs de redistribución del Medio Oeste.",
    whyStats:
      "Una revisión VIN cruza historial de título, lecturas del odómetro, eventos de salvage y pérdida total, registros de robo, retiros abiertos y reportes de accidentes de todo el país — esenciales en un estado donde el Secretary of State investiga activamente la manipulación de VINs.",
    whyBullets: [
      {
        icon: "⚖️",
        point: "VIN tampering = delito grave",
        detail:
          "Illinois tipifica como felonía la alteración de un VIN, y la Secretaría de Estado tiene una unidad dedicada de investigación. Un VIN limpio en el reporte indica que el número no ha sido reemplazado — clave en vehículos importados o de salvage.",
      },
      {
        icon: "🚛",
        point: "Hub de redistribución del Medio Oeste",
        detail:
          "Chicago es uno de los principales puertos de entrada para vehículos vendidos en subastas (Copart, IAA) que luego se redistribuyen a Iowa, Wisconsin, Indiana y México. Muchos llegan con marcas Salvage o Junk de la Costa Este.",
      },
      {
        icon: "❄️",
        point: "Corrosión por sal del 'Rust Belt'",
        detail:
          "Los inviernos de Illinois requieren grandes cantidades de sal en las carreteras, lo que causa daño estructural acelerado. Los vehículos pueden verse limpios cosméticamente pero tener corrosión en los chasís — el reporte muestra el historial completo.",
      },
      {
        icon: "💧",
        point: "Inundaciones del río Mississippi e Illinois",
        detail:
          "Las inundaciones periódicas a lo largo de los ríos Mississippi e Illinois generan vehículos con marca Flood que a menudo se venden privadamente entre estados vecinos.",
      },
    ],
    sources: [
      {
        href: "https://www.ilsos.gov/departments/vehicles/title_and_registration.html",
        label: "Illinois Secretary of State — Título y Registración",
        note: "Información oficial de título y registración en Illinois.",
      },
      {
        href: "https://vehiclehistory.bja.ojp.gov/",
        label: "NMVTIS — Bureau of Justice Assistance",
        note: "Sistema Nacional Federal de Información de Títulos de Vehículos.",
      },
      {
        href: "https://www.nhtsa.gov/recalls",
        label: "NHTSA — Retiros de seguridad",
        note: "Base autorizada de retiros activos para cualquier VIN de EE. UU.",
      },
      {
        href: "https://www.nicb.org/vincheck",
        label: "NICB VINCheck",
        note: "Reportes gratuitos de robos y salvage de aseguradoras de EE. UU.",
      },
      {
        href: "https://www.illinoisattorneygeneral.gov/consumers/lemonbroch.html",
        label: "Procuraduría de Illinois — New Vehicle Buyer Protection Act",
        note: "Guía oficial sobre la ley lemon de Illinois (12 meses / 12,000 millas).",
      },
      {
        href: "https://www.ilga.gov/legislation/ilcs/ilcs5.asp?ActID=1815",
        label: "Illinois Vehicle Code (625 ILCS 5)",
        note: "Estatuto que rige los certificados de título y delitos de VIN.",
      },
    ],
    sourcesFootnote:
      "Los datos VIN de Illinois se cruzan contra NMVTIS, NHTSA, NICB y los registros del Secretary of State en el momento de cada búsqueda. Illinois tiene aproximadamente 12.5M de habitantes y un mercado de usados con alto riesgo de manipulación de VINs y corrosión por sal.",
    wikipediaEs: "https://es.wikipedia.org/wiki/Illinois",
  },

  pennsylvania: {
    esSlug: "/pensilvania-revision-vin",
    englishPath: "/vin-check/state/pennsylvania",
    stateNameEs: "Pensilvania",
    abbr: "PA",
    dmvNameEs: "PennDOT (Departamento de Transporte de Pensilvania)",
    metaTitle: "Revisión VIN Pensilvania gratis — Historial PA",
    metaDescription:
      "Detecta marcas Salvage, Reconstructed, Flood y Non-Repairable en Pensilvania antes de comprar. Reporte VIN gratis al instante con datos del PennDOT — sin registro.",
    keywords: [
      "revisión VIN Pensilvania",
      "VIN check Pennsylvania español",
      "historial vehicular Pensilvania",
      "salvage Pensilvania",
      "PennDOT VIN",
      "verificar VIN PA",
      "reconstructed Pennsylvania",
      "reporte auto Pensilvania",
    ],
    badgeAuthority: "Datos del PennDOT",
    h1Lead: "Revisión VIN de Pensilvania —",
    h1Accent: "Reporte gratis del historial del vehículo",
    intro:
      "Pensilvania registra 10.5 millones de vehículos y exige una inspección reforzada de cualquier auto 'Reconstructed' antes de re-titularse. Una revisión VIN gratis revela marcas Salvage, Reconstructed, Flood y Non-Repairable al instante — sin registro ni tarjeta.",
    whyP1:
      "Con aproximadamente 10.5 millones de vehículos sobre una población de 13.0M, Pensilvania conecta el corredor noreste con el Medio Oeste — un punto de tránsito clave para vehículos salvage que cruzan fronteras estatales.",
    whyStats:
      "Una revisión VIN cruza historial de título, lecturas del odómetro, eventos de salvage y pérdida total, registros de robo, retiros abiertos y reportes de accidentes de todo el país — incluidos los vehículos reconstruidos que requieren la inspección reforzada del PennDOT.",
    whyBullets: [
      {
        icon: "🔧",
        point: "Inspección reforzada para 'Reconstructed'",
        detail:
          "Pensilvania exige una inspección reforzada por un agente autorizado para cualquier vehículo reconstruido antes de re-titularse. Pero si el vehículo se reconstruye en otro estado y luego entra a PA, esta verificación a menudo se omite — el reporte VIN saca a la luz el origen.",
      },
      {
        icon: "❄️",
        point: "Corrosión por sal y nieve",
        detail:
          "Los inviernos en Pensilvania exigen grandes cantidades de sal, causando óxido estructural en chasís, frenos y líneas de combustible. Un reporte VIN combinado con inspección presencial protege contra autos del 'rust belt' con daño oculto.",
      },
      {
        icon: "🚛",
        point: "Tránsito interestatal alto (I-80, I-76, I-95)",
        detail:
          "PA es un corredor de tránsito clave. Vehículos con marcas de salvage en NY, NJ o el Medio Oeste pasan por aquí y a veces se re-titulan localmente para borrar marcas problemáticas.",
      },
      {
        icon: "💧",
        point: "Inundaciones por tormentas tropicales",
        detail:
          "Los remanentes de huracanes (Ida 2021, Sandy 2012) dejan vehículos inundados en el sureste de PA que entran al mercado privado sin divulgación clara.",
      },
    ],
    sources: [
      {
        href: "https://www.dmv.pa.gov/Vehicle-Services/Title-Registration/Pages/default.aspx",
        label: "PennDOT — Título y Registración",
        note: "Información oficial de título y registración en Pensilvania.",
      },
      {
        href: "https://vehiclehistory.bja.ojp.gov/",
        label: "NMVTIS — Bureau of Justice Assistance",
        note: "Sistema Nacional Federal de Información de Títulos de Vehículos.",
      },
      {
        href: "https://www.nhtsa.gov/recalls",
        label: "NHTSA — Retiros de seguridad",
        note: "Base autorizada de retiros activos para cualquier VIN de EE. UU.",
      },
      {
        href: "https://www.nicb.org/vincheck",
        label: "NICB VINCheck",
        note: "Reportes gratuitos de robos y salvage de aseguradoras de EE. UU.",
      },
      {
        href: "https://www.attorneygeneral.gov/protect-yourself/consumer-advisories/automobile-lemon-law/",
        label: "Procuraduría de PA — Lemon Law",
        note: "Guía oficial sobre la ley lemon de Pensilvania.",
      },
      {
        href: "https://www.legis.state.pa.us/cfdocs/legis/LI/uconsCheck.cfm?txtType=HTM&yr=1959&sessInd=0&smthLwInd=0&act=0032.",
        label: "Pennsylvania Vehicle Code (Title 75)",
        note: "Estatuto que rige los certificados de título y marcas en PA.",
      },
    ],
    sourcesFootnote:
      "Los datos VIN de Pensilvania se cruzan contra NMVTIS, NHTSA, NICB y los registros del PennDOT en el momento de cada búsqueda. Pensilvania tiene aproximadamente 13.0M de habitantes y un mercado de usados sujeto a corrosión por sal y tránsito interestatal alto.",
    wikipediaEs: "https://es.wikipedia.org/wiki/Pensilvania",
  },
};
