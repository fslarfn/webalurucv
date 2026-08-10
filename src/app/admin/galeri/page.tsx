import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

export default async function AdminGaleriPage() {
  const supabase = await createClient()
  const { data: items } = await supabase
    .from('gallery_projects')
    .select('*')
    .order('urutan', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Kelola Galeri Proyek</h1>
        <Link
          href="/admin/galeri/tambah"
          className="bg-tosca text-white font-medium px-5 py-2.5 rounded-full hover:bg-tosca-dark transition text-sm"
        >
          + Tambah Foto
        </Link>
      </div>

      {!items || items.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
          <p>
            Belum ada foto proyek. Tambahkan dokumentasi pemasangan terbaik
            Anda — ini yang paling meyakinkan calon pembeli.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 items-center"
            >
              <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                <Image
                  src={item.image_url}
                  alt={item.judul}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.judul}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {item.lokasi ?? 'Tanpa lokasi'}
                  {' · '}Urutan: {item.urutan}
                </p>
              </div>

              <span
                className={`text-xs px-2.5 py-1 rounded-full shrink-0 font-medium ${
                  item.is_active
                    ? 'bg-green-50 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {item.is_active ? 'Tampil' : 'Sembunyi'}
              </span>

              <Link
                href={`/admin/galeri/${item.id}`}
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
