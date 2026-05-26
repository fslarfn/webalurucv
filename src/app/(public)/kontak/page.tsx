import type { Metadata } from 'next'
import { WA_URL, WORKSHOP_ADDRESS, OPERATING_HOURS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Kontak',
  description:
    'Hubungi Alucurv via WhatsApp atau kunjungi workshop kami di Bekasi. Melayani Jabodetabek.',
}

export default function KontakPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-bold mb-3">Kontak</h1>
      <p className="text-gray-600 mb-10">
        Cara tercepat menghubungi kami adalah via WhatsApp. Kami merespons
        pada jam operasional.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="space-y-5">
          <div className="border border-gray-100 rounded-xl p-5">
            <p className="font-semibold mb-1">WhatsApp</p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-tosca font-medium hover:underline"
            >
              0851 7989 3645
            </a>
            <p className="text-gray-500 text-xs mt-1">
              Respons cepat pada jam operasional
            </p>
          </div>

          <div className="border border-gray-100 rounded-xl p-5">
            <p className="font-semibold mb-1">Jam Operasional</p>
            <p className="text-gray-600 text-sm">{OPERATING_HOURS.weekdays}</p>
            <p className="text-gray-600 text-sm">{OPERATING_HOURS.weekend}</p>
          </div>

          <div className="border border-gray-100 rounded-xl p-5">
            <p className="font-semibold mb-1">Alamat Workshop</p>
            <p className="text-gray-600 text-sm">{WORKSHOP_ADDRESS}</p>
          </div>
        </div>

        {/* Peta Google Maps embed — ganti src dengan embed URL workshop Anda */}
        <div className="rounded-xl overflow-hidden border border-gray-100 min-h-[300px] bg-gray-50 flex items-center justify-center">
          <iframe
            src="https://maps.google.com/maps?q=Jl.+Mayor+Oking+No.71+Margahayu+Bekasi+Timur&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Workshop Alucurv"
          />
        </div>
      </div>

      <div className="bg-tosca-light rounded-xl p-6 text-center">
        <p className="font-bold text-lg mb-2">Langsung Chat Sekarang</p>
        <p className="text-gray-600 text-sm mb-4">
          Tanya produk, minta penawaran, atau konsultasi ukuran — semuanya
          bisa via WhatsApp.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-tosca text-white font-semibold px-7 py-3 rounded-full hover:bg-tosca-dark transition"
        >
          Buka WhatsApp
        </a>
      </div>
    </div>
  )
}
