'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { HeroSlide } from '@/types'

const LINK_OPTIONS = [
  { label: 'Katalog (/katalog)',           value: '/katalog'   },
  { label: 'Minta Penawaran (/penawaran)', value: '/penawaran' },
]

interface Props {
  slide?: HeroSlide
}

export function SlideForm({ slide }: Props) {
  const router  = useRouter()
  const isEdit  = !!slide

  const [judul,      setJudul]      = useState(slide?.judul ?? '')
  const [linkTujuan, setLinkTujuan] = useState(slide?.link_tujuan ?? '/katalog')
  const [urutan,     setUrutan]     = useState(slide?.urutan ?? 0)
  const [isActive,   setIsActive]   = useState(slide?.is_active ?? true)

  const [existingUrl, setExistingUrl] = useState(slide?.image_url ?? '')
  const [newFile,     setNewFile]     = useState<File | null>(null)
  const [preview,     setPreview]     = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setNewFile(file)
    setPreview(URL.createObjectURL(file))
  }

  async function uploadImage(supabase: ReturnType<typeof createClient>): Promise<string> {
    if (!newFile) return existingUrl
    const ext      = newFile.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage
      .from('hero-images')
      .upload(filename, newFile, { contentType: newFile.type })
    if (error) throw new Error(`Upload gagal: ${error.message}`)
    const { data } = supabase.storage.from('hero-images').getPublicUrl(filename)
    return data.publicUrl
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isEdit && !newFile) {
      setError('Pilih foto untuk slide.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const supabase = createClient()
      const imageUrl = await uploadImage(supabase)
      const payload = {
        image_url:   imageUrl,
        judul:       judul.trim() || null,
        link_tujuan: linkTujuan,
        urutan,
        is_active:   isActive,
      }
      if (isEdit) {
        const { error } = await supabase
          .from('hero_slides').update(payload).eq('id', slide.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('hero_slides').insert(payload)
        if (error) throw error
      }
      router.push('/admin/banner')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.')
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!isEdit) return
    if (!confirm('Hapus slide ini? Aksi tidak bisa dibatalkan.')) return
    const supabase = createClient()
    await supabase.from('hero_slides').delete().eq('id', slide.id)
    router.push('/admin/banner')
    router.refresh()
  }

  const displaySrc = preview ?? existingUrl ?? null

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {displaySrc && (
        <div className="relative w-full max-w-sm aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={displaySrc} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">
          Foto Slide {!isEdit && <span className="text-red-500">*</span>}
        </label>
        <label className="flex items-center gap-2 cursor-pointer border border-dashed border-gray-300 rounded-lg px-4 py-3 hover:border-tosca transition text-sm text-gray-500">
          <span>{isEdit ? 'Ganti foto (opsional)' : '+ Upload foto'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
        <p className="text-gray-400 text-xs mt-1">
          Ukuran yang disarankan: <strong>1600 × 900 piksel (rasio 16:9)</strong>.
          Letakkan objek penting di bagian tengah foto.
          Format: JPG, PNG, WebP.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Judul (opsional)</label>
        <input
          type="text"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder="contoh: Jendela Bulat Premium"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        />
        <p className="text-gray-400 text-xs mt-1">
          Dipakai sebagai teks alt foto dan label navigasi.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Link Tujuan <span className="text-red-500">*</span>
        </label>
        <select
          value={linkTujuan}
          onChange={(e) => setLinkTujuan(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        >
          {LINK_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Urutan Tampil</label>
        <input
          type="number"
          value={urutan}
          onChange={(e) => setUrutan(Number(e.target.value))}
          className="w-24 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        />
        <p className="text-gray-400 text-xs mt-1">Angka lebih kecil tampil lebih dulu</p>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="rounded border-gray-300 text-tosca"
        />
        <span className="text-sm font-medium">Tampilkan slide ini di beranda</span>
      </label>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-tosca text-white font-medium px-7 py-2.5 rounded-full hover:bg-tosca-dark transition disabled:opacity-60"
        >
          {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Slide'}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="border border-red-200 text-red-500 font-medium px-5 py-2.5 rounded-full hover:bg-red-50 transition text-sm ml-auto"
          >
            Hapus Slide
          </button>
        )}
      </div>
    </form>
  )
}
