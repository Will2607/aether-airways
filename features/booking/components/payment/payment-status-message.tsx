"use client";
import { AlertCircleIcon, LoaderIcon } from "@/shared/icons";
import { cn } from "@/lib/utils";

interface PaymentStatusMessageProps {
  status: "processing" | "error";
  error?: string | null;
  className?: string;
}

export function PaymentStatusMessage({
  status,
  error,
  className,
}: PaymentStatusMessageProps) {
  if (status === "processing") {
    return (
      <div
        aria-live="polite"
        aria-busy="true"
        className={cn(
          "flex items-center gap-3 rounded-xl border border-aether-700/50 bg-aether-900/20 px-4 py-3",
          className
        )}
      >
        <LoaderIcon
          className="h-4 w-4 shrink-0 animate-spin text-aether-400"
          aria-hidden="true"
        />
        <p className="text-sm text-aether-300">Processing your payment…</p>
      </div>
    );
  }

  if (status === "error" && error) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className={cn(
          "space-y-1 rounded-xl border border-red-500/40 bg-red-900/20 px-4 py-3",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <AlertCircleIcon className="h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
          <p className="text-sm font-medium text-red-300">{error}</p>
        </div>
        <p className="text-xs text-red-400/80 pl-6">
          For security, please re-enter your security code and try again.
        </p>
      </div>
    );
  }

  return null;
}
