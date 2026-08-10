import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { BenefitStrip } from '@/components/home/BenefitStrip'
import { CategoryRow } from '@/components/home/CategoryRow'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { PromoBanner } from '@/components/home/PromoBanner'
import { DeliverySection } from '@/components/home/DeliverySection'
import { VideoShowcase } from '@/components/home/VideoShowcase'
import { Testimonials } from '@/components/home/Testimonials'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

// ISR: cache 5 menit agar TTFB cepat tanpa query Supabase per request
export const revalidate = 300

export default function BerandaPage() {
  return (
    <>
      <HeroSection />
      <BenefitStrip />
      <CategoryRow />
      <FeaturedProducts />
      <PromoBanner />
      <DeliverySection />
      <VideoShowcase />
      <Testimonials />
    </>
  )
}
