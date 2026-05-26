import { HeroSection } from '@/components/home/HeroSection'
import { BenefitStrip } from '@/components/home/BenefitStrip'
import { CategoryRow } from '@/components/home/CategoryRow'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { PromoBanner } from '@/components/home/PromoBanner'
import { DeliverySection } from '@/components/home/DeliverySection'
import { Testimonials } from '@/components/home/Testimonials'

export default function BerandaPage() {
  return (
    <>
      <HeroSection />
      <BenefitStrip />
      <CategoryRow />
      <FeaturedProducts />
      <PromoBanner />
      <DeliverySection />
      <Testimonials />
    </>
  )
}
