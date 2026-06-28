/**
 * Shared body for /guides/what-is-a-vin-number — Wave 18 batch 2.
 * Accepts a locale prop and reads every visible string from COPY={en,es}.
 * Both the EN and ES page wrappers render the same DOM, differing only
 * in text. Internal links are prefixed with /es when locale === "es".
 */

import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import type { Locale } from "@/i18n/config";

interface Faq {
  question: string;
  answer: string;
}

const COPY = {
  en: {
    crumbs: { home: "Home", guides: "Guides", current: "What Is a VIN Number?" },
    h1: "What Is a VIN Number?",
    lede: "A Vehicle Identification Number (VIN) is a unique 17-character code assigned to every motor vehicle manufactured since 1981. Think of it as a fingerprint for your car: no two vehicles in the world share the same VIN, making it the single most reliable way to identify any car, truck, or SUV.",
    sections: {
      stands: {
        h2: "What Does VIN Stand For?",
        body: "VIN stands for {strong}. You may hear people say \u201cVIN number,\u201d which is technically redundant (like saying ATM machine), but the phrase has become so common that both forms are widely understood. Whether you call it a VIN or a VIN number, it refers to the same 17-character identifier.",
        strong: "Vehicle Identification Number",
      },
      history: {
        h2: "A Brief History of the VIN",
        p1: "Before VINs were standardized, manufacturers used their own numbering systems, which varied in length and format. This made it difficult for regulators, insurance companies, and law enforcement to track vehicles across state lines or between owners.",
        p2: "In 1954, the United States began requiring manufacturers to stamp serial numbers onto vehicles, but there was no universal format. The modern 17-character VIN standard was established in 1981 by the National Highway Traffic Safety Administration (NHTSA) through Federal Motor Vehicle Safety Standard No. 115. This standard, aligned with ISO 3779 and ISO 3780, created a globally recognized format that every automaker must follow.",
        p3: "Since 1981, every car, truck, SUV, van, and motorcycle sold in the United States has carried a VIN in this standardized format. The system ensures that every vehicle produced anywhere in the world can be uniquely identified for its entire lifespan.",
      },
      structure: {
        h2: "How Is a VIN Structured?",
        intro: "A VIN is composed of 17 characters, using a combination of uppercase letters and numbers. The letters I, O, and Q are excluded to prevent confusion with the digits 1 and 0. Each VIN is divided into three sections:",
        items: [
          {
            positions: "Positions 1-3:",
            title: "World Manufacturer Identifier (WMI)",
            body: "\u2014 identifies the country, manufacturer, and vehicle type.",
          },
          {
            positions: "Positions 4-8:",
            title: "Vehicle Descriptor Section (VDS)",
            body: "\u2014 encodes body style, engine, model, and series.",
          },
          {
            positions: "Positions 9-17:",
            title: "Vehicle Identifier Section (VIS)",
            body: "\u2014 includes the check digit, model year, assembly plant, and production sequence number.",
          },
        ],
        seeMore: "For a detailed position-by-position breakdown, see our",
        seeMoreLink: "How to Read a VIN",
        seeMoreSuffix: "guide.",
      },
      where: {
        h2: "Where to Find the VIN on a Vehicle",
        intro: "Manufacturers place the VIN in multiple locations on every vehicle. This redundancy helps law enforcement verify a vehicle\u2019s identity even if one plate is damaged or tampered with.",
      },
      why: {
        h2: "Why Do VIN Numbers Matter?",
        intro: "VINs serve as the backbone of vehicle tracking in the automotive industry. Every title transfer, insurance claim, recall, accident report, and service record is tied to the VIN. This makes VINs indispensable in several situations.",
        buyingH3: "Buying a Used Vehicle",
        buyingBody: "Running a {link} before purchasing a used car is one of the most important steps a buyer can take. A VIN report reveals the vehicle\u2019s history including previous owners, accident records, title status, odometer readings, and open recalls. Without this information, buyers risk overpaying or purchasing a vehicle with hidden damage.",
        buyingLink: "VIN check",
        recallH3: "Safety Recalls",
        recallBody: "Manufacturers issue safety recalls based on VIN ranges. By checking your VIN against the NHTSA recall database, you can determine whether your vehicle is affected by any open recalls. This is critical because recall repairs are always free at authorized dealerships, but you must know the recall exists to take advantage of it.",
        insuranceH3: "Insurance and Registration",
        insuranceBody: "Insurance companies use VINs to determine premiums. The VIN tells the insurer the exact vehicle model, safety features, and equipment, all of which affect pricing. State DMVs use VINs to register vehicles and track title transfers. An accurate VIN ensures your vehicle is properly documented.",
        theftH3: "Theft Prevention and Recovery",
        theftBody: "Law enforcement agencies rely on VINs to identify stolen vehicles. The multiple VIN locations on a vehicle make it difficult for thieves to alter all of them. If a vehicle is recovered, officers compare VIN plates across different locations to verify its identity. The National Motor Vehicle Title Information System (NMVTIS) maintains a central database that law enforcement can query by VIN.",
      },
      pre1981: {
        h2: "What About Vehicles Made Before 1981?",
        bodyPrefix: "Vehicles manufactured before 1981 used serial numbers that varied in length and format from one manufacturer to another. These older serial numbers can range from 5 to 13 characters and do not follow the standardized structure described above. While some VIN lookup tools support pre-1981 vehicles, the data available is typically limited compared to post-1981 models. Our",
        bodyLink: "VIN decoder",
        bodySuffix: "covers all vehicles from 1981 onward.",
      },
      faqH2: "Frequently Asked Questions",
    },
    cta: {
      h2: "Look Up Any VIN for Free",
      body: "Enter a VIN below to decode it instantly and see the full vehicle profile.",
    },
    vinLocations: [
      {
        title: "Dashboard (Driver Side)",
        description: "Look through the windshield on the driver side where the dashboard meets the glass. This is the most common location and can be read from outside the vehicle.",
      },
      {
        title: "Driver-Side Door Jamb",
        description: "Open the driver door and check the sticker on the door frame. This sticker also displays tire pressure info and the manufacturing date.",
      },
      {
        title: "Vehicle Registration & Title",
        description: "Your state registration card and vehicle title both list the VIN. These are especially useful if you cannot physically access the vehicle.",
      },
      {
        title: "Insurance Documents",
        description: "Your insurance ID card and policy documents include the VIN for every covered vehicle.",
      },
      {
        title: "Engine Block",
        description: "Most manufacturers stamp the VIN onto the engine block. This is used by law enforcement to verify identity on vehicles with swapped dashboards.",
      },
      {
        title: "Under the Spare Tire",
        description: "Some manufacturers place a VIN plate in the trunk beneath the spare tire, providing yet another reference point.",
      },
    ],
  },
  es: {
    crumbs: { home: "Inicio", guides: "Gu\u00edas", current: "\u00bfQu\u00e9 es un n\u00famero VIN?" },
    h1: "\u00bfQu\u00e9 es un n\u00famero VIN?",
    lede: "Un N\u00famero de Identificaci\u00f3n Vehicular (VIN) es un c\u00f3digo \u00fanico de 17 caracteres asignado a cada veh\u00edculo motorizado fabricado desde 1981. Pi\u00e9nsalo como la huella digital de tu auto: ning\u00fan veh\u00edculo en el mundo comparte el mismo VIN, lo que lo convierte en la forma m\u00e1s confiable de identificar cualquier auto, camioneta o SUV.",
    sections: {
      stands: {
        h2: "\u00bfQu\u00e9 significa VIN?",
        body: "VIN son las siglas en ingl\u00e9s de {strong}. Quiz\u00e1s escuches a algunas personas decir \u201cn\u00famero VIN,\u201d lo cual es t\u00e9cnicamente redundante (como decir \u201cm\u00e1quina ATM\u201d), pero la expresi\u00f3n se ha vuelto tan com\u00fan que ambas formas se entienden ampliamente. Lo llames VIN o n\u00famero VIN, se refiere al mismo identificador de 17 caracteres.",
        strong: "Vehicle Identification Number (N\u00famero de Identificaci\u00f3n Vehicular)",
      },
      history: {
        h2: "Breve historia del VIN",
        p1: "Antes de que se estandarizaran los VIN, los fabricantes usaban sus propios sistemas de numeraci\u00f3n, con longitudes y formatos variables. Esto dificultaba que reguladores, aseguradoras y autoridades pudieran rastrear veh\u00edculos entre estados o entre due\u00f1os.",
        p2: "En 1954, Estados Unidos comenz\u00f3 a exigir que los fabricantes estamparan n\u00fameros de serie en los veh\u00edculos, pero no hab\u00eda un formato universal. El est\u00e1ndar moderno de VIN de 17 caracteres lo estableci\u00f3 en 1981 la National Highway Traffic Safety Administration (NHTSA) mediante el Federal Motor Vehicle Safety Standard No. 115. Este est\u00e1ndar, alineado con ISO 3779 e ISO 3780, cre\u00f3 un formato reconocido globalmente que toda armadora debe seguir.",
        p3: "Desde 1981, cada auto, camioneta, SUV, van y motocicleta vendida en Estados Unidos lleva un VIN en este formato estandarizado. El sistema garantiza que cualquier veh\u00edculo producido en cualquier parte del mundo pueda identificarse de forma \u00fanica durante toda su vida \u00fatil.",
      },
      structure: {
        h2: "\u00bfC\u00f3mo se estructura un VIN?",
        intro: "Un VIN se compone de 17 caracteres, usando una combinaci\u00f3n de letras may\u00fasculas y n\u00fameros. Las letras I, O y Q se excluyen para evitar confusi\u00f3n con los d\u00edgitos 1 y 0. Cada VIN se divide en tres secciones:",
        items: [
          {
            positions: "Posiciones 1-3:",
            title: "Identificador Mundial del Fabricante (WMI)",
            body: "\u2014 identifica el pa\u00eds, el fabricante y el tipo de veh\u00edculo.",
          },
          {
            positions: "Posiciones 4-8:",
            title: "Secci\u00f3n Descriptora del Veh\u00edculo (VDS)",
            body: "\u2014 codifica el estilo de carrocer\u00eda, motor, modelo y serie.",
          },
          {
            positions: "Posiciones 9-17:",
            title: "Secci\u00f3n Identificadora del Veh\u00edculo (VIS)",
            body: "\u2014 incluye el d\u00edgito de verificaci\u00f3n, a\u00f1o modelo, planta de ensamblaje y n\u00famero de serie.",
          },
        ],
        seeMore: "Para un desglose detallado posici\u00f3n por posici\u00f3n, consulta nuestra gu\u00eda",
        seeMoreLink: "C\u00f3mo leer un VIN",
        seeMoreSuffix: ".",
      },
      where: {
        h2: "D\u00f3nde encontrar el VIN en un veh\u00edculo",
        intro: "Los fabricantes colocan el VIN en varios lugares de cada veh\u00edculo. Esta redundancia ayuda a las autoridades a verificar la identidad de un veh\u00edculo incluso si una placa est\u00e1 da\u00f1ada o alterada.",
      },
      why: {
        h2: "\u00bfPor qu\u00e9 importan los n\u00fameros VIN?",
        intro: "Los VIN son la columna vertebral del rastreo vehicular en la industria automotriz. Cada transferencia de t\u00edtulo, reclamo de seguro, retiro de seguridad, reporte de accidente y registro de servicio est\u00e1 vinculado al VIN. Esto los hace indispensables en varias situaciones.",
        buyingH3: "Comprar un veh\u00edculo usado",
        buyingBody: "Hacer una {link} antes de comprar un auto usado es uno de los pasos m\u00e1s importantes que un comprador puede dar. Un reporte VIN revela el historial del veh\u00edculo: due\u00f1os anteriores, registros de accidentes, estado del t\u00edtulo, lecturas del od\u00f3metro y retiros abiertos. Sin esta informaci\u00f3n, los compradores corren el riesgo de pagar de m\u00e1s o comprar un veh\u00edculo con da\u00f1os ocultos.",
        buyingLink: "verificaci\u00f3n de VIN",
        recallH3: "Retiros de seguridad",
        recallBody: "Los fabricantes emiten retiros de seguridad basados en rangos de VIN. Al verificar tu VIN contra la base de datos de retiros de la NHTSA, puedes determinar si tu veh\u00edculo est\u00e1 afectado por alg\u00fan retiro abierto. Esto es cr\u00edtico porque las reparaciones por retiro siempre son gratuitas en concesionarios autorizados, pero debes saber que el retiro existe para aprovecharlo.",
        insuranceH3: "Seguro y registro",
        insuranceBody: "Las aseguradoras usan los VIN para determinar primas. El VIN le indica a la aseguradora el modelo exacto del veh\u00edculo, sus funciones de seguridad y equipamiento, todo lo cual afecta el precio. Las DMVs estatales usan VINs para registrar veh\u00edculos y rastrear transferencias de t\u00edtulo. Un VIN preciso garantiza que tu veh\u00edculo est\u00e9 debidamente documentado.",
        theftH3: "Prevenci\u00f3n y recuperaci\u00f3n de robos",
        theftBody: "Las autoridades dependen de los VIN para identificar veh\u00edculos robados. Las m\u00faltiples ubicaciones del VIN en un veh\u00edculo dificultan que los ladrones las alteren todas. Si un veh\u00edculo se recupera, los oficiales comparan las placas del VIN en distintas ubicaciones para verificar su identidad. El National Motor Vehicle Title Information System (NMVTIS) mantiene una base de datos central que las autoridades pueden consultar por VIN.",
      },
      pre1981: {
        h2: "\u00bfY los veh\u00edculos hechos antes de 1981?",
        bodyPrefix: "Los veh\u00edculos fabricados antes de 1981 usaban n\u00fameros de serie que variaban en longitud y formato seg\u00fan el fabricante. Estos n\u00fameros de serie antiguos pueden tener entre 5 y 13 caracteres y no siguen la estructura estandarizada descrita arriba. Aunque algunas herramientas de b\u00fasqueda de VIN soportan veh\u00edculos anteriores a 1981, los datos disponibles suelen ser limitados comparados con modelos posteriores. Nuestro",
        bodyLink: "decodificador de VIN",
        bodySuffix: "cubre todos los veh\u00edculos desde 1981 en adelante.",
      },
      faqH2: "Preguntas frecuentes",
    },
    cta: {
      h2: "Busca cualquier VIN gratis",
      body: "Ingresa un VIN abajo para decodificarlo al instante y ver el perfil completo del veh\u00edculo.",
    },
    vinLocations: [
      {
        title: "Tablero (lado del conductor)",
        description: "Mira a trav\u00e9s del parabrisas en el lado del conductor donde el tablero se encuentra con el vidrio. Es la ubicaci\u00f3n m\u00e1s com\u00fan y puede leerse desde fuera del veh\u00edculo.",
      },
      {
        title: "Marco de la puerta del conductor",
        description: "Abre la puerta del conductor y revisa el sticker en el marco. Este sticker tambi\u00e9n muestra la presi\u00f3n de llantas y la fecha de fabricaci\u00f3n.",
      },
      {
        title: "Registro y t\u00edtulo del veh\u00edculo",
        description: "Tu tarjeta de registro estatal y el t\u00edtulo del veh\u00edculo incluyen el VIN. Son especialmente \u00fatiles si no puedes acceder f\u00edsicamente al veh\u00edculo.",
      },
      {
        title: "Documentos del seguro",
        description: "Tu tarjeta de identificaci\u00f3n del seguro y los documentos de la p\u00f3liza incluyen el VIN de cada veh\u00edculo asegurado.",
      },
      {
        title: "Bloque del motor",
        description: "La mayor\u00eda de los fabricantes estampan el VIN en el bloque del motor. Las autoridades usan esto para verificar la identidad de veh\u00edculos con tableros intercambiados.",
      },
      {
        title: "Debajo de la llanta de refacci\u00f3n",
        description: "Algunos fabricantes colocan una placa de VIN en la cajuela debajo de la llanta de refacci\u00f3n, ofreciendo otro punto de referencia.",
      },
    ],
  },
} as const;

