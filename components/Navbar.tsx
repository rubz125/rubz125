"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Cloud", href: "#cloud" },
  { label: "Security", href: "#cybersecurity" },
  { label: "CCTV", href: "#cctv" },
  { label: "Microsoft 365", href: "#m365" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      {/* Emergency bar */}
      <div style={{
        background: "linear-gradient(90deg,#1a0a2e,#0d1b3e,#1a0a2e)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "8px 0",
        textAlign: "center",
        fontSize: 12,
        color: "#8fa8c8",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}>
        Emergency response. Always on. —{" "}
        <a href="tel:+97254216 7219" style={{ color: "#00d4ff", fontWeight: 600, textDecoration: "none" }}>
          +972 54 216 7219
        </a>
      </div>

      {/* Nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "sticky",
          top: 33,
          zIndex: 999,
          background: scrolled ? "rgba(6,12,24,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
          transition: "all 0.3s",
        }}
      >
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 clamp(24px, 6vw, 100px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
        }}>
          {/* Logo */}
          <a href="#" style={{
            fontFamily: "var(--font-epilogue)",
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: "-1px",
            background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textDecoration: "none",
          }}>
            RUB
          </a>

          {/* Desktop links */}
          {!isMobile && (
            <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }}>
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} style={{
                    fontSize: 13, fontWeight: 500, color: "#8fa8c8",
                    textDecoration: "none", transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#8fa8c8")}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {!isMobile && (
              <a href="#contact" style={{
                background: "linear-gradient(135deg,#0078d4,#00b4d8)",
                color: "#fff", padding: "9px 22px", borderRadius: 10,
                fontSize: 13, fontWeight: 600, textDecoration: "none",
                display: "flex", alignItems: "center", gap: 6,
                boxShadow: "0 4px 16px rgba(0,120,212,0.3)",
                transition: "all 0.2s",
              }}>
                Get Quote <ChevronRight size={13} />
              </a>
            )}

            {isMobile && (
              <button onClick={() => setOpen(true)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#8fa8c8", padding: 4, display: "flex",
              }}>
                <Menu size={22} />
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0,
              background: "#0d1526",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
            }}
          >
            <button onClick={() => setOpen(false)} style={{
              position: "absolute", top: 24, right: 24,
              background: "none", border: "none", color: "#8fa8c8",
              cursor: "pointer", fontSize: 28,
            }}>
              <X size={28} />
            </button>

            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-epilogue)",
                  fontSize: 30, fontWeight: 900,
                  color: "#fff", textDecoration: "none",
                }}
              >
                {l.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => setOpen(false)}
              style={{
                background: "linear-gradient(135deg,#0078d4,#00b4d8)",
                color: "#fff", padding: "14px 36px",
                borderRadius: 14, fontSize: 16, fontWeight: 700,
                textDecoration: "none", marginTop: 8,
              }}
            >
              Get Free Quote
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
