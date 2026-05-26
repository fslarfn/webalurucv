'use client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { AREAS, SHAPES } from '@/lib/constants'
import { buildQuoteUrl } from '@/lib/whatsapp'
import type { QuoteFormData } from '@/types'

export function QuoteForm() {
  const searchParams = useSearchParams()
  const produkParam = searchParams.get('produk') ?? ''

  const [form, setForm] = useState<QuoteFormData>({
    nama: '',
    hp: '',
    area: AREAS[0],
    bentuk: SHAPES[0].label,
    lebar: '',
    tinggi: '',
    jumlah: '1',
    catatan: '',
    produk: produkParam,
  })

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const url = buildQuoteUrl(form)
    window.open(url, '_blank')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-2xl border border-gray-100"
    >
      {produkParam && (
        <div className="bg-tosca-light rounded-lg px-4 py-3 text-sm">
          Produk dipilih: <strong>{produkParam}</strong>
        </div>
      )}

      <div>
        <label htmlFor="nama" className="block text-sm font-medium mb-1">
          Nama <span className="text-red-500">*</span>
        </label>
        <input
          id="nama"
          name="nama"
          type="text"
          required
          value={form.nama}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        />
      </div>

      <div>
        <label htmlFor="hp" className="block text-sm font-medium mb-1">
          No. WhatsApp <span className="text-red-500">*</span>
        </label>
        <input
          id="hp"
          name="hp"
          type="tel"
          required
          value={form.hp}
          onChange={handleChange}
          placeholder="08xx-xxxx-xxxx"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        />
      </div>

      <div>
        <label htmlFor="area" className="block text-sm font-medium mb-1">
          Area Pengiriman
        </label>
        <select
          id="area"
          name="area"
          value={form.area}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        >
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="bentuk" className="block text-sm font-medium mb-1">
          Bentuk Jendela
        </label>
        <select
          id="bentuk"
          name="bentuk"
          value={form.bentuk}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        >
          {SHAPES.map((s) => (
            <option key={s.value} value={s.label}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="lebar" className="block text-sm font-medium mb-1">
            Lebar / Diameter (cm)
          </label>
          <input
            id="lebar"
            name="lebar"
            type="number"
            min="1"
            value={form.lebar}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
          />
        </div>
        <div>
          <label htmlFor="tinggi" className="block text-sm font-medium mb-1">
            Tinggi (cm)
          </label>
          <input
            id="tinggi"
            name="tinggi"
            type="number"
            min="1"
            value={form.tinggi}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
          />
        </div>
      </div>

      <div>
        <label htmlFor="jumlah" className="block text-sm font-medium mb-1">
          Jumlah
        </label>
        <input
          id="jumlah"
          name="jumlah"
          type="number"
          min="1"
          value={form.jumlah}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        />
      </div>

      <div>
        <label htmlFor="catatan" className="block text-sm font-medium mb-1">
          Catatan Tambahan
        </label>
        <textarea
          id="catatan"
          name="catatan"
          rows={3}
          value={form.catatan}
          onChange={handleChange}
          placeholder="Warna, jenis kaca, atau detail lain..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-tosca"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-tosca text-white font-medium py-3 rounded-full hover:bg-tosca-dark transition"
      >
        Kirim ke WhatsApp
      </button>

      <p className="text-gray-400 text-xs text-center">
        Pembayaran: DP via transfer di awal, pelunasan sebelum pengiriman.
      </p>
    </form>
  )
}
