import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alucurv.vercel.app'
  ),
  title: {
    default:
      'Alucurv — Jendela Aluminium Bulat & Lengkung Custom | Kirim Cepat Jabodetabek',
    template: '%s | Alucurv',
  },
  description:
    'Alucurv memproduksi jendela aluminium custom berbentuk bulat dan lengkung. Khusus Jabodetabek, pengiriman cepat dengan armada sendiri. Konsultasi via WhatsApp.',
  openGraph: {
    title:
      'Alucurv — Jendela Aluminium Bulat & Lengkung | Kirim Cepat Jabodetabek',
    description:
      'Jendela aluminium custom berbentuk bulat dan lengkung. Khusus Jabodetabek, pengiriman cepat dengan armada sendiri.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Alucurv',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  icons: {
    // TODO: ganti dengan file favicon.png/ico versi ikon saja (tanpa teks logo)
    // agar tajam di ukuran kecil dan tidak ada kotak putih.
    // Simpan file di /public/favicon.png lalu update path di sini.
    icon: '/logo.jpeg',
    shortcut: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="font-sans text-ink bg-white antialiased">
        {children}
      </body>
    </html>
  )
}
