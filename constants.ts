import { Event, VibeCategory } from './types';

export const VIBES: VibeCategory[] = [
  { id: 'underground', name: 'Underground & Raw', description: 'Techno, Industrial', icon: '🌀', image: 'https://picsum.photos/seed/techno/400/600' },
  { id: 'euphoric', name: 'Euphoric & Uplifting', description: 'Progressive House, Trance', icon: '✨', image: 'https://picsum.photos/seed/trance/400/600' },
  { id: 'artsy', name: 'Artsy & Avant-Garde', description: 'Experimental, Installations', icon: '🎨', image: 'https://picsum.photos/seed/art/400/600' },
  { id: 'spiritual', name: 'Conscious & Spiritual', description: 'Wellness, Ecstatic Dance', icon: '🧘', image: 'https://picsum.photos/seed/yoga/400/600' },
  { id: 'high-energy', name: 'High-Energy', description: 'Hard Techno, Psytrance', icon: '🔥', image: 'https://picsum.photos/seed/fire/400/600' },
  { id: 'chill', name: 'Chill & Melodic', description: 'Downtempo, Organic', icon: '🌊', image: 'https://picsum.photos/seed/chill/400/600' },
];

export const EVENTS: Event[] = [
  {
    id: '1',
    slug: 'sunburn-reload-2026',
    name: 'Sunburn Reload: The Journey',
    tagline: "Where Techno Souls Converge",
    date: 'Sat, Mar 15 • 10 PM',
    venue: 'Mehboob Studio',
    city: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop',
    videoPreview: 'https://cdn.pixabay.com/video/2023/10/24/186358-877960161_large.mp4',
    musicalIdentity: ['Techno', 'Melodic House', 'Progressive'],
    vibeTags: ['Underground', 'High-Energy'],
    price: 1500,
    stats: {
      crowdSize: '800-1000',
      bpmRange: '125-135',
      genderRatio: { male: 52, female: 48 },
      ageRange: '25-32'
    },
    description: "Experience the vibe before you arrive. This isn't just a gig; it's a ritual.",
    originStory: "In 2018, three friends sitting on Marine Drive wanted to create something Mumbai had never experienced. They sought a sanctuary where the music wasn't just background noise, but the protagonist.",
    organizer: "Sunburn",
    pastEditions: [
      { year: 2019, status: 'completed', attendance: 1200, highlight: 'The Beginning', image: 'https://picsum.photos/seed/2019/300/450' },
      { year: 2020, status: 'cancelled', attendance: 0, highlight: 'Pandemic Pause', image: 'https://picsum.photos/seed/2020/300/450' },
      { year: 2021, status: 'completed', attendance: 2500, highlight: 'Grand Comeback', image: 'https://picsum.photos/seed/2021/300/450' },
      { year: 2022, status: 'completed', attendance: 3200, highlight: 'Expanded to 2 Stages', image: 'https://picsum.photos/seed/2022/300/450' },
      { year: 2023, status: 'completed', attendance: 4500, highlight: 'Biggest Yet', image: 'https://picsum.photos/seed/2023/300/450' },
    ],
    tickets: [
      {
        id: 'early-bird',
        name: 'Phase 1: Early Bird',
        price: 1500,
        fee: 150,
        available: 0,
        total: 100,
        benefits: ['Entry to all areas', 'Best Price'],
        status: 'sold_out'
      },
      {
        id: 'general',
        name: 'Phase 2: General Admission',
        price: 1800,
        fee: 180,
        available: 420,
        total: 500,
        benefits: ['Entry to all areas', 'Complimentary Water', 'Coat Check'],
        status: 'selling_fast'
      },
      {
        id: 'vip',
        name: 'VIP Experience',
        price: 3500,
        fee: 350,
        available: 15,
        total: 50,
        benefits: ['Dedicated VIP Lounge', 'Priority Entry', '2 Complimentary Drinks', 'Meet & Greet'],
        status: 'selling_fast'
      }
    ]
  },
  {
    id: '2',
    slug: 'echoes-of-earth',
    name: 'Echoes of Earth',
    tagline: "India's Greenest Music Festival",
    date: 'Sun, Apr 10 • 4 PM',
    venue: 'Embassy Riding School',
    city: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop',
    videoPreview: 'https://cdn.pixabay.com/video/2021/08/04/83956-584735313_large.mp4',
    musicalIdentity: ['Live', 'Jazz', 'Electronica'],
    vibeTags: ['Sustainable', 'Chill', 'Artsy'],
    price: 2500,
    stats: {
      crowdSize: '3000+',
      bpmRange: '90-120',
      genderRatio: { male: 45, female: 55 },
      ageRange: '21-35'
    },
    description: "A celebration of music, art, and nature.",
    originStory: "Born from a desire to celebrate the earth through art and music.",
    organizer: "Swordfish",
    pastEditions: [],
    tickets: []
  },
  {
    id: '3',
    slug: 'magnetic-fields',
    name: 'Magnetic Fields',
    tagline: "Lawns of Alsisar Mahal",
    date: 'Dec 15-17',
    venue: 'Alsisar Mahal',
    city: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2070&auto=format&fit=crop',
    videoPreview: 'https://cdn.pixabay.com/video/2023/10/24/186358-877960161_large.mp4',
    musicalIdentity: ['Techno', 'House', 'Ambient'],
    vibeTags: ['Cultural', 'Theatrical', 'Immersive'],
    price: 12000,
    stats: {
      crowdSize: '5000',
      bpmRange: '110-140',
      genderRatio: { male: 50, female: 50 },
      ageRange: '25-40'
    },
    description: "More than a festival, it's a dream.",
    originStory: "A meeting of ancient heritage and modern culture.",
    organizer: "Wild City",
    pastEditions: [],
    tickets: []
  }
];