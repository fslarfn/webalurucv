'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Props {
  videoId: string
  url: string
  label: string
  thumbnail: string | null
}

// "Lite embed": tampilkan thumbnail + tombol play, iframe player TikTok baru
// dimuat saat diklik. Menghindari error "overload-protect" TikTok yang muncul
// bila beberapa player dimuat serentak (terutama di mobile), sekaligus
// membuat halaman jauh lebih ringan.
export function TikTokLite({ videoId, url, label, thumbnail }: Props) {
  const [playing, setPlaying] = useState(false)

  return (
    <figure className="w-[260px] sm:w-[280px] shrink-0">
      <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-ink">
        {playing ? (
          <iframe
            src={`https://www.tiktok.com/embed/v2/${videoId}`}
            title={label}
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Putar video: ${label}`}
            className="absolute inset-0 w-full h-full group text-left"
          >
            {thumbnail && (
              <Image
                src={thumbnail}
                alt={label}
                fill
                sizes="280px"
                className="object-cover"
              />
            )}
            <span className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg transition">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-tosca ml-0.5"
                  aria-hidden="true"
                >
                  <path d="M8 5.14v13.72L19 12 8 5.14z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-2">
        <p className="text-sm font-medium leading-snug">{label}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-400 hover:text-tosca transition"
        >
          Tonton di TikTok &rsaquo;
        </a>
      </figcaption>
    </figure>
  )
}
