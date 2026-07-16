/**
 * Utility functions for card number formatting and brand detection.
 * These operate on UI display only — no validation against real card networks.
 */

/** Format a card number string with spaces every 4 digits (max 19 chars). */
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").slice(0, 19);
}

/** Format an expiry string as MM/YY while the user types. */
export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

/**
 * Detect card brand from the first digits of the normalized card number.
 * Returns a simple lowercase brand string or "unknown".
 */
export function detectCardBrand(normalized: string): string {
  if (/^4/.test(normalized))           return "visa";
  if (/^5[1-5]/.test(normalized))      return "mastercard";
  if (/^3[47]/.test(normalized))       return "amex";
  if (/^6(?:011|5)/.test(normalized))  return "discover";
  return "unknown";
}

/** Return a masked representation showing only the last 4 digits. */
export function maskCardNumber(last4: string): string {
  return `•••• •••• •••• ${last4}`;
}

/** Map a brand string to a human-readable label. */
export function brandLabel(brand: string): string {
  const labels: Record<string, string> = {
    visa:       "Visa",
    mastercard: "Mastercard",
    amex:       "Amex",
    discover:   "Discover",
  };
  return labels[brand] ?? "Card";
}
