export interface Destination {
  id: string;
  city: string;
  country: string;
  imageUrl: string;
  imageAlt: string;
  priceFrom: number;
  currency: string;
  flightDuration: string;
  href: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  imageUrl: string;
  imageAlt: string;
  badge?: string;
  href: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  tripType: string;
  rating: number;
  quote: string;
  avatarInitials: string;
  avatarBg: string;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}
