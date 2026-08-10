import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createPublicClient } from '@/lib/supabase/public'
import { ProductGrid } from '@/components/product/ProductGrid'
import { SHAPE_PAGES, AREA_PAGES, getShapePage } from '@/lib/landing'
import { SITE_URL } from '@/lib/constants'

interface Props {
  params: Promise<{ bentuk: string }>
}

// ISR: cache 5 menit agar TTFB cepat tanpa query Supabase per request
export const revalidate = 300

export function generateStaticParams() {
  return SHAPE_PAGES.map((p) => ({ bentuk: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bentuk } = await params
  const page = getShapePage(bentuk)
  if (!page) return {}
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/katalog/${page.slug}` },
    openGraph: {
      title: `${page.title} | Alucurv`,
      description: page.description,
      type: 'website',
      locale: 'id_ID',
      siteName: 'Alucurv',
    },
  }
}

export default async function ShapeLandingPage({ params }: Props) {
  const { bentuk } = await params
  const page = getShapePage(bentuk)
  if (!page) notFound()

  const supabase = createPublicClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('shape', page.shape)
    .order('sort_order', { ascending: true })

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Katalog', item: `${SITE_URL}/katalog` },
      { '@type': 'ListItem', position: 3, name: page.label, item: `${SITE_URL}/katalog/${page.slug}` },
    ],
  }

  const otherShapes = SHAPE_PAGES.filter((p) => p.slug !== page.slug)

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/katalog" className="hover:text-tosca transition">
          Katalog
        </Link>{' '}
        &rsaquo; <span className="text-ink">{page.label}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{page.h1}</h1>
      <div className="text-gray-600 leading-relaxed space-y-3 max-w-3xl mb-8">
        {page.intro.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mb-10">
        <Link
          href="/penawaran"
          className="bg-tosca text-white font-medium px-6 py-3 rounded-full hover:bg-tosca-dark transition"
        >
          Minta Penawaran Gratis
        </Link>
        <Link
          href="/cara-pemesanan"
          className="border border-gray-300 font-medium px-6 py-3 rounded-full hover:border-tosca transition"
        >
          Lihat Cara Pemesanan
        </Link>
      </div>

      {products && products.length > 0 ? (
        <>
          <h2 className="text-xl font-bold mb-5">
            Model {page.label} yang Tersedia
          </h2>
          <ProductGrid products={products} />
        </>
      ) : (
        <div className="bg-tosca-light rounded-xl p-6 text-sm text-gray-600">
          Model untuk kategori ini sedang kami perbarui. Hubungi kami via
          WhatsApp untuk melihat contoh pengerjaan terbaru.
        </div>
      )}

      <section className="mt-14 max-w-3xl">
        <h2 className="text-xl font-bold mb-5">Pertanyaan yang Sering Diajukan</h2>
        <div className="space-y-5">
          {page.faq.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold mb-1">{f.q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-gray-100 pt-8 text-sm">
        <p className="font-semibold mb-3">Lihat bentuk lainnya:</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {otherShapes.map((p) => (
            <Link
              key={p.slug}
              href={`/katalog/${p.slug}`}
              className="px-4 py-2 rounded-full border border-gray-200 hover:border-tosca hover:text-tosca transition"
            >
              {p.label}
            </Link>
          ))}
          <Link
            href="/katalog"
            className="px-4 py-2 rounded-full border border-gray-200 hover:border-tosca hover:text-tosca transition"
          >
            Semua Produk
          </Link>
        </div>
        <p className="font-semibold mb-3">Area layanan kami:</p>
        <div className="flex flex-wrap gap-2">
          {AREA_PAGES.map((a) => (
            <Link
              key={a.slug}
              href={`/area/${a.slug}`}
              className="px-4 py-2 rounded-full border border-gray-200 hover:border-tosca hover:text-tosca transition"
            >
              {a.city}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
