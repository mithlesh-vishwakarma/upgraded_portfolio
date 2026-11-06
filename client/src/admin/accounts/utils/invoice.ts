import type { InvoiceItemInput, InvoiceStatus } from "../types/accounts";

/**
 * Invoice maths, mirroring server/src/accounts/accountsService.ts so the form
 * can show live totals while the server stays authoritative on save.
 */

export interface InvoiceTotals {
  subtotal: number;
  discount: number;
  taxableBase: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}

export const round2 = (value: number): number =>
  Math.round((value + Number.EPSILON) * 100) / 100;

export const toNumber = (value: unknown): number => {
  const parsed = typeof value === "number" ? value : parseFloat(String(value ?? ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

export const computeInvoiceTotals = (
  items: InvoiceItemInput[],
  discountInput: unknown,
  taxRateInput: unknown
): InvoiceTotals => {
  const subtotal = round2(
    items.reduce((sum, item) => sum + round2(toNumber(item.quantity) * toNumber(item.rate)), 0)
  );

  const discount = Math.min(Math.max(round2(toNumber(discountInput)), 0), subtotal);
  const taxableBase = round2(subtotal - discount);
  const taxRate = Math.max(toNumber(taxRateInput), 0);
  const taxAmount = round2((taxableBase * taxRate) / 100);
  const total = round2(taxableBase + taxAmount);

  return { subtotal, discount, taxableBase, taxRate, taxAmount, total };
};

export const lineAmount = (item: InvoiceItemInput): number =>
  round2(toNumber(item.quantity) * toNumber(item.rate));

export const buildInvoiceNumber = (prefix: string, sequence: number): string => {
  const cleanPrefix = (prefix || "INV").trim().toUpperCase();
  const safeSequence = Math.max(1, Math.floor(toNumber(sequence)));
  return `${cleanPrefix}-${String(safeSequence).padStart(4, "0")}`;
};

export interface StatusMeta {
  label: string;
  badgeClass: string;
  dotClass: string;
}

export const STATUS_META: Record<InvoiceStatus, StatusMeta> = {
  draft: {
    label: "Draft",
    badgeClass: "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-300",
    dotClass: "bg-gray-400",
  },
  sent: {
    label: "Sent",
    badgeClass: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300",
    dotClass: "bg-blue-500",
  },
  partial: {
    label: "Partial",
    badgeClass: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300",
    dotClass: "bg-amber-500",
  },
  paid: {
    label: "Paid",
    badgeClass: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300",
    dotClass: "bg-emerald-500",
  },
  overdue: {
    label: "Overdue",
    badgeClass: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300",
    dotClass: "bg-red-500",
  },
};

export const statusMeta = (status: InvoiceStatus): StatusMeta =>
  STATUS_META[status] ?? STATUS_META.draft;

/** Common freelancer expense categories, offered as suggestions in the form. */
export const EXPENSE_CATEGORIES = [
  "Software & Tools",
  "Hardware & Equipment",
  "Internet & Utilities",
  "Office & Rent",
  "Marketing & Ads",
  "Travel & Fuel",
  "Hosting & Cloud",
  "Professional Services",
  "Education & Training",
  "Taxes & Fees",
  "Other",
];

export const PAYMENT_METHODS = [
  "UPI",
  "Bank Transfer",
  "Cash",
  "Card",
  "Cheque",
  "PayPal",
  "Other",
];
