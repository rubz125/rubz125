'use client'
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

  // 4 copies so the loop is seamless even if the viewport is very wide
  const repeated = [...stats, ...stats, ...stats, ...stats]

  return (
    <section className="bg-[var(--bg-surface)] border-y border-[var(--border-sm)] overflow-hidden py-6">
      {/* dir="ltr" forces left-to-right scroll even in RTL/Hebrew mode */}
      <div dir="ltr" className="relative w-full overflow-hidden">
        <div
          className="flex"
          style={{
            animation: 'marquee 40s linear infinite',
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {repeated.map((stat, i) => (
            <MarqueeItem key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
