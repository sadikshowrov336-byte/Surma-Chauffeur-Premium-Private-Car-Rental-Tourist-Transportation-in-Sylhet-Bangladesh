export interface Destination {
  id: string;
  name: string;
  bengaliName: string;
  tagline: string;
  distanceKm: number;
  driveTimeHours: number;
  highlight: string;
  bestStartTime: string;
  boatInfo?: string;
  recommendedDuration: string;
  image?: string;
  baseSedanPriceBDT: number;
  baseNoahPriceBDT: number;
  baseHiAcePriceBDT: number;
  basePradoPriceBDT: number;
  description: string;
  keyStops: string[];
  tipsForTourists: string;
}

export interface Vehicle {
  id: string;
  name: string;
  tag: string;
  passengers: number;
  luggage: number;
  description: string;
  features: string[];
  suitableFor: string;
  fuelType: string;
  acType: string;
  image?: string;
}

export interface Chauffeur {
  id: string;
  name: string;
  experienceYears: number;
  languages: string[];
  tripsCompleted: number;
  rating: number;
  specialty: string;
  licenseVerified: boolean;
  hometown: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  tour: string;
  date: string;
  rating: number;
  quote: string;
  vehicleUsed: string;
}

export const CURRENCY_RATES = {
  BDT: { symbol: '৳', rate: 1, label: 'BDT (Bangladeshi Taka)' },
  USD: { symbol: '$', rate: 0.0083, label: 'USD (US Dollar)' },
  GBP: { symbol: '£', rate: 0.0065, label: 'GBP (British Pound)' },
};

export type CurrencyKey = keyof typeof CURRENCY_RATES;

export const POPULAR_PICKUP_POINTS = [
  'Sylhet City Hotels (Zindabazar / Ambarkhana / Dargah Gate)',
  'Osmani International Airport (ZYL) - Flight Arrival',
  'Sylhet Railway Station (Kadamtali)',
  'Rose View Hotel / Hotel Noorjahan Grand / Grand Sylhet',
  'Shahjalal Uposhohor Residential Area',
  'Custom Address / AirBnB in Sylhet City',
];

