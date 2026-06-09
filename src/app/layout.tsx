import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Heebo } from 'next/font/google'
import './globals.css'
import { LangProvider } from '@/lib/LangContext'
import { ThemeProvider } from '@/lib/ThemeContext'

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

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#0A0603',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://eilat-action.com'),
  title: {
    default: 'Eilat Action – Premium Jeep Safari Tours | Israel',
    template: '%s | Eilat Action',
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
  authors: [{ name: 'Eilat Action', url: 'https://eilat-action.com' }],
  creator: 'Eilat Action',
  publisher: 'Eilat Action',
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
    url: 'https://eilat-action.com',
    siteName: 'Eilat Action',
    title: 'Eilat Action – Premium Jeep Safari Tours | Israel',
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
    title: 'Eilat Action – Premium Jeep Safari Tours | Israel',
    description:
      "Private Jeep Safaris across Israel's most epic landscapes.",
    images: ['https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80'],
    creator: '@desertkings',
  },
  alternates: {
    canonical: 'https://eilat-action.com',
    languages: {
      'en-US': '/en',
      'he-IL': '/he',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${playfair.variable} ${heebo.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TouristInformationCenter',
              name: 'Eilat Action',
              description: 'Premium Jeep Safari tours across Israel',
              url: 'https://eilat-action.com',
              telephone: '+972-52-521-7029',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Eilat, Israel',
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
      <body className={`${inter.className} antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: `
  (function(){
    try {
      var t = localStorage.getItem('theme') || 'dark';
      var resolved = t;
      if (t === 'system') {
        resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', resolved);
    } catch(e) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })()
` }} />
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
