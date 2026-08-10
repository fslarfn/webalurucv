import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createPublicClient } from '@/lib/supabase/public'
import { WA_URL } from '@/lib/constants'
import { TIKTOK_VIDEOS, TIKTOK_PROFILE_URL, tiktokVideoUrl } from '@/lib/videos'
import { TikTokEmbed } from '@/components/gallery/TikTokEmbed'

export const metadata: Metadata = {
  title: 'Galeri Proyek — Hasil Pemasangan Jendela Aluminium',
  description:
    'Dokumentasi asli pemasangan jendela aluminium bulat, lengkung, dan oval Alucurv di rumah pelanggan se-Jabodetabek. Lihat hasil pengerjaannya sebelum memesan.',
  alternates: { canonical: '/galeri' },
}

// ISR: cache 5 menit agar TTFB cepat tanpa query Supabase per request
export const revalidate = 300

export default async function GaleriPage() {
  const supabase = createPublicClient()
  const { data: items } = await supabase
    .from('gallery_projects')
    .select('*')
    .eq('is_active', true)
    .order('urutan', { ascending: true })

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-bold mb-3">Galeri Proyek</h1>
      <p className="text-gray-600 mb-10 max-w-2xl">
        Dokumentasi asli pengerjaan dan pemasangan jendela aluminium Alucurv di
        rumah pelanggan kami di Jabodetabek — bukan foto katalog, tapi hasil
        nyata di lokasi.
      </p>

      {!items || items.length === 0 ? (
        <div className="bg-tosca-light rounded-xl p-8 text-gray-600 max-w-2xl">
          <p className="mb-3">
            Galeri sedang kami isi dengan dokumentasi proyek terbaru.
          </p>
          <p className="text-sm">
            Sementara itu, Anda bisa melihat contoh pengerjaan kami via{' '}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-tosca font-medium hover:underline"
            >
              WhatsApp
            </a>{' '}
            atau jelajahi <Link href="/katalog" className="text-tosca font-medium hover:underline">katalog produk</Link>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <figure
              key={item.id}
              className="rounded-xl overflow-hidden border border-gray-100 bg-white"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={item.image_url}
                  alt={`${item.judul}${item.lokasi ? ` — ${item.lokasi}` : ''}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="p-4">
                <p className="font-semibold text-sm">{item.judul}</p>
                {item.lokasi && (
                  <p className="text-tosca text-xs font-medium mt-0.5">
                    📍 {item.lokasi}
                  </p>
                )}
                {item.keterangan && (
                  <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                    {item.keterangan}
                  </p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <section className="mt-14">
        <h2 className="text-2xl font-bold mb-2">Video Dokumentasi Proyek</h2>
        <p className="text-gray-600 text-sm mb-8 max-w-2xl">
          Rekaman asli pemasangan dan kunjungan kembali ke rumah pelanggan
          kami — langsung dari TikTok{' '}
          <a
            href={TIKTOK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-tosca font-medium hover:underline"
          >
            @alucurvreal_official
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
          {TIKTOK_VIDEOS.map((v) => (
            <TikTokEmbed key={v.id} url={tiktokVideoUrl(v.id)} videoId={v.id} />
          ))}
        </div>
      </section>

      <div className="mt-14 bg-tosca-light rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold mb-2">
          Ingin jendela seperti ini di rumah Anda?
        </h2>
        <p className="text-gray-600 text-sm mb-5 max-w-xl mx-auto">
          Semua proyek di atas dibuat berdasarkan ukuran masing-masing rumah.
          Kirim ukuran Anda, kami buatkan penawarannya — gratis.
        </p>
        <Link
          href="/penawaran"
          className="inline-block bg-tosca text-white font-medium px-7 py-3 rounded-full hover:bg-tosca-dark transition"
        >
          Minta Penawaran Gratis
        </Link>
      </div>
    </div>
  )
}
