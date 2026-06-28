/**
 * Shared body for /car-affordability-calculator and /es/car-affordability-calculator.
 * Wave 18.19 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import { Check, AlertTriangle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import CarAffordabilityCalculator from "@/app/car-affordability-calculator/CarAffordabilityCalculator";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "Car Affordability Calculator",
    h1: "Car Affordability Calculator",
    intro: "Find out the maximum car price you can comfortably afford based on your income, existing debts, and monthly expenses. Supports the 20/4/10 rule, 15% income rule, or a custom budget — with a full debt-to-income check.",
    h2Rules: "Car Budget Rules Explained",
    rule1Title: "The 20/4/10 Rule",
    rule1Intro: "The most conservative widely-used rule. It has three components:",
    rule1Bullets: [
      { bold: "20% down", body: " — keeps you from going underwater immediately and reduces the loan principal." },
      { bold: "4-year term max", body: " — limits total interest and ensures you own the car outright before it depreciates heavily." },
      { bold: "10% of gross income", body: " — total vehicle costs (payment + insurance + fuel) stay under 10% per month." },
    ],
    rule2Title: "The 15% Rule",
    rule2Body: "A more flexible guideline used by many financial advisors who consider 10% too restrictive in today's vehicle price environment. Total monthly vehicle costs (payment + insurance + fuel) should stay under 15% of gross monthly income. This gives more headroom for buyers in higher-cost areas where vehicle prices are elevated relative to income.",
    rule3Title: "Why These Rules Matter",
    rule3Body: "Cars depreciate — a new car loses 20% of its value in year one and 50% by year five. Overspending on a vehicle locks up capital that could build wealth elsewhere. Lenders may approve you for more than these rules suggest; approval and affordability are two different things.",
    h2Dti: "Debt-to-Income Ratio for Car Loans",
    dtiIntro: "Your debt-to-income (DTI) ratio is the percentage of your gross monthly income that goes to monthly debt payments. Lenders calculate two versions:",
    dtiFrontTitle: "Front-End DTI",
    dtiFrontBody: "Housing costs only (rent or mortgage) ÷ gross income. Auto lenders rarely use this.",
    dtiBackTitle: "Back-End DTI",
    dtiBackBody: "All monthly debts (housing + car + credit cards + student loans) ÷ gross income. This is what auto lenders check.",
    dtiTableHeaders: ["Back-End DTI", "Assessment", "Lender View"],
    dtiTableRows: [
      ["Below 20%", "Excellent", "Best rates, easy approval"],
      ["20%–36%", "Good", "Solid approval odds"],
      ["36%–43%", "Stretched", "Approval possible, higher rates"],
      ["Above 43%", "Risky", "Many lenders will decline"],
    ],
    h2Tips: "Tips to Increase Your Car Budget",
    tips: [
      { title: "Pay down high-balance credit cards", detail: "Reducing revolving debt directly lowers your DTI. Paying off a $200/month credit card minimum instantly frees $200/month for a car payment." },
      { title: "Save a larger down payment", detail: "More down payment = smaller loan = lower required payment. A $5,000 down payment on a $25,000 car at 7% APR over 60 months saves $97/month." },
      { title: "Improve your credit score before applying", detail: "Moving from 'near prime' (620) to 'prime' (680) credit can cut your APR by 3–5 points — saving thousands over the loan term and increasing your maximum principal." },
      { title: "Use a trade-in strategically", detail: "A trade-in reduces the financed amount like a down payment. Get quotes from CarMax, Carvana, or dealer before negotiating — the highest offer is your baseline." },
      { title: "Shop insurance before buying", detail: "Insurance costs vary dramatically by vehicle model. A sports car or luxury SUV can cost $300+/month to insure. Check insurance quotes for your target vehicles before committing." },
    ],
    loanCtaTitle: "Know your budget? Calculate the exact payment.",
    loanCtaBody: "Enter the vehicle price, APR, and term in our Car Loan Calculator to see the precise monthly payment and full amortization schedule.",
    loanCtaButton: "Loan Calculator",
    h2Faq: "Frequently Asked Questions",
    bottomTitle: "Found a Car in Your Budget? Check Its History First.",
    bottomBody: "A hidden salvage title or accident record can wipe out thousands in resale value. Run a free VIN check before you sign anything.",
    bottomCta: "Run a Free VIN Check",
  },
  es: {
    home: "Inicio",
    crumb: "Calculadora de costeabilidad de auto",
    h1: "Calculadora de costeabilidad de auto",
    intro: "Descubre el precio máximo de auto que puedes pagar cómodamente según tus ingresos, deudas existentes y gastos mensuales. Soporta la regla 20/4/10, la regla del 15% de ingresos o un presupuesto personalizado — con una revisión completa de deuda-a-ingresos.",
    h2Rules: "Reglas de presupuesto de auto explicadas",
    rule1Title: "La regla 20/4/10",
    rule1Intro: "La regla más conservadora y ampliamente usada. Tiene tres componentes:",
    rule1Bullets: [
      { bold: "20% de pago inicial", body: " — te impide quedar bajo el agua inmediatamente y reduce el principal del préstamo." },
      { bold: "Plazo máximo de 4 años", body: " — limita el interés total y asegura que seas dueño del auto antes de que se deprecie fuertemente." },
      { bold: "10% de ingresos brutos", body: " — el total de costos del vehículo (pago + seguro + combustible) se mantiene bajo 10% al mes." },
    ],
    rule2Title: "La regla del 15%",
    rule2Body: "Una guía más flexible usada por muchos asesores financieros que consideran que 10% es demasiado restrictivo en el entorno actual de precios de vehículos. El total de costos mensuales del vehículo (pago + seguro + combustible) debe mantenerse bajo 15% del ingreso bruto mensual. Esto da más margen para compradores en áreas de alto costo donde los precios de vehículos son elevados respecto al ingreso.",
    rule3Title: "Por qué importan estas reglas",
    rule3Body: "Los autos se deprecian — un auto nuevo pierde 20% de su valor en el primer año y 50% para el quinto año. Gastar de más en un vehículo bloquea capital que podría construir riqueza en otra parte. Los prestamistas pueden aprobarte por más de lo que estas reglas sugieren; la aprobación y la costeabilidad son dos cosas distintas.",
    h2Dti: "Ratio deuda-a-ingresos para préstamos de auto",
    dtiIntro: "Tu ratio deuda-a-ingresos (DTI) es el porcentaje de tu ingreso bruto mensual que se va a pagos mensuales de deuda. Los prestamistas calculan dos versiones:",
    dtiFrontTitle: "DTI Frontal",
    dtiFrontBody: "Solo costos de vivienda (renta o hipoteca) ÷ ingreso bruto. Los prestamistas de auto rara vez usan este.",
    dtiBackTitle: "DTI Posterior",
    dtiBackBody: "Todas las deudas mensuales (vivienda + auto + tarjetas + préstamos estudiantiles) ÷ ingreso bruto. Esto es lo que los prestamistas de auto verifican.",
    dtiTableHeaders: ["DTI Posterior", "Evaluación", "Vista del prestamista"],
    dtiTableRows: [
      ["Menos de 20%", "Excelente", "Mejores tasas, aprobación fácil"],
      ["20%–36%", "Bueno", "Buenas probabilidades de aprobación"],
      ["36%–43%", "Apretado", "Aprobación posible, tasas más altas"],
      ["Sobre 43%", "Riesgoso", "Muchos prestamistas declinarán"],
    ],
    h2Tips: "Consejos para aumentar tu presupuesto de auto",
    tips: [
      { title: "Paga las tarjetas de crédito con saldo alto", detail: "Reducir deuda revolvente baja directamente tu DTI. Pagar un mínimo de tarjeta de $200/mes libera al instante $200/mes para un pago de auto." },
      { title: "Ahorra un pago inicial más grande", detail: "Más pago inicial = préstamo más pequeño = pago requerido más bajo. Un pago inicial de $5,000 sobre un auto de $25,000 al 7% APR durante 60 meses ahorra $97/mes." },
      { title: "Mejora tu puntaje de crédito antes de aplicar", detail: "Pasar de crédito 'cerca de prime' (620) a 'prime' (680) puede reducir tu APR en 3-5 puntos — ahorrando miles durante el plazo del préstamo y aumentando tu principal máximo." },
      { title: "Usa un trade-in estratégicamente", detail: "Un trade-in reduce el monto financiado como un pago inicial. Obtén cotizaciones de CarMax, Carvana o concesionario antes de negociar — la oferta más alta es tu base." },
      { title: "Compara seguros antes de comprar", detail: "Los costos de seguro varían dramáticamente por modelo de vehículo. Un auto deportivo o SUV de lujo puede costar $300+/mes asegurar. Verifica cotizaciones de seguro para tus vehículos objetivo antes de comprometerte." },
    ],
    loanCtaTitle: "¿Conoces tu presupuesto? Calcula el pago exacto.",
    loanCtaBody: "Ingresa el precio del vehículo, APR y plazo en nuestra Calculadora de préstamo de auto para ver el pago mensual preciso y el horario completo de amortización.",
    loanCtaButton: "Calculadora de préstamo",
    h2Faq: "Preguntas frecuentes",
    bottomTitle: "¿Encontraste un auto en tu presupuesto? Verifica su historial primero.",
    bottomBody: "Un título de salvamento oculto o un registro de accidente puede borrar miles en valor de reventa. Ejecuta una verificación VIN gratis antes de firmar nada.",
    bottomCta: "Haz una verificación VIN gratis",
  },
  fr: {
    home: "Accueil",
    crumb: "Calculateur d'abordabilité auto",
    h1: "Calculateur d'abordabilité auto",
    intro: "Découvre le prix maximum d'auto que tu peux confortablement te permettre selon ton revenu, tes dettes existantes et tes dépenses mensuelles. Prend en charge la règle 20/4/10, la règle des 15% du revenu, ou un budget personnalisé — avec une analyse complète du ratio dette-revenu.",
    h2Rules: "Les règles de budget auto expliquées",
    rule1Title: "La règle 20/4/10",
    rule1Intro: "La règle la plus conservatrice et largement utilisée. Elle a trois composantes :",
    rule1Bullets: [
      { bold: "20% d'acompte", body: " — t'évite de te retrouver immédiatement en valeur négative et réduit le principal du prêt." },
      { bold: "Durée maximale de 4 ans", body: " — limite l'intérêt total et garantit que tu possèdes l'auto avant qu'elle ne se déprécie fortement." },
      { bold: "10% du revenu brut", body: " — les coûts totaux du véhicule (paiement + assurance + carburant) restent sous 10% par mois." },
    ],
    rule2Title: "La règle des 15%",
    rule2Body: "Une directive plus flexible utilisée par de nombreux conseillers financiers qui considèrent 10% trop restrictif dans l'environnement actuel des prix de véhicules. Les coûts mensuels totaux du véhicule (paiement + assurance + carburant) devraient rester sous 15% du revenu brut mensuel. Cela donne plus de marge aux acheteurs dans les zones à coût élevé où les prix des véhicules sont élevés par rapport au revenu.",
    rule3Title: "Pourquoi ces règles comptent",
    rule3Body: "Les autos se déprécient — une auto neuve perd 20% de sa valeur la première année et 50% à la cinquième année. Trop dépenser sur un véhicule immobilise du capital qui pourrait bâtir de la richesse ailleurs. Les prêteurs peuvent t'approuver pour plus que ce que ces règles suggèrent ; l'approbation et l'abordabilité sont deux choses différentes.",
    h2Dti: "Ratio dette-revenu pour les prêts auto",
    dtiIntro: "Ton ratio dette-revenu (DTI) est le pourcentage de ton revenu brut mensuel qui va aux paiements mensuels de dette. Les prêteurs calculent deux versions :",
    dtiFrontTitle: "DTI frontal",
    dtiFrontBody: "Coûts de logement uniquement (loyer ou hypothèque) ÷ revenu brut. Les prêteurs auto utilisent rarement celui-ci.",
    dtiBackTitle: "DTI postérieur",
    dtiBackBody: "Toutes les dettes mensuelles (logement + auto + cartes de crédit + prêts étudiants) ÷ revenu brut. C'est ce que les prêteurs auto vérifient.",
    dtiTableHeaders: ["DTI postérieur", "Évaluation", "Vue du prêteur"],
    dtiTableRows: [
      ["Moins de 20%", "Excellent", "Meilleurs taux, approbation facile"],
      ["20%–36%", "Bon", "Bonnes chances d'approbation"],
      ["36%–43%", "Tendu", "Approbation possible, taux plus élevés"],
      ["Au-dessus de 43%", "Risqué", "Beaucoup de prêteurs refuseront"],
    ],
    h2Tips: "Conseils pour augmenter ton budget auto",
    tips: [
      { title: "Rembourse les cartes de crédit à solde élevé", detail: "Réduire la dette renouvelable baisse directement ton DTI. Rembourser un minimum de carte de 200 $/mois libère instantanément 200 $/mois pour un paiement auto." },
      { title: "Économise un acompte plus important", detail: "Plus d'acompte = prêt plus petit = paiement requis plus bas. Un acompte de 5 000 $ sur une auto de 25 000 $ à 7% APR sur 60 mois économise 97 $/mois." },
      { title: "Améliore ta cote de crédit avant de postuler", detail: "Passer d'un crédit 'près de prime' (620) à 'prime' (680) peut réduire ton APR de 3 à 5 points — économisant des milliers sur la durée du prêt et augmentant ton principal maximum." },
      { title: "Utilise un échange stratégiquement", detail: "Un échange réduit le montant financé comme un acompte. Obtiens des devis de CarMax, Carvana ou du concessionnaire avant de négocier — la meilleure offre est ta base." },
      { title: "Compare les assurances avant d'acheter", detail: "Les coûts d'assurance varient considérablement selon le modèle de véhicule. Une voiture de sport ou un VUS de luxe peut coûter plus de 300 $/mois à assurer. Vérifie les devis d'assurance pour tes véhicules cibles avant de t'engager." },
    ],
    loanCtaTitle: "Tu connais ton budget ? Calcule le paiement exact.",
    loanCtaBody: "Saisis le prix du véhicule, l'APR et la durée dans notre calculateur de prêt auto pour voir le paiement mensuel précis et le calendrier complet d'amortissement.",
    loanCtaButton: "Calculateur de prêt",
    h2Faq: "Questions fréquentes",
    bottomTitle: "Tu as trouvé une auto dans ton budget ? Vérifie d'abord son historique.",
    bottomBody: "Une marque de titre de salvage cachée ou un dossier d'accident peut effacer des milliers en valeur de revente. Lance une vérification VIN gratuite avant de signer quoi que ce soit.",
    bottomCta: "Lance une vérification VIN gratuite",
  },
} as const;

const FAQS_EN = [
  { question: "What is the 20/4/10 rule for buying a car?", answer: "Put down at least 20%, finance for no more than 4 years, and keep total monthly vehicle costs (payment + insurance + fuel) under 10% of gross monthly income. It's conservative but protects you from depreciation and budget strain." },
  { question: "How much car can I afford on a $60,000 salary?", answer: "At $60,000/year ($5,000/month gross), the 10% rule gives $500/month in total vehicle costs. After average insurance ($150) and fuel ($200), that's $150/month for a loan payment — financing about $7,500. Adding a 20% down payment (~$2,000 on a $10,000 car) puts your max vehicle budget around $9,500–$12,000 for a used car. The 15% rule is more relaxed and puts you in the $18,000–$22,000 range." },
  { question: "Do I use gross or net income?", answer: "Lenders use gross (pre-tax) income for DTI calculations. For your own budget, compare net income too — if your take-home is significantly less than your gross, you may feel constrained even at a technically 'affordable' DTI." },
  { question: "Why is the calculator giving me a very low car budget?", answer: "Usually because your existing debts (rent/mortgage, credit cards, student loans) already consume a large share of your income, leaving little room under the 43% DTI cap. Try reducing other debt inputs, increasing the down payment, or using the custom % rule to see how different assumptions change the result." },
];

const FAQS_ES = [
  { question: "¿Qué es la regla 20/4/10 para comprar un auto?", answer: "Da un pago inicial de al menos 20%, financia por no más de 4 años, y mantén los costos mensuales totales del vehículo (pago + seguro + combustible) bajo 10% del ingreso bruto mensual. Es conservadora pero te protege de la depreciación y el estrés presupuestario." },
  { question: "¿Cuánto auto puedo pagar con un salario de $60,000?", answer: "Con $60,000/año ($5,000/mes brutos), la regla del 10% da $500/mes en costos totales del vehículo. Después del seguro promedio ($150) y combustible ($200), eso son $150/mes para un pago de préstamo — financiando unos $7,500. Sumando un pago inicial del 20% (~$2,000 sobre un auto de $10,000) pone tu presupuesto máximo de vehículo cerca de $9,500-$12,000 para un auto usado. La regla del 15% es más relajada y te pone en el rango de $18,000-$22,000." },
  { question: "¿Uso ingresos brutos o netos?", answer: "Los prestamistas usan ingresos brutos (antes de impuestos) para cálculos de DTI. Para tu propio presupuesto, compara también los ingresos netos — si tu salario neto es significativamente menor que el bruto, puedes sentirte limitado incluso con un DTI técnicamente 'costeable'." },
  { question: "¿Por qué la calculadora me da un presupuesto de auto muy bajo?", answer: "Usualmente porque tus deudas existentes (renta/hipoteca, tarjetas de crédito, préstamos estudiantiles) ya consumen una gran parte de tus ingresos, dejando poco margen bajo el tope de DTI de 43%. Intenta reducir otras entradas de deuda, aumentar el pago inicial, o usar la regla de % personalizado para ver cómo diferentes suposiciones cambian el resultado." },
];

interface Props { locale: Locale; }

export default function CarAffordabilityCalculatorBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <main className="pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <Breadcrumbs
          items={[
            { label: c.home, href: locale === "es" ? "/es" : "/" },
            { label: c.crumb },
          ]}
        />

        <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
          {c.h1}
        </h1>
        <p className="mt-4 text-lg text-slate-700 leading-relaxed">
          {c.intro}
        </p>

        {/* ── Calculator ── */}
        <div className="mt-8">
          <CarAffordabilityCalculator locale={locale} />
        </div>

        {/* ── VIN Check Banner ── */}
        <div className="mt-10">
          <VinCheckBanner />
        </div>

        {/* ── The Rules Explained ── */}
        <section id="budget-rules" className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">
            {c.h2Rules}
          </h2>
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-bold text-slate-900 mb-2">{c.rule1Title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                {c.rule1Intro}
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                {c.rule1Bullets.map((b) => (
                  <li key={b.bold} className="flex gap-2">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>{b.bold}</strong>{b.body}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-bold text-slate-900 mb-2">{c.rule2Title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {c.rule2Body}
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> {c.rule3Title}
              </h3>
              <p className="text-amber-800 text-sm leading-relaxed">
                {c.rule3Body}
              </p>
            </div>
          </div>
        </section>

        {/* ── DTI explained ── */}
        <section id="dti" className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            {c.h2Dti}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            {c.dtiIntro}
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="font-bold text-slate-900 mb-1">{c.dtiFrontTitle}</p>
              <p className="text-sm text-slate-600">{c.dtiFrontBody}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="font-bold text-slate-900 mb-1">{c.dtiBackTitle}</p>
              <p className="text-sm text-slate-600">{c.dtiBackBody}</p>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  {c.dtiTableHeaders.map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {c.dtiTableRows.map(([dti, assessment, view]) => (
                  <tr key={dti} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-slate-900">{dti}</td>
                    <td className="px-4 py-3 text-slate-700">{assessment}</td>
                    <td className="px-4 py-3 text-slate-600">{view}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Tips ── */}
        <section id="tips" className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">
            {c.h2Tips}
          </h2>
          <ul className="space-y-3">
            {c.tips.map(({ title, detail }) => (
              <li key={title} className="flex gap-3 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  <strong className="text-slate-900">{title}</strong> — {detail}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Link to loan calculator ── */}
        <div className="mt-10 flex items-center justify-between gap-4 p-5 bg-primary-50 border border-primary-100 rounded-2xl">
          <div>
            <p className="font-bold text-slate-900">{c.loanCtaTitle}</p>
            <p className="text-sm text-slate-600 mt-0.5">
              {c.loanCtaBody}
            </p>
          </div>
          <Link
            href={link("/car-loan-calculator")}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors"
          >
            {c.loanCtaButton}
          </Link>
        </div>

        {/* ── FAQ ── */}
        <section id="faq" className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {c.h2Faq}
          </h2>
          <dl className="space-y-6">
            {faqs.map(({ question, answer }) => (
              <div key={question}>
                <dt className="font-bold text-slate-900">{question}</dt>
                <dd className="mt-1.5 text-slate-600 leading-relaxed">{answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Related tools ── */}
        <div className="mt-14">
          <RelatedChecks exclude="/car-affordability-calculator" />
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200 mt-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {c.bottomTitle}
          </h2>
          <p className="text-slate-600 mb-6">
            {c.bottomBody}
          </p>
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

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
