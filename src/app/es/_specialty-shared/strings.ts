/**
 * Spanish landing pages for tool/check pages — Waves 5 + 12.
 *
 * Wave 5 (8 entries): specialty-tool landings (semi-truck, golf-cart,
 * paint-code-finder, window-sticker, motorcycle, RV, classic-car, JDM).
 *
 * Wave 12 (15 entries): high-intent "check" pages (recall, lemon,
 * odometer, salvage, flood, accident, stolen, hail, airbag, total-loss,
 * auction, market-value, lien, vin-decoder, best-vin-decoder).
 *
 * Both waves follow the same architecture: the Spanish page mirrors
 * its English counterpart in intent and structure but uses a native-
 * language slug to capture Spanish SERPs directly. The interactive
 * widgets (form, decoder, report) live on the English page; the
 * Spanish landing sends qualified buyers there with a clear
 * "Ejecuta la búsqueda" CTA after they've read the value prop in
 * their own language.
 */

import type { LucideIcon } from "lucide-react";
import {
  Truck,
  Palette,
  FileText,
  Bike,
  Caravan,
  Car,
  Globe2,
  CircleDashed,
  AlertTriangle,
  Scale,
  Gauge,
  Recycle,
  Droplets,
  CarFront,
  ShieldAlert,
  CloudHail,
  ShieldOff,
  CircleSlash,
  Gavel,
  DollarSign,
  Landmark,
  Search,
  Award,
} from "lucide-react";

export interface SpecialtyHook {
  /** Slug after /es/ — must match ENGLISH_TO_LOCALE entry in i18n/slugs.ts. */
  esSlug: string;
  /** English source path; used for hreflang back-pointer. */
  englishPath: string;
  /** Visual icon for the hero badge. */
  icon: LucideIcon;
  /** Hero badge eyebrow ("Camión pesado · VIN 17 caracteres"). */
  badge: string;
  /** Page H1. */
  h1: string;
  /** SERP title (≤55 chars, layout appends "| CarCheckerVIN"). */
  metaTitle: string;
  /** SERP description (~155 chars). */
  metaDescription: string;
  /** Spanish keyword set. */
  keywords: string[];
  /** Hero intro paragraph below H1. */
  intro: string;
  /** Bullet list — "what you get / decode reveals". */
  whatYouGet: string[];
  /** Bullet list — "why this matters / who needs it". */
  whyItMatters: string[];
  /** Closing trust paragraph (Princeton-GEO style: authoritative + data-rich). */
  trustNote: string;
  /** Schema.org JSON-LD WebApplication name. */
  schemaName: string;
}

const SITE = "https://www.carcheckervin.com";
export { SITE };

