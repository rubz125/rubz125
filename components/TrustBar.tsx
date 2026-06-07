"use client";

const partners = [
  { icon: "🪟", name: "Microsoft Partner" },
  { icon: "☁️", name: "Microsoft Azure" },
  { icon: "🔶", name: "Amazon AWS" },
  { icon: "🛡️", name: "CrowdStrike" },
  { icon: "💾", name: "Veeam Backup" },
  { icon: "🔒", name: "ISO 27001" },
  { icon: "🌐", name: "Cisco Network" },
  { icon: "⚙️", name: "Hyper-V" },
  { icon: "🔐", name: "Zero Trust" },
  { icon: "📊", name: "Microsoft 365" },
];

const doubled = [...partners, ...partners];

export default function TrustBar() {
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "#132034", padding: "28px 0", overflow: "hidden" }}>
      <p style={{ textAlign: "center", fontSize: 10, color: "#4a6080", textTransform: "uppercase", letterSpacing: 4, marginBottom: 18 }}>
        Trusted Technologies & Partnerships
      </p>
      <div style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 52, animation: "marquee 55s linear infinite", width: "max-content" }}>
          {doubled.map((p, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.35)",
              whiteSpace: "nowrap", cursor: "default",
            }}>
              <span style={{ fontSize: 18 }}>{p.icon}</span>
              {p.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
