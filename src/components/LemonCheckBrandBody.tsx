/**
 * Shared body for /lemon-check/brand/[make] and /es/lemon-check/brand/[make].
 * Wave 17b — 26 brand pages × 2 locales rendered from the same component.
 *
 * Brand facts (basicWarranty, powertrainWarranty, blurb, angle, tips)
 * come from the existing English LEMON_BRANDS data source — there's
 * no Spanish brand-data file, so brand-specific factual claims
 * (warranty terms, common issues) stay in English on both locales.
 * The structural chrome (headings, intros, FAQs, CTAs) translates
 * via the COPY={en,es} map.
 */

import Link from "@/components/LocaleLink";
import {
  AlertOctagon, Shield, Search, FileText, Clock, Car,
  ChevronRight, Zap, BadgeCheck, Lock, Check, Wrench,
  ClipboardList, ScrollText, Tag, ArrowRight, CalendarClock,
  Building2, Factory, ShieldCheck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { LEMON_BRANDS, findLemonBrand, type LemonBrand } from "@/lib/lemon-brands";
import type { Locale } from "@/i18n/config";

export function getBrandOthers(slug: string): LemonBrand[] {
  const b = findLemonBrand(slug);
  if (!b) return [];
  const siblings = LEMON_BRANDS.filter((x) => x.parent === b.parent && x.slug !== b.slug);
  const idx = LEMON_BRANDS.findIndex((x) => x.slug === b.slug);
  const filler = [
    LEMON_BRANDS[(idx + 1) % LEMON_BRANDS.length],
    LEMON_BRANDS[(idx + 5) % LEMON_BRANDS.length],
    LEMON_BRANDS[(idx + 11) % LEMON_BRANDS.length],
  ];
  const others: LemonBrand[] = [];
  for (const cand of [...siblings, ...filler]) {
    if (cand.slug !== b.slug && !others.some((o) => o.slug === cand.slug)) {
      others.push(cand);
    }
    if (others.length >= 4) break;
  }
  return others;
}

const COPY = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbLemon: "Lemon Check",
    breadcrumbBrand: "By Brand",
    heroBadge: (name: string) => `${name} Manufacturer Buyback Lookup`,
    h1Lead: (name: string) => `${name} Lemon Check by VIN —`,
    h1Accent: "Catch the Buyback Before You Buy",
    heroLead: (name: string, basic: string, powertrain: string) =>
      `Check any ${name} for a manufacturer buyback, lemon-law repurchase, or warranty return. ${name}'s standard coverage is ${basic} basic and ${powertrain} powertrain — the window that usually defines lemon-law eligibility. Free preview, no credit card, instant results from NMVTIS.`,
    searchHeading: (name: string) => `Run a Free ${name} Lemon Check`,
    searchSub: "Enter any 17-character VIN — cars, trucks, SUVs, leased vehicles",
    trustNote: "256-bit encrypted · DPPA compliant · NMVTIS-sourced title data",
    trustStatLabels: ["buyback records", "federally-sourced", "average lookup time", "preview, no signup", "cars · SUVs · trucks"],
    trustStatAllModels: "All models",
    headlineStatLabels: ["Basic warranty window", "Powertrain warranty", "How it's sold in the US", "Parent company"],
    statsAtAGlance: (name: string) => `${name} Warranty & Lemon-Law Window at a Glance`,
    introHeading: (name: string) => `What a ${name} Lemon Check Tells You`,
    introBuybackPre: (name: string, parent: string) =>
      `A "buyback" happens when ${parent} repurchases a vehicle from its original owner because a defect could not be fixed within a reasonable number of attempts. The car is then resold — and its title is branded by the state DMV. A `,
    introVinLink: "VIN-based lemon check",
    introBuybackSuffix: (name: string) =>
      ` pulls that brand from NMVTIS, the federal title system that gathers records from every state DMV, so a ${name} buyback cannot quietly disappear by moving the car across state lines.`,
    basicsHeading: (name: string) => `${name} Warranty & Buyback Basics`,
    basicsIntro: (name: string) =>
      `Lemon-law eligibility for a ${name} is anchored to the original factory warranty. Here is what defines the window — and how a repurchase is recorded.`,
    coverageCard: "Coverage & eligibility",
    basicWarrantyLabel: "Basic warranty",
    powertrainWarrantyLabel: "Powertrain warranty",
    salesModelLabel: "Sales model",
    brandedCard: "How a buyback is branded",
    parentLabel: "Parent company",
    titleBrandsLabel: "Title brands",
    titleBrandsValue: "Manufacturer Buyback · Lemon Law Buyback · Reacquired Vehicle",
    nmvtisLabel: "Recorded in NMVTIS by the state DMV",
    tipsHeading: (name: string) => `What to Check on a Used ${name}`,
    tipsIntro: (name: string) =>
      `Brand-specific pointers that make a ${name} buyback easier to catch before you sign.`,
    howToHeading: (name: string) => `How to Lemon-Check a ${name} — 6 Steps`,
    howToIntro:
      "A full pre-purchase lemon screen takes about 15 minutes between your desk and the dealership.",
    reputationHeading: (name: string) => `Is a ${name} a "Lemon Brand"?`,
    reputationP1Pre: 'No brand is a "lemon brand." A buyback is a ',
    reputationP1BoldEvent: "per-vehicle event",
    reputationP1Suffix: (name: string, parent: string) =>
      `, not a verdict on every ${name} ever built. ${parent} produces hundreds of thousands of trouble-free units, and even a model with a high complaint count has far more clean-running cars than problem ones.`,
    reputationP2Pre: "The most credible public data source is the ",
    reputationP2BoldNhtsa: "NHTSA Office of Defects Investigation",
    reputationP2Mid: " complaint database, which is searchable by year, make, and model. High complaint clusters for the same system correlate with higher lemon-law eligibility — but they describe a model year, not the specific car in front of you. That is why a ",
    reputationP2Link: "VIN-level lemon check",
    reputationP2Suffix: (name: string) =>
      ` always beats brand reputation: it tells you about the one ${name} you are about to buy.`,
    midCtaHeading: (name: string) => `Don't Buy a ${name} Buyback by Mistake`,
    midCtaBody: (name: string) =>
      `Free, instant ${name} lemon check sourced from NMVTIS and every state DMV. No credit card. No signup.`,
    othersHeading: "Lemon Checks for Other Brands",
    othersIntro: (name: string) =>
      `Warranty windows and buyback patterns differ by manufacturer. Compare ${name} with these brand guides, or browse every brand.`,
    otherCardTemplate: (name: string) => `${name} Lemon Check`,
    allBrandsLink: "All Brands Lemon Check",
    allBrandsSub: "Browse every manufacturer in one place.",
    byStateLink: "Lemon Law by State",
    byStateSub: "Repair-attempt thresholds for all 50 states.",
    faqHeading: (name: string) => `${name} Lemon Check FAQ`,
    faqIntro: (name: string) =>
      `The most-searched questions about ${name} buybacks, warranty windows, and VIN-based lemon detection.`,
    bottomBadge: (name: string) => `Free · Instant · ${name}`,
    bottomHeading: (name: string) => `One VIN. Every ${name} Buyback Brand. Five Seconds.`,
    bottomBody: (name: string) =>
      `A manufacturer buyback record follows the VIN permanently, even when the paper title looks clean. Run the free ${name} check before you write a check.`,
    fullReportLink: "Or get the full VIN history report",
    faqBuilder(b: LemonBrand) {
      return [
        { q: `How do I check if my ${b.name} is a lemon?`, a: `Enter the 17-character VIN in the search box above. We query NMVTIS and national title sources for any manufacturer buyback, lemon-law repurchase, or warranty-return brand on that specific ${b.name}. Because NMVTIS aggregates records from all 50 state DMVs, a buyback recorded in one state will still surface even if the car was later re-titled elsewhere.` },
        { q: `What warranty does a ${b.name} come with, and why does it matter for lemon law?`, a: `${b.name}'s standard new-vehicle coverage is ${b.basicWarranty} bumper-to-bumper with a ${b.powertrainWarranty} powertrain warranty. This matters because most state lemon laws only apply to defects that appear during the original manufacturer warranty period — so the warranty window effectively defines the lemon-law eligibility window for a ${b.name}.` },
        { q: `What is a ${b.name} buyback title called?`, a: `${b.name} buybacks carry the same title brands any manufacturer repurchase does — most commonly "Manufacturer Buyback" or "Lemon Law Buyback," with some states using "Reacquired Vehicle" or "Warranty Return." The brand is issued by the state DMV, not by ${b.parent}, so the exact wording depends on which state first repurchased the vehicle.` },
        { q: `Does a ${b.name} buyback show up on a VIN check?`, a: `Yes, if the buyback was reported to NMVTIS. A "${b.name}" repurchase recorded by any state DMV becomes part of the federal title record, which our check pulls directly. ${b.angle}` },
        { q: `How many repair attempts make a ${b.name} a lemon?`, a: `It depends on the state, not the brand — most states require 3 or 4 failed repair attempts for the same defect, or 30 cumulative days out of service, during the warranty period. A single failed repair can be enough for a serious safety defect such as brakes or steering. Check your state's exact threshold on our state lemon-law pages.` },
        { q: `Is a ${b.name} more or less likely to be a lemon than other brands?`, a: `A buyback is a per-vehicle event, not a brand verdict. Every modern manufacturer, ${b.name} included, builds hundreds of thousands of trouble-free vehicles, and even a model with many complaints has far more clean-running units. That is exactly why a VIN-specific check is more useful than brand reputation — it tells you about the one car you are buying.` },
        { q: `What if a ${b.name} seller never told me it was a buyback?`, a: `If a seller failed to disclose a known buyback brand, you may have a claim under your state's deceptive trade practices law, common-law fraud, or the federal Magnuson-Moss Warranty Act. Keep the title, the listing, and every repair record, and consult a qualified consumer-protection attorney. This page is informational, not legal advice.` },
      ];
    },
    howToBuilder(b: LemonBrand) {
      return [
        { n: "01", icon: Search, title: "Run the VIN", body: `Enter the 17-character VIN above. We pull NMVTIS, DMV title records, and national auction data in under 5 seconds for any ${b.name}.` },
        { n: "02", icon: FileText, title: "Find the brand", body: `Scan the title-history section for a "Manufacturer Buyback," "Lemon Law Buyback," or equivalent repurchase brand.` },
        { n: "03", icon: CalendarClock, title: "Check the window", body: `${b.name} coverage runs ${b.basicWarranty} basic. See whether the defect history falls inside that period.` },
        { n: "04", icon: Wrench, title: "Pull service records", body: `Request the ${b.parent} warranty repair history by VIN and count same-defect visits.` },
        { n: "05", icon: Building2, title: "Match the state rules", body: `Lemon thresholds vary by state. Open your state's lemon-law page for the exact repair-attempt count.` },
        { n: "06", icon: ClipboardList, title: "Get a PPI", body: `Have an independent mechanic who knows ${b.name} inspect the car and target any flagged systems.` },
      ];
    },
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbLemon: "Verificación Ley Limón",
    breadcrumbBrand: "Por marca",
    heroBadge: (name: string) => `Búsqueda de recompra del fabricante ${name}`,
    h1Lead: (name: string) => `Verificación Ley Limón ${name} por VIN —`,
    h1Accent: "Detecta la recompra antes de comprar",
    heroLead: (name: string, basic: string, powertrain: string) =>
      `Verifica cualquier ${name} por recompra del fabricante, recompra Ley Limón o devolución por garantía. La cobertura estándar de ${name} es ${basic} básica y ${powertrain} de tren motriz — la ventana que usualmente define la elegibilidad Ley Limón. Vista previa gratis, sin tarjeta, resultados al instante desde NMVTIS.`,
    searchHeading: (name: string) => `Ejecuta una verificación Ley Limón ${name} gratis`,
    searchSub: "Ingresa cualquier VIN de 17 caracteres — autos, camiones, SUVs, vehículos arrendados",
    trustNote: "Encriptado 256 bits · Compatible con DPPA · Datos de título de NMVTIS",
    trustStatLabels: ["registros de recompra", "fuente federal", "tiempo promedio de búsqueda", "vista previa, sin registro", "autos · SUVs · camiones"],
    trustStatAllModels: "Todos los modelos",
    headlineStatLabels: ["Ventana de garantía básica", "Garantía del tren motriz", "Cómo se vende en EE. UU.", "Compañía matriz"],
    statsAtAGlance: (name: string) => `Ventana de garantía y Ley Limón de ${name} de un vistazo`,
    introHeading: (name: string) => `Lo que te dice una verificación Ley Limón de ${name}`,
    introBuybackPre: (name: string, parent: string) =>
      `Una "recompra" sucede cuando ${parent} recompra un vehículo a su dueño original porque un defecto no pudo arreglarse dentro de un número razonable de intentos. El auto luego se revende — y su título se marca por el DMV estatal. Una `,
    introVinLink: "verificación Ley Limón basada en VIN",
    introBuybackSuffix: (name: string) =>
      ` obtiene esa marca de NMVTIS, el sistema federal de títulos que reúne registros de cada DMV estatal, así que una recompra de ${name} no puede desaparecer silenciosamente moviendo el auto entre estados.`,
    basicsHeading: (name: string) => `Garantía y conceptos básicos de recompra de ${name}`,
    basicsIntro: (name: string) =>
      `La elegibilidad Ley Limón para un ${name} está anclada a la garantía original de fábrica. Aquí está lo que define la ventana — y cómo se registra una recompra.`,
    coverageCard: "Cobertura y elegibilidad",
    basicWarrantyLabel: "Garantía básica",
    powertrainWarrantyLabel: "Garantía del tren motriz",
    salesModelLabel: "Modelo de venta",
    brandedCard: "Cómo se marca una recompra",
    parentLabel: "Compañía matriz",
    titleBrandsLabel: "Marcas de título",
    titleBrandsValue: "Manufacturer Buyback · Lemon Law Buyback · Reacquired Vehicle",
    nmvtisLabel: "Registrado en NMVTIS por el DMV estatal",
    tipsHeading: (name: string) => `Qué revisar en un ${name} usado`,
    tipsIntro: (name: string) =>
      `Consejos específicos de marca que hacen más fácil detectar una recompra de ${name} antes de firmar.`,
    howToHeading: (name: string) => `Cómo verificar Ley Limón un ${name} — 6 pasos`,
    howToIntro:
      "Una verificación pre-compra completa de Ley Limón toma alrededor de 15 minutos entre tu escritorio y el concesionario.",
    reputationHeading: (name: string) => `¿Es un ${name} una "marca limón"?`,
    reputationP1Pre: 'Ninguna marca es una "marca limón". Una recompra es un ',
    reputationP1BoldEvent: "evento por vehículo",
    reputationP1Suffix: (name: string, parent: string) =>
      `, no un veredicto sobre cada ${name} jamás construido. ${parent} produce cientos de miles de unidades sin problemas, e incluso un modelo con un alto conteo de quejas tiene muchos más autos funcionando limpiamente que problemáticos.`,
    reputationP2Pre: "La fuente de datos pública más creíble es la base de datos de quejas de la ",
    reputationP2BoldNhtsa: "NHTSA Office of Defects Investigation",
    reputationP2Mid: ", buscable por año, marca y modelo. Los clusters de quejas altas para el mismo sistema se correlacionan con mayor elegibilidad Ley Limón — pero describen un año modelo, no el auto específico frente a ti. Por eso una ",
    reputationP2Link: "verificación Ley Limón a nivel de VIN",
    reputationP2Suffix: (name: string) =>
      ` siempre vence a la reputación de la marca: te dice sobre el único ${name} que estás por comprar.`,
    midCtaHeading: (name: string) => `No compres una recompra de ${name} por error`,
    midCtaBody: (name: string) =>
      `Verificación Ley Limón gratis e instantánea de ${name} desde NMVTIS y cada DMV estatal. Sin tarjeta. Sin registro.`,
    othersHeading: "Verificaciones Ley Limón para otras marcas",
    othersIntro: (name: string) =>
      `Las ventanas de garantía y patrones de recompra difieren por fabricante. Compara ${name} con estas guías de marca, o navega cada marca.`,
    otherCardTemplate: (name: string) => `Verificación Ley Limón ${name}`,
    allBrandsLink: "Verificación Ley Limón todas las marcas",
    allBrandsSub: "Navega cada fabricante en un lugar.",
    byStateLink: "Ley Limón por estado",
    byStateSub: "Umbrales de intentos de reparación para los 50 estados.",
    faqHeading: (name: string) => `FAQ — Verificación Ley Limón ${name}`,
    faqIntro: (name: string) =>
      `Las preguntas más buscadas sobre recompras de ${name}, ventanas de garantía y detección de limón basada en VIN.`,
    bottomBadge: (name: string) => `Gratis · Instantáneo · ${name}`,
    bottomHeading: (name: string) => `Un VIN. Cada marca de recompra de ${name}. Cinco segundos.`,
    bottomBody: (name: string) =>
      `Un registro de recompra del fabricante sigue al VIN permanentemente, incluso cuando el título en papel se ve limpio. Ejecuta la verificación gratis de ${name} antes de escribir un cheque.`,
    fullReportLink: "O obtén el reporte completo de historial VIN",
    faqBuilder(b: LemonBrand) {
      return [
        { q: `¿Cómo verifico si mi ${b.name} es un limón?`, a: `Ingresa el VIN de 17 caracteres en el cuadro de búsqueda arriba. Consultamos NMVTIS y fuentes nacionales de título por cualquier recompra del fabricante, recompra Ley Limón o marca de devolución por garantía en ese ${b.name} específico. Como NMVTIS agrega registros de los 50 DMVs estatales, una recompra registrada en un estado todavía surgirá incluso si el auto fue luego re-titulado en otro lugar.` },
        { q: `¿Qué garantía trae un ${b.name}, y por qué importa para la Ley Limón?`, a: `La cobertura estándar para vehículos nuevos de ${b.name} es ${b.basicWarranty} bumper-to-bumper con una garantía del tren motriz de ${b.powertrainWarranty}. Esto importa porque la mayoría de las leyes limón estatales solo aplican a defectos que aparecen durante el periodo de garantía original del fabricante — así que la ventana de garantía efectivamente define la ventana de elegibilidad Ley Limón para un ${b.name}.` },
        { q: `¿Cómo se llama un título de recompra de ${b.name}?`, a: `Las recompras de ${b.name} llevan las mismas marcas de título que cualquier recompra del fabricante — más comúnmente "Manufacturer Buyback" o "Lemon Law Buyback", con algunos estados usando "Reacquired Vehicle" o "Warranty Return". La marca es emitida por el DMV estatal, no por ${b.parent}, así que la redacción exacta depende de qué estado primero recompró el vehículo.` },
        { q: `¿Una recompra de ${b.name} aparece en una verificación VIN?`, a: `Sí, si la recompra fue reportada a NMVTIS. Una recompra de "${b.name}" registrada por cualquier DMV estatal se convierte en parte del registro federal de título, el cual nuestra verificación obtiene directamente. ${b.angle}` },
        { q: `¿Cuántos intentos de reparación hacen que un ${b.name} sea un limón?`, a: `Depende del estado, no de la marca — la mayoría de los estados requieren 3 o 4 intentos de reparación fallidos para el mismo defecto, o 30 días acumulados fuera de servicio, durante el periodo de garantía. Un solo intento de reparación fallido puede ser suficiente para un defecto serio de seguridad como frenos o dirección. Verifica el umbral exacto de tu estado en nuestras páginas estatales de Ley Limón.` },
        { q: `¿Es un ${b.name} más o menos probable de ser un limón que otras marcas?`, a: `Una recompra es un evento por vehículo, no un veredicto de marca. Cada fabricante moderno, incluido ${b.name}, construye cientos de miles de vehículos sin problemas, e incluso un modelo con muchas quejas tiene muchas más unidades funcionando limpiamente. Esa es exactamente la razón por la cual una verificación específica del VIN es más útil que la reputación de marca — te dice sobre el único auto que estás comprando.` },
        { q: `¿Qué pasa si un vendedor de ${b.name} nunca me dijo que era una recompra?`, a: `Si un vendedor falló en divulgar una marca conocida de recompra, puedes tener un reclamo bajo la ley estatal de prácticas comerciales engañosas, fraude de common-law o la federal Magnuson-Moss Warranty Act. Guarda el título, el anuncio y cada registro de reparación, y consulta a un abogado calificado de protección al consumidor. Esta página es informativa, no es asesoría legal.` },
      ];
    },
    howToBuilder(b: LemonBrand) {
      return [
        { n: "01", icon: Search, title: "Ejecuta el VIN", body: `Ingresa el VIN de 17 caracteres arriba. Obtenemos NMVTIS, registros de título del DMV y datos nacionales de subasta en menos de 5 segundos para cualquier ${b.name}.` },
        { n: "02", icon: FileText, title: "Encuentra la marca", body: `Escanea la sección de historial de título por una marca "Manufacturer Buyback", "Lemon Law Buyback" o equivalente de recompra.` },
        { n: "03", icon: CalendarClock, title: "Verifica la ventana", body: `La cobertura de ${b.name} corre ${b.basicWarranty} básica. Ve si el historial de defectos cae dentro de ese periodo.` },
        { n: "04", icon: Wrench, title: "Obtén registros de servicio", body: `Solicita el historial de reparación de garantía de ${b.parent} por VIN y cuenta visitas por el mismo defecto.` },
        { n: "05", icon: Building2, title: "Empareja las reglas del estado", body: `Los umbrales de Ley Limón varían por estado. Abre la página de Ley Limón de tu estado para el conteo exacto de intentos de reparación.` },
        { n: "06", icon: ClipboardList, title: "Obtén una PPI", body: `Haz que un mecánico independiente que conozca ${b.name} inspeccione el auto y enfoque cualquier sistema señalado.` },
      ];
    },
  },
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbLemon: "Vérification Lemon Law",
    breadcrumbBrand: "Par marque",
    heroBadge: (name: string) => `Recherche de rachats fabricant ${name}`,
    h1Lead: (name: string) => `Vérification Lemon Law ${name} par VIN —`,
    h1Accent: "Repère le rachat avant d'acheter",
    heroLead: (name: string, basic: string, powertrain: string) =>
      `Vérifie n'importe quel ${name} pour un rachat fabricant, un rachat lemon law ou un retour sous garantie. La couverture standard de ${name} est ${basic} de base et ${powertrain} pour le groupe motopropulseur — la fenêtre qui définit habituellement l'éligibilité à la lemon law. Aperçu gratuit, sans carte, résultats instantanés depuis NMVTIS.`,
    searchHeading: (name: string) => `Lance une vérification lemon law ${name} gratuite`,
    searchSub: "Saisis n'importe quel VIN de 17 caractères — voitures, camions, SUV, véhicules en leasing",
    trustNote: "Chiffré 256 bits · Conforme DPPA · Données de titre issues de NMVTIS",
    trustStatLabels: ["dossiers de rachat", "source fédérale", "temps de recherche moyen", "aperçu, sans inscription", "voitures · SUV · camions"],
    trustStatAllModels: "Tous les modèles",
    headlineStatLabels: ["Fenêtre de garantie de base", "Garantie groupe motopropulseur", "Comment c'est vendu aux US", "Société mère"],
    statsAtAGlance: (name: string) => `Garantie et fenêtre lemon law ${name} en un coup d'œil`,
    introHeading: (name: string) => `Ce que te révèle une vérification lemon law ${name}`,
    introBuybackPre: (name: string, parent: string) =>
      `Un "rachat" se produit quand ${parent} rachète un véhicule à son propriétaire d'origine parce qu'un défaut n'a pas pu être réparé après un nombre raisonnable de tentatives. La voiture est ensuite revendue — et son titre reçoit une marque du DMV de l'état. Une `,
    introVinLink: "vérification lemon law basée sur le VIN",
    introBuybackSuffix: (name: string) =>
      ` récupère cette marque depuis NMVTIS, le système fédéral de titres qui rassemble les dossiers de chaque DMV d'état, donc un rachat ${name} ne peut pas disparaître discrètement en déplaçant la voiture d'un état à un autre.`,
    basicsHeading: (name: string) => `Garantie et bases du rachat ${name}`,
    basicsIntro: (name: string) =>
      `L'éligibilité à la lemon law pour un ${name} est ancrée à la garantie d'origine d'usine. Voici ce qui définit la fenêtre — et comment un rachat est enregistré.`,
    coverageCard: "Couverture et éligibilité",
    basicWarrantyLabel: "Garantie de base",
    powertrainWarrantyLabel: "Garantie groupe motopropulseur",
    salesModelLabel: "Modèle de vente",
    brandedCard: "Comment un rachat est marqué",
    parentLabel: "Société mère",
    titleBrandsLabel: "Marques de titre",
    titleBrandsValue: "Manufacturer Buyback · Lemon Law Buyback · Reacquired Vehicle",
    nmvtisLabel: "Enregistré dans NMVTIS par le DMV de l'état",
    tipsHeading: (name: string) => `Quoi vérifier sur un ${name} d'occasion`,
    tipsIntro: (name: string) =>
      `Conseils spécifiques à la marque qui facilitent la détection d'un rachat ${name} avant de signer.`,
    howToHeading: (name: string) => `Comment vérifier la lemon law sur un ${name} — 6 étapes`,
    howToIntro:
      "Une vérification complète pré-achat lemon law prend environ 15 minutes entre ton bureau et le concessionnaire.",
    reputationHeading: (name: string) => `Est-ce qu'un ${name} est une "marque lemon" ?`,
    reputationP1Pre: 'Aucune marque n\'est une "marque lemon". Un rachat est un ',
    reputationP1BoldEvent: "événement par véhicule",
    reputationP1Suffix: (name: string, parent: string) =>
      `, pas un verdict sur chaque ${name} jamais construit. ${parent} produit des centaines de milliers d'unités sans problème, et même un modèle avec un grand nombre de plaintes a beaucoup plus de voitures qui roulent sans souci que de voitures problématiques.`,
    reputationP2Pre: "La source de données publique la plus crédible est la base de plaintes du ",
    reputationP2BoldNhtsa: "NHTSA Office of Defects Investigation",
    reputationP2Mid: ", consultable par année, marque et modèle. Les groupes élevés de plaintes pour le même système sont corrélés à une plus grande éligibilité à la lemon law — mais ils décrivent une année modèle, pas la voiture spécifique devant toi. C'est pourquoi une ",
    reputationP2Link: "vérification lemon law au niveau du VIN",
    reputationP2Suffix: (name: string) =>
      ` bat toujours la réputation de la marque : elle te renseigne sur l'unique ${name} que tu es sur le point d'acheter.`,
    midCtaHeading: (name: string) => `N'achète pas un rachat ${name} par erreur`,
    midCtaBody: (name: string) =>
      `Vérification lemon law ${name} gratuite et instantanée depuis NMVTIS et chaque DMV d'état. Sans carte. Sans inscription.`,
    othersHeading: "Vérifications lemon law pour d'autres marques",
    othersIntro: (name: string) =>
      `Les fenêtres de garantie et les schémas de rachat diffèrent selon le fabricant. Compare ${name} à ces guides de marque, ou parcours toutes les marques.`,
    otherCardTemplate: (name: string) => `Vérification lemon law ${name}`,
    allBrandsLink: "Vérification lemon law toutes marques",
    allBrandsSub: "Parcours chaque fabricant au même endroit.",
    byStateLink: "Lemon Law par état",
    byStateSub: "Seuils de tentatives de réparation pour les 50 états.",
    faqHeading: (name: string) => `FAQ — Vérification lemon law ${name}`,
    faqIntro: (name: string) =>
      `Les questions les plus recherchées sur les rachats ${name}, les fenêtres de garantie et la détection lemon basée sur le VIN.`,
    bottomBadge: (name: string) => `Gratuit · Instantané · ${name}`,
    bottomHeading: (name: string) => `Un VIN. Chaque marque de rachat ${name}. Cinq secondes.`,
    bottomBody: (name: string) =>
      `Un dossier de rachat fabricant suit le VIN en permanence, même quand le titre papier semble propre. Lance la vérification ${name} gratuite avant d'écrire un chèque.`,
    fullReportLink: "Ou obtiens le rapport d'historique VIN complet",
    faqBuilder(b: LemonBrand) {
      return [
        { q: `Comment vérifier si mon ${b.name} est un lemon ?`, a: `Saisis le VIN de 17 caractères dans la barre de recherche ci-dessus. Nous interrogeons NMVTIS et les sources nationales de titres pour tout rachat fabricant, rachat lemon law ou marque de retour sous garantie sur ce ${b.name} spécifique. Comme NMVTIS agrège les dossiers des 50 DMV d'état, un rachat enregistré dans un état apparaîtra encore même si la voiture a été re-titrée ailleurs ensuite.` },
        { q: `Quelle garantie accompagne un ${b.name}, et pourquoi est-ce important pour la lemon law ?`, a: `La couverture standard véhicule neuf de ${b.name} est ${b.basicWarranty} bumper-to-bumper avec une garantie groupe motopropulseur de ${b.powertrainWarranty}. C'est important parce que la plupart des lois lemon d'état ne s'appliquent qu'aux défauts apparus pendant la période de garantie d'origine du fabricant — donc la fenêtre de garantie définit effectivement la fenêtre d'éligibilité à la lemon law pour un ${b.name}.` },
        { q: `Comment s'appelle un titre de rachat ${b.name} ?`, a: `Les rachats ${b.name} portent les mêmes marques de titre que tout rachat fabricant — le plus souvent "Manufacturer Buyback" ou "Lemon Law Buyback", certains états utilisant "Reacquired Vehicle" ou "Warranty Return". La marque est émise par le DMV de l'état, pas par ${b.parent}, donc la formulation exacte dépend de l'état qui a racheté le véhicule en premier.` },
        { q: `Un rachat ${b.name} apparaît-il dans une vérification VIN ?`, a: `Oui, si le rachat a été signalé à NMVTIS. Un rachat "${b.name}" enregistré par n'importe quel DMV d'état devient partie du dossier fédéral de titre, que notre vérification récupère directement. ${b.angle}` },
        { q: `Combien de tentatives de réparation font qu'un ${b.name} est un lemon ?`, a: `Ça dépend de l'état, pas de la marque — la plupart des états exigent 3 ou 4 tentatives de réparation ratées pour le même défaut, ou 30 jours cumulés hors service, pendant la période de garantie. Une seule tentative de réparation ratée peut suffire pour un défaut de sécurité grave comme les freins ou la direction. Vérifie le seuil exact de ton état sur nos pages lemon law par état.` },
        { q: `Un ${b.name} est-il plus ou moins susceptible d'être un lemon que d'autres marques ?`, a: `Un rachat est un événement par véhicule, pas un verdict de marque. Chaque fabricant moderne, ${b.name} compris, construit des centaines de milliers de véhicules sans problème, et même un modèle avec beaucoup de plaintes a beaucoup plus d'unités qui roulent sans souci. C'est exactement pourquoi une vérification spécifique au VIN est plus utile que la réputation de la marque — elle te renseigne sur l'unique voiture que tu achètes.` },
        { q: `Que se passe-t-il si un vendeur ${b.name} ne m'a jamais dit que c'était un rachat ?`, a: `Si un vendeur a omis de divulguer une marque de rachat connue, tu peux avoir un recours sous la loi de ton état sur les pratiques commerciales trompeuses, la fraude de common-law ou le fédéral Magnuson-Moss Warranty Act. Garde le titre, l'annonce et chaque dossier de réparation, et consulte un avocat qualifié en protection du consommateur. Cette page est informative, pas un conseil juridique.` },
      ];
    },
    howToBuilder(b: LemonBrand) {
      return [
        { n: "01", icon: Search, title: "Lance le VIN", body: `Saisis le VIN de 17 caractères ci-dessus. Nous récupérons NMVTIS, les dossiers de titre du DMV et les données nationales d'enchères en moins de 5 secondes pour n'importe quel ${b.name}.` },
        { n: "02", icon: FileText, title: "Trouve la marque", body: `Scanne la section historique du titre pour une marque "Manufacturer Buyback", "Lemon Law Buyback" ou équivalent de rachat.` },
        { n: "03", icon: CalendarClock, title: "Vérifie la fenêtre", body: `La couverture ${b.name} dure ${b.basicWarranty} de base. Vois si l'historique des défauts tombe dans cette période.` },
        { n: "04", icon: Wrench, title: "Récupère les dossiers de service", body: `Demande l'historique des réparations sous garantie ${b.parent} par VIN et compte les visites pour le même défaut.` },
        { n: "05", icon: Building2, title: "Aligne avec les règles de l'état", body: `Les seuils lemon varient selon l'état. Ouvre la page lemon law de ton état pour le compte exact de tentatives de réparation.` },
        { n: "06", icon: ClipboardList, title: "Fais une PPI", body: `Fais inspecter la voiture par un mécanicien indépendant qui connaît ${b.name} et cible les systèmes signalés.` },
      ];
    },
  },
} as const;

