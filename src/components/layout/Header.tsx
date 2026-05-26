'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/katalog', label: 'Semua Produk' },
  { href: '/katalog?bentuk=bulat', label: 'Jendela Bulat' },
  { href: '/katalog?bentuk=lengkung', label: 'Jendela Lengkung' },
  { href: '/katalog?bentuk=setengah_lingkaran', label: 'Setengah Lingkaran' },
  { href: '/pengiriman', label: 'Area Pengiriman' },
  { href: '/cara-pemesanan', label: 'Cara Pesan' },
  { href: '/tentang-kami', label: 'Tentang Kami' },
  { href: '/kontak', label: 'Kontak' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-5 h-20 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.jpeg"
            alt="Alucurv"
            width={160}
            height={48}
            style={{ width: 'auto', height: '48px' }}
            className="object-contain"
            priority
          />
        </Link>

        <Link
          href="/penawaran"
          className="bg-tosca text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-tosca-dark transition shrink-0"
        >
          Minta Penawaran
        </Link>
      </nav>

      <div className="border-t border-gray-100">
        <ul className="max-w-6xl mx-auto px-5 flex items-center gap-7 h-12 text-sm font-medium overflow-x-auto no-scrollbar">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`whitespace-nowrap transition hover:text-tosca ${
                  pathname === link.href.split('?')[0]
                    ? 'text-tosca'
                    : 'text-ink'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
