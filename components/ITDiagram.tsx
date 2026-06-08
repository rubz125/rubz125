"use client";
import { useApp } from "../contexts/AppContext";
import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

const NODE_BASE = [
  { id: "cloud",    x: 480, y: 80,  icon: "☁️",  color: "#0078d4", size: 68, tKey: null },
  { id: "server",   x: 140, y: 260, icon: "🖥️",  color: "#00b4d8", size: 60, tKey: "diagram_node_server" },
  { id: "security", x: 480, y: 260, icon: "🛡️",  color: "#00d4ff", size: 60, tKey: "diagram_node_security" },
  { id: "m365",     x: 820, y: 260, icon: "📧",  color: "#0078d4", size: 60, tKey: null },
  { id: "laptop",   x: 100, y: 470, icon: "💻",  color: "#00b4d8", size: 54, tKey: "diagram_node_endpoints" },
  { id: "cctv",     x: 300, y: 470, icon: "📹",  color: "#00d4ff", size: 54, tKey: null },
  { id: "wifi",     x: 500, y: 470, icon: "📡",  color: "#0078d4", size: 54, tKey: "diagram_node_network" },
  { id: "phone",    x: 700, y: 470, icon: "📱",  color: "#00b4d8", size: 54, tKey: "diagram_node_mobile" },
  { id: "backup",   x: 900, y: 470, icon: "💾",  color: "#00d4ff", size: 54, tKey: "diagram_node_backup" },
];

const edges: [string, string][] = [
  ["cloud","server"],["cloud","security"],["cloud","m365"],
  ["server","laptop"],["server","cctv"],
  ["security","wifi"],["security","cctv"],["security","laptop"],
  ["m365","phone"],["m365","wifi"],
  ["cloud","backup"],["server","backup"],
];

function getNode(nodes: typeof NODE_BASE, id: string) { return nodes.find(n => n.id === id)!; }

function DataPacket({ ax, ay, bx, by, delay }: { ax: number; ay: number; bx: number; by: number; delay: number }) {
  const ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tl = gsap.timeline({ repeat: -1, delay })
      .set(el, { attr: { cx: ax, cy: ay }, opacity: 0 })
      .to(el,  { opacity: 1, duration: 0.24, ease: "none" })
      .to(el,  { attr: { cx: bx, cy: by }, duration: 1.92, ease: "none" }, 0.24)
      .to(el,  { opacity: 0, duration: 0.24, ease: "none" });
    return () => { tl.kill(); };
  }, [ax, ay, bx, by, delay]);

  return (
    <circle
      ref={ref}
      r={3} cx={ax} cy={ay}
      fill="#00d4ff" opacity={0}
      style={{ filter: "drop-shadow(0 0 4px #00d4ff)" }}
    />
  );
}

