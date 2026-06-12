/**
 * Wave 7 part B — Spanish guides + tools.
 *
 * 7 guides under /guides/* + /used-car-inspection-checklist + /compare-cars.
 * Reuses the SpecialtyToolPage renderer from Wave 5. Each entry's intent
 * is informational ("¿qué es un VIN?", "cómo leer un VIN") or
 * commercial-informational ("guía de compra de auto usado").
 */

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  FileSearch,
  ListChecks,
  ShieldAlert,
  FileText,
  Hash,
  HelpCircle,
  Wallet,
  GitCompare,
} from "lucide-react";
import type { SpecialtyHook } from "../_specialty-shared/strings";

export const GUIDE_HOOKS_ES: Record<string, SpecialtyHook> = {
  "what-is-a-vin": {
    esSlug: "/guias/que-es-un-numero-vin",
    englishPath: "/guides/what-is-a-vin-number",
    icon: HelpCircle,
    badge: "Guía · ¿Qué es un VIN?",
    h1: "¿Qué es un número VIN? — Guía completa para compradores",
    metaTitle: "¿Qué es un número VIN? — Guía completa español",
    metaDescription:
      "Guía completa de qué es un VIN, cómo se compone, dónde encontrarlo y qué revela. Aprende a leer y verificar el VIN de cualquier auto antes de comprar.",
    keywords: [
      "qué es un VIN",
      "número VIN español",
      "VIN auto qué significa",
      "para qué sirve el VIN",
      "decodificar VIN",
      "VIN 17 caracteres",
    ],
    intro:
      "El VIN (Vehicle Identification Number — Número de Identificación Vehicular) es un código único de 17 caracteres asignado a cada vehículo desde 1981. Cada carácter codifica información específica: país de origen, fabricante, tipo de vehículo, motor, año modelo, planta de ensamblaje y número de producción. Es como la huella digital del auto.",
    whatYouGet: [
      "Estructura completa de los 17 caracteres del VIN",
      "Significado de cada posición (WMI, VDS, VIS)",
      "Cómo el VIN identifica el año modelo (10º carácter)",
      "Diferencias entre VIN modernos y pre-1981",
      "Validación del VIN con dígito verificador (9º carácter)",
      "Lugares físicos donde está el VIN en el auto",
      "Cómo evitar VIN falsificados o clonados",
    ],
    whyItMatters: [
      "Conocer el VIN te permite verificar marca, modelo y año reales — el vendedor puede mentir",
      "Un VIN inconsistente entre tablero, marco de puerta y título indica clonación o robo",
      "Todos los reportes de historial, retiros y robo se basan en el VIN — sin él no hay verificación",
      "Las aseguradoras y DMV usan el VIN como identificador maestro — saber leerlo es esencial",
    ],
    trustNote:
      "El estándar VIN de 17 caracteres es definido por ISO 3779 y administrado por la NHTSA. Las posiciones específicas y su decodificación están documentadas en el código federal 49 CFR Part 565.",
    schemaName: "Guía: ¿Qué es un número VIN?",
  },

  "how-to-read-a-vin": {
    esSlug: "/guias/como-leer-un-vin",
    englishPath: "/guides/how-to-read-a-vin",
    icon: Hash,
    badge: "Guía · Cómo leer un VIN",
    h1: "Cómo leer un VIN — Decodificación carácter por carácter",
    metaTitle: "Cómo leer un VIN — Decodificar carácter a carácter",
    metaDescription:
      "Aprende a leer cualquier VIN de 17 caracteres carácter por carácter. WMI, VDS, año modelo, planta y número de serie — guía paso a paso en español.",
    keywords: [
      "cómo leer VIN",
      "decodificar VIN paso a paso",
      "WMI VDS VIS",
      "año modelo VIN",
      "carácter VIN español",
      "leer número VIN auto",
    ],
    intro:
      "Cada uno de los 17 caracteres del VIN tiene un significado preciso. Los primeros 3 (WMI — World Manufacturer Identifier) identifican al fabricante y el país; los siguientes 5 (VDS — Vehicle Descriptor Section) describen el modelo, motor y carrocería; el 9º es el dígito verificador; el 10º es el año modelo; el 11º es la planta; los últimos 6 (VIS — Vehicle Identifier Section) son el número de serie.",
    whatYouGet: [
      "Posición 1–3: código del fabricante (WMI) y país",
      "Posición 4–8: modelo, motor, carrocería (VDS)",
      "Posición 9: dígito verificador y cómo calcularlo",
      "Posición 10: tabla completa de años modelo (1980–presente)",
      "Posición 11: código de planta de ensamblaje",
      "Posición 12–17: número de serie único",
      "Ejemplos decodificados de Honda, Toyota, Ford, BMW",
    ],
    whyItMatters: [
      "Decodificar manualmente revela inconsistencias: año del título vs año del VIN",
      "El dígito verificador detecta VINs falsificados — si no cuadra, es sospechoso",
      "Saber leer el WMI distingue si un auto fue importado vs ensamblado en EE. UU.",
      "Útil al comprar autos de subasta donde no hay reporte previo — empiezas por el VIN",
    ],
    trustNote:
      "La estructura está definida en 49 CFR § 565 (NHTSA). El cálculo del dígito verificador usa pesos específicos por posición; los detalles oficiales están publicados por la SAE J853.",
    schemaName: "Guía: cómo leer un VIN",
  },

  "free-vin-check": {
    esSlug: "/guias/revision-vin-gratis",
    englishPath: "/guides/free-vin-check",
    icon: FileSearch,
    badge: "Guía · Revisión VIN gratis",
    h1: "Cómo hacer una revisión VIN gratis — Guía 2026",
    metaTitle: "Revisión VIN gratis — Guía 2026 español",
    metaDescription:
      "Guía completa para ejecutar una revisión VIN gratis en 2026. Qué incluye, qué no, las mejores herramientas oficiales (NICB, NHTSA, NMVTIS) y cuándo pagar.",
    keywords: [
      "revisión VIN gratis español",
      "VIN check gratuito",
      "verificación VIN sin pagar",
      "NICB VINCheck español",
      "decodificador VIN gratis",
      "consulta VIN gratis",
    ],
    intro:
      "Existen varias herramientas oficiales para revisar un VIN sin costo: NHTSA (retiros), NICB VINCheck (robo y salvage), CarCheckerVIN (decodificación completa y vista previa). Cada una tiene límites — esta guía explica qué obtienes con cada herramienta, qué te falta y cuándo realmente vale pagar un reporte completo.",
    whatYouGet: [
      "Lista de herramientas gratuitas oficiales por agencia",
      "Qué datos da cada herramienta y cuál es su límite",
      "Cómo combinar 2–3 herramientas para cobertura completa gratis",
      "Cuándo un reporte gratis basta y cuándo necesitas uno pagado",
      "Precauciones: sitios falsos que cobran por datos gratuitos",
      "Pasos exactos para verificar un VIN en NICB y NHTSA",
    ],
    whyItMatters: [
      "Antes de pagar, agotar las herramientas gratis te puede ahorrar $10–$45",
      "Los datos NICB y NHTSA son legalmente equivalentes a los de Carfax para esos rubros",
      "Una revisión gratis bien hecha resuelve el 80% de los casos antes de gastar",
      "Conocer las herramientas oficiales evita estafas de sitios que cobran datos gratuitos",
    ],
    trustNote:
      "NICB VINCheck (nicb.org/vincheck), NHTSA Recalls (nhtsa.gov/recalls) y NMVTIS (vehiclehistory.bja.ojp.gov) son fuentes federales gratuitas. Sus términos de uso permiten consultas personales sin restricciones.",
    schemaName: "Guía: revisión VIN gratis",
  },

  "vin-decoding-master-guide": {
    esSlug: "/guias/guia-maestra-decodificacion-vin",
    englishPath: "/guides/vin-decoding-master-guide",
    icon: BookOpen,
    badge: "Guía maestra · Decodificación VIN",
    h1: "Guía maestra de decodificación VIN",
    metaTitle: "Guía maestra decodificación VIN — Completa",
    metaDescription:
      "Manual completo para decodificar cualquier VIN: estructura ISO 3779, WMI por país, año modelo histórico, casos de uso para subasta, compraventa e importación.",
    keywords: [
      "guía decodificación VIN",
      "manual VIN español",
      "decodificar VIN completo",
      "estructura VIN ISO 3779",
      "VIN países WMI",
      "decodificador VIN auto",
    ],
    intro:
      "Esta es la referencia completa para decodificar cualquier VIN de auto: estándar internacional ISO 3779, las tablas oficiales NHTSA de códigos WMI por fabricante y país, la tabla histórica de años modelo (incluida la dualidad 1980 vs 2010 que confunde a muchos), y guías prácticas para casos de uso reales: compra usado, importación, subasta y autos clásicos pre-1981.",
    whatYouGet: [
      "Tabla completa WMI por país y fabricante",
      "Tabla histórica del año modelo (1980 a 2039)",
      "Algoritmo paso a paso para calcular el dígito verificador",
      "Diferencias entre VIN auto, moto, camión y RV",
      "Cómo decodificar VIN europeos vs estadounidenses",
      "Recursos oficiales: vPIC de NHTSA y bases de fabricante",
    ],
    whyItMatters: [
      "Saber decodificar manualmente te protege cuando el sitio en línea está caído",
      "Útil para verificar autos pre-1981 sin VIN estandarizado",
      "Esencial para importadores y compradores de subasta internacional",
      "Detecta VIN reasignados o falsificados al cotejar la lógica interna",
    ],
    trustNote:
      "Basado en ISO 3779:2009, NHTSA 49 CFR § 565, SAE J853 y la base de datos vPIC (vpic.nhtsa.dot.gov/decoder/), la fuente oficial federal de decodificación.",
    schemaName: "Guía maestra de decodificación VIN",
  },

  "car-history-report-guide": {
    esSlug: "/guias/guia-reporte-historial-auto",
    englishPath: "/guides/car-history-report-guide",
    icon: FileText,
    badge: "Guía · Reporte de historial",
    h1: "Guía del reporte de historial vehicular",
    metaTitle: "Guía reporte historial auto — Qué incluye",
    metaDescription:
      "Qué incluye un reporte de historial vehicular, cómo leerlo, qué señales de alerta buscar y cómo usarlo para negociar el precio. Guía paso a paso.",
    keywords: [
      "guía reporte historial auto",
      "qué incluye reporte VIN",
      "leer reporte vehicular",
      "señales alerta historial auto",
      "negociar precio auto usado",
      "reporte historial Carfax español",
    ],
    intro:
      "Un reporte de historial vehicular bien hecho contiene 10+ secciones: marcas de título, accidentes, lecturas del odómetro, dueños anteriores, retiros, robo, eventos de seguro, datos de subasta y más. Esta guía te explica qué buscar en cada sección, qué patrones son señales de alerta serias y cómo usar los hallazgos para bajar el precio.",
    whatYouGet: [
      "10+ secciones típicas de un reporte explicadas una a una",
      "Señales de alerta: salvage, accidentes graves, kilometraje inconsistente",
      "Patrones de fraude: lavado de título, odómetro rolled back",
      "Cómo cruzar el reporte con la inspección física",
      "Plantilla de checklist para revisar el reporte sistemáticamente",
      "Cuánto bajar el precio según el hallazgo (accidente: 10–15%, salvage: 30–50%)",
    ],
    whyItMatters: [
      "Sin saber leer el reporte, comprar uno es desperdiciar el dinero",
      "Los reportes mal interpretados llevan a malas compras o a perder buenas opciones",
      "Saber qué hallazgo justifica qué descuento te da poder de negociación",
      "Las aseguradoras también usan estos datos — alinearte con ellos protege tu cobertura",
    ],
    trustNote:
      "El estándar federal NMVTIS (administrado por el Department of Justice) define qué datos deben incluir los reportes. Los proveedores comerciales agregan capas (NICB, NHTSA, datos de subasta) además del piso NMVTIS.",
    schemaName: "Guía: reporte de historial vehicular",
  },

  "used-car-buying-complete-guide": {
    esSlug: "/guias/guia-completa-compra-auto-usado",
    englishPath: "/guides/used-car-buying-complete-guide",
    icon: BookOpen,
    badge: "Guía completa · Compra usado",
    h1: "Guía completa de compra de auto usado",
    metaTitle: "Guía completa compra auto usado — Pasos 2026",
    metaDescription:
      "Guía paso a paso para comprar un auto usado en EE. UU. en 2026: presupuesto, investigación, prueba, revisión VIN, inspección, financiamiento y cierre.",
    keywords: [
      "guía comprar auto usado",
      "consejos compra carro usado",
      "pasos comprar auto segunda mano",
      "qué revisar auto usado",
      "compra auto usado paso a paso",
      "tips auto usado 2026",
    ],
    intro:
      "Comprar un auto usado bien es un proceso de 7 pasos: definir presupuesto realista, investigar modelos confiables, encontrar y precalificar opciones, hacer prueba de manejo, revisar el VIN, llevar a un mecánico de confianza, y cerrar negociación + papeleo. Esta guía te lleva por cada paso con checklists, plantillas y los errores comunes a evitar.",
    whatYouGet: [
      "Paso 1: presupuesto real con regla 20/4/10",
      "Paso 2: investigar modelos por confiabilidad (Consumer Reports, JDPower)",
      "Paso 3: dónde buscar (CarMax, Carvana, particulares, Craigslist)",
      "Paso 4: prueba de manejo — qué probar en 20 minutos",
      "Paso 5: revisión VIN completa antes de pagar inspección",
      "Paso 6: PPI (Pre-Purchase Inspection) con mecánico ($100–$200)",
      "Paso 7: negociación y papeleo de título",
    ],
    whyItMatters: [
      "El comprador promedio pierde $1,500–$3,000 por saltarse pasos del proceso",
      "Saltar el PPI ahorra $150 pero puede costar $5,000 en reparaciones después",
      "Negociar sin datos del reporte VIN te deja como blanco fácil",
      "El papeleo de título mal hecho genera dolores de cabeza meses después",
    ],
    trustNote:
      "Las recomendaciones siguen las prácticas publicadas por Consumer Reports, Edmunds, AAA y la FTC (Federal Trade Commission) en su guía 'Buying a Used Car'.",
    schemaName: "Guía completa de compra de auto usado",
  },

  "used-car-financing-guide": {
    esSlug: "/guias/guia-financiamiento-auto-usado",
    englishPath: "/guides/used-car-financing-guide",
    icon: Wallet,
    badge: "Guía · Financiamiento usado",
    h1: "Guía de financiamiento de auto usado",
    metaTitle: "Guía financiamiento auto usado — APR & plazo",
    metaDescription:
      "Cómo financiar un auto usado en 2026: dónde precalificar (banco, credit union, dealer), qué APR esperar por crédito, plazos ideales y errores a evitar.",
    keywords: [
      "financiamiento auto usado",
      "préstamo auto usado",
      "APR auto usado",
      "credit union auto",
      "financiar carro usado",
      "tasas préstamo auto 2026",
    ],
    intro:
      "Financiar un auto usado mal te puede costar miles. Esta guía cubre cómo precalificarte antes de ir al dealer (banco, credit union, prestamistas en línea como LightStream), qué APR esperar según tu credit score, el plazo ideal por monto del préstamo, y los trucos del dealer que inflan el costo sin que te des cuenta.",
    whatYouGet: [
      "APR esperada por rango de FICO score (300–850)",
      "Comparación: banco vs credit union vs financiera del dealer",
      "Cómo precalificarte sin afectar el score (soft pull)",
      "Plazo ideal por monto: 36 mo para $15K, 48 para $25K, etc.",
      "Trucos del dealer: extended warranty, GAP, additive products",
      "Plantilla de hoja de cálculo para comparar ofertas reales",
    ],
    whyItMatters: [
      "Una APR de 3% peor cuesta $1,500 más en un préstamo de $25K a 60 meses",
      "Llegar al dealer con preaprobación te baja la APR ofrecida un 1–2%",
      "Los productos 'F&I' (finance & insurance) del dealer suelen ser inflados — sabes negociar",
      "Ir directo a credit union ahorra 1–2 puntos vs financiera del dealer",
    ],
    trustNote:
      "Datos de Experian State of Auto Finance Report (Q4 2025), NerdWallet y la CFPB (Consumer Financial Protection Bureau). Los credit unions consistentemente ofrecen 1–2 puntos por debajo del promedio de dealers.",
    schemaName: "Guía de financiamiento de auto usado",
  },

  "vehicle-fraud-prevention": {
    esSlug: "/guias/prevencion-fraude-vehicular",
    englishPath: "/guides/vehicle-fraud-prevention",
    icon: ShieldAlert,
    badge: "Guía · Prevención de fraude",
    h1: "Prevención de fraude vehicular — Guía 2026",
    metaTitle: "Prevenir fraude auto usado — Guía completa",
    metaDescription:
      "Cómo detectar y evitar los 8 fraudes más comunes en autos usados: lavado de título, odómetro rolled back, VIN clonado, salvage encubierto, curbstoning y más.",
    keywords: [
      "fraude auto usado",
      "estafa compra carro",
      "lavado de título",
      "odómetro fraud",
      "VIN clonado",
      "salvage encubierto",
    ],
    intro:
      "El fraude en venta de autos usados cuesta a los consumidores estadounidenses más de $10 mil millones al año. Los 8 fraudes más comunes son: lavado de título (title washing), reversión del odómetro, VIN clonado, salvage encubierto, curbstoning (dealer ilegal posando como particular), pago con cheque falso, autos robados puestos a la venta y warranty fraud. Esta guía te muestra cómo detectar cada uno.",
    whatYouGet: [
      "Las 8 tácticas de fraude más comunes y cómo identificarlas",
      "Lavado de título: cómo cruzar el historial estatal NMVTIS",
      "Odómetro rollback: detectar inconsistencias en lecturas históricas",
      "VIN clonado: verificar coincidencia entre tablero, puerta y título",
      "Salvage encubierto: pistas físicas de reparación de pérdida total",
      "Curbstoning: cómo identificar dealer ilegal posando de particular",
      "Reporte de fraude a NICB y autoridades estatales",
    ],
    whyItMatters: [
      "Una víctima promedio de title washing pierde $5,000–$15,000 y queda con un auto inseguro",
      "El odómetro rolled back cuesta a los consumidores >$1 mil millones/año (NHTSA)",
      "Comprar un VIN clonado puede llevar al confiscamiento del auto sin reembolso",
      "Conocer las tácticas te da el filtro para descartar opciones sospechosas antes de visitar",
    ],
    trustNote:
      "Estadísticas de NICB, NHTSA Office of Odometer Fraud Investigation y la FTC. Las cifras de pérdida anual provienen del Bureau of Justice Statistics y reportes de aseguradoras.",
    schemaName: "Guía de prevención de fraude vehicular",
  },
};

