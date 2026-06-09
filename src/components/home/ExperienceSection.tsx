'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Shield, Compass, Heart, Award } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import type { Lang } from '@/lib/i18n'

const pillars: Record<Lang, { icon: typeof Compass; title: string; description: string; stat: string }[]> = {
  en: [
    { icon: Compass, title: 'Expert Local Guides', description: 'Every guide is a certified Israeli geographer, historian, or former military tracker. They speak your language — literally. English, Hebrew, and French.', stat: '3 languages' },
    { icon: Shield, title: 'Uncompromising Safety', description: 'Our Jeeps are expedition-grade with satellite communication, full first-aid equipment, and rollover protection. We hold a perfect 15-year safety record.', stat: 'Zero incidents' },
    { icon: Heart, title: 'Genuine Experiences', description: "We don't do tourist traps. We take you to places only locals know — hidden canyons, private viewpoints, and family-run Bedouin camps that aren't on any map.", stat: '100% off-the-beaten-path' },
    { icon: Award, title: 'Award-Winning', description: "TripAdvisor Hall of Fame inductee. Voted #1 Adventure Tour in Israel for four consecutive years. We have the reviews to prove it — 4.9★ from 847 verified travelers.", stat: '4.9★ from 847 reviews' },
  ],
  fr: [
    { icon: Compass, title: 'Guides locaux experts', description: "Chaque guide est un géographe, historien ou ancien pisteur militaire israélien certifié. Ils parlent votre langue — littéralement. Anglais, hébreu et français.", stat: '3 langues' },
    { icon: Shield, title: 'Sécurité irréprochable', description: "Nos Jeeps sont de niveau expédition avec communication satellite, équipement complet de premiers secours et protection anti-retournement. Bilan parfait sur 15 ans.", stat: 'Zéro incident' },
    { icon: Heart, title: 'Expériences authentiques', description: "Nous évitons les pièges à touristes. Nous vous emmenons dans des endroits que seuls les locaux connaissent — canyons cachés, points de vue privés, camps bédouins familiaux.", stat: '100% hors des sentiers battus' },
    { icon: Award, title: 'Primé', description: "Membre du TripAdvisor Hall of Fame. Élu #1 circuit d'aventure en Israël quatre années consécutives. Nos avis parlent d'eux-mêmes — 4.9★ de 847 voyageurs vérifiés.", stat: '4.9★ sur 847 avis' },
  ],
  he: [
    { icon: Compass, title: 'מדריכים מקומיים מומחים', description: 'כל מדריך הוא גיאוגרף, היסטוריון ישראלי מוסמך, או עוקב צבאי לשעבר. הם מדברים בשפה שלך — ממש. אנגלית, עברית וצרפתית.', stat: '3 שפות' },
    { icon: Shield, title: 'בטיחות ללא פשרות', description: 'הג׳יפים שלנו הם ברמת משלחת עם תקשורת לוויינית, ציוד עזרה ראשונה מלא והגנה מפני התהפכות. שיא בטיחות מושלם של 15 שנה.', stat: 'אפס תקריות' },
    { icon: Heart, title: 'חוויות אמיתיות', description: 'אנחנו לא עושים מלכודות תיירים. אנחנו לוקחים אותך למקומות שרק מקומיים מכירים — קניונים נסתרים, נקודות תצפית פרטיות, ומחנות בדואיים משפחתיים שאינם על שום מפה.', stat: '100% מחוץ למסלולים הרגילים' },
    { icon: Award, title: 'זוכה פרסים', description: 'חבר בהיכל התהילה של TripAdvisor. נבחר כסיור ההרפתקאות מספר 1 בישראל ארבע שנים ברציפות. יש לנו את הביקורות להוכיח זאת — 4.9★ מ-847 מטיילים מאומתים.', stat: '4.9★ מ-847 ביקורות' },
  ],
}

export function ExperienceSection() {
  const { t, lang } = useLang()
  const currentPillars = pillars[lang]

  return (
    <section className="py-24 bg-[#1C1108] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #D4A843 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-sm overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <Image
                src="/gallery/montage.png"
                alt="Jeep Safari landscape"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1108]/60 via-transparent to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-[#0A0603] border border-[#D4A843]/20 rounded-sm p-5 shadow-2xl"
            >
              <div className="text-[#D4A843] font-bold text-3xl leading-none" style={{ fontFamily: 'var(--font-playfair)' }}>847+</div>
              <div className="text-[#F5EDD8] text-sm font-medium mt-1">{t.hero_reviews}</div>
              <div className="flex mt-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#D4A843] text-sm">★</span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-4 -left-4 bg-gradient-to-br from-[#D4A843] to-[#C4623A] rounded-sm p-4 shadow-xl shadow-[#D4A843]/20"
            >
              <div className="text-[#0A0603] font-bold text-lg leading-none">15</div>
              <div className="text-[#0A0603]/70 text-xs font-medium">{t.hero_experience}</div>
            </motion.div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="section-divider" />
              <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">{t.experience_eyebrow}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-[#F5EDD8] leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {t.experience_title}
              <br />
              <span className="text-gradient-gold">{t.experience_title2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#A08860] text-base leading-relaxed mb-10"
            >
              {t.experience_intro}
            </motion.p>

            <div className="space-y-7">
              {currentPillars.map((pillar, i) => {
                const Icon = pillar.icon
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                    className="flex gap-4"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-sm bg-[#D4A843]/10 border border-[#D4A843]/20 flex items-center justify-center mt-0.5">
                      <Icon className="w-5 h-5 text-[#D4A843]" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-3 mb-1">
                        <h3 className="text-[#F5EDD8] font-semibold text-base">{pillar.title}</h3>
                        <span className="text-[#D4A843] text-xs font-medium">{pillar.stat}</span>
                      </div>
                      <p className="text-[#7A6245] text-sm leading-relaxed">{pillar.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
