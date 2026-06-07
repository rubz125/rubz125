'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
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
  const [lang, setLang] = useState<Lang>('en')
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
