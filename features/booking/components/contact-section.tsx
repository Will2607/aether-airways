"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import { Typography } from "@/shared/ui/typography";
import { MailIcon, PhoneIcon } from "@/shared/icons";
import { COUNTRY_CODE_OPTIONS } from "@/features/booking/constants/form-options";
import type { PassengerFormPayload } from "@/features/booking/schemas/passenger-form.schema";

export function ContactSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PassengerFormPayload>();

  const e = errors.contact;

  return (
    <fieldset className="bg-card border border-neutral-800 rounded-2xl p-5 space-y-4">
      <legend className="sr-only">Contact details</legend>

      <Typography variant="label-lg" className="font-semibold text-white block mb-1">
        Contact details
      </Typography>
      <Typography variant="caption" color="muted">
        We&apos;ll send your booking confirmation to this email.
      </Typography>

      {/* Email */}
      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        leadingIcon={<MailIcon className="h-4 w-4" />}
        error={e?.email?.message}
        {...register("contact.email")}
      />

      {/* Phone */}
      <div className="grid grid-cols-[140px_1fr] gap-3">
        <Select
          label="Country code"
          options={COUNTRY_CODE_OPTIONS}
          error={e?.countryCode?.message}
          {...register("contact.countryCode")}
        />
        <Input
          label="Phone number"
          type="tel"
          autoComplete="tel-national"
          placeholder="3101234567"
          leadingIcon={<PhoneIcon className="h-4 w-4" />}
          error={e?.phone?.message}
          {...register("contact.phone")}
        />
      </div>
    </fieldset>
  );
}
