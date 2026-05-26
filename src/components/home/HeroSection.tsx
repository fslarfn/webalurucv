import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { HeroCarousel } from './HeroCarousel'
import type { HeroSlide } from '@/types'

type SlidePreview = Pick<HeroSlide, 'id' | 'image_url' | 'judul' | 'link_tujuan'>

async function fetchSlides(): Promise<SlidePreview[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('hero_slides')
      .select('id, image_url, judul, link_tujuan')
      .eq('is_active', true)
      .order('urutan', { ascending: true })
    if (error || !data) return []
    return data
  } catch {
    return []
  }
}

export async function HeroSection() {
  const slides = await fetchSlides()

  return (
    <section className="bg-tosca-light">
      <div className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-tosca-dark font-semibold text-sm uppercase tracking-widest mb-3">
            Spesialis Jendela Aluminium Custom
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5 text-ink">
            Jendela Bulat &amp; Lengkung —{' '}
            <span className="text-tosca">Kirim Cepat ke Seluruh Jabodetabek</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Alucurv memproduksi jendela aluminium berbentuk unik dengan kualitas
            premium. Dikirim dengan armada sendiri — bukan ekspedisi pihak
            ketiga, jadi barang besar &amp; rapuh lebih aman sampai.
          </p>
          <ul className="text-sm text-gray-700 space-y-1.5 mb-8">
            <li>&#10003; Khusus area <strong>Jabodetabek</strong></li>
            <li>&#10003; Pengiriman cepat dengan armada sendiri</li>
            <li>&#10003; Konsultasi ukuran</li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/penawaran"
              className="bg-tosca text-white font-medium px-6 py-3 rounded-full hover:bg-tosca-dark transition"
            >
              Konsultasi Sekarang
            </Link>
            <Link
              href="/katalog"
              className="bg-white border border-gray-300 font-medium px-6 py-3 rounded-full hover:border-tosca transition"
            >
              Lihat Katalog
            </Link>
          </div>
        </div>

        <HeroCarousel slides={slides} />
      </div>
    </section>
  )
}
