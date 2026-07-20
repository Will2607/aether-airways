import { ClockIcon } from "@/shared/icons";
import { formatTime, formatDelay } from "@/features/flight-status/utils/flight-status.utils";

interface DelayAlertProps {
  delayMinutes:        number;
  scheduledDeparture:  string;
  estimatedDeparture?: string;
}

export function DelayAlert({ delayMinutes, scheduledDeparture, estimatedDeparture }: DelayAlertProps) {
  if (delayMinutes <= 0) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex items-start gap-3 rounded-2xl border border-amber-700/40 bg-amber-900/20 px-5 py-4"
    >
      <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
      <div className="space-y-0.5">
        <p className="font-semibold text-amber-300">Flight delayed by {formatDelay(delayMinutes)}</p>
        <p className="text-sm text-neutral-400">
          Originally scheduled at{" "}
          <span className="font-mono text-neutral-300 line-through">{formatTime(scheduledDeparture)}</span>
          {estimatedDeparture && (
            <>
              {" "}— new estimated departure{" "}
              <span className="font-mono font-semibold text-amber-300">{formatTime(estimatedDeparture)}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
