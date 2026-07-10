import type { Destination } from "@/features/marketing/types";

export const DESTINATIONS: Destination[] = [
  {
    id: "paris",
    city: "Paris",
    country: "France",
    imageUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Eiffel Tower reflected in the Seine at dusk, Paris",
    priceFrom: 349,
    currency: "USD",
    flightDuration: "~8h 30m",
    href: "/flights?destination=CDG",
  },
  {
    id: "tokyo",
    city: "Tokyo",
    country: "Japan",
    imageUrl:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Tokyo cityscape with Mount Fuji in the background at night",
    priceFrom: 789,
    currency: "USD",
    flightDuration: "~14h",
    href: "/flights?destination=NRT",
  },
  {
    id: "new-york",
    city: "New York",
    country: "United States",
    imageUrl:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Manhattan skyline from the Hudson River at sunrise",
    priceFrom: 299,
    currency: "USD",
    flightDuration: "~10h",
    href: "/flights?destination=JFK",
  },
  {
    id: "bali",
    city: "Bali",
    country: "Indonesia",
    imageUrl:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Terraced rice fields and tropical palms in Ubud, Bali",
    priceFrom: 649,
    currency: "USD",
    flightDuration: "~18h",
    href: "/flights?destination=DPS",
  },
  {
    id: "dubai",
    city: "Dubai",
    country: "UAE",
    imageUrl:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Burj Khalifa and Dubai Marina skyline at twilight",
    priceFrom: 449,
    currency: "USD",
    flightDuration: "~12h",
    href: "/flights?destination=DXB",
  },
  {
    id: "sydney",
    city: "Sydney",
    country: "Australia",
    imageUrl:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Sydney Opera House and Harbour Bridge from the water",
    priceFrom: 899,
    currency: "USD",
    flightDuration: "~22h",
    href: "/flights?destination=SYD",
  },
];
