export interface TourPackage {
  name: string; nameFr: string; nameHe: string
  price: number
  priceOnRequest?: boolean
  pricePerGroup?: boolean
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
  subtitle?: string; subtitleFr?: string; subtitleHe?: string
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
  priceOnRequest?: boolean
  pricePerGroup?: boolean
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

  // ─── 4. Petra — The Rose City ───────────────────────────────────────────────
  {
    slug: 'petra-jordanie',
    category: 'Full day', categoryFr: 'Journée complète', categoryHe: 'יום שלם',
    title: 'Petra — The Rose City of Jordan',
    titleFr: 'Pétra — La Cité Rose de Jordanie',
    titleHe: 'פטרה — העיר הורודה של ירדן',
    quote: 'A rose-red city half as old as time.',
    quoteAuthor: 'John William Burgon',

    description: `Petra, the "Rose of the Desert" of Jordan, listed as a UNESCO World Heritage Site, crossroads of East and West, North and South, on the caravan routes from Arabia, Syria and Mesopotamia: a city carved in stone by the Nabataeans. This people, originally from Arabia, settled in Petra in the 5th century BC and over six centuries carved more than 700 monuments in the rocks, across an area spanning several kilometres. Petra was named by the Romans "Petrum" meaning rock, but its first name was "Reqmu" meaning multicoloured.\n\nPetra, one of the most magical sites in the Middle East, is both a natural and architectural wonder. Natural first, with its gorges like the Siq, and its sandstone cliffs with coloured patterns — where the jagged rocks, shaped by wind and sand, give the site its extraordinary palette of colours ranging from yellow to violet through orange, red, green and blue. Architectural too, with its Roman remains, but above all with its imposing tombs, dug and sculpted into the mountain rocks by the Nabataeans.`,

    descriptionFr: `Pétra la « Rose du désert » jordanienne, classée au patrimoine mondial de l'humanité par l'Unesco, carrefour de l'Orient et de l'Occident, du Nord et du Sud, sur la route des caravanes venues d'Arabie, de Syrie, de Mésopotamie : la ville creusée dans la pierre par les Nabatéens. Ce peuple originaire d'Arabie s'installe à Pétra au V° siècle avant J.C. et durant six siècles va tailler dans les rochers plus de 700 monuments, sur une zone qui s'étend sur plusieurs kilomètres. Pétra est baptisée par les Romains de « Petrum », le rocher mais son premier nom était « Reqmu » qui signifie multicolore.\n\nPétra, un des sites les plus magiques du Proche-Orient, est une merveille naturelle et architecturale. Naturelle d'abord, avec ses défilés, comme le Siq, et ses falaises de grès aux dessins colorés. Pétra où le grès des roches déchiquetées, façonnées par le vent et le sable, donnent au site son extraordinaire palette de couleurs qui s'étend du jaune au violet en passant par l'orange, le rouge, le vert et le bleu. Architecturale ensuite, avec ses vestiges romains, mais surtout avec ses imposants tombeaux, creusés puis sculptés dans la roche des montagnes par les Nabatéens.`,

    descriptionHe: `פטרה, "ורד המדבר" הירדנית, מוכרזת כאתר מורשת עולמית של יונסקו, צומת של מזרח ומערב, צפון ודרום, על דרכי השיירות מערב, סוריה ומסופוטמיה: עיר חצובה בסלע על ידי הנבטים. עם זה, שמוצאו מערב, התיישב בפטרה במאה ה-5 לפנה"ס ובמשך שישה מאות שנה חצב בסלעים למעלה מ-700 מונומנטים, על פני שטח המשתרע על פני מספר קילומטרים. פטרה קיבלה את שמה מהרומאים "פטרום" שפירושו סלע, אך שמה הראשון היה "רקמו" שפירושו צבעוני.\n\nפטרה, אחד האתרים הקסומים ביותר במזרח הקרוב, הינה פלא טבעי ואדריכלי כאחד. טבעי ראשית, עם ערוציה כמו הסיק, ומצוקי הגיר עם ציורים צבעוניים — שבהם הסלעים המחוספסים, שעוצבו על ידי הרוח והחול, מעניקים לאתר את פלטת הצבעים הבלתי-רגילה שלו, הנמתחת מצהוב לסגול דרך כתום, אדום, ירוק וכחול. אדריכלי גם כן, עם שרידיה הרומיים, אך בעיקר עם קבריה המרשימים, שנחצבו ונפסלו בסלעי ההרים על ידי הנבטים.`,

    shortDescription: 'A day trip from Eilat to Petra — UNESCO World Heritage Site, rose-red city of the Nabataeans, carved in stone over six centuries.',
    shortDescriptionFr: "Excursion d'Eilat à Pétra — cité rose des Nabatéens classée à l'Unesco, taillée dans le rocher sur six siècles, merveille naturelle et architecturale.",
    shortDescriptionHe: "טיול יום מאילת לפטרה — עיר הסלע הורודה של הנבטים, אתר מורשת עולמית של יונסקו, פלא טבעי ואדריכלי.",

    highlights: ['Pick-up at your hotel', 'Border crossing', 'Welcome on the Jordanian side — departure for Petra', 'Approx. 2h30 drive with a 20-min break', 'Guided tour of Petra in English (French guide on request)', 'Return to entrance — lunch at a local restaurant (drinks extra)', 'Return to Eilat at end of day'],
    highlightsFr: ["Pick up à l'hôtel (ou votre adresse)", "Passage de la frontière", "Accueil côté jordanien puis départ pour Pétra", "Trajet de 2h30 environ avec une pause de 20 mn", "Visite guidée de Pétra en anglais (guide francophone en option)", "Retour à l'entrée du site — déjeuner local (boissons en supplément)", "Retour sur Eilat en fin de journée"],
    highlightsHe: ["איסוף מהמלון (או הכתובת שלך)", "מעבר גבול", "קבלת פנים בצד הירדני — יציאה לפטרה", "נסיעה של כ-2.5 שעות עם הפסקה של 20 דקות", "סיור מודרך בפטרה באנגלית (מדריך דובר צרפתית באפשרות)", "חזרה לכניסה — ארוחת צהריים מקומית (משקאות בתוספת)", "חזרה לאילת בסוף היום"],

    packages: [
      {
        name: 'Petra Classic', nameFr: 'Pétra Classique', nameHe: 'פטרה קלאסי',
        price: 0, priceOnRequest: true, duration: '10–11h',
        entryIncluded: true,
        description: 'Border crossing + guided visit: the Siq, Al-Khazneh Treasury, Street of Facades, Roman Theatre. Lunch at a local Jordanian restaurant. Return to Eilat by evening.',
        descriptionFr: "Passage de frontière + visite guidée : le Siq, le Trésor Al-Khazneh, Rue des Façades, Théâtre romain. Déjeuner dans un restaurant jordanien local. Retour à Eilat en soirée.",
        descriptionHe: "מעבר גבול + ביקור מודרך: הסיק, אוצר אל-ח'זנה, רחוב החזיתות, התיאטרון הרומי. ארוחת צהריים במסעדה ירדנית מקומית. חזרה לאילת בערב.",
      },
      {
        name: 'Petra Full Discovery', nameFr: 'Pétra Découverte Complète', nameHe: 'פטרה גילוי מלא',
        price: 0, priceOnRequest: true, duration: '12–13h',
        entryIncluded: true, mealIncluded: true,
        description: 'Everything in Classic + the Monastery (Al-Deir) — a 45-minute climb rewarded with Petra\'s most impressive monument. The High Place of Sacrifice. Extended free time. Dinner included.',
        descriptionFr: "Tout du Classique + le Monastère (Al-Deir) — une montée de 45 minutes récompensée par le monument le plus impressionnant de Pétra. Le Haut Lieu du Sacrifice. Temps libre prolongé. Dîner inclus.",
        descriptionHe: "כל מה שבקלאסי + המנזר (אל-דיר) — עלייה של 45 דקות המתוגמלת במונומנט המרהיב ביותר של פטרה. מקום הקרבן הגבוה. זמן חופשי מורחב. ארוחת ערב כלולה.",
      },
    ],

    includes: ['Border crossing assistance', 'Licensed Jordanian guide', 'Jordan entry ticket', 'Pick-up and drop-off at hotel', 'Lunch included', 'Water & snacks'],
    includesFr: ["Assistance au passage de frontière", "Guide jordanien agréé", "Billet d'entrée Jordanie", "Navette aller-retour depuis l'hôtel", "Déjeuner inclus", "Eau et collations"],
    includesHe: ["סיוע במעבר גבול", "מדריך ירדני מורשה", "כרטיס כניסה לירדן", "הסעה הלוך ושוב מהמלון", "ארוחת צהריים כלולה", "מים וחטיפים"],

    whatToBring: ['Passport (mandatory)', 'Comfortable walking shoes', 'Hat & sunscreen', 'Camera', 'Light jacket (evenings)'],
    whatToBringFr: ['Passeport (obligatoire)', 'Chaussures de marche confortables', 'Chapeau et crème solaire', 'Appareil photo', 'Veste légère (soirées)'],
    whatToBringHe: ['דרכון (חובה)', 'נעלי הליכה נוחות', 'כובע וקרם הגנה', 'מצלמה', 'ז׳קט קל (לערב)'],

    image: 'https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?w=800&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
      'https://images.unsplash.com/photo-1534685785745-60a2cea0ec34?w=800&q=80',
    ],
    difficulty: 'Moderate',
    rating: 4.9, reviewCount: 156,
    groupSize: '2–8', languages: ['English', 'French', 'Hebrew'],
    departure: 'Daily, Year-Round',
    badge: 'Jordan', featured: true,
    priceOnRequest: true,
    price: 0, currency: '₪', duration: '10–13h', region: 'Petra, Jordan',
  },

  // ─── 5. Sailing & Desert Combo ──────────────────────────────────────────────
  {
    slug: 'combo-voilier-jeep',
    category: 'Private combo', categoryFr: 'Combo privé', categoryHe: 'קומבו פרטי',
    title: 'Sailing & Desert — The Private Combo',
    titleFr: 'Voilier & Désert — Le Combo Privé',
    titleHe: 'שייט ומדבר — הקומבו הפרטי',
    quote: 'The sea, once it casts its spell, holds one in its net of wonder forever.',
    quoteAuthor: 'Jacques Cousteau',

    description: `Two worlds, one unforgettable day. Eilat sits at a unique crossroads — the desert meets the sea. We've combined our two signature experiences into one private adventure for your group: a sailing trip on the Red Sea followed by a sunset jeep tour through the Eilat Mountains.\n\nOn board your private sailing yacht, glide over the crystal-clear waters of the Gulf of Aqaba — one of the world's richest coral ecosystems. Swim, float, and let the silence of the open sea wash over you, with cold drinks, seasonal fruits and music on deck. Then as the heat of the day softens, we head into the desert — campfire, Bedouin tea, and the stars of Eilat above you.`,

    descriptionFr: `Deux mondes, une journée inoubliable. Eilat se trouve à un carrefour unique — le désert rencontre la mer. Nous avons réuni nos deux expériences signature en une seule aventure privée pour votre groupe : une sortie en voilier sur la mer Rouge suivie d'un safari jeep au coucher du soleil dans les monts d'Eilat.\n\nÀ bord de votre voilier privatif, glissez sur les eaux cristallines du golfe d'Aqaba — l'un des écosystèmes coralliens les plus riches du monde. Nagez, flottez et laissez le silence de la mer ouverte vous envahir, avec boissons fraîches, fruits de saison et musique sur le pont. Puis, quand la chaleur du jour s'adoucit, nous partons dans le désert — feu de camp, thé bédouin, et les étoiles d'Eilat au-dessus de vous.`,

    descriptionHe: `שני עולמות, יום אחד בלתי נשכח. אילת נמצאת בצומת ייחודית — המדבר פוגש את הים. שילבנו את שתי החוויות הייחודיות שלנו להרפתקה פרטית אחת לקבוצה שלך: שייט ביאכטה על ים סוף ואחריו סיור ג'יפ בשקיעה בהרי אילת.\n\nעל סיפון היאכטה הפרטית שלך, שוט על המים הצלולים של מפרץ עקבה — אחד מאקוסיסטמות האלמוגים העשירות ביותר בעולם. שחה, צוף, ותן לשקט הים הפתוח לשטוף אותך, עם משקאות קרים, פירות עונתיים ומוזיקה על הסיפון. ואז, כשחום היום מתמתן, אנחנו יוצאים למדבר — מדורה, תה בדואי, וכוכבי אילת מעל ראשך.`,

    shortDescription: 'Private yacht on the Red Sea + sunset jeep safari — the ultimate Eilat combo for groups up to 8.',
    shortDescriptionFr: "Voilier privatif sur la mer Rouge + safari jeep au coucher du soleil — le combo Eilat ultime pour groupes jusqu'à 8 personnes.",
    shortDescriptionHe: "יאכטה פרטית על ים סוף + ספארי ג'יפ בשקיעה — הקומבו האולטימטיבי של אילת לקבוצות עד 8 אנשים.",

    highlights: ['Private sailing yacht — Red Sea / Gulf of Aqaba', 'Swimming in crystal-clear coral waters', 'Soft drinks, seasonal fruits & music on deck', 'Sunset jeep safari — Eilat Mountains', 'Bedouin campfire & desert tea', 'Private group — up to 8 people'],
    highlightsFr: ["Voilier privatif — mer Rouge / golfe d'Aqaba", "Baignade dans les eaux coraliennes cristallines", "Boissons soft, fruits de saison & musique sur le pont", "Safari jeep au coucher du soleil — monts d'Eilat", "Feu de camp bédouin & thé du désert", "Groupe privé — jusqu'à 8 personnes"],
    highlightsHe: ["יאכטה פרטית — ים סוף / מפרץ עקבה", "שחייה במים קורליניים צלולים", "משקאות קלים, פירות עונתיים ומוזיקה על הסיפון", "ספארי ג'יפ בשקיעה — הרי אילת", "מדורה בדואית ותה מדברי", "קבוצה פרטית — עד 8 אנשים"],

    packages: [
      {
        name: 'Sea Breeze', nameFr: 'Brise Marine', nameHe: 'רוח ים',
        price: 1390, pricePerGroup: true, duration: '~5h total',
        description: '⛵ Sailing 1h30: soft drinks, seasonal fruits, music, swimming · 🔥 Jeep 3h: campfire, Bedouin tea, soft drinks, grilled marshmallows, petits gâteaux',
        descriptionFr: '⛵ Voilier 1h30 : boissons soft, fruits de saison, musique, baignade · 🔥 Jeep 3h : feu de camp, thé bédouin, boissons soft, marshmallows grillés, petits gâteaux',
        descriptionHe: '⛵ שייט 1.5 שעות: משקאות קלים, פירות עונתיים, מוזיקה, שחייה · 🔥 ג\'יפ 3 שעות: מדורה, תה בדואי, משקאות קלים, מרשמלו על האש, עוגיות',
      },
      {
        name: 'Sailor\'s Desert', nameFr: 'Marin du Désert', nameHe: 'מלח המדבר',
        price: 1590, pricePerGroup: true, duration: '~6h total',
        description: '⛵ Sailing 1h30: soft drinks, seasonal fruits, music, swimming · 🔥 Jeep 4h: campfire, Bedouin tea, soft drinks, marshmallows, petits gâteaux + lafot on wood fire with olive oil hummus & zaatar',
        descriptionFr: '⛵ Voilier 1h30 : boissons soft, fruits de saison, musique, baignade · 🔥 Jeep 4h : feu de camp, thé bédouin, boissons soft, marshmallows + lafotes cuites au feu de bois avec houmous à l\'huile d\'olive et zaatar',
        descriptionHe: '⛵ שייט 1.5 שעות: משקאות קלים, פירות עונתיים, מוזיקה, שחייה · 🔥 ג\'יפ 4 שעות: מדורה, תה בדואי, משקאות קלים, מרשמלו + לאפות על אש עם חומוס שמן זית וזעתר',
      },
      {
        name: 'Blue Horizon', nameFr: 'Horizon Bleu', nameHe: 'אופק כחול',
        price: 1890, pricePerGroup: true, duration: '~6h30 total',
        description: '⛵ Sailing 2h30: soft drinks, seasonal fruits, music, swimming · 🔥 Jeep 3h: campfire, Bedouin tea, soft drinks, grilled marshmallows, petits gâteaux',
        descriptionFr: '⛵ Voilier 2h30 : boissons soft, fruits de saison, musique, baignade · 🔥 Jeep 3h : feu de camp, thé bédouin, boissons soft, marshmallows grillés, petits gâteaux',
        descriptionHe: '⛵ שייט 2.5 שעות: משקאות קלים, פירות עונתיים, מוזיקה, שחייה · 🔥 ג\'יפ 3 שעות: מדורה, תה בדואי, משקאות קלים, מרשמלו על האש, עוגיות',
      },
      {
        name: 'Full Explorer', nameFr: 'Explorateur Complet', nameHe: 'חוקר מלא',
        price: 2190, pricePerGroup: true, duration: '~7h30 total',
        description: '⛵ Sailing 2h30: soft drinks, seasonal fruits, music, swimming · 🔥 Jeep 4h: campfire, Bedouin tea, soft drinks, marshmallows, petits gâteaux + lafot on wood fire with olive oil hummus & zaatar',
        descriptionFr: '⛵ Voilier 2h30 : boissons soft, fruits de saison, musique, baignade · 🔥 Jeep 4h : feu de camp, thé bédouin, boissons soft, marshmallows + lafotes cuites au feu de bois avec houmous à l\'huile d\'olive et zaatar',
        descriptionHe: '⛵ שייט 2.5 שעות: משקאות קלים, פירות עונתיים, מוזיקה, שחייה · 🔥 ג\'יפ 4 שעות: מדורה, תה בדואי, משקאות קלים, מרשמלו + לאפות על אש עם חומוס שמן זית וזעתר',
      },
      {
        name: 'Deep Blue', nameFr: 'Grand Large', nameHe: 'ים עמוק',
        price: 2590, pricePerGroup: true, duration: '~8h total',
        description: '⛵ Sailing 4h: soft drinks, seasonal fruits, music, swimming · 🔥 Jeep 3h: campfire, Bedouin tea, soft drinks, grilled marshmallows, petits gâteaux',
        descriptionFr: '⛵ Voilier 4h : boissons soft, fruits de saison, musique, baignade · 🔥 Jeep 3h : feu de camp, thé bédouin, boissons soft, marshmallows grillés, petits gâteaux',
        descriptionHe: '⛵ שייט 4 שעות: משקאות קלים, פירות עונתיים, מוזיקה, שחייה · 🔥 ג\'יפ 3 שעות: מדורה, תה בדואי, משקאות קלים, מרשמלו על האש, עוגיות',
      },
      {
        name: 'The Ultimate', nameFr: "L'Ultime", nameHe: 'האולטימטיבי',
        price: 2790, pricePerGroup: true, duration: '~9h total',
        description: '⛵ Sailing 4h: soft drinks, seasonal fruits, music, swimming · 🔥 Jeep 4h: campfire, Bedouin tea, soft drinks, marshmallows, petits gâteaux + lafot on wood fire with olive oil hummus & zaatar',
        descriptionFr: '⛵ Voilier 4h : boissons soft, fruits de saison, musique, baignade · 🔥 Jeep 4h : feu de camp, thé bédouin, boissons soft, marshmallows + lafotes cuites au feu de bois avec houmous à l\'huile d\'olive et zaatar',
        descriptionHe: '⛵ שייט 4 שעות: משקאות קלים, פירות עונתיים, מוזיקה, שחייה · 🔥 ג\'יפ 4 שעות: מדורה, תה בדואי, משקאות קלים, מרשמלו + לאפות על אש עם חומוס שמן זית וזעתר',
      },
    ],

    includes: ['Private yacht — up to 8 people', 'Pick-up and drop-off at hotel', 'Soft drinks & seasonal fruits on board', 'Swimming & snorkelling stop', 'Campfire & Bedouin tea', 'Grilled marshmallows & petits gâteaux'],
    includesFr: ["Voilier privatif — jusqu'à 8 personnes", "Navette aller-retour depuis l'hôtel", "Boissons soft & fruits de saison à bord", "Arrêt baignade & snorkeling", "Feu de camp & thé bédouin", "Marshmallows grillés & petits gâteaux"],
    includesHe: ["יאכטה פרטית — עד 8 אנשים", "הסעה הלוך ושוב מהמלון", "משקאות קלים ופירות עונתיים על הסיפון", "עצירת שחייה ושנורקלינג", "מדורה ותה בדואי", "מרשמלו על האש ועוגיות"],

    whatToBring: ['Swimsuit & towel', 'Sunscreen & hat', 'Camera / underwater camera', 'Walking shoes (for jeep)', 'Warm layer (evening)'],
    whatToBringFr: ['Maillot de bain & serviette', 'Crème solaire & chapeau', 'Appareil photo / caméra sous-marine', 'Chaussures de marche (pour le jeep)', 'Couche chaude (soirée)'],
    whatToBringHe: ['בגד ים ומגבת', 'קרם הגנה וכובע', 'מצלמה / מצלמת מים', 'נעלי הליכה (לג\'יפ)', 'שכבה חמה (לערב)'],

    image: 'https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=800&q=80',
      'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    ],
    difficulty: 'Easy',
    rating: 4.9, reviewCount: 98,
    groupSize: 'Up to 8', languages: ['English', 'French', 'Hebrew'],
    departure: 'Daily, Year-Round',
    badge: 'Private', featured: true,
    pricePerGroup: true,
    price: 1390, currency: '₪', duration: '5h → 9h', region: 'Red Sea · Eilat Mountains',
  },

  // ─── 6. Dinner & a Night Under the Stars ────────────────────────────────────
  {
    slug: 'un-diner-une-nuit-sous-les-etoiles',
    category: 'Evening · Night', categoryFr: 'Soirée · Nuit', categoryHe: 'ערב · לילה',
    title: 'Dinner & a Night Under the Stars',
    titleFr: 'Un Dîner, Une Nuit sous les Étoiles',
    titleHe: 'ארוחת ערב, לילה תחת הכוכבים',
    quote: 'The desert is not only silence — it is the only place where the stars still speak.',
    quoteAuthor: 'Didier Uzan, Eilat Action',

    description: `The Eilat desert becomes a different universe once the sun sets. Far from city lights and noise, in a secret clearing deep in the mountains, we set up a Bedouin camp just for you: Moroccan lanterns, embroidered cushions, a crackling wood fire and the scent of herbs drifting through the evening air.\n\nAs darkness falls, the Milky Way blazes overhead — the skies of Eilat are among the darkest in Israel, making them ideal for stargazing. Your guide leads you through the constellations, shares stories of the desert at night, and serves a traditional Bedouin dinner: fresh-baked laffas, grilled meats, homemade hummus, mezze, mint tea and warm desserts.\n\nFor those who wish to stay, fall asleep under the open sky on mattresses laid out in the desert — and wake to the silence of dawn and a warm breakfast before the world comes alive.`,

    descriptionFr: `Le désert d'Eilat devient un autre univers dès que le soleil se couche. Loin des lumières de la ville et de son agitation, dans une clairière secrète au cœur des montagnes, nous dressons un campement bédouin rien que pour vous : lanternes marocaines, coussins brodés, feu de bois crépitant et effluves d'herbes qui se mêlent à l'air du soir.\n\nQuand l'obscurité tombe, la Voie lactée éclate au-dessus de vous — les ciels d'Eilat sont parmi les plus sombres d'Israël, parfaits pour l'observation des étoiles. Votre guide vous emmène à travers les constellations, vous conte les histoires du désert nocturne, et vous sert un dîner bédouin traditionnel : laffas fraîchement cuites, viandes grillées, houmous maison, mezze, thé à la menthe et desserts chauds.\n\nPour ceux qui souhaitent rester, endormez-vous sous le ciel ouvert sur des matelas dans le désert — et réveillez-vous dans le silence de l'aube avec un petit-déjeuner chaud, avant que le monde ne s'éveille.`,

    descriptionHe: `מדבר אילת הופך לעולם אחר ברגע שהשמש שוקעת. רחוק מאורות העיר ומהמולתה, בסתר בין ההרים, אנו מקימים מחנה בדואי עבורכם בלבד: פנסי מרוקו, כריות רקומות, מדורת עצים חורקת וריחות עשבים הנישאים באוויר הלילה.\n\nכשהחשיכה יורדת, שביל החלב בוהק מעליכם — שמיי אילת הם מבין הכהים ביותר בישראל, אידיאליים לצפייה בכוכבים. המדריך שלכם ילווה אתכם בין הקבוצות, יספר סיפורי המדבר בלילה, וישרת ארוחת ערב בדואית מסורתית: לאפות אפויות טרי, בשר על האש, חומוס ביתי, מזה, תה נענע ועוגות חמות.\n\nלמי שרוצה להישאר — הירדמו תחת כיפת השמיים על מזרנים פרוסים במדבר, והתעוררו בדממת שחר לארוחת בוקר חמה, לפני שהעולם יתעורר.`,

    shortDescription: 'Private Bedouin camp deep in the Eilat Mountains — lanterns, campfire, traditional desert dinner, and stargazing under the darkest skies in Israel.',
    shortDescriptionFr: "Campement bédouin privé au cœur des monts d'Eilat — lanternes, feu de camp, dîner bédouin traditionnel et observation des étoiles sous les ciels les plus sombres d'Israël.",
    shortDescriptionHe: 'מחנה בדואי פרטי בלב הרי אילת — פנסים, מדורה, ארוחת ערב בדואית מסורתית וצפייה בכוכבים תחת השמיים הכהים ביותר בישראל.',

    highlights: ['Jeep ride to a secret desert clearing', 'Moroccan lanterns & Bedouin cushions', 'Wood fire & stargazing with guide', 'Traditional Bedouin dinner (laffas, grilled meats, mezze)', 'Mint tea & warm desserts', 'Overnight option — sleep under the open sky'],
    highlightsFr: ["Transfert en jeep vers une clairière secrète", "Lanternes marocaines & coussins bédouins", "Feu de bois & observation des étoiles avec guide", "Dîner bédouin traditionnel (laffas, viandes grillées, mezze)", "Thé à la menthe & desserts chauds", "Option nuit — dormir à la belle étoile"],
    highlightsHe: ["נסיעת ג'יפ לסתר מדברי", 'פנסי מרוקו וכריות בדואיות', 'מדורת עצים וצפייה בכוכבים עם מדריך', 'ארוחת ערב בדואית מסורתית (לאפות, בשר, מזה)', 'תה נענע ועוגות חמות', 'אופציית לינה — שינה תחת כיפת השמיים'],

    packages: [
      {
        name: 'Desert Dinner', nameFr: 'Dîner dans le Désert', nameHe: 'ארוחת ערב במדבר',
        price: 290, duration: '~3h',
        mealIncluded: true,
        description: 'Jeep to a secret desert site · Bedouin camp setup (lanterns, cushions, fire) · Stargazing with guide · Traditional Bedouin dinner: fresh laffas, grilled meats, hummus, mezze · Mint tea & warm desserts. Returns to hotel around midnight.',
        descriptionFr: "Jeep vers un site désertique secret · Campement bédouin (lanternes, coussins, feu) · Observation des étoiles avec guide · Dîner bédouin traditionnel : laffas fraîches, viandes grillées, houmous, mezze · Thé à la menthe & desserts chauds. Retour à l'hôtel vers minuit.",
        descriptionHe: "ג'יפ לאתר מדברי סודי · הקמת מחנה בדואי (פנסים, כריות, מדורה) · צפייה בכוכבים עם מדריך · ארוחת ערב בדואית מסורתית: לאפות טריות, בשר על האש, חומוס, מזה · תה נענע ועוגות חמות. חזרה למלון לקראת חצות.",
      },
      {
        name: 'Night Under the Stars', nameFr: 'Nuit sous les Étoiles', nameHe: 'לילה תחת הכוכבים',
        price: 490, duration: 'Overnight',
        mealIncluded: true,
        description: 'Everything in Desert Dinner + sleep on mattresses under the open desert sky · Wake to the silence of dawn · Warm Bedouin breakfast at sunrise (fresh bread, eggs, labneh, olives, seasonal fruits, coffee & tea) · Return to hotel by morning.',
        descriptionFr: "Tout du Dîner dans le Désert + nuit sur matelas sous le ciel étoilé · Réveil dans le silence de l'aube · Petit-déjeuner bédouin chaud au lever du soleil (pain frais, œufs, labneh, olives, fruits de saison, café & thé) · Retour à l'hôtel en matinée.",
        descriptionHe: "כל מה שבארוחת הערב + לינה על מזרנים תחת כיפת שמיים פתוחה · התעוררות בדממת שחר · ארוחת בוקר בדואית חמה עם הזריחה (לחם טרי, ביצים, לבנה, זיתים, פירות עונתיים, קפה ותה) · חזרה למלון בבוקר.",
      },
    ],

    includes: ['Jeep transfer to / from camp site', 'Pick-up and drop-off at hotel', 'Full Bedouin dinner', 'Stargazing guide', 'Campfire & Bedouin tea', 'Mattresses & blankets for overnight'],
    includesFr: ["Transfert jeep aller-retour au campement", "Navette aller-retour depuis l'hôtel", "Dîner bédouin complet", "Guide observation des étoiles", "Feu de camp & thé bédouin", "Matelas & couvertures pour la nuit"],
    includesHe: ["העברת ג'יפ הלוך ושוב לאתר", "הסעה הלוך ושוב מהמלון", "ארוחת ערב בדואית מלאה", "מדריך צפייה בכוכבים", "מדורה ותה בדואי", "מזרנים ושמיכות ללינה"],

    whatToBring: ['Warm layer (desert nights are cold)', 'Personal water bottle', 'Camera', 'Comfortable flat shoes', 'Sunscreen (for jeep ride)'],
    whatToBringFr: ['Couche chaude (les nuits du désert sont fraîches)', "Bouteille d'eau personnelle", 'Appareil photo', 'Chaussures plates confortables', 'Crème solaire (pour le trajet en jeep)'],
    whatToBringHe: ['שכבה חמה (לילות המדבר קרים)', 'בקבוק מים אישי', 'מצלמה', 'נעלי שטוח נוחות', 'קרם הגנה (לנסיעת הג\'יפ)'],

    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
      'https://images.unsplash.com/photo-1475552113915-6fcb52652ba2?w=800&q=80',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80',
    ],
    difficulty: 'Easy',
    rating: 4.9, reviewCount: 74,
    groupSize: '2–12', languages: ['English', 'French', 'Hebrew'],
    departure: 'Daily, Year-Round',
    badge: 'Stargazing', featured: true,
    price: 290, currency: '₪', duration: '3h / Overnight', region: 'Eilat Mountains',
  },
]

export const getFeaturedTours = () => tours.filter((t) => t.featured)
export const getTourBySlug = (slug: string) => tours.find((t) => t.slug === slug)
