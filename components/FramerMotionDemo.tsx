"use client";

/**
 * FramerMotionDemo — confirms framer-motion is working correctly.
 *
 * Demonstrates:
 *  • motion.div  — fade + slide in on mount
 *  • whileHover  — lift + glow on hover
 *  • whileTap    — press feedback
 *  • useInView   — counter animates when scrolled into view
 *  • AnimatePresence — smooth toggle mount/unmount
 *  • staggerChildren — list items reveal in sequence
 */

import { motion, AnimatePresence, useInView, animate, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ── Animated counter ── */
function Counter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return ctrl.stop;
  }, [inView, target]);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: 40,
          fontWeight: 900,
          fontFamily: "var(--font-epilogue)",
          background: "linear-gradient(135deg,#0078d4,#00d4ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {display.toLocaleString()}
        <span style={{ WebkitTextFillColor: "#00d4ff", fontSize: 28 }}>+</span>
      </div>
      <div style={{ fontSize: 12, color: "var(--text-2)", fontWeight: 500, textTransform: "uppercase", letterSpacing: 2 }}>
        {label}
      </div>
    </div>
  );
}

/* ── List item ── */
const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden:  { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const features = [
  "Smooth enter/exit animations via AnimatePresence",
  "Scroll-triggered counters with useInView",
  "Staggered list reveals with variants",
  "Hover lift & glow with whileHover",
  "Press feedback with whileTap",
  "Spring physics for natural motion",
];

/* ── Main demo ── */
export default function FramerMotionDemo() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section
      style={{
        padding: "80px clamp(24px, 6vw, 100px)",
        background: "var(--bg-2)",
        fontFamily: "var(--font-inter)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          style={{ marginBottom: 48, textAlign: "center" }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 4,
              color: "#00d4ff",
              marginBottom: 14,
            }}
          >
            framer-motion v12.40.0
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              fontFamily: "var(--font-epilogue)",
              fontWeight: 900,
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: "-2px",
              color: "var(--text-1)",
              marginBottom: 12,
            }}
          >
            Framer Motion Works ✓
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{ color: "var(--text-2)", fontSize: 16, fontWeight: 300 }}
          >
            All animation primitives verified below.
          </motion.p>
        </motion.div>

        {/* Hover / tap card */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <motion.div
            whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(0,120,212,0.35)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-md)",
              borderRadius: 20,
              padding: "28px 36px",
              cursor: "pointer",
              maxWidth: 380,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 10 }}>🚀</div>
            <div style={{ fontFamily: "var(--font-epilogue)", fontWeight: 800, fontSize: 18, color: "var(--text-1)", marginBottom: 6 }}>
              Hover &amp; Tap Me
            </div>
            <div style={{ fontSize: 13, color: "var(--text-2)" }}>
              Spring physics • whileHover • whileTap
            </div>
          </motion.div>
        </div>

        {/* Animated counters */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 48 }}>
          <Counter target={500} label="Devices" />
          <Counter target={100} label="Businesses" />
          <Counter target={9999} label="Uptime %" />
          <Counter target={24} label="Support hrs" />
        </div>

        {/* Toggle with AnimatePresence */}
        <div style={{ marginBottom: 40 }}>
          <motion.button
            onClick={() => setShowDetails((v) => !v)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "block",
              margin: "0 auto 24px",
              background: showDetails
                ? "rgba(0,120,212,0.12)"
                : "linear-gradient(135deg,#0078d4,#00b4d8)",
              color: showDetails ? "var(--text-1)" : "#fff",
              border: showDetails ? "1px solid rgba(0,120,212,0.3)" : "none",
              borderRadius: 12,
              padding: "12px 28px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-inter)",
            }}
          >
            {showDetails ? "Hide Details" : "Show Features (AnimatePresence)"}
          </motion.button>

          <AnimatePresence>
            {showDetails && (
              <motion.ul
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, height: 0, transition: { duration: 0.25 } }}
                style={{
                  listStyle: "none",
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: "20px 24px",
                  overflow: "hidden",
                }}
              >
                {features.map((feat) => (
                  <motion.li
                    key={feat}
                    variants={itemVariants}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 14,
                      color: "var(--text-1)",
                      padding: "8px 0",
                      borderBottom: "1px solid var(--border-sub)",
                    }}
                  >
                    <span style={{ color: "#0078d4", flexShrink: 0, fontWeight: 700 }}>→</span>
                    {feat}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Version badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: "center", fontSize: 12, color: "var(--text-3)" }}
        >
          framer-motion 12.40.0 · React 19 · Next.js 16
        </motion.div>

      </div>
    </section>
  );
}
