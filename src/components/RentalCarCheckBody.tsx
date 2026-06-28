import Link from "next/link";
import { Check } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import type { Locale } from "@/i18n/config";

interface Faq { question: string; answer: string; }

const COPY = {
  en: {
    crumbs: { home: "Home", current: "Rental Car Check" },
    h1: "Rental Car History Check by VIN",
    lede: "Former rental vehicles are a fixture in the used car market. After 12\u201324 months and 20,000\u201340,000 miles of fleet service, major rental companies like Enterprise, Hertz, and Avis sell their fleets through auctions and dealer networks. A VIN rental car check reveals whether the vehicle you\u2019re considering spent time in a rental fleet \u2014 information that directly affects how you assess its condition, mileage, and value.",
    formH2: "Check for Rental Fleet History",
    howH2: "How to Tell If a Car Was a Rental",
    how: {
      p1: "Rental vehicles are titled in the name of the rental company (Enterprise Holdings, Hertz Corporation, Avis Budget Group, etc.) and registered as commercial fleet vehicles. These ownership records are captured in title history databases and appear in a comprehensive VIN report. The vehicle will show one of these corporate entities as a prior owner, typically as the first or second title holder after the manufacturer.",
      p2: "Visual clues can also indicate rental history. Fleet plates, rental stickers (sometimes leaving adhesive residue), and oddly configured equipment (base trim levels with heavy wear patterns consistent with public use) are physical signs worth noting during an inspection. However, rental companies typically deidentify and recondition vehicles before sale, so physical evidence alone is unreliable.",
      p3: "The most reliable method is a VIN-based history check that shows the complete ownership chain. A vehicle that was owned by a rental company for 12\u201324 months before transferring to a dealer or private party has rental history regardless of what the current seller discloses.",
    },
    valueH2: "What Rental History Means for Value",
    value: {
      p1: "Former rental vehicles typically sell at a modest discount to equivalent single-owner vehicles \u2014 generally 5\u201315% depending on make, model, mileage, and condition. This discount reflects the market\u2019s perception of higher average use intensity during the rental period. Whether that discount accurately reflects a real quality difference is a nuanced question.",
      p2: "Rental companies keep detailed maintenance records and service vehicles on strict schedules \u2014 often more consistently than private owners. Major rental fleets also track damage and typically repair it before resale. However, the nature of rental use means the vehicle was driven by dozens or hundreds of different people, some of whom treated it harshly. Interior wear is often the most visible consequence.",
      p3Before: "Use the rental history as context when evaluating the vehicle\u2019s asking price, and pair it with an ",
      p3Link: "odometer check",
      p3After: " to verify the mileage accurately reflects the fleet service period.",
    },
    mileageH2: "High-Mileage Rental vs. Normal Use",
    mileage: {
      lead: "The mileage profile of rental vehicles differs from private ownership in important ways. Rental cars accumulate most of their mileage on highway trips \u2014 airport rentals are particularly highway-heavy. Highway miles are generally easier on an engine and drivetrain than equivalent city miles, which involve more stop-and-go operation and frequent short trips (which are harder on oil and emissions systems).",
      bullets: [
        "Rental mileage is often highway-dominated, which is mechanically less demanding than equivalent urban miles.",
        "Maintenance is typically performed on schedule by professional fleet maintenance teams.",
        "Interior wear \u2014 carpets, seats, controls \u2014 is often accelerated by high-turnover public use.",
        "Damage history may be more complete and well-documented than for private owners who self-pay for minor repairs.",
      ],
    },
    maintH2: "Rental Fleet Maintenance Practices",
    maint: {
      p1: "Major rental companies operate centralized maintenance programs with standardized service intervals. Vehicles are typically serviced at their own facilities or through fleet service agreements with dealer groups. Oil changes, tire rotations, and brake inspections follow manufacturer-recommended schedules, and vehicles with mechanical issues are taken out of service quickly \u2014 a rental company cannot afford to have a customer stranded.",
      p2: "However, the quality of maintenance documentation varies by company and location. Some rental companies provide detailed service records with the vehicle at sale; others do not. Ask for any available maintenance documentation when purchasing a former rental, and consider having an independent mechanic inspect the vehicle to verify its mechanical condition.",
    },
    buyH2: "Should You Buy a Former Rental Car?",
    buy: {
      p1: "Former rental cars can be excellent used car values, particularly for buyers focused on reliability and low cost of entry. Major rental companies typically operate popular, proven models (Toyota Camry, Honda Accord, Ford Explorer) that have strong reliability records and abundant parts availability. If the vehicle is priced appropriately and shows clean history beyond the rental period, it can represent a sound purchase.",
      p2Before: "The key is to verify the full history \u2014 not just the rental period. Run a complete ",
      p2Link: "VIN history report",
      p2After: " to check for accidents, damage, and title issues after the rental period ended. A former rental that was also involved in an unreported accident after leaving the fleet is a significantly different proposition than one with a clean post-rental history.",
      p3Before: "Also run a ",
      p3LinkAcc: "accident history check",
      p3Mid: " and confirm there are no open ",
      p3LinkRecall: "safety recalls",
      p3After: " before making a final buying decision.",
    },
    faqH2: "Frequently Asked Questions",
    faqLede: "Common questions about checking a used car for former rental and fleet history by VIN.",
    cta: {
      h2: "Was This Car a Rental? Find Out Instantly.",
      body: "Enter a 17-character VIN to check for rental fleet history, prior commercial ownership, and fleet registration records.",
    },
  },
  es: {
    crumbs: { home: "Inicio", current: "Verificaci\u00f3n de auto de renta" },
    h1: "Verificaci\u00f3n de historial de auto de renta por VIN",
    lede: "Los veh\u00edculos ex-renta son comunes en el mercado de autos usados. Despu\u00e9s de 12\u201324 meses y 20,000\u201340,000 millas de servicio en flota, las principales empresas de renta como Enterprise, Hertz y Avis venden sus flotas a trav\u00e9s de subastas y redes de concesionarios. Una verificaci\u00f3n de VIN para auto de renta revela si el veh\u00edculo que consideras pas\u00f3 tiempo en una flota de renta \u2014 informaci\u00f3n que afecta directamente c\u00f3mo eval\u00faas su condici\u00f3n, kilometraje y valor.",
    formH2: "Revisar historial de flota de renta",
    howH2: "C\u00f3mo saber si un auto fue de renta",
    how: {
      p1: "Los veh\u00edculos de renta est\u00e1n titulados a nombre de la empresa de renta (Enterprise Holdings, Hertz Corporation, Avis Budget Group, etc.) y registrados como veh\u00edculos comerciales de flota. Estos registros de propiedad se capturan en bases de datos de historial de t\u00edtulo y aparecen en un reporte completo de VIN. El veh\u00edculo mostrar\u00e1 a una de estas entidades corporativas como due\u00f1o anterior, t\u00edpicamente como el primer o segundo titular despu\u00e9s del fabricante.",
      p2: "Las pistas visuales tambi\u00e9n pueden indicar historial de renta. Placas de flota, calcoman\u00edas de renta (a veces dejando residuo adhesivo) y equipamiento configurado de forma extra\u00f1a (niveles base con patrones de desgaste pesado consistentes con uso p\u00fablico) son se\u00f1ales f\u00edsicas que vale la pena notar durante una inspecci\u00f3n. Sin embargo, las empresas de renta t\u00edpicamente desidentifican y reacondicionan los veh\u00edculos antes de la venta, por lo que la evidencia f\u00edsica por s\u00ed sola no es confiable.",
      p3: "El m\u00e9todo m\u00e1s confiable es una verificaci\u00f3n de historial basada en VIN que muestre la cadena completa de propiedad. Un veh\u00edculo que fue propiedad de una empresa de renta por 12\u201324 meses antes de transferirse a un concesionario o particular tiene historial de renta sin importar lo que el vendedor actual revele.",
    },
    valueH2: "Qu\u00e9 significa el historial de renta para el valor",
    value: {
      p1: "Los veh\u00edculos ex-renta t\u00edpicamente se venden con un descuento modesto frente a veh\u00edculos equivalentes de un solo due\u00f1o \u2014 generalmente 5\u201315% seg\u00fan marca, modelo, kilometraje y condici\u00f3n. Este descuento refleja la percepci\u00f3n del mercado de mayor intensidad de uso promedio durante el periodo de renta. Si ese descuento refleja con precisi\u00f3n una diferencia real de calidad es una pregunta matizada.",
      p2: "Las empresas de renta mantienen registros detallados de mantenimiento y dan servicio a los veh\u00edculos en horarios estrictos \u2014 a menudo m\u00e1s consistentemente que los due\u00f1os privados. Las grandes flotas tambi\u00e9n rastrean da\u00f1os y t\u00edpicamente los reparan antes de la reventa. Sin embargo, la naturaleza del uso de renta significa que el veh\u00edculo fue conducido por docenas o cientos de personas diferentes, algunas de las cuales lo trataron sin cuidado. El desgaste interior suele ser la consecuencia m\u00e1s visible.",
      p3Before: "Usa el historial de renta como contexto al evaluar el precio que pide el veh\u00edculo, y combina con una ",
      p3Link: "verificaci\u00f3n de od\u00f3metro",
      p3After: " para verificar que el kilometraje refleje con precisi\u00f3n el periodo de servicio en flota.",
    },
    mileageH2: "Renta de alto kilometraje vs. uso normal",
    mileage: {
      lead: "El perfil de kilometraje de los veh\u00edculos de renta difiere del de los due\u00f1os privados de formas importantes. Los autos de renta acumulan la mayor parte de su kilometraje en viajes por carretera \u2014 las rentas de aeropuerto son particularmente intensivas en carretera. Las millas de carretera son generalmente m\u00e1s f\u00e1ciles para el motor y la transmisi\u00f3n que las millas urbanas equivalentes, que implican m\u00e1s arranque-paro y viajes cortos frecuentes (m\u00e1s duros para el aceite y los sistemas de emisiones).",
      bullets: [
        "El kilometraje de renta a menudo es predominantemente de carretera, mec\u00e1nicamente menos exigente que las millas urbanas equivalentes.",
        "El mantenimiento t\u00edpicamente se realiza en horario por equipos profesionales de mantenimiento de flota.",
        "El desgaste interior \u2014 alfombras, asientos, controles \u2014 a menudo se acelera por el uso p\u00fablico de alta rotaci\u00f3n.",
        "El historial de da\u00f1os puede ser m\u00e1s completo y bien documentado que para due\u00f1os privados que pagan por reparaciones menores.",
      ],
    },
    maintH2: "Pr\u00e1cticas de mantenimiento de flota de renta",
    maint: {
      p1: "Las principales empresas de renta operan programas centralizados de mantenimiento con intervalos est\u00e1ndar de servicio. Los veh\u00edculos t\u00edpicamente reciben servicio en sus propias instalaciones o mediante acuerdos de servicio de flota con grupos de concesionarios. Los cambios de aceite, rotaciones de llantas e inspecciones de frenos siguen los horarios recomendados por el fabricante, y los veh\u00edculos con problemas mec\u00e1nicos se retiran de servicio r\u00e1pidamente \u2014 una empresa de renta no puede permitirse que un cliente quede varado.",
      p2: "Sin embargo, la calidad de la documentaci\u00f3n del mantenimiento var\u00eda por empresa y ubicaci\u00f3n. Algunas empresas de renta proporcionan registros detallados de servicio con el veh\u00edculo al vender; otras no. Pide cualquier documentaci\u00f3n de mantenimiento disponible al comprar un ex-renta, y considera que un mec\u00e1nico independiente inspeccione el veh\u00edculo para verificar su condici\u00f3n mec\u00e1nica.",
    },
    buyH2: "\u00bfDeber\u00edas comprar un ex-auto de renta?",
    buy: {
      p1: "Los autos ex-renta pueden ser excelentes valores de auto usado, particularmente para compradores enfocados en confiabilidad y bajo costo de entrada. Las principales empresas de renta t\u00edpicamente operan modelos populares y probados (Toyota Camry, Honda Accord, Ford Explorer) que tienen s\u00f3lidos historiales de confiabilidad y disponibilidad abundante de partes. Si el veh\u00edculo tiene un precio apropiado y muestra historial limpio m\u00e1s all\u00e1 del periodo de renta, puede representar una compra s\u00f3lida.",
      p2Before: "La clave es verificar el historial completo \u2014 no solo el periodo de renta. Ejecuta un ",
      p2Link: "reporte completo de historial VIN",
      p2After: " para revisar accidentes, da\u00f1os y problemas de t\u00edtulo despu\u00e9s de que termin\u00f3 el periodo de renta. Un ex-renta que tambi\u00e9n estuvo involucrado en un accidente no reportado despu\u00e9s de salir de la flota es una proposici\u00f3n significativamente diferente que uno con historial limpio post-renta.",
      p3Before: "Tambi\u00e9n ejecuta una ",
      p3LinkAcc: "verificaci\u00f3n de historial de accidentes",
      p3Mid: " y confirma que no haya ",
      p3LinkRecall: "retiros de seguridad",
      p3After: " abiertos antes de tomar una decisi\u00f3n final de compra.",
    },
    faqH2: "Preguntas frecuentes",
    faqLede: "Preguntas comunes sobre revisar un auto usado para historial ex-renta y de flota por VIN.",
    cta: {
      h2: "\u00bfFue este auto de renta? Aver\u00edgualo al instante.",
      body: "Ingresa un VIN de 17 caracteres para revisar el historial de flota de renta, propiedad comercial anterior y registros de matriculaci\u00f3n de flota.",
    },
  },
  fr: {
    crumbs: { home: "Accueil", current: "Vérification voiture de location" },
    h1: "Vérification d'historique de voiture de location par VIN",
    lede: "Les anciens véhicules de location sont un pilier du marché de l'occasion. Après 12 à 24 mois et 20 000 à 40 000 miles de service en flotte, les grandes sociétés de location comme Enterprise, Hertz et Avis vendent leurs flottes via les enchères et les réseaux de concessionnaires. Une vérification VIN voiture de location révèle si le véhicule que tu envisages a passé du temps dans une flotte de location — une information qui affecte directement la façon dont tu évalues son état, son kilométrage et sa valeur.",
    formH2: "Vérifier l'historique de flotte de location",
    howH2: "Comment savoir si une voiture a été une location",
    how: {
      p1: "Les véhicules de location sont immatriculés au nom de la société de location (Enterprise Holdings, Hertz Corporation, Avis Budget Group, etc.) et enregistrés comme véhicules commerciaux de flotte. Ces registres de propriété sont capturés dans les bases de données d'historique de titre et apparaissent dans un rapport VIN complet. Le véhicule montrera l'une de ces entités corporatives comme propriétaire antérieur, typiquement comme premier ou deuxième titulaire après le constructeur.",
      p2: "Les indices visuels peuvent également indiquer un historique de location. Les plaques de flotte, les autocollants de location (laissant parfois un résidu adhésif) et les équipements étrangement configurés (niveaux de finition de base avec des schémas d'usure importants compatibles avec l'usage public) sont des signes physiques qui valent la peine d'être notés lors d'une inspection. Cependant, les sociétés de location désidentifient et reconditionnent typiquement les véhicules avant la vente, donc les preuves physiques seules ne sont pas fiables.",
      p3: "La méthode la plus fiable est une vérification d'historique basée sur le VIN qui montre la chaîne complète de propriété. Un véhicule qui a été la propriété d'une société de location pendant 12 à 24 mois avant d'être transféré à un concessionnaire ou à un particulier a un historique de location indépendamment de ce que le vendeur actuel divulgue.",
    },
    valueH2: "Ce que l'historique de location signifie pour la valeur",
    value: {
      p1: "Les anciens véhicules de location se vendent typiquement avec un rabais modeste par rapport aux véhicules équivalents à propriétaire unique — généralement 5 à 15 % selon la marque, le modèle, le kilométrage et l'état. Ce rabais reflète la perception du marché d'une intensité d'usage moyenne plus élevée pendant la période de location. Savoir si ce rabais reflète précisément une vraie différence de qualité est une question nuancée.",
      p2: "Les sociétés de location tiennent des registres d'entretien détaillés et entretiennent les véhicules selon des horaires stricts — souvent plus régulièrement que les propriétaires privés. Les grandes flottes de location suivent également les dommages et les réparent typiquement avant la revente. Cependant, la nature de l'usage de location signifie que le véhicule a été conduit par des dizaines ou des centaines de personnes différentes, dont certaines l'ont traité durement. L'usure intérieure est souvent la conséquence la plus visible.",
      p3Before: "Utilise l'historique de location comme contexte lors de l'évaluation du prix demandé pour le véhicule, et associe-le à une ",
      p3Link: "vérification de l'odomètre",
      p3After: " pour vérifier que le kilométrage reflète précisément la période de service en flotte.",
    },
    mileageH2: "Location à kilométrage élevé vs. usage normal",
    mileage: {
      lead: "Le profil de kilométrage des véhicules de location diffère de la propriété privée de manière importante. Les voitures de location accumulent la majorité de leur kilométrage lors de trajets autoroutiers — les locations d'aéroport sont particulièrement intensives sur autoroute. Les miles autoroutiers sont généralement plus faciles pour un moteur et une transmission que des miles urbains équivalents, qui impliquent plus d'arrêts et de redémarrages et de fréquents trajets courts (plus durs pour l'huile et les systèmes d'émissions).",
      bullets: [
        "Le kilométrage de location est souvent dominé par l'autoroute, mécaniquement moins exigeant que des miles urbains équivalents.",
        "L'entretien est typiquement effectué dans les délais par des équipes professionnelles d'entretien de flotte.",
        "L'usure intérieure — tapis, sièges, commandes — est souvent accélérée par l'usage public à forte rotation.",
        "L'historique des dommages peut être plus complet et mieux documenté que pour les propriétaires privés qui paient eux-mêmes les réparations mineures.",
      ],
    },
    maintH2: "Pratiques d'entretien de flotte de location",
    maint: {
      p1: "Les grandes sociétés de location exploitent des programmes d'entretien centralisés avec des intervalles de service standardisés. Les véhicules sont typiquement entretenus dans leurs propres installations ou via des accords de service de flotte avec des groupes de concessionnaires. Les vidanges d'huile, rotations de pneus et inspections de freins suivent les calendriers recommandés par le constructeur, et les véhicules présentant des problèmes mécaniques sont rapidement retirés du service — une société de location ne peut pas se permettre d'avoir un client en panne.",
      p2: "Cependant, la qualité de la documentation d'entretien varie selon la société et l'emplacement. Certaines sociétés de location fournissent des registres de service détaillés avec le véhicule à la vente ; d'autres non. Demande toute documentation d'entretien disponible lors de l'achat d'une ancienne location, et envisage de faire inspecter le véhicule par un mécanicien indépendant pour vérifier son état mécanique.",
    },
    buyH2: "Devrais-tu acheter une ancienne voiture de location ?",
    buy: {
      p1: "Les anciennes voitures de location peuvent être d'excellentes valeurs en occasion, particulièrement pour les acheteurs axés sur la fiabilité et le faible coût d'entrée. Les grandes sociétés de location exploitent typiquement des modèles populaires et éprouvés (Toyota Camry, Honda Accord, Ford Explorer) qui ont de solides historiques de fiabilité et une disponibilité abondante de pièces. Si le véhicule est correctement tarifé et montre un historique propre au-delà de la période de location, il peut représenter un achat solide.",
      p2Before: "La clé est de vérifier l'historique complet — pas seulement la période de location. Lance un ",
      p2Link: "rapport d'historique VIN complet",
      p2After: " pour vérifier les accidents, les dommages et les problèmes de titre après la fin de la période de location. Une ancienne location qui a également été impliquée dans un accident non déclaré après avoir quitté la flotte est une proposition significativement différente de celle avec un historique post-location propre.",
      p3Before: "Lance également une ",
      p3LinkAcc: "vérification d'historique d'accidents",
      p3Mid: " et confirme qu'il n'y a aucun ",
      p3LinkRecall: "rappel de sécurité",
      p3After: " ouvert avant de prendre une décision d'achat finale.",
    },
    faqH2: "Questions fréquentes",
    faqLede: "Questions courantes sur la vérification d'une voiture d'occasion pour l'historique d'ancienne location et de flotte par VIN.",
    cta: {
      h2: "Cette voiture était-elle une location ? Découvre-le instantanément.",
      body: "Saisis un VIN de 17 caractères pour vérifier l'historique de flotte de location, la propriété commerciale antérieure et les registres d'immatriculation de flotte.",
    },
  },
} as const;

