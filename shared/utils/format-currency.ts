import type { CurrencyCode } from "@/types";

export function formatCurrency(
  amount: number,
  currency: CurrencyCode = "USD",
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}
