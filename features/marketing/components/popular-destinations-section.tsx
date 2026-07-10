import Link from "next/link";
import { Section } from "@/shared/layout/section";
import { Container } from "@/shared/layout/container";
import { Badge } from "@/shared/ui/badge";
import { Typography } from "@/shared/ui/typography";
import { buttonVariants } from "@/shared/ui/button";
import { DESTINATIONS } from "@/features/marketing/data/destinations";
import { DestinationCard } from "./destination-card";

export function PopularDestinationsSection() {
  return (
    <Section
      background="surface"
      padding="md"
      aria-labelledby="destinations-heading"
    >
      <Container size="xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4">
            Popular Destinations
          </Badge>
          <Typography
            variant="heading-xl"
            as="h2"
            id="destinations-heading"
            className="mb-3"
          >
            Where Will You Fly Next?
          </Typography>
          <Typography variant="body-lg" color="secondary" className="max-w-xl mx-auto">
            Explore our most-booked destinations — from romantic city breaks to
            bucket-list adventures.
          </Typography>
        </div>

        {/* Destination grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {DESTINATIONS.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/destinations"
            className={buttonVariants({ variant: "outline", size: "md" })}
          >
            View all destinations
          </Link>
        </div>
      </Container>
    </Section>
  );
}
