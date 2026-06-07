"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  { initials: "DK", name: "David K.", role: "CEO, Tech Startup — Tel Aviv", text: "RUB transformed our entire IT infrastructure. Ruben migrated us to Azure, set up Microsoft 365, and now we have zero downtime. Best investment we made." },
  { initials: "SL", name: "Sara L.", role: "COO, Law Firm — Jerusalem", text: "After a ransomware scare, RUB overhauled our cybersecurity. EDR, backups, email filtering — everything. We sleep better knowing Ruben is on call." },
  { initials: "MR", name: "Michael R.", role: "Operations Director, Retail Chain", text: "The CCTV system RUB installed covers all 3 of our locations. The AI detection caught an incident in the first week. Professional and reliable." },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ padding: "100px 0", background: "#132034" }} ref={ref}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }}>
        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 0.8 } : {}}
          style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16 }}>
          Client Stories
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{
            fontFamily: "var(--font-epilogue)", fontWeight: 900,
            fontSize: "clamp(34px,4.5vw,60px)", lineHeight: 1.0, letterSpacing: "-2.5px", marginBottom: 52,
            background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
          Results Speak Louder.
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 18 }}>
          {testimonials.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 + i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.28 } }}
              style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)", borderRadius: 20, padding: 32,
                transition: "border-color 0.3s",
              }}>
              <div style={{ color: "#ffd700", fontSize: 13, letterSpacing: 3, marginBottom: 14 }}>★★★★★</div>
              <p style={{ fontSize: 14, color: "#8fa8c8", lineHeight: 1.8, marginBottom: 20, fontStyle: "italic" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: "linear-gradient(135deg,#0078d4,#00b4d8)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 13,
                }}>{t.initials}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#fff" }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: "#4a6080" }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
