/**
 * Shared primitive types for the AetherAirways Design System.
 * Import from here to keep variants consistent across all components.
 */

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type ColorVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "gold";

export type Orientation = "horizontal" | "vertical";

/** Semantic surface background tokens */
export type SurfaceVariant = "surface" | "card" | "elevated" | "transparent";

/** Section vertical padding scales */
export type SectionPadding = "none" | "sm" | "md" | "lg" | "xl";

/** Container max-width scales */
export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
