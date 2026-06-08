"use client";
import { useApp } from "../contexts/AppContext";
import { useState, useRef, useEffect } from "react";
import { gsap } from "../lib/gsap";
import { Phone, MessageCircle, AlertTriangle, Mail, ArrowRight, CheckCircle } from "lucide-react";

const services = ["Managed IT Services","Microsoft 365","Cloud Infrastructure","Cybersecurity","CCTV Installation","Access Control","Backup & Recovery","Network Infrastructure","Other"];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const submitRef  = useRef<HTMLButtonElement>(null);
  const [sent, setSent] = useState(false);
  const { t, theme } = useApp();
  const isLight = theme === "light";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gs-contact-label", { opacity: 0 },
        { opacity: 0.8, duration: 0.5, scrollTrigger: { trigger: ".gs-contact-label", start: "top 88%", once: true } });
      gsap.fromTo(".gs-contact-h2", { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1, scrollTrigger: { trigger: ".gs-contact-h2", start: "top 88%", once: true } });
      gsap.fromTo(".gs-contact-info", { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, scrollTrigger: { trigger: ".gs-contact-info", start: "top 88%", once: true } });
      gsap.fromTo(".gs-contact-form", { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, scrollTrigger: { trigger: ".gs-contact-form", start: "top 88%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const [sending, setSending] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSent(true);
        form.reset();
        setTimeout(() => setSent(false), 6000);
      } else {
        const json = await res.json().catch(() => ({}));
        setError((json as { error?: string }).error ?? "Submission failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ padding: "100px 0", background: "var(--bg-2)" }}>
      <div ref={sectionRef} style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }}>
        <span className="gs-contact-label" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16 }}>
          {t("contact_label")}
        </span>
        <h2 className="gs-contact-h2" style={{
          fontFamily: "var(--font-epilogue)", fontWeight: 900,
          fontSize: "clamp(34px,4.5vw,60px)", lineHeight: 1.0, letterSpacing: "-2.5px", marginBottom: 52,
          ...(isLight
            ? { color: "#0d1526", WebkitTextFillColor: "#0d1526" }
            : { background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }),
        }}>
          {t("contact_h2").split("\n").map((l, i, a) => <span key={i}>{l}{i < a.length - 1 && <br />}</span>)}
        </h2>

        <div className="rub-grid-2" style={{ alignItems: "start" }}>
          {/* Info */}
          <div className="gs-contact-info">
            <h3 style={{ fontFamily: "var(--font-epilogue)", fontWeight: 900, fontSize: 22, marginBottom: 8, color: "var(--text-1)" }}>
              {t("contact_name")} —
            </h3>
            <p style={{ color: "var(--text-2)", fontWeight: 300, marginBottom: 28, lineHeight: 1.7, fontSize: 15 }}>
              {t("contact_tagline")}
            </p>

            <div style={{
              background: "rgba(0,120,212,0.08)", border: "1px solid rgba(0,180,216,0.2)",
              backdropFilter: "blur(20px)", borderRadius: 18, padding: 24,
            }}>
              <div style={{ fontFamily: "var(--font-epilogue)", fontWeight: 900, fontSize: 19, marginBottom: 4, color: "var(--text-1)" }}>{t("contact_name")}</div>
              <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 22, textTransform: "uppercase", letterSpacing: 2 }}>{t("contact_role")}</div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { href: "tel:+972542167219",           icon: Phone,         labelKey: "contact_call",      bg: "linear-gradient(135deg,#0078d4,#00b4d8)", color: "#fff",            phoneNum: "+972 54 216 7219" },
                  { href: "https://wa.me/972542167219",  icon: MessageCircle, labelKey: "contact_whatsapp",  bg: "linear-gradient(135deg,#25d366,#128c7e)", color: "#fff" },
                  { href: "mailto:rubenuzan11@gmail.com",icon: Mail,          labelKey: "contact_email",     bg: "rgba(255,255,255,0.04)", color: "var(--text-1)", border: "1px solid rgba(0,180,216,0.25)" },
                  { href: "tel:+972542167219",           icon: AlertTriangle, labelKey: "contact_emergency", bg: "transparent", color: "#ff8080", border: "1px solid rgba(255,80,80,0.3)" },
                ].map((btn) => (
                  <a key={btn.labelKey} href={btn.href}
                    target={btn.href.startsWith("https") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    dir="ltr"
                    style={{
                      display: "flex", alignItems: "center", gap: 12, direction: "ltr",
                      background: btn.bg, border: (btn as { border?: string }).border || "none",
                      color: btn.color, fontWeight: 600, fontSize: 14,
                      padding: "13px 18px", borderRadius: 12,
                      textDecoration: "none", transition: "all 0.25s",
                    }}>
                    <btn.icon size={15} />
                    <span>{t(btn.labelKey)}</span>
                    {btn.phoneNum && (
                      <span dir="ltr" style={{ direction: "ltr", unicodeBidi: "isolate" }}>
                        {btn.phoneNum}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="gs-contact-form" style={{
            background: "var(--card-bg)", border: "1px solid var(--border)",
            backdropFilter: "blur(20px)", borderRadius: 24, padding: 36,
          }}>
            <h3 style={{ fontFamily: "var(--font-epilogue)", fontWeight: 900, fontSize: 20, marginBottom: 26, color: "var(--text-1)" }}>{t("hero_cta1")}</h3>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="rub-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {([
                  [t("form_name"),    "text",  "John Smith",        "contact-name",    "name"],
                  [t("form_company"), "text",  "Acme Corp",         "contact-company", "company"],
                  [t("form_email"),   "email", "john@company.com",  "contact-email",   "email"],
                  [t("form_phone"),   "tel",   "+972...",           "contact-phone",   "phone"],
                ] as [string,string,string,string,string][]).map(([label, type, placeholder, fieldId, fieldName]) => (
                  <div key={fieldId}>
                    <label htmlFor={fieldId} style={{ display: "block", fontSize: 12, color: "var(--text-2)", fontWeight: 500, marginBottom: 7 }}>{label}</label>
                    <input id={fieldId} name={fieldName} type={type} placeholder={placeholder}
                      autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : undefined}
                      style={{
                        width: "100%", background: "var(--input-bg)", border: "1px solid var(--border-md)",
                        borderRadius: 12, padding: "11px 14px", fontSize: 13, color: "var(--text-1)",
                        outline: "none", fontFamily: "var(--font-inter)",
                      }} />
                  </div>
                ))}
              </div>

              <div>
                <label htmlFor="contact-service" style={{ display: "block", fontSize: 12, color: "var(--text-2)", fontWeight: 500, marginBottom: 7 }}>{t("form_service")}</label>
                <select id="contact-service" name="service" style={{
                  width: "100%", background: "var(--input-bg)", border: "1px solid var(--border-md)",
                  borderRadius: 12, padding: "11px 14px", fontSize: 13, color: "var(--text-2)",
                  outline: "none", fontFamily: "var(--font-inter)",
                }}>
                  <option>{t("form_service_placeholder")}</option>
                  {services.map(s => <option key={s} style={{ background: "var(--input-bg)" }}>{s}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" style={{ display: "block", fontSize: 12, color: "var(--text-2)", fontWeight: 500, marginBottom: 7 }}>{t("form_message")}</label>
                <textarea id="contact-message" name="message" rows={4} placeholder={t("form_message")} style={{
                  width: "100%", background: "var(--input-bg)", border: "1px solid var(--border-md)",
                  borderRadius: 12, padding: "11px 14px", fontSize: 13, color: "var(--text-1)",
                  outline: "none", fontFamily: "var(--font-inter)", resize: "vertical",
                }} />
              </div>

              {error && (
                <p style={{ fontSize: 12, color: "#ff6b6b", background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.2)", borderRadius: 8, padding: "10px 14px", margin: 0 }}>
                  {error}
                </p>
              )}

              <button
                ref={submitRef}
                type="submit"
                disabled={sending || sent}
                onMouseEnter={() => !sending && !sent && gsap.to(submitRef.current, { y: -2, boxShadow: "0 16px 40px rgba(0,120,212,0.5)", duration: 0.2 })}
                onMouseLeave={() => gsap.to(submitRef.current, { y: 0,  boxShadow: "0 8px 24px rgba(0,120,212,0.3)", duration: 0.2 })}
                onMouseDown={() => gsap.to(submitRef.current, { scale: 0.98, duration: 0.1 })}
                onMouseUp={()   => gsap.to(submitRef.current, { scale: 1,    duration: 0.1 })}
                style={{
                  width: "100%", background: sent ? "linear-gradient(135deg,#00b86b,#00d488)" : "linear-gradient(135deg,#0078d4,#00b4d8)",
                  color: "#fff", border: "none", padding: "15px", borderRadius: 14,
                  fontSize: 15, fontWeight: 700, cursor: sending ? "wait" : sent ? "default" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: "0 8px 24px rgba(0,120,212,0.3)", fontFamily: "var(--font-inter)",
                  opacity: sending ? 0.75 : 1, transition: "background 0.3s",
                }}>
                {sent
                  ? <><CheckCircle size={17} /> {t("contact_sent")}</>
                  : sending
                  ? <>{t("form_submit")}…</>
                  : <>{t("form_submit")} <ArrowRight size={15} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
