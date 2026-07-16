import { cn } from "@/lib/utils";
import type { TripDisplayStatus } from "@/features/trips/types";
import { TRIP_STATUS_LABELS } from "@/features/trips/constants";

interface TripStatusBadgeProps {
  status:    TripDisplayStatus;
  className?: string;
}

const STATUS_STYLES: Record<TripDisplayStatus, string> = {
  upcoming:  "bg-aether-900/40 text-aether-300 border-aether-700/50",
  completed: "bg-neutral-800/60 text-neutral-400 border-neutral-700/50",
  cancelled: "bg-red-900/30 text-red-400 border-red-700/40",
};

const STATUS_DOT: Record<TripDisplayStatus, string> = {
  upcoming:  "bg-aether-400",
  completed: "bg-neutral-500",
  cancelled: "bg-red-400",
};

export function TripStatusBadge({ status, className }: TripStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        STATUS_STYLES[status],
        className
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full shrink-0", STATUS_DOT[status])}
        aria-hidden="true"
      />
      {TRIP_STATUS_LABELS[status] ?? status}
    </span>
  );
}
