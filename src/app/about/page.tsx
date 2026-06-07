import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AboutContent } from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'About Us — Eilat Action',
  description:
    'Didier Uzan, desert specialist and expert Jeep guide in Eilat. Discover the Eilat Mountains, Negev desert, geology, fauna, flora and thousands of years of history.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutContent />
      <Footer />
    </>
  )
}
