"use client";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { BookingChangesList } from "./booking-changes-list";
import { PriceDifferenceSummary } from "./price-difference-summary";
import { ManageBookingStatusMessage } from "./manage-booking-status-message";
import type { BookingChange, PriceDiff } from "@/features/manage-booking/types";

interface ManageBookingReviewProps {
  changes:      BookingChange[];
  priceDiff:    PriceDiff;
  currency:     string;
  hasChanges:   boolean;
  isProcessing: boolean;
  error:        string | null;
  onConfirm:    () => void;
  onClearError: () => void;
}

export function ManageBookingReview({
  changes, priceDiff, currency, hasChanges, isProcessing, error, onConfirm, onClearError,
}: ManageBookingReviewProps) {
  return (
    <section aria-labelledby="review-heading" className="space-y-6">
      <div>
        <h2 id="review-heading" className="text-lg font-semibold text-white">
          Review changes
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Confirm all modifications before saving. Your booking will be updated immediately.
        </p>
      </div>

      {/* Processing / error states */}
      {isProcessing && (
        <ManageBookingStatusMessage status="processing" />
      )}

      {error && !isProcessing && (
        <ManageBookingStatusMessage status="error" error={error} onRetry={onClearError} />
      )}

      {/* Changes list */}
      <div className="rounded-2xl border border-neutral-800 bg-card px-5 py-4">
        <Typography variant="label-lg" className="mb-3 font-semibold text-white">
          Pending changes
        </Typography>
        <BookingChangesList changes={changes} currency={currency} />
      </div>

      {/* Price summary */}
      <PriceDifferenceSummary diff={priceDiff} currency={currency} />

      {/* Demo note */}
      <p className="text-xs text-neutral-700">
        This is a demo. No real airline PNR modification occurs. Changes are applied to your local booking record only.
      </p>

      {/* Confirm / no changes */}
      <div className="flex flex-wrap items-center gap-3">
        {hasChanges ? (
          <Button
            variant="primary"
            onClick={onConfirm}
            disabled={isProcessing}
            isLoading={isProcessing}
            aria-disabled={isProcessing}
          >
            Confirm changes
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="primary" disabled aria-disabled="true">
              Confirm changes
            </Button>
            <p className="text-sm text-neutral-600">No changes to save.</p>
          </div>
        )}
      </div>
    </section>
  );
}
