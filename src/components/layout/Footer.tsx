import Link from 'next/link'
import Image from 'next/image'
import { WA_URL, WORKSHOP_ADDRESS, OPERATING_HOURS } from '@/lib/constants'
import { AREA_PAGES, SHAPE_PAGES } from '@/lib/landing'

export function Footer() {
  return (
    <footer className="bg-ink text-gray-300 py-14">
      <div className="max-w-6xl mx-auto px-5 grid sm:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="mb-3">
            <Image
              src="/logo.jpeg"
              alt="Alucurv"
              width={140}
              height={42}
              style={{ width: 'auto', height: '40px' }}
              className="object-contain brightness-0 invert"
            />
          </div>
          <p>
            Jendela aluminium bulat &amp; lengkung custom. Melayani area
            Jabodetabek.
          </p>
        </div>

        <div>
          <p className="text-white font-semibold mb-3">Kontak</p>
          <p>
            <a href={WA_URL} className="hover:text-tosca transition">
              WhatsApp: 0851 7989 3645
            </a>
          </p>
          {/* Ganti dengan email Anda jika ada */}
          <p className="mt-1">Email: alucurv@gmail.com</p>
          <p className="mt-1">{WORKSHOP_ADDRESS}</p>
        </div>

        <div>
          <p className="text-white font-semibold mb-3">Jam Operasional</p>
          <p>{OPERATING_HOURS.weekdays}</p>
          <p className="mt-1">{OPERATING_HOURS.weekend}</p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/cara-pemesanan"
              className="text-xs hover:text-tosca transition"
            >
              Cara Pemesanan
            </Link>
            <span>·</span>
            <Link
              href="/pengiriman"
              className="text-xs hover:text-tosca transition"
            >
              Area Pengiriman
            </Link>
            <span>·</span>
            <Link
              href="/kontak"
              className="text-xs hover:text-tosca transition"
            >
              Kontak
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 mt-10 pt-8 border-t border-white/10 text-xs text-gray-400">
        <p className="flex flex-wrap gap-x-3 gap-y-1">
          {SHAPE_PAGES.map((p) => (
            <Link
              key={p.slug}
              href={`/katalog/${p.slug}`}
              className="hover:text-tosca transition"
            >
              {p.label}
            </Link>
          ))}
          {AREA_PAGES.map((a) => (
            <Link
              key={a.slug}
              href={`/area/${a.slug}`}
              className="hover:text-tosca transition"
            >
              Jendela Aluminium {a.city}
            </Link>
          ))}
        </p>
      </div>

      <p className="text-center text-gray-500 text-xs mt-8">
        &copy; {new Date().getFullYear()} Alucurv. Semua hak dilindungi.
      </p>
    </footer>
  )
}
