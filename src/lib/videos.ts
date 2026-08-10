// Video dokumentasi proyek dari TikTok @alucurvreal_official.
// Tambah/hapus video cukup edit daftar ini (id = angka di URL video).

export const TIKTOK_PROFILE_URL = 'https://www.tiktok.com/@alucurvreal_official'

export interface TikTokVideo {
  id: string
  label: string
}

export const TIKTOK_VIDEOS: TikTokVideo[] = [
  {
    id: '7656018734712179975',
    label: 'Visit 3 bulan setelah pemasangan jendela bulat',
  },
  {
    id: '7656771195177553173',
    label: 'Serah terima proyek pelanggan',
  },
  {
    id: '7659286894580108564',
    label: 'Pemasangan jendela & pintu aluminium',
  },
  {
    id: '7662664826870648085',
    label: 'Dokumentasi proyek Alucurv',
  },
]

export function tiktokVideoUrl(id: string): string {
  return `${TIKTOK_PROFILE_URL}/video/${id}`
}

export interface TikTokVideoWithMeta extends TikTokVideo {
  url: string
  thumbnail: string | null
}

// Ambil thumbnail via oEmbed di server (di-cache mengikuti ISR halaman).
// URL thumbnail TikTok punya masa kedaluwarsa, jadi harus di-refresh berkala —
// karena itu jangan di-hardcode.
export async function getTikTokVideosWithMeta(): Promise<TikTokVideoWithMeta[]> {
  return Promise.all(
    TIKTOK_VIDEOS.map(async (v) => {
      const url = tiktokVideoUrl(v.id)
      let thumbnail: string | null = null
      try {
        const res = await fetch(
          `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
          { next: { revalidate: 300 } }
        )
        if (res.ok) {
          const data = (await res.json()) as { thumbnail_url?: string }
          thumbnail = data.thumbnail_url ?? null
        }
      } catch {
        // Biarkan null — komponen menampilkan kartu fallback tanpa thumbnail
      }
      return { ...v, url, thumbnail }
    })
  )
}
