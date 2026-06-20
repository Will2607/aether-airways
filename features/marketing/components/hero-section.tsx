"use client";

import { motion } from "framer-motion";
import { ChevronDownIcon } from "@/shared/icons";
import { FlightSearchPanel } from "@/features/flights/components/flight-search-panel";

/* ── Animation variants ─────────────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.35 },
  },
};

const itemVariants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0, 0, 0.2, 1] as const },
  },
};

const panelVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.85, ease: [0, 0, 0.2, 1] as const },
  },
};

/* ── Stars background (deterministic positions to avoid SSR mismatch) ───── */
const STARS = Array.from({ length: 70 }, (_, i) => ({
  id:      i,
  cx:      `${((i * 1664525 + 1013904223) % 1000000) / 10000}%`,
  cy:      `${((i * 22695477 + 1) % 700000) / 10000}%`,
  r:       i % 5 === 0 ? 1.4 : i % 3 === 0 ? 1.0 : 0.6,
  opacity: 0.12 + (i % 8) * 0.06,
}));

/* ── Component ──────────────────────────────────────────────────────────── */

export function HeroSection() {
  return (
    <section
      className="relative min-h-svh flex flex-col"
      aria-label="AetherAirways — find your next flight"
    >
      {/* ── Background — overflow-hidden applies only here so popover dropdowns are never clipped ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        {/* Deep space base gradient */}
        <div className="absolute inset-0 bg-surface" />

        {/* Aether glow — top-center radial */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-5%,rgba(26,75,245,0.22),transparent)]" />

        {/* Secondary ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_65%_25%,rgba(13,44,168,0.18),transparent)]" />

        {/* Stars */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {STARS.map((s) => (
            <circle key={s.id} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.opacity} />
          ))}
        </svg>

        {/* Horizon line glow */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-aether-800/60 to-transparent" />

        {/* Bottom fade to surface */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
      </div>

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col flex-1 max-w-7xl mx-auto w-full px-6 lg:px-20 pt-36 lg:pt-44 pb-14">

        {/* Headline block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mx-auto max-w-4xl"
        >
          {/* Eyebrow label */}
          <motion.p
            variants={itemVariants}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-aether-400 mb-8"
          >
            <span className="h-px w-6 bg-aether-500/60" aria-hidden="true" />
            Welcome to AetherAirways
            <span className="h-px w-6 bg-aether-500/60" aria-hidden="true" />
          </motion.p>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-extrabold leading-[1.04] tracking-tight text-white mb-6"
          >
            Fly{" "}
            <em className="not-italic text-gold-500">Beyond</em>
            <br />
            the Horizon.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="text-base lg:text-lg text-neutral-400 max-w-lg mx-auto leading-relaxed"
          >
            Discover a new era of travel. Premium flights, seamless booking,
            and destinations that inspire.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col items-center gap-2.5"
            aria-hidden="true"
          >
            <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-neutral-700">
              Explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDownIcon className="h-4 w-4 text-neutral-700" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Flight Search Panel ─────────────────────────────────── */}
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          className="mt-auto pt-16 lg:pt-20"
        >
          <FlightSearchPanel />
        </motion.div>
      </div>
    </section>
  );
}
