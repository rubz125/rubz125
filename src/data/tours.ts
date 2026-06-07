export interface Tour {
  slug: string
  title: string
  titleFr: string
  titleHe: string
  subtitle: string
  subtitleFr: string
  subtitleHe: string
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
  highlightsFr: string[]
  highlightsHe: string[]
  includes: string[]
  includesFr: string[]
  includesHe: string[]
  description: string
  descriptionFr: string
  descriptionHe: string
  shortDescription: string
  shortDescriptionFr: string
  shortDescriptionHe: string
  badge?: string
  featured: boolean
  languages: string[]
  departure: string
}

export const tours: Tour[] = [
  {
    slug: 'decouverte-des-monts-deilat',

    title: 'Discovering the Eilat Mountains',
    titleFr: 'Découverte des Monts d\'Eilat',
    titleHe: 'גילוי הרי אילת',

    subtitle: 'Jeep Safari Through Ancient Desert Peaks',
    subtitleFr: 'Randonnée en Jeep dans les Montagnes d\'Eilat',
    subtitleHe: 'ספארי ג\'יפ בהרי המדבר העתיקים',

    region: 'Eilat Mountains',
    duration: 'Half Day (2.5 hrs)',
    groupSize: '2–24',
    difficulty: 'Easy',
    price: 120,
    currency: '₪',
    rating: 4.9,
    reviewCount: 312,

    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
      'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80',
    ],

    highlights: [
      'Top of Mount Yoach — panoramic view of 3 countries (Israel, Jordan, Egypt)',
      'Breathtaking views of the Sinai Desert and the Bay of Eilat',
      'Ibexes, gazelles and desert lizards in their natural reserve',
      'Jeep tracks through Nahal Roded and Nahal Shlomo',
      'Sunset campfire with lafotes (flatbread) and homemade hummus',
    ],
    highlightsFr: [
      'Sommet du Mont Yoach — panorama sur 3 pays (Israël, Jordanie, Égypte)',
      'Vue imprenable sur le désert du Sinaï et la baie d\'Eilat',
      'Bouquetins, gazelles et dragons du désert dans leur réserve naturelle',
      'Pistes en jeep dans le Nahal Roded et le Nahal Shlomo',
      'Coucher de soleil avec feu de camp, lafotes et houmous maison',
    ],
    highlightsHe: [
      'פסגת הר יואב — פנורמה על 3 מדינות (ישראל, ירדן, מצרים)',
      'נוף מרהיב על מדבר סיני ומפרץ אילת',
      'יעלים, צבאים ורצים במדבר בשמורת הטבע שלהם',
      'מסלולי ג\'יפ בנחל רודד ונחל שלמה',
      'שקיעה עם מדורה, לאפות ות וחומוס ביתי',
    ],

    includes: [
      '4x4 Jeep with professional bilingual guide',
      'Hotel pickup and drop-off in Eilat',
      'Lafotes (flatbread) cooked on a wood fire',
      'Homemade hummus seasoned with olive oil and zaatar',
      'Tea and cakes at a desert stop',
    ],
    includesFr: [
      'Jeep 4x4 avec guide professionnel bilingue',
      'Navette aller-retour depuis votre hôtel à Eilat',
      'Lafotes (pain plat) cuits au feu de bois',
      'Houmous maison assaisonné à l\'huile d\'olive et za\'atar',
      'Thé et gâteaux à une halte dans le désert',
    ],
    includesHe: [
      'ג\'יפ 4x4 עם מדריך מקצועי דו-לשוני',
      'הסעה הלוך ושוב מהמלון שלך באילת',
      'לאפות אפויות על אש עצים',
      'חומוס ביתי עם שמן זית וזעתר',
      'תה ועוגות בעצירה במדבר',
    ],

    description:
      'Enter the desert by way of Nahal Roded or Nahal Shlomo and immerse yourself in the wild landscapes surrounding Eilat. Your guide leads the convoy of jeeps through dried riverbeds, valleys, geological faults, hills and mountains, stopping at sites of geological, historical and archaeological interest along the way. Reaching the summit of Mount Yoach, you\'ll be rewarded with a breathtaking panorama spanning three countries — Israel, Jordan and Egypt — with the Sinai Desert stretching before you and the Bay of Eilat glittering below. During stops, discover the rich fauna and flora of the Eilat desert: ibexes and gazelles graze among the rocks, rare desert lizards sun themselves on boulders, and at nightfall the lucky may spot wolves, hyenas or caracals. As the sun melts into the Sinai, the convoy reaches a desert camp where a wood fire crackles to life. Freshly baked lafotes with homemade hummus, olive oil and zaatar are served under a sky blazing with colour — a taste of the real desert.',

    descriptionFr:
      'Pénétrez dans le désert par le Nahal Roded ou le Nahal Shlomo et plongez dans les paysages sauvages qui entourent Eilat. Votre guide conduit le convoi de jeeps à travers des lits de rivières asséchés, des vallées, des failles géologiques, des collines et des montagnes, avec des arrêts sur des sites d\'intérêt géologique, historique et archéologique. En atteignant le sommet du Mont Yoach, vous serez récompensés par un panorama à couper le souffle sur trois pays — Israël, la Jordanie et l\'Égypte — avec le désert du Sinaï s\'étirant devant vous et la baie d\'Eilat scintillant en contrebas. Lors des haltes, découvrez la faune et la flore riches du désert d\'Eilat : bouquetins et gazelles broutent entre les rochers, des dragons du désert s\'exposent au soleil sur les pierres, et à la tombée de la nuit, les chanceux pourront apercevoir des loups, des hyènes ou des caracals. Alors que le soleil se fond dans le Sinaï, le convoi rejoint un camp dans le désert où un feu de bois crépite. Des lafotes fraîchement cuites avec du houmous maison, de l\'huile d\'olive et du za\'atar sont servies sous un ciel incandescent — un vrai avant-goût du désert authentique.',

    descriptionHe:
      'היכנסו למדבר דרך נחל רודד או נחל שלמה וצללו אל הנופים הפראיים שסביב אילת. המדריך שלכם מוביל את שיירת הג\'יפים דרך ערוצי נחלים יבשים, עמקים, שברים גיאולוגיים, גבעות והרים, עם עצירות באתרי עניין גיאולוגי, היסטורי וארכיאולוגי לאורך הדרך. כשמגיעים לפסגת הר יואב, תזכו לפנורמה עוצרת נשימה על שלוש מדינות — ישראל, ירדן ומצרים — כשמדבר סיני משתרע לפניכם ומפרץ אילת מנצנץ למטה. בעצירות, גלו את הפאונה והפלורה העשירות של מדבר אילת: יעלים וצבאים רועים בין הסלעים, לטאות מדבר נדירות מתחממות בשמש על הסלעים, ובשקיעה המזל עשוי לגלות זאבים, צבועים או קרקלים. כשהשמש שוקעת אל תוך סיני, השיירה מגיעה למחנה מדברי שם מדורה מתלקחת לחיים. לאפות טריות עם חומוס ביתי, שמן זית וזעתר מוגשות תחת שמיים בוערים בצבע — טעימה אמיתית של המדבר האותנטי.',

    shortDescription: 'Jeep safari through the Eilat Mountains to the summit of Mount Yoach, with views over Israel, Jordan and Egypt at sunset.',
    shortDescriptionFr: 'Safari en jeep dans les monts d\'Eilat jusqu\'au sommet du Mont Yoach, avec vue sur Israël, la Jordanie et l\'Égypte au coucher du soleil.',
    shortDescriptionHe: 'ספארי ג\'יפ בהרי אילת עד פסגת הר יואב, עם נוף על ישראל, ירדן ומצרים בשקיעה.',

    badge: 'Best Seller',
    featured: true,
    languages: ['English', 'French', 'Hebrew', 'Arabic', 'Russian'],
    departure: 'Daily, Year-Round',
  },
]

export const getFeaturedTours = () => tours.filter((t) => t.featured)
export const getTourBySlug = (slug: string) => tours.find((t) => t.slug === slug)
