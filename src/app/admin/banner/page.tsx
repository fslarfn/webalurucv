import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

const LINK_LABELS: Record<string, string> = {
  '/katalog':   'Katalog',
  '/penawaran': 'Minta Penawaran',
}

export default async function BannerPage() {
  const supabase = await createClient()
  const { data: slides } = await supabase
    .from('hero_slides')
    .select('*')
    .order('urutan', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Kelola Banner Hero</h1>
        <Link
          href="/admin/banner/tambah"
          className="bg-tosca text-white font-medium px-5 py-2.5 rounded-full hover:bg-tosca-dark transition text-sm"
        >
          + Tambah Slide
        </Link>
      </div>

      {!slides || slides.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
          <p>Belum ada slide. Tambah slide pertama Anda.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 items-center"
            >
              <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                <Image
                  src={slide.image_url}
                  alt={slide.judul ?? 'Slide'}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {slide.judul ?? (
                    <span className="text-gray-400 italic">Tanpa judul</span>
                  )}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  Link: {LINK_LABELS[slide.link_tujuan] ?? slide.link_tujuan}
                  {' · '}Urutan: {slide.urutan}
                </p>
              </div>

              <span
                className={`text-xs px-2.5 py-1 rounded-full shrink-0 font-medium ${
                  slide.is_active
                    ? 'bg-green-50 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {slide.is_active ? 'Tampil' : 'Sembunyi'}
              </span>

              <Link
                href={`/admin/banner/${slide.id}`}
                className="text-sm text-tosca hover:underline shrink-0"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
