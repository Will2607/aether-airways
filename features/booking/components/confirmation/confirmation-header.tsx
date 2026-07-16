"use client";
import { CheckCircleIcon, PrinterIcon, ArrowRightIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import type { BookingConfirmation } from "@/features/booking/types";

interface ConfirmationHeaderProps {
  confirmation: BookingConfirmation;
}

export function ConfirmationHeader({ confirmation }: ConfirmationHeaderProps) {
  const confirmedDate = new Date(confirmation.confirmedAt).toLocaleDateString("en-US", {
    weekday: "long",
    year:    "numeric",
    month:   "long",
    day:     "numeric",
  });

  return (
    <div className="space-y-6 text-center">
      {/* Success icon */}
      <div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 ring-4 ring-emerald-500/30"
        aria-hidden="true"
      >
        <CheckCircleIcon className="h-8 w-8 text-emerald-400" />
      </div>

      {/* Heading */}
      <div className="space-y-1">
        <Typography as="h1" variant="heading-xl" className="text-white">
          Booking Confirmed!
        </Typography>
        <Typography variant="body" color="muted">
          Your trip is booked. Check your email for the full itinerary.
        </Typography>
      </div>

      {/* Booking reference */}
      <div className="mx-auto max-w-sm rounded-2xl border border-aether-700/40 bg-aether-900/20 px-6 py-5">
        <p className="text-xs font-medium uppercase tracking-widest text-aether-400">
          Booking reference
        </p>
        <p
          className="mt-1 font-mono text-4xl font-bold tracking-widest text-white"
          aria-label={`Booking reference: ${confirmation.bookingRef}`}
        >
          {confirmation.bookingRef}
        </p>
        <p className="mt-2 text-xs text-neutral-500">
          Confirmed on {confirmedDate}
        </p>
      </div>

      {/* Actions */}
      <div
        className="flex flex-wrap items-center justify-center gap-3"
        aria-live="polite"
      >
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800/50
                     px-4 py-2 text-sm font-medium text-neutral-300 hover:border-neutral-600
                     hover:text-white focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-aether-500 transition-colors"
        >
          <PrinterIcon className="h-4 w-4" aria-hidden="true" />
          Print itinerary
        </button>

        <Link href="/">
          <Button variant="outline" size="sm">
            Back to home
          </Button>
        </Link>

        <Link href="/flights/search">
          <Button variant="primary" size="sm">
            Search new flights
            <ArrowRightIcon className="ml-1.5 h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
