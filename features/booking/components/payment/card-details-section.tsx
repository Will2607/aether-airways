"use client";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { formatCardNumber, formatExpiry, detectCardBrand, brandLabel } from "@/features/booking/utils/card.utils";
import type { PaymentFormValues } from "@/features/booking/schemas/payment-form.schema";

const labelClass = "block text-sm font-medium text-neutral-300 mb-1.5";
const errorClass = "mt-1 text-xs text-red-400";

export function CardDetailsSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<PaymentFormValues>();

  const rawNumber = useWatch({ control, name: "cardNumber" });
  const brand     = detectCardBrand((rawNumber ?? "").replace(/\s+/g, ""));
  const label     = brand !== "unknown" ? brandLabel(brand) : null;

  return (
    <fieldset className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-950/30 p-5">
      <legend className="px-1 text-sm font-semibold text-white">Card details</legend>

      {/* Cardholder name */}
      <div>
        <label htmlFor="cc-name" className={labelClass}>Name on card</label>
        <Input
          {...register("cardHolder")}
          id="cc-name"
          type="text"
          autoComplete="cc-name"
          placeholder="Jane Doe"
          aria-describedby={errors.cardHolder ? "cc-name-error" : undefined}
          aria-invalid={!!errors.cardHolder}
        />
        {errors.cardHolder && (
          <p id="cc-name-error" role="alert" className={errorClass}>
            {errors.cardHolder.message}
          </p>
        )}
      </div>

      {/* Card number */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="cc-number" className="text-sm font-medium text-neutral-300">
            Card number
          </label>
          {label && (
            <span className="rounded-md bg-neutral-800 px-2 py-0.5 text-xs font-medium text-neutral-300">
              {label}
            </span>
          )}
        </div>
        <Controller
          name="cardNumber"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="cc-number"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              maxLength={19}
              placeholder="1234 5678 9012 3456"
              onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
              aria-describedby={errors.cardNumber ? "cc-number-error" : undefined}
              aria-invalid={!!errors.cardNumber}
            />
          )}
        />
        {errors.cardNumber && (
          <p id="cc-number-error" role="alert" className={errorClass}>
            {errors.cardNumber.message}
          </p>
        )}
      </div>

      {/* Expiry + CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="cc-exp" className={labelClass}>Expiry date</label>
          <Controller
            name="cardExpiry"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="cc-exp"
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                maxLength={5}
                placeholder="MM/YY"
                onChange={(e) => field.onChange(formatExpiry(e.target.value))}
                aria-describedby={errors.cardExpiry ? "cc-exp-error" : undefined}
                aria-invalid={!!errors.cardExpiry}
              />
            )}
          />
          {errors.cardExpiry && (
            <p id="cc-exp-error" role="alert" className={errorClass}>
              {errors.cardExpiry.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cc-csc" className={labelClass}>Security code</label>
          <Input
            {...register("cardCvc")}
            id="cc-csc"
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={4}
            placeholder="123"
            aria-describedby={errors.cardCvc ? "cc-csc-error" : undefined}
            aria-invalid={!!errors.cardCvc}
          />
          {errors.cardCvc && (
            <p id="cc-csc-error" role="alert" className={errorClass}>
              {errors.cardCvc.message}
            </p>
          )}
        </div>
      </div>
    </fieldset>
  );
}
