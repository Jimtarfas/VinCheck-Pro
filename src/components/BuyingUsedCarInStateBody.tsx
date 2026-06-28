/**
 * Shared body for /guides/buying-used-car-in/[state] and the Spanish
 * equivalent. Wave 17e — 50 state buyer guides x 2 locales rendered from
 * a single component.
 *
 * State-specific factual content (titleBrands, dmvName, lemonLawNotes,
 * specialFact, population, vehiclesRegistered) is statutory English text;
 * on the Spanish locale we substitute the *EsTRACTOR-translated versions
 * from src/lib/states-es.ts when present and fall back to the English
 * source when not — same pattern as Wave 15.
 */

import Link from "@/components/LocaleLink";
import type { ReactNode } from "react";
import {
  FileText,
  MapPin,
  Shield,
  AlertTriangle,
  CheckCircle,
  Calculator,
  Check,
  ArrowRight,
  Car,
  Search,
  ClipboardCheck,
  ChevronRight,
  Lock,
  Zap,
  BadgeCheck,
  Sparkles,
  Gavel,
} from "lucide-react";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { states, getStateBySlug } from "@/lib/states";
import { statesEs } from "@/lib/states-es";
import type { Locale } from "@/i18n/config";

// Common title-brand explanations used to expand the per-state titleBrands list.
const titleBrandLookupEn: Record<string, string> = {
  Salvage: "Insurer declared the vehicle a total loss. Repairable, but value and insurability are reduced.",
  "Rebuilt": "Previously salvage; rebuilt and inspected back to roadworthy condition. Resale value remains lower.",
  "Rebuilt Salvage": "Same as Rebuilt — a salvage vehicle restored and re-titled after passing a state inspection.",
  "Restored Salvage": "A salvage vehicle restored to operating condition and re-issued a title.",
  "Revived Salvage": "California-style brand for a salvage vehicle that has been re-titled after rebuild and inspection.",
  Flood: "Vehicle was submerged in water. Hidden electrical, transmission, and corrosion problems are common.",
  "Flood Damage": "Texas-style brand identifying flood-affected vehicles, often from hurricane events.",
  Hurricane: "Specific to flood damage from a named hurricane event — high risk of long-term issues.",
  "Hail Damage": "Vehicle suffered hail strikes severe enough to be reported on the title. Cosmetic and sometimes structural.",
  Junk: "Vehicle is not legally roadworthy and may only be sold for parts or scrap.",
  "Junked": "Vehicle has been declared unfit for the road and intended for scrap or parts only.",
  "Junking Certificate": "Indicates the vehicle is not legal to title for road use.",
  "Non-Repairable": "Permanent designation — vehicle cannot be re-titled for road use under any circumstances.",
  "Non-Rebuildable": "Vehicle is too damaged to ever return to the road; sold for parts only.",
  "Unrebuildable": "Georgia-style permanent designation that the vehicle cannot be re-titled for road use.",
  Reconstructed: "Built from parts of multiple vehicles or substantially rebuilt after major damage.",
  "Lemon Law Buyback": "Manufacturer repurchased the vehicle under a state lemon law due to unresolved defects.",
  "Distressed": "Significant damage outside of a typical collision (often interior, mechanical, or environmental).",
  "Disclosed Damage": "Vehicle has documented damage that doesn't meet the salvage threshold but should be disclosed.",
  "Owner Retained": "Insurer declared a total loss but the original owner kept the vehicle.",
  "Salvage Parts Only": "Vehicle may only be dismantled and sold for parts.",
  "Parts Only": "Vehicle may only be dismantled and sold for parts.",
  "Prior Salvage": "Title shows the vehicle was previously salvage even after rebuild.",
  "Previous Salvage": "Indicates the vehicle had a salvage title at some point in its history.",
  "Total Loss": "Insurer declared the vehicle a total loss after damage exceeded its value threshold.",
  "Totaled": "Insurer-declared total loss — Oregon-style brand recorded directly on the title.",
  "Certificate of Destruction": "Vehicle is permanently retired and cannot be re-titled for road use.",
  "Destroyed": "Washington-style brand: vehicle cannot be returned to roadworthy condition.",
  "Non-Highway": "Kansas-style brand — vehicle is not legal for use on public roads.",
  "Scrap": "Vehicle is intended for dismantling and scrap metal recycling only.",
};

const titleBrandLookupEs: Record<string, string> = {
  Salvage: "La aseguradora declaró el vehículo pérdida total. Es reparable, pero su valor y asegurabilidad se reducen.",
  "Rebuilt": "Antes salvage; reconstruido e inspeccionado para volver a uso vial. El valor de reventa sigue siendo menor.",
  "Rebuilt Salvage": "Igual que Rebuilt — vehículo salvage restaurado y retitulado tras pasar una inspección estatal.",
  "Restored Salvage": "Vehículo salvage restaurado a condición operativa y al que se le emitió un nuevo título.",
  "Revived Salvage": "Marca al estilo California para un vehículo salvage que ha sido retitulado tras reconstrucción e inspección.",
  Flood: "El vehículo estuvo sumergido en agua. Son comunes los problemas ocultos eléctricos, de transmisión y de corrosión.",
  "Flood Damage": "Marca al estilo Texas que identifica vehículos afectados por inundación, frecuentemente por huracanes.",
  Hurricane: "Específica para daños por inundación de un huracán nombrado — alto riesgo de problemas a largo plazo.",
  "Hail Damage": "El vehículo sufrió impactos de granizo lo suficientemente graves como para ser reportados en el título. Cosmético y a veces estructural.",
  Junk: "El vehículo no está legalmente apto para circular y solo puede venderse para partes o chatarra.",
  "Junked": "El vehículo ha sido declarado no apto para la vía y destinado solo a chatarra o partes.",
  "Junking Certificate": "Indica que el vehículo no es legal para titularse para uso vial.",
  "Non-Repairable": "Designación permanente — el vehículo no puede retitularse para uso vial bajo ninguna circunstancia.",
  "Non-Rebuildable": "El vehículo está demasiado dañado para volver a la vía; se vende solo por partes.",
  "Unrebuildable": "Designación permanente al estilo Georgia: el vehículo no puede retitularse para uso vial.",
  Reconstructed: "Construido con partes de varios vehículos o sustancialmente reconstruido tras daño mayor.",
  "Lemon Law Buyback": "El fabricante recompró el vehículo bajo una ley lemon estatal por defectos no resueltos.",
  "Distressed": "Daño significativo fuera de una colisión típica (a menudo interior, mecánico o ambiental).",
  "Disclosed Damage": "El vehículo tiene daño documentado que no alcanza el umbral salvage pero debe ser revelado.",
  "Owner Retained": "La aseguradora declaró pérdida total pero el propietario original conservó el vehículo.",
  "Salvage Parts Only": "El vehículo solo puede desmantelarse y venderse por partes.",
  "Parts Only": "El vehículo solo puede desmantelarse y venderse por partes.",
  "Prior Salvage": "El título muestra que el vehículo fue salvage previamente incluso tras reconstrucción.",
  "Previous Salvage": "Indica que el vehículo tuvo un título salvage en algún momento de su historial.",
  "Total Loss": "La aseguradora declaró el vehículo pérdida total tras superar su umbral de valor.",
  "Totaled": "Pérdida total declarada por la aseguradora — marca al estilo Oregón registrada directamente en el título.",
  "Certificate of Destruction": "El vehículo está permanentemente retirado y no puede retitularse para uso vial.",
  "Destroyed": "Marca al estilo Washington: el vehículo no puede volver a condición de uso vial.",
  "Non-Highway": "Marca al estilo Kansas — el vehículo no es legal para uso en vías públicas.",
  "Scrap": "El vehículo está destinado solo a desmantelamiento y reciclaje de metales.",
};

