'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { SHAPES } from '@/lib/constants'
import type { ProductShape } from '@/types'

export function ProductFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get('bentuk') as ProductShape | null

  function setFilter(value: ProductShape | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('bentuk', value)
    } else {
      params.delete('bentuk')
    }
    router.push(`/katalog?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => setFilter(null)}
        className={`px-4 py-2 rounded-full text-sm border transition ${
          !current
            ? 'bg-tosca text-white border-tosca'
            : 'border-gray-200 hover:border-tosca'
        }`}
      >
        Semua
      </button>
      {SHAPES.map((s) => (
        <button
          key={s.value}
          onClick={() => setFilter(s.value)}
          className={`px-4 py-2 rounded-full text-sm border transition ${
            current === s.value
              ? 'bg-tosca text-white border-tosca'
              : 'border-gray-200 hover:border-tosca'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}
