"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, Sun, Moon } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { gsap } from "../lib/gsap";

export default function Navbar() {
  const { theme, toggleTheme, t } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isLight = theme === "light";

  const navRef   = useRef<HTMLElement>(null);
  const menuRef  = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaRef   = useRef<HTMLAnchorElement>(null);

  const links = [
    { label: t("nav_services"),  href: "#services"      },
    { label: t("nav_cloud"),     href: "#cloud"         },
    { label: t("nav_security"),  href: "#cybersecurity" },
    { label: t("nav_cctv"),      href: "#cctv"          },
    { label: t("nav_m365"),      href: "#m365"          },
    { label: t("nav_contact"),   href: "#contact"       },
  ];

  // Nav entrance
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
    }
  }, []);

  // Scroll + resize
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onScroll(); onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  // Mobile menu GSAP enter / exit
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(menu, { autoAlpha: 1 });
      gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });

      const items = [...linkRefs.current.filter(Boolean), ctaRef.current].filter(Boolean);
      gsap.fromTo(items,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, delay: 0.08, ease: "power2.out" });
    } else {
      document.body.style.overflow = "";
      gsap.to(menu, {
        opacity: 0, duration: 0.2,
        onComplete: () => gsap.set(menu, { autoAlpha: 0 }),
      });
    }
  }, [open]);

  const navScrolledBg = isLight ? "rgba(244,247,255,0.95)" : "rgba(6,12,24,0.92)";

  return (
    <>
      {/* Emergency bar */}
      <div style={{
        background: isLight ? "#0d1526" : "linear-gradient(90deg,#1a0a2e,#0d1b3e,#1a0a2e)",
        borderBottom: "1px solid var(--border-sub)",
        padding: "8px 0", textAlign: "center",
        fontSize: 12, color: "#8fa8c8",
        position: "sticky", top: 0, zIndex: 1000, direction: "ltr",
      }}>
        {t("emergency_bar")}{" "}
        <a href="tel:+972542167219" dir="ltr" style={{ color: "#00d4ff", fontWeight: 600, textDecoration: "none" }}>
          +972 54 216 7219
        </a>
      </div>

      {/* Nav */}
      <nav
        ref={navRef}
        style={{
          position: "sticky", top: 33, zIndex: 999,
          background: scrolled ? navScrolledBg : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "all 0.3s",
        }}
      >
        <div style={{
          maxWidth: 1400, margin: "0 auto",
          padding: "0 clamp(24px, 6vw, 100px)",
          display: "flex", alignItems: "center", justifyContent: "space-between", height: 68,
          direction: "ltr",
        }}>
          {/* Logo */}
          <a href="#" style={{
            fontFamily: "var(--font-epilogue)", fontSize: 24, fontWeight: 900, letterSpacing: "-1px",
            background: "linear-gradient(135deg,#0078d4 0%,#00b4d8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            textDecoration: "none",
          }}>RUB</a>

          {/* Desktop links */}
          {!isMobile && (
            <ul style={{ display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0 }}>
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}
                    style={{ fontSize: 13, fontWeight: 500, color: "var(--text-2)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#0078d4")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LanguageSwitcher />

            <button onClick={toggleTheme}
              aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
              style={{
                background: "var(--card-bg)", border: "1px solid var(--border)",
                borderRadius: 8, padding: "6px 8px",
                cursor: "pointer", color: "var(--text-1)",
                display: "flex", alignItems: "center", transition: "all 0.2s",
              }}>
              {isLight ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            {!isMobile && (
              <a href="#contact" style={{
                background: "linear-gradient(135deg,#0078d4,#00b4d8)",
                color: "#fff", padding: "9px 20px", borderRadius: 10,
                fontSize: 13, fontWeight: 600, textDecoration: "none",
                display: "flex", alignItems: "center", gap: 6,
                boxShadow: "0 4px 16px rgba(0,120,212,0.3)", transition: "all 0.2s",
              }}>
                {t("nav_quote")} <ChevronRight size={13} />
              </a>
            )}

            {isMobile && (
              <button onClick={() => setOpen(true)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-2)", padding: 4, display: "flex" }}>
                <Menu size={22} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu — always in DOM, shown/hidden via GSAP autoAlpha */}
      <div
        ref={menuRef}
        style={{
          position: "fixed", inset: 0, background: "var(--bg-1)", zIndex: 9999,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28,
          visibility: "hidden", opacity: 0,   // initial hidden state
        }}
      >
        <button onClick={() => setOpen(false)}
          style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "var(--text-2)", cursor: "pointer" }}>
          <X size={28} />
        </button>

        {links.map((l, i) => (
          <a
            key={l.href}
            ref={(el) => { linkRefs.current[i] = el; }}
            href={l.href}
            onClick={() => setOpen(false)}
            style={{ fontFamily: "var(--font-epilogue)", fontSize: 28, fontWeight: 900, color: "var(--text-1)", textDecoration: "none" }}
          >
            {l.label}
          </a>
        ))}

        <a
          ref={ctaRef}
          href="#contact"
          onClick={() => setOpen(false)}
          style={{ background: "linear-gradient(135deg,#0078d4,#00b4d8)", color: "#fff", padding: "14px 36px", borderRadius: 14, fontSize: 16, fontWeight: 700, textDecoration: "none", marginTop: 8 }}
        >
          {t("nav_quote")}
        </a>
      </div>
    </>
  );
}
