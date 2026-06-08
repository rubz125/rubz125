"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "../lib/translations";

export type Theme = "dark" | "light";
export type Lang = "en" | "fr" | "he";

interface AppCtx {
  theme: Theme;
  lang: Lang;
  toggleTheme: () => void;
  setLang: (l: Lang) => void;
  toggleLang: () => void; // legacy 2-way toggle kept for compatibility
  t: (key: string) => string;
}

const AppContext = createContext<AppCtx>({} as AppCtx);
export const useApp = () => useContext(AppContext);

/** Detect browser preferred language and map to a supported Lang */
function detectBrowserLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  const nav = navigator.language || "";
  if (nav.startsWith("he")) return "he";
  if (nav.startsWith("fr")) return "fr";
  return "en";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [lang, setLangState] = useState<Lang>("en");

  // Restore preferences from localStorage on mount; fall back to browser lang
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("rub-theme") as Theme | null;
      const savedLang  = localStorage.getItem("rub-lang")  as Lang  | null;

      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      }
      if (savedLang === "en" || savedLang === "fr" || savedLang === "he") {
        setLangState(savedLang);
      } else {
        // First visit — use browser language
        setLangState(detectBrowserLang());
      }
    } catch {
      setLangState(detectBrowserLang());
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("rub-theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    const isRtl = lang === "he";
    document.documentElement.setAttribute("dir",  isRtl ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem("rub-lang", lang); } catch {}
  }, [lang]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  // Cycle: en → fr → he → en
  const toggleLang = () => setLangState(l => l === "en" ? "fr" : l === "fr" ? "he" : "en");

  const setLang = (l: Lang) => setLangState(l);

  const t = (key: string): string => {
    const val = translations[lang]?.[key];
    return val ?? translations["en"][key] ?? key;
  };

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, toggleLang, setLang, t }}>
      {children}
    </AppContext.Provider>
  );
}
