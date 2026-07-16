import { z } from "zod";

export const paymentFormSchema = z.object({
  /* ── Card details ─────────────────────────────────────────────────────── */

  cardHolder: z
    .string()
    .min(2, { message: "Cardholder name must be at least 2 characters" })
    .max(64, { message: "Cardholder name is too long" }),

  /** Raw value may contain spaces (e.g., "4111 1111 1111 1111"). Normalized before submission. */
  cardNumber: z
    .string()
    .min(1, { message: "Card number is required" })
    .refine(
      (v) => /^\d{13,19}$/.test(v.replace(/\s+/g, "")),
      { message: "Enter a valid card number (13–19 digits)" }
    ),

  cardExpiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Enter expiry as MM/YY, e.g. 08/26" })
    .refine((v) => {
      const [mm, yy] = v.split("/");
      if (!mm || !yy) return false;
      const year  = 2000 + parseInt(yy, 10);
      const month = parseInt(mm, 10);
      // Card is valid through the last day of the expiry month
      return new Date(year, month, 1) > new Date();
    }, { message: "Card has expired" }),

  /** 3–4 digits. Never persisted or logged. */
  cardCvc: z
    .string()
    .regex(/^\d{3,4}$/, { message: "Enter the 3 or 4 digit security code" }),

  /* ── Billing address ──────────────────────────────────────────────────── */

  billingCountry: z.string().min(1, { message: "Country is required" }),
  billingAddress: z.string().min(3, { message: "Address is required" }),
  billingCity:    z.string().min(1, { message: "City is required" }),
  billingPostal:  z.string().min(1, { message: "Postal code is required" }),

  /* ── Terms ────────────────────────────────────────────────────────────── */

  acceptTerms: z
    .boolean()
    .refine((v) => v === true, { message: "You must accept the Terms & Conditions to continue" }),
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;
