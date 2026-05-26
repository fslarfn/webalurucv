// Ganti data di bawah dengan testimoni asli dari pelanggan Anda
const TESTIMONIALS = [
  {
    stars: 5,
    text: 'Kualitas jendela bulatnya bagus banget, finishing rapi. Pengiriman juga cepat dan aman walau ukurannya besar.',
    name: 'Budi S.',
    location: 'Jakarta Selatan',
  },
  {
    stars: 5,
    text: 'Sudah pesan 3x di Alucurv. Jendela lengkung untuk rumah saya hasilnya selalu memuaskan. Konsultasinya juga sabar.',
    name: 'Hendra W.',
    location: 'Bekasi',
  },
  {
    stars: 5,
    text: 'Armada pengirimannya profesional, jendela sampai dalam kondisi sempurna. Sangat rekomendasikan untuk area Tangerang.',
    name: 'Rina P.',
    location: 'Tangerang Selatan',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <p className="text-yellow-500 text-sm mb-2" aria-label={`${count} bintang`}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </p>
  )
}

export function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <h2 className="text-2xl font-bold mb-2 text-center">
        Kata Pelanggan Kami
      </h2>
      <p className="text-gray-500 text-sm text-center mb-10">
        Pengalaman nyata pelanggan Alucurv di Jabodetabek
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-xl p-6"
          >
            <Stars count={t.stars} />
            <p className="text-gray-600 text-sm mb-4">"{t.text}"</p>
            <p className="font-semibold text-sm">{t.name}</p>
            <p className="text-gray-400 text-xs">{t.location}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
