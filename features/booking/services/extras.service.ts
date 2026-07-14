import { EXTRAS_STORAGE_KEY } from "@/features/booking/constants";
import type { ExtrasSelectionData } from "@/features/booking/types";

function isClient(): boolean {
  return typeof window !== "undefined";
}

function isValid(raw: unknown): raw is ExtrasSelectionData {
  if (!raw || typeof raw !== "object") return false;
  const d = raw as Record<string, unknown>;
  return (
    typeof d.savedAt === "string" &&
    Array.isArray(d.selections) &&
    typeof d.extrasTotal === "number"
  );
}

export const extrasService = {
  save(data: ExtrasSelectionData): void {
    if (!isClient()) return;
    try {
      sessionStorage.setItem(EXTRAS_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Quota exceeded or private mode — fail silently
    }
  },

  get(): ExtrasSelectionData | null {
    if (!isClient()) return null;
    try {
      const raw = sessionStorage.getItem(EXTRAS_STORAGE_KEY);
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      return isValid(parsed) ? parsed : null;
    } catch {
      return null;
    }
  },

  clear(): void {
    if (!isClient()) return;
    try {
      sessionStorage.removeItem(EXTRAS_STORAGE_KEY);
    } catch {
      // ignore
    }
  },
};
