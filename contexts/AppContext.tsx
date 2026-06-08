"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";
type Lang = "en" | "he";

interface AppCtx {
  theme: Theme;
  lang: Lang;
  toggleTheme: () => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppCtx>({} as AppCtx);
export const useApp = () => useContext(AppContext);

import { translations } from "../lib/translations";

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [lang, setLang] = useState<Lang>("en");

  // Restore preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("rub-theme") as Theme | null;
      const savedLang = localStorage.getItem("rub-lang") as Lang | null;
      if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
      if (savedLang === "en" || savedLang === "he") setLang(savedLang);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("rub-theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("dir", lang === "he" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem("rub-lang", lang); } catch {}
  }, [lang]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");
  const toggleLang = () => setLang(l => l === "en" ? "he" : "en");

  const t = (key: string) => {
    const val = translations[lang]?.[key];
    return val ?? translations["en"][key] ?? key;
  };

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t }}>
      {children}
    </AppContext.Provider>
  );
}
