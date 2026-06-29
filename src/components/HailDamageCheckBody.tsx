/**
 * Shared body for /hail-damage-check and /es/hail-damage-check.
 * Wave 18a — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "Hail Damage Check",
    h1: "Hail Damage Check by VIN",
    intro:
      "CarCheckerVIN's free hail damage check queries NMVTIS, insurance comprehensive-claim feeds, and salvage-auction records to surface hail damage claims, storm-loss events, and any Hail or Salvage title brands for any 17-character VIN. As an NMVTIS-approved data provider, CarCheckerVIN returns hail and storm records that follow the VIN nationwide — even after the car is shipped across state lines and repainted for resale. Hail damage is one of the most common yet underappreciated sources of vehicle history issues. A severe hailstorm can damage thousands of vehicles simultaneously, and many of those vehicles end up repaired and resold — sometimes across state lines — without clear disclosure of the storm damage history. A VIN hail damage check reveals insurance claims, storm damage records, and any title brands resulting from hail events.",
    ctaHeading: "Check for Hail and Storm Damage History",
    h2Recorded: "How Hail Damage Is Recorded",
    rec1:
      "When a vehicle sustains hail damage and an insurance claim is filed, the claim is recorded in insurance industry databases including ISO ClaimSearch, which feeds into comprehensive vehicle history reports. The severity of the damage and the repair cost are documented, allowing VIN history services to flag vehicles with hail damage insurance claims in their history.",
    rec2:
      "For hail events severe enough to cause a total loss declaration — where repair costs exceed the state's total loss threshold — the title is branded as salvage or storm damage, and this brand is reported to NMVTIS. Less severe hail damage that is repaired without a total loss declaration still generates an insurance claim record, though no title brand results.",
    rec3:
      "Hail damage that is not reported to insurance — either because the owner chose to self-pay for paintless dent repair (PDR) or simply left the vehicle unrepaired — may not appear in VIN-linked records at all. This is why a physical inspection is always an important complement to the history check.",
    h2Total: "Hail Damage vs. Total Loss",
    tot1:
      "The line between repairable hail damage and a total loss declaration depends on the vehicle's value, the extent of the denting, and the state's total loss threshold. Large vehicles with low actual cash values — older trucks and SUVs — are particularly vulnerable to total loss declarations from hail because the repair cost ratio triggers the threshold more easily.",
    tot2:
      "A hail-totaled vehicle sold at salvage auction and subsequently repaired receives a rebuilt salvage title that will appear in any VIN history check. These vehicles typically sell at a 20–40% discount to comparable clean-title vehicles, reflecting both the title brand and the uncertainty about repair quality.",
    tot3Pre: "Compare hail total loss vehicles against our ",
    totalLossLink: "total loss check",
    tot3Mid: " and ",
    salvageLink: "salvage title check",
    tot3Suffix: " for complete branded title history.",
    h2States: "States with High Hail Risk",
    statesIntro:
      "Hail risk is concentrated in specific geographic regions of the United States. The region known as \"Hail Alley\" — centered on Colorado, Kansas, Nebraska, Wyoming, and South Dakota — experiences the highest frequency and severity of large-hail storms in the country. Texas, Oklahoma, and Missouri are also high-frequency hail states. Vehicles with registration history from these states deserve additional scrutiny for hail damage.",
    states: [
      { strong: "Colorado", rest: " — Front Range urban corridor sees some of the most damaging hailstorms in the nation, affecting Denver metro area vehicles frequently." },
      { strong: "Texas", rest: " — wide geographic area with frequent severe thunderstorm activity; Dallas-Fort Worth and San Antonio are frequent hail damage markets." },
      { strong: "Kansas and Nebraska", rest: " — core of Hail Alley with frequent large-hail events across both urban and rural areas." },
      { strong: "Missouri and Oklahoma", rest: " — tornado-alley states with significant hail frequency as part of severe weather systems." },
    ],
    h2LongTerm: "Long-Term Effects of Hail Damage",
    lt1:
      "Hail damage affects more than appearance. When hailstones strike a vehicle at high velocity, they can damage the roof, hood, trunk lid, and body panels — but they can also cause less obvious damage to seals, gaskets, windshield weatherstripping, and paint film integrity. Water intrusion resulting from compromised seals can cause electrical problems, corrosion, and interior damage that manifests months or years after the hail event.",
    lt2:
      "Paintless dent repair (PDR) is the preferred repair method for hail dents when the paint is not cracked. PDR is highly effective for most hail damage and produces invisible repairs without affecting the factory paint. However, severe hail damage with cracked paint requires conventional body repair, which involves blending and repainting — a more complex repair that carries a higher risk of color mismatch and reduced resale value.",
    lt3:
      "Hail-damaged vehicles that were improperly repaired with dents hammered out from the inside (rather than professional PDR) may have metal that is work-hardened and more susceptible to cracking over time. A professional inspection can identify the repair method used and assess its quality.",
    h2Buying: "Buying a Hail-Damaged Vehicle — Is It Worth It?",
    buy1:
      "Hail-damaged vehicles with insurance claims but no total loss declaration can represent genuine value for buyers who understand the trade-off. If the vehicle has a clean title, the hail damage was professionally repaired with PDR, and the cosmetic result is acceptable, the main downside is a potential resale discount when you eventually sell.",
    buy2:
      "The calculus changes significantly for hail-totaled vehicles with rebuilt titles. The lower purchase price is real, but so are the insurance limitations, financing challenges, and the permanent resale discount. These vehicles make more sense for buyers who intend to keep the vehicle long-term and are not concerned about resale value.",
    buy3Pre: "Always pair a hail damage check with a full ",
    vinLink: "VIN history report",
    buy3Mid: " and an ",
    accidentLink: "accident history check",
    buy3Suffix: " to capture the full scope of any damage history beyond the hail events.",
    faqHeading: "Frequently Asked Questions",
    ctaSub:
      "Enter a 17-character VIN to detect hail damage insurance claims, storm damage records, and hail-branded titles.",
  },
  es: {
    home: "Inicio",
    crumb: "Verificación de daños por granizo",
    h1: "Verificación de daños por granizo por VIN",
    intro:
      "El daño por granizo es una de las fuentes más comunes pero subestimadas de problemas en el historial vehicular. Una tormenta de granizo severa puede dañar miles de vehículos al mismo tiempo, y muchos de ellos terminan reparados y revendidos — a veces cruzando líneas estatales — sin una declaración clara del historial de daños por tormenta. Una verificación VIN de daños por granizo revela reclamos de seguros, registros de daños por tormenta y cualquier título marcado por eventos de granizo.",
    ctaHeading: "Verifica el historial de daños por granizo y tormenta",
    h2Recorded: "Cómo se registran los daños por granizo",
    rec1:
      "Cuando un vehículo sufre daños por granizo y se presenta un reclamo de seguro, el reclamo se registra en bases de datos de la industria aseguradora incluyendo ISO ClaimSearch, que alimenta reportes completos de historial vehicular. La gravedad del daño y el costo de reparación quedan documentados, permitiendo que los servicios de historial VIN marquen vehículos con reclamos de seguros por daños por granizo.",
    rec2:
      "Para eventos de granizo lo suficientemente severos para causar una declaración de pérdida total — donde los costos de reparación exceden el umbral de pérdida total del estado — el título se marca como salvamento o daño por tormenta, y esta marca se reporta a NMVTIS. El daño por granizo menos severo reparado sin declaración de pérdida total aún genera un registro de reclamo de seguro, aunque no resulta en una marca en el título.",
    rec3:
      "El daño por granizo que no se reporta al seguro — ya sea porque el dueño optó por pagar de su bolsillo una reparación sin pintura (PDR) o simplemente dejó el vehículo sin reparar — puede no aparecer en absoluto en registros vinculados al VIN. Por eso una inspección física siempre es un complemento importante a la verificación de historial.",
    h2Total: "Daños por granizo vs. pérdida total",
    tot1:
      "La línea entre un daño por granizo reparable y una declaración de pérdida total depende del valor del vehículo, la extensión de las abolladuras y el umbral de pérdida total del estado. Vehículos grandes con valores en efectivo bajos — camionetas y SUVs más antiguas — son particularmente vulnerables a declaraciones de pérdida total por granizo porque la relación costo de reparación cruza el umbral más fácilmente.",
    tot2:
      "Un vehículo declarado pérdida total por granizo vendido en subasta de salvamento y posteriormente reparado recibe un título reconstruido de salvamento que aparecerá en cualquier verificación VIN. Estos vehículos típicamente se venden con un descuento del 20-40% frente a vehículos comparables con título limpio, reflejando tanto la marca del título como la incertidumbre sobre la calidad de reparación.",
    tot3Pre: "Compara vehículos con pérdida total por granizo con nuestras ",
    totalLossLink: "verificación de pérdida total",
    tot3Mid: " y ",
    salvageLink: "verificación de título de salvamento",
    tot3Suffix: " para un historial completo de marcas en el título.",
    h2States: "Estados con alto riesgo de granizo",
    statesIntro:
      "El riesgo de granizo se concentra en regiones geográficas específicas de Estados Unidos. La región conocida como \"Hail Alley\" — centrada en Colorado, Kansas, Nebraska, Wyoming y Dakota del Sur — experimenta la mayor frecuencia y severidad de tormentas de granizo grande del país. Texas, Oklahoma y Missouri también son estados de alta frecuencia. Los vehículos con historial de registro en estos estados merecen un escrutinio adicional por daños por granizo.",
    states: [
      { strong: "Colorado", rest: " — el corredor urbano del Front Range ve algunas de las tormentas de granizo más dañinas del país, afectando frecuentemente vehículos del área metropolitana de Denver." },
      { strong: "Texas", rest: " — amplia área geográfica con frecuente actividad de tormentas severas; Dallas-Fort Worth y San Antonio son mercados frecuentes de daños por granizo." },
      { strong: "Kansas y Nebraska", rest: " — núcleo de Hail Alley con frecuentes eventos de granizo grande en áreas urbanas y rurales." },
      { strong: "Missouri y Oklahoma", rest: " — estados del Tornado Alley con frecuencia significativa de granizo como parte de sistemas climáticos severos." },
    ],
    h2LongTerm: "Efectos a largo plazo de los daños por granizo",
    lt1:
      "El daño por granizo afecta más que la apariencia. Cuando los granizos golpean un vehículo a alta velocidad, pueden dañar el techo, capó, tapa de cajuela y paneles de carrocería — pero también pueden causar daños menos obvios a sellos, juntas, burletes del parabrisas e integridad de la película de pintura. La intrusión de agua resultante de sellos comprometidos puede causar problemas eléctricos, corrosión y daño interior que se manifiesta meses o años después del evento de granizo.",
    lt2:
      "La reparación sin pintura (PDR, por sus siglas en inglés) es el método de reparación preferido para abolladuras por granizo cuando la pintura no está agrietada. PDR es muy efectivo para la mayoría de los daños por granizo y produce reparaciones invisibles sin afectar la pintura de fábrica. Sin embargo, el daño severo por granizo con pintura agrietada requiere reparación convencional de carrocería, que implica difuminado y repintado — una reparación más compleja con mayor riesgo de discrepancia de color y reducción del valor de reventa.",
    lt3:
      "Los vehículos dañados por granizo que fueron reparados incorrectamente con abolladuras martilladas desde adentro (en lugar de PDR profesional) pueden tener metal endurecido por el trabajo y más susceptible a agrietarse con el tiempo. Una inspección profesional puede identificar el método de reparación utilizado y evaluar su calidad.",
    h2Buying: "Comprar un vehículo dañado por granizo — ¿vale la pena?",
    buy1:
      "Los vehículos dañados por granizo con reclamos de seguros pero sin declaración de pérdida total pueden representar un valor genuino para compradores que entienden la contrapartida. Si el vehículo tiene un título limpio, el daño por granizo fue reparado profesionalmente con PDR y el resultado cosmético es aceptable, la principal desventaja es un posible descuento de reventa cuando eventualmente vendas.",
    buy2:
      "El cálculo cambia significativamente para vehículos con pérdida total por granizo y títulos reconstruidos. El menor precio de compra es real, pero también lo son las limitaciones de seguro, los desafíos de financiamiento y el descuento permanente de reventa. Estos vehículos tienen más sentido para compradores que planean conservar el vehículo a largo plazo y no se preocupan por el valor de reventa.",
    buy3Pre: "Siempre combina una verificación de daños por granizo con un ",
    vinLink: "reporte completo de historial VIN",
    buy3Mid: " y una ",
    accidentLink: "verificación de historial de accidentes",
    buy3Suffix: " para capturar el alcance completo de cualquier historial de daños más allá de los eventos de granizo.",
    faqHeading: "Preguntas frecuentes",
    ctaSub:
      "Ingresa un VIN de 17 caracteres para detectar reclamos de seguros por granizo, registros de daños por tormenta y títulos marcados por granizo.",
  },
  fr: {
    home: "Accueil",
    crumb: "Vérification des dégâts de grêle",
    h1: "Vérification des dégâts de grêle par VIN",
    intro:
      "Les dégâts de grêle font partie des sources les plus courantes mais sous-estimées de problèmes dans l'historique d'un véhicule. Une tempête de grêle sévère peut endommager des milliers de véhicules en même temps, et beaucoup finissent réparés et revendus — parfois d'un État à l'autre — sans déclaration claire de l'historique des dégâts de tempête. Une vérification VIN des dégâts de grêle révèle les réclamations d'assurance, les enregistrements de dégâts de tempête et toute marque de titre résultant d'événements de grêle.",
    ctaHeading: "Vérifie l'historique des dégâts de grêle et de tempête",
    h2Recorded: "Comment les dégâts de grêle sont enregistrés",
    rec1:
      "Quand un véhicule subit des dégâts de grêle et qu'une réclamation d'assurance est déposée, cette réclamation est enregistrée dans les bases de données du secteur de l'assurance, dont ISO ClaimSearch, qui alimente les rapports d'historique de véhicule complets. La gravité des dégâts et le coût de réparation sont documentés, ce qui permet aux services d'historique VIN de signaler les véhicules avec des réclamations d'assurance pour dégâts de grêle.",
    rec2:
      "Pour les événements de grêle suffisamment sévères pour entraîner une déclaration de perte totale — quand les coûts de réparation dépassent le seuil de perte totale de l'État — le titre reçoit une marque de salvage ou de dégâts de tempête, et cette marque est signalée à NMVTIS. Les dégâts de grêle moins sévères réparés sans déclaration de perte totale génèrent quand même un enregistrement de réclamation d'assurance, mais sans marque de titre.",
    rec3:
      "Les dégâts de grêle qui ne sont pas signalés à l'assurance — soit parce que le propriétaire a choisi de payer lui-même une réparation sans peinture (PDR), soit parce que le véhicule a simplement été laissé non réparé — peuvent ne pas apparaître du tout dans les enregistrements liés au VIN. C'est pourquoi une inspection physique reste toujours un complément important à la vérification d'historique.",
    h2Total: "Dégâts de grêle vs. perte totale",
    tot1:
      "La frontière entre des dégâts de grêle réparables et une déclaration de perte totale dépend de la valeur du véhicule, de l'étendue des bosses et du seuil de perte totale de l'État. Les gros véhicules à faible valeur réelle — pick-ups et SUV anciens — sont particulièrement vulnérables aux déclarations de perte totale par grêle parce que le ratio coût de réparation atteint plus facilement le seuil.",
    tot2:
      "Un véhicule déclaré perte totale par grêle, vendu aux enchères de salvage puis réparé, reçoit un titre rebuilt salvage qui apparaîtra dans toute vérification d'historique VIN. Ces véhicules se vendent généralement avec une décote de 20 à 40 % par rapport à des véhicules comparables avec titre propre, ce qui reflète à la fois la marque de titre et l'incertitude sur la qualité des réparations.",
    tot3Pre: "Compare les véhicules en perte totale par grêle avec notre ",
    totalLossLink: "vérification de perte totale",
    tot3Mid: " et notre ",
    salvageLink: "vérification du titre salvage",
    tot3Suffix: " pour un historique complet des marques de titre.",
    h2States: "États à fort risque de grêle",
    statesIntro:
      "Le risque de grêle se concentre dans des régions géographiques spécifiques des États-Unis. La région connue sous le nom de \"Hail Alley\" — centrée sur le Colorado, le Kansas, le Nebraska, le Wyoming et le Dakota du Sud — connaît la fréquence et la sévérité les plus élevées des grosses tempêtes de grêle du pays. Le Texas, l'Oklahoma et le Missouri sont aussi des États à forte fréquence de grêle. Les véhicules ayant un historique d'immatriculation dans ces États méritent un examen supplémentaire pour les dégâts de grêle.",
    states: [
      { strong: "Colorado", rest: " — le corridor urbain du Front Range connaît certaines des tempêtes de grêle les plus dommageables du pays, touchant fréquemment les véhicules de la zone métropolitaine de Denver." },
      { strong: "Texas", rest: " — vaste zone géographique avec une activité orageuse sévère fréquente ; Dallas-Fort Worth et San Antonio sont des marchés fréquemment touchés par les dégâts de grêle." },
      { strong: "Kansas et Nebraska", rest: " — cœur de la Hail Alley avec des événements de grosse grêle fréquents dans les zones urbaines comme rurales." },
      { strong: "Missouri et Oklahoma", rest: " — États de la Tornado Alley avec une fréquence de grêle significative dans le cadre de systèmes météorologiques sévères." },
    ],
    h2LongTerm: "Effets à long terme des dégâts de grêle",
    lt1:
      "Les dégâts de grêle ne touchent pas que l'apparence. Quand des grêlons frappent un véhicule à grande vitesse, ils peuvent endommager le toit, le capot, le couvercle de coffre et les panneaux de carrosserie — mais ils peuvent aussi causer des dégâts moins évidents aux joints, aux garnitures, à la moulure de pare-brise et à l'intégrité du film de peinture. L'infiltration d'eau provoquée par des joints compromis peut entraîner des problèmes électriques, de la corrosion et des dégâts intérieurs qui apparaissent des mois ou des années après l'événement de grêle.",
    lt2:
      "La réparation sans peinture (PDR) est la méthode de réparation préférée pour les bosses de grêle quand la peinture n'est pas fissurée. Le PDR est très efficace pour la plupart des dégâts de grêle et produit des réparations invisibles sans toucher à la peinture d'usine. Cependant, les dégâts de grêle sévères avec peinture fissurée nécessitent une réparation classique de carrosserie, qui implique un raccord et une repeinte — une réparation plus complexe avec un risque plus élevé de différence de teinte et une valeur de revente réduite.",
    lt3:
      "Les véhicules endommagés par la grêle qui ont été réparés de façon incorrecte avec des bosses repoussées de l'intérieur (au lieu d'un PDR professionnel) peuvent avoir un métal écroui plus susceptible de se fissurer avec le temps. Une inspection professionnelle peut identifier la méthode de réparation utilisée et en évaluer la qualité.",
    h2Buying: "Acheter un véhicule endommagé par la grêle — est-ce que ça vaut le coup ?",
    buy1:
      "Les véhicules endommagés par la grêle avec des réclamations d'assurance mais sans déclaration de perte totale peuvent représenter une vraie bonne affaire pour les acheteurs qui comprennent le compromis. Si le véhicule a un titre propre, que les dégâts de grêle ont été réparés professionnellement avec du PDR et que le résultat cosmétique est acceptable, le principal inconvénient est une possible décote à la revente quand tu finiras par le revendre.",
    buy2:
      "Le calcul change beaucoup pour les véhicules en perte totale par grêle avec titre rebuilt. Le prix d'achat plus bas est réel, mais les limitations d'assurance, les difficultés de financement et la décote permanente à la revente le sont aussi. Ces véhicules ont plus de sens pour les acheteurs qui comptent garder le véhicule à long terme et ne se soucient pas de la valeur de revente.",
    buy3Pre: "Combine toujours une vérification des dégâts de grêle avec un ",
    vinLink: "rapport d'historique VIN complet",
    buy3Mid: " et une ",
    accidentLink: "vérification de l'historique d'accidents",
    buy3Suffix: " pour capter toute l'étendue de l'historique de dégâts au-delà des événements de grêle.",
    faqHeading: "Questions fréquentes",
    ctaSub:
      "Entre un VIN de 17 caractères pour détecter les réclamations d'assurance pour grêle, les enregistrements de dégâts de tempête et les titres marqués par la grêle.",
  },
} as const;

const FAQS_EN = [
  { question: "Does a VIN check show hail damage?", answer: "A VIN check can show hail damage when it generated a record. If an owner filed a comprehensive insurance claim, that claim is logged in industry databases and may surface in a history report. If the storm caused a total loss, a salvage or storm/hail title brand is reported to NMVTIS, which aggregates data from all 50 state DMVs. Minor hail repaired without a claim — for example self-paid paintless dent repair — may leave no VIN-linked trace, so pair the report with a physical inspection." },
  { question: "What is a hail title or catastrophic-loss brand?", answer: "A hail or storm-damage title brand is a permanent notation an insurer or DMV applies when severe hail leads to a comprehensive total loss. The exact wording varies by state — some use a specific hail or storm-damage brand, while others apply a general salvage brand. Once the vehicle is repaired and re-titled it typically becomes a rebuilt salvage title. These brands are reported to NMVTIS and follow the VIN for life, so they appear in a VIN history check regardless of where the car is later sold." },
  { question: "Are hail-damaged cars safe to buy?", answer: "Hail damage is usually cosmetic — dents in the roof, hood, and body panels — and a professionally repaired car with a clean title can be safe and a genuine value. The risks are hidden ones: hail can crack windshields, damage seals and weatherstripping, and let water in, leading to corrosion or electrical problems later. A hail-totaled vehicle with a rebuilt title carries added uncertainty about repair quality. Always confirm the title status by VIN and get an independent pre-purchase inspection before buying." },
  { question: "What is the difference between cosmetic and structural hail damage?", answer: "Cosmetic hail damage is surface denting on panels and the roof that can usually be corrected with paintless dent repair (PDR) without affecting safety. Structural or hidden damage is less common but more serious: cracked windshields, compromised seals that allow water intrusion, damaged sunroof glass, or paint film failure that exposes metal to corrosion. Improper repairs — dents hammered from the inside rather than professional PDR — can work-harden metal and cause cracking over time. A professional inspection identifies the repair method and reveals damage a history report cannot." },
  { question: "Do insurers total cars for hail damage?", answer: "Yes. When hail repair costs exceed a state's total-loss threshold relative to the vehicle's actual cash value, an insurer can declare a comprehensive total loss. Older trucks and SUVs with lower values are especially vulnerable because their repair-cost ratio crosses the threshold more easily. A totaled vehicle is typically branded salvage or storm-damage and sold at auction. After repair it carries a rebuilt salvage title that appears in any VIN history check." },
  { question: "How do I check if a car was a hail or comprehensive-claim total loss?", answer: "Run the car's 17-character VIN through a history check. The report queries NMVTIS — the federal system that aggregates salvage and total-loss brands from all 50 state DMVs plus insurance and salvage reporters — for any storm-damage, hail, or salvage brand. It also surfaces comprehensive insurance claims recorded in industry databases. Because brands follow the VIN, a total loss cannot be erased by re-titling in another state. Be aware that hail repaired without a claim may not appear, so combine the check with an inspection." },
  { question: "Are flood and hail catastrophe cars resold after big storms?", answer: "Yes. A single severe storm can damage thousands of vehicles at once, and many are bought at salvage auction, repaired, and resold — sometimes shipped across state lines to markets where the storm history is less obvious. These catastrophe vehicles often carry salvage, flood, or storm-damage title brands. NMVTIS retains those brands for the life of the VIN, so a VIN check is the most reliable way to identify a storm-resold car even when the current paper title looks clean." },
];

const FAQS_ES = [
  { question: "¿Una verificación VIN muestra daños por granizo?", answer: "Una verificación VIN puede mostrar daños por granizo cuando generó un registro. Si un dueño presentó un reclamo de seguro de cobertura amplia, ese reclamo queda registrado en bases de datos de la industria y puede aparecer en un reporte de historial. Si la tormenta causó una pérdida total, una marca de título de salvamento o tormenta/granizo se reporta a NMVTIS, que agrega datos de los 50 DMV estatales. El granizo menor reparado sin reclamo — por ejemplo PDR pagado por el dueño — puede no dejar rastro vinculado al VIN, así que combina el reporte con una inspección física." },
  { question: "¿Qué es un título por granizo o marca de pérdida catastrófica?", answer: "Una marca de título por granizo o daño por tormenta es una notación permanente que una aseguradora o DMV aplica cuando un granizo severo lleva a una pérdida total por cobertura amplia. La redacción exacta varía por estado — algunos usan una marca específica de granizo o tormenta, mientras otros aplican una marca general de salvamento. Una vez reparado y re-titulado, normalmente se convierte en un título de salvamento reconstruido. Estas marcas se reportan a NMVTIS y siguen al VIN de por vida, así que aparecen en una verificación VIN sin importar dónde se venda el auto después." },
  { question: "¿Es seguro comprar autos dañados por granizo?", answer: "El daño por granizo suele ser cosmético — abolladuras en techo, capó y paneles de carrocería — y un auto reparado profesionalmente con título limpio puede ser seguro y un valor genuino. Los riesgos son ocultos: el granizo puede agrietar parabrisas, dañar sellos y burletes y dejar entrar agua, causando corrosión o problemas eléctricos después. Un vehículo declarado pérdida total por granizo con título reconstruido tiene incertidumbre adicional sobre la calidad de reparación. Siempre confirma el estado del título por VIN y consigue una inspección previa a la compra independiente antes de comprar." },
  { question: "¿Cuál es la diferencia entre daño cosmético y estructural por granizo?", answer: "El daño cosmético por granizo es abolladura superficial en paneles y techo que suele poder corregirse con reparación sin pintura (PDR) sin afectar la seguridad. El daño estructural u oculto es menos común pero más serio: parabrisas agrietados, sellos comprometidos que permiten intrusión de agua, vidrio dañado del techo solar o falla de la película de pintura que expone el metal a corrosión. Reparaciones inadecuadas — abolladuras martilladas desde adentro en lugar de PDR profesional — pueden endurecer el metal por trabajo y causar agrietamiento con el tiempo. Una inspección profesional identifica el método de reparación y revela daños que un reporte de historial no puede." },
  { question: "¿Las aseguradoras declaran autos pérdida total por daños por granizo?", answer: "Sí. Cuando los costos de reparación por granizo exceden el umbral de pérdida total de un estado en relación al valor en efectivo real del vehículo, una aseguradora puede declarar pérdida total por cobertura amplia. Las camionetas y SUVs más antiguas con valores más bajos son especialmente vulnerables porque su relación costo de reparación cruza el umbral más fácilmente. Un vehículo declarado pérdida total típicamente se marca como salvamento o daño por tormenta y se vende en subasta. Tras la reparación lleva un título reconstruido de salvamento que aparece en cualquier verificación VIN." },
  { question: "¿Cómo verifico si un auto fue pérdida total por granizo o reclamo de cobertura amplia?", answer: "Pasa el VIN de 17 caracteres del auto por una verificación de historial. El reporte consulta NMVTIS — el sistema federal que agrega marcas de salvamento y pérdida total de los 50 DMV estatales más reportadores de seguros y salvamento — por cualquier marca de daño por tormenta, granizo o salvamento. También muestra reclamos de seguros de cobertura amplia registrados en bases de datos de la industria. Como las marcas siguen al VIN, una pérdida total no puede borrarse re-titulando en otro estado. Ten en cuenta que el granizo reparado sin reclamo puede no aparecer, así que combina la verificación con una inspección." },
  { question: "¿Los autos catastróficos por inundación y granizo se revenden tras grandes tormentas?", answer: "Sí. Una sola tormenta severa puede dañar miles de vehículos a la vez, y muchos se compran en subasta de salvamento, se reparan y se revenden — a veces enviados cruzando líneas estatales a mercados donde el historial de la tormenta es menos obvio. Estos vehículos catastróficos suelen llevar marcas de salvamento, inundación o daño por tormenta. NMVTIS retiene esas marcas de por vida del VIN, así que una verificación VIN es la forma más confiable de identificar un auto revendido por tormenta incluso cuando el título físico actual parece limpio." },
];

interface Props { locale: Locale; }

export default function HailDamageCheckBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} />
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">{c.h1}</h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.intro}</p>
          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">{c.ctaHeading}</h2>
            <VinSearchForm size="sm"  locale={locale}/>
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Recorded}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.rec1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.rec2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.rec3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Total}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.tot1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.tot2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.tot3Pre}
            <Link href={link("/total-loss-check")} className="text-primary-600 hover:underline font-medium">{c.totalLossLink}</Link>
            {c.tot3Mid}
            <Link href={link("/salvage-title-check")} className="text-primary-600 hover:underline font-medium">{c.salvageLink}</Link>
            {c.tot3Suffix}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2States}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.statesIntro}</p>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.states.map((s) => (
              <li key={s.strong} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>{s.strong}</strong>{s.rest}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2LongTerm}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.lt1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.lt2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.lt3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Buying}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.buy1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.buy2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.buy3Pre}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{c.vinLink}</Link>
            {c.buy3Mid}
            <Link href={link("/accident-history-check")} className="text-primary-600 hover:underline font-medium">{c.accidentLink}</Link>
            {c.buy3Suffix}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.faqHeading}</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">{faq.question}</h3>
                  <span className="text-2xl text-primary-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/hail-damage-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.ctaHeading}</h2>
          <p className="text-slate-700 mb-6">{c.ctaSub}</p>
          <VinSearchForm size="sm"  locale={locale}/>
        </div>
      </section>
    </>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
