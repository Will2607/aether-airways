import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { AlertCircleIcon } from "@/shared/icons";

interface FlightResultsErrorProps {
  onRetry: () => void;
}

export function FlightResultsError({ onRetry }: FlightResultsErrorProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-5 py-20 text-center"
      role="alert"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
        <AlertCircleIcon className="h-10 w-10 text-red-400" aria-hidden="true" />
      </div>

      <div>
        <Typography variant="heading-sm" as="h2" className="mb-2">
          Something went wrong
        </Typography>
        <Typography variant="body-sm" color="secondary" className="max-w-xs">
          We couldn&apos;t load flight results. Please check your connection and try again.
        </Typography>
      </div>

      <Button variant="primary" size="sm" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}
