/**
 * Money formatting for the Accounting module.
 *
 * Two formatters live here on purpose:
 *  - formatMoney()        -> browser UI, uses the real ₹ symbol (fine on screen)
 *  - formatPdfAmount()    -> PDF output, ISO code only. jsPDF's standard 14
 *     fonts use WinAnsi encoding, which has no U+20B9 rupee glyph — writing "₹"
 *     there silently produces a "¹" superscript-one instead of the symbol.
 */

export const CURRENCY_OPTIONS = [
  { code: "INR", label: "INR — Indian Rupee (₹)" },
  { code: "USD", label: "USD — US Dollar ($)" },
  { code: "EUR", label: "EUR — Euro (€)" },
  { code: "GBP", label: "GBP — British Pound (£)" },
  { code: "AUD", label: "AUD — Australian Dollar ($)" },
  { code: "CAD", label: "CAD — Canadian Dollar ($)" },
  { code: "AED", label: "AED — UAE Dirham (د.إ)" },
  { code: "SGD", label: "SGD — Singapore Dollar ($)" },
];

/** Format with the locale-aware currency symbol (UI only). */
export const formatMoney = (
  value: number | null | undefined,
  currency: string = "INR",
  maximumFractionDigits = 2
): string => {
  const amount = Number.isFinite(Number(value)) ? Number(value) : 0;
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
};

/** Compact form for KPI tiles: ₹1.2L, ₹45.3K. */
export const formatMoneyCompact = (
  value: number | null | undefined,
  currency: string = "INR"
): string => {
  const amount = Number.isFinite(Number(value)) ? Number(value) : 0;
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(0)}`;
  }
};

/**
 * PDF-safe amount: always the ISO code + grouped number.
 * No currency glyphs, so nothing depends on font encoding support.
 */
export const formatPdfAmount = (
  value: number | null | undefined,
  currency: string = "INR"
): string => {
  const amount = Number.isFinite(Number(value)) ? Number(value) : 0;
  const safeCurrency = /^[A-Z]{3}$/.test(currency) ? currency : "INR";
  const grouped = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${safeCurrency} ${grouped}`;
};

/** Plain grouped number, no currency symbol. */
export const formatNumber = (
  value: number | null | undefined,
  maximumFractionDigits = 2
): string => {
  const amount = Number.isFinite(Number(value)) ? Number(value) : 0;
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(amount);
};

/** Percentage helper for tax rates. */
export const formatPercent = (value: number | null | undefined): string => {
  const rate = Number.isFinite(Number(value)) ? Number(value) : 0;
  return `${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 3 }).format(rate)}%`;
};

const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

const twoDigits = (value: number): string => {
  if (value < 20) return ONES[value];
  const tens = Math.floor(value / 10);
  const ones = value % 10;
  return ones === 0 ? TENS[tens] : `${TENS[tens]} ${ONES[ones]}`;
};

const threeDigits = (value: number): string => {
  const hundreds = Math.floor(value / 100);
  const remainder = value % 100;
  const parts: string[] = [];
  if (hundreds > 0) parts.push(`${ONES[hundreds]} Hundred`);
  if (remainder > 0) parts.push(twoDigits(remainder));
  return parts.join(" ");
};

/**
 * Amount in words using the Indian numbering system (lakh / crore).
 * Used on the invoice PDF, which is standard practice for Indian invoices.
 */
export const numberToWordsIndian = (value: number | null | undefined): string => {
  const amount = Math.round(Number.isFinite(Number(value)) ? Number(value) : 0);
  if (amount === 0) return "Zero";

  const negative = amount < 0;
  let remaining = Math.abs(amount);

  const parts: string[] = [];
  const crore = Math.floor(remaining / 10000000);
  remaining %= 10000000;
  const lakh = Math.floor(remaining / 100000);
  remaining %= 100000;
  const thousand = Math.floor(remaining / 1000);
  remaining %= 1000;
  const hundred = Math.floor(remaining / 100);
  const lastTwo = remaining % 100;

  if (crore > 0) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh > 0) parts.push(`${threeDigits(lakh)} Lakh`);
  if (thousand > 0) parts.push(`${threeDigits(thousand)} Thousand`);
  if (hundred > 0) parts.push(`${ONES[hundred]} Hundred`);
  if (lastTwo > 0) parts.push(twoDigits(lastTwo));

  const words = parts.join(" ").trim();
  return `${negative ? "Minus " : ""}${words}`;
};
