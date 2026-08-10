import Link from 'next/link'
import { TIKTOK_VIDEOS, tiktokVideoUrl } from '@/lib/videos'
import { TikTokEmbed } from '@/components/gallery/TikTokEmbed'

export function VideoShowcase() {
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
          Dokumentasi asli pemasangan di rumah pelanggan Alucurv
        </p>
        <div className="flex flex-wrap gap-6 justify-center lg:justify-between">
          {TIKTOK_VIDEOS.map((v) => (
            <TikTokEmbed key={v.id} url={tiktokVideoUrl(v.id)} videoId={v.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
