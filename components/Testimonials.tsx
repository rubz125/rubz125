"use client";
import { useApp } from "../contexts/AppContext";
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

const TESTIMONIAL_KEYS = [1, 2, 3];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, theme } = useApp();
  const isLight = theme === "light";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gs-test-label", { opacity: 0 },
        { opacity: 0.8, duration: 0.5, scrollTrigger: { trigger: ".gs-test-label", start: "top 88%", once: true } });
      gsap.fromTo(".gs-test-h2", { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1, scrollTrigger: { trigger: ".gs-test-h2", start: "top 88%", once: true } });
      gsap.fromTo(".gs-test-card",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".gs-test-card", start: "top 88%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section style={{ padding: "100px 0", background: "var(--bg-2)" }}>
      <div ref={sectionRef} style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }}>
        <span className="gs-test-label" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16 }}>
          {t("testimonials_label")}
        </span>
        <h2 className="gs-test-h2" style={{
          fontFamily: "var(--font-epilogue)", fontWeight: 900,
          fontSize: "clamp(34px,4.5vw,60px)", lineHeight: 1.0, letterSpacing: "-2.5px", marginBottom: 52,
          ...(isLight
            ? { color: "#0d1526", WebkitTextFillColor: "#0d1526" }
            : { background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }),
        }}>
          {t("testimonials_h2")}
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 18 }}>
          {TESTIMONIAL_KEYS.map((n) => (
            <div
              key={n}
              className="gs-test-card"
              onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -6, duration: 0.28, ease: "power2.out" })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0,  duration: 0.28, ease: "power2.out" })}
              style={{
                background: "var(--card-bg)", border: "1px solid var(--border)",
                backdropFilter: "blur(20px)", borderRadius: 20, padding: 32,
                transition: "border-color 0.3s",
              }}
            >
              <div style={{ color: "#ffd700", fontSize: 13, letterSpacing: 3, marginBottom: 14 }}>★★★★★</div>
              <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 20, fontStyle: "italic" }}>
                &ldquo;{t(`testimonial_${n}_text`)}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: "linear-gradient(135deg,#0078d4,#00b4d8)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 13, color: "#fff",
                }}>{t(`testimonial_${n}_initials`)}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-1)" }}>
                    {t(`testimonial_${n}_name`)}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-3)" }}>
                    {t(`testimonial_${n}_role`)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
