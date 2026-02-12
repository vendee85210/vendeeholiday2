
import { TranslationSchema } from './types';

export const translations: Record<'en' | 'fr', TranslationSchema> = {
  en: {
    nav: {
      home: 'Home',
      properties: 'All Properties',
      guide: 'Vendée Guide',
      about: 'About Us',
      contact: 'Contact',
      admin: 'Owner Login'
    },
    home: {
      heroTitle: 'Find Your Perfect Vendée Escape',
      heroSubtitle: 'Handpicked gites and villas with private pools in the heart of the French countryside.',
      searchPlaceholder: 'Where are you going?',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      guests: 'Guests',
      searchBtn: 'Search',
      featuredTitle: 'Featured Properties',
      whyBookTitle: 'Why Book With Us?',
      whyBook1: 'Direct Owner Contact',
      whyBook1Desc: 'Speak directly with those who know the property best.',
      whyBook2: 'No Booking Fees',
      whyBook2Desc: 'Save up to 15% by booking direct without platform commissions.',
      whyBook3: 'Free 48h Options',
      whyBook3Desc: 'Hold your favorite property for free while you finalize travel.',
      newsletterTitle: 'Stay in the loop',
      newsletterDesc: 'Get the latest special offers and Vendée travel tips.',
      subscribe: 'Subscribe'
    },
    listing: {
      filters: 'Advanced Filters',
      gridView: 'Grid View',
      listView: 'List View',
      mapView: 'Map View',
      noResults: 'No properties found matching your criteria.',
      priceRange: 'Price per night',
      capacity: 'Sleeps up to'
    },
    property: {
      sleeps: 'Sleeps',
      bedrooms: 'Bedrooms',
      pool: 'Private Pool',
      beach: 'km to Beach',
      amenities: 'Amenities',
      availability: 'Availability',
      pricing: 'Pricing & Rates',
      enquire: 'Send Enquiry',
      holdBtn: 'Hold for free (48h)',
      reviews: 'Guest Reviews',
      location: 'Location'
    },
    admin: {
      dashboard: 'Dashboard',
      manageProperties: 'My Properties',
      enquiries: 'Enquiries',
      settings: 'Site Settings'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      properties: 'Nos Propriétés',
      guide: 'Guide Vendée',
      about: 'À Propos',
      contact: 'Contact',
      admin: 'Espace Propriétaire'
    },
    home: {
      heroTitle: 'Trouvez Votre Escapade Idéale en Vendée',
      heroSubtitle: 'Gîtes et villas de charme avec piscines privées, sélectionnés avec soin.',
      searchPlaceholder: 'Où allez-vous ?',
      checkIn: 'Arrivée',
      checkOut: 'Départ',
      guests: 'Voyageurs',
      searchBtn: 'Rechercher',
      featuredTitle: 'Propriétés Vedettes',
      whyBookTitle: 'Pourquoi Réserver Chez Nous ?',
      whyBook1: 'Contact Direct Propriétaire',
      whyBook1Desc: 'Échangez directement avec ceux qui connaissent le mieux les lieux.',
      whyBook2: 'Aucun Frais de Service',
      whyBook2Desc: 'Économisez jusqu\'à 15% en réservant sans commissions de plateforme.',
      whyBook3: 'Options Gratuites 48h',
      whyBook3Desc: 'Bloquez votre propriété préférée gratuitement le temps de vous organiser.',
      newsletterTitle: 'Restez informé',
      newsletterDesc: 'Recevez les dernières offres et conseils de voyage en Vendée.',
      subscribe: 'S\'abonner'
    },
    listing: {
      filters: 'Filtres Avancés',
      gridView: 'Grille',
      listView: 'Liste',
      mapView: 'Carte',
      noResults: 'Aucune propriété ne correspond à vos critères.',
      priceRange: 'Prix par nuit',
      capacity: 'Capacité'
    },
    property: {
      sleeps: 'Couchages',
      bedrooms: 'Chambres',
      pool: 'Piscine Privée',
      beach: 'km de la Plage',
      amenities: 'Équipements',
      availability: 'Disponibilité',
      pricing: 'Tarifs et Saisons',
      enquire: 'Demande d\'Information',
      holdBtn: 'Option Gratuite (48h)',
      reviews: 'Avis Clients',
      location: 'Localisation'
    },
    admin: {
      dashboard: 'Tableau de bord',
      manageProperties: 'Mes Biens',
      enquiries: 'Demandes',
      settings: 'Paramètres'
    }
  }
};
