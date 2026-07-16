"use client";
import { useEffect } from "react";
import { useForm, FormProvider, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { CreditCardIcon, ShieldCheckIcon } from "@/shared/icons";
import { formatCurrency } from "@/features/booking/utils/booking.utils";
import {
  paymentFormSchema,
  type PaymentFormValues,
} from "@/features/booking/schemas/payment-form.schema";
import { CardDetailsSection } from "./card-details-section";
import { BillingAddressSection } from "./billing-address-section";
import { TermsSection } from "./terms-section";

interface PaymentFormProps {
  isProcessing: boolean;
  /** When set, form clears CVC and focuses it for re-entry */
  paymentError: string | null;
  totalAmount:  number;
  currency:     string;
  onSubmit:     (data: PaymentFormValues) => void;
}

export function PaymentForm({
  isProcessing,
  paymentError,
  totalAmount,
  currency,
  onSubmit,
}: PaymentFormProps) {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardHolder:     "",
      cardNumber:     "",
      cardExpiry:     "",
      cardCvc:        "",
      billingCountry: "",
      billingAddress: "",
      billingCity:    "",
      billingPostal:  "",
      acceptTerms:    false,
    },
  });

  // On payment error: clear CVC (security) and focus for re-entry
  useEffect(() => {
    if (paymentError) {
      form.resetField("cardCvc");
      // Small delay to allow re-render before focusing
      setTimeout(() => form.setFocus("cardCvc"), 50);
    }
  }, [paymentError, form]);

  function handleError(errors: FieldErrors<PaymentFormValues>) {
    const firstField = Object.keys(errors)[0] as keyof PaymentFormValues;
    if (firstField) form.setFocus(firstField);
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, handleError)}
        noValidate
        aria-label="Payment details"
      >
        {/* Disabled during processing to prevent double-submit */}
        <fieldset
          disabled={isProcessing}
          className="space-y-5 border-0 p-0 m-0 disabled:opacity-60 disabled:pointer-events-none"
        >
          <legend className="sr-only">Payment details</legend>
          <CardDetailsSection />
          <BillingAddressSection />
          <TermsSection />
        </fieldset>

        <div className="mt-6 space-y-3">
          <Button
            type="submit"
            size="lg"
            isLoading={isProcessing}
            disabled={isProcessing}
            className="w-full"
          >
            {!isProcessing && (
              <CreditCardIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {isProcessing
              ? "Processing payment…"
              : `Pay ${formatCurrency(totalAmount, currency)}`}
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-600">
            <ShieldCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {/* Security note: in production, card data is tokenized by a PCI-compliant
                gateway (e.g., Stripe.js) client-side — it never reaches application servers. */}
            <span>Secured connection · PCI DSS compliant in production</span>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
