import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [{ count: total }, { count: aktif }, { count: featured }] =
    await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true),
      supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('is_featured', true),
    ])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          href="/admin/produk/tambah"
          className="bg-tosca text-white font-medium px-5 py-2.5 rounded-full hover:bg-tosca-dark transition text-sm"
        >
          + Tambah Produk
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-gray-500 text-sm">Total Produk</p>
          <p className="text-3xl font-bold mt-1">{total ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-gray-500 text-sm">Produk Aktif</p>
          <p className="text-3xl font-bold mt-1 text-tosca">{aktif ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-gray-500 text-sm">Produk Unggulan</p>
          <p className="text-3xl font-bold mt-1">{featured ?? 0}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="font-semibold mb-3">Aksi Cepat</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/produk"
            className="border border-gray-200 px-4 py-2 rounded-lg text-sm hover:border-tosca transition"
          >
            Kelola Produk
          </Link>
          <Link
            href="/admin/produk/tambah"
            className="border border-gray-200 px-4 py-2 rounded-lg text-sm hover:border-tosca transition"
          >
            Tambah Produk Baru
          </Link>
          <a
            href="/"
            target="_blank"
            className="border border-gray-200 px-4 py-2 rounded-lg text-sm hover:border-tosca transition"
          >
            Lihat Website Publik ↗
          </a>
        </div>
      </div>
    </div>
  )
}
