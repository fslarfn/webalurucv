import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import { createPublicClient } from '@/lib/supabase/public'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductFilter } from '@/components/product/ProductFilter'
import { SHAPES } from '@/lib/constants'
import { SHAPE_SLUGS } from '@/lib/landing'
import type { ProductShape } from '@/types'

export const metadata: Metadata = {
  title: 'Katalog Produk',
  description:
    'Katalog jendela aluminium bulat, lengkung, setengah lingkaran, oval, dan custom. Kirim cepat Jabodetabek.',
  alternates: { canonical: '/katalog' },
}

// Whitelist nilai filter — harus sama persis dengan nilai di database dan menu nav
const VALID_SHAPES = new Set<string>(SHAPES.map((s) => s.value))

interface Props {
  searchParams: Promise<{ bentuk?: string }>
}

export default async function KatalogPage({ searchParams }: Props) {
  const { bentuk } = await searchParams

  // Abaikan nilai bentuk yang tidak valid agar query tidak error
  const safeShape = bentuk && VALID_SHAPES.has(bentuk) ? (bentuk as ProductShape) : null

  // URL lama ?bentuk=bulat dialihkan permanen ke landing page /katalog/jendela-bulat
  if (safeShape && SHAPE_SLUGS[safeShape]) {
    permanentRedirect(`/katalog/${SHAPE_SLUGS[safeShape]}`)
  }

  const supabase = createPublicClient()

  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (safeShape) {
    query = query.eq('shape', safeShape)
  }

  const { data: products } = await query

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-bold mb-2">Katalog Produk</h1>
      <p className="text-gray-500 mb-8">
        Jendela aluminium custom berbentuk unik, kirim cepat ke{' '}
        <strong>Jabodetabek</strong>
      </p>

      <ProductFilter current={safeShape} />

      <ProductGrid products={products ?? []} />
    </div>
  )
}
