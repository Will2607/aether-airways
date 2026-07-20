import { LoaderIcon, AlertCircleIcon } from "@/shared/icons";
import { Button } from "@/shared/ui/button";

interface ManageBookingStatusMessageProps {
  status:   "processing" | "error";
  error?:   string | null;
  onRetry?: () => void;
}

export function ManageBookingStatusMessage({
  status, error, onRetry,
}: ManageBookingStatusMessageProps) {
  if (status === "processing") {
    return (
      <div
        aria-live="polite"
        aria-busy="true"
        className="flex flex-col items-center gap-4 rounded-2xl border border-aether-700/30 bg-aether-900/20 px-6 py-10 text-center"
      >
        <LoaderIcon className="h-8 w-8 animate-spin text-aether-400" aria-hidden="true" />
        <div className="space-y-1">
          <p className="font-medium text-white">Saving changes…</p>
          <p className="text-sm text-neutral-500">
            Please do not close this page. This will take a moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="space-y-4 rounded-2xl border border-red-700/40 bg-red-900/20 px-5 py-5"
    >
      <div className="flex items-start gap-3">
        <AlertCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden="true" />
        <div className="space-y-1">
          <p className="font-medium text-red-300">Could not save changes</p>
          <p className="text-sm text-neutral-400">{error ?? "An unexpected error occurred."}</p>
        </div>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>Try again</Button>
      )}
    </div>
  );
}
