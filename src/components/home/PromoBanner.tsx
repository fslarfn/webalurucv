import Link from 'next/link'

export function PromoBanner() {
  return (
    <section className="max-w-6xl mx-auto px-5 pb-14">
      <div className="bg-tosca rounded-2xl px-8 py-12 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Punya Desain Jendela Sendiri?
        </h2>
        <p className="text-white/90 mb-6 max-w-xl mx-auto">
          Kirim sketsa atau ukuran Anda, tim kami akan membantu mewujudkannya.
          Konsultasi ukuran, pengiriman cepat ke seluruh{' '}
          <strong>Jabodetabek</strong>.
        </p>
        <Link
          href="/penawaran"
          className="inline-block bg-white text-tosca font-semibold px-7 py-3 rounded-full hover:bg-tosca-light transition"
        >
          Konsultasi Sekarang
        </Link>
      </div>
    </section>
  )
}
