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
    .select('name, description, images')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!data) return {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alucurv.com'
  // Supabase Storage URL sudah absolut; fallback pakai URL absolut agar
  // tidak bergantung metadataBase saat domain belum di-set di env var.
  const ogImage = data.images?.[0] ?? `${siteUrl}/og-image.jpg`
  const description =
    data.description ??
    `Jendela aluminium ${data.name} dari Alucurv. Kirim cepat ke Jabodetabek.`

  return {
    title: data.name,
    description,
    openGraph: {
      title: `${data.name} | Alucurv`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: data.name }],
      type: 'website',
      locale: 'id_ID',
      siteName: 'Alucurv',
    },
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

  const rawSpecs = product.specifications as Record<string, string> | null
  // Filter entri dengan nilai kosong (terjadi bila input diakhiri ":" tanpa nilai)
  const specs = rawSpecs
    ? Object.fromEntries(
        Object.entries(rawSpecs).filter(([, v]) => v && v.trim() !== '')
      )
    : null

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
              <div className="rounded-xl border border-gray-100 overflow-hidden text-sm">
                {Object.entries(specs).map(([k, v], i) => (
                  <div
                    key={k}
                    className={`flex gap-4 px-4 py-2.5 ${
                      i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <span className="text-gray-500 w-2/5 shrink-0">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
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
              Konsultasi → Ukuran & Quote → DP → Produksi → Pelunasan → Kirim
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
