export interface TourPackage {
  name: string; nameFr: string; nameHe: string
  price: number
  duration: string
  description: string; descriptionFr: string; descriptionHe: string
  mealIncluded?: boolean
  entryIncluded?: boolean
  trekIncluded?: string
}

export interface Tour {
  slug: string
  category: string; categoryFr: string; categoryHe: string
  title: string; titleFr: string; titleHe: string
  quote: string; quoteAuthor: string
  description: string; descriptionFr: string; descriptionHe: string
  shortDescription: string; shortDescriptionFr: string; shortDescriptionHe: string
  packages: TourPackage[]
  includes: string[]; includesFr: string[]; includesHe: string[]
  whatToBring?: string[]; whatToBringFr?: string[]; whatToBringHe?: string[]
  highlights?: string[]; highlightsFr?: string[]; highlightsHe?: string[]
  // display fields
  image: string
  gallery: string[]
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme'
  rating: number
  reviewCount: number
  groupSize: string
  languages: string[]
  departure: string
  badge?: string
  featured: boolean
  // computed (lowest package price, for card)
  price: number
  currency: string
  duration: string
  region: string
}

export const tours: Tour[] = [
  // ─── 1. Discovering the Eilat Mountains ─────────────────────────────────────
  {
    slug: 'decouverte-des-monts-deilat',
    category: 'Half-day', categoryFr: 'Demi-journée', categoryHe: 'חצי יום',
    title: 'Discovering the Eilat Mountains',
    titleFr: "Découverte des Monts d'Eilat",
    titleHe: 'גילוי הרי אילת',
    quote: 'On the desert, night falls suddenly, as if someone had switched off the light.',
    quoteAuthor: 'Joyce Carol Oates',

    description: `At the gates of the city, the Eilat Mountains rise, rich in contrasts, colours and sumptuous landscapes. By jeep we take tracks crossing dried riverbeds, valleys, faults, hills and mountains, reaching geological, historical and archaeological sites. We take the time to contemplate the splendour of the natural scenery, marvel and take photos.\n\nWe encounter ibex, gazelles and desert monitors living freely in this nature reserve… At nightfall we may be lucky enough to spot a wolf, hyena or caracal… In spring we can admire carpets of wild flowers among the rocks — poppies, fragrant little sunflowers and more. Whatever the season, acacias line our route. During various stops, we talk about the desert's flora and fauna, its millennia-old history, the geopolitical situation and the people of this region.`,

    descriptionFr: `Aux portes de la ville, les monts d'Eilat se dressent, riches en contrastes, en couleurs et en paysages somptueux. En jeep, nous empruntons des pistes traversant des lits de rivières asséchés, des vallées, des failles, des collines et des montagnes, pour atteindre des sites géologiques, historiques et archéologiques. Nous prenons le temps de contempler la splendeur des paysages naturels, d'admirer et de photographier.\n\nNous croisons des bouquetins, des gazelles et des varans du désert vivant en liberté dans cette réserve naturelle… À la tombée de la nuit, nous pourrons apercevoir un loup, une hyène ou un caracal… Au printemps, des tapis de fleurs sauvages parmi les rochers — coquelicots, petits tournesols parfumés. Quelle que soit la saison, des acacias jalonnent notre route. Lors des haltes, nous parlons de la flore et faune du désert, de son histoire millénaire, de la situation géopolitique et des habitants de cette région.`,

    descriptionHe: `לשערי העיר, הרי אילת מתרוממים, עשירים בניגודים, צבעים ונופים מפוארים. בג׳יפ אנו לוקחים שבילים החוצים ערוצי נחלים יבשים, עמקים, שברים, גבעות והרים, ומגיעים לאתרים גיאולוגיים, היסטוריים וארכיאולוגיים. אנחנו לוקחים את הזמן להתבונן בפאר הנופים הטבעיים, להתפעל ולצלם.\n\nאנו פוגשים יעלים, צבאים ורצים החיים בחופשיות בשמורת טבע זו… עם רדת הלילה אולי נזכה לראות זאב, צבוע או קרקל… באביב נוכל להתפעל משטיחי פרחי בר בין הסלעים — פרגים, חמניות קטנות ריחניות ועוד. בכל עונה, שיטים מלווים את מסלולנו. בעצירות שונות, אנו מדברים על הצומח והחי של המדבר, היסטוריה בת אלפי שנים, המצב הגיאופוליטי ותושבי האזור.`,

    shortDescription: 'Jeep safari through the Eilat Mountains — desert wildlife, panoramic views over 4 countries, and a sunset campfire.',
    shortDescriptionFr: "Safari en jeep dans les monts d'Eilat — faune désertique, vues panoramiques sur 4 pays, et feu de camp au coucher du soleil.",
    shortDescriptionHe: "ספארי ג'יפ בהרי אילת — חיות מדבר, נופים פנורמיים על 4 מדינות, ומדורה בשקיעה.",

    packages: [
      {
        name: 'A short hike', nameFr: 'Une courte randonnée', nameHe: 'טיול קצר',
        price: 150, duration: '2h',
        description: 'Nahal Roded or Nahal Shlomo — a breathtaking glimpse of nature around Eilat, with a plunging view over the city and bay.',
        descriptionFr: "Nahal Roded ou Nahal Shlomo — un aperçu époustouflant de la nature autour d'Eilat, avec une vue plongeante sur la ville et la baie.",
        descriptionHe: 'נחל רודד או נחל שלמה — הצצה מרהיבה לטבע סביב אילת, עם נוף מדהים על העיר והמפרץ.',
      },
      {
        name: 'Half day', nameFr: 'Demi-journée', nameHe: 'חצי יום',
        price: 230, duration: '4h',
        description: 'The must-see sites of the Eilat Mountains: geology, history, fauna and flora. Panoramic views over 4 countries.',
        descriptionFr: "Les sites incontournables des monts d'Eilat : géologie, histoire, faune et flore. Vue panoramique sur 4 pays.",
        descriptionHe: 'האתרים שחובה לראות בהרי אילת: גיאולוגיה, היסטוריה, חי וצומח. נוף פנורמי על 4 מדינות.',
      },
      {
        name: 'Full day', nameFr: 'Journée complète', nameHe: 'יום שלם',
        price: 380, duration: '8h',
        mealIncluded: true,
        description: 'The complete exploration — canyons, valleys, archaeological sites, lunch under the acacias. The ultimate desert experience.',
        descriptionFr: "L'exploration complète — canyons, vallées, sites archéologiques, déjeuner sous les acacias. L'expérience désert ultime.",
        descriptionHe: 'החקירה המלאה — קניונים, עמקים, אתרים ארכיאולוגיים, ארוחת צהריים תחת השיטים. חוויית המדבר האולטימטיבית.',
      },
    ],

    includes: ['7 to 8 people per jeep', 'From 4 people minimum', 'Pick-up and drop-off at hotel', 'Photo stop included', 'Tea and cookies · Water'],
    includesFr: ["7 à 8 personnes par jeep", "À partir de 4 personnes minimum", "Navette aller-retour depuis l'hôtel", "Arrêt photo inclus", "Thé et gâteaux · Eau"],
    includesHe: ["7 עד 8 אנשים לג'יפ", "מ-4 אנשים מינימום", "הסעה הלוך ושוב מהמלון", "עצירת צילום כלולה", "תה ועוגיות · מים"],

    whatToBring: ['Hat or cap', 'Sunglasses', 'Personal water bottle', 'Walking shoes'],
    whatToBringFr: ['Chapeau ou casquette', 'Lunettes de soleil', "Bouteille d'eau personnelle", 'Chaussures de marche'],
    whatToBringHe: ['כובע או מצחייה', 'משקפי שמש', 'בקבוק מים אישי', 'נעלי הליכה'],

    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
      'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80',
    ],
    difficulty: 'Easy',
    rating: 4.9, reviewCount: 312,
    groupSize: '4–8', languages: ['English', 'French', 'Hebrew'],
    departure: 'Daily, Year-Round',
    badge: 'Best Seller', featured: true,
    price: 150, currency: '₪', duration: '2–8h', region: 'Eilat Mountains',
  },

  // ─── 2. A Day of Adventures ──────────────────────────────────────────────────
  {
    slug: 'a-day-of-adventures',
    category: 'Full day', categoryFr: 'Journée complète', categoryHe: 'יום שלם',
    title: 'A Day of Adventures',
    titleFr: "Une Journée d'Aventures",
    titleHe: 'יום הרפתקאות',
    quote: 'The desert is beautiful, does not lie, it is clean.',
    quoteAuthor: 'Théodore Monod',

    description: `Nothing like an early morning departure to soak in the vastness of the desert, listen to the silence, and commune with nature. On the edge of Eilat, we cross lush palm groves where the origin of medjool dates is explained, then we reveal one of the desert's secrets by exploring the inside of a bunker from the Yom Kippur War.\n\nWe continue to the migratory ponds home to a year-round colony of flamingos… In the Arava valley we follow the Israeli-Jordanian border, facing the Edom Mountains and the Midian Mountains — immovable witnesses to the history of the children of Israel crossing this desert on their Exodus from Egypt… We stop at the very place where they camped. A unique day where borders vanish and history comes alive.`,

    descriptionFr: `Rien de tel qu'un départ en début de matinée pour s'imprégner de l'immensité du désert, écouter le silence et communier avec la nature. Aux abords d'Eilat, nous traversons de luxuriantes palmeraies où l'on explique l'origine des dattes medjool, puis nous révélons l'un des secrets du désert en explorant l'intérieur d'un bunker de la guerre du Kippour.\n\nNous continuons vers les étangs migratoires abritant une colonie de flamants roses présents toute l'année… Dans la vallée de l'Arava, nous longeons la frontière israélo-jordanienne face aux monts d'Édom et aux monts de Madian — témoins immuables de l'Exode d'Égypte… Nous nous arrêtons à l'endroit même où ils ont campé. Une journée unique où les frontières s'effacent et l'histoire reprend vie.`,

    descriptionHe: `אין כמו יציאה מוקדמת בבוקר לספוג את עצמת המדבר, להקשיב לשקט ולהתחבר עם הטבע. בסביבות אילת, אנו חוצים חורשות דקלים עשירות שם מוסבר מקור תמרי המג׳הול, ואז מגלים את אחד מסודות המדבר בחקירת פנים הבונקר ממלחמת יום כיפור.\n\nממשיכים לבריכות ההגירה שבהן שוהה מושבה של פלמינגו לאורך כל השנה… בעמק הערבה אנו עוקבים לאורך הגבול הישראלי-ירדני, מול הרי אדום והרי מדיין — עדים בלתי זזים ליציאת מצרים… אנו עוצרים בדיוק במקום בו חנו. יום ייחודי שבו הגבולות נמוגים וההיסטוריה מתעוררת לחיים.`,

    shortDescription: 'Palm groves, a Yom Kippur War bunker, flamingos, and the footsteps of the Exodus along the Israeli-Jordanian border.',
    shortDescriptionFr: "Palmeraies, bunker de la guerre du Kippour, flamants roses et les pas de l'Exode le long de la frontière israélo-jordanienne.",
    shortDescriptionHe: "חורשות דקלים, בונקר ממלחמת יום כיפור, פלמינגו ועקבות יציאת מצרים לאורך הגבול הישראלי-ירדני.",

    highlights: ['Palm groves & medjool dates', 'Yom Kippur War bunker', 'Flamingo colony', 'Israeli-Jordanian border', 'Edom Mountains — in the footsteps of the Hebrews'],
    highlightsFr: ["Palmeraies & dattes medjool", "Bunker de la guerre du Kippour", "Colonie de flamants roses", "Frontière israélo-jordanienne", "Monts d'Édom — sur les pas des Hébreux"],
    highlightsHe: ["חורשות דקלים ותמרי מג'הול", "בונקר ממלחמת יום כיפור", "מושבת פלמינגו", "הגבול הישראלי-ירדני", "הרי אדום — בעקבות בני ישראל"],

    packages: [
      {
        name: 'Nahal Eteq', nameFr: 'Nahal Eteq', nameHe: 'נחל עתק',
        price: 290, duration: '6–7h',
        mealIncluded: true,
        description: 'Contrasting landscapes, technical driving through Nahal Eteq, picnic with desert tea, Har Yoach at 740m — panoramic view over 3 countries, the Sinai desert and Eilat bay. Return via the ancient Mecca road.',
        descriptionFr: "Paysages contrastés, conduite technique dans le Nahal Eteq, pique-nique avec thé du désert, Har Yoach à 740m — vue panoramique sur 3 pays, le désert du Sinaï et la baie d'Eilat. Retour par l'ancienne route de La Mecque.",
        descriptionHe: "נופים מנוגדים, נהיגה טכנית בנחל עתק, פיקניק עם תה מדברי, הר יואב ב-740 מ׳ — נוף פנורמי על 3 מדינות, מדבר סיני ומפרץ אילת. חזרה בדרך מכה העתיקה.",
      },
      {
        name: "King Solomon's Mines", nameFr: 'Les Mines du Roi Salomon', nameHe: 'מכרות המלך שלמה',
        price: 290, duration: '6–7h',
        mealIncluded: true, entryIncluded: true,
        description: "Timna Park (65 km²) — turquoise underground lake, the world's oldest copper mines (6,000 years old), mushroom/Solomon's Pillars/arch rock formations, Ramsès III cave paintings, Eilat blue stone in its natural setting. Typical Israeli lunch at the park restaurant.",
        descriptionFr: "Parc de Timna (65 km²) — lac souterrain turquoise, les plus anciennes mines de cuivre du monde (6 000 ans), formations champignon/Colonnes de Salomon/arche, peintures rupestres de Ramsès III, pierre bleue d'Eilat dans son cadre naturel. Déjeuner israélien typique au restaurant du parc.",
        descriptionHe: "פארק תמנע (65 קמ\"ר) — אגם תת-קרקעי טורקיז, מכרות הנחושת העתיקים בעולם (6,000 שנה), תצורות פטריה/עמודי שלמה/קשת, ציורי מערות של רמסס III, אבן אילת בסביבתה הטבעית. ארוחת צהריים ישראלית אופיינית במסעדת הפארק.",
      },
    ],

    includes: ['7 to 8 people per jeep', 'Pick-up and drop-off at hotel', 'Photo stop included', 'Tea and cookies · Water', 'Lunch included'],
    includesFr: ["7 à 8 personnes par jeep", "Navette aller-retour depuis l'hôtel", "Arrêt photo inclus", "Thé et gâteaux · Eau", "Déjeuner inclus"],
    includesHe: ["7 עד 8 אנשים לג'יפ", "הסעה הלוך ושוב מהמלון", "עצירת צילום כלולה", "תה ועוגיות · מים", "ארוחת צהריים כלולה"],

    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80',
    ],
    difficulty: 'Moderate',
    rating: 4.9, reviewCount: 187,
    groupSize: '4–8', languages: ['English', 'French', 'Hebrew'],
    departure: 'Daily, Year-Round',
    badge: undefined, featured: true,
    price: 290, currency: '₪', duration: '6–7h', region: 'Eilat & Arava',
  },

  // ─── 3. Emotions & Thrills ───────────────────────────────────────────────────
  {
    slug: 'emotions-et-grands-frissons',
    category: 'Sunset', categoryFr: 'Coucher de soleil', categoryHe: 'שקיעה',
    title: 'Emotions & Thrills',
    titleFr: 'Émotions et Grands Frissons',
    titleHe: 'רגשות וסערות נפש',
    quote: 'The desert was infinity within reach of mankind.',
    quoteAuthor: 'Maxime Chattam',

    description: `Visiting the desert by jeep gives access to places that are barely accessible, untouched by civilisation and breathtakingly beautiful. The landscapes scroll past and leave us dreaming. To fully savour and absorb the power of the desert, you have to walk, breathe and feel — and that is exactly what we offer you.\n\nWe descend into the heart of the Red Canyon, a true cathedral of sandstone sculpted by millions of years of erosion. Its walls of ochre, red and violet seem to vibrate at sunset. Then perched on the summit of the Eilat Mountains, we contemplate four countries at once: Israel, Jordan, Egypt and Saudi Arabia — a panorama unique in the world, an unmatched emotion.`,

    descriptionFr: `Visiter le désert en jeep donne accès à des endroits à peine accessibles, intacts de toute civilisation et d'une beauté à couper le souffle. Les paysages défilent et nous laissent rêveurs. Pour pleinement savourer et absorber la puissance du désert, il faut marcher, respirer et ressentir — et c'est exactement ce que nous vous proposons.\n\nNous descendons au cœur du Canyon Rouge, une véritable cathédrale de grès sculptée par des millions d'années d'érosion. Ses parois ocre, rouges et violettes semblent vibrer au coucher du soleil. Puis, perchés au sommet des monts d'Eilat, nous contemplons quatre pays à la fois : Israël, la Jordanie, l'Égypte et l'Arabie Saoudite — un panorama unique au monde, une émotion sans pareille.`,

    descriptionHe: `ביקור במדבר בג׳יפ מאפשר גישה למקומות שכמעט אינם נגישים, טהורים מכל ציוויליזציה ויפים בצורה עוצרת נשימה. הנופים חולפים ומשאירים אותנו בחלום. כדי ליהנות ולספוג את כוח המדבר, צריך ללכת, לנשום ולחוש — וזה בדיוק מה שאנחנו מציעים לכם.\n\nאנחנו יורדים אל לב הקניון האדום, קתדרלת חולית אמיתית שנפסלה על ידי מיליוני שנות שחיקה. קירותיו הצהבהבים, האדומים והסגולים נראים כרוטטים בשקיעה. אחר כך, על פסגת הרי אילת, אנחנו מתבוננים בארבע מדינות בו-זמנית: ישראל, ירדן, מצרים וערב הסעודית — פנורמה ייחודית בעולם, רגש שאין דומה לו.`,

    shortDescription: 'Sunset descent into the Red Canyon and panoramic views of 4 countries from the Eilat Mountains summit — with a campfire.',
    shortDescriptionFr: "Descente au coucher du soleil dans le Canyon Rouge et vue panoramique sur 4 pays depuis les monts d'Eilat — avec feu de camp.",
    shortDescriptionHe: "ירידה בשקיעה לקניון האדום ונוף פנורמי על 4 מדינות מפסגת הרי אילת — עם מדורה.",

    packages: [
      {
        name: 'The Red Canyon', nameFr: 'Le Canyon Rouge', nameHe: 'הקניון האדום',
        price: 195, duration: '4h',
        trekIncluded: '1h',
        description: 'Nahal Shlomo → Har Yoshafat (ibex) → Red Canyon. Sandstone gorge 300m long, 2–4m wide. Descent between rose, red, violet and orange walls. Overhead view from the rim. Campfire and desert tea.',
        descriptionFr: "Nahal Shlomo → Har Yoshafat (bouquetins) → Canyon Rouge. Gorge de grès de 300m de long, 2–4m de large. Descente entre des parois roses, rouges, violettes et orangées. Vue plongeante depuis le bord. Feu de camp et thé du désert.",
        descriptionHe: "נחל שלמה ← הר יהושפט (יעלים) ← הקניון האדום. ערוץ חולית 300 מ׳ אורך, 2-4 מ׳ רוחב. ירידה בין קירות ורודים, אדומים, סגולים וכתומים. נוף מלמעלה. מדורה ותה מדברי.",
      },
      {
        name: "Amram's Pillars", nameFr: "Les Piliers d'Amram", nameHe: 'עמודי עמרם',
        price: 195, duration: '4h',
        trekIncluded: '30 min',
        description: "Kibbutz Eilot → Nahal Roded (view over Arava valley, Edom Mountains, Gulf of Aqaba) → Amram's Pillars. Natural columns dozens of metres high carved in red, pink, white and green sandstone. Hollow pillars accessible by climbing. Campfire and tea.",
        descriptionFr: "Kibbutz Eilot → Nahal Roded (vue sur la vallée de l'Arava, monts d'Édom, golfe d'Aqaba) → Piliers d'Amram. Colonnes naturelles de dizaines de mètres sculptées dans du grès rouge, rose, blanc et vert. Piliers creux accessibles par escalade. Feu de camp et thé.",
        descriptionHe: "קיבוץ אילות ← נחל רודד (נוף על עמק הערבה, הרי אדום, מפרץ עקבה) ← עמודי עמרם. עמודים טבעיים של עשרות מטרים חצובים בחולית אדומה, ורודה, לבנה וירוקה. עמודים חלולים נגישים בטיפוס. מדורה ותה.",
      },
    ],

    includes: ['7 to 8 people per jeep', 'Pick-up and drop-off at hotel', 'Photo stop included', 'Tea and cookies · Water', '1 hour trek included'],
    includesFr: ["7 à 8 personnes par jeep", "Navette aller-retour depuis l'hôtel", "Arrêt photo inclus", "Thé et gâteaux · Eau", "1h de trek inclus"],
    includesHe: ["7 עד 8 אנשים לג'יפ", "הסעה הלוך ושוב מהמלון", "עצירת צילום כלולה", "תה ועוגיות · מים", "1 שעת טרקינג כלולה"],

    whatToBring: ['Hat or cap', 'Sunglasses', 'Personal water bottle', 'Walking shoes', 'Warm layer (evening)'],
    whatToBringFr: ['Chapeau ou casquette', 'Lunettes de soleil', "Bouteille d'eau personnelle", 'Chaussures de marche', 'Couche chaude (soirée)'],
    whatToBringHe: ['כובע או מצחייה', 'משקפי שמש', 'בקבוק מים אישי', 'נעלי הליכה', 'שכבה חמה (לערב)'],

    image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80',
    ],
    difficulty: 'Moderate',
    rating: 4.9, reviewCount: 241,
    groupSize: '4–8', languages: ['English', 'French', 'Hebrew'],
    departure: 'Daily at Sunset',
    badge: 'Sunset', featured: true,
    price: 195, currency: '₪', duration: '4h', region: 'Red Canyon · Eilat Mountains',
  },
]

export const getFeaturedTours = () => tours.filter((t) => t.featured)
export const getTourBySlug = (slug: string) => tours.find((t) => t.slug === slug)
