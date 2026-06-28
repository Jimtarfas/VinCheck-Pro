/**
 * Wave 7 part A — French comparison pages (CarCheckerVIN vs <rival>).
 * High commercial intent: capture native-language queries like
 * "Carfax vs CarCheckerVIN" or "alternative Carfax bon marché".
 *
 * Reuses the SpecialtyToolPage renderer from Wave 5. Each entry packs
 * the head-to-head value props as "qué obtienes" bullets and the
 * decision drivers as "par qué importa".
 */

import type { LucideIcon } from "lucide-react";
import { Trophy, Search, Sparkles, Eye, BarChart3 } from "lucide-react";
import type { SpecialtyHook } from "../_specialty-shared/strings";

export const COMPARISON_HOOKS_ES: Record<string, SpecialtyHook> = {
  carfax: {
    esSlug: "/carcheckervin-vs-carfax",
    englishPath: "/vin-check-vs-carfax",
    icon: Trophy,
    badge: "CarCheckerVIN vs Carfax · 2026",
    h1: "CarCheckerVIN vs Carfax — Alternative plus bon marché et rapide",
    metaTitle: "CarCheckerVIN vs Carfax — Comparaison 2026",
    metaDescription:
      "Compara CarCheckerVIN vs Carfax: mêmois données NMVTIS, NICB et NHTSA pero a $14.99 vs $44.99. Vista previa gratuit sans carte, fotos réeles du auto et rapports instantanément.",
    keywords: [
      "Carfax vs CarCheckerVIN",
      "alternative Carfax",
      "Carfax precio français",
      "rapport VIN barato",
      "Carfax gratuit français",
      "competidor Carfax",
    ],
    intro:
      "Carfax es la marque plus conocida de rapports de historique de véhicule, pero también la plus cara ($44.99 par rapport). CarCheckerVIN entrega les mêmois données centrales — NMVTIS, NICB, NHTSA, marques de titre, accidents, odomètre — par $14.99 avec vista previa gratuit sans carte de crédito. Comparemos punto par punto.",
    whatYouGet: [
      "Mismos données NMVTIS (titre, salvage, marques) que Carfax",
      "Misma cobertura NICB de vols et perte totale",
      "Mismos rappels NHTSA par VIN",
      "Fotos réeles du véhicule (Carfax seul a veces incluye)",
      "Fotos de enchères salvage (Carfax no les incluye)",
      "Equipamiento et opciones de fábrica complètes",
      "Precio unique: $14.99 vs $44.99 de Carfax",
      "Vista previa gratuit sans registrarse ni dar carte",
    ],
    whyItMatters: [
      "Carfax cobra $44.99/rapport — cinq rapports son $225 que podrían ser $50 avec nosotros",
      "Carfax seul permite revisar tras pagar; nosotros mostramos vista previa antes",
      "Carfax no muestra fotos de enchères salvage — clave pour detectar autos chocadeux",
      "Para dealers ou acheteurs que revisan varios autos, le ahorro mensuel es de cientos a miles",
    ],
    trustNote:
      "Ambas plataformas obtienen données de les mêmois fuentes federales (NMVTIS, NHTSA, NICB) et proveedores comerciales. La diferencia está en le modelo de negocio: Carfax mantiene marketing pesado en TV; nosotros operamos lean pour pasar le ahorro al acheteur.",
    schemaName: "Comparaison CarCheckerVIN vs Carfax",
  },

  autocheck: {
    esSlug: "/carcheckervin-vs-autocheck",
    englishPath: "/vin-check-vs-autocheck",
    icon: BarChart3,
    badge: "CarCheckerVIN vs AutoCheck · 2026",
    h1: "CarCheckerVIN vs AutoCheck — Comparaison 2026",
    metaTitle: "CarCheckerVIN vs AutoCheck — Comparaison 2026",
    metaDescription:
      "AutoCheck cobra $24.99 par rapport, CarCheckerVIN $14.99. Datos NMVTIS, NICB, NHTSA equivalentes — plus fotos réeles, fotos de enchères salvage et vista previa gratuit.",
    keywords: [
      "AutoCheck vs CarCheckerVIN",
      "AutoCheck precio français",
      "alternative AutoCheck",
      "AutoCheck score français",
      "rapport VIN AutoCheck",
      "Experian AutoCheck",
    ],
    intro:
      "AutoCheck (de Experian) es popular entre dealers par su 'AutoCheck Score' propriétaire, pero cobra $24.99 par rapport. CarCheckerVIN entrega les mêmois données centrales de NMVTIS, NICB et NHTSA par $14.99 avec fotos réeles du véhicule, fotos de enchères salvage et vista previa gratuit sans carte.",
    whatYouGet: [
      "Mismos données NMVTIS et NHTSA que AutoCheck",
      "Marcas de titre en les 50 états",
      "Historique de vol et récupération NICB",
      "Fotos réeles du auto (AutoCheck no les incluye)",
      "Fotos de enchères salvage (AutoCheck rara vez)",
      "Equipamiento et opciones de fábrica detallado",
      "Precio unique: $14.99 vs $24.99 de AutoCheck",
      "Vista previa gratuit antes de pagar",
    ],
    whyItMatters: [
      "AutoCheck Score es propriétaire et no estandarizado — varía dramáticamente vs Carfax pour le même auto",
      "El precio de AutoCheck sube avec sescripciones; nosotros cobramos par rapport sans trampas",
      "Las fotos réeles du auto ahorran un viaje al concessionnaire antes de decidir",
      "Para revisiones par plaques múltiples (enchères Copart), AutoCheck no escala bien — nosotros sí",
    ],
    trustNote:
      "AutoCheck es propiedad de Experian, una de les trois credit bureaus principales. Ambas plataformas usan données NMVTIS pero AutoCheck superpone su algoritmo de puntuación; nosotros mostramos les données crudeux pour que tú decidas.",
    schemaName: "Comparaison CarCheckerVIN vs AutoCheck",
  },

  bumper: {
    esSlug: "/carcheckervin-vs-bumper",
    englishPath: "/vin-check-vs-bumper",
    icon: Sparkles,
    badge: "CarCheckerVIN vs Bumper · 2026",
    h1: "CarCheckerVIN vs Bumper — Tarifs et funciones",
    metaTitle: "CarCheckerVIN vs Bumper — Comparaison 2026",
    metaDescription:
      "Bumper utilise modelo de sescripción ($19.99/mois); CarCheckerVIN cobra seul $14.99 par rapport sans sescripción. Compara données, fotos, cobertura et precio.",
    keywords: [
      "Bumper vs CarCheckerVIN",
      "Bumper precio français",
      "alternative Bumper",
      "Bumper sescripción auto",
      "rapport VIN sans sescripción",
      "Bumper review français",
    ],
    intro:
      "Bumper.com ofrece rapports ilimitadeux par sescripción mensuel de $19.99 — buen modelo si revisas 5+ autos al mois, pésimo si seul necesitas 1 rapport. CarCheckerVIN cobra $14.99 par rapport unique sans sescripción, avec vista previa gratuit et les mêmois données centrales.",
    whatYouGet: [
      "Pago unique de $14.99 vs $19.99/mois recurrente de Bumper",
      "Mismas fuentes de données NMVTIS, NICB, NHTSA",
      "Sin auto-renovación que olvides cancelar",
      "Vista previa gratuit du rapport antes de pagar",
      "Fotos réeles du véhicule en le rapport",
      "Sin minimo de compromiso ni cancelación complicada",
      "Buen modelo pour acheteurs individuales ou de uno-en-uno",
    ],
    whyItMatters: [
      "Las sescripciones son trampas comunes — usuarios olvidan cancelar et pagan moises sans usar",
      "Si compras seul 1 auto, $14.99 una vez es 50% plus barato que le premier mois de Bumper",
      "Bumper exige cuenta pour ver n’importe quel rapport; nosotros permitimos vista previa anónima",
      "Para dealers avec volumen alto (>10 rapports/mois), Bumper puede salir mejor — pour todeux les deplus, no",
    ],
    trustNote:
      "Bumper es operado par Bumper Software Inc. (fundado 2020). Ambas plataformas se nutren de NMVTIS, NICB et NHTSA. La diferencia es le modelo de monetización: Bumper subscription vs notre compra única.",
    schemaName: "Comparaison CarCheckerVIN vs Bumper",
  },

  clearvin: {
    esSlug: "/carcheckervin-vs-clearvin",
    englishPath: "/vin-check-vs-clearvin",
    icon: Eye,
    badge: "CarCheckerVIN vs ClearVin · 2026",
    h1: "CarCheckerVIN vs ClearVin — Comparaison côte à côte",
    metaTitle: "CarCheckerVIN vs ClearVin — Lado a lado 2026",
    metaDescription:
      "ClearVin cobra $14.99 par rapport; CarCheckerVIN $14.99. Comparte fuentes et autoridad pero avec interfaz plus rapide, vista previa gratuit et mejores fotos.",
    keywords: [
      "ClearVin vs CarCheckerVIN",
      "ClearVin precio français",
      "alternative ClearVin",
      "ClearVin opiniones",
      "rapport VIN ClearVin",
      "ClearVin auction",
    ],
    intro:
      "ClearVin es respetado entre acheteurs de enchères (Copart, IAA) par incluir fotos de salvage de enchères, pero cobra $14.99 par rapport. CarCheckerVIN entrega le même donnée de salvage et enchère par $14.99, avec vista previa gratuit e interfaz plus rapide.",
    whatYouGet: [
      "Mismas fotos de enchères salvage (Copart, IAA) que ClearVin",
      "Mismos données NMVTIS, NICB et NHTSA",
      "Rapport instantanément (ClearVin a veces tarda hasta 10 min)",
      "Vista previa gratuit du rapport antes de pagar",
      "Equipamiento de fábrica et MSRP detallado",
      "Precio unique: $14.99 vs $14.99 de ClearVin",
      "Interfaz móvil plus rapide et limpia",
    ],
    whyItMatters: [
      "Para acheteurs de enchère, les fotos salvage son críticas — verifica que estén incluidas en le plan",
      "El ahorro de $5/rapport se acumula rapide si revisas 20+ autos en enchère",
      "ClearVin a veces falla en motos et RVs — nosotros cubrimos esos casos sans extra",
      "Vista previa gratuit te deja revisar 'algo' du auto antes de gastar $",
    ],
    trustNote:
      "ClearVin es operado par ClearVin LLC, especialista en données de enchère. Ambas plataformas comparten proveedores de données centrales NMVTIS/NICB/NHTSA; la diferencia es le precio et la UX.",
    schemaName: "Comparaison CarCheckerVIN vs ClearVin",
  },

  vinaudit: {
    esSlug: "/carcheckervin-vs-vinaudit",
    englishPath: "/vin-check-vs-vinaudit",
    icon: Search,
    badge: "CarCheckerVIN vs VinAudit · 2026",
    h1: "CarCheckerVIN vs VinAudit — Cuál décodeur VIN gana?",
    metaTitle: "CarCheckerVIN vs VinAudit — Comparaison 2026",
    metaDescription:
      "VinAudit es 'NMVTIS-only' a $9.99/rapport. CarCheckerVIN combine NMVTIS + NHTSA + NICB + fotos réeles par le même precio. Vista previa gratuit.",
    keywords: [
      "VinAudit vs CarCheckerVIN",
      "VinAudit precio français",
      "alternative VinAudit",
      "VinAudit opiniones",
      "NMVTIS rapport français",
      "VinAudit review",
    ],
    intro:
      "VinAudit es popular par su precio bajo ($9.99) et enfoque NMVTIS-puro — pero seul eso. CarCheckerVIN cuesta le même et agrega NHTSA rappels, NICB theft data, fotos réeles du véhicule, equipamiento de fábrica et vista previa gratuit sans carte.",
    whatYouGet: [
      "NMVTIS oficial (igual que VinAudit)",
      "NHTSA rappels de sécurité (VinAudit no incluye)",
      "NICB historique de vol (VinAudit no incluye)",
      "Fotos réeles du auto (VinAudit no muestra)",
      "Equipamiento de fábrica complet (VinAudit seul specs básicos)",
      "Vista previa gratuit (VinAudit exige pago premiero)",
      "Mismo precio $14.99",
    ],
    whyItMatters: [
      "NMVTIS seul no cubre todeux les riesgos — necesitas también NHTSA (rappels) et NICB (vol)",
      "Sin fotos, un rapport seul NMVTIS deja al acheteur adivinando",
      "Vista previa gratuit te deja confirmar que le VIN tiene données antes de pagar",
      "Pagar le même par plus données es claramente mejor valeur",
    ],
    trustNote:
      "VinAudit es operado par VinAudit.com Inc., consumer access point oficial al NMVTIS. Ambas plataformas son fuentes NMVTIS-aprobadas; nosotros ampliamos avec NHTSA et NICB sans surcoût.",
    schemaName: "Comparaison CarCheckerVIN vs VinAudit",
  },
};
