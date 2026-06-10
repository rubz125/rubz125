'use client'
import Link from 'next/link'
import { TourCard } from '@/components/tours/TourCard'
import { tours } from '@/data/tours'
import { useLang } from '@/lib/LangContext'

export function ToursPageContent() {
  const { t } = useLang()

  return (
    <main className="pt-20">
      <section className="py-20 bg-[var(--bg-surface)] border-b border-[var(--border-sm)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="section-divider" />
            <span className="text-[var(--gold)] text-sm uppercase tracking-[0.2em] font-medium">{t.tours_eyebrow}</span>
            <div className="section-divider" style={{ transform: 'scaleX(-1)' }} />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-[var(--text-1)] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            {t.tours_title1}
            <span className="text-gradient-gold">{t.tours_title2}</span>
          </h1>
          <p className="text-[var(--text-4)] text-lg max-w-2xl mx-auto">
            {t.tours_subtitle}
          </p>
        </div>
      </section>

      <section className="py-16 bg-[var(--bg-base)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--bg-surface)] border-t border-[var(--border-sm)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-1)] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            {t.tours_custom_title}
          </h2>
          <p className="text-[var(--text-4)] mb-8">{t.tours_custom_desc}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/972525217029" className="btn-primary">{t.tours_custom_btn1}</a>
            <Link href="/contact" className="btn-secondary">{t.tours_custom_btn2}</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
