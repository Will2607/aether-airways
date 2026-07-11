import type { FareBrand, FlightSortOption } from "@/features/flights/types";

/* ── Fare brands ─────────────────────────────────────────────────────────── */

export const FARE_BRANDS: Record<string, FareBrand> = {
  "eco-saver": {
    id: "eco-saver",
    name: "Economy Saver",
    cabinClass: "economy",
    isRefundable: false,
    isChangeable: false,
    changeFeeUsd: null,
    baggage: {
      carryOn: { count: 1, weightKg: 10 },
      checked: null,
    },
    highlights: ["No changes or refunds", "1 carry-on (10 kg)"],
  },
  "eco-flex": {
    id: "eco-flex",
    name: "Economy Flex",
    cabinClass: "economy",
    isRefundable: true,
    isChangeable: true,
    changeFeeUsd: 0,
    baggage: {
      carryOn: { count: 1, weightKg: 10 },
      checked: { count: 1, weightKg: 23 },
    },
    highlights: ["Free changes & full refund", "1 checked bag (23 kg)"],
  },
  "prem-eco-flex": {
    id: "prem-eco-flex",
    name: "Premium Economy",
    cabinClass: "premium_economy",
    isRefundable: true,
    isChangeable: true,
    changeFeeUsd: 0,
    baggage: {
      carryOn: { count: 1, weightKg: 12 },
      checked: { count: 2, weightKg: 23 },
    },
    highlights: ["Extra legroom seat", "Free changes", "2 checked bags (23 kg each)"],
  },
  "biz-comfort": {
    id: "biz-comfort",
    name: "Business Comfort",
    cabinClass: "business",
    isRefundable: true,
    isChangeable: true,
    changeFeeUsd: 0,
    baggage: {
      carryOn: { count: 2, weightKg: 10 },
      checked: { count: 2, weightKg: 32 },
    },
    highlights: ["Lie-flat bed", "Lounge access", "Priority boarding", "2 checked bags (32 kg)"],
  },
  "biz-elite": {
    id: "biz-elite",
    name: "Business Elite",
    cabinClass: "business",
    isRefundable: true,
    isChangeable: true,
    changeFeeUsd: 0,
    baggage: {
      carryOn: { count: 2, weightKg: 12 },
      checked: { count: 3, weightKg: 32 },
    },
    highlights: ["Private suite", "Dedicated agent", "Priority on everything", "3 checked bags"],
  },
};

/* ── Sort options ────────────────────────────────────────────────────────── */

export const SORT_OPTIONS: { value: FlightSortOption; label: string }[] = [
  { value: "price_asc",     label: "Cheapest first"  },
  { value: "duration_asc",  label: "Fastest first"   },
  { value: "departure_asc", label: "Earliest depart" },
  { value: "arrival_asc",   label: "Earliest arrive" },
];
