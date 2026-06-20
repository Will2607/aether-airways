import { describe, it, expect } from "vitest";
import { flightSearchSchema } from "@/features/flights/schemas/flight-search.schema";

describe("flightSearchSchema", () => {
  const validPayload = {
    origin: "BOG",
    destination: "MIA",
    departureDate: "2026-09-01",
    passengers: 1,
    cabinClass: "economy" as const,
    tripType: "one_way" as const,
  };

  it("accepts a valid one-way search", () => {
    expect(flightSearchSchema.safeParse(validPayload).success).toBe(true);
  });

  it("rejects when origin is not 3 characters", () => {
    const result = flightSearchSchema.safeParse({ ...validPayload, origin: "BO" });
    expect(result.success).toBe(false);
  });

  it("requires returnDate on round_trip", () => {
    const result = flightSearchSchema.safeParse({
      ...validPayload,
      tripType: "round_trip",
    });
    expect(result.success).toBe(false);
  });

  it("rejects returnDate before departureDate", () => {
    const result = flightSearchSchema.safeParse({
      ...validPayload,
      tripType: "round_trip",
      returnDate: "2026-08-01",
    });
    expect(result.success).toBe(false);
  });
});
