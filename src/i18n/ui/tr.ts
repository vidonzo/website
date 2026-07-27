import type { UiStrings } from './types';

export const tr: UiStrings = {
  nav: {
    features: 'Özellikler',
    download: 'İndir',
    blog: 'Blog',
    help: 'Yardım',
    support: 'Destek',
  },

  common: {
    skipToContent: 'İçeriğe geç',
    menu: 'Menü',
    close: 'Kapat',
    language: 'Dil',
    changeLanguage: 'Dili değiştir',
    readMore: 'Devamını oku',
    minRead: 'dk okuma',
    onThisPage: 'Bu sayfada',
    related: 'İlgili yazılar',
    published: 'Yayımlandı',
    updated: 'Güncellendi',
    viewAll: 'Tümünü gör',
    comingSoon: 'Yakında',
    backTo: 'Geri dön',
    breadcrumb: 'Gezinme yolu',
    home: 'Ana sayfa',
    translationPendingTitle: 'Henüz çevrilmedi',
    translationPendingBody: 'Bu yazı henüz dilinize çevrilmedi, bu yüzden İngilizce aslını okuyorsunuz.',
  },

  home: {
    eyebrow: 'Çok platformlu IPTV oynatıcı',
    title: 'Listeniz,',
    titleAccent: 'sonunda sinematik',
    lead: 'Vidonzo her Xtream veya M3U listesini gerçek bir kitaplığa dönüştürür: canlı yayın, afişli film ve diziler, düzgün bir yayın rehberi ve çevrimdışı indirmeler. Telefonunuzda, televizyonunuzda, masaüstünüzde ve tabletinizde.',
    primaryCta: 'Vidonzo’yu indir',
    secondaryCta: 'Neler yaptığına bakın',
    stats: [
      { value: '4', label: 'platform, tek uygulama' },
      { value: '70', label: 'arayüz dili' },
      { value: '0', label: 'reklam, izleyici ve abonelik' },
    ],

    featuresTitle: 'Kitaplığınıza saygı duyan bir oynatıcı',
    featuresLead: 'Gerçek IPTV listeleri dağınık ve devasadır. Vidonzo on iki kanallık bir demo için değil, bu gerçeklik için yapıldı.',
    features: [
      {
        title: 'Gerçek rehberli canlı yayın',
        body: 'XMLTV ve Xtream rehberi doğru saat dilimiyle işlenir; «şu an ne var» sorusunun yanıtı gerçekten doğrudur.',
      },
      {
        title: 'Dosya adı değil, film ve dizi',
        body: 'Afiş, puan, özet ve oyuncular. Sezonlar ve bölümler beklediğiniz düzende.',
      },
      {
        title: 'Bağlantınıza dayanan oynatma',
        body: 'Donanım çözücülü libmpv motoru, ayarlanabilir önbellek ve yayın koptuğunda otomatik toparlanma.',
      },
      {
        title: 'Çevrimdışı izleme',
        body: 'Filmleri ve bölümleri duraklat-devam ettir desteğiyle indirin, sonra bağlantısız izleyin.',
      },
      {
        title: 'Bıraktığınız yerden',
        body: 'İzlemeye devam, en yeniye göre sıralı favoriler ve tüm kitaplıkta tek seferde arama.',
      },
      {
        title: 'Tam oynatma denetimi',
        body: 'Ses ve altyazı seçimi, oynatma hızı, en boy oranı ve tampon göstergeli ilerleme.',
      },
    ],

    remoteEyebrow: 'Başkasında olmayan',
    remoteTitle: 'Telefonunuz televizyonun kumandası',
    remoteLead: 'Telefonu, tableti, masaüstünü ya da akıllı saati yerel ağ üzerinden televizyondaki Vidonzo ile eşleştirin. Televizyonun kitaplığını elinizdeki cihazdan gezin ve tek dokunuşla oynatın.',
    remotePoints: [
      'Televizyon kitaplığını telefondan arayın ve gezin',
      'Ekranı bölmeden sıradakini seçin',
      'Televizyonda yazmak için telefon klavyesi ve dokunmatik yüzey',
      'Ağınızda otomatik bulunur — yazılacak kod yok',
    ],
    remoteCta: 'Eşleştirme nasıl çalışır',

    setupTitle: 'Üç adımda hazır',
    setupLead: 'İzlemeye başlamak için hesap gerekmez. Zaten sahip olduğunuz listeyi getirin.',
    steps: [
      {
        title: 'Vidonzo’yu kurun',
        body: 'Google Play’den, App Store’dan veya Android TV cihazları için doğrudan APK ile.',
      },
      {
        title: 'Listenizi ekleyin',
        body: 'Xtream Codes bilgileri, bir M3U veya M3U8 bağlantısı ya da cihazınızdaki bir M3U dosyası.',
      },
      {
        title: 'İzlemeye başlayın',
        body: 'Vidonzo kataloğu yükler, afiş ve rehberi eşler, nerede bıraktığınızı hatırlar.',
      },
    ],

    privacyEyebrow: 'Gizlilik',
    privacyTitle: 'Giriş bilgileriniz kimseyi ilgilendirmez',
    privacyLead: 'Vidonzo bir oynatıcıdır, içerik servisi değil. Size kanal satmaz ve ne izlediğinizi bilmesi gerekmez.',
    privacyPoints: [
      {
        title: 'Uçtan uca şifrelenebilir bilgiler',
        body: 'Liste giriş bilgileri, eşitlemeye ulaşmadan önce cihazınızda şifrelenebilir.',
      },
      {
        title: 'Reklam yok, izleyici yok',
        body: 'Uygulamanın hiçbir yanı sizi izleyerek finanse edilmiyor.',
      },
      {
        title: 'Tamamen çevrimdışı da çalışır',
        body: 'Yerel bir M3U dosyası ve indirilmiş bölümler hiçbir sunucuya ihtiyaç duymaz.',
      },
    ],

    platformsTitle: 'Tek uygulama, her ekran',
    platformsLead: 'Her cihaza uyarlanan tek bir kod tabanı: telefonda alt çubuk, televizyon ve masaüstünde yan ray, her yerde kumanda ile gezinme.',

    faqTitle: 'Gerçekten sorulan sorular',
    faq: [
      {
        question: 'Vidonzo kanallarla mı geliyor?',
        answer:
          'Hayır. Vidonzo yalnızca bir oynatıcıdır. Kendi Xtream Codes hesabınızı, M3U bağlantınızı veya M3U dosyanızı siz getirirsiniz — tıpkı diğer IPTV oynatıcılarında olduğu gibi.',
      },
      {
        question: 'Ücretsiz mi?',
        answer: 'Evet. Abonelik, reklam ve oynatma özelliklerini kilitleyen ücretli bir sürüm yok.',
      },
      {
        question: 'Hangi liste biçimleri destekleniyor?',
        answer:
          'Xtream Codes (sunucu, kullanıcı adı ve parola), uzak M3U ve M3U8 bağlantıları ve cihazınızdaki yerel M3U dosyaları.',
      },
      {
        question: 'Televizyonumda izleyebilir miyim?',
        answer:
          'Evet. Kumanda ile tam gezinmeye sahip özel bir Android TV sürümü var ve aynı ağdaki her telefon, tablet, masaüstü veya akıllı saat kumanda görevi görebilir.',
      },
      {
        question: 'İnternet bağlantısı olmadan çalışır mı?',
        answer:
          'İndirilen film ve bölümler çevrimdışı oynar, yerel M3U dosyaları bağlantı istemez. Canlı yayın için doğal olarak sağlayıcınıza erişim gerekir.',
      },
      {
        question: 'Liste giriş bilgilerim güvende mi?',
        answer:
          'Vidonzo, hassas liste bilgilerinin cihazınızda uçtan uca şifrelenebilmesi için tasarlandı. Bulut eşitleme yalnızca cihazlarınızı uyumlu tutmak için gerekeni saklar.',
      },
    ],

    ctaTitle: 'Listenizi getirin. Gizliliğiniz sizde kalsın.',
    ctaLead: 'Ücretsiz, sahip olduğunuz her ekranda.',
  },

  features: {
    title: 'Özellikler',
    lead: 'Vidonzo’nun yaptığı her şey, aslında ne için geldiğinize göre gruplandı.',
    groups: [
      {
        title: 'İçeriğinizi getirmek',
        lead: 'Üç giriş yolu ve ayarlanacak başka bir şey yok.',
        items: [
          { title: 'Xtream Codes', body: 'Sunucu, kullanıcı adı ve parola. Canlı yayın, film ve diziler birlikte gelir.' },
          { title: 'M3U ve M3U8 bağlantıları', body: 'Herhangi bir liste adresi; değiştikçe yeniden çekilir ve önbelleğe alınır.' },
          { title: 'Yerel M3U dosyaları', body: 'Cihazınızda hazır duran bir liste, sunucusuz.' },
          { title: 'Birden çok kaynak', body: 'Birkaç sağlayıcıyı yan yana tutun ve aralarında geçiş yapın.' },
        ],
      },
      {
        title: 'İzlemek',
        lead: 'Başka oynatıcıların takıldığı içerikleri oynatan motor libmpv üzerine kurulu.',
        items: [
          { title: 'Donanım çözme', body: 'Pili eritmeyen akıcı oynatma.' },
          { title: 'Otomatik toparlanma', body: 'Kopan yayın sizi listeye geri atmak yerine yeniden bağlanır.' },
          { title: 'Ayarlanabilir önbellek', body: 'Bağlantınıza göre gecikme ile kararlılık arasında denge kurun.' },
          { title: 'İzler ve hız', body: 'Ses ve altyazı seçimi, oynatma hızı, en boy oranı.' },
          { title: 'Tamponlu ilerleme', body: 'İleri sarmadan önce ne kadarının yüklendiğini tam olarak görün.' },
        ],
      },
      {
        title: 'Bulmak',
        lead: 'Yirmi bin kanallık bir liste, ancak içinde gezinebiliyorsanız işe yarar.',
        items: [
          { title: 'Genel arama', body: 'Canlı yayın, film ve diziler tek bir alanda birlikte aranır.' },
          { title: 'Yayın rehberi', body: 'XMLTV ve Xtream rehberi, doğru saat dilimi işlemesiyle.' },
          { title: 'İzlemeye devam', body: 'Kaldığınız nokta her kaynak ve her içerik için ayrı tutulur.' },
          { title: 'Favoriler', body: 'En son eklenene göre sıralı, her yerden erişilebilir.' },
          { title: 'Dizi yapısı', body: 'Meta verileriyle sezon ve bölümler; düz bir dosya listesi değil.' },
        ],
      },
      {
        title: 'Ağdan uzakta',
        lead: 'Gerçekten indirme gibi davranan indirmeler.',
        items: [
          { title: 'Çevrimdışı indirme', body: 'Film ve bölümleri sonrası için saklayın.' },
          { title: 'Duraklat ve devam et', body: 'Aralıklı aktarım, kopan bağlantıdan veya kapanan uygulamadan sağ çıkar.' },
          { title: 'Depolama yönetimi', body: 'Neyin saklandığını görün ve işiniz bitince silin.' },
        ],
      },
      {
        title: 'Televizyonda',
        lead: 'Büyük ekrana esnetilmiş bir telefon uygulaması değil, gerçek bir TV sürümü.',
        items: [
          { title: 'Kumanda ile gezinme', body: 'Her denetim kumandadan erişilebilir, odak açıkça görünür.' },
          { title: 'Yan ray düzeni', body: 'Arayüz yalnızca büyümez, ekrana uyarlanır.' },
          { title: 'Kumanda olarak telefon', body: 'Elinizdeki cihazdan gezin, arayın, sıraya alın ve yazın.' },
          { title: 'Akıllı saat denetimi', body: 'Bilekten temel oynatma denetimi.' },
          { title: 'Otomatik bulma', body: 'Cihazlar televizyonu yerel ağda kendileri bulur.' },
        ],
      },
      {
        title: 'Gizlilik ve eşitleme',
        lead: 'Sağlayıcı girişinizi teslim etmeden çoklu cihaz.',
        items: [
          { title: 'Şifrelenebilir bilgiler', body: 'Liste giriş bilgileri cihazda uçtan uca şifrelenebilir.' },
          { title: 'Proxy desteği', body: 'Ağınız gerektirdiğinde istekleri bir proxy üzerinden geçirin.' },
          { title: 'Reklamsız', body: 'Reklam SDK’sı yok, davranışsal izleme yok.' },
          { title: '70 arayüz dili', body: 'Farsça, Arapça ve İbranice için tam sağdan sola düzen dahil.' },
        ],
      },
    ],
  },

  download: {
    title: 'İndir',
    lead: 'Vidonzo’yu her cihaz için doğru kanaldan kurun. Ücretsiz, hesap gerekmez.',
    recommendedFor: 'Cihazınız için önerilen',
    otherPlatforms: 'Tüm platformlar',
    googlePlay: 'Google Play’den alın',
    appStore: 'App Store’dan indirin',
    directApk: 'Doğrudan APK',
    androidMobile: 'Android telefon ve tablet',
    androidMobileNote: 'Google Play’den kurun veya en güncel mobil APK’yı doğrudan indirin.',
    androidTv: 'Android TV',
    androidTvNote: 'Android TV cihazları için doğrudan APK. Yandan yükleyin ya da USB bellekten kurun.',
    iphone: 'iPhone ve iPad',
    iphoneNote: 'iOS ve iPadOS’ta App Store’dan kurulum.',
    macos: 'macOS',
    macosNote: 'Masaüstü sürümü, macOS paketi imzalanıp onaylandığında yayımlanır.',
    windows: 'Windows',
    windowsNote: 'Windows yükleyici, masaüstü paketiyle birlikte yayımlanır.',
    comingSoon: 'Yakında',
    helpTitle: 'Kurulumda takıldınız mı?',
    helpLead: 'Android TV’ye yandan yükleme ve ilk listenizi ekleme için adım adım rehberler var.',
  },

  blog: {
    title: 'Blog',
    lead: 'Rehberler, sürüm notları ve Vidonzo’nun nasıl geliştirildiğine dair yazılar.',
    empty: 'Bu dilde henüz yazı yok.',
    allTags: 'Tüm konular',
    taggedWith: 'Konu',
    latest: 'En yeni',
  },

  help: {
    title: 'Yardım merkezi',
    lead: 'Kurulum, listeler, televizyona yükleme ve bir şey oynamadığında ne yapılacağı.',
    empty: 'Bu dilde henüz rehber yok.',
    stillStuck: 'Hâlâ takıldınız mı?',
    stillStuckLead: 'Desteğe yazın; cihazı, liste türünü ve gördüğünüz şeyi ekleyin.',
  },

  support: {
    title: 'Destek',
    lead: 'Kurulum, liste içe aktarma, TV girişi veya hesap kurtarma konusunda yardım mı gerekiyor?',
    cta: 'support@vidonzo.com',
    responseNote: 'Mesajlara geliş sırasına göre, genelde birkaç gün içinde yanıt veriyoruz.',
    beforeTitle: 'Yazmadan önce',
    beforeLead: 'Soruların çoğu yardım merkezinde zaten yanıtlanmış durumda — sizinki orada yoksa bu ayrıntılar yanıtı hızlandırır.',
    beforePoints: [
      'Hangi cihaz ve hangi Vidonzo sürümü',
      'Xtream, M3U bağlantısı veya yerel dosya',
      'Ne beklediğiniz ve bunun yerine ne olduğu',
    ],
    followTitle: 'Diğer yerlerde',
  },

  legal: {
    privacy: 'Gizlilik Politikası',
    terms: 'Kullanım Şartları',
    accountDeletion: 'Hesap ve veri silme',
  },

  notFound: {
    title: 'Bu sayfa yayında değil',
    lead: 'Bağlantı bozuk ya da sayfa taşınmış. Genelde aranan yer indirme sayfası veya yardım merkezi olur.',
    cta: 'Ana sayfaya dön',
  },

  footer: {
    tagline: 'Xtream ve M3U listeleri için gizliliğe saygılı, çok platformlu IPTV oynatıcı.',
    product: 'Ürün',
    resources: 'Kaynaklar',
    legal: 'Yasal',
    follow: 'Takip edin',
    rights: 'Tüm hakları saklıdır.',
  },
};