export const FAQS_EN: Faq[] = [
  { question: "How can I tell if a used car was a rental?", answer: "Run a VIN history check and look at the ownership chain. Former rentals are usually titled to a rental company \u2014 such as Enterprise Holdings, Hertz Corporation, or Avis Budget Group \u2014 typically as the first owner after the manufacturer. Some reports also carry a 'rental' or 'fleet' prior-use designation. Be aware coverage isn't guaranteed: a rental only shows up if the prior owner's title and registration were reported into the history databases." },
  { question: "Is buying a former rental car a bad idea?", answer: "Not necessarily. Former rentals are often well-maintained because rental companies service vehicles on strict schedules and pull problem cars from service quickly. The trade-offs are many different drivers, heavier interior wear, and high mileage accumulated early. A former rental with clean post-rental history can be a sound value \u2014 the key is verifying accidents, damage, and title status after the rental period ended." },
  { question: "How does a VIN check reveal prior rental or fleet use?", answer: "A VIN check pulls the title and registration history, which records each owner. When a rental or fleet company holds the title, that commercial ownership appears in the chain, and many reports flag it as a 'rental' or 'fleet' prior-use designation. Prior use is often inferred from a title or registration showing a rental-company or fleet owner rather than from a single explicit label, so reviewing the full ownership timeline is the most reliable method." },
  { question: "Do former rental cars have more wear and tear?", answer: "It depends on the area. Interiors \u2014 seats, carpets, and controls \u2014 often show accelerated wear because the vehicle was driven by many different people. Mechanically, the picture can be better than expected: rental miles are frequently highway-dominated, which is easier on the drivetrain than stop-and-go city use, and maintenance is typically done on schedule by professional fleet teams. An independent pre-purchase inspection is the best way to confirm condition." },
  { question: "Are ex-rental cars cheaper than other used cars?", answer: "Generally yes. Former rentals usually sell at a modest discount to comparable single-owner vehicles, reflecting the market's perception of higher-intensity use and early mileage. The exact gap varies by make, model, mileage, and condition. Use the rental history as pricing context: a clean former rental priced below comparable cars can be a good deal, but always weigh it against the vehicle's full post-rental history before negotiating." },
  { question: "Where does prior-use data (rental, fleet, lease) come from?", answer: "Prior-use designations \u2014 rental, fleet, lease, taxi, or government \u2014 come from title and registration history and the recorded ownership chain. They can appear as an explicit prior-use note or as a title/use brand, but are often inferred from a title held by a rental company, leasing firm, or fleet operator. Coverage depends on how the prior owner registered and reported the vehicle, so not every former rental is flagged." },
  { question: "Does the title show that a car was previously a rental?", answer: "Sometimes, but not always. A few jurisdictions apply a use brand or note prior commercial or rental use on the title, and the rental company often appears as a prior owner in the title history. However, many former rentals carry an ordinary clean title with no explicit rental brand, so the paper title alone is unreliable. A VIN-based history check that shows the full ownership chain is the most dependable way to confirm prior rental use." },
];

