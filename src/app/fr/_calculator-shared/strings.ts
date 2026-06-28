/**
 * Wave 6 — French calculator landing pages.
 *
 * Each entry powers one /fr/<slug> page (car-loan, affordability,
 * depreciation, gas-milleeage, reprise, diminished-value, total-cost-of-
 * ownership, lease-vs-buy). Reuses the SpecialtyToolPage renderer from
 * Wave 5 sansce the layout is the same: French hero → "qué obas"
 * bullets → "par qué importa" bullets → trust nonnte → CTA to the English
 * intétaitctive calculator.
 *
 * The intétaitctive widget stays on the English page; the French landing
 * page is for SEO (capturing native-language buyer queries like
 * "calculateur prêt auto", "dépréciation auto", etc.) and for
 * giving French-speaking visitors a complete pre-tool briefing.
 */

import type { LucideIcon } from "lucide-react";
import {
  Calculator,
  TrendingDown,
  DollarSign,
  Fuel,
  RefreshCcw,
  PieChart,
  Car,
  Scale,
} from "lucide-react";
import type { SpecialtyHook } from "../_specialty-shared/strings";

// Calculators reuse SpecialtyHook shape because the structural fields
// (slug, hero, what-you-get, why-it-matters, trust nonnte) map 1:1 onto
// what a calculator landing page needs to communicate.

