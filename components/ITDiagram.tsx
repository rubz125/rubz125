"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const nodes = [
  { id: "cloud",    x: 480, y: 80,  label: "Azure / AWS",       icon: "☁️",  color: "#0078d4", size: 68 },
  { id: "server",   x: 140, y: 260, label: "Server Room",        icon: "🖥️",  color: "#00b4d8", size: 60 },
  { id: "security", x: 480, y: 260, label: "Security Layer",     icon: "🛡️",  color: "#00d4ff", size: 60 },
  { id: "m365",     x: 820, y: 260, label: "Microsoft 365",      icon: "📧",  color: "#0078d4", size: 60 },
  { id: "laptop",   x: 100, y: 470, label: "Endpoints",          icon: "💻",  color: "#00b4d8", size: 54 },
  { id: "cctv",     x: 300, y: 470, label: "CCTV",               icon: "📹",  color: "#00d4ff", size: 54 },
  { id: "wifi",     x: 500, y: 470, label: "Network / WiFi",     icon: "📡",  color: "#0078d4", size: 54 },
  { id: "phone",    x: 700, y: 470, label: "Mobile",             icon: "📱",  color: "#00b4d8", size: 54 },
  { id: "backup",   x: 900, y: 470, label: "Backup & DR",        icon: "💾",  color: "#00d4ff", size: 54 },
];

const edges = [
  ["cloud","server"],["cloud","security"],["cloud","m365"],
  ["server","laptop"],["server","cctv"],
  ["security","wifi"],["security","cctv"],["security","laptop"],
  ["m365","phone"],["m365","wifi"],
  ["cloud","backup"],["server","backup"],
];

function getNode(id: string) { return nodes.find(n => n.id === id)!; }

function DataPacket({ from, to, delay }: { from: string; to: string; delay: number }) {
  const a = getNode(from);
  const b = getNode(to);
  return (
    <motion.circle
      r={3}
      fill="#00d4ff"
      style={{ filter: "drop-shadow(0 0 4px #00d4ff)" }}
      initial={{ x: a.x, y: a.y, opacity: 0 }}
      animate={{ x: [a.x, b.x], y: [a.y, b.y], opacity: [0, 1, 1, 0] }}
      transition={{ repeat: Infinity, duration: 2.4, delay, ease: "linear", times: [0, 0.1, 0.9, 1] }}
    />
  );
}

