import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types'
import { SHAPE_LABELS } from '@/lib/constants'

export function ProductCard({ product }: { product: Product }) {
  const firstImage = product.images?.[0]

  return (
    <article className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition">
      <Link href={`/produk/${product.slug}`}>
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          {firstImage ? (
            <Image
              src={firstImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              [ Foto ]
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/produk/${product.slug}`}>
          <h3 className="font-semibold text-sm leading-snug hover:text-tosca transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-xs mt-0.5 mb-2">
          {SHAPE_LABELS[product.shape]} &middot; Aluminium
        </p>
        {product.price_label && (
          <p className="text-tosca font-bold text-sm">{product.price_label}</p>
        )}
        <Link
          href={`/penawaran?produk=${encodeURIComponent(product.name)}`}
          className="mt-3 block text-center bg-tosca text-white text-xs py-2 rounded-full hover:bg-tosca-dark transition"
        >
          Minta Harga
        </Link>
      </div>
    </article>
  )
}
