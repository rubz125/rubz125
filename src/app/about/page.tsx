import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Shield, Award, Globe, Mountain } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Eilat Action is Israel\'s most awarded Jeep Safari company, founded in 2009. Expert local guides, private tours, and a perfect safety record across 15 years.',
}

const team = [
  {
    name: 'Avi Ben-David',
    role: 'Founder & Chief Guide',
    specialty: 'Negev Desert / Geology',
    bio: 'Former IDF trackers unit. PhD in Desert Ecology. 20 years off-road driving. Speaks 5 languages.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Miriam Katz',
    role: 'Head of Operations',
    specialty: 'Galilee & Golan',
    bio: 'Grew up on a kibbutz in the Upper Galilee. Expert in northern trails and Druze culture.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
  {
    name: 'Omar Al-Rashid',
    role: 'Senior Guide',
    specialty: 'Judean Desert / Bedouin Culture',
    bio: 'Third-generation Bedouin desert guide. Expert in traditional navigation and desert survival.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Natasha Volkov',
    role: 'Guest Experience',
    specialty: 'Multi-day Expeditions',
    bio: 'Former luxury travel concierge. Fluent in Russian, English, and Hebrew. Specializes in VIP experiences.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
]

const timeline = [
  { year: '2009', event: 'Eilat Action founded with one Jeep and a dream' },
  { year: '2011', event: 'First TripAdvisor Certificate of Excellence' },
  { year: '2013', event: 'Expanded to Golan Heights routes' },
  { year: '2016', event: 'Voted #1 Adventure Tour in Israel' },
  { year: '2018', event: 'TripAdvisor Hall of Fame inductee' },
  { year: '2020', event: 'Launched Night Safari route' },
  { year: '2022', event: '10,000th guest milestone' },
  { year: '2024', event: '15 years — 12,000+ guests, zero incidents' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[380px] flex items-end">
          <Image
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80"
            alt="Eilat Action landscape"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0603] via-black/50 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="section-divider" />
              <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">Our Story</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-[#F5EDD8]" style={{ fontFamily: 'var(--font-playfair)' }}>
              About Eilat Action
            </h1>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-[#0A0603]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-[#F5EDD8] mb-6 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                  We Built This Company
                  <br />
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #F2C464, #D4A843)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Because We Were Frustrated
                  </span>
                </h2>
                <div className="space-y-4 text-[#A08860] leading-relaxed">
                  <p>
                    In 2009, Avi Ben-David — former IDF tracker, desert ecologist, and lifelong Negev wanderer — took his family on a "reputable" Jeep tour of the desert. They spent two hours on a crowded, paved road with 30 strangers, listening to a bored guide recite Wikipedia facts.
                  </p>
                  <p>
                    He came home and started Eilat Action.
                  </p>
                  <p>
                    Fifteen years later, we've guided over 12,000 guests from 60+ countries through Israel's most extraordinary landscapes. Every tour is private. Every guide is passionate. Every route is designed to show you something you couldn't find on your own.
                  </p>
                  <p>
                    We don't compete on price. We compete on experience. If you want cheap, there are plenty of bus tours. If you want unforgettable, you're in the right place.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Award, title: 'Hall of Fame', desc: 'TripAdvisor 4× Certificate of Excellence winner' },
                  { icon: Shield, title: 'Zero Incidents', desc: '15 years of perfect safety record' },
                  { icon: Globe, title: '60+ Countries', desc: 'Guests from every corner of the world' },
                  { icon: Mountain, title: '6 Unique Routes', desc: 'From easy to extreme across all of Israel' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="bg-[#1C1108] border border-[#D4A843]/10 rounded-sm p-5">
                    <Icon className="w-6 h-6 text-[#D4A843] mb-3" />
                    <div className="text-[#F5EDD8] font-semibold mb-1">{title}</div>
                    <div className="text-[#7A6245] text-xs">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-[#1C1108]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#F5EDD8] mb-12" style={{ fontFamily: 'var(--font-playfair)' }}>15 Years of Adventure</h2>
            <div className="relative">
              <div className="absolute left-16 top-0 bottom-0 w-px bg-[#D4A843]/20" />
              <div className="space-y-6">
                {timeline.map((item) => (
                  <div key={item.year} className="flex items-center gap-6">
                    <div className="w-16 shrink-0 text-right">
                      <span className="text-[#D4A843] font-bold text-sm">{item.year}</span>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[#D4A843] shrink-0 relative z-10" />
                    <div className="text-[#A08860] text-sm">{item.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="guides" className="py-20 bg-[#0A0603]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#F5EDD8] mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>Our Guides</h2>
            <p className="text-[#7A6245] mb-12 max-w-xl">Each guide is a certified expert in their region — not just a driver, but a storyteller, naturalist, and local historian.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.name} className="group">
                  <div className="relative rounded-sm overflow-hidden mb-4" style={{ aspectRatio: '3/4' }}>
                    <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0603]/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="inline-block px-2 py-1 bg-[#D4A843]/20 border border-[#D4A843]/30 text-[#D4A843] text-[11px] font-medium rounded-sm mb-1">
                        {member.specialty}
                      </div>
                    </div>
                  </div>
                  <div className="text-[#F5EDD8] font-semibold">{member.name}</div>
                  <div className="text-[#7A6245] text-xs mb-2">{member.role}</div>
                  <p className="text-[#7A6245] text-xs leading-relaxed">{member.bio}</p>
                </div>
              ))}
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
              Every Eilat Action vehicle is expedition-grade, maintained monthly, and equipped with satellite communication, professional first aid, and desert survival gear. Every guide holds wilderness first responder certification. We have operated for 15 years without a single incident.
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
            <h2 className="text-3xl font-bold text-[#F5EDD8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Ready to Explore?</h2>
            <p className="text-[#7A6245] mb-8">Browse our tours and find the perfect adventure for your group.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tours" className="btn-primary">View All Tours</Link>
              <Link href="/book" className="btn-secondary">Book Directly</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
