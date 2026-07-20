"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { InfoIcon } from "@/shared/icons";
import type { ContactDraft } from "@/features/manage-booking/types";

const schema = z.object({
  email:       z.string().email("Please enter a valid email address"),
  phone:       z.string()
    .min(5, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(/^[\d\s\-\(\)\+]+$/, "Enter digits, spaces, dashes or parentheses only"),
  countryCode: z.string().min(1, "Country code is required"),
});

const labelClass = "block text-sm font-medium text-neutral-300 mb-1.5";
const errorClass = "mt-1 text-xs text-red-400";

interface ContactDetailsEditorProps {
  draft:    ContactDraft;
  onChange: (draft: ContactDraft) => void;
}

export function ContactDetailsEditor({ draft, onChange }: ContactDetailsEditorProps) {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<ContactDraft>({
    resolver:      zodResolver(schema),
    defaultValues: draft,
    mode:          "onChange",
  });

  // Notify parent on any field change; propagates valid + partial values
  function notifyParent() {
    const values = getValues();
    onChange(values);
  }

  return (
    <section aria-labelledby="contact-editor-heading" className="space-y-5">
      <div>
        <h2 id="contact-editor-heading" className="text-lg font-semibold text-white">
          Contact details
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          These details are used for booking communications only. Names, documents, and dates of birth cannot be changed here.
        </p>
      </div>

      <div
        className="flex items-start gap-2 rounded-xl border border-sky-700/30 bg-sky-900/20 px-4 py-3 text-xs text-sky-400"
      >
        <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Changes to contact information do not affect your travel documents or passenger names.
      </div>

      <form
        onSubmit={handleSubmit(() => { /* validation only, parent controlled via watch */ })}
        noValidate
        className="space-y-4 rounded-2xl border border-neutral-800 bg-card p-6"
      >
        <div>
          <label htmlFor="mb-email" className={labelClass}>Email address</label>
          <Input
            {...register("email", { onChange: notifyParent })}
            id="mb-email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            aria-describedby={errors.email ? "mb-email-error" : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p id="mb-email-error" role="alert" className={errorClass}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="mb-country" className={labelClass}>Country code</label>
          <Input
            {...register("countryCode", { onChange: notifyParent })}
            id="mb-country"
              type="text"
              autoComplete="tel-country-code"
              placeholder="+57"
              aria-describedby={errors.countryCode ? "mb-cc-error" : undefined}
              aria-invalid={!!errors.countryCode}
            />
            {errors.countryCode && (
              <p id="mb-cc-error" role="alert" className={errorClass}>
                {errors.countryCode.message}
              </p>
            )}
          </div>
          <div className="col-span-2">
            <label htmlFor="mb-phone" className={labelClass}>Phone number</label>
          <Input
            {...register("phone", { onChange: notifyParent })}
            id="mb-phone"
              type="tel"
              autoComplete="tel"
              placeholder="300 123 4567"
              aria-describedby={errors.phone ? "mb-phone-error" : undefined}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p id="mb-phone-error" role="alert" className={errorClass}>
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
      </form>

      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSubmit(() => onChange(getValues()))()}
        >
          Continue to review
        </Button>
      </div>
    </section>
  );
}
