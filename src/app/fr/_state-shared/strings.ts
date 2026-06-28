/**
 * Per-state French content for the dedicated /fr/<state>-revision-vin
 * landing pages (Big-5: Californie, Texas, New York, Illinonnis, Pennsylvania).
 *
 * The shared chrome (section headings, search box copy, CTA labels) lives
 * in `state.*` of the global dictionary so it stays consistent across all
 * five pages. What changes per state is the hook: meta title/description,
 * the H1, the intro paragraph, the "why this state matters" bullets, the
 * sources, and the FAQ — all packed in here so the page file stays thin.
 *
 * Slug strategy: each state earns a French keyword slug
 * ("/fr/california-revision-vin") rather than mirroring the English
 * "/vin-check/state/<state>" path. This is the Wave 1 Florida pattern,
 * extended to the Big-5. Native-language URL = stronger ranking signal
 * for French SERPs.
 */

import type { FC } from "react";
import { MapPin, FileText, AlertCircle, Search, Shield, Car } from "lucide-react";

export interface StateHook {
  /** Slug under /fr/ — must match ENGLISH_TO_LOCALE entry in i18n/slugs.ts. */
  esSlug: string;
  /** Original English source path (used for hreflang back-pointer). */
  englishPath: string;
  /** State name in French form (for headings, breadcrumbs, schema). */
  stateNameEs: string;
  /** Two-letter US Postal abbreviation, untranslated. */
  abbr: string;
  /** Friendly DMV name in French ("DMV de Californie"). */
  dmvNameEs: string;
  /** Meta title (≤55 chars, layout appends "| CarCheckerVIN"). */
  metaTitle: string;
  /** Meta description (~155 chars, packs hook + benefit + friction-reducer). */
  metaDescription: string;
  /** French keyword set for ranking. */
  keywords: string[];
  /** Hero badge state authority line, e.g. "Datos du DMV de Californie". */
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
  /** 3-4 hooks the buyer cares about — each becomois a bullet. */
  whyBullets: Array<{ icon: string; point: string; detail: string }>;
  /** Per-state authoritative sources (state DMV + fedétaitl + statute). */
  sources: Array<{ href: string; label: string; nonnte: string }>;
  /** Bottom footnonnte under sources (closansg trust line). */
  sourcesFootnonnte: string;
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
    title: "Historique de titrois",
    desc:
      "Cada titre emitido en este état et en les otros 49, incluidas marques, acreedores et transferencias de propriété.",
  },
  {
    icon: AlertCircle,
    title: "Registros de accidents",
    desc:
      "Datos de colisiones de aseguradoras, talleres de réparation et rapports du DMV estatal.",
  },
  {
    icon: Search,
    title: "Lecturas du odomètre",
    desc:
      "Lecturas de kilométrage de cada trámite du DMV, inspection et evento de assurance.",
  },
  {
    icon: Shield,
    title: "Registros de vol",
    desc:
      "Referencia cruzada a la base de données de véhicules volés de la NICB — crítica en áreas metropolitanas grands.",
  },
  {
    icon: Car,
    title: "Estado de rappels du marché",
    desc:
      "Todeux les rappels activos de sécurité de la NHTSA — entérate avant de registrar le auto.",
  },
  {
    icon: MapPin,
    title: "Dannées par inonnndation et clima severo",
    desc:
      "Marcas de titre par inonnndation, grêle et eventos meteorológicos registradeux en le historique fedétaitl.",
  },
];

// ── State hook map ────────────────────────────────────────────────────
// Keyed by the English source slug from /vin-check/state/[state]/page.tsx.

