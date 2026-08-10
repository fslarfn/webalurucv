import type { ProductShape } from '@/types'

// Konten landing page SEO per bentuk jendela dan per area layanan.
// Slug dipakai sebagai URL: /katalog/[slug] dan /area/[slug].

export interface FaqItem {
  q: string
  a: string
}

export interface ShapePage {
  slug: string
  shape: ProductShape
  label: string
  title: string
  description: string
  h1: string
  intro: string[]
  faq: FaqItem[]
}

export interface AreaPage {
  slug: string
  city: string
  estimate: string
  coverage: string[]
  title: string
  description: string
  h1: string
  intro: string[]
  faq: FaqItem[]
}

export const SHAPE_PAGES: ShapePage[] = [
  {
    slug: 'jendela-bulat',
    shape: 'bulat',
    label: 'Jendela Bulat',
    title: 'Jendela Bulat Aluminium Custom — Harga & Model',
    description:
      'Jendela bulat aluminium custom diameter 40–120 cm. Kusen aluminium 3", kaca mati atau engsel, ornamen klasik. Produksi sendiri di Bekasi, kirim cepat Jabodetabek.',
    h1: 'Jendela Bulat Aluminium Custom',
    intro: [
      'Jendela bulat (round window) memberi aksen arsitektur yang langsung terlihat berbeda — cocok untuk fasad rumah klasik, area tangga, mushola, kamar mandi, hingga gable atap. Alucurv memproduksi jendela bulat aluminium di workshop kami sendiri di Bekasi, sehingga diameter, warna kusen, jenis kaca, dan ornamen bisa disesuaikan sepenuhnya dengan desain rumah Anda.',
      'Rangka menggunakan aluminium profil 3 inci yang anti karat dan tahan cuaca, dengan pilihan kaca mati (fixed) untuk pencahayaan, atau ornamen jeruji dekoratif untuk tampilan klasik. Ukuran umum yang kami kerjakan mulai diameter 40 cm sampai 120 cm — di luar itu tetap bisa dikonsultasikan.',
    ],
    faq: [
      {
        q: 'Berapa harga jendela bulat aluminium?',
        a: 'Harga mulai sekitar Rp1,4 juta untuk diameter 50 cm dengan kaca mati dan ornamen, tergantung ukuran, jenis kaca, dan tingkat kerumitan ornamen. Lihat harga di katalog atau minta penawaran via WhatsApp untuk ukuran custom.',
      },
      {
        q: 'Bisa pesan ukuran diameter berapa saja?',
        a: 'Bisa. Ukuran paling umum adalah diameter 50–90 cm, tapi kami menerima pesanan custom dari 40 cm hingga 120 cm lebih. Sebutkan ukuran lubang dinding Anda saat konsultasi.',
      },
      {
        q: 'Apakah jendela bulat bisa dibuka-tutup?',
        a: 'Model standar kami kaca mati (tidak dibuka) karena paling rapat dan minim perawatan. Model dengan engsel bisa dikerjakan sebagai pesanan custom — konsultasikan kebutuhan ventilasi Anda.',
      },
      {
        q: 'Berapa lama pengerjaan dan pengiriman?',
        a: 'Produksi umumnya 7–14 hari kerja tergantung antrean, lalu dikirim dengan armada sendiri ke seluruh Jabodetabek (1–3 hari).',
      },
    ],
  },
  {
    slug: 'jendela-lengkung',
    shape: 'lengkung',
    label: 'Jendela Lengkung',
    title: 'Jendela Lengkung (Arch) Aluminium Custom — Harga & Model',
    description:
      'Jendela lengkung / arch aluminium custom sesuai ukuran. Cocok untuk rumah klasik, mediterania, dan industrial. Produksi workshop sendiri di Bekasi, kirim cepat Jabodetabek.',
    h1: 'Jendela Lengkung (Arch) Aluminium Custom',
    intro: [
      'Jendela lengkung atau arch window menjadi ciri khas rumah bergaya klasik, mediterania, hingga tropis modern. Bagian atas yang melengkung membuat fasad terlihat lebih tinggi dan megah. Karena setiap lengkungan rumah berbeda, jendela tipe ini hampir selalu harus dibuat custom — dan di situlah spesialisasi Alucurv.',
      'Kami membentuk lengkungan aluminium dengan mal presisi mengikuti radius yang Anda butuhkan, bukan sekadar menekuk kasar. Hasilnya kusen mulus, sambungan rapi, dan kaca terpasang rapat. Tersedia model kaca mati penuh, kombinasi dengan daun jendela di bagian bawah, serta ornamen jeruji untuk sentuhan klasik.',
    ],
    faq: [
      {
        q: 'Bagaimana cara mengukur jendela lengkung?',
        a: 'Cukup ukur lebar bawah, tinggi total, dan tinggi mulai lengkungan. Kirimkan foto lubang jendela via WhatsApp — tim kami akan bantu memastikan radius lengkungannya.',
      },
      {
        q: 'Apakah bisa mengikuti lengkungan bangunan lama?',
        a: 'Bisa. Untuk renovasi, kami bisa membuat mal dari ukuran atau template karton yang Anda kirim, sehingga jendela baru pas dengan bukaan lama.',
      },
      {
        q: 'Berapa harga jendela lengkung aluminium?',
        a: 'Tergantung lebar, tinggi, dan model — jendela setengah lingkaran kecil mulai sekitar Rp1,5 juta, arch besar kombinasi daun jendela dihitung per ukuran. Minta penawaran gratis via WhatsApp.',
      },
    ],
  },
  {
    slug: 'jendela-setengah-lingkaran',
    shape: 'setengah_lingkaran',
    label: 'Setengah Lingkaran',
    title: 'Jendela Setengah Lingkaran Aluminium — Harga & Model',
    description:
      'Jendela setengah lingkaran (half round) aluminium custom, biasa dipasang di atas pintu atau jendela utama. Produksi sendiri di Bekasi, kirim cepat Jabodetabek.',
    h1: 'Jendela Setengah Lingkaran Aluminium',
    intro: [
      'Jendela setengah lingkaran (half round / fanlight) paling sering dipasang di atas pintu masuk atau jendela utama sebagai sumber cahaya tambahan sekaligus aksen dekoratif. Bentuknya yang simetris membuat fasad rumah terlihat seimbang dan klasik.',
      'Alucurv memproduksi jendela setengah lingkaran dari aluminium profil 3 inci dengan kaca mati, tersedia polos maupun dengan ornamen jari-jari matahari (sunburst) yang ikonik. Ukuran mengikuti lebar pintu atau jendela di bawahnya — sebutkan saja lebarnya, kami sesuaikan.',
    ],
    faq: [
      {
        q: 'Ukuran standar jendela setengah lingkaran berapa?',
        a: 'Umumnya mengikuti lebar pintu: 80, 90, atau 100 cm, dengan tinggi setengah dari lebar. Ukuran di luar itu bisa dibuat custom sesuai bukaan Anda.',
      },
      {
        q: 'Apakah cocok dipasang di atas pintu yang sudah ada?',
        a: 'Cocok, asalkan ada ruang dinding di atas kusen pintu. Kirim foto dan ukuran area di atas pintu Anda via WhatsApp, kami bantu cek kelayakannya.',
      },
      {
        q: 'Apa beda ornamen sunburst dan polos?',
        a: 'Ornamen sunburst memiliki jeruji aluminium menyebar seperti kipas — memberi kesan klasik. Model polos hanya kaca penuh untuk tampilan minimalis. Harga ornamen sedikit lebih tinggi karena pengerjaan lebih detail.',
      },
    ],
  },
  {
    slug: 'jendela-oval',
    shape: 'oval',
    label: 'Jendela Oval',
    title: 'Jendela Oval Aluminium Custom — Harga & Model',
    description:
      'Jendela oval aluminium custom untuk aksen fasad, tangga, dan kamar mandi. Ukuran dan orientasi sesuai pesanan. Produksi Bekasi, kirim cepat Jabodetabek.',
    h1: 'Jendela Oval Aluminium Custom',
    intro: [
      'Jendela oval memberi kesan lembut dan elegan — alternatif dari jendela bulat untuk bidang dinding yang lebih tinggi atau lebar. Sering dipakai di area tangga, kamar mandi, walk-in closet, atau sebagai aksen fasad rumah bergaya Eropa.',
      'Setiap jendela oval Alucurv dibuat berdasarkan pesanan: Anda menentukan tinggi, lebar, dan orientasi (vertikal atau horizontal), kami bentuk rangka aluminiumnya dengan mal khusus agar lengkungan halus dan simetris. Kaca mati membuat jendela rapat, bebas bocor, dan hampir tanpa perawatan.',
    ],
    faq: [
      {
        q: 'Apa bedanya jendela oval dan bulat?',
        a: 'Jendela bulat berdiameter sama ke segala arah, sedangkan oval memiliki sumbu panjang dan pendek — cocok untuk bidang dinding memanjang. Dari sisi harga dan pengerjaan keduanya mirip.',
      },
      {
        q: 'Ukuran jendela oval yang bisa dipesan?',
        a: 'Fleksibel — umumnya tinggi 60–120 cm dengan lebar menyesuaikan. Sebutkan ukuran bidang dinding Anda saat minta penawaran.',
      },
      {
        q: 'Apakah tersedia dengan ornamen?',
        a: 'Ya, ornamen jeruji dekoratif bisa ditambahkan seperti pada jendela bulat. Bisa juga polos untuk tampilan modern.',
      },
    ],
  },
]

