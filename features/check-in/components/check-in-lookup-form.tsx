"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { SearchIcon, AlertCircleIcon } from "@/shared/icons";

const schema = z.object({
  bookingRef: z.string().min(1, "Booking reference is required"),
  lastName:   z.string().min(1, "Last name is required"),
});

type Values = z.infer<typeof schema>;

const labelClass = "block text-sm font-medium text-neutral-300 mb-1.5";
const errorClass = "mt-1 text-xs text-red-400";

interface CheckInLookupFormProps {
  defaultBookingRef?: string;
  lookupError?:       string | null;
  isLoading?:         boolean;
  onLookup:           (bookingRef: string, lastName: string) => void;
}

export function CheckInLookupForm({
  defaultBookingRef = "",
  lookupError,
  isLoading,
  onLookup,
}: CheckInLookupFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { bookingRef: defaultBookingRef, lastName: "" },
  });

  function onSubmit(data: Values) {
    onLookup(data.bookingRef.trim().toUpperCase(), data.lastName.trim());
  }

  return (
    <div className="rounded-2xl border border-neutral-800 bg-card p-6">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-aether-400">
        Find your booking
      </p>
      <p className="mb-5 text-sm text-neutral-500">
        Enter your booking reference and last name to begin check-in.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ci-bookingRef" className={labelClass}>Booking reference</label>
            <Input
              {...register("bookingRef")}
              id="ci-bookingRef"
              type="text"
              autoComplete="off"
              placeholder="AE7K2P"
              className="uppercase"
              aria-describedby={errors.bookingRef ? "ci-ref-error" : undefined}
              aria-invalid={!!errors.bookingRef}
            />
            {errors.bookingRef && (
              <p id="ci-ref-error" role="alert" className={errorClass}>
                {errors.bookingRef.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="ci-lastName" className={labelClass}>Last name</label>
            <Input
              {...register("lastName")}
              id="ci-lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Doe"
              aria-describedby={errors.lastName ? "ci-ln-error" : undefined}
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <p id="ci-ln-error" role="alert" className={errorClass}>
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

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

        <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading}>
          <SearchIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          Find my booking
        </Button>
      </form>
    </div>
  );
}
