import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { SITE_URL } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('is_active', true)

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/katalog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/pengiriman`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/cara-pemesanan`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/tentang-kami`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/kontak`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/penawaran`, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const productRoutes: MetadataRoute.Sitemap = (products ?? []).map((p) => ({
    url: `${SITE_URL}/produk/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...productRoutes]
}
