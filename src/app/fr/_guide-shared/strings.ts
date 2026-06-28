/**
 * Wave 7 part B — French guides + tools.
 *
 * 7 guides under /guides/* + /used-car-inspection-checklist + /compare-cars.
 * Reuses the SpecialtyToolPage renderer from Wave 5. Each entry's intent
 * is infaçoptional ("que es un VIN?", "comment lire un VIN") or
 * commercial-infaçoptional ("guide de compra de voiture d’occasion").
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
    badge: "Guide · Que es un VIN?",
    h1: "Qu’est-ce qu’un numéro VIN ? — Guide complet pour acheteurs",
    metaTitle: "Qu’est-ce qu’un numéro VIN ? — Guide complet français",
    metaDescription:
      "Guide complet de que es un VIN, comment se compone, où trouverlo et que revela. Apprends a lire et vérifier le VIN de n’importe quel auto avant de acheter.",
    keywords: [
      "que es un VIN",
      "numéro VIN français",
      "VIN auto que significa",
      "para que sirve le VIN",
      "décoder VIN",
      "VIN 17 caractères",
    ],
    intro:
      "El VIN (Vehicle Identification Number — Numéro de Identification Vehicular) es un code unique de 17 caractères asignado a chaque véhicule desde 1981. Chaque caractère codifica infaçoption spécifique: pays de origen, fabricante, tipo de véhicule, moteur, année modèle, planta de ensamblaje et numéro de production. Es como la huella digital du auto.",
    whatYouGet: [
      "Estructura complète de les 17 caractères du VIN",
      "Significado de chaque position (WMI, VDS, VIS)",
      "Comment le VIN identifica le année modèle (10º caractère)",
      "Différences entre VIN modernons et pre-1981",
      "Validation du VIN avec chiffre vérificateur (9º caractère)",
      "Lieues físicos où est le VIN en le auto",
      "Comment evitar VIN falsificadeux ou clonadeux",
    ],
    whyItMatters: [
      "Cononcer le VIN te permite vérifier marque, modèle et année réels — le vendeur peut mentir",
      "Un VIN inconsistente entre tableau de bord, marco de porte et titre indica clonage ou vol",
      "Todeux les rapports de historique, rappels et vol se basan en le VIN — sans él non il y a vérification",
      "Les assureurs et DMV usan le VIN como identificador maestro — saber leerlo es esencial",
    ],
    trustNote:
      "El estndar VIN de 17 caractères es défini par ISO 3779 et administrado par la NHTSA. Les posiciones spécifiques et su décodage estn documentadas en le code federal 49 CFR Part 565.",
    schemaName: "Guide: Qu’est-ce qu’un numéro VIN ?",
  },

  "how-to-read-a-vin": {
    esSlug: "/guias/como-leer-un-vin",
    englishPath: "/guides/how-to-read-a-vin",
    icon: Hash,
    badge: "Guide · Comment lire un VIN",
    h1: "Comment lire un VIN — Décodage caractère par caractère",
    metaTitle: "Comment lire un VIN — Décoder caractère a caractère",
    metaDescription:
      "Apprends a lire n’importe quel VIN de 17 caractères caractère par caractère. WMI, VDS, année modèle, planta et numéro de êtreie — guide étape a étape en français.",
    keywords: [
      "comment lire VIN",
      "décoder VIN étape a étape",
      "WMI VDS VIS",
      "année modèle VIN",
      "caractère VIN français",
      "leer numéro VIN auto",
    ],
    intro:
      "Chaque unon de les 17 caractères du VIN a un significado preciso. Les premieros 3 (WMI — World Manufacturer Identifier) identifican al fabricante et le pays; les siguientes 5 (VDS — Vehicle Descriptor Section) describen le modèle, moteur et carrosêtreie; le 9º es le chiffre vérificateur; le 10º es le année modèle; le 11º es la planta; les derniers 6 (VIS — Vehicle Identifier Section) son le numéro de êtreie.",
    whatYouGet: [
      "Position 1–3: code du fabricante (WMI) et pays",
      "Position 4–8: modèle, moteur, carrosêtreie (VDS)",
      "Position 9: chiffre vérificateur et comment calcularlo",
      "Position 10: tabla complète de années modèle (1980–presente)",
      "Position 11: code de planta de ensamblaje",
      "Position 12–17: numéro de êtreie unique",
      "Ejemplos décodedeux de Honda, Toyota, Ford, BMW",
    ],
    whyItMatters: [
      "Décoder manualmente revela incohérences: année du titre vs année du VIN",
      "El chiffre vérificateur detecta VINs falsificadeux — si non cuadra, es sospechoso",
      "Saber lire le WMI distingue si un auto a été importado vs ensambcôté en EE. UU.",
      "Útil al acheter voitures de enchère où non il y a rapport previo — empiezas par le VIN",
    ],
    trustNote:
      "La estructura est definida en 49 CFR § 565 (NHTSA). Le cálculo du chiffre vérificateur utilise pesos spécifiques par position; les detalles oficiales estn publicadeux par la SAE J853.",
    schemaName: "Guide: comment lire un VIN",
  },

  "free-vin-check": {
    esSlug: "/guias/revision-vin-gratuit",
    englishPath: "/guides/free-vin-check",
    icon: FileSearch,
    badge: "Guide · Vérification VIN gratuit",
    h1: "Comment hacer una vérification VIN gratuit — Guide 2026",
    metaTitle: "Vérification VIN gratuit — Guide 2026 français",
    metaDescription:
      "Guide complet pour ejecutar una vérification VIN gratuit en 2026. Que inclut, que non, les meilleures outils oficiales (NICB, NHTSA, NMVTIS) et quand payer.",
    keywords: [
      "vérification VIN gratuit français",
      "VIN check gratuito",
      "vérification VIN sans payer",
      "NICB VINCheck français",
      "décodeur VIN gratuit",
      "consultatioptiontioptiontioption VIN gratuit",
    ],
    intro:
      "Existen varias outils oficiales pour revisar un VIN sans coût: NHTSA (rappels), NICB VINCheck (vol et salvage), CarCheckerVIN (décodage complète et vista previa). Chaque una a limites — esta guide explica que obas avec chaque outil, que te fhaute et quand réellement vale payer un rapport complet.",
    whatYouGet: [
      "Lista de outils gratuites oficiales par agence",
      "Que données da chaque outil et quel es su limite",
      "Comment combiner 2–3 outils pour couverture complète gratuit",
      "Quand un rapport gratuit basta et quand necesitas unon payedo",
      "Precauciones: sitios falsos que cobran par données gratuitos",
      "Étapes exactos pour vérifier un VIN en NICB et NHTSA",
    ],
    whyItMatters: [
      "Avant de payer, agotar les outils gratuit te peut ahorrar $10–$45",
      "Les données NICB et NHTSA son légalement équivalents a les de Carfax pour esos rubros",
      "Una vérification gratuit bien hecha resuelve le 80% de les cass avant de gastar",
      "Cononcer les outils oficiales evita estafas de sitios que cobran données gratuitos",
    ],
    trustNote:
      "NICB VINCheck (nicb.org/vincheck), NHTSA Recalls (nhtsa.gov/rappels) et NMVTIS (vehiclehistory.bja.ojp.gov) son a éventes federales gratuites. Sus conditions de uso permiten consultatioptiontioptiontioptions personneles sans restricciones.",
    schemaName: "Guide: vérification VIN gratuit",
  },

  "vin-decoding-master-guide": {
    esSlug: "/guias/guia-maestra-décodecion-vin",
    englishPath: "/guides/vin-decoding-master-guide",
    icon: BookOpen,
    badge: "Guide maestra · Décodage VIN",
    h1: "Guide maestra de décodage VIN",
    metaTitle: "Guide maestra décodage VIN — Completa",
    metaDescription:
      "Manual complet pour décoder n’importe quel VIN: estructura ISO 3779, WMI par pays, année modèle histórico, cass de uso pour enchère, compravente e import.",
    keywords: [
      "guide décodage VIN",
      "manual VIN français",
      "décoder VIN complet",
      "estructura VIN ISO 3779",
      "VIN payses WMI",
      "décodeur VIN auto",
    ],
    intro:
      "Esta es la référence complète pour décoder n’importe quel VIN de auto: estndar internacional ISO 3779, les tablas oficiales NHTSA de codes WMI par fabricante et pays, la tabla histórica de années modèle (incluida la dualité 1980 vs 2010 que confunde a beaucoups), et guides prácticas pour cass de uso réels: compra usado, import, enchère et voitures classiques pre-1981.",
    whatYouGet: [
      "Tabla complète WMI par pays et fabricante",
      "Tabla histórica du année modèle (1980 a 2039)",
      "Algoritmo étape a étape pour calcular le chiffre vérificateur",
      "Différences entre VIN auto, moto, camion et RV",
      "Comment décoder VIN europeos vs étatunidenses",
      "Recursos oficiales: vPIC de NHTSA et bases de fabricante",
    ],
    whyItMatters: [
      "Saber décoder manualmente te protege quand le sitio en ligne est caído",
      "Útil pour vérifier voitures pre-1981 sans VIN estandarizado",
      "Esencial pour importadores et acheteurs de enchère internacional",
      "Detecta VIN reasignadeux ou falsificadeux al cotejar la lógica interna",
    ],
    trustNote:
      "Basado en ISO 3779:2009, NHTSA 49 CFR § 565, SAE J853 et la base de données vPIC (vpic.nhtsa.dot.gov/decoder/), la a éténte oficial federal de décodage.",
    schemaName: "Guide maestra de décodage VIN",
  },

  "car-history-report-guide": {
    esSlug: "/guias/guia-rapport-historique-auto",
    englishPath: "/guides/car-history-report-guide",
    icon: FileText,
    badge: "Guide · Rapport de historique",
    h1: "Guide du rapport de historique de véhicule",
    metaTitle: "Guide rapport historique auto — Que inclut",
    metaDescription:
      "Que inclut un rapport de historique de véhicule, comment leerlo, que signaux de alerta buscar et comment usarlo pour negociar le prix. Guide étape a étape.",
    keywords: [
      "guide rapport historique auto",
      "que inclut rapport VIN",
      "leer rapport du véhicule",
      "signaux alerta historique auto",
      "negociar prix voiture d’occasion",
      "rapport historique Carfax français",
    ],
    intro:
      "Un rapport de historique de véhicule bien hecho cona 10+ secciones: marques de titre, accidents, lecturas du odomètre, propriétaires anteriores, rappels, vol, eventos de assurance, données de enchère et plus. Esta guide te explica que buscar en chaque section, que patrones son signaux de alerta êtreias et comment usar les découvertes pour basêtre le prix.",
    whatYouGet: [
      "10+ secciones típicas de un rapport explicadas una a una",
      "Signaux de alerta: salvage, accidents graves, kilométrage inconsistente",
      "Patrones de fraude: lavado de titre, odomètre rolled back",
      "Comment cruzar le rapport avec la inspection física",
      "Plantilla de checklist pour revisar le rapport sistemáticamente",
      "Combien basêtre le prix selon le hallazgo (accident: 10–15%, salvage: 30–50%)",
    ],
    whyItMatters: [
      "Sin saber lire le rapport, acheter unon es desperdiciar le argent",
      "Les rapports mal interpretadeux prendn a malas compras ou a perder bonnes options",
      "Saber que hallazgo justifica que descuento te da poder de négociation",
      "Les assureurs aussi usan estos données — alinearte avec ellos protege ta couverture",
    ],
    trustNote:
      "El estndar federal NMVTIS (administrado par le Department of Justice) define que données doitn incluir les rapports. Les proveedores comerciales agregan capas (NICB, NHTSA, données de enchère) adeplus du piso NMVTIS.",
    schemaName: "Guide: rapport de historique de véhicule",
  },

  "used-car-buying-complete-guide": {
    esSlug: "/guias/guia-complète-compra-auto-usado",
    englishPath: "/guides/used-car-buying-complete-guide",
    icon: BookOpen,
    badge: "Guide complet · Compra usado",
    h1: "Guide complet de compra de voiture d’occasion",
    metaTitle: "Guide complet compra voiture d’occasion — Étapes 2026",
    metaDescription:
      "Guide pas à pas pour acheter une voiture d’occasion en EE. UU. en 2026: presupuesto, recherche, prueba, vérification VIN, inspection, financement et cierre.",
    keywords: [
      "guide acheter voiture d’occasion",
      "consejos compra carro usado",
      "étapes acheter auto seconde manon",
      "que revisar voiture d’occasion",
      "compra voiture d’occasion étape a étape",
      "tips voiture d’occasion 2026",
    ],
    intro:
      "Comprar un voiture d’occasion bien es un proceso de 7 étapes: definir presupuesto réaliste, investigar modèles fiables, trouver et precalificar options, hacer prueba de manejo, revisar le VIN, prendr a un mécanicien de confiance, et cerrar négociation + papeleo. Esta guide te prend par chaque étape avec checklists, plantillas et les errores comunes a evitar.",
    whatYouGet: [
      "Étape 1: presupuesto réel avec regla 20/4/10",
      "Étape 2: investigar modèles par fiabilité (Consumer Reports, JDPower)",
      "Étape 3: où buscar (CarMax, Carvana, particulares, Craigslist)",
      "Étape 4: prueba de manejo — que probar en 20 minutes",
      "Étape 5: vérification VIN complète avant de payer inspection",
      "Étape 6: PPI (Pre-Purchase Inspection) avec mécanicien ($100–$200)",
      "Étape 7: négociation et papeleo de titre",
    ],
    whyItMatters: [
      "El acheteur promedio pierde $1,500–$3,000 par shauterse étapes du proceso",
      "Shauter le PPI ahorra $150 pero peut costar $5,000 en réparations après",
      "Negociar sans données du rapport VIN te deja como blanco facile",
      "El papeleo de titre mal hecho genétait dolores de cabeza moises après",
    ],
    trustNote:
      "Les recomendaciones siguen les prácticas publicadas par Consumer Reports, Edmunds, AAA et la FTC (Federal Trade Commission) en su guide 'Buying a Used Car'.",
    schemaName: "Guide complet de compra de voiture d’occasion",
  },

  "used-car-financing-guide": {
    esSlug: "/guias/guia-financement-auto-usado",
    englishPath: "/guides/used-car-financing-guide",
    icon: Wallet,
    badge: "Guide · Financement usado",
    h1: "Guide de financement de voiture d’occasion",
    metaTitle: "Guide financement voiture d’occasion — APR & plazo",
    metaDescription:
      "Comment financiar un voiture d’occasion en 2026: où precalificar (banco, credit union, dealer), que APR espétaitr par crédit, plazos ideales et errores a evitar.",
    keywords: [
      "financement voiture d’occasion",
      "prêt voiture d’occasion",
      "APR voiture d’occasion",
      "credit union auto",
      "financiar carro usado",
      "tasas prêt auto 2026",
    ],
    intro:
      "Financiar un voiture d’occasion mal te peut costar milleliers. Esta guide couvre comment precalificarte avant de ir al dealer (banco, credit union, prestamistas en ligne como LightStream), que APR espétaitr selon ta credit score, le plazo ideal par monto du prêt, et les trucos du dealer que inflan le coût sans que te des cuenta.",
    whatYouGet: [
      "APR espétaitda par gamme de FICO score (300–850)",
      "Comparaison: banco vs credit union vs financiétait du dealer",
      "Comment precalificarte sans afectar le score (soft pull)",
      "Plazo ideal par monto: 36 mo pour $15K, 48 pour $25K, etc.",
      "Trucos du dealer: extended warranty, GAP, additive products",
      "Plantilla de hoja de cálculo pour comparar ofertas réels",
    ],
    whyItMatters: [
      "Una APR de 3% pire cuesta $1,500 plus en un prêt de $25K a 60 moises",
      "Llegar al dealer avec preapprobation te basse la APR ofrecida un 1–2%",
      "Les productos 'F&I' (finance & insurance) du dealer suelen être infladeux — sabes negociar",
      "Ir directo a credit union ahorra 1–2 puntos vs financiétait du dealer",
    ],
    trustNote:
      "Datos de Experian State of Auto Finance Report (Q4 2025), NerdWallet et la CFPB (Consumer Financial Protection Bureau). Les credit unions consistentemente ofrecen 1–2 puntos par desous du promedio de dealers.",
    schemaName: "Guide de financement de voiture d’occasion",
  },

  "vehicle-fraud-prevention": {
    esSlug: "/guias/prévention-fraude-du véhicule",
    englishPath: "/guides/vehicle-fraud-prevention",
    icon: ShieldAlert,
    badge: "Guide · Prévention de fraude",
    h1: "Prévention de fraude du véhicule — Guide 2026",
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
      "El fraude en vente de voitures d’occasion cuesta a les consumidores étatunidenses plus de $10 mille millelions al année. Les 8 fraudes plus comunes son: lavado de titre (title washing), reversion du odomètre, VIN clonado, salvage encubierto, curbstoning (dealer ilegal posant como particular), paiement avec cheque falso, voitures volés puestos a la vente et warranty fraud. Esta guide te affiche comment detectar chaque unon.",
    whatYouGet: [
      "Les 8 tácticas de fraude plus comunes et comment identificarlas",
      "Lavado de titre: comment cruzar le historique d état NMVTIS",
      "Odómetro rollback: detectar incohérences en lecturas históricas",
      "VIN clonado: vérifier correspondance entre tableau de bord, porte et titre",
      "Salvage encubierto: pistas físicas de réparation de perte totale",
      "Curbstoning: comment identificar dealer ilegal posant de particular",
      "Rapport de fraude a NICB et autoritées d état",
    ],
    whyItMatters: [
      "Una víctima promedio de title washing pierde $5,000–$15,000 et queda avec un auto inassurance",
      "El odomètre rolled back cuesta a les consumidores >$1 mille millelions/année (NHTSA)",
      "Comprar un VIN clonado peut prendr al confiscamiento du auto sans reembolso",
      "Cononcer les tácticas te da le filtro pour descartar options sospechosas avant de visitar",
    ],
    trustNote:
      "Estadísticas de NICB, NHTSA Office of Odometer Fraud Investigation et la FTC. Les cifras de perte anual provienen du Bureau of Justice Statistics et rapports de assureurs.",
    schemaName: "Guide de prévention de fraude du véhicule",
  },
};

export const TOOL_HOOKS_ES: Record<string, SpecialtyHook> = {
  "used-car-checklist": {
    esSlug: "/checklist-inspection-auto-usado",
    englishPath: "/used-car-inspection-checklist",
    icon: ListChecks,
    badge: "Checklist · 60+ puntos de inspection",
    h1: "Checklist de inspection de voiture d’occasion — 60+ puntos",
    metaTitle: "Checklist inspection voiture d’occasion — 60+ puntos",
    metaDescription:
      "Checklist gratuit de 60+ puntos pour inspectionar un voiture d’occasion avant de acheter. Carrosêtreie, moteur, transmission, freins, interior, computadora et prueba de manejo.",
    keywords: [
      "checklist inspection auto",
      "lista revisar voiture d’occasion",
      "que revisar avant acheter carro",
      "pre purchase inspection français",
      "puntos inspection auto",
      "guide inspection visuelle auto",
    ],
    intro:
      "Avant de payer par una inspection profesional ($100–$200) ou de visitar al vendeur avec dudas, este checklist de 60+ puntos couvre todo le que tú même peuts vérifier visualmente et avec una prueba de manejo de 20 minutes. Es la même lista que usan les inspectores certificadeux — adaptada pour que non necesites outils especiales.",
    whatYouGet: [
      "12 puntos de carrosêtreie: panneaues, gaps, peinture, óxido",
      "10 puntos de moteur: fuites, ruideux, manguétait, correa",
      "8 puntos de transmission: cambios suaves, fluido, embrague",
      "6 puntos de freins: pedal, pastillas, discos, líquido",
      "10 puntos de interior: garniture, controles, electrónica",
      "8 puntos de computadora (OBD-II) et luces de alerta",
      "8 puntos de prueba de manejo (route, ville, curvas)",
      "Plantilla imprimible pour prendr al test drive",
    ],
    whyItMatters: [
      "Una inspection visuelle sistemática descarta 70% de les voitures problema en 15 minutes",
      "Les detalles cosméticos (gaps, peinture) revelan accidents ocultos non reportadeux",
      "Un escáner OBD-II ($20 en Amazon) lis codes que le vendeur non peut borrar facilemente",
      "La prueba de manejo bien hecha detecta problemas de transmission et suspension invisibles paradeux",
    ],
    trustNote:
      "Basado en les protocolos de inspection de Consumer Reports, NACE Automotive Service Excellence (ASE) et la guide de pre-purchase inspection de la AAA. Non reemplaza una inspection profesional, pero filtra rapide.",
    schemaName: "Checklist de inspection de voiture d’occasion",
  },

  "compare-cars": {
    esSlug: "/comparar-autos",
    englishPath: "/compare-cars",
    icon: GitCompare,
    badge: "Herramienta · Comparar autos",
    h1: "Herramienta pour comparar voitures côte à côte",
    metaTitle: "Comparar voitures côte à côte — Gratuit",
    metaDescription:
      "Compare n’importe quel par de voitures côte à côte: specs, MPG, MSRP, valeur de marché, dépréciation espétaitda, rappels et fiabilité. Gratuit instantanément.",
    keywords: [
      "comparar autos",
      "comparar carros côte à côte",
      "comparaison auto vs auto",
      "comparar especificaciones autos",
      "différence entre deux autos",
      "comparar prix auto",
    ],
    intro:
      "La outil pour comparar voitures toma 2 (o plus) modèles et les pone côte à côte en una tabla avec todas les cifras que importan: prix MSRP, valeur de marché actual, MPG ville/route, dépréciation sur 5 ans, dimensiones, capacité de carga, rappels actifs et rating de fiabilité. Útil pour reducir la lista corta avant de visitar dealers.",
    whatYouGet: [
      "Tabla côte à côte de specs (moteur, transmission, drivetrain)",
      "MSRP et valeur de marché actual (KBB/Edmunds)",
      "MPG ville/route (EPA oficial)",
      "Dépréciation espétaitda a 3 et 5 années",
      "Retiros actifs NHTSA par modèle",
      "Rating de fiabilité (Consumer Reports, JDPower)",
      "Costo total de propriété estimado sur 5 ans",
    ],
    whyItMatters: [
      "Comparar 3–4 modèles en tabla revela différences que tabla individual oculta",
      "El TCO (dépréciation + MPG + entretien) suele invertir le orden de 'meilleur prix'",
      "Útil avant de visitar le dealer — non ests expuesto a la pression de vente",
      "Rea étérza ta décision avec données en vez de impresiones de marketing",
    ],
    trustNote:
      "Datos consolidéeux de Edmunds, Kelley Blue Book, EPA a étélecononmy.gov, NHTSA rappels, Consumer Reports et JDPower Vehicle Dependability Study.",
    schemaName: "Herramienta pour comparar autos",
  },
};
