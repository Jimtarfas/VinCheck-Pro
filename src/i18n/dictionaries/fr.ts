/**
 * French copy.
 *
 * Translation notes:
 *   - Standard register, tutoiement ("tu") throughout — matches the
 *     conversational tone of the English site and the existing Spanish
 *     copy. US-French audience (Quebec / Louisiana / general North
 *     American francophones) plus French-speaking African and European
 *     buyers searching for US vehicle history reports.
 *   - "VIN" stays untranslated — universally recognized term.
 *   - "Vehicle history report" → "rapport d'historique du véhicule".
 *   - "Title brand" → "marque de titre" (US legal term, kept close).
 *   - "Salvage" stays as "salvage" when referring to US legal status;
 *     used as "récupération" only in plain prose.
 *   - Currency stays "$14.99" — USD. We never sell in CAD or EUR.
 *   - DMV-style acronyms (NMVTIS, NICB, NHTSA, DHSMV, DPPA) stay in
 *     English — they're US-specific agencies.
 *
 * Every key MUST exist in en.ts — the Dictionary type forces it.
 */

import type { Dictionary } from "./en";

export const fr: Dictionary = {
  // ── Header / Footer / global chrome ─────────────────────────────
  nav: {
    vinCheck: "V\u00e9rifier le VIN",
    pricing: "Tarifs",
    reviews: "Avis",
    guides: "Guides",
    blog: "Blog",
    about: "\u00c0 propos",
    signIn: "Se connecter",
    signUp: "S\u2019inscrire",
    dashboard: "Mon compte",
    signOut: "Se d\u00e9connecter",
    myReports: "Mes rapports",
  },
  languageSwitcher: {
    label: "Langue",
    english: "English",
    spanish: "Espa\u00f1ol",
  },
  footer: {
    tagline:
      "Rapports d\u2019historique de v\u00e9hicule gratuits, d\u00e9codage VIN et outils pour acheter une voiture d\u2019occasion. Approuv\u00e9 par plus de 50\u00a0000 acheteurs.",
    checksHeading: "V\u00e9rifications du v\u00e9hicule",
    marketplaceHeading: "Plateformes de vente",
    toolsHeading: "Outils",
    guidesHeading: "Guides",
    companyHeading: "Entreprise",
    popularBrandsHeading: "Marques populaires",
    viewAllBrands: "Voir les 33 marques \u2192",
    copyright: "Tous droits r\u00e9serv\u00e9s.",
    poweredBy: "Propuls\u00e9 par l\u2019API Auto.dev",
    contactEmail: "contact@carcheckervin.com",
    privacy: "Confidentialit\u00e9",
    terms: "Conditions",
    refundPolicy: "Politique de remboursement",
    contact: "Contact",
  },
  vinForm: {
    label: "Saisis un VIN de 17 caract\u00e8res",
    placeholder: "ex.\u00a01HGBH41JXMN109186",
    submit: "V\u00e9rifier le VIN",
    invalid: "Le VIN doit comporter 17 caract\u00e8res.",
    bannedChars: "Un VIN ne peut pas contenir les lettres I, O ou Q.",
    loading: "D\u00e9codage\u2026",
    noCardRequired: "Gratuit \u2014 sans carte",
  },

  // ── Homepage ────────────────────────────────────────────────────
  home: {
    metaTitle:
      "V\u00e9rification VIN gratuite et d\u00e9codeur \u2014 Rapports d\u2019historique de v\u00e9hicule",
    metaDescription:
      "V\u00e9rification VIN gratuite et d\u00e9codeur. Obtiens des rapports d\u2019historique de v\u00e9hicule en un instant avec sp\u00e9cifications compl\u00e8tes, photos, valeur de march\u00e9 et \u00e9quipement \u2014 approuv\u00e9 par plus de 50\u00a0000 acheteurs.",
    heroEyebrow: "Rapports gratuits \u2014 R\u00e9sultats instantan\u00e9s",
    heroHeadline: "Connais l\u2019histoire compl\u00e8te de ta voiture.",
    heroSub:
      "D\u00e9code n\u2019importe quel VIN pour obtenir les sp\u00e9cifications compl\u00e8tes, des photos r\u00e9elles, la valeur de march\u00e9 et l\u2019historique de propri\u00e9t\u00e9 en quelques secondes.",
    trustedSources: "Sources de confiance\u00a0:",
    stats: {
      reports: "Rapports t\u00e9l\u00e9charg\u00e9s",
      rating: "Note moyenne",
      speed: "Vitesse du rapport",
      dataPoints: "Points de donn\u00e9es",
    },
    sections: {
      howItWorksHeading: "Comment \u00e7a marche",
      howItWorksSub:
        "Du VIN \u00e0 l\u2019historique du v\u00e9hicule en trois \u00e9tapes. Aucun compte requis.",
      step1Title: "Saisis le VIN",
      step1Body:
        "Trouve le VIN de 17 caract\u00e8res sur le tableau de bord ou sur l\u2019autocollant du cadre de porte. Tape-le ou colle-le dans la barre de recherche.",
      step2Title: "Nous cherchons chaque enregistrement",
      step2Body:
        "Marques de titre, historique d\u2019accidents, relev\u00e9s d\u2019odom\u00e8tre, rappels, transferts de propri\u00e9t\u00e9 \u2014 depuis NMVTIS, NICB, NHTSA et plus de 30 fournisseurs de donn\u00e9es.",
      step3Title: "Lis le rapport",
      step3Body:
        "Sp\u00e9cifications d\u00e9cod\u00e9es, photos, \u00e9valuation de march\u00e9 et historique complet \u2014 livr\u00e9 instantan\u00e9ment, gratuit pour les bases.",
      reportIncludesHeading: "Ce que le rapport inclut",
      featuresHeading: "Pourquoi CarCheckerVIN",
      reviewsHeading: "Ce que disent les acheteurs",
      faqHeading: "Questions fr\u00e9quentes",
      ctaHeading: "Pr\u00eat \u00e0 d\u00e9coder n\u2019importe quel VIN\u00a0?",
      ctaSub:
        "Rapport gratuit instantan\u00e9 \u2014 sans inscription, sans carte, sans surprise.",
    },
  },

  // ── /vin-check (hub) ────────────────────────────────────────────
  vinCheck: {
    metaTitle: "V\u00e9rification VIN gratuite \u2014 Recherche instantan\u00e9e d\u2019historique de v\u00e9hicule",
    metaDescription:
      "V\u00e9rification VIN gratuite et recherche d\u2019historique de v\u00e9hicule. D\u00e9code n\u2019importe quel VIN de 17 caract\u00e8res et consulte les marques de titre, les accidents, l\u2019odom\u00e8tre, les rappels et plus \u2014 instantan\u00e9ment.",
    heroEyebrow: "Recherche VIN soutenue par NMVTIS",
    heroHeadline: "V\u00e9rifie n\u2019importe quel VIN gratuitement.",
    heroSub:
      "Saisis le VIN. Obtiens le rapport complet d\u2019historique du v\u00e9hicule \u2014 marques de titre, accidents, historique d\u2019odom\u00e8tre, rappels de s\u00e9curit\u00e9 actifs, transferts de propri\u00e9t\u00e9 \u2014 en moins de 60\u00a0secondes.",
    whatYouGet: "Ce que tu obtiens",
    whatYouGetBullets: [
      "Marques de titre des 50 \u00e9tats (salvage, reconstruit, inondation, lemon, gr\u00eale)",
      "Accidents signal\u00e9s avec gravit\u00e9 et d\u00e9ploiement des coussins gonflables",
      "Chaque relev\u00e9 d\u2019odom\u00e8tre enregistr\u00e9 lors des transferts DMV, inspections et entretien",
      "Rappels de s\u00e9curit\u00e9 NHTSA actifs avec les instructions de r\u00e9paration",
      "Nombre de propri\u00e9taires pr\u00e9c\u00e9dents et transferts d\u2019immatriculation",
      "Dossiers d\u2019entretien et de maintenance d\u00e9clar\u00e9s aux partenaires de donn\u00e9es ClearVin",
      "Enregistrements de vol et de perte totale exig\u00e9s par NMVTIS",
    ],
    ctaSearchHeading: "Lance une v\u00e9rification VIN gratuite maintenant",
  },

  // ── /pricing ────────────────────────────────────────────────────
  pricing: {
    metaTitle: "Tarifs \u2014 D\u00e9codage VIN gratuit + Rapports complets",
    metaDescription:
      "D\u00e9codage VIN gratuit pour chaque v\u00e9hicule. Rapport complet d\u2019historique soutenu par NMVTIS optionnel pour 14,99\u00a0\u0024 \u2014 marques de titre, accidents, historique d\u2019odom\u00e8tre, rappels.",
    heroEyebrow: "Tarifs simples et honn\u00eates",
    heroHeadline: "Paie seulement quand tu as besoin de l\u2019histoire compl\u00e8te.",
    heroSub:
      "D\u00e9coder un VIN est gratuit, toujours. Ajoute un rapport complet soutenu par NMVTIS quand tu es sur le point d\u2019acheter.",
    freeTitle: "D\u00e9codage VIN gratuit",
    freePrice: "$0",
    freeUnit: "pour toujours",
    freeBullets: [
      "Ann\u00e9e, marque, mod\u00e8le, version",
      "Moteur, transmission, transmission int\u00e9grale",
      "\u00c9quipement d\u2019usine",
      "Rappels de s\u00e9curit\u00e9 NHTSA actifs",
      "Aucune carte de cr\u00e9dit requise",
    ],
    freeCta: "D\u00e9coder un VIN",
    paidTitle: "Rapport complet d\u2019historique du v\u00e9hicule",
    paidPrice: "$14.99",
    paidUnit: "paiement unique, par VIN",
    paidBullets: [
      "Tout ce qui est dans le plan gratuit",
      "Marques de titre des 50 \u00e9tats",
      "Accidents et dommages signal\u00e9s",
      "Chaque relev\u00e9 d\u2019odom\u00e8tre enregistr\u00e9",
      "Propri\u00e9taires pr\u00e9c\u00e9dents et transferts d\u2019immatriculation",
      "Dossiers d\u2019entretien et de maintenance",
      "Enregistrements de vol et de perte totale",
      "Remboursement \u00e0 100\u00a0% s\u2019il n\u2019y a pas de donn\u00e9es VIN",
    ],
    paidCta: "Obtenir le rapport complet",
    moneyBack: "Remboursement \u00e0 100\u00a0% sans donn\u00e9es",
    faqHeading: "Questions sur les tarifs",
  },

  // ── /florida-vin-check ──────────────────────────────────────────
  florida: {
    metaTitle:
      "V\u00e9rification VIN gratuite Floride \u2014 Titre et historique FL instantan\u00e9s",
    metaDescription:
      "V\u00e9rification VIN gratuite Floride avec donn\u00e9es DHSMV et NMVTIS. Marques de titre FL, dommages par inondation, accidents, vols et rappels instantan\u00e9s \u2014 sans inscription, sans carte.",
    badgeState: "Floride (FL)",
    badgeAuthority: "Donn\u00e9es DHSMV",
    h1Lead: "V\u00e9rification VIN Floride \u2014",
    h1Accent: "Historique gratuit du v\u00e9hicule en FL",
    intro:
      "Acc\u00e8s instantan\u00e9 aux dossiers DHSMV de Floride, marques de titre, historique d\u2019accidents, dommages par inondation et donn\u00e9es d\u2019odom\u00e8tre de tout v\u00e9hicule. Gratuit, sans carte, sans inscription \u2014 r\u00e9sultats en moins de 5\u00a0secondes.",
    searchHeading: "Lance ta v\u00e9rification VIN gratuite Floride",
    searchSub:
      "Saisis n\u2019importe quel VIN de 17 caract\u00e8res \u2014 voitures, camionnettes, motos, VR",
    whyDifferentHeading:
      "Pourquoi une v\u00e9rification VIN Floride est diff\u00e9rente des autres",
    whyDifferentP1:
      "La Floride est l\u2019un des \u00e9tats les plus importants \u00e0 v\u00e9rifier lors de l\u2019achat d\u2019un v\u00e9hicule d\u2019occasion \u2014 et l\u2019un des plus risqu\u00e9s \u00e0 ignorer. L\u2019\u00c9tat du Soleil figure toujours dans le top 5 national pour les enregistrements de v\u00e9hicules salvage, les marques de titre par inondation et les cas de fraude \u00e0 l\u2019odom\u00e8tre.",
    whyDifferentStats:
      "Les donn\u00e9es f\u00e9d\u00e9rales quantifient le risque\u00a0: on estime que 358\u00a0000 v\u00e9hicules ont subi des dommages par inondation en Floride apr\u00e8s l\u2019ouragan Ian (Carfax, 2022), et la Floride est class\u00e9e #4 au niveau national pour le vol de v\u00e9hicules avec 31\u00a0419 vols en 2023 (NICB).",
    whatIncludedHeading: "Ce qu\u2019inclut ton rapport gratuit d\u2019historique de v\u00e9hicule en Floride",
    whatIncludedSub:
      "Notre recherche VIN Floride combine les donn\u00e9es DHSMV, NMVTIS, NICB, NHTSA et fournisseurs autoris\u00e9s d\u2019historique d\u2019assurance dans un seul rapport.",
    sourcesHeading: "Sources et autorit\u00e9 des donn\u00e9es",
    sourcesIntro:
      "Chaque affirmation de cette page provient d\u2019une source publique et autoris\u00e9e des \u00c9tats-Unis. Ci-dessous, les r\u00e9f\u00e9rences principales que notre v\u00e9rification VIN Floride utilise et les agences que tu peux consulter.",
    ctaHeading: "Prot\u00e8ge-toi avant d\u2019acheter en Floride",
    ctaSub:
      "Le march\u00e9 des voitures d\u2019occasion en Floride est l\u2019un des plus risqu\u00e9s des \u00c9tats-Unis en raison des dommages cach\u00e9s par inondation, du lavage de titre et de la fraude \u00e0 l\u2019odom\u00e8tre. Une v\u00e9rification VIN gratuite prend 5\u00a0secondes et pourrait t\u2019\u00e9pargner des milliers.",
  },

  // ── /paint-code-lookup ──────────────────────────────────────────
  paintCode: {
    metaTitle:
      "Code peinture par VIN \u2014 Trouve la couleur de ta voiture",
    metaDescription:
      "Trouve le code peinture exact de ta voiture par VIN. Outil gratuit pour consulter le code couleur OEM, le nom officiel de la couleur et les r\u00e9f\u00e9rences de peinture de retouche.",
    heroEyebrow: "Recherche gratuite du code OEM",
    heroHeadline: "Trouve le code peinture exact de ta voiture.",
    heroSub:
      "Saisis le VIN \u2014 obtiens le code original de peinture d\u2019usine, le nom officiel de la couleur et les r\u00e9f\u00e9rences de peinture OEM et apr\u00e8s-march\u00e9 pour les retouches.",
    searchHeading: "Consulte ton code peinture",
    searchSub:
      "Saisis le VIN de 17 caract\u00e8res. Fonctionne pour les v\u00e9hicules \u00e0 partir de 1981 de tout grand constructeur.",
    whyVinHeading: "Pourquoi tu as besoin du VIN (et pas seulement du mod\u00e8le)",
    whyVinBody:
      "Deux Honda Civic 2018 identiques \u00e0 l\u2019\u0153il peuvent avoir des codes peinture diff\u00e9rents si l\u2019une s\u2019est vendue comme \u00e9dition sp\u00e9ciale ou version. Le VIN est la seule fa\u00e7on de trouver le code couleur exact appliqu\u00e9 \u00e0 l\u2019usine d\u2019assemblage.",
    whatYouGetHeading: "Ce que tu obtiens",
    whatYouGetBullets: [
      "Code peinture OEM (ex.\u00a0NH788P pour le Lunar Silver Metallic de Honda)",
      "Nom officiel de la couleur tel qu\u2019imprim\u00e9 par le constructeur",
      "Ann\u00e9es de production o\u00f9 la couleur a \u00e9t\u00e9 propos\u00e9e",
      "R\u00e9f\u00e9rences de stylo et de flacon de peinture de retouche",
      "Identification de peinture bicouche vs monocouche",
      "Code couleur de carrosserie ET code couleur de l\u2019int\u00e9rieur (quand disponible)",
    ],
    whereStickerHeading: "O\u00f9 trouver l\u2019autocollant du code peinture",
    whereStickerBody:
      "La plupart des v\u00e9hicules ont aussi le code peinture sur un autocollant physique \u2014 g\u00e9n\u00e9ralement \u00e0 l\u2019int\u00e9rieur du cadre de porte conducteur, dans le coffre ou sous le capot. La recherche par VIN renvoie le code d\u2019usine\u00a0; v\u00e9rifier l\u2019autocollant confirme qu\u2019il n\u2019y a pas eu de re-peinture.",
    ctaHeading: "Pr\u00eat \u00e0 trouver ton code peinture\u00a0?",
    ctaSub: "Recherche gratuite instantan\u00e9e \u2014 sans inscription, sans carte.",
  },

  // ── State pages (shared chrome) ─────────────────────────────────
  state: {
    sectionWhy: "Pourquoi cet \u00e9tat compte avant d\u2019acheter",
    sectionWhatIncluded: "Ce que le rapport inclut",
    sectionSources: "Sources et autorit\u00e9 des donn\u00e9es",
    sectionCta: "Prot\u00e8ge-toi avant d\u2019acheter",
    sectionCtaSub:
      "Une v\u00e9rification VIN gratuite prend 5\u00a0secondes et pourrait t\u2019\u00e9pargner des milliers.",
    searchHeading: "Lance une v\u00e9rification VIN gratuite pour cet \u00e9tat",
    searchSub:
      "Saisis n\u2019importe quel VIN de 17 caract\u00e8res \u2014 voitures, camionnettes, motos, VR",
    badgeFree: "Gratuit \u00b7 Instantan\u00e9 \u00b7 Sans inscription",
  },

  // ── Dynamic state template (shared chrome) ──────────────────────
  stateTemplate: {
    breadcrumbHome: "Accueil",
    breadcrumbVinCheck: "V\u00e9rification VIN",
    breadcrumbByState: "Par \u00e9tat",
    heroHeadlineSuffix: "V\u00e9rification VIN",
    heroSubTemplate:
      "V\u00e9rification VIN gratuite pour les v\u00e9hicules immatricul\u00e9s en {state}. Obtiens un rapport complet d\u2019historique du v\u00e9hicule \u2014 incluant les marques de titre enregistr\u00e9es par {dmv}, l\u2019historique d\u2019accidents, les enregistrements salvage et les donn\u00e9es de rappels \u2014 instantan\u00e9ment.",
    whyHeading: "Pourquoi les conducteurs de {state} ont besoin d\u2019une v\u00e9rification VIN",
    whyP1Template:
      "Avec environ {vehicles} v\u00e9hicules immatricul\u00e9s pour une population de {population}, le march\u00e9 d\u2019occasion de {state} est vaste et actif. {dmv} tient les dossiers de titre et d\u2019immatriculation, mais ces donn\u00e9es ne suivent pas toujours un v\u00e9hicule achet\u00e9, vendu ou d\u00e9plac\u00e9 entre \u00e9tats.",
    whyP2:
      "Une v\u00e9rification VIN croise l\u2019historique de titre, les relev\u00e9s d\u2019odom\u00e8tre, les \u00e9v\u00e9nements salvage et de perte totale, les enregistrements de vol, les rappels ouverts et les rapports d\u2019accidents de tout le pays \u2014 pour que tu aies la photo compl\u00e8te avant d\u2019acheter une occasion en {state}.",
    whyP3:
      "Que tu ach\u00e8tes \u00e0 un vendeur priv\u00e9, un concessionnaire ou un marketplace en ligne, la recherche par VIN est l\u2019\u00e9tape la plus importante que tu puisses prendre pour \u00e9viter le lavage de titre, les dommages par inondation cach\u00e9s ou l\u2019historique salvage non divulgu\u00e9.",
    brandsHeading: "Marques de titre reconnues en {state}",
    brandsSubTemplate:
      "{dmv} utilise les marques suivantes pour signaler les v\u00e9hicules avec un historique significatif.",
    lemonLawHeading: "R\u00e9sum\u00e9 de la Lemon Law de {state}",
    sourcesHeading: "Sources et autorit\u00e9 des donn\u00e9es",
    sourcesIntro:
      "Chaque affirmation de cette page de v\u00e9rification VIN {state} renvoie \u00e0 une source publique et autoris\u00e9e.",
    sourcesFootnote:
      "Les donn\u00e9es VIN de {state} sont crois\u00e9es avec NMVTIS, NHTSA, NICB et les dossiers de {dmv} au moment de chaque recherche. {state} compte environ {population} habitants et {vehicles} v\u00e9hicules immatricul\u00e9s.",
    faqHeading: "V\u00e9rification VIN {state} \u2014 Questions fr\u00e9quentes",
    ctaHeading: "Lance une v\u00e9rification VIN gratuite pour un v\u00e9hicule de {state}",
    ctaSub:
      "Une v\u00e9rification VIN gratuite prend 5\u00a0secondes et pourrait t\u2019\u00e9pargner des milliers.",
    badgeFree: "Gratuit \u00b7 Instantan\u00e9 \u00b7 Sans inscription",
  },

  // ── Make pages (shared chrome) ──────────────────────────────────
  make: {
    breadcrumbHome: "Accueil",
    breadcrumbVinCheck: "V\u00e9rification VIN",
    heroHeadlineSuffix: "V\u00e9rification et d\u00e9codeur VIN",
    heroSubTemplate:
      "Recherche n\u2019importe quel num\u00e9ro VIN {make} pour obtenir un rapport complet d\u2019historique du v\u00e9hicule, des sp\u00e9cifications compl\u00e8tes, des photos r\u00e9elles, les valeurs de march\u00e9 et les d\u00e9tails de l\u2019\u00e9quipement \u2014 instantan\u00e9ment.",
    aboutHeading: "\u00c0 propos des num\u00e9ros VIN {make}",
    aboutP1Template:
      "{make} est {description}, fond\u00e9 en {founded} en {country}. Chaque v\u00e9hicule {make} fabriqu\u00e9 depuis 1981 a un num\u00e9ro d\u2019identification du v\u00e9hicule (VIN) unique de 17 caract\u00e8res qui contient des informations d\u00e9taill\u00e9es sur les sp\u00e9cifications, les d\u00e9tails de fabrication et l\u2019histoire du v\u00e9hicule.",
    aboutP2Template:
      "Les VIN {make} commencent g\u00e9n\u00e9ralement par les caract\u00e8res \u00ab\u00a0{vinPrefix}\u00a0\u00bb, qui identifient le constructeur et le pays d\u2019origine. En d\u00e9codant un VIN {make} avec notre outil gratuit, tu acc\u00e8des instantan\u00e9ment aux sp\u00e9cifications compl\u00e8tes du v\u00e9hicule, \u00e0 l\u2019\u00e9quipement install\u00e9 en usine, aux informations de rappel, aux \u00e9valuations de march\u00e9 et aux photos r\u00e9elles.",
    aboutP3Template:
      "Que tu ach\u00e8tes un {make} {model1} d\u2019occasion, que tu vendes ton {make} {model2} ou que tu v\u00e9rifies les sp\u00e9cifications d\u2019un {make} {model3}, notre d\u00e9codeur VIN te donne toutes les informations dont tu as besoin pour prendre une d\u00e9cision \u00e9clair\u00e9e.",
    whatToCheckHeading: "Que v\u00e9rifier sur un {make} d\u2019occasion",
    whatToCheckSub:
      "D\u00e9tails VIN sp\u00e9cifiques \u00e0 {make}, probl\u00e8mes de mod\u00e8le connus et historique de rappels que tout acheteur devrait v\u00e9rifier.",
    cardDecoding: "D\u00e9coder un VIN {make}",
    cardCommonIssues: "Probl\u00e8mes courants de {make} \u00e0 v\u00e9rifier",
    cardRecallHistory: "Historique de rappels {make}",
    cardBuyingTip: "Acheter un {make} d\u2019occasion",
    reportIncludedHeading: "Ce qu\u2019inclut un rapport VIN de {make}",
    reportIncludedSub: "Tout ce que tu as besoin de savoir sur tout v\u00e9hicule {make}",
    feature1Title: "D\u00e9codage VIN instantan\u00e9",
    feature1Desc: "D\u00e9code n\u2019importe quel VIN en moins de 60\u00a0secondes",
    feature2Title: "Sp\u00e9cifications compl\u00e8tes",
    feature2Desc: "Moteur, transmission, transmission int\u00e9grale et plus",
    feature3Title: "Historique du v\u00e9hicule",
    feature3Desc: "Propri\u00e9t\u00e9, accidents et dossiers de titre",
    feature4Title: "Alertes de rappels",
    feature4Desc: "Rappels ouverts et campagnes de s\u00e9curit\u00e9",
    popularHeading: "Mod\u00e8les populaires de {make} \u00e0 v\u00e9rifier par VIN",
    popularSub: "Lance une v\u00e9rification VIN sur l\u2019un de ces mod\u00e8les populaires de {make}",
    howToHeading: "Comment v\u00e9rifier un num\u00e9ro VIN {make}",
    step1Title: "Trouve le VIN",
    step1Desc:
      "Localise le VIN de 17 caract\u00e8res sur ton {make}. V\u00e9rifie-le sur le tableau de bord c\u00f4t\u00e9 conducteur, l\u2019autocollant du cadre de porte, l\u2019immatriculation ou le titre.",
    step2Title: "Saisis le VIN ci-dessus",
    step2Desc:
      "Tape ou colle le VIN dans la bo\u00eete de recherche ci-dessus. Assure-toi de saisir correctement les 17 caract\u00e8res.",
    step3Title: "Re\u00e7ois ton rapport",
    step3Desc:
      "Consulte instantan\u00e9ment ton rapport complet du v\u00e9hicule {make} \u2014 incluant sp\u00e9cifications, photos, valeurs de march\u00e9 et historique.",
    otherBrandsHeading: "V\u00e9rifie d\u2019autres marques de v\u00e9hicules",
    otherBrandsCta: "Voir toutes les marques",
    sourcesHeading: "Donn\u00e9es VIN {make} \u2014 Sources et r\u00e9f\u00e9rences",
    sourcesIntro:
      "Chaque affirmation de cette page de v\u00e9rification VIN {make} renvoie \u00e0 une source publique et autoris\u00e9e. Les agences list\u00e9es ci-dessous sont les origines primaires des donn\u00e9es derri\u00e8re les dossiers de titre, rappels, vols et accidents {make} aux \u00c9tats-Unis.",
    sourcesFootnote:
      "Les donn\u00e9es VIN {make} sont crois\u00e9es avec NMVTIS, NHTSA, NICB et les assureurs licenci\u00e9s au moment de chaque recherche. {make} a \u00e9t\u00e9 fond\u00e9 en {founded} en {country}.",
    faqHeading: "V\u00e9rification VIN {make} \u2014 Questions fr\u00e9quentes",
    ctaHeading: "Pr\u00eat \u00e0 v\u00e9rifier ton VIN {make}\u00a0?",
    ctaSub: "Obtiens un acc\u00e8s instantan\u00e9 \u00e0 ton rapport complet du v\u00e9hicule",
  },

  // ── /license-plate-lookup ───────────────────────────────────────
  licensePlate: {
    metaTitle: "Recherche VIN par plaque \u2014 Gratuit, 50 \u00e9tats",
    metaDescription:
      "Recherche gratuite plaque vers VIN pour les 50 \u00e9tats des \u00c9tats-Unis. Saisis une plaque pour obtenir le VIN, l\u2019ann\u00e9e, la marque, le mod\u00e8le et le rapport complet d\u2019historique du v\u00e9hicule.",
    heroEyebrow: "Plaque vers VIN, 50 \u00e9tats",
    heroHeadline: "Recherche VIN par plaque",
    heroSub:
      "Saisis n\u2019importe quel num\u00e9ro de plaque am\u00e9ricaine et l\u2019\u00e9tat pour trouver instantan\u00e9ment le VIN du v\u00e9hicule \u2014 puis consulte le rapport complet d\u2019historique\u00a0: marques de titre, accidents, relev\u00e9s d\u2019odom\u00e8tre et rappels actifs. Gratuit dans les 50 \u00e9tats.",
    searchHeading: "Recherche un v\u00e9hicule par plaque",
    searchSub:
      "Saisis le num\u00e9ro de plaque et l\u2019\u00e9tat \u00e9metteur. Nous renvoyons le VIN, l\u2019ann\u00e9e, la marque, le mod\u00e8le et l\u2019historique complet du v\u00e9hicule.",
    whatYouGetHeading: "Ce que tu obtiens avec la recherche par plaque",
    whatYouGetBullets: [
      "Le VIN de 17 caract\u00e8res associ\u00e9 \u00e0 la plaque",
      "Ann\u00e9e, marque, mod\u00e8le, version",
      "Style de carrosserie et couleur",
      "Moteur et transmission",
      "Rappels de s\u00e9curit\u00e9 NHTSA actifs",
      "Optionnel\u00a0: rapport complet d\u2019historique soutenu par NMVTIS",
    ],
    dppaHeading: "Ce que nous ne retournons pas (conformit\u00e9 DPPA)",
    dppaBody:
      "En vertu de la loi f\u00e9d\u00e9rale am\u00e9ricaine sur la protection de la vie priv\u00e9e du conducteur (18 U.S.C. \u00a7 2721), nous ne pouvons pas retourner le nom du propri\u00e9taire, l\u2019adresse, le t\u00e9l\u00e9phone ni aucune donn\u00e9e d\u2019identification personnelle. Nous retournons uniquement des donn\u00e9es du v\u00e9hicule \u2014 jamais de donn\u00e9es personnelles.",
    sourcesHeading: "Recherche plaque vers VIN \u2014 Sources et r\u00e9f\u00e9rences",
    sourcesIntro:
      "Les recherches de plaques aux \u00c9tats-Unis sont r\u00e9gies par une loi f\u00e9d\u00e9rale sur la vie priv\u00e9e (la Driver\u2019s Privacy Protection Act) et les r\u00e8gles \u00e9tatiques du DMV. Les agences ci-dessous sont les sources autoris\u00e9es derri\u00e8re chaque affirmation de cette page.",
    ctaHeading: "Pas de plaque\u00a0? Recherche par VIN.",
    ctaSub:
      "Un VIN de 17 caract\u00e8res te donne l\u2019historique le plus exact et complet. Tu le trouves sur le tableau de bord, dans le cadre de la porte conducteur ou sur la carte d\u2019immatriculation.",
    ctaButton: "Lancer la v\u00e9rification VIN gratuite",
  },
};
