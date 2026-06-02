export type Facility = 
  | 'flight' 
  | 'hotel' 
  | 'transport' 
  | 'meals'
  | 'sightseeing'
  | 'guide'
  | 'visa'
  | 'insurance'
  | 'permit'
  | 'spa'
  | 'wifi'
  | 'veg';

export interface ItineraryDay {
  day: number;
  title: string;
  details: string[];
}

export interface Package {
  id: string;
  name: string;
  image: string;
  dataAiHint: string;
  duration: string;
  packageType?: string;
  facilities?: Facility[];
  gallery?: string[];
  galleryHints?: string[];
  itinerary: ItineraryDay[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
}

export interface BlogPost {
  id: string;
  created_at: string;
  updated_at?: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url?: string;
  status: 'draft' | 'published' | 'archived';
}
