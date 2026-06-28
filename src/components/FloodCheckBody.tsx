/**
 * Shared body for /flood-check and /es/flood-check.
 * Wave 18a — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Check, Shield, Search, FileText, Database, Droplets, Waves,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Wind, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, MapPin, Cpu,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Wind, Waves, Cpu, AlertTriangle, Wrench, Zap] as const;
const DANGER_ICONS = [Cpu, Shield, Gauge] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Flood Check",
    badge: "Water-Damage Lookup   ·   NMVTIS-Sourced",
    h1Lead: "Flood Damage Check by VIN — ",
    h1Accent: "Was This Car Flooded?",
    intro: "After every hurricane and major flood, thousands of water-damaged cars are dried out, cleaned up, and shipped to states where buyers never see it coming. Enter a 17-character VIN to surface flood and water-damage title brands, hurricane salvage records, and insurance total-loss history — free, before you buy.",
    formHeading: "Check for Flood & Water-Damage History by VIN",
    formSub: "Enter any 17-character VIN — we'll check for flood, water-damage, and storm-damage brands plus salvage records",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { icon: Database, value: "50-state", label: "NMVTIS sources" },
      { icon: Waves, value: "Flood", label: "& water-damage brands" },
      { icon: Shield, value: "Hurricane", label: "salvage records" },
      { icon: BadgeCheck, value: "Free", label: "no sign-up" },
    ],
    h2How: "How a VIN Flood Check Works",
    howIntro: "A flood brand follows the car's VIN for life. Three steps turn that record into a clear answer before you put money down.",
    howSteps: [
      { tag: "Step 1", title: "Enter the VIN", body: "Type the 17-character VIN from the dashboard, door jamb, title, or insurance card. The check is keyed to the VIN, so a flood brand surfaces even after the car is dried out and re-titled in another state." },
      { tag: "Step 2", title: "We query the flood record", body: "The lookup pulls from NMVTIS — which aggregates all 50 state DMVs, insurers, junk yards, and salvage auctions — for flood, water-damage, and storm-damage brands plus flood-related total losses." },
      { tag: "Step 3", title: "Read the verdict", body: "See whether the car carries a flood or water-damage brand or a flood-related salvage record — and decide whether it needs a hands-on inspection before you put money down." },
    ],
    h2Title: "How Flood Damage Gets Into the Title System",
    titleIntro: "When water reaches the floorboards or higher, insurers almost always declare the car a total loss. That decision is what creates the permanent, VIN-linked flood record — and what title washing tries to erase.",
    title1Pre: "When a vehicle is submerged, the insurer typically pays the policyholder the ",
    title1Bold1: "actual cash value",
    title1Mid: ", takes ownership of the wreck, and brands the title ",
    title1Bold2: "flood",
    title1Mid2: " or ",
    title1Bold3: "salvage",
    title1Suffix: ". That brand is reported to NMVTIS and is meant to follow the car for life.",
    title2Pre: "The problem is ",
    title2Bold: "title washing",
    title2Suffix: ". Operators buy flood cars at salvage auction, dry them out, and re-register them in states with weaker brand-transfer rules — sometimes obtaining a fresh \"clean\" paper title. NMVTIS was built to disrupt exactly this by preserving the original brand history.",
    title3: "After Hurricane Katrina (2005), Harvey (2017), and Ian (2022), investigators tracked thousands of flood cars that ended up retitled far from the disaster zone and sold within months. A VIN flood check is your primary defense against that fraud.",
    pathCardTitle: "The flood-to-title path",
    pathRows: [
      { label: "Water reaches", value: "floorboards+" },
      { label: "Insurer declares", value: "total loss" },
      { label: "Title branded", value: "Flood / Salvage" },
    ],
    pathCardNote: "Once the brand reaches NMVTIS it's meant to stay with the VIN nationwide — even after a re-title attempt in another state.",
    h2Signs: "Signs of Hidden Flood Damage",
    signsIntro: "Even a clean VIN result deserves a hands-on look when a car comes from a flood-prone region. Sophisticated flood prep can make a vehicle look spotless until the electrical problems surface weeks later.",
    signs: [
      { title: "Musty or mildew odor", body: "Especially under carpet, in the trunk, and behind interior panels — a smell that lingers even after heavy cleaning or air fresheners meant to mask it." },
      { title: "Water stain tide lines", body: "Faint horizontal marks inside door panels, under seats, in the engine bay, or in the spare-tire well that show how high the water rose." },
      { title: "Corroded connectors", body: "Greenish-white oxidation on wiring-harness plugs, fuse boxes, and ground points — a tell-tale of submersion that is hard to fully clean." },
      { title: "Rust in odd places", body: "Premature rust on seat-bolt tracks, floor-pan fasteners, brake lines, or under-dash brackets points to water intrusion, not normal age." },
      { title: "New carpet or trim", body: "Recently replaced carpets, seats, or headliner on an otherwise older car can mean a flood refurbishment meant to hide the damage." },
      { title: "Electronic glitches", body: "Intermittent warning lights, flaky infotainment, and HVAC or power-accessory faults are common as corrosion spreads through the harness." },
    ],
    midCtaHeading: "Was This Specific Car Flooded?",
    midCtaSub: "Don't take the seller's word for it. Run the VIN and see the flood and title record straight from NMVTIS sources — free, in seconds.",
    h2Chain: "How Flood Records Reach Your VIN Report",
    chainIntro: "Once a car is flooded and claimed, the event flows through several reporters into the VIN's permanent record. That redundancy is why a flood is hard to hide.",
    chain: [
      "Insurers are generally required to report a flood-related total loss to NMVTIS within a set timeframe after the declaration.",
      "Salvage auction companies like Copart and IAA report flood vehicles they receive — a major channel after hurricanes and storms.",
      "State motor vehicle agencies brand the title 'Flood,' 'Water Damage,' or 'Salvage,' creating a permanent VIN-linked record.",
      "NMVTIS aggregates all of it, so a brand reported in one state stays visible even after the car is moved and re-titled elsewhere.",
    ],
    chainBoldLead: "No single database is perfect.",
    chainNoteRest: " A flood car that was never insured or claimed can still carry a clean title — but because NMVTIS pulls from all 50 state DMVs, insurers, junk yards, and salvage auctions at once, a multi-source VIN check is the most thorough way to surface a prior flood, even after a re-title.",
    h2States: "Where Flood Cars Come From — and Where They End Up",
    states1Pre: "Flood-vehicle concentrations follow the geography of major weather events. Gulf Coast states — ",
    states1Bold: "Texas, Louisiana, Florida, and Mississippi",
    states1Suffix: " — have the highest rates of flood-branded vehicles thanks to repeated hurricane activity.",
    states2: "But flood cars don't stay where they were damaged. They migrate to used-car markets across the country, often appearing on dealer lots hundreds of miles from the original disaster zone, in states where buyers are far less alert to flood history.",
    states3: "After Hurricane Harvey in 2017, investigators documented flood vehicles surfacing from California to Massachusetts within 90 days of the storm. That nationwide migration is exactly why a VIN-based flood check matters no matter where you live.",
    statesCardTitle: "Highest-risk origin states",
    statesList: [
      "Texas — repeated hurricane and inland flooding",
      "Louisiana — Gulf storms and low-lying terrain",
      "Florida — hurricanes and storm-surge flooding",
      "Mississippi — Gulf Coast hurricane exposure",
      "Other coastal & river-basin flood zones",
    ],
    statesCardNote: "A car for sale far from these states can still have a flood history — the VIN is what reveals it.",
    h2Danger: "Why Flood Cars Are Dangerous Long-Term",
    dangerIntro: "The danger of a flood car isn't always immediate. Corrosion develops over months and years, turning a car that runs fine today into an unpredictable one tomorrow.",
    dangers: [
      { title: "Corroded electronics", body: "Water intrusion into wiring harnesses and control modules creates corrosion that causes intermittent, hard-to-diagnose failures across engine, transmission, ABS, and traction systems." },
      { title: "Compromised safety systems", body: "Water-damaged airbag and SRS components may fail to deploy in a crash — or deploy unexpectedly. Combined with hidden structural rust, that makes a flood car genuinely hazardous." },
      { title: "The VIN tells the truth", body: "Even if title washing produced a clean paper title, the NMVTIS flood or salvage record still appears in a multi-source VIN history report." },
    ],
    dangerNoteBoldLead: "Buying used?",
    dangerNoteMid1: " Pair this with an ",
    dangerNoteLink1: "accident history check",
    dangerNoteMid2: " and a ",
    dangerNoteLink2: "stolen vehicle check",
    dangerNoteSuffix: " to capture both water damage and any additional incidents before you buy.",
    h2Inspect: "Flood-Prone Purchase? Inspect Before You Pay",
    inspect1Pre: "A VIN flood check is the first and most important step, but it isn't the last. A flood car that was never insured or claimed can slip through with a ",
    inspect1Bold: "clean title",
    inspect1Suffix: ", so a hands-on inspection backs up the data.",
    inspect2Pre: "Combine the flood check with a ",
    inspect2Link1: "salvage title check",
    inspect2Mid: " and a full ",
    inspect2Link2: "VIN history report",
    inspect2Suffix: " for the most complete picture of any vehicle's damage history.",
    inspect3: "When in doubt, pay a trusted mechanic for a pre-purchase inspection focused on water intrusion. A few dollars up front is far cheaper than years of chasing electrical gremlins.",
    inspectCardTitle: "Flood inspection checklist",
    inspectChecklist: [
      "Run the VIN for flood, water-damage, and salvage brands first",
      "Smell the cabin and trunk for mildew, especially with windows up",
      "Lift carpet edges and check the spare-tire well for silt or stains",
      "Inspect harness connectors and ground points for green corrosion",
      "Test every electrical accessory, light, and the HVAC system",
      "Have a mechanic inspect a flood-prone car before you pay",
    ],
    inspectCardCta: "Check the flood history by VIN first:",
    h2Internal: "More VIN Checks That Pair With a Flood Check",
    internalIntro: "Flood damage is one chapter of a car's story. These checks fill in the rest.",
    internalLinks: [
      { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Confirm whether the flood damage produced a salvage, junk, or non-repairable brand." },
      { href: "/total-loss-check", label: "Total Loss Check", desc: "See whether an insurer wrote the car off after a flood or storm event." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, flood, accident, odometer, and recall records in one report." },
      { href: "/accident-history-check", label: "Accident History Check", desc: "Capture collision and damage events alongside the flood history." },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check", desc: "Verify the car isn't reported stolen before you commit to a purchase." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17-character VIN to specs, trim, and factory options." },
    ],
    h2Faq: "Flood Damage Check — Frequently Asked Questions",
    faqIntro: "The questions buyers ask most when checking a car for water damage.",
    bottomBadge: "Free · Instant · NMVTIS Source",
    ctaBottomHeading: "Was This Car Flooded? Find Out Now.",
    ctaBottomSub: "Enter a 17-character VIN to check for flood and water-damage title brands, hurricane salvage records, and insurance total-loss history.",
    ctaBottomNote: "No credit card · No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "Verificación de inundación",
    badge: "Búsqueda de daño por agua   ·   Fuente NMVTIS",
    h1Lead: "Verificación de daño por inundación por VIN — ",
    h1Accent: "¿Este auto fue inundado?",
    intro: "Después de cada huracán e inundación mayor, miles de autos dañados por agua son secados, limpiados y enviados a estados donde los compradores nunca lo ven venir. Ingresa un VIN de 17 caracteres para mostrar marcas de título por inundación y daño por agua, registros de salvamento por huracán e historial de pérdida total del seguro — gratis, antes de comprar.",
    formHeading: "Verifica historial de inundación y daño por agua por VIN",
    formSub: "Ingresa cualquier VIN de 17 caracteres — verificaremos marcas de inundación, daño por agua y daño por tormenta más registros de salvamento",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { icon: Database, value: "50 estados", label: "fuentes NMVTIS" },
      { icon: Waves, value: "Inundación", label: "y marcas por daño de agua" },
      { icon: Shield, value: "Huracán", label: "registros de salvamento" },
      { icon: BadgeCheck, value: "Gratis", label: "sin registro" },
    ],
    h2How: "Cómo funciona una verificación VIN de inundación",
    howIntro: "Una marca de inundación sigue al VIN del auto de por vida. Tres pasos convierten ese registro en una respuesta clara antes de poner dinero.",
    howSteps: [
      { tag: "Paso 1", title: "Ingresa el VIN", body: "Escribe el VIN de 17 caracteres del tablero, marco de puerta, título o tarjeta del seguro. La verificación está vinculada al VIN, así que una marca de inundación aparece incluso después de que el auto se seque y se re-titule en otro estado." },
      { tag: "Paso 2", title: "Consultamos el registro de inundación", body: "La búsqueda extrae de NMVTIS — que agrega los 50 DMV estatales, aseguradoras, deshuesaderos y subastas de salvamento — marcas de inundación, daño por agua y daño por tormenta más pérdidas totales relacionadas con inundación." },
      { tag: "Paso 3", title: "Lee el veredicto", body: "Mira si el auto lleva una marca de inundación o daño por agua o un registro de salvamento por inundación — y decide si necesita una inspección presencial antes de poner dinero." },
    ],
    h2Title: "Cómo el daño por inundación llega al sistema de títulos",
    titleIntro: "Cuando el agua alcanza el piso o más alto, las aseguradoras casi siempre declaran el auto pérdida total. Esa decisión es la que crea el registro permanente de inundación vinculado al VIN — y lo que el lavado de título intenta borrar.",
    title1Pre: "Cuando un vehículo está sumergido, la aseguradora típicamente paga al tomador de póliza el ",
    title1Bold1: "valor real en efectivo",
    title1Mid: ", toma posesión del siniestro y marca el título ",
    title1Bold2: "inundación",
    title1Mid2: " o ",
    title1Bold3: "salvamento",
    title1Suffix: ". Esa marca se reporta a NMVTIS y se supone que sigue al auto de por vida.",
    title2Pre: "El problema es el ",
    title2Bold: "lavado de título",
    title2Suffix: ". Los operadores compran autos inundados en subasta de salvamento, los secan y los re-registran en estados con reglas más débiles de transferencia de marca — a veces obteniendo un nuevo título de papel \"limpio\". NMVTIS fue construido para interrumpir exactamente esto preservando el historial original de marca.",
    title3: "Después del Huracán Katrina (2005), Harvey (2017) e Ian (2022), los investigadores rastrearon miles de autos inundados que terminaron re-titulados lejos de la zona del desastre y vendidos en meses. Una verificación VIN de inundación es tu defensa principal contra ese fraude.",
    pathCardTitle: "El camino de inundación a título",
    pathRows: [
      { label: "El agua alcanza", value: "piso o más" },
      { label: "Aseguradora declara", value: "pérdida total" },
      { label: "Título marcado", value: "Inundación / Salvamento" },
    ],
    pathCardNote: "Una vez que la marca llega a NMVTIS se supone que permanece con el VIN a nivel nacional — incluso después de un intento de re-titulación en otro estado.",
    h2Signs: "Señales de daño por inundación oculto",
    signsIntro: "Incluso un resultado VIN limpio merece una mirada presencial cuando un auto viene de una región propensa a inundaciones. Una preparación sofisticada de inundación puede hacer que un vehículo se vea impecable hasta que los problemas eléctricos surgen semanas después.",
    signs: [
      { title: "Olor a moho o humedad", body: "Especialmente bajo la alfombra, en la cajuela y detrás de paneles interiores — un olor que persiste incluso después de una limpieza fuerte o ambientadores destinados a enmascararlo." },
      { title: "Líneas de marea de agua", body: "Marcas horizontales tenues dentro de paneles de puertas, debajo de asientos, en el compartimento del motor o en el pozo de la llanta de repuesto que muestran hasta dónde subió el agua." },
      { title: "Conectores corroídos", body: "Oxidación verde-blanca en enchufes de cableado, cajas de fusibles y puntos de tierra — un signo revelador de sumersión que es difícil de limpiar completamente." },
      { title: "Óxido en lugares extraños", body: "Óxido prematuro en rieles de tornillos de asientos, sujetadores del piso, líneas de freno o soportes bajo el tablero apunta a intrusión de agua, no edad normal." },
      { title: "Alfombra o molduras nuevas", body: "Alfombras, asientos o forros del techo recién reemplazados en un auto por lo demás más antiguo puede significar una restauración por inundación destinada a ocultar el daño." },
      { title: "Fallas electrónicas", body: "Luces de advertencia intermitentes, infotainment defectuoso y fallas de HVAC o accesorios eléctricos son comunes a medida que la corrosión se extiende por el cableado." },
    ],
    midCtaHeading: "¿Este auto específico fue inundado?",
    midCtaSub: "No tomes la palabra del vendedor. Ejecuta el VIN y ve el registro de inundación y título directo de fuentes NMVTIS — gratis, en segundos.",
    h2Chain: "Cómo los registros de inundación llegan a tu reporte VIN",
    chainIntro: "Una vez que un auto se inunda y se reclama, el evento fluye a través de varios reportadores al registro permanente del VIN. Esa redundancia es por qué una inundación es difícil de ocultar.",
    chain: [
      "Las aseguradoras generalmente están obligadas a reportar una pérdida total relacionada con inundación a NMVTIS dentro de un plazo establecido después de la declaración.",
      "Las empresas de subastas de salvamento como Copart e IAA reportan los vehículos inundados que reciben — un canal importante después de huracanes y tormentas.",
      "Las agencias estatales de vehículos motorizados marcan el título 'Inundación,' 'Daño por agua' o 'Salvamento,' creando un registro permanente vinculado al VIN.",
      "NMVTIS lo agrega todo, así que una marca reportada en un estado permanece visible incluso después de que el auto se mueva y se re-titule en otro lado.",
    ],
    chainBoldLead: "Ninguna base de datos individual es perfecta.",
    chainNoteRest: " Un auto inundado que nunca fue asegurado ni reclamado todavía puede llevar un título limpio — pero como NMVTIS extrae de los 50 DMV estatales, aseguradoras, deshuesaderos y subastas de salvamento a la vez, una verificación VIN de múltiples fuentes es la forma más exhaustiva de mostrar una inundación previa, incluso después de un re-titulación.",
    h2States: "De dónde vienen los autos inundados — y dónde terminan",
    states1Pre: "Las concentraciones de vehículos inundados siguen la geografía de eventos climáticos mayores. Los estados del Golfo de México — ",
    states1Bold: "Texas, Louisiana, Florida y Mississippi",
    states1Suffix: " — tienen las tasas más altas de vehículos con marca de inundación gracias a la repetida actividad de huracanes.",
    states2: "Pero los autos inundados no se quedan donde fueron dañados. Migran a mercados de autos usados de todo el país, a menudo apareciendo en lotes de concesionarios a cientos de millas de la zona del desastre original, en estados donde los compradores están mucho menos alerta al historial de inundación.",
    states3: "Después del Huracán Harvey en 2017, los investigadores documentaron vehículos inundados apareciendo desde California hasta Massachusetts dentro de los 90 días de la tormenta. Esa migración a nivel nacional es exactamente por qué una verificación VIN de inundación importa sin importar dónde vivas.",
    statesCardTitle: "Estados de origen de mayor riesgo",
    statesList: [
      "Texas — repetidos huracanes e inundaciones tierra adentro",
      "Louisiana — tormentas del Golfo y terreno bajo",
      "Florida — huracanes e inundación por marejada",
      "Mississippi — exposición a huracanes de la Costa del Golfo",
      "Otras zonas costeras y de cuencas de ríos",
    ],
    statesCardNote: "Un auto en venta lejos de estos estados todavía puede tener historial de inundación — el VIN es lo que lo revela.",
    h2Danger: "Por qué los autos inundados son peligrosos a largo plazo",
    dangerIntro: "El peligro de un auto inundado no siempre es inmediato. La corrosión se desarrolla a lo largo de meses y años, convirtiendo un auto que funciona bien hoy en uno impredecible mañana.",
    dangers: [
      { title: "Electrónicos corroídos", body: "La intrusión de agua en cableados y módulos de control crea corrosión que causa fallas intermitentes y difíciles de diagnosticar en motor, transmisión, ABS y sistemas de tracción." },
      { title: "Sistemas de seguridad comprometidos", body: "Componentes de bolsa de aire y SRS dañados por agua pueden fallar al desplegarse en un choque — o desplegarse inesperadamente. Combinado con óxido estructural oculto, eso hace que un auto inundado sea genuinamente peligroso." },
      { title: "El VIN dice la verdad", body: "Incluso si el lavado de título produjo un título de papel limpio, el registro NMVTIS de inundación o salvamento todavía aparece en un reporte de historial VIN de múltiples fuentes." },
    ],
    dangerNoteBoldLead: "¿Comprando usado?",
    dangerNoteMid1: " Combina esto con una ",
    dangerNoteLink1: "verificación de historial de accidentes",
    dangerNoteMid2: " y una ",
    dangerNoteLink2: "verificación de vehículo robado",
    dangerNoteSuffix: " para capturar tanto daño por agua como cualquier incidente adicional antes de comprar.",
    h2Inspect: "¿Compra propensa a inundación? Inspecciona antes de pagar",
    inspect1Pre: "Una verificación VIN de inundación es el primer y más importante paso, pero no es el último. Un auto inundado que nunca fue asegurado ni reclamado puede colarse con un ",
    inspect1Bold: "título limpio",
    inspect1Suffix: ", así que una inspección presencial respalda los datos.",
    inspect2Pre: "Combina la verificación de inundación con una ",
    inspect2Link1: "verificación de título de salvamento",
    inspect2Mid: " y un ",
    inspect2Link2: "reporte completo de historial VIN",
    inspect2Suffix: " para la imagen más completa del historial de daños de cualquier vehículo.",
    inspect3: "En caso de duda, paga a un mecánico de confianza por una inspección previa a la compra enfocada en intrusión de agua. Unos dólares por adelantado son mucho más baratos que años persiguiendo problemas eléctricos.",
    inspectCardTitle: "Lista de verificación de inspección por inundación",
    inspectChecklist: [
      "Ejecuta el VIN para marcas de inundación, daño por agua y salvamento primero",
      "Huele la cabina y cajuela por moho, especialmente con ventanas cerradas",
      "Levanta los bordes de la alfombra y verifica el pozo de llanta de repuesto por sedimento o manchas",
      "Inspecciona conectores de cableado y puntos de tierra por corrosión verde",
      "Prueba cada accesorio eléctrico, luz y el sistema HVAC",
      "Haz que un mecánico inspeccione un auto propenso a inundación antes de pagar",
    ],
    inspectCardCta: "Verifica el historial de inundación por VIN primero:",
    h2Internal: "Más verificaciones VIN que se combinan con una verificación de inundación",
    internalIntro: "El daño por inundación es un capítulo de la historia de un auto. Estas verificaciones llenan el resto.",
    internalLinks: [
      { href: "/salvage-title-check", label: "Verificación título salvamento", desc: "Confirma si el daño por inundación produjo una marca de salvamento, chatarra o no reparable." },
      { href: "/total-loss-check", label: "Verificación pérdida total", desc: "Mira si una aseguradora declaró pérdida total el auto después de un evento de inundación o tormenta." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Título, inundación, accidente, odómetro y registros de recalls en un reporte." },
      { href: "/accident-history-check", label: "Verificación historial accidentes", desc: "Captura eventos de colisión y daño junto con el historial de inundación." },
      { href: "/stolen-vehicle-check", label: "Verificación vehículo robado", desc: "Verifica que el auto no esté reportado como robado antes de comprometerte a una compra." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica el VIN de 17 caracteres a especificaciones, equipamiento y opciones de fábrica." },
    ],
    h2Faq: "Verificación de daño por inundación — Preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen los compradores al verificar un auto por daño de agua.",
    bottomBadge: "Gratis · Instantáneo · Fuente NMVTIS",
    ctaBottomHeading: "¿Este auto fue inundado? Descúbrelo ahora.",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres para verificar marcas de título por inundación y daño por agua, registros de salvamento por huracán e historial de pérdida total del seguro.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Gratis",
  },
  fr: {
    home: "Accueil", crumb: "Vérification d'inondation",
    badge: "Recherche de dégâts d'eau   ·   Source NMVTIS",
    h1Lead: "Vérification de dégâts d'inondation par VIN — ",
    h1Accent: "Cette voiture a-t-elle été inondée ?",
    intro: "Après chaque ouragan et inondation majeure, des milliers de voitures endommagées par l'eau sont séchées, nettoyées et expédiées vers des états où les acheteurs ne le voient jamais venir. Saisis un VIN de 17 caractères pour révéler les marques de titre d'inondation et de dégâts d'eau, les registres de salvage d'ouragan et l'historique de perte totale d'assurance — gratuit, avant d'acheter.",
    formHeading: "Vérifie l'historique d'inondation et de dégâts d'eau par VIN",
    formSub: "Saisis n'importe quel VIN de 17 caractères — nous vérifierons les marques d'inondation, dégâts d'eau et dégâts de tempête plus les registres de salvage",
    formNote: "Gratuit · Sans inscription · Résultat instantané",
    trustStats: [
      { icon: Database, value: "50 états", label: "sources NMVTIS" },
      { icon: Waves, value: "Inondation", label: "et marques dégâts d'eau" },
      { icon: Shield, value: "Ouragan", label: "registres de salvage" },
      { icon: BadgeCheck, value: "Gratuit", label: "sans inscription" },
    ],
    h2How: "Comment fonctionne une vérification VIN d'inondation",
    howIntro: "Une marque d'inondation suit le VIN de la voiture à vie. Trois étapes transforment ce registre en une réponse claire avant que tu ne mettes de l'argent.",
    howSteps: [
      { tag: "Étape 1", title: "Saisis le VIN", body: "Tape le VIN de 17 caractères du tableau de bord, montant de porte, titre ou carte d'assurance. La vérification est liée au VIN, donc une marque d'inondation apparaît même après que la voiture soit séchée et re-titrée dans un autre état." },
      { tag: "Étape 2", title: "Nous interrogeons le registre d'inondation", body: "La recherche extrait de NMVTIS — qui agrège les 50 DMV étatiques, assureurs, casses et enchères de salvage — les marques d'inondation, dégâts d'eau et dégâts de tempête plus les pertes totales liées à l'inondation." },
      { tag: "Étape 3", title: "Lis le verdict", body: "Vois si la voiture porte une marque d'inondation ou de dégâts d'eau ou un registre de salvage lié à l'inondation — et décide si elle nécessite une inspection en personne avant de mettre de l'argent." },
    ],
    h2Title: "Comment les dégâts d'inondation entrent dans le système de titres",
    titleIntro: "Quand l'eau atteint le plancher ou plus haut, les assureurs déclarent presque toujours la voiture en perte totale. Cette décision est ce qui crée le registre permanent d'inondation lié au VIN — et ce que le blanchiment de titre essaie d'effacer.",
    title1Pre: "Quand un véhicule est submergé, l'assureur paie typiquement au titulaire de la police la ",
    title1Bold1: "valeur réelle en espèces",
    title1Mid: ", prend possession de l'épave et marque le titre ",
    title1Bold2: "inondation",
    title1Mid2: " ou ",
    title1Bold3: "salvage",
    title1Suffix: ". Cette marque est signalée à NMVTIS et est censée suivre la voiture à vie.",
    title2Pre: "Le problème est le ",
    title2Bold: "blanchiment de titre",
    title2Suffix: ". Les opérateurs achètent des voitures inondées aux enchères de salvage, les sèchent et les ré-immatriculent dans des états avec des règles plus faibles de transfert de marque — obtenant parfois un nouveau titre papier « propre ». NMVTIS a été conçu pour perturber exactement cela en préservant l'historique original de marque.",
    title3: "Après l'ouragan Katrina (2005), Harvey (2017) et Ian (2022), les enquêteurs ont suivi des milliers de voitures inondées qui se sont retrouvées re-titrées loin de la zone de désastre et vendues en quelques mois. Une vérification VIN d'inondation est ta défense principale contre cette fraude.",
    pathCardTitle: "Le chemin inondation-vers-titre",
    pathRows: [
      { label: "L'eau atteint", value: "plancher+" },
      { label: "Assureur déclare", value: "perte totale" },
      { label: "Titre marqué", value: "Inondation / Salvage" },
    ],
    pathCardNote: "Une fois que la marque atteint NMVTIS, elle est censée rester avec le VIN à l'échelle nationale — même après une tentative de re-titrage dans un autre état.",
    h2Signs: "Signes de dégâts d'inondation cachés",
    signsIntro: "Même un résultat VIN propre mérite un regard en personne quand une voiture vient d'une région sujette aux inondations. Une préparation sophistiquée d'inondation peut faire paraître un véhicule impeccable jusqu'à ce que les problèmes électriques surgissent des semaines plus tard.",
    signs: [
      { title: "Odeur de moisi ou moisissure", body: "Surtout sous le tapis, dans le coffre et derrière les panneaux intérieurs — une odeur qui persiste même après un nettoyage intensif ou des désodorisants destinés à la masquer." },
      { title: "Lignes de marée de tâches d'eau", body: "Marques horizontales faibles à l'intérieur des panneaux de porte, sous les sièges, dans le compartiment moteur ou dans le puits de roue de secours qui montrent jusqu'où l'eau est montée." },
      { title: "Connecteurs corrodés", body: "Oxydation vert-blanc sur les fiches de harnais de câblage, boîtes à fusibles et points de masse — un signe révélateur de submersion difficile à nettoyer complètement." },
      { title: "Rouille dans des endroits étranges", body: "Rouille prématurée sur les rails de boulons de siège, fixations du plancher, conduites de frein ou supports sous le tableau de bord pointe vers une intrusion d'eau, pas un vieillissement normal." },
      { title: "Tapis ou garnitures neufs", body: "Tapis, sièges ou ciel de toit récemment remplacés sur une voiture par ailleurs plus ancienne peut signifier une réfection d'inondation destinée à cacher les dégâts." },
      { title: "Pannes électroniques", body: "Voyants d'avertissement intermittents, info-divertissement défaillant et pannes HVAC ou accessoires électriques sont courants à mesure que la corrosion se propage dans le harnais." },
    ],
    midCtaHeading: "Cette voiture spécifique a-t-elle été inondée ?",
    midCtaSub: "Ne crois pas le vendeur sur parole. Exécute le VIN et vois le registre d'inondation et de titre directement à partir des sources NMVTIS — gratuit, en quelques secondes.",
    h2Chain: "Comment les registres d'inondation atteignent ton rapport VIN",
    chainIntro: "Une fois qu'une voiture est inondée et réclamée, l'événement coule à travers plusieurs déclarants vers le registre permanent du VIN. Cette redondance est pourquoi une inondation est difficile à cacher.",
    chain: [
      "Les assureurs sont généralement tenus de signaler une perte totale liée à l'inondation à NMVTIS dans un délai défini après la déclaration.",
      "Les sociétés d'enchères de salvage comme Copart et IAA signalent les véhicules inondés qu'elles reçoivent — un canal majeur après les ouragans et tempêtes.",
      "Les agences d'état des véhicules motorisés marquent le titre « Inondation », « Dégâts d'eau » ou « Salvage », créant un registre permanent lié au VIN.",
      "NMVTIS agrège tout cela, donc une marque signalée dans un état reste visible même après que la voiture soit déplacée et re-titrée ailleurs.",
    ],
    chainBoldLead: "Aucune base de données unique n'est parfaite.",
    chainNoteRest: " Une voiture inondée qui n'a jamais été assurée ni réclamée peut quand même porter un titre propre — mais comme NMVTIS extrait des 50 DMV étatiques, assureurs, casses et enchères de salvage à la fois, une vérification VIN multi-sources est la façon la plus approfondie de révéler une inondation antérieure, même après un re-titrage.",
    h2States: "D'où viennent les voitures inondées — et où elles finissent",
    states1Pre: "Les concentrations de véhicules inondés suivent la géographie des événements météorologiques majeurs. Les états de la côte du Golfe — ",
    states1Bold: "Texas, Louisiane, Floride et Mississippi",
    states1Suffix: " — ont les taux les plus élevés de véhicules marqués inondation grâce à l'activité répétée d'ouragans.",
    states2: "Mais les voitures inondées ne restent pas où elles ont été endommagées. Elles migrent vers les marchés d'occasion à travers le pays, apparaissant souvent sur les lots de concessionnaires à des centaines de miles de la zone du désastre original, dans des états où les acheteurs sont beaucoup moins alertes à l'historique d'inondation.",
    states3: "Après l'ouragan Harvey en 2017, les enquêteurs ont documenté des véhicules inondés apparaissant de la Californie au Massachusetts dans les 90 jours suivant la tempête. Cette migration à l'échelle nationale est exactement pourquoi une vérification d'inondation basée sur le VIN importe peu importe où tu vis.",
    statesCardTitle: "États d'origine à plus haut risque",
    statesList: [
      "Texas — ouragans répétés et inondations intérieures",
      "Louisiane — tempêtes du Golfe et terrain bas",
      "Floride — ouragans et inondation par onde de tempête",
      "Mississippi — exposition aux ouragans de la côte du Golfe",
      "Autres zones côtières et bassins fluviaux",
    ],
    statesCardNote: "Une voiture à vendre loin de ces états peut quand même avoir un historique d'inondation — le VIN est ce qui le révèle.",
    h2Danger: "Pourquoi les voitures inondées sont dangereuses à long terme",
    dangerIntro: "Le danger d'une voiture inondée n'est pas toujours immédiat. La corrosion se développe sur des mois et des années, transformant une voiture qui roule bien aujourd'hui en une voiture imprévisible demain.",
    dangers: [
      { title: "Électronique corrodée", body: "L'intrusion d'eau dans les harnais de câblage et modules de contrôle crée une corrosion qui cause des pannes intermittentes et difficiles à diagnostiquer dans le moteur, la transmission, l'ABS et les systèmes de traction." },
      { title: "Systèmes de sécurité compromis", body: "Les composants d'airbag et SRS endommagés par l'eau peuvent ne pas se déployer en cas de collision — ou se déployer de façon inattendue. Combiné avec la rouille structurelle cachée, cela rend une voiture inondée véritablement dangereuse." },
      { title: "Le VIN dit la vérité", body: "Même si le blanchiment de titre a produit un titre papier propre, le registre NMVTIS d'inondation ou de salvage apparaît toujours dans un rapport d'historique VIN multi-sources." },
    ],
    dangerNoteBoldLead: "Tu achètes d'occasion ?",
    dangerNoteMid1: " Combine cela avec une ",
    dangerNoteLink1: "vérification d'historique d'accidents",
    dangerNoteMid2: " et une ",
    dangerNoteLink2: "vérification de véhicule volé",
    dangerNoteSuffix: " pour capturer à la fois les dégâts d'eau et tout incident supplémentaire avant d'acheter.",
    h2Inspect: "Achat sujet à l'inondation ? Inspecte avant de payer",
    inspect1Pre: "Une vérification VIN d'inondation est la première et la plus importante étape, mais ce n'est pas la dernière. Une voiture inondée qui n'a jamais été assurée ni réclamée peut passer à travers avec un ",
    inspect1Bold: "titre propre",
    inspect1Suffix: ", donc une inspection en personne soutient les données.",
    inspect2Pre: "Combine la vérification d'inondation avec une ",
    inspect2Link1: "vérification titre salvage",
    inspect2Mid: " et un ",
    inspect2Link2: "rapport complet d'historique VIN",
    inspect2Suffix: " pour l'image la plus complète de l'historique de dégâts de tout véhicule.",
    inspect3: "En cas de doute, paie un mécanicien de confiance pour une inspection avant achat axée sur l'intrusion d'eau. Quelques dollars d'avance sont bien moins chers que des années à pourchasser des problèmes électriques.",
    inspectCardTitle: "Liste d'inspection inondation",
    inspectChecklist: [
      "Exécute d'abord le VIN pour les marques d'inondation, dégâts d'eau et salvage",
      "Sens la cabine et le coffre pour la moisissure, surtout avec les vitres fermées",
      "Soulève les bords du tapis et vérifie le puits de roue de secours pour le limon ou les taches",
      "Inspecte les connecteurs de harnais et points de masse pour la corrosion verte",
      "Teste chaque accessoire électrique, lumière et le système HVAC",
      "Fais inspecter une voiture sujette à l'inondation par un mécanicien avant de payer",
    ],
    inspectCardCta: "Vérifie d'abord l'historique d'inondation par VIN :",
    h2Internal: "Plus de vérifications VIN qui s'associent à une vérification d'inondation",
    internalIntro: "Les dégâts d'inondation sont un chapitre de l'histoire d'une voiture. Ces vérifications remplissent le reste.",
    internalLinks: [
      { href: "/salvage-title-check", label: "Vérification titre salvage", desc: "Confirme si les dégâts d'inondation ont produit une marque salvage, ferraille ou non réparable." },
      { href: "/total-loss-check", label: "Vérification perte totale", desc: "Vois si un assureur a déclaré la voiture comme perte après un événement d'inondation ou tempête." },
      { href: "/vin-check", label: "Vérification complète de l'historique VIN", desc: "Titre, inondation, accident, odomètre et registres de rappels dans un rapport." },
      { href: "/accident-history-check", label: "Vérification historique accidents", desc: "Capture les événements de collision et dégâts aux côtés de l'historique d'inondation." },
      { href: "/stolen-vehicle-check", label: "Vérification véhicule volé", desc: "Vérifie que la voiture n'est pas signalée volée avant de t'engager dans un achat." },
      { href: "/vin-decoder", label: "Décodeur VIN", desc: "Décode le VIN de 17 caractères aux spécifications, finition et options d'usine." },
    ],
    h2Faq: "Vérification de dégâts d'inondation — Questions fréquentes",
    faqIntro: "Les questions que les acheteurs posent le plus en vérifiant une voiture pour les dégâts d'eau.",
    bottomBadge: "Gratuit · Instantané · Source NMVTIS",
    ctaBottomHeading: "Cette voiture a-t-elle été inondée ? Découvre-le maintenant.",
    ctaBottomSub: "Saisis un VIN de 17 caractères pour vérifier les marques de titre d'inondation et de dégâts d'eau, les registres de salvage d'ouragan et l'historique de perte totale d'assurance.",
    ctaBottomNote: "Sans carte de crédit · Sans inscription · Gratuit",
  },
} as const;

const FAQS_EN = [
  { question: "Does a VIN check show flood damage?", answer: "Yes, in most cases. A VIN check surfaces flood damage when a state DMV applied a 'Flood' or 'Water Damage' title brand, or when an insurer reported a flood-related total loss to NMVTIS. It also captures salvage-auction records from companies like Copart and IAA. The limit: a flood car that was never insured or claimed may still carry a clean title, so a physical inspection remains important." },
  { question: "What is a flood or water-damage title brand?", answer: "A flood or water-damage title brand is a permanent designation a state adds to a vehicle's title after it was significantly damaged by flooding, typically when water reached the floorboards or higher and an insurer declared it a total loss. Common brand wording includes 'Flood,' 'Water Damage,' and 'Storm Damage.' Once applied, the brand is reported to NMVTIS and is meant to follow the VIN for the life of the vehicle." },
  { question: "How can I spot a flood-damaged car?", answer: "Start with a VIN check for flood and salvage brands, then inspect in person. Look for a musty or mildew odor under the carpet and in the trunk, tide-line water stains inside door panels and the spare-tire well, greenish corrosion on electrical connectors and ground points, premature rust on seat bolts and brake lines, and recently replaced carpet or interior trim. Intermittent electrical glitches are another red flag." },
  { question: "Does NMVTIS show flood titles?", answer: "Yes. NMVTIS — the National Motor Vehicle Title Information System, administered by the U.S. Department of Justice — aggregates title-brand data from all 50 state DMVs plus insurance carriers, junk yards, and salvage auctions. It flags flood, water-damage, salvage, and junk brands. Because it pulls from every state, a flood brand reported by one state is visible even after the vehicle is moved or retitled elsewhere." },
  { question: "Can flood damage be hidden through title washing?", answer: "It can be attempted, but it is harder than it used to be. Title washing means re-titling a flood vehicle in a state with weaker brand-transfer rules to obtain a 'clean' title. NMVTIS was created specifically to disrupt this by preserving the original brand history regardless of where the current paper title was issued. A multi-source VIN check that draws on NMVTIS is the most reliable defense against a washed title." },
  { question: "Why are flood-damaged cars dangerous?", answer: "Flood water corrodes the wiring harnesses, control modules, and connectors that run nearly every modern vehicle system — engine management, ABS, traction control, and airbags. This corrosion develops over months, causing intermittent failures that are costly to diagnose. Water-damaged airbag and SRS components may fail to deploy or deploy unexpectedly, and trapped moisture promotes mold and structural rust, making a flood car genuinely hazardous to drive." },
  { question: "Are flood cars from hurricanes resold across state lines?", answer: "Yes. After major events like Hurricane Katrina, Harvey, and Ian, large numbers of flood-damaged vehicles are dried out and shipped to used-car markets far from the disaster zone, often in states where buyers are less alert to flood history. Gulf Coast states such as Texas, Louisiana, Florida, and Mississippi see the most flooding, but the affected vehicles migrate nationwide, which is why a VIN-based flood check matters anywhere." },
];

const FAQS_ES = [
  { question: "¿Una verificación VIN muestra daño por inundación?", answer: "Sí, en la mayoría de los casos. Una verificación VIN muestra daño por inundación cuando un DMV estatal aplicó una marca de título 'Inundación' o 'Daño por Agua', o cuando una aseguradora reportó una pérdida total relacionada con inundación a NMVTIS. También captura registros de subasta de salvamento de empresas como Copart e IAA. El límite: un auto inundado que nunca fue asegurado ni reclamado todavía puede llevar un título limpio, así que una inspección física sigue siendo importante." },
  { question: "¿Qué es una marca de título por inundación o daño por agua?", answer: "Una marca de título por inundación o daño por agua es una designación permanente que un estado agrega al título de un vehículo después de que fue dañado significativamente por inundación, típicamente cuando el agua alcanzó el piso o más alto y una aseguradora lo declaró pérdida total. La redacción común incluye 'Inundación', 'Daño por Agua' y 'Daño por Tormenta'. Una vez aplicada, la marca se reporta a NMVTIS y se supone que sigue al VIN de por vida del vehículo." },
  { question: "¿Cómo puedo detectar un auto dañado por inundación?", answer: "Comienza con una verificación VIN por marcas de inundación y salvamento, luego inspecciona en persona. Busca olor a moho o humedad bajo la alfombra y en la cajuela, manchas de agua en línea de marea dentro de paneles de puertas y el pozo de la llanta de repuesto, corrosión verdosa en conectores eléctricos y puntos de tierra, óxido prematuro en tornillos de asientos y líneas de freno, y alfombra o molduras interiores recién reemplazadas. Fallas eléctricas intermitentes son otra bandera roja." },
  { question: "¿NMVTIS muestra títulos de inundación?", answer: "Sí. NMVTIS — el Sistema Nacional de Información de Títulos de Vehículos Motorizados, administrado por el Departamento de Justicia de EE. UU. — agrega datos de marca de título de los 50 DMV estatales más aseguradoras, deshuesaderos y subastas de salvamento. Marca inundación, daño por agua, salvamento y chatarra. Como extrae de cada estado, una marca de inundación reportada por un estado es visible incluso después de que el vehículo se mueva o re-titule en otro lugar." },
  { question: "¿El daño por inundación puede ocultarse mediante lavado de título?", answer: "Puede intentarse, pero es más difícil de lo que solía ser. El lavado de título significa re-titular un vehículo inundado en un estado con reglas más débiles de transferencia de marca para obtener un título 'limpio'. NMVTIS fue creado específicamente para interrumpir esto preservando el historial original de marca sin importar dónde se emitió el título físico actual. Una verificación VIN de múltiples fuentes que se basa en NMVTIS es la defensa más confiable contra un título lavado." },
  { question: "¿Por qué los autos dañados por inundación son peligrosos?", answer: "El agua de inundación corroe los cableados, módulos de control y conectores que operan casi todos los sistemas del vehículo moderno — gestión del motor, ABS, control de tracción y bolsas de aire. Esta corrosión se desarrolla a lo largo de meses, causando fallas intermitentes que son costosas de diagnosticar. Componentes de bolsa de aire y SRS dañados por agua pueden fallar al desplegarse o desplegarse inesperadamente, y la humedad atrapada promueve moho y óxido estructural, haciendo un auto inundado genuinamente peligroso de conducir." },
  { question: "¿Los autos inundados por huracanes se revenden entre estados?", answer: "Sí. Después de eventos mayores como Huracán Katrina, Harvey e Ian, grandes cantidades de vehículos dañados por inundación se secan y se envían a mercados de autos usados lejos de la zona del desastre, a menudo en estados donde los compradores están menos alerta al historial de inundación. Estados de la Costa del Golfo como Texas, Louisiana, Florida y Mississippi ven la mayoría de las inundaciones, pero los vehículos afectados migran a nivel nacional, por lo que una verificación VIN de inundación importa en cualquier lugar." },
];

interface Props { locale: Locale; }

export default function FloodCheckBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Droplets className="w-4 h-4" /> {c.badge}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Title}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.titleIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.title1Pre}
                <strong className="text-on-surface">{c.title1Bold1}</strong>
                {c.title1Mid}
                <strong className="text-on-surface">{c.title1Bold2}</strong>
                {c.title1Mid2}
                <strong className="text-on-surface">{c.title1Bold3}</strong>
                {c.title1Suffix}
              </p>
              <p>
                {c.title2Pre}
                <strong className="text-on-surface">{c.title2Bold}</strong>
                {c.title2Suffix}
              </p>
              <p>{c.title3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Droplets className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.pathCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.pathRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.pathCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Signs}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.signsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.signs.map((s, i) => {
              const Icon = SIGN_ICONS[i];
              return (
                <div key={s.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                </div>
              );
            })}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Chain}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.chainIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.chain.map((item, i) => (
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
                <strong className="text-on-surface">{c.chainBoldLead}</strong>
                {c.chainNoteRest}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2States}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.states1Pre}
                <strong className="text-on-surface">{c.states1Bold}</strong>
                {c.states1Suffix}
              </p>
              <p>{c.states2}</p>
              <p>{c.states3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.statesCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.statesList.map((state) => (
                  <li key={state} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{state}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.statesCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Danger}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.dangerIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.dangers.map((item, i) => {
              const Icon = DANGER_ICONS[i];
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
                <strong className="text-on-surface">{c.dangerNoteBoldLead}</strong>
                {c.dangerNoteMid1}
                <Link href={link("/accident-history-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink1}</Link>
                {c.dangerNoteMid2}
                <Link href={link("/stolen-vehicle-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink2}</Link>
                {c.dangerNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Inspect}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.inspect1Pre}
                <strong className="text-on-surface">{c.inspect1Bold}</strong>
                {c.inspect1Suffix}
              </p>
              <p>
                {c.inspect2Pre}
                <Link href={link("/salvage-title-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.inspect2Link1}</Link>
                {c.inspect2Mid}
                <Link href={link("/vin-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.inspect2Link2}</Link>
                {c.inspect2Suffix}
              </p>
              <p>{c.inspect3}</p>
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

        <RelatedChecks exclude="/flood-check" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES };
