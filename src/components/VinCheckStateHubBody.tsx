/**
 * Shared body for /vin-check/state (and ES twin at /es/vin-check/state).
 * Wave 18.19 — full English layout in both locales via COPY={en,es}.
 *
 * State names stay in English (proper nouns). Title-brand glossary is
 * Spanish ("estado", "por estado", "marcas de título", "DMV") for the
 * chrome text.
 */

import Link from "next/link";
import {
  Check,
  Shield,
  Search,
  FileText,
  AlertCircle,
  Clock,
  Car,
  MapPin,
  ChevronRight,
  Star,
  Lock,
  Zap,
  BadgeCheck,
  Map,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { states } from "@/lib/states";
import StateFinder from "@/app/vin-check/state/_components/StateFinder";
import type { Locale } from "@/i18n/config";

const REPORT_ICONS = [FileText, AlertCircle, Search, Shield, Car, MapPin] as const;

const COPY = {
  en: {
    home: "Home",
    crumbVinCheck: "VIN Check",
    crumbByState: "By State",
    badge: "All 50 States  ·  NMVTIS Data",
    h1Lead: "VIN Check by State —",
    h1Accent: "Free, in Every State",
    intro:
      "Title rules and brands change at every state line. Find your state below for its local DMV rules, then run any 17-character VIN for an instant nationwide history report. Free, no credit card, results in under 5 seconds.",
    haveVinHeading: "Already have the VIN? Run it now",
    vinNote: "256-bit encrypted · DPPA compliant · No personal data stored",
    trustStats: [
      { icon: Map, value: "50", label: "states covered" },
      { icon: Shield, value: "NMVTIS", label: "certified data source" },
      { icon: Clock, value: "< 5 sec", label: "average report time" },
      { icon: BadgeCheck, value: "Free", label: "no credit card needed" },
    ],
    statsBlockHeading: "VIN Check by State — By the Numbers",
    headlineStats: [
      { value: "50", label: "State DMVs reporting into NMVTIS" },
      { value: "51", label: "States & territories covered" },
      { value: "<5 sec", label: "Average VIN decode time" },
      { value: "1 VIN", label: "One lookup covers every state" },
      { value: "$0", label: "Cost for the free preview" },
    ],
    whyHeading: "Why the State Matters on a VIN Check",
    whyP1Pre:
      "The lookup itself is nationwide: one VIN returns records from every state a vehicle has touched. What changes at each state line is the ",
    whyP1Bold: "law that defines what those records mean",
    whyP1Suffix:
      '. A vehicle declared a total loss in one state may carry a "salvage" brand; the identical damage in another state might be branded "reconstructed," "distressed," or not branded at all.',
    whyP2Pre: "That gap is exactly what makes ",
    whyP2Bold: "title washing",
    whyP2Mid: " possible: a branded car moved to a state with looser rules and re-titled so the brand disappears from the paper. NMVTIS, the federal ",
    whyP2LinkText: "National Motor Vehicle Title Information System",
    whyP2Suffix:
      " , was built to stop this by keeping the original brand attached to the VIN in the federal record no matter how many times the paper title is reissued. Reading a VIN report well means knowing the rules of the state that issued each title, which is why every state has its own page here.",
    reportHeading: "What a State-by-State VIN Report Includes",
    reportSub:
      "One report consolidates data from every state DMV, NMVTIS, NICB, NHTSA, and licensed insurance history providers.",
    reportItems: [
      { title: "Title History (All States)", desc: "Every title issued in all 50 states plus DC, including salvage, rebuilt, flood, and junk brands wherever they were recorded." },
      { title: "Accident Records", desc: "Collision data from insurance companies, repair facilities, and state DMV reports nationwide." },
      { title: "Odometer Readings", desc: "Mileage snapshots from every DMV transaction, inspection, and insurance event across state lines." },
      { title: "Theft Records", desc: "NICB stolen-vehicle database cross-reference covering every US state." },
      { title: "Recall Status", desc: "All open NHTSA safety recalls, the same federal data regardless of state." },
      { title: "State Title Brands", desc: "Brand terminology decoded per state so you know what a 'reconstructed' or 'distressed' title actually means." },
    ],
    howHeading: "How to Run a VIN Check in Any State — Step-by-Step",
    howSub:
      "The lookup is identical in all 50 states. The only state-specific step is reading the title brands against local rules.",
    howSteps: [
      { step: "01", title: "Find your state above", body: "Use the state finder to open the page for the state where the vehicle is currently titled. Each state page lists that DMV's exact title-brand terminology, lemon-law window, and any inspection requirements for salvage or rebuilt vehicles." },
      { step: "02", title: "Locate the VIN on the vehicle", body: "The 17-character VIN is on the dashboard (visible through the lower windshield), the driver-side door jamb sticker, and the title document. Confirm all three match, since a mismatch is a serious red flag in any state." },
      { step: "03", title: "Run the nationwide lookup", body: "Enter the VIN above. The query hits NMVTIS, every state DMV feed, NICB, and NHTSA at once, so it does not matter which state the car came from: the report is consolidated." },
      { step: "04", title: "Read title brands against state rules", body: "A brand only tells you what the issuing state decided. Cross-check each brand against that state's definition (linked on its page) so you know whether 'reconstructed' meant light repair or a near-total rebuild." },
      { step: "05", title: "Watch for cross-state gaps", body: "If the title jumped between states with a suspicious gap or a brand that vanished after a move, treat it as a title-washing warning and inspect closely before buying." },
    ],
    browseHeading: "Browse All 50 States by Region",
    browseSub:
      "Every state page covers its DMV name, exact title brands, lemon-law window, and a state-specific fact worth knowing before you buy.",
    vehiclesSuffix: "vehicles",
    regions: [
      { name: "West", slugs: ["california", "oregon", "washington", "nevada", "arizona", "idaho", "montana", "wyoming", "utah", "colorado", "new-mexico", "alaska", "hawaii"] },
      { name: "Midwest", slugs: ["illinois", "indiana", "iowa", "kansas", "michigan", "minnesota", "missouri", "nebraska", "north-dakota", "ohio", "south-dakota", "wisconsin"] },
      { name: "South", slugs: ["alabama", "arkansas", "florida", "georgia", "kentucky", "louisiana", "mississippi", "north-carolina", "oklahoma", "south-carolina", "tennessee", "texas", "virginia", "west-virginia"] },
      { name: "Northeast", slugs: ["connecticut", "delaware", "maine", "maryland", "massachusetts", "new-hampshire", "new-jersey", "new-york", "pennsylvania", "rhode-island", "vermont"] },
    ],
    ownerHeading: "VIN Owner Lookup — What Every State Allows (and Doesn't)",
    ownerCalloutPre: "The ",
    ownerCalloutBold: "federal Driver's Privacy Protection Act (DPPA, 18 U.S.C. § 2721)",
    ownerCalloutSuffix:
      " applies in all 50 states. Owner names, addresses, and phone numbers tied to vehicle registrations are protected private information. No consumer VIN lookup service, including ours, can legally return owner identity from a VIN search in any state. Any service claiming to do so is operating outside the law.",
    ownerBodyPre: "What a ",
    ownerBodyMid: "VIN owner lookup",
    ownerBodyEm: " can ",
    ownerBodySuffix: " legally provide, in every state:",
    ownerBullets: [
      "Number of previous owners (count, not names)",
      "Whether each title was issued to a private individual, dealer, or fleet/rental company",
      "State(s) where the vehicle was previously titled",
      "Approximate length of time each title was held",
      "Whether any title was issued to a business entity (rental, fleet, lease)",
    ],
    midCtaHeading: "Ready to Check a VIN?",
    midCtaSub:
      "One lookup covers every state. Free, instant, no credit card. Full vehicle history in under 5 seconds.",
    internalHeading: "More VIN Check Tools",
    internalSub: "Dig deeper into specific records that appear on a state-by-state report.",
    internalLinks: [
      { href: "/florida-vin-check", label: "Florida VIN Check", desc: "DHSMV title, flood, and salvage records for FL vehicles." },
      { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Detect salvage and rebuilt brands in any state." },
      { href: "/accident-history-check", label: "Accident History Check", desc: "Collision and damage records nationwide." },
      { href: "/flood-check", label: "Flood Damage Check", desc: "Water-damage title brands across all states." },
      { href: "/odometer-check", label: "Odometer Check", desc: "Detect rollback and mileage fraud." },
      { href: "/license-plate-lookup", label: "License Plate Lookup", desc: "Find the VIN from a plate in any state." },
      { href: "/lemon-check", label: "Lemon Law Buyback Check", desc: "Find manufacturer buyback records." },
      { href: "/vehicle-lien-check", label: "Lien Check", desc: "Verify outstanding loans on any vehicle." },
    ],
    faqHeading: "Frequently Asked Questions — VIN Check by State",
    faqSub:
      "How nationwide VIN history works across all 50 state DMVs, and why title rules differ from state to state.",
    bottomBadge: "Free · Instant · No Sign-Up",
    bottomHeading: "Check Any VIN in Any State",
    bottomSub:
      "Title washing crosses state lines so the brand disappears from the paper. One nationwide VIN check brings the full history back, in 5 seconds, for free.",
    sourcesHeading: "Sources & Data Authority",
    sourcesIntro:
      "Every claim on this page traces back to a public, authoritative US source. Below are the primary references behind a nationwide VIN check and the agencies you can cross-check with.",
    sourceItems: [
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: "Federal title system aggregating all 50 state DMVs." },
      { href: "https://www.nhtsa.gov/recalls", label: "NHTSA — Safety Recalls", note: "Authoritative open-recall database for every US VIN." },
      { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: "Stolen-vehicle & salvage reports from insurance carriers." },
      { href: "https://www.iihs.org/topics/auto-theft", label: "IIHS — Auto Theft Statistics", note: "Independent state-by-state vehicle-theft research." },
      { href: "https://www.law.cornell.edu/uscode/text/18/2721", label: "18 U.S.C. § 2721 (DPPA)", note: "Federal statute protecting owner identity in every state." },
      { href: "https://www.usa.gov/state-motor-vehicle-services", label: "USA.gov — State DMV Directory", note: "Official links to every state motor-vehicle agency." },
    ],
    sourcesFootnote:
      "Title-branding thresholds and disclosure rules are set by each state and change over time. Verify any state-specific figure directly with that state's DMV before relying on it.",
  },
  es: {
    home: "Inicio",
    crumbVinCheck: "Revisión VIN",
    crumbByState: "Por estado",
    badge: "Los 50 estados  ·  Datos NMVTIS",
    h1Lead: "Revisión VIN por estado —",
    h1Accent: "Gratis, en todos los estados",
    intro:
      "Las reglas de título y las marcas cambian en cada frontera estatal. Encuentra tu estado abajo para sus reglas locales del DMV, luego ejecuta cualquier VIN de 17 caracteres para un reporte nacional al instante. Gratis, sin tarjeta de crédito, resultados en menos de 5 segundos.",
    haveVinHeading: "¿Ya tienes el VIN? Ejecútalo ahora",
    vinNote: "Cifrado de 256 bits · Cumple con DPPA · No se guardan datos personales",
    trustStats: [
      { icon: Map, value: "50", label: "estados cubiertos" },
      { icon: Shield, value: "NMVTIS", label: "fuente de datos certificada" },
      { icon: Clock, value: "< 5 s", label: "tiempo promedio del reporte" },
      { icon: BadgeCheck, value: "Gratis", label: "sin tarjeta de crédito" },
    ],
    statsBlockHeading: "Revisión VIN por estado — En cifras",
    headlineStats: [
      { value: "50", label: "DMV estatales que reportan a NMVTIS" },
      { value: "51", label: "Estados y territorios cubiertos" },
      { value: "<5 s", label: "Tiempo promedio de decodificación VIN" },
      { value: "1 VIN", label: "Una búsqueda cubre cada estado" },
      { value: "$0", label: "Costo de la vista previa gratis" },
    ],
    whyHeading: "Por qué el estado importa en una revisión VIN",
    whyP1Pre:
      "La búsqueda en sí es nacional: un VIN devuelve registros de cada estado que el vehículo ha tocado. Lo que cambia en cada frontera estatal es la ",
    whyP1Bold: "ley que define qué significan esos registros",
    whyP1Suffix:
      '. Un vehículo declarado pérdida total en un estado puede llevar una marca "salvamento"; el daño idéntico en otro estado puede marcarse como "reconstruido", "distressed" o no marcarse en absoluto.',
    whyP2Pre: "Esa brecha es exactamente lo que hace posible el ",
    whyP2Bold: "lavado de título",
    whyP2Mid: ": un auto marcado movido a un estado con reglas más laxas y re-titulado para que la marca desaparezca del papel. NMVTIS, el federal ",
    whyP2LinkText: "Sistema Nacional de Información de Títulos de Vehículos Motorizados",
    whyP2Suffix:
      ", fue construido para detener esto manteniendo la marca original adjunta al VIN en el registro federal sin importar cuántas veces se reemita el título físico. Leer bien un reporte VIN significa conocer las reglas del estado que emitió cada título, por eso cada estado tiene su propia página aquí.",
    reportHeading: "Qué incluye un reporte VIN por estado",
    reportSub:
      "Un solo reporte consolida datos de cada DMV estatal, NMVTIS, NICB, NHTSA y proveedores licenciados de historial de seguros.",
    reportItems: [
      { title: "Historial de título (todos los estados)", desc: "Cada título emitido en los 50 estados más DC, incluyendo marcas de salvamento, reconstruido, inundación y chatarra dondequiera que se hayan registrado." },
      { title: "Registros de accidentes", desc: "Datos de colisiones de aseguradoras, talleres de reparación y reportes de DMV estatales a nivel nacional." },
      { title: "Lecturas del odómetro", desc: "Capturas de kilometraje de cada transacción del DMV, inspección y evento de seguro a través de fronteras estatales." },
      { title: "Registros de robo", desc: "Cruce con la base de datos de vehículos robados de NICB cubriendo cada estado de EE. UU." },
      { title: "Estado de retiros", desc: "Todos los retiros de seguridad abiertos de NHTSA, los mismos datos federales sin importar el estado." },
      { title: "Marcas de título por estado", desc: "Terminología de marcas decodificada por estado para que sepas qué significa realmente un título 'reconstruido' o 'distressed'." },
    ],
    howHeading: "Cómo hacer una revisión VIN en cualquier estado — Paso a paso",
    howSub:
      "La búsqueda es idéntica en los 50 estados. El único paso específico del estado es leer las marcas de título contra las reglas locales.",
    howSteps: [
      { step: "01", title: "Encuentra tu estado arriba", body: "Usa el buscador de estados para abrir la página del estado donde el vehículo está titulado actualmente. Cada página estatal lista la terminología exacta de marcas de título del DMV, el plazo de la Lemon Law y cualquier requisito de inspección para vehículos de salvamento o reconstruidos." },
      { step: "02", title: "Localiza el VIN en el vehículo", body: "El VIN de 17 caracteres está en el tablero (visible por el parabrisas inferior), la calcomanía del marco de la puerta del lado del conductor y el documento del título. Confirma que los tres coincidan, ya que una discrepancia es una bandera roja seria en cualquier estado." },
      { step: "03", title: "Ejecuta la búsqueda nacional", body: "Ingresa el VIN arriba. La consulta golpea NMVTIS, cada feed de DMV estatal, NICB y NHTSA a la vez, así que no importa de qué estado vino el auto: el reporte está consolidado." },
      { step: "04", title: "Lee las marcas de título contra las reglas estatales", body: "Una marca solo te dice lo que decidió el estado emisor. Coteja cada marca contra la definición de ese estado (enlazada en su página) para que sepas si 'reconstruido' significó reparación ligera o una reconstrucción casi total." },
      { step: "05", title: "Vigila brechas entre estados", body: "Si el título saltó entre estados con una brecha sospechosa o una marca que desapareció después de una mudanza, trátalo como una advertencia de lavado de título e inspecciona de cerca antes de comprar." },
    ],
    browseHeading: "Explora los 50 estados por región",
    browseSub:
      "Cada página estatal cubre el nombre de su DMV, las marcas exactas de título, el plazo de la Lemon Law y un dato específico del estado que vale la pena saber antes de comprar.",
    vehiclesSuffix: "vehículos",
    regions: [
      { name: "Oeste", slugs: ["california", "oregon", "washington", "nevada", "arizona", "idaho", "montana", "wyoming", "utah", "colorado", "new-mexico", "alaska", "hawaii"] },
      { name: "Medio Oeste", slugs: ["illinois", "indiana", "iowa", "kansas", "michigan", "minnesota", "missouri", "nebraska", "north-dakota", "ohio", "south-dakota", "wisconsin"] },
      { name: "Sur", slugs: ["alabama", "arkansas", "florida", "georgia", "kentucky", "louisiana", "mississippi", "north-carolina", "oklahoma", "south-carolina", "tennessee", "texas", "virginia", "west-virginia"] },
      { name: "Noreste", slugs: ["connecticut", "delaware", "maine", "maryland", "massachusetts", "new-hampshire", "new-jersey", "new-york", "pennsylvania", "rhode-island", "vermont"] },
    ],
    ownerHeading: "Búsqueda de propietario por VIN — Qué permite cada estado (y qué no)",
    ownerCalloutPre: "La ",
    ownerCalloutBold: "Ley federal de Protección de Privacidad del Conductor (DPPA, 18 U.S.C. § 2721)",
    ownerCalloutSuffix:
      " aplica en los 50 estados. Los nombres, direcciones y números de teléfono de los propietarios ligados a registros vehiculares son información privada protegida. Ningún servicio de búsqueda VIN para consumidores, incluido el nuestro, puede legalmente devolver la identidad del propietario desde una búsqueda VIN en ningún estado. Cualquier servicio que afirme hacerlo está operando fuera de la ley.",
    ownerBodyPre: "Lo que una ",
    ownerBodyMid: "búsqueda de propietario por VIN",
    ownerBodyEm: " sí ",
    ownerBodySuffix: " puede proporcionar legalmente, en cada estado:",
    ownerBullets: [
      "Número de propietarios anteriores (cantidad, no nombres)",
      "Si cada título se emitió a un particular, concesionario o empresa de flota/renta",
      "Estado(s) donde el vehículo fue titulado previamente",
      "Tiempo aproximado que cada título estuvo en manos",
      "Si algún título se emitió a una entidad empresarial (renta, flota, leasing)",
    ],
    midCtaHeading: "¿Listo para revisar un VIN?",
    midCtaSub:
      "Una búsqueda cubre cada estado. Gratis, instantáneo, sin tarjeta de crédito. Historial completo del vehículo en menos de 5 segundos.",
    internalHeading: "Más herramientas de revisión VIN",
    internalSub: "Profundiza en registros específicos que aparecen en un reporte por estado.",
    internalLinks: [
      { href: "/florida-vin-check", label: "Revisión VIN Florida", desc: "Registros de título, inundación y salvamento del DHSMV para vehículos de FL." },
      { href: "/salvage-title-check", label: "Verificación título salvamento", desc: "Detecta marcas de salvamento y reconstruido en cualquier estado." },
      { href: "/accident-history-check", label: "Verificación historial accidentes", desc: "Registros de colisiones y daños a nivel nacional." },
      { href: "/flood-check", label: "Verificación daño por inundación", desc: "Marcas de título por daño de agua en todos los estados." },
      { href: "/odometer-check", label: "Verificación odómetro", desc: "Detecta rollback y fraude de kilometraje." },
      { href: "/license-plate-lookup", label: "Búsqueda por placa", desc: "Encuentra el VIN desde una placa en cualquier estado." },
      { href: "/lemon-check", label: "Verificación recompra Lemon Law", desc: "Encuentra registros de recompra del fabricante." },
      { href: "/vehicle-lien-check", label: "Verificación de gravamen", desc: "Verifica préstamos pendientes en cualquier vehículo." },
    ],
    faqHeading: "Preguntas frecuentes — Revisión VIN por estado",
    faqSub:
      "Cómo funciona el historial VIN nacional a través de los 50 DMV estatales y por qué las reglas de título difieren de un estado a otro.",
    bottomBadge: "Gratis · Instantáneo · Sin registro",
    bottomHeading: "Verifica cualquier VIN en cualquier estado",
    bottomSub:
      "El lavado de título cruza fronteras estatales para que la marca desaparezca del papel. Una revisión VIN nacional trae el historial completo de vuelta, en 5 segundos, gratis.",
    sourcesHeading: "Fuentes y autoridad de datos",
    sourcesIntro:
      "Cada afirmación en esta página se rastrea a una fuente pública y autorizada de EE. UU. Abajo están las referencias principales detrás de una revisión VIN nacional y las agencias con las que puedes cotejar.",
    sourceItems: [
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: "Sistema federal de títulos que agrega los 50 DMV estatales." },
      { href: "https://www.nhtsa.gov/recalls", label: "NHTSA — Retiros de seguridad", note: "Base autorizada de retiros abiertos para cada VIN de EE. UU." },
      { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: "Reportes de vehículos robados y salvamento de aseguradoras." },
      { href: "https://www.iihs.org/topics/auto-theft", label: "IIHS — Estadísticas de robo de autos", note: "Investigación independiente de robo de vehículos por estado." },
      { href: "https://www.law.cornell.edu/uscode/text/18/2721", label: "18 U.S.C. § 2721 (DPPA)", note: "Estatuto federal que protege la identidad del propietario en cada estado." },
      { href: "https://www.usa.gov/state-motor-vehicle-services", label: "USA.gov — Directorio de DMV estatales", note: "Enlaces oficiales a cada agencia de vehículos motorizados estatal." },
    ],
    sourcesFootnote:
      "Los umbrales de marcas de título y las reglas de divulgación los establece cada estado y cambian con el tiempo. Verifica cualquier cifra específica del estado directamente con el DMV de ese estado antes de confiar en ella.",
  },
  fr: {
    home: "Accueil",
    crumbVinCheck: "Vérification VIN",
    crumbByState: "Par État",
    badge: "Les 50 États  ·  Données NMVTIS",
    h1Lead: "Vérification VIN par État —",
    h1Accent: "Gratuit, dans chaque État",
    intro:
      "Les règles de titre et les marques changent à chaque frontière d'État. Trouve ton État ci-dessous pour ses règles locales du DMV, puis lance n'importe quel VIN de 17 caractères pour un rapport d'historique national instantané. Gratuit, sans carte de crédit, résultats en moins de 5 secondes.",
    haveVinHeading: "Tu as déjà le VIN ? Lance-le maintenant",
    vinNote: "Chiffré 256 bits · Conforme DPPA · Aucune donnée personnelle stockée",
    trustStats: [
      { icon: Map, value: "50", label: "États couverts" },
      { icon: Shield, value: "NMVTIS", label: "source de données certifiée" },
      { icon: Clock, value: "< 5 sec", label: "temps moyen du rapport" },
      { icon: BadgeCheck, value: "Gratuit", label: "sans carte de crédit" },
    ],
    statsBlockHeading: "Vérification VIN par État — En chiffres",
    headlineStats: [
      { value: "50", label: "DMV étatiques rapportant à NMVTIS" },
      { value: "51", label: "États et territoires couverts" },
      { value: "<5 sec", label: "Temps moyen de décodage VIN" },
      { value: "1 VIN", label: "Une recherche couvre chaque État" },
      { value: "$0", label: "Coût pour l'aperçu gratuit" },
    ],
    whyHeading: "Pourquoi l'État compte sur une vérification VIN",
    whyP1Pre:
      "La recherche en elle-même est nationale : un VIN retourne les registres de chaque État qu'un véhicule a touché. Ce qui change à chaque frontière d'État est la ",
    whyP1Bold: "loi qui définit ce que signifient ces registres",
    whyP1Suffix:
      ". Un véhicule déclaré perte totale dans un État peut porter une marque \"épave\" ; un dégât identique dans un autre État peut être marqué \"reconstruit\", \"distressed\" ou pas marqué du tout.",
    whyP2Pre: "Cet écart est exactement ce qui rend possible le ",
    whyP2Bold: "lavage de titre",
    whyP2Mid: " : une voiture marquée déplacée vers un État avec des règles plus laxistes et re-titrée pour que la marque disparaisse du papier. NMVTIS, le fédéral ",
    whyP2LinkText: "National Motor Vehicle Title Information System",
    whyP2Suffix:
      " , a été bâti pour arrêter cela en gardant la marque originale attachée au VIN dans le registre fédéral peu importe combien de fois le titre papier est réémis. Bien lire un rapport VIN signifie connaître les règles de l'État qui a émis chaque titre, c'est pourquoi chaque État a sa propre page ici.",
    reportHeading: "Ce qu'inclut un rapport VIN État par État",
    reportSub:
      "Un seul rapport consolide les données de chaque DMV étatique, NMVTIS, NICB, NHTSA et fournisseurs d'historique d'assurance agréés.",
    reportItems: [
      { title: "Historique de titre (tous les États)", desc: "Chaque titre émis dans les 50 États plus DC, incluant marques d'épave, reconstruit, inondation et ferraille partout où elles ont été enregistrées." },
      { title: "Registres d'accidents", desc: "Données de collisions des assureurs, ateliers de réparation et rapports DMV étatiques à l'échelle nationale." },
      { title: "Lectures d'odomètre", desc: "Captures de kilométrage de chaque transaction DMV, inspection et événement d'assurance à travers les frontières d'État." },
      { title: "Registres de vol", desc: "Croisement avec la base de données NICB de véhicules volés couvrant chaque État américain." },
      { title: "Statut des rappels", desc: "Tous les rappels de sécurité ouverts NHTSA, les mêmes données fédérales peu importe l'État." },
      { title: "Marques de titre par État", desc: "Terminologie des marques décodée par État pour que tu saches ce que signifie vraiment un titre 'reconstruit' ou 'distressed'." },
    ],
    howHeading: "Comment lancer une vérification VIN dans n'importe quel État — Pas à pas",
    howSub:
      "La recherche est identique dans les 50 États. La seule étape spécifique à l'État est la lecture des marques de titre par rapport aux règles locales.",
    howSteps: [
      { step: "01", title: "Trouve ton État ci-dessus", body: "Utilise le chercheur d'État pour ouvrir la page de l'État où le véhicule est actuellement titré. Chaque page d'État liste la terminologie exacte des marques de titre du DMV, la fenêtre de la Lemon Law et toute exigence d'inspection pour les véhicules épave ou reconstruits." },
      { step: "02", title: "Localise le VIN sur le véhicule", body: "Le VIN de 17 caractères est sur le tableau de bord (visible par le bas du pare-brise), l'autocollant du montant de la porte côté conducteur et le document de titre. Confirme que les trois correspondent, car une non-correspondance est un drapeau rouge sérieux dans n'importe quel État." },
      { step: "03", title: "Lance la recherche nationale", body: "Entre le VIN ci-dessus. La requête touche NMVTIS, chaque flux DMV étatique, NICB et NHTSA à la fois, donc peu importe de quel État vient la voiture : le rapport est consolidé." },
      { step: "04", title: "Lis les marques de titre selon les règles étatiques", body: "Une marque ne te dit que ce que l'État émetteur a décidé. Recoupe chaque marque avec la définition de cet État (liée sur sa page) pour savoir si 'reconstruit' signifiait une réparation légère ou une reconstruction quasi totale." },
      { step: "05", title: "Surveille les écarts entre États", body: "Si le titre a sauté entre États avec un écart suspect ou une marque qui a disparu après un déménagement, traite-le comme un avertissement de lavage de titre et inspecte de près avant d'acheter." },
    ],
    browseHeading: "Explore les 50 États par région",
    browseSub:
      "Chaque page d'État couvre le nom de son DMV, les marques exactes de titre, la fenêtre de la Lemon Law et un fait spécifique à l'État qui vaut la peine d'être connu avant d'acheter.",
    vehiclesSuffix: "véhicules",
    regions: [
      { name: "Ouest", slugs: ["california", "oregon", "washington", "nevada", "arizona", "idaho", "montana", "wyoming", "utah", "colorado", "new-mexico", "alaska", "hawaii"] },
      { name: "Midwest", slugs: ["illinois", "indiana", "iowa", "kansas", "michigan", "minnesota", "missouri", "nebraska", "north-dakota", "ohio", "south-dakota", "wisconsin"] },
      { name: "Sud", slugs: ["alabama", "arkansas", "florida", "georgia", "kentucky", "louisiana", "mississippi", "north-carolina", "oklahoma", "south-carolina", "tennessee", "texas", "virginia", "west-virginia"] },
      { name: "Nord-Est", slugs: ["connecticut", "delaware", "maine", "maryland", "massachusetts", "new-hampshire", "new-jersey", "new-york", "pennsylvania", "rhode-island", "vermont"] },
    ],
    ownerHeading: "Recherche de propriétaire par VIN — Ce que chaque État permet (et ne permet pas)",
    ownerCalloutPre: "La ",
    ownerCalloutBold: "loi fédérale Driver's Privacy Protection Act (DPPA, 18 U.S.C. § 2721)",
    ownerCalloutSuffix:
      " s'applique dans les 50 États. Les noms, adresses et numéros de téléphone des propriétaires liés aux registres de véhicules sont des informations privées protégées. Aucun service grand public de recherche VIN, y compris le nôtre, ne peut légalement retourner l'identité du propriétaire à partir d'une recherche VIN dans aucun État. Tout service qui prétend le faire opère hors la loi.",
    ownerBodyPre: "Ce qu'une ",
    ownerBodyMid: "recherche de propriétaire par VIN",
    ownerBodyEm: " peut ",
    ownerBodySuffix: " fournir légalement, dans chaque État :",
    ownerBullets: [
      "Nombre de propriétaires précédents (compte, pas les noms)",
      "Si chaque titre a été émis à un particulier, concessionnaire ou société de flotte/location",
      "État(s) où le véhicule a été titré précédemment",
      "Durée approximative pendant laquelle chaque titre a été détenu",
      "Si un titre a été émis à une entité commerciale (location, flotte, leasing)",
    ],
    midCtaHeading: "Prêt à vérifier un VIN ?",
    midCtaSub:
      "Une recherche couvre chaque État. Gratuit, instantané, sans carte de crédit. Historique complet du véhicule en moins de 5 secondes.",
    internalHeading: "Plus d'outils de vérification VIN",
    internalSub: "Approfondis dans des registres spécifiques qui apparaissent sur un rapport État par État.",
    internalLinks: [
      { href: "/florida-vin-check", label: "Vérification VIN Floride", desc: "Registres de titre, inondation et épave du DHSMV pour les véhicules de FL." },
      { href: "/salvage-title-check", label: "Vérification titre d'épave", desc: "Détecte les marques d'épave et reconstruit dans n'importe quel État." },
      { href: "/accident-history-check", label: "Vérification historique accidents", desc: "Registres de collisions et dommages à l'échelle nationale." },
      { href: "/flood-check", label: "Vérification dégât d'inondation", desc: "Marques de titre par dégât d'eau dans tous les États." },
      { href: "/odometer-check", label: "Vérification odomètre", desc: "Détecte le recul et la fraude de kilométrage." },
      { href: "/license-plate-lookup", label: "Recherche par plaque", desc: "Trouve le VIN à partir d'une plaque dans n'importe quel État." },
      { href: "/lemon-check", label: "Vérification rachat Lemon Law", desc: "Trouve les registres de rachat constructeur." },
      { href: "/vehicle-lien-check", label: "Vérification de privilège", desc: "Vérifie les prêts en cours sur n'importe quel véhicule." },
    ],
    faqHeading: "Questions fréquentes — Vérification VIN par État",
    faqSub:
      "Comment fonctionne l'historique VIN national à travers les 50 DMV étatiques et pourquoi les règles de titre diffèrent d'un État à l'autre.",
    bottomBadge: "Gratuit · Instantané · Sans inscription",
    bottomHeading: "Vérifie n'importe quel VIN dans n'importe quel État",
    bottomSub:
      "Le lavage de titre traverse les frontières d'État pour que la marque disparaisse du papier. Une vérification VIN nationale ramène l'historique complet, en 5 secondes, gratuitement.",
    sourcesHeading: "Sources et autorité des données",
    sourcesIntro:
      "Chaque affirmation sur cette page remonte à une source publique et autoritative américaine. Ci-dessous les références principales derrière une vérification VIN nationale et les agences avec lesquelles tu peux recouper.",
    sourceItems: [
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: "Système fédéral de titres agrégeant les 50 DMV étatiques." },
      { href: "https://www.nhtsa.gov/recalls", label: "NHTSA — Rappels de sécurité", note: "Base de données autoritative des rappels ouverts pour chaque VIN américain." },
      { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: "Rapports de véhicules volés et d'épave des assureurs." },
      { href: "https://www.iihs.org/topics/auto-theft", label: "IIHS — Statistiques de vol d'autos", note: "Recherche indépendante de vol de véhicules par État." },
      { href: "https://www.law.cornell.edu/uscode/text/18/2721", label: "18 U.S.C. § 2721 (DPPA)", note: "Loi fédérale protégeant l'identité du propriétaire dans chaque État." },
      { href: "https://www.usa.gov/state-motor-vehicle-services", label: "USA.gov — Annuaire DMV étatiques", note: "Liens officiels vers chaque agence de véhicules à moteur étatique." },
    ],
    sourcesFootnote:
      "Les seuils des marques de titre et les règles de divulgation sont établis par chaque État et changent avec le temps. Vérifie tout chiffre spécifique à l'État directement avec le DMV de cet État avant de t'y fier.",
  },
} as const;

