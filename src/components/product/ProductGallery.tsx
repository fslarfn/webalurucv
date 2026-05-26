'use client'
import { useState } from 'react'
import Image from 'next/image'

export function ProductGallery({
  images,
  productName,
}: {
  images: string[]
  productName: string
}) {
  const [active, setActive] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
        [ Belum ada foto ]
      </div>
    )
  }

  return (
    <div>
      <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-100">
        <Image
          src={images[active]}
          alt={`${productName} - foto ${active + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 mt-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Foto ${i + 1}`}
              className={`w-16 h-16 relative rounded-lg overflow-hidden border-2 transition ${
                i === active ? 'border-tosca' : 'border-transparent'
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
