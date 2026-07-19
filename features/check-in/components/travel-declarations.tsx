"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { ArrowLeftIcon } from "@/shared/icons";

const required = (msg: string) =>
  z.boolean().refine((v) => v === true, { message: msg });

const schema = z.object({
  passengerDataCorrect: required("You must confirm passenger data is correct."),
  noProhibitedItems:    required("You must confirm no prohibited items are being carried."),
  baggageCompliant:     required("You must confirm your baggage meets the conditions."),
  acceptConditions:     required("You must accept the conditions of carriage."),
});

type Values = z.infer<typeof schema>;

const declarations: { field: keyof Values; label: string }[] = [
  {
    field: "passengerDataCorrect",
    label: "I confirm that the passenger details provided are accurate and match the travel documents being carried.",
  },
  {
    field: "noProhibitedItems",
    label: "I confirm that no passenger is carrying items prohibited by aviation security regulations (weapons, explosives, or other restricted items).",
  },
  {
    field: "baggageCompliant",
    label: "I confirm that all baggage complies with weight, size, and content requirements applicable to this flight.",
  },
  {
    field: "acceptConditions",
    label: "I accept the AetherAirways Conditions of Carriage and acknowledge this check-in is binding.",
  },
];

interface TravelDeclarationsProps {
  onBack:    () => void;
  onConfirm: () => void;
}

export function TravelDeclarations({ onBack, onConfirm }: TravelDeclarationsProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      passengerDataCorrect: false,
      noProhibitedItems:    false,
      baggageCompliant:     false,
      acceptConditions:     false,
    },
  });

  return (
    <div className="space-y-5">
      <div>
        <Typography variant="heading-sm" className="text-white">Step 2 of 2 — Travel declarations</Typography>
        <Typography variant="body-sm" color="muted" className="mt-1">
          Please read and confirm the following before completing check-in.
        </Typography>
      </div>

      <form onSubmit={handleSubmit(onConfirm)} noValidate className="space-y-6">
        <fieldset className="space-y-4 rounded-2xl border border-neutral-800 bg-card p-5">
          <legend className="sr-only">Travel declarations</legend>

          {declarations.map(({ field, label }) => (
            <div key={field} className="space-y-1">
              <div className="flex items-start gap-3">
                <input
                  {...register(field)}
                  id={field}
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-neutral-600"
                  aria-describedby={errors[field] ? `${field}-error` : undefined}
                />
                <label htmlFor={field} className="cursor-pointer text-sm leading-relaxed text-neutral-300">
                  {label}
                </label>
              </div>
              {errors[field] && (
                <p id={`${field}-error`} role="alert" className="pl-7 text-xs text-red-400">
                  {errors[field]?.message}
                </p>
              )}
            </div>
          ))}
        </fieldset>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Back
          </button>
          <Button type="submit" variant="primary">
            Complete check-in
          </Button>
        </div>
      </form>
    </div>
  );
}
