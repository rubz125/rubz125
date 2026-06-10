'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/LangContext'

function MarqueeItem({ icon, value, label, sub }: { icon: string; value: string; label: string; sub: string }) {
  return (
    <div className="flex items-center gap-4 px-8 shrink-0">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-[var(--gold)] font-bold text-xl leading-none">{value}</div>
        <div className="text-[var(--text-1)] text-sm font-medium leading-tight mt-0.5">{label}</div>
        <div className="text-[var(--text-4)] text-xs">{sub}</div>
      </div>
      <div className="w-px h-8 bg-[var(--border-md)] ml-4" />
    </div>
  )
}

export function StatsBar() {
  const { t } = useLang()

  const stats = [
    { icon: '🏆', value: '847+',    label: t.stats_reviews_label,     sub: t.stats_reviews_sub },
    { icon: '🗺️', value: '6',       label: t.stats_routes_label,      sub: t.stats_routes_sub },
    { icon: '👥', value: '12,000+', label: t.stats_adventurers_label, sub: t.stats_adventurers_sub },
    { icon: '🛡️', value: '100%',    label: t.stats_safety_label,      sub: t.stats_safety_sub },
    { icon: '🌍', value: '3',       label: t.stats_languages_label,   sub: t.stats_languages_sub },
    { icon: '⏱️', value: '15',      label: t.stats_years_label,       sub: t.stats_years_sub },
  ]

  const repeated = [...stats, ...stats, ...stats, ...stats]

  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const isDragging = useRef(false)
  const lastX = useRef(0)
  const velocityRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const getLoopWidth = () => track.scrollWidth / 4

    const tick = () => {
      if (!isDragging.current) {
        if (Math.abs(velocityRef.current) > 0.1) {
          posRef.current += velocityRef.current
          velocityRef.current *= 0.95
        } else {
          velocityRef.current = 0
          posRef.current += 0.6
        }
      }
      const loopWidth = getLoopWidth()
      if (posRef.current >= loopWidth) posRef.current -= loopWidth
      if (posRef.current < 0) posRef.current += loopWidth
      track.style.transform = `translateX(-${posRef.current}px)`
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true
    lastX.current = e.touches[0].clientX
    velocityRef.current = 0
  }

  const onTouchMove = (e: React.TouchEvent) => {
    const dx = lastX.current - e.touches[0].clientX
    lastX.current = e.touches[0].clientX
    velocityRef.current = dx
    posRef.current += dx
  }

  const onTouchEnd = () => { isDragging.current = false }

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    lastX.current = e.clientX
    velocityRef.current = 0
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    const dx = lastX.current - e.clientX
    lastX.current = e.clientX
    velocityRef.current = dx
    posRef.current += dx
  }

  const onMouseUp = () => { isDragging.current = false }

  return (
    <section className="bg-[var(--bg-surface)] border-y border-[var(--border-sm)] overflow-hidden py-6 cursor-grab active:cursor-grabbing select-none">
      <div
        dir="ltr"
        className="relative w-full overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{ width: 'max-content', willChange: 'transform' }}
        >
          {repeated.map((stat, i) => (
            <MarqueeItem key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