export default function ITDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section style={{ padding: "100px 0", background: "#0d1526", position: "relative", overflow: "hidden" }}>
      {/* Glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 700, height: 500, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(0,120,212,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }}>
        <div className="rub-grid-2" style={{ alignItems: "center" }}>

          {/* Text side */}
          <div>
            <motion.span
              initial={{ opacity: 0 }} whileInView={{ opacity: 0.8 }} viewport={{ once: true }}
              style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16 }}>
              How It Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              style={{
                fontFamily: "var(--font-epilogue)", fontWeight: 900,
                fontSize: "clamp(32px,4vw,58px)", lineHeight: 1.0, letterSpacing: "-2.5px", marginBottom: 18,
                background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
              One Team.<br />Every Layer.<br />Always On.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              style={{ color: "#8fa8c8", fontSize: 16, fontWeight: 300, lineHeight: 1.8, marginBottom: 36, maxWidth: 420 }}>
              We connect and manage every part of your IT stack — from cloud infrastructure and security to endpoints, CCTV and Microsoft 365 — all under one roof.
            </motion.p>

            {/* Steps */}
            {[
              { num: "01", title: "We Audit Your Infrastructure", desc: "Full assessment of your current IT environment — gaps, risks and opportunities." },
              { num: "02", title: "We Design & Deploy", desc: "Cloud, security, network, 365 — all configured to your business needs." },
              { num: "03", title: "We Monitor 24/7", desc: "Continuous monitoring, alerts and response. You focus on growth, we handle IT." },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.1 }}
                style={{
                  display: "flex", gap: 18, marginBottom: 22,
                  paddingBottom: i < 2 ? 22 : 0,
                  borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <div style={{
                  fontFamily: "var(--font-epilogue)", fontWeight: 900, fontSize: 11,
                  color: "#00d4ff", opacity: 0.6, letterSpacing: 1, flexShrink: 0, paddingTop: 3,
                }}>{step.num}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-epilogue)", fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 4 }}>{step.title}</div>
                  <div style={{ fontSize: 13, color: "#4a6080", lineHeight: 1.6 }}>{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Diagram side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 24, padding: 28,
            }}
          >
            <div style={{ fontSize: 11, color: "#4a6080", textTransform: "uppercase", letterSpacing: 3, marginBottom: 16, fontWeight: 600 }}>
              Live Infrastructure Overview
            </div>

            <svg viewBox="0 0 1000 570" style={{ width: "100%", height: "auto" }}>
              <defs>
                <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0078d4" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#0078d4" stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <rect width="1000" height="570" fill="url(#bgGlow)" rx="16" />

              {/* Edges */}
              {edges.map(([a, b], i) => {
                const na = getNode(a);
                const nb = getNode(b);
                const isHovered = hovered === a || hovered === b;
                return (
                  <line key={i}
                    x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                    stroke={isHovered ? "rgba(0,212,255,0.5)" : "rgba(0,180,216,0.15)"}
                    strokeWidth={isHovered ? 1.5 : 1}
                    strokeDasharray="4 4"
                    style={{ transition: "all 0.3s" }}
                  />
                );
              })}

              {/* Animated data packets */}
              {edges.map(([a, b], i) => (
                <DataPacket key={`p-${i}`} from={a} to={b} delay={i * 0.3} />
              ))}
              {edges.map(([a, b], i) => (
                <DataPacket key={`rp-${i}`} from={b} to={a} delay={i * 0.3 + 1.2} />
              ))}

              {/* Nodes */}
              {nodes.map((node) => {
                const isHov = hovered === node.id;
                return (
                  <g key={node.id}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHovered(node.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Pulse ring */}
                    {isHov && (
                      <motion.circle
                        cx={node.x} cy={node.y} r={node.size / 2 + 10}
                        fill="none" stroke={node.color} strokeWidth="1" opacity="0.4"
                        animate={{ r: [node.size / 2 + 8, node.size / 2 + 18], opacity: [0.4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                      />
                    )}

                    {/* Node circle */}
                    <motion.circle
                      cx={node.x} cy={node.y}
                      r={isHov ? node.size / 2 + 4 : node.size / 2}
                      fill={`${node.color}18`}
                      stroke={isHov ? node.color : `${node.color}50`}
                      strokeWidth={isHov ? 1.5 : 1}
                      filter={isHov ? "url(#glow)" : undefined}
                      animate={{ scale: isHov ? 1.08 : 1 }}
                      transition={{ duration: 0.25 }}
                    />

                    {/* Icon */}
                    <text x={node.x} y={node.y + 6}
                      textAnchor="middle" fontSize={isHov ? 22 : 20}
                      style={{ userSelect: "none" }}
                    >{node.icon}</text>

                    {/* Label */}
                    <text
                      x={node.x} y={node.y + node.size / 2 + 16}
                      textAnchor="middle"
                      fontSize={10}
                      fontWeight={isHov ? "700" : "500"}
                      fill={isHov ? "#fff" : "#8fa8c8"}
                      fontFamily="var(--font-inter)"
                      style={{ transition: "fill 0.2s" }}
                    >{node.label}</text>
                  </g>
                );
              })}

              {/* Status bar at bottom */}
              <rect x={20} y={538} width={960} height={24} rx={6} fill="rgba(0,120,212,0.08)" stroke="rgba(0,180,216,0.15)" strokeWidth={1} />
              <circle cx={38} cy={550} r={5} fill="#00e676">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x={52} y={554} fontSize={10} fill="#8fa8c8" fontFamily="var(--font-inter)" fontWeight="500">
                All systems operational · 24/7 Monitoring Active · 0 Critical Alerts
              </text>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