export const SPECIALTY_HOOKS_ES: Record<string, SpecialtyHook> = {
  "semi-truck": {
    esSlug: "/vin-camion-pesado",
    englishPath: "/semi-truck-vin-lookup",
    icon: Truck,
    badge: "Camión pesado · VIN 17 caracteres",
    h1: "Búsqueda VIN para camión pesado — Decodificador gratis",
    metaTitle: "VIN camión pesado gratis — Decodificador e historial",
    metaDescription:
      "Decodifica cualquier VIN de camión pesado (Class 8) gratis. Configuración del chasís, motor, GVWR, retiros NHTSA e historial de flota — al instante, sin registro.",
    keywords: [
      "VIN camión pesado",
      "VIN Class 8",
      "decodificador VIN camión",
      "VIN Freightliner Cascadia",
      "VIN tractor Kenworth Peterbilt",
      "historial flota camión",
    ],
    intro:
      "Los VIN de camiones comerciales Clase 8 siguen el mismo formato de 17 caracteres que los autos de pasajeros, pero codifican datos críticos para tractocamiones: peso bruto vehicular (GVWR), modelo del motor (Detroit DD13/DD15, Cummins ISX), configuración del chasís y tipo de cabina. Una revisión por VIN revela el origen, historial de flota, accidentes, retiros NHTSA y kilometraje real antes de comprar.",
    whatYouGet: [
      "Marca, modelo y año exactos del tractor (Cascadia, T680, 579, etc.)",
      "Configuración del motor (Detroit, Cummins, PACCAR) y caja de cambios",
      "GVWR y clasificación de peso comercial",
      "Historial de propiedad y registración de flota",
      "Accidentes reportados y registros de pérdida total",
      "Retiros activos de la NHTSA por frenos, dirección y cableado",
      "Lecturas del odómetro de inspecciones DOT y mantenimiento",
    ],
    whyItMatters: [
      "Los camiones comerciales acumulan desgaste 5–10× más rápido que los autos personales — el rastro del odómetro es esencial",
      "Las flotas grandes los venden tras 500K–800K millas; verifica historial de fleet/leasing previo",
      "Los retiros DOT por frenos pueden dejar fuera de servicio el tractor al inspeccionar",
      "El daño por accidente en el bastidor (chasís) compromete la seguridad estructural — el reporte lo señala",
    ],
    trustNote:
      "Los datos de camiones comerciales se cruzan contra NMVTIS, NHTSA y los registros DOT en el momento de cada búsqueda. Freightliner (Daimler), Kenworth y Peterbilt (PACCAR), Volvo y Mack publican retiros por VIN — los revisamos todos.",
    schemaName: "Decodificador VIN de camión pesado",
  },

  "golf-cart": {
    esSlug: "/vin-carrito-de-golf",
    englishPath: "/golf-cart-vin-lookup",
    icon: CircleDashed,
    badge: "Carrito de golf · Número de serie",
    h1: "Búsqueda VIN para carrito de golf — Decodificador de número de serie",
    metaTitle: "VIN carrito de golf gratis — Decodificador de serie",
    metaDescription:
      "Decodifica el número de serie de cualquier carrito de golf (Club Car, EZGO, Yamaha) gratis. Año, modelo, motor o batería, marcos eléctrico vs gasolina — al instante.",
    keywords: [
      "VIN carrito de golf",
      "número serie Club Car",
      "número serie EZGO",
      "decodificador Yamaha golf cart",
      "VIN carrito eléctrico",
      "año modelo carrito golf",
    ],
    intro:
      "A diferencia de los autos, los carritos de golf no usan VIN de 17 caracteres — usan un número de serie del fabricante que codifica año, modelo, planta y tipo de motor. Club Car, EZGO (E-Z-GO) y Yamaha tienen sistemas distintos. Decodificarlo correctamente es clave para identificar piezas, baterías y comprobar autenticidad antes de comprar un carrito usado.",
    whatYouGet: [
      "Año del modelo (cuándo fue fabricado)",
      "Modelo exacto (DS, Precedent, Onward para Club Car; RXV, TXT, Express para EZGO)",
      "Tipo de tren motriz: eléctrico (36V/48V/72V) o gasolina",
      "Planta de fabricación y código de configuración",
      "Compatibilidad con piezas de repuesto y kits de lift",
      "Referencia para reclamos de garantía del fabricante",
    ],
    whyItMatters: [
      "Identificar el modelo correcto evita comprar baterías o controladores equivocados",
      "Los carritos eléctricos antiguos pueden requerir reemplazo de banco de baterías ($1,500–$3,000)",
      "Los carritos modificados (lift, motores upgrade) pueden haber alterado la placa de serie — verifica autenticidad",
      "Esencial al comprar usado en marketplaces como Facebook o Craigslist sin garantía",
    ],
    trustNote:
      "Decodificamos números de serie de Club Car (desde 1981), E-Z-GO (desde 1976), Yamaha, Cushman, Star EV y otros fabricantes principales. Cada formato es distinto — nuestro decodificador los detecta automáticamente.",
    schemaName: "Decodificador de carrito de golf",
  },

  "paint-code-finder": {
    esSlug: "/buscar-codigo-pintura",
    englishPath: "/paint-code-finder",
    icon: Palette,
    badge: "Código de pintura · OEM",
    h1: "Buscador de código de pintura por VIN",
    metaTitle: "Buscar código pintura por VIN — OEM gratis",
    metaDescription:
      "Encuentra el código de pintura OEM exacto de tu auto por VIN. Nombre del color, año de producción y referencia para retoque — gratis, al instante, sin registro.",
    keywords: [
      "código de pintura VIN",
      "buscar color pintura auto",
      "OEM código color",
      "pintura retoque por VIN",
      "código pintura Honda Toyota Ford",
      "color de fábrica VIN",
    ],
    intro:
      "El código de pintura de fábrica de tu auto está vinculado al VIN — el fabricante asigna un código alfanumérico (ej. NH788P, 1G3, UA) que identifica exactamente el color, tono y proceso de aplicación usado en la línea de ensamblaje. Saberlo es la única manera de pedir el bote, bolígrafo o pintura de retoque que combine perfectamente con el resto de la carrocería.",
    whatYouGet: [
      "Código OEM exacto del fabricante",
      "Nombre comercial del color (Lunar Silver Metallic, Magnetic Gray, etc.)",
      "Años de producción en que se ofreció ese color",
      "Códigos equivalentes para botellas, bolígrafos y latas de aerosol de retoque",
      "Indicación de capas (base + transparente vs monoetapa)",
      "Compatibilidad con sistemas de pintura PPG, Sherwin-Williams y BASF",
    ],
    whyItMatters: [
      "Los códigos genéricos (negro, blanco, plata) NO bastan — hay docenas de tonos por marca",
      "Aplicar el código equivocado deja parche visible bajo el sol",
      "Los códigos del marco de la puerta a veces se borran con sol o lavado — el VIN siempre los conserva",
      "Esencial antes de comprar pintura de retoque (típicamente $20–$60) para evitar reembolsos",
    ],
    trustNote:
      "Decodificamos códigos de pintura de fábrica para todas las marcas principales: Toyota, Honda, Ford, Chevrolet, BMW, Mercedes-Benz y más. Los datos vienen directamente de las hojas de especificación del fabricante.",
    schemaName: "Buscador de código de pintura por VIN",
  },

  "window-sticker": {
    esSlug: "/etiqueta-monroney",
    englishPath: "/window-sticker-lookup",
    icon: FileText,
    badge: "Etiqueta Monroney · Original de fábrica",
    h1: "Buscar etiqueta Monroney (window sticker) por VIN",
    metaTitle: "Etiqueta Monroney gratis por VIN — Window sticker",
    metaDescription:
      "Recupera la etiqueta Monroney (window sticker) original de fábrica por VIN. MSRP, equipamiento instalado, eficiencia EPA y opciones — gratis e instantáneo.",
    keywords: [
      "etiqueta Monroney VIN",
      "window sticker español",
      "MSRP por VIN",
      "ficha original fábrica auto",
      "equipamiento de fábrica VIN",
      "EPA fuel economy por VIN",
    ],
    intro:
      "La etiqueta Monroney — la ficha original que pegan en la ventana del auto nuevo en el lote del concesionario — lista el MSRP, el equipamiento instalado de fábrica, las opciones agregadas, los ratings EPA de economía de combustible y los créditos al consumidor. Recuperarla por VIN te da prueba documentada del precio y equipamiento original, esencial para negociar el precio de un usado o detectar accesorios falsos.",
    whatYouGet: [
      "MSRP original (precio sugerido por el fabricante)",
      "Lista completa de equipamiento de fábrica",
      "Opciones y paquetes agregados con su precio individual",
      "Ratings EPA: millas por galón ciudad/carretera y emisiones",
      "Datos de seguridad y características de asistencia al conductor",
      "Información de procedencia y planta de ensamblaje",
    ],
    whyItMatters: [
      "Te muestra el precio real del auto cuando salió de fábrica — base para negociar usado",
      "Detecta accesorios 'post-venta' vendidos como 'incluidos de fábrica'",
      "Confirma si el auto tiene los paquetes premium que el vendedor afirma",
      "Documenta el MPG real del EPA, no las estimaciones del vendedor",
    ],
    trustNote:
      "Las etiquetas Monroney provienen directamente de bases de datos del fabricante y el EPA. Cubrimos Ford, Toyota, Honda, Chevrolet, BMW, Mercedes-Benz y más de 30 marcas con datos retroactivos hasta los modelos del año 2008.",
    schemaName: "Buscador de etiqueta Monroney por VIN",
  },

  "motorcycle": {
    esSlug: "/vin-motocicleta",
    englishPath: "/motorcycle-vin-check",
    icon: Bike,
    badge: "Motocicleta · VIN 17 caracteres",
    h1: "Revisión VIN para motocicleta — Decodificador e historial",
    metaTitle: "Revisión VIN moto gratis — Decodificador e historial",
    metaDescription:
      "Decodifica cualquier VIN de motocicleta (Harley, Honda, Yamaha, Kawasaki, Ducati) gratis. Marca, modelo, cilindrada, retiros NHTSA e historial de robo — al instante.",
    keywords: [
      "VIN moto",
      "VIN motocicleta",
      "decodificador VIN Harley",
      "VIN Honda Yamaha Kawasaki",
      "historial robo moto",
      "retiros NHTSA moto",
    ],
    intro:
      "Las motocicletas usan VIN de 17 caracteres igual que los autos, pero la decodificación es distinta: el VIN identifica la familia del motor (V-Twin, paralelo, single), la cilindrada exacta (250cc, 600cc, 1200cc, etc.), el modelo y la configuración del marco. Verificar el VIN antes de comprar una moto usada es crítico — las motos están entre los vehículos más robados de EE. UU. y el clonado de placas y marcos es común.",
    whatYouGet: [
      "Marca, modelo y año del modelo exactos",
      "Cilindrada del motor y configuración (V-Twin, inline-four, single)",
      "Tipo de transmisión y características del chasís",
      "Retiros de seguridad activos de la NHTSA por VIN",
      "Registros reportados de robo (NICB)",
      "Marcas de título: salvage, rebuilt, junk",
      "Lecturas del odómetro y registros de propiedad anteriores",
    ],
    whyItMatters: [
      "Harley-Davidson, Honda CBR/Civic Type R y Yamaha YZF están entre las marcas más robadas",
      "Las motos chocadas se 'reconstruyen' fácilmente con marco y motor de otra unidad — el VIN debe coincidir",
      "Los retiros de Harley por dirección y frenos afectan miles de unidades por año",
      "Salvage o rebuilt en una moto reduce el valor de reventa 30–50% — verifícalo antes de pagar precio premium",
    ],
    trustNote:
      "Cubrimos VIN de Harley-Davidson, Honda, Yamaha, Kawasaki, Suzuki, Ducati, BMW Motorrad, KTM, Triumph, Indian y más. Datos cruzados con NMVTIS, NHTSA y NICB en cada búsqueda.",
    schemaName: "Decodificador VIN de motocicleta",
  },

  "rv": {
    esSlug: "/vin-rv",
    englishPath: "/rv-vin-check",
    icon: Caravan,
    badge: "RV · Casa rodante · Motorhome",
    h1: "Revisión VIN para RV — Casa rodante y motorhome",
    metaTitle: "VIN RV gratis — Casa rodante y motorhome historial",
    metaDescription:
      "Revisión VIN gratis para RVs, motorhomes y casas rodantes (Class A, B, C, fifth-wheel). Decodifica chasís, motor, GVWR, retiros NHTSA e historial — al instante.",
    keywords: [
      "VIN RV",
      "VIN motorhome",
      "VIN casa rodante",
      "Class A B C RV",
      "fifth wheel VIN",
      "historial RV usado",
    ],
    intro:
      "Los RVs y motorhomes usan VIN de 17 caracteres del chasís base (Freightliner, Spartan, Ford, Mercedes Sprinter, Workhorse), no del fabricante de la conversión (Winnebago, Forest River, Thor). Decodificarlo correctamente revela el chasís real, el motor, el GVWR y los retiros activos — datos críticos antes de invertir $50,000+ en una unidad usada.",
    whatYouGet: [
      "Chasís y motor reales (Ford F-53, Cummins ISB, Mercedes OM642)",
      "GVWR y capacidad de carga útil (payload)",
      "Tipo de RV: Class A diesel/gas, Class B (van), Class C, fifth-wheel",
      "Año del chasís vs año de la conversión (a veces difieren 1–2 años)",
      "Retiros activos de la NHTSA por frenos, dirección y sistemas eléctricos",
      "Historial de pérdida total, daño por incendio y marcas de inundación",
    ],
    whyItMatters: [
      "Los daños por agua en RVs son extremadamente costosos — el reporte señala marcas Flood",
      "Los chasís Ford F-53 con dirección 'wander' tuvieron campañas de retiro — verificarlas por VIN",
      "Los motorhomes diésel con sistemas DEF/SCR de emisiones tienen reparaciones de $5K+",
      "Salvage en un motorhome puede significar incendio de cocina — invisible tras renovación cosmética",
    ],
    trustNote:
      "Decodificamos VIN de chasís Ford F-53, Workhorse, Freightliner Custom Chassis, Mercedes Sprinter, RAM ProMaster y Spartan. Cubrimos conversiones de Winnebago, Forest River, Thor, Tiffin, Newmar y más.",
    schemaName: "Decodificador VIN de RV",
  },

  "classic-car": {
    esSlug: "/vin-auto-clasico",
    englishPath: "/classic-car-vin",
    icon: Car,
    badge: "Auto clásico · Pre-1981",
    h1: "Decodificador VIN de auto clásico",
    metaTitle: "VIN auto clásico gratis — Decodificador pre-1981",
    metaDescription:
      "Decodifica VIN de autos clásicos pre-1981 (5–13 caracteres). Confirma autenticidad, motor numbers-matching, año y planta — gratis y al instante.",
    keywords: [
      "VIN auto clásico",
      "VIN pre 1981",
      "numbers matching VIN",
      "decodificador Camaro Mustang Chevelle",
      "VIN auto coleccionable",
      "código motor auto clásico",
    ],
    intro:
      "Los autos clásicos pre-1981 usan VIN de 5–13 caracteres con un formato distinto al moderno de 17 caracteres. Cada fabricante tenía su propio esquema — Chevrolet codificaba año, planta y serie; Ford incluía código del motor; Chrysler tenía un sistema híbrido. Decodificar correctamente un Camaro 1969, un Mustang 1965 o un Chevelle SS es la única forma de verificar autenticidad numbers-matching antes de pagar precio premium.",
    whatYouGet: [
      "Año del modelo y planta de ensamblaje",
      "Código de motor original (SS396, 350-V8, 289 HiPo, 426 Hemi)",
      "Código de transmisión y eje (Muncie M21, Toploader 4-speed)",
      "Código de color original y código de trim",
      "Verificación numbers-matching para motor y caja",
      "Año de producción dentro del año modelo (early/late)",
    ],
    whyItMatters: [
      "Un Camaro Z/28 1969 numbers-matching vale 3–5× más que uno con motor reemplazado",
      "Los autos 'restomod' a veces se venden como originales — el VIN revela la verdad",
      "Las réplicas de Shelby, Yenko y COPO usan VIN base + tags falsificados — verifica autenticidad",
      "Las aseguradoras de autos clásicos (Hagerty, Grundy) exigen verificación VIN para coberturas Agreed Value",
    ],
    trustNote:
      "Decodificamos VIN de GM (Chevy, Pontiac, Olds, Buick), Ford, Mopar (Chrysler, Plymouth, Dodge), AMC, Studebaker y más, desde 1955 hasta 1980. Cada esquema de VIN tiene su propio decodificador.",
    schemaName: "Decodificador VIN de auto clásico",
  },

  "jdm": {
    esSlug: "/vin-importacion-jdm",
    englishPath: "/jdm-import-check",
    icon: Globe2,
    badge: "JDM · Importación japonesa",
    h1: "Revisión de VIN para auto JDM importado",
    metaTitle: "VIN JDM gratis — Importación japonesa historial",
    metaDescription:
      "Verifica importaciones JDM (Skyline GT-R, Supra, Land Cruiser) por número de chasís japonés. Año, modelo, especificaciones, exportación e historial — gratis.",
    keywords: [
      "VIN JDM",
      "número chasís japonés",
      "Skyline GT-R VIN",
      "Toyota Supra MK4 VIN",
      "Land Cruiser JDM",
      "importación auto Japón",
    ],
    intro:
      "Los autos JDM importados (Skyline GT-R R32/R33/R34, Supra MK4, Land Cruiser 70-series, Silvia S13/S14/S15) usan un número de chasís japonés distinto al VIN estadounidense de 17 caracteres. El número comienza con un código de modelo (BNR32, JZA80, FZJ80) seguido de un número de serie. Verificarlo es esencial antes de invertir $40K–$200K+ en una importación de 25 años bajo la regla de importación de EE. UU.",
    whatYouGet: [
      "Código de modelo exacto (BNR32 vs BNR33 vs BNR34 para Skyline GT-R)",
      "Año de producción y mes de fabricación",
      "Trim y opciones específicas del JDM (V-Spec, Nismo, TRD)",
      "Motor original (RB26DETT, 2JZ-GTE, 1HZ)",
      "Confirmación de elegibilidad bajo la regla de 25 años de EE. UU.",
      "Historial de exportación de Japón y país de destino",
    ],
    whyItMatters: [
      "Los Skyline GT-R falsificados (motor swap, marco gris) inundan el mercado — verifica el chasis original",
      "La regla de 25 años de la NHTSA exige fecha exacta de fabricación, no solo año modelo",
      "Las importaciones JDM con título 'lavado' en Canadá pueden tener historial de daño que el VIN japonés revela",
      "El valor de un Supra MK4 numbers-matching es 3× el de uno con motor reemplazado",
    ],
    trustNote:
      "Decodificamos códigos de chasís de Nissan (Skyline, Silvia, GT-R), Toyota (Supra, Land Cruiser, Chaser), Honda (NSX, Civic Type R, Integra Type R), Mazda (RX-7), Mitsubishi (Lancer Evolution) y Subaru (WRX STI).",
    schemaName: "Decodificador VIN de auto JDM",
  },

  /* ── Wave 12 — high-intent check pages ──────────────────────────── */

  "recall-check": {
    esSlug: "/verificacion-recall",
    englishPath: "/recall-check",
    icon: AlertTriangle,
    badge: "Recalls NHTSA · Verificación gratis",
    h1: "Verificación de recalls NHTSA por VIN",
    metaTitle: "Verificación de recall NHTSA gratis por VIN",
    metaDescription:
      "Consulta retiros (recalls) abiertos de la NHTSA por VIN. Cubrimos Toyota, Ford, Honda, GM, Hyundai y más. Gratis, al instante, sin registro.",
    keywords: [
      "verificación recall VIN",
      "recall NHTSA español",
      "consulta recall por VIN",
      "retiro vehículo NHTSA",
      "campañas de seguridad auto",
      "recall Takata airbag",
    ],
    intro:
      "La NHTSA (Administración Nacional de Seguridad del Tráfico en Carreteras) publica retiros (recalls) por VIN cada semana. Más de 50 millones de vehículos circulan en EE. UU. con al menos un recall abierto — frenos, airbags Takata, sistemas eléctricos. Verificarlo gratis por VIN antes de comprar usado, o como dueño actual, es la única forma de saber si tu vehículo está sujeto a una reparación gratuita del fabricante.",
    whatYouGet: [
      "Lista completa de recalls activos y cerrados por VIN",
      "Descripción del defecto y riesgo de seguridad",
      "Número de campaña NHTSA (formato 23V-456)",
      "Instrucciones de reparación y plazo del fabricante",
      "Concesionario autorizado más cercano para la reparación",
      "Costo de reparación: GRATIS bajo recall federal",
      "Historial de recalls anteriores y si fueron completados",
    ],
    whyItMatters: [
      "Los recalls de airbags Takata han causado más de 27 muertes y 400 lesiones — verifica antes de comprar",
      "Un vehículo con recall abierto puede negársele la inspección en algunos estados",
      "Las reparaciones por recall son gratuitas sin importar año o kilometraje, pero solo si las solicitas",
      "Las aseguradoras pueden negar reclamos si el accidente involucra un defecto bajo recall no reparado",
    ],
    trustNote:
      "Los datos se cruzan en tiempo real contra la base oficial de la NHTSA. Cubrimos todas las marcas registradas en EE. UU. desde 1995. Si encuentras un recall abierto, llévalo al concesionario autorizado — la reparación es gratuita por ley federal.",
    schemaName: "Verificación de recalls NHTSA por VIN",
  },

  "lemon-check": {
    esSlug: "/verificacion-ley-limon",
    englishPath: "/lemon-check",
    icon: Scale,
    badge: "Ley Limón · 50 estados",
    h1: "Verificación bajo la Ley Limón por VIN",
    metaTitle: "Verificación Ley Limón gratis por VIN",
    metaDescription:
      "Revisa si tu auto está protegido bajo la Ley Limón estatal o federal Magnuson-Moss. Cobertura por estado, plazos y reembolsos — gratis por VIN.",
    keywords: [
      "Ley Limón VIN",
      "lemon law español",
      "auto defectuoso reembolso",
      "Magnuson-Moss Act español",
      "ley limón California Texas Florida",
      "auto nuevo defectuoso devolución",
    ],
    intro:
      "Las leyes \"Lemon Law\" o Ley Limón existen en los 50 estados de EE. UU. y bajo la ley federal Magnuson-Moss. Protegen al comprador de un auto nuevo (y en muchos estados, también usado bajo garantía) que presenta un defecto sustancial que el fabricante no logra reparar tras un número razonable de intentos. Verifica gratis por VIN si tu vehículo cumple los criterios de protección en tu estado.",
    whatYouGet: [
      "Cobertura específica de la Ley Limón en tu estado",
      "Número de intentos de reparación requeridos antes de calificar",
      "Plazo legal: días en taller, meses desde la compra, millas máximas",
      "Tipo de remedio: reembolso completo, reemplazo del vehículo, o cash",
      "Aplicabilidad a autos usados bajo garantía de fábrica restante",
      "Cobertura adicional bajo la ley federal Magnuson-Moss",
      "Recursos de abogados especializados en Ley Limón (sin costo si ganas)",
    ],
    whyItMatters: [
      "Los abogados de Ley Limón cobran al fabricante, no al consumidor — tu reclamo no cuesta nada",
      "California, Florida y Texas tienen las leyes más estrictas y reembolsos más altos",
      "Los autos eléctricos (Tesla, Rivian) generan reclamos crecientes por baterías y software",
      "Los plazos son cortos: en muchos estados pierdes el derecho tras 12 o 18 meses sin reclamar",
    ],
    trustNote:
      "Cubrimos los 50 estados + Magnuson-Moss federal. La elegibilidad se basa en la fecha de compra, kilometraje, número de reparaciones documentadas y tipo de defecto. La verificación por VIN te da el marco; un abogado certificado en tu estado confirma el caso.",
    schemaName: "Verificación de Ley Limón por VIN",
  },

  "odometer-check": {
    esSlug: "/verificacion-odometro",
    englishPath: "/odometer-check",
    icon: Gauge,
    badge: "Odómetro · Fraude detectado",
    h1: "Verificación de fraude de odómetro por VIN",
    metaTitle: "Verificación de odómetro gratis por VIN",
    metaDescription:
      "Detecta fraude de odómetro (rollback) por VIN. Compara lecturas históricas de inspecciones, registro y servicio. Gratis, al instante, sin registro.",
    keywords: [
      "fraude odómetro VIN",
      "verificación kilometraje auto",
      "rollback odómetro español",
      "kilometraje real auto usado",
      "historial odómetro VIN",
      "odómetro alterado detectar",
    ],
    intro:
      "El fraude de odómetro (\"rollback\") cuesta a los compradores estadounidenses más de mil millones de dólares al año, según la NHTSA. Cada inspección estatal, cambio de aceite documentado, registro de DMV y orden de servicio queda registrado con la lectura del odómetro en ese momento. Si las lecturas históricas no son monótonamente crecientes, el odómetro fue retrocedido. Verifícalo gratis por VIN antes de comprar.",
    whatYouGet: [
      "Cronología completa de lecturas históricas del odómetro",
      "Detección automática de retroceso (rollback) en cualquier punto",
      "Lecturas de inspecciones estatales (smog, safety)",
      "Lecturas de registros DMV en cada transferencia de título",
      "Lecturas de talleres autorizados (Ford, Toyota, Honda dealers)",
      "Marcas \"Not Actual Mileage\" reportadas en el título",
      "Discrepancia estimada (millas reales vs millas mostradas)",
    ],
    whyItMatters: [
      "La NHTSA estima que 1 de cada 10 autos usados a la venta tiene el odómetro alterado",
      "Un rollback típico añade $4,000 al precio del vehículo — directo a la pérdida del comprador",
      "El fraude federal de odómetro puede ser perseguido bajo el Federal Odometer Act",
      "Los autos sin historial de servicio reciente son especialmente sospechosos",
    ],
    trustNote:
      "Las lecturas se cruzan contra NMVTIS (Sistema Nacional del Título de Vehículos), DMVs estatales, redes de talleres autorizados y aseguradoras. Si el odómetro fue alterado, las lecturas más antiguas suelen exceder las más recientes — el algoritmo lo detecta automáticamente.",
    schemaName: "Verificación de fraude de odómetro por VIN",
  },

  "salvage-title-check": {
    esSlug: "/titulo-salvamento",
    englishPath: "/salvage-title-check",
    icon: Recycle,
    badge: "Título de salvamento · NMVTIS",
    h1: "Verificación de título de salvamento por VIN",
    metaTitle: "Verificación título salvamento gratis por VIN",
    metaDescription:
      "Detecta títulos de salvamento (salvage), reconstruidos (rebuilt) o de chatarra (junk) por VIN. Datos oficiales NMVTIS — gratis, al instante.",
    keywords: [
      "título salvamento VIN",
      "salvage title español",
      "auto reconstruido VIN",
      "rebuilt title español",
      "junk title VIN",
      "auto pérdida total título",
    ],
    intro:
      "Un \"salvage title\" o título de salvamento se emite cuando una aseguradora declara un vehículo como pérdida total, normalmente porque el costo de reparación excede del 70% al 90% del valor del auto. Estos vehículos pueden ser reconstruidos y vendidos legalmente, pero pierden 20–40% de su valor de reventa, son difíciles de asegurar a todo riesgo, y pueden tener daños estructurales ocultos. Verifícalo gratis por VIN antes de comprar.",
    whatYouGet: [
      "Tipo exacto de marca: Salvage, Rebuilt, Reconstructed, Junk, Flood",
      "Estado donde se emitió el título dañado",
      "Razón de la marca: colisión, inundación, robo recuperado, granizo",
      "Fecha en que la aseguradora declaró pérdida total",
      "Historial de subastas Copart o IAA (Insurance Auto Auctions)",
      "Antiguos estados de registro y fecha de cada transferencia",
      "Si el título fue \"lavado\" (washed) cruzando fronteras estatales",
    ],
    whyItMatters: [
      "Un vehículo salvage vale 20–40% menos — no pagues precio de auto limpio",
      "Muchas aseguradoras solo ofrecen cobertura básica (liability) para autos salvage",
      "Los daños estructurales (chasis) reconstruidos pueden comprometer airbags y zonas de impacto",
      "El \"title washing\" entre estados oculta marcas — NMVTIS las recupera todas",
    ],
    trustNote:
      "Los datos provienen de NMVTIS, la base federal que consolida marcas de título de los 50 estados. NMVTIS es administrada por el Departamento de Justicia (BJA) y es obligatoria para todas las aseguradoras y desguazadoras desde 2009. Si hay una marca, está en NMVTIS.",
    schemaName: "Verificación de título de salvamento por VIN",
  },

  "flood-check": {
    esSlug: "/verificacion-inundacion",
    englishPath: "/flood-check",
    icon: Droplets,
    badge: "Daño por inundación · NMVTIS + NICB",
    h1: "Verificación de daño por inundación por VIN",
    metaTitle: "Verificación daño inundación gratis por VIN",
    metaDescription:
      "Detecta daño por inundación (flood damage) por VIN. Cruza datos NMVTIS, NICB y reportes de huracanes. Gratis, al instante, sin registro.",
    keywords: [
      "daño inundación VIN",
      "flood damage español",
      "auto inundado VIN",
      "huracán Harvey Ian Ida autos",
      "auto agua salada daño",
      "flood title vehículo",
    ],
    intro:
      "Después de cada huracán mayor (Harvey 2017, Florence 2018, Ian 2022, Helene 2024) decenas de miles de vehículos inundados se secan superficialmente, se limpian y se revenden a compradores desprevenidos — a menudo cruzando fronteras estatales para \"lavar\" el título. El agua salada corroe componentes eléctricos, transmisión y motor a lo largo de meses. Verifícalo gratis por VIN antes de comprar.",
    whatYouGet: [
      "Marcas \"Flood\" o \"Water Damage\" en el título (NMVTIS)",
      "Registros de pérdida total por inundación reportados por aseguradoras",
      "Cruce con códigos postales declarados zona de desastre FEMA",
      "Registros NICB (National Insurance Crime Bureau) de vehículos inundados recuperados",
      "Historial de subastas Copart/IAA post-huracán",
      "Estado de origen vs estado de registro actual (señal de title washing)",
      "Recomendaciones para inspección física (mecánico + inspector eléctrico)",
    ],
    whyItMatters: [
      "Tras el huracán Harvey, FEMA estimó 500,000 vehículos dañados — muchos vueltos a vender",
      "El daño por agua salada destruye módulos electrónicos meses después — fuera de garantía",
      "Los airbags inundados pueden fallar al desplegarse o desplegarse sin razón",
      "El moho dentro de paneles causa problemas de salud crónicos al ocupante",
    ],
    trustNote:
      "Los datos provienen de NMVTIS (Departamento de Justicia), NICB, FEMA y aseguradoras participantes. Si el vehículo fue declarado pérdida total por inundación en cualquier estado, NMVTIS lo retiene. Cubrimos eventos desde el huracán Katrina (2005) hasta los huracanes recientes de 2024.",
    schemaName: "Verificación de daño por inundación por VIN",
  },

  "accident-history-check": {
    esSlug: "/historial-accidentes",
    englishPath: "/accident-history-check",
    icon: CarFront,
    badge: "Historial de accidentes · NMVTIS",
    h1: "Verificación de historial de accidentes por VIN",
    metaTitle: "Verificación historial accidentes gratis por VIN",
    metaDescription:
      "Consulta historial de accidentes y reparaciones por VIN. Cruza datos de DMV, aseguradoras y talleres. Gratis, al instante, sin registro.",
    keywords: [
      "historial accidentes VIN",
      "accident history español",
      "auto chocado VIN",
      "reparación accidente VIN",
      "reporte accidente vehículo",
      "auto con accidente verificar",
    ],
    intro:
      "Aproximadamente el 40% de los autos usados a la venta en EE. UU. han estado en al menos un accidente reportado. Los accidentes menores (parachoques, alcance trasero) pueden no afectar el valor — pero accidentes con airbag desplegado, daño estructural del chasís o pérdida total reconstruida sí lo hacen. Verifica gratis por VIN cada incidente reportado a aseguradoras, DMVs y talleres certificados antes de comprar.",
    whatYouGet: [
      "Lista de accidentes reportados con fecha y ubicación general",
      "Severidad: menor, moderada, mayor o pérdida total",
      "Tipo de impacto: frontal, trasero, lateral, vuelco",
      "Si se desplegaron airbags durante el accidente",
      "Registros de reparación en talleres certificados",
      "Marcas en el título derivadas de un accidente (salvage, rebuilt)",
      "Fecha del último servicio post-accidente reportado",
    ],
    whyItMatters: [
      "Los accidentes con daño estructural reducen el valor de reventa 25–40%",
      "Un airbag desplegado y mal reemplazado puede no funcionar en el próximo accidente",
      "Las aseguradoras pueden cobrar primas más altas si descubren el historial al asegurar",
      "Los compradores informados pueden negociar $1,500–$5,000 de descuento sobre el precio inicial",
    ],
    trustNote:
      "Los datos provienen de NMVTIS, reportes de aseguradoras participantes, DMVs estatales y registros de talleres certificados por fabricante. Los accidentes NO reportados a aseguradoras (reparaciones \"de bolsillo\") pueden no aparecer — una inspección mecánica antes de comprar siempre es recomendable.",
    schemaName: "Verificación de historial de accidentes por VIN",
  },

  "stolen-vehicle-check": {
    esSlug: "/vehiculo-robado",
    englishPath: "/stolen-vehicle-check",
    icon: ShieldAlert,
    badge: "Vehículo robado · NICB",
    h1: "Verificación de vehículo robado por VIN",
    metaTitle: "Verificación vehículo robado gratis por VIN",
    metaDescription:
      "Consulta si un VIN está reportado como robado en la base NICB. Gratis, al instante, sin registro. Cubre los 50 estados de EE. UU.",
    keywords: [
      "vehículo robado VIN",
      "stolen vehicle español",
      "auto robado consultar",
      "NICB español",
      "VIN clonado fraude",
      "auto robado recuperado",
    ],
    intro:
      "El National Insurance Crime Bureau (NICB) mantiene la base oficial de vehículos robados reportados por aseguradoras y fuerzas policiales en EE. UU. Comprar un vehículo robado — aunque sea sin saberlo — significa perderlo sin reembolso cuando la policía lo confisque. Los traficantes a veces clonan VINs de autos limpios para enmascarar los robados. Verifica gratis por VIN antes de pagar.",
    whatYouGet: [
      "Estado actual: limpio, reportado como robado, recuperado",
      "Fecha del reporte de robo",
      "Jurisdicción donde se reportó el robo",
      "Si fue recuperado y devuelto al propietario o aseguradora",
      "Cruce con registros de subastas (señales de \"título lavado\" post-robo)",
      "Indicadores de posible clonación de VIN",
      "Recomendaciones si el vehículo aparece reportado",
    ],
    whyItMatters: [
      "Comprar un vehículo robado significa perderlo SIN reembolso al ser confiscado",
      "Los VINs clonados son una estafa creciente — el vendedor parece legítimo pero el auto es robado",
      "Pickups Ford F-150, Honda Civic y Hyundai/Kia están entre los más robados",
      "Una verificación NICB toma 5 segundos y previene una pérdida de $20,000–$80,000",
    ],
    trustNote:
      "La base NICB (National Insurance Crime Bureau) consolida reportes de más de 1,100 aseguradoras y agencias policiales. Si un vehículo aparece reportado, NO completes la compra y reporta el caso a la policía local. La verificación es gratuita y anónima.",
    schemaName: "Verificación de vehículo robado por VIN",
  },

  "hail-damage-check": {
    esSlug: "/dano-granizo",
    englishPath: "/hail-damage-check",
    icon: CloudHail,
    badge: "Daño por granizo · Subastas + NMVTIS",
    h1: "Verificación de daño por granizo por VIN",
    metaTitle: "Verificación daño granizo gratis por VIN",
    metaDescription:
      "Detecta daño por granizo (hail damage) por VIN. Cruza datos NMVTIS, NICB y subastas post-tormenta. Gratis, al instante, sin registro.",
    keywords: [
      "daño granizo VIN",
      "hail damage español",
      "auto granizado VIN",
      "tormenta granizo Texas Colorado",
      "PDR sin pintura granizo",
      "subasta auto granizado",
    ],
    intro:
      "Las tormentas de granizo en Texas, Colorado, Oklahoma y Nebraska generan cada año decenas de miles de vehículos con daño cosmético — abolladuras en el techo, capó y maletero. Las aseguradoras a menudo los declaran pérdida total cuando el costo de reparación excede su valor de mercado, los venden en subastas, y reaparecen en lotes de venta tras reparación PDR (Paintless Dent Repair) parcial. Verifícalo gratis por VIN antes de comprar.",
    whatYouGet: [
      "Marcas \"Hail Damage\" en el título o reportes de aseguradora",
      "Si el vehículo fue declarado pérdida total por granizo",
      "Historial de subastas Copart/IAA con clasificación \"Hail Damage\"",
      "Cruce con eventos de granizo declarados zona de desastre",
      "Indicadores de reparación PDR (parcial vs completa)",
      "Estado de origen vs estado de venta actual (señal de title washing)",
      "Recomendaciones de inspección bajo luz directa",
    ],
    whyItMatters: [
      "Un vehículo granizado mal reparado pierde 15–30% de valor de reventa",
      "El daño en el techo puede comprometer la integridad estructural en un vuelco",
      "Las reparaciones PDR mal hechas dejan abolladuras visibles bajo luz directa del sol",
      "La pintura sobre granizo se agrieta y desprende meses después",
    ],
    trustNote:
      "Los datos provienen de NMVTIS, reportes de aseguradoras participantes y registros de subastas post-tormenta de Copart e IAA. Si el vehículo fue declarado pérdida total por granizo, NMVTIS lo retiene incluso si el título fue lavado cruzando estados.",
    schemaName: "Verificación de daño por granizo por VIN",
  },

  "airbag-check": {
    esSlug: "/verificacion-airbag",
    englishPath: "/airbag-check",
    icon: ShieldOff,
    badge: "Airbag · Despliegue y Takata",
    h1: "Verificación de airbag y recall Takata por VIN",
    metaTitle: "Verificación airbag Takata gratis por VIN",
    metaDescription:
      "Detecta si los airbags se desplegaron en un accidente previo, o si el VIN está bajo recall Takata. Gratis, al instante, sin registro.",
    keywords: [
      "airbag VIN verificación",
      "Takata airbag español",
      "airbag desplegado VIN",
      "recall airbag NHTSA",
      "bolsa de aire defectuosa",
      "airbag reemplazado verificar",
    ],
    intro:
      "El recall global de airbags Takata es el mayor de la historia automotriz: más de 70 millones de bolsas de aire defectuosas en EE. UU. que pueden explotar y enviar fragmentos metálicos al conductor o pasajero. Más de 27 muertes confirmadas. Verifica gratis por VIN si tus airbags están bajo recall Takata, o si fueron desplegados en un accidente previo y reemplazados (o no).",
    whatYouGet: [
      "Estado del recall Takata para tu VIN (abierto o reparado)",
      "Si los airbags se desplegaron en un accidente previo",
      "Otros recalls de airbags (ARC, Joyson, ZF-TRW)",
      "Concesionario autorizado más cercano para la reparación gratis",
      "Lista de marcas y modelos cubiertos por el recall Takata",
      "Fecha estimada de disponibilidad de la pieza de reemplazo",
      "Riesgo \"alpha\" (calor + humedad): mayor riesgo de explosión",
    ],
    whyItMatters: [
      "Los airbags Takata defectuosos han matado a 27+ personas y herido a 400+ en EE. UU.",
      "Los vehículos en estados calientes/húmedos (FL, TX, HI, PR) tienen riesgo \"alpha\" — máxima prioridad",
      "La reparación bajo recall es GRATIS sin importar año o kilometraje",
      "Un airbag mal reemplazado después de un accidente puede no desplegarse en el siguiente",
    ],
    trustNote:
      "Los datos del recall Takata se cruzan en tiempo real con la base oficial de la NHTSA. Si tu VIN aparece bajo recall, llévalo al concesionario autorizado de tu marca — la reparación es gratuita por ley federal. El historial de despliegue se cruza con reportes de aseguradora y talleres certificados.",
    schemaName: "Verificación de airbag y Takata por VIN",
  },

  "total-loss-check": {
    esSlug: "/perdida-total",
    englishPath: "/total-loss-check",
    icon: CircleSlash,
    badge: "Pérdida total · Aseguradoras",
    h1: "Verificación de pérdida total por VIN",
    metaTitle: "Verificación pérdida total gratis por VIN",
    metaDescription:
      "Detecta si un vehículo fue declarado pérdida total (total loss) por una aseguradora. Cruza datos NMVTIS y subastas. Gratis por VIN.",
    keywords: [
      "pérdida total VIN",
      "total loss español",
      "auto declarado pérdida total",
      "aseguradora pérdida total VIN",
      "auto chocado reconstruido",
      "salvage por pérdida total",
    ],
    intro:
      "Una aseguradora declara un vehículo \"pérdida total\" (total loss) cuando el costo de reparación más el valor del salvamento excede el valor de mercado del auto antes del accidente — típicamente del 70% al 90%. El vehículo recibe un título \"salvage\" y, si se repara, un título \"rebuilt\". Estos autos pierden 20–40% de valor y son difíciles de asegurar a todo riesgo. Verifícalo gratis por VIN antes de pagar precio de auto limpio.",
    whatYouGet: [
      "Si una aseguradora declaró pérdida total alguna vez",
      "Fecha y razón: colisión, inundación, granizo, robo recuperado, incendio",
      "Estado donde se emitió el título salvage o rebuilt",
      "Historial de subastas Copart/IAA con clasificación de daño",
      "Si el vehículo fue reconstruido (rebuilt) o sigue como salvage",
      "Cruce con marcas en el título de los 50 estados (NMVTIS)",
      "Recomendaciones para inspección estructural y mecánica",
    ],
    whyItMatters: [
      "Un vehículo con historial de pérdida total vale 20–40% menos que uno limpio",
      "Muchas aseguradoras NO ofrecen cobertura comprehensive para autos rebuilt",
      "Los bancos rara vez financian autos con título salvage o rebuilt",
      "Una pérdida total reparada incorrectamente puede tener fallos estructurales ocultos",
    ],
    trustNote:
      "Los datos provienen de NMVTIS, aseguradoras participantes y registros de subastas Copart e IAA. Si el vehículo fue declarado pérdida total en cualquier estado, NMVTIS lo retiene — el \"title washing\" cruzando estados no oculta esta marca.",
    schemaName: "Verificación de pérdida total por VIN",
  },

  "auction-history": {
    esSlug: "/historial-subastas",
    englishPath: "/auction-history",
    icon: Gavel,
    badge: "Historial de subastas · Copart + IAA",
    h1: "Historial de subastas por VIN (Copart, IAA)",
    metaTitle: "Historial subastas auto gratis por VIN",
    metaDescription:
      "Consulta historial de subastas Copart e IAA por VIN. Fotos del daño, clasificación, precio de venta. Gratis, al instante, sin registro.",
    keywords: [
      "historial subasta VIN",
      "Copart historial VIN",
      "IAA historial VIN",
      "auction history español",
      "auto subasta Copart precio",
      "subasta seguros vehículo",
    ],
    intro:
      "Copart e IAA (Insurance Auto Auctions) son las dos principales casas de subastas de vehículos siniestrados en EE. UU. Las aseguradoras venden ahí los autos declarados pérdida total después de accidentes, inundaciones y granizo. Si un vehículo pasó por Copart o IAA, hay fotos, descripción del daño y precio de venta documentados. Verifícalo gratis por VIN para saber qué le pasó realmente.",
    whatYouGet: [
      "Lista de subastas pasadas en Copart e IAA con fecha",
      "Clasificación del daño: front-end, rear-end, side, hail, flood, vandalism",
      "Lecturas del odómetro al momento de cada subasta",
      "Precio final de venta (cuando disponible)",
      "Fotos del daño (cuando disponibles bajo licencia)",
      "Ubicación de la subasta (subasta yard)",
      "Estado primario del título al momento de la venta",
    ],
    whyItMatters: [
      "Un vehículo vendido en Copart o IAA fue declarado pérdida total por una aseguradora — pierde 20–40% de valor",
      "Las fotos de subasta revelan el daño real, no el cosmético \"reparado\" antes de revender",
      "Los autos vendidos en Copart como \"flood\" frecuentemente reaparecen como \"clean\" en otros estados",
      "Una subasta reciente seguida de venta como \"like new\" es la mayor bandera roja del mercado usado",
    ],
    trustNote:
      "Los datos de subastas se cruzan con NMVTIS y reportes públicos de Copart e IAA. Las fotos están sujetas a disponibilidad y licencia de imagen — cuando existen, son evidencia objetiva del daño que el vendedor actual quizá no mencione.",
    schemaName: "Historial de subastas Copart/IAA por VIN",
  },

  "market-value": {
    esSlug: "/valor-mercado-auto",
    englishPath: "/market-value",
    icon: DollarSign,
    badge: "Valor de mercado · KBB + NADA",
    h1: "Valor de mercado de auto por VIN",
    metaTitle: "Valor mercado auto gratis por VIN",
    metaDescription:
      "Consulta el valor de mercado real de un auto por VIN. Cruza datos KBB, NADA, Edmunds y precios de venta recientes. Gratis, al instante.",
    keywords: [
      "valor mercado auto VIN",
      "Kelley Blue Book español",
      "valor auto usado VIN",
      "precio justo auto usado",
      "tasación auto por VIN",
      "valor reventa vehículo",
    ],
    intro:
      "Saber el valor de mercado real de un vehículo por VIN es el primer paso para negociar el precio correcto — ya sea para comprar, vender o cambiar (trade-in). Las fuentes oficiales (Kelley Blue Book, NADA Guides, Edmunds) calculan el valor según año, modelo, equipamiento, kilometraje y región. Verifícalo gratis por VIN para tener la cifra exacta antes de cualquier negociación.",
    whatYouGet: [
      "Valor de trade-in (lo que el concesionario te dará al cambiarlo)",
      "Valor de venta privada (lo que pedirías en Craigslist/Facebook Marketplace)",
      "Valor de venta del concesionario (\"retail value\")",
      "Ajustes por equipamiento de fábrica (paquete premium, AWD, etc.)",
      "Ajustes por kilometraje vs el promedio del modelo",
      "Comparación de las 3 fuentes principales: KBB, NADA, Edmunds",
      "Tendencia de valor: depreciación esperada en 12 meses",
    ],
    whyItMatters: [
      "Los concesionarios suelen ofrecer 10–20% menos del valor real en trade-in — saber la cifra real protege tu bolsillo",
      "Pedir el precio correcto en venta privada acelera la venta sin dejar dinero en la mesa",
      "Las aseguradoras pueden subestimar el valor en caso de pérdida total — KBB/NADA es la referencia para apelar",
      "El valor varía 15–25% entre regiones (California vs Texas) — usa la cifra local",
    ],
    trustNote:
      "Las valuaciones se cruzan con las fuentes oficiales reconocidas por la industria (Kelley Blue Book, NADA, Edmunds) y precios de venta recientes en marketplaces. El valor estimado por VIN considera año, modelo, equipamiento opcional, kilometraje promedio del modelo y región de venta.",
    schemaName: "Valor de mercado de auto por VIN",
  },

  "vehicle-lien-check": {
    esSlug: "/verificacion-gravamen",
    englishPath: "/vehicle-lien-check",
    icon: Landmark,
    badge: "Gravamen · Lien · DMV",
    h1: "Verificación de gravamen (lien) por VIN",
    metaTitle: "Verificación gravamen auto gratis por VIN",
    metaDescription:
      "Consulta si un vehículo tiene gravamen activo (lien) por VIN. Si compras un auto con lien, el banco puede recuperarlo. Gratis, al instante.",
    keywords: [
      "gravamen auto VIN",
      "lien español auto",
      "auto con préstamo verificar",
      "DMV gravamen vehículo",
      "auto financiado verificar",
      "lienholder español",
    ],
    intro:
      "Un \"lien\" o gravamen es un préstamo registrado en el título del vehículo — un banco, financiera o crédito unión es el dueño legal hasta que el préstamo se paga completo. Comprar un auto con lien activo significa que el prestamista puede recuperarlo y dejarte sin auto y sin dinero. El gravamen queda registrado en el título estatal y en NMVTIS. Verifícalo gratis por VIN antes de pagar.",
    whatYouGet: [
      "Si hay un gravamen activo o liberado (\"released\")",
      "Nombre del prestamista (lienholder): banco, financiera, dealer",
      "Estado donde se registró el gravamen",
      "Fecha de registro del gravamen",
      "Si el título original ha sido entregado al comprador o sigue en poder del banco",
      "Indicación de gravámenes históricos pagados",
      "Recomendaciones si encuentras un gravamen activo",
    ],
    whyItMatters: [
      "Comprar un auto con gravamen activo = el banco puede recuperarlo sin pagarte nada",
      "El vendedor debe entregarte el título limpio o un \"lien release\" del banco antes de pagar",
      "Las estafas \"curbstoning\" venden autos con gravamen activo a compradores sin verificar",
      "Una verificación de 5 segundos previene una pérdida total de $10,000–$50,000+",
    ],
    trustNote:
      "Los datos de gravámenes se cruzan con NMVTIS y DMVs estatales. Si el vehículo tiene un lien activo, exige al vendedor el \"lien release\" del prestamista antes de pagar — sin ese documento, el título es transferible solo en papel, no en realidad legal.",
    schemaName: "Verificación de gravamen por VIN",
  },

  "vin-decoder": {
    esSlug: "/decodificador-vin",
    englishPath: "/vin-decoder",
    icon: Search,
    badge: "Decodificador VIN · 17 caracteres",
    h1: "Decodificador de VIN gratis (17 caracteres)",
    metaTitle: "Decodificador VIN gratis — Marca, modelo, motor",
    metaDescription:
      "Decodifica cualquier VIN de 17 caracteres gratis. Marca, modelo, año, planta, motor, transmisión y más. Al instante, sin registro.",
    keywords: [
      "decodificador VIN gratis",
      "VIN decoder español",
      "qué significa mi VIN",
      "decodificar 17 caracteres VIN",
      "leer VIN auto",
      "marca modelo VIN",
    ],
    intro:
      "El VIN (Vehicle Identification Number) es el código de 17 caracteres único de cada vehículo fabricado desde 1981. Cada carácter codifica información específica: país de origen, fabricante, tipo de vehículo, motor, año modelo, planta de ensamblaje y número de serie. Decodificarlo gratis revela toda la información de fábrica sin necesidad del título o documentos. Útil al comprar usado, reportar al seguro o pedir piezas correctas.",
    whatYouGet: [
      "Marca, modelo y año exactos del vehículo",
      "País y planta de ensamblaje (WMI: World Manufacturer Identifier)",
      "Configuración del motor (cilindrada, número de cilindros, tipo de combustible)",
      "Transmisión y tracción (FWD, RWD, AWD, 4WD)",
      "Tipo de carrocería (sedan, SUV, pickup, hatchback)",
      "Equipamiento de seguridad de fábrica (airbags, ABS, ESC)",
      "Número de serie de producción dentro del año modelo",
    ],
    whyItMatters: [
      "Pedir piezas con el VIN exacto evita errores de compatibilidad ($50–$500 ahorrados por evento)",
      "Confirmar el motor y transmisión antes de comprar evita estafas de \"motor swap\" no declarado",
      "El año modelo en el VIN puede diferir del año calendario de venta — afecta valor y seguro",
      "La planta de ensamblaje (US, México, Japón) impacta la calidad histórica de algunos modelos",
    ],
    trustNote:
      "El decodificador VIN cumple con el estándar ISO 3779/3780 y las reglas de la NHTSA (49 CFR Part 565). Decodificamos todos los VINs de 17 caracteres de vehículos fabricados o vendidos en EE. UU. desde 1981. Para autos pre-1981 usa el decodificador de auto clásico.",
    schemaName: "Decodificador de VIN gratis",
  },

  "best-vin-decoder": {
    esSlug: "/mejor-decodificador-vin",
    englishPath: "/best-vin-decoder",
    icon: Award,
    badge: "Mejor decodificador VIN · Comparativa",
    h1: "Mejor decodificador de VIN gratis en 2026",
    metaTitle: "Mejor decodificador VIN gratis 2026 — Comparativa",
    metaDescription:
      "Comparativa de los mejores decodificadores de VIN gratis en 2026: cobertura, precisión, idiomas y datos. Recomendaciones por caso de uso.",
    keywords: [
      "mejor decodificador VIN",
      "mejor VIN decoder español",
      "decodificador VIN gratis vs pagado",
      "VIN decoder comparativa 2026",
      "decodificador VIN preciso",
      "VIN check gratis español",
    ],
    intro:
      "No todos los decodificadores de VIN son iguales. Algunos cubren solo autos de pasajeros, otros solo modelos recientes, y muchos solo decodifican los primeros 11 caracteres (WMI + descriptor) sin acceder a los datos de configuración específica del vehículo. Esta guía comparativa lista los mejores decodificadores gratis en 2026, qué incluyen, qué no, y cuándo conviene usar uno pagado para datos críticos antes de comprar.",
    whatYouGet: [
      "Comparativa de cobertura por fabricante y año",
      "Qué datos decodifica cada herramienta (solo básicos vs configuración completa)",
      "Soporte para autos clásicos pre-1981 (5–13 caracteres)",
      "Soporte para motocicletas, camiones comerciales y JDM",
      "Precisión vs fuentes oficiales (NHTSA vPIC)",
      "Cuándo conviene un reporte pagado (historial NMVTIS + accidentes)",
      "Recomendaciones por caso de uso (comprador, vendedor, mecánico)",
    ],
    whyItMatters: [
      "Un decodificador débil te da solo \"Toyota Camry\" — los buenos dan el motor exacto, paquete trim y planta",
      "Los datos de configuración correctos previenen comprar piezas equivocadas y caer en estafas",
      "Los autos clásicos requieren decodificadores especializados — los generalistas devuelven \"VIN inválido\"",
      "Para decisiones de compra de $10K+ vale la pena un reporte pagado con historial NMVTIS completo",
    ],
    trustNote:
      "Las recomendaciones se basan en pruebas con muestras reales de los 50 estados, todos los fabricantes principales (Toyota, Ford, Honda, Chevrolet, BMW, Mercedes), y años modelo desde 1981 hasta 2026. Los datos de fuente oficial provienen del Vehicle API de la NHTSA (vPIC).",
    schemaName: "Mejor decodificador de VIN gratis",
  },
};
