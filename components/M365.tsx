"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MessageSquare, Folder, Shield, Users, Globe } from "lucide-react";

const tiles = [
  { icon: Mail, title: "Exchange Online", desc: "99.9% uptime SLA, advanced anti-spam and archiving." },
  { icon: MessageSquare, title: "Microsoft Teams", desc: "Unified comms, video conferencing and collaboration." },
  { icon: Folder, title: "OneDrive & SharePoint", desc: "Secure cloud storage with version control." },
  { icon: Shield, title: "Security & Compliance", desc: "DLP, Conditional Access, MFA and compliance." },
  { icon: Users, title: "User Management", desc: "Azure AD, SSO, group policies and user lifecycle." },
  { icon: Globe, title: "Apps & Automation", desc: "Power Platform, Intune MDM and app deployment." },
];

export default function M365() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="m365" style={{
      padding: "100px 0",
      background: "linear-gradient(135deg,#061428 0%,#0a1f40 50%,#061428 100%)",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }} ref={ref}>
        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 0.8 } : {}}
          style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16 }}>
          Microsoft 365
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{
            fontFamily: "var(--font-epilogue)", fontWeight: 900,
            fontSize: "clamp(34px,4.5vw,60px)", lineHeight: 1.0, letterSpacing: "-2.5px", marginBottom: 14,
            background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
          Work Smarter.<br />Collaborate Faster.
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          style={{ color: "#8fa8c8", fontSize: 17, fontWeight: 300, marginBottom: 52, maxWidth: 400 }}>
          Deployed. Secured. Managed. So your team can focus on what matters.
        </motion.p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
          {tiles.map((t, i) => (
            <motion.div key={t.title}
              initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.15 + i * 0.07 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              style={{
                background: "rgba(0,120,212,0.07)", border: "1px solid rgba(0,120,212,0.18)",
                borderRadius: 18, padding: "26px 28px",
                transition: "border-color 0.3s",
              }}>
              <t.icon size={26} style={{ color: "#0078d4", marginBottom: 14 }} />
              <h3 style={{ fontFamily: "var(--font-epilogue)", fontWeight: 700, fontSize: 15, marginBottom: 7, color: "#fff" }}>{t.title}</h3>
              <p style={{ fontSize: 13, color: "#8fa8c8", lineHeight: 1.6 }}>{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
