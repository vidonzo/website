import type { UiStrings } from './types';

export const fr: UiStrings = {
  nav: {
    features: 'Fonctions',
    download: 'Télécharger',
    blog: 'Blog',
    help: 'Aide',
    support: 'Support',
  },

  common: {
    skipToContent: 'Aller au contenu',
    menu: 'Menu',
    close: 'Fermer',
    language: 'Langue',
    changeLanguage: 'Changer de langue',
    readMore: 'Lire la suite',
    minRead: 'min de lecture',
    onThisPage: 'Sur cette page',
    related: 'À lire aussi',
    published: 'Publié',
    updated: 'Mis à jour',
    viewAll: 'Tout voir',
    comingSoon: 'Bientôt',
    backTo: 'Retour à',
    breadcrumb: 'Fil d’Ariane',
    home: 'Accueil',
    translationPendingTitle: 'Pas encore traduit',
    translationPendingBody: 'Cet article n’a pas encore été traduit dans votre langue : vous lisez donc l’original en anglais.',
  },

  home: {
    eyebrow: 'Lecteur IPTV multiplateforme',
    title: 'Votre playlist,',
    titleAccent: 'enfin cinématographique',
    lead: 'Vidonzo transforme n’importe quelle playlist Xtream ou M3U en véritable bibliothèque : TV en direct, films et séries avec jaquettes, un vrai guide des programmes et des téléchargements hors connexion. Sur votre téléphone, votre téléviseur, votre ordinateur et votre tablette.',
    primaryCta: 'Télécharger Vidonzo',
    secondaryCta: 'Voir ce qu’il fait',
    shotHero: 'La liste des chaînes en direct de Vidonzo sur un iPhone, avec les logos, les filtres de catégorie et les favoris.',
    shotHome: 'L’écran d’accueil de Vidonzo avec les chaînes vues récemment et une rangée de chaînes en direct.',
    shotSettings: 'Les réglages de Vidonzo : taille du cache, style des sous-titres et décodage matériel.',
    shotLanguage: 'Vidonzo demandant quelle langue d’interface utiliser, la liste affichée en persan.',
    stats: [
      { value: '4', label: 'plateformes pour une seule app' },
      { value: '70', label: 'langues d’interface' },
      { value: '0', label: 'publicité, traceur ou abonnement' },
    ],

    featuresTitle: 'Un lecteur à la hauteur de votre bibliothèque',
    featuresLead: 'Les vraies playlists IPTV sont désordonnées et immenses. Vidonzo est conçu pour cette réalité, pas pour une démo de douze chaînes.',
    features: [
      {
        title: 'Direct avec un vrai guide',
        body: 'EPG XMLTV et Xtream analysé avec les bons fuseaux horaires : « ce qui passe maintenant » est réellement juste.',
      },
      {
        title: 'Films et séries, pas des noms de fichiers',
        body: 'Jaquettes, notes, résumés et distribution. Saisons et épisodes rangés comme il se doit.',
      },
      {
        title: 'Une lecture qui encaisse votre connexion',
        body: 'Moteur libmpv avec décodage matériel, cache réglable et reprise automatique quand le flux tombe.',
      },
      {
        title: 'Regarder hors connexion',
        body: 'Téléchargez films et épisodes avec pause et reprise, puis regardez sans aucune connexion.',
      },
      {
        title: 'Reprend où vous en étiez',
        body: 'Reprise de lecture, favoris triés par ajout récent, et recherche dans toute la bibliothèque d’un coup.',
      },
      {
        title: 'Contrôle complet de la lecture',
        body: 'Pistes audio et sous-titres, vitesse de lecture, format d’image et avance avec tampon visible.',
      },
    ],

    remoteEyebrow: 'Ce que les autres n’ont pas',
    remoteTitle: 'Votre téléphone est la télécommande',
    remoteLead: 'Associez un téléphone, une tablette, un ordinateur ou une montre connectée à Vidonzo sur votre téléviseur via le réseau local. Parcourez la bibliothèque du téléviseur depuis l’appareil déjà dans votre main et lancez la lecture d’une seule touche.',
    remotePoints: [
      'Cherchez et parcourez la bibliothèque du téléviseur sur votre téléphone',
      'Choisissez la suite sans interrompre l’écran',
      'Pavé tactile et clavier du téléphone pour écrire sur le téléviseur',
      'Détection automatique sur votre réseau — aucun code à saisir',
    ],
    remoteCta: 'Comment se fait l’association',

    setupTitle: 'Opérationnel en trois étapes',
    setupLead: 'Aucun compte n’est nécessaire pour commencer. Apportez la playlist que vous avez déjà.',
    steps: [
      {
        title: 'Installez Vidonzo',
        body: 'Depuis Google Play, l’App Store, ou un APK direct pour les appareils Android TV.',
      },
      {
        title: 'Ajoutez votre playlist',
        body: 'Identifiants Xtream Codes, un lien M3U ou M3U8, ou un fichier M3U déjà présent sur l’appareil.',
      },
      {
        title: 'Regardez',
        body: 'Vidonzo charge le catalogue, associe jaquettes et guide, et retient où vous vous êtes arrêté.',
      },
    ],

    privacyEyebrow: 'Confidentialité',
    privacyTitle: 'Vos identifiants ne regardent personne',
    privacyLead: 'Vidonzo est un lecteur, pas un service de contenu. Il ne vous vend pas de chaînes et n’a pas besoin de savoir ce que vous regardez.',
    privacyPoints: [
      {
        title: 'Identifiants chiffrables de bout en bout',
        body: 'Les identifiants de playlist peuvent être chiffrés sur votre appareil avant d’atteindre la synchronisation.',
      },
      {
        title: 'Ni publicité ni traceurs',
        body: 'Rien dans l’application n’est financé en vous regardant l’utiliser.',
      },
      {
        title: 'Fonctionne entièrement hors ligne',
        body: 'Un fichier M3U local et des épisodes téléchargés n’ont besoin d’aucun serveur.',
      },
    ],

    platformsTitle: 'Une application, tous les écrans',
    platformsLead: 'Une seule base de code adaptée à chaque appareil : barre inférieure sur téléphone, rail latéral sur téléviseur et ordinateur, navigation à la télécommande partout.',

    faqTitle: 'Les questions qu’on nous pose vraiment',
    faq: [
      {
        question: 'Vidonzo fournit-il des chaînes ?',
        answer:
          'Non. Vidonzo n’est qu’un lecteur. Vous apportez votre propre compte Xtream Codes, votre lien M3U ou votre fichier M3U, exactement comme avec tout autre lecteur IPTV.',
      },
      {
        question: 'Est-ce gratuit ?',
        answer: 'Oui. Pas d’abonnement, pas de publicité, et aucune version payante qui verrouille des fonctions de lecture.',
      },
      {
        question: 'Quels formats de playlist sont pris en charge ?',
        answer:
          'Xtream Codes (hôte, identifiant et mot de passe), les liens M3U et M3U8 distants, et les fichiers M3U locaux stockés sur votre appareil.',
      },
      {
        question: 'Puis-je regarder sur mon téléviseur ?',
        answer:
          'Oui. Une version dédiée Android TV existe, avec navigation complète à la télécommande, et tout téléphone, tablette, ordinateur ou montre du même réseau peut lui servir de télécommande.',
      },
      {
        question: 'Cela fonctionne-t-il sans connexion internet ?',
        answer:
          'Les films et épisodes téléchargés se lisent hors ligne, et les fichiers M3U locaux n’exigent aucune connexion. La télévision en direct requiert naturellement toujours l’accès à votre fournisseur.',
      },
      {
        question: 'Mes identifiants de playlist sont-ils en sécurité ?',
        answer:
          'Vidonzo est conçu pour que les identifiants sensibles puissent être chiffrés de bout en bout sur votre appareil. La synchronisation cloud ne conserve que le nécessaire pour garder vos appareils alignés.',
      },
    ],

    ctaTitle: 'Apportez votre playlist. Gardez votre vie privée.',
    ctaLead: 'Gratuit, sur chaque écran que vous possédez.',
  },

  features: {
    title: 'Fonctions',
    lead: 'Tout ce que fait Vidonzo, regroupé selon ce pour quoi vous êtes réellement venu.',
    groups: [
      {
        title: 'Faire entrer vos contenus',
        lead: 'Trois portes d’entrée, et rien d’autre à configurer.',
        items: [
          { title: 'Xtream Codes', body: 'Hôte, identifiant et mot de passe. Direct, films et séries arrivent ensemble.' },
          { title: 'Liens M3U et M3U8', body: 'N’importe quelle URL de playlist, rechargée et mise en cache au fil des changements.' },
          { title: 'Fichiers M3U locaux', body: 'Une playlist déjà sur votre appareil, sans le moindre serveur.' },
          { title: 'Plusieurs sources', body: 'Gardez plusieurs fournisseurs côte à côte et basculez entre eux.' },
        ],
      },
      {
        title: 'Regarder',
        lead: 'Bâti sur libmpv, le moteur qui lit ce sur quoi les autres calent.',
        items: [
          { title: 'Décodage matériel', body: 'Une lecture fluide qui n’épuise pas la batterie.' },
          { title: 'Reprise automatique', body: 'Un flux coupé se reconnecte au lieu de vous renvoyer à la liste.' },
          { title: 'Cache réglable', body: 'Arbitrez entre latence et stabilité selon votre connexion.' },
          { title: 'Pistes et vitesse', body: 'Choix audio et sous-titres, vitesse de lecture, format d’image.' },
          { title: 'Avance avec tampon', body: 'Voyez exactement ce qui est chargé avant de vous déplacer.' },
        ],
      },
      {
        title: 'Retrouver ses contenus',
        lead: 'Une playlist de vingt mille chaînes ne sert que si l’on peut s’y déplacer.',
        items: [
          { title: 'Recherche globale', body: 'Direct, films et séries cherchés ensemble dans un seul champ.' },
          { title: 'Guide des programmes', body: 'EPG XMLTV et Xtream avec une gestion correcte des fuseaux horaires.' },
          { title: 'Reprise de lecture', body: 'Points de reprise conservés par source et par titre.' },
          { title: 'Favoris', body: 'Triés par ajout le plus récent, accessibles depuis partout.' },
          { title: 'Structure des séries', body: 'Saisons et épisodes avec métadonnées, pas une liste plate de fichiers.' },
        ],
      },
      {
        title: 'Loin du réseau',
        lead: 'Des téléchargements qui se comportent comme tels.',
        items: [
          { title: 'Téléchargement hors ligne', body: 'Mettez films et épisodes de côté pour plus tard.' },
          { title: 'Pause et reprise', body: 'Le transfert par plages survit à une coupure ou à la fermeture de l’app.' },
          { title: 'Stockage maîtrisé', body: 'Voyez ce qui est conservé et supprimez-le quand vous avez fini.' },
        ],
      },
      {
        title: 'Sur le téléviseur',
        lead: 'Une version TV, pas une app mobile étirée sur un grand écran.',
        items: [
          { title: 'Navigation à la télécommande', body: 'Chaque contrôle atteignable à la télécommande, avec un focus visible.' },
          { title: 'Rail latéral', body: 'L’interface s’adapte à l’écran au lieu de simplement grossir.' },
          { title: 'Téléphone en télécommande', body: 'Parcourez, cherchez, mettez en file et tapez depuis votre appareil.' },
          { title: 'Contrôle à la montre', body: 'Commandes de lecture de base au poignet.' },
          { title: 'Détection automatique', body: 'Les appareils trouvent seuls le téléviseur sur le réseau local.' },
        ],
      },
      {
        title: 'Confidentialité et synchronisation',
        lead: 'Le multi-appareil sans céder l’accès à votre fournisseur.',
        items: [
          { title: 'Identifiants chiffrables', body: 'Les identifiants de playlist peuvent être chiffrés de bout en bout sur l’appareil.' },
          { title: 'Prise en charge du proxy', body: 'Faites passer les requêtes par un proxy quand votre réseau l’exige.' },
          { title: 'Sans publicité dans l’app', body: 'L’app n’a aucun SDK publicitaire ni suivi comportemental.' },
          { title: '70 langues d’interface', body: 'Y compris une mise en page complète de droite à gauche pour le persan, l’arabe et l’hébreu.' },
        ],
      },
    ],
  },

  download: {
    title: 'Télécharger',
    lead: 'Installez Vidonzo depuis le canal adapté à chaque appareil. Gratuit, sans compte requis.',
    recommendedFor: 'Recommandé pour votre appareil',
    otherPlatforms: 'Toutes les plateformes',
    googlePlay: 'Disponible sur Google Play',
    appStore: 'Télécharger dans l’App Store',
    directApk: 'APK direct',
    androidMobile: 'Téléphone et tablette Android',
    androidMobileNote: 'Installez depuis Google Play, ou téléchargez directement le dernier APK mobile.',
    androidTv: 'Android TV',
    androidTvNote: 'APK direct pour les appareils Android TV. À installer manuellement ou depuis une clé USB.',
    iphone: 'iPhone et iPad',
    iphoneNote: 'Installation depuis l’App Store sur iOS et iPadOS.',
    macos: 'macOS',
    macosNote: 'La version bureau sortira dès que le paquet macOS sera signé et notarisé.',
    windows: 'Windows',
    windowsNote: 'L’installateur Windows sortira en même temps que le paquet bureau.',
    comingSoon: 'Bientôt',
    helpTitle: 'Bloqué à l’installation ?',
    helpLead: 'L’installation manuelle sur Android TV et l’ajout de votre première playlist ont chacun un guide pas à pas.',
    apkGateTitle: 'Réservé aux testeurs, pour l’instant',
    apkGateBody: 'Les APK directs sont réservés aux testeurs le temps de finaliser la prochaine version. Saisissez le code d’accès pour continuer.',
    apkGateLabel: 'Code d’accès',
    apkGateSubmit: 'Continuer',
    apkGateError: 'Ce code n’est pas le bon. Vérifiez-le et réessayez.',
  },

  blog: {
    title: 'Blog',
    lead: 'Guides, notes de version et coulisses du développement de Vidonzo.',
    empty: 'Aucun article dans cette langue pour l’instant.',
    allTags: 'Tous les sujets',
    taggedWith: 'Sujet',
    latest: 'Derniers articles',
  },

  help: {
    title: 'Centre d’aide',
    lead: 'Configuration, playlists, installation sur téléviseur, et quoi faire quand rien ne se lance.',
    empty: 'Aucun guide dans cette langue pour l’instant.',
    stillStuck: 'Toujours bloqué ?',
    stillStuckLead: 'Écrivez au support en précisant l’appareil, le type de playlist et ce que vous avez vu.',
  },

  support: {
    title: 'Support',
    lead: 'Besoin d’aide pour la configuration, l’import de playlist, la connexion TV ou la récupération de compte ?',
    cta: 'support@vidonzo.com',
    responseNote: 'Nous répondons dans l’ordre d’arrivée, généralement sous quelques jours.',
    beforeTitle: 'Avant d’écrire',
    beforeLead: 'La plupart des questions trouvent déjà réponse dans le centre d’aide — et si ce n’est pas le cas de la vôtre, ces détails accélèrent la réponse.',
    beforePoints: [
      'Quel appareil et quelle version de Vidonzo',
      'Xtream, lien M3U, ou fichier local',
      'Ce que vous attendiez, et ce qui s’est passé à la place',
    ],
    followTitle: 'Ailleurs',
  },

  legal: {
    privacy: 'Politique de confidentialité',
    terms: 'Conditions d’utilisation',
    accountDeletion: 'Suppression du compte et des données',
  },

  notFound: {
    title: 'Cette page n’est plus à l’antenne',
    lead: 'Le lien est cassé ou la page a déménagé. En général, c’est la page de téléchargement ou le centre d’aide que l’on cherchait.',
    cta: 'Retour à l’accueil',
  },

  footer: {
    tagline: 'Un lecteur IPTV multiplateforme et respectueux de la vie privée, pour les playlists Xtream et M3U.',
    product: 'Produit',
    resources: 'Ressources',
    legal: 'Mentions légales',
    follow: 'Suivre',
    rights: 'Tous droits réservés.',
  },
};
