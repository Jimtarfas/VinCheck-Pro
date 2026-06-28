/**
 * Shared body for /license-plate-lookup and /es/license-plate-lookup.
 * Wave 18 batch 4 — full visual parity via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import { Check, Shield, Clock, Globe, Search, FileText, AlertCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import LicensePlateLookup from "@/app/license-plate-lookup/LicensePlateLookup";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "License Plate to VIN Lookup",
    h1: "License Plate to VIN Lookup",
    lede: "Enter any US license plate number and state to instantly find the vehicle's VIN — then pull the full history report: title brands, accidents, odometer records, and open recalls. Free for all 50 states.",
    badges: [
      { icon: Globe, text: "All 50 States" },
      { icon: Shield, text: "DPPA Compliant" },
      { icon: Clock, text: "Instant Results" },
      { icon: Search, text: "Free Lookup" },
    ],
    whatH2: "What a Plate Lookup Returns",
    whatIntro: "The plate-to-VIN lookup is the first step. Once the VIN is identified you can pull the complete vehicle history from NMVTIS, insurance databases, auction records, and service history aggregators.",
    whatItems: [
      { title: "17-character VIN", detail: "The universal vehicle identifier that unlocks every downstream record." },
      { title: "Year, Make, Model & Trim", detail: "Decoded directly from the VIN — manufacturer, plant, body style, and engine." },
      { title: "Title brands", detail: "Salvage, flood, rebuilt, lemon law buyback, hail damage, and non-repairable flags." },
      { title: "Accident & damage records", detail: "Collision reports, insurance claims, and structural damage disclosures from NMVTIS and insurers." },
      { title: "Odometer history", detail: "Mileage at each title transfer — detects rollback fraud before you buy." },
      { title: "Ownership chain", detail: "Number of owners and which states the vehicle was registered in." },
      { title: "Theft status", detail: "NICB and law enforcement records flagging active or recovered stolen vehicles." },
      { title: "Open safety recalls", detail: "NHTSA-reported unrepaired recall campaigns that may affect the vehicle." },
    ],
    howH2: "How License Plate to VIN Lookup Works",
    howSteps: [
      { n: 1, title: "Enter the plate number", body: "Type the alphanumeric plate number exactly as it appears — no spaces or special characters. Most US plates are 5–8 characters. Vanity and personalized plates follow their own format; enter them exactly as displayed." },
      { n: 2, title: "Select the issuing state", body: "License plates are issued by individual states, not the federal government. The same plate characters can exist in multiple states simultaneously — \"7ABC123\" is a valid California format but \"ABC1234\" is common in other states. Selecting the correct state directs the query to the right DMV database." },
      { n: 3, title: "Get the VIN and vehicle details", body: "The tool queries state registration records to find the 17-character VIN linked to that plate. Year, make, model, and trim are decoded automatically. From there you can pull the full vehicle history report with one click." },
    ],
    stateH2: "State Coverage — All 50 States + DC",
    stateIntro: "Every US state and the District of Columbia is supported. Select the issuing state from the dropdown in the tool above to direct the query to the correct motor vehicle database.",
    stateGroups: [
      { region: "Northeast", states: ["CT", "DE", "MA", "ME", "MD", "NH", "NJ", "NY", "PA", "RI", "VT"] },
      { region: "South", states: ["AL", "AR", "FL", "GA", "KY", "LA", "MS", "NC", "SC", "TN", "TX", "VA", "WV"] },
      { region: "Midwest", states: ["IA", "IL", "IN", "KS", "MI", "MN", "MO", "ND", "NE", "OH", "SD", "WI"] },
      { region: "West", states: ["AK", "AZ", "CA", "CO", "HI", "ID", "MT", "NM", "NV", "OR", "UT", "WA", "WY"] },
    ],
    vsH2: "License Plate Lookup vs. VIN Search",
    plateBoxTitle: "License Plate Lookup",
    plateBoxItems: [
      { check: true, text: "Useful when you only have the plate (street, listing photo)" },
      { check: true, text: "Quick verification that the plate matches the vehicle" },
      { check: false, text: "May return no results for expired, temp, or out-of-state plates" },
      { check: false, text: "Requires knowing the issuing state" },
    ],
    vinBoxTitle: "Direct VIN Search",
    vinBoxItems: [
      "Most reliable — the VIN is the universal vehicle key",
      "Works across all databases without state restrictions",
      "Physically verify VIN on dash, door jamb, and engine bay",
      "Best for final pre-purchase due diligence",
    ],
    vsFooterPre: "Best practice: start with the plate lookup to quickly identify the VIN, then confirm that VIN physically on the vehicle and run a direct ",
    vsFooterLink: "VIN history report",
    vsFooterPost: " for the definitive pre-purchase check.",
    privacyH2: "Privacy & Legal — DPPA Explained",
    privacy1Bold: "Driver's Privacy Protection Act (DPPA) of 1994",
    privacy1Pre: "License plate lookups in the US are governed by the ",
    privacy1Post: ", a federal law restricting access to personal information in state motor vehicle records. Personally identifiable data — owner name, address, SSN — cannot be disclosed without a permissible purpose.",
    privacy2Bold: "Permissible purposes",
    privacy2Post: " include vehicle purchase verification, insurance claims, law enforcement, and litigation support. Our tool is designed for pre-purchase vehicle research — a clearly permissible use — and returns vehicle data (VIN, make, model, title status) rather than owner personal information.",
    privacy3: "We require a free account to run plate lookups. This is both a DPPA compliance measure (we must be able to identify who is accessing the data and for what purpose) and a protection against automated scraping of the database.",
    faqH2: "Frequently Asked Questions",
    faqs: [
      { q: "Can I find a VIN from a license plate for free?", a: "Yes. Create a free CarCheckerVIN account, enter the plate and state in the tool above, and the VIN is returned instantly along with year, make, and model." },
      { q: "What if the plate lookup returns no results?", a: "No results usually means the plate is expired, a temporary dealer tag, or the registration hasn't been indexed yet. Ask the seller for the 17-character VIN directly and run a VIN check — it's always the more reliable approach for a final pre-purchase check." },
      { q: "Can I look up the owner's name from a license plate?", a: "No. The DPPA prohibits disclosing personal owner information (name, address, date of birth) to the general public without a specific permissible purpose. Our lookup returns vehicle data only — not personal information." },
      { q: "Does the lookup work for commercial plates, dealer plates, or military plates?", a: "Commercial and fleet plates generally work. Dealer temp tags, government plates, diplomatic plates, and military plates may have restricted access due to privacy exemptions or separate registration systems." },
      { q: "How accurate is the plate-to-VIN match?", a: "The match is drawn from state DMV registration records and is highly accurate for currently registered passenger vehicles. Expired registrations, recently transferred plates, or plates issued within the last few days may lag behind the database by 24–72 hours." },
    ],
    sourcesH2: "License Plate to VIN — Sources & References",
    sourcesIntro: "License plate lookups in the United States are governed by federal privacy law (the Driver's Privacy Protection Act) and state DMV disclosure rules. The agencies and references below are the authoritative origins of every claim on this page.",
    sources: [
      { href: "https://www.law.cornell.edu/uscode/text/18/2721", label: "18 U.S.C. § 2721 — Driver's Privacy Protection Act", note: "Federal statute restricting disclosure of personal motor-vehicle records." },
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: "Federal title and brand records cross-referenced after plate-to-VIN resolution." },
      { href: "https://www.nhtsa.gov/recalls", label: "NHTSA — Safety Recalls by VIN", note: "Authoritative recall lookup once the VIN is resolved." },
      { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: "Free stolen-vehicle and salvage records from US insurance carriers." },
      { href: "https://vpic.nhtsa.dot.gov/decoder/", label: "NHTSA VIN Decoder", note: "Federal reference decoder for VIN structure and manufacturer codes." },
      { href: "https://www.ftc.gov/business-guidance/resources/dealers-guide-used-car-rule", label: "FTC — Used Car Rule (Buyer's Guide)", note: "Federal regulation buyers can quote when a seller refuses to disclose history." },
    ],
    sourcesFoot: "Plate-to-VIN resolution is performed against state DMV registration records under DPPA-compliant permissible-purpose categories. Personal owner information (name, address) is never returned.",
    ctaH2: "Don't Have the Plate? Search by VIN.",
    ctaSub: "A 17-character VIN gives you the most accurate and complete vehicle history. Find it on the dashboard, driver-side door jamb, or registration card.",
    ctaBtn: "Run a Free VIN Check",
  },
  es: {
    home: "Inicio",
    crumb: "Búsqueda VIN por placa",
    h1: "Búsqueda VIN por placa de matrícula",
    lede: "Ingresa cualquier número de placa de matrícula de EE. UU. y el estado para encontrar al instante el VIN del vehículo — luego obtén el reporte completo de historial: marcas de título, accidentes, registros de odómetro y retiros activos. Gratis para los 50 estados.",
    badges: [
      { icon: Globe, text: "Los 50 estados" },
      { icon: Shield, text: "Cumple con DPPA" },
      { icon: Clock, text: "Resultados al instante" },
      { icon: Search, text: "Búsqueda gratis" },
    ],
    whatH2: "Qué devuelve una búsqueda por placa",
    whatIntro: "La búsqueda VIN por placa es el primer paso. Una vez identificado el VIN, puedes obtener el historial completo del vehículo desde NMVTIS, bases de datos de aseguradoras, registros de subastas y agregadores de historial de servicio.",
    whatItems: [
      { title: "VIN de 17 caracteres", detail: "El identificador universal del vehículo que desbloquea cada registro posterior." },
      { title: "Año, marca, modelo y versión", detail: "Decodificado directamente desde el VIN — fabricante, planta, tipo de carrocería y motor." },
      { title: "Marcas de título", detail: "Salvamento, inundación, reconstruido, recompra por ley de limón, daño por granizo y banderas de no reparable." },
      { title: "Registros de accidentes y daños", detail: "Reportes de colisión, reclamos de seguro y divulgaciones de daño estructural de NMVTIS y aseguradoras." },
      { title: "Historial del odómetro", detail: "Millaje en cada transferencia de título — detecta fraude de manipulación antes de comprar." },
      { title: "Cadena de propiedad", detail: "Número de dueños y en qué estados se registró el vehículo." },
      { title: "Estado de robo", detail: "Registros del NICB y autoridades que marcan vehículos robados activos o recuperados." },
      { title: "Retiros de seguridad activos", detail: "Campañas de retiro no reparadas reportadas por la NHTSA que pueden afectar al vehículo." },
    ],
    howH2: "Cómo funciona la búsqueda VIN por placa",
    howSteps: [
      { n: 1, title: "Ingresa el número de placa", body: "Escribe el número alfanumérico de la placa exactamente como aparece — sin espacios ni caracteres especiales. La mayoría de las placas de EE. UU. tienen entre 5 y 8 caracteres. Las placas personalizadas y vanity siguen su propio formato; ingrésalas exactamente como se muestran." },
      { n: 2, title: "Selecciona el estado emisor", body: "Las placas las emiten los estados individuales, no el gobierno federal. Los mismos caracteres de placa pueden existir en varios estados simultáneamente — \"7ABC123\" es un formato válido de California pero \"ABC1234\" es común en otros estados. Seleccionar el estado correcto dirige la consulta a la base de datos del DMV correcta." },
      { n: 3, title: "Obtén el VIN y los detalles del vehículo", body: "La herramienta consulta los registros estatales de matrícula para encontrar el VIN de 17 caracteres ligado a esa placa. Año, marca, modelo y versión se decodifican automáticamente. Desde ahí puedes obtener el reporte completo de historial del vehículo con un clic." },
    ],
    stateH2: "Cobertura estatal — Los 50 estados + DC",
    stateIntro: "Cada estado de EE. UU. y el Distrito de Columbia están soportados. Selecciona el estado emisor desde el menú desplegable en la herramienta de arriba para dirigir la consulta a la base de datos correcta de vehículos motorizados.",
    stateGroups: [
      { region: "Noreste", states: ["CT", "DE", "MA", "ME", "MD", "NH", "NJ", "NY", "PA", "RI", "VT"] },
      { region: "Sur", states: ["AL", "AR", "FL", "GA", "KY", "LA", "MS", "NC", "SC", "TN", "TX", "VA", "WV"] },
      { region: "Medio Oeste", states: ["IA", "IL", "IN", "KS", "MI", "MN", "MO", "ND", "NE", "OH", "SD", "WI"] },
      { region: "Oeste", states: ["AK", "AZ", "CA", "CO", "HI", "ID", "MT", "NM", "NV", "OR", "UT", "WA", "WY"] },
    ],
    vsH2: "Búsqueda por placa vs. búsqueda por VIN",
    plateBoxTitle: "Búsqueda por placa",
    plateBoxItems: [
      { check: true, text: "Útil cuando solo tienes la placa (calle, foto de anuncio)" },
      { check: true, text: "Verificación rápida de que la placa coincide con el vehículo" },
      { check: false, text: "Puede no devolver resultados para placas vencidas, temporales o fuera del estado" },
      { check: false, text: "Requiere conocer el estado emisor" },
    ],
    vinBoxTitle: "Búsqueda directa por VIN",
    vinBoxItems: [
      "La más confiable — el VIN es la llave universal del vehículo",
      "Funciona en todas las bases de datos sin restricciones de estado",
      "Verifica físicamente el VIN en el tablero, marco de la puerta y vano del motor",
      "La mejor para la diligencia final de pre-compra",
    ],
    vsFooterPre: "Mejor práctica: empieza con la búsqueda por placa para identificar rápidamente el VIN, luego confirma ese VIN físicamente en el vehículo y haz una ",
    vsFooterLink: "verificación de historial por VIN",
    vsFooterPost: " directa para la verificación definitiva de pre-compra.",
    privacyH2: "Privacidad y legal — DPPA explicado",
    privacy1Bold: "Driver's Privacy Protection Act (DPPA) de 1994",
    privacy1Pre: "Las búsquedas de placas en EE. UU. están reguladas por la ",
    privacy1Post: ", una ley federal que restringe el acceso a información personal en los registros estatales de vehículos motorizados. Los datos personalmente identificables — nombre del dueño, dirección, SSN — no pueden divulgarse sin un propósito permisible.",
    privacy2Bold: "Los propósitos permisibles",
    privacy2Post: " incluyen verificación de compra de vehículo, reclamos de seguro, aplicación de la ley y soporte de litigio. Nuestra herramienta está diseñada para investigación de vehículos pre-compra — un uso claramente permisible — y devuelve datos del vehículo (VIN, marca, modelo, estado del título) en lugar de información personal del dueño.",
    privacy3: "Requerimos una cuenta gratis para hacer búsquedas por placa. Esto es tanto una medida de cumplimiento con DPPA (debemos poder identificar quién accede a los datos y para qué propósito) como una protección contra el scraping automatizado de la base de datos.",
    faqH2: "Preguntas frecuentes",
    faqs: [
      { q: "¿Puedo encontrar un VIN desde una placa gratis?", a: "Sí. Crea una cuenta gratis de CarCheckerVIN, ingresa la placa y el estado en la herramienta de arriba, y el VIN se devuelve al instante junto con el año, marca y modelo." },
      { q: "¿Qué pasa si la búsqueda por placa no devuelve resultados?", a: "No tener resultados usualmente significa que la placa está vencida, es una etiqueta temporal de concesionario o el registro aún no ha sido indexado. Pídele al vendedor el VIN de 17 caracteres directamente y haz una verificación VIN — siempre es el enfoque más confiable para una verificación final de pre-compra." },
      { q: "¿Puedo buscar el nombre del dueño desde una placa?", a: "No. La DPPA prohíbe divulgar información personal del dueño (nombre, dirección, fecha de nacimiento) al público general sin un propósito permisible específico. Nuestra búsqueda devuelve solo datos del vehículo — no información personal." },
      { q: "¿La búsqueda funciona para placas comerciales, de concesionario o militares?", a: "Las placas comerciales y de flota generalmente funcionan. Las etiquetas temporales de concesionario, placas gubernamentales, diplomáticas y militares pueden tener acceso restringido debido a exenciones de privacidad o sistemas de registro separados." },
      { q: "¿Qué tan precisa es la coincidencia de placa a VIN?", a: "La coincidencia se extrae de los registros estatales de matrícula del DMV y es muy precisa para vehículos de pasajeros actualmente registrados. Los registros vencidos, placas recién transferidas o placas emitidas en los últimos días pueden retrasarse 24–72 horas respecto a la base de datos." },
    ],
    sourcesH2: "Búsqueda VIN por placa — Fuentes y referencias",
    sourcesIntro: "Las búsquedas de placas en Estados Unidos están reguladas por la ley federal de privacidad (el Driver's Privacy Protection Act) y las reglas de divulgación de los DMV estatales. Las agencias y referencias abajo son los orígenes autoritativos de cada afirmación en esta página.",
    sources: [
      { href: "https://www.law.cornell.edu/uscode/text/18/2721", label: "18 U.S.C. § 2721 — Driver's Privacy Protection Act", note: "Ley federal que restringe la divulgación de registros personales de vehículos motorizados." },
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: "Registros federales de título y marcas cruzados después de la resolución placa-a-VIN." },
      { href: "https://www.nhtsa.gov/recalls", label: "NHTSA — Retiros de seguridad por VIN", note: "Búsqueda autoritativa de retiros una vez resuelto el VIN." },
      { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: "Registros gratis de vehículos robados y salvamento de aseguradoras de EE. UU." },
      { href: "https://vpic.nhtsa.dot.gov/decoder/", label: "NHTSA VIN Decoder", note: "Decodificador federal de referencia para la estructura del VIN y códigos de fabricante." },
      { href: "https://www.ftc.gov/business-guidance/resources/dealers-guide-used-car-rule", label: "FTC — Used Car Rule (Buyer's Guide)", note: "Regulación federal que los compradores pueden citar cuando un vendedor se niega a divulgar el historial." },
    ],
    sourcesFoot: "La resolución placa-a-VIN se realiza contra los registros estatales de matrícula del DMV bajo categorías de propósito permisible que cumplen con DPPA. La información personal del dueño (nombre, dirección) nunca se devuelve.",
    ctaH2: "¿No tienes la placa? Busca por VIN.",
    ctaSub: "Un VIN de 17 caracteres te da el historial más preciso y completo del vehículo. Encuéntralo en el tablero, marco de la puerta del lado del conductor o tarjeta de registro.",
    ctaBtn: "Haz una verificación VIN gratis",
  },
  fr: {
    home: "Accueil",
    crumb: "Recherche VIN par plaque d'immatriculation",
    h1: "Recherche VIN par plaque d'immatriculation",
    lede: "Saisis n'importe quel numéro de plaque d'immatriculation américaine et l'État pour trouver instantanément le VIN du véhicule — puis obtiens le rapport d'historique complet : marques de titre, accidents, relevés d'odomètre et rappels ouverts. Gratuit pour les 50 États.",
    badges: [
      { icon: Globe, text: "Les 50 États" },
      { icon: Shield, text: "Conforme DPPA" },
      { icon: Clock, text: "Résultats instantanés" },
      { icon: Search, text: "Recherche gratuite" },
    ],
    whatH2: "Ce que renvoie une recherche par plaque",
    whatIntro: "La recherche plaque-vers-VIN est la première étape. Une fois le VIN identifié, tu peux obtenir l'historique complet du véhicule depuis NMVTIS, les bases de données des assureurs, les registres d'enchères et les agrégateurs d'historique de service.",
    whatItems: [
      { title: "VIN à 17 caractères", detail: "L'identifiant universel du véhicule qui déverrouille tous les registres en aval." },
      { title: "Année, marque, modèle et finition", detail: "Décodés directement depuis le VIN — fabricant, usine, type de carrosserie et moteur." },
      { title: "Marques de titre", detail: "Récupération, inondation, reconstruit, rachat loi citron, dommages de grêle et indicateurs de non-réparable." },
      { title: "Registres d'accidents et de dommages", detail: "Rapports de collision, réclamations d'assurance et divulgations de dommages structurels de NMVTIS et des assureurs." },
      { title: "Historique d'odomètre", detail: "Kilométrage à chaque transfert de titre — détecte la fraude de recul avant l'achat." },
      { title: "Chaîne de propriété", detail: "Nombre de propriétaires et États dans lesquels le véhicule a été immatriculé." },
      { title: "Statut de vol", detail: "Registres du NICB et des forces de l'ordre signalant les véhicules volés actifs ou récupérés." },
      { title: "Rappels de sécurité ouverts", detail: "Campagnes de rappel non réparées signalées par la NHTSA pouvant affecter le véhicule." },
    ],
    howH2: "Comment fonctionne la recherche VIN par plaque",
    howSteps: [
      { n: 1, title: "Saisis le numéro de plaque", body: "Tape le numéro de plaque alphanumérique exactement tel qu'il apparaît — sans espaces ni caractères spéciaux. La plupart des plaques américaines comportent 5 à 8 caractères. Les plaques personnalisées et vanity suivent leur propre format ; saisis-les exactement comme affichées." },
      { n: 2, title: "Sélectionne l'État émetteur", body: "Les plaques d'immatriculation sont émises par les États individuels, pas par le gouvernement fédéral. Les mêmes caractères de plaque peuvent exister simultanément dans plusieurs États — \"7ABC123\" est un format valide en Californie mais \"ABC1234\" est courant dans d'autres États. Sélectionner le bon État dirige la requête vers la base de données DMV correcte." },
      { n: 3, title: "Obtiens le VIN et les détails du véhicule", body: "L'outil interroge les registres d'immatriculation de l'État pour trouver le VIN à 17 caractères lié à cette plaque. Année, marque, modèle et finition sont décodés automatiquement. À partir de là, tu peux obtenir le rapport complet d'historique du véhicule en un clic." },
    ],
    stateH2: "Couverture des États — Les 50 États + DC",
    stateIntro: "Chaque État américain et le District de Columbia sont pris en charge. Sélectionne l'État émetteur dans le menu déroulant de l'outil ci-dessus pour diriger la requête vers la bonne base de données de véhicules motorisés.",
    stateGroups: [
      { region: "Nord-Est", states: ["CT", "DE", "MA", "ME", "MD", "NH", "NJ", "NY", "PA", "RI", "VT"] },
      { region: "Sud", states: ["AL", "AR", "FL", "GA", "KY", "LA", "MS", "NC", "SC", "TN", "TX", "VA", "WV"] },
      { region: "Midwest", states: ["IA", "IL", "IN", "KS", "MI", "MN", "MO", "ND", "NE", "OH", "SD", "WI"] },
      { region: "Ouest", states: ["AK", "AZ", "CA", "CO", "HI", "ID", "MT", "NM", "NV", "OR", "UT", "WA", "WY"] },
    ],
    vsH2: "Recherche par plaque vs recherche par VIN",
    plateBoxTitle: "Recherche par plaque",
    plateBoxItems: [
      { check: true, text: "Utile quand tu n'as que la plaque (rue, photo d'annonce)" },
      { check: true, text: "Vérification rapide que la plaque correspond au véhicule" },
      { check: false, text: "Peut ne renvoyer aucun résultat pour les plaques expirées, temporaires ou hors État" },
      { check: false, text: "Nécessite de connaître l'État émetteur" },
    ],
    vinBoxTitle: "Recherche directe par VIN",
    vinBoxItems: [
      "La plus fiable — le VIN est la clé universelle du véhicule",
      "Fonctionne sur toutes les bases de données sans restrictions d'État",
      "Vérifie physiquement le VIN sur le tableau de bord, le montant de portière et le compartiment moteur",
      "La meilleure pour la diligence finale avant achat",
    ],
    vsFooterPre: "Bonne pratique : commence par la recherche par plaque pour identifier rapidement le VIN, puis confirme ce VIN physiquement sur le véhicule et fais une ",
    vsFooterLink: "vérification d'historique par VIN",
    vsFooterPost: " directe pour la vérification définitive avant achat.",
    privacyH2: "Confidentialité et légal — DPPA expliqué",
    privacy1Bold: "Driver's Privacy Protection Act (DPPA) de 1994",
    privacy1Pre: "Les recherches de plaques aux États-Unis sont régies par le ",
    privacy1Post: ", une loi fédérale qui restreint l'accès aux informations personnelles dans les registres des véhicules motorisés des États. Les données personnellement identifiables — nom du propriétaire, adresse, SSN — ne peuvent pas être divulguées sans un but permis.",
    privacy2Bold: "Les buts permis",
    privacy2Post: " incluent la vérification d'achat de véhicule, les réclamations d'assurance, l'application de la loi et le soutien au litige. Notre outil est conçu pour la recherche de véhicules avant achat — un usage clairement permis — et renvoie des données du véhicule (VIN, marque, modèle, statut de titre) plutôt que des informations personnelles du propriétaire.",
    privacy3: "Nous exigeons un compte gratuit pour effectuer les recherches par plaque. C'est à la fois une mesure de conformité DPPA (nous devons pouvoir identifier qui accède aux données et à quelle fin) et une protection contre le scraping automatisé de la base de données.",
    faqH2: "Foire aux questions",
    faqs: [
      { q: "Puis-je trouver un VIN à partir d'une plaque d'immatriculation gratuitement ?", a: "Oui. Crée un compte CarCheckerVIN gratuit, saisis la plaque et l'État dans l'outil ci-dessus, et le VIN est renvoyé instantanément avec l'année, la marque et le modèle." },
      { q: "Que faire si la recherche par plaque ne renvoie aucun résultat ?", a: "Aucun résultat signifie généralement que la plaque est expirée, qu'il s'agit d'une étiquette temporaire de concessionnaire, ou que l'immatriculation n'a pas encore été indexée. Demande au vendeur le VIN à 17 caractères directement et fais une vérification VIN — c'est toujours l'approche la plus fiable pour une vérification finale avant achat." },
      { q: "Puis-je rechercher le nom du propriétaire à partir d'une plaque d'immatriculation ?", a: "Non. Le DPPA interdit de divulguer les informations personnelles du propriétaire (nom, adresse, date de naissance) au grand public sans un but permis spécifique. Notre recherche renvoie uniquement les données du véhicule — pas d'informations personnelles." },
      { q: "La recherche fonctionne-t-elle pour les plaques commerciales, de concessionnaire ou militaires ?", a: "Les plaques commerciales et de flotte fonctionnent généralement. Les étiquettes temporaires de concessionnaire, les plaques gouvernementales, diplomatiques et militaires peuvent avoir un accès restreint en raison d'exemptions de confidentialité ou de systèmes d'immatriculation distincts." },
      { q: "Quelle est la précision de la correspondance plaque-vers-VIN ?", a: "La correspondance est tirée des registres d'immatriculation du DMV de l'État et est très précise pour les véhicules de tourisme actuellement immatriculés. Les immatriculations expirées, les plaques récemment transférées ou les plaques émises au cours des derniers jours peuvent accuser un retard de 24 à 72 heures par rapport à la base de données." },
    ],
    sourcesH2: "Recherche VIN par plaque — Sources et références",
    sourcesIntro: "Les recherches de plaques aux États-Unis sont régies par la loi fédérale sur la vie privée (le Driver's Privacy Protection Act) et les règles de divulgation des DMV des États. Les agences et références ci-dessous sont les origines autoritaires de chaque affirmation sur cette page.",
    sources: [
      { href: "https://www.law.cornell.edu/uscode/text/18/2721", label: "18 U.S.C. § 2721 — Driver's Privacy Protection Act", note: "Loi fédérale restreignant la divulgation des registres personnels de véhicules motorisés." },
      { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: "Registres fédéraux de titres et marques croisés après la résolution plaque-vers-VIN." },
      { href: "https://www.nhtsa.gov/recalls", label: "NHTSA — Rappels de sécurité par VIN", note: "Recherche autoritaire de rappels une fois le VIN résolu." },
      { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: "Registres gratuits de véhicules volés et de récupération des assureurs américains." },
      { href: "https://vpic.nhtsa.dot.gov/decoder/", label: "NHTSA VIN Decoder", note: "Décodeur fédéral de référence pour la structure du VIN et les codes de fabricant." },
      { href: "https://www.ftc.gov/business-guidance/resources/dealers-guide-used-car-rule", label: "FTC — Used Car Rule (Buyer's Guide)", note: "Réglementation fédérale que les acheteurs peuvent citer quand un vendeur refuse de divulguer l'historique." },
    ],
    sourcesFoot: "La résolution plaque-vers-VIN est effectuée par rapport aux registres d'immatriculation du DMV de l'État dans le cadre de catégories à but permis conformes au DPPA. Les informations personnelles du propriétaire (nom, adresse) ne sont jamais renvoyées.",
    ctaH2: "Pas de plaque ? Cherche par VIN.",
    ctaSub: "Un VIN à 17 caractères te donne l'historique le plus précis et complet du véhicule. Trouve-le sur le tableau de bord, le montant de portière côté conducteur ou la carte d'immatriculation.",
    ctaBtn: "Fais une vérification VIN gratuite",
  },
} as const;

interface Props { locale: Locale; }

export default function LicensePlateLookupBody({ locale }: Props) {
  const c = COPY[locale];
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: c.home, href: locale === "es" ? "/es" : "/" },
              { label: c.crumb },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">{c.h1}</h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.lede}</p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-slate-600">
            {c.badges.map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
                <Icon className="w-3.5 h-3.5 text-primary-600" />
                {text}
              </span>
            ))}
          </div>

          <div className="mt-8" id="tool">
            <LicensePlateLookup locale={locale} />
          </div>

          <section id="what-you-get" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.whatH2}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">{c.whatIntro}</p>
            <ul className="space-y-3">
              {c.whatItems.map(({ title, detail }) => (
                <li key={title} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{title}</strong> — {detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section id="how-it-works" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{c.howH2}</h2>
            <ol className="space-y-6">
              {c.howSteps.map(({ n, title, body }) => (
                <li key={n} className="flex gap-4">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">
                    {n}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900">{title}</h3>
                    <p className="mt-1 text-slate-600 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="state-coverage" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">{c.stateH2}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">{c.stateIntro}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {c.stateGroups.map(({ region, states: abbrs }) => (
                <div key={region} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">{region}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {abbrs.map((a) => (
                      <span key={a} className="inline-block px-1.5 py-0.5 bg-white border border-slate-200 rounded text-xs font-mono text-slate-700">{a}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-10">
            <VinCheckBanner />
          </div>

          <section id="plate-vs-vin" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">{c.vsH2}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <Search className="w-4 h-4" /> {c.plateBoxTitle}
                </h3>
                <ul className="space-y-2 text-sm text-amber-800">
                  {c.plateBoxItems.map((item) => (
                    <li key={item.text} className="flex gap-2">
                      {item.check ? (
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                      )}
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> {c.vinBoxTitle}
                </h3>
                <ul className="space-y-2 text-sm text-emerald-800">
                  {c.vinBoxItems.map((it) => (
                    <li key={it} className="flex gap-2">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-4 text-slate-600 leading-relaxed">
              {c.vsFooterPre}
              <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{c.vsFooterLink}</Link>
              {c.vsFooterPost}
            </p>
          </section>

          <section id="privacy" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">{c.privacyH2}</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-slate-700 text-sm leading-relaxed space-y-3">
              <p>
                {c.privacy1Pre}<strong>{c.privacy1Bold}</strong>{c.privacy1Post}
              </p>
              <p>
                <strong>{c.privacy2Bold}</strong>{c.privacy2Post}
              </p>
              <p>{c.privacy3}</p>
            </div>
          </section>

          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{c.faqH2}</h2>
            <dl className="space-y-6">
              {c.faqs.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-14 py-8 px-6 sm:px-8 bg-slate-50 border border-slate-200 rounded-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.sourcesH2}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">{c.sourcesIntro}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {c.sources.map((s) => (
                <li key={s.href} className="rounded-xl border border-slate-200 bg-white p-4">
                  <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 font-semibold underline underline-offset-2 hover:text-primary-700">
                    {s.label} ↗
                  </a>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{s.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-slate-500 italic">{c.sourcesFoot}</p>
          </section>

          <div className="mt-14">
            <RelatedChecks exclude="/license-plate-lookup" />
          </div>
        </div>
      </main>

      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.ctaH2}</h2>
          <p className="text-slate-600 mb-6">{c.ctaSub}</p>
          <Link
            href={link("/vin-check")}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            {c.ctaBtn}
          </Link>
        </div>
      </section>
    </>
  );
}
