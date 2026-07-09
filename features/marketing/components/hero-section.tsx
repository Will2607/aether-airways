"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/shared/ui/badge";
import { Typography } from "@/shared/ui/typography";
import { buttonVariants } from "@/shared/ui/button";
import { Container } from "@/shared/layout/container";
import { PlaneIcon } from "@/shared/icons";

/* ── Constants ──────────────────────────────────────────────────────────── */

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80";

/* ── Animation variants ─────────────────────────────────────────────────── */

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.25 } },
};

const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0, 0, 0.2, 1] as const } },
};

/* ── Stars (deterministic SSR-safe) ─────────────────────────────────────── */

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id:      i,
  cx:      `${((i * 1664525 + 1013904223) % 1000000) / 10000}%`,
  cy:      `${((i * 22695477 + 1) % 600000) / 10000}%`,
  r:       i % 5 === 0 ? 1.2 : 0.6,
  opacity: 0.1 + (i % 7) * 0.05,
}));

/* ── Component ──────────────────────────────────────────────────────────── */

export function HeroSection() {
  return (
    <section
      className="relative min-h-svh flex items-center"
      aria-label="AetherAirways — find your next flight"
    >
      {/* Background image */}
      <Image
        src={HERO_IMAGE}
        alt="Airplane wing soaring above clouds at golden hour"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/65 to-surface/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* Subtle stars on the dark side */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        {STARS.map((s) => (
          <circle key={s.id} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.opacity} />
        ))}
      </svg>

      {/* Content */}
      <Container size="xl" className="relative z-10 py-36 lg:py-48">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Eyebrow badge */}
          <motion.div variants={item} className="mb-6">
            <Badge variant="primary" dot>
              Now with Premium Business Class
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.div variants={item}>
            <Typography
              variant="display-2xl"
              as="h1"
              className="mb-2 [text-shadow:0_2px_20px_rgba(0,0,0,0.4)]"
            >
              Fly <em className="not-italic text-gold-500">Beyond</em>
              <br />
              the Horizon.
            </Typography>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={item} className="mt-5 mb-10">
            <Typography variant="body-lg" color="secondary" className="max-w-lg">
              Discover a new era of air travel. Premium cabins, seamless booking,
              and destinations that inspire — wherever you dream of going.
            </Typography>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href="/flights"
              className={buttonVariants({
                variant: "primary",
                size: "lg",
                className: "gap-2",
              })}
            >
              <PlaneIcon className="h-4 w-4" aria-hidden="true" />
              Book a Flight
            </Link>
            <Link
              href="/destinations"
              className={buttonVariants({ variant: "ghost", size: "lg" })}
            >
              Explore Destinations
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={item}
            className="mt-10 flex items-center gap-6"
          >
            {[
              { value: "150+", label: "Destinations" },
              { value: "4.9★", label: "App rating" },
              { value: "2M+",  label: "Happy travellers" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <Typography variant="mono-lg" color="accent-gold" className="block">
                  {value}
                </Typography>
                <Typography variant="caption" color="muted" className="block mt-0.5">
                  {label}
                </Typography>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
