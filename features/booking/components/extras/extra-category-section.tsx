import { Typography } from "@/shared/ui/typography";
import type { ExtraCategory } from "@/features/booking/types";

interface CategoryConfig {
  id:          ExtraCategory;
  label:       string;
  description: string;
  icon:        React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

interface ExtraCategorySectionProps {
  config:   CategoryConfig;
  children: React.ReactNode;
}

export type { CategoryConfig };

/**
 * Section wrapper for a group of extras of the same category.
 * Provides accessible heading via aria-labelledby.
 */
export function ExtraCategorySection({ config, children }: ExtraCategorySectionProps) {
  const Icon = config.icon;
  const headingId = `cat-heading-${config.id}`;

  return (
    <section aria-labelledby={headingId}>
      {/* Category header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="h-9 w-9 rounded-xl bg-aether-900/40 border border-aether-800/40 flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <Icon className="h-4.5 w-4.5 text-aether-400" aria-hidden={true} />
        </div>
        <div>
          <Typography
            id={headingId}
            variant="heading-md"
            as="h2"
            className="text-white leading-tight"
          >
            {config.label}
          </Typography>
          <Typography variant="caption" color="muted" className="leading-tight">
            {config.description}
          </Typography>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3">{children}</div>
    </section>
  );
}
