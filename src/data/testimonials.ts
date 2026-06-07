export interface Testimonial {
  id: string
  name: string
  location: string
  country: string
  flag: string
  tour: string
  rating: number
  text: string
  avatar: string
  date: string
  verified: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    location: 'New York, USA',
    country: 'United States',
    flag: '🇺🇸',
    tour: 'Negev Crater Expedition',
    rating: 5,
    text: 'Absolutely life-changing. Our guide Avi knew every hidden canyon, every story, every perfect photo spot. The crater at sunset looked like something from another planet. We\'ve done safaris in Kenya and Tanzania — this stands alongside the very best.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    date: 'March 2024',
    verified: true,
  },
  {
    id: '2',
    name: 'James & Emma Thornton',
    location: 'London, UK',
    country: 'United Kingdom',
    flag: '🇬🇧',
    tour: 'Golan Heights Wilderness',
    rating: 5,
    text: 'We were celebrating our anniversary and Eilat Action made it absolutely magical. The private waterfall stop they arranged, the champagne at the summit viewpoint — they thought of everything. The Jeep felt incredibly safe even on the most technical trails. Worth every shekel.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    date: 'July 2024',
    verified: true,
  },
  {
    id: '3',
    name: 'Dr. Rami Khalil',
    location: 'Dubai, UAE',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    tour: 'Dead Sea & Judean Desert',
    rating: 5,
    text: 'I\'ve done desert safaris in Oman, Saudi Arabia, and Morocco. The Judean Desert route hit differently — the historical depth, the otherworldly canyon landscapes, and the professionalism of the team was exceptional. The guide spoke perfect Arabic. Already booked the Night Safari for my next trip.',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&q=80',
    date: 'January 2024',
    verified: true,
  },
  {
    id: '4',
    name: 'Yuki Tanaka',
    location: 'Tokyo, Japan',
    country: 'Japan',
    flag: '🇯🇵',
    tour: 'Negev Night Safari',
    rating: 5,
    text: 'The Milky Way over the Negev was more stunning than Iceland. Our guide set up the telescope and spent two hours teaching us the night sky. Then the Bedouin dinner under the stars — I cried. This is one of those rare experiences that becomes a core memory.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    date: 'September 2023',
    verified: true,
  },
  {
    id: '5',
    name: 'Marco Rossi',
    location: 'Milan, Italy',
    country: 'Italy',
    flag: '🇮🇹',
    tour: 'Galilee Highlands Safari',
    rating: 5,
    text: 'The Druze village lunch alone was worth the trip — the hospitality was like nothing I\'ve experienced. But the mountain trails through the forest, the waterfall swim, and the view from Meron summit... we were talking about it for weeks after. Eilat Action understands what luxury adventure really means.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    date: 'May 2024',
    verified: true,
  },
  {
    id: '6',
    name: 'Rachel Cohen',
    location: 'Eilat, Israel',
    country: 'Israel',
    flag: '🇮🇱',
    tour: 'Extreme Negev Challenge',
    rating: 5,
    text: 'אחרי שנים שאני גר בנגב, חשבתי שאני מכיר אותו. פשוט לא נכון. המסלול הקיצוני חשף לנו פינות שלא ידעתי שקיימות. המדריך, לשעבר מסייר, היה מדהים. חוויה שאני אמליץ עליה לכל ישראלי שרוצה לגלות את הארץ שלו מחדש.',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80',
    date: 'October 2023',
    verified: true,
  },
]
