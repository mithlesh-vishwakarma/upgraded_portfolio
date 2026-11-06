/**
 * Date helpers for the Accounting module.
 * All range keys are plain ISO yyyy-mm-dd strings so they can be sent to the
 * API as-is and compared as strings.
 */

export type RangePreset =
  | "this_month"
  | "last_month"
  | "this_quarter"
  | "last_quarter"
  | "this_year"
  | "all"
  | "custom";

export const RANGE_PRESETS: { value: RangePreset; label: string }[] = [
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
  { value: "this_quarter", label: "This Quarter" },
  { value: "last_quarter", label: "Last Quarter" },
  { value: "this_year", label: "This Year" },
  { value: "all", label: "All Time" },
  { value: "custom", label: "Custom Range" },
];

const pad = (value: number): string => String(value).padStart(2, "0");

export const toISODate = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const todayISO = (): string => toISODate(new Date());

/**
 * Indian/Accounting Financial Year helper:
 * Fiscal year runs from April 1 to March 31.
 * - April 1, 2026 to March 31, 2027 => FY "26-27"
 * - April 1, 2027 to March 31, 2028 => FY "27-28" (resets counter to 0001)
 */
export const getFinancialYear = (dateStr?: string): string => {
  const d = dateStr ? new Date(`${dateStr.slice(0, 10)}T00:00:00`) : new Date();
  const valid = isNaN(d.getTime()) ? new Date() : d;
  const year = valid.getFullYear();
  const month = valid.getMonth() + 1; // 1 = Jan, 4 = Apr, 12 = Dec

  const startYear = month >= 4 ? year : year - 1;
  const endYear = startYear + 1;

  const startShort = String(startYear).slice(-2);
  const endShort = String(endYear).slice(-2);
  return `${startShort}-${endShort}`;
};

/** Add (or subtract) days to an ISO date string. */
export const addDaysISO = (iso: string, days: number): string => {
  const date = new Date(`${iso}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toISODate(date);
};

/** Human readable date, e.g. "06 Nov 2026". */
export const formatDate = (iso: string | null | undefined): string => {
  if (!iso) return "—";
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/** "06 Nov 2026" for the PDF (ASCII only, no locale surprises). */
export const formatDatePdf = (iso: string | null | undefined): string => {
  if (!iso) return "-";
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "-";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${pad(date.getDate())} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const startOfMonthISO = (reference: Date = new Date()): string =>
  toISODate(new Date(reference.getFullYear(), reference.getMonth(), 1));

export const endOfMonthISO = (reference: Date = new Date()): string =>
  toISODate(new Date(reference.getFullYear(), reference.getMonth() + 1, 0));

export const startOfYearISO = (reference: Date = new Date()): string =>
  toISODate(new Date(reference.getFullYear(), 0, 1));

export const endOfYearISO = (reference: Date = new Date()): string =>
  toISODate(new Date(reference.getFullYear(), 11, 31));

export const startOfQuarterISO = (reference: Date = new Date()): string => {
  const quarter = Math.floor(reference.getMonth() / 3);
  return toISODate(new Date(reference.getFullYear(), quarter * 3, 1));
};

export const endOfQuarterISO = (reference: Date = new Date()): string => {
  const quarter = Math.floor(reference.getMonth() / 3);
  return toISODate(new Date(reference.getFullYear(), quarter * 3 + 3, 0));
};

/** Month label from an ISO date, e.g. "Nov 2026". */
export const formatMonthLabel = (isoMonth: string): string => {
  const date = new Date(`${isoMonth}-01T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoMonth;
  return date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
};

/** Resolve a preset into a concrete date range. "all" returns an empty range. */
export const resolvePreset = (
  preset: RangePreset,
  reference: Date = new Date()
): { from?: string; to?: string } => {
  switch (preset) {
    case "this_month":
      return { from: startOfMonthISO(reference), to: endOfMonthISO(reference) };
    case "last_month": {
      const lastMonth = new Date(reference.getFullYear(), reference.getMonth() - 1, 1);
      return { from: startOfMonthISO(lastMonth), to: endOfMonthISO(lastMonth) };
    }
    case "this_quarter":
      return { from: startOfQuarterISO(reference), to: endOfQuarterISO(reference) };
    case "last_quarter": {
      const quarter = Math.floor(reference.getMonth() / 3);
      const lastQuarter = new Date(reference.getFullYear(), quarter * 3 - 3, 1);
      return { from: startOfQuarterISO(lastQuarter), to: endOfQuarterISO(lastQuarter) };
    }
    case "this_year":
      return { from: startOfYearISO(reference), to: endOfYearISO(reference) };
    case "all":
    case "custom":
    default:
      return {};
  }
};

/** Whole days between two ISO dates (today - due date). */
export const daysUntil = (iso: string | null | undefined): number | null => {
  if (!iso) return null;
  const due = new Date(`${iso}T00:00:00`).getTime();
  if (Number.isNaN(due)) return null;
  const today = new Date(`${todayISO()}T00:00:00`).getTime();
  return Math.round((today - due) / 86400000);
};

/** True when an unpaid invoice is past its due date. */
export const isPastDue = (dueDate: string | null | undefined): boolean => {
  const days = daysUntil(dueDate);
  return days !== null && days > 0;
};