const TRUST_ICONS = [Factory, Shield, Clock, BadgeCheck, Car] as const;

export default function LemonCheckBrandBody({
  makeSlug,
  locale = "en",
}: {
  makeSlug: string;
  locale?: Locale;
}) {
  const b = findLemonBrand(makeSlug);
  if (!b) return null;

  const copy = COPY[locale];
  const homeHref = locale === "es" ? "/es" : "/";
  const lemonHubHref = locale === "es" ? "/es/lemon-check" : "/lemon-check";
  const brandBaseHref = locale === "es" ? "/es/lemon-check/brand" : "/lemon-check/brand";
  const vinCheckHref = locale === "es" ? "/es/revision-vin" : "/vin-check";

  const others = getBrandOthers(makeSlug);

  const HEADLINE_STATS = [
    { value: b.basicWarranty, label: copy.headlineStatLabels[0] },
    { value: b.powertrainWarranty, label: copy.headlineStatLabels[1] },
    { value: b.salesModel, label: copy.headlineStatLabels[2] },
    { value: b.parent, label: copy.headlineStatLabels[3] },
  ];

  const TRUST_STATS = [
    { icon: TRUST_ICONS[0], value: b.name, label: copy.trustStatLabels[0] },
    { icon: TRUST_ICONS[1], value: "NMVTIS", label: copy.trustStatLabels[1] },
    { icon: TRUST_ICONS[2], value: "< 5 sec", label: copy.trustStatLabels[2] },
    { icon: TRUST_ICONS[3], value: "Free", label: copy.trustStatLabels[3] },
    { icon: TRUST_ICONS[4], value: copy.trustStatAllModels, label: copy.trustStatLabels[4] },
  ];

  const howToSteps = copy.howToBuilder(b);
  const faqs = copy.faqBuilder(b);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: copy.breadcrumbHome, href: homeHref },
              { label: copy.breadcrumbLemon, href: lemonHubHref },
              { label: copy.breadcrumbBrand, href: brandBaseHref },
              { label: b.name },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <AlertOctagon className="w-4 h-4" /> {copy.heroBadge(b.name)}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {copy.h1Lead(b.name)}{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>{copy.h1Accent}</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {copy.heroLead(b.name, b.basicWarranty, b.powertrainWarranty)}
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">{copy.searchHeading(b.name)}</h2>
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
                  <div className="text-sm sm:text-base font-headline font-black text-white">{st.value}</div>
                  <div className="text-[10px] sm:text-[11px] text-white/65 leading-tight mt-0.5">{st.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <section aria-labelledby="brand-stats-heading" className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10">
        <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
          <h2 id="brand-stats-heading" className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5">
            {copy.statsAtAGlance(b.name)}
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {HEADLINE_STATS.map((st) => (
              <div key={st.label} className="rounded-2xl bg-primary px-4 py-4 sm:py-5">
                <dt className="text-[11px] sm:text-xs text-white/75 leading-snug mb-1.5">{st.label}</dt>
                <dd className="font-headline font-bold text-base sm:text-lg text-white leading-tight">{st.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{copy.introHeading(b.name)}</h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>{b.blurb}</p>
            <p>{b.angle}</p>
            <p>
              {copy.introBuybackPre(b.name, b.parent)}
              <Link href={lemonHubHref} className="text-primary font-bold hover:underline">
                {copy.introVinLink}
              </Link>
              {copy.introBuybackSuffix(b.name)}
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.basicsHeading(b.name)}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">{copy.basicsIntro(b.name)}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h3 className="text-base font-headline font-extrabold text-primary">{copy.coverageCard}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li className="flex gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} /><span>{copy.basicWarrantyLabel}: {b.basicWarranty}</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} /><span>{copy.powertrainWarrantyLabel}: {b.powertrainWarranty}</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} /><span>{copy.salesModelLabel}: {b.salesModel}</span></li>
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-5 h-5 text-primary" />
                <h3 className="text-base font-headline font-extrabold text-primary">{copy.brandedCard}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li className="flex gap-2"><Building2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /><span>{copy.parentLabel}: {b.parent}</span></li>
                <li className="flex gap-2"><Tag className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /><span>{copy.titleBrandsLabel}: {copy.titleBrandsValue}</span></li>
                <li className="flex gap-2"><Shield className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /><span>{copy.nmvtisLabel}</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.tipsHeading(b.name)}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">{copy.tipsIntro(b.name)}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {b.tips.map((tip, i) => (
              <div key={i} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-sm font-black text-primary">{i + 1}</span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.howToHeading(b.name)}</h2>
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

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{copy.reputationHeading(b.name)}</h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              {copy.reputationP1Pre}
              <strong className="text-on-surface">{copy.reputationP1BoldEvent}</strong>
              {copy.reputationP1Suffix(b.name, b.parent)}
            </p>
            <p>
              {copy.reputationP2Pre}
              <strong className="text-on-surface">{copy.reputationP2BoldNhtsa}</strong>
              {copy.reputationP2Mid}
              <Link href={lemonHubHref} className="text-primary font-bold hover:underline">
                {copy.reputationP2Link}
              </Link>
              {copy.reputationP2Suffix(b.name)}
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <AlertOctagon className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{copy.midCtaHeading(b.name)}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{copy.midCtaBody(b.name)}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" locale={locale} />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.othersHeading}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">{copy.othersIntro(b.name)}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`${brandBaseHref}/${o.slug}`}
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Factory className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">{copy.otherCardTemplate(o.name)}</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">
                    {o.basicWarranty} basic · {o.parent}
                  </div>
                </div>
              </Link>
            ))}
            <Link href={brandBaseHref} className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <ScrollText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-primary group-hover:underline">{copy.allBrandsLink}</div>
                <div className="text-xs text-on-surface-variant mt-0.5">{copy.allBrandsSub}</div>
              </div>
            </Link>
            <Link href={lemonHubHref} className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <ChevronRight className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-primary group-hover:underline">{copy.byStateLink}</div>
                <div className="text-xs text-on-surface-variant mt-0.5">{copy.byStateSub}</div>
              </div>
            </Link>
          </div>
        </section>

        <section className="py-10">
          <VinCheckBanner />
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{copy.faqHeading(b.name)}</h2>
          <p className="text-sm text-on-surface-variant mb-8">{copy.faqIntro(b.name)}</p>
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

        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> {copy.bottomBadge(b.name)}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">{copy.bottomHeading(b.name)}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">{copy.bottomBody(b.name)}</p>
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
