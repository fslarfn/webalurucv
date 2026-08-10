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
