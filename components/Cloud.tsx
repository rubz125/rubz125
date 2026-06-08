"use client";
import { useApp } from "../contexts/AppContext";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Monitor, RefreshCw, Globe, TrendingUp, ShieldCheck } from "lucide-react";

const ITEM_ICONS = [Rocket, Monitor, RefreshCw, Globe, TrendingUp, ShieldCheck];
const ITEM_KEYS = [1, 2, 3, 4, 5, 6];
const PROVIDER_KEYS = [1, 2, 3, 4];
const PROVIDER_ICONS = ["☁️", "🔶", "🔄", "🔁"];

export default function Cloud() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t, theme } = useApp();
  const isLight = theme === "light";

  return (
    <section id="cloud" style={{ padding: "100px 0", background: "var(--bg-2)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }} ref={ref}>
        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 0.8 } : {}}
          style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16 }}>
          {t("cloud_label")}
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{
            fontFamily: "var(--font-epilogue)", fontWeight: 900,
            fontSize: "clamp(34px,4.5vw,60px)", lineHeight: 1.0, letterSpacing: "-2.5px", marginBottom: 14,
            ...(isLight
              ? { color: "#0d1526", WebkitTextFillColor: "#0d1526" }
              : { background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }),
          }}>
          {t("cloud_h2").split("\n").map((l,i,a) => <span key={i}>{l}{i<a.length-1&&<br/>}</span>)}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          style={{ color: "var(--text-2)", fontSize: 17, fontWeight: 300, marginBottom: 36, maxWidth: 420 }}>
          {t("cloud_sub")}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 44 }}>
          {PROVIDER_KEYS.map((n, i) => (
            <div key={n} style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-md)",
              backdropFilter: "blur(20px)", borderRadius: 12,
              padding: "12px 20px", display: "flex", alignItems: "center",
              gap: 10, fontSize: 14, fontWeight: 600, color: "var(--text-1)",
            }}>
              <span style={{ fontSize: 20 }}>{PROVIDER_ICONS[i]}</span> {t(`cloud_provider_${n}`)}
            </div>
          ))}
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
          {ITEM_KEYS.map((n, i) => {
            const Icon = ITEM_ICONS[i];
            return (
              <motion.div key={n}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.07 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                style={{
                  background: "var(--card-bg)", border: "1px solid var(--border)",
                  backdropFilter: "blur(20px)", borderRadius: 16, padding: "22px 24px",
                  transition: "border-color 0.3s",
                }}>
                <Icon size={22} style={{ color: "#00b4d8", marginBottom: 12 }} />
                <h4 style={{ fontFamily: "var(--font-epilogue)", fontWeight: 700, fontSize: 14, marginBottom: 7, color: "var(--text-1)" }}>
                  {t(`cloud_item_${n}_title`)}
                </h4>
                <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.55 }}>
                  {t(`cloud_item_${n}_desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
