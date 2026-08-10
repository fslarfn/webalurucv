import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createPublicClient } from '@/lib/supabase/public'
import { ProductGrid } from '@/components/product/ProductGrid'
import { AREA_PAGES, SHAPE_PAGES, getAreaPage } from '@/lib/landing'
import { SITE_URL, WORKSHOP_ADDRESS } from '@/lib/constants'
import { buildSimpleUrl } from '@/lib/whatsapp'

interface Props {
  params: Promise<{ kota: string }>
}

// ISR: cache 5 menit agar TTFB cepat tanpa query Supabase per request
export const revalidate = 300

export function generateStaticParams() {
  return AREA_PAGES.map((p) => ({ kota: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kota } = await params
  const page = getAreaPage(kota)
  if (!page) return {}
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/area/${page.slug}` },
    openGraph: {
      title: `${page.title} | Alucurv`,
      description: page.description,
      type: 'website',
      locale: 'id_ID',
      siteName: 'Alucurv',
    },
  }
}

export default async function AreaLandingPage({ params }: Props) {
  const { kota } = await params
  const page = getAreaPage(kota)
  if (!page) notFound()

  const supabase = createPublicClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(4)

  const waUrl = buildSimpleUrl(
    `Halo Alucurv, saya dari ${page.city}. Saya ingin tanya jendela aluminium custom.`
  )

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
      { '@type': 'ListItem', position: 2, name: 'Area Pengiriman', item: `${SITE_URL}/pengiriman` },
      { '@type': 'ListItem', position: 3, name: page.city, item: `${SITE_URL}/area/${page.slug}` },
    ],
  }

  const otherAreas = AREA_PAGES.filter((a) => a.slug !== page.slug)

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
        <Link href="/pengiriman" className="hover:text-tosca transition">
          Area Pengiriman
        </Link>{' '}
        &rsaquo; <span className="text-ink">{page.city}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{page.h1}</h1>
      <div className="text-gray-600 leading-relaxed space-y-3 max-w-3xl mb-8">
        {page.intro.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-10 max-w-3xl">
        <div className="border border-gray-100 rounded-xl p-4 text-center">
          <p className="text-tosca font-bold text-lg">{page.estimate}</p>
          <p className="text-xs text-gray-500 mt-1">Estimasi pengiriman</p>
        </div>
        <div className="border border-gray-100 rounded-xl p-4 text-center">
          <p className="text-tosca font-bold text-lg">Armada Sendiri</p>
          <p className="text-xs text-gray-500 mt-1">Bukan ekspedisi umum</p>
        </div>
        <div className="border border-gray-100 rounded-xl p-4 text-center">
          <p className="text-tosca font-bold text-lg">Custom Ukuran</p>
          <p className="text-xs text-gray-500 mt-1">Sesuai bukaan rumah Anda</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-10">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-tosca text-white font-medium px-6 py-3 rounded-full hover:bg-tosca-dark transition"
        >
          Konsultasi via WhatsApp
        </a>
        <Link
          href="/penawaran"
          className="border border-gray-300 font-medium px-6 py-3 rounded-full hover:border-tosca transition"
        >
          Isi Form Penawaran
        </Link>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-3">
          Wilayah {page.city} yang Kami Layani
        </h2>
        <ul className="flex flex-wrap gap-2 text-sm">
          {page.coverage.map((c) => (
            <li
              key={c}
              className="bg-tosca-light text-ink px-4 py-1.5 rounded-full"
            >
              &#10003; {c}
            </li>
          ))}
        </ul>
      </section>

      {products && products.length > 0 && (
        <section className="mb-12">
          <div className="flex items-end justify-between mb-5">
            <h2 className="text-xl font-bold">Contoh Produk Kami</h2>
            <Link
              href="/katalog"
              className="text-tosca text-sm font-medium hover:underline"
            >
              Lihat Semua
            </Link>
          </div>
          <ProductGrid products={products} />
        </section>
      )}

      <section className="max-w-3xl mb-12">
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

      <section className="border-t border-gray-100 pt-8 text-sm">
        <p className="text-gray-500 mb-4">
          Workshop: {WORKSHOP_ADDRESS}
        </p>
        <p className="font-semibold mb-3">Jenis jendela yang bisa dipesan:</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {SHAPE_PAGES.map((p) => (
            <Link
              key={p.slug}
              href={`/katalog/${p.slug}`}
              className="px-4 py-2 rounded-full border border-gray-200 hover:border-tosca hover:text-tosca transition"
            >
              {p.label}
            </Link>
          ))}
        </div>
        <p className="font-semibold mb-3">Area layanan lainnya:</p>
        <div className="flex flex-wrap gap-2">
          {otherAreas.map((a) => (
            <Link
              key={a.slug}
              href={`/area/${a.slug}`}
              className="px-4 py-2 rounded-full border border-gray-200 hover:border-tosca hover:text-tosca transition"
            >
              Jendela Aluminium {a.city}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