export const VEHICLES: Vehicle[] = [
  {
    id: 'sedan',
    name: 'Executive Sedan',
    tag: 'Toyota Premio / Allion / Axio',
    passengers: 4,
    luggage: 3,
    description: 'Pristine, whisper-quiet air-conditioned sedan tailored for couples, solo explorers, and small families seeking smooth city & highway cruising.',
    features: ['High-capacity dual climate AC', 'Padded leatherette reclining seats', 'Fast USB phone chargers', 'Clean boot for 3 standard suitcases', 'Bottled mineral water'],
    suitableFor: 'Couples, 1–3 passengers, business executives, city day tours',
    fuelType: 'Octane / Hybrid',
    acType: 'Full Super Air Conditioning',
    image: '/src/assets/images/fleet_tourist_vehicles_1793946020308.jpg'
  },
  {
    id: 'noah',
    name: 'Tourist Microbus',
    tag: 'Toyota Noah / Esquire (7 Seater)',
    passengers: 7,
    luggage: 5,
    description: 'The beloved favorite of visiting families and diaspora groups. Features versatile middle captain seats, wide panoramic windows, and ample luggage space.',
    features: ['Independent rear AC cooling vents', 'Walkthrough captain seats', 'Tinted privacy UV glass', 'Roof rack available on request', 'Child booster seat on demand'],
    suitableFor: 'Families of 4–7, UK diaspora visiting hometowns, multi-baggage travel',
    fuelType: 'CNG & Octane Hybrid',
    acType: 'Dual Roof Air Conditioning',
    image: '/src/assets/images/fleet_tourist_vehicles_1793946020308.jpg'
  },
  {
    id: 'hiace',
    name: 'Grand Cabin Van',
    tag: 'Toyota HiAce Super GL (11 Seater)',
    passengers: 11,
    luggage: 8,
    description: 'High-roof executive passenger van with extra legroom, high seating vantage point, and massive cargo volume for large groups and multi-generational family tours.',
    features: ['Overhead continuous AC ventilation', 'High roof headroom (stand-up ease)', 'Extra-large rear luggage bay', 'Smooth long-distance suspension', 'Chilled cooler box for beverages'],
    suitableFor: 'Large groups, wedding party guests, corporate offsites (8–11 travelers)',
    fuelType: 'Diesel / Octane',
    acType: 'Surround Cabin AC',
    image: '/src/assets/images/fleet_tourist_vehicles_1793946020308.jpg'
  },
  {
    id: 'prado',
    name: 'Expedition 4x4 SUV',
    tag: 'Toyota Land Cruiser Prado TX',
    passengers: 6,
    luggage: 4,
    description: 'Heavy-duty luxury four-wheel-drive vehicle offering elevated ground clearance and effortless conquering of hilly scenic roads around Meghalaya border areas.',
    features: ['Full-time 4WD all-terrain stability', 'Sumptuous leather cabin', 'Sunroof for scenic tea estate view', 'Reinforced rugged chassis', 'VIP airport protocol pickup'],
    suitableFor: 'VIP guests, photography expeditions, rainy season trail journeys',
    fuelType: 'Octane / Diesel',
    acType: 'Multi-zone Climate Control',
    image: '/src/assets/images/hero_sylhet_car_tour_1793946019099.jpg'
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'sada-pathor-ratargul',
    name: 'Bholaganj Sada Pathor + Ratargul Swamp Forest',
    bengaliName: 'ভোলাগঞ্জ সাদা পাথর ও রাতারগুল সোয়াম্প ফরেস্ট',
    tagline: 'Crystal mountain streams & the lush freshwater Amazon of Bangladesh',
    distanceKm: 95,
    driveTimeHours: 2.2,
    highlight: 'Turquoise river flowing over polished white boulders, followed by tranquil shaded wooden dinghy ride inside submerged freshwater forest.',
    bestStartTime: '7:30 AM (avoid midday sun and afternoon ghat lines)',
    boatInfo: 'Driver guides you directly to No. 10 Boat Ghat at Bholaganj and motorless rowboat at Ratargul.',
    recommendedDuration: 'Full Day (8 to 9 hours round trip)',
    image: '/src/assets/images/dest_sada_pathor_1793946020367.jpg',
    baseSedanPriceBDT: 4500,
    baseNoahPriceBDT: 5800,
    baseHiAcePriceBDT: 7200,
    basePradoPriceBDT: 10500,
    description: 'Sylhet’s most iconic day tour combination. Start north toward Companiganj to experience Sada Pathor where icy-clear meltwater rolls from Meghalaya hills. Afternoon boat glide through Ratargul swamp trees.',
    keyStops: ['Bholaganj 10 No. Ghat', 'Sada Pathor White Rock Bay', 'Meghalaya Border Vistas', 'Ratargul Swamp Forest Watchtower', 'Local riverside fish lunch'],
    tipsForTourists: 'Wear waterproof footwear or slip-on sandals. Bring spare clothes in a plastic zip bag if you plan to wade in the crystalline water.'
  },
  {
    id: 'jaflong-lalakhal',
    name: 'Jaflong Zero Point + Lalakhal Emerald River',
    bengaliName: 'জাফলং জিরো পয়েন্ট ও লালাখাল নীল নদী',
    tagline: 'Dawki border suspension view, Khasia tribal villages & emerald water cruise',
    distanceKm: 125,
    driveTimeHours: 2.5,
    highlight: 'Views of the Indian Dawki suspension bridge, Piyain river stones, and peaceful afternoon cruise on the deep turquoise waters of Shari river.',
    bestStartTime: '8:00 AM',
    boatInfo: 'Local engine boat available at Jaflong Balli Ghat and speed/rowboats at Lalakhal Tea Garden Ghat.',
    recommendedDuration: 'Full Day (8 to 10 hours)',
    image: '/src/assets/images/hero_sylhet_car_tour_1793946019099.jpg',
    baseSedanPriceBDT: 4800,
    baseNoahPriceBDT: 6200,
    baseHiAcePriceBDT: 7500,
    basePradoPriceBDT: 11000,
    description: 'Explore the foothills where the Khasi hills descend into Bangladesh. Visit Sangrampunji waterfall, walk through betel-leaf orchards, and finish with twilight tea beside Lalakhal river.',
    keyStops: ['Jaflong Zero Point & Piyain River', 'Khasia Punji Tribal Village', 'Mayabi Waterfall trail', 'Tamabil Land Port view', 'Lalakhal River Cruise & Nazimgarh Ghat'],
    tipsForTourists: 'Enjoy freshly brewed local tea at Lalakhal. Our driver remains parked safely at the ghat with your luggage secured.'
  },
  {
    id: 'bisnakandi-panthumai',
    name: 'Bisnakandi Valley + Panthumai Border Waterfall',
    bengaliName: 'বিছনাকান্দি ও পান্থুমাই ঝর্ণা',
    tagline: 'Dramatic limestone canyon streams where clouds kiss the hills',
    distanceKm: 110,
    driveTimeHours: 2.4,
    highlight: 'Layers of rolling Meghalaya peaks dropping into a wide rocky riverbed with cool fresh mountain current.',
    bestStartTime: '7:45 AM',
    boatInfo: 'Trawler boat from Gowainghat / Hadarpar bazaar to the main Bisnakandi point.',
    recommendedDuration: 'Full Day (8 hours)',
    image: '/src/assets/images/dest_ratargul_swamp_1793946019727.jpg',
    baseSedanPriceBDT: 4600,
    baseNoahPriceBDT: 6000,
    baseHiAcePriceBDT: 7400,
    basePradoPriceBDT: 10800,
    description: 'Hadarpar village drive through scenic rural countryside. Bisnakandi combines rustic wooden country boat transit with scenic wading over submerged stone terraces.',
    keyStops: ['Hadarpar Boat Terminal', 'Bisnakandi Mountain Stream', 'Panthumai Border Fall View', 'Rural Gowainghat paddy views'],
    tipsForTourists: 'Peak water volume is stunning between May and October. In winter, water is shallower and calm crystal clear.'
  },
  {
    id: 'sreemangal-tea-valley',
    name: 'Sreemangal Tea Estates + Lawachara National Park',
    bengaliName: 'শ্রীমঙ্গল চা বাগান ও লাউয়াছড়া জাতীয় উদ্যান',
    tagline: 'The Tea Capital: lush undulating tea carpets, gibbon rainforest & 7-layer tea',
    distanceKm: 180,
    driveTimeHours: 2.8,
    highlight: 'Drive through endless manicured emerald tea gardens, spot Hoolock gibbons in pristine Lawachara canopy, and taste legendary multi-layer tea.',
    bestStartTime: '6:30 AM (early departure lets you experience morning birdlife)',
    recommendedDuration: 'Full Day or Overnight (10 to 12 hours)',
    image: '/src/assets/images/fleet_tourist_vehicles_1793946020308.jpg',
    baseSedanPriceBDT: 5800,
    baseNoahPriceBDT: 7500,
    baseHiAcePriceBDT: 9200,
    basePradoPriceBDT: 13500,
    description: 'Journey south to Moulvibazar and Sreemangal. Wind through scenic Finlay & BTRI tea estates, trek under tropical rainforest canopies, and visit Baikka Beel wetland bird haven.',
    keyStops: ['Lawachara National Park Trail', 'Finlay Green Tea Gardens', 'Nilkantha 7-Layer Tea Cabin', 'Baikka Beel Lotus Sanctuary', 'Monipuri Handloom Village'],
    tipsForTourists: 'Wear lightweight walking shoes for Lawachara. Sreemangal roasted pineapple and lemon leaves are local delicacies not to miss.'
  },
  {
    id: 'sylhet-city-heritage',
    name: 'Sylhet Spiritual & City Heritage Discovery',
    bengaliName: 'সিলেট শহর ও দরগাহ ঐতিহ্য ভ্রমণ',
    tagline: 'Historic Sufi shrines, oldest tea estate & iconic Surma river landmarks',
    distanceKm: 45,
    driveTimeHours: 1.0,
    highlight: 'Pay respects at peaceful Hazrat Shah Jalal & Shah Paran shrines, walk Malnicherra tea garden (1854), and view the heritage Keane Bridge.',
    bestStartTime: '8:30 AM or 3:00 PM',
    recommendedDuration: 'Half Day (4 to 5 hours)',
    baseSedanPriceBDT: 2800,
    baseNoahPriceBDT: 3800,
    baseHiAcePriceBDT: 4800,
    basePradoPriceBDT: 7200,
    description: 'Perfect for first-time arrivals or evening tours. Experience the spiritual heart of Sylhet, sacred Mahseer fish ponds, Malnicherra colonial tea heritage, and traditional dining at Pach Bhai or Woondaal.',
    keyStops: ['Hazrat Shah Jalal (R) Mazar Sharif', 'Hazrat Shah Paran (R) Mazar', 'Malnicherra Tea Estate', 'Keane Bridge & Ali Amjad Clock', 'Zindabazar Gourmet Hub'],
    tipsForTourists: 'Modest attire is required when entering shrine grounds. Footwear storage is managed at the entry steps.'
  },
  {
    id: 'airport-railway-transfer',
    name: 'Osmani Airport (ZYL) & Rail Station VIP Transfer',
    bengaliName: 'ওসমানী বিমানবন্দর ও রেলওয়ে ভিআইপি ট্রান্সফার',
    tagline: 'Chauffeur with nameplate greeting, baggage assistance & door-to-door comfort',
    distanceKm: 30,
    driveTimeHours: 0.8,
    highlight: 'Flight tracker monitoring, complimentary waiting time, luggage assistance, and direct transfer to your hotel or village homestead.',
    bestStartTime: '24/7 round-the-clock schedule based on your arrival',
    recommendedDuration: 'Point to Point Direct Transfer',
    baseSedanPriceBDT: 1800,
    baseNoahPriceBDT: 2600,
    baseHiAcePriceBDT: 3500,
    basePradoPriceBDT: 5500,
    description: 'Step off Biman Bangladesh, US-Bangla, or Novoair flights straight into a pre-cooled private car. No haggling with aggressive street taxis or luggage carrying.',
    keyStops: ['Osmani International Airport terminal curb', 'Hotel / Guesthouse lobby drop', 'Baggage loading service'],
    tipsForTourists: 'Provide your flight number when reserving; our dispatch team tracks landing times to ensure zero waiting.'
  }
];

