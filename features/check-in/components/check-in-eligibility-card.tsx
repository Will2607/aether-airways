import Link from "next/link";
import { CheckCircleIcon, AlertCircleIcon, ClockIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { cn } from "@/lib/utils";
import type { CheckInEligibility } from "@/features/check-in/types";

interface CheckInEligibilityCardProps {
  eligibility: CheckInEligibility;
  bookingRef:  string;
}

export function CheckInEligibilityCard({ eligibility, bookingRef }: CheckInEligibilityCardProps) {
  const isCheckedIn   = eligibility.status === "checked_in";
  const isClosed      = eligibility.status === "closed";
  const isNotEligible = eligibility.status === "not_eligible";

  const cardStyle = isCheckedIn
    ? "border-emerald-700/40 bg-emerald-900/20"
    : isClosed
    ? "border-amber-700/40 bg-amber-900/20"
    : "border-red-700/40 bg-red-900/20";

  const IconEl = isCheckedIn
    ? CheckCircleIcon
    : isClosed
    ? ClockIcon
    : AlertCircleIcon;

  const iconColor = isCheckedIn ? "text-emerald-400" : isClosed ? "text-amber-400" : "text-red-400";
  const titleColor = isCheckedIn ? "text-emerald-300" : isClosed ? "text-amber-300" : "text-red-300";

  return (
    <div className={cn("rounded-2xl border p-6 space-y-4", cardStyle)}>
      <div className="flex items-start gap-3">
        <IconEl className={cn("mt-0.5 h-5 w-5 shrink-0", iconColor)} aria-hidden="true" />
        <div className="space-y-1">
          <Typography variant="label-lg" className={cn("font-semibold", titleColor)}>
            {isCheckedIn && "Already checked in"}
            {isClosed    && "Check-in is closed"}
            {isNotEligible && "Check-in not available"}
          </Typography>
          <Typography variant="body-sm" color="muted">
            {eligibility.reason}
          </Typography>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {isCheckedIn && (
          <Link href={`/check-in/${bookingRef}`}>
            <Button variant="primary" size="sm">
              View boarding passes
            </Button>
          </Link>
        )}
        <Link href={`/my-trips/${bookingRef}`}>
          <Button variant="outline" size="sm">
            View booking
          </Button>
        </Link>
        <Link href="/my-trips">
          <Button variant="ghost" size="sm">
            My Trips
          </Button>
        </Link>
      </div>
    </div>
  );
}
