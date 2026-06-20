import type { ISODateString } from "@/types";

type FormatStyle = "short" | "medium" | "long";

const FORMAT_OPTIONS: Record<FormatStyle, Intl.DateTimeFormatOptions> = {
  short: { month: "short", day: "numeric" },
  medium: { month: "short", day: "numeric", year: "numeric" },
  long: {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  },
};

export function formatDate(
  date: ISODateString | Date,
  style: FormatStyle = "medium",
  locale = "en-US"
): string {
  return new Intl.DateTimeFormat(locale, FORMAT_OPTIONS[style]).format(
    new Date(date)
  );
}
