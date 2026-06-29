/**
 * Shared body for /fleet-check and /es/fleet-check.
 * Wave 18 batch 3 — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, ChevronRight,
  Lock, Zap, BadgeCheck, Sparkles, Car, Briefcase, Truck,
  Building2, Siren, ClipboardCheck, DollarSign, Wrench, Gauge,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [Search, Database, FileText] as const;
const TYPE_ICONS = [Siren, Building2, Briefcase, Car, Truck] as const;
const SPOT_ICONS = [Wrench, BadgeCheck, ClipboardCheck, Gauge] as const;
const WHY_ICONS = [DollarSign, Shield, BadgeCheck] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Fleet Check",
    badge: "Commercial-Use History   ·   NMVTIS-Backed",
    h1Lead: "Fleet & Ex-Police Car Check by VIN — ",
    h1Accent: "Was This Car Used Commercially?",
    intro: "CarCheckerVIN's free fleet check queries NMVTIS, all 50 state DMVs, and commercial and government registration databases to surface prior fleet ownership — police, taxi, livery, government, and corporate fleets — for any 17-character VIN. As an NMVTIS-approved data provider, CarCheckerVIN returns the title chain and commercial-use indicators that reveal whether a used car carries fleet wear before you pay a retail-grade price. Commercial fleet vehicles — police cars, government trucks, taxi cabs, and corporate fleets — eventually enter the used car market after years of heavy use. They can offer value buyers a lower purchase price, but they also carry specific wear patterns and history that affect long-term reliability. Enter a 17-character VIN to surface commercial ownership history, government registration records, and high-usage service periods — free, before you buy.",
    formHeading: "Run a Fleet Check by VIN",
    formSub: "Enter any 17-character VIN — we'll surface any police, government, rental, or corporate fleet ownership on record",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { icon: Database, value: "NMVTIS", label: "title-chain source" },
      { icon: Shield, value: "50 states", label: "DMV registration" },
      { icon: BadgeCheck, value: "Corporate", label: "and government owners" },
      { icon: Zap, value: "Free", label: "no sign-up" },
    ],
    h2How: "How a VIN Fleet Check Works",
    howIntro: "There is no universal \"fleet\" title brand. Prior commercial use is inferred from the title chain — the corporate or government owners NMVTIS captures alongside every private registration.",
    howSteps: [
      { tag: "Step 1", title: "Enter the VIN", body: "Type the 17-character VIN from the dashboard, door jamb, title, or registration. Title and registration history is tied to the VIN — not the seller's paperwork." },
      { tag: "Step 2", title: "We pull the title chain", body: "The lookup pulls ownership history from NMVTIS and every state DMV — surfacing any city, county, state, federal agency, rental firm, or corporate name in the chain." },
      { tag: "Step 3", title: "Read the commercial history", body: "See whether a fleet operator, government agency, or rental company ever owned the car — and how long it stayed in that service before reaching private hands." },
    ],
    h2Types: "Types of Fleet Vehicles",
    typesIntro: "Fleet vehicles span a wide range of commercial and government use cases, each with very different implications for condition, wear, and value. Understanding the type matters as much as the fleet label itself.",
    types: [
      { title: "Police interceptors", body: "Purpose-built pursuit vehicles with heavy-duty cooling, electrical systems, and suspension — often at very high mileage from 24/7 operation and continuous accessory load." },
      { title: "Government & municipal fleet", body: "City, county, state, and federal vehicles used for administrative and field operations. Maintenance is usually documented and may be available as public records." },
      { title: "Corporate fleet", body: "Company cars for sales reps, executives, and employees on fixed replacement cycles. Typically well-maintained and sold before major service items come due." },
      { title: "Taxi & rideshare", body: "Extremely high mileage and continuous city driving stress. Interior and drivetrain wear is typically heavy, even when the odometer alone doesn't tell the full story." },
      { title: "Utility & service fleet", body: "Vehicles operated by utilities, contractors, and service companies. Towing and hauling cycles accelerate drivetrain, brake, and suspension wear." },
    ],
    typesNoteBoldLead: "Not sure if a car was a rental?",
    typesNoteMid: " Rental fleets are titled to companies like Hertz or Enterprise — those names appear in the same title chain. Both rental and corporate fleet history show up in our ",
    typesNoteLink: "full VIN history report",
    typesNoteSuffix: ".",
    midCtaHeading: "Was This Specific Car in a Fleet?",
    midCtaSub: "Don't rely on what the seller says. Run the VIN against NMVTIS and 50 state DMVs to see every commercial owner on record, free, in seconds.",
    h2Why: "Why Fleet History Affects Value",
    whyIntro: "Fleet history creates a systematic discount in the used car market because buyers associate it with higher-than-average wear relative to mileage. The size of the discount varies sharply with fleet type.",
    whyParas: [
      "A corporate sedan from a well-maintained executive fleet may deserve only a small discount versus a comparable private-owner vehicle. A former police interceptor that saw 24/7 patrol duty at 120,000 miles carries a much bigger discount — and often for good reason.",
      "The components most affected by fleet use are the powertrain (engine and transmission), brakes, suspension, and interior. Police vehicles in particular subject these systems to extreme stress: prolonged idling, aggressive acceleration and braking, and continuous electrical load from lights, radios, and computing equipment.",
      "Even when the odometer shows moderate mileage, actual wear on these components may be equivalent to far higher consumer use — which is why pairing a fleet check with an odometer verification is essential.",
    ],
    exampleTitle: "Worked example — corporate replacement cycle",
    exampleRows: [
      { label: "Replacement window", value: "36 months" },
      { label: "Mileage at sale", value: "45,000 mi" },
      { label: "Maintenance", value: "fleet service plan" },
    ],
    exampleNote: "A 36-month, 45,000-mile cycle under a documented fleet plan often produces a mechanically excellent used car — sold before brake, tire, and timing-component service comes due. The fleet label alone doesn't equal hard miles.",
    h2Spot: "How to Spot an Ex-Police Car",
    spotIntro: "Former police vehicles have distinctive physical characteristics that persist even after decommissioning and reconditioning. Upfitting leaves behind evidence that's difficult to fully remove.",
    spotItems: [
      { title: "Extra wiring & plugged holes", body: "Equipment harnesses, radio mounts, and light-bar mounts leave holes and cut wires in the headliner, doors, and trunk — often the clearest physical tell." },
      { title: "Police-package VIN codes", body: "Ford Police Interceptor and Dodge Charger Pursuit models have VINs that encode their police-package designation, which our decoder surfaces directly." },
      { title: "Partition mount points", body: "Rear-seat partition brackets leave distinctive attachment points in the floor and ceiling even after removal — check between the front and rear seats." },
      { title: "Fleet paint or livery residue", body: "Former patrol cars may show ghost markings or paint overspray patterns around where decals and graphics were removed." },
    ],
    spotNoteBoldLead: "Cross-check the VIN.",
    spotNoteMid: " A police-package designation in the VIN, combined with a government owner in the title chain, is near-conclusive. Decode it on our ",
    spotNoteLink: "VIN decoder",
    spotNoteSuffix: " page.",
    h2Gov: "Government & Municipal Fleet Records",
    govParas: [
      "Government and municipal fleet vehicles are typically titled in the name of the governmental entity — City of Dallas, State of California, Federal Government, County of Cook. These ownership records appear in the title chain and are captured in NMVTIS.",
      "A VIN report showing government ownership in the title chain is the clearest indicator of fleet use. There's no judgment call to make — the owner name is right there.",
      "Government fleets often have excellent maintenance documentation because public agencies are required to maintain service records as public documents. For recently decommissioned vehicles, you may be able to request service history directly from the agency — a level of documentation most private sellers can't match.",
    ],
    h2Compare: "Fleet vs. Private Owner — At a Glance",
    compareIntro: "The comparison between fleet and private-owner vehicles isn't always unfavorable to the fleet. The deciding factors are the fleet type and the maintenance program, not the label.",
    privateTag: "Private owner", privateTitle: "Single household, varied care",
    privateBullets: ["Wear pattern reflects one driver and one use case.", "Maintenance quality varies wildly — good and bad both common.", "Undisclosed accidents or deferred repairs can hide easily."],
    corpTag: "Corporate fleet", corpTitle: "Service plan, fixed cycle",
    corpBullets: ["Sold before major maintenance items come due.", "Documented dealer service under a fleet plan.", "Modest mileage at sale, mechanically often excellent."],
    policeTag: "Police / heavy fleet", policeTitle: "24/7 stress, hard miles",
    policeBullets: ["High idle hours, aggressive accel/braking patterns.", "Continuous accessory load — lights, radios, computers.", "Inspect powertrain, brakes, and electrical carefully."],
    inspectCardTitle: "Inspect-before-you-buy checklist",
    inspectChecklist: [
      "Run the VIN against NMVTIS for the full title chain",
      "Look for corporate, government, or rental names in ownership",
      "Decode the VIN for police-package or commercial-package codes",
      "Inspect the headliner, doors, and trunk for plugged equipment holes",
      "Verify the odometer separately — fleet miles can be hard miles",
      "Get an independent pre-purchase inspection before paying",
    ],
    inspectCardCta: "Start with the VIN — check the title chain first:",
    h2WhyMatters: "Why a Fleet Check Matters Before You Buy",
    whyMattersIntro: "Commercial use shapes both what a used car is worth and how much hidden risk you take on. A fleet check turns assumption into evidence.",
    whyCards: [
      { title: "Protect your money", body: "Fleet history can mean a steep — or modest — value discount. Knowing the type before you negotiate keeps you from overpaying or walking away from a good buy." },
      { title: "Match the wear to the mileage", body: "Police, taxi, and utility fleets concentrate wear in specific components. Knowing the fleet type tells you exactly where to inspect harder." },
      { title: "Verify, don't trust", body: "Sellers may not disclose prior fleet use, and there's no universal fleet brand. The title chain — not the seller — is the reliable source." },
    ],
    h2Internal: "More VIN Checks That Pair With a Fleet Check",
    internalIntro: "Fleet history is one piece of the puzzle. These checks complete the picture before you buy.",
    internalLinks: [
      { href: "/odometer-check", label: "Odometer Check", desc: "Verify the mileage — fleet vehicles are common rollback targets, especially after high-usage service." },
      { href: "/accident-history-check", label: "Accident History Check", desc: "Police interceptors and taxis accumulate more collisions than average. See the reported damage record." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title chain, accidents, odometer, theft, and recalls in one complete report." },
      { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Heavy fleet use sometimes ends in a total loss. Verify the title brand alongside the fleet history." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17-character VIN for police-package, fleet-package, and commercial-spec codes." },
      { href: "/recall-check", label: "Recall Check", desc: "Confirm any open or completed manufacturer recalls — fleet vehicles often see deferred recall work." },
    ],
    h2Faq: "Fleet Check — Frequently Asked Questions",
    faqIntro: "The questions buyers ask most about fleet, ex-police, and commercial-use history.",
    bottomBadge: "Free · Instant · NMVTIS-Backed",
    ctaBottomHeading: "Check for Fleet & Commercial Use History Now",
    ctaBottomSub: "Enter a 17-character VIN to instantly check NMVTIS and 50 state DMVs for police, government, rental, taxi, and corporate fleet ownership history.",
    ctaBottomNote: "No credit card · No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "Verificación de flota",
    badge: "Historial de uso comercial   ·   Respaldado por NMVTIS",
    h1Lead: "Verificación de flota y ex-patrulla por VIN — ",
    h1Accent: "¿Este auto se usó comercialmente?",
    intro: "Los vehículos de flota comercial — patrullas, camiones gubernamentales, taxis y flotas corporativas — eventualmente entran al mercado de autos usados después de años de uso intenso. Pueden ofrecer a los compradores un precio de compra más bajo, pero también llevan patrones de desgaste e historial específicos que afectan la confiabilidad a largo plazo. Ingresa un VIN de 17 caracteres para mostrar el historial de propiedad comercial, registros gubernamentales y períodos de servicio de alto kilometraje — gratis, antes de comprar.",
    formHeading: "Haz una verificación de flota por VIN",
    formSub: "Ingresa cualquier VIN de 17 caracteres — mostraremos cualquier propiedad de flota policial, gubernamental, de renta o corporativa en archivo",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { icon: Database, value: "NMVTIS", label: "fuente de cadena de título" },
      { icon: Shield, value: "50 estados", label: "registro DMV" },
      { icon: BadgeCheck, value: "Corporativo", label: "y propietarios gubernamentales" },
      { icon: Zap, value: "Gratis", label: "sin registro" },
    ],
    h2How: "Cómo funciona una verificación VIN de flota",
    howIntro: "No existe una marca de título universal de \"flota\". El uso comercial previo se infiere de la cadena de título — los propietarios corporativos o gubernamentales que NMVTIS captura junto con cada registro privado.",
    howSteps: [
      { tag: "Paso 1", title: "Ingresa el VIN", body: "Escribe el VIN de 17 caracteres del tablero, marco de puerta, título o registro. El historial de título y registro está vinculado al VIN — no al papeleo del vendedor." },
      { tag: "Paso 2", title: "Extraemos la cadena de título", body: "La búsqueda extrae el historial de propiedad de NMVTIS y cada DMV estatal — mostrando cualquier ciudad, condado, estado, agencia federal, compañía de renta o nombre corporativo en la cadena." },
      { tag: "Paso 3", title: "Lee el historial comercial", body: "Mira si un operador de flota, agencia gubernamental o compañía de renta alguna vez fue dueño del auto — y cuánto tiempo permaneció en ese servicio antes de llegar a manos privadas." },
    ],
    h2Types: "Tipos de vehículos de flota",
    typesIntro: "Los vehículos de flota abarcan una amplia gama de casos de uso comercial y gubernamental, cada uno con implicaciones muy diferentes para la condición, desgaste y valor. Entender el tipo importa tanto como la etiqueta de flota en sí.",
    types: [
      { title: "Patrullas policiales", body: "Vehículos de persecución construidos a propósito con enfriamiento, sistemas eléctricos y suspensión reforzados — a menudo con alto kilometraje por operación 24/7 y carga continua de accesorios." },
      { title: "Flota gubernamental y municipal", body: "Vehículos de ciudad, condado, estado y federales usados para operaciones administrativas y de campo. El mantenimiento suele estar documentado y puede estar disponible como registros públicos." },
      { title: "Flota corporativa", body: "Autos de empresa para representantes de ventas, ejecutivos y empleados en ciclos de reemplazo fijos. Típicamente bien mantenidos y vendidos antes de que venzan los servicios mayores." },
      { title: "Taxi y viajes compartidos", body: "Kilometraje extremadamente alto y estrés continuo de manejo urbano. El desgaste del interior y tren motriz típicamente es fuerte, aun cuando el odómetro por sí solo no cuenta toda la historia." },
      { title: "Flota de servicios públicos", body: "Vehículos operados por empresas de servicios públicos, contratistas y empresas de servicio. Los ciclos de remolque y carga aceleran el desgaste del tren motriz, frenos y suspensión." },
    ],
    typesNoteBoldLead: "¿No estás seguro si el auto fue de renta?",
    typesNoteMid: " Las flotas de renta están tituladas a compañías como Hertz o Enterprise — esos nombres aparecen en la misma cadena de título. Tanto el historial de renta como el de flota corporativa aparecen en nuestro ",
    typesNoteLink: "reporte completo de historial VIN",
    typesNoteSuffix: ".",
    midCtaHeading: "¿Este auto específico estuvo en una flota?",
    midCtaSub: "No te bases en lo que dice el vendedor. Ejecuta el VIN contra NMVTIS y los 50 DMV estatales para ver cada propietario comercial en archivo, gratis, en segundos.",
    h2Why: "Por qué el historial de flota afecta el valor",
    whyIntro: "El historial de flota crea un descuento sistemático en el mercado de autos usados porque los compradores lo asocian con mayor desgaste promedio relativo al kilometraje. El tamaño del descuento varía mucho según el tipo de flota.",
    whyParas: [
      "Un sedán corporativo de una flota ejecutiva bien mantenida puede merecer solo un pequeño descuento frente a un vehículo comparable de propietario privado. Una ex-patrulla que vio servicio 24/7 con 120,000 millas carga un descuento mucho mayor — y a menudo por buena razón.",
      "Los componentes más afectados por el uso de flota son el tren motriz (motor y transmisión), frenos, suspensión e interior. Las patrullas en particular someten estos sistemas a estrés extremo: ralentí prolongado, aceleración y frenado agresivo, y carga eléctrica continua de luces, radios y equipo de cómputo.",
      "Incluso cuando el odómetro muestra alto kilometraje moderado, el desgaste real en estos componentes puede equivaler a uso mucho mayor del consumidor — por eso es esencial combinar una verificación de flota con una verificación de odómetro.",
    ],
    exampleTitle: "Ejemplo trabajado — ciclo de reemplazo corporativo",
    exampleRows: [
      { label: "Ventana de reemplazo", value: "36 meses" },
      { label: "Kilometraje en venta", value: "45,000 mi" },
      { label: "Mantenimiento", value: "plan de servicio de flota" },
    ],
    exampleNote: "Un ciclo de 36 meses y 45,000 millas bajo un plan de flota documentado a menudo produce un auto usado mecánicamente excelente — vendido antes de que venza el servicio de frenos, llantas y componentes de tiempo. La etiqueta de flota sola no equivale a millas duras.",
    h2Spot: "Cómo identificar una ex-patrulla",
    spotIntro: "Los antiguos vehículos policiales tienen características físicas distintivas que persisten incluso después del desmantelamiento y reacondicionamiento. La adaptación deja evidencia difícil de eliminar por completo.",
    spotItems: [
      { title: "Cableado extra y agujeros tapados", body: "Los arneses de equipo, monturas de radio y monturas de barra de luces dejan agujeros y cables cortados en el techo interior, puertas y cajuela — a menudo la señal física más clara." },
      { title: "Códigos VIN de paquete policial", body: "Los modelos Ford Police Interceptor y Dodge Charger Pursuit tienen VIN que codifican su designación de paquete policial, que nuestro decodificador muestra directamente." },
      { title: "Puntos de montaje de partición", body: "Los soportes de partición del asiento trasero dejan puntos de fijación distintivos en el piso y techo incluso después de la remoción — revisa entre los asientos delanteros y traseros." },
      { title: "Pintura de flota o residuo de calcomanías", body: "Las antiguas patrullas pueden mostrar marcas fantasma o patrones de sobrespray de pintura alrededor de donde se quitaron calcomanías y gráficos." },
    ],
    spotNoteBoldLead: "Verifica el VIN.",
    spotNoteMid: " Una designación de paquete policial en el VIN, combinada con un propietario gubernamental en la cadena de título, es casi concluyente. Decodifícalo en nuestra página de ",
    spotNoteLink: "decodificador VIN",
    spotNoteSuffix: ".",
    h2Gov: "Registros de flota gubernamental y municipal",
    govParas: [
      "Los vehículos de flota gubernamental y municipal típicamente están titulados a nombre de la entidad gubernamental — Ciudad de Dallas, Estado de California, Gobierno Federal, Condado de Cook. Estos registros de propiedad aparecen en la cadena de título y son capturados en NMVTIS.",
      "Un reporte VIN que muestra propiedad gubernamental en la cadena de título es el indicador más claro de uso de flota. No hay juicio que hacer — el nombre del propietario está ahí mismo.",
      "Las flotas gubernamentales a menudo tienen excelente documentación de mantenimiento porque las agencias públicas están obligadas a mantener registros de servicio como documentos públicos. Para vehículos recientemente desmantelados, puedes pedir el historial de servicio directamente a la agencia — un nivel de documentación que la mayoría de los vendedores privados no pueden igualar.",
    ],
    h2Compare: "Flota vs. propietario privado — De un vistazo",
    compareIntro: "La comparación entre vehículos de flota y de propietario privado no siempre es desfavorable para la flota. Los factores decisivos son el tipo de flota y el programa de mantenimiento, no la etiqueta.",
    privateTag: "Propietario privado", privateTitle: "Un hogar, cuidado variado",
    privateBullets: ["El patrón de desgaste refleja un conductor y un caso de uso.", "La calidad del mantenimiento varía mucho — bueno y malo son comunes.", "Accidentes no declarados o reparaciones aplazadas pueden ocultarse fácilmente."],
    corpTag: "Flota corporativa", corpTitle: "Plan de servicio, ciclo fijo",
    corpBullets: ["Vendido antes de que venzan los servicios mayores.", "Servicio documentado de concesionario bajo plan de flota.", "Kilometraje modesto al venderse, mecánicamente a menudo excelente."],
    policeTag: "Policial / flota pesada", policeTitle: "Estrés 24/7, millas duras",
    policeBullets: ["Muchas horas de ralentí, patrones agresivos de acel/frenado.", "Carga continua de accesorios — luces, radios, computadoras.", "Inspecciona tren motriz, frenos y eléctrico cuidadosamente."],
    inspectCardTitle: "Lista de inspección antes-de-comprar",
    inspectChecklist: [
      "Ejecuta el VIN contra NMVTIS para la cadena completa de título",
      "Busca nombres corporativos, gubernamentales o de renta en la propiedad",
      "Decodifica el VIN por códigos de paquete policial o comercial",
      "Inspecciona techo interior, puertas y cajuela por agujeros de equipo tapados",
      "Verifica el odómetro por separado — las millas de flota pueden ser millas duras",
      "Obtén una inspección independiente previa a la compra antes de pagar",
    ],
    inspectCardCta: "Comienza con el VIN — verifica primero la cadena de título:",
    h2WhyMatters: "Por qué una verificación de flota importa antes de comprar",
    whyMattersIntro: "El uso comercial moldea tanto cuánto vale un auto usado como cuánto riesgo oculto tomas. Una verificación de flota convierte la suposición en evidencia.",
    whyCards: [
      { title: "Protege tu dinero", body: "El historial de flota puede significar un descuento grande — o modesto — en el valor. Saber el tipo antes de negociar te evita pagar de más o alejarte de una buena compra." },
      { title: "Asocia el desgaste al kilometraje", body: "Las flotas de policía, taxi y servicios públicos concentran el desgaste en componentes específicos. Saber el tipo de flota te dice exactamente dónde inspeccionar más a fondo." },
      { title: "Verifica, no confíes", body: "Los vendedores pueden no divulgar el uso previo de flota, y no hay una marca universal de flota. La cadena de título — no el vendedor — es la fuente confiable." },
    ],
    h2Internal: "Más verificaciones VIN que se combinan con una verificación de flota",
    internalIntro: "El historial de flota es una pieza del rompecabezas. Estas verificaciones completan la imagen antes de comprar.",
    internalLinks: [
      { href: "/odometer-check", label: "Verificación odómetro", desc: "Verifica el kilometraje — los vehículos de flota son blancos comunes de rollback, especialmente después de servicio de alto kilometraje." },
      { href: "/accident-history-check", label: "Verificación historial accidentes", desc: "Las patrullas y taxis acumulan más colisiones que el promedio. Mira el registro de daños reportados." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Cadena de título, accidentes, odómetro, robos y recalls en un reporte completo." },
      { href: "/salvage-title-check", label: "Verificación título salvamento", desc: "El uso intenso de flota a veces termina en pérdida total. Verifica la marca de título junto con el historial de flota." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica el VIN de 17 caracteres por códigos de paquete policial, paquete de flota y especificaciones comerciales." },
      { href: "/recall-check", label: "Verificación de recalls", desc: "Confirma cualquier recall abierto o completado del fabricante — los vehículos de flota a menudo tienen trabajo de recall aplazado." },
    ],
    h2Faq: "Verificación de flota — Preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen los compradores sobre historial de flota, ex-patrulla y uso comercial.",
    bottomBadge: "Gratis · Instantáneo · Respaldado por NMVTIS",
    ctaBottomHeading: "Verifica historial de flota y uso comercial ahora",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres para verificar al instante NMVTIS y los 50 DMV estatales por historial de propiedad de flota policial, gubernamental, de renta, taxi y corporativa.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Gratis",
  },
  fr: {
    home: "Accueil", crumb: "Vérification de flotte",
    badge: "Historique d'usage commercial   ·   Soutenu par NMVTIS",
    h1Lead: "Vérification flotte et ex-police par VIN — ",
    h1Accent: "Cette voiture a-t-elle été utilisée commercialement ?",
    intro: "Les véhicules de flotte commerciale — voitures de police, camions gouvernementaux, taxis et flottes d'entreprises — entrent finalement sur le marché des voitures d'occasion après des années d'usage intensif. Ils peuvent offrir aux acheteurs un prix d'achat plus bas, mais ils portent aussi des modèles d'usure spécifiques et un historique qui affectent la fiabilité à long terme. Saisis un VIN de 17 caractères pour révéler l'historique de propriété commerciale, les registres d'enregistrement gouvernementaux et les périodes de service à forte utilisation — gratuit, avant d'acheter.",
    formHeading: "Effectue une vérification de flotte par VIN",
    formSub: "Saisis n'importe quel VIN de 17 caractères — nous révélerons toute propriété de flotte policière, gouvernementale, de location ou d'entreprise au dossier",
    formNote: "Gratuit · Sans inscription · Résultat instantané",
    trustStats: [
      { icon: Database, value: "NMVTIS", label: "source de la chaîne de titre" },
      { icon: Shield, value: "50 états", label: "enregistrement DMV" },
      { icon: BadgeCheck, value: "Entreprise", label: "et propriétaires gouvernementaux" },
      { icon: Zap, value: "Gratuit", label: "sans inscription" },
    ],
    h2How: "Comment fonctionne une vérification VIN de flotte",
    howIntro: "Il n'existe pas de marque de titre universelle « flotte ». L'usage commercial antérieur est déduit de la chaîne de titre — les propriétaires d'entreprise ou gouvernementaux que NMVTIS capture aux côtés de chaque enregistrement privé.",
    howSteps: [
      { tag: "Étape 1", title: "Saisis le VIN", body: "Tape le VIN de 17 caractères du tableau de bord, du montant de la porte, du titre ou de l'enregistrement. L'historique de titre et d'enregistrement est lié au VIN — pas aux documents du vendeur." },
      { tag: "Étape 2", title: "Nous extrayons la chaîne de titre", body: "La recherche extrait l'historique de propriété de NMVTIS et de chaque DMV étatique — révélant toute ville, comté, état, agence fédérale, société de location ou nom d'entreprise dans la chaîne." },
      { tag: "Étape 3", title: "Lis l'historique commercial", body: "Vois si un opérateur de flotte, une agence gouvernementale ou une société de location a déjà possédé la voiture — et combien de temps elle est restée à ce service avant d'atteindre des mains privées." },
    ],
    h2Types: "Types de véhicules de flotte",
    typesIntro: "Les véhicules de flotte couvrent un large éventail de cas d'usage commerciaux et gouvernementaux, chacun avec des implications très différentes pour l'état, l'usure et la valeur. Comprendre le type importe autant que l'étiquette de flotte elle-même.",
    types: [
      { title: "Intercepteurs de police", body: "Véhicules de poursuite construits sur mesure avec un refroidissement, des systèmes électriques et une suspension renforcés — souvent à très haut kilométrage en raison de l'opération 24/7 et de la charge continue d'accessoires." },
      { title: "Flotte gouvernementale et municipale", body: "Véhicules de ville, comté, état et fédéraux utilisés pour les opérations administratives et de terrain. L'entretien est généralement documenté et peut être disponible comme dossiers publics." },
      { title: "Flotte d'entreprise", body: "Voitures de société pour représentants commerciaux, cadres et employés sur des cycles de remplacement fixes. Typiquement bien entretenues et vendues avant que des entretiens majeurs ne soient dus." },
      { title: "Taxi et covoiturage", body: "Kilométrage extrêmement élevé et stress continu de conduite urbaine. L'usure de l'intérieur et de la transmission est typiquement lourde, même quand l'odomètre seul ne raconte pas toute l'histoire." },
      { title: "Flotte de services publics", body: "Véhicules exploités par des services publics, entrepreneurs et entreprises de service. Les cycles de remorquage et de transport accélèrent l'usure de la transmission, des freins et de la suspension." },
    ],
    typesNoteBoldLead: "Pas sûr si une voiture était une location ?",
    typesNoteMid: " Les flottes de location sont titrées à des sociétés comme Hertz ou Enterprise — ces noms apparaissent dans la même chaîne de titre. L'historique de location et de flotte d'entreprise apparaissent tous deux dans notre ",
    typesNoteLink: "rapport complet d'historique VIN",
    typesNoteSuffix: ".",
    midCtaHeading: "Cette voiture spécifique était-elle dans une flotte ?",
    midCtaSub: "Ne te fie pas à ce que dit le vendeur. Exécute le VIN contre NMVTIS et les 50 DMV étatiques pour voir chaque propriétaire commercial au dossier, gratuit, en quelques secondes.",
    h2Why: "Pourquoi l'historique de flotte affecte la valeur",
    whyIntro: "L'historique de flotte crée une décote systématique sur le marché de l'occasion parce que les acheteurs l'associent à une usure supérieure à la moyenne par rapport au kilométrage. La taille de la décote varie fortement selon le type de flotte.",
    whyParas: [
      "Une berline d'entreprise d'une flotte de direction bien entretenue peut ne mériter qu'une petite décote par rapport à un véhicule comparable de propriétaire privé. Un ancien intercepteur de police qui a vu un service 24/7 à 120 000 miles porte une décote bien plus importante — et souvent pour une bonne raison.",
      "Les composants les plus affectés par l'usage de flotte sont la transmission (moteur et boîte), les freins, la suspension et l'intérieur. Les véhicules de police en particulier soumettent ces systèmes à un stress extrême : ralenti prolongé, accélération et freinage agressifs, et charge électrique continue des lumières, radios et équipements informatiques.",
      "Même quand l'odomètre montre un kilométrage modéré, l'usure réelle sur ces composants peut être équivalente à un usage consommateur bien plus élevé — c'est pourquoi associer une vérification de flotte à une vérification d'odomètre est essentiel.",
    ],
    exampleTitle: "Exemple — cycle de remplacement d'entreprise",
    exampleRows: [
      { label: "Fenêtre de remplacement", value: "36 mois" },
      { label: "Kilométrage à la vente", value: "45 000 mi" },
      { label: "Entretien", value: "plan de service flotte" },
    ],
    exampleNote: "Un cycle de 36 mois et 45 000 miles sous un plan de flotte documenté produit souvent une voiture d'occasion mécaniquement excellente — vendue avant que l'entretien des freins, pneus et composants de distribution ne soit dû. L'étiquette de flotte seule n'équivaut pas à des miles durs.",
    h2Spot: "Comment repérer une ex-voiture de police",
    spotIntro: "Les anciens véhicules de police ont des caractéristiques physiques distinctives qui persistent même après le démantèlement et la remise en état. L'équipement laisse des preuves difficiles à éliminer complètement.",
    spotItems: [
      { title: "Câblage supplémentaire et trous bouchés", body: "Les harnais d'équipement, supports de radio et supports de barre lumineuse laissent des trous et des fils coupés dans le ciel de toit, les portes et le coffre — souvent le signe physique le plus clair." },
      { title: "Codes VIN paquet police", body: "Les modèles Ford Police Interceptor et Dodge Charger Pursuit ont des VIN qui encodent leur désignation paquet police, que notre décodeur révèle directement." },
      { title: "Points de fixation de cloison", body: "Les supports de cloison de siège arrière laissent des points d'attache distinctifs dans le plancher et le plafond même après le retrait — vérifie entre les sièges avant et arrière." },
      { title: "Peinture de flotte ou résidus de marquage", body: "Les anciennes voitures de patrouille peuvent montrer des marques fantômes ou des motifs de surpulvérisation de peinture autour de l'endroit où les décalcomanies et graphismes ont été retirés." },
    ],
    spotNoteBoldLead: "Recoupe le VIN.",
    spotNoteMid: " Une désignation paquet police dans le VIN, combinée à un propriétaire gouvernemental dans la chaîne de titre, est quasi concluant. Décode-le sur notre page ",
    spotNoteLink: "décodeur VIN",
    spotNoteSuffix: ".",
    h2Gov: "Registres de flotte gouvernementale et municipale",
    govParas: [
      "Les véhicules de flotte gouvernementale et municipale sont typiquement titrés au nom de l'entité gouvernementale — Ville de Dallas, État de Californie, Gouvernement fédéral, Comté de Cook. Ces registres de propriété apparaissent dans la chaîne de titre et sont capturés dans NMVTIS.",
      "Un rapport VIN montrant une propriété gouvernementale dans la chaîne de titre est l'indicateur le plus clair d'usage de flotte. Il n'y a pas de jugement à faire — le nom du propriétaire est juste là.",
      "Les flottes gouvernementales ont souvent une excellente documentation d'entretien parce que les agences publiques sont tenues de maintenir des registres de service comme documents publics. Pour les véhicules récemment démantelés, tu peux demander l'historique de service directement à l'agence — un niveau de documentation que la plupart des vendeurs privés ne peuvent égaler.",
    ],
    h2Compare: "Flotte vs. propriétaire privé — En un coup d'œil",
    compareIntro: "La comparaison entre véhicules de flotte et de propriétaire privé n'est pas toujours défavorable à la flotte. Les facteurs décisifs sont le type de flotte et le programme d'entretien, pas l'étiquette.",
    privateTag: "Propriétaire privé", privateTitle: "Un foyer, soins variés",
    privateBullets: ["Le modèle d'usure reflète un conducteur et un cas d'usage.", "La qualité d'entretien varie énormément — bons et mauvais tous deux courants.", "Les accidents non déclarés ou réparations différées peuvent se cacher facilement."],
    corpTag: "Flotte d'entreprise", corpTitle: "Plan de service, cycle fixe",
    corpBullets: ["Vendue avant que les éléments d'entretien majeurs ne soient dus.", "Service documenté chez le concessionnaire sous un plan flotte.", "Kilométrage modeste à la vente, mécaniquement souvent excellent."],
    policeTag: "Police / flotte lourde", policeTitle: "Stress 24/7, miles durs",
    policeBullets: ["Nombreuses heures de ralenti, motifs agressifs d'accélération/freinage.", "Charge continue d'accessoires — lumières, radios, ordinateurs.", "Inspecte soigneusement la transmission, les freins et l'électrique."],
    inspectCardTitle: "Liste d'inspection avant achat",
    inspectChecklist: [
      "Exécute le VIN contre NMVTIS pour la chaîne de titre complète",
      "Cherche les noms d'entreprise, gouvernementaux ou de location dans la propriété",
      "Décode le VIN pour les codes paquet police ou commercial",
      "Inspecte le ciel de toit, les portes et le coffre pour les trous d'équipement bouchés",
      "Vérifie l'odomètre séparément — les miles de flotte peuvent être des miles durs",
      "Obtiens une inspection indépendante avant achat avant de payer",
    ],
    inspectCardCta: "Commence avec le VIN — vérifie d'abord la chaîne de titre :",
    h2WhyMatters: "Pourquoi une vérification de flotte importe avant d'acheter",
    whyMattersIntro: "L'usage commercial façonne à la fois la valeur d'une voiture d'occasion et le risque caché que tu prends. Une vérification de flotte transforme la supposition en preuve.",
    whyCards: [
      { title: "Protège ton argent", body: "L'historique de flotte peut signifier une décote importante — ou modeste — sur la valeur. Connaître le type avant de négocier t'évite de payer trop cher ou de t'éloigner d'un bon achat." },
      { title: "Associe l'usure au kilométrage", body: "Les flottes de police, taxi et services publics concentrent l'usure sur des composants spécifiques. Connaître le type de flotte te dit exactement où inspecter plus à fond." },
      { title: "Vérifie, ne fais pas confiance", body: "Les vendeurs peuvent ne pas divulguer l'usage antérieur de flotte, et il n'y a pas de marque universelle de flotte. La chaîne de titre — pas le vendeur — est la source fiable." },
    ],
    h2Internal: "Plus de vérifications VIN qui s'associent à une vérification de flotte",
    internalIntro: "L'historique de flotte est une pièce du puzzle. Ces vérifications complètent l'image avant d'acheter.",
    internalLinks: [
      { href: "/odometer-check", label: "Vérification odomètre", desc: "Vérifie le kilométrage — les véhicules de flotte sont des cibles communes de remise à zéro, surtout après un service à forte utilisation." },
      { href: "/accident-history-check", label: "Vérification historique accidents", desc: "Les intercepteurs de police et taxis accumulent plus de collisions que la moyenne. Vois le registre des dommages signalés." },
      { href: "/vin-check", label: "Vérification complète de l'historique VIN", desc: "Chaîne de titre, accidents, odomètre, vol et rappels dans un rapport complet." },
      { href: "/salvage-title-check", label: "Vérification titre salvage", desc: "L'usage intensif de flotte se termine parfois en perte totale. Vérifie la marque de titre aux côtés de l'historique de flotte." },
      { href: "/vin-decoder", label: "Décodeur VIN", desc: "Décode le VIN de 17 caractères pour les codes paquet police, paquet flotte et spécification commerciale." },
      { href: "/recall-check", label: "Vérification de rappels", desc: "Confirme tout rappel de sécurité ouvert ou complété du fabricant — les véhicules de flotte ont souvent du travail de rappel différé." },
    ],
    h2Faq: "Vérification de flotte — Questions fréquentes",
    faqIntro: "Les questions que les acheteurs posent le plus sur l'historique de flotte, ex-police et usage commercial.",
    bottomBadge: "Gratuit · Instantané · Soutenu par NMVTIS",
    ctaBottomHeading: "Vérifie l'historique de flotte et d'usage commercial maintenant",
    ctaBottomSub: "Saisis un VIN de 17 caractères pour vérifier instantanément NMVTIS et les 50 DMV étatiques pour l'historique de propriété de flotte policière, gouvernementale, de location, taxi et d'entreprise.",
    ctaBottomNote: "Sans carte de crédit · Sans inscription · Gratuit",
  },
} as const;

const FAQS_EN = [
  { question: "How can I tell if a used car was a former fleet vehicle?", answer: "The clearest signal is the title history. Fleet and government vehicles are usually titled to a company or agency — like a city, county, rental firm, or corporation — and that name appears in the ownership chain of a VIN report. Other clues include a single corporate owner before the first private owner, a short ownership period with high mileage, and dealer-auction records right after the first registration." },
  { question: "Will a VIN check always flag a car as a fleet vehicle?", answer: "Not always. There is no universal 'fleet' title brand, so prior fleet use is usually inferred from registration and title records rather than explicitly labeled. A VIN report can show a corporate or government owner in the title chain, but private leasing companies and some corporate fleets may not be obvious. Pair the VIN check with a physical inspection and ask the seller directly about prior commercial use." },
  { question: "Are former fleet cars well maintained?", answer: "It depends on the fleet type. Government and corporate fleets often follow strict scheduled maintenance and keep documented service records, sometimes available as public records for decommissioned government vehicles. Taxis and police interceptors, by contrast, endure heavy 24/7 use that wears the powertrain, brakes, and interior faster than mileage alone suggests. The quality of the maintenance program matters more than the fleet label itself." },
  { question: "Do former fleet vehicles have high mileage?", answer: "Often, but not always. Taxis, police cars, and utility vehicles typically accumulate very high mileage from continuous operation. Corporate fleet cars, however, are frequently sold on fixed replacement cycles — for example 36 months and 45,000 miles — so their odometers can be moderate. Because heavy fleet use can wear components beyond what mileage shows, always pair a fleet check with an odometer verification." },
  { question: "How do I spot a former police car?", answer: "Look for physical evidence that upfitting leaves behind: plugged holes and cut wiring in the headliner, doors, and trunk from radios and light bars; partition bracket mount points in the floor and ceiling; and ghost markings or paint overspray where decals were removed. Police-package models like the Ford Police Interceptor and Dodge Charger Pursuit also encode their package designation in the VIN." },
  { question: "What is the difference between a fleet car and a rental car?", answer: "Both are commercial-use vehicles, but they differ in use pattern and ownership. Rental cars are driven by many short-term drivers and titled to rental companies like Hertz or Enterprise. Fleet vehicles — police, government, corporate, taxi, and utility — usually serve a single operator's mission, with wear patterns specific to that use. Both appear in a VIN's title history under a company or agency name rather than an individual." },
  { question: "Should I avoid buying a former fleet vehicle?", answer: "Not automatically. A well-maintained corporate fleet car on a regular replacement cycle can be a strong value and is often mechanically excellent. A neglected single-owner car can be in worse shape than a documented fleet vehicle. The deciding factors are the fleet type and maintenance quality. Verify with a full VIN history report, an accident history check, and an independent pre-purchase inspection before deciding." },
];

const FAQS_ES = [
  { question: "¿Cómo puedo saber si un auto usado fue un vehículo de flota?", answer: "La señal más clara es el historial de título. Los vehículos de flota y gubernamentales suelen estar titulados a una compañía o agencia — como una ciudad, condado, compañía de renta o corporación — y ese nombre aparece en la cadena de propiedad de un reporte VIN. Otras pistas incluyen un único propietario corporativo antes del primer propietario privado, un período corto de propiedad con alto kilometraje y registros de subasta de concesionario justo después del primer registro." },
  { question: "¿Una verificación VIN siempre marcará un auto como vehículo de flota?", answer: "No siempre. No existe una marca de título universal de 'flota', así que el uso previo de flota se infiere usualmente de los registros de registración y título en lugar de etiquetarse explícitamente. Un reporte VIN puede mostrar un propietario corporativo o gubernamental en la cadena de título, pero compañías privadas de arrendamiento y algunas flotas corporativas pueden no ser obvias. Combina la verificación VIN con una inspección física y pregúntale al vendedor directamente sobre el uso comercial previo." },
  { question: "¿Los autos de flota están bien mantenidos?", answer: "Depende del tipo de flota. Las flotas gubernamentales y corporativas a menudo siguen mantenimiento programado estricto y mantienen registros de servicio documentados, a veces disponibles como registros públicos para vehículos gubernamentales desmantelados. Los taxis y patrullas, por contraste, soportan uso intenso 24/7 que desgasta el tren motriz, frenos e interior más rápido de lo que sugiere el kilometraje solo. La calidad del programa de mantenimiento importa más que la etiqueta de flota en sí." },
  { question: "¿Los vehículos de flota tienen alto kilometraje?", answer: "A menudo, pero no siempre. Los taxis, patrullas y vehículos de servicios públicos típicamente acumulan kilometraje muy alto por operación continua. Los autos de flota corporativa, sin embargo, frecuentemente se venden en ciclos de reemplazo fijos — por ejemplo 36 meses y 45,000 millas — así que sus odómetros pueden ser moderados. Como el uso intenso de flota puede desgastar componentes más allá de lo que muestra el kilometraje, siempre combina una verificación de flota con una verificación de odómetro." },
  { question: "¿Cómo identifico una ex-patrulla?", answer: "Busca evidencia física que deja la adaptación: agujeros tapados y cables cortados en el techo interior, puertas y cajuela de radios y barras de luces; puntos de montaje de soportes de partición en el piso y techo; y marcas fantasma o sobrespray de pintura donde se quitaron calcomanías. Los modelos con paquete policial como el Ford Police Interceptor y Dodge Charger Pursuit también codifican su designación de paquete en el VIN." },
  { question: "¿Cuál es la diferencia entre un auto de flota y un auto de renta?", answer: "Ambos son vehículos de uso comercial, pero difieren en patrón de uso y propiedad. Los autos de renta son manejados por muchos conductores de corto plazo y titulados a compañías de renta como Hertz o Enterprise. Los vehículos de flota — policial, gubernamental, corporativa, taxi y servicios públicos — usualmente sirven la misión de un solo operador, con patrones de desgaste específicos para ese uso. Ambos aparecen en el historial de título de un VIN bajo un nombre de compañía o agencia en lugar de un individuo." },
  { question: "¿Debo evitar comprar un vehículo de flota?", answer: "No automáticamente. Un auto de flota corporativa bien mantenido en un ciclo de reemplazo regular puede ser un buen valor y a menudo es mecánicamente excelente. Un auto de un solo propietario descuidado puede estar en peor condición que un vehículo de flota documentado. Los factores decisivos son el tipo de flota y la calidad del mantenimiento. Verifica con un reporte completo de historial VIN, una verificación de historial de accidentes y una inspección independiente previa a la compra antes de decidir." },
];

interface Props { locale: Locale; }

export default function FleetCheckBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Siren className="w-4 h-4" /> {c.badge}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Types}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.typesIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.types.map((t, i) => {
              const Icon = TYPE_ICONS[i];
              return (
                <div key={t.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{t.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{t.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.typesNoteBoldLead}</strong>
                {c.typesNoteMid}
                <Link href={link("/vin-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.typesNoteLink}</Link>
                {c.typesNoteSuffix}
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
              <VinSearchForm size="lg"  locale={locale}/>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Why}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.whyIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              {c.whyParas.map((p, i) => <p key={i}>{p}</p>)}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Spot}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.spotIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.spotItems.map((s, i) => {
              const Icon = SPOT_ICONS[i];
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
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Siren className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.spotNoteBoldLead}</strong>
                {c.spotNoteMid}
                <Link href={link("/vin-decoder")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.spotNoteLink}</Link>
                {c.spotNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Gov}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              {c.govParas.map((p, i) => <p key={i}>{p}</p>)}
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
                <VinSearchForm size="sm"  locale={locale}/>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Compare}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.compareIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.privateTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.privateTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.privateBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">{c.corpTag}</div>
              <p className="text-lg font-headline font-extrabold text-primary mb-3">{c.corpTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.corpBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.policeTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.policeTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.policeBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2WhyMatters}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.whyMattersIntro}</p>
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
            <VinSearchForm size="lg"  locale={locale}/>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            {c.ctaBottomNote}
          </div>
        </section>

        <RelatedChecks exclude="/fleet-check" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
