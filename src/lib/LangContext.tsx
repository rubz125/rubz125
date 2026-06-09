'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Lang, Translations } from './i18n'
import { translations } from './i18n'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LangContext = createContext<LangCtx>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved && (saved === 'en' || saved === 'fr' || saved === 'he')) {
      setLangState(saved)
      document.documentElement.setAttribute('data-lang', saved)
      document.documentElement.setAttribute('dir', saved === 'he' ? 'rtl' : 'ltr')
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
    document.documentElement.setAttribute('data-lang', l)
    document.documentElement.setAttribute('dir', l === 'he' ? 'rtl' : 'ltr')
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