const FAQS_EN = [
  { q: "Does a VIN check work in every US state?", a: "Yes. A VIN check works nationwide because it draws on NMVTIS, the National Motor Vehicle Title Information System, which aggregates title and brand data reported by all 50 state DMVs plus the District of Columbia. No matter where a vehicle was titled, registered, or sold, the same 17-character VIN lookup returns its consolidated history." },
  { q: "What is NMVTIS?", a: "NMVTIS, the National Motor Vehicle Title Information System, is a federal database administered by the U.S. Department of Justice. It collects title records, brand information, odometer readings, and total-loss reports from state motor-vehicle agencies, insurance carriers, and salvage and junk operators. It was established in part to prevent title fraud and title washing across state lines, and it is the backbone of a nationwide VIN check." },
  { q: "Why do title brands differ from state to state?", a: "Each state writes its own motor-vehicle code, so the wording and criteria for brands like salvage, rebuilt, flood, junk, or lemon-law buyback are set independently. The same physical condition can be labeled differently, or trigger a brand in one state but not another. Because the standards vary, the safest way to understand a specific brand is to check the rules published by the DMV in the state where the title was issued." },
  { q: "Can a car's title history span multiple states?", a: "Yes, and it often does. Vehicles are frequently bought, sold, and re-registered across state lines over their lifetime, so a single VIN can carry records from several state DMVs. Because brands and disclosure rules differ between states, a vehicle's complete picture only emerges when records from every state it touched are combined, which is exactly what a NMVTIS-sourced VIN check does." },
  { q: "What is title washing?", a: "Title washing is the practice of moving a branded vehicle to a state with different titling rules and re-titling it so the brand no longer appears on the new paper title. NMVTIS was created in large part to disrupt this, because the original brand stays attached to the VIN in the federal record even when a later paper title looks clean. A VIN check surfaces the underlying brand history regardless of where the current title was issued." },
  { q: "Does my state's DMV report salvage and junk titles?", a: "State motor-vehicle agencies are required to report title and brand information, including salvage and junk designations, into NMVTIS, and insurers and salvage yards report total-loss and junk vehicles as well. However, the exact threshold for declaring a vehicle salvage or junk, and the terminology used, is set by each state. For the precise definition and process in your state, consult that state's DMV." },
  { q: "Do I need a different report for each state?", a: "No. One VIN check returns a consolidated, nationwide history, so you do not need a separate report per state. The per-state pages on this site exist to explain local DMV procedures and titling terminology, but the underlying lookup is the same nationwide query for any vehicle." },
  { q: "Can I look up a vehicle owner by VIN in my state?", a: "No. The federal Driver's Privacy Protection Act (DPPA) bars any consumer VIN or plate lookup from returning an owner's name or address, and it applies in every state. A VIN check returns vehicle data such as title brands, accident records, odometer readings, and the number and type of prior owners, but never the personal identity of an owner." },
  { q: "Where can I find my state's specific title rules?", a: "Title-branding thresholds, fees, and disclosure requirements are set by each state and change over time, so the authoritative source is your own state's Department of Motor Vehicles (or equivalent agency). Use the state finder above to reach a page for your state, then verify any state-specific figures directly with that state's DMV before relying on them." },
];

