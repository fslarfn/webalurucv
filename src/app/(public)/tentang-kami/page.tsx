import type { Metadata } from 'next'
import Link from 'next/link'
import { WORKSHOP_ADDRESS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description:
    'Alucurv adalah workshop spesialis jendela aluminium bulat dan lengkung yang melayani Jabodetabek sejak lama.',
}

export default function TentangKamiPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-bold mb-6">Tentang Alucurv</h1>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-4 mb-12">
        <p>
          <strong className="text-ink">Alucurv</strong> adalah workshop spesialis
          jendela aluminium custom berbentuk bulat dan lengkung yang berlokasi di{' '}
          <strong className="text-ink">Bekasi, Jawa Barat</strong>. Kami melayani
          seluruh area <strong className="text-ink">Jabodetabek</strong>.
        </p>
        <p>
          Berawal dari passion terhadap arsitektur dan kerajinan aluminium, kami
          memfokuskan diri pada jendela dengan bentuk-bentuk yang tidak umum —
          bulat, lengkung, setengah lingkaran, oval, dan desain custom sesuai
          keinginan pelanggan. Kami percaya bahwa jendela bukan hanya fungsi,
          tetapi juga elemen estetika yang memberi karakter pada sebuah bangunan.
        </p>
        <p>
          Keunggulan utama kami adalah{' '}
          <strong className="text-ink">pengiriman dengan armada sendiri</strong> —
          bukan melalui ekspedisi pihak ketiga. Ini penting karena produk jendela
          berukuran besar dan rentan rusak saat dikirim dengan cara yang tidak tepat.
          Dengan armada sendiri, kami memastikan setiap produk sampai dalam kondisi
          sempurna.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-12">
        {[
          { title: 'Produksi Presisi', desc: 'Setiap jendela dikerjakan dengan alat ukur akurat agar fit sempurna di lubang dinding.' },
          { title: 'Material Premium', desc: 'Profil aluminium berkualitas, anti karat, tahan cuaca, dan finishing rapi.' },
          { title: 'Pengiriman Aman', desc: 'Armada pengiriman sendiri khusus untuk produk besar dan rapuh.' },
        ].map((item) => (
          <div key={item.title} className="bg-tosca-light rounded-xl p-5">
            <h3 className="font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="border border-gray-100 rounded-xl p-6">
        <h2 className="font-bold text-lg mb-2">Workshop Kami</h2>
        <p className="text-gray-600 text-sm">{WORKSHOP_ADDRESS}</p>
        <Link
          href="/kontak"
          className="text-tosca hover:underline text-sm mt-3 inline-block"
        >
          Lihat peta &amp; jam operasional &rsaquo;
        </Link>
      </div>
    </div>
  )
}
