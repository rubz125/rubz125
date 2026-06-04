'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { tours } from '@/data/tours'
import { formatPrice } from '@/lib/utils'
import { CalendarDays, Users, Globe, MessageSquare, Check } from 'lucide-react'

function BookingForm() {
  const searchParams = useSearchParams()
  const preselectedTour = searchParams.get('tour') ?? ''

  const [form, setForm] = useState({
    tour: preselectedTour,
    date: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    language: 'English',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const selectedTour = tours.find((t) => t.slug === form.tour)
  const totalPrice = selectedTour ? selectedTour.price * parseInt(form.guests || '1') : 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#D4A843]/15 border border-[#D4A843]/30 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-[#D4A843]" />
          </div>
          <h2 className="text-3xl font-bold text-[#F5EDD8] mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
            Request Received!
          </h2>
          <p className="text-[#A08860] mb-6">
            We've received your booking request and will confirm within 2 hours. Check your email at <strong className="text-[#D6C9AD]">{form.email}</strong>.
          </p>
          <p className="text-[#7A6245] text-sm mb-8">
            For immediate assistance, message us on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://wa.me/972500000000" className="btn-primary">
              Open WhatsApp
            </a>
            <Link href="/tours" className="btn-secondary">
              Browse More Tours
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
            <h2 className="text-xl font-bold text-[#F5EDD8] mb-5 flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              <span className="w-7 h-7 rounded-sm bg-[#D4A843] text-[#0A0603] text-sm font-bold flex items-center justify-center shrink-0">1</span>
              Choose Your Tour
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {tours.map((t) => (
                <label
                  key={t.slug}
                  className={`flex items-start gap-3 p-4 rounded-sm border cursor-pointer transition-all duration-200 ${
                    form.tour === t.slug
                      ? 'border-[#D4A843] bg-[#D4A843]/08'
                      : 'border-[#D4A843]/10 bg-[#1C1108] hover:border-[#D4A843]/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="tour"
                    value={t.slug}
                    checked={form.tour === t.slug}
                    onChange={(e) => setForm({ ...form, tour: e.target.value })}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center ${
                    form.tour === t.slug ? 'border-[#D4A843] bg-[#D4A843]' : 'border-[#7A6245]'
                  }`}>
                    {form.tour === t.slug && <div className="w-2 h-2 rounded-full bg-[#0A0603]" />}
                  </div>
                  <div>
                    <div className="text-[#F5EDD8] text-sm font-semibold">{t.title}</div>
                    <div className="text-[#7A6245] text-xs mt-0.5">{t.duration} · {formatPrice(t.price, t.currency)}/person</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Step 2: Date & guests */}
          <div>
            <h2 className="text-xl font-bold text-[#F5EDD8] mb-5 flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              <span className="w-7 h-7 rounded-sm bg-[#D4A843] text-[#0A0603] text-sm font-bold flex items-center justify-center shrink-0">2</span>
              Date & Group Size
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[#D6C9AD] text-sm font-medium mb-2 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#D4A843]" /> Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-[#1C1108] border border-[#D4A843]/20 text-[#F5EDD8] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#D4A843] transition-colors"
                />
              </div>
              <div>
                <label className="text-[#D6C9AD] text-sm font-medium mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#D4A843]" /> Number of People
                </label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full bg-[#1C1108] border border-[#D4A843]/20 text-[#F5EDD8] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#D4A843] transition-colors"
                >
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Contact */}
          <div>
            <h2 className="text-xl font-bold text-[#F5EDD8] mb-5 flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              <span className="w-7 h-7 rounded-sm bg-[#D4A843] text-[#0A0603] text-sm font-bold flex items-center justify-center shrink-0">3</span>
              Your Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[#D6C9AD] text-sm font-medium mb-2 block">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#1C1108] border border-[#D4A843]/20 text-[#F5EDD8] placeholder-[#7A6245] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#D4A843] transition-colors"
                />
              </div>
              <div>
                <label className="text-[#D6C9AD] text-sm font-medium mb-2 block">Email</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#1C1108] border border-[#D4A843]/20 text-[#F5EDD8] placeholder-[#7A6245] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#D4A843] transition-colors"
                />
              </div>
              <div>
                <label className="text-[#D6C9AD] text-sm font-medium mb-2 block">Phone / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+1 555 000 0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[#1C1108] border border-[#D4A843]/20 text-[#F5EDD8] placeholder-[#7A6245] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#D4A843] transition-colors"
                />
              </div>
              <div>
                <label className="text-[#D6C9AD] text-sm font-medium mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#D4A843]" /> Preferred Language
                </label>
                <select
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })}
                  className="w-full bg-[#1C1108] border border-[#D4A843]/20 text-[#F5EDD8] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#D4A843] transition-colors"
                >
                  {['English', 'Hebrew', 'Arabic', 'Russian', 'French', 'Spanish', 'German'].map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[#D6C9AD] text-sm font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#D4A843]" /> Special Requests (optional)
              </label>
              <textarea
                rows={3}
                placeholder="Any dietary needs, accessibility requirements, special occasions, or questions..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full bg-[#1C1108] border border-[#D4A843]/20 text-[#F5EDD8] placeholder-[#7A6245] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#D4A843] transition-colors resize-none"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full text-base py-4">
            Submit Booking Request
          </button>
          <p className="text-[#7A6245] text-xs text-center">
            We'll confirm availability and send a payment link within 2 hours. No charge until confirmed.
          </p>
        </form>

        {/* Order summary */}
        <div>
          <div className="sticky top-28">
            <div className="bg-[#1C1108] border border-[#D4A843]/15 rounded-sm p-6">
              <h3 className="text-[#F5EDD8] font-bold text-lg mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>
                Booking Summary
              </h3>
              {selectedTour ? (
                <>
                  <div className="mb-4 pb-4 border-b border-[#D4A843]/10">
                    <div className="text-[#D6C9AD] font-semibold mb-1">{selectedTour.title}</div>
                    <div className="text-[#7A6245] text-sm">{selectedTour.duration}</div>
                    <div className="text-[#7A6245] text-sm">{selectedTour.region}</div>
                  </div>
                  <div className="space-y-2 mb-4 pb-4 border-b border-[#D4A843]/10 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#7A6245]">Price per person</span>
                      <span className="text-[#D6C9AD]">{formatPrice(selectedTour.price, selectedTour.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A6245]">× {form.guests} people</span>
                      <span className="text-[#D6C9AD]">{form.guests}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-[#D6C9AD] font-semibold">Estimated Total</span>
                    <span className="text-[#D4A843] font-bold text-2xl">{formatPrice(totalPrice, selectedTour.currency)}</span>
                  </div>
                </>
              ) : (
                <p className="text-[#7A6245] text-sm mb-6">Select a tour to see pricing.</p>
              )}

              {/* Trust */}
              <div className="space-y-2">
                {[
                  'No payment until confirmed',
                  'Free cancellation 48hrs before',
                  'Instant confirmation email',
                  'Secure SSL encryption',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[#7A6245] text-xs">
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
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#0A0603]">
        {/* Header */}
        <section className="py-14 bg-[#1C1108] border-b border-[#D4A843]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="section-divider" />
              <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">Reserve Your Spot</span>
              <div className="section-divider" style={{ transform: 'scaleX(-1)' }} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F5EDD8] mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
              Book Your Safari
            </h1>
            <p className="text-[#7A6245] max-w-xl mx-auto">
              Fill in your details and we&apos;ll confirm your adventure within 2 hours.
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
