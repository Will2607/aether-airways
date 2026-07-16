"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import type { PaymentFormValues } from "@/features/booking/schemas/payment-form.schema";

const labelClass = "block text-sm font-medium text-neutral-300 mb-1.5";
const errorClass = "mt-1 text-xs text-red-400";

const BILLING_COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "NL", name: "Netherlands" },
  { code: "CH", name: "Switzerland" },
  { code: "MX", name: "Mexico" },
  { code: "CO", name: "Colombia" },
  { code: "BR", name: "Brazil" },
  { code: "AR", name: "Argentina" },
  { code: "CL", name: "Chile" },
  { code: "PE", name: "Peru" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "CN", name: "China" },
  { code: "IN", name: "India" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "ZA", name: "South Africa" },
] as const;

const selectClass =
  "w-full h-11 rounded-xl border border-neutral-700 bg-neutral-900/80 px-3 text-sm text-white " +
  "placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-aether-500 " +
  "focus:border-aether-500 transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export function BillingAddressSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PaymentFormValues>();

  return (
    <fieldset className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-950/30 p-5">
      <legend className="px-1 text-sm font-semibold text-white">Billing address</legend>

      {/* Country */}
      <div>
        <label htmlFor="billing-country" className={labelClass}>Country</label>
        <select
          {...register("billingCountry")}
          id="billing-country"
          autoComplete="billing country"
          className={selectClass}
          aria-describedby={errors.billingCountry ? "billing-country-error" : undefined}
          aria-invalid={!!errors.billingCountry}
        >
          <option value="">Select country</option>
          {BILLING_COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.billingCountry && (
          <p id="billing-country-error" role="alert" className={errorClass}>
            {errors.billingCountry.message}
          </p>
        )}
      </div>

      {/* Street address */}
      <div>
        <label htmlFor="billing-address" className={labelClass}>Street address</label>
        <Input
          {...register("billingAddress")}
          id="billing-address"
          type="text"
          autoComplete="billing address-line1"
          placeholder="123 Main Street"
          aria-describedby={errors.billingAddress ? "billing-address-error" : undefined}
          aria-invalid={!!errors.billingAddress}
        />
        {errors.billingAddress && (
          <p id="billing-address-error" role="alert" className={errorClass}>
            {errors.billingAddress.message}
          </p>
        )}
      </div>

      {/* City + Postal code */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="billing-city" className={labelClass}>City</label>
          <Input
            {...register("billingCity")}
            id="billing-city"
            type="text"
            autoComplete="billing address-level2"
            placeholder="New York"
            aria-describedby={errors.billingCity ? "billing-city-error" : undefined}
            aria-invalid={!!errors.billingCity}
          />
          {errors.billingCity && (
            <p id="billing-city-error" role="alert" className={errorClass}>
              {errors.billingCity.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="billing-postal" className={labelClass}>Postal code</label>
          <Input
            {...register("billingPostal")}
            id="billing-postal"
            type="text"
            autoComplete="billing postal-code"
            placeholder="10001"
            aria-describedby={errors.billingPostal ? "billing-postal-error" : undefined}
            aria-invalid={!!errors.billingPostal}
          />
          {errors.billingPostal && (
            <p id="billing-postal-error" role="alert" className={errorClass}>
              {errors.billingPostal.message}
            </p>
          )}
        </div>
      </div>
    </fieldset>
  );
}
