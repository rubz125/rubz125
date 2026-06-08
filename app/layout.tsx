import type { Metadata } from "next";
import { Inter, Epilogue } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../contexts/AppContext";
import SkipLink from "../components/SkipLink";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const epilogue = Epilogue({ subsets: ["latin"], weight: ["400","600","700","800","900"], variable: "--font-epilogue", display: "swap" });

const SITE_URL = "https://rubzlar.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RUB – Enterprise IT, Cloud & Security Solutions | Israel",
    template: "%s | RUB IT Solutions",
  },
  description: "Enterprise IT support, Microsoft 365, Cybersecurity, Cloud Infrastructure & CCTV in Israel. 24/7 support by Ruben Uzan. Call +972 54 216 7219.",
  keywords: ["IT Support Israel", "Managed IT Services", "Microsoft 365", "Cybersecurity", "CCTV", "Cloud Solutions", "Israel IT", "תמיכת IT"],
  authors: [{ name: "Ruben Uzan", url: SITE_URL }],
  creator: "Ruben Uzan",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_IL",
    alternateLocale: ["he_IL", "fr_FR"],
    url: SITE_URL,
    siteName: "RUB IT Solutions",
    title: "RUB – Enterprise IT, Cloud & Security Solutions | Israel",
    description: "Enterprise IT Support, Microsoft 365, Cybersecurity & Cloud in Israel. 24/7 by Ruben Uzan +972 54 216 7219.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RUB IT Solutions – Enterprise IT, Cloud & Security",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RUB – Enterprise IT, Cloud & Security | Israel",
    description: "Enterprise IT support, Microsoft 365, Cybersecurity & Cloud. 24/7 by Ruben Uzan.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en": SITE_URL,
      "fr": SITE_URL,
      "he": SITE_URL,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      "name": "RUB IT Solutions",
      "description": "Enterprise IT support, Microsoft 365, Cybersecurity, Cloud Infrastructure and CCTV services in Israel.",
      "url": SITE_URL,
      "telephone": "+972-54-216-7219",
      "email": "rubenuzan11@gmail.com",
      "founder": {
        "@type": "Person",
        "name": "Ruben Uzan",
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IL",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "addressCountry": "Israel",
      },
      "openingHours": "Mo-Su 00:00-24:00",
      "priceRange": "$$",
      "areaServed": {
        "@type": "Country",
        "name": "Israel",
      },
      "sameAs": [
        `https://wa.me/972542167219`,
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "IT Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Managed IT Services" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Microsoft 365" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cloud Infrastructure" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cybersecurity" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CCTV Installation" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Backup & Disaster Recovery" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Network Infrastructure" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Helpdesk Support" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "RUB IT Solutions",
      "description": "Enterprise IT, Cloud & Security Solutions in Israel",
      "publisher": { "@id": `${SITE_URL}/#business` },
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/#services` },
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${epilogue.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
      </head>
      <body style={{ background: "var(--bg-1)", color: "var(--text-1)", overflowX: "hidden", minHeight: "100vh", fontFamily: "var(--font-inter)", WebkitFontSmoothing: "antialiased" }}>
        <SkipLink />
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
