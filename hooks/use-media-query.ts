"use client";

import { useSyncExternalStore } from "react";

/**
 * Returns true when the document matches the given media query.
 * Uses useSyncExternalStore for correct SSR hydration.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
