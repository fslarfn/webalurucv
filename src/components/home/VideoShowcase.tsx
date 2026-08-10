import Link from 'next/link'
import { getTikTokVideosWithMeta } from '@/lib/videos'
import { TikTokLite } from '@/components/gallery/TikTokLite'

export async function VideoShowcase() {
  const videos = await getTikTokVideosWithMeta()

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-end justify-between mb-2">
          <h2 className="text-2xl font-bold">Video Proyek Kami</h2>
          <Link
            href="/galeri"
            className="text-tosca text-sm font-medium hover:underline"
          >
            Lihat Galeri Lengkap
          </Link>
        </div>
        <p className="text-gray-500 text-sm mb-8">
          Dokumentasi asli pemasangan di rumah pelanggan Alucurv — klik untuk
          memutar
        </p>
        <div className="flex flex-wrap gap-6 justify-center lg:justify-between">
          {videos.map((v) => (
            <TikTokLite
              key={v.id}
              videoId={v.id}
              url={v.url}
              label={v.label}
              thumbnail={v.thumbnail}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
