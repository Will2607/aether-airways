"use client";
import { useState, useMemo, useCallback } from "react";
import { bookingsService } from "@/features/trips/services/bookings.service";
import { computeChanges, buildUpdatedBooking } from "@/features/manage-booking/utils/changes.utils";
import { computePriceDiff } from "@/features/manage-booking/utils/price-diff.utils";
import {
  processBookingModification,
  modificationService,
} from "@/features/manage-booking/services/manage-booking.service";
import { MODIFICATION_SUCCESS_FLAG_KEY } from "@/features/manage-booking/constants";
import type { StoredBooking } from "@/features/trips/types";
import type {
  ManageBookingSection,
  ContactDraft,
  SeatDraftEntry,
  ExtraDraftEntry,
  BookingChangeSet,
} from "@/features/manage-booking/types";

/* ── Hook ────────────────────────────────────────────────────────────────── */

export function useManageBooking(booking: StoredBooking) {
  /* ── Draft state — initialized once, never persisted ─────────────────── */
  const [contactDraft, setContactDraft] = useState<ContactDraft>(() => ({
    email:       booking.passengers.contact.email,
    phone:       booking.passengers.contact.phone,
    countryCode: booking.passengers.contact.countryCode,
  }));

  const [seatsDraft, setSeatsDraft] = useState<SeatDraftEntry[]>(
    () => booking.seats.selections.map((s) => ({ ...s }))
  );

  const [extrasDraft, setExtrasDraft] = useState<ExtraDraftEntry[]>(
    () => [...(booking.extras?.selections ?? [])]
  );

  const [section, setSection]       = useState<ManageBookingSection>("contact");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError]           = useState<string | null>(null);

  /* ── Derived state ───────────────────────────────────────────────────── */

  const changes = useMemo(
    () => computeChanges(booking, contactDraft, seatsDraft, extrasDraft),
    [booking, contactDraft, seatsDraft, extrasDraft]
  );

  const priceDiff = useMemo(
    () => computePriceDiff(booking, seatsDraft, extrasDraft),
    [booking, seatsDraft, extrasDraft]
  );

  const hasChanges = changes.length > 0;

  /* ── Seat helpers ────────────────────────────────────────────────────── */

  const updateSeat = useCallback((entry: SeatDraftEntry) => {
    setSeatsDraft((prev) =>
      prev.map((s) => (s.passengerId === entry.passengerId ? { ...entry } : s))
    );
  }, []);

  /* ── Extras helpers ──────────────────────────────────────────────────── */

  const setExtraQuantity = useCallback(
    (extraId: string, passengerId: string, qty: number, priceAtTime: number, currency: string) => {
      setExtrasDraft((prev) => {
        const key = (e: ExtraDraftEntry) => e.extraId === extraId && e.passengerId === passengerId;
        if (qty <= 0) return prev.filter((e) => !key(e));
        const exists = prev.find(key);
        if (exists) return prev.map((e) => (key(e) ? { ...e, quantity: qty } : e));
        return [...prev, { extraId, passengerId, quantity: qty, priceAtTime, currency }];
      });
    },
    []
  );

  const getExtraQuantity = useCallback(
    (extraId: string, passengerId: string): number =>
      extrasDraft.find((e) => e.extraId === extraId && e.passengerId === passengerId)?.quantity ?? 0,
    [extrasDraft]
  );

  /* ── Confirm ─────────────────────────────────────────────────────────── */

  const confirmChanges = useCallback(async (): Promise<boolean> => {
    if (!hasChanges || isProcessing) return false;

    setIsProcessing(true);
    setError(null);

    const now = new Date().toISOString();
    const stamped = changes.map((c) => ({ ...c, createdAt: now }));

    const changeSet: BookingChangeSet = {
      bookingRef:    booking.bookingRef,
      changes:       stamped,
      previousTotal: priceDiff.previousTotal,
      newTotal:      priceDiff.newTotal,
      netDifference: priceDiff.netDifference,
    };

    try {
      // 1. Send to mock processor
      const result = await processBookingModification(changeSet);

      // 2. Build updated booking
      const updated = buildUpdatedBooking(booking, contactDraft, seatsDraft, extrasDraft);

      // 3. Persist booking
      bookingsService.save(updated);

      // 4. Append modification record
      modificationService.save({
        modificationId: result.modificationId,
        bookingRef:     booking.bookingRef,
        createdAt:      now,
        changes:        stamped,
        previousTotal:  changeSet.previousTotal,
        newTotal:       changeSet.newTotal,
        netDifference:  changeSet.netDifference,
        status:         "completed",
      });

      // 5. Set success flag for banner
      try {
        sessionStorage.setItem(MODIFICATION_SUCCESS_FLAG_KEY, booking.bookingRef);
      } catch { /* ignore */ }

      return true;
    } catch {
      setError("An error occurred while saving changes. Please try again.");
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [hasChanges, isProcessing, changes, priceDiff, booking, contactDraft, seatsDraft, extrasDraft]);

  return {
    /* Draft state */
    contactDraft,  setContactDraft,
    seatsDraft,    setSeatsDraft,
    extrasDraft,
    /* Helpers */
    updateSeat,
    setExtraQuantity,
    getExtraQuantity,
    /* Navigation */
    section, setSection,
    /* Derived */
    changes, priceDiff, hasChanges,
    /* Confirmation */
    isProcessing, error, setError,
    confirmChanges,
  };
}
