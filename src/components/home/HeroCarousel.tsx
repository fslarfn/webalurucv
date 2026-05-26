'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import type { HeroSlide } from '@/types'

const FALLBACK_SRC = '/produk_unggulan.jpeg'

interface Props {
  slides: Pick<HeroSlide, 'id' | 'image_url' | 'judul' | 'link_tujuan'>[]
}

export function HeroCarousel({ slides }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })],
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({})

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo  = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  const multiSlide = slides.length > 1

  return (
    <div
      className="relative aspect-[4/3] max-h-72 md:max-h-none rounded-2xl overflow-hidden shadow-md"
      role="region"
      aria-label="Galeri produk unggulan"
      aria-roledescription="carousel"
    >
      {/* Embla viewport */}
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <Link
              key={slide.id}
              href={slide.link_tujuan}
              className="relative flex-[0_0_100%] h-full block"
              aria-roledescription="slide"
              aria-label={slide.judul ?? `Slide ${i + 1}`}
            >
              <Image
                src={imgErrors[i] ? FALLBACK_SRC : slide.image_url}
                alt={slide.judul ?? 'Produk unggulan Alucurv'}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={i === 0}
                onError={() =>
                  setImgErrors((prev) => ({ ...prev, [i]: true }))
                }
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Tombol prev / next — hanya desktop */}
      {multiSlide && (
        <>
          <button
            onClick={scrollPrev}
            aria-label="Slide sebelumnya"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm hidden md:flex items-center justify-center text-ink hover:bg-white transition shadow"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={scrollNext}
            aria-label="Slide berikutnya"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm hidden md:flex items-center justify-center text-ink hover:bg-white transition shadow"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}

      {/* Dots indikator */}
      {multiSlide && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5"
          role="tablist"
          aria-label="Pilih slide"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? 'w-5 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