export const CHAUFFEURS: Chauffeur[] = [
  {
    id: 'c1',
    name: 'Kabir Ahmed',
    experienceYears: 14,
    languages: ['Sylheti', 'Bengali', 'English (Fluent)'],
    tripsCompleted: 1420,
    rating: 4.98,
    specialty: 'Sada Pathor, Ratargul, foreign tourist protocol & photography stops',
    licenseVerified: true,
    hometown: 'Amberkhana, Sylhet'
  },
  {
    id: 'c2',
    name: 'Shamim Chowdhury',
    experienceYears: 9,
    languages: ['Sylheti', 'Bengali', 'English (Conversational)'],
    tripsCompleted: 980,
    rating: 4.95,
    specialty: 'Sreemangal Tea Estates, Lawachara wildlife & local food spots',
    licenseVerified: true,
    hometown: 'Subidbazar, Sylhet'
  },
  {
    id: 'c3',
    name: 'Foyez Uddin',
    experienceYears: 18,
    languages: ['Sylheti', 'Bengali', 'English (Good)', 'Urdu'],
    tripsCompleted: 2150,
    rating: 4.99,
    specialty: 'VIP British-Bangladeshi diaspora family tours & airport arrivals',
    licenseVerified: true,
    hometown: 'Uposhohor, Sylhet'
  },
  {
    id: 'c4',
    name: 'Tarek Miah',
    experienceYears: 7,
    languages: ['Sylheti', 'Bengali', 'English (Basic)'],
    tripsCompleted: 760,
    rating: 4.93,
    specialty: 'Bisnakandi, Jaflong scenic mountain roads & safety navigation',
    licenseVerified: true,
    hometown: 'Shahi Eidgah, Sylhet'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Farhana & Tariq Rahman',
    location: 'London, United Kingdom',
    tour: '4-Day Grand Sylhet Family Tour (Sada Pathor, Sreemangal, Airport)',
    date: 'October 2026',
    rating: 5,
    quote: 'Travelling from London with elderly parents and two young children can be daunting. Surma Chauffeur made it completely painless. Kabir was punctual every morning in an immaculate Toyota Noah, navigated the bumpy Hadarpar roads with sheer grace, and helped my mother onto the boat ghat. Worth every penny!',
    vehicleUsed: 'Toyota Noah Microbus'
  },
  {
    id: 't2',
    name: 'Julian & Sophie Vance',
    location: 'Melbourne, Australia',
    tour: 'Ratargul Swamp Forest & Lalakhal Emerald Cruise',
    date: 'September 2026',
    rating: 5,
    quote: 'As international tourists who don’t speak Sylheti, having an English-speaking driver made all the difference. He negotiated our boat fee at Ratargul so we didn’t overpay, drove safely, and kept cold bottled water ready. Top tier service in Bangladesh.',
    vehicleUsed: 'Toyota Premio Sedan'
  },
  {
    id: 't3',
    name: 'Syed Tanvirul Hasan',
    location: 'Gulshan, Dhaka',
    tour: 'Sada Pathor & Jaflong Corporate Retreat',
    date: 'November 2026',
    rating: 5,
    quote: 'Booked two HiAce Grand Cabins for our marketing team offsite. Air conditioning was ice-cold throughout the 35°C humid afternoon, vehicles smelled fresh, and the billing was 100% transparent. No hidden driver food or fuel demands.',
    vehicleUsed: 'Toyota HiAce Super GL'
  }
];

