export const defaultLocale = 'en';

export const locales = {
  en: { label: 'English', dir: 'ltr', path: '' },
  fa: { label: 'فارسی', dir: 'rtl', path: 'fa' },
  ar: { label: 'العربية', dir: 'rtl', path: 'ar' },
  es: { label: 'Español', dir: 'ltr', path: 'es' },
  tr: { label: 'Türkçe', dir: 'ltr', path: 'tr' },
  fr: { label: 'Français', dir: 'ltr', path: 'fr' },
} as const;

export type Locale = keyof typeof locales;
export type PageKey = 'home' | 'features' | 'download' | 'support' | 'privacy' | 'terms';

export const pages: Record<PageKey, string> = {
  home: '',
  features: 'features',
  download: 'download',
  support: 'support',
  privacy: 'privacy',
  terms: 'terms',
};

export const navKeys: PageKey[] = ['features', 'download', 'support', 'privacy', 'terms'];

export function localizedPath(locale: Locale, page: PageKey = 'home') {
  const localePart = locales[locale].path;
  const pagePart = pages[page];
  const parts = [localePart, pagePart].filter(Boolean);
  return `/${parts.join('/')}${parts.length ? '/' : ''}`;
}

export function parseRoute(slug: string[] = []) {
  const first = slug[0];
  const maybeLocale = Object.keys(locales).includes(first || '') ? (first as Locale) : defaultLocale;
  const rest = maybeLocale === defaultLocale ? slug : slug.slice(1);
  const page = (Object.entries(pages).find(([, value]) => value === (rest[0] || ''))?.[0] || 'home') as PageKey;
  return { locale: maybeLocale, page };
}

