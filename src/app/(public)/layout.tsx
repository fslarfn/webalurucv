import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFAB } from '@/components/layout/WhatsAppFAB'
import { SITE_URL, WA_NUMBER, WORKSHOP_ADDRESS } from '@/lib/constants'

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: 'Alucurv',
  description:
    'Produsen jendela aluminium custom berbentuk bulat dan lengkung. Melayani Jabodetabek dengan armada pengiriman sendiri.',
  url: SITE_URL,
  telephone: `+${WA_NUMBER}`,
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/logo.jpeg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: WORKSHOP_ADDRESS,
    addressLocality: 'Bekasi',
    addressRegion: 'Jawa Barat',
    postalCode: '17113',
    addressCountry: 'ID',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    opens: '08:00',
    closes: '16:00',
  },
  areaServed: [
    'Jakarta',
    'Bogor',
    'Depok',
    'Tangerang',
    'Bekasi',
  ].map((name) => ({ '@type': 'City', name })),
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}
