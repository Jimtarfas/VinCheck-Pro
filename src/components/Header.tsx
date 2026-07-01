"use client";

import Link from "@/components/LocaleLink";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu, X, ChevronRight, ChevronDown, User, LogOut, FileText,
  SquareArrowOutUpRight,
} from "lucide-react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { detectLocale, type Locale } from "@/i18n/config";

// ── Header label translations ────────────────────────────────────────
// Keys are stable English identifiers (not the user-visible strings)
// so a label change in one language never silently drifts the others.
// The `NAV` array below carries the English label as both the canonical
// display string AND the lookup key — `tNav()` resolves the key against
// this map at render time. Missing key in es/fr falls back to en.
const HEADER_COPY = {
  en: {
    "VIN Checks": "VIN Checks",
    Tools: "Tools",
    Guides: "Guides",
    Pricing: "Pricing",
    Reviews: "Reviews",
    "History Checks": "History Checks",
    "More Checks": "More Checks",
    "Title & Registration": "Title & Registration",
    "Plate & Decode": "Plate & Decode",
    Calculators: "Calculators",
    "By Vehicle Type": "By Vehicle Type",
    "VIN Lookup": "VIN Lookup",
    "Brand VIN Lookup": "Brand VIN Lookup",
    "Brand Lookup": "Brand Lookup",
    "Popular Brands": "Popular Brands",
    "American Brands": "American Brands",
    Tesla: "Tesla",
    "Tesla Hubs": "Tesla Hubs",
    "Tesla by Model": "Tesla by Model",
    "Tesla by Gigafactory": "Tesla by Gigafactory",
    Compare: "Compare",
    Marketplace: "Marketplace",
    "VIN Check": "VIN Check",
    "Stolen Vehicle Check": "Stolen Vehicle Check",
    "Salvage Title Check": "Salvage Title Check",
    "Accident History": "Accident History",
    "Odometer Check": "Odometer Check",
    "Lemon Check": "Lemon Check",
    "Flood Check": "Flood Check",
    "Airbag Check": "Airbag Check",
    "Hail Damage Check": "Hail Damage Check",
    "Impound Check": "Impound Check",
    "Dealer Check": "Dealer Check",
    "Recall Check": "Recall Check",
    "Warranty Check": "Warranty Check",
    "Total Loss Check": "Total Loss Check",
    "Vehicle Lien Check": "Vehicle Lien Check",
    "Vehicle Registration": "Vehicle Registration",
    "Vehicle Title": "Vehicle Title",
    "Bill of Sale": "Bill of Sale",
    "VIN Check by State": "VIN Check by State",
    "Market Value": "Market Value",
    "Plate to VIN": "Plate to VIN",
    "State to VIN": "State to VIN",
    "License Plate Lookup": "License Plate Lookup",
    "Look Up Car Plates Free": "Look Up Car Plates Free",
    "VIN Decoder": "VIN Decoder",
    "Window Sticker Maker": "Window Sticker Maker",
    "Paint Code Lookup": "Paint Code Lookup",
    "OBD-II Code Lookup": "OBD-II Code Lookup",
    "Car Loan Calculator": "Car Loan Calculator",
    "Car Affordability": "Car Affordability",
    "Trade-In Estimator": "Trade-In Estimator",
    "Gas Mileage Calculator": "Gas Mileage Calculator",
    "Car Depreciation": "Car Depreciation",
    "Lease vs Buy": "Lease vs Buy",
    "Total Cost of Ownership": "Total Cost of Ownership",
    "Diminished Value": "Diminished Value",
    "Motorcycle VIN Search": "Motorcycle VIN Search",
    "Motorcycle VIN Check": "Motorcycle VIN Check",
    "RV VIN Check": "RV VIN Check",
    "Semi Truck VIN Lookup": "Semi Truck VIN Lookup",
    "Golf Cart VIN Lookup": "Golf Cart VIN Lookup",
    "HIN Lookup (Boat VIN)": "HIN Lookup (Boat VIN)",
    "Classic Car VIN": "Classic Car VIN",
    "Compare Vehicles": "Compare Vehicles",
    "VIN Number Lookup": "VIN Number Lookup",
    "Free VIN Lookup": "Free VIN Lookup",
    "VIN Code Lookup": "VIN Code Lookup",
    "Carfax VIN Lookup": "Carfax VIN Lookup",
    "KBB VIN Lookup": "KBB VIN Lookup",
    "DMV VIN Lookup": "DMV VIN Lookup",
    "VIN Owner Lookup": "VIN Owner Lookup",
    "VIN Lookup Texas": "VIN Lookup Texas",
    "VIN Lookup California": "VIN Lookup California",
    "Edmunds VIN Lookup": "Edmunds VIN Lookup",
    "J.D. Power VIN Lookup": "J.D. Power VIN Lookup",
    "AutoZone VIN Lookup": "AutoZone VIN Lookup",
    "O'Reilly VIN Lookup": "O'Reilly VIN Lookup",
    "Trailer VIN Lookup": "Trailer VIN Lookup",
    "ATV VIN Lookup": "ATV VIN Lookup",
    "Toyota VIN Lookup": "Toyota VIN Lookup",
    "Honda VIN Lookup": "Honda VIN Lookup",
    "Jeep VIN Lookup": "Jeep VIN Lookup",
    "GM VIN Lookup": "GM VIN Lookup",
    "Chevy VIN Lookup": "Chevy VIN Lookup",
    "RAM VIN Lookup": "RAM VIN Lookup",
    "Dodge VIN Lookup": "Dodge VIN Lookup",
    "Hyundai VIN Lookup": "Hyundai VIN Lookup",
    "Tesla VIN Decoder": "Tesla VIN Decoder",
    "Tesla VIN Lookup": "Tesla VIN Lookup",
    "Tesla VIN History Check": "Tesla VIN History Check",
    "Tesla Recall Check": "Tesla Recall Check",
    "Tesla Gigafactory Decoder": "Tesla Gigafactory Decoder",
    "Tesla Stolen Check": "Tesla Stolen Check",
    "Tesla Warranty Check": "Tesla Warranty Check",
    "Tesla Software / FSD Hardware": "Tesla Software / FSD Hardware",
    "Model 3 VIN Decoder": "Model 3 VIN Decoder",
    "Model Y VIN Decoder": "Model Y VIN Decoder",
    "Model S VIN Decoder": "Model S VIN Decoder",
    "Model X VIN Decoder": "Model X VIN Decoder",
    "Cybertruck VIN Decoder": "Cybertruck VIN Decoder",
    "Roadster VIN Decoder": "Roadster VIN Decoder",
    "Model 3 Recalls": "Model 3 Recalls",
    "Model Y Recalls": "Model Y Recalls",
    "Cybertruck Recalls": "Cybertruck Recalls",
    "Fremont (California)": "Fremont (California)",
    "Austin (Texas)": "Austin (Texas)",
    Shanghai: "Shanghai",
    "Berlin-Brandenburg": "Berlin-Brandenburg",
    "Model 3 History": "Model 3 History",
    "Model Y History": "Model Y History",
    "Model S History": "Model S History",
    "Model X History": "Model X History",
    "Cybertruck History": "Cybertruck History",
    "All VIN Guides": "All VIN Guides",
    "Free VIN Decoder": "Free VIN Decoder",
    "How to Read a VIN": "How to Read a VIN",
    "What Is a VIN Number": "What Is a VIN Number",
    "Used Car Buying Guide": "Used Car Buying Guide",
    "Vehicle Fraud Prevention": "Vehicle Fraud Prevention",
    "Road & Traffic Signs": "Road & Traffic Signs",
    "VIN Glossary": "VIN Glossary",
    Blog: "Blog",
    "vs. Carfax": "vs. Carfax",
    "vs. AutoCheck": "vs. AutoCheck",
    "vs. Bumper": "vs. Bumper",
    "vs. ClearVin": "vs. ClearVin",
    "vs. VinAudit": "vs. VinAudit",
    "Inspection Checklist": "Inspection Checklist",
    "All Marketplaces": "All Marketplaces",
    "Facebook Marketplace": "Facebook Marketplace",
    Craigslist: "Craigslist",
    OfferUp: "OfferUp",
    "eBay Motors": "eBay Motors",
    AutoTrader: "AutoTrader",
    Copart: "Copart",
    "Log in": "Log in",
    "Log out": "Log out",
    "My reports": "My reports",
    "Check VIN": "Check VIN",
    "Get Started": "Get Started",
    "Toggle menu": "Toggle menu",
  },
  es: {
    "VIN Checks": "Verificaciones VIN",
    Tools: "Herramientas",
    Guides: "Guías",
    Pricing: "Precios",
    Reviews: "Reseñas",
    "History Checks": "Historial",
    "More Checks": "Más verificaciones",
    "Title & Registration": "Título y registro",
    "Plate & Decode": "Placa y decodificación",
    Calculators: "Calculadoras",
    "By Vehicle Type": "Por tipo de vehículo",
    "VIN Lookup": "Búsqueda VIN",
    "Brand VIN Lookup": "Búsqueda VIN por marca",
    "Brand Lookup": "Por marca",
    "Popular Brands": "Marcas populares",
    "American Brands": "Marcas americanas",
    Tesla: "Tesla",
    "Tesla Hubs": "Tesla — Páginas principales",
    "Tesla by Model": "Tesla por modelo",
    "Tesla by Gigafactory": "Tesla por Gigafactory",
    Compare: "Comparar",
    Marketplace: "Marketplace",
    "VIN Check": "Verificación de VIN",
    "Stolen Vehicle Check": "Verificación de vehículo robado",
    "Salvage Title Check": "Verificación de título de salvamento",
    "Accident History": "Historial de accidentes",
    "Odometer Check": "Verificación de odómetro",
    "Lemon Check": "Verificación Ley Limón",
    "Flood Check": "Verificación de inundación",
    "Airbag Check": "Verificación de airbag",
    "Hail Damage Check": "Daño por granizo",
    "Impound Check": "Verificación de corralón",
    "Dealer Check": "Verificación de concesionario",
    "Recall Check": "Verificación de recall",
    "Warranty Check": "Verificación de garantía",
    "Total Loss Check": "Pérdida total",
    "Vehicle Lien Check": "Verificación de gravamen",
    "Vehicle Registration": "Registro de vehículo",
    "Vehicle Title": "Título de vehículo",
    "Bill of Sale": "Contrato de compraventa",
    "VIN Check by State": "Verificación VIN por estado",
    "Market Value": "Valor de mercado",
    "Plate to VIN": "Placa a VIN",
    "State to VIN": "Estado a VIN",
    "License Plate Lookup": "Búsqueda por placa",
    "Look Up Car Plates Free": "Consulta de placas gratis",
    "VIN Decoder": "Decodificador VIN",
    "Window Sticker Maker": "Etiqueta Monroney",
    "Paint Code Lookup": "Código de pintura",
    "OBD-II Code Lookup": "Códigos OBD-II",
    "Car Loan Calculator": "Calculadora de préstamo",
    "Car Affordability": "¿Cuánto puedo pagar?",
    "Trade-In Estimator": "Estimador de trade-in",
    "Gas Mileage Calculator": "Calculadora de gasolina",
    "Car Depreciation": "Depreciación",
    "Lease vs Buy": "Arrendar vs comprar",
    "Total Cost of Ownership": "Costo total de propiedad",
    "Diminished Value": "Valor disminuido",
    "Motorcycle VIN Search": "Búsqueda VIN de moto",
    "Motorcycle VIN Check": "Verificación VIN de moto",
    "RV VIN Check": "Verificación VIN de RV",
    "Semi Truck VIN Lookup": "VIN de camión pesado",
    "Golf Cart VIN Lookup": "VIN de carrito de golf",
    "HIN Lookup (Boat VIN)": "HIN de embarcación",
    "Classic Car VIN": "VIN auto clásico",
    "Compare Vehicles": "Comparar vehículos",
    "VIN Number Lookup": "Búsqueda de número VIN",
    "Free VIN Lookup": "Búsqueda VIN gratis",
    "VIN Code Lookup": "Búsqueda de código VIN",
    "Carfax VIN Lookup": "Búsqueda VIN Carfax",
    "KBB VIN Lookup": "Búsqueda VIN KBB",
    "DMV VIN Lookup": "Búsqueda VIN del DMV",
    "VIN Owner Lookup": "Búsqueda del titular por VIN",
    "VIN Lookup Texas": "Búsqueda VIN Texas",
    "VIN Lookup California": "Búsqueda VIN California",
    "Edmunds VIN Lookup": "Búsqueda VIN Edmunds",
    "J.D. Power VIN Lookup": "Búsqueda VIN J.D. Power",
    "AutoZone VIN Lookup": "Búsqueda VIN AutoZone",
    "O'Reilly VIN Lookup": "Búsqueda VIN O'Reilly",
    "Trailer VIN Lookup": "Búsqueda VIN remolque",
    "ATV VIN Lookup": "Búsqueda VIN ATV",
    "Toyota VIN Lookup": "Búsqueda VIN Toyota",
    "Honda VIN Lookup": "Búsqueda VIN Honda",
    "Jeep VIN Lookup": "Búsqueda VIN Jeep",
    "GM VIN Lookup": "Búsqueda VIN GM",
    "Chevy VIN Lookup": "Búsqueda VIN Chevy",
    "RAM VIN Lookup": "Búsqueda VIN RAM",
    "Dodge VIN Lookup": "Búsqueda VIN Dodge",
    "Hyundai VIN Lookup": "Búsqueda VIN Hyundai",
    "Tesla VIN Decoder": "Decodificador VIN Tesla",
    "Tesla VIN Lookup": "Búsqueda VIN Tesla",
    "Tesla VIN History Check": "Historial VIN Tesla",
    "Tesla Recall Check": "Recalls Tesla",
    "Tesla Gigafactory Decoder": "Decodificador de Gigafactory Tesla",
    "Tesla Stolen Check": "Tesla robado",
    "Tesla Warranty Check": "Garantía Tesla",
    "Tesla Software / FSD Hardware": "Software Tesla / Hardware FSD",
    "Model 3 VIN Decoder": "Decodificador VIN Model 3",
    "Model Y VIN Decoder": "Decodificador VIN Model Y",
    "Model S VIN Decoder": "Decodificador VIN Model S",
    "Model X VIN Decoder": "Decodificador VIN Model X",
    "Cybertruck VIN Decoder": "Decodificador VIN Cybertruck",
    "Roadster VIN Decoder": "Decodificador VIN Roadster",
    "Model 3 Recalls": "Recalls Model 3",
    "Model Y Recalls": "Recalls Model Y",
    "Cybertruck Recalls": "Recalls Cybertruck",
    "Fremont (California)": "Fremont (California)",
    "Austin (Texas)": "Austin (Texas)",
    Shanghai: "Shanghái",
    "Berlin-Brandenburg": "Berlín-Brandeburgo",
    "Model 3 History": "Historial Model 3",
    "Model Y History": "Historial Model Y",
    "Model S History": "Historial Model S",
    "Model X History": "Historial Model X",
    "Cybertruck History": "Historial Cybertruck",
    "All VIN Guides": "Todas las guías",
    "Free VIN Decoder": "Decodificador VIN gratis",
    "How to Read a VIN": "Cómo leer un VIN",
    "What Is a VIN Number": "¿Qué es un VIN?",
    "Used Car Buying Guide": "Guía de compra usado",
    "Vehicle Fraud Prevention": "Prevención de fraude",
    "Road & Traffic Signs": "Señales de tráfico",
    "VIN Glossary": "Glosario VIN",
    Blog: "Blog",
    "vs. Carfax": "vs. Carfax",
    "vs. AutoCheck": "vs. AutoCheck",
    "vs. Bumper": "vs. Bumper",
    "vs. ClearVin": "vs. ClearVin",
    "vs. VinAudit": "vs. VinAudit",
    "Inspection Checklist": "Checklist de inspección",
    "All Marketplaces": "Todos los marketplaces",
    "Facebook Marketplace": "Facebook Marketplace",
    Craigslist: "Craigslist",
    OfferUp: "OfferUp",
    "eBay Motors": "eBay Motors",
    AutoTrader: "AutoTrader",
    Copart: "Copart",
    "Log in": "Iniciar sesión",
    "Log out": "Cerrar sesión",
    "My reports": "Mis reportes",
    "Check VIN": "Revisar VIN",
    "Get Started": "Empezar",
    "Toggle menu": "Abrir menú",
  },
  fr: {
    "VIN Checks": "Vérifications VIN",
    Tools: "Outils",
    Guides: "Guides",
    Pricing: "Tarifs",
    Reviews: "Avis",
    "History Checks": "Historique",
    "More Checks": "Plus de vérifications",
    "Title & Registration": "Titre et immatriculation",
    "Plate & Decode": "Plaque et décodage",
    Calculators: "Calculateurs",
    "By Vehicle Type": "Par type de véhicule",
    "VIN Lookup": "Recherche VIN",
    "Brand VIN Lookup": "Recherche VIN par marque",
    "Brand Lookup": "Par marque",
    "Popular Brands": "Marques populaires",
    "American Brands": "Marques américaines",
    Tesla: "Tesla",
    "Tesla Hubs": "Tesla — Pages principales",
    "Tesla by Model": "Tesla par modèle",
    "Tesla by Gigafactory": "Tesla par Gigafactory",
    Compare: "Comparer",
    Marketplace: "Marketplace",
    "VIN Check": "Vérification VIN",
    "Stolen Vehicle Check": "Vérification véhicule volé",
    "Salvage Title Check": "Titre de récupération",
    "Accident History": "Historique d’accidents",
    "Odometer Check": "Vérification d’odomètre",
    "Lemon Check": "Vérification Loi Citron",
    "Flood Check": "Vérification d’inondation",
    "Airbag Check": "Vérification d’airbag",
    "Hail Damage Check": "Dégâts de grêle",
    "Impound Check": "Vérification de fourrière",
    "Dealer Check": "Vérification concessionnaire",
    "Recall Check": "Vérification de rappels",
    "Warranty Check": "Vérification de garantie",
    "Total Loss Check": "Perte totale",
    "Vehicle Lien Check": "Vérification de privilège",
    "Vehicle Registration": "Immatriculation du véhicule",
    "Vehicle Title": "Titre du véhicule",
    "Bill of Sale": "Acte de vente",
    "VIN Check by State": "Vérification VIN par état",
    "Market Value": "Valeur de marché",
    "Plate to VIN": "Plaque vers VIN",
    "State to VIN": "État vers VIN",
    "License Plate Lookup": "Recherche par plaque",
    "Look Up Car Plates Free": "Consulter plaques gratuit",
    "VIN Decoder": "Décodeur VIN",
    "Window Sticker Maker": "Étiquette Monroney",
    "Paint Code Lookup": "Code de peinture",
    "OBD-II Code Lookup": "Codes OBD-II",
    "Car Loan Calculator": "Calculateur de prêt auto",
    "Car Affordability": "Combien je peux payer ?",
    "Trade-In Estimator": "Estimateur de reprise",
    "Gas Mileage Calculator": "Calculateur d’essence",
    "Car Depreciation": "Dépréciation",
    "Lease vs Buy": "Louer vs acheter",
    "Total Cost of Ownership": "Coût total de propriété",
    "Diminished Value": "Valeur diminuée",
    "Motorcycle VIN Search": "Recherche VIN moto",
    "Motorcycle VIN Check": "Vérification VIN moto",
    "RV VIN Check": "Vérification VIN RV",
    "Semi Truck VIN Lookup": "VIN camion lourd",
    "Golf Cart VIN Lookup": "VIN voiturette de golf",
    "HIN Lookup (Boat VIN)": "HIN de bateau",
    "Classic Car VIN": "VIN voiture classique",
    "Compare Vehicles": "Comparer véhicules",
    "VIN Number Lookup": "Recherche de numéro VIN",
    "Free VIN Lookup": "Recherche VIN gratuite",
    "VIN Code Lookup": "Recherche de code VIN",
    "Carfax VIN Lookup": "Recherche VIN Carfax",
    "KBB VIN Lookup": "Recherche VIN KBB",
    "DMV VIN Lookup": "Recherche VIN du DMV",
    "VIN Owner Lookup": "Recherche du propriétaire par VIN",
    "VIN Lookup Texas": "Recherche VIN Texas",
    "VIN Lookup California": "Recherche VIN Californie",
    "Edmunds VIN Lookup": "Recherche VIN Edmunds",
    "J.D. Power VIN Lookup": "Recherche VIN J.D. Power",
    "AutoZone VIN Lookup": "Recherche VIN AutoZone",
    "O'Reilly VIN Lookup": "Recherche VIN O'Reilly",
    "Trailer VIN Lookup": "Recherche VIN remorque",
    "ATV VIN Lookup": "Recherche VIN ATV",
    "Toyota VIN Lookup": "Recherche VIN Toyota",
    "Honda VIN Lookup": "Recherche VIN Honda",
    "Jeep VIN Lookup": "Recherche VIN Jeep",
    "GM VIN Lookup": "Recherche VIN GM",
    "Chevy VIN Lookup": "Recherche VIN Chevy",
    "RAM VIN Lookup": "Recherche VIN RAM",
    "Dodge VIN Lookup": "Recherche VIN Dodge",
    "Hyundai VIN Lookup": "Recherche VIN Hyundai",
    "Tesla VIN Decoder": "Décodeur VIN Tesla",
    "Tesla VIN Lookup": "Recherche VIN Tesla",
    "Tesla VIN History Check": "Historique VIN Tesla",
    "Tesla Recall Check": "Rappels Tesla",
    "Tesla Gigafactory Decoder": "Décodeur Gigafactory Tesla",
    "Tesla Stolen Check": "Tesla volée",
    "Tesla Warranty Check": "Garantie Tesla",
    "Tesla Software / FSD Hardware": "Logiciel Tesla / Matériel FSD",
    "Model 3 VIN Decoder": "Décodeur VIN Model 3",
    "Model Y VIN Decoder": "Décodeur VIN Model Y",
    "Model S VIN Decoder": "Décodeur VIN Model S",
    "Model X VIN Decoder": "Décodeur VIN Model X",
    "Cybertruck VIN Decoder": "Décodeur VIN Cybertruck",
    "Roadster VIN Decoder": "Décodeur VIN Roadster",
    "Model 3 Recalls": "Rappels Model 3",
    "Model Y Recalls": "Rappels Model Y",
    "Cybertruck Recalls": "Rappels Cybertruck",
    "Fremont (California)": "Fremont (Californie)",
    "Austin (Texas)": "Austin (Texas)",
    Shanghai: "Shanghai",
    "Berlin-Brandenburg": "Berlin-Brandebourg",
    "Model 3 History": "Historique Model 3",
    "Model Y History": "Historique Model Y",
    "Model S History": "Historique Model S",
    "Model X History": "Historique Model X",
    "Cybertruck History": "Historique Cybertruck",
    "All VIN Guides": "Tous les guides",
    "Free VIN Decoder": "Décodeur VIN gratuit",
    "How to Read a VIN": "Comment lire un VIN",
    "What Is a VIN Number": "Qu’est-ce qu’un VIN ?",
    "Used Car Buying Guide": "Guide d’achat occasion",
    "Vehicle Fraud Prevention": "Prévention de fraude",
    "Road & Traffic Signs": "Panneaux routiers",
    "VIN Glossary": "Glossaire VIN",
    Blog: "Blog",
    "vs. Carfax": "vs. Carfax",
    "vs. AutoCheck": "vs. AutoCheck",
    "vs. Bumper": "vs. Bumper",
    "vs. ClearVin": "vs. ClearVin",
    "vs. VinAudit": "vs. VinAudit",
    "Inspection Checklist": "Checklist d’inspection",
    "All Marketplaces": "Tous les marketplaces",
    "Facebook Marketplace": "Facebook Marketplace",
    Craigslist: "Craigslist",
    OfferUp: "OfferUp",
    "eBay Motors": "eBay Motors",
    AutoTrader: "AutoTrader",
    Copart: "Copart",
    "Log in": "Connexion",
    "Log out": "Déconnexion",
    "My reports": "Mes rapports",
    "Check VIN": "Vérifier VIN",
    "Get Started": "Commencer",
    "Toggle menu": "Ouvrir le menu",
  },
} as const;

