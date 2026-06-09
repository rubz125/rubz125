'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MapPin, Phone, Mail, Clock, Check } from 'lucide-react'
import { useLang } from '@/lib/LangContext'

export default function ContactPage() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <Navbar />
      <main className="bg-[var(--bg-base)] min-h-screen">
        {/* Hero */}
        <section className="relative h-[55vh] min-h-[380px] flex items-end">
          <Image
            src="/gallery/contact.jpg"
            alt="Contact Eilat Action"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="section-divider" />
              <span className="text-[var(--sand-light)] text-sm uppercase tracking-[0.2em] font-medium">{t.contact_eyebrow}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
              {t.contact_title}
            </h1>
            <p className="text-white/70 mt-3 max-w-lg">
              {t.contact_subtitle}
            </p>
          </div>
        </section>

        <section className="py-16 bg-[var(--bg-base)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14">
              {/* Contact info */}
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-1)] mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {t.contact_reach}
                </h2>
                <div className="space-y-6 mb-10">
                  {[
                    { icon: Phone, title: t.contact_phone_label, lines: ['+972-52-521-7029', t.contact_phone_hours] },
                    { icon: Mail, title: t.contact_email_label, lines: ['Eilataction@gmail.com', t.contact_email_reply] },
                    { icon: MapPin, title: t.contact_office_label, lines: ['Eilat, Israel', t.contact_office_line2] },
                    { icon: Clock, title: t.contact_hours_label, lines: [t.contact_hours_line1, t.contact_hours_line2] },
                  ].map(({ icon: Icon, title, lines }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-sm bg-[var(--gold-tint-10)] border border-[var(--border-md)] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[var(--gold)]" />
                      </div>
                      <div>
                        <div className="text-[var(--text-1)] font-semibold text-sm mb-1">{title}</div>
                        {lines.map((l) => <div key={l} className="text-[var(--text-4)] text-sm">{l}</div>)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp */}
                <div className="bg-[var(--bg-surface)] border border-[#25D366]/20 rounded-sm p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#25D366]" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="text-[var(--text-1)] font-semibold">{t.contact_whatsapp_title}</span>
                  </div>
                  <p className="text-[var(--text-4)] text-sm mb-3">{t.contact_whatsapp_desc}</p>
                  <a
                    href="https://wa.me/972525217029"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-sm font-medium rounded-sm hover:bg-[#25D366]/25 transition-colors"
                  >
                    {t.contact_whatsapp_btn}
                  </a>
                </div>
              </div>

              {/* Form */}
              <div>
                {sent ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-14 h-14 rounded-full bg-[var(--gold-tint-15)] border border-[var(--border-lg)] flex items-center justify-center mb-5">
                      <Check className="w-7 h-7 text-[var(--gold)]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--text-1)] mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>{t.contact_sent_title}</h3>
                    <p className="text-[var(--text-3)] max-w-sm">{t.contact_sent_desc} <strong className="text-[var(--text-2)]">{form.email}</strong>.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="text-2xl font-bold text-[var(--text-1)] mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>{t.contact_form_title}</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[var(--text-2)] text-sm font-medium mb-2 block">{t.contact_name}</label>
                        <input type="text" required placeholder={t.contact_name_ph} value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-[var(--bg-surface)] border border-[var(--border-md)] text-[var(--text-1)] placeholder-[var(--text-4)] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors" />
                      </div>
                      <div>
                        <label className="text-[var(--text-2)] text-sm font-medium mb-2 block">{t.contact_email_label}</label>
                        <input type="email" required placeholder={t.contact_email_ph} value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-[var(--bg-surface)] border border-[var(--border-md)] text-[var(--text-1)] placeholder-[var(--text-4)] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[var(--text-2)] text-sm font-medium mb-2 block">{t.contact_subject}</label>
                      <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full bg-[var(--bg-surface)] border border-[var(--border-md)] text-[var(--text-1)] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors">
                        <option value="">{t.contact_subject_ph}</option>
                        <option>{t.contact_opt1}</option>
                        <option>{t.contact_opt2}</option>
                        <option>{t.contact_opt3}</option>
                        <option>{t.contact_opt4}</option>
                        <option>{t.contact_opt5}</option>
                        <option>{t.contact_opt6}</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[var(--text-2)] text-sm font-medium mb-2 block">{t.contact_message}</label>
                      <textarea required rows={5} placeholder={t.contact_message_ph} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-[var(--bg-surface)] border border-[var(--border-md)] text-[var(--text-1)] placeholder-[var(--text-4)] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors resize-none" />
                    </div>
                    <button type="submit" className="btn-primary w-full py-4">
                      {t.contact_submit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
