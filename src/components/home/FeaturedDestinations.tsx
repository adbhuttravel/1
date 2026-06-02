
import PackageCard from "@/components/shared/PackageCard";
import type { Package } from "@/lib/types";

const featuredPackages: Package[] = [
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

export default function FeaturedDestinations() {
  return (
    <section className="py-12 md:py-24 bg-secondary">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-2">
          Featured Packages
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          Explore breathtaking journeys handpicked by our travel experts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}

    