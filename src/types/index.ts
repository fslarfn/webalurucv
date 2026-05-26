export type ProductShape = 'bulat' | 'lengkung' | 'setengah_lingkaran' | 'oval' | 'custom'

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  shape: ProductShape
  specifications: Record<string, string> | null
  price_label: string | null
  price_min: number | null
  images: string[]
  is_active: boolean
  is_featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface QuoteFormData {
  nama: string
  hp: string
  area: string
  bentuk: string
  lebar?: string
  tinggi?: string
  jumlah: string
  catatan?: string
  produk?: string
}
