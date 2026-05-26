import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProductForm } from '../ProductForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProdukPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) notFound()

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Edit Produk</h1>
      <ProductForm product={product} />
    </div>
  )
}
