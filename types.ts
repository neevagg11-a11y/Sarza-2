export interface EventStats {
  crowdSize: string;
  bpmRange: string;
  genderRatio: {
    male: number;
    female: number;
  };
  ageRange: string;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  fee: number;
  available: number;
  total: number;
  benefits: string[];
  status: 'available' | 'selling_fast' | 'sold_out' | 'waitlist';
}

export interface PastEdition {
  year: number;
  status: 'completed' | 'cancelled';
  attendance: number;
  highlight: string;
  image: string;
}

export interface Event {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  date: string;
  venue: string;
  city: string;
  image: string;
  videoPreview: string; // Placeholder for video URL
  musicalIdentity: string[];
  vibeTags: string[];
  price: number;
  stats: EventStats;
  description: string;
  originStory: string;
  pastEditions: PastEdition[];
  tickets: TicketTier[];
  organizer: string;
}

export interface VibeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}