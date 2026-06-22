/**
 * Shared body for /stolen-vehicle-check and /es/stolen-vehicle-check.
 * Wave 18a — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Check, Search, ChevronRight, Lock, Zap, BadgeCheck, Sparkles,
  ShieldAlert, ShieldCheck, Database, FileSearch, AlertTriangle,
  Siren, MapPin,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const HOW_STEP_ICONS = [Search, Database, ShieldAlert] as const;
const CONTENT_ICONS = [ShieldAlert, ShieldCheck, AlertTriangle, FileSearch, Database, MapPin] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Stolen Vehicle Check",
    badge: "NICB & NMVTIS   ·   Theft, Recovery & Salvage Flags",
    h1Lead: "Stolen Vehicle Check by VIN — ",
    h1Accent: "Is This Car Stolen?",
    intro: "Buying a car you don't know is stolen can cost you the vehicle, your money, and a police interview. A stolen vehicle check cross-references the 17-character VIN against the NICB and NMVTIS theft databases, so you can confirm a car's status in seconds before you hand over a dollar. It's free.",
    formHeading: "Run a Stolen Vehicle Check by VIN",
    formSub: "Enter the VIN and we'll check it against national theft and title-brand databases",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { icon: Database, value: "NICB", label: "theft & salvage records" },
      { icon: ShieldCheck, value: "NMVTIS", label: "50-state title brands" },
      { icon: Siren, value: "Seconds", label: "instant theft flag" },
      { icon: BadgeCheck, value: "Free", label: "VIN lookup, no sign-up" },
    ],
    h2How: "How a Stolen Vehicle Check Works",
    howIntro: "Theft records live in databases keyed to the VIN. The lookup checks them in seconds, but the result is only as good as your in-person verification of the car.",
    howSteps: [
      { tag: "Step 1", title: "Enter the VIN", body: "Type the 17-character VIN from the dashboard, door jamb, or title. It is the unique identifier every theft database is keyed to." },
      { tag: "Step 2", title: "We query the theft databases", body: "The lookup checks NICB VINCheck theft and salvage records alongside NMVTIS title brands reported by all 50 state DMVs, insurers, and salvage operators." },
      { tag: "Step 3", title: "Read the flags", body: "See whether the VIN carries an active theft, theft-recovery, salvage, or total-loss record, then confirm the VIN matches the title and plates on the car." },
    ],
    h2Db: "The Databases Behind a Stolen Vehicle Check",
    dbIntro: "No single registry is complete in real time. A real theft check reads more than one source and treats a clean result as a signal, not a guarantee.",
    db1Pre: "The ",
    db1Bold: "National Insurance Crime Bureau (NICB)",
    db1Mid: " maintains the largest stolen-vehicle registry in the US. Insurers, law enforcement, and salvage yards report stolen vehicles using the VIN, covering cars, trucks, motorcycles, boats, and heavy equipment.",
    db2Pre: "The lookup also queries ",
    db2Bold: "NMVTIS",
    db2Mid: ", which aggregates title brands from all 50 state DMVs, insurers, and salvage operators. If a car was reported stolen and not recovered, or recovered as a salvage total loss, these sources flag it.",
    db3Pre: "Some thefts take 24 to 72 hours to propagate, and a private-party theft never reported to insurance may not appear at all. That is why the database check should always be paired with a full ",
    db3Link: "VIN history report",
    db3Suffix: " and an in-person inspection.",
    dbCardTitle: "Why the VIN matters",
    dbCard1: "The VIN is stamped or laser-etched in multiple places: the dashboard, door jamb, engine block, firewall, and structural members. Thieves can swap a plate or two, but altering every VIN on a car is enormously difficult.",
    dbCard2Pre: "Mismatched VINs across these locations are one of the strongest red flags of a stolen vehicle. Our ",
    dbCard2Link: "VIN locations guide",
    dbCard2Suffix: " shows every spot to check.",
    h2Report: "What a Stolen Vehicle Report Shows",
    reportIntro: "When a VIN is run against theft databases, the report surfaces these record types whenever they are present.",
    contents: [
      { title: "Active theft records", body: "Vehicles currently reported stolen and not yet recovered, the clearest stop signal in a report." },
      { title: "Theft-recovery records", body: "Previously stolen cars that have been found, often carrying a salvage brand if they were damaged or stripped." },
      { title: "Insurance total-loss flags", body: "Vehicles an insurer declared a total loss after a theft event, recorded by participating member insurers." },
      { title: "State title brands", body: "Stolen, theft-recovery, and salvage brands recorded across all 50 states and aggregated through NMVTIS." },
      { title: "NICB VINCheck", body: "The free insurer-sourced registry of stolen-and-unrecovered and salvage vehicles, searchable by VIN." },
      { title: "VIN-location guidance", body: "Where to find and cross-check the VIN on the car so you can spot a swapped or cloned plate." },
    ],
    h2Warning: "Warning Signs of a Stolen Vehicle",
    warning1: "Even before you run a VIN check, certain seller behaviors and vehicle conditions should raise immediate concern. Any one of them is a reason to slow down and verify everything.",
    warning2: "Trust the physical evidence over the seller's story. Compare the VIN on the dashboard with the door-jamb sticker and the title. All three should match exactly, and any discrepancy is a reason to walk away.",
    warning3: "Honest sellers welcome verification. Pressure to rush, pay cash, or skip the title transfer is the opposite of how a legitimate sale works.",
    warningCardTitle: "Red flags to watch for",
    warningSigns: [
      "Price is far below market value with no clear explanation",
      "Seller will only meet in a public lot, never at their home",
      "No current registration, a duplicate title, or a title in another name",
      "Dashboard VIN plate looks tampered with or glued, not factory-riveted",
      "Forced-entry ignition, damaged steering column, or freshly cut keys",
      "Seller is rushed, cash-only, or pushes you to skip the title transfer",
    ],
    midCtaHeading: "Check a VIN Before You Pay",
    midCtaSub: "Enter the VIN to query national theft and title-brand databases. Free, in seconds.",
    h2Action: "What to Do If You Suspect a Stolen Vehicle",
    action1: "If a VIN check returns a stolen flag, or you notice the warning signs during a viewing, do not confront the seller. Walk away calmly and contact your local police non-emergency line as soon as it is safe.",
    action2: "Give investigators the VIN, the listing URL, the address where you met, the seller's name and phone number, and any photos you took. Recovering a stolen vehicle is far easier when they get this quickly.",
    action3: "If you already bought a car that turns out to be stolen, do not drive it. Contact law enforcement, preserve all paperwork and payment records, and notify your insurer. In most states the legal owner can reclaim the vehicle without compensating you, so a police report and a civil claim against the seller are your best path to recovering money.",
    actionCardTitle: "Where to cross-check the VIN",
    vinSpots: [
      "Dashboard (base of the windshield)",
      "Driver-side door jamb sticker",
      "Engine block stamping",
      "Firewall and structural members",
      "Vehicle title document",
      "Current registration card",
    ],
    actionCardCta: "Start the stolen vehicle check:",
    h2Combine: "Combine Theft Checks with a Full History Report",
    combineIntro: "A stolen vehicle check is one essential layer of due diligence, but it should never be the only one.",
    theftCardTag: "Theft Check",
    theftCardTitle: "What it confirms",
    theftBullets: [
      "Active theft and theft-recovery flags by VIN.",
      "NICB insurer-reported salvage and total loss.",
      "A fast yes-or-no signal before a viewing.",
    ],
    fullCardTag: "Full VIN History",
    fullCardTitle: "What it adds",
    fullBullets: [
      "Title history and brands across all 50 states.",
      "Accident, odometer, and salvage records.",
      "The full picture to match against the seller's story.",
    ],
    combineNotePre: "New to this? Our ",
    combineNoteLink1: "free VIN check guide",
    combineNoteMid: " and ",
    combineNoteLink2: "salvage title check",
    combineNoteSuffix: " cover the next steps.",
    h2Internal: "More VIN Tools for Buyers",
    internalIntro: "The theft check is the starting point. These tools complete your due diligence on any used car.",
    internalLinks: [
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, accident, odometer, and salvage records alongside the theft flag." },
      { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See whether a recovered theft picked up a salvage or total-loss brand." },
      { href: "/license-plate-lookup", label: "License Plate Lookup", desc: "Trace a vehicle from its plate to the VIN when a listing hides the number." },
      { href: "/guides/what-is-a-vin-number", label: "VIN Locations Guide", desc: "Every spot the VIN is stamped, so you can catch a mismatched plate." },
      { href: "/vin-check-vs-carfax", label: "CarCheckerVIN vs Carfax", desc: "How our theft and title data compares to the legacy providers." },
      { href: "/odometer-check", label: "Odometer Check", desc: "Pair the theft check with rollback detection on the same VIN." },
    ],
    h2Faq: "Stolen Vehicle Check: Frequently Asked Questions",
    faqIntro: "The questions buyers ask most about checking a VIN against theft databases.",
    bottomBadge: "Free · Instant · National Theft Data",
    ctaBottomHeading: "Check If a Car Is Stolen",
    ctaBottomSub: "Enter a 17-character VIN to instantly check national theft and title-brand databases before you buy.",
    ctaBottomNote: "No credit card · No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "Verificación de vehículo robado",
    badge: "NICB y NMVTIS   ·   Indicadores de robo, recuperación y salvamento",
    h1Lead: "Verificación de vehículo robado por VIN — ",
    h1Accent: "¿Este auto está robado?",
    intro: "Comprar un auto sin saber que está robado puede costarte el vehículo, tu dinero y una entrevista policial. Una verificación de vehículo robado cruza el VIN de 17 caracteres contra las bases de datos de robos NICB y NMVTIS, para que puedas confirmar el estado de un auto en segundos antes de entregar un solo dólar. Es gratis.",
    formHeading: "Haz una verificación de vehículo robado por VIN",
    formSub: "Ingresa el VIN y lo verificaremos contra bases de datos nacionales de robos y marcas de título",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { icon: Database, value: "NICB", label: "registros de robo y salvamento" },
      { icon: ShieldCheck, value: "NMVTIS", label: "marcas de título de 50 estados" },
      { icon: Siren, value: "Segundos", label: "indicador instantáneo de robo" },
      { icon: BadgeCheck, value: "Gratis", label: "búsqueda VIN, sin registro" },
    ],
    h2How: "Cómo funciona una verificación de vehículo robado",
    howIntro: "Los registros de robo viven en bases de datos vinculadas al VIN. La búsqueda los verifica en segundos, pero el resultado es solo tan bueno como tu verificación presencial del auto.",
    howSteps: [
      { tag: "Paso 1", title: "Ingresa el VIN", body: "Escribe el VIN de 17 caracteres del tablero, marco de puerta o título. Es el identificador único al que está vinculada cada base de datos de robos." },
      { tag: "Paso 2", title: "Consultamos las bases de datos de robos", body: "La búsqueda verifica registros de robo y salvamento de NICB VINCheck junto con marcas de título NMVTIS reportadas por los 50 DMV estatales, aseguradoras y operadores de salvamento." },
      { tag: "Paso 3", title: "Lee los indicadores", body: "Mira si el VIN lleva un registro activo de robo, recuperación de robo, salvamento o pérdida total, luego confirma que el VIN coincida con el título y placas del auto." },
    ],
    h2Db: "Las bases de datos detrás de una verificación de vehículo robado",
    dbIntro: "Ningún registro único es completo en tiempo real. Una verificación real de robos lee más de una fuente y trata un resultado limpio como una señal, no una garantía.",
    db1Pre: "La ",
    db1Bold: "Oficina Nacional de Crímenes Aseguradores (NICB)",
    db1Mid: " mantiene el registro más grande de vehículos robados en EE. UU. Aseguradoras, fuerzas del orden y deshuesaderos reportan vehículos robados usando el VIN, cubriendo autos, camionetas, motocicletas, botes y equipo pesado.",
    db2Pre: "La búsqueda también consulta ",
    db2Bold: "NMVTIS",
    db2Mid: ", que agrega marcas de título de los 50 DMV estatales, aseguradoras y operadores de salvamento. Si un auto fue reportado robado y no recuperado, o recuperado como pérdida total de salvamento, estas fuentes lo marcan.",
    db3Pre: "Algunos robos tardan 24 a 72 horas en propagarse, y un robo privado nunca reportado al seguro puede no aparecer en absoluto. Por eso la verificación de base de datos siempre debe combinarse con un ",
    db3Link: "reporte completo de historial VIN",
    db3Suffix: " y una inspección presencial.",
    dbCardTitle: "Por qué importa el VIN",
    dbCard1: "El VIN está estampado o grabado con láser en múltiples lugares: el tablero, marco de puerta, bloque del motor, cortafuegos y miembros estructurales. Los ladrones pueden cambiar una o dos placas, pero alterar cada VIN en un auto es enormemente difícil.",
    dbCard2Pre: "VINs que no coinciden entre estas ubicaciones son una de las banderas rojas más fuertes de un vehículo robado. Nuestra ",
    dbCard2Link: "guía de ubicaciones VIN",
    dbCard2Suffix: " muestra cada lugar para verificar.",
    h2Report: "Qué muestra un reporte de vehículo robado",
    reportIntro: "Cuando un VIN se ejecuta contra bases de datos de robos, el reporte muestra estos tipos de registros cuando están presentes.",
    contents: [
      { title: "Registros activos de robo", body: "Vehículos actualmente reportados robados y aún no recuperados, la señal de alto más clara en un reporte." },
      { title: "Registros de recuperación de robo", body: "Autos previamente robados que han sido encontrados, a menudo con una marca de salvamento si fueron dañados o desmantelados." },
      { title: "Indicadores de pérdida total del seguro", body: "Vehículos que una aseguradora declaró pérdida total después de un evento de robo, registrados por aseguradoras miembros participantes." },
      { title: "Marcas estatales de título", body: "Marcas de robo, recuperación de robo y salvamento registradas en los 50 estados y agregadas a través de NMVTIS." },
      { title: "NICB VINCheck", body: "El registro gratuito de vehículos robados y no recuperados y de salvamento, alimentado por aseguradoras, buscable por VIN." },
      { title: "Guía de ubicación del VIN", body: "Dónde encontrar y verificar de forma cruzada el VIN en el auto para detectar una placa cambiada o clonada." },
    ],
    h2Warning: "Señales de advertencia de un vehículo robado",
    warning1: "Incluso antes de hacer una verificación VIN, ciertos comportamientos del vendedor y condiciones del vehículo deberían generar preocupación inmediata. Cualquiera de ellos es razón para frenar y verificar todo.",
    warning2: "Confía en la evidencia física sobre la historia del vendedor. Compara el VIN en el tablero con la calcomanía del marco de la puerta y el título. Los tres deben coincidir exactamente, y cualquier discrepancia es razón para retirarte.",
    warning3: "Los vendedores honestos dan la bienvenida a la verificación. La presión para apurarse, pagar en efectivo o saltarse la transferencia del título es lo opuesto a cómo funciona una venta legítima.",
    warningCardTitle: "Banderas rojas a vigilar",
    warningSigns: [
      "El precio está muy por debajo del valor de mercado sin explicación clara",
      "El vendedor solo se reúne en un estacionamiento público, nunca en su casa",
      "Sin registro actual, un título duplicado o un título a nombre de otra persona",
      "La placa VIN del tablero se ve alterada o pegada, no remachada de fábrica",
      "Ignición forzada, columna de dirección dañada o llaves recién cortadas",
      "El vendedor está apurado, solo acepta efectivo o te presiona para saltarte la transferencia del título",
    ],
    midCtaHeading: "Verifica un VIN antes de pagar",
    midCtaSub: "Ingresa el VIN para consultar bases de datos nacionales de robos y marcas de título. Gratis, en segundos.",
    h2Action: "Qué hacer si sospechas de un vehículo robado",
    action1: "Si una verificación VIN devuelve un indicador de robo, o notas las señales de advertencia durante una visita, no confrontes al vendedor. Retírate con calma y contacta a la línea no de emergencia de tu policía local tan pronto como sea seguro.",
    action2: "Dales a los investigadores el VIN, la URL del listado, la dirección donde se reunieron, el nombre y número de teléfono del vendedor y cualquier foto que hayas tomado. Recuperar un vehículo robado es mucho más fácil cuando reciben esto rápidamente.",
    action3: "Si ya compraste un auto que resulta ser robado, no lo conduzcas. Contacta a las fuerzas del orden, preserva todos los papeles y registros de pago, y notifica a tu aseguradora. En la mayoría de los estados el dueño legal puede reclamar el vehículo sin compensarte, así que un reporte policial y un reclamo civil contra el vendedor son tu mejor camino para recuperar dinero.",
    actionCardTitle: "Dónde verificar el VIN de forma cruzada",
    vinSpots: [
      "Tablero (base del parabrisas)",
      "Calcomanía del marco de la puerta del conductor",
      "Estampado del bloque del motor",
      "Cortafuegos y miembros estructurales",
      "Documento del título del vehículo",
      "Tarjeta de registro actual",
    ],
    actionCardCta: "Comienza la verificación de vehículo robado:",
    h2Combine: "Combina las verificaciones de robo con un reporte completo de historial",
    combineIntro: "Una verificación de vehículo robado es una capa esencial de debida diligencia, pero nunca debe ser la única.",
    theftCardTag: "Verificación de robo",
    theftCardTitle: "Lo que confirma",
    theftBullets: [
      "Indicadores activos de robo y recuperación de robo por VIN.",
      "Salvamento y pérdida total reportados por aseguradoras NICB.",
      "Una señal rápida de sí o no antes de una visita.",
    ],
    fullCardTag: "Historial VIN completo",
    fullCardTitle: "Lo que agrega",
    fullBullets: [
      "Historial de título y marcas en los 50 estados.",
      "Registros de accidentes, odómetro y salvamento.",
      "La imagen completa para contrastar con la historia del vendedor.",
    ],
    combineNotePre: "¿Nuevo en esto? Nuestra ",
    combineNoteLink1: "guía de verificación VIN gratis",
    combineNoteMid: " y ",
    combineNoteLink2: "verificación de título salvamento",
    combineNoteSuffix: " cubren los siguientes pasos.",
    h2Internal: "Más herramientas VIN para compradores",
    internalIntro: "La verificación de robo es el punto de partida. Estas herramientas completan tu debida diligencia en cualquier auto usado.",
    internalLinks: [
      { href: "/vin-check", label: "Verificación de historial VIN completa", desc: "Título, accidente, odómetro y registros de salvamento junto con el indicador de robo." },
      { href: "/salvage-title-check", label: "Verificación de título salvamento", desc: "Mira si un robo recuperado adquirió una marca de salvamento o pérdida total." },
      { href: "/license-plate-lookup", label: "Búsqueda de placa", desc: "Rastrea un vehículo desde su placa hasta el VIN cuando un listado oculta el número." },
      { href: "/guides/what-is-a-vin-number", label: "Guía de ubicaciones VIN", desc: "Cada lugar donde está estampado el VIN, para detectar una placa que no coincide." },
      { href: "/vin-check-vs-carfax", label: "CarCheckerVIN vs Carfax", desc: "Cómo nuestros datos de robos y título se comparan con los proveedores tradicionales." },
      { href: "/odometer-check", label: "Verificación de odómetro", desc: "Combina la verificación de robo con la detección de rollback en el mismo VIN." },
    ],
    h2Faq: "Verificación de vehículo robado: preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen los compradores sobre verificar un VIN contra bases de datos de robos.",
    bottomBadge: "Gratis · Instantáneo · Datos nacionales de robos",
    ctaBottomHeading: "Verifica si un auto está robado",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres para verificar al instante bases de datos nacionales de robos y marcas de título antes de comprar.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Gratis",
  },
} as const;

const FAQS_EN = [
  { question: "How do I check if a car is stolen by its VIN?", answer: "Enter the 17-character VIN into a stolen-vehicle lookup that queries theft databases. The National Insurance Crime Bureau (NICB) offers a free VINCheck tool that flags vehicles reported stolen-and-unrecovered or as insurance salvage by participating member insurers. For a fuller picture, pair the VIN with an NMVTIS-sourced title-history report so you also see salvage, theft-recovery, and total-loss brands recorded by state DMVs." },
  { question: "Is there a free stolen car database I can search?", answer: "Yes. The NICB VINCheck tool is free and lets you run a limited number of VIN searches per day. It returns whether a VIN has been reported stolen-and-unrecovered or declared a salvage total loss by a participating insurer. It is not a complete national registry, so a clean result is reassuring but not a guarantee. Confirm anything you find directly with local law enforcement." },
  { question: "What database shows if a car is stolen?", answer: "Two main systems matter. The NICB VINCheck database carries theft and salvage records submitted by participating insurers and is searchable free by VIN. The National Motor Vehicle Title Information System (NMVTIS) aggregates title brands from all 50 state DMVs, insurers, and salvage operators, including theft-recovery and salvage brands. Local and federal law enforcement also maintain the NCIC, which is not public but is checked when you file a report." },
  { question: "What should I do if a car is reported stolen?", answer: "Do not confront the seller or drive the vehicle. Walk away calmly and contact your local police non-emergency line as soon as it is safe. Give them the VIN, listing URL, meeting location, and the seller's name and number. If you already bought it, stop driving it, preserve all paperwork and payment records, and notify both police and your insurer. The legal owner can usually reclaim a stolen car without repaying you." },
  { question: "Can a stolen car have a clean title?", answer: "Yes. A freshly stolen vehicle, a car with a cloned or altered VIN, or a theft never reported to insurance may still show a clean title and a clean database result. Thieves sometimes 'wash' titles across states or swap VIN plates to mask a car's history. A clean title is not proof a car was never stolen, so always verify the VIN matches the title, registration, and door-jamb plate." },
  { question: "What is the difference between stolen, theft-recovery, and salvage?", answer: "A 'stolen' record means a vehicle is currently reported stolen and not yet recovered. 'Theft recovery' means a previously stolen car has been found, sometimes with a salvage brand if it was damaged or stripped. 'Salvage' is a broader title brand for vehicles an insurer declared a total loss, which can stem from theft, collision, flood, or other damage. A VIN check can surface all three as separate records." },
  { question: "Does a VIN check guarantee a car isn't stolen?", answer: "No. A VIN check only reflects thefts that were reported and entered into the databases it queries. A car stolen hours ago, one with a cloned VIN, or a theft never reported to insurance may not appear. Treat a clean result as one positive signal, not a guarantee. Confirm the VIN matches across the title, registration, and door-jamb plate, and contact local police or the NICB if anything looks off." },
];

const FAQS_ES = [
  { question: "¿Cómo verifico si un auto está robado por su VIN?", answer: "Ingresa el VIN de 17 caracteres en una búsqueda de vehículos robados que consulte bases de datos de robos. La Oficina Nacional de Crímenes Aseguradores (NICB) ofrece una herramienta gratuita VINCheck que marca vehículos reportados como robados-y-no-recuperados o como salvamento de seguro por aseguradoras miembros participantes. Para una imagen más completa, combina el VIN con un reporte de historial de título basado en NMVTIS para que también veas marcas de salvamento, recuperación de robo y pérdida total registradas por los DMV estatales." },
  { question: "¿Hay una base de datos gratuita de autos robados que pueda buscar?", answer: "Sí. La herramienta NICB VINCheck es gratuita y te permite ejecutar un número limitado de búsquedas VIN por día. Devuelve si un VIN ha sido reportado robado-y-no-recuperado o declarado pérdida total de salvamento por una aseguradora participante. No es un registro nacional completo, así que un resultado limpio es tranquilizador pero no una garantía. Confirma cualquier cosa que encuentres directamente con las fuerzas del orden locales." },
  { question: "¿Qué base de datos muestra si un auto está robado?", answer: "Dos sistemas principales importan. La base de datos NICB VINCheck lleva registros de robo y salvamento enviados por aseguradoras participantes y se puede buscar gratis por VIN. El Sistema Nacional de Información de Títulos de Vehículos Motorizados (NMVTIS) agrega marcas de título de los 50 DMV estatales, aseguradoras y operadores de salvamento, incluyendo marcas de recuperación de robo y salvamento. Las fuerzas del orden locales y federales también mantienen el NCIC, que no es público pero se verifica cuando presentas un reporte." },
  { question: "¿Qué debo hacer si un auto está reportado como robado?", answer: "No confrontes al vendedor ni conduzcas el vehículo. Retírate con calma y contacta a la línea no de emergencia de tu policía local tan pronto como sea seguro. Dales el VIN, la URL del listado, la ubicación de la reunión y el nombre y número del vendedor. Si ya lo compraste, deja de conducirlo, preserva todos los papeles y registros de pago, y notifica tanto a la policía como a tu aseguradora. El dueño legal usualmente puede reclamar un auto robado sin pagarte." },
  { question: "¿Puede un auto robado tener título limpio?", answer: "Sí. Un vehículo recién robado, un auto con VIN clonado o alterado, o un robo nunca reportado al seguro puede mostrar un título limpio y un resultado de base de datos limpio. Los ladrones a veces 'lavan' títulos entre estados o cambian placas VIN para enmascarar el historial de un auto. Un título limpio no es prueba de que un auto nunca fue robado, así que siempre verifica que el VIN coincida con el título, registro y placa del marco de la puerta." },
  { question: "¿Cuál es la diferencia entre robado, recuperación de robo y salvamento?", answer: "Un registro 'robado' significa que un vehículo está actualmente reportado como robado y aún no recuperado. 'Recuperación de robo' significa que un auto previamente robado ha sido encontrado, a veces con una marca de salvamento si fue dañado o desmantelado. 'Salvamento' es una marca de título más amplia para vehículos que una aseguradora declaró pérdida total, que puede provenir de robo, colisión, inundación u otro daño. Una verificación VIN puede mostrar los tres como registros separados." },
  { question: "¿Una verificación VIN garantiza que un auto no está robado?", answer: "No. Una verificación VIN solo refleja robos que fueron reportados e ingresados en las bases de datos que consulta. Un auto robado hace horas, uno con un VIN clonado, o un robo nunca reportado al seguro puede no aparecer. Trata un resultado limpio como una señal positiva, no una garantía. Confirma que el VIN coincida en el título, registro y placa del marco de la puerta, y contacta a la policía local o NICB si algo parece sospechoso." },
];

interface Props { locale: Locale; }

export default function StolenVehicleCheckBody({ locale }: Props) {
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
              const Icon = HOW_STEP_ICONS[i];
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Db}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.dbIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.db1Pre}
                <strong className="text-on-surface">{c.db1Bold}</strong>
                {c.db1Mid}
              </p>
              <p>
                {c.db2Pre}
                <strong className="text-on-surface">{c.db2Bold}</strong>
                {c.db2Mid}
              </p>
              <p>
                {c.db3Pre}
                <Link href={link("/vin-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.db3Link}</Link>
                {c.db3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.dbCardTitle}</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-3">{c.dbCard1}</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {c.dbCard2Pre}
                <Link href={link("/guides/what-is-a-vin-number")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dbCard2Link}</Link>
                {c.dbCard2Suffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Report}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.reportIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.contents.map((cn, i) => {
              const Icon = CONTENT_ICONS[i];
              return (
                <div key={cn.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{cn.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{cn.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Warning}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{c.warning1}</p>
              <p>{c.warning2}</p>
              <p>{c.warning3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.warningCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.warningSigns.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Action}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{c.action1}</p>
              <p>{c.action2}</p>
              <p>{c.action3}</p>
            </div>
            <div className="rounded-2xl bg-secondary-container/40 border border-outline-variant p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-on-secondary-container" />
                <h3 className="font-headline font-extrabold text-on-secondary-container">{c.actionCardTitle}</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-on-surface">
                {c.vinSpots.map((spot) => (
                  <li key={spot} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{spot}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.actionCardCta}</p>
                <VinSearchForm size="sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Combine}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.combineIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.theftCardTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.theftCardTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.theftBullets.map((b) => (
                  <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">{c.fullCardTag}</div>
              <p className="text-lg font-headline font-extrabold text-primary mb-3">{c.fullCardTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.fullBullets.map((b) => (
                  <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-5 text-xs text-on-surface-variant">
            {c.combineNotePre}
            <Link href={link("/guides/free-vin-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.combineNoteLink1}</Link>
            {c.combineNoteMid}
            <Link href={link("/salvage-title-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.combineNoteLink2}</Link>
            {c.combineNoteSuffix}
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
            <VinSearchForm size="lg" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            {c.ctaBottomNote}
          </div>
        </section>

        <RelatedChecks exclude="/stolen-vehicle-check" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES };
