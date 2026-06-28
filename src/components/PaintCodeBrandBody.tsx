/**
 * Shared body for /paint-code-lookup/[brand] and /es/paint-code-lookup/[brand].
 * Wave 17c — 30 paint-code brand pages × 2 locales rendered from one component.
 *
 * Brand-specific factual content (primaryLocation, secondaryLocations,
 * stickerLabel, codeFormat, codePattern, examples[], tips[]) is technical
 * English OEM data — it renders verbatim on both locales (same approach
 * as LemonCheckBrandBody's handling of warranty terms). Structural
 * chrome (headings, intros, FAQs, CTAs) translates via the COPY={en,es} map.
 */

import Link from "next/link";
import {
  MapPin,
  Tag,
  Hash,
  Palette,
  Lock,
  ChevronRight,
  ArrowRight,
  Search,
  AlertCircle,
  Lightbulb,
  Brush,
  Camera,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import { PAINT_CODE_BRANDS, findBrand, type PaintCodeBrand } from "@/lib/paint-codes";
import type { Locale } from "@/i18n/config";

export function getBrandOthers(slug: string): PaintCodeBrand[] {
  const b = findBrand(slug);
  if (!b) return [];
  return PAINT_CODE_BRANDS.filter((x) => x.slug !== b.slug);
}

const COPY = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbHub: "Paint Code Lookup",
    heroBadge: (name: string) => `${name} OEM Paint Code`,
    h1: (name: string) => `Where Is the ${name} Paint Code?`,
    heroAnswerPre: (name: string) => `On a ${name}, the paint code is at the `,
    heroAnswerMid: (label: string, pattern: string) =>
      `, printed on the label marked \u201C${label}\u201D. The code follows the pattern ${pattern}. If the sticker is missing or faded, look it up by VIN below.`,
    searchHeading: (name: string) => `Get Your ${name} Paint Code by VIN`,
    searchSub:
      "Enter any 17-character VIN \u2014 we'll return the OEM paint code and factory color name from the build record.",
    trustNote: "Free \u00B7 No sign-up \u00B7 Instant result",
    whereHeading: (name: string) => `${name} Paint Code Location \u2014 Every Spot to Check`,
    whereIntro: (name: string) =>
      `${name} prints the paint code in one main spot and backs it up in a couple of others. Start at the top of this list and work down if the label is hard to read.`,
    primaryLabel: "Primary location",
    backupLabel: "Backup location",
    labelCardHeading: "What the label says",
    labelCardBody: (label: string, name: string) => (
      <>
        Look for the row marked{" "}
        <code className="font-mono text-xs bg-surface-container-low rounded px-1.5 py-0.5 text-primary">
          {label}
        </code>
        . That&apos;s the line that carries the {name} color code.
      </>
    ),
    formatCardHeading: "Code format",
    formatCardBody: (format: string, pattern: string) => (
      <>
        {format}. Pattern:{" "}
        <code className="font-mono text-xs bg-surface-container-low rounded px-1.5 py-0.5 text-primary">
          {pattern}
        </code>
        .
      </>
    ),
    examplesHeading: (name: string) => `Common ${name} Paint Codes & Color Names`,
    examplesIntro: (name: string) =>
      `A few well-known ${name} factory codes so you know what to expect on the sticker. Your exact code depends on the model year \u2014 always confirm against your own vehicle or VIN.`,
    examplesTableCode: "Paint Code",
    examplesTableColor: "Factory Color Name",
    tipsHeading: (name: string) => `${name} Paint Code Tips`,
    tipsIntro: (name: string) =>
      `The quirks worth knowing before you order paint for a ${name}.`,
    missingHeading: (name: string) => `${name} Sticker Missing or Faded? Use the VIN.`,
    missingP1: (name: string) =>
      `Door jamb stickers fade in the sun, get peeled during detailing, or disappear when a door is replaced after a collision. When the ${name} label is gone, the VIN is the reliable way back to the factory paint code.`,
    missingP2: (name: string) =>
      `Every ${name} build record carries the factory paint code, locked to the VIN at manufacture. Our free VIN check pulls that record so you can order touch-up, brief a body shop, or verify the current color matches the factory original.`,
    missingP3Pre: (name: string) =>
      `Buying a used ${name}? If the current color doesn\u2019t match the factory code, the car was repainted \u2014 worth an `,
    missingP3LinkLabel: "accident history check",
    missingP3Suffix: " to find out why.",
    missingCardHeading: (name: string) => `Look up your ${name} code by VIN`,
    missingCardBody:
      "No sticker needed \u2014 the factory code comes straight from the build record.",
    whatHeading: (name: string) => `What to Do With Your ${name} Paint Code`,
    whatIntro: "Once you have the code, here\u2019s how to put it to work.",
    touchUpHeading: "Order touch-up paint",
    touchUpBody: (name: string) =>
      `Give the code to a ${name} parts counter or a touch-up supplier. For pearl/metallic finishes, ask for the matching base + clear so the repair doesn\u2019t flatten out.`,
    saveHeading: "Save it for later",
    saveBody: (name: string) =>
      `Photograph the ${name} sticker in good light and store it with your documents. The code stays the same for the life of the car \u2014 no more trips back to the driveway.`,
    othersHeading: "Paint Code Location for Other Brands",
    fullLocatorLink: "View the full paint code locator",
    sourcesHeading: (name: string) => `${name} Paint Code \u2014 Sources & References`,
    sourcesIntro: (name: string) =>
      `${name} color codes trace back to factory build records and OEM service literature. The references below are the authoritative origins behind ${name} VIN, paint, and history data in the United States.`,
    sourceNote1: (name: string) => `Federal reference decoder for ${name} VIN structure.`,
    sourceLabel1: "NHTSA VIN Decoder",
    sourceNote2: (name: string) => `Open ${name} recall lookup by VIN.`,
    sourceLabel2: "NHTSA \u2014 Safety Recalls",
    sourceNote3: (name: string) =>
      `Federal title-brand database covering every ${name} across all 50 states.`,
    sourceLabel3: "NMVTIS \u2014 Bureau of Justice Assistance",
    sourceNote4: (name: string) =>
      `Coatings and VOC standards behind OEM ${name} paint formulations.`,
    sourceLabel4: "EPA",
    faqHeading: (name: string) => `${name} Paint Code \u2014 Frequently Asked Questions`,
    ctaBadge: "Free \u00B7 Instant \u00B7 OEM Source",
    ctaHeading: (name: string) => `Get Your ${name} Paint Code in Seconds`,
    ctaBody: (name: string) =>
      `Enter a 17-character VIN to retrieve the factory ${name} paint code and color name \u2014 for touch-up, body shop matching, or to verify a respray on a used vehicle.`,
    ctaNote: "No credit card \u00B7 No sign-up \u00B7 Free",
    faqBuilder(b: PaintCodeBrand) {
      return [
        {
          q: `Where is the paint code on a ${b.name}?`,
          a: `On a ${b.name}, the paint code is at the ${b.primaryLocation}. Look for the label marked "${b.stickerLabel}". If that sticker is faded or missing, check ${b.secondaryLocations.join(" or ").toLowerCase()}.`,
        },
        {
          q: `What does a ${b.name} paint code look like?`,
          a: `${b.codeFormat}. The typical pattern is ${b.codePattern}. For example, ${b.examples
            .slice(0, 2)
            .map((e) => `${e.code} is ${e.colorName}`)
            .join(", and ")}.`,
        },
        {
          q: `Can I find my ${b.name} paint code with just the VIN?`,
          a: `Yes. The factory paint code is recorded against the VIN in ${b.name}'s build database, so a VIN-based lookup returns the original color code even when the physical door jamb sticker is damaged, faded, or was replaced during repair. Enter your VIN in the form above.`,
        },
        {
          q: `What is the difference between the ${b.name} paint code and the color name?`,
          a: `The color name (e.g., "${b.examples[0].colorName}") is marketing copy that ${b.name} may reuse across model years with small formula changes. The paint code (${b.examples[0].code}) is tied to one specific formulation \u2014 it is what a paint supplier needs to mix an exact match.`,
        },
        {
          q: `How do I use my ${b.name} paint code for touch-up?`,
          a: `Give the code \u2014 not the color name \u2014 to any paint supplier, dealer parts counter, or body shop. They mix to the code. For pearl or tri-coat ${b.name} finishes, a single touch-up pen won't match the depth; those need a base + mid-coat + clear process.`,
        },
        {
          q: `My ${b.name} was repainted and the sticker is gone \u2014 what now?`,
          a: `Run a VIN-based paint code lookup. The factory code is locked to the VIN at manufacture, so it survives a respray or a replaced door. If the car's current color doesn't match the factory code returned, the vehicle was repainted \u2014 worth pairing with an accident history check to find out why.`,
        },
      ];
    },
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbHub: "Buscador de c\u00F3digo de pintura",
    heroBadge: (name: string) => `C\u00F3digo de pintura OEM ${name}`,
    h1: (name: string) => `\u00BFD\u00F3nde est\u00E1 el c\u00F3digo de pintura de un ${name}?`,
    heroAnswerPre: (name: string) => `En un ${name}, el c\u00F3digo de pintura est\u00E1 en el `,
    heroAnswerMid: (label: string, pattern: string) =>
      `, impreso en la etiqueta marcada \u201C${label}\u201D. El c\u00F3digo sigue el patr\u00F3n ${pattern}. Si la calcoman\u00EDa falta o est\u00E1 desvanecida, b\u00FAscalo por VIN abajo.`,
    searchHeading: (name: string) => `Obt\u00E9n tu c\u00F3digo de pintura ${name} por VIN`,
    searchSub:
      "Ingresa cualquier VIN de 17 caracteres \u2014 te devolveremos el c\u00F3digo de pintura OEM y el nombre del color de f\u00E1brica desde el registro de fabricaci\u00F3n.",
    trustNote: "Gratis \u00B7 Sin registro \u00B7 Resultado al instante",
    whereHeading: (name: string) =>
      `Ubicaci\u00F3n del c\u00F3digo de pintura ${name} \u2014 cada lugar que debes revisar`,
    whereIntro: (name: string) =>
      `${name} imprime el c\u00F3digo de pintura en un lugar principal y lo respalda en un par m\u00E1s. Empieza por arriba de la lista y baja si la etiqueta es dif\u00EDcil de leer.`,
    primaryLabel: "Ubicaci\u00F3n principal",
    backupLabel: "Ubicaci\u00F3n alterna",
    labelCardHeading: "Lo que dice la etiqueta",
    labelCardBody: (label: string, name: string) => (
      <>
        Busca la línea marcada{" "}
        <code className="font-mono text-xs bg-surface-container-low rounded px-1.5 py-0.5 text-primary">
          {label}
        </code>
        . Esa es la línea que lleva el código de color de {name}.
      </>
    ),
    formatCardHeading: "Formato del código",
    formatCardBody: (format: string, pattern: string) => (
      <>
        {format}. Patrón:{" "}
        <code className="font-mono text-xs bg-surface-container-low rounded px-1.5 py-0.5 text-primary">
          {pattern}
        </code>
        .
      </>
    ),
    examplesHeading: (name: string) =>
      `C\u00F3digos de pintura y nombres de color comunes de ${name}`,
    examplesIntro: (name: string) =>
      `Algunos c\u00F3digos de f\u00E1brica conocidos de ${name} para que sepas qu\u00E9 esperar en la calcoman\u00EDa. Tu c\u00F3digo exacto depende del a\u00F1o del modelo \u2014 siempre conf\u00EDrmalo contra tu propio veh\u00EDculo o VIN.`,
    examplesTableCode: "C\u00F3digo de pintura",
    examplesTableColor: "Nombre del color de f\u00E1brica",
    tipsHeading: (name: string) => `Consejos de c\u00F3digo de pintura ${name}`,
    tipsIntro: (name: string) =>
      `Las particularidades que vale la pena conocer antes de ordenar pintura para un ${name}.`,
    missingHeading: (name: string) =>
      `\u00BFCalcoman\u00EDa de ${name} faltante o desvanecida? Usa el VIN.`,
    missingP1: (name: string) =>
      `Las calcoman\u00EDas del marco de la puerta del conductor se desvanecen con el sol, se despegan durante el detallado o desaparecen cuando se reemplaza una puerta tras una colisi\u00F3n. Cuando la etiqueta de ${name} ya no est\u00E1, el VIN es la forma confiable de volver al c\u00F3digo de pintura de f\u00E1brica.`,
    missingP2: (name: string) =>
      `Cada registro de fabricaci\u00F3n de ${name} lleva el c\u00F3digo de pintura de f\u00E1brica, ligado al VIN al momento de manufactura. Nuestra verificaci\u00F3n VIN gratis obtiene ese registro para que puedas pedir pintura de retoque, instruir a un taller de carrocer\u00EDa o verificar que el color actual coincida con el original de f\u00E1brica.`,
    missingP3Pre: (name: string) =>
      `\u00BFCompras un ${name} usado? Si el color actual no coincide con el c\u00F3digo de f\u00E1brica, el auto fue repintado \u2014 vale la pena una `,
    missingP3LinkLabel: "verificaci\u00F3n de historial de accidentes",
    missingP3Suffix: " para averiguar por qu\u00E9.",
    missingCardHeading: (name: string) => `Busca tu c\u00F3digo ${name} por VIN`,
    missingCardBody:
      "No se necesita calcoman\u00EDa \u2014 el c\u00F3digo de f\u00E1brica viene directo del registro de fabricaci\u00F3n.",
    whatHeading: (name: string) => `Qu\u00E9 hacer con tu c\u00F3digo de pintura ${name}`,
    whatIntro: "Una vez que tengas el c\u00F3digo, as\u00ED es como ponerlo a trabajar.",
    touchUpHeading: "Ordena pintura de retoque",
    touchUpBody: (name: string) =>
      `Dale el c\u00F3digo a un mostrador de partes ${name} o a un proveedor de pintura de retoque. Para acabados perla/metalizados, pide la base + capa transparente que coincida para que la reparaci\u00F3n no quede plana.`,
    saveHeading: "Gu\u00E1rdalo para despu\u00E9s",
    saveBody: (name: string) =>
      `Fotograf\u00EDa la calcoman\u00EDa de ${name} con buena luz y gu\u00E1rdala con tus documentos. El c\u00F3digo permanece igual durante toda la vida del auto \u2014 no m\u00E1s viajes de regreso a la cochera.`,
    othersHeading: "Ubicaci\u00F3n del c\u00F3digo de pintura para otras marcas",
    fullLocatorLink: "Ver el buscador completo de c\u00F3digos de pintura",
    sourcesHeading: (name: string) => `C\u00F3digo de pintura ${name} \u2014 Fuentes y referencias`,
    sourcesIntro: (name: string) =>
      `Los c\u00F3digos de color de ${name} se remontan a los registros de fabricaci\u00F3n y a la literatura de servicio OEM. Las referencias siguientes son los or\u00EDgenes autorizados detr\u00E1s de los datos de VIN, pintura e historial de ${name} en los Estados Unidos.`,
    sourceNote1: (name: string) =>
      `Decodificador federal de referencia para la estructura del VIN de ${name}.`,
    sourceLabel1: "Decodificador VIN NHTSA",
    sourceNote2: (name: string) => `B\u00FAsqueda abierta de retiros (recalls) de ${name} por VIN.`,
    sourceLabel2: "NHTSA \u2014 Retiros de seguridad",
    sourceNote3: (name: string) =>
      `Base de datos federal de marcas de t\u00EDtulo que cubre cada ${name} en los 50 estados.`,
    sourceLabel3: "NMVTIS \u2014 Bureau of Justice Assistance",
    sourceNote4: (name: string) =>
      `Est\u00E1ndares de recubrimientos y COV detr\u00E1s de las formulaciones de pintura OEM de ${name}.`,
    sourceLabel4: "EPA",
    faqHeading: (name: string) => `C\u00F3digo de pintura ${name} \u2014 Preguntas frecuentes`,
    ctaBadge: "Gratis \u00B7 Instant\u00E1neo \u00B7 Fuente OEM",
    ctaHeading: (name: string) => `Obt\u00E9n tu c\u00F3digo de pintura ${name} en segundos`,
    ctaBody: (name: string) =>
      `Ingresa un VIN de 17 caracteres para obtener el c\u00F3digo de pintura de f\u00E1brica y el nombre del color de ${name} \u2014 para retoque, coincidencia en taller de carrocer\u00EDa o para verificar un repintado en un veh\u00EDculo usado.`,
    ctaNote: "Sin tarjeta \u00B7 Sin registro \u00B7 Gratis",
    faqBuilder(b: PaintCodeBrand) {
      return [
        {
          q: `\u00BFD\u00F3nde est\u00E1 el c\u00F3digo de pintura en un ${b.name}?`,
          a: `En un ${b.name}, el c\u00F3digo de pintura est\u00E1 en el ${b.primaryLocation}. Busca la etiqueta marcada "${b.stickerLabel}". Si esa calcoman\u00EDa est\u00E1 desvanecida o falta, revisa ${b.secondaryLocations.join(" o ").toLowerCase()}.`,
        },
        {
          q: `\u00BFC\u00F3mo se ve un c\u00F3digo de pintura ${b.name}?`,
          a: `${b.codeFormat}. El patr\u00F3n t\u00EDpico es ${b.codePattern}. Por ejemplo, ${b.examples
            .slice(0, 2)
            .map((e) => `${e.code} es ${e.colorName}`)
            .join(", y ")}.`,
        },
        {
          q: `\u00BFPuedo encontrar mi c\u00F3digo de pintura ${b.name} solo con el VIN?`,
          a: `S\u00ED. El c\u00F3digo de pintura de f\u00E1brica est\u00E1 registrado contra el VIN en la base de datos de fabricaci\u00F3n de ${b.name}, as\u00ED que una b\u00FAsqueda basada en VIN devuelve el c\u00F3digo de color original incluso cuando la calcoman\u00EDa f\u00EDsica del marco de la puerta est\u00E1 da\u00F1ada, desvanecida o fue reemplazada durante una reparaci\u00F3n. Ingresa tu VIN en el formulario de arriba.`,
        },
        {
          q: `\u00BFCu\u00E1l es la diferencia entre el c\u00F3digo de pintura ${b.name} y el nombre del color?`,
          a: `El nombre del color (p. ej., "${b.examples[0].colorName}") es texto de marketing que ${b.name} puede reutilizar a lo largo de los a\u00F1os modelo con peque\u00F1os cambios de f\u00F3rmula. El c\u00F3digo de pintura (${b.examples[0].code}) est\u00E1 ligado a una formulaci\u00F3n espec\u00EDfica \u2014 es lo que un proveedor de pintura necesita para mezclar una coincidencia exacta.`,
        },
        {
          q: `\u00BFC\u00F3mo uso mi c\u00F3digo de pintura ${b.name} para retoque?`,
          a: `Dale el c\u00F3digo \u2014 no el nombre del color \u2014 a cualquier proveedor de pintura, mostrador de partes del concesionario o taller de carrocer\u00EDa. Ellos mezclan al c\u00F3digo. Para acabados perla o de tres capas de ${b.name}, un solo bol\u00EDgrafo de retoque no coincidir\u00E1 con la profundidad; esos necesitan un proceso de base + capa media + transparente.`,
        },
        {
          q: `Mi ${b.name} fue repintado y la calcoman\u00EDa ya no est\u00E1 \u2014 \u00BFqu\u00E9 hago?`,
          a: `Ejecuta una b\u00FAsqueda de c\u00F3digo de pintura basada en VIN. El c\u00F3digo de f\u00E1brica est\u00E1 ligado al VIN al momento de manufactura, as\u00ED que sobrevive a un repintado o a una puerta reemplazada. Si el color actual del auto no coincide con el c\u00F3digo de f\u00E1brica devuelto, el veh\u00EDculo fue repintado \u2014 vale la pena combinarlo con una verificaci\u00F3n de historial de accidentes para averiguar por qu\u00E9.`,
        },
      ];
    },
  },
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbHub: "Recherche de code peinture",
    heroBadge: (name: string) => `Code peinture OEM ${name}`,
    h1: (name: string) => `O\u00F9 se trouve le code peinture d'une ${name} ?`,
    heroAnswerPre: (name: string) => `Sur une ${name}, le code peinture se trouve sur le `,
    heroAnswerMid: (label: string, pattern: string) =>
      `, imprim\u00E9 sur l'\u00E9tiquette marqu\u00E9e \u201C${label}\u201D. Le code suit le sch\u00E9ma ${pattern}. Si l'autocollant manque ou est d\u00E9color\u00E9, recherche-le par VIN ci-dessous.`,
    searchHeading: (name: string) => `Obtiens ton code peinture ${name} par VIN`,
    searchSub:
      "Saisis n'importe quel VIN de 17 caract\u00E8res \u2014 nous te renverrons le code peinture OEM et le nom de couleur d'usine depuis le dossier de fabrication.",
    trustNote: "Gratuit \u00B7 Sans inscription \u00B7 R\u00E9sultat instantan\u00E9",
    whereHeading: (name: string) => `Emplacement du code peinture ${name} \u2014 chaque endroit \u00E0 v\u00E9rifier`,
    whereIntro: (name: string) =>
      `${name} imprime le code peinture \u00E0 un endroit principal et le sauvegarde \u00E0 quelques autres. Commence par le haut de cette liste et descends si l'\u00E9tiquette est difficile \u00E0 lire.`,
    primaryLabel: "Emplacement principal",
    backupLabel: "Emplacement secondaire",
    labelCardHeading: "Ce que dit l'\u00E9tiquette",
    labelCardBody: (label: string, name: string) => (
      <>
        Cherche la ligne marquée{" "}
        <code className="font-mono text-xs bg-surface-container-low rounded px-1.5 py-0.5 text-primary">
          {label}
        </code>
        . C&apos;est la ligne qui porte le code couleur {name}.
      </>
    ),
    formatCardHeading: "Format du code",
    formatCardBody: (format: string, pattern: string) => (
      <>
        {format}. Schéma :{" "}
        <code className="font-mono text-xs bg-surface-container-low rounded px-1.5 py-0.5 text-primary">
          {pattern}
        </code>
        .
      </>
    ),
    examplesHeading: (name: string) => `Codes peinture et noms de couleur ${name} courants`,
    examplesIntro: (name: string) =>
      `Quelques codes d'usine ${name} bien connus pour que tu saches \u00E0 quoi t'attendre sur l'autocollant. Ton code exact d\u00E9pend de l'ann\u00E9e mod\u00E8le \u2014 confirme toujours sur ton propre v\u00E9hicule ou VIN.`,
    examplesTableCode: "Code peinture",
    examplesTableColor: "Nom de couleur d'usine",
    tipsHeading: (name: string) => `Conseils code peinture ${name}`,
    tipsIntro: (name: string) =>
      `Les particularit\u00E9s \u00E0 conna\u00EEtre avant de commander de la peinture pour une ${name}.`,
    missingHeading: (name: string) => `Autocollant ${name} manquant ou d\u00E9color\u00E9 ? Utilise le VIN.`,
    missingP1: (name: string) =>
      `Les autocollants du montant de porte se d\u00E9colorent au soleil, se d\u00E9collent lors du d\u00E9tailing, ou disparaissent quand une porte est remplac\u00E9e apr\u00E8s une collision. Quand l'\u00E9tiquette ${name} a disparu, le VIN est le moyen fiable de retrouver le code peinture d'usine.`,
    missingP2: (name: string) =>
      `Chaque dossier de fabrication ${name} porte le code peinture d'usine, li\u00E9 au VIN au moment de la production. Notre v\u00E9rification VIN gratuite r\u00E9cup\u00E8re ce dossier pour que tu puisses commander de la retouche, briefer un carrossier ou v\u00E9rifier que la couleur actuelle correspond \u00E0 l'originale d'usine.`,
    missingP3Pre: (name: string) =>
      `Tu ach\u00E8tes une ${name} d'occasion ? Si la couleur actuelle ne correspond pas au code d'usine, le v\u00E9hicule a \u00E9t\u00E9 repeint \u2014 cela vaut une `,
    missingP3LinkLabel: "v\u00E9rification de l'historique d'accidents",
    missingP3Suffix: " pour en conna\u00EEtre la raison.",
    missingCardHeading: (name: string) => `Cherche ton code ${name} par VIN`,
    missingCardBody:
      "Pas besoin d'autocollant \u2014 le code d'usine vient directement du dossier de fabrication.",
    whatHeading: (name: string) => `Quoi faire avec ton code peinture ${name}`,
    whatIntro: "Une fois que tu as le code, voici comment l'exploiter.",
    touchUpHeading: "Commande de la peinture de retouche",
    touchUpBody: (name: string) =>
      `Donne le code \u00E0 un comptoir de pi\u00E8ces ${name} ou \u00E0 un fournisseur de retouche. Pour les finitions nacr\u00E9es/m\u00E9tallis\u00E9es, demande la base + le vernis correspondants pour que la r\u00E9paration ne soit pas terne.`,
    saveHeading: "Garde-le pour plus tard",
    saveBody: (name: string) =>
      `Photographie l'autocollant ${name} en bonne lumi\u00E8re et range-le avec tes documents. Le code reste le m\u00EAme pendant toute la vie de la voiture \u2014 plus d'allers-retours dans l'all\u00E9e.`,
    othersHeading: "Emplacement du code peinture pour d'autres marques",
    fullLocatorLink: "Voir le localisateur complet de codes peinture",
    sourcesHeading: (name: string) => `Code peinture ${name} \u2014 Sources et r\u00E9f\u00E9rences`,
    sourcesIntro: (name: string) =>
      `Les codes couleur ${name} remontent aux dossiers de fabrication d'usine et \u00E0 la litt\u00E9rature de service OEM. Les r\u00E9f\u00E9rences ci-dessous sont les origines autoris\u00E9es derri\u00E8re les donn\u00E9es VIN, peinture et historique ${name} aux \u00C9tats-Unis.`,
    sourceNote1: (name: string) => `D\u00E9codeur f\u00E9d\u00E9ral de r\u00E9f\u00E9rence pour la structure du VIN ${name}.`,
    sourceLabel1: "D\u00E9codeur VIN NHTSA",
    sourceNote2: (name: string) => `Recherche ouverte des rappels ${name} par VIN.`,
    sourceLabel2: "NHTSA \u2014 Rappels de s\u00E9curit\u00E9",
    sourceNote3: (name: string) =>
      `Base de donn\u00E9es f\u00E9d\u00E9rale des marques de titre couvrant chaque ${name} dans les 50 \u00E9tats.`,
    sourceLabel3: "NMVTIS \u2014 Bureau of Justice Assistance",
    sourceNote4: (name: string) =>
      `Normes de rev\u00EAtements et COV derri\u00E8re les formulations de peinture OEM ${name}.`,
    sourceLabel4: "EPA",
    faqHeading: (name: string) => `Code peinture ${name} \u2014 Questions fr\u00E9quentes`,
    ctaBadge: "Gratuit \u00B7 Instantan\u00E9 \u00B7 Source OEM",
    ctaHeading: (name: string) => `Obtiens ton code peinture ${name} en quelques secondes`,
    ctaBody: (name: string) =>
      `Saisis un VIN de 17 caract\u00E8res pour r\u00E9cup\u00E9rer le code peinture d'usine et le nom de couleur ${name} \u2014 pour la retouche, la correspondance en carrosserie ou pour v\u00E9rifier une repeinte sur un v\u00E9hicule d'occasion.`,
    ctaNote: "Sans carte \u00B7 Sans inscription \u00B7 Gratuit",
    faqBuilder(b: PaintCodeBrand) {
      return [
        {
          q: `O\u00F9 se trouve le code peinture sur une ${b.name} ?`,
          a: `Sur une ${b.name}, le code peinture se trouve sur le ${b.primaryLocation}. Cherche l'\u00E9tiquette marqu\u00E9e "${b.stickerLabel}". Si cet autocollant est d\u00E9color\u00E9 ou manquant, v\u00E9rifie ${b.secondaryLocations.join(" ou ").toLowerCase()}.`,
        },
        {
          q: `\u00C0 quoi ressemble un code peinture ${b.name} ?`,
          a: `${b.codeFormat}. Le sch\u00E9ma typique est ${b.codePattern}. Par exemple, ${b.examples
            .slice(0, 2)
            .map((e) => `${e.code} est ${e.colorName}`)
            .join(", et ")}.`,
        },
        {
          q: `Puis-je trouver mon code peinture ${b.name} avec le VIN uniquement ?`,
          a: `Oui. Le code peinture d'usine est enregistr\u00E9 contre le VIN dans la base de donn\u00E9es de fabrication ${b.name}, donc une recherche bas\u00E9e sur le VIN renvoie le code couleur original m\u00EAme quand l'autocollant physique du montant de porte est endommag\u00E9, d\u00E9color\u00E9 ou a \u00E9t\u00E9 remplac\u00E9 lors d'une r\u00E9paration. Saisis ton VIN dans le formulaire ci-dessus.`,
        },
        {
          q: `Quelle est la diff\u00E9rence entre le code peinture ${b.name} et le nom de la couleur ?`,
          a: `Le nom de couleur (par ex. "${b.examples[0].colorName}") est du texte marketing que ${b.name} peut r\u00E9utiliser sur plusieurs ann\u00E9es mod\u00E8les avec de petits changements de formule. Le code peinture (${b.examples[0].code}) est li\u00E9 \u00E0 une formulation sp\u00E9cifique \u2014 c'est ce dont un fournisseur de peinture a besoin pour m\u00E9langer une correspondance exacte.`,
        },
        {
          q: `Comment utiliser mon code peinture ${b.name} pour la retouche ?`,
          a: `Donne le code \u2014 pas le nom de la couleur \u2014 \u00E0 tout fournisseur de peinture, comptoir de pi\u00E8ces de concessionnaire ou carrossier. Ils m\u00E9langent selon le code. Pour les finitions nacr\u00E9es ou tri-couches ${b.name}, un seul stylo de retouche ne correspondra pas \u00E0 la profondeur ; celles-ci n\u00E9cessitent un proc\u00E9d\u00E9 base + couche interm\u00E9diaire + vernis.`,
        },
        {
          q: `Ma ${b.name} a \u00E9t\u00E9 repeinte et l'autocollant a disparu \u2014 que faire ?`,
          a: `Lance une recherche de code peinture bas\u00E9e sur le VIN. Le code d'usine est li\u00E9 au VIN au moment de la fabrication, donc il survit \u00E0 une repeinte ou \u00E0 une porte remplac\u00E9e. Si la couleur actuelle de la voiture ne correspond pas au code d'usine renvoy\u00E9, le v\u00E9hicule a \u00E9t\u00E9 repeint \u2014 cela vaut la peine de combiner avec une v\u00E9rification de l'historique d'accidents pour en conna\u00EEtre la raison.`,
        },
      ];
    },
  },
} as const;

