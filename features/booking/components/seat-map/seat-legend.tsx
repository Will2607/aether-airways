import { cn } from "@/lib/utils";
import { Typography } from "@/shared/ui/typography";
import { CheckIcon } from "@/shared/icons";

interface LegendItemProps {
  swatchClass: string;
  label:       string;
  sublabel?:   string;
  icon?:       React.ReactNode;
}

function LegendItem({ swatchClass, label, sublabel, icon }: LegendItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "h-6 w-6 rounded-t-md border shrink-0 flex items-center justify-center",
          swatchClass
        )}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div>
        <Typography variant="caption" color="secondary" className="leading-tight">
          {label}
        </Typography>
        {sublabel && (
          <Typography variant="caption" color="muted" className="leading-tight">
            {sublabel}
          </Typography>
        )}
      </div>
    </div>
  );
}

export function SeatLegend() {
  return (
    <div
      className="bg-card border border-neutral-800 rounded-2xl p-4"
      aria-label="Seat map legend"
    >
      <Typography variant="label-sm" className="font-semibold text-white block mb-3">
        Legend
      </Typography>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
        {/* Types */}
        <LegendItem
          swatchClass="bg-neutral-700 border-neutral-600"
          label="Standard"
          sublabel="Free"
        />
        <LegendItem
          swatchClass="bg-aether-900 border-aether-700/60"
          label="Preferred"
          sublabel="+$25"
        />
        <LegendItem
          swatchClass="bg-emerald-950 border-emerald-800/50"
          label="Extra legroom"
          sublabel="+$50"
        />
        <LegendItem
          swatchClass="bg-amber-950/80 border-amber-800/40"
          label="Exit row"
          sublabel="+$35"
        />

        {/* Statuses */}
        <LegendItem
          swatchClass="bg-aether-500 border-aether-400"
          label="Selected"
          icon={<CheckIcon className="h-3 w-3 text-white" />}
        />
        <LegendItem
          swatchClass="bg-neutral-800 border-neutral-700/40 opacity-40"
          label="Occupied"
          sublabel="Unavailable"
        />
      </div>

      <Typography variant="caption" color="muted" className="mt-3 block">
        <span aria-hidden="true">W</span> = Window &nbsp;·&nbsp;
        <span aria-hidden="true">A</span> = Aisle &nbsp;·&nbsp;
        EXIT rows require able-bodied adults only.
      </Typography>
    </div>
  );
}
