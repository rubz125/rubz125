"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Phone, MessageCircle, Server, Mail, Cloud, Shield, Camera, Lock, HardDrive, Network, Cpu, Headphones } from "lucide-react";
import { serviceData } from "./data";

const iconMap: Record<string, React.ElementType> = {
  "managed-it": Server,
  "microsoft-365": Mail,
  "cloud-infrastructure": Cloud,
  "cybersecurity": Shield,
  "cctv": Camera,
  "access-control": Lock,
  "backup-dr": HardDrive,
  "network": Network,
  "server-virtualization": Cpu,
  "helpdesk": Headphones,
};

export default function ServicePageClient({ slug }: { slug: string }) {
  const s = serviceData[slug];
  const Icon = iconMap[slug] ?? Server;

  return (
    <div style={{ background: "#0d1526", minHeight: "100vh", color: "#e8f0fe" }}>

      {/* Nav */}
      <div style={{ padding: "24px clamp(24px,6vw,100px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "var(--font-epilogue)", fontWeight: 900, fontSize: 22, color: "#fff", textDecoration: "none", letterSpacing: "-1px" }}>RUB</Link>
          <Link href="/#services" style={{ fontSize: 13, color: "#4a6080", textDecoration: "none" }}>← All Services</Link>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: "80px clamp(24px,6vw,100px) 60px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: `${s.color}15`, border: `1px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
              <Icon size={28} style={{ color: s.color }} />
            </div>
            <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: s.color, marginBottom: 14 }}>{s.title}</p>
            <h1 style={{ fontFamily: "var(--font-epilogue)", fontWeight: 900, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, letterSpacing: "-3px", marginBottom: 20, maxWidth: 800, background: "linear-gradient(135deg,#fff 0%,#c8e0ff 60%,#00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {s.hero}
            </h1>
            <p style={{ fontSize: 18, color: "#8fa8c8", fontWeight: 300, lineHeight: 1.8, maxWidth: 680 }}>{s.intro}</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "80px clamp(24px,6vw,100px)", maxWidth: 1200, margin: "0 auto" }}>
        <div className="rub-grid-side">

          {/* Main */}
          <div>
            {s.sections.map((sec, i) => (
              <motion.div key={sec.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ marginBottom: 48, paddingBottom: 48, borderBottom: i < s.sections.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <h2 style={{ fontFamily: "var(--font-epilogue)", fontWeight: 800, fontSize: "clamp(20px,2.5vw,28px)", letterSpacing: "-0.8px", color: "#fff", marginBottom: 16 }}>{sec.title}</h2>
                <p style={{ fontSize: 15, color: "#8fa8c8", lineHeight: 1.85, fontWeight: 300 }}>{sec.body}</p>
              </motion.div>
            ))}

            <h2 style={{ fontFamily: "var(--font-epilogue)", fontWeight: 800, fontSize: "clamp(20px,2.5vw,28px)", letterSpacing: "-0.8px", color: "#fff", marginBottom: 28 }}>Common Questions</h2>
            {s.faq.map((item, i) => (
              <motion.div key={item.q} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                style={{ marginBottom: 16, padding: "20px 24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14 }}>
                <p style={{ fontFamily: "var(--font-epilogue)", fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 8 }}>{item.q}</p>
                <p style={{ fontSize: 13.5, color: "#6a8aaa", lineHeight: 1.75 }}>{item.a}</p>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="rub-sidebar-sticky" style={{ position: "sticky", top: 100 }}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 28, marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 3, color: s.color, marginBottom: 20 }}>What&apos;s Included</p>
              <ul style={{ listStyle: "none" }}>
                {s.bullets.map((b) => (
                  <li key={b} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 13 }}>
                    <CheckCircle2 size={15} style={{ color: s.color, flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: "#8fa8c8", lineHeight: 1.5 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              style={{ background: `linear-gradient(135deg, ${s.color}15 0%, rgba(0,180,216,0.08) 100%)`, border: `1px solid ${s.color}25`, borderRadius: 20, padding: 28 }}>
              <p style={{ fontFamily: "var(--font-epilogue)", fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 8, letterSpacing: "-0.5px" }}>Ready to get started?</p>
              <p style={{ fontSize: 13, color: "#8fa8c8", marginBottom: 24, lineHeight: 1.6 }}>Talk to Ruben directly. No sales team, no middleman.</p>
              <a href="tel:+972542167219" style={{ display: "flex", alignItems: "center", gap: 8, background: s.color, color: "#fff", borderRadius: 10, padding: "12px 18px", textDecoration: "none", fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
                <Phone size={15} /> +972 54 216 7219
              </a>
              <a href="https://wa.me/972542167219" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, background: "#25d366", color: "#fff", borderRadius: 10, padding: "12px 18px", textDecoration: "none", fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
                <MessageCircle size={15} /> WhatsApp
              </a>
              <Link href="/#contact" style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", color: "#fff", borderRadius: 10, padding: "12px 18px", textDecoration: "none", fontWeight: 600, fontSize: 13, justifyContent: "center" }}>
                Get a Free Quote <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
