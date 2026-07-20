import { CheckIcon, ClockIcon, XIcon } from "@/shared/icons";
import { cn } from "@/lib/utils";
import { buildTimelineSteps, formatDateTime } from "@/features/flight-status/utils/flight-status.utils";
import type { FlightStatusRecord } from "@/features/flight-status/types";

/* ── Step icon ───────────────────────────────────────────────────────────── */

function StepIcon({ completed, current, cancelled }: { completed: boolean; current: boolean; cancelled?: boolean }) {
  if (cancelled) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-red-700/60 bg-red-900/30">
        <XIcon className="h-4 w-4 text-red-400" aria-hidden="true" />
      </div>
    );
  }
  if (completed) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-aether-600">
        <CheckIcon className="h-4 w-4 text-white" aria-hidden="true" />
      </div>
    );
  }
  if (current) {
    return (
      <div className="relative flex h-8 w-8 items-center justify-center">
        <span className="absolute h-full w-full animate-ping rounded-full bg-aether-500/30" aria-hidden="true" />
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-aether-500 bg-aether-900/40">
          <ClockIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-700 bg-neutral-900" />
  );
}

/* ── Timeline ────────────────────────────────────────────────────────────── */

interface FlightOperationalTimelineProps {
  flight: FlightStatusRecord;
}

export function FlightOperationalTimeline({ flight }: FlightOperationalTimelineProps) {
  const isCancelled = flight.status === "cancelled";
  const steps       = buildTimelineSteps(flight.status, flight.timeline);

  return (
    <section aria-labelledby="timeline-heading" className="space-y-3">
      <h3 id="timeline-heading" className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
        Flight timeline
      </h3>

      {isCancelled && (
        <div
          role="alert"
          className="mb-4 flex items-center gap-2 rounded-xl border border-red-700/40 bg-red-900/20 px-4 py-3 text-sm text-red-300"
        >
          <XIcon className="h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
          This flight has been cancelled. Steps marked below did not occur.
        </div>
      )}

      <ol
        className="relative ml-4 space-y-0 border-l border-neutral-800"
        aria-label="Flight status timeline"
      >
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <li
              key={step.key}
              className={cn("relative pl-8 pb-8", isLast && "pb-0")}
              aria-current={step.isCurrent ? "step" : undefined}
            >
              {/* Icon positioned on the line */}
              <div className="absolute -left-4 top-0">
                <StepIcon
                  completed={step.isCompleted}
                  current={step.isCurrent}
                  cancelled={isCancelled && step.isPending}
                />
              </div>

              {/* Content */}
              <div className="pt-1">
                <p
                  className={cn(
                    "text-sm font-semibold",
                    step.isCompleted ? "text-white" :
                    step.isCurrent   ? "text-aether-300" :
                    isCancelled      ? "text-neutral-700 line-through" :
                    "text-neutral-500"
                  )}
                >
                  {step.label}
                  {step.isCurrent && !isCancelled && (
                    <span className="ml-2 rounded-full bg-aether-900/40 px-2 py-0.5 text-xs font-normal text-aether-400">
                      Current
                    </span>
                  )}
                </p>
                {step.occurredAt && (
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {formatDateTime(step.occurredAt)}
                  </p>
                )}
                {!step.occurredAt && !step.isPending && !isCancelled && (
                  <p className="mt-0.5 text-xs text-neutral-600">Scheduled</p>
                )}
              </div>
            </li>
          );
        })}

        {/* Cancelled terminal marker */}
        {isCancelled && (
          <li className="relative pl-8 pt-0">
            <div className="absolute -left-4 top-0">
              <StepIcon completed={false} current={false} cancelled={true} />
            </div>
            <div className="pt-1">
              <p className="text-sm font-semibold text-red-300">Cancelled</p>
              {flight.timeline.find(e => e.status === "cancelled") && (
                <>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {formatDateTime(flight.timeline.find(e => e.status === "cancelled")!.occurredAt)}
                  </p>
                  {flight.timeline.find(e => e.status === "cancelled")?.note && (
                    <p className="mt-0.5 text-xs text-neutral-600">
                      {flight.timeline.find(e => e.status === "cancelled")!.note}
                    </p>
                  )}
                </>
              )}
            </div>
          </li>
        )}
      </ol>
    </section>
  );
}
