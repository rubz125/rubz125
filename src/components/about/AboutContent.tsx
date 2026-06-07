'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Shield, Mountain, Compass, MapPin } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import type { Lang } from '@/lib/i18n'

const content: Record<Lang, {
  eyebrow: string
  quote: string
  quoteAuthor: string
  specialistEyebrow: string
  specialistTitle: string
  specialistSubtitle: string
  p1: string
  p2: string
  p3: string
  desertEyebrow: string
  desertP1: string
  desertP2: string
  desertP3: string
  adventuresEyebrow: string
  adventuresP1: string
  adventuresP2: string
  adventuresHighlight: string
  adventuresEnd: string
  safetyTitle: string
  safetyDesc: string
  safetyItems: string[]
  ctaTitle: string
  ctaDesc: string
  ctaBtn1: string
  ctaBtn2: string
  stats: { icon: typeof Compass; title: string; desc: string }[]
}> = {
  en: {
    eyebrow: 'Our Story',
    quote: 'The courage of a drop of water is that it dares to fall in the desert',
    quoteAuthor: '— Lao She',
    specialistEyebrow: 'The Desert Specialist',
    specialistTitle: 'Didier Uzan —',
    specialistSubtitle: 'Passionate About Every Trail',
    p1: 'Eilat-Action is a desert specialist, organising Jeep excursions in Eilat for many years. Trained alongside the best guides of the Negev, Didier is passionate about the fauna, flora, archaeology, geology, and the wonderful landscapes of this region.',
    p2: 'Day after day he walks the trails and tracks of this majestic, ever-surprising desert — a natural theatre of a history thousands of years old. The Bible cites Eilat as one of the stops of the Children of Israel during the Exodus from Egypt…',
    p3: 'From a short stroll to a 2-day trek, every Jeep outing brings adventure, discovery, escapades and emotion.',
    desertEyebrow: 'Eilat, Between Desert and Sea',
    desertP1: 'Eilat is located at the southern tip of the State of Israel, on the edge of the Negev desert, the Arava valley and the Eilat Mountains, on the shores of the Red Sea and the Gulf of Aqaba, anchored between Egypt and Jordan.',
    desertP2: 'Eilat is an island between the desert and the sea… The Syro-African fault, over 20 million years old, crosses the region, explaining its striking contrasts. The different rocks and minerals dress the mountains in varied colours.',
    desertP3: 'Here, ochre yellow sulphur meets clay green and sandstone pink, while black granite mountains flirt with red iron rocks.',
    adventuresEyebrow: 'A World of Adventures',
    adventuresP1: 'In a 4×4 Land Rover, all roads are open to us. We enter the very heart of the Eilat Mountains, where breathtaking landscapes await… The mountains of Israel, Jordan, Saudi Arabia and the Egyptian Sinai meet in one tableau — and suddenly, the borders disappear…',
    adventuresP2: 'Eilat-Action also offers the full range of attractions: camel rides, water sports, swimming with dolphins, extreme sports — everything is possible.',
    adventuresHighlight: 'Our greatest pleasure is sharing our passion with you.',
    adventuresEnd: 'On the road to a whole world of adventures…',
    safetyTitle: 'Safety is Non-Negotiable',
    safetyDesc: 'Every Eilat Action vehicle is expedition-grade, maintained regularly, and equipped with satellite communication, professional first aid, and desert survival gear. Every guide holds wilderness first responder certification.',
    safetyItems: ['Satellite Comms', 'Wilderness First Aid', 'Rollover Protection', 'Emergency Supplies'],
    ctaTitle: 'Ready to Explore?',
    ctaDesc: 'Browse our tours and find the perfect adventure for your group.',
    ctaBtn1: 'View All Tours',
    ctaBtn2: 'Contact Didier',
    stats: [
      { icon: Compass, title: 'Expert Guide', desc: 'Trained alongside the best Negev guides. Specialist in geology, archaeology, flora & fauna.' },
      { icon: Shield, title: 'Total Safety', desc: 'Expedition-grade Jeep, satellite comms, first aid. Perfect safety record.' },
      { icon: Mountain, title: 'Every Trail', desc: 'Walks the desert every day. Knows every canyon, every colour, every horizon.' },
      { icon: MapPin, title: 'Eilat & Beyond', desc: "Eilat Mountains, Negev, Timna Valley, Red Canyon, Amram's Pillars and more." },
    ],
  },
  fr: {
    eyebrow: 'Notre Histoire',
    quote: "Le courage d'une goutte d'eau, c'est qu'elle ose tomber dans le désert",
    quoteAuthor: '— Lao She',
    specialistEyebrow: 'Spécialiste du Désert',
    specialistTitle: 'Didier Uzan —',
    specialistSubtitle: 'Passionné par Chaque Sentier',
    p1: "Eilat-Action est un spécialiste du désert, organisant des excursions en Jeep à Eilat depuis de nombreuses années. Formé aux côtés des meilleurs guides du Néguev, Didier est passionné par la faune, la flore, l'archéologie, la géologie et les merveilleux paysages de cette région.",
    p2: "Jour après jour, il parcourt les sentiers et les pistes de ce désert majestueux et toujours surprenant — un théâtre naturel d'une histoire vieille de plusieurs millénaires. La Bible cite Eilat comme l'une des étapes des enfants d'Israël lors de l'Exode d'Égypte…",
    p3: "D'une courte promenade à un trek de 2 jours, chaque sortie en Jeep apporte aventure, découverte, escapades et émotion.",
    desertEyebrow: 'Eilat, entre Désert et Mer',
    desertP1: "Eilat est située à la pointe sud de l'État d'Israël, en bordure du désert du Néguev, de la vallée de l'Arava et des monts d'Eilat, sur les rives de la mer Rouge et du golfe d'Aqaba, ancrée entre l'Égypte et la Jordanie.",
    desertP2: "Eilat est une île entre le désert et la mer… La faille syro-africaine, vieille de plus de 20 millions d'années, traverse la région, expliquant ses contrastes saisissants. Les différentes roches et minéraux habillent les montagnes de couleurs variées.",
    desertP3: "Ici, le soufre jaune ocre côtoie le vert argile et le rose grès, tandis que les montagnes de granit noir flirtent avec les roches de fer rouge.",
    adventuresEyebrow: 'Un Monde d\'Aventures',
    adventuresP1: "Dans un Land Rover 4×4, toutes les routes nous sont ouvertes. Nous pénétrons au cœur même des monts d'Eilat, où des paysages à couper le souffle nous attendent… Les montagnes d'Israël, de Jordanie, d'Arabie Saoudite et du Sinaï égyptien se rencontrent en un seul tableau — et soudain, les frontières disparaissent…",
    adventuresP2: "Eilat-Action propose également toute la gamme des attractions : balades à dos de chameau, sports nautiques, nage avec les dauphins, sports extrêmes — tout est possible.",
    adventuresHighlight: 'Notre plus grand plaisir est de partager notre passion avec vous.',
    adventuresEnd: 'En route vers tout un monde d\'aventures…',
    safetyTitle: 'La Sécurité est Non Négociable',
    safetyDesc: "Chaque véhicule Eilat Action est de niveau expédition, entretenu régulièrement, et équipé de communication satellite, de premiers secours professionnels et d'équipement de survie dans le désert.",
    safetyItems: ['Communication Satellite', 'Premiers Secours', 'Protection Anti-Retournement', 'Équipement d\'Urgence'],
    ctaTitle: 'Prêt à Explorer ?',
    ctaDesc: 'Parcourez nos circuits et trouvez l\'aventure parfaite pour votre groupe.',
    ctaBtn1: 'Voir tous les circuits',
    ctaBtn2: 'Contacter Didier',
    stats: [
      { icon: Compass, title: 'Guide Expert', desc: 'Formé aux côtés des meilleurs guides du Néguev. Spécialiste en géologie, archéologie, faune & flore.' },
      { icon: Shield, title: 'Sécurité Totale', desc: 'Jeep de niveau expédition, communication satellite, premiers secours. Bilan parfait.' },
      { icon: Mountain, title: 'Chaque Sentier', desc: 'Parcourt le désert chaque jour. Connaît chaque canyon, chaque couleur, chaque horizon.' },
      { icon: MapPin, title: 'Eilat & Au-delà', desc: "Monts d'Eilat, Néguev, Timna, Canyon Rouge, Colonnes d'Amram et plus encore." },
    ],
  },
  he: {
    eyebrow: 'הסיפור שלנו',
    quote: 'האומץ של טיפת מים הוא שהיא מעיזה ליפול במדבר',
    quoteAuthor: '— לאו שה',
    specialistEyebrow: 'מומחה המדבר',
    specialistTitle: 'דידייה עוזן —',
    specialistSubtitle: 'נלהב מכל שביל',
    p1: 'Eilat Action היא מומחית מדבר, המארגנת סיורי ג׳יפ באילת במשך שנים רבות. מאומן לצד המדריכים הטובים ביותר של הנגב, דידייה נלהב מהחי, הצומח, הארכיאולוגיה, הגיאולוגיה והנופים המדהימים של האזור.',
    p2: 'יום אחר יום הוא עובר את השבילים והמסלולים של המדבר המלכותי והמפתיע תמיד הזה — תיאטרון טבעי של היסטוריה בת אלפי שנים. התנ"ך מציין את אילת כאחת מתחנות בני ישראל במהלך יציאת מצרים…',
    p3: 'מטיול קצר ועד מסע של יומיים, כל יציאה בג׳יפ מביאה הרפתקה, גילוי, בריחה ורגש.',
    desertEyebrow: 'אילת, בין מדבר לים',
    desertP1: 'אילת ממוקמת בקצה הדרומי של מדינת ישראל, על שפת מדבר הנגב, עמק הערבה והרי אילת, על חופי ים סוף ומפרץ עקבה, מעוגנת בין מצרים לירדן.',
    desertP2: 'אילת היא אי בין המדבר לים… השבר הסורי-אפריקאי, בן יותר מ-20 מיליון שנה, חוצה את האזור ומסביר את הניגודים הבולטים שלו. הסלעים והמינרלים השונים מלבישים את ההרים בצבעים מגוונים.',
    desertP3: 'כאן, הגופרית הצהובה-אוקר פוגשת את הירוק-חרסית ואת ורוד-האבן, בעוד הרי גרניט שחורים מתחברים עם סלעי ברזל אדומים.',
    adventuresEyebrow: 'עולם של הרפתקאות',
    adventuresP1: 'ב-4×4 לנד רובר, כל הדרכים פתוחות לפנינו. אנו נכנסים ללב הרי אילת, שם מחכים נופים מדהימים… הרי ישראל, ירדן, ערב הסעודית והסיני המצרי נפגשים בתמונה אחת — ופתאום, הגבולות נעלמים…',
    adventuresP2: 'Eilat Action מציעה גם את מגוון המלא של אטרקציות: רכיבה על גמלים, ספורט מים, שחייה עם דולפינים, ספורט קיצוני — הכל אפשרי.',
    adventuresHighlight: 'ההנאה הגדולה ביותר שלנו היא לשתף אתכם בתשוקה שלנו.',
    adventuresEnd: 'בדרך לעולם שלם של הרפתקאות…',
    safetyTitle: 'הבטיחות אינה מתפשרת',
    safetyDesc: 'כל רכב של Eilat Action הוא ברמת משלחת, מתוחזק באופן קבוע, ומצויד בתקשורת לוויינית, עזרה ראשונה מקצועית וציוד הישרדות במדבר.',
    safetyItems: ['תקשורת לוויינית', 'עזרה ראשונה', 'הגנה מפני התהפכות', 'ציוד חירום'],
    ctaTitle: 'מוכן לחקור?',
    ctaDesc: 'עיין בסיורים שלנו ומצא את ההרפתקה המושלמת עבור הקבוצה שלך.',
    ctaBtn1: 'כל הסיורים',
    ctaBtn2: 'צור קשר עם דידייה',
    stats: [
      { icon: Compass, title: 'מדריך מומחה', desc: 'מאומן לצד המדריכים הטובים ביותר של הנגב. מומחה בגיאולוגיה, ארכיאולוגיה, חי וצומח.' },
      { icon: Shield, title: 'בטיחות מוחלטת', desc: 'ג׳יפ ברמת משלחת, תקשורת לוויינית, עזרה ראשונה. שיא בטיחות מושלם.' },
      { icon: Mountain, title: 'כל שביל', desc: 'עובר את המדבר כל יום. מכיר כל קניון, כל צבע, כל אופק.' },
      { icon: MapPin, title: 'אילת ומעבר', desc: 'הרי אילת, נגב, טימנה, קניון אדום, עמודי אמרם ועוד.' },
    ],
  },
}

