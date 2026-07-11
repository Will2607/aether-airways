import { z } from "zod";

const today = () => new Date().toISOString().slice(0, 10);

/* ── Contact ─────────────────────────────────────────────────────────────── */

export const contactSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  countryCode: z
    .string()
    .min(1, "Select a country code"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number is too long")
    .regex(/^\d+$/, "Phone must contain only digits"),
});

/* ── Single passenger ────────────────────────────────────────────────────── */

export const passengerDetailsSchema = z.object({
  passengerType: z.enum(["adult", "child", "infant"]),

  title: z
    .string()
    .refine((v) => ["mr", "ms", "mrs", "dr", "prof"].includes(v), {
      message: "Select a title",
    }),

  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),

  middleName: z
    .string()
    .max(50, "Middle name is too long")
    .optional()
    .or(z.literal("")),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((d) => /^\d{4}-\d{2}-\d{2}$/.test(d), "Enter a valid date (YYYY-MM-DD)")
    .refine((d) => d < today(), "Date of birth cannot be in the future"),

  gender: z
    .string()
    .refine((v) => ["male", "female", "other", "prefer_not_to_say"].includes(v), {
      message: "Select a gender",
    }),

  nationality: z
    .string()
    .min(1, "Nationality is required")
    .length(2, "Use 2-letter ISO country code")
    .regex(/^[A-Z]{2}$/, "Use uppercase 2-letter code (e.g. US, GB, CO)"),

  documentType: z
    .string()
    .refine((v) => ["passport", "national_id", "drivers_license"].includes(v), {
      message: "Select a document type",
    }),

  documentNumber: z
    .string()
    .min(5, "Document number must be at least 5 characters")
    .max(20, "Document number is too long"),

  documentExpiry: z
    .string()
    .min(1, "Expiration date is required")
    .refine((d) => /^\d{4}-\d{2}-\d{2}$/.test(d), "Enter a valid date (YYYY-MM-DD)")
    .refine((d) => d > today(), "Document must not be expired"),
});

/* ── Full form ───────────────────────────────────────────────────────────── */

export const passengerFormSchema = z.object({
  contact:    contactSchema,
  passengers: z.array(passengerDetailsSchema).min(1),
});

export type ContactFormValues    = z.infer<typeof contactSchema>;
export type PassengerFormValues  = z.infer<typeof passengerDetailsSchema>;
export type PassengerFormPayload = z.infer<typeof passengerFormSchema>;
