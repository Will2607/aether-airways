import { Button }     from "@/shared/ui/button";
import { Badge }      from "@/shared/ui/badge";
import { Card }       from "@/shared/ui/card";
import { Typography } from "@/shared/ui/typography";
import { Container }  from "@/shared/layout/container";
import { Section }    from "@/shared/layout/section";
import { Logo }       from "@/shared/layout/logo";
import { Footer }     from "@/shared/layout/footer";
import {
  ChipFilterDemo,
  ChipRemovableDemo,
  ButtonLoadingDemo,
  InputDemo,
  SelectDemo,
  IconButtonDemo,
} from "./_components/interactive-demos";

/* ── Section heading helper ─────────────────────────────────────────────── */

function DSSection({ title, description, children }: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-12 border-b border-neutral-800/60 last:border-none">
      <div className="mb-8">
        <Typography variant="heading-md" className="mb-1">{title}</Typography>
        {description && (
          <Typography variant="body-sm" color="secondary">{description}</Typography>
        )}
      </div>
      {children}
    </section>
  );
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      {label && (
        <Typography variant="label-sm" color="muted" className="block mb-3">{label}</Typography>
      )}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/* ── Color palette ──────────────────────────────────────────────────────── */

const PALETTE = [
  { name: "surface",    hex: "#090E18", label: "Surface"  },
  { name: "card",       hex: "#111827", label: "Card"     },
  { name: "elevated",   hex: "#1F2937", label: "Elevated" },
  { name: "aether-500", hex: "#1A4BF5", label: "Aether 500" },
  { name: "aether-700", hex: "#0D2CA8", label: "Aether 700" },
  { name: "gold-500",   hex: "#FFC72C", label: "Gold 500" },
  { name: "neutral-400",hex: "#9CA3AF", label: "Neutral 400" },
  { name: "neutral-700",hex: "#374151", label: "Neutral 700" },
] as const;

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="border-b border-neutral-800/60 bg-card">
        <Container size="xl" className="py-8">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="display-lg" className="mb-2">
                Design System
              </Typography>
              <Typography variant="body" color="secondary">
                AetherAirways component library — built with Tailwind CSS v4 &amp; CVA
              </Typography>
            </div>
            <Badge variant="gold" size="md" dot>v1.0</Badge>
          </div>
        </Container>
      </div>

      <Container size="xl" className="pb-20">

        {/* ── Colors ──────────────────────────────────────────────── */}
        <DSSection title="Colors" description="Brand and semantic color tokens">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {PALETTE.map(({ name, hex, label }) => (
              <div key={name} className="flex flex-col gap-2">
                <div
                  className="h-14 w-full rounded-xl border border-white/10"
                  style={{ backgroundColor: hex }}
                />
                <div>
                  <p className="text-xs font-medium text-white truncate">{label}</p>
                  <p className="text-[10px] font-mono text-neutral-500">{hex}</p>
                </div>
              </div>
            ))}
          </div>
        </DSSection>

        {/* ── Typography ──────────────────────────────────────────── */}
        <DSSection title="Typography" description="Type scale from display to caption">
          <div className="space-y-6">
            {(
              [
                ["display-2xl", "Fly Beyond the Horizon"],
                ["display-xl",  "Premium Air Travel"],
                ["display-lg",  "Book Your Next Flight"],
                ["heading-xl",  "Popular Destinations"],
                ["heading-lg",  "Featured Offers"],
                ["heading-md",  "Economy Class"],
                ["heading-sm",  "Cabin Crew"],
                ["body-lg",     "Discover a new era of air travel with AetherAirways."],
                ["body",        "Book flights, manage reservations, and travel smarter."],
                ["body-sm",     "Terms and conditions apply. See full details online."],
                ["label-lg",    "Departure time"],
                ["label-sm",    "IATA CODE"],
                ["caption",     "Prices shown include taxes and fees."],
                ["mono-lg",     "$1,240"],
                ["mono-md",     "BOG → MIA · AA 204"],
              ] as const
            ).map(([variant, text]) => (
              <div key={variant} className="flex items-baseline gap-6 border-b border-neutral-800/40 pb-4 last:border-none last:pb-0">
                <span className="text-[10px] font-mono text-neutral-600 w-28 shrink-0">{variant}</span>
                <Typography variant={variant}>{text}</Typography>
              </div>
            ))}
          </div>
        </DSSection>

        {/* ── Logo ────────────────────────────────────────────────── */}
        <DSSection title="Logo" description="Brand logo in multiple sizes">
          <Row>
            <Logo size="sm" />
            <Logo size="md" />
            <Logo size="lg" />
            <Logo size="md" iconOnly />
          </Row>
        </DSSection>

        {/* ── Buttons — variants ──────────────────────────────────── */}
        <DSSection title="Button" description="All variants, sizes, states and icon usage">
          <div className="space-y-6">
            <Row label="Variants">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </Row>

            <Row label="Sizes">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </Row>

            <Row label="States">
              <Button disabled>Disabled</Button>
              <ButtonLoadingDemo />
            </Row>

            <div className="space-y-2">
              <Typography variant="label-sm" color="muted" className="block mb-3">With icons</Typography>
              <IconButtonDemo />
            </div>
          </div>
        </DSSection>

        {/* ── Input ───────────────────────────────────────────────── */}
        <DSSection title="Input" description="Text input with label, icons, hints and error states">
          <InputDemo />
        </DSSection>

        {/* ── Select ──────────────────────────────────────────────── */}
        <DSSection title="Select" description="Native select with custom styling">
          <SelectDemo />
        </DSSection>

        {/* ── Badge ───────────────────────────────────────────────── */}
        <DSSection title="Badge" description="Status and category labels">
          <div className="space-y-6">
            <Row label="Variants">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="gold">Premium</Badge>
            </Row>
            <Row label="With dot">
              <Badge variant="primary" dot>Active</Badge>
              <Badge variant="success" dot>On time</Badge>
              <Badge variant="warning" dot>Delayed</Badge>
              <Badge variant="error" dot>Cancelled</Badge>
            </Row>
            <Row label="Sizes">
              <Badge size="sm" variant="primary">Small</Badge>
              <Badge size="md" variant="primary">Medium</Badge>
            </Row>
          </div>
        </DSSection>

        {/* ── Chip ────────────────────────────────────────────────── */}
        <DSSection title="Chip" description="Toggleable filter tags">
          <div className="space-y-6">
            <div className="space-y-2">
              <Typography variant="label-sm" color="muted" className="block mb-3">Filter chips (click to toggle)</Typography>
              <ChipFilterDemo />
            </div>
            <div className="space-y-2">
              <Typography variant="label-sm" color="muted" className="block mb-3">Removable chips</Typography>
              <ChipRemovableDemo />
            </div>
          </div>
        </DSSection>

        {/* ── Card ────────────────────────────────────────────────── */}
        <DSSection title="Card" description="Content container with variants and sub-components">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(["default", "elevated", "bordered", "interactive"] as const).map((variant) => (
              <Card key={variant} variant={variant}>
                <Card.Header>
                  <div className="flex items-center justify-between">
                    <Card.Title>BOG → MIA</Card.Title>
                    <Badge variant="success" size="sm">Direct</Badge>
                  </div>
                  <Card.Description>Bogotá to Miami · Economy</Card.Description>
                </Card.Header>
                <Card.Body>
                  <Typography variant="mono-lg" color="accent-gold">$299</Typography>
                  <Typography variant="body-sm" color="muted" className="mt-1">per person</Typography>
                </Card.Body>
                <Card.Footer>
                  <Button variant="outline" size="sm" className="w-full justify-center">
                    Select
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </div>
          <p className="mt-3 text-xs text-neutral-600">
            Variants: <code className="font-mono">default · elevated · bordered · interactive</code>
          </p>
        </DSSection>

        {/* ── Container + Section ─────────────────────────────────── */}
        <DSSection title="Container &amp; Section" description="Layout primitives for consistent spacing">
          <div className="space-y-4 rounded-2xl overflow-hidden border border-neutral-700/50">
            <Section background="surface" padding="sm" className="border-b border-neutral-700/50">
              <Container size="xl">
                <code className="text-xs text-neutral-400 font-mono">
                  &lt;Section background=&quot;surface&quot; padding=&quot;sm&quot;&gt;&lt;Container size=&quot;xl&quot;&gt;
                </code>
              </Container>
            </Section>
            <Section background="card" padding="sm" className="border-b border-neutral-700/50">
              <Container size="lg">
                <code className="text-xs text-neutral-400 font-mono">
                  &lt;Section background=&quot;card&quot; padding=&quot;sm&quot;&gt;&lt;Container size=&quot;lg&quot;&gt;
                </code>
              </Container>
            </Section>
            <Section background="elevated" padding="sm">
              <Container size="md">
                <code className="text-xs text-neutral-400 font-mono">
                  &lt;Section background=&quot;elevated&quot; padding=&quot;sm&quot;&gt;&lt;Container size=&quot;md&quot;&gt;
                </code>
              </Container>
            </Section>
          </div>
        </DSSection>

      </Container>

      {/* Footer preview */}
      <Footer />
    </div>
  );
}
