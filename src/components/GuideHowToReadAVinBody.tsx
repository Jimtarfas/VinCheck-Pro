/**
 * Shared body for /guides/how-to-read-a-vin and /es/guides/how-to-read-a-vin.
 * Wave 18 batch 2 — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home", guides: "Guides", crumb: "How to Read a VIN",
    h1: "How to Read a VIN Number",
    intro:
      "A Vehicle Identification Number (VIN) is a 17-character code that serves as a fingerprint for every car, truck, and SUV on the road. Each character carries specific meaning. This guide breaks down every position so you can read any VIN at a glance.",
    glanceHeading: "VIN Structure at a Glance",
    legend: {
      wmi: "WMI (1-3)",
      vds: "VDS (4-8)",
      check: "Check (9)",
      vis: "VIS (10-11)",
      serial: "Serial (12-17)",
    },
    h2Sections: "The Three Sections of a VIN",
    sectionsIntro:
      "Every VIN is divided into three distinct sections defined by ISO standards 3779 and 3780. Understanding these sections is the first step to reading any VIN.",
    wmiH3: "1. World Manufacturer Identifier (WMI) - Positions 1 to 3",
    wmiP1:
      "The WMI tells you where the vehicle was made and who made it. The first character identifies the country of manufacture. For example, vehicles built in the United States start with 1, 4, or 5. Canadian vehicles start with 2, and Mexican vehicles with 3. Japan uses J, Germany uses W, South Korea uses K, and the United Kingdom uses S.",
    wmiP2:
      "The second character identifies the manufacturer. G stands for General Motors, F for Ford, T for Toyota, H for Honda, and so on. The third character narrows things further, specifying the vehicle type or the division within the manufacturer. Together, these three characters let you immediately identify the origin and maker of any vehicle.",
    vdsH3: "2. Vehicle Descriptor Section (VDS) - Positions 4 to 8",
    vdsP1:
      "The VDS encodes vehicle-specific attributes. These five characters describe the body style, engine type, model line, series, and restraint system. The exact meaning of each position varies by manufacturer because automakers have some flexibility in how they assign these codes.",
    vdsP2Pre:
      "For example, one manufacturer might use position 4 for the body type and position 5 for the engine, while another reverses that order. This is why a ",
    vdsP2Link: "VIN decoder tool",
    vdsP2Suffix:
      " is so valuable: it knows the encoding scheme for every manufacturer and can translate these positions into plain language.",
    visH3: "3. Vehicle Identifier Section (VIS) - Positions 9 to 17",
    visP1:
      "The VIS starts with the check digit at position 9. This is a mathematically calculated value used to verify the entire VIN is valid. It helps detect typos and fraudulent VINs. The check digit can be any number from 0 through 9, or the letter X (which represents 10).",
    visP2:
      "Position 10 indicates the model year. A rotating system of letters and numbers is used, cycling through the alphabet (skipping I, O, Q, U, and Z) and digits. For instance, R represents 2024, S represents 2025, and T represents 2026. Position 11 identifies the assembly plant. The final six positions (12 through 17) are the sequential production number, a unique serial assigned to the vehicle as it comes off the assembly line.",
    h2Reference: "Complete VIN Position Reference",
    referenceIntro: "Use this table as a quick reference for each position in a 17-character VIN.",
    tableHead: { position: "Position", meaning: "Meaning", details: "Details" },
    positions: [
      { positions: "1", label: "Country of Origin", example: "1 = USA, 2 = Canada, J = Japan, W = Germany, K = South Korea" },
      { positions: "2", label: "Manufacturer", example: "G = General Motors, F = Ford, T = Toyota, H = Honda, B = BMW" },
      { positions: "3", label: "Vehicle Type / Division", example: "Identifies the vehicle type (passenger car, truck, SUV) or the specific division within the manufacturer" },
      { positions: "4 - 8", label: "Vehicle Attributes (VDS)", example: "Body style, engine type, model line, series, and restraint system. Meaning varies by manufacturer" },
      { positions: "9", label: "Check Digit", example: "A calculated value (0-9 or X) used to detect invalid or fraudulent VINs" },
      { positions: "10", label: "Model Year", example: "R = 2024, S = 2025, T = 2026, V = 2027" },
      { positions: "11", label: "Assembly Plant", example: "A code assigned by the manufacturer for the factory location" },
      { positions: "12 - 17", label: "Sequential Production Number", example: "A unique serial number assigned to each vehicle on the production line" },
    ],
    h2YearChart: "VIN Year Chart — Model Year Code (10th Digit)",
    yearChartIntroPre: "The 10th character of a VIN encodes the model year. The chart below covers every code from ",
    yearChartA1980: "A (1980)",
    yearChartIntroMid1: " through ",
    yearChart9_2009: "9 (2009)",
    yearChartIntroMid2: ", then repeating from ",
    yearChartA2010: "A (2010)",
    yearChartIntroMid3: " to ",
    yearChart9_2039: "9 (2039)",
    yearChartIntroMid4: ". Because the code runs on a 30-year cycle, each character maps to two years 30 years apart — for example, ",
    yearChartR: "R",
    yearChartIntroMid5: " means 1994 ",
    yearChartAnd: "and",
    yearChartIntroMid6: " 2024 — so use the vehicle's body style and condition to tell which cycle applies. Letters ",
    yearChartExcludedLetters: "I, O, Q, U, Z",
    yearChartIntroMid7: " and the digit ",
    yearChartExcludedDigit: "0",
    yearChartIntroSuffix: " are never used.",
    yearTableHead: { code: "VIN Code", year: "Model Year", yearRepeat: "Model Year (repeat)" },
    yearNotePre: "Note: the modern 17-character VIN became mandatory for the 1981 model year, so ",
    yearNoteBold: "A = 1980",
    yearNoteSuffix: " only appears on a handful of early-adopter vehicles.",
    h2Excluded: "Characters Never Used in a VIN",
    excludedP:
      "VINs never contain the letters I, O, or Q. These characters were excluded from the standard because they can be easily confused with the numbers 1 and 0. If you see any of these letters in what claims to be a VIN, the number is either misread or fraudulent. This rule has been in effect since the 17-character VIN standard was adopted in 1981.",
    h2Why: "Why Knowing How to Read a VIN Matters",
    whyP1:
      "Understanding VIN structure empowers you in several important ways. When buying a used car, you can verify that the VIN on the dashboard matches the one on the title and door jamb. Discrepancies can indicate a stolen vehicle or one that has been rebuilt from parts of multiple cars (known as a \"cloned\" VIN).",
    whyP2:
      "You can also use the model year digit to confirm the seller is representing the correct year, and the country-of-origin digit to verify where the vehicle was actually manufactured. Many buyers assume a vehicle with a domestic brand name was built domestically, but the VIN reveals the truth.",
    whyP3Pre: "For the most complete picture, pair your VIN reading skills with a ",
    whyP3Link: "comprehensive VIN check",
    whyP3Suffix: ". Our tool decodes every position and pulls in additional data including full specs, equipment lists, recall information, and market values.",
    h2Faq: "VIN Reading FAQ",
    ctaHeading: "Decode Any VIN Instantly",
    ctaSub: "Paste a 17-character VIN below to see the full breakdown, vehicle specs, and history report.",
  },
  es: {
    home: "Inicio", guides: "Guías", crumb: "Cómo leer un VIN",
    h1: "Cómo leer un número VIN",
    intro:
      "Un Número de Identificación Vehicular (VIN) es un código de 17 caracteres que sirve como huella digital para cada auto, camioneta y SUV en la carretera. Cada carácter lleva un significado específico. Esta guía desglosa cada posición para que puedas leer cualquier VIN de un vistazo.",
    glanceHeading: "Estructura del VIN de un vistazo",
    legend: {
      wmi: "WMI (1-3)",
      vds: "VDS (4-8)",
      check: "Verificación (9)",
      vis: "VIS (10-11)",
      serial: "Serie (12-17)",
    },
    h2Sections: "Las tres secciones de un VIN",
    sectionsIntro:
      "Cada VIN se divide en tres secciones distintas definidas por las normas ISO 3779 y 3780. Entender estas secciones es el primer paso para leer cualquier VIN.",
    wmiH3: "1. Identificador mundial del fabricante (WMI) - Posiciones 1 a 3",
    wmiP1:
      "El WMI te dice dónde se fabricó el vehículo y quién lo hizo. El primer carácter identifica el país de fabricación. Por ejemplo, los vehículos construidos en Estados Unidos comienzan con 1, 4 o 5. Los vehículos canadienses comienzan con 2, y los mexicanos con 3. Japón usa J, Alemania usa W, Corea del Sur usa K y el Reino Unido usa S.",
    wmiP2:
      "El segundo carácter identifica al fabricante. G representa a General Motors, F a Ford, T a Toyota, H a Honda, y así sucesivamente. El tercer carácter afina aún más, especificando el tipo de vehículo o la división dentro del fabricante. Juntos, estos tres caracteres te permiten identificar de inmediato el origen y el fabricante de cualquier vehículo.",
    vdsH3: "2. Sección descriptora del vehículo (VDS) - Posiciones 4 a 8",
    vdsP1:
      "La VDS codifica atributos específicos del vehículo. Estos cinco caracteres describen el estilo de carrocería, el tipo de motor, la línea del modelo, la serie y el sistema de retención. El significado exacto de cada posición varía según el fabricante porque las armadoras tienen cierta flexibilidad en cómo asignan estos códigos.",
    vdsP2Pre:
      "Por ejemplo, un fabricante podría usar la posición 4 para el tipo de carrocería y la posición 5 para el motor, mientras otro invierte ese orden. Por eso una ",
    vdsP2Link: "herramienta decodificadora de VIN",
    vdsP2Suffix:
      " es tan valiosa: conoce el esquema de codificación de cada fabricante y puede traducir estas posiciones a lenguaje sencillo.",
    visH3: "3. Sección identificadora del vehículo (VIS) - Posiciones 9 a 17",
    visP1:
      "La VIS comienza con el dígito de verificación en la posición 9. Este es un valor calculado matemáticamente que se usa para verificar que todo el VIN sea válido. Ayuda a detectar errores tipográficos y VIN fraudulentos. El dígito de verificación puede ser cualquier número del 0 al 9, o la letra X (que representa el 10).",
    visP2:
      "La posición 10 indica el año modelo. Se usa un sistema rotatorio de letras y números, recorriendo el alfabeto (omitiendo I, O, Q, U y Z) y los dígitos. Por ejemplo, R representa 2024, S representa 2025 y T representa 2026. La posición 11 identifica la planta de ensamblaje. Las últimas seis posiciones (12 a 17) son el número de serie de producción, un número de serie único asignado al vehículo a medida que sale de la línea de ensamblaje.",
    h2Reference: "Referencia completa de posiciones del VIN",
    referenceIntro: "Usa esta tabla como referencia rápida para cada posición en un VIN de 17 caracteres.",
    tableHead: { position: "Posición", meaning: "Significado", details: "Detalles" },
    positions: [
      { positions: "1", label: "País de origen", example: "1 = EE. UU., 2 = Canadá, J = Japón, W = Alemania, K = Corea del Sur" },
      { positions: "2", label: "Fabricante", example: "G = General Motors, F = Ford, T = Toyota, H = Honda, B = BMW" },
      { positions: "3", label: "Tipo de vehículo / División", example: "Identifica el tipo de vehículo (auto de pasajeros, camioneta, SUV) o la división específica dentro del fabricante" },
      { positions: "4 - 8", label: "Atributos del vehículo (VDS)", example: "Estilo de carrocería, tipo de motor, línea del modelo, serie y sistema de retención. El significado varía según el fabricante" },
      { positions: "9", label: "Dígito de verificación", example: "Un valor calculado (0-9 o X) usado para detectar VIN inválidos o fraudulentos" },
      { positions: "10", label: "Año modelo", example: "R = 2024, S = 2025, T = 2026, V = 2027" },
      { positions: "11", label: "Planta de ensamblaje", example: "Un código asignado por el fabricante para la ubicación de la fábrica" },
      { positions: "12 - 17", label: "Número de serie de producción", example: "Un número de serie único asignado a cada vehículo en la línea de producción" },
    ],
    h2YearChart: "Tabla de año del VIN — Código de año modelo (dígito 10)",
    yearChartIntroPre: "El décimo carácter de un VIN codifica el año modelo. La tabla a continuación cubre cada código desde ",
    yearChartA1980: "A (1980)",
    yearChartIntroMid1: " hasta ",
    yearChart9_2009: "9 (2009)",
    yearChartIntroMid2: ", luego se repite desde ",
    yearChartA2010: "A (2010)",
    yearChartIntroMid3: " hasta ",
    yearChart9_2039: "9 (2039)",
    yearChartIntroMid4: ". Como el código corre en un ciclo de 30 años, cada carácter se mapea a dos años con 30 años de diferencia — por ejemplo, ",
    yearChartR: "R",
    yearChartIntroMid5: " significa 1994 ",
    yearChartAnd: "y",
    yearChartIntroMid6: " 2024 — así que usa el estilo de carrocería y la condición del vehículo para saber qué ciclo aplica. Las letras ",
    yearChartExcludedLetters: "I, O, Q, U, Z",
    yearChartIntroMid7: " y el dígito ",
    yearChartExcludedDigit: "0",
    yearChartIntroSuffix: " nunca se usan.",
    yearTableHead: { code: "Código VIN", year: "Año modelo", yearRepeat: "Año modelo (repetición)" },
    yearNotePre: "Nota: el VIN moderno de 17 caracteres se volvió obligatorio para el año modelo 1981, así que ",
    yearNoteBold: "A = 1980",
    yearNoteSuffix: " solo aparece en un puñado de vehículos de adopción temprana.",
    h2Excluded: "Caracteres que nunca se usan en un VIN",
    excludedP:
      "Los VIN nunca contienen las letras I, O o Q. Estos caracteres fueron excluidos del estándar porque pueden confundirse fácilmente con los números 1 y 0. Si ves alguna de estas letras en lo que afirma ser un VIN, el número está mal leído o es fraudulento. Esta regla ha estado en vigor desde que se adoptó el estándar del VIN de 17 caracteres en 1981.",
    h2Why: "Por qué importa saber leer un VIN",
    whyP1:
      "Entender la estructura del VIN te empodera de varias maneras importantes. Al comprar un auto usado, puedes verificar que el VIN en el tablero coincida con el del título y el marco de la puerta. Las discrepancias pueden indicar un vehículo robado o uno que ha sido reconstruido con partes de varios autos (conocido como un VIN \"clonado\").",
    whyP2:
      "También puedes usar el dígito del año modelo para confirmar que el vendedor representa el año correcto, y el dígito del país de origen para verificar dónde se fabricó realmente el vehículo. Muchos compradores asumen que un vehículo con una marca nacional fue construido localmente, pero el VIN revela la verdad.",
    whyP3Pre: "Para el panorama más completo, combina tus habilidades de lectura de VIN con una ",
    whyP3Link: "verificación VIN completa",
    whyP3Suffix:
      ". Nuestra herramienta decodifica cada posición y trae datos adicionales incluyendo especificaciones completas, listas de equipo, información de recalls y valores de mercado.",
    h2Faq: "Preguntas frecuentes sobre lectura de VIN",
    ctaHeading: "Decodifica cualquier VIN al instante",
    ctaSub: "Pega un VIN de 17 caracteres a continuación para ver el desglose completo, especificaciones del vehículo y reporte de historial.",
  },
  fr: {
    home: "Accueil", guides: "Guides", crumb: "Comment lire un VIN",
    h1: "Comment lire un num\u00e9ro VIN",
    intro:
      "Un num\u00e9ro d'identification du v\u00e9hicule (VIN) est un code de 17 caract\u00e8res qui sert d'empreinte digitale pour chaque voiture, camion et SUV sur la route. Chaque caract\u00e8re porte une signification sp\u00e9cifique. Ce guide d\u00e9compose chaque position pour que tu puisses lire n'importe quel VIN d'un coup d'\u0153il.",
    glanceHeading: "Structure du VIN en un coup d'\u0153il",
    legend: {
      wmi: "WMI (1-3)",
      vds: "VDS (4-8)",
      check: "V\u00e9rification (9)",
      vis: "VIS (10-11)",
      serial: "S\u00e9rie (12-17)",
    },
    h2Sections: "Les trois sections d'un VIN",
    sectionsIntro:
      "Chaque VIN est divis\u00e9 en trois sections distinctes d\u00e9finies par les normes ISO 3779 et 3780. Comprendre ces sections est la premi\u00e8re \u00e9tape pour lire n'importe quel VIN.",
    wmiH3: "1. Identifiant mondial du fabricant (WMI) - Positions 1 \u00e0 3",
    wmiP1:
      "Le WMI t'indique o\u00f9 le v\u00e9hicule a \u00e9t\u00e9 fabriqu\u00e9 et qui l'a fabriqu\u00e9. Le premier caract\u00e8re identifie le pays de fabrication. Par exemple, les v\u00e9hicules construits aux \u00c9tats-Unis commencent par 1, 4 ou 5. Les v\u00e9hicules canadiens commencent par 2, et les v\u00e9hicules mexicains par 3. Le Japon utilise J, l'Allemagne utilise W, la Cor\u00e9e du Sud utilise K et le Royaume-Uni utilise S.",
    wmiP2:
      "Le deuxi\u00e8me caract\u00e8re identifie le fabricant. G repr\u00e9sente General Motors, F pour Ford, T pour Toyota, H pour Honda, et ainsi de suite. Le troisi\u00e8me caract\u00e8re affine davantage, en sp\u00e9cifiant le type de v\u00e9hicule ou la division au sein du fabricant. Ensemble, ces trois caract\u00e8res te permettent d'identifier imm\u00e9diatement l'origine et le constructeur de n'importe quel v\u00e9hicule.",
    vdsH3: "2. Section descriptive du v\u00e9hicule (VDS) - Positions 4 \u00e0 8",
    vdsP1:
      "Le VDS code les attributs sp\u00e9cifiques au v\u00e9hicule. Ces cinq caract\u00e8res d\u00e9crivent le style de carrosserie, le type de moteur, la ligne de mod\u00e8le, la s\u00e9rie et le syst\u00e8me de retenue. La signification exacte de chaque position varie selon le fabricant car les constructeurs ont une certaine flexibilit\u00e9 dans la fa\u00e7on dont ils attribuent ces codes.",
    vdsP2Pre:
      "Par exemple, un fabricant pourrait utiliser la position 4 pour le type de carrosserie et la position 5 pour le moteur, tandis qu'un autre inverse cet ordre. C'est pourquoi un ",
    vdsP2Link: "outil d\u00e9codeur VIN",
    vdsP2Suffix:
      " est si pr\u00e9cieux : il conna\u00eet le sch\u00e9ma de codage de chaque fabricant et peut traduire ces positions en langage clair.",
    visH3: "3. Section identifiant du v\u00e9hicule (VIS) - Positions 9 \u00e0 17",
    visP1:
      "Le VIS commence par le chiffre de contr\u00f4le \u00e0 la position 9. Il s'agit d'une valeur calcul\u00e9e math\u00e9matiquement utilis\u00e9e pour v\u00e9rifier que l'ensemble du VIN est valide. Elle aide \u00e0 d\u00e9tecter les fautes de frappe et les VIN frauduleux. Le chiffre de contr\u00f4le peut \u00eatre n'importe quel nombre de 0 \u00e0 9, ou la lettre X (qui repr\u00e9sente 10).",
    visP2:
      "La position 10 indique l'ann\u00e9e mod\u00e8le. Un syst\u00e8me rotatif de lettres et de chiffres est utilis\u00e9, parcourant l'alphabet (en sautant I, O, Q, U et Z) et les chiffres. Par exemple, R repr\u00e9sente 2024, S repr\u00e9sente 2025 et T repr\u00e9sente 2026. La position 11 identifie l'usine d'assemblage. Les six derni\u00e8res positions (12 \u00e0 17) sont le num\u00e9ro s\u00e9quentiel de production, un num\u00e9ro de s\u00e9rie unique attribu\u00e9 au v\u00e9hicule \u00e0 sa sortie de la cha\u00eene d'assemblage.",
    h2Reference: "R\u00e9f\u00e9rence compl\u00e8te des positions du VIN",
    referenceIntro: "Utilise ce tableau comme r\u00e9f\u00e9rence rapide pour chaque position dans un VIN de 17 caract\u00e8res.",
    tableHead: { position: "Position", meaning: "Signification", details: "D\u00e9tails" },
    positions: [
      { positions: "1", label: "Pays d'origine", example: "1 = \u00c9.-U., 2 = Canada, J = Japon, W = Allemagne, K = Cor\u00e9e du Sud" },
      { positions: "2", label: "Fabricant", example: "G = General Motors, F = Ford, T = Toyota, H = Honda, B = BMW" },
      { positions: "3", label: "Type de v\u00e9hicule / Division", example: "Identifie le type de v\u00e9hicule (voiture de tourisme, camion, SUV) ou la division sp\u00e9cifique au sein du fabricant" },
      { positions: "4 - 8", label: "Attributs du v\u00e9hicule (VDS)", example: "Style de carrosserie, type de moteur, ligne de mod\u00e8le, s\u00e9rie et syst\u00e8me de retenue. La signification varie selon le fabricant" },
      { positions: "9", label: "Chiffre de contr\u00f4le", example: "Une valeur calcul\u00e9e (0-9 ou X) utilis\u00e9e pour d\u00e9tecter les VIN invalides ou frauduleux" },
      { positions: "10", label: "Ann\u00e9e mod\u00e8le", example: "R = 2024, S = 2025, T = 2026, V = 2027" },
      { positions: "11", label: "Usine d'assemblage", example: "Un code attribu\u00e9 par le fabricant pour l'emplacement de l'usine" },
      { positions: "12 - 17", label: "Num\u00e9ro s\u00e9quentiel de production", example: "Un num\u00e9ro de s\u00e9rie unique attribu\u00e9 \u00e0 chaque v\u00e9hicule sur la ligne de production" },
    ],
    h2YearChart: "Tableau de l'ann\u00e9e du VIN \u2014 Code de l'ann\u00e9e mod\u00e8le (10e chiffre)",
    yearChartIntroPre: "Le 10e caract\u00e8re d'un VIN code l'ann\u00e9e mod\u00e8le. Le tableau ci-dessous couvre chaque code de ",
    yearChartA1980: "A (1980)",
    yearChartIntroMid1: " \u00e0 ",
    yearChart9_2009: "9 (2009)",
    yearChartIntroMid2: ", puis se r\u00e9p\u00e8te de ",
    yearChartA2010: "A (2010)",
    yearChartIntroMid3: " \u00e0 ",
    yearChart9_2039: "9 (2039)",
    yearChartIntroMid4: ". Comme le code fonctionne sur un cycle de 30 ans, chaque caract\u00e8re correspond \u00e0 deux ann\u00e9es s\u00e9par\u00e9es de 30 ans \u2014 par exemple, ",
    yearChartR: "R",
    yearChartIntroMid5: " signifie 1994 ",
    yearChartAnd: "et",
    yearChartIntroMid6: " 2024 \u2014 utilise donc le style de carrosserie et l'\u00e9tat du v\u00e9hicule pour d\u00e9terminer quel cycle s'applique. Les lettres ",
    yearChartExcludedLetters: "I, O, Q, U, Z",
    yearChartIntroMid7: " et le chiffre ",
    yearChartExcludedDigit: "0",
    yearChartIntroSuffix: " ne sont jamais utilis\u00e9s.",
    yearTableHead: { code: "Code VIN", year: "Ann\u00e9e mod\u00e8le", yearRepeat: "Ann\u00e9e mod\u00e8le (r\u00e9p\u00e9tition)" },
    yearNotePre: "Note : le VIN moderne de 17 caract\u00e8res est devenu obligatoire pour l'ann\u00e9e mod\u00e8le 1981, donc ",
    yearNoteBold: "A = 1980",
    yearNoteSuffix: " n'appara\u00eet que sur une poign\u00e9e de v\u00e9hicules adopt\u00e9s pr\u00e9cocement.",
    h2Excluded: "Caract\u00e8res jamais utilis\u00e9s dans un VIN",
    excludedP:
      "Les VIN ne contiennent jamais les lettres I, O ou Q. Ces caract\u00e8res ont \u00e9t\u00e9 exclus de la norme car ils peuvent facilement \u00eatre confondus avec les chiffres 1 et 0. Si tu vois l'une de ces lettres dans ce qui pr\u00e9tend \u00eatre un VIN, le num\u00e9ro est soit mal lu, soit frauduleux. Cette r\u00e8gle est en vigueur depuis l'adoption de la norme VIN \u00e0 17 caract\u00e8res en 1981.",
    h2Why: "Pourquoi il est important de savoir lire un VIN",
    whyP1:
      "Comprendre la structure du VIN te donne du pouvoir de plusieurs mani\u00e8res importantes. Lorsque tu ach\u00e8tes une voiture d'occasion, tu peux v\u00e9rifier que le VIN sur le tableau de bord correspond \u00e0 celui du titre et du cadre de porte. Les divergences peuvent indiquer un v\u00e9hicule vol\u00e9 ou reconstruit \u00e0 partir de pi\u00e8ces de plusieurs voitures (connu sous le nom de VIN \u00ab clon\u00e9 \u00bb).",
    whyP2:
      "Tu peux \u00e9galement utiliser le chiffre de l'ann\u00e9e mod\u00e8le pour confirmer que le vendeur repr\u00e9sente la bonne ann\u00e9e, et le chiffre du pays d'origine pour v\u00e9rifier o\u00f9 le v\u00e9hicule a \u00e9t\u00e9 r\u00e9ellement fabriqu\u00e9. De nombreux acheteurs supposent qu'un v\u00e9hicule de marque nationale a \u00e9t\u00e9 construit localement, mais le VIN r\u00e9v\u00e8le la v\u00e9rit\u00e9.",
    whyP3Pre: "Pour la vue la plus compl\u00e8te, associe tes comp\u00e9tences de lecture du VIN \u00e0 une ",
    whyP3Link: "v\u00e9rification VIN compl\u00e8te",
    whyP3Suffix: ". Notre outil d\u00e9code chaque position et apporte des donn\u00e9es suppl\u00e9mentaires, y compris les sp\u00e9cifications compl\u00e8tes, les listes d'\u00e9quipement, les informations sur les rappels et les valeurs de march\u00e9.",
    h2Faq: "FAQ sur la lecture du VIN",
    ctaHeading: "D\u00e9code n'importe quel VIN instantan\u00e9ment",
    ctaSub: "Colle un VIN de 17 caract\u00e8res ci-dessous pour voir la ventilation compl\u00e8te, les sp\u00e9cifications du v\u00e9hicule et le rapport d'historique.",
  },
} as const;

const FAQS_EN = [
  {
    question: "What does the 10th digit of a VIN tell you?",
    answer: "The 10th digit of a VIN is the model-year code. It uses a standardized letter or number that runs on a 30-year cycle: A = 1980, B = 1981, and so on up to Y = 2000, then 1 = 2001 through 9 = 2009, after which the letters repeat (A = 2010, B = 2011...). Because each code maps to two years 30 years apart, you confirm the cycle using the vehicle's body style and overall condition. The letters I, O, Q, U, Z and the digit 0 are never used.",
  },
  {
    question: "What is the WMI in a VIN?",
    answer: "The WMI, or World Manufacturer Identifier, is the first three characters of a VIN. Position 1 identifies the country of manufacture (1, 4, or 5 = United States; 2 = Canada; 3 = Mexico; J = Japan; W = Germany; K = South Korea; S = United Kingdom). Position 2 identifies the manufacturer (G = General Motors, F = Ford, T = Toyota, H = Honda). Position 3 indicates the vehicle type or the manufacturer's division.",
  },
  {
    question: "What characters are never used in a VIN?",
    answer: "A VIN never contains the letters I, O, or Q because they are too easily confused with the numbers 1 and 0. In the 10th-position model-year code, the letters U and Z and the digit 0 are also skipped. If a 17-character VIN contains an I, O, or Q, it has been misread or is fraudulent — every legitimate VIN since the 1981 standard avoids those three letters entirely.",
  },
  {
    question: "What is the check digit in a VIN?",
    answer: "The check digit is the 9th character of a VIN. It is a single value from 0 to 9, or the letter X (representing 10), calculated from all the other characters using a weighted mathematical formula. Its only purpose is to verify the VIN is internally consistent: if someone alters or mistypes a character, the check digit will no longer match, flagging the VIN as invalid. It is mandatory on all vehicles sold in North America.",
  },
  {
    question: "How long is a VIN and when did the 17-character standard start?",
    answer: "A modern VIN is exactly 17 characters long. The standardized 17-character format became mandatory for all vehicles manufactured for the 1981 model year and later, defined by ISO standards 3779 and 3780 and the U.S. National Highway Traffic Safety Administration. Vehicles built before 1981 used shorter, non-standardized VINs that varied by manufacturer and ranged from 11 to 17 characters.",
  },
  {
    question: "What do the 4th through 8th VIN characters mean?",
    answer: "Characters 4 through 8 form the Vehicle Descriptor Section (VDS). These five positions encode the vehicle's attributes — body style, engine type, model line, series, and restraint (safety) system. Unlike the country and year codes, the exact meaning of each VDS character is defined by the individual manufacturer, so the same letter can mean different things across brands. Decoding the VDS fully usually requires the manufacturer's reference or a VIN decoder tool.",
  },
  {
    question: "Where can I find the VIN on a vehicle?",
    answer: "The most common place to find a VIN is on the lower-left corner of the dashboard, visible through the windshield from outside the car. It also appears on a sticker or plate in the driver's-side door jamb, on the vehicle title and registration, and on the insurance card. On many vehicles the VIN is additionally stamped on the engine block and the firewall. Always confirm the dashboard VIN matches the title to rule out a cloned or stolen vehicle.",
  },
  {
    question: "Can you tell a car's age from the VIN?",
    answer: "Yes. The 10th character of the VIN reveals the model year directly — for example, R = 2024, S = 2025, T = 2026. Because the code repeats on a 30-year cycle, that single character could indicate either of two years 30 years apart, so you confirm the correct one using the vehicle's design, features, and condition. The model year is the most reliable single piece of age information encoded in a VIN.",
  },
];

const FAQS_ES = [
  {
    question: "¿Qué te dice el décimo dígito de un VIN?",
    answer: "El décimo dígito de un VIN es el código del año modelo. Usa una letra o número estandarizado que corre en un ciclo de 30 años: A = 1980, B = 1981, y así sucesivamente hasta Y = 2000, luego 1 = 2001 hasta 9 = 2009, después de lo cual las letras se repiten (A = 2010, B = 2011...). Como cada código se mapea a dos años con 30 años de diferencia, confirmas el ciclo usando el estilo de carrocería y la condición general del vehículo. Las letras I, O, Q, U, Z y el dígito 0 nunca se usan.",
  },
  {
    question: "¿Qué es el WMI en un VIN?",
    answer: "El WMI, o identificador mundial del fabricante, son los primeros tres caracteres de un VIN. La posición 1 identifica el país de fabricación (1, 4 o 5 = Estados Unidos; 2 = Canadá; 3 = México; J = Japón; W = Alemania; K = Corea del Sur; S = Reino Unido). La posición 2 identifica al fabricante (G = General Motors, F = Ford, T = Toyota, H = Honda). La posición 3 indica el tipo de vehículo o la división del fabricante.",
  },
  {
    question: "¿Qué caracteres nunca se usan en un VIN?",
    answer: "Un VIN nunca contiene las letras I, O o Q porque se confunden demasiado fácilmente con los números 1 y 0. En el código del año modelo de la posición 10, también se omiten las letras U y Z y el dígito 0. Si un VIN de 17 caracteres contiene una I, O o Q, ha sido mal leído o es fraudulento — cada VIN legítimo desde el estándar de 1981 evita esas tres letras por completo.",
  },
  {
    question: "¿Qué es el dígito de verificación en un VIN?",
    answer: "El dígito de verificación es el noveno carácter de un VIN. Es un valor único del 0 al 9, o la letra X (que representa el 10), calculado a partir de todos los demás caracteres usando una fórmula matemática ponderada. Su único propósito es verificar que el VIN sea internamente consistente: si alguien altera o escribe mal un carácter, el dígito de verificación ya no coincidirá, marcando el VIN como inválido. Es obligatorio en todos los vehículos vendidos en Norteamérica.",
  },
  {
    question: "¿Cuánto mide un VIN y cuándo comenzó el estándar de 17 caracteres?",
    answer: "Un VIN moderno mide exactamente 17 caracteres. El formato estandarizado de 17 caracteres se volvió obligatorio para todos los vehículos fabricados para el año modelo 1981 y posteriores, definido por las normas ISO 3779 y 3780 y la Administración Nacional de Seguridad del Tráfico en las Carreteras de EE. UU. (NHTSA). Los vehículos construidos antes de 1981 usaban VIN más cortos y no estandarizados que variaban según el fabricante y oscilaban entre 11 y 17 caracteres.",
  },
  {
    question: "¿Qué significan los caracteres 4 al 8 del VIN?",
    answer: "Los caracteres 4 al 8 forman la sección descriptora del vehículo (VDS). Estas cinco posiciones codifican los atributos del vehículo — estilo de carrocería, tipo de motor, línea del modelo, serie y sistema de retención (seguridad). A diferencia de los códigos de país y año, el significado exacto de cada carácter VDS lo define el fabricante individual, así que la misma letra puede significar cosas diferentes entre marcas. Decodificar el VDS por completo usualmente requiere la referencia del fabricante o una herramienta decodificadora de VIN.",
  },
  {
    question: "¿Dónde puedo encontrar el VIN en un vehículo?",
    answer: "El lugar más común para encontrar un VIN es la esquina inferior izquierda del tablero, visible a través del parabrisas desde fuera del auto. También aparece en una etiqueta o placa en el marco de la puerta del lado del conductor, en el título y registro del vehículo, y en la tarjeta del seguro. En muchos vehículos el VIN además está estampado en el bloque del motor y en el firewall. Siempre confirma que el VIN del tablero coincida con el título para descartar un vehículo clonado o robado.",
  },
  {
    question: "¿Puedes saber la edad de un auto por el VIN?",
    answer: "Sí. El décimo carácter del VIN revela directamente el año modelo — por ejemplo, R = 2024, S = 2025, T = 2026. Como el código se repite en un ciclo de 30 años, ese único carácter podría indicar cualquiera de dos años con 30 años de diferencia, así que confirmas el correcto usando el diseño, las características y la condición del vehículo. El año modelo es la pieza de información sobre la edad más confiable codificada en un VIN.",
  },
];

const modelYearCodes = [
  { code: "A", c1: 1980, c2: 2010 },
  { code: "B", c1: 1981, c2: 2011 },
  { code: "C", c1: 1982, c2: 2012 },
  { code: "D", c1: 1983, c2: 2013 },
  { code: "E", c1: 1984, c2: 2014 },
  { code: "F", c1: 1985, c2: 2015 },
  { code: "G", c1: 1986, c2: 2016 },
  { code: "H", c1: 1987, c2: 2017 },
  { code: "J", c1: 1988, c2: 2018 },
  { code: "K", c1: 1989, c2: 2019 },
  { code: "L", c1: 1990, c2: 2020 },
  { code: "M", c1: 1991, c2: 2021 },
  { code: "N", c1: 1992, c2: 2022 },
  { code: "P", c1: 1993, c2: 2023 },
  { code: "R", c1: 1994, c2: 2024 },
  { code: "S", c1: 1995, c2: 2025 },
  { code: "T", c1: 1996, c2: 2026 },
  { code: "V", c1: 1997, c2: 2027 },
  { code: "W", c1: 1998, c2: 2028 },
  { code: "X", c1: 1999, c2: 2029 },
  { code: "Y", c1: 2000, c2: 2030 },
  { code: "1", c1: 2001, c2: 2031 },
  { code: "2", c1: 2002, c2: 2032 },
  { code: "3", c1: 2003, c2: 2033 },
  { code: "4", c1: 2004, c2: 2034 },
  { code: "5", c1: 2005, c2: 2035 },
  { code: "6", c1: 2006, c2: 2036 },
  { code: "7", c1: 2007, c2: 2037 },
  { code: "8", c1: 2008, c2: 2038 },
  { code: "9", c1: 2009, c2: 2039 },
];

const VIN_CHARS = ["1", "H", "G", "B", "H", "4", "1", "J", "X", "M", "N", "1", "0", "9", "1", "8", "6"];

interface Props { locale: Locale; }

export default function GuideHowToReadAVinBody({ locale }: Props) {
  const c = COPY[locale];
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);
  const guidesHref = locale === "es" ? "/es/guides" : "/guides";

  return (
    <>
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: c.home, href: locale === "es" ? "/es" : "/" },
              { label: c.guides, href: guidesHref },
              { label: c.crumb },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.intro}</p>

          {/* --- Visual VIN Breakdown --- */}
          <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">{c.glanceHeading}</h2>
            <div className="flex flex-wrap gap-1 font-mono text-sm sm:text-base justify-center">
              {VIN_CHARS.map((char, i) => {
                let bg = "bg-primary-100 text-primary-700";
                if (i >= 3 && i <= 7) bg = "bg-amber-100 text-amber-700";
                if (i === 8) bg = "bg-red-100 text-red-700";
                if (i >= 9 && i <= 10) bg = "bg-emerald-100 text-emerald-700";
                if (i >= 11) bg = "bg-violet-100 text-violet-700";
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-slate-600">{i + 1}</span>
                    <span
                      className={`w-8 h-10 sm:w-10 sm:h-12 flex items-center justify-center rounded-lg font-bold ${bg}`}
                    >
                      {char}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-700 justify-center">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-primary-100 inline-block" />
                {c.legend.wmi}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-100 inline-block" />
                {c.legend.vds}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-100 inline-block" />
                {c.legend.check}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-100 inline-block" />
                {c.legend.vis}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-violet-100 inline-block" />
                {c.legend.serial}
              </span>
            </div>
          </div>

          {/* --- Three Sections --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Sections}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.sectionsIntro}</p>

          <h3 className="mt-8 text-xl font-semibold text-slate-900">{c.wmiH3}</h3>
          <p className="mt-2 text-slate-600 leading-relaxed">{c.wmiP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.wmiP2}</p>

          <h3 className="mt-8 text-xl font-semibold text-slate-900">{c.vdsH3}</h3>
          <p className="mt-2 text-slate-600 leading-relaxed">{c.vdsP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.vdsP2Pre}
            <Link
              href={link("/vin-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.vdsP2Link}
            </Link>
            {c.vdsP2Suffix}
          </p>

          <h3 className="mt-8 text-xl font-semibold text-slate-900">{c.visH3}</h3>
          <p className="mt-2 text-slate-600 leading-relaxed">{c.visP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.visP2}</p>

          {/* --- Position Table --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Reference}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.referenceIntro}</p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">{c.tableHead.position}</th>
                  <th className="px-4 py-3 font-semibold">{c.tableHead.meaning}</th>
                  <th className="px-4 py-3 font-semibold">{c.tableHead.details}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {c.positions.map((row) => (
                  <tr key={row.positions} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-mono font-bold text-primary-600 whitespace-nowrap">
                      {row.positions}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">{row.label}</td>
                    <td className="px-4 py-3 text-slate-700">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- VIN Year Chart --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2YearChart}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.yearChartIntroPre}
            <span className="font-mono font-semibold">{c.yearChartA1980}</span>
            {c.yearChartIntroMid1}
            <span className="font-mono font-semibold">{c.yearChart9_2009}</span>
            {c.yearChartIntroMid2}
            <span className="font-mono font-semibold">{c.yearChartA2010}</span>
            {c.yearChartIntroMid3}
            <span className="font-mono font-semibold">{c.yearChart9_2039}</span>
            {c.yearChartIntroMid4}
            <span className="font-mono font-semibold">{c.yearChartR}</span>
            {c.yearChartIntroMid5}
            <em>{c.yearChartAnd}</em>
            {c.yearChartIntroMid6}
            <span className="font-mono">{c.yearChartExcludedLetters}</span>
            {c.yearChartIntroMid7}
            <span className="font-mono">{c.yearChartExcludedDigit}</span>
            {c.yearChartIntroSuffix}
          </p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">{c.yearTableHead.code}</th>
                  <th className="px-4 py-3 font-semibold">{c.yearTableHead.year}</th>
                  <th className="px-4 py-3 font-semibold">{c.yearTableHead.yearRepeat}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {modelYearCodes.map((row) => (
                  <tr key={row.code} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-mono font-bold text-primary-600">{row.code}</td>
                    <td className="px-4 py-3 text-slate-900">{row.c1}</td>
                    <td className="px-4 py-3 text-slate-700">{row.c2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            {c.yearNotePre}
            <span className="font-mono">{c.yearNoteBold}</span>
            {c.yearNoteSuffix}
          </p>

          {/* --- Characters not allowed --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Excluded}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.excludedP}</p>

          {/* --- Why it matters --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Why}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.whyP1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.whyP2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.whyP3Pre}
            <Link href={link("/")} className="text-primary-600 hover:underline font-medium">
              {c.whyP3Link}
            </Link>
            {c.whyP3Suffix}
          </p>

          {/* --- FAQ --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Faq}</h2>
          <div className="mt-6 space-y-3">
            {(locale === "es" ? FAQS_ES : FAQS_EN).map((f) => (
              <details
                key={f.question}
                className="group rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-slate-900 list-none">
                  {f.question}
                  <span className="text-2xl text-primary-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </article>

      {/* --- CTA --- */}
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
