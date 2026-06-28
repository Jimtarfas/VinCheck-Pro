/**
 * Shared body for /total-cost-of-ownership-calculator and its /es/ peer.
 * Wave 18.19 — full visual parity in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Check,
  TrendingDown,
  Fuel,
  Shield,
  Wrench,
  Percent,
  Receipt,
  AlertTriangle,
  Car,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import TotalCostOfOwnership from "@/app/total-cost-of-ownership-calculator/TotalCostOfOwnership";
import type { Locale } from "@/i18n/config";

const SEVEN_COST_ICONS = [
  TrendingDown,
  Percent,
  Fuel,
  Shield,
  Wrench,
  AlertTriangle,
  Receipt,
] as const;

const SEVEN_COST_COLORS = [
  "text-rose-600",
  "text-amber-600",
  "text-orange-600",
  "text-blue-600",
  "text-emerald-600",
  "text-purple-600",
  "text-slate-600",
] as const;

const COPY = {
  en: {
    home: "Home",
    crumb: "Total Cost of Ownership Calculator",
    h1: "Total Cost of Ownership Calculator",
    intro:
      "See the real 5-year cost of any vehicle — not just the sticker price. Combines depreciation, financing, fuel, insurance, maintenance, repairs, sales tax, and registration into one number you can actually use to compare cars.",
    h2WhySticker: "Why Sticker Price Lies",
    whyStickerP:
      "The MSRP on a window sticker is the single least useful number for comparing vehicles. Two cars at $35,000 can have ",
    whyStickerBold: "10-year TCOs that differ by $25,000+",
    whyStickerSuffix:
      " once depreciation, fuel economy, insurance class, and reliability are factored in. A $32,000 sedan from a high-resale brand can be cheaper to own over 5 years than a $28,000 sedan from a brand that depreciates fast and needs premium fuel.",
    stickerHeaderCost: "Cost",
    stickerHeaderSticker: "Sticker Price View",
    stickerHeaderTrue: "True 5-Year View",
    stickerRows: [
      ["What you focus on", "$35,000", "$45,000+"],
      ["What you actually pay", "Down + monthly", "Down + interest + fuel + ins + maint + repairs"],
      ["Worst hidden cost", "—", "Depreciation ($17k+)"],
      ["Visible at signing", "100%", "~30%"],
    ] as readonly (readonly [string, string, string])[],
    h2Seven: "The 7 Costs of Owning a Car",
    sevenCosts: [
      {
        label: "Depreciation",
        text: "The biggest hidden cost — your car loses 50% of value in 5 years. A $35,000 sedan typically depreciates $17,000+ over 60 months.",
      },
      {
        label: "Financing",
        text: "Interest paid on the loan plus opportunity cost on the down payment. At 6.5% APR over 5 years, expect $5,000–$7,000 in interest on a $30k loan.",
      },
      {
        label: "Fuel",
        text: "Annual mileage divided by MPG, multiplied by your local gas price. Range from $700/yr (EV) to $3,500/yr (large truck).",
      },
      {
        label: "Insurance",
        text: "Premiums vary by state, vehicle type, and driver record. National average is $1,800–$2,200/year and rising 6–8% annually.",
      },
      {
        label: "Maintenance",
        text: "Routine service: oil changes, tires, brakes, filters. $500–$1,400/year depending on the vehicle, with costs rising 40% after year 5.",
      },
      {
        label: "Repairs",
        text: "Unscheduled fixes — water pumps, suspension, electronics. Near zero in year one, $1,000+ by year five on the average vehicle.",
      },
      {
        label: "Taxes & Fees",
        text: "Sales tax (0–7.25% by state), annual registration ($150–$250 typical), title fees, and emissions inspections.",
      },
    ],
    h2ByType: "Average 5-Year Cost by Vehicle Type",
    byTypeIntro:
      "Based on 12,000 miles/year, a $30k–$45k purchase price, average insurance, and 60-month financing at 6.5% APR. Use as a quick benchmark when shopping.",
    byTypeHeaderType: "Vehicle Type",
    byTypeHeaderTco: "5-Year TCO",
    byTypeHeaderNotes: "Notes",
    byType: [
      { type: "Mid-size Sedan", tco: "$42,000–$48,000", note: "Best balance of price and efficiency" },
      { type: "Compact SUV", tco: "$48,000–$56,000", note: "Modest depreciation, family favorite" },
      { type: "Full-size SUV", tco: "$58,000–$68,000", note: "Higher fuel + insurance, slow depreciation" },
      { type: "Pickup Truck", tco: "$55,000–$62,000", note: "Best resale value of any segment" },
      { type: "Luxury Sedan", tco: "$65,000–$80,000", note: "Steep depreciation + premium fuel" },
      { type: "Electric Vehicle", tco: "$38,000–$45,000", note: "Lowest fuel & maintenance costs" },
      { type: "Sports Car", tco: "$52,000–$70,000", note: "Insurance & repairs are the wildcard" },
      { type: "Minivan", tco: "$48,000–$55,000", note: "Workhorse with strong fuel economy" },
    ],
    h2Reduce: "How to Reduce Your Total Cost of Ownership",
    reduceTips: [
      {
        title: "Buy 2-3 years used",
        detail:
          "The previous owner absorbs the steepest depreciation (20–35% by year 3). You get most of the warranty and modern features at 65% of MSRP.",
      },
      {
        title: "Pick high-resale brands",
        detail:
          "Toyota, Honda, Subaru, and certain Lexus models retain 55–65% of value after 5 years. Some luxury sedans drop to 30–35%. The brand alone can swing TCO by $10,000.",
      },
      {
        title: "Keep loan terms short",
        detail:
          "84-month loans look attractive monthly but pile on interest. A 60-month loan saves $2,000–$4,000 in interest vs 84 months on the same principal.",
      },
      {
        title: "Go EV if you have home charging",
        detail:
          "Fuel savings of $1,000–$1,500/yr plus 30–40% lower maintenance can make EVs the cheapest segment to own — provided you can charge at home.",
      },
      {
        title: "Run the VIN before buying used",
        detail:
          "Salvage titles, prior accidents, and odometer fraud can erase $5,000–$15,000 in value. A free VIN check takes 60 seconds and is the highest-ROI step in the entire process.",
      },
      {
        title: "Match vehicle to mileage",
        detail:
          "If you drive 25,000+ miles/year, a fuel-efficient sedan or hybrid will dominate any TCO comparison. If you drive 6,000 miles/year, fuel matters less and depreciation matters more.",
      },
      {
        title: "Shop insurance every year",
        detail:
          "Drivers who shop their policy annually save an average of $400/year. That's $2,000+ over the life of the vehicle for ten minutes of effort.",
      },
    ],
    crossLinks: [
      { href: "/car-loan-calculator", label: "Car Loan Calculator", sub: "Monthly payment & amortization" },
      { href: "/gas-mileage-calculator", label: "Gas Mileage Calculator", sub: "Fuel cost per mile, month, year" },
      { href: "/car-affordability-calculator", label: "Affordability Calculator", sub: "Max car price from income" },
    ],
    h2Faq: "Frequently Asked Questions",
    faqs: [
      {
        q: "What is total cost of ownership?",
        a: "TCO is the all-in dollar cost of a vehicle over a defined window (usually 5 years), including depreciation, financing, fuel, insurance, maintenance, repairs, sales tax, and registration. It's the only honest way to compare two cars.",
      },
      {
        q: "Why is depreciation usually the biggest cost?",
        a: "Most cars lose 20% of value in year one and 50% in five years. On a $35,000 vehicle that's $17,500 evaporated — typically more than fuel, insurance, and maintenance combined.",
      },
      {
        q: "What's the average 5-year cost of owning a car?",
        a: "About $45,000 for a mid-size sedan, $50–55k for SUVs, $55–60k for pickups, and $38–42k for EVs. Luxury cars can hit $70–80k.",
      },
      {
        q: "How accurate is this calculator?",
        a: "The math is exact for the assumptions you enter. Depreciation uses an industry-standard retention curve adjusted for vehicle type. Maintenance and repair forecasts use US average data. Plug in your real APR, insurance quote, and gas price for vehicle-specific accuracy.",
      },
      {
        q: "Are EVs really cheaper to own?",
        a: "Often yes after 5 years. EVs save $1,000–$1,500/yr on fuel and 30–40% on maintenance. Faster early depreciation is offset by federal tax credits in many cases. Use the side-by-side comparison to test for your numbers.",
      },
      {
        q: "Should I buy new or used to lower TCO?",
        a: "A 2-3 year old used vehicle from a reliable brand typically wins on 5-year TCO because you skip the worst depreciation years while keeping most of the warranty.",
      },
    ],
    bottomCtaHeading: "Found a Used Car? Verify the History First.",
    bottomCtaSub:
      "A salvage title, prior flood damage, or odometer rollback can wipe out your TCO advantage in a single repair. Run a free VIN check before you sign.",
    bottomCtaBtn: "Run a Free VIN Check",
  },
  es: {
    home: "Inicio",
    crumb: "Calculadora de costo total de propiedad",
    h1: "Calculadora de costo total de propiedad",
    intro:
      "Mira el costo real a 5 años de cualquier vehículo — no solo el precio de lista. Combina depreciación, financiamiento, combustible, seguro, mantenimiento, reparaciones, impuesto sobre ventas y registro en un solo número que realmente puedes usar para comparar autos.",
    h2WhySticker: "Por qué el precio de lista miente",
    whyStickerP:
      "El MSRP en la etiqueta de la ventana es el número menos útil para comparar vehículos. Dos autos a $35,000 pueden tener ",
    whyStickerBold: "TCO a 10 años que difieren por $25,000+",
    whyStickerSuffix:
      " una vez que se consideran la depreciación, la economía de combustible, la clase de seguro y la confiabilidad. Un sedán de $32,000 de una marca con buena reventa puede ser más barato de tener durante 5 años que un sedán de $28,000 de una marca que se deprecia rápido y necesita combustible premium.",
    stickerHeaderCost: "Costo",
    stickerHeaderSticker: "Vista de precio de lista",
    stickerHeaderTrue: "Vista real a 5 años",
    stickerRows: [
      ["En qué te enfocas", "$35,000", "$45,000+"],
      ["Lo que realmente pagas", "Enganche + mensualidad", "Enganche + interés + combustible + seguro + mant + reparaciones"],
      ["Peor costo oculto", "—", "Depreciación ($17k+)"],
      ["Visible al firmar", "100%", "~30%"],
    ] as readonly (readonly [string, string, string])[],
    h2Seven: "Los 7 costos de tener un auto",
    sevenCosts: [
      {
        label: "Depreciación",
        text: "El mayor costo oculto — tu auto pierde 50% de valor en 5 años. Un sedán de $35,000 típicamente se deprecia $17,000+ en 60 meses.",
      },
      {
        label: "Financiamiento",
        text: "Interés pagado en el préstamo más el costo de oportunidad sobre el enganche. Al 6.5% APR en 5 años, espera $5,000–$7,000 de interés en un préstamo de $30k.",
      },
      {
        label: "Combustible",
        text: "Millas anuales divididas por MPG, multiplicado por el precio local de gasolina. Rango desde $700/año (EV) hasta $3,500/año (camioneta grande).",
      },
      {
        label: "Seguro",
        text: "Las primas varían por estado, tipo de vehículo y historial del conductor. El promedio nacional es $1,800–$2,200/año y sube 6–8% anualmente.",
      },
      {
        label: "Mantenimiento",
        text: "Servicio de rutina: cambios de aceite, llantas, frenos, filtros. $500–$1,400/año según el vehículo, con costos subiendo 40% después del año 5.",
      },
      {
        label: "Reparaciones",
        text: "Arreglos no programados — bombas de agua, suspensión, electrónica. Casi cero en el año uno, $1,000+ para el año cinco en el vehículo promedio.",
      },
      {
        label: "Impuestos y tarifas",
        text: "Impuesto sobre ventas (0–7.25% por estado), registro anual ($150–$250 típico), tarifas de título e inspecciones de emisiones.",
      },
    ],
    h2ByType: "Costo promedio a 5 años por tipo de vehículo",
    byTypeIntro:
      "Basado en 12,000 millas/año, un precio de compra de $30k–$45k, seguro promedio y financiamiento a 60 meses al 6.5% APR. Úsalo como referencia rápida al comprar.",
    byTypeHeaderType: "Tipo de vehículo",
    byTypeHeaderTco: "TCO a 5 años",
    byTypeHeaderNotes: "Notas",
    byType: [
      { type: "Sedán mediano", tco: "$42,000–$48,000", note: "Mejor balance de precio y eficiencia" },
      { type: "SUV compacta", tco: "$48,000–$56,000", note: "Depreciación moderada, favorito familiar" },
      { type: "SUV grande", tco: "$58,000–$68,000", note: "Más combustible + seguro, depreciación lenta" },
      { type: "Camioneta pickup", tco: "$55,000–$62,000", note: "Mejor valor de reventa de cualquier segmento" },
      { type: "Sedán de lujo", tco: "$65,000–$80,000", note: "Depreciación fuerte + combustible premium" },
      { type: "Vehículo eléctrico", tco: "$38,000–$45,000", note: "Los costos más bajos de combustible y mantenimiento" },
      { type: "Auto deportivo", tco: "$52,000–$70,000", note: "El seguro y reparaciones son el comodín" },
      { type: "Minivan", tco: "$48,000–$55,000", note: "Caballo de batalla con buena economía de combustible" },
    ],
    h2Reduce: "Cómo reducir tu costo total de propiedad",
    reduceTips: [
      {
        title: "Compra con 2-3 años de uso",
        detail:
          "El dueño anterior absorbe la depreciación más fuerte (20–35% para el año 3). Obtienes la mayor parte de la garantía y características modernas al 65% del MSRP.",
      },
      {
        title: "Elige marcas con buena reventa",
        detail:
          "Toyota, Honda, Subaru y ciertos modelos Lexus retienen 55–65% del valor después de 5 años. Algunos sedanes de lujo bajan a 30–35%. La marca por sí sola puede cambiar el TCO por $10,000.",
      },
      {
        title: "Mantén los plazos de préstamo cortos",
        detail:
          "Los préstamos a 84 meses se ven atractivos mensualmente pero acumulan intereses. Un préstamo a 60 meses ahorra $2,000–$4,000 en intereses vs 84 meses sobre el mismo capital.",
      },
      {
        title: "Pásate a EV si tienes carga en casa",
        detail:
          "Los ahorros de combustible de $1,000–$1,500/año más 30–40% menos mantenimiento pueden hacer que los EV sean el segmento más barato de tener — siempre que puedas cargar en casa.",
      },
      {
        title: "Revisa el VIN antes de comprar usado",
        detail:
          "Títulos de salvamento, accidentes previos y fraude de odómetro pueden borrar $5,000–$15,000 de valor. Una verificación VIN gratis toma 60 segundos y es el paso de mayor ROI en todo el proceso.",
      },
      {
        title: "Empareja el vehículo con tu kilometraje",
        detail:
          "Si manejas 25,000+ millas/año, un sedán eficiente o híbrido dominará cualquier comparación de TCO. Si manejas 6,000 millas/año, el combustible importa menos y la depreciación importa más.",
      },
      {
        title: "Compara seguros cada año",
        detail:
          "Los conductores que comparan su póliza anualmente ahorran un promedio de $400/año. Eso son $2,000+ durante la vida del vehículo por diez minutos de esfuerzo.",
      },
    ],
    crossLinks: [
      { href: "/car-loan-calculator", label: "Calculadora de préstamo de auto", sub: "Pago mensual y amortización" },
      { href: "/gas-mileage-calculator", label: "Calculadora de millas por galón", sub: "Costo de combustible por milla, mes, año" },
      { href: "/car-affordability-calculator", label: "Calculadora de asequibilidad", sub: "Precio máximo de auto según ingreso" },
    ],
    h2Faq: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Qué es el costo total de propiedad?",
        a: "El TCO es el costo total en dólares de un vehículo durante una ventana definida (usualmente 5 años), incluyendo depreciación, financiamiento, combustible, seguro, mantenimiento, reparaciones, impuesto sobre ventas y registro. Es la única forma honesta de comparar dos autos.",
      },
      {
        q: "¿Por qué la depreciación suele ser el costo más grande?",
        a: "La mayoría de los autos pierden 20% de valor en el año uno y 50% en cinco años. En un vehículo de $35,000 eso son $17,500 evaporados — típicamente más que combustible, seguro y mantenimiento combinados.",
      },
      {
        q: "¿Cuál es el costo promedio a 5 años de tener un auto?",
        a: "Alrededor de $45,000 para un sedán mediano, $50–55k para SUVs, $55–60k para pickups y $38–42k para EVs. Los autos de lujo pueden llegar a $70–80k.",
      },
      {
        q: "¿Qué tan precisa es esta calculadora?",
        a: "Las matemáticas son exactas para los supuestos que ingreses. La depreciación usa una curva de retención estándar de la industria ajustada por tipo de vehículo. Los pronósticos de mantenimiento y reparaciones usan datos promedio de EE. UU. Ingresa tu APR real, cotización de seguro y precio de gasolina para precisión específica del vehículo.",
      },
      {
        q: "¿Los EV son realmente más baratos de tener?",
        a: "A menudo sí después de 5 años. Los EV ahorran $1,000–$1,500/año en combustible y 30–40% en mantenimiento. La depreciación temprana más rápida se compensa con créditos fiscales federales en muchos casos. Usa la comparación lado a lado para probar con tus números.",
      },
      {
        q: "¿Debería comprar nuevo o usado para bajar el TCO?",
        a: "Un vehículo usado de 2-3 años de una marca confiable típicamente gana en TCO a 5 años porque te saltas los peores años de depreciación mientras conservas la mayor parte de la garantía.",
      },
    ],
    bottomCtaHeading: "¿Encontraste un auto usado? Verifica el historial primero.",
    bottomCtaSub:
      "Un título de salvamento, daño previo por inundación o un rollback de odómetro pueden borrar tu ventaja de TCO en una sola reparación. Haz una verificación VIN gratis antes de firmar.",
    bottomCtaBtn: "Haz una verificación VIN gratis",
  },
  fr: {
    home: "Accueil",
    crumb: "Calculateur de coût total de propriété",
    h1: "Calculateur de coût total de propriété",
    intro:
      "Vois le vrai coût sur 5 ans de tout véhicule — pas seulement le prix affiché. Combine dépréciation, financement, carburant, assurance, entretien, réparations, taxe de vente et immatriculation en un seul chiffre que tu peux vraiment utiliser pour comparer des autos.",
    h2WhySticker: "Pourquoi le prix affiché ment",
    whyStickerP:
      "Le MSRP sur l'étiquette de fenêtre est le chiffre le moins utile pour comparer des véhicules. Deux autos à $35,000 peuvent avoir ",
    whyStickerBold: "des TCO sur 10 ans qui diffèrent de $25,000+",
    whyStickerSuffix:
      " une fois la dépréciation, l'économie de carburant, la classe d'assurance et la fiabilité prises en compte. Une berline de $32,000 d'une marque à bonne revente peut être moins chère à posséder sur 5 ans qu'une berline de $28,000 d'une marque qui se déprécie vite et nécessite du carburant premium.",
    stickerHeaderCost: "Coût",
    stickerHeaderSticker: "Vue prix affiché",
    stickerHeaderTrue: "Vraie vue 5 ans",
    stickerRows: [
      ["Sur quoi tu te concentres", "$35,000", "$45,000+"],
      ["Ce que tu paies vraiment", "Acompte + mensualité", "Acompte + intérêt + carburant + ass. + ent. + réparations"],
      ["Pire coût caché", "—", "Dépréciation ($17k+)"],
      ["Visible à la signature", "100%", "~30%"],
    ] as readonly (readonly [string, string, string])[],
    h2Seven: "Les 7 coûts de posséder une auto",
    sevenCosts: [
      {
        label: "Dépréciation",
        text: "Le plus gros coût caché — ton auto perd 50% de sa valeur en 5 ans. Une berline de $35,000 se déprécie typiquement de $17,000+ en 60 mois.",
      },
      {
        label: "Financement",
        text: "Intérêt payé sur le prêt plus coût d'opportunité sur l'acompte. À 6.5% APR sur 5 ans, attends-toi à $5,000–$7,000 d'intérêt sur un prêt de $30k.",
      },
      {
        label: "Carburant",
        text: "Kilométrage annuel divisé par MPG, multiplié par ton prix local d'essence. De $700/an (EV) à $3,500/an (gros camion).",
      },
      {
        label: "Assurance",
        text: "Les primes varient selon l'État, le type de véhicule et le dossier du conducteur. La moyenne nationale est de $1,800–$2,200/an et grimpe de 6–8% par année.",
      },
      {
        label: "Entretien",
        text: "Service de routine : vidanges, pneus, freins, filtres. $500–$1,400/an selon le véhicule, avec des coûts qui grimpent de 40% après l'année 5.",
      },
      {
        label: "Réparations",
        text: "Réparations imprévues — pompes à eau, suspension, électronique. Presque zéro la première année, $1,000+ à la cinquième année sur le véhicule moyen.",
      },
      {
        label: "Taxes et frais",
        text: "Taxe de vente (0–7.25% selon l'État), immatriculation annuelle ($150–$250 typique), frais de titre et inspections d'émissions.",
      },
    ],
    h2ByType: "Coût moyen sur 5 ans par type de véhicule",
    byTypeIntro:
      "Basé sur 12,000 milles/an, un prix d'achat de $30k–$45k, une assurance moyenne et un financement sur 60 mois à 6.5% APR. Utilise comme référence rapide au magasinage.",
    byTypeHeaderType: "Type de véhicule",
    byTypeHeaderTco: "TCO 5 ans",
    byTypeHeaderNotes: "Notes",
    byType: [
      { type: "Berline intermédiaire", tco: "$42,000–$48,000", note: "Meilleur équilibre prix-efficacité" },
      { type: "VUS compact", tco: "$48,000–$56,000", note: "Dépréciation modeste, favori familial" },
      { type: "VUS pleine grandeur", tco: "$58,000–$68,000", note: "Plus de carburant + assurance, dépréciation lente" },
      { type: "Camionnette pickup", tco: "$55,000–$62,000", note: "Meilleure valeur de revente de tout segment" },
      { type: "Berline de luxe", tco: "$65,000–$80,000", note: "Dépréciation abrupte + carburant premium" },
      { type: "Véhicule électrique", tco: "$38,000–$45,000", note: "Coûts de carburant et d'entretien les plus bas" },
      { type: "Auto sport", tco: "$52,000–$70,000", note: "Assurance et réparations sont la variable" },
      { type: "Fourgonnette", tco: "$48,000–$55,000", note: "Bête de somme avec bonne économie de carburant" },
    ],
    h2Reduce: "Comment réduire ton coût total de propriété",
    reduceTips: [
      {
        title: "Achète 2-3 ans usagé",
        detail:
          "Le propriétaire précédent absorbe la dépréciation la plus abrupte (20–35% à l'année 3). Tu obtiens la majeure partie de la garantie et des fonctionnalités modernes à 65% du MSRP.",
      },
      {
        title: "Choisis des marques à haute revente",
        detail:
          "Toyota, Honda, Subaru et certains modèles Lexus conservent 55–65% de leur valeur après 5 ans. Certaines berlines de luxe tombent à 30–35%. La marque seule peut faire varier le TCO de $10,000.",
      },
      {
        title: "Garde les durées de prêt courtes",
        detail:
          "Les prêts de 84 mois paraissent attrayants mensuellement mais accumulent l'intérêt. Un prêt de 60 mois économise $2,000–$4,000 en intérêt vs 84 mois sur le même capital.",
      },
      {
        title: "Passe à l'EV si tu as une recharge à domicile",
        detail:
          "Les économies de carburant de $1,000–$1,500/an plus 30–40% d'entretien en moins peuvent faire des EV le segment le moins cher à posséder — pourvu que tu puisses recharger à domicile.",
      },
      {
        title: "Vérifie le VIN avant d'acheter usagé",
        detail:
          "Titres salvage, accidents antérieurs et fraude d'odomètre peuvent effacer $5,000–$15,000 de valeur. Une vérification VIN gratuite prend 60 secondes et est l'étape au plus haut ROI de tout le processus.",
      },
      {
        title: "Adapte le véhicule au kilométrage",
        detail:
          "Si tu roules 25,000+ milles/an, une berline efficace ou hybride dominera toute comparaison TCO. Si tu roules 6,000 milles/an, le carburant importe moins et la dépréciation importe plus.",
      },
      {
        title: "Magasine l'assurance chaque année",
        detail:
          "Les conducteurs qui magasinent leur police chaque année économisent en moyenne $400/an. C'est $2,000+ sur la vie du véhicule pour dix minutes d'effort.",
      },
    ],
    crossLinks: [
      { href: "/car-loan-calculator", label: "Calculateur de prêt auto", sub: "Paiement mensuel et amortissement" },
      { href: "/gas-mileage-calculator", label: "Calculateur de consommation", sub: "Coût de carburant par mille, mois, an" },
      { href: "/car-affordability-calculator", label: "Calculateur d'abordabilité", sub: "Prix max d'auto selon revenu" },
    ],
    h2Faq: "Foire aux questions",
    faqs: [
      {
        q: "Qu'est-ce que le coût total de propriété ?",
        a: "Le TCO est le coût total en dollars d'un véhicule sur une période définie (généralement 5 ans), incluant dépréciation, financement, carburant, assurance, entretien, réparations, taxe de vente et immatriculation. C'est la seule façon honnête de comparer deux autos.",
      },
      {
        q: "Pourquoi la dépréciation est-elle généralement le plus gros coût ?",
        a: "La plupart des autos perdent 20% de leur valeur la première année et 50% en cinq ans. Sur un véhicule de $35,000, c'est $17,500 envolés — typiquement plus que le carburant, l'assurance et l'entretien combinés.",
      },
      {
        q: "Quel est le coût moyen sur 5 ans d'avoir une auto ?",
        a: "Environ $45,000 pour une berline intermédiaire, $50–55k pour les VUS, $55–60k pour les camionnettes et $38–42k pour les EVs. Les autos de luxe peuvent atteindre $70–80k.",
      },
      {
        q: "Quelle est la précision de ce calculateur ?",
        a: "Les calculs sont exacts pour les hypothèses que tu saisis. La dépréciation utilise une courbe de rétention standard de l'industrie ajustée par type de véhicule. Les prévisions d'entretien et de réparation utilisent les données moyennes américaines. Saisis ton APR réel, ta soumission d'assurance et ton prix d'essence pour une précision spécifique au véhicule.",
      },
      {
        q: "Les EV sont-ils vraiment moins chers à posséder ?",
        a: "Souvent oui après 5 ans. Les EV économisent $1,000–$1,500/an en carburant et 30–40% en entretien. La dépréciation précoce plus rapide est compensée par les crédits d'impôt fédéraux dans plusieurs cas. Utilise la comparaison côte à côte pour tester avec tes chiffres.",
      },
      {
        q: "Devrais-je acheter neuf ou usagé pour baisser le TCO ?",
        a: "Un véhicule usagé de 2-3 ans d'une marque fiable gagne typiquement le TCO sur 5 ans car tu sautes les pires années de dépréciation tout en conservant la majeure partie de la garantie.",
      },
    ],
    bottomCtaHeading: "Tu as trouvé une auto usagée ? Vérifie l'historique d'abord.",
    bottomCtaSub:
      "Un titre salvage, un dommage antérieur d'inondation ou un recul d'odomètre peuvent effacer ton avantage TCO en une seule réparation. Fais une vérification VIN gratuite avant de signer.",
    bottomCtaBtn: "Lancer une vérification VIN gratuite",
  },
} as const;

const FAQS_EN = [
  {
    question: "What is total cost of ownership (TCO) for a car?",
    answer:
      "Total cost of ownership is the all-in dollar amount you spend on a vehicle over a defined period, typically 5 years. It includes depreciation (the largest cost), loan interest, fuel, insurance, maintenance, unscheduled repairs, sales tax, and registration fees. Sticker price alone hides 60–70% of true cost.",
  },
  {
    question: "What is the average 5-year cost of owning a car?",
    answer:
      "The average 5-year TCO for a new mid-size sedan is roughly $45,000 — about $9,000/year or $750/month. SUVs run $50,000–$55,000, full-size trucks $55,000–$60,000, luxury vehicles $65,000–$80,000, and EVs $38,000–$42,000 once fuel and maintenance savings are counted.",
  },
  {
    question: "Why is depreciation usually the biggest cost?",
    answer:
      "A typical new car loses 20% of its value in year one and 50% by year five. On a $35,000 vehicle that's $17,500 lost to depreciation alone — usually more than fuel, insurance, and maintenance combined. Buying a 2-3 year old used vehicle lets the previous owner absorb most of this cost.",
  },
  {
    question: "How does this calculator compare to Edmunds or Kelley Blue Book True Cost to Own?",
    answer:
      "Edmunds True Cost to Own and KBB 5-Year Cost to Own use proprietary depreciation tables tied to specific year/make/model VIN data. Our calculator uses transparent assumptions you can edit yourself, so you can run scenarios neither of those tools support — different mileages, custom insurance quotes, your actual APR, your state's sales tax, and side-by-side comparison.",
  },
  {
    question: "Are EVs really cheaper to own than gas vehicles?",
    answer:
      "Often yes, after 5 years. EVs depreciate slightly faster than gas cars in years 1–3 but save $1,000–$1,500/year on fuel and 30–40% on maintenance (no oil changes, fewer brake replacements thanks to regen braking). Federal and state tax credits can also reduce the effective purchase price by $4,000–$7,500.",
  },
  {
    question: "What annual mileage should I use?",
    answer:
      "The US average is 13,500 miles/year. Use 12,000 if you have a short commute, 15,000–18,000 for a long commute or rideshare driving, and 20,000+ for sales reps or long-distance commuters. Higher mileage tilts TCO toward fuel-efficient and reliable vehicles.",
  },
  {
    question: "Why does insurance go up over time?",
    answer:
      "Insurance premiums have risen ~6–8% per year nationally since 2022 due to higher repair costs and severe weather claims. Our calculator applies a conservative 2% annual inflation. Your real-world increase may be higher — get a fresh quote each year and consider raising your deductible to control cost.",
  },
  {
    question: "How accurate are the maintenance and repair estimates?",
    answer:
      "Our estimates use industry averages: $500/yr for low-maintenance vehicles (e.g. Toyota, Honda), $800/yr average, $1,400/yr for high-maintenance brands (e.g. some European luxury). Unscheduled repairs ramp up with age — $0 in year one, climbing to $1,000+ by year five. Always check a vehicle's specific reliability data before buying.",
  },
  {
    question: "Should I buy new or used to lower TCO?",
    answer:
      "Buying a 2-3 year old used vehicle from a reliable brand typically delivers the lowest 5-year TCO because you avoid the steepest depreciation years (15–25% loss in year 1) while still getting most of the warranty and modern features. The exception is heavy-incentive new-car deals where dealer cash and 0% financing offset depreciation.",
  },
  {
    question: "Does this calculator account for opportunity cost on the down payment?",
    answer:
      "Yes — we apply a 5% annual opportunity cost on the down payment, since that money could otherwise have been invested. This is rolled into the financing line. It's a conservative estimate; if you'd otherwise have paid down high-interest debt, the real opportunity cost could be higher.",
  },
];

const FAQS_ES = [
  {
    question: "¿Qué es el costo total de propiedad (TCO) de un auto?",
    answer:
      "El costo total de propiedad es la cantidad total en dólares que gastas en un vehículo durante un período definido, típicamente 5 años. Incluye depreciación (el mayor costo), intereses del préstamo, combustible, seguro, mantenimiento, reparaciones no programadas, impuesto sobre ventas y tarifas de registro. El precio de lista por sí solo oculta 60–70% del costo real.",
  },
  {
    question: "¿Cuál es el costo promedio a 5 años de tener un auto?",
    answer:
      "El TCO promedio a 5 años para un sedán mediano nuevo es aproximadamente $45,000 — alrededor de $9,000/año o $750/mes. Las SUVs van de $50,000–$55,000, las camionetas grandes $55,000–$60,000, los vehículos de lujo $65,000–$80,000 y los EVs $38,000–$42,000 una vez que se cuentan los ahorros de combustible y mantenimiento.",
  },
  {
    question: "¿Por qué la depreciación suele ser el costo más grande?",
    answer:
      "Un auto nuevo típico pierde 20% de su valor en el año uno y 50% para el año cinco. En un vehículo de $35,000 eso son $17,500 perdidos solo en depreciación — usualmente más que combustible, seguro y mantenimiento combinados. Comprar un vehículo usado de 2-3 años le permite al dueño anterior absorber la mayor parte de este costo.",
  },
  {
    question: "¿Cómo se compara esta calculadora con Edmunds o Kelley Blue Book True Cost to Own?",
    answer:
      "Edmunds True Cost to Own y KBB 5-Year Cost to Own usan tablas de depreciación propietarias vinculadas a datos VIN específicos de año/marca/modelo. Nuestra calculadora usa supuestos transparentes que tú puedes editar, así que puedes correr escenarios que esas herramientas no soportan — diferentes kilometrajes, cotizaciones personalizadas de seguro, tu APR real, el impuesto sobre ventas de tu estado y comparación lado a lado.",
  },
  {
    question: "¿Los EV son realmente más baratos de tener que los vehículos de gasolina?",
    answer:
      "A menudo sí, después de 5 años. Los EV se deprecian un poco más rápido que los autos de gasolina en los años 1–3 pero ahorran $1,000–$1,500/año en combustible y 30–40% en mantenimiento (sin cambios de aceite, menos reemplazos de frenos gracias al frenado regenerativo). Los créditos fiscales federales y estatales también pueden reducir el precio efectivo de compra por $4,000–$7,500.",
  },
  {
    question: "¿Qué kilometraje anual debería usar?",
    answer:
      "El promedio en EE. UU. es 13,500 millas/año. Usa 12,000 si tienes un viaje corto, 15,000–18,000 para un viaje largo o conducción de rideshare y 20,000+ para representantes de ventas o personas con viajes de larga distancia. Mayor kilometraje inclina el TCO hacia vehículos eficientes en combustible y confiables.",
  },
  {
    question: "¿Por qué el seguro sube con el tiempo?",
    answer:
      "Las primas de seguro han subido ~6–8% por año a nivel nacional desde 2022 debido a mayores costos de reparación y reclamos por clima severo. Nuestra calculadora aplica una inflación conservadora de 2% anual. Tu aumento real puede ser mayor — obtén una cotización nueva cada año y considera subir tu deducible para controlar el costo.",
  },
  {
    question: "¿Qué tan precisos son los estimados de mantenimiento y reparaciones?",
    answer:
      "Nuestros estimados usan promedios de la industria: $500/año para vehículos de bajo mantenimiento (p. ej. Toyota, Honda), $800/año promedio, $1,400/año para marcas de alto mantenimiento (p. ej. algunos de lujo europeos). Las reparaciones no programadas suben con la edad — $0 en el año uno, subiendo a $1,000+ para el año cinco. Siempre revisa los datos específicos de confiabilidad de un vehículo antes de comprar.",
  },
  {
    question: "¿Debería comprar nuevo o usado para bajar el TCO?",
    answer:
      "Comprar un vehículo usado de 2-3 años de una marca confiable típicamente entrega el TCO más bajo a 5 años porque evitas los años de depreciación más fuertes (pérdida de 15–25% en el año 1) mientras conservas la mayor parte de la garantía y características modernas. La excepción son las ofertas de autos nuevos con grandes incentivos donde el efectivo del concesionario y el financiamiento al 0% compensan la depreciación.",
  },
  {
    question: "¿Esta calculadora toma en cuenta el costo de oportunidad del enganche?",
    answer:
      "Sí — aplicamos un costo de oportunidad anual de 5% sobre el enganche, ya que ese dinero podría haberse invertido. Esto se incluye en la línea de financiamiento. Es un estimado conservador; si de otro modo hubieras pagado deuda de alto interés, el costo de oportunidad real podría ser mayor.",
  },
];

interface Props {
  locale: Locale;
}

export default function TotalCostOfOwnershipBody({ locale }: Props) {
  const c = COPY[locale];
  const homeHref = locale === "es" ? "/es" : "/";
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: c.home, href: homeHref },
              { label: c.crumb },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            {c.intro}
          </p>

          {/* VIN Check card near top */}
          <div className="mt-8">
            <VinCheckBanner variant="card" />
          </div>

          {/* Calculator */}
          <div className="mt-10">
            <TotalCostOfOwnership locale={locale} />
          </div>

          {/* Why sticker price lies */}
          <section id="why-sticker-lies" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2WhySticker}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              {c.whyStickerP}
              <strong>{c.whyStickerBold}</strong>
              {c.whyStickerSuffix}
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">{c.stickerHeaderCost}</th>
                    <th className="text-right px-4 py-3 font-medium">{c.stickerHeaderSticker}</th>
                    <th className="text-right px-4 py-3 font-medium">{c.stickerHeaderTrue}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {c.stickerRows.map(([row, sticker, tco]) => (
                    <tr key={row} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-700">{row}</td>
                      <td className="px-4 py-3 text-right text-slate-700">{sticker}</td>
                      <td className="px-4 py-3 text-right font-bold text-primary-700">{tco}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 7 Costs */}
          <section id="what-is-tco" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">{c.h2Seven}</h2>
            <ul className="space-y-4">
              {c.sevenCosts.map(({ label, text }, i) => {
                const Icon = SEVEN_COST_ICONS[i];
                const color = SEVEN_COST_COLORS[i];
                return (
                  <li
                    key={label}
                    className="flex gap-3 items-start p-4 bg-white border border-slate-200 rounded-xl"
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${color}`} />
                    <div>
                      <p className="font-bold text-slate-900">{label}</p>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">{text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* VIN Check default banner lower */}
          <div className="mt-12">
            <VinCheckBanner variant="default" />
          </div>

          {/* Average TCO by vehicle type */}
          <section id="tco-by-type" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2ByType}</h2>
            <p className="text-slate-600 leading-relaxed mb-5">{c.byTypeIntro}</p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">{c.byTypeHeaderType}</th>
                    <th className="text-right px-4 py-3 font-medium">{c.byTypeHeaderTco}</th>
                    <th className="text-left px-4 py-3 font-medium">{c.byTypeHeaderNotes}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {c.byType.map(({ type, tco, note }) => (
                    <tr key={type} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-800 font-medium">{type}</td>
                      <td className="px-4 py-3 text-right font-bold text-primary-700">{tco}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* How to reduce TCO */}
          <section id="reduce-tco" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">{c.h2Reduce}</h2>
            <ul className="space-y-3">
              {c.reduceTips.map(({ title, detail }) => (
                <li key={title} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{title}</strong> — {detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Cross-links */}
          <div className="mt-12 grid sm:grid-cols-3 gap-3">
            {c.crossLinks.map(({ href, label, sub }) => (
              <Link
                key={href}
                href={link(href)}
                className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div>
                  <p className="font-bold text-slate-900 text-sm">{label}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{sub}</p>
                </div>
                <span className="text-slate-500 font-bold text-xs flex-shrink-0">→</span>
              </Link>
            ))}
          </div>

          {/* FAQ */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{c.h2Faq}</h2>
            <dl className="space-y-6">
              {c.faqs.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Related */}
          <div className="mt-14">
            <RelatedChecks exclude="/total-cost-of-ownership-calculator" />
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.bottomCtaHeading}</h2>
          <p className="text-slate-600 mb-6">{c.bottomCtaSub}</p>
          <Link
            href={link("/vin-check")}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            <Car className="w-4 h-4" />
            {c.bottomCtaBtn}
          </Link>
        </div>
      </section>
    </>
  );
}

export { FAQS_EN, FAQS_ES };
