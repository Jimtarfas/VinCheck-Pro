/**
 * Shared body for /lemon-check/[state] and /es/lemon-check/[state].
 * Wave 17 — 50 state pages × 2 locales rendered from the same component.
 * Per-state facts (statute summary, coverage window, repair threshold,
 * brand term) come from existing English data sources; the Spanish
 * version uses statesEs.* for the state name and DMV translation,
 * and translates the structural chrome via COPY={en,es}.
 *
 * Statutes, "coveragePeriod" strings ("1 year / 12,000 mi"), and
 * brandTerms ("Manufacturer Buyback") stay English on both locales
 * because they're legal/regulatory proper-noun references.
 */

import Link from "@/components/LocaleLink";
import {
  AlertOctagon, Shield, Search, FileText, Clock, Car, MapPin,
  ChevronRight, Zap, BadgeCheck, Lock, Check, Gavel, DollarSign,
  Wrench, ClipboardList, TrendingDown, ScrollText, Tag,
  ArrowRight, CalendarClock, Building2,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { states, type StateInfo } from "@/lib/states";
import { statesEs } from "@/lib/states-es";
import { LEMON_LAWS, type LemonLaw } from "@/lib/lemon-laws";
import type { Locale } from "@/i18n/config";

interface StateBundle {
  s: StateInfo;
  law: LemonLaw;
}

const BUNDLES: StateBundle[] = states
  .map((s) => {
    const law = LEMON_LAWS.find((l) => l.abbr === s.abbr);
    return law ? { s, law } : null;
  })
  .filter((b): b is StateBundle => b !== null);

export function getStateBundle(slug: string): StateBundle | null {
  const s = states.find((x) => x.slug === slug);
  if (!s) return null;
  const law = LEMON_LAWS.find((l) => l.abbr === s.abbr);
  if (!law) return null;
  return { s, law };
}

export function getAllStateBundles(): StateBundle[] {
  return BUNDLES;
}

// Used by metadata + JSON-LD generators on the wrappers
export function getOthers(slug: string): StateBundle[] {
  const idx = BUNDLES.findIndex((x) => x.s.slug === slug);
  return [
    BUNDLES[(idx + 1) % BUNDLES.length],
    BUNDLES[(idx + 7) % BUNDLES.length],
    BUNDLES[(idx + 19) % BUNDLES.length],
  ].filter((o) => o.s.slug !== slug);
}

/* ── Per-locale copy + sentence helpers ─────────────────────────── */

const COPY = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbLemon: "Lemon Check",
    heroBadge: (name: string) => `${name} Lemon Law Buyback Lookup`,
    h1Lead: (name: string) => `${name} Lemon Check by VIN —`,
    h1Accent: "Catch the Buyback Before You Buy",
    heroLead: (name: string, brandTerm: string, period: string, dmv: string) =>
      `Check any vehicle titled in ${name} for a "${brandTerm}" brand, lemon-law repurchase, or warranty return. ${name}'s lemon law covers eligible cars for ${period}. Free preview, no credit card, instant results sourced from NMVTIS and the ${dmv}.`,
    searchHeading: (name: string) => `Run a Free ${name} Lemon Check`,
    searchSub: "Enter any 17-character VIN — cars, trucks, SUVs, leased vehicles",
    trustNote: "256-bit encrypted · DPPA compliant · NMVTIS-sourced title data",
    trustStatLabels: (name: string) => [
      `${name} title records`,
      "federally-sourced",
      "average lookup time",
      "preview, no signup",
      "vehicles registered",
    ],
    statsAtAGlance: (name: string) => `${name} Lemon Law at a Glance`,
    headlineStatLabels: (name: string) => [
      `${name} coverage window`,
      "Repair-attempt threshold",
      "Used-car lemon protection",
      "Buyback title brand used",
    ],
    howWorksHeading: (name: string) => `How ${name}'s Lemon Law Works`,
    rulesHeading: (name: string) => `${name} Buyback & Disclosure Rules`,
    coverageCardHeading: "Coverage & eligibility",
    coverageCoverageLabel: "Coverage window",
    coverageRepairLabel: "Repair threshold",
    coverageUsedLabel: "Used-car protection",
    titleOfficeCardHeading: (name: string) => `${name} title office`,
    titleBrandTermLabel: "Buyback brand term",
    titleVehiclesLabel: "vehicles registered",
    factLabel: (name: string) => `${name} fact: `,
    redFlagsHeading: (name: string) => `Red Flags a ${name} Used Car Might Be a Hidden Lemon`,
    redFlagsIntro:
      "No single flag is proof, but two or three together should prompt a full VIN lemon check and a pre-purchase inspection.",
    costHeading: (name: string) => `What a ${name} Lemon Title Costs You`,
    costIntro:
      "Even after the defect is repaired, the brand follows the VIN for life and carries real financial weight.",
    howToHeading: (name: string) => `How to Lemon-Check a Car in ${name} — 6 Steps`,
    howToIntro:
      "A full pre-purchase lemon screen takes about 15 minutes between your desk and the dealership.",
    federalHeading: (name: string) => `When ${name} Lemon Law Runs Out: Federal Backstop`,
    federalCardTitle: "The Magnuson-Moss Warranty Act",
    federalBody: (name: string, period: string) =>
      `${name}'s lemon law is limited to the ${period} window. When that closes, or when you buy from a private party, the federal Magnuson-Moss Warranty Act (15 U.S.C. § 2301) can still help in three ways:`,
    federalPoints: (name: string) => [
      "It creates a private cause of action for breach of any written or implied warranty, including powertrain and certified pre-owned warranties.",
      "It allows recovery of reasonable attorneys' fees, which makes consumer claims economically viable.",
      `It applies in ${name} and all 50 states, filling gaps where the state lemon window has expired.`,
    ],
    federalDisclaimer:
      "This summary is informational, not legal advice. Consult a qualified consumer-protection attorney about your situation.",
    midCtaHeading: (name: string) => `Don't Buy a ${name} Lemon by Mistake`,
    midCtaBody: (dmv: string) =>
      `Free, instant lemon check sourced from NMVTIS and the ${dmv}. No credit card. No signup.`,
    othersHeading: "Lemon Law Checks in Other States",
    othersIntro: (name: string) =>
      `Lemon laws vary widely from one state to the next. Compare ${name} with these other state guides, or see the full 50-state table.`,
    otherCardTemplate: (name: string) => `${name} Lemon Law Check`,
    allStatesLink: "All 50 States Lemon Law Table",
    allStatesSub: "Search, sort, and compare every state in one place.",
    faqHeading: (name: string) => `${name} Lemon Check FAQ`,
    faqIntro: (name: string) =>
      `The most-searched questions about ${name}'s lemon law, buyback titles, and VIN-based lemon detection.`,
    bottomBadge: (name: string) => `Free · Instant · ${name}`,
    bottomHeading: (name: string) => `One VIN. Every ${name} Lemon Brand. Five Seconds.`,
    bottomBody: (brandTerm: string) =>
      `A "${brandTerm}" record follows the VIN permanently, even when the paper title looks clean. Run the free check before you write a check.`,
    fullReportLink: "Or get the full VIN history report",
    // Sentence helpers
    usedCarSentence(name: string, coverage: LemonLaw["usedCarCoverage"]): string {
      if (coverage === "Yes")
        return `${name} is one of the small group of states that extends statutory lemon protection beyond new cars to qualifying used-vehicle sales. That makes a VIN-based buyback check especially worthwhile here, because both new-car repurchases and used-car claims can leave a brand on the record.`;
      if (coverage === "Limited")
        return `${name} extends limited lemon protection to some used vehicles, typically those still inside the original manufacturer warranty. Outside that narrow window, used-car buyers in ${name} lean on the federal Magnuson-Moss Warranty Act and any implied warranty of merchantability.`;
      return `${name}'s lemon law applies to new vehicles only. If you are buying used in ${name}, the practical protection comes from the original manufacturer warranty (if it is still active), the federal Magnuson-Moss Warranty Act, and a careful VIN history check before you sign.`;
    },
    disclosureSentence(name: string, brandTerm: string, disclosure: LemonLaw["disclosureRequired"]): string {
      if (disclosure === "Yes")
        return `When a manufacturer repurchases a vehicle in ${name}, the buyback must be recorded on the title as a "${brandTerm}" and disclosed to the next buyer in writing. That paper trail can still break down once a car crosses state lines, which is why the NMVTIS-sourced VIN record is the more reliable source.`;
      if (disclosure === "Limited")
        return `${name} has weaker buyback-disclosure rules than most states, so a "${brandTerm}" notation may not always follow the car forward on paper. A VIN check that pulls the federal NMVTIS record is the safer way to confirm a repurchase here.`;
      return `${name} records repurchased vehicles under the "${brandTerm}" label.`;
    },
    comparisonSentence(name: string, repairAttempts: string): string {
      const lower = repairAttempts.toLowerCase();
      let daysNote = "";
      if (lower.includes("15 day") || lower.includes("15 business"))
        daysNote = "Its out-of-service window is shorter than the common 30-day standard, which makes it comparatively friendly to consumers.";
      else if (lower.includes("40 day") || lower.includes("45 day") || lower.includes("90 day"))
        daysNote = "Its out-of-service window is longer than the common 30-day standard, so a defect has to keep a car off the road for an extended stretch before it qualifies.";
      else
        daysNote = "That tracks the 30-day out-of-service standard used across most of the country.";
      return `In ${name}, the manufacturer generally gets ${repairAttempts.toLowerCase()} to fix the same defect before the vehicle can qualify. ${daysNote}`;
    },
    intoLemonChecksLink: "VIN-based lemon check",
    intoLemonChecksPre: (name: string) =>
      `When a ${name} vehicle qualifies, the manufacturer must repurchase or replace it, and the title is branded as a "buyback". A `,
    intoLemonChecksSuffix: (dmv: string) =>
      ` pulls that brand from NMVTIS, the federal title system that gathers records from the ${dmv} and every other state DMV, so a buyback cannot quietly disappear by moving the car across state lines.`,
    redFlagBuilder(name: string, brandTerm: string, period: string): string[] {
      return [
        `A "${brandTerm}" notation that the seller skips over or cannot explain`,
        `Repeated ${name} service tickets for the same defect inside the ${period} window`,
        "A short first-ownership period with the manufacturer's finance arm taking the car back",
        `The car re-titled out of ${name} within a few months of its first registration`,
        "Dealer-only auction history immediately after the original retail sale",
        "An asking price well below comparable clean-title cars in the same trim",
        "Listing photos that avoid the driver-side door jamb and title close-ups",
        "A third-party warranty offered in place of manufacturer certified coverage",
      ];
    },
    howToBuilder(name: string, brandTerm: string, period: string, repairAttempts: string, dmv: string) {
      return [
        { n: "01", icon: Search, title: "Run the VIN", body: `Enter the 17-character VIN above. We pull NMVTIS, DMV title records, and national auction data in under 5 seconds for any ${name} vehicle.` },
        { n: "02", icon: FileText, title: "Find the brand", body: `Scan the title-history section for a "${brandTerm}" record or any equivalent buyback or repurchase brand.` },
        { n: "03", icon: CalendarClock, title: "Check the window", body: `${name} protection runs ${period}. See whether the defect history falls inside that period.` },
        { n: "04", icon: Wrench, title: "Pull service records", body: `Count repair visits for the same defect. ${name}'s threshold is ${repairAttempts.toLowerCase()}.` },
        { n: "05", icon: Building2, title: "Verify with the DMV", body: `Confirm the title status with the ${dmv} before money changes hands.` },
        { n: "06", icon: ClipboardList, title: "Get a PPI", body: "Have an independent mechanic inspect the car and target any systems the VIN report flagged." },
      ];
    },
    costBuilder(name: string, brandTerm: string) {
      return [
        { icon: TrendingDown, title: "Resale value drops 15-40%", body: `A "${brandTerm}" brand is a permanent valuation discount. Most ${name} retail buyers walk away once the brand is disclosed, and valuation guides apply a fixed deduction.` },
        { icon: Shield, title: "Insurance limits", body: "Many carriers restrict branded-title cars to liability-only coverage and decline comprehensive or collision, the same way they treat salvage titles." },
        { icon: DollarSign, title: "Financing limits", body: `Prime lenders usually decline branded titles. Subprime financing exists in ${name} but at higher APRs and lower loan-to-value ratios.` },
      ];
    },
    faqBuilder(name: string, brandTerm: string, period: string, repairAttempts: string, summary: string, dmv: string, copyRefs: { usedCar: string; disclosure: string }) {
      return [
        { q: `Does ${name}'s lemon law cover used cars?`, a: copyRefs.usedCar },
        { q: `How many repair attempts make a car a lemon in ${name}?`, a: `Under ${name}'s lemon law, the threshold is ${repairAttempts.toLowerCase()} for the same persistent defect. A single failed repair can sometimes be enough when the defect is a serious safety issue such as brakes or steering. ${summary}` },
        { q: `How long does ${name}'s lemon law protection last?`, a: `${name} covers eligible vehicles for ${period}. After that window closes you generally cannot file a new state lemon claim, though the federal Magnuson-Moss Warranty Act may still apply to defects that first appeared inside the warranty period.` },
        { q: `What is a ${name} lemon buyback title called?`, a: `In ${name} a repurchased lemon is branded as a "${brandTerm}". ${copyRefs.disclosure}` },
        { q: `How do I check if a used car is a lemon in ${name}?`, a: `Enter the 17-character VIN in the search box above. We query NMVTIS and national title sources for any buyback or repurchase brand, regardless of which state issued the current paper title. Because NMVTIS aggregates records from the ${dmv} and every other state DMV, a car that was branded in ${name} and then re-titled elsewhere will still surface its history.` },
        { q: `Are lemon buybacks required to be disclosed in ${name}?`, a: copyRefs.disclosure },
        { q: `What if the seller in ${name} never told me the car was a buyback?`, a: `If a ${name} seller failed to disclose a known buyback brand, you may have a claim under the state's deceptive trade practices law, common-law fraud, or the federal Magnuson-Moss Warranty Act. Keep the title, the listing, and every repair record, and consult a qualified consumer-protection attorney. This page is informational, not legal advice.` },
      ];
    },
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbLemon: "Verificación Ley Limón",
    heroBadge: (name: string) => `Búsqueda de recompra Ley Limón ${name}`,
    h1Lead: (name: string) => `Verificación Ley Limón ${name} por VIN —`,
    h1Accent: "Detecta la recompra antes de comprar",
    heroLead: (name: string, brandTerm: string, period: string, dmv: string) =>
      `Verifica cualquier vehículo titulado en ${name} por marca "${brandTerm}", recompra Ley Limón o devolución por garantía. La Ley Limón de ${name} cubre vehículos elegibles por ${period}. Vista previa gratis, sin tarjeta, resultados al instante desde NMVTIS y el ${dmv}.`,
    searchHeading: (name: string) => `Ejecuta una verificación Ley Limón gratis en ${name}`,
    searchSub: "Ingresa cualquier VIN de 17 caracteres — autos, camiones, SUVs, vehículos arrendados",
    trustNote: "Encriptado 256 bits · Compatible con DPPA · Datos de título de NMVTIS",
    trustStatLabels: (name: string) => [
      `Registros de título de ${name}`,
      "fuente federal",
      "tiempo promedio de búsqueda",
      "vista previa, sin registro",
      "vehículos registrados",
    ],
    statsAtAGlance: (name: string) => `Ley Limón de ${name} de un vistazo`,
    headlineStatLabels: (name: string) => [
      `Ventana de cobertura de ${name}`,
      "Umbral de intentos de reparación",
      "Protección Ley Limón para autos usados",
      "Marca de título de recompra usada",
    ],
    howWorksHeading: (name: string) => `Cómo funciona la Ley Limón de ${name}`,
    rulesHeading: (name: string) => `Reglas de recompra y divulgación de ${name}`,
    coverageCardHeading: "Cobertura y elegibilidad",
    coverageCoverageLabel: "Ventana de cobertura",
    coverageRepairLabel: "Umbral de reparación",
    coverageUsedLabel: "Protección autos usados",
    titleOfficeCardHeading: (name: string) => `Oficina de títulos de ${name}`,
    titleBrandTermLabel: "Término de marca de recompra",
    titleVehiclesLabel: "vehículos registrados",
    factLabel: (name: string) => `Dato sobre ${name}: `,
    redFlagsHeading: (name: string) => `Banderas rojas de que un auto usado de ${name} podría ser un limón oculto`,
    redFlagsIntro:
      "Ninguna bandera individual es prueba, pero dos o tres juntas deberían motivar una verificación VIN Ley Limón completa y una inspección pre-compra.",
    costHeading: (name: string) => `Lo que te cuesta un título de limón en ${name}`,
    costIntro:
      "Incluso después de reparar el defecto, la marca sigue al VIN de por vida y carga peso financiero real.",
    howToHeading: (name: string) => `Cómo verificar Ley Limón un auto en ${name} — 6 pasos`,
    howToIntro:
      "Una verificación pre-compra completa de Ley Limón toma alrededor de 15 minutos entre tu escritorio y el concesionario.",
    federalHeading: (name: string) => `Cuando la Ley Limón de ${name} se agota: Respaldo federal`,
    federalCardTitle: "La Magnuson-Moss Warranty Act",
    federalBody: (name: string, period: string) =>
      `La Ley Limón de ${name} está limitada a la ventana de ${period}. Cuando esa cierra, o cuando compras de una parte privada, la federal Magnuson-Moss Warranty Act (15 U.S.C. § 2301) puede todavía ayudar de tres formas:`,
    federalPoints: (name: string) => [
      "Crea una causa privada de acción por incumplimiento de cualquier garantía escrita o implícita, incluyendo garantías de tren motriz y certified pre-owned.",
      "Permite la recuperación de honorarios razonables de abogados, lo que hace económicamente viables los reclamos del consumidor.",
      `Aplica en ${name} y los 50 estados, llenando huecos donde la ventana estatal de Ley Limón ha expirado.`,
    ],
    federalDisclaimer:
      "Este resumen es informativo, no asesoría legal. Consulta a un abogado calificado de protección al consumidor sobre tu situación.",
    midCtaHeading: (name: string) => `No compres un limón de ${name} por error`,
    midCtaBody: (dmv: string) =>
      `Verificación Ley Limón gratis e instantánea desde NMVTIS y el ${dmv}. Sin tarjeta. Sin registro.`,
    othersHeading: "Verificaciones Ley Limón en otros estados",
    othersIntro: (name: string) =>
      `Las leyes limón varían ampliamente entre estados. Compara ${name} con estas otras guías estatales, o ve la tabla completa de 50 estados.`,
    otherCardTemplate: (name: string) => `Verificación Ley Limón ${name}`,
    allStatesLink: "Tabla de Ley Limón de los 50 estados",
    allStatesSub: "Busca, ordena y compara cada estado en un lugar.",
    faqHeading: (name: string) => `FAQ — Verificación Ley Limón ${name}`,
    faqIntro: (name: string) =>
      `Las preguntas más buscadas sobre la Ley Limón de ${name}, títulos de recompra y detección de limón basada en VIN.`,
    bottomBadge: (name: string) => `Gratis · Instantáneo · ${name}`,
    bottomHeading: (name: string) => `Un VIN. Cada marca de limón de ${name}. Cinco segundos.`,
    bottomBody: (brandTerm: string) =>
      `Un registro "${brandTerm}" sigue al VIN permanentemente, incluso cuando el título en papel se ve limpio. Ejecuta la verificación gratis antes de escribir un cheque.`,
    fullReportLink: "O obtén el reporte completo de historial VIN",
    usedCarSentence(name: string, coverage: LemonLaw["usedCarCoverage"]): string {
      if (coverage === "Yes")
        return `${name} es uno del pequeño grupo de estados que extiende protección estatutaria de Ley Limón más allá de autos nuevos a ventas calificadas de vehículos usados. Eso hace que una verificación de recompra basada en VIN sea especialmente valiosa aquí, porque tanto recompras de autos nuevos como reclamos de autos usados pueden dejar una marca en el registro.`;
      if (coverage === "Limited")
        return `${name} extiende protección limitada de Ley Limón a algunos vehículos usados, típicamente aquellos todavía dentro de la garantía original del fabricante. Fuera de esa ventana estrecha, los compradores de usados en ${name} se apoyan en la federal Magnuson-Moss Warranty Act y cualquier garantía implícita de comerciabilidad.`;
      return `La Ley Limón de ${name} aplica solo a vehículos nuevos. Si estás comprando usado en ${name}, la protección práctica viene de la garantía original del fabricante (si todavía está activa), la federal Magnuson-Moss Warranty Act y una cuidadosa verificación de historial VIN antes de firmar.`;
    },
    disclosureSentence(name: string, brandTerm: string, disclosure: LemonLaw["disclosureRequired"]): string {
      if (disclosure === "Yes")
        return `Cuando un fabricante recompra un vehículo en ${name}, la recompra debe registrarse en el título como "${brandTerm}" y divulgarse al siguiente comprador por escrito. Esa pista en papel puede aún romperse una vez que el auto cruza líneas estatales, por lo cual el registro VIN de NMVTIS es la fuente más confiable.`;
      if (disclosure === "Limited")
        return `${name} tiene reglas más débiles de divulgación de recompra que la mayoría de los estados, así que una notación "${brandTerm}" puede no siempre seguir al auto hacia adelante en papel. Una verificación VIN que obtiene el registro federal NMVTIS es la forma más segura de confirmar una recompra aquí.`;
      return `${name} registra vehículos recomprados bajo la etiqueta "${brandTerm}".`;
    },
    comparisonSentence(name: string, repairAttempts: string): string {
      const lower = repairAttempts.toLowerCase();
      let daysNote = "";
      if (lower.includes("15 day") || lower.includes("15 business"))
        daysNote = "Su ventana fuera de servicio es más corta que el estándar común de 30 días, lo que la hace comparativamente amigable al consumidor.";
      else if (lower.includes("40 day") || lower.includes("45 day") || lower.includes("90 day"))
        daysNote = "Su ventana fuera de servicio es más larga que el estándar común de 30 días, así que un defecto tiene que mantener un auto fuera de la carretera por un tramo extendido antes de calificar.";
      else
        daysNote = "Eso sigue el estándar de 30 días fuera de servicio usado en la mayor parte del país.";
      return `En ${name}, el fabricante generalmente recibe ${repairAttempts.toLowerCase()} para arreglar el mismo defecto antes de que el vehículo pueda calificar. ${daysNote}`;
    },
    intoLemonChecksLink: "verificación Ley Limón basada en VIN",
    intoLemonChecksPre: (name: string) =>
      `Cuando un vehículo de ${name} califica, el fabricante debe recomprarlo o reemplazarlo, y el título se marca como "buyback". Una `,
    intoLemonChecksSuffix: (dmv: string) =>
      ` obtiene esa marca de NMVTIS, el sistema federal de títulos que reúne registros del ${dmv} y cada otro DMV estatal, así que una recompra no puede desaparecer silenciosamente moviendo el auto entre estados.`,
    redFlagBuilder(name: string, brandTerm: string, period: string): string[] {
      return [
        `Una notación "${brandTerm}" que el vendedor evita o no puede explicar`,
        `Órdenes de servicio repetidas en ${name} por el mismo defecto dentro de la ventana ${period}`,
        "Periodo corto de primera propiedad con el brazo financiero del fabricante recuperando el auto",
        `El auto re-titulado fuera de ${name} dentro de pocos meses de su primera registración`,
        "Historial de subasta solo para concesionarios inmediatamente después de la venta retail original",
        "Precio pedido muy por debajo de autos comparables de título limpio en el mismo trim",
        "Fotos del anuncio que evitan el marco de la puerta del conductor y close-ups del título",
        "Una garantía de terceros ofrecida en lugar de cobertura certificada del fabricante",
      ];
    },
    howToBuilder(name: string, brandTerm: string, period: string, repairAttempts: string, dmv: string) {
      return [
        { n: "01", icon: Search, title: "Ejecuta el VIN", body: `Ingresa el VIN de 17 caracteres arriba. Obtenemos NMVTIS, registros de título del DMV y datos nacionales de subasta en menos de 5 segundos para cualquier vehículo de ${name}.` },
        { n: "02", icon: FileText, title: "Encuentra la marca", body: `Escanea la sección de historial de título por un registro "${brandTerm}" o cualquier marca equivalente de recompra.` },
        { n: "03", icon: CalendarClock, title: "Verifica la ventana", body: `La protección de ${name} corre ${period}. Ve si el historial de defectos cae dentro de ese periodo.` },
        { n: "04", icon: Wrench, title: "Obtén registros de servicio", body: `Cuenta visitas de reparación para el mismo defecto. El umbral de ${name} es ${repairAttempts.toLowerCase()}.` },
        { n: "05", icon: Building2, title: "Verifica con el DMV", body: `Confirma el estado del título con el ${dmv} antes de que el dinero cambie de manos.` },
        { n: "06", icon: ClipboardList, title: "Obtén una PPI", body: "Haz que un mecánico independiente inspeccione el auto y enfoque cualquier sistema que el reporte VIN haya señalado." },
      ];
    },
    costBuilder(name: string, brandTerm: string) {
      return [
        { icon: TrendingDown, title: "El valor de reventa cae 15-40%", body: `Una marca "${brandTerm}" es un descuento permanente de valoración. La mayoría de los compradores retail de ${name} se alejan una vez que la marca se divulga, y las guías de valoración aplican una deducción fija.` },
        { icon: Shield, title: "Límites de seguro", body: "Muchas aseguradoras restringen autos con título marcado a cobertura solo de responsabilidad y rechazan comprehensive o colisión, la misma forma en que tratan títulos de salvamento." },
        { icon: DollarSign, title: "Límites de financiamiento", body: `Los prestamistas prime usualmente rechazan títulos marcados. El financiamiento subprime existe en ${name} pero a APRs más altos y ratios préstamo-a-valor más bajos.` },
      ];
    },
    faqBuilder(name: string, brandTerm: string, period: string, repairAttempts: string, summary: string, dmv: string, copyRefs: { usedCar: string; disclosure: string }) {
      return [
        { q: `¿La Ley Limón de ${name} cubre autos usados?`, a: copyRefs.usedCar },
        { q: `¿Cuántos intentos de reparación hacen que un auto sea un limón en ${name}?`, a: `Bajo la Ley Limón de ${name}, el umbral es ${repairAttempts.toLowerCase()} para el mismo defecto persistente. Un solo intento de reparación fallido a veces puede ser suficiente cuando el defecto es un asunto serio de seguridad como frenos o dirección. ${summary}` },
        { q: `¿Cuánto dura la protección de la Ley Limón de ${name}?`, a: `${name} cubre vehículos elegibles por ${period}. Después de que esa ventana cierre, generalmente no puedes presentar un nuevo reclamo estatal de Ley Limón, aunque la federal Magnuson-Moss Warranty Act puede aún aplicar a defectos que primero aparecieron dentro del periodo de garantía.` },
        { q: `¿Cómo se llama un título de recompra Ley Limón en ${name}?`, a: `En ${name} un limón recomprado se marca como "${brandTerm}". ${copyRefs.disclosure}` },
        { q: `¿Cómo verifico si un auto usado es un limón en ${name}?`, a: `Ingresa el VIN de 17 caracteres en el cuadro de búsqueda arriba. Consultamos NMVTIS y fuentes nacionales de título por cualquier marca de recompra, sin importar qué estado emitió el título de papel actual. Como NMVTIS agrega registros del ${dmv} y cada otro DMV estatal, un auto que fue marcado en ${name} y luego re-titulado en otro lugar todavía surgirá su historial.` },
        { q: `¿Las recompras Ley Limón están requeridas de divulgarse en ${name}?`, a: copyRefs.disclosure },
        { q: `¿Qué pasa si el vendedor en ${name} nunca me dijo que el auto era una recompra?`, a: `Si un vendedor en ${name} falló en divulgar una marca conocida de recompra, puedes tener un reclamo bajo la ley estatal de prácticas comerciales engañosas, fraude de common-law o la federal Magnuson-Moss Warranty Act. Guarda el título, el anuncio y cada registro de reparación, y consulta a un abogado calificado de protección al consumidor. Esta página es informativa, no es asesoría legal.` },
      ];
    },
  },
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbLemon: "Vérification Lemon Law",
    heroBadge: (name: string) => `Recherche rachat Lemon Law ${name}`,
    h1Lead: (name: string) => `Vérification Lemon Law ${name} par VIN —`,
    h1Accent: "Détecte le rachat avant d'acheter",
    heroLead: (name: string, brandTerm: string, period: string, dmv: string) =>
      `Vérifie tout véhicule titré en ${name} pour une marque "${brandTerm}", un rachat Lemon Law ou un retour sous garantie. La Lemon Law de ${name} couvre les véhicules éligibles pendant ${period}. Aperçu gratuit, sans carte, résultats instantanés depuis NMVTIS et le ${dmv}.`,
    searchHeading: (name: string) => `Lance une vérification Lemon Law gratuite en ${name}`,
    searchSub: "Entre n'importe quel VIN de 17 caractères — voitures, camions, SUV, véhicules en location longue durée",
    trustNote: "Chiffré 256 bits · Conforme DPPA · Données de titre de NMVTIS",
    trustStatLabels: (name: string) => [
      `Registres de titre de ${name}`,
      "source fédérale",
      "temps moyen de recherche",
      "aperçu, sans inscription",
      "véhicules immatriculés",
    ],
    statsAtAGlance: (name: string) => `Lemon Law de ${name} en un coup d'œil`,
    headlineStatLabels: (name: string) => [
      `Fenêtre de couverture de ${name}`,
      "Seuil de tentatives de réparation",
      "Protection Lemon Law voitures usagées",
      "Marque de titre de rachat utilisée",
    ],
    howWorksHeading: (name: string) => `Comment fonctionne la Lemon Law de ${name}`,
    rulesHeading: (name: string) => `Règles de rachat et divulgation de ${name}`,
    coverageCardHeading: "Couverture et éligibilité",
    coverageCoverageLabel: "Fenêtre de couverture",
    coverageRepairLabel: "Seuil de réparation",
    coverageUsedLabel: "Protection voitures usagées",
    titleOfficeCardHeading: (name: string) => `Bureau des titres de ${name}`,
    titleBrandTermLabel: "Terme de marque de rachat",
    titleVehiclesLabel: "véhicules immatriculés",
    factLabel: (name: string) => `Fait sur ${name} : `,
    redFlagsHeading: (name: string) => `Drapeaux rouges qu'une voiture usagée de ${name} pourrait être un lemon caché`,
    redFlagsIntro:
      "Aucun drapeau seul n'est une preuve, mais deux ou trois ensemble devraient motiver une vérification VIN Lemon complète et une inspection avant achat.",
    costHeading: (name: string) => `Ce que te coûte un titre de lemon en ${name}`,
    costIntro:
      "Même après réparation du défaut, la marque suit le VIN à vie et porte un vrai poids financier.",
    howToHeading: (name: string) => `Comment vérifier la Lemon Law sur une voiture en ${name} — 6 étapes`,
    howToIntro:
      "Un dépistage complet avant achat prend environ 15 minutes entre ton bureau et le concessionnaire.",
    federalHeading: (name: string) => `Quand la Lemon Law de ${name} s'épuise : filet fédéral`,
    federalCardTitle: "Le Magnuson-Moss Warranty Act",
    federalBody: (name: string, period: string) =>
      `La Lemon Law de ${name} est limitée à la fenêtre de ${period}. Quand celle-ci se ferme, ou quand tu achètes à un particulier, le fédéral Magnuson-Moss Warranty Act (15 U.S.C. § 2301) peut encore aider de trois manières :`,
    federalPoints: (name: string) => [
      "Il crée une cause d'action privée pour rupture de toute garantie écrite ou implicite, incluant les garanties groupe motopropulseur et certified pre-owned.",
      "Il permet la récupération d'honoraires raisonnables d'avocats, ce qui rend les réclamations consommateurs économiquement viables.",
      `Il s'applique en ${name} et dans les 50 États, comblant les lacunes où la fenêtre étatique Lemon a expiré.`,
    ],
    federalDisclaimer:
      "Ce résumé est informatif, pas un conseil juridique. Consulte un avocat qualifié en protection des consommateurs concernant ta situation.",
    midCtaHeading: (name: string) => `N'achète pas un lemon de ${name} par erreur`,
    midCtaBody: (dmv: string) =>
      `Vérification Lemon Law gratuite et instantanée depuis NMVTIS et le ${dmv}. Sans carte. Sans inscription.`,
    othersHeading: "Vérifications Lemon Law dans d'autres États",
    othersIntro: (name: string) =>
      `Les lois lemon varient largement d'un État à l'autre. Compare ${name} avec ces autres guides étatiques, ou consulte le tableau complet des 50 États.`,
    otherCardTemplate: (name: string) => `Vérification Lemon Law ${name}`,
    allStatesLink: "Tableau Lemon Law des 50 États",
    allStatesSub: "Recherche, trie et compare chaque État au même endroit.",
    faqHeading: (name: string) => `FAQ — Vérification Lemon Law ${name}`,
    faqIntro: (name: string) =>
      `Les questions les plus recherchées sur la Lemon Law de ${name}, les titres de rachat et la détection de lemon basée sur VIN.`,
    bottomBadge: (name: string) => `Gratuit · Instantané · ${name}`,
    bottomHeading: (name: string) => `Un VIN. Chaque marque de lemon de ${name}. Cinq secondes.`,
    bottomBody: (brandTerm: string) =>
      `Un registre "${brandTerm}" suit le VIN de manière permanente, même quand le titre papier semble propre. Lance la vérification gratuite avant de signer un chèque.`,
    fullReportLink: "Ou obtiens le rapport complet d'historique VIN",
    usedCarSentence(name: string, coverage: LemonLaw["usedCarCoverage"]): string {
      if (coverage === "Yes")
        return `${name} fait partie du petit groupe d'États qui étend la protection Lemon Law statutaire au-delà des voitures neuves aux ventes de véhicules usagés éligibles. Cela rend une vérification de rachat basée sur VIN particulièrement utile ici, car les rachats de voitures neuves et les réclamations sur voitures usagées peuvent tous deux laisser une marque sur le registre.`;
      if (coverage === "Limited")
        return `${name} étend une protection Lemon Law limitée à certains véhicules usagés, généralement ceux encore sous la garantie originale du constructeur. En dehors de cette fenêtre étroite, les acheteurs d'usagé en ${name} s'appuient sur le fédéral Magnuson-Moss Warranty Act et toute garantie implicite de qualité marchande.`;
      return `La Lemon Law de ${name} ne s'applique qu'aux véhicules neufs. Si tu achètes d'occasion en ${name}, la protection pratique vient de la garantie originale du constructeur (si elle est toujours active), du fédéral Magnuson-Moss Warranty Act et d'une vérification minutieuse de l'historique VIN avant de signer.`;
    },
    disclosureSentence(name: string, brandTerm: string, disclosure: LemonLaw["disclosureRequired"]): string {
      if (disclosure === "Yes")
        return `Quand un constructeur rachète un véhicule en ${name}, le rachat doit être enregistré sur le titre comme "${brandTerm}" et divulgué au prochain acheteur par écrit. Cette piste papier peut quand même se rompre une fois qu'une voiture franchit des frontières d'État, c'est pourquoi le registre VIN sourcé NMVTIS est la source la plus fiable.`;
      if (disclosure === "Limited")
        return `${name} a des règles de divulgation de rachat plus faibles que la plupart des États, donc une mention "${brandTerm}" peut ne pas toujours suivre la voiture en avant sur papier. Une vérification VIN qui tire le registre fédéral NMVTIS est la manière la plus sûre de confirmer un rachat ici.`;
      return `${name} enregistre les véhicules rachetés sous l'étiquette "${brandTerm}".`;
    },
    comparisonSentence(name: string, repairAttempts: string): string {
      const lower = repairAttempts.toLowerCase();
      let daysNote = "";
      if (lower.includes("15 day") || lower.includes("15 business"))
        daysNote = "Sa fenêtre hors service est plus courte que le standard commun de 30 jours, ce qui la rend comparativement favorable aux consommateurs.";
      else if (lower.includes("40 day") || lower.includes("45 day") || lower.includes("90 day"))
        daysNote = "Sa fenêtre hors service est plus longue que le standard commun de 30 jours, donc un défaut doit garder une voiture hors route pour une période étendue avant qu'elle ne soit éligible.";
      else
        daysNote = "Cela suit le standard de 30 jours hors service utilisé dans la majeure partie du pays.";
      return `En ${name}, le constructeur obtient généralement ${repairAttempts.toLowerCase()} pour réparer le même défaut avant que le véhicule puisse se qualifier. ${daysNote}`;
    },
    intoLemonChecksLink: "vérification Lemon Law basée sur VIN",
    intoLemonChecksPre: (name: string) =>
      `Quand un véhicule de ${name} se qualifie, le constructeur doit le racheter ou le remplacer, et le titre est marqué comme "buyback". Une `,
    intoLemonChecksSuffix: (dmv: string) =>
      ` tire cette marque de NMVTIS, le système fédéral de titres qui rassemble les registres du ${dmv} et de chaque autre DMV étatique, donc un rachat ne peut pas discrètement disparaître en déplaçant la voiture à travers les frontières d'État.`,
    redFlagBuilder(name: string, brandTerm: string, period: string): string[] {
      return [
        `Une mention "${brandTerm}" que le vendeur saute ou ne peut pas expliquer`,
        `Tickets de service répétés en ${name} pour le même défaut dans la fenêtre ${period}`,
        "Courte première période de propriété avec le bras financier du constructeur reprenant la voiture",
        `La voiture re-titrée hors de ${name} dans les quelques mois suivant sa première immatriculation`,
        "Historique d'enchères réservé concessionnaires immédiatement après la vente au détail originale",
        "Un prix demandé bien sous celui des voitures comparables à titre propre dans la même finition",
        "Photos d'annonce qui évitent le montant de porte côté conducteur et les gros plans du titre",
        "Une garantie tierce offerte à la place de la couverture certifiée du constructeur",
      ];
    },
    howToBuilder(name: string, brandTerm: string, period: string, repairAttempts: string, dmv: string) {
      return [
        { n: "01", icon: Search, title: "Lance le VIN", body: `Entre le VIN de 17 caractères ci-dessus. Nous tirons NMVTIS, les registres de titre DMV et les données nationales d'enchères en moins de 5 secondes pour tout véhicule de ${name}.` },
        { n: "02", icon: FileText, title: "Trouve la marque", body: `Scanne la section d'historique de titre pour un registre "${brandTerm}" ou toute marque équivalente de rachat ou de reprise.` },
        { n: "03", icon: CalendarClock, title: "Vérifie la fenêtre", body: `La protection de ${name} court ${period}. Vois si l'historique de défauts tombe dans cette période.` },
        { n: "04", icon: Wrench, title: "Obtiens les registres de service", body: `Compte les visites de réparation pour le même défaut. Le seuil de ${name} est ${repairAttempts.toLowerCase()}.` },
        { n: "05", icon: Building2, title: "Vérifie avec le DMV", body: `Confirme le statut du titre avec le ${dmv} avant que l'argent ne change de mains.` },
        { n: "06", icon: ClipboardList, title: "Obtiens un PPI", body: "Fais inspecter la voiture par un mécanicien indépendant et cible tous les systèmes que le rapport VIN a signalés." },
      ];
    },
    costBuilder(name: string, brandTerm: string) {
      return [
        { icon: TrendingDown, title: "La valeur de revente chute de 15-40%", body: `Une marque "${brandTerm}" est une décote permanente d'évaluation. La plupart des acheteurs au détail de ${name} s'en vont une fois la marque divulguée, et les guides d'évaluation appliquent une déduction fixe.` },
        { icon: Shield, title: "Limites d'assurance", body: "De nombreux assureurs restreignent les voitures à titre marqué à la couverture responsabilité civile seulement et refusent la couverture étendue ou collision, de la même manière qu'ils traitent les titres d'épave." },
        { icon: DollarSign, title: "Limites de financement", body: `Les prêteurs prime refusent généralement les titres marqués. Le financement subprime existe en ${name} mais à des TAEG plus élevés et des ratios prêt-valeur plus bas.` },
      ];
    },
    faqBuilder(name: string, brandTerm: string, period: string, repairAttempts: string, summary: string, dmv: string, copyRefs: { usedCar: string; disclosure: string }) {
      return [
        { q: `La Lemon Law de ${name} couvre-t-elle les voitures usagées ?`, a: copyRefs.usedCar },
        { q: `Combien de tentatives de réparation font qu'une voiture est un lemon en ${name} ?`, a: `Sous la Lemon Law de ${name}, le seuil est ${repairAttempts.toLowerCase()} pour le même défaut persistant. Une seule réparation échouée peut parfois suffire quand le défaut est un problème de sécurité sérieux comme les freins ou la direction. ${summary}` },
        { q: `Combien de temps dure la protection de la Lemon Law de ${name} ?`, a: `${name} couvre les véhicules éligibles pendant ${period}. Une fois cette fenêtre fermée, tu ne peux généralement pas déposer une nouvelle réclamation étatique Lemon, bien que le fédéral Magnuson-Moss Warranty Act puisse encore s'appliquer aux défauts apparus pour la première fois dans la période de garantie.` },
        { q: `Comment s'appelle un titre de rachat lemon en ${name} ?`, a: `En ${name} un lemon racheté est marqué comme "${brandTerm}". ${copyRefs.disclosure}` },
        { q: `Comment vérifier si une voiture usagée est un lemon en ${name} ?`, a: `Entre le VIN de 17 caractères dans la zone de recherche ci-dessus. Nous interrogeons NMVTIS et les sources nationales de titre pour toute marque de rachat ou reprise, peu importe quel État a émis le titre papier actuel. Parce que NMVTIS agrège les registres du ${dmv} et de chaque autre DMV étatique, une voiture qui a été marquée en ${name} et ensuite re-titrée ailleurs fera quand même surface son historique.` },
        { q: `Les rachats lemon sont-ils tenus d'être divulgués en ${name} ?`, a: copyRefs.disclosure },
        { q: `Que se passe-t-il si le vendeur en ${name} ne m'a jamais dit que la voiture était un rachat ?`, a: `Si un vendeur en ${name} a échoué à divulguer une marque de rachat connue, tu peux avoir une réclamation sous la loi étatique des pratiques commerciales trompeuses, la fraude common-law ou le fédéral Magnuson-Moss Warranty Act. Garde le titre, l'annonce et chaque registre de réparation, et consulte un avocat qualifié en protection des consommateurs. Cette page est informative, pas un conseil juridique.` },
      ];
    },
  },
} as const;