const FAQS_ES = [
  { q: "¿Una revisión VIN funciona en cada estado de EE. UU.?", a: "Sí. Una revisión VIN funciona a nivel nacional porque se basa en NMVTIS, el Sistema Nacional de Información de Títulos de Vehículos Motorizados, que agrega datos de título y marcas reportados por los 50 DMV estatales más el Distrito de Columbia. No importa dónde se haya titulado, registrado o vendido un vehículo, la misma búsqueda VIN de 17 caracteres devuelve su historial consolidado." },
  { q: "¿Qué es NMVTIS?", a: "NMVTIS, el Sistema Nacional de Información de Títulos de Vehículos Motorizados, es una base de datos federal administrada por el Departamento de Justicia de EE. UU. Recopila registros de título, información de marcas, lecturas del odómetro y reportes de pérdida total de agencias estatales de vehículos motorizados, aseguradoras y operadores de salvamento y chatarra. Se estableció en parte para prevenir el fraude de título y el lavado de título a través de fronteras estatales, y es la columna vertebral de una revisión VIN nacional." },
  { q: "¿Por qué las marcas de título difieren de un estado a otro?", a: "Cada estado escribe su propio código de vehículos motorizados, así que la redacción y los criterios para marcas como salvamento, reconstruido, inundación, chatarra o recompra por Lemon Law se establecen de forma independiente. La misma condición física puede etiquetarse diferente, o disparar una marca en un estado pero no en otro. Como los estándares varían, la forma más segura de entender una marca específica es revisar las reglas publicadas por el DMV del estado donde se emitió el título." },
  { q: "¿El historial de título de un auto puede abarcar varios estados?", a: "Sí, y a menudo lo hace. Los vehículos se compran, venden y re-registran frecuentemente a través de fronteras estatales durante su vida útil, así que un solo VIN puede llevar registros de varios DMV estatales. Como las marcas y reglas de divulgación difieren entre estados, la imagen completa de un vehículo solo emerge cuando se combinan los registros de cada estado que tocó, que es exactamente lo que hace una revisión VIN basada en NMVTIS." },
  { q: "¿Qué es el lavado de título?", a: "El lavado de título es la práctica de mover un vehículo marcado a un estado con reglas de titulación diferentes y re-titularlo para que la marca ya no aparezca en el nuevo título físico. NMVTIS fue creado en gran parte para interrumpir esto, porque la marca original permanece adjunta al VIN en el registro federal incluso cuando un título físico posterior se ve limpio. Una revisión VIN muestra el historial de marcas subyacente sin importar dónde se emitió el título actual." },
  { q: "¿El DMV de mi estado reporta títulos de salvamento y chatarra?", a: "Las agencias estatales de vehículos motorizados están obligadas a reportar información de título y marcas, incluidas las designaciones de salvamento y chatarra, a NMVTIS, y las aseguradoras y patios de salvamento también reportan vehículos de pérdida total y chatarra. Sin embargo, el umbral exacto para declarar un vehículo salvamento o chatarra, y la terminología usada, lo establece cada estado. Para la definición y proceso precisos en tu estado, consulta el DMV de ese estado." },
  { q: "¿Necesito un reporte diferente para cada estado?", a: "No. Una revisión VIN devuelve un historial consolidado y nacional, así que no necesitas un reporte separado por estado. Las páginas por estado en este sitio existen para explicar los procedimientos locales del DMV y la terminología de titulación, pero la búsqueda subyacente es la misma consulta nacional para cualquier vehículo." },
  { q: "¿Puedo buscar al propietario de un vehículo por VIN en mi estado?", a: "No. La Ley federal de Protección de Privacidad del Conductor (DPPA) prohíbe que cualquier búsqueda por VIN o placa para consumidores devuelva el nombre o dirección del propietario, y aplica en cada estado. Una revisión VIN devuelve datos del vehículo como marcas de título, registros de accidentes, lecturas del odómetro y el número y tipo de propietarios anteriores, pero nunca la identidad personal de un propietario." },
  { q: "¿Dónde encuentro las reglas de título específicas de mi estado?", a: "Los umbrales de marcas de título, tarifas y requisitos de divulgación los establece cada estado y cambian con el tiempo, así que la fuente autorizada es tu propio Departamento de Vehículos Motorizados estatal (o agencia equivalente). Usa el buscador de estados arriba para llegar a una página de tu estado, luego verifica cualquier cifra específica del estado directamente con el DMV de ese estado antes de confiar en ella." },
];

