import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SITE_URL } from '@/lib/constants'
import './globals.css'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
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
        <Analytics />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