export function AboutContent() {
  const { lang } = useLang()
  const c = content[lang]
  const dir = lang === 'he' ? 'rtl' : 'ltr'

  return (
    <main className="pt-20" dir={dir}>

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end">
        <Image
          src="/gallery/sunshine.jpeg"
          alt="Eilat Action Jeep Safari"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0603] via-black/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-divider" />
            <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">{c.eyebrow}</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#F5EDD8]" style={{ fontFamily: 'var(--font-playfair)' }}>
            About Eilat Action
          </h1>
        </div>
      </section>

      {/* Opening quote */}
      <section className="py-16 bg-[#0A0603]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote>
            <div className="text-[#D4A843] text-6xl font-serif leading-none mb-4 opacity-40">"</div>
            <p className="text-2xl sm:text-3xl text-[#F5EDD8] italic leading-relaxed mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              {c.quote}
            </p>
            <footer className="text-[#7A6245] text-sm tracking-wider uppercase">{c.quoteAuthor}</footer>
          </blockquote>
        </div>
      </section>

      {/* The Desert Specialist — photo + text */}
      <section className="py-20 bg-[#1C1108]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Photo of Didier */}
            <div className="relative rounded-sm overflow-hidden shadow-2xl shadow-black/50" style={{ aspectRatio: '4/5' }}>
              <Image
                src="/gallery/Didier.jpg"
                alt="Didier Uzan — Eilat Action"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0603]/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-[#F5EDD8] font-bold text-xl" style={{ fontFamily: 'var(--font-playfair)' }}>Didier Uzan</div>
                <div className="text-[#D4A843] text-sm">Eilat Action — Founder & Guide</div>
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="section-divider" />
                <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">{c.specialistEyebrow}</span>
              </div>
              <h2 className="text-4xl font-bold text-[#F5EDD8] mb-8 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                {c.specialistTitle}<br />
                <span style={{ background: 'linear-gradient(135deg, #F2C464, #D4A843)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {c.specialistSubtitle}
                </span>
              </h2>
              <div className="space-y-5 text-[#A08860] leading-relaxed mb-10">
                <p>{c.p1}</p>
                <p>{c.p2}</p>
                <p>{c.p3}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {c.stats.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="bg-[#0A0603] border border-[#D4A843]/10 rounded-sm p-4">
                    <Icon className="w-5 h-5 text-[#D4A843] mb-2" />
                    <div className="text-[#F5EDD8] font-semibold text-sm mb-1">{title}</div>
                    <div className="text-[#7A6245] text-xs leading-relaxed">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eilat between desert and sea + Adventures */}
      <section className="py-20 bg-[#0A0603]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="section-divider" />
                <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">{c.desertEyebrow}</span>
              </div>
              <div className="space-y-5 text-[#A08860] leading-relaxed">
                <p>{c.desertP1}</p>
                <p>{c.desertP2}</p>
                <p>{c.desertP3}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="section-divider" />
                <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">{c.adventuresEyebrow}</span>
              </div>
              <div className="space-y-5 text-[#A08860] leading-relaxed">
                <p>{c.adventuresP1}</p>
                <p>{c.adventuresP2}</p>
                <p className="text-[#D4A843] italic">{c.adventuresHighlight}</p>
                <p className="text-[#F5EDD8] font-medium">{c.adventuresEnd}</p>
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
            {c.safetyTitle}
          </h2>
          <p className="text-[#A08860] mb-8">{c.safetyDesc}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {c.safetyItems.map((item) => (
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
            {c.ctaTitle}
          </h2>
          <p className="text-[#7A6245] mb-8">{c.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours" className="btn-primary">{c.ctaBtn1}</Link>
            <Link href="/contact" className="btn-secondary">{c.ctaBtn2}</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
