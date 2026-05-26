'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Props {
  id: string
  isActive: boolean
}

export function ProductActions({ id, isActive }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function toggleActive() {
    setLoading(true)
    const supabase = createClient()
    await supabase
      .from('products')
      .update({ is_active: !isActive, updated_at: new Date().toISOString() })
      .eq('id', id)
    router.refresh()
    setLoading(false)
  }

  async function handleDelete() {
    if (!confirm('Hapus produk ini secara permanen? Aksi ini tidak bisa dibatalkan.')) return
    setLoading(true)
    const supabase = createClient()
    await supabase.from('products').delete().eq('id', id)
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={`/admin/produk/${id}`}
        className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg border border-tosca text-tosca hover:bg-tosca hover:text-white transition"
      >
        Edit
      </a>

      <button
        onClick={toggleActive}
        disabled={loading}
        className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 hover:border-gray-400 transition disabled:opacity-50"
      >
        {isActive ? 'Sembunyikan' : 'Aktifkan'}
      </button>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition disabled:opacity-50"
      >
        Hapus
      </button>
    </div>
  )
}
