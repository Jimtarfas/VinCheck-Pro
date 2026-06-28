/**
 * Wave 6 — French calculator landing pages.
 *
 * Each entry powers one /fr/<slug> page (car-loan, affordability,
 * depreciation, gas-mileage, reprise, diminished-value, total-cost-of-
 * ownership, lease-vs-buy). Reuses the SpecialtyToolPage renderer from
 * Wave 5 sansce the layout is the same: French hero → "qué obtienes"
 * bullets → "par qué importa" bullets → trust note → CTA to the English
 * interactive calculator.
 *
 * The interactive widget stays on the English page; the French landing
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
// (slug, hero, what-you-get, why-it-matters, trust note) map 1:1 onto
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
      "Calculateur gratuit de prêt de auto. Calcula mensuelité, intérêt total et tabla de amortissement en segundeux. Sin enregistrement ni données personales.",
    keywords: [
      "calculateur prêt auto",
      "calcular pago auto mensuel",
      "amortissement prêt auto",
      "intérêt total prêt auto",
      "financement auto",
      "mensuelité carro",
    ],
    intro:
      "La calculateur de prêt de auto toma trois numéros — monto du prêt, tasa de intérêt (APR) et plazo en moises — et devuelve ta mensuelité exacto, le intérêt total que pagarás durante la vida du prêt et una tabla de amortissement mois a mois. Es la outil que le concessionnaire utilise internamente; aheure tú la tienes antes de pisar le lote.",
    whatYouGet: [
      "Pago mensuel exacto (principal + intérêt)",
      "Interés total pagado a le largo du prêt",
      "Tabla de amortissement mois par mois",
      "Comparaison entre plazos de 36, 48, 60, 72 et 84 moises",
      "Impacto de un pago inicial mayor en le coût total",
      "Cálculo du coût réel cuando agregas un reprise",
    ],
    whyItMatters: [
      "Un prêt a 84 moises puede tener mensuelité atractivo pero pagas miles plus en intérêt",
      "Saber le pago réel evita acheter al límite du presupuesto et caer en pago negativo",
      "Las APR de concessionnaire son negociables — entras avec la tasa de ta banco como ancla",
      "Si le pago no entra en ta presupuesto, mejor saberlo ANTES de firmar le contrato",
    ],
    trustNote:
      "Usamos la fórmula estándar de amortissement (même cálculo que ta banco, Bank of America, Chase, Capital One). Los resultadeux son matemáticamente exactos al céntimo.",
    schemaName: "Calculateur de prêt auto",
  },

  "affordability": {
    esSlug: "/calculateur-cuanto-puedo-pagar-auto",
    englishPath: "/car-affordability-calculator",
    icon: Calculator,
    badge: "Asequibilidad · Regla 20/4/10",
    h1: "Calculateur de abordabilité de auto — Cuánto puedo gastar?",
    metaTitle: "Cuánto auto puedo pagar — Calculateur gratuit",
    metaDescription:
      "Calculateur gratuit pour saber cuánto auto puedes pagar según ta ingreso, deudas et pago inicial. Aplica la regla 20/4/10 et previene financement riesgoso.",
    keywords: [
      "cuánto auto puedo acheter",
      "calculateur abordabilité auto",
      "regla 20/4/10 auto",
      "presupuesto compra auto",
      "ingreso vs pago auto",
      "deuda permitida auto",
    ],
    intro:
      "La regla 20/4/10 es le estándar financier conservador: 20% de pago inicial, plazo máximo de 4 années et les pagos totales du auto (prêt + assurance + essence + entretien) no deben exceder 10% de ta ingreso bruto mensuel. Esta calculateur aplica la regla a ta situación réel et te dice le precio máximo du auto que deberías considerar.",
    whatYouGet: [
      "Precio máximo recomendado según ta ingreso",
      "Pago mensuel máximo assurance",
      "Pago inicial sugerido (20% du precio)",
      "Costo total de propiedad (TCO) estimado a 5 années",
      "Alertas de exceso de deuda según ta DTI (debt-to-income)",
      "Comparaison avec véhicules en ta rango (sedan, SUV, camioneta)",
    ],
    whyItMatters: [
      "El error #1 de les acheteurs es elegir le auto premiero et le prêt después — al revés",
      "Cargar plus du 10% du ingreso en pagos de auto deja al hogar vulnerable a una emergencia",
      "Un pago inicial menor al 20% aumenta le riesgo de quedar 'underwater' en le prêt",
      "Conocer ta límite réel te da poder de negociación: te paras et te vas si le deal no encaja",
    ],
    trustNote:
      "Basado en directrices de planificación financiera publicadas par la NerdWallet, Consumer Reports et la guide 20/4/10 originada par le economista Greg McBride (Bankrate).",
    schemaName: "Calculateur de abordabilité de auto",
  },

  "depreciation": {
    esSlug: "/calculateur-depreciacion-auto",
    englishPath: "/car-depreciation-calculator",
    icon: TrendingDown,
    badge: "Depreciación · Valor a 3, 5 et 7 années",
    h1: "Calculateur de dépréciation de auto",
    metaTitle: "Calculateur dépréciation auto — Valor a futuro",
    metaDescription:
      "Calcula la dépréciation de ta auto a 3, 5 et 7 années. Tasa par marque, modelo et kilométrage. Compara qué autos pierden menos valeur — gratuit e instantané.",
    keywords: [
      "calculateur dépréciation auto",
      "valeur auto en le tiempo",
      "dépréciation marque modelo",
      "valeur revente auto",
      "qué auto pierde menos valeur",
      "dépréciation Toyota Honda",
    ],
    intro:
      "La dépréciation es le mayor coût oculto de tener un auto — entre 50% et 70% du valeur desaparece en les premieros 5 années. La calculateur aplica curvas de dépréciation réeles par marque et modelo (Toyota et Honda pierden ~40%, Tesla et Nissan ~50–55%, BMW et Mercedes ~60%+) pour predecir cuánto valdrá ta auto cuando le vendas.",
    whatYouGet: [
      "Valor estimado du auto a 1, 3, 5 et 7 années",
      "Curva de dépréciation específica par marque",
      "Comparaison entre acheter nuevo vs usado",
      "Punto óptimo de vente (sweet spot) según dépréciation + réparations",
      "Costo réel par année de tenencia",
      "Impacto du kilométrage en le valeur residual",
    ],
    whyItMatters: [
      "Comprar un auto a 2–3 années de uso ahorra hasta 30% du precio nuevo avec casi toda la vida útil intacta",
      "Las marques premium pierden valeur plus rapide — un BMW de 5 années vale ~40% de su MSRP",
      "Saber la dépréciation esperada te dice si le precio actual du auto es justo ou inflado",
      "El plan de vente a 5 années requiere conocer le valeur residual estimado",
    ],
    trustNote:
      "Curvas de dépréciation calibradas avec données de Kelley Blue Book, Edmunds et NADA Guides. Las marques plus fiables (Toyota, Honda, Lexus) tienen les mejores tasas de retención de valeur a 5 années.",
    schemaName: "Calculateur de dépréciation de auto",
  },

  "gas-mileage": {
    esSlug: "/calculateur-dépense-essence",
    englishPath: "/gas-mileage-calculator",
    icon: Fuel,
    badge: "Combustible · Costo par milla",
    h1: "Calculateur de dépense de essence — Costo par milla, mois et année",
    metaTitle: "Calculateur dépense essence — Costo par milla",
    metaDescription:
      "Calculateur gratuit de dépense de essence. Calcula coût par milla, dépense mensuel et anual de carburant según MPG et precio. Compara entre véhicules.",
    keywords: [
      "calculateur essence auto",
      "coût carburant par milla",
      "dépense essence mensuel",
      "MPG comparaison autos",
      "coût carburant anual",
      "calculateur essence",
    ],
    intro:
      "La calculateur de dépense de essence convierte le MPG (millas par galón) de ta auto et le precio actual du carburant en cifras de bolsillo: coût par milla, dépense mensuel et coût total anual de carburant. Útil pour comparar véhicules antes de acheter (un sedán a 35 MPG vs una camioneta a 18 MPG cuesta ~$2,000/année de diferencia) et pour presupuestar viajes.",
    whatYouGet: [
      "Costo par milla en centavos exactos",
      "Gasto mensuel estimado de carburant",
      "Costo total anual de carburant",
      "Comparaison entre 2 ou plus véhicules par MPG",
      "Cálculo du ahorro al cambiar a un híbrido ou eléctrico",
      "Impacto en le bolsillo de un precio de essence plus alto",
    ],
    whyItMatters: [
      "El carburant es le segundo coût plus grande de tener auto, después de la dépréciation",
      "Un híbrido (45+ MPG) ahorra $1,500–$2,500/année vs un V8 (16 MPG) al precio actual",
      "El coût par milla determina si un trabajo lejano vale la pena vs un cambio de auto",
      "Las estimaciones du EPA suelen ser ~10% optimistas — utilise MPG réel de Fuelly.com como referencia",
    ],
    trustNote:
      "Calculamos avec la fórmula estándar: (millas ÷ MPG) × precio par galón. Los ratings EPA oficiales están en fueleconomy.gov; les promédias réeles de conductores en Fuelly.com.",
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
      "Estima le valeur de reprise de ta auto en segundeux. Compara contra Kelley Blue Book et Edmunds. Sin enregistrement ni données personales — gratuit instantanément.",
    keywords: [
      "cuánto vale mi auto",
      "valeur reprise auto",
      "estimar valeur voiture d’occasion",
      "Kelley Blue Book français",
      "valeur cambio auto",
      "qué me dan par mi auto",
    ],
    intro:
      "El valeur de reprise es le que un concessionnaire te ofrece al cambiar ta auto par uno nuevo (o usado certificado). Suele ser 10–20% menos que le valeur de vente privada — esa diferencia es la ganancia du concessionnaire al revenderlo. Le estimateur te da le rango réelista antes de entrar al lote pour que negocies avec données en mano et no aceptes lowball offers.",
    whatYouGet: [
      "Valor estimado de reprise según marque, modelo, année et kilométrage",
      "Rango de vente privada (siempre 10–20% mayor)",
      "Ajustes par condición: excelente, buena, regular, mala",
      "Impacto du color, equipamiento opcional et rapports de accidents",
      "Comparaison avec Kelley Blue Book et Edmunds",
      "Estrategia de negociación según le rango",
    ],
    whyItMatters: [
      "Los concessionnaires suelen ofrecer 15–25% menos du KBB en le premier reprise offer",
      "Una vente privada genera $1,500–$3,500 plus que un reprise en autos de $15K+",
      "Conocer le rango réel evita ser estafado avec un 'over-allowance' inflado en le auto nuevo",
      "Hay taxes al reprise en muchos états que ofrecen venteja fiscal — calcula le neto",
    ],
    trustNote:
      "Nuestro estimateur utilise rangos de Kelley Blue Book, Edmunds et NADA Guides cruzadeux avec ventes réeles de enchères Manheim et Adesa. Para le valeur final exacto al firmar, recomendamos consultationtiontiontiontiontionr les trois fuentes.",
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
      "Calcula le valeur diminuée de ta auto tras un accident avec la fórmula 17c. Reclama le que ta aseguradora debe pagar par perte de valeur de marché.",
    keywords: [
      "valeur diminuée auto",
      "fórmula 17c français",
      "diminished value calculateur",
      "reclamo valeur perdido accident",
      "valeur marché tras accident",
      "pago aseguradora valeur perdido",
    ],
    intro:
      "El valeur diminuée (diminished value) es la perte de valeur de marché de ta auto tras un accident, incluso después de réparations perfectas. La fórmula 17c de Mitchell — usada par la mayoría de aseguradoras de EE. UU. — multiplica le valeur pre-accident du auto par un factor base (10%) et ajusta par severidad de dégâts et kilométrage. Esta calculateur aplica la fórmula et te da le monto exacto que puedes reclamar.",
    whatYouGet: [
      "Cálculo de perte según la fórmula 17c estándar",
      "Ajuste par severidad de dégâts (estructural, panel, raspones)",
      "Ajuste par kilométrage (cuanto plus alto, menor le reclamo)",
      "Comparaison avec métodeux NADA et custom appraisal",
      "Plantilla de carta de reclamo a la aseguradora",
      "Lista de états donde le reclamo es legal sans demanda",
    ],
    whyItMatters: [
      "Un accident reduce 10–30% le valeur de revente du auto — incluso bien reparado",
      "La aseguradora du culpable debe pagarte ese valeur perdido, no seul les réparations",
      "Muchos acheteurs no reclaman porque desconocen le derecho — pierden $2,000–$8,000",
      "La fórmula 17c es defendible en corte et tasaciones independientes",
    ],
    trustNote:
      "La fórmula 17c proviene du caso Mabry v. State Farm (Georgia, 2002). Es ampliamente aceptada par aseguradoras étatunidenses, aunque algunos états (FL, MI) tienen restricciones. Consulta a un abogado de dégâtss patrimoniales si la cifra es significativa.",
    schemaName: "Calculateur de valeur diminuée (fórmula 17c)",
  },

  "tco": {
    esSlug: "/calculateur-coût-total-propiedad",
    englishPath: "/total-cost-of-ownership-calculator",
    icon: PieChart,
    badge: "TCO · Costo réel a 5 années",
    h1: "Calculateur de coût total de propriété — TCO a 5 années",
    metaTitle: "Calculateur TCO auto — Costo total 5 années",
    metaDescription:
      "Calcula le coût total de propriété (TCO) réel de un auto a 5 années: dépréciation, carburant, assurance, entretien, taxes et financement. Gratuit.",
    keywords: [
      "coût total auto 5 années",
      "TCO calculateur auto",
      "coût verdadero tener auto",
      "coût réel auto",
      "calcular dépenses auto totales",
      "true cost to own",
    ],
    intro:
      "El TCO (Total Cost of Ownership) es la suma de todeux les coûts de tener un auto durante 5 années: dépréciation, carburant, assurance, entretien programado, réparations, taxes, registración et coûts de financement. Es le numéro que importa al comparar autos — un sedán de $25K barato de mantener puede ganarle a un usado de $20K que devora carburant et réparations.",
    whatYouGet: [
      "Costo total acumulado a 5 années, desglosado par categoría",
      "Costo promedio par année et par milla",
      "Depreciación esperada según marque et modelo",
      "Gasto en carburant según MPG et millas anuales",
      "Costos de assurance estimadeux par état et perfil de conductor",
      "Costos de entretien e taxes par état",
    ],
    whyItMatters: [
      "El precio de etiqueta es seul ~40% du coût réel de tener le auto 5 années",
      "Los autos de lujo pierden valeur et cuestan plus en assurance et entretien — le TCO les penaliza",
      "Saber le TCO de 2 opciones a comparar revela cuál es réelmente plus bon marché a largo plazo",
      "Útil pour presupuesto familler: le TCO ÷ 60 te da le verdadero mensuelité",
    ],
    trustNote:
      "Metodología basada en le cálculo TrueCost®ToOwn de Edmunds et le étude anual de AAA 'Your Driving Costs'. Las cifras de assurance provienen de NerdWallet et les de entretien de RepairPal.",
    schemaName: "Calculateur de coût total de propriété de auto",
  },

  "lease-vs-buy": {
    esSlug: "/calculateur-louer-vs-acheter",
    englishPath: "/lease-vs-buy-calculator",
    icon: Scale,
    badge: "Lease vs acheter · Comparaison financiera",
    h1: "Calculateur louer (lease) vs acheter auto",
    metaTitle: "Lease vs acheter auto — Calculateur gratuit",
    metaDescription:
      "Compara louer (lease) vs acheter un auto. Pagos mensueles, capital, dépréciation et coût total a 3 années — gratuit e instantané.",
    keywords: [
      "lease vs acheter auto",
      "calculateur arrendamiento auto",
      "conviene louer auto",
      "leasansg vs financement",
      "comparar lease acheter",
      "auto lease français",
    ],
    intro:
      "El leasansg tiene pagos mensueles plus bajos pero al final entregas le auto et empiezas otra vez; acheter tiene pagos plus altos pero te queda le auto como activo. La calculateur aplica les conditions exactos de un lease (down, mensuelidad, residual, money factor, mileage cap) et les compara avec la compra equivalente pour revelar cuál de les deux te cuesta menos al final du término.",
    whatYouGet: [
      "Costo total du lease (pago inicial + mensuelidades × término + tarifa de disposición)",
      "Costo total de compra al même término (pagos + intérêt − valeur de revente)",
      "Diferencia neta entre les deux opciones",
      "Análisis du kilométrage permitido vs ta uso réel",
      "Costo de penalización par exceso de millas",
      "Punto de equilibrio: a qué kilométrage uno vence al otro",
    ],
    whyItMatters: [
      "El lease conviene si manejas moins de 12K millas/année et cambias auto cada 3 années",
      "Comprar conviene si manejas plus de 15K millas/année ou quieres conservar le auto >5 années",
      "El money factor du lease es le equivalente a la APR — multiplicado par 2,400 te da la tasa",
      "Las penalidades par exceso de millas son de $0.15–$0.30 par milla — fácilmente $2,000 al final",
    ],
    trustNote:
      "La calculateur utilise le fórmula estándar de leasansg automotriz: pago = (dépréciation + financement + taxes) ÷ término. Le cálculo es matemáticamente exacto a les condiciones du contrato du concessionnaire.",
    schemaName: "Calculateur louer vs acheter auto",
  },
};
