import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ProductGallery } from '@/components/product/ProductGallery'
import { SHAPE_LABELS } from '@/lib/constants'
import { buildQuoteUrl } from '@/lib/whatsapp'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('name, description')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!data) return {}
  return {
    title: data.name,
    description: data.description ?? undefined,
  }
}

export default async function DetailProdukPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!product) notFound()

  const waUrl = buildQuoteUrl({
    nama: '',
    hp: '',
    area: '',
    bentuk: SHAPE_LABELS[product.shape as keyof typeof SHAPE_LABELS],
    jumlah: '1',
    produk: product.name,
  })

  const specs = product.specifications as Record<string, string> | null

  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/katalog" className="hover:text-tosca transition">
          Katalog
        </Link>{' '}
        &rsaquo; <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        <ProductGallery images={product.images ?? []} productName={product.name} />

        <div>
          <span className="inline-block bg-tosca-light text-tosca text-xs font-medium px-3 py-1 rounded-full mb-3">
            {SHAPE_LABELS[product.shape as keyof typeof SHAPE_LABELS]}
          </span>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          {product.price_label && (
            <p className="text-2xl font-bold text-tosca mb-4">
              {product.price_label}
            </p>
          )}

          {product.description && (
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>
          )}

          {specs && Object.keys(specs).length > 0 && (
            <div className="mb-6">
              <h2 className="font-semibold mb-3">Spesifikasi</h2>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(specs).map(([k, v]) => (
                    <tr key={k} className="border-b border-gray-100">
                      <td className="py-2 text-gray-500 w-1/2">{k}</td>
                      <td className="py-2 font-medium">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-tosca text-white font-semibold py-4 rounded-full hover:bg-tosca-dark transition mb-3"
          >
            Minta Penawaran via WhatsApp
          </a>

          <div className="bg-tosca-light rounded-xl p-4 text-sm text-gray-600">
            <p className="font-medium text-ink mb-1">Cara pemesanan:</p>
            <p>
              Konsultasi → Survei & Quote → DP → Produksi → Pelunasan → Kirim
            </p>
            <Link
              href="/cara-pemesanan"
              className="text-tosca hover:underline text-xs mt-1 inline-block"
            >
              Lihat detail cara pesan &rsaquo;
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
