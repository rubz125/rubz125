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
  const contactLabel = lang === 'fr' ? 'Nous consulter' : lang === 'he' ? 'צרו קשר' : 'Contact us'
  const upTo8Label = lang === 'fr' ? "jusqu'à 8 pers." : lang === 'he' ? 'עד 8 אנשים' : 'up to 8 people'

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className={cn(
        'group relative flex flex-col bg-[var(--bg-surface)] border border-[var(--border-sm)] rounded-sm overflow-hidden card-hover',
        featured && 'ring-1 ring-[var(--border-lg)]'
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
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-80)] via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {tour.badge && (
            <span className="px-2.5 py-1 bg-[var(--gold)] text-[var(--bg-base)] text-[11px] font-bold uppercase tracking-wider rounded-sm">
              {tour.badge}
            </span>
          )}
          <span className={cn('px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-sm border', getDifficultyColor(tour.difficulty))}>
            {tour.difficulty}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs bg-black/50 backdrop-blur-sm px-2 py-1 rounded-sm">
          <MapPin className="w-3 h-3 text-[var(--gold)]" />
          <span>{tour.region}</span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn('w-3.5 h-3.5', i < Math.floor(tour.rating) ? 'text-[var(--gold)] fill-[var(--gold)]' : 'text-[var(--star-empty)] fill-[var(--star-empty)]')}
              />
            ))}
          </div>
          <span className="text-[var(--gold)] font-semibold text-sm">{tour.rating}</span>
          <span className="text-[var(--text-4)] text-xs">({tour.reviewCount})</span>
        </div>

        <h3 className="text-[var(--text-1)] font-bold text-lg leading-tight mb-1 group-hover:text-[var(--gold)] transition-colors duration-200" style={{ fontFamily: 'var(--font-playfair)' }}>
          {title}
        </h3>
        <p className="text-[var(--text-4)] text-sm mb-4 leading-relaxed line-clamp-2">{shortDesc}</p>

        <div className="flex items-center gap-4 text-xs text-[var(--text-4)] mb-5">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[var(--gold)]" />
            {tour.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[var(--gold)]" />
            {tour.groupSize} {peopleLabel}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border-sm)]">
          <div>
            {tour.priceOnRequest ? (
              <div className="text-[var(--gold)] font-bold text-xl leading-none">{contactLabel}</div>
            ) : tour.pricePerGroup ? (
              <>
                <span className="text-[var(--text-4)] text-xs">{fromLabel}</span>
                <div className="text-[var(--gold)] font-bold text-xl leading-none">{formatPrice(tour.price, tour.currency)}</div>
                <span className="text-[var(--text-4)] text-xs">{upTo8Label}</span>
              </>
            ) : (
              <>
                <span className="text-[var(--text-4)] text-xs">{fromLabel}</span>
                <div className="text-[var(--gold)] font-bold text-xl leading-none">{formatPrice(tour.price, tour.currency)}</div>
                <span className="text-[var(--text-4)] text-xs">{perPersonLabel}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[var(--gold)] text-sm font-semibold group-hover:gap-2.5 transition-all duration-200">
            {viewLabel}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}
