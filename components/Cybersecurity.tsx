"use client";
import { useApp } from "../contexts/AppContext";
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { Shield, Search, Mail, Eye, HardDrive, Lock } from "lucide-react";

const ITEM_ICONS  = [Shield, Search, Mail, Eye, HardDrive, Lock];
const ITEM_COLORS = ["#0078d4", "#00b4d8", "#00d4ff", "#0078d4", "#00b4d8", "#00d4ff"];
const ITEM_KEYS   = [1, 2, 3, 4, 5, 6];

function Radar() {
  return (
    <div style={{ position: "relative", width: 280, height: 280, margin: "0 auto" }}>
      {[1, 0.72, 0.44].map((scale, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%",
          border: "1px solid rgba(0,212,255,0.12)",
          inset: `${(1 - scale) * 50}%`,
        }} />
      ))}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "conic-gradient(from 0deg, transparent 0%, rgba(0,212,255,0.12) 30%, transparent 35%)",
        animation: "radar 3.5s linear infinite",
      }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%",
          background: "rgba(0,120,212,0.15)", border: "1.5px solid rgba(0,212,255,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, zIndex: 1,
        }}>🛡️</div>
      </div>
      {[{ top: "18%", left: "62%" }, { top: "65%", left: "22%" }, { top: "38%", left: "80%" }, { top: "72%", left: "55%" }].map((pos, i) => (
        <div key={i} style={{
          position: "absolute", width: 9, height: 9, borderRadius: "50%",
          background: "#00d4ff", boxShadow: "0 0 10px #00d4ff",
          animation: "blink 2s infinite", animationDelay: `${i * 0.5}s`,
          ...pos,
        }} />
      ))}
    </div>
  );
}

export default function Cybersecurity() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const radarRef   = useRef<HTMLDivElement>(null);
  const { t, theme } = useApp();
  const isLight = theme === "light";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gs-cyber-label", { opacity: 0 },
        { opacity: 0.8, duration: 0.5, scrollTrigger: { trigger: ".gs-cyber-label", start: "top 88%", once: true } });
      gsap.fromTo(".gs-cyber-h2", { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1, scrollTrigger: { trigger: ".gs-cyber-h2", start: "top 88%", once: true } });
      gsap.fromTo(".gs-cyber-sub", { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.2, scrollTrigger: { trigger: ".gs-cyber-sub", start: "top 88%", once: true } });
      gsap.fromTo(".gs-cyber-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: ".gs-cyber-item", start: "top 88%", once: true } });
    }, sectionRef);

    if (radarRef.current) {
      gsap.fromTo(radarRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.7, delay: 0.3, ease: "power2.out",
          scrollTrigger: { trigger: radarRef.current, start: "top 88%", once: true } });
    }

    return () => ctx.revert();
  }, []);

  return (
    <section id="cybersecurity" style={{ padding: "100px 0", background: "var(--bg-1)", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(0,212,255,0.05) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      <div ref={sectionRef} style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }}>
        <div className="rub-grid-2" style={{ alignItems: "center" }}>
          <div>
            <span className="gs-cyber-label" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16 }}>
              {t("cyber_label")}
            </span>
            <h2 className="gs-cyber-h2" style={{
              fontFamily: "var(--font-epilogue)", fontWeight: 900,
              fontSize: "clamp(34px,4.5vw,60px)", lineHeight: 1.0, letterSpacing: "-2.5px", marginBottom: 14,
              ...(isLight
                ? { color: "#0d1526", WebkitTextFillColor: "#0d1526" }
                : { background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }),
            }}>
              {t("cyber_h2").split("\n").map((l, i, a) => <span key={i}>{l}{i < a.length - 1 && <br />}</span>)}
            </h2>
            <p className="gs-cyber-sub" style={{ color: "var(--text-2)", fontSize: 17, fontWeight: 300, marginBottom: 36, maxWidth: 420 }}>
              {t("cyber_sub")}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {ITEM_KEYS.map((n, i) => {
                const Icon  = ITEM_ICONS[i];
                const color = ITEM_COLORS[i];
                return (
                  <div key={n} className="gs-cyber-item" style={{
                    background: "rgba(0,120,212,0.07)", border: "1px solid rgba(0,180,216,0.18)",
                    borderRadius: 14, padding: "18px 20px",
                    transition: "border-color 0.3s, transform 0.3s",
                  }}>
                    <Icon size={18} style={{ color, marginBottom: 10 }} />
                    <h4 style={{ fontFamily: "var(--font-epilogue)", fontWeight: 700, fontSize: 13, marginBottom: 5, color: "var(--text-1)" }}>
                      {t(`cyber_item_${n}_title`)}
                    </h4>
                    <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.5 }}>
                      {t(`cyber_item_${n}_desc`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div ref={radarRef}>
            <Radar />
          </div>
        </div>
      </div>
    </section>
  );
}