export const AREA_PAGES: AreaPage[] = [
  {
    slug: 'jakarta',
    city: 'Jakarta',
    estimate: '1–2 hari',
    coverage: ['Jakarta Pusat', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Selatan', 'Jakarta Timur'],
    title: 'Jendela Aluminium Custom Jakarta — Bulat & Lengkung, Kirim 1–2 Hari',
    description:
      'Pesan jendela aluminium bulat, lengkung, dan oval custom untuk wilayah Jakarta. Dikirim 1–2 hari dengan armada sendiri dari workshop Bekasi. Konsultasi gratis via WhatsApp.',
    h1: 'Jendela Aluminium Custom untuk Jakarta',
    intro: [
      'Mencari jendela aluminium bulat atau lengkung custom di Jakarta? Workshop Alucurv berlokasi di Bekasi Timur — tepat di sisi timur Jakarta — sehingga pesanan Anda bisa kami antar sendiri dalam 1–2 hari setelah produksi selesai, tanpa ekspedisi pihak ketiga yang berisiko untuk barang kaca berukuran besar.',
      'Kami melayani seluruh wilayah DKI: dari proyek renovasi rumah di Jakarta Selatan, ruko di Jakarta Barat, hingga hunian baru di Jakarta Timur dan Utara. Semua jendela dibuat berdasarkan ukuran yang Anda kirim via WhatsApp — konsultasinya gratis.',
    ],
    faq: [
      {
        q: 'Berapa ongkos kirim ke Jakarta?',
        a: 'Ongkir dihitung dari jarak dan jumlah barang, dan akan kami sebutkan transparan saat konsultasi — sebelum Anda membayar DP. Karena memakai armada sendiri, biayanya umumnya lebih hemat daripada ekspedisi untuk barang besar.',
      },
      {
        q: 'Apakah bisa survei ukur ke lokasi di Jakarta?',
        a: 'Untuk kebutuhan tertentu bisa dijadwalkan. Namun sebagian besar pelanggan cukup mengirim foto dan ukuran bukaan via WhatsApp — tim kami pandu cara mengukurnya dengan benar.',
      },
      {
        q: 'Berapa lama total dari pesan sampai terpasang?',
        a: 'Produksi 7–14 hari kerja + pengiriman 1–2 hari ke Jakarta. Jadwal pastinya kami informasikan saat penawaran.',
      },
    ],
  },
  {
    slug: 'bekasi',
    city: 'Bekasi',
    estimate: '1–3 hari',
    coverage: ['Kota Bekasi', 'Kabupaten Bekasi', 'Cikarang'],
    title: 'Jendela Aluminium Custom Bekasi — Workshop Langsung, Bulat & Lengkung',
    description:
      'Workshop jendela aluminium bulat & lengkung custom di Bekasi Timur. Harga langsung dari produsen, bisa datang lihat workshop. Melayani Kota/Kabupaten Bekasi & Cikarang.',
    h1: 'Jendela Aluminium Custom di Bekasi — Langsung dari Workshop',
    intro: [
      'Alucurv adalah produsen jendela aluminium bulat dan lengkung yang workshop-nya berada di Jl. Mayor Oking, Margahayu, Bekasi Timur. Untuk Anda yang berdomisili di Bekasi, artinya Anda memesan langsung dari produsen: harga tanpa perantara, komunikasi langsung dengan pembuatnya, dan bisa mampir melihat proses produksi maupun contoh barang jadi.',
      'Kami melayani Kota Bekasi, Kabupaten Bekasi, hingga Cikarang — baik untuk rumah pribadi, perumahan, maupun proyek kontraktor. Pengiriman memakai armada sendiri sehingga jendela kaca berukuran besar sampai dengan aman.',
    ],
    faq: [
      {
        q: 'Apakah bisa datang langsung ke workshop?',
        a: 'Bisa, kami buka Senin–Sabtu 08.00–16.00 WIB di Jl. Mayor Oking No.71, Margahayu, Bekasi Timur. Disarankan chat WhatsApp dulu agar tim kami siap menemani Anda.',
      },
      {
        q: 'Apakah melayani proyek kontraktor / borongan?',
        a: 'Ya. Untuk pemesanan jumlah banyak (perumahan, ruko, masjid), kami berikan penawaran khusus. Kirim daftar kebutuhan dan gambar kerja via WhatsApp.',
      },
      {
        q: 'Berapa lama pengiriman untuk area Bekasi?',
        a: 'Karena satu kota dengan workshop, pengiriman biasanya 1 hari setelah produksi selesai — maksimal 3 hari saat antrean padat.',
      },
    ],
  },
  {
    slug: 'tangerang',
    city: 'Tangerang',
    estimate: '1–3 hari',
    coverage: ['Kota Tangerang', 'Tangerang Selatan', 'Kabupaten Tangerang'],
    title: 'Jendela Aluminium Custom Tangerang — Bulat & Lengkung, Kirim 1–3 Hari',
    description:
      'Pesan jendela aluminium bulat, lengkung, dan oval custom untuk Tangerang, Tangsel, dan Kabupaten Tangerang. Armada pengiriman sendiri, 1–3 hari. Konsultasi gratis.',
    h1: 'Jendela Aluminium Custom untuk Tangerang & Tangsel',
    intro: [
      'Banyak hunian di Tangerang dan Tangerang Selatan — dari BSD, Bintaro, Alam Sutera hingga Gading Serpong — memakai gaya arsitektur klasik dan tropis modern yang cocok dengan jendela bulat dan lengkung. Alucurv melayani seluruh wilayah Tangerang Raya dengan pengiriman armada sendiri 1–3 hari dari workshop kami di Bekasi.',
      'Seluruh proses pemesanan bisa dilakukan dari rumah: kirim ukuran dan foto bukaan via WhatsApp, terima penawaran, lalu jendela custom Anda kami produksi dan antar sampai lokasi dalam kondisi aman.',
    ],
    faq: [
      {
        q: 'Apakah pengiriman ke Tangerang aman untuk kaca besar?',
        a: 'Aman — kami tidak memakai ekspedisi umum. Jendela diangkut armada sendiri dengan rak khusus kaca dan diturunkan langsung oleh tim kami di lokasi Anda.',
      },
      {
        q: 'Melayani perumahan di BSD / Bintaro / Alam Sutera?',
        a: 'Ya, semua kawasan di Kota Tangerang, Tangsel, dan Kabupaten Tangerang kami layani dengan estimasi kirim 1–3 hari.',
      },
      {
        q: 'Bagaimana cara mulai memesan dari Tangerang?',
        a: 'Isi form penawaran di website atau langsung chat WhatsApp dengan menyebut bentuk jendela, perkiraan ukuran, dan lokasi Anda. Penawaran kami kirim di hari yang sama pada jam kerja.',
      },
    ],
  },
  {
    slug: 'depok',
    city: 'Depok',
    estimate: '1–2 hari',
    coverage: ['Depok', 'Cimanggis', 'Beji', 'Sawangan'],
    title: 'Jendela Aluminium Custom Depok — Bulat & Lengkung, Kirim 1–2 Hari',
    description:
      'Pesan jendela aluminium bulat, lengkung, dan oval custom untuk Depok dan sekitarnya. Dikirim armada sendiri 1–2 hari. Konsultasi ukuran gratis via WhatsApp.',
    h1: 'Jendela Aluminium Custom untuk Depok',
    intro: [
      'Untuk warga Depok — Cimanggis, Beji, Sawangan, hingga perbatasan Bogor — Alucurv menyediakan jendela aluminium bulat, lengkung, setengah lingkaran, dan oval yang dibuat sesuai ukuran rumah Anda. Jarak workshop kami di Bekasi Timur ke Depok cukup dekat, sehingga pengiriman rata-rata hanya 1–2 hari.',
      'Jendela bentuk unik sulit dicari di toko bangunan biasa karena harus dibuat presisi per pesanan. Dengan Alucurv, Anda cukup mengirim ukuran via WhatsApp; kami yang memproduksi dan mengantarnya sampai depan rumah.',
    ],
    faq: [
      {
        q: 'Berapa minimal pemesanan untuk area Depok?',
        a: 'Tidak ada minimal — satu jendela pun kami layani dan antar. Ongkir akan disebutkan transparan di penawaran.',
      },
      {
        q: 'Apakah harga untuk Depok sama dengan area lain?',
        a: 'Harga produk sama untuk semua area; yang membedakan hanya ongkos kirim sesuai jarak. Depok termasuk zona dekat dengan ongkir ringan.',
      },
      {
        q: 'Bisakah tukang saya yang memasang?',
        a: 'Bisa. Jendela kami kirim siap pasang lengkap dengan kusen. Kami sertakan panduan, dan tukang Anda bisa konsultasi ke tim kami via WhatsApp saat pemasangan.',
      },
    ],
  },
  {
    slug: 'bogor',
    city: 'Bogor',
    estimate: '1–3 hari',
    coverage: ['Kota Bogor', 'Kabupaten Bogor', 'Cibinong'],
    title: 'Jendela Aluminium Custom Bogor — Bulat & Lengkung, Kirim 1–3 Hari',
    description:
      'Pesan jendela aluminium bulat, lengkung, dan oval custom untuk Kota & Kabupaten Bogor. Tahan cuaca hujan, dikirim armada sendiri 1–3 hari. Konsultasi gratis.',
    h1: 'Jendela Aluminium Custom untuk Bogor',
    intro: [
      'Cuaca Bogor yang sering hujan menuntut material jendela yang tidak lapuk dan tidak berkarat — dan aluminium adalah jawabannya. Jendela bulat dan lengkung Alucurv memakai profil aluminium 3 inci dengan sealing rapat, sehingga aman dari rembesan air dan hampir bebas perawatan.',
      'Kami melayani Kota Bogor, Cibinong, hingga Kabupaten Bogor dengan pengiriman armada sendiri 1–3 hari. Vila, rumah peristirahatan, maupun hunian keluarga — semua bisa memesan dengan ukuran custom melalui WhatsApp.',
    ],
    faq: [
      {
        q: 'Apakah jendela aluminium tahan cuaca Bogor yang lembap?',
        a: 'Sangat tahan. Aluminium tidak berkarat dan tidak lapuk seperti kayu. Ditambah kaca mati yang tersegel rapat, air hujan tidak akan merembes.',
      },
      {
        q: 'Melayani area Puncak / Kabupaten Bogor pelosok?',
        a: 'Sebagian besar Kabupaten Bogor kami layani. Untuk lokasi pegunungan atau akses sulit, kirim share lokasi via WhatsApp agar kami cek dulu jangkauannya.',
      },
      {
        q: 'Berapa estimasi pengiriman ke Bogor?',
        a: '1–3 hari setelah produksi selesai, memakai armada sendiri dengan rak pengaman kaca.',
      },
    ],
  },
]

export function getShapePage(slug: string): ShapePage | undefined {
  return SHAPE_PAGES.find((p) => p.slug === slug)
}

export function getAreaPage(slug: string): AreaPage | undefined {
  return AREA_PAGES.find((p) => p.slug === slug)
}

// Peta shape value -> slug landing page (untuk link dari filter, nav, dst.)
export const SHAPE_SLUGS: Partial<Record<ProductShape, string>> = {
  bulat: 'jendela-bulat',
  lengkung: 'jendela-lengkung',
  setengah_lingkaran: 'jendela-setengah-lingkaran',
  oval: 'jendela-oval',
}
