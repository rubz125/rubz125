"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-1)",
        color: "var(--text-1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        textAlign: "center",
        fontFamily: "var(--font-inter)",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-epilogue)",
          fontSize: 28,
          fontWeight: 900,
          letterSpacing: "-1px",
          background: "linear-gradient(135deg,#0078d4 0%,#00b4d8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textDecoration: "none",
          marginBottom: 48,
          display: "block",
        }}
      >
        RUB
      </Link>

      {/* 404 number */}
      <div
        style={{
          fontSize: "clamp(80px,15vw,160px)",
          fontFamily: "var(--font-epilogue)",
          fontWeight: 900,
          letterSpacing: "-8px",
          lineHeight: 1,
          background: "linear-gradient(135deg,#0078d4 0%,#00b4d8 50%,#00d4ff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 16,
        }}
      >
        404
      </div>

      <h1
        style={{
          fontSize: "clamp(20px,3vw,32px)",
          fontFamily: "var(--font-epilogue)",
          fontWeight: 800,
          marginBottom: 12,
          color: "var(--text-1)",
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          fontSize: 16,
          color: "var(--text-2)",
          maxWidth: 400,
          lineHeight: 1.7,
          marginBottom: 40,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            background: "linear-gradient(135deg,#0078d4,#00b4d8)",
            color: "#fff",
            padding: "13px 28px",
            borderRadius: 12,
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
            boxShadow: "0 8px 24px rgba(0,120,212,0.3)",
          }}
        >
          Go Home
        </Link>
        <Link
          href="/#contact"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-md)",
            color: "var(--text-1)",
            padding: "13px 28px",
            borderRadius: 12,
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
          }}
        >
          Contact Us
        </Link>
      </div>

      {/* Emergency bar */}
      <div style={{ marginTop: 64, fontSize: 13, color: "var(--text-3)" }}>
        Need emergency IT support?{" "}
        <a
          href="tel:+972542167219"
          dir="ltr"
          style={{ color: "#00d4ff", fontWeight: 600, textDecoration: "none" }}
        >
          +972 54 216 7219
        </a>
      </div>
    </div>
  );
}