type HeaderCopyKey = keyof typeof HEADER_COPY["en"];

function tNav(locale: Locale, key: string): string {
  const dict = HEADER_COPY[locale] || HEADER_COPY.en;
  return (dict as Record<string, string>)[key] ?? key;
}

// ── Navigation model ─────────────────────────────────────────────────
// The primary nav is a Claude.ai-style mega-menu: a few top-level entries,
// each either a plain link or a dropdown of grouped columns. `external`
// items render as <a target="_blank"> with the SquareArrowOutUpRight icon
// (matching the off-domain affordance) instead of a prefetched <Link>.
//
// Keep the top-level labels/hrefs in sync with the SiteNavigationElement
// JSON-LD in src/app/layout.tsx so Google's sitelinks signal stays
// consistent — update both together.
interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}
interface NavColumn {
  heading: string;
  items: NavItem[];
}
type TopNav =
  | { kind: "link"; href: string; label: string; external?: boolean }
  | { kind: "menu"; label: string; columns: NavColumn[] };

const NAV: TopNav[] = [
  {
    kind: "menu",
    label: "VIN Checks",
    columns: [
      {
        heading: "History Checks",
        items: [
          { href: "/vin-check", label: "VIN Check" },
          { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
          { href: "/salvage-title-check", label: "Salvage Title Check" },
          { href: "/accident-history-check", label: "Accident History" },
          { href: "/odometer-check", label: "Odometer Check" },
          { href: "/lemon-check", label: "Lemon Check" },
          { href: "/flood-check", label: "Flood Check" },
        ],
      },
      {
        heading: "More Checks",
        items: [
          { href: "/airbag-check", label: "Airbag Check" },
          { href: "/hail-damage-check", label: "Hail Damage Check" },
          { href: "/impound-check", label: "Impound Check" },
          { href: "/dealer-check", label: "Dealer Check" },
          { href: "/recall-check", label: "Recall Check" },
          { href: "/warranty-check", label: "Warranty Check" },
          { href: "/total-loss-check", label: "Total Loss Check" },
          { href: "/vehicle-lien-check", label: "Vehicle Lien Check" },
        ],
      },
      {
        heading: "Title & Registration",
        items: [
          { href: "/vehicle-registration", label: "Vehicle Registration" },
          { href: "/vehicle-title", label: "Vehicle Title" },
          { href: "/bill-of-sale", label: "Bill of Sale" },
          { href: "/vin-check/state", label: "VIN Check by State" },
          { href: "/market-value", label: "Market Value" },
        ],
      },
    ],
  },
  {
    kind: "menu",
    label: "Tools",
    columns: [
      {
        heading: "Plate & Decode",
        items: [
          { href: "/plate-to-vin", label: "Plate to VIN" },
          { href: "/state-to-vin", label: "State to VIN" },
          { href: "/license-plate-lookup", label: "License Plate Lookup" },
          { href: "/look-up-car-plates-free", label: "Look Up Car Plates Free" },
          { href: "/vin-decoder", label: "VIN Decoder" },
          { href: "/window-sticker", label: "Window Sticker Maker" },
          { href: "/paint-code-lookup", label: "Paint Code Lookup" },
          { href: "/obd2-codes", label: "OBD-II Code Lookup" },
        ],
      },
      {
        heading: "Calculators",
        items: [
          { href: "/car-loan-calculator", label: "Car Loan Calculator" },
          { href: "/car-affordability-calculator", label: "Car Affordability" },
          { href: "/trade-in-value-estimator", label: "Trade-In Estimator" },
          { href: "/gas-mileage-calculator", label: "Gas Mileage Calculator" },
          { href: "/car-depreciation-calculator", label: "Car Depreciation" },
          { href: "/lease-vs-buy-calculator", label: "Lease vs Buy" },
          { href: "/total-cost-of-ownership-calculator", label: "Total Cost of Ownership" },
          { href: "/diminished-value-calculator", label: "Diminished Value" },
        ],
      },
      {
        heading: "By Vehicle Type",
        items: [
          { href: "/motorcycle-vin-search", label: "Motorcycle VIN Search" },
          { href: "/motorcycle-vin-check", label: "Motorcycle VIN Check" },
          { href: "/rv-vin-check", label: "RV VIN Check" },
          { href: "/semi-truck-vin-lookup", label: "Semi Truck VIN Lookup" },
          { href: "/golf-cart-vin-lookup", label: "Golf Cart VIN Lookup" },
          { href: "/hin-lookup", label: "HIN Lookup (Boat VIN)" },
          { href: "/classic-car-vin", label: "Classic Car VIN" },
          { href: "/compare-cars", label: "Compare Vehicles" },
        ],
      },
      {
        heading: "VIN Lookup",
        items: [
          { href: "/vin-number-lookup", label: "VIN Number Lookup" },
          { href: "/free-vin-lookup", label: "Free VIN Lookup" },
          { href: "/vin-code-lookup", label: "VIN Code Lookup" },
          { href: "/carfax-vin-lookup", label: "Carfax VIN Lookup" },
          { href: "/kbb-vin-lookup", label: "KBB VIN Lookup" },
          { href: "/edmunds-vin-lookup", label: "Edmunds VIN Lookup" },
          { href: "/jd-power-vin-lookup", label: "J.D. Power VIN Lookup" },
          { href: "/autozone-vin-lookup", label: "AutoZone VIN Lookup" },
          { href: "/oreilly-vin-lookup", label: "O'Reilly VIN Lookup" },
          { href: "/dmv-vin-lookup", label: "DMV VIN Lookup" },
          { href: "/vin-owner-lookup", label: "VIN Owner Lookup" },
          { href: "/trailer-vin-lookup", label: "Trailer VIN Lookup" },
          { href: "/atv-vin-lookup", label: "ATV VIN Lookup" },
          { href: "/vin-number-lookup-texas", label: "VIN Lookup Texas" },
          { href: "/vin-lookup-california", label: "VIN Lookup California" },
        ],
      },
    ],
  },
  {
    // Brand-specific VIN lookup pages get their own top-level mega-menu.
    // Previously nested as a 5th column inside Tools, which overflowed the
    // viewport at 100% zoom and hid the entire column. Promoted to top-level
    // so it always fits on laptop widths and has room to grow as we add more
    // brand pages (Ford, BMW, Nissan, VW, Kia, Subaru, Mazda planned next).
    kind: "menu",
    label: "Brand Lookup",
    columns: [
      {
        heading: "Popular Brands",
        items: [
          { href: "/toyota-vin-lookup", label: "Toyota VIN Lookup" },
          { href: "/honda-vin-lookup", label: "Honda VIN Lookup" },
          { href: "/jeep-vin-lookup", label: "Jeep VIN Lookup" },
          { href: "/hyundai-vin-lookup", label: "Hyundai VIN Lookup" },
        ],
      },
      {
        heading: "American Brands",
        items: [
          { href: "/gm-vin-lookup", label: "GM VIN Lookup" },
          { href: "/chevy-vin-lookup", label: "Chevy VIN Lookup" },
          { href: "/ram-vin-lookup", label: "RAM VIN Lookup" },
          { href: "/dodge-vin-lookup", label: "Dodge VIN Lookup" },
        ],
      },
    ],
  },
  {
    kind: "menu",
    label: "Tesla",
    columns: [
      {
        heading: "Tesla Hubs",
        items: [
          { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder" },
          { href: "/tesla-vin-lookup", label: "Tesla VIN Lookup" },
          { href: "/tesla-vin-history-check", label: "Tesla VIN History Check" },
          { href: "/tesla-recall-check", label: "Tesla Recall Check" },
          { href: "/tesla-gigafactory-by-vin", label: "Tesla Gigafactory Decoder" },
          { href: "/tesla-vin-stolen-check", label: "Tesla Stolen Check" },
          { href: "/tesla-warranty-check", label: "Tesla Warranty Check" },
          { href: "/tesla-software-update-check", label: "Tesla Software / FSD Hardware" },
        ],
      },
      {
        heading: "Tesla by Model",
        items: [
          { href: "/tesla-model-3-vin-decoder", label: "Model 3 VIN Decoder" },
          { href: "/tesla-model-y-vin-decoder", label: "Model Y VIN Decoder" },
          { href: "/tesla-model-s-vin-decoder", label: "Model S VIN Decoder" },
          { href: "/tesla-model-x-vin-decoder", label: "Model X VIN Decoder" },
          { href: "/tesla-cybertruck-vin-decoder", label: "Cybertruck VIN Decoder" },
          { href: "/tesla-roadster-vin-decoder", label: "Roadster VIN Decoder" },
          { href: "/tesla-model-3-recall-check", label: "Model 3 Recalls" },
          { href: "/tesla-model-y-recall-check", label: "Model Y Recalls" },
          { href: "/tesla-cybertruck-recall-check", label: "Cybertruck Recalls" },
        ],
      },
      {
        heading: "Tesla by Gigafactory",
        items: [
          { href: "/tesla-fremont-vin", label: "Fremont (California)" },
          { href: "/tesla-austin-vin", label: "Austin (Texas)" },
          { href: "/tesla-shanghai-vin", label: "Shanghai" },
          { href: "/tesla-berlin-vin", label: "Berlin-Brandenburg" },
          { href: "/tesla-model-3-history-check", label: "Model 3 History" },
          { href: "/tesla-model-y-history-check", label: "Model Y History" },
          { href: "/tesla-model-s-history-check", label: "Model S History" },
          { href: "/tesla-model-x-history-check", label: "Model X History" },
          { href: "/tesla-cybertruck-history-check", label: "Cybertruck History" },
        ],
      },
    ],
  },
  {
    kind: "menu",
    label: "Guides",
    columns: [
      {
        heading: "Guides",
        items: [
          { href: "/guides", label: "All VIN Guides" },
          { href: "/guides/free-vin-check", label: "Free VIN Decoder" },
          { href: "/guides/how-to-read-a-vin", label: "How to Read a VIN" },
          { href: "/guides/what-is-a-vin-number", label: "What Is a VIN Number" },
          { href: "/guides/used-car-buying-complete-guide", label: "Used Car Buying Guide" },
          { href: "/guides/vehicle-fraud-prevention", label: "Vehicle Fraud Prevention" },
          { href: "/road-traffic-signs", label: "Road & Traffic Signs" },
          { href: "/glossary", label: "VIN Glossary" },
          { href: "/blog", label: "Blog" },
        ],
      },
      {
        heading: "Compare",
        items: [
          { href: "/vin-check-vs-carfax", label: "vs. Carfax" },
          { href: "/vin-check-vs-autocheck", label: "vs. AutoCheck" },
          { href: "/vin-check-vs-bumper", label: "vs. Bumper" },
          { href: "/vin-check-vs-clearvin", label: "vs. ClearVin" },
          { href: "/vin-check-vs-vinaudit", label: "vs. VinAudit" },
          { href: "/used-car-inspection-checklist", label: "Inspection Checklist" },
        ],
      },
      {
        heading: "Marketplace",
        items: [
          { href: "/marketplace-vin-check", label: "All Marketplaces" },
          { href: "/marketplace-vin-check/facebook-marketplace", label: "Facebook Marketplace" },
          { href: "/marketplace-vin-check/craigslist", label: "Craigslist" },
          { href: "/marketplace-vin-check/offerup", label: "OfferUp" },
          { href: "/marketplace-vin-check/ebay-motors", label: "eBay Motors" },
          { href: "/marketplace-vin-check/autotrader", label: "AutoTrader" },
          { href: "/marketplace-vin-check/copart", label: "Copart" },
        ],
      },
    ],
  },
  { kind: "link", href: "/pricing", label: "Pricing" },
  { kind: "link", href: "https://reviews.carcheckervin.com", label: "Reviews", external: true },
];

// `logoHref` lets the parent (root layout) override where the brand logo links.
// On the reviews subdomain (reviews.carcheckervin.com) we pass the absolute www.
// URL so clicking the logo escapes back to the main site instead of looping
// the user back to the reviews page on the same subdomain.
export default function Header({ logoHref = "/" }: { logoHref?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = detectLocale(pathname || "/");
  const t = (k: string) => tNav(locale, k);

  const isAdmin =
    pathname === "/admin" || (pathname?.startsWith("/admin/") ?? false);
  const isOrder =
    pathname === "/order" || (pathname?.startsWith("/order/") ?? false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-hide header site-wide so it gets out of the way while reading.
  // While the mobile menu or a desktop dropdown is open we stay visible so
  // the open menu is reachable.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onAutoHideScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 80 || mobileOpen || openMenu) {
          setHidden(false);
        } else if (y > lastY + 6) {
          setHidden(true);
          setUserMenuOpen(false);
        } else if (y < lastY - 6) {
          setHidden(false);
        }
        lastY = y;
        ticking = false;
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) setHidden(false);
    };

    window.addEventListener("scroll", onAutoHideScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onAutoHideScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [mobileOpen, openMenu]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      subscription.unsubscribe();
    };
  }, []);

  // Close the dropdown on route change so it doesn't linger over the new page.
  // Done with the render-time "adjust state when a value changes" pattern
  // (React docs) rather than an effect — avoids a cascading-render pass.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }

  const handleLogout = async () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  // Hover open/close with a small close delay so moving the cursor from the
  // trigger to the panel (across the small gap) doesn't dismiss the menu.
  const openNow = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  if (isAdmin || isOrder) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-white/85 shadow-md shadow-primary/5 border-b border-outline-variant/30"
          : "bg-white border-b border-outline-variant/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ── Brand ── */}
        <Logo variant="onLight" size="md" href={logoHref} />

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((entry) => {
            if (entry.kind === "link") {
              return entry.external ? (
                <a
                  key={t(entry.label)}
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-on-surface/70 hover:text-primary rounded-lg hover:bg-surface-container transition-all duration-200"
                >
                  {t(entry.label)}
                  <SquareArrowOutUpRight className="w-3.5 h-3.5 opacity-70" />
                </a>
              ) : (
                <Link
                  key={t(entry.label)}
                  href={entry.href}
                  className="px-4 py-2 text-sm font-medium text-on-surface/70 hover:text-primary rounded-lg hover:bg-surface-container transition-all duration-200"
                >
                  {t(entry.label)}
                </Link>
              );
            }

            const isOpen = openMenu === entry.label;
            return (
              <div
                key={t(entry.label)}
                className="relative"
                onMouseEnter={() => openNow(entry.label)}
                onMouseLeave={closeSoon}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenMenu(isOpen ? null : entry.label)}
                  className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                    isOpen
                      ? "text-primary bg-surface-container"
                      : "text-on-surface/70 hover:text-primary hover:bg-surface-container"
                  }`}
                >
                  {t(entry.label)}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Mega-menu panel */}
                {isOpen && (
                  <div className="absolute left-0 top-full pt-3 z-50">
                    <div className="rounded-2xl bg-white shadow-2xl shadow-primary/10 border border-outline-variant/40 p-6 grid gap-x-10 gap-y-2"
                      style={{ gridTemplateColumns: `repeat(${entry.columns.length}, minmax(12rem, 1fr))` }}
                    >
                      {entry.columns.map((col) => (
                        <div key={t(col.heading)}>
                          <p className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant mb-3">
                            {t(col.heading)}
                          </p>
                          <ul className="space-y-0.5">
                            {col.items.map((item) => (
                              <li key={item.href}>
                                {item.external ? (
                                  <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 -mx-2 text-[15px] text-on-surface hover:text-primary hover:bg-primary/5 transition-colors"
                                  >
                                    {t(item.label)}
                                    <SquareArrowOutUpRight className="w-3.5 h-3.5 opacity-70" />
                                  </a>
                                ) : (
                                  <Link
                                    href={item.href}
                                    className="block rounded-lg px-2 py-1.5 -mx-2 text-[15px] text-on-surface hover:text-primary hover:bg-primary/5 transition-colors"
                                  >
                                    {t(item.label)}
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ── Desktop auth ── */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <LanguageSwitcher variant="header" />
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-surface-container transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold font-headline">
                  {user.email?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
                </div>
                <span className="text-sm font-medium text-on-surface max-w-[120px] truncate">
                  {user.email?.split("@")[0]}
                </span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/10 py-1 z-50">
                  <p className="px-4 py-2 text-xs text-outline truncate">{user.email}</p>
                  <div className="h-px bg-surface-container mx-2" />
                  <Link
                    href="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4" /> {t("My reports")}
                  </Link>
                  <div className="h-px bg-surface-container mx-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-error hover:bg-error-container/30 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> {t("Log out")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-on-surface/70 hover:text-primary transition-colors"
              >
                {t("Log in")}
              </Link>
              <Link
                href="/vin-check"
                className="group flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold text-on-primary bg-primary rounded-full hover:bg-primary-container transition-all shadow-md shadow-primary/20"
              >
                {t("Check VIN")} <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-on-surface/60 hover:text-primary transition-colors"
          aria-label={t("Toggle menu")}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-[85vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"}`}>
        <div className="px-5 py-4 space-y-1 bg-surface-container-lowest border-t border-outline-variant/10">
          {NAV.map((entry) => {
            if (entry.kind === "link") {
              return entry.external ? (
                <a
                  key={t(entry.label)}
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-on-surface/80 hover:text-primary rounded-xl hover:bg-surface-container transition-all"
                >
                  {t(entry.label)}
                  <SquareArrowOutUpRight className="w-3.5 h-3.5 opacity-70" />
                </a>
              ) : (
                <Link
                  key={t(entry.label)}
                  href={entry.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-on-surface/80 hover:text-primary rounded-xl hover:bg-surface-container transition-all"
                >
                  {t(entry.label)}
                </Link>
              );
            }

            const isOpen = mobileSection === entry.label;
            return (
              <div key={t(entry.label)}>
                <button
                  type="button"
                  onClick={() => setMobileSection(isOpen ? null : entry.label)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-on-surface/80 hover:text-primary rounded-xl hover:bg-surface-container transition-all cursor-pointer"
                >
                  {t(entry.label)}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="pl-3 pb-2 space-y-3">
                    {entry.columns.map((col) => (
                      <div key={t(col.heading)}>
                        <p className="px-4 pt-1 pb-1 text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
                          {t(col.heading)}
                        </p>
                        <ul>
                          {col.items.map((item) => (
                            <li key={item.href}>
                              {item.external ? (
                                <a
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-1.5 px-4 py-2 text-sm text-on-surface/75 hover:text-primary rounded-lg hover:bg-surface-container transition-colors"
                                >
                                  {t(item.label)}
                                  <SquareArrowOutUpRight className="w-3.5 h-3.5 opacity-70" />
                                </a>
                              ) : (
                                <Link
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block px-4 py-2 text-sm text-on-surface/75 hover:text-primary rounded-lg hover:bg-surface-container transition-colors"
                                >
                                  {t(item.label)}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-3 space-y-2 border-t border-outline-variant/10 mt-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-center px-5 py-3 text-sm font-semibold text-on-surface bg-surface-container rounded-xl"
                >
                  <FileText className="w-4 h-4" /> {t("My reports")}
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="block w-full text-center px-5 py-3 text-sm font-semibold text-error bg-error-container/20 rounded-xl cursor-pointer"
                >
                  {t("Log out")}
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-5 py-3 text-sm font-semibold text-on-surface/70 bg-surface-container rounded-xl">
                  {t("Log in")}
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-5 py-3 text-sm font-bold text-on-primary bg-primary rounded-full">
                  {t("Get Started")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