export const FAQS_ES: Faq[] = [
  { question: "\u00bfC\u00f3mo puedo saber si un auto usado fue de renta?", answer: "Ejecuta una verificaci\u00f3n de historial VIN y revisa la cadena de propiedad. Los ex-renta usualmente est\u00e1n titulados a una empresa de renta \u2014 como Enterprise Holdings, Hertz Corporation o Avis Budget Group \u2014 t\u00edpicamente como el primer due\u00f1o despu\u00e9s del fabricante. Algunos reportes tambi\u00e9n llevan una designaci\u00f3n de uso anterior como \u2018renta\u2019 o \u2018flota\u2019. Ten en cuenta que la cobertura no est\u00e1 garantizada: un veh\u00edculo de renta solo aparece si el t\u00edtulo y registro del due\u00f1o anterior se reportaron a las bases de datos de historial." },
  { question: "\u00bfComprar un ex-auto de renta es mala idea?", answer: "No necesariamente. Los ex-renta a menudo est\u00e1n bien mantenidos porque las empresas de renta dan servicio a los veh\u00edculos en horarios estrictos y retiran los autos problem\u00e1ticos del servicio r\u00e1pidamente. Las desventajas son muchos conductores diferentes, mayor desgaste interior y alto kilometraje acumulado temprano. Un ex-renta con historial limpio post-renta puede ser un valor s\u00f3lido \u2014 la clave es verificar accidentes, da\u00f1os y estado del t\u00edtulo despu\u00e9s de que termin\u00f3 el periodo de renta." },
  { question: "\u00bfC\u00f3mo revela una verificaci\u00f3n de VIN el uso previo de renta o flota?", answer: "Una verificaci\u00f3n de VIN extrae el historial de t\u00edtulo y registro, que registra a cada due\u00f1o. Cuando una empresa de renta o flota posee el t\u00edtulo, esa propiedad comercial aparece en la cadena, y muchos reportes la marcan como designaci\u00f3n de uso anterior \u2018renta\u2019 o \u2018flota\u2019. El uso anterior a menudo se infiere de un t\u00edtulo o registro que muestra a una empresa de renta o flota como due\u00f1a en lugar de una etiqueta expl\u00edcita \u00fanica, as\u00ed que revisar la l\u00ednea de tiempo completa de propiedad es el m\u00e9todo m\u00e1s confiable." },
  { question: "\u00bfLos ex-autos de renta tienen m\u00e1s desgaste?", answer: "Depende del \u00e1rea. Los interiores \u2014 asientos, alfombras y controles \u2014 a menudo muestran desgaste acelerado porque el veh\u00edculo fue conducido por muchas personas diferentes. Mec\u00e1nicamente, la situaci\u00f3n puede ser mejor de lo esperado: las millas de renta a menudo son predominantemente de carretera, lo que es m\u00e1s f\u00e1cil para la transmisi\u00f3n que el uso urbano con arranque-paro, y el mantenimiento t\u00edpicamente se hace en horario por equipos profesionales de flota. Una inspecci\u00f3n independiente antes de la compra es la mejor manera de confirmar la condici\u00f3n." },
  { question: "\u00bfLos autos ex-renta son m\u00e1s baratos que otros usados?", answer: "Generalmente s\u00ed. Los ex-renta usualmente se venden con un descuento modesto frente a veh\u00edculos comparables de un solo due\u00f1o, reflejando la percepci\u00f3n del mercado de uso de mayor intensidad y kilometraje temprano. La brecha exacta var\u00eda por marca, modelo, kilometraje y condici\u00f3n. Usa el historial de renta como contexto de precios: un ex-renta limpio con precio por debajo de autos comparables puede ser una buena oferta, pero siempre p\u00e9salo contra el historial completo post-renta del veh\u00edculo antes de negociar." },
  { question: "\u00bfDe d\u00f3nde vienen los datos de uso anterior (renta, flota, arrendamiento)?", answer: "Las designaciones de uso anterior \u2014 renta, flota, arrendamiento, taxi o gobierno \u2014 vienen del historial de t\u00edtulo y registro y de la cadena de propiedad registrada. Pueden aparecer como una nota expl\u00edcita de uso anterior o como una marca de t\u00edtulo/uso, pero a menudo se infieren de un t\u00edtulo en manos de una empresa de renta, firma de arrendamiento u operador de flota. La cobertura depende de c\u00f3mo el due\u00f1o anterior registr\u00f3 y report\u00f3 el veh\u00edculo, as\u00ed que no todo ex-renta est\u00e1 marcado." },
  { question: "\u00bfEl t\u00edtulo muestra que un auto fue previamente de renta?", answer: "A veces, pero no siempre. Algunas jurisdicciones aplican una marca de uso o anotan uso comercial o de renta anterior en el t\u00edtulo, y la empresa de renta a menudo aparece como due\u00f1o anterior en el historial del t\u00edtulo. Sin embargo, muchos ex-renta llevan un t\u00edtulo limpio ordinario sin marca expl\u00edcita de renta, as\u00ed que el t\u00edtulo en papel por s\u00ed solo no es confiable. Una verificaci\u00f3n de historial basada en VIN que muestre la cadena completa de propiedad es la forma m\u00e1s confiable de confirmar uso previo de renta." },
];