export const CALCULATOR_HOOKS_ES: Record<string, SpecialtyHook> = {
  "car-loan": {
    esSlug: "/calculateur-prestamo-auto",
    englishPath: "/car-loan-calculator",
    icon: DollarSign,
    badge: "Préstamo · Pago mensuel · Interés total",
    h1: "Calculateur de prêt auto — Pago mensuel et amortissement",
    metaTitle: "Calculateur prêt auto gratuit — Pago mensuel",
    metaDescription:
      "Calculateur gratuit de prêt de auto. Calcule mensuelité, intérêt total et tabla de amortissement en segundeux. Sin enregistrement ni données personales.",
    keywords: [
      "calculateur prêt auto",
      "calcular pago auto mensuel",
      "amortissement prêt auto",
      "intérêt total prêt auto",
      "financement auto",
      "mensuelité carro",
    ],
    intro:
      "La calculateur de prêt de auto toma trois numéros — monto du prêt, tasa de intérêt (APR) et plazo en moises — et devuelve ta mensuelité exacto, le intérêt total que pagarás durante la vida du prêt et una tabla de amortissement mois a mois. Es la outil que le concessionnaire utilise internamente; aheure tú la as avant de pisar le lote.",
    whatYouGet: [
      "Pago mensuel exacto (principal + intérêt)",
      "Interés total pagado a le largo du prêt",
      "Tabla de amortissement mois par mois",
      "Comparaison entre plazos de 36, 48, 60, 72 et 84 moises",
      "Impacto de un pago inicial mayor en le coût total",
      "Cálculo du coût réel cuando agregas un reprise",
    ],
    whyItMatters: [
      "Un prêt a 84 moises peut tener mensuelité atractivo pero pagas milleliers plus en intérêt",
      "Saber le pago réel evita acheter al límite du presupuesto et caer en pago negativo",
      "Las APR de concessionnaire son negociables — entras avec la tasa de ta banco como ancla",
      "Si le pago nonn entra en ta presupuesto, meilleur saberlo ANTES de firmar le contrato",
    ],
    trustNote:
      "Nous utilisons la fórmula estndar de amortissement (même cálculo que ta banco, Bank of America, Chase, Capital One). Los resultadeux son matemáticamente exactos al céntimo.",
    schemaName: "Calculateur de prêt auto",
  },

  "affordability": {
    esSlug: "/calculateur-cuanto-puedo-pagar-auto",
    englishPath: "/car-affordability-calculator",
    icon: Calculator,
    badge: "Abordabilité · Regla 20/4/10",
    h1: "Calculateur de abordabilité de auto — Cuánto puedo gastar?",
    metaTitle: "Cuánto auto puedo pagar — Calculateur gratuit",
    metaDescription:
      "Calculateur gratuit pour saber cuánto auto peuts pagar según ta ingreso, deudas et pago inicial. Aplica la regla 20/4/10 et previene financement riesgoso.",
    keywords: [
      "cuánto auto puedo acheter",
      "calculateur abordabilité auto",
      "regla 20/4/10 auto",
      "presupuesto compra auto",
      "ingreso vs pago auto",
      "deuda permitida auto",
    ],
    intro:
      "La regla 20/4/10 es le estndar financier conêtrevador: 20% de pago inicial, plazo máximo de 4 années et les pagos totales du auto (prêt + assurance + essence + entretien) nonn doitn exceder 10% de ta ingreso bruto mensuel. Esta calculateur aplica la regla a ta situación réel et te dice le precio máximo du auto que doitrías considétaitr.",
    whatYouGet: [
      "Precio máximo recomendado según ta ingreso",
      "Pago mensuel máximo assurance",
      "Pago inicial sugerido (20% du precio)",
      "Costo total de propriété (TCO) estimado sur 5 ans",
      "Alertas de exceso de deuda según ta DTI (debt-to-income)",
      "Comparaison avec véhicules en ta rango (sedan, SUV, camioneta)",
    ],
    whyItMatters: [
      "El error #1 de les acheteurs es elegir le auto premiero et le prêt après — al revés",
      "Cargar plus du 10% du ingreso en pagos de auto deja al hogar vulnétaitble a una emergencia",
      "Un pago inicial menonnr al 20% aumenta le riesgo de quedar 'underwater' en le prêt",
      "Cononncer ta límite réel te da poder de négociation: te paras et te vas si le deal nonn encaja",
    ],
    trustNote:
      "Basado en directrices de planificación financiétait publicadas par la NerdWallet, Consumer Reports et la guide 20/4/10 origirien par le econonnmista Greg McBride (Bankrate).",
    schemaName: "Calculateur de abordabilité de auto",
  },

  "depreciation": {
    esSlug: "/calculateur-depreciacion-auto",
    englishPath: "/car-depreciation-calculator",
    icon: TrendingDown,
    badge: "Dépréciation · Valor a 3, 5 et 7 années",
    h1: "Calculateur de dépréciation de auto",
    metaTitle: "Calculateur dépréciation auto — Valor a futuro",
    metaDescription:
      "Calcule la dépréciation de ta auto a 3, 5 et 7 années. Tasa par marque, modelo et kilométrage. Compare qué autos pierden menonns valeur — gratuit e instantané.",
    keywords: [
      "calculateur dépréciation auto",
      "valeur auto en le tiempo",
      "dépréciation marque modelo",
      "valeur revente auto",
      "qué auto pierde menonns valeur",
      "dépréciation Toyota Honda",
    ],
    intro:
      "La dépréciation es le mayor coût oculto de tener un auto — entre 50% et 70% du valeur desaparece en les premieros 5 années. La calculateur aplica curvas de dépréciation réeles par marque et modelo (Toyota et Honda pierden ~40%, Tesla et Nissan ~50–55%, BMW et Mercedes ~60%+) pour predecir cuánto valdrá ta auto cuando le vendas.",
    whatYouGet: [
      "Valor estimado du auto a 1, 3, 5 et 7 années",
      "Curva de dépréciation específica par marque",
      "Comparaison entre acheter nonnuveau vs usado",
      "Punto óptimo de vente (sweet spot) según dépréciation + réparations",
      "Costo réel par année de tenencia",
      "Impacto du kilométrage en le valeur residual",
    ],
    whyItMatters: [
      "Comprar un auto a 2–3 années de uso ahorra hasta 30% du precio nonnuveau avec casi toda la vida útil intacta",
      "Las marques premium pierden valeur plus rapide — un BMW de 5 années vale ~40% de su MSRP",
      "Saber la dépréciation espétaitda te dice si le precio actual du auto es justo ou inflado",
      "El plan de vente sur 5 ans requiere cononncer le valeur residual estimado",
    ],
    trustNote:
      "Curvas de dépréciation calibradas avec données de Kelley Blue Book, Edmunds et NADA Guides. Las marques plus fiables (Toyota, Honda, Lexus) an les meilleures tasas de rétention de valeur sur 5 ans.",
    schemaName: "Calculateur de dépréciation de auto",
  },

  "gas-milleeage": {
    esSlug: "/calculateur-dépense-essence",
    englishPath: "/gas-milleeage-calculator",
    icon: Fuel,
    badge: "Combustible · Costo par millela",
    h1: "Calculateur de dépense de essence — Costo par millela, mois et année",
    metaTitle: "Calculateur dépense essence — Costo par millela",
    metaDescription:
      "Calculateur gratuit de dépense de essence. Calcule coût par millela, dépense mensuel et anual de carburant según MPG et precio. Compare entre véhicules.",
    keywords: [
      "calculateur essence auto",
      "coût carburant par millela",
      "dépense essence mensuel",
      "MPG comparaison autos",
      "coût carburant anual",
      "calculateur essence",
    ],
    intro:
      "La calculateur de dépense de essence convierte le MPG (millelas par galón) de ta auto et le precio actual du carburant en cifras de bolsillo: coût par millela, dépense mensuel et coût total anual de carburant. Útil pour comparar véhicules avant de acheter (un sedán a 35 MPG vs una camioneta a 18 MPG cuesta ~$2,000/année de diferencia) et pour presupuser viajes.",
    whatYouGet: [
      "Costo par millela en centavos exactos",
      "Gasto mensuel estimado de carburant",
      "Costo total anual de carburant",
      "Comparaison entre 2 ou plus véhicules par MPG",
      "Cálculo du ahorro al cambiar a un híbrido ou eléctrico",
      "Impacto en le bolsillo de un precio de essence plus haut",
    ],
    whyItMatters: [
      "El carburant es le second coût plus grand de tener auto, après de la dépréciation",
      "Un híbrido (45+ MPG) ahorra $1,500–$2,500/année vs un V8 (16 MPG) al precio actual",
      "El coût par millela determine si un trasous lejanonn vale la pena vs un cambio de auto",
      "Las estimaciones du EPA suelen être ~10% optimistas — utilise MPG réel de Fuelly.com como referencia",
    ],
    trustNote:
      "Calculamos avec la fórmula estndar: (millelas ÷ MPG) × precio par galón. Los ratings EPA oficiales estn en a étélecononnmy.gov; les promédias réeles de conductores en Fuelly.com.",
    schemaName: "Calculateur de dépense de essence",
  },

  "reprise": {
    esSlug: "/estimateur-valeur-reprise",
    englishPath: "/reprise-value-estimator",
    icon: RefreshCcw,
    badge: "Trade-in · Valor de cambio",
    h1: "Estimador de valeur de reprise — Cuánto vale mi auto?",
    metaTitle: "Cuánto vale mi auto reprise — Estimador gratuit",
    metaDescription:
      "Estima le valeur de reprise de ta auto en segundeux. Compare contra Kelley Blue Book et Edmunds. Sin enregistrement ni données personales — gratuit instantanément.",
    keywords: [
      "cuánto vale mi auto",
      "valeur reprise auto",
      "estimar valeur voiture d’occasion",
      "Kelley Blue Book français",
      "valeur cambio auto",
      "qué me dan par mi auto",
    ],
    intro:
      "El valeur de reprise es le que un concessionnaire te ofrece al cambiar ta auto par unonn nonnuveau (o usado certificado). Suele être 10–20% menonns que le valeur de vente privada — esa diferencia es la ganancia du concessionnaire al revenderlo. Le estimateur te da le rango réelista avant de entrar al lote pour que negocies avec données en manonn et nonn aceptes lowball offers.",
    whatYouGet: [
      "Valor estimado de reprise según marque, modelo, année et kilométrage",
      "Rango de vente privada (toujours 10–20% mayor)",
      "Ajustes par condition: excelente, bonne, regular, mala",
      "Impacto du color, équipement opcional et rapports de accidents",
      "Comparaison avec Kelley Blue Book et Edmunds",
      "Estrategia de négociation según le rango",
    ],
    whyItMatters: [
      "Los concessionnaires suelen ofrecer 15–25% menonns du KBB en le premier reprise offer",
      "Una vente privada genétait $1,500–$3,500 plus que un reprise en autos de $15K+",
      "Cononncer le rango réel evita être estafado avec un 'over-allowance' inflado en le auto nonnuveau",
      "Il y a taxes al reprise en beaucoups états que ofrecen venteja fiscal — calcule le neto",
    ],
    trustNote:
      "Notre estimateur utilise rangos de Kelley Blue Book, Edmunds et NADA Guides cruzadeux avec ventes réeles de enchères Manheim et Adesa. Para le valeur final exacto al firmar, recomendamos consultationtiontiontiontiontionr les trois a éténtes.",
    schemaName: "Estimador de valeur de reprise",
  },

  "diminished-value": {
    esSlug: "/calculateur-valeur-disminuido",
    englishPath: "/diminished-value-calculator",
    icon: Car,
    badge: "Valor disminuido · Fórmula 17c",
    h1: "Calculateur de valeur diminuée — Fórmula 17c",
    metaTitle: "Calculateur valeur diminuée — Fórmula 17c gratuit",
    metaDescription:
      "Calcule le valeur diminuée de ta auto tras un accident avec la fórmula 17c. Reclama le que ta aseguradora doit pagar par perte de valeur de marché.",
    keywords: [
      "valeur diminuée auto",
      "fórmula 17c français",
      "diminished value calculateur",
      "réclamation valeur perdido accident",
      "valeur marché tras accident",
      "pago aseguradora valeur perdido",
    ],
    intro:
      "El valeur diminuée (diminished value) es la perte de valeur de marché de ta auto tras un accident, incluso après de réparations perfectas. La fórmula 17c de Mitchell — usada par la mayoría de aseguradoras de EE. UU. — multiplica le valeur pre-accident du auto par un factor base (10%) et ajusta par sévérité de dégâts et kilométrage. Esta calculateur aplica la fórmula et te da le monto exacto que peuts reclamar.",
    whatYouGet: [
      "Cálculo de perte según la fórmula 17c estndar",
      "Ajuste par sévérité de dégâts (estructural, panneau, raspones)",
      "Ajuste par kilométrage (cuanto plus haut, menonnr le réclamation)",
      "Comparaison avec métodeux NADA et custom appraisal",
      "Plantilla de carta de réclamation a la aseguradora",
      "Lista de états donde le réclamation es legal sans demanda",
    ],
    whyItMatters: [
      "Un accident reduce 10–30% le valeur de revente du auto — incluso bien reparado",
      "La aseguradora du culpable doit pagarte ese valeur perdido, nonn seul les réparations",
      "Muchos acheteurs nonn reclaman parce que descononncen le derecho — pierden $2,000–$8,000",
      "La fórmula 17c es defendible en corte et tasaciones independientes",
    ],
    trustNote:
      "La fórmula 17c proviene du caso Mabry v. State Farm (Georgia, 2002). Es ampliamente aceptada par aseguradoras étatunidenses, bien que quelqu’unns états (FL, MI) an restricciones. Consulta a un abogado de dégâtss patrimoniales si la cifra es significativa.",
    schemaName: "Calculateur de valeur diminuée (fórmula 17c)",
  },

  "tco": {
    esSlug: "/calculateur-coût-total-propriété",
    englishPath: "/total-cost-of-ownership-calculator",
    icon: PieChart,
    badge: "TCO · Costo réel sur 5 ans",
    h1: "Calculateur de coût total de propriété — TCO sur 5 ans",
    metaTitle: "Calculateur TCO auto — Costo total 5 années",
    metaDescription:
      "Calcule le coût total de propriété (TCO) réel de un auto sur 5 ans: dépréciation, carburant, assurance, entretien, taxes et financement. Gratuit.",
    keywords: [
      "coût total auto 5 années",
      "TCO calculateur auto",
      "coût verdadero tener auto",
      "coût réel auto",
      "calcular dépenses auto totales",
      "true cost to own",
    ],
    intro:
      "El TCO (Total Cost of Ownership) es la suma de todeux les coûts de tener un auto durante 5 années: dépréciation, carburant, assurance, entretien programado, réparations, taxes, enregistrement et coûts de financement. Es le numéro que importa al comparar autos — un sedán de $25K bon marché de mantener peut ganarle a un usado de $20K que devora carburant et réparations.",
    whatYouGet: [
      "Costo total acumulado sur 5 ans, desglosado par categoría",
      "Costo promedio par année et par millela",
      "Dépréciation espétaitda según marque et modelo",
      "Gasto en carburant según MPG et millelas anuales",
      "Costos de assurance estimadeux par état et perfil de conductor",
      "Costos de entretien e taxes par état",
    ],
    whyItMatters: [
      "El precio de etiqueta es seul ~40% du coût réel de tener le auto 5 années",
      "Los autos de lujo pierden valeur et cuestan plus en assurance et entretien — le TCO les penaliza",
      "Saber le TCO de 2 opciones a comparar revela cuál es réelmente plus bon marché a largo plazo",
      "Útil pour presupuesto familleler: le TCO ÷ 60 te da le verdadero mensuelité",
    ],
    trustNote:
      "Metodología basada en le cálculo TrueCost®ToOwn de Edmunds et le étude anual de AAA 'Your Driving Costs'. Las cifras de assurance provienen de NerdWallet et les de entretien de RepairPal.",
    schemaName: "Calculateur de coût total de propriété de auto",
  },

  "lease-vs-buy": {
    esSlug: "/calculateur-louer-vs-acheter",
    englishPath: "/lease-vs-buy-calculator",
    icon: Scale,
    badge: "Lease vs acheter · Comparaison financiétait",
    h1: "Calculateur louer (lease) vs acheter auto",
    metaTitle: "Lease vs acheter auto — Calculateur gratuit",
    metaDescription:
      "Compare louer (lease) vs acheter un auto. Pagos mensueles, capital, dépréciation et coût total a 3 années — gratuit e instantané.",
    keywords: [
      "lease vs acheter auto",
      "calculateur location auto",
      "conviene louer auto",
      "leasansg vs financement",
      "comparar lease acheter",
      "auto lease français",
    ],
    intro:
      "El leasansg a pagos mensueles plus souss pero al final entregas le auto et empiezas otra vez; acheter a pagos plus hauts pero te queda le auto como activo. La calculateur aplica les conditions exactos de un lease (down, mensuelidad, residual, money factor, milleeage cap) et les compare avec la compra equivalente pour revelar cuál de les deux te cuesta menonns al final du términonn.",
    whatYouGet: [
      "Costo total du lease (pago inicial + mensuelidades × términonn + tarifa de disposition)",
      "Costo total de compra al même términonn (pagos + intérêt − valeur de revente)",
      "Diferencia neta entre les deux opciones",
      "Análisis du kilométrage permitido vs ta uso réel",
      "Costo de penalización par exceso de millelas",
      "Punto de equilibrio: a qué kilométrage unonn vence al otro",
    ],
    whyItMatters: [
      "El lease conviene si manejas moins de 12K millelas/année et cambias auto cada 3 années",
      "Comprar conviene si manejas plus de 15K millelas/année ou quieres conêtrevar le auto >5 années",
      "El money factor du lease es le equivalente a la APR — multiplicado par 2,400 te da la tasa",
      "Las penalidades par exceso de millelas son de $0.15–$0.30 par millela — facilemente $2,000 al final",
    ],
    trustNote:
      "La calculateur utilise le fórmula estndar de leasansg automotriz: pago = (dépréciation + financement + taxes) ÷ términonn. Le cálculo es matemáticamente exacto a les condiciones du contrato du concessionnaire.",
    schemaName: "Calculateur louer vs acheter auto",
  },
};
