"use client";
import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { gsap } from "../lib/gsap";

export default function FloatingWhatsApp() {
  const btnRef  = useRef<HTMLAnchorElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn   = btnRef.current;
    const pulse = pulseRef.current;
    if (!btn || !pulse) return;

    // Spring-style entrance after 2 s
    gsap.from(btn, { scale: 0, opacity: 0, duration: 0.6, delay: 2, ease: "back.out(2)" });

    // Infinite pulse ring
    gsap.to(pulse, { scale: 1.55, opacity: 0, duration: 2, repeat: -1, ease: "power1.out" });

    // Hover / tap feedback
    const onEnter  = () => gsap.to(btn, { scale: 1.12, duration: 0.2, ease: "power2.out" });
    const onLeave  = () => gsap.to(btn, { scale: 1,    duration: 0.2, ease: "power2.out" });
    const onDown   = () => gsap.to(btn, { scale: 0.95, duration: 0.1 });
    const onUp     = () => gsap.to(btn, { scale: 1,    duration: 0.1 });

    btn.addEventListener("mouseenter",  onEnter);
    btn.addEventListener("mouseleave",  onLeave);
    btn.addEventListener("mousedown",   onDown);
    btn.addEventListener("mouseup",     onUp);

    return () => {
      btn.removeEventListener("mouseenter",  onEnter);
      btn.removeEventListener("mouseleave",  onLeave);
      btn.removeEventListener("mousedown",   onDown);
      btn.removeEventListener("mouseup",     onUp);
    };
  }, []);

  return (
    <a
      ref={btnRef}
      href="https://wa.me/972542167219"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 50,
        width: 56, height: 56, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg,#25d366,#128c7e)",
        boxShadow: "0 8px 32px rgba(37,211,102,0.4)",
        textDecoration: "none",
      }}
      aria-label="WhatsApp"
    >
      <MessageCircle size={24} fill="white" color="white" />
      <div
        ref={pulseRef}
        style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "2px solid #25d366",
        }}
      />
    </a>
  );
}
