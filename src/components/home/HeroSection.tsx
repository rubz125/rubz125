'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown, Star, Play } from 'lucide-react'

const heroImages = [
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=85',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=85',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920&q=85',
]

export function HeroSection() {
  const [currentImg, setCurrentImg] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setIsLoaded(true)
    intervalRef.current = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image slideshow */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              i === currentImg ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDuration: '2000ms' }}
          >
            <Image
              src={src}
              alt="Jeep Safari adventure"
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-10" />
        {/* Cinematic vignette */}
        <div className="absolute inset-0 z-10" style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)'
        }} />
      </div>

      {/* Animated noise texture */}
      <div className="absolute inset-0 z-10 opacity-[0.03]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
      }} />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 mb-8"
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-[#D4A843] fill-[#D4A843]" />
            ))}
          </div>
          <span className="text-[#D4A843] text-sm font-medium tracking-[0.2em] uppercase">
            Israel's #1 Rated Jeep Safari
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          <span className="text-[#F5EDD8] block">Where the</span>
          <span className="text-gradient-gold block">Desert</span>
          <span className="text-[#F5EDD8] block">Becomes Yours</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-[#D6C9AD] text-lg sm:text-xl max-w-2xl leading-relaxed mb-10"
        >
          Private Jeep Safaris through the Negev, Galilee, Golan Heights & Dead Sea.
          Expert guides. Cinematic landscapes. Memories that last a lifetime.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <Link href="/book" className="btn-primary text-base px-8 py-4">
            Book Your Safari
            <span className="text-[#0A0603]/60 font-normal">— From ₪320</span>
          </Link>
          <Link href="/tours" className="btn-secondary text-base px-8 py-4">
            <Play className="w-4 h-4" />
            Explore Tours
          </Link>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {[
            { number: '847+', label: 'Verified Reviews' },
            { number: '4.9★', label: 'Average Rating' },
            { number: '15 yrs', label: 'Experience' },
            { number: '6 langs', label: 'Guides Speak' },
          ].map(({ number, label }) => (
            <div key={label} className="text-center">
              <div className="text-[#D4A843] font-bold text-xl sm:text-2xl leading-none">{number}</div>
              <div className="text-[#7A6245] text-xs uppercase tracking-[0.15em] mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Slideshow dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImg(i)}
            className={`transition-all duration-300 rounded-full ${
              i === currentImg
                ? 'w-8 h-1.5 bg-[#D4A843]'
                : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[#7A6245] text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="w-5 h-5 text-[#D4A843]" />
      </motion.div>
    </section>
  )
}
