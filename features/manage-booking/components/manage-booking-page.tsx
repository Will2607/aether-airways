"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@/shared/ui/typography";
import { SettingsIcon } from "@/shared/icons";
import { bookingsService } from "@/features/trips/services/bookings.service";
import { checkInService } from "@/features/check-in/services/check-in.service";
import { evaluateManageBookingEligibility } from "@/features/manage-booking/utils/eligibility.utils";
import { useManageBooking } from "@/features/manage-booking/hooks/use-manage-booking";
import { ManageBookingHeader } from "./manage-booking-header";
import { ManageBookingNavigation } from "./manage-booking-navigation";
import { ManageBookingUnavailable } from "./manage-booking-unavailable";
import { ContactDetailsEditor } from "./contact-details-editor";
import { SeatChangeEditor } from "./seat-change-editor";
import { ExtrasEditor } from "./extras-editor";
import { ManageBookingReview } from "./manage-booking-review";

interface ManageBookingPageProps {
  bookingRef: string;
}

export function ManageBookingPage({ bookingRef }: ManageBookingPageProps) {
  const [booking]  = useState(() => bookingsService.getByRef(bookingRef));
  const [checkIn]  = useState(() => checkInService.getByRef(bookingRef));

  if (!booking) {
    return (
      <ManageBookingUnavailable
        title="Booking not found"
        reason={`No booking found for reference ${bookingRef}.`}
        bookingRef={bookingRef}
      />
    );
  }

  const eligibility = evaluateManageBookingEligibility(booking, checkIn);

  if (!eligibility.canModify) {
    return (
      <ManageBookingUnavailable
        reason={eligibility.reason}
        bookingRef={booking.bookingRef}
      />
    );
  }

  return <ManageBookingContent bookingRef={bookingRef} />;
}

/* ── Content (requires eligible booking) ────────────────────────────────── */

function ManageBookingContent({ bookingRef }: { bookingRef: string }) {
  const router = useRouter();
  const booking  = bookingsService.getByRef(bookingRef)!;
  const checkIn  = checkInService.getByRef(bookingRef);
  const eligibility = evaluateManageBookingEligibility(booking, checkIn);

  const {
    contactDraft,  setContactDraft,
    seatsDraft,
    extrasDraft,
    updateSeat,
    setExtraQuantity,
    section,       setSection,
    changes,       priceDiff,  hasChanges,
    isProcessing,  error,      setError,
    confirmChanges,
  } = useManageBooking(booking);

  async function handleConfirm() {
    const ok = await confirmChanges();
    if (ok) {
      router.push(`/my-trips/${booking.bookingRef}`);
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      <ManageBookingHeader booking={booking} />

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aether-900/40" aria-hidden="true">
            <SettingsIcon className="h-5 w-5 text-aether-400" />
          </div>
          <div>
            <Typography as="h1" variant="heading-xl" className="text-white">
              Manage booking
            </Typography>
            <Typography variant="body-sm" color="muted">
              {booking.bookingRef} · {booking.selection.flight.legs[0]?.origin.code} → {booking.selection.flight.legs[0]?.destination.code}
            </Typography>
          </div>
        </div>

        {/* Partial eligibility notice */}
        {eligibility.status === "partial" && (
          <div className="rounded-xl border border-amber-700/40 bg-amber-900/20 px-4 py-3 text-sm text-amber-400">
            Check-in complete — seat and extras changes are unavailable. Contact information can still be updated.
          </div>
        )}

        {/* Section navigation */}
        <ManageBookingNavigation
          section={section}
          onChange={setSection}
          eligibility={eligibility}
          changes={changes}
        />

        {/* Active section */}
        <div role="tabpanel">
          {section === "contact" && (
            <ContactDetailsEditor
              draft={contactDraft}
              onChange={setContactDraft}
            />
          )}

          {section === "seats" && (
            eligibility.canChangeSeats ? (
              <SeatChangeEditor
                booking={booking}
                seatsDraft={seatsDraft}
                onUpdate={updateSeat}
              />
            ) : (
              <ManageBookingUnavailable
                title="Seat changes unavailable"
                reason="Seat changes cannot be made after check-in is complete."
                inline
              />
            )
          )}

          {section === "extras" && (
            eligibility.canChangeExtras ? (
              <ExtrasEditor
                booking={booking}
                extrasDraft={extrasDraft}
                onQuantityChange={setExtraQuantity}
              />
            ) : (
              <ManageBookingUnavailable
                title="Extras changes unavailable"
                reason="Extras cannot be modified after check-in is complete."
                inline
              />
            )
          )}

          {section === "review" && (
            <ManageBookingReview
              changes={changes}
              priceDiff={priceDiff}
              currency={booking.currency}
              hasChanges={hasChanges}
              isProcessing={isProcessing}
              error={error}
              onConfirm={handleConfirm}
              onClearError={() => setError(null)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
