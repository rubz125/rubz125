'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { tours } from '@/data/tours'
import { formatPrice } from '@/lib/utils'
import { useLang } from '@/lib/LangContext'
import { CalendarDays, Users, Globe, MessageSquare, Check } from 'lucide-react'

function BookingForm() {
  const { t, lang } = useLang()
  const searchParams = useSearchParams()
  const preselectedTour = searchParams.get('tour') ?? ''

  const [form, setForm] = useState({
    tour: preselectedTour,
    date: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    language: lang === 'fr' ? 'French' : lang === 'he' ? 'Hebrew' : 'English',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const selectedTour = tours.find((tour) => tour.slug === form.tour)
  const totalPrice = selectedTour ? selectedTour.price * parseInt(form.guests || '1') : 0

  const getTourName = (tour: typeof tours[0]) =>
    lang === 'fr' ? tour.titleFr : lang === 'he' ? tour.titleHe : tour.title

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--gold-tint-15)] border border-[var(--border-lg)] flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--text-1)] mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
            {t.book_success_title}
          </h2>
          <p className="text-[var(--text-3)] mb-6">
            {t.book_success_desc} <strong className="text-[var(--text-2)]">{form.email}</strong>.
          </p>
          <p className="text-[var(--text-4)] text-sm mb-8">
            {t.book_success_wa}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://wa.me/972525217029" className="btn-primary">
              {t.book_success_wa_btn}
            </a>
            <Link href="/tours" className="btn-secondary">
              {t.book_success_tours}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
          {/* Step 1: Choose tour */}
          <div>
            <h2 className="text-xl font-bold text-[var(--text-1)] mb-5 flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              <span className="w-7 h-7 rounded-sm bg-[var(--gold)] text-[var(--bg-base)] text-sm font-bold flex items-center justify-center shrink-0">1</span>
              {t.book_step1}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {tours.map((tour) => (
                <label
                  key={tour.slug}
                  className={`flex items-start gap-3 p-4 rounded-sm border cursor-pointer transition-all duration-200 ${
                    form.tour === tour.slug
                      ? 'border-[var(--gold)] bg-[var(--gold-tint-08)]'
                      : 'border-[var(--border-sm)] bg-[var(--bg-surface)] hover:border-[var(--border-lg)]'
                  }`}
                >
                  <input
                    type="radio"
                    name="tour"
                    value={tour.slug}
                    checked={form.tour === tour.slug}
                    onChange={(e) => setForm({ ...form, tour: e.target.value })}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center ${
                    form.tour === tour.slug ? 'border-[var(--gold)] bg-[var(--gold)]' : 'border-[var(--text-4)]'
                  }`}>
                    {form.tour === tour.slug && <div className="w-2 h-2 rounded-full bg-[var(--bg-base)]" />}
                  </div>
                  <div>
                    <div className="text-[var(--text-1)] text-sm font-semibold">{getTourName(tour)}</div>
                    <div className="text-[var(--text-4)] text-xs mt-0.5">{tour.duration} · {formatPrice(tour.price, tour.currency)}{t.book_per_person}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Step 2: Date & guests */}
          <div>
            <h2 className="text-xl font-bold text-[var(--text-1)] mb-5 flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              <span className="w-7 h-7 rounded-sm bg-[var(--gold)] text-[var(--bg-base)] text-sm font-bold flex items-center justify-center shrink-0">2</span>
              {t.book_step2}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[var(--text-2)] text-sm font-medium mb-2 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[var(--gold)]" /> {t.book_date}
                </label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-md)] text-[var(--text-1)] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="text-[var(--text-2)] text-sm font-medium mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[var(--gold)]" /> {t.book_people_count}
                </label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-md)] text-[var(--text-1)] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                >
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? t.book_person : t.book_people}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Contact */}
          <div>
            <h2 className="text-xl font-bold text-[var(--text-1)] mb-5 flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              <span className="w-7 h-7 rounded-sm bg-[var(--gold)] text-[var(--bg-base)] text-sm font-bold flex items-center justify-center shrink-0">3</span>
              {t.book_step3}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[var(--text-2)] text-sm font-medium mb-2 block">{t.book_name}</label>
                <input
                  type="text"
                  required
                  placeholder={t.book_name_ph}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-md)] text-[var(--text-1)] placeholder-[var(--text-4)] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="text-[var(--text-2)] text-sm font-medium mb-2 block">{t.book_email}</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-md)] text-[var(--text-1)] placeholder-[var(--text-4)] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="text-[var(--text-2)] text-sm font-medium mb-2 block">{t.book_phone}</label>
                <input
                  type="tel"
                  placeholder="+1 555 000 0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-md)] text-[var(--text-1)] placeholder-[var(--text-4)] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="text-[var(--text-2)] text-sm font-medium mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[var(--gold)]" /> {t.book_lang_pref}
                </label>
                <select
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-md)] text-[var(--text-1)] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                >
                  {['English', 'Hebrew', 'French'].map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[var(--text-2)] text-sm font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[var(--gold)]" /> {t.book_notes}
              </label>
              <textarea
                rows={3}
                placeholder={t.book_notes_ph}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full bg-[var(--bg-surface)] border border-[var(--border-md)] text-[var(--text-1)] placeholder-[var(--text-4)] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors resize-none"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full text-base py-4">
            {t.book_submit}
          </button>
          <p className="text-[var(--text-4)] text-xs text-center">
            {t.book_note}
          </p>
        </form>

        {/* Order summary */}
        <div>
          <div className="sticky top-28">
            <div className="bg-[var(--bg-surface)] border border-[var(--border-sm)] rounded-sm p-6">
              <h3 className="text-[var(--text-1)] font-bold text-lg mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>
                {t.book_summary}
              </h3>
              {selectedTour ? (
                <>
                  <div className="mb-4 pb-4 border-b border-[var(--border-sm)]">
                    <div className="text-[var(--text-2)] font-semibold mb-1">{getTourName(selectedTour)}</div>
                    <div className="text-[var(--text-4)] text-sm">{selectedTour.duration}</div>
                    <div className="text-[var(--text-4)] text-sm">{selectedTour.region}</div>
                  </div>
                  <div className="space-y-2 mb-4 pb-4 border-b border-[var(--border-sm)] text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-4)]">{t.book_price_per}</span>
                      <span className="text-[var(--text-2)]">{formatPrice(selectedTour.price, selectedTour.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-4)]">× {form.guests} {parseInt(form.guests) === 1 ? t.book_person : t.book_people}</span>
                      <span className="text-[var(--text-2)]">{form.guests}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-[var(--text-2)] font-semibold">{t.book_total}</span>
                    <span className="text-[var(--gold)] font-bold text-2xl">{formatPrice(totalPrice, selectedTour.currency)}</span>
                  </div>
                </>
              ) : (
                <p className="text-[var(--text-4)] text-sm mb-6">{t.book_select_tour}</p>
              )}

              {/* Trust */}
              <div className="space-y-2">
                {[t.book_trust1, t.book_trust2, t.book_trust3, t.book_trust4].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[var(--text-4)] text-xs">
                    <span className="text-green-400">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BookPage() {
  const { t } = useLang()
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[var(--bg-base)]">
        {/* Header */}
        <section className="py-14 bg-[var(--bg-surface)] border-b border-[var(--border-sm)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="section-divider" />
              <span className="text-[var(--gold)] text-sm uppercase tracking-[0.2em] font-medium">{t.book_eyebrow}</span>
              <div className="section-divider" style={{ transform: 'scaleX(-1)' }} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-1)] mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
              {t.book_title}
            </h1>
            <p className="text-[var(--text-4)] max-w-xl mx-auto">
              {t.book_subtitle}
            </p>
          </div>
        </section>
        <Suspense>
          <BookingForm />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
