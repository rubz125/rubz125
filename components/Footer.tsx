"use client";
import { useApp } from "../contexts/AppContext";
import { Phone, Mail, MessageCircle } from "lucide-react";

const COL1_KEYS = [1, 2, 3, 4];
const COL2_KEYS = [1, 2, 3, 4];
const QUICK_LINKS = [
  { key: 1, href: "#contact" },
  { key: 2, href: "#faq" },
  { key: 3, href: "#cloud" },
  { key: 4, href: "#cybersecurity" },
];
const BADGE_KEYS = [1, 2, 3];

export default function Footer() {
  const { t, theme } = useApp();
  const isLight = theme === "light";

  return (
    <footer style={{ background: "var(--bg-3)", borderTop: "1px solid var(--border-sub)", padding: "60px 6% 28px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }}>
        <div className="rub-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: "var(--font-epilogue)", fontSize: 22, fontWeight: 900, marginBottom: 14,
              ...(isLight
                ? { color: "#0d1526", WebkitTextFillColor: "#0d1526" }
                : { background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }),
            }}>RUB</div>
            <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.7, maxWidth: 260, marginBottom: 18 }}>
              {t("footer_tagline")}
            </p>
            {[
              { href: "tel:+972542167219", icon: Phone, label: "+972 54 216 7219" },
              { href: "mailto:rubenuzan11@gmail.com", icon: Mail, label: "rubenuzan11@gmail.com" },
              { href: "https://wa.me/972542167219", icon: MessageCircle, label: "WhatsApp" },
            ].map(l => (
              <a key={l.label} href={l.href} target={l.href.startsWith("https") ? "_blank" : undefined} rel="noopener noreferrer"
                dir="ltr"
                style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-2)", marginBottom: 8, textDecoration: "none" }}>
                <l.icon size={13} /> {l.label}
              </a>
            ))}
          </div>

          {/* Services column */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: "var(--text-2)", marginBottom: 18 }}>
              {t("footer_col1_heading")}
            </h4>
            <ul style={{ listStyle: "none" }}>
              {COL1_KEYS.map(n => (
                <li key={n} style={{ marginBottom: 10 }}>
                  <a href="#services" style={{ fontSize: 13, color: "var(--text-3)", textDecoration: "none" }}>{t(`footer_col1_${n}`)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* More column */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: "var(--text-2)", marginBottom: 18 }}>
              {t("footer_col2_heading")}
            </h4>
            <ul style={{ listStyle: "none" }}>
              {COL2_KEYS.map(n => (
                <li key={n} style={{ marginBottom: 10 }}>
                  <a href="#services" style={{ fontSize: 13, color: "var(--text-3)", textDecoration: "none" }}>{t(`footer_col2_${n}`)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links column */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: "var(--text-2)", marginBottom: 18 }}>
              {t("footer_col3_heading")}
            </h4>
            <ul style={{ listStyle: "none" }}>
              {QUICK_LINKS.map(({ key, href }) => (
                <li key={key} style={{ marginBottom: 10 }}>
                  <a href={href} style={{ fontSize: 13, color: "var(--text-3)", textDecoration: "none" }}>{t(`footer_link${key}`)}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border-sub)", paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "var(--text-3)" }}>{t("footer_copyright")}</p>
          <div style={{ display: "flex", gap: 8 }}>
            {BADGE_KEYS.map(n => (
              <span key={n} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-md)",
                fontSize: 10, color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase",
                letterSpacing: 1, padding: "5px 12px", borderRadius: 8,
              }}>{t(`footer_badge${n}`)}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
