"use client";
import { useApp } from "../contexts/AppContext";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Radio, Smartphone, Bot, Disc, Building } from "lucide-react";

const items = [
  { icon: Camera, title: "Camera Installation", desc: "HD/4K indoor & outdoor cameras" },
  { icon: Radio, title: "Remote Viewing", desc: "Access live feeds from anywhere" },
  { icon: Smartphone, title: "Mobile Monitoring", desc: "iOS & Android app control" },
  { icon: Bot, title: "AI Detection", desc: "Smart motion & person detection" },
  { icon: Disc, title: "Recording Systems", desc: "NVR/DVR with cloud backup" },
  { icon: Building, title: "Business Security", desc: "Multi-site & enterprise systems" },
];

export default function CCTV() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t, theme } = useApp();
  const isLight = theme === "light";

  return (
    <section id="cctv" style={{ padding: "100px 0", background: "var(--bg-1)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }} ref={ref}>
        <div className="rub-grid-2" style={{ alignItems: "start" }}>
          <div>
            <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 0.8 } : {}}
              style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16 }}>
              {t("cctv_label")}
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{
                fontFamily: "var(--font-epilogue)", fontWeight: 900,
                fontSize: "clamp(34px,4.5vw,60px)", lineHeight: 1.0, letterSpacing: "-2.5px", marginBottom: 14,
                background: isLight
                  ? "linear-gradient(135deg,#0d1526 0%,#0078d4 60%,#00b4d8 100%)"
                  : "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
              {t("cctv_h2").split("\n").map((l,i,a) => <span key={i}>{l}{i<a.length-1&&<br/>}</span>)}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
              style={{ color: "var(--text-2)", fontSize: 17, fontWeight: 300, marginBottom: 36, maxWidth: 420 }}>
              {t("cctv_sub")}
            </motion.p>

            <div className="rub-cctv-items" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {items.map((item, i) => (
                <motion.div key={item.title}
                  initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.07 }}
                  style={{
                    background: "var(--card-bg)", border: "1px solid var(--border)",
                    backdropFilter: "blur(20px)", borderRadius: 14, padding: "16px 18px",
                    display: "flex", alignItems: "flex-start", gap: 12,
                    transition: "border-color 0.3s",
                  }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    background: "rgba(0,120,212,0.1)", border: "1px solid rgba(0,180,216,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <item.icon size={16} style={{ color: "#00b4d8" }} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--font-epilogue)", fontWeight: 700, fontSize: 13, marginBottom: 3, color: "var(--text-1)" }}>{item.title}</h4>
                    <p style={{ fontSize: 12, color: "var(--text-3)" }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Camera UI visual */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              background: "var(--card-bg)", border: "1px solid var(--border)",
              backdropFilter: "blur(20px)", borderRadius: 24, padding: 24,
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: 2 }}>{t("cctv_live")}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00e676", boxShadow: "0 0 8px #00e676" }} />
                <span style={{ fontSize: 11, color: "#00e676", fontWeight: 600 }}>{t("cctv_online")}</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {["Entrance", "Parking", "Office", "Server Room"].map((label) => (
                <div key={label} style={{
                  aspectRatio: "16/9", borderRadius: 10, position: "relative", overflow: "hidden",
                  background: "linear-gradient(135deg,#132034,#152640)",
                }}>
                  <div style={{
                    position: "absolute", inset: 0, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    opacity: 0.15,
                  }}>
                    <Camera size={20} color="#00d4ff" />
                  </div>
                  {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
                    <div key={`${v}${h}`} style={{
                      position: "absolute",
                      [v]: 6, [h]: 6,
                      width: 10, height: 10,
                      borderTop: v === "top" ? "1.5px solid rgba(0,212,255,0.4)" : "none",
                      borderBottom: v === "bottom" ? "1.5px solid rgba(0,212,255,0.4)" : "none",
                      borderLeft: h === "left" ? "1.5px solid rgba(0,212,255,0.4)" : "none",
                      borderRight: h === "right" ? "1.5px solid rgba(0,212,255,0.4)" : "none",
                    }} />
                  ))}
                  <div style={{ position: "absolute", top: 5, right: 7, display: "flex", alignItems: "center", gap: 3 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#ff3333", animation: "blink 1.5s infinite" }} />
                    <span style={{ fontSize: 8, color: "#ff6666", fontWeight: 700 }}>REC</span>
                  </div>
                  <div style={{ position: "absolute", bottom: 5, left: 7, fontSize: 9, color: "rgba(0,212,255,0.6)", fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{
              background: "rgba(0,120,212,0.08)", border: "1px solid rgba(0,180,216,0.2)",
              borderRadius: 12, padding: "10px 14px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00e676" }} />
                <span style={{ fontSize: 12, color: "var(--text-2)" }}>All systems operational</span>
              </div>
              <span style={{ fontSize: 11, color: "var(--text-3)" }}>Recording 24/7</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
