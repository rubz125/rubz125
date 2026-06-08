"use client";
import { useApp } from "../contexts/AppContext";
import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "../lib/gsap";
import { Plus } from "lucide-react";

const FAQ_KEYS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function FAQ() {
  const [open, setOpen]       = useState<number | null>(null);
  const sectionRef            = useRef<HTMLDivElement>(null);
  const contentRefs           = useRef<(HTMLDivElement | null)[]>([]);
  const { t, theme } = useApp();
  const isLight = theme === "light";

  // Scroll-reveal entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gs-faq-label", { opacity: 0 },
        { opacity: 0.8, duration: 0.5, scrollTrigger: { trigger: ".gs-faq-label", start: "top 88%", once: true } });
      gsap.fromTo(".gs-faq-h2", { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1, scrollTrigger: { trigger: ".gs-faq-h2", start: "top 88%", once: true } });
      gsap.fromTo(".gs-faq-item",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out",
          scrollTrigger: { trigger: ".gs-faq-item", start: "top 88%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Accordion toggle
  const toggle = useCallback((i: number) => {
    const content = contentRefs.current[i];
    if (!content) return;

    if (open === i) {
      // Close
      gsap.to(content, { height: 0, opacity: 0, duration: 0.25, ease: "power2.in",
        onComplete: () => { content.style.overflow = "hidden"; } });
      setOpen(null);
    } else {
      // Close previously open item
      if (open !== null) {
        const prev = contentRefs.current[open];
        if (prev) gsap.to(prev, { height: 0, opacity: 0, duration: 0.2, ease: "power2.in" });
      }
      // Open new item — measure scrollHeight before animating
      content.style.overflow = "hidden";
      const h = content.scrollHeight;
      gsap.fromTo(content,
        { height: 0, opacity: 0 },
        { height: h, opacity: 1, duration: 0.35, ease: "power2.out",
          onComplete: () => { content.style.overflow = "visible"; } });
      setOpen(i);
    }
  }, [open]);

  return (
    <section id="faq" style={{ padding: "100px 0", background: "var(--bg-1)" }}>
      <div ref={sectionRef} style={{ maxWidth: 860, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }}>
        <span className="gs-faq-label" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16 }}>
          {t("faq_label")}
        </span>
        <h2 className="gs-faq-h2" style={{
          fontFamily: "var(--font-epilogue)", fontWeight: 900,
          fontSize: "clamp(32px,4vw,54px)", lineHeight: 1.0, letterSpacing: "-2px", marginBottom: 44,
          ...(isLight
            ? { color: "#0d1526", WebkitTextFillColor: "#0d1526" }
            : { background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }),
        }}>
          {t("faq_h2").split("\n").map((l, i, a) => <span key={i}>{l}{i < a.length - 1 && <br />}</span>)}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQ_KEYS.map((n, i) => (
            <div key={n} className="gs-faq-item" style={{
              background: "var(--card-bg)",
              border: `1px solid ${open === i ? "rgba(0,180,216,0.3)" : "var(--border)"}`,
              backdropFilter: "blur(20px)", borderRadius: 14, overflow: "hidden",
              transition: "border-color 0.3s",
            }}>
              <button
                onClick={() => toggle(i)}
                aria-expanded={open === i}
                style={{
                  width: "100%", padding: "18px 22px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: "none", border: "none", cursor: "pointer",
                  textAlign: "left", gap: 16,
                }}
              >
                <span style={{ fontWeight: 600, fontSize: 14, color: "var(--text-1)" }}>
                  {t(`faq_q${n}`)}
                </span>
                <span style={{
                  color: "#00d4ff", flexShrink: 0, display: "flex",
                  transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.22s ease",
                }}>
                  <Plus size={17} />
                </span>
              </button>

              {/* Content — starts hidden, GSAP animates height */}
              <div
                ref={(el) => { contentRefs.current[i] = el; }}
                style={{ height: 0, overflow: "hidden", opacity: 0 }}
              >
                <div style={{
                  padding: "0 22px 18px", fontSize: 13, color: "var(--text-2)",
                  lineHeight: 1.7, borderTop: "1px solid var(--border-sub)", paddingTop: 14,
                }}>
                  {t(`faq_a${n}`)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
