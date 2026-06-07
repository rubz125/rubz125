'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, CalendarDays, Compass } from 'lucide-react'
import { useLang } from '@/lib/LangContext'

export function HowItWorks() {
  const { t } = useLang()

  const steps = [
    { icon: Search, number: '01', title: t.step1_title, description: t.step1_desc, cta: t.nav_tours, ctaHref: '/tours' },
    { icon: CalendarDays, number: '02', title: t.step2_title, description: t.step2_desc, cta: t.nav_book, ctaHref: '/book' },
    { icon: Compass, number: '03', title: t.step3_title, description: t.step3_desc, cta: null, ctaHref: null },
  ]

  return (
    <section className="py-24 bg-[#0A0603]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="section-divider" />
            <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">{t.how_eyebrow}</span>
            <div className="section-divider" style={{ transform: 'scaleX(-1)' }} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-[#F5EDD8]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {t.how_title}
            <span className="text-gradient-gold">{t.how_title2}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#7A6245] mt-4 max-w-xl mx-auto"
          >
            {t.how_sub}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 relative">
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+1.25rem)] right-[calc(16.67%+1.25rem)] h-px bg-gradient-to-r from-[#D4A843]/20 via-[#D4A843]/50 to-[#D4A843]/20" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center p-8 bg-[#1C1108] border border-[#D4A843]/10 rounded-sm hover:border-[#D4A843]/25 transition-colors duration-300"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#D4A843] to-[#C4623A] flex items-center justify-center shadow-lg shadow-[#D4A843]/30">
                  <span className="text-[#0A0603] font-bold text-xs">{step.number}</span>
                </div>
                <div className="mt-4 mb-5 w-14 h-14 rounded-sm bg-[#D4A843]/08 border border-[#D4A843]/15 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-[#D4A843]" />
                </div>
                <h3 className="text-[#F5EDD8] font-bold text-xl mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {step.title}
                </h3>
                <p className="text-[#7A6245] text-sm leading-relaxed mb-5">{step.description}</p>
                {step.cta && step.ctaHref && (
                  <Link href={step.ctaHref} className="text-[#D4A843] text-sm font-semibold hover:text-[#F2C464] transition-colors">
                    {step.cta} →
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[#7A6245]"
        >
          {['Free cancellation up to 48 hours before', 'Secure payment — Visa, Mastercard, PayPal', 'Instant booking confirmation', 'Hotel pickup included'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="text-green-400 text-base">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
