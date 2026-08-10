import Link from 'next/link'
import { SHAPES } from '@/lib/constants'
import { SHAPE_SLUGS } from '@/lib/landing'
import type { ProductShape } from '@/types'

// Filter berbentuk link (bukan tombol query-param) agar halaman landing
// per bentuk ikut ter-crawl Google dari halaman katalog.
export function ProductFilter({ current }: { current?: ProductShape | null }) {
  const itemClass = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm border transition ${
      active
        ? 'bg-tosca text-white border-tosca'
        : 'border-gray-200 hover:border-tosca'
    }`

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link href="/katalog" className={itemClass(!current)}>
        Semua
      </Link>
      {SHAPES.map((s) => {
        const slug = SHAPE_SLUGS[s.value]
        const href = slug ? `/katalog/${slug}` : `/katalog?bentuk=${s.value}`
        return (
          <Link
            key={s.value}
            href={href}
            className={itemClass(current === s.value)}
          >
            {s.label}
          </Link>
        )
      })}
    </div>
  )
}
