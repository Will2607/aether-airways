import { Section } from "@/shared/layout/section";
import { Container } from "@/shared/layout/container";
import { Badge } from "@/shared/ui/badge";
import { Typography } from "@/shared/ui/typography";
import { OFFERS } from "@/features/marketing/data/offers";
import { OfferCard } from "./offer-card";

export function FeaturedOffersSection() {
  const [featured, ...secondary] = OFFERS;

  return (
    <Section
      background="card"
      padding="md"
      aria-labelledby="offers-heading"
    >
      <Container size="xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="gold" className="mb-4">
            Limited Time
          </Badge>
          <Typography
            variant="heading-xl"
            as="h2"
            id="offers-heading"
            className="mb-3"
          >
            Exclusive Deals
          </Typography>
          <Typography variant="body-lg" color="secondary" className="max-w-xl mx-auto">
            Handpicked promotions with unbeatable value — book before they&apos;re gone.
          </Typography>
        </div>

        {/*
          Desktop: 3-column grid
            Featured card  → col-span-2, row-span-2 (left)
            Secondary × 2  → 1 column each (right)
          Mobile: stacks naturally
        */}
        <div className="grid gap-4 lg:gap-6 lg:grid-cols-3 lg:grid-rows-2">
          <OfferCard
            offer={featured}
            featured
            className="lg:col-span-2 lg:row-span-2"
          />
          {secondary.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
