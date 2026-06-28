/**
 * Wave 7 part B — French guides + tools.
 *
 * 7 guides under /guides/* + /used-car-inspection-checklist + /compare-cars.
 * Reuses the SpecialtyToolPage renderer from Wave 5. Each entry's intent
 * is informational ("qué es un VIN?", "comment leer un VIN") or
 * commercial-informational ("guide de compra de voiture d’occasion").
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
    badge: "Guía · Qué es un VIN?",
    h1: "Qu’est-ce qu’un numéro VIN ? — Guide complet pour acheteurs",
    metaTitle: "Qu’est-ce qu’un numéro VIN ? — Guide complet français",
    metaDescription:
      "Guide complet de qué es un VIN, comment se compone, dónde trouverlo et qué revela. Aprende a leer et vérifier le VIN de n’importe quel auto antes de acheter.",
    keywords: [
      "qué es un VIN",
      "numéro VIN français",
      "VIN auto qué significa",
      "para qué sirve le VIN",
      "décoder VIN",
      "VIN 17 caracteres",
    ],
    intro:
      "El VIN (Vehicle Identification Number — Número de Identificación Vehicular) es un code unique de 17 caracteres asignado a cada véhicule desde 1981. Cada carácter codifica información específica: país de origen, fabricante, tipo de véhicule, motor, année modelo, planta de ensamblaje et numéro de producción. Es como la huella digital du auto.",
    whatYouGet: [
      "Estructura complète de les 17 caracteres du VIN",
      "Significado de cada posición (WMI, VDS, VIS)",
      "Comment le VIN identifica le année modelo (10º carácter)",
      "Diferencias entre VIN modernos et pre-1981",
      "Validación du VIN avec dígito vérificateur (9º carácter)",
      "Lugares físicos donde está le VIN en le auto",
      "Comment evitar VIN falsificadeux ou clonadeux",
    ],
    whyItMatters: [
      "Conocer le VIN te permite vérifier marque, modelo et année réeles — le vendeur puede mentir",
      "Un VIN inconsistente entre tablero, marco de puerta et titre indica clonación ou vol",
      "Todeux les rapports de historique, rappels et vol se basan en le VIN — sans él no hay vérification",
      "Las aseguradoras et DMV usan le VIN como identificador maestro — saber leerlo es esencial",
    ],
    trustNote:
      "El estándar VIN de 17 caracteres es definido par ISO 3779 et administrado par la NHTSA. Las posiciones específicas et su décodeción están documentadas en le code federal 49 CFR Part 565.",
    schemaName: "Guía: Qu’est-ce qu’un numéro VIN ?",
  },

  "how-to-read-a-vin": {
    esSlug: "/guias/como-leer-un-vin",
    englishPath: "/guides/how-to-read-a-vin",
    icon: Hash,
    badge: "Guía · Comment leer un VIN",
    h1: "Comment leer un VIN — Décodeción carácter par carácter",
    metaTitle: "Comment leer un VIN — Décoder carácter a carácter",
    metaDescription:
      "Aprende a leer n’importe quel VIN de 17 caracteres carácter par carácter. WMI, VDS, année modelo, planta et numéro de serie — guide paso a paso en français.",
    keywords: [
      "comment leer VIN",
      "décoder VIN paso a paso",
      "WMI VDS VIS",
      "année modelo VIN",
      "carácter VIN français",
      "leer numéro VIN auto",
    ],
    intro:
      "Cada uno de les 17 caracteres du VIN tiene un significado preciso. Los premieros 3 (WMI — World Manufacturer Identifier) identifican al fabricante et le país; les siguientes 5 (VDS — Vehicle Descriptor Section) describen le modelo, motor et carrocería; le 9º es le dígito vérificateur; le 10º es le année modelo; le 11º es la planta; les derniers 6 (VIS — Vehicle Identifier Section) son le numéro de serie.",
    whatYouGet: [
      "Posición 1–3: code du fabricante (WMI) et país",
      "Posición 4–8: modelo, motor, carrocería (VDS)",
      "Posición 9: dígito vérificateur et comment calcularlo",
      "Posición 10: tabla complète de années modelo (1980–presente)",
      "Posición 11: code de planta de ensamblaje",
      "Posición 12–17: numéro de serie unique",
      "Ejemplos décodedeux de Honda, Toyota, Ford, BMW",
    ],
    whyItMatters: [
      "Décoder manualmente revela inconsistencias: année du titre vs année du VIN",
      "El dígito vérificateur detecta VINs falsificadeux — si no cuadra, es sospechoso",
      "Saber leer le WMI distingue si un auto fue importado vs ensamblado en EE. UU.",
      "Útil al acheter autos de enchère donde no hay rapport previo — empiezas par le VIN",
    ],
    trustNote:
      "La estructura está definida en 49 CFR § 565 (NHTSA). Le cálculo du dígito vérificateur utilise pesos específicos par posición; les detalles oficiales están publicadeux par la SAE J853.",
    schemaName: "Guía: comment leer un VIN",
  },

  "free-vin-check": {
    esSlug: "/guias/revision-vin-gratuit",
    englishPath: "/guides/free-vin-check",
    icon: FileSearch,
    badge: "Guía · Vérification VIN gratuit",
    h1: "Comment hacer una vérification VIN gratuit — Guía 2026",
    metaTitle: "Vérification VIN gratuit — Guía 2026 français",
    metaDescription:
      "Guide complet pour ejecutar una vérification VIN gratuit en 2026. Qué incluye, qué no, les mejores outils oficiales (NICB, NHTSA, NMVTIS) et cuándo pagar.",
    keywords: [
      "vérification VIN gratuit français",
      "VIN check gratuito",
      "vérification VIN sans pagar",
      "NICB VINCheck français",
      "décodeur VIN gratuit",
      "consultationtiontiontiontiontion VIN gratuit",
    ],
    intro:
      "Existen varias outils oficiales pour revisar un VIN sans coût: NHTSA (rappels), NICB VINCheck (vol et salvage), CarCheckerVIN (décodeción complète et vista previa). Cada una tiene límites — esta guide explica qué obtienes avec cada outil, qué te falta et cuándo réelmente vale pagar un rapport complet.",
    whatYouGet: [
      "Lista de outils gratuites oficiales par agencia",
      "Qué données da cada outil et cuál es su límite",
      "Comment combiner 2–3 outils pour cobertura complète gratuit",
      "Cuándo un rapport gratuit basta et cuándo necesitas uno pagado",
      "Precauciones: sitios falsos que cobran par données gratuitos",
      "Pasos exactos pour vérifier un VIN en NICB et NHTSA",
    ],
    whyItMatters: [
      "Antes de pagar, agotar les outils gratuit te puede ahorrar $10–$45",
      "Los données NICB et NHTSA son legalmente equivalentes a les de Carfax pour esos rubros",
      "Una vérification gratuit bien hecha resuelve le 80% de les casos antes de gastar",
      "Conocer les outils oficiales evita estafas de sitios que cobran données gratuitos",
    ],
    trustNote:
      "NICB VINCheck (nicb.org/vincheck), NHTSA Recalls (nhtsa.gov/rappels) et NMVTIS (vehiclehistory.bja.ojp.gov) son fuentes federales gratuites. Sus conditions de uso permiten consultationtiontiontiontiontions personales sans restricciones.",
    schemaName: "Guía: vérification VIN gratuit",
  },

  "vin-decoding-master-guide": {
    esSlug: "/guias/guia-maestra-décodecion-vin",
    englishPath: "/guides/vin-decoding-master-guide",
    icon: BookOpen,
    badge: "Guía maestra · Décodeción VIN",
    h1: "Guía maestra de décodeción VIN",
    metaTitle: "Guía maestra décodeción VIN — Completa",
    metaDescription:
      "Manual complet pour décoder n’importe quel VIN: estructura ISO 3779, WMI par país, année modelo histórico, casos de uso pour enchère, compravente e import.",
    keywords: [
      "guide décodeción VIN",
      "manual VIN français",
      "décoder VIN complet",
      "estructura VIN ISO 3779",
      "VIN países WMI",
      "décodeur VIN auto",
    ],
    intro:
      "Esta es la referencia complète pour décoder n’importe quel VIN de auto: estándar internacional ISO 3779, les tablas oficiales NHTSA de codes WMI par fabricante et país, la tabla histórica de années modelo (incluida la dualidad 1980 vs 2010 que confunde a muchos), et guides prácticas pour casos de uso réeles: compra usado, import, enchère et autos classiques pre-1981.",
    whatYouGet: [
      "Tabla complète WMI par país et fabricante",
      "Tabla histórica du année modelo (1980 a 2039)",
      "Algoritmo paso a paso pour calcular le dígito vérificateur",
      "Diferencias entre VIN auto, moto, camion et RV",
      "Comment décoder VIN europeos vs étatunidenses",
      "Recursos oficiales: vPIC de NHTSA et bases de fabricante",
    ],
    whyItMatters: [
      "Saber décoder manualmente te protege cuando le sitio en línea está caído",
      "Útil pour vérifier autos pre-1981 sans VIN estandarizado",
      "Esencial pour importadores et acheteurs de enchère internacional",
      "Detecta VIN reasignadeux ou falsificadeux al cotejar la lógica interna",
    ],
    trustNote:
      "Basado en ISO 3779:2009, NHTSA 49 CFR § 565, SAE J853 et la base de données vPIC (vpic.nhtsa.dot.gov/decoder/), la fuente oficial federal de décodeción.",
    schemaName: "Guía maestra de décodeción VIN",
  },

  "car-history-report-guide": {
    esSlug: "/guias/guia-rapport-historique-auto",
    englishPath: "/guides/car-history-report-guide",
    icon: FileText,
    badge: "Guía · Rapport de historique",
    h1: "Guía du rapport de historique de véhicule",
    metaTitle: "Guía rapport historique auto — Qué incluye",
    metaDescription:
      "Qué incluye un rapport de historique de véhicule, comment leerlo, qué señales de alerta buscar et comment usarlo pour negociar le precio. Guía paso a paso.",
    keywords: [
      "guide rapport historique auto",
      "qué incluye rapport VIN",
      "leer rapport du véhicule",
      "señales alerta historique auto",
      "negociar precio voiture d’occasion",
      "rapport historique Carfax français",
    ],
    intro:
      "Un rapport de historique de véhicule bien hecho contiene 10+ secciones: marques de titre, accidents, lecturas du odomètre, propriétaires anteriores, rappels, vol, eventos de assurance, données de enchère et plus. Esta guide te explica qué buscar en cada sección, qué patrones son señales de alerta serias et comment usar les hallazgos pour bajar le precio.",
    whatYouGet: [
      "10+ secciones típicas de un rapport explicadas una a una",
      "Señales de alerta: salvage, accidents graves, kilométrage inconsistente",
      "Patrones de fraude: lavado de titre, odomètre rolled back",
      "Comment cruzar le rapport avec la inspección física",
      "Plantilla de checklist pour revisar le rapport sistemáticamente",
      "Cuánto bajar le precio según le hallazgo (accident: 10–15%, salvage: 30–50%)",
    ],
    whyItMatters: [
      "Sin saber leer le rapport, acheter uno es desperdiciar le dinero",
      "Los rapports mal interpretadeux llevan a malas compras ou a perder buenas opciones",
      "Saber qué hallazgo justifica qué descuento te da poder de negociación",
      "Las aseguradoras también usan estos données — alinearte avec ellos protege ta cobertura",
    ],
    trustNote:
      "El estándar federal NMVTIS (administrado par le Department of Justice) define qué données deben incluir les rapports. Los proveedores comerciales agregan capas (NICB, NHTSA, données de enchère) adeplus du piso NMVTIS.",
    schemaName: "Guía: rapport de historique de véhicule",
  },

  "used-car-buying-complete-guide": {
    esSlug: "/guias/guia-complète-compra-auto-usado",
    englishPath: "/guides/used-car-buying-complete-guide",
    icon: BookOpen,
    badge: "Guide complet · Compra usado",
    h1: "Guide complet de compra de voiture d’occasion",
    metaTitle: "Guide complet compra voiture d’occasion — Pasos 2026",
    metaDescription:
      "Guide pas à pas pour acheter une voiture d’occasion en EE. UU. en 2026: presupuesto, recherche, prueba, vérification VIN, inspección, financement et cierre.",
    keywords: [
      "guide acheter voiture d’occasion",
      "consejos compra carro usado",
      "pasos acheter auto segunda mano",
      "qué revisar voiture d’occasion",
      "compra voiture d’occasion paso a paso",
      "tips voiture d’occasion 2026",
    ],
    intro:
      "Comprar un voiture d’occasion bien es un proceso de 7 pasos: definir presupuesto réelista, investigar modelos fiables, trouver et precalificar opciones, hacer prueba de manejo, revisar le VIN, llevar a un mecánico de confiance, et cerrar negociación + papeleo. Esta guide te lleva par cada paso avec checklists, plantillas et les errores comunes a evitar.",
    whatYouGet: [
      "Paso 1: presupuesto réel avec regla 20/4/10",
      "Paso 2: investigar modelos par confiabilidad (Consumer Reports, JDPower)",
      "Paso 3: dónde buscar (CarMax, Carvana, particulares, Craigslist)",
      "Paso 4: prueba de manejo — qué probar en 20 minutes",
      "Paso 5: vérification VIN complète antes de pagar inspección",
      "Paso 6: PPI (Pre-Purchase Inspection) avec mecánico ($100–$200)",
      "Paso 7: negociación et papeleo de titre",
    ],
    whyItMatters: [
      "El acheteur promedio pierde $1,500–$3,000 par saltarse pasos du proceso",
      "Saltar le PPI ahorra $150 pero puede costar $5,000 en réparations después",
      "Negociar sans données du rapport VIN te deja como blanco fácil",
      "El papeleo de titre mal hecho genera dolores de cabeza moises después",
    ],
    trustNote:
      "Las recomendaciones siguen les prácticas publicadas par Consumer Reports, Edmunds, AAA et la FTC (Federal Trade Commission) en su guide 'Buying a Used Car'.",
    schemaName: "Guide complet de compra de voiture d’occasion",
  },

  "used-car-financing-guide": {
    esSlug: "/guias/guia-financement-auto-usado",
    englishPath: "/guides/used-car-financing-guide",
    icon: Wallet,
    badge: "Guía · Financiamiento usado",
    h1: "Guía de financement de voiture d’occasion",
    metaTitle: "Guía financement voiture d’occasion — APR & plazo",
    metaDescription:
      "Comment financiar un voiture d’occasion en 2026: dónde precalificar (banco, credit union, dealer), qué APR esperar par crédito, plazos ideales et errores a evitar.",
    keywords: [
      "financement voiture d’occasion",
      "prêt voiture d’occasion",
      "APR voiture d’occasion",
      "credit union auto",
      "financiar carro usado",
      "tasas prêt auto 2026",
    ],
    intro:
      "Financiar un voiture d’occasion mal te puede costar miles. Esta guide cubre comment precalificarte antes de ir al dealer (banco, credit union, prestamistas en línea como LightStream), qué APR esperar según ta credit score, le plazo ideal par monto du prêt, et les trucos du dealer que inflan le coût sans que te des cuenta.",
    whatYouGet: [
      "APR esperada par rango de FICO score (300–850)",
      "Comparaison: banco vs credit union vs financiera du dealer",
      "Comment precalificarte sans afectar le score (soft pull)",
      "Plazo ideal par monto: 36 mo pour $15K, 48 pour $25K, etc.",
      "Trucos du dealer: extended warranty, GAP, additive products",
      "Plantilla de hoja de cálculo pour comparar ofertas réeles",
    ],
    whyItMatters: [
      "Una APR de 3% peor cuesta $1,500 plus en un prêt de $25K a 60 moises",
      "Llegar al dealer avec preaprobación te baja la APR ofrecida un 1–2%",
      "Los productos 'F&I' (finance & insurance) du dealer suelen ser infladeux — sabes negociar",
      "Ir directo a credit union ahorra 1–2 puntos vs financiera du dealer",
    ],
    trustNote:
      "Datos de Experian State of Auto Finance Report (Q4 2025), NerdWallet et la CFPB (Consumer Financial Protection Bureau). Los credit unions consistentemente ofrecen 1–2 puntos par debajo du promedio de dealers.",
    schemaName: "Guía de financement de voiture d’occasion",
  },

  "vehicle-fraud-prevention": {
    esSlug: "/guias/prevencion-fraude-du véhicule",
    englishPath: "/guides/vehicle-fraud-prevention",
    icon: ShieldAlert,
    badge: "Guía · Prevención de fraude",
    h1: "Prevención de fraude du véhicule — Guía 2026",
    metaTitle: "Prevenir fraude voiture d’occasion — Guide complet",
    metaDescription:
      "Comment detectar et evitar les 8 fraudes plus comunes en voitures d’occasion: lavado de titre, odomètre rolled back, VIN clonado, salvage encubierto, curbstoning et plus.",
    keywords: [
      "fraude voiture d’occasion",
      "estafa compra carro",
      "lavado de titre",
      "odomètre fraud",
      "VIN clonado",
      "salvage encubierto",
    ],
    intro:
      "El fraude en vente de voitures d’occasion cuesta a les consumidores étatunidenses plus de $10 mil millones al année. Los 8 fraudes plus comunes son: lavado de titre (title washing), reversión du odomètre, VIN clonado, salvage encubierto, curbstoning (dealer ilegal posando como particular), pago avec cheque falso, autos volés puestos a la vente et warranty fraud. Esta guide te muestra comment detectar cada uno.",
    whatYouGet: [
      "Las 8 tácticas de fraude plus comunes et comment identificarlas",
      "Lavado de titre: comment cruzar le historique estatal NMVTIS",
      "Odómetro rollback: detectar inconsistencias en lecturas históricas",
      "VIN clonado: vérifier coincidencia entre tablero, puerta et titre",
      "Salvage encubierto: pistas físicas de réparation de perte totale",
      "Curbstoning: comment identificar dealer ilegal posando de particular",
      "Rapport de fraude a NICB et autoridades estatales",
    ],
    whyItMatters: [
      "Una víctima promedio de title washing pierde $5,000–$15,000 et queda avec un auto inassurance",
      "El odomètre rolled back cuesta a les consumidores >$1 mil millones/année (NHTSA)",
      "Comprar un VIN clonado puede llevar al confiscamiento du auto sans reembolso",
      "Conocer les tácticas te da le filtro pour descartar opciones sospechosas antes de visitar",
    ],
    trustNote:
      "Estadísticas de NICB, NHTSA Office of Odometer Fraud Investigation et la FTC. Las cifras de perte anual provienen du Bureau of Justice Statistics et rapports de aseguradoras.",
    schemaName: "Guía de prevención de fraude du véhicule",
  },
};

export const TOOL_HOOKS_ES: Record<string, SpecialtyHook> = {
  "used-car-checklist": {
    esSlug: "/checklist-inspeccion-auto-usado",
    englishPath: "/used-car-inspection-checklist",
    icon: ListChecks,
    badge: "Checklist · 60+ puntos de inspección",
    h1: "Checklist de inspección de voiture d’occasion — 60+ puntos",
    metaTitle: "Checklist inspección voiture d’occasion — 60+ puntos",
    metaDescription:
      "Checklist gratuit de 60+ puntos pour inspeccionar un voiture d’occasion antes de acheter. Carrocería, motor, transmisión, frenos, interior, computadora et prueba de manejo.",
    keywords: [
      "checklist inspección auto",
      "lista revisar voiture d’occasion",
      "qué revisar antes acheter carro",
      "pre purchase inspection français",
      "puntos inspección auto",
      "guide inspección visual auto",
    ],
    intro:
      "Antes de pagar par una inspección profesional ($100–$200) ou de visitar al vendeur avec dudas, este checklist de 60+ puntos cubre todo le que tú même puedes vérifier visualmente et avec una prueba de manejo de 20 minutes. Es la même lista que usan les inspectores certificadeux — adaptada pour que no necesites outils especiales.",
    whatYouGet: [
      "12 puntos de carrocería: paneles, gaps, peinture, óxido",
      "10 puntos de motor: fugas, ruideux, manguera, correa",
      "8 puntos de transmisión: cambios suaves, fluido, embrague",
      "6 puntos de frenos: pedal, pastillas, discos, líquido",
      "10 puntos de interior: tapicería, controles, electrónica",
      "8 puntos de computadora (OBD-II) et luces de alerta",
      "8 puntos de prueba de manejo (carretera, ciudad, curvas)",
      "Plantilla imprimible pour llevar al test drive",
    ],
    whyItMatters: [
      "Una inspección visual sistemática descarta 70% de les autos problema en 15 minutes",
      "Los detalles cosméticos (gaps, peinture) revelan accidents ocultos no reportadeux",
      "Un escáner OBD-II ($20 en Amazon) lee codes que le vendeur no puede borrar fácilmente",
      "La prueba de manejo bien hecha detecta problemas de transmisión et sespensión invisibles paradeux",
    ],
    trustNote:
      "Basado en les protocolos de inspección de Consumer Reports, NACE Automotive Service Excellence (ASE) et la guide de pre-purchase inspection de la AAA. No reemplaza una inspección profesional, pero filtra rapide.",
    schemaName: "Checklist de inspección de voiture d’occasion",
  },

  "compare-cars": {
    esSlug: "/comparar-autos",
    englishPath: "/compare-cars",
    icon: GitCompare,
    badge: "Herramienta · Comparar autos",
    h1: "Herramienta pour comparar autos côte à côte",
    metaTitle: "Comparar autos côte à côte — Gratuit",
    metaDescription:
      "Compara n’importe quel par de autos côte à côte: specs, MPG, MSRP, valeur de marché, dépréciation esperada, rappels et confiabilidad. Gratuit instantanément.",
    keywords: [
      "comparar autos",
      "comparar carros côte à côte",
      "comparaison auto vs auto",
      "comparar especificaciones autos",
      "diferencia entre deux autos",
      "comparar precio auto",
    ],
    intro:
      "La outil pour comparar autos toma 2 (o plus) modelos et les pone côte à côte en una tabla avec todas les cifras que importan: precio MSRP, valeur de marché actual, MPG ciudad/carretera, dépréciation a 5 années, dimensiones, capacidad de carga, rappels activos et rating de confiabilidad. Útil pour reducir la lista corta antes de visitar dealers.",
    whatYouGet: [
      "Tabla côte à côte de specs (motor, transmisión, drivetrain)",
      "MSRP et valeur de marché actual (KBB/Edmunds)",
      "MPG ciudad/carretera (EPA oficial)",
      "Depreciación esperada a 3 et 5 années",
      "Retiros activos NHTSA par modelo",
      "Rating de confiabilidad (Consumer Reports, JDPower)",
      "Costo total de propiedad estimado a 5 années",
    ],
    whyItMatters: [
      "Comparar 3–4 modelos en tabla revela diferencias que tabla individual oculta",
      "El TCO (dépréciation + MPG + entretien) suele invertir le orden de 'mejor precio'",
      "Útil antes de visitar le dealer — no estás expuesto a la presión de vente",
      "Refuerza ta decisión avec données en vez de impresiones de marketing",
    ],
    trustNote:
      "Datos consolidadeux de Edmunds, Kelley Blue Book, EPA fueleconomy.gov, NHTSA rappels, Consumer Reports et JDPower Vehicle Dependability Study.",
    schemaName: "Herramienta pour comparar autos",
  },
};
