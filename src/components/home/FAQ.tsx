'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What should I wear and bring?',
    a: 'Wear comfortable, breathable clothing appropriate for the season. In summer, light cotton + hat + sunscreen. In winter, layered clothing — desert nights get cold. We provide all water, snacks, and specialized gear. Just bring your ID, sunglasses, and a charged camera.',
  },
  {
    q: 'Are the tours suitable for children?',
    a: 'Most tours welcome children aged 6 and up. Our Dead Sea and Galilee routes are particularly family-friendly. The Extreme Negev Challenge is adult-only (18+). We\'re happy to customize any tour for families — just mention kids when booking.',
  },
  {
    q: 'How many people are in a group?',
    a: 'We offer fully private tours — your Jeep, your group, your pace. Standard capacity is 2–12 per vehicle depending on the tour. For larger groups, we deploy multiple Jeeps with coordinated guides. We never mix strangers in a single vehicle.',
  },
  {
    q: 'Can I book a private tour for a special occasion?',
    a: 'Absolutely. We specialize in private proposals, anniversaries, corporate team-building, and VIP experiences. We\'ve organized everything from champagne desert sunsets to full-day private expedition camps. Contact us to design something custom.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Free cancellation up to 48 hours before your tour. Cancellations within 24–48 hours receive a 50% refund. Within 24 hours, no refund is available — but we\'ll work with you to reschedule. No-shows are not refundable.',
  },
  {
    q: 'Are the Jeeps safe? What safety measures do you have?',
    a: 'All our vehicles are expedition-grade 4x4 Jeeps maintained to the highest standards. They\'re equipped with rollover protection, satellite communication, comprehensive first-aid kits, and emergency water reserves. Every guide is certified in desert first aid and wilderness emergency response.',
  },
  {
    q: 'Do you offer airport transfers?',
    a: 'We pick up from any hotel in Tel Aviv, Jerusalem, Haifa, and other major cities. Ben Gurion Airport pickups are available for an additional fee. Just include your accommodation details at booking and we\'ll handle the rest.',
  },
  {
    q: 'What languages do your guides speak?',
    a: 'Our guides collectively speak English, Hebrew, Arabic, Russian, French, Spanish, and German. When booking, specify your preferred language and we\'ll match you with the right guide. All guides are fluent in English as a minimum.',
  },
]

function FAQItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-[#D4A843]/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-start justify-between gap-4 py-5 text-left hover:text-[#D4A843] transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className={`font-medium text-base transition-colors duration-200 ${isOpen ? 'text-[#D4A843]' : 'text-[#F5EDD8]'}`}>
          {q}
        </span>
        <span className="shrink-0 w-6 h-6 rounded-sm border border-[#D4A843]/30 flex items-center justify-center mt-0.5">
          {isOpen ? (
            <Minus className="w-3.5 h-3.5 text-[#D4A843]" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-[#D4A843]" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-[#A08860] text-sm leading-relaxed pb-5 pr-10">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 bg-[#0A0603]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Header + CTA */}
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="section-divider" />
              <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">FAQ</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-[#F5EDD8] leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Got
              <br />
              <span className="text-gradient-gold">Questions?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#7A6245] text-base leading-relaxed mb-8"
            >
              Everything you need to know before your adventure. Still have questions? Our team responds within 30 minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3"
            >
              <a
                href="https://wa.me/972500000000"
                className="flex items-center gap-2 w-full px-5 py-3.5 bg-[#25D366]/15 border border-[#25D366]/25 text-[#25D366] text-sm font-medium rounded-sm hover:bg-[#25D366]/25 transition-colors justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp — replies in &lt;30 min
              </a>
              <a
                href="mailto:hello@desertkings.com"
                className="flex items-center gap-2 w-full px-5 py-3.5 bg-[#D4A843]/08 border border-[#D4A843]/20 text-[#D4A843] text-sm font-medium rounded-sm hover:bg-[#D4A843]/15 transition-colors justify-center"
              >
                Email Our Team
              </a>
            </motion.div>
          </div>

          {/* Right: FAQ list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#1C1108] border border-[#D4A843]/10 rounded-sm px-6 py-2"
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
