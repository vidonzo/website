import type { UiStrings } from './types';

export const es: UiStrings = {
  nav: {
    features: 'Funciones',
    download: 'Descargar',
    blog: 'Blog',
    help: 'Ayuda',
    support: 'Soporte',
  },

  common: {
    skipToContent: 'Saltar al contenido',
    menu: 'Menú',
    close: 'Cerrar',
    language: 'Idioma',
    changeLanguage: 'Cambiar idioma',
    readMore: 'Leer más',
    minRead: 'min de lectura',
    onThisPage: 'En esta página',
    related: 'Lecturas relacionadas',
    published: 'Publicado',
    updated: 'Actualizado',
    viewAll: 'Ver todo',
    comingSoon: 'Próximamente',
    backTo: 'Volver a',
    breadcrumb: 'Ruta de navegación',
    home: 'Inicio',
    translationPendingTitle: 'Aún sin traducir',
    translationPendingBody: 'Este artículo todavía no se ha traducido a tu idioma, así que estás leyendo el original en inglés.',
  },

  home: {
    eyebrow: 'Reproductor IPTV multiplataforma',
    title: 'Tu lista,',
    titleAccent: 'por fin cinematográfica',
    lead: 'Vidonzo convierte cualquier lista Xtream o M3U en una biblioteca de verdad: TV en directo, películas y series con carátulas, una guía de programación real y descargas sin conexión. En tu móvil, tu televisor, tu ordenador y tu tablet.',
    primaryCta: 'Descargar Vidonzo',
    secondaryCta: 'Ver qué hace',
    shotHero: 'La lista de canales en directo de Vidonzo en un iPhone, con logotipos, filtros de categoría y favoritos.',
    shotHome: 'La pantalla de inicio de Vidonzo con los canales vistos recientemente y una fila de canales en directo.',
    shotSettings: 'Ajustes de Vidonzo, con el tamaño de caché, el estilo de subtítulos y la decodificación por hardware.',
    shotLanguage: 'Vidonzo preguntando qué idioma de interfaz usar, con la lista en persa.',
    stats: [
      { value: '4', label: 'plataformas con una sola app' },
      { value: '70', label: 'idiomas de interfaz' },
      { value: '0', label: 'anuncios, rastreadores o suscripciones' },
    ],

    featuresTitle: 'Un reproductor a la altura de tu biblioteca',
    featuresLead: 'Las listas IPTV reales son caóticas y enormes. Vidonzo está hecho para esa realidad, no para una demo de doce canales.',
    features: [
      {
        title: 'TV en directo con guía de verdad',
        body: 'EPG de XMLTV y Xtream con zonas horarias bien interpretadas, para que «qué hay ahora» sea realmente correcto.',
      },
      {
        title: 'Películas y series, no nombres de archivo',
        body: 'Carátulas, valoraciones, sinopsis y reparto. Temporadas y episodios ordenados como esperas.',
      },
      {
        title: 'Reproducción que aguanta tu conexión',
        body: 'Motor libmpv con decodificación por hardware, caché ajustable y recuperación automática cuando cae el flujo.',
      },
      {
        title: 'Ver sin conexión',
        body: 'Descarga películas y episodios con pausa y reanudación, y míralos sin conexión alguna.',
      },
      {
        title: 'Sigue donde lo dejaste',
        body: 'Continuar viendo, favoritos ordenados por más recientes y búsqueda en toda la biblioteca a la vez.',
      },
      {
        title: 'Control total de reproducción',
        body: 'Pistas de audio y subtítulos, velocidad, relación de aspecto y avance con búfer visible.',
      },
    ],

    remoteEyebrow: 'Lo que nadie más tiene',
    remoteTitle: 'Tu móvil es el mando del televisor',
    remoteLead: 'Empareja un móvil, tablet, ordenador o reloj inteligente con Vidonzo en tu televisor por la red local. Explora la biblioteca del televisor desde el aparato que ya tienes en la mano y reproduce con un toque.',
    remotePoints: [
      'Busca y explora la biblioteca del televisor desde el móvil',
      'Elige qué suena después sin interrumpir la pantalla',
      'Panel táctil y teclado del móvil para escribir en el televisor',
      'Detección automática en tu red: sin códigos que teclear',
    ],
    remoteCta: 'Cómo se emparejan',

    setupTitle: 'Funcionando en tres pasos',
    setupLead: 'No hace falta cuenta para empezar a ver. Trae la lista que ya tienes.',
    steps: [
      {
        title: 'Instala Vidonzo',
        body: 'Desde Google Play, la App Store o un APK directo para dispositivos Android TV.',
      },
      {
        title: 'Añade tu lista',
        body: 'Credenciales de Xtream Codes, un enlace M3U o M3U8, o un archivo M3U que ya tengas en el dispositivo.',
      },
      {
        title: 'Empieza a ver',
        body: 'Vidonzo carga el catálogo, empareja carátulas y guía, y recuerda dónde lo dejaste.',
      },
    ],

    privacyEyebrow: 'Privacidad',
    privacyTitle: 'Tus credenciales no son asunto de nadie',
    privacyLead: 'Vidonzo es un reproductor, no un servicio de contenidos. No te vende canales y no necesita saber qué ves.',
    privacyPoints: [
      {
        title: 'Credenciales cifrables de extremo a extremo',
        body: 'Los accesos de la lista pueden cifrarse en tu dispositivo antes de llegar a la sincronización.',
      },
      {
        title: 'Sin anuncios ni rastreadores',
        body: 'Nada en la app se financia observando cómo la usas.',
      },
      {
        title: 'Funciona totalmente sin conexión',
        body: 'Un archivo M3U local y los episodios descargados no necesitan ningún servidor.',
      },
    ],

    platformsTitle: 'Una app, todas las pantallas',
    platformsLead: 'Una sola base de código adaptada a cada dispositivo: barra inferior en el móvil, raíl lateral en televisor y ordenador, y navegación con mando en todas partes.',

    faqTitle: 'Preguntas que la gente hace de verdad',
    faq: [
      {
        question: '¿Vidonzo incluye canales?',
        answer:
          'No. Vidonzo es solo un reproductor. Tú aportas tu cuenta de Xtream Codes, tu enlace M3U o tu archivo M3U, igual que con cualquier otro reproductor IPTV.',
      },
      {
        question: '¿Es gratis?',
        answer: 'Sí. No hay suscripción, ni publicidad, ni versión de pago que bloquee funciones de reproducción.',
      },
      {
        question: '¿Qué formatos de lista admite?',
        answer:
          'Xtream Codes (host, usuario y contraseña), enlaces M3U y M3U8 remotos, y archivos M3U locales guardados en tu dispositivo.',
      },
      {
        question: '¿Puedo verlo en el televisor?',
        answer:
          'Sí. Hay una versión específica para Android TV con navegación por mando, y cualquier móvil, tablet, ordenador o reloj de la misma red puede hacer de mando.',
      },
      {
        question: '¿Funciona sin conexión a internet?',
        answer:
          'Las películas y episodios descargados se reproducen sin conexión, y los archivos M3U locales no la necesitan. La TV en directo, naturalmente, sigue requiriendo acceso a tu proveedor.',
      },
      {
        question: '¿Están seguras las credenciales de mi lista?',
        answer:
          'Vidonzo está diseñado para que las credenciales sensibles puedan cifrarse de extremo a extremo en tu dispositivo. La sincronización en la nube guarda solo lo necesario para mantener tus dispositivos al día.',
      },
    ],

    ctaTitle: 'Trae tu lista. Conserva tu privacidad.',
    ctaLead: 'Gratis, en cada pantalla que tengas.',
  },

  features: {
    title: 'Funciones',
    lead: 'Todo lo que hace Vidonzo, agrupado según a qué has venido realmente.',
    groups: [
      {
        title: 'Traer tu contenido',
        lead: 'Tres vías de entrada y nada más que configurar.',
        items: [
          { title: 'Xtream Codes', body: 'Host, usuario y contraseña. Directo, películas y series llegan juntos.' },
          { title: 'Enlaces M3U y M3U8', body: 'Cualquier URL de lista, recargada y cacheada según cambia.' },
          { title: 'Archivos M3U locales', body: 'Una lista que ya está en tu dispositivo, sin servidor de por medio.' },
          { title: 'Varias fuentes', body: 'Mantén varios proveedores en paralelo y cambia entre ellos.' },
        ],
      },
      {
        title: 'Ver',
        lead: 'Sobre libmpv, el motor que reproduce lo que atraganta a otros.',
        items: [
          { title: 'Decodificación por hardware', body: 'Reproducción fluida sin fundir la batería.' },
          { title: 'Recuperación automática', body: 'Un flujo caído se reconecta en vez de devolverte a la lista.' },
          { title: 'Caché ajustable', body: 'Equilibra latencia y estabilidad según tu conexión.' },
          { title: 'Pistas y velocidad', body: 'Selección de audio y subtítulos, velocidad y relación de aspecto.' },
          { title: 'Avance con búfer', body: 'Ve exactamente cuánto está cargado antes de saltar.' },
        ],
      },
      {
        title: 'Encontrar cosas',
        lead: 'Una lista de veinte mil canales solo sirve si puedes moverte por ella.',
        items: [
          { title: 'Búsqueda global', body: 'Directo, películas y series en un único campo.' },
          { title: 'Guía de programación', body: 'EPG de XMLTV y Xtream con zonas horarias correctas.' },
          { title: 'Continuar viendo', body: 'Puntos de reanudación por fuente y por título.' },
          { title: 'Favoritos', body: 'Ordenados por más recientes y accesibles desde cualquier parte.' },
          { title: 'Estructura de series', body: 'Temporadas y episodios con metadatos, no una lista plana de archivos.' },
        ],
      },
      {
        title: 'Lejos de la red',
        lead: 'Descargas que se comportan como descargas.',
        items: [
          { title: 'Descargas sin conexión', body: 'Guarda películas y episodios para después.' },
          { title: 'Pausar y reanudar', body: 'La transferencia por rangos sobrevive a un corte o al cierre de la app.' },
          { title: 'Almacenamiento gestionado', body: 'Consulta qué hay guardado y bórralo cuando acabes.' },
        ],
      },
      {
        title: 'En el televisor',
        lead: 'Una versión de TV, no una app de móvil estirada.',
        items: [
          { title: 'Navegación por mando', body: 'Todo control alcanzable desde el mando, con foco visible.' },
          { title: 'Raíl lateral', body: 'La interfaz se adapta a la pantalla en lugar de solo agrandarse.' },
          { title: 'Móvil como mando', body: 'Explora, busca, encola y escribe desde el aparato que tienes en la mano.' },
          { title: 'Control desde el reloj', body: 'Control básico de reproducción desde la muñeca.' },
          { title: 'Detección automática', body: 'Los dispositivos encuentran el televisor solos en la red local.' },
        ],
      },
      {
        title: 'Privacidad y sincronización',
        lead: 'Multidispositivo sin entregar el acceso a tu proveedor.',
        items: [
          { title: 'Credenciales cifrables', body: 'Los accesos de la lista pueden cifrarse de extremo a extremo en el dispositivo.' },
          { title: 'Compatible con proxy', body: 'Enruta las peticiones por un proxy cuando tu red lo exige.' },
          { title: 'Sin publicidad en la app', body: 'La app no tiene SDK de anuncios ni seguimiento del comportamiento.' },
          { title: '70 idiomas de interfaz', body: 'Incluida disposición completa de derecha a izquierda para persa, árabe y hebreo.' },
        ],
      },
    ],
  },

  download: {
    title: 'Descargar',
    lead: 'Instala Vidonzo desde el canal adecuado para cada dispositivo. Gratis y sin necesidad de cuenta.',
    recommendedFor: 'Recomendado para tu dispositivo',
    otherPlatforms: 'Todas las plataformas',
    googlePlay: 'Disponible en Google Play',
    appStore: 'Descargar en App Store',
    directApk: 'APK directo',
    androidMobile: 'Móvil y tablet Android',
    androidMobileNote: 'Instala desde Google Play o descarga directamente el último APK móvil.',
    androidTv: 'Android TV',
    androidTvNote: 'APK directo para dispositivos Android TV. Instálalo de forma lateral o desde una memoria USB.',
    iphone: 'iPhone y iPad',
    iphoneNote: 'Instalación desde la App Store en iOS y iPadOS.',
    macos: 'macOS',
    macosNote: 'La versión de escritorio llega en cuanto el paquete de macOS esté firmado y notarizado.',
    windows: 'Windows',
    windowsNote: 'El instalador de Windows llega junto con el paquete de escritorio.',
    comingSoon: 'Próximamente',
    helpTitle: '¿Atascado en la instalación?',
    helpLead: 'Tanto la instalación lateral en Android TV como añadir tu primera lista tienen guías paso a paso.',
    apkGateTitle: 'Por ahora, solo para probadores',
    apkGateBody: 'Los APK directos están reservados a los probadores mientras terminamos la próxima versión. Introduce el código de acceso para continuar.',
    apkGateLabel: 'Código de acceso',
    apkGateSubmit: 'Continuar',
    apkGateError: 'Ese código no es correcto. Revísalo e inténtalo de nuevo.',
  },

  blog: {
    title: 'Blog',
    lead: 'Guías, notas de versión y apuntes sobre cómo se construye Vidonzo.',
    empty: 'Todavía no hay artículos en este idioma.',
    allTags: 'Todos los temas',
    taggedWith: 'Tema',
    latest: 'Lo último',
  },

  help: {
    title: 'Centro de ayuda',
    lead: 'Configuración, listas, instalación en televisor y qué hacer cuando algo no se reproduce.',
    empty: 'Todavía no hay guías en este idioma.',
    stillStuck: '¿Sigues atascado?',
    stillStuckLead: 'Escribe a soporte e indica el dispositivo, el tipo de lista y qué viste.',
  },

  support: {
    title: 'Soporte',
    lead: '¿Necesitas ayuda con la configuración, la importación de listas, el inicio de sesión en TV o recuperar tu cuenta?',
    cta: 'support@vidonzo.com',
    responseNote: 'Respondemos por orden de llegada, normalmente en un par de días.',
    beforeTitle: 'Antes de escribir',
    beforeLead: 'La mayoría de las preguntas ya están resueltas en el centro de ayuda, y si la tuya no lo está, estos datos aceleran la respuesta.',
    beforePoints: [
      'Qué dispositivo y qué versión de Vidonzo',
      'Xtream, enlace M3U o archivo local',
      'Qué esperabas y qué pasó en su lugar',
    ],
    followTitle: 'En otros sitios',
  },

  legal: {
    privacy: 'Política de privacidad',
    terms: 'Términos de uso',
    accountDeletion: 'Eliminación de cuenta y datos',
  },

  notFound: {
    title: 'Esta página está fuera de emisión',
    lead: 'El enlace está roto o la página se ha movido. Lo habitual es que buscaras la página de descargas o el centro de ayuda.',
    cta: 'Volver al inicio',
  },

  footer: {
    tagline: 'Un reproductor IPTV privado y multiplataforma para listas Xtream y M3U.',
    product: 'Producto',
    resources: 'Recursos',
    legal: 'Legal',
    follow: 'Síguenos',
    rights: 'Todos los derechos reservados.',
  },
};
