/**
 * Shared body for /guides/free-vin-check and /es/guides/free-vin-check.
 * Wave 18.18 (batch 2) — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import { Check, X } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    crumbHome: "Home",
    crumbGuides: "Guides",
    crumbFree: "Free VIN Check",
    h1: "Free VIN Check",
    lede: (
      <>
        A free VIN check lets you decode any 17-character Vehicle
        Identification Number to instantly see the vehicle&rsquo;s make,
        model, year, engine, and basic specifications at no cost. Whether
        you are buying, selling, or simply curious, running a VIN check is
        the smartest first step.
      </>
    ),
    formHeading: "Run a Free VIN Check Now",

    h2Why: "Why You Should Always Check a VIN Before Buying",
    why1: (
      <>
        A VIN check is the fastest way to verify that a vehicle is what the
        seller claims it to be. In a matter of seconds you can confirm the
        model year, engine size, drivetrain, and body style without relying
        on the seller&rsquo;s word alone.
      </>
    ),
    why2: (
      <>
        Title fraud, odometer rollback, and undisclosed accident damage
        remain significant problems in the used car market. The Federal
        Trade Commission estimates that odometer fraud alone costs American
        consumers over a billion dollars per year. A VIN check is your first
        line of defense against these risks because every title event,
        recall, and specification is linked to the VIN.
      </>
    ),
    why3: (
      <>
        Even if you trust the seller, running a free VIN decode takes less
        than 60 seconds and can save you thousands. It confirms that the
        advertised trim level, engine, and features actually match the
        factory build data for that specific VIN.
      </>
    ),

    h2Includes: "What Does a Free VIN Check Include?",
    includesIntro: (
      <>
        Our free VIN decoder provides the core specifications for any
        vehicle manufactured from 1981 onward. When you enter a VIN, you
        instantly receive:
      </>
    ),
    includesItems: [
      {
        bold: "Year, make, and model",
        rest: (
          <> &mdash; verified directly from the VIN, not the seller&rsquo;s listing.</>
        ),
      },
      {
        bold: "Engine specifications",
        rest: (
          <> &mdash; including displacement, cylinder count, fuel type, and horsepower.</>
        ),
      },
      {
        bold: "Transmission type",
        rest: <> &mdash; automatic, manual, CVT, or dual-clutch.</>,
      },
      {
        bold: "Body style and drivetrain",
        rest: <> &mdash; sedan, SUV, truck, coupe, FWD, AWD, RWD, or 4WD.</>,
      },
      {
        bold: "Country of manufacture",
        rest: (
          <> &mdash; where the vehicle was actually built, not just the brand&rsquo;s country of origin.</>
        ),
      },
    ],
    includesOutroPre: "This information is decoded directly from the ",
    includesLinkLabel: "17-character VIN structure",
    includesOutroPost:
      " and verified against manufacturer databases. There is no account required and no limit on the number of free checks you can run.",

    h2Compare: "Free VIN Check vs. Premium Report",
    compareIntro: (
      <>
        A free VIN check gives you the factory-build essentials. For buyers
        who need the complete picture before committing to a purchase, the
        premium report adds deep data including equipment lists, real
        photos, market values, and comparable listings. Here is a
        side-by-side comparison:
      </>
    ),
    tableFeature: "Feature",
    tableFree: "Free",
    tablePremium: "Premium",
    comparisonRows: [
      { feature: "Make, model, and year", free: true, premium: true },
      { feature: "Engine and transmission specs", free: true, premium: true },
      { feature: "Country of manufacture", free: true, premium: true },
      { feature: "Body style and drivetrain", free: true, premium: true },
      { feature: "Full factory equipment list", free: false, premium: true },
      { feature: "Real vehicle photos", free: false, premium: true },
      { feature: "Market value estimates", free: false, premium: true },
      { feature: "Comparable dealer listings", free: false, premium: true },
      { feature: "Recall information", free: false, premium: true },
      { feature: "Detailed trim and options", free: false, premium: true },
    ],
    comparePrice: (
      <>
        Premium reports start at just $14.99 &mdash; a fraction of what major
        competitors charge.
      </>
    ),

    h2Enough: "When Is a Free VIN Check Enough?",
    enough1: (
      <>
        A free VIN check is ideal for initial screening. If you are browsing
        online listings and want to quickly verify that a vehicle matches
        its description, the free decode gives you instant confirmation of
        the year, engine, and body style. It is also useful for checking
        your own vehicle specs, looking up parts compatibility, or verifying
        information on a registration document.
      </>
    ),
    enough2: (
      <>
        However, if you are seriously considering purchasing a vehicle, a
        premium report provides critical additional information. Equipment
        lists help you verify which factory options are installed. Market
        value data shows whether the asking price is fair. Real vehicle
        photos (when available) let you compare the current condition with
        historical images.
      </>
    ),

    h2How: "How to Run a Free VIN Check",
    howIntro: "Running a free VIN check on CarCheckerVIN takes three simple steps:",
    howStep1Bold: "Find the VIN.",
    howStep1RestPre:
      " Look on the dashboard through the windshield, on the driver-side door jamb sticker, or on the vehicle registration card. Need help locating it? See our ",
    howStep1LinkLabel: "guide to VIN locations",
    howStep1RestPost: ".",
    howStep2Bold: "Enter the VIN.",
    howStep2RestPre:
      " Type or paste the 17-character VIN into the search box above or on our ",
    howStep2LinkLabel: "home page",
    howStep2RestPost: ".",
    howStep3Bold: "Review the results.",
    howStep3Rest: (
      <>
        {" "}Your free report appears in seconds with the vehicle&rsquo;s core
        specifications. From there you can upgrade to a premium report if
        you need the full picture.
      </>
    ),

    h2Scams: "Avoid VIN Check Scams",
    scamsIntro: (
      <>
        Not all free VIN check services are created equal. Some sites
        advertise &ldquo;free&rdquo; reports but require a credit card,
        subscribe you to recurring charges, or provide outdated data. When
        choosing a VIN check provider, look for the following:
      </>
    ),
    scamsItems: [
      "No credit card required for basic decoding.",
      "Transparent pricing for premium reports with no hidden fees.",
      "Data sourced from verified databases such as NMVTIS and manufacturer records.",
      "Instant results without requiring account creation.",
    ],
    scamsOutro: (
      <>
        CarCheckerVIN meets all of these criteria. Our free VIN decode is
        genuinely free with no strings attached, and our premium reports are
        priced clearly at $14.99 with no subscriptions or auto-renewals.
      </>
    ),

    h2Sellers: "Free VIN Checks for Sellers",
    sellersPre: "Sellers benefit from VIN checks too. Including a ",
    sellersLinkLabel: "VIN check report",
    sellersPost: (
      <>
        {" "}in your listing demonstrates transparency and builds buyer
        confidence. It verifies the specs you have listed, confirms the
        vehicle history, and can help justify your asking price. Listings
        with VIN reports tend to receive more inquiries and sell faster
        because buyers feel more comfortable making an offer when they can
        verify the details independently.
      </>
    ),

    h2Faq: "Frequently Asked Questions",
    faqIntro:
      "The most common questions about running a free VIN check, what it includes, and which free tools are genuinely free.",

    ctaHeading: "Check Any VIN for Free",
    ctaSub: "Enter a 17-character VIN to get your free vehicle report instantly.",
  },
  es: {
    crumbHome: "Inicio",
    crumbGuides: "Guías",
    crumbFree: "Verificación VIN gratis",
    h1: "Verificación VIN gratis",
    lede: (
      <>
        Una verificación VIN gratis te permite decodificar cualquier Número
        de Identificación Vehicular de 17 caracteres para ver al instante la
        marca, modelo, año, motor y especificaciones básicas del vehículo —
        sin costo. Ya sea que estés comprando, vendiendo o simplemente
        curioseando, hacer una verificación VIN es el primer paso más
        inteligente.
      </>
    ),
    formHeading: "Haz una verificación VIN gratis ahora",

    h2Why: "Por qué siempre debes verificar un VIN antes de comprar",
    why1: (
      <>
        Una verificación VIN es la forma más rápida de comprobar que un
        vehículo es lo que el vendedor afirma. En cuestión de segundos
        puedes confirmar el año del modelo, el tamaño del motor, la
        tracción y el tipo de carrocería sin depender únicamente de la
        palabra del vendedor.
      </>
    ),
    why2: (
      <>
        El fraude de título, la alteración del odómetro y los daños por
        accidente no declarados siguen siendo problemas importantes en el
        mercado de autos usados. La Comisión Federal de Comercio estima que
        solo el fraude de odómetro le cuesta a los consumidores
        estadounidenses más de mil millones de dólares al año. Una
        verificación VIN es tu primera línea de defensa contra estos
        riesgos porque cada evento de título, retiro y especificación está
        vinculado al VIN.
      </>
    ),
    why3: (
      <>
        Incluso si confías en el vendedor, hacer una decodificación VIN
        gratis toma menos de 60 segundos y puede ahorrarte miles. Confirma
        que la versión, el motor y las características anunciadas
        realmente coinciden con los datos de fabricación de ese VIN
        específico.
      </>
    ),

    h2Includes: "¿Qué incluye una verificación VIN gratis?",
    includesIntro: (
      <>
        Nuestro decodificador VIN gratis ofrece las especificaciones
        principales de cualquier vehículo fabricado desde 1981 en adelante.
        Cuando ingresas un VIN, recibes al instante:
      </>
    ),
    includesItems: [
      {
        bold: "Año, marca y modelo",
        rest: (
          <> &mdash; verificados directamente desde el VIN, no desde el anuncio del vendedor.</>
        ),
      },
      {
        bold: "Especificaciones del motor",
        rest: (
          <> &mdash; incluyendo cilindrada, número de cilindros, tipo de combustible y caballos de fuerza.</>
        ),
      },
      {
        bold: "Tipo de transmisión",
        rest: <> &mdash; automática, manual, CVT o doble embrague.</>,
      },
      {
        bold: "Tipo de carrocería y tracción",
        rest: <> &mdash; sedán, SUV, camioneta, coupé, FWD, AWD, RWD o 4WD.</>,
      },
      {
        bold: "País de fabricación",
        rest: (
          <> &mdash; dónde se fabricó realmente el vehículo, no solo el país de origen de la marca.</>
        ),
      },
    ],
    includesOutroPre: "Esta información se decodifica directamente desde la ",
    includesLinkLabel: "estructura del VIN de 17 caracteres",
    includesOutroPost:
      " y se verifica contra bases de datos del fabricante. No se requiere cuenta y no hay límite en la cantidad de verificaciones gratis que puedes hacer.",

    h2Compare: "Verificación VIN gratis vs. Reporte premium",
    compareIntro: (
      <>
        Una verificación VIN gratis te da lo esencial de la fabricación.
        Para compradores que necesitan el panorama completo antes de
        comprometerse con una compra, el reporte premium agrega datos
        profundos incluyendo listas de equipamiento, fotos reales, valores
        de mercado y anuncios comparables. Aquí hay una comparación
        lado a lado:
      </>
    ),
    tableFeature: "Característica",
    tableFree: "Gratis",
    tablePremium: "Premium",
    comparisonRows: [
      { feature: "Marca, modelo y año", free: true, premium: true },
      { feature: "Especificaciones del motor y transmisión", free: true, premium: true },
      { feature: "País de fabricación", free: true, premium: true },
      { feature: "Tipo de carrocería y tracción", free: true, premium: true },
      { feature: "Lista completa de equipamiento de fábrica", free: false, premium: true },
      { feature: "Fotos reales del vehículo", free: false, premium: true },
      { feature: "Estimaciones de valor de mercado", free: false, premium: true },
      { feature: "Anuncios comparables de concesionarios", free: false, premium: true },
      { feature: "Información de retiros", free: false, premium: true },
      { feature: "Versión y opciones detalladas", free: false, premium: true },
    ],
    comparePrice: (
      <>
        Los reportes premium comienzan desde solo $14.99 &mdash; una
        fracción de lo que cobran los principales competidores.
      </>
    ),

    h2Enough: "¿Cuándo es suficiente una verificación VIN gratis?",
    enough1: (
      <>
        Una verificación VIN gratis es ideal para una revisión inicial. Si
        estás navegando anuncios en línea y quieres verificar rápidamente
        que un vehículo coincide con su descripción, la decodificación
        gratis te da confirmación instantánea del año, motor y tipo de
        carrocería. También es útil para revisar las especificaciones de tu
        propio vehículo, buscar compatibilidad de partes o verificar
        información en un documento de registro.
      </>
    ),
    enough2: (
      <>
        Sin embargo, si estás considerando seriamente comprar un vehículo,
        un reporte premium ofrece información adicional crítica. Las listas
        de equipamiento te ayudan a verificar qué opciones de fábrica están
        instaladas. Los datos de valor de mercado muestran si el precio
        pedido es justo. Las fotos reales del vehículo (cuando están
        disponibles) te permiten comparar la condición actual con imágenes
        históricas.
      </>
    ),

    h2How: "Cómo hacer una verificación VIN gratis",
    howIntro:
      "Hacer una verificación VIN gratis en CarCheckerVIN toma tres pasos sencillos:",
    howStep1Bold: "Encuentra el VIN.",
    howStep1RestPre:
      " Busca en el tablero a través del parabrisas, en la calcomanía del marco de la puerta del conductor, o en la tarjeta de registro del vehículo. ¿Necesitas ayuda para localizarlo? Consulta nuestra ",
    howStep1LinkLabel: "guía de ubicaciones del VIN",
    howStep1RestPost: ".",
    howStep2Bold: "Ingresa el VIN.",
    howStep2RestPre:
      " Escribe o pega el VIN de 17 caracteres en el cuadro de búsqueda arriba o en nuestra ",
    howStep2LinkLabel: "página de inicio",
    howStep2RestPost: ".",
    howStep3Bold: "Revisa los resultados.",
    howStep3Rest: (
      <>
        {" "}Tu reporte gratis aparece en segundos con las especificaciones
        principales del vehículo. Desde ahí puedes actualizar a un reporte
        premium si necesitas el panorama completo.
      </>
    ),

    h2Scams: "Evita estafas de verificación VIN",
    scamsIntro: (
      <>
        No todos los servicios de verificación VIN gratis son iguales.
        Algunos sitios anuncian reportes &ldquo;gratis&rdquo; pero requieren
        una tarjeta de crédito, te suscriben a cargos recurrentes o
        proporcionan datos desactualizados. Al elegir un proveedor de
        verificación VIN, busca lo siguiente:
      </>
    ),
    scamsItems: [
      "No se requiere tarjeta de crédito para la decodificación básica.",
      "Precios transparentes para reportes premium sin tarifas ocultas.",
      "Datos provenientes de bases de datos verificadas como NMVTIS y registros del fabricante.",
      "Resultados instantáneos sin requerir la creación de una cuenta.",
    ],
    scamsOutro: (
      <>
        CarCheckerVIN cumple con todos estos criterios. Nuestra
        decodificación VIN gratis es genuinamente gratis sin condiciones, y
        nuestros reportes premium tienen un precio claro de $14.99 sin
        suscripciones ni renovaciones automáticas.
      </>
    ),

    h2Sellers: "Verificaciones VIN gratis para vendedores",
    sellersPre: "Los vendedores también se benefician de las verificaciones VIN. Incluir un ",
    sellersLinkLabel: "reporte de verificación VIN",
    sellersPost: (
      <>
        {" "}en tu anuncio demuestra transparencia y genera confianza en el
        comprador. Verifica las especificaciones que has listado, confirma
        el historial del vehículo y puede ayudar a justificar tu precio
        pedido. Los anuncios con reportes VIN tienden a recibir más
        consultas y a venderse más rápido porque los compradores se sienten
        más cómodos haciendo una oferta cuando pueden verificar los detalles
        de forma independiente.
      </>
    ),

    h2Faq: "Preguntas frecuentes",
    faqIntro:
      "Las preguntas más comunes sobre cómo hacer una verificación VIN gratis, qué incluye y cuáles herramientas gratis son realmente gratis.",

    ctaHeading: "Verifica cualquier VIN gratis",
    ctaSub:
      "Ingresa un VIN de 17 caracteres para obtener al instante tu reporte gratis del vehículo.",
  },
  fr: {
    crumbHome: "Accueil",
    crumbGuides: "Guides",
    crumbFree: "V\u00e9rification VIN gratuite",
    h1: "V\u00e9rification VIN gratuite",
    lede: (
      <>
        Une v\u00e9rification VIN gratuite te permet de d\u00e9coder n'importe
        quel num\u00e9ro d'identification du v\u00e9hicule de 17 caract\u00e8res
        pour voir instantan\u00e9ment la marque, le mod\u00e8le, l'ann\u00e9e, le
        moteur et les caract\u00e9ristiques de base du v\u00e9hicule, sans
        co\u00fbt. Que tu sois en train d'acheter, de vendre ou simplement
        curieux, faire une v\u00e9rification VIN est la premi\u00e8re \u00e9tape
        la plus intelligente.
      </>
    ),
    formHeading: "Effectue une v\u00e9rification VIN gratuite maintenant",

    h2Why: "Pourquoi tu devrais toujours v\u00e9rifier un VIN avant d'acheter",
    why1: (
      <>
        Une v\u00e9rification VIN est le moyen le plus rapide de v\u00e9rifier
        qu'un v\u00e9hicule est bien ce que le vendeur pr\u00e9tend. En quelques
        secondes, tu peux confirmer l'ann\u00e9e mod\u00e8le, la cylindr\u00e9e
        du moteur, la transmission et le type de carrosserie sans te fier
        uniquement \u00e0 la parole du vendeur.
      </>
    ),
    why2: (
      <>
        La fraude au titre, le recul du compteur kilom\u00e9trique et les
        dommages d'accident non divulgu\u00e9s restent des probl\u00e8mes
        importants sur le march\u00e9 de l'occasion. La Federal Trade
        Commission estime que la fraude au compteur \u00e0 elle seule co\u00fbte
        aux consommateurs am\u00e9ricains plus d'un milliard de dollars par an.
        Une v\u00e9rification VIN est ta premi\u00e8re ligne de d\u00e9fense
        contre ces risques car chaque \u00e9v\u00e9nement de titre, rappel et
        sp\u00e9cification est li\u00e9 au VIN.
      </>
    ),
    why3: (
      <>
        M\u00eame si tu fais confiance au vendeur, effectuer un d\u00e9codage
        VIN gratuit prend moins de 60 secondes et peut t'\u00e9pargner des
        milliers de dollars. Cela confirme que la finition, le moteur et les
        caract\u00e9ristiques annonc\u00e9s correspondent r\u00e9ellement aux
        donn\u00e9es de construction d'usine pour ce VIN sp\u00e9cifique.
      </>
    ),

    h2Includes: "Que comprend une v\u00e9rification VIN gratuite ?",
    includesIntro: (
      <>
        Notre d\u00e9codeur VIN gratuit fournit les sp\u00e9cifications
        principales pour tout v\u00e9hicule fabriqu\u00e9 \u00e0 partir de 1981.
        Lorsque tu saisis un VIN, tu re\u00e7ois instantan\u00e9ment :
      </>
    ),
    includesItems: [
      {
        bold: "Ann\u00e9e, marque et mod\u00e8le",
        rest: (
          <> &mdash; v\u00e9rifi\u00e9s directement depuis le VIN, pas depuis l'annonce du vendeur.</>
        ),
      },
      {
        bold: "Sp\u00e9cifications du moteur",
        rest: (
          <> &mdash; y compris la cylindr\u00e9e, le nombre de cylindres, le type de carburant et la puissance.</>
        ),
      },
      {
        bold: "Type de transmission",
        rest: <> &mdash; automatique, manuelle, CVT ou \u00e0 double embrayage.</>,
      },
      {
        bold: "Type de carrosserie et transmission",
        rest: <> &mdash; berline, SUV, camion, coup\u00e9, FWD, AWD, RWD ou 4WD.</>,
      },
      {
        bold: "Pays de fabrication",
        rest: (
          <> &mdash; o\u00f9 le v\u00e9hicule a \u00e9t\u00e9 r\u00e9ellement construit, pas seulement le pays d'origine de la marque.</>
        ),
      },
    ],
    includesOutroPre: "Ces informations sont d\u00e9cod\u00e9es directement depuis la ",
    includesLinkLabel: "structure du VIN \u00e0 17 caract\u00e8res",
    includesOutroPost:
      " et v\u00e9rifi\u00e9es par rapport aux bases de donn\u00e9es des fabricants. Aucun compte requis et aucune limite au nombre de v\u00e9rifications gratuites que tu peux effectuer.",

    h2Compare: "V\u00e9rification VIN gratuite vs. rapport premium",
    compareIntro: (
      <>
        Une v\u00e9rification VIN gratuite te donne l'essentiel de la
        construction d'usine. Pour les acheteurs qui ont besoin d'une vue
        compl\u00e8te avant de s'engager dans un achat, le rapport premium
        ajoute des donn\u00e9es approfondies, notamment les listes
        d'\u00e9quipement, les vraies photos, les valeurs de march\u00e9 et les
        annonces comparables. Voici une comparaison c\u00f4te \u00e0 c\u00f4te :
      </>
    ),
    tableFeature: "Caract\u00e9ristique",
    tableFree: "Gratuit",
    tablePremium: "Premium",
    comparisonRows: [
      { feature: "Marque, mod\u00e8le et ann\u00e9e", free: true, premium: true },
      { feature: "Sp\u00e9cifications du moteur et de la transmission", free: true, premium: true },
      { feature: "Pays de fabrication", free: true, premium: true },
      { feature: "Type de carrosserie et transmission", free: true, premium: true },
      { feature: "Liste compl\u00e8te de l'\u00e9quipement d'usine", free: false, premium: true },
      { feature: "Vraies photos du v\u00e9hicule", free: false, premium: true },
      { feature: "Estimations de la valeur de march\u00e9", free: false, premium: true },
      { feature: "Annonces comparables de concessionnaires", free: false, premium: true },
      { feature: "Informations sur les rappels", free: false, premium: true },
      { feature: "Finition et options d\u00e9taill\u00e9es", free: false, premium: true },
    ],
    comparePrice: (
      <>
        Les rapports premium commencent \u00e0 seulement $14.99 &mdash; une
        fraction de ce que facturent les principaux concurrents.
      </>
    ),

    h2Enough: "Quand une v\u00e9rification VIN gratuite est-elle suffisante ?",
    enough1: (
      <>
        Une v\u00e9rification VIN gratuite est id\u00e9ale pour un premier
        tri. Si tu parcours des annonces en ligne et que tu veux v\u00e9rifier
        rapidement qu'un v\u00e9hicule correspond \u00e0 sa description, le
        d\u00e9codage gratuit te donne une confirmation instantan\u00e9e de
        l'ann\u00e9e, du moteur et du type de carrosserie. C'est aussi utile
        pour v\u00e9rifier les sp\u00e9cifications de ton propre v\u00e9hicule,
        rechercher la compatibilit\u00e9 des pi\u00e8ces ou v\u00e9rifier les
        informations sur un document d'immatriculation.
      </>
    ),
    enough2: (
      <>
        Cependant, si tu envisages s\u00e9rieusement d'acheter un v\u00e9hicule,
        un rapport premium fournit des informations suppl\u00e9mentaires
        critiques. Les listes d'\u00e9quipement t'aident \u00e0 v\u00e9rifier
        quelles options d'usine sont install\u00e9es. Les donn\u00e9es de
        valeur de march\u00e9 indiquent si le prix demand\u00e9 est juste. Les
        vraies photos du v\u00e9hicule (lorsqu'elles sont disponibles) te
        permettent de comparer l'\u00e9tat actuel avec des images historiques.
      </>
    ),

    h2How: "Comment effectuer une v\u00e9rification VIN gratuite",
    howIntro: "Effectuer une v\u00e9rification VIN gratuite sur CarCheckerVIN se fait en trois \u00e9tapes simples :",
    howStep1Bold: "Trouve le VIN.",
    howStep1RestPre:
      " Regarde sur le tableau de bord \u00e0 travers le pare-brise, sur l'autocollant du cadre de porte c\u00f4t\u00e9 conducteur, ou sur la carte d'immatriculation du v\u00e9hicule. Besoin d'aide pour le localiser ? Consulte notre ",
    howStep1LinkLabel: "guide des emplacements du VIN",
    howStep1RestPost: ".",
    howStep2Bold: "Saisis le VIN.",
    howStep2RestPre:
      " Tape ou colle le VIN de 17 caract\u00e8res dans la zone de recherche ci-dessus ou sur notre ",
    howStep2LinkLabel: "page d'accueil",
    howStep2RestPost: ".",
    howStep3Bold: "Examine les r\u00e9sultats.",
    howStep3Rest: (
      <>
        {" "}Ton rapport gratuit appara\u00eet en quelques secondes avec les
        sp\u00e9cifications principales du v\u00e9hicule. \u00c0 partir de
        l\u00e0, tu peux passer \u00e0 un rapport premium si tu as besoin de la
        vue compl\u00e8te.
      </>
    ),

    h2Scams: "\u00c9vite les arnaques de v\u00e9rification VIN",
    scamsIntro: (
      <>
        Tous les services de v\u00e9rification VIN gratuits ne se valent pas.
        Certains sites annoncent des rapports \u00ab gratuits \u00bb mais
        exigent une carte de cr\u00e9dit, t'abonnent \u00e0 des frais
        r\u00e9currents ou fournissent des donn\u00e9es obsol\u00e8tes. Lorsque
        tu choisis un fournisseur de v\u00e9rification VIN, recherche les
        \u00e9l\u00e9ments suivants :
      </>
    ),
    scamsItems: [
      "Aucune carte de cr\u00e9dit requise pour le d\u00e9codage de base.",
      "Tarification transparente pour les rapports premium sans frais cach\u00e9s.",
      "Donn\u00e9es provenant de bases de donn\u00e9es v\u00e9rifi\u00e9es telles que NMVTIS et les dossiers des fabricants.",
      "R\u00e9sultats instantan\u00e9s sans n\u00e9cessiter la cr\u00e9ation d'un compte.",
    ],
    scamsOutro: (
      <>
        CarCheckerVIN r\u00e9pond \u00e0 tous ces crit\u00e8res. Notre
        d\u00e9codage VIN gratuit est r\u00e9ellement gratuit sans condition,
        et nos rapports premium sont \u00e0 un prix clair de $14.99 sans
        abonnement ni renouvellement automatique.
      </>
    ),

    h2Sellers: "V\u00e9rifications VIN gratuites pour vendeurs",
    sellersPre: "Les vendeurs b\u00e9n\u00e9ficient aussi des v\u00e9rifications VIN. Inclure un ",
    sellersLinkLabel: "rapport de v\u00e9rification VIN",
    sellersPost: (
      <>
        {" "}dans ton annonce d\u00e9montre la transparence et renforce la
        confiance de l'acheteur. Cela v\u00e9rifie les sp\u00e9cifications que
        tu as list\u00e9es, confirme l'historique du v\u00e9hicule et peut
        aider \u00e0 justifier ton prix demand\u00e9. Les annonces avec
        rapports VIN ont tendance \u00e0 recevoir plus de demandes et se
        vendent plus rapidement, car les acheteurs se sentent plus \u00e0
        l'aise de faire une offre lorsqu'ils peuvent v\u00e9rifier les
        d\u00e9tails de mani\u00e8re ind\u00e9pendante.
      </>
    ),

    h2Faq: "Questions fr\u00e9quemment pos\u00e9es",
    faqIntro:
      "Les questions les plus courantes sur la fa\u00e7on d'effectuer une v\u00e9rification VIN gratuite, ce qu'elle inclut et quels outils gratuits sont r\u00e9ellement gratuits.",

    ctaHeading: "V\u00e9rifie n'importe quel VIN gratuitement",
    ctaSub: "Saisis un VIN de 17 caract\u00e8res pour obtenir instantan\u00e9ment ton rapport gratuit du v\u00e9hicule.",
  },
} as const;

const FAQS_EN = [
  {
    question: "How can I check a VIN for free?",
    answer:
      "Enter the 17-character VIN into a free VIN decoder such as the search box on CarCheckerVIN. In seconds you get the vehicle's year, make, model, engine, transmission, body style, drivetrain, and country of manufacture decoded directly from the VIN. There is no account, no credit card, and no limit on the number of free checks. For recalls, you can also use the free NHTSA tool at nhtsa.gov.",
  },
  {
    question: "What does a free VIN check show versus a paid report?",
    answer:
      "A free VIN check decodes factory-build specifications: year, make, model, engine, transmission, body style, drivetrain, and country of manufacture. A paid report adds depth a free decode cannot: the full factory equipment list, real vehicle photos, market value estimates, comparable dealer listings, recall details, and detailed trim and options. On CarCheckerVIN the premium report starts at $14.99 with no subscription.",
  },
  {
    question: "Is a free VIN check reliable?",
    answer:
      "Yes, for what it covers. A free VIN decode reads the standardized 17-character VIN and verifies the specifications against manufacturer build data, so the year, make, model, and engine it returns are accurate for vehicles built from 1981 onward. It is reliable for confirming a vehicle matches its listing, but it does not include title, accident, or odometer history, which require additional data sources.",
  },
  {
    question: "What free government and nonprofit VIN tools exist?",
    answer:
      "Three genuinely free tools are worth using. NHTSA.gov offers a free recall lookup by VIN for open safety recalls. NICB VINCheck (vincheck.nicb.org) gives a free stolen and total-loss flag, limited to a few lookups per day. Free VIN decoders return specifications only. Full title history comes from NMVTIS-approved providers, which charge a small fee because NMVTIS data access is not free.",
  },
  {
    question: "Can I see accident or title history for free?",
    answer:
      "Not in full. Free VIN decoders show specifications, not accident or title history. NICB VINCheck offers a free stolen and total-loss flag but not a complete history. Comprehensive title-brand and history data flows from NMVTIS-approved providers, which charge a small fee. Be cautious of sites advertising a completely \"free history report\" that then require a card or push a subscription.",
  },
  {
    question: "How do I do a free VIN decode?",
    answer:
      "Locate the 17-character VIN on the dashboard through the windshield, the driver-side door jamb sticker, or the registration card. Type or paste it into a free decoder such as the CarCheckerVIN search box. The decode returns instantly with year, make, model, engine, transmission, body style, drivetrain, and country of manufacture. No account or payment is required to read these core specifications.",
  },
  {
    question: "How do I avoid fake \"free\" VIN report scams?",
    answer:
      "Choose a service that decodes the VIN with no credit card required, shows transparent pricing for any premium report, and sources data from verified databases such as NMVTIS and manufacturer records. Avoid sites that demand a card for a \"free\" report, enroll you in recurring charges, or serve outdated data. CarCheckerVIN's free decode is genuinely free, and premium reports are priced clearly at $14.99 with no auto-renewals.",
  },
];

const FAQS_ES = [
  {
    question: "¿Cómo puedo verificar un VIN gratis?",
    answer:
      "Ingresa el VIN de 17 caracteres en un decodificador VIN gratis como el cuadro de búsqueda en CarCheckerVIN. En segundos obtienes el año, marca, modelo, motor, transmisión, tipo de carrocería, tracción y país de fabricación del vehículo decodificados directamente desde el VIN. No hay cuenta, ni tarjeta de crédito, ni límite en la cantidad de verificaciones gratis. Para retiros, también puedes usar la herramienta gratis de NHTSA en nhtsa.gov.",
  },
  {
    question: "¿Qué muestra una verificación VIN gratis frente a un reporte pagado?",
    answer:
      "Una verificación VIN gratis decodifica las especificaciones de fabricación: año, marca, modelo, motor, transmisión, tipo de carrocería, tracción y país de fabricación. Un reporte pagado agrega profundidad que una decodificación gratis no puede dar: la lista completa de equipamiento de fábrica, fotos reales del vehículo, estimaciones de valor de mercado, anuncios comparables de concesionarios, detalles de retiros y versión y opciones detalladas. En CarCheckerVIN el reporte premium comienza desde $14.99 sin suscripción.",
  },
  {
    question: "¿Es confiable una verificación VIN gratis?",
    answer:
      "Sí, para lo que cubre. Una decodificación VIN gratis lee el VIN estandarizado de 17 caracteres y verifica las especificaciones contra los datos de fabricación, así que el año, marca, modelo y motor que devuelve son precisos para vehículos fabricados desde 1981 en adelante. Es confiable para confirmar que un vehículo coincide con su anuncio, pero no incluye historial de título, accidente u odómetro, los cuales requieren fuentes de datos adicionales.",
  },
  {
    question: "¿Qué herramientas VIN gratis gubernamentales y sin fines de lucro existen?",
    answer:
      "Vale la pena usar tres herramientas genuinamente gratis. NHTSA.gov ofrece una búsqueda gratis de retiros por VIN para retiros de seguridad abiertos. NICB VINCheck (vincheck.nicb.org) da una bandera gratis de robo y pérdida total, limitada a unas pocas búsquedas por día. Los decodificadores VIN gratis devuelven solo especificaciones. El historial completo de título viene de proveedores aprobados por NMVTIS, que cobran una pequeña tarifa porque el acceso a datos de NMVTIS no es gratis.",
  },
  {
    question: "¿Puedo ver el historial de accidentes o título gratis?",
    answer:
      "No por completo. Los decodificadores VIN gratis muestran especificaciones, no historial de accidentes o título. NICB VINCheck ofrece una bandera gratis de robo y pérdida total pero no un historial completo. Los datos completos de marca de título e historial fluyen de proveedores aprobados por NMVTIS, que cobran una pequeña tarifa. Ten cuidado con los sitios que anuncian un \"reporte de historial gratis\" completamente gratis que luego requieren una tarjeta o empujan una suscripción.",
  },
  {
    question: "¿Cómo hago una decodificación VIN gratis?",
    answer:
      "Localiza el VIN de 17 caracteres en el tablero a través del parabrisas, la calcomanía del marco de la puerta del conductor o la tarjeta de registro. Escríbelo o pégalo en un decodificador gratis como el cuadro de búsqueda de CarCheckerVIN. La decodificación devuelve al instante el año, marca, modelo, motor, transmisión, tipo de carrocería, tracción y país de fabricación. No se requiere cuenta ni pago para leer estas especificaciones principales.",
  },
  {
    question: "¿Cómo evito las estafas falsas de reportes VIN \"gratis\"?",
    answer:
      "Elige un servicio que decodifique el VIN sin requerir tarjeta de crédito, muestre precios transparentes para cualquier reporte premium y obtenga datos de bases de datos verificadas como NMVTIS y registros del fabricante. Evita los sitios que exigen una tarjeta para un reporte \"gratis\", te inscriben en cargos recurrentes o sirven datos desactualizados. La decodificación gratis de CarCheckerVIN es genuinamente gratis, y los reportes premium tienen un precio claro de $14.99 sin renovaciones automáticas.",
  },
];

interface Props {
  locale: Locale;
}

export default function GuideFreeVinCheckBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: c.crumbHome, href: locale === "es" ? "/es" : "/" },
              { label: c.crumbGuides, href: link("/guides") },
              { label: c.crumbFree },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            {c.lede}
          </p>

          {/* --- Inline search form --- */}
          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              {c.formHeading}
            </h2>
            <VinSearchForm size="sm" />
          </div>

          {/* --- Why you should check --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            {c.h2Why}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.why1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.why2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.why3}</p>

          {/* --- What free includes --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            {c.h2Includes}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.includesIntro}
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.includesItems.map((item, i) => (
              <li key={i} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>{item.bold}</strong>
                  {item.rest}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {c.includesOutroPre}
            <Link
              href={link("/guides/what-is-a-vin-number")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.includesLinkLabel}
            </Link>
            {c.includesOutroPost}
          </p>

          {/* --- Free vs Premium comparison --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            {c.h2Compare}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.compareIntro}
          </p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">{c.tableFeature}</th>
                  <th className="px-4 py-3 font-semibold text-center">
                    {c.tableFree}
                  </th>
                  <th className="px-4 py-3 font-semibold text-center">
                    {c.tablePremium}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {c.comparisonRows.map(({ feature, free, premium }) => (
                  <tr key={feature} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 text-slate-900">{feature}</td>
                    <td className="px-4 py-3 text-center">
                      {free ? (
                        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-slate-500 mx-auto" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {premium ? (
                        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-slate-500 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-700">{c.comparePrice}</p>

          {/* --- When free is enough --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            {c.h2Enough}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.enough1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.enough2}</p>

          {/* --- How to run --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            {c.h2How}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.howIntro}</p>
          <ol className="mt-4 space-y-4 text-slate-600">
            <li className="flex gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 text-primary-700 font-bold text-sm flex-shrink-0">
                1
              </span>
              <span>
                <strong>{c.howStep1Bold}</strong>
                {c.howStep1RestPre}
                <Link
                  href={link("/guides/what-is-a-vin-number")}
                  className="text-primary-600 hover:underline font-medium"
                >
                  {c.howStep1LinkLabel}
                </Link>
                {c.howStep1RestPost}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 text-primary-700 font-bold text-sm flex-shrink-0">
                2
              </span>
              <span>
                <strong>{c.howStep2Bold}</strong>
                {c.howStep2RestPre}
                <Link
                  href={locale === "es" ? "/es" : "/"}
                  className="text-primary-600 hover:underline font-medium"
                >
                  {c.howStep2LinkLabel}
                </Link>
                {c.howStep2RestPost}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 text-primary-700 font-bold text-sm flex-shrink-0">
                3
              </span>
              <span>
                <strong>{c.howStep3Bold}</strong>
                {c.howStep3Rest}
              </span>
            </li>
          </ol>

          {/* --- Avoid scams --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            {c.h2Scams}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.scamsIntro}</p>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.scamsItems.map((item) => (
              <li key={item} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">{c.scamsOutro}</p>

          {/* --- Seller benefits --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            {c.h2Sellers}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.sellersPre}
            <Link
              href={link("/vin-check")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.sellersLinkLabel}
            </Link>
            {c.sellersPost}
          </p>

          {/* --- FAQ --- */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900">
            {c.h2Faq}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.faqIntro}</p>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">
                    {faq.question}
                  </h3>
                  <span className="text-2xl text-primary-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </article>

      {/* --- CTA --- */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {c.ctaHeading}
          </h2>
          <p className="text-slate-700 mb-6">{c.ctaSub}</p>
          <VinSearchForm size="sm" />
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
