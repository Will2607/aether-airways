import { z } from "zod";

export const passengerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dateOfBirth: z.string().date("Invalid date of birth"),
  passportNumber: z
    .string()
    .min(6, "Invalid passport number")
    .max(20, "Invalid passport number"),
  nationality: z.string().length(2, "Use ISO 3166-1 alpha-2 country code"),
});

export const bookingContactSchema = z.object({
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z
    .string()
    .regex(/^\+?[1-9]\d{6,14}$/, "Invalid phone number"),
  passengers: z.array(passengerSchema).min(1),
});

export type PassengerFormValues = z.infer<typeof passengerSchema>;
export type BookingContactFormValues = z.infer<typeof bookingContactSchema>;
