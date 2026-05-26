import Link from 'next/link'
import Image from 'next/image'
import { WA_URL, WORKSHOP_ADDRESS, OPERATING_HOURS } from '@/lib/constants'

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

      <p className="text-center text-gray-500 text-xs mt-10">
        &copy; {new Date().getFullYear()} Alucurv. Semua hak dilindungi.
      </p>
    </footer>
  )
}
