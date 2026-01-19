
import { University, Hostel, CommunityPost, Student } from './types';

export const UNIVERSITIES: University[] = [
  { id: '1', name: 'Makerere University', location: 'Kampala', shortName: 'MAK' },
  { id: '2', name: 'Kyambogo University', location: 'Kampala', shortName: 'KYU' },
  { id: '3', name: 'Mbarara University of Science & Tech', location: 'Mbarara', shortName: 'MUST' },
  { id: '4', name: 'Makerere Business School', location: 'Nakawa', shortName: 'MUBS' },
  { id: '5', name: 'Gulu University', location: 'Gulu', shortName: 'GULU' },
  { id: '6', name: 'Uganda Christian University', location: 'Mukono', shortName: 'UCU' },
];

export const HOSTELS: Hostel[] = [
  {
    id: 'h1',
    name: 'Douglas Villa',
    universityId: '1',
    priceRange: 'UGX 800k - 1.2M',
    distance: '200m from Main Gate',
    rating: 4.8,
    image: 'https://picsum.photos/seed/hostel1/800/600',
    isRecommended: true,
    amenities: ['WiFi', 'Shuttle', 'Security']
  },
  {
    id: 'h2',
    name: 'Olympia Hostel',
    universityId: '1',
    priceRange: 'UGX 1.2M - 2.5M',
    distance: '500m from Law Faculty',
    rating: 4.9,
    image: 'https://picsum.photos/seed/hostel2/800/600',
    isRecommended: true,
    amenities: ['Swimming Pool', 'Gym', 'WiFi']
  },
  {
    id: 'h3',
    name: 'Banda Executive',
    universityId: '2',
    priceRange: 'UGX 600k - 900k',
    distance: '100m from West Gate',
    rating: 4.2,
    image: 'https://picsum.photos/seed/hostel3/800/600',
    isRecommended: false,
    amenities: ['Canteen', 'WiFi']
  },
  {
    id: 'h4',
    name: 'Valley View',
    universityId: '4',
    priceRange: 'UGX 1.0M - 1.5M',
    distance: '300m from Nakawa',
    rating: 4.5,
    image: 'https://picsum.photos/seed/hostel4/800/600',
    isRecommended: true,
    amenities: ['Shuttle', 'Restaurant']
  },
  {
    id: 'h5',
    name: 'Skyline Premium',
    universityId: '6',
    priceRange: 'UGX 1.5M+',
    distance: '50m from Mukono Gate',
    rating: 4.7,
    image: 'https://picsum.photos/seed/hostel5/800/600',
    isRecommended: true,
    amenities: ['AC', 'Gym', 'WiFi']
  }
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    type: 'news',
    title: 'New Library Wings Open',
    description: 'The long-awaited expansion of the Main Library is finally complete.',
    date: 'Oct 24, 2023',
    image: 'https://picsum.photos/seed/news1/600/400'
  },
  {
    id: 'p2',
    type: 'event',
    title: 'Freshers Ball 2024',
    description: 'Join us for the biggest welcome party of the semester featuring top Ugandan artists.',
    date: 'Nov 12, 2023',
    image: 'https://picsum.photos/seed/event1/600/400'
  },
  {
    id: 'p3',
    type: 'job',
    title: 'Data Analyst Internship',
    description: 'MTN Uganda is looking for proactive student interns for the IT department.',
    date: 'Deadline: Nov 30',
  }
];

export const SPOTLIGHT_STUDENTS: Student[] = [
  {
    id: 's1',
    name: 'Namono Sarah',
    university: 'Makerere University',
    achievement: 'Developed a low-cost irrigation system for rural farmers.',
    image: 'https://picsum.photos/seed/student1/400/400',
    field: 'Engineering'
  },
  {
    id: 's2',
    name: 'Okello John',
    university: 'Kyambogo University',
    achievement: 'Won the National Debate Championship for three consecutive years.',
    image: 'https://picsum.photos/seed/student2/400/400',
    field: 'Social Sciences'
  }
];
