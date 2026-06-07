'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Users, Star, MapPin, ArrowRight } from 'lucide-react'
import type { Tour } from '@/data/tours'
import { cn, getDifficultyColor, formatPrice } from '@/lib/utils'
import { useLang } from '@/lib/LangContext'

interface TourCardProps {
  tour: Tour
  featured?: boolean
}

export function TourCard({ tour, featured = false }: TourCardProps) {
  const { lang } = useLang()

  const title = lang === 'fr' ? tour.titleFr : lang === 'he' ? tour.titleHe : tour.title
  const shortDesc = lang === 'fr' ? tour.shortDescriptionFr : lang === 'he' ? tour.shortDescriptionHe : tour.shortDescription

  const viewLabel = lang === 'fr' ? 'Voir le circuit' : lang === 'he' ? 'לצפות בסיור' : 'View Tour'
  const fromLabel = lang === 'fr' ? 'Dès' : lang === 'he' ? 'מ-' : 'From'
  const perPersonLabel = lang === 'fr' ? 'par personne' : lang === 'he' ? 'לאדם' : 'per person'
  const peopleLabel = lang === 'fr' ? 'personnes' : lang === 'he' ? 'אנשים' : 'people'

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className={cn(
        'group relative flex flex-col bg-[#1C1108] border border-[#D4A843]/10 rounded-sm overflow-hidden card-hover',
        featured && 'ring-1 ring-[#D4A843]/30'
      )}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <Image
          src={tour.image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1108]/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {tour.badge && (
            <span className="px-2.5 py-1 bg-[#D4A843] text-[#0A0603] text-[11px] font-bold uppercase tracking-wider rounded-sm">
              {tour.badge}
            </span>
          )}
          <span className={cn('px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-sm border', getDifficultyColor(tour.difficulty))}>
            {tour.difficulty}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/80 text-xs">
          <MapPin className="w-3 h-3 text-[#D4A843]" />
          <span>{tour.region}</span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn('w-3.5 h-3.5', i < Math.floor(tour.rating) ? 'text-[#D4A843] fill-[#D4A843]' : 'text-[#3D2812] fill-[#3D2812]')}
              />
            ))}
          </div>
          <span className="text-[#D4A843] font-semibold text-sm">{tour.rating}</span>
          <span className="text-[#7A6245] text-xs">({tour.reviewCount})</span>
        </div>

        <h3 className="text-[#F5EDD8] font-bold text-lg leading-tight mb-1 group-hover:text-[#D4A843] transition-colors duration-200" style={{ fontFamily: 'var(--font-playfair)' }}>
          {title}
        </h3>
        <p className="text-[#7A6245] text-sm mb-4 leading-relaxed line-clamp-2">{shortDesc}</p>

        <div className="flex items-center gap-4 text-xs text-[#7A6245] mb-5">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#D4A843]" />
            {tour.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#D4A843]" />
            {tour.groupSize} {peopleLabel}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#D4A843]/10">
          <div>
            <span className="text-[#7A6245] text-xs">{fromLabel}</span>
            <div className="text-[#D4A843] font-bold text-xl leading-none">{formatPrice(tour.price, tour.currency)}</div>
            <span className="text-[#7A6245] text-xs">{perPersonLabel}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#D4A843] text-sm font-semibold group-hover:gap-2.5 transition-all duration-200">
            {viewLabel}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}