interface Props {
  locale: Locale;
}

export default function VinCheckStateHubBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);
  const stateLink = (slug: string) =>
    locale === "es" ? `/es/vin-check/state/${slug}` : `/vin-check/state/${slug}`;

  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: c.home, href: locale === "es" ? "/es" : "/" },
              { label: c.crumbVinCheck, href: locale === "es" ? "/es/revision-vin" : "/vin-check" },
              { label: c.crumbByState },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Map className="w-4 h-4" /> {c.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>
              {c.h1Accent}
            </span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {c.intro}
          </p>

          <div className="bg-white/10 border border-white/15 rounded-2xl p-5 sm:p-6">
            <h2 className="text-sm sm:text-base font-headline font-extrabold text-white mb-3">
              {c.haveVinHeading}
            </h2>
            <VinSearchForm size="lg" onDark />
            <p className="mt-3 text-[11px] text-white/60 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {c.vinNote}
            </p>
          </div>

          <div className="mt-6">
            <StateFinder locale={locale} />
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

      {/* Stats block */}
      <section
        aria-labelledby="state-stats-heading"
        className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10"
      >
        <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
          <h2
            id="state-stats-heading"
            className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5"
          >
            {c.statsBlockHeading}
          </h2>
          <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {c.headlineStats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-primary-container px-4 py-4 sm:py-5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-headline font-bold text-3xl sm:text-4xl text-white leading-none mb-2">
                  {s.value}
                </dd>
                <p className="text-xs sm:text-sm text-on-primary-container leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Why state matters */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {c.whyHeading}
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              {c.whyP1Pre}
              <strong className="text-on-surface">{c.whyP1Bold}</strong>
              {c.whyP1Suffix}
            </p>
            <p>
              {c.whyP2Pre}
              <strong className="text-on-surface">{c.whyP2Bold}</strong>
              {c.whyP2Mid}
              <a
                href="https://vehiclehistory.bja.ojp.gov/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-primary underline underline-offset-2"
              >
                {c.whyP2LinkText}
              </a>{" "}
              {c.whyP2Suffix}
            </p>
          </div>
        </section>

        {/* Report includes */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {c.reportHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8">
            {c.reportSub}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.reportItems.map((item, i) => {
              const Icon = REPORT_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How To */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {c.howHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8">
            {c.howSub}
          </p>
          <div className="space-y-4">
            {c.howSteps.map((s) => (
              <div key={s.step} className="flex gap-4 sm:gap-6 items-start rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-white font-headline font-black text-sm">{s.step}</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Browse all states by region */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {c.browseHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8">
            {c.browseSub}
          </p>
          <div className="space-y-8">
            {c.regions.map((region) => {
              const regionStates = region.slugs
                .map((slug) => states.find((s) => s.slug === slug))
                .filter((s): s is NonNullable<typeof s> => Boolean(s));
              return (
                <div key={region.name}>
                  <h3 className="text-xs font-headline font-black uppercase tracking-widest text-on-surface-variant mb-3">
                    {region.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {regionStates.map((s) => (
                      <Link
                        key={s.slug}
                        href={stateLink(s.slug)}
                        className="flex items-center justify-between gap-3 p-4 bg-surface rounded-xl border border-outline-variant hover:border-primary/40 hover:bg-primary/5 transition-all group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-[11px] font-black">
                            {s.abbr}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-on-surface truncate group-hover:text-primary">{s.name}</div>
                            <div className="text-xs text-on-surface-variant">{s.vehiclesRegistered} {c.vehiclesSuffix}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-outline group-hover:text-primary transition-colors flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Owner lookup limitations */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {c.ownerHeading}
          </h2>
          <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-5 sm:p-6 mb-5">
            <div className="flex items-start gap-3">
              <Lock className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {c.ownerCalloutPre}
                <strong className="text-on-surface">{c.ownerCalloutBold}</strong>
                {c.ownerCalloutSuffix}
              </p>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
            {c.ownerBodyPre}
            <strong>{c.ownerBodyMid}</strong>
            <em>{c.ownerBodyEm}</em>
            {c.ownerBodySuffix}
          </p>
          <ul className="space-y-2">
            {c.ownerBullets.map((item) => (
              <li key={item} className="flex gap-2 items-start text-sm text-on-surface-variant">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Mid-page CTA */}
        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Star className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              {c.midCtaHeading}
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              {c.midCtaSub}
            </p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {c.internalHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">
            {c.internalSub}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {c.internalLinks.map((l) => (
              <Link
                key={l.href}
                href={link(l.href)}
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
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

        {/* VIN Check banner */}
        <section className="py-10">
          <VinCheckBanner />
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {c.faqHeading}
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            {c.faqSub}
          </p>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
              >
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
            <Zap className="w-3.5 h-3.5" /> {c.bottomBadge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            {c.bottomHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            {c.bottomSub}
          </p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" />
          </div>
        </section>

        {/* Sources & Data Authority */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {c.sourcesHeading}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6">
            {c.sourcesIntro}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {c.sourceItems.map((s) => (
              <li
                key={s.href}
                className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
              >
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-primary font-bold underline underline-offset-2"
                >
                  {s.label} ↗
                </a>
                <p className="mt-1.5 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {s.note}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-on-surface-variant italic">
            {c.sourcesFootnote}
          </p>
        </section>

        <RelatedChecks exclude="/vin-check/state" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