// Pick 8 nearby/popular states for the cross-link grid.
function pickOtherStates(currentSlug: string) {
  const popular = [
    "california",
    "texas",
    "florida",
    "new-york",
    "illinois",
    "pennsylvania",
    "ohio",
    "georgia",
    "north-carolina",
    "michigan",
  ];
  const list = states
    .filter((s) => s.slug !== currentSlug && popular.includes(s.slug))
    .slice(0, 8);
  if (list.length < 8) {
    for (const s of states) {
      if (list.length >= 8) break;
      if (s.slug === currentSlug) continue;
      if (!list.find((x) => x.slug === s.slug)) list.push(s);
    }
  }
  return list;
}

const COPY = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbGuides: "Guides",
    breadcrumbBuying: "Buying Used Car",
    badgeSuffix: " · 2026 Buyer Guide",
    h1Pre: "Buying a Used Car in ",
    heroIntro: (state: { name: string; population: string; dmvName: string; specialFact: string }) => (
      <>
        {state.specialFact} For the roughly {state.population} residents of{" "}
        {state.name}, buying a used car the right way means knowing the rules of
        the {state.dmvName}, your rights under {state.name}&apos;s lemon law, and
        verifying any vehicle&apos;s history with a VIN check before money
        changes hands.
      </>
    ),
    searchHeading: (name: string) => `Start with a ${name} VIN check`,
    searchSub: (name: string) =>
      `Before you put down a deposit on any used car in ${name}, run the VIN — a vehicle history report takes seconds and can save you thousands.`,
    trustNote: "Free \u00B7 No sign-up \u00B7 Instant result",
    trustStat1Label: "title-brand data",
    trustStat2Value: "Title brands",
    trustStat2Label: "surfaced by VIN",
    trustStat3Value: "DMV-ready",
    trustStat3Label: "transfer steps",
    trustStat4Value: "Free",
    trustStat4Label: "no sign-up",
    howHeading: (name: string) => `How to Buy a Used Car in ${name}`,
    howIntro: (name: string, dmvName: string) =>
      `This 2026 guide walks every step — from finding a vehicle and pulling a history report through completing the title transfer with the ${dmvName}. Start here.`,
    step1Tag: "Step 1",
    step1Title: "Run the VIN first",
    step1Body: (name: string) =>
      `Before any deposit, enter the 17-character VIN to surface ${name} title brands, accidents, salvage or flood damage, odometer issues, and open recalls — including out-of-state records the seller or local DMV may not show.`,
    step2Tag: "Step 2",
    step2Title: "Inspect and negotiate",
    step2Body: (name: string) =>
      `Inspect the car in daylight, get an independent ${name} mechanic to do a pre-purchase inspection, then negotiate using KBB and Edmunds private-party values against the condition and history report.`,
    step3Tag: "Step 3",
    step3Title: "Title and register",
    step3Body: (dmvName: string) =>
      `Sign the title, complete a bill of sale, and submit it with your ID, proof of insurance, and sales tax to the ${dmvName} to complete the title transfer and registration.`,
    whyEyebrow: "Why it matters",
    whyHeading: (name: string) => `Why ${name} Used Car Buyers Need to Be Extra Careful`,
    whyP1: (state: { name: string; population: string; vehiclesRegistered: string }) =>
      `With a population of about ${state.population} and roughly ${state.vehiclesRegistered} registered vehicles, ${state.name} has a deep used car market. That depth is good news for buyers shopping for choice, but it also means a constant churn of vehicles being bought, sold, and re-titled — sometimes across state lines, where damage and title brands can quietly disappear from local records.`,
    whyP2: (state: { name: string; dmvName: string; specialFact: string }) =>
      `${state.specialFact} That detail alone is a strong reason to pull a full VIN history report on any vehicle you're considering, rather than relying solely on what the seller or ${state.dmvName} record shows.`,
    brandsEyebrow: "Title brands",
    brandsHeading: (name: string) =>
      `${name} Title Brands You'll See on Vehicle History Reports`,
    brandsP1: (name: string) =>
      `A title brand is a permanent notation that a state DMV adds to a vehicle's title to flag significant events — total losses, flood damage, manufacturer buybacks, and more. ${name} reports these brands to the National Motor Vehicle Title Information System (NMVTIS), which is what feeds most VIN-based vehicle history reports.`,
    brandsP2: (name: string, dmvName: string) =>
      `When a ${name} buyer pulls a VIN report, these are the title brands the ${dmvName} most commonly issues, along with what each one means in practice:`,
    brandFallback: (brand: string, stateName: string) =>
      `Vehicles branded "${brand}" by ${stateName} have been flagged for significant history. Always verify with a VIN check before buying.`,
    midCtaBadge: "Check before you commit",
    midCtaHeading: (name: string) => `Verify a ${name} VIN in seconds`,
    midCtaBody:
      "Title brands, accidents, salvage, flood, odometer, and recalls — one report before you sign anything.",
    transferEyebrow: "Title transfer",
    transferHeading: (dmvName: string) => `${dmvName} Title Transfer Requirements`,
    transferP1: (name: string, dmvName: string) =>
      `Once you and the seller agree on a price, the title transfer is the formal legal step that moves ownership to your name. In ${name}, the ${dmvName} processes title transfers, collects sales tax, and issues a new certificate of title in the buyer's name.`,
    transferP2: (name: string, dmvName: string) =>
      `Most ${name} private-party used car transactions require the same core paperwork. Bring the following to your local ${dmvName} office (or your tag agent, depending on the county):`,
    paperworkHeading: "Title-transfer paperwork",
    paperwork: (name: string, dmvName: string) => [
      `The original certificate of title, signed over to you by the seller`,
      `A bill of sale showing purchase price and date`,
      `The seller's current registration card`,
      `Your valid government-issued photo ID`,
      `Proof of ${name} auto insurance in your name`,
      `Sales tax payment per ${dmvName} schedules`,
      `A VIN inspection if the vehicle is from out of state or has a salvage history`,
      `Odometer disclosure (federally required for vehicles under 20 model years old)`,
    ],
    transferFooter: (name: string) =>
      `Time limits to complete the transfer vary, but most ${name} buyers should plan to title and register a newly purchased used car within 30 days to avoid late penalties.`,
    lemonEyebrow: "Lemon law",
    lemonHeading: (name: string) => `${name} Lemon Law Protections`,
    lemonP1: (name: string) =>
      `The ${name} lemon law generally applies when a vehicle has a substantial defect that the manufacturer or dealer can't fix after a reasonable number of repair attempts, or when the vehicle has been out of service for repairs for a significant cumulative period. If those thresholds are met, qualifying buyers may be entitled to a refund, a comparable replacement vehicle, or other remedies.`,
    lemonP2Before: (name: string) =>
      `To file a ${name} lemon law claim, document every repair visit (dates, mileage, written technician notes), keep all receipts, and notify the manufacturer in writing. A `,
    lemonLinkLabel: "lemon check",
    lemonP2After:
      " can also reveal whether a used vehicle has already been bought back as a lemon — a critical disclosure that not all sellers volunteer.",
    taxEyebrow: "Sales tax",
    taxHeading: (name: string) => `Sales Tax on Used Vehicles in ${name}`,
    taxP1: (name: string, dmvName: string) =>
      `${name} charges sales or use tax on used vehicle purchases, and the exact rate depends on your county and city. The ${dmvName} typically collects this tax at the time of titling and registration based on the actual purchase price shown on your bill of sale (or a fair market value floor if the price seems unrealistically low).`,
    taxP2: (name: string, dmvName: string) =>
      `Because rates and exemptions can change, always confirm the current ${name} used vehicle sales tax rate on the official ${dmvName} website before you finalize a deal. Trade-in credits, family transfers, and gift transfers may reduce or eliminate tax in certain situations.`,
    checklistEyebrow: "Checklist",
    checklistHeading: (name: string) => `Pre-Purchase Checklist for ${name} Buyers`,
    checklistIntro: (name: string) =>
      `Use this checklist on every used car you're seriously considering in ${name}. Skipping any single item is how most buyers end up with a vehicle they regret.`,
    linksHeading: (name: string) => `VIN Checks That Pair With This ${name} Guide`,
    linksIntro:
      "A history report is the single most important step before buying. These tools complete the picture.",
    bannerSection: true,
    faqHeading: (name: string) => `Buying a Used Car in ${name} — FAQ`,
    faqIntro: (name: string) => `The questions ${name} buyers ask most before they sign.`,
    bottomCtaBadge: "Free \u00B7 Instant \u00B7 VIN-Based",
    bottomCtaHeading: (name: string) => `Ready to Check a ${name} VIN?`,
    bottomCtaBody:
      "Pull a full vehicle history report before you sign anything — title brands, accidents, salvage, flood, odometer, and recalls in one place.",
    bottomCtaNote: "Trusted by 50,000+ buyers nationwide \u00B7 No sign-up \u00B7 Free",
    othersHeading: "Buying a Used Car in Other States",
    othersIntro:
      "Shopping a wider radius? See state-specific guides for nearby and popular markets.",
    otherStateVinCheckLabel: (name: string) => `${name} VIN check`,
    allGuidesLabel: "All guides",
    lemonCheckLabel: "Lemon check",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbGuides: "Guías",
    breadcrumbBuying: "Comprar auto usado",
    badgeSuffix: " · Guía del comprador 2026",
    h1Pre: "Cómo comprar un auto usado en ",
    heroIntro: (state: { name: string; population: string; dmvName: string; specialFact: string }) => (
      <>
        {state.specialFact} Para los aproximadamente {state.population} residentes
        de {state.name}, comprar un auto usado de la forma correcta significa
        conocer las reglas del {state.dmvName}, tus derechos bajo la ley lemon de{" "}
        {state.name} y verificar el historial de cualquier vehículo con una
        verificación de VIN antes de entregar dinero.
      </>
    ),
    searchHeading: (name: string) => `Empieza con una verificación de VIN en ${name}`,
    searchSub: (name: string) =>
      `Antes de dar un depósito por cualquier auto usado en ${name}, verifica el VIN — un reporte de historial vehicular toma segundos y puede ahorrarte miles de dólares.`,
    trustNote: "Gratis \u00B7 Sin registro \u00B7 Resultado al instante",
    trustStat1Label: "datos de marcas de título",
    trustStat2Value: "Marcas",
    trustStat2Label: "reveladas por VIN",
    trustStat3Value: "Listo-DMV",
    trustStat3Label: "pasos de transferencia",
    trustStat4Value: "Gratis",
    trustStat4Label: "sin registro",
    howHeading: (name: string) => `Cómo comprar un auto usado en ${name}`,
    howIntro: (name: string, dmvName: string) =>
      `Esta guía 2026 recorre cada paso — desde encontrar un vehículo y sacar un reporte de historial hasta completar la transferencia de título con el ${dmvName}. Comienza aquí.`,
    step1Tag: "Paso 1",
    step1Title: "Verifica el VIN primero",
    step1Body: (name: string) =>
      `Antes de cualquier depósito, ingresa el VIN de 17 caracteres para descubrir marcas de título de ${name}, accidentes, daño por salvage o inundación, problemas de odómetro y retiros abiertos — incluidos registros de otros estados que el vendedor o el DMV local pueden no mostrar.`,
    step2Tag: "Paso 2",
    step2Title: "Inspecciona y negocia",
    step2Body: (name: string) =>
      `Inspecciona el auto a la luz del día, contrata a un mecánico independiente de ${name} para una inspección pre-compra y luego negocia usando los valores de venta particular de KBB y Edmunds frente a la condición y el reporte de historial.`,
    step3Tag: "Paso 3",
    step3Title: "Titula y registra",
    step3Body: (dmvName: string) =>
      `Firma el título, completa un contrato de compraventa y entrégalo con tu identificación, prueba de seguro e impuesto sobre las ventas al ${dmvName} para completar la transferencia de título y la matriculación.`,
    whyEyebrow: "Por qué importa",
    whyHeading: (name: string) =>
      `Por qué los compradores de auto usado en ${name} deben tener especial cuidado`,
    whyP1: (state: { name: string; population: string; vehiclesRegistered: string }) =>
      `Con una población de cerca de ${state.population} y aproximadamente ${state.vehiclesRegistered} vehículos registrados, ${state.name} tiene un mercado de autos usados muy activo. Esa profundidad es buena noticia para los compradores que buscan opciones, pero también significa un constante movimiento de vehículos que se compran, venden y retitulan — a veces cruzando fronteras estatales, donde los daños y las marcas de título pueden desaparecer silenciosamente de los registros locales.`,
    whyP2: (state: { name: string; dmvName: string; specialFact: string }) =>
      `${state.specialFact} Ese solo detalle es una razón fuerte para sacar un reporte completo de historial por VIN de cualquier vehículo que estés considerando, en lugar de confiar únicamente en lo que muestren el vendedor o el registro del ${state.dmvName}.`,
    brandsEyebrow: "Marcas de título",
    brandsHeading: (name: string) =>
      `Marcas de título de ${name} que verás en los reportes de historial`,
    brandsP1: (name: string) =>
      `Una marca de título es una anotación permanente que un DMV estatal agrega al título de un vehículo para señalar eventos significativos — pérdidas totales, daño por inundación, recompras del fabricante y más. ${name} reporta estas marcas al National Motor Vehicle Title Information System (NMVTIS), que alimenta la mayoría de los reportes de historial por VIN.`,
    brandsP2: (name: string, dmvName: string) =>
      `Cuando un comprador en ${name} saca un reporte por VIN, estas son las marcas de título que el ${dmvName} emite con más frecuencia, junto con lo que cada una significa en la práctica:`,
    brandFallback: (brand: string, stateName: string) =>
      `Los vehículos marcados como "${brand}" por ${stateName} han sido señalados por un historial significativo. Verifica siempre con una verificación de VIN antes de comprar.`,
    midCtaBadge: "Verifica antes de comprometerte",
    midCtaHeading: (name: string) => `Verifica un VIN de ${name} en segundos`,
    midCtaBody:
      "Marcas de título, accidentes, salvage, inundación, odómetro y retiros — un solo reporte antes de firmar nada.",
    transferEyebrow: "Transferencia de título",
    transferHeading: (dmvName: string) =>
      `Requisitos de transferencia de título del ${dmvName}`,
    transferP1: (name: string, dmvName: string) =>
      `Una vez que tú y el vendedor acuerdan un precio, la transferencia de título es el paso legal formal que pasa la propiedad a tu nombre. En ${name}, el ${dmvName} procesa las transferencias de título, cobra el impuesto sobre las ventas y emite un nuevo certificado de título a nombre del comprador.`,
    transferP2: (name: string, dmvName: string) =>
      `La mayoría de las transacciones de auto usado entre particulares en ${name} requieren la misma documentación básica. Lleva lo siguiente a tu oficina local del ${dmvName} (o a tu tag agent, según el condado):`,
    paperworkHeading: "Documentos para la transferencia de título",
    paperwork: (name: string, dmvName: string) => [
      `El certificado de título original, firmado por el vendedor a tu favor`,
      `Un contrato de compraventa que muestre precio y fecha`,
      `La tarjeta de registro vigente del vendedor`,
      `Tu identificación con foto válida emitida por el gobierno`,
      `Comprobante de seguro de auto en ${name} a tu nombre`,
      `Pago del impuesto sobre las ventas según las tarifas del ${dmvName}`,
      `Una inspección de VIN si el vehículo viene de otro estado o tiene historial salvage`,
      `Declaración de odómetro (requerida a nivel federal para vehículos con menos de 20 años de modelo)`,
    ],
    transferFooter: (name: string) =>
      `Los plazos para completar la transferencia varían, pero la mayoría de los compradores en ${name} deberían planear titular y registrar un auto usado recién comprado dentro de 30 días para evitar recargos por retraso.`,
    lemonEyebrow: "Ley lemon",
    lemonHeading: (name: string) => `Protecciones de la ley lemon de ${name}`,
    lemonP1: (name: string) =>
      `La ley lemon de ${name} generalmente aplica cuando un vehículo tiene un defecto sustancial que el fabricante o concesionario no puede arreglar después de un número razonable de intentos de reparación, o cuando el vehículo ha estado fuera de servicio por reparaciones durante un período acumulado significativo. Si se cumplen esos umbrales, los compradores que califiquen pueden tener derecho a un reembolso, un vehículo de reemplazo comparable u otras soluciones.`,
    lemonP2Before: (name: string) =>
      `Para presentar un reclamo bajo la ley lemon de ${name}, documenta cada visita de reparación (fechas, kilometraje, notas escritas del técnico), guarda todos los recibos y notifica al fabricante por escrito. Una `,
    lemonLinkLabel: "verificación de ley lemon",
    lemonP2After:
      " también puede revelar si un vehículo usado ya fue recomprado como lemon — una revelación crítica que no todos los vendedores ofrecen.",
    taxEyebrow: "Impuesto sobre las ventas",
    taxHeading: (name: string) => `Impuesto sobre las ventas en vehículos usados en ${name}`,
    taxP1: (name: string, dmvName: string) =>
      `${name} cobra impuesto sobre las ventas o uso en compras de vehículos usados, y la tarifa exacta depende de tu condado y ciudad. El ${dmvName} normalmente cobra este impuesto al momento de la titulación y matriculación con base en el precio de compra real que aparece en tu contrato de compraventa (o un piso de valor de mercado justo si el precio parece poco realista).`,
    taxP2: (name: string, dmvName: string) =>
      `Como las tarifas y exenciones pueden cambiar, confirma siempre la tarifa actual del impuesto sobre las ventas para vehículos usados de ${name} en el sitio web oficial del ${dmvName} antes de finalizar un trato. Los créditos por trade-in, las transferencias familiares y las transferencias por regalo pueden reducir o eliminar el impuesto en ciertas situaciones.`,
    checklistEyebrow: "Lista de verificación",
    checklistHeading: (name: string) => `Lista de verificación pre-compra para compradores en ${name}`,
    checklistIntro: (name: string) =>
      `Usa esta lista en cada auto usado que estés considerando seriamente en ${name}. Saltarte un solo punto es como la mayoría de los compradores terminan con un vehículo del que se arrepienten.`,
    linksHeading: (name: string) => `Verificaciones de VIN que se combinan con esta guía de ${name}`,
    linksIntro:
      "Un reporte de historial es el paso más importante antes de comprar. Estas herramientas completan el panorama.",
    bannerSection: true,
    faqHeading: (name: string) => `Comprar un auto usado en ${name} — Preguntas frecuentes`,
    faqIntro: (name: string) =>
      `Las preguntas que más hacen los compradores en ${name} antes de firmar.`,
    bottomCtaBadge: "Gratis \u00B7 Instantáneo \u00B7 Basado en VIN",
    bottomCtaHeading: (name: string) => `¿Listo para verificar un VIN de ${name}?`,
    bottomCtaBody:
      "Saca un reporte completo de historial vehicular antes de firmar nada — marcas de título, accidentes, salvage, inundación, odómetro y retiros en un solo lugar.",
    bottomCtaNote:
      "Usado por más de 50,000 compradores en todo el país \u00B7 Sin registro \u00B7 Gratis",
    othersHeading: "Comprar un auto usado en otros estados",
    othersIntro:
      "¿Buscando en un radio más amplio? Consulta guías específicas para mercados cercanos y populares.",
    otherStateVinCheckLabel: (name: string) => `Verificación de VIN en ${name}`,
    allGuidesLabel: "Todas las guías",
    lemonCheckLabel: "Verificación de ley lemon",
  },
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbGuides: "Guides",
    breadcrumbBuying: "Acheter une voiture d'occasion",
    badgeSuffix: " · Guide de l'acheteur 2026",
    h1Pre: "Acheter une voiture d'occasion en ",
    heroIntro: (state: { name: string; population: string; dmvName: string; specialFact: string }) => (
      <>
        {state.specialFact} Pour les quelque {state.population} résidents de{" "}
        {state.name}, acheter une voiture d'occasion de la bonne manière signifie
        connaître les règles du {state.dmvName}, tes droits sous la lemon law de{" "}
        {state.name} et vérifier l'historique de tout véhicule avec une
        vérification VIN avant que l'argent ne change de mains.
      </>
    ),
    searchHeading: (name: string) => `Commence par une vérification VIN en ${name}`,
    searchSub: (name: string) =>
      `Avant de déposer un acompte sur n'importe quelle voiture d'occasion en ${name}, lance le VIN — un rapport d'historique de véhicule prend quelques secondes et peut t'économiser des milliers de dollars.`,
    trustNote: "Gratuit \u00B7 Sans inscription \u00B7 Résultat instantané",
    trustStat1Label: "données de marques de titre",
    trustStat2Value: "Marques",
    trustStat2Label: "révélées par VIN",
    trustStat3Value: "Prêt-DMV",
    trustStat3Label: "étapes de transfert",
    trustStat4Value: "Gratuit",
    trustStat4Label: "sans inscription",
    howHeading: (name: string) => `Comment acheter une voiture d'occasion en ${name}`,
    howIntro: (name: string, dmvName: string) =>
      `Ce guide 2026 parcourt chaque étape — depuis la recherche d'un véhicule et l'extraction d'un rapport d'historique jusqu'à la complétion du transfert de titre avec le ${dmvName}. Commence ici.`,
    step1Tag: "Étape 1",
    step1Title: "Lance le VIN en premier",
    step1Body: (name: string) =>
      `Avant tout acompte, saisis le VIN de 17 caractères pour faire apparaître les marques de titre de ${name}, accidents, dégâts salvage ou inondation, problèmes d'odomètre et rappels ouverts — y compris les dossiers d'autres états que le vendeur ou le DMV local peuvent ne pas montrer.`,
    step2Tag: "Étape 2",
    step2Title: "Inspecte et négocie",
    step2Body: (name: string) =>
      `Inspecte la voiture à la lumière du jour, fais faire une inspection pré-achat par un mécanicien indépendant de ${name}, puis négocie en utilisant les valeurs de vente particulière de KBB et Edmunds par rapport à l'état et au rapport d'historique.`,
    step3Tag: "Étape 3",
    step3Title: "Titre et immatricule",
    step3Body: (dmvName: string) =>
      `Signe le titre, complète un acte de vente et soumets-le avec ta pièce d'identité, ta preuve d'assurance et la taxe de vente au ${dmvName} pour compléter le transfert de titre et l'immatriculation.`,
    whyEyebrow: "Pourquoi c'est important",
    whyHeading: (name: string) =>
      `Pourquoi les acheteurs de voitures d'occasion en ${name} doivent être particulièrement prudents`,
    whyP1: (state: { name: string; population: string; vehiclesRegistered: string }) =>
      `Avec une population d'environ ${state.population} et environ ${state.vehiclesRegistered} véhicules immatriculés, ${state.name} a un marché de voitures d'occasion très actif. Cette profondeur est une bonne nouvelle pour les acheteurs qui cherchent du choix, mais elle signifie aussi un brassage constant de véhicules achetés, vendus et re-titrés — parfois en traversant les frontières des états, où les dégâts et les marques de titre peuvent disparaître discrètement des dossiers locaux.`,
    whyP2: (state: { name: string; dmvName: string; specialFact: string }) =>
      `${state.specialFact} Ce seul détail est une raison forte d'extraire un rapport d'historique VIN complet sur tout véhicule que tu envisages, plutôt que de te fier uniquement à ce que montrent le vendeur ou le dossier du ${state.dmvName}.`,
    brandsEyebrow: "Marques de titre",
    brandsHeading: (name: string) =>
      `Marques de titre de ${name} que tu verras sur les rapports d'historique de véhicule`,
    brandsP1: (name: string) =>
      `Une marque de titre est une notation permanente qu'un DMV d'état ajoute au titre d'un véhicule pour signaler des événements importants — pertes totales, dégâts par inondation, rachats du fabricant et plus. ${name} signale ces marques au National Motor Vehicle Title Information System (NMVTIS), qui alimente la plupart des rapports d'historique de véhicule basés sur le VIN.`,
    brandsP2: (name: string, dmvName: string) =>
      `Quand un acheteur en ${name} extrait un rapport VIN, voici les marques de titre que le ${dmvName} émet le plus couramment, ainsi que ce que chacune signifie en pratique :`,
    brandFallback: (brand: string, stateName: string) =>
      `Les véhicules marqués "${brand}" par ${stateName} ont été signalés pour un historique significatif. Vérifie toujours avec une vérification VIN avant d'acheter.`,
    midCtaBadge: "Vérifie avant de t'engager",
    midCtaHeading: (name: string) => `Vérifie un VIN de ${name} en quelques secondes`,
    midCtaBody:
      "Marques de titre, accidents, salvage, inondation, odomètre et rappels — un seul rapport avant de signer quoi que ce soit.",
    transferEyebrow: "Transfert de titre",
    transferHeading: (dmvName: string) =>
      `Exigences de transfert de titre du ${dmvName}`,
    transferP1: (name: string, dmvName: string) =>
      `Une fois que toi et le vendeur êtes d'accord sur un prix, le transfert de titre est l'étape juridique formelle qui transfère la propriété à ton nom. En ${name}, le ${dmvName} traite les transferts de titre, collecte la taxe de vente et émet un nouveau certificat de titre au nom de l'acheteur.`,
    transferP2: (name: string, dmvName: string) =>
      `La plupart des transactions de voiture d'occasion entre particuliers en ${name} nécessitent les mêmes documents de base. Apporte ce qui suit à ton bureau local du ${dmvName} (ou à ton tag agent, selon le comté) :`,
    paperworkHeading: "Documents pour le transfert de titre",
    paperwork: (name: string, dmvName: string) => [
      `Le certificat de titre original, signé par le vendeur à ton nom`,
      `Un acte de vente montrant le prix d'achat et la date`,
      `La carte d'immatriculation à jour du vendeur`,
      `Ta pièce d'identité avec photo valide émise par le gouvernement`,
      `Preuve d'assurance auto en ${name} à ton nom`,
      `Paiement de la taxe de vente selon les barèmes du ${dmvName}`,
      `Une inspection VIN si le véhicule vient d'un autre état ou a un historique salvage`,
      `Déclaration d'odomètre (requise au niveau fédéral pour les véhicules de moins de 20 années modèles)`,
    ],
    transferFooter: (name: string) =>
      `Les délais pour compléter le transfert varient, mais la plupart des acheteurs en ${name} devraient prévoir de titrer et d'immatriculer une voiture d'occasion fraîchement achetée dans les 30 jours pour éviter les pénalités de retard.`,
    lemonEyebrow: "Lemon law",
    lemonHeading: (name: string) => `Protections de la lemon law de ${name}`,
    lemonP1: (name: string) =>
      `La lemon law de ${name} s'applique généralement quand un véhicule a un défaut substantiel que le fabricant ou le concessionnaire ne peut pas réparer après un nombre raisonnable de tentatives de réparation, ou quand le véhicule a été hors service pour des réparations pendant une période cumulée significative. Si ces seuils sont atteints, les acheteurs qualifiés peuvent avoir droit à un remboursement, un véhicule de remplacement comparable ou d'autres recours.`,
    lemonP2Before: (name: string) =>
      `Pour déposer une réclamation sous la lemon law de ${name}, documente chaque visite de réparation (dates, kilométrage, notes écrites du technicien), garde tous les reçus et notifie le fabricant par écrit. Une `,
    lemonLinkLabel: "vérification lemon law",
    lemonP2After:
      " peut aussi révéler si un véhicule d'occasion a déjà été racheté comme lemon — une divulgation critique que tous les vendeurs n'offrent pas spontanément.",
    taxEyebrow: "Taxe de vente",
    taxHeading: (name: string) => `Taxe de vente sur les véhicules d'occasion en ${name}`,
    taxP1: (name: string, dmvName: string) =>
      `${name} prélève une taxe de vente ou d'usage sur les achats de véhicules d'occasion, et le taux exact dépend de ton comté et de ta ville. Le ${dmvName} collecte généralement cette taxe au moment du titrage et de l'immatriculation sur la base du prix d'achat réel indiqué sur ton acte de vente (ou un plancher de valeur marchande équitable si le prix semble irréalistement bas).`,
    taxP2: (name: string, dmvName: string) =>
      `Comme les taux et exemptions peuvent changer, confirme toujours le taux actuel de la taxe de vente pour véhicules d'occasion de ${name} sur le site officiel du ${dmvName} avant de finaliser un accord. Les crédits trade-in, les transferts familiaux et les transferts cadeaux peuvent réduire ou éliminer la taxe dans certaines situations.`,
    checklistEyebrow: "Liste de vérification",
    checklistHeading: (name: string) => `Liste de vérification pré-achat pour les acheteurs en ${name}`,
    checklistIntro: (name: string) =>
      `Utilise cette liste sur chaque voiture d'occasion que tu envisages sérieusement en ${name}. Sauter ne serait-ce qu'un seul point est comment la plupart des acheteurs se retrouvent avec un véhicule qu'ils regrettent.`,
    linksHeading: (name: string) => `Vérifications VIN qui s'associent à ce guide de ${name}`,
    linksIntro:
      "Un rapport d'historique est l'étape la plus importante avant l'achat. Ces outils complètent l'image.",
    bannerSection: true,
    faqHeading: (name: string) => `Acheter une voiture d'occasion en ${name} — FAQ`,
    faqIntro: (name: string) =>
      `Les questions que les acheteurs en ${name} posent le plus avant de signer.`,
    bottomCtaBadge: "Gratuit \u00B7 Instantané \u00B7 Basé sur VIN",
    bottomCtaHeading: (name: string) => `Prêt à vérifier un VIN de ${name} ?`,
    bottomCtaBody:
      "Extrais un rapport d'historique de véhicule complet avant de signer quoi que ce soit — marques de titre, accidents, salvage, inondation, odomètre et rappels en un seul endroit.",
    bottomCtaNote:
      "Utilisé par plus de 50 000 acheteurs dans tout le pays \u00B7 Sans inscription \u00B7 Gratuit",
    othersHeading: "Acheter une voiture d'occasion dans d'autres états",
    othersIntro:
      "Tu cherches dans un rayon plus large ? Consulte les guides spécifiques aux marchés voisins et populaires.",
    otherStateVinCheckLabel: (name: string) => `Vérification VIN en ${name}`,
    allGuidesLabel: "Tous les guides",
    lemonCheckLabel: "Vérification lemon law",
  },
} as const;

