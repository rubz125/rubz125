"use client";
import { useApp } from "../contexts/AppContext";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQ_KEYS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { t, theme } = useApp();
  const isLight = theme === "light";

  return (
    <section id="faq" style={{ padding: "100px 0", background: "var(--bg-1)" }} ref={ref}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }}>
        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 0.8 } : {}}
          style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16 }}>
          {t("faq_label")}
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{
            fontFamily: "var(--font-epilogue)", fontWeight: 900,
            fontSize: "clamp(32px,4vw,54px)", lineHeight: 1.0, letterSpacing: "-2px", marginBottom: 44,
            ...(isLight
              ? { color: "#0d1526", WebkitTextFillColor: "#0d1526" }
              : { background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }),
          }}>
          {t("faq_h2").split("\n").map((l,i,a) => <span key={i}>{l}{i<a.length-1&&<br/>}</span>)}
        </motion.h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQ_KEYS.map((n, i) => (
            <motion.div key={n}
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.05 }}
              style={{
                background: "var(--card-bg)",
                border: `1px solid ${open === i ? "rgba(0,180,216,0.3)" : "var(--border)"}`,
                backdropFilter: "blur(20px)", borderRadius: 14, overflow: "hidden",
                transition: "border-color 0.3s",
              }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{
                  width: "100%", padding: "18px 22px", display: "flex",
                  justifyContent: "space-between", alignItems: "center",
                  background: "none", border: "none", cursor: "pointer",
                  textAlign: "left", gap: 16,
                }}>
                <span style={{ fontWeight: 600, fontSize: 14, color: "var(--text-1)" }}>
                  {t(`faq_q${n}`)}
                </span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                  style={{ color: "#00d4ff", flexShrink: 0, display: "flex" }}>
                  <Plus size={17} />
                </motion.span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    style={{ overflow: "hidden" }}>
                    <div style={{
                      padding: "0 22px 18px", fontSize: 13, color: "var(--text-2)",
                      lineHeight: 1.7, borderTop: "1px solid var(--border-sub)", paddingTop: 14,
                    }}>
                      {t(`faq_a${n}`)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
