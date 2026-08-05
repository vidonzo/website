export const it = {
  nav: {
    features: 'Funzioni',
    download: 'Download',
    blog: 'Blog',
    help: 'Aiuto',
    support: 'Assistenza',
  },

  common: {
    skipToContent: 'Vai al contenuto',
    menu: 'Menu',
    close: 'Chiudi',
    language: 'Lingua',
    changeLanguage: 'Cambia lingua',
    readMore: 'Leggi di più',
    minRead: 'min di lettura',
    onThisPage: 'In questa pagina',
    related: 'Da leggere anche',
    published: 'Pubblicato',
    updated: 'Aggiornato',
    viewAll: 'Vedi tutto',
    comingSoon: 'In arrivo',
    backTo: 'Torna a',
    breadcrumb: 'Percorso di navigazione',
    home: 'Home',
    translationPendingTitle: 'Non ancora tradotto',
    translationPendingBody: "Questo articolo non è ancora stato tradotto nella tua lingua, quindi stai leggendo l'originale in inglese.",
  },

  home: {
    eyebrow: 'Lettore IPTV multipiattaforma',
    title: 'La tua playlist,',
    titleAccent: 'finalmente cinematografica',
    lead: "Vidonzo trasforma qualsiasi playlist Xtream o M3U in una vera libreria di streaming: TV in diretta, film e serie con locandine, una guida ai programmi completa e download offline. Sul telefono, sul televisore, sul computer e sul tablet.",
    primaryCta: 'Scarica Vidonzo',
    secondaryCta: 'Scopri cosa fa',
    shotHero: 'La lista dei canali in diretta di Vidonzo su un iPhone, con loghi dei canali, filtri per categoria e preferiti.',
    shotHome: 'La schermata iniziale di Vidonzo con i canali visti di recente e una riga di canali in diretta.',
    shotSettings: 'Le impostazioni di Vidonzo: dimensione del buffer, stile dei sottotitoli e decodifica hardware.',
    shotLanguage: "Vidonzo chiede quale lingua dell'interfaccia usare, con l'elenco mostrato in persiano.",
    stats: [
      { value: '4', label: 'piattaforme da una sola app' },
      { value: '70', label: "lingue dell'interfaccia" },
      { value: '0', label: 'pubblicità, tracker o abbonamenti' },
    ],

    featuresTitle: "Un lettore all'altezza della tua libreria",
    featuresLead: 'Le vere playlist IPTV sono caotiche ed enormi. Vidonzo è progettato per questa realtà, non per una demo di dodici canali.',
    features: [
      {
        title: 'Diretta con una guida vera',
        body: 'EPG XMLTV e Xtream analizzato con i fusi orari corretti, così "cosa c\'è ora" è davvero preciso.',
      },
      {
        title: 'Film e serie, non nomi di file',
        body: 'Locandine, valutazioni, trame e cast. Stagioni ed episodi organizzati come ti aspetti.',
      },
      {
        title: 'Una riproduzione che regge la tua connessione',
        body: 'Il motore libmpv con decodifica hardware, cache regolabile e ripristino automatico quando un flusso cade.',
      },
      {
        title: 'Guarda offline',
        body: 'Scarica film ed episodi con pausa e ripresa, poi guardali senza alcuna connessione.',
      },
      {
        title: 'Riprende da dove avevi lasciato',
        body: "Continua a guardare, preferiti ordinati per aggiunta più recente e ricerca in tutta la libreria in una volta sola.",
      },
      {
        title: 'Controllo completo della riproduzione',
        body: "Tracce audio e sottotitoli, velocità di riproduzione, proporzioni dell'immagine e avanzamento con buffer visibile.",
      },
    ],

    remoteEyebrow: 'Quella che nessun altro ha',
    remoteTitle: 'Il tuo telefono è il telecomando',
    remoteLead: "Abbina un telefono, un tablet, un computer o uno smartwatch a Vidonzo sul televisore tramite la rete locale. Sfoglia la libreria del televisore dal dispositivo che hai già in mano e avvia la riproduzione con un tocco.",
    remotePoints: [
      'Cerca e sfoglia la libreria del televisore dal telefono',
      "Metti in coda cosa riprodurre dopo senza interrompere lo schermo",
      'Trackpad e tastiera del telefono per scrivere sul televisore',
      'Rilevato automaticamente sulla tua rete, senza codici da digitare',
    ],
    remoteCta: "Come funziona l'abbinamento",

    setupTitle: 'Operativo in tre passi',
    setupLead: 'Nessun account necessario per iniziare a guardare. Porta la playlist che hai già.',
    steps: [
      {
        title: 'Installa Vidonzo',
        body: "Da Google Play, dall'App Store o con un APK diretto per i box Android TV.",
      },
      {
        title: 'Aggiungi la tua playlist',
        body: 'Credenziali Xtream Codes, un link M3U o M3U8, oppure un file M3U già presente sul dispositivo.',
      },
      {
        title: 'Inizia a guardare',
        body: 'Vidonzo carica il catalogo, abbina locandine e guida e ricorda dove ti eri fermato.',
      },
    ],

    privacyEyebrow: 'Privacy',
    privacyTitle: 'Le tue credenziali non riguardano nessun altro',
    privacyLead: 'Vidonzo è un lettore, non un servizio di contenuti. Non ti vende canali e non ha bisogno di sapere cosa guardi.',
    privacyPoints: [
      {
        title: 'Credenziali cifrabili end-to-end',
        body: 'Gli accessi alle playlist possono essere cifrati sul tuo dispositivo prima ancora di raggiungere la sincronizzazione.',
      },
      {
        title: 'Nessun SDK pubblicitario nell\'app',
        body: "Niente nell'app è finanziato osservando il tuo utilizzo.",
      },
      {
        title: 'Funziona completamente offline',
        body: 'Un file M3U locale e gli episodi scaricati non richiedono alcun server.',
      },
    ],

    platformsTitle: 'Una sola app, ogni schermo',
    platformsLead: 'Un unico codice sorgente, adattato a ogni dispositivo: barra inferiore sul telefono, barra laterale su televisore e computer, navigazione con D-pad ovunque.',

    faqTitle: 'Le domande che la gente fa davvero',
    faq: [
      {
        question: 'Vidonzo include dei canali?',
        answer:
          'No. Vidonzo è soltanto un lettore. Porti il tuo account Xtream Codes, il tuo link M3U o il tuo file M3U, esattamente come faresti con qualsiasi altro lettore IPTV.',
      },
      {
        question: 'È gratuito?',
        answer:
          'Sì. Non ci sono abbonamenti, pubblicità né versioni a pagamento che bloccano le funzioni di riproduzione.',
      },
      {
        question: 'Quali formati di playlist funzionano?',
        answer:
          'Xtream Codes (host, nome utente e password), i link M3U e M3U8 remoti e i file M3U locali salvati sul tuo dispositivo.',
      },
      {
        question: 'Posso guardare sul mio televisore?',
        answer:
          "Sì. C'è una versione dedicata per Android TV con navigazione tramite D-pad, e qualsiasi telefono, tablet, computer o smartwatch sulla stessa rete può fungere da telecomando.",
      },
      {
        question: 'Funziona senza connessione a internet?',
        answer:
          'I film e gli episodi scaricati si riproducono offline, e i file M3U locali non richiedono alcuna connessione. La TV in diretta, naturalmente, richiede comunque che il tuo provider sia raggiungibile.',
      },
      {
        question: 'Le mie credenziali della playlist sono al sicuro?',
        answer:
          'Vidonzo è progettato in modo che le credenziali sensibili della playlist possano essere cifrate end-to-end sul tuo dispositivo. La sincronizzazione cloud memorizza solo ciò che serve a mantenere allineati i tuoi dispositivi.',
      },
    ],

    ctaTitle: 'Porta la tua playlist. Mantieni la tua privacy.',
    ctaLead: 'Gratis, su ogni schermo che possiedi.',
  },

  features: {
    title: 'Funzioni',
    lead: 'Tutto ciò che fa Vidonzo, raggruppato in base a ciò per cui sei davvero qui.',
    groups: [
      {
        title: 'Importare i tuoi contenuti',
        lead: 'Tre modi per entrare, e nient\'altro da configurare.',
        items: [
          { title: 'Xtream Codes', body: 'Host, nome utente e password. Diretta, VOD e serie arrivano insieme.' },
          { title: 'Link M3U e M3U8', body: 'Qualsiasi URL di playlist remota, riscaricata e messa in cache man mano che cambia.' },
          { title: 'File M3U locali', body: 'Una playlist già sul tuo dispositivo, senza alcun server.' },
          { title: 'Più sorgenti', body: 'Tieni più provider affiancati e passa dall\'uno all\'altro.' },
        ],
      },
      {
        title: 'Guardare',
        lead: 'Costruito su libmpv, il motore che riproduce ciò su cui gli altri lettori si bloccano.',
        items: [
          { title: 'Decodifica hardware', body: 'Una riproduzione fluida che non prosciuga la batteria.' },
          { title: 'Ripristino automatico', body: 'Un flusso caduto si riconnette invece di rimandarti a una lista.' },
          { title: 'Cache regolabile', body: 'Bilancia latenza e stabilità in base alla tua connessione.' },
          { title: 'Tracce e velocità', body: "Selezione di audio e sottotitoli, velocità di riproduzione, proporzioni dell'immagine." },
          { title: 'Avanzamento con buffer', body: 'Vedi esattamente quanto è stato caricato prima di spostarti.' },
        ],
      },
      {
        title: 'Trovare le cose',
        lead: 'Una playlist da ventimila canali è utile solo se riesci a muovertici dentro.',
        items: [
          { title: 'Ricerca globale', body: 'Diretta, film e serie cercati insieme in un unico campo.' },
          { title: 'Guida ai programmi', body: 'EPG XMLTV e Xtream con una gestione corretta dei fusi orari.' },
          { title: 'Continua a guardare', body: 'Punti di ripresa conservati per sorgente e per elemento.' },
          { title: 'Preferiti', body: 'Ordinati per aggiunta più recente, raggiungibili da qualsiasi punto.' },
          { title: 'Struttura delle serie', body: 'Stagioni ed episodi con metadati, non una lista piatta di file.' },
        ],
      },
      {
        title: 'Lontano dalla rete',
        lead: 'Download che si comportano da download.',
        items: [
          { title: 'Download offline', body: 'Film ed episodi salvati per dopo.' },
          { title: 'Pausa e ripresa', body: "I trasferimenti a intervalli sopravvivono a una connessione persa o a un'app chiusa." },
          { title: 'Spazio gestito', body: 'Vedi cosa è archiviato e rimuovilo quando hai finito.' },
        ],
      },
      {
        title: 'Sul televisore',
        lead: 'Una versione per TV, non un\'app per telefono allargata su un grande schermo.',
        items: [
          { title: 'Navigazione con D-pad', body: 'Ogni comando raggiungibile dal telecomando, con focus visibile.' },
          { title: 'Layout a barra laterale', body: "L'interfaccia si adatta allo schermo invece di limitarsi a ingrandirsi." },
          { title: 'Telefono come telecomando', body: 'Sfoglia, cerca, metti in coda e scrivi dal dispositivo che hai in mano.' },
          { title: 'Controllo da smartwatch', body: 'Controllo di base della riproduzione dal polso.' },
          { title: 'Rilevamento automatico', body: 'I dispositivi trovano da soli il televisore sulla rete locale.' },
        ],
      },
      {
        title: 'Privacy e sincronizzazione',
        lead: 'Il multi-dispositivo senza cedere l\'accesso al tuo provider.',
        items: [
          { title: 'Credenziali cifrabili', body: 'Gli accessi alle playlist possono essere cifrati end-to-end sul dispositivo.' },
          { title: 'Supporto proxy', body: 'Instrada le richieste attraverso un proxy quando la tua rete lo richiede.' },
          { title: 'Nessuna pubblicità nell\'app', body: "L'app non ha SDK pubblicitari né tracciamento comportamentale." },
          { title: "70 lingue dell'interfaccia", body: 'Incluso il layout completo da destra a sinistra per persiano, arabo ed ebraico.' },
        ],
      },
    ],
  },

  download: {
    title: 'Download',
    lead: 'Installa Vidonzo dal canale giusto per ogni dispositivo. Gratis, senza account richiesto.',
    recommendedFor: 'Consigliato per il tuo dispositivo',
    otherPlatforms: 'Tutte le piattaforme',
    googlePlay: 'Scaricalo su Google Play',
    appStore: "Scarica dall'App Store",
    directApk: 'APK diretto',
    androidMobile: 'Telefono e tablet Android',
    androidMobileNote: "Installa da Google Play, oppure scarica direttamente l'ultimo APK per dispositivi mobili.",
    androidTv: 'Android TV',
    androidTvNote: 'APK diretto per box Android TV e installazioni pensate per la TV. Installalo manualmente o da una chiavetta USB.',
    iphone: 'iPhone e iPad',
    iphoneNote: "Installazione dall'App Store su iOS e iPadOS.",
    macos: 'macOS',
    macosNote: 'La versione desktop uscirà non appena il pacchetto macOS sarà firmato e autenticato.',
    windows: 'Windows',
    windowsNote: "L'installer per Windows uscirà insieme al pacchetto desktop.",
    comingSoon: 'In arrivo',
    helpTitle: "Bloccato durante l'installazione?",
    helpLead: "L'installazione manuale su Android TV e l'aggiunta della tua prima playlist hanno entrambe una guida passo passo.",
    apkGateTitle: 'Per ora solo per i tester',
    apkGateBody: 'Gli APK diretti sono riservati ai tester mentre completiamo la prossima versione. Inserisci il codice di accesso per continuare.',
    apkGateLabel: 'Codice di accesso',
    apkGateSubmit: 'Continua',
    apkGateError: 'Questo codice non è corretto. Controllalo e riprova.',
  },

  blog: {
    title: 'Blog',
    lead: 'Guide, note di rilascio e appunti su come è costruito Vidonzo.',
    empty: 'Ancora nessun articolo in questa lingua.',
    allTags: 'Tutti gli argomenti',
    taggedWith: 'Argomento',
    latest: 'Ultimi',
  },

  help: {
    title: 'Centro assistenza',
    lead: 'Configurazione, playlist, installazioni su TV e cosa fare quando qualcosa non parte.',
    empty: 'Ancora nessuna guida in questa lingua.',
    stillStuck: 'Ancora bloccato?',
    stillStuckLead: "Scrivi all'assistenza indicando il dispositivo, il tipo di playlist e cosa hai visto.",
  },

  support: {
    title: 'Assistenza',
    lead: "Ti serve aiuto con la configurazione, l'importazione della playlist, l'accesso su TV o il recupero dell'account?",
    cta: 'support@vidonzo.com',
    responseNote: "Rispondiamo nell'ordine in cui arrivano i messaggi, di solito entro un paio di giorni.",
    beforeTitle: 'Prima di scrivere',
    beforeLead: "La maggior parte delle domande trova già risposta nel centro assistenza — e se la tua non c'è, questi dettagli ti fanno ottenere una risposta più rapida.",
    beforePoints: [
      'Quale dispositivo e quale versione di Vidonzo',
      'Xtream, M3U remoto o un file locale',
      'Cosa ti aspettavi e cosa è successo invece',
    ],
    followTitle: 'Altrove',
  },

  legal: {
    privacy: 'Informativa sulla privacy',
    terms: "Condizioni d'uso",
    accountDeletion: 'Eliminazione di account e dati',
  },

  notFound: {
    title: 'Questa pagina è fuori onda',
    lead: 'Il link è rotto o la pagina è stata spostata. Di solito le mete sono la pagina di download e il centro assistenza.',
    cta: 'Torna alla home',
  },

  footer: {
    tagline: 'Un lettore IPTV multipiattaforma e rispettoso della privacy per playlist Xtream e M3U.',
    product: 'Prodotto',
    resources: 'Risorse',
    legal: 'Note legali',
    follow: 'Seguici',
    rights: 'Tutti i diritti riservati.',
  },
} as const;
