import type { Testimonial } from "@/features/marketing/types";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "sarah-m",
    name: "Sarah Mitchell",
    location: "London, UK",
    tripType: "Business · LHR → JFK",
    rating: 5,
    quote:
      "The lie-flat seat made a 10-hour flight feel like a luxury hotel stay. Exceptional service from boarding to landing.",
    avatarInitials: "SM",
    avatarBg: "bg-aether-500",
  },
  {
    id: "carlos-r",
    name: "Carlos Ramírez",
    location: "Madrid, Spain",
    tripType: "Economy · MAD → NRT",
    rating: 5,
    quote:
      "Smooth booking, great in-flight entertainment, and the crew made the whole journey enjoyable. Already booked my next trip.",
    avatarInitials: "CR",
    avatarBg: "bg-emerald-600",
  },
  {
    id: "priya-s",
    name: "Priya Singh",
    location: "Mumbai, India",
    tripType: "Premium Economy · BOM → LHR",
    rating: 4,
    quote:
      "Great value in Premium Economy. The crew was attentive, the food was excellent, and the seat comfort surprised me.",
    avatarInitials: "PS",
    avatarBg: "bg-violet-600",
  },
  {
    id: "james-o",
    name: "James O'Brien",
    location: "Sydney, Australia",
    tripType: "Business · SYD → DXB",
    rating: 5,
    quote:
      "My go-to airline for long-haul business travel. The lounge access and priority service make every trip effortless.",
    avatarInitials: "JO",
    avatarBg: "bg-amber-600",
  },
];