export const copy = {
  en: {
    nav: { features: 'Features', download: 'Download', support: 'Support', privacy: 'Privacy', terms: 'Terms' },
    home: {
      title: 'Vidonzo',
      eyebrow: 'Cross-platform IPTV player',
      lead: 'A clean, private player for Xtream and M3U playlists across phone, TV, desktop, and tablet.',
      primary: 'Download',
      secondary: 'Explore features',
      sections: ['TV-first controls', 'Fast playlist browsing', 'Private sync architecture'],
    },
    features: {
      title: 'Features',
      lead: 'Built for real IPTV libraries: large channel lists, remote-friendly navigation, watch progress, favorites, proxy settings, and multi-device support.',
    },
    download: {
      title: 'Download',
      lead: 'Vidonzo is being prepared for App Store and Google Play launch. Official links will appear here when the store releases are live.',
    },
    support: {
      title: 'Support',
      lead: 'Need help with setup, playlist import, TV login, or account recovery?',
      cta: 'support@vidonzo.com',
    },
    privacy: {
      title: 'Privacy Policy',
      lead: 'Vidonzo is designed so sensitive playlist credentials can be end-to-end encrypted. The service stores account and sync data only as needed to operate the app.',
    },
    terms: {
      title: 'Terms of Use',
      lead: 'Vidonzo is a player. Users are responsible for playlists, credentials, and content sources they add to the app.',
    },
  },
  fa: {
    nav: { features: 'ویژگی‌ها', download: 'دانلود', support: 'پشتیبانی', privacy: 'حریم خصوصی', terms: 'شرایط استفاده' },
    home: {
      title: 'Vidonzo',
      eyebrow: 'پخش‌کننده IPTV چندسکویی',
      lead: 'یک پخش‌کننده تمیز و خصوصی برای پلی‌لیست‌های Xtream و M3U روی موبایل، تلویزیون، دسکتاپ و تبلت.',
      primary: 'دانلود',
      secondary: 'ویژگی‌ها',
      sections: ['کنترل مناسب تلویزیون', 'مرور سریع پلی‌لیست', 'معماری سینک خصوصی'],
    },
    features: { title: 'ویژگی‌ها', lead: 'برای کتابخانه‌های واقعی IPTV ساخته شده: لیست‌های بزرگ، ناوبری مناسب ریموت، ادامه تماشا، علاقه‌مندی‌ها، پراکسی و چند دستگاه.' },
    download: { title: 'دانلود', lead: 'Vidonzo برای انتشار در App Store و Google Play آماده می‌شود. لینک‌های رسمی پس از انتشار اینجا قرار می‌گیرند.' },
    support: { title: 'پشتیبانی', lead: 'برای راه‌اندازی، واردکردن پلی‌لیست، ورود تلویزیون یا بازیابی حساب کمک می‌خواهید؟', cta: 'support@vidonzo.com' },
    privacy: { title: 'حریم خصوصی', lead: 'Vidonzo طوری طراحی شده که اعتبارنامه‌های حساس پلی‌لیست به‌صورت سرتاسری رمزنگاری شوند. سرویس فقط داده‌های لازم برای کارکرد اپ را نگه می‌دارد.' },
    terms: { title: 'شرایط استفاده', lead: 'Vidonzo یک پخش‌کننده است. مسئولیت پلی‌لیست‌ها، اعتبارنامه‌ها و منابع محتوایی که کاربر اضافه می‌کند با خود کاربر است.' },
  },
  ar: {
    nav: { features: 'الميزات', download: 'التنزيل', support: 'الدعم', privacy: 'الخصوصية', terms: 'الشروط' },
    home: {
      title: 'Vidonzo',
      eyebrow: 'مشغل IPTV متعدد المنصات',
      lead: 'مشغل نظيف وخاص لقوائم Xtream و M3U على الهاتف والتلفزيون وسطح المكتب والجهاز اللوحي.',
      primary: 'التنزيل',
      secondary: 'استكشف الميزات',
      sections: ['تحكم مناسب للتلفزيون', 'تصفح سريع للقوائم', 'بنية مزامنة خاصة'],
    },
    features: { title: 'الميزات', lead: 'مصمم لمكتبات IPTV الكبيرة: تنقل مناسب لجهاز التحكم، متابعة المشاهدة، المفضلة، إعدادات الوكيل، ودعم عدة أجهزة.' },
    download: { title: 'التنزيل', lead: 'يجري تجهيز Vidonzo للإطلاق على App Store و Google Play. ستظهر الروابط الرسمية هنا عند توفرها.' },
    support: { title: 'الدعم', lead: 'هل تحتاج مساعدة في الإعداد أو استيراد القوائم أو تسجيل دخول التلفزيون أو استرداد الحساب؟', cta: 'support@vidonzo.com' },
    privacy: { title: 'سياسة الخصوصية', lead: 'صمم Vidonzo بحيث يمكن تشفير بيانات القوائم الحساسة من طرف إلى طرف. يحتفظ النظام فقط بالبيانات اللازمة لتشغيل التطبيق.' },
    terms: { title: 'شروط الاستخدام', lead: 'Vidonzo هو مشغل وسائط. يتحمل المستخدم مسؤولية القوائم وبيانات الدخول ومصادر المحتوى التي يضيفها.' },
  },
  es: {
    nav: { features: 'Funciones', download: 'Descargar', support: 'Soporte', privacy: 'Privacidad', terms: 'Términos' },
    home: {
      title: 'Vidonzo',
      eyebrow: 'Reproductor IPTV multiplataforma',
      lead: 'Un reproductor limpio y privado para listas Xtream y M3U en móvil, TV, escritorio y tablet.',
      primary: 'Descargar',
      secondary: 'Ver funciones',
      sections: ['Control pensado para TV', 'Listas rápidas', 'Sincronización privada'],
    },
    features: { title: 'Funciones', lead: 'Preparado para bibliotecas IPTV reales: listas grandes, navegación con control remoto, progreso, favoritos, proxy y varios dispositivos.' },
    download: { title: 'Descargar', lead: 'Vidonzo se está preparando para App Store y Google Play. Los enlaces oficiales aparecerán aquí cuando estén disponibles.' },
    support: { title: 'Soporte', lead: 'Ayuda con configuración, importación de listas, inicio en TV o recuperación de cuenta.', cta: 'support@vidonzo.com' },
    privacy: { title: 'Política de privacidad', lead: 'Vidonzo está diseñado para que las credenciales sensibles puedan cifrarse de extremo a extremo. El servicio guarda solo los datos necesarios.' },
    terms: { title: 'Términos de uso', lead: 'Vidonzo es un reproductor. Cada usuario es responsable de las listas, credenciales y fuentes de contenido que agregue.' },
  },
  tr: {
    nav: { features: 'Özellikler', download: 'İndir', support: 'Destek', privacy: 'Gizlilik', terms: 'Şartlar' },
    home: {
      title: 'Vidonzo',
      eyebrow: 'Çok platformlu IPTV oynatıcı',
      lead: 'Telefon, TV, masaüstü ve tablette Xtream ve M3U listeleri için sade ve gizli bir oynatıcı.',
      primary: 'İndir',
      secondary: 'Özellikler',
      sections: ['TV odaklı kontrol', 'Hızlı liste gezintisi', 'Gizli senkron mimarisi'],
    },
    features: { title: 'Özellikler', lead: 'Büyük IPTV listeleri, kumanda dostu gezinme, izleme ilerlemesi, favoriler, proxy ayarları ve çoklu cihaz desteği için tasarlandı.' },
    download: { title: 'İndir', lead: 'Vidonzo App Store ve Google Play çıkışı için hazırlanıyor. Resmi bağlantılar yayınlandığında burada görünecek.' },
    support: { title: 'Destek', lead: 'Kurulum, liste içe aktarma, TV girişi veya hesap kurtarma için yardıma mı ihtiyacınız var?', cta: 'support@vidonzo.com' },
    privacy: { title: 'Gizlilik Politikası', lead: 'Vidonzo, hassas liste bilgilerinin uçtan uca şifrelenebilmesi için tasarlanmıştır. Hizmet yalnızca gerekli verileri saklar.' },
    terms: { title: 'Kullanım Şartları', lead: 'Vidonzo bir oynatıcıdır. Eklenen listeler, kimlik bilgileri ve içerik kaynakları kullanıcının sorumluluğundadır.' },
  },
  fr: {
    nav: { features: 'Fonctions', download: 'Télécharger', support: 'Support', privacy: 'Confidentialité', terms: 'Conditions' },
    home: {
      title: 'Vidonzo',
      eyebrow: 'Lecteur IPTV multiplateforme',
      lead: 'Un lecteur clair et privé pour les listes Xtream et M3U sur mobile, TV, ordinateur et tablette.',
      primary: 'Télécharger',
      secondary: 'Voir les fonctions',
      sections: ['Commandes pensées pour la TV', 'Navigation rapide', 'Synchronisation privée'],
    },
    features: { title: 'Fonctions', lead: 'Conçu pour de grandes bibliothèques IPTV: navigation à la télécommande, reprise, favoris, proxy et synchronisation multiappareil.' },
    download: { title: 'Télécharger', lead: 'Vidonzo est en préparation pour App Store et Google Play. Les liens officiels apparaîtront ici au lancement.' },
    support: { title: 'Support', lead: 'Besoin d’aide pour la configuration, l’import de playlist, la connexion TV ou la récupération de compte?', cta: 'support@vidonzo.com' },
    privacy: { title: 'Politique de confidentialité', lead: 'Vidonzo est conçu pour chiffrer de bout en bout les identifiants sensibles. Le service conserve uniquement les données nécessaires.' },
    terms: { title: 'Conditions d’utilisation', lead: 'Vidonzo est un lecteur. Les utilisateurs sont responsables des playlists, identifiants et sources de contenu ajoutés.' },
  },
} satisfies Record<Locale, {
  nav: Record<PageKey, string>;
  home: { title: string; eyebrow: string; lead: string; primary: string; secondary: string; sections: string[] };
  features: { title: string; lead: string };
  download: { title: string; lead: string };
  support: { title: string; lead: string; cta: string };
  privacy: { title: string; lead: string };
  terms: { title: string; lead: string };
}>;
