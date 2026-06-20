import { z } from "zod";

export const flightSearchSchema = z
  .object({
    origin: z
      .string()
      .length(3, "Origin must be a 3-letter IATA code")
      .toUpperCase(),
    destination: z
      .string()
      .length(3, "Destination must be a 3-letter IATA code")
      .toUpperCase(),
    departureDate: z.string().date("Invalid departure date"),
    returnDate: z.string().date("Invalid return date").optional(),
    passengers: z.number().int().min(1).max(9),
    cabinClass: z.enum(["economy", "premium_economy", "business", "first"]),
    tripType: z.enum(["one_way", "round_trip", "multi_city"]),
  })
  .refine(
    (data) => {
      if (data.tripType === "round_trip") return !!data.returnDate;
      return true;
    },
    { message: "Return date is required for round trips", path: ["returnDate"] }
  )
  .refine(
    (data) => {
      if (data.returnDate) return data.returnDate > data.departureDate;
      return true;
    },
    {
      message: "Return date must be after departure date",
      path: ["returnDate"],
    }
  );

export type FlightSearchFormValues = z.infer<typeof flightSearchSchema>;
