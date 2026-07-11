import Link from "next/link";
import { Container } from "@/shared/layout/container";
import { Typography } from "@/shared/ui/typography";
import { buttonVariants } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { PlaneIcon, ArrowRightIcon } from "@/shared/icons";
import { formatShortDate } from "@/features/flights/utils/flight.utils";
import type { FlightSearchParams } from "@/features/flights/types";

interface FlightResultsHeaderProps {
  params: FlightSearchParams;
  total: number;
  showing: number;
  onToggleFilters: () => void;
}

const CABIN_LABELS: Record<string, string> = {
  economy:         "Economy",
  premium_economy: "Premium Economy",
  business:        "Business",
  first:           "First",
};

export function FlightResultsHeader({
  params,
  total,
  showing,
  onToggleFilters,
}: FlightResultsHeaderProps) {
  const cabinLabel = CABIN_LABELS[params.cabinClass] ?? params.cabinClass;
  const passengerLabel = `${params.passengers} ${params.passengers === 1 ? "passenger" : "passengers"}`;

  return (
    <header
      className="sticky top-16 lg:top-20 z-20 bg-card/90 backdrop-blur-xl border-b border-neutral-800/80"
      aria-label="Search summary"
    >
      <Container size="xl">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          {/* Route summary */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <PlaneIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
              <Typography variant="heading-sm" as="span">
                {params.origin}
              </Typography>
              <ArrowRightIcon className="h-4 w-4 text-neutral-600" aria-hidden="true" />
              <Typography variant="heading-sm" as="span">
                {params.destination}
              </Typography>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" size="sm">
                {formatShortDate(params.departureDate)}
              </Badge>
              <Badge variant="secondary" size="sm">{cabinLabel}</Badge>
              <Badge variant="secondary" size="sm">{passengerLabel}</Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Typography variant="caption" color="muted" className="hidden sm:block">
              {showing < total ? `${showing} of ${total} results` : `${total} result${total !== 1 ? "s" : ""}`}
            </Typography>

            <button
              type="button"
              onClick={onToggleFilters}
              className={buttonVariants({ variant: "secondary", size: "sm", className: "lg:hidden" })}
            >
              Filters
            </button>

            <Link
              href="/"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Modify search
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
