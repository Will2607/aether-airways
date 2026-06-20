"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TripType } from "@/features/flights/types";

const TRIP_TYPES: { value: TripType; label: string }[] = [
  { value: "one_way",    label: "One Way"    },
  { value: "round_trip", label: "Round Trip" },
  { value: "multi_city", label: "Multi-city" },
];

interface TripTypeTabsProps {
  value: TripType;
  onChange: (value: TripType) => void;
}

export function TripTypeTabs({ value, onChange }: TripTypeTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Select trip type"
      className="inline-flex bg-elevated rounded-xl p-1 gap-0.5"
    >
      {TRIP_TYPES.map((tab) => {
        const isSelected = value === tab.value;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(tab.value)}
            className={cn(
              "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500",
              isSelected ? "text-white" : "text-neutral-400 hover:text-neutral-200"
            )}
          >
            {/* Sliding pill indicator using Framer Motion layoutId */}
            {isSelected && (
              <motion.div
                layoutId="trip-tab-pill"
                className="absolute inset-0 bg-aether-500 rounded-lg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                aria-hidden="true"
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
