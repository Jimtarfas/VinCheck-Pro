/**
 * Shared body for /gas-mileage-calculator and /es/gas-mileage-calculator.
 * Wave 18 — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import { Check, TrendingDown } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import GasMileageCalculator from "@/app/gas-mileage-calculator/GasMileageCalculator";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "Gas Mileage Cost Calculator",
    h1: "Gas Mileage Cost Calculator",
    intro:
      "Calculate exactly how much you spend on gas — per day, per month, and per year. Enter your MPG, miles driven, and local gas price. Includes road trip mode, all 50 US state price averages, and a vehicle comparison with break-even analysis.",
    h2Reference: "Annual Fuel Cost by Vehicle Type",
    referenceIntro:
      "Based on 13,500 miles/year at the US average of $3.45/gallon. Use as a quick benchmark when shopping for a new or used vehicle.",
    refColType: "Vehicle Type",
    refColMpg: "Typical MPG",
    refColAnnual: "Est. Annual Cost",
    referenceRows: [
      { type: "Large SUV / Truck", mpg: "15–20", annual: "$2,330–$3,105" },
      { type: "Midsize SUV", mpg: "22–27", annual: "$1,680–$2,060" },
      { type: "Compact Car", mpg: "28–35", annual: "$1,290–$1,620" },
      { type: "Hybrid (non-plug-in)", mpg: "45–55", annual: "$820–$1,000" },
      { type: "Plug-in Hybrid (PHEV)", mpg: "50–80*", annual: "$560–$900*" },
      { type: "Electric Vehicle (EV)", mpg: "100–130 MPGe", annual: "$500–$700†" },
    ],
    referenceNote:
      "* PHEV figure assumes 40% electric miles. † EV figure uses electricity at $0.14/kWh national average.",
    h2Improve: "How to Improve Your Gas Mileage",
    improveTips: [
      { title: "Keep tires properly inflated", detail: "Under-inflated tires increase rolling resistance and reduce MPG by up to 3%. Check your tire pressure monthly — the correct PSI is on the door jamb sticker, not the tire sidewall." },
      { title: "Accelerate and brake gradually", detail: "Aggressive acceleration and hard braking can reduce fuel economy by 15–30% in city driving. Smooth, gradual inputs are the single most effective driver behavior change for saving gas." },
      { title: "Use cruise control on highways", detail: "Maintaining a steady speed on the highway can improve fuel economy by 7–14% compared to variable speed driving. Most effective on flat terrain." },
      { title: "Replace air filters on schedule", detail: "A clogged engine air filter can reduce power and efficiency by up to 10%. Most manufacturers recommend replacement every 15,000–30,000 miles." },
      { title: "Reduce highway speed", detail: "Fuel economy drops sharply above 55 mph. Each 5 mph over 55 costs roughly 7–14% more in fuel. On a long trip at 75 mph vs 65 mph, you might burn 15–20% more gas." },
      { title: "Remove excess weight", detail: "Every 100 lbs of extra weight reduces MPG by about 1%. Remove heavy items from the trunk that aren't needed." },
    ],
    h2GasVsHybrid: "Gas Car vs Hybrid — Is the Upgrade Worth It?",
    gasVsHybridIntro:
      "Hybrid vehicles typically cost $3,000–$6,000 more than their non-hybrid counterparts but save $600–$1,000/year in fuel at average US driving habits. The break-even point is typically 4–8 years — well within a typical 10–12 year vehicle ownership period.",
    gvhColScenario: "Scenario",
    gvhColGas: "Gas (28 MPG)",
    gvhColHybrid: "Hybrid (50 MPG)",
    gvhColSavings: "Annual Savings",
    gvhRows: [
      ["10,000 mi/yr", "$1,232", "$689", "$543"],
      ["13,500 mi/yr (avg)", "$1,663", "$931", "$732"],
      ["20,000 mi/yr", "$2,464", "$1,380", "$1,084"],
      ["25,000 mi/yr", "$3,080", "$1,725", "$1,355"],
    ],
    gvhTipBoldLead: "Tip:",
    gvhTipBody:
      " Use the vehicle comparison mode in the calculator above to find the exact break-even months for your specific driving habits and the price difference between the vehicles you're considering.",
    crossLinks: [
      { href: "/car-loan-calculator", label: "Car Loan Calculator", sub: "Monthly payment & amortization" },
      { href: "/car-affordability-calculator", label: "Affordability Calculator", sub: "Max car price from income" },
      { href: "/trade-in-value-estimator", label: "Trade-In Estimator", sub: "What's your car worth?" },
    ],
    h2Faq: "Frequently Asked Questions",
    faqs: [
      { q: "How do I calculate my gas cost per mile?", a: "Gas cost per mile = gas price ÷ MPG. At $3.50/gallon and 28 MPG, that's $0.125 per mile. Our calculator shows this automatically alongside monthly and annual totals." },
      { q: "How much does the average American spend on gas per month?", a: "About $138–$150/month based on 13,500 miles/year at 28 MPG and $3.45/gallon. High-mileage commuters or owners of large trucks and SUVs can spend $250–$400/month." },
      { q: "How do I find my car's MPG?", a: "Check the yellow EPA fuel economy sticker from when the car was new, your owner's manual, or search by year/make/model at fueleconomy.gov. For a real-world measurement: fill up completely, drive 100+ miles, refill, then divide miles driven by gallons used." },
      { q: "Why is my real MPG lower than the EPA rating?", a: "EPA ratings are measured under controlled test conditions. Real-world MPG is typically 5–20% lower due to aggressive driving, cold weather, AC use, cargo weight, and road grade. City driving hits MPG hardest; highway driving is usually closest to the EPA highway rating." },
    ],
    bottomHeading: "Shopping for a More Efficient Car?",
    bottomBody:
      "Before you buy, run a free VIN check to make sure the vehicle's history is clean — a flood-damaged or accident-repaired car can have hidden engine and fuel system issues that hurt real-world MPG.",
    bottomCta: "Run a Free VIN Check",
  },
  es: {
    home: "Inicio",
    crumb: "Calculadora de costo de combustible",
    h1: "Calculadora de costo de combustible",
    intro:
      "Calcula exactamente cuánto gastas en gasolina — por día, por mes y por año. Ingresa tu MPG, las millas recorridas y el precio local de la gasolina. Incluye modo de viaje por carretera, promedios de precio para los 50 estados de EE. UU. y una comparación de vehículos con análisis de punto de equilibrio.",
    h2Reference: "Costo anual de combustible por tipo de vehículo",
    referenceIntro:
      "Basado en 13,500 millas/año al promedio de EE. UU. de $3.45/galón. Úsalo como referencia rápida cuando compres un vehículo nuevo o usado.",
    refColType: "Tipo de vehículo",
    refColMpg: "MPG típico",
    refColAnnual: "Costo anual est.",
    referenceRows: [
      { type: "SUV grande / Camioneta", mpg: "15–20", annual: "$2,330–$3,105" },
      { type: "SUV mediana", mpg: "22–27", annual: "$1,680–$2,060" },
      { type: "Auto compacto", mpg: "28–35", annual: "$1,290–$1,620" },
      { type: "Híbrido (no enchufable)", mpg: "45–55", annual: "$820–$1,000" },
      { type: "Híbrido enchufable (PHEV)", mpg: "50–80*", annual: "$560–$900*" },
      { type: "Vehículo eléctrico (EV)", mpg: "100–130 MPGe", annual: "$500–$700†" },
    ],
    referenceNote:
      "* La cifra de PHEV asume 40% de millas eléctricas. † La cifra de EV usa electricidad a $0.14/kWh del promedio nacional.",
    h2Improve: "Cómo mejorar tu rendimiento de combustible",
    improveTips: [
      { title: "Mantén las llantas correctamente infladas", detail: "Las llantas con baja presión aumentan la resistencia al rodar y reducen el MPG hasta 3%. Revisa la presión de tus llantas mensualmente — el PSI correcto está en la calcomanía del marco de la puerta, no en el costado de la llanta." },
      { title: "Acelera y frena gradualmente", detail: "La aceleración agresiva y el frenado fuerte pueden reducir la eficiencia de combustible 15–30% en manejo de ciudad. Las entradas suaves y graduales son el cambio de comportamiento del conductor más efectivo para ahorrar gasolina." },
      { title: "Usa el control crucero en carretera", detail: "Mantener una velocidad constante en la carretera puede mejorar la eficiencia de combustible 7–14% comparado con manejo a velocidad variable. Más efectivo en terreno plano." },
      { title: "Reemplaza los filtros de aire según el calendario", detail: "Un filtro de aire del motor obstruido puede reducir la potencia y eficiencia hasta 10%. La mayoría de los fabricantes recomiendan reemplazo cada 15,000–30,000 millas." },
      { title: "Reduce la velocidad en carretera", detail: "La eficiencia de combustible cae fuertemente arriba de 55 mph. Cada 5 mph sobre 55 cuesta aproximadamente 7–14% más en combustible. En un viaje largo a 75 mph vs 65 mph, podrías quemar 15–20% más gasolina." },
      { title: "Quita el peso excesivo", detail: "Cada 100 libras de peso extra reduce el MPG aproximadamente 1%. Quita objetos pesados de la cajuela que no necesites." },
    ],
    h2GasVsHybrid: "Auto a gasolina vs híbrido — ¿Vale la pena la mejora?",
    gasVsHybridIntro:
      "Los vehículos híbridos típicamente cuestan $3,000–$6,000 más que sus contrapartes no híbridas pero ahorran $600–$1,000/año en combustible con hábitos promedio de manejo en EE. UU. El punto de equilibrio es típicamente 4–8 años — bien dentro de un período típico de propiedad de vehículo de 10–12 años.",
    gvhColScenario: "Escenario",
    gvhColGas: "Gasolina (28 MPG)",
    gvhColHybrid: "Híbrido (50 MPG)",
    gvhColSavings: "Ahorro anual",
    gvhRows: [
      ["10,000 mi/año", "$1,232", "$689", "$543"],
      ["13,500 mi/año (prom.)", "$1,663", "$931", "$732"],
      ["20,000 mi/año", "$2,464", "$1,380", "$1,084"],
      ["25,000 mi/año", "$3,080", "$1,725", "$1,355"],
    ],
    gvhTipBoldLead: "Consejo:",
    gvhTipBody:
      " Usa el modo de comparación de vehículos en la calculadora de arriba para encontrar los meses exactos de punto de equilibrio para tus hábitos específicos de manejo y la diferencia de precio entre los vehículos que estás considerando.",
    crossLinks: [
      { href: "/car-loan-calculator", label: "Calculadora préstamo auto", sub: "Pago mensual y amortización" },
      { href: "/car-affordability-calculator", label: "Calculadora asequibilidad", sub: "Precio máximo desde ingresos" },
      { href: "/trade-in-value-estimator", label: "Estimador trade-in", sub: "¿Cuánto vale tu auto?" },
    ],
    h2Faq: "Preguntas frecuentes",
    faqs: [
      { q: "¿Cómo calculo mi costo de gasolina por milla?", a: "Costo de gasolina por milla = precio de gasolina ÷ MPG. A $3.50/galón y 28 MPG, eso es $0.125 por milla. Nuestra calculadora muestra esto automáticamente junto con los totales mensuales y anuales." },
      { q: "¿Cuánto gasta el estadounidense promedio en gasolina por mes?", a: "Aproximadamente $138–$150/mes basado en 13,500 millas/año a 28 MPG y $3.45/galón. Los conductores de alto kilometraje o dueños de camionetas y SUV grandes pueden gastar $250–$400/mes." },
      { q: "¿Cómo encuentro el MPG de mi auto?", a: "Revisa la calcomanía amarilla de eficiencia de combustible de la EPA de cuando el auto era nuevo, tu manual del propietario, o busca por año/marca/modelo en fueleconomy.gov. Para una medición del mundo real: llena el tanque completamente, maneja 100+ millas, vuelve a llenar, luego divide las millas recorridas entre los galones usados." },
      { q: "¿Por qué mi MPG real es más bajo que la calificación EPA?", a: "Las calificaciones EPA se miden bajo condiciones controladas de prueba. El MPG del mundo real es típicamente 5–20% más bajo debido a manejo agresivo, clima frío, uso de aire acondicionado, peso de carga y pendiente del camino. El manejo de ciudad afecta más al MPG; el manejo de carretera generalmente está más cerca de la calificación EPA de carretera." },
    ],
    bottomHeading: "¿Buscando un auto más eficiente?",
    bottomBody:
      "Antes de comprar, ejecuta una verificación VIN gratis para asegurarte de que el historial del vehículo esté limpio — un auto dañado por inundación o reparado tras accidente puede tener problemas ocultos de motor y sistema de combustible que afectan el MPG del mundo real.",
    bottomCta: "Ejecuta una verificación VIN gratis",
  },
  fr: {
    home: "Accueil",
    crumb: "Calculateur de consommation de carburant",
    h1: "Calculateur de consommation de carburant",
    intro:
      "Calcule exactement combien tu dépenses en essence — par jour, par mois et par année. Saisis ton MPG, les miles parcourus et le prix local de l'essence. Inclut le mode road trip, les moyennes de prix des 50 États américains et une comparaison de véhicules avec analyse du seuil de rentabilité.",
    h2Reference: "Coût annuel de carburant par type de véhicule",
    referenceIntro:
      "Basé sur 13 500 miles/an à la moyenne américaine de $3.45/gallon. À utiliser comme référence rapide quand tu magasines un véhicule neuf ou d'occasion.",
    refColType: "Type de véhicule",
    refColMpg: "MPG typique",
    refColAnnual: "Coût annuel est.",
    referenceRows: [
      { type: "Gros SUV / Camion", mpg: "15–20", annual: "$2,330–$3,105" },
      { type: "SUV intermédiaire", mpg: "22–27", annual: "$1,680–$2,060" },
      { type: "Voiture compacte", mpg: "28–35", annual: "$1,290–$1,620" },
      { type: "Hybride (non rechargeable)", mpg: "45–55", annual: "$820–$1,000" },
      { type: "Hybride rechargeable (PHEV)", mpg: "50–80*", annual: "$560–$900*" },
      { type: "Véhicule électrique (EV)", mpg: "100–130 MPGe", annual: "$500–$700†" },
    ],
    referenceNote:
      "* Le chiffre PHEV suppose 40 % de miles électriques. † Le chiffre EV utilise l'électricité à $0.14/kWh, moyenne nationale.",
    h2Improve: "Comment améliorer ta consommation de carburant",
    improveTips: [
      { title: "Garde les pneus correctement gonflés", detail: "Des pneus sous-gonflés augmentent la résistance au roulement et réduisent le MPG jusqu'à 3 %. Vérifie la pression de tes pneus chaque mois — le PSI correct est sur l'autocollant du montant de portière, pas sur le flanc du pneu." },
      { title: "Accélère et freine progressivement", detail: "Une accélération agressive et un freinage brusque peuvent réduire l'économie de carburant de 15 à 30 % en conduite urbaine. Des entrées douces et progressives sont le changement de comportement le plus efficace pour économiser l'essence." },
      { title: "Utilise le régulateur de vitesse sur autoroute", detail: "Maintenir une vitesse constante sur autoroute peut améliorer l'économie de carburant de 7 à 14 % comparé à une conduite à vitesse variable. Plus efficace en terrain plat." },
      { title: "Remplace les filtres à air selon le calendrier", detail: "Un filtre à air moteur obstrué peut réduire la puissance et l'efficacité jusqu'à 10 %. La plupart des fabricants recommandent un remplacement tous les 15 000 à 30 000 miles." },
      { title: "Réduis la vitesse sur autoroute", detail: "L'économie de carburant chute fortement au-dessus de 55 mph. Chaque 5 mph au-dessus de 55 coûte environ 7 à 14 % de plus en carburant. Sur un long trajet à 75 mph vs 65 mph, tu pourrais brûler 15 à 20 % plus d'essence." },
      { title: "Retire le poids excédentaire", detail: "Chaque 100 lbs de poids supplémentaire réduit le MPG d'environ 1 %. Retire les objets lourds du coffre qui ne sont pas nécessaires." },
    ],
    h2GasVsHybrid: "Voiture à essence vs hybride — La mise à niveau en vaut-elle la peine ?",
    gasVsHybridIntro:
      "Les véhicules hybrides coûtent typiquement $3,000–$6,000 de plus que leurs équivalents non hybrides mais économisent $600–$1,000/an en carburant avec les habitudes de conduite américaines moyennes. Le seuil de rentabilité se situe typiquement à 4–8 ans — bien dans une période de propriété typique de 10 à 12 ans.",
    gvhColScenario: "Scénario",
    gvhColGas: "Essence (28 MPG)",
    gvhColHybrid: "Hybride (50 MPG)",
    gvhColSavings: "Économies annuelles",
    gvhRows: [
      ["10 000 mi/an", "$1,232", "$689", "$543"],
      ["13 500 mi/an (moy.)", "$1,663", "$931", "$732"],
      ["20 000 mi/an", "$2,464", "$1,380", "$1,084"],
      ["25 000 mi/an", "$3,080", "$1,725", "$1,355"],
    ],
    gvhTipBoldLead: "Astuce :",
    gvhTipBody:
      " Utilise le mode de comparaison de véhicules dans le calculateur ci-dessus pour trouver les mois exacts de seuil de rentabilité pour tes habitudes spécifiques de conduite et la différence de prix entre les véhicules que tu envisages.",
    crossLinks: [
      { href: "/car-loan-calculator", label: "Calculateur prêt auto", sub: "Paiement mensuel et amortissement" },
      { href: "/car-affordability-calculator", label: "Calculateur d'accessibilité", sub: "Prix max selon le revenu" },
      { href: "/trade-in-value-estimator", label: "Estimateur de reprise", sub: "Combien vaut ta voiture ?" },
    ],
    h2Faq: "Foire aux questions",
    faqs: [
      { q: "Comment calculer mon coût d'essence par mile ?", a: "Coût d'essence par mile = prix de l'essence ÷ MPG. À $3.50/gallon et 28 MPG, ça fait $0.125 par mile. Notre calculateur l'affiche automatiquement avec les totaux mensuels et annuels." },
      { q: "Combien l'Américain moyen dépense-t-il en essence par mois ?", a: "Environ $138–$150/mois sur la base de 13 500 miles/an à 28 MPG et $3.45/gallon. Les conducteurs à fort kilométrage ou propriétaires de gros camions et SUV peuvent dépenser $250–$400/mois." },
      { q: "Comment trouver le MPG de ma voiture ?", a: "Vérifie l'autocollant jaune EPA d'économie de carburant de quand la voiture était neuve, ton manuel du propriétaire, ou cherche par année/marque/modèle sur fueleconomy.gov. Pour une mesure en conditions réelles : fais le plein complet, conduis 100+ miles, refais le plein, puis divise les miles parcourus par les gallons utilisés." },
      { q: "Pourquoi mon MPG réel est-il plus bas que la cote EPA ?", a: "Les cotes EPA sont mesurées dans des conditions de test contrôlées. Le MPG en conditions réelles est typiquement 5 à 20 % plus bas à cause de la conduite agressive, du froid, de l'utilisation de la clim, du poids de chargement et de la pente de la route. La conduite urbaine affecte le plus le MPG ; la conduite sur autoroute est généralement plus proche de la cote EPA autoroute." },
    ],
    bottomHeading: "Tu cherches une voiture plus efficace ?",
    bottomBody:
      "Avant d'acheter, fais une vérification VIN gratuite pour t'assurer que l'historique du véhicule est propre — une voiture endommagée par inondation ou réparée après accident peut avoir des problèmes cachés de moteur et de circuit de carburant qui nuisent au MPG en conditions réelles.",
    bottomCta: "Fais une vérification VIN gratuite",
  },
} as const;

interface Props { locale: Locale; }

export default function GasMileageCalculatorBody({ locale }: Props) {
  const c = COPY[locale];
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);
  const homeHref = locale === "es" ? "/es" : "/";
  const vinHref = locale === "es" ? "/es/vin-check" : "/vin-check";

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

          {/* Calculator */}
          <div className="mt-8">
            <GasMileageCalculator locale={locale} />
          </div>

          {/* VIN Check CTA */}
          <div className="mt-10">
            <VinCheckBanner />
          </div>

          {/* MPG Reference */}
          <section id="mpg-reference" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {c.h2Reference}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              {c.referenceIntro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">{c.refColType}</th>
                    <th className="text-right px-4 py-3 font-medium">{c.refColMpg}</th>
                    <th className="text-right px-4 py-3 font-medium">{c.refColAnnual}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {c.referenceRows.map(({ type, mpg, annual }) => (
                    <tr key={type} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-800 font-medium">{type}</td>
                      <td className="px-4 py-3 text-right font-mono text-slate-700">{mpg}</td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-700">{annual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {c.referenceNote}
            </p>
          </section>

          {/* Tips to improve MPG */}
          <section id="improve-mpg" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              {c.h2Improve}
            </h2>
            <ul className="space-y-3">
              {c.improveTips.map(({ title, detail }) => (
                <li key={title} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{title}</strong> — {detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Gas vs Hybrid break-even */}
          <section id="gas-vs-hybrid" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {c.h2GasVsHybrid}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {c.gasVsHybridIntro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200 mb-4">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">{c.gvhColScenario}</th>
                    <th className="text-right px-4 py-3 font-medium">{c.gvhColGas}</th>
                    <th className="text-right px-4 py-3 font-medium">{c.gvhColHybrid}</th>
                    <th className="text-right px-4 py-3 font-medium">{c.gvhColSavings}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {c.gvhRows.map(([scenario, gas, hybrid, savings]) => (
                    <tr key={scenario} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-700">{scenario}</td>
                      <td className="px-4 py-3 text-right text-red-600">{gas}</td>
                      <td className="px-4 py-3 text-right text-emerald-700">{hybrid}</td>
                      <td className="px-4 py-3 text-right font-bold text-primary-700">{savings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <TrendingDown className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <p>
                <strong>{c.gvhTipBoldLead}</strong>
                {c.gvhTipBody}
              </p>
            </div>
          </section>

          {/* Cross-links */}
          <div className="mt-10 grid sm:grid-cols-3 gap-3">
            {c.crossLinks.map(({ href, label, sub }) => (
              <Link key={href} href={link(href)} className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
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
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {c.h2Faq}
            </h2>
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
            <RelatedChecks exclude="/gas-mileage-calculator" />
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {c.bottomHeading}
          </h2>
          <p className="text-slate-600 mb-6">
            {c.bottomBody}
          </p>
          <Link
            href={vinHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            {c.bottomCta}
          </Link>
        </div>
      </section>
    </>
  );
}
