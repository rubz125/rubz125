import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ToursPageContent } from '@/components/tours/ToursPageContent'

export const metadata: Metadata = {
  title: 'Jeep Safari Tours — Eilat Mountains',
  description:
    "Discover the Eilat Mountains on a private Jeep Safari. Panoramic views of 3 countries, ibexes, gazelles, sunset campfire.",
}

export default function ToursPage() {
  return (
    <>
      <Navbar />
      <ToursPageContent />
      <Footer />
    </>
  )
}
