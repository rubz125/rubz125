"use client";
import { useApp } from "../contexts/AppContext";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const STATS = [
  { target: 100, suffix: "+" },
  { target: 500, suffix: "+" },
  { target: 99,  suffix: "%" },
  { target: 8,   suffix: ""  },
];

function Counter({ target, suffix, isLight }: { target: number; suffix: string; isLight: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => setCount(Math.floor(obj.val)),
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    return () => { tween.kill(); };
  }, [target]);

  return (
    <span ref={ref} style={{
      fontFamily: "var(--font-epilogue)", fontWeight: 900,
      fontSize: "clamp(52px,6.5vw,84px)", lineHeight: 1, letterSpacing: "-4px",
      ...(isLight
        ? { color: "#0d1526", WebkitTextFillColor: "#0d1526" }
        : { background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }),
    }}>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, theme } = useApp();
  const isLight = theme === "light";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gs-stat",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true } },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section style={{ padding: "88px 0", borderTop: "1px solid var(--border-sub)", borderBottom: "1px solid var(--border-sub)" }}>
      <div ref={sectionRef} style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }}>
        <div className="rub-grid-4">
          {STATS.map((s, i) => (
            <div key={i} className="gs-stat">
              <Counter target={s.target} suffix={s.suffix} isLight={isLight} />
              <div style={{ fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "1.5px", marginTop: 10 }}>
                {t(`stat_${i + 1}_label`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
