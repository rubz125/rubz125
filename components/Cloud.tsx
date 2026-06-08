"use client";
import { useApp } from "../contexts/AppContext";
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { Rocket, Monitor, RefreshCw, Globe, TrendingUp, ShieldCheck } from "lucide-react";

const ITEM_ICONS    = [Rocket, Monitor, RefreshCw, Globe, TrendingUp, ShieldCheck];
const ITEM_KEYS     = [1, 2, 3, 4, 5, 6];
const PROVIDER_KEYS = [1, 2, 3, 4];
const PROVIDER_ICONS = ["☁️", "🔶", "🔄", "🔁"];

export default function Cloud() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, theme } = useApp();
  const isLight = theme === "light";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gs-cloud-label", { opacity: 0 },
        { opacity: 0.8, duration: 0.5, scrollTrigger: { trigger: ".gs-cloud-label", start: "top 88%", once: true } });
      gsap.fromTo(".gs-cloud-h2", { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1, scrollTrigger: { trigger: ".gs-cloud-h2", start: "top 88%", once: true } });
      gsap.fromTo(".gs-cloud-sub", { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.2, scrollTrigger: { trigger: ".gs-cloud-sub", start: "top 88%", once: true } });
      gsap.fromTo(".gs-cloud-providers", { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.25, scrollTrigger: { trigger: ".gs-cloud-providers", start: "top 88%", once: true } });
      gsap.fromTo(".gs-cloud-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: ".gs-cloud-item", start: "top 88%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="cloud" style={{ padding: "100px 0", background: "var(--bg-2)" }}>
      <div ref={sectionRef} style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }}>
        <span className="gs-cloud-label" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16 }}>
          {t("cloud_label")}
        </span>
        <h2 className="gs-cloud-h2" style={{
          fontFamily: "var(--font-epilogue)", fontWeight: 900,
          fontSize: "clamp(34px,4.5vw,60px)", lineHeight: 1.0, letterSpacing: "-2.5px", marginBottom: 14,
          ...(isLight
            ? { color: "#0d1526", WebkitTextFillColor: "#0d1526" }
            : { background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }),
        }}>
          {t("cloud_h2").split("\n").map((l, i, a) => <span key={i}>{l}{i < a.length - 1 && <br />}</span>)}
        </h2>
        <p className="gs-cloud-sub" style={{ color: "var(--text-2)", fontSize: 17, fontWeight: 300, marginBottom: 36, maxWidth: 420 }}>
          {t("cloud_sub")}
        </p>

        <div className="gs-cloud-providers" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 44 }}>
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
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
          {ITEM_KEYS.map((n, i) => {
            const Icon = ITEM_ICONS[i];
            return (
              <div
                key={n}
                className="gs-cloud-item"
                onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -4, duration: 0.25, ease: "power2.out" })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0,  duration: 0.25, ease: "power2.out" })}
                style={{
                  background: "var(--card-bg)", border: "1px solid var(--border)",
                  backdropFilter: "blur(20px)", borderRadius: 16, padding: "22px 24px",
                  transition: "border-color 0.3s",
                }}
              >
                <Icon size={22} style={{ color: "#00b4d8", marginBottom: 12 }} />
                <h4 style={{ fontFamily: "var(--font-epilogue)", fontWeight: 700, fontSize: 14, marginBottom: 7, color: "var(--text-1)" }}>
                  {t(`cloud_item_${n}_title`)}
                </h4>
                <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.55 }}>
                  {t(`cloud_item_${n}_desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