// Light region heuristic to add a state-relevant flavor line.
function regionalRiskLine(state: { name: string; abbr: string }, locale: Locale): string {
  const coastalFlood = new Set(["FL", "LA", "MS", "AL", "TX", "NC", "SC", "GA", "VA", "NJ", "NY"]);
  const rustBelt = new Set(["MI", "OH", "PA", "NY", "WI", "IL", "IN", "MN", "MA", "CT", "RI", "NH", "VT", "ME", "WV"]);
  const hailHeavy = new Set(["CO", "TX", "NE", "KS", "OK", "WY", "SD", "ND", "MO"]);
  if (locale === "es") {
    if (coastalFlood.has(state.abbr)) {
      return `Los compradores en ${state.name} deben estar especialmente atentos a daños por inundación y huracanes que pueden estar ocultos bajo un detallado reciente o un interior de apariencia limpia.`;
    }
    if (rustBelt.has(state.abbr)) {
      return `Los compradores en ${state.name} deben prestar especial atención al óxido en el bajo carrocería y la corrosión del chasis causados por las carreteras tratadas con sal en invierno.`;
    }
    if (hailHeavy.has(state.abbr)) {
      return `Los compradores en ${state.name} deben estar pendientes de vehículos dañados por granizo trasladados desde estados vecinos con temporadas de tormentas severas.`;
    }
    return `Los compradores en ${state.name} siempre deben verificar el historial completo de un vehículo fuera del estado, ya que las marcas de título y los registros de daños no siempre acompañan a un auto cuando cruza líneas estatales.`;
  }
  if (coastalFlood.has(state.abbr)) {
    return `Buyers in ${state.name} should be especially alert for flood and hurricane damage that can be hidden under fresh detailing or a clean-looking interior.`;
  }
  if (rustBelt.has(state.abbr)) {
    return `Buyers in ${state.name} should pay close attention to undercarriage rust and frame corrosion caused by salt-treated winter roads.`;
  }
  if (hailHeavy.has(state.abbr)) {
    return `Buyers in ${state.name} should watch for hail-damaged vehicles relocated from neighboring states with severe storm seasons.`;
  }
  return `Buyers in ${state.name} should always verify a vehicle's full out-of-state history, since title brands and damage records don't always follow a car when it crosses state lines.`;
}

