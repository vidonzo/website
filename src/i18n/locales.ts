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
export type PageKey = 'home' | 'features' | 'download' | 'support' | 'privacy' | 'terms' | 'accountDeletion';

export const pages: Record<PageKey, string> = {
  home: '',
  features: 'features',
  download: 'download',
  support: 'support',
  privacy: 'privacy',
  terms: 'terms',
  accountDeletion: 'account-deletion',
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
    nav: { features: 'Features', download: 'Download', support: 'Support', privacy: 'Privacy', terms: 'Terms', accountDeletion: 'Account deletion' },
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
      lead: 'Install Vidonzo from the official stores, or download the latest Android APK directly from Vidonzo.',
      googlePlay: 'Get it on Google Play',
      appStore: 'Download on the App Store',
      apk: 'Download Android APK',
      apkNote: 'Direct APK hosted on Vidonzo download storage.',
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
    accountDeletion: {
      title: 'Account and Data Deletion',
      lead: 'To delete your Vidonzo account and associated cloud sync data, email support@vidonzo.com from the email address used with your account and use the subject "Account deletion". We process deletion requests within 30 days. Local playlists, downloads, and cache stored only on your device can be removed by deleting them in the app, clearing app data, or uninstalling Vidonzo.',
    },
  },
  fa: {
    nav: { features: 'ویژگی‌ها', download: 'دانلود', support: 'پشتیبانی', privacy: 'حریم خصوصی', terms: 'شرایط استفاده', accountDeletion: 'حذف حساب' },
    home: {
      title: 'Vidonzo',
      eyebrow: 'پخش‌کننده IPTV چندسکویی',
      lead: 'یک پخش‌کننده تمیز و خصوصی برای پلی‌لیست‌های Xtream و M3U روی موبایل، تلویزیون، دسکتاپ و تبلت.',
      primary: 'دانلود',
      secondary: 'ویژگی‌ها',
      sections: ['کنترل مناسب تلویزیون', 'مرور سریع پلی‌لیست', 'معماری سینک خصوصی'],
    },
    features: { title: 'ویژگی‌ها', lead: 'برای کتابخانه‌های واقعی IPTV ساخته شده: لیست‌های بزرگ، ناوبری مناسب ریموت، ادامه تماشا، علاقه‌مندی‌ها، پراکسی و چند دستگاه.' },
    download: { title: 'دانلود', lead: 'Vidonzo را از فروشگاه‌های رسمی نصب کنید یا آخرین فایل APK اندروید را مستقیم از Vidonzo بگیرید.', googlePlay: 'دریافت از Google Play', appStore: 'دانلود از App Store', apk: 'دانلود فایل APK اندروید', apkNote: 'فایل APK مستقیم روی فضای دانلود Vidonzo میزبانی می‌شود.' },
    support: { title: 'پشتیبانی', lead: 'برای راه‌اندازی، واردکردن پلی‌لیست، ورود تلویزیون یا بازیابی حساب کمک می‌خواهید؟', cta: 'support@vidonzo.com' },
    privacy: { title: 'حریم خصوصی', lead: 'Vidonzo طوری طراحی شده که اعتبارنامه‌های حساس پلی‌لیست به‌صورت سرتاسری رمزنگاری شوند. سرویس فقط داده‌های لازم برای کارکرد اپ را نگه می‌دارد.' },
    terms: { title: 'شرایط استفاده', lead: 'Vidonzo یک پخش‌کننده است. مسئولیت پلی‌لیست‌ها، اعتبارنامه‌ها و منابع محتوایی که کاربر اضافه می‌کند با خود کاربر است.' },
    accountDeletion: { title: 'حذف حساب و داده‌ها', lead: 'برای حذف حساب Vidonzo و داده‌های همگام‌سازی ابری مرتبط، از ایمیل حساب خود به support@vidonzo.com پیام بدهید و موضوع را Account deletion بگذارید. درخواست‌های حذف ظرف ۳۰ روز پردازش می‌شوند. پلی‌لیست‌ها، دانلودها و cache محلی که فقط روی دستگاه شما هستند با حذف داخل اپ، پاک‌کردن داده‌های اپ یا uninstall کردن Vidonzo حذف می‌شوند.' },
  },
  ar: {
    nav: { features: 'الميزات', download: 'التنزيل', support: 'الدعم', privacy: 'الخصوصية', terms: 'الشروط', accountDeletion: 'حذف الحساب' },
    home: {
      title: 'Vidonzo',
      eyebrow: 'مشغل IPTV متعدد المنصات',
      lead: 'مشغل نظيف وخاص لقوائم Xtream و M3U على الهاتف والتلفزيون وسطح المكتب والجهاز اللوحي.',
      primary: 'التنزيل',
      secondary: 'استكشف الميزات',
      sections: ['تحكم مناسب للتلفزيون', 'تصفح سريع للقوائم', 'بنية مزامنة خاصة'],
    },
    features: { title: 'الميزات', lead: 'مصمم لمكتبات IPTV الكبيرة: تنقل مناسب لجهاز التحكم، متابعة المشاهدة، المفضلة، إعدادات الوكيل، ودعم عدة أجهزة.' },
    download: { title: 'التنزيل', lead: 'ثبّت Vidonzo من المتاجر الرسمية أو نزّل أحدث ملف APK لنظام Android مباشرة من Vidonzo.', googlePlay: 'احصل عليه من Google Play', appStore: 'تنزيل من App Store', apk: 'تنزيل ملف APK لنظام Android', apkNote: 'ملف APK المباشر مستضاف على مساحة تنزيل Vidonzo.' },
    support: { title: 'الدعم', lead: 'هل تحتاج مساعدة في الإعداد أو استيراد القوائم أو تسجيل دخول التلفزيون أو استرداد الحساب؟', cta: 'support@vidonzo.com' },
    privacy: { title: 'سياسة الخصوصية', lead: 'صمم Vidonzo بحيث يمكن تشفير بيانات القوائم الحساسة من طرف إلى طرف. يحتفظ النظام فقط بالبيانات اللازمة لتشغيل التطبيق.' },
    terms: { title: 'شروط الاستخدام', lead: 'Vidonzo هو مشغل وسائط. يتحمل المستخدم مسؤولية القوائم وبيانات الدخول ومصادر المحتوى التي يضيفها.' },
    accountDeletion: { title: 'حذف الحساب والبيانات', lead: 'لحذف حساب Vidonzo وبيانات المزامنة السحابية المرتبطة به، أرسل رسالة إلى support@vidonzo.com من البريد الإلكتروني المستخدم في حسابك مع عنوان Account deletion. نعالج طلبات الحذف خلال 30 يوما. يمكن حذف القوائم والتنزيلات وذاكرة التخزين المؤقت المحلية من داخل التطبيق أو بمسح بيانات التطبيق أو إزالة Vidonzo.' },
  },
  es: {
    nav: { features: 'Funciones', download: 'Descargar', support: 'Soporte', privacy: 'Privacidad', terms: 'Términos', accountDeletion: 'Eliminar cuenta' },
    home: {
      title: 'Vidonzo',
      eyebrow: 'Reproductor IPTV multiplataforma',
      lead: 'Un reproductor limpio y privado para listas Xtream y M3U en móvil, TV, escritorio y tablet.',
      primary: 'Descargar',
      secondary: 'Ver funciones',
      sections: ['Control pensado para TV', 'Listas rápidas', 'Sincronización privada'],
    },
    features: { title: 'Funciones', lead: 'Preparado para bibliotecas IPTV reales: listas grandes, navegación con control remoto, progreso, favoritos, proxy y varios dispositivos.' },
    download: { title: 'Descargar', lead: 'Instala Vidonzo desde las tiendas oficiales o descarga el APK de Android más reciente directamente desde Vidonzo.', googlePlay: 'Disponible en Google Play', appStore: 'Descargar en App Store', apk: 'Descargar APK de Android', apkNote: 'APK directo alojado en el almacenamiento de descargas de Vidonzo.' },
    support: { title: 'Soporte', lead: 'Ayuda con configuración, importación de listas, inicio en TV o recuperación de cuenta.', cta: 'support@vidonzo.com' },
    privacy: { title: 'Política de privacidad', lead: 'Vidonzo está diseñado para que las credenciales sensibles puedan cifrarse de extremo a extremo. El servicio guarda solo los datos necesarios.' },
    terms: { title: 'Términos de uso', lead: 'Vidonzo es un reproductor. Cada usuario es responsable de las listas, credenciales y fuentes de contenido que agregue.' },
    accountDeletion: { title: 'Eliminación de cuenta y datos', lead: 'Para eliminar tu cuenta de Vidonzo y los datos de sincronización en la nube asociados, escribe a support@vidonzo.com desde el correo usado en tu cuenta con el asunto Account deletion. Procesamos las solicitudes en un plazo de 30 días. Las listas, descargas y caché locales se eliminan desde la app, borrando los datos de la app o desinstalando Vidonzo.' },
  },
  tr: {
    nav: { features: 'Özellikler', download: 'İndir', support: 'Destek', privacy: 'Gizlilik', terms: 'Şartlar', accountDeletion: 'Hesap silme' },
    home: {
      title: 'Vidonzo',
      eyebrow: 'Çok platformlu IPTV oynatıcı',
      lead: 'Telefon, TV, masaüstü ve tablette Xtream ve M3U listeleri için sade ve gizli bir oynatıcı.',
      primary: 'İndir',
      secondary: 'Özellikler',
      sections: ['TV odaklı kontrol', 'Hızlı liste gezintisi', 'Gizli senkron mimarisi'],
    },
    features: { title: 'Özellikler', lead: 'Büyük IPTV listeleri, kumanda dostu gezinme, izleme ilerlemesi, favoriler, proxy ayarları ve çoklu cihaz desteği için tasarlandı.' },
    download: { title: 'İndir', lead: 'Vidonzo uygulamasını resmi mağazalardan yükleyin veya en güncel Android APK dosyasını doğrudan Vidonzo üzerinden indirin.', googlePlay: 'Google Play’den alın', appStore: 'App Store’dan indirin', apk: 'Android APK indir', apkNote: 'Doğrudan APK Vidonzo indirme depolamasında barındırılır.' },
    support: { title: 'Destek', lead: 'Kurulum, liste içe aktarma, TV girişi veya hesap kurtarma için yardıma mı ihtiyacınız var?', cta: 'support@vidonzo.com' },
    privacy: { title: 'Gizlilik Politikası', lead: 'Vidonzo, hassas liste bilgilerinin uçtan uca şifrelenebilmesi için tasarlanmıştır. Hizmet yalnızca gerekli verileri saklar.' },
    terms: { title: 'Kullanım Şartları', lead: 'Vidonzo bir oynatıcıdır. Eklenen listeler, kimlik bilgileri ve içerik kaynakları kullanıcının sorumluluğundadır.' },
    accountDeletion: { title: 'Hesap ve Veri Silme', lead: 'Vidonzo hesabınızı ve ilişkili bulut senkronizasyon verilerini silmek için hesabınızda kullandığınız e-posta adresinden support@vidonzo.com adresine Account deletion konusuyla yazın. Silme isteklerini 30 gün içinde işleriz. Yalnızca cihazınızda tutulan yerel listeler, indirmeler ve önbellek uygulama içinden, uygulama verilerini temizleyerek veya Vidonzo uygulamasını kaldırarak silinebilir.' },
  },
  fr: {
    nav: { features: 'Fonctions', download: 'Télécharger', support: 'Support', privacy: 'Confidentialité', terms: 'Conditions', accountDeletion: 'Supprimer le compte' },
    home: {
      title: 'Vidonzo',
      eyebrow: 'Lecteur IPTV multiplateforme',
      lead: 'Un lecteur clair et privé pour les listes Xtream et M3U sur mobile, TV, ordinateur et tablette.',
      primary: 'Télécharger',
      secondary: 'Voir les fonctions',
      sections: ['Commandes pensées pour la TV', 'Navigation rapide', 'Synchronisation privée'],
    },
    features: { title: 'Fonctions', lead: 'Conçu pour de grandes bibliothèques IPTV: navigation à la télécommande, reprise, favoris, proxy et synchronisation multiappareil.' },
    download: { title: 'Télécharger', lead: 'Installez Vidonzo depuis les boutiques officielles ou téléchargez directement le dernier APK Android depuis Vidonzo.', googlePlay: 'Disponible sur Google Play', appStore: 'Télécharger dans l’App Store', apk: 'Télécharger l’APK Android', apkNote: 'APK direct hébergé sur le stockage de téléchargement Vidonzo.' },
    support: { title: 'Support', lead: 'Besoin d’aide pour la configuration, l’import de playlist, la connexion TV ou la récupération de compte?', cta: 'support@vidonzo.com' },
    privacy: { title: 'Politique de confidentialité', lead: 'Vidonzo est conçu pour chiffrer de bout en bout les identifiants sensibles. Le service conserve uniquement les données nécessaires.' },
    terms: { title: 'Conditions d’utilisation', lead: 'Vidonzo est un lecteur. Les utilisateurs sont responsables des playlists, identifiants et sources de contenu ajoutés.' },
    accountDeletion: { title: 'Suppression du compte et des données', lead: 'Pour supprimer votre compte Vidonzo et les données de synchronisation cloud associées, écrivez à support@vidonzo.com depuis l’adresse utilisée pour votre compte avec l’objet Account deletion. Les demandes sont traitées sous 30 jours. Les playlists, téléchargements et caches locaux se suppriment dans l’app, en effaçant les données de l’app ou en désinstallant Vidonzo.' },
  },
} satisfies Record<Locale, {
  nav: Record<PageKey, string>;
  home: { title: string; eyebrow: string; lead: string; primary: string; secondary: string; sections: string[] };
  features: { title: string; lead: string };
  download: { title: string; lead: string; googlePlay: string; appStore: string; apk: string; apkNote: string };
  support: { title: string; lead: string; cta: string };
  privacy: { title: string; lead: string };
  terms: { title: string; lead: string };
  accountDeletion: { title: string; lead: string };
}>;
