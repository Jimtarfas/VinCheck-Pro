/**
 * Shared body for /jdm-import-check and /es/jdm-import-check.
 * Wave 18.18 batch 3 — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Search, ChevronRight, Lock, Zap, BadgeCheck, Sparkles,
  Ship, Gauge, FileText, ScrollText, MapPin, Globe, Car,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [Search, FileText, Gauge] as const;
const CONTENT_ICONS = [ScrollText, Gauge, FileText, Ship, BadgeCheck, MapPin] as const;

const COPY = {
  en: {
    home: "Home", crumb: "JDM Import Check",
    badge: "Japanese Imports   ·   Chassis Code, Mileage & 25-Year Rule",
    h1Lead: "JDM Import VIN Check — ",
    h1Accent: "Japanese Import History",
    intro: "CarCheckerVIN's free JDM import check queries NMVTIS US title history, Japanese auction sheets (USS, JU, TAA), export-certificate records, and EPA and DOT 25-year import compliance feeds to surface chassis code, mileage at export, auction grade, and US title brands for any JDM VIN or chassis number. As an NMVTIS-approved data provider, CarCheckerVIN bridges Japanese auction history with US title and import records so you can verify a Skyline GT-R, Supra RZ, NSX-R, or Impreza STI before you wire money overseas. Japanese Domestic Market cars like the Nissan Skyline GT-R, Honda NSX-R, Subaru Impreza STI, and Toyota Supra RZ were never sold in America. Most of their history happened in Japan, recorded on a chassis code, an auction sheet, and an export certificate rather than a US VIN. Start with the VIN or chassis code to verify mileage, condition, and legal import status. It's free.",
    formHeading: "Check a JDM Import by VIN or Chassis Code",
    formSub: "Enter the US 17-character VIN, or the Japanese chassis code, and we'll pull the import and history trail",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { icon: ScrollText, value: "25-Year", label: "import rule (49 CFR 591)" },
      { icon: Gauge, value: "km → mi", label: "mileage verified" },
      { icon: Globe, value: "Japan", label: "auction sheet history" },
      { icon: BadgeCheck, value: "Free", label: "VIN lookup, no sign-up" },
    ],
    h2How: "How a JDM Import Check Works",
    howIntro: "A JDM import has two histories: the Japan years on its chassis code and auction paperwork, and the US years that begin once it is titled here. A real check reads both.",
    howSteps: [
      { tag: "Step 1", title: "Enter the VIN or chassis code", body: "Type the US 17-character VIN if the car is already titled here, or the Japanese chassis code (BNR32, JZA80, GC8) for a car still on its export paperwork." },
      { tag: "Step 2", title: "We surface the import trail", body: "The lookup ties the identifier to US title and NMVTIS records, then points you to the Japanese auction sheet and export certificate that cover the pre-import years." },
      { tag: "Step 3", title: "Verify mileage and compliance", body: "Confirm kilometers versus miles, cross-check the auction grade, and validate 25-year eligibility and the CBP entry so you know the car was legally imported." },
    ],
    h2What: "What Counts as a JDM Import?",
    whatIntro: "Japanese Domestic Market vehicles are cars, trucks, and motorcycles built for sale inside Japan, often with different specifications than the versions exported elsewhere. The records that matter live across a few key sources.",
    what1Pre: "Japan's rigorous ",
    what1Bold: "Shaken",
    what1Suffix: " vehicle inspection system makes ownership of older cars expensive, which pushes owners to sell at relatively low mileage. That is why so many JDM imports arrive with well-documented, low-kilometer histories compared to equivalent Western cars.",
    what2Pre: "US import rules under ",
    what2Bold: "49 CFR Part 591",
    what2Suffix: ", the 25-year rule, allow a vehicle at least 25 years old to be imported without meeting current Federal Motor Vehicle Safety Standards. This opened the door to icons from the late 1990s and early 2000s that US buyers could never order new.",
    what3: "The market's growth has also created room for fraud: mileage manipulation, fabricated titles, compliance misrepresentation, and cars imported before they were actually eligible. A thorough JDM import check guards against all of these.",
    docsCardTitle: "Documents that tell the story",
    docsFields: [
      "Chassis / frame code (e.g. BNR32)",
      "Recorded mileage in kilometers",
      "Auction condition grade (1 to 5)",
      "Damage map from the auction sheet",
      "Export / deregistration date",
      "CBP Form 7501 customs entry",
    ],
    docsFootnote: "US databases only see the car after it lands, so the Japanese paperwork is your main evidence for the pre-import years.",
    h2Contents: "What a JDM Import Check Covers",
    contentsIntro: "Between the Japanese records and the US title trail, a complete import check documents the car's identity, mileage, condition, and legal status.",
    contents: [
      { title: "Chassis code vs US VIN", body: "Why JDM cars carry a frame code like BNR32 instead of a 17-character VIN, and how that code maps to platform and engine." },
      { title: "Mileage in kilometers", body: "How to convert km to miles, and how to catch sellers quoting the kilometer figure as if it were miles." },
      { title: "Japanese auction sheet", body: "The USS, TAA, or JU sheet with its 1 to 5 condition grade and damage map at the time the car was sold for export." },
      { title: "Export & deregistration cert", body: "Proof the car was removed from Japan's registry and lawfully exported, with chassis code, mileage, and export date." },
      { title: "25-year eligibility", body: "Whether the car was at least 25 years old at import under 49 CFR 591, the FMVSS and EPA exemption that makes it legal." },
      { title: "US title & compliance", body: "The CBP Form 7501 entry, bond release, state title, and any extra state rules such as California CARB emissions." },
    ],
    h2Chassis: "Chassis Code vs the 17-Character VIN",
    chassisIntro: "This is the single biggest difference between a JDM import and a US-market car, and the reason standard VIN databases come up short.",
    chassisTag: "Japanese Chassis Code",
    chassisTitle: "What the car was born with",
    chassisBullets: [
      "A frame/model code plus a sequence, like BNR32-123456.",
      "Encodes platform, body, and often engine (BNR32 = R32 GT-R, RB26DETT).",
      "Shorter than a US VIN and maker-specific.",
      "Decode against the manufacturer catalog, not a universal format.",
    ],
    vinTag: "US 17-Character VIN",
    vinTitle: "What it receives once titled here",
    vinBullets: [
      "Assigned through the state DMV after a CBP customs entry.",
      "Often built from the chassis number, so it may not match the standard 17-character pattern.",
      "This is the identifier NMVTIS and US history reports track.",
      "US records only start from the date of first US title.",
    ],
    chassisFootPre: "Once a JDM car has a US VIN, decode it with our ",
    chassisFootLink1: "VIN decoder",
    chassisFootMid: " and pull its domestic record with a full ",
    chassisFootLink2: "VIN history check",
    chassisFootSuffix: ".",
    h2Mileage: "Verifying JDM Mileage (Kilometers, Not Miles)",
    mileage1Pre: "JDM odometers read in kilometers. A car showing 60,000 km has about ",
    mileage1Bold: "37,000 miles",
    mileage1Suffix: " of use (multiply km by 0.621). That gap is exactly what some sellers exploit, presenting the kilometer figure as if it were miles to make a car look lower-mileage than it is.",
    mileage2: "The Japanese auction export sheet, typically from USS, TAA, or JU, records mileage at the time of the export sale and is the most reliable single reference. The export and deregistration certificate records it again as the car left Japan, and the US title should document it at import.",
    mileage3Pre: "Large gaps between any of these figures and the current odometer need an explanation. Pair this page with a focused ",
    mileage3Link: "odometer check",
    mileage3Suffix: " to catch rollback.",
    mileageCardTitle: "Mileage cross-checks",
    mileageChecklist: [
      "Confirm the unit: kilometers or miles",
      "Convert: km × 0.621 = miles",
      "Match against the auction sheet figure",
      "Match against the export certificate",
      "Match against the import mileage on the US title",
      "Read the auction grade (1 to 5) and damage map",
    ],
    mileageCardFootnote: "Auction grade certificates rate condition on a 1 to 5 scale and map any damage at the time of sale. They should travel with the car.",
    midCtaHeading: "Verify a JDM Import Before You Buy",
    midCtaSub: "Enter the VIN or chassis code to confirm mileage, condition, and legal import status. Free, in seconds.",
    h2Compliance: "Import Compliance and US Registration",
    compliance1: "A legal JDM import has to clear US customs and, in many states, meet registration requirements. The car must be at least 25 years old for the standard exemption, or meet full NHTSA and EPA compliance, which is extremely rare for JDM-specific models.",
    compliance2Pre: "States vary. California adds ",
    compliance2Bold: "CARB",
    compliance2Suffix: " emissions requirements that can complicate or block registration of some JDM cars, and some states require a structural inspection first. Research your own state's rules before you buy.",
    compliance3Pre: "Confirm the car was imported through a licensed importer, cleared customs with proper documentation (CBP entry records, bond release), and holds a US title from the state of first registration. Illegally imported vehicles cannot be registered and may be seized. Always run a ",
    compliance3Link: "stolen vehicle check",
    compliance3Suffix: " as well.",
    complianceCardTitle: "Buyer verification checklist",
    complianceChecklist: [
      "Confirm the chassis code matches the platform and engine claimed",
      "Convert the odometer (km × 0.621) and compare to the auction sheet",
      "Read the auction grade and damage map for past repairs",
      "Verify the export/deregistration certificate is genuine",
      "Confirm 25-year eligibility and the CBP Form 7501 entry",
      "Run a US VIN history report for everything since import",
    ],
    complianceCardCta: "Start the JDM import lookup:",
    h2Models: "Popular JDM Models and What to Verify",
    modelsIntro: "A handful of icons dominate the import market, and each carries its own checks beyond the standard history report.",
    models: [
      { name: "Nissan Skyline GT-R (R32, R33, R34)", chassis: "BNR32 / BCNR33 / BNR34", note: "Verify the RB26DETT matching numbers, check for turbocharger rebuilds, and confirm a clean title from a licensed importer." },
      { name: "Toyota Supra (JZA80)", chassis: "JZA80", note: "Confirm the 2JZ-GTE twin-turbo if claimed, verify the gearbox (the 6-speed is highly desirable), and check for track damage." },
      { name: "Honda NSX / NSX-R", chassis: "NA1 / NA2", note: "Confirm NSX-R specification (lighter weight, no A/C or radio) and verify mileage against the Japanese auction documentation." },
      { name: "Subaru Impreza WRX STI", chassis: "GC8 / GDB", note: "Verify the engine (EJ20 versus EJ207), check the differential condition, and confirm no major rally or track damage." },
    ],
    modelsFootPre: "For any of these, run a full ",
    modelsFootLink: "VIN history report",
    modelsFootSuffix: " on the US chassis number to capture any domestic history after import.",
    chassisLabel: "Chassis:",
    h2Internal: "More VIN Tools for Import Buyers",
    internalIntro: "The import check is the starting point. These tools complete the picture on any Japanese import.",
    internalLinks: [
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, accident, odometer, and recall records on the US chassis number after import." },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check", desc: "Confirm the import is not flagged as stolen before money changes hands." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17-character VIN a JDM car receives once it is titled in the US." },
      { href: "/odometer-check", label: "Odometer Check", desc: "Catch odometer rollback and km-to-miles mislabeling on an import." },
      { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Check whether the car picked up a branded title after it landed in the US." },
      { href: "/classic-car-vin", label: "Classic Car VIN Decoder", desc: "For older imports with shorter, era-specific identification formats." },
    ],
    h2Faq: "JDM Import Check: Frequently Asked Questions",
    faqIntro: "The questions importers and buyers ask most about JDM history, chassis codes, and the 25-year rule.",
    bottomBadge: "Free · Instant · JDM Import History",
    ctaBottomHeading: "Check Any JDM Import Vehicle",
    ctaBottomSub: "Enter the VIN or chassis number to check import records, mileage history, and US compliance status for any Japanese import.",
    ctaBottomNote: "No credit card · No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "Verificación importación JDM",
    badge: "Importaciones japonesas   ·   Código de chasis, kilometraje y regla de los 25 años",
    h1Lead: "Verificación VIN de importación JDM — ",
    h1Accent: "Historial de importación japonesa",
    intro: "Los autos del Mercado Doméstico Japonés (JDM) como el Nissan Skyline GT-R, Honda NSX-R, Subaru Impreza STI y Toyota Supra RZ nunca se vendieron en América. La mayor parte de su historia ocurrió en Japón, registrada en un código de chasis, una hoja de subasta y un certificado de exportación en lugar de un VIN de EE. UU. Comienza con el VIN o código de chasis para verificar kilometraje, condición y estado legal de importación. Es gratis.",
    formHeading: "Verifica una importación JDM por VIN o código de chasis",
    formSub: "Ingresa el VIN de 17 caracteres de EE. UU., o el código de chasis japonés, y extraeremos el rastro de importación e historial",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { icon: ScrollText, value: "25 años", label: "regla de importación (49 CFR 591)" },
      { icon: Gauge, value: "km → mi", label: "kilometraje verificado" },
      { icon: Globe, value: "Japón", label: "historial hoja de subasta" },
      { icon: BadgeCheck, value: "Gratis", label: "búsqueda VIN, sin registro" },
    ],
    h2How: "Cómo funciona una verificación de importación JDM",
    howIntro: "Una importación JDM tiene dos historias: los años en Japón en su código de chasis y papeleo de subasta, y los años en EE. UU. que comienzan una vez que se titula aquí. Una verificación real lee ambas.",
    howSteps: [
      { tag: "Paso 1", title: "Ingresa el VIN o código de chasis", body: "Escribe el VIN de 17 caracteres de EE. UU. si el auto ya está titulado aquí, o el código de chasis japonés (BNR32, JZA80, GC8) para un auto que aún está en su papeleo de exportación." },
      { tag: "Paso 2", title: "Mostramos el rastro de importación", body: "La búsqueda vincula el identificador a los registros de título de EE. UU. y NMVTIS, luego te dirige a la hoja de subasta japonesa y el certificado de exportación que cubren los años previos a la importación." },
      { tag: "Paso 3", title: "Verifica kilometraje y cumplimiento", body: "Confirma kilómetros versus millas, verifica el grado de subasta y valida la elegibilidad de 25 años y la entrada CBP para que sepas que el auto fue importado legalmente." },
    ],
    h2What: "¿Qué cuenta como una importación JDM?",
    whatIntro: "Los vehículos del Mercado Doméstico Japonés (JDM) son autos, camiones y motocicletas construidos para venderse dentro de Japón, a menudo con especificaciones diferentes a las versiones exportadas a otros lugares. Los registros que importan viven en algunas fuentes clave.",
    what1Pre: "El riguroso sistema de inspección vehicular ",
    what1Bold: "Shaken",
    what1Suffix: " de Japón hace que la propiedad de autos más antiguos sea costosa, lo que empuja a los propietarios a vender con kilometraje relativamente bajo. Por eso tantas importaciones JDM llegan con historiales bien documentados de bajo kilometraje comparados con autos occidentales equivalentes.",
    what2Pre: "Las reglas de importación de EE. UU. bajo ",
    what2Bold: "49 CFR Parte 591",
    what2Suffix: ", la regla de los 25 años, permiten que un vehículo de al menos 25 años sea importado sin cumplir con los Estándares Federales de Seguridad de Vehículos Motorizados actuales. Esto abrió la puerta a íconos de finales de los 90 y principios de los 2000 que los compradores estadounidenses nunca pudieron ordenar nuevos.",
    what3: "El crecimiento del mercado también ha creado espacio para el fraude: manipulación de kilometraje, títulos fabricados, tergiversación del cumplimiento y autos importados antes de ser realmente elegibles. Una verificación completa de importación JDM se protege contra todos estos.",
    docsCardTitle: "Documentos que cuentan la historia",
    docsFields: [
      "Código de chasis / cuadro (ej. BNR32)",
      "Kilometraje registrado en kilómetros",
      "Grado de condición de subasta (1 a 5)",
      "Mapa de daños de la hoja de subasta",
      "Fecha de exportación / desregistro",
      "Entrada aduanal CBP Formulario 7501",
    ],
    docsFootnote: "Las bases de datos de EE. UU. solo ven el auto después de que aterriza, así que el papeleo japonés es tu evidencia principal para los años previos a la importación.",
    h2Contents: "Qué cubre una verificación de importación JDM",
    contentsIntro: "Entre los registros japoneses y el rastro del título de EE. UU., una verificación completa de importación documenta la identidad, kilometraje, condición y estado legal del auto.",
    contents: [
      { title: "Código de chasis vs VIN de EE. UU.", body: "Por qué los autos JDM llevan un código de cuadro como BNR32 en lugar de un VIN de 17 caracteres, y cómo ese código mapea a plataforma y motor." },
      { title: "Kilometraje en kilómetros", body: "Cómo convertir km a millas, y cómo detectar a vendedores que citan el número de kilómetros como si fueran millas." },
      { title: "Hoja de subasta japonesa", body: "La hoja USS, TAA o JU con su grado de condición de 1 a 5 y mapa de daños en el momento en que el auto fue vendido para exportación." },
      { title: "Certificado de exportación y desregistro", body: "Prueba de que el auto fue removido del registro de Japón y exportado legalmente, con código de chasis, kilometraje y fecha de exportación." },
      { title: "Elegibilidad de 25 años", body: "Si el auto tenía al menos 25 años al importar bajo 49 CFR 591, la exención FMVSS y EPA que lo hace legal." },
      { title: "Título y cumplimiento de EE. UU.", body: "La entrada CBP Formulario 7501, liberación de fianza, título estatal y cualquier regla estatal adicional como las emisiones CARB de California." },
    ],
    h2Chassis: "Código de chasis vs el VIN de 17 caracteres",
    chassisIntro: "Esta es la diferencia más grande entre una importación JDM y un auto del mercado de EE. UU., y la razón por la que las bases de datos VIN estándar se quedan cortas.",
    chassisTag: "Código de chasis japonés",
    chassisTitle: "Con lo que nació el auto",
    chassisBullets: [
      "Un código de cuadro/modelo más una secuencia, como BNR32-123456.",
      "Codifica plataforma, carrocería y a menudo motor (BNR32 = R32 GT-R, RB26DETT).",
      "Más corto que un VIN de EE. UU. y específico del fabricante.",
      "Decodifica contra el catálogo del fabricante, no un formato universal.",
    ],
    vinTag: "VIN de EE. UU. de 17 caracteres",
    vinTitle: "Lo que recibe una vez titulado aquí",
    vinBullets: [
      "Asignado a través del DMV estatal después de una entrada aduanal CBP.",
      "A menudo construido desde el número de chasis, así que puede no coincidir con el patrón estándar de 17 caracteres.",
      "Este es el identificador que NMVTIS y los reportes de historial de EE. UU. rastrean.",
      "Los registros de EE. UU. solo comienzan desde la fecha del primer título de EE. UU.",
    ],
    chassisFootPre: "Una vez que un auto JDM tiene un VIN de EE. UU., decodifícalo con nuestro ",
    chassisFootLink1: "decodificador VIN",
    chassisFootMid: " y extrae su registro doméstico con una ",
    chassisFootLink2: "verificación completa de historial VIN",
    chassisFootSuffix: ".",
    h2Mileage: "Verificación del kilometraje JDM (kilómetros, no millas)",
    mileage1Pre: "Los odómetros JDM leen en kilómetros. Un auto que muestra 60,000 km tiene aproximadamente ",
    mileage1Bold: "37,000 millas",
    mileage1Suffix: " de uso (multiplica km por 0.621). Esa brecha es exactamente lo que algunos vendedores explotan, presentando la cifra en kilómetros como si fueran millas para que un auto parezca de menor kilometraje de lo que es.",
    mileage2: "La hoja de exportación de subasta japonesa, típicamente de USS, TAA o JU, registra el kilometraje en el momento de la venta de exportación y es la referencia única más confiable. El certificado de exportación y desregistro lo registra de nuevo cuando el auto dejó Japón, y el título de EE. UU. debe documentarlo en la importación.",
    mileage3Pre: "Las grandes brechas entre cualquiera de estas cifras y el odómetro actual necesitan una explicación. Combina esta página con una ",
    mileage3Link: "verificación de odómetro",
    mileage3Suffix: " enfocada para detectar reversiones.",
    mileageCardTitle: "Verificaciones cruzadas de kilometraje",
    mileageChecklist: [
      "Confirma la unidad: kilómetros o millas",
      "Convierte: km × 0.621 = millas",
      "Coincide contra la cifra de la hoja de subasta",
      "Coincide contra el certificado de exportación",
      "Coincide contra el kilometraje de importación en el título de EE. UU.",
      "Lee el grado de subasta (1 a 5) y el mapa de daños",
    ],
    mileageCardFootnote: "Los certificados de grado de subasta califican la condición en una escala de 1 a 5 y mapean cualquier daño en el momento de la venta. Deben viajar con el auto.",
    midCtaHeading: "Verifica una importación JDM antes de comprar",
    midCtaSub: "Ingresa el VIN o código de chasis para confirmar kilometraje, condición y estado legal de importación. Gratis, en segundos.",
    h2Compliance: "Cumplimiento de importación y registro en EE. UU.",
    compliance1: "Una importación JDM legal tiene que pasar la aduana de EE. UU. y, en muchos estados, cumplir con los requisitos de registro. El auto debe tener al menos 25 años para la exención estándar, o cumplir con el cumplimiento total de NHTSA y EPA, lo cual es extremadamente raro para modelos específicos de JDM.",
    compliance2Pre: "Los estados varían. California agrega requisitos de emisiones ",
    compliance2Bold: "CARB",
    compliance2Suffix: " que pueden complicar o bloquear el registro de algunos autos JDM, y algunos estados requieren una inspección estructural primero. Investiga las reglas de tu propio estado antes de comprar.",
    compliance3Pre: "Confirma que el auto fue importado a través de un importador con licencia, pasó la aduana con documentación adecuada (registros de entrada CBP, liberación de fianza) y tiene un título de EE. UU. del estado del primer registro. Los vehículos importados ilegalmente no pueden ser registrados y pueden ser incautados. Siempre ejecuta una ",
    compliance3Link: "verificación de vehículo robado",
    compliance3Suffix: " también.",
    complianceCardTitle: "Lista de verificación del comprador",
    complianceChecklist: [
      "Confirma que el código de chasis coincida con la plataforma y motor reclamados",
      "Convierte el odómetro (km × 0.621) y compáralo con la hoja de subasta",
      "Lee el grado de subasta y el mapa de daños para reparaciones pasadas",
      "Verifica que el certificado de exportación/desregistro sea genuino",
      "Confirma la elegibilidad de 25 años y la entrada CBP Formulario 7501",
      "Ejecuta un reporte de historial VIN de EE. UU. para todo desde la importación",
    ],
    complianceCardCta: "Comienza la búsqueda de importación JDM:",
    h2Models: "Modelos JDM populares y qué verificar",
    modelsIntro: "Un puñado de íconos domina el mercado de importación, y cada uno lleva sus propias verificaciones más allá del reporte estándar de historial.",
    models: [
      { name: "Nissan Skyline GT-R (R32, R33, R34)", chassis: "BNR32 / BCNR33 / BNR34", note: "Verifica los números coincidentes del RB26DETT, revisa reconstrucciones del turbocargador y confirma un título limpio de un importador con licencia." },
      { name: "Toyota Supra (JZA80)", chassis: "JZA80", note: "Confirma el 2JZ-GTE twin-turbo si se reclama, verifica la caja de cambios (la de 6 velocidades es altamente deseable) y revisa daños de pista." },
      { name: "Honda NSX / NSX-R", chassis: "NA1 / NA2", note: "Confirma la especificación NSX-R (peso más ligero, sin A/A o radio) y verifica el kilometraje contra la documentación de subasta japonesa." },
      { name: "Subaru Impreza WRX STI", chassis: "GC8 / GDB", note: "Verifica el motor (EJ20 versus EJ207), revisa la condición del diferencial y confirma que no hay daños mayores de rally o pista." },
    ],
    modelsFootPre: "Para cualquiera de estos, ejecuta un ",
    modelsFootLink: "reporte completo de historial VIN",
    modelsFootSuffix: " sobre el número de chasis de EE. UU. para capturar cualquier historial doméstico después de la importación.",
    chassisLabel: "Chasis:",
    h2Internal: "Más herramientas VIN para compradores de importaciones",
    internalIntro: "La verificación de importación es el punto de partida. Estas herramientas completan la imagen sobre cualquier importación japonesa.",
    internalLinks: [
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Registros de título, accidentes, odómetro y recalls sobre el número de chasis de EE. UU. después de la importación." },
      { href: "/stolen-vehicle-check", label: "Verificación vehículo robado", desc: "Confirma que la importación no esté marcada como robada antes de que cambie dinero." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica el VIN de 17 caracteres que un auto JDM recibe una vez titulado en EE. UU." },
      { href: "/odometer-check", label: "Verificación odómetro", desc: "Detecta reversión de odómetro y etiquetado erróneo de km a millas en una importación." },
      { href: "/salvage-title-check", label: "Verificación título salvamento", desc: "Verifica si el auto recibió un título marcado después de aterrizar en EE. UU." },
      { href: "/classic-car-vin", label: "Decodificador VIN auto clásico", desc: "Para importaciones más antiguas con formatos de identificación más cortos y específicos de la era." },
    ],
    h2Faq: "Verificación de importación JDM: Preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen importadores y compradores sobre historial JDM, códigos de chasis y la regla de los 25 años.",
    bottomBadge: "Gratis · Instantáneo · Historial de importación JDM",
    ctaBottomHeading: "Verifica cualquier vehículo de importación JDM",
    ctaBottomSub: "Ingresa el VIN o número de chasis para verificar registros de importación, historial de kilometraje y estado de cumplimiento de EE. UU. para cualquier importación japonesa.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Gratis",
  },
  fr: {
    home: "Accueil", crumb: "Vérification importation JDM",
    badge: "Importations japonaises   ·   Code châssis, kilométrage et règle des 25 ans",
    h1Lead: "Vérification VIN d'importation JDM — ",
    h1Accent: "Historique d'importation japonaise",
    intro: "Les voitures du marché domestique japonais (JDM) comme la Nissan Skyline GT-R, la Honda NSX-R, la Subaru Impreza STI et la Toyota Supra RZ n'ont jamais été vendues en Amérique. La majeure partie de leur histoire s'est déroulée au Japon, enregistrée sur un code châssis, une feuille d'enchère et un certificat d'exportation plutôt que sur un VIN américain. Commence par le VIN ou le code châssis pour vérifier le kilométrage, l'état et le statut légal d'importation. C'est gratuit.",
    formHeading: "Vérifie une importation JDM par VIN ou code châssis",
    formSub: "Saisis le VIN américain de 17 caractères, ou le code châssis japonais, et nous extrairons l'historique d'importation et complet",
    formNote: "Gratuit · Sans inscription · Résultat instantané",
    trustStats: [
      { icon: ScrollText, value: "25 ans", label: "règle d'importation (49 CFR 591)" },
      { icon: Gauge, value: "km → mi", label: "kilométrage vérifié" },
      { icon: Globe, value: "Japon", label: "historique feuille d'enchère" },
      { icon: BadgeCheck, value: "Gratuit", label: "recherche VIN, sans inscription" },
    ],
    h2How: "Comment fonctionne une vérification d'importation JDM",
    howIntro: "Une importation JDM a deux histoires : les années au Japon sur son code châssis et ses documents d'enchère, et les années américaines qui commencent une fois qu'elle y est titrée. Une vraie vérification lit les deux.",
    howSteps: [
      { tag: "Étape 1", title: "Saisis le VIN ou code châssis", body: "Tape le VIN américain de 17 caractères si la voiture est déjà titrée ici, ou le code châssis japonais (BNR32, JZA80, GC8) pour une voiture encore sur ses documents d'exportation." },
      { tag: "Étape 2", title: "Nous révélons la piste d'importation", body: "La recherche lie l'identifiant aux registres de titre américains et NMVTIS, puis te dirige vers la feuille d'enchère japonaise et le certificat d'exportation qui couvrent les années pré-importation." },
      { tag: "Étape 3", title: "Vérifie le kilométrage et la conformité", body: "Confirme les kilomètres versus les miles, recoupe le grade d'enchère et valide l'éligibilité de 25 ans et l'entrée CBP pour que tu saches que la voiture a été légalement importée." },
    ],
    h2What: "Qu'est-ce qui compte comme une importation JDM ?",
    whatIntro: "Les véhicules du marché domestique japonais (JDM) sont des voitures, camions et motos construits pour être vendus au Japon, souvent avec des spécifications différentes des versions exportées ailleurs. Les registres qui comptent vivent à travers quelques sources clés.",
    what1Pre: "Le rigoureux système d'inspection véhiculaire ",
    what1Bold: "Shaken",
    what1Suffix: " du Japon rend la propriété de voitures plus anciennes coûteuse, ce qui pousse les propriétaires à vendre avec un kilométrage relativement bas. C'est pourquoi tant d'importations JDM arrivent avec des historiques bien documentés et à faible kilométrage par rapport aux voitures occidentales équivalentes.",
    what2Pre: "Les règles d'importation américaines sous le ",
    what2Bold: "49 CFR Partie 591",
    what2Suffix: ", la règle des 25 ans, permettent qu'un véhicule d'au moins 25 ans soit importé sans respecter les normes fédérales actuelles de sécurité des véhicules motorisés. Cela a ouvert la porte à des icônes de la fin des années 90 et du début des années 2000 que les acheteurs américains n'auraient jamais pu commander neuves.",
    what3: "La croissance du marché a aussi créé de l'espace pour la fraude : manipulation du kilométrage, titres fabriqués, fausse représentation de la conformité et voitures importées avant d'être réellement éligibles. Une vérification approfondie d'importation JDM te protège contre tout cela.",
    docsCardTitle: "Documents qui racontent l'histoire",
    docsFields: [
      "Code châssis / cadre (ex. BNR32)",
      "Kilométrage enregistré en kilomètres",
      "Grade d'état d'enchère (1 à 5)",
      "Carte des dégâts de la feuille d'enchère",
      "Date d'exportation / radiation",
      "Entrée douanière CBP Formulaire 7501",
    ],
    docsFootnote: "Les bases de données américaines ne voient la voiture qu'après son arrivée, donc les documents japonais sont ta preuve principale pour les années pré-importation.",
    h2Contents: "Ce que couvre une vérification d'importation JDM",
    contentsIntro: "Entre les registres japonais et la piste de titre américaine, une vérification complète d'importation documente l'identité, le kilométrage, l'état et le statut légal de la voiture.",
    contents: [
      { title: "Code châssis vs VIN américain", body: "Pourquoi les voitures JDM portent un code cadre comme BNR32 au lieu d'un VIN de 17 caractères, et comment ce code correspond à la plateforme et au moteur." },
      { title: "Kilométrage en kilomètres", body: "Comment convertir des km en miles, et comment repérer les vendeurs qui citent le chiffre en kilomètres comme s'il s'agissait de miles." },
      { title: "Feuille d'enchère japonaise", body: "La feuille USS, TAA ou JU avec son grade d'état de 1 à 5 et carte des dégâts au moment où la voiture a été vendue pour l'exportation." },
      { title: "Certificat d'exportation et radiation", body: "Preuve que la voiture a été retirée du registre du Japon et exportée légalement, avec code châssis, kilométrage et date d'exportation." },
      { title: "Éligibilité de 25 ans", body: "Si la voiture avait au moins 25 ans à l'importation sous le 49 CFR 591, l'exemption FMVSS et EPA qui la rend légale." },
      { title: "Titre et conformité américains", body: "L'entrée CBP Formulaire 7501, libération de caution, titre étatique et toute règle étatique supplémentaire comme les émissions CARB de Californie." },
    ],
    h2Chassis: "Code châssis vs le VIN de 17 caractères",
    chassisIntro: "C'est la plus grande différence entre une importation JDM et une voiture du marché américain, et la raison pour laquelle les bases de données VIN standard sont insuffisantes.",
    chassisTag: "Code châssis japonais",
    chassisTitle: "Ce avec quoi la voiture est née",
    chassisBullets: [
      "Un code cadre/modèle plus une séquence, comme BNR32-123456.",
      "Encode la plateforme, la carrosserie et souvent le moteur (BNR32 = R32 GT-R, RB26DETT).",
      "Plus court qu'un VIN américain et spécifique au constructeur.",
      "Décode contre le catalogue du constructeur, pas un format universel.",
    ],
    vinTag: "VIN américain de 17 caractères",
    vinTitle: "Ce qu'elle reçoit une fois titrée ici",
    vinBullets: [
      "Attribué via le DMV étatique après une entrée douanière CBP.",
      "Souvent construit à partir du numéro de châssis, donc peut ne pas correspondre au schéma standard de 17 caractères.",
      "C'est l'identifiant que NMVTIS et les rapports d'historique américains suivent.",
      "Les registres américains ne commencent qu'à partir de la date du premier titre américain.",
    ],
    chassisFootPre: "Une fois qu'une voiture JDM a un VIN américain, décode-le avec notre ",
    chassisFootLink1: "décodeur VIN",
    chassisFootMid: " et extrais son registre domestique avec une ",
    chassisFootLink2: "vérification complète de l'historique VIN",
    chassisFootSuffix: ".",
    h2Mileage: "Vérification du kilométrage JDM (kilomètres, pas miles)",
    mileage1Pre: "Les odomètres JDM affichent en kilomètres. Une voiture affichant 60 000 km a environ ",
    mileage1Bold: "37 000 miles",
    mileage1Suffix: " d'utilisation (multiplie km par 0,621). Cet écart est exactement ce que certains vendeurs exploitent, en présentant le chiffre en kilomètres comme s'il s'agissait de miles pour faire paraître une voiture avec moins de kilométrage qu'elle n'en a.",
    mileage2: "La feuille d'exportation d'enchère japonaise, généralement d'USS, TAA ou JU, enregistre le kilométrage au moment de la vente à l'exportation et est la référence unique la plus fiable. Le certificat d'exportation et de radiation l'enregistre à nouveau lorsque la voiture a quitté le Japon, et le titre américain devrait le documenter à l'importation.",
    mileage3Pre: "Les grands écarts entre l'un de ces chiffres et l'odomètre actuel nécessitent une explication. Combine cette page avec une ",
    mileage3Link: "vérification d'odomètre",
    mileage3Suffix: " ciblée pour détecter une remise à zéro.",
    mileageCardTitle: "Recoupements de kilométrage",
    mileageChecklist: [
      "Confirme l'unité : kilomètres ou miles",
      "Convertis : km × 0,621 = miles",
      "Compare avec le chiffre de la feuille d'enchère",
      "Compare avec le certificat d'exportation",
      "Compare avec le kilométrage d'importation sur le titre américain",
      "Lis le grade d'enchère (1 à 5) et la carte des dégâts",
    ],
    mileageCardFootnote: "Les certificats de grade d'enchère évaluent l'état sur une échelle de 1 à 5 et cartographient tout dégât au moment de la vente. Ils devraient voyager avec la voiture.",
    midCtaHeading: "Vérifie une importation JDM avant d'acheter",
    midCtaSub: "Saisis le VIN ou code châssis pour confirmer le kilométrage, l'état et le statut légal d'importation. Gratuit, en quelques secondes.",
    h2Compliance: "Conformité à l'importation et enregistrement aux USA",
    compliance1: "Une importation JDM légale doit passer la douane américaine et, dans de nombreux états, répondre aux exigences d'enregistrement. La voiture doit avoir au moins 25 ans pour l'exemption standard, ou répondre à la conformité totale NHTSA et EPA, ce qui est extrêmement rare pour les modèles spécifiques JDM.",
    compliance2Pre: "Les états varient. La Californie ajoute des exigences d'émissions ",
    compliance2Bold: "CARB",
    compliance2Suffix: " qui peuvent compliquer ou bloquer l'enregistrement de certaines voitures JDM, et certains états exigent d'abord une inspection structurelle. Renseigne-toi sur les règles de ton propre état avant d'acheter.",
    compliance3Pre: "Confirme que la voiture a été importée via un importateur agréé, a passé la douane avec des documents appropriés (registres d'entrée CBP, libération de caution) et détient un titre américain de l'état du premier enregistrement. Les véhicules importés illégalement ne peuvent pas être enregistrés et peuvent être saisis. Effectue toujours une ",
    compliance3Link: "vérification de véhicule volé",
    compliance3Suffix: " également.",
    complianceCardTitle: "Liste de vérification de l'acheteur",
    complianceChecklist: [
      "Confirme que le code châssis correspond à la plateforme et au moteur revendiqués",
      "Convertis l'odomètre (km × 0,621) et compare à la feuille d'enchère",
      "Lis le grade d'enchère et la carte des dégâts pour les réparations passées",
      "Vérifie que le certificat d'exportation/radiation est authentique",
      "Confirme l'éligibilité de 25 ans et l'entrée CBP Formulaire 7501",
      "Effectue un rapport d'historique VIN américain pour tout depuis l'importation",
    ],
    complianceCardCta: "Commence la recherche d'importation JDM :",
    h2Models: "Modèles JDM populaires et que vérifier",
    modelsIntro: "Une poignée d'icônes domine le marché de l'importation, et chacune porte ses propres vérifications au-delà du rapport d'historique standard.",
    models: [
      { name: "Nissan Skyline GT-R (R32, R33, R34)", chassis: "BNR32 / BCNR33 / BNR34", note: "Vérifie les numéros correspondants du RB26DETT, vérifie les reconstructions de turbocompresseur et confirme un titre propre d'un importateur agréé." },
      { name: "Toyota Supra (JZA80)", chassis: "JZA80", note: "Confirme le 2JZ-GTE twin-turbo si revendiqué, vérifie la boîte de vitesses (la 6 vitesses est très recherchée) et vérifie les dégâts de piste." },
      { name: "Honda NSX / NSX-R", chassis: "NA1 / NA2", note: "Confirme la spécification NSX-R (poids plus léger, sans A/C ni radio) et vérifie le kilométrage par rapport à la documentation d'enchère japonaise." },
      { name: "Subaru Impreza WRX STI", chassis: "GC8 / GDB", note: "Vérifie le moteur (EJ20 versus EJ207), vérifie l'état du différentiel et confirme qu'il n'y a pas de dégâts majeurs de rallye ou de piste." },
    ],
    modelsFootPre: "Pour n'importe lequel de ceux-ci, effectue un ",
    modelsFootLink: "rapport complet d'historique VIN",
    modelsFootSuffix: " sur le numéro de châssis américain pour capturer tout historique domestique après l'importation.",
    chassisLabel: "Châssis :",
    h2Internal: "Plus d'outils VIN pour les acheteurs d'importations",
    internalIntro: "La vérification d'importation est le point de départ. Ces outils complètent l'image sur toute importation japonaise.",
    internalLinks: [
      { href: "/vin-check", label: "Vérification complète de l'historique VIN", desc: "Registres de titre, accident, odomètre et rappels sur le numéro de châssis américain après l'importation." },
      { href: "/stolen-vehicle-check", label: "Vérification véhicule volé", desc: "Confirme que l'importation n'est pas signalée comme volée avant que l'argent ne change de mains." },
      { href: "/vin-decoder", label: "Décodeur VIN", desc: "Décode le VIN de 17 caractères qu'une voiture JDM reçoit une fois titrée aux USA." },
      { href: "/odometer-check", label: "Vérification odomètre", desc: "Détecte la remise à zéro de l'odomètre et le mauvais étiquetage km-vers-miles sur une importation." },
      { href: "/salvage-title-check", label: "Vérification titre salvage", desc: "Vérifie si la voiture a acquis un titre marqué après son arrivée aux USA." },
      { href: "/classic-car-vin", label: "Décodeur VIN voiture classique", desc: "Pour les importations plus anciennes avec des formats d'identification plus courts et spécifiques à l'époque." },
    ],
    h2Faq: "Vérification d'importation JDM : Questions fréquentes",
    faqIntro: "Les questions que les importateurs et acheteurs posent le plus sur l'historique JDM, les codes châssis et la règle des 25 ans.",
    bottomBadge: "Gratuit · Instantané · Historique d'importation JDM",
    ctaBottomHeading: "Vérifie tout véhicule d'importation JDM",
    ctaBottomSub: "Saisis le VIN ou numéro de châssis pour vérifier les registres d'importation, l'historique de kilométrage et le statut de conformité américain pour toute importation japonaise.",
    ctaBottomNote: "Sans carte de crédit · Sans inscription · Gratuit",
  },
} as const;

const FAQS_EN = [
  { question: "What is the 25-year import rule?", answer: "The US '25-year rule' (administered by NHTSA and US Customs under 49 CFR 591) lets a nonconforming vehicle be imported once it is at least 25 years old, measured from its month of manufacture. At that age it is exempt from Federal Motor Vehicle Safety Standards (FMVSS) and from EPA conformity requirements. This is why JDM models never sold in America, like the Nissan Skyline GT-R, become legally importable only after they turn 25." },
  { question: "Do JDM imports have a 17-character VIN or a Japanese chassis code?", answer: "Most Japanese-domestic-market vehicles do not use a 17-character VIN. Instead they carry a manufacturer chassis code (also called a frame or model number), such as JZA80 for a Toyota Supra or BNR32 for a Nissan Skyline GT-R, followed by a sequential production number. A standardized 17-character US VIN was not required for the Japan market, so JDM cars are identified by this shorter chassis/frame number until they are titled in the United States." },
  { question: "How do I decode a Japanese chassis number?", answer: "A Japanese chassis number combines a model code with a production sequence, for example BNR32-123456. The letter-and-number model code identifies the platform, body, and often the engine: in BNR32, 'BNR32' designates the R32-generation Skyline GT-R with the RB26DETT engine. The digits after the dash are the unit's build sequence. Decoding is manufacturer-specific, so confirm the code against the maker's chassis catalog rather than assuming a universal format." },
  { question: "Can you run a US history report on a JDM import?", answer: "You can, but be aware of a major limitation: US history databases such as NMVTIS generally hold little or no record for a freshly imported JDM vehicle, because all of its history happened in Japan before it arrived. NMVTIS draws from US state DMVs, insurers, and salvage operators, none of which saw the car. A meaningful US record only begins after the vehicle clears customs and receives a US title and VIN." },
  { question: "How do I check a JDM import's history before it was brought to the US?", answer: "Because US databases will not cover the Japan period, the primary sources are Japanese auction sheets and the export/deregistration certificate. Auction sheets from houses like USS, TAA, or JU record the mileage, a graded condition score (typically 1 to 5), and a damage map at the time of sale. The export certificate documents the vehicle as it left Japan. Together these are the best evidence of a JDM import's pre-import condition and mileage." },
  { question: "What is a deregistration or export certificate?", answer: "When a vehicle is exported from Japan, its domestic registration is cancelled and Japanese authorities issue a deregistration (or export) certificate. This document proves the car was officially removed from Japan's registry and lawfully exported, and it typically records the chassis code, recorded mileage, and export date. US importers use it during customs entry, and it is a key authenticity record buyers should ask to see for any JDM import." },
  { question: "How do I verify a JDM import was legally imported?", answer: "Confirm the vehicle was at least 25 years old at the time of import (or, rarely, meets full FMVSS and EPA compliance), then verify the paper trail: a US Customs and Border Protection entry record (CBP Form 7501) with bond release, the Japanese export/deregistration certificate, and a US title issued by the state of first registration. Illegally imported vehicles cannot be lawfully titled and may be subject to seizure, so this documentation is essential before purchase." },
  { question: "How do I convert a JDM odometer reading from kilometers to miles?", answer: "JDM odometers read in kilometers, not miles. Multiply the kilometer figure by 0.621 to get miles, so 60,000 km is roughly 37,000 miles. Always confirm which unit a listing is quoting, because some sellers present the kilometer number as if it were miles to make a car look lower-mileage than it is. Cross-check the figure against the Japanese auction sheet and the export certificate, which both record mileage at the time the car left Japan." },
];

const FAQS_ES = [
  { question: "¿Qué es la regla de importación de los 25 años?", answer: "La 'regla de los 25 años' de EE. UU. (administrada por NHTSA y la Aduana de EE. UU. bajo 49 CFR 591) permite que un vehículo no conforme sea importado una vez que tenga al menos 25 años, medidos desde su mes de fabricación. A esa edad está exento de los Estándares Federales de Seguridad de Vehículos Motorizados (FMVSS) y de los requisitos de conformidad de EPA. Por eso modelos JDM nunca vendidos en América, como el Nissan Skyline GT-R, se vuelven legalmente importables solo después de cumplir 25 años." },
  { question: "¿Las importaciones JDM tienen un VIN de 17 caracteres o un código de chasis japonés?", answer: "La mayoría de los vehículos del Mercado Doméstico Japonés no usan un VIN de 17 caracteres. En su lugar llevan un código de chasis del fabricante (también llamado número de cuadro o modelo), como JZA80 para un Toyota Supra o BNR32 para un Nissan Skyline GT-R, seguido por un número secuencial de producción. Un VIN estandarizado de 17 caracteres de EE. UU. no era requerido para el mercado de Japón, así que los autos JDM se identifican por este número más corto de chasis/cuadro hasta que se titulan en los Estados Unidos." },
  { question: "¿Cómo decodifico un número de chasis japonés?", answer: "Un número de chasis japonés combina un código de modelo con una secuencia de producción, por ejemplo BNR32-123456. El código de modelo de letras y números identifica la plataforma, carrocería y a menudo el motor: en BNR32, 'BNR32' designa el Skyline GT-R generación R32 con el motor RB26DETT. Los dígitos después del guion son la secuencia de construcción de la unidad. La decodificación es específica del fabricante, así que confirma el código contra el catálogo de chasis del fabricante en lugar de asumir un formato universal." },
  { question: "¿Puedes ejecutar un reporte de historial de EE. UU. en una importación JDM?", answer: "Puedes, pero ten en cuenta una limitación importante: las bases de datos de historial de EE. UU. como NMVTIS generalmente tienen poco o ningún registro para un vehículo JDM recién importado, porque toda su historia ocurrió en Japón antes de que llegara. NMVTIS extrae de los DMV estatales de EE. UU., aseguradoras y operadores de salvamento, ninguno de los cuales vio el auto. Un registro significativo de EE. UU. solo comienza después de que el vehículo pasa la aduana y recibe un título y VIN de EE. UU." },
  { question: "¿Cómo verifico el historial de una importación JDM antes de que fuera traída a EE. UU.?", answer: "Como las bases de datos de EE. UU. no cubrirán el período en Japón, las fuentes principales son las hojas de subasta japonesas y el certificado de exportación/desregistro. Las hojas de subasta de casas como USS, TAA o JU registran el kilometraje, un puntaje de condición graduado (típicamente 1 a 5) y un mapa de daños en el momento de la venta. El certificado de exportación documenta el vehículo cuando dejó Japón. Juntos son la mejor evidencia de la condición y kilometraje previos a la importación de una importación JDM." },
  { question: "¿Qué es un certificado de desregistro o exportación?", answer: "Cuando un vehículo es exportado de Japón, su registro doméstico se cancela y las autoridades japonesas emiten un certificado de desregistro (o exportación). Este documento prueba que el auto fue removido oficialmente del registro de Japón y exportado legalmente, y típicamente registra el código de chasis, kilometraje registrado y fecha de exportación. Los importadores de EE. UU. lo usan durante la entrada aduanal, y es un registro clave de autenticidad que los compradores deben pedir ver para cualquier importación JDM." },
  { question: "¿Cómo verifico que una importación JDM fue importada legalmente?", answer: "Confirma que el vehículo tenía al menos 25 años en el momento de la importación (o, raramente, cumple con el cumplimiento total de FMVSS y EPA), luego verifica el rastro de papel: un registro de entrada de Aduanas y Protección Fronteriza de EE. UU. (CBP Formulario 7501) con liberación de fianza, el certificado japonés de exportación/desregistro y un título de EE. UU. emitido por el estado del primer registro. Los vehículos importados ilegalmente no pueden titularse legalmente y pueden estar sujetos a incautación, así que esta documentación es esencial antes de la compra." },
  { question: "¿Cómo convierto una lectura de odómetro JDM de kilómetros a millas?", answer: "Los odómetros JDM leen en kilómetros, no en millas. Multiplica la cifra de kilómetros por 0.621 para obtener millas, así que 60,000 km es aproximadamente 37,000 millas. Siempre confirma qué unidad está citando un listado, porque algunos vendedores presentan el número de kilómetros como si fueran millas para que un auto parezca de menor kilometraje de lo que es. Verifica la cifra contra la hoja de subasta japonesa y el certificado de exportación, que ambos registran el kilometraje en el momento en que el auto dejó Japón." },
];

interface Props { locale: Locale; }

export default function JdmImportCheckBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Ship className="w-4 h-4" /> {c.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>
          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">{c.intro}</p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">{c.formHeading}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{c.formSub}</p>
            <VinSearchForm size="lg"  locale={locale}/>
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
              <p>
                {c.what1Pre}
                <strong className="text-on-surface">{c.what1Bold}</strong>
                {c.what1Suffix}
              </p>
              <p>
                {c.what2Pre}
                <strong className="text-on-surface">{c.what2Bold}</strong>
                {c.what2Suffix}
              </p>
              <p>{c.what3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.docsCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.docsFields.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.docsFootnote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Contents}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.contentsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.contents.map((item, i) => {
              const Icon = CONTENT_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Chassis}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.chassisIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.chassisTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.chassisTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.chassisBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">{c.vinTag}</div>
              <p className="text-lg font-headline font-extrabold text-primary mb-3">{c.vinTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.vinBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
          </div>
          <p className="mt-5 text-xs text-on-surface-variant">
            {c.chassisFootPre}
            <Link href={link("/vin-decoder")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.chassisFootLink1}</Link>
            {c.chassisFootMid}
            <Link href={link("/vin-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.chassisFootLink2}</Link>
            {c.chassisFootSuffix}
          </p>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Mileage}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.mileage1Pre}
                <strong className="text-on-surface">{c.mileage1Bold}</strong>
                {c.mileage1Suffix}
              </p>
              <p>{c.mileage2}</p>
              <p>
                {c.mileage3Pre}
                <Link href={link("/odometer-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.mileage3Link}</Link>
                {c.mileage3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-secondary-container/40 border border-outline-variant p-6">
              <div className="flex items-center gap-2 mb-3">
                <Gauge className="w-5 h-5 text-on-secondary-container" />
                <h3 className="font-headline font-extrabold text-on-secondary-container">{c.mileageCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.mileageChecklist.map((spot) => (
                  <li key={spot} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{spot}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.mileageCardFootnote}</p>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg"  locale={locale}/>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Compliance}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{c.compliance1}</p>
              <p>
                {c.compliance2Pre}
                <strong className="text-on-surface">{c.compliance2Bold}</strong>
                {c.compliance2Suffix}
              </p>
              <p>
                {c.compliance3Pre}
                <Link href={link("/stolen-vehicle-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.compliance3Link}</Link>
                {c.compliance3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.complianceCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.complianceChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.complianceCardCta}</p>
                <VinSearchForm size="sm"  locale={locale}/>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Models}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.modelsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.models.map((m) => (
              <div key={m.name} className="rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-1">
                  <Car className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="text-base font-headline font-extrabold text-primary">{m.name}</h3>
                </div>
                <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">
                  {c.chassisLabel} {m.chassis}
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{m.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-on-surface-variant">
            {c.modelsFootPre}
            <Link href={link("/vin-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.modelsFootLink}</Link>
            {c.modelsFootSuffix}
          </p>
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
            <VinSearchForm size="lg"  locale={locale}/>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            {c.ctaBottomNote}
          </div>
        </section>

        <RelatedChecks exclude="/jdm-import-check" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
