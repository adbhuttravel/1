
import Hero from "@/components/home/Hero";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import PackageShowcase from "@/components/home/PackageShowcase";
import Testimonials from "@/components/home/Testimonials";
import TailoredExperience from "@/components/home/TailoredExperience";
import type { Package } from "@/lib/types";
import GroupImagesCarousel from "@/components/home/GroupImagesCarousel";

const domesticPackages: Package[] = [
  {
    id: '1',
    name: 'Couple Kashmir Package',
    image: '/images/services/Home/Feature Kashmir.jpg',
    dataAiHint: 'Kashmir snow couple',
    duration: '04 Nights / 05 Days',
    packageType: '(Couple)',
    facilities: ['flight', 'hotel', 'transport', 'meals', 'sightseeing'],
    gallery: [
        '/images/services/Home/Feature Kashmir.jpg'
    ],
    galleryHints: ["Kashmir snow couple"],
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar & Dal Lake', details: ['Arrive at Srinagar Airport, where our representative will greet you and escort you to your charming houseboat on Dal Lake. After settling in, embark on a serene Shikara ride, gliding across the tranquil waters to witness floating gardens and vibrant markets.'] },
      { day: 2, title: 'Gulmarg Gondola & Alpine Views', details: ['Journey to Gulmarg, the "Meadow of Flowers." Ascend via the famous Gulmarg Gondola to Kongdoori Station, where you\'ll be met with breathtaking panoramic views of snow-capped peaks. Spend the afternoon exploring the alpine meadows before returning to Srinagar.'] },
      { day: 3, title: 'Pahalgam\'s Valleys & Scenery', details: ['Travel to Pahalgam, the "Valley of Shepherds." Discover the stunning beauty of Aru Valley and Betaab Valley, settings for many Bollywood films. Enjoy a peaceful walk along the Lidder River, surrounded by pristine nature.'] },
      { day: 4, title: 'Sonmarg, the Meadow of Gold', details: ['Explore Sonmarg, known for its golden meadows and dramatic landscapes. Take an optional pony ride to the Thajiwas Glacier to witness its grandeur up close. The day is filled with incredible photo opportunities and fresh mountain air.'] },
      { day: 5, title: 'Departure from Srinagar', details: ['After a final Kashmiri breakfast, we will transfer you to Srinagar Airport for your departure, leaving you with unforgettable memories of your romantic escape.'] }
    ]
  },
  {
    id: '2',
    name: '4 Person Leh Ladakh',
    image: '/images/services/Home/Feature Leh.jpg',
    dataAiHint: 'Ladakh mountains snow',
    duration: '04 Nights / 05 Days',
    packageType: '(4 Person)',
    facilities: ['hotel', 'transport', 'meals', 'sightseeing', 'guide'],
    gallery: [
       '/images/services/Home/Feature Leh.jpg'
    ],
    galleryHints: ["Ladakh mountains snow"],
    itinerary: [
      { day: 1, title: 'Arrival & Acclimatization in Leh', details: ['Fly into Leh and take the full day to acclimatize to the high altitude (11,500 ft), which is crucial for a healthy trip. In the evening, take a gentle stroll to Shanti Stupa for a panoramic sunset view over the valley.'] },
      { day: 2, title: 'Monastery Tour & Local Culture', details: ['Immerse yourself in Ladakhi culture with visits to the region\'s most famous monasteries. Explore the grandeur of Thiksey Monastery and the ancient treasures of Hemis Monastery, the largest in Ladakh.'] },
      { day: 3, title: 'Nubra Valley via Khardung La', details: ['Embark on a thrilling drive to Nubra Valley over Khardung La, one of the world\'s highest motorable passes. In Hunder, enjoy a unique double-humped Bactrian camel ride across the cold desert sand dunes.'] },
      { day: 4, title: 'The Spectacle of Pangong Lake', details: ['Journey to the mesmerizing Pangong Lake, a high-altitude saline lake that famously changes color with the shifting light. Spend the afternoon taking in the breathtaking views before returning to Leh.'] },
      { day: 5, title: 'Departure from Leh', details: ['After breakfast, you will be transferred to Leh Airport, filled with incredible memories of your high-altitude adventure with your group.'] }
    ]
  },
  {
    id: '3',
    name: 'Char dham yatra',
    image: '/images/services/Home/Feature Char Dham.jpg',
    dataAiHint: 'himalayas temple pilgrimage',
    duration: '09 Nights / 10 Days',
    packageType: '(Group)',
    facilities: ['hotel', 'transport', 'meals', 'guide', 'permit'],
    gallery: [
       '/images/services/Home/Feature Char Dham.jpg'
    ],
    galleryHints: ["himalayas temple pilgrimage"],
    itinerary: [
      { day: 1, title: 'Delhi to Haridwar', details: ['Your spiritual journey begins as we drive from Delhi to the holy city of Haridwar. In the evening, witness the captivating Ganga Aarti ceremony at Har Ki Pauri, a truly divine experience.'] },
      { day: 2, title: 'Haridwar to Barkot', details: ['Travel to Barkot, the gateway to Yamunotri. The scenic drive takes you through Mussoorie, offering beautiful views of the Himalayan foothills.'] },
      { day: 3, title: 'Yamunotri Darshan', details: ['Drive to Janki Chatti and begin the trek to Yamunotri, the source of the Yamuna River. After seeking blessings at the temple, return to Barkot for the night.'] },
      { day: 4, title: 'Barkot to Uttarkashi', details: ['Proceed to Uttarkashi, a town situated on the banks of the Bhagirathi river. Visit the ancient Vishwanath Temple in the evening.'] },
      { day: 5, title: 'Gangotri Darshan', details: ['Journey to Gangotri, the origin of the sacred River Ganges. Offer your prayers at the temple and soak in the spiritual atmosphere before returning to Uttarkashi.'] },
      { day: 6, title: 'Uttarkashi to Guptkashi', details: ['A long but scenic drive takes you to Guptkashi, an important town on the route to Kedarnath, with views of the Mandakini river valley.'] },
      { day: 7, title: 'Kedarnath Darshan', details: ['Drive to Sonprayag and then trek or take a helicopter to the holy shrine of Kedarnath, one of the twelve Jyotirlingas of Lord Shiva. The temple\'s majestic setting is awe-inspiring.'] },
      { day: 8, title: 'Return to Guptkashi', details: ['After morning prayers at Kedarnath, trek back down to Sonprayag and drive to Guptkashi for a well-deserved rest.'] },
      { day: 9, title: 'Guptkashi to Badrinath', details: ['Travel to Badrinath, the sacred abode of Lord Vishnu. Check into your hotel and visit the Badrinath Temple for the evening Aarti.'] },
      { day: 10, title: 'Badrinath to Rishikesh/Delhi', details: ['After a final darshan and a visit to Mana, the last village before the Indo-Tibetan border, we begin our journey back towards Rishikesh/Delhi, concluding the sacred pilgrimage.'] }
    ]
  },
];

