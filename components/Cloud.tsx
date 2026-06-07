"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Monitor, RefreshCw, Globe, TrendingUp, ShieldCheck } from "lucide-react";

const items = [
  { icon: Rocket, title: "Cloud Migration", desc: "Lift-and-shift or full re-architecture for Azure and AWS." },
  { icon: Monitor, title: "Virtual Machines", desc: "Scalable VM deployment, management and cost optimization." },
  { icon: RefreshCw, title: "Backup & DR", desc: "Automated cloud backups with tested recovery procedures." },
  { icon: Globe, title: "Hybrid Connectivity", desc: "VPN gateways, ExpressRoute and site-to-site connectivity." },
  { icon: TrendingUp, title: "Cost Management", desc: "Reserved instances, right-sizing and spend analytics." },
  { icon: ShieldCheck, title: "Cloud Security", desc: "IAM, network security groups and compliance automation." },
];

const providers = [["☁️", "Microsoft Azure"], ["🔶", "Amazon AWS"], ["🔄", "Hybrid Cloud"], ["🔁", "Disaster Recovery"]];

export default function Cloud() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cloud" style={{ padding: "100px 0", background: "#132034" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }} ref={ref}>
        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 0.8 } : {}}
          style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16 }}>
          Cloud
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{
            fontFamily: "var(--font-epilogue)", fontWeight: 900,
            fontSize: "clamp(34px,4.5vw,60px)", lineHeight: 1.0, letterSpacing: "-2.5px", marginBottom: 14,
            background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
          Scale Without Limits.
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          style={{ color: "#8fa8c8", fontSize: 17, fontWeight: 300, marginBottom: 36, maxWidth: 420 }}>
          Azure. AWS. Hybrid. Designed for resilience — built to grow with you.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 44 }}>
          {providers.map(([icon, label]) => (
            <div key={label} style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)", borderRadius: 12,
              padding: "12px 20px", display: "flex", alignItems: "center",
              gap: 10, fontSize: 14, fontWeight: 600,
            }}>
              <span style={{ fontSize: 20 }}>{icon}</span> {label}
            </div>
          ))}
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
          {items.map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)", borderRadius: 16, padding: "22px 24px",
                transition: "border-color 0.3s",
              }}>
              <item.icon size={22} style={{ color: "#00b4d8", marginBottom: 12 }} />
              <h4 style={{ fontFamily: "var(--font-epilogue)", fontWeight: 700, fontSize: 14, marginBottom: 7, color: "#fff" }}>{item.title}</h4>
              <p style={{ fontSize: 13, color: "#4a6080", lineHeight: 1.55 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
