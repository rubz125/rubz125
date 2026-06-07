import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { TourCard } from '@/components/tours/TourCard'
import { tours } from '@/data/tours'

export const metadata: Metadata = {
  title: 'All Jeep Safari Tours',
  description:
    'Explore all Eilat Action routes — Negev Desert, Golan Heights, Galilee, Dead Sea, and night safaris. Private tours, expert guides, 6 languages.',
}

export default function ToursPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-[#1C1108] border-b border-[#D4A843]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="section-divider" />
              <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">All Adventures</span>
              <div className="section-divider" style={{ transform: 'scaleX(-1)' }} />
            </div>
            <h1
              className="text-5xl sm:text-6xl font-bold text-[#F5EDD8] mb-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Choose Your
              <span
                style={{
                  background: 'linear-gradient(135deg, #F2C464 0%, #D4A843 50%, #A87828 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {' '}Safari
              </span>
            </h1>
            <p className="text-[#7A6245] text-lg max-w-2xl mx-auto">
              Six signature routes across Israel's most extraordinary landscapes.
              All private. All unforgettable.
            </p>
          </div>
        </section>

        {/* Filters bar */}
        <section className="bg-[#0D0906] border-b border-[#D4A843]/10 sticky top-20 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3 overflow-x-auto scroll-x">
            {['All Tours', 'Negev Desert', 'Golan Heights', 'Galilee', 'Dead Sea', 'Night Safari'].map((label, i) => (
              <button
                key={label}
                className={`shrink-0 px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 ${
                  i === 0
                    ? 'bg-[#D4A843] text-[#0A0603]'
                    : 'text-[#7A6245] border border-[#D4A843]/15 hover:text-[#D4A843] hover:border-[#D4A843]/40'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Tours grid */}
        <section className="py-16 bg-[#0A0603]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </div>
          </div>
        </section>

        {/* Custom tour CTA */}
        <section className="py-16 bg-[#1C1108] border-t border-[#D4A843]/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#F5EDD8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Need Something Custom?
            </h2>
            <p className="text-[#7A6245] mb-8">
              Multi-day expeditions, corporate events, large groups, proposals — we build bespoke safaris for any occasion.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/972525217029" className="btn-primary">
                Chat With Us
              </a>
              <Link href="/contact" className="btn-secondary">
                Send a Request
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
