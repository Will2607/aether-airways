"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { SearchIcon, AlertCircleIcon } from "@/shared/icons";
import { lookupBooking } from "@/features/trips/utils/trip.utils";
import type { StoredBooking } from "@/features/trips/types";

const lookupSchema = z.object({
  bookingRef: z.string().min(1, "Booking reference is required"),
  lastName:   z.string().min(1, "Last name is required"),
});

type LookupFormValues = z.infer<typeof lookupSchema>;

const labelClass = "block text-sm font-medium text-neutral-300 mb-1.5";
const errorClass = "mt-1 text-xs text-red-400";

interface BookingLookupFormProps {
  bookings: StoredBooking[];
}

export function BookingLookupForm({ bookings }: BookingLookupFormProps) {
  const router = useRouter();
  const [lookupError, setLookupError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LookupFormValues>({
    resolver: zodResolver(lookupSchema),
  });

  function onSubmit(data: LookupFormValues) {
    setLookupError(null);

    const result = lookupBooking(
      { bookingRef: data.bookingRef, lastName: data.lastName },
      bookings
    );

    if (!result) {
      // Generic error — do not reveal which field is wrong
      setLookupError("No booking found with that reference and last name.");
      return;
    }

    router.push(`/my-trips/${result.bookingRef}`);
  }

  return (
    <div className="rounded-2xl border border-neutral-800 bg-card p-6">
      <h2 className="mb-1 text-sm font-semibold uppercase tracking-widest text-aether-400">
        Find a booking
      </h2>
      <p className="mb-5 text-sm text-neutral-500">
        Enter your booking reference and last name to locate a reservation.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="bookingRef" className={labelClass}>
              Booking reference
            </label>
            <Input
              {...register("bookingRef")}
              id="bookingRef"
              type="text"
              autoComplete="off"
              placeholder="AE7K2P"
              className="uppercase"
              aria-describedby={errors.bookingRef ? "bookingRef-error" : undefined}
              aria-invalid={!!errors.bookingRef}
            />
            {errors.bookingRef && (
              <p id="bookingRef-error" role="alert" className={errorClass}>
                {errors.bookingRef.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className={labelClass}>
              Last name
            </label>
            <Input
              {...register("lastName")}
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Doe"
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <p id="lastName-error" role="alert" className={errorClass}>
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Lookup error */}
        {lookupError && (
          <div
            role="alert"
            aria-live="assertive"
            className="flex items-start gap-2 rounded-xl border border-red-700/40 bg-red-900/20 px-4 py-3 text-sm"
          >
            <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
            <p className="text-red-300">{lookupError}</p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          <SearchIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          Find my trip
        </Button>
      </form>
    </div>
  );
}