export default function BuyingUsedCarInStateBody({
  stateSlug,
  locale = "en",
}: {
  stateSlug: string;
  locale?: Locale;
}) {
  const stateEn = getStateBySlug(stateSlug);
  if (!stateEn) return null;

  const stateEs = statesEs.find((s) => s.slug === stateSlug);
  const isEs = locale === "es";
  const copy = COPY[locale];

  // Localised state field selection. titleBrands is structural (proper-noun
  // English brand keys) so we keep it as-is and only translate descriptions.
  const state = {
    slug: stateEn.slug,
    abbr: stateEn.abbr,
    name: isEs ? stateEs?.nameEs ?? stateEn.name : stateEn.name,
    dmvName: isEs ? stateEs?.dmvNameEs ?? stateEn.dmvName : stateEn.dmvName,
    titleBrands: stateEn.titleBrands,
    population: stateEn.population,
    vehiclesRegistered: stateEn.vehiclesRegistered,
    lemonLawNotes: isEs ? stateEs?.lemonLawNotesEs ?? stateEn.lemonLawNotes : stateEn.lemonLawNotes,
    specialFact: isEs ? stateEs?.specialFactEs ?? stateEn.specialFact : stateEn.specialFact,
  };

  // Locale-aware internal hrefs.
  const homeHref = isEs ? "/es" : "/";
  const guidesHref = isEs ? "/es/guides" : "/guides";
  const vinCheckHref = isEs ? "/es/revision-vin" : "/vin-check";
  const stateVinHref = isEs
    ? `/es/vin-check/state/${state.slug}`
    : `/vin-check/state/${state.slug}`;
  const salvageHref = isEs ? "/es/titulo-salvamento" : "/salvage-title-check";
  const stolenHref = isEs ? "/es/vehiculo-robado" : "/stolen-vehicle-check";
  const odometerHref = isEs ? "/es/verificacion-odometro" : "/odometer-check";
  const lemonHref = isEs ? "/es/verificacion-ley-limon" : "/lemon-check";
  const buyingHubHref = isEs
    ? "/es/guides/buying-used-car-in"
    : "/guides/buying-used-car-in";
  const stateGuideHref = (slug: string) =>
    isEs
      ? `/es/guides/buying-used-car-in/${slug}`
      : `/guides/buying-used-car-in/${slug}`;

  const otherStates = pickOtherStates(state.slug);
  const regionalLine = regionalRiskLine({ name: state.name, abbr: state.abbr }, locale);

  // Trust stats — same structural icons, locale-aware labels.
  const TRUST_STATS = [
    { icon: FileText, value: "NMVTIS", label: copy.trustStat1Label },
    { icon: Shield, value: copy.trustStat2Value, label: copy.trustStat2Label },
    { icon: BadgeCheck, value: copy.trustStat3Value, label: copy.trustStat3Label },
    { icon: Zap, value: copy.trustStat4Value, label: copy.trustStat4Label },
  ];

  const howSteps = [
    {
      icon: Search,
      tag: copy.step1Tag,
      title: copy.step1Title,
      body: copy.step1Body(state.name),
    },
    {
      icon: ClipboardCheck,
      tag: copy.step2Tag,
      title: copy.step2Title,
      body: copy.step2Body(state.name),
    },
    {
      icon: FileText,
      tag: copy.step3Tag,
      title: copy.step3Title,
      body: copy.step3Body(state.dmvName),
    },
  ];

  const internalLinks = isEs
    ? [
        {
          href: vinCheckHref,
          label: "Verificación completa de historial por VIN",
          desc: `Registros de título, accidentes, odómetro, salvage y retiros para cualquier vehículo en ${state.name} en un solo reporte.`,
        },
        {
          href: stateVinHref,
          label: `Verificación de VIN en ${state.name}`,
          desc: `Búsqueda de VIN específica para ${state.name} ajustada a las marcas de título y registros del ${state.dmvName}.`,
        },
        {
          href: salvageHref,
          label: "Verificación de título salvage",
          desc: "Detecta marcas de reconstruido, inundación y pérdida total que reducen el valor y la seguridad de un auto.",
        },
        {
          href: stolenHref,
          label: "Verificación de vehículo robado",
          desc: "Verifica un VIN contra bases de datos nacionales de robos antes de entregar dinero.",
        },
        {
          href: odometerHref,
          label: "Verificación de odómetro",
          desc: "Detecta fraude por retroceso de millaje que infla el valor aparente de un auto usado.",
        },
        {
          href: lemonHref,
          label: "Verificación de ley lemon",
          desc: `Comprueba si un auto fue recomprado bajo la ley lemon de ${state.name} por defectos no resueltos.`,
        },
      ]
    : [
        {
          href: vinCheckHref,
          label: "Full VIN History Check",
          desc: `Title, accident, odometer, salvage, and recall records for any ${state.name} vehicle in one report.`,
        },
        {
          href: stateVinHref,
          label: `${state.name} VIN Check`,
          desc: `State-specific VIN lookup tuned to ${state.name} title brands and ${state.dmvName} records.`,
        },
        {
          href: salvageHref,
          label: "Salvage Title Check",
          desc: "Detect rebuilt, flood, and total-loss brands that slash a car's value and safety.",
        },
        {
          href: stolenHref,
          label: "Stolen Vehicle Check",
          desc: "Verify a VIN against national theft databases before money changes hands.",
        },
        {
          href: odometerHref,
          label: "Odometer Check",
          desc: "Spot mileage rollback fraud that inflates a used car's apparent value.",
        },
        {
          href: lemonHref,
          label: "Lemon Check",
          desc: `See whether a car was bought back under ${state.name}'s lemon law for unresolved defects.`,
        },
      ];

  // FAQ stays byte-equivalent to the EN page-level JSON-LD (English) and gets
  // its own Spanish version on the ES page (the schema in the wrapper is
  // English-only — keeping the JSON-LD locale consistent with the English
  // canonical, the visible Spanish FAQ is purely for the user).
  const faqs = isEs
    ? [
        {
          q: `¿Cómo compro un auto usado en ${state.name}?`,
          a: `Para comprar un auto usado en ${state.name}, encuentra un vehículo, verifica su VIN de 17 caracteres, inspecciónalo en persona o con un mecánico, acuerda un precio y luego completa la transferencia de título y la matriculación en el ${state.dmvName}. Lleva el título firmado, un contrato de compraventa, tu identificación, prueba de seguro y cualquier pago de impuesto requerido para cerrar el trato.`,
        },
        {
          q: `¿Cómo transfiero un título en ${state.name}?`,
          a: `En ${state.name}, el vendedor te firma el certificado de título y tú lo presentas al ${state.dmvName} junto con un contrato de compraventa, tu identificación con foto y prueba de seguro. El estado emite un nuevo título a tu nombre. Los plazos y tarifas varían, así que consulta al ${state.dmvName} la fecha límite exacta para tu compra.`,
        },
        {
          q: `¿Pago impuesto sobre las ventas por un auto usado en ${state.name}?`,
          a: `La mayoría de los estados, incluido ${state.name}, cobran impuesto sobre las ventas o uso en compras de autos usados, y normalmente lo cobra el ${state.dmvName} al titular y registrar. La tarifa y los recargos locales varían, así que confirma la tarifa actual de ${state.name} con su DMV o departamento de ingresos. Los créditos por trade-in, regalos y transferencias familiares pueden reducir o eliminar el impuesto.`,
        },
        {
          q: `¿${state.name} requiere inspección de seguridad o de emisiones?`,
          a: `Los requisitos de inspección y emisiones varían por estado y a veces por condado, así que verifica si ${state.name} requiere una antes de registrar. Donde se requiere, la revisión normalmente se hace junto con la titulación o el registro a través del ${state.dmvName}. También es común una inspección de VIN separada cuando un vehículo viene de fuera del estado o tiene historial salvage o reconstruido.`,
        },
        {
          q: `¿Cómo verifico el historial de un auto antes de comprar en ${state.name}?`,
          a: `Ingresa el VIN de 17 caracteres del vehículo en un reporte de historial vehicular antes de entregar cualquier dinero. Para una compra en ${state.name} esto revela marcas de título, accidentes reportados, daño por salvage o inundación, discrepancias de odómetro y retiros abiertos registrados en bases de datos nacionales — incluidos registros de otros estados que el vendedor o el DMV local pueden no mostrar. Verifica siempre que el VIN del tablero, del marco de la puerta y del título coincidan.`,
        },
        {
          q: `¿Necesito un contrato de compraventa en ${state.name}?`,
          a: `Un contrato de compraventa documenta el precio, la fecha y las dos partes de una venta de auto usado, y ${state.name} generalmente espera uno como parte de los documentos para la transferencia de título presentados al ${state.dmvName}. Aunque no sea estrictamente requerido, guarda una copia firmada: respalda el cálculo del impuesto sobre las ventas y protege a comprador y vendedor si surge una disputa.`,
        },
      ]
    : [
        {
          q: `How do I buy a used car in ${state.name}?`,
          a: `To buy a used car in ${state.name}, find a vehicle, run its 17-character VIN to check the history, inspect it in person or with a mechanic, agree on a price, then complete the title transfer and registration with the ${state.dmvName}. Bring the signed title, a bill of sale, your ID, proof of insurance, and any required tax payment to finish the deal.`,
        },
        {
          q: `How do I transfer a title in ${state.name}?`,
          a: `In ${state.name}, the seller signs the certificate of title over to you and you submit it to the ${state.dmvName} along with a bill of sale, your photo ID, and proof of insurance. The state issues a new title in your name. Time limits and fees vary, so check the ${state.dmvName} for the exact deadline that applies to your purchase.`,
        },
        {
          q: `Do I pay sales tax on a used car in ${state.name}?`,
          a: `Most states, including ${state.name}, charge sales or use tax on used-car purchases, and it is usually collected by the ${state.dmvName} at the time of title and registration. The rate and any local additions vary, so confirm ${state.name}'s current rate with its DMV or revenue department. Trade-in credits, gifts, and family transfers may reduce or eliminate the tax owed.`,
        },
        {
          q: `Does ${state.name} require a safety or emissions inspection?`,
          a: `Inspection and emissions requirements vary by state and sometimes by county, so verify whether ${state.name} requires one before you register. Where required, the check is typically tied to titling or registration through the ${state.dmvName}. A separate VIN inspection is also common when a vehicle comes from out of state or carries a salvage or rebuilt history.`,
        },
        {
          q: `How do I check a car's history before buying in ${state.name}?`,
          a: `Enter the vehicle's 17-character VIN into a vehicle history report before you put down any money. For a ${state.name} purchase this surfaces title brands, reported accidents, salvage or flood damage, odometer discrepancies, and open recalls recorded in national databases — including out-of-state records the seller or local DMV may not show. Always match the VIN on the dashboard, door jamb, and title.`,
        },
        {
          q: `Do I need a bill of sale in ${state.name}?`,
          a: `A bill of sale documents the purchase price, date, and both parties for a used-car sale, and ${state.name} generally expects one as part of the title-transfer paperwork submitted to the ${state.dmvName}. Even where it is not strictly required, keep a signed copy: it supports the sales-tax calculation and protects both buyer and seller if a dispute arises later.`,
        },
      ];

  // Checklist items, locale-aware.
  const checklistItems: ReactNode[] = isEs
    ? [
        <>
          Saca una{" "}
          <Link
            href={vinCheckHref}
            className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
          >
            verificación de VIN
          </Link>{" "}
          antes de cualquier prueba de manejo o depósito
        </>,
        `Verifica que el nombre del vendedor en su identificación con foto coincida con el nombre en el título de ${state.name}`,
        <>
          Revisa cualquier retiro abierto en{" "}
          <a
            href="https://www.nhtsa.gov/recalls"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
          >
            NHTSA.gov
          </a>
        </>,
        `Inspecciona el bajo carrocería y el chasis por óxido — especialmente importante en vehículos de ${state.name} expuestos a sal de carretera o aire costero`,
        `Confirma que la lectura del odómetro coincida con el título y el reporte de historial por VIN`,
        `Obtén una inspección pre-compra de un mecánico independiente de ${state.name}`,
        `Verifica que todas las llaves, la rueda de repuesto y cualquier accesorio de fábrica estén presentes`,
        `Prueba todos los sistemas eléctricos: luces, infotainment, ventanas eléctricas, control climático e indicadores de advertencia`,
        `Coteja el VIN del tablero, marco de la puerta, compartimento del motor y título para confirmar que coincidan`,
        <>
          Negocia con base en los valores de venta particular de KBB y Edmunds, y luego
          verifica el historial limpio con una{" "}
          <Link
            href={salvageHref}
            className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
          >
            verificación de título salvage
          </Link>{" "}
          y una{" "}
          <Link
            href={stolenHref}
            className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
          >
            verificación de vehículo robado
          </Link>
        </>,
      ]
    : [
        <>
          Run a{" "}
          <Link
            href={vinCheckHref}
            className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
          >
            VIN check
          </Link>{" "}
          before any test drive or deposit
        </>,
        `Verify the seller's name on their photo ID matches the name on the ${state.name} title`,
        <>
          Check for any open recalls at{" "}
          <a
            href="https://www.nhtsa.gov/recalls"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
          >
            NHTSA.gov
          </a>
        </>,
        `Inspect undercarriage and frame for rust — especially important on ${state.name} vehicles exposed to road salt or coastal air`,
        `Confirm the odometer reading matches the title and the VIN history report`,
        `Get a pre-purchase inspection from an independent ${state.name} mechanic`,
        `Verify all keys, the spare, and any factory accessories are present`,
        `Test all electrical systems: lights, infotainment, power windows, climate control, and warning indicators`,
        `Cross-check the VIN on the dashboard, door jamb, engine bay, and title to make sure they all match`,
        <>
          Negotiate based on KBB and Edmunds private-party values, then verify
          clean history with a{" "}
          <Link
            href={salvageHref}
            className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
          >
            salvage title check
          </Link>{" "}
          and a{" "}
          <Link
            href={stolenHref}
            className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
          >
            stolen vehicle check
          </Link>
        </>,
      ];

  const brandDescription = (brand: string): string => {
    const map = isEs ? titleBrandLookupEs : titleBrandLookupEn;
    return map[brand] || copy.brandFallback(brand, state.name);
  };

  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: copy.breadcrumbHome, href: homeHref },
              { label: copy.breadcrumbGuides, href: guidesHref },
              { label: copy.breadcrumbBuying, href: buyingHubHref },
              { label: state.name },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <MapPin className="w-4 h-4" /> {state.name} ({state.abbr})
            {copy.badgeSuffix}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {copy.h1Pre}
            <span style={{ color: "var(--color-secondary-container)" }}>
              {state.name}
            </span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {copy.heroIntro({
              name: state.name,
              population: state.population,
              dmvName: state.dmvName,
              specialFact: state.specialFact,
            })}
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              {copy.searchHeading(state.name)}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
              {copy.searchSub(state.name)}
            </p>
            <VinSearchForm size="lg" locale={locale} />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {copy.trustNote}
            </p>
          </div>

          {/* Trust stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {TRUST_STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center"
                >
                  <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                  <div className="text-xl sm:text-2xl font-headline font-black text-white">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-white/65 leading-tight mt-0.5">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* How to buy */}
        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {copy.howHeading(state.name)}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
            {copy.howIntro(state.name, state.dmvName)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {howSteps.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">
                    {m.tag}
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {m.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why it matters */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-wider">
              {copy.whyEyebrow}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {copy.whyHeading(state.name)}
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
            <p>
              {copy.whyP1({
                name: state.name,
                population: state.population,
                vehiclesRegistered: state.vehiclesRegistered,
              })}
            </p>
            <p>
              {copy.whyP2({
                name: state.name,
                dmvName: state.dmvName,
                specialFact: state.specialFact,
              })}
            </p>
            <p>{regionalLine}</p>
          </div>
        </section>

        {/* Title brands */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <FileText className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-wider">
              {copy.brandsEyebrow}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {copy.brandsHeading(state.name)}
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6">
            <p>{copy.brandsP1(state.name)}</p>
            <p>{copy.brandsP2(state.name, state.dmvName)}</p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {state.titleBrands.map((brand) => (
              <li
                key={brand}
                className="flex items-start gap-3 p-4 rounded-2xl border border-outline-variant bg-surface"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-headline font-extrabold text-primary">{brand}</p>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
                    {brandDescription(brand)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Mid CTA */}
        <section className="py-4">
          <div className="rounded-3xl bg-primary text-white p-7 sm:p-10 text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-xs font-black uppercase tracking-wider text-white/80">
                {copy.midCtaBadge}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold mb-2">
              {copy.midCtaHeading(state.name)}
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-6">
              {copy.midCtaBody}
            </p>
            <div className="max-w-xl mx-auto">
              <VinSearchForm size="lg" onDark locale={locale} />
            </div>
          </div>
        </section>

        {/* Title transfer */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <BadgeCheck className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-wider">
              {copy.transferEyebrow}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {copy.transferHeading(state.dmvName)}
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
            <p>{copy.transferP1(state.name, state.dmvName)}</p>
            <p>{copy.transferP2(state.name, state.dmvName)}</p>
          </div>
          <div className="mt-5 rounded-2xl bg-primary/5 border border-primary/20 p-6">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardCheck className="w-5 h-5 text-primary" />
              <h3 className="font-headline font-extrabold text-primary">
                {copy.paperworkHeading}
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-on-surface">
              {copy.paperwork(state.name, state.dmvName).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check
                    className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5"
                    strokeWidth={3}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-sm sm:text-base text-on-surface-variant leading-relaxed">
            {copy.transferFooter(state.name)}
          </p>
        </section>

        {/* Lemon law */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <Gavel className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-wider">
              {copy.lemonEyebrow}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {copy.lemonHeading(state.name)}
          </h2>
          <div className="flex items-start gap-3 p-5 rounded-2xl bg-secondary-container/40 border border-outline-variant mb-5">
            <AlertTriangle className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
            <p className="text-sm text-on-surface leading-relaxed">
              {state.lemonLawNotes}
            </p>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
            <p>{copy.lemonP1(state.name)}</p>
            <p>
              {copy.lemonP2Before(state.name)}
              <Link
                href={lemonHref}
                className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
              >
                {copy.lemonLinkLabel}
              </Link>
              {copy.lemonP2After}
            </p>
          </div>
        </section>

        {/* Sales tax */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <Calculator className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-wider">
              {copy.taxEyebrow}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {copy.taxHeading(state.name)}
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
            <p>{copy.taxP1(state.name, state.dmvName)}</p>
            <p>{copy.taxP2(state.name, state.dmvName)}</p>
          </div>
        </section>

        {/* Checklist */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <CheckCircle className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-wider">
              {copy.checklistEyebrow}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {copy.checklistHeading(state.name)}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-5 max-w-3xl">
            {copy.checklistIntro(state.name)}
          </p>
          <ol className="space-y-3">
            {checklistItems.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-4 rounded-2xl border border-outline-variant bg-surface-container-lowest"
              >
                <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs font-black">
                  {i + 1}
                </div>
                <span className="text-sm text-on-surface leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Internal links */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {copy.linksHeading(state.name)}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">
            {copy.linksIntro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {internalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">
                    {l.label}
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">
                    {l.desc}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* VIN check banner */}
        <section className="py-10">
          <VinCheckBanner />
        </section>

        {/* FAQ */}
        <section className="speakable-faq py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {copy.faqHeading(state.name)}
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            {copy.faqIntro(state.name)}
          </p>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <h3 className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2 m-0">
                    {f.q}
                  </h3>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> {copy.bottomCtaBadge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            {copy.bottomCtaHeading(state.name)}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            {copy.bottomCtaBody}
          </p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" locale={locale} />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            {copy.bottomCtaNote}
          </div>
        </section>

        {/* Other states */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {copy.othersHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6">
            {copy.othersIntro}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {otherStates.map((s) => {
              const otherStateEs = statesEs.find((x) => x.slug === s.slug);
              const otherName = isEs ? otherStateEs?.nameEs ?? s.name : s.name;
              return (
                <Link
                  key={s.slug}
                  href={stateGuideHref(s.slug)}
                  className="flex items-center gap-2 p-4 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-on-surface">{otherName}</span>
                </Link>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link
              href={stateVinHref}
              className="inline-flex items-center gap-1.5 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              <Car className="w-4 h-4" /> {copy.otherStateVinCheckLabel(state.name)}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={guidesHref}
              className="inline-flex items-center gap-1.5 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              <FileText className="w-4 h-4" /> {copy.allGuidesLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={lemonHref}
              className="inline-flex items-center gap-1.5 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              <AlertTriangle className="w-4 h-4" /> {copy.lemonCheckLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <RelatedChecks />
      </div>
    </article>
  );
}
