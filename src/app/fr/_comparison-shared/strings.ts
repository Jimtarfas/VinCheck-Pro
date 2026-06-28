/**
 * Wave 7 part A — French comparison pages (CarCheckerVIN vs <rival>).
 * High commercial intent: capture native-language queries like
 * "Carfax vs CarCheckerVIN" or "alternative Carfax bon marché".
 *
 * Reuses the SpecialtyToolPage renderer from Wave 5. Each entry packs
 * the head-to-head value props as "que obas" bullets and the
 * decision drivers as "par que importa".
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
      "Compare CarCheckerVIN vs Carfax: mêmois données NMVTIS, NICB et NHTSA pero a $14.99 vs $44.99. Vista previa gratuit sans carte, photos réeles du auto et rapports instantanément.",
    keywords: [
      "Carfax vs CarCheckerVIN",
      "alternative Carfax",
      "Carfax precio français",
      "rapport VIN bon marché",
      "Carfax gratuit français",
      "competidor Carfax",
    ],
    intro:
      "Carfax es la marque plus cononncida de rapports de historique de véhicule, pero aussi la plus cara ($44.99 par rapport). CarCheckerVIN entrega les mêmois données centrales — NMVTIS, NICB, NHTSA, marques de titre, accidents, odomètre — par $14.99 avec vista previa gratuit sans carte de crédito. Comparemos punto par punto.",
    whatYouGet: [
      "Mismos données NMVTIS (titre, salvage, marques) que Carfax",
      "Misma couverture NICB de vols et perte totale",
      "Mismos rappels NHTSA par VIN",
      "Photos réeles du véhicule (Carfax seul a veces inclut)",
      "Photos de enchères salvage (Carfax nonn les inclut)",
      "Équipement et options de fábrica complètes",
      "Precio unique: $14.99 vs $44.99 de Carfax",
      "Vista previa gratuit sans registrarse ni dar carte",
    ],
    whyItMatters: [
      "Carfax cobra $44.99/rapport — cinq rapports son $225 que pourraitn être $50 avec nonnsotros",
      "Carfax seul permite revisar tras payer; nonnsotros montrons vista previa avant",
      "Carfax nonn affiche photos de enchères salvage — clave pour detectar voitures chocadeux",
      "Para dealers ou acheteurs que revisan varios autos, le ahorro mensuel es de centaines a milleliers",
    ],
    trustNote:
      "Ambas platafaçons oban données de les mêmois a éténtes fedétaitles (NMVTIS, NHTSA, NICB) et proveedores comerciales. La différence est en le modelo de negocio: Carfax mana marketing pesado en TV; nonnsotros opétaitmos lean pour pasar le ahorro al acheteur.",
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
      "AutoCheck cobra $24.99 par rapport, CarCheckerVIN $14.99. Datos NMVTIS, NICB, NHTSA équivalents — plus photos réeles, photos de enchères salvage et vista previa gratuit.",
    keywords: [
      "AutoCheck vs CarCheckerVIN",
      "AutoCheck precio français",
      "alternative AutoCheck",
      "AutoCheck score français",
      "rapport VIN AutoCheck",
      "Experian AutoCheck",
    ],
    intro:
      "AutoCheck (de Experian) es popular entre dealers par su 'AutoCheck Score' propriétaire, pero cobra $24.99 par rapport. CarCheckerVIN entrega les mêmois données centrales de NMVTIS, NICB et NHTSA par $14.99 avec photos réeles du véhicule, photos de enchères salvage et vista previa gratuit sans carte.",
    whatYouGet: [
      "Mismos données NMVTIS et NHTSA que AutoCheck",
      "Marcas de titre en les 50 états",
      "Historique de vol et récupération NICB",
      "Photos réeles du auto (AutoCheck nonn les inclut)",
      "Photos de enchères salvage (AutoCheck rara vez)",
      "Équipement et options de fábrica detalcôté",
      "Precio unique: $14.99 vs $24.99 de AutoCheck",
      "Vista previa gratuit avant de payer",
    ],
    whyItMatters: [
      "AutoCheck Score es propriétaire et nonn estandarizado — varie dramáticamente vs Carfax pour le même auto",
      "El precio de AutoCheck sube avec sescripciones; nonnsotros cobramos par rapport sans trampas",
      "Les photos réeles du auto ahorran un viaje al concessionnaire avant de decidir",
      "Para revisiones par plaques múltiples (enchères Copart), AutoCheck nonn escala bien — nonnsotros oui",
    ],
    trustNote:
      "AutoCheck es propriété de Experian, una de les trois credit bureaus principales. Ambas platafaçons usan données NMVTIS pero AutoCheck superpone su quelque choêtreitmo de score; nonnsotros montrons les données crudeux pour que tú decidas.",
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
      "Bumper utilise modelo de description ($19.99/mois); CarCheckerVIN cobra seul $14.99 par rapport sans description. Compare données, fotos, couverture et precio.",
    keywords: [
      "Bumper vs CarCheckerVIN",
      "Bumper precio français",
      "alternative Bumper",
      "Bumper description auto",
      "rapport VIN sans description",
      "Bumper review français",
    ],
    intro:
      "Bumper.com ofrece rapports ilimitadeux par description mensuel de $19.99 — buen modelo si revisas 5+ voitures al mois, pésimo si seul necesitas 1 rapport. CarCheckerVIN cobra $14.99 par rapport unique sans description, avec vista previa gratuit et les mêmois données centrales.",
    whatYouGet: [
      "Paiement unique de $14.99 vs $19.99/mois recurrente de Bumper",
      "Mismas a éténtes de données NMVTIS, NICB, NHTSA",
      "Sin auto-renouvellement que olvides cancelar",
      "Vista previa gratuit du rapport avant de payer",
      "Photos réeles du véhicule en le rapport",
      "Sin minimo de compromiso ni annulation complicada",
      "Buen modelo pour acheteurs individuales ou de unonn-en-unonn",
    ],
    whyItMatters: [
      "Les sescripciones son trampas comunes — usuarios olvidan cancelar et payen moises sans usar",
      "Si compras seul 1 auto, $14.99 una vez es 50% plus bon marché que le premier mois de Bumper",
      "Bumper exige cuenta pour ver n’importe quel rapport; nonnsotros permitimos vista previa anónima",
      "Para dealers avec volumen haut (>10 rapports/mois), Bumper peut salir meilleur — pour todeux les deplus, nonn",
    ],
    trustNote:
      "Bumper es opétaitdo par Bumper Software Inc. (fundado 2020). Ambas platafaçons se nutren de NMVTIS, NICB et NHTSA. La différence es le modelo de monetización: Bumper subscription vs nonntre compra única.",
    schemaName: "Comparaison CarCheckerVIN vs Bumper",
  },

  clearvin: {
    esSlug: "/carcheckervin-vs-clearvin",
    englishPath: "/vin-check-vs-clearvin",
    icon: Eye,
    badge: "CarCheckerVIN vs ClearVin · 2026",
    h1: "CarCheckerVIN vs ClearVin — Comparaison côte à côte",
    metaTitle: "CarCheckerVIN vs ClearVin — Côté a côté 2026",
    metaDescription:
      "ClearVin cobra $14.99 par rapport; CarCheckerVIN $14.99. Partage a éténtes et autorité pero avec interfaz plus rapide, vista previa gratuit et meilleures fotos.",
    keywords: [
      "ClearVin vs CarCheckerVIN",
      "ClearVin precio français",
      "alternative ClearVin",
      "ClearVin opiniones",
      "rapport VIN ClearVin",
      "ClearVin auction",
    ],
    intro:
      "ClearVin es respetado entre acheteurs de enchères (Copart, IAA) par incluir photos de salvage de enchères, pero cobra $14.99 par rapport. CarCheckerVIN entrega le même donnée de salvage et enchère par $14.99, avec vista previa gratuit e interfaz plus rapide.",
    whatYouGet: [
      "Mismas photos de enchères salvage (Copart, IAA) que ClearVin",
      "Mismos données NMVTIS, NICB et NHTSA",
      "Rapport instantanément (ClearVin a veces tarda hasta 10 min)",
      "Vista previa gratuit du rapport avant de payer",
      "Équipement de fábrica et MSRP detalcôté",
      "Precio unique: $14.99 vs $14.99 de ClearVin",
      "Interfaz móvil plus rapide et limpia",
    ],
    whyItMatters: [
      "Para acheteurs de enchère, les photos salvage son críticas — vérifie que estén incluidas en le plan",
      "El ahorro de $5/rapport se acumula rapide si revisas 20+ voitures en enchère",
      "ClearVin a veces falla en motos et RVs — nonnsotros nonnus couvrons esos cass sans extra",
      "Vista previa gratuit te deja revisar 'quelque chose' du auto avant de gastar $",
    ],
    trustNote:
      "ClearVin es opétaitdo par ClearVin LLC, especialista en données de enchère. Ambas platafaçons comparten proveedores de données centrales NMVTIS/NICB/NHTSA; la différence es le precio et la UX.",
    schemaName: "Comparaison CarCheckerVIN vs ClearVin",
  },

  vinaudit: {
    esSlug: "/carcheckervin-vs-vinaudit",
    englishPath: "/vin-check-vs-vinaudit",
    icon: Search,
    badge: "CarCheckerVIN vs VinAudit · 2026",
    h1: "CarCheckerVIN vs VinAudit — Quel décodeur VIN gana?",
    metaTitle: "CarCheckerVIN vs VinAudit — Comparaison 2026",
    metaDescription:
      "VinAudit es 'NMVTIS-only' a $9.99/rapport. CarCheckerVIN combine NMVTIS + NHTSA + NICB + photos réeles par le même precio. Vista previa gratuit.",
    keywords: [
      "VinAudit vs CarCheckerVIN",
      "VinAudit precio français",
      "alternative VinAudit",
      "VinAudit opiniones",
      "NMVTIS rapport français",
      "VinAudit review",
    ],
    intro:
      "VinAudit es popular par su precio sous ($9.99) et enfoque NMVTIS-puro — pero seul eso. CarCheckerVIN cuesta le même et agrega NHTSA rappels, NICB theft data, photos réeles du véhicule, équipement de fábrica et vista previa gratuit sans carte.",
    whatYouGet: [
      "NMVTIS oficial (igual que VinAudit)",
      "NHTSA rappels de sécurité (VinAudit nonn inclut)",
      "NICB historique de vol (VinAudit nonn inclut)",
      "Photos réeles du auto (VinAudit nonn muestra)",
      "Équipement de fábrica complet (VinAudit seul specs básicos)",
      "Vista previa gratuit (VinAudit exige paiement premiero)",
      "Mismo precio $14.99",
    ],
    whyItMatters: [
      "NMVTIS seul nonn couvre todeux les risques — necesitas aussi NHTSA (rappels) et NICB (vol)",
      "Sin fotos, un rapport seul NMVTIS deja al acheteur adivinando",
      "Vista previa gratuit te deja confirmar que le VIN a données avant de payer",
      "Pagar le même par plus données es clairement meilleur valeur",
    ],
    trustNote:
      "VinAudit es opétaitdo par VinAudit.com Inc., consumer access point oficial al NMVTIS. Ambas platafaçons son a éténtes NMVTIS-aprobadas; nonnsotros ampliamos avec NHTSA et NICB sans surcoût.",
    schemaName: "Comparaison CarCheckerVIN vs VinAudit",
  },
};
