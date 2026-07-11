import Link from "next/link";
import { Container } from "@/shared/layout/container";
import { Badge } from "@/shared/ui/badge";
import { Typography } from "@/shared/ui/typography";
import { buttonVariants } from "@/shared/ui/button";
import { CheckIcon, PlaneIcon } from "@/shared/icons";
import { cn } from "@/lib/utils";
import {
  LOYALTY_TIERS,
  LOYALTY_STATS,
  LOYALTY_PERKS,
} from "@/features/marketing/data/loyalty";

/* ── Membership card mockup ─────────────────────────────────────────────── */

function MembershipCard() {
  return (
    <div className="relative aspect-[1.586/1] w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(26,75,245,0.35)]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-aether-700 via-aether-800 to-aether-950" />

      {/* Decorative glows */}
      <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-aether-400/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-gold-500/15 blur-3xl" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlaneIcon className="h-5 w-5 text-aether-300" aria-hidden="true" />
            <span className="text-sm font-black text-white tracking-[0.15em]">AETHER+</span>
          </div>
          <Badge variant="gold" size="sm">Platinum</Badge>
        </div>

        {/* Card number */}
        <p className="font-mono text-base text-white/50 tracking-[0.25em] text-center">
          **** **** **** 4821
        </p>

        {/* Bottom row */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Member</p>
            <p className="text-sm font-semibold text-white">Alexandra Voss</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Miles</p>
            <p className="text-base font-bold text-gold-400 tabular-nums">28,450</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */

export function LoyaltySection() {
  return (
    <section
      className="relative bg-aether-950 py-24 md:py-32 overflow-hidden"
      aria-labelledby="loyalty-heading"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(26,75,245,0.18),transparent)]"
        aria-hidden="true"
      />

      <Container size="xl" className="relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* ── Left: copy ───────────────────────────────────────────── */}
          <div>
            <Badge variant="gold" className="mb-5">Aether+ Loyalty</Badge>

            <Typography variant="display-lg" as="h2" id="loyalty-heading" className="mb-4">
              Earn Miles.{" "}
              <em className="not-italic text-gold-500">Unlock</em>{" "}
              the World.
            </Typography>

            <Typography variant="body-lg" color="secondary" className="mb-8">
              Every flight brings you closer to extraordinary rewards. Join millions
              of members who travel smarter with Aether+.
            </Typography>

            {/* Stats row */}
            <div className="flex gap-8 mb-8">
              {LOYALTY_STATS.map(({ value, label }) => (
                <div key={label}>
                  <Typography variant="mono-lg" color="accent-blue" className="block">
                    {value}
                  </Typography>
                  <Typography variant="caption" color="muted" className="block mt-0.5">
                    {label}
                  </Typography>
                </div>
              ))}
            </div>

            {/* Perks list */}
            <ul className="space-y-2.5 mb-10" aria-label="Programme benefits">
              {LOYALTY_PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <CheckIcon className="h-4 w-4 text-aether-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <Typography variant="body-sm" color="secondary">{perk}</Typography>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="/loyalty/join" className={buttonVariants({ variant: "primary", size: "lg" })}>
                Join for free
              </Link>
              <Link href="/loyalty" className={buttonVariants({ variant: "ghost", size: "lg" })}>
                Explore benefits
              </Link>
            </div>
          </div>

          {/* ── Right: card + tiers ──────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            <MembershipCard />

            {/* Tier progression */}
            <div className="grid grid-cols-4 gap-2" role="list" aria-label="Membership tiers">
              {LOYALTY_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  role="listitem"
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-3 rounded-xl ring-1",
                    tier.ringClass
                  )}
                >
                  <Typography
                    variant="label-lg"
                    className={cn("font-bold", tier.textClass)}
                  >
                    {tier.name}
                  </Typography>
                  <Typography variant="caption" color="muted" className="text-center leading-tight">
                    {tier.milesLabel}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
