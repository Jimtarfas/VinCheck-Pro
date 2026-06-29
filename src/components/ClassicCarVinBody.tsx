/**
 * Shared body for /classic-car-vin and /es/classic-car-vin.
 * Wave 18.18 batch 3 — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, CalendarClock, ChevronRight,
  Lock, Zap, BadgeCheck, Sparkles, Cog, Gauge,
  ClipboardCheck, Factory, Hash, ScrollText, BookOpen, History,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [CalendarClock, Search, ScrollText] as const;
const LEARN_ICONS = [Cog, FileText, Factory, CalendarClock, Gauge, BadgeCheck] as const;
const MANUFACTURER_ICON = Factory;

const COPY = {
  en: {
    home: "Home", crumb: "Classic Car VIN",
    badge: "Classic & Vintage   ·   Pre-1981 Formats",
    h1Lead: "Classic Car VIN Decoder — ",
    h1Accent: "Decode Any Vintage Vehicle",
    intro: "Before 1981 there was no standardized 17-character VIN — every manufacturer used its own system, and those systems changed year to year. Knowing the right key for a specific make and model year unlocks the engine code, body style, assembly plant, and the numbers-matching data that drives a classic's collector value.",
    formHeading: "Decode a Classic Car VIN",
    formSub: "Enter a pre-1981 or modern VIN — we'll decode the factory configuration so you can verify authenticity",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { icon: CalendarClock, value: "Pre-1981", label: "format experts" },
      { icon: Factory, value: "GM · Ford", label: "Mopar + AMC" },
      { icon: Hash, value: "Numbers", label: "matching checks" },
      { icon: Zap, value: "Free", label: "instant decode" },
    ],
    h2How: "How to Decode a Classic VIN",
    howIntro: "Pre-1981 VIN decoding is a manufacturer-and-year exercise, not a database lookup. Three steps turn a vintage VIN into a clear factory configuration you can verify against the car.",
    howSteps: [
      { tag: "Step 1", title: "Identify make & model year", body: "Pre-1981 VINs had no universal standard, so the decode depends entirely on the manufacturer and year. A 1969 and a 1975 of the same model use different keys — confirm both first." },
      { tag: "Step 2", title: "Locate the VIN & trim tag", body: "Find the VIN on the door post, firewall, frame, or dash-base plate. Note any separate cowl or trim tag near the firewall — it carries paint, body, and interior build codes." },
      { tag: "Step 3", title: "Apply the manufacturer key", body: "Use the year-specific reference table for that make to decode division, body series, engine, assembly plant, and sequence. These codes change annually, so the year-matched table is essential." },
    ],
    howNoteBold: "The fourth step is numbers-matching",
    howNoteSuffix: " — cross-check the VIN-encoded engine code against the casting and stamping numbers on the block, transmission, and rear axle to confirm the original factory drivetrain.",
    h2Manufacturers: "Manufacturer-Specific Pre-1981 VIN Formats",
    manufacturersIntro: "Each major manufacturer developed its own VIN encoding logic. Decoding a classic VIN correctly means knowing the right key for the specific make and year — the position and coding of each element differs by manufacturer.",
    manufacturers: [
      { title: "General Motors", years: "1968–1980", body: "13-character format: division code, model year, body series, body style, engine, assembly plant, and sequence. The VIN directly encodes the engine code — critical for matching-numbers verification." },
      { title: "Ford Motor Company", years: "1970–1980", body: "Variable-length format encoding model, engine, assembly plant, and sequential number. Engine-code positions confirm families like the 428 Cobra Jet or Boss 302." },
      { title: "Chrysler Corporation", years: "1968–1980", body: "13-character format with a distinct structure encoding car line, price class, body type, engine, transmission, and plant — decodes the exact drivetrain on a 1970 Cuda or Challenger." },
      { title: "American Motors (AMC)", years: "1968–1980", body: "13-character system encoding model year, series, body type, engine, transmission, assembly plant, and sequence." },
    ],
    manuNoteBold: "The codes change every year",
    manuNoteSuffix: " — decoding a 1969 Camaro VIN requires different reference tables than a 1975 Camaro VIN, even though both are pre-standardization GM vehicles.",
    h2Learn: "What You Can Learn from a Classic VIN",
    learnIntro: "Despite the lack of standardization, pre-1981 VINs carry rich data for those who know how to read them. The VIN is the anchor every authenticity claim is checked against.",
    learn: [
      { title: "Factory engine code", body: "For GM cars the VIN encodes the engine directly — a Z/28 with a DZ 302 should show a specific code, exposing a swapped engine if it doesn't." },
      { title: "Body style & series", body: "Confirms the original body line, two- vs four-door, hardtop vs convertible against the seller's description." },
      { title: "Assembly plant & sequence", body: "Identifies where and roughly when the car was built, useful for cross-referencing production records." },
      { title: "True model year", body: "Confirms the real model year — distinct from the year the car was sold or later titled." },
      { title: "Drivetrain configuration", body: "On Mopar VINs, decodes the exact engine, transmission, and body style of a car like a 1970 Cuda or Challenger." },
      { title: "Numbers-matching baseline", body: "Provides the reference the physical casting and stamping numbers must match for a verified matching-numbers car." },
    ],
    h2Matching: "VIN Decode vs. Full Numbers-Matching Verification",
    matchingIntro: "The VIN decode is one layer. A complete numbers-matching check crosses that data against the physical stamps and castings on the car — the standard for any high-value collector transaction.",
    matching1Pre: "Start by decoding the ",
    matching1Bold: "factory configuration",
    matching1Suffix: " from the VIN — engine, body, and trim codes. On many GM and Mopar classics the VIN-stamped engine code is the reference every physical part must match.",
    matching2: "Then confirm the actual stamped and cast numbers on the engine block, transmission, and rear axle, and check each casting date falls before the car's assembly date. A mismatch means a replaced component — and a false numbers-matching claim.",
    matching3Pre: "For the strongest provenance, validate against a marque registry or reproduction build sheet, and pair the decode with a full ",
    matching3Link1: "VIN history report",
    matching3Mid: " and an ",
    matching3Link2: "accident history check",
    matching3Suffix: ".",
    matchingChecklistTitle: "Numbers-matching checklist",
    matchingChecklist: [
      "Decode the VIN for the original factory engine and body codes",
      "Read the cowl / trim tag for paint, interior, and body data",
      "Cross-check the engine-block casting and stamping numbers",
      "Verify the transmission and rear-axle codes against the build",
      "Confirm casting dates fall before the car's assembly date",
      "Validate against a marque registry or reproduction build sheet",
    ],
    matchingChecklistCta: "Decode the factory configuration by VIN first:",
    midCtaHeading: "Verify a Classic Before You Buy",
    midCtaSub: "Don't take the seller's word for a numbers-matching claim. Decode the VIN to reveal the original factory configuration — free, in seconds.",
    h2History: "The VIN Before Standardization",
    history1: "The modern 17-character standardized VIN was mandated by NHTSA and implemented for all vehicles sold in the United States starting with model year 1981. Before that date there was no federal requirement for a standardized format, so manufacturers used whatever system they chose — a patchwork of different formats, lengths, and encoding schemes across makes and years.",
    history2: "In the 1950s and early 1960s, many manufacturers used simple sequential serial numbers with a model prefix — not much more than a production counter. Through the 1960s and 1970s they developed increasingly sophisticated systems that embedded model, engine, and assembly-plant data, but each scheme was proprietary and often changed annually.",
    history3: "Length varied considerably too. GM used 13-character VINs through most of the 1970s, Ford used varying lengths from 11 to 17 characters depending on the year, and Chrysler transitioned through several different formats. Import manufacturers had their own distinct systems as well.",
    h2Resources: "Resources for Classic Car Owners",
    resources1Pre: "Classic car owners have access to specialized resources beyond general VIN check services. Marque-specific registries — like ",
    resources1Bold1: "Pontiac Historic Services (PHS)",
    resources1Mid: " for Pontiac vehicles, ",
    resources1Bold2: "Marti Auto Works",
    resources1Suffix: " for Ford Mustangs, and Chrysler broadcast-sheet data services — provide manufacturer-generated documentation tied to individual VINs that goes beyond what general databases contain.",
    resources2: "These registry services often supply reproduction build sheets, window-sticker data, and factory documentation that can accompany a vehicle through transactions and auctions. For high-value collector cars, this manufacturer-sourced documentation can add thousands of dollars to a vehicle's market value by providing indisputable provenance.",
    resources3Pre: "For complete due diligence on any classic car purchase, also run a ",
    resources3Link1: "stolen vehicle check",
    resources3Mid: " and a ",
    resources3Link2: "salvage title check",
    resources3Suffix: " to verify clean ownership and title history.",
    resourcesCardTitle: "Why classic coverage is limited",
    resourcesCardBullets: [
      "NMVTIS and history reports were built around the 17-character VIN.",
      "Shorter pre-1981 VINs often return little or no title or odometer data.",
      "Verification leans on build sheets, registries, and trim tags instead.",
      "A history report is most useful for any post-1981 retitling events.",
    ],
    h2Sources: "Sources & References",
    sourcesIntro: "The standardized VIN, its pre-1981 history, and classic-car authenticity verification draw on federal regulation and manufacturer-specific registries. These are the authoritative origins behind the claims on this page.",
    sources: [
      { href: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-V/part-565", label: "49 CFR Part 565 — VIN Requirements", note: "Federal rule that established the standardized 17-character VIN for model year 1981." },
      { href: "https://www.nhtsa.gov/", label: "NHTSA", note: "Agency that mandated and administers the modern VIN standard." },
      { href: "https://vpic.nhtsa.dot.gov/decoder/", label: "NHTSA vPIC VIN Decoder", note: "Federal reference decoder; coverage is strongest for 1981-and-newer standardized VINs." },
      { href: "https://www.phs-online.com/", label: "Pontiac Historic Services (PHS)", note: "Marque registry providing factory build documentation tied to Pontiac VINs." },
      { href: "https://www.martiauto.com/", label: "Marti Auto Works", note: "Ford-authorized production records and build sheets for 1967-onward Ford vehicles." },
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: "Federal title and brand system; useful mainly for post-1981 standardized VINs." },
    ],
    sourcesFootnote: "Pre-1981 VIN decoding depends on year-specific manufacturer keys; modern database coverage (NMVTIS, history reports) is built around the standardized 17-character VIN and is limited for older vehicles.",
    h2Internal: "More VIN Checks for Classic Buyers",
    internalIntro: "A factory decode is one piece. These checks complete the picture before you commit to a vintage purchase.",
    internalLinks: [
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, accident, odometer, and recall records in one report for post-1981 VINs." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17-character VIN to specs, trim, and factory options." },
      { href: "/accident-history-check", label: "Accident History Check", desc: "Document any recorded collision or damage events alongside the factory build." },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check", desc: "Confirm the car isn't flagged as stolen before money changes hands." },
      { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Catch branded-title damage that undermines a restoration's value." },
      { href: "/odometer-check", label: "Odometer Check", desc: "Verify mileage history where modern records exist for the vehicle." },
    ],
    h2Faq: "Classic Car VIN — Frequently Asked Questions",
    faqIntro: "The questions collectors and restorers ask most when decoding a vintage VIN.",
    bottomBadge: "Free · Instant · VIN-Based",
    ctaBottomHeading: "Decode Any Classic Car VIN",
    ctaBottomSub: "Enter a pre-1981 or modern VIN to decode factory specifications, engine codes, and production data for any vintage vehicle.",
    ctaBottomNote: "No credit card · No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "VIN auto clásico",
    badge: "Clásicos y vintage   ·   Formatos anteriores a 1981",
    h1Lead: "Decodificador VIN de auto clásico — ",
    h1Accent: "Decodifica cualquier vehículo vintage",
    intro: "Antes de 1981 no existía un VIN estandarizado de 17 caracteres — cada fabricante usaba su propio sistema, y esos sistemas cambiaban año tras año. Conocer la clave correcta para una marca y año específicos desbloquea el código de motor, estilo de carrocería, planta de ensamble y los datos de números coincidentes que impulsan el valor de colección de un clásico.",
    formHeading: "Decodifica un VIN de auto clásico",
    formSub: "Ingresa un VIN anterior a 1981 o moderno — decodificaremos la configuración de fábrica para que puedas verificar la autenticidad",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { icon: CalendarClock, value: "Anterior a 1981", label: "expertos en formato" },
      { icon: Factory, value: "GM · Ford", label: "Mopar + AMC" },
      { icon: Hash, value: "Números", label: "verificación coincidente" },
      { icon: Zap, value: "Gratis", label: "decodificación instantánea" },
    ],
    h2How: "Cómo decodificar un VIN clásico",
    howIntro: "La decodificación de VIN anterior a 1981 es un ejercicio de fabricante y año, no una búsqueda en base de datos. Tres pasos convierten un VIN vintage en una configuración de fábrica clara que puedes verificar contra el auto.",
    howSteps: [
      { tag: "Paso 1", title: "Identifica marca y año del modelo", body: "Los VIN anteriores a 1981 no tenían un estándar universal, así que la decodificación depende completamente del fabricante y año. Un 1969 y un 1975 del mismo modelo usan claves diferentes — confirma ambos primero." },
      { tag: "Paso 2", title: "Localiza el VIN y placa de carrocería", body: "Encuentra el VIN en el poste de la puerta, mampara, chasis o placa base del tablero. Anota cualquier placa de capó o carrocería separada cerca de la mampara — lleva códigos de construcción de pintura, carrocería e interior." },
      { tag: "Paso 3", title: "Aplica la clave del fabricante", body: "Usa la tabla de referencia específica del año para esa marca para decodificar división, serie de carrocería, motor, planta de ensamble y secuencia. Estos códigos cambian anualmente, así que la tabla coincidente con el año es esencial." },
    ],
    howNoteBold: "El cuarto paso son los números coincidentes",
    howNoteSuffix: " — verifica el código de motor codificado en el VIN contra los números de fundición y estampado en el bloque, transmisión y eje trasero para confirmar el tren motriz original de fábrica.",
    h2Manufacturers: "Formatos VIN específicos por fabricante anteriores a 1981",
    manufacturersIntro: "Cada fabricante importante desarrolló su propia lógica de codificación VIN. Decodificar un VIN clásico correctamente significa conocer la clave correcta para la marca y año específicos — la posición y codificación de cada elemento difiere por fabricante.",
    manufacturers: [
      { title: "General Motors", years: "1968–1980", body: "Formato de 13 caracteres: código de división, año del modelo, serie de carrocería, estilo de carrocería, motor, planta de ensamble y secuencia. El VIN codifica directamente el código del motor — crítico para la verificación de números coincidentes." },
      { title: "Ford Motor Company", years: "1970–1980", body: "Formato de longitud variable que codifica modelo, motor, planta de ensamble y número secuencial. Las posiciones de código de motor confirman familias como el 428 Cobra Jet o Boss 302." },
      { title: "Chrysler Corporation", years: "1968–1980", body: "Formato de 13 caracteres con una estructura distinta que codifica línea de auto, clase de precio, tipo de carrocería, motor, transmisión y planta — decodifica el tren motriz exacto en un Cuda o Challenger de 1970." },
      { title: "American Motors (AMC)", years: "1968–1980", body: "Sistema de 13 caracteres que codifica año del modelo, serie, tipo de carrocería, motor, transmisión, planta de ensamble y secuencia." },
    ],
    manuNoteBold: "Los códigos cambian cada año",
    manuNoteSuffix: " — decodificar un VIN de Camaro 1969 requiere tablas de referencia diferentes que un VIN de Camaro 1975, aunque ambos son vehículos GM anteriores a la estandarización.",
    h2Learn: "Qué puedes aprender de un VIN clásico",
    learnIntro: "A pesar de la falta de estandarización, los VIN anteriores a 1981 llevan datos ricos para quienes saben leerlos. El VIN es el ancla contra la cual se verifica cada reclamo de autenticidad.",
    learn: [
      { title: "Código de motor de fábrica", body: "Para autos GM el VIN codifica el motor directamente — un Z/28 con un DZ 302 debe mostrar un código específico, exponiendo un motor intercambiado si no lo hace." },
      { title: "Estilo de carrocería y serie", body: "Confirma la línea de carrocería original, dos vs cuatro puertas, hardtop vs convertible contra la descripción del vendedor." },
      { title: "Planta de ensamble y secuencia", body: "Identifica dónde y aproximadamente cuándo se construyó el auto, útil para cruzar referencias con registros de producción." },
      { title: "Año del modelo verdadero", body: "Confirma el año del modelo real — distinto del año en que se vendió el auto o se tituló posteriormente." },
      { title: "Configuración del tren motriz", body: "En los VIN de Mopar, decodifica el motor exacto, transmisión y estilo de carrocería de un auto como un Cuda o Challenger de 1970." },
      { title: "Línea base de números coincidentes", body: "Proporciona la referencia con la que los números físicos de fundición y estampado deben coincidir para un auto verificado de números coincidentes." },
    ],
    h2Matching: "Decodificación VIN vs. verificación completa de números coincidentes",
    matchingIntro: "La decodificación VIN es una capa. Una verificación completa de números coincidentes cruza esos datos contra los sellos físicos y fundiciones del auto — el estándar para cualquier transacción de coleccionista de alto valor.",
    matching1Pre: "Comienza decodificando la ",
    matching1Bold: "configuración de fábrica",
    matching1Suffix: " del VIN — códigos de motor, carrocería y acabado. En muchos clásicos GM y Mopar el código de motor estampado en el VIN es la referencia con la que debe coincidir cada parte física.",
    matching2: "Luego confirma los números reales estampados y fundidos en el bloque del motor, transmisión y eje trasero, y verifica que cada fecha de fundición caiga antes de la fecha de ensamble del auto. Una discrepancia significa un componente reemplazado — y un reclamo falso de números coincidentes.",
    matching3Pre: "Para la mayor procedencia, valida contra un registro de marca o una hoja de construcción de reproducción, y combina la decodificación con un ",
    matching3Link1: "reporte de historial VIN",
    matching3Mid: " completo y una ",
    matching3Link2: "verificación de historial de accidentes",
    matching3Suffix: ".",
    matchingChecklistTitle: "Lista de verificación de números coincidentes",
    matchingChecklist: [
      "Decodifica el VIN para los códigos originales de motor y carrocería de fábrica",
      "Lee la placa de capó / carrocería para datos de pintura, interior y carrocería",
      "Verifica los números de fundición y estampado del bloque del motor",
      "Verifica los códigos de transmisión y eje trasero contra la construcción",
      "Confirma que las fechas de fundición caigan antes de la fecha de ensamble del auto",
      "Valida contra un registro de marca o una hoja de construcción de reproducción",
    ],
    matchingChecklistCta: "Decodifica la configuración de fábrica por VIN primero:",
    midCtaHeading: "Verifica un clásico antes de comprar",
    midCtaSub: "No te bases en la palabra del vendedor para un reclamo de números coincidentes. Decodifica el VIN para revelar la configuración original de fábrica — gratis, en segundos.",
    h2History: "El VIN antes de la estandarización",
    history1: "El VIN moderno estandarizado de 17 caracteres fue ordenado por NHTSA e implementado para todos los vehículos vendidos en los Estados Unidos a partir del año modelo 1981. Antes de esa fecha no había un requisito federal para un formato estandarizado, así que los fabricantes usaban cualquier sistema que eligieran — un mosaico de formatos, longitudes y esquemas de codificación diferentes entre marcas y años.",
    history2: "En los años 50 y principios de los 60, muchos fabricantes usaban números de serie secuenciales simples con un prefijo de modelo — poco más que un contador de producción. A través de los años 60 y 70 desarrollaron sistemas cada vez más sofisticados que incrustaban datos de modelo, motor y planta de ensamble, pero cada esquema era propietario y a menudo cambiaba anualmente.",
    history3: "La longitud también variaba considerablemente. GM usó VINs de 13 caracteres durante la mayor parte de los años 70, Ford usó longitudes variables de 11 a 17 caracteres dependiendo del año, y Chrysler transitó por varios formatos diferentes. Los fabricantes importados tenían sus propios sistemas distintos también.",
    h2Resources: "Recursos para propietarios de autos clásicos",
    resources1Pre: "Los propietarios de autos clásicos tienen acceso a recursos especializados más allá de los servicios generales de verificación VIN. Los registros específicos de marca — como ",
    resources1Bold1: "Pontiac Historic Services (PHS)",
    resources1Mid: " para vehículos Pontiac, ",
    resources1Bold2: "Marti Auto Works",
    resources1Suffix: " para Ford Mustangs, y servicios de datos de hojas de transmisión de Chrysler — proporcionan documentación generada por el fabricante vinculada a VINs individuales que va más allá de lo que contienen las bases de datos generales.",
    resources2: "Estos servicios de registro a menudo suministran hojas de construcción de reproducción, datos de pegatina de ventana y documentación de fábrica que pueden acompañar a un vehículo a través de transacciones y subastas. Para autos de coleccionista de alto valor, esta documentación generada por el fabricante puede agregar miles de dólares al valor de mercado de un vehículo al proporcionar procedencia indiscutible.",
    resources3Pre: "Para una diligencia completa en cualquier compra de auto clásico, también ejecuta una ",
    resources3Link1: "verificación de vehículo robado",
    resources3Mid: " y una ",
    resources3Link2: "verificación de título de salvamento",
    resources3Suffix: " para verificar propiedad limpia e historial de título.",
    resourcesCardTitle: "Por qué la cobertura de clásicos es limitada",
    resourcesCardBullets: [
      "NMVTIS y los reportes de historial fueron construidos alrededor del VIN de 17 caracteres.",
      "Los VIN más cortos anteriores a 1981 a menudo devuelven poca o ninguna data de título u odómetro.",
      "La verificación se apoya en hojas de construcción, registros y placas de carrocería en su lugar.",
      "Un reporte de historial es más útil para cualquier evento de retitulación posterior a 1981.",
    ],
    h2Sources: "Fuentes y referencias",
    sourcesIntro: "El VIN estandarizado, su historia anterior a 1981 y la verificación de autenticidad de autos clásicos se basan en regulación federal y registros específicos de fabricante. Estos son los orígenes autoritativos detrás de las afirmaciones en esta página.",
    sources: [
      { href: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-V/part-565", label: "49 CFR Parte 565 — Requisitos VIN", note: "Regla federal que estableció el VIN estandarizado de 17 caracteres para el año modelo 1981." },
      { href: "https://www.nhtsa.gov/", label: "NHTSA", note: "Agencia que ordenó y administra el estándar moderno de VIN." },
      { href: "https://vpic.nhtsa.dot.gov/decoder/", label: "Decodificador VIN NHTSA vPIC", note: "Decodificador de referencia federal; la cobertura es más fuerte para VINs estandarizados de 1981 en adelante." },
      { href: "https://www.phs-online.com/", label: "Pontiac Historic Services (PHS)", note: "Registro de marca que proporciona documentación de construcción de fábrica vinculada a VINs Pontiac." },
      { href: "https://www.martiauto.com/", label: "Marti Auto Works", note: "Registros de producción autorizados por Ford y hojas de construcción para vehículos Ford de 1967 en adelante." },
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Oficina de Asistencia Judicial", note: "Sistema federal de títulos y marcas; útil principalmente para VINs estandarizados posteriores a 1981." },
    ],
    sourcesFootnote: "La decodificación VIN anterior a 1981 depende de claves específicas del año por fabricante; la cobertura moderna de bases de datos (NMVTIS, reportes de historial) está construida alrededor del VIN estandarizado de 17 caracteres y es limitada para vehículos más antiguos.",
    h2Internal: "Más verificaciones VIN para compradores de clásicos",
    internalIntro: "Una decodificación de fábrica es una pieza. Estas verificaciones completan la imagen antes de comprometerte con una compra vintage.",
    internalLinks: [
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Registros de título, accidentes, odómetro y recalls en un reporte para VINs posteriores a 1981." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica el VIN de 17 caracteres a especificaciones, acabado y opciones de fábrica." },
      { href: "/accident-history-check", label: "Verificación historial accidentes", desc: "Documenta cualquier evento de colisión o daño registrado junto con la construcción de fábrica." },
      { href: "/stolen-vehicle-check", label: "Verificación vehículo robado", desc: "Confirma que el auto no esté marcado como robado antes de que cambie dinero." },
      { href: "/salvage-title-check", label: "Verificación título salvamento", desc: "Detecta daño de título marcado que socava el valor de una restauración." },
      { href: "/odometer-check", label: "Verificación odómetro", desc: "Verifica el historial de kilometraje donde existen registros modernos para el vehículo." },
    ],
    h2Faq: "VIN auto clásico — Preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen coleccionistas y restauradores al decodificar un VIN vintage.",
    bottomBadge: "Gratis · Instantáneo · Basado en VIN",
    ctaBottomHeading: "Decodifica cualquier VIN de auto clásico",
    ctaBottomSub: "Ingresa un VIN anterior a 1981 o moderno para decodificar especificaciones de fábrica, códigos de motor y datos de producción para cualquier vehículo vintage.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Gratis",
  },
  fr: {
    home: "Accueil", crumb: "VIN voiture ancienne",
    badge: "Anciennes et vintage   ·   Formats antérieurs à 1981",
    h1Lead: "Décodeur VIN de voiture ancienne — ",
    h1Accent: "Décode n'importe quel véhicule vintage",
    intro: "Avant 1981, il n'existait pas de VIN standardisé de 17 caractères — chaque fabricant utilisait son propre système, et ces systèmes changeaient d'année en année. Connaître la bonne clé pour une marque et une année modèle spécifiques déverrouille le code moteur, le style de carrosserie, l'usine d'assemblage et les données de numéros correspondants qui portent la valeur de collection d'une voiture ancienne.",
    formHeading: "Décode un VIN de voiture ancienne",
    formSub: "Saisis un VIN antérieur à 1981 ou moderne — nous décoderons la configuration d'usine pour que tu puisses vérifier l'authenticité",
    formNote: "Gratuit · Sans inscription · Résultat instantané",
    trustStats: [
      { icon: CalendarClock, value: "Avant 1981", label: "experts en format" },
      { icon: Factory, value: "GM · Ford", label: "Mopar + AMC" },
      { icon: Hash, value: "Numéros", label: "vérification correspondante" },
      { icon: Zap, value: "Gratuit", label: "décodage instantané" },
    ],
    h2How: "Comment décoder un VIN ancien",
    howIntro: "Le décodage VIN antérieur à 1981 est un exercice de fabricant et d'année, pas une recherche en base de données. Trois étapes transforment un VIN vintage en une configuration d'usine claire que tu peux vérifier contre la voiture.",
    howSteps: [
      { tag: "Étape 1", title: "Identifie marque et année modèle", body: "Les VIN antérieurs à 1981 n'avaient pas de norme universelle, donc le décodage dépend entièrement du fabricant et de l'année. Un 1969 et un 1975 du même modèle utilisent des clés différentes — confirme les deux d'abord." },
      { tag: "Étape 2", title: "Localise le VIN et l'étiquette de finition", body: "Trouve le VIN sur le montant de portière, le pare-feu, le châssis ou la plaque de base du tableau de bord. Note toute étiquette de capot ou de finition séparée près du pare-feu — elle porte les codes de construction de peinture, carrosserie et intérieur." },
      { tag: "Étape 3", title: "Applique la clé du fabricant", body: "Utilise la table de référence spécifique à l'année pour cette marque pour décoder division, série de carrosserie, moteur, usine d'assemblage et séquence. Ces codes changent annuellement, donc la table correspondant à l'année est essentielle." },
    ],
    howNoteBold: "La quatrième étape est les numéros correspondants",
    howNoteSuffix: " — vérifie de manière croisée le code moteur encodé dans le VIN contre les numéros de fonte et d'estampage sur le bloc, la transmission et l'essieu arrière pour confirmer la transmission d'usine originale.",
    h2Manufacturers: "Formats VIN spécifiques aux fabricants antérieurs à 1981",
    manufacturersIntro: "Chaque grand fabricant a développé sa propre logique de codage VIN. Décoder un VIN ancien correctement signifie connaître la bonne clé pour la marque et l'année spécifiques — la position et le codage de chaque élément diffèrent selon le fabricant.",
    manufacturers: [
      { title: "General Motors", years: "1968–1980", body: "Format de 13 caractères : code de division, année modèle, série de carrosserie, style de carrosserie, moteur, usine d'assemblage et séquence. Le VIN encode directement le code moteur — critique pour la vérification des numéros correspondants." },
      { title: "Ford Motor Company", years: "1970–1980", body: "Format à longueur variable encodant modèle, moteur, usine d'assemblage et numéro séquentiel. Les positions de code moteur confirment des familles comme le 428 Cobra Jet ou le Boss 302." },
      { title: "Chrysler Corporation", years: "1968–1980", body: "Format de 13 caractères avec une structure distincte encodant ligne de voiture, classe de prix, type de carrosserie, moteur, transmission et usine — décode la transmission exacte sur un Cuda ou Challenger de 1970." },
      { title: "American Motors (AMC)", years: "1968–1980", body: "Système de 13 caractères encodant année modèle, série, type de carrosserie, moteur, transmission, usine d'assemblage et séquence." },
    ],
    manuNoteBold: "Les codes changent chaque année",
    manuNoteSuffix: " — décoder un VIN de Camaro 1969 nécessite des tables de référence différentes d'un VIN de Camaro 1975, même si les deux sont des véhicules GM antérieurs à la standardisation.",
    h2Learn: "Ce que tu peux apprendre d'un VIN ancien",
    learnIntro: "Malgré le manque de standardisation, les VIN antérieurs à 1981 portent des données riches pour ceux qui savent les lire. Le VIN est l'ancre contre laquelle chaque revendication d'authenticité est vérifiée.",
    learn: [
      { title: "Code moteur d'usine", body: "Pour les voitures GM le VIN encode le moteur directement — un Z/28 avec un DZ 302 devrait afficher un code spécifique, exposant un moteur échangé sinon." },
      { title: "Style et série de carrosserie", body: "Confirme la ligne de carrosserie originale, deux vs quatre portes, hardtop vs cabriolet contre la description du vendeur." },
      { title: "Usine d'assemblage et séquence", body: "Identifie où et approximativement quand la voiture a été construite, utile pour recouper avec les dossiers de production." },
      { title: "Vraie année modèle", body: "Confirme la vraie année modèle — distincte de l'année où la voiture a été vendue ou re-titulée plus tard." },
      { title: "Configuration de la transmission", body: "Sur les VIN Mopar, décode le moteur exact, la transmission et le style de carrosserie d'une voiture comme un Cuda ou Challenger de 1970." },
      { title: "Base de référence des numéros correspondants", body: "Fournit la référence à laquelle les numéros physiques de fonte et d'estampage doivent correspondre pour une voiture vérifiée à numéros correspondants." },
    ],
    h2Matching: "Décodage VIN vs vérification complète des numéros correspondants",
    matchingIntro: "Le décodage VIN est une couche. Une vérification complète des numéros correspondants croise ces données contre les estampes physiques et fontes sur la voiture — la norme pour toute transaction de collectionneur de grande valeur.",
    matching1Pre: "Commence par décoder la ",
    matching1Bold: "configuration d'usine",
    matching1Suffix: " du VIN — codes moteur, carrosserie et finition. Sur de nombreuses voitures classiques GM et Mopar, le code moteur estampé sur le VIN est la référence à laquelle chaque pièce physique doit correspondre.",
    matching2: "Puis confirme les numéros réels estampés et coulés sur le bloc moteur, la transmission et l'essieu arrière, et vérifie que chaque date de fonte tombe avant la date d'assemblage de la voiture. Une incompatibilité signifie un composant remplacé — et une fausse revendication de numéros correspondants.",
    matching3Pre: "Pour la plus forte provenance, valide contre un registre de marque ou une fiche de construction de reproduction, et combine le décodage avec un ",
    matching3Link1: "rapport d'historique VIN",
    matching3Mid: " complet et une ",
    matching3Link2: "vérification d'historique d'accidents",
    matching3Suffix: ".",
    matchingChecklistTitle: "Liste de vérification des numéros correspondants",
    matchingChecklist: [
      "Décode le VIN pour les codes moteur et carrosserie originaux d'usine",
      "Lis l'étiquette de capot / finition pour les données peinture, intérieur et carrosserie",
      "Vérifie de manière croisée les numéros de fonte et d'estampage du bloc moteur",
      "Vérifie les codes de transmission et d'essieu arrière contre la construction",
      "Confirme que les dates de fonte tombent avant la date d'assemblage de la voiture",
      "Valide contre un registre de marque ou une fiche de construction de reproduction",
    ],
    matchingChecklistCta: "Décode d'abord la configuration d'usine par VIN :",
    midCtaHeading: "Vérifie une classique avant d'acheter",
    midCtaSub: "Ne te fie pas à la parole du vendeur pour une revendication de numéros correspondants. Décode le VIN pour révéler la configuration d'usine originale — gratuit, en quelques secondes.",
    h2History: "Le VIN avant la standardisation",
    history1: "Le VIN moderne standardisé de 17 caractères a été mandaté par NHTSA et mis en œuvre pour tous les véhicules vendus aux États-Unis à partir de l'année modèle 1981. Avant cette date, il n'y avait pas d'exigence fédérale pour un format standardisé, donc les fabricants utilisaient n'importe quel système qu'ils choisissaient — un patchwork de formats, longueurs et schémas de codage différents entre marques et années.",
    history2: "Dans les années 1950 et au début des années 1960, beaucoup de fabricants utilisaient des numéros de série séquentiels simples avec un préfixe de modèle — guère plus qu'un compteur de production. Au cours des années 1960 et 1970, ils ont développé des systèmes de plus en plus sophistiqués qui incorporaient des données de modèle, moteur et usine d'assemblage, mais chaque schéma était propriétaire et changeait souvent annuellement.",
    history3: "La longueur variait aussi considérablement. GM utilisait des VIN de 13 caractères pendant la majeure partie des années 1970, Ford utilisait des longueurs variables de 11 à 17 caractères selon l'année, et Chrysler a transité par plusieurs formats différents. Les fabricants d'import avaient aussi leurs propres systèmes distincts.",
    h2Resources: "Ressources pour propriétaires de voitures anciennes",
    resources1Pre: "Les propriétaires de voitures anciennes ont accès à des ressources spécialisées au-delà des services généraux de vérification VIN. Les registres spécifiques aux marques — comme ",
    resources1Bold1: "Pontiac Historic Services (PHS)",
    resources1Mid: " pour les véhicules Pontiac, ",
    resources1Bold2: "Marti Auto Works",
    resources1Suffix: " pour les Ford Mustang, et les services de données de fiches de diffusion Chrysler — fournissent une documentation générée par le fabricant liée à des VIN individuels qui va au-delà de ce que contiennent les bases de données générales.",
    resources2: "Ces services de registre fournissent souvent des fiches de construction de reproduction, des données de vignette de fenêtre et de la documentation d'usine qui peuvent accompagner un véhicule à travers les transactions et les enchères. Pour les voitures de collection de grande valeur, cette documentation d'origine fabricant peut ajouter des milliers de dollars à la valeur de marché d'un véhicule en fournissant une provenance indiscutable.",
    resources3Pre: "Pour une diligence raisonnable complète sur tout achat de voiture ancienne, lance aussi une ",
    resources3Link1: "vérification de véhicule volé",
    resources3Mid: " et une ",
    resources3Link2: "vérification de titre salvage",
    resources3Suffix: " pour vérifier une propriété et un historique de titre propres.",
    resourcesCardTitle: "Pourquoi la couverture des classiques est limitée",
    resourcesCardBullets: [
      "NMVTIS et les rapports d'historique ont été construits autour du VIN de 17 caractères.",
      "Les VIN plus courts antérieurs à 1981 renvoient souvent peu ou aucune donnée de titre ou d'odomètre.",
      "La vérification s'appuie plutôt sur les fiches de construction, registres et étiquettes de finition.",
      "Un rapport d'historique est plus utile pour tout événement de re-titulation post-1981.",
    ],
    h2Sources: "Sources et références",
    sourcesIntro: "Le VIN standardisé, son histoire antérieure à 1981 et la vérification d'authenticité des voitures anciennes s'appuient sur la réglementation fédérale et les registres spécifiques aux fabricants. Ce sont les origines autoritaires derrière les affirmations sur cette page.",
    sources: [
      { href: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-V/part-565", label: "49 CFR Partie 565 — Exigences VIN", note: "Règle fédérale qui a établi le VIN standardisé de 17 caractères pour l'année modèle 1981." },
      { href: "https://www.nhtsa.gov/", label: "NHTSA", note: "Agence qui a mandaté et administre la norme moderne du VIN." },
      { href: "https://vpic.nhtsa.dot.gov/decoder/", label: "Décodeur VIN NHTSA vPIC", note: "Décodeur de référence fédéral ; la couverture est la plus forte pour les VIN standardisés à partir de 1981." },
      { href: "https://www.phs-online.com/", label: "Pontiac Historic Services (PHS)", note: "Registre de marque fournissant la documentation de construction d'usine liée aux VIN Pontiac." },
      { href: "https://www.martiauto.com/", label: "Marti Auto Works", note: "Dossiers de production autorisés par Ford et fiches de construction pour les véhicules Ford à partir de 1967." },
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: "Système fédéral de titres et de marques ; utile principalement pour les VIN standardisés post-1981." },
    ],
    sourcesFootnote: "Le décodage VIN antérieur à 1981 dépend des clés spécifiques à l'année par fabricant ; la couverture moderne des bases de données (NMVTIS, rapports d'historique) est construite autour du VIN standardisé de 17 caractères et est limitée pour les véhicules plus anciens.",
    h2Internal: "Plus de vérifications VIN pour les acheteurs de classiques",
    internalIntro: "Un décodage d'usine est une pièce. Ces vérifications complètent l'image avant que tu ne t'engages dans un achat vintage.",
    internalLinks: [
      { href: "/vin-check", label: "Vérification complète d'historique VIN", desc: "Dossiers de titre, accident, odomètre et rappels dans un rapport pour les VIN post-1981." },
      { href: "/vin-decoder", label: "Décodeur VIN", desc: "Décode le VIN de 17 caractères en spécifications, finition et options d'usine." },
      { href: "/accident-history-check", label: "Vérification d'historique d'accidents", desc: "Documente tout événement de collision ou de dommage enregistré aux côtés de la construction d'usine." },
      { href: "/stolen-vehicle-check", label: "Vérification de véhicule volé", desc: "Confirme que la voiture n'est pas signalée comme volée avant que l'argent ne change de mains." },
      { href: "/salvage-title-check", label: "Vérification de titre salvage", desc: "Attrape les dommages de titre marqués qui sapent la valeur d'une restauration." },
      { href: "/odometer-check", label: "Vérification d'odomètre", desc: "Vérifie l'historique du kilométrage là où des dossiers modernes existent pour le véhicule." },
    ],
    h2Faq: "VIN voiture ancienne — Foire aux questions",
    faqIntro: "Les questions que les collectionneurs et restaurateurs posent le plus lors du décodage d'un VIN vintage.",
    bottomBadge: "Gratuit · Instantané · Basé sur VIN",
    ctaBottomHeading: "Décode n'importe quel VIN de voiture ancienne",
    ctaBottomSub: "Saisis un VIN antérieur à 1981 ou moderne pour décoder les spécifications d'usine, les codes moteur et les données de production pour n'importe quel véhicule vintage.",
    ctaBottomNote: "Pas de carte de crédit · Pas d'inscription · Gratuit",
  },
} as const;

const FAQS_EN = [
  { question: "How do I decode a classic car VIN from before 1981?", answer: "Identify the exact make and model year first, then apply that manufacturer's specific decoding key — there was no universal standard before 1981. A GM VIN from the 1970s uses a 13-character format encoding division, model year, body series, engine, and assembly plant, while Ford and Chrysler used entirely different schemes. Because the coding changed year to year, decoding a 1969 Camaro requires different reference tables than a 1975 Camaro." },
  { question: "Why are old car VINs shorter than 17 characters?", answer: "The standardized 17-character VIN only became mandatory for the 1981 model year, when NHTSA required a uniform format for all vehicles sold in the United States. Before that, there was no federal length requirement, so manufacturers used their own systems. Pre-1981 VINs commonly ran 11 to 17 characters — GM used 13 characters through most of the 1970s, while Ford varied from 11 to 17 depending on the year." },
  { question: "Can you run a vehicle history report on a classic car?", answer: "Coverage is limited for pre-1981 vehicles. NMVTIS and commercial history reports were built around the standardized 17-character VIN, so older shorter VINs often return little or no title, accident, or odometer data. Verification of a classic car instead relies on manufacturer build sheets, marque registries, original trim tags, and documented ownership records rather than a modern database lookup. A history report is most useful for confirming any post-1981 retitling events." },
  { question: "Where is the VIN located on a classic car?", answer: "VIN placement varied by era and manufacturer. On many 1950s and 1960s cars the number is stamped on a plate riveted to the driver's door post, door jamb, or firewall, or on a tag attached to the frame. Dashboard-visible VIN plates at the base of the windshield became common in the late 1960s. Classic cars often also carry separate body trim tags or cowl tags with additional build codes near the firewall." },
  { question: "How have VIN formats changed over the decades?", answer: "In the 1950s and early 1960s, most VINs were simple sequential serial numbers with a model prefix — little more than a production counter. Through the 1960s and 1970s, manufacturers added encoded model, engine, and assembly-plant data, but each scheme was proprietary and frequently changed annually. The 1981 model year introduced the universal 17-character standard with a fixed structure: world manufacturer identifier, vehicle descriptor, check digit, and serial section." },
  { question: "What does numbers-matching mean for a classic car?", answer: "Numbers-matching means the engine, transmission, and other major components carry casting and stamping codes that match the vehicle's original factory build for that VIN. On many GM and Mopar classics, the VIN-stamped engine code can be cross-checked against the casting numbers on the block to confirm the original drivetrain. A verified numbers-matching car commands a significant premium over one with correct-appearing but replaced components." },
  { question: "How do I verify a classic car's authenticity?", answer: "Decode the VIN for the original factory configuration, then cross-check it against physical evidence: the trim/cowl tag, casting numbers on the engine and transmission, and the rear axle code. Confirm these against marque-specific registries and reproduction build sheets — for example Pontiac Historic Services for Pontiacs or Marti Auto Works for 1967-onward Fords. Manufacturer-sourced documentation tied to the VIN provides the strongest provenance for high-value collector cars." },
];

const FAQS_ES = [
  { question: "¿Cómo decodifico un VIN de auto clásico anterior a 1981?", answer: "Identifica primero la marca exacta y año del modelo, luego aplica la clave específica de decodificación de ese fabricante — no había un estándar universal antes de 1981. Un VIN GM de los años 70 usa un formato de 13 caracteres que codifica división, año del modelo, serie de carrocería, motor y planta de ensamble, mientras Ford y Chrysler usaban esquemas completamente diferentes. Como la codificación cambiaba año tras año, decodificar un Camaro 1969 requiere tablas de referencia diferentes que un Camaro 1975." },
  { question: "¿Por qué los VIN de autos antiguos son más cortos que 17 caracteres?", answer: "El VIN estandarizado de 17 caracteres solo se hizo obligatorio para el año modelo 1981, cuando NHTSA requirió un formato uniforme para todos los vehículos vendidos en los Estados Unidos. Antes de eso, no había requisito federal de longitud, así que los fabricantes usaban sus propios sistemas. Los VIN anteriores a 1981 comúnmente tenían de 11 a 17 caracteres — GM usó 13 caracteres durante la mayor parte de los años 70, mientras Ford variaba de 11 a 17 dependiendo del año." },
  { question: "¿Puedes ejecutar un reporte de historial de vehículo en un auto clásico?", answer: "La cobertura es limitada para vehículos anteriores a 1981. NMVTIS y los reportes comerciales de historial fueron construidos alrededor del VIN estandarizado de 17 caracteres, así que los VINs más cortos y antiguos a menudo devuelven poca o ninguna data de título, accidentes u odómetro. La verificación de un auto clásico en su lugar se basa en hojas de construcción del fabricante, registros de marca, placas de carrocería originales y registros documentados de propiedad en lugar de una búsqueda en base de datos moderna. Un reporte de historial es más útil para confirmar cualquier evento de retitulación posterior a 1981." },
  { question: "¿Dónde está ubicado el VIN en un auto clásico?", answer: "La ubicación del VIN variaba por era y fabricante. En muchos autos de los años 50 y 60 el número está estampado en una placa remachada en el poste de la puerta del conductor, marco de la puerta o mampara, o en una placa adherida al chasis. Las placas VIN visibles desde el tablero en la base del parabrisas se hicieron comunes a finales de los años 60. Los autos clásicos a menudo también llevan placas de carrocería o capó separadas con códigos adicionales de construcción cerca de la mampara." },
  { question: "¿Cómo han cambiado los formatos VIN a través de las décadas?", answer: "En los años 50 y principios de los 60, la mayoría de los VINs eran números de serie secuenciales simples con un prefijo de modelo — poco más que un contador de producción. A través de los años 60 y 70, los fabricantes agregaron datos codificados de modelo, motor y planta de ensamble, pero cada esquema era propietario y cambiaba frecuentemente anualmente. El año modelo 1981 introdujo el estándar universal de 17 caracteres con una estructura fija: identificador mundial del fabricante, descriptor del vehículo, dígito de verificación y sección serial." },
  { question: "¿Qué significan los números coincidentes para un auto clásico?", answer: "Números coincidentes significa que el motor, transmisión y otros componentes principales llevan códigos de fundición y estampado que coinciden con la construcción original de fábrica del vehículo para ese VIN. En muchos clásicos GM y Mopar, el código de motor estampado en el VIN puede verificarse contra los números de fundición en el bloque para confirmar el tren motriz original. Un auto verificado de números coincidentes obtiene un premio significativo sobre uno con componentes que parecen correctos pero han sido reemplazados." },
  { question: "¿Cómo verifico la autenticidad de un auto clásico?", answer: "Decodifica el VIN para la configuración original de fábrica, luego verifícalo contra evidencia física: la placa de carrocería/capó, números de fundición en el motor y transmisión, y el código del eje trasero. Confirma estos contra registros específicos de marca y hojas de construcción de reproducción — por ejemplo Pontiac Historic Services para Pontiacs o Marti Auto Works para Fords de 1967 en adelante. La documentación generada por el fabricante vinculada al VIN proporciona la mayor procedencia para autos de coleccionista de alto valor." },
];

interface Props { locale: Locale; }

export default function ClassicCarVinBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <History className="w-4 h-4" /> {c.badge}
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
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Hash className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.howNoteBold}</strong>
                {c.howNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Manufacturers}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.manufacturersIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.manufacturers.map((m) => {
              const Icon = MANUFACTURER_ICON;
              return (
                <div key={m.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-mono font-black text-primary/70">{m.years}</span>
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{m.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <CalendarClock className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.manuNoteBold}</strong>
                {c.manuNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Learn}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.learnIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.learn.map((item, i) => {
              const Icon = LEARN_ICONS[i];
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Matching}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.matchingIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.matching1Pre}
                <strong className="text-on-surface">{c.matching1Bold}</strong>
                {c.matching1Suffix}
              </p>
              <p>{c.matching2}</p>
              <p>
                {c.matching3Pre}
                <Link href={link("/vin-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.matching3Link1}</Link>
                {c.matching3Mid}
                <Link href={link("/accident-history-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.matching3Link2}</Link>
                {c.matching3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.matchingChecklistTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.matchingChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.matchingChecklistCta}</p>
                <VinSearchForm size="sm"  locale={locale}/>
              </div>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2History}</h2>
          <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4 max-w-3xl">
            <p>{c.history1}</p>
            <p>{c.history2}</p>
            <p>{c.history3}</p>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Resources}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.resources1Pre}
                <strong className="text-on-surface">{c.resources1Bold1}</strong>
                {c.resources1Mid}
                <strong className="text-on-surface">{c.resources1Bold2}</strong>
                {c.resources1Suffix}
              </p>
              <p>{c.resources2}</p>
              <p>
                {c.resources3Pre}
                <Link href={link("/stolen-vehicle-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.resources3Link1}</Link>
                {c.resources3Mid}
                <Link href={link("/salvage-title-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.resources3Link2}</Link>
                {c.resources3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.resourcesCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface-variant">
                {c.resourcesCardBullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary">{c.h2Sources}</h2>
          </div>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.sourcesIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {c.sources.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer nofollow" className="rounded-2xl border border-outline-variant bg-surface p-4 hover:border-primary/40 hover:bg-primary/5 transition-colors">
                <span className="text-sm font-bold text-primary underline underline-offset-2">{s.label} ↗</span>
                <p className="mt-1.5 text-xs text-on-surface-variant leading-relaxed">{s.note}</p>
              </a>
            ))}
          </div>
          <p className="mt-5 text-xs text-on-surface-variant italic">{c.sourcesFootnote}</p>
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

        <RelatedChecks exclude="/classic-car-vin" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
