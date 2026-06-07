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
    name: 'Sophie M.',
    location: 'Paris, France',
    country: 'France',
    flag: '🇫🇷',
    tour: 'Discovering the Eilat Mountains',
    rating: 5,
    text: "Didier maîtrise parfaitement son sujet et répond à toutes les questions avec beaucoup de gentillesse. Nous avons regardé le coucher de soleil depuis les hauteurs avec vue sur la baie d'Eilat, puis nous sommes descendus pour un pique-nique au feu de bois avec du thé aux saveurs exotiques. Une soirée magique qui s'est terminée par une exploration du ciel étoilé. Je recommande vivement !",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    date: 'November 2023',
    verified: true,
  },
  {
    id: '2',
    name: 'James & Kate T.',
    location: 'London, UK',
    country: 'United Kingdom',
    flag: '🇬🇧',
    tour: 'A Day of Adventures',
    rating: 5,
    text: "Didier and Hanna are fantastic — their knowledge of the region is exceptional and they made sure we had an excellent time from start to finish. The landscapes of the Eilat Mountains are breathtaking, and having a guide who can explain the geology, history, and wildlife makes all the difference. Already planning to come back.",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    date: 'February 2024',
    verified: true,
  },
  {
    id: '3',
    name: 'Marie-Claire D.',
    location: 'Lyon, France',
    country: 'France',
    flag: '🇫🇷',
    tour: 'Emotions & Thrills',
    rating: 5,
    text: "Je recommande vivement Didier pour son sérieux et sa ponctualité. C'est un guide merveilleux, passionné par la faune, la flore, l'archéologie et la géologie de cette région. Il nous a emmenés dans des endroits que nous n'aurions jamais trouvés seuls. Une expérience inoubliable dans un décor absolument magnifique.",
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    date: 'April 2024',
    verified: true,
  },
  {
    id: '4',
    name: 'David & Rachel S.',
    location: 'Tel Aviv, Israel',
    country: 'Israel',
    flag: '🇮🇱',
    tour: 'Discovering the Eilat Mountains',
    rating: 5,
    text: 'גרנו בישראל כל החיים וחשבנו שאנחנו מכירים את האזור. טעינו לחלוטין. דידייה לקח אותנו למקומות מדהימים — קניונים, מחצבות צבעוניות, נופים שנראים כמו ציורים. ההסברים שלו על הגיאולוגיה והארכיאולוגיה היו מרתקים. חוויה שאנחנו ממליצים עליה לכל ישראלי.',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&q=80',
    date: 'January 2024',
    verified: true,
  },
  {
    id: '5',
    name: 'Thomas B.',
    location: 'Brussels, Belgium',
    country: 'Belgium',
    flag: '🇧🇪',
    tour: 'A Day of Adventures',
    rating: 5,
    text: "A truly extraordinary guide. Didier's explanations about the history, geography, geology, fauna and flora of this region brought the landscape to life. We stopped at viewpoints we never would have found on our own, and the picnic in the desert was a wonderful surprise. An experienced guide with incredible richness of knowledge.",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    date: 'October 2023',
    verified: true,
  },
  {
    id: '6',
    name: 'Isabelle & Marc R.',
    location: 'Montreal, Canada',
    country: 'Canada',
    flag: '🇨🇦',
    tour: 'Emotions & Thrills',
    rating: 5,
    text: "Nous avons fait cette excursion en famille avec des enfants et Didier a rendu l'expérience exceptionnelle pour tout le monde. Les paysages des montagnes d'Eilat sont à couper le souffle — les roches aux couleurs variées, les canyons cachés, les points de vue sur le Sinaï et la Jordanie. Une journée qui restera gravée dans nos mémoires.",
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80',
    date: 'March 2024',
    verified: true,
  },
]
