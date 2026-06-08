import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import ITDiagram from "@/components/ITDiagram";
import Cybersecurity from "@/components/Cybersecurity";
import M365 from "@/components/M365";
import Cloud from "@/components/Cloud";
import CCTV from "@/components/CCTV";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <Services />
        <ITDiagram />
        <Cybersecurity />
        <M365 />
        <Cloud />
        <CCTV />
        <Stats />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
