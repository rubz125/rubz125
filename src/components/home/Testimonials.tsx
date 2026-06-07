'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '@/data/testimonials'
import { useLang } from '@/lib/LangContext'

export function Testimonials() {
  const { t } = useLang()

  return (
    <section id="reviews" className="py-24 bg-[#1C1108] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]" style={{
        background: 'radial-gradient(circle at 100% 50%, #D4A843, transparent 70%)',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="section-divider" />
            <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">{t.testimonials_eyebrow}</span>
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
            {t.testimonials_title}
            <span className="text-gradient-gold">{t.testimonials_title2}</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mt-6"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-[#D4A843] fill-[#D4A843]" />
              ))}
            </div>
            <div>
              <span className="text-[#F5EDD8] font-bold text-xl">4.9</span>
              <span className="text-[#7A6245] text-sm ml-1">/ 5 · 847 reviews</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#7A6245]">
              <span>on</span>
              <span className="text-[#F5EDD8] font-medium">TripAdvisor</span>
              <span>&</span>
              <span className="text-[#F5EDD8] font-medium">Google</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#0A0603] border border-[#D4A843]/08 rounded-sm p-6 hover:border-[#D4A843]/20 transition-all duration-300 flex flex-col"
            >
              <Quote className="w-8 h-8 text-[#D4A843]/30 mb-4" />
              <div className="flex gap-0.5 mb-3">
                {[...Array(item.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-[#D4A843] fill-[#D4A843]" />
                ))}
              </div>
              <div className="inline-flex mb-3">
                <span className="px-2 py-0.5 bg-[#D4A843]/08 border border-[#D4A843]/15 text-[#D4A843] text-[11px] font-medium rounded-sm">
                  {item.tour}
                </span>
              </div>
              <p className="text-[#A08860] text-sm leading-relaxed flex-1 mb-5">&ldquo;{item.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/05">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <Image src={item.avatar} alt={item.name} fill className="object-cover" sizes="40px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#F5EDD8] font-semibold text-sm truncate">{item.name}</span>
                    <span className="text-sm">{item.flag}</span>
                    {item.verified && (
                      <span className="text-[10px] text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded-sm border border-green-400/20">✓</span>
                    )}
                  </div>
                  <div className="text-[#7A6245] text-xs">{item.location} · {item.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a href="https://www.tripadvisor.com" className="inline-flex items-center gap-2 text-[#D4A843] font-semibold text-sm hover:text-[#F2C464] transition-colors">
            {t.testimonials_all}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
