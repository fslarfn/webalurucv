import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { SHAPE_LABELS } from '@/lib/constants'
import { ProductActions } from './ProductActions'
import type { Product } from '@/types'

export default async function AdminProdukPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })

  const total = products?.length ?? 0
  const aktif = products?.filter((p) => p.is_active).length ?? 0

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Daftar Produk</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {total} produk &middot; {aktif} aktif
          </p>
        </div>
        <Link
          href="/admin/produk/tambah"
          className="bg-tosca text-white font-medium px-5 py-2.5 rounded-full hover:bg-tosca-dark transition text-sm"
        >
          + Tambah Produk
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Foto</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Nama Produk</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Bentuk</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Harga</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(products ?? []).map((product: Product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 relative shrink-0">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                        –
                      </div>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-gray-400 text-xs">/produk/{product.slug}</p>
                </td>

                <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                  {SHAPE_LABELS[product.shape]}
                </td>

                <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                  {product.price_label ?? '–'}
                </td>

                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {product.is_active ? (
                      <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                        Aktif
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2 py-1 rounded-full">
                        Tersembunyi
                      </span>
                    )}
                    {product.is_featured && (
                      <span className="bg-tosca-light text-tosca text-xs font-medium px-2 py-1 rounded-full">
                        Unggulan
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3">
                  <ProductActions id={product.id} isActive={product.is_active} />
                </td>
              </tr>
            ))}

            {(!products || products.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center text-gray-400">
                  <p className="mb-3">Belum ada produk.</p>
                  <Link
                    href="/admin/produk/tambah"
                    className="bg-tosca text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-tosca-dark transition"
                  >
                    Tambah Produk Pertama
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
