import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Shield, Mountain, Compass, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us — Eilat Action',
  description:
    'Didier Uzan, desert specialist and expert Jeep guide in Eilat. Discover the Eilat Mountains, Negev desert, geology, fauna, flora and thousands of years of history.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <section className="relative h-[55vh] min-h-[400px] flex items-end">
          <Image
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80"
            alt="Eilat Mountains desert landscape"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0603] via-black/40 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="section-divider" />
              <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">Our Story</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-[#F5EDD8]" style={{ fontFamily: 'var(--font-playfair)' }}>
              About Eilat Action
            </h1>
          </div>
        </section>

        {/* Opening quote */}
        <section className="py-16 bg-[#0A0603]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <blockquote className="relative">
              <div className="text-[#D4A843] text-6xl font-serif leading-none mb-4 opacity-40">"</div>
              <p className="text-2xl sm:text-3xl text-[#F5EDD8] italic leading-relaxed mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                The courage of a drop of water is that it dares to fall in the desert
              </p>
              <footer className="text-[#7A6245] text-sm tracking-wider uppercase">— Lao She</footer>
            </blockquote>
          </div>
        </section>

        {/* The Desert Specialist */}
        <section className="py-20 bg-[#1C1108]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="section-divider" />
                  <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">The Desert Specialist</span>
                </div>
                <h2 className="text-4xl font-bold text-[#F5EDD8] mb-8 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Didier Uzan —<br />
                  <span style={{ background: 'linear-gradient(135deg, #F2C464, #D4A843)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Passionate About Every Trail
                  </span>
                </h2>
                <div className="space-y-5 text-[#A08860] leading-relaxed">
                  <p>
                    Eilat-Action is a desert specialist, organising Jeep excursions in Eilat for many years. Trained alongside the best guides of the Negev, Didier is passionate about the fauna, flora, archaeology, geology, and the wonderful landscapes of this region.
                  </p>
                  <p>
                    Day after day he walks the trails and tracks of this majestic, ever-surprising desert — a natural theatre of a history thousands of years old. The Bible cites Eilat as one of the stops of the Children of Israel during the Exodus from Egypt…
                  </p>
                  <p>
                    From a short stroll to a 2-day trek, every Jeep outing brings adventure, discovery, escapades and emotion.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Compass, title: 'Expert Guide', desc: 'Trained alongside the best Negev guides. Specialist in geology, archaeology, flora & fauna.' },
                  { icon: Shield, title: 'Total Safety', desc: 'Expedition-grade Jeep, satellite comms, first aid. Perfect safety record.' },
                  { icon: Mountain, title: 'Every Trail', desc: 'Walks the desert every day. Knows every canyon, every colour, every horizon.' },
                  { icon: MapPin, title: 'Eilat & Beyond', desc: 'Eilat Mountains, Negev, Timna Valley, Red Canyon, Amram\'s Pillars and more.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="bg-[#0A0603] border border-[#D4A843]/10 rounded-sm p-5">
                    <Icon className="w-6 h-6 text-[#D4A843] mb-3" />
                    <div className="text-[#F5EDD8] font-semibold mb-1">{title}</div>
                    <div className="text-[#7A6245] text-xs leading-relaxed">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Eilat, between desert and sea */}
        <section className="py-20 bg-[#0A0603]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="section-divider" />
                  <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">Eilat, Between Desert and Sea</span>
                </div>
                <div className="space-y-5 text-[#A08860] leading-relaxed">
                  <p>
                    Eilat is located at the southern tip of the State of Israel, on the edge of the Negev desert, the Arava valley and the Eilat Mountains, on the shores of the Red Sea and the Gulf of Aqaba, anchored between Egypt and Jordan.
                  </p>
                  <p>
                    Eilat is an island between the desert and the sea… The Syro-African fault, over 20 million years old, crosses the region, explaining its striking contrasts. The different rocks and minerals dress the mountains in varied colours.
                  </p>
                  <p>
                    Here, ochre yellow sulphur meets clay green and sandstone pink, while black granite mountains flirt with red iron rocks.
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="section-divider" />
                  <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">A World of Adventures</span>
                </div>
                <div className="space-y-5 text-[#A08860] leading-relaxed">
                  <p>
                    In a 4×4 Land Rover, all roads are open to us. We enter the very heart of the Eilat Mountains, where breathtaking landscapes await… The mountains of Israel, Jordan, Saudi Arabia and the Egyptian Sinai meet in one tableau — and suddenly, the borders disappear…
                  </p>
                  <p>
                    Eilat-Action also offers the full range of attractions: camel rides, water sports, swimming with dolphins, extreme sports — everything is possible.
                  </p>
                  <p className="text-[#D4A843] italic">
                    Our greatest pleasure is sharing our passion with you.
                  </p>
                  <p className="text-[#F5EDD8] font-medium">
                    On the road to a whole world of adventures…
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety */}
        <section id="safety" className="py-20 bg-[#1C1108]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Shield className="w-12 h-12 text-[#D4A843] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-[#F5EDD8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Safety is Non-Negotiable
            </h2>
            <p className="text-[#A08860] mb-8">
              Every Eilat Action vehicle is expedition-grade, maintained regularly, and equipped with satellite communication, professional first aid, and desert survival gear. Every guide holds wilderness first responder certification.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['Satellite Comms', 'Wilderness First Aid', 'Rollover Protection', 'Emergency Supplies'].map((item) => (
                <div key={item} className="bg-[#0A0603] border border-[#D4A843]/10 rounded-sm p-4 text-center">
                  <div className="text-green-400 text-xl mb-2">✓</div>
                  <div className="text-[#D6C9AD] text-xs font-medium">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#0A0603] border-t border-[#D4A843]/10">
          <div className="max-w-xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#F5EDD8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Ready to Explore?
            </h2>
            <p className="text-[#7A6245] mb-8">
              Browse our tours and find the perfect adventure for your group.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tours" className="btn-primary">View All Tours</Link>
              <Link href="/contact" className="btn-secondary">Contact Didier</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
