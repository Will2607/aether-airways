"use client";
import { useState } from "react";
import { PlaneIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { DEMO_BYPASS_CHECKIN_WINDOW } from "@/features/check-in/constants";
import { evaluateEligibility } from "@/features/check-in/utils/eligibility.utils";
import { checkInService } from "@/features/check-in/services/check-in.service";
import { bookingsService } from "@/features/trips/services/bookings.service";
import { lookupBooking } from "@/features/trips/utils/trip.utils";
import { CheckInLookupForm } from "./check-in-lookup-form";
import { CheckInEligibilityCard } from "./check-in-eligibility-card";
import { CheckInFlow } from "./check-in-flow";
import type { StoredBooking } from "@/features/trips/types";
import type { CheckInEligibility, CheckInResult } from "@/features/check-in/types";

type Phase =
  | { type: "lookup" }
  | { type: "not_found" }
  | { type: "ineligible"; booking: StoredBooking; eligibility: CheckInEligibility; checkIn: CheckInResult | null }
  | { type: "flow";       booking: StoredBooking };

export function CheckInPage() {
  const [defaultRef] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("ref") ?? "";
  });

  const [phase, setPhase]           = useState<Phase>({ type: "lookup" });
  const [lookupError, setLookupError] = useState<string | null>(null);

  function handleLookup(bookingRef: string, lastName: string) {
    setLookupError(null);

    const allBookings = bookingsService.getAll();
    const found = lookupBooking({ bookingRef, lastName }, allBookings);

    if (!found) {
      setLookupError("No booking found with that reference and last name.");
      setPhase({ type: "not_found" });
      return;
    }

    const existingCheckIn = checkInService.getByRef(found.bookingRef);
    const eligibility     = evaluateEligibility(found, existingCheckIn ?? undefined);

    if (eligibility.status === "eligible") {
      setPhase({ type: "flow", booking: found });
    } else {
      setPhase({ type: "ineligible", booking: found, eligibility, checkIn: existingCheckIn });
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-aether-900/40"
            aria-hidden="true"
          >
            <PlaneIcon className="h-5 w-5 text-aether-400" />
          </div>
          <div>
            <Typography as="h1" variant="heading-xl" className="text-white">
              Online Check-in
            </Typography>
            <Typography variant="body-sm" color="muted">
              Check in for your flight and access your boarding passes.
            </Typography>
          </div>
        </div>

        {/* Demo mode notice */}
        {DEMO_BYPASS_CHECKIN_WINDOW && (
          <div className="mb-6 rounded-xl border border-amber-700/40 bg-amber-900/20 px-4 py-2.5 text-xs text-amber-400">
            <strong>Demo mode:</strong> The 48-hour check-in window is bypassed for any future booking.
            Set <code className="font-mono">DEMO_BYPASS_CHECKIN_WINDOW = false</code> in production.
          </div>
        )}

        {/* Lookup form — always visible for a new search */}
        {(phase.type === "lookup" || phase.type === "not_found") && (
          <CheckInLookupForm
            defaultBookingRef={defaultRef}
            lookupError={lookupError}
            onLookup={handleLookup}
          />
        )}

        {/* Ineligible / already checked in */}
        {phase.type === "ineligible" && (
          <div className="space-y-6">
            <CheckInLookupForm
              lookupError={null}
              onLookup={handleLookup}
            />
            <CheckInEligibilityCard
              eligibility={phase.eligibility}
              bookingRef={phase.booking.bookingRef}
            />
          </div>
        )}

        {/* Check-in flow */}
        {phase.type === "flow" && (
          <div className="space-y-6">
            {/* Booking context chip */}
            <div className="flex items-center gap-3 rounded-xl border border-aether-700/40 bg-aether-900/20 px-4 py-3">
              <PlaneIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
              <span className="text-sm text-aether-200">
                Checking in for booking{" "}
                <span className="font-mono font-semibold">{phase.booking.bookingRef}</span>
              </span>
              <button
                type="button"
                onClick={() => { setPhase({ type: "lookup" }); setLookupError(null); }}
                className="ml-auto text-xs text-neutral-500 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>

            <CheckInFlow booking={phase.booking} />
          </div>
        )}
      </div>
    </div>
  );
}
