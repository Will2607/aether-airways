import { detectCardBrand } from "@/features/booking/utils/card.utils";

/* ── Types ───────────────────────────────────────────────────────────────── */

export interface MockPaymentInput {
  /** Digits only, spaces removed. Never logged or stored in full. */
  normalizedCardNumber: string;
  holderName:           string;
}

export type MockPaymentResult =
  | { success: true;  transactionId: string; last4: string; brand: string }
  | { success: false; errorCode: string;     message: string };

/* ── Mock service ────────────────────────────────────────────────────────── */

const MOCK_LATENCY_MS = 1500;

/**
 * Simulated payment processor.
 *
 * Deterministic rules (no Math.random for outcomes):
 *   • Card ending in "0000"  → declined  (use to test error flow)
 *   • All other cards        → success
 *
 * SECURITY NOTE:
 * In production, full card data would never reach this function.
 * A PCI-compliant SDK (e.g., Stripe.js, Braintree) running in the browser
 * would tokenize the card client-side and return only a one-time token,
 * which is then sent to the server. No sensitive card data traverses
 * application code or is stored anywhere.
 */
export async function processMockPayment(
  input: MockPaymentInput
): Promise<MockPaymentResult> {
  // Simulate network round-trip latency
  await new Promise<void>((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

  const last4 = input.normalizedCardNumber.slice(-4);

  if (last4 === "0000") {
    return {
      success:   false,
      errorCode: "card_declined",
      message:
        "Your card was declined. Please check your details or use a different card.",
    };
  }

  return {
    success:       true,
    transactionId: `TXN-${Date.now()}`,
    last4,
    brand:         detectCardBrand(input.normalizedCardNumber),
  };
}
