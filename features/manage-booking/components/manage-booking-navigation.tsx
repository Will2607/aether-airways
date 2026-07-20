import { cn } from "@/lib/utils";
import type { ManageBookingSection, BookingChange } from "@/features/manage-booking/types";
import type { ManageBookingEligibility } from "@/features/manage-booking/types";

const SECTIONS: { key: ManageBookingSection; label: string }[] = [
  { key: "contact", label: "Contact"  },
  { key: "seats",   label: "Seats"    },
  { key: "extras",  label: "Extras"   },
  { key: "review",  label: "Review"   },
];

interface ManageBookingNavigationProps {
  section:     ManageBookingSection;
  onChange:    (s: ManageBookingSection) => void;
  eligibility: ManageBookingEligibility;
  changes:     BookingChange[];
}

function hasChangesForSection(section: ManageBookingSection, changes: BookingChange[]): boolean {
  switch (section) {
    case "contact": return changes.some((c) => c.type === "contact_updated");
    case "seats":   return changes.some((c) => c.type === "seat_changed");
    case "extras":  return changes.some((c) =>
      c.type === "extra_added" || c.type === "extra_removed" || c.type === "extra_quantity_changed"
    );
    default: return false;
  }
}

function isSectionLocked(section: ManageBookingSection, eligibility: ManageBookingEligibility): boolean {
  if (section === "seats")  return !eligibility.canChangeSeats;
  if (section === "extras") return !eligibility.canChangeExtras;
  return false;
}

export function ManageBookingNavigation({
  section,
  onChange,
  eligibility,
  changes,
}: ManageBookingNavigationProps) {
  return (
    <nav aria-label="Manage booking sections">
      <div
        role="tablist"
        aria-label="Booking sections"
        className="flex gap-1 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950/40 p-1"
      >
        {SECTIONS.map(({ key, label }) => {
          const locked  = isSectionLocked(key, eligibility);
          const hasPending = hasChangesForSection(key, changes);
          const isCurrent = section === key;

          return (
            <button
              key={key}
              role="tab"
              type="button"
              aria-selected={isCurrent}
              aria-disabled={false}
              onClick={() => onChange(key)}
              className={cn(
                "relative flex-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500",
                isCurrent
                  ? "bg-aether-900/60 text-aether-300"
                  : locked
                  ? "text-neutral-600 hover:text-neutral-500"
                  : "text-neutral-500 hover:text-neutral-300"
              )}
            >
              {label}
              {locked && (
                <span className="ml-1 text-[10px] text-neutral-600" aria-label="locked">🔒</span>
              )}
              {hasPending && !locked && (
                <span
                  className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-400"
                  aria-label="has changes"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
