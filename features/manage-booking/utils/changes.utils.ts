import { ALL_EXTRAS } from "@/features/booking/mocks/extras.mock";
import type { StoredBooking } from "@/features/trips/types";
import type {
  BookingChange,
  ContactDraft,
  SeatDraftEntry,
  ExtraDraftEntry,
} from "@/features/manage-booking/types";
import {
  draftSeatTotal,
  draftExtrasTotal,
  computeExtrasBreakdown,
} from "@/features/manage-booking/utils/price-diff.utils";

/* ── Contact changes ─────────────────────────────────────────────────────── */

function contactChanges(
  original: StoredBooking,
  draft:    ContactDraft,
  now:      string
): BookingChange[] {
  const orig = original.passengers.contact;
  const hasChange =
    draft.email.trim()       !== orig.email.trim()       ||
    draft.phone.trim()       !== orig.phone.trim()       ||
    draft.countryCode.trim() !== orig.countryCode.trim();

  if (!hasChange) return [];

  return [
    {
      id:              "contact_updated",
      type:            "contact_updated",
      label:           "Contact information",
      previousValue:   `${orig.email} / ${orig.countryCode} ${orig.phone}`,
      nextValue:       `${draft.email} / ${draft.countryCode} ${draft.phone}`,
      priceDifference: 0,
      createdAt:       now,
    },
  ];
}

/* ── Seat changes ────────────────────────────────────────────────────────── */

function seatChanges(
  original: StoredBooking,
  draft:    SeatDraftEntry[],
  now:      string
): BookingChange[] {
  return draft.flatMap((ds) => {
    const orig = original.seats.selections.find((s) => s.passengerId === ds.passengerId);
    if (!orig || orig.seatId === ds.seatId) return [];

    const paxNum = Number(ds.passengerId) + 1;
    return [
      {
        id:              `seat_changed-${ds.passengerId}`,
        type:            "seat_changed" as const,
        label:           `Seat — passenger ${paxNum}`,
        previousValue:   orig.seatLabel,
        nextValue:       ds.seatLabel,
        priceDifference: ds.price.amount - orig.price.amount,
        passengerId:     ds.passengerId,
        createdAt:       now,
      },
    ];
  });
}

/* ── Extras changes ──────────────────────────────────────────────────────── */

function extrasChanges(
  original: StoredBooking,
  draft:    ExtraDraftEntry[],
  now:      string
): BookingChange[] {
  const changes: BookingChange[] = [];
  const allExtrasMap = new Map(ALL_EXTRAS.map((e) => [e.id, e]));

  const origMap = new Map(
    (original.extras?.selections ?? []).map((e) => [`${e.extraId}|${e.passengerId}`, e])
  );
  const draftMap = new Map(draft.map((e) => [`${e.extraId}|${e.passengerId}`, e]));

  function extraLabel(extraId: string, passengerId: string): string {
    const name = allExtrasMap.get(extraId)?.name ?? extraId;
    const paxStr =
      passengerId === "booking"
        ? ""
        : ` — pax ${Number(passengerId) + 1}`;
    return `${name}${paxStr}`;
  }

  // Removed or quantity decreased
  for (const [key, orig] of origMap) {
    const draft = draftMap.get(key);
    const label = extraLabel(orig.extraId, orig.passengerId);

    if (!draft) {
      changes.push({
        id:              `extra_removed-${key}`,
        type:            "extra_removed",
        label,
        previousValue:   `${orig.quantity}×`,
        nextValue:       "Removed",
        priceDifference: -(orig.quantity * orig.priceAtTime),
        passengerId:     orig.passengerId === "booking" ? undefined : orig.passengerId,
        createdAt:       now,
      });
    } else if (draft.quantity !== orig.quantity) {
      const diff = draft.quantity - orig.quantity;
      changes.push({
        id:              `extra_quantity_changed-${key}`,
        type:            "extra_quantity_changed",
        label,
        previousValue:   `${orig.quantity}×`,
        nextValue:       `${draft.quantity}×`,
        priceDifference: diff * orig.priceAtTime,
        passengerId:     orig.passengerId === "booking" ? undefined : orig.passengerId,
        createdAt:       now,
      });
    }
  }

  // Added
  for (const [key, dr] of draftMap) {
    if (!origMap.has(key)) {
      changes.push({
        id:              `extra_added-${key}`,
        type:            "extra_added",
        label:           extraLabel(dr.extraId, dr.passengerId),
        previousValue:   "Not selected",
        nextValue:       `${dr.quantity}×`,
        priceDifference: dr.quantity * dr.priceAtTime,
        passengerId:     dr.passengerId === "booking" ? undefined : dr.passengerId,
        createdAt:       now,
      });
    }
  }

  return changes;
}

/* ── Public API ──────────────────────────────────────────────────────────── */

export function computeChanges(
  original: StoredBooking,
  contact:  ContactDraft,
  seats:    SeatDraftEntry[],
  extras:   ExtraDraftEntry[],
  now?:     string
): BookingChange[] {
  const ts = now ?? new Date().toISOString();
  return [
    ...contactChanges(original, contact, ts),
    ...seatChanges(original, seats, ts),
    ...extrasChanges(original, extras, ts),
  ];
}

/* ── Build updated booking ───────────────────────────────────────────────── */

/**
 * Constructs a new StoredBooking from the original plus all draft changes.
 * Does NOT mutate the original object.
 */
export function buildUpdatedBooking(
  original:  StoredBooking,
  contact:   ContactDraft,
  seats:     SeatDraftEntry[],
  extras:    ExtraDraftEntry[]
): StoredBooking {
  const now           = new Date().toISOString();
  const newSeatFee    = draftSeatTotal(seats);
  const newExtrasTotal = draftExtrasTotal(extras);
  const extrasBreakdown = computeExtrasBreakdown(extras);
  const newGrandTotal = Math.max(
    0,
    original.priceSummary.grandTotal + newSeatFee + newExtrasTotal
  );

  return {
    ...original,
    passengers: {
      ...original.passengers,
      contact: {
        email:       contact.email.trim(),
        phone:       contact.phone.trim(),
        countryCode: contact.countryCode.trim(),
      },
      savedAt: now,
    },
    seats: {
      ...original.seats,
      selections:   seats,
      totalSeatFee: newSeatFee,
      savedAt:      now,
    },
    extras: {
      savedAt:     now,
      selections:  extras,
      extrasTotal: newExtrasTotal,
    },
    seatFees:        newSeatFee,
    extrasBreakdown,
    grandTotal:      newGrandTotal,
  };
}
