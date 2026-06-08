"use client";

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: "absolute",
        top: -100,
        left: 8,
        zIndex: 99999,
        background: "#0078d4",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: 8,
        fontWeight: 600,
        fontSize: 14,
        textDecoration: "none",
        transition: "top 0.2s",
      }}
      onFocus={(e) => { e.currentTarget.style.top = "8px"; }}
      onBlur={(e) => { e.currentTarget.style.top = "-100px"; }}
    >
      Skip to main content
    </a>
  );
}
