import type { Metadata } from "next";
import { Inter, Epilogue } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const epilogue = Epilogue({ subsets: ["latin"], weight: ["400","600","700","800","900"], variable: "--font-epilogue" });

export const metadata: Metadata = {
  title: "RUB – Enterprise IT, Cloud & Security Solutions | Israel",
  description: "Enterprise IT support, Microsoft 365, Cybersecurity, Cloud & CCTV in Israel. 24/7 support by Ruben Uzan. Call +972 54 216 7219.",
  keywords: "IT Support Israel, Managed IT Services, Microsoft 365, Cybersecurity, CCTV, Cloud Solutions",
  openGraph: {
    title: "RUB – Enterprise IT, Cloud & Security Solutions",
    description: "Enterprise IT Support, Microsoft 365, Cybersecurity & Cloud in Israel.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${epilogue.variable}`}>
      <body className="min-h-screen bg-[#0d1526] text-[#e8f0fe] font-[family-name:var(--font-inter)] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
