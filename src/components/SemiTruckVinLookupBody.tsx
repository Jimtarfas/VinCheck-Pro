/**
 * Shared body for /semi-truck-vin-lookup and /es/semi-truck-vin-lookup.
 * Wave 18 batch 3 — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, AlertCircle, Truck, MapPin, ChevronRight,
  Lock, Zap, BadgeCheck, Container, ScanLine, Wrench, ClipboardCheck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [MapPin, ScanLine, Search, ClipboardCheck, Shield] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Semi Truck VIN Lookup",
    badge: "Tractors & Trailers   ·   Every Class 8 Builder",
    h1Lead: "Semi Truck VIN Lookup — ",
    h1Accent: "Decode Any Tractor Free",
    intro: "A semi truck's VIN works exactly like a car's — 17 characters that decode the make, model year, engine, GVWR class, and plant. Look up any Freightliner, Peterbilt, Kenworth, Volvo, Mack or International tractor, plus semi trailers, free.",
    formHeading: "Look Up a Semi Truck or Trailer VIN",
    formSub: "Enter the 17-character VIN — we'll return the make, model, year, engine, GVWR class, and history",
    formNote: "Free · No sign-up · Instant spec",
    trustStats: [
      { icon: Truck, value: "Class 8", label: "tractors & trailers" },
      { icon: Container, value: "17", label: "characters decoded" },
      { icon: Zap, value: "Instant", label: "no sign-up needed" },
      { icon: BadgeCheck, value: "Free", label: "make, year & engine" },
    ],
    h2Same: "A Semi Truck VIN Is the Same Standard as a Car VIN",
    sameIntroPre: "This is the thing buyers and owner-operators ask most. The short answer: a heavy truck's VIN follows the ",
    sameIntroBold: "exact same 17-character standard",
    sameIntroSuffix: " as a passenger car. The decoding rules don't change — only the spec it describes (GVWR class, sleeper cab, drive axles) is heavy-duty.",
    tractorTag: "The Tractor",
    tractorTitle: "Freightliner · Peterbilt · Kenworth · Volvo · Mack",
    tractorBullets: [
      "17-character VIN on the door jamb, frame rail, and title.",
      "Decodes the model line, engine family, and GVWR class.",
      "WMI starts with 1, 4, or 5 on U.S.-built trucks.",
    ],
    trailerTag: "The Trailer",
    trailerTitle: "Dry van · Reefer · Flatbed · Lowboy · Tanker",
    trailerBullets: [
      "Its own 17-character VIN on the front wall and frame.",
      "Decodes the builder, trailer type, and axle setup.",
      "Decoded the same way as the tractor — same tool.",
    ],
    sameNoteBoldLead: "Quick test:",
    sameNoteSuffix: " count the characters. If it's exactly 17 with no letters I, O or Q, it's a modern VIN and the tool above will decode it. A shorter number on an older utility trailer predates the VIN standard and must be read from the manufacturer's plate instead.",
    h2How: "How to Look Up a Semi Truck by VIN — Step by Step",
    howIntro: "Five steps from \"where is it?\" to a full identification and history. Works for tractors and trailers with a standard 17-character VIN.",
    howSteps: [
      { step: "01", title: "Find the VIN on the truck", body: "Heavy trucks carry the VIN in more places than a car because the cab and chassis are often built separately. Check the driver-side door-jamb label, the frame rail near the front axle, the dash through the windshield, and the title or apportioned cab card. Every copy should match." },
      { step: "02", title: "Read all 17 characters", body: "Modern truck and trailer VINs are exactly 17 characters. Copy them precisely — the letters I, O and Q are never used, so anything that looks like one is really a 1 or a 0. A single wrong character decodes a different vehicle." },
      { step: "03", title: "Decode it instantly", body: "Enter the VIN above. The decoder reads the WMI (builder + country), the descriptor section (model, cab, engine, GVWR class), the model-year character, and the plant code — returning the full spec in seconds, free." },
      { step: "04", title: "Match it to the listing & title", body: "Confirm the decoded make, model, year and engine match what the seller and paperwork claim. Then match the frame-rail stamping to the door label. A mismatch between the decoded truck and the advertised unit is an immediate red flag." },
      { step: "05", title: "Extend to a full history check", body: "When you're buying a six-figure tractor, take the same VIN into a full history report — title brands, odometer or hub-meter tampering, accident records, liens, and theft data — so you know the truck's past, not just its spec." },
    ],
    stepWord: "Step",
    h2Builders: "The Big Class 8 Builders & Their VIN Codes",
    buildersIntroPre: "The first three characters of a VIN — the WMI — name the builder. Here are the codes for every major North American semi manufacturer. All of them decode through the ",
    buildersIntroLink: "same free tool",
    buildersIntroSuffix: " — you don't need a separate site per brand.",
    builderColBuilder: "Builder", builderColWmi: "WMI (1–3)", builderColDetail: "What the VIN decodes to",
    builderRows: [
      { builder: "Freightliner", wmi: "1FU · 3AK", detail: "The most common semi on U.S. roads. Decodes the Cascadia, Coronado, and M2 model lines plus the engine (Detroit DD13/DD15, Cummins X15) and GVWR class." },
      { builder: "Peterbilt", wmi: "1XP · 2NP", detail: "Decodes the 579, 389, 567 and other model lines, the engine, and the axle configuration. A premium owner-operator favourite." },
      { builder: "Kenworth", wmi: "1XK · 1NK", detail: "T680, W900, and T880 model lines with the drivetrain spec. Shares a parent (PACCAR) with Peterbilt." },
      { builder: "Volvo Trucks", wmi: "4V4 · 4V5", detail: "The VNL and VNR series plus the Volvo D11/D13 engine and I-Shift transmission details." },
      { builder: "Mack", wmi: "1M1 · 1M2", detail: "Anthem, Pinnacle, and Granite lines with the MP-series engine. Built by the same group as Volvo Trucks." },
      { builder: "International (Navistar)", wmi: "1HT · 3HA", detail: "LT, LoneStar, and HX model lines with the engine and cab spec. A long-standing North American heavy-truck builder." },
    ],
    h2Where: "Where to Find the VIN on a Semi Truck & Trailer",
    whereIntro: "Heavy trucks carry the VIN in more places than a passenger car, because the cab and the chassis are often built separately. Check these spots — and make sure they all agree.",
    whereColLoc: "Location", whereColUnit: "Tractor or Trailer", whereColNote: "Notes",
    unitTractor: "Tractor", unitTrailer: "Trailer", unitBoth: "Both",
    whereRows: [
      { loc: "Driver-side door jamb", unit: "Tractor", note: "The federal certification label — the most reliable copy on the truck." },
      { loc: "Frame rail", unit: "Both", note: "Stamped into the steel on the driver's side near the front axle. The 'true' chassis number — trust this if a label looks tampered with." },
      { loc: "Dashboard", unit: "Tractor", note: "Visible through the windshield on newer tractors." },
      { loc: "Front wall plate", unit: "Trailer", note: "Riveted to the front wall, or on the driver-side frame near the landing gear." },
      { loc: "Title & cab card", unit: "Both", note: "On the title, registration, and the IRP / apportioned cab card." },
    ],
    trailerBuildersPre: "Common trailer builders you'll decode: ",
    trailerBuilders: "Great Dane · Wabash · Utility · Hyundai Translead · Stoughton · Vanguard · Wilson · MAC · Fontaine · Reitnouer",
    trailerBuildersSuffix: ".",
    midCtaHeading: "Decode a Tractor or Trailer VIN in Seconds",
    midCtaSub: "Free, instant identification straight from the manufacturer's build record — make, model, year, engine, and GVWR class.",
    h2Match: "Always Match the VIN Before You Buy a Used Truck",
    match1: "A semi tractor is a six-figure asset that crosses state lines and changes hands fast — the exact conditions that hide salvage rebuilds, odometer or hub-meter tampering, and outstanding liens. The VIN is your single best defence.",
    match2: "Decode the number first to confirm the truck type matches the advert. A VIN that decodes to a different model, engine, or year than the one in front of you is a stop-the-deal red flag. Then verify the same number on the title, the door jamb, and the frame-rail stamping all agree.",
    match3Pre: "When the spec checks out, take the VIN into a full ",
    match3Link: "title and history check",
    match3Suffix: " to surface the records a decode alone can't — title brands, accident damage, liens, and theft markers.",
    redFlagsTitle: "Truck VIN red flags",
    redFlags: [
      "Decoded model or engine doesn't match the listing",
      "The VIN contains an I, O, or Q (never valid)",
      "Title VIN differs from the number on the truck",
      "Door-jamb label and frame-rail stamping disagree",
      "Frame plate looks re-riveted, ground, or repainted",
      "Fewer than 17 characters on a post-1981 unit",
    ],
    redFlagsCta: "Check a truck VIN now:",
    h2Internal: "More Checks That Read a Truck VIN",
    internalIntro: "The same 17 characters unlock every one of these checks.",
    internalLinks: [
      { href: "/", label: "VIN Decoder", desc: "The core free decode — make, model, year, engine, and plant for any tractor or trailer VIN." },
      { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Was the tractor or trailer ever totaled and rebuilt? Catch branded titles before you buy." },
      { href: "/accident-history-check", label: "Accident History Check", desc: "Major frame or collision damage reported against the VIN." },
      { href: "/vehicle-lien-check", label: "Vehicle Lien Check", desc: "Is a bank still owed money on the unit? Confirm there's no outstanding lien." },
      { href: "/odometer-check", label: "Odometer Check", desc: "Verify the mileage trail and spot ECM or hub-meter tampering on the VIN." },
      { href: "/recall-check", label: "Recall Check", desc: "Open NHTSA safety recalls on the tractor, engine, or trailer." },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check", desc: "Confirm the tractor or trailer isn't flagged as stolen before you pay." },
      { href: "/chassis-number-lookup", label: "Chassis Number Lookup", desc: "For international buyers — the same 17-character code is called the chassis number outside North America." },
    ],
    h2Faq: "Semi Truck VIN Lookup — Frequently Asked Questions",
    faqIntro: "Direct answers to what truck and trailer buyers ask most.",
    bottomBadge: "Free · Instant · Class 8",
    ctaBottomHeading: "Look Up Any Semi Truck or Trailer by VIN",
    ctaBottomSub: "Enter a 17-character VIN to identify the make, model, year, and engine, then unlock the full title, mileage, lien, and accident history.",
    ctaBottomNote: "No credit card · No sign-up · Free spec",
  },
  es: {
    home: "Inicio", crumb: "Búsqueda VIN de camión semirremolque",
    badge: "Tractores y remolques   ·   Cada constructor Clase 8",
    h1Lead: "Búsqueda VIN de camión semirremolque — ",
    h1Accent: "Decodifica cualquier tractor gratis",
    intro: "El VIN de un camión semirremolque funciona exactamente como el de un auto — 17 caracteres que decodifican la marca, año modelo, motor, Clase GVWR y planta. Busca cualquier tractor Freightliner, Peterbilt, Kenworth, Volvo, Mack o International, más semirremolques, gratis.",
    formHeading: "Busca un VIN de camión semirremolque o remolque",
    formSub: "Ingresa el VIN de 17 caracteres — devolveremos la marca, modelo, año, motor, Clase GVWR e historial",
    formNote: "Gratis · Sin registro · Especificación instantánea",
    trustStats: [
      { icon: Truck, value: "Clase 8", label: "tractores y remolques" },
      { icon: Container, value: "17", label: "caracteres decodificados" },
      { icon: Zap, value: "Instantáneo", label: "sin registro" },
      { icon: BadgeCheck, value: "Gratis", label: "marca, año y motor" },
    ],
    h2Same: "Un VIN de camión semirremolque es el mismo estándar que un VIN de auto",
    sameIntroPre: "Esto es lo que más preguntan los compradores y operadores-propietarios. La respuesta corta: el VIN de un camión pesado sigue el ",
    sameIntroBold: "mismo estándar exacto de 17 caracteres",
    sameIntroSuffix: " que un auto de pasajeros. Las reglas de decodificación no cambian — solo la especificación que describe (Clase GVWR, cabina dormitorio, ejes de tracción) es de servicio pesado.",
    tractorTag: "El tractor",
    tractorTitle: "Freightliner · Peterbilt · Kenworth · Volvo · Mack",
    tractorBullets: [
      "VIN de 17 caracteres en el marco de puerta, riel del chasis y título.",
      "Decodifica la línea de modelo, familia de motor y Clase GVWR.",
      "El WMI comienza con 1, 4 o 5 en camiones construidos en EE. UU.",
    ],
    trailerTag: "El remolque",
    trailerTitle: "Caja seca · Refrigerado · Plataforma · Lowboy · Cisterna",
    trailerBullets: [
      "Su propio VIN de 17 caracteres en la pared frontal y chasis.",
      "Decodifica al constructor, tipo de remolque y configuración de ejes.",
      "Decodificado de la misma manera que el tractor — misma herramienta.",
    ],
    sameNoteBoldLead: "Prueba rápida:",
    sameNoteSuffix: " cuenta los caracteres. Si son exactamente 17 sin letras I, O o Q, es un VIN moderno y la herramienta de arriba lo decodificará. Un número más corto en un remolque utilitario más antiguo precede al estándar VIN y debe leerse de la placa del fabricante.",
    h2How: "Cómo buscar un camión semirremolque por VIN — Paso a paso",
    howIntro: "Cinco pasos desde \"¿dónde está?\" hasta una identificación completa e historial. Funciona para tractores y remolques con un VIN estándar de 17 caracteres.",
    howSteps: [
      { step: "01", title: "Encuentra el VIN en el camión", body: "Los camiones pesados llevan el VIN en más lugares que un auto porque la cabina y el chasis a menudo se construyen por separado. Revisa la etiqueta del marco de puerta del lado del conductor, el riel del chasis cerca del eje delantero, el tablero a través del parabrisas y el título o tarjeta apportionada de cabina. Cada copia debe coincidir." },
      { step: "02", title: "Lee los 17 caracteres", body: "Los VIN modernos de camión y remolque son exactamente 17 caracteres. Cópialos con precisión — las letras I, O y Q nunca se usan, así que cualquier cosa que parezca una es realmente un 1 o un 0. Un solo carácter equivocado decodifica un vehículo diferente." },
      { step: "03", title: "Decodifícalo al instante", body: "Ingresa el VIN arriba. El decodificador lee el WMI (constructor + país), la sección descriptora (modelo, cabina, motor, Clase GVWR), el carácter de año modelo y el código de planta — devolviendo la especificación completa en segundos, gratis." },
      { step: "04", title: "Coincídelo con el listado y título", body: "Confirma que la marca, modelo, año y motor decodificados coincidan con lo que el vendedor y papeleo afirman. Luego coincide el estampado del riel del chasis con la etiqueta de puerta. Una discrepancia entre el camión decodificado y la unidad anunciada es una bandera roja inmediata." },
      { step: "05", title: "Extiende a una verificación completa de historial", body: "Cuando estás comprando un tractor de seis cifras, lleva el mismo VIN a un reporte completo de historial — marcas de título, manipulación de odómetro o hub-meter, registros de accidentes, gravámenes y datos de robo — para que conozcas el pasado del camión, no solo su especificación." },
    ],
    stepWord: "Paso",
    h2Builders: "Los grandes constructores Clase 8 y sus códigos VIN",
    buildersIntroPre: "Los primeros tres caracteres de un VIN — el WMI — nombran al constructor. Aquí están los códigos para cada fabricante norteamericano principal de semi. Todos ellos se decodifican a través de la ",
    buildersIntroLink: "misma herramienta gratis",
    buildersIntroSuffix: " — no necesitas un sitio separado por marca.",
    builderColBuilder: "Constructor", builderColWmi: "WMI (1–3)", builderColDetail: "Lo que decodifica el VIN",
    builderRows: [
      { builder: "Freightliner", wmi: "1FU · 3AK", detail: "El semi más común en las carreteras de EE. UU. Decodifica las líneas Cascadia, Coronado y M2 más el motor (Detroit DD13/DD15, Cummins X15) y Clase GVWR." },
      { builder: "Peterbilt", wmi: "1XP · 2NP", detail: "Decodifica las líneas 579, 389, 567 y otros modelos, el motor y la configuración de ejes. Un favorito premium del operador-propietario." },
      { builder: "Kenworth", wmi: "1XK · 1NK", detail: "Líneas de modelo T680, W900 y T880 con la especificación de tren motriz. Comparte casa matriz (PACCAR) con Peterbilt." },
      { builder: "Volvo Trucks", wmi: "4V4 · 4V5", detail: "Las series VNL y VNR más los detalles del motor Volvo D11/D13 y transmisión I-Shift." },
      { builder: "Mack", wmi: "1M1 · 1M2", detail: "Líneas Anthem, Pinnacle y Granite con el motor serie MP. Construido por el mismo grupo que Volvo Trucks." },
      { builder: "International (Navistar)", wmi: "1HT · 3HA", detail: "Líneas de modelo LT, LoneStar y HX con la especificación de motor y cabina. Un constructor norteamericano de larga trayectoria en camiones pesados." },
    ],
    h2Where: "Dónde encontrar el VIN en un camión semirremolque y remolque",
    whereIntro: "Los camiones pesados llevan el VIN en más lugares que un auto de pasajeros, porque la cabina y el chasis a menudo se construyen por separado. Revisa estos lugares — y asegúrate que todos coincidan.",
    whereColLoc: "Ubicación", whereColUnit: "Tractor o remolque", whereColNote: "Notas",
    unitTractor: "Tractor", unitTrailer: "Remolque", unitBoth: "Ambos",
    whereRows: [
      { loc: "Marco de puerta del conductor", unit: "Tractor", note: "La etiqueta federal de certificación — la copia más confiable en el camión." },
      { loc: "Riel del chasis", unit: "Ambos", note: "Estampado en el acero del lado del conductor cerca del eje delantero. El número de chasis 'verdadero' — confía en este si una etiqueta parece alterada." },
      { loc: "Tablero", unit: "Tractor", note: "Visible a través del parabrisas en tractores más nuevos." },
      { loc: "Placa de pared frontal", unit: "Remolque", note: "Remachada en la pared frontal, o en el chasis del lado del conductor cerca del tren de aterrizaje." },
      { loc: "Título y tarjeta de cabina", unit: "Ambos", note: "En el título, registro y la tarjeta apportionada / IRP de cabina." },
    ],
    trailerBuildersPre: "Constructores comunes de remolques que decodificarás: ",
    trailerBuilders: "Great Dane · Wabash · Utility · Hyundai Translead · Stoughton · Vanguard · Wilson · MAC · Fontaine · Reitnouer",
    trailerBuildersSuffix: ".",
    midCtaHeading: "Decodifica un VIN de tractor o remolque en segundos",
    midCtaSub: "Identificación gratis e instantánea directamente del registro de construcción del fabricante — marca, modelo, año, motor y Clase GVWR.",
    h2Match: "Siempre coincide el VIN antes de comprar un camión usado",
    match1: "Un tractor semi es un activo de seis cifras que cruza líneas estatales y cambia de manos rápidamente — las condiciones exactas que ocultan reconstrucciones de salvamento, manipulación de odómetro o hub-meter y gravámenes pendientes. El VIN es tu mejor defensa.",
    match2: "Decodifica el número primero para confirmar que el tipo de camión coincide con el anuncio. Un VIN que decodifica a un modelo, motor o año diferente al que tienes enfrente es una bandera roja para detener el trato. Luego verifica que el mismo número en el título, marco de puerta y estampado del riel del chasis coincidan.",
    match3Pre: "Cuando la especificación cuadra, lleva el VIN a una ",
    match3Link: "verificación completa de título e historial",
    match3Suffix: " para revelar los registros que una decodificación sola no puede — marcas de título, daño por accidente, gravámenes y marcadores de robo.",
    redFlagsTitle: "Banderas rojas del VIN de camión",
    redFlags: [
      "El modelo o motor decodificado no coincide con el listado",
      "El VIN contiene una I, O o Q (nunca válido)",
      "El VIN del título difiere del número en el camión",
      "La etiqueta del marco de puerta y el estampado del riel del chasis no coinciden",
      "La placa del chasis parece re-remachada, lijada o repintada",
      "Menos de 17 caracteres en una unidad post-1981",
    ],
    redFlagsCta: "Verifica un VIN de camión ahora:",
    h2Internal: "Más verificaciones que leen un VIN de camión",
    internalIntro: "Los mismos 17 caracteres desbloquean cada una de estas verificaciones.",
    internalLinks: [
      { href: "/", label: "Decodificador VIN", desc: "La decodificación gratis central — marca, modelo, año, motor y planta para cualquier VIN de tractor o remolque." },
      { href: "/salvage-title-check", label: "Verificación título salvamento", desc: "¿Alguna vez el tractor o remolque fue totalizado y reconstruido? Atrapa títulos marcados antes de comprar." },
      { href: "/accident-history-check", label: "Verificación historial accidentes", desc: "Daño mayor al chasis o colisión reportado contra el VIN." },
      { href: "/vehicle-lien-check", label: "Verificación gravamen vehicular", desc: "¿Un banco aún se debe dinero por la unidad? Confirma que no hay gravamen pendiente." },
      { href: "/odometer-check", label: "Verificación odómetro", desc: "Verifica el rastro de kilometraje y detecta manipulación de ECM o hub-meter en el VIN." },
      { href: "/recall-check", label: "Verificación de recalls", desc: "Recalls de seguridad NHTSA abiertos en el tractor, motor o remolque." },
      { href: "/stolen-vehicle-check", label: "Verificación vehículo robado", desc: "Confirma que el tractor o remolque no esté marcado como robado antes de pagar." },
      { href: "/chassis-number-lookup", label: "Búsqueda número de chasis", desc: "Para compradores internacionales — el mismo código de 17 caracteres se llama número de chasis fuera de Norteamérica." },
    ],
    h2Faq: "Búsqueda VIN de camión semirremolque — Preguntas frecuentes",
    faqIntro: "Respuestas directas a lo que más preguntan los compradores de camión y remolque.",
    bottomBadge: "Gratis · Instantáneo · Clase 8",
    ctaBottomHeading: "Busca cualquier camión semirremolque o remolque por VIN",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres para identificar la marca, modelo, año y motor, luego desbloquea el historial completo de título, kilometraje, gravamen y accidentes.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Especificación gratis",
  },
  fr: {
    home: "Accueil", crumb: "Recherche VIN de camion semi-remorque",
    badge: "Tracteurs et remorques   ·   Chaque constructeur Classe 8",
    h1Lead: "Recherche VIN de camion semi-remorque — ",
    h1Accent: "Décode n'importe quel tracteur gratuitement",
    intro: "Le VIN d'un camion semi-remorque fonctionne exactement comme celui d'une voiture — 17 caractères qui décodent la marque, l'année modèle, le moteur, la classe GVWR et l'usine. Cherche n'importe quel tracteur Freightliner, Peterbilt, Kenworth, Volvo, Mack ou International, plus les semi-remorques, gratuitement.",
    formHeading: "Cherche un VIN de camion semi-remorque ou de remorque",
    formSub: "Saisis le VIN de 17 caractères — nous renverrons la marque, le modèle, l'année, le moteur, la classe GVWR et l'historique",
    formNote: "Gratuit · Sans inscription · Spécification instantanée",
    trustStats: [
      { icon: Truck, value: "Classe 8", label: "tracteurs et remorques" },
      { icon: Container, value: "17", label: "caractères décodés" },
      { icon: Zap, value: "Instantané", label: "sans inscription" },
      { icon: BadgeCheck, value: "Gratuit", label: "marque, année et moteur" },
    ],
    h2Same: "Un VIN de camion semi-remorque est la même norme qu'un VIN de voiture",
    sameIntroPre: "C'est ce que demandent le plus les acheteurs et propriétaires-exploitants. La réponse courte : le VIN d'un camion lourd suit la ",
    sameIntroBold: "même norme exacte de 17 caractères",
    sameIntroSuffix: " qu'une voiture particulière. Les règles de décodage ne changent pas — seule la spécification qu'il décrit (classe GVWR, cabine couchette, essieux moteurs) est de service lourd.",
    tractorTag: "Le tracteur",
    tractorTitle: "Freightliner · Peterbilt · Kenworth · Volvo · Mack",
    tractorBullets: [
      "VIN de 17 caractères sur le montant de portière, le rail de châssis et le titre.",
      "Décode la ligne de modèle, la famille de moteur et la classe GVWR.",
      "Le WMI commence par 1, 4 ou 5 sur les camions construits aux États-Unis.",
    ],
    trailerTag: "La remorque",
    trailerTitle: "Fourgon sec · Réfrigéré · Plateau · Lowboy · Citerne",
    trailerBullets: [
      "Son propre VIN de 17 caractères sur la paroi avant et le châssis.",
      "Décode le constructeur, le type de remorque et la configuration des essieux.",
      "Décodé de la même manière que le tracteur — même outil.",
    ],
    sameNoteBoldLead: "Test rapide :",
    sameNoteSuffix: " compte les caractères. S'il y en a exactement 17 sans lettres I, O ou Q, c'est un VIN moderne et l'outil ci-dessus le décodera. Un numéro plus court sur une vieille remorque utilitaire précède la norme VIN et doit être lu sur la plaque du fabricant.",
    h2How: "Comment chercher un camion semi-remorque par VIN — Étape par étape",
    howIntro: "Cinq étapes de « où est-il ? » à une identification complète et un historique. Fonctionne pour les tracteurs et remorques avec un VIN standard de 17 caractères.",
    howSteps: [
      { step: "01", title: "Trouve le VIN sur le camion", body: "Les camions lourds portent le VIN à plus d'endroits qu'une voiture car la cabine et le châssis sont souvent construits séparément. Vérifie l'étiquette du montant de portière côté conducteur, le rail de châssis près de l'essieu avant, le tableau de bord à travers le pare-brise et le titre ou la carte de cabine apportionnée. Chaque copie devrait correspondre." },
      { step: "02", title: "Lis les 17 caractères", body: "Les VIN modernes de camion et de remorque font exactement 17 caractères. Copie-les avec précision — les lettres I, O et Q ne sont jamais utilisées, donc tout ce qui ressemble à l'une d'elles est en fait un 1 ou un 0. Un seul caractère erroné décode un véhicule différent." },
      { step: "03", title: "Décode-le instantanément", body: "Saisis le VIN ci-dessus. Le décodeur lit le WMI (constructeur + pays), la section descriptive (modèle, cabine, moteur, classe GVWR), le caractère d'année modèle et le code d'usine — renvoyant la spécification complète en quelques secondes, gratuitement." },
      { step: "04", title: "Fais-le correspondre à l'annonce et au titre", body: "Confirme que la marque, le modèle, l'année et le moteur décodés correspondent à ce que le vendeur et les papiers prétendent. Puis fais correspondre le marquage du rail de châssis à l'étiquette de portière. Une incompatibilité entre le camion décodé et l'unité annoncée est un drapeau rouge immédiat." },
      { step: "05", title: "Étends à une vérification complète d'historique", body: "Quand tu achètes un tracteur à six chiffres, prends le même VIN dans un rapport d'historique complet — marques de titre, falsification d'odomètre ou compteur de moyeu, dossiers d'accidents, privilèges et données de vol — pour connaître le passé du camion, pas seulement sa spécification." },
    ],
    stepWord: "Étape",
    h2Builders: "Les grands constructeurs Classe 8 et leurs codes VIN",
    buildersIntroPre: "Les trois premiers caractères d'un VIN — le WMI — nomment le constructeur. Voici les codes pour chaque grand fabricant nord-américain de semi-remorque. Tous se décodent via le ",
    buildersIntroLink: "même outil gratuit",
    buildersIntroSuffix: " — tu n'as pas besoin d'un site séparé par marque.",
    builderColBuilder: "Constructeur", builderColWmi: "WMI (1–3)", builderColDetail: "Ce que le VIN décode",
    builderRows: [
      { builder: "Freightliner", wmi: "1FU · 3AK", detail: "Le semi-remorque le plus courant sur les routes américaines. Décode les lignes Cascadia, Coronado et M2 plus le moteur (Detroit DD13/DD15, Cummins X15) et la classe GVWR." },
      { builder: "Peterbilt", wmi: "1XP · 2NP", detail: "Décode les lignes 579, 389, 567 et autres modèles, le moteur et la configuration d'essieu. Un favori premium du propriétaire-exploitant." },
      { builder: "Kenworth", wmi: "1XK · 1NK", detail: "Lignes T680, W900 et T880 avec la spécification de transmission. Partage la maison mère (PACCAR) avec Peterbilt." },
      { builder: "Volvo Trucks", wmi: "4V4 · 4V5", detail: "Les séries VNL et VNR plus les détails du moteur Volvo D11/D13 et de la transmission I-Shift." },
      { builder: "Mack", wmi: "1M1 · 1M2", detail: "Lignes Anthem, Pinnacle et Granite avec le moteur série MP. Construit par le même groupe que Volvo Trucks." },
      { builder: "International (Navistar)", wmi: "1HT · 3HA", detail: "Lignes LT, LoneStar et HX avec la spécification du moteur et de la cabine. Un constructeur nord-américain de longue date de camions lourds." },
    ],
    h2Where: "Où trouver le VIN sur un camion semi-remorque et une remorque",
    whereIntro: "Les camions lourds portent le VIN à plus d'endroits qu'une voiture particulière, car la cabine et le châssis sont souvent construits séparément. Vérifie ces endroits — et assure-toi qu'ils correspondent tous.",
    whereColLoc: "Emplacement", whereColUnit: "Tracteur ou remorque", whereColNote: "Notes",
    unitTractor: "Tracteur", unitTrailer: "Remorque", unitBoth: "Les deux",
    whereRows: [
      { loc: "Montant de portière côté conducteur", unit: "Tracteur", note: "L'étiquette fédérale de certification — la copie la plus fiable sur le camion." },
      { loc: "Rail de châssis", unit: "Les deux", note: "Estampé dans l'acier côté conducteur près de l'essieu avant. Le « vrai » numéro de châssis — fais-y confiance si une étiquette semble altérée." },
      { loc: "Tableau de bord", unit: "Tracteur", note: "Visible à travers le pare-brise sur les tracteurs plus récents." },
      { loc: "Plaque de paroi avant", unit: "Remorque", note: "Rivée à la paroi avant, ou sur le châssis côté conducteur près du train d'atterrissage." },
      { loc: "Titre et carte de cabine", unit: "Les deux", note: "Sur le titre, l'immatriculation et la carte IRP / cabine apportionnée." },
    ],
    trailerBuildersPre: "Constructeurs de remorques courants que tu décoderas : ",
    trailerBuilders: "Great Dane · Wabash · Utility · Hyundai Translead · Stoughton · Vanguard · Wilson · MAC · Fontaine · Reitnouer",
    trailerBuildersSuffix: ".",
    midCtaHeading: "Décode un VIN de tracteur ou remorque en quelques secondes",
    midCtaSub: "Identification gratuite et instantanée directement du registre de construction du fabricant — marque, modèle, année, moteur et classe GVWR.",
    h2Match: "Fais toujours correspondre le VIN avant d'acheter un camion d'occasion",
    match1: "Un tracteur semi-remorque est un actif à six chiffres qui traverse les lignes étatiques et change rapidement de mains — les conditions exactes qui cachent les reconstructions de salvage, les falsifications d'odomètre ou de compteur de moyeu et les privilèges en suspens. Le VIN est ta meilleure défense.",
    match2: "Décode d'abord le numéro pour confirmer que le type de camion correspond à l'annonce. Un VIN qui décode à un modèle, moteur ou année différent de celui que tu as devant toi est un drapeau rouge pour arrêter l'affaire. Puis vérifie que le même numéro sur le titre, le montant de portière et le marquage du rail de châssis concordent.",
    match3Pre: "Quand la spécification est confirmée, prends le VIN dans une ",
    match3Link: "vérification complète de titre et d'historique",
    match3Suffix: " pour révéler les dossiers qu'un décodage seul ne peut pas — marques de titre, dommages d'accident, privilèges et marqueurs de vol.",
    redFlagsTitle: "Drapeaux rouges du VIN de camion",
    redFlags: [
      "Le modèle ou moteur décodé ne correspond pas à l'annonce",
      "Le VIN contient un I, O ou Q (jamais valide)",
      "Le VIN du titre diffère du numéro sur le camion",
      "L'étiquette du montant de portière et le marquage du rail de châssis ne correspondent pas",
      "La plaque de châssis semble re-rivée, meulée ou repeinte",
      "Moins de 17 caractères sur une unité post-1981",
    ],
    redFlagsCta: "Vérifie un VIN de camion maintenant :",
    h2Internal: "Plus de vérifications qui lisent un VIN de camion",
    internalIntro: "Les mêmes 17 caractères déverrouillent chacune de ces vérifications.",
    internalLinks: [
      { href: "/", label: "Décodeur VIN", desc: "Le décodage gratuit central — marque, modèle, année, moteur et usine pour n'importe quel VIN de tracteur ou remorque." },
      { href: "/salvage-title-check", label: "Vérification de titre salvage", desc: "Le tracteur ou la remorque a-t-il déjà été totalisé et reconstruit ? Attrape les titres marqués avant d'acheter." },
      { href: "/accident-history-check", label: "Vérification d'historique d'accidents", desc: "Dommages majeurs au châssis ou de collision rapportés contre le VIN." },
      { href: "/vehicle-lien-check", label: "Vérification de privilège véhicule", desc: "Une banque doit-elle encore de l'argent sur l'unité ? Confirme qu'il n'y a pas de privilège en suspens." },
      { href: "/odometer-check", label: "Vérification d'odomètre", desc: "Vérifie la traçabilité du kilométrage et détecte les falsifications ECM ou de compteur de moyeu sur le VIN." },
      { href: "/recall-check", label: "Vérification de rappels", desc: "Rappels de sécurité NHTSA ouverts sur le tracteur, le moteur ou la remorque." },
      { href: "/stolen-vehicle-check", label: "Vérification de véhicule volé", desc: "Confirme que le tracteur ou la remorque n'est pas signalé comme volé avant de payer." },
      { href: "/chassis-number-lookup", label: "Recherche de numéro de châssis", desc: "Pour les acheteurs internationaux — le même code de 17 caractères s'appelle numéro de châssis hors Amérique du Nord." },
    ],
    h2Faq: "Recherche VIN de camion semi-remorque — Foire aux questions",
    faqIntro: "Réponses directes à ce que les acheteurs de camion et de remorque demandent le plus.",
    bottomBadge: "Gratuit · Instantané · Classe 8",
    ctaBottomHeading: "Cherche n'importe quel camion semi-remorque ou remorque par VIN",
    ctaBottomSub: "Saisis un VIN de 17 caractères pour identifier la marque, le modèle, l'année et le moteur, puis déverrouille l'historique complet du titre, du kilométrage, du privilège et des accidents.",
    ctaBottomNote: "Pas de carte de crédit · Pas d'inscription · Spécification gratuite",
  },
} as const;

const FAQS_EN = [
  { question: "Is a semi truck VIN the same as a car VIN?", answer: "Yes. Every on-road vehicle built since 1981 — car, pickup, semi tractor, or trailer — uses the same 17-character VIN standard under ISO 3779. The decoding rules are identical: the first three characters identify the manufacturer and country, characters 4–8 describe the model and spec, the 10th encodes the model year, and the rest is the plant and serial." },
  { question: "How do I do a free Freightliner or Peterbilt VIN lookup?", answer: "Find the 17-character VIN on the driver-side door jamb, the frame rail, or the title, then paste it into the free VIN decoder. You will get the model line, model year, engine family, GVWR class, and assembly plant with no sign-up. Freightliner WMIs include 1FU and 3AK; Peterbilt uses 1XP and 2NP." },
  { question: "Where is the VIN on a semi truck?", answer: "Heavy trucks carry the VIN in several places: the driver-side door-jamb certification label, stamped into the frame rail on the driver's side near the front axle, on the dashboard visible through the windshield on newer tractors, and on the title and IRP/apportioned cab card. Always match the frame-rail stamping to the door label and the title." },
  { question: "Where is the VIN on a semi trailer?", answer: "A semi trailer's VIN is on a plate riveted to the front wall or the driver-side frame near the landing gear, and stamped into the frame rail. On any modern trailer it is a full 17-character VIN that decodes to the manufacturer (Great Dane, Wabash, Utility, Hyundai Translead, Stoughton), trailer type, model year, and axle configuration." },
  { question: "Why is my trailer VIN shorter than 17 characters?", answer: "Older or light-duty utility trailers were issued manufacturer-specific serial numbers before the 17-character VIN became standard. If your trailer number isn't 17 characters, it predates the modern VIN standard or is a non-VIN unit — decode it from the manufacturer's data plate instead of a VIN tool." },
  { question: "Can a semi truck VIN lookup tell me who owns the truck?", answer: "No. Owner and registration data is personal information protected by the federal Driver's Privacy Protection Act (DPPA) and is never returned by a VIN lookup. A VIN reveals the vehicle's specification and, where records exist, its title, mileage, accident, lien, and theft history — not the owner's identity." },
  { question: "What can I learn from a heavy truck VIN?", answer: "Decoding a semi tractor or trailer VIN reveals the manufacturer, model line, model year, engine family, body or trailer class, GVWR rating, and country and plant of assembly. Extended into a history report, the same VIN surfaces title brands, reported accidents, odometer readings, liens, and theft records." },
  { question: "Do I need to pay for a semi truck VIN check?", answer: "The decode — year, make, model, engine, and plant — is completely free and instant with no account. A full history report with title, accident, odometer, lien, and theft data is the paid step, and it is a fraction of the cost of one bad-truck repair bill." },
  { question: "What do the first three characters of a truck VIN mean?", answer: "The first three characters are the World Manufacturer Identifier (WMI), which name the builder and country. Common heavy-truck WMIs: 1FU/3AK Freightliner, 1XP/2NP Peterbilt, 1XK/1NK Kenworth, 4V4/4V5 Volvo, 1M1/1M2 Mack, and 1HT/3HA International (Navistar)." },
  { question: "Does a VIN lookup work for an 18-wheeler bought at auction?", answer: "Yes. Any Class 8 tractor or trailer with a standard 17-character VIN can be decoded and history-checked. Auction trucks change hands fast across state lines, which is exactly where salvage rebuilds, odometer or hub-meter tampering, and outstanding liens hide — so a VIN check before bidding is essential." },
];

const FAQS_ES = [
  { question: "¿Un VIN de camión semirremolque es lo mismo que un VIN de auto?", answer: "Sí. Cada vehículo de carretera construido desde 1981 — auto, pickup, tractor semi o remolque — usa el mismo estándar VIN de 17 caracteres bajo ISO 3779. Las reglas de decodificación son idénticas: los primeros tres caracteres identifican al fabricante y país, los caracteres 4-8 describen el modelo y especificación, el 10º codifica el año modelo, y el resto es la planta y serial." },
  { question: "¿Cómo hago una búsqueda VIN gratis de Freightliner o Peterbilt?", answer: "Encuentra el VIN de 17 caracteres en el marco de puerta del lado del conductor, el riel del chasis o el título, luego pégalo en el decodificador VIN gratis. Obtendrás la línea de modelo, año modelo, familia de motor, Clase GVWR y planta de ensamblaje sin registro. Los WMI de Freightliner incluyen 1FU y 3AK; Peterbilt usa 1XP y 2NP." },
  { question: "¿Dónde está el VIN en un camión semirremolque?", answer: "Los camiones pesados llevan el VIN en varios lugares: la etiqueta de certificación del marco de puerta del lado del conductor, estampado en el riel del chasis del lado del conductor cerca del eje delantero, en el tablero visible a través del parabrisas en tractores más nuevos, y en el título y tarjeta IRP/apportionada de cabina. Siempre coincide el estampado del riel del chasis con la etiqueta de puerta y el título." },
  { question: "¿Dónde está el VIN en un semirremolque?", answer: "El VIN de un semirremolque está en una placa remachada a la pared frontal o al chasis del lado del conductor cerca del tren de aterrizaje, y estampado en el riel del chasis. En cualquier remolque moderno es un VIN completo de 17 caracteres que decodifica al fabricante (Great Dane, Wabash, Utility, Hyundai Translead, Stoughton), tipo de remolque, año modelo y configuración de ejes." },
  { question: "¿Por qué mi VIN de remolque es más corto de 17 caracteres?", answer: "Los remolques utilitarios más antiguos o de servicio liviano recibieron números de serie específicos del fabricante antes que el VIN de 17 caracteres se volviera estándar. Si tu número de remolque no es de 17 caracteres, precede al estándar VIN moderno o es una unidad sin VIN — decodifícalo de la placa de datos del fabricante en lugar de una herramienta VIN." },
  { question: "¿Una búsqueda VIN de camión semirremolque puede decirme quién es el dueño del camión?", answer: "No. Los datos del dueño y registro son información personal protegida por la Ley federal de Protección de Privacidad del Conductor (DPPA) y nunca se devuelven en una búsqueda VIN. Un VIN revela la especificación del vehículo y, donde existan registros, su historial de título, kilometraje, accidente, gravamen y robo — no la identidad del dueño." },
  { question: "¿Qué puedo aprender de un VIN de camión pesado?", answer: "Decodificar el VIN de un tractor semi o remolque revela el fabricante, línea de modelo, año modelo, familia de motor, clase de carrocería o remolque, calificación GVWR y país y planta de ensamblaje. Extendido a un reporte de historial, el mismo VIN revela marcas de título, accidentes reportados, lecturas de odómetro, gravámenes y registros de robo." },
  { question: "¿Necesito pagar por una verificación VIN de camión semirremolque?", answer: "La decodificación — año, marca, modelo, motor y planta — es completamente gratis e instantánea sin cuenta. Un reporte completo de historial con datos de título, accidente, odómetro, gravamen y robo es el paso pagado, y es una fracción del costo de una factura de reparación de un mal camión." },
  { question: "¿Qué significan los primeros tres caracteres de un VIN de camión?", answer: "Los primeros tres caracteres son el Identificador Mundial del Fabricante (WMI), que nombra al constructor y país. WMI comunes de camión pesado: 1FU/3AK Freightliner, 1XP/2NP Peterbilt, 1XK/1NK Kenworth, 4V4/4V5 Volvo, 1M1/1M2 Mack, y 1HT/3HA International (Navistar)." },
  { question: "¿Una búsqueda VIN funciona para un 18 ruedas comprado en subasta?", answer: "Sí. Cualquier tractor o remolque Clase 8 con un VIN estándar de 17 caracteres puede decodificarse e historial-verificarse. Los camiones de subasta cambian de manos rápido a través de líneas estatales, que es exactamente donde se esconden reconstrucciones de salvamento, manipulación de odómetro o hub-meter, y gravámenes pendientes — así que una verificación VIN antes de ofertar es esencial." },
];

interface Props { locale: Locale; }

export default function SemiTruckVinLookupBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Truck className="w-4 h-4" /> {c.badge}
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
                  <div className="text-lg sm:text-2xl font-headline font-black text-white">{s.value}</div>
                  <div className="text-[11px] text-white/65 leading-tight mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Same}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            {c.sameIntroPre}
            <strong>{c.sameIntroBold}</strong>
            {c.sameIntroSuffix}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.tractorTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.tractorTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.tractorBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">{c.trailerTag}</div>
              <p className="text-lg font-headline font-extrabold text-primary mb-3">{c.trailerTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.trailerBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.sameNoteBoldLead}</strong>
                {c.sameNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2How}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.howIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.howSteps.map((s, i) => {
              const Icon = HOW_ICONS[i];
              return (
                <div key={s.step} className="flex gap-4 items-start rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">{c.stepWord} {s.step}</div>
                    <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{s.title}</h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Builders}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
            {c.buildersIntroPre}
            <Link href={link("/")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.buildersIntroLink}</Link>
            {c.buildersIntroSuffix}
          </p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant">
            <table className="w-full border-collapse min-w-[640px] text-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.builderColBuilder}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.builderColWmi}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.builderColDetail}</th>
                </tr>
              </thead>
              <tbody>
                {c.builderRows.map((row) => (
                  <tr key={row.builder} className="border-t border-outline-variant/60 align-top">
                    <td className="p-4 font-bold text-on-surface whitespace-nowrap">{row.builder}</td>
                    <td className="p-4">
                      <code className="font-mono text-xs bg-surface-container-low rounded px-2 py-1 text-primary whitespace-nowrap">{row.wmi}</code>
                    </td>
                    <td className="p-4 text-on-surface-variant leading-relaxed">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Where}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">{c.whereIntro}</p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant">
            <table className="w-full border-collapse min-w-[640px] text-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.whereColLoc}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.whereColUnit}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.whereColNote}</th>
                </tr>
              </thead>
              <tbody>
                {c.whereRows.map((row) => (
                  <tr key={row.loc} className="border-t border-outline-variant/60 align-top">
                    <td className="p-4 font-bold text-on-surface whitespace-nowrap">{row.loc}</td>
                    <td className="p-4 text-on-surface-variant whitespace-nowrap">{row.unit}</td>
                    <td className="p-4 text-on-surface-variant leading-relaxed">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-on-surface-variant">
            {c.trailerBuildersPre}{c.trailerBuilders}{c.trailerBuildersSuffix}
          </p>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Truck className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Match}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{c.match1}</p>
              <p>{c.match2}</p>
              <p>
                {c.match3Pre}
                <Link href={link("/salvage-title-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.match3Link}</Link>
                {c.match3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.redFlagsTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.redFlags.map((reason) => (
                  <li key={reason} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.redFlagsCta}</p>
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

        <RelatedChecks exclude="/semi-truck-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
