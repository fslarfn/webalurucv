import type { Product } from '@/types'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="col-span-full text-center py-20 text-gray-400">
        <p className="text-lg mb-2">Belum ada produk dalam kategori ini.</p>
        <p className="text-sm">Coba pilih kategori lain atau hubungi kami untuk custom.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