export const FAQS_EN: Faq[] = [
  {
    question: "What is a VIN number?",
    answer: "A VIN number is a Vehicle Identification Number, a unique 17-character code that the manufacturer assigns to every car, truck, SUV, van, and motorcycle. Since 1981 it follows a standardized format set by NHTSA (FMVSS 115) and aligned with ISO 3779. It uses letters and digits but never the letters I, O, or Q, and it identifies one specific vehicle for its entire life.",
  },
  {
    question: "What is a VIN used for?",
    answer: "A VIN is used to uniquely identify and track a single vehicle. It is the key DMVs use to register and title a car, insurers use to set premiums and write policies, manufacturers use to issue recalls by VIN range, and history reports use to compile accident, odometer, and ownership records. Law enforcement also relies on it to identify stolen or recovered vehicles.",
  },
  {
    question: "Is saying 'VIN number' redundant?",
    answer: "Technically yes. VIN already stands for Vehicle Identification Number, so 'VIN number' literally means 'Vehicle Identification Number number,' similar to saying 'ATM machine' or 'PIN number.' Despite the redundancy, the phrase is so widely used that both 'VIN' and 'VIN number' are universally understood to mean the same 17-character vehicle identifier.",
  },
  {
    question: "Do all vehicles have a VIN?",
    answer: "Nearly all do. Every car, truck, SUV, van, and motorcycle sold in the United States since 1981 carries a standardized 17-character VIN. Vehicles built before 1981 also have an identifying serial number, but those used non-standard formats of roughly 5 to 13 characters that vary by manufacturer. Some trailers, off-road equipment, and very old vehicles may use different identifier systems.",
  },
  {
    question: "Is a VIN the same as a license plate or title number?",
    answer: "No. A VIN is permanently assigned by the manufacturer and never changes for the life of the vehicle. A license plate is issued by the state and changes when you move, renew, or transfer the car, and the title number is a document reference that changes each time a new title is issued. Only the VIN stays constant across owners, states, and decades.",
  },
  {
    question: "Can two cars have the same VIN?",
    answer: "No two legitimately manufactured vehicles share the same VIN. The 17-character format combines manufacturer codes, model-year indicators, and sequential production numbers specifically to guarantee uniqueness worldwide. If two vehicles appear to have identical VINs, one is almost certainly a clone, where a stolen car is given the VIN of a legally registered vehicle to disguise it. Duplicate VINs are a red flag for fraud.",
  },
  {
    question: "Is my VIN confidential or safe to share?",
    answer: "A VIN is not confidential. It is stamped on the dashboard and visible through the windshield of any parked vehicle, so sharing it with buyers, mechanics, or insurers is normal and necessary. It is not a secret like a Social Security number. Still, avoid posting it alongside your full name and address in public listings, since thieves can misuse an exposed VIN for cloning.",
  },
];