const internationalPackages: Package[] = [
  {
    id: '4',
    name: 'Couple Malaysia trip',
    image: '/images/services/Home/Feature Singapore.jpg',
    dataAiHint: 'Malaysia city skyline',
    duration: '04 Nights / 05 Days',
    packageType: '(Couple)',
    facilities: ['flight', 'hotel', 'transport', 'meals', 'visa'],
    gallery: [
        '/images/services/Home/Feature Singapore.jpg'
    ],
    galleryHints: ["Malaysia city skyline"],
    itinerary: [
      { day: 1, title: 'Arrival in Kuala Lumpur', details: ['Arrive at Kuala Lumpur International Airport (KUL) and transfer to your hotel. Spend the evening at leisure, perhaps exploring the vibrant Bukit Bintang shopping and entertainment district.'] },
      { day: 2, title: 'City Tour & Cultural Landmarks', details: ['Discover Kuala Lumpur\'s icons. Pose for photos at the magnificent Petronas Twin Towers, visit the historic Independence Square, and climb the steps to the sacred Batu Caves, a Hindu shrine set within a limestone hill.'] },
      { day: 3, title: 'Genting Highlands Day Trip', details: ['Take a scenic drive to the cool mountain air of the Genting Highlands. Enjoy a breathtaking cable car ride over the rainforest canopy and explore the resort\'s attractions, including an indoor theme park and casino.'] },
      { day: 4, title: 'Langkawi Island Escape', details: ['Fly to the beautiful island of Langkawi. Check into your beachside resort and spend the day relaxing on the white sandy beaches or taking a dip in the turquoise waters of the Andaman Sea.'] },
      { day: 5, title: 'Departure', details: ['Enjoy a final Malaysian breakfast before transferring to Langkawi Airport for your flight home, filled with wonderful memories.'] }
    ]
  },
  {
    id: '5',
    name: 'Paris tour',
    image: '/images/services/Home/Feature Paris.jpg',
    dataAiHint: 'Eiffel Tower',
    duration: '04 Nights / 05 Days',
    packageType: '(One Person)',
    facilities: ['flight', 'hotel', 'sightseeing', 'guide', 'insurance'],
    gallery: [
        '/images/services/Home/Feature Paris.jpg'
    ],
    galleryHints: ["Eiffel Tower"],
    itinerary: [
      { day: 1, title: 'Arrival in Paris & First Impressions', details: ['Bienvenue à Paris! Arrive at Charles de Gaulle Airport (CDG) and transfer to your hotel. Settle in and take a leisurely walk through your neighborhood, soaking in the city\'s unique atmosphere and charm.'] },
      { day: 2, title: 'Iconic Landmarks & Masterpieces', details: ['Ascend the Eiffel Tower for breathtaking views of the city. Later, immerse yourself in art history at the Louvre Museum, where you\'ll come face-to-face with timeless masterpieces like the Mona Lisa and the Venus de Milo.'] },
      { day: 3, title: 'Artistic Montmartre & River Cruise', details: ['Explore the cobblestone streets of Montmartre, visit the beautiful Sacré-Cœur Basilica, and watch artists at work in Place du Tertre. In the evening, enjoy a relaxing cruise along the Seine River for a magical perspective of Paris by night.'] },
      { day: 4, title: 'The Splendor of Versailles', details: ['Take a day trip to the magnificent Palace of Versailles, a symbol of absolute monarchy. Wander through the opulent Hall of Mirrors, the lavish royal apartments, and the vast, manicured gardens designed by Le Nôtre.'] },
      { day: 5, title: 'Au Revoir, Paris', details: ['Enjoy one last Parisian breakfast with a croissant and café au lait before heading to the airport for your departure, carrying with you the unforgettable memories of your solo adventure in the City of Light.'] }
    ]
  },
  {
    id: '6',
    name: 'Honeymoon in Bali',
    image: '/images/services/Home/Feature Bali.jpg',
    dataAiHint: 'Bali temple lake',
    duration: '7 night 8 days',
    packageType: '(Honeymoon Couple)',
    facilities: ['flight', 'hotel', 'transport', 'meals', 'sightseeing', 'spa'],
    gallery: [
      '/images/services/Home/Feature Bali.jpg'
    ],
    galleryHints: ["Bali temple lake"],
    itinerary: [
      { day: 1, title: 'Arrival in Cultural Ubud', details: ['Welcome to Bali! Arrive at Denpasar Airport (DPS) and be whisked away to your private villa in the heart of cultural Ubud. Settle in and enjoy a romantic welcome dinner surrounded by lush greenery.'] },
      { day: 2, title: 'Ubud\'s Rice Terraces & Monkey Forest', details: ['Explore the iconic Tegalalang Rice Terraces, a stunning example of Bali\'s subak irrigation system. Afterwards, visit the Sacred Monkey Forest Sanctuary to meet its playful inhabitants.'] },
      { day: 3, title: 'Volcano Views & Spiritual Cleansing', details: ['Journey to Kintamani to witness the majestic Mount Batur volcano and its crater lake. Later, experience a traditional purification ceremony at the holy water temple of Tirta Empul.'] },
      { day: 4, title: 'Relaxation & Transfer to Seminyak', details: ['Indulge in a leisurely morning with a traditional Balinese couple\'s spa treatment at your villa. In the afternoon, travel to the stylish beach town of Seminyak, known for its chic boutiques and vibrant sunsets.'] },
      { day: 5, title: 'Uluwatu Temple & Sunset Kecak Dance', details: ['Spend the morning enjoying water sports or relaxing on the beach. In the evening, visit the dramatic Uluwatu Temple, perched on a cliff edge, and witness the captivating Kecak fire dance at sunset.'] },
      { day: 6, title: 'Island Escape to Nusa Penida', details: ['Embark on an exciting day trip to the pristine island of Nusa Penida. Discover breathtaking landscapes, including the famous Kelingking "T-Rex" Beach and the natural infinity pool of Angel\'s Billabong.'] },
      { day: 7, title: 'Leisure and Lasting Memories', details: ['Enjoy your final full day in paradise at your own pace. Relax on Seminyak beach, shop for unique souvenirs, or explore the area\'s renowned cafes and restaurants for a final taste of Bali.'] },
      { day: 8, title: 'Departure from Paradise', details: ['After a final breakfast, we will transfer you to the airport for your flight home, with hearts full of cherished honeymoon memories.'] }
    ]
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <GroupImagesCarousel />
      <FeaturedDestinations />
      <PackageShowcase id="domestic-packages" title="Popular Domestic Packages" packages={domesticPackages} />
      <PackageShowcase id="international-packages" title="Popular International Packages" packages={internationalPackages} />
      <TailoredExperience />
      <Testimonials />
    </div>
  );
}

    