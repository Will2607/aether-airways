"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { SearchIcon, ArrowRightIcon } from "@/shared/icons";
import { todayLocalDate } from "@/features/flight-status/utils/flight-status.utils";

const schema = z
  .object({
    origin:      z.string().length(3, "Enter a 3-letter IATA code (e.g. BOG)"),
    destination: z.string().length(3, "Enter a 3-letter IATA code (e.g. MIA)"),
    date:        z.string().min(1, "Date is required"),
  })
  .refine(
    (d) => d.origin.toUpperCase() !== d.destination.toUpperCase(),
    { message: "Origin and destination must be different", path: ["destination"] }
  );

export type RouteSearchValues = z.infer<typeof schema>;

const labelClass = "block text-sm font-medium text-neutral-300 mb-1.5";
const errorClass = "mt-1 text-xs text-red-400";

interface RouteSearchFormProps {
  onSearch: (values: RouteSearchValues) => void;
}

export function RouteSearchForm({ onSearch }: RouteSearchFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<RouteSearchValues>({
    resolver:      zodResolver(schema),
    defaultValues: { origin: "", destination: "", date: todayLocalDate() },
  });

  return (
    <form onSubmit={handleSubmit(onSearch)} noValidate className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="fs-origin" className={labelClass}>Origin</label>
          <Input
            {...register("origin")}
            id="fs-origin"
            type="text"
            autoComplete="off"
            maxLength={3}
            placeholder="BOG"
            className="uppercase"
            aria-describedby={errors.origin ? "fs-origin-error" : undefined}
            aria-invalid={!!errors.origin}
          />
          {errors.origin && (
            <p id="fs-origin-error" role="alert" className={errorClass}>
              {errors.origin.message}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-end">
          <div className="hidden items-center justify-center sm:flex" aria-hidden="true">
            <ArrowRightIcon className="h-5 w-5 text-neutral-600" />
          </div>
          <label htmlFor="fs-destination" className={labelClass}>Destination</label>
          <Input
            {...register("destination")}
            id="fs-destination"
            type="text"
            autoComplete="off"
            maxLength={3}
            placeholder="MIA"
            className="uppercase"
            aria-describedby={errors.destination ? "fs-dest-error" : undefined}
            aria-invalid={!!errors.destination}
          />
          {errors.destination && (
            <p id="fs-dest-error" role="alert" className={errorClass}>
              {errors.destination.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="fs-route-date" className={labelClass}>Date</label>
          <Input
            {...register("date")}
            id="fs-route-date"
            type="date"
            aria-describedby={errors.date ? "fs-rdate-error" : undefined}
            aria-invalid={!!errors.date}
          />
          {errors.date && (
            <p id="fs-rdate-error" role="alert" className={errorClass}>
              {errors.date.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" variant="primary">
        <SearchIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        Search route
      </Button>
    </form>
  );
}
