import type { UiStrings } from './types';

export const id: UiStrings = {
  nav: {
    features: 'Fitur',
    download: 'Unduh',
    blog: 'Blog',
    help: 'Bantuan',
    support: 'Dukungan',
  },

  common: {
    skipToContent: 'Lewati ke konten',
    menu: 'Menu',
    close: 'Tutup',
    language: 'Bahasa',
    changeLanguage: 'Ganti bahasa',
    readMore: 'Baca selengkapnya',
    minRead: 'menit baca',
    onThisPage: 'Di halaman ini',
    related: 'Bacaan terkait',
    published: 'Diterbitkan',
    updated: 'Diperbarui',
    viewAll: 'Lihat semua',
    comingSoon: 'Segera hadir',
    backTo: 'Kembali ke',
    breadcrumb: 'Remah roti',
    home: 'Beranda',
    translationPendingTitle: 'Belum diterjemahkan',
    translationPendingBody: 'Artikel ini belum diterjemahkan ke dalam bahasa Anda, jadi Anda sedang membaca versi asli berbahasa Inggris.',
  },

  home: {
    eyebrow: 'Pemutar IPTV lintas platform',
    title: 'Playlist Anda,',
    titleAccent: 'akhirnya terasa sinematik',
    lead: 'Vidonzo mengubah playlist Xtream atau M3U apa pun menjadi pustaka streaming yang sesungguhnya — TV langsung, film dan serial lengkap dengan poster, panduan acara sungguhan, dan unduhan offline. Di ponsel, TV, komputer, dan tablet Anda.',
    primaryCta: 'Unduh Vidonzo',
    secondaryCta: 'Lihat apa saja kemampuannya',
    shotHero: 'Daftar kanal langsung Vidonzo di iPhone, menampilkan logo kanal, filter kategori, dan favorit.',
    shotHome: 'Layar beranda Vidonzo dengan kanal yang baru ditonton dan deretan kanal langsung.',
    shotSettings: 'Pengaturan Vidonzo, menampilkan ukuran buffer, gaya subtitel, dan dekode perangkat keras.',
    shotLanguage: 'Vidonzo menanyakan bahasa antarmuka yang ingin digunakan, dengan daftar dalam bahasa Persia.',
    stats: [
      { value: '4', label: 'platform dari satu aplikasi' },
      { value: '70', label: 'bahasa antarmuka' },
      { value: '0', label: 'iklan, pelacak, atau langganan' },
    ],

    featuresTitle: 'Pemutar yang menghargai pustaka Anda',
    featuresLead: 'Playlist IPTV yang sesungguhnya berantakan dan sangat besar. Vidonzo dibuat untuk kenyataan itu, bukan sekadar demo dua belas kanal.',
    features: [
      {
        title: 'TV langsung dengan panduan sungguhan',
        body: 'EPG XMLTV dan Xtream diurai dengan zona waktu yang benar, jadi "apa yang sedang tayang" memang tepat.',
      },
      {
        title: 'Film dan serial, bukan nama berkas',
        body: 'Poster, rating, sinopsis, dan pemeran. Musim dan episode tertata seperti yang Anda harapkan.',
      },
      {
        title: 'Pemutaran yang tahan terhadap koneksi Anda',
        body: 'Mesin libmpv dengan dekode perangkat keras, cache yang dapat diatur, dan pemulihan otomatis saat aliran terputus.',
      },
      {
        title: 'Tonton offline',
        body: 'Unduh film dan episode dengan jeda dan lanjut, lalu tonton tanpa koneksi sama sekali.',
      },
      {
        title: 'Melanjutkan dari tempat Anda berhenti',
        body: 'Lanjutkan menonton, favorit diurutkan dari yang terbaru, dan pencarian di seluruh pustaka sekaligus.',
      },
      {
        title: 'Kendali pemutaran penuh',
        body: 'Trek audio dan subtitel, kecepatan pemutaran, rasio aspek, dan penggeseran dengan buffer yang terlihat.',
      },
    ],

    remoteEyebrow: 'Yang tak dimiliki yang lain',
    remoteTitle: 'Ponsel Anda adalah remote TV',
    remoteLead: 'Pasangkan ponsel, tablet, komputer, atau jam tangan pintar dengan Vidonzo di TV Anda melalui jaringan lokal. Jelajahi pustaka TV dari perangkat yang sudah ada di tangan Anda, dan mulai pemutaran hanya dengan satu ketukan.',
    remotePoints: [
      'Cari dan jelajahi pustaka TV di ponsel Anda',
      'Antrekan yang diputar berikutnya tanpa mengganggu layar',
      'Trackpad dan keyboard ponsel untuk mengetik di TV',
      'Ditemukan otomatis di jaringan Anda — tanpa kode yang perlu diketik',
    ],
    remoteCta: 'Cara kerja pemasangan',

    setupTitle: 'Berjalan dalam tiga langkah',
    setupLead: 'Tidak perlu akun untuk mulai menonton. Bawa playlist yang sudah Anda miliki.',
    steps: [
      {
        title: 'Pasang Vidonzo',
        body: 'Dari Google Play, App Store, atau APK langsung untuk perangkat Android TV.',
      },
      {
        title: 'Tambahkan playlist Anda',
        body: 'Kredensial Xtream Codes, tautan M3U atau M3U8, atau berkas M3U yang sudah ada di perangkat Anda.',
      },
      {
        title: 'Mulai menonton',
        body: 'Vidonzo memuat katalog, mencocokkan poster dan panduan, serta mengingat di mana Anda berhenti.',
      },
    ],

    privacyEyebrow: 'Privasi',
    privacyTitle: 'Kredensial Anda bukan urusan siapa pun',
    privacyLead: 'Vidonzo adalah pemutar, bukan layanan konten. Ia tidak menjual kanal kepada Anda dan tidak perlu tahu apa yang Anda tonton.',
    privacyPoints: [
      {
        title: 'Kredensial dapat dienkripsi ujung ke ujung',
        body: 'Login playlist dapat dienkripsi di perangkat Anda sebelum sampai ke sinkronisasi.',
      },
      {
        title: 'Tanpa SDK iklan di dalam aplikasi',
        body: 'Tidak ada bagian aplikasi yang didanai dengan mengawasi cara Anda memakainya.',
      },
      {
        title: 'Bekerja sepenuhnya offline',
        body: 'Berkas M3U lokal dan episode yang diunduh sama sekali tidak memerlukan server.',
      },
    ],

    platformsTitle: 'Satu aplikasi, setiap layar',
    platformsLead: 'Satu basis kode, disesuaikan per perangkat — bilah bawah di ponsel, rel samping di TV dan komputer, navigasi D-pad di mana-mana.',

    faqTitle: 'Pertanyaan yang benar-benar sering diajukan',
    faq: [
      {
        question: 'Apakah Vidonzo sudah dilengkapi kanal?',
        answer:
          'Tidak. Vidonzo hanyalah pemutar. Anda membawa akun Xtream Codes, tautan M3U, atau berkas M3U Anda sendiri — persis seperti pemutar IPTV lainnya.',
      },
      {
        question: 'Apakah gratis?',
        answer:
          'Ya. Tidak ada langganan, tidak ada iklan, dan tidak ada tingkatan berbayar yang mengunci fitur pemutaran.',
      },
      {
        question: 'Format playlist mana yang didukung?',
        answer:
          'Xtream Codes (host, nama pengguna, dan kata sandi), tautan M3U dan M3U8 jarak jauh, serta berkas M3U lokal yang tersimpan di perangkat Anda.',
      },
      {
        question: 'Bisakah saya menonton di TV?',
        answer:
          'Ya. Tersedia versi Android TV khusus dengan navigasi D-pad, dan ponsel, tablet, komputer, atau jam tangan pintar apa pun di jaringan yang sama dapat berfungsi sebagai remote-nya.',
      },
      {
        question: 'Apakah bekerja tanpa koneksi internet?',
        answer:
          'Film dan episode yang diunduh dapat diputar offline, dan berkas M3U lokal tidak memerlukan koneksi. TV langsung tentu tetap memerlukan penyedia Anda agar dapat dijangkau.',
      },
      {
        question: 'Apakah kredensial playlist saya aman?',
        answer:
          'Vidonzo dirancang agar kredensial playlist yang sensitif dapat dienkripsi ujung ke ujung di perangkat Anda. Sinkronisasi cloud hanya menyimpan yang diperlukan untuk menjaga perangkat Anda tetap selaras.',
      },
    ],

    ctaTitle: 'Bawa playlist Anda. Jaga privasi Anda.',
    ctaLead: 'Gratis, di setiap layar yang Anda miliki.',
  },

  features: {
    title: 'Fitur',
    lead: 'Semua yang dilakukan Vidonzo, dikelompokkan menurut tujuan Anda yang sebenarnya.',
    groups: [
      {
        title: 'Memasukkan konten Anda',
        lead: 'Tiga cara masuk, dan tak ada lagi yang perlu diatur.',
        items: [
          { title: 'Xtream Codes', body: 'Host, nama pengguna, dan kata sandi. TV langsung, VOD, dan serial datang bersamaan.' },
          { title: 'Tautan M3U dan M3U8', body: 'URL playlist jarak jauh apa pun, diambil ulang dan disimpan di cache seiring perubahan.' },
          { title: 'Berkas M3U lokal', body: 'Playlist yang sudah ada di perangkat Anda, tanpa server sama sekali.' },
          { title: 'Beberapa sumber', body: 'Simpan beberapa penyedia berdampingan dan beralih di antaranya.' },
        ],
      },
      {
        title: 'Menonton',
        lead: 'Dibangun di atas libmpv, mesin yang memutar apa yang membuat pemutar lain tersendat.',
        items: [
          { title: 'Dekode perangkat keras', body: 'Pemutaran mulus yang tidak menguras baterai.' },
          { title: 'Pemulihan otomatis', body: 'Aliran yang terputus menyambung kembali alih-alih melempar Anda kembali ke daftar.' },
          { title: 'Cache yang dapat diatur', body: 'Seimbangkan latensi dan stabilitas sesuai koneksi Anda.' },
          { title: 'Trek dan kecepatan', body: 'Pilihan audio dan subtitel, kecepatan pemutaran, rasio aspek.' },
          { title: 'Geser dengan buffer', body: 'Lihat persis seberapa banyak yang sudah dimuat sebelum menggeser.' },
        ],
      },
      {
        title: 'Menemukan sesuatu',
        lead: 'Playlist dua puluh ribu kanal hanya berguna jika Anda bisa menjelajahinya.',
        items: [
          { title: 'Pencarian global', body: 'TV langsung, film, dan serial dicari bersamaan dalam satu kolom.' },
          { title: 'Panduan acara', body: 'EPG XMLTV dan Xtream dengan penanganan zona waktu yang benar.' },
          { title: 'Lanjutkan menonton', body: 'Titik lanjut disimpan per sumber, per item.' },
          { title: 'Favorit', body: 'Diurutkan dari yang terbaru ditambahkan, dapat dijangkau dari mana saja.' },
          { title: 'Struktur serial', body: 'Musim dan episode dengan metadata, bukan daftar berkas yang datar.' },
        ],
      },
      {
        title: 'Jauh dari jaringan',
        lead: 'Unduhan yang berperilaku seperti unduhan seharusnya.',
        items: [
          { title: 'Unduhan offline', body: 'Film dan episode disimpan untuk nanti.' },
          { title: 'Jeda dan lanjut', body: 'Transfer bertahap bertahan saat koneksi hilang atau aplikasi ditutup.' },
          { title: 'Penyimpanan terkelola', body: 'Lihat apa yang tersimpan dan hapus saat Anda selesai.' },
        ],
      },
      {
        title: 'Di televisi',
        lead: 'Versi TV, bukan aplikasi ponsel yang direntangkan ke layar besar.',
        items: [
          { title: 'Navigasi D-pad', body: 'Setiap kontrol dapat dijangkau dari remote, dengan fokus yang terlihat.' },
          { title: 'Tata letak rel samping', body: 'Antarmuka menyesuaikan diri dengan layar alih-alih sekadar membesar.' },
          { title: 'Ponsel sebagai remote', body: 'Jelajahi, cari, antrekan, dan ketik dari perangkat di tangan Anda.' },
          { title: 'Kendali jam tangan pintar', body: 'Kontrol pemutaran dasar dari pergelangan tangan.' },
          { title: 'Penemuan otomatis', body: 'Perangkat menemukan TV di jaringan lokal dengan sendirinya.' },
        ],
      },
      {
        title: 'Privasi dan sinkronisasi',
        lead: 'Multi-perangkat tanpa menyerahkan login penyedia Anda.',
        items: [
          { title: 'Kredensial dapat dienkripsi', body: 'Login playlist dapat dienkripsi ujung ke ujung di perangkat.' },
          { title: 'Dukungan proxy', body: 'Arahkan permintaan melalui proxy saat jaringan Anda mengharuskannya.' },
          { title: 'Tanpa iklan dalam aplikasi', body: 'Aplikasi tidak memiliki SDK iklan maupun pelacakan perilaku.' },
          { title: '70 bahasa antarmuka', body: 'Termasuk tata letak kanan-ke-kiri penuh untuk bahasa Persia, Arab, dan Ibrani.' },
        ],
      },
    ],
  },

  download: {
    title: 'Unduh',
    lead: 'Pasang Vidonzo dari saluran yang tepat untuk setiap perangkat. Gratis, tanpa perlu akun.',
    recommendedFor: 'Direkomendasikan untuk perangkat Anda',
    otherPlatforms: 'Semua platform',
    googlePlay: 'Dapatkan di Google Play',
    appStore: 'Unduh di App Store',
    directApk: 'APK langsung',
    androidMobile: 'Ponsel & tablet Android',
    androidMobileNote: 'Pasang dari Google Play, atau unduh APK seluler terbaru secara langsung.',
    androidTv: 'Android TV',
    androidTvNote: 'APK langsung untuk perangkat Android TV dan pemasangan yang mengutamakan TV. Sideload atau pasang dari drive USB.',
    iphone: 'iPhone & iPad',
    iphoneNote: 'Pasang dari App Store di iOS dan iPadOS.',
    macos: 'macOS',
    macosNote: 'Rilis desktop akan tersedia setelah paket macOS ditandatangani dan dinotarisasi.',
    windows: 'Windows',
    windowsNote: 'Penginstal Windows akan tersedia bersamaan dengan paket desktop.',
    comingSoon: 'Segera hadir',
    helpTitle: 'Terkendala saat memasang?',
    helpLead: 'Sideloading di Android TV dan menambahkan playlist pertama Anda sama-sama punya panduan langkah demi langkah.',
    apkGateTitle: 'Untuk sementara hanya untuk penguji',
    apkGateBody: 'Berkas APK langsung hanya untuk penguji selama kami menyelesaikan rilis berikutnya. Masukkan kode akses untuk melanjutkan.',
    apkGateLabel: 'Kode akses',
    apkGateSubmit: 'Lanjutkan',
    apkGateError: 'Kode itu tidak benar. Periksa lagi lalu coba kembali.',
  },

  blog: {
    title: 'Blog',
    lead: 'Panduan, catatan rilis, dan cerita tentang bagaimana Vidonzo dibangun.',
    empty: 'Belum ada artikel dalam bahasa ini.',
    allTags: 'Semua topik',
    taggedWith: 'Berlabel',
    latest: 'Terbaru',
  },

  help: {
    title: 'Pusat bantuan',
    lead: 'Penyiapan, playlist, pemasangan di TV, dan apa yang harus dilakukan saat sesuatu tak mau diputar.',
    empty: 'Belum ada panduan dalam bahasa ini.',
    stillStuck: 'Masih terkendala?',
    stillStuckLead: 'Kirim email ke dukungan dan sertakan perangkat, jenis playlist, dan apa yang Anda lihat.',
  },

  support: {
    title: 'Dukungan',
    lead: 'Butuh bantuan untuk penyiapan, impor playlist, login TV, atau pemulihan akun?',
    cta: 'support@vidonzo.com',
    responseNote: 'Kami menjawab sesuai urutan pesan masuk, biasanya dalam beberapa hari.',
    beforeTitle: 'Sebelum Anda menulis',
    beforeLead: 'Sebagian besar pertanyaan sudah terjawab di pusat bantuan — dan jika pertanyaan Anda belum, detail ini mempercepat jawaban.',
    beforePoints: [
      'Perangkat mana dan versi Vidonzo yang mana',
      'Xtream, M3U jarak jauh, atau berkas lokal',
      'Apa yang Anda harapkan, dan apa yang justru terjadi',
    ],
    followTitle: 'Di tempat lain',
  },

  legal: {
    privacy: 'Kebijakan Privasi',
    terms: 'Ketentuan Penggunaan',
    accountDeletion: 'Penghapusan akun dan data',
  },

  notFound: {
    title: 'Halaman ini sedang tak mengudara',
    lead: 'Tautan rusak atau halaman telah dipindahkan. Halaman unduh dan pusat bantuan biasanya menjadi tujuan yang dicari.',
    cta: 'Kembali ke beranda',
  },

  footer: {
    tagline: 'Pemutar IPTV lintas platform yang menjaga privasi, untuk playlist Xtream dan M3U.',
    product: 'Produk',
    resources: 'Sumber daya',
    legal: 'Legal',
    follow: 'Ikuti',
    rights: 'Semua hak dilindungi.',
  },
};
