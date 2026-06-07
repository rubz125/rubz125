"use client";
import { useApp } from "../contexts/AppContext";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { target: 100, suffix: "+", label: "Businesses Supported" },
  { target: 500, suffix: "+", label: "Devices Managed" },
  { target: 99, suffix: "%", label: "Uptime SLA" },
  { target: 8, suffix: " yrs", label: "Experience" },
];

function Counter({ target, suffix, isLight }: { target: number; suffix: string; isLight: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} style={{
      fontFamily: "var(--font-epilogue)", fontWeight: 900,
      fontSize: "clamp(52px,6.5vw,84px)", lineHeight: 1,
      letterSpacing: "-4px",
      background: isLight
        ? "linear-gradient(135deg,#003f88 0%,#0078d4 55%,#00a8cc 100%)"
        : "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    }}>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { theme } = useApp();
  const isLight = theme === "light";

  return (
    <section style={{ padding: "88px 0", borderTop: "1px solid var(--border-sub)", borderBottom: "1px solid var(--border-sub)" }} ref={ref}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }}>
        <div className="rub-grid-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
              <Counter target={s.target} suffix={s.suffix} isLight={isLight} />
              <div style={{ fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "1.5px", marginTop: 10 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
