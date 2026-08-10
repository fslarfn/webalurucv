'use client'

import { useEffect } from 'react'

const EMBED_SRC = 'https://www.tiktok.com/embed.js'

// Blockquote embed resmi TikTok. Script embed.js mengubah semua
// <blockquote class="tiktok-embed"> di halaman menjadi player video.
export function TikTokEmbed({ url, videoId }: { url: string; videoId: string }) {
  useEffect(() => {
    // Muat ulang script setiap mount agar blockquote baru ikut diparse
    // (embed.js hanya memproses blockquote yang ada saat script dieksekusi).
    document
      .querySelectorAll(`script[src="${EMBED_SRC}"]`)
      .forEach((s) => s.remove())
    const script = document.createElement('script')
    script.src = EMBED_SRC
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <blockquote
      className="tiktok-embed"
      cite={url}
      data-video-id={videoId}
      style={{ maxWidth: 325, minWidth: 288, margin: 0 }}
    >
      <section>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Tonton di TikTok
        </a>
      </section>
    </blockquote>
  )
}
