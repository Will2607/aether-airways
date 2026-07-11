/* ── Loyalty tier definition ────────────────────────────────────────────── */

export interface LoyaltyTier {
  id: string;
  name: string;
  milesLabel: string;
  ringClass: string;
  textClass: string;
}

export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    id: "silver",
    name: "Silver",
    milesLabel: "0 – 4,999 mi",
    ringClass: "ring-neutral-600",
    textClass: "text-neutral-400",
  },
  {
    id: "gold",
    name: "Gold",
    milesLabel: "5,000 – 14,999 mi",
    ringClass: "ring-gold-500",
    textClass: "text-gold-400",
  },
  {
    id: "platinum",
    name: "Platinum",
    milesLabel: "15,000 – 49,999 mi",
    ringClass: "ring-aether-500",
    textClass: "text-aether-400",
  },
  {
    id: "obsidian",
    name: "Obsidian",
    milesLabel: "50,000+ mi",
    ringClass: "ring-white/40",
    textClass: "text-white",
  },
];

/* ── Key stats ──────────────────────────────────────────────────────────── */

export const LOYALTY_STATS = [
  { value: "8M+",  label: "Members worldwide"  },
  { value: "40+",  label: "Partner airlines"    },
  { value: "200+", label: "Reward partners"     },
] as const;

/* ── Highlighted perks (shown below the card) ───────────────────────────── */

export const LOYALTY_PERKS = [
  "Earn 1 mile per $1 spent on flights",
  "Priority boarding & check-in from Gold",
  "Lounge access from Platinum tier",
  "Free upgrades & concierge at Obsidian",
] as const;
