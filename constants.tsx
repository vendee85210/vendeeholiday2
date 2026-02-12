
import React from 'react';
import { Property, CalendarStatus } from './types';

const generateAvailability = () => {
  const availability: Record<string, CalendarStatus> = {};
  const today = new Date();
  for (let i = -30; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const rand = Math.random();
    if (rand > 0.85) availability[dateStr] = CalendarStatus.BOOKED;
    else if (rand > 0.8) availability[dateStr] = CalendarStatus.HELD;
    else availability[dateStr] = CalendarStatus.AVAILABLE;
  }
  return availability;
};

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Villa Beausoleil',
    location: 'Saint-Jean-de-Monts',
    region: 'Coastal',
    description: {
      en: 'A stunning coastal villa with a heated infinity pool and panoramic views of the Atlantic. Perfect for family reunions.',
      fr: 'Une superbe villa côtière avec piscine à débordement chauffée et vue panoramique sur l\'Atlantique.'
    },
    pricePerNight: 245,
    sleeps: 8,
    bedrooms: 4,
    bathrooms: 3,
    images: [
      'https://picsum.photos/seed/v1/1200/800',
      'https://picsum.photos/seed/v1b/1200/800',
      'https://picsum.photos/seed/v1c/1200/800'
    ],
    hasPool: true,
    distanceToBeach: 0.5,
    petFriendly: true,
    wifi: true,
    features: ['Heated Pool', 'Sea View', 'BBQ', 'Air Con'],
    availability: generateAvailability(),
    reviews: [],
    coordinates: { lat: 46.7865, lng: -2.0621 }
  },
  {
    id: '2',
    name: 'Le Gîte des Glycines',
    location: 'Apremont',
    region: 'Countryside',
    description: {
      en: 'Traditional stone cottage set in extensive gardens near the historic Apremont castle. Peaceful and romantic.',
      fr: 'Gîte traditionnel en pierre niché dans de vastes jardins près du château d\'Apremont.'
    },
    pricePerNight: 110,
    sleeps: 4,
    bedrooms: 2,
    bathrooms: 1,
    images: [
      'https://picsum.photos/seed/v2/1200/800',
      'https://picsum.photos/seed/v2b/1200/800'
    ],
    hasPool: false,
    distanceToBeach: 25,
    petFriendly: false,
    wifi: true,
    features: ['Fireplace', 'Garden', 'Bikes Included'],
    availability: generateAvailability(),
    reviews: [],
    coordinates: { lat: 46.7501, lng: -1.7408 }
  },
  {
    id: '3',
    name: 'Manoir de l\'Océan',
    location: 'Les Sables-d\'Olonne',
    region: 'Coastal',
    description: {
      en: 'Luxury manor house within walking distance to the famous Vendée Globe harbor. High-end finishes throughout.',
      fr: 'Manoir de luxe à quelques pas du port du Vendée Globe. Prestations haut de gamme.'
    },
    pricePerNight: 350,
    sleeps: 12,
    bedrooms: 6,
    bathrooms: 4,
    images: [
      'https://picsum.photos/seed/v3/1200/800',
      'https://picsum.photos/seed/v3b/1200/800'
    ],
    hasPool: true,
    distanceToBeach: 1.2,
    petFriendly: true,
    wifi: true,
    features: ['Home Cinema', 'Jacuzzi', 'Chef Available'],
    availability: generateAvailability(),
    reviews: [],
    coordinates: { lat: 46.4967, lng: -1.7850 }
  },
  // Adding more to fulfill 12-15 requirement
  ...Array.from({ length: 9 }).map((_, i) => ({
    id: `${i + 4}`,
    name: `Vendée Retreat ${i + 4}`,
    location: ['Noirmoutier', 'Bretignolles-sur-Mer', 'Jard-sur-Mer', 'La Roche-sur-Yon'][i % 4],
    region: i % 2 === 0 ? 'Coastal' : 'Countryside',
    description: {
      en: 'A wonderful holiday home perfect for exploring the beautiful Vendée region.',
      fr: 'Une magnifique maison de vacances idéale pour explorer la belle région vendéenne.'
    },
    pricePerNight: 150 + (i * 20),
    sleeps: 6 + (i % 3),
    bedrooms: 3 + (i % 2),
    bathrooms: 2,
    images: [`https://picsum.photos/seed/v${i + 4}/1200/800`],
    hasPool: i % 2 === 0,
    distanceToBeach: i % 3 === 0 ? 0.2 : 5,
    petFriendly: i % 4 === 0,
    wifi: true,
    features: ['Garden', 'BBQ'],
    availability: generateAvailability(),
    reviews: [],
    coordinates: { lat: 46.5 + (Math.random() * 0.5), lng: -1.8 + (Math.random() * 0.5) }
  }))
];
