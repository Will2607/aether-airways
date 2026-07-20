"use client";
import { useState } from "react";
import { CheckCircleIcon, XIcon } from "@/shared/icons";
import { MODIFICATION_SUCCESS_FLAG_KEY } from "@/features/manage-booking/constants";

interface ManageBookingSuccessBannerProps {
  bookingRef: string;
}

export function ManageBookingSuccessBanner({ bookingRef }: ManageBookingSuccessBannerProps) {
  // Lazy initializer: reads sessionStorage once at mount, then clears the flag
  const [show, setShow] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const ref = sessionStorage.getItem(MODIFICATION_SUCCESS_FLAG_KEY);
      if (ref === bookingRef) {
        sessionStorage.removeItem(MODIFICATION_SUCCESS_FLAG_KEY);
        return true;
      }
    } catch { /* ignore private mode */ }
    return false;
  });

  if (!show) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex items-start justify-between gap-3 rounded-xl border border-emerald-700/40 bg-emerald-900/20 px-4 py-3 text-sm text-emerald-300"
    >
      <div className="flex items-center gap-2">
        <CheckCircleIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
        Your booking was updated successfully.
      </div>
      <button
        type="button"
        onClick={() => setShow(false)}
        aria-label="Dismiss"
        className="shrink-0 text-emerald-600 hover:text-emerald-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
      >
        <XIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
