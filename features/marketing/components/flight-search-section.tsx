import { Container } from "@/shared/layout/container";
import { Typography } from "@/shared/ui/typography";
import { FlightSearchPanel } from "@/features/flights/components/flight-search-panel";

export function FlightSearchSection() {
  return (
    <section
      id="search"
      aria-labelledby="search-heading"
      className="relative bg-card py-16 lg:py-24 border-b border-neutral-800/60"
    >
      {/* Subtle top glow */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aether-500/30 to-transparent"
        aria-hidden="true"
      />

      <Container size="xl">
        {/* Section header */}
        <div className="mb-10 text-center">
          <Typography
            id="search-heading"
            variant="heading-lg"
            as="h2"
            className="mb-2"
          >
            Find Your Next Flight
          </Typography>
          <Typography variant="body" color="secondary">
            Search hundreds of routes — compare fares and book in minutes.
          </Typography>
        </div>

        {/* Search panel */}
        <FlightSearchPanel />
      </Container>
    </section>
  );
}