export default function PaintCodeBrandBody({
  brandSlug,
  locale = "en",
}: {
  brandSlug: string;
  locale?: Locale;
}) {
  const brand = findBrand(brandSlug);
  if (!brand) return null;

  const copy = COPY[locale];
  const homeHref = locale === "es" ? "/es" : "/";
  const hubHref = locale === "es" ? "/es/codigo-de-pintura" : "/paint-code-lookup";
  const brandBaseHref =
    locale === "es" ? "/es/paint-code-lookup" : "/paint-code-lookup";
  const accidentHref =
    locale === "es" ? "/es/historial-accidentes" : "/accident-history-check";

  const allLocations = [brand.primaryLocation, ...brand.secondaryLocations];
  const otherBrands = getBrandOthers(brandSlug);
  const faqs = copy.faqBuilder(brand);

  const SOURCES = [
    {
      href: "https://vpic.nhtsa.dot.gov/decoder/",
      label: copy.sourceLabel1,
      note: copy.sourceNote1(brand.name),
    },
    {
      href: "https://www.nhtsa.gov/recalls",
      label: copy.sourceLabel2,
      note: copy.sourceNote2(brand.name),
    },
    {
      href: "https://vehiclehistory.bja.ojp.gov/",
      label: copy.sourceLabel3,
      note: copy.sourceNote3(brand.name),
    },
    {
      href: "https://www.epa.gov/",
      label: copy.sourceLabel4,
      note: copy.sourceNote4(brand.name),
    },
  ];

  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-18">
          <Breadcrumbs
            onDark
            items={[
              { label: copy.breadcrumbHome, href: homeHref },
              { label: copy.breadcrumbHub, href: hubHref },
              { label: brand.name },
            ]}
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Palette className="w-4 h-4" /> {copy.heroBadge(brand.name)}
          </div>

          <h1 className="text-3xl sm:text-5xl font-headline font-extrabold leading-tight mb-4">
            {copy.h1(brand.name)}
          </h1>

          <p className="speakable-answer text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {copy.heroAnswerPre(brand.name)}
            <strong className="text-white">{brand.primaryLocation}</strong>
            {copy.heroAnswerMid(brand.stickerLabel, brand.codePattern)}
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              {copy.searchHeading(brand.name)}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{copy.searchSub}</p>
            <VinSearchForm size="lg" locale={locale} />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {copy.trustNote}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Where to find it */}
        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {copy.whereHeading(brand.name)}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
            {copy.whereIntro(brand.name)}
          </p>
          <ol className="space-y-3">
            {allLocations.map((loc, i) => (
              <li
                key={loc}
                className="flex gap-4 items-start rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
              >
                <div
                  className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black ${
                    i === 0 ? "bg-primary text-white" : "bg-primary/10 text-primary"
                  }`}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-[11px] font-black uppercase tracking-wider text-primary/70">
                      {i === 0 ? copy.primaryLabel : copy.backupLabel}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-on-surface font-medium leading-relaxed">
                    {loc}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-outline-variant bg-surface p-5">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-headline font-extrabold text-primary">
                  {copy.labelCardHeading}
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {copy.labelCardBody(brand.stickerLabel, brand.name)}
              </p>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface p-5">
              <div className="flex items-center gap-2 mb-2">
                <Hash className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-headline font-extrabold text-primary">
                  {copy.formatCardHeading}
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {copy.formatCardBody(brand.codeFormat, brand.codePattern)}
              </p>
            </div>
          </div>
        </section>

        {/* Example codes */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {copy.examplesHeading(brand.name)}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
            {copy.examplesIntro(brand.name)}
          </p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant">
            <table className="w-full border-collapse min-w-[420px] text-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">
                    {copy.examplesTableCode}
                  </th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">
                    {copy.examplesTableColor}
                  </th>
                </tr>
              </thead>
              <tbody>
                {brand.examples.map((ex) => (
                  <tr key={ex.code} className="border-t border-outline-variant/60">
                    <td className="p-4">
                      <code className="font-mono text-sm bg-surface-container-low rounded px-2 py-1 text-primary font-bold tracking-wider">
                        {ex.code}
                      </code>
                    </td>
                    <td className="p-4 text-on-surface font-medium">{ex.colorName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Brand-specific tips */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {copy.tipsHeading(brand.name)}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
            {copy.tipsIntro(brand.name)}
          </p>
          <div className="space-y-3">
            {brand.tips.map((tip) => (
              <div
                key={tip}
                className="flex gap-3 items-start rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
              >
                <div className="w-9 h-9 rounded-xl bg-secondary-container/50 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-on-secondary-container" />
                </div>
                <p className="text-sm text-on-surface leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sticker missing → VIN */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            {copy.missingHeading(brand.name)}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{copy.missingP1(brand.name)}</p>
              <p>{copy.missingP2(brand.name)}</p>
              <p>
                {copy.missingP3Pre(brand.name)}
                <Link
                  href={accidentHref}
                  className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                >
                  {copy.missingP3LinkLabel}
                </Link>
                {copy.missingP3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">
                  {copy.missingCardHeading(brand.name)}
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant mb-4">{copy.missingCardBody}</p>
              <div className="rounded-xl bg-white p-4 border border-outline-variant">
                <VinSearchForm size="sm" locale={locale} />
              </div>
            </div>
          </div>
        </section>

        {/* What to do with the code */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {copy.whatHeading(brand.name)}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
            {copy.whatIntro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Brush className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">
                {copy.touchUpHeading}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {copy.touchUpBody(brand.name)}
              </p>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Camera className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">
                {copy.saveHeading}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {copy.saveBody(brand.name)}
              </p>
            </div>
          </div>
        </section>

        {/* Other brands */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-6">
            {copy.othersHeading}
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherBrands.map((b) => (
              <Link
                key={b.slug}
                href={`${brandBaseHref}/${b.slug}`}
                className="px-4 py-2 bg-surface text-on-surface text-sm rounded-xl border border-outline-variant hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all font-medium"
              >
                {b.name}
              </Link>
            ))}
          </div>
          <Link
            href={hubHref}
            className="inline-flex items-center gap-1.5 mt-6 text-primary font-semibold text-sm hover:text-primary/80 transition-colors"
          >
            {copy.fullLocatorLink} <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Sources & References */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-3">
            {copy.sourcesHeading(brand.name)}
          </h2>
          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed max-w-3xl">
            {copy.sourcesIntro(brand.name)}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {SOURCES.map((s) => (
              <li
                key={s.href}
                className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
              >
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                >
                  {s.label} {"\u2197"}
                </a>
                <p className="mt-1.5 text-xs text-on-surface-variant leading-relaxed">{s.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-8">
            {copy.faqHeading(brand.name)}
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">
                    {f.q}
                  </span>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Search className="w-3.5 h-3.5" /> {copy.ctaBadge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            {copy.ctaHeading(brand.name)}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            {copy.ctaBody(brand.name)}
          </p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" locale={locale} />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <ChevronRight className="w-3.5 h-3.5 text-primary" />
            {copy.ctaNote}
          </div>
        </section>

        <RelatedChecks exclude="/paint-code-lookup" />
      </div>
    </article>
  );
}
