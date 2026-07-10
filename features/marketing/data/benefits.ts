import { CalendarIcon, StarIcon, GlobeIcon, ShieldIcon } from "@/shared/icons";

/* ── Type ───────────────────────────────────────────────────────────────── */

export interface BenefitData {
  id: string;
  Icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
}

/* ── Data ───────────────────────────────────────────────────────────────── */

export const BENEFITS: BenefitData[] = [
  {
    id: "flexible-booking",
    Icon: CalendarIcon,
    title: "Flexible Booking",
    description:
      "Change or cancel your flight up to 24 hours before departure at no extra charge — no questions asked.",
  },
  {
    id: "premium-comfort",
    Icon: StarIcon,
    title: "Premium Comfort",
    description:
      "Lie-flat seats, chef-curated menus and award-winning entertainment in every long-haul cabin class.",
  },
  {
    id: "global-network",
    Icon: GlobeIcon,
    title: "Global Network",
    description:
      "150+ routes across 6 continents — from weekend city breaks to once-in-a-lifetime round-the-world adventures.",
  },
  {
    id: "24-7-support",
    Icon: ShieldIcon,
    title: "24/7 Support",
    description:
      "Our multilingual support team is always on call through live chat, phone or email — wherever you are.",
  },
];
