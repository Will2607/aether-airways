"use client";
import { useFormContext } from "react-hook-form";
import type { PaymentFormValues } from "@/features/booking/schemas/payment-form.schema";

const errorClass = "mt-1 text-xs text-red-400";

export function TermsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PaymentFormValues>();

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <input
          {...register("acceptTerms")}
          id="accept-terms"
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-neutral-600"
          aria-describedby={errors.acceptTerms ? "accept-terms-error" : undefined}
        />
        <label
          htmlFor="accept-terms"
          className="cursor-pointer text-sm leading-relaxed text-neutral-400"
        >
          I have read and agree to the{" "}
          <button
            type="button"
            className="text-aether-400 underline underline-offset-2 hover:text-aether-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aether-500"
          >
            Terms & Conditions
          </button>{" "}
          and{" "}
          <button
            type="button"
            className="text-aether-400 underline underline-offset-2 hover:text-aether-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aether-500"
          >
            Privacy Policy
          </button>
          .
        </label>
      </div>

      {errors.acceptTerms && (
        <p id="accept-terms-error" role="alert" className={errorClass}>
          {errors.acceptTerms.message}
        </p>
      )}
    </div>
  );
}
