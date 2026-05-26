import type { ProductShape } from '@/types'

// NOMOR_WA: ganti jika nomor berubah
export const WA_NUMBER = '6285179893645'
export const WA_URL = `https://wa.me/${WA_NUMBER}`

export const AREAS = [
  'Jakarta Pusat',
  'Jakarta Utara',
  'Jakarta Barat',
  'Jakarta Selatan',
  'Jakarta Timur',
  'Bogor',
  'Depok',
  'Tangerang',
  'Tangerang Selatan',
  'Bekasi',
  'Di luar Jabodetabek',
]

export const SHAPES: { value: ProductShape; label: string }[] = [
  { value: 'bulat', label: 'Jendela Bulat' },
  { value: 'lengkung', label: 'Jendela Lengkung (Arch)' },
  { value: 'setengah_lingkaran', label: 'Jendela Setengah Lingkaran' },
  { value: 'oval', label: 'Jendela Oval' },
  { value: 'custom', label: 'Lainnya / Custom' },
]

export const SHAPE_LABELS: Record<ProductShape, string> = {
  bulat: 'Jendela Bulat',
  lengkung: 'Jendela Lengkung',
  setengah_lingkaran: 'Setengah Lingkaran',
  oval: 'Jendela Oval',
  custom: 'Custom',
}

export const DELIVERY_AREAS = [
  { name: 'Jakarta', estimate: '1–2 hari' },
  { name: 'Bogor', estimate: '1–3 hari' },
  { name: 'Depok', estimate: '1–2 hari' },
  { name: 'Tangerang', estimate: '1–3 hari' },
  { name: 'Bekasi', estimate: '1–3 hari' },
]

export const WORKSHOP_ADDRESS =
  'Jl. Mayor Oking No.71 RT 006/001 Margahayu, Bekasi Timur, Kota Bekasi, Jawa Barat 17113'
export const OPERATING_HOURS = {
  weekdays: 'Senin – Sabtu: 08.00 – 16.00 WIB',
  weekend: 'Minggu: Tutup',
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alucurv.vercel.app'