export const TOOL_HOOKS_ES: Record<string, SpecialtyHook> = {
  "used-car-checklist": {
    esSlug: "/checklist-inspeccion-auto-usado",
    englishPath: "/used-car-inspection-checklist",
    icon: ListChecks,
    badge: "Checklist · 60+ puntos de inspección",
    h1: "Checklist de inspección de auto usado — 60+ puntos",
    metaTitle: "Checklist inspección auto usado — 60+ puntos",
    metaDescription:
      "Checklist gratis de 60+ puntos para inspeccionar un auto usado antes de comprar. Carrocería, motor, transmisión, frenos, interior, computadora y prueba de manejo.",
    keywords: [
      "checklist inspección auto",
      "lista revisar auto usado",
      "qué revisar antes comprar carro",
      "pre purchase inspection español",
      "puntos inspección auto",
      "guía inspección visual auto",
    ],
    intro:
      "Antes de pagar por una inspección profesional ($100–$200) o de visitar al vendedor con dudas, este checklist de 60+ puntos cubre todo lo que tú mismo puedes verificar visualmente y con una prueba de manejo de 20 minutos. Es la misma lista que usan los inspectores certificados — adaptada para que no necesites herramientas especiales.",
    whatYouGet: [
      "12 puntos de carrocería: paneles, gaps, pintura, óxido",
      "10 puntos de motor: fugas, ruidos, manguera, correa",
      "8 puntos de transmisión: cambios suaves, fluido, embrague",
      "6 puntos de frenos: pedal, pastillas, discos, líquido",
      "10 puntos de interior: tapicería, controles, electrónica",
      "8 puntos de computadora (OBD-II) y luces de alerta",
      "8 puntos de prueba de manejo (carretera, ciudad, curvas)",
      "Plantilla imprimible para llevar al test drive",
    ],
    whyItMatters: [
      "Una inspección visual sistemática descarta 70% de los autos problema en 15 minutos",
      "Los detalles cosméticos (gaps, pintura) revelan accidentes ocultos no reportados",
      "Un escáner OBD-II ($20 en Amazon) lee códigos que el vendedor no puede borrar fácilmente",
      "La prueba de manejo bien hecha detecta problemas de transmisión y suspensión invisibles parados",
    ],
    trustNote:
      "Basado en los protocolos de inspección de Consumer Reports, NACE Automotive Service Excellence (ASE) y la guía de pre-purchase inspection de la AAA. No reemplaza una inspección profesional, pero filtra rápido.",
    schemaName: "Checklist de inspección de auto usado",
  },

  "compare-cars": {
    esSlug: "/comparar-autos",
    englishPath: "/compare-cars",
    icon: GitCompare,
    badge: "Herramienta · Comparar autos",
    h1: "Herramienta para comparar autos lado a lado",
    metaTitle: "Comparar autos lado a lado — Gratis",
    metaDescription:
      "Compara cualquier par de autos lado a lado: specs, MPG, MSRP, valor de mercado, depreciación esperada, retiros y confiabilidad. Gratis al instante.",
    keywords: [
      "comparar autos",
      "comparar carros lado a lado",
      "comparación auto vs auto",
      "comparar especificaciones autos",
      "diferencia entre dos autos",
      "comparar precio auto",
    ],
    intro:
      "La herramienta para comparar autos toma 2 (o más) modelos y los pone lado a lado en una tabla con todas las cifras que importan: precio MSRP, valor de mercado actual, MPG ciudad/carretera, depreciación a 5 años, dimensiones, capacidad de carga, retiros activos y rating de confiabilidad. Útil para reducir la lista corta antes de visitar dealers.",
    whatYouGet: [
      "Tabla lado a lado de specs (motor, transmisión, drivetrain)",
      "MSRP y valor de mercado actual (KBB/Edmunds)",
      "MPG ciudad/carretera (EPA oficial)",
      "Depreciación esperada a 3 y 5 años",
      "Retiros activos NHTSA por modelo",
      "Rating de confiabilidad (Consumer Reports, JDPower)",
      "Costo total de propiedad estimado a 5 años",
    ],
    whyItMatters: [
      "Comparar 3–4 modelos en tabla revela diferencias que tabla individual oculta",
      "El TCO (depreciación + MPG + mantenimiento) suele invertir el orden de 'mejor precio'",
      "Útil antes de visitar el dealer — no estás expuesto a la presión de venta",
      "Refuerza tu decisión con datos en vez de impresiones de marketing",
    ],
    trustNote:
      "Datos consolidados de Edmunds, Kelley Blue Book, EPA fueleconomy.gov, NHTSA recalls, Consumer Reports y JDPower Vehicle Dependability Study.",
    schemaName: "Herramienta para comparar autos",
  },
};
