'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Clock, Users, MapPin, Star, Check, Globe } from 'lucide-react'
import { cn, getDifficultyColor, formatPrice } from '@/lib/utils'
import { useLang } from '@/lib/LangContext'
import type { Tour } from '@/data/tours'

export function TourDetailContent({ tour }: { tour: Tour }) {
  const { lang } = useLang()
  const [selectedPkg, setSelectedPkg] = useState(0)

  const title       = lang === 'fr' ? tour.titleFr       : lang === 'he' ? tour.titleHe       : tour.title
  const subtitle    = lang === 'fr' ? tour.subtitleFr ?? '' : lang === 'he' ? tour.subtitleHe ?? '' : ''
  const category    = lang === 'fr' ? tour.categoryFr    : lang === 'he' ? tour.categoryHe    : tour.category
  const description = lang === 'fr' ? tour.descriptionFr : lang === 'he' ? tour.descriptionHe : tour.description
  const includes    = lang === 'fr' ? tour.includesFr    : lang === 'he' ? tour.includesHe    : tour.includes
  const highlights  = lang === 'fr' ? (tour.highlightsFr ?? []) : lang === 'he' ? (tour.highlightsHe ?? []) : (tour.highlights ?? [])
  const whatToBring = lang === 'fr' ? (tour.whatToBringFr ?? []) : lang === 'he' ? (tour.whatToBringHe ?? []) : (tour.whatToBring ?? [])

  const pkg = tour.packages[selectedPkg]
  const pkgName = lang === 'fr' ? pkg.nameFr : lang === 'he' ? pkg.nameHe : pkg.name
  const pkgDesc = lang === 'fr' ? pkg.descriptionFr : lang === 'he' ? pkg.descriptionHe : pkg.description

  const L = {
    home:       lang === 'fr' ? 'Accueil'             : lang === 'he' ? 'בית'              : 'Home',
    tours:      lang === 'fr' ? 'Circuits'            : lang === 'he' ? 'סיורים'           : 'Tours',
    duration:   lang === 'fr' ? 'Durée'               : lang === 'he' ? 'משך'              : 'Duration',
    group:      lang === 'fr' ? 'Groupe'              : lang === 'he' ? 'קבוצה'            : 'Group Size',
    region:     lang === 'fr' ? 'Région'              : lang === 'he' ? 'אזור'             : 'Region',
    languages:  lang === 'fr' ? 'Langues'             : lang === 'he' ? 'שפות'             : 'Languages',
    reviews:    lang === 'fr' ? 'avis vérifiés'       : lang === 'he' ? 'ביקורות מאומתות' : 'verified reviews',
    about:      lang === 'fr' ? 'À propos'            : lang === 'he' ? 'על הסיור'         : 'About This Safari',
    highlights: lang === 'fr' ? 'Points forts'        : lang === 'he' ? 'נקודות עיקריות'  : 'Highlights',
    includes:   lang === 'fr' ? 'Inclus dans chaque excursion' : lang === 'he' ? 'כלול בכל טיול' : 'Included in every excursion',
    packages:   lang === 'fr' ? 'Formules disponibles' : lang === 'he' ? 'חבילות זמינות'  : 'Available packages',
    bring:      lang === 'fr' ? 'À prévoir'           : lang === 'he' ? 'מה להביא'         : 'What to bring',
    photos:     lang === 'fr' ? 'Photos'              : lang === 'he' ? 'תמונות'           : 'Photos',
    from:       lang === 'fr' ? 'Dès'                 : lang === 'he' ? 'מ-'               : 'From',
    perPerson:  lang === 'fr' ? 'par personne'        : lang === 'he' ? 'לאדם'             : 'per person',
    people:     lang === 'fr' ? 'personnes'           : lang === 'he' ? 'אנשים'            : 'people',
    book:       lang === 'fr' ? 'Réserver'            : lang === 'he' ? 'הזמן עכשיו'       : 'Book Now',
    whatsapp:   lang === 'fr' ? 'Question sur WhatsApp' : lang === 'he' ? 'שאלה בוואטסאפ' : 'Ask on WhatsApp',
    cancel:     lang === 'fr' ? 'Annulation gratuite 48h avant' : lang === 'he' ? 'ביטול חינם 48 שעות לפני' : 'Free cancellation 48hrs before',
    confirm:    lang === 'fr' ? 'Confirmation instantanée' : lang === 'he' ? 'אישור מיידי' : 'Instant confirmation',
    secure:     lang === 'fr' ? 'Paiement sécurisé'   : lang === 'he' ? 'תשלום מאובטח'    : 'Secure payment',
    mealIncl:   lang === 'fr' ? 'Repas inclus'        : lang === 'he' ? 'ארוחה כלולה'      : 'Meal included',
    entryIncl:  lang === 'fr' ? "Entrée incluse"      : lang === 'he' ? 'כניסה כלולה'      : 'Entry included',
    trek:       lang === 'fr' ? 'Trek inclus'         : lang === 'he' ? 'טרקינג כלול'       : 'Trek included',
    warning:    lang === 'fr' ? "⚠️ Tarifs enfants non applicables pendant les fêtes." : lang === 'he' ? '⚠️ מחירי ילדים אינם חלים בחגים.' : '⚠️ Children\'s rates do not apply during holidays.',
  }

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end">
        <Image src={tour.image} alt={title} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0603] via-black/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <div className="flex items-center gap-2 text-xs text-[#7A6245] mb-3">
            <Link href="/" className="hover:text-[#D4A843] transition-colors">{L.home}</Link>
            <span>/</span>
            <Link href="/tours" className="hover:text-[#D4A843] transition-colors">{L.tours}</Link>
            <span>/</span>
            <span className="text-[#D6C9AD]">{title}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-[#D4A843]/20 border border-[#D4A843]/40 text-[#D4A843] text-xs font-semibold uppercase tracking-wider rounded-sm">
              {category}
            </span>
            {tour.badge && (
              <span className="px-2.5 py-1 bg-[#D4A843] text-[#0A0603] text-xs font-bold uppercase tracking-wider rounded-sm">{tour.badge}</span>
            )}
            <span className={cn('px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm border', getDifficultyColor(tour.difficulty))}>
              {tour.difficulty}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5EDD8] leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            {title}
          </h1>
          {subtitle && <p className="text-[#D6C9AD] text-lg mt-2">{subtitle}</p>}
        </div>
      </section>

      <section className="py-12 bg-[#0A0603]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── Left column ─────────────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-10">

              {/* Quote */}
              <blockquote className="border-l-2 border-[#D4A843] pl-6 py-2">
                <p className="text-[#D6C9AD] text-lg italic leading-relaxed">"{tour.quote}"</p>
                <cite className="text-[#7A6245] text-sm mt-2 block not-italic">— {tour.quoteAuthor}</cite>
              </blockquote>

              {/* Quick meta */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Clock,  label: L.duration,  value: tour.duration },
                  { icon: Users,  label: L.group,     value: `${tour.groupSize} ${L.people}` },
                  { icon: MapPin, label: L.region,    value: tour.region },
                  { icon: Globe,  label: L.languages, value: tour.languages.slice(0, 2).join(', ') },
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
                <span className="text-[#7A6245]">{tour.reviewCount} {L.reviews}</span>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-[#F5EDD8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>{L.about}</h2>
                {description.split('\n\n').map((para, i) => (
                  <p key={i} className="text-[#A08860] leading-relaxed mb-4">{para}</p>
                ))}
              </div>

              {/* Highlights (Tour 2 only) */}
              {highlights.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#F5EDD8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>{L.highlights}</h2>
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
              )}

              {/* Included */}
              <div>
                <h2 className="text-2xl font-bold text-[#F5EDD8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>{L.includes}</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-400 text-base leading-none mt-0.5">✓</span>
                      <span className="text-[#A08860] text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Available Packages */}
              <div>
                <h2 className="text-2xl font-bold text-[#F5EDD8] mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>{L.packages}</h2>
                <div className="space-y-4">
                  {tour.packages.map((p, i) => {
                    const pName = lang === 'fr' ? p.nameFr : lang === 'he' ? p.nameHe : p.name
                    const pDesc = lang === 'fr' ? p.descriptionFr : lang === 'he' ? p.descriptionHe : p.description
                    const active = selectedPkg === i
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedPkg(i)}
                        className={cn(
                          'w-full text-left p-5 rounded-sm border transition-all duration-200',
                          active
                            ? 'bg-[#D4A843]/08 border-[#D4A843]/50'
                            : 'bg-[#1C1108] border-[#D4A843]/10 hover:border-[#D4A843]/30'
                        )}
                      >
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-3">
                            {active && <div className="w-2 h-2 rounded-full bg-[#D4A843] shrink-0 mt-1" />}
                            <span className={cn('font-bold text-base', active ? 'text-[#D4A843]' : 'text-[#F5EDD8]')} style={{ fontFamily: 'var(--font-playfair)' }}>
                              {pName}
                            </span>
                          </div>
                          <span className="text-[#D4A843] font-bold text-xl shrink-0">₪{p.price}</span>
                        </div>
                        <p className="text-[#7A6245] text-sm leading-relaxed mb-3">{pDesc}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="flex items-center gap-1 text-[#7A6245] text-xs">
                            <Clock className="w-3 h-3 text-[#D4A843]" /> {p.duration}
                          </span>
                          {p.mealIncluded && (
                            <span className="text-xs bg-[#D4A843]/08 border border-[#D4A843]/20 text-[#D4A843] px-2 py-0.5 rounded-sm">🍽 {L.mealIncl}</span>
                          )}
                          {p.entryIncluded && (
                            <span className="text-xs bg-[#D4A843]/08 border border-[#D4A843]/20 text-[#D4A843] px-2 py-0.5 rounded-sm">🎟 {L.entryIncl}</span>
                          )}
                          {p.trekIncluded && (
                            <span className="text-xs bg-[#D4A843]/08 border border-[#D4A843]/20 text-[#D4A843] px-2 py-0.5 rounded-sm">🚶 {p.trekIncluded} {L.trek}</span>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
                <p className="text-[#7A6245] text-xs mt-4">{L.warning}</p>
              </div>

              {/* What to bring */}
              {whatToBring.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#F5EDD8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>{L.bring}</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {whatToBring.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#A08860] text-sm">
                        <span className="text-[#D4A843] mt-0.5">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery */}
              {tour.gallery.length > 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#F5EDD8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>{L.photos}</h2>
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

            {/* ── Booking widget ───────────────────────────────────────────── */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-[#1C1108] border border-[#D4A843]/20 rounded-sm p-6 shadow-2xl shadow-black/50">
                  {/* Selected package summary */}
                  <div className="mb-5 pb-5 border-b border-[#D4A843]/10">
                    <div className="text-[#7A6245] text-xs mb-1">{pkgName}</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[#D4A843] font-bold text-4xl leading-none" style={{ fontFamily: 'var(--font-playfair)' }}>
                        {formatPrice(pkg.price, '₪')}
                      </span>
                      <span className="text-[#7A6245] text-sm">{L.perPerson}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 text-[#7A6245] text-xs">
                      <Clock className="w-3.5 h-3.5 text-[#D4A843]" /> {pkg.duration}
                    </div>
                  </div>

                  {/* Package selector (compact) */}
                  <div className="mb-5 space-y-1.5">
                    {tour.packages.map((p, i) => {
                      const pName = lang === 'fr' ? p.nameFr : lang === 'he' ? p.nameHe : p.name
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedPkg(i)}
                          className={cn(
                            'w-full flex items-center justify-between px-3 py-2 rounded-sm text-sm transition-all',
                            selectedPkg === i
                              ? 'bg-[#D4A843]/15 border border-[#D4A843]/40 text-[#D4A843]'
                              : 'border border-[#D4A843]/10 text-[#7A6245] hover:border-[#D4A843]/30 hover:text-[#D6C9AD]'
                          )}
                        >
                          <span>{pName}</span>
                          <span className="font-semibold">₪{p.price}</span>
                        </button>
                      )
                    })}
                  </div>

                  <Link href={`/book?tour=${tour.slug}&pkg=${selectedPkg}`} className="btn-primary w-full text-center mb-3 block">
                    {L.book}
                  </Link>
                  <a
                    href="https://wa.me/972525217029"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-sm bg-[#25D366]/10 border border-[#25D366]/25 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/20 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {L.whatsapp}
                  </a>

                  <div className="mt-5 pt-5 border-t border-[#D4A843]/10 space-y-2">
                    {[L.cancel, L.confirm, L.secure].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-[#7A6245] text-xs">
                        <span className="text-green-400">✓</span>{item}
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
