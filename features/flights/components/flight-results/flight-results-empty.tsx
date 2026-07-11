import Link from "next/link";
import { Typography } from "@/shared/ui/typography";
import { buttonVariants } from "@/shared/ui/button";
import { PlaneIcon } from "@/shared/icons";

export function FlightResultsEmpty() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-5 py-20 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-elevated">
        <PlaneIcon className="h-10 w-10 text-neutral-600" aria-hidden="true" />
      </div>

      <div>
        <Typography variant="heading-sm" as="h2" className="mb-2">
          No flights found
        </Typography>
        <Typography variant="body-sm" color="secondary" className="max-w-xs">
          We couldn&apos;t find any flights matching your search. Try adjusting
          your filters or searching a different route.
        </Typography>
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          Reset filters
        </button>
        <Link href="/" className={buttonVariants({ variant: "primary", size: "sm" })}>
          New search
        </Link>
      </div>
    </div>
  );
}
