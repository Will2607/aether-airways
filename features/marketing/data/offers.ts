import type { Offer } from "@/features/marketing/types";

export const OFFERS: Offer[] = [
  {
    id: "summer-business",
    title: "Business Class Summer Sale",
    description:
      "Fly in style this summer with 30% off all Business Class seats on transatlantic routes. Includes lie-flat beds and gourmet dining.",
    discount: "30% OFF",
    validUntil: "July 31, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Airplane wing over clouds at golden hour",
    badge: "Featured Deal",
    href: "/offers/summer-business",
  },
  {
    id: "free-upgrade",
    title: "Free Premium Economy Upgrade",
    description:
      "Book any Economy ticket and get a complimentary upgrade to Premium Economy on selected routes.",
    discount: "Free Upgrade",
    validUntil: "August 15, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Aircraft taking off at sunset",
    badge: "Weekend Only",
    href: "/offers/free-upgrade",
  },
  {
    id: "family-pack",
    title: "Family Pack — 4th Flies Free",
    description:
      "Travel together and save. Book for 3 passengers and the 4th seat is on us, valid on all family routes.",
    discount: "1 Free Seat",
    validUntil: "September 30, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=800&q=80",
    imageAlt: "City lights from an airplane window at night",
    href: "/offers/family-pack",
  },
];
