
export interface University {
  id: string;
  name: string;
  location: string;
  shortName: string;
}

export interface Hostel {
  id: string;
  name: string;
  universityId: string;
  priceRange: string;
  distance: string;
  rating: number;
  image: string;
  isRecommended: boolean;
  amenities: string[];
}

export type SortOrder = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

export interface CommunityPost {
  id: string;
  type: 'news' | 'event' | 'job';
  title: string;
  description: string;
  date: string;
  image?: string;
}

export interface Student {
  id: string;
  name: string;
  university: string;
  achievement: string;
  image: string;
  field: string;
}
