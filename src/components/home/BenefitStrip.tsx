const BENEFITS = [
  {
    title: 'Kirim Cepat Jabodetabek',
    desc: 'Armada pengiriman sendiri',
  },
  {
    title: 'Ukuran Custom',
    desc: 'Sesuai pesanan Anda',
  },
  {
    title: 'Aluminium Premium',
    desc: 'Anti karat & tahan cuaca',
  },
  {
    title: 'Garansi Pengerjaan',
    desc: 'Hasil rapi terjamin',
  },
]

export function BenefitStrip() {
  return (
    <section className="border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-4 py-6 text-center">
        {BENEFITS.map((b) => (
          <div key={b.title}>
            <p className="font-semibold text-sm">{b.title}</p>
            <p className="text-gray-500 text-xs">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
