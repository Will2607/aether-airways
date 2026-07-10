import { Section } from "@/shared/layout/section";
import { Container } from "@/shared/layout/container";
import { Badge } from "@/shared/ui/badge";
import { Typography } from "@/shared/ui/typography";
import { BENEFITS, type BenefitData } from "@/features/marketing/data/benefits";

/* ── BenefitCard ─────────────────────────────────────────────────────────── */

function BenefitCard({ benefit }: { benefit: BenefitData }) {
  const { Icon, title, description } = benefit;

  return (
    <div className="group flex flex-col gap-5 p-6 rounded-2xl bg-card border border-neutral-800 hover:border-aether-500/40 transition-colors duration-300">
      {/* Icon container */}
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-aether-500/10 group-hover:bg-aether-500/20 transition-colors duration-300"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6 text-aether-400" />
      </div>

      {/* Text */}
      <div>
        <Typography variant="heading-sm" as="h3" className="mb-2">
          {title}
        </Typography>
        <Typography variant="body-sm" color="secondary">
          {description}
        </Typography>
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */

export function WhyChooseSection() {
  return (
    <Section
      background="surface"
      padding="md"
      aria-labelledby="why-heading"
    >
      <Container size="xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Why AetherAirways
          </Badge>
          <Typography
            variant="heading-xl"
            as="h2"
            id="why-heading"
            className="mb-3"
          >
            Travel the Way You Deserve
          </Typography>
          <Typography variant="body-lg" color="secondary" className="max-w-xl mx-auto">
            Every detail is designed for comfort, flexibility and peace of mind
            — from the moment you book to the second you land.
          </Typography>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {BENEFITS.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