export default function ITDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<Map<string, SVGCircleElement>>(new Map());
  const pulseRefs  = useRef<Map<string, SVGCircleElement>>(new Map());
  const { t, theme } = useApp();
  const isLight = theme === "light";

  const nodes = NODE_BASE.map(n => ({
    ...n,
    label: n.tKey ? t(n.tKey) : (n.id === "cloud" ? "Azure / AWS" : n.id === "m365" ? "Microsoft 365" : "CCTV"),
  }));

  const steps = [
    { num: "01", titleKey: "diagram_step1_title", descKey: "diagram_step1_desc" },
    { num: "02", titleKey: "diagram_step2_title", descKey: "diagram_step2_desc" },
    { num: "03", titleKey: "diagram_step3_title", descKey: "diagram_step3_desc" },
  ];

  // Scroll reveal
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: textRef.current, start: "top 85%", once: true } });
    }
    if (diagramRef.current) {
      gsap.fromTo(diagramRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.7, delay: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: diagramRef.current, start: "top 85%", once: true } });
    }
  }, []);

  // Node hover animations
  useEffect(() => {
    nodes.forEach(node => {
      const circle = circleRefs.current.get(node.id);
      const pulse  = pulseRefs.current.get(node.id);
      if (!circle || !pulse) return;

      if (hovered === node.id) {
        gsap.to(circle, { attr: { r: node.size / 2 + 4 }, duration: 0.25 });
        gsap.fromTo(pulse,
          { attr: { r: node.size / 2 + 8 }, opacity: 0.4 },
          { attr: { r: node.size / 2 + 18 }, opacity: 0, duration: 1.2, repeat: -1, ease: "none" });
      } else {
        gsap.to(circle, { attr: { r: node.size / 2 }, duration: 0.25 });
        gsap.killTweensOf(pulse);
        gsap.set(pulse, { opacity: 0 });
      }
    });
  }, [hovered]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section style={{ padding: "100px 0", background: "var(--bg-1)", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 700, height: 500, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(0,120,212,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }}>
        <div className="rub-grid-2" style={{ alignItems: "center" }}>

          {/* Text side */}
          <div ref={textRef}>
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#00d4ff", display: "block", marginBottom: 16, opacity: 0.8 }}>
              {t("diagram_label")}
            </span>
            <h2 style={{
              fontFamily: "var(--font-epilogue)", fontWeight: 900,
              fontSize: "clamp(32px,4vw,58px)", lineHeight: 1.0, letterSpacing: "-2.5px", marginBottom: 18,
              ...(isLight
                ? { color: "#0d1526", WebkitTextFillColor: "#0d1526" }
                : { background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }),
            }}>
              {t("diagram_h2").split("\n").map((l, i, a) => <span key={i}>{l}{i < a.length - 1 && <br />}</span>)}
            </h2>
            <p style={{ color: "var(--text-2)", fontSize: 16, fontWeight: 300, lineHeight: 1.8, marginBottom: 36, maxWidth: 420 }}>
              {t("diagram_sub")}
            </p>

            {steps.map((step, i) => (
              <div key={step.num} style={{
                display: "flex", gap: 18, marginBottom: 22,
                paddingBottom: i < 2 ? 22 : 0,
                borderBottom: i < 2 ? "1px solid var(--border-sub)" : "none",
              }}>
                <div style={{ fontFamily: "var(--font-epilogue)", fontWeight: 900, fontSize: 11, color: "#00d4ff", opacity: 0.6, letterSpacing: 1, flexShrink: 0, paddingTop: 3 }}>
                  {step.num}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-epilogue)", fontWeight: 700, fontSize: 14, color: "var(--text-1)", marginBottom: 4 }}>{t(step.titleKey)}</div>
                  <div style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.6 }}>{t(step.descKey)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Diagram side */}
          <div ref={diagramRef} style={{
            background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)",
            borderRadius: 24, padding: 28,
          }}>
            <div style={{ fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: 3, marginBottom: 16, fontWeight: 600 }}>
              {t("diagram_live_title")}
            </div>

            <svg viewBox="0 0 1000 570" style={{ width: "100%", height: "auto" }}>
              <defs>
                <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="#0078d4" stopOpacity="0.05" />
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
                const na  = getNode(nodes, a);
                const nb  = getNode(nodes, b);
                const isH = hovered === a || hovered === b;
                return (
                  <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                    stroke={isH ? "rgba(0,212,255,0.5)" : "rgba(0,180,216,0.15)"}
                    strokeWidth={isH ? 1.5 : 1}
                    strokeDasharray="4 4"
                    style={{ transition: "all 0.3s" }}
                  />
                );
              })}

              {/* Data packets */}
              {edges.map(([a, b], i) => {
                const na = getNode(nodes, a), nb = getNode(nodes, b);
                return <DataPacket key={`f${i}`} ax={na.x} ay={na.y} bx={nb.x} by={nb.y} delay={i * 0.3} />;
              })}
              {edges.map(([a, b], i) => {
                const na = getNode(nodes, a), nb = getNode(nodes, b);
                return <DataPacket key={`r${i}`} ax={nb.x} ay={nb.y} bx={na.x} by={na.y} delay={i * 0.3 + 1.2} />;
              })}

              {/* Nodes */}
              {nodes.map((node) => (
                <g key={node.id} style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Pulse ring (animated by GSAP on hover) */}
                  <circle
                    ref={(el) => { if (el) pulseRefs.current.set(node.id, el); }}
                    cx={node.x} cy={node.y} r={node.size / 2 + 8}
                    fill="none" stroke={node.color} strokeWidth="1" opacity="0"
                  />
                  {/* Main circle */}
                  <circle
                    ref={(el) => { if (el) circleRefs.current.set(node.id, el); }}
                    cx={node.x} cy={node.y} r={node.size / 2}
                    fill={`${node.color}18`}
                    stroke={hovered === node.id ? node.color : `${node.color}50`}
                    strokeWidth={hovered === node.id ? 1.5 : 1}
                    filter={hovered === node.id ? "url(#glow)" : undefined}
                    style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                  />
                  <text x={node.x} y={node.y + 6} textAnchor="middle"
                    fontSize={hovered === node.id ? 22 : 20}
                    style={{ userSelect: "none", transition: "font-size 0.25s" }}
                  >{node.icon}</text>
                  <text x={node.x} y={node.y + node.size / 2 + 16}
                    textAnchor="middle" fontSize={10}
                    fontWeight={hovered === node.id ? "700" : "500"}
                    fill={hovered === node.id ? "var(--text-1)" : "var(--text-2)"}
                    fontFamily="var(--font-inter)"
                    style={{ transition: "fill 0.2s" }}
                  >{node.label}</text>
                </g>
              ))}

              {/* Status bar */}
              <rect x={20} y={538} width={960} height={24} rx={6} fill="rgba(0,120,212,0.08)" stroke="rgba(0,180,216,0.15)" strokeWidth={1} />
              <circle cx={38} cy={550} r={5} fill="#00e676">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x={52} y={554} fontSize={10} fill="var(--text-2)" fontFamily="var(--font-inter)" fontWeight="500">
                {t("diagram_status")}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
