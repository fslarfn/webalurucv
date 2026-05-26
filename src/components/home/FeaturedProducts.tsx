import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ProductCard } from '@/components/product/ProductCard'

export async function FeaturedProducts() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .limit(4)

  if (!products || products.length === 0) return null

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Produk Terlaris</h2>
            <p className="text-gray-500 text-sm">
              Pilihan favorit pelanggan Alucurv
            </p>
          </div>
          <Link
            href="/katalog"
            className="text-tosca text-sm font-medium hover:underline"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
