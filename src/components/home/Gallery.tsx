'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/LangContext'

const galleryImages = [
  { src: '/gallery/background3.jpg.jpeg', alt: 'Eilat desert landscape', span: 'row-span-2' },
  { src: '/gallery/DSC03517.jpg.jpeg', alt: 'Jeep safari adventure', span: '' },
  { src: '/gallery/DSC00748.jpg.jpeg', alt: 'Off-road terrain', span: '' },
  { src: '/gallery/IMG_7469.jpg', alt: 'Desert exploration', span: '' },
  { src: '/gallery/IMG_5772.jpg.jpeg', alt: 'Eilat mountains', span: 'row-span-2' },
  { src: '/gallery/DSC02819-1024x576.jpg.jpeg', alt: 'Canyon views', span: '' },
  { src: '/gallery/BALLADE-EN-JEEP-2.jpg.jpeg', alt: 'Jeep ride', span: '' },
  { src: '/gallery/IMG_1730.jpg.jpeg', alt: 'Group adventure', span: '' },
  { src: '/gallery/DSC02821-1024x576.jpg.jpeg', alt: 'Desert dunes', span: '' },
  { src: '/gallery/IMG_3661.jpg.jpeg', alt: 'Sunset safari', span: '' },
  { src: '/gallery/sinai-hardon1.jpg.jpeg', alt: 'Mountain trail', span: '' },
  { src: '/gallery/DSC03558.jpg.jpeg', alt: 'Timna Valley', span: '' },
  { src: '/gallery/DSC03518.jpg.jpeg', alt: 'Jeep trail', span: 'row-span-2' },
  { src: '/gallery/IMG_6323.jpg.jpeg', alt: 'Desert adventure', span: '' },
  { src: '/gallery/IMG_4669.jpg.jpeg', alt: 'Negev safari', span: '' },
  { src: '/gallery/DSC00741.jpg.jpeg', alt: 'Rock formations', span: '' },
  { src: '/gallery/IMG_1191.jpg.jpeg', alt: 'Off-road jeep', span: '' },
  { src: '/gallery/DSC03395.jpg.jpeg', alt: 'Desert canyon', span: '' },
  { src: '/gallery/IMG_3694.jpg.jpeg', alt: 'Mountain pass', span: '' },
  { src: '/gallery/DSC02068-2.jpg.jpeg', alt: 'Jeep expedition', span: '' },
  { src: '/gallery/IMG_8585-1024x683.jpg.jpeg', alt: 'Desert landscape', span: 'row-span-2' },
  { src: '/gallery/DSC03393.jpg.jpeg', alt: 'Rocky terrain', span: '' },
  { src: '/gallery/IMG_4255.jpg.jpeg', alt: 'Safari group', span: '' },
  { src: '/gallery/DSC02090-2.jpg.jpeg', alt: 'Wadi trail', span: '' },
  { src: '/gallery/IMG_3306-1024x683.jpg.jpeg', alt: 'Desert trek', span: '' },
  { src: '/gallery/DSC02407.jpg.jpeg', alt: 'Eilat canyon', span: '' },
  { src: '/gallery/DSC03394-1024x768.jpg.jpeg', alt: 'Desert path', span: '' },
  { src: '/gallery/DSC02091.jpg.jpeg', alt: 'Jeep offroad', span: '' },
  { src: '/gallery/IMG_2071a-1024x683.jpg.jpeg', alt: 'Red Canyon', span: 'row-span-2' },
  { src: '/gallery/DSC00164.jpg.jpeg', alt: 'Negev desert', span: '' },
  { src: '/gallery/DSC01837.jpg.jpeg', alt: 'Desert sunset', span: '' },
  { src: '/gallery/IMG_2869a-.jpg.jpeg', alt: 'Mountain view', span: '' },
  { src: '/gallery/DSC00283.jpg.jpeg', alt: 'Desert rock', span: '' },
  { src: '/gallery/DSC02092.jpg.jpeg', alt: 'Canyon trail', span: '' },
  { src: '/gallery/DSC03765.jpg.jpeg', alt: 'Off-road track', span: '' },
  { src: '/gallery/DSC02065-2.jpg.jpeg', alt: 'Jeep adventure', span: '' },
  { src: '/gallery/IMG_6223.jpg.jpeg', alt: 'Desert bloom', span: '' },
  { src: '/gallery/IMG_2075a.jpg.jpeg', alt: 'Mountain hike', span: '' },
  { src: '/gallery/IMG_3916.jpg.jpeg', alt: 'Eilat coast', span: '' },
  { src: '/gallery/DSC02455.jpg.jpeg', alt: 'Desert dune', span: '' },
  { src: '/gallery/timna_12112013151558.jpg.jpeg', alt: 'Timna Park', span: '' },
  { src: '/gallery/PIC.jpg.jpeg', alt: 'Safari moment', span: '' },
  { src: '/gallery/1.08.09-013.jpg.jpeg', alt: 'Eilat mountains', span: '' },
]

export function Gallery() {
  const { t } = useLang()

  return (
    <section id="gallery" className="py-24 bg-[#0A0603]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="section-divider" />
            <span className="text-[#D4A843] text-sm uppercase tracking-[0.2em] font-medium">{t.gallery_eyebrow}</span>
            <div className="section-divider" style={{ transform: 'scaleX(-1)' }} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-[#F5EDD8]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {t.gallery_title}
            <span className="text-gradient-gold">{t.gallery_title2}</span>
          </motion.h2>
        </div>

        {/* Masonry-style grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3"
          style={{ gridAutoRows: '180px' }}
        >
          {galleryImages.map((img, i) => (
            <div
              key={img.src}
              className={`relative overflow-hidden rounded-sm group cursor-pointer ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-xs font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded-sm">
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Instagram follow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <a
            href="https://instagram.com"
            className="inline-flex items-center gap-2 text-[#D6C9AD] text-sm hover:text-[#D4A843] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Follow us @EilatAction for daily adventure shots
          </a>
        </motion.div>
      </div>
    </section>
  )
}
