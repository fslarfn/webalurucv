import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-tosca-light flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-tosca flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6">
          A
        </div>
        <p className="text-tosca font-semibold text-sm uppercase tracking-widest mb-3">
          Halaman tidak ditemukan
        </p>
        <h1 className="text-6xl font-bold text-ink mb-4">404</h1>
        <p className="text-gray-600 mb-8">
          Halaman yang Anda cari tidak ada atau sudah dipindahkan.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="bg-tosca text-white font-medium px-6 py-3 rounded-full hover:bg-tosca-dark transition"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/katalog"
            className="bg-white border border-gray-300 font-medium px-6 py-3 rounded-full hover:border-tosca transition"
          >
            Lihat Katalog
          </Link>
        </div>
      </div>
    </div>
  )
}