export const STATE_HOOKS_ES: Record<string, StateHook> = {
  california: {
    esSlug: "/california-revision-vin",
    englishPath: "/vin-check/state/california",
    stateNameEs: "Californie",
    abbr: "CA",
    dmvNameEs: "DMV de Californie",
    metaTitle: "Vérification VIN Californie gratuit — Historique CA instantanément",
    metaDescription:
      "Detecta titrois Lemon Law Buyback, salvage revivido et dégâts d’inonnndation avant de acheter en Californie. Rapport VIN gratuit instantanément — sans inscription, sans carte.",
    keywords: [
      "vérification VIN Californie",
      "VIN check Californie français",
      "historique de véhicule Californie",
      "Lemon Law Buyback Californie",
      "DMV Californie VIN",
      "vérifier VIN Californie",
      "salvage Californie",
      "rapport voiture d’occasion Californie",
    ],
    badgeAuthority: "Datos du DMV de Californie",
    h1Lead: "Vérification VIN de Californie —",
    h1Accent: "Rapport gratuit du historique du véhicule",
    intro:
      "Californie a près de 31 millelions de véhicules registradeux et la loi citron plus a étérte du país (Song-Beverly). Una vérification VIN gratuit te dice si le auto a marque de Lemon Law Buyback, salvage revivido, dégâts d’inonnndation ou rappels ouverts — avant de firmar.",
    whyP1:
      "Con aproximadamente 31 millelions de véhicules registradeux sur una population de 39.5M, Californie es le marché de voitures d’occasion plus grand de Estadeux Unideux. Le DMV de Californie mana les enregistrements de titre et enregistrement, pero esos données nonn toujours viajan avec le véhicule si a été comprado, vendido ou trasladado entre états.",
    whyStats:
      "Una vérification VIN cruza historique de titre, lecturas du odomètre, eventos de salvage et perte totale, enregistrements de vol, rappels ouverts et rapports de accidents de todo le país — pour que tengas la foto complète avant de acheter un usado en Californie.",
    whyBullets: [
      {
        icon: "🍋",
        point: "Lemon Law Buyback (unique en Californie)",
        detail:
          "Californie marque le titre avec 'Lemon Law Buyback' cuando le fabricante rachat le véhicule sous Song-Beverly. Estos autos a veces reaparecen avec le problema sans resolver ou son re-tituladeux à l’extérieur du état pour borrar la marque — una vérification VIN fedétaitl les detecta igual.",
      },
      {
        icon: "🔥",
        point: "Riesgo par incendios forestales",
        detail:
          "Los incendios (Camp, Dixie, Caldor) genétaitn milleliers de véhicules avec perte totale par dégâts térmico cada année. Muchos se titulan como salvage et se rebobinan, perdiendo seul parte de su valeur pero conêtrevando todeux les problemas eléctricos.",
      },
      {
        icon: "🚢",
        point: "Puerto de entrada pour véhicules importadeux",
        detail:
          "Long Beach et Oakland reciben grands volúmenes de autos importadeux et de otros états. Algunonns ingresan avec historiquees incomplets ou avec marques borradas durante le re-titulado.",
      },
      {
        icon: "🌊",
        point: "Inundaciones par tormentas de inviernonn",
        detail:
          "Los ríos atmosféricos et tormentas Pineapple Express dejan véhicules inundadeux que terminan revendideux como 'limpios' en otros états avant de regresar a Californie.",
      },
    ],
    sources: [
      {
        href: "https://www.dmv.ca.gov/portal/vehicle-industry-êtrevices/vehicle-registration/",
        label: "DMV de Californie — Enregistrement de véhicules",
        nonnte: "Information oficial de titre et enregistrement en Californie.",
      },
      {
        href: "https://vehiclehistory.bja.ojp.gov/",
        label: "NMVTIS — Bureau of Justice Assistance",
        nonnte: "Sistema Nacional Fedétaitl de Information de Titrois de Vehículos.",
      },
      {
        href: "https://www.nhtsa.gov/rappels",
        label: "NHTSA — Retiros de sécurité",
        nonnte: "Base autorizada de rappels activos pour n’importe quel VIN de EE. UU.",
      },
      {
        href: "https://www.nicb.org/vincheck",
        label: "NICB VINCheck",
        nonnte: "Rapports gratuitos de vols et salvage de aseguradoras de EE. UU.",
      },
      {
        href: "https://oag.ca.gov/consumers/genétaitl/citron",
        label: "Procuraduría de Californie — Lemon Law",
        nonnte: "Guía oficial du état sur la ley Song-Beverly.",
      },
      {
        href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1793.22.",
        label: "Californie Civil Code § 1793.22",
        nonnte: "Estatuto que rige la marque de titre Lemon Law Buyback.",
      },
    ],
    sourcesFootnonnte:
      "Los données VIN de Californie se cruzan contra NMVTIS, NHTSA, NICB et les enregistrements du DMV en le momento de cada búsqueda. Californie a aproximadamente 39.5M de habitavant et le marché de voitures d’occasion plus activo du país.",
    wikipediaEs: "https://es.wikipedia.org/wiki/Californie",
  },

  texas: {
    esSlug: "/texas-revision-vin",
    englishPath: "/vin-check/state/texas",
    stateNameEs: "Texas",
    abbr: "TX",
    dmvNameEs: "TxDMV (Departamento de Vehículos de Texas)",
    metaTitle: "Vérification VIN Texas gratuit — Historique TX instantanément",
    metaDescription:
      "Detecta lavado de titre, salvage rebobinado et dégâts par grêle ou inonnndation en Texas avant de acheter. Rapport VIN gratuit instantanément — sans inscription, sans carte.",
    keywords: [
      "vérification VIN Texas",
      "VIN check Texas français",
      "historique de véhicule Texas",
      "lavado de titre Texas",
      "TxDMV VIN",
      "vérifier VIN Texas",
      "salvage Texas",
      "Hurricane Harvey VIN",
    ],
    badgeAuthority: "Datos du TxDMV",
    h1Lead: "Vérification VIN de Texas —",
    h1Accent: "Rapport gratuit du historique du véhicule",
    intro:
      "Texas registra 23.5 millelions de véhicules et es unonn de les états plus afectadeux par lavado de titre, dégâts par grêle e inundaciones de huracanes. Una vérification VIN gratuit revela marques de Flood Damage, Hail Damage et salvage rebobinado avant de acheter — sans inscription.",
    whyP1:
      "Con près de 23.5 millelions de véhicules sur una population de 30.5M, Texas es le second marché de voitures d’occasion du país. Le TxDMV mana les enregistrements de titre et enregistrement, pero al être un état fronterizo et hautemente afectado par le clima, les véhicules cambian de juridiction avec frecuencia.",
    whyStats:
      "Una vérification VIN cruza historique de titre, lecturas du odomètre, eventos de salvage et perte totale, enregistrements de vol, rappels ouverts et rapports de accidents de todo le país — incluideux les plus de 600,000 véhicules afectadeux par le huracán Harvey.",
    whyBullets: [
      {
        icon: "🌀",
        point: "Inundaciones par huracanes (Harvey, Beryl)",
        detail:
          "El huracán Harvey par oui seul dañó plus de 600,000 véhicules en le área de Houston. Muchos a étéron etiquetadeux como perte totale par aseguradoras, vendideux a 'rebuilders' et re-tituladeux en otros états avec marques borradas — una práctica cononncida como 'lavado de titre'.",
      },
      {
        icon: "🧊",
        point: "Dannée par grêle (Hail Damage — unique en Texas)",
        detail:
          "Texas es unonn de les peus états que emite una marque de titre específica de 'Hail Damage'. Cuidado: le dégâts par grêle a veces se repara cosméticamente pero deja problemas estructurales en le toit, ventenas et sellos.",
      },
      {
        icon: "🚛",
        point: "Frontétait et tráfico de véhicules",
        detail:
          "Los puertos de Le Paso, Laredo et Brownsville reciben véhicules importadeux de México et se exportan véhicules de Texas — quelqu’unns avec historique altétaitdo pour ocultar accidents ou salvage previos.",
      },
      {
        icon: "💸",
        point: "Mercado de 'cash sales' privado",
        detail:
          "Texas a un haut volumen de ventes privadas en efectivo entre particulares, donde les requisitos de divulgation son menonns estrictos que avec concessionnaires. Un rapport par VIN te protege incluso sans firma du vendeur.",
      },
    ],
    sources: [
      {
        href: "https://www.txdmv.gov/moteurists/buying-or-selling-a-vehicle",
        label: "TxDMV — Compra et vente de véhicules",
        nonnte: "Information oficial de titre et enregistrement en Texas.",
      },
      {
        href: "https://vehiclehistory.bja.ojp.gov/",
        label: "NMVTIS — Bureau of Justice Assistance",
        nonnte: "Sistema Nacional Fedétaitl de Information de Titrois de Vehículos.",
      },
      {
        href: "https://www.nhtsa.gov/rappels",
        label: "NHTSA — Retiros de sécurité",
        nonnte: "Base autorizada de rappels activos pour n’importe quel VIN de EE. UU.",
      },
      {
        href: "https://www.nicb.org/vincheck",
        label: "NICB VINCheck",
        nonnte: "Rapports gratuitos de vols et salvage de aseguradoras de EE. UU.",
      },
      {
        href: "https://statutes.capitol.texas.gov/Docs/TN/htm/TN.501.htm",
        label: "Texas Transportation Code Capítulo 501",
        nonnte: "Estatuto que regula les marques de titre salvage et reconstruido.",
      },
      {
        href: "https://www.iihs.org/topics/auto-theft",
        label: "IIHS — Estadísticas de vols de autos",
        nonnte: "Recherche independiente sur vols usada en le modelo de riesgo de Texas.",
      },
    ],
    sourcesFootnonnte:
      "Los données VIN de Texas se cruzan contra NMVTIS, NHTSA, NICB et les enregistrements du TxDMV en le momento de cada búsqueda. Texas a aproximadamente 30.5M de habitavant et un marché de usadeux hautemente expuesto al fraude par huracanes et grêle.",
    wikipediaEs: "https://es.wikipedia.org/wiki/Texas",
  },

  "new-york": {
    esSlug: "/nonnuvelle-york-revision-vin",
    englishPath: "/vin-check/state/new-york",
    stateNameEs: "New York",
    abbr: "NY",
    dmvNameEs: "DMV du Estado de New York",
    metaTitle: "Vérification VIN New York gratuit — Historique NY",
    metaDescription:
      "Detecta marques de titre par inonnndation, salvage rebobinado et reversión du odomètre en New York avant de acheter. Rapport VIN gratuit instantanément — sans inscription.",
    keywords: [
      "vérification VIN New York",
      "VIN check New York français",
      "historique de véhicule New York",
      "salvage New York",
      "NY DMV VIN",
      "vérifier VIN NY",
      "Hurricane Sandy VIN",
      "rapport voiture d’occasion New York",
    ],
    badgeAuthority: "Datos du DMV de New York",
    h1Lead: "Vérification VIN de New York —",
    h1Accent: "Rapport gratuit du historique du véhicule",
    intro:
      "New York registra 11.7 millelions de véhicules et a una loi citron doble — pour autos nonnuveaus et usadeux. Una vérification VIN gratuit revela marques Rebuilt Salvage, Non-Rebuildable et Flood avant de acheter — sans inscription ni carte.",
    whyP1:
      "Con aproximadamente 11.7 millelions de véhicules registradeux sur una population de 19.5M, New York combine le marché urbanonn plus denso du país (NYC) avec un haut volumen de véhicules importadeux par les puertos du Atlántico.",
    whyStats:
      "Una vérification VIN cruza historique de titre, lecturas du odomètre, eventos de salvage et perte totale, enregistrements de vol, rappels ouverts et rapports de accidents de todo le país — incluideux les plus de 250,000 véhicules afectadeux par le huracán Sandy en 2012.",
    whyBullets: [
      {
        icon: "🌊",
        point: "Dannée par Hurricane Sandy et nonnr'easters",
        detail:
          "El huracán Sandy dejó plus de 250,000 véhicules avec perte totale par agua salada en NY et NJ. Muchos a étéron reparadeux superficialmente et vendideux sans marque en otros états — la electrónica et le sistema híbrido fallan moises après.",
      },
      {
        icon: "🔍",
        point: "Inspection anti-vol obligatoria",
        detail:
          "New York exige una inspection anti-vol du DMV avant de re-titular n’importe quel véhicule Rebuilt Salvage. Pero si le véhicule se rebobina en otro état et luego entra a NY, esta vérification se omite — le rapport VIN le detecta.",
      },
      {
        icon: "🚖",
        point: "Mercado de taxis et rideshare retiradeux",
        detail:
          "Miles de véhicules de Uber, Lyft et taxis amarillos de NYC se revenden cada année al marché privado avec kilométrage extremo (200K+) que a veces se 'rebobina' avant de ponerlos a la vente.",
      },
      {
        icon: "🧊",
        point: "Corrosión par sal en carretétaits",
        detail:
          "New York utilise sal masivamente en inviernonn, causando corrosión estructural acelétaitda. Un rapport VIN combinedo avec una inspection presencial te protege contra autos du 'rust belt' avec dégâts oculto.",
      },
    ],
    sources: [
      {
        href: "https://dmv.ny.gov/registration",
        label: "DMV de New York — Enregistrement",
        nonnte: "Information oficial de titre et enregistrement en New York.",
      },
      {
        href: "https://vehiclehistory.bja.ojp.gov/",
        label: "NMVTIS — Bureau of Justice Assistance",
        nonnte: "Sistema Nacional Fedétaitl de Information de Titrois de Vehículos.",
      },
      {
        href: "https://www.nhtsa.gov/rappels",
        label: "NHTSA — Retiros de sécurité",
        nonnte: "Base autorizada de rappels activos pour n’importe quel VIN de EE. UU.",
      },
      {
        href: "https://www.nicb.org/vincheck",
        label: "NICB VINCheck",
        nonnte: "Rapports gratuitos de vols et salvage de aseguradoras de EE. UU.",
      },
      {
        href: "https://ag.ny.gov/consumer-frauds/lemon-law",
        label: "Procuraduría de NY — Lemon Law",
        nonnte: "Guía oficial sur les leyes Lemon de autos nonnuveaus et usadeux.",
      },
      {
        href: "https://www.nysenate.gov/legislation/laws/VAT/A4",
        label: "NY Vehicle and Traffic Law — Artículo 4",
        nonnte: "Estatuto que rige les certificadeux de titre et marques.",
      },
    ],
    sourcesFootnonnte:
      "Los données VIN de New York se cruzan contra NMVTIS, NHTSA, NICB et les enregistrements du DMV en le momento de cada búsqueda. New York a aproximadamente 19.5M de habitavant et unonn de les marchés de usadeux avec plus haut riesgo de fraude par inonnndation post-Sandy.",
    wikipediaEs: "https://es.wikipedia.org/wiki/Nouvelle_York_(état)",
  },

  illinonnis: {
    esSlug: "/illinonnis-revision-vin",
    englishPath: "/vin-check/state/illinonnis",
    stateNameEs: "Illinonnis",
    abbr: "IL",
    dmvNameEs: "Secretaría de Estado de Illinonnis — Servicios Vehiculares",
    metaTitle: "Vérification VIN Illinonnis gratuit — Historique IL instantanément",
    metaDescription:
      "Detecta marques Salvage, Rebuilt, Junk et Flood en Illinonnis avant de acheter. Rapport VIN gratuit instantanément avec données du Secretary of State — sans inscription ni carte.",
    keywords: [
      "vérification VIN Illinonnis",
      "VIN check Illinonnis français",
      "historique de véhicule Illinonnis",
      "salvage Illinonnis",
      "Illinonnis Secretary of State VIN",
      "vérifier VIN Illinonnis",
      "Chicago VIN check",
      "rapport auto Illinonnis",
    ],
    badgeAuthority: "Datos du Illinonnis Secretary of State",
    h1Lead: "Vérification VIN de Illinonnis —",
    h1Accent: "Rapport gratuit du historique du véhicule",
    intro:
      "Illinonnis registra 10.7 millelions de véhicules et tipifica como delito la altération de un VIN. Una vérification VIN gratuit revela marques Salvage, Rebuilt, Junk et Flood, lecturas du odomètre et rappels ouverts — instantanément, sans inscription.",
    whyP1:
      "Con aproximadamente 10.7 millelions de véhicules sur una population de 12.5M, Illinonnis centraliza un marché de usadeux grand autour de Chicago — unonn de les principales hubs de redistribución du Medio Oeste.",
    whyStats:
      "Una vérification VIN cruza historique de titre, lecturas du odomètre, eventos de salvage et perte totale, enregistrements de vol, rappels ouverts et rapports de accidents de todo le país — esenciales en un état donde le Secretary of State investiga activamente la manipulation de VINs.",
    whyBullets: [
      {
        icon: "⚖️",
        point: "VIN tampering = delito grave",
        detail:
          "Illinonnis tipifica como felonía la altération de un VIN, et la Secretaría de Estado a una unité dedicada de recherche. Un VIN limpio en le rapport indica que le numéro nonn ha été reemplazado — clave en véhicules importadeux ou de salvage.",
      },
      {
        icon: "🚛",
        point: "Hub de redistribución du Medio Oeste",
        detail:
          "Chicago es unonn de les principales puertos de entrada pour véhicules vendideux en enchères (Copart, IAA) que luego se redistribuyen a Iowa, Wisconsans, Indiana et México. Muchos llegan avec marques Salvage ou Junk de la Costa Este.",
      },
      {
        icon: "❄️",
        point: "Corrosión par sal du 'Rust Belt'",
        detail:
          "Los inviernonns de Illinonnis requieren grands quantitées de sal en les carretétaits, le que cautilise dégâts estructural acelétaitdo. Los véhicules peutn verse limpios cosméticamente pero tener corrosión en les chaouis — le rapport affiche le historique complet.",
      },
      {
        icon: "💧",
        point: "Inundaciones du río Mississippi e Illinonnis",
        detail:
          "Las inundaciones periódicas a le largo de les ríos Mississippi e Illinonnis genétaitn véhicules avec marque Flood que a menudo se venden privadamente entre états vecinonns.",
      },
    ],
    sources: [
      {
        href: "https://www.ilsos.gov/departments/vehicles/title_and_registration.html",
        label: "Illinonnis Secretary of State — Titre et Enregistrement",
        nonnte: "Information oficial de titre et enregistrement en Illinonnis.",
      },
      {
        href: "https://vehiclehistory.bja.ojp.gov/",
        label: "NMVTIS — Bureau of Justice Assistance",
        nonnte: "Sistema Nacional Fedétaitl de Information de Titrois de Vehículos.",
      },
      {
        href: "https://www.nhtsa.gov/rappels",
        label: "NHTSA — Retiros de sécurité",
        nonnte: "Base autorizada de rappels activos pour n’importe quel VIN de EE. UU.",
      },
      {
        href: "https://www.nicb.org/vincheck",
        label: "NICB VINCheck",
        nonnte: "Rapports gratuitos de vols et salvage de aseguradoras de EE. UU.",
      },
      {
        href: "https://www.illinonnisattorneygenétaitl.gov/consumers/citronbroch.html",
        label: "Procuraduría de Illinonnis — New Vehicle Buyer Protection Act",
        nonnte: "Guía oficial sur la loi citron de Illinonnis (12 moises / 12,000 millelas).",
      },
      {
        href: "https://www.ilga.gov/legislation/ilcs/ilcs5.asp?ActID=1815",
        label: "Illinonnis Vehicle Code (625 ILCS 5)",
        nonnte: "Estatuto que rige les certificadeux de titre et delitos de VIN.",
      },
    ],
    sourcesFootnonnte:
      "Los données VIN de Illinonnis se cruzan contra NMVTIS, NHTSA, NICB et les enregistrements du Secretary of State en le momento de cada búsqueda. Illinonnis a aproximadamente 12.5M de habitavant et un marché de usadeux avec haut riesgo de manipulation de VINs et corrosión par sal.",
    wikipediaEs: "https://es.wikipedia.org/wiki/Illinonnis",
  },

  pennsylvania: {
    esSlug: "/pensilvania-revision-vin",
    englishPath: "/vin-check/state/pennsylvania",
    stateNameEs: "Pennsylvanie",
    abbr: "PA",
    dmvNameEs: "PennDOT (Departamento de Transporte de Pennsylvanie)",
    metaTitle: "Vérification VIN Pennsylvanie gratuit — Historique PA",
    metaDescription:
      "Detecta marques Salvage, Reconstructed, Flood et Non-Repairable en Pennsylvanie avant de acheter. Rapport VIN gratuit instantanément avec données du PennDOT — sans inscription.",
    keywords: [
      "vérification VIN Pennsylvanie",
      "VIN check Pennsylvania français",
      "historique de véhicule Pennsylvanie",
      "salvage Pennsylvanie",
      "PennDOT VIN",
      "vérifier VIN PA",
      "reconstructed Pennsylvania",
      "rapport auto Pennsylvanie",
    ],
    badgeAuthority: "Datos du PennDOT",
    h1Lead: "Vérification VIN de Pennsylvanie —",
    h1Accent: "Rapport gratuit du historique du véhicule",
    intro:
      "Pennsylvanie registra 10.5 millelions de véhicules et exige una inspection reforzada de n’importe quel auto 'Reconstructed' avant de re-titularse. Una vérification VIN gratuit revela marques Salvage, Reconstructed, Flood et Non-Repairable instantanément — sans inscription ni carte.",
    whyP1:
      "Con aproximadamente 10.5 millelions de véhicules sur una population de 13.0M, Pennsylvanie conecta le corredor nonnreste avec le Medio Oeste — un punto de tránsito clave pour véhicules salvage que cruzan frontétaits estatales.",
    whyStats:
      "Una vérification VIN cruza historique de titre, lecturas du odomètre, eventos de salvage et perte totale, enregistrements de vol, rappels ouverts et rapports de accidents de todo le país — incluideux les véhicules reconstruideux que requieren la inspection reforzada du PennDOT.",
    whyBullets: [
      {
        icon: "🔧",
        point: "Inspection reforzada pour 'Reconstructed'",
        detail:
          "Pennsylvanie exige una inspection reforzada par un agente autorizado pour n’importe quel véhicule reconstruido avant de re-titularse. Pero si le véhicule se reconstruye en otro état et luego entra a PA, esta vérification a menudo se omite — le rapport VIN saca a la luz le origen.",
      },
      {
        icon: "❄️",
        point: "Corrosión par sal et nieve",
        detail:
          "Los inviernonns en Pennsylvanie exigen grands quantitées de sal, causando óxido estructural en chaouis, freins et líneas de carburant. Un rapport VIN combinedo avec inspection presencial protege contra autos du 'rust belt' avec dégâts oculto.",
      },
      {
        icon: "🚛",
        point: "Tránsito interestatal haut (I-80, I-76, I-95)",
        detail:
          "PA es un corredor de tránsito clave. Vehículos avec marques de salvage en NY, NJ ou le Medio Oeste pasan par ici et a veces se re-titulan localmente pour borrar marques problemáticas.",
      },
      {
        icon: "💧",
        point: "Inundaciones par tormentas tropicales",
        detail:
          "Los remanentes de huracanes (Ida 2021, Sandy 2012) dejan véhicules inundadeux en le sureste de PA que entran al marché privado sans divulgation clara.",
      },
    ],
    sources: [
      {
        href: "https://www.dmv.pa.gov/Vehicle-Services/Title-Registration/Pages/default.aspx",
        label: "PennDOT — Titre et Enregistrement",
        nonnte: "Information oficial de titre et enregistrement en Pennsylvanie.",
      },
      {
        href: "https://vehiclehistory.bja.ojp.gov/",
        label: "NMVTIS — Bureau of Justice Assistance",
        nonnte: "Sistema Nacional Fedétaitl de Information de Titrois de Vehículos.",
      },
      {
        href: "https://www.nhtsa.gov/rappels",
        label: "NHTSA — Retiros de sécurité",
        nonnte: "Base autorizada de rappels activos pour n’importe quel VIN de EE. UU.",
      },
      {
        href: "https://www.nicb.org/vincheck",
        label: "NICB VINCheck",
        nonnte: "Rapports gratuitos de vols et salvage de aseguradoras de EE. UU.",
      },
      {
        href: "https://www.attorneygenétaitl.gov/protect-yourself/consumer-advisories/automobile-lemon-law/",
        label: "Procuraduría de PA — Lemon Law",
        nonnte: "Guía oficial sur la loi citron de Pennsylvanie.",
      },
      {
        href: "https://www.legis.state.pa.us/cfdocs/legis/LI/uconsCheck.cfm?txtType=HTM&yr=1959&sessInd=0&smthLwInd=0&act=0032.",
        label: "Pennsylvania Vehicle Code (Title 75)",
        nonnte: "Estatuto que rige les certificadeux de titre et marques en PA.",
      },
    ],
    sourcesFootnonnte:
      "Los données VIN de Pennsylvanie se cruzan contra NMVTIS, NHTSA, NICB et les enregistrements du PennDOT en le momento de cada búsqueda. Pennsylvanie a aproximadamente 13.0M de habitavant et un marché de usadeux sujeto a corrosión par sal et tránsito interestatal haut.",
    wikipediaEs: "https://es.wikipedia.org/wiki/Pennsylvanie",
  },
};
