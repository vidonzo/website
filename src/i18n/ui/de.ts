import type { UiStrings } from './types';

export const de: UiStrings = {
  nav: {
    features: 'Funktionen',
    download: 'Download',
    blog: 'Blog',
    help: 'Hilfe',
    support: 'Support',
  },

  common: {
    skipToContent: 'Zum Inhalt springen',
    menu: 'Menü',
    close: 'Schließen',
    language: 'Sprache',
    changeLanguage: 'Sprache ändern',
    readMore: 'Weiterlesen',
    minRead: 'Min. Lesezeit',
    onThisPage: 'Auf dieser Seite',
    related: 'Passend dazu',
    published: 'Veröffentlicht',
    updated: 'Aktualisiert',
    viewAll: 'Alle ansehen',
    comingSoon: 'Demnächst',
    backTo: 'Zurück zu',
    breadcrumb: 'Brotkrumen-Navigation',
    home: 'Startseite',
    translationPendingTitle: 'Noch nicht übersetzt',
    translationPendingBody: 'Dieser Artikel wurde noch nicht in deine Sprache übersetzt – du liest daher das englische Original.',
  },

  home: {
    eyebrow: 'Plattformübergreifender IPTV-Player',
    title: 'Deine Playlist,',
    titleAccent: 'endlich kinoreif',
    lead: 'Vidonzo macht aus jeder Xtream- oder M3U-Playlist eine echte Streaming-Mediathek – Live-TV, Filme und Serien mit Cover-Artwork, einer richtigen Programmvorschau und Offline-Downloads. Auf deinem Smartphone, deinem Fernseher, deinem Desktop und deinem Tablet.',
    primaryCta: 'Vidonzo herunterladen',
    secondaryCta: 'Sieh, was drinsteckt',
    shotHero: 'Die Live-Senderliste von Vidonzo auf einem iPhone, mit Senderlogos, Kategoriefiltern und Favoriten.',
    shotHome: 'Der Startbildschirm von Vidonzo mit kürzlich gesehenen Sendern und einer Reihe an Live-Sendern.',
    shotSettings: 'Die Vidonzo-Einstellungen: Puffergröße, Untertitelstil und Hardware-Dekodierung.',
    shotLanguage: 'Vidonzo fragt nach der gewünschten Oberflächensprache, die Liste ist auf Persisch.',
    stats: [
      { value: '4', label: 'Plattformen aus einer App' },
      { value: '70', label: 'Oberflächensprachen' },
      { value: '0', label: 'Werbung, Tracker oder Abos' },
    ],

    featuresTitle: 'Ein Player, der deine Mediathek ernst nimmt',
    featuresLead: 'Echte IPTV-Playlists sind chaotisch und riesig. Vidonzo ist genau für diese Realität gebaut – nicht für eine Demo mit zwölf Sendern.',
    features: [
      {
        title: 'Live-TV mit echter Programmvorschau',
        body: 'XMLTV- und Xtream-EPG mit korrekten Zeitzonen ausgewertet, damit „was läuft gerade“ auch wirklich stimmt.',
      },
      {
        title: 'Filme und Serien statt Dateinamen',
        body: 'Poster, Bewertungen, Inhaltsangaben und Besetzung. Staffeln und Folgen so sortiert, wie du es erwartest.',
      },
      {
        title: 'Wiedergabe, die deine Verbindung übersteht',
        body: 'Die libmpv-Engine mit Hardware-Dekodierung, einstellbarem Cache und automatischer Wiederherstellung, wenn ein Stream abbricht.',
      },
      {
        title: 'Offline schauen',
        body: 'Lade Filme und Folgen mit Pause und Fortsetzen herunter und schau sie dann ganz ohne Verbindung.',
      },
      {
        title: 'Macht dort weiter, wo du aufgehört hast',
        body: 'Weiterschauen, Favoriten nach Aktualität sortiert und Suche über deine gesamte Mediathek auf einen Schlag.',
      },
      {
        title: 'Volle Kontrolle über die Wiedergabe',
        body: 'Audio- und Untertitelspuren, Wiedergabegeschwindigkeit, Seitenverhältnis und Spulen mit sichtbarem Puffer.',
      },
    ],

    remoteEyebrow: 'Das, was sonst keiner hat',
    remoteTitle: 'Dein Smartphone ist die Fernbedienung',
    remoteLead: 'Verbinde Smartphone, Tablet, Desktop oder Smartwatch über das lokale Netzwerk mit Vidonzo auf deinem Fernseher. Durchstöbere die TV-Mediathek auf dem Gerät, das du ohnehin in der Hand hast, und starte die Wiedergabe mit einem Tipp.',
    remotePoints: [
      'Durchsuche und durchstöbere die TV-Mediathek auf deinem Smartphone',
      'Stelle in die Warteschlange, was als Nächstes läuft, ohne den Bildschirm zu unterbrechen',
      'Trackpad und Smartphone-Tastatur zum Tippen auf dem Fernseher',
      'Automatisch im Netzwerk gefunden – keine Codes zum Eintippen',
    ],
    remoteCta: 'So funktioniert das Koppeln',

    setupTitle: 'In drei Schritten startklar',
    setupLead: 'Kein Konto nötig, um loszuschauen. Bring einfach die Playlist mit, die du schon hast.',
    steps: [
      {
        title: 'Vidonzo installieren',
        body: 'Aus Google Play, dem App Store oder als direktes APK für Android-TV-Boxen.',
      },
      {
        title: 'Playlist hinzufügen',
        body: 'Xtream-Codes-Zugangsdaten, ein M3U- oder M3U8-Link oder eine M3U-Datei, die schon auf deinem Gerät liegt.',
      },
      {
        title: 'Losschauen',
        body: 'Vidonzo lädt den Katalog, ordnet Artwork und Programmvorschau zu und merkt sich, wo du aufgehört hast.',
      },
    ],

    privacyEyebrow: 'Datenschutz',
    privacyTitle: 'Deine Zugangsdaten gehen niemanden etwas an',
    privacyLead: 'Vidonzo ist ein Player, kein Content-Dienst. Es verkauft dir keine Sender und muss nicht wissen, was du schaust.',
    privacyPoints: [
      {
        title: 'Ende-zu-Ende-verschlüsselbare Zugangsdaten',
        body: 'Playlist-Logins können auf deinem Gerät verschlüsselt werden, bevor sie überhaupt die Synchronisierung erreichen.',
      },
      {
        title: 'Keine Werbe-SDKs in der App',
        body: 'Nichts in der App finanziert sich dadurch, dir beim Nutzen zuzusehen.',
      },
      {
        title: 'Funktioniert komplett offline',
        body: 'Eine lokale M3U-Datei und heruntergeladene Folgen brauchen überhaupt keinen Server.',
      },
    ],

    platformsTitle: 'Eine App, jeder Bildschirm',
    platformsLead: 'Eine einzige Codebasis, an jedes Gerät angepasst – eine Leiste unten auf dem Smartphone, eine Seitenleiste auf TV und Desktop, D-pad-Navigation überall.',

    faqTitle: 'Fragen, die wirklich gestellt werden',
    faq: [
      {
        question: 'Kommt Vidonzo mit Sendern?',
        answer:
          'Nein. Vidonzo ist ausschließlich ein Player. Du bringst dein eigenes Xtream-Codes-Konto, deinen M3U-Link oder deine M3U-Datei mit – genau wie bei jedem anderen IPTV-Player.',
      },
      {
        question: 'Ist es kostenlos?',
        answer:
          'Ja. Es gibt kein Abo, keine Werbung und keine kostenpflichtige Stufe, die Wiedergabefunktionen sperrt.',
      },
      {
        question: 'Welche Playlist-Formate funktionieren?',
        answer:
          'Xtream Codes (Host, Benutzername und Passwort), M3U- und M3U8-Links aus dem Netz sowie lokale M3U-Dateien auf deinem Gerät.',
      },
      {
        question: 'Kann ich auf meinem Fernseher schauen?',
        answer:
          'Ja. Es gibt eine eigene Android-TV-Version mit D-pad-Navigation, und jedes Smartphone, Tablet, jeder Desktop oder jede Smartwatch im selben Netzwerk kann als Fernbedienung dienen.',
      },
      {
        question: 'Funktioniert es ohne Internetverbindung?',
        answer:
          'Heruntergeladene Filme und Folgen laufen offline, und lokale M3U-Dateien brauchen keine Verbindung. Live-TV setzt naturgemäß weiterhin voraus, dass dein Anbieter erreichbar ist.',
      },
      {
        question: 'Sind meine Playlist-Zugangsdaten sicher?',
        answer:
          'Vidonzo ist so gebaut, dass sensible Playlist-Zugangsdaten auf deinem Gerät Ende-zu-Ende verschlüsselt werden können. Die Cloud-Synchronisierung speichert nur, was nötig ist, um deine Geräte im Gleichklang zu halten.',
      },
    ],

    ctaTitle: 'Bring deine Playlist mit. Behalt deine Privatsphäre.',
    ctaLead: 'Kostenlos, auf jedem Bildschirm, der dir gehört.',
  },

  features: {
    title: 'Funktionen',
    lead: 'Alles, was Vidonzo kann, gruppiert nach dem, weswegen du wirklich gekommen bist.',
    groups: [
      {
        title: 'Inhalte hereinholen',
        lead: 'Drei Wege hinein, und sonst nichts einzurichten.',
        items: [
          { title: 'Xtream Codes', body: 'Host, Benutzername und Passwort. Live, VOD und Serien kommen gemeinsam an.' },
          { title: 'M3U- und M3U8-Links', body: 'Jede beliebige Playlist-URL, neu geladen und zwischengespeichert, sobald sie sich ändert.' },
          { title: 'Lokale M3U-Dateien', body: 'Eine Playlist, die schon auf deinem Gerät liegt – ganz ohne Server.' },
          { title: 'Mehrere Quellen', body: 'Halte mehrere Anbieter nebeneinander bereit und wechsle zwischen ihnen.' },
        ],
      },
      {
        title: 'Schauen',
        lead: 'Gebaut auf libmpv, der Engine, die abspielt, woran andere Player scheitern.',
        items: [
          { title: 'Hardware-Dekodierung', body: 'Flüssige Wiedergabe, die den Akku nicht auffrisst.' },
          { title: 'Automatische Wiederherstellung', body: 'Ein abgebrochener Stream verbindet sich neu, statt dich zurück in die Liste zu werfen.' },
          { title: 'Einstellbarer Cache', body: 'Wäge zwischen Latenz und Stabilität ab, passend zu deiner Verbindung.' },
          { title: 'Spuren und Geschwindigkeit', body: 'Auswahl von Audio und Untertiteln, Wiedergabegeschwindigkeit, Seitenverhältnis.' },
          { title: 'Spulen mit Puffer', body: 'Sieh genau, wie viel geladen ist, bevor du springst.' },
        ],
      },
      {
        title: 'Dinge finden',
        lead: 'Eine Playlist mit zwanzigtausend Sendern nützt nur, wenn du dich darin bewegen kannst.',
        items: [
          { title: 'Globale Suche', body: 'Live, Filme und Serien gemeinsam in einem einzigen Feld durchsucht.' },
          { title: 'Programmvorschau', body: 'XMLTV- und Xtream-EPG mit korrekter Zeitzonen-Behandlung.' },
          { title: 'Weiterschauen', body: 'Fortsetzungspunkte je Quelle und je Titel gespeichert.' },
          { title: 'Favoriten', body: 'Nach zuletzt hinzugefügt sortiert, von überall aus erreichbar.' },
          { title: 'Serienstruktur', body: 'Staffeln und Folgen mit Metadaten, statt einer flachen Liste von Dateien.' },
        ],
      },
      {
        title: 'Fern vom Netz',
        lead: 'Downloads, die sich wie Downloads verhalten.',
        items: [
          { title: 'Offline-Downloads', body: 'Filme und Folgen für später gesichert.' },
          { title: 'Pause und Fortsetzen', body: 'Bereichsweise Übertragungen überstehen eine verlorene Verbindung oder eine geschlossene App.' },
          { title: 'Verwalteter Speicher', body: 'Sieh, was gespeichert ist, und lösch es, wenn du fertig bist.' },
        ],
      },
      {
        title: 'Auf dem Fernseher',
        lead: 'Eine TV-Version, keine auf den großen Bildschirm gestreckte Handy-App.',
        items: [
          { title: 'D-pad-Navigation', body: 'Jedes Bedienelement per Fernbedienung erreichbar, mit sichtbarem Fokus.' },
          { title: 'Seitenleisten-Layout', body: 'Die Oberfläche passt sich dem Bildschirm an, statt einfach hochskaliert zu werden.' },
          { title: 'Smartphone als Fernbedienung', body: 'Durchstöbern, suchen, in die Warteschlange stellen und tippen vom Gerät in deiner Hand.' },
          { title: 'Smartwatch-Steuerung', body: 'Grundlegende Wiedergabesteuerung vom Handgelenk aus.' },
          { title: 'Automatische Erkennung', body: 'Geräte finden den Fernseher im lokalen Netzwerk von selbst.' },
        ],
      },
      {
        title: 'Datenschutz und Synchronisierung',
        lead: 'Mehrere Geräte, ohne deinen Anbieter-Login herzugeben.',
        items: [
          { title: 'Verschlüsselbare Zugangsdaten', body: 'Playlist-Logins können auf dem Gerät Ende-zu-Ende verschlüsselt werden.' },
          { title: 'Proxy-Unterstützung', body: 'Leite Anfragen über einen proxy, wenn dein Netzwerk es verlangt.' },
          { title: 'Keine In-App-Werbung', body: 'Die App hat keine Werbe-SDKs und kein verhaltensbasiertes Tracking.' },
          { title: '70 Oberflächensprachen', body: 'Inklusive vollständigem Rechts-nach-links-Layout für Persisch, Arabisch und Hebräisch.' },
        ],
      },
    ],
  },

  download: {
    title: 'Download',
    lead: 'Installiere Vidonzo über den passenden Kanal für jedes Gerät. Kostenlos, ohne Konto.',
    recommendedFor: 'Empfohlen für dein Gerät',
    otherPlatforms: 'Alle Plattformen',
    googlePlay: 'Bei Google Play laden',
    appStore: 'Im App Store laden',
    directApk: 'Direktes APK',
    androidMobile: 'Android-Smartphone & -Tablet',
    androidMobileNote: 'Installiere über Google Play oder lade das neueste mobile APK direkt herunter.',
    androidTv: 'Android TV',
    androidTvNote: 'Direktes APK für Android-TV-Boxen und TV-First-Installationen. Per Sideload oder von einem USB-Stick installieren.',
    iphone: 'iPhone & iPad',
    iphoneNote: 'Installation über den App Store auf iOS und iPadOS.',
    macos: 'macOS',
    macosNote: 'Die Desktop-Version erscheint, sobald das macOS-Paket signiert und notariell beglaubigt ist.',
    windows: 'Windows',
    windowsNote: 'Der Windows-Installer erscheint zusammen mit dem Desktop-Paket.',
    comingSoon: 'Demnächst',
    helpTitle: 'Bei der Installation hängen geblieben?',
    helpLead: 'Für das Sideloading auf Android TV und das Hinzufügen deiner ersten Playlist gibt es jeweils eine Schritt-für-Schritt-Anleitung.',
    apkGateTitle: 'Vorerst nur für Tester',
    apkGateBody: 'Die direkten APK-Builds sind Testern vorbehalten, solange wir die nächste Version fertigstellen. Gib den Zugangscode ein, um fortzufahren.',
    apkGateLabel: 'Zugangscode',
    apkGateSubmit: 'Weiter',
    apkGateError: 'Dieser Code stimmt nicht. Bitte prüfen und erneut versuchen.',
  },

  blog: {
    title: 'Blog',
    lead: 'Anleitungen, Release Notes und Notizen dazu, wie Vidonzo gebaut ist.',
    empty: 'Noch keine Artikel in dieser Sprache.',
    allTags: 'Alle Themen',
    taggedWith: 'Thema',
    latest: 'Neueste',
  },

  help: {
    title: 'Hilfe-Center',
    lead: 'Einrichtung, Playlists, TV-Installation und was zu tun ist, wenn etwas partout nicht abspielt.',
    empty: 'Noch keine Anleitungen in dieser Sprache.',
    stillStuck: 'Immer noch nicht weiter?',
    stillStuckLead: 'Schreib dem Support und nenne das Gerät, die Playlist-Art und was du gesehen hast.',
  },

  support: {
    title: 'Support',
    lead: 'Brauchst du Hilfe bei Einrichtung, Playlist-Import, TV-Login oder Konto-Wiederherstellung?',
    cta: 'support@vidonzo.com',
    responseNote: 'Wir antworten in der Reihenfolge des Eingangs, meist innerhalb weniger Tage.',
    beforeTitle: 'Bevor du schreibst',
    beforeLead: 'Die meisten Fragen sind im Hilfe-Center schon beantwortet – und falls deine nicht dabei ist, bringen dir diese Angaben eine schnellere Antwort.',
    beforePoints: [
      'Welches Gerät und welche Vidonzo-Version',
      'Xtream, M3U-Link aus dem Netz oder eine lokale Datei',
      'Was du erwartet hast und was stattdessen passiert ist',
    ],
    followTitle: 'Anderswo',
  },

  legal: {
    privacy: 'Datenschutzerklärung',
    terms: 'Nutzungsbedingungen',
    accountDeletion: 'Konto- und Datenlöschung',
  },

  notFound: {
    title: 'Diese Seite ist nicht auf Sendung',
    lead: 'Der Link ist defekt oder die Seite ist umgezogen. Meistens sind die Download-Seite oder das Hilfe-Center gesucht.',
    cta: 'Zurück zur Startseite',
  },

  footer: {
    tagline: 'Ein privater, plattformübergreifender IPTV-Player für Xtream- und M3U-Playlists.',
    product: 'Produkt',
    resources: 'Ressourcen',
    legal: 'Rechtliches',
    follow: 'Folgen',
    rights: 'Alle Rechte vorbehalten.',
  },
};
