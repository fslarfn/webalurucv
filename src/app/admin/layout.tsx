import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Kalau belum login, render children tanpa shell admin.
  // Middleware sudah menangani redirect ke /admin/login untuk route lain.
  // Ini mencegah infinite redirect saat mengakses /admin/login.
  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-tosca flex items-center justify-center text-white font-bold">
            A
          </span>
          <span className="font-bold text-ink">Alucurv Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user.email}</span>
          <LogoutButton />
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-6 text-sm font-medium">
          <a
            href="/admin"
            className="py-3 border-b-2 border-transparent hover:border-tosca hover:text-tosca transition"
          >
            Dashboard
          </a>
          <a
            href="/admin/produk"
            className="py-3 border-b-2 border-transparent hover:border-tosca hover:text-tosca transition"
          >
            Produk
          </a>
          <a
            href="/admin/banner"
            className="py-3 border-b-2 border-transparent hover:border-tosca hover:text-tosca transition"
          >
            Banner Hero
          </a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}

function LogoutButton() {
  return (
    <form action="/admin/logout" method="POST">
      <button
        type="submit"
        className="text-sm text-gray-500 hover:text-red-500 transition"
      >
        Keluar
      </button>
    </form>
  )
}
