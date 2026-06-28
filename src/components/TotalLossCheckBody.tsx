/**
 * Shared body for /total-loss-check and /es/total-loss-check.
 * Wave 18 batch 3 — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, ShieldAlert, Search, FileText, Database, Calculator,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Car, Droplet, Flame,
  CloudHail, KeyRound, DollarSign, Gauge, ClipboardCheck, AlertTriangle,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [Search, Database, FileText] as const;
const CAUSE_ICONS = [Car, Droplet, Flame, CloudHail, KeyRound, AlertTriangle] as const;
const WHY_ICONS = [DollarSign, Shield, Gauge] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Total Loss Check",
    badge: "Insurance Write-Off Lookup   ·   NMVTIS-Sourced",
    h1Lead: "Total Loss Check by VIN — ",
    h1Accent: "Was This Car Totaled?",
    intro: "A car declared a total loss was damaged badly enough that an insurer chose to write it off instead of repairing it. Many are rebuilt and resold with no obvious signs. Enter a 17-character VIN to surface insurance total-loss records, salvage and rebuilt brands, and structural damage history — free, before you buy.",
    formHeading: "Check for Total Loss History by VIN",
    formSub: "Enter any 17-character VIN — we'll check for total-loss declarations, write-off records, and branded titles",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { icon: Database, value: "50-state", label: "NMVTIS sources" },
      { icon: Calculator, value: "60–100%", label: "total-loss threshold" },
      { icon: Shield, value: "30 days", label: "insurer reporting window" },
      { icon: BadgeCheck, value: "Free", label: "no sign-up" },
    ],
    h2How: "How a VIN Total Loss Check Works",
    howIntro: "A total loss is an insurance decision that follows the car's VIN for life. Three steps turn that record into a clear answer before you put money down.",
    howSteps: [
      { tag: "Step 1", title: "Enter the VIN", body: "Type the 17-character VIN from the dashboard, door jamb, title, or insurance card. The check is keyed to the VIN, so a prior total loss surfaces even after a rebuild or an out-of-state re-title." },
      { tag: "Step 2", title: "We query the loss record", body: "The lookup pulls from NMVTIS — which aggregates all 50 state DMVs, insurers, and salvage auctions — for total-loss declarations, salvage and rebuilt brands, and structural damage events." },
      { tag: "Step 3", title: "Read the verdict", body: "See whether the car carries an insurance total-loss record or a branded title — and decide whether it needs a structural inspection before you put money down." },
    ],
    h2What: "What Makes a Car a Total Loss",
    whatIntro: "Insurers declare a total loss when the cost to repair crosses a threshold percentage of the vehicle's pre-accident actual cash value (ACV). That threshold — and the formula behind it — varies by state.",
    whatParas: [
      { pre: "The total-loss threshold ranges from roughly ", bold: "60% to 100% of ACV", suffix: " depending on the jurisdiction. Some states fix a flat percentage; others use a total-loss formula that compares repair cost plus salvage value against the car's value." },
      { plain: "The math often includes the anticipated diminished value after repair. Vehicles with frame damage, airbag deployment, or flood exposure are almost always totaled, because modern unibody structural repair is costly and the liability of returning a compromised car to the road is high." },
      { plain: "The resulting title brand depends on the cause: a collision total loss usually produces a salvage brand, a flood total loss a flood or salvage brand, and a fire total loss a salvage brand." },
    ],
    exampleTitle: "Worked example — 70% threshold",
    exampleRows: [
      { label: "Pre-accident value (ACV)", value: "$20,000" },
      { label: "State threshold", value: "70%" },
      { label: "Totaled if repairs exceed", value: "$14,000" },
    ],
    exampleNote: "Cross the threshold and the insurer pays out the value and takes the wreck instead of repairing it. Thresholds and formulas differ by state — this is an illustration, not a guarantee for any specific car.",
    h2Vs: "Total Loss vs. Salvage Title — What's the Difference?",
    vsIntro: "They're related but not identical. One is a financial decision; the other is a legal label. Knowing the gap between them is exactly why a VIN check beats reading the paper title.",
    tlTag: "Total Loss", tlTitle: "An insurance decision",
    tlBullets: [
      "Made by the insurer when repairs cross the threshold.",
      "The carrier pays the value and usually takes the car.",
      "Recorded in NMVTIS as an insurance loss event.",
      "Drives the title brand — but isn't the brand itself.",
    ],
    salTag: "Salvage Title", salTitle: "A legal title brand",
    salBullets: [
      "Applied by the state DMV to the vehicle's title.",
      "Can exist from severe damage with no insurance claim.",
      "May instead read flood, non-repairable, or owner-retained.",
      "Doesn't always appear — which is why VIN data matters.",
    ],
    vsNotePre: "Run a ", vsNoteLink: "salvage title check", vsNoteSuffix: " alongside this total loss check for the most complete picture of any branded-title history.",
    midCtaHeading: "Was This Specific Car Totaled?",
    midCtaSub: "Don't take the seller's word for it. Run the VIN and see the insurance and title record straight from NMVTIS sources — free, in seconds.",
    h2Reporting: "How a Total Loss Reaches Your VIN Report",
    reportingIntro: "Once an insurer writes a car off, the event flows through several reporters into the VIN's permanent record. That redundancy is why a write-off is hard to hide.",
    reportingChain: [
      "Insurers are generally required to report a total loss to NMVTIS within a set timeframe — often about 30 days of the declaration.",
      "Salvage auction companies like Copart and IAA also report vehicles they receive, adding a second documentation layer.",
      "Insurance-industry databases such as ISO ClaimSearch hold claims data that supplements NMVTIS records.",
      "State motor vehicle agencies brand the title based on insurer and auction reporting, creating a permanent VIN-linked record.",
    ],
    reportingNoteBoldLead: "No single database is perfect.",
    reportingNoteSuffix: " Coverage can have gaps, but because NMVTIS pulls from all 50 state DMVs, insurers, and salvage auctions at once, a multi-source VIN check is the most thorough way to surface a prior total loss — even after a rebuild or an out-of-state re-title.",
    h2Causes: "What Causes a Vehicle to Be Totaled",
    causesIntro: "A total loss can come from any covered event severe enough to cross the threshold. Each cause carries its own hidden-damage risk for a future buyer.",
    causes: [
      { title: "Collision", body: "Frame or unibody damage and airbag deployment make modern cars expensive to repair correctly — the most common reason a vehicle is totaled. Usually results in a salvage brand." },
      { title: "Flood", body: "Water intrusion corrodes wiring, electronics, and safety systems for years after the event. Often branded flood or salvage; damage is frequently hidden." },
      { title: "Fire", body: "Heat compromises wiring harnesses, structural adhesives, and metallurgy well beyond the visibly burned area. Almost always totaled and salvage-branded." },
      { title: "Hail", body: "Severe storms can dent every panel; when bodywork costs exceed the threshold, the car is totaled even though it runs and drives fine." },
      { title: "Theft recovery", body: "Stripped or damaged stolen-and-recovered vehicles can be totaled by the insurer, sometimes carrying a theft-recovery or salvage brand." },
      { title: "Other covered loss", body: "Vandalism, falling objects, or mechanical destruction can all cross the total-loss threshold and trigger a write-off and title brand." },
    ],
    h2Rebuilt: "Rebuilt Total Loss Vehicles — Buy With Caution",
    rebuiltParas: [
      { pre: "After a write-off and salvage title, a car can be bought at auction, repaired, and re-titled as ", bold: "rebuilt or reconstructed", suffix: " once it passes a state inspection. Inspection standards vary dramatically by state, so rebuild quality is wildly inconsistent." },
      { pre: "A rebuilt vehicle carries a permanently lower value — typically ", bold: "20–40% less", suffix: " than a comparable clean-title car — and limited insurance: many carriers decline comprehensive or collision and offer liability only." },
      { plain: "Quality depends entirely on the repair. A professionally rebuilt car with documented structural work can be safe; a poorly rebuilt one can be genuinely dangerous. Always have a rebuilt total loss inspected by a structural repair specialist before you buy." },
    ],
    rebuiltCardTitle: "Rebuilt total loss checklist",
    rebuiltChecklist: [
      "Confirm the brand: salvage, rebuilt, reconstructed, flood, or non-repairable",
      "Get the cause of loss — collision, flood, and fire carry different risks",
      "Demand documented structural repairs, not just cosmetic bodywork",
      "Have a structural repair specialist inspect frame and safety systems",
      "Verify which airbags and sensors were replaced, not just reset",
      "Expect a 20–40% value discount and limited insurance options",
    ],
    rebuiltCardCta: "Check the title brand by VIN first:",
    h2Why: "Why a Total Loss Matters for Value & Insurance",
    whyIntro: "A total-loss record follows the VIN forever — it shapes what you can sell the car for and how you can insure it.",
    whyCards: [
      { title: "Permanent value discount", body: "Every future buyer's VIN check reveals the history, so the 20–40% discount you negotiated on the way in comes back when you sell." },
      { title: "Limited insurance", body: "Many carriers restrict rebuilt or salvage-branded cars to liability-only and decline comprehensive or collision coverage." },
      { title: "The VIN tells the truth", body: "Even if title washing produced a clean paper title, the NMVTIS total-loss record still appears in VIN history reports." },
    ],
    whyNoteBoldLead: "Buying used?",
    whyNotePreLink: " Pair this with a full ",
    whyNoteLink1: "VIN history report",
    whyNoteMid: " and an ",
    whyNoteLink2: "accident history check",
    whyNoteSuffix: " to capture both the total-loss event and any additional damage incidents.",
    h2Internal: "More VIN Checks That Pair With a Total Loss Check",
    internalIntro: "A total loss is one chapter of a car's story. These checks fill in the rest.",
    internalLinks: [
      { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Confirm whether the total loss produced a salvage, junk, or non-repairable brand." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, total loss, accident, odometer, and recall records in one report." },
      { href: "/accident-history-check", label: "Accident History Check", desc: "See the collision and damage events behind a total-loss declaration." },
      { href: "/flood-check", label: "Flood Damage Check", desc: "Flag flood-titled and storm-area vehicles where water damage is often hidden." },
      { href: "/rebuilt-title-check", label: "Rebuilt Title Check", desc: "Verify whether a totaled car was rebuilt and re-titled after inspection." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17-character VIN to specs, trim, and factory options." },
    ],
    h2Faq: "Total Loss Check — Frequently Asked Questions",
    faqIntro: "The questions buyers ask most when checking whether a car was totaled.",
    bottomBadge: "Free · Instant · NMVTIS Source",
    ctaBottomHeading: "Was This Car Totaled? Find Out Now.",
    ctaBottomSub: "Enter a 17-character VIN to check for total-loss declarations, insurance write-off records, salvage and rebuilt brands, and structural damage history.",
    ctaBottomNote: "No credit card · No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "Verificación pérdida total",
    badge: "Búsqueda de pago de seguro   ·   Fuente NMVTIS",
    h1Lead: "Verificación de pérdida total por VIN — ",
    h1Accent: "¿Este auto fue declarado pérdida total?",
    intro: "Un auto declarado pérdida total fue dañado lo suficiente para que una aseguradora eligiera darlo de baja en lugar de repararlo. Muchos son reconstruidos y revendidos sin señales obvias. Ingresa un VIN de 17 caracteres para mostrar registros de pérdida total de seguro, marcas de salvamento y reconstruido, e historial de daño estructural — gratis, antes de comprar.",
    formHeading: "Verifica el historial de pérdida total por VIN",
    formSub: "Ingresa cualquier VIN de 17 caracteres — verificaremos declaraciones de pérdida total, registros de pago y títulos marcados",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { icon: Database, value: "50 estados", label: "fuentes NMVTIS" },
      { icon: Calculator, value: "60–100%", label: "umbral de pérdida total" },
      { icon: Shield, value: "30 días", label: "ventana de reporte de aseguradora" },
      { icon: BadgeCheck, value: "Gratis", label: "sin registro" },
    ],
    h2How: "Cómo funciona una verificación VIN de pérdida total",
    howIntro: "Una pérdida total es una decisión de seguro que sigue al VIN del auto de por vida. Tres pasos convierten ese registro en una respuesta clara antes de que pongas dinero.",
    howSteps: [
      { tag: "Paso 1", title: "Ingresa el VIN", body: "Escribe el VIN de 17 caracteres del tablero, marco de puerta, título o tarjeta de seguro. La verificación está vinculada al VIN, así que una pérdida total previa aparece incluso después de una reconstrucción o un re-titulado fuera del estado." },
      { tag: "Paso 2", title: "Consultamos el registro de pérdida", body: "La búsqueda extrae de NMVTIS — que agrega los 50 DMV estatales, aseguradoras y subastas de salvamento — declaraciones de pérdida total, marcas de salvamento y reconstruido, y eventos de daño estructural." },
      { tag: "Paso 3", title: "Lee el veredicto", body: "Mira si el auto lleva un registro de pérdida total del seguro o un título marcado — y decide si necesita una inspección estructural antes de que pongas dinero." },
    ],
    h2What: "Qué hace que un auto sea pérdida total",
    whatIntro: "Las aseguradoras declaran pérdida total cuando el costo de reparación cruza un porcentaje umbral del valor en efectivo real (ACV) pre-accidente del vehículo. Ese umbral — y la fórmula detrás — varía por estado.",
    whatParas: [
      { pre: "El umbral de pérdida total va de aproximadamente ", bold: "60% a 100% del ACV", suffix: " dependiendo de la jurisdicción. Algunos estados fijan un porcentaje plano; otros usan una fórmula de pérdida total que compara el costo de reparación más el valor de salvamento contra el valor del auto." },
      { plain: "La matemática a menudo incluye la disminución de valor anticipada después de la reparación. Los vehículos con daño al chasis, despliegue de bolsas de aire o exposición a inundación casi siempre son declarados pérdida total, porque la reparación estructural moderna unibody es costosa y la responsabilidad de devolver un auto comprometido a la vía es alta." },
      { plain: "La marca de título resultante depende de la causa: una pérdida total por colisión usualmente produce una marca de salvamento, una pérdida total por inundación una marca de inundación o salvamento, y una pérdida total por fuego una marca de salvamento." },
    ],
    exampleTitle: "Ejemplo trabajado — umbral del 70%",
    exampleRows: [
      { label: "Valor pre-accidente (ACV)", value: "$20,000" },
      { label: "Umbral estatal", value: "70%" },
      { label: "Pérdida total si reparaciones exceden", value: "$14,000" },
    ],
    exampleNote: "Cruza el umbral y la aseguradora paga el valor y toma el vehículo en lugar de repararlo. Los umbrales y fórmulas difieren por estado — esto es una ilustración, no una garantía para ningún auto específico.",
    h2Vs: "Pérdida total vs. título de salvamento — ¿Cuál es la diferencia?",
    vsIntro: "Están relacionados pero no son idénticos. Uno es una decisión financiera; el otro es una etiqueta legal. Conocer la brecha entre ellos es exactamente por qué una verificación VIN supera leer el título físico.",
    tlTag: "Pérdida total", tlTitle: "Una decisión de seguro",
    tlBullets: [
      "Hecha por la aseguradora cuando las reparaciones cruzan el umbral.",
      "La aseguradora paga el valor y usualmente toma el auto.",
      "Registrada en NMVTIS como un evento de pérdida de seguro.",
      "Impulsa la marca de título — pero no es la marca en sí.",
    ],
    salTag: "Título de salvamento", salTitle: "Una marca de título legal",
    salBullets: [
      "Aplicada por el DMV estatal al título del vehículo.",
      "Puede existir por daño severo sin reclamo de seguro.",
      "Puede leerse inundación, no reparable o retenido por propietario.",
      "No siempre aparece — por eso importan los datos VIN.",
    ],
    vsNotePre: "Haz una ", vsNoteLink: "verificación título salvamento", vsNoteSuffix: " junto a esta verificación de pérdida total para la imagen más completa de cualquier historial de título marcado.",
    midCtaHeading: "¿Este auto específico fue pérdida total?",
    midCtaSub: "No tomes la palabra del vendedor. Ejecuta el VIN y mira el registro de seguro y título directo de las fuentes NMVTIS — gratis, en segundos.",
    h2Reporting: "Cómo una pérdida total llega a tu reporte VIN",
    reportingIntro: "Una vez que una aseguradora da de baja un auto, el evento fluye a través de varios reportadores al registro permanente del VIN. Esa redundancia es por la que un pago es difícil de ocultar.",
    reportingChain: [
      "Las aseguradoras generalmente están obligadas a reportar una pérdida total a NMVTIS dentro de un plazo establecido — a menudo unos 30 días de la declaración.",
      "Las compañías de subasta de salvamento como Copart e IAA también reportan los vehículos que reciben, añadiendo una segunda capa de documentación.",
      "Las bases de datos de la industria de seguros como ISO ClaimSearch tienen datos de reclamos que complementan los registros NMVTIS.",
      "Las agencias estatales de vehículos motorizados marcan el título basándose en el reporte de aseguradoras y subastas, creando un registro permanente vinculado al VIN.",
    ],
    reportingNoteBoldLead: "Ninguna base de datos sola es perfecta.",
    reportingNoteSuffix: " La cobertura puede tener brechas, pero como NMVTIS extrae de los 50 DMV estatales, aseguradoras y subastas de salvamento a la vez, una verificación VIN multi-fuente es la forma más completa de mostrar una pérdida total previa — incluso después de una reconstrucción o un re-titulado fuera del estado.",
    h2Causes: "Qué causa que un vehículo sea declarado pérdida total",
    causesIntro: "Una pérdida total puede venir de cualquier evento cubierto lo suficientemente severo para cruzar el umbral. Cada causa lleva su propio riesgo de daño oculto para un futuro comprador.",
    causes: [
      { title: "Colisión", body: "El daño al chasis o unibody y el despliegue de bolsas de aire hacen que los autos modernos sean caros de reparar correctamente — la razón más común por la que un vehículo es declarado pérdida total. Usualmente resulta en una marca de salvamento." },
      { title: "Inundación", body: "La intrusión de agua corroe cableado, electrónicos y sistemas de seguridad durante años después del evento. A menudo marcado inundación o salvamento; el daño está frecuentemente oculto." },
      { title: "Fuego", body: "El calor compromete arneses de cableado, adhesivos estructurales y metalurgia mucho más allá del área visiblemente quemada. Casi siempre declarado pérdida total y marcado salvamento." },
      { title: "Granizo", body: "Las tormentas severas pueden abollar cada panel; cuando los costos de carrocería exceden el umbral, el auto es declarado pérdida total aunque funcione y se conduzca bien." },
      { title: "Recuperación de robo", body: "Vehículos robados y recuperados desmantelados o dañados pueden ser declarados pérdida total por la aseguradora, a veces llevando una marca de recuperación de robo o salvamento." },
      { title: "Otra pérdida cubierta", body: "Vandalismo, objetos cayendo o destrucción mecánica pueden cruzar el umbral de pérdida total y disparar un pago y una marca de título." },
    ],
    h2Rebuilt: "Vehículos de pérdida total reconstruidos — Compra con cautela",
    rebuiltParas: [
      { pre: "Después de un pago y título de salvamento, un auto puede ser comprado en subasta, reparado y re-titulado como ", bold: "reconstruido o reconstituido", suffix: " una vez que pasa una inspección estatal. Los estándares de inspección varían dramáticamente por estado, así que la calidad de reconstrucción es muy inconsistente." },
      { pre: "Un vehículo reconstruido lleva un valor permanentemente menor — típicamente ", bold: "20-40% menos", suffix: " que un auto comparable de título limpio — y seguro limitado: muchas aseguradoras rechazan amplia o colisión y ofrecen solo responsabilidad." },
      { plain: "La calidad depende enteramente de la reparación. Un auto reconstruido profesionalmente con trabajo estructural documentado puede ser seguro; uno mal reconstruido puede ser genuinamente peligroso. Siempre haz que un especialista en reparación estructural inspeccione una pérdida total reconstruida antes de comprar." },
    ],
    rebuiltCardTitle: "Lista de pérdida total reconstruida",
    rebuiltChecklist: [
      "Confirma la marca: salvamento, reconstruido, reconstituido, inundación o no reparable",
      "Obtén la causa de pérdida — colisión, inundación y fuego llevan riesgos diferentes",
      "Exige reparaciones estructurales documentadas, no solo carrocería cosmética",
      "Haz que un especialista en reparación estructural inspeccione chasis y sistemas de seguridad",
      "Verifica qué bolsas de aire y sensores fueron reemplazados, no solo reseteados",
      "Espera un descuento de valor de 20-40% y opciones de seguro limitadas",
    ],
    rebuiltCardCta: "Verifica primero la marca de título por VIN:",
    h2Why: "Por qué una pérdida total importa para el valor y el seguro",
    whyIntro: "Un registro de pérdida total sigue al VIN para siempre — moldea por cuánto puedes vender el auto y cómo puedes asegurarlo.",
    whyCards: [
      { title: "Descuento permanente de valor", body: "La verificación VIN de cada futuro comprador revela el historial, así que el descuento de 20-40% que negociaste a la entrada vuelve cuando vendes." },
      { title: "Seguro limitado", body: "Muchas aseguradoras restringen autos reconstruidos o marcados salvamento a solo responsabilidad y rechazan cobertura amplia o de colisión." },
      { title: "El VIN dice la verdad", body: "Incluso si el lavado de título produjo un título físico limpio, el registro de pérdida total de NMVTIS todavía aparece en los reportes de historial VIN." },
    ],
    whyNoteBoldLead: "¿Comprando usado?",
    whyNotePreLink: " Combina esto con un ",
    whyNoteLink1: "reporte completo de historial VIN",
    whyNoteMid: " y una ",
    whyNoteLink2: "verificación de historial de accidentes",
    whyNoteSuffix: " para capturar tanto el evento de pérdida total como cualquier incidente de daño adicional.",
    h2Internal: "Más verificaciones VIN que se combinan con una verificación de pérdida total",
    internalIntro: "Una pérdida total es un capítulo de la historia de un auto. Estas verificaciones llenan el resto.",
    internalLinks: [
      { href: "/salvage-title-check", label: "Verificación título salvamento", desc: "Confirma si la pérdida total produjo una marca de salvamento, chatarra o no reparable." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Título, pérdida total, accidentes, odómetro y registros de recalls en un reporte." },
      { href: "/accident-history-check", label: "Verificación historial accidentes", desc: "Mira los eventos de colisión y daño detrás de una declaración de pérdida total." },
      { href: "/flood-check", label: "Verificación daño por inundación", desc: "Señala vehículos con título de inundación y de áreas de tormenta donde el daño por agua a menudo está oculto." },
      { href: "/rebuilt-title-check", label: "Verificación título reconstruido", desc: "Verifica si un auto declarado pérdida total fue reconstruido y re-titulado después de inspección." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica el VIN de 17 caracteres a especificaciones, versión y opciones de fábrica." },
    ],
    h2Faq: "Verificación pérdida total — Preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen los compradores al verificar si un auto fue declarado pérdida total.",
    bottomBadge: "Gratis · Instantáneo · Fuente NMVTIS",
    ctaBottomHeading: "¿Este auto fue pérdida total? Descúbrelo ahora.",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres para verificar declaraciones de pérdida total, registros de pago de seguro, marcas de salvamento y reconstruido, e historial de daño estructural.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Gratis",
  },
  fr: {
    home: "Accueil", crumb: "Vérification perte totale",
    badge: "Recherche de paiement d'assurance   ·   Source NMVTIS",
    h1Lead: "Vérification de perte totale par VIN — ",
    h1Accent: "Cette voiture a-t-elle été déclarée perte totale ?",
    intro: "Une voiture déclarée perte totale a été suffisamment endommagée pour qu'un assureur choisisse de la radier au lieu de la réparer. Beaucoup sont reconstruites et revendues sans signes évidents. Saisis un VIN de 17 caractères pour faire remonter les enregistrements de perte totale d'assurance, les marques salvage et reconstruit, et l'historique de dommages structurels — gratuit, avant d'acheter.",
    formHeading: "Vérifie l'historique de perte totale par VIN",
    formSub: "Saisis n'importe quel VIN de 17 caractères — nous vérifierons les déclarations de perte totale, les enregistrements de paiement et les titres marqués",
    formNote: "Gratuit · Sans inscription · Résultat instantané",
    trustStats: [
      { icon: Database, value: "50 États", label: "sources NMVTIS" },
      { icon: Calculator, value: "60–100 %", label: "seuil de perte totale" },
      { icon: Shield, value: "30 jours", label: "fenêtre de déclaration assureur" },
      { icon: BadgeCheck, value: "Gratuit", label: "sans inscription" },
    ],
    h2How: "Comment fonctionne une vérification VIN de perte totale",
    howIntro: "Une perte totale est une décision d'assurance qui suit le VIN de la voiture à vie. Trois étapes transforment cet enregistrement en une réponse claire avant que tu ne mettes de l'argent.",
    howSteps: [
      { tag: "Étape 1", title: "Saisis le VIN", body: "Tape le VIN de 17 caractères du tableau de bord, du montant de porte, du titre ou de la carte d'assurance. La vérification est liée au VIN, donc une perte totale antérieure apparaît même après une reconstruction ou une nouvelle immatriculation hors État." },
      { tag: "Étape 2", title: "Nous interrogeons le registre de sinistre", body: "La recherche tire de NMVTIS — qui agrège les 50 DMV d'État, les assureurs et les ventes aux enchères de salvage — les déclarations de perte totale, les marques salvage et reconstruit, et les événements de dommages structurels." },
      { tag: "Étape 3", title: "Lis le verdict", body: "Vois si la voiture porte un enregistrement de perte totale d'assurance ou un titre marqué — et décide si elle nécessite une inspection structurelle avant que tu ne mettes de l'argent." },
    ],
    h2What: "Ce qui fait d'une voiture une perte totale",
    whatIntro: "Les assureurs déclarent une perte totale lorsque le coût de réparation franchit un pourcentage seuil de la valeur réelle en espèces (ACV) avant accident du véhicule. Ce seuil — et la formule derrière — varie selon l'État.",
    whatParas: [
      { pre: "Le seuil de perte totale va d'environ ", bold: "60 % à 100 % de l'ACV", suffix: " selon la juridiction. Certains États fixent un pourcentage fixe ; d'autres utilisent une formule de perte totale qui compare le coût de réparation plus la valeur de salvage à la valeur de la voiture." },
      { plain: "Le calcul inclut souvent la moins-value anticipée après réparation. Les véhicules avec dommages au châssis, déploiement d'airbag ou exposition à l'inondation sont presque toujours déclarés perte totale, parce que la réparation structurelle moderne unibody est coûteuse et la responsabilité de remettre une voiture compromise sur la route est élevée." },
      { plain: "La marque de titre résultante dépend de la cause : une perte totale par collision produit généralement une marque salvage, une perte totale par inondation une marque inondation ou salvage, et une perte totale par feu une marque salvage." },
    ],
    exampleTitle: "Exemple travaillé — seuil de 70 %",
    exampleRows: [
      { label: "Valeur avant accident (ACV)", value: "$20,000" },
      { label: "Seuil d'État", value: "70 %" },
      { label: "Perte totale si réparations dépassent", value: "$14,000" },
    ],
    exampleNote: "Franchis le seuil et l'assureur paie la valeur et prend l'épave au lieu de la réparer. Les seuils et formules diffèrent selon l'État — ceci est une illustration, pas une garantie pour une voiture spécifique.",
    h2Vs: "Perte totale vs. titre salvage — Quelle est la différence ?",
    vsIntro: "Elles sont liées mais pas identiques. L'une est une décision financière ; l'autre est une étiquette légale. Connaître l'écart entre les deux est précisément pourquoi une vérification VIN bat la lecture du titre papier.",
    tlTag: "Perte totale", tlTitle: "Une décision d'assurance",
    tlBullets: [
      "Prise par l'assureur quand les réparations franchissent le seuil.",
      "Le porteur paie la valeur et prend généralement la voiture.",
      "Enregistrée dans NMVTIS comme événement de sinistre d'assurance.",
      "Pilote la marque de titre — mais n'est pas la marque elle-même.",
    ],
    salTag: "Titre salvage", salTitle: "Une marque de titre légale",
    salBullets: [
      "Appliquée par le DMV d'État au titre du véhicule.",
      "Peut exister à partir de dommages sévères sans réclamation d'assurance.",
      "Peut se lire à la place inondation, non réparable ou retenu par propriétaire.",
      "N'apparaît pas toujours — c'est pourquoi les données VIN comptent.",
    ],
    vsNotePre: "Effectue une ", vsNoteLink: "vérification titre salvage", vsNoteSuffix: " à côté de cette vérification de perte totale pour l'image la plus complète de tout historique de titre marqué.",
    midCtaHeading: "Cette voiture spécifique a-t-elle été déclarée perte totale ?",
    midCtaSub: "Ne te fie pas à la parole du vendeur. Lance le VIN et vois le registre d'assurance et de titre directement depuis les sources NMVTIS — gratuit, en quelques secondes.",
    h2Reporting: "Comment une perte totale arrive à ton rapport VIN",
    reportingIntro: "Une fois qu'un assureur radie une voiture, l'événement passe par plusieurs déclarants dans le dossier permanent du VIN. Cette redondance est pourquoi un paiement est difficile à cacher.",
    reportingChain: [
      "Les assureurs sont généralement tenus de déclarer une perte totale à NMVTIS dans un délai fixé — souvent environ 30 jours après la déclaration.",
      "Les sociétés de ventes aux enchères de salvage comme Copart et IAA déclarent aussi les véhicules qu'elles reçoivent, ajoutant une seconde couche de documentation.",
      "Les bases de données de l'industrie de l'assurance comme ISO ClaimSearch contiennent des données de sinistres qui complètent les registres NMVTIS.",
      "Les agences d'État de véhicules motorisés marquent le titre sur la base des déclarations des assureurs et des ventes aux enchères, créant un registre permanent lié au VIN.",
    ],
    reportingNoteBoldLead: "Aucune base de données seule n'est parfaite.",
    reportingNoteSuffix: " La couverture peut avoir des lacunes, mais parce que NMVTIS tire des 50 DMV d'État, des assureurs et des ventes aux enchères de salvage en une fois, une vérification VIN multi-sources est la façon la plus complète de faire remonter une perte totale antérieure — même après une reconstruction ou une nouvelle immatriculation hors État.",
    h2Causes: "Ce qui cause une déclaration de perte totale d'un véhicule",
    causesIntro: "Une perte totale peut venir de tout événement couvert assez sévère pour franchir le seuil. Chaque cause porte son propre risque de dommages cachés pour un futur acheteur.",
    causes: [
      { title: "Collision", body: "Les dommages au châssis ou à la coque et le déploiement d'airbag rendent les voitures modernes coûteuses à réparer correctement — la raison la plus courante pour laquelle un véhicule est déclaré perte totale. Résulte généralement en une marque salvage." },
      { title: "Inondation", body: "L'intrusion d'eau corrode le câblage, l'électronique et les systèmes de sécurité pendant des années après l'événement. Souvent marquée inondation ou salvage ; les dommages sont souvent cachés." },
      { title: "Feu", body: "La chaleur compromet les harnais de câblage, les adhésifs structurels et la métallurgie bien au-delà de la zone visiblement brûlée. Presque toujours déclarée perte totale et marquée salvage." },
      { title: "Grêle", body: "Les tempêtes sévères peuvent cabosser chaque panneau ; lorsque les coûts de carrosserie dépassent le seuil, la voiture est déclarée perte totale même si elle roule et conduit bien." },
      { title: "Récupération de vol", body: "Les véhicules volés et récupérés dépouillés ou endommagés peuvent être déclarés perte totale par l'assureur, portant parfois une marque récupération de vol ou salvage." },
      { title: "Autre sinistre couvert", body: "Le vandalisme, la chute d'objets ou la destruction mécanique peuvent tous franchir le seuil de perte totale et déclencher un paiement et une marque de titre." },
    ],
    h2Rebuilt: "Véhicules en perte totale reconstruits — Achète avec prudence",
    rebuiltParas: [
      { pre: "Après un paiement et un titre salvage, une voiture peut être achetée aux enchères, réparée et ré-immatriculée comme ", bold: "reconstruite ou reconstituée", suffix: " une fois qu'elle passe une inspection d'État. Les normes d'inspection varient considérablement selon l'État, donc la qualité de reconstruction est très inconstante." },
      { pre: "Un véhicule reconstruit porte une valeur définitivement plus basse — typiquement ", bold: "20 à 40 % de moins", suffix: " qu'une voiture comparable à titre propre — et une assurance limitée : de nombreux assureurs refusent tous risques ou collision et n'offrent que la responsabilité civile." },
      { plain: "La qualité dépend entièrement de la réparation. Une voiture professionnellement reconstruite avec un travail structurel documenté peut être sûre ; une mal reconstruite peut être réellement dangereuse. Fais toujours inspecter une perte totale reconstruite par un spécialiste de réparation structurelle avant d'acheter." },
    ],
    rebuiltCardTitle: "Liste perte totale reconstruite",
    rebuiltChecklist: [
      "Confirme la marque : salvage, reconstruit, reconstitué, inondation ou non réparable",
      "Obtiens la cause du sinistre — collision, inondation et feu portent des risques différents",
      "Exige des réparations structurelles documentées, pas juste de la carrosserie cosmétique",
      "Fais inspecter le châssis et les systèmes de sécurité par un spécialiste de réparation structurelle",
      "Vérifie quels airbags et capteurs ont été remplacés, pas seulement réinitialisés",
      "Attends-toi à une décote de valeur de 20 à 40 % et des options d'assurance limitées",
    ],
    rebuiltCardCta: "Vérifie d'abord la marque de titre par VIN :",
    h2Why: "Pourquoi une perte totale compte pour la valeur et l'assurance",
    whyIntro: "Un enregistrement de perte totale suit le VIN à vie — il façonne ce pour quoi tu peux vendre la voiture et comment tu peux l'assurer.",
    whyCards: [
      { title: "Décote de valeur permanente", body: "La vérification VIN de chaque futur acheteur révèle l'historique, donc la décote de 20 à 40 % que tu as négociée à l'entrée revient quand tu vends." },
      { title: "Assurance limitée", body: "De nombreux assureurs limitent les voitures reconstruites ou marquées salvage à la responsabilité civile seulement et refusent la couverture tous risques ou collision." },
      { title: "Le VIN dit la vérité", body: "Même si le lavage de titre a produit un titre papier propre, l'enregistrement de perte totale NMVTIS apparaît toujours dans les rapports d'historique VIN." },
    ],
    whyNoteBoldLead: "Achat d'occasion ?",
    whyNotePreLink: " Combine ceci avec un ",
    whyNoteLink1: "rapport complet d'historique VIN",
    whyNoteMid: " et une ",
    whyNoteLink2: "vérification d'historique d'accidents",
    whyNoteSuffix: " pour capturer à la fois l'événement de perte totale et tout incident de dommages supplémentaire.",
    h2Internal: "Plus de vérifications VIN qui se combinent avec une vérification de perte totale",
    internalIntro: "Une perte totale est un chapitre de l'histoire d'une voiture. Ces vérifications remplissent le reste.",
    internalLinks: [
      { href: "/salvage-title-check", label: "Vérification titre salvage", desc: "Confirme si la perte totale a produit une marque salvage, ferraille ou non réparable." },
      { href: "/vin-check", label: "Vérification complète d'historique VIN", desc: "Titre, perte totale, accidents, odomètre et registres de rappels en un rapport." },
      { href: "/accident-history-check", label: "Vérification historique d'accidents", desc: "Vois les événements de collision et de dommages derrière une déclaration de perte totale." },
      { href: "/flood-check", label: "Vérification dégâts d'inondation", desc: "Signale les véhicules au titre d'inondation et des zones de tempête où les dégâts d'eau sont souvent cachés." },
      { href: "/rebuilt-title-check", label: "Vérification titre reconstruit", desc: "Vérifie si une voiture en perte totale a été reconstruite et ré-immatriculée après inspection." },
      { href: "/vin-decoder", label: "Décodeur VIN", desc: "Décode le VIN de 17 caractères en spécifications, finitions et options d'usine." },
    ],
    h2Faq: "Vérification perte totale — Foire aux questions",
    faqIntro: "Les questions que les acheteurs posent le plus en vérifiant si une voiture a été déclarée perte totale.",
    bottomBadge: "Gratuit · Instantané · Source NMVTIS",
    ctaBottomHeading: "Cette voiture a-t-elle été déclarée perte totale ? Découvre-le maintenant.",
    ctaBottomSub: "Saisis un VIN de 17 caractères pour vérifier les déclarations de perte totale, les enregistrements de paiement d'assurance, les marques salvage et reconstruit, et l'historique de dommages structurels.",
    ctaBottomNote: "Pas de carte de crédit · Sans inscription · Gratuit",
  },
} as const;

const FAQS_EN = [
  { question: "What does it mean when a car is a total loss?", answer: "A total loss means an insurer determined that repairing the vehicle would cost more than it is worth to fix. Specifically, the insurance company declares a total loss when repair costs — sometimes combined with the vehicle's salvage value — exceed its pre-accident actual cash value (ACV) or a state-defined total-loss threshold. Instead of paying for repairs, the insurer pays out the vehicle's value and usually takes ownership of the wreck." },
  { question: "How do I check if a car was declared a total loss by VIN?", answer: "Enter the 17-character VIN into the search tool above. The system queries NMVTIS and national title and insurance sources for total-loss declarations, salvage brands, and structural damage records. Because NMVTIS aggregates data from all 50 state DMVs and from insurers and salvage auctions, a VIN check can surface a prior total loss even if the vehicle was later rebuilt or re-titled in a different state." },
  { question: "What is the difference between a total loss and a salvage title?", answer: "A total loss is an insurance decision; a salvage title is a legal title brand. When an insurer declares a vehicle a total loss, the state typically brands the title as salvage. However, the two do not always line up: some salvage titles come from severe damage with no insurance claim, and some states let owners keep a totaled car under an owner-retained or non-repairable brand instead of standard salvage." },
  { question: "What is a total-loss threshold?", answer: "A total-loss threshold is the point at which an insurer must declare a vehicle a total loss, expressed as a percentage of the vehicle's actual cash value. The exact percentage varies by state — some states set a fixed threshold while others use a total-loss formula comparing repair cost plus salvage value to the vehicle's value. Once repair estimates cross that threshold, the insurer totals the car rather than repairing it." },
  { question: "Can a totaled car be back on the road?", answer: "Yes. A car declared a total loss is often sold at salvage auction, repaired, and then issued a rebuilt or reconstructed title after passing a state inspection in most states. Inspection standards vary widely by state, so rebuild quality is inconsistent. A properly rebuilt vehicle can be safe, but a poorly repaired one can be dangerous — always have a rebuilt total loss inspected by a structural repair specialist before buying." },
  { question: "Does a total loss always create a salvage title?", answer: "Not always. A total loss usually triggers a salvage title, but the resulting brand depends on the state and the cause of loss. Some states use flood, non-repairable, or owner-retained brands instead of standard salvage, and a few situations may not produce a salvage brand at all. Because the paper title may not capture every event, a VIN-based NMVTIS check is more reliable than reading the title alone." },
  { question: "Will a prior total loss affect a car's insurance and value?", answer: "Yes. A prior total loss typically reduces resale value, often substantially, because the history follows the VIN and appears in future buyers' reports. It can also limit insurance: many carriers restrict rebuilt or salvage-branded vehicles to liability-only coverage and decline comprehensive or collision. Coverage availability and the size of the value discount vary by insurer, state, and the extent of the original damage." },
  { question: "Where does total-loss data come from?", answer: "Total-loss and salvage records reach NMVTIS through the 50 state DMVs, insurance carriers, and salvage auctions, with insurer total-loss reporting as a primary source. Insurers are generally required to report total losses to NMVTIS within a set timeframe, and salvage auctions like Copart and IAA report vehicles they receive. No single database is perfect, so coverage can have gaps, but a multi-source VIN check is the most thorough way to surface a prior total loss." },
];

const FAQS_ES = [
  { question: "¿Qué significa cuando un auto es pérdida total?", answer: "Una pérdida total significa que una aseguradora determinó que reparar el vehículo costaría más de lo que vale arreglarlo. Específicamente, la compañía de seguros declara pérdida total cuando los costos de reparación — a veces combinados con el valor de salvamento del vehículo — exceden su valor en efectivo real (ACV) pre-accidente o un umbral de pérdida total definido por el estado. En lugar de pagar por reparaciones, la aseguradora paga el valor del vehículo y usualmente toma la propiedad de los restos." },
  { question: "¿Cómo verifico si un auto fue declarado pérdida total por VIN?", answer: "Ingresa el VIN de 17 caracteres en la herramienta de búsqueda arriba. El sistema consulta NMVTIS y fuentes nacionales de título y seguro por declaraciones de pérdida total, marcas de salvamento y registros de daño estructural. Como NMVTIS agrega datos de los 50 DMV estatales y de aseguradoras y subastas de salvamento, una verificación VIN puede mostrar una pérdida total previa incluso si el vehículo fue posteriormente reconstruido o re-titulado en un estado diferente." },
  { question: "¿Cuál es la diferencia entre una pérdida total y un título de salvamento?", answer: "Una pérdida total es una decisión de seguro; un título de salvamento es una marca de título legal. Cuando una aseguradora declara pérdida total un vehículo, el estado típicamente marca el título como salvamento. Sin embargo, los dos no siempre se alinean: algunos títulos de salvamento vienen de daño severo sin reclamo de seguro, y algunos estados permiten a los propietarios quedarse con un auto declarado pérdida total bajo una marca de retenido-por-propietario o no-reparable en lugar de salvamento estándar." },
  { question: "¿Qué es un umbral de pérdida total?", answer: "Un umbral de pérdida total es el punto en el que una aseguradora debe declarar pérdida total un vehículo, expresado como un porcentaje del valor en efectivo real del vehículo. El porcentaje exacto varía por estado — algunos estados establecen un umbral fijo mientras que otros usan una fórmula de pérdida total comparando el costo de reparación más el valor de salvamento al valor del vehículo. Una vez que las estimaciones de reparación cruzan ese umbral, la aseguradora declara pérdida total el auto en lugar de repararlo." },
  { question: "¿Puede un auto declarado pérdida total volver a la vía?", answer: "Sí. Un auto declarado pérdida total a menudo se vende en subasta de salvamento, se repara y luego se le emite un título reconstruido o reconstituido después de pasar una inspección estatal en la mayoría de los estados. Los estándares de inspección varían ampliamente por estado, así que la calidad de reconstrucción es inconsistente. Un vehículo reconstruido apropiadamente puede ser seguro, pero uno mal reparado puede ser peligroso — siempre haz que un especialista en reparación estructural inspeccione una pérdida total reconstruida antes de comprar." },
  { question: "¿Una pérdida total siempre crea un título de salvamento?", answer: "No siempre. Una pérdida total usualmente dispara un título de salvamento, pero la marca resultante depende del estado y la causa de pérdida. Algunos estados usan marcas de inundación, no-reparable o retenido-por-propietario en lugar de salvamento estándar, y algunas situaciones pueden no producir una marca de salvamento en absoluto. Como el título físico puede no capturar cada evento, una verificación NMVTIS basada en VIN es más confiable que leer solo el título." },
  { question: "¿Una pérdida total previa afectará el seguro y el valor del auto?", answer: "Sí. Una pérdida total previa típicamente reduce el valor de reventa, a menudo sustancialmente, porque el historial sigue al VIN y aparece en los reportes de futuros compradores. También puede limitar el seguro: muchas aseguradoras restringen vehículos reconstruidos o marcados salvamento a cobertura solo de responsabilidad y rechazan amplia o colisión. La disponibilidad de cobertura y el tamaño del descuento de valor varían por aseguradora, estado y la extensión del daño original." },
  { question: "¿De dónde vienen los datos de pérdida total?", answer: "Los registros de pérdida total y salvamento llegan a NMVTIS a través de los 50 DMV estatales, aseguradoras y subastas de salvamento, con el reporte de pérdida total de aseguradoras como fuente principal. Las aseguradoras generalmente están obligadas a reportar pérdidas totales a NMVTIS dentro de un plazo establecido, y subastas de salvamento como Copart e IAA reportan los vehículos que reciben. Ninguna base de datos sola es perfecta, así que la cobertura puede tener brechas, pero una verificación VIN multi-fuente es la forma más completa de mostrar una pérdida total previa." },
];

interface Props { locale: Locale; }

export default function TotalLossCheckBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <ShieldAlert className="w-4 h-4" /> {c.badge}
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
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.whatIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              {c.whatParas.map((p, i) =>
                "plain" in p ? (
                  <p key={i}>{p.plain}</p>
                ) : (
                  <p key={i}>
                    {p.pre}
                    <strong className="text-on-surface">{p.bold}</strong>
                    {p.suffix}
                  </p>
                )
              )}
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="w-5 h-5 text-primary" />
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Vs}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.vsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.tlTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.tlTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.tlBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">{c.salTag}</div>
              <p className="text-lg font-headline font-extrabold text-primary mb-3">{c.salTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.salBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
          </div>
          <p className="mt-5 text-xs text-on-surface-variant">
            {c.vsNotePre}
            <Link href={link("/salvage-title-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.vsNoteLink}</Link>
            {c.vsNoteSuffix}
          </p>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Reporting}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.reportingIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.reportingChain.map((item, i) => (
              <div key={i} className="flex gap-3 items-start rounded-2xl border border-outline-variant bg-surface p-5">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.reportingNoteBoldLead}</strong>
                {c.reportingNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Causes}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.causesIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.causes.map((ca, i) => {
              const Icon = CAUSE_ICONS[i];
              return (
                <div key={ca.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{ca.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{ca.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Rebuilt}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              {c.rebuiltParas.map((p, i) =>
                "plain" in p ? (
                  <p key={i}>{p.plain}</p>
                ) : (
                  <p key={i}>
                    {p.pre}
                    <strong className="text-on-surface">{p.bold}</strong>
                    {p.suffix}
                  </p>
                )
              )}
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.rebuiltCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.rebuiltChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.rebuiltCardCta}</p>
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
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.whyNoteBoldLead}</strong>
                {c.whyNotePreLink}
                <Link href={link("/vin-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.whyNoteLink1}</Link>
                {c.whyNoteMid}
                <Link href={link("/accident-history-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.whyNoteLink2}</Link>
                {c.whyNoteSuffix}
              </p>
            </div>
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

        <RelatedChecks exclude="/total-loss-check" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
