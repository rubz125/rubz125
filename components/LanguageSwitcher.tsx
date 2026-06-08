"use client";

/**
 * LanguageSwitcher — dropdown language selector for the Navbar.
 *
 * To add a new language:
 *  1. Add its code to the Lang type in contexts/AppContext.tsx
 *  2. Add its translations block to lib/translations.ts
 *  3. Add a new entry to the LANGS array below
 */

import { useState, useRef, useEffect } from "react";
import { useApp, type Lang } from "../contexts/AppContext";
import { ChevronDown } from "lucide-react";

export const LANGS: { code: Lang; label: string; nativeLabel: string; flag: string }[] = [
  { code: "en", label: "EN", nativeLabel: "English",  flag: "🇬🇧" },
  { code: "fr", label: "FR", nativeLabel: "Français", flag: "🇫🇷" },
  { code: "he", label: "עב", nativeLabel: "עברית",    flag: "🇮🇱" },
];

export default function LanguageSwitcher() {
  const { lang, setLang, theme } = useApp();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLight = theme === "light";

  const current = LANGS.find(l => l.code === lang) ?? LANGS[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.nativeLabel}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          background: open
            ? (isLight ? "rgba(0,120,212,0.12)" : "rgba(0,120,212,0.15)")
            : "var(--card-bg)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "6px 10px",
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
          color: "var(--text-1)",
          transition: "all 0.2s",
          fontFamily: "var(--font-inter)",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: 13 }}>{current.flag}</span>
        <span>{current.label}</span>
        <ChevronDown
          size={11}
          style={{
            opacity: 0.6,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            // In RTL (Hebrew), open toward the right; otherwise toward the left
            right: 0,
            minWidth: 150,
            background: isLight ? "rgba(244,247,255,0.98)" : "rgba(13,21,38,0.98)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--border-md)",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: isLight
              ? "0 8px 32px rgba(0,60,150,0.12)"
              : "0 8px 32px rgba(0,0,0,0.5)",
            zIndex: 9999,
            direction: "ltr",
          }}
        >
          {LANGS.map(l => {
            const isActive = l.code === lang;
            return (
              <button
                key={l.code}
                role="option"
                aria-selected={isActive}
                onClick={() => { setLang(l.code); setOpen(false); }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  background: isActive
                    ? "rgba(0,120,212,0.12)"
                    : "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--border-sub)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s",
                  fontFamily: "var(--font-inter)",
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.background = "var(--card-bg-hover)";
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: 16 }}>{l.flag}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-1)" }}>
                  {l.nativeLabel}
                </span>
                <span style={{ fontSize: 10, color: "var(--text-3)", marginLeft: "auto", fontWeight: 700 }}>
                  {l.label}
                </span>
                {isActive && (
                  <span style={{ color: "#0078d4", fontSize: 12, fontWeight: 700 }}>✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
