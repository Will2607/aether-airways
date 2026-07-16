"use client";
import { useState } from "react";
import { confirmationService } from "@/features/booking/services/confirmation.service";
import type { BookingConfirmation } from "@/features/booking/types";

/**
 * Reads a BookingConfirmation from sessionStorage using a lazy initializer.
 * Safe for SSR — sessionStorage is accessed only on the client.
 */
export function useConfirmation(): { confirmation: BookingConfirmation | null } {
  const [confirmation] = useState<BookingConfirmation | null>(
    () => confirmationService.get()
  );
  return { confirmation };
}
