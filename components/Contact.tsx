"use client";
import { useApp } from "../contexts/AppContext";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, MessageCircle, AlertTriangle, Mail, ArrowRight, CheckCircle } from "lucide-react";

const services = ["Managed IT Services","Microsoft 365","Cloud Infrastructure","Cybersecurity","CCTV Installation","Access Control","Backup & Recovery","Network Infrastructure","Other"];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [sent, setSent] = useState(false);
  const { t, theme } = useApp();
  const isLight = theme === "light";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" style={{ padding: "100px 0", background: "var(--bg-2)" }} ref={ref}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }}>
        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 0.8 } : {}}
          style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16 }}>
          {t("contact_label")}
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{
            fontFamily: "var(--font-epilogue)", fontWeight: 900,
            fontSize: "clamp(34px,4.5vw,60px)", lineHeight: 1.0, letterSpacing: "-2.5px", marginBottom: 52,
            background: isLight
              ? "linear-gradient(135deg,#0d1526 0%,#0078d4 60%,#00b4d8 100%)"
              : "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
          {t("contact_h2").split("\n").map((l,i,a) => <span key={i}>{l}{i<a.length-1&&<br/>}</span>)}
        </motion.h2>

        <div className="rub-grid-2" style={{ alignItems: "start" }}>
          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            <h3 style={{ fontFamily: "var(--font-epilogue)", fontWeight: 900, fontSize: 22, marginBottom: 8, color: "var(--text-1)" }}>
              {t("contact_name")} —
            </h3>
            <p style={{ color: "var(--text-2)", fontWeight: 300, marginBottom: 28, lineHeight: 1.7, fontSize: 15 }}>
              {t("contact_tagline")}
            </p>

            <div style={{
              background: "rgba(0,120,212,0.08)", border: "1px solid rgba(0,180,216,0.2)",
              backdropFilter: "blur(20px)", borderRadius: 18, padding: 24, marginBottom: 0,
            }}>
              <div style={{ fontFamily: "var(--font-epilogue)", fontWeight: 900, fontSize: 19, marginBottom: 4, color: "var(--text-1)" }}>{t("contact_name")}</div>
              <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 22, textTransform: "uppercase", letterSpacing: 2 }}>Founder & IT Director — RUB Solutions</div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { href: "tel:+972542167219", icon: Phone, labelKey: "contact_call", bg: "linear-gradient(135deg,#0078d4,#00b4d8)", color: "#fff" },
                  { href: "https://wa.me/972542167219", icon: MessageCircle, labelKey: "contact_whatsapp", bg: "linear-gradient(135deg,#25d366,#128c7e)", color: "#fff" },
                  { href: "mailto:rubenuzan11@gmail.com", icon: Mail, labelKey: "contact_email", bg: "rgba(255,255,255,0.04)", color: "var(--text-1)", border: "1px solid rgba(0,180,216,0.25)" },
                  { href: "tel:+972542167219", icon: AlertTriangle, labelKey: "contact_emergency", bg: "transparent", color: "#ff8080", border: "1px solid rgba(255,80,80,0.3)" },
                ].map((btn) => (
                  <a key={btn.labelKey} href={btn.href} target={btn.href.startsWith("https") ? "_blank" : undefined} rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      background: btn.bg, border: btn.border || "none",
                      color: btn.color, fontWeight: 600, fontSize: 14,
                      padding: "13px 18px", borderRadius: 12,
                      textDecoration: "none", transition: "all 0.25s",
                    }}>
                    <btn.icon size={15} /> {t(btn.labelKey)}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
            style={{
              background: "var(--card-bg)", border: "1px solid var(--border)",
              backdropFilter: "blur(20px)", borderRadius: 24, padding: 36,
            }}>
            <h3 style={{ fontFamily: "var(--font-epilogue)", fontWeight: 900, fontSize: 20, marginBottom: 26, color: "var(--text-1)" }}>{t("hero_cta1")}</h3>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="rub-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  [t("form_name"), "text", "John Smith"],
                  [t("form_company"), "text", "Acme Corp"],
                  [t("form_email"), "email", "john@company.com"],
                  [t("form_phone"), "tel", "+972..."],
                ].map(([label, type, placeholder]) => (
                  <div key={label}>
                    <label style={{ display: "block", fontSize: 12, color: "var(--text-2)", fontWeight: 500, marginBottom: 7 }}>{label}</label>
                    <input type={type} placeholder={placeholder} style={{
                      width: "100%", background: "var(--input-bg)", border: "1px solid var(--border-md)",
                      borderRadius: 12, padding: "11px 14px", fontSize: 13, color: "var(--text-1)",
                      outline: "none", fontFamily: "var(--font-inter)",
                    }} />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, color: "var(--text-2)", fontWeight: 500, marginBottom: 7 }}>{t("form_service")}</label>
                <select style={{
                  width: "100%", background: "var(--input-bg)", border: "1px solid var(--border-md)",
                  borderRadius: 12, padding: "11px 14px", fontSize: 13, color: "var(--text-2)",
                  outline: "none", fontFamily: "var(--font-inter)",
                }}>
                  <option>{t("form_service_placeholder")}</option>
                  {services.map(s => <option key={s} style={{ background: "var(--input-bg)" }}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, color: "var(--text-2)", fontWeight: 500, marginBottom: 7 }}>{t("form_message")}</label>
                <textarea rows={4} placeholder={t("form_message")} style={{
                  width: "100%", background: "var(--input-bg)", border: "1px solid var(--border-md)",
                  borderRadius: 12, padding: "11px 14px", fontSize: 13, color: "var(--text-1)",
                  outline: "none", fontFamily: "var(--font-inter)", resize: "vertical",
                }} />
              </div>

              <motion.button type="submit"
                whileHover={{ y: -2, boxShadow: "0 16px 40px rgba(0,120,212,0.5)" }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%", background: "linear-gradient(135deg,#0078d4,#00b4d8)",
                  color: "#fff", border: "none", padding: "15px", borderRadius: 14,
                  fontSize: 15, fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: "0 8px 24px rgba(0,120,212,0.3)", fontFamily: "var(--font-inter)",
                  transition: "all 0.25s",
                }}>
                {sent
                  ? <><CheckCircle size={17} /> Message Sent!</>
                  : <>{t("form_submit")} <ArrowRight size={15} /></>}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
