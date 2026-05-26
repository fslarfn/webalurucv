import type { Metadata } from 'next'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = {
  title: 'Login Admin — Alucurv',
  robots: { index: false },
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-tosca flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
            A
          </div>
          <h1 className="text-2xl font-bold">Alucurv Admin</h1>
          <p className="text-gray-500 text-sm mt-1">
            Login untuk kelola produk
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
