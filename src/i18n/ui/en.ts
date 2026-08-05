export const en = {
  nav: {
    features: 'Features',
    download: 'Download',
    blog: 'Blog',
    help: 'Help',
    support: 'Support',
  },

  common: {
    skipToContent: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    changeLanguage: 'Change language',
    readMore: 'Read more',
    minRead: 'min read',
    onThisPage: 'On this page',
    related: 'Related reading',
    published: 'Published',
    updated: 'Updated',
    viewAll: 'View all',
    comingSoon: 'Coming soon',
    backTo: 'Back to',
    breadcrumb: 'Breadcrumb',
    home: 'Home',
    translationPendingTitle: 'Not translated yet',
    translationPendingBody: 'This article has not been translated into your language yet, so you are reading the English original.',
  },

  home: {
    eyebrow: 'Cross-platform IPTV player',
    title: 'Your playlist,',
    titleAccent: 'finally cinematic',
    lead: 'Vidonzo turns any Xtream or M3U playlist into a proper streaming library — live TV, films and series with artwork, a real programme guide, and offline downloads. On your phone, your TV, your desktop and your tablet.',
    primaryCta: 'Download Vidonzo',
    secondaryCta: 'See what it does',
    shotHero: 'The Vidonzo live channel list on an iPhone, showing channel logos, category filters and favourites.',
    shotHome: 'The Vidonzo home screen with recently watched channels and a live channel row.',
    shotSettings: 'Vidonzo settings, showing buffer size, subtitle style and hardware decoding.',
    shotLanguage: 'Vidonzo asking which interface language to use, with the list in Persian.',
    stats: [
      { value: '4', label: 'platforms from one app' },
      { value: '70', label: 'interface languages' },
      { value: '0', label: 'ads, trackers, or subscriptions' },
    ],

    featuresTitle: 'A player that respects your library',
    featuresLead: 'Real IPTV playlists are messy and enormous. Vidonzo is built for that reality rather than a demo of twelve channels.',
    features: [
      {
        title: 'Live TV with a real guide',
        body: 'XMLTV and Xtream EPG parsed with correct time zones, so "what is on now" is actually right.',
      },
      {
        title: 'Films and series, not file names',
        body: 'Posters, ratings, synopses and cast. Seasons and episodes organised the way you expect them.',
      },
      {
        title: 'Playback that survives your connection',
        body: 'The libmpv engine with hardware decoding, tunable cache, and automatic recovery when a stream drops.',
      },
      {
        title: 'Watch offline',
        body: 'Download films and episodes with pause and resume, then watch with no connection at all.',
      },
      {
        title: 'Picks up where you left off',
        body: 'Continue watching, favourites sorted by most recent, and search across your whole library at once.',
      },
      {
        title: 'Full playback control',
        body: 'Audio and subtitle tracks, playback speed, aspect ratio, and seeking with a visible buffer.',
      },
    ],

    remoteEyebrow: 'The one nobody else has',
    remoteTitle: 'Your phone is the TV remote',
    remoteLead: 'Pair a phone, tablet, desktop or smartwatch with Vidonzo on your TV over the local network. Browse the TV library on the device already in your hand, and start playback with one tap.',
    remotePoints: [
      'Search and browse the TV library on your phone',
      'Queue up what plays next without interrupting the screen',
      'Trackpad and phone keyboard for typing on the TV',
      'Discovered automatically on your network — no codes to type',
    ],
    remoteCta: 'How pairing works',

    setupTitle: 'Running in three steps',
    setupLead: 'No account required to start watching. Bring the playlist you already have.',
    steps: [
      {
        title: 'Install Vidonzo',
        body: 'From Google Play, the App Store, or a direct APK for Android TV boxes.',
      },
      {
        title: 'Add your playlist',
        body: 'Xtream Codes credentials, an M3U or M3U8 link, or an M3U file already on your device.',
      },
      {
        title: 'Start watching',
        body: 'Vidonzo loads the catalogue, matches artwork and the guide, and remembers where you stopped.',
      },
    ],

    privacyEyebrow: 'Privacy',
    privacyTitle: 'Your credentials are nobody else’s business',
    privacyLead: 'Vidonzo is a player, not a content service. It does not sell you channels and it does not need to know what you watch.',
    privacyPoints: [
      {
        title: 'End-to-end encryptable credentials',
        body: 'Playlist logins can be encrypted on your device before they ever reach sync.',
      },
      {
        title: 'No in-app ad SDKs',
        body: 'Nothing in the app is funded by watching you use it.',
      },
      {
        title: 'Works entirely offline',
        body: 'A local M3U file and downloaded episodes need no server at all.',
      },
    ],

    platformsTitle: 'One app, every screen',
    platformsLead: 'A single codebase, adapted per device — a bottom bar on the phone, a side rail on TV and desktop, D-pad navigation throughout.',

    faqTitle: 'Questions people actually ask',
    faq: [
      {
        question: 'Does Vidonzo come with channels?',
        answer:
          'No. Vidonzo is a player only. You bring your own Xtream Codes account, M3U link, or M3U file — exactly as you would with any other IPTV player.',
      },
      {
        question: 'Is it free?',
        answer:
          'Yes. There is no subscription, no advertising, and no paid tier gating playback features.',
      },
      {
        question: 'Which playlist formats work?',
        answer:
          'Xtream Codes (host, username and password), remote M3U and M3U8 links, and local M3U files stored on your device.',
      },
      {
        question: 'Can I watch on my TV?',
        answer:
          'Yes. There is a dedicated Android TV build with D-pad navigation, and any phone, tablet, desktop or smartwatch on the same network can act as its remote.',
      },
      {
        question: 'Does it work without an internet connection?',
        answer:
          'Downloaded films and episodes play offline, and local M3U files need no connection. Live TV naturally still requires your provider to be reachable.',
      },
      {
        question: 'Are my playlist credentials safe?',
        answer:
          'Vidonzo is designed so sensitive playlist credentials can be end-to-end encrypted on your device. Cloud sync stores only what is needed to keep your devices in step.',
      },
    ],

    ctaTitle: 'Bring your playlist. Keep your privacy.',
    ctaLead: 'Free, on every screen you own.',
  },

  features: {
    title: 'Features',
    lead: 'Everything Vidonzo does, grouped by what you actually came to do.',
    groups: [
      {
        title: 'Getting your content in',
        lead: 'Three ways in, and nothing else to configure.',
        items: [
          { title: 'Xtream Codes', body: 'Host, username and password. Live, VOD and series arrive together.' },
          { title: 'M3U and M3U8 links', body: 'Any remote playlist URL, re-fetched and cached as it changes.' },
          { title: 'Local M3U files', body: 'A playlist already on your device, no server involved.' },
          { title: 'Multiple sources', body: 'Keep several providers side by side and switch between them.' },
        ],
      },
      {
        title: 'Watching',
        lead: 'Built on libmpv, the engine that plays what other players choke on.',
        items: [
          { title: 'Hardware decoding', body: 'Smooth playback that does not melt the battery.' },
          { title: 'Automatic recovery', body: 'A dropped stream reconnects instead of dumping you back to a list.' },
          { title: 'Tunable cache', body: 'Trade latency against stability to suit your connection.' },
          { title: 'Tracks and speed', body: 'Audio and subtitle selection, playback speed, aspect ratio.' },
          { title: 'Seek with buffer', body: 'See exactly how much is loaded before you scrub.' },
        ],
      },
      {
        title: 'Finding things',
        lead: 'A twenty-thousand-channel playlist is only useful if you can navigate it.',
        items: [
          { title: 'Global search', body: 'Live, films and series searched together in one field.' },
          { title: 'Programme guide', body: 'XMLTV and Xtream EPG with correct time-zone handling.' },
          { title: 'Continue watching', body: 'Resume points kept per source, per item.' },
          { title: 'Favourites', body: 'Sorted by most recently added, reachable from anywhere.' },
          { title: 'Series structure', body: 'Seasons and episodes with metadata, not a flat list of files.' },
        ],
      },
      {
        title: 'Away from the network',
        lead: 'Downloads that behave like downloads.',
        items: [
          { title: 'Offline downloads', body: 'Films and episodes saved for later.' },
          { title: 'Pause and resume', body: 'Ranged transfers survive a lost connection or a closed app.' },
          { title: 'Managed storage', body: 'See what is stored and remove it when you are done.' },
        ],
      },
      {
        title: 'On the television',
        lead: 'A TV build, not a phone app stretched onto a big screen.',
        items: [
          { title: 'D-pad navigation', body: 'Every control reachable from a remote, with visible focus.' },
          { title: 'Side rail layout', body: 'The interface adapts to the screen instead of scaling up.' },
          { title: 'Phone as remote', body: 'Browse, search, queue and type from the device in your hand.' },
          { title: 'Smartwatch control', body: 'Basic playback control from the wrist.' },
          { title: 'Automatic discovery', body: 'Devices find the TV over the local network by themselves.' },
        ],
      },
      {
        title: 'Privacy and sync',
        lead: 'Multi-device without handing over your provider login.',
        items: [
          { title: 'Encryptable credentials', body: 'Playlist logins can be end-to-end encrypted on device.' },
          { title: 'Proxy support', body: 'Route requests through a proxy when your network requires it.' },
          { title: 'No in-app advertising', body: 'The app has no ad SDKs and no behavioural tracking.' },
          { title: '70 interface languages', body: 'Including full right-to-left layout for Persian, Arabic and Hebrew.' },
        ],
      },
    ],
  },

  download: {
    title: 'Download',
    lead: 'Install Vidonzo from the right channel for each device. Free, with no account required.',
    recommendedFor: 'Recommended for your device',
    otherPlatforms: 'All platforms',
    googlePlay: 'Get it on Google Play',
    appStore: 'Download on the App Store',
    directApk: 'Direct APK',
    androidMobile: 'Android phone & tablet',
    androidMobileNote: 'Install from Google Play, or download the latest mobile APK directly.',
    androidTv: 'Android TV',
    androidTvNote: 'Direct APK for Android TV boxes and TV-first installs. Sideload it or install from a USB drive.',
    iphone: 'iPhone & iPad',
    iphoneNote: 'Install from the App Store on iOS and iPadOS.',
    macos: 'macOS',
    macosNote: 'The desktop release ships once the macOS package is signed and notarised.',
    windows: 'Windows',
    windowsNote: 'The Windows installer ships alongside the desktop package.',
    comingSoon: 'Coming soon',
    helpTitle: 'Stuck installing?',
    helpLead: 'Sideloading on Android TV and adding your first playlist both have step-by-step guides.',
    apkGateTitle: 'Testers only, for now',
    apkGateBody: 'Direct APK builds are limited to testers while the next release is being finished. Enter the access code to continue.',
    apkGateLabel: 'Access code',
    apkGateSubmit: 'Continue',
    apkGateError: 'That code is not right. Check it and try again.',
  },

  blog: {
    title: 'Blog',
    lead: 'Guides, release notes, and notes on how Vidonzo is built.',
    empty: 'No articles in this language yet.',
    allTags: 'All topics',
    taggedWith: 'Tagged',
    latest: 'Latest',
  },

  help: {
    title: 'Help centre',
    lead: 'Setup, playlists, TV installs, and what to do when something will not play.',
    empty: 'No guides in this language yet.',
    stillStuck: 'Still stuck?',
    stillStuckLead: 'Email support and include the device, the playlist type, and what you saw.',
  },

  support: {
    title: 'Support',
    lead: 'Need help with setup, playlist import, TV login, or account recovery?',
    cta: 'support@vidonzo.com',
    responseNote: 'We answer in the order messages arrive, usually within a couple of days.',
    beforeTitle: 'Before you write',
    beforeLead: 'Most questions are already answered in the help centre — and if yours is not, these details get you a faster answer.',
    beforePoints: [
      'Which device and which Vidonzo version',
      'Xtream, remote M3U, or a local file',
      'What you expected, and what happened instead',
    ],
    followTitle: 'Elsewhere',
  },

  legal: {
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    accountDeletion: 'Account and data deletion',
  },

  notFound: {
    title: 'This page is off air',
    lead: 'The link is broken or the page has moved. The download page and the help centre are the usual destinations.',
    cta: 'Back to home',
  },

  footer: {
    tagline: 'A private, cross-platform IPTV player for Xtream and M3U playlists.',
    product: 'Product',
    resources: 'Resources',
    legal: 'Legal',
    follow: 'Follow',
    rights: 'All rights reserved.',
  },
} as const;
