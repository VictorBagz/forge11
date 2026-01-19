/**
 * Image asset paths and configuration
 * This file centralizes all image references for easy management
 */

export const IMAGE_PATHS = {
  hostels: {
    douglasVilla: '/images/hostels/douglas-villa.jpg',
    olympiaHostel: '/images/hostels/olympia-hostel.jpg',
    bandaExecutive: '/images/hostels/banda-executive.jpg',
    valleyView: '/images/hostels/valley-view.jpg',
    skylinePremium: '/images/hostels/skyline-premium.jpg',
  },
  community: {
    libraryWings: '/images/community/library-wings.jpg',
    freshersBall: '/images/community/freshers-ball.jpg',
  },
  students: {
    namonoSarah: '/images/students/namono-sarah.jpg',
    okelloJohn: '/images/students/okello-john.jpg',
  },
  hero: {
    main: '/images/hero/main-hero.jpg',
  },
} as const;

export const IMAGE_SPECS = {
  hostel: {
    width: 800,
    height: 600,
    format: 'jpg',
  },
  community: {
    width: 600,
    height: 400,
    format: 'jpg',
  },
  student: {
    width: 400,
    height: 400,
    format: 'jpg',
  },
  hero: {
    width: 1200,
    height: 600,
    format: 'jpg',
  },
} as const;
