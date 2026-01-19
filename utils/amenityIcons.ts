
export const AMENITY_ICON_MAP: Record<string, string> = {
  'WiFi': 'fa-wifi',
  'Shuttle': 'fa-bus',
  'Security': 'fa-shield-halved',
  'Swimming Pool': 'fa-person-swimming',
  'Gym': 'fa-dumbbell',
  'Canteen': 'fa-utensils',
  'Restaurant': 'fa-burger',
  'AC': 'fa-wind',
  'Shower': 'fa-shower',
  'Power': 'fa-bolt'
};

export const getAmenityIcon = (name: string): string => {
  return AMENITY_ICON_MAP[name] || 'fa-check';
};
