export interface Tour {
  slug: string
  title: string
  subtitle: string
  region: string
  duration: string
  groupSize: string
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme'
  price: number
  currency: string
  rating: number
  reviewCount: number
  image: string
  gallery: string[]
  highlights: string[]
  includes: string[]
  description: string
  shortDescription: string
  badge?: string
  featured: boolean
  languages: string[]
  departure: string
}

export const tours: Tour[] = [
  {
    slug: 'negev-crater-expedition',
    title: 'Negev Crater Expedition',
    subtitle: 'Conquer the Ancient Ramon Crater',
    region: 'Negev Desert',
    duration: 'Full Day (10 hrs)',
    groupSize: '2–12',
    difficulty: 'Moderate',
    price: 490,
    currency: '₪',
    rating: 4.9,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80',
    ],
    highlights: [
      'Descent into Ramon Crater – world\'s largest erosion crater',
      'Ancient Nabataean trade route tracks',
      'Multicolor sand dunes and volcanic rock formations',
      'Private sunset viewpoint with Champagne',
      'Negev Bedouin cultural stop',
    ],
    includes: [
      'Private air-conditioned 4x4 Jeep',
      'Professional bilingual guide',
      'Gourmet picnic lunch',
      'Bottled water & snacks throughout',
      'Professional photography session',
      'Hotel pickup & drop-off (Tel Aviv/Jerusalem)',
    ],
    description:
      'Plunge into the heart of the Negev on our flagship Crater Expedition. The Makhtesh Ramon is not a meteor crater — it\'s something rarer: a geological masterpiece sculpted over 220 million years. Our expert guides take you off the tourist path, deep into colored sand valleys, past Nabataean ruins, and up to viewpoints that will leave you breathless. This is desert immersion at its finest.',
    shortDescription:
      'Descend into the world\'s largest erosion crater for a day of geological wonder and Bedouin culture.',
    badge: 'Most Popular',
    featured: true,
    languages: ['English', 'Hebrew', 'Arabic', 'Russian', 'French', 'Spanish'],
    departure: 'Daily, Year-Round',
  },
  {
    slug: 'golan-heights-wilderness',
    title: 'Golan Heights Wilderness',
    subtitle: 'Ancient Volcanoes & Hidden Waterfalls',
    region: 'Golan Heights',
    duration: 'Full Day (9 hrs)',
    groupSize: '2–10',
    difficulty: 'Moderate',
    price: 520,
    currency: '₪',
    rating: 4.8,
    reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
      'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    ],
    highlights: [
      'Off-road trails through volcanic basalt plateau',
      'Hidden waterfall swim (seasonal)',
      'Panoramic views of Lebanon, Syria, and Jordan',
      'Ancient Crusader fortress ruins',
      'Wild boar and eagle spotting',
    ],
    includes: [
      'Open-top Jeep for maximum immersion',
      'Expert Golan historian-guide',
      'Fresh Middle Eastern lunch spread',
      'Swimming gear & towels (seasonal)',
      'Binoculars for wildlife spotting',
      'Hotel pickup (North Israel / Haifa)',
    ],
    description:
      'The Golan Heights is Israel\'s wild north — a volcanic plateau of ancient lava fields, thundering waterfalls, and sky-high vistas spanning four countries. On this exclusive Jeep expedition, we take you far beyond the tourist zones into places accessible only by 4x4. Your guide is a former IDF Golan unit veteran turned wildlife expert, with unmatched knowledge of every trail, ruin, and secret swimming hole.',
    shortDescription:
      'Volcanic plateaus, hidden waterfalls, and panoramic views over four countries on an unforgettable northern expedition.',
    badge: 'New Route',
    featured: true,
    languages: ['English', 'Hebrew', 'Russian', 'German'],
    departure: 'Daily (Apr–Oct), Weekends (Nov–Mar)',
  },
  {
    slug: 'dead-sea-judean-desert',
    title: 'Dead Sea & Judean Desert',
    subtitle: 'Lowest Point on Earth Journey',
    region: 'Judean Desert',
    duration: 'Full Day (10 hrs)',
    groupSize: '2–8',
    difficulty: 'Easy',
    price: 440,
    currency: '₪',
    rating: 4.9,
    reviewCount: 276,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
      'https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?w=800&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
    ],
    highlights: [
      'Wadi Qelt canyon hike by Jeep',
      'Good Samaritan Road – the original Jericho Road',
      'Dead Sea float – 430m below sea level',
      'Masada sunrise option (upgrade available)',
      'Dead Sea mud mask & mineral spa',
    ],
    includes: [
      'Air-conditioned 4x4 Jeep',
      'Expert Biblical archaeologist guide',
      'Picnic lunch with regional specialties',
      'Dead Sea mineral entry fees',
      'Mud masks & refreshment towels',
      'Jerusalem / Tel Aviv hotel pickup',
    ],
    description:
      'Journey to the lowest place on Earth. The Judean Desert is a landscape of otherworldly beauty — chalk cliffs that glow amber at sunrise, wadi canyons carved by ancient floods, and the silent, glittering expanse of the Dead Sea. This route combines Jeep traversal of off-road canyons with the iconic Dead Sea float experience, packaged into a single extraordinary day.',
    shortDescription:
      'Traverse the otherworldly Judean Desert canyons and float effortlessly in the mineral-rich Dead Sea.',
    badge: 'Family Friendly',
    featured: true,
    languages: ['English', 'Hebrew', 'Arabic', 'French', 'Italian'],
    departure: 'Daily, Year-Round',
  },
  {
    slug: 'galilee-highlands-safari',
    title: 'Galilee Highlands Safari',
    subtitle: 'Ancient Villages & Mountain Trails',
    region: 'Upper Galilee',
    duration: 'Full Day (9 hrs)',
    groupSize: '2–12',
    difficulty: 'Easy',
    price: 410,
    currency: '₪',
    rating: 4.7,
    reviewCount: 143,
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
      'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
    ],
    highlights: [
      'Mount Meron forest trails (1,208m summit)',
      'Ancient Safed mystical city walk',
      'Druze village lunch & hospitality',
      'Waterfall Valley hidden swimming',
      'Hermon foothills panorama',
    ],
    includes: [
      '4x4 Open Jeep with canopy',
      'Local Druze cultural guide',
      'Authentic Druze feast lunch',
      'Hiking gear loan (boots & poles)',
      'Wild herb gathering experience',
      'Haifa / North Israel pickup',
    ],
    description:
      'The Upper Galilee is Israel\'s lush, forested heartland — rolling hills, biblical springs, and villages where time moves slowly. Our Galilee Safari blends off-road mountain driving with cultural immersion: a Druze village feast, ancient Safed mysticism, and forest swimming holes known only to locals. Perfect for those who want adventure with soul.',
    shortDescription:
      'Ancient mystical villages, mountain forests, and authentic Druze hospitality in Israel\'s lush north.',
    badge: undefined,
    featured: false,
    languages: ['English', 'Hebrew', 'Arabic'],
    departure: 'Sunday–Friday',
  },
  {
    slug: 'negev-night-safari',
    title: 'Negev Night Safari',
    subtitle: 'Stars, Silence & the Dark Desert',
    region: 'Negev Desert',
    duration: 'Evening (6 hrs)',
    groupSize: '2–8',
    difficulty: 'Easy',
    price: 320,
    currency: '₪',
    rating: 4.9,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80',
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    ],
    highlights: [
      'Sunset over Negev sand dunes',
      'Dark sky stargazing with telescope',
      'Bedouin campfire dinner',
      'Desert fox & wildlife night spotting',
      'Qumran Caves by flashlight (optional)',
    ],
    includes: [
      'Open-top Jeep with stargazing equipment',
      'Certified astronomer-guide',
      'Traditional Bedouin barbecue dinner',
      'Warm blankets & desert cushions',
      'Hot Bedouin coffee & dates',
      'Beer Sheva / Mitzpe Ramon pickup',
    ],
    description:
      'The Negev at night is one of the most humbling experiences on Earth. Israel\'s southern desert has some of the darkest skies in the Middle East — on clear nights, you can see the Milky Way arc overhead with jaw-dropping clarity. Our Night Safari pairs this astronomical wonder with a Bedouin campfire dinner and expert wildlife spotting. A profoundly different kind of adventure.',
    shortDescription:
      'Watch sunset paint the dunes gold, then lose yourself in the Milky Way over Israel\'s darkest desert skies.',
    badge: 'Couples Favorite',
    featured: false,
    languages: ['English', 'Hebrew', 'Russian', 'French'],
    departure: 'Nightly (May–Oct), Weekends (Nov–Apr)',
  },
  {
    slug: 'extreme-negev-challenge',
    title: 'Extreme Negev Challenge',
    subtitle: 'For the Truly Fearless',
    region: 'Negev Desert',
    duration: 'Full Day (11 hrs)',
    groupSize: '2–6',
    difficulty: 'Extreme',
    price: 690,
    currency: '₪',
    rating: 5.0,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80',
    ],
    highlights: [
      'Technical 4x4 dune driving with coaching',
      'Rappelling & cliff descent in Wadi Zin',
      'Navigate off-trail — no marked paths',
      'Sand dune surfing & sandboarding',
      'Desert survival skills workshop',
    ],
    includes: [
      'Expedition-spec modified Jeep Wrangler',
      'Ex-military desert survival instructor',
      'Full protective gear & helmets',
      'High-protein expedition rations',
      'Satellite communicator (safety)',
      'GoPro helmet camera loan',
    ],
    description:
      'This is not a tour. This is an expedition. Our Extreme Challenge is designed for those who want to push limits in one of the world\'s most demanding environments. No marked trails, no tourist stops, no hand-holding. Your guide is a former special forces desert survival expert. You will drive, rappel, navigate, and sweat — and you will love every second of it.',
    shortDescription:
      'Off-trail Jeep driving, rappelling, and desert survival with an ex-special forces instructor. Not for the faint-hearted.',
    badge: 'Extreme',
    featured: false,
    languages: ['English', 'Hebrew'],
    departure: 'By appointment',
  },
]

export const getFeaturedTours = () => tours.filter((t) => t.featured)
export const getTourBySlug = (slug: string) => tours.find((t) => t.slug === slug)
