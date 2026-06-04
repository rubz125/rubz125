import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#0A0603',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://desertkingjeeep.com'),
  title: {
    default: 'Desert Kings – Premium Jeep Safari Tours | Israel',
    template: '%s | Desert Kings Jeep Safari',
  },
  description:
    "Experience Israel's most breathtaking landscapes on a private Jeep Safari. Negev Desert, Galilee, Golan Heights, Dead Sea. Book online — guides speak 6 languages.",
  keywords: [
    'Jeep Safari Israel',
    'Negev desert tour',
    'Golan Heights jeep',
    'Galilee adventure',
    'Israel off-road tour',
    'Dead Sea excursion',
    'luxury safari Israel',
    'private jeep tour Israel',
    'ג׳יפ סיור מדבר הנגב',
    'ספארי גולן',
  ],
  authors: [{ name: 'Desert Kings', url: 'https://desertkingjeeep.com' }],
  creator: 'Desert Kings',
  publisher: 'Desert Kings',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://desertkingjeeep.com',
    siteName: 'Desert Kings Jeep Safari',
    title: 'Desert Kings – Premium Jeep Safari Tours | Israel',
    description:
      "Private Jeep Safaris across Israel's most epic landscapes. Negev, Galilee, Golan, Dead Sea. 15 years of unforgettable adventures.",
    images: [
      {
        url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Jeep Safari in the Negev Desert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desert Kings – Premium Jeep Safari Tours | Israel',
    description:
      "Private Jeep Safaris across Israel's most epic landscapes.",
    images: ['https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80'],
    creator: '@desertkings',
  },
  alternates: {
    canonical: 'https://desertkingjeeep.com',
    languages: {
      'en-US': '/en',
      'he-IL': '/he',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TouristInformationCenter',
              name: 'Desert Kings Jeep Safari',
              description: 'Premium Jeep Safari tours across Israel',
              url: 'https://desertkingjeeep.com',
              telephone: '+972-50-000-0000',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Ben Gurion Blvd 1',
                addressLocality: 'Tel Aviv',
                addressCountry: 'IL',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 31.0461,
                longitude: 34.8516,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '20:00',
                },
              ],
              priceRange: '₪₪₪',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '847',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-[#0A0603] text-[#F5EDD8] antialiased`}>
        {children}
      </body>
    </html>
  )
}
