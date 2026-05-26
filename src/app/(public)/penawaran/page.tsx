import type { Metadata } from 'next'
import { Suspense } from 'react'
import { QuoteForm } from './QuoteForm'

export const metadata: Metadata = {
  title: 'Minta Penawaran',
  description:
    'Isi form untuk minta penawaran harga jendela aluminium Alucurv. Pesan dikirim langsung ke WhatsApp kami.',
}

export default function PenawaranPage() {
  return (
    <div className="bg-tosca-light min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-5">
        <h1 className="text-3xl font-bold mb-2 text-center">Minta Penawaran</h1>
        <p className="text-gray-600 text-center mb-8">
          Isi form ini — pesan akan langsung dikirim ke WhatsApp kami.
        </p>
        <Suspense>
          <QuoteForm />
        </Suspense>
      </div>
    </div>
  )
}
