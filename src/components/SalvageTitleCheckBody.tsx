/**
 * Shared body for /salvage-title-check and /es/salvage-title-check.
 * Wave 18a — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Check, Shield, ShieldX, Search, FileText, Database, ChevronRight,
  Lock, Zap, BadgeCheck, Sparkles, AlertTriangle, Droplets, Flame,
  Ban, Wrench, Gauge, ClipboardCheck, DollarSign, Car,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [Search, Database, FileText] as const;
const BRAND_ICONS = [AlertTriangle, Wrench, Droplets, Ban, ShieldX, Flame] as const;
const RISK_ICONS = [DollarSign, Shield, FileText, AlertTriangle] as const;
const WHY_ICONS = [DollarSign, Car, BadgeCheck] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Salvage Title Check",
    badge: "Branded-Title Lookup   ·   NMVTIS-Backed",
    h1Lead: "Salvage Title Check by VIN — ",
    h1Accent: "Is the Title Really Clean?",
    intro: "A salvage title means an insurer already declared the vehicle a total loss — and that status follows the VIN forever, even after repairs. Some sellers won't volunteer it, and title washing can scrub it off the paper title. Enter a 17-character VIN to check NMVTIS and all 50 state DMV records — free, before you buy.",
    formHeading: "Run a Salvage Title Check by VIN",
    formSub: "Enter any 17-character VIN — we'll surface any salvage, rebuilt, flood, junk, or lemon brand on record",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { icon: Database, value: "NMVTIS", label: "DOJ-backed data" },
      { icon: Shield, value: "50 states", label: "DMV brand files" },
      { icon: BadgeCheck, value: "Permanent", label: "VIN-tied history" },
      { icon: Zap, value: "Free", label: "no sign-up" },
    ],
    h2How: "How a VIN Salvage Title Check Works",
    howIntro: "Title brands are tracked against the VIN by NMVTIS and every state DMV. Three steps turn that into a clear picture of whether the title is truly clean.",
    howSteps: [
      { tag: "Step 1", title: "Enter the VIN", body: "Type the 17-character VIN from the dashboard, door jamb, title, or registration. Title brands are tied to the VIN — not the paper document a seller hands you." },
      { tag: "Step 2", title: "We query NMVTIS + 50 states", body: "The lookup cross-references NMVTIS, every state DMV title-brand file, and insurance total-loss feeds — the same records that title washing in a single state can't erase." },
      { tag: "Step 3", title: "Read every brand on record", body: "See any salvage, rebuilt, flood, junk, or lemon brand ever reported. A brand that appears here but not on the paper title is a major red flag." },
    ],
    h2What: "What Does a Salvage Title Actually Mean?",
    what1Pre: "A salvage title is a state-issued title brand applied to a vehicle an insurer has determined is uneconomical to repair. This typically happens when repair costs exceed a percentage of the car's ",
    what1Bold: "pre-loss market value",
    what1Suffix: " — a threshold that ranges from roughly 50% in some states to 100% in others.",
    what2: "Once applied, the brand can't be erased. Even after a full rebuild and a passed inspection, the title moves from \"salvage\" to \"rebuilt\" or \"reconstructed\" — it never reverts to clean. The VIN carries that history through every future sale, which is why a VIN check is far more reliable than the paperwork a seller hands you.",
    what3: "Salvage vehicles have legitimate uses — parts cars, track-day builds, budget transportation — when the buyer fully understands what they're getting. The danger is buying one unknowingly, either through deception or because the car was washed through a state with weaker title laws.",
    exampleTitle: "Worked example — total-loss math",
    exampleRows: [
      { label: "Pre-loss value", value: "$20,000" },
      { label: "Estimated repair", value: "$15,000" },
      { label: "Repair ratio", value: "75% → totaled" },
    ],
    exampleNote: "At 75% the car clears a typical 70–80% total-loss threshold, so the insurer brands it salvage. Thresholds vary by state — this is an illustration, not a rule for any specific car.",
    h2Brands: "The Major Title Brands You Should Know",
    brandsIntro: "\"Branded title\" is the umbrella term for any title that carries a non-clean designation. Each brand tells a different story about what happened to the vehicle.",
    brands: [
      { title: "Salvage", body: "Declared a total loss by an insurer — not road-legal until repaired and re-inspected. The starting point for most branded titles." },
      { title: "Rebuilt / Reconstructed", body: "Previously salvage, now repaired and inspected for road use. The title never reverts to clean, and resale value drops significantly." },
      { title: "Flood / Water damage", body: "Submerged or significantly water-damaged. Long-term electrical, corrosion, and mold problems are nearly guaranteed and surface for years." },
      { title: "Junk / Non-repairable", body: "Legally cannot be retitled for road use — suitable only for parts or scrap. A junk brand should never appear on a car offered for the road." },
      { title: "Lemon / Manufacturer buyback", body: "Repurchased by the manufacturer due to chronic, unfixable defects under state lemon laws. Covered in depth on our lemon check page." },
      { title: "Hail / Fire / Vandalism", body: "Cause-of-loss brands used in some states to flag specific damage events — useful context even when repairs were completed." },
    ],
    brandsNoteBoldLead: "Looking specifically for a buyback?",
    brandsNoteMid: " Manufacturer lemon and buyback history gets its own dedicated coverage on our ",
    brandsNoteLink: "lemon check by VIN",
    brandsNoteSuffix: " page.",
    midCtaHeading: "Is This Specific Car Branded?",
    midCtaSub: "Don't rely on the paper title — it can be washed clean. Run the VIN against NMVTIS and all 50 states to see every brand on record, free, in seconds.",
    h2Risks: "The Real Risks of Buying a Salvage or Rebuilt Vehicle",
    risksIntro: "Even a well-rebuilt salvage vehicle carries financial and safety risks you simply don't have with a clean-title car. Weigh these carefully before signing anything.",
    risks: [
      { title: "Resale value drops 20–40%", body: "A branded title cuts market value sharply versus an equivalent clean-title car, and the brand follows the VIN forever." },
      { title: "Insurance is harder to get", body: "Many carriers offer liability-only coverage on rebuilt titles and decline comprehensive or collision entirely." },
      { title: "Financing is limited", body: "Most banks and credit unions won't write a loan on a branded title, so buyers often need cash or a specialty lender." },
      { title: "Hidden structural damage", body: "Prior frame or unibody damage can compromise airbag deployment, crumple-zone performance, and overall crashworthiness." },
    ],
    risksNoteBoldLead: "Flood damage is the worst case.",
    risksNoteMid: " Corroded electronics, mildew, ECU failures, and airbag-sensor problems can surface years later. If a brand traces back to water, run a dedicated ",
    risksNoteLink: "flood damage check",
    risksNoteSuffix: " before you buy.",
    h2Compare: "Salvage vs. Rebuilt vs. Clean — At a Glance",
    compareIntro: "These three title statuses carry very different rights, risks, and resale outcomes. Knowing which you're looking at is essential before you negotiate.",
    cleanTag: "Clean", cleanTitle: "No brand on record",
    cleanBullets: ["Never declared a total loss in any state.", "Full insurance and financing options.", "Still verify by VIN — washing can fake it."],
    rebuiltTag: "Rebuilt", rebuiltTitle: "Repaired & inspected",
    rebuiltBullets: ["Was salvage; repaired and passed state inspection.", "Often liability-only insurance, limited financing.", "Demand repair docs and an independent inspection."],
    salvageTag: "Salvage", salvageTitle: "Total loss, unrepaired",
    salvageBullets: ["Not legal to drive until rebuilt and re-inspected.", "Generally can't be insured for road use as-is.", "For parts, projects, or rebuild — eyes wide open."],
    h2Washing: "Title Washing — And Why a VIN Check Defeats It",
    washing1Pre: "Title washing is moving a branded vehicle to a state with weaker title laws and re-registering it to obtain a clean-looking title. The paper may read ",
    washing1Bold: "\"clean,\"",
    washing1Suffix: " but the underlying VIN history still records every brand ever applied, in any state.",
    washing2: "That's exactly why a VIN-based salvage check — pulling from NMVTIS and all 50 state DMV records — is so much more trustworthy than the title document itself. The brand follows the VIN; the paperwork can be swapped.",
    washing3: "NMVTIS, the National Motor Vehicle Title Information System, is operated by the U.S. Department of Justice. Every state DMV and every insurance auto auction is required to report to it — so the database catches brands that were scrubbed off the paper title in another state.",
    inspectCardTitle: "Inspect-before-you-buy checklist",
    inspectChecklist: [
      "Run the VIN against NMVTIS before you meet the seller",
      "Match the VIN on the dash, door jamb, and title — all three",
      "Watch for fresh paint, mismatched panels, or weld marks",
      "Check carpets and seat mounts for rust, silt, or a musty smell",
      "Demand repair invoices and the state re-inspection certificate",
      "Get an independent pre-purchase inspection before paying",
    ],
    inspectCardCta: "Start with the VIN — check the brand history first:",
    h2Why: "Why a Salvage Check Matters Before You Buy",
    whyIntro: "A title brand tied to the VIN directly shapes what a used car is worth — and how much hidden risk you take on as the next owner.",
    whyCards: [
      { title: "Protect your money", body: "A branded title can slash resale value 20–40%. Knowing before you negotiate keeps you from overpaying for a damaged history." },
      { title: "Protect your safety", body: "Hidden structural or flood damage can compromise airbags and crash performance. The brand is your first warning to inspect harder." },
      { title: "Verify, don't trust", body: "Sellers may not disclose a brand, and washing can hide it. The VIN history — not the paper title — is the only reliable proof." },
    ],
    h2Internal: "More VIN Checks That Pair With a Salvage Check",
    internalIntro: "Title brands are one piece of the puzzle. These checks complete the picture before you buy.",
    internalLinks: [
      { href: "/total-loss-check", label: "Total Loss Check", desc: "See whether an insurer ever declared the vehicle a total loss — the event that triggers a salvage brand." },
      { href: "/flood-check", label: "Flood Damage Check", desc: "Flood is one of the most damaging — and most hidden — reasons a car ends up branded." },
      { href: "/accident-history-check", label: "Accident History Check", desc: "Reported collisions and damage severity that may have led to a total-loss decision." },
      { href: "/odometer-check", label: "Odometer Check", desc: "Branded and rebuilt cars are common targets for rollback — verify the mileage too." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title brands, accidents, odometer, theft, and recall records in one complete report." },
      { href: "/lemon-check", label: "Lemon Check", desc: "Dig deeper into manufacturer buybacks and chronic-defect history by VIN." },
    ],
    h2Faq: "Salvage Title Check — Frequently Asked Questions",
    faqIntro: "The questions buyers ask most about salvage, rebuilt, and branded titles.",
    bottomBadge: "Free · Instant · NMVTIS-Backed",
    ctaBottomHeading: "Check for a Salvage or Branded Title Now",
    ctaBottomSub: "Enter a 17-character VIN to instantly check NMVTIS and all 50 state DMV title-brand records for salvage, rebuilt, flood, junk, and lemon history.",
    ctaBottomNote: "No credit card · No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "Verificación título salvamento",
    badge: "Búsqueda de título marcado   ·   Respaldado por NMVTIS",
    h1Lead: "Verificación de título de salvamento por VIN — ",
    h1Accent: "¿El título realmente está limpio?",
    intro: "Un título de salvamento significa que una aseguradora ya declaró el vehículo pérdida total — y ese estado sigue al VIN para siempre, incluso después de reparaciones. Algunos vendedores no lo declararán voluntariamente, y el lavado de título puede borrarlo del título físico. Ingresa un VIN de 17 caracteres para verificar NMVTIS y los 50 registros de DMV estatales — gratis, antes de comprar.",
    formHeading: "Haz una verificación de título de salvamento por VIN",
    formSub: "Ingresa cualquier VIN de 17 caracteres — mostraremos cualquier marca de salvamento, reconstruido, inundación, chatarra o limón en archivo",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { icon: Database, value: "NMVTIS", label: "datos respaldados por DOJ" },
      { icon: Shield, value: "50 estados", label: "archivos de marcas DMV" },
      { icon: BadgeCheck, value: "Permanente", label: "historial vinculado al VIN" },
      { icon: Zap, value: "Gratis", label: "sin registro" },
    ],
    h2How: "Cómo funciona una verificación VIN de título de salvamento",
    howIntro: "Las marcas de título son rastreadas contra el VIN por NMVTIS y cada DMV estatal. Tres pasos convierten eso en una imagen clara de si el título realmente está limpio.",
    howSteps: [
      { tag: "Paso 1", title: "Ingresa el VIN", body: "Escribe el VIN de 17 caracteres del tablero, marco de puerta, título o registro. Las marcas de título están vinculadas al VIN — no al documento físico que un vendedor te entrega." },
      { tag: "Paso 2", title: "Consultamos NMVTIS + 50 estados", body: "La búsqueda cruza NMVTIS, cada archivo de marca de título de DMV estatal y feeds de pérdida total de aseguradoras — los mismos registros que el lavado de título en un solo estado no puede borrar." },
      { tag: "Paso 3", title: "Lee cada marca en archivo", body: "Ve cualquier marca de salvamento, reconstruido, inundación, chatarra o limón reportada. Una marca que aparece aquí pero no en el título físico es una bandera roja importante." },
    ],
    h2What: "¿Qué significa realmente un título de salvamento?",
    what1Pre: "Un título de salvamento es una marca de título emitida por el estado aplicada a un vehículo que una aseguradora ha determinado que no es económico reparar. Esto típicamente ocurre cuando los costos de reparación exceden un porcentaje del ",
    what1Bold: "valor de mercado pre-pérdida",
    what1Suffix: " del auto — un umbral que va desde aproximadamente 50% en algunos estados hasta 100% en otros.",
    what2: "Una vez aplicada, la marca no puede borrarse. Incluso después de una reconstrucción completa y una inspección aprobada, el título pasa de \"salvamento\" a \"reconstruido\" o \"reconstituido\" — nunca vuelve a limpio. El VIN lleva esa historia a través de cada venta futura, por lo que una verificación VIN es mucho más confiable que el papel que te entrega un vendedor.",
    what3: "Los vehículos de salvamento tienen usos legítimos — autos para partes, construcciones para pista, transporte económico — cuando el comprador entiende completamente lo que está obteniendo. El peligro es comprar uno sin saberlo, ya sea por engaño o porque el auto fue lavado a través de un estado con leyes de título más débiles.",
    exampleTitle: "Ejemplo trabajado — matemática de pérdida total",
    exampleRows: [
      { label: "Valor pre-pérdida", value: "$20,000" },
      { label: "Reparación estimada", value: "$15,000" },
      { label: "Ratio de reparación", value: "75% → pérdida total" },
    ],
    exampleNote: "Al 75% el auto supera un umbral típico de pérdida total de 70-80%, así que la aseguradora lo marca como salvamento. Los umbrales varían por estado — esto es una ilustración, no una regla para ningún auto específico.",
    h2Brands: "Las principales marcas de título que debes conocer",
    brandsIntro: "\"Título marcado\" es el término general para cualquier título que lleva una designación no limpia. Cada marca cuenta una historia diferente sobre lo que le pasó al vehículo.",
    brands: [
      { title: "Salvamento", body: "Declarado pérdida total por una aseguradora — no es legal para la calle hasta que se repare y se vuelva a inspeccionar. El punto de partida para la mayoría de los títulos marcados." },
      { title: "Reconstruido / Reconstituido", body: "Anteriormente salvamento, ahora reparado e inspeccionado para uso vial. El título nunca vuelve a limpio, y el valor de reventa cae significativamente." },
      { title: "Inundación / Daño por agua", body: "Sumergido o significativamente dañado por agua. Problemas a largo plazo eléctricos, de corrosión y moho son casi garantizados y aparecen durante años." },
      { title: "Chatarra / No reparable", body: "Legalmente no puede re-titularse para uso vial — adecuado solo para partes o chatarra. Una marca de chatarra nunca debería aparecer en un auto ofrecido para la calle." },
      { title: "Limón / Recompra por fabricante", body: "Recomprado por el fabricante debido a defectos crónicos no reparables bajo leyes estatales de limones. Cubierto en profundidad en nuestra página de verificación de limones." },
      { title: "Granizo / Fuego / Vandalismo", body: "Marcas de causa de pérdida usadas en algunos estados para señalar eventos específicos de daño — contexto útil incluso cuando se completaron las reparaciones." },
    ],
    brandsNoteBoldLead: "¿Buscas específicamente una recompra?",
    brandsNoteMid: " El historial de limón y recompra por fabricante tiene su propia cobertura dedicada en nuestra página de ",
    brandsNoteLink: "verificación de limones por VIN",
    brandsNoteSuffix: ".",
    midCtaHeading: "¿Este auto específico está marcado?",
    midCtaSub: "No te bases en el título físico — puede lavarse limpio. Ejecuta el VIN contra NMVTIS y los 50 estados para ver cada marca en archivo, gratis, en segundos.",
    h2Risks: "Los riesgos reales de comprar un vehículo de salvamento o reconstruido",
    risksIntro: "Incluso un vehículo de salvamento bien reconstruido lleva riesgos financieros y de seguridad que simplemente no tienes con un auto de título limpio. Pesa estos cuidadosamente antes de firmar algo.",
    risks: [
      { title: "El valor de reventa cae 20-40%", body: "Un título marcado reduce drásticamente el valor de mercado frente a un auto equivalente con título limpio, y la marca sigue al VIN para siempre." },
      { title: "El seguro es más difícil de obtener", body: "Muchas aseguradoras ofrecen solo cobertura de responsabilidad en títulos reconstruidos y rechazan amplia o colisión por completo." },
      { title: "El financiamiento es limitado", body: "La mayoría de los bancos y cooperativas no otorgan un préstamo sobre un título marcado, así que los compradores a menudo necesitan efectivo o un prestamista especializado." },
      { title: "Daño estructural oculto", body: "Daño previo al chasis o unibody puede comprometer el despliegue de bolsas de aire, el rendimiento de zonas de deformación y la capacidad general de absorción de choques." },
    ],
    risksNoteBoldLead: "El daño por inundación es el peor caso.",
    risksNoteMid: " Electrónicos corroídos, moho, fallas de ECU y problemas de sensores de bolsa de aire pueden aparecer años después. Si una marca se rastrea hasta agua, ejecuta una ",
    risksNoteLink: "verificación de daño por inundación",
    risksNoteSuffix: " dedicada antes de comprar.",
    h2Compare: "Salvamento vs. Reconstruido vs. Limpio — De un vistazo",
    compareIntro: "Estos tres estados de título conllevan derechos, riesgos y resultados de reventa muy diferentes. Saber cuál estás viendo es esencial antes de negociar.",
    cleanTag: "Limpio", cleanTitle: "Sin marca en archivo",
    cleanBullets: ["Nunca declarado pérdida total en ningún estado.", "Opciones completas de seguro y financiamiento.", "Aún verifica por VIN — el lavado puede falsificarlo."],
    rebuiltTag: "Reconstruido", rebuiltTitle: "Reparado e inspeccionado",
    rebuiltBullets: ["Era salvamento; reparado y aprobó inspección estatal.", "A menudo seguro solo de responsabilidad, financiamiento limitado.", "Exige documentos de reparación y una inspección independiente."],
    salvageTag: "Salvamento", salvageTitle: "Pérdida total, sin reparar",
    salvageBullets: ["No es legal conducir hasta que se reconstruya y se vuelva a inspeccionar.", "Generalmente no se puede asegurar para uso vial tal como está.", "Para partes, proyectos o reconstrucción — con los ojos bien abiertos."],
    h2Washing: "Lavado de título — Y por qué una verificación VIN lo derrota",
    washing1Pre: "El lavado de título es mover un vehículo marcado a un estado con leyes de título más débiles y re-registrarlo para obtener un título de apariencia limpia. El papel puede leer ",
    washing1Bold: "\"limpio,\"",
    washing1Suffix: " pero el historial subyacente del VIN todavía registra cada marca alguna vez aplicada, en cualquier estado.",
    washing2: "Por eso una verificación de salvamento basada en VIN — extrayendo de NMVTIS y los 50 registros DMV estatales — es mucho más confiable que el documento del título en sí. La marca sigue al VIN; el papeleo puede cambiarse.",
    washing3: "NMVTIS, el Sistema Nacional de Información de Títulos de Vehículos Motorizados, es operado por el Departamento de Justicia de EE. UU. Cada DMV estatal y cada subasta de autos de aseguradoras están obligados a reportar a él — así que la base de datos atrapa marcas que fueron borradas del título físico en otro estado.",
    inspectCardTitle: "Lista de inspección antes-de-comprar",
    inspectChecklist: [
      "Ejecuta el VIN contra NMVTIS antes de encontrarte con el vendedor",
      "Coincide el VIN en el tablero, marco de puerta y título — los tres",
      "Vigila pintura fresca, paneles que no coinciden o marcas de soldadura",
      "Verifica alfombras y monturas de asientos por óxido, sedimento o olor a moho",
      "Exige facturas de reparación y el certificado estatal de re-inspección",
      "Obtén una inspección independiente previa a la compra antes de pagar",
    ],
    inspectCardCta: "Comienza con el VIN — verifica el historial de marcas primero:",
    h2Why: "Por qué una verificación de salvamento importa antes de comprar",
    whyIntro: "Una marca de título vinculada al VIN moldea directamente cuánto vale un auto usado — y cuánto riesgo oculto tomas como próximo propietario.",
    whyCards: [
      { title: "Protege tu dinero", body: "Un título marcado puede reducir el valor de reventa 20-40%. Saberlo antes de negociar te evita pagar de más por un historial dañado." },
      { title: "Protege tu seguridad", body: "Daño estructural oculto o por inundación puede comprometer bolsas de aire y rendimiento en choques. La marca es tu primera advertencia para inspeccionar más a fondo." },
      { title: "Verifica, no confíes", body: "Los vendedores pueden no divulgar una marca, y el lavado puede ocultarla. El historial VIN — no el título físico — es la única prueba confiable." },
    ],
    h2Internal: "Más verificaciones VIN que se combinan con una verificación de salvamento",
    internalIntro: "Las marcas de título son una pieza del rompecabezas. Estas verificaciones completan la imagen antes de comprar.",
    internalLinks: [
      { href: "/total-loss-check", label: "Verificación pérdida total", desc: "Mira si una aseguradora alguna vez declaró el vehículo pérdida total — el evento que dispara una marca de salvamento." },
      { href: "/flood-check", label: "Verificación daño por inundación", desc: "La inundación es una de las razones más dañinas — y más ocultas — por las que un auto termina marcado." },
      { href: "/accident-history-check", label: "Verificación historial accidentes", desc: "Colisiones reportadas y gravedad de daño que pueden haber llevado a una decisión de pérdida total." },
      { href: "/odometer-check", label: "Verificación odómetro", desc: "Autos marcados y reconstruidos son blancos comunes de rollback — verifica el kilometraje también." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Marcas de título, accidentes, odómetro, robos y registros de recalls en un reporte completo." },
      { href: "/lemon-check", label: "Verificación de limones", desc: "Profundiza en recompras del fabricante e historial de defectos crónicos por VIN." },
    ],
    h2Faq: "Verificación título salvamento — Preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen los compradores sobre títulos de salvamento, reconstruidos y marcados.",
    bottomBadge: "Gratis · Instantáneo · Respaldado por NMVTIS",
    ctaBottomHeading: "Verifica un título de salvamento o marcado ahora",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres para verificar al instante NMVTIS y los 50 registros DMV estatales de marca de título por historial de salvamento, reconstruido, inundación, chatarra y limón.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Gratis",
  },
} as const;

const FAQS_EN = [
  { question: "What is a salvage title?", answer: "A salvage title is a state-issued title brand applied when an insurance company declares a vehicle a total loss — usually because the cost to repair it exceeds a state-defined percentage of its pre-loss value, often around 70–80% (the exact threshold varies by state). The brand can result from a collision, flood, fire, theft recovery, or hail. Once applied, the salvage brand stays attached to the VIN permanently." },
  { question: "How do I check if a car has a salvage title by VIN?", answer: "Enter the 17-character VIN into the search box on this page. The report cross-references NMVTIS, state DMV title-brand files, and major insurance total-loss feeds to surface any salvage, rebuilt, flood, or junk brand. Because the history is tied to the VIN rather than the paper title, a VIN check reveals brands even when the current document looks clean." },
  { question: "What is the difference between a salvage title and a rebuilt title?", answer: "A salvage title means the vehicle was declared a total loss and is not legal to drive on public roads until it is repaired. A rebuilt or reconstructed title is issued after a salvage vehicle is repaired and passes a state inspection that confirms it is roadworthy. The title never reverts to clean — a rebuilt brand permanently signals the vehicle's prior salvage history." },
  { question: "Can you insure or finance a salvage-title car?", answer: "It is limited. A pure salvage car generally cannot be insured for road use until it is rebuilt and re-inspected. On rebuilt titles, many carriers offer liability-only coverage and decline comprehensive or collision. Financing is also restricted — most banks and credit unions will not write a loan on a branded title, so buyers often need to pay cash or use a specialty lender." },
  { question: "Is it safe to buy a salvage-title car?", answer: "It can be, but the risk is higher than with a clean title. A well-documented, professionally rebuilt vehicle that passed inspection may be sound, but hidden structural damage can compromise airbag deployment and crash performance. Before buying, get an independent pre-purchase inspection, review repair documentation, and confirm the brand history with a VIN check. Expect a lower resale value and tighter insurance and financing options." },
  { question: "How does a car get a salvage title?", answer: "A car typically gets a salvage title when an insurer determines it is a total loss — meaning estimated repair costs exceed a state-set percentage of the vehicle's pre-loss market value, often around 70–80% though the threshold varies by state. The triggering event can be a collision, flood, fire, hail, or theft recovery. The insurer reports the total loss, and the state issues the salvage brand." },
  { question: "What is title washing, and does NMVTIS show salvage brands?", answer: "Title washing is moving a branded vehicle to a state with weaker title laws and re-registering it to obtain a clean-looking title. NMVTIS — the National Motor Vehicle Title Information System, run by the U.S. Department of Justice — counters this by aggregating brands reported by all 50 state DMVs, insurers, and salvage and junk reporters. Because it pulls from every state, NMVTIS surfaces salvage brands that washing tries to hide." },
];

const FAQS_ES = [
  { question: "¿Qué es un título de salvamento?", answer: "Un título de salvamento es una marca de título emitida por el estado aplicada cuando una compañía de seguros declara un vehículo pérdida total — usualmente porque el costo de repararlo excede un porcentaje definido por el estado de su valor pre-pérdida, a menudo alrededor de 70-80% (el umbral exacto varía por estado). La marca puede resultar de una colisión, inundación, fuego, recuperación de robo o granizo. Una vez aplicada, la marca de salvamento permanece adjunta al VIN permanentemente." },
  { question: "¿Cómo verifico si un auto tiene título de salvamento por VIN?", answer: "Ingresa el VIN de 17 caracteres en el cuadro de búsqueda en esta página. El reporte cruza NMVTIS, archivos de marca de título de DMV estatales y feeds principales de pérdida total de aseguradoras para mostrar cualquier marca de salvamento, reconstruido, inundación o chatarra. Como el historial está vinculado al VIN y no al título físico, una verificación VIN revela marcas incluso cuando el documento actual se ve limpio." },
  { question: "¿Cuál es la diferencia entre un título de salvamento y uno reconstruido?", answer: "Un título de salvamento significa que el vehículo fue declarado pérdida total y no es legal conducirlo en vías públicas hasta que se repare. Un título reconstruido o reconstituido se emite después de que un vehículo de salvamento se repara y pasa una inspección estatal que confirma que es apto para la vía. El título nunca vuelve a limpio — una marca de reconstruido señala permanentemente el historial previo de salvamento del vehículo." },
  { question: "¿Puedes asegurar o financiar un auto de título de salvamento?", answer: "Es limitado. Un auto de salvamento puro generalmente no puede asegurarse para uso vial hasta que se reconstruya y se vuelva a inspeccionar. En títulos reconstruidos, muchas aseguradoras ofrecen solo cobertura de responsabilidad y rechazan amplia o colisión. El financiamiento también está restringido — la mayoría de los bancos y cooperativas no otorgarán un préstamo sobre un título marcado, así que los compradores a menudo necesitan pagar en efectivo o usar un prestamista especializado." },
  { question: "¿Es seguro comprar un auto de título de salvamento?", answer: "Puede serlo, pero el riesgo es mayor que con un título limpio. Un vehículo bien documentado, profesionalmente reconstruido que pasó la inspección puede ser sólido, pero daño estructural oculto puede comprometer el despliegue de bolsas de aire y el rendimiento en choques. Antes de comprar, obtén una inspección independiente previa a la compra, revisa la documentación de reparación y confirma el historial de marcas con una verificación VIN. Espera un valor de reventa menor y opciones más estrictas de seguro y financiamiento." },
  { question: "¿Cómo obtiene un auto un título de salvamento?", answer: "Un auto típicamente obtiene un título de salvamento cuando una aseguradora determina que es pérdida total — significando que los costos estimados de reparación exceden un porcentaje establecido por el estado del valor de mercado pre-pérdida del vehículo, a menudo alrededor de 70-80% aunque el umbral varía por estado. El evento desencadenante puede ser una colisión, inundación, fuego, granizo o recuperación de robo. La aseguradora reporta la pérdida total, y el estado emite la marca de salvamento." },
  { question: "¿Qué es el lavado de título, y NMVTIS muestra marcas de salvamento?", answer: "El lavado de título es mover un vehículo marcado a un estado con leyes de título más débiles y re-registrarlo para obtener un título de apariencia limpia. NMVTIS — el Sistema Nacional de Información de Títulos de Vehículos Motorizados, operado por el Departamento de Justicia de EE. UU. — contrarresta esto agregando marcas reportadas por los 50 DMV estatales, aseguradoras y reportadores de salvamento y chatarra. Como extrae de cada estado, NMVTIS muestra marcas de salvamento que el lavado intenta ocultar." },
];

interface Props { locale: Locale; }

export default function SalvageTitleCheckBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <ShieldX className="w-4 h-4" /> {c.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>
          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">{c.intro}</p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">{c.formHeading}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{c.formSub}</p>
            <VinSearchForm size="lg" />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {c.formNote}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {c.trustStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                  <div className="text-xl sm:text-2xl font-headline font-black text-white">{s.value}</div>
                  <div className="text-[11px] text-white/65 leading-tight mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2How}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.howIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.howSteps.map((m, i) => {
              const Icon = HOW_ICONS[i];
              return (
                <div key={m.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">{m.tag}</div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{m.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2What}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.what1Pre}
                <strong className="text-on-surface">{c.what1Bold}</strong>
                {c.what1Suffix}
              </p>
              <p>{c.what2}</p>
              <p>{c.what3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Gauge className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.exampleTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.exampleRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.exampleNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Brands}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.brandsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.brands.map((b, i) => {
              const Icon = BRAND_ICONS[i];
              return (
                <div key={b.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{b.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{b.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <ShieldX className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.brandsNoteBoldLead}</strong>
                {c.brandsNoteMid}
                <Link href={link("/lemon-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.brandsNoteLink}</Link>
                {c.brandsNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Risks}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.risksIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.risks.map((r, i) => {
              const Icon = RISK_ICONS[i];
              return (
                <div key={r.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{r.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{r.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.risksNoteBoldLead}</strong>
                {c.risksNoteMid}
                <Link href={link("/flood-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.risksNoteLink}</Link>
                {c.risksNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Compare}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.compareIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">{c.cleanTag}</div>
              <p className="text-lg font-headline font-extrabold text-primary mb-3">{c.cleanTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.cleanBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.rebuiltTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.rebuiltTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.rebuiltBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.salvageTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.salvageTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.salvageBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Washing}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.washing1Pre}
                <strong className="text-on-surface">{c.washing1Bold}</strong>
                {c.washing1Suffix}
              </p>
              <p>{c.washing2}</p>
              <p>{c.washing3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.inspectCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.inspectChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.inspectCardCta}</p>
                <VinSearchForm size="sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Why}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.whyIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.whyCards.map((item, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Internal}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">{c.internalIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {c.internalLinks.map((l) => (
              <Link key={l.href} href={link(l.href)} className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">{l.label}</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{l.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-10">
          <VinCheckBanner />
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Faq}</h2>
          <p className="text-sm text-on-surface-variant mb-8">{c.faqIntro}</p>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.question} className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">{f.question}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> {c.bottomBadge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">{c.ctaBottomHeading}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">{c.ctaBottomSub}</p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            {c.ctaBottomNote}
          </div>
        </section>

        <RelatedChecks exclude="/salvage-title-check" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES };
