import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "@/shared/icons";

interface QuantitySelectorProps {
  value:    number;
  min?:     number;
  max?:     number;
  /** Accessible label for the control group. */
  label:    string;
  onChange: (val: number) => void;
}

export function QuantitySelector({
  value,
  min = 0,
  max = 99,
  label,
  onChange,
}: QuantitySelectorProps) {
  const baseBtn = cn(
    "h-7 w-7 rounded-lg border flex items-center justify-center transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aether-500",
    "disabled:opacity-40 disabled:cursor-not-allowed"
  );

  return (
    <div
      className="flex items-center gap-1.5"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
        className={cn(baseBtn, "bg-neutral-800 border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600")}
      >
        <MinusIcon className="h-3 w-3 text-neutral-300" aria-hidden="true" />
      </button>

      <span
        className="w-6 text-center text-sm font-semibold text-white tabular-nums"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`${value} selected`}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
        className={cn(baseBtn, "bg-aether-900 border-aether-800/60 hover:bg-aether-800 hover:border-aether-700")}
      >
        <PlusIcon className="h-3 w-3 text-aether-400" aria-hidden="true" />
      </button>
    </div>
  );
}