export const FAQS_ES: Faq[] = [
  {
    question: "\u00bfQu\u00e9 es un n\u00famero VIN?",
    answer: "Un n\u00famero VIN es un N\u00famero de Identificaci\u00f3n Vehicular, un c\u00f3digo \u00fanico de 17 caracteres que el fabricante asigna a cada auto, camioneta, SUV, van y motocicleta. Desde 1981 sigue un formato estandarizado establecido por la NHTSA (FMVSS 115) y alineado con ISO 3779. Usa letras y d\u00edgitos pero nunca las letras I, O o Q, e identifica a un veh\u00edculo espec\u00edfico durante toda su vida.",
  },
  {
    question: "\u00bfPara qu\u00e9 se usa un VIN?",
    answer: "Un VIN se usa para identificar y rastrear de forma \u00fanica un solo veh\u00edculo. Es la clave que las DMVs usan para registrar y titular un auto, las aseguradoras para fijar primas y emitir p\u00f3lizas, los fabricantes para emitir retiros por rango de VIN y los reportes de historial para compilar registros de accidentes, od\u00f3metro y propiedad. Las autoridades tambi\u00e9n se basan en \u00e9l para identificar veh\u00edculos robados o recuperados.",
  },
  {
    question: "\u00bfDecir \u2018n\u00famero VIN\u2019 es redundante?",
    answer: "T\u00e9cnicamente s\u00ed. VIN ya significa Vehicle Identification Number (N\u00famero de Identificaci\u00f3n Vehicular), as\u00ed que \u2018n\u00famero VIN\u2019 literalmente significa \u2018n\u00famero N\u00famero de Identificaci\u00f3n Vehicular,\u2019 similar a decir \u2018m\u00e1quina ATM\u2019 o \u2018n\u00famero PIN.\u2019 A pesar de la redundancia, la expresi\u00f3n se usa tanto que tanto \u2018VIN\u2019 como \u2018n\u00famero VIN\u2019 se entienden universalmente como el mismo identificador vehicular de 17 caracteres.",
  },
  {
    question: "\u00bfTodos los veh\u00edculos tienen un VIN?",
    answer: "Casi todos. Cada auto, camioneta, SUV, van y motocicleta vendido en Estados Unidos desde 1981 lleva un VIN estandarizado de 17 caracteres. Los veh\u00edculos construidos antes de 1981 tambi\u00e9n tienen un n\u00famero de serie identificador, pero usaban formatos no estandarizados de aproximadamente 5 a 13 caracteres que var\u00edan por fabricante. Algunos remolques, equipo todoterreno y veh\u00edculos muy antiguos pueden usar sistemas de identificaci\u00f3n diferentes.",
  },
  {
    question: "\u00bfUn VIN es lo mismo que una placa o n\u00famero de t\u00edtulo?",
    answer: "No. Un VIN se asigna permanentemente por el fabricante y nunca cambia durante la vida del veh\u00edculo. Una placa la emite el estado y cambia cuando te mudas, renuevas o transfieres el auto, y el n\u00famero de t\u00edtulo es una referencia del documento que cambia cada vez que se emite un t\u00edtulo nuevo. Solo el VIN se mantiene constante entre due\u00f1os, estados y d\u00e9cadas.",
  },
  {
    question: "\u00bfDos autos pueden tener el mismo VIN?",
    answer: "Ning\u00fan veh\u00edculo fabricado leg\u00edtimamente comparte el mismo VIN. El formato de 17 caracteres combina c\u00f3digos del fabricante, indicadores del a\u00f1o modelo y n\u00fameros secuenciales de producci\u00f3n espec\u00edficamente para garantizar la unicidad mundial. Si dos veh\u00edculos parecen tener VINs id\u00e9nticos, uno casi con seguridad es un clon, donde a un auto robado se le da el VIN de un veh\u00edculo registrado legalmente para disfrazarlo. Los VINs duplicados son una se\u00f1al de alerta de fraude.",
  },
  {
    question: "\u00bfMi VIN es confidencial o seguro de compartir?",
    answer: "Un VIN no es confidencial. Est\u00e1 estampado en el tablero y es visible a trav\u00e9s del parabrisas de cualquier veh\u00edculo estacionado, por lo que compartirlo con compradores, mec\u00e1nicos o aseguradoras es normal y necesario. No es un secreto como un n\u00famero de seguro social. A\u00fan as\u00ed, evita publicarlo junto con tu nombre completo y direcci\u00f3n en anuncios p\u00fablicos, ya que los ladrones pueden hacer mal uso de un VIN expuesto para clonaci\u00f3n.",
  },
];

