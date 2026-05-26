import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Cara Pemesanan',
  description:
    'Cara memesan jendela aluminium custom Alucurv: konsultasi, survei, DP, produksi, hingga pengiriman ke Jabodetabek.',
}

const STEPS = [
  {
    num: 1,
    title: 'Konsultasi',
    desc: 'Hubungi kami via WhatsApp. Ceritakan kebutuhan Anda: bentuk jendela, area, dan estimasi ukuran. Kami bantu tentukan spesifikasi yang tepat.',
  },
  {
    num: 2,
    title: 'Ukuran & Quote',
    desc: 'Diskusikan ukuran dan detail jendela via WhatsApp. Bisa kirim foto lubang jendela untuk referensi. Setelah detail disepakati, kami kirimkan penawaran harga.',
  },
  {
    num: 3,
    title: 'DP & Produksi',
    desc: 'Setelah sepakat, bayar Down Payment (DP) via transfer bank. Jendela langsung masuk antrian produksi di workshop kami.',
  },
  {
    num: 4,
    title: 'Pelunasan',
    desc: 'Saat jendela selesai diproduksi, kami kirimkan foto hasil. Lakukan pelunasan sisa pembayaran sebelum pengiriman.',
  },
  {
    num: 5,
    title: 'Kirim & Pasang',
    desc: 'Jendela dikirim dengan armada kami sendiri — aman untuk produk besar dan rapuh. Layanan pemasangan tersedia, hubungi kami untuk info lebih lanjut.',
  },
]

export default function CaraPemesananPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-bold mb-3">Cara Pemesanan</h1>
      <p className="text-gray-600 mb-10">
        Kami menggunakan sistem pembayaran bertahap: DP di awal, pelunasan
        sebelum pengiriman — untuk keamanan kedua belah pihak.
      </p>

      <div className="space-y-8 mb-12">
        {STEPS.map((step, i) => (
          <div key={step.num} className="flex gap-5">
            <div className="shrink-0">
              <div className="w-11 h-11 bg-tosca text-white rounded-full flex items-center justify-center font-bold text-lg">
                {step.num}
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-0.5 h-full bg-tosca/20 mx-auto mt-2" />
              )}
            </div>
            <div className="pb-8">
              <h2 className="font-bold text-lg mb-1">{step.title}</h2>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-tosca-light rounded-xl p-6 text-center">
        <p className="font-bold text-lg mb-2">Siap mulai konsultasi?</p>
        <p className="text-gray-600 text-sm mb-4">
          Chat langsung dengan tim kami via WhatsApp — response cepat pada jam
          operasional.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-tosca text-white font-medium px-6 py-3 rounded-full hover:bg-tosca-dark transition"
          >
            Chat WhatsApp
          </a>
          <Link
            href="/penawaran"
            className="bg-white border border-gray-300 font-medium px-6 py-3 rounded-full hover:border-tosca transition"
          >
            Isi Form Penawaran
          </Link>
        </div>
      </div>
    </div>
  )
}
