import { cn } from "@/lib/utils";
import { CheckIcon } from "@/shared/icons";
import { BOOKING_STEPS, type BookingStepId } from "@/features/booking/constants";

interface BookingProgressProps {
  currentStep: BookingStepId;
}

export function BookingProgress({ currentStep }: BookingProgressProps) {
  const currentIdx = BOOKING_STEPS.findIndex((s) => s.id === currentStep);

  return (
    <nav
      aria-label="Booking progress"
      className="border-b border-neutral-800 bg-surface/80 backdrop-blur-sm sticky top-0 z-30"
    >
      <div className="mx-auto max-w-5xl px-4">
        <ol className="flex items-center py-4 gap-1 overflow-x-auto" role="list">
          {BOOKING_STEPS.map((step, idx) => {
            const isActive = step.id === currentStep;
            const isDone   = idx < currentIdx;

            return (
              <li key={step.id} className="flex items-center gap-1 shrink-0">
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200",
                    isActive ? "bg-aether-600/20 text-aether-300 ring-1 ring-aether-500/50" :
                    isDone   ? "text-aether-400" :
                               "text-neutral-600"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span
                    className={cn(
                      "h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                      isActive ? "bg-aether-500 text-white" :
                      isDone   ? "bg-aether-600 text-white" :
                                 "bg-neutral-800 text-neutral-500"
                    )}
                    aria-hidden="true"
                  >
                    {isDone
                      ? <CheckIcon className="h-3 w-3" />
                      : idx + 1
                    }
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </div>

                {idx < BOOKING_STEPS.length - 1 && (
                  <div
                    className={cn("h-px w-4 md:w-8 shrink-0 transition-colors duration-200",
                      isDone ? "bg-aether-600" : "bg-neutral-800"
                    )}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