interface BodyProps {
  locale: Locale;
}

export default function GuideWhatIsAVinNumberBody({ locale }: BodyProps) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (href: string) => (locale === "es" ? `/es${href}` : href);

  // Inline the "What VIN stands for" body — replace {strong} with the bolded phrase.
  const standsParts = c.sections.stands.body.split("{strong}");
  const buyingParts = c.sections.why.buyingBody.split("{link}");

  return (
    <>
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: c.crumbs.home, href: link("/") },
              { label: c.crumbs.guides, href: link("/guides") },
              { label: c.crumbs.current },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.lede}</p>

          {/* --- What VIN Stands For --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            {c.sections.stands.h2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {standsParts[0]}
            <strong>{c.sections.stands.strong}</strong>
            {standsParts[1]}
          </p>

          {/* --- Brief History --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            {c.sections.history.h2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.sections.history.p1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.sections.history.p2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.sections.history.p3}</p>

          {/* --- Structure overview --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            {c.sections.structure.h2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.sections.structure.intro}</p>
          <ul className="mt-4 space-y-3 text-slate-600">
            {c.sections.structure.items.map((item) => (
              <li key={item.positions} className="flex gap-3">
                <span className="font-bold text-primary-600 whitespace-nowrap">
                  {item.positions}
                </span>
                <span>
                  <strong>{item.title}</strong> {item.body}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {c.sections.structure.seeMore}{" "}
            <Link
              href={link("/guides/how-to-read-a-vin")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.sections.structure.seeMoreLink}
            </Link>{" "}
            {c.sections.structure.seeMoreSuffix}
          </p>

          {/* --- Where to Find --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            {c.sections.where.h2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.sections.where.intro}</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.vinLocations.map(({ title, description }) => (
              <div
                key={title}
                className="p-5 bg-slate-50 rounded-xl border border-slate-200"
              >
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* --- Why VINs Matter --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            {c.sections.why.h2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.sections.why.intro}</p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">
            {c.sections.why.buyingH3}
          </h3>
          <p className="mt-2 text-slate-600 leading-relaxed">
            {buyingParts[0]}
            <Link
              href={link("/vin-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.sections.why.buyingLink}
            </Link>
            {buyingParts[1]}
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">
            {c.sections.why.recallH3}
          </h3>
          <p className="mt-2 text-slate-600 leading-relaxed">{c.sections.why.recallBody}</p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">
            {c.sections.why.insuranceH3}
          </h3>
          <p className="mt-2 text-slate-600 leading-relaxed">
            {c.sections.why.insuranceBody}
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">
            {c.sections.why.theftH3}
          </h3>
          <p className="mt-2 text-slate-600 leading-relaxed">{c.sections.why.theftBody}</p>

          {/* --- Vehicles before 1981 --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            {c.sections.pre1981.h2}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.sections.pre1981.bodyPrefix}{" "}
            <Link
              href={link("/")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.sections.pre1981.bodyLink}
            </Link>{" "}
            {c.sections.pre1981.bodySuffix}
          </p>

          {/* --- FAQ --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            {c.sections.faqH2}
          </h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-200 bg-slate-50 p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">
                    {faq.question}
                  </h3>
                  <span className="flex-shrink-0 text-2xl font-light text-primary-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </article>

      {/* --- CTA --- */}
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
