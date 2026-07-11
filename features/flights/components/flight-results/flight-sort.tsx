import { Typography } from "@/shared/ui/typography";
import { cn } from "@/lib/utils";
import { SORT_OPTIONS } from "@/features/flights/constants/flights";
import type { FlightSortOption } from "@/features/flights/types";

interface FlightSortProps {
  value: FlightSortOption;
  onChange: (v: FlightSortOption) => void;
  count: number;
}

export function FlightSort({ value, onChange, count }: FlightSortProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 py-3"
      role="group"
      aria-label="Sort flights"
    >
      <Typography variant="caption" color="muted">
        {count} {count === 1 ? "flight" : "flights"} found
      </Typography>

      <div className="flex flex-wrap gap-1">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-pressed={value === opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500",
              value === opt.value
                ? "bg-aether-500 text-white"
                : "text-neutral-400 hover:text-white hover:bg-white/10"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
