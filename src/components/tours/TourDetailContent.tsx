'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Users, MapPin, Star, Check, CalendarDays, Globe } from 'lucide-react'
import { cn, getDifficultyColor, formatPrice } from '@/lib/utils'
import { useLang } from '@/lib/LangContext'
import type { Tour } from '@/data/tours'

export function TourDetailContent({ tour }: { tour: Tour }) {
  const { lang } = useLang()

  const title = lang === 'fr' ? tour.titleFr : lang === 'he' ? tour.titleHe : tour.title
  const subtitle = lang === 'fr' ? tour.subtitleFr : lang === 'he' ? tour.subtitleHe : tour.subtitle
  const description = lang === 'fr' ? tour.descriptionFr : lang === 'he' ? tour.descriptionHe : tour.description
  const highlights = lang === 'fr' ? tour.highlightsFr : lang === 'he' ? tour.highlightsHe : tour.highlights
  const includes = lang === 'fr' ? tour.includesFr : lang === 'he' ? tour.includesHe : tour.includes

  const labels = {
    home:       lang === 'fr' ? 'Accueil'             : lang === 'he' ? 'בית'              : 'Home',
    tours:      lang === 'fr' ? 'Circuits'            : lang === 'he' ? 'סיורים'           : 'Tours',
    duration:   lang === 'fr' ? 'Durée'               : lang === 'he' ? 'משך'              : 'Duration',
    group:      lang === 'fr' ? 'Groupe'              : lang === 'he' ? 'קבוצה'            : 'Group Size',
    region:     lang === 'fr' ? 'Région'              : lang === 'he' ? 'אזור'             : 'Region',
    languages:  lang === 'fr' ? 'Langues'             : lang === 'he' ? 'שפות'             : 'Languages',
    reviews:    lang === 'fr' ? 'avis vérifiés'       : lang === 'he' ? 'ביקורות מאומתות' : 'verified reviews',
    about:      lang === 'fr' ? 'À propos du circuit' : lang === 'he' ? 'על הסיור'        : 'About This Safari',
    highlights: lang === 'fr' ? 'Points forts'        : lang === 'he' ? 'נקודות עיקריות'  : 'Tour Highlights',
    includes:   lang === 'fr' ? 'Inclus'              : lang === 'he' ? 'מה כלול'          : "What's Included",
    photos:     lang === 'fr' ? 'Photos'              : lang === 'he' ? 'תמונות'           : 'Photos',
    from:       lang === 'fr' ? 'Dès'                 : lang === 'he' ? 'מ-'               : 'From',
    perPerson:  lang === 'fr' ? 'par personne'        : lang === 'he' ? 'לאדם'            : 'per person',
    people:     lang === 'fr' ? 'personnes'           : lang === 'he' ? 'אנשים'           : 'people',
    book:       lang === 'fr' ? 'Réserver ce circuit' : lang === 'he' ? 'הזמן סיור זה'   : 'Book This Tour',
    whatsapp:   lang === 'fr' ? 'Poser une question sur WhatsApp' : lang === 'he' ? 'שאל שאלה בוואטסאפ' : 'Ask a Question on WhatsApp',
    cancel:     lang === 'fr' ? 'Annulation gratuite 48h avant'  : lang === 'he' ? 'ביטול חינם 48 שעות לפני'    : 'Free cancellation 48hrs before',
    confirm:    lang === 'fr' ? 'Confirmation instantanée'       : lang === 'he' ? 'אישור מיידי'               : 'Instant confirmation',
    secure:     lang === 'fr' ? 'Paiement sécurisé'              : lang === 'he' ? 'תשלום מאובטח'              : 'Secure payment',
  }

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <Image src={tour.image} alt={title} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0603] via-black/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <div className="flex items-center gap-2 text-xs text-[#7A6245] mb-4">
            <Link href="/" className="hover:text-[#D4A843] transition-colors">{labels.home}</Link>
            <span>/</span>
            <Link href="/tours" className="hover:text-[#D4A843] transition-colors">{labels.tours}</Link>
            <span>/</span>
            <span className="text-[#D6C9AD]">{title}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {tour.badge && (
              <span className="px-2.5 py-1 bg-[#D4A843] text-[#0A0603] text-xs font-bold uppercase tracking-wider rounded-sm">{tour.badge}</span>
            )}
            <span className={cn('px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm border', getDifficultyColor(tour.difficulty))}>
              {tour.difficulty}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5EDD8] leading-tight mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            {title}
          </h1>
          <p className="text-[#D6C9AD] text-lg">{subtitle}</p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 bg-[#0A0603]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {/* Quick meta */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Clock,  label: labels.duration,  value: tour.duration },
                  { icon: Users,  label: labels.group,     value: `${tour.groupSize} ${labels.people}` },
                  { icon: MapPin, label: labels.region,    value: tour.region },
                  { icon: Globe,  label: labels.languages, value: tour.languages.slice(0, 2).join(', ') },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-[#1C1108] border border-[#D4A843]/10 rounded-sm p-4">
                    <Icon className="w-4 h-4 text-[#D4A843] mb-2" />
                    <div className="text-[#7A6245] text-xs mb-0.5">{label}</div>
                    <div className="text-[#F5EDD8] text-sm font-medium">{value}</div>
                  </div>
                ))}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 p-4 bg-[#1C1108] border border-[#D4A843]/10 rounded-sm">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn('w-5 h-5', i < Math.floor(tour.rating) ? 'text-[#D4A843] fill-[#D4A843]' : 'text-[#3D2812]')} />
                  ))}
                </div>
                <span className="text-[#D4A843] font-bold text-xl">{tour.rating}</span>
                <span className="text-[#7A6245]">{tour.reviewCount} {labels.reviews}</span>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-[#F5EDD8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>{labels.about}</h2>
                <p className="text-[#A08860] leading-relaxed">{description}</p>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-2xl font-bold text-[#F5EDD8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>{labels.highlights}</h2>
                <ul className="space-y-3">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="shrink-0 w-5 h-5 rounded-sm bg-[#D4A843]/10 border border-[#D4A843]/20 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-[#D4A843]" />
                      </div>
                      <span className="text-[#D6C9AD] text-sm">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Included */}
              <div>
                <h2 className="text-2xl font-bold text-[#F5EDD8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>{labels.includes}</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-400 text-base leading-none mt-0.5">✓</span>
                      <span className="text-[#A08860] text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gallery */}
              {tour.gallery.length > 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#F5EDD8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>{labels.photos}</h2>
                  <div className="grid grid-cols-3 gap-2">
                    {tour.gallery.map((src, i) => (
                      <div key={i} className="relative rounded-sm overflow-hidden" style={{ aspectRatio: '4/3' }}>
                        <Image src={src} alt={`${title} ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="200px" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-[#1C1108] border border-[#D4A843]/20 rounded-sm p-6 shadow-2xl shadow-black/50">
                  <div className="mb-5">
                    <span className="text-[#7A6245] text-xs">{labels.from}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[#D4A843] font-bold text-4xl leading-none" style={{ fontFamily: 'var(--font-playfair)' }}>
                        {formatPrice(tour.price, tour.currency)}
                      </span>
                      <span className="text-[#7A6245] text-sm">{labels.perPerson}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-[#7A6245] text-sm">
                      <CalendarDays className="w-4 h-4 text-[#D4A843]" />
                      <span>{tour.departure}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#7A6245] text-sm">
                      <Users className="w-4 h-4 text-[#D4A843]" />
                      <span>{tour.groupSize} {labels.people}</span>
                    </div>
                  </div>

                  <Link href={`/book?tour=${tour.slug}`} className="btn-primary w-full text-center mb-3 block">
                    {labels.book}
                  </Link>
                  <a
                    href="https://wa.me/972525217029"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-sm bg-[#25D366]/10 border border-[#25D366]/25 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/20 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {labels.whatsapp}
                  </a>

                  <div className="mt-5 pt-5 border-t border-[#D4A843]/10 space-y-2">
                    {[labels.cancel, labels.confirm, labels.secure].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-[#7A6245] text-xs">
                        <span className="text-green-400">✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