const TRUST_ICONS = [MapPin, Shield, Clock, BadgeCheck, Car] as const;

export default function LemonCheckStateBody({
  stateSlug,
  locale = "en",
}: {
  stateSlug: string;
  locale?: Locale;
}) {
  const bundle = getStateBundle(stateSlug);
  if (!bundle) return null;
  const { s, law } = bundle;
  const stateEs = statesEs.find((e) => e.slug === stateSlug);
  const name = locale === "es" && stateEs ? stateEs.nameEs : s.name;
  const dmv = locale === "es" && stateEs ? stateEs.dmvNameEs : s.dmvName;
  const specialFact = locale === "es" && stateEs ? stateEs.specialFactEs : s.specialFact;
  const summary = locale === "es" && stateEs?.lemonLawNotesEs ? stateEs.lemonLawNotesEs : law.summary;

  const copy = COPY[locale];

  const homeHref = locale === "es" ? "/es" : "/";
  const lemonHubHref = locale === "es" ? "/es/lemon-check" : "/lemon-check";
  const stateBaseHref = lemonHubHref;
  const vinCheckHref = locale === "es" ? "/es/revision-vin" : "/vin-check";

  const others = getOthers(stateSlug);

  const usedCarText = copy.usedCarSentence(name, law.usedCarCoverage);
  const disclosureText = copy.disclosureSentence(name, law.brandTerm, law.disclosureRequired);
  const comparisonText = copy.comparisonSentence(name, law.repairAttempts);

  const HEADLINE_STATS = [
    { value: law.coveragePeriod, label: copy.headlineStatLabels(name)[0] },
    { value: law.repairAttempts, label: copy.headlineStatLabels(name)[1] },
    { value: law.usedCarCoverage, label: copy.headlineStatLabels(name)[2] },
    { value: law.brandTerm, label: copy.headlineStatLabels(name)[3] },
  ];

  const TRUST_STATS = copy.trustStatLabels(name).map((label, i) => ({
    icon: TRUST_ICONS[i],
    value: [s.abbr, "NMVTIS", "< 5 sec", "Free", s.vehiclesRegistered][i],
    label,
  }));

  const redFlags = copy.redFlagBuilder(name, law.brandTerm, law.coveragePeriod);
  const howToSteps = copy.howToBuilder(name, law.brandTerm, law.coveragePeriod, law.repairAttempts, dmv);
  const costItems = copy.costBuilder(name, law.brandTerm);
  const faqs = copy.faqBuilder(name, law.brandTerm, law.coveragePeriod, law.repairAttempts, summary, dmv, {
    usedCar: usedCarText,
    disclosure: disclosureText,
  });

  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: copy.breadcrumbHome, href: homeHref },
              { label: copy.breadcrumbLemon, href: lemonHubHref },
              { label: name },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <AlertOctagon className="w-4 h-4" /> {copy.heroBadge(name)}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {copy.h1Lead(name)}{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>{copy.h1Accent}</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {copy.heroLead(name, law.brandTerm, law.coveragePeriod, dmv)}
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">{copy.searchHeading(name)}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{copy.searchSub}</p>
            <VinSearchForm size="lg" locale={locale} />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {copy.trustNote}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8">
            {TRUST_STATS.map((st) => {
              const Icon = st.icon;
              return (
                <div key={st.label} className="bg-white/10 border border-white/15 rounded-xl px-3 py-3 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                  <div className="text-base sm:text-lg font-headline font-black text-white">{st.value}</div>
                  <div className="text-[10px] sm:text-[11px] text-white/65 leading-tight mt-0.5">{st.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* At-a-glance */}
      <section aria-labelledby="state-stats-heading" className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10">
        <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
          <h2 id="state-stats-heading" className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5">
            {copy.statsAtAGlance(name)}
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {HEADLINE_STATS.map((st) => (
              <div key={st.label} className="rounded-2xl bg-primary px-4 py-4 sm:py-5">
                <dt className="text-[11px] sm:text-xs text-white/75 leading-snug mb-1.5">{st.label}</dt>
                <dd className="font-headline font-bold text-lg sm:text-xl text-white leading-tight">{st.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Intro */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{copy.howWorksHeading(name)}</h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>{summary}</p>
            <p>{comparisonText}</p>
            <p>{usedCarText}</p>
            <p>
              {copy.intoLemonChecksPre(name)}
              <Link href={lemonHubHref} className="text-primary font-bold hover:underline">
                {copy.intoLemonChecksLink}
              </Link>
              {copy.intoLemonChecksSuffix(dmv)}
            </p>
          </div>
        </section>

        {/* Rules */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.rulesHeading(name)}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">{disclosureText}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
              <div className="flex items-center gap-2 mb-2">
                <Gavel className="w-5 h-5 text-primary" />
                <h3 className="text-base font-headline font-extrabold text-primary">{copy.coverageCardHeading}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span>{copy.coverageCoverageLabel}: {law.coveragePeriod}</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span>{copy.coverageRepairLabel}: {law.repairAttempts}</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span>{copy.coverageUsedLabel}: {law.usedCarCoverage}</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="text-base font-headline font-extrabold text-primary">{copy.titleOfficeCardHeading(name)}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li className="flex gap-2">
                  <Tag className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{copy.titleBrandTermLabel}: {law.brandTerm}</span>
                </li>
                <li className="flex gap-2">
                  <Building2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{dmv}</span>
                </li>
                <li className="flex gap-2">
                  <Car className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{s.vehiclesRegistered} {copy.titleVehiclesLabel}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-secondary-container/40 border border-secondary-container p-5">
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">{copy.factLabel(name)}</strong>
              {specialFact}
            </p>
          </div>
        </section>

        {/* Red flags */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.redFlagsHeading(name)}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">{copy.redFlagsIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {redFlags.map((flag, i) => (
              <div key={i} className="flex gap-3 items-start rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                <div className="w-6 h-6 rounded-full bg-error-container flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[11px] font-black text-on-error-container">{i + 1}</span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{flag}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cost */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.costHeading(name)}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{copy.costIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {costItems.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                  <div className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-on-error-container" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">{c.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{c.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How to */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.howToHeading(name)}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{copy.howToIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {howToSteps.map((st) => {
              const Icon = st.icon;
              return (
                <div key={st.n} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-headline font-black text-primary">{st.n}</span>
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{st.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Federal */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{copy.federalHeading(name)}</h2>
          <div className="rounded-2xl bg-secondary-container/40 border border-secondary-container p-5 sm:p-7">
            <div className="flex items-start gap-3 mb-3">
              <Gavel className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary">{copy.federalCardTitle}</h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              {copy.federalBody(name, law.coveragePeriod)}
            </p>
            <ul className="space-y-2 mb-3">
              {copy.federalPoints(name).map((point, i) => (
                <li key={i} className="flex gap-2 items-start text-sm text-on-surface-variant">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                  {point}
                </li>
              ))}
            </ul>
            <p className="text-xs text-on-surface-variant italic">{copy.federalDisclaimer}</p>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <AlertOctagon className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{copy.midCtaHeading(name)}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{copy.midCtaBody(dmv)}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" locale={locale} />
            </div>
          </div>
        </section>

        {/* Others */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.othersHeading}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">{copy.othersIntro(name)}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {others.map((o) => {
              const otherEs = statesEs.find((e) => e.slug === o.s.slug);
              const otherName = locale === "es" && otherEs ? otherEs.nameEs : o.s.name;
              return (
                <Link
                  key={o.s.slug}
                  href={`${stateBaseHref}/${o.s.slug}`}
                  className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary group-hover:underline">{copy.otherCardTemplate(otherName)}</div>
                    <div className="text-xs text-on-surface-variant mt-0.5">
                      {o.law.coveragePeriod} · {o.law.repairAttempts}
                    </div>
                  </div>
                </Link>
              );
            })}
            <Link
              href={lemonHubHref}
              className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <ScrollText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-primary group-hover:underline">{copy.allStatesLink}</div>
                <div className="text-xs text-on-surface-variant mt-0.5">{copy.allStatesSub}</div>
              </div>
            </Link>
          </div>
        </section>

        <section className="py-10">
          <VinCheckBanner />
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.faqHeading(name)}</h2>
          <p className="text-sm text-on-surface-variant mb-8">{copy.faqIntro(name)}</p>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">{f.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> {copy.bottomBadge(name)}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">{copy.bottomHeading(name)}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">{copy.bottomBody(law.brandTerm)}</p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" locale={locale} />
          </div>
          <Link href={vinCheckHref} className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline">
            {copy.fullReportLink}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <RelatedChecks exclude="/lemon-check" />
      </div>
    </article>
  );
}