export default function RentalCarCheckBody({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (href: string) => (locale === "es" ? `/es${href}` : href);

  return (
    <>
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: c.crumbs.home, href: link("/") }, { label: c.crumbs.current }]} />
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">{c.h1}</h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.lede}</p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">{c.formH2}</h2>
            <VinSearchForm size="sm" locale={locale} />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.howH2}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.how.p1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.how.p2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.how.p3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.valueH2}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.value.p1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.value.p2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.value.p3Before}
            <Link href={link("/odometer-check")} className="text-primary-600 hover:underline font-medium">{c.value.p3Link}</Link>
            {c.value.p3After}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.mileageH2}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.mileage.lead}</p>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.mileage.bullets.map((b) => (
              <li key={b} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.maintH2}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.maint.p1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.maint.p2}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.buyH2}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.buy.p1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.buy.p2Before}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{c.buy.p2Link}</Link>
            {c.buy.p2After}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.buy.p3Before}
            <Link href={link("/accident-history-check")} className="text-primary-600 hover:underline font-medium">{c.buy.p3LinkAcc}</Link>
            {c.buy.p3Mid}
            <Link href={link("/recall-check")} className="text-primary-600 hover:underline font-medium">{c.buy.p3LinkRecall}</Link>
            {c.buy.p3After}
          </p>
        </div>
      </article>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-4">
        <h2 className="text-2xl font-bold text-slate-900">{c.faqH2}</h2>
        <p className="mt-3 text-slate-600 leading-relaxed">{c.faqLede}</p>
        <div className="mt-6 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-xl border border-slate-200 bg-white p-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">{faq.question}</h3>
                <span className="text-2xl text-primary-600 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="/rental-car-check" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.cta.h2}</h2>
          <p className="text-slate-700 mb-6">{c.cta.body}</p>
          <VinSearchForm size="sm" locale={locale} />
        </div>
      </section>
    </>
  );
}
