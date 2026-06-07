"use client";
import { useApp } from "../contexts/AppContext";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Search, Mail, Eye, HardDrive, Lock } from "lucide-react";

const items = [
  { icon: Shield, title: "Antivirus / EDR", desc: "Next-gen endpoint detection and response", color: "#0078d4" },
  { icon: Search, title: "Threat Detection", desc: "AI-powered threat hunting and real-time alerts", color: "#00b4d8" },
  { icon: Mail, title: "Email Security", desc: "Anti-phishing, spam and malware filters", color: "#00d4ff" },
  { icon: Eye, title: "24/7 Monitoring", desc: "Continuous SIEM and log monitoring", color: "#0078d4" },
  { icon: HardDrive, title: "Backup Protection", desc: "Ransomware-proof immutable backups", color: "#00b4d8" },
  { icon: Lock, title: "Zero Trust", desc: "Identity-first security architecture", color: "#00d4ff" },
];

function Radar() {
  return (
    <div style={{ position: "relative", width: 280, height: 280, margin: "0 auto" }}>
      {[1, 0.72, 0.44].map((scale, i) => (
        <div key={i} style={{
          position: "absolute",
          borderRadius: "50%",
          border: "1px solid rgba(0,212,255,0.12)",
          inset: `${(1 - scale) * 50}%`,
        }} />
      ))}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "conic-gradient(from 0deg, transparent 0%, rgba(0,212,255,0.12) 30%, transparent 35%)",
        animation: "radar 3.5s linear infinite",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
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
          animation: `blink 2s infinite`, animationDelay: `${i * 0.5}s`,
          ...pos,
        }} />
      ))}
    </div>
  );
}

export default function Cybersecurity() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t, theme } = useApp();
  const isLight = theme === "light";

  return (
    <section id="cybersecurity" style={{
      padding: "100px 0",
      background: "var(--bg-1)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(0,212,255,0.05) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }} ref={ref}>
        <div className="rub-grid-2" style={{ alignItems: "center" }}>
          <div>
            <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 0.8 } : {}}
              style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16 }}>
              {t("cyber_label")}
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{
                fontFamily: "var(--font-epilogue)", fontWeight: 900,
                fontSize: "clamp(34px,4.5vw,60px)", lineHeight: 1.0, letterSpacing: "-2.5px", marginBottom: 14,
                background: isLight
                  ? "linear-gradient(135deg,#003f88 0%,#0078d4 55%,#00a8cc 100%)"
                  : "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
              {t("cyber_h2").split("\n").map((l,i,a) => <span key={i}>{l}{i<a.length-1&&<br/>}</span>)}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
              style={{ color: "var(--text-2)", fontSize: 17, fontWeight: 300, marginBottom: 36, maxWidth: 420 }}>
              {t("cyber_sub")}
            </motion.p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {items.map((item, i) => (
                <motion.div key={item.title}
                  initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.07 }}
                  style={{
                    background: "rgba(0,120,212,0.07)", border: "1px solid rgba(0,180,216,0.18)",
                    borderRadius: 14, padding: "18px 20px",
                    transition: "border-color 0.3s, transform 0.3s",
                  }}>
                  <item.icon size={18} style={{ color: item.color, marginBottom: 10 }} />
                  <h4 style={{ fontFamily: "var(--font-epilogue)", fontWeight: 700, fontSize: 13, marginBottom: 5, color: "var(--text-1)" }}>{item.title}</h4>
                  <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.5 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3, duration: 0.7 }}>
            <Radar />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
