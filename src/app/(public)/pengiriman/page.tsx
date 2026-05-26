import type { Metadata } from 'next'
import Link from 'next/link'
import { DELIVERY_AREAS, WA_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Area & Estimasi Pengiriman',
  description:
    'Alucurv melayani pengiriman jendela aluminium ke seluruh Jabodetabek dengan armada sendiri. Lihat estimasi waktu pengiriman per area.',
}

const AREA_DETAIL = [
  { city: 'Jakarta', areas: ['Jakarta Pusat', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Selatan', 'Jakarta Timur'] },
  { city: 'Bogor', areas: ['Kota Bogor', 'Kabupaten Bogor', 'Cibinong', 'Depok (perbatasan)'] },
  { city: 'Depok', areas: ['Depok', 'Cimanggis', 'Beji', 'Sawangan'] },
  { city: 'Tangerang', areas: ['Kota Tangerang', 'Tangerang Selatan', 'Kabupaten Tangerang'] },
  { city: 'Bekasi', areas: ['Kota Bekasi', 'Kabupaten Bekasi', 'Cikarang'] },
]

export default function PengirimanPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-bold mb-3">Area &amp; Estimasi Pengiriman</h1>
      <p className="text-gray-600 mb-10 max-w-2xl">
        Kami khusus melayani area <strong>Jabodetabek</strong> menggunakan armada
        pengiriman sendiri. Tidak pakai ekspedisi pihak ketiga — jadi jendela
        besar &amp; rapuh lebih aman sampai ke lokasi Anda.
      </p>

      <div className="grid md:grid-cols-5 gap-4 mb-12">
        {DELIVERY_AREAS.map((a) => (
          <div
            key={a.name}
            className="border border-gray-100 rounded-xl p-5 text-center hover:border-tosca transition"
          >
            <p className="font-bold text-lg">{a.name}</p>
            <p className="text-tosca font-medium text-sm mt-1">
              {a.estimate}
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-6">Detail Area yang Dilayani</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {AREA_DETAIL.map((d) => (
          <div key={d.city} className="bg-gray-50 rounded-xl p-5">
            <p className="font-semibold text-ink mb-2">{d.city}</p>
            <ul className="text-sm text-gray-600 space-y-1">
              {d.areas.map((a) => (
                <li key={a} className="flex items-center gap-1.5">
                  <span className="text-tosca">&#10003;</span> {a}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-tosca-light rounded-xl p-6">
        <h3 className="font-bold mb-2">Ongkos Kirim</h3>
        <p className="text-gray-600 text-sm mb-4">
          Ongkos kirim dihitung berdasarkan jarak, jumlah, dan ukuran produk.
          Kami akan memberikan estimasi ongkir saat sesi konsultasi via WhatsApp.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-tosca text-white font-medium px-6 py-2.5 rounded-full hover:bg-tosca-dark transition text-sm"
        >
          Tanya Ongkir via WhatsApp
        </a>
      </div>

      <p className="text-gray-400 text-xs mt-6">
        *Untuk area di luar Jabodetabek, silakan{' '}
        <Link href="/kontak" className="text-tosca hover:underline">
          hubungi kami
        </Link>{' '}
        untuk dicek ketersediaannya.
      </p>
    </div>
  )
}
