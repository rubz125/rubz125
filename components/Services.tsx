"use client";
import { useApp } from "../contexts/AppContext";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Server, Mail, Cloud, Shield, Camera, Lock, HardDrive, Network, Cpu, Headphones } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Server, color: "#0078d4", slug: "managed-it",
    title: "Managed IT Services",
    desc: "Your IT. Fully managed. Zero surprises.",
    detail: "We take complete ownership of your IT environment — monitoring, maintaining, and resolving issues before they impact your business. One flat monthly fee, no hidden costs.",
    benefits: ["Proactive monitoring & maintenance", "Remote & on-site support", "Predictable monthly pricing"],
  },
  {
    icon: Mail, color: "#00b4d8", slug: "microsoft-365",
    title: "Microsoft 365",
    desc: "Deployed right. Secured properly. Managed daily.",
    detail: "From initial setup to ongoing management, we handle your entire Microsoft 365 environment — including email, Teams, SharePoint, licensing and security policies.",
    benefits: ["Email, Teams & SharePoint", "Security & compliance setup", "User management & licensing"],
  },
  {
    icon: Cloud, color: "#00d4ff", slug: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    desc: "Azure. AWS. Hybrid. Built to scale, built to last.",
    detail: "We design, migrate and manage your cloud infrastructure on Azure or AWS. Whether you're moving from on-premise or scaling an existing cloud setup, we make it efficient and cost-effective.",
    benefits: ["Cloud migration strategy", "Cost optimization", "Hybrid cloud solutions"],
  },
  {
    icon: Shield, color: "#0078d4", slug: "cybersecurity",
    title: "Cybersecurity",
    desc: "Detect. Contain. Eliminate. Before damage is done.",
    detail: "Ransomware, phishing, insider threats — we protect your business at every layer. EDR, email filtering, security awareness, and 24/7 threat monitoring keep you one step ahead.",
    benefits: ["EDR & antivirus protection", "Threat detection & response", "Security audits"],
  },
  {
    icon: Camera, color: "#00b4d8", slug: "cctv",
    title: "CCTV Installation",
    desc: "See everything. Record everything. Miss nothing.",
    detail: "Professional installation of HD and 4K IP camera systems for offices, warehouses and retail. Remote access from your phone, AI-powered motion alerts, and cloud or NVR recording.",
    benefits: ["HD & 4K camera systems", "Remote mobile monitoring", "AI motion detection"],
  },
  {
    icon: Lock, color: "#00d4ff", slug: "access-control",
    title: "Access Control",
    desc: "Who gets in. When. Where. You decide.",
    detail: "Control physical access to your premises with keycard, PIN or biometric systems. Manage multiple sites from one dashboard, with full audit trails of every entry and exit.",
    benefits: ["Keycard & biometric systems", "Multi-site management", "Audit trails & reporting"],
  },
  {
    icon: HardDrive, color: "#0078d4", slug: "backup-dr",
    title: "Backup & DR",
    desc: "When things go wrong — back up in minutes, not days.",
    detail: "Automated daily backups to off-site and cloud storage, with tested recovery procedures. We define your RTO and RPO targets and guarantee them with SLA-backed contracts.",
    benefits: ["Automated daily backups", "Off-site & cloud storage", "RTO/RPO SLA guarantees"],
  },
  {
    icon: Network, color: "#00b4d8", slug: "network",
    title: "Network Infrastructure",
    desc: "Fast. Reliable. Secure. The network you deserve.",
    detail: "From structured cabling and enterprise WiFi to firewalls and VPN — we design and deploy networks that handle real workloads, with 24/7 monitoring and rapid fault resolution.",
    benefits: ["Structured cabling & WiFi", "Firewall & VPN setup", "Network monitoring 24/7"],
  },
  {
    icon: Cpu, color: "#00d4ff", slug: "server-virtualization",
    title: "Server Virtualization",
    desc: "Do more with less. Hyper-V & VMware, architected right.",
    detail: "Consolidate your physical servers into a lean, high-performance virtual environment. We architect, deploy and manage Hyper-V and VMware clusters with HA and live migration.",
    benefits: ["Server consolidation", "High availability clustering", "Live migration support"],
  },
  {
    icon: Headphones, color: "#0078d4", slug: "helpdesk",
    title: "Helpdesk Support",
    desc: "Real humans. Real answers. Issues resolved — fast.",
    detail: "Your team gets direct access to our senior technicians — no bots, no first-level scripts. Remote support in minutes, on-site when needed, with priority queuing and SLA guarantees.",
    benefits: ["Remote & on-site support", "Priority ticketing system", "SLA response guarantees"],
  },
];

function ServiceCard({ s, i }: { s: (typeof services)[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useApp();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (cardRef.current) {
      cardRef.current.style.setProperty("--x", `${x}%`);
      cardRef.current.style.setProperty("--y", `${y}%`);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: i * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: 28,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      className="service-card"
    >
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: `${s.color}14`, border: `1px solid ${s.color}28`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 18,
      }}>
        <s.icon size={20} style={{ color: s.color }} />
      </div>

      <h3 style={{
        fontFamily: "var(--font-epilogue)", fontSize: 16,
        fontWeight: 800, letterSpacing: "-0.3px",
        color: "var(--text-1)", marginBottom: 8,
      }}>
        {s.title}
      </h3>

      <p style={{ fontSize: 13, color: "#00d4ff", lineHeight: 1.5, marginBottom: 10, fontWeight: 600, letterSpacing: "0.2px" }}>
        {s.desc}
      </p>

      <p style={{ fontSize: 12.5, color: "var(--text-3)", lineHeight: 1.75, marginBottom: 16 }}>
        {s.detail}
      </p>

      <ul style={{ listStyle: "none", marginBottom: 20 }}>
        {s.benefits.map((b) => (
          <li key={b} style={{
            fontSize: 12, color: "var(--text-3)",
            padding: "3px 0", display: "flex", gap: 8,
          }}>
            <span style={{ color: s.color, flexShrink: 0 }}>&#8594;</span> {b}
          </li>
        ))}
      </ul>

      <Link href={`/services/${s.slug}`} style={{
        fontSize: 12, fontWeight: 600, color: s.color,
        display: "flex", alignItems: "center", gap: 5,
        textDecoration: "none",
      }}>
        {t("learn_more")}
      </Link>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { t, theme } = useApp();
  const isLight = theme === "light";

  return (
    <section id="services" style={{ padding: "100px 0", background: "var(--bg-1)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }}>
        <div ref={ref} style={{ marginBottom: 56 }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.8 } : {}}
            style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16 }}
          >
            {t("services_label")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "var(--font-epilogue)", fontWeight: 900,
              fontSize: "clamp(34px, 4.5vw, 60px)", lineHeight: 1.0,
              letterSpacing: "-2.5px", marginBottom: 14,
              ...(isLight
                ? { color: "#0d1526", WebkitTextFillColor: "#0d1526" }
                : { background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }),
            }}
          >
            {t("services_h2").split("\n").map((l,i,a) => <span key={i}>{l}{i<a.length-1&&<br/>}</span>)}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{ color: "var(--text-2)", fontSize: 17, fontWeight: 300, maxWidth: 420 }}
          >
            {t("services_sub")}
          </motion.p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}>
          {services.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
