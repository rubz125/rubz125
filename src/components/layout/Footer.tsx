'use client'
import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'
import { EilatActionLogo } from '@/components/ui/EilatActionLogo'
import { useLang } from '@/lib/LangContext'

export function Footer() {
  const { t } = useLang()

  const tourLinks = [
    { label: t.footer_tour1, href: '/tours/decouverte-des-monts-deilat' },
    { label: t.footer_tour2, href: '/tours/a-day-of-adventures' },
    { label: t.footer_tour3, href: '/tours/emotions-et-grands-frissons' },
    { label: t.footer_tour4, href: '/tours/petra-jordanie' },
    { label: t.footer_tour5, href: '/tours/combo-voilier-jeep' },
    { label: t.footer_tour6, href: '/tours/un-diner-une-nuit-sous-les-etoiles' },
  ]

  const companyLinks = [
    { label: t.footer_about, href: '/about' },
    { label: t.footer_guides, href: '/about#guides' },
    { label: t.footer_safety, href: '/about#safety' },
    { label: t.nav_gallery, href: '/gallery' },
    { label: t.nav_reviews, href: '/#reviews' },
    { label: t.nav_contact, href: '/contact' },
  ]

  const supportLinks = [
    { label: t.footer_book, href: '/book' },
    { label: t.footer_faq, href: '/#faq' },
    { label: t.footer_cancel, href: '/contact#policy' },
    { label: t.footer_groups, href: '/contact#groups' },
  ]

  return (
    <footer className="bg-[var(--bg-footer)] border-t border-[var(--border-sm)]">
      {/* WhatsApp CTA Bar */}
      <div className="bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-surface-2)] to-[var(--bg-surface)] border-b border-[var(--border-sm)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[var(--text-2)] text-sm">
            {t.footer_questions} {t.footer_hours} <span className="text-[var(--gold)] font-semibold">{t.footer_hours_days}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+972525217029"
              className="flex items-center gap-2 px-4 py-2 rounded-sm border border-[var(--border-lg)] text-[var(--gold)] text-sm hover:bg-[var(--gold-tint-10)] transition-colors"
            >
              <Phone className="w-4 h-4" />
              +972-52-521-7029
            </a>
            <a
              href="https://wa.me/972525217029"
              className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/30 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.footer_chat}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <EilatActionLogo width={150} />
            </Link>
            <p className="text-[var(--text-4)] text-sm leading-relaxed max-w-sm mb-6">
              {t.footer_desc}
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-2 text-sm text-[var(--text-4)]">
                <MapPin className="w-4 h-4 text-[var(--gold)] mt-0.5 shrink-0" />
                <span>Eilat, Israel</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-4)]">
                <Phone className="w-4 h-4 text-[var(--gold)] shrink-0" />
                <a href="tel:+972525217029" className="hover:text-[var(--gold)] transition-colors">+972-52-521-7029</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-4)]">
                <Mail className="w-4 h-4 text-[var(--gold)] shrink-0" />
                <a href="mailto:Eilataction@gmail.com" className="hover:text-[var(--gold)] transition-colors">Eilataction@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {[
                {
                  href: 'https://www.instagram.com/eilat_action/', label: 'Instagram',
                  svg: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                },
                {
                  href: 'https://www.facebook.com/profile.php?id=100057372501662', label: 'Facebook',
                  svg: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                },
                {
                  href: '#', label: 'YouTube',
                  svg: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>
                },
              ].map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-sm border border-[var(--border-md)] flex items-center justify-center text-[var(--text-4)] hover:text-[var(--gold)] hover:border-[var(--border-2xl)] hover:bg-[var(--gold-tint-05)] transition-all duration-200"
                >
                  {svg}
                </a>
              ))}
              <a
                href="https://wa.me/972525217029"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-sm border border-[#25D366]/20 flex items-center justify-center text-[#25D366]/60 hover:text-[#25D366] hover:border-[#25D366]/50 hover:bg-[#25D366]/05 transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://www.tripadvisor.com/Attraction_Review-g293980-d12002842-Reviews-or10-Eilat_Action-Eilat_Southern_District.html"
                aria-label="TripAdvisor"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm border border-[#34E0A1]/20 flex items-center justify-center text-[#34E0A1]/60 hover:text-[#34E0A1] hover:border-[#34E0A1]/50 hover:bg-[#34E0A1]/05 transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M12.006 4.295c-2.4 0-4.8.6-6.9 1.8L3 4.5H0l3.006 3.3C1.2 9.6 0 11.7 0 14.1c0 3.9 3.006 6.9 6.9 6.9 2.1 0 4.2-.9 5.4-2.4l.9.9.9-.9c1.2 1.5 3.3 2.4 5.4 2.4 3.9 0 6.9-3 6.9-6.9 0-2.4-1.2-4.5-3.006-5.7L24 4.5h-3L18.9 6.1c-1.8-1.2-4.2-1.8-6.894-1.8zM6.9 8.7c2.1 0 3.9 1.8 3.9 3.9s-1.8 3.9-3.9 3.9-3.9-1.8-3.9-3.9 1.8-3.9 3.9-3.9zm10.2 0c2.1 0 3.9 1.8 3.9 3.9s-1.8 3.9-3.9 3.9-3.9-1.8-3.9-3.9 1.8-3.9 3.9-3.9zM6.9 10.5c-1.2 0-2.1.9-2.1 2.1s.9 2.1 2.1 2.1 2.1-.9 2.1-2.1-.9-2.1-2.1-2.1zm10.2 0c-1.2 0-2.1.9-2.1 2.1s.9 2.1 2.1 2.1 2.1-.9 2.1-2.1-.9-2.1-2.1-2.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Tours */}
          <div>
            <h3 className="text-[var(--text-1)] font-semibold text-sm uppercase tracking-[0.15em] mb-5">{t.footer_tours}</h3>
            <ul className="space-y-2.5">
              {tourLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--text-4)] text-sm hover:text-[var(--gold)] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[var(--text-1)] font-semibold text-sm uppercase tracking-[0.15em] mb-5">{t.footer_company}</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--text-4)] text-sm hover:text-[var(--gold)] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[var(--text-1)] font-semibold text-sm uppercase tracking-[0.15em] mb-5">{t.footer_support}</h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--text-4)] text-sm hover:text-[var(--gold)] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 bg-[var(--bg-bottom)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[var(--text-5)] text-xs">
            © {new Date().getFullYear()} Eilat Action. {t.footer_rights}
          </p>
          <div className="flex items-center gap-4">
            {[t.footer_privacy, t.footer_terms].map((label) => (
              <Link key={label} href="#" className="text-[var(--text-5)] text-xs hover:text-[var(--text-4)] transition-colors">
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[var(--text-5)] text-xs">
              <span>🇮🇱</span>
              <span>{t.footer_licensed}</span>
            </div>
            <span className="text-[var(--text-5)] text-xs">@RubenUzan</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
