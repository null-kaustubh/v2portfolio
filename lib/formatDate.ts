import { YearMonth } from "@/features/portfolio/career-path/types/experienceType";

export function formatYearMonth(
  value: string | null,
  options?: { lowercase?: boolean; shortMonth?: boolean },
) {
  if (!value) return "";

  const [year, month] = value.split("-").map(Number);

  const date = new Date(year, month - 1);

  const formatted = date.toLocaleString("en-US", {
    month: options?.shortMonth ? "short" : "long",
    year: "numeric",
  });

  return options?.lowercase ? formatted.toLowerCase() : formatted;
}

export function formatDateRange(
  from: YearMonth,
  to: YearMonth,
  status: "active" | "ended",
  options?: { shortMonth?: boolean },
) {
  if (!from) return "";

  const fromText = formatYearMonth(from, {
    lowercase: true,
    shortMonth: options?.shortMonth,
  });

  if (status === "active" || !to) {
    return `${fromText} – present`;
  }

  const toText = formatYearMonth(to, {
    lowercase: true,
    shortMonth: options?.shortMonth,
  });

  return `${fromText} – ${toText}`;
}

export function formatFullDate(
  value: string | null,
  options?: { shortMonth?: boolean; lowercase?: boolean },
) {
  if (!value) return "";

  const [year, month, day] = value.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  const formatted = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: options?.shortMonth ? "short" : "long",
    year: "numeric",
  });

  return options?.lowercase ? formatted.toLowerCase() : formatted;
}
