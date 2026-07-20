import { cn } from "@/lib/utils";
import {
  ClockIcon,
  CheckCircleIcon,
  PlaneIcon,
  PlaneTakeoffIcon,
  PlaneLandingIcon,
  AlertCircleIcon,
  XIcon,
} from "@/shared/icons";
import { STATUS_CONFIG } from "@/features/flight-status/constants";
import type { FlightOperationalStatus } from "@/features/flight-status/types";

const STATUS_ICONS: Record<FlightOperationalStatus, React.ElementType> = {
  scheduled:      ClockIcon,
  check_in_open:  CheckCircleIcon,
  boarding:       PlaneIcon,
  gate_closed:    AlertCircleIcon,
  delayed:        AlertCircleIcon,
  departed:       PlaneTakeoffIcon,
  in_air:         PlaneIcon,
  landed:         PlaneLandingIcon,
  cancelled:      XIcon,
};

interface FlightStatusBadgeProps {
  status:    FlightOperationalStatus;
  size?:     "sm" | "md";
  className?: string;
}

export function FlightStatusBadge({ status, size = "md", className }: FlightStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon   = STATUS_ICONS[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        config.bgClass,
        config.borderClass,
        config.textClass,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        className
      )}
    >
      <Icon
        className={cn(size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
}
