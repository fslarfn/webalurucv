import { DELIVERY_AREAS } from '@/lib/constants'

export function DeliverySection() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-2">
          Area &amp; Estimasi Pengiriman
        </h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          Kami melayani seluruh <strong>Jabodetabek</strong> dengan armada
          pengiriman sendiri. Ongkos kirim dihitung saat konsultasi sesuai
          jumlah &amp; lokasi pemasangan.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {DELIVERY_AREAS.map((area) => (
          <div
            key={area.name}
            className="border border-gray-100 rounded-xl p-5 text-center hover:border-tosca transition"
          >
            <p className="font-semibold">{area.name}</p>
            <p className="text-gray-500 text-xs mt-1">
              Estimasi {area.estimate}
            </p>
          </div>
        ))}
      </div>

      <p className="text-gray-400 text-xs text-center mt-4">
        *Estimasi dapat berubah tergantung antrean produksi &amp; jadwal
        pemasangan.
      </p>
    </section>
  )
}
