
export type Language = 'en' | 'fr';

export enum CalendarStatus {
  AVAILABLE = 'available',
  BOOKED = 'booked',
  HELD = 'held'
}

export interface Amenity {
  id: string;
  icon: string;
  label: Record<Language, string>;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  region: string;
  description: Record<Language, string>;
  pricePerNight: number;
  sleeps: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  hasPool: boolean;
  distanceToBeach: number; // in km
  petFriendly: boolean;
  wifi: boolean;
  features: string[];
  availability: Record<string, CalendarStatus>; // ISO date string -> status
  reviews: Review[];
  coordinates: { lat: number; lng: number };
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: Record<Language, string>;
}

export interface Enquiry {
  id: string;
  propertyId: string;
  propertyName: string;
  name: string;
  email: string;
  startDate: string;
  endDate: string;
  guests: number;
  message: string;
  status: 'pending' | 'replied' | 'archived';
  timestamp: string;
}

export interface TranslationSchema {
  nav: {
    home: string;
    properties: string;
    guide: string;
    about: string;
    contact: string;
    admin: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    searchBtn: string;
    featuredTitle: string;
    whyBookTitle: string;
    whyBook1: string;
    whyBook1Desc: string;
    whyBook2: string;
    whyBook2Desc: string;
    whyBook3: string;
    whyBook3Desc: string;
    newsletterTitle: string;
    newsletterDesc: string;
    subscribe: string;
  };
  listing: {
    filters: string;
    gridView: string;
    listView: string;
    mapView: string;
    noResults: string;
    priceRange: string;
    capacity: string;
  };
  property: {
    sleeps: string;
    bedrooms: string;
    pool: string;
    beach: string;
    amenities: string;
    availability: string;
    pricing: string;
    enquire: string;
    holdBtn: string;
    reviews: string;
    location: string;
  };
  admin: {
    dashboard: string;
    manageProperties: string;
    enquiries: string;
    settings: string;
  };
}
