'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { SHAPES } from '@/lib/constants'
import type { Product, ProductShape } from '@/types'

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

interface Props {
  product?: Product
}

export function ProductForm({ product }: Props) {
  const router = useRouter()
  const isEdit = !!product

  const [name, setName] = useState(product?.name ?? '')
  const [slug, setSlug] = useState(product?.slug ?? '')
  const [description, setDescription] = useState(product?.description ?? '')
  const [shape, setShape] = useState<ProductShape>(product?.shape ?? 'bulat')
  const [priceLabel, setPriceLabel] = useState(product?.price_label ?? '')
  const [specsRaw, setSpecsRaw] = useState(
    product?.specifications
      ? Object.entries(product.specifications)
          .map(([k, v]) => `${k}: ${v}`)
          .join('\n')
      : ''
  )
  const [isActive, setIsActive] = useState(product?.is_active ?? true)
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false)
  const [sortOrder, setSortOrder] = useState(product?.sort_order ?? 0)

  const [existingImages, setExistingImages] = useState<string[]>(
    product?.images ?? []
  )
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleNameChange(val: string) {
    setName(val)
    if (!isEdit) setSlug(toSlug(val))
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    setNewFiles((prev) => [...prev, ...files])
    files.forEach((f) => {
      const url = URL.createObjectURL(f)
      setPreviews((prev) => [...prev, url])
    })
  }

  function removeExisting(url: string) {
    setExistingImages((prev) => prev.filter((u) => u !== url))
  }

  function removeNew(idx: number) {
    setNewFiles((prev) => prev.filter((_, i) => i !== idx))
    setPreviews((prev) => prev.filter((_, i) => i !== idx))
  }

  function parseSpecs(raw: string): Record<string, string> {
    const result: Record<string, string> = {}
    raw.split('\n').forEach((line) => {
      const colon = line.indexOf(':')
      if (colon > -1) {
        const key = line.slice(0, colon).trim()
        const val = line.slice(colon + 1).trim()
        if (key) result[key] = val
      }
    })
    return result
  }

  async function uploadImages(supabase: ReturnType<typeof createClient>) {
    const urls: string[] = []
    for (const file of newFiles) {
      const ext = file.name.split('.').pop()
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage
        .from('product-images')
        .upload(filename, file, { contentType: file.type })
      if (error) throw new Error(`Upload gagal: ${error.message}`)
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filename)
      urls.push(data.publicUrl)
    }
    return urls
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()
      const uploadedUrls = await uploadImages(supabase)
      const allImages = [...existingImages, ...uploadedUrls]

      const payload = {
        name,
        slug,
        description: description || null,
        shape,
        price_label: priceLabel || null,
        specifications:
          specsRaw.trim() ? parseSpecs(specsRaw) : null,
        images: allImages,
        is_active: isActive,
        is_featured: isFeatured,
        sort_order: sortOrder,
        updated_at: new Date().toISOString(),
      }

      if (isEdit) {
        const { error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', product.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('products').insert(payload)
        if (error) throw error
      }

      router.push('/admin/produk')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.')
      setLoading(false)
    }
  }

  async function handleToggleActive() {
    if (!isEdit) return
    const supabase = createClient()
    await supabase
      .from('products')
      .update({ is_active: !isActive, updated_at: new Date().toISOString() })
      .eq('id', product.id)
    setIsActive((v) => !v)
    router.refresh()
  }

  async function handleDelete() {
    if (!isEdit) return
    if (
      !confirm(
        'Hapus permanen produk ini? Aksi ini tidak bisa dibatalkan.'
      )
    )
      return
    const supabase = createClient()
    await supabase.from('products').delete().eq('id', product.id)
    router.push('/admin/produk')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">
          Nama Produk <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Slug URL <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca font-mono text-sm"
        />
        <p className="text-gray-400 text-xs mt-1">
          URL: /produk/{slug || '...'}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bentuk</label>
        <select
          value={shape}
          onChange={(e) => setShape(e.target.value as ProductShape)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        >
          {SHAPES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Deskripsi</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Kisaran Harga (tampil di katalog)
        </label>
        <input
          type="text"
          value={priceLabel}
          onChange={(e) => setPriceLabel(e.target.value)}
          placeholder="contoh: Mulai dari Rp 2.500.000"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Spesifikasi
        </label>
        <textarea
          rows={4}
          value={specsRaw}
          onChange={(e) => setSpecsRaw(e.target.value)}
          placeholder={'Material: Aluminium 6063\nKaca: Kaca bening 5mm\nFinishing: Powder coating'}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca font-mono text-sm"
        />
        <p className="text-gray-400 text-xs mt-1">
          Format: satu baris per spek, pisahkan nama dan nilai dengan titik dua (:)
        </p>
      </div>

      {/* Foto produk */}
      <div>
        <label className="block text-sm font-medium mb-2">Foto Produk</label>

        {/* Foto yang sudah ada */}
        {existingImages.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {existingImages.map((url) => (
              <div key={url} className="relative w-20 h-20">
                <Image
                  src={url}
                  alt="Foto produk"
                  fill
                  sizes="80px"
                  className="object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeExisting(url)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Preview foto baru */}
        {previews.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {previews.map((url, i) => (
              <div key={i} className="relative w-20 h-20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeNew(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="flex items-center gap-2 cursor-pointer border border-dashed border-gray-300 rounded-lg px-4 py-3 hover:border-tosca transition text-sm text-gray-500">
          <span>+ Upload foto</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
        <p className="text-gray-400 text-xs mt-1">
          Format: JPG, PNG, WebP. Bisa pilih beberapa sekaligus.
        </p>
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="rounded border-gray-300 text-tosca"
          />
          <span className="text-sm font-medium">Aktif (tampil di katalog)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="rounded border-gray-300 text-tosca"
          />
          <span className="text-sm font-medium">Produk Unggulan (tampil di beranda)</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Urutan Tampil</label>
        <input
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(Number(e.target.value))}
          className="w-24 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        />
        <p className="text-gray-400 text-xs mt-1">
          Angka lebih kecil tampil lebih dulu
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-tosca text-white font-medium px-7 py-2.5 rounded-full hover:bg-tosca-dark transition disabled:opacity-60"
        >
          {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Produk'}
        </button>

        {isEdit && (
          <>
            <button
              type="button"
              onClick={handleToggleActive}
              className="border border-gray-300 font-medium px-5 py-2.5 rounded-full hover:border-tosca transition text-sm"
            >
              {isActive ? 'Sembunyikan' : 'Aktifkan'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="border border-red-200 text-red-500 font-medium px-5 py-2.5 rounded-full hover:bg-red-50 transition text-sm ml-auto"
            >
              Hapus Permanen
            </button>
          </>
        )}
      </div>
    </form>
  )
}
