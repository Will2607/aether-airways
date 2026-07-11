"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { Path } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import { Typography } from "@/shared/ui/typography";
import { ChevronDownIcon } from "@/shared/icons";
import { cn } from "@/lib/utils";
import {
  TITLE_OPTIONS,
  GENDER_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
} from "@/features/booking/constants/form-options";
import type { PassengerFormPayload } from "@/features/booking/schemas/passenger-form.schema";
import type { PassengerType } from "@/features/booking/types";

const TYPE_LABEL: Record<PassengerType, string> = {
  adult:  "Adult",
  child:  "Child",
  infant: "Infant",
};

interface PassengerCardProps {
  index: number;
  passengerType: PassengerType;
  /** Display label e.g. "Adult 1", "Child 2" */
  label: string;
}

export function PassengerCard({ index, passengerType, label }: PassengerCardProps) {
  const [open, setOpen] = useState(true);

  const {
    register,
    formState: { errors },
  } = useFormContext<PassengerFormPayload>();

  // Helper: typed path for this passenger's field
  const f = (name: string) =>
    `passengers.${index}.${name}` as Path<PassengerFormPayload>;

  // Helper: error message for this passenger's field
  const e = (name: string) => {
    const pe = errors.passengers?.[index] as Record<string, { message?: string }> | undefined;
    return pe?.[name]?.message;
  };

  return (
    <fieldset
      className="bg-card border border-neutral-800 rounded-2xl overflow-hidden"
      aria-label={label}
    >
      {/* ── Accordion header ─────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-800/40 transition-colors"
      >
        <div>
          <legend className="font-semibold text-white text-base">{label}</legend>
          <Typography variant="caption" color="muted" className="mt-0.5">
            {TYPE_LABEL[passengerType]} passenger
          </Typography>
        </div>
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 text-neutral-500 transition-transform duration-300 shrink-0",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {/* ── Collapsible content ───────────────────────────────── */}
      <div
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        className="grid transition-all duration-300"
      >
        <div className="overflow-hidden">
          {/* Hidden type field — validated by Zod, not visible to user */}
          <input type="hidden" {...register(f("passengerType"))} />

          <div className="px-5 pb-5 space-y-4 border-t border-neutral-800 pt-4">

            {/* Row 1: Title + First + Last */}
            <div className="grid grid-cols-[100px_1fr_1fr] gap-3">
              <Select
                label="Title"
                options={TITLE_OPTIONS}
                error={e("title")}
                {...register(f("title"))}
              />
              <Input
                label="First name"
                autoComplete="given-name"
                placeholder="Jane"
                error={e("firstName")}
                {...register(f("firstName"))}
              />
              <Input
                label="Last name"
                autoComplete="family-name"
                placeholder="Smith"
                error={e("lastName")}
                {...register(f("lastName"))}
              />
            </div>

            {/* Row 2: Middle name */}
            <Input
              label="Middle name (optional)"
              autoComplete="additional-name"
              placeholder="Optional"
              error={e("middleName")}
              {...register(f("middleName"))}
            />

            {/* Row 3: Date of birth + Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Date of birth"
                type="date"
                hint="YYYY-MM-DD"
                error={e("dateOfBirth")}
                {...register(f("dateOfBirth"))}
              />
              <Select
                label="Gender"
                options={GENDER_OPTIONS}
                error={e("gender")}
                {...register(f("gender"))}
              />
            </div>

            {/* Row 4: Nationality */}
            <Input
              label="Nationality"
              placeholder="e.g. US, CO, GB"
              maxLength={2}
              hint="2-letter ISO country code"
              error={e("nationality")}
              {...register(f("nationality"), {
                setValueAs: (v: string) => v.toUpperCase(),
              })}
            />

            {/* Row 5: Document type + Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select
                label="Document type"
                options={DOCUMENT_TYPE_OPTIONS}
                error={e("documentType")}
                {...register(f("documentType"))}
              />
              <Input
                label="Document number"
                placeholder="AB1234567"
                error={e("documentNumber")}
                {...register(f("documentNumber"))}
              />
            </div>

            {/* Row 6: Document expiry */}
            <Input
              label="Document expiry date"
              type="date"
              hint="Must be a future date"
              error={e("documentExpiry")}
              {...register(f("documentExpiry"))}
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
}
