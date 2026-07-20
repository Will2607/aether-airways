"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { SearchIcon } from "@/shared/icons";
import { todayLocalDate } from "@/features/flight-status/utils/flight-status.utils";

const schema = z.object({
  flightInput: z.string().min(1, "Flight number is required").max(8, "Too long"),
  date:        z.string().min(1, "Date is required"),
});

export type FlightNumberSearchValues = z.infer<typeof schema>;

const labelClass = "block text-sm font-medium text-neutral-300 mb-1.5";
const errorClass = "mt-1 text-xs text-red-400";

interface FlightNumberSearchFormProps {
  onSearch: (values: FlightNumberSearchValues) => void;
}

export function FlightNumberSearchForm({ onSearch }: FlightNumberSearchFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FlightNumberSearchValues>({
    resolver:      zodResolver(schema),
    defaultValues: { flightInput: "", date: todayLocalDate() },
  });

  return (
    <form onSubmit={handleSubmit(onSearch)} noValidate className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fs-number" className={labelClass}>Flight number</label>
          <div className="relative">
            <span
              className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-semibold text-neutral-500"
              aria-hidden="true"
            >
              AE
            </span>
            <Input
              {...register("flightInput")}
              id="fs-number"
              type="text"
              autoComplete="off"
              placeholder="201"
              className="pl-9 uppercase"
              aria-describedby={errors.flightInput ? "fs-num-error" : undefined}
              aria-invalid={!!errors.flightInput}
            />
          </div>
          {errors.flightInput && (
            <p id="fs-num-error" role="alert" className={errorClass}>
              {errors.flightInput.message}
            </p>
          )}
          <p className="mt-1 text-xs text-neutral-600">
            Enter 201, AE201 or AE&nbsp;201
          </p>
        </div>

        <div>
          <label htmlFor="fs-date" className={labelClass}>Date</label>
          <Input
            {...register("date")}
            id="fs-date"
            type="date"
            aria-describedby={errors.date ? "fs-date-error" : undefined}
            aria-invalid={!!errors.date}
          />
          {errors.date && (
            <p id="fs-date-error" role="alert" className={errorClass}>
              {errors.date.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" variant="primary">
        <SearchIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        Search flight
      </Button>
    </form>
  );
}
