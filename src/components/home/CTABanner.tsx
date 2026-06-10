'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { useLang } from '@/lib/LangContext'

export function CTABanner() {
  const { t } = useLang()

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/gallery/desert1.jpg"
          alt="Desert adventure"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--base-95)] via-[var(--base-80)] to-[var(--base-60)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--base-50)] via-transparent to-[var(--base-50)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="section-divider" />
            <span className="text-[var(--gold)] text-sm uppercase tracking-[0.2em] font-medium">{t.cta_eyebrow}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-1)] leading-tight mb-6"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {t.cta_title1}
            <br />
            <span className="text-gradient-gold">{t.cta_title2}</span>
            <br />
            {t.cta_title3}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[var(--text-2)] text-lg leading-relaxed mb-10"
          >
            {t.cta_sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
          >
            <Link href="/book" className="btn-primary text-base px-8 py-4 w-full sm:w-auto text-center">
              {t.cta_book}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+972525217029" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto text-center">
              <Phone className="w-4 h-4" />
              {t.cta_call}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 text-xs text-[var(--text-4)]"
          >
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Free cancellation 48hrs before</span>
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> No payment until confirmed</span>
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Instant booking confirmation</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
