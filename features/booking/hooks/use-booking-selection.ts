"use client";

/**
 * Why NOT useSyncExternalStore here:
 *
 * useSyncExternalStore calls getSnapshot() on every render to detect changes.
 * selectionService.get() calls JSON.parse() each time, returning a NEW object
 * reference on every call — even when the data is identical. React compares
 * snapshots with strict equality (===), so it always sees a "change" and
 * triggers another render, causing the infinite loop error:
 *   "The result of getSnapshot should be cached to avoid an infinite loop"
 *
 * useSyncExternalStore is the right tool for stores that:
 *   - have a subscription mechanism to notify React of changes, AND
 *   - return a stable (cached) reference from getSnapshot.
 * sessionStorage satisfies neither: it has no within-tab events and
 * JSON.parse creates new objects every call.
 *
 * Why useState lazy initializer:
 *
 * The lazy initializer form `useState(() => fn())` runs fn EXACTLY ONCE,
 * during the component's first render on the client. It needs no useEffect,
 * produces no cascading renders, and triggers no lint warnings.
 * This is the correct React primitive for "read client-only data once on mount".
 *
 * Safety: this hook is only consumed inside <BookingReviewLoader> which uses
 * `dynamic(..., { ssr: false })`. The component never runs on the server, so
 * the lazy initializer always executes in a browser environment where
 * sessionStorage is available.
 */

import { useState } from "react";
import { selectionService } from "@/features/booking/services/selection.service";
import type { BookingSelection } from "@/features/booking/types";

export function useBookingSelection(): { selection: BookingSelection | null } {
  // Lazy initializer: runs once on first client render.
  // selectionService.get() returns null if sessionStorage is unavailable
  // or if the stored value is missing / structurally invalid.
  const [selection] = useState<BookingSelection | null>(
    () => selectionService.get()
  );

  return { selection };
}
