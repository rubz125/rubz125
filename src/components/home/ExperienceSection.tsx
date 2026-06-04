'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Shield, Compass, Heart, Award } from 'lucide-react'

const pillars = [
  {
    icon: Compass,
    title: 'Expert Local Guides',
    description:
      'Every guide is a certified Israeli geographer, historian, or former military tracker. They speak your language — literally. English, Hebrew, Arabic, Russian, French, and Spanish.',
    stat: '6 languages',
  },
  {
    icon: Shield,
    title: 'Uncompromising Safety',
    description:
      'Our Jeeps are expedition-grade with satellite communication, full first-aid equipment, and rollover protection. We hold a perfect 15-year safety record.',
    stat: 'Zero incidents',
  },
  {
    icon: Heart,
    title: 'Genuine Experiences',
    description:
      'We don\'t do tourist traps. We take you to places only locals know — hidden canyons, private viewpoints, and family-run Bedouin camps that aren\'t on any map.',
    stat: '100% off-the-beaten-path',
  },
  {
    icon: Award,
    title: 'Award-Winning',
    description:
      'TripAdvisor Hall of Fame inductee. Voted #1 Adventure Tour in Israel for four consecutive years. We have the reviews to prove it — 4.9★ from 847 verified travelers.',
    stat: '4.9★ from 847 reviews',
  },
]

export function ExperienceSection() {
  return (
    <section className="py-24 bg-[#1C1108] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #D4A843 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-sm overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <Image
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&q=80"
                alt="Jeep Safari landscape"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1108]/60 via-transparent to-transparent" />
            </div>
            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-[#0A0603] border border-[#D4A843]/20 rounded-sm p-5 shadow-2xl"
            >
              <div className="text-[#D4A843] font-bold text-3xl leading-none" style={{ fontFamily: 'var(--font-playfair)' }}>847+</div>
              <div className="text-[#F5EDD8] text-sm font-medium mt-1">Verified Reviews</div>
              <div className="flex mt-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#D4A843] text-sm">★</span>
                ))}
              </div>
            </motion.div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-4 -left-4 bg-gradient-to-br from-[#D4A843] to-[#C4623A] rounded-sm p-4 shadow-xl shadow-[#D4A843]/20"
            >
              <div className="text-[#0A0603] font-bold text-lg leading-none">15</div>
              <div className="text-[#0A0603]/70 text-xs font-medium">Years</div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="section-divider" />
              <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">
                Why Desert Kings
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-[#F5EDD8] leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Not Just a Tour.
              <br />
              <span className="text-gradient-gold">An Expedition.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#A08860] text-base leading-relaxed mb-10"
            >
              Since 2009, Desert Kings has redefined what a Jeep Safari means. We built this company because we were frustrated with mediocre, overcrowded tours that treated landscapes like checkboxes. We do the opposite.
            </motion.p>

            <div className="space-y-7">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                    className="flex gap-4"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-sm bg-[#D4A843]/10 border border-[#D4A843]/20 flex items-center justify-center mt-0.5">
                      <Icon className="w-5 h-5 text-[#D4A843]" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-3 mb-1">
                        <h3 className="text-[#F5EDD8] font-semibold text-base">{pillar.title}</h3>
                        <span className="text-[#D4A843] text-xs font-medium">{pillar.stat}</span>
                      </div>
                      <p className="text-[#7A6245] text-sm leading-relaxed">{pillar.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
