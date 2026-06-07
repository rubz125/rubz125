'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { EilatActionLogo } from '@/components/ui/EilatActionLogo'
import { useLang } from '@/lib/LangContext'
import type { Lang } from '@/lib/i18n'

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'he', label: 'עב', flag: '🇮🇱' },
]

export function Navbar() {
  const { t, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const navLinks = [
    {
      label: t.nav_tours,
      href: '/tours',
      children: [
        {
          label: lang === 'fr' ? "Découverte des Monts d'Eilat" : lang === 'he' ? 'גילוי הרי אילת' : "Discovering the Eilat Mountains",
          href: '/tours/decouverte-des-monts-deilat',
        },
        { label: t.nav_view_all, href: '/tours' },
      ],
    },
    { label: t.nav_about, href: '/about' },
    { label: t.nav_gallery, href: '/#gallery' },
    { label: t.nav_reviews, href: '/#reviews' },
    { label: t.nav_contact, href: '/contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        dir={lang === 'he' ? 'rtl' : 'ltr'}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0603]/95 backdrop-blur-xl border-b border-[#D4A843]/10 shadow-2xl shadow-black/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <EilatActionLogo width={130} className="transition-opacity duration-200 group-hover:opacity-80" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                    <button className="flex items-center gap-1 text-[#D6C9AD] hover:text-[#D4A843] transition-colors duration-200 text-sm font-medium tracking-wide">
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-[#1C1108]/95 backdrop-blur-xl border border-[#D4A843]/15 rounded-sm shadow-2xl shadow-black/60 overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <Link key={child.href} href={child.href} className="block px-4 py-3 text-sm text-[#D6C9AD] hover:text-[#D4A843] hover:bg-[#D4A843]/05 transition-all duration-150 border-b border-white/5 last:border-0">
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link key={link.label} href={link.href} className="text-[#D6C9AD] hover:text-[#D4A843] transition-colors duration-200 text-sm font-medium tracking-wide">
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* Desktop right */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language switcher */}
              <div className="relative" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
                <button className="flex items-center gap-1.5 text-[#D6C9AD] hover:text-[#D4A843] transition-colors text-sm font-medium px-2 py-1 rounded-sm border border-transparent hover:border-[#D4A843]/30">
                  {LANGS.find(l => l.code === lang)?.flag} {LANGS.find(l => l.code === lang)?.label}
                  <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.12 }}
                      className="absolute top-full right-0 mt-1 w-28 bg-[#1C1108]/95 backdrop-blur-xl border border-[#D4A843]/15 rounded-sm shadow-xl overflow-hidden"
                    >
                      {LANGS.map((l) => (
                        <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false) }}
                          className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-colors ${lang === l.code ? 'text-[#D4A843] bg-[#D4A843]/08' : 'text-[#D6C9AD] hover:text-[#D4A843] hover:bg-[#D4A843]/05'}`}>
                          {l.flag} {l.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="tel:+972525217029" className="flex items-center gap-2 text-[#D6C9AD] hover:text-[#D4A843] transition-colors duration-200 text-sm">
                <Phone className="w-4 h-4" />
                <span>+972-52-521-7029</span>
              </a>
              <Link href="/book" className="btn-primary text-sm py-2.5 px-5">{t.nav_book}</Link>
            </div>

            {/* Mobile button */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-[#D6C9AD] hover:text-[#D4A843] transition-colors" aria-label="Toggle menu">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#1C1108] border-l border-[#D4A843]/15 flex flex-col shadow-2xl">
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <EilatActionLogo width={110} />
                <button onClick={() => setMobileOpen(false)} className="p-2 text-[#D6C9AD] hover:text-[#D4A843]"><X className="w-5 h-5" /></button>
              </div>

              {/* Language switcher mobile */}
              <div className="flex gap-2 px-6 pt-5">
                {LANGS.map((l) => (
                  <button key={l.code} onClick={() => setLang(l.code)}
                    className={`flex-1 py-2 rounded-sm text-sm font-medium transition-colors ${lang === l.code ? 'bg-[#D4A843] text-[#0A0603]' : 'border border-[#D4A843]/20 text-[#7A6245] hover:text-[#D4A843]'}`}>
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>

              <nav className="flex-1 px-6 py-6 overflow-y-auto space-y-1">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <Link href={link.href} onClick={() => setMobileOpen(false)} className="block py-3 text-[#D6C9AD] hover:text-[#D4A843] text-lg font-medium border-b border-white/5 transition-colors">
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="pl-4 space-y-1 mt-1 mb-2">
                        {link.children.slice(0, 4).map((child) => (
                          <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-[#7A6245] hover:text-[#D4A843] transition-colors">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="p-6 space-y-3 border-t border-white/10">
                <a href="https://wa.me/972525217029" className="flex items-center justify-center gap-2 w-full py-3 rounded-sm bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-medium text-sm hover:bg-[#25D366]/30 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <Link href="/book" onClick={() => setMobileOpen(false)} className="btn-primary w-full text-center block">{t.nav_book}</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
