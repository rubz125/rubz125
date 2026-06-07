import { Phone, Mail, MessageCircle } from "lucide-react";

const col1 = ["Managed IT","Microsoft 365","Cloud Solutions","Cybersecurity"];
const col2 = ["CCTV Installation","Access Control","Backup & DR","Helpdesk"];

export default function Footer() {
  return (
    <footer style={{ background: "#0a1020", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "60px 6% 28px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 100px)" }}>
        <div className="rub-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: "var(--font-epilogue)", fontSize: 22, fontWeight: 900, marginBottom: 14,
              background: "linear-gradient(135deg,#fff 0%,#c8e0ff 55%,#00d4ff 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>RUB</div>
            <p style={{ fontSize: 13, color: "#4a6080", lineHeight: 1.7, maxWidth: 260, marginBottom: 18 }}>
              Secure. Connected. In control. — IT that works, so your business does too.
            </p>
            {[
              { href: "tel:+97254216 7219", icon: Phone, label: "+972 54 216 7219" },
              { href: "mailto:rubenuzan11@gmail.com", icon: Mail, label: "rubenuzan11@gmail.com" },
              { href: "https://wa.me/97254216 7219", icon: MessageCircle, label: "WhatsApp" },
            ].map(l => (
              <a key={l.label} href={l.href} target={l.href.startsWith("https") ? "_blank" : undefined} rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8fa8c8", marginBottom: 8, textDecoration: "none" }}>
                <l.icon size={13} /> {l.label}
              </a>
            ))}
          </div>

          {[["Services", col1], ["More", col2], ["Quick Links", [["Contact","#contact"],["FAQ","#faq"],["Cloud","#cloud"],["Security","#cybersecurity"]]]].map(([heading, items]) => (
            <div key={heading as string}>
              <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: "#8fa8c8", marginBottom: 18 }}>{heading as string}</h4>
              <ul style={{ listStyle: "none" }}>
                {(items as (string | string[])[]).map(item => {
                  const label = Array.isArray(item) ? item[0] : item;
                  const href = Array.isArray(item) ? item[1] : "#services";
                  return (
                    <li key={label} style={{ marginBottom: 10 }}>
                      <a href={href} style={{ fontSize: 13, color: "#4a6080", textDecoration: "none" }}>{label}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#4a6080" }}>© 2025 RUB IT Solutions. All rights reserved. Ruben Uzan · Israel</p>
          <div style={{ display: "flex", gap: 8 }}>
            {["24/7 Support","Israel","Enterprise IT"].map(b => (
              <span key={b} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                fontSize: 10, color: "#4a6080", fontWeight: 600, textTransform: "uppercase",
                letterSpacing: 1, padding: "5px 12px", borderRadius: 8,
              }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
