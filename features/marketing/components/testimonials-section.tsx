import { Section } from "@/shared/layout/section";
import { Container } from "@/shared/layout/container";
import { Badge } from "@/shared/ui/badge";
import { Typography } from "@/shared/ui/typography";
import { TESTIMONIALS } from "@/features/marketing/data/testimonials";
import { TestimonialCard } from "./testimonial-card";

export function TestimonialsSection() {
  return (
    <Section
      background="card"
      padding="md"
      aria-labelledby="testimonials-heading"
    >
      <Container size="xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Traveller Stories
          </Badge>
          <Typography
            variant="heading-xl"
            as="h2"
            id="testimonials-heading"
            className="mb-3"
          >
            Loved by Millions of Passengers
          </Typography>
          <Typography variant="body-lg" color="secondary" className="max-w-xl mx-auto">
            Don&apos;t take our word for it — hear what our travellers say about flying with AetherAirways.
          </Typography>
        </div>

        {/*
          Desktop: 4-column grid.
          Mobile: horizontal scroll (snap) so all cards are accessible without hiding any.
        */}
        <div
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-none
                     sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0
                     xl:grid-cols-4"
          role="list"
          aria-label="Customer testimonials"
        >
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              role="listitem"
              className="snap-start shrink-0 w-[min(320px,85vw)] sm:w-auto"
            >
              <TestimonialCard testimonial={testimonial} className="h-full" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
