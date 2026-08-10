'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { GalleryProject } from '@/types'

interface Props {
  item?: GalleryProject
}

export function GalleryForm({ item }: Props) {
  const router = useRouter()
  const isEdit = !!item

  const [judul,      setJudul]      = useState(item?.judul ?? '')
  const [lokasi,     setLokasi]     = useState(item?.lokasi ?? '')
  const [keterangan, setKeterangan] = useState(item?.keterangan ?? '')
  const [urutan,     setUrutan]     = useState(item?.urutan ?? 0)
  const [isActive,   setIsActive]   = useState(item?.is_active ?? true)

  const [existingUrl, setExistingUrl] = useState(item?.image_url ?? '')
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
      .from('gallery-images')
      .upload(filename, newFile, { contentType: newFile.type })
    if (error) throw new Error(`Upload gagal: ${error.message}`)
    const { data } = supabase.storage.from('gallery-images').getPublicUrl(filename)
    return data.publicUrl
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isEdit && !newFile) {
      setError('Pilih foto proyek.')
      return
    }
    if (!judul.trim()) {
      setError('Isi judul proyek.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const supabase = createClient()
      const imageUrl = await uploadImage(supabase)
      const payload = {
        image_url:  imageUrl,
        judul:      judul.trim(),
        lokasi:     lokasi.trim() || null,
        keterangan: keterangan.trim() || null,
        urutan,
        is_active:  isActive,
      }
      if (isEdit) {
        const { error } = await supabase
          .from('gallery_projects').update(payload).eq('id', item.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('gallery_projects').insert(payload)
        if (error) throw error
      }
      router.push('/admin/galeri')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.')
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!isEdit) return
    if (!confirm('Hapus foto proyek ini? Aksi tidak bisa dibatalkan.')) return
    const supabase = createClient()
    await supabase.from('gallery_projects').delete().eq('id', item.id)
    router.push('/admin/galeri')
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
          Foto Proyek {!isEdit && <span className="text-red-500">*</span>}
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
          Foto pemasangan / hasil jadi di lokasi pelanggan. Format: JPG / JPEG,
          PNG, WebP. Usahakan terang dan tidak buram.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Judul Proyek <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder="contoh: Jendela Bulat D.80 di Rumah Klasik"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        />
        <p className="text-gray-400 text-xs mt-1">
          Sebut bentuk & ukuran jendelanya — juga dipakai sebagai teks alt foto.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Lokasi (opsional)</label>
        <input
          type="text"
          value={lokasi}
          onChange={(e) => setLokasi(e.target.value)}
          placeholder="contoh: Bekasi Timur"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        />
        <p className="text-gray-400 text-xs mt-1">
          Cukup kota / kecamatan — jangan alamat lengkap pelanggan.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Keterangan (opsional)</label>
        <textarea
          rows={3}
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          placeholder="contoh: Pemasangan 3 jendela bulat ornamen daun untuk fasad depan."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        />
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
        <span className="text-sm font-medium">Tampilkan di halaman galeri</span>
      </label>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-tosca text-white font-medium px-7 py-2.5 rounded-full hover:bg-tosca-dark transition disabled:opacity-60"
        >
          {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Foto'}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="border border-red-200 text-red-500 font-medium px-5 py-2.5 rounded-full hover:bg-red-50 transition text-sm ml-auto"
          >
            Hapus
          </button>
        )}
      </div>
    </form>
  )
}
