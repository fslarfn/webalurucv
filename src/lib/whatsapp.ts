import { WA_NUMBER } from './constants'
import type { QuoteFormData } from '@/types'

export function buildQuoteUrl(data: QuoteFormData): string {
  const ukuran =
    data.lebar && data.tinggi ? `${data.lebar} x ${data.tinggi} cm` : '-'

  const lines = [
    'Halo Alucurv, saya ingin minta penawaran:',
    '',
    ...(data.produk ? [`Produk: ${data.produk}`] : []),
    `Nama: ${data.nama}`,
    `No. HP: ${data.hp}`,
    `Area: ${data.area}`,
    `Bentuk: ${data.bentuk}`,
    `Ukuran: ${ukuran}`,
    `Jumlah: ${data.jumlah}`,
    `Catatan: ${data.catatan || '-'}`,
  ].join('\n')

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`
}

export function buildSimpleUrl(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}
