import Link from "next/link";
import { Typography } from "@/shared/ui/typography";
import { buttonVariants } from "@/shared/ui/button";
import { PlaneIcon, SearchIcon } from "@/shared/icons";

/**
 * Shown when the user opens /booking/review without a valid selection
 * (e.g. direct URL access, expired sessionStorage, or corrupt data).
 */
export function BookingEmpty() {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16"
      aria-label="No flight selected"
    >
      <div className="mb-6 h-20 w-20 rounded-2xl bg-aether-900/40 border border-aether-800/40 flex items-center justify-center">
        <PlaneIcon className="h-9 w-9 text-aether-400" aria-hidden="true" />
      </div>

      <Typography variant="heading-xl" as="h1" className="mb-3">
        No flight selected
      </Typography>

      <Typography variant="body" color="secondary" className="max-w-md mb-8">
        It looks like you haven&apos;t selected a flight yet, or your selection
        has expired. Please search for flights and choose a fare to continue.
      </Typography>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/flights/search"
          className={buttonVariants({ variant: "primary", size: "lg" })}
        >
          <SearchIcon className="h-4 w-4" aria-hidden="true" />
          Search Flights
        </Link>
        <Link
          href="/"
          className={buttonVariants({ variant: "ghost", size: "lg" })}
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
