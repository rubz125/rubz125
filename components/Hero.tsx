"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Cloud, Monitor } from "lucide-react";
import { useApp } from "../contexts/AppContext";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.4 + 0.4,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,180,216,${0.07 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.opacity})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />;
}

const floatingBadges = [
  { icon: Shield, label: "Cybersecurity", color: "#0078d4" },
  { icon: Cloud, label: "Cloud & Azure", color: "#00b4d8" },
  { icon: Monitor, label: "24/7 Monitoring", color: "#00d4ff" },
];

const statsNums = ["24/7", "99.9%", "500+", "100+"];
const statsKeys = ["hero_stat1", "hero_stat2", "hero_stat3", "hero_stat4"];

export default function Hero() {
  const { t, theme, lang } = useApp();
  const isLight = theme === "light";
  const isRtl = lang === "he";
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--bg-1)",
      }}
    >
      {/* Background radial glows */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,120,212,0.13) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 40% 40% at 85% 50%, rgba(0,180,216,0.06) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(var(--card-bg) 1px, transparent 1px), linear-gradient(90deg, var(--card-bg) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)",
        pointerEvents: "none",
        opacity: 0.5,
      }} />

      <ParticleCanvas />

      {/* Floating badges — opposite side to text (right in LTR, left in RTL) */}
      <div className="rub-hero-badges" style={{
        position: "absolute",
        ...(isRtl ? { left: "5%" } : { right: "5%" }),
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 14,
        direction: "ltr",
      }}>
        {floatingBadges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + i * 0.15 }}
            style={{
              background: `${b.color}12`,
              border: `1px solid ${b.color}30`,
              backdropFilter: "blur(20px)",
              borderRadius: 16,
              padding: "12px 20px",
              display: "flex", alignItems: "center", gap: 10,
              animation: `float ${6 + i}s ease-in-out infinite`,
              animationDelay: `${i}s`,
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `${b.color}20`, border: `1px solid ${b.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <b.icon size={16} style={{ color: b.color }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-1)" }}>
              {b.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div style={{
        position: "relative",
        maxWidth: 1400,
        margin: "0 auto",
        padding: "120px 6% 80px",
        width: "100%",
      }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(0,120,212,0.1)", border: "1px solid rgba(0,180,216,0.25)",
            borderRadius: 100, padding: "6px 16px",
            fontSize: 12, fontWeight: 600, color: "#00d4ff",
            marginBottom: 28,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00d4ff", display: "inline-block", animation: "blink 2s infinite" }} />
          {t("hero_badge")}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          style={{
            fontFamily: "var(--font-epilogue)",
            fontSize: "clamp(52px, 7vw, 96px)",
            fontWeight: 900,
            lineHeight: 0.97,
            letterSpacing: "-4px",
            maxWidth: 820,
            ...(isLight
              ? { color: "#0d1526", WebkitTextFillColor: "#0d1526" }
              : {
                  background: "linear-gradient(135deg,#ffffff 0%,#c8e0ff 55%,#00d4ff 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }),
            marginBottom: 28,
          }}
        >
          {t("hero_h1").split("\n").map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          style={{
            color: "var(--text-2)", fontSize: "clamp(15px, 1.6vw, 18px)",
            maxWidth: 500, lineHeight: 1.8, marginBottom: 40, fontWeight: 300,
          }}
        >
          {t("hero_sub").split("\n").map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="rub-hero-btns"
          style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 60, alignItems: "center" }}
        >
          <a href="#contact" dir="ltr" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            direction: "ltr",
            background: "linear-gradient(135deg,#0078d4,#00b4d8)",
            color: "#fff", padding: "13px 28px", borderRadius: 12,
            fontSize: 15, fontWeight: 600, textDecoration: "none",
            boxShadow: "0 4px 20px rgba(0,120,212,0.35)",
          }}>
            {t("hero_cta1")} <ArrowRight size={15} />
          </a>
          <a href="tel:+972542167219" dir="ltr" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            direction: "ltr",
            background: "var(--card-bg)", border: "1px solid var(--border-md)",
            color: "var(--text-1)", padding: "13px 28px", borderRadius: 12,
            fontSize: 15, fontWeight: 600, textDecoration: "none",
          }}>
            <Phone size={15} /> {t("hero_cta2")}
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="rub-stats-bar"
          style={{
            display: "inline-grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            background: "var(--card-bg)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {statsNums.map((num, i) => (
            <div key={i} style={{ padding: "20px 28px", textAlign: "center", borderRight: i < 3 ? "1px solid var(--border-sub)" : "none" }}>
              <div style={{ fontFamily: "var(--font-epilogue)", fontSize: 26, fontWeight: 900, color: "#00d4ff", lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 10, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "1.5px", marginTop: 5 }}>{t(statsKeys[i])}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute", bottom: 36, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}
      >
        <span style={{ fontSize: 10, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "2px" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          style={{
            width: 1.5, height: 32,
            background: "linear-gradient(to bottom, #00d4ff, transparent)",
            borderRadius: 2,
          }}
        />
      </motion.div>
    </section>
  );
}