export const FAQS = [
  {
    q: 'What is included in the quoted private car fare?',
    a: 'Every reservation includes the private vehicle for your exclusive use, professional vetted local chauffeur, unlimited air conditioning, fuel/CNG costs, and driver honorarium. No surprise fuel or overtime charges when staying within standard tour hours.'
  },
  {
    q: 'How does airport pickup work at Sylhet Osmani International (ZYL)?',
    a: 'Your designated chauffeur arrives 30 minutes before your scheduled landing with a digital or printed name sign outside the arrival terminal gate. We monitor your flight live, so delays incur zero waiting surcharge.'
  },
  {
    q: 'Can the driver assist us with local boats at Ratargul and Sada Pathor?',
    a: 'Yes! Our chauffeurs know all official government boat counters (such as No. 10 Ghat in Bholaganj and the forest office boat counter at Ratargul). They escort you to the counter to ensure fair regulated ticket rates and accompany you to the boarding point.'
  },
  {
    q: 'Can we customize our itinerary or add lunch stops along the way?',
    a: 'Absolutely. It is your private car. You can pause anytime for scenic tea garden photography, stop for fresh 5-layer tea, or enjoy authentic Sylheti roast beef and river fish at famous spots like Pach Bhai, Panshi, or Woondaal.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Cash in BDT upon journey completion, bKash / Nagad mobile banking, Bangladeshi debit/credit cards, and international card payments or UK bank transfers for advance diaspora bookings.'
  },
  {
    q: 'Do you offer multi-day car hire with driver for our ancestral village visits?',
    a: 'Yes. Many expatriates hire our vehicles for 2 to 7 days to visit family homesteads in Beanibazar, Golapganj, Jagannathpur, Moulvibazar, Habiganj, and Sunamganj. Driver night allowance (৳1,000/night outside Sylhet city) covers their lodging and meals.'
  }
];
