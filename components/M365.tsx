"use client";
import { useApp } from "../contexts/AppContext";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MessageSquare, Folder, Shield, Users, Globe } from "lucide-react";

const TILE_ICONS = [Mail, MessageSquare, Folder, Shield, Users, Globe];
const TILE_KEYS = [1, 2, 3, 4, 5, 6];

export default function M365() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t, theme } = useApp();
  const isLight = theme === "light";

  return (
    <section id="m365" style={{ padding: "100px 0", background: "var(--bg-2)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }} ref={ref}>
        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 0.8 } : {}}
          style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16 }}>
          {t("m365_label")}
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{
            fontFamily: "var(--font-epilogue)", fontWeight: 900,
            fontSize: "clamp(34px,4.5vw,60px)", lineHeight: 1.0, letterSpacing: "-2.5px", marginBottom: 14,
            ...(isLight
              ? { color: "#0d1526", WebkitTextFillColor: "#0d1526" }
              : { background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }),
          }}>
          {t("m365_h2").split("\n").map((l,i,a) => <span key={i}>{l}{i<a.length-1&&<br/>}</span>)}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          style={{ color: "var(--text-2)", fontSize: 17, fontWeight: 300, marginBottom: 52, maxWidth: 400 }}>
          {t("m365_sub")}
        </motion.p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
          {TILE_KEYS.map((n, i) => {
            const Icon = TILE_ICONS[i];
            return (
              <motion.div key={n}
                initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.15 + i * 0.07 }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                style={{
                  background: "rgba(0,120,212,0.07)", border: "1px solid rgba(0,120,212,0.18)",
                  borderRadius: 18, padding: "26px 28px",
                  transition: "border-color 0.3s",
                }}>
                <Icon size={26} style={{ color: "#0078d4", marginBottom: 14 }} />
                <h3 style={{ fontFamily: "var(--font-epilogue)", fontWeight: 700, fontSize: 15, marginBottom: 7, color: "var(--text-1)" }}>
                  {t(`m365_tile_${n}_title`)}
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>
                  {t(`m365_tile_${n}_desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
