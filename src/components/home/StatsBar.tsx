'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { icon: '🏆', value: '847+', label: 'Five-Star Reviews', sub: 'TripAdvisor & Google' },
  { icon: '🗺️', value: '6', label: 'Unique Routes', sub: 'Across Israel' },
  { icon: '👥', value: '12,000+', label: 'Happy Adventurers', sub: 'Since 2009' },
  { icon: '🛡️', value: '100%', label: 'Safety Record', sub: 'Zero Incidents' },
  { icon: '🌍', value: '6', label: 'Languages Spoken', sub: 'By Our Guides' },
  { icon: '⏱️', value: '15', label: 'Years Operating', sub: 'Licensed & Certified' },
]

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0)
  const ref = useRef(false)

  useEffect(() => {
    if (ref.current) return
    ref.current = true
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(target)
    }
    requestAnimationFrame(animate)
  }, [target, duration])

  return count
}

function MarqueeItem({ icon, value, label, sub }: (typeof stats)[0]) {
  return (
    <div className="flex items-center gap-4 px-8 shrink-0">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-[#D4A843] font-bold text-xl leading-none">{value}</div>
        <div className="text-[#F5EDD8] text-sm font-medium leading-tight mt-0.5">{label}</div>
        <div className="text-[#7A6245] text-xs">{sub}</div>
      </div>
      <div className="w-px h-8 bg-[#D4A843]/20 ml-4" />
    </div>
  )
}

export function StatsBar() {
  return (
    <section className="bg-[#1C1108] border-y border-[#D4A843]/15 overflow-hidden py-6">
      {/* Marquee */}
      <div
        className="flex"
        style={{
          animation: 'marquee 30s linear infinite',
          width: 'max-content',
        }}
      >
        {[...stats, ...stats].map((stat, i) => (
          <MarqueeItem key={i} {...stat} />
        ))}
      </div>
    </section>
  )
}
