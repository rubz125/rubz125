import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { TourCard } from '@/components/tours/TourCard'
import { tours } from '@/data/tours'

export const metadata: Metadata = {
  title: 'Jeep Safari Tour — Eilat Mountains',
  description:
    "Discover the Eilat Mountains on a private Jeep Safari. Panoramic views of 3 countries, ibexes, gazelles, sunset campfire with lafotes and homemade hummus.",
}

export default function ToursPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-20 bg-[#1C1108] border-b border-[#D4A843]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="section-divider" />
              <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">Eilat Mountains</span>
              <div className="section-divider" style={{ transform: 'scaleX(-1)' }} />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-[#F5EDD8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Our
              <span style={{
                background: 'linear-gradient(135deg, #F2C464 0%, #D4A843 50%, #A87828 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {' '}Safari
              </span>
            </h1>
            <p className="text-[#7A6245] text-lg max-w-2xl mx-auto">
              An unforgettable Jeep adventure through the mountains of Eilat — panoramic views of Israel, Jordan and Egypt, desert wildlife, and a sunset campfire.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#0A0603]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1C1108] border-t border-[#D4A843]/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#F5EDD8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Need Something Custom?
            </h2>
            <p className="text-[#7A6245] mb-8">
              Large groups, corporate events, special occasions — we build bespoke safaris for any request.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/972525217029" className="btn-primary">Chat With Us</a>
              <Link href="/contact" className="btn-secondary">Send a Request</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
