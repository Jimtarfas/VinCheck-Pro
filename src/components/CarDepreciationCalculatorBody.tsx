/**
 * Shared body for /car-depreciation-calculator and /es/calculadora-depreciacion-auto.
 * Wave 18.19 — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import { Check, TrendingDown, TrendingUp, Wrench } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import CarDepreciationCalculator from "@/app/car-depreciation-calculator/CarDepreciationCalculator";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "Car Depreciation Calculator",
    h1: "Car Depreciation Calculator",
    intro:
      "See exactly how much your car will be worth in 1, 3, 5, 7, and 10 years. We use brand-specific depreciation curves for 30+ makes — so a Toyota projection looks different from a Land Rover, the way it should.",
    h2What: "What Is Car Depreciation?",
    what1:
      "Car depreciation is the loss of a vehicle\u2019s market value over time. It is the single largest cost of vehicle ownership for most buyers — typically larger than fuel, insurance, and maintenance combined over a 5-year hold.",
    what2:
      "The depreciation curve is steepest in the first year (a new car can lose ~20% of its value in 12 months), then flattens. By year five, the average vehicle retains about 50% of its original price; by year ten, around 28%. Specific brands, body styles, and use patterns can move that curve up or down significantly.",
    h2Why: "Why Cars Depreciate",
    whyItems: [
      {
        title: "New-car premium evaporates instantly",
        detail:
          "The moment a vehicle is titled, it converts from 'new' to 'used' — a status change worth 8–12% on its own, before any wear.",
      },
      {
        title: "Mechanical wear and component aging",
        detail:
          "Belts, bushings, suspension, batteries, and electronics all degrade with use. Buyers price-in expected near-term repair costs.",
      },
      {
        title: "Newer models replace older ones",
        detail:
          "Each model year adds tech, safety, and efficiency improvements that make older versions less desirable to mainstream buyers.",
      },
      {
        title: "Mileage accumulation",
        detail:
          "Industry-standard valuation models penalize vehicles with above-average miles for their age — typically about 0.5% per 1,000 excess miles per year of ownership.",
      },
      {
        title: "Brand reputation and reliability data",
        detail:
          "Long-term reliability rankings flow directly into resale value. Brands with widely-publicized reliability issues lose value faster than the segment average.",
      },
    ],
    h2Rates: "Average Depreciation Rates by Year",
    ratesIntro:
      "These industry-composite figures are the baseline our calculator uses before applying brand, body-style, and mileage adjustments:",
    rateHeaders: { age: "Age", retained: "% Retained", lost: "% Lost" },
    rateRows: [
      ["New (0 years)", "100%", "0%"],
      ["1 year", "80%", "−20%"],
      ["2 years", "70%", "−30%"],
      ["3 years", "63%", "−37%"],
      ["5 years", "50%", "−50%"],
      ["7 years", "40%", "−60%"],
      ["10 years", "28%", "−72%"],
    ] as ReadonlyArray<readonly [string, string, string]>,
    h2Best: "Brands That Hold Value Best",
    bestIntro: "These makes consistently retain more value than the segment average:",
    bestItems: [
      { brand: "Lexus", note: "+10% vs. average — Toyota reliability, luxury features" },
      { brand: "Porsche", note: "+10% — limited production, enthusiast demand" },
      { brand: "Toyota", note: "+8% — reliability reputation, strong used demand" },
      { brand: "Honda", note: "+7% — Civic and CR-V are resale champions" },
      { brand: "Subaru", note: "+6% — outdoor lifestyle appeal, AWD demand" },
      { brand: "Tesla", note: "+5% — strongest-holding EV brand" },
      { brand: "Jeep Wrangler", note: "+5% — iconic, dedicated buyer base" },
      { brand: "Mazda", note: "+4% — improving reliability and brand prestige" },
    ],
    h2Worst: "Brands That Depreciate Fastest",
    worstIntroPre:
      "These makes typically lose value faster than average — which can make them great ",
    worstIntroEm: "used-car",
    worstIntroSuffix: " bargains if you let someone else absorb the first-year hit:",
    worstItems: [
      { brand: "Land Rover", note: "−22% vs. average — repair costs scare resale buyers" },
      { brand: "Jaguar", note: "−20% — luxury British depreciation curve" },
      { brand: "Chrysler", note: "−15% — limited model lineup, brand uncertainty" },
      { brand: "Cadillac", note: "−15% — luxury sedan headwinds" },
      { brand: "Lincoln", note: "−16% — domestic luxury depreciation" },
      { brand: "Mini", note: "−14% — niche appeal, repair complexity" },
      { brand: "Infiniti", note: "−15% — brand visibility issues" },
      { brand: "BMW", note: "−8% — service costs hit resale" },
    ],
    h2Slow: "How to Slow Depreciation",
    slowItems: [
      "Keep annual mileage at or below 12,000 — used-car pricing tools penalize above-average miles aggressively.",
      "Follow the manufacturer's service schedule and keep documented receipts. A clean service history can add 3–7% at trade-in.",
      "Avoid accidents — a single accident report can knock 8% off resale value, even after professional repairs.",
      "Skip aftermarket modifications. Most buyers prefer stock vehicles; mods narrow your buyer pool and reduce value.",
      "Choose neutral exterior colors (white, silver, black, gray) — exotic colors limit resale demand.",
      "Garage-park whenever possible to protect paint, interior plastics, and battery health (especially for EVs).",
      "Consider buying a 2–3 year old certified pre-owned vehicle to skip the steepest part of the curve entirely.",
    ],
    crossLinks: [
      {
        href: "/car-loan-calculator",
        title: "Car Loan Calculator",
        desc: "Compare monthly payments and total interest",
        primary: true,
      },
      {
        href: "/trade-in-value-estimator",
        title: "Trade-In Value Estimator",
        desc: "See current private-party and dealer values",
        primary: false,
      },
      {
        href: "/car-affordability-calculator",
        title: "Affordability Calculator",
        desc: "Find your total car-buying budget",
        primary: false,
      },
      {
        href: "/gas-mileage-calculator",
        title: "Gas Mileage Calculator",
        desc: "Calculate fuel cost over your hold period",
        primary: false,
      },
    ],
    crossLinkCta: "Open →",
    h2Faq: "Frequently Asked Questions",
    faqs: [
      {
        q: "How much does a new car depreciate in the first year?",
        a: "A typical new car loses about 20% of its value in the first 12 months — roughly half of that drop happens the moment you drive it off the lot. After year one, the depreciation curve flattens, with the average vehicle losing about 10% per year through year five and 5–7% per year after that.",
      },
      {
        q: "Which car brands hold their value best?",
        a: "Lexus, Toyota, Honda, Porsche, Subaru, and Tesla consistently rank highest for value retention. Toyota and Honda benefit from reliability reputations and strong used-car demand. Porsche holds value due to limited production and enthusiast demand.",
      },
      {
        q: "Which cars depreciate the fastest?",
        a: "Land Rover, Jaguar, Maserati, BMW 7 Series, Mercedes-Benz S-Class, Cadillac, Lincoln, and Chrysler typically depreciate fastest. Luxury European sedans, large American luxury cars, and brands with reliability concerns tend to lose 50–60% of value in the first three years.",
      },
      {
        q: "Do electric vehicles (EVs) depreciate faster than gas cars?",
        a: "Most EVs historically depreciate faster than comparable gas vehicles due to rapid technology improvements, federal tax credit dynamics, and battery degradation concerns. Tesla is an exception and holds value relatively well.",
      },
      {
        q: "How does mileage affect car depreciation?",
        a: "The industry baseline is 12,000 miles per year. Each 1,000 miles above that average per year reduces value by approximately 0.5% per year of ownership. Low-mileage vehicles command a premium.",
      },
      {
        q: "Is it better to buy a new or used car to avoid depreciation?",
        a: "Buying a 2–3 year old used vehicle lets the original owner absorb the steepest depreciation hit. A 3-year-old certified pre-owned car typically costs 35–40% less than new, with most of the warranty period still intact.",
      },
      {
        q: "Do trucks and SUVs hold their value better than sedans?",
        a: "Yes, slightly. Full-size trucks and mid-size SUVs typically retain 5–10% more value over five years compared to sedans, driven by strong used-truck demand and outdoor lifestyle appeal.",
      },
      {
        q: "How can I reduce depreciation on my car?",
        a: "Keep mileage near 12,000/year, follow the manufacturer's service schedule with documented receipts, avoid accidents and aftermarket modifications, store the vehicle in a garage, and choose neutral colors which appeal to the broadest used-car buyer pool.",
      },
    ],
    bottomH2: "Buying Used? Check the VIN Before You Sign.",
    bottomBody:
      "Depreciation is predictable. Hidden accidents, salvage titles, and odometer rollback are not. Run a free VIN check on any used vehicle to see the full history before you commit.",
    bottomCta: "Run a Free VIN Check",
  },
  es: {
    home: "Inicio",
    crumb: "Calculadora de depreciación de auto",
    h1: "Calculadora de depreciación de auto",
    intro:
      "Ve exactamente cuánto valdrá tu auto en 1, 3, 5, 7 y 10 años. Usamos curvas de depreciación específicas por marca para más de 30 fabricantes — así una proyección de Toyota se ve diferente a una de Land Rover, como debe ser.",
    h2What: "¿Qué es la depreciación de un auto?",
    what1:
      "La depreciación de un auto es la pérdida del valor de mercado de un vehículo con el tiempo. Es el costo más grande de poseer un vehículo para la mayoría de los compradores — normalmente mayor que combustible, seguro y mantenimiento combinados en un periodo de 5 años.",
    what2:
      "La curva de depreciación es más pronunciada en el primer año (un auto nuevo puede perder ~20% de su valor en 12 meses), luego se aplana. Al quinto año, el vehículo promedio retiene cerca del 50% de su precio original; al décimo año, alrededor del 28%. Marcas específicas, tipos de carrocería y patrones de uso pueden mover esa curva hacia arriba o abajo de forma significativa.",
    h2Why: "Por qué los autos se deprecian",
    whyItems: [
      {
        title: "La prima de auto nuevo se evapora al instante",
        detail:
          "El momento en que un vehículo se titula, pasa de 'nuevo' a 'usado' — un cambio de estado que vale entre 8–12% por sí solo, antes de cualquier desgaste.",
      },
      {
        title: "Desgaste mecánico y envejecimiento de componentes",
        detail:
          "Correas, bujes, suspensión, baterías y electrónica se degradan con el uso. Los compradores incluyen en el precio los costos de reparación esperados a corto plazo.",
      },
      {
        title: "Modelos más nuevos reemplazan a los antiguos",
        detail:
          "Cada año-modelo añade mejoras en tecnología, seguridad y eficiencia que hacen que las versiones antiguas sean menos deseables para los compradores comunes.",
      },
      {
        title: "Acumulación de kilometraje",
        detail:
          "Los modelos estándar de valoración penalizan a los vehículos con kilometraje por encima del promedio para su edad — normalmente alrededor del 0.5% por cada 1,000 millas extra por año de propiedad.",
      },
      {
        title: "Reputación de la marca y datos de fiabilidad",
        detail:
          "Los rankings de fiabilidad a largo plazo se reflejan directamente en el valor de reventa. Las marcas con problemas de fiabilidad muy publicitados pierden valor más rápido que el promedio del segmento.",
      },
    ],
    h2Rates: "Tasas promedio de depreciación por año",
    ratesIntro:
      "Estas cifras compuestas de la industria son la base que usa nuestra calculadora antes de aplicar ajustes por marca, tipo de carrocería y kilometraje:",
    rateHeaders: { age: "Edad", retained: "% retenido", lost: "% perdido" },
    rateRows: [
      ["Nuevo (0 años)", "100%", "0%"],
      ["1 año", "80%", "−20%"],
      ["2 años", "70%", "−30%"],
      ["3 años", "63%", "−37%"],
      ["5 años", "50%", "−50%"],
      ["7 años", "40%", "−60%"],
      ["10 años", "28%", "−72%"],
    ] as ReadonlyArray<readonly [string, string, string]>,
    h2Best: "Marcas que mejor retienen su valor",
    bestIntro: "Estas marcas retienen constantemente más valor que el promedio del segmento:",
    bestItems: [
      { brand: "Lexus", note: "+10% vs. promedio — fiabilidad Toyota, funciones de lujo" },
      { brand: "Porsche", note: "+10% — producción limitada, demanda de entusiastas" },
      { brand: "Toyota", note: "+8% — reputación de fiabilidad, fuerte demanda usada" },
      { brand: "Honda", note: "+7% — Civic y CR-V son campeones de reventa" },
      { brand: "Subaru", note: "+6% — atractivo de estilo de vida al aire libre, demanda AWD" },
      { brand: "Tesla", note: "+5% — la marca de EV que mejor retiene valor" },
      { brand: "Jeep Wrangler", note: "+5% — icónico, base de compradores dedicada" },
      { brand: "Mazda", note: "+4% — mejorando en fiabilidad y prestigio de marca" },
    ],
    h2Worst: "Marcas que se deprecian más rápido",
    worstIntroPre:
      "Estas marcas normalmente pierden valor más rápido que el promedio — lo cual puede hacerlas excelentes gangas como ",
    worstIntroEm: "autos usados",
    worstIntroSuffix:
      " si dejas que otro absorba el golpe del primer año:",
    worstItems: [
      { brand: "Land Rover", note: "−22% vs. promedio — los costos de reparación asustan a los compradores" },
      { brand: "Jaguar", note: "−20% — curva de depreciación británica de lujo" },
      { brand: "Chrysler", note: "−15% — línea de modelos limitada, incertidumbre de marca" },
      { brand: "Cadillac", note: "−15% — vientos en contra del sedán de lujo" },
      { brand: "Lincoln", note: "−16% — depreciación de lujo doméstico" },
      { brand: "Mini", note: "−14% — atractivo de nicho, complejidad de reparación" },
      { brand: "Infiniti", note: "−15% — problemas de visibilidad de marca" },
      { brand: "BMW", note: "−8% — los costos de servicio afectan la reventa" },
    ],
    h2Slow: "Cómo reducir la depreciación",
    slowItems: [
      "Mantén el kilometraje anual en o por debajo de 12,000 millas — las herramientas de precio de autos usados penalizan agresivamente el kilometraje por encima del promedio.",
      "Sigue el calendario de servicio del fabricante y guarda los recibos documentados. Un historial de servicio limpio puede sumar 3–7% al momento de cambiar el auto.",
      "Evita accidentes — un solo reporte de accidente puede quitar el 8% del valor de reventa, incluso después de reparaciones profesionales.",
      "Evita las modificaciones de mercado secundario. La mayoría de los compradores prefiere vehículos de fábrica; las modificaciones reducen tu grupo de compradores y bajan el valor.",
      "Elige colores exteriores neutros (blanco, plateado, negro, gris) — los colores exóticos limitan la demanda de reventa.",
      "Estaciona en garaje siempre que puedas para proteger pintura, plásticos interiores y salud de la batería (especialmente en EVs).",
      "Considera comprar un vehículo certificado pre-poseído de 2–3 años para saltarte la parte más pronunciada de la curva por completo.",
    ],
    crossLinks: [
      {
        href: "/car-loan-calculator",
        title: "Calculadora de préstamo de auto",
        desc: "Compara pagos mensuales e interés total",
        primary: true,
      },
      {
        href: "/trade-in-value-estimator",
        title: "Estimador de valor de intercambio",
        desc: "Ve valores actuales de venta privada y de concesionario",
        primary: false,
      },
      {
        href: "/car-affordability-calculator",
        title: "Calculadora de asequibilidad",
        desc: "Encuentra tu presupuesto total para comprar auto",
        primary: false,
      },
      {
        href: "/gas-mileage-calculator",
        title: "Calculadora de rendimiento de gasolina",
        desc: "Calcula el costo de combustible durante tu periodo de propiedad",
        primary: false,
      },
    ],
    crossLinkCta: "Abrir →",
    h2Faq: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Cuánto se deprecia un auto nuevo en el primer año?",
        a: "Un auto nuevo típico pierde alrededor del 20% de su valor en los primeros 12 meses — aproximadamente la mitad de esa caída sucede en el momento en que sales del lote. Después del primer año, la curva de depreciación se aplana, con el vehículo promedio perdiendo cerca del 10% por año hasta el quinto año y entre 5–7% por año después de eso.",
      },
      {
        q: "¿Qué marcas de auto retienen mejor su valor?",
        a: "Lexus, Toyota, Honda, Porsche, Subaru y Tesla constantemente ocupan los primeros lugares en retención de valor. Toyota y Honda se benefician de su reputación de fiabilidad y la fuerte demanda de autos usados. Porsche mantiene su valor debido a su producción limitada y la demanda de entusiastas.",
      },
      {
        q: "¿Qué autos se deprecian más rápido?",
        a: "Land Rover, Jaguar, Maserati, BMW Serie 7, Mercedes-Benz Clase S, Cadillac, Lincoln y Chrysler normalmente se deprecian más rápido. Los sedanes europeos de lujo, los autos de lujo americanos grandes y las marcas con problemas de fiabilidad tienden a perder entre 50–60% del valor en los primeros tres años.",
      },
      {
        q: "¿Los vehículos eléctricos (EV) se deprecian más rápido que los autos de gasolina?",
        a: "Históricamente la mayoría de los EVs se deprecian más rápido que los vehículos de gasolina comparables debido a las mejoras rápidas de tecnología, la dinámica de los créditos fiscales federales y las preocupaciones por la degradación de la batería. Tesla es una excepción y mantiene su valor relativamente bien.",
      },
      {
        q: "¿Cómo afecta el kilometraje a la depreciación de un auto?",
        a: "La base de la industria es 12,000 millas por año. Cada 1,000 millas por encima de ese promedio por año reduce el valor en aproximadamente 0.5% por año de propiedad. Los vehículos con bajo kilometraje obtienen una prima.",
      },
      {
        q: "¿Es mejor comprar un auto nuevo o usado para evitar la depreciación?",
        a: "Comprar un vehículo usado de 2–3 años permite que el propietario original absorba el golpe más fuerte de depreciación. Un auto certificado pre-poseído de 3 años normalmente cuesta entre 35–40% menos que uno nuevo, con la mayor parte del periodo de garantía aún intacto.",
      },
      {
        q: "¿Las camionetas y SUVs retienen su valor mejor que los sedanes?",
        a: "Sí, ligeramente. Las camionetas grandes y los SUVs medianos normalmente retienen entre 5–10% más de valor a lo largo de cinco años en comparación con los sedanes, impulsadas por la fuerte demanda de camionetas usadas y el atractivo del estilo de vida al aire libre.",
      },
      {
        q: "¿Cómo puedo reducir la depreciación de mi auto?",
        a: "Mantén el kilometraje cerca de 12,000 al año, sigue el calendario de servicio del fabricante con recibos documentados, evita accidentes y modificaciones de mercado secundario, guarda el vehículo en un garaje y elige colores neutros que atraigan al grupo más amplio de compradores de autos usados.",
      },
    ],
    bottomH2: "¿Comprando usado? Verifica el VIN antes de firmar.",
    bottomBody:
      "La depreciación es predecible. Los accidentes ocultos, los títulos de salvamento y el fraude del odómetro no lo son. Ejecuta una verificación de VIN gratis en cualquier vehículo usado para ver el historial completo antes de comprometerte.",
    bottomCta: "Hacer una verificación VIN gratis",
  },
  fr: {
    home: "Accueil",
    crumb: "Calculateur de dépréciation auto",
    h1: "Calculateur de dépréciation auto",
    intro:
      "Vois exactement combien vaudra ta voiture dans 1, 3, 5, 7 et 10 ans. Nous utilisons des courbes de dépréciation spécifiques à la marque pour plus de 30 fabricants — ainsi, une projection Toyota est différente d'une Land Rover, comme il se doit.",
    h2What: "Qu'est-ce que la dépréciation d'une auto ?",
    what1:
      "La dépréciation d'une auto est la perte de valeur marchande d'un véhicule avec le temps. C'est le plus gros coût de possession d'un véhicule pour la plupart des acheteurs — typiquement plus important que le carburant, l'assurance et l'entretien combinés sur 5 ans.",
    what2:
      "La courbe de dépréciation est la plus abrupte la première année (une voiture neuve peut perdre ~20% de sa valeur en 12 mois), puis s'aplatit. À la cinquième année, le véhicule moyen conserve environ 50% de son prix d'origine ; à dix ans, environ 28%. Des marques spécifiques, des styles de carrosserie et des modes d'utilisation peuvent déplacer cette courbe vers le haut ou le bas de façon significative.",
    h2Why: "Pourquoi les autos se déprécient",
    whyItems: [
      {
        title: "La prime du neuf s'évapore instantanément",
        detail:
          "Au moment où un véhicule est immatriculé, il passe de 'neuf' à 'usagé' — un changement de statut qui vaut 8–12% à lui seul, avant toute usure.",
      },
      {
        title: "Usure mécanique et vieillissement des composants",
        detail:
          "Courroies, bagues, suspension, batteries et électronique se dégradent avec l'usage. Les acheteurs intègrent dans le prix les coûts de réparation à court terme attendus.",
      },
      {
        title: "Les nouveaux modèles remplacent les anciens",
        detail:
          "Chaque année-modèle ajoute des améliorations en technologie, sécurité et efficacité qui rendent les versions plus anciennes moins désirables pour les acheteurs grand public.",
      },
      {
        title: "Accumulation du kilométrage",
        detail:
          "Les modèles standards d'évaluation pénalisent les véhicules avec un kilométrage au-dessus de la moyenne pour leur âge — typiquement environ 0.5% par 1,000 milles excédentaires par année de possession.",
      },
      {
        title: "Réputation de la marque et données de fiabilité",
        detail:
          "Les classements de fiabilité à long terme se reflètent directement dans la valeur de revente. Les marques avec des problèmes de fiabilité largement médiatisés perdent de la valeur plus vite que la moyenne du segment.",
      },
    ],
    h2Rates: "Taux de dépréciation moyens par année",
    ratesIntro:
      "Ces chiffres composites de l'industrie sont la base utilisée par notre calculateur avant d'appliquer les ajustements par marque, style de carrosserie et kilométrage :",
    rateHeaders: { age: "Âge", retained: "% conservé", lost: "% perdu" },
    rateRows: [
      ["Neuf (0 ans)", "100%", "0%"],
      ["1 an", "80%", "−20%"],
      ["2 ans", "70%", "−30%"],
      ["3 ans", "63%", "−37%"],
      ["5 ans", "50%", "−50%"],
      ["7 ans", "40%", "−60%"],
      ["10 ans", "28%", "−72%"],
    ] as ReadonlyArray<readonly [string, string, string]>,
    h2Best: "Marques qui conservent le mieux leur valeur",
    bestIntro: "Ces marques conservent constamment plus de valeur que la moyenne du segment :",
    bestItems: [
      { brand: "Lexus", note: "+10% vs. moyenne — fiabilité Toyota, options de luxe" },
      { brand: "Porsche", note: "+10% — production limitée, demande des passionnés" },
      { brand: "Toyota", note: "+8% — réputation de fiabilité, forte demande en usagé" },
      { brand: "Honda", note: "+7% — Civic et CR-V sont des champions de la revente" },
      { brand: "Subaru", note: "+6% — attrait du mode de vie plein air, demande AWD" },
      { brand: "Tesla", note: "+5% — la marque EV qui conserve le mieux sa valeur" },
      { brand: "Jeep Wrangler", note: "+5% — iconique, base d'acheteurs dédiée" },
      { brand: "Mazda", note: "+4% — fiabilité et prestige de marque en hausse" },
    ],
    h2Worst: "Marques qui se déprécient le plus vite",
    worstIntroPre:
      "Ces marques perdent typiquement de la valeur plus vite que la moyenne — ce qui peut en faire d'excellentes aubaines en ",
    worstIntroEm: "auto usagée",
    worstIntroSuffix: " si tu laisses quelqu'un d'autre absorber le coup de la première année :",
    worstItems: [
      { brand: "Land Rover", note: "−22% vs. moyenne — les coûts de réparation font fuir les acheteurs" },
      { brand: "Jaguar", note: "−20% — courbe de dépréciation britannique de luxe" },
      { brand: "Chrysler", note: "−15% — gamme limitée, incertitude de marque" },
      { brand: "Cadillac", note: "−15% — vents contraires des berlines de luxe" },
      { brand: "Lincoln", note: "−16% — dépréciation de luxe domestique" },
      { brand: "Mini", note: "−14% — attrait de niche, complexité de réparation" },
      { brand: "Infiniti", note: "−15% — problèmes de visibilité de marque" },
      { brand: "BMW", note: "−8% — les coûts de service affectent la revente" },
    ],
    h2Slow: "Comment ralentir la dépréciation",
    slowItems: [
      "Maintiens le kilométrage annuel à 12,000 milles ou moins — les outils de prix d'autos usagées pénalisent agressivement le kilométrage au-dessus de la moyenne.",
      "Suis le calendrier d'entretien du fabricant et conserve les reçus documentés. Un historique d'entretien propre peut ajouter 3–7% à la reprise.",
      "Évite les accidents — un seul rapport d'accident peut retirer 8% de la valeur de revente, même après des réparations professionnelles.",
      "Saute les modifications de marché secondaire. La plupart des acheteurs préfèrent les véhicules d'origine ; les modifications réduisent ton bassin d'acheteurs et la valeur.",
      "Choisis des couleurs extérieures neutres (blanc, argent, noir, gris) — les couleurs exotiques limitent la demande de revente.",
      "Stationne dans un garage chaque fois que possible pour protéger la peinture, les plastiques intérieurs et la santé de la batterie (surtout pour les EVs).",
      "Considère acheter un véhicule certifié pré-possédé de 2–3 ans pour sauter complètement la partie la plus abrupte de la courbe.",
    ],
    crossLinks: [
      {
        href: "/car-loan-calculator",
        title: "Calculateur de prêt auto",
        desc: "Compare les paiements mensuels et l'intérêt total",
        primary: true,
      },
      {
        href: "/trade-in-value-estimator",
        title: "Estimateur de valeur de reprise",
        desc: "Vois les valeurs actuelles particulier et concessionnaire",
        primary: false,
      },
      {
        href: "/car-affordability-calculator",
        title: "Calculateur d'abordabilité",
        desc: "Trouve ton budget total d'achat auto",
        primary: false,
      },
      {
        href: "/gas-mileage-calculator",
        title: "Calculateur de consommation d'essence",
        desc: "Calcule le coût du carburant sur ta période de possession",
        primary: false,
      },
    ],
    crossLinkCta: "Ouvrir →",
    h2Faq: "Foire aux questions",
    faqs: [
      {
        q: "Combien une auto neuve se déprécie-t-elle la première année ?",
        a: "Une auto neuve typique perd environ 20% de sa valeur en 12 mois — environ la moitié de cette chute se produit au moment où tu sors du concessionnaire. Après la première année, la courbe de dépréciation s'aplatit, le véhicule moyen perdant environ 10% par année jusqu'à la cinquième année et 5–7% par année par la suite.",
      },
      {
        q: "Quelles marques conservent le mieux leur valeur ?",
        a: "Lexus, Toyota, Honda, Porsche, Subaru et Tesla se classent constamment en tête pour la rétention de valeur. Toyota et Honda bénéficient de leur réputation de fiabilité et de la forte demande en usagé. Porsche conserve sa valeur grâce à une production limitée et à la demande des passionnés.",
      },
      {
        q: "Quelles autos se déprécient le plus vite ?",
        a: "Land Rover, Jaguar, Maserati, BMW Série 7, Mercedes-Benz Classe S, Cadillac, Lincoln et Chrysler se déprécient typiquement le plus vite. Les berlines européennes de luxe, les grandes autos de luxe américaines et les marques avec des soucis de fiabilité ont tendance à perdre 50–60% de leur valeur les trois premières années.",
      },
      {
        q: "Les véhicules électriques (EV) se déprécient-ils plus vite que les autos à essence ?",
        a: "La plupart des EVs se déprécient historiquement plus vite que les véhicules à essence comparables en raison des améliorations technologiques rapides, de la dynamique des crédits d'impôt fédéraux et des préoccupations sur la dégradation de la batterie. Tesla fait exception et conserve sa valeur relativement bien.",
      },
      {
        q: "Comment le kilométrage affecte-t-il la dépréciation d'une auto ?",
        a: "La base de l'industrie est de 12,000 milles par année. Chaque 1,000 milles au-dessus de cette moyenne par année réduit la valeur d'environ 0.5% par année de possession. Les véhicules à faible kilométrage commandent une prime.",
      },
      {
        q: "Est-il préférable d'acheter neuf ou usagé pour éviter la dépréciation ?",
        a: "Acheter un véhicule usagé de 2–3 ans permet au propriétaire initial d'absorber la chute la plus abrupte. Une auto certifiée pré-possédée de 3 ans coûte typiquement 35–40% de moins qu'une neuve, avec la majeure partie de la garantie encore intacte.",
      },
      {
        q: "Les camions et VUS conservent-ils mieux leur valeur que les berlines ?",
        a: "Oui, légèrement. Les pleines grandeurs et les VUS intermédiaires conservent typiquement 5–10% de plus de valeur sur cinq ans par rapport aux berlines, portés par la forte demande de camions usagés et l'attrait du mode de vie plein air.",
      },
      {
        q: "Comment puis-je réduire la dépréciation de mon auto ?",
        a: "Maintiens le kilométrage près de 12,000/an, suis le calendrier d'entretien du fabricant avec reçus documentés, évite les accidents et les modifications de marché secondaire, stationne le véhicule dans un garage et choisis des couleurs neutres qui plaisent au plus grand bassin d'acheteurs d'autos usagées.",
      },
    ],
    bottomH2: "Tu achètes usagé ? Vérifie le VIN avant de signer.",
    bottomBody:
      "La dépréciation est prévisible. Les accidents cachés, les titres salvage et la fraude d'odomètre, non. Lance une vérification VIN gratuite sur tout véhicule usagé pour voir l'historique complet avant de t'engager.",
    bottomCta: "Lancer une vérification VIN gratuite",
  },
} as const;

interface Props {
  locale: Locale;
}

export default function CarDepreciationCalculatorBody({ locale }: Props) {
  const c = COPY[locale];
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);
  const homeHref = locale === "es" ? "/es" : "/";

  return (
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
        <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.intro}</p>

        {/* ── VIN Check card up top ── */}
        <div className="mt-6">
          <VinCheckBanner variant="card" />
        </div>

        {/* ── Calculator ── */}
        <div className="mt-8">
          <CarDepreciationCalculator locale={locale} />
        </div>

        {/* ── What is car depreciation ── */}
        <section id="what-is" className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2What}</h2>
          <p className="text-slate-700 leading-relaxed mb-3">{c.what1}</p>
          <p className="text-slate-700 leading-relaxed">{c.what2}</p>
        </section>

        {/* ── Why cars depreciate ── */}
        <section id="why-cars" className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2Why}</h2>
          <ul className="space-y-3">
            {c.whyItems.map(({ title, detail }) => (
              <li key={title} className="flex gap-3 items-start">
                <Wrench className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  <strong className="text-slate-900">{title}</strong> — {detail}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Average rates ── */}
        <section id="average-rates" className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2Rates}</h2>
          <p className="text-slate-700 leading-relaxed mb-5">{c.ratesIntro}</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">{c.rateHeaders.age}</th>
                  <th className="text-right px-4 py-3 font-medium">{c.rateHeaders.retained}</th>
                  <th className="text-right px-4 py-3 font-medium">{c.rateHeaders.lost}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {c.rateRows.map(([age, retained, lost]) => (
                  <tr key={age} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700">{age}</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-700">
                      {retained}
                    </td>
                    <td className="px-4 py-3 text-right text-rose-500">{lost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Best at retaining value ── */}
        <section id="best-value" className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2Best}</h2>
          <p className="text-slate-700 leading-relaxed mb-5">{c.bestIntro}</p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {c.bestItems.map(({ brand, note }) => (
              <li
                key={brand}
                className="flex gap-3 items-start p-3 bg-emerald-50 border border-emerald-200 rounded-xl"
              >
                <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  <strong className="text-slate-900">{brand}</strong>{" "}
                  <span className="text-slate-600">— {note}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Worst depreciators ── */}
        <section id="worst-value" className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2Worst}</h2>
          <p className="text-slate-700 leading-relaxed mb-5">
            {c.worstIntroPre}
            <em>{c.worstIntroEm}</em>
            {c.worstIntroSuffix}
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {c.worstItems.map(({ brand, note }) => (
              <li
                key={brand}
                className="flex gap-3 items-start p-3 bg-amber-50 border border-amber-200 rounded-xl"
              >
                <TrendingDown className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  <strong className="text-slate-900">{brand}</strong>{" "}
                  <span className="text-slate-700">— {note}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Lower-page banner ── */}
        <div className="mt-12">
          <VinCheckBanner variant="default" />
        </div>

        {/* ── How to slow depreciation ── */}
        <section id="slow-depreciation" className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2Slow}</h2>
          <ul className="space-y-3">
            {c.slowItems.map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Cross-link finance tools ── */}
        <div className="mt-12 grid sm:grid-cols-2 gap-3">
          {c.crossLinks.map((cl) => (
            <Link
              key={cl.href}
              href={link(cl.href)}
              className={
                cl.primary
                  ? "flex items-center justify-between gap-3 p-4 bg-primary-50 border border-primary-100 rounded-xl hover:bg-primary-100 transition-colors"
                  : "flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              }
            >
              <div>
                <p className="font-bold text-slate-900 text-sm">{cl.title}</p>
                <p className="text-xs text-slate-600 mt-0.5">{cl.desc}</p>
              </div>
              <span
                className={
                  cl.primary
                    ? "text-primary-600 font-bold text-xs"
                    : "text-slate-600 font-bold text-xs"
                }
              >
                {c.crossLinkCta}
              </span>
            </Link>
          ))}
        </div>

        {/* ── FAQ ── */}
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

        {/* ── Related ── */}
        <div className="mt-14">
          <RelatedChecks exclude="/car-depreciation-calculator" />
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200 mt-0">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.bottomH2}</h2>
          <p className="text-slate-600 mb-6">{c.bottomBody}</p>
          <Link
            href={link("/vin-check")}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            {c.bottomCta}
          </Link>
        </div>
      </section>
    </main>
  );
}

export { COPY as CAR_DEPRECIATION_COPY };
