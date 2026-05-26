import type { Metadata } from 'next'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductFilter } from '@/components/product/ProductFilter'
import type { ProductShape } from '@/types'

export const metadata: Metadata = {
  title: 'Katalog Produk',
  description:
    'Katalog jendela aluminium bulat, lengkung, setengah lingkaran, dan custom. Hanya untuk Jabodetabek.',
}

interface Props {
  searchParams: Promise<{ bentuk?: string }>
}

export default async function KatalogPage({ searchParams }: Props) {
  const { bentuk } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (bentuk) {
    query = query.eq('shape', bentuk as ProductShape)
  }

  const { data: products } = await query

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-bold mb-2">Katalog Produk</h1>
      <p className="text-gray-500 mb-8">
        Jendela aluminium custom berbentuk unik, kirim cepat ke{' '}
        <strong>Jabodetabek</strong>
      </p>

      <Suspense>
        <ProductFilter />
      </Suspense>

      <ProductGrid products={products ?? []} />
    </div>
  )
}
